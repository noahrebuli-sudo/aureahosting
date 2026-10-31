# Aurea Hosting

## Purpose

This repository contains the website for Aurea Hosting (aureahosting.com.au), an Adelaide, South Australia short-term rental management business. The site is implemented as a static HTML/CSS/JS site deployed on Cloudflare Pages with no build step.

## Repository structure

- `index.html`, `services.html`, `areas.html`, `contact.html`, `report.html`, `card.html`, `faq.html`, `why-us.html`, `privacy.html`, `404.html` - HTML pages at the repo root
- `areas/` - per-suburb pages
- `guides/` - guide templates
- `tools/inspection.html` - inspection tool
- `styles.css` - single stylesheet containing all design tokens and layout rules
- `app.js` - main application script
- `data.js` - site data
- `lucide.js` - vendored Lucide icon library
- `images/` - brand assets and photography
- `_headers` - Cloudflare Pages HTTP response headers configuration

## Maintenance notes

There is no build pipeline; HTML, CSS, and JS files are edited directly and deployed via Cloudflare Pages. Design tokens (colours, type scale, spacing) live as CSS custom properties in `styles.css`. Fonts (Switzer, Satoshi) load from Fontshare, and icons use the vendored Lucide library. Contributors should keep this README updated when the page inventory changes.
