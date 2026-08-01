# cursorshop

Agent-first CLI for the workshop leaderboard at [leaderboard.naufaldi.com](https://leaderboard.naufaldi.com) (the [Showcase](https://github.com/naufaldi/showcase) board used at Cursor Jakarta × Hacktiv8 workshops).

The board has no documented API, so cursorshop reverse-engineers the deployed TanStack Start bundle and drives the same server functions the browser uses — with a hand-rolled seroval codec, browser-shaped requests, JSON in/out, and zero runtime dependencies.

## Install & run

```sh
npx cursorshop list
npx cursorshop get --id <uuid>
npx cursorshop submit \
  --title "My Project" --name "My Team" \
  --repo-url https://github.com/me/repo \
  --app-url https://my-app.example.com \
  --prd-file prd.md --rfc-file rfc.md \
  --screenshot screenshot.png
```

Requires Node ≥ 22.18. Success prints one JSON value to stdout; failures print one JSON error to stderr. Exit codes: `0` ok · `1` usage/validation · `2` board or transport failure. `--base-url` overrides the board origin.

## How it works

1. Endpoint hashes are recovered from the board's deployed JS bundle and cross-checked against its open-source server functions.
2. GET calls send a seroval-envelope `payload` query parameter; submissions post `FormData` mirroring the web form field-for-field.
3. The edge rejects non-browser traffic, so requests carry the exact header profile the web app sends.

## Scope

Submission surface only: `list`, `get`, `submit`. Judging endpoints exist upstream but are intentionally out of scope.
