# 05 — Create a Room from the browser

What to build: Add the organizer-facing browser flow for creating a Room and safely receiving its public link and one-time judge secret.

Blocked by: 03 Deploy the web Worker through the API binding; 04 Create a Room through the API

Status: open

## Research notes

- [ ] Consult the current TanStack Start, Query, Form, Effect Standard Schema, and shadcn Base UI documentation before coding.
- [ ] Load and follow the `design` skill before planning or editing UI.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the Query mutation, Form validation, and component patterns before implementation._

- [ ] The home page presents a clear public Room creation action.
- [ ] The form uses TanStack Form with the shared Effect schema adapted through Standard Schema.
- [ ] UI components follow the strict shadcn-first fallback order, with reasons recorded for any Base UI or custom fallback.
- [ ] The form calls the typed Room creation operation through the web-to-API service binding.
- [ ] Success shows the public Room link and judge secret with explicit save-now messaging because recovery is unavailable.
- [ ] The judge secret is not placed in URLs, logs, analytics, or persistent browser storage.
- [ ] The public Room route loads safe Room details and displays the `submissions` phase.
- [ ] The creation flow is polished and usable on mobile, with complete loading, error, disabled, focus, and success states.
- [ ] Browser tests cover API failure, successful creation, and navigation to the public Room.
- [ ] `pnpm run check` and `pnpm run build` pass.
