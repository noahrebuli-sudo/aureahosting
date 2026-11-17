#!/usr/bin/env python3
"""Image pipeline for Aurea photographs (guide 3.8). Run by hand, never by a build.

Use: python3 scripts/img.py <slot> <source file> --ratio 4:5 [--focus 50,40] [--no-grade] [--avif-q 55]

Steps, in order: apply the phone's rotation, convert to sRGB, crop to the ratio
around the focus point, apply the one grade, resize to 480, 800 and 1200 wide,
write AVIF (quality 55) and JPEG (quality 78, progressive) for each width to
next/images/p/<slot>-<width>.<ext>. Only pixels are written, so no EXIF, GPS,
device data or ICC profile survives. Prints the <picture> block.

Originals never enter the repo. Keep them in a folder outside the clone.
"""
import argparse
import io
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageCms, ImageOps, ImageEnhance, features, __version__ as PIL_VERSION
except ImportError:
    sys.exit("Pillow is missing. Install Pillow 11.3 or later with AVIF support.")

WIDTHS = (480, 800, 1200)
AVIF_Q, JPEG_Q = 55, 78
OUT = Path(__file__).resolve().parent.parent / "next" / "images" / "p"


def need_avif():
    ver = tuple(int(x) for x in re.findall(r"\d+", PIL_VERSION)[:2])
    if ver < (11, 3) or not features.check("avif"):
        sys.exit(f"Pillow 11.3 or later with AVIF support is required (found {PIL_VERSION}, "
                 f"avif={features.check('avif')}). Nothing was written.")


def to_srgb(im):
    icc = im.info.get("icc_profile")
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            im = ImageCms.profileToProfile(im, src, ImageCms.createProfile("sRGB"),
                                           outputMode="RGB")
        except Exception:
            im = im.convert("RGB")
    return im.convert("RGB")


def crop(im, ratio, focus):
    rw, rh = ratio
    w, h = im.size
    if w * rh > h * rw:            # too wide: trim width
        cw, ch = round(h * rw / rh), h
    else:                          # too tall: trim height
        cw, ch = w, round(w * rh / rw)
    fx, fy = focus
    left = min(max(round(w * fx / 100 - cw / 2), 0), w - cw)
    top = min(max(round(h * fy / 100 - ch / 2), 0), h - ch)
    return im.crop((left, top, left + cw, top + ch))


def grade(im):
    """Saturation x0.94, red x1.02, blue x0.97, blacks lifted 3 percent."""
    im = ImageEnhance.Color(im).enhance(0.94)
    r, g, b = im.split()
    lift = 0.03 * 255
    def lut(gain):
        return [min(255, max(0, round(lift + (1 - 0.03) * min(255, i * gain)))) for i in range(256)]
    return Image.merge("RGB", (r.point(lut(1.02)), g.point(lut(1.0)), b.point(lut(0.97))))


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("slot")
    p.add_argument("source")
    p.add_argument("--ratio", required=True, help="for example 4:5")
    p.add_argument("--focus", default="50,50", help="percent from left and top")
    p.add_argument("--no-grade", action="store_true", help="studio portrait only")
    p.add_argument("--avif-q", type=int, default=AVIF_Q, help="AVIF quality, default %d. Lower it only when a frame passes the byte budget" % AVIF_Q)
    a = p.parse_args()

    need_avif()
    slot = a.slot.lower()
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", slot):
        sys.exit("Slot must be lower case letters, digits and hyphens.")
    try:
        rw, rh = (int(x) for x in a.ratio.split(":"))
        fx, fy = (float(x) for x in a.focus.split(","))
        assert rw > 0 and rh > 0 and 0 <= fx <= 100 and 0 <= fy <= 100
    except Exception:
        sys.exit("Bad --ratio (use 4:5) or --focus (use 50,40).")
    src = Path(a.source)
    if not src.is_file():
        sys.exit(f"Source not found: {src}")
    if OUT in src.resolve().parents or str(src.resolve()).startswith(str(OUT.parent.parent.parent)):
        print("Warning: source sits inside the repo. Keep originals outside the clone.", file=sys.stderr)

    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
    im = to_srgb(im)
    im = crop(im, (rw, rh), (fx, fy))
    if not a.no_grade:
        im = grade(im)

    widths = [w for w in WIDTHS if w <= im.width]
    if not widths:
        widths = [im.width]
    if im.width < WIDTHS[-1]:
        print(f"Source is {im.width} px wide after crop, under 1200. Writing widths {widths} only.")

    OUT.mkdir(parents=True, exist_ok=True)
    sizes = {}
    for w in widths:
        h = round(w * im.height / im.width)
        rs = im.resize((w, h), Image.LANCZOS) if w != im.width else im.copy()
        # fresh image, no info dict: pixels only
        clean = Image.new("RGB", rs.size)
        clean.paste(rs)
        for ext, kw in (("avif", dict(format="AVIF", quality=a.avif_q)),
                        ("jpg", dict(format="JPEG", quality=JPEG_Q, progressive=True, optimize=True))):
            f = OUT / f"{slot}-{w}.{ext}"
            clean.save(f, **kw)
            print(f"wrote {f.relative_to(OUT.parent.parent.parent)}  {w}x{h}  {f.stat().st_size / 1024:.1f} KB")
        sizes[w] = h

    big = widths[-1]
    print("\n<picture>")
    print("  <source type=\"image/avif\" srcset=\"" +
          ", ".join(f"/images/p/{slot}-{w}.avif {w}w" for w in widths) + "\" sizes=\"SIZES\">")
    print("  <img src=\"/images/p/" + f"{slot}-{big}.jpg\" srcset=\"" +
          ", ".join(f"/images/p/{slot}-{w}.jpg {w}w" for w in widths) +
          f"\" sizes=\"SIZES\" width=\"{big}\" height=\"{sizes[big]}\" alt=\"ALT\" loading=\"lazy\" decoding=\"async\">")
    print("</picture>")
    print("Replace SIZES with the value for the slot kind in guide 3.8, and ALT with the caption-matched alt text.")


if __name__ == "__main__":
    main()
