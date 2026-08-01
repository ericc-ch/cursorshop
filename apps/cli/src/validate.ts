/**
 * Client-side mirror of the board's submission validation
 * (https://github.com/naufaldi/showcase `src/lib/validation.ts`). Catching the
 * same mistakes locally keeps error messages actionable; the server remains the
 * source of truth.
 */
export const MAX_TITLE = 200
export const MAX_NAME = 120
export const MAX_MARKDOWN = 100_000
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/webp"])

export type SubmitInput = {
  title: string
  name: string
  repoUrl: string
  appUrl: string
  prdMarkdown: string
  rfcMarkdown: string
}

export type FieldError = { field: string; message: string }

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function validateSubmitInput(input: SubmitInput): Array<FieldError> {
  const errors: Array<FieldError> = []
  if (!input.title.trim()) errors.push({ field: "title", message: "Title is required" })
  if (input.title.length > MAX_TITLE) {
    errors.push({ field: "title", message: `Title must be ≤ ${MAX_TITLE} characters` })
  }
  if (!input.name.trim()) errors.push({ field: "name", message: "Name is required" })
  if (input.name.length > MAX_NAME) {
    errors.push({ field: "name", message: `Name must be ≤ ${MAX_NAME} characters` })
  }
  if (!input.repoUrl.trim() || !isHttpUrl(input.repoUrl)) {
    errors.push({ field: "repoUrl", message: "Valid GitHub URL is required" })
  }
  if (!input.appUrl.trim() || !isHttpUrl(input.appUrl)) {
    errors.push({ field: "appUrl", message: "Valid live website URL is required" })
  }
  if (!input.prdMarkdown.trim()) {
    errors.push({ field: "prd", message: "PRD markdown is required" })
  }
  if (input.prdMarkdown.length > MAX_MARKDOWN) {
    errors.push({ field: "prd", message: "PRD too large (≤ 100,000 characters)" })
  }
  if (!input.rfcMarkdown.trim()) {
    errors.push({ field: "rfc", message: "RFC markdown is required" })
  }
  if (input.rfcMarkdown.length > MAX_MARKDOWN) {
    errors.push({ field: "rfc", message: "RFC too large (≤ 100,000 characters)" })
  }
  return errors
}

const EXTENSION_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
}

/** Guess a screenshot MIME type from its file extension, for FormData upload. */
export function screenshotMimeType(filePath: string): string | null {
  const dot = filePath.lastIndexOf(".")
  if (dot < 0) return null
  return EXTENSION_TYPES[filePath.slice(dot).toLowerCase()] ?? null
}

export function validateScreenshot(file: { type: string; size: number }): Array<FieldError> {
  const errors: Array<FieldError> = []
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    errors.push({ field: "screenshot", message: "Screenshot must be PNG, JPEG, or WebP" })
  }
  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    errors.push({ field: "screenshot", message: "Screenshot must be between 1 byte and 2MB" })
  }
  return errors
}

/** One submission row as returned by the board's list/get functions. */
export type Submission = {
  id: string
  title: string
  name: string
  repoUrl: string
  appUrl: string
  prdMarkdown: string
  rfcMarkdown: string
  imagePaths: Array<string>
  judgeLane: number
  liveStatus: string
  liveCheckedAt: Date | null
  liveHttpStatus: number | null
  liveLatencyMs: number | null
  liveTitle: string | null
  createdAt: Date
}

/** Successful result of `submitProjectFn`. */
export type SubmitOutcome = { ok: true; id: string; judgeLane: number }

/** Rejected result of `submitProjectFn`. */
export type SubmitRejection = { ok: false; errors: Array<FieldError> }

export type SubmitResult = SubmitOutcome | SubmitRejection

/** One score row attached to a submission detail result. */
export type ScoreRow = {
  id: string
  submissionId: string
  judgeType: "HUMAN" | "AI"
  judgeName: string
  judgeRole: string | null
  judgeLane: number | null
  prdScore: number
  rfcScore: number
  imageScore: number
  websiteScore: number
}

/** Result of `getSubmissionFn` (null when the id is unknown). */
export type SubmissionDetail = {
  submission: Submission
  scores: Array<ScoreRow>
  canManageScore: boolean
  hasHuman: boolean
  humanScores: {
    prdScore: number
    rfcScore: number
    imageScore: number
    websiteScore: number
  } | null
  nextSubmissionId: string | null
}
