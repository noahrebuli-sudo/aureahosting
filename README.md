# aureahosting

## Purpose

This territory holds development and hosting work for AUREA, a property management and short-stay hosting service. It contains the public-facing website source, supporting documents, and audit records maintained as part of ongoing development for AUREA.

## Repository structure

Top-level directories:

| Path | Description |
| --- | --- |
| `areas/` | Per-suburb area pages (Brighton, CBD, Glenelg, Norwood, Prospect, Stirling) |
| `assets/` | Web font files (Satoshi and Switzer families, woff2 and otf formats) |
| `guides/` | Guide page templates |
| `images/` | Site images including editorial photography, logos, and icons |
| `next/` | In-progress next version of the site |

Top-level files:

| Path | Description |
| --- | --- |
| `index.html` | Site homepage |
| `about.html` | About page |
| `areas.html` | Areas overview page |
| `card.html` | Digital contact card |
| `contact.html` | Contact page |
| `faq.html` | Frequently asked questions page |
| `fees.html` | Fees and pricing page |
| `404.html` | Custom 404 error page |
| `Aurea-Owner-Agreement.html` | Property owner agreement document |
| `Aurea-Owner-Appointment-Form.html` | Owner appointment form |
| `app.js` | Main client-side JavaScript |
| `data.js` | Site content data |
| `ed-home.js` | Homepage editor script |
| `lucide.js` | Bundled Lucide icon library |
| `_headers` | CDN response header rules |
| `_redirects` | URL redirect rules |
| `llms.txt` | Machine-readable site summary for LLM crawlers |
| `aurea-noah.vcf` | vCard contact file |
| `AUDIT.md` | Site and content audit notes |
| `AUDIT-2026-04-22.md` | Dated audit snapshot |
| `CMS-AUDIT.md` | CMS audit notes |
| `BRAND.md` | Brand guidelines |
| `SECURITY-AUDIT.md` | Security audit notes |
| `f961de789f114dc2b5023ab71e09cc0d.txt` | Domain verification file |
| `.gitignore` | Git ignore rules |
| `README.md` | This file |

## Build / serve

No build or serve tooling is currently configured in this repository.

The site is a collection of static HTML, CSS, and JavaScript files served directly. To preview locally, open `index.html` in a browser or use any static file server of your choice.

## Status

This territory is in draft-stage maintenance. Current work is hygiene-only: audit records, minor content corrections, and documentation updates. No new features are in active development.
