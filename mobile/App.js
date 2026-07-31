import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import { LangContext } from "./src/LangContext";
import { getSavedLang, saveLang, labelFor } from "./src/lang";
import { makeT } from "./src/i18n";
import { hydrate } from "./src/scanStore";
import { getFarmer } from "./src/farmer";
import { theme } from "./src/theme";
import LanguagePicker from "./src/LanguagePicker";
import RegisterScreen from "./src/RegisterScreen";
import Dashboard from "./src/screens/Dashboard";
import LeafScan from "./src/screens/LeafScan";
import DigitalTwin from "./src/screens/DigitalTwin";
import Agronomist from "./src/screens/Agronomist";

const Tab = createBottomTabNavigator();
const TAB_ICON = {
  Dashboard: "grid-outline",
  "Leaf Scan": "scan-outline",
  "Digital Twin": "pulse-outline",
  Agronomist: "chatbubbles-outline",
};
const TAB_KEY = {
  Dashboard: "tab_dashboard",
  "Leaf Scan": "tab_scan",
  "Digital Twin": "tab_twin",
  Agronomist: "tab_agronomist",
};

export default function App() {
  const [lang, setLang] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [ready, setReady] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      await hydrate();
      const saved = await getSavedLang();
      const f = await getFarmer();
      setLang(saved);
      setFarmer(f);
      setPickerOpen(!saved);
      setReady(true);
    })();
  }, []);

  const pick = async (id) => { await saveLang(id); setLang(id); setPickerOpen(false); };

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="leaf" size={44} color={theme.green} />
      </View>
    );
  }

  const t = makeT(lang || "hinglish");
  const showRegister = !pickerOpen && !farmer;

  const HeaderTitle = () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: theme.green, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="leaf" size={16} color="#fff" />
      </View>
      <Text style={{ fontSize: 17, fontWeight: "800", color: theme.ink }}>Poly-Guardian</Text>
    </View>
  );

  const LangButton = () => (
    <Pressable
      onPress={() => setPickerOpen(true)}
      style={{ flexDirection: "row", alignItems: "center", gap: 5, marginRight: 12, backgroundColor: theme.greenWash, borderRadius: 10, paddingVertical: 6, paddingHorizontal: 10 }}
    >
      <Ionicons name="globe-outline" size={15} color={theme.greenD} />
      <Text style={{ color: theme.greenD, fontWeight: "700", fontSize: 13 }}>{lang ? labelFor(lang) : "Language"}</Text>
    </Pressable>
  );

  return (
    <SafeAreaProvider>
      <LangContext.Provider value={{ lang, t, openPicker: () => setPickerOpen(true) }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerTitle: () => <HeaderTitle />,
              headerRight: () => <LangButton />,
              headerStyle: { backgroundColor: theme.card },
              tabBarActiveTintColor: theme.green,
              tabBarInactiveTintColor: theme.mut2,
              tabBarLabel: t(TAB_KEY[route.name]),
              tabBarStyle: { backgroundColor: theme.card, borderTopColor: theme.line, paddingTop: 6, height: 62, paddingBottom: 8 },
              tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
              tabBarIcon: ({ color, size }) => <Ionicons name={TAB_ICON[route.name]} size={size} color={color} />,
            })}
          >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Leaf Scan" component={LeafScan} />
            <Tab.Screen name="Digital Twin" component={DigitalTwin} />
            <Tab.Screen name="Agronomist" component={Agronomist} />
          </Tab.Navigator>
        </NavigationContainer>

        <LanguagePicker visible={pickerOpen} current={lang} onPick={pick} onClose={lang ? () => setPickerOpen(false) : null} />
        <RegisterScreen visible={showRegister} onDone={(f) => setFarmer(f)} />
        <StatusBar style="dark" />
      </LangContext.Provider>
    </SafeAreaProvider>
  );
}