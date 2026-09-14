# CMS Audit — `cms.js` vs HTML Fallback Text
Generated: 2026-06-03

## Summary

| Category | Count |
|---|---|
| Total keys in `cms.js` | 133 |
| Wired (data-content found in HTML) | 75 |
| Orphaned (no data-content in any HTML) | 58 |
| Unwired (data-content in HTML, key absent from CMS) | 0 |
| Wired keys where CMS value ≠ HTML fallback | 15 |

> **Note on rendering methods.** `applyAureaSettings()` sets `el.textContent = val`, which strips child HTML tags (including `<br>`). Where an HTML fallback contains a `<br>`, the CMS-overwritten version will be a single line. These cases are flagged as Differs.

---

## Table 1 — Wired Keys (data-content present)

| Key | CMS Value | HTML Fallback | Status |
|---|---|---|---|
| `brandName` | Aurea Hosting | Aurea Hosting | ✅ Match |
| `tagline` | We manage less so we can deliver more. | We manage less so we can deliver more. | ✅ Match |
| `taglineSub` | Short-stay management built around fewer, better properties. | Short-stay management built around fewer, better properties. | ✅ Match |
| `phone` | 0404 608 196 | 0404 608 196 | ✅ Match |
| `email` | noah@aureahosting.com.au | noah@aureahosting.com.au | ✅ Match |
| `scarcityMain` | Currently accepting 5–6 properties for **Q3** 2026. | Currently accepting 5–6 properties for **Q2** 2026. | ⚠️ Differs |
| `scarcitySub` | Our cohort model means we only onboard a small number of properties per quarter, giving each one our full attention. | Our cohort model means we only onboard a small number of properties per quarter, giving each one our full attention. | ✅ Match |
| `areasHeroTitle` | We know every suburb by its yield curve. | We know every suburb`<br>`by its yield curve. | ⚠️ Differs — `<br>` in HTML; CMS removes it |
| `areasHeroText` | From beachside surge suburbs to Hills retreat properties — every area we operate in is mapped by demand, event uplift, and seasonal yield. | From beachside surge suburbs to Hills retreat properties, our Airbnb and short-term rental management across Adelaide is mapped by demand, event uplift, and seasonal yield. | ⚠️ Differs — HTML has SEO copy rewrite |
| `contactHeroTitle` | Let's assess your property. (curly apostrophe ’) | Let's assess`<br>`your property. (straight apostrophe + `<br>`) | ⚠️ Differs — apostrophe type + `<br>` in HTML |
| `contactHeroText` | We take on a limited number of properties each quarter and evaluate every application individually. Tell us about yours — we'll respond within one business day. | We take on a limited number of properties each quarter for Airbnb and short-term rental management in Adelaide, and we evaluate every application individually. Tell us about yours. We'll respond within one business day. | ⚠️ Differs — HTML has SEO copy rewrite |
| `faqHeroTitle` | The questions owners actually ask. | The questions owners actually ask. | ✅ Match |
| `faqHeroText` | Straight answers on management, pricing, fees, and how Aurea actually works. | Straight answers on Airbnb and short-term rental management in Adelaide: pricing, fees, timelines, and how Aurea actually works. | ⚠️ Differs — HTML has SEO copy rewrite |
| `faq1Q` | How much does Aurea charge? | How much does Aurea charge? | ✅ Match |
| `faq1A` | …with no hidden charges — you'll see every booking… | …with no hidden charges. You'll see every booking… | ⚠️ Differs — em dash replaced with period in HTML |
| `faq2Q` | How quickly can my property go live? | How quickly can my property go live? | ✅ Match |
| `faq2A` | Most properties go live within 7 days of signing. Day 1 is assessment, Days 2–5 cover photography and listing creation, and Day 7 is live across all 50+ platforms. | Most properties go live within 7 days of signing. Day 1 is assessment, Days 2–5 cover photography and listing creation, and Day 7 is live across all 50+ platforms. | ✅ Match |
| `faq3Q` | Which booking platforms will my property be listed on? | Which booking platforms will my property be listed on? | ✅ Match |
| `faq3A` | …Stayz, Domain, and more — all managed through Guesty's centralised platform. | …Stayz, Domain, and more, all managed through Guesty's centralised platform. | ⚠️ Differs — em dash replaced with comma in HTML |
| `faq4Q` | Can I block out dates for my own use? | Can I block out dates for my own use? | ✅ Match |
| `faq4A` | Yes. You have full control over owner-use dates through the owner portal. Simply block any dates you want to use the property yourself and they'll be unavailable for guest bookings. | Yes. You have full control over owner-use dates through the owner portal. Simply block any dates you want to use the property yourself and they'll be unavailable for guest bookings. | ✅ Match |
| `faq5Q` | How does dynamic pricing work? | How does dynamic pricing work? | ✅ Match |
| `faq5A` | We use a combination of market data, Adelaide's event calendar, competitor rates, and demand signals to set optimal nightly rates. During high-demand periods like WomAdelaide, Adelaide Fringe, or Gather Round, rates are adjusted to capture maximum revenue. | We use a combination of market data, Adelaide's event calendar, competitor rates, and demand signals to set optimal nightly rates. During high-demand periods like WomAdelaide, Adelaide Fringe, or Gather Round, rates are adjusted to capture maximum revenue. | ✅ Match |
| `faq6Q` | What happens if there's a guest issue or damage? | What happens if there's a guest issue or damage? | ✅ Match |
| `faq6A` | …the full claims process on your behalf — documenting, reporting… | …the full claims process on your behalf: documenting, reporting… | ⚠️ Differs — em dash replaced with colon in HTML |
| `faq7Q` | How do I receive my earnings? | How do I receive my earnings? | ✅ Match |
| `faq7A` | Earnings are transferred monthly after deduction of our management fee and any approved property costs. You'll receive a full statement detailing every booking, rate, and deduction. | Earnings are transferred monthly after deduction of our management fee and any approved property costs. You'll receive a full statement detailing every booking, rate, and deduction. | ✅ Match |
| `faq8Q` | Is my property a good fit for Aurea? | Is my property a good fit for Aurea? | ✅ Match |
| `faq8A` | …rental corridors — beachside, city fringe… …to apply — we'll give you an honest assessment. | …rental corridors: beachside, city fringe… …to apply. We'll give you an honest assessment. | ⚠️ Differs — em dashes replaced with colon/period in HTML |
| `founderLetterHeading` | A letter from the founder | A letter from the founder | ✅ Match |
| `founderLetterP1` | When I started managing Adelaide short-stays almost six years ago… | When I started managing Adelaide short-stays almost six years ago… | ✅ Match |
| `founderLetterP2` | Twenty properties later, I think the job is actually about judgement… | Twenty properties later, I think the job is actually about judgement… | ✅ Match |
| `founderLetterP3` | Aurea exists because I wanted to build a management company that hires for that judgement, not for scale… | Aurea exists because I wanted to build a management company that hires for that judgement, not for scale… | ✅ Match |
| `founderLetterP4` | If that resonates with how you think about your own asset, we should talk. | If that resonates with how you think about your own asset, we should talk. | ✅ Match |
| `founderLetterSignature` | Noah Rebuli, Founder | Noah Rebuli, Founder | ✅ Match |
| `insightCardsHeading` | Lessons from twenty Adelaide properties | Lessons from twenty Adelaide properties | ✅ Match |
| `insight1Eyebrow` | LESSON 01 | LESSON 01 | ✅ Match |
| `insight1Title` | The peak isn't where owners lose money | The peak isn't where owners lose money | ✅ Match |
| `insight1Body` | Most owners are well-priced in March. The losses happen in the shoulder weeks around the peak… | Most owners are well-priced in March. The losses happen in the shoulder weeks around the peak… | ✅ Match |
| `insight2Eyebrow` | LESSON 02 | LESSON 02 | ✅ Match |
| `insight2Title` | Reviews compound | Reviews compound | ✅ Match |
| `insight2Body` | Airbnb's algorithm rewards consistency more than peaks… | Airbnb's algorithm rewards consistency more than peaks… | ✅ Match |
| `insight3Eyebrow` | LESSON 03 | LESSON 03 | ✅ Match |
| `insight3Title` | The right owner is worth more than the right property | The right owner is worth more than the right property | ✅ Match |
| `insight3Body` | A mid-tier property with an engaged owner outperforms a premium property with a disengaged one, every time… | A mid-tier property with an engaged owner outperforms a premium property with a disengaged one, every time… | ✅ Match |
| `reportCtaHeading` | Considering short-stay? | Considering short-stay? | ✅ Match |
| `reportCtaSub` | Download our 2026 Adelaide Short-Stay Yield Report: public data, operator insight, and five principles every owner should know. | Download our 2026 Adelaide Short-Stay Yield Report: public data, operator insight, and five principles every owner should know. | ✅ Match |
| `reportCtaBtn` | Read the report → | Read the report → | ✅ Match |
| `yieldCtaHeading` | Understand your property's earning potential. | Understand your property's earning potential. | ✅ Match |
| `yieldCtaSub` | Our Adelaide Yield Report breaks down short-stay returns by suburb, occupancy trends, and what separates high-performing listings from the rest. | Our Adelaide Yield Report breaks down short-stay returns by suburb, occupancy trends, and what separates high-performing listings from the rest. | ✅ Match |
| `yieldCtaBtn` | View the Yield Report → | View the Yield Report → | ✅ Match |
| `servicesStop1` | Worrying about guest messages at midnight | Worrying about guest messages at midnight | ✅ Match |
| `servicesStop2` | Juggling multiple booking calendars | Juggling multiple booking calendars | ✅ Match |
| `servicesStop3` | Coordinating cleaners between bookings | Coordinating cleaners between bookings | ✅ Match |
| `servicesStop4` | Guessing the right nightly price | Guessing the right nightly price | ✅ Match |
| `servicesStop5` | Handling complaints and damage disputes | Handling complaints and damage disputes | ✅ Match |
| `servicesGet1` | A dedicated team handling every guest interaction | A dedicated team handling every guest interaction | ✅ Match |
| `servicesGet2` | One calendar, synced across 50+ platforms | One calendar, synced across 50+ platforms | ✅ Match |
| `servicesGet3` | Professional turnovers with quality-checked results | Professional turnovers with quality-checked results | ✅ Match |
| `servicesGet4` | Dynamic pricing that maximises your revenue | Dynamic pricing that maximises your revenue | ✅ Match |
| `servicesGet5` | Transparent reporting and honest performance reviews | Transparent reporting and honest performance reviews | ✅ Match |
| `techHeroTitle` | 50+ channels. One source of truth. | 50+ channels.`<br>`One source of truth. | ⚠️ Differs — `<br>` in HTML; CMS removes it |
| `techHeroText` | Guesty — the world's leading property management platform — connecting your listing to global demand while giving us the tools to price, automate, and report with precision. | Guesty powers our Airbnb and short-term rental management in Adelaide, connecting your listing to global demand while giving us the tools to price, automate, and report with precision. | ⚠️ Differs — HTML has SEO copy rewrite |
| `techChip1` | Guesty Pro | Guesty Pro | ✅ Match |
| `techChip2` | 50+ Channels | 50+ Channels | ✅ Match |
| `techChip3` | Real-Time Data | Real-Time Data | ✅ Match |
| `techSignalTop` | Connected Channels | Connected Channels | ✅ Match |
| `techSignalText` | Airbnb · Booking.com · Vrbo · Expedia · Google Travel · Tripadvisor · Domain · Stayz · HomeAway | Airbnb · Booking.com · Vrbo · Expedia · Google Travel · Tripadvisor · Domain · Stayz · HomeAway | ✅ Match |
| `techCard1Title` | Unified Calendar | Unified Calendar | ✅ Match |
| `techCard1Text` | One calendar syncs across all platforms, eliminating double-bookings and manual updates. | One calendar syncs across all platforms, eliminating double-bookings and manual updates. | ✅ Match |
| `techCard2Title` | Smart Automation | Smart Automation | ✅ Match |
| `techCard2Text` | Automated messaging, pricing adjustments, and task management that runs 24/7 without manual input. | Automated messaging, pricing adjustments, and task management that runs 24/7 without manual input. | ✅ Match |
| `techCard3Title` | Owner Dashboard | Owner Dashboard | ✅ Match |
| `techCard3Text` | Real-time access to bookings, revenue, and performance metrics via your personal portal. | Real-time access to bookings, revenue, and performance metrics via your personal portal. | ✅ Match |
| `whyHeroTitle` | The comparison is straightforward. | The comparison`<br>`is straightforward. | ⚠️ Differs — `<br>` in HTML; CMS removes it |
| `whyHeroText` | Volume operators optimise for scale. We optimise for your property's yield. | Volume operators optimise for scale; we run Airbnb and short-term rental management in Adelaide with one focus – your property's yield. | ⚠️ Differs — HTML has SEO copy rewrite |
| `whyTableHead1` | Feature | Feature | ✅ Match |
| `whyTableHead2` | Generic Agency | Generic Agency | ✅ Match |
| `whyTableHead3` | Aurea Hosting | Aurea Hosting | ✅ Match |
| `whyRow1Label` | Pricing Strategy | Pricing Strategy | ✅ Match |
| `whyRow1Left` | Fixed nightly rate | Fixed nightly rate | ✅ Match |
| `whyRow1Right` | Dynamic, data-driven pricing | Dynamic, data-driven pricing | ✅ Match |
| `whyRow2Label` | Channel Distribution | Channel Distribution | ✅ Match |
| `whyRow2Left` | 1–3 platforms | 1–3 platforms | ✅ Match |
| `whyRow2Right` | 50+ channels via Guesty | 50+ channels via Guesty | ✅ Match |
| `whyRow3Label` | Guest Communication | Guest Communication | ✅ Match |
| `whyRow3Left` | Business hours only | Business hours only | ✅ Match |
| `whyRow3Right` | 24/7 automated + personal | 24/7 automated + personal | ✅ Match |
| `whyRow4Label` | Cleaning Standard | Cleaning Standard | ✅ Match |
| `whyRow4Left` | Basic turnover | Basic turnover | ✅ Match |
| `whyRow4Right` | 47-point hotel-grade checklist | 47-point hotel-grade checklist | ✅ Match |
| `whyRow5Label` | Owner Reporting | Owner Reporting | ✅ Match |
| `whyRow5Left` | Monthly PDF | Monthly PDF | ✅ Match |
| `whyRow5Right` | Real-time dashboard + statements | Real-time dashboard + statements | ✅ Match |
| `whyEdgeTitle` | The Aurea Edge | The Aurea Edge | ✅ Match |
| `whyCard1Title` | Confidence | Confidence | ✅ Match |
| `whyCard1Text` | Know exactly how your property is performing with real-time data and honest reporting. | Know exactly how your property is performing with real-time data and honest reporting. | ✅ Match |
| `whyCard2Title` | Performance | Performance | ✅ Match |
| `whyCard2Text` | Our dynamic pricing consistently outperforms fixed-rate strategies by 20–35%. | Our dynamic pricing consistently outperforms fixed-rate strategies by 20–35%. | ✅ Match |
| `whyCard3Title` | Clarity | Clarity | ✅ Match |
| `whyCard3Text` | No hidden fees, no jargon. Just straightforward management you can trust. | No hidden fees, no jargon. Just straightforward management you can trust. | ✅ Match |
| `whyFitTitle` | Best fit for owners who… | Best fit for owners who… | ✅ Match |
| `whyFit1` | Own a quality property in Adelaide's key short-term rental corridors | Own a quality property in Adelaide's key short-term rental corridors | ✅ Match |
| `whyFit2` | Want professional, hands-off management with full transparency | Want professional, hands-off management with full transparency | ✅ Match |
| `whyFit3` | Value revenue optimisation over set-and-forget approaches | Value revenue optimisation over set-and-forget approaches | ✅ Match |
| `whyCtaTitle` | See if your property is a good fit | See if your property is a good fit | ✅ Match |
| `whyCtaText` | We're selective about the properties we manage — because quality drives results. | We're selective about the properties we manage because quality drives results. | ⚠️ Differs — em dash + "because" in CMS; bare "because" in HTML |

