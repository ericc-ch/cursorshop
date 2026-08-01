# cursorshop Domain Terms

## Terms

**cursorshop**:
The lowercase product, project, npm package, and CLI name. Public web host is `cursorshop.ericc.ch`; public API host is `api.cursorshop.ericc.ch`. Agents invoke the CLI with `npx cursorshop`.
_Avoid_: CursorShop, CurshorShop, Showcase, cursorshop-cli

**Room**:
One independently created cursorshop session with its own submissions, scores, public URL, and judge secret.
_Avoid_: Event, competition

**Room phase**:
The room's forward-only stage: submissions, judging, or results.
_Avoid_: Status, mode

**Participant**:
A person or team entering a project into a room.
_Avoid_: User, account

**Submission**:
A participant's project entry: participant/team name, project title, GitHub repository, deployed URL, PRD, RFC, and screenshots.
_Avoid_: Application, entry

**Submission edit token**:
An unguessable credential returned when a submission is created and required to update that submission.
_Avoid_: Account, login

**Judge**:
A person who unlocks judging with the room's judge secret and identifies themselves with a display name.
_Avoid_: Admin, account

**Judge secret**:
The shared room credential required to submit or change scores.
_Avoid_: Judge link, password, API key

**Score**:
One judge's 1–10 ratings for a submission across PRD, RFC, and App.
_Avoid_: Vote, grade

**Leaderboard**:
The room's ranked submissions, ordered by averaged scores with App score and submission time as tiebreakers.
_Avoid_: Results table, ranking
