# 12 — CLI lifecycle handler integration

What to build: Add one Vitest integration suite that drives the CLI public boundary against the in-process Effect API handler through the full cursorshop lifecycle.

Blocked by: 02 Get Room; 03 Advance Room phase; 04 Create Submission with screenshots; 05 Get Submission; 06 Update Submission fields; 07 Replace Submission screenshot; 08 Remove Submission screenshot; 09 List review scores; 10 Upsert Score; 11 Get Leaderboard results

Status: open

## Research notes

- [ ] Consult the current Effect API web-handler test harness and CLI process/invocation patterns before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the in-process HTTP boundary and CLI invocation approach before implementation._

- [ ] The suite creates a Room, creates and edits a Submission (fields and screenshots), advances phases, lists review data, upserts scores for at least two judge names, and fetches results.
- [ ] Assertions use the CLI public boundary (args, JSON stdout/stderr, exit codes) against the shared HttpApi handler.
- [ ] No live deploy smoke and no npm-publish smoke are required.
- [ ] Failures clearly identify which lifecycle step broke.
- [ ] `pnpm run check` and `pnpm run build` pass.
