# 02 — Get Room

What to build: Add `cursorshop room get` so agents can read safe Room details and the current phase as JSON.

Blocked by: 01 Scaffold CLI and create Room

Status: open

## Research notes

- [ ] Consult the current shared HttpApi Room read operation and Effect CLI flag/arg patterns before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the current read operation and CLI mapping before implementation._

- [ ] `cursorshop room get` accepts the Room identifier as an OpenAPI-aligned argument or flag.
- [ ] The command prints one JSON Room value to stdout without credential hashes or plaintext secrets.
- [ ] Missing Room and transport failures return JSON on stderr with exit `2`; usage errors exit `1`.
- [ ] `--help` mirrors the OpenAPI Room read vocabulary.
- [ ] Vitest covers success and failure paths at the CLI boundary.
- [ ] `pnpm run check` and `pnpm run build` pass.
