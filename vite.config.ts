import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** One segment after host = repo name (`/small-farmer/...`) for github.io project Pages. */
const GH_PAGES_PATH_SEGMENTS_TO_KEEP = 1;

/**
 * GitHub project Pages does not fall back to index.html for deep links.
 * 1) 404.html redirects to /small-farmer/?/dashboard so the server returns a real file.
 * 2) index.html (below) restores /small-farmer/dashboard before React Router runs.
 */
function githubPagesSpa() {
  return {
    name: "github-pages-spa",
    closeBundle() {
      const dist = resolve(process.cwd(), "dist");
      const n = GH_PAGES_PATH_SEGMENTS_TO_KEEP;
      const redirect404 = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Redirecting…</title>
  <script>
    (function () {
      var pathSegmentsToKeep = ${n};
      var l = window.location;
      l.replace(
        l.protocol + "//" + l.hostname + (l.port ? ":" + l.port : "") +
          l.pathname.split("/").slice(0, 1 + pathSegmentsToKeep).join("/") +
          "/?/" +
          l.pathname.slice(1).split("/").slice(pathSegmentsToKeep).join("/") +
          (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
          l.hash
      );
    })();
  </script>
</head>
<body></body>
</html>
`;
      writeFileSync(resolve(dist, "404.html"), redirect404, "utf8");
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), ...(command === "build" ? [githubPagesSpa()] : [])],
  base: command === "build" ? "/small-farmer/" : "/",
}));
