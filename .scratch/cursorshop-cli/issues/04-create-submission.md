# 04 — Create Submission with screenshots

What to build: Add `cursorshop submission create` with string field flags and one to three local screenshot paths, returning the one-time edit token as JSON.

Blocked by: 01 Scaffold CLI and create Room

Status: open

## Research notes

- [ ] Consult the current shared multipart Submission create contract, Effect CLI file/flag patterns, and screenshot constraints before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the multipart client mapping and flag layout before implementation._

- [ ] `cursorshop submission create` accepts OpenAPI-aligned string flags for participant/team name, project title, GitHub repository, deployed URL, PRD, and RFC.
- [ ] Text flags do not accept file paths; `--help` documents shell substitution such as `--prd "$(cat file.md)"`.
- [ ] Screenshots are passed with repeated `--screenshot <path>` (1–3 files) and read from disk for the multipart request.
- [ ] Success prints Submission JSON including the one-time edit token; docs note agents may persist that token themselves.
- [ ] Validation, capacity, phase, and transport failures map to exit `1` or `2` with JSON stderr.
- [ ] Vitest covers flag parsing, screenshot path handling, and success/error JSON shaping.
- [ ] `pnpm run check` and `pnpm run build` pass.
