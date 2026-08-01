import { NodeHttpServer, NodeRuntime } from "@effect/platform-node"
import { Layer } from "effect"
import { HttpRouter } from "effect/unstable/http"
import { createServer } from "node:http"

import { ApiLive } from "./app.ts"

const port = Number(process.env.PORT ?? 3001)

const HttpServerLive = HttpRouter.serve(ApiLive, { disableLogger: true }).pipe(
  Layer.provide(NodeHttpServer.layer(createServer, { port })),
)

NodeRuntime.runMain(Layer.launch(HttpServerLive))
