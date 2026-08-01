# 02 — CLI package and framework

Type: research

Question: Where does the CLI live, which runtime does it target, and how are commands defined?

Answer: Add `apps/cli` as a pnpm workspace package targeting the repository's Node 22 baseline. Define typed arguments, flags, nested commands, help, and execution with Effect v4's `effect/unstable/cli`, provide Node services at the entrypoint, and compile with TypeScript rather than adding a separate CLI framework or bundler.
