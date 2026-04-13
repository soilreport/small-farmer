import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * GitHub Pages (project site) does not SPA-fallback. Writing the same built
 * `index.html` at each static path gives a real file so refresh works with
 * clean URLs (no `#`). Keep in sync with static routes in `App.tsx` and known
 * crop/region paths. `/devices/:id` cannot be enumerated — refresh there may 404.
 */
const SPA_HTML_SUBPATHS = [
  "login",
  "register",
  "forgot-password",
  "reset-password",
  "about",
  "home",
  "dashboard",
  "devices",
  "devices/add",
  "devices/groups",
  "readings",
  "alerts",
  "alerts/settings",
  "research",
  "profile",
  "settings",
  "export",
  "purchases",
  "purchases/payment-confirmation",
  "tools",
  "resources",
  "admin",
  "admin/users",
  "admin/system",
  "crops/wheat",
  "crops/potato",
  "crops/tomato",
  "crops/grape",
  "crops/barley",
  "regions/highlands",
  "regions/highlands/crops/wheat",
  "regions/highlands/crops/potato",
  "regions/highlands/crops/barley",
  "regions/highlands/crops/grape",
];

function copyIndexHtmlToStaticRoutes() {
  return {
    name: "copy-index-html-to-static-routes",
    closeBundle() {
      const dist = resolve(process.cwd(), "dist");
      const html = readFileSync(resolve(dist, "index.html"), "utf8");
      for (const sub of SPA_HTML_SUBPATHS) {
        const dir = resolve(dist, ...sub.split("/"));
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, "index.html"), html, "utf8");
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), ...(command === "build" ? [copyIndexHtmlToStaticRoutes()] : [])],
  base: command === "build" ? "/small-farmer/" : "/",
}));
