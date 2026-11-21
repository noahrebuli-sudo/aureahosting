# aureahosting

## Overview

This repository holds the development and production assets for the AUREA website and hosting project. It contains the live site source (vanilla HTML, CSS, and JavaScript), a staging area for the next iteration of the site, editorial and brand assets, owner-facing legal and form documents, and a set of audit records produced during the project lifecycle.

## Repository contents

- **Root HTML pages** (`index.html`, `about.html`, `contact.html`, `faq.html`, `fees.html`, `areas.html`, etc.) - the production website pages served directly as static files
- **`areas/`** - individual suburb/area pages (Brighton, CBD, Glenelg, Norwood, Prospect, Stirling)
- **`next/`** - a staging build of the next site iteration, with updated assets, additional pages, and a revised CSS/JS bundle
- **`assets/`** - shared web fonts (Satoshi, Switzer) used across the site
- **`images/`** - site imagery including editorial photos, area thumbnails, logo files, and Open Graph covers
- **`guides/`** - HTML guide templates
- **`BRAND.md`** - brand system reference covering colours, typography, and logo usage
- **`AUDIT.md`, `AUDIT-2026-04-22.md`, `CMS-AUDIT.md`, `SECURITY-AUDIT.md`** - site audit records covering file structure, accessibility, CMS, and security findings
- **`Aurea-Owner-Agreement.html`, `Aurea-Owner-Appointment-Form.html`** - owner-facing legal and onboarding form documents
- **`_redirects`, `_headers`** - static hosting configuration files for routing and HTTP headers
- **`app.js`, `data.js`, `ed-home.js`, `lucide.js`** - site JavaScript: interactivity, data, and icon library

## Setup / local development

This project is a static site with no build step. Open any HTML file directly in a browser, or serve the repository root with any static file server. No package manager or compilation step is required.

## Deployment

No deployment documentation exists in this repository. Deployment is managed outside this repository and is not documented here.
