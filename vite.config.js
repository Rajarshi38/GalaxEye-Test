import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["leaflet", "leaflet/dist", "leaflet/dist/images"],
  },
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true,
    },
  },
});
