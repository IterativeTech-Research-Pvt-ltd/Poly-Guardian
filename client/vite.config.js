import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In dev, Vite runs on :5173 and proxies the API calls to the Express
// backend on :5001 — so /detect and /ask work with no CORS setup.
// `npm run build` outputs to client/dist, which Express serves in production.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/detect": "http://localhost:5001",
      "/ask": "http://localhost:5001",
      "/health": "http://localhost:5001",
    },
  },
  build: { outDir: "dist", emptyOutDir: true },
});