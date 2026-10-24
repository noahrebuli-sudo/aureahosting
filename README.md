# aureahosting

## Purpose

This territory holds the AUREA hosted production website along with its audit documents, brand reference, and owner guides. It contains all HTML pages, client-side JavaScript, static assets (fonts and images), and supporting configuration files that make up the live site. Audit and compliance documents are co-located here so they stay in step with the site they describe.

## Repository structure

| Path | Description |
|---|---|
| `index.html` | Home page |
| `about.html` | About AUREA page |
| `areas.html` | Service areas overview page |
| `card.html` | Digital business card page |
| `contact.html` | Contact page |
| `faq.html` | Frequently asked questions page |
| `fees.html` | Fees and pricing page |
| `privacy.html` | Privacy policy page |
| `report.html` | Owner yield and performance report page |
| `services.html` | Services page |
| `404.html` | Custom 404 error page |
| `Aurea-Owner-Agreement.html` | Owner management agreement document |
| `Aurea-Owner-Appointment-Form.html` | Owner appointment form document |
| `app.js` | Main site JavaScript |
| `data.js` | Shared site data module |
| `ed-home.js` | Editor home script |
| `lucide.js` | Bundled Lucide icon library |
| `_headers` | HTTP response headers configuration |
| `_redirects` | URL redirect rules |
| `robots.txt` | Search engine crawler instructions |
| `llms.txt` | LLM crawler instructions |
| `aurea-noah.vcf` | Digital vCard for Noah |
| `f961de789f114dc2b5023ab71e09cc0d.txt` | Domain or service verification file |
| `.gitignore` | Git ignore rules |
| `AUDIT.md` | General site audit document |
| `AUDIT-2026-04-22.md` | Dated site audit (April 2026) |
| `CMS-AUDIT.md` | CMS audit document |
| `SECURITY-AUDIT.md` | Security audit document |
| `BRAND.md` | Brand guidelines reference |
| `areas/` | Per-suburb landing pages (brighton, cbd, glenelg, norwood, prospect, stirling) |
| `assets/` | Static assets - web fonts and email signature images |
| `guides/` | Owner and guest guide templates |
| `images/` | Site imagery - logos, hero photos, area photos, and editorial images |

## Contents overview

**Production site files.** The root HTML pages together with `app.js`, `data.js`, `ed-home.js`, and `lucide.js` form the complete static site. `_headers` and `_redirects` supply hosting-platform configuration, and `robots.txt` and `llms.txt` govern crawler access.

**Area pages.** The `areas/` directory contains one HTML page per service suburb (Brighton, CBD, Glenelg, Norwood, Prospect, Stirling), each linked from the main `areas.html` overview.

**Owner documents.** `Aurea-Owner-Agreement.html` and `Aurea-Owner-Appointment-Form.html` are formal documents presented to property owners. `guides/template.html` is the base template for owner and guest guides.

**Audit and brand documents.** `AUDIT.md`, `AUDIT-2026-04-22.md`, `CMS-AUDIT.md`, and `SECURITY-AUDIT.md` record ongoing site reviews. `BRAND.md` documents brand standards applied across the site.

**Assets.** `assets/fonts/` holds the Satoshi and Switzer typeface families in woff2 and otf formats. `assets/email/` holds email signature images. `images/` contains all site photography, logos, icons, and Open Graph cover images including the `images/editorial/` set of hero and collage shots.

**Miscellaneous.** `aurea-noah.vcf` is a vCard for sharing contact details. `f961de789f114dc2b5023ab71e09cc0d.txt` is a verification file used by a third-party service.

