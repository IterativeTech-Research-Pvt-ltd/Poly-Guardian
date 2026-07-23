// Shared inline SVG icons. Each accepts props (className, width, etc.).
const S = (props) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...props,
});

export const Leaf = (p) => (
  <svg {...S(p)}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></svg>
);
export const Gauge = (p) => (
  <svg {...S(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const ScanFrame = (p) => (
  <svg {...S(p)}><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="3" /></svg>
);
export const ScanLine = (p) => (
  <svg {...S(p)}><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M3 12h18" /></svg>
);
export const Bug = (p) => (
  <svg {...S(p)}><path d="M12 3v3M8 6l-2-2M16 6l2-2" /><rect x="6" y="6" width="12" height="9" rx="4" /><path d="M9 18l-2 3M15 18l2 3M12 15v6" /></svg>
);
export const Chat = (p) => (
  <svg {...S(p)}><rect x="3" y="4" width="18" height="14" rx="3" /><path d="M8 21l4-3 4 3" /></svg>
);
export const Dot = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><circle cx="12" cy="12" r="5" /></svg>
);
export const Flame = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M12 2s6 6.5 6 11a6 6 0 0 1-12 0c0-2 1-4 2.5-6 .5 1 1.5 1.5 2 1.5C10 7 12 4 12 2Z" /></svg>
);
export const TrendUp = (p) => (
  <svg {...S(p)}><path d="M3 17l6-6 4 4 7-8" /><path d="M17 7h4v4" /></svg>
);
export const ArrowUpRight = (p) => (
  <svg {...S(p)}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Camera = (p) => (
  <svg {...S(p)}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="3.5" /></svg>
);
export const UploadIcon = (p) => (
  <svg {...S(p)}><path d="M12 15V3M7 8l5-5 5 5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
);
export const Refresh = (p) => (
  <svg {...S(p)}><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.4 2.6L3 8" /><path d="M3 3v5h5" /></svg>
);
export const Mic = (p) => (
  <svg {...S(p)}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
);
export const Send = (p) => (
  <svg {...S(p)}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" /></svg>
);
export const User = (p) => (
  <svg {...S(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
);
export const Check = (p) => (
  <svg {...S({ strokeWidth: 2.4, ...p })}><path d="M20 6 9 17l-5-5" /></svg>
);
export const SickLeaf = (p) => (
  <svg {...S(p)}><path d="M12 2s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" /><path d="M2 2l8 8" /></svg>
);
export const Question = (p) => (
  <svg {...S(p)}><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /><circle cx="12" cy="12" r="9" /></svg>
);
export const Flask = (p) => (
  <svg {...S(p)}><path d="M9 3h6M10 3v6.5L5.2 17A2 2 0 0 0 7 20h10a2 2 0 0 0 1.8-3L14 9.5V3" /></svg>
);
export const Shield = (p) => (
  <svg {...S(p)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
);
export const Alert = (p) => (
  <svg {...S(p)}><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>
);
export const Globe = (p) => (
  <svg {...S(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>
);
export const Calendar = (p) => (
  <svg {...S(p)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
);