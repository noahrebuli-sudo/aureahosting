# Aurea Hosting

A static HTML/CSS/JS marketing site for Aurea Hosting (aureahosting.com.au), an Adelaide short-term rental management company. The site is hosted on Cloudflare Pages.

## Tech stack

- Vanilla HTML5 pages - no framework, no build step
- Single `styles.css` for all styles
- Vanilla JS in `app.js` and `data.js`
- Self-hosted Lucide icons (`lucide.js` vendored in the repo root)
- MapLibre GL 4.1.2 via unpkg for the areas map
- Fontshare CDN fonts (Satoshi and Switzer)
- Formspree for the contact form
- MailerLite embed on `report.html`
- GA4, Google Ads, and Meta Pixel analytics
- Cloudflare Pages `_headers` file for security headers

## Structure

**Public pages:** index, services, why-us, technology, areas, faq, contact, privacy, report, card, 404

**Area detail pages** (`areas/`): glenelg, cbd, norwood, brighton, prospect, stirling

**Legal documents** (noindexed): `Aurea-Owner-Agreement.html`, `Aurea-Owner-Appointment-Form.html`

**Other:** `tools/inspection.html`, `guides/template.html`, `images/`

## Development and deployment

There is no build pipeline or `package.json`. Pages are edited directly and deployed via Cloudflare Pages. Branch previews publish at `<branch>.<project>.pages.dev`; the `_headers` file applies to previews as well.

## Audit documents

Four audit files are present in the repo root. They are point-in-time snapshots and not continuously maintained.

| File | Date |
| --- | --- |
| `AUDIT.md` | 2026-04-21 |
| `AUDIT-2026-04-22.md` | 2026-04-22 |
| `CMS-AUDIT.md` | 2026-06-03 |
| `SECURITY-AUDIT.md` | 2026-07-29 |

**Historical note:** the three older audits (`AUDIT.md`, `AUDIT-2026-04-22.md`, `CMS-AUDIT.md`) predate the removal of the CMS (`admin.html` and `cms.js`, deleted in PR #25) and the vendoring of Lucide. Their findings about those components are historical only and do not reflect the current state of the repo.
