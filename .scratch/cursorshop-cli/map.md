# cursorshop CLI

Destination: Add a Node-based `cursorshop` CLI that drives the complete cursorshop lifecycle through the public OpenAPI API at `api.cursorshop.ericc.ch`. It is automation-first: non-interactive inputs, JSON stdout, JSON errors on stderr, meaningful exit codes, clear `--help`/examples, and publishability via `npx cursorshop`.

Notes: Wayfinding complete. Implementation tickets live under `./issues/`; architecture decisions live under `./decisions/`. The CLI reuses the shared Effect `HttpApi` contract and never accesses D1 or R2 directly. Product and API decisions live in `.scratch/cursorshop/spec.md`, `CONTEXT.md`, and `docs/adr/`. Before each implementation ticket, research current local references and/or primary official docs and record the selected APIs. Use tsdown docs at https://tsdown.dev/.

Implementation spec: [cursorshop CLI](./spec.md)

Implementation tickets: `./issues/01`–`12` (CLI can proceed in parallel with web once the shared contract is stubbed or real).

Decisions so far:

- Full workflow scope — create/read Rooms, submit/edit projects, advance phases, score, and read results
- Automation-first interface — non-interactive flags, JSON stdout, JSON stderr errors, exit 0/1/2
- [Open creation](./decisions/01-open-creation.md) — Remove Turnstile; Room and Submission creation are public for web and CLI clients
- [CLI package and framework](./decisions/02-package-framework.md) — `apps/cli`, Node 22, TypeScript, and Effect v4's `effect/unstable/cli`
- [Naming and domain](./decisions/03-naming-and-domain.md) — `cursorshop` everywhere; web `cursorshop.ericc.ch`; API `api.cursorshop.ericc.ch`
- [Distribution](./decisions/04-distribution.md) — tsdown bundle; publish npm package `cursorshop`; invoke with `npx cursorshop`
- [HttpApi client and agent docs](./decisions/05-httpapi-client-and-docs.md) — shared HttpApiClient; agent-clear OpenAPI; CLI help mirrors OpenAPI
- [Command hierarchy](./decisions/06-command-hierarchy.md) — `cursorshop room|submission|score|results` resource verbs aligned with OpenAPI
- [Operation coverage](./decisions/07-operation-coverage.md) — full OpenAPI surface; no parallel vocabulary; MVP maps room/submission/score/results ops
- [Input conventions](./decisions/08-input-conventions.md) — string flags only for text; screenshot paths; explicit secret flags; no env fallbacks or JSON stdin
- [Base URL configuration](./decisions/09-base-url.md) — optional `--base-url`; default `https://api.cursorshop.ericc.ch`; no env or config file
- [Credential persistence](./decisions/10-credential-persistence.md) — no local secret storage; docs note agents may persist outside the CLI
- [Output and exit codes](./decisions/11-output-and-exit-codes.md) — JSON stdout / JSON stderr; no `--pretty`; exit 0/1/2
- [Timeouts and retries](./decisions/12-timeouts-retries.md) — 30s timeout; no automatic retries
- [Phase advance safeguards](./decisions/13-phase-advance-safeguards.md) — judge secret only; document irreversibility; no --confirm
- [Judge identity and review media](./decisions/14-judge-identity-media.md) — `--judge-name` each time; Markdown + screenshot URLs in JSON; no downloads
- [Testing strategy](./decisions/15-testing.md) — Vitest unit + handler integration; no live publish smoke for MVP

Not yet specified:

- Nothing; implementation tickets are ready

Out of scope:

- Direct D1 or R2 access
- A built-in AI model or autonomous judging logic
- Browser automation for the web application
- User accounts
- Turnstile, automation tokens, or provisioned agent keys
- An interactive terminal UI
- Replacing the web experience
- A second generated OpenAPI client
