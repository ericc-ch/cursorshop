# Workshop platform

Destination: Lock architecture for Showcase on Alchemy + Cloudflare Workers Free (R2 PAYG), one stage on workers.dev: rooms, Effect HttpApi + OpenAPI API Worker and TanStack Start web Worker in a pnpm monorepo (`apps/web`, `apps/api`, `packages/shared`), D1 + R2, no accounts. Spec-ready, not code yet.

Notes: Wayfinder only. Product truth: `docs/workshop_slides.md` (ignore `llms.txt`). Domain terms live in `CONTEXT.md`; consequential architecture decisions live in `docs/adr/`. `/tmp/references/effect` for Effect. **~3 hours**. Workers Free + R2 PAYG; pnpm; monorepo as decision 15; one Alchemy stage on workers.dev. Tests: Vitest unit + Playwright e2e.

Decisions so far:
- [Stack research](./issues/01-stack-research.md) — Alchemy v2 + Cloudflare; free-tier CPU is the main risk
- [Database](./issues/02-database.md) — D1
- [Worker topology](./issues/03-worker-topology.md) — TanStack Start web + Effect API Workers
- [API modality (Effect RPC)](./issues/04-api-modality-effect-rpc.md) — Superseded by OpenAPI API modality
- [Authentication](./issues/05-authentication.md) — Skip Better Auth
- [Web → API transport](./issues/06-web-api-binding.md) — Alchemy service binding
- [Submission artifacts](./issues/07-submission-artifacts.md) — repo, URL, PRD, RFC, screenshots
- [Screenshot storage](./issues/08-screenshot-storage.md) — R2
- [Rooms](./issues/09-rooms.md) — Createable rooms; public link + judge secret
- [Judge access](./issues/10-judge-access.md) — Shared secret + one-time judge name; upsert scores
- [Submit fields and score dimensions](./issues/11-submit-and-score.md) — repo/URL/PRD/RFC/screenshots; score PRD/RFC/App
- [Deployed URL liveness check](./issues/12-liveness-check.md) — Skip
- [Cloudflare billing](./issues/13-cloudflare-billing.md) — Workers Free; R2 PAYG
- [Package manager](./issues/14-package-manager.md) — pnpm
- [Monorepo shape](./issues/15-monorepo-shape.md) — apps/web, apps/api, packages/shared, root alchemy.run.ts
- [Stages, secrets, domain](./issues/16-stages-secrets-domain.md) — One stage; workers.dev; Alchemy-managed IaC
- [Testing](./issues/17-testing.md) — Vitest unit + Playwright e2e; skip Alchemy test / Vitest browser mode for MVP
- [Submission identity](./issues/18-submission-identity.md) — Require participant/team name and project title
- [Submission editing](./issues/19-submission-editing.md) — Unguessable edit token; no account or recovery
- [OpenAPI API modality](./issues/20-openapi-api-modality.md) — Effect HttpApi is canonical; typed client + OpenAPI
- [Room lifecycle](./issues/21-room-lifecycle.md) — Submissions → judging → results; forward-only and secret-controlled
- [Screenshot constraints](./issues/22-screenshot-constraints.md) — Require 1–3 JPEG/PNG/WebP files, ≤5 MB each
- [Ranking completeness](./issues/23-ranking-completeness.md) — Complete scorecards only; unscored entries remain unranked
- [Secret handling](./issues/24-secret-handling.md) — Random opaque credentials; hash at rest; documented headers; no recovery

Not yet specified:
- Room expiration and cleanup

Out of scope:
- Better Auth / user accounts
- `llms.txt` submission artifact
- Per-judge secrets
- Secret-judge-URL as the only gate
- Deployed URL liveness check
- Workers Paid as a requirement
- Bun as package manager
- Custom domain / multi-stage split
- Alchemy live deploy/destroy test suites
- Vitest Browser Mode as the primary e2e layer (optional later for components)
- Netlify / Railway
- Hyperdrive / Postgres
- Effect RPC and duplicate RPC/HTTP contracts
- Multi-room admin dashboards, realtime leaderboard
- Building features during wayfinding
