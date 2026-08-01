# 24 — Secret handling

Type: grilling

Question: How are room judge secrets and submission edit tokens generated, stored, and transported?

Answer:

- Generate opaque credentials with at least 128 bits of cryptographic randomness.
- Return plaintext only at creation.
- Store only SHA-256 hashes in D1.
- Accept credentials through OpenAPI-documented `X-Judge-Secret` and `X-Submission-Edit-Token` headers.
- Do not provide recovery; lost credentials cannot be retrieved.
