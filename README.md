# ARKAI Studio

This is the source code for my personal portfolio site, built with
[Astro](https://astro.build) and deployed to
[GitHub Pages](https://pages.github.com).

Live site: [www.arkaistudio.com](https://www.arkaistudio.com)

## About

I'm Arkai, a senior game engineer focused on Unity/C#, WebGL production
systems, GenAI workflows, and EdTech game products. This site hosts my
portfolio, selected production history, public engineering artifacts, and
static legacy archives.

## Project Structure

```text
├── public/                    # Static assets, icons, brand files, and local media
│   ├── assets/brand/          # ARKAI Studio logo and lockups
│   └── assets/migrated/       # Referenced legacy media kept for static pages
├── src/
│   ├── components/            # Reusable Astro components
│   ├── content/
│   │   ├── blog/              # Legacy technical articles kept for URL compatibility
│   │   └── projects/          # Portfolio entries
│   ├── layouts/               # Shared page layouts
│   ├── pages/                 # Astro routes
│   ├── styles/                # Global CSS
│   └── utils/                 # Content helpers
├── .github/workflows/         # GitHub Pages deployment workflow
├── astro.config.mjs           # Astro configuration
├── package.json               # Project scripts and dependencies
├── pnpm-lock.yaml             # Locked dependency graph
└── public/CNAME               # GitHub Pages custom domain
```

## Commands

| Command            | Action                                           |
| :----------------- | :----------------------------------------------- |
| `pnpm install`     | Install dependencies                             |
| `pnpm run dev`     | Start the local dev server at `localhost:4321`   |
| `pnpm run check`   | Run Astro type and content checks                |
| `pnpm run build`   | Build the production site and Pagefind index     |
| `pnpm run preview` | Preview the production build locally             |

## Deployment

The site deploys from `main` through GitHub Actions. The workflow builds the
static site, generates the Pagefind index, uploads `dist/`, and publishes it to
GitHub Pages.

The canonical domain is:

```txt
www.arkaistudio.com
```

DNS is managed outside this repository. Keep registrar exports, DNS provider
credentials, mail settings, and API tokens out of git.

## Content Notes

- `/portfolio/` is the public portfolio index.
- Project detail pages keep their legacy `/blog/showcases/portfolio/.../`
  paths so older links continue to work.
- Legacy blog pages remain static archives. They are not the primary product
  surface of the site.
- Migration tooling is intentionally not part of the active project workflow.

## License

No open source license is declared for this repository yet. Unless stated
otherwise, the website content, images, portfolio media, and ARKAI Studio brand
assets are owned by ARKAI Studio.

## Inspiration

The README structure is intentionally close to
[Peter Steinberger's personal site](https://github.com/steipete/steipete.me):
short overview, project structure, commands, deployment, and clear ownership.
