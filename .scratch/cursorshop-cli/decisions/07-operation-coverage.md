# 07 — Operation coverage

Type: grilling

Question: Which API operations does the CLI expose?

Answer: Expose the full public OpenAPI surface as CLI subcommands under the resource verbs. Do not invent a parallel command vocabulary or omit documented operations. When OpenAPI adds or renames an operation, update the matching CLI subcommand and help text. The expected MVP mapping is:

- `cursorshop room create|get|advance`
- `cursorshop submission create|get|update` plus screenshot `replace|remove` for fixed slots
- `cursorshop score list|upsert`
- `cursorshop results get`

Flags, path params, headers, and body fields use the same names and meanings as the OpenAPI contract.
