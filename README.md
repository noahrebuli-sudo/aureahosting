# aureahosting

## Overview

This repository contains the AUREA hosting territory: the public-facing website, supporting HTML documents, site configuration, and internal documentation for the Aurea Hosting service. It is maintained by the AUREA team and covers all content, assets, and operational reference files for the aureahosting.com.au property.

## Repository layout

### Directories

| Path | Description |
|---|---|
| `areas/` | Area-specific landing pages (Brighton, CBD, Glenelg, Norwood, Prospect, Stirling) |
| `assets/` | Email signature images and locally hosted web font files (Satoshi, Switzer) |
| `guides/` | Guide page templates |
| `images/` | Editorial photography, UI images, logos, and favicon assets |
| `tools/` | Internal tooling pages (e.g. property inspection helper) |

### Top-level files

| File | Description |
|---|---|
| `.gitignore` | Git ignore rules for the repository |
| `404.html` | Custom 404 error page |
| `AUDIT-2026-04-22.md` | Internal site audit conducted 22 April 2026 |
| `AUDIT.md` | Full site audit conducted 21 April 2026 |
| `BRAND.md` | Brand system reference: colours, typography tokens, and usage guidance |
| `CMS-AUDIT.md` | Audit of `cms.js` keys against HTML fallback text |
| `SECURITY-AUDIT.md` | Security headers audit for the Cloudflare Pages deployment |
| `Aurea-Owner-Agreement.html` | Owner agreement document |
| `Aurea-Owner-Appointment-Form.html` | Owner appointment form |
| `README.md` | This file |
| `_headers` | HTTP response header rules for Cloudflare Pages |
| `_redirects` | URL redirect rules |
| `about.html` | About page |
| `app.js` | Main site JavaScript |
| `areas.html` | Areas overview page |
| `aurea-noah.vcf` | Contact vCard file |
| `card.html` | Digital business card page |
| `contact.html` | Contact page |
| `data.js` | Site data definitions |
| `ed-home.js` | Homepage editor script |
| `f961de789f114dc2b5023ab71e09cc0d.txt` | Site verification file |
| `faq.html` | Frequently asked questions page |
| `fees.html` | Fees and pricing page |
| `index.html` | Homepage |
| `llms.txt` | LLM accessibility information |
| `lucide.js` | Locally bundled Lucide icons |
| `privacy.html` | Privacy policy page |
| `report.html` | Yield report page |
| `robots.txt` | Search engine crawler rules |

## Key documentation

- [AUDIT.md](AUDIT.md) - Full site audit (April 2026): tech stack, file structure, and issue log
- [AUDIT-2026-04-22.md](AUDIT-2026-04-22.md) - Internal audit (22 April 2026): executive summary and detailed findings
- [CMS-AUDIT.md](CMS-AUDIT.md) - CMS key coverage audit: wired vs orphaned content keys
- [SECURITY-AUDIT.md](SECURITY-AUDIT.md) - Security headers audit and configuration notes
- [BRAND.md](BRAND.md) - Brand system reference: colour tokens, typography, and asset guidance

## Maintenance notes

Content files were last broadly refreshed on 2026-10-07. This README should be updated whenever content files are refreshed, new pages are added, or top-level files and directories change.
