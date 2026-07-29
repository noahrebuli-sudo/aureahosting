# Security headers audit

Site: Aurea Hosting (aureahosting.com.au), static HTML/CSS/JS on Cloudflare Pages.
Branch: `security-headers`. Date: 2026-07-29.
Files changed by this work: `_headers` and this document only. No HTML, CSS or JS was modified.

## Corrections to the starting brief

Three assumptions in the brief did not survive contact with the repo. They are recorded here because they change the scope of the work.

1. **The site is not header-less.** Commit `a8760c5` ("site: add four security headers", PR #79, 27 July 2026) already shipped a `_headers` file to `main` carrying `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN` and `Strict-Transport-Security`. A grade of D reflects the state before that commit, or a scan run against a cached result. The work below therefore adds `Permissions-Policy`, tightens `X-Frame-Options` from `SAMEORIGIN` to `DENY`, and adds the report-only CSP. The existing HSTS header was retained; dropping it would have been a regression.
2. **There is no `admin.html` and no `cms.js`.** The CMS admin system was deleted in commit `af6a132` (PR #25). Nothing in the working tree or the current `main` references either file. `data.js` survives and is a plain data module rendered by `app.js`. There is consequently no admin surface to audit or to click through during verification.
3. **Lucide is self-hosted, not on a CDN.** `lucide.js` is a 621 KB file committed to the repo root, vendored in commit `7024f08` ("self-host Lucide"). There is no `unpkg`/`jsdelivr` Lucide origin to allow. The version is not recorded in the file, so the "pinned at 0.460.0" claim could not be confirmed from source.

A fourth item: the local `security-headers` branch already existed as a stale leftover from PR #79. Its only commit was already merged into `main` via squash, and the branch was 1 commit behind plus missing `main`'s later `404.html`. It was reset onto `main` before this work began.

## Phase 1: dependency inventory

### External origins

Origins marked **source-confirmed** appear literally in a tracked file. Origins marked **runtime** do not appear in source but are documented or observed loading behaviour of the third-party tags that are present; they are included precisely because a report-only policy is the correct place to test that assumption.

| Origin | Used by | CSP directive | Evidence |
|---|---|---|---|
| `www.googletagmanager.com` | gtag.js loader for GA4 `G-0PHKTBR7RB` and Google Ads `AW-18189621704` | `script-src`, `img-src`, `connect-src` | source-confirmed, every page, lines 5 and 13 |
| `www.google-analytics.com` | GA4 measurement beacons | `connect-src`, `img-src`, `script-src` | runtime |
| `analytics.google.com`, `region1.google-analytics.com` | GA4 collect endpoints | `connect-src` | runtime |
| `stats.g.doubleclick.net` | Google Signals remarketing ping | `connect-src`, `img-src` | runtime |
| `www.googleadservices.com` | Google Ads conversion script | `script-src` | runtime, driven by the `AW-` tag |
| `googleads.g.doubleclick.net` | Google Ads conversion pixel | `script-src`, `img-src`, `connect-src` | runtime |
| `www.google.com`, `www.google.com.au` | Ads conversion linker pixel | `img-src` | runtime |
| `td.doubleclick.net` | Ads iframe | `frame-src` | runtime |
| `api.fontshare.com` | Fontshare CSS for Switzer and Satoshi | `style-src` | source-confirmed, `<link>` on every page |
| `cdn.fontshare.com` | Fontshare woff2/woff files | `font-src` | confirmed by fetching the Fontshare CSS; the font host differs from the CSS host, and only `api.fontshare.com` is preconnected |
| `connect.facebook.net` | Meta Pixel `fbevents.js`, id `1027065616568144` | `script-src`, `connect-src` | source-confirmed, inline loader on every page |
| `www.facebook.com` | Meta Pixel `/tr` noscript beacon and XHR | `img-src`, `connect-src`, `frame-src` | source-confirmed |
| `formspree.io` | Contact form POST, endpoint `f/xkopyjkj` | `form-action`, `connect-src` | source-confirmed, `contact.html:151` and `contact.html:288` |
| `unpkg.com` | MapLibre GL JS 4.1.2 script and CSS | `script-src`, `style-src` | source-confirmed, `areas.html:32` and `areas.html:375` |
| `tiles.openfreemap.org` | Map vector tiles, raster tiles, sprites, glyphs | `connect-src`, `img-src` | source-confirmed at `app.js:236`; sub-resource hosts confirmed by fetching the Liberty style JSON, all four resolve to the same origin |
| `groot.mailerlite.com` | MailerLite `webforms.min.js` | `script-src`, `connect-src` | source-confirmed, `report.html:1144` |
| `assets.mailerlite.com` | MailerLite form action and `takel` fetch | `form-action`, `connect-src`, `script-src` | source-confirmed, `report.html:1087` and `report.html:1146` |
| `assets.mlcdn.com` | MailerLite `fonts.css` import and UI images | `style-src`, `img-src`, `font-src` | source-confirmed, `report.html:484`, `900`, `1031` |
| `fonts.mailerlite.com` | Reached by `@import` inside `assets.mlcdn.com/fonts.css` | `style-src`, `font-src` | confirmed by fetching that CSS; a third-level dependency invisible in this repo |

`schema.org` appears only as a JSON-LD `@context` string and `www.oaic.gov.au`, `share.google`, `www.instagram.com` appear only as anchor hrefs. None is a subresource fetch, so none needs a CSP directive.

`data:` is required in `img-src` (inspection tool photos via `readAsDataURL`, and inline SVG backgrounds at `report.html:289`, `746`, `750`) and in `font-src`. `blob:` is required in `worker-src` for MapLibre's worker, and in `img-src` for the inspection tool export at `tools/inspection.html:405`.

### Inline scripts

Every page carries the same four inline blocks in `<head>`. Executable inline script is pervasive.

| Block | Files | Lines |
|---|---|---|
| GA4 `gtag` config | all 18 HTML pages except `Aurea-Owner-*.html`, `tools/inspection.html`, `guides/template.html` | 6 |
| Google Ads `gtag` config | same set | 14 |
| Meta Pixel loader | `index.html` 122; `why-us.html`, `contact.html`, `privacy.html` 51; `areas.html` 53; `faq.html` 123; `services.html` 175; `card.html` 178; `report.html` 350; `404.html` 33; `areas/*.html` 82 (six files) | as listed |
| Lucide icon init | `index.html` 831; `contact.html` 276; `why-us.html` 356; `faq.html` 341; `areas.html` 377; `services.html` 408; `report.html` 1243; `guides/template.html` 476; `areas/*.html` (six files) at 218, 219, 232, 282, 295, 296 | as listed |

Page-specific inline scripts:

| File | Line | Purpose |
|---|---|---|
| `index.html` | 150 | Intro veil session logic |
| `contact.html` | 277 | Formspree submit handler and conversion events |
| `report.html` | 1136 | MailerLite success callback |
| `report.html` | 1145 | MailerLite `takel` fetch |
| `tools/inspection.html` | 121 | Entire inspection tool application |

JSON-LD blocks (`<script type="application/ld+json">`) at `index.html` 52 and 68, `faq.html` 50, `services.html` 50, `report.html` 50, and `areas/*.html` 50 and 66 are data blocks, not executable script. CSP does not apply `script-src` to them, so they do not force `'unsafe-inline'`.

### Inline event handlers

`onclick` attributes calling `gtag(...)` appear at: `index.html` 266, 758, 780, 817; `why-us.html` 349; `faq.html` 334; `contact.html` 103, 269; `services.html` 362, 396; `privacy.html` 174, 194; `areas.html` 368; `report.html` 1231; `card.html` 212, 220, 229, 238.

These matter more than the inline `<script>` blocks. A nonce or hash based policy does not rescue an inline handler; `script-src-attr 'unsafe-inline'` is the only thing that permits it. They must be rewritten as listeners before any inline-free policy is possible.

### Inline style blocks and attributes

| File | Lines |
|---|---|
| `card.html` | 31 to 173 |
| `report.html` | 96 to 348, 484, 485 to 1072 |
| `tools/inspection.html` | 9 to 82 |
| `guides/template.html` | 12 to 152 |

Inline `style="..."` attributes also appear in page markup, for example `contact.html:103` and the Meta Pixel `noscript` beacon on every page. `app.js:296` sets `btn.style.background` at runtime, which is a style attribute mutation. `styles.css` contains no external `url()` or `@import`, so the single stylesheet is self-contained.

### What removing `'unsafe-inline'` would require

For `script-src`: move the four repeated head blocks into a small self-hosted file, or stamp a per-response nonce, which Cloudflare Pages cannot do from a static `_headers` file and would need a Pages Function or a Worker. Hashes are viable for the repeated blocks since they are byte-identical across pages, but every page-specific block needs its own hash and every copy edit invalidates it. The 18 `onclick` handlers must be converted to `addEventListener` regardless of approach.

For `style-src`: the four inline `<style>` blocks would move into `styles.css` or their own files. The `style="..."` attributes and `app.js:296` need `style-src-attr 'unsafe-inline'` even after that, unless they are refactored to class toggles. The MailerLite block at `report.html:485` is vendor-generated markup and is not practical to maintain by hand.

None of this is done here. The policy below allows `'unsafe-inline'` in both directives because that is what the site needs today.

## Phase 2: the headers file

`_headers` now applies to `/*`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (tightened from the previous `SAMEORIGIN`; no page in the repo frames another, and there are no `<iframe>` elements anywhere in the tree)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains` (pre-existing, retained)
- `Content-Security-Policy-Report-Only: ...` built from the table above

The `/aurea-noah.vcf` content-type rule is unchanged.

**No enforcing CSP was added.** The policy is report-only.

### Known conflict: `camera=()` and the inspection tool

`tools/inspection.html:284` renders `<input type="file" accept="image/*" capture="environment">`. Chromium gates the `capture` attribute behind the `camera` permission policy, so `camera=()` is likely to degrade that input from "open the rear camera" to "open the file picker" on Android Chrome. The tool still works, since photos can be chosen from the gallery, but the one-tap capture flow is lost.

This is called out rather than silently worked around, because the brief asked for `camera=()` specifically. If the capture flow matters, the fix is one token: `camera=(self)` instead of `camera=()`. That still blocks every third party, including the Meta Pixel and MailerLite, from requesting the camera.

## Phase 3: verification

### Push status

The branch was committed and pushed, and the push was verified by fetching the remote ref. See the commit log for the resulting SHA.

### Cloudflare Pages branch preview URL

Cloudflare Pages publishes per-branch previews as:

```
https://<branch-slug>.<project-name>.pages.dev
```

For this branch the slug is `security-headers`. The project name is not recorded anywhere in this repo, so the exact host cannot be derived from source. It is almost certainly:

```
https://security-headers.aureahosting.pages.dev
```

Confirm the project name in the Cloudflare dashboard under Workers and Pages, or read it off the deployment comment on the pull request. Note that `_headers` is applied to preview deployments as well as production, so the preview is a valid test surface.

### I did not verify the preview

I have no ability to reach the Cloudflare Pages preview from this environment, and the deployment had not been built at the time of writing. **Nothing below has been executed.** Every check in this section is a human step. No claim in this document asserts that the deployed headers were observed.

### Checklist: securityheaders.com

1. Wait for the Cloudflare Pages build for `security-headers` to report success.
2. Open `https://securityheaders.com`, enter the preview URL, and tick **Hide results** so the scan is not added to the public board.
3. Scan and confirm the presence of `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and `Strict-Transport-Security`.
4. Expect the report to still flag a missing `Content-Security-Policy`. This is correct and intended; the scanner does not award credit for the report-only variant.
5. Cross-check with `curl -sI https://<preview-host>/ | sort`, which shows the report-only header in full where the web scanner elides it.

### Checklist: DevTools console, CSP report-only violations

Open DevTools, Console tab, preserve log on, filter for `Content Security Policy`. Report-only violations log as "would have been blocked" and break nothing. Walk each page and record any origin the audit missed.

| Page | What to exercise | Directive most likely to report |
|---|---|---|
| `/` | Load through the intro veil, scroll the full page, confirm icons render and the sticky CTA appears | `script-src`, `img-src` |
| `/services`, `/why-us`, `/faq`, `/privacy` | Load, expand FAQ items, confirm icons render | `script-src` |
| `/areas` | Wait for the MapLibre map to draw tiles, pan, zoom, click a marker to open a popup | `script-src` and `style-src` for unpkg, `connect-src` and `img-src` for tiles, `worker-src` for the blob worker |
| `/areas/glenelg`, `/cbd`, `/norwood`, `/brighton`, `/prospect`, `/stirling` | Load each, confirm icons | `script-src` |
| `/contact` | Submit the form with real values and confirm the success state, then confirm the lead arrived in Formspree | `connect-src` and `form-action` for `formspree.io` |
| `/report` | Load, then submit the MailerLite signup | `script-src`, `style-src`, `font-src`, `connect-src`, `form-action` for the MailerLite and mlcdn origins |
| `/card` | Load, tap the phone, email, vCard and website buttons; confirm the vCard downloads and opens | `img-src`, plus the `/aurea-noah.vcf` content-type |
| `/tools/inspection` | Open, add photos, save, export the JSON | `img-src` for `data:` and `blob:`; check whether `capture` still opens the camera on Android |
| `/404test` (any unknown path) | Confirm the custom 404 renders | `script-src` |

There is no `admin.html` to test. See the corrections section.

Also worth confirming during the walk: GA4 realtime shows the preview traffic, and Meta Events Manager shows PageView. If either is silent while the console reports a `connect-src` violation, an origin is missing from the policy.

## Phase 4: report

### Expected grade from the four headers alone

**A.** securityheaders.com awards A once `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and `Strict-Transport-Security` are all present. It withholds A+ until an enforcing `Content-Security-Policy` is served; the report-only header earns no credit there. So the realistic outcome for this branch is A, and A+ is reachable only by completing the enforcement path below.

The grade should already have been A rather than D as of PR #79 plus this branch's `Permissions-Policy`. If a rescan still shows D, the likely causes are a cached scan result, a scan pointed at `www.aureahosting.com.au` which 301s to the apex, or the `_headers` file not being picked up because the build output directory is not the repo root.

### What the report-only CSP would have blocked if enforcing

Nothing, if the inventory is complete. That is the point of shipping it report-only first. Concretely, the policy is permissive in exactly two places and strict everywhere else:

- `'unsafe-inline'` is granted in `script-src` and `style-src`. Without it the enforcing policy would break every page immediately: all GA4 and Ads config, the Meta Pixel, all icon rendering, the contact form handler, the intro veil, the MailerLite form, and the entire inspection tool.
- The runtime-only Google and Meta origins are educated guesses, not source facts. If any of them is wrong, an enforcing policy would silently break conversion tracking while the site continued to look fine. This is the single most valuable thing the report-only pass will tell us.

What it does lock down even in this permissive form: `default-src 'self'`, `object-src 'none'`, `base-uri 'self'` (blocks base-tag injection), `frame-ancestors 'none'` (a modern equivalent of the `X-Frame-Options` header, and the one browsers actually honour), and `form-action` limited to `self`, Formspree and MailerLite, which means an injected form cannot exfiltrate to an attacker endpoint.

### Shortest path to enforcement

1. Deploy this branch, walk the checklist above, and collect every console violation. Add any missed origin to the report-only policy and repeat until a full walk is clean.
2. Flip `Content-Security-Policy-Report-Only` to `Content-Security-Policy`, keeping `'unsafe-inline'` in `script-src` and `style-src`. This is a genuine improvement over no CSP and costs no refactoring. It is the correct stopping point for this site unless there is appetite for the next step.
3. Only if A+ is the goal: convert the 18 inline `onclick` handlers to `addEventListener` in `app.js`, move the four repeated head blocks and the four inline `<style>` blocks into files, then drop `'unsafe-inline'`. Budget this as a real refactor across 18 HTML files, not a headers change. The MailerLite block on `report.html` will resist, and may need `report.html` to keep a looser policy of its own.

Step 2 alone gets most of the security value. Step 3 is the expensive 10 per cent.

### Surprises

- **The premise was stale in three places.** Headers already shipped, the CMS is long gone, and Lucide is vendored. Recorded in full at the top.
- **Fontshare splits across two origins.** The CSS is on `api.fontshare.com` and the font files are on `cdn.fontshare.com`. Only the first is preconnected, which means every page pays an uncovered DNS, TCP and TLS round trip before the first glyph arrives. That is a performance finding, not a security one, but it fell out of the audit and is a one-line fix in each `<head>`.
- **MailerLite reaches three origins deep.** `report.html` loads CSS from `assets.mlcdn.com`, which `@import`s `fonts.mailerlite.com`. That second hop is invisible in this repo and would have been missed by any audit that only read the source. It is the most likely single cause of a surprise violation.
- **`report.html` is by far the largest attack surface.** It carries roughly 590 lines of vendor-generated inline CSS and its own inline scripts, and is the only page pulling MailerLite. Every other page shares one consistent head block.
- **MapLibre needs `worker-src blob:`.** Nothing in the repo hints at this; it is internal to the library. A CSP written purely from grep results would have shipped a broken map on `/areas`.
- **`Permissions-Policy: camera=()` collides with the inspection tool.** Detailed above, with the one-token fix.
- **Two Google tags load two copies of gtag.js** and redefine `dataLayer` and `gtag` in two separate inline blocks per page. It works, but it is redundant and doubles the tag payload. Outside the scope of this branch.
