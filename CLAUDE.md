# CLAUDE.md — kens-weather

## What this is
Ken's ad-free, single-page weather app: current conditions, sunrise/sunset,
hourly and 7-day forecasts, NWS alerts, radar, and NHC tropical storm tracking.
See README.md for the data sources (all free, no API keys).

## Stack & conventions
- Everything lives in `index.html` (inline CSS + JS, Leaflet from cdnjs). No
  build step.
- Hosted on **GitHub Pages**: deploy from branch `main`, folder `/` (root).
  Pushing to `main` redeploys the site.
- Custom domain **weather-bear.kenlill.com** via the `CNAME` file in the repo
  root (don't delete it). DNS: a CNAME record `weather-bear` → `klill6506.github.io`
  at kenlill.com's DNS host; it overrides the `*.kenlill.com` wildcard that points
  at Ken's Coolify server.
- `.nojekyll` is present, so Pages serves every file in the repo as-is —
  including these memory files.
- **The repo is PUBLIC.** Never commit API keys, tokens, home address /
  coordinates, or personal notes. Keep MEMORY/STATUS/DECISIONS to project
  facts only. If a data source ever needs a key, it needs a server-side proxy,
  not a key in `index.html`.

## Repo
- GitHub: klill6506/kens-weather (Ken's personal account — NOT the delviotax org).
- Main-only git, commit early and often, never force-push.
