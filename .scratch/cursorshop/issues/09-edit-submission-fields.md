# 09 — Edit Submission fields

What to build: Let a Participant update the textual and URL fields of their Submission during the `submissions` phase using the one-time-issued edit token.

Blocked by: 08 Submit a project from the browser

Status: open

## Research notes

- [ ] Consult the current TanStack Query mutation/cache, TanStack Form, Effect Standard Schema, and shadcn Base UI form documentation before coding.
- [ ] Load and follow the `design` skill before planning or editing UI.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the form initialization, mutation, cache-update, and component patterns before implementation._

- [ ] The shared contract defines a field-update operation secured by `X-Submission-Edit-Token`.
- [ ] The API verifies the stored token hash and rejects edits outside the `submissions` phase.
- [ ] Updates retain all required fields and enforce the 100,000-character PRD and RFC limits.
- [ ] The browser restores the Participant's editable Submission when its token is available and submits updates without exposing the token in the URL.
- [ ] The edit form uses TanStack Form with shared Effect schemas, and successful edits update or invalidate the relevant Query cache.
- [ ] UI components follow the strict shadcn-first fallback order and preserve mobile usability.
- [ ] Invalid tokens, missing client tokens, validation failures, and locked phases have clear responses.
- [ ] Handler and browser tests cover successful edits, unauthorized edits, validation, and phase locking.
- [ ] `pnpm run check` and `pnpm run build` pass.
