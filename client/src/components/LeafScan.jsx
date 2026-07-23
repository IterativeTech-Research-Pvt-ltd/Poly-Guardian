import { useEffect, useRef, useState } from "react";
import { detectLeaf } from "../api.js";
import { toast } from "../toast.js";
import { useScans, addScan } from "../scanStore.js";
import { relTime, SEV, sevKey } from "../util.js";
import {
  Camera, UploadIcon, ScanLine, Refresh,
  Check, SickLeaf, Question, Leaf, Flask, Shield, Alert,
} from "./icons.jsx";

const RX = [
  { key: "organic", title: "Organic remedy", Icon: Leaf, cls: "ic-green" },
  { key: "chemical", title: "Chemical treatment", Icon: Flask, cls: "ic-blue" },
  { key: "prevention", title: "Prevention", Icon: Shield, cls: "ic-amber" },
  { key: "warning", title: "When to get help", Icon: Alert, cls: "ic-red", warn: true },
];
const isBlank = (v) => !v || v === "-" || /^\s*$/.test(v);

export default function LeafScan({ lang, openScan, onOpened }) {
  const fileInput = useRef(null);
  const [view, setView] = useState("upload");   // upload | loading | result
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [result, setResult] = useState(null);
  const scans = useScans();

  // Open a scan handed over from the Dashboard.
  useEffect(() => {
    if (openScan) {
      setResult(openScan);
      setPreview(null);
      setView("result");
      onOpened && onOpened();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openScan]);

  const openPicker = (useCamera) => {
    if (useCamera) fileInput.current.setAttribute("capture", "environment");
    else fileInput.current.removeAttribute("capture");
    fileInput.current.click();
  };

  const pickFile = (f) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) { toast("Please choose an image file."); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setView("upload");
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (fileInput.current) fileInput.current.value = "";
    setView("upload");
  };

  const openResult = (scan) => {
    setResult(scan);
    setPreview(null);
    setView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const diagnose = async () => {
    if (!file) return;
    setView("loading");
    try {
      const data = await detectLeaf(file, lang);
      setResult(data);
      const isUnknown = /unknown/i.test(data.disease || "") || /unknown/i.test(data.crop || "");
      if (!isUnknown) addScan(data);   // save the full result to shared history
      setView("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast(err.message);
      setView("upload");
    }
  };

  return (
    <>
      <div className="hero">
        <span className="hero-eyebrow">✨ Leaf Scan · Gemini Vision</span>
        <h2>Point, shoot, diagnose.</h2>
        <p className="sub">
          Snap a leaf and Poly-Guardian returns the pest/disease, a confidence score,
          and a full prescription in seconds.
        </p>
      </div>

      <div className="scan-grid">
        {/* left column */}
        <div className="card">
          {view === "upload" && (
            <>
              {!preview ? (
                <div
                  className={"drop" + (dragging ? " drag" : "")}
                  onClick={(e) => { if (!e.target.closest("button")) openPicker(false); }}
                  onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files?.[0]); }}
                >
                  <div className="cam"><Camera width="30" height="30" stroke="#fff" /></div>
                  <b>Drop leaf image or take a photo</b>
                  <small>JPG / PNG up to 8 MB · works best on a clear, close leaf</small>
                  <div className="drop-btns">
                    <button className="btn btn-primary" onClick={() => openPicker(false)}>
                      <UploadIcon width="18" height="18" /> Upload sample
                    </button>
                    <button className="btn btn-line" onClick={() => openPicker(true)}>
                      <Camera width="18" height="18" /> Use camera
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="preview-wrap">
                    <img src={preview} alt="Selected leaf" />
                    <button className="retake" onClick={(e) => { e.stopPropagation(); reset(); openPicker(false); }}>
                      <Refresh width="14" height="14" /> Retake
                    </button>
                  </div>
                  <button className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} onClick={diagnose}>
                    <ScanLine width="18" height="18" /> Diagnose leaf
                  </button>
                </div>
              )}
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />
            </>
          )}

          {view === "loading" && (
            <div className="loading">
              <div className="spinner" />
              <b>Diagnosing your leaf…</b>
              <p>Poly-Guardian AI is looking closely (first scan can take a few seconds)</p>
            </div>
          )}

          {view === "result" && result && <Result data={result} onAgain={reset} />}
        </div>

        {/* right column: recent scans */}
        <div className="card">
          <div className="sec-head"><div><h3>Recent scans</h3><div className="sub">Tap to re-open</div></div></div>
          <div className="recent">
            {scans.slice(0, 8).map((s) => (
              <button className="recent-item" key={s.id || s.t} onClick={() => openResult(s)}>
                <span className="ri-left">
                  <span className="ri-dot" style={{ background: SEV[sevKey(s.severity)].dot }} />
                  <span className="ri-text">
                    <span className="r-name">{s.disease || s.name}</span>
                    <span className="r-meta">{s.crop || "Leaf"} · {relTime(s.t)}</span>
                  </span>
                </span>
                <span className="r-conf">{s.confidence ?? s.conf ?? 0}%</span>
              </button>
            ))}
          </div>
          <div className="tip">
            <div className="t-label">Tip</div>
            <p>Shoot the underside of leaves for whitefly &amp; mite detection — that's where 80% of early infestations sit.</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Result({ data, onAgain }) {
  const disease = data.disease || "Unknown";
  const isHealthy = /healthy/i.test(disease);
  const isUnknown = /unknown/i.test(disease) || /unknown/i.test(data.crop || "");
  const conf = Math.max(0, Math.min(100, Math.round(Number(data.confidence) || 0)));

  let statusBg, StatusIcon;
  if (isHealthy) { statusBg = "#2FA84F"; StatusIcon = Check; }
  else if (isUnknown) { statusBg = "#7C9A84"; StatusIcon = Question; }
  else { statusBg = "linear-gradient(150deg,#EF3B57,#C42447)"; StatusIcon = SickLeaf; }

  const rxItems = RX.filter((it) => !isBlank(data[it.key]));

  return (
    <div className="result">
      <div className="verdict">
        <div className="status" style={{ background: statusBg }}>
          <StatusIcon width="27" height="27" stroke="#fff" />
        </div>
        <div>
          <div className="crop-label">{(data.crop && !isUnknown) ? data.crop : (isUnknown ? "Not identified" : "Plant")}</div>
          <div className="disease">{isHealthy ? "Looks healthy 🌿" : disease}</div>
        </div>
      </div>

      <div className="chips">
        {!isHealthy && !isUnknown && data.severity && (() => {
          const c = SEV[sevKey(data.severity)];
          return <span className="chip" style={{ background: c.bg, color: c.ink }}><span className="dot" />{data.severity} severity</span>;
        })()}
        {isHealthy && <span className="chip" style={{ background: "#E2F0E0", color: "#2F7C3E" }}><span className="dot" />No disease found</span>}
      </div>

      {!(isUnknown && conf === 0) && (
        <div className="conf">
          <div className="conf-top"><span>Confidence</span><b>{conf}%</b></div>
          <div className="bar"><span style={{ width: conf + "%" }} /></div>
        </div>
      )}

      {data.explanation && <div className="explain">{data.explanation}</div>}

      {rxItems.length > 0 && (
        <div>
          <div className="rx-title">Prescription</div>
          {rxItems.map(({ key, title, Icon, cls, warn }) => (
            <div className={"rx-item" + (warn ? " warn" : "")} key={key}>
              <div className={"ic " + cls}><Icon width="21" height="21" /></div>
              <div><h5>{title}</h5><p>{data[key]}</p></div>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-ghost" style={{ width: "100%", marginTop: 16 }} onClick={onAgain}>
        <Refresh width="18" height="18" /> Scan another leaf
      </button>
    </div>
  );
}