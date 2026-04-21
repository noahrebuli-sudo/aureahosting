# Aurea Hosting — Brand System Reference

> Extracted from source code. Use this document when creating branded PDFs, Word docs, or slide decks that need to match the website.

---

## 1. Colours

All values are CSS custom properties defined in `styles.css`.

### Surfaces & Neutrals

| Token | Hex | Usage |
|---|---|---|
| `--sand` | `#fffdf9` | Page background (warm off-white) |
| `--sand-mid` | `#f5f2eb` | Alternate section backgrounds |
| `--sand-deep` | `#ede9df` | Cards, input backgrounds |
| `--ink` | `#172226` | Primary text, dark buttons |
| `--ink-light` | `#3a4a50` | Secondary text, subheadings |
| `--muted` | `#7a8a8f` | Meta text, captions, placeholders |
| `--border` | `#e4e0d8` | Dividers, input borders |
| `--white` | `#ffffff` | Contrast surfaces, button labels |

### Brand Colours

| Token | Hex | Usage |
|---|---|---|
| `--gold` | `#c8a35d` | Primary CTA buttons, highlights, key stat accents |
| `--gold-light` | `#f5eddc` | Gold tinted backgrounds, badge fills |
| `--gold-dim` | `rgba(200,163,93, 0.12)` | Subtle gold overlays |
| `--gold-rule` | `rgba(200,163,93, 0.28)` | Decorative horizontal rules |
| `--teal` | `#1b7f74` | Outline buttons, links, interactive elements |
| `--teal-deep` | `#14605a` | Teal hover state |
| `--teal-light` | `#e6f5f2` | Teal tinted chip/badge backgrounds |

### Semantic Colours

| Token | Hex | Usage |
|---|---|---|
| `--positive` | `#27ae60` | Success states, positive metrics |
| `--error` | `#c0392b` | Error states, alerts |

### Colour Hierarchy for Documents

- **Backgrounds:** `#fffdf9` (page), `#f5f2eb` (alternate panels)
- **Body text:** `#172226`
- **Secondary text:** `#3a4a50`
- **Captions/meta:** `#7a8a8f`
- **Primary accent (CTAs, pull quotes):** `#c8a35d`
- **Secondary accent (links, interactive):** `#1b7f74`
- **Borders/rules:** `#e4e0d8`

---

## 2. Typography

### Font Families

Fonts are loaded from **Fontshare** (`https://api.fontshare.com`), not Google Fonts.

```
https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600,700&f[]=satoshi@400,500,600,700&display=swap
```

| Role | Family | Stack |
|---|---|---|
| **Headings** | Switzer | `'Switzer', -apple-system, sans-serif` |
| **Body** | Satoshi | `'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif` |

