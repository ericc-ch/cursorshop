# 02 — Deploy the API Worker and storage bindings

What to build: Add the Alchemy v2 stack and Cloudflare-compatible API entrypoint so the canonical API runs publicly on `api.cursorshop.ericc.ch` with provisioned D1 and R2 bindings.

Blocked by: 01 Serve the canonical health API and docs locally

Status: open

## Research notes

- [ ] Consult the current Alchemy and Cloudflare Workers, D1, and R2 references or official documentation before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the current resource and Worker binding APIs before implementation._

- [ ] The root Alchemy stack declares one stage, a public API Worker on `api.cursorshop.ericc.ch`, a D1 database, and an R2 bucket.
- [ ] The API Worker receives typed D1 and R2 bindings and runs without a Node.js server adapter.
- [ ] Local development can supply equivalent bindings without changing application routes.
- [ ] The deployed API exposes health, OpenAPI, and interactive documentation on its public URL.
- [ ] Workers Free is the default deployment target and R2 remains pay-as-you-go.
- [ ] Deployment configuration and Worker entrypoint tests pass without adding live deploy/destroy tests.
- [ ] `pnpm run check` and `pnpm run build` pass.
