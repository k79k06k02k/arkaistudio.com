import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const PROJECT_DIR = path.join(ROOT, "src/content/projects");
const WORDPRESS_BACKUP_ROOT =
  process.env.WORDPRESS_BACKUP_ROOT ??
  "/Users/chenzhikai/Downloads/2023-05-17_03-01-37_RRDZK2KA01";
const WXR_FILE = path.join(WORDPRESS_BACKUP_ROOT, "ARKAI_Studio.wordpress.2023-05-17.xml");

const blogFiles = await Array.fromAsync((await import("node:fs")).promises.glob("*.md", { cwd: BLOG_DIR }));
const projectFiles = await Array.fromAsync((await import("node:fs")).promises.glob("*.md", { cwd: PROJECT_DIR }));

let failed = false;

check(blogFiles.length === 25, `expected 25 blog posts, found ${blogFiles.length}`);
check(projectFiles.length === 22, `expected 22 portfolio entries, found ${projectFiles.length}`);

for (const file of [...blogFiles.map((name) => path.join(BLOG_DIR, name)), ...projectFiles.map((name) => path.join(PROJECT_DIR, name))]) {
  const content = await readFile(file, "utf8");
  check(!content.includes("wp-content"), `${path.relative(ROOT, file)} still links to wp-content`);
  check(/legacyPath:/.test(content), `${path.relative(ROOT, file)} missing legacyPath`);
  check(/sourceUrl:/.test(content), `${path.relative(ROOT, file)} missing sourceUrl`);
}

await validateBlogCodeBlocks(blogFiles);

if (failed) {
  process.exitCode = 1;
} else {
  console.log("Migration validation passed.");
}

function check(condition, message) {
  if (condition) return;
  failed = true;
  console.error(`Validation failed: ${message}`);
}

async function validateBlogCodeBlocks(files) {
  try {
    await access(WXR_FILE);
  } catch {
    console.warn("WordPress XML backup not available; skipping exact code block validation.");
    return;
  }

  const expectedByPostId = await loadWxrPreBlocks();
  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const content = await readFile(fullPath, "utf8");
    const wpId = content.match(/^wpId: "(\d+)"/m)?.[1];
    if (!wpId || !expectedByPostId.has(wpId)) continue;

    const expected = expectedByPostId.get(wpId);
    const actual = [...content.matchAll(/```[\w-]*\n([\s\S]*?)\n```/g)].map((match) =>
      match[1].replace(/\n+$/g, ""),
    );

    check(
      actual.length === expected.length,
      `${path.relative(ROOT, fullPath)} expected ${expected.length} code blocks, found ${actual.length}`,
    );

    for (let index = 0; index < Math.min(actual.length, expected.length); index += 1) {
      check(
        actual[index] === expected[index],
        `${path.relative(ROOT, fullPath)} code block ${index + 1} does not match WordPress backup`,
      );
    }
  }
}

async function loadWxrPreBlocks() {
  const xml = await readFile(WXR_FILE, "utf8");
  const map = new Map();
  for (const item of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const block = item[1];
    if (xmlValue(block, "wp:post_type") !== "post") continue;
    if (xmlValue(block, "wp:status") !== "publish") continue;

    const id = xmlValue(block, "wp:post_id");
    const content = xmlValue(block, "content:encoded");
    if (!id || !content) continue;

    const document = new JSDOM(`<main>${content}</main>`).window.document;
    const codeBlocks = [...document.querySelectorAll("pre")].map((pre) =>
      pre.textContent.replace(/\n+$/g, ""),
    );
    if (codeBlocks.length > 0) map.set(id, codeBlocks);
  }
  return map;
}

function xmlValue(block, tag) {
  const match = block.match(
    new RegExp(`<${tag}>(?:<!\\\\[CDATA\\\\[)?([\\\\s\\\\S]*?)(?:\\\\]\\\\]>)?<\\/${tag}>`),
  );
  return match?.[1]?.trim() ?? "";
}
