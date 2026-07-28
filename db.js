// Supabase (Postgres) data layer for the admin portal.
// If SUPABASE_URL / SUPABASE_SERVICE_KEY aren't set, the app still runs —
// scans just aren't recorded and the admin portal reports "not configured".
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;
export const dbEnabled = !!(url && key);
const supabase = dbEnabled ? createClient(url, key, { auth: { persistSession: false } }) : null;

// Indian cropping seasons by sowing month.
export function seasonForDate(d = new Date()) {
  const m = d.getMonth() + 1; // 1-12
  if (m >= 6 && m <= 10) return "Kharif";  // Jun–Oct (monsoon)
  if (m === 4 || m === 5) return "Zaid";   // Apr–May (summer)
  return "Rabi";                            // Nov–Mar (winter)
}

export async function registerFarmer({ name, village, phone }) {
  const { data, error } = await supabase
    .from("farmers")
    .insert({ name, village: village || null, phone: phone || null })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id;
}

export async function saveScan(rec) {
  const row = {
    farmer_id: rec.farmerId || null,
    kind: rec.kind,
    crop: rec.crop || null,
    result: rec.result || null,
    severity: rec.severity || null,
    confidence: Number.isFinite(rec.confidence) ? Math.round(rec.confidence) : null,
    lang: rec.lang || null,
    season: seasonForDate(),
  };
  const { error } = await supabase.from("scans").insert(row);
  if (error) throw new Error(error.message);
}

export async function getStats() {
  const head = { count: "exact", head: true };
  const [f, s, leaf, pest] = await Promise.all([
    supabase.from("farmers").select("*", head),
    supabase.from("scans").select("*", head),
    supabase.from("scans").select("*", head).eq("kind", "leaf"),
    supabase.from("scans").select("*", head).eq("kind", "pest"),
  ]);
  return { farmers: f.count || 0, scans: s.count || 0, leaf: leaf.count || 0, pest: pest.count || 0 };
}

export async function getFarmers() {
  const { data: farmers, error } = await supabase
    .from("farmers").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  const { data: scans } = await supabase.from("scans").select("farmer_id");
  const counts = {};
  (scans || []).forEach((s) => { if (s.farmer_id) counts[s.farmer_id] = (counts[s.farmer_id] || 0) + 1; });
  return (farmers || []).map((f) => ({ ...f, scanCount: counts[f.id] || 0 }));
}

export async function getFarmerScans(farmerId) {
  const { data: farmer } = await supabase.from("farmers").select("*").eq("id", farmerId).single();
  const { data: scans } = await supabase
    .from("scans").select("*").eq("farmer_id", farmerId).order("created_at", { ascending: false });
  return { farmer: farmer || null, scans: scans || [] };
}

export async function getSeasonSummary() {
  const { data: scans } = await supabase.from("scans").select("season, crop, result, kind");
  const seasons = {
    Rabi: { count: 0, crops: {} },
    Kharif: { count: 0, crops: {} },
    Zaid: { count: 0, crops: {} },
  };
  (scans || []).forEach((s) => {
    const se = seasons[s.season] || (seasons[s.season] = { count: 0, crops: {} });
    se.count++;
    const label = s.crop || s.result;
    if (label) se.crops[label] = (se.crops[label] || 0) + 1;
  });
  return seasons;
}