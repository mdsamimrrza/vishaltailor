# Regenerates apps/web/src/data/catalogue.ts:
#  - original deployed designs CP-01..CP-12 and SH-01..SH-12 kept verbatim (images re-pointed
#    to optimized WebP copies of the very same photos); everything after C12/SH-12 is dropped
#  - new real-photo designs added as their own categories:
#    suit (11), shirt (11), safari (9), kurtapajama (4), khandress (9)
# Run from repo root: python apps/web/scripts/generate_catalogue.py
import json
import os
import re
import subprocess

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
OUT = os.path.join(ROOT, "apps", "web", "src", "data", "catalogue.ts")

# Original catalogue entries come from git HEAD (the last deployed version), so this
# script stays correct no matter what the working-tree catalogue.ts currently holds.
old = subprocess.run(
    ["git", "show", "HEAD:apps/web/src/data/catalogue.ts"],
    cwd=ROOT, capture_output=True, encoding="utf-8", check=True,
).stdout

m = re.search(r"catalogueItems: CatalogueItem\[\] = (\[.*?\n\]);", old, re.S)
if m is None:
    raise SystemExit("could not locate catalogueItems array in git HEAD catalogue.ts")
old_items = json.loads(m.group(1))

keep_old = [i for i in old_items if (i["id"].startswith("CP") and i["id"] <= "CP-12")
            or (i["id"].startswith("SH") and i["id"] <= "SH-12")]
assert len(keep_old) == 24, f"expected 24 kept designs, got {len(keep_old)}"

# Re-point the kept originals at optimized WebP copies of the exact same photos.
for i in keep_old:
    if i["id"] == "CP-12":
        i["image"], i["thumb"] = "/images/catalogue/coatpant.webp", "/images/catalogue/coatpant-th.webp"
    elif i["id"].startswith("CP"):
        base = f"/images/catalogue/{i['id'].lower()}"
        i["image"], i["thumb"] = f"{base}.webp", f"{base}-th.webp"
    else:
        i["image"], i["thumb"] = "/images/catalogue/sherwani.webp", "/images/catalogue/sherwani-th.webp"

# Shared vocabulary (en, ne, hi)
FABRICS = {
    "merino": ("Premium Italian Merino Wool", "प्रिमियम इटालियन मेरिना ऊन", "प्रीमियम इटालियन मेरिनो ऊन"),
    "cashmere": ("Soft Woolen Cashmere Blend", "नरम ऊनी क्यासमेरे मिश्रण", "सॉफ्ट ऊनी कश्मीरी मिश्रण"),
    "tweed": ("Textured Tweed Wool Blend", "टेक्सचर्ड ट्विड ऊन मिश्रण", "टेक्सचर्ड ट्वीड ऊन मिश्रण"),
    "satin": ("Lustrous Satin-Finish Wool", "चमकदार साटन फिनिस ऊन", "चमकदार सैटन फिनिश ऊन"),
    "silk": ("Silk-Touch Premium Blend", "सिल्क-टच प्रिमियम मिश्रण", "सिल्क-टच प्रीमियम मिश्रण"),
    "cotton": ("Breathable Premium Cotton", "हावा खेल्ने प्रिमियम कटन", "हवा खेलने वाला प्रीमियम कॉटन"),
    "twill": ("Soft Cotton-Twill", "नरम कटन-ट्विल", "सॉफ्ट कॉटन-ट्विल"),
    "denim": ("Washed Denim Cotton", "धुएको डेनिम कटन", "धुला हुआ डेनिम कॉटन"),
    "oxford": ("Premium Oxford Cotton", "प्रिमियम अक्सफोर्ड कटन", "प्रीमियम ऑक्सफोर्ड कॉटन"),
    "esilk": ("Embroidered Silk Blend", "एम्ब्रोइडर्ड सिल्क मिश्रण", "एम्ब्रोइडर्ड सिल्क मिश्रण"),
}
FITS = {
    "bespoke": ("NVT Master Bespoke Fit", "NVT मास्टर बेस्पोक फिट", "NVT मास्टर बेस्पोक फिट"),
    "slim": ("Sleek Slim-Cut Drape", "स्लिक स्लिम-कट ड्रेप", "स्लीक स्लिम-कट ड्रेप"),
    "comfort": ("Tailored Comfort Fit", "टेलर्ड कम्फर्ट फिट", "टेलर्ड कम्फर्ट फिट"),
    "athletic": ("Sharp Athletic Taper", "स्मार्ट एथलेटिक टेपर", "स्मार्ट एथलेटिक टेपर"),
}
OCCASIONS = {
    "formal": ("formal occasions", "औपचारिक अवसर", "औपचारिक मौकों"),
    "business": ("business meetings", "व्यापारिक भेटघाट", "व्यापारिक मुलाकातों"),
    "wedding": ("weddings & receptions", "विवाह तथा रिसेप्सन", "शादी और रिसेप्शन"),
    "festive": ("festive celebrations", "चाडपर्व तथा उत्सव", "त्योहारों और उत्सवों"),
    "party": ("evening parties", "साँझका पार्टी", "शाम की पार्टियों"),
    "daily": ("daily smart wear", "दैनिक प्रयोग", "रोज़ाना पहनावे"),
    "summer": ("summer days", "गर्मी मौसम", "गर्मियों के दिनों"),
    "outdoor": ("outdoor events", "बाहिरी कार्यक्रम", "आउटडोर कार्यक्रमों"),
    "puja": ("pooja & festivals", "पूजा तथा चाडपर्व", "पूजा और त्योहारों"),
}

