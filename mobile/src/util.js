// `t` is the translate function (from useLang), so time reads in the chosen language.
export function relTime(ts, t) {
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 1) return t("just_now");
  if (m < 60) return t("min_ago", m);
  const h = Math.round(m / 60);
  if (h < 24) return t("h_ago", h);
  const d = Math.round(h / 24);
  return d === 1 ? t("yesterday") : t("days_ago", d);
}

export const sevKey = (s = "") => {
  s = (s || "").toLowerCase();
  if (s.includes("high")) return "high";
  if (s.includes("med")) return "medium";
  if (s.includes("low")) return "low";
  return "none";
};

export const isRealDisease = (d = "") => !!d && !/healthy|unknown/i.test(d);