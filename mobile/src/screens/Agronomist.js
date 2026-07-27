import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";
import { Hero, Card, SectionHead } from "../ui";
import { useLang } from "../LangContext";
import { askAgronomist } from "../api";
import { speechLang } from "../lang";
import { CONTEXT_VALUES } from "../i18n";

export default function Agronomist() {
  const { lang, t } = useLang();
  const langKey = lang || "hinglish";
  const [messages, setMessages] = useState([{ role: "bot", text: t("greeting") }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showSuggests, setShowSuggests] = useState(true);
  const historyRef = useRef([]);
  const scrollRef = useRef(null);

  // Keep the greeting in the chosen language until the chat actually starts.
  useEffect(() => {
    setMessages((m) => (m.length === 1 && m[0].role === "bot" ? [{ role: "bot", text: t("greeting") }] : m));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const scrollEnd = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);

  const send = async (raw) => {
    const text = (raw || "").trim();
    if (!text) return;
    setShowSuggests(false);
    setMessages((m) => [...m, { role: "user", text }]);
    const prior = historyRef.current.slice();
    historyRef.current.push({ role: "user", text });
    setInput("");
    setTyping(true);
    scrollEnd();
    try {
      const reply = await askAgronomist(text, prior, langKey);
      const safe = reply || "…";
      setMessages((m) => [...m, { role: "bot", text: safe }]);
      historyRef.current.push({ role: "model", text: safe });
    } catch (err) {
      setMessages((m) => [...m, { role: "bot", text: "⚠️ " + err.message }]);
    } finally {
      setTyping(false);
      scrollEnd();
    }
  };

  const speak = (text) => {
    try { Speech.stop(); Speech.speak(text, { language: speechLang(langKey) }); } catch { /* ignore */ }
  };

  const suggests = [t("suggest_1"), t("suggest_2"), t("suggest_3")];
  const ctxLabels = ["ctx_polyhouse", "ctx_temp", "ctx_vpd", "ctx_toppest", "ctx_lastspray"];
  const ctxValues = CONTEXT_VALUES[langKey] || CONTEXT_VALUES.hinglish;
  const context = ctxLabels.map((k, i) => [t(k), ctxValues[i]]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 16 }} onContentSizeChange={scrollEnd} keyboardShouldPersistTaps="handled">
        <Hero eyebrow={t("agro_eyebrow")} title={t("agro_title")} subtitle={t("agro_subtitle")} />

        <Card>
          {messages.map((m, i) => (
            <View key={i} style={[s.msg, m.role === "user" ? s.msgUser : s.msgBot]}>
              {m.role === "bot" && <View style={s.av}><Ionicons name="leaf" size={15} color="#fff" /></View>}
              <View style={[s.bubble, m.role === "user" ? s.bubbleUser : s.bubbleBot]}>
                <Text style={[s.bubbleText, m.role === "user" && { color: "#fff" }]}>{m.text}</Text>
                {m.role === "bot" && (
                  <Pressable onPress={() => speak(m.text)} hitSlop={10} style={s.speak}>
                    <Ionicons name="volume-medium-outline" size={15} color={theme.greenD} />
                    <Text style={s.speakText}>{t("hear")}</Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))}
          {typing && (
            <View style={[s.msg, s.msgBot]}>
              <View style={s.av}><Ionicons name="leaf" size={15} color="#fff" /></View>
              <View style={[s.bubble, s.bubbleBot]}><Text style={s.bubbleText}>…</Text></View>
            </View>
          )}

          {showSuggests && (
            <View style={{ gap: 9, marginTop: 12 }}>
              {suggests.map((q, i) => (
                <Pressable key={i} onPress={() => send(q.replace(/^[^A-Za-zऀ-ॿ]+/, "").trim())} style={({ pressed }) => [s.suggest, pressed && { backgroundColor: theme.greenWash }]}>
                  <Text style={s.suggestText}>{q}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </Card>

        <Card>
          <SectionHead title={t("live_context")} />
          <View style={{ marginTop: 6 }}>
            {context.map(([k, v], i) => (
              <View key={i} style={s.ctxRow}>
                <Text style={s.ctxK}>{k}</Text>
                <Text style={s.ctxV}>{v}</Text>
              </View>
            ))}
          </View>
          <View style={s.voiceNote}>
            <Text style={s.voiceLabel}>{t("voice_label")}</Text>
            <Text style={s.voiceText}>{t("voice_text")}</Text>
          </View>
        </Card>
      </ScrollView>

      <View style={s.composer}>
        <TextInput
          style={s.input}
          placeholder={t("composer_placeholder")}
          placeholderTextColor={theme.mut2}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
        />
        <Pressable onPress={() => send(input)} style={s.send}>
          <Ionicons name="send" size={19} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  msg: { flexDirection: "row", gap: 9, marginBottom: 12, maxWidth: "92%" },
  msgBot: { alignSelf: "flex-start" },
  msgUser: { alignSelf: "flex-end", flexDirection: "row-reverse" },
  av: { width: 32, height: 32, borderRadius: 10, backgroundColor: theme.greenD, alignItems: "center", justifyContent: "center" },
  bubble: { paddingVertical: 11, paddingHorizontal: 14, borderRadius: 15, flexShrink: 1 },
  bubbleBot: { backgroundColor: theme.greenWash, borderBottomLeftRadius: 5 },
  bubbleUser: { backgroundColor: theme.green, borderBottomRightRadius: 5 },
  bubbleText: { fontSize: 14.5, color: theme.inkSoft, lineHeight: 21 },
  speak: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8, alignSelf: "flex-start" },
  speakText: { fontSize: 12, fontWeight: "700", color: theme.greenD },
  suggest: { borderWidth: 1, borderColor: theme.line, borderRadius: 13, paddingVertical: 12, paddingHorizontal: 14 },
  suggestText: { fontSize: 14, color: theme.inkSoft },
  ctxRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderTopWidth: 1, borderTopColor: theme.line },
  ctxK: { fontSize: 14, fontWeight: "700", color: theme.ink, flexShrink: 1 },
  ctxV: { fontSize: 13, color: theme.mut, fontWeight: "600", flexShrink: 1, textAlign: "right", marginLeft: 10 },
  voiceNote: { marginTop: 16, backgroundColor: theme.greenD, borderRadius: 14, padding: 14 },
  voiceLabel: { fontSize: 11, fontWeight: "800", letterSpacing: 0.5, color: "rgba(255,255,255,0.8)" },
  voiceText: { fontSize: 14, color: "#fff", marginTop: 5, lineHeight: 20 },
  composer: { flexDirection: "row", gap: 10, padding: 12, backgroundColor: theme.card, borderTopWidth: 1, borderTopColor: theme.line },
  input: { flex: 1, borderWidth: 1, borderColor: theme.line, borderRadius: 13, paddingVertical: 12, paddingHorizontal: 15, fontSize: 14.5, color: theme.ink, backgroundColor: "#fff" },
  send: { width: 48, height: 48, borderRadius: 13, backgroundColor: theme.greenD, alignItems: "center", justifyContent: "center" },
});