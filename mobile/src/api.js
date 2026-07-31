import { Platform } from "react-native";
import { API_BASE } from "./config";
import { getFarmerId } from "./farmer";

// Upload a photo (local file uri) to an image endpoint and return the JSON.
async function postImage(endpoint, uri, lang) {
  const form = new FormData();
  if (Platform.OS === "web") {
    // In a browser the picker gives a blob/data URL — fetch the real bytes
    // and append an actual Blob, otherwise nothing is uploaded.
    const blob = await (await fetch(uri)).blob();
    form.append("image", blob, "photo.jpg");
  } else {
    // On a real device, React Native uploads the file object directly.
    form.append("image", { uri, name: "photo.jpg", type: "image/jpeg" });
  }
  if (lang) form.append("lang", lang);
  const fid = await getFarmerId();
  if (fid) form.append("farmerId", fid);

  const res = await fetch(`${API_BASE}${endpoint}`, { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed. Please try again.");
  return data;
}

// Leaf disease diagnosis.
export const detectLeaf = (uri, lang) => postImage("/detect", uri, lang);

// Pest density scan.
export const detectPest = (uri, lang) => postImage("/pest", uri, lang);

export async function askAgronomist(message, history, lang) {
  const res = await fetch(`${API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, lang }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Agronomist could not reply.");
  return data.reply;
}

// Re-translate a result's free-text fields into another language (no re-scan).
export async function translateFields(fields, lang) {
  const res = await fetch(`${API_BASE}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields, lang }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Translate failed");
  return data;
}