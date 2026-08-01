# 06 — Update Submission fields

What to build: Add `cursorshop submission update` for edit-token-authorized text-field updates during the submissions phase.

Blocked by: 01 Scaffold CLI and create Room

Status: open

## Research notes

- [ ] Consult the current shared Submission field-update operation and `X-Submission-Edit-Token` scheme before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the update operation and flag/header mapping before implementation._

- [ ] `cursorshop submission update` requires `--edit-token` as an explicit flag with no env or local persistence helper.
- [ ] Text fields are string flags only; `--help` documents shell substitution for long Markdown.
- [ ] Success prints the updated Submission JSON.
- [ ] Invalid token, wrong phase, validation, and transport failures map to JSON stderr and exit `1` or `2`.
- [ ] Vitest covers required-token enforcement and success/error shaping.
- [ ] `pnpm run check` and `pnpm run build` pass.