# (id, style en/ne/hi, color en/ne/hi, fabric, fit, occasion, tags en, tags ne, tags hi)
NEW_ITEMS = [
    # ---- Suit (new real-photo designs from the suit folder c1..c12) ----
    ("SU-01", ("Grey Three-Piece Suit", "ग्रे थ्री-पिस सुट", "ग्रे थ्री-पीस सूट"),
     ("Charcoal Grey", "चारकोल खैरो", "चारकोल ग्रे"), "tweed", "bespoke", "formal",
     ["NVT Exclusive", "Three-Piece", "Grey", "Bespoke"], ["NVT विशेष", "थ्री-पिस", "खैरो", "कस्टम"], ["NVT विशेष", "थ्री-पीस", "ग्रे", "कस्टम"]),
    ("SU-02", ("Royal Navy Two-Piece Suit", "रॉयल नेवी टु-पिस सुट", "रॉयल नेवी टू-पीस सूट"),
     ("Royal Navy Blue", "शाही गाढा नीलो", "रॉयल नेवी ब्लू"), "merino", "slim", "business",
     ["NVT Exclusive", "Classic", "Navy", "Bespoke"], ["NVT विशेष", "क्लासिक", "नीलो", "कस्टम"], ["NVT विशेष", "क्लासिक", "नेवी", "कस्टम"]),
    ("SU-03", ("Slate Business Suit", "स्लेट बिजनेस सुट", "स्लेट बिज़नेस सूट"),
     ("Slate Grey", "स्लेट खैरो", "स्लेट ग्रे"), "cashmere", "comfort", "formal",
     ["NVT Exclusive", "Business", "Grey", "Custom"], ["NVT विशेष", "बिजनेस", "खैरो", "कस्टम"], ["NVT विशेष", "बिज़नेस", "ग्रे", "कस्टम"]),
    ("SU-04", ("Burgundy Shawl-Collar Tuxedo", "बर्गन्डी शॉल-कलर टक्सिडो", "बर्गेंडी शॉल-कॉलर टक्सीडो"),
     ("Deep Burgundy", "गाढा बर्गन्डी", "गहरी बर्गेंडी"), "satin", "athletic", "wedding",
     ["NVT Exclusive", "Tuxedo", "Burgundy", "Wedding"], ["NVT विशेष", "टक्सिडो", "बर्गन्डी", "विवाह"], ["NVT विशेष", "टक्सीडो", "बर्गेंडी", "शादी"]),
    ("SU-05", ("Wine Double-Breasted Suit", "वाइन डबल-ब्रेस्टेड सुट", "वाइन डबल-ब्रेस्टेड सूट"),
     ("Wine Maroon", "वाइन मेरून", "वाइन मरून"), "merino", "bespoke", "festive",
     ["NVT Exclusive", "Double-Breasted", "Maroon", "Bespoke"], ["NVT विशेष", "डबल-ब्रेस्टेड", "मेरून", "कस्टम"], ["NVT विशेष", "डबल-ब्रेस्टेड", "मरून", "कस्टम"]),
    ("SU-06", ("Crimson Classic Two-Piece", "क्रिमसन क्लासिक टु-पिस", "क्रिमसन क्लासिक टू-पीस"),
     ("Crimson Red", "क्रिमसन रातो", "क्रिमसन लाल"), "cashmere", "slim", "party",
     ["NVT Exclusive", "Classic", "Red", "Bold"], ["NVT विशेष", "क्लासिक", "रातो", "बोल्ड"], ["NVT विशेष", "क्लासिक", "लाल", "बोल्ड"]),
    ("SU-07", ("Peacock Blue Three-Piece Suit", "पीकक ब्लु थ्री-पिस सुट", "पीकॉक ब्लू थ्री-पीस सूट"),
     ("Peacock Blue", "पीकक नीलो", "पीकॉक ब्लू"), "silk", "athletic", "party",
     ["NVT Exclusive", "Three-Piece", "Blue", "Statement"], ["NVT विशेष", "थ्री-पिस", "नीलो", "स्टेटमेन्ट"], ["NVT विशेष", "थ्री-पीस", "ब्लू", "स्टेटमेंट"]),
    ("SU-08", ("Teal Shawl-Collar Tuxedo", "टील शॉल-कलर टक्सिडो", "टील शॉल-कॉलर टक्सीडो"),
     ("Teal Blue", "टील नीलो", "टील ब्लू"), "satin", "bespoke", "wedding",
     ["NVT Exclusive", "Tuxedo", "Teal", "Wedding"], ["NVT विशेष", "टक्सिडो", "टील", "विवाह"], ["NVT विशेष", "टक्सीडो", "टील", "शादी"]),
    ("SU-09", ("Burgundy & Ivory Ensemble", "बर्गन्डी र आइवरी एन्सेम्बल", "बर्गेंडी और आइवरी एन्सेम्बल"),
     ("Burgundy & Ivory", "बर्गन्डी र आइवरी", "बर्गेंडी और आइवरी"), "silk", "athletic", "wedding",
     ["NVT Exclusive", "Contrast", "Groom", "Wedding"], ["NVT विशेष", "कन्ट्रास्ट", "दुलाहा", "विवाह"], ["NVT विशेष", "कंट्रास्ट", "दूल्हा", "शादी"]),
    ("SU-10", ("Maroon Gold-Piped Suit", "मेरून गोल्ड-पाइप सुट", "मरून गोल्ड-पाइप सूट"),
     ("Maroon & Gold", "मेरून र सुनौलो", "मरून और गोल्ड"), "satin", "bespoke", "festive",
     ["NVT Exclusive", "Gold Trim", "Maroon", "Royal"], ["NVT विशेष", "गोल्ड ट्रिम", "मेरून", "शाही"], ["NVT विशेष", "गोल्ड ट्रिम", "मरून", "शाही"]),
    ("SU-11", ("Ivory Shawl-Collar Tuxedo", "आइवरी शॉल-कलर टक्सिडो", "आइवरी शॉल-कॉलर टक्सीडो"),
     ("Ivory Cream", "आइवरी क्रिम", "आइवरी क्रीम"), "silk", "slim", "wedding",
     ["NVT Exclusive", "Tuxedo", "Ivory", "Groom"], ["NVT विशेष", "टक्सिडो", "आइवरी", "दुलाहा"], ["NVT विशेष", "टक्सीडो", "आइवरी", "दूल्हा"]),

    # ---- Shirt ----
    ("ST-01", ("Dusty Rose Casual", "डस्टी रोज क्याजुअल", "डस्टी रोज़ कैज़ुअल"),
     ("Dusty Rose", "डस्टी रोज", "डस्टी रोज़"), "twill", "comfort", "daily",
     ["NVT Exclusive", "Casual", "Rose", "Custom"], ["NVT विशेष", "क्याजुअल", "रोज", "कस्टम"], ["NVT विशेष", "कैज़ुअल", "रोज़", "कस्टम"]),
    ("ST-02", ("Sage Green Slim", "सेज हरियो स्लिम", "सेज ग्रीन स्लिम"),
     ("Sage Green", "सेज हरियो", "सेज ग्रीन"), "cotton", "slim", "daily",
     ["NVT Exclusive", "Slim Fit", "Green", "Custom"], ["NVT विशेष", "स्लिम फिट", "हरियो", "कस्टम"], ["NVT विशेष", "स्लिम फिट", "ग्रीन", "कस्टम"]),
    ("ST-03", ("Beige Button-Down", "बेज बटन-डाउन", "बेज बटन-डाउन"),
     ("Classic Beige", "क्लासिक बेज", "क्लासिक बेज"), "cotton", "slim", "formal",
     ["NVT Exclusive", "Formal", "Beige", "Custom"], ["NVT विशेष", "फर्मल", "बेज", "कस्टम"], ["NVT विशेष", "फॉर्मल", "बेज", "कस्टम"]),
    ("ST-04", ("Cream & Black Contrast", "क्रिम र कालो कन्ट्रास्ट", "क्रीम और काला कंट्रास्ट"),
     ("Cream & Black", "क्रिम र कालो", "क्रीम और काला"), "twill", "slim", "party",
     ["NVT Exclusive", "Contrast", "Cream", "Party"], ["NVT विशेष", "कन्ट्रास्ट", "क्रिम", "पार्टी"], ["NVT विशेष", "कंट्रास्ट", "क्रीम", "पार्टी"]),
    ("ST-05", ("Grey Abstract Print", "ग्रे एब्स्ट्राक्ट प्रिन्ट", "ग्रे एब्स्ट्रैक्ट प्रिंट"),
     ("Grey Print", "ग्रे प्रिन्ट", "ग्रे प्रिंट"), "cotton", "slim", "party",
     ["NVT Exclusive", "Printed", "Grey", "Statement"], ["NVT विशेष", "प्रिन्टेड", "खैरो", "स्टेटमेन्ट"], ["NVT विशेष", "प्रिंटेड", "ग्रे", "स्टेटमेंट"]),
    ("ST-06", ("Charcoal Solid Slim", "चारकोल सॉलिड स्लिम", "चारकोल सॉलिड स्लिम"),
     ("Charcoal", "चारकोल", "चारकोल"), "twill", "slim", "formal",
     ["NVT Exclusive", "Solid", "Charcoal", "Custom"], ["NVT विशेष", "सॉलिड", "चारकोल", "कस्टम"], ["NVT विशेष", "सॉलिड", "चारकोल", "कस्टम"]),
    ("ST-07", ("Black Self-Textured", "कालो सेल्फ-टेक्सचर्ड", "ब्लैक सेल्फ-टेक्सचर्ड"),
     ("Jet Black", "गाढा कालो", "जेट ब्लैक"), "oxford", "slim", "party",
     ["NVT Exclusive", "Textured", "Black", "Evening"], ["NVT विशेष", "टेक्सचर्ड", "कालो", "साँझ"], ["NVT विशेष", "टेक्सचर्ड", "ब्लैक", "इवनिंग"]),
    ("ST-08", ("Steel Grey Contrast", "स्टील ग्रे कन्ट्रास्ट", "स्टील ग्रे कंट्रास्ट"),
     ("Steel Grey", "स्टील खैरो", "स्टील ग्रे"), "twill", "comfort", "business",
     ["NVT Exclusive", "Contrast", "Grey", "Office"], ["NVT विशेष", "कन्ट्रास्ट", "खैरो", "अफिस"], ["NVT विशेष", "कंट्रास्ट", "ग्रे", "ऑफिस"]),
    ("ST-09", ("White Piped Formal", "सेतो पाइप फर्मल", "सफेद पाइप फॉर्मल"),
     ("Piped White", "पाइप सेतो", "पाइप सफेद"), "cotton", "slim", "formal",
     ["NVT Exclusive", "Formal", "White", "Piping"], ["NVT विशेष", "फर्मल", "सेतो", "पाइपिङ"], ["NVT विशेष", "फॉर्मल", "सफेद", "पाइपिंग"]),
    ("ST-10", ("Black Denim", "कालो डेनिम", "ब्लैक डेनिम"),
     ("Washed Black", "धुएको कालो", "वॉश्ड ब्लैक"), "denim", "comfort", "daily",
     ["NVT Exclusive", "Denim", "Black", "Casual"], ["NVT विशेष", "डेनिम", "कालो", "क्याजुअल"], ["NVT विशेष", "डेनिम", "ब्लैक", "कैज़ुअल"]),
    ("ST-11", ("Sand Utility Shirt", "स्यान्ड युटिलिटी सर्ट", "सैंड यूटिलिटी शर्ट"),
     ("Sand Beige", "स्यान्ड बेज", "सैंड बेज"), "cotton", "comfort", "outdoor",
     ["NVT Exclusive", "Utility", "Beige", "Outdoor"], ["NVT विशेष", "युटिलिटी", "बेज", "आउटडोर"], ["NVT विशेष", "यूटिलिटी", "बेज", "आउटडोर"]),

    # ---- Safari ----
    ("SF-01", ("Navy Achkan Safari", "नेवी अच्कन सफारी", "नेवी अच्कन सफारी"),
     ("Royal Navy", "शाही नेवी", "रॉयल नेवी"), "merino", "bespoke", "wedding",
     ["NVT Exclusive", "Achkan", "Navy", "Royal"], ["NVT विशेष", "अच्कन", "नेवी", "शाही"], ["NVT विशेष", "अच्कन", "नेवी", "शाही"]),
    ("SF-02", ("Charcoal Royal Bandhgala", "चारकोल रोयल बण्डगाला", "चारकोल रॉयल बंडगाला"),
     ("Charcoal Grey", "चारकोल खैरो", "चारकोल ग्रे"), "tweed", "slim", "wedding",
     ["NVT Exclusive", "Bandhgala", "Grey", "Royal"], ["NVT विशेष", "बण्डगाला", "खैरो", "शाही"], ["NVT विशेष", "बंडगाला", "ग्रे", "शाही"]),
    ("SF-03", ("Classic Grey Safari Suit", "क्लासिक ग्रे सफारी सुट", "क्लासिक ग्रे सफारी सूट"),
     ("Slate Grey", "स्लेट खैरो", "स्लेट ग्रे"), "merino", "comfort", "formal",
     ["NVT Exclusive", "Classic", "Grey", "Two-Piece"], ["NVT विशेष", "क्लासिक", "खैरो", "टु-पिस"], ["NVT विशेष", "क्लासिक", "ग्रे", "टू-पीस"]),
    ("SF-04", ("Navy Bandhgala Safari", "नेवी बण्डगाला सफारी", "नेवी बंडगाला सफारी"),
     ("Navy Blue", "नेवी नीलो", "नेवी ब्लू"), "cashmere", "slim", "business",
     ["NVT Exclusive", "Bandhgala", "Navy", "Custom"], ["NVT विशेष", "बण्डगाला", "नीलो", "कस्टम"], ["NVT विशेष", "बंडगाला", "नेवी", "कस्टम"]),
    ("SF-05", ("Royal Navy Prince Coat", "रोयल नेवी प्रिन्स कोट", "रॉयल नेवी प्रिंस कोट"),
     ("Royal Navy", "शाही नेवी", "रॉयल नेवी"), "satin", "athletic", "wedding",
     ["NVT Exclusive", "Prince Coat", "Navy", "Gold Buttons"], ["NVT विशेष", "प्रिन्स कोट", "नेवी", "सुनौला बटन"], ["NVT विशेष", "प्रिंस कोट", "नेवी", "गोल्ड बटन"]),
    ("SF-06", ("Maroon Regal Bandhgala", "मेरून रिगल बण्डगाला", "मरून रीगल बंडगाला"),
     ("Deep Maroon", "गाढा मेरून", "गहरा मरून"), "satin", "bespoke", "wedding",
     ["NVT Exclusive", "Bandhgala", "Maroon", "Wedding"], ["NVT विशेष", "बण्डगाला", "मेरून", "विवाह"], ["NVT विशेष", "बंडगाला", "मरून", "शादी"]),
    ("SF-07", ("Teal Festive Bandhgala", "टील फेस्टिभ बण्डगाला", "टील फेस्टिव बंडगाला"),
     ("Teal Blue", "टील नीलो", "टील ब्लू"), "silk", "athletic", "festive",
     ["NVT Exclusive", "Bandhgala", "Teal", "Festive"], ["NVT विशेष", "बण्डगाला", "टील", "उत्सव"], ["NVT विशेष", "बंडगाला", "टील", "त्योहार"]),
    ("SF-08", ("Emerald Embroidered Safari", "एमराल्ड एम्ब्रोइडर्ड सफारी", "एमरल्ड एम्ब्रोइडर्ड सफारी"),
     ("Emerald Green", "गाढा हरियो", "गहरा हरा"), "esilk", "bespoke", "festive",
     ["NVT Exclusive", "Embroidered", "Green", "Floral"], ["NVT विशेष", "एम्ब्रोइडर्ड", "हरियो", "फूल"], ["NVT विशेष", "एम्ब्रोइडर्ड", "हरा", "फ्लोरल"]),
    ("SF-09", ("Teal Field Safari Suit", "टील फिल्ड सफारी सुट", "टील फील्ड सफारी सूट"),
     ("Teal Green", "टील हरियो", "टील हरा"), "tweed", "comfort", "outdoor",
     ["NVT Exclusive", "Field Pockets", "Teal", "Classic"], ["NVT विशेष", "फिल्ड पकेट", "टील", "क्लासिक"], ["NVT विशेष", "फील्ड पॉकेट", "टील", "क्लासिक"]),

    # ---- Kurta-Pajama ----
    ("KP-01", ("Silver Dori Embroidered", "सिल्भर डोरी एम्ब्रोइडर्ड", "सिल्वर डोरी एम्ब्रोइडर्ड"),
     ("Light Silver Grey", "हल्का चाँदी खैरो", "हल्का सिल्वर ग्रे"), "esilk", "comfort", "puja",
     ["NVT Exclusive", "Embroidered", "Silver", "Festive"], ["NVT विशेष", "एम्ब्रोइडर्ड", "चाँदी", "उत्सव"], ["NVT विशेष", "एम्ब्रोइडर्ड", "सिल्वर", "त्योहार"]),
    ("KP-02", ("Chocolate Pathani Set", "चकलेट पठानी सेट", "चॉकलेट पठानी सेट"),
     ("Chocolate Brown", "चकलेट खैरो", "चॉकलेट भूरा"), "cotton", "comfort", "festive",
     ["NVT Exclusive", "Pathani", "Brown", "Custom"], ["NVT विशेष", "पठानी", "खैरो", "कस्टम"], ["NVT विशेष", "पठानी", "भूरा", "कस्टम"]),
    ("KP-03", ("Classic Grey Kurta", "क्लासिक ग्रे कुर्ता", "क्लासिक ग्रे कुर्ता"),
     ("Light Grey", "हल्का खैरो", "हल्का ग्रे"), "cotton", "comfort", "daily",
     ["NVT Exclusive", "Classic", "Grey", "Daily"], ["NVT विशेष", "क्लासिक", "खैरो", "दैनिक"], ["NVT विशेष", "क्लासिक", "ग्रे", "डेली"]),
    ("KP-04", ("Ivory Festive Collar", "आइवरी फेस्टिभ कलर", "आइवरी फेस्टिव कॉलर"),
     ("Ivory White", "आइवरी सेतो", "आइवरी सफेद"), "cotton", "comfort", "wedding",
     ["NVT Exclusive", "Collar", "Ivory", "Festive"], ["NVT विशेष", "कलर", "आइवरी", "उत्सव"], ["NVT विशेष", "कॉलर", "आइवरी", "त्योहार"]),

    # ---- Khan Dress ----
    ("KD-01", ("Charcoal Classic", "चारकोल क्लासिक", "चारकोल क्लासिक"),
     ("Charcoal Grey", "चारकोल खैरो", "चारकोल ग्रे"), "twill", "comfort", "formal",
     ["NVT Exclusive", "Mandarin Collar", "Grey", "Custom"], ["NVT विशेष", "मन्दारिन कलर", "खैरो", "कस्टम"], ["NVT विशेष", "मंदारिन कॉलर", "ग्रे", "कस्टम"]),
    ("KD-02", ("Grey Four-Pocket Wool", "ग्रे फोर-पकेट ऊन", "ग्रे फोर-पॉकेट ऊन"),
     ("Heather Grey", "हेदर खैरो", "हेदर ग्रे"), "tweed", "comfort", "business",
     ["NVT Exclusive", "Four-Pocket", "Grey", "Winter"], ["NVT विशेष", "फोर-पकेट", "खैरो", "जाडा"], ["NVT विशेष", "फोर-पॉकेट", "ग्रे", "विंटर"]),
    ("KD-03", ("Navy Hidden-Placket", "नेवी हिडन-प्लाकेट", "नेवी हिडन-प्लैकेट"),
     ("Navy Blue", "नेवी नीलो", "नेवी ब्लू"), "cotton", "comfort", "formal",
     ["NVT Exclusive", "Hidden Placket", "Navy", "Custom"], ["NVT विशेष", "हिडन प्लाकेट", "नीलो", "कस्टम"], ["NVT विशेष", "हिडन प्लैकेट", "नेवी", "कस्टम"]),
    ("KD-04", ("Navy Half-Sleeve", "नेवी हाफ-स्लिभ", "नेवी हाफ-स्लीव"),
     ("Navy Blue", "नेवी नीलो", "नेवी ब्लू"), "cotton", "comfort", "summer",
     ["NVT Exclusive", "Half-Sleeve", "Navy", "Summer"], ["NVT विशेष", "हाफ-स्लिभ", "नीलो", "गर्मी"], ["NVT विशेष", "हाफ-स्लीव", "नेवी", "समर"]),
    ("KD-05", ("Golden Mustard Four-Pocket", "गोल्डन मस्टर्ड फोर-पकेट", "गोल्डन मस्टर्ड फोर-पॉकेट"),
     ("Mustard Gold", "मस्टर्ड पहेंलो", "मस्टर्ड येलो"), "tweed", "comfort", "festive",
     ["NVT Exclusive", "Four-Pocket", "Mustard", "Royal"], ["NVT विशेष", "फोर-पकेट", "मस्टर्ड", "शाही"], ["NVT विशेष", "फोर-पॉकेट", "मस्टर्ड", "शाही"]),
    ("KD-06", ("Forest Green Half-Sleeve Set", "फरेस्ट हरियो हाफ-स्लिभ सेट", "फॉरेस्ट ग्रीन हाफ-स्लीव सेट"),
     ("Forest Green", "गाढा हरियो", "गहरा हरा"), "cotton", "comfort", "summer",
     ["NVT Exclusive", "Half-Sleeve", "Green", "Set"], ["NVT विशेष", "हाफ-स्लिभ", "हरियो", "सेट"], ["NVT विशेष", "हाफ-स्लीव", "ग्रीन", "सेट"]),
    ("KD-07", ("Sand Beige Summer", "स्यान्ड बेज समर", "सैंड बेज समर"),
     ("Sand Beige", "स्यान्ड बेज", "सैंड बेज"), "cotton", "comfort", "summer",
     ["NVT Exclusive", "Half-Sleeve", "Beige", "Summer"], ["NVT विशेष", "हाफ-स्लिभ", "बेज", "गर्मी"], ["NVT विशेष", "हाफ-स्लीव", "बेज", "समर"]),
    ("KD-08", ("Coffee Brown Gold-Button", "कफी खैरो गोल्ड-बटन", "कॉफी भूरा गोल्ड-बटन"),
     ("Coffee Brown", "कफी खैरो", "कॉफी भूरा"), "cashmere", "comfort", "business",
     ["NVT Exclusive", "Gold Buttons", "Brown", "Winter"], ["NVT विशेष", "सुनौला बटन", "खैरो", "जाडा"], ["NVT विशेष", "गोल्ड बटन", "भूरा", "विंटर"]),
    ("KD-09", ("Navy Mandarin Suit", "नेवी मन्दारिन सुट", "नेवी मंदारिन सूट"),
     ("Navy Blue", "नेवी नीलो", "नेवी ब्लू"), "merino", "comfort", "formal",
     ["NVT Exclusive", "Mandarin Collar", "Navy", "Two-Piece"], ["NVT विशेष", "मन्दारिन कलर", "नीलो", "टु-पिस"], ["NVT विशेष", "मंदारिन कॉलर", "नेवी", "टू-पीस"]),
]

