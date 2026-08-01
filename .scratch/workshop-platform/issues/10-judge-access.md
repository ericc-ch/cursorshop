# 10 — Judge access

Type: grilling

Question: How do multiple judges score without accounts?

Answer: **One shared judge secret per room** (password / API-key style), entered on the judge UI — not a capability buried only in the URL. Each judge also sets a **display name once** when unlocking (persist in `sessionStorage`); score RPCs send secret + `judgeName`. Upsert on `(submission, judgeName)` so independent scores average cleanly and retries overwrite instead of stacking. Per-judge secrets are out of scope.
