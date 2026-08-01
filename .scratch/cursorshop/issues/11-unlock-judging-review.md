# 11 — Unlock judging and review projects

What to build: Give Judges a secret-gated browser flow for choosing a session display name and reviewing all complete Submissions while a Room is in `judging`.

Blocked by: 06 Advance the Room phase; 07 Create a complete Submission through the API

Status: open

## Research notes

- [ ] Consult the current TanStack Start loader, Query prefetch/hydration, shadcn Base UI navigation and disclosure components, Markdown safety, and accessibility documentation before coding.
- [ ] Load and follow the `design` skill before planning or editing UI.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the judging Query, session credential, Markdown rendering, and component patterns before implementation._

- [ ] A judge-secret-secured API operation returns the complete Submission review data needed during judging.
- [ ] The API rejects review access before `judging`, after `results`, or with an invalid judge secret.
- [ ] The browser asks for the judge secret and a non-empty display name before showing the review queue.
- [ ] The display name is retained in `sessionStorage` for the browser session; the judge secret is not placed in URLs.
- [ ] Review pages show participant or team name, project title, links, PRD and RFC Markdown, and screenshots.
- [ ] The judging route prefetches reusable Query options and reads review data through Query hooks.
- [ ] The review queue is optimized for desktop judging while remaining fully usable on mobile.
- [ ] UI components follow the strict shadcn-first fallback order and include loading, empty, error, focus, and active-review states.
- [ ] User-authored Markdown is rendered without executing raw HTML or script content.
- [ ] Handler and browser tests cover phase gates, invalid secrets, session display names, and safe project rendering.
- [ ] `pnpm run check` and `pnpm run build` pass.
