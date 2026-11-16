#!/usr/bin/env python3
"""Build check for next/ (guide 3.3 and 5.1 C1). Python standard library only.

Usage: python3 scripts/check.py [path ...]   (default: every file under next/)
Exit 0 when there are no failures. Warnings never fail the build.
"""
import html as htmllib
import os
import re
import sys
from html.parser import HTMLParser

ROOT = os.path.realpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "next"))
TEXT_EXT = (".html", ".css", ".js", ".svg", ".txt", ".xml", ".json", ".md")

fails, warns = [], []


def fail(f, msg):
    fails.append("%s: %s" % (f, msg))


def warn(f, msg):
    warns.append("%s: %s" % (f, msg))


NUM = r"(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)"
BANNED = [
    (r"24/7|24-7|around the clock|day and night|every hour", "banned phrase"),
    (r"guest[- ]ready", "say 'ready for guests'"),
    (r"\bone person\b|\bone manager\b|\bone point of contact\b|\bsingle operator\b|\bsolo\b", "banned phrase"),
    (r"\b" + NUM + r"[+\s]*(?:homes|properties)\b|\bcapped at\b|\bfifteen\b|\btwenty\b", "home count"),
    (r"appraisal|\byield\b|earning potential|could earn|stronger returns|income calendar|revenue estimate|what your home is worth|free report", "banned phrase"),
    (r"\bpremium\b|\bpremier\b|\bleading\b|\bluxury\b|\bstunning\b|\bnestled\b|world-class|\bunrivalled\b|\bunmatched\b|\bfinest\b|\bexceptional\b|hotel-grade|\bhassle\b|passive income|\bmaximi[sz]|\bobsessive\b", "superlative or sales word"),
    (r"\boptimis", "superlative or sales word"),
    (r"\bassets?\b|\bcorridor\b|\bcohort\b|(?-i:\bSTR\b)|\bintel\b|\bupsell\b|demand rating", "old jargon"),
    (r"\bapply\b|\bapplication\b", "'apply' or 'application'"),
    (r"organiz|optimiz|neighbor|favorite|tradeoff", "American spelling"),
    (r"wine on arrival|private chef", "concierge extra not to be mentioned"),
    (r"clause\s+\d|termination|notice period", "contract term"),
]
# Main's text carried word for word (guide 4.9, 4.10): exempt from these two rules only.
EXEMPT_FILES = ("privacy.html", "fees.html")
# Carried legal documents (owner contract pages and their legacy css and js): exempt from the page rules.
def carried(rel):
    return (rel.startswith("Aurea-Owner-") and rel.endswith(".html")) or rel.startswith("legacy/")
EXEMPT_PATTERNS = (r"\bapply\b|\bapplication\b", r"\boptimis")
FEES_URL = r"(?:https?://(?:www\.)?aureahosting\.com\.au)?/fees"
WARN_NUMBERS = r"\boccupancy\b|\buplift\b|\b\d+(?:\.\d+)?\s*points?\b"
WARN_WORDS = r"\bbest\b|\bforecast|\bguarantee|\balways\b|\bnever\b|\bevery\b"
NOINDEX_FILES = ("404.html", "card.html", "kit.html")
PUBLIC_PLACE = "A public place, not a managed home."
GLYPHS = os.path.join(ROOT, "assets", "glyphs.svg")


def glyph_ids():
    try:
        with open(GLYPHS, "rb") as fh:
            return set(re.findall(r'<symbol\b[^>]*\bid="([^"]+)"', fh.read().decode("utf-8", "replace")))
    except OSError:
        return set()


EMOJI = re.compile("[\U0001F000-\U0001FAFF☀-➿⬀-⯿️‍]")
MONEY = re.compile(r"[$%]")


