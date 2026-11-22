# aureahosting

## Purpose

This territory holds hosting and site development work for AUREA, a short-term rental hosting service based in Adelaide, South Australia. The repository contains the HTML pages, JavaScript, and static assets that make up the public-facing site, together with internal documentation and audit records produced during development.

## Structure

- `index.html` - Main homepage of the AUREA hosting site
- `about.html` - About page for the site
- `areas.html` - Areas and coverage overview page
- `contact.html` - Contact page
- `faq.html` - Frequently asked questions page
- `fees.html` - Fees and pricing information page
- `card.html` - HTML page for a card-style view
- `404.html` - Custom 404 error page
- `Aurea-Owner-Agreement.html` - Owner agreement document page
- `Aurea-Owner-Appointment-Form.html` - Owner appointment form page
- `app.js` - Main site JavaScript, handles DOM interactions on page load
- `data.js` - Shared data constants referenced by site scripts
- `ed-home.js` - Editorial homepage scripts, loaded by index.html only
- `lucide.js` - Bundled Lucide icon library used by site pages
- `_headers` - HTTP response headers configuration for the hosting platform
- `_redirects` - URL redirect rules for the hosting platform
- `llms.txt` - Machine-readable site summary for LLM crawlers
- `aurea-noah.vcf` - vCard contact file for the founder
- `f961de789f114dc2b5023ab71e09cc0d.txt` - Domain or service verification token file
- `.gitignore` - Git ignore rules for the repository
- `BRAND.md` - Brand guidelines and documentation
- `AUDIT.md` - Audit notes and records
- `AUDIT-2026-04-22.md` - Dated audit record from April 2026
- `SECURITY-AUDIT.md` - Security-focused audit notes
- `CMS-AUDIT.md` - CMS-focused audit notes
- `areas/` - Per-area HTML pages covering individual Adelaide suburbs
- `assets/` - Static assets, primarily web fonts in woff2 and otf formats
- `guides/` - Guide pages, including an HTML template
- `images/` - Site images including editorial photos, area images, logos, and icons
- `next/` - A parallel set of site pages under the next/ path

## Maintenance

This territory currently accepts hygiene changes only: documentation updates, test additions, comment improvements, dead-code removal, and error-handling fixes. The following documentation items are deferred and pending a future spec:

- The relationship between the root-level implementation and the `next/` subdirectory, and which is the active one.
- The build and deployment process for the site.
- The `draft_only` grade policy and how contributors should work within it.

Larger feature or structural changes should wait until the deferred documentation is in place.
