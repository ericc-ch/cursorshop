import { Effect } from "effect"
import { describe, expect, it } from "vitest"

import { CURSORSHOP_STAGE } from "./deploy.ts"
import Stack from "./stack.ts"
import Web from "./web.ts"

describe("cursorshop alchemy stack", () => {
  it("exports a default Alchemy Stack for the single prod stage", () => {
    expect(Stack).toBeTruthy()
    expect(CURSORSHOP_STAGE).toBe("prod")
  })

  it("composes the API and TanStack Start web Workers", () => {
    expect(Effect.isEffect(Stack)).toBeTruthy()
    expect(Effect.isEffect(Web)).toBe(true)
  })
})
