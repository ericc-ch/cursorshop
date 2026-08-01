/**
 * Root Alchemy composition for the cursorshop API Worker, D1, and R2.
 *
 * Kept in `apps/api` so the Worker entrypoint, resources, and stack share one
 * TypeScript project. The repo-root `alchemy.run.ts` re-exports this default.
 */
import * as Alchemy from "alchemy"
import * as Cloudflare from "alchemy/Cloudflare"
import { Effect } from "effect"

import { Database, Screenshots } from "./deploy.ts"
import Api from "./worker.ts"

export default Alchemy.Stack(
  "cursorshop",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const database = yield* Database
    const screenshots = yield* Screenshots
    const api = yield* Api

    return {
      apiUrl: api.url.as<string>(),
      databaseName: database.databaseName,
      screenshotsBucket: screenshots.bucketName,
    }
  }),
)
