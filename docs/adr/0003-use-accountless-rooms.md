# Use accountless rooms

Showcase will not have user accounts. Anyone can create or submit to a room through its public URL; judges unlock scoring with one shared judge secret per room and provide a display name once per browser session.

**Status:** accepted

**Options Considered:** Better Auth accounts; per-judge credentials; a secret judge URL.

**Consequences:** This is suitable for a same-day workshop but is not strong identity. Scores are upserted by submission and judge display name, so judges must choose distinct names.
