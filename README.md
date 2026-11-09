# aureahosting

## Purpose

This repository contains the complete website and supporting content for AUREA, a short-stay property management service. It holds all public-facing site pages (home, about, fees, FAQ, areas, contact, and more), owner-facing legal documents and forms, service reports, and a set of internal audit records. The audit files and legal documents capture compliance reviews, security assessments, and owner agreements that must be kept accurate as the business evolves. Service area pages cover each suburb AUREA operates in, and are the primary place to update coverage and local copy.

## Repository structure

### Top-level pages

| File | Description |
|---|---|
| `index.html` | Home page |
| `about.html` | About AUREA page |
| `fees.html` | Fees and pricing page |
| `faq.html` | Frequently asked questions page |
| `areas.html` | Areas overview page |
| `contact.html` | Contact page |
| `report.html` | Performance/yield report page |
| `privacy.html` | Privacy policy page |
| `card.html` | Business card / profile page |
| `404.html` | Custom 404 error page |

### Legal and owner documents

| File | Description |
|---|---|
| `Aurea-Owner-Agreement.html` | Owner agreement document |
| `Aurea-Owner-Appointment-Form.html` | Owner appointment form |

### Audit and compliance records

| File | Description |
|---|---|
| `AUDIT.md` | General site audit notes |
| `AUDIT-2026-04-22.md` | Dated audit from April 2026 |
| `CMS-AUDIT.md` | CMS-specific audit notes |
| `SECURITY-AUDIT.md` | Security audit record |

### Brand and content reference

| File | Description |
|---|---|
| `BRAND.md` | Brand guidelines and style notes |
| `llms.txt` | LLM/AI crawl guidance |
| `robots.txt` | Search engine crawl rules |
| `_headers` | HTTP response headers configuration |
| `_redirects` | URL redirect rules |

### Scripts and data

| File | Description |
|---|---|
| `app.js` | Main site JavaScript |
| `ed-home.js` | Home page editor/enhancement script |
| `data.js` | Site data file |
| `lucide.js` | Icon library |

### Directories

| Directory | Description |
|---|---|
| `areas/` | Individual suburb/area pages (Brighton, CBD, Glenelg, Norwood, Prospect, Stirling) |
| `guides/` | Guest and owner guide templates |
| `tools/` | Internal tooling pages (e.g. property inspection tool) |
| `assets/` | Fonts and email signature assets |
| `images/` | Site images including editorial photography, logos, and icons |

### Other top-level files

| File | Description |
|---|---|
| `aurea-noah.vcf` | Contact card for the founder |
| `f961de789f114dc2b5023ab71e09cc0d.txt` | Domain or service verification file |
| `.gitignore` | Git ignore rules |

## Maintenance

**Service pages:** Individual area pages live in `areas/`. To update suburb coverage, local copy, or area-specific details, edit the relevant file there (e.g. `areas/brighton.html`). The `areas.html` overview page should be updated at the same time if coverage changes.

**Legal and audit documents:** Owner-facing legal documents (`Aurea-Owner-Agreement.html`, `Aurea-Owner-Appointment-Form.html`) and audit records (`AUDIT.md`, `AUDIT-2026-04-22.md`, `CMS-AUDIT.md`, `SECURITY-AUDIT.md`) should be reviewed and kept current whenever terms, compliance requirements, or security practices change. Date new audit entries clearly so the history is easy to follow.

**Reviewing documentation changes:** All changes to this repository, including documentation updates, should go through a pull request so they can be reviewed before merging. For copy or legal document edits, have at least one other team member check for accuracy before the change is published.
