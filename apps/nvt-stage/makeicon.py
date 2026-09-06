# Generates NVT app icon, adaptive icon foreground and splash logo.
from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.join(os.path.dirname(__file__), "brand")
os.makedirs(OUT, exist_ok=True)

MAROON = (59, 12, 12, 255)      # #3B0C0C hero maroon
GOLD = (201, 168, 76, 255)      # #C9A84C catalogue gold
CREAM = (241, 216, 167, 255)    # #F1D8A7

cormorant = os.path.join(os.path.dirname(__file__), "fonts", "cormorant-700.ttf")
outfit = os.path.join(os.path.dirname(__file__), "fonts", "outfit-600.ttf")


def nvt_monogram(size, monogram_h_ratio=0.42):
    """Transparent image with gold NVT monogram + small caption, centered."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    f_big = ImageFont.truetype(cormorant, int(size * monogram_h_ratio))
    text = "NVT"
    bbox = d.textbbox((0, 0), text, font=f_big)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    cx, cy = size / 2, size * 0.47
    d.text((cx - w / 2 - bbox[0], cy - h / 2 - bbox[1]), text, font=f_big, fill=GOLD)
    # thin gold rule + caption under monogram
    cap = "NEW VISHAL TAILORS"
    f_cap = ImageFont.truetype(outfit, int(size * 0.045))
    cb = d.textbbox((0, 0), cap, font=f_cap)
    cw = cb[2] - cb[0]
    ry = cy + h / 2 + size * 0.055
    d.line([(cx - size * 0.18, ry), (cx + size * 0.18, ry)], fill=GOLD, width=max(2, size // 240))
    d.text((cx - cw / 2 - cb[0], ry + size * 0.015), cap, font=f_cap, fill=CREAM)
    return img


# 1. Main app icon: opaque maroon, full bleed, monogram sized for visibility
icon = Image.new("RGBA", (1024, 1024), MAROON)
d = ImageDraw.Draw(icon)
d.rounded_rectangle([28, 28, 996, 996], radius=120, outline=GOLD, width=10)
mono = nvt_monogram(1024, 0.40)
icon.alpha_composite(mono)
icon.convert("RGB").save(os.path.join(OUT, "icon.png"))

# 2. Adaptive icon foreground: content inside ~44% safe zone, transparent
fg = nvt_monogram(1024, 0.34)
fg.save(os.path.join(OUT, "android-icon-foreground.png"))
fg.save(os.path.join(OUT, "android-icon-monochrome.png"))

# 3. Splash icon: transparent, monogram only (no caption) for clean splash
def splash(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    f_big = ImageFont.truetype(cormorant, int(size * 0.5))
    text = "NVT"
    bbox = d.textbbox((0, 0), text, font=f_big)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((size / 2 - w / 2 - bbox[0], size * 0.3 - h / 2 - bbox[1]), text, font=f_big, fill=GOLD)
    f_cap = ImageFont.truetype(outfit, int(size * 0.08))
    cap = "NEW VISHAL TAILORS"
    cb = d.textbbox((0, 0), cap, font=f_cap)
    d.text((size / 2 - (cb[2] - cb[0]) / 2 - cb[0], size * 0.68), cap, font=f_cap, fill=CREAM)
    return img

splash(512).save(os.path.join(OUT, "splash-icon.png"))
print("brand assets written to", OUT)
