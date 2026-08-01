# 29 — Submission creation

Type: grilling

Question: How does submission creation remain complete when screenshots are required?

Answer: Use one bounded multipart API request containing the Submission fields and one to three screenshots. Create a complete Submission or return an error; do not expose a draft or explicit finalization flow. Return the Submission edit token only after successful creation. Later screenshot changes use one edit-token-authorized request per slot.
