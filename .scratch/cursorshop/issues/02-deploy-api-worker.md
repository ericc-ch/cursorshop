# 02 — Deploy the API Worker and storage bindings

What to build: Add the Alchemy v2 stack and Cloudflare-compatible API entrypoint so the canonical API runs publicly on `api.cursorshop.ericc.ch` with provisioned D1 and R2 bindings.

Blocked by: 01 Serve the canonical health API and docs locally

Status: done

## Research notes

- [x] Consult the current Alchemy and Cloudflare Workers, D1, and R2 references or official documentation before coding.
- Sources:
  - Local Alchemy reference: `/tmp/references/alchemy` (`2.0.0-beta.66`)
  - Effect HttpApi on Workers: `/tmp/references/alchemy/website/src/content/docs/cloudflare/apis/effect-http-api.mdx`
  - Workers: `/tmp/references/alchemy/website/src/content/docs/cloudflare/compute/workers.mdx`
  - Custom domains: `/tmp/references/alchemy/website/src/content/docs/cloudflare/networking/custom-domains.mdx`
  - D1: `/tmp/references/alchemy/website/src/content/docs/cloudflare/data/d1.mdx` + `examples/cloudflare-d1-drizzle`
  - R2: `/tmp/references/alchemy/website/src/content/docs/cloudflare/data/r2.mdx`
  - Stack / stages / local state: `/tmp/references/alchemy/website/src/content/docs/infrastructure-as-code/stack.mdx`, `environments/stages.mdx`, `environments/local-development.mdx`, `state-store/index.mdx`
  - File layout: `/tmp/references/alchemy/website/src/content/docs/project-structure/file-layout.mdx`
  - Monorepo Worker pattern: `/tmp/references/alchemy/examples/monorepo-single-stack/backend/src/Service.ts`
  - Project ADRs: `docs/adr/0001-use-alchemy-v2-on-cloudflare.md`, `docs/adr/0002-separate-web-and-http-api-workers.md`
- Chosen API/pattern:
  - Root `alchemy.run.ts` re-exports `Alchemy.Stack("cursorshop", …)` from `apps/api/src/stack.ts`, targeting a single intended stage (`prod`); custom domain is fixed to `api.cursorshop.ericc.ch` (no multi-stage host branching).
  - Declare `Cloudflare.D1.Database("Database")` and `Cloudflare.R2.Bucket("Screenshots", { storageClass: "Standard" })` (R2 PAYG Standard class; omit Workers `limits` so Free-plan defaults apply).
  - Effect-native API Worker via `Cloudflare.Worker` class form with `main: import.meta.url`, Init-phase `Cloudflare.D1.QueryDatabase` + `Cloudflare.R2.ReadWriteBucket`, and binding layers `QueryDatabaseBinding` / `ReadWriteBucketBinding`.
  - Keep `ApiLive` as the route layer; Worker entry yields `HttpRouter.toHttpEffect(WorkerApiLive)` so Node local `index.ts` and tests keep using the same routes without a Node server adapter on the Worker path.
  - Local equivalent bindings come from `alchemy dev` (local D1/R2 simulators) without changing `ApiLive`; Node `pnpm run dev:api` remains the lightweight route-only loop.
  - Tests assert deploy config + Worker-compatible handler composition; do **not** add Alchemy live deploy/destroy suites.

- [x] The root Alchemy stack declares one stage, a public API Worker on `api.cursorshop.ericc.ch`, a D1 database, and an R2 bucket.
- [x] The API Worker receives typed D1 and R2 bindings and runs without a Node.js server adapter.
- [x] Local development can supply equivalent bindings without changing application routes.
- [x] The deployed API exposes health, OpenAPI, and interactive documentation on its public URL.
- [x] Workers Free is the default deployment target and R2 remains pay-as-you-go.
- [x] Deployment configuration and Worker entrypoint tests pass without adding live deploy/destroy tests.
- [x] `pnpm run check` and `pnpm run build` pass.
