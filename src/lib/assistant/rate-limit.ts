import "server-only";

/**
 * A fixed-window counter per client, held in module memory.
 *
 * This is deliberately the cheapest thing that works. On serverless the window
 * is per instance, so the real ceiling is `LIMIT x instances` — which is the
 * wrong tool for billing but the right one for the job it has: keeping one
 * script from burning a free-tier daily quota that everyone else shares. When
 * the practice outgrows that, the replacement is a Redis counter behind the
 * same `consume()` signature, not a rewrite of the route.
 *
 * Entries are swept on write, so the map cannot grow without bound.
 */
interface Window {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 60_000;
const LIMIT = 10;

const windows = new Map<string, Window>();

function sweep(now: number): void {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export interface RateLimitResult {
  readonly allowed: boolean;
  /** Seconds until the window resets, for the `Retry-After` header. */
  readonly retryAfter: number;
}

/** Records one request against `key`, and says whether it may proceed. */
export function consume(key: string, now = Date.now()): RateLimitResult {
  sweep(now);

  const existing = windows.get(key);

  if (existing === undefined || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  existing.count += 1;

  return {
    allowed: existing.count <= LIMIT,
    retryAfter: Math.ceil((existing.resetAt - now) / 1000),
  };
}

/** Test seam. Never called by the route. */
export function reset(): void {
  windows.clear();
}

/**
 * Best effort, and treated as such: behind a proxy the header can be spoofed,
 * so this throttles honest traffic and slows dishonest traffic down. It is not
 * an authentication boundary and nothing here assumes it is.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();

  return first !== undefined && first !== ""
    ? first
    : (request.headers.get("x-real-ip") ?? "unknown");
}
