# Aurea Hosting

Marketing site for Aurea Hosting (aureahosting.com.au), an Adelaide short-stay and Airbnb property management business serving owners who treat their properties as high-yield assets.

## Tech stack

- **Pages:** Vanilla HTML5, no framework and no static site generator
- **Styles:** Single CSS file (`styles.css`) implementing a full design system via CSS custom properties
- **Interactivity:** Vanilla ES6+ JavaScript (`app.js`, `data.js`)
- **Icons:** `lucide.js` self-hosted at the repo root (621 KB, vendored)
- **Map:** MapLibre GL 4.1.2 loaded via unpkg on `areas.html`
- **Fonts:** Fontshare CDN - Satoshi (body) and Switzer (headings)
- **Contact form:** Formspree (endpoint `f/xkopyjkj` in `contact.html`)
- **Email capture:** MailerLite on `report.html`
- **Analytics and ads:** GA4 (`G-0PHKTBR7RB`), Google Ads (`AW-18189621704`), and Meta Pixel (`1027065616568144`) tags present on public pages

## Hosting & deployment

The site is hosted on Cloudflare Pages. Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, and a report-only `Content-Security-Policy`) are served from the `_headers` file in the repo root. Cloudflare Pages publishes a per-branch preview at `<branch-slug>.<project-name>.pages.dev` for every branch. There is no build pipeline and no `package.json` - files are served as-is from the repository.

## Repository layout

Public HTML pages at the repo root:

- `index.html` - homepage
- `contact.html` - application form
- `faq.html` - accordion FAQ
- `services.html` - service disciplines
- `technology.html` - Guesty and channel distribution
- `why-us.html` - competitor comparison
- `areas.html` - MapLibre map and yield table
- `privacy.html` - privacy policy
- `report.html` - Adelaide Short-Stay Yield Report and MailerLite signup
- `card.html` - digital business card
- `404.html` - custom not-found page
- `areas/` - per-suburb pages (glenelg, cbd, norwood, brighton, prospect, stirling)

Other tracked files:

- `styles.css` - full design system
- `app.js` - interactions, calculator, animations
- `data.js` - plain data module
- `lucide.js` - self-hosted icon library
- `_headers` - Cloudflare Pages security headers
- `robots.txt`
- `sitemap.xml`
- `images/` - photography, favicons, and other assets
- `tools/inspection.html` - property inspection tool
- `guides/` - guide templates

`admin.html` and `cms.js` were removed in PR #25 and no CMS admin surface exists in the current codebase.

## Local development

As a dependency-free static site with no build step, the pages can be previewed by opening any HTML file directly in a browser, or by serving the repo root with any static file server of your choice. There is no `.env` file and no server-side secrets - the only external credentials are the Formspree endpoint ID and analytics tag IDs, which are hardcoded in the HTML pages.

## Documentation

Audit documents in this repository:

- [AUDIT.md](AUDIT.md) - full site audit, dated 21 April 2026
- [CMS-AUDIT.md](CMS-AUDIT.md) - CMS and HTML content diff, generated 2026-06-03
- [SECURITY-AUDIT.md](SECURITY-AUDIT.md) - security headers audit, dated 2026-07-29

**Staleness notice:** AUDIT.md and CMS-AUDIT.md were produced before PR #25 removed the CMS admin system (`admin.html` and `cms.js`) and before Lucide was self-hosted. Both documents describe a repo state that no longer exists in those respects and should be treated as partially stale. SECURITY-AUDIT.md is the most current description of the repository and explicitly corrects those earlier assumptions. Note that the verification checklist in SECURITY-AUDIT.md (Phase 3) is recorded as not yet executed - no claim in that document asserts that the deployed headers were observed against the live site.
