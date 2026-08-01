import { CursorshopApi, makeHealthResponseEffect } from "@cursorshop/shared"
import { Effect, FileSystem, Layer } from "effect"
import * as Path from "effect/Path"
import { Etag, HttpPlatform, HttpRouter, HttpServer } from "effect/unstable/http"
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
 * (`HttpServer.layerServices` for `toWebHandler`, or Worker platform layers).
 */
export const ApiLive = HttpApiBuilder.layer(CursorshopApi, {
  openapiPath: "/openapi.json",
}).pipe(
  Layer.provide(HealthLive),
  Layer.provide(HttpApiScalar.layer(CursorshopApi)),
)

/**
 * Cloudflare Worker substitute for `HttpPlatform.layer`.
 *
 * Workers have no filesystem, so file responses are unsupported defects.
 */
const HttpPlatformStub = Layer.succeed(HttpPlatform.HttpPlatform, {
  fileResponse: () => Effect.die("HttpPlatform.fileResponse not supported on Workers"),
  fileWebResponse: () => Effect.die("HttpPlatform.fileWebResponse not supported on Workers"),
})

/**
 * Platform services required by {@link ApiLive} on Cloudflare Workers.
 *
 * `FileSystem.layerNoop` satisfies HttpApiBuilder's FileSystem requirement
 * without Node disk access. Used by the Worker entrypoint and Worker-compatible
 * Vitest handlers so local Node `HttpServer.layerServices` stays out of the
 * Worker path.
 */
export const WorkerPlatformLive = Layer.mergeAll(
  Etag.layer,
  HttpPlatformStub,
  Path.layer,
  FileSystem.layerNoop({}),
)

/**
 * {@link ApiLive} plus Worker platform services — shared by the Cloudflare
 * entrypoint and Worker-compatible tests. Application routes are unchanged.
 */
export const WorkerApiLive = ApiLive.pipe(Layer.provide(WorkerPlatformLive))

/**
 * In-process Worker-compatible web handler for Vitest.
 *
 * Uses {@link WorkerApiLive} so health, OpenAPI, and docs stay covered without
 * a Node server adapter or live Alchemy deploy.
 */
export const workerApp = HttpRouter.toWebHandler(WorkerApiLive, {
  disableLogger: true,
})

/** In-process web handler used by Vitest and local Node adapters. */
export const app = HttpRouter.toWebHandler(ApiLive.pipe(Layer.provide(HttpServer.layerServices)), {
  disableLogger: true,
})
