import { LANGS } from "../lang.js";
import { Leaf } from "./icons.jsx";

// First-load language chooser. When `onClose` is provided the user may dismiss
// it (used when re-opening from the nav); on first visit it's omitted so a
// choice is required.
export default function LanguagePicker({ current, onPick, onClose }) {
  return (
    <div className="lang-overlay" onClick={onClose || undefined}>
      <div className="lang-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lang-logo"><Leaf width="26" height="26" stroke="#fff" /></div>
        <h2>Choose your language</h2>
        <p>अपनी भाषा चुनें · Apni bhasha chunein</p>
        <div className="lang-opts">
          {LANGS.map((l) => (
            <button
              key={l.id}
              className={"lang-opt" + (current === l.id ? " active" : "")}
              onClick={() => onPick(l.id)}
            >
              <span className="lo-label">{l.label}</span>
              <span className="lo-sub">{l.sub}</span>
            </button>
          ))}
        </div>
        {onClose && <button className="lang-close" onClick={onClose}>Cancel</button>}
      </div>
    </div>
  );
}