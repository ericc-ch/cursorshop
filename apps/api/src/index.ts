import { NodeHttpServer, NodeRuntime } from "@effect/platform-node"
import { Layer } from "effect"
import { HttpRouter } from "effect/unstable/http"
import { createServer } from "node:http"

import { ApiLive } from "./app.ts"

/**
 * Parse the Node listen port at the composition root.
 *
 * @param raw - Raw `PORT` environment value.
 */
function parseListenPort(raw: string | undefined): number {
  const value = raw ?? "3001"
  const port = Number(value)

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error(`Invalid PORT environment variable: ${value}`)
    process.exit(1)
  }

  return port
}

const port = parseListenPort(process.env.PORT)

const HttpServerLive = HttpRouter.serve(ApiLive, { disableLogger: true }).pipe(
  Layer.provide(NodeHttpServer.layer(createServer, { port })),
)

NodeRuntime.runMain(Layer.launch(HttpServerLive))
