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

test("a define that throws is logged once per element (card + editor), not repeatedly", async () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  await import("../src/card");
  const bad = { get: () => undefined, define: () => { throw new Error("already defined"); }, whenDefined: async () => undefined };
  Object.defineProperty(window, "customElements", { value: bad, configurable: true, writable: true });
  vi.advanceTimersByTime(2000);
  expect(warn.mock.calls.filter((c) => String(c[0]).includes("household_kanban"))).toHaveLength(2);
});

test("assigning a new registry defines the card and the editor synchronously", async () => {
  await import("../src/card");
  const fresh = fakeRegistry();
  (window as unknown as { customElements: unknown }).customElements = fresh;
  expect(fresh.get(NAME)).toBeDefined();
  expect(fresh.get(`${NAME}-editor`)).toBeDefined();
  expect(window.customElements).toBe(fresh);
});

test("assigning a registry never throws because of us, warns once per name", async () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  await import("../src/card");
  const broken = { get: () => { throw new Error("broken get"); }, define: () => undefined, whenDefined: async () => undefined };
  for (let i = 0; i < 3; i++) {
    expect(() => { (window as unknown as { customElements: unknown }).customElements = broken; }).not.toThrow();
  }
  expect(window.customElements).toBe(broken);
  vi.advanceTimersByTime(2000);
  expect(warn.mock.calls.filter((c) => String(c[0]).includes("household_kanban"))).toHaveLength(2);
});

test("a late define asks already-rendered error cards to rebuild", async () => {
  await import("../src/card");
  const host = document.createElement("div");
  document.body.append(host);
  const err = document.createElement("hui-error-card") as HTMLElement & { config?: unknown };
  err.config = { type: "error", origConfig: { type: `custom:${NAME}` } };
  const other = document.createElement("hui-error-card") as HTMLElement & { config?: unknown };
  other.config = { type: "error", origConfig: { type: "custom:something-else" } };
  host.attachShadow({ mode: "open" }).append(err, other);
  const rebuilt: string[] = [];
  err.addEventListener("ll-rebuild", () => rebuilt.push("ours"));
  other.addEventListener("ll-rebuild", () => rebuilt.push("other"));
  (window as unknown as { customElements: unknown }).customElements = fakeRegistry();
  expect(rebuilt).toEqual(["ours"]);
  host.remove();
});
