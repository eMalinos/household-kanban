// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, test, vi } from "vitest";

const NAME = "household-kanban-card";
const real = window.customElements;

/** A registry-like object, like the scoped-registry polyfill HA swaps in during boot. */
function fakeRegistry() {
  const m = new Map<string, CustomElementConstructor>();
  return {
    m,
    get: (n: string) => m.get(n),
    define: (n: string, c: CustomElementConstructor) => { m.set(n, c); },
    whenDefined: async () => undefined,
  };
}

beforeEach(() => { vi.useFakeTimers(); vi.resetModules(); });
afterEach(() => {
  vi.useRealTimers();
  Object.defineProperty(window, "customElements", { value: real, configurable: true, writable: true });
});

test("the card ends up defined on a registry swapped in after import", async () => {
  await import("../src/card");
  expect(real.get(NAME)).toBeDefined();
  const fresh = fakeRegistry();
  Object.defineProperty(window, "customElements", { value: fresh, configurable: true, writable: true });
  expect(fresh.get(NAME)).toBeUndefined();
  vi.advanceTimersByTime(300);
  expect(fresh.get(NAME)).toBe(real.get(NAME));
});

test("customCards gets one entry per import", async () => {
  await import("../src/card");
  vi.advanceTimersByTime(1000);
  expect((window.customCards ?? []).filter((c) => c.type === NAME)).toHaveLength(1);
});

test("a define that throws is logged once, not repeatedly", async () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  await import("../src/card");
  const bad = { get: () => undefined, define: () => { throw new Error("already defined"); }, whenDefined: async () => undefined };
  Object.defineProperty(window, "customElements", { value: bad, configurable: true, writable: true });
  vi.advanceTimersByTime(2000);
  expect(warn.mock.calls.filter((c) => String(c[0]).includes("household_kanban"))).toHaveLength(1);
});
