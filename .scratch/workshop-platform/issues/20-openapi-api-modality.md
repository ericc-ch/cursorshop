# 20 — OpenAPI API modality

Type: research

Question: Can Effect RPC generate a useful OpenAPI contract, or should Showcase use Effect HttpApi?

Answer: **Use Effect `HttpApi` as the canonical API contract.** Effect RPC runs over HTTP, so someone could manually describe its single framed transport endpoint, but Effect has no built-in `RpcGroup` → OpenAPI conversion. A hand-written or custom-generated RPC-envelope spec would duplicate the contract and would not produce ordinary resource operations suitable for varied clients.

Evidence checked against Effect revision `c9b56ab507f224426ee8388dc450da447ec4715f` (2026-07-31):

- `effect/unstable/rpc` exports `Rpc`, `RpcGroup`, `RpcClient`, `RpcServer`, and transport modules, but no OpenAPI module or conversion. Searching that source tree finds no `OpenApi`, `OpenAPI`, or `HttpApi` integration.
- `OpenApi.fromApi` accepts only an `HttpApi.HttpApi`; the OpenAPI generator reflects HTTP groups and endpoints.
- `RpcServer.toHttpEffect` serves Effect's framed RPC protocol over HTTP POST, including procedure tags, request IDs, serialization, streaming, and interruption messages. It is not one ordinary HTTP route per procedure.
- Alchemy explicitly recommends Effect RPC for Effect/TypeScript consumers and Effect HTTP for plain HTTP, `curl`, and non-Effect consumers.

The web Worker will retain a typed client by constructing `HttpApiClient` from the same `HttpApi` contract and an `HttpClient` backed by the Cloudflare service binding. The API will expose an OpenAPI JSON document and interactive docs. Judge and submission-edit credentials will use documented HTTP security/header schemes.

Primary sources:

- [Alchemy API modality guide](https://v2.alchemy.run/apis/)
- [Alchemy Effect HTTP API guide](https://v2.alchemy.run/guides/effect-http-api/)
- [Effect HTTP API documentation](https://github.com/Effect-TS/effect/blob/c9b56ab507f224426ee8388dc450da447ec4715f/packages/effect/HTTPAPI.md)
- [Effect OpenApi source](https://github.com/Effect-TS/effect/blob/c9b56ab507f224426ee8388dc450da447ec4715f/packages/effect/src/unstable/httpapi/OpenApi.ts)
- [Effect RPC source](https://github.com/Effect-TS/effect/tree/c9b56ab507f224426ee8388dc450da447ec4715f/packages/effect/src/unstable/rpc)
