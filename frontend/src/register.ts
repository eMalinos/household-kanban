type Cfg = { type?: string; origConfig?: { type?: string } } | undefined;

/** Ask every already-rendered hui-error-card for `name` to rebuild (walks shadow roots). */
function rebuildErrorCards(name: string): void {
  const type = `custom:${name}`;
  const walk = (root: ParentNode): void => {
    for (const el of root.querySelectorAll("*")) {
      if (el.localName === "hui-error-card") {
        const e = el as Element & { config?: Cfg; _config?: Cfg };
        const cfg = e.config ?? e._config;
        if (cfg?.type === type || cfg?.origConfig?.type === type) {
          el.dispatchEvent(new Event("ll-rebuild", { bubbles: true, composed: true }));
        }
      }
      if (el.shadowRoot) walk(el.shadowRoot);
    }
  };
  walk(document);
}

/**
 * HA swaps `window.customElements` for a scoped-registry polyfill during boot, after this module (loaded
 * early via extra_js_url) defined the element on the original registry. So: define now, define on any
 * registry assigned later (accessor), poll as a fallback (fast at first), and when a define happens late
 * make HA rebuild error cards it already rendered for this type.
 */
export function keepDefined(name: string, ctor: CustomElementConstructor): void {
  let late = false, warned = false;
  const ensure = (reg: CustomElementRegistry = window.customElements): void => {
    if (reg.get(name)) return;
    try {
      reg.define(name, ctor);
    } catch (e) {
      if (!warned) { warned = true; console.warn("household_kanban: could not register the card", e); }
      return;
    }
    if (late) rebuildErrorCards(name);
  };
  ensure();
  late = true;

  try {
    const d = Object.getOwnPropertyDescriptor(window, "customElements");
    if (!d || d.configurable) {
      let cur = window.customElements;
      Object.defineProperty(window, "customElements", {
        configurable: true, enumerable: d?.enumerable ?? true,
        get: () => cur,
        set: (v: CustomElementRegistry) => { cur = v; ensure(v); },
      });
    }
  } catch { /* polling below still covers it */ }

  document.addEventListener("DOMContentLoaded", () => ensure());
  window.addEventListener("load", () => ensure());
  const t0 = Date.now();
  const tick = (): void => {
    ensure();
    const elapsed = Date.now() - t0;
    if (elapsed < 20_000) window.setTimeout(tick, elapsed < 3000 ? 40 : 250);
  };
  window.setTimeout(tick, 40);
}