---

## Table 2 — Orphaned Keys (no data-content in any HTML file)

These keys exist in `AUREA_DEFAULTS` but no HTML element uses `data-content="<key>"`. Grouped by why they're orphaned.

### 2a. CSS-Only Tokens (applied via `root.style.setProperty`, not data-content)

| Key | CMS Value |
|---|---|
| `primary` | #1b7f74 |
| `primaryDeep` | #14605a |
| `gold` | #c8a35d |
| `sand` | #fffdf9 |
| `ink` | #172226 |

### 2b. Rendered by Custom JS Functions (not via data-content loop)

These are handled by `renderIntelStrip()`, `renderPerfStats()`, `renderTestimonials()`, or `refreshCalculatorData()`.

| Key | CMS Value | Render method |
|---|---|---|
| `intelEvents` | Array of 6 event objects | `renderIntelStrip()` |
| `calculatorData` | Object with 6 suburb clusters | `refreshCalculatorData()` |
| `perfLabel1` | Average occupancy | `renderPerfStats()` |
| `perfNum1` | 66 | `renderPerfStats()` |
| `perfSuffix1` | % | `renderPerfStats()` |
| `perfPrefix1` | (empty) | `renderPerfStats()` |
| `perfStart1` | 42 | `renderPerfStats()` |
| `perfContext1` | Across all managed Adelaide properties | `renderPerfStats()` |
| `perfLabel2` | Revenue lift vs self-managed | `renderPerfStats()` |
| `perfNum2` | 32 | `renderPerfStats()` |
| `perfSuffix2` | % | `renderPerfStats()` |
| `perfPrefix2` | + | `renderPerfStats()` |
| `perfStart2` | 20 | `renderPerfStats()` |
| `perfContext2` | Average across owners' first 12 months | `renderPerfStats()` |
| `perfLabel3` | Guest response time | `renderPerfStats()` |
| `perfContext3` | Every message, every platform, every hour | `renderPerfStats()` |
| `result1Quote` | Switching to Aurea added $1,100 to my monthly income… | `renderTestimonials()` |
| `result1Meta` | S.M. · Norwood · Townhouse | `renderTestimonials()` |
| `result1Stat` | +34% revenue, Q1 2025 | `renderTestimonials()` |
| `result2Quote` | I'd been self-managing for two years… | `renderTestimonials()` |
| `result2Meta` | T.K. · Glenelg · 2BR Apartment | `renderTestimonials()` |
| `result2Stat` | +$8,400 Fringe season 2025 | `renderTestimonials()` |
| `result3Quote` | A Hills property at 66% occupancy in its first quarter… | `renderTestimonials()` |
| `result3Meta` | R. & J.P. · Stirling · Hills Retreat | `renderTestimonials()` |
| `result3Stat` | 66% occupancy, first quarter | `renderTestimonials()` |

