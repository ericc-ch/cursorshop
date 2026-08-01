# 03 — Deploy the web Worker through the API binding

What to build: Replace the starter Vite SPA with a TanStack Start cursorshop shell deployed as a Cloudflare Worker that calls the API through an Alchemy-managed service binding.

Blocked by: 02 Deploy the API Worker and storage bindings

Status: open

## Research notes

- [ ] Consult the current TanStack Start, Router, Query, shadcn TanStack, Base UI, Tailwind, Alchemy, and Cloudflare service-binding documentation before coding.
- [ ] Load and follow the `design` skill before planning or editing UI.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the current setup, Query hydration, and service-binding patterns before implementation._

- [ ] The web application runs on TanStack Start and retains React as its UI library.
- [ ] One Query client is provided through the Router context; route loaders prefetch reusable Query options and components read the hydrated cache through Query hooks.
- [ ] Tailwind and shadcn are initialized with Base UI, with initial light editorial-scoreboard tokens and foundational shadcn components.
- [ ] Alchemy deploys the web Worker on `cursorshop.ericc.ch` and binds it to the API Worker.
- [ ] Server-side web code wraps the bound fetcher as an Effect HTTP client and uses the shared typed `HttpApiClient`.
- [ ] The cursorshop shell displays API health without a development-only public API base URL.
- [ ] The shell includes intentional loading, error, empty, focus, and responsive states rather than starter placeholders.
- [ ] The obsolete starter SPA path is removed after the TanStack Start path works.
- [ ] Browser and integration tests verify the bound web-to-API health flow.
- [ ] `pnpm run check` and `pnpm run build` pass.
