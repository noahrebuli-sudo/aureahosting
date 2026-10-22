# aureahosting

The marketing and owner-management website for Aurea Hosting, a short-stay (Airbnb) property management service based in Adelaide, South Australia. The site is a static collection of HTML pages with shared CSS and JavaScript and requires no build step.

## Project structure

Top-level HTML pages:

- `index.html` - Home page: Airbnb management Adelaide
- `about.html` - About Aurea: founder-led short-stay management in Adelaide
- `services.html` - Airbnb management services overview
- `fees.html` - Fees and pricing information
- `why-us.html` - Why Aurea: Adelaide's selective short-term rental manager
- `areas.html` - Which Adelaide suburbs Aurea manages
- `faq.html` - Short-stay management FAQ for Adelaide
- `contact.html` - Apply for Airbnb property management
- `report.html` - 2026 Adelaide Short-Stay Yield Report
- `privacy.html` - Privacy policy
- `card.html` - Digital business card for the founder
- `Aurea-Owner-Agreement.html` - Owner agreement document
- `Aurea-Owner-Appointment-Form.html` - Owner appointment form
- `404.html` - Custom 404 page

Area sub-pages (under `areas/`):

- `areas/cbd.html` - Airbnb management Adelaide CBD
- `areas/glenelg.html` - Airbnb management Glenelg
- `areas/brighton.html` - Airbnb management Brighton
- `areas/norwood.html` - Airbnb management Norwood
- `areas/prospect.html` - Airbnb management Prospect
- `areas/stirling.html` - Airbnb management Stirling

Other pages:

- `guides/template.html` - Guest guide template (property-specific, populated at runtime)
- `tools/inspection.html` - Internal Aurea property tool

Styles and scripts:

- `styles.css` - Main stylesheet shared across all pages
- `app.js` - Main site JavaScript
- `data.js` - Site data (properties, areas, etc.)
- `ed-home.js` - Home page enhancements
- `lucide.js` - Bundled Lucide icon library

## Documentation

- `AUDIT.md` - General site audit notes
- `AUDIT-2026-04-22.md` - Site audit dated 22 April 2026
- `SECURITY-AUDIT.md` - Security audit findings
- `CMS-AUDIT.md` - CMS audit notes
- `BRAND.md` - Brand guidelines and visual identity reference

## Local development

This is a fully static site. No build step or dependencies are required.

Open `index.html` directly in a browser, or serve the project root with any static file server you already have available, for example:

```
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.
