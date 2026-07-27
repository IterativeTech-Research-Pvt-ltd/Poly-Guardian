import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());

// Serve the built React frontend (client/dist) from this same server,
// so the whole app runs on one URL with no CORS setup.
// Run `npm run build` first to create client/dist.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "client", "dist")));
app.use(express.json({ limit: "1mb" })); // for the /ask chat endpoint

// Keep the uploaded image in memory (don't write it to disk).
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB max
});

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";

// Groq is the automatic fallback when Gemini fails (e.g. quota / 429), so the
// user always gets an answer. Model IDs are env-configurable because Groq
// rotates them; these are current defaults (July 2026).
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_TEXT_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const GROQ_VISION_MODEL = process.env.GROQ_VISION_MODEL || "qwen/qwen3.6-27b";
const hasGroq = () => !!process.env.GROQ_API_KEY;

// Answer language, chosen by the user in the UI and sent as `lang` on each
// request. Defaults to Hinglish if missing/unknown.
const LANG_INSTR = {
  en: "English",
  hinglish: "Roman Hindi — Hindi written in English letters (friendly Hinglish)",
  hi: "Hindi in the Devanagari script (हिंदी)",
  mr: "Marwari (the Rajasthani language) written in the Devanagari script",
};
const resolveLang = (key) => LANG_INSTR[key] || LANG_INSTR.hinglish;

// Create the Gemini client lazily, only when first needed. This lets the
// server boot even without a key, and return a clean error from /detect.
let _client;
function getClient() {
  if (!process.env.GEMINI_KEY) {
    throw new Error("GEMINI_KEY is not set — add your Gemini key in the .env file.");
  }
  if (!_client) _client = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
  return _client;
}

// Try Gemini first; if it fails and Groq is configured, fall back to Groq so
// the user still gets an answer. Logs which provider served the request.
async function withFallback(label, geminiFn, groqFn) {
  try {
    return await geminiFn();
  } catch (e) {
    console.warn(`[${label}] Gemini failed: ${e.message}`);
    if (!hasGroq()) throw e;
    console.warn(`[${label}] Falling back to Groq…`);
    return await groqFn();
  }
}

// ---- Shared prompt for leaf diagnosis (used by both providers) ----
function leafPrompt(answerLanguage) {
  return `You are "Poly-Guardian AI", a farmer-friendly plant doctor.
Look carefully at the leaf photo and identify the disease.

Rules:
- Write ALL farmer-facing text (explanation, organic, chemical, prevention, warning) in ${answerLanguage}. Keep "crop", "disease" and "severity" recognisable (a short English/botanical name is fine).
- If the photo has no plant/leaf or is unclear, set "disease" to "Unknown" and ask for a clearer photo in the explanation.
- If the leaf is completely healthy, set "disease" to "Healthy" and "severity" to "None".
- "confidence" is your own estimate (0-100) of how sure the identification is.

Reply with ONLY this JSON (no extra text):
{
  "crop": "crop name, e.g. Tomato / Potato / Unknown",
  "disease": "disease name, or Healthy, or Unknown",
  "confidence": a number between 0 and 100,
  "severity": "None / Low / Medium / High",
  "explanation": "2-3 lines on what the disease is",
  "organic": "organic / home remedy in simple words",
  "chemical": "chemical medicine name and dosage",
  "prevention": "2-3 ways to prevent it",
  "warning": "when the farmer should urgently see an expert"
}`;
}

// ---- Groq (OpenAI-compatible) chat helper ----
async function groqChat({ model, messages, json }) {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: json ? 0.4 : 0.6,
      ...(json ? { response_format: { type: "json_object" } } : {}),
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Groq ${res.status}: ${t.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

// ---- Leaf diagnosis: Gemini + Groq implementations ----
async function analyzeLeafGemini(buffer, mimeType, answerLanguage) {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { text: leafPrompt(answerLanguage) },
          { inlineData: { mimeType: mimeType || "image/jpeg", data: buffer.toString("base64") } },
        ],
      },
    ],
    config: { responseMimeType: "application/json", temperature: 0.4 },
  });
  return response.text;
}

async function analyzeLeafGroq(buffer, mimeType, answerLanguage) {
  const dataUrl = `data:${mimeType || "image/jpeg"};base64,${buffer.toString("base64")}`;
  return groqChat({
    model: GROQ_VISION_MODEL,
    json: true,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: leafPrompt(answerLanguage) },
          { type: "image_url", image_url: { url: dataUrl } },
        ],
      },
    ],
  });
}

// ---- Pest density: shared prompt + both providers ----
function pestPrompt(answerLanguage) {
  return `You are "Poly-Guardian AI", a pest-monitoring assistant.
Look at the photo — a sticky trap, or a leaf/plant with insects — and estimate the pest infestation.

Rules:
- Write farmer-facing text ("crop_risk", "explanation", "action") in ${answerLanguage}. Keep "pest" and "density" recognisable (a short English name is fine).
- If no insects are visible or the photo is unclear, set "pest" to "None", "density" to "None", "count" to "0", and ask for a clearer trap/leaf photo in the explanation.
- "density" must be exactly one of: None / Low / Medium / High (in English).
- "density_percent" is a number from 0 to 100 estimating how heavy the infestation is (0 = none, ~1-33 = Low, ~34-66 = Medium, ~67-100 = High) — keep it consistent with "density".
- "count" is your best estimate of how many pests are visible — a number or short range like "20-30".

Reply with ONLY this JSON (no extra text):
{
  "pest": "main pest name, e.g. Whitefly / Thrips / Aphid",
  "count": "estimated count, e.g. 25 or 20-30",
  "density": "None / Low / Medium / High",
  "density_percent": a number from 0 to 100,
  "crop_risk": "which crops this pest threatens",
  "explanation": "2-3 lines on what you see and the risk level",
  "action": "what the farmer should do now — organic first, then chemical with dosage"
}`;
}

