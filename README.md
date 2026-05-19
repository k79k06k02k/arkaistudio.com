# ARKAI Studio

Static Astro migration of the ARKAI Studio WordPress blog and portfolio.

## What is included

- Astro static site targeting GitHub Pages.
- 25 migrated blog posts under preserved `/blog/YYYY/MM/DD/.../` URLs.
- 22 migrated portfolio entries under preserved `/blog/showcases/portfolio/.../` URLs.
- Compatibility alias pages for older numeric WordPress links such as `/blog/190/unity/.../`.
- Local media copied from the WordPress backup when available, with network download fallback.
- RSS, sitemap, OpenGraph metadata, and Pagefind static search.

## Commands

```bash
pnpm install
pnpm run migrate
pnpm run validate:migration
pnpm run check
pnpm run build
pnpm run dev
```

The migration script uses this local backup by default:

```bash
/Users/chenzhikai/Downloads/2023-05-17_03-01-37_RRDZK2KA01
```

Override it when needed:

```bash
WORDPRESS_BACKUP_ROOT=/path/to/wordpress-backup pnpm run migrate
```

Do not commit `wp-config.php`, SQL dumps, or full WordPress backups. They can contain credentials and obsolete platform baggage.

## GitHub Pages

The site is configured for:

```txt
www.arkaistudio.com
```

GitHub Pages DNS target:

```txt
www CNAME k79k06k02k.github.io
```

Apex domain records for `arkaistudio.com` should use GitHub Pages A records:

```txt
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Keep existing MX records if email still runs through DreamHost or MailChannels. Do not cancel DreamHost hosting until the deployed GitHub Pages site has HTTPS enabled and the old URLs have been checked.
