// All calls use relative URLs. In dev, Vite proxies them to the Express
// backend (see vite.config.js); in production Express serves both.
// `lang` ("en" | "hinglish" | "hi") tells the backend which language to answer in.

export async function detectLeaf(file, lang) {
  const form = new FormData();
  form.append("image", file); // key MUST be "image"
  if (lang) form.append("lang", lang);
  const res = await fetch("/detect", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Diagnosis failed. Please try again.");
  return data;
}

export async function askAgronomist(message, history, lang) {
  const res = await fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, lang }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Agronomist could not reply.");
  return data.reply;
}