CATEGORY_DIR = {
    "SU": ("coatpant", "suit"),   # suit-folder photos live under the Coat-Pant collection, listed first
    "ST": ("shirt", "shirt"),
    "SF": ("safari", "safari"),
    "KP": ("kurtapajama", "kurtapajama"),
    "KD": ("khandress", "khandress"),
}

def build_item(id_, style, color, fabric_key, fit_key, occ_key, tags_en, tags_ne, tags_hi):
    prefix = id_.split("-")[0]
    category, folder = CATEGORY_DIR[prefix]
    tags = (tags_en, tags_ne, tags_hi)
    num = id_.split("-")[1]
    fabric = FABRICS[fabric_key]
    fit = FITS[fit_key]
    occ = OCCASIONS[occ_key]
    style_ref = style[0]
    return {
        "id": id_,
        "category": category,
        "nameEn": f"NVT Signature {style[0]} ({id_})",
        "nameNe": f"NVT सिग्नेचर {style[1]} ({id_})",
        "nameHi": f"NVT सिग्नेचर {style[2]} ({id_})",
        "descEn": f"A bespoke {style_ref} tailored at New Vishal Tailors. Features {color[0]} shades, crafted with {fabric[0]} for a {fit[0]}. Ideal for {occ[0]}.",
        "descNe": f"न्यू विशाल टेलर्समा तयार पारिएको {style[1]}। यसमा {color[1]} रङको फिनिसिङ छ, जुन {fabric[1]} कपडामा {fit[1]} का साथ सिलाइएको छ। {occ[1].capitalize()} का लागि उत्तम।",
        "descHi": f"न्यू विशाल टेलर्स में तैयार किया गया {style[2]}। इसमें {color[2]} रंग की फिनिशिंग है, जिसे {fabric[2]} कपड़े पर {fit[2]} के साथ सिला गया है। {occ[2].capitalize()} के लिए आदर्श।",
        "tagsEn": tags[0],
        "tagsNe": tags[1],
        "tagsHi": tags[2],
        "fitEn": fit[0], "fitNe": fit[1], "fitHi": fit[2],
        "fabricEn": fabric[0], "fabricNe": fabric[1], "fabricHi": fabric[2],
        "colorEn": color[0], "colorNe": color[1], "colorHi": color[2],
        "image": f"/images/catalogue/{folder}/{id_.lower()}.webp",
        "thumb": f"/images/catalogue/{folder}/{id_.lower()}-th.webp",
    }

