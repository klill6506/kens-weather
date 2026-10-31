# DECISIONS.md — kens-weather

- **Account**: personal GitHub (klill6506), not the delviotax org — Ken, 2026-10-28.
- **Hosting**: GitHub Pages, deploy from branch `main`, folder `/` — Ken, 2026-10-28.
- **Public repo** — Ken, 2026-10-28, so Pages can serve it. Consequence: no
  secrets or personal info in the repo, ever.
- **No-key data sources only** (Open-Meteo, NWS/NOAA, NHC, OpenStreetMap), so
  the app stays a static page with nothing to hide.
- **Radar from NOAA/NWS MRMS, not RainViewer** — Ken, 2026-10-31. RainViewer's
  free API is "personal and educational use only", which can't be shown to App
  Review as permission; NOAA radar is public domain. Any new data source must
  have terms that allow a free App Store app before it's added.
- **No ads, subscriptions or purchases** while on Open-Meteo's free tier — its
  non-commercial definition depends on that.
- **No server-side relay** — Ken, 2026-10-28. Storm list comes from the NWS
  tropical map service, which allows browser access; a Coolify relay for
  NHC's CurrentStorms.json was built, then skipped as unnecessary. If NWS is
  down the tab shows "Storm list unavailable" plus the outlook map — accepted.
- **Custom domain weather-bear.kenlill.com** — Ken, 2026-10-29. Stays on GitHub
  Pages (CNAME file + one DNS CNAME record), not Coolify like election.kenlill.com.
