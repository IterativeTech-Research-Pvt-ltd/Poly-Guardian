// Small shared helpers used by Dashboard + Leaf Scan.

export function relTime(t) {
  const m = Math.round((Date.now() - t) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return m + " min ago";
  const h = Math.round(m / 60);
  if (h < 24) return h + " h ago";
  const d = Math.round(h / 24);
  return d === 1 ? "Yesterday" : d + " days ago";
}

export const SEV = {
  high:   { bg: "#FDECEF", ink: "#EF3B57", dot: "#EF3B57" },
  medium: { bg: "#FCF1DC", ink: "#B7791F", dot: "#F0A83A" },
  low:    { bg: "#E2F0E0", ink: "#2F7C3E", dot: "#2FA84F" },
  none:   { bg: "#E2F0E0", ink: "#2F7C3E", dot: "#2FA84F" },
};

export const sevKey = (s = "") => {
  s = s.toLowerCase();
  if (s.includes("high")) return "high";
  if (s.includes("med")) return "medium";
  if (s.includes("low")) return "low";
  return "none";
};

export const isRealDisease = (d = "") => !!d && !/healthy|unknown/i.test(d);