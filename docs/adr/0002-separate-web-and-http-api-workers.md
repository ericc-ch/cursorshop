# Separate web and Effect HttpApi Workers

Showcase will define its public API with Effect `HttpApi`, deploy it separately from the TanStack Start web Worker, and derive both a typed web client and OpenAPI documentation from that contract. The web Worker calls the API through an Alchemy-managed service binding.

**Status:** accepted

**Options Considered:** One combined Worker; Effect RPC; maintaining both RPC and HTTP contracts; a custom RPC-to-OpenAPI generator.

**Consequences:** External clients receive ordinary HTTP operations and documented security schemes. Effect RPC is not used because it cannot natively generate the required operation-level OpenAPI contract.
