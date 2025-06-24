import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// ❌ Don't import lovable-tagger here

export default defineConfig(({ mode }) => {
  const plugins = [react()];

  // ✅ Only import lovable-tagger when in development mode
  if (mode === 'development') {
    const { componentTagger } = require("lovable-tagger");
    plugins.push(componentTagger());
  }

  return {
    base: "/pathfinder/", // ✅ required for GitHub Pages
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
