# aureahosting

## Overview

This repository holds the development and hosting assets for AUREA, a founder-led short-stay property management business operating in Adelaide, South Australia. It contains the full public website (HTML pages, JavaScript, images, and fonts), owner-facing legal documents, internal audit records, and brand reference documentation used to maintain consistency across printed and digital materials.

## Repository structure

- `index.html` - Homepage: Airbnb Management Adelaide | Aurea Hosting
- `about.html` - About page: Founder-Led Short-Stay Management in Adelaide
- `areas.html` - Areas overview: Which Adelaide Suburbs Aurea Manages
- `contact.html` - Contact/apply page: Apply for Airbnb Property Management
- `fees.html` - Fees page: What Aurea Hosting Costs
- `faq.html` - FAQ page: Short Stay Management FAQ Adelaide
- `services.html` - Services page: Airbnb Management Services Adelaide
- `why-us.html` - Why choose Aurea: Adelaide's Selective Short-Term Rental Manager
- `report.html` - Yield report page: 2026 Adelaide Short-Stay Yield Report
- `privacy.html` - Privacy Policy
- `card.html` - Digital business card: Noah Rebuli, Founder, Aurea Hosting
- `404.html` - Custom 404 error page
- `Aurea-Owner-Agreement.html` - Owner Agreement document
- `Aurea-Owner-Appointment-Form.html` - Owner Appointment Form document
- `areas/` - Per-suburb landing pages (CBD, Brighton, Glenelg, Norwood, Prospect, Stirling)
- `guides/template.html` - Guest guide template with property name placeholder
- `tools/inspection.html` - Internal property inspection tool
- `app.js` - Main site JavaScript (UI interactions and behaviour)
- `data.js` - Site data: events, yield figures, and portfolio constants
- `ed-home.js` - Additional JavaScript for the homepage
- `lucide.js` - Bundled Lucide icon library (static asset)
- `images/` - Site images including logo, hero photos, editorial photography, area images, and Open Graph cover
- `assets/fonts/` - Satoshi and Switzer web font files (woff2 and otf formats)
- `assets/email/` - Email signature images for branded correspondence
- `_headers` - Cloudflare Pages HTTP response headers configuration
- `_redirects` - Cloudflare Pages URL redirect rules
- `robots.txt` - Search engine crawler instructions
- `llms.txt` - Plain-text site summary for language model consumers
- `aurea-noah.vcf` - Founder contact card (vCard format)
- `f961de789f114dc2b5023ab71e09cc0d.txt` - Static verification file

## Key documents

- `AUDIT.md` - Full site audit dated 21 April 2026, covering all HTML pages, JS, config, and images
- `AUDIT-2026-04-22.md` - Internal site audit dated 22 April 2026, full file review
- `CMS-AUDIT.md` - CMS audit comparing `cms.js` data against HTML fallback text (generated 2026-06-03)
- `SECURITY-AUDIT.md` - Security headers audit for the Cloudflare Pages deployment (dated 2026-07-29)
- `BRAND.md` - Brand system reference: colours, typography, and design tokens extracted from source

## Viewing locally

Open any `.html` file directly in a browser, or serve the repository root with any static file server. For example, Python's built-in server works without any installation:

```
python3 -m http.server 8080
```

Then visit `http://localhost:8080` to browse the site. No build step, compilation, or package installation is required.
