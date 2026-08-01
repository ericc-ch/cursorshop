# 03 — Deploy the web Worker through the API binding

What to build: Replace the starter Vite SPA with a TanStack Start cursorshop shell deployed as a Cloudflare Worker that calls the API through an Alchemy-managed service binding.

Blocked by: 02 Deploy the API Worker and storage bindings

Status: done

## Research notes

- [x] Consult the current TanStack Start, Router, Query, shadcn TanStack, Base UI, Tailwind, Alchemy, and Cloudflare service-binding documentation before coding.
- [x] Load and follow the `design` skill before planning or editing UI.
- Sources:
  - Local Alchemy reference: `/tmp/references/alchemy` (`2.0.0-beta.66`)
  - Alchemy TanStack Start guide: `/tmp/references/alchemy/website/src/content/docs/cloudflare/frontend/tanstack-start.mdx`
  - Alchemy `Cloudflare.Website.Vite` API: `/tmp/references/alchemy/packages/alchemy/src/Cloudflare/Website/Vite.ts`
  - Alchemy example: `/tmp/references/alchemy/examples/cloudflare-tanstack` (Website + Backend service binding via `env`, `fromCloudflareFetcher` / `toHttpClient`, `assets.runWorkerFirst`, `nodejs_compat`)
  - Alchemy monorepo `rootDir`: `/tmp/references/alchemy/examples/monorepo-single-stack/alchemy.run.ts`
  - Effect `HttpApiClient.makeWith`: `/tmp/references/effect/packages/effect/src/unstable/httpapi/HttpApiClient.ts`
  - TanStack Router ↔ Query SSR: https://tanstack.com/router/latest/docs/integrations/query (`setupRouterSsrQueryIntegration`, per-request `QueryClient` in router context, loader `ensureQueryData`)
  - TanStack Start + Query example router: https://github.com/TanStack/router/blob/main/examples/react/start-basic-react-query/src/router.tsx
  - shadcn TanStack Start + Base UI default: https://ui.shadcn.com/docs/installation/tanstack , https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default
  - Project ADRs: `docs/adr/0001-use-alchemy-v2-on-cloudflare.md`, `docs/adr/0002-separate-web-and-http-api-workers.md`, `docs/adr/0004-use-tanstack-and-shadcn-frontend.md`
  - Design skill: `/home/erickc/.agents/skills/design/SKILL.md`
- Chosen API/pattern:
  - Replace the Vite SPA with TanStack Start (`@tanstack/react-start` + Router + React). Do **not** add `@cloudflare/vite-plugin` — Alchemy injects its own Cloudflare Vite plugin via `Cloudflare.Website.Vite`.
  - One `QueryClient` per `getRouter()` call, exposed on Router context; wire `setupRouterSsrQueryIntegration` with `wrapQueryClient: false` because `__root__` already mounts `QueryClientProvider`. Index loader calls `context.queryClient.ensureQueryData(healthQueryOptions)`; the shell reads with `useSuspenseQuery`.
  - Server-only health fetch uses Alchemy Bridge: `toHttpClient(fromCloudflareFetcher(env.API))` + shared `HttpApiClient.makeWith(CursorshopApi, { httpClient, baseUrl: "https://api.cursorshop.internal" })`. No browser `VITE_API_URL` / public API base URL.
  - Declare `Cloudflare.Website.Vite("Web", …)` in `apps/api/src/web.ts` (alongside the stack for acyclic TS refs) and yield it from the existing Alchemy stack (additive): `rootDir` → `apps/web`, `domain: "cursorshop.ericc.ch"`, `env: { API: Api }`, `compatibility.flags: ["nodejs_compat"]`, `assets.runWorkerFirst: true`. Web runtime `env` typing lives in `apps/web/src/web-env.ts` without importing the API package.
  - Tailwind v4 + shadcn-style components on Base UI (`Button` from `@base-ui/react/button`); light editorial-scoreboard tokens (cool field `#f3f5f8`, ink type, vivid signal accent `#ff4d1a`, Fraunces + Public Sans). Foundational components: Button, Badge, Card, Skeleton.
  - Tests: Vitest integration against a stub Fetcher over the Worker-compatible API handler; jsdom component tests for loading / error / empty / success / focus. No Alchemy live deploy/destroy suites.
  - Never hand-edit `apps/web/src/routeTree.gen.ts` — it is gitignored; let the TanStack Router plugin regenerate it.

- [x] The web application runs on TanStack Start and retains React as its UI library.
- [x] One Query client is provided through the Router context; route loaders prefetch reusable Query options and components read the hydrated cache through Query hooks.
- [x] Tailwind and shadcn are initialized with Base UI, with initial light editorial-scoreboard tokens and foundational shadcn components.
- [x] Alchemy deploys the web Worker on `cursorshop.ericc.ch` and binds it to the API Worker.
- [x] Server-side web code wraps the bound fetcher as an Effect HTTP client and uses the shared typed `HttpApiClient`.
- [x] The cursorshop shell displays API health without a development-only public API base URL.
- [x] The shell includes intentional loading, error, empty, focus, and responsive states rather than starter placeholders.
- [x] The obsolete starter SPA path is removed after the TanStack Start path works.
- [x] Browser and integration tests verify the bound web-to-API health flow.
- [x] `pnpm run check` and `pnpm run build` pass.
