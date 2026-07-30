# Aurea Hosting

The marketing website for Aurea Hosting (aureahosting.com.au), a short-term rental management company in Adelaide, South Australia. The site is a static HTML/CSS/JS site deployed on Cloudflare Pages.

## Repository documentation

| File | Description |
|---|---|
| `BRAND.md` | Brand system reference - colours, typography, tone of voice, extracted from site source |
| `SECURITY-AUDIT.md` | Security headers audit and CSP inventory, dated 2026-07-29 |
| `_headers` | Cloudflare Pages headers file: security headers plus a report-only Content-Security-Policy |

## Deployment

The site is served via Cloudflare Pages and HTTP response headers are configured in the `_headers` file. Cloudflare Pages publishes per-branch preview deployments as described in `SECURITY-AUDIT.md`.
