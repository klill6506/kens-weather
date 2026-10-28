// Builds www/ for the iPhone app from the same index.html the website uses.
// index.html stays the single source; the app-only bits are injected here so
// the website is untouched.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const out = "www";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

cpSync("icons", `${out}/icons`, { recursive: true });
cpSync("privacy.html", `${out}/privacy.html`);
cpSync("support.html", `${out}/support.html`);
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

// Guideline 5.1.1 wants the privacy policy reachable inside the app.
must("</body>");
html = html.replace("</body>", `<p style="text-align:center;font-size:13px;margin:24px 0 calc(24px + env(safe-area-inset-bottom))"><a href="privacy.html">Privacy</a> · <a href="support.html">Support</a></p>\n</body>`);

writeFileSync(`${out}/index.html`, html);
console.log("www/ built");
