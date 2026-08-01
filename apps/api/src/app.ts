import { HealthResponse, makeHealthResponseEffect } from "@cursorshop/shared"
import { Effect, Layer } from "effect"
import { HttpRouter, HttpServer, HttpServerResponse } from "effect/unstable/http"

const healthResponse = HttpServerResponse.schemaJson(HealthResponse)

export const ApiRoutes = HttpRouter.use(
  Effect.fn(function* (router) {
    yield* router.add(
      "GET",
      "/api",
      HttpServerResponse.jsonUnsafe({
        name: "cursorshop-api",
        status: "ok",
      }),
    )

    yield* router.add(
      "GET",
      "/api/health",
      Effect.flatMap(makeHealthResponseEffect, healthResponse),
    )
  }),
)

export const app = HttpRouter.toWebHandler(
  ApiRoutes.pipe(Layer.provide(HttpServer.layerServices)),
  { disableLogger: true },
)
