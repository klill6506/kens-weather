import { chromium } from "playwright";
const browser = await chromium.launch(); const page = await browser.newPage();
await page.goto("http://localhost:8080/index.html"); await page.waitForTimeout(3000);
const out = await page.evaluate(async () => {
  const j = await (await fetch("https://api.rainviewer.com/public/weather-maps.json")).json();
  const f = j.radar.past[j.radar.past.length - 1]; const hist = {};
  const tiles = []; for (let x = 2; x <= 5; x++) for (let y = 5; y <= 7; y++) tiles.push([4, x, y]);
  for (let x = 32; x <= 36; x++) for (let y = 49; y <= 52; y++) tiles.push([7, x, y]);
  for (const [z, x, y] of tiles) for (const opt of ["2/1_1", "2/0_0"]) {
    const b = await (await fetch(`${j.host}${f.path}/256/${z}/${x}/${y}/${opt}.png`)).blob(); const bm = await createImageBitmap(b);
    const c = new OffscreenCanvas(256, 256), g = c.getContext("2d"); g.drawImage(bm, 0, 0); const d = g.getImageData(0, 0, 256, 256).data;
    for (let i = 0; i < d.length; i += 4) if (d[i + 3]) { const k = `${opt} ${d[i]},${d[i+1]},${d[i+2]},${d[i+3]}`; hist[k] = (hist[k] || 0) + 1; }
  }
  return Object.entries(hist).sort((a, b) => b[1] - a[1]).slice(0, 80);
});
out.forEach(([k, n]) => console.log(n, k));
await browser.close();
