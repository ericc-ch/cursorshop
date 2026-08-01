/**
 * Minimal seroval "cross" wire codec for the deployed Showcase board.
 *
 * The board's server functions exchange seroval cross-mode node trees. The
 * deployment runs an older seroval than current releases (object tag 10), so
 * instead of depending on a matching `seroval` version this module implements
 * the exact subset observed on the wire (2026-08-01 production):
 *
 *   t:0  { s }                                  finite number
 *   t:1  { s }                                  string
 *   t:2  { s:0|null, s:1|undefined, s:2|true, s:3|false }
 *   t:5  { i, s }                               Date (ISO-8601)
 *   t:9  { i, a:[node] }                        array
 *   t:10 { i, p:{k,v}, o? }                     plain object
 *   t:11 { i, p:{k,v}, o? }                     null-prototype object
 *
 * Nodes with `i` carry reference identities; the board never repeats ids for
 * the flat shapes the CLI sends, but the serializer keeps them unique to
 * satisfy the server's conflict checks. References between nodes are not
 * needed and are rejected if encountered on the wire.
 */

export type CrossNode = Record<string, unknown>

const TAG_NUMBER = 0
const TAG_STRING = 1
const TAG_SPECIAL = 2
const TAG_DATE = 5
const TAG_ARRAY = 9
const TAG_OBJECT = 10
const TAG_NULL_OBJECT = 11

export class CrossCodecError extends Error {}

class Serializer {
  private nextRefId = 0

  private refId(): number {
    return this.nextRefId++
  }

  node(value: unknown): CrossNode {
    if (typeof value === "string") return { t: TAG_STRING, s: value }
    if (typeof value === "number") {
      if (!Number.isFinite(value)) {
        throw new CrossCodecError("Non-finite numbers are not supported")
      }
      return { t: TAG_NUMBER, s: value }
    }
    if (value === null) return { t: TAG_SPECIAL, s: 0 }
    if (value === undefined) return { t: TAG_SPECIAL, s: 1 }
    if (typeof value === "boolean") return { t: TAG_SPECIAL, s: value ? 2 : 3 }
    if (value instanceof Date) {
      return { t: TAG_DATE, i: this.refId(), s: value.toISOString() }
    }
    if (Array.isArray(value)) {
      return { t: TAG_ARRAY, i: this.refId(), a: value.map((item) => this.node(item)) }
    }
    if (typeof value === "object") {
      const entries = Object.entries(value as Record<string, unknown>).filter(
        ([, item]) => item !== undefined,
      )
      const p = {
        k: entries.map(([key]) => key),
        v: entries.map(([, item]) => this.node(item)),
      }
      // `s` (entry count) is required by older seroval deserializers and
      // ignored by newer ones — always emit it.
      return { t: TAG_OBJECT, i: this.refId(), p, s: p.k.length, o: 0 }
    }
    throw new CrossCodecError(`Unsupported value type: ${typeof value}`)
  }
}

/** Encode a plain JSON-ish value as a seroval cross-mode node tree. */
export function encodeCross(value: unknown): CrossNode {
  return new Serializer().node(value)
}

/**
 * Request bodies/query payloads are parsed by the board's *vanilla* deserializer,
 * which expects the `{ t, f, m }` envelope (verified empirically against
 * production 2026-08-01: bare cross trees are rejected with
 * "Seroval Error (step: 3)"). Responses, by contrast, are bare cross trees.
 */
export function encodeRequestEnvelope(value: unknown): {
  t: CrossNode
  f: number
  m: Array<number>
} {
  return { t: encodeCross(value), f: 127, m: [] }
}

function isNode(value: unknown): value is CrossNode {
  return typeof value === "object" && value !== null && "t" in value
}

function requireFields(node: CrossNode, ...fields: Array<string>): void {
  for (const field of fields) {
    if (!(field in node)) {
      throw new CrossCodecError(`Malformed node (t=${String(node.t)}): missing "${field}"`)
    }
  }
}

/** Decode a seroval cross-mode node tree back into a plain value. */
export function decodeCross(node: unknown): unknown {
  if (!isNode(node)) {
    throw new CrossCodecError(
      `Expected a seroval node, got: ${JSON.stringify(node)?.slice(0, 120)}`,
    )
  }
  switch (node.t) {
    case TAG_NUMBER: {
      requireFields(node, "s")
      return node.s
    }
    case TAG_STRING: {
      requireFields(node, "s")
      return node.s
    }
    case TAG_SPECIAL: {
      requireFields(node, "s")
      switch (node.s) {
        case 0:
          return null
        case 1:
          return undefined
        case 2:
          return true
        case 3:
          return false
        default:
          throw new CrossCodecError(`Unknown special sentinel: ${String(node.s)}`)
      }
    }
    case TAG_DATE: {
      requireFields(node, "s")
      return new Date(String(node.s))
    }
    case TAG_ARRAY: {
      requireFields(node, "a")
      return (node.a as Array<unknown>).map((item) => decodeCross(item))
    }
    case TAG_OBJECT:
    case TAG_NULL_OBJECT: {
      requireFields(node, "p")
      const p = node.p as { k: Array<string>; v: Array<unknown> }
      const out: Record<string, unknown> = {}
      for (let i = 0; i < p.k.length; i++) {
        out[p.k[i]!] = decodeCross(p.v[i])
      }
      return out
    }
    default:
      throw new CrossCodecError(
        `Unsupported node tag ${String(node.t)}: ${JSON.stringify(node).slice(0, 200)}`,
      )
  }
}
