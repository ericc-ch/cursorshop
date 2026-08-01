# 01 — Serve the canonical health API and docs locally

What to build: Replace the ad hoc health route with a shared Effect `HttpApi` contract that serves a typed health operation, an OpenAPI document, and interactive API documentation in local development.

Blocked by: None

Status: done

## Research notes

- [x] Consult the current Effect v4 local reference and official HttpApi, OpenAPI, and client documentation before coding.
- Sources:
  - Local Effect reference: `/tmp/references/effect/packages/effect/HTTPAPI.md`
  - Local Effect modules: `effect/unstable/httpapi` (`HttpApi`, `HttpApiEndpoint`, `HttpApiGroup`, `HttpApiBuilder`, `HttpApiClient`, `HttpApiScalar`, `OpenApi`, `HttpApiError`)
  - Alchemy guide (Worker wiring later): https://v2.alchemy.run/guides/effect-http-api/ and `/tmp/references/alchemy/website/src/content/docs/cloudflare/apis/effect-http-api.mdx`
  - Local Alchemy monorepo example: `/tmp/references/alchemy/examples/monorepo-single-stack/backend/src/{Spec,Service}.ts`
- Chosen API/pattern:
  - Define the canonical contract in `packages/shared` as `HttpApi.make(...).add(HttpApiGroup...)` with `HttpApiEndpoint.get("health", "/health", { success, error })`, group/API `.prefix("/api")` so the route is `GET /api/health`.
  - Annotate the API and endpoint with `OpenApi.Title` / `OpenApi.Version` / `OpenApi.Description` / `OpenApi.Summary` so agents get clear OpenAPI docs.
  - Implement handlers with `HttpApiBuilder.group` + `HttpApiBuilder.layer(api, { openapiPath: "/openapi.json" })` in `apps/api` (separate from the Node entrypoint).
  - Serve interactive docs with `HttpApiScalar.layer(api)` at `/docs`.
  - Derive the typed client with `HttpApiClient.make` from the same shared `HttpApi` (no second client).
  - Test through `HttpRouter.toWebHandler` (health JSON, OpenAPI JSON, docs HTML) and a typed client call.

- [x] The shared package defines the canonical health endpoint and its request, response, and error schemas.
- [x] The API builds its route from the shared `HttpApi` and keeps handler construction separate from the runtime entrypoint.
- [x] A typed client derived from the same contract can call the health endpoint.
- [x] The raw OpenAPI document and interactive documentation are available from the local API.
- [x] Handler-level tests verify the health response and generated documentation routes.
- [x] `pnpm run check` and `pnpm run build` pass.
