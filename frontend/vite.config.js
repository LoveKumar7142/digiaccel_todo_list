import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const { BACKEND_URL } = loadEnv(mode, process.cwd(), "BACKEND_");
  const proxy = { "/api": BACKEND_URL || "http://localhost:5000" };

  return {
    esbuild: { jsx: "automatic" },
    server: { proxy },
    preview: { proxy },
  };
});
