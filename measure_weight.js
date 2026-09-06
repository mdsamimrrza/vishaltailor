const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });
  for (const [name, width, isMobile] of [["desktop", 1440, false], ["mobile", 390, true]]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: isMobile ? 844 : 900, isMobile });
    const js = new Map();
    let imgBytes = 0;
    let total = 0;
    page.on("response", (r) => {
      const url = r.url();
      const len = parseInt(r.headers()["content-length"] || "0", 10);
      total += len;
      if (url.endsWith(".js")) js.set(url.split("/").pop(), len);
      if (/\.(webp|png|jpe?g)/.test(url)) imgBytes += len;
    });
    await page.goto("http://127.0.0.1:26170", { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 1500));
    console.log("=== " + name + " ===");
    console.log("js chunks:", [...js.entries()].map(([f, b]) => f + " " + Math.round(b / 1024) + "KB").join(", "));
    console.log("images: " + Math.round(imgBytes / 1024) + "KB, total page weight: " + Math.round(total / 1024) + "KB");
    await page.close();
  }
  await browser.close();
})();
