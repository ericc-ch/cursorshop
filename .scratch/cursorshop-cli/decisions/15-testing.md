# 15 — Testing strategy

Type: grilling

Question: How is the CLI tested for the MVP?

Answer: Use Vitest next to the CLI code for argument parsing, help text expectations, JSON stdout/stderr shaping, and exit codes. Add integration tests that run CLI commands against the Effect API web handler (or an equivalent in-process HTTP boundary) with the shared HttpApi contract. Do not require live npm-publish smoke tests or a separate process e2e harness against a deployed stack for the MVP.
