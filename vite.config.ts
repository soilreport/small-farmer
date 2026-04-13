import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages has no “fallback to index.html”. Copying the built shell to 404.html fixes refresh on routes like /login. */
function copyIndexTo404() {
  return {
    name: "copy-index-to-404",
    closeBundle() {
      const dist = resolve(process.cwd(), "dist");
      copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), ...(command === "build" ? [copyIndexTo404()] : [])],
  base: command === "build" ? "/small-farmer/" : "/",
}));
