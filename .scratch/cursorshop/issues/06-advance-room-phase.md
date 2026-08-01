# 06 — Advance the Room phase

What to build: Let a holder of the Room's judge secret advance it from `submissions` to `judging` to `results` through the API and browser.

Blocked by: 05 Create a Room from the browser

Status: open

## Research notes

- [ ] Consult the current Effect HttpApi, TanStack Query mutation/cache, shadcn Base UI confirmation component, and accessibility documentation before coding.
- [ ] Load and follow the `design` skill before planning or editing UI.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the transition, cache-update, and confirmation patterns before implementation._

- [ ] The shared contract models the three Room phases and a phase-transition operation using `X-Judge-Secret`.
- [ ] The API verifies the hashed secret and permits only the next forward transition.
- [ ] Unauthorized, skipped, repeated, and backward transitions return explicit typed errors.
- [ ] The public Room reflects phase changes and exposes controls only after the organizer supplies the judge secret.
- [ ] Successful transitions update or invalidate the Room Query cache through the documented mutation policy.
- [ ] UI components follow the strict shadcn-first fallback order.
- [ ] The browser clearly warns that phase transitions lock earlier activities and cannot be reversed.
- [ ] Unit and handler tests cover the complete transition matrix and secret verification.
- [ ] `pnpm run check` and `pnpm run build` pass.
