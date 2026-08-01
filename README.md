# Cursor Shop

An opinionated starter for a web app monorepo. It keeps the browser app, API, and shared contracts separate without hiding the development workflow behind a large toolchain.

## Stack

- pnpm workspaces and dependency catalogs
- Vite and React for the web app
- Effect HTTP on Node.js for the API
- Effect Schema for runtime-checked shared contracts
- Effect language-service diagnostics and refactors
- TypeScript project references
- Oxc formatter and linter
- Vitest for tests

## Structure

```text
apps/
  api/       Effect HTTP API and Node.js entrypoint
  web/       Vite and React application
packages/
  shared/    Contracts used by the API and web app
```

## Getting Started

Install dependencies:

```sh
pnpm install
```

Start the API and web app in separate terminals:

```sh
pnpm run dev:api
pnpm run dev:web
```

Open `http://localhost:5173`. The Vite server proxies `/api` requests to the API on port `3001`.

Run the full local check:

```sh
pnpm run check
pnpm run build
```

The API can be configured with `PORT`. Copy `.env.example` to `.env` when local environment values are needed.

Sync the external source references used by the project:

```sh
pnpm run references
```

Node.js runs the TypeScript entrypoints directly in the current Node runtime, so the API does not need a separate dev transpiler. The package manager is pinned to pnpm `11.2.2`.

## Conventions

- Keep app-specific code in `apps/` and reusable code in `packages/`.
- Put request and response contracts in `packages/shared` rather than duplicating them at either boundary.
- Prefer explicit package exports and package-local `typecheck` scripts.
- Keep runtime code portable; use Node-specific APIs only at the application entrypoint.
