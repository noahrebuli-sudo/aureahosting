# Aurea Hosting

A static marketing website for Aurea Hosting, an Adelaide short-term rental (Airbnb) management company. The site is served at aureahosting.com.au.

## Tech stack

| Layer | Technology |
|---|---|
| Pages | Vanilla HTML5 - no framework, no static site generator, no build pipeline, no package.json |
| Styles | Single stylesheet (`styles.css`) |
| Interactivity | Vanilla ES6+ JavaScript - `app.js` for interactions, calculator, and animations; `cms.js` for content defaults and CMS rendering |
| Icons | Lucide via unpkg CDN |
| Fonts | Fontshare - Satoshi (body) and Switzer (headings) |
| Map | MapLibre GL 4.1.2 with OpenFreeMap tiles (used on areas.html) |
| Form backend | Formspree |
| Hosting / analytics | Cloudflare |

## Pages

| File | Role |
|---|---|
| `index.html` | Homepage - split hero and revenue calculator |
| `contact.html` | Application form |
| `faq.html` | Accordion FAQ |
| `services.html` | Five service disciplines |
| `technology.html` | Guesty and 50-channel pitch |
| `why-us.html` | Competitor comparison table |
| `areas.html` | MapLibre map and yield table |
| `privacy.html` | Privacy policy (APPs compliant) |
| `admin.html` | CMS admin UI (noindex) |
| `Aurea-Owner-Agreement.html` | Legal contract (noindex via robots.txt) |
| `Aurea-Owner-Appointment-Form.html` | Printable form (noindex via robots.txt) |

## Repository layout

```
/
├── styles.css          Full design system
├── app.js              Interactions, calculator, animations
├── cms.js              Content defaults and CMS render logic
├── robots.txt
├── sitemap.xml
└── images/             Photography, favicons, and icons
```

## Development

There is no build step. All pages are plain static files that can be opened directly in a browser or served with any static file server.

Deployment has no config file in the repository (no `netlify.toml`, `vercel.json`, or `wrangler.toml`). It is handled externally via the hosting provider dashboard.

## Further documentation

- [AUDIT.md](AUDIT.md) - full site audit, dated 21 April 2026
- [BRAND.md](BRAND.md) - brand system reference: colours, typography, tone of voice
