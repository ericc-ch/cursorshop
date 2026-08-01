import { CursorshopApi, makeHealthResponseEffect } from "@cursorshop/shared"
import { Layer } from "effect"
import { HttpRouter, HttpServer } from "effect/unstable/http"
import { HttpApiBuilder, HttpApiScalar } from "effect/unstable/httpapi"

/**
 * HttpApi group handlers for the shared {@link CursorshopApi} contract.
 *
 * Kept separate from the Node / Worker runtime entrypoint so the same layer can
 * be composed into local `toWebHandler` tests and future Worker fetch adapters.
 */
export const HealthLive = HttpApiBuilder.group(CursorshopApi, "Health", (handlers) =>
  handlers.handle("health", () => makeHealthResponseEffect),
)

/**
 * Fully assembled API router layer: contract routes, OpenAPI JSON, and Scalar docs.
 *
 * Does not include platform `HttpServer` services — provide those at the edge
 * (`HttpServer.layerServices` for `toWebHandler`, or `NodeHttpServer` / Worker adapters).
 */
export const ApiLive = HttpApiBuilder.layer(CursorshopApi, {
  openapiPath: "/openapi.json",
}).pipe(
  Layer.provide(HealthLive),
  Layer.provide(HttpApiScalar.layer(CursorshopApi)),
)

/** In-process web handler used by Vitest and local adapters. */
export const app = HttpRouter.toWebHandler(ApiLive.pipe(Layer.provide(HttpServer.layerServices)), {
  disableLogger: true,
})
