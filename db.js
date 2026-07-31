// Supabase data layer for the admin portal — talks to Supabase's REST API
// (PostgREST) with fetch, so there's no WebSocket/Node-version issue.
// If SUPABASE_URL / SUPABASE_SERVICE_KEY aren't set, the app still runs;
// scans just aren't recorded and the admin portal reports "not configured".

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;
export const dbEnabled = !!(url && key && !/your-project|your_service/.test(`${url}${key}`));

const BASE = url ? `${url.replace(/\/$/, "")}/rest/v1` : null;
const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
};

async function sbGet(pathAndQuery) {
  const res = await fetch(`${BASE}/${pathAndQuery}`, { headers });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}
async function sbInsert(table, row) {
  const res = await fetch(`${BASE}/${table}`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

// Indian cropping seasons by sowing month.
export function seasonForDate(d = new Date()) {
  const m = d.getMonth() + 1; // 1-12
  if (m >= 6 && m <= 10) return "Kharif";  // Jun–Oct (monsoon)
  if (m === 4 || m === 5) return "Zaid";   // Apr–May (summer)
  return "Rabi";                            // Nov–Mar (winter)
}

export async function registerFarmer({ name, village, phone }) {
  const row = await sbInsert("farmers", { name, village: village || null, phone: phone || null });
  return row.id;
}

export async function saveScan(rec) {
  await sbInsert("scans", {
    farmer_id: rec.farmerId || null,
    kind: rec.kind,
    crop: rec.crop || null,
    result: rec.result || null,
    severity: rec.severity || null,
    confidence: Number.isFinite(rec.confidence) ? Math.round(rec.confidence) : null,
    lang: rec.lang || null,
    season: seasonForDate(),
  });
}

export async function getStats() {
  const [farmers, scans] = await Promise.all([
    sbGet("farmers?select=id"),
    sbGet("scans?select=kind"),
  ]);
  return {
    farmers: farmers.length,
    scans: scans.length,
    leaf: scans.filter((s) => s.kind === "leaf").length,
    pest: scans.filter((s) => s.kind === "pest").length,
  };
}

export async function getFarmers() {
  const [farmers, scans] = await Promise.all([
    sbGet("farmers?select=*&order=created_at.desc"),
    sbGet("scans?select=farmer_id"),
  ]);
  const counts = {};
  scans.forEach((s) => { if (s.farmer_id) counts[s.farmer_id] = (counts[s.farmer_id] || 0) + 1; });
  return farmers.map((f) => ({ ...f, scanCount: counts[f.id] || 0 }));
}

export async function getFarmerScans(farmerId) {
  const [farmers, scans] = await Promise.all([
    sbGet(`farmers?id=eq.${farmerId}&select=*`),
    sbGet(`scans?farmer_id=eq.${farmerId}&select=*&order=created_at.desc`),
  ]);
  return { farmer: farmers[0] || null, scans };
}

export async function getSeasonSummary() {
  const scans = await sbGet("scans?select=season,crop,result");
  const seasons = {
    Rabi: { count: 0, crops: {} },
    Kharif: { count: 0, crops: {} },
    Zaid: { count: 0, crops: {} },
  };
  scans.forEach((s) => {
    const se = seasons[s.season] || (seasons[s.season] = { count: 0, crops: {} });
    se.count++;
    const label = s.crop || s.result;
    if (label) se.crops[label] = (se.crops[label] || 0) + 1;
  });
  return seasons;
}