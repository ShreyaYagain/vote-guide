// src/lib/rateLimit.ts
// In-memory rate limiter — no Redis, no external service.
// Resets on Vercel cold starts (acceptable at hackathon scale).
// Swap checkRateLimit import to Upstash when traffic grows past ~1K MAU.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export function checkRateLimit(ip: string, max = 20): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + 3_600_000 }); // 1-hour window
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

export function getRateLimitRemaining(ip: string, max = 20): number {
  const entry = store.get(ip);
  if (!entry || Date.now() > entry.resetAt) return max;
  return Math.max(0, max - entry.count);
}
