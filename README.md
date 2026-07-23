# 🌿 Poly-Guardian — Edge-AI for Rajasthan polyhouses

A farmer-facing polyhouse assistant.
**Frontend:** React + Vite (4 tabs). **Backend:** Express + Gemini.

- **Dashboard** — **dynamic** from your real scan history: totals, recent diagnoses (tap any to re-open its prescription), and top issues. Sensor/trap cards were removed as they need Phase-2 hardware.
- **Leaf Scan** — upload/photograph a leaf → disease + confidence + full prescription *(live)*. Recent scans are clickable to re-open.
- **Trap Monitor** — Phase 2 placeholder (needs trap-camera hardware)
- **Agronomist AI** — chat advisor in Hindi / Marwari / English + voice input *(live)*

> **Resilience:** every AI call tries **Gemini** first and automatically falls back to
> **Groq** if Gemini fails (e.g. quota / 429) — so users always get an answer.

> **Language:** on first load the app asks for **English / Hinglish / हिंदी** (changeable
> anytime from the 🌐 button in the nav, remembered via localStorage). Both Leaf Scan and the
> Agronomist answer in the chosen language — the choice is sent to the backend as `lang` on
> each request and applied in the Gemini prompt.

---

## Project structure

```
poly-guardian-backend/
├── server.js              # Express: serves the built app + /detect + /ask + /health
├── .env                   # GEMINI_KEY, GEMINI_MODEL, PORT
├── package.json           # backend + top-level scripts (start / build / dev)
├── test-gemini.js         # quick key/model check
└── client/                # React + Vite frontend
    ├── index.html
    ├── vite.config.js     # dev proxy to backend + build → client/dist
    └── src/
        ├── main.jsx, App.jsx, api.js, toast.js, styles.css
        └── components/    # Nav, Dashboard, LeafScan, TrapMonitor, Agronomist, icons
```

## How it works

```
React app  ──/detect (leaf image)──►  Express ──► Gemini Vision  → disease + prescription
           ──/ask    (chat message)─►  Express ──► Gemini (text)  → agronomist reply
```
Dev: Vite (:5173) proxies `/detect` + `/ask` to Express (:5001).
Prod: Express (:5001) serves the built React app **and** the API — one URL, no CORS.

---

## Setup (once)

**1. Add your keys** — open `.env`:
```
GEMINI_KEY=your_gemini_key           # primary — https://aistudio.google.com/apikey
GEMINI_MODEL=gemini-flash-latest
PORT=5001

GROQ_API_KEY=your_groq_key           # fallback — https://console.groq.com/keys
GROQ_MODEL=openai/gpt-oss-120b       # text fallback
GROQ_VISION_MODEL=qwen/qwen3.6-27b   # image fallback
```
Groq is optional but recommended — without it, a Gemini outage/quota just returns an error.
If a Groq model ID stops working, check https://console.groq.com/docs/models and update it here.
Key from https://aistudio.google.com/apikey

**2. Install dependencies:**
```bash
cd ~/Desktop/poly-guardian-backend
npm install                # backend
npm run client:install     # frontend (React + Vite)
```

---

## Run it — two ways

### A) Development (hot reload) — recommended while building
```bash
npm run dev
```
This starts **both** the backend and the Vite dev server together.
Open **http://localhost:5173** — edits to `client/src` update instantly.

### B) Production / demo — one URL
```bash
npm run build      # builds client → client/dist
npm start          # Express serves the built app + the API
```
Open **http://localhost:5001**.

> Port is **5001** on purpose — macOS uses 5000 for AirPlay.

---

## API (same server)

| Method | Route | Body | Returns |
|---|---|---|---|
| POST | `/detect` | form-data, key `image` (file) | `{crop, disease, confidence, severity, explanation, organic, chemical, prevention, warning}` |
| POST | `/ask` | JSON `{message, history}` | `{reply}` |
| GET  | `/health` | — | `{ok, model}` |

Quick test:
```bash
curl -X POST http://localhost:5001/ask -H "Content-Type: application/json" \
  -d '{"message":"Whitefly capsicum me lag rahi hai, kya karu?","history":[]}'
```

---

## Customizing

- **Look/colors:** `client/src/styles.css` — the palette lives in the `:root` variables at the top.
- **Screens:** each tab is a component in `client/src/components/`.
- **Dashboard data** (risk scores, alerts, species, season impact) is hardcoded demo data in `Dashboard.jsx` — swap it for real data when the Phase 2 sensor/trap kit is connected.

## Common problems

| Problem | Fix |
|---|---|
| Blank page at :5001 | Run `npm run build` first (creates `client/dist`) |
| Port 5001 busy / stale server | `pkill -f "node server.js"` then `npm start` |
| `GEMINI_KEY is not set` | Add the key in `.env`, restart the server |
| Model not found (404) | Try `GEMINI_MODEL=gemini-3.5-flash` in `.env` |
| Voice mic does nothing | Web Speech API needs Chrome/Edge; typing always works |# Poly-Guardian
