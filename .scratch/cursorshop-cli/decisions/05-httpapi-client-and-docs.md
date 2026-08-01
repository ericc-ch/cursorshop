# 05 — HttpApi client and agent docs

Type: grilling

Question: How does the CLI talk to the API, and how do agents discover operations?

Answer: Derive the CLI client from the **shared Effect `HttpApi` contract** in `packages/shared` via `HttpApiClient` against a configurable public base URL (default `https://api.cursorshop.ericc.ch`). Do not generate a second OpenAPI client or hand-write fetch wrappers. Document every API operation, field, header, and error clearly in the `HttpApi` / OpenAPI surface so agents can understand the published OpenAPI without tribal knowledge. Mirror that documentation in CLI `--help` text and examples; help should stay aligned with OpenAPI rather than inventing a parallel vocabulary.
