// vite.plugins.ts
import react from "@vitejs/plugin-react-swc";

export default async function getPlugins(mode: string) {
  const plugins = [react()];

  if (mode === "development") {
    const { componentTagger } = await import("lovable-tagger");
    plugins.push(componentTagger());
  }

  return plugins;
}
