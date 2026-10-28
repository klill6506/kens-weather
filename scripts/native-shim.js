// Inside the iPhone app, route the page's location requests through iOS's own
// location service (Capacitor Geolocation) instead of the web view's, so people
// get one native permission prompt instead of two.
(function () {
  var C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform() || !navigator.geolocation) return;
  var Geo = C.registerPlugin("Geolocation");
  function getCurrentPosition(ok, fail, opts) {
    opts = opts || {};
    Geo.checkPermissions()
      .then(function (p) { return p.location === "granted" ? p : Geo.requestPermissions({ permissions: ["location"] }); })
      .then(function (p) {
        if (p.location !== "granted") throw new Error("denied");
        return Geo.getCurrentPosition({ enableHighAccuracy: !!opts.enableHighAccuracy, timeout: opts.timeout || 10000, maximumAge: opts.maximumAge || 0 });
      })
      .then(function (pos) { ok({ coords: pos.coords, timestamp: pos.timestamp }); })
      .catch(function (e) { if (fail) fail({ code: 1, message: String(e && e.message || e) }); });
  }
  try {
    Object.defineProperty(navigator.geolocation, "getCurrentPosition", { value: getCurrentPosition, configurable: true });
  } catch (e) {
    navigator.geolocation.getCurrentPosition = getCurrentPosition;
  }
})();
