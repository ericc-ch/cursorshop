import { Clock, Effect, Schema } from "effect"
import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiError,
  HttpApiGroup,
  OpenApi,
} from "effect/unstable/httpapi"

/**
 * Successful health-check payload returned by `GET /api/health`.
 */
export const HealthResponse = Schema.Struct({
  service: Schema.Literal("api").annotate({
    description: 'Always "api" for the cursorshop API Worker.',
  }),
  status: Schema.Literal("ok").annotate({
    description: 'Always "ok" when the API process can answer.',
  }),
  timestamp: Schema.String.annotate({
    description: "ISO-8601 UTC timestamp when the health check ran.",
  }),
}).annotate({
  identifier: "HealthResponse",
  description: "Liveness payload for the cursorshop API.",
})

/** Parsed health-check response. */
export type HealthResponse = typeof HealthResponse.Type

/** Decode an untrusted value as a health response in Effect. */
export const decodeHealthResponseEffect = Schema.decodeUnknownEffect(HealthResponse)

/** Parse an untrusted value as a health response, returning a typed failure on mismatch. */
export const parseHealthResponse = Schema.decodeUnknownResult(HealthResponse)

/**
 * Build a health response for a fixed timestamp.
 *
 * @param timestamp - ISO-8601 UTC timestamp string.
 */
export function makeHealthResponse(timestamp = new Date().toISOString()): HealthResponse {
  return Schema.decodeUnknownSync(HealthResponse)({
    service: "api",
    status: "ok",
    timestamp,
  })
}

/** Build a health response using the Effect `Clock`. */
export const makeHealthResponseEffect = Effect.gen(function* () {
  const timestamp = new Date(yield* Clock.currentTimeMillis).toISOString()
  return makeHealthResponse(timestamp)
})

/**
 * `GET /api/health` — report whether the API process can answer.
 *
 * No path params, query, headers, or body are accepted. On success returns
 * {@link HealthResponse}. Declares {@link HttpApiError.InternalServerError}
 * for unexpected failures.
 */
export const health = HttpApiEndpoint.get("health", "/health", {
  success: HealthResponse,
  error: HttpApiError.InternalServerError,
}).annotate(OpenApi.Summary, "API health check").annotate(
  OpenApi.Description,
  "Returns a liveness payload when the cursorshop API can serve requests.",
)

/** Health operations for the cursorshop API. */
export class HealthGroup extends HttpApiGroup.make("Health")
  .add(health)
  .prefix("/api")
  .annotate(OpenApi.Title, "Health")
  .annotate(OpenApi.Description, "Liveness endpoints for the cursorshop API.") {}

/**
 * Canonical cursorshop HTTP API contract.
 *
 * Shared by the API Worker, typed `HttpApiClient` (web + CLI), and OpenAPI docs.
 */
export class CursorshopApi extends HttpApi.make("CursorshopApi")
  .add(HealthGroup)
  .annotate(OpenApi.Title, "cursorshop API")
  .annotate(OpenApi.Version, "0.0.0")
  .annotate(
    OpenApi.Description,
    "Ordinary HTTP operations for cursorshop rooms, submissions, scores, and results.",
  ) {}
