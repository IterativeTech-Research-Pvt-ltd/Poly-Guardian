import { useState } from "react";
import { ScrollView, View, Text, Image, Pressable, ActivityIndicator, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { theme, sevColors } from "../theme";
import { Card, Hero, Btn, Chip, Bar } from "../ui";
import { useLang } from "../LangContext";
import { sevKey } from "../util";
import { localizeTerm, sevLabel } from "../i18n";
import { detectPest } from "../api";

const DENS_PCT = { high: 100, medium: 66, low: 33, none: 8 };
const DENS_COLORS = {
  high: ["#F5883A", "#EF4E5A"],
  medium: ["#F5C542", "#F0A93A"],
  low: ["#6DBE45", "#4CAF50"],
  none: ["#6DBE45", "#4CAF50"],
};

export default function TrapMonitor() {
  const { lang, t } = useLang();
  const [view, setView] = useState("upload");
  const [imageUri, setImageUri] = useState(null);
  const [result, setResult] = useState(null);

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) { Alert.alert(t("camera_needed"), t("camera_needed_msg")); return; }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!res.canceled) { setImageUri(res.assets[0].uri); setView("upload"); }
  };
  const choosePhoto = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, mediaTypes: ["images"] });
    if (!res.canceled) { setImageUri(res.assets[0].uri); setView("upload"); }
  };
  const reset = () => { setImageUri(null); setResult(null); setView("upload"); };

  const scan = async () => {
    if (!imageUri) return;
    setView("loading");
    try {
      const data = await detectPest(imageUri, lang);
      setResult(data);
      setView("result");
    } catch (err) {
      Alert.alert(t("couldnt_diagnose"), err.message);
      setView("upload");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16 }}>
      <Hero eyebrow={t("pest_eyebrow")} title={t("pest_title")} subtitle={t("pest_subtitle")} />

      <Card>
        {view === "upload" && (
          imageUri ? (
            <View>
              <Image source={{ uri: imageUri }} style={s.preview} />
              <Btn title={t("pest_drop_title")} icon="scan-outline" onPress={scan} style={{ marginTop: 14 }} />
              <Pressable onPress={reset} style={s.retake}>
                <Ionicons name="refresh" size={15} color={theme.mut} />
                <Text style={s.retakeText}>{t("retake")}</Text>
              </Pressable>
            </View>
          ) : (
            <View style={s.drop}>
              <View style={s.cam}><Ionicons name="bug" size={30} color="#fff" /></View>
              <Text style={s.dropTitle}>{t("pest_drop_title")}</Text>
              <Text style={s.dropSub}>{t("pest_drop_sub")}</Text>
              <View style={s.dropBtns}>
                <Btn title={t("take_photo")} icon="camera-outline" onPress={takePhoto} style={{ flex: 1 }} />
                <Btn title={t("gallery")} icon="image-outline" variant="ghost" onPress={choosePhoto} style={{ flex: 1 }} />
              </View>
            </View>
          )
        )}

        {view === "loading" && (
          <View style={s.loading}>
            <ActivityIndicator size="large" color={theme.green} />
            <Text style={s.loadingTitle}>{t("pest_scanning")}</Text>
            <Text style={s.loadingSub}>{t("pest_scanning_sub")}</Text>
          </View>
        )}

        {view === "result" && result && <PestResult data={result} onAgain={reset} t={t} lang={lang} />}
      </Card>

      <View style={s.note}>
        <Ionicons name="hardware-chip-outline" size={16} color={theme.amberInk} />
        <Text style={s.noteText}>{t("pest_phase2_note")}</Text>
      </View>
    </ScrollView>
  );
}

