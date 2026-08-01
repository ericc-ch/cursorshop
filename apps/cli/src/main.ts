#!/usr/bin/env node
/**
 * `cursorshop` — automation CLI for the Showcase board at
 * https://leaderboard.naufaldi.com (source: https://github.com/naufaldi/showcase).
 *
 * Drives the same TanStack Start server functions the browser uses. Success
 * prints one JSON value to stdout; failures print one JSON error object to
 * stderr. Exit codes: 0 success, 1 usage/validation, 2 board or transport
 * failure.
 *
 * Commands:
 *   cursorshop list                                  All submissions (JSON array)
 *   cursorshop get --id <uuid>                       One submission with PRD/RFC markdown and scores
 *   cursorshop submit --title <t> --name <team> \
 *     --repo-url <url> --app-url <url> \
 *     (--prd <text> | --prd-file <path>) \
 *     (--rfc <text> | --rfc-file <path>) \
 *     --screenshot <path.(png|jpg|jpeg|webp)>     Create a submission
 *
 * Global flags:
 *   --base-url <url>   Override the board origin (default production).
 *   --help             Print usage.
 */
import { readFile } from "node:fs/promises"

import {
  callGetServerFn,
  callPostFormServerFn,
  DEFAULT_BASE_URL,
  ServerCallError,
} from "./serverfn.js"
import {
  screenshotMimeType,
  validateScreenshot,
  validateSubmitInput,
  type FieldError,
  type Submission,
  type SubmissionDetail,
  type SubmitResult,
} from "./validate.js"

const USAGE = `cursorshop — CLI for the Showcase board (leaderboard.naufaldi.com)

Usage:
  cursorshop list                                   List all submissions
  cursorshop get --id <uuid>                        Show one submission with markdown and scores
  cursorshop submit [flags]                         Create a submission

submit flags:
  --title <text>            Project title (required, ≤200 chars)
  --name <text>             Participant or team name (required, ≤120 chars)
  --repo-url <url>          GitHub repository URL (required, http/https)
  --app-url <url>           Live website URL (required, http/https)
  --prd <text>              PRD markdown inline (required unless --prd-file)
  --prd-file <path>         Read PRD markdown from a .md file
  --rfc <text>              RFC markdown inline (required unless --rfc-file)
  --rfc-file <path>         Read RFC markdown from a .md file
  --screenshot <path>       PNG/JPEG/WebP screenshot, 1 byte–2MB (required)

Global flags:
  --base-url <url>          Board origin (default: ${DEFAULT_BASE_URL})
  --help                    Show this help

Output: one JSON value on stdout. Errors: one JSON object on stderr.
Exit codes: 0 ok · 1 usage/validation · 2 board or transport failure.
`

class UsageError extends Error {}

