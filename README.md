# Aurea Hosting

Aurea Hosting (aureahosting.com.au) is an Adelaide short-stay and Airbnb property management business. This repository contains the public marketing site for that business: a fully static site with no framework, no build step, and no server-side runtime.

## Tech stack

- Static site built from vanilla HTML5 pages.
- Single design-system stylesheet: `styles.css`.
- Vanilla ES6+ JavaScript: `app.js`.
- Self-hosted Lucide icons: `lucide.js` (621 KB, committed to the repo root).
- MapLibre GL 4.1.2 loaded via unpkg for the areas map.
- Fontshare CDN fonts: Satoshi (body) and Switzer (headings).
- Formspree for the contact form (`f/xkopyjkj`).
- MailerLite on `report.html`.
- Google Analytics 4 (`G-0PHKTBR7RB`), Google Ads (`AW-18189621704`), and Meta Pixel (`1027065616568144`) tags on every public page.

## Hosting & deployment

The site is hosted on Cloudflare Pages. Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, and a report-only Content Security Policy) are served from the `_headers` file at the repo root.

Cloudflare Pages publishes a per-branch preview deploy at:

```
https://<branch-slug>.<project-name>.pages.dev
```

There is no build pipeline and no `package.json`. Files are served as-is from the repository.

## Repository layout

Public HTML pages at the repo root:

- `index.html`, `contact.html`, `faq.html`, `services.html`, `technology.html`, `why-us.html`, `areas.html`
- Per-suburb pages under `areas/` (Glenelg, CBD, Norwood, Brighton, Prospect, Stirling)
- `privacy.html`, `report.html`, `card.html`, `404.html`

Supporting files:

- `styles.css` - full design system
- `app.js` - interactions, calculator, animations
- `data.js` - plain data module
- `lucide.js` - self-hosted icon library
- `_headers` - Cloudflare Pages security headers
- `robots.txt`, `sitemap.xml`
- `images/` - favicons, hero images, area photos
- `tools/inspection.html` - internal inspection tool
- `guides/` - guide templates

`admin.html` and `cms.js` were removed in PR #25. No CMS admin surface exists in the current repository.

## Local development

This is a dependency-free static site. It can be previewed by opening any HTML file directly in a browser, or by serving the repo root with any static file server (for example `python3 -m http.server`).

There is no `.env` file and no server-side secrets. The only externally visible credential is the Formspree endpoint ID hardcoded in `contact.html`.

## Documentation

The repo contains three audit documents:

- [AUDIT.md](AUDIT.md) - full site audit, dated 21 April 2026
- [CMS-AUDIT.md](CMS-AUDIT.md) - CMS and HTML content diff, generated 2026-06-03
- [SECURITY-AUDIT.md](SECURITY-AUDIT.md) - security headers audit, dated 2026-07-29

**Staleness warning.** AUDIT.md and CMS-AUDIT.md predate the removal of the CMS admin system (PR #25) and the self-hosting of Lucide. Both documents reference `admin.html` and `cms.js` as existing files, and describe Lucide as loaded from a CDN - none of which reflects the current state of the repository. SECURITY-AUDIT.md is the most current description of the repo and explicitly corrects those points. Note that SECURITY-AUDIT.md's verification checklist (Phase 3) is recorded in that document as not yet executed - no claim in it was verified against a live deployment.
