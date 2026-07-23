import { ScanFrame, Chat, Alert, Leaf, Calendar, ArrowUpRight } from "./icons.jsx";
import { useScans } from "../scanStore.js";
import { relTime, sevKey, SEV, isRealDisease } from "../util.js";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard({ onGoto, onOpenScan }) {
  const scans = useScans();

  const total = scans.length;
  const issues = scans.filter((s) => isRealDisease(s.disease)).length;
  const healthy = scans.filter((s) => /healthy/i.test(s.disease || "")).length;
  const weekAgo = Date.now() - 7 * 86400000;
  const thisWeek = scans.filter((s) => s.t >= weekAgo).length;
  const recent = scans.slice(0, 6);
  const last = scans[0];

  const counts = {};
  scans.filter((s) => isRealDisease(s.disease)).forEach((s) => {
    counts[s.disease] = (counts[s.disease] || 0) + 1;
  });
  const topIssues = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const maxCount = topIssues.length ? topIssues[0][1] : 1;

  let subtitle;
  if (!total) {
    subtitle = "Scan your first leaf to get an instant diagnosis and a full prescription.";
  } else if (last && isRealDisease(last.disease)) {
    subtitle = `Your last scan found ${last.disease} on ${last.crop || "a leaf"}. ${issues} of your ${total} scans need action — tap one below to see its prescription.`;
  } else {
    subtitle = `You've run ${total} scans so far. Scan another leaf or ask the Agronomist anything about your polyhouse.`;
  }

  const STATS = [
    { label: "Total scans", val: total, Icon: ScanFrame, cls: "ic-green" },
    { label: "Issues found", val: issues, Icon: Alert, cls: "ic-red" },
    { label: "Healthy leaves", val: healthy, Icon: Leaf, cls: "ic-green" },
    { label: "This week", val: thisWeek, Icon: Calendar, cls: "ic-blue" },
  ];

  return (
    <div className="dash">
      <div className="hero dash-hero">
        <span className="hero-eyebrow">🌱 Poly-Guardian · Phase 1</span>
        <h2>{greeting()}, Rakesh ji</h2>
        <p className="sub">{subtitle}</p>
        <div className="hero-cta">
          <button className="btn btn-white" onClick={() => onGoto("leafscan")}>
            <ScanFrame width="18" height="18" /> Scan a leaf
          </button>
          <button className="btn" style={{ background: "rgba(255,255,255,.16)", color: "#fff" }} onClick={() => onGoto("agronomist")}>
            <Chat width="18" height="18" /> Ask Agronomist
          </button>
        </div>
      </div>

      <div className="grid-4">
        {STATS.map((s) => (
          <div className="card stat" key={s.label}>
            <div className={"s-ic " + s.cls}><s.Icon width="20" height="20" /></div>
            <div className="s-val">{s.val}</div>
            <div className="s-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="sec-head">
            <div>
              <h3>Recent diagnoses</h3>
              <div className="sub">Tap any scan to re-open its full prescription</div>
            </div>
            <button className="link-out" onClick={() => onGoto("leafscan")}>
              New scan <ArrowUpRight width="14" height="14" />
            </button>
          </div>
          {recent.length ? (
            <div className="recent">
              {recent.map((s) => (
                <button className="recent-item" key={s.id} onClick={() => onOpenScan(s)}>
                  <span className="ri-left">
                    <span className="ri-dot" style={{ background: SEV[sevKey(s.severity)].dot }} />
                    <span className="ri-text">
                      <span className="r-name">{s.disease}</span>
                      <span className="r-meta">{s.crop || "Leaf"} · {relTime(s.t)}</span>
                    </span>
                  </span>
                  <span className="r-conf">{s.confidence || 0}%</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="empty">No scans yet — tap “Scan a leaf” to start.</div>
          )}
        </div>

        <div className="card">
          <div className="sec-head"><div><h3>Top issues</h3><div className="sub">Across your scans</div></div></div>
          {topIssues.length ? (
            <div className="issues">
              {topIssues.map(([name, count]) => (
                <div className="issue-row" key={name}>
                  <div className="ir-top"><span>{name}</span><b>{count}</b></div>
                  <div className="ir-bar"><span style={{ width: (count / maxCount) * 100 + "%" }} /></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">No diseases detected yet. 🌿</div>
          )}
        </div>
      </div>
    </div>
  );
}