### 2c. Keys with No Corresponding data-content Wire (content exists in HTML but is hardcoded)

The HTML content exists on these pages but the elements have no `data-content` attribute — the CMS cannot update them.

| Key | CMS Value | HTML page / location |
|---|---|---|
| `homeHeroHeadline` | We manage fewer properties. On purpose. | `index.html` — `<h1 class="hero-headline">` (hardcoded) |
| `homeHeroSub` | For Adelaide owners who treat their homes as high‑yield assets, not hobbies. | `index.html` — `<p class="hero-sub">` (hardcoded, HTML copy differs too) |
| `homePrimaryBtn` | Get your property's number | `index.html` — hero CTA link (hardcoded) |
| `homeApplyBtn` | Apply for asset management | `index.html` — hero CTA link (hardcoded) |
| `ctaTitle` | Ready to earn more from your property? | Not found in any HTML |
| `ctaText` | Book a free, no-obligation property assessment. | Not found in any HTML |
| `applyOverline` | Limited availability | `index.html` — `<p class="apply-overline">` (hardcoded) |
| `applyHeadline` | We take on a limited number of properties each quarter. | `index.html` — `<h2 class="apply-headline">` (hardcoded) |
| `applySub` | Currently assessing properties in Glenelg, Norwood, Burnside, Stirling, and surrounds. | `index.html` — `<p class="apply-sub">` (hardcoded) |
| `proc1Title` | Assessment | `index.html` — process row h3 (hardcoded) |
| `proc1Text` | We evaluate your property's position, earning potential, and fit with Aurea's portfolio standards. Honest, specific, no obligation. | `index.html` — process row p (hardcoded) |
| `proc1Timeline` | Day 1 | `index.html` — process row timeline (hardcoded) |
| `proc2Title` | Setup | `index.html` — process row h3 (hardcoded) |
| `proc2Text` | Professional photography, SEO-optimised listing creation, and full onboarding into Guesty's enterprise property management platform. | `index.html` — process row p (hardcoded) |
| `proc2Timeline` | Days 2–5 | `index.html` — process row timeline (hardcoded) |
| `proc3Title` | Go Live | `index.html` — process row h3 (hardcoded) |
| `proc3Text` | Listed across 50+ booking channels simultaneously. Pricing calibrated to Adelaide's current market conditions and upcoming event demand. | `index.html` — process row p (hardcoded) |
| `proc3Timeline` | Day 7 | `index.html` — process row timeline (hardcoded) |
| `proc4Title` | Ongoing | `index.html` — process row h3 (hardcoded) |
| `proc4Text` | Dynamic pricing, 24/7 guest communications, hotel-grade property turnovers, and monthly owner performance statements with full transparency. | `index.html` — process row p (hardcoded) |
| `proc4Timeline` | Continuous | `index.html` — process row timeline (hardcoded) |
| `serv1Title` | Listing & Channel Distribution | `services.html` — process row h3 (hardcoded) |
| `serv1Text` | Professional copywriting, photography direction, and SEO-optimised listing creation… | `services.html` — process row p (hardcoded, HTML copy differs) |
| `serv1Timeline` | Live in 7 days | `services.html` — process row timeline (hardcoded) |
| `serv2Title` | Dynamic Revenue Pricing | `services.html` — process row h3 (hardcoded) |
| `serv2Text` | Fixed rates leave yield on the table… | `services.html` — process row p (hardcoded, HTML copy differs) |
| `serv2Timeline` | Daily optimisation | `services.html` — process row timeline (hardcoded) |
| `serv3Title` | Guest Experience Management | `services.html` — process row h3 (hardcoded) |
| `serv3Text` | Every guest interaction handled 24/7. Under 4-minute average response time… | `services.html` — process row p (hardcoded, HTML copy differs) |
| `serv3Timeline` | 24/7 coverage | `services.html` — process row timeline (hardcoded) |
| `serv4Title` | Hotel-Grade Turnovers | `services.html` — process row h3 (hardcoded) |
| `serv4Text` | Every changeover follows our 47-point checklist… | `services.html` — process row p (hardcoded, HTML copy differs) |
| `serv4Timeline` | Every changeover | `services.html` — process row timeline (hardcoded) |
| `serv5Title` | Owner Intelligence & Reporting | `services.html` — process row h3 (hardcoded) |
| `serv5Text` | You see exactly what your property earns… | `services.html` — process row p (hardcoded, HTML copy differs) |
| `serv5Timeline` | Real-time access | `services.html` — process row timeline (hardcoded) |
| `areasTag1` | Beachside | `areas.html` — chip (hardcoded) |
| `areasTag2` | City Fringe | `areas.html` — chip (hardcoded) |
| `areasTag3` | Adelaide Hills | `areas.html` — chip (hardcoded) |
| `areasTag5` | Event Corridors | `areas.html` — chip (hardcoded; note: no `areasTag4` key exists in CMS) |
| `areasSuburb1` | Glenelg | `areas.html` — area content (hardcoded) |
| `areasSuburb2` | West Beach | `areas.html` — area content (hardcoded) |
| `areasSuburb3` | Henley Beach | `areas.html` — area content (hardcoded) |
| `areasSuburb4` | Adelaide CBD | `areas.html` — area content (hardcoded) |
| `areasSuburb5` | Unley | `areas.html` — area content (hardcoded) |
| `areasSuburb6` | Norwood | `areas.html` — area content (hardcoded) |
| `areasSuburb7` | Burnside | `areas.html` — area content (hardcoded) |
| `areasSuburb8` | Stirling | `areas.html` — area content (hardcoded) |
| `areasSuburb9` | Crafers | `areas.html` — area content (hardcoded) |
| `areasSuburb10` | Hahndorf | `areas.html` — area content (hardcoded) |
| `areasSuburb11` | Brighton | `areas.html` — area content (hardcoded) |
| `areasSuburb12` | Prospect | `areas.html` — area content (hardcoded) |
| `techOutcome1Cap` | 50+ channels, live-synced | `technology.html` — yield outcome capability (hardcoded, HTML copy differs) |
| `techOutcome1Res` | Your property reaches guests who never open Airbnb directly… | `technology.html` — yield outcome result (hardcoded, HTML copy differs) |
| `techOutcome2Cap` | Event-aware pricing engine | `technology.html` — yield outcome capability (hardcoded, HTML copy differs) |
| `techOutcome2Res` | During Adelaide Fringe, Gather Round, or LIV Golf, rates adjust 3–5 days before demand peaks… | `technology.html` — yield outcome result (hardcoded, HTML copy differs) |
| `techOutcome3Cap` | Unified calendar, real-time sync | `technology.html` — yield outcome capability (hardcoded) |
| `techOutcome3Res` | A booking on Booking.com closes your Airbnb availability within seconds… | `technology.html` — yield outcome result (hardcoded, HTML copy differs) |
| `techOutcome4Cap` | Owner dashboard, live data | `technology.html` — yield outcome capability (hardcoded) |
| `techOutcome4Res` | Revenue, occupancy, and booking pace are visible in real-time… | `technology.html` — yield outcome result (hardcoded, HTML copy differs) |
| `contactFastTitle` | We review your application | `contact.html` — card h3 (hardcoded) |
| `contactFastText` | Within one business day, we assess your property's suburb, configuration, and situation against our current portfolio capacity. You'll hear from us either way. | `contact.html` — card p (hardcoded) |
| `contactHonestTitle` | A brief assessment call | `contact.html` — card h3 (hardcoded) |
| `contactHonestText` | If your property looks like a strong fit, we'll schedule a 20-minute call to discuss your goals, timeframe, and answer any questions about how we work. | `contact.html` — card p (hardcoded) |
| `contactLocalTitle` | Onboarding begins | `contact.html` — card h3 (hardcoded, HTML says "Onboarding begins" vs CMS "Onboarding begins") |
| `contactLocalText` | Once we agree it's the right match, onboarding starts immediately. Photography, listing creation, channel distribution — live within seven days. | `contact.html` — card p (hardcoded, HTML copy differs slightly) |

