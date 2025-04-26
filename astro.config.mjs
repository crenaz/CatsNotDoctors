import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a custom module polyfill
const modulePolyfill = `
  if (typeof globalThis.module === 'undefined') {
    globalThis.module = { exports: {} };
  }
  if (typeof globalThis.exports === 'undefined') {
    globalThis.exports = globalThis.module.exports;
  }
`;

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    mode: "directory",
    functionPerRoute: false,
  }),
  integrations: [tailwind(), alpinejs(), mdx(), react()],
  image: {
    service: { entrypoint: "astro/assets/services/noop" },
  },
  vite: {
    define: {
      global: "globalThis",
      // Only pass specific environment variables instead of the entire process.env
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
    },
    optimizeDeps: {
      include: ["cssesc"],
    },
    ssr: {
      noExternal: true,
      external: ["node:*", "sharp"],
    },
    build: {
      minify: false, // For better debugging
      rollupOptions: {
        external: ["sharp"],
      },
    },
  },
});
