# Aurea Hosting — Full Site Audit

**Date:** 21 April 2026  
**Auditor:** Claude Code  
**Scope:** 35 files — 11 HTML pages, 1 CSS, 2 JS, 3 config, 13+ images, legal docs  
**Status:** Read-only audit. No files were modified.

---

## 1. PROJECT OVERVIEW

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Pages | Vanilla HTML5 (no framework, no SSG) |
| Styles | Single CSS file (`styles.css`, ~5 000 lines) with CSS custom properties |
| Interactivity | Vanilla ES6+ JavaScript (`app.js`, `cms.js`) |
| Icons | Lucide via unpkg CDN (`@latest` — unpinned) |
| Fonts | Fontshare CDN — Satoshi (body) + Switzer (headings) |
| Map | MapLibre GL `4.1.2` + OpenFreeMap tiles |
| Form backend | Formspree (`f/xkopyjkj`) |
| Analytics | Cloudflare Web Analytics (cookie-free, mentioned in privacy policy only) |
| Hosting | Cloudflare (stated in privacy policy; no `netlify.toml` / `vercel.json` / `wrangler.toml` found) |

### File & Folder Structure

```
/
├── index.html                       Homepage (split hero + revenue calculator)
├── contact.html                     Application form
├── faq.html                         Accordion FAQ
├── services.html                    Five service disciplines
├── technology.html                  Guesty + 50-channel pitch
├── why-us.html                      Competitor comparison table
├── areas.html                       MapLibre map + yield table
├── privacy.html                     Privacy policy (APPs compliant)
├── admin.html                       CMS admin UI (noindex)
├── Aurea-Owner-Agreement.html       Legal contract (noindex via robots.txt)
├── Aurea-Owner-Appointment-Form.html Printable form (noindex via robots.txt)
├── styles.css                       Full design system
├── app.js                           Interactions, calculator, animations
├── cms.js                           Content defaults + CMS render logic
├── robots.txt
├── sitemap.xml
├── README.md
└── images/
    ├── favicon.svg / favicon-32.png / favicon-192.png
    ├── favicon-322.png / favicon-1922.png  ← suspicious duplicates
    ├── favicon2.svg                         ← appears unused
    ├── apple-touch-icon.png / apple-touch-icon2.png
    ├── adelaide-aerial.jpg                  (hero background)
    ├── area-beachside.jpg / area-city.jpg / area-hills.jpg
    ├── coverage-beach.jpg / coverage-city.jpg / coverage-hills.jpg
    └── test.txt                             ← dev artifact, should be deleted
```

### Deployment

No deployment config file exists in the repo (`netlify.toml`, `vercel.json`, `wrangler.toml`, `.github/workflows/` are all absent). Deployment appears to be manual or handled entirely by the hosting provider dashboard. No CI/CD pipeline is configured.

### Environment Variables / Secrets

No `.env` or `.env.example` file exists. The site has no server-side runtime, so there are no server-side secrets. The only quasi-sensitive value is the Formspree endpoint ID (`xkopyjkj`), which is **hardcoded in plain sight** in `contact.html` — see Security section.

---

## 2. DESIGN & UX AUDIT

### Design System

The CSS file implements a thorough, self-contained design system via custom properties:

**Colour tokens**

| Token | Value | Role |
|-------|-------|------|
| `--sand` | `#fffdf9` | Page background |
| `--sand-mid` | `#f5f2eb` | Secondary background |
| `--sand-deep` | `#ede9df` | Tertiary / card bg |
| `--ink` | `#172226` | Body text |
| `--ink-light` | `#3a4a50` | Secondary text |
| `--muted` | `#7a8a8f` | De-emphasised text |
| `--gold` | `#c8a35d` | Primary CTA / accent |
| `--teal` | `#1b7f74` | Brand primary |
| `--teal-deep` | `#14605a` | Hover states |
| `--positive` | `#27ae60` | Success states |
| `--error` | `#c0392b` | Error states |

**Typography** uses `clamp()`-based fluid sizing from `--text-xs` through `--text-hero`. Satoshi (body) and Switzer (headings) are premium typefaces that convey trust and premium positioning well.

**Spacing** follows a consistent 4 px base scale (`--space-1` through `--space-32`).

