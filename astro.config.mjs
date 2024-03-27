import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
import mdx from "@astrojs/mdx";

//import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://cats-not-doctors.vercel.app/",
  integrations: [tailwind(), alpinejs(), mdx()],
  //output: "server",
  //adapter: cloudflare()
});