async function analyzePestGemini(buffer, mimeType, answerLanguage) {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      { role: "user", parts: [
        { text: pestPrompt(answerLanguage) },
        { inlineData: { mimeType: mimeType || "image/jpeg", data: buffer.toString("base64") } },
      ] },
    ],
    config: { responseMimeType: "application/json", temperature: 0.4 },
  });
  return response.text;
}

async function analyzePestGroq(buffer, mimeType, answerLanguage) {
  const dataUrl = `data:${mimeType || "image/jpeg"};base64,${buffer.toString("base64")}`;
  return groqChat({
    model: GROQ_VISION_MODEL,
    json: true,
    messages: [
      { role: "user", content: [
        { type: "text", text: pestPrompt(answerLanguage) },
        { type: "image_url", image_url: { url: dataUrl } },
      ] },
    ],
  });
}

// ---- Agronomist chat: Gemini + Groq implementations ----
const AGRONOMIST_SYSTEM = `You are the "Poly-Guardian Digital Agronomist", a warm, practical farm advisor for smallholder polyhouse farmers in Rajasthan, India.

Rules:
- You understand Marwari, Hindi and English questions.
- Be short and practical (2-5 sentences). Give clear, doable steps. Prefer low-cost and organic options first, then chemical if needed with exact dosage.
- You are advisory only — for severe or spreading problems, tell them to consult a local Krishi Vigyan Kendra / agronomist.

Today's polyhouse context you can refer to (demo data): 3 polyhouses growing Capsicum, Cucumber, Rose. Temp 34.2C, Humidity 68% RH, VPD 1.9 kPa (above mite threshold). Polyhouse 2 mite risk 78/100 and rising. Top pest: Whitefly, up 18% in 24h. Last spray: Spinosad, 4 days ago.`;

async function askGemini({ message, history, system }) {
  const ai = getClient();
  const contents = [];
  for (const h of history.slice(-10)) {
    if (!h || !h.text) continue;
    contents.push({ role: h.role === "user" ? "user" : "model", parts: [{ text: String(h.text) }] });
  }
  contents.push({ role: "user", parts: [{ text: String(message) }] });
  const response = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: { systemInstruction: system, temperature: 0.6 },
  });
  return response.text;
}

async function askGroq({ message, history, system }) {
  const messages = [{ role: "system", content: system }];
  for (const h of history.slice(-10)) {
    if (!h || !h.text) continue;
    messages.push({ role: h.role === "user" ? "user" : "assistant", content: String(h.text) });
  }
  messages.push({ role: "user", content: String(message) });
  return groqChat({ model: GROQ_TEXT_MODEL, messages });
}

// ---- Route: leaf diagnosis ----
app.post("/detect", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image received" });

    const answerLanguage = resolveLang(req.body && req.body.lang);
    const raw = await withFallback(
      "detect",
      () => analyzeLeafGemini(req.file.buffer, req.file.mimetype, answerLanguage),
      () => analyzeLeafGroq(req.file.buffer, req.file.mimetype, answerLanguage),
    );

    let data;
    try {
      const clean = String(raw).replace(/```json|```/g, "").trim();
      data = JSON.parse(clean);
    } catch {
      return res.status(502).json({ error: "AI did not return clean JSON", raw });
    }

    data.confidence = Math.round(Number(data.confidence) || 0);
    // UI shape: { crop, disease, confidence, severity, explanation, organic, chemical, prevention, warning }
    res.json(data);
  } catch (e) {
    console.error("DETECT ERROR:", e.message);
    res.status(500).json({ error: "Detection failed", detail: e.message });
  }
});

// ---- Route: Agronomist chat ----
app.post("/ask", async (req, res) => {
  try {
    const { message, history = [] } = req.body || {};
    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: "No message received" });
    }
    const system = `${AGRONOMIST_SYSTEM}\n\nALWAYS reply in ${resolveLang(req.body && req.body.lang)}, no matter which language the question is written in.`;

    const reply = await withFallback(
      "ask",
      () => askGemini({ message, history, system }),
      () => askGroq({ message, history, system }),
    );

    res.json({ reply: (reply || "").trim() });
  } catch (e) {
    console.error("ASK ERROR:", e.message);
    res.status(500).json({ error: "Agronomist could not reply", detail: e.message });
  }
});

// ---- Route: pest density scan ----
app.post("/pest", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image received" });
    const answerLanguage = resolveLang(req.body && req.body.lang);
    const raw = await withFallback(
      "pest",
      () => analyzePestGemini(req.file.buffer, req.file.mimetype, answerLanguage),
      () => analyzePestGroq(req.file.buffer, req.file.mimetype, answerLanguage),
    );
    let data;
    try {
      const clean = String(raw).replace(/```json|```/g, "").trim();
      data = JSON.parse(clean);
    } catch {
      return res.status(502).json({ error: "AI did not return clean JSON", raw });
    }
    res.json(data);
  } catch (e) {
    console.error("PEST ERROR:", e.message);
    res.status(500).json({ error: "Pest scan failed", detail: e.message });
  }
});

// Health check — open http://localhost:5001/health in the browser to test.
app.get("/health", (req, res) =>
  res.json({ ok: true, model: MODEL, groqFallback: hasGroq() })
);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  if (!process.env.GEMINI_KEY) {
    console.warn("WARNING: GEMINI_KEY not found in .env — /detect will not work until you add it.");
  }
  console.log(`Poly-Guardian backend running: http://localhost:${PORT}`);
  console.log(`Groq fallback: ${hasGroq() ? "enabled" : "not configured (add GROQ_API_KEY to .env)"}`);
});