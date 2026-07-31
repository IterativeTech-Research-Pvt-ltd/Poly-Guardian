// Simulated "digital twin" of the polyhouses. Climate values drift every few
// seconds; risk scores are derived from VPD (the metric from the concept doc).
// When the real LoRaWAN sensors exist, they feed this same shape — no UI change.
import { useEffect, useState } from "react";

const clamp = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));
const drift = (v, amt, lo, hi) => clamp(v + (Math.random() - 0.5) * amt, lo, hi);
// Saturation vapour pressure (kPa) → used for Vapour Pressure Deficit.
const svp = (t) => 0.6108 * Math.exp((17.27 * t) / (t + 237.3));

let zones = [
  { id: "ph1", node: "PG-Node-01", name: "Polyhouse 1", crop: "Capsicum", temp: 34.2, hum: 68, thrips: 55, pest: 142, battery: 92, signal: -78 },
  { id: "ph2", node: "PG-Node-02", name: "Polyhouse 2", crop: "Cucumber", temp: 32.6, hum: 76, thrips: 40, pest: 61, battery: 71, signal: -84 },
  { id: "ph3", node: "PG-Node-03", name: "Polyhouse 3", crop: "Rose", temp: 35.6, hum: 57, thrips: 74, pest: 96, battery: 100, signal: -68 },
];

function derive(z) {
  const vpd = svp(z.temp) * (1 - z.hum / 100);
  return {
    ...z,
    vpd,
    // High VPD (dry) → mites thrive.  Low VPD (humid) → fungal risk.
    mite: Math.round(clamp(((vpd - 0.9) / 1.3) * 100)),
    fungal: Math.round(clamp(((1.6 - vpd) / 1.2) * 100)),
    thrips: Math.round(z.thrips),
  };
}

function tick() {
  zones = zones.map((z) => ({
    ...z,
    temp: drift(z.temp, 0.5, 28, 42),
    hum: drift(z.hum, 1.6, 45, 90),
    thrips: drift(z.thrips, 5, 8, 96),
    pest: Math.round(drift(z.pest, 8, 0, 320)),
    battery: drift(z.battery, 0.2, 20, 100),
    signal: Math.round(drift(z.signal, 2, -100, -60)),
  }));
}

export function useTwin() {
  const [, force] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => { tick(); force((x) => x + 1); }, 3000);
    return () => clearInterval(iv);
  }, []);
  return zones.map(derive);
}