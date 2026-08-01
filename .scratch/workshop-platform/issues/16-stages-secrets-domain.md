# 16 — Stages, secrets, domain

Type: grilling

Question: Deploy stages, secret handling, and custom domain?

Answer: **One deploy stage.** Public web on **`cursorshop.ericc.ch`** and public API on **`api.cursorshop.ericc.ch`**. Infra/secrets/state are **Alchemy-managed** (IaC). Per-room judge secrets are app data in **D1**, not Cloudflare Worker secrets.
