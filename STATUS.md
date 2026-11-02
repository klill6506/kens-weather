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
- App Review (Guideline 2.1 info request on build 15): Ken installs build 19
  from TestFlight, records the screen, swaps build 15 → 19, updates the
  description line, pastes Notes, replies with the recording. All text and
  steps in app-store/review-reply.md. (Builds 17 and 18 skipped, 2026-11-02:
  17's Privacy link was faint blue on blue; 18's Privacy/Support pages had
  no way back to the app. Both found by Ken on TestFlight, fixed in 19.)

## Blockers
- None.
