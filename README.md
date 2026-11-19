# aureahosting

Source code for the AUREA website - a static HTML/CSS/JS site for an Adelaide short-term rental management business. The repository holds the active `next/` site alongside root-level legacy pages and a collection of utility scripts and audit documents.

## Repository structure

| Path | Description |
|---|---|
| `next/` | Active site. All pages, assets, fonts, and images served in production. |
| `next/legacy/` | Legacy JavaScript and CSS carried forward for compatibility; not used by the current site templates. |
| `next/assets/` | Compiled CSS (`site.css`), bundled JS (`site.js`, `tags.js`), glyph sprite (`glyphs.svg`), and email assets. |
| `next/images/` | Favicons, the OG cover image, and responsive property photographs under `p/`. |
| Root HTML files | Earlier version of the site (index.html, about.html, areas.html, etc.) now superseded by `next/`. These files are not removed but are no longer the served version. |
| Root JS files | `app.js`, `data.js`, `ed-home.js`, `lucide.js` - companion scripts for the root-level legacy pages. |
| `scripts/` | Developer utility scripts (see Scripts section). |
| `AUDIT.md`, `AUDIT-2026-04-22.md`, `CMS-AUDIT.md`, `SECURITY-AUDIT.md` | Point-in-time audit reports (see Audits section). |
| `BRAND.md` | Brand guidelines document. |
| `_headers`, `_redirects` | Cloudflare Pages configuration for HTTP headers and URL redirects at root level. `next/` has its own copies. |

## Setup

There is no package.json and no Node.js build pipeline in this repository. The site is plain HTML, CSS, and JavaScript with no compile step.

**Python utilities** (scripts/check.py, scripts/serve.py, scripts/img.py): require Python 3 from the standard library only, except `scripts/img.py` which requires Pillow 11.3 or later with AVIF support.

**screenshots utility** (scripts/shots.mjs): requires Node.js and Playwright. Install Playwright once before use:

```
npm i --prefix /tmp/pw playwright
```

Then set `PW_DIR=/tmp/pw/node_modules` when running the script. No package.json is committed.

## Build

Not documented: no build configuration found. The `next/` directory is the deployable output as committed - there is no compile or bundle step. Files are edited directly.

For deployment, the repository targets Cloudflare Pages. The `next/_headers` and `next/_redirects` files are picked up automatically by the Cloudflare Pages build. No CI configuration (`.github/workflows/`, `netlify.toml`, `vercel.json`, or `wrangler.toml`) is present in the repository.

## Scripts

All scripts live in the `scripts/` directory.

| Script | Purpose |
|---|---|
| `scripts/check.py` | Build check for the `next/` site. Validates HTML pages for banned phrases, heading structure, link integrity, image attributes, glyph references, and header/footer parity. Exit 0 on no failures. Run with `python3 scripts/check.py`. |
| `scripts/serve.py` | Local development server. Serves `next/` on `http://localhost:8080` with extensionless URLs, gzip compression, and 301 redirects matching the live Cloudflare Pages behaviour. Run with `python3 scripts/serve.py [port]`. |
| `scripts/img.py` | Image processing pipeline. Crops, grades, and resizes source photographs to AVIF and JPEG at 480, 800, and 1200 px wide, writing output to `next/images/p/`. Requires Pillow. Run by hand, never by a build. |
| `scripts/shots.mjs` | Full-page screenshots and horizontal-overflow check using Playwright. Requires a running local server (start with `scripts/serve.py`). Run with `node scripts/shots.mjs [--out DIR] [--base URL] [--sizes WxH] <path ...>`. |
| `scripts/og.html` | Source template for the OG share image (`next/images/og-cover.jpg`). Open at a 1200 x 630 viewport, screenshot, and export as JPEG. Not a runnable script. |
| `scripts/map/build_map.py` | Builds the coverage-zone GeoJSON geometry for the areas map using Shapely. Requires `sa.geojson` as input (not committed). |

## Audits

| File | Contents |
|---|---|
| `AUDIT.md` | Full site audit dated 21 April 2026 covering tech stack, design and UX, conversion, SEO, and code quality. Includes a prioritised action list. Read-only - no files were modified. |
| `AUDIT-2026-04-22.md` | Internal site audit dated 22 April 2026 covering SEO, copy, CMS wiring, accessibility, and code findings for the pages present at that date. |
| `CMS-AUDIT.md` | CMS key audit generated 2026-06-03 comparing `cms.js` data-content keys against HTML fallbacks. Reports wired, orphaned, and unwired key counts. |
| `SECURITY-AUDIT.md` | Security headers audit dated 2026-07-29 for the `security-headers` branch. Documents the HTTP headers present in `_headers`, external script origins, and the CSP report-only policy added by that work. |