new_items = [build_item(*row) for row in NEW_ITEMS]
suit_first = [i for i in new_items if i["id"].startswith("SU")]
rest = [i for i in new_items if not i["id"].startswith("SU")]
# Coat-Pant collection: suit-folder photos FIRST, then the original CP designs
items = suit_first + keep_old + rest

def dump(obj):
    return json.dumps(obj, ensure_ascii=False, indent=2)

header = """// Custom Catalogue Data for New Vishal Tailors
// Generated programmatically for a simple, flat structure to keep it beginner-friendly.
// Images are optimized WebP: `thumb` powers the grid cards, `image` powers the detail modal.

export type CatalogueCategory = "coatpant" | "sherwani" | "shirt" | "safari" | "kurtapajama" | "khandress";

export interface CatalogueItem {
  id: string;
  category: CatalogueCategory;
  nameEn: string;
  nameNe: string;
  nameHi: string;
  descEn: string;
  descNe: string;
  descHi: string;
  tagsEn: string[];
  tagsNe: string[];
  tagsHi: string[];
  fitEn: string;
  fitNe: string;
  fitHi: string;
  fabricEn: string;
  fabricNe: string;
  fabricHi: string;
  colorEn: string;
  colorNe: string;
  colorHi: string;
  image: string;
  thumb: string;
}

export const catalogueItems: CatalogueItem[] = ["""

body = ",\n".join(dump(item) for item in items)
with open(OUT, "w", encoding="utf-8", newline="\n") as f:
    f.write(header + body + "\n];\n")

cats = {}
for i in items:
    cats[i["category"]] = cats.get(i["category"], 0) + 1
print(f"wrote {len(items)} items: {cats}")
