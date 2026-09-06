const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:26170", { waitUntil: "networkidle2" });
  await page.evaluate(() => document.querySelector("#catalogue").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1200));
  const tabs = await page.evaluate(() => [...document.querySelectorAll("#catalogue button")].map((b) => b.textContent.trim()));
  console.log("tabs:", JSON.stringify(tabs));
  for (const label of ["सुट", "कोट-पेन्ट", "कुर्ता-पायजामा", "खन ड्रेस"]) {
    await page.evaluate((l) => {
      const b = [...document.querySelectorAll("#catalogue button")].find((x) => x.textContent.trim() === l);
      if (b) b.click();
    }, label);
    await new Promise((r) => setTimeout(r, 700));
    const info = await page.evaluate(() => {
      const cards = [...document.querySelectorAll("#catalogue .grid > div")];
      const ids = cards.map((c) => {
        const b = c.querySelector(".font-mono");
        return b ? b.textContent.trim() : "?";
      });
      return { count: cards.length, ids };
    });
    console.log(label, JSON.stringify(info));
  }
  await browser.close();
})();
