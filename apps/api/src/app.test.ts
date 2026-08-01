import { afterAll, describe, expect, it } from "vitest"

import { app } from "./app.ts"

afterAll(() => app.dispose())

describe("api", () => {
  it("reports its health", async () => {
    const response = await app.handler(new Request("http://localhost/api/health"))

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({
      service: "api",
      status: "ok",
    })
  })

  it("returns a JSON 404 for unknown routes", async () => {
    const response = await app.handler(new Request("http://localhost/api/missing"))

    expect(response.status).toBe(404)
  })
})
