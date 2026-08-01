import * as NodePath from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: {
      "@": NodePath.resolve(import.meta.dirname, "apps/web/src"),
      "cloudflare:workers": NodePath.resolve(
        import.meta.dirname,
        "apps/web/src/test/cloudflare-workers-stub.ts",
      ),
    },
  },
  test: {
    fileParallelism: false,
    passWithNoTests: true,
    exclude: ["**/node_modules/**", "**/dist/**", "**/routeTree.gen.ts", "**/*.gen.ts"],
  },
})