**Components** are clearly named and reusable: `.btn`, `.card`, `.chip`, `.faq-item`, `.comparison-table`, `.form-group`, `.grid-2/3/4`, etc.

### Consistency

Navigation, footer, colour palette, and button styles are consistent across all 7 public pages. The CMS data-binding system (`data-content` attributes) ensures copy is centralised — a strong choice for a one-person operation.

Minor inconsistency: the homepage hero uses a full-bleed split layout unique to that page, while all other pages use a narrower `.hero-standard` pattern. This is intentional and appropriate.

### Mobile Responsiveness

- Fixed header collapses to hamburger below 820 px.
- Grids stack to single column on mobile.
- Hero splits vertically (image becomes full-width background with reduced opacity).
- Button sizes and form inputs are touch-friendly (≥44 px targets).
- `100svh` used for hero height (correct for mobile browsers).
- **Gap:** No `srcset` or `<picture>` elements — all images load at desktop resolution on mobile, which wastes bandwidth on phones.

### Accessibility

**Strengths**
- Correct `<nav>`, `<main>`, `<footer>`, `<button>` semantics throughout.
- Every content image has a descriptive `alt` attribute; decorative SVGs use `aria-hidden="true"`.
- Form inputs have associated `<label>` elements.
- Map container has `aria-label`.
- Demand indicator dots expose `aria-label="X out of 5"`.
- FAQ accordion uses `<button aria-expanded>` and `aria-hidden` on answer panels — correct pattern.
- Mobile nav updates `aria-expanded` on hamburger toggle and closes on ESC.

**Issues**

| Severity | Issue |
|----------|-------|
| Medium | No **skip-to-main-content** link — keyboard users must tab through the full nav on every page |
| Medium | Contact form uses `novalidate` with no `aria-live` error region — screen readers get no feedback on validation failures |
| Medium | Intel ticker loops continuously with no `prefers-reduced-motion` media query |
| Low | Parallax scrolling effect has no `prefers-reduced-motion` guard |
| Low | No Open Graph image (`og:image`) — not accessibility per se, but a gap in social sharing |
| Low | `favicon-322.png` and `favicon-1922.png` appear to be naming artifacts (likely `32` and `192` with a trailing `2`) — harmless but confusing |

**Estimated WCAG 2.1 Level AA compliance: ~88–90%.** All critical path functionality is accessible; gaps are in motion, error feedback, and keyboard navigation shortcuts.

### Visual Hierarchy & Information Architecture

The IA is clean and logical:

```
Homepage → Revenue Calculator (anchor) → Apply
Services → Why Us → Technology → Areas → FAQ → Apply
```

Each page has one H1, logical H2 sections, and H3 sub-items. The homepage hero passes a rough 5-second test (see Conversion section). The revenue calculator is well-placed — it converts curiosity into a personalised number before asking for commitment.

One structural risk: the nav has 7 items (Home + 6 pages). On mobile this is manageable, but on desktop a user landing mid-funnel may feel overwhelmed by choices. Consider grouping "Services / Technology / Why Us" under a single dropdown to reduce cognitive load.

---

## 3. CONVERSION & PSYCHOLOGY AUDIT

### 5-Second Value Proposition Test

**H1:** "We manage fewer properties. On purpose."  
**Sub-copy (CMS default):** Implies exclusivity + quality focus.  
**Primary CTA:** "Get your property's number" (scrolls to calculator)

**Assessment:** The headline passes the differentiation test — it immediately signals a premium, curated approach that contrasts with volume-based agencies. The secondary message about Adelaide specificity reinforces local authority. A first-time visitor can grasp the core proposition within 5 seconds. ✓

**Risk:** The headline is clever but slightly abstract for owners who don't yet know why fewer = better. The subheadline must do extra work to close that gap. If the subheadline copy is weak in the CMS, the H1 loses its punch.

### CTA Placement & Wording

| CTA | Location | Assessment |
|-----|----------|-----------|
| "Get your property's number" | Hero, above fold | Strong — outcome-focused, low friction (just scroll) ✓ |
| "Apply for asset management" | Hero, below primary | Clear but "asset management" is agency jargon; consider "Apply to work with us" |
| "Estimate your revenue below" | Hero text link | Good directional nudge ✓ |
| "Get your full property analysis" | Calculator card | Good — connects calculator output to deeper commitment ✓ |
| "Apply for asset management" | Every page bottom | Consistent reinforcement ✓ |
| "Submit my application" | Contact form | Functional but generic; "Send my application" feels warmer |

