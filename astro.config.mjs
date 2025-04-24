import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

const isProd = process.env.NODE_ENV === "production";

// Only import cloudflare adapter in production
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
  output: isProd ? "server" : "static",
  ...(isProd && {
    adapter: cloudflare({
      mode: "directory",
      imageService: "passthrough",
      runtime: {
        mode: "local",
        type: "pages",
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
    ssr: {
      external: ["os", "fs", "path", "url"],
    },
    assetsInclude: ["**/*.md"],
    plugins: [
      {
        name: "vite-plugin-raw",
        transform(_, id) {
          if (id.endsWith("?raw")) {
            return {
              code: `export default ${JSON.stringify(id)}`,
              map: null,
            };
          }
        },
      },
    ],
  },
});
