# STATUS.md — kens-weather

*Updated: 2026-10-31*

## Done
- Single-page app in index.html (forecast, alerts, radar, tropics).
- Tropics tab verified live 2026-10-28: storm list loads from the NWS
  tropical map service (showed TD Vance, Eastern Pacific), no console errors.
- Repo klill6506/kens-weather (public), local folder D:\Personal\kens-weather.
- GitHub Pages: deploy from branch `main`, `/`.
- Saved places (2026-10-29): every city picked from search is saved; the place
  button lists them with current temps, tap to switch, × to remove (`kw.saved`).
- Weather Bear opens with a bear pun per condition (one per day), plain tip below.
- Radar on NOAA/NWS MRMS (public domain) instead of RainViewer, all US regions;
  iOS app identifies itself (User-Agent) for OSM tiles and NWS (2026-10-31).
  Verified in a local browser: 7 frames/hour, play loop, rain-pixel check,
  credits, region pick for Anchorage/Honolulu/San Juan/Guam/Key West.

## Next
- App Review: build 19 resubmitted 2026-11-02 with the screen recording and
  the reply in app-store/review-reply.md. Waiting on Apple. (Builds 17 and 18
  skipped: 17's Privacy link was faint blue on blue; 18's Privacy/Support
  pages had no way back to the app. Both found by Ken on TestFlight.)

## Blockers
- None.
