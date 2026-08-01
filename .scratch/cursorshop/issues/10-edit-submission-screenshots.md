# 10 — Edit Submission screenshots

What to build: Let a Participant replace or remove one fixed screenshot slot at a time during the `submissions` phase without allowing storage to grow beyond three objects.

Blocked by: 08 Submit a project from the browser

Status: open

## Research notes

- [ ] Consult the current TanStack Query mutation/cache, shadcn Base UI upload and confirmation components, browser file APIs, and accessibility documentation before coding.
- [ ] Load and follow the `design` skill before planning or editing UI.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the file-preview, slot mutation, cache-update, and component patterns before implementation._

- [ ] The shared contract defines edit-token-secured operations to replace and remove an individual screenshot slot.
- [ ] Replacement enforces the accepted MIME types and strict 1,000,000-byte limit.
- [ ] Removal is rejected when it would leave the Submission with zero screenshots.
- [ ] D1 metadata and R2 objects remain consistent after successful replacement or removal.
- [ ] Repeated replacements reuse the same three object slots and do not accumulate abandoned versions.
- [ ] The browser previews current screenshots and provides accessible replacement and removal controls.
- [ ] Successful replacements and removals update or invalidate the Submission Query cache.
- [ ] UI components follow the strict shadcn-first fallback order and define stable image dimensions to prevent layout shift.
- [ ] Handler and browser tests cover authorization, limits, minimum screenshot count, slot reuse, and phase locking.
- [ ] `pnpm run check` and `pnpm run build` pass.
