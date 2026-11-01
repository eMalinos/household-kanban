import { LitElement, css, html, nothing } from "lit";
import { subscribeBoard, type Hass } from "./api";
import { DONE_DAYS, normalizeConfig, type CardConfig } from "./config";
import type { ColumnId } from "./logic/columns";
import { keepDefined } from "./register";
import { retryDelay } from "./logic/retry";
import { t, type Key } from "./i18n";
import type { Parent } from "./types";

const TOGGLES: ColumnId[] = ["todo", "later", "week", "today", "done"];

class HouseholdKanbanCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _parents: { state: true },
  };

  hass?: Hass;
  _config?: CardConfig;
  _parents: Parent[] = [];
  private _unsub?: () => void;
  private _raw: Record<string, unknown> = {}; // keeps HA-owned keys (grid_options, visibility, ...)
  private _retry?: number;
  private _attempts = 0;

  setConfig(raw: CardConfig): void {
    this._raw = { ...raw };
    try { this._config = normalizeConfig(raw); } catch { this._config = normalizeConfig({ type: raw.type }); }
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Needs hass; it may arrive after connect, so retry from updated().
    this._sub();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._retry);
    this._retry = undefined;
    this._unsub?.();
    this._unsub = undefined;
  }

  private _subbing = false;
  /** Subscribe once; on failure retry on the card's backoff timer, not on every update. */
  private _sub(): void {
    if (this._unsub || this._subbing || this._retry !== undefined || !this.hass || !this.isConnected) return;
    this._subbing = true;
    subscribeBoard(this.hass, (b) => { this._parents = b.parents; })
      .then((u) => { this._attempts = 0; if (this.isConnected) this._unsub = u; else u(); })
      .catch((e) => {
        console.warn("household_kanban: editor subscribe failed", e);
        if (this.isConnected) this._retry = window.setTimeout(() => { this._retry = undefined; this._sub(); }, retryDelay(this._attempts++));
      })
      .finally(() => { this._subbing = false; });
  }

  protected updated(): void { this._sub(); }

  private _set(patch: Partial<CardConfig>): void {
    if (!this._config) return;
    const next = { ...this._config, ...patch };
    for (const k of ["parents", "people"] as const) if (next[k] === undefined) delete next[k];
    this._config = normalizeConfig(next);
    const config: Record<string, unknown> = { ...this._raw, ...this._config };
    for (const k of ["parents", "people"] as const) if (!(k in this._config)) delete config[k];
    this._raw = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  /** Checkbox list where "nothing picked" means "all" (config key left out). */
  private _toggleIn(key: "parents" | "people", all: string[], id: string, on: boolean): void {
    const cur = new Set(this._config?.[key] ?? all);
    if (on) cur.add(id); else cur.delete(id);
    this._set({ [key]: cur.size === 0 || cur.size === all.length ? undefined : all.filter((x) => cur.has(x)) });
  }

  private _checks(key: "parents" | "people", opts: { id: string; name: string }[]) {
    const all = opts.map((o) => o.id);
    const sel = this._config?.[key];
    return opts.map((o) => html`<label class="row">
      <input type="checkbox" .checked=${!sel || sel.includes(o.id)}
        @change=${(e: Event) => this._toggleIn(key, all, o.id, (e.target as HTMLInputElement).checked)} />
      <span>${o.name}</span>
    </label>`);
  }

  protected render() {
    const cfg = this._config, hass = this.hass;
    if (!cfg || !hass) return nothing;
    const lang = hass.locale?.language ?? hass.language ?? "en";
    const L = (k: Key) => t(lang, k);
    const people = Object.entries(hass.states).filter(([id]) => id.startsWith("person."))
      .map(([id, s]) => ({ id, name: String(s.attributes.friendly_name ?? id) }));
    return html`
      <h3>${L("ed_columns")}</h3>
      ${TOGGLES.map((c) => html`<label class="row">
        <input type="checkbox" role="switch" .checked=${cfg.columns?.includes(c) ?? false} ?disabled=${c === "todo"}
          @change=${(e: Event) => {
            const on = (e.target as HTMLInputElement).checked;
            this._set({ columns: (cfg.columns ?? []).filter((x) => x !== c).concat(on ? [c] : []) });
          }} />
        <span>${L(`col_${c}` as Key)}</span>
      </label>`)}
      ${cfg.columns?.includes("done") ? html`
        <div class="row"><span class="grow">${L("ed_done_days")}</span>
          <div class="seg" role="radiogroup" aria-label=${L("ed_done_days")}>
            ${DONE_DAYS.map((d) => html`<button type="button" role="radio" aria-checked=${cfg.done_days === d}
              @click=${() => this._set({ done_days: d })}>${d}</button>`)}
          </div>
        </div>` : nothing}
      <h3>${L("group_label")}</h3>
      <select aria-label=${L("group_label")} @change=${(e: Event) => this._set({ group: (e.target as HTMLSelectElement).value as CardConfig["group"] })}>
        <option value="date" ?selected=${cfg.group === "date"}>${L("group_date")}</option>
        <option value="priority" ?selected=${cfg.group === "priority"}>${L("group_priority")}</option>
      </select>
      <h3>${L("ed_week_end")}</h3>
      <select aria-label=${L("ed_week_end")} @change=${(e: Event) => this._set({ week_end: (e.target as HTMLSelectElement).value as CardConfig["week_end"] })}>
        <option value="auto" ?selected=${cfg.week_end === "auto"}>${L("ed_auto")}</option>
        <option value="saturday" ?selected=${cfg.week_end === "saturday"}>${L("ed_saturday")}</option>
        <option value="sunday" ?selected=${cfg.week_end === "sunday"}>${L("ed_sunday")}</option>
      </select>
      <h3>${L("filter_parents")}</h3>
      ${this._checks("parents", this._parents)}
      <h3>${L("filter_people")}</h3>
      ${this._checks("people", people)}`;
  }

  static styles = css`
    :host { display: block; color: var(--primary-text-color); }
    h3 { margin: 16px 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--secondary-text-color); }
    .row { display: flex; align-items: center; gap: 10px; padding: 6px 0; }
    .grow { flex: 1; }
    input[type="checkbox"] { width: 18px; height: 18px; accent-color: var(--primary-color); }
    select { width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: inherit; font: inherit; }
    .seg { display: flex; gap: 4px; padding: 3px; border-radius: 999px; background: var(--secondary-background-color); }
    .seg button { border: 0; border-radius: 999px; padding: 4px 12px; font: inherit; background: none; color: inherit; cursor: pointer; }
    .seg button[aria-checked="true"] { background: var(--primary-color); color: var(--text-primary-color, #fff); }
  `;
}

keepDefined("household-kanban-card-editor", HouseholdKanbanCardEditor);