class Page(HTMLParser):
    """Collects what the checks need from one HTML file."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.text = []
        self.attr_text = []
        self.hrefs = []
        self.ids = set()
        self.anchors = []
        self.headings = []
        self.styles = []
        self.skip = 0
        self.stack = []
        self.head = {}
        self.in_title = False
        self.title = ""
        self.htmllang = None
        self.region = None
        self.regions = {"header": [], "footer": []}
        self.raw_regions = {}
        self.fees_links = []
        self.comments = []
        self.imgs = []
        self.srcsets = []
        self.uses = []
        self.facts = []
        self.figures = []
        self.fig_stack = []

    def handle_comment(self, data):
        self.comments.append(data)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.htmllang = a.get("lang")
        if tag in ("script", "style"):
            self.skip += 1
        if tag == "title":
            self.in_title = True
        if tag == "img":
            self.imgs.append(a)
            for f in self.fig_stack:
                f["img"] = True
        for k in ("srcset", "imagesrcset"):
            if a.get(k):
                self.srcsets.append((tag, k, a[k]))
        if tag == "use":
            h = a.get("href") if a.get("href") is not None else a.get("xlink:href")
            if h is not None:
                self.uses.append(h)
        if a.get("data-fact") == "pending":
            self.facts.append((tag, "hidden" in a))
        if tag == "figure":
            self.fig_stack.append({"slot": a.get("data-slot"), "cls": (a.get("class") or "").split(), "img": False, "text": []})
        if "id" in a:
            self.ids.add(a["id"])
        if "style" in a:
            self.styles.append((tag, a))
        if tag == "meta":
            key = a.get("name") or a.get("property")
            if key:
                self.head[key] = a.get("content", "")
            for k in ("content",):
                if a.get(k) and a.get("name") in ("description",):
                    self.attr_text.append(a[k])
        if tag == "link" and a.get("rel") == "canonical":
            self.head["canonical"] = a.get("href", "")
        if tag == "meta" and (a.get("property") or "") in ("og:title", "og:description") and a.get("content"):
            self.attr_text.append(a["content"])
        for k in ("alt", "title", "aria-label", "placeholder", "value"):
            if a.get(k):
                self.attr_text.append(a[k])
        if tag in ("a", "link", "script", "img", "source", "form"):
            for k in ("href", "src", "action"):
                if a.get(k) is not None:
                    self.hrefs.append((tag, k, a[k], self.region))
                    if tag == "a" and k == "href" and re.match(r"^" + FEES_URL + r"(?:[/?#]|$)", a[k]):
                        self.fees_links.append(self.region)
        if tag == "a" and a.get("href", "").startswith("#") and len(a["href"]) > 1:
            self.anchors.append(a["href"][1:])
        m = re.match(r"h([1-6])$", tag)
        if m:
            self.headings.append(int(m.group(1)))
        if tag in ("header", "footer", "nav") and self.region is None and tag in ("header", "footer"):
            pass

    def handle_endtag(self, tag):
        if tag in ("script", "style") and self.skip:
            self.skip -= 1
        if tag == "title":
            self.in_title = False
        if tag == "figure" and self.fig_stack:
            self.figures.append(self.fig_stack.pop())

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif not self.skip:
            self.text.append(data)
            for f in self.fig_stack:
                f["text"].append(data)


def strip_comments(s):
    return re.sub(r"<!--.*?-->", "", s, flags=re.S)


def region_of(raw, name):
    m = re.search(r"<!--\s*%s:start\s*-->(.*?)<!--\s*%s:end\s*-->" % (name, name), raw, re.S)
    return m.group(1) if m else None


def norm_region(s):
    s = re.sub(r'\s+aria-current="page"', "", s)
    return re.sub(r"\s+", " ", s).strip()


def resolves(href):
    path = re.split(r"[?#]", href)[0]
    if path == "/":
        return os.path.isfile(os.path.join(ROOT, "index.html"))
    rel = path.lstrip("/")
    base, ext = os.path.splitext(rel)
    if ext:
        return os.path.isfile(os.path.join(ROOT, rel))
    return os.path.isfile(os.path.join(ROOT, rel + ".html"))


def check_html(full, rel, regions_store):
    with open(full, "rb") as fh:
        rawb = fh.read()
    if rawb.startswith(b"\xef\xbb\xbf"):
        fail(rel, "BOM present")
    raw = rawb.decode("utf-8", "replace")
    name = os.path.basename(rel)
    p = Page()
    p.feed(raw)
    p.close()
    p.figures.extend(p.fig_stack)  # figures never closed still get checked
    visible = " ".join(p.text) + " " + p.title + " " + " ".join(p.attr_text)
    visible = re.sub(r"\s+", " ", visible)

    # Banned words (3.3), on visible copy and alt/description text, comments excluded.
    noted = False
    for pat, why in BANNED:
        if name in EXEMPT_FILES and pat in EXEMPT_PATTERNS:
            if re.search(pat, visible, re.I) and not noted:
                print("NOTE %s: exempt from apply/application and optimis rules (main's text, guide 4.9 and 4.10)" % rel)
                noted = True
            continue
        for m in re.finditer(pat, visible, re.I):
            s = max(0, m.start() - 25)
            fail(rel, "%s: '%s' in '...%s...'" % (why, m.group(0), visible[s:m.end() + 25]))
    if not (rel in ("fees.html", "faq.html")):
        for m in MONEY.finditer(visible):
            s = max(0, m.start() - 25)
            fail(rel, "$ or %% outside fees and FAQ cost group: '...%s...'" % visible[s:m.end() + 25])
    elif rel == "faq.html" and MONEY.search(visible):
        warn(rel, "$ or % present: confirm each sits in the cost group")
    for m in re.finditer(WARN_NUMBERS, visible, re.I):
        s0 = max(0, m.start() - 30)
        warn(rel, "occupancy, uplift or points figure, read in context: '...%s...'" % visible[s0:m.end() + 30])
    for m in EMOJI.finditer(raw):
        fail(rel, "emoji or pictograph U+%04X" % ord(m.group(0)))
    for m in re.finditer(WARN_WORDS, visible, re.I):
        s = max(0, m.start() - 30)
        warn(rel, "read in context: '...%s...'" % visible[s:m.end() + 30])

    # Inline style attributes. Only style="--w:Nch" on .blank is allowed.
    iscard = name == "card.html"
    if iscard:
        print("NOTE card.html: standalone contact card, exempt from shell markers, canonical, description and inline style rules")
    for tag, a in ([] if iscard else p.styles):
        if not (re.fullmatch(r"--w:\d+ch;?", a.get("style", "").replace(" ", "")) and "blank" in (a.get("class") or "").split()):
            fail(rel, "inline style attribute on <%s>: style=\"%s\"" % (tag, a.get("style")))
    if not iscard and re.search(r"<style[\s>]", raw, re.I):
        fail(rel, "<style> block (page-specific CSS is not allowed)")

    # Head requirements.
    if p.htmllang != "en-AU":
        fail(rel, "html lang is %r, need en-AU" % p.htmllang)
    t = p.title.strip()
    if not t:
        fail(rel, "no title")
    elif len(t) > 60:
        fail(rel, "title is %d characters, 60 at most" % len(t))
    is404 = name == "404.html"
    iskit = name == "kit.html" and "/" not in rel
    d = p.head.get("description")
    if not is404 and not iscard and not iskit:
        if not d:
            fail(rel, "no meta description")
        elif len(d) > 155:
            fail(rel, "description is %d characters, 155 at most" % len(d))
        if not p.head.get("canonical"):
            fail(rel, "no canonical link")
    has_noindex = re.search(r'<meta\s+name="robots"\s+content="noindex', raw)
    if rel in NOINDEX_FILES:
        if not has_noindex:
            fail(rel, 'missing <meta name="robots" content="noindex, nofollow">')
    elif has_noindex:
        fail(rel, 'indexable page still carries a robots noindex tag')

    # Pass 2 rules. (2) img attributes.
    for a in p.imgs:
        if iscard and (a.get("src") or "").startswith("https://www.facebook.com/tr?"):
            continue  # the noscript Meta pixel, the one image exempt
        miss = [k for k in ("width", "height", "alt") if k not in a]
        if miss:
            fail(rel, "<img src=%r> missing %s" % (a.get("src"), ", ".join(miss)))
    # (3) every srcset URL resolves.
    for tag, k, val in p.srcsets:
        for cand in val.split(","):
            u = cand.strip().split()
            if not u:
                continue
            u = u[0]
            if re.match(r"^(https?:|data:)", u):
                continue
            if not u.startswith("/"):
                fail(rel, "%s %s URL %r is not root-relative" % (tag, k, u))
            elif not resolves(u):
                fail(rel, "%s %s URL %r does not resolve to a file in next/" % (tag, k, u))
    # (4) glyph references name a real symbol.
    gids = glyph_ids()
    for h in p.uses:
        m = re.fullmatch(r"/assets/glyphs\.svg#([A-Za-z0-9_-]+)", h)
        if m:
            if m.group(1) not in gids:
                fail(rel, "<use href=%r>: no symbol id %r in assets/glyphs.svg" % (h, m.group(1)))
        elif re.fullmatch(r"#[A-Za-z0-9_-]+", h):
            if h[1:] not in p.ids:
                fail(rel, "<use href=%r>: no symbol with that id in this page" % h)
        else:
            fail(rel, "<use href=%r> must be #id or exactly /assets/glyphs.svg#id" % h)
    # (5) pending facts stay hidden.
    for tag, hidden in p.facts:
        if not hidden:
            fail(rel, 'data-fact="pending" on <%s> without hidden' % tag)
    # (6) place frames and plates.
    for f in p.figures:
        ftext = re.sub(r"\s+", " ", "".join(f["text"]))
        if "plate" in f["cls"] and not f["slot"]:
            fail(rel, "<figure class=\"%s\"> has no data-slot" % " ".join(f["cls"]))
        if (f["slot"] or "").startswith("A") and f["img"] and PUBLIC_PLACE not in ftext:
            fail(rel, 'figure data-slot=%r has an <img> but not "%s"' % (f["slot"], PUBLIC_PLACE))
    # (7) "we manage" outside Glenelg.
    for m in re.finditer(r"\bwe manage\b(?! fewer)", visible, re.I):
        s0 = max(0, m.start() - 25)
        msg = "'we manage' in '...%s...'" % visible[s0:m.end() + 25]
        if rel.startswith("areas/") and name != "glenelg.html":
            fail(rel, msg + " (only the Glenelg page may say it)")
        else:
            warn(rel, msg)

    # Links.
    for tag, k, href, region in p.hrefs:
        if re.match(r"^(https?:|mailto:|tel:|data:|javascript:)", href):
            if href.startswith("javascript:"):
                fail(rel, "javascript: link")
            continue
        if href.startswith("#"):
            continue
        if tag == "link" and k == "href" and False:
            continue
        if not href.startswith("/"):
            fail(rel, "%s %s=%r is not root-relative" % (tag, k, href))
            continue
        path = re.split(r"[?#]", href)[0]
        if tag == "a" and path.endswith(".html"):
            fail(rel, "href %r has .html" % href)
        elif not resolves(href):
            fail(rel, "%s %s=%r does not resolve to a file in next/" % (tag, k, href))

    # Anchors.
    for a in p.anchors:
        if a not in p.ids:
            fail(rel, "anchor #%s has no matching id" % a)

    # Headings.
    h1 = p.headings.count(1)
    if h1 != 1:
        fail(rel, "%d h1 elements, need exactly 1" % h1)
    prev = 0
    for h in p.headings:
        if prev and h > prev + 1:
            fail(rel, "heading level skipped (h%d after h%d)" % (h, prev))
        prev = h

    # /fees link placement: only in the body of about.html and faq.html, never in header or footer.
    if p.fees_links:
        if name not in ("about.html", "faq.html"):
            fail(rel, "/fees link outside about and faq")
        for rg in ("header", "footer"):
            rcode = region_of(raw, rg)
            if rcode and re.search(r'href="' + FEES_URL + r'(?:[/?#"])', rcode):
                fail(rel, "/fees link inside the %s" % rg)

    # Header and footer markers for parity.
    for rg in ("header", "footer"):
        code = region_of(raw, rg)
        if code is None:
            if not iscard and (not is404 or rg == "header"):
                fail(rel, "missing <!-- %s:start --> / <!-- %s:end --> markers" % (rg, rg))
        else:
            regions_store.setdefault(rg, {})[rel] = norm_region(code)


def check_text(full, rel):
    with open(full, "rb") as fh:
        raw = fh.read().decode("utf-8", "replace")
    for ch, label in ((chr(0x2014), "em dash"), (chr(0x2013), "en dash")):
        for n, line in enumerate(raw.split("\n"), 1):
            if ch in line or ch in htmllib.unescape(line):
                fail(rel, "%s on line %d" % (label, n))

    if not rel.endswith(".html"):
        for m in EMOJI.finditer(raw):
            fail(rel, "emoji or pictograph U+%04X" % ord(m.group(0)))


def main():
    args = sys.argv[1:]
    files = []
    if args:
        for a in args:
            files.append(os.path.realpath(a))
    else:
        for d, _, fs in os.walk(ROOT):
            for f in fs:
                if f.endswith(TEXT_EXT):
                    files.append(os.path.join(d, f))
    regions = {}
    htmls = 0
    for full in sorted(files):
        rel = os.path.relpath(full, ROOT).replace(os.sep, "/")
        if rel.startswith(".."):
            print("skip (outside next/): %s" % full)
            continue
        if carried(rel):
            print("NOTE %s: carried legal document or legacy asset, exempt from page rules" % rel)
            continue
        check_text(full, rel)
        if rel.endswith(".html"):
            htmls += 1
            check_html(full, rel, regions)
    # Parity is always measured against next/index.html, even on a single-file run.
    idx = os.path.join(ROOT, "index.html")
    if args and os.path.isfile(idx):
        with open(idx, "rb") as fh:
            iraw = fh.read().decode("utf-8", "replace")
        for rg in ("header", "footer"):
            code = region_of(iraw, rg)
            if code is not None:
                regions.setdefault(rg, {}).setdefault("index.html", norm_region(code))
    for rg, pages in regions.items():
        base_rel = "index.html" if "index.html" in pages else sorted(pages)[0]
        for rel, code in pages.items():
            if code != pages[base_rel]:
                fail(rel, "%s differs from %s between markers" % (rg, base_rel))
    for w in warns:
        print("WARN " + w)
    for f in fails:
        print("FAIL " + f)
    print("\n%d html page(s), %d failure(s), %d warning(s)" % (htmls, len(fails), len(warns)))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
