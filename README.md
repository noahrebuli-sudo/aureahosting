# aureahosting

Website for Aurea Hosting at aureahosting.com.au.

## Repository layout

**`next/`** is the deployed site root. Cloudflare Pages serves the `next/`
directory verbatim as the live site at aureahosting.com.au, and has done so
since the 17 Nov 2026 cutover. All edits to live pages belong under `next/`.

HTML, CSS, and JS files at the repository root outside `next/` are
pre-cutover legacy copies. They are not deployed and should not be edited
for live-site changes.

## Email assets

`next/assets/email/` holds files that are hotlinked from email signatures and
other places that cannot be updated retroactively. See
`next/assets/email/README.md` for the permanent, never-rename rules that
govern every file in that directory.

## Scripts

**Build checks**

```
python3 scripts/check.py [path ...]
```

Runs build checks against `next/`. With no arguments, checks every text file
under `next/`. Exits 0 when there are no failures. Warnings do not cause a
non-zero exit.

**Local server**

```
python3 scripts/serve.py [port]
```

Serves `next/` locally on port 8080 by default (pass a port number to
override). Maps extensionless URLs to their `.html` files, mirroring the live
host behaviour.

Other scripts present in `scripts/` (`img.py`, `shots.mjs`, `build_map.py`)
are not documented here.
