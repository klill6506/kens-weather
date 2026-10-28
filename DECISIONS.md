# DECISIONS.md — kens-weather

- **Account**: personal GitHub (klill6506), not the delviotax org — Ken, 2026-10-28.
- **Hosting**: GitHub Pages, deploy from branch `main`, folder `/` — Ken, 2026-10-28.
- **Public repo** — Ken, 2026-10-28, so Pages can serve it. Consequence: no
  secrets or personal info in the repo, ever.
- **No-key data sources only** (Open-Meteo, NWS, RainViewer, NHC), so the app
  stays a static page with nothing to hide.
- **No server-side relay** — Ken, 2026-10-28. Storm list comes from the NWS
  tropical map service, which allows browser access; a Coolify relay for
  NHC's CurrentStorms.json was built, then skipped as unnecessary. If NWS is
  down the tab shows "Storm list unavailable" plus the outlook map — accepted.
