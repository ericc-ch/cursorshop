/**
 * Transport for the Showcase board (leaderboard.naufaldi.com).
 *
 * The app is a TanStack Start deployment whose backend surface is a set of
 * `createServerFn` endpoints served under `/_serverFn/<id>`. This module
 * re-implements the wire protocol so the CLI can call the same endpoints the
 * browser uses:
 *
 * - Requests carry `x-tsr-serverFn: true` plus browser-like `sec-fetch-*`,
 *   user-agent, and referer headers (the edge rejects non-browser shapes).
 * - `GET` functions receive input as a `payload` query parameter containing
 *   the seroval JSON encoding of `{ data: ... }`.
 * - `POST` multipart functions receive a `FormData` body directly.
 * - Responses are seroval JSON of `{ result, error, context }`; the caller
 *   unwraps `result` and treats `error` as failure.
 *
 * Endpoint identifiers are content hashes of the deployed server functions.
 * Reverse-engineered from the production bundle (`assets/index-CIQFdMm3.js`)
 * serving https://leaderboard.naufaldi.com on 2026-08-01 and confirmed against
 * https://github.com/naufaldi/showcase `src/server/fns.ts`. A redeploy changes
 * these hashes.
 *
 * The seroval cross-mode wire codec lives in ./seroval-cross.ts (the deployed
 * seroval predates the public 1.6.0 release, so a pinned subset is safer).
 */
import { decodeCross, encodeRequestEnvelope } from "./seroval-cross.js"

/** Production origin of the board. */
export const DEFAULT_BASE_URL = "https://leaderboard.naufaldi.com"

const SERVER_FN_IDS = {
  listSubmissions: "253c86299cadfb9e7d592f9cc3b5a4131f9e3aabfaf2d9f67f1c0dedc7c43575",
  getSubmission: "c47cd96702193ec76ad7f6c60f6a85c90568f1c79b05975aa0c539f536119864",
  submitProject: "99b6f858df1c10391c7c991e8efb1b5fd5c8610457e616757481c3b91f9e34e3",
} as const

export type ServerFnName = keyof typeof SERVER_FN_IDS

const CHROME_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

const REQUEST_TIMEOUT_MS = 30_000

/** Failure talking to the board: transport error, HTTP error, or fn error node. */
export class ServerCallError extends Error {}

function browserHeaders(baseUrl: string): Headers {
  return new Headers({
    "x-tsr-serverFn": "true",
    "user-agent": CHROME_UA,
    accept: "text/plain, application/x-ndjson, application/json",
    "accept-language": "en-US,en;q=0.9",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    referer: `${baseUrl}/`,
  })
}

/**
 * Call a GET server function with seroval-encoded input.
 *
 * @returns The unwrapped `result` value.
 * @throws ServerCallError on transport failure, non-200 status, or an error node.
 */
export async function callGetServerFn(
  name: Exclude<ServerFnName, "submitProject">,
  data: Record<string, unknown> | undefined,
  options: { baseUrl?: string | undefined } = {},
): Promise<unknown> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
  let url = `${baseUrl}/_serverFn/${SERVER_FN_IDS[name]}`
  if (data !== undefined) {
    const payload = encodeURIComponent(JSON.stringify(encodeRequestEnvelope({ data })))
    url += `?payload=${payload}`
  }
  let response: Response
  try {
    response = await fetch(url, {
      method: "GET",
      headers: browserHeaders(baseUrl),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch (cause) {
    throw new ServerCallError(`Request failed: ${describeCause(cause)}`)
  }
  return parseServerFnResponse(response)
}

/**
 * Call the multipart POST server function with a `FormData` body.
 *
 * @returns The unwrapped `result` value.
 * @throws ServerCallError on transport failure, non-200 status, or an error node.
 */
export async function callPostFormServerFn(
  form: FormData,
  options: { baseUrl?: string | undefined } = {},
): Promise<unknown> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
  const url = `${baseUrl}/_serverFn/${SERVER_FN_IDS.submitProject}`
  const headers = browserHeaders(baseUrl)
  // The browser client sends no extra accept override for FormData calls.
  headers.delete("accept")
  let response: Response
  try {
    response = await fetch(url, {
      method: "POST",
      headers,
      body: form,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch (cause) {
    throw new ServerCallError(`Request failed: ${describeCause(cause)}`)
  }
  return parseServerFnResponse(response)
}

async function parseServerFnResponse(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!response.ok) {
    throw new ServerCallError(`HTTP ${response.status}: ${text.slice(0, 200) || "no body"}`)
  }
  let decoded: unknown
  try {
    decoded = decodeCross(JSON.parse(text))
  } catch (cause) {
    // Error payloads are `$TSR/Error` plugin nodes outside the codec subset.
    if (text.includes("$TSR/Error")) {
      throw new ServerCallError(`Server function rejected the request: ${text.slice(0, 300)}`)
    }
    throw new ServerCallError(
      `Could not decode server function response (${cause instanceof Error ? cause.message : String(cause)}): ${text.slice(0, 200)}`,
    )
  }
  if (
    typeof decoded === "object" &&
    decoded !== null &&
    "error" in decoded &&
    (decoded as { error: unknown }).error != null
  ) {
    const error = (decoded as { error: unknown }).error
    throw new ServerCallError(
      `Server function error: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
  if (typeof decoded === "object" && decoded !== null && "result" in decoded) {
    return (decoded as { result: unknown }).result
  }
  return decoded
}

function describeCause(cause: unknown): string {
  if (cause instanceof Error) {
    return cause.name === "TimeoutError" ? `timed out after ${REQUEST_TIMEOUT_MS}ms` : cause.message
  }
  return String(cause)
}
