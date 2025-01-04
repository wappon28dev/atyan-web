import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap(),
    metaTags(),
    icon({
      include: { "mdi": ["launch"], "material-symbols": ["*"] },
      iconDir: "src/assets/icons",
    }),
    compress({
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
        },
      },
      CSS: false,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  site: "https://atyan.red",
  image: {
    remotePatterns: [{ protocol: "https" }, { protocol: "http" }],
  },
});
