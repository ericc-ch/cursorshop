# 13 — Score projects from the browser

What to build: Add the Judge-facing scorecard UI for entering and revising complete PRD, RFC, and App ratings for each Submission.

Blocked by: 12 Upsert Scores through the API

Status: open

## Research notes

- [ ] Consult the current TanStack Query mutation/cache, TanStack Form, Effect Standard Schema, and shadcn Base UI field/control documentation before coding.
- [ ] Load and follow the `design` skill before planning or editing UI.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the score Form, mutation, optimistic or invalidation, and component patterns before implementation._

- [ ] Every project review includes one scorecard with required PRD, RFC, and App ratings from 1 through 10.
- [ ] Scorecards use TanStack Form with the shared Effect score schema adapted through Standard Schema.
- [ ] The browser sends the session display name and judge secret through the secured typed API operation.
- [ ] Existing ratings load into the scorecard and a revision replaces the prior Score.
- [ ] Submission progress distinguishes unscored and scored projects without revealing aggregate results.
- [ ] Successful writes update or invalidate the Judge's Score Query cache.
- [ ] UI components follow the strict shadcn-first fallback order and optimize rapid desktop judging without sacrificing mobile access.
- [ ] The UI rejects incomplete scorecards and explains authorization, validation, and phase errors.
- [ ] Scoring controls are unavailable outside the `judging` phase.
- [ ] Browser tests cover first scoring, retry behavior, score revision, incomplete input, and phase locking.
- [ ] `pnpm run check` and `pnpm run build` pass.
