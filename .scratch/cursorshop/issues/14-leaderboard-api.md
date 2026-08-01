# 14 — Compute the final Leaderboard through the API

What to build: Add the public results operation that computes complete, deterministic Leaderboard entries after a Room reaches `results`.

Blocked by: 06 Advance the Room phase; 12 Upsert Scores through the API

Status: open

## Research notes

- [ ] Consult the current Effect HttpApi and Schema, Drizzle D1 aggregation, and numeric serialization documentation before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the ranking boundary, query, and response-number representation before implementation._

- [ ] The public results operation is hidden before the `results` phase and requires no judge secret afterward.
- [ ] A ranked Submission has at least one complete Score and exposes PRD, RFC, and App averages plus their overall mean.
- [ ] Ranked Submissions sort by overall score, then higher App average, then earlier Submission time.
- [ ] The first five ranked entries are marked as the top five.
- [ ] Unscored Submissions follow ranked entries and are represented as `Not scored`.
- [ ] Ranking math is isolated as a deterministic Effect program or pure domain function without running Effect inside it.
- [ ] Unit tests cover multiple Judges, revisions, decimal averages, every tie-break level, fewer than five entries, and unscored ordering.
- [ ] Handler tests cover results-phase visibility and the public response schema documented in OpenAPI.
- [ ] `pnpm run check` and `pnpm run build` pass.
