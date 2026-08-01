import { afterAll, describe, expect, it } from "vitest"

import { workerApp } from "./app.ts"

afterAll(() => workerApp.dispose())

describe("api worker entrypoint", () => {
  it("serves health without a Node.js server adapter", async () => {
    const response = await workerApp.handler(new Request("http://localhost/api/health"))

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({
      service: "api",
      status: "ok",
    })
  })

  it("serves OpenAPI on the Worker-compatible handler", async () => {
    const response = await workerApp.handler(new Request("http://localhost/openapi.json"))

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({
      openapi: "3.1.0",
      info: { title: "cursorshop API" },
    })
  })

  it("serves interactive docs on the Worker-compatible handler", async () => {
    const response = await workerApp.handler(new Request("http://localhost/docs"))

    expect(response.status).toBe(200)
    expect(response.headers.get("content-type") ?? "").toMatch(/text\/html/)
    expect((await response.text()).toLowerCase()).toContain("scalar")
  })
})
