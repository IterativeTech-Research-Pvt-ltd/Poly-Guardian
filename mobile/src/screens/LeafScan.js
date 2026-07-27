import { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, Image, Pressable, ActivityIndicator, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { theme, sevColors } from "../theme";
import { Card, Hero, Btn, SectionHead, Chip, Bar } from "../ui";
import { useLang } from "../LangContext";
import { useScans, addScan } from "../scanStore";
import { relTime, sevKey } from "../util";
import { localizeTerm, sevLabel } from "../i18n";
import { detectLeaf } from "../api";

const RX = [
  { key: "organic", titleKey: "rx_organic", icon: "leaf-outline", bg: theme.greenChip, color: theme.greenD },
  { key: "chemical", titleKey: "rx_chemical", icon: "flask-outline", bg: theme.blueWash, color: theme.blue },
  { key: "prevention", titleKey: "rx_prevention", icon: "shield-checkmark-outline", bg: theme.amberWash, color: theme.amberInk },
  { key: "warning", titleKey: "rx_warning", icon: "warning-outline", bg: theme.redWash, color: theme.red, warn: true },
];
const isBlank = (v) => !v || v === "-" || v === "N/A" || /^\s*$/.test(v);

export default function LeafScan({ navigation, route }) {
  const { lang, t } = useLang();
  const scans = useScans();
  const [view, setView] = useState("upload");
  const [imageUri, setImageUri] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const os = route.params?.openScan;
    if (os) {
      setResult(os);
      setImageUri(null);
      setView("result");
      navigation.setParams({ openScan: undefined });
    }
  }, [route.params?.openScan]);

  const openPicker = (useCamera) => {
    if (useCamera) fileInputCamera();
    else fileInputGallery();
  };

  const fileInputCamera = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) { Alert.alert(t("camera_needed"), t("camera_needed_msg")); return; }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!res.canceled) { setImageUri(res.assets[0].uri); setView("upload"); }
  };
  const fileInputGallery = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, mediaTypes: ["images"] });
    if (!res.canceled) { setImageUri(res.assets[0].uri); setView("upload"); }
  };

  const reset = () => { setImageUri(null); setResult(null); setView("upload"); };
  const openResult = (scan) => { setResult(scan); setImageUri(null); setView("result"); };

  const diagnose = async () => {
    if (!imageUri) return;
    setView("loading");
    try {
      const data = await detectLeaf(imageUri, lang);
      setResult(data);
      const isUnknown = /unknown/i.test(data.disease || "") || /unknown/i.test(data.crop || "");
      if (!isUnknown) addScan(data);
      setView("result");
    } catch (err) {
      Alert.alert(t("couldnt_diagnose"), err.message);
      setView("upload");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16 }}>
      <Hero eyebrow={t("scan_eyebrow")} title={t("scan_title")} subtitle={t("scan_subtitle")} />

      <Card>
        {view === "upload" && (
          <View>
            {imageUri ? (
              <View>
                <Image source={{ uri: imageUri }} style={s.preview} />
                <Btn title={t("diagnose_leaf")} icon="scan-outline" onPress={diagnose} style={{ marginTop: 14 }} />
                <Pressable onPress={reset} style={s.retake}>
                  <Ionicons name="refresh" size={15} color={theme.mut} />
                  <Text style={s.retakeText}>{t("retake")}</Text>
                </Pressable>
              </View>
            ) : (
              <View style={s.drop}>
                <View style={s.cam}><Ionicons name="camera" size={30} color="#fff" /></View>
                <Text style={s.dropTitle}>{t("drop_title")}</Text>
                <Text style={s.dropSub}>{t("drop_sub")}</Text>
                <View style={s.dropBtns}>
                  <Btn title={t("take_photo")} icon="camera-outline" onPress={() => openPicker(true)} style={{ flex: 1 }} />
                  <Btn title={t("gallery")} icon="image-outline" variant="ghost" onPress={() => openPicker(false)} style={{ flex: 1 }} />
                </View>
              </View>
            )}
          </View>
        )}

        {view === "loading" && (
          <View style={s.loading}>
            <ActivityIndicator size="large" color={theme.green} />
            <Text style={s.loadingTitle}>{t("diagnosing")}</Text>
            <Text style={s.loadingSub}>{t("diagnosing_sub")}</Text>
          </View>
        )}

        {view === "result" && result && <Result data={result} onAgain={reset} t={t} lang={lang} />}
      </Card>

      <Card>
        <SectionHead title={t("recent_scans")} sub={t("tap_reopen")} />
        {scans.slice(0, 8).map((x) => (
          <Pressable key={x.id || x.t} onPress={() => openResult(x)} style={({ pressed }) => [s.row, pressed && s.rowPressed]}>
            <View style={[s.dot, { backgroundColor: sevColors[sevKey(x.severity)].dot }]} />
            <View style={{ flex: 1 }}>
              <Text style={s.rowName}>{localizeTerm(x.disease, lang)}</Text>
              <Text style={s.rowMeta}>{localizeTerm(x.crop, lang) || "Leaf"} · {relTime(x.t, t)}</Text>
            </View>
            <View style={s.confPill}><Text style={s.confText}>{x.confidence || 0}%</Text></View>
          </Pressable>
        ))}
      </Card>
    </ScrollView>
  );
}

