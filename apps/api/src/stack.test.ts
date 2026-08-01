import { describe, expect, it } from "vitest"

import { CURSORSHOP_STAGE } from "./deploy.ts"
import Stack from "./stack.ts"

describe("cursorshop alchemy stack", () => {
  it("exports a default Alchemy Stack for the single prod stage", () => {
    expect(Stack).toBeTruthy()
    expect(CURSORSHOP_STAGE).toBe("prod")
  })
})
