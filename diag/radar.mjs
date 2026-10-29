import { chromium, devices } from "playwright";
const base = process.argv[2];
const browser = await chromium.launch();
const log = [];
async function open(scheme) {
  const ctx = await browser.newContext({ ...devices["iPhone 13"], colorScheme: scheme, geolocation: { latitude: 33.9519, longitude: -83.3576 }, permissions: ["geolocation"] });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() !== "log") log.push(`${scheme} console.${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => log.push(`${scheme} pageerror: ${e.message}`));
  page.on("requestfailed", (r) => log.push(`${scheme} requestfailed: ${r.url()} ${r.failure()?.errorText}`));
  page.on("response", (r) => { if (r.status() >= 400) log.push(`${scheme} HTTP ${r.status()} ${r.url()}`); });
  await page.goto(base + "/index.html", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  return page;
}
const rainPixels = (urls) => Promise.all(urls.map(async (u) => {
  try { const b = await (await fetch(u)).blob(); const bm = await createImageBitmap(b); const c = new OffscreenCanvas(bm.width, bm.height); const x = c.getContext("2d"); x.drawImage(bm, 0, 0); const d = x.getImageData(0, 0, bm.width, bm.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++; return n; } catch (e) { return "err " + e.message; }
}));

const light = await open("light");
await light.screenshot({ path: "out/today-light.png" });
await light.screenshot({ path: "out/today-light-full.png", fullPage: true });
console.log("bear says:", await light.textContent(".bear-say").catch(() => "(no bear)"));
console.log("miniTime:", await light.textContent("#miniTime"));
await light.click("#tab-radar"); await light.waitForTimeout(5000);
console.log("frameTime:", await light.textContent("#frameTime"), "rainInView:", await light.evaluate(() => rainInView(radarLayer(radarFrames.length - 1), map)), "miniTime now:", await light.textContent("#miniTime"), "mini rain:", await light.evaluate(() => rainInView(miniLayer, mini)));
await light.screenshot({ path: "out/radar.png" });
const vis = await light.evaluate(() => [...document.querySelectorAll("#map img.leaflet-tile")].filter((i) => i.src.includes("rainviewer") && getComputedStyle(i.closest(".leaflet-layer")).opacity !== "0").map((i) => i.src));
console.log("visible radar tiles", vis.length, "rain pixels", JSON.stringify(await light.evaluate(rainPixels, vis)));
const us = await light.evaluate(() => { const f = radarFrames[radarFrames.length - 1]; const out = []; for (let x = 2; x <= 5; x++) for (let y = 5; y <= 7; y++) out.push(`${radarHost}${f.path}/256/4/${x}/${y}/2/1_1.png`); return out; });
console.log("US z4 rain pixels", JSON.stringify(await light.evaluate(rainPixels, us)));
await light.click("#playBtn"); await light.waitForTimeout(300);
console.log("play label right after tap:", await light.textContent("#playLabel"));
await light.waitForTimeout(3500);
console.log("play label later:", await light.textContent("#playLabel"), "frame:", await light.textContent("#frameTime"));
await light.screenshot({ path: "out/radar-playing.png" });
await light.click("#tab-today"); await light.waitForTimeout(500);
await light.evaluate(() => { radarIdxAt = 0; }); await light.click("#tab-radar"); await light.waitForTimeout(2500);
console.log("after reopen frameTime:", await light.textContent("#frameTime"), "layers:", await light.evaluate(() => Object.keys(radarLayers).length));

// Every outfit, light and dark
for (const scheme of ["light", "dark"]) {
  const p = scheme === "light" ? light : await open("dark");
  if (scheme === "dark") await p.screenshot({ path: "out/today-dark.png" });
  await p.evaluate(() => {
    const wears = [["", "Nice day"], ["shades", "Hot or sunny"], ["umbrella", "Rain"], ["scarf", "Chilly"], ["beanie", "Cold or snow"], ["sleepy", "Night"]];
    document.querySelector(".app").innerHTML = `<div class="card" style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:16px">${wears.map(([w, l]) => `<div style="text-align:center"><div class="bear" style="width:96px;height:96px;margin:0 auto">${bearSVG(w)}</div><small style="color:var(--muted)">${l}</small></div>`).join("")}</div>`;
  });
  await p.waitForTimeout(300);
  await p.screenshot({ path: `out/bears-${scheme}.png`, clip: { x: 0, y: 0, width: 390, height: 420 } });
}
console.log("--- problems"); log.forEach((l) => console.log(l));
await browser.close();
