# 15 — Publish the final Leaderboard in the browser

What to build: Add the public results experience and verify the complete cursorshop journey from Room creation through final ranking.

Blocked by: 13 Score projects from the browser; 14 Compute the final Leaderboard through the API

Status: open

## Research notes

- [ ] Consult the current TanStack Start loader, Query prefetch/hydration, shadcn Base UI data-display components, responsive image/type, and Playwright documentation before coding.
- [ ] Load and follow the `design` skill before planning or editing UI.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the results Query, projector layout, celebratory treatment, and end-to-end test patterns before implementation._

- [ ] A Room in `results` displays ranked projects with overall, PRD, RFC, and App scores.
- [ ] The results route prefetches reusable Leaderboard Query options and reads the hydrated cache through Query hooks.
- [ ] The top five are clearly highlighted and unscored Submissions appear afterward as `Not scored`.
- [ ] The light editorial-scoreboard design is responsive, projector-friendly, and uses restrained celebration without adding dark mode.
- [ ] UI components follow the strict shadcn-first fallback order and include polished loading, empty, error, focus, and reduced-motion states.
- [ ] Submission and scoring controls remain locked in `results`.
- [ ] Results remain hidden in `submissions` and `judging` without leaking aggregate data through the browser or public API.
- [ ] Playwright covers Room creation, complete Submission creation and editing, phase advancement, two Judges scoring and revising, results publication, tie-breaking, and unscored placement.
- [ ] The deployed web and public API paths receive a final smoke check on the one-stage `cursorshop.ericc.ch` / `api.cursorshop.ericc.ch` topology.
- [ ] `pnpm run check` and `pnpm run build` pass.
