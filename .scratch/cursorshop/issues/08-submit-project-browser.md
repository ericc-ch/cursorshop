# 08 — Submit a project from the browser

What to build: Add the participant-facing browser form that sends one complete multipart Submission and preserves the returned edit capability.

Blocked by: 05 Create a Room from the browser; 07 Create a complete Submission through the API

Status: open

## Research notes

- [ ] Consult the current TanStack Start, Query, Form, Effect Standard Schema, and shadcn Base UI form/upload documentation before coding.
- [ ] Load and follow the `design` skill before planning or editing UI.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the multipart Form, Query mutation, file-input, and component patterns before implementation._

- [ ] A Room in the `submissions` phase shows fields for participant or team name, project title, GitHub repository, deployed URL, PRD Markdown, RFC Markdown, and one to three screenshots.
- [ ] The form uses TanStack Form with shared Effect schemas adapted through Standard Schema.
- [ ] UI components follow the strict shadcn-first fallback order, with reasons recorded for any Base UI or custom fallback.
- [ ] Client validation mirrors document, file-count, file-size, and MIME constraints without replacing server validation.
- [ ] The form sends one public multipart creation request through the typed web-to-API path.
- [ ] Success confirms the complete Submission and preserves the edit token client-side without putting it in the URL.
- [ ] Capacity, phase, and field errors are presented with actionable messages.
- [ ] The form is unavailable outside the `submissions` phase.
- [ ] The long form is mobile-first, preserves user input through validation errors, and includes complete pending, error, focus, upload-preview, and success states.
- [ ] Browser tests cover validation, successful multipart submission, token preservation, and rejected creation.
- [ ] `pnpm run check` and `pnpm run build` pass.