**Friction audit on the contact form:** 9 fields including optional ones. The key required fields (name, email) are first — good. The optional fields (phone, suburb, description) add context but some owners may abandon if the form feels long. Consider marking required fields more prominently and collapsing optional fields behind a disclosure.

### Social Proof

**Present:**
- Performance statistics on homepage (`data-counter` animated numbers — occupancy rate, review score, etc.)
- Testimonials section (3 owner results, sourced from CMS defaults)
- Comparison table (why-us.html) positions Aurea against "Generic Agency"
- Intel ticker showing upcoming Adelaide events (signals local knowledge / authority)

**Missing / Weak:**
- Testimonials are CMS placeholders — no names, no photos, no property addresses, no third-party verification. Until real testimonials are live, these carry near-zero credibility weight.
- No star ratings or review counts from Airbnb/Google.
- No "As seen in" media logos.
- No case study pages (e.g., "This Glenelg 2BR went from $2 100/month to $4 400/month").
- No trust badges (ABN displayed in legal docs but not on public pages).

### Cognitive Load

Overall cognitive load is well-managed. The site is long-scroll within pages, but each section has a single focus. The calculator is an excellent cognitive shortcut — it replaces abstract percentages with a concrete dollar figure personal to the visitor.

**Potential overload:**
- `why-us.html` comparison table + 3 edge cards + "best fit" list is a lot of content. Consider splitting the page or making the table the hero rather than one of three content blocks.
- 7 nav items (as noted above).

### Cialdini Persuasion Principles

| Principle | Present? | Notes |
|-----------|---------|-------|
| **Social proof** | Partial | Testimonials present but lack authenticity signals (no photo, name, source) |
| **Authority** | Partial | Guesty technology, 50+ channels, performance stats help; no media mentions or industry affiliations |
| **Scarcity** | Weak | "We manage fewer properties. On purpose." implies limited capacity but never makes it explicit or time-bound |
| **Liking** | Weak | Brand voice is confident but slightly distant; no founder story, photo, or personal touch |
| **Commitment** | Good | The calculator creates micro-commitment before the full form; FAQ handles objections in advance |
| **Reciprocity** | Missing | No free lead magnet (e.g., "Download our Adelaide Short-Stay Market Report") |
| **Unity** | Weak | Targets Adelaide owners but no "Adelaide-built-for-Adelaide" narrative woven through all copy |

**Top conversion gap:** Scarcity and reciprocity are completely absent. A simple "Currently accepting 3 new properties in Glenelg" badge or a downloadable suburb yield report would meaningfully lift conversion.

---

## 4. SEO AUDIT

### Meta Tags

| Page | Title | Description | Canonical | OG tags |
|------|-------|-------------|-----------|---------|
| index.html | "Airbnb Management Adelaide \| Aurea Hosting" | Present, on-topic | ✓ | Present (no og:image) |
| contact.html | "Apply — Aurea Hosting" | Present | ✓ | Present (no og:image) |
| faq.html | Present | Present | ✓ | Present (no og:image) |
| areas.html | Present | Present | ✓ | Present (no og:image) |
| services.html | Present | Present | ✓ | Present (no og:image) |
| technology.html | Present | Present | ✓ | Present (no og:image) |
| why-us.html | Present | Present | ✓ | Present (no og:image) |
| privacy.html | Present | Present | ✓ | Present |
| admin.html | — | — | — | noindex ✓ |

**Universal gap:** `og:image` is missing on every page. When any page is shared on Facebook, LinkedIn, WhatsApp, iMessage, etc., no preview image appears — a significant missed opportunity for social referrals.

### Heading Hierarchy

All public pages have exactly one `<h1>`. Heading nesting (`h1 → h2 → h3`) is correct throughout. No heading levels are skipped. ✓

### Schema.org Structured Data

**None present.** This is the single largest SEO gap on the site. The following schemas would have immediate impact:

- `Organization` — name, URL, logo, contact, social links
- `LocalBusiness` (subtype `ProfessionalService`) — address, geo, phone, opening hours, areaServed
- `Service` — for each of the five service disciplines
- `FAQPage` — for `faq.html` (Google shows FAQ rich results directly in SERPs)
- `AggregateRating` — once real reviews exist, this adds star ratings in SERPs

