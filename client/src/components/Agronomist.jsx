import { useEffect, useRef, useState } from "react";
import { askAgronomist } from "../api.js";
import { toast } from "../toast.js";
import { speechLang } from "../lang.js";
import { Leaf, User, Mic, Send } from "./icons.jsx";

const GREETINGS = {
  en: "Namaste 🙏 I'm Poly-Guardian's Digital Agronomist. Ask me anything about your polyhouse — pests, diseases, spraying or climate. Today Polyhouse 2 has a mite risk of 78/100 — want me to explain?",
  hinglish: "Namaste 🙏 Main hoon Poly-Guardian ka Digital Agronomist. Aap apne polyhouse ke baare me kuch bhi pooch sakte hain. Aaj Polyhouse 2 me mite risk 78/100 hai — chahein to iske baare me batau?",
  hi: "नमस्ते 🙏 मैं हूँ पॉली-गार्डियन का डिजिटल एग्रोनॉमिस्ट। आप अपने पॉलीहाउस के बारे में कुछ भी पूछ सकते हैं। आज पॉलीहाउस 2 में माइट रिस्क 78/100 है — चाहें तो इसके बारे में बताऊँ?",
};

const SUGGESTS = {
  en: [
    "🐛 Lots of whitefly on my capsicum — what should I do?",
    "💧 VPD is 1.9 kPa — should I mist now?",
    "🌹 Why are there black spots on my rose leaves?",
  ],
  hinglish: [
    "🐛 Whitefly bahut lag rahi hai capsicum me, kya karu?",
    "💧 VPD is 1.9 kPa — should I mist now?",
    "🌹 Rose ke patton par kaale dhabbe kyu ho rahe hain?",
  ],
  hi: [
    "🐛 मेरी शिमला मिर्च पर बहुत सफेद मक्खी है — क्या करूँ?",
    "💧 VPD 1.9 kPa है — क्या अभी मिस्टिंग करूँ?",
    "🌹 मेरे गुलाब के पत्तों पर काले धब्बे क्यों हैं?",
  ],
};

const CONTEXT = [
  ["Polyhouse", "3 zones · Capsicum, Cucumber, Rose"],
  ["Temp / Hum", "34.2°C · 68% RH"],
  ["VPD", "1.9 kPa (mite risk)"],
  ["Top pest", "Whitefly · +18% in 24h"],
  ["Last spray", "Spinosad · 4 days ago"],
];

function speak(text, lang) {
  if (!("speechSynthesis" in window)) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = speechLang(lang);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch { /* ignore */ }
}

export default function Agronomist({ lang }) {
  const langKey = lang || "hinglish";
  const [messages, setMessages] = useState([{ role: "bot", text: GREETINGS[langKey] }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showSuggests, setShowSuggests] = useState(true);
  const [recording, setRecording] = useState(false);

  const logRef = useRef(null);
  const historyRef = useRef([]);
  const recognitionRef = useRef(null);
  const lastVoiceRef = useRef(false);
  const langRef = useRef(langKey);

  useEffect(() => { langRef.current = langKey; }, [langKey]);

  // Keep the greeting in sync with the language until the chat actually starts.
  useEffect(() => {
    setMessages((m) => (m.length === 1 && m[0].role === "bot" ? [{ role: "bot", text: GREETINGS[langKey] }] : m));
  }, [langKey]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, typing]);

  // Set up voice recognition once.
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.interimResults = false;
    rec.onstart = () => setRecording(true);
    rec.onend = () => setRecording(false);
    rec.onerror = () => { setRecording(false); toast("Voice input didn't work — type instead."); };
    rec.onresult = (e) => {
      lastVoiceRef.current = true;
      send(e.results[0][0].transcript);
    };
    recognitionRef.current = rec;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = async (raw) => {
    const text = (raw || "").trim();
    if (!text) return;
    setShowSuggests(false);
    setMessages((m) => [...m, { role: "user", text }]);
    const priorHistory = historyRef.current.slice();
    historyRef.current.push({ role: "user", text });
    setInput("");
    setTyping(true);
    try {
      const reply = await askAgronomist(text, priorHistory, langRef.current);
      const safe = reply || "…";
      setMessages((m) => [...m, { role: "bot", text: safe }]);
      historyRef.current.push({ role: "model", text: safe });
      if (lastVoiceRef.current) speak(safe, langRef.current);
    } catch (err) {
      toast(err.message);
    } finally {
      setTyping(false);
      lastVoiceRef.current = false;
    }
  };

  const micClick = () => {
    const rec = recognitionRef.current;
    if (!rec) { toast("Voice input isn't supported in this browser — please type."); return; }
    if (recording) { rec.stop(); return; }
    rec.lang = speechLang(langRef.current);
    try { rec.start(); } catch { /* already started */ }
  };

  const sendSuggest = (s) => send(s.replace(/^[^A-Za-zऀ-ॿ]+/, "").trim());

  return (
    <>
      <div className="hero">
        <span className="hero-eyebrow">🤖 Digital Agronomist · Marwari · Hindi · English</span>
        <h2>Ask anything about your polyhouse.</h2>
        <p className="sub">
          Gen-AI advisor for Rajasthan crops. It knows your live context, trap counts and
          past prescriptions.
        </p>
      </div>

      <div className="agro-grid">
        <div className="card chat">
          <div className="chat-log" ref={logRef}>
            {messages.map((m, i) => (
              <div className={"msg " + (m.role === "user" ? "user" : "bot")} key={i}>
                <div className="av">
                  {m.role === "user" ? <User width="18" height="18" stroke="#2F7C3E" /> : <Leaf width="18" height="18" stroke="#fff" />}
                </div>
                <div className="bubble">{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="msg bot typing">
                <div className="av"><Leaf width="18" height="18" stroke="#fff" /></div>
                <div className="bubble"><i /><i /><i /></div>
              </div>
            )}
          </div>

          {showSuggests && (
            <div className="suggests">
              {SUGGESTS[langKey].map((s, i) => (
                <button className="suggest" key={i} onClick={() => sendSuggest(s)}>{s}</button>
              ))}
            </div>
          )}

          <div className="composer">
            <input
              type="text"
              placeholder="Type or tap the mic to ask…"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
            />
            <button className={"mic" + (recording ? " rec" : "")} onClick={micClick} title="Voice input">
              <Mic width="20" height="20" />
            </button>
            <button className="send" onClick={() => send(input)} title="Send">
              <Send width="20" height="20" />
            </button>
          </div>
        </div>

        <div className="card">
          <div className="sec-head"><div><h3>Live context the AI sees</h3></div></div>
          <div style={{ marginTop: 8 }}>
            {CONTEXT.map(([k, v]) => (
              <div className="ctx-row" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
            ))}
          </div>
          <div className="voice-note">
            <div className="t-label">Voice-first</div>
            <p>Tap the mic — speak in Hindi, Marwari or English.</p>
          </div>
        </div>
      </div>
    </>
  );
}