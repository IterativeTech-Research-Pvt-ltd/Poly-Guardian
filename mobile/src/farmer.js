import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "./config";

const KEY = "pg_farmer";
let cache; // undefined = not loaded yet

export async function getFarmer() {
  if (cache !== undefined) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = raw ? JSON.parse(raw) : null;
  } catch { cache = null; }
  return cache;
}

export async function getFarmerId() {
  const f = await getFarmer();
  return f && f.id ? f.id : null;
}

// Register once with the backend; the returned id is stored and sent with scans.
export async function registerFarmer({ name, village, phone }) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, village, phone }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Registration failed");
  const farmer = { id: data.id, name, village, phone };
  cache = farmer;
  try { await AsyncStorage.setItem(KEY, JSON.stringify(farmer)); } catch { /* ignore */ }
  return farmer;
}