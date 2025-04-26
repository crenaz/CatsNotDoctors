import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

const isProd = process.env.NODE_ENV === "production";
const cloudflare = isProd
  ? (await import("@astrojs/cloudflare")).default
  : null;

export default defineConfig({
  site: isProd ? "https://catsnotdoctors.pages.dev" : "http://localhost:3000",
  integrations: [
    tailwind(),
    alpinejs(),
    mdx({
      syntaxHighlight: "prism",
      gfm: true,
      smartypants: true,
    }),
    react(),
  ],
  output: "server",
  adapter: isProd
    ? cloudflare({
        mode: "directory",
        runtime: {
          mode: "local",
          type: "pages",
          bindings: {
            SESSION: {
              type: "kv",
            },
          },
        },
      })
    : undefined,
  vite: {
    build: {
      target: "esnext",
    },
    ssr: {
      noExternal: true, // This forces all dependencies to be bundled
      external: [], // Empty array to override the default Node.js built-ins
    },
    assetsInclude: ["**/*.md"],
    define: {
      // Polyfill Node.js globals
      "process.env": process.env,
      "process.platform": JSON.stringify("browser"),
      "process.version": JSON.stringify(""),
    },
  },
});
