# 10 — Credential persistence

Type: grilling

Question: Does the CLI persist judge secrets or submission edit tokens locally?

Answer: **No.** The CLI never writes credentials to disk, config files, or environment helpers. Callers must pass `--judge-secret` and `--edit-token` explicitly on each command that needs them. OpenAPI descriptions and CLI `--help` should note that agents or operators may persist those one-time credentials themselves outside the CLI.
