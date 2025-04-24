import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://catsnotdoctors.pages.dev",
  integrations: [tailwind(), alpinejs(), mdx(), react()],
  output: "server",
  adapter: cloudflare({
    mode: "directory",
    imageService: "passthrough",
    runtime: {
      mode: "local",
      type: "pages",
      bindings: {
        SESSION: {
          type: "kv",
        },
      },
    },
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
