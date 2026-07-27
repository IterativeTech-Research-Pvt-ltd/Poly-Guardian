import { createContext, useContext } from "react";

// Holds the chosen language, a translate function `t`, and a way to re-open the picker.
export const LangContext = createContext({ lang: "hinglish", t: (k) => k, openPicker: () => {} });
export const useLang = () => useContext(LangContext);