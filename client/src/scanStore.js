// Shared scan history — the single source of truth for both the Dashboard
// and the Leaf Scan "recent scans" list. Persists to localStorage and lets
// components subscribe so they stay in sync.
import { useEffect, useState } from "react";

const KEY = "pg_scans";
const now = Date.now();

// Seed history so the dashboard isn't empty on first run. Each seed is a FULL
// diagnosis, so tapping it re-opens a complete prescription. Real scans prepend
// to this and persist.
const SEED = [
  {
    id: "seed-1", t: now - 12 * 60000,
    crop: "Capsicum", disease: "Powdery Mildew", confidence: 92, severity: "Medium",
    explanation: "Patton par safed powder jaisi parat aur peelapan. Yeh powdery mildew fungus hai, jo nami aur kam hawa me tezi se failta hai.",
    organic: "Neem oil (5 ml/L) ya baking soda (5 g/L) ka spray har 7 din me karein. Kharab patte hata dein.",
    chemical: "Sulphur 80% WG 2 g/L, ya Hexaconazole 5% SC 1 ml/L. 10-12 din ke antar par dohrayein.",
    prevention: "Venting badhayein, raat ki nami kam rakhein, paudhon ke beech hawa chalti rahe.",
    warning: "Agar 4-5 din me safed parat poore paudhe par fail jaye ya phool girne lagein, expert se milein.",
  },
  {
    id: "seed-2", t: now - 70 * 60000,
    crop: "Rose", disease: "Black Spot", confidence: 88, severity: "High",
    explanation: "Patton par kaale gol dhabbe jinke charon or peela ghera. Black spot fungus (Diplocarpon rosae) — nami me tezi se failta hai.",
    organic: "Prabhavit patte tod kar jala dein. Neem oil (5 ml/L) ka spray, upar se paani na dein.",
    chemical: "Chlorothalonil 2 g/L ya Mancozeb 2.5 g/L. 10 din ke antar par 2-3 baar.",
    prevention: "Paani jad me dein, hawa ka aana-jaana rakhein, gire hue patte hata dein.",
    warning: "Agar poora paudha patra-heen ho raha ho to turant krishi visheshagya se milein.",
  },
  {
    id: "seed-3", t: now - 27 * 3600000,
    crop: "Cucumber", disease: "Downy Mildew", confidence: 79, severity: "Medium",
    explanation: "Patton ki upari satah par peele koney-daar dhabbe, neeche halka bengani-safed powder. Downy mildew thandi nami me failta hai.",
    organic: "Prabhavit patte hata dein. Copper-based (Bordeaux mixture) ka halka spray karein.",
    chemical: "Metalaxyl + Mancozeb (Ridomil) 2 g/L. 10 din me dohrayein.",
    prevention: "Overhead paani se bachein, achhi venting rakhein, subah paani dein taaki patte sookh jaayein.",
    warning: "Agar bel tezi se sukhne lage to turant salah lein.",
  },
];

const listeners = new Set();

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(raw)) return raw;
  } catch { /* ignore */ }
  return SEED.slice();
}
function write(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50))); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

export function getScans() { return read(); }

export function addScan(result) {
  const t = Date.now();
  const rec = { id: "s-" + t, t, ...result };
  write([rec, ...read()]);
  return rec;
}

// React hook — re-renders the component whenever the history changes.
export function useScans() {
  const [scans, setScans] = useState(read);
  useEffect(() => {
    const l = () => setScans(read());
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return scans;
}