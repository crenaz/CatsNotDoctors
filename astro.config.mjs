import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import node from "@astrojs/node";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import polyfills
import "./src/polyfills.js";

// Use environment variable to determine which adapter to use
const isLocalDev = process.env.ASTRO_ADAPTER_MODE === "local";

export default defineConfig({
  output: "server",
  adapter: isLocalDev
    ? node({ mode: "standalone" })
    : cloudflare({
        mode: "directory",
        functionPerRoute: false,
      }),
  integrations: [
    tailwind(),
    alpinejs(),
    mdx(),
    react({
      include: ["**/*.{jsx,tsx}"],
      ssr: true,
    }),
  ],
  image: {
    service: { entrypoint: "astro/assets/services/noop" },
  },
  vite: {
    define: {
      global: "globalThis",
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
    },
    optimizeDeps: {
      include: ["cssesc", "react", "react-dom"],
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
      },
    },
    resolve: {
      alias: {
        os: path.resolve(__dirname, "./src/polyfills/os-polyfill.js"),
      },
      // Add this to help Vite resolve CommonJS modules
      mainFields: ["module", "jsnext:main", "jsnext", "main"],
    },
    ssr: {
      noExternal: true,
      external: ["sharp"],
    },
    build: {
      minify: false,
      rollupOptions: {
        external: ["sharp"],
      },
    },
  },
});
