# aureahosting

Hosting and dev work for AUREA, a short-term rental management company based in
Adelaide, South Australia. This repository holds the public-facing website and
associated tooling for the AUREA brand.

## Structure

| Path | Description |
|------|-------------|
| `areas/` | Individual HTML pages for each service area (CBD, Glenelg, Brighton, Norwood, Prospect, Stirling) |
| `assets/` | Static assets, primarily web fonts (Satoshi and Switzer families in woff2 and otf formats) |
| `guides/` | HTML guide templates for owners and guests |
| `images/` | Site imagery including logos, editorial photos, hero shots, and favicons |
| `next/` | In-progress stage of the site (see Build stages below) |

Root-level files include the main HTML pages (`index.html`, `about.html`,
`contact.html`, `faq.html`, `fees.html`, etc.), JavaScript files (`app.js`,
`data.js`, `lucide.js`, `ed-home.js`), Netlify routing files (`_redirects`,
`_headers`), audit and brand documentation, and an `llms.txt` file.

## Build stages

The repository uses two stages:

- **Root level** - the current live stage. All HTML pages, scripts, and assets
  at the repository root represent the version currently served to visitors.
- **`next/`** - a parallel in-progress stage. It contains its own copies of
  the main HTML pages (`index.html`, `about.html`, `contact.html`, etc.) along
  with its own `_redirects`, `_headers`, `robots.txt`, and `sitemap.xml`.
  The `next/` directory also includes pages not yet present at root level
  (e.g. `privacy.html`, `what-you-receive.html`, `how-we-run-a-home.html`).

The process for promoting `next/` to the live root is undocumented in this
repository.

## Setup

No build tooling (package manifest, task runner, or build script) is present in
this repository. The territory is static content and requires no build step.

To work on it locally, serve the repository root with any static file server,
for example:

```
npx serve .
```

To preview the `next/` stage, serve from the `next/` subdirectory instead.

## Deployment

Deployment configuration is located in the `deploy/` directory. Those files are
out of scope for changes tracked here and are documented and managed separately.

Netlify-specific routing rules (`_redirects` and `_headers`) exist both at the
repository root and inside `next/`.
