import { defineConfig } from "vite";
import path from "path";
import getPlugins from "./vite.plugins"; // Adjust path if needed

export default defineConfig(async ({ mode }) => ({
  base: "/pathfinder/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: await getPlugins(mode),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
