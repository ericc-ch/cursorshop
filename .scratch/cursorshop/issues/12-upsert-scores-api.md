# 12 — Upsert Scores through the API

What to build: Add the judge-secret-secured API operations for reading and upserting one Judge's complete PRD, RFC, and App Score per Submission.

Blocked by: 11 Unlock judging and review projects

Status: open

## Research notes

- [ ] Consult the current Effect HttpApi and Schema, Drizzle D1 upsert and unique-index, and OpenAPI security-scheme documentation before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the current score validation, upsert, and secured read/write APIs before implementation._

- [ ] A D1 migration and Drizzle schema store integer PRD, RFC, and App ratings with a unique key on Submission and judge display name.
- [ ] The shared contract requires all three ratings together, each from 1 through 10, plus the judge display name.
- [ ] Score writes require `X-Judge-Secret` and are accepted only during the `judging` phase.
- [ ] Repeating a write for the same Submission and judge display name replaces the prior Score instead of adding another.
- [ ] A Judge can retrieve their existing Score values for revision without exposing other credential data.
- [ ] Partial, out-of-range, unauthorized, wrong-phase, and unknown-Submission requests return typed errors documented in OpenAPI.
- [ ] Unit and handler tests verify complete validation, uniqueness, idempotent retries, revisions, and phase enforcement.
- [ ] `pnpm run check` and `pnpm run build` pass.
