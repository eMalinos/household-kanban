/** Dashboard `url_path` of a frontend path: its first segment, `null` for the default dashboard ("lovelace"). */
export function dashboardUrlPath(pathname: string): string | null {
  const seg = pathname.split("/").find(Boolean);
  return !seg || seg === "lovelace" ? null : seg;
}

/** Deep equality of JSON values; object key order does not matter. */
function same(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (!a || !b || typeof a !== "object" || typeof b !== "object" || Array.isArray(a) !== Array.isArray(b)) return false;
  const x = a as Record<string, unknown>, y = b as Record<string, unknown>;
  const keys = Object.keys(x);
  return keys.length === Object.keys(y).length && keys.every((k) => Object.hasOwn(y, k) && same(x[k], y[k]));
}

/**
 * Replace the card deep-equal to `oldCard` anywhere in a dashboard config (views, sections, stacks,
 * conditional `card`). Only a single match is replaced; with 0 or 2+ matches the input comes back unchanged.
 */
export function replaceCard(
  dashboard: unknown, oldCard: Record<string, unknown>, newCard: Record<string, unknown>,
): { config: unknown; matches: number } {
  let matches = 0;
  const walk = (node: unknown): unknown => {
    if (same(node, oldCard)) { matches++; return newCard; }
    if (Array.isArray(node)) return node.map(walk);
    if (node && typeof node === "object") return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, walk(v)]));
    return node;
  };
  const config = walk(dashboard);
  return { config: matches === 1 ? config : dashboard, matches };
}
