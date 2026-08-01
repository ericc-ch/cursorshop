import { Effect } from "effect"
import { describe, expect, it } from "vitest"

import { decodeHealthResponse, makeHealthResponse, makeHealthResponseEffect } from "./api.ts"

describe("health response", () => {
  it("creates a response with the shared shape", () => {
    expect(makeHealthResponse("2026-01-01T00:00:00.000Z")).toEqual({
      service: "api",
      status: "ok",
      timestamp: "2026-01-01T00:00:00.000Z",
    })
  })

  it("can create a response as an Effect", () => {
    expect(Effect.runSync(makeHealthResponseEffect)).toMatchObject({
      service: "api",
      status: "ok",
    })
  })

  it("rejects an invalid response", () => {
    expect(() => decodeHealthResponse({ status: "offline" })).toThrow()
  })
})
