import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme, sevColors } from "../theme";
import { Card, Hero, Btn, SectionHead, Bar } from "../ui";
import { useScans } from "../scanStore";
import { relTime, sevKey, isRealDisease } from "../util";
import { useLang } from "../LangContext";
import { localizeTerm } from "../i18n";

function greetKey() {
  const h = new Date().getHours();
  if (h < 12) return "greet_morning";
  if (h < 17) return "greet_afternoon";
  return "greet_evening";
}

export default function Dashboard({ navigation }) {
  const { t, lang } = useLang();
  const scans = useScans();

  const total = scans.length;
  const issues = scans.filter((x) => isRealDisease(x.disease)).length;
  const healthy = scans.filter((x) => /healthy/i.test(x.disease || "")).length;
  const weekAgo = Date.now() - 7 * 86400000;
  const thisWeek = scans.filter((x) => x.t >= weekAgo).length;
  const recent = scans.slice(0, 6);
  const last = scans[0];

  const counts = {};
  scans.filter((x) => isRealDisease(x.disease)).forEach((x) => {
    counts[x.disease] = (counts[x.disease] || 0) + 1;
  });
  const topIssues = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const maxCount = topIssues.length ? topIssues[0][1] : 1;

  let subtitle;
  if (!total) subtitle = t("dash_sub_empty");
  else if (last && isRealDisease(last.disease)) subtitle = t("dash_sub_issue", last.disease, last.crop || "leaf", issues, total);
  else subtitle = t("dash_sub_generic", total);

  const stats = [
    { key: "stat_total", val: total, icon: "scan-outline", bg: theme.greenChip, color: theme.greenD },
    { key: "stat_issues", val: issues, icon: "alert-circle-outline", bg: theme.redWash, color: theme.red },
    { key: "stat_healthy", val: healthy, icon: "leaf-outline", bg: theme.greenChip, color: theme.greenD },
    { key: "stat_week", val: thisWeek, icon: "calendar-outline", bg: theme.blueWash, color: theme.blue },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16 }}>
      <Hero eyebrow={t("dash_eyebrow")} title={t("greet_name", t(greetKey()))} subtitle={subtitle}>
        <View style={s.heroBtns}>
          <Btn title={t("scan_a_leaf")} icon="scan-outline" variant="white" onPress={() => navigation.navigate("Leaf Scan")} style={{ flex: 1 }} />
          <Btn title={t("ask_ai")} icon="chatbubbles-outline" variant="glass" onPress={() => navigation.navigate("Agronomist")} style={{ flex: 1 }} />
        </View>
      </Hero>

      <View style={s.statGrid}>
        {stats.map((st) => (
          <Card key={st.key} style={s.statCard}>
            <View style={[s.statIc, { backgroundColor: st.bg }]}>
              <Ionicons name={st.icon} size={19} color={st.color} />
            </View>
            <Text style={s.statVal}>{st.val}</Text>
            <Text style={s.statLabel}>{t(st.key)}</Text>
          </Card>
        ))}
      </View>

      <Card>
        <SectionHead title={t("recent_diagnoses")} sub={t("recent_diag_sub")} />
        {recent.length ? (
          recent.map((x) => (
            <Pressable
              key={x.id}
              onPress={() => navigation.navigate("Leaf Scan", { openScan: x })}
              style={({ pressed }) => [s.row, pressed && s.rowPressed]}
            >
              <View style={[s.dot, { backgroundColor: sevColors[sevKey(x.severity)].dot }]} />
              <View style={{ flex: 1 }}>
                <Text style={s.rowName}>{localizeTerm(x.disease, lang)}</Text>
                <Text style={s.rowMeta}>{localizeTerm(x.crop, lang) || "Leaf"} · {relTime(x.t, t)}</Text>
              </View>
              <View style={s.confPill}><Text style={s.confText}>{x.confidence || 0}%</Text></View>
            </Pressable>
          ))
        ) : (
          <View style={s.empty}><Text style={s.emptyText}>{t("no_scans")}</Text></View>
        )}
      </Card>

      <Card>
        <SectionHead title={t("top_issues")} sub={t("top_issues_sub")} />
        {topIssues.length ? (
          <View style={{ gap: 14, marginTop: 12 }}>
            {topIssues.map(([name, count]) => (
              <View key={name}>
                <View style={s.issueTop}>
                  <Text style={s.issueName}>{localizeTerm(name, lang)}</Text>
                  <Text style={s.issueCount}>{count}</Text>
                </View>
                <Bar pct={(count / maxCount) * 100} colors={[theme.amber, theme.red]} />
              </View>
            ))}
          </View>
        ) : (
          <View style={s.empty}><Text style={s.emptyText}>{t("no_issues")}</Text></View>
        )}
      </Card>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  heroBtns: { flexDirection: "row", gap: 10, marginTop: 18 },
  statGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  statCard: { width: "48.5%" },
  statIc: { width: 38, height: 38, borderRadius: 11, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  statVal: { fontSize: 30, fontWeight: "800", color: theme.ink, letterSpacing: -1 },
  statLabel: { fontSize: 12.5, color: theme.mut, fontWeight: "600", marginTop: 4 },
  row: { flexDirection: "row", alignItems: "center", gap: 11, borderWidth: 1, borderColor: theme.line, borderRadius: 13, padding: 13, marginTop: 10 },
  rowPressed: { backgroundColor: theme.greenWash, borderColor: "#BFD8C2" },
  dot: { width: 9, height: 9, borderRadius: 5 },
  rowName: { fontSize: 15, fontWeight: "800", color: theme.ink },
  rowMeta: { fontSize: 12.5, color: theme.mut, marginTop: 1 },
  confPill: { backgroundColor: theme.greenChip, borderRadius: 999, paddingVertical: 5, paddingHorizontal: 11 },
  confText: { fontSize: 13, fontWeight: "800", color: theme.greenD },
  issueTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 7 },
  issueName: { fontSize: 14.5, fontWeight: "600", color: theme.ink },
  issueCount: { fontSize: 14.5, fontWeight: "800", color: theme.ink },
  empty: { backgroundColor: "#F1F7EF", borderRadius: 14, padding: 26, marginTop: 14, alignItems: "center" },
  emptyText: { color: theme.mut, fontSize: 14, textAlign: "center" },
});