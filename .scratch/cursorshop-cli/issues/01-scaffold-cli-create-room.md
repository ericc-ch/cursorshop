# 01 — Scaffold CLI and create Room

What to build: Add `apps/cli` as the public `cursorshop` package and ship `cursorshop room create` end to end through the shared HttpApi client.

Blocked by: None

Status: open

## Research notes

- [ ] Consult current Effect v4 CLI / HttpApiClient docs, tsdown publishing docs, and the shared contract before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the current CLI, client, and packaging APIs before implementation._

- [ ] `apps/cli` is a pnpm workspace package targeting Node 22 with bin `cursorshop`.
- [ ] Commands use `effect/unstable/cli` with Node services at the entrypoint.
- [ ] tsdown bundles the package for npm; local `pnpm` scripts can invoke the bin.
- [ ] The client is derived from the shared Effect `HttpApi` contract via `HttpApiClient` (stub the create operation if the API ticket has not landed).
- [ ] `cursorshop room create` prints one JSON creation response to stdout including public Room URL and one-time judge secret.
- [ ] Optional `--base-url` defaults to `https://api.cursorshop.ericc.ch`; no env or config-file overrides.
- [ ] Requests use a 30s timeout with no automatic retries.
- [ ] Success exits `0`; usage/validation errors print JSON to stderr and exit `1`; API/transport failures print JSON to stderr and exit `2`.
- [ ] `--help` and examples mirror OpenAPI vocabulary and note that agents may persist the one-time judge secret themselves.
- [ ] Vitest covers parsing, help, JSON I/O, and exit codes for this command.
- [ ] `pnpm run check` and `pnpm run build` pass.
