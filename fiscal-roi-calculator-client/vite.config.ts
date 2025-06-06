import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000, // UI on port 3000
    // https: true, // Reverted: Disable HTTPS for Vite dev server
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Reverted: Target backend on HTTP port 5000
        changeOrigin: true,
        // secure: false, // Not needed for HTTP target
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
