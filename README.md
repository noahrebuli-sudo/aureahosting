# aureahosting

Website and development work for AUREA, a short-term rental hosting company
based in Adelaide, Australia. The repository holds the static site source,
editorial assets, and owner-facing documents.

## Structure

| Path | Contents |
| ---- | -------- |
| main/ | The previous live stage. There is no subdirectory named `main/`; the files that constitute this stage live at the repository root (index.html, about.html, areas.html, contact.html, faq.html, fees.html, card.html, app.js, data.js, and the root-level assets). |
| next/ | The current live stage as of the 17 Nov 2026 cutover. Contains a full copy of the site with additional pages (privacy.html, sitemap.xml, robots.txt, what-you-receive.html, how-we-run-a-home.html), a rewritten asset pipeline (assets/site.css, assets/site.js), and next-generation images under images/p/. |
| areas/ | Per-suburb landing pages for the root-level stage (Brighton, CBD, Glenelg, Norwood, Prospect, Stirling). |
| next/areas/ | Per-suburb landing pages for the next/ stage. |
| assets/ | Web fonts (Switzer and Satoshi families, woff2 and otf) used by the root-level stage. |
| next/assets/ | Compiled CSS, JS, SVG glyphs, fonts, and permanent email-signature images for the next/ stage. |
| images/ | Photography, logos, favicons, and editorial images for the root-level stage. |
| next/images/ | Favicons and responsive AVIF/JPEG photography for the next/ stage. |
| guides/ | HTML page templates used for content authoring. |
| next/legacy/ | Scripts and fonts carried over from the root-level stage for backward compatibility inside next/. |

## Build stages

The repository tracks two stages of the site.

**main/ (repository root)** was the live stage until 17 Nov 2026. Its files sit
at the top level of the repository rather than in a subdirectory named `main/`.
Cloudflare Pages previously served the repository root directly.

**next/** became the live stage on 17 Nov 2026. Cloudflare Pages now serves
`next/` as the site root, so `next/index.html` is the homepage,
`next/assets/` is served at `/assets/`, and so on.

The root-level files remain in the repository as a reference copy of the
previous stage. The process for promoting changes from `next/` back to the
root level, or for retiring the root-level files, is undocumented in the
tracked source.

## Setup

No build step is required. Both stages are static HTML, CSS, and JavaScript
with no package manifest, bundler configuration, or task-runner file present
in the repository root or in `next/`. To work on the site locally, serve
either the repository root or the `next/` directory with any static file
server.

## Deployment

Deployment configuration is managed separately in the `deploy/` directory and
is out of scope for this change. Refer to the files under `deploy/` for
details on how the site is published to Cloudflare Pages. No deployment
configuration is reproduced here.
