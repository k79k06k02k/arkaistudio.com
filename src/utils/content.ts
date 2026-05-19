import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;
export type Project = CollectionEntry<"projects">;

export function byNewest<T extends { data: { pubDate?: Date; date?: Date } }>(a: T, b: T) {
  const aDate = a.data.pubDate ?? a.data.date ?? new Date(0);
  const bDate = b.data.pubDate ?? b.data.date ?? new Date(0);
  return bDate.getTime() - aDate.getTime();
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

export function stripTrailingSlash(path: string) {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

export function projectPath(slug: string) {
  return `/portfolio/${slug}/`;
}
