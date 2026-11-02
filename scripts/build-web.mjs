// Builds www/ for the iPhone app from the same index.html the website uses.
// index.html stays the single source; the app-only bits are injected here so
// the website is untouched.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const out = "www";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

cpSync("icons", `${out}/icons`, { recursive: true });
// In the app these pages replace the weather screen and there is no browser Back button
// (build 18 was a dead end), so give them one. The website copies stay as they are.
for (const page of ["privacy.html", "support.html"]) {
  const src = readFileSync(page, "utf8");
  if (!src.includes("<main>")) throw new Error(`${page} no longer contains <main>`);
  writeFileSync(`${out}/${page}`, src.replace("<main>", `<main>\n<a href="index.html" style="display:inline-block;padding:10px 0;margin-bottom:6px;font-size:17px;font-weight:600;text-decoration:none">‹ Back to Weather Bear</a>`));
}
cpSync("node_modules/@capacitor/core/dist/capacitor.js", `${out}/capacitor.js`);
cpSync("scripts/native-shim.js", `${out}/native-shim.js`);

let html = readFileSync("index.html", "utf8");
const must = (s) => { if (!html.includes(s)) throw new Error(`index.html no longer contains ${s}`); };

// Load the Capacitor bridge and the native shim before the app's own script.
must("</head>");
html = html.replace("</head>", `<script src="capacitor.js"></script><script src="native-shim.js"></script>\n</head>`);

// The website tells people to fix location in Safari settings; in the app it's the app's own settings.
html = html.replaceAll("Settings › Safari › Location", "Settings › Weather Bear › Location");

// The website greets Ken by name; the App Store app is for everyone.
html = html.replace(/Good (morning|afternoon|evening), Ken/g, "Good $1");

// Guideline 5.1.1 wants the privacy policy reachable inside the app. It sits under the data
// credits in their white footer style; plain links were near-invisible on the sky (build 17).
const credits = "Storms from the National Hurricane Center</p>";
must(credits);
html = html.replace(credits, `${credits}\n  <p class="foot" style="font-size:.95rem;font-weight:700;margin-bottom:env(safe-area-inset-bottom)"><a href="privacy.html" style="display:inline-block;padding:8px 10px">Privacy</a> · <a href="support.html" style="display:inline-block;padding:8px 10px">Support</a></p>`);

writeFileSync(`${out}/index.html`, html);
console.log("www/ built");
