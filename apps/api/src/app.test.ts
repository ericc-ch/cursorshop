import { Effect, Layer } from "effect"
import { FetchHttpClient } from "effect/unstable/http"
import { HttpApiClient, OpenApi } from "effect/unstable/httpapi"
import { afterAll, describe, expect, it } from "vitest"

import { CursorshopApi } from "@cursorshop/shared"

import { app } from "./app.ts"

afterAll(() => app.dispose())

describe("api health", () => {
  it("reports its health through the web handler", async () => {
    const response = await app.handler(new Request("http://localhost/api/health"))

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({
      service: "api",
      status: "ok",
    })
  })

  it("serves the raw OpenAPI document for the shared contract", async () => {
    const response = await app.handler(new Request("http://localhost/openapi.json"))

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({
      openapi: "3.1.0",
      info: {
        title: "cursorshop API",
      },
      paths: {
        "/api/health": {
          get: expect.objectContaining({
            operationId: expect.any(String),
          }),
        },
      },
    })
  })

  it("serves interactive API documentation", async () => {
    const response = await app.handler(new Request("http://localhost/docs"))

    expect(response.status).toBe(200)
    expect(response.headers.get("content-type") ?? "").toMatch(/text\/html/)
    const html = await response.text()
    expect(html.length).toBeGreaterThan(0)
    expect(html.toLowerCase()).toContain("scalar")
  })

  it("returns a JSON 404 for unknown routes", async () => {
    const response = await app.handler(new Request("http://localhost/api/missing"))

    expect(response.status).toBe(404)
  })

  it("calls health through a typed client derived from the shared contract", async () => {
    const health = await Effect.runPromise(
      Effect.gen(function* () {
        const client = yield* HttpApiClient.make(CursorshopApi, {
          baseUrl: "http://localhost",
        })
        return yield* client.Health.health({})
      }).pipe(
        Effect.provide(
          Layer.merge(
            FetchHttpClient.layer,
            Layer.succeed(FetchHttpClient.Fetch, (input, init) =>
              app.handler(new Request(input, init)),
            ),
          ),
        ),
      ),
    )

    expect(health).toMatchObject({
      service: "api",
      status: "ok",
    })
    expect(typeof health.timestamp).toBe("string")
  })

  it("keeps the OpenApi document aligned with OpenApi.fromApi", async () => {
    const response = await app.handler(new Request("http://localhost/openapi.json"))
    expect(await response.json()).toEqual(OpenApi.fromApi(CursorshopApi))
  })
})
