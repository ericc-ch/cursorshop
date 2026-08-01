# Use accountless rooms

cursorshop will not have user accounts. Anyone can create a Room or submit through its public URL; judges unlock scoring with one shared judge secret per Room and provide a display name once per browser session. Each Room accepts at most 100 Submissions.

**Status:** accepted

**Options Considered:** Better Auth accounts; per-judge credentials; a secret judge URL.

**Consequences:** This is suitable for a same-day workshop but provides no identity or automated-abuse barrier for creation. The Submission cap bounds screenshot storage per Room, but unlimited public Rooms and indefinite retention leave deployment-wide storage spend unbounded. Scores are upserted by Submission and judge display name, so Judges must choose distinct names.
