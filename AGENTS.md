# cursorshop

## Architecture

- **Web app** — `apps/web`: TanStack Start and React application deployed as a Cloudflare Worker on `cursorshop.ericc.ch`.
- **API** — `apps/api`: Effect `HttpApi` routes deployed as a Cloudflare Worker on `api.cursorshop.ericc.ch`.
- **CLI** — `apps/cli`: Effect CLI packaged as npm `cursorshop` (`npx cursorshop`), bundled with tsdown.
- **Shared contracts** — `packages/shared`: schemas and types shared across runtime boundaries.
- The web Worker calls the API Worker through a Cloudflare service binding; browser code does not use a development-only public API base URL.
- Use pnpm, Node.js, Oxfmt, and Oxlint.

## Workspace

- Run `pnpm run check` after TypeScript changes and `pnpm run build` when a build entrypoint changes.
- Use `node:` imports for Node built-ins.

## Frontend

- Use TanStack Query for server state. Route loaders prefetch reusable Query options; components read with Query hooks; mutations update or invalidate the Query cache.
- Use TanStack Form for form state and adapt shared Effect schemas through Effect's Standard Schema support.
- Use Tailwind and shadcn initialized with Base UI. Choose components in this order: existing shadcn component, composition of existing shadcn components, Base UI primitive, custom component. Document each fallback.
- Build one polished light editorial-scoreboard theme. Participant forms are mobile-first, judging is desktop-first but remains usable on mobile, and the leaderboard is responsive and projector-friendly.
- Before planning or editing frontend UI, load and follow the `design` skill.

## API and Effect

- Keep shared boundary schemas in `packages/shared`.
- Keep API route construction separate from Worker entrypoints and test routes through the Effect web handler.
- Keep `Effect.run*` calls at application edges such as a Worker entrypoint or framework adapter.
- Document every HttpApi / OpenAPI operation, field, header, and error clearly enough for agents.
- Derive web and CLI clients from the same HttpApi contract; do not generate a second client.

## Ticket research

- Before coding, inspect current local references and/or primary official documentation for every library API the ticket touches.
- Record sources and the chosen current API or pattern in the ticket's Research notes.

## References Directory

`pnpm run references` populates read-only shallow clones in `/tmp/references/` for Effect v4, React, Vite, and Alchemy. Never modify them.
