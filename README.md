# Aurea Hosting

This is the production website for Aurea Hosting, an Adelaide short-stay property management business. The site is built as a static site with no framework, no static site generator, and no build pipeline.

## Tech stack

- **Pages:** Vanilla HTML5, one page per file
- **Styles:** A single `styles.css` design system built with CSS custom properties (approximately 5,000 lines)
- **JavaScript:** Vanilla ES6+ in `app.js` (interactions, calculator, animations) and `cms.js` (content defaults and CMS render logic)
- **Icons:** Lucide via unpkg CDN
- **Fonts:** Fontshare CDN - Satoshi for body text and Switzer for headings
- **Map:** MapLibre GL 4.1.2 with OpenFreeMap tiles, used on `areas.html`
- **Form backend:** Formspree
- **Hosting and analytics:** Cloudflare

## Structure

```
/
├── index.html                        Homepage (split hero + revenue calculator)
├── contact.html                      Application form
├── faq.html                          Accordion FAQ
├── services.html                     Five service disciplines
├── technology.html                   Guesty + 50-channel pitch
├── why-us.html                       Competitor comparison table
├── areas.html                        MapLibre map + yield table
├── privacy.html                      Privacy policy (APPs compliant)
├── admin.html                        CMS admin UI (noindex)
├── Aurea-Owner-Agreement.html        Legal contract (noindex via robots.txt)
├── Aurea-Owner-Appointment-Form.html Printable form (noindex via robots.txt)
├── styles.css                        Full design system
├── app.js                            Interactions, calculator, animations
├── cms.js                            Content defaults + CMS render logic
├── robots.txt
├── sitemap.xml
└── images/                           Favicons, photography, and brand assets
```

## Development and deployment

There is no `package.json`, no npm dependencies, no CI/CD pipeline, and no deployment config file (`netlify.toml`, `vercel.json`, `wrangler.toml`, or `.github/workflows/`) in the repository. Deployment is manual or handled by the hosting provider. The site can be previewed by opening any HTML file directly in a browser, or by serving the directory with any static file server.
