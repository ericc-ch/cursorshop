# 09 — Base URL configuration

Type: grilling

Question: How does the CLI select the API base URL?

Answer: Accept an optional `--base-url` flag on every command. Default to `https://api.cursorshop.ericc.ch`. Do not read the base URL from environment variables or a config file in the MVP.
