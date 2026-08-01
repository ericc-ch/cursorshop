# Separate web and Effect HttpApi Workers

cursorshop will define its public API with Effect `HttpApi`, deploy it separately from the TanStack Start web Worker, and derive the typed web client, `cursorshop` CLI client, and OpenAPI documentation from that same contract. The web Worker calls the API through an Alchemy-managed service binding; the CLI and other external clients call `api.cursorshop.ericc.ch`.

**Status:** accepted

**Options Considered:** One combined Worker; Effect RPC; maintaining both RPC and HTTP contracts; a custom RPC-to-OpenAPI generator; a second OpenAPI-generated CLI client.

**Consequences:** External clients and agents receive ordinary HTTP operations and documented security schemes. The CLI must stay vocabulary-aligned with OpenAPI. Effect RPC is not used because it cannot natively generate the required operation-level OpenAPI contract.
