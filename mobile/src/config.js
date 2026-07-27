import { Platform } from "react-native";

// The mobile app talks to your Poly-Guardian backend (the same server.js
// that powers the web app). A phone can't reach "localhost", so on a device
// we use your computer's LAN IP; in the browser preview we use localhost.
//
// 1. Make sure the backend is running:   npm start   (in the project root)
// 2. Find your Mac's Wi-Fi IP:           ipconfig getifaddr en0
// 3. Put it in LAN_IP below (phone + computer must be on the SAME Wi-Fi).
//
// When you deploy the backend (e.g. AWS), set API_BASE to your https URL.
const LAN_IP = "172.25.132.251";

export const API_BASE =
  Platform.OS === "web" ? "http://localhost:5001" : `http://${LAN_IP}:5001`;