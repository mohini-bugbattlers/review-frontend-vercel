import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups", // Allow popups for Google login
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Backend URL
        changeOrigin: true, // Adjust the origin to match the target
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix
      },
    },
  },
});
