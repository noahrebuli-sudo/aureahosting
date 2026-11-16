#!/usr/bin/env python3
"""Local server for the Aurea site root (next/). Python standard library only.

Usage: python3 scripts/serve.py [port]   (default 8080)

- Serves next/ as the site root.
- Maps extensionless URLs to files: /about -> about.html, /areas/glenelg -> areas/glenelg.html,
  / -> index.html.
- Redirects /x.html and /index to the extensionless URL (301), as the live host does.
- Gzips text responses (html, css, js, json, svg, xml, txt) when the client accepts it.
- A miss returns 404.html with status 404 (a plain fallback page if 404.html does not exist yet).
"""
import gzip
import mimetypes
import os
import sys
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit

ROOT = os.path.realpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "next"))
TEXT_TYPES = ("text/", "application/javascript", "application/json", "image/svg+xml", "application/xml")
FALLBACK_404 = b"<!doctype html><html lang=\"en-AU\"><meta charset=\"utf-8\"><title>Page not found</title><h1>Page not found</h1>"

mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("image/avif", ".avif")


def resolve(path):
    """Return a file path inside ROOT for a URL path, or None."""
    rel = unquote(path).lstrip("/")
    candidates = ["index.html"] if rel == "" else [rel, rel + ".html"]
    for c in candidates:
        full = os.path.realpath(os.path.join(ROOT, c))
        if (full == ROOT or full.startswith(ROOT + os.sep)) and os.path.isfile(full):
            return full
    return None


class Handler(SimpleHTTPRequestHandler):
    server_version = "AureaServe/1.0"

    def log_message(self, fmt, *args):
        sys.stderr.write("%s %s\n" % (self.command, fmt % args))

    def send_body(self, status, body, ctype, extra=None):
        accepts = "gzip" in self.headers.get("Accept-Encoding", "")
        if accepts and ctype.startswith(TEXT_TYPES) and len(body) > 256:
            body = gzip.compress(body, 6)
            gz = True
        else:
            gz = False
        self.send_response(status)
        self.send_header("Content-Type", ctype)
        if gz:
            self.send_header("Content-Encoding", "gzip")
        self.send_header("Vary", "Accept-Encoding")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache")
        for k, v in (extra or {}).items():
            self.send_header(k, v)
        self.end_headers()
        return body

    def respond(self, head_only):
        parts = urlsplit(self.path)
        path = parts.path
        # Canonicalise: /x.html and /index go to /x and /.
        clean = None
        if path.endswith(".html"):
            clean = path[:-5]
        if clean is not None:
            if clean.endswith("/index") or clean == "/index" or clean == "index":
                clean = clean[: -len("index")] or "/"
            target = (clean or "/") + ("?" + parts.query if parts.query else "")
            self.send_response(HTTPStatus.MOVED_PERMANENTLY)
            self.send_header("Location", target)
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        if path == "/index":
            self.send_response(HTTPStatus.MOVED_PERMANENTLY)
            self.send_header("Location", "/")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        full = resolve(path)
        if full:
            status = HTTPStatus.OK
        else:
            full = os.path.join(ROOT, "404.html")
            status = HTTPStatus.NOT_FOUND
        if os.path.isfile(full):
            with open(full, "rb") as fh:
                data = fh.read()
            ctype = mimetypes.guess_type(full)[0] or "application/octet-stream"
        else:
            data, ctype = FALLBACK_404, "text/html"
        if ctype.startswith("text/") or ctype in ("application/javascript", "application/json"):
            ctype += "; charset=utf-8"
        body = self.send_body(status, data, ctype)
        if not head_only:
            self.wfile.write(body)

    def do_GET(self):
        self.respond(False)

    def do_HEAD(self):
        self.respond(True)

    def do_POST(self):
        # Form posts go to the live endpoint in the browser; locally just refuse.
        self.send_error(HTTPStatus.METHOD_NOT_ALLOWED)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    srv = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print("Serving %s on http://localhost:%d" % (ROOT, port))
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
