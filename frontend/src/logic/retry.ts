/** Delay before subscribe retry number `attempt` (0-based): 5 s doubling, capped at 60 s. */
export function retryDelay(attempt: number): number {
  return Math.min(60_000, 5_000 * 2 ** Math.min(attempt, 10));
}
