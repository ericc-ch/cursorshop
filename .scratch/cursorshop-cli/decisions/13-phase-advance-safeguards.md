# 13 — Phase advance safeguards

Type: grilling

Question: What safeguard does the CLI add for irreversible Room phase transitions?

Answer: None beyond the existing API authorization. `cursorshop room advance` requires `--judge-secret` and performs the forward transition immediately. Document irreversibility clearly in OpenAPI and CLI `--help`. Do not add `--confirm`, `--yes`, or dry-run modes for the MVP.
