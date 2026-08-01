# 03 — Worker topology

Type: grilling

Question: One Worker or TanStack Start web + Effect API Worker?

Answer: **Two Workers** in one Alchemy stack — `apps/web` (TanStack Start) and `apps/api` (Effect), sharing D1 and `packages/shared`. Keeps the API boundary clean for non-browser clients within a ~3 hour build.
