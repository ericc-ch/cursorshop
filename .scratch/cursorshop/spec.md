# cursorshop

Problem: Workshop participants need a fast, reliable way to submit roughly 90 projects, let multiple judges score them consistently, and publish ranked results without relying on spreadsheets or chat threads.

Solution: Provide accountless rooms with a public submission flow, secret-gated judging, phase-controlled results, and an ordinary OpenAPI HTTP API. Run cursorshop on Cloudflare through Alchemy at `cursorshop.ericc.ch` / `api.cursorshop.ericc.ch`, store relational data in D1 and screenshots in R2, and keep the implementation small enough for a roughly three-hour build.

User stories:
1. As an organizer, I want to create a room after passing an abuse check, so that I receive a public room link and a judge secret for one cursorshop session.
2. As a participant, I want to submit my participant or team name, project title, GitHub repository, deployed URL, PRD and RFC Markdown, and screenshots, so that judges can review my project.
3. As a participant, I want an edit token when I submit, so that I can correct my submission during the submissions phase without creating an account.
4. As a judge, I want to unlock a room with its shared judge secret and choose my display name, so that I can score every submission independently.
5. As a judge, I want to submit one complete PRD, RFC, and App scorecard per project and revise it if needed, so that retries and corrections do not create duplicate scores.
6. As an organizer, I want to move a room forward from submissions to judging to results, so that submissions, scoring, and publication happen in a controlled order.
7. As a participant, I want to see the final leaderboard and top five after judging closes, so that results are clear and fair.
8. As an external client or agent, I want conventional HTTP operations, clear OpenAPI documentation, and a `npx cursorshop` CLI derived from the same contract, so that I can submit and judge without using the browser.

Implementation decisions:
- Keep the pnpm monorepo boundaries: a TanStack Start and React web application, an Effect API application, a `cursorshop` CLI application, shared Effect schemas and HTTP contracts, and a root Alchemy v2 stack.
- Use TanStack Router through TanStack Start. Use one TanStack Query client for server state: route loaders prefetch reusable Query options, components read with `useSuspenseQuery` or `useQuery`, and mutations update or invalidate the Query cache.
- Use TanStack Form for Room, Submission, and Score forms. Adapt shared Effect schemas through Effect's Standard Schema support so browser validation does not introduce a parallel Zod contract.
- Use Tailwind CSS and shadcn initialized with Base UI. Select components in strict order: existing shadcn component, composition of existing shadcn components, Base UI primitive, then a custom interaction component. Document why each fallback was required.
- Use a polished light editorial-scoreboard direction: bold typography, warm neutral surfaces, sharp dividers, one vivid accent, and restrained celebratory treatment for results. Do not add dark mode to the MVP.
- Make participant submission mobile-first, judging desktop-first while remaining usable on mobile, and the Leaderboard responsive and projector-friendly.
- Deploy one Alchemy stage on **`cursorshop.ericc.ch`** (web) and **`api.cursorshop.ericc.ch`** (API). Use Workers Free by default, with Workers Paid only as a fallback if the Free-plan CPU limit is insufficient.
- Deploy the web and API as separate Cloudflare Workers. Connect the web Worker to the API Worker with an Alchemy-managed service binding; also expose the API publicly for external clients and the CLI.
- Define the canonical API with Effect `HttpApi`. Derive the web application's typed `HttpApiClient`, the CLI client, the OpenAPI document, and interactive API documentation from the same contract. Document every operation, field, header, and error clearly enough for agents reading OpenAPI. Do not add Effect RPC or maintain a duplicate API description.
- Ship `apps/cli` as the public npm package **`cursorshop`**, bundled with **tsdown**, invokable as **`npx cursorshop`**, with `--help` and examples that mirror the OpenAPI surface.
- Use D1 with Drizzle for rooms, submissions, screenshot metadata, and scores. Apply migrations through the Alchemy deployment.
- Use an R2 PAYG bucket for screenshot objects. Do not expose a general-purpose file upload surface.
- Do not create user accounts or use Better Auth. Room and submission creation are fully public.
- Limit each room to 100 submissions. Reject further creation attempts once the room reaches that limit.
- Require participant or team name and project title on every submission, along with GitHub repository, deployed URL, PRD and RFC Markdown strings, and screenshots. The API accepts the documents as required strings of at most 100,000 characters each, and the web form provides text areas; do not upload document files or require external document URLs.
- Create a submission with one bounded multipart request containing all submission fields and one to three screenshots. Accept only JPEG, PNG, or WebP screenshots that are each strictly smaller than 1,000,000 bytes.
- Validate the room phase, submission limit, fields, and every screenshot before exposing the submission. Create a complete submission or return an error; do not expose a draft or finalization flow. Return the submission edit token only after successful creation.
- Store screenshots in three fixed R2 slots so edits cannot accumulate additional objects. After creation, require the submission edit token to replace or remove one screenshot slot per request, and continue to require at least one screenshot.
- Return an opaque submission edit token when a submission is created. Permit submission fields and screenshots to be edited only during the submissions phase.
- Generate judge secrets and submission edit tokens with at least 128 bits of cryptographic randomness. Return plaintext only at creation, store only SHA-256 hashes in D1, provide no recovery, and use the OpenAPI-documented `X-Judge-Secret` and `X-Submission-Edit-Token` headers.
- Store a judge's display name in browser `sessionStorage` after unlocking. Upsert scores by submission and judge display name so a retry or revision replaces that judge's prior score.
- Model room phase as `submissions`, `judging`, or `results`. Allow only forward transitions authorized by the room's judge secret.
- During submissions, allow submission creation and editing but reject scoring. During judging, lock submissions, accept score upserts, and hide public results. During results, lock submissions and scores and expose the leaderboard.
- Require each scorecard to contain integer ratings from 1 through 10 for PRD, RFC, and App. Reject partial scorecards.
- Rank a submission after it receives at least one complete scorecard. Compute its overall score as the mean of its three dimension averages. Break ties by higher App average and then earlier submission time.
- Show unscored submissions below ranked submissions as `Not scored`, and highlight the top five ranked submissions.
- Store deployed URLs without performing automated liveness checks.
- Keep rooms, submissions, scores, and screenshots indefinitely. Do not implement TTL checks, scheduled cleanup, or recovery after deletion for the MVP.
- Keep API route construction separate from Worker entrypoints and keep Effect execution at application edges.

