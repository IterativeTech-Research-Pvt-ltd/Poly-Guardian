import { Bug } from "./icons.jsx";

export default function TrapMonitor({ onGoto }) {
  return (
    <div className="card">
      <div className="phase2">
        <span className="badge">⚙️ PHASE 2 · TRAP-CAMERA KIT</span>
        <div className="ic">
          <Bug width="36" height="36" stroke="var(--green-d)" />
        </div>
        <h3>Trap Monitor arrives in Phase 2</h3>
        <p>
          Automated sticky-trap cameras will live-count whiteflies, thrips and aphids per
          polyhouse using an on-device YOLO model. This screen switches on once the
          trap-camera hardware kit is installed.
        </p>
        <div className="kit">
          <span>ESP32-S3 cam nodes</span>
          <span>Sticky-roll traps</span>
          <span>LoRaWAN IN865</span>
          <span>Edge YOLOv11-Nano</span>
        </div>
        <div style={{ marginTop: 26 }}>
          <button className="btn btn-primary" onClick={() => onGoto("leafscan")}>
            Use Leaf Scan instead
          </button>
        </div>
      </div>
    </div>
  );
}