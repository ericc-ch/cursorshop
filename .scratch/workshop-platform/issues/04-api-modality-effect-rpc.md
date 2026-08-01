# 04 — API modality (Effect RPC)

Type: research

Question: Should `apps/api` use Effect RPC instead of Effect HttpApi / OpenAPI?

Answer: **Yes — Effect RPC** for the API Worker. Define an `RpcGroup` in `packages/shared`, serve it with `RpcServer.toHttpEffect` (Alchemy `Cloudflare.RpcWorker` sugar), and call it from the web app with a typed `RpcClient`. Transport is still HTTP; there is **no OpenAPI generator** for RPC — that lives on `HttpApi` only. For a ~3 hour build with a TanStack Start + Effect client, RPC is the right trust-boundary modality; plain `curl`/OpenAPI consumers would need HttpApi (or both), which we should treat as out of scope unless reopened.

## Evidence

### Alchemy (choose modality)

From [APIs](https://v2.alchemy.run/apis/):

| Modality | Use when | Clients |
| --- | --- | --- |
| Schemaless RPC | Internal Worker↔Worker / DO | Bindings |
| **Effect RPC** | Trust boundary + Effect/TS consumers | Schema + Fetcher/URL |
| Effect HTTP (`HttpApi`) | Trust boundary + non-Effect consumers | Plain HTTP / OpenAPI |

Web app → API Worker is a trust boundary with an Effect/TS client → **Effect RPC**.

### Alchemy Worker wiring

[Effect RPC guide](https://v2.alchemy.run/guides/effect-rpc/): `RpcGroup` + handlers Layer + `RpcServer.toHttpEffect` → Worker `fetch`. Prefer `Cloudflare.RpcWorker` with `schema: TaskRpcs`. Web can bind via `RpcWorker.bind` (service binding) or `RpcClient` over HTTP URL.

### Effect references (`/tmp/references/effect`)

- Contracts live in `effect/unstable/rpc` (`Rpc`, `RpcGroup`, `RpcServer`, `RpcClient`, `RpcSerialization`).
- `RpcServer.toHttpEffect` serves the HTTP RPC protocol (not REST path-per-procedure).
- OpenAPI generation (`OpenApi.fromApi`, Swagger/Scalar, `@effect/openapi-generator`) is **HttpApi-only** — no OpenAPI path under `unstable/rpc`.

## Impact on Destination

Earlier Destination said “fully spec’d (expose OpenAPI)”. With Effect RPC, the **spec is the shared `RpcGroup` + Schema**, not an OpenAPI document. “Usable outside the web app” still holds for Effect/TS clients hitting the Worker URL; it does **not** mean arbitrary HTTP/OpenAPI clients unless we add HttpApi later.
