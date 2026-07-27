import AsyncStorage from "@react-native-async-storage/async-storage";

export const LANGS = [
  { id: "en", label: "English" },
  { id: "hinglish", label: "Hinglish" },
  { id: "hi", label: "हिंदी" },
  { id: "mr", label: "मारवाड़ी" },
];

const KEY = "pg_lang";
export const getSavedLang = async () => {
  try { return await AsyncStorage.getItem(KEY); } catch { return null; }
};
export const saveLang = async (id) => {
  try { await AsyncStorage.setItem(KEY, id); } catch { /* ignore */ }
};
export const labelFor = (id) => (LANGS.find((l) => l.id === id) || LANGS[1]).label;

// Text-to-speech voice. Marwari falls back to the Hindi voice.
export const speechLang = (id) => (id === "en" ? "en-IN" : "hi-IN");