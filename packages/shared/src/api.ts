import { Clock, Effect, Schema } from "effect"

export const HealthResponse = Schema.Struct({
  service: Schema.Literal("api"),
  status: Schema.Literal("ok"),
  timestamp: Schema.String,
})

export type HealthResponse = typeof HealthResponse.Type

export const decodeHealthResponseEffect = Schema.decodeUnknownEffect(HealthResponse)

export function makeHealthResponse(timestamp = new Date().toISOString()): HealthResponse {
  return Schema.decodeUnknownSync(HealthResponse)({
    service: "api",
    status: "ok",
    timestamp,
  })
}

export const makeHealthResponseEffect = Effect.gen(function* () {
  const timestamp = new Date(yield* Clock.currentTimeMillis).toISOString()

  return yield* decodeHealthResponseEffect({
    service: "api",
    status: "ok",
    timestamp,
  })
})

export function decodeHealthResponse(value: unknown): HealthResponse {
  return Schema.decodeUnknownSync(HealthResponse)(value)
}
