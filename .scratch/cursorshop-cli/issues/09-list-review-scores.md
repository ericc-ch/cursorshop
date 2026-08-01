# 09 — List review scores

What to build: Add `cursorshop score list` so a judge can retrieve review data as JSON, including Markdown and screenshot URLs.

Blocked by: 01 Scaffold CLI and create Room

Status: open

## Research notes

- [ ] Consult the current shared judging review/list operation and header security scheme before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the list operation and header/flag mapping before implementation._

- [ ] `cursorshop score list` requires `--judge-secret` and uses OpenAPI-aligned Room identification.
- [ ] Success JSON includes Submission Markdown and screenshot URLs; the CLI does not download files.
- [ ] Unauthorized, wrong-phase, and transport failures exit `2` with JSON stderr.
- [ ] `--help` mirrors OpenAPI vocabulary and notes agents may persist the judge secret themselves.
- [ ] Vitest covers success and authorization error paths.
- [ ] `pnpm run check` and `pnpm run build` pass.
