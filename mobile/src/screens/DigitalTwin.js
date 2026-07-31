import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme, sevColors } from "../theme";
import { Card, Hero, Bar } from "../ui";
import { useLang } from "../LangContext";
import { localizeTerm } from "../i18n";
import { useTwin } from "../twin";

const rk = (v) => (v >= 67 ? "high" : v >= 34 ? "medium" : "low");
const BARC = { high: ["#F5883A", "#EF4E5A"], medium: ["#F5C542", "#F0A93A"], low: ["#6DBE45", "#4CAF50"] };

function Metric({ label, value, unit }) {
  return (
    <View style={s.metric}>
      <Text style={s.mVal}>{value}<Text style={s.mUnit}>{unit}</Text></Text>
      <Text style={s.mLbl}>{label}</Text>
    </View>
  );
}

function RiskBar({ label, val }) {
  const k = rk(val);
  return (
    <View style={{ marginTop: 11 }}>
      <View style={s.riskTop}>
        <Text style={s.riskLbl}>{label}</Text>
        <Text style={[s.riskVal, { color: sevColors[k].ink }]}>{val}%</Text>
      </View>
      <Bar pct={val} colors={BARC[k]} />
    </View>
  );
}

function ZoneCard({ z, t, lang }) {
  const worst = Math.max(z.mite, z.fungal, z.thrips);
  const wc = sevColors[rk(worst)];
  return (
    <Card>
      <View style={s.zHead}>
        <View style={[s.zDot, { backgroundColor: wc.dot }]} />
        <View style={{ flex: 1 }}>
          <Text style={s.zName}>{z.name}</Text>
          <Text style={s.zCrop}>{localizeTerm(z.crop, lang)}</Text>
        </View>
        <View style={s.online}>
          <View style={s.onlineDot} /><Text style={s.onlineText}>Live</Text>
        </View>
      </View>

      <View style={s.metrics}>
        <Metric label={t("twin_temp")} value={z.temp.toFixed(1)} unit="°C" />
        <Metric label={t("twin_humidity")} value={Math.round(z.hum)} unit="%" />
        <Metric label="VPD" value={z.vpd.toFixed(2)} unit=" kPa" />
      </View>

      <RiskBar label={t("twin_mite")} val={z.mite} />
      <RiskBar label={t("twin_fungal")} val={z.fungal} />
      <RiskBar label={t("twin_thrips")} val={z.thrips} />

      <View style={s.node}>
        <Ionicons name="hardware-chip-outline" size={14} color={theme.mut} />
        <Text style={s.nodeText}>{z.node} · {Math.round(z.battery)}% · {z.signal} dBm · {z.pest} pests</Text>
      </View>
    </Card>
  );
}

export default function DigitalTwin() {
  const { t, lang } = useLang();
  const zones = useTwin();

  const alerts = [];
  zones.forEach((z) => {
    if (z.mite >= 70) alerts.push({ zone: z.name, sev: "high", action: t("twin_action_mite"), metric: `${t("twin_mite")} ${z.mite}%` });
    else if (z.fungal >= 65) alerts.push({ zone: z.name, sev: "medium", action: t("twin_action_fungal"), metric: `${t("twin_fungal")} ${z.fungal}%` });
    else if (z.thrips >= 80) alerts.push({ zone: z.name, sev: "medium", action: t("twin_action_thrips"), metric: `${t("twin_thrips")} ${z.thrips}%` });
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16 }}>
      <Hero eyebrow={t("twin_eyebrow")} title={t("twin_title")} subtitle={t("twin_subtitle")} />

      <Card>
        <Text style={s.secTitle}>{t("twin_alerts")}</Text>
        {alerts.length ? (
          alerts.map((a, i) => (
            <View key={i} style={[s.alert, { borderLeftColor: sevColors[a.sev].dot }]}>
              <Text style={s.alertZone}>{a.zone} · <Text style={{ color: sevColors[a.sev].ink }}>{a.metric}</Text></Text>
              <Text style={s.alertAction}>{a.action}</Text>
            </View>
          ))
        ) : (
          <View style={s.empty}><Text style={s.emptyText}>{t("twin_no_alerts")}</Text></View>
        )}
      </Card>

      {zones.map((z) => <ZoneCard key={z.id} z={z} t={t} lang={lang} />)}

      <View style={s.note}>
        <Ionicons name="hardware-chip-outline" size={16} color={theme.amberInk} />
        <Text style={s.noteText}>{t("twin_sim_note")}</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  secTitle: { fontSize: 18, fontWeight: "800", color: theme.ink, marginBottom: 2 },
  zHead: { flexDirection: "row", alignItems: "center", gap: 11, marginBottom: 14 },
  zDot: { width: 12, height: 12, borderRadius: 6 },
  zName: { fontSize: 16.5, fontWeight: "800", color: theme.ink },
  zCrop: { fontSize: 13, color: theme.mut, marginTop: 1 },
  online: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: theme.greenChip, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.green },
  onlineText: { fontSize: 11.5, fontWeight: "700", color: theme.greenD },
  metrics: { flexDirection: "row", gap: 10 },
  metric: { flex: 1, backgroundColor: theme.greenWash, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 8, alignItems: "center" },
  mVal: { fontSize: 20, fontWeight: "800", color: theme.ink, fontVariant: ["tabular-nums"] },
  mUnit: { fontSize: 12, fontWeight: "700", color: theme.mut },
  mLbl: { fontSize: 11.5, color: theme.mut, fontWeight: "600", marginTop: 3 },
  riskTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  riskLbl: { fontSize: 13, fontWeight: "600", color: theme.inkSoft },
  riskVal: { fontSize: 13, fontWeight: "800", fontVariant: ["tabular-nums"] },
  node: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 14, borderTopWidth: 1, borderTopColor: theme.line, paddingTop: 12 },
  nodeText: { fontSize: 12, color: theme.mut, fontWeight: "600", flex: 1 },
  alert: { borderLeftWidth: 3, paddingLeft: 12, paddingVertical: 3, marginTop: 12 },
  alertZone: { fontSize: 14, fontWeight: "800", color: theme.ink },
  alertAction: { fontSize: 13.5, color: theme.inkSoft, marginTop: 2 },
  empty: { backgroundColor: theme.greenWash, borderRadius: 12, padding: 22, marginTop: 12, alignItems: "center" },
  emptyText: { color: theme.mut, fontSize: 14, textAlign: "center" },
  note: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: theme.amberWash, borderRadius: 12, padding: 12, marginTop: 2 },
  noteText: { flex: 1, fontSize: 12.5, color: theme.amberInk, fontWeight: "600", lineHeight: 17 },
});