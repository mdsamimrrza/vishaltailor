// Visual + network verification for the catalogue update (run: node verify_catalogue.js)
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "verify-out");
const URL = process.env.TARGET_URL || "http://127.0.0.1:26170";

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  const failedRequests = [];
  const imageRequests = [];
  let totalBytes = 0;

  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message));
  page.on("requestfailed", (r) => failedRequests.push(r.url() + " :: " + (r.failure() || {}).errorText));
  page.on("response", (r) => {
    const url = r.url();
    if (r.status() >= 400) failedRequests.push(`${r.status()} ${url}`);
    const len = parseInt(r.headers()["content-length"] || "0", 10);
    totalBytes += len;
    if (/\.(png|jpe?g|webp|avif)(\?|$)/.test(url)) {
      imageRequests.push({ url: url.split("/").pop(), status: r.status(), kb: Math.round(len / 1024) });
    }
  });

  await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });

  const shot = async (name, opts = {}) => {
    const p = path.join(OUT, name);
    await page.screenshot({ path: p, ...opts });
    console.log("shot:", name);
  };

  // 1. Hero
  await shot("01-hero.png");

  // 2. Catalogue section (default filter = All, page 1)
  await page.evaluate(() => document.querySelector("#catalogue").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1800));
  await shot("02-catalogue-all.png");

  // 3. Each filter tab
  const tabs = await page.$$("#catalogue button");
  const tabTexts = [];
  for (const t of tabs) tabTexts.push(await t.evaluate((el) => el.textContent.trim()));
  console.log("filter tabs:", JSON.stringify(tabTexts));

  const filterNames = ["coatpant", "sherwani", "shirt", "safari", "kurtapajama", "khandress"];
  for (let i = 1; i <= 6; i++) {
    // tabs[0] is "All" (may include nav buttons; click by text instead below)
  }
  for (const fname of filterNames) {
    const clicked = await page.evaluate((label) => {
      const btns = [...document.querySelectorAll("#catalogue button")];
      const b = btns.find((x) => x.textContent.trim().toLowerCase().includes(label));
      if (b) { b.click(); return true; }
      return false;
    }, fname === "kurtapajama" ? "कुर्ता" : fname === "khandress" ? "खन" : fname.slice(0, 4));
    await new Promise((r) => setTimeout(r, 900));
    console.log(`filter ${fname}: clicked=${clicked}, cards=`, await page.evaluate(() => document.querySelectorAll("#catalogue .grid > div").length));
    await shot(`03-filter-${fname}.png`);
  }

  // 4. Back to All, open first card modal
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll("#catalogue button")];
    const b = btns.find((x) => x.textContent.trim().toLowerCase().includes("all") || x.textContent.includes("सबै"));
    if (b) b.click();
  });
  await new Promise((r) => setTimeout(r, 700));
  await page.evaluate(() => {
    const card = document.querySelector("#catalogue .grid > div");
    if (card) card.click();
  });
  await new Promise((r) => setTimeout(r, 1600));
  await shot("04-modal.png");

  // 5. Modal next/prev navigation
  const hasNext = await page.evaluate(() => !!document.querySelector('[aria-label="Next design"]'));
  if (hasNext) {
    await page.click('[aria-label="Next design"]');
    await new Promise((r) => setTimeout(r, 1200));
    await shot("05-modal-next.png");
    await page.click('[aria-label="Previous design"]');
    await new Promise((r) => setTimeout(r, 1200));
  }
  // close modal
  await page.evaluate(() => {
    const back = [...document.querySelectorAll("button")].find((b) => b.textContent.trim().toLowerCase() === "back");
    if (back) back.click();
  });
  await new Promise((r) => setTimeout(r, 700));

  // 6. Garments + fabrics sections (webp fix verification)
  await page.evaluate(() => document.querySelector("#garments").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1200));
  await shot("06-garments.png");
  await page.evaluate(() => document.querySelector("#fabrics").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1200));
  await shot("07-fabrics.png");

  // 6b. Visit section (lazy EnquiryForm + FAQ must render)
  await page.evaluate(() => document.querySelector("#visit").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1800));
  await shot("10-visit-form.png");
  const formOk = await page.evaluate(() => !!document.querySelector("#visit form, #visit button, #visit input"));
  console.log("visit form rendered:", formOk);

  // 7. Mobile catalogue + modal
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluate(() => document.querySelector("#catalogue").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1800));
  await shot("08-mobile-catalogue.png");
  await page.evaluate(() => {
    const card = document.querySelector("#catalogue .grid > div");
    if (card) card.click();
  });
  await new Promise((r) => setTimeout(r, 1600));
  await shot("09-mobile-modal.png");

  // 8. Broken images check
  const brokenImages = await page.evaluate(() =>
    [...document.querySelectorAll("img")].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src)
  );

  console.log("\n--- RESULTS ---");
  console.log("console errors:", consoleErrors.length ? consoleErrors : "none");
  console.log("failed requests:", failedRequests.length ? failedRequests : "none");
  console.log("broken <img> elements:", brokenImages.length ? brokenImages : "none");
  const imgKb = imageRequests.reduce((a, b) => a + b.kb, 0);
  console.log(`image responses: ${imageRequests.length}, total ${imgKb} KB; page total (content-length) ~${Math.round(totalBytes / 1024)} KB`);
  const big = imageRequests.filter((i) => i.kb > 150);
  console.log("images over 150KB:", big.length ? big : "none");
  fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify({ consoleErrors, failedRequests, brokenImages, imageRequests, totalBytes }, null, 2));
  await browser.close();
})();
