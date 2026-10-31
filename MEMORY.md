# MEMORY.md — kens-weather

## Accumulated context
- 2026-10-28: Repo created under Ken's personal GitHub account (klill6506),
  explicitly not the Delvio org (delviotax). The app itself (index.html,
  README.md, .nojekyll — commit c4e0b9b) was pushed by a separate Claude
  session minutes after the repo was created. A Claude Code session cloning
  at the same time briefly replaced index.html with a placeholder (487ab12);
  the app was restored from c4e0b9b in the next commit. Lesson: re-check the
  remote right before pushing when another session may be working on a repo.
- 2026-10-28: Ken had the repo made public so GitHub Pages could serve it;
  Pages set to deploy from branch `main`, `/` (root).
- 2026-10-28: nhc.noaa.gov/CurrentStorms.json sends no CORS header, so the
  browser can't read it from Pages ("Storm list unavailable"). Fixed by the
  other Claude session: active storms now come from the NWS tropical map
  service (mapservices.weather.noaa.gov, CORS-enabled), NHC JSON kept as a
  fallback. In parallel a Claude Code session built a Coolify relay for the
  NHC file; Ken chose to skip it (nothing to run on the server) and it was
  deleted unpushed. Radar basemap moved from CARTO (now needs a key) to
  OpenStreetMap.
- Two Claude sessions (Code tab + another surface committing as "Claude")
  have worked on this repo at the same time. Always `git fetch` and compare
  before writing or pushing.
- 2026-10-31: Apple held build 15 under Guideline 2.1 (Information Needed,
  new developer account): screen recording, purpose, setup, external
  services, regions, and proof of data licenses. Terms checked that day:
  - RainViewer API: "personal and educational use only" (also capped at
    zoom 7, 100 req/IP/min since 2026-01-01) — NOT OK for an App Store app.
  - NWS/NOAA: public domain, "may be used without charge for any lawful
    purpose" (weather.gov/disclaimer); don't imply endorsement.
  - Open-Meteo free tier: non-commercial, defined to include apps "that do
    not have subscriptions or advertising"; CC BY 4.0 credit. Adding ads,
    subscriptions or purchases would require a paid Open-Meteo plan.
  - OSM tiles: app must send its own User-Agent ("Traffic that uses these
    defaults will be blocked"), credit on the map, no offline/prefetch.
  Fix (build 17): radar → NOAA/NCEP MRMS WMS (opengeo.ncep.noaa.gov, layers
  conus/alaska/hawaii/carib/guam *_bref_qcd, ~2-min frames, CORS *), and
  `ios.appendUserAgent` in capacitor.config.json. Reply text and Ken's steps:
  app-store/review-reply.md.
- Build numbers = GitHub Actions run number of ios.yml. Pushes to `main` do
  NOT run it (push trigger is the `ios-app-store` branch); uploads are a
  manual workflow_dispatch with upload=true.
