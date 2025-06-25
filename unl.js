import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.goto('https://unl.ua/uk/results/keno', { waitUntil: 'networkidle' });
await page.waitForSelector('.balls-list li', { timeout: 10000 });

const result = await page.evaluate(() => {
  const balls = [...document.querySelectorAll('.balls-list li')].map(el => el.textContent.trim());
  const draw = document.querySelector('.result-block__draw')?.textContent?.trim();
  const date = document.querySelector('.result-block__date')?.textContent?.trim();
  return { balls, draw, date };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
