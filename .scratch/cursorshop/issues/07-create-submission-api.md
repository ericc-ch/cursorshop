# 07 — Create a complete Submission through the API

What to build: Add the multipart API operation that creates one complete Submission with validated project fields and screenshots, persists metadata in D1 and objects in R2, and returns a one-time edit token.

Blocked by: 04 Create a Room through the API

Status: open

## Research notes

- [ ] Consult the current Effect HttpApi multipart and Schema, Drizzle D1, Cloudflare R2, and Web Crypto references or official documentation before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the current multipart, bounded validation, storage consistency, and credential APIs before implementation._

- [ ] D1 migrations and Drizzle schemas store Submission fields, edit-token hash, creation time, and three fixed screenshot metadata slots.
- [ ] Creation is public, allowed only in the Room's `submissions` phase, and rejects the 101st Submission.
- [ ] The multipart contract requires participant or team name, project title, GitHub repository, deployed URL, PRD Markdown, RFC Markdown, and one to three screenshots.
- [ ] PRD and RFC are required strings of at most 100,000 characters each.
- [ ] Every screenshot is JPEG, PNG, or WebP and strictly smaller than 1,000,000 bytes.
- [ ] Screenshot objects use predictable fixed-slot keys and a failed request does not expose a partial Submission.
- [ ] Creation generates at least 128 bits of edit-token randomness, stores only its SHA-256 hash, and returns plaintext once.
- [ ] The operation and all validation, phase, and capacity errors appear in OpenAPI.
- [ ] Handler tests cover multipart boundaries, all limits, Room capacity, failure cleanup behavior, and successful D1/R2 persistence.
- [ ] `pnpm run check` and `pnpm run build` pass.
