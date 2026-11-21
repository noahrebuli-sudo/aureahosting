# aureahosting

## Overview

This repository holds the development and production assets for the Aurea Hosting website project (aureahosting.com.au). It contains the full static site source, brand and style references, audit records, and owner-facing form documents. The site is a static HTML/CSS/JS project with no build step; files are deployed directly to Cloudflare Pages.

## Repository contents

- `next/` - Current production site served by Cloudflare Pages (the live build directory since the 17 November 2026 cutover). Contains all HTML pages, stylesheets, scripts, images, fonts, and Cloudflare config files.
- `areas/` - Legacy area-specific HTML pages from the pre-cutover site root (Brighton, CBD, Glenelg, Norwood, Prospect, Stirling).
- `assets/` - Legacy web font files (Satoshi and Switzer in WOFF2 and OTF formats) from before the cutover.
- `images/` - Photography and brand image assets used by the legacy site root (logos, editorial photography, area images).
- `BRAND.md` - Brand system reference covering colours, typography, spacing, component specs, and tone-of-voice guidelines.
- `AUDIT.md`, `AUDIT-2026-04-22.md`, `CMS-AUDIT.md`, `SECURITY-AUDIT.md` - Site audit documents recording content, CMS, and security-headers reviews.
- `Aurea-Owner-Agreement.html`, `Aurea-Owner-Appointment-Form.html` - Owner-facing legal and appointment form documents.
- `_redirects`, `_headers` - Cloudflare Pages routing and HTTP security-headers configuration for the legacy site root.

## Setup / local development

No build step is required. The site is plain HTML, CSS, and JavaScript. Open any `.html` file directly in a browser, or serve the `next/` directory with any static file server.

## Deployment

The site is deployed on Cloudflare Pages. Since 17 November 2026 the Pages build output directory is `next/`. Further deployment configuration and account details are managed outside this repository and are not documented here.
