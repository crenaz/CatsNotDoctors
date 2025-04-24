import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

const isProd = process.env.NODE_ENV === "production";

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
  ...(isProd && {
    adapter: cloudflare({
      mode: "directory",
      imageService: "passthrough",
      runtime: {
        mode: "local",
        type: "pages",
        noServe: true,
      },
      persistSession: false,
      kvNamespace: false,
    }),
  }),
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
  vite: {
    build: {
      target: "esnext",
    },
  },
});
