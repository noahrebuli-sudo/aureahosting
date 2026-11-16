#!/usr/bin/env python3
"""Build check for next/ (guide 3.3 and 5.1 C1). Python standard library only.

Usage: python3 scripts/check.py [path ...]   (default: every file under next/)
Exit 0 when there are no failures. Warnings never fail the build.
"""
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
    (r"\b" + NUM + r"\s+(?:homes|properties)\b|\bcapped at\b|\bfifteen\b|\btwenty\b", "home count"),
    (r"appraisal|\byield\b|earning potential|could earn|stronger returns|income calendar|revenue estimate|what your home is worth|free report", "banned phrase"),
    (r"\bpremium\b|\bpremier\b|\bleading\b|\bluxury\b|\bstunning\b|\bnestled\b|world-class|\bunrivalled\b|\bunmatched\b|\bfinest\b|\bexceptional\b|hotel-grade|\bhassle\b|passive income|\bmaximis|\boptimis|\bobsessive\b", "superlative or sales word"),
    (r"\bassets?\b|\bcorridor\b|\bcohort\b|\bSTR\b|\bintel\b|\bupsell\b|demand rating", "old jargon"),
    (r"\bapply\b|\bapplication\b", "'apply' or 'application'"),
    (r"organiz|optimiz|neighbor|favorite|tradeoff", "American spelling"),
    (r"wine on arrival|private chef", "concierge extra not to be mentioned"),
    (r"clause\s+\d|termination|notice period", "contract term"),
]
WARN_WORDS = r"\bbest\b|\bforecast|\bguarantee|\balways\b|\bnever\b|\bevery\b"
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
        for k in ("alt", "title", "aria-label"):
            if a.get(k):
                self.attr_text.append(a[k])
        if tag in ("a", "link", "script", "img", "source", "form"):
            for k in ("href", "src", "action"):
                if a.get(k) is not None:
                    self.hrefs.append((tag, k, a[k], self.region))
                    if tag == "a" and k == "href" and re.match(r"^/fees(?:[/?#]|$)", a[k]):
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

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif not self.skip:
            self.text.append(data)


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
    visible = " ".join(p.text) + " " + " ".join(p.attr_text)
    visible = re.sub(r"\s+", " ", visible)

    # Banned words (3.3), on visible copy and alt/description text, comments excluded.
    for pat, why in BANNED:
        for m in re.finditer(pat, visible, re.I if "STR" not in pat else 0):
            s = max(0, m.start() - 25)
            fail(rel, "%s: '%s' in '...%s...'" % (why, m.group(0), visible[s:m.end() + 25]))
    if not (rel in ("fees.html", "faq.html")):
        for m in MONEY.finditer(visible):
            s = max(0, m.start() - 25)
            fail(rel, "$ or %% outside fees and FAQ cost group: '...%s...'" % visible[s:m.end() + 25])
    elif rel == "faq.html" and MONEY.search(visible):
        warn(rel, "$ or % present: confirm each sits in the cost group")
    if re.search(r"\bapply\b", visible, re.I) is None:
        pass
    for m in EMOJI.finditer(raw):
        fail(rel, "emoji or pictograph U+%04X" % ord(m.group(0)))
    for m in re.finditer(WARN_WORDS, visible, re.I):
        s = max(0, m.start() - 30)
        warn(rel, "read in context: '...%s...'" % visible[s:m.end() + 30])

    # Inline style attributes. Only style="--w:Nch" on .blank is allowed.
    for tag, a in p.styles:
        if not (re.fullmatch(r"--w:\d+ch;?", a.get("style", "").replace(" ", "")) and "blank" in (a.get("class") or "").split()):
            fail(rel, "inline style attribute on <%s>: style=\"%s\"" % (tag, a.get("style")))
    if re.search(r"<style[\s>]", raw, re.I):
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
    d = p.head.get("description")
    if not is404:
        if not d:
            fail(rel, "no meta description")
        elif len(d) > 155:
            fail(rel, "description is %d characters, 155 at most" % len(d))
        if not p.head.get("canonical"):
            fail(rel, "no canonical link")
    if not re.search(r'<meta\s+name="robots"\s+content="noindex, nofollow"', raw):
        fail(rel, 'missing <meta name="robots" content="noindex, nofollow">')

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
            if rcode and re.search(r'href="/fees(?:[/?#"])', rcode):
                fail(rel, "/fees link inside the %s" % rg)

    # Header and footer markers for parity.
    for rg in ("header", "footer"):
        code = region_of(raw, rg)
        if code is None:
            if not is404 or rg == "header":
                fail(rel, "missing <!-- %s:start --> / <!-- %s:end --> markers" % (rg, rg))
        else:
            regions_store.setdefault(rg, {})[rel] = norm_region(code)


def check_text(full, rel):
    with open(full, "rb") as fh:
        raw = fh.read().decode("utf-8", "replace")
    for ch, label in ((chr(0x2014), "em dash"), (chr(0x2013), "en dash")):
        for n, line in enumerate(raw.split("\n"), 1):
            if ch in line:
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
        check_text(full, rel)
        if rel.endswith(".html"):
            htmls += 1
            check_html(full, rel, regions)
    for rg, pages in regions.items():
        base_rel = sorted(pages)[0]
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
