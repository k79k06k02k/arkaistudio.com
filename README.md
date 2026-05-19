# ARKAI Studio

Personal portfolio site for ARKAI Studio, built with Astro and deployed to GitHub Pages.

## Scope

- English-first portfolio and professional profile.
- Portfolio index at `/portfolio/`.
- Static project pages under `/blog/showcases/portfolio/.../` for legacy URL compatibility.
- Legacy blog pages are kept as static archives so old links continue to work, but they are not the main product surface.
- Pagefind static search, RSS, sitemap, OpenGraph metadata, and local media assets.

## Stack

- Astro
- TypeScript
- MDX/content collections
- Pagefind
- GitHub Actions
- GitHub Pages

## Commands

```bash
pnpm install
pnpm run dev
pnpm run check
pnpm run build
pnpm run preview
```

## Deployment

The site deploys from `main` through `.github/workflows/deploy.yml`.

The GitHub Pages custom domain is configured by:

```txt
public/CNAME
```

Current canonical domain:

```txt
www.arkaistudio.com
```

DNS is managed outside this repository. Keep mail records and domain settings in the registrar/DNS provider; do not commit provider exports or credentials here.

## Repository Hygiene

- Do not commit `.env` files, private keys, API tokens, SQL dumps, WordPress backups, or registrar exports.
- Migration tooling is intentionally not part of the active project workflow. Generated legacy content is now maintained as static site content.
- Large public media belongs under `public/assets` only when it is actually referenced by a page.
