// Shared scan history for Dashboard + Leaf Scan, persisted to AsyncStorage.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const KEY = "pg_scans";
const now = Date.now();

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

let cache = null;                 // null until hydrated from storage
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

export async function hydrate() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = raw ? JSON.parse(raw) : SEED.slice();
  } catch {
    cache = SEED.slice();
  }
  emit();
  return cache;
}

export function getScans() {
  return cache || SEED.slice();
}

export async function addScan(result) {
  const t = Date.now();
  const rec = { id: "s-" + t, t, ...result };
  cache = [rec, ...(cache || SEED.slice())].slice(0, 50);
  emit();
  try { await AsyncStorage.setItem(KEY, JSON.stringify(cache)); } catch { /* ignore */ }
  return rec;
}

export function useScans() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((x) => x + 1);
    listeners.add(l);
    if (cache === null) hydrate();
    return () => { listeners.delete(l); };
  }, []);
  return getScans();
}