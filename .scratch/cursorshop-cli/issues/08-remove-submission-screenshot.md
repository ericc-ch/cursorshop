# 08 — Remove Submission screenshot

What to build: Add the OpenAPI-aligned screenshot remove command for one fixed slot while preserving the API's at-least-one-screenshot rule.

Blocked by: 04 Create Submission with screenshots

Status: open

## Research notes

- [ ] Consult the current shared screenshot remove operation and minimum-slot rule before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the remove operation name and slot argument before implementation._

- [ ] The command removes one screenshot slot identified by the OpenAPI-aligned slot argument.
- [ ] `--edit-token` is required; no env fallback or local persistence.
- [ ] API rejection when removal would leave zero screenshots exits `2` with JSON stderr.
- [ ] Success prints updated Submission or screenshot metadata JSON aligned with OpenAPI.
- [ ] Vitest covers required token and minimum-screenshot error mapping.
- [ ] `pnpm run check` and `pnpm run build` pass.
