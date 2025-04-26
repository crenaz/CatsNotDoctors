import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
    },
    optimizeDeps: {
      include: ["cssesc"],
    },
    resolve: {
      alias: {
        os: path.resolve(__dirname, "./src/polyfills/os-polyfill.js"),
      },
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
