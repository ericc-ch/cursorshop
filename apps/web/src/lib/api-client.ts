/**
 * Typed Effect HttpApiClient over a Cloudflare service-binding fetcher.
 *
 * Server-side web code calls the API Worker through the Alchemy-managed `API`
 * binding. There is no browser-facing public API base URL for this path.
 */
import { CursorshopApi } from "@cursorshop/shared"
import * as Cloudflare from "alchemy/Cloudflare/Bridge"
import { Effect } from "effect"
import { HttpApiClient } from "effect/unstable/httpapi"

/** Minimal Fetcher surface used by Alchemy Bridge adapters. */
export type ApiFetcher = {
  readonly fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
}

/**
 * Dummy origin for HttpApiClient path composition.
 *
 * Service-binding fetch ignores the host; the path `/api/health` is what the
 * API Worker matches.
 */
export const API_BINDING_ORIGIN = "https://api.cursorshop.internal" as const

/**
 * Wrap a Cloudflare service-binding fetcher as an Effect `HttpClient`.
 *
 * @param fetcher - Bound API Worker fetcher (`env.API` in production).
 */
export function makeApiHttpClient(fetcher: ApiFetcher) {
  return Cloudflare.toHttpClient(
    Cloudflare.fromCloudflareFetcher(
      // SAFETY: Alchemy Bridge expects a full Fetcher; service bindings only expose fetch at runtime.
      fetcher as Parameters<typeof Cloudflare.fromCloudflareFetcher>[0],
    ),
  )
}

/**
 * Call `GET /api/health` through the shared typed `HttpApiClient`.
 *
 * @param fetcher - Bound API Worker fetcher.
 */
export function fetchApiHealth(fetcher: ApiFetcher) {
  return Effect.gen(function* () {
    const client = yield* HttpApiClient.makeWith(CursorshopApi, {
      httpClient: makeApiHttpClient(fetcher),
      baseUrl: API_BINDING_ORIGIN,
    })
    return yield* client.Health.health({})
  })
}