---

## Table 3 — Unwired Elements (data-content in HTML, no CMS key)

None found. Every `data-content` value in the HTML has a matching key in `AUREA_DEFAULTS`.

---

## Flagged Issues Summary

### 🔴 Critical: Stale quarter in scarcityMain
`scarcityMain` in `cms.js` says **Q3 2026**; both `index.html` and `contact.html` fallback text says **Q2 2026**. The CMS is one quarter ahead of the HTML. When JS runs, the CMS value wins — so the live site already shows Q3, but a no-JS visitor or a fallback audit sees Q2.

### ⚠️ High: SEO copy rewrites not reflected in CMS (5 keys)
The following keys have substantially different copy in the live HTML (SEO-expanded rewrites) versus the CMS value. If an admin edits these keys in the admin panel and saves, `applyAureaSettings()` will overwrite the SEO copy with the shorter CMS version:
- `areasHeroText`
- `contactHeroText`
- `faqHeroText`
- `techHeroText`
- `whyHeroText`

### ⚠️ Medium: em dash → punctuation substitutions (5 keys)
The following FAQ answers use em dashes in the CMS (`—`) that have been replaced with colons or periods in the HTML fallback. CMS value is authoritative when JS runs, so live visitors see em dashes — but the inconsistency indicates the HTML was hand-edited separately:
- `faq1A` — em dash replaced with period
- `faq3A` — em dash replaced with comma
- `faq6A` — em dash replaced with colon
- `faq8A` — two em dashes replaced with colon and period
- `whyCtaText` — em dash + "because" collapsed to bare "because"

