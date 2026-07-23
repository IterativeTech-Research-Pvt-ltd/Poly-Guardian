// Answer-language options. `id` is sent to the backend on every AI call.
export const LANGS = [
  { id: "en", label: "English", sub: "Answers in English" },
  { id: "hinglish", label: "Hinglish", sub: "Hindi in English letters" },
  { id: "hi", label: "हिंदी", sub: "Hindi · Devanagari" },
];

const KEY = "pg_lang";
export const getSavedLang = () => {
  try { return localStorage.getItem(KEY); } catch { return null; }
};
export const saveLang = (id) => {
  try { localStorage.setItem(KEY, id); } catch { /* ignore */ }
};
export const labelFor = (id) => (LANGS.find((l) => l.id === id) || LANGS[1]).label;

// BCP-47 codes for the Web Speech API (voice input / output).
export const speechLang = (id) => (id === "en" ? "en-IN" : "hi-IN");