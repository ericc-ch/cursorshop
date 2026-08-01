# 10 — Upsert Score

What to build: Add `cursorshop score upsert` for complete PRD/RFC/App scorecards with explicit judge secret and judge name each run.

Blocked by: 01 Scaffold CLI and create Room

Status: open

## Research notes

- [ ] Consult the current shared score upsert operation, complete-scorecard schema, and security headers before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the upsert operation and flag mapping before implementation._

- [ ] `cursorshop score upsert` requires `--judge-secret` and `--judge-name` every run; no local judge-session persistence.
- [ ] Flags require all three ratings together (PRD, RFC, App), each 1–10, matching OpenAPI.
- [ ] Success prints the Score JSON; partial/invalid input exits `1`; API/auth/phase failures exit `2`.
- [ ] `--help` mirrors OpenAPI vocabulary.
- [ ] Vitest covers complete validation, missing identity flags, and success/error shaping.
- [ ] `pnpm run check` and `pnpm run build` pass.
