# 12 — Timeouts and retries

Type: grilling

Question: How does the CLI handle request timeouts and retries?

Answer: Use a fixed request timeout of 30 seconds. Do not automatically retry any command. Agents or operators may re-invoke commands themselves. Document this in `--help`.
