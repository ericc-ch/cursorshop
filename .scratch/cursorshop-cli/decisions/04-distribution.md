# 04 — Distribution

Type: research

Question: How is the CLI packaged and how do agents invoke it?

Answer: Bundle and typecheck `apps/cli` with **tsdown** ([tsdown.dev](https://tsdown.dev/)) for npm publishing. Publish the public package **`cursorshop`** so agents can run **`npx cursorshop`**. Expose a `bin` named `cursorshop`. Keep the package private to the monorepo during development, then publish from the bundled output. Prefer publint/attw validation via tsdown before release.
