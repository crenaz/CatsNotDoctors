import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

// Development config
export default defineConfig({
  site: "http://localhost:3000",
  integrations: [
    tailwind(),
    alpinejs(),
    mdx(),
    react()
  ],
  output: "server",
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