function Result({ data, onAgain, t, lang }) {
  const disease = data.disease || "Unknown";
  const isHealthy = /healthy/i.test(disease);
  const isUnknown = /unknown/i.test(disease) || /unknown/i.test(data.crop || "");
  const conf = Math.max(0, Math.min(100, Math.round(Number(data.confidence) || 0)));

  const status = isHealthy
    ? { bg: "#2FA84F", icon: "checkmark" }
    : isUnknown
    ? { bg: "#7C9A84", icon: "help" }
    : { bg: "#EF3B57", icon: "warning" };

  const sev = sevColors[sevKey(data.severity)];
  const rxItems = RX.filter((it) => !isBlank(data[it.key]));

  return (
    <View>
      <View style={s.verdict}>
        <View style={[s.status, { backgroundColor: status.bg }]}>
          <Ionicons name={status.icon} size={26} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.cropLabel}>{(data.crop && !isUnknown) ? String(localizeTerm(data.crop, lang)).toUpperCase() : (isUnknown ? t("not_identified") : t("plant"))}</Text>
          <Text style={s.disease}>{isHealthy ? t("looks_healthy") : localizeTerm(disease, lang)}</Text>
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        {!isHealthy && !isUnknown && data.severity ? (
          <Chip label={`${sevLabel(sevKey(data.severity), lang, data.severity)} ${t("severity_suffix")}`} bg={sev.bg} color={sev.ink} />
        ) : isHealthy ? (
          <Chip label={t("no_disease")} bg={theme.greenChip} color={theme.greenD} />
        ) : null}
      </View>

      {!(isUnknown && conf === 0) && (
        <View style={{ marginTop: 16 }}>
          <View style={s.confTop}>
            <Text style={s.confLabel}>{t("confidence")}</Text>
            <Text style={s.confVal}>{conf}%</Text>
          </View>
          <Bar pct={conf} />
        </View>
      )}

      {data.explanation ? (
        <View style={s.explain}><Text style={s.explainText}>{data.explanation}</Text></View>
      ) : null}

      {rxItems.length > 0 && (
        <View style={{ marginTop: 18 }}>
          <Text style={s.rxTitle}>{t("prescription")}</Text>
          {rxItems.map((it) => (
            <View key={it.key} style={[s.rxItem, it.warn && { backgroundColor: theme.redWash, borderColor: "#F8D2DB" }]}>
              <View style={[s.rxIc, { backgroundColor: it.bg }]}>
                <Ionicons name={it.icon} size={20} color={it.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.rxHead}>{t(it.titleKey)}</Text>
                <Text style={s.rxBody}>{data[it.key]}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <Btn title={t("scan_another")} icon="refresh" variant="ghost" onPress={onAgain} style={{ marginTop: 16 }} />
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
  cropLabel: { fontSize: 12, fontWeight: "700", letterSpacing: 0.4, color: theme.mut2 },
  disease: { fontSize: 21, fontWeight: "800", color: theme.ink, letterSpacing: -0.4, marginTop: 2 },
  confTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  confLabel: { fontSize: 12.5, fontWeight: "600", color: theme.mut },
  confVal: { fontSize: 12.5, fontWeight: "800", color: theme.ink },
  explain: { marginTop: 16, backgroundColor: theme.greenWash, borderRadius: 13, padding: 13 },
  explainText: { fontSize: 14, color: theme.inkSoft, lineHeight: 20 },
  rxTitle: { fontSize: 12, fontWeight: "800", letterSpacing: 0.5, color: theme.mut2, marginBottom: 10 },
  rxItem: { flexDirection: "row", gap: 12, padding: 13, borderWidth: 1, borderColor: theme.line, borderRadius: 14, marginBottom: 10 },
  rxIc: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  rxHead: { fontSize: 13.5, fontWeight: "800", color: theme.ink },
  rxBody: { fontSize: 13.5, color: theme.inkSoft, marginTop: 2, lineHeight: 19 },
  row: { flexDirection: "row", alignItems: "center", gap: 11, borderWidth: 1, borderColor: theme.line, borderRadius: 13, padding: 13, marginTop: 10 },
  rowPressed: { backgroundColor: theme.greenWash, borderColor: "#BFD8C2" },
  dot: { width: 9, height: 9, borderRadius: 5 },
  rowName: { fontSize: 15, fontWeight: "800", color: theme.ink },
  rowMeta: { fontSize: 12.5, color: theme.mut, marginTop: 1 },
  confPill: { backgroundColor: theme.greenChip, borderRadius: 999, paddingVertical: 5, paddingHorizontal: 11 },
  confText: { fontSize: 13, fontWeight: "800", color: theme.greenD },
});