# 08 — Input conventions

Type: grilling

Question: How do agents pass Markdown, screenshots, and secrets into CLI commands?

Answer:
- Pass text fields as string flags only (`--prd`, `--rfc`, titles, URLs, names). Do not accept file paths for those flags; encourage shell substitution such as `--prd "$(cat file.md)"` or fish `--prd (cat file.md)`.
- Pass screenshots as local file paths with repeated `--screenshot <path>` (1–3 files).
- Pass credentials only as explicit flags such as `--judge-secret` and `--edit-token`. Do not read secrets from environment variables in the MVP.
- Do not accept JSON stdin payloads in the MVP.
- Return one-time plaintext credentials only in creation responses; otherwise do not echo secrets back.
