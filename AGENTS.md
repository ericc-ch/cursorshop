Cursor Shop is a pnpm monorepo starter for a web application.

## Priorities

- Maintainability
- Reliability
- A small, understandable toolchain

Choose correctness and clear boundaries over short-term convenience.

## Architecture

- **Web app** — `apps/web`: Vite and React browser application.
- **API** — `apps/api`: Effect HTTP routes and a Node.js server entrypoint.
- **Shared contracts** — `packages/shared`: schemas and types shared across runtime boundaries.

The web app calls the API through `/api`. Vite proxies that path to the local API during development, so browser code does not need a development-only base URL.

## Workspace

Use pnpm as the package manager and Node.js as the runtime:

- `pnpm install`
- `pnpm run dev:web`
- `pnpm run dev:api`
- `pnpm run check`
- `pnpm run build`

After TypeScript, API, or web changes, run `pnpm run check` and `pnpm run build` when the change affects a build entrypoint.

## TypeScript

The root `tsconfig.json` owns strict compiler defaults. Each workspace package has a small project config and a package-local `typecheck` script. Use `node:` imports for Node built-ins.

## Editing

- Use Oxfmt for formatting and Oxlint for linting.
- Keep shared data shapes in `packages/shared`.
- Keep API route construction separate from the server entrypoint so routes can be tested through the Effect web handler.
- Add tests next to the code they exercise.

## Effect

- Use Effect for application programs, services, and failure-aware boundaries.
- Use Effect Schema for data crossing the API and browser boundary.
- Keep `Effect.run*` calls at application edges such as the Node.js server entrypoint or a framework adapter.
- The root TypeScript configuration enables `@effect/language-service` for editor diagnostics and refactors.

## References Directory

The `/tmp/references/` directory contains shallow clones of important external repositories populated by `pnpm run references`.
Never make changes in that directory; it is reference-only.

Available references:

- Effect — Effect v4
- React — browser UI library
- Vite — web build tool
- Alchemy — Infrastructure-as-Effects framework (https://alchemy.run)
