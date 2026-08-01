# cursorshop

A workshop submission platform and the tooling that drives it — built live at a Cursor Jakarta × Hacktiv8 workshop.

Two things live here:

- **`cursorshop` on npm** — an agent-first CLI for the [workshop leaderboard](https://leaderboard.naufaldi.com). The board has no documented API, so the CLI reverse-engineers the deployed TanStack Start bundle and drives its real server functions: list, inspect, and submit projects from the terminal. See [`apps/cli`](./apps/cli).
  ```sh
  npx cursorshop list
  npx cursorshop get --id <uuid>
  npx cursorshop submit --title "…" --name "…" \
    --repo-url https://github.com/me/repo --app-url https://… \
    --prd-file prd.md --rfc-file rfc.md --screenshot screenshot.png
  ```
- **The cursorshop platform (in progress)** — accountless rooms, secret-gated judging, and a phase-driven leaderboard, per [docs/plan.md](./docs/plan.md). Web app (`apps/web`, TanStack Start + React), HTTP API (`apps/api`, Effect `HttpApi`), shared contracts (`packages/shared`), deploying to Cloudflare Workers via Alchemy.

## Stack

- pnpm workspaces and dependency catalogs
- TanStack Start, React, TanStack Query/Form, Tailwind, shadcn (Base UI)
- Effect `HttpApi` + Schema shared contracts
- Alchemy v2 on Cloudflare (Workers, D1 + Drizzle, R2)
- Oxc formatter and linter, Vitest, Node 22+ type stripping

## Structure

```text
apps/
  web/       TanStack Start web app (cursorshop.ericc.ch)
  api/       Effect HttpApi Worker (api.cursorshop.ericc.ch)
  cli/       `cursorshop` npm CLI for the workshop leaderboard
packages/
  shared/    Contracts shared by the API, web app, and CLI
```

## Getting Started

```sh
pnpm install
pnpm run check   # typecheck, test, lint
pnpm run build
```

Dev servers: `pnpm run dev:web`, `pnpm run dev:api`, or the whole Alchemy stack with `pnpm run dev:stack`.

## Conventions

- Keep app-specific code in `apps/` and reusable code in `packages/`.
- Put request and response contracts in `packages/shared` rather than duplicating them at either boundary.
- Prefetch into the TanStack Query cache from route loaders; components read through Query hooks; mutations update or invalidate the cache.
- Keep API route construction separate from Worker entrypoints; run Effect at application edges only.
