/**
 * Cloudflare Worker entrypoint for the cursorshop API.
 *
 * Binds typed D1 and R2 clients in Init, then serves {@link WorkerApiLive}
 * through `HttpRouter.toHttpEffect` — no Node.js HTTP server adapter.
 */
import * as Cloudflare from "alchemy/Cloudflare"
import { Effect } from "effect"
import { HttpRouter } from "effect/unstable/http"

import { WorkerApiLive } from "./app.ts"
import { API_WORKER_LOGICAL_ID, Database, Screenshots, apiWorkerProps } from "./deploy.ts"

/**
 * Public API Worker on `api.cursorshop.ericc.ch`.
 *
 * Typed D1 / R2 bindings are established in Init for later tickets; health and
 * docs routes remain in {@link WorkerApiLive} and do not depend on storage.
 * Local `alchemy dev` supplies equivalent D1/R2 simulators without changing
 * application routes.
 */
export default class Api extends Cloudflare.Worker<Api>()(
  API_WORKER_LOGICAL_ID,
  {
    main: import.meta.url,
    domain: apiWorkerProps.domain,
  },
  Effect.gen(function* () {
    // Register typed bindings for local `alchemy dev` and deployed Workers.
    // Route handlers stay in WorkerApiLive so Node `dev:api` needs no storage.
    yield* Cloudflare.D1.QueryDatabase(Database)
    yield* Cloudflare.R2.ReadWriteBucket(Screenshots)

    return {
      fetch: yield* HttpRouter.toHttpEffect(WorkerApiLive),
    }
  }).pipe(
    Effect.provide([Cloudflare.D1.QueryDatabaseBinding, Cloudflare.R2.ReadWriteBucketBinding]),
  ),
) {}
