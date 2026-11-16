#!/usr/bin/env node
// Full-page screenshots and the no-overflow check (guide 5.1 C2).
//
// Usage: node scripts/shots.mjs [--out DIR] [--base URL] <path> [<path> ...]
//   paths are URL paths such as / /about /areas/glenelg (default: /)
//   --out   output folder (default: <system temp>/aurea-shots; never inside the repo)
//   --base  server (default http://localhost:8080, start it with: python3 scripts/serve.py)
//
// Needs Playwright. No package.json is committed, so it is found at run time:
//   1. a normal `import('playwright')`
//   2. PW_DIR (a node_modules folder) or the global npm root
// Install once with:  npm i --prefix /tmp/pw playwright && PW_DIR=/tmp/pw/node_modules
// Set CHROME_PATH to use an existing Chrome or Chromium instead of the Playwright download.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const args = process.argv.slice(2);
let out = join(tmpdir(), 'aurea-shots');
let base = 'http://localhost:8080';
const paths = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') out = args[++i];
  else if (args[i] === '--base') base = args[++i];
  else paths.push(args[i]);
}
if (!paths.length) paths.push('/');

async function loadPlaywright() {
  try { return await import('playwright'); } catch (_) { /* fall through */ }
  const roots = [];
  if (process.env.PW_DIR) roots.push(process.env.PW_DIR);
  try { roots.push(execSync('npm root -g', { encoding: 'utf8' }).trim()); } catch (_) {}
  for (const r of roots) {
    try { return createRequire(join(r, 'x.js'))('playwright'); } catch (_) { /* next */ }
  }
  console.error('Playwright not found. Install it (npm i --prefix /tmp/pw playwright) and set PW_DIR=/tmp/pw/node_modules.');
  process.exit(2);
}

const pw = await loadPlaywright();
const chromium = pw.chromium || pw.default.chromium;
mkdirSync(out, { recursive: true });

const SHOT_SIZES = [[390, 844], [1440, 900]];
const OVERFLOW_WIDTHS = [390, 600, 768, 900, 1024, 1200, 1440];
const slug = (p) => (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '-'));

const launch = { headless: true };
if (process.env.CHROME_PATH) launch.executablePath = process.env.CHROME_PATH;
const browser = await chromium.launch(launch);
let bad = 0;

for (const p of paths) {
  const url = base + p;
  for (const [w, h] of SHOT_SIZES) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const res = await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const file = join(out, `${slug(p)}-${w}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`${res.status()} ${p} ${w}x${h} height ${height}px -> ${file}`);
    await page.close();
  }
  for (const w of OVERFLOW_WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(url, { waitUntil: 'networkidle' });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    if (sw > w) { bad++; console.log(`OVERFLOW ${p} at ${w}: scrollWidth ${sw}`); }
    await page.close();
  }
  console.log(`${p} overflow check done at ${OVERFLOW_WIDTHS.join(', ')}`);
}
await browser.close();
process.exit(bad ? 1 : 0);
