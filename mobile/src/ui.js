import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "./theme";

export function Card({ style, children }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function Hero({ eyebrow, title, subtitle, children }) {
  return (
    <LinearGradient
      colors={["#55AC58", "#2F7B3D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.hero}
    >
      {eyebrow ? (
        <View style={s.eyebrow}><Text style={s.eyebrowText}>{eyebrow}</Text></View>
      ) : null}
      <Text style={s.heroTitle}>{title}</Text>
      {subtitle ? <Text style={s.heroSub}>{subtitle}</Text> : null}
      {children}
    </LinearGradient>
  );
}

export function Btn({ title, icon, onPress, variant = "primary", disabled, style }) {
  const bg = {
    primary: theme.green,
    white: "#fff",
    ghost: theme.greenWash,
    glass: "rgba(255,255,255,0.16)",
  }[variant] || theme.green;
  const color = variant === "primary" || variant === "glass" ? "#fff" : (variant === "ghost" ? theme.greenD : theme.ink);
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        s.btn,
        { backgroundColor: disabled ? "#A9CBB2" : bg, opacity: pressed ? 0.9 : 1 },
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={color} /> : null}
      <Text style={[s.btnText, { color }]}>{title}</Text>
    </Pressable>
  );
}

export function SectionHead({ title, sub, right }) {
  return (
    <View style={s.secHead}>
      <View style={{ flex: 1 }}>
        <Text style={s.secTitle}>{title}</Text>
        {sub ? <Text style={s.secSub}>{sub}</Text> : null}
      </View>
      {right}
    </View>
  );
}

export function Chip({ label, bg, color }) {
  return (
    <View style={[s.chip, { backgroundColor: bg }]}>
      <View style={[s.chipDot, { backgroundColor: color }]} />
      <Text style={[s.chipText, { color }]}>{label}</Text>
    </View>
  );
}

export function Bar({ pct, colors }) {
  return (
    <View style={s.barTrack}>
      <LinearGradient
        colors={colors || [theme.greenL, theme.green]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[s.barFill, { width: `${Math.max(0, Math.min(100, pct))}%` }]}
      />
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: theme.card, borderWidth: 1, borderColor: theme.line,
    borderRadius: 20, padding: 18, marginBottom: 14,
    shadowColor: "#14321E", shadowOpacity: 0.06, shadowRadius: 14, shadowOffset: { width: 0, height: 8 }, elevation: 2,
  },
  hero: {
    borderRadius: 24, padding: 22, marginBottom: 14,
    shadowColor: "#266432", shadowOpacity: 0.2, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 4,
  },
  eyebrow: {
    alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12, marginBottom: 14,
  },
  eyebrowText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  heroTitle: { color: "#fff", fontSize: 27, fontWeight: "800", letterSpacing: -0.5, lineHeight: 32 },
  heroSub: { color: "rgba(255,255,255,0.92)", fontSize: 14.5, marginTop: 10, lineHeight: 21 },
  btn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    paddingVertical: 14, paddingHorizontal: 18, borderRadius: 13,
  },
  btnText: { fontSize: 15, fontWeight: "700" },
  secHead: { flexDirection: "row", alignItems: "flex-start", marginBottom: 4 },
  secTitle: { fontSize: 19, fontWeight: "800", color: theme.ink, letterSpacing: -0.3 },
  secSub: { fontSize: 12.5, color: theme.mut, marginTop: 2 },
  chip: { flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12, alignSelf: "flex-start" },
  chipDot: { width: 8, height: 8, borderRadius: 4 },
  chipText: { fontSize: 12.5, fontWeight: "700" },
  barTrack: { height: 9, borderRadius: 999, backgroundColor: theme.greenWash, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 999 },
});