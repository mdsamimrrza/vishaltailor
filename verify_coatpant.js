const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  const OUT = path.join(__dirname, "verify-out");
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });

  await page.goto("http://127.0.0.1:26170", { waitUntil: "networkidle2" });
  await page.evaluate(() => document.querySelector("#catalogue").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1500));

  // tabs (labels only, pagination buttons excluded)
  const tabs = await page.evaluate(() =>
    [...document.querySelectorAll("#catalogue .flex-wrap button")].map((b) => b.textContent.trim())
  );
  console.log("tabs:", JSON.stringify(tabs));

  // Coat-Pant tab: page 1 ids + screenshot
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("#catalogue button")].find((x) => x.textContent.trim() === "कोट-पेन्ट");
    if (b) b.click();
  });
  await new Promise((r) => setTimeout(r, 900));
  const ids1 = await page.evaluate(() =>
    [...document.querySelectorAll("#catalogue .grid > div .font-mono")].map((e) => e.textContent.trim())
  );
  console.log("coatpant page1 ids:", JSON.stringify(ids1));
  await page.screenshot({ path: path.join(OUT, "10-coatpant-tab.png") });

  // page 2
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll("#catalogue .mt-12 button")];
    const two = btns.find((b) => b.textContent.trim() === "2");
    if (two) two.click();
  });
  await new Promise((r) => setTimeout(r, 900));
  const ids2 = await page.evaluate(() =>
    [...document.querySelectorAll("#catalogue .grid > div .font-mono")].map((e) => e.textContent.trim())
  );
  console.log("coatpant page2 ids:", JSON.stringify(ids2));
  await page.screenshot({ path: path.join(OUT, "11-coatpant-tab-p2.png") });

  // All tab page 1
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("#catalogue button")].find((x) => x.textContent.includes("सबै"));
    if (b) b.click();
  });
  await new Promise((r) => setTimeout(r, 900));
  const allIds = await page.evaluate(() =>
    [...document.querySelectorAll("#catalogue .grid > div .font-mono")].map((e) => e.textContent.trim())
  );
  console.log("all page1 ids:", JSON.stringify(allIds));
  await page.screenshot({ path: path.join(OUT, "12-all-tab.png") });

  console.log("errors:", errors.length ? errors : "none");
  await browser.close();
})();
