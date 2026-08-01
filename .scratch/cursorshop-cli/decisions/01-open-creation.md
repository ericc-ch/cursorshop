# 01 — Open creation

Type: grilling

Question: How does the CLI create Rooms and Submissions without a browser-only Turnstile challenge?

Answer: Remove Turnstile entirely and leave Room and Submission creation public for both web and CLI clients. Do not add an automation token or provisioned agent keys. Keep the existing limit of 100 Submissions per Room and three screenshots smaller than 1 MB each, while explicitly accepting that unlimited public Rooms and indefinite retention leave deployment-wide storage spend unbounded.
