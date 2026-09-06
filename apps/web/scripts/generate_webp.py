# Generates optimized WebP catalogue images (full + thumb) from apps/nvt-stage/images
# and converts the heavy site-wide PNGs to WebP. Run from repo root:
#   python apps/web/scripts/generate_webp.py
import os
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
STAGE = os.path.join(ROOT, "apps", "nvt-stage", "images")
PUB = os.path.join(ROOT, "apps", "web", "public", "images")
CAT = os.path.join(PUB, "catalogue")

FULL_LONG_EDGE = 1100
FULL_Q = 80
THUMB_W = 520
THUMB_Q = 70


def save_webp(im, path, q, long_edge=None, width=None):
    im = im.convert("RGB")
    if long_edge and max(im.size) > long_edge:
        im.thumbnail((long_edge, long_edge), Image.LANCZOS)
    if width and im.width > width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "WEBP", quality=q, method=6)
    print(f"{os.path.relpath(path, ROOT):70s} {os.path.getsize(path)/1024:6.0f} KB  {im.size}")


def convert(src, full_path, thumb_path=None, full_q=FULL_Q, full_edge=FULL_LONG_EDGE, thumb_q=THUMB_Q):
    im = Image.open(src)
    save_webp(im, full_path, full_q, long_edge=full_edge)
    if thumb_path:
        save_webp(im, thumb_path, thumb_q, width=THUMB_W)


def natural_key(name):
    return int("".join(ch for ch in name if ch.isdigit()))


# folder -> (out subfolder, out prefix, source stems in order)
FOLDERS = {
    "suit": ("suit", "cp", ["c1", "c2", "c3", "c4", "c5", "c6", "c8", "c9", "c10", "c11", "c12"]),
    "shirt": ("shirt", "st", [f"s{i}" for i in range(1, 12)]),
    "safari": ("safari", "sf", [f"sh{i}" for i in range(1, 10)]),
    "kurtapajama": ("kurtapajama", "kp", [f"k{i}" for i in range(1, 5)]),
    "khandress": ("khandress", "kd", [f"kh{i}" for i in range(1, 10)]),
}

for src_folder, (out_folder, prefix, stems) in FOLDERS.items():
    src_dir = os.path.join(STAGE, src_folder)
    files = {f.rsplit(".", 1)[0]: f for f in os.listdir(src_dir) if os.path.isfile(os.path.join(src_dir, f))}
    for i, stem in enumerate(stems, start=1):
        src = os.path.join(src_dir, files[stem])
        base = f"{prefix}-{i:02d}"
        convert(src,
                os.path.join(CAT, out_folder, f"{base}.webp"),
                os.path.join(CAT, out_folder, f"{base}-th.webp"))

# Shared sherwani image (used by SH items) + coatpant card image (garments section)
convert(os.path.join(CAT, "Sherwani.png"), os.path.join(CAT, "sherwani.webp"), os.path.join(CAT, "sherwani-th.webp"))
convert(os.path.join(CAT, "coatpant.png"), os.path.join(CAT, "coatpant.webp"))

# Site-wide heavy images -> kebab-case webp next to the originals
SITE_IMAGES = [
    ("hero.png", 78, 1100),
    ("hero-mobile.png", 75, 1100),
    ("hands.png", 78, 1000),
    ("molbi_nadaf.png", 80, 1200),
    ("Bandi.png", 76, 900),
    ("Kurta-Pajama.png", 76, 900),
    ("Safari Suits.png", 76, 900),
    ("Shirts & Pants.png", 76, 900),
    ("Premium Suiting.png", 76, 900),
    ("Shirting Cotton.png", 76, 900),
    ("tools.png", 76, 900),
    ("fabric.png", 60, 800),
]
for fname, q, edge in SITE_IMAGES:
    src = os.path.join(PUB, fname)
    out = os.path.join(PUB, fname.lower().replace(" ", "-").replace("&", "and").rsplit(".", 1)[0] + ".webp")
    convert(src, out, full_q=q, full_edge=edge)

print("done")