Testing decisions:
- Use Vitest in Node for schemas, credential hashing and verification, phase transitions, score validation and ranking, submission and document-length limits, and screenshot constraints.
- Test API behavior through the Effect web handler, including authorization headers, phase conflicts, atomic submission visibility, multipart validation, complete-scorecard enforcement, fixed screenshot slots, and the 100-submission boundary.
- Test route-loader prefetch, hydrated Query reads, mutation cache behavior, TanStack Form validation through shared Effect schemas, and complete loading, empty, error, success, focus, and disabled states.
- Test participant workflows at mobile sizes, judging at desktop and mobile sizes, and the Leaderboard at desktop and projector-oriented sizes.
- Use Playwright for the primary end-to-end flow against a running app: create a room, create and edit a submission, upload screenshots, advance to judging, submit and revise scores as multiple judges, advance to results, and verify ranking and unscored placement.
- Run the repository's typecheck, test, lint, and build commands after implementation changes.

Out of scope:
- User accounts, Better Auth, password recovery, and per-judge credentials.
- A secret judge URL as the only authorization mechanism.
- Effect RPC or parallel RPC and HTTP contracts.
- Deployed URL liveness checks.
- Realtime leaderboard updates and multi-room administration dashboards.
- Multiple deployment stages.
- Automatic room expiration, cleanup, or storage reclamation.
- General file uploads beyond submission screenshots.
- Hyperdrive, Postgres, Netlify, Railway, and Bun.
- Alchemy live deploy/destroy test suites and Vitest Browser Mode as the primary end-to-end layer.

Notes:
- Product requirements come from `docs/workshop_slides.md`.
- Domain language is defined in `CONTEXT.md`, and accepted infrastructure and accountless-room choices are recorded in the architecture decision records.
- Before implementing any ticket, record the current local references and/or official documentation consulted and the API or pattern selected. Before any frontend ticket, load and follow the `design` skill.
- The 100-submission and screenshot limits bound screenshot storage to less than 300 MB per room. Fully public Room creation and indefinite retention leave deployment-wide storage spend unbounded; this risk is explicitly accepted for the MVP.