### Image Optimisation

- All content images have descriptive `alt` text. ✓
- **No `srcset` or `<picture>` elements** — images load at full desktop resolution on all devices.
- **No WebP or AVIF variants** — JPEG only for all photography.
- External Unsplash hero image uses query params (`?w=1200&q=85`) for basic size control but is still served as JPEG.
- No `loading="lazy"` audit was possible without running the page, but `aspect-ratio` CSS is used which helps prevent layout shift.

### Internal Linking

Navigation links are consistent across all pages. Each page links to `contact.html` at minimum via the CTA. `areas.html` links back to the homepage. Coverage is adequate for a 7-page site, but there are no contextual inline links between related pages (e.g., the services page never links to the technology page inline, only via nav).

### robots.txt & sitemap.xml

**robots.txt:**
```
User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /Aurea-Owner-Agreement.html
Disallow: /Aurea-Owner-Appointment-Form.html
Sitemap: https://aureahosting.com.au/sitemap.xml
```
Correctly configured. ✓

**sitemap.xml:** 7 public URLs with priorities (homepage `1.0`, contact `0.9`, others `0.7–0.8`). Last-modified dates all set to `2026-04-07`. ✓

### Page Speed Indicators

**Risks:**
- Lucide is loaded from `unpkg.com/lucide@latest` — `@latest` resolves to a different hash on every CDN edge node and cannot be cached. Pin to a specific version.
- No build/minification pipeline — CSS is ~5 000 lines served uncompressed. A minifier would cut this 30–40%.
- Fonts loaded from external CDN (Fontshare) with `font-display` not explicitly set in CSS — potential FOUT/layout shift.
- MapLibre GL (~1 MB minified) is only needed on `areas.html` but the `<link>` preload is not present — it loads on demand which is correct, but consider a resource hint.
- No service worker / cache manifest — repeat visitors re-download all assets.

**Strengths:**
- `app.js` and `cms.js` are deferred (loaded at end of `<body>`).
- Lucide and MapLibre are loaded at end of `<body>` / `defer`.
- Fontshare uses `rel="preconnect"` hint. ✓

### URL Structure

All URLs are clean and descriptive (`/services.html`, `/areas.html`, `/faq.html`). The `.html` extension is standard for a static site and acceptable for SEO, though extension-less URLs (`/services`, `/areas`) are marginally preferred by convention and require server-side rewriting.

---

## 5. CODE QUALITY & SECURITY

### Hardcoded Secrets / Credentials

| Item | Location | Risk | Action |
|------|----------|------|--------|
| Formspree form ID `xkopyjkj` | `contact.html` inline `<script>` | **Medium** — allows automated spam submissions; anyone can POST to this endpoint | Add honeypot field + consider Formspree's spam filter settings or switch to a server-side handler |
| Email `noah@aureahosting.com.au` | All pages (CMS defaults + footer) | Low — intentionally public | None required |
| Phone `0404 608 196` | All pages | Low — intentionally public | None required |
| ABN `15 669 346 246` | Legal docs | Low — public company info | None required |

**No passwords, API keys for paid services, or database credentials were found.** ✓

### XSS Risk

`cms.js` uses `innerHTML` assignment in several render functions (`renderIntelStrip`, `renderPerfStats`, `renderHomepage`, etc.). The data originates from the CMS defaults object — which only a site operator can modify — so the risk is very low in the current architecture. However, the `importJSON()` function in the admin interface accepts external JSON with no sanitisation. If the admin interface were ever exposed or the JSON import feature were accessible to an attacker, arbitrary HTML could be injected. **Recommendation:** Sanitise values before assigning via `innerHTML`, or switch to `textContent` wherever rich HTML is not required.

### Dependency Vulnerabilities

No `package.json` exists — there is no Node.js build pipeline and no npm dependencies to audit. All third-party libraries are loaded via CDN:

| Library | Version | Pinned? | Known issues |
|---------|---------|---------|-------------|
| Lucide | `@latest` | ✗ | Unpinned — could change without notice |
| MapLibre GL | `4.1.2` | ✓ | No known critical CVEs at audit date |
| Fontshare | CDN | N/A | Font CDN, no JS execution risk |

