import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeMediaVariants from "./src/utils/rehype-media-variants.mjs";

const site = "https://www.arkaistudio.com";

export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.startsWith(`${site}/blog/showcases/`),
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeMediaVariants],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
  },
});
