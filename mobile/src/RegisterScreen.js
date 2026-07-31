import { useState } from "react";
import { Modal, View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "./theme";
import { useLang } from "./LangContext";
import { registerFarmer } from "./farmer";

export default function RegisterScreen({ visible, onDone }) {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    if (!name.trim()) { setErr(t("reg_name_required")); return; }
    setBusy(true); setErr("");
    try {
      const f = await registerFarmer({ name: name.trim(), village: village.trim(), phone: phone.trim() });
      onDone(f);
    } catch (e) {
      setErr(e.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={s.overlay}>
        <View style={s.modal}>
          <View style={s.logo}><Ionicons name="person-outline" size={24} color="#fff" /></View>
          <Text style={s.title}>{t("reg_title")}</Text>
          <Text style={s.sub}>{t("reg_sub")}</Text>
          <TextInput style={s.input} placeholder={t("reg_name")} placeholderTextColor={theme.mut2} value={name} onChangeText={setName} />
          <TextInput style={s.input} placeholder={t("reg_village")} placeholderTextColor={theme.mut2} value={village} onChangeText={setVillage} />
          <TextInput style={s.input} placeholder={t("reg_phone")} placeholderTextColor={theme.mut2} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          {err ? <Text style={s.err}>{err}</Text> : null}
          <Pressable style={[s.btn, busy && { opacity: 0.7 }]} onPress={submit} disabled={busy}>
            {busy ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>{t("reg_button")}</Text>}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(16,40,25,0.55)", alignItems: "center", justifyContent: "center", padding: 22 },
  modal: { backgroundColor: theme.card, borderRadius: 24, padding: 26, width: "100%", maxWidth: 400 },
  logo: { width: 52, height: 52, borderRadius: 15, backgroundColor: theme.green, alignItems: "center", justifyContent: "center", marginBottom: 14, alignSelf: "center" },
  title: { fontSize: 21, fontWeight: "800", color: theme.ink, letterSpacing: -0.4, textAlign: "center" },
  sub: { fontSize: 13.5, color: theme.mut, marginTop: 4, marginBottom: 18, textAlign: "center" },
  input: { borderWidth: 1, borderColor: theme.line, borderRadius: 13, paddingVertical: 13, paddingHorizontal: 15, fontSize: 15, color: theme.ink, backgroundColor: "#fff", marginBottom: 11 },
  err: { color: theme.red, fontSize: 13, fontWeight: "600", marginBottom: 8 },
  btn: { backgroundColor: theme.green, borderRadius: 13, paddingVertical: 15, alignItems: "center", marginTop: 4 },
  btnText: { color: "#fff", fontSize: 15.5, fontWeight: "700" },
});