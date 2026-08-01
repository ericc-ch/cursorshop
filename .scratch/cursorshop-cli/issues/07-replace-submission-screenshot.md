# 07 — Replace Submission screenshot

What to build: Add the OpenAPI-aligned screenshot replace command that updates one fixed slot with a local file using the edit token.

Blocked by: 04 Create Submission with screenshots

Status: open

## Research notes

- [ ] Consult the current shared screenshot replace operation and fixed-slot contract before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the replace operation name, slot argument, and multipart/file mapping before implementation._

- [ ] The command replaces exactly one screenshot slot from a local `--screenshot <path>` (or OpenAPI-aligned file flag).
- [ ] `--edit-token` is required; no env fallback or local persistence.
- [ ] MIME/size and phase errors from the API surface as JSON stderr with exit `2`.
- [ ] Success prints updated Submission or screenshot metadata JSON aligned with OpenAPI.
- [ ] Vitest covers path reading, required token, and error mapping.
- [ ] `pnpm run check` and `pnpm run build` pass.