**Action:** Pin Lucide to a specific semver (e.g., `@0.469.0`). Add Subresource Integrity (SRI) hashes to critical `<script>` and `<link>` tags.

### Dead Code / Unused Files

- `images/test.txt` — dev artifact, no purpose.
- `images/favicon-322.png` and `images/favicon-1922.png` — appear to be typo-named duplicates of `favicon-32.png` and `favicon-192.png`. Verify and remove if unused.
- `images/favicon2.svg` and `images/apple-touch-icon2.png` — appear to be alternates not referenced in any `<head>`. Verify and remove.

### Error Handling

- The contact form `fetch()` call wraps in `try/catch` and shows a user-facing error message on failure. ✓
- The revenue calculator has no error handling — if `AUREA_REVENUE_DATA` is malformed or a suburb key is missing, the UI silently breaks.
- MapLibre map initialisation has no error fallback — if the tile server is unavailable, `areas.html` shows a blank box with no message.
- No global `window.onerror` or `unhandledrejection` handler — errors are invisible in production.

### Admin Interface Security

`admin.html` has no authentication. It relies entirely on URL obscurity. While `robots.txt` correctly disallows it from crawlers, the URL is trivially guessable. **Recommendation:** Protect with HTTP Basic Auth at the server level (Cloudflare Access is free and integrates natively), or move to a proper headless CMS.

---

## 6. PRIORITISED ACTION LIST

### Quick Wins (< 15 minutes each)

1. **Add `og:image` to all pages** — Create a single 1200 × 630 px social preview image, add `<meta property="og:image" content="https://aureahosting.com.au/images/og-cover.jpg">` to every page's `<head>`. Immediate uplift on every social share.

2. **Delete dev artifacts** — Remove `images/test.txt`. Verify `favicon-322.png`, `favicon-1922.png`, `favicon2.svg`, `apple-touch-icon2.png` are unused and delete them.

3. **Pin Lucide to a specific version** — Change `unpkg.com/lucide@latest` to `unpkg.com/lucide@0.469.0` (or latest stable) in every page. Prevents silent breakage.

4. **Add `loading="lazy"` to below-fold images** — `area-*.jpg`, `coverage-*.jpg` cards are well below the fold. Add `loading="lazy"` to prevent them from blocking initial page load.

5. **Add `prefers-reduced-motion` guard to the intel ticker and parallax** — Two lines of CSS:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .intel-strip { animation: none; }
     .parallax-bg { transform: none !important; }
   }
   ```

6. **Add `font-display: swap`** — In the Fontshare `<link>` URL, append `&display=swap` if not already present, so heading text renders immediately in a fallback font instead of being invisible during font load.

7. **Add a honeypot field to the contact form** — A hidden `<input name="_gotcha" style="display:none">` is supported natively by Formspree and eliminates the majority of bot submissions with zero UX impact.

8. **Update sitemap `lastmod` dates** — Currently all set to `2026-04-07`. Set them to today so Google reprocesses the pages promptly.

---

### Medium Fixes (< 1 hour each)

9. **Add JSON-LD `FAQPage` schema to `faq.html`** — Google shows FAQ rich results directly in the SERP. This is the fastest schema win on the site. Template:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     "mainEntity": [
       { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
     ]
   }
   </script>
   ```

10. **Add `LocalBusiness` + `Organization` JSON-LD to `index.html`** — Tells Google about the business name, location, phone, service area, and logo. Generates a Knowledge Panel entry and improves local map pack rankings.

11. **Add a skip-to-main-content link** — Add as the first element in `<body>` on every page:
    ```html
    <a href="#main-content" class="skip-link">Skip to main content</a>
    ```
    Add `id="main-content"` to `<main>`, and add `.skip-link` CSS (visually hidden until focused). Fixes a WCAG 2.1 AA failure for keyboard users.

12. **Add `aria-live="polite"` error region to contact form** — Add a `<div role="alert" aria-live="polite" id="form-errors"></div>` and populate it with validation messages. Screen readers currently receive no feedback on form errors.

13. **Convert area/coverage images to WebP with JPEG fallback** — Use `<picture>` element:
    ```html
    <picture>
      <source srcset="images/area-city.webp" type="image/webp">
      <img src="images/area-city.jpg" alt="...">
    </picture>
    ```
    WebP reduces file size ~30% with no visible quality loss.

