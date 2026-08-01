# cursorshop CLI

Problem: AI agents and operators need to create rooms, submit projects, judge scores, and read results without using the browser, while staying aligned with the same public API humans use.

Solution: Ship a Node CLI named `cursorshop` that drives the full cursorshop lifecycle through the shared Effect `HttpApi` contract against `api.cursorshop.ericc.ch`. Agents invoke it with `npx cursorshop`, get JSON in and out, and discover operations from OpenAPI plus CLI `--help` that mirror each other.

User stories:

1. As an agent, I want to create a Room and receive its public URL and one-time judge secret as JSON, so that I can run a cursorshop session without a browser.
2. As an agent, I want to create and update a Submission with string fields and screenshot files, so that I can enter a project on behalf of a participant.
3. As an agent, I want to advance a Room phase with the judge secret, so that I can move from submissions to judging to results.
4. As an agent, I want to list review data and upsert complete scores with an explicit judge name, so that I can judge without accounts.
5. As an agent, I want to fetch the Leaderboard as JSON after results open, so that I can report rankings.
6. As an agent, I want OpenAPI descriptions and CLI `--help`/examples to use the same vocabulary, so that I can discover commands without tribal knowledge.
7. As an operator, I want to install and run the CLI with `npx cursorshop`, so that I do not need a local monorepo checkout.

Implementation decisions:

- Add `apps/cli` as a pnpm workspace package targeting Node 22 and TypeScript.
- Define commands with Effect v4 `effect/unstable/cli` and provide Node services at the entrypoint.
- Bundle and typecheck the package with tsdown for npm publishing. Publish the public package `cursorshop` with bin `cursorshop` so agents run `npx cursorshop`.
- Derive the HTTP client from the shared Effect `HttpApi` contract via `HttpApiClient`. Do not generate a second OpenAPI client or hand-write fetch wrappers.
- Default the API base URL to `https://api.cursorshop.ericc.ch`. Allow override only with `--base-url`. Do not read base URL from env or config files.
- Expose the full public OpenAPI surface as resource subcommands: `cursorshop room`, `cursorshop submission`, `cursorshop score`, and `cursorshop results`. Keep command, flag, header, and field names aligned with OpenAPI.
- Expected MVP mapping: `room create|get|advance`; `submission create|get|update` plus screenshot `replace|remove`; `score list|upsert`; `results get`.
- Pass text fields as string flags only (`--prd`, `--rfc`, titles, URLs, names). Do not accept file paths for those flags; document shell substitution such as `--prd "$(cat file.md)"`.
- Pass screenshots as local file paths with repeated `--screenshot <path>` (1–3 files).
- Pass credentials only as explicit flags (`--judge-secret`, `--edit-token`). Require `--judge-name` on score commands that need it.
- Do not persist credentials or judge identity locally. Document in OpenAPI and `--help` that agents may persist one-time credentials themselves outside the CLI.
- On success, print one JSON value to stdout. On failure, print one JSON error object to stderr using the OpenAPI error shape when available. Do not add `--pretty`.
- Exit `0` on success, `1` on usage/validation errors, and `2` on API or transport failures.
- Use a fixed 30-second request timeout and never automatically retry. Agents may re-invoke commands themselves.
- `room advance` requires only `--judge-secret` and runs immediately. Document irreversibility in OpenAPI and `--help`. Do not add `--confirm`, `--yes`, or dry-run modes.
- Review and score-list responses include Submission Markdown and screenshot URLs. The CLI does not download screenshot files.
- Document every HttpApi / OpenAPI operation, field, header, and error clearly enough for agents. Mirror that documentation in CLI `--help` and examples.
- Never access D1 or R2 directly. Call only the public API.
- Room and Submission creation remain fully public for web and CLI clients (no Turnstile or machine token).

Testing decisions:

- Use Vitest next to CLI code for argument parsing, help expectations, JSON stdout/stderr shaping, and exit codes.
- Add integration tests that run CLI commands against the Effect API web handler (or an equivalent in-process HTTP boundary) using the shared HttpApi contract.
- Prefer assertions at the CLI public boundary and HTTP contract boundary rather than private helpers.
- Do not require live npm-publish smoke tests or a separate process e2e harness against a deployed stack for the MVP.
- Run the repository typecheck, test, lint, and build commands after implementation changes.

Out of scope:

- Direct D1 or R2 access.
- Built-in AI model or autonomous judging logic.
- Browser automation for the web application.
- User accounts, Turnstile, automation tokens, and provisioned agent keys.
- Interactive terminal UI / prompts.
- Environment-variable or config-file credential and base-URL helpers.
- Local secret persistence and screenshot download commands.
- Automatic retries, `--pretty` output, `--confirm` / dry-run phase advances.
- A second generated OpenAPI client.
- Replacing the web experience.

Notes:

- Product behavior and API rules come from the cursorshop spec and architecture decisions; this CLI is a client of that API.
- Domain language is defined in `CONTEXT.md`.
- Research current Effect CLI, HttpApiClient, and tsdown documentation before implementation tickets; record sources in ticket Research notes.
- tsdown documentation: https://tsdown.dev/
