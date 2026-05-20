import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const legacySourceRoot = join(rootDir, "public/assets/migrated");
const generatedRoot = join(rootDir, "public/assets/generated");
const mediaRoot = join(rootDir, "public/assets/media");
const manifestPath = join(rootDir, "src/data/media-manifest.json");
const publicRoot = join(rootDir, "public");
const distRoot = join(rootDir, "dist");
const sourceRoots = ["src", "public"].map((path) => join(rootDir, path));
const allowedMediaExtensions = new Set([".avif", ".webp"]);
const legacyImageExtensions = new Set([".gif", ".jpg", ".jpeg", ".png"]);

function walkFiles(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      files.push(...walkFiles(path));
    } else {
      files.push(path);
    }
  }
  return files;
}

function extension(path) {
  const dot = path.lastIndexOf(".");
  return dot === -1 ? "" : path.slice(dot).toLowerCase();
}

function assertNoTextMatch(errors, root, pattern, label) {
  if (!existsSync(root)) return;

  for (const file of walkFiles(root)) {
    if (file.startsWith(mediaRoot)) continue;
    if (file.includes(`${sep}node_modules${sep}`) || file.includes(`${sep}dist${sep}`)) continue;
    if (statSync(file).size > 5 * 1024 * 1024) continue;

    const ext = extension(file);
    if (![".astro", ".css", ".js", ".json", ".md", ".mjs", ".ts", ".xml"].includes(ext)) {
      continue;
    }

    const text = readFileSync(file, "utf8");
    if (pattern.test(text)) {
      errors.push(`${relative(rootDir, file)} still references ${label}`);
    }
  }
}

function publicUrlToPath(url) {
  return join(publicRoot, decodeURIComponent(url.replace(/^\//, "")));
}

function assertGeneratedFile(errors, url, label) {
  if (!url || typeof url !== "string") {
    errors.push(`${label} is missing`);
    return;
  }

  const filePath = publicUrlToPath(url);
  if (!existsSync(filePath)) {
    errors.push(`${label} file does not exist: ${url}`);
    return;
  }

  if (statSync(filePath).size <= 0) {
    errors.push(`${label} file is empty: ${url}`);
  }
}

function assertVariantSet(errors, entry, format) {
  const variants = entry.formats?.[format];
  if (!Array.isArray(variants) || variants.length === 0) {
    errors.push(`${entry.src} has no ${format} variants`);
    return;
  }

  for (const variant of variants) {
    if (!Number.isFinite(variant.width) || variant.width <= 0) {
      errors.push(`${entry.src} has invalid ${format} variant width`);
    }
    assertGeneratedFile(errors, variant.src, `${entry.src} ${format} variant`);
  }
}

function verifyManifest() {
  const errors = [];

  if (existsSync(legacySourceRoot)) {
    errors.push(`Legacy source asset directory must be removed: ${relative(rootDir, legacySourceRoot)}`);
  }

  if (existsSync(generatedRoot)) {
    errors.push(`Generated asset staging directory must be removed: ${relative(rootDir, generatedRoot)}`);
  }

  if (!existsSync(mediaRoot)) {
    errors.push(`Missing optimized media directory: ${relative(rootDir, mediaRoot)}`);
  }

  if (!existsSync(manifestPath)) {
    return [`Missing media manifest: ${relative(rootDir, manifestPath)}`];
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const entries = Object.entries(manifest.assets ?? {});

  if (entries.length === 0) {
    errors.push("Media manifest has no assets");
  }

  for (const [src, entry] of entries) {
    if (!src.startsWith("/assets/media/")) {
      errors.push(`Manifest key does not use optimized media path: ${src}`);
    }

    if (JSON.stringify(entry).includes("/assets/migrated/") || JSON.stringify(entry).includes("/assets/generated/")) {
      errors.push(`${src} manifest entry still references legacy/generated paths`);
    }

    assertGeneratedFile(errors, src, `${src} primary media`);

    assertGeneratedFile(errors, entry.thumbnail?.webp, `${src} WebP thumbnail`);
    assertGeneratedFile(errors, entry.thumbnail?.avif, `${src} AVIF thumbnail`);

    if (entry.animated) {
      assertGeneratedFile(errors, entry.animated?.webp, `${src} animated WebP`);
    } else {
      assertVariantSet(errors, entry, "webp");
      assertVariantSet(errors, entry, "avif");
    }
  }

  return errors;
}

function verifyDistHtml() {
  if (!existsSync(distRoot)) {
    return [];
  }

  const errors = [];
  const htmlFiles = walkFiles(distRoot).filter((file) => file.endsWith(".html"));

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const rel = relative(rootDir, file);

    if (html.includes("/assets/migrated/") || html.includes("/assets/generated/")) {
      errors.push(`${rel} still references legacy/generated asset paths`);
    }

    if (/<img[^>]+src="\/assets\/media\/[^"]+\.(gif|jpe?g|png)"/i.test(html)) {
      errors.push(`${rel} renders non-modern media image formats`);
    }

    if (/(?:src|href|content)="\/[^"]+\.(gif|jpe?g|png)"/i.test(html)) {
      errors.push(`${rel} renders local legacy image formats`);
    }

    const thumbMatches = html.matchAll(/class="project-media-thumb[^"]*"[\s\S]*?<img[^>]+src="([^"]+)"/g);
    for (const match of thumbMatches) {
      if (!match[1].startsWith("/assets/media/") || !match[1].endsWith(".webp")) {
        errors.push(`${rel} carousel thumbnail is not optimized WebP media: ${match[1]}`);
      }
    }
  }

  return errors;
}

function verifyModernMediaFiles() {
  if (!existsSync(mediaRoot)) return [];

  const errors = [];
  for (const file of walkFiles(mediaRoot)) {
    if (!allowedMediaExtensions.has(extension(file))) {
      errors.push(`${relative(rootDir, file)} is not WebP or AVIF`);
    }
  }
  return errors;
}

function verifyModernPublicImageFiles() {
  if (!existsSync(publicRoot)) return [];

  const errors = [];
  for (const file of walkFiles(publicRoot)) {
    if (legacyImageExtensions.has(extension(file))) {
      errors.push(`${relative(rootDir, file)} is a legacy image format`);
    }
  }
  return errors;
}

function verifySourceReferences() {
  const errors = [];
  for (const root of sourceRoots) {
    assertNoTextMatch(errors, root, /\/assets\/migrated\//, "/assets/migrated");
    assertNoTextMatch(errors, root, /\/assets\/generated\//, "/assets/generated");
  }
  return errors;
}

const errors = [
  ...verifyManifest(),
  ...verifyModernMediaFiles(),
  ...verifyModernPublicImageFiles(),
  ...verifySourceReferences(),
  ...verifyDistHtml(),
];

if (errors.length > 0) {
  console.error(`Media variant verification failed with ${errors.length} issue(s):`);
  for (const error of errors.slice(0, 80)) {
    console.error(`- ${error}`);
  }
  if (errors.length > 80) {
    console.error(`- ...and ${errors.length - 80} more`);
  }
  process.exit(1);
}

console.log("Media variant verification passed.");