14. **Implement HTTP security headers** — Configure at the Cloudflare level (Rules → Transform Rules → Modify Response Header, or via a `_headers` file if using Cloudflare Pages):
    ```
    Content-Security-Policy: default-src 'self'; script-src 'self' unpkg.com; ...
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: camera=(), microphone=(), geolocation=()
    ```

15. **Protect the admin interface with Cloudflare Access** — Enable Cloudflare Zero Trust → Access → Applications, add `aureahosting.com.au/admin.html`, restrict to your email. Takes ~10 minutes and provides proper authentication at zero cost.

16. **Add real testimonials with attribution** — Replace the three CMS placeholder testimonials with real owner quotes, suburb + property type (no full name needed for privacy), and ideally a before/after revenue figure. This is the single highest-impact conversion change on the site.

---

### Larger Improvements (multi-hour projects)

17. **Add `Service` schema to `services.html`** — Each of the five service disciplines marked up with `@type: Service`, `provider`, `areaServed`, and `description` gives Google rich context for ranking on service-specific queries.

18. **Add `AggregateRating` schema** — Once 5+ verifiable reviews exist (Google Business Profile is the fastest source), add the schema to `index.html`. Star ratings in SERPs increase CTR by ~20–35%.

19. **Create a build pipeline (Vite or esbuild)** — Even a simple setup would provide: CSS minification (~40% file-size reduction), JS bundling and tree-shaking, automatic cache-busting via content-hash filenames, and local dev server with hot reload. Estimated impact: 300–500 ms improvement in Time to Interactive on 4G.

20. **Implement responsive images with `srcset`** — Generate 400 w, 800 w, and 1200 w variants of all photography. Add `srcset` and `sizes` attributes. On mobile, the browser will then load the 400 w variant instead of the full desktop image — meaningful bandwidth saving for mobile visitors (likely the majority).

21. **Build a free lead magnet — Adelaide Short-Stay Yield Report** — A one-page PDF showing actual nightly rate ranges, seasonal uplift, and event premiums by suburb cluster (the data already exists in `cms.js`). Gate it with an email opt-in form. This activates the missing **Reciprocity** principle and builds an owner email list for nurture sequences.

22. **Add explicit scarcity mechanism** — A small badge or section copy stating "Currently accepting applications for [N] properties in [suburb]" would activate Cialdini's scarcity principle without being dishonest. Update it as capacity fills. This requires CMS support (easy to add) and discipline to keep it accurate.

23. **Create a case study page** — One or two detailed before/after stories for real properties (with owner permission). Include actual revenue figures, occupancy rates, and review scores pre- and post-management. This is the highest-credibility social proof format and directly addresses the primary objection ("will this actually work for my property?").

24. **Minify and self-host Lucide icons** — Rather than loading the full Lucide library (~200 KB) from a CDN, extract only the icons actually used and inline them as SVGs or bundle them via the build pipeline. Estimated saving: 150–180 KB per page.

25. **Add a `_headers` file for Cloudflare Pages caching rules** — If deploying via Cloudflare Pages, a `_headers` file in the repo root lets you set `Cache-Control` per path:
    ```
    /images/*
      Cache-Control: public, max-age=31536000, immutable
    /*.css
      Cache-Control: public, max-age=2592000
    /*.html
      Cache-Control: public, max-age=0, must-revalidate
    ```
    This dramatically improves repeat-visit performance.

---

## Summary Scorecard

| Area | Score | Top Gap |
|------|-------|---------|
| Design & UX | 8/10 | No skip link; no `prefers-reduced-motion` |
| Mobile | 7/10 | No `srcset`; images load at desktop size on phones |
| Accessibility | 7/10 | Skip link, form error feedback, motion |
| Conversion | 6/10 | Placeholder testimonials, no scarcity, no reciprocity hook |
| SEO | 6/10 | No schema.org, no `og:image`, no FAQPage rich result |
| Code Quality | 8/10 | No build pipeline, `@latest` CDN pin |
| Security | 7/10 | Formspree ID exposed, admin has no auth |
| Performance | 6/10 | No minification, no WebP, no service worker |

**Overall: 6.9/10** — A well-crafted, professional site with strong fundamentals that is leaving meaningful conversion and search ranking on the table through a cluster of medium-priority gaps, all of which are fixable.
