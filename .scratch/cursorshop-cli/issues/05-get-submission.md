# 05 — Get Submission

What to build: Add `cursorshop submission get` that prints one Submission as JSON, including Markdown and screenshot URLs without downloading files.

Blocked by: 01 Scaffold CLI and create Room

Status: open

## Research notes

- [ ] Consult the current shared Submission read operation and response schema before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the current read operation and CLI mapping before implementation._

- [ ] `cursorshop submission get` accepts OpenAPI-aligned Room and Submission identifiers.
- [ ] Success prints one JSON Submission including PRD/RFC Markdown and screenshot URLs.
- [ ] The CLI does not download screenshot files.
- [ ] Missing resources and transport failures exit `2` with JSON stderr.
- [ ] Vitest covers success and error paths at the CLI boundary.
- [ ] `pnpm run check` and `pnpm run build` pass.
