# 26 — Abuse and cost controls

Type: grilling

Question: How does cursorshop limit abuse and bound screenshot storage costs while keeping room creation public?

Answer:

- Leave Room and Submission creation fully public, without an automated-abuse challenge or machine credential.
- Limit each Room to 100 Submissions.
- Keep at most three screenshot objects per Submission, each smaller than 1 MB (1,000,000 bytes).
- Initial screenshots arrive with the Submission creation request. Later screenshot replacements or removals require the Submission edit token and must not create objects beyond the three fixed screenshot slots.
- Accept that unlimited public Rooms and indefinite retention leave deployment-wide storage spend unbounded.
