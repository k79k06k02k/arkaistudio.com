import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const beaconSrc = "https://static.cloudflareinsights.com/beacon.min.js";
const expectedToken = process.env.PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectHtmlFiles(entryPath);
      }

      return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
    }),
  );

  return files.flat();
}

function countOccurrences(value, search) {
  return value.split(search).length - 1;
}

function isRedirectPage(html) {
  return /<meta\s+http-equiv=(?:"|')refresh(?:"|')/i.test(html);
}

const htmlFiles = await collectHtmlFiles(distDir);

if (htmlFiles.length === 0) {
  throw new Error("No built HTML files were found in dist.");
}

const failures = [];
let verifiedCount = 0;
let skippedRedirectCount = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");

  if (isRedirectPage(html)) {
    skippedRedirectCount += 1;
    continue;
  }

  const beaconCount = countOccurrences(html, beaconSrc);
  verifiedCount += 1;

  if (beaconCount !== 1) {
    failures.push(`${file}: expected exactly one Cloudflare beacon, found ${beaconCount}.`);
  }

  if (!html.includes("data-cf-beacon")) {
    failures.push(`${file}: expected a data-cf-beacon attribute.`);
  }

  if (expectedToken && !html.includes(expectedToken)) {
    failures.push(`${file}: expected the configured Cloudflare token.`);
  }

  if (!expectedToken && !/data-cf-beacon=.*(?:token|&quot;token&quot;)/.test(html)) {
    failures.push(`${file}: expected a Cloudflare token in the beacon config.`);
  }
}

if (failures.length > 0) {
  throw new Error(`Cloudflare analytics verification failed:\n${failures.join("\n")}`);
}

if (verifiedCount === 0) {
  throw new Error("No non-redirect HTML files were available for Cloudflare analytics verification.");
}

console.log(
  expectedToken
    ? `Verified Cloudflare analytics in ${verifiedCount} HTML files; skipped ${skippedRedirectCount} redirects.`
    : `Verified Cloudflare analytics in ${verifiedCount} HTML files; skipped ${skippedRedirectCount} redirects.`,
);