To use these fonts in other tools:
- **Canva / Figma:** Import via the Fontshare URL above, or download the fonts from [fontshare.com](https://www.fontshare.com).
- **Word / PowerPoint / LibreOffice:** Download Switzer and Satoshi from Fontshare and install locally.
- **PDF engines / LaTeX:** Self-host the WOFF2 files downloaded from Fontshare.

### Available Weights

| Font | Weights Available |
|---|---|
| Switzer | 300, 400, 500, 600, 700 |
| Satoshi | 400, 500, 600, 700 |

### Heading Defaults (from `styles.css`)

| Property | Value |
|---|---|
| Font family | Switzer |
| Font weight | 600 |
| Line height | 1.1 |
| Letter spacing | −0.025em |

### Type Scale (Fluid — using `clamp()`)

All sizes are responsive; values shown are **min → max** across viewport widths.

| Token | Min | Max | Typical use |
|---|---|---|---|
| `--text-hero` | 2.75rem (44px) | 5rem (80px) | Hero headline |
| `--text-4xl` | 2.25rem (36px) | 3.75rem (60px) | Section hero h1 |
| `--text-3xl` | 1.875rem (30px) | 2.75rem (44px) | Section headings (h2) |
| `--text-2xl` | 1.5rem (24px) | 2rem (32px) | Sub-section headings (h3) |
| `--text-xl` | 1.25rem (20px) | 1.5rem (24px) | Card headings, callouts |
| `--text-lg` | 1.0625rem (17px) | 1.25rem (20px) | Lead paragraph |
| `--text-base` | 0.9375rem (15px) | 1.0625rem (17px) | Body copy |
| `--text-sm` | 0.8125rem (13px) | 0.875rem (14px) | Meta, captions |
| `--text-xs` | 0.6875rem (11px) | 0.75rem (12px) | Labels, badges |

**For static documents**, use the **max** values (desktop sizes):

| Element | Size | Weight | Family |
|---|---|---|---|
| Hero / Cover title | 80px / 60pt | 600 | Switzer |
| Section heading (H2) | 44px / 33pt | 600 | Switzer |
| Sub-heading (H3) | 32px / 24pt | 600 | Switzer |
| Card heading (H4) | 24px / 18pt | 600 | Switzer |
| Lead paragraph | 20px / 15pt | 400 | Satoshi |
| Body copy | 17px / 13pt | 400 | Satoshi |
| Caption / Meta | 14px / 10.5pt | 400 | Satoshi |
| Labels / Badges | 12px / 9pt | 500 | Satoshi |

### Body Text

| Property | Value |
|---|---|
| Line height | 1.65 |
| Base size | `--text-base` (~16px) |

---

## 3. Spacing & Layout

### Spacing Scale

| Token | Value | px equiv |
|---|---|---|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-5` | 1.25rem | 20px |
| `--space-6` | 1.5rem | 24px |
| `--space-8` | 2rem | 32px |
| `--space-10` | 2.5rem | 40px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-20` | 5rem | 80px |
| `--space-24` | 6rem | 96px |
| `--space-32` | 8rem | 128px |

Section padding on the website uses `--space-32` (128px top/bottom). For documents, aim for generous white space — cramped layouts are off-brand.

### Layout Containers

| Token | Value | Use |
|---|---|---|
| `--container-max` | 1200px | Standard content width |
| `--container-wide` | 1400px | Wide/hero sections |
| `--container-narrow` | 760px | Long-form text, blog |
| `--header-height` | 72px | Navigation bar |

### Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 10px | Small cards, inputs |
| `--radius-md` | 16px | Standard cards |
| `--radius-lg` | 24px | Large feature cards |
| `--radius-pill` | 999px | Buttons, badges, chips |

All buttons use `--radius-pill` — pills, not rounded-rectangles.

### Shadows

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 2px 8px rgba(23,34,38, 0.05)` | Subtle card lift |
| `--shadow-md` | `0 4px 20px rgba(23,34,38, 0.07)` | Cards, dropdowns |
| `--shadow-lg` | `0 8px 40px rgba(23,34,38, 0.09)` | Modals, overlays |
| `--shadow-xl` | `0 20px 60px rgba(23,34,38, 0.12)` | Hero elements |
| `--shadow-gold` | `0 4px 24px rgba(200,163,93, 0.22)` | Gold CTA buttons |

Shadows are intentionally soft and low-opacity — avoid heavy drop shadows.

### Animation / Easing (reference only)

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

---

## 4. Brand Assets

### Logo & Favicon

All assets live in `images/`:

| File | Size | Use |
|---|---|---|
| `images/favicon.svg` | 126 KB | Primary SVG logo / favicon |
| `images/favicon-32.png` | 2.0 KB | 32×32 favicon |
| `images/favicon-192.png` | 128 KB | Android home screen icon |
| `images/apple-touch-icon.png` | 45 KB | iOS home screen icon (180×180) |

**Use `images/favicon.svg` as the primary logo asset** — it is vector and will scale losslessly to any size.

### Photography

| File | Subject |
|---|---|
| `images/coverage-beach.jpg` | Glenelg beach (386 KB) |
| `images/coverage-city.jpg` | Adelaide city skyline (156 KB) |
| `images/coverage-hills.jpg` | Adelaide Hills landscape (232 KB) |
| `images/area-beachside.jpg` | Beachside coverage area (127 KB) |
| `images/area-city.jpg` | City coverage area (131 KB) |
| `images/area-hills.jpg` | Hills coverage area (150 KB) |
| `images/adelaide-aerial.jpg` | Adelaide aerial view (145 KB) |

**Image style convention:** Real location photography of Adelaide suburbs and landscapes. Warm, natural tones consistent with the sand/gold palette. No stock-photo lifestyle imagery.

### Icon Library

**Lucide Icons** — loaded via CDN:

```
https://unpkg.com/lucide@latest/dist/umd/lucide.js
```

Lucide is an open-source icon set (MIT licence). For offline or print use, icons can be exported as SVG from [lucide.dev](https://lucide.dev). Use stroke-based (outline) icons only — consistent with Lucide's style.

---

## 5. Component Reference

### Buttons

| Variant | Background | Text | Border | Shadow |
|---|---|---|---|---|
| Gold (primary CTA) | `#c8a35d` | `#ffffff` | none | `--shadow-gold` |
| Outline (secondary) | transparent | `#1b7f74` | 1.5px solid `#1b7f74` | none |
| Dark | `#172226` | `#ffffff` | none | none |

- Shape: pill (`border-radius: 999px`)
- Padding: `12px 24px` (default), `16px 40px` (large)
- Font: Satoshi, weight 500–600, `letter-spacing: 0.01em`
- Gold hover: background `#b8924d`, shadow expands

---

## 6. Tone of Voice

### Brand Positioning

> "Adelaide's most selective short-term rental management."
> "We manage fewer properties. On purpose."
> "Most agencies optimise for volume. We optimise for yield."

Aurea Hosting positions itself as a premium, exclusive operator — not competing on price or scale, but on performance and selectivity.

### Voice Characteristics

**Confident, not boastful.** Claims are always backed by specific numbers. Never vague superlatives.
- ✓ "66% average occupancy across all managed properties"
- ✗ "Industry-leading occupancy rates"

**Asset-class language.** Speaks to property owners as investors, not hobbyists.
- Key terms: *yield*, *revenue lift*, *managed asset*, *dynamic pricing*, *occupancy rate*, *performance statement*

**Specific over general.** Suburbs are named, dollar figures are real, timelines are exact.
- "From day one to live listing in 7 days"
- "+$1,100 monthly income within 60 days"
- "<4-minute average guest response time"

**Selective / exclusive.** Limited intake is a feature, not a constraint.
- "We take on a limited number of properties each quarter"
- "Apply to work with us" (not "sign up" or "get started")

**Formal-leaning but not stiff.** No slang, no exclamation marks, no emoji. Complete sentences. Minimal jargon — technical terms are explained where they appear.

**Adelaide-specific.** Local knowledge is core to the brand: event calendar (WOMAdelaide, Fringe, Gather Round, LIV Golf, Tour Down Under, Tasting Australia), suburb names, local pricing benchmarks.

### Recurring Phrases & Terminology

| Phrase | Context |
|---|---|
| "Yield optimisation" | Core service description |
| "Dynamic pricing" | Pricing approach |
| "50+ channels via Guesty" | Distribution reach |
| "Real-time owner dashboard" | Reporting feature |
| "Hotel-grade turnovers" | Cleaning/property service |
| "From overwhelmed to optimised" | Owner transformation narrative |
| "No surprises. No unexplained deductions." | Trust/transparency messaging |
| "Apply to work with us" | CTA (not "sign up") |

### Do / Don't for Copy

| Do | Don't |
|---|---|
| Use exact numbers | Use vague claims ("the best", "industry-leading") |
| Reference Adelaide suburbs and events | Generic location language ("your area") |
| Frame owners as investors | Frame owners as hosts or landlords |
| Use "Apply" for intake CTAs | Use "Sign up" or "Get started" |
| Short, punchy headings | Long sentence headings |
| Past-tense testimonial data | Forward promises without evidence |

---

## 7. Contact & Brand Identity

| Detail | Value |
|---|---|
| Brand name | Aurea Hosting |
| Website | aureahosting.com.au |
| Phone | 0404 608 196 |
| Email | noah@aureahosting.com.au |
| Location | Adelaide, South Australia |
| Copyright line | © 2026 Aurea Hosting |

---

*All values extracted directly from `styles.css` and `index.html`. Last updated from source: 2026-04-21.*
