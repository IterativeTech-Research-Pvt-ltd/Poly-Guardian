import { Leaf, Gauge, ScanFrame, Bug, Chat, Globe } from "./icons.jsx";
import { labelFor } from "../lang.js";

const TABS = [
  { id: "dashboard", label: "Dashboard", Icon: Gauge },
  { id: "leafscan", label: "Leaf Scan", Icon: ScanFrame },
  { id: "trap", label: "Trap Monitor", Icon: Bug },
  { id: "agronomist", label: "Agronomist AI", Icon: Chat },
];

export default function Nav({ active, onTab, lang, onOpenLang }) {
  return (
    <nav className="nav">
      <div className="brand">
        <div className="logo">
          <Leaf stroke="#fff" width="25" height="25" />
        </div>
        <div>
          <h1>Poly-Guardian</h1>
          <p>Edge-AI for Rajasthan polyhouses</p>
        </div>
      </div>
      <div className="tabs" role="tablist">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={"tab" + (active === id ? " active" : "")}
            onClick={() => onTab(id)}
          >
            <Icon width="17" height="17" />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <button className="lang-btn" onClick={onOpenLang} title="Change language">
        <Globe width="16" height="16" />
        <span>{lang ? labelFor(lang) : "Language"}</span>
      </button>
    </nav>
  );
}