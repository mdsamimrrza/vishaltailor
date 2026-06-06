const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const takeScreenshots = async (prefix, width, height) => {
    await page.setViewport({ width, height });
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

    // Try to click the first catalogue item to open the modal
    await page.evaluate(() => {
      const garmentsSection = document.querySelector('#garments');
      if (garmentsSection) {
        // Find a catalogue item (usually an image wrapper)
        const items = garmentsSection.querySelectorAll('button, .cursor-pointer, img');
        for (let item of items) {
          // heuristic: click something inside the grid
          if (item.closest('.grid')) {
            item.click();
            break;
          }
        }
      }
    });

    // Wait for the animation to finish
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: `${prefix}_modal.png` });
  };

  await takeScreenshots('mobile', 375, 812);
  await takeScreenshots('tablet', 768, 1024);
  await takeScreenshots('laptop', 1440, 900);

  await browser.close();
})();
