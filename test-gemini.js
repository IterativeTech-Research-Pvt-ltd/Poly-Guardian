import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";

console.log("Model:", MODEL);
console.log("Key found?", process.env.GEMINI_KEY ? "yes" : "NO — add GEMINI_KEY in .env");

if (!process.env.GEMINI_KEY) process.exit(1);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

// 1) Text test — confirms the key works.
const hello = await ai.models.generateContent({
  model: MODEL,
  contents: "Say hello in one short line.",
});
console.log("\n[Text test]:", hello.text.trim());

// 2) Image test — only if a leaf.jpg is present in this folder.
if (fs.existsSync("./leaf.jpg")) {
  const buffer = fs.readFileSync("./leaf.jpg");
  const r = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { text: "What disease does this leaf have? Answer in one short line." },
          { inlineData: { mimeType: "image/jpeg", data: buffer.toString("base64") } },
        ],
      },
    ],
  });
  console.log("\n[Image test]:", r.text.trim());
} else {
  console.log("\n[Image test]: no leaf.jpg in this folder — skipped.");
  console.log("(Put a leaf photo named 'leaf.jpg' here to also test image input.)");
}