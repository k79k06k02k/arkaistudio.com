import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    originalTitle: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    modDate: z.coerce.date().optional(),
    legacyPath: z.string(),
    legacySlug: z.string(),
    wpId: z.string(),
    legacyAliases: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    sourceUrl: z.string().url(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    originalTitle: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    legacyPath: z.string(),
    legacySlug: z.string(),
    projectTypes: z.array(z.string()).default([]),
    sourceUrl: z.string().url(),
    featuredImage: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    videos: z
      .array(
        z.object({
          id: z.string(),
          title: z.string().optional(),
          cover: z.string().optional(),
        }),
      )
      .default([]),
    role: z.string().optional(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
