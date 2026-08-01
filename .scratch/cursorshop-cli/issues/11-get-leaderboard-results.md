# 11 — Get Leaderboard results

What to build: Add `cursorshop results get` that prints Leaderboard JSON once a Room is in the results phase.

Blocked by: 01 Scaffold CLI and create Room

Status: open

## Research notes

- [ ] Consult the current shared Leaderboard/results operation and response schema before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the results operation and CLI mapping before implementation._

- [ ] `cursorshop results get` accepts the OpenAPI-aligned Room identifier and requires no judge secret.
- [ ] Success prints Leaderboard JSON including ranked entries, top-five markers, and unscored placement when present.
- [ ] Hidden-before-results and transport failures exit `2` with JSON stderr.
- [ ] `--help` mirrors OpenAPI vocabulary.
- [ ] Vitest covers success and phase-gated failure paths.
- [ ] `pnpm run check` and `pnpm run build` pass.
