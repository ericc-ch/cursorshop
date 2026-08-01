# 01 — Stack research

Type: research

Question: Does Alchemy + Cloudflare free tier + Effect (OpenAPI) + Better Auth + Drizzle + TanStack Start + React + shadcn fit together, and what did we miss?

Answer: Yes — the stack is coherent and first-party-supported as a combination. Use **Alchemy v2** (`alchemy@next`, Effect `Stack`) on Cloudflare Workers; **D1 + Drizzle** for data; a dedicated **Effect `HttpApi` Worker** for the public OpenAPI surface; **TanStack Start + React + shadcn** (Tailwind implied) for the web app; **Better Auth** with its official TanStack Start integration. Main caveat: Workers Free **10 ms CPU** is tight for SSR + auth; workshop traffic fits request/D1 quotas, but CPU may push toward Workers Paid ($5).

## Fit by piece

| Piece                    | Verdict                                                                                                                                                                                                               | Source notes                                                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alchemy + Cloudflare     | First-class. User link is v2 getting-started: `Alchemy.Stack` + `Cloudflare.providers()` / `Cloudflare.state()`.                                                                                                      | [getting-started](https://alchemy.run/getting-started/), [migrating from v1](https://alchemy.run/migrating-from-v1/) (v1 docs at v1.alchemy.run)                  |
| Effect backend + OpenAPI | Alchemy’s recommended shape for external HTTP clients is Effect `HttpApi` on a Worker. Effect derives OpenAPI from the same API value (`OpenApi.fromApi`) and can serve Swagger/Scalar UI (e.g. `/docs`).             | [Effect HTTP API guide](https://v2.alchemy.run/guides/effect-http-api/), Effect `HttpApiSwagger` / HTTPAPI docs                                                   |
| TanStack Start           | v2 deploys Start via `Cloudflare.Website.Vite` (SSR + `nodejs_compat` by default). Older `TanStackStart(...)` examples are v1-shaped.                                                                                 | [Vite website provider](https://v2.alchemy.run/providers/cloudflare/website/vite/), [v1 TanStack guide](https://v1.alchemy.run/guides/cloudflare-tanstack-start/) |
| Drizzle                  | Official Alchemy D1 + Drizzle path; set `migrationsTable: "drizzle_migrations"`. Alchemy also documents Effect-aware `drizzle-orm/effect-d1`. Hyperdrive + Postgres is the alternate for external SQL.                | [D1Database](https://alchemy.run/providers/cloudflare/d1-database/), Alchemy Cloudflare hub “Postgres-backed API → Hyperdrive + Drizzle”                          |
| Better Auth              | Official TanStack Start guide (`/api/auth/$` handlers + `tanstackStartCookies`). Drizzle adapter with `provider: "sqlite"` for D1. Auth instance is typically request-scoped on Workers (D1 binding only at runtime). | [Better Auth TanStack](https://www.better-auth.com/docs/integrations/tanstack), [installation](https://www.better-auth.com/docs/installation)                     |
| shadcn + React           | Official TanStack Start install (`shadcn init -t start`); needs Tailwind (TanStack defaults).                                                                                                                         | [shadcn TanStack Start](https://ui.shadcn.com/docs/installation/tanstack)                                                                                         |

## Recommended baseline shape

1. **Alchemy v2 Stack** declaring Cloudflare resources (D1, Workers, secrets).
2. **`apps/web`** — TanStack Start + React + Tailwind + shadcn, deployed with `Cloudflare.Website.Vite`.
3. **`apps/api`** — Effect `HttpApi` Worker exposing `/docs` (and raw OpenAPI) for browsers and external clients.
4. **`packages/shared`** — Effect Schema / API contract shared across web and API.
5. **D1** bound into the API (and auth if auth lives there); Drizzle migrations applied on deploy.
6. **Better Auth** — prefer mounting on the Start app first (docs are clearest); API Worker validates sessions / later API keys for external clients.

Wire web → API with a Worker service binding or same-zone routes so the browser can keep a relative `/api` style without a separate public origin if desired.

## Cloudflare free tier (relevant limits)

From Cloudflare Workers / D1 docs (as of mid-2026):

- **100k Worker requests / day** (account) — fine for a live workshop.
- **10 ms CPU / request** on Free — Cloudflare notes auth + SSR often land in **10–20 ms**. Highest risk for this stack.
- **Worker size 3 MB gzip** on Free — watch Effect + Start + UI bundle weight.
- **D1 Free**: 5M rows read / day, 100k rows written / day, 5 GB storage — enough for workshop submit/score/leaderboard.
- **R2 Free** available if uploads appear later (old plan said links-only).

Workshop-sized traffic fits quotas; treat **Workers Paid ($5)** as the safety valve if Free CPU truncates SSR/auth.

## What you already named vs what was missing

**Named and validated:** Alchemy + Cloudflare, Effect backend, OpenAPI for non-web use, Better Auth, Drizzle, TanStack Start, React, shadcn.

**Missed / must decide next:**

1. **Database product** — D1 (natural free-tier default) vs Hyperdrive + Postgres.
2. **Worker topology** — one combined Worker vs **web + API** (recommended for a clean OpenAPI boundary).
3. **Auth placement + methods** — email/password, OAuth, and/or API keys for external clients.
4. **External client auth** — cookie sessions alone are weak for “usable outside the web app”; plan bearer/API keys or similar.
5. **Tailwind** — required by shadcn (usually via TanStack defaults).
6. **Alchemy major version** — follow **v2** (`alchemy@next`); don’t copy v1 `await alchemy()` / `TanStackStart` snippets blindly.
7. **Package manager** — repo is **pnpm**; Alchemy examples lean Bun. Both work; pick one for DX scripts.
8. **Free vs Paid Workers** — especially for CPU headroom with Start SSR + auth.
9. **Stages / secrets / CORS / custom domain** — needed before deploy, not before product shape.
10. **Realtime** — Durable Objects / WebSockets only if live leaderboard push is in scope (old plan was refresh-friendly).

## Repo impact

Current Cursor Shop starter (`apps/web` Vite SPA, `apps/api` Effect on Node, Vite `/api` proxy) does not match this target. Expect a deliberate reshape of those packages when implementation starts — out of scope for wayfinding beyond recording it.
