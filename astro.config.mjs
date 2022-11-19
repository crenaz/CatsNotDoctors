import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
// import image from "@astrojs/image";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config 
// THIS IS NOT NEEDED FOR VERCEL because we're on cloudflare now
//  import sitemap from "@astrojs/sitemap";

// https://astro.build/config
// import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://cats-not-doctors.vercel.app/",
  integrations: [tailwind(), alpinejs(), mdx()],
  output: "server",
  adapter: cloudflare()
});