function printJson(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`)
}

function fail(message: string, code: 1 | 2, details?: unknown): never {
  process.stderr.write(
    `${JSON.stringify({ error: message, ...(details === undefined ? {} : { details }) }, null, 2)}\n`,
  )
  process.exit(code)
}

function takeFlag(args: Array<string>, flag: string): string | undefined {
  const index = args.indexOf(flag)
  if (index < 0) return undefined
  const value = args[index + 1]
  if (value === undefined || value.startsWith("--")) {
    throw new UsageError(`Flag ${flag} requires a value`)
  }
  args.splice(index, 2)
  return value
}

function takeGlobals(args: Array<string>): { baseUrl: string } {
  const baseUrl = takeFlag(args, "--base-url") ?? DEFAULT_BASE_URL
  return { baseUrl }
}

/** One markdown source: paste text wins, then file contents. */
async function resolveMarkdown(
  paste: string | undefined,
  file: string | undefined,
  label: string,
): Promise<string> {
  if (paste !== undefined) return paste
  if (file === undefined)
    throw new UsageError(`Missing ${label}: provide --${label} or --${label}-file`)
  try {
    return await readFile(file, "utf8")
  } catch {
    throw new UsageError(`Could not read ${label} file: ${file}`)
  }
}

async function buildScreenshotForm(
  form: FormData,
  screenshotPath: string | undefined,
): Promise<void> {
  if (screenshotPath === undefined) {
    throw new UsageError("Missing --screenshot (PNG, JPEG, or WebP, up to 2MB)")
  }
  const type = screenshotMimeType(screenshotPath)
  if (type === null) {
    throw new UsageError("Screenshot must have a .png, .jpg, .jpeg, or .webp extension")
  }
  let bytes: Buffer
  try {
    bytes = await readFile(screenshotPath)
  } catch {
    throw new UsageError(`Could not read screenshot: ${screenshotPath}`)
  }
  const errors = validateScreenshot({ type, size: bytes.byteLength })
  if (errors.length) throw new UsageError(errors.map((e) => e.message).join(" · "))
  const name = screenshotPath.split("/").pop() ?? "screenshot"
  form.set("screenshot", new File([bytes], name, { type }))
}

async function commandSubmit(args: Array<string>, baseUrl: string): Promise<void> {
  const title = takeFlag(args, "--title")
  const name = takeFlag(args, "--name")
  const repoUrl = takeFlag(args, "--repo-url")
  const appUrl = takeFlag(args, "--app-url")
  const prdPaste = takeFlag(args, "--prd")
  const prdFile = takeFlag(args, "--prd-file")
  const rfcPaste = takeFlag(args, "--rfc")
  const rfcFile = takeFlag(args, "--rfc-file")
  const screenshotPath = takeFlag(args, "--screenshot")
  if (title === undefined) throw new UsageError("Missing --title")
  if (name === undefined) throw new UsageError("Missing --name")
  if (repoUrl === undefined) throw new UsageError("Missing --repo-url")
  if (appUrl === undefined) throw new UsageError("Missing --app-url")

  const prdMarkdown = await resolveMarkdown(prdPaste, prdFile, "prd")
  const rfcMarkdown = await resolveMarkdown(rfcPaste, rfcFile, "rfc")

  const errors = validateSubmitInput({ title, name, repoUrl, appUrl, prdMarkdown, rfcMarkdown })
  const form = new FormData()
  // Mirror the server's field names: paste text wins over file content.
  form.set("title", title)
  form.set("name", name)
  form.set("repoUrl", repoUrl)
  form.set("appUrl", appUrl)
  form.set("prdPaste", prdMarkdown)
  form.set("rfcPaste", rfcMarkdown)
  await buildScreenshotForm(form, screenshotPath)
  if (errors.length) throw new UsageError(errors.map((e) => e.message).join(" · "))

  const result = (await callPostFormServerFn(form, { baseUrl })) as SubmitResult
  if (!result.ok) {
    fail("Submission rejected by the board", 2, {
      errors: result.errors.map((e: FieldError) => `${e.field}: ${e.message}`),
    })
  }
  printJson({
    ok: true,
    id: result.id,
    judgeLane: result.judgeLane,
    url: `${baseUrl}/submissions/${result.id}`,
  })
}

async function commandList(baseUrl: string): Promise<void> {
  const submissions = (await callGetServerFn("listSubmissions", undefined, {
    baseUrl,
  })) as Array<Submission>
  printJson(
    submissions.map((s) => ({
      id: s.id,
      title: s.title,
      name: s.name,
      repoUrl: s.repoUrl,
      appUrl: s.appUrl,
      judgeLane: s.judgeLane,
      liveStatus: s.liveStatus,
      createdAt: s.createdAt,
    })),
  )
}

async function commandGet(args: Array<string>, baseUrl: string): Promise<void> {
  const id = takeFlag(args, "--id")
  if (id === undefined) throw new UsageError("Missing --id <uuid>")
  const detail = (await callGetServerFn(
    "getSubmission",
    { id },
    { baseUrl },
  )) as SubmissionDetail | null
  if (detail === null) fail("Submission not found", 2, { id })
  printJson(detail)
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const [command, ...rest] = args
  try {
    if (command === undefined || command === "--help" || command === "-h") {
      process.stdout.write(USAGE)
      return
    }
    if (command === "list") {
      const { baseUrl } = takeGlobals(rest)
      rejectLeftover(rest)
      await commandList(baseUrl)
    } else if (command === "get") {
      const { baseUrl } = takeGlobals(rest)
      await commandGet(rest, baseUrl)
      rejectLeftover(rest)
    } else if (command === "submit") {
      const { baseUrl } = takeGlobals(rest)
      await commandSubmit(rest, baseUrl)
      rejectLeftover(rest)
    } else {
      throw new UsageError(`Unknown command: ${command}\nRun: cursorshop --help`)
    }
  } catch (error) {
    if (error instanceof UsageError) fail(error.message, 1)
    else if (error instanceof ServerCallError) fail(error.message, 2)
    else fail(error instanceof Error ? error.message : String(error), 2)
  }
}

function rejectLeftover(args: Array<string>): void {
  if (args.length > 0) throw new UsageError(`Unexpected arguments: ${args.join(" ")}`)
}

void main()
