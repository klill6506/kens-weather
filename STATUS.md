# STATUS.md — kens-weather

*Updated: 2026-11-12*

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
- Approved: version 1.0 (build 19) is READY_FOR_DISTRIBUTION on the U.S. App
  Store since 2026-11-06 (https://apps.apple.com/us/app/id6828571593), released
  automatically after approval (checked 2026-11-12). Check any
  time with Actions › iOS › Run workflow › review_status.
- Whatever Ken wants next for the app.

## Blockers
- None.
