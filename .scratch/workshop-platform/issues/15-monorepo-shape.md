# 15 — Monorepo shape

Type: grilling

Question: How should the pnpm monorepo be laid out for this stack?

Answer: Keep Cursor Shop package names, retarget them:

- `apps/web` — TanStack Start + React + shadcn
- `apps/api` — Effect `HttpApi` Worker with OpenAPI JSON and interactive docs
- `packages/shared` — `HttpApi` + Effect Schema contracts
- root `alchemy.run.ts` — Alchemy v2 Stack (D1, R2, web + api Workers, service binding)
