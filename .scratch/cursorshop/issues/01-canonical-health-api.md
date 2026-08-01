# 01 — Serve the canonical health API and docs locally

What to build: Replace the ad hoc health route with a shared Effect `HttpApi` contract that serves a typed health operation, an OpenAPI document, and interactive API documentation in local development.

Blocked by: None

Status: open

## Research notes

- [ ] Consult the current Effect v4 local reference and official HttpApi, OpenAPI, and client documentation before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the current APIs and contract structure before implementation._

- [ ] The shared package defines the canonical health endpoint and its request, response, and error schemas.
- [ ] The API builds its route from the shared `HttpApi` and keeps handler construction separate from the runtime entrypoint.
- [ ] A typed client derived from the same contract can call the health endpoint.
- [ ] The raw OpenAPI document and interactive documentation are available from the local API.
- [ ] Handler-level tests verify the health response and generated documentation routes.
- [ ] `pnpm run check` and `pnpm run build` pass.
