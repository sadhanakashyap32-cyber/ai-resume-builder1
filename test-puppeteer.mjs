import puppeteer from 'puppeteer';

(async () => {
    console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Listen for console events
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQ FAILED:', request.url(), request.failure().errorText));

  console.log("Navigating to http://localhost:3000...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Click Download PDF
  console.log("Clicking Download PDF...");
  const buttons = await page.$$('button');
  for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
       if (text && text.includes('Download PDF')) {
          await btn.click().catch(e => console.log("Click error:", e.message));
          break;
      }
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  // Click Share
  console.log("Clicking Share...");
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
     if (text && text.includes('Share')) {
        await btn.click().catch(e => console.log("Click error:", e.message));
        break;
    }
}
await new Promise(r => setTimeout(r, 2000));

// Click Analyze Score
console.log("Clicking Analyze Score...");
const btns = await page.$$('button');
for (const btn of btns) {
  const text = await page.evaluate(el => el.textContent, btn);
   if (text && text.includes('Analyze Score')) {
      await btn.click().catch(e => console.log("Click error:", e.message));
      break;
  }
}
await new Promise(r => setTimeout(r, 2000));

  await browser.close();
})();
