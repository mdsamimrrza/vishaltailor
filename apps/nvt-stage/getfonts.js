// Downloads static TTFs for the app fonts from Google Fonts.
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'fonts');
fs.mkdirSync(OUT, { recursive: true });

const families = [
  { css: 'Outfit:wght@400;500;600;700;800', base: 'outfit' },
  { css: 'Cormorant+Garamond:wght@500;600;700', base: 'cormorant' },
  { css: 'Tiro+Devanagari+Hindi', base: 'tiro' },
];

(async () => {
  for (const fam of families) {
    const res = await fetch(`https://fonts.googleapis.com/css2?family=${fam.css}`, {
      headers: { 'User-Agent': 'Wget/1.20' }, // old UA => truetype urls
    });
    const css = await res.text();
    const blocks = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)];
    const seen = new Set();
    for (const b of blocks) {
      const w = (b[1].match(/font-weight:\s*(\d+)/) || [])[1] || '400';
      const u = (b[1].match(/url\((https:[^)]+)\)/) || [])[1];
      if (!u || seen.has(w)) continue;
      seen.add(w);
      const buf = Buffer.from(await (await fetch(u)).arrayBuffer());
      const file = path.join(OUT, `${fam.base}-${w}.ttf`);
      fs.writeFileSync(file, buf);
      console.log(fam.base, w, buf.length);
    }
  }
})();
