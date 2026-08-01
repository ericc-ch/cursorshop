import { Effect } from "effect"
import { afterAll, describe, expect, it } from "vitest"

import { workerApp } from "../../api/src/app.ts"
import { fetchApiHealth, makeApiHttpClient, type ApiFetcher } from "./lib/api-client.ts"

afterAll(() => workerApp.dispose())

function stubApiFetcher(): ApiFetcher {
  return {
    fetch(input, init) {
      return workerApp.handler(new Request(input, init))
    },
  }
}

describe("bound web-to-API health client", () => {
  it("wraps a fetcher as an Effect HttpClient", () => {
    const client = makeApiHttpClient(stubApiFetcher())
    expect(typeof client.execute).toBe("function")
  })

  it("reads GET /api/health through the shared HttpApiClient", async () => {
    const health = await Effect.runPromise(fetchApiHealth(stubApiFetcher()))
    expect(health).toMatchObject({ service: "api", status: "ok" })
    expect(health.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it("does not require a development-only public API base URL", () => {
    expect(import.meta.env.VITE_API_URL).toBeUndefined()
  })
})