function PestResult({ data, onAgain, t, lang }) {
  const dkey = sevKey(data.density);
  const isNone = dkey === "none" || /none/i.test(data.density || "") || /none/i.test(data.pest || "");
  const c = sevColors[dkey];
  const pctRaw = Number(data.density_percent);
  const pct = Number.isFinite(pctRaw) ? Math.max(0, Math.min(100, Math.round(pctRaw))) : DENS_PCT[dkey];

  return (
    <View>
      <View style={s.verdict}>
        <View style={[s.status, { backgroundColor: isNone ? "#7C9A84" : c.dot }]}>
          <Ionicons name="bug" size={26} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.pestLabel}>{t("pest_density_label").toUpperCase()}</Text>
          <Text style={s.pestName}>{isNone ? t("pest_none_title") : localizeTerm(data.pest, lang)}</Text>
        </View>
      </View>

      {!isNone && (
        <View style={{ marginTop: 14 }}>
          <View style={s.densTop}>
            <Chip label={sevLabel(dkey, lang, data.density)} bg={c.bg} color={c.ink} />
            <Text style={[s.densPct, { color: c.ink }]}>{pct}%</Text>
          </View>
          <Bar pct={pct} colors={DENS_COLORS[dkey]} />
          <Text style={[s.count, { marginTop: 10 }]}>{t("pest_count_label")}: <Text style={{ fontWeight: "800", color: theme.ink }}>{String(data.count)}</Text></Text>

          {data.crop_risk ? (
            <View style={s.infoRow}>
              <Text style={s.infoLabel}>{t("pest_risk_label")}</Text>
              <Text style={s.infoVal}>{data.crop_risk}</Text>
            </View>
          ) : null}
        </View>
      )}

      {data.explanation ? (
        <View style={s.explain}><Text style={s.explainText}>{data.explanation}</Text></View>
      ) : null}

      {data.action && !isNone ? (
        <View style={s.actionCard}>
          <View style={s.actionIc}><Ionicons name="medkit-outline" size={20} color={theme.greenD} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.actionHead}>{t("pest_action_label")}</Text>
            <Text style={s.actionBody}>{data.action}</Text>
          </View>
        </View>
      ) : null}

      <Btn title={t("pest_scan_another")} icon="refresh" variant="ghost" onPress={onAgain} style={{ marginTop: 16 }} />
    </View>
  );
}

const s = StyleSheet.create({
  preview: { width: "100%", height: 240, borderRadius: 14, backgroundColor: "#000" },
  retake: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12, paddingVertical: 8 },
  retakeText: { color: theme.mut, fontSize: 13.5, fontWeight: "600" },
  drop: { borderWidth: 2, borderColor: "#B9D6BD", borderStyle: "dashed", borderRadius: 18, backgroundColor: theme.greenWash, padding: 26, alignItems: "center" },
  cam: { width: 60, height: 60, borderRadius: 30, backgroundColor: theme.green, alignItems: "center", justifyContent: "center", marginBottom: 14 },
  dropTitle: { fontSize: 18, fontWeight: "800", color: theme.ink },
  dropSub: { fontSize: 13, color: theme.mut, textAlign: "center", marginTop: 5 },
  dropBtns: { flexDirection: "row", gap: 10, marginTop: 18, alignSelf: "stretch" },
  loading: { alignItems: "center", paddingVertical: 30 },
  loadingTitle: { fontSize: 16, fontWeight: "800", color: theme.ink, marginTop: 16, textAlign: "center" },
  loadingSub: { fontSize: 13, color: theme.mut, marginTop: 4, textAlign: "center" },
  verdict: { flexDirection: "row", alignItems: "flex-start", gap: 14 },
  status: { width: 50, height: 50, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  pestLabel: { fontSize: 12, fontWeight: "700", letterSpacing: 0.4, color: theme.mut2 },
  pestName: { fontSize: 21, fontWeight: "800", color: theme.ink, letterSpacing: -0.4, marginTop: 2 },
  densTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  densPct: { fontSize: 24, fontWeight: "800", fontVariant: ["tabular-nums"], letterSpacing: -0.5 },
  count: { fontSize: 13, color: theme.mut, fontWeight: "600" },
  infoRow: { marginTop: 14, borderTopWidth: 1, borderTopColor: theme.line, paddingTop: 12 },
  infoLabel: { fontSize: 12, fontWeight: "700", letterSpacing: 0.3, color: theme.mut2, textTransform: "uppercase" },
  infoVal: { fontSize: 14, color: theme.inkSoft, marginTop: 3, lineHeight: 20 },
  explain: { marginTop: 16, backgroundColor: theme.greenWash, borderRadius: 13, padding: 13 },
  explainText: { fontSize: 14, color: theme.inkSoft, lineHeight: 20 },
  actionCard: { flexDirection: "row", gap: 12, padding: 13, borderWidth: 1, borderColor: theme.line, borderRadius: 14, marginTop: 12 },
  actionIc: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: theme.greenChip },
  actionHead: { fontSize: 13.5, fontWeight: "800", color: theme.ink },
  actionBody: { fontSize: 13.5, color: theme.inkSoft, marginTop: 2, lineHeight: 19 },
  note: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: theme.amberWash, borderRadius: 12, padding: 12, marginTop: 2 },
  noteText: { flex: 1, fontSize: 12.5, color: theme.amberInk, fontWeight: "600", lineHeight: 17 },
});