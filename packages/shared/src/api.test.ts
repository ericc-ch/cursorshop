import { Effect, Result } from "effect"
import { OpenApi } from "effect/unstable/httpapi"
import { describe, expect, it } from "vitest"

import {
  CursorshopApi,
  makeHealthResponse,
  makeHealthResponseEffect,
  parseHealthResponse,
} from "./api.ts"

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
    const result = parseHealthResponse({ status: "offline" })
    expect(Result.isFailure(result)).toBe(true)
  })
})

describe("CursorshopApi contract", () => {
  it("exposes a documented GET /api/health operation", () => {
    const endpoint = CursorshopApi.groups.Health.endpoints.health
    const [success] = endpoint.success

    expect(endpoint.method).toBe("GET")
    expect(endpoint.path).toBe("/api/health")
    expect(success?.ast.annotations?.identifier).toBe("HealthResponse")
    expect(endpoint.error.size).toBeGreaterThan(0)
  })

  it("generates OpenAPI that includes the health path", () => {
    const document = OpenApi.fromApi(CursorshopApi)

    expect(document.info.title).toBe("cursorshop API")
    expect(document.paths?.["/api/health"]?.get).toBeDefined()
  })
})