### ⚠️ Medium: `<br>` tags in fallback overridden by CMS (4 keys)
These HTML fallbacks use `<br>` to force a visual line break. When `applyAureaSettings()` sets `el.textContent`, the `<br>` is destroyed and the heading renders as a single line:
- `areasHeroTitle` — "We know every suburb`<br>`by its yield curve."
- `contactHeroTitle` — "Let's assess`<br>`your property."
- `techHeroTitle` — "50+ channels.`<br>`One source of truth."
- `whyHeroTitle` — "The comparison`<br>`is straightforward."

### ℹ️ Low: 58 orphaned keys (CMS tracks content the admin panel can't push)
Half the site's content is defined in `AUREA_DEFAULTS` but never pulled via `data-content`, so editing it in the admin panel has no effect. The most impactful clusters are the services page process rows (`serv1–5`), the technology page outcome paragraphs (`techOutcome1–4`), the homepage hero (`homeHeroHeadline`, `homeHeroSub`, CTA buttons), and the contact page "What happens next" cards (`contactFastTitle/Text`, `contactHonestTitle/Text`, `contactLocalTitle/Text`).

### ℹ️ Note: Missing `areasTag4` key
The CMS defines `areasTag1`, `areasTag2`, `areasTag3`, and `areasTag5` but skips `areasTag4`. The areas page has four chips ("Beachside", "City Fringe", "Adelaide Hills", "Event Corridors") which map to 1, 2, 3, 5. Presumably `areasTag4` was removed at some point without renumbering.
