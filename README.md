# aureahosting

The AUREA Hosting website repository.

## Repository structure

`next/` is the canonical, deployed site directory. Cloudflare Pages serves the
live site from `next/` following the 17 Nov 2026 cutover documented in
[next/assets/email/README.md](next/assets/email/README.md).

The HTML, JS, and CSS files at the repository root are the pre-cutover copies
and are **not deployed**. Edits intended for the live site must be made under
`next/`.

### Notable directories inside `next/`

- **`next/assets/email/`** - Contains permanently-hotlinked assets (email
  signature images) that are referenced from outside the website and cannot be
  moved or renamed. See [next/assets/email/README.md](next/assets/email/README.md)
  for the rules covering this directory.

- **`next/legacy/`** - Contains older copies of `app.js` and `styles.css` whose
  status is undetermined. Do not delete these files without first verifying that
  nothing references them.
