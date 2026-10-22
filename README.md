# aureahosting

The public website for AUREA Hosting, an Adelaide-based short-stay property management company. It is a static site built with plain HTML, CSS, and JavaScript - no build tool or framework is required.

## Project structure

### Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage with hero, revenue calculator, and performance statistics |
| `about.html` | About page covering the founder-led story and company background |
| `areas.html` | Adelaide suburbs served, with an interactive map and yield table |
| `contact.html` | Owner application form |
| `faq.html` | Frequently asked questions accordion |
| `fees.html` | Pricing and management fees |
| `report.html` | 2026 Adelaide Short-Stay Yield Report |
| `services.html` | The five service disciplines offered |
| `why-us.html` | Competitor comparison and reasons to choose Aurea |
| `privacy.html` | Privacy policy |
| `card.html` | Founder digital business card |
| `404.html` | Custom 404 error page |
| `Aurea-Owner-Agreement.html` | Legal owner management agreement (not indexed by search engines) |
| `Aurea-Owner-Appointment-Form.html` | Printable owner appointment form (not indexed by search engines) |

Suburb-specific landing pages live under `areas/` (brighton, cbd, glenelg, norwood, prospect, stirling). A guest guide template is at `guides/template.html` and an internal property inspection tool is at `tools/inspection.html`.

### Styles

- `styles.css` - Full design system: colour tokens, typography scale, spacing scale, and all component styles.

### JavaScript

- `app.js` - Site-wide interactions, revenue calculator, animations, and form handling.
- `data.js` - Revenue and suburb data used by the calculator.
- `ed-home.js` - Homepage-specific scripting.
- `lucide.js` - Local copy of the Lucide icon library.

## Documentation

| File | Description |
|------|------------|
| [`AUDIT.md`](AUDIT.md) | Full site audit covering design, UX, conversion, SEO, and code quality (April 2026). |
| [`AUDIT-2026-04-22.md`](AUDIT-2026-04-22.md) | Internal site audit with a detailed review of all project files (April 2026). |
| [`BRAND.md`](BRAND.md) | Brand system reference: colour values, typography, and spacing tokens extracted from `styles.css`. |
| [`CMS-AUDIT.md`](CMS-AUDIT.md) | Audit comparing `cms.js` default content against HTML fallback text across all pages. |
| [`SECURITY-AUDIT.md`](SECURITY-AUDIT.md) | Security headers audit for the Cloudflare Pages deployment. |

## Local development

The site is a collection of static files and requires no build step. To view it locally, either open `index.html` directly in a browser or serve the directory with any static file server, for example:

```
npx serve .
```

Then open `http://localhost:3000` (or the port the server reports).
