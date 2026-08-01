# 03 — Advance Room phase

What to build: Add `cursorshop room advance` for irreversible forward phase transitions authorized only by the judge secret.

Blocked by: 01 Scaffold CLI and create Room

Status: open

## Research notes

- [ ] Consult the current shared HttpApi phase-transition operation and header security scheme before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the current advance operation and header mapping before implementation._

- [ ] `cursorshop room advance` requires `--judge-secret` and performs the next forward transition immediately.
- [ ] There is no `--confirm`, `--yes`, or dry-run mode.
- [ ] `--help` documents irreversibility and that agents may persist the judge secret outside the CLI.
- [ ] Success prints the updated Room JSON; unauthorized, wrong-phase, and transport errors exit `2` with JSON stderr.
- [ ] Vitest covers success, missing secret, and API error mapping.
- [ ] `pnpm run check` and `pnpm run build` pass.
