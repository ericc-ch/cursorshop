# 04 — Create a Room through the API

What to build: Add the public HTTP operations and persistence needed to create and read an accountless Room.

Blocked by: 02 Deploy the API Worker and storage bindings

Status: open

## Research notes

- [ ] Consult the current Effect HttpApi and Schema, Drizzle D1, and Web Crypto references or official documentation before coding.
- Sources: _Record consulted references before implementation._
- Chosen API/pattern: _Record the current validation, persistence, and credential APIs before implementation._

- [ ] A D1 migration and Drizzle schema store the Room identifier, `submissions` phase, judge-secret hash, and creation time.
- [ ] Room creation is public and requires no account, challenge token, or machine credential.
- [ ] Creation generates the judge secret with at least 128 bits of cryptographic randomness, stores only its SHA-256 hash, and returns plaintext once.
- [ ] The creation response includes the Room identifier and public Room path without placing the judge secret in the URL.
- [ ] A public read operation returns safe Room details and its current phase without exposing credential hashes.
- [ ] The operations, responses, and errors appear in OpenAPI.
- [ ] Handler tests cover public creation, persisted Room reads, and absence of plaintext secrets at rest.
- [ ] `pnpm run check` and `pnpm run build` pass.
