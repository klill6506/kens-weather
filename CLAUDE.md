# CLAUDE.md — kens-weather

## What this is
Ken's personal weather app. Scope and features not decided yet — see STATUS.md.

## Stack & conventions
- Static site served by **GitHub Pages** from branch `main`, folder `/` (root).
  No build step yet; `index.html` at the repo root is the home page.
- Pages runs Jekyll by default. `_config.yml` excludes the project memory files
  (CLAUDE/MEMORY/STATUS/DECISIONS.md) so they are not published on the site —
  keep that list current if more private files are added. Do not add
  `.nojekyll` without another way to keep them off the site (without Jekyll,
  .md files are served raw).
- The repo is private, but the **Pages site itself is public**.

## Repo
- GitHub: klill6506/kens-weather (Ken's personal account — NOT the delviotax org).
- Main-only git, commit early and often, never force-push.
- Pushing to `main` redeploys the site.
