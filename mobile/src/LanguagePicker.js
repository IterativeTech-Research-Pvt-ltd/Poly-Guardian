import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "./theme";
import { LANGS } from "./lang";
import { useLang } from "./LangContext";

export default function LanguagePicker({ visible, current, onPick, onClose }) {
  const { t } = useLang();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose || (() => {})}>
      <Pressable style={s.overlay} onPress={onClose || undefined}>
        <Pressable style={s.modal} onPress={() => {}}>
          <View style={s.logo}><Ionicons name="leaf" size={26} color="#fff" /></View>
          <Text style={s.title}>{t("choose_language")}</Text>
          <Text style={s.sub}>{t("choose_language_sub")}</Text>
          <View style={{ gap: 10, marginTop: 20, alignSelf: "stretch" }}>
            {LANGS.map((l) => (
              <Pressable
                key={l.id}
                onPress={() => onPick(l.id)}
                style={({ pressed }) => [s.opt, (current === l.id || pressed) && s.optActive]}
              >
                <Text style={s.optLabel}>{l.label}</Text>
                <Text style={s.optSub}>{t(`lang_sub_${l.id}`)}</Text>
              </Pressable>
            ))}
          </View>
          {onClose ? (
            <Pressable onPress={onClose} style={s.cancel}><Text style={s.cancelText}>{t("cancel")}</Text></Pressable>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(16,40,25,0.55)", alignItems: "center", justifyContent: "center", padding: 22 },
  modal: { backgroundColor: theme.card, borderRadius: 24, padding: 26, width: "100%", maxWidth: 400, alignItems: "center" },
  logo: { width: 56, height: 56, borderRadius: 16, backgroundColor: theme.green, alignItems: "center", justifyContent: "center", marginBottom: 14 },
  title: { fontSize: 21, fontWeight: "800", color: theme.ink, letterSpacing: -0.4, textAlign: "center" },
  sub: { fontSize: 13.5, color: theme.mut, marginTop: 4, textAlign: "center" },
  opt: { borderWidth: 1.5, borderColor: theme.line, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16 },
  optActive: { borderColor: theme.green, backgroundColor: theme.greenWash },
  optLabel: { fontSize: 16, fontWeight: "800", color: theme.ink },
  optSub: { fontSize: 12.5, color: theme.mut, marginTop: 2 },
  cancel: { marginTop: 14, paddingVertical: 8, paddingHorizontal: 16 },
  cancelText: { fontSize: 13.5, fontWeight: "600", color: theme.mut },
});