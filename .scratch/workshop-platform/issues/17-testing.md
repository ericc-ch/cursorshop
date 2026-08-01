# 17 — Testing

Type: research

Question: Skip Alchemy tests; use Vitest — and for mostly-e2e, Playwright or Vitest browser mode?

Answer: **Skip Alchemy live-stack tests.** Use **Vitest (Node)** for unit/integration next to code (scoring math, schemas, handlers). For **mostly e2e**, use **Playwright Test (`@playwright/test`)** against a running app (`alchemy dev` / preview): create room → submit → judge → leaderboard. That is the right tool for multi-page, full-stack flows.

**Vitest Browser Mode** (Playwright as _provider_ via `@vitest/browser-playwright`) is **not** a substitute for that e2e layer — it mounts components in a real browser for component-level tests. Optional later; not required for the MVP “mostly e2e” goal. Sources: [Vitest Browser Mode](https://vitest.dev/guide/browser/), [Epic Web: Browser Mode vs Playwright](https://www.epicweb.dev/vitest-browser-mode-vs-playwright).
