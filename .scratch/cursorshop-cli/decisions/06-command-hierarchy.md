# 06 — Command hierarchy

Type: grilling

Question: How should the CLI command tree be shaped?

Answer: Use resource verbs aligned with OpenAPI groups: `cursorshop room`, `cursorshop submission`, `cursorshop score`, and `cursorshop results`, each with nested subcommands for create/read/update-style operations. Keep command names, flags, and help text aligned with the shared HttpApi / OpenAPI vocabulary rather than inventing a parallel workflow dialect.
