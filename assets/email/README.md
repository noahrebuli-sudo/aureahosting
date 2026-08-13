# /assets/email — permanent external-reference assets

**Do not rename, move, or delete anything in this directory.**

Files here are hotlinked from outside the website — email signatures, PDFs, and
other places we cannot update retroactively. If a file is renamed or removed,
every message already sent shows a broken image forever.

| File | Live URL | Referenced from |
| --- | --- | --- |
| `noblestr-signature.png` | `https://aureahosting.com.au/assets/email/noblestr-signature.png` | Noble STR email signature (all outgoing mail) |
| `noah-lockup.png` | `https://aureahosting.com.au/assets/email/noah-lockup.png` | Aurea signature lockup, Noah's email signature (all outgoing mail) |

## Rules

- Paths are permanent. Never rename a file or this directory.
- Never route these through a bundler, image pipeline, or anything that hashes
  or rewrites filenames. Cloudflare Pages serves this directory verbatim from
  the repo root, which is what keeps the URL stable across deploys.
- To update artwork, overwrite the file in place at the same path and same
  dimensions. Do not add a version suffix.
- Do not add `Disallow` rules covering `/assets/` to `robots.txt`, and do not
  add auth, Cloudflare Access, or hotlink-protection rules over this path —
  email clients fetch these images anonymously with a foreign referer.

## noblestr-signature.png

400 x 395, PNG (256-colour palette), ~40 KB, solid white background, no EXIF.
Sized at 2x for a 200px display width in the signature:

```html
<img src="https://aureahosting.com.au/assets/email/noblestr-signature.png"
     width="200" alt="Noble STR">
```

## noah-lockup.png

300 x 232, PNG (8-bit RGBA), ~58 KB, transparent background. Already optimised —
do not recompress, convert, or resize it; re-encoding is what silently flattens
the alpha channel to white. Sized at 2x for a 150px display width in the
signature:

```html
<img src="https://aureahosting.com.au/assets/email/noah-lockup.png"
     width="150" alt="Aurea Hosting">
```

Transparency does not render in every email client (older Outlook composites it
onto the message background, which is white in practice). Keep the surrounding
signature background light so the lockup reads correctly either way.
