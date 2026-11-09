import { css } from "lit";

// Bento tokens first, standard HA variables as fallback.
export const styles = css`
  :host {
    /* Homecraft card token contract (docs/style-homecraft.md in ha-features-builder): --hfb-* first, HA fallback */
    --kb-card: var(--hfb-card, var(--card-background-color, #fff));
    --kb-fill: var(--hfb-fill, var(--secondary-background-color, #f0f2f5));
    --kb-border: var(--hfb-border, var(--divider-color, #dfe3e8));
    --kb-accent: var(--hfb-accent, var(--primary-color, #4f6b8c));
    --kb-text: var(--hfb-text, var(--primary-text-color, #1c2128));
    --kb-text-2: var(--hfb-text-2, var(--secondary-text-color, #646c77));
    --kb-raised: var(--hfb-btn-raised-bg, var(--kb-card));
    --kb-raised-shadow: var(--hfb-btn-raised-shadow, none);
    --kb-primary-bg: var(--hfb-btn-primary-bg, var(--kb-text));
    --kb-primary-color: var(--hfb-btn-primary-color, var(--kb-card));
    --kb-seg-track: var(--hfb-seg-track, var(--kb-fill));
    --kb-seg-on: var(--hfb-seg-on, var(--kb-card));
    --kb-seg-on-shadow: var(--hfb-seg-on-shadow, 0 0 #0000); /* not none: it is combined with a ring */
    --kb-seg-on-color: var(--hfb-seg-on-color, var(--kb-text));
    --kb-tile-bg: var(--hfb-tile-bg, var(--kb-fill));
    --kb-tile-border: var(--hfb-tile-border, none);
    --kb-tile-shadow: var(--hfb-tile-shadow, none);
    --kb-tile-radius: var(--hfb-tile-radius, 14px);
    --kb-run-dot: var(--hfb-run-dot, linear-gradient(145deg, color-mix(in srgb, var(--kb-accent) 65%, #fff), var(--kb-accent)));
    --kb-dot-idle: var(--hfb-dot-idle, var(--kb-card));
    --kb-tint: var(--hfb-alert-tint, 12%);
    --kb-up-bg: var(--hfb-delta-up-bg, color-mix(in srgb, var(--warning-color, #ffa600) 12%, transparent));
    --kb-up-color: var(--hfb-delta-up-color, var(--warning-color, #ffa600));
    --kb-ok: var(--success-color, #43a047);
    --kb-info: var(--info-color, #039be5);
    --kb-err: var(--error-color, #db4437);
    /* list colours are data (a list's own colour), not theme roles */
    --c-red: 255, 59, 48; --c-orange: 255, 149, 0; --c-yellow: 230, 180, 0; --c-green: 52, 199, 89;
    --c-teal: 48, 176, 199; --c-cyan: 50, 173, 230; --c-blue: 0, 122, 255; --c-indigo: 88, 86, 214;
    --c-purple: 175, 82, 222; --c-pink: 255, 45, 85; --c-brown: 162, 132, 94; --c-grey: 142, 142, 147;
    display: block;
    color: var(--kb-text);
  }
  * { box-sizing: border-box; }
  button { font: inherit; cursor: pointer; color: inherit; }
  button:focus-visible { outline: 2px solid var(--kb-accent); outline-offset: 2px; }
  ha-card { padding: 16px 18px 18px; display: flex; flex-direction: column; gap: 14px;
    background: var(--ha-card-background, var(--kb-card)); border-radius: var(--ha-card-border-radius, var(--hfb-card-radius, 12px));
    box-shadow: var(--ha-card-box-shadow, var(--hfb-card-shadow, none)); }

  .c-red { --pc: var(--c-red); } .c-orange { --pc: var(--c-orange); } .c-yellow { --pc: var(--c-yellow); }
  .c-green { --pc: var(--c-green); } .c-teal { --pc: var(--c-teal); } .c-cyan { --pc: var(--c-cyan); }
  .c-blue { --pc: var(--c-blue); } .c-indigo { --pc: var(--c-indigo); } .c-purple { --pc: var(--c-purple); }
  .c-pink { --pc: var(--c-pink); } .c-brown { --pc: var(--c-brown); } .c-grey { --pc: var(--c-grey); }

  /* soft panel and raised button, the two Homecraft surfaces inside a card */
  .seg, .seg3, .set-tabs, .cl-box-list, .hist-search, .hist-rows, .set-rows, .pill-input, .col, .tile, .qchip, .plist, .prow, .menu-btn {
    background: var(--kb-tile-bg); border: var(--kb-tile-border); box-shadow: var(--kb-tile-shadow);
  }
  .round-btn, .pill-btn, .col-head .add, .time-in { border: 0; background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); }

  header { display: flex; align-items: center; gap: 10px; }
  header .titles { flex: 1; min-width: 0; }
  /* narrow: title + summary on the first row, the buttons on their own row */
  header.narrow { flex-wrap: wrap; justify-content: flex-end; row-gap: 10px; }
  header.narrow .titles { flex-basis: calc(100% - 46px); }
  .dot.hdr-dot { width: 36px; height: 36px; --mdc-icon-size: 20px; background: var(--kb-run-dot); box-shadow: var(--hfb-run-glow, none); color: var(--hfb-dot-on-icon, #fff); }
  h1 { margin: 0; font-size: 16px; font-weight: 500; }
  .summary { font-size: 12px; color: var(--kb-text-2); }
  .seg { display: flex; gap: 4px; padding: 4px; border-radius: 12px; background: var(--kb-seg-track); }
  .seg button { height: 34px; padding: 0 12px; border-radius: 9px; border: 0; background: transparent; color: var(--kb-text-2); font-size: 13px; font-weight: 500; }
  .seg button[aria-pressed="true"], .seg button[aria-checked="true"] { background: var(--kb-seg-on); box-shadow: var(--kb-seg-on-shadow); color: var(--kb-seg-on-color); font-weight: 600; }

  .filters { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; }
  .filters .seg { margin-left: auto; }
  .people, .parents { display: flex; gap: 6px; }
  .parents { flex-wrap: wrap; }
  /* scrolls sideways; the padding keeps the chips' shadows from being clipped to a rectangle */
  .people { overflow-x: auto; scrollbar-width: none; padding: 6px 10px 22px; margin: -6px -10px -22px; }
  .person, .chip { display: inline-flex; align-items: center; gap: 6px; flex: none; height: 32px; padding: 0 10px 0 4px; border-radius: 16px; border: 0; background: var(--kb-fill); color: var(--kb-text); font-size: 13px; font-weight: 500; }
  .person[aria-pressed="true"], .chip[aria-pressed="true"], .dlg-chip[aria-checked="true"] { background: var(--kb-seg-on); box-shadow: var(--kb-seg-on-shadow), 0 0 0 1.5px var(--kb-accent); color: var(--kb-seg-on-color); font-weight: 600; }
  .people.has-filter .person[aria-pressed="false"] { opacity: 0.45; }
  .chip b { font-size: 12px; font-weight: 600; color: var(--kb-text-2); }
  /* icon circle: a list's or a state's colour as a gradient, white glyph */
  .dot { width: 28px; height: 28px; flex: none; border-radius: 50%; display: grid; place-items: center; color: var(--hfb-dot-on-icon, #fff); --mdc-icon-size: 16px;
    background: linear-gradient(145deg, color-mix(in srgb, rgb(var(--pc, var(--c-grey))) 62%, #fff), rgb(var(--pc, var(--c-grey)))); }
  .dot.sm { width: 20px; height: 20px; --mdc-icon-size: 12px; }
  .dot.idle { background: var(--kb-dot-idle); color: #607d8b; box-shadow: var(--kb-raised-shadow); }
  .ava { width: 24px; height: 24px; flex: none; border-radius: 50%; display: grid; place-items: center; color: #fff; font-size: 10px; font-weight: 700; object-fit: cover; }
  .ava.lg { width: 24px; height: 24px; font-size: 10px; }
  .ava.xs { width: 20px; height: 20px; font-size: 9px; }
  .ava.none { background: transparent; border: 1.5px dashed var(--kb-border); color: var(--kb-text-2); }

  .board { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(260px, 1fr); gap: 12px; overflow-x: auto; align-items: start; scroll-snap-type: x proximity; scrollbar-width: none; }
  .col { display: flex; flex-direction: column; gap: 8px; padding: 10px; border-radius: var(--kb-tile-radius); min-width: 0; scroll-snap-align: start; }
  .col-head { display: flex; align-items: center; gap: 8px; padding: 2px; }
  .col-head .label { flex: 1; min-width: 0; font-size: 13px; font-weight: 600; }
  .col-head .count { display: inline-grid; place-items: center; min-width: 22px; height: 20px; padding: 0 6px; border-radius: 10px; font-size: 11px; font-weight: 600; color: var(--kb-text-2); background: var(--kb-card); }
  .note, .empty { font-size: 12px; color: var(--kb-text-2); padding: 4px 6px; }
  .empty { text-align: center; padding: 14px 8px; border: 1.5px dashed var(--kb-border); border-radius: 12px; }

  .card { display: flex; flex-direction: column; gap: 7px; padding: 10px 12px; border-radius: 12px; background: var(--kb-card); box-shadow: var(--hfb-btn-raised-shadow, 0 0 0 1px var(--kb-border)); }
  .card.done { opacity: 0.7; }
  .row { display: flex; align-items: center; gap: 6px; }
  .row.top { align-items: flex-start; gap: 8px; }
  .parent-name { font-size: 11px; font-weight: 500; color: var(--kb-text-2); flex: 1; min-width: 0; }
  .card .row .ava { width: 22px; height: 22px; font-size: 9px; }
  .check { width: 20px; height: 20px; flex: none; padding: 0; border-radius: 50%; display: grid; place-items: center; border: 1.5px solid var(--kb-border); background: transparent; color: transparent; }
  .check[aria-pressed="true"] { border-color: var(--kb-ok); background: var(--kb-ok); color: #fff; }
  .title { flex: 1; text-align: left; border: 0; background: transparent; padding: 0; min-width: 0; font-size: 14px; font-weight: 600; line-height: 1.3; overflow-wrap: anywhere; }
  .done .title { color: var(--kb-text-2); text-decoration: line-through; }
  .pills { display: flex; flex-wrap: wrap; gap: 4px; }
  .pill { display: inline-flex; align-items: center; gap: 4px; height: 22px; padding: 0 8px; border-radius: 11px; font-size: 11px; font-weight: 600; white-space: nowrap; background: var(--kb-fill); color: var(--kb-text-2); --mdc-icon-size: 12px; }
  .pill.c-green { background: color-mix(in srgb, var(--kb-ok) var(--kb-tint), transparent); color: var(--kb-ok); }
  .pill.c-red { background: color-mix(in srgb, var(--kb-err) var(--kb-tint), transparent); color: var(--kb-err); }
  .pill.c-orange, .pill.prio-1 { background: var(--kb-up-bg); color: var(--kb-up-color); }
  .pill.prio-2, .pill.prio-3, .pill.later { background: var(--kb-fill); color: var(--kb-text-2); }
  .pill.today { background: color-mix(in srgb, var(--kb-info) var(--kb-tint), transparent); color: var(--kb-info); }

  .cl-bar { height: 4px; border-radius: 2px; background: var(--kb-fill); overflow: hidden; }
  .cl-bar span { display: block; height: 100%; border-radius: 2px; background: var(--kb-ok); }
  .cl { display: flex; flex-direction: column; gap: 2px; }
  .cl-row { display: flex; align-items: center; gap: 8px; padding: 3px 0; border: 0; border-radius: 6px; background: transparent; text-align: left; font-size: 13px; color: var(--kb-text); }
  .cl-row .cl-t { flex: 1; min-width: 0; overflow-wrap: anywhere; }
  .cl-box, .cl-check { width: 16px; height: 16px; flex: none; box-sizing: border-box; border-radius: 5px; display: grid; place-items: center; padding: 0; border: 1.5px solid var(--kb-border); background: transparent; color: transparent; }
  .cl-row[aria-checked="true"] .cl-box, .cl-check[aria-checked="true"] { border-color: var(--kb-ok); background: var(--kb-ok); color: #fff; }
  .cl-row[aria-checked="true"] .cl-t, .cl-item.done .cl-text { color: var(--kb-text-2); text-decoration: line-through; }
  .cl-more { align-self: flex-start; }
  .note { font-size: 12px; line-height: 1.45; color: var(--kb-text-2); overflow-wrap: anywhere; }
  .note.clamp { max-height: calc(var(--clamp, 3) * 1.45em); overflow: hidden; }
  .note.plain { white-space: pre-wrap; }
  .note ha-markdown { display: block; }
  .fmt-btn { border: 0; background: transparent; color: var(--kb-text); border-radius: 8px; min-width: 32px; height: 30px; font: inherit; font-size: 14px; cursor: pointer; display: inline-grid; place-items: center; }
  .seg2 { display: inline-flex; gap: 4px; margin-left: 6px; padding: 3px; border-radius: 12px; background: var(--kb-seg-track); }
  .seg2 .pill-btn { height: 28px; padding: 0 12px; border-radius: 9px; background: transparent; box-shadow: none; color: var(--kb-text-2); font-weight: 500; }
  .seg2 .pill-btn[aria-pressed="true"] { background: var(--kb-seg-on); box-shadow: var(--kb-seg-on-shadow); color: var(--kb-seg-on-color); font-weight: 600; }
  .cl-alldone { display: flex; align-items: center; gap: 8px; padding: 4px 0; font-size: 13px; font-weight: 600; color: var(--kb-ok); }
  .cl-alldone span { flex: 1; }
  .cl-box-list { display: flex; flex-direction: column; padding: 6px 6px 6px 12px; border-radius: var(--kb-tile-radius); }
  .cl-item { display: flex; align-items: center; gap: 10px; min-height: 40px; }
  .cl-item.first-done { border-top: 1px solid var(--kb-border); margin-top: 4px; padding-top: 4px; }
  .cl-check { width: 20px; height: 20px; border-radius: 6px; }
  .cl-text { flex: 1; min-width: 0; font-size: 14px; overflow-wrap: anywhere; }
  .cl-x { width: 32px; height: 32px; flex: none; border-radius: 8px; border: 0; background: transparent; color: var(--kb-text-2); display: grid; place-items: center; padding: 0; }
  .cl-add { display: flex; align-items: center; gap: 10px; min-height: 40px; color: var(--kb-accent); font-size: 18px; font-weight: 500; }
  .cl-add input { flex: 1; min-width: 0; border: 0; background: transparent; padding: 4px 0; font-size: 14px; font-weight: 400; color: var(--kb-text); }
  .cl-add input::placeholder { color: var(--kb-text-2); }
  .link { border: 0; background: transparent; padding: 2px 0; text-align: left; font-size: 12px; font-weight: 500; color: var(--kb-accent); display: flex; align-items: center; gap: 4px; }
  .link.muted { color: var(--kb-text-2); }
  .notice .retry-eod { margin-left: 8px; }
  .notice { padding: 8px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; background: color-mix(in srgb, var(--kb-err) var(--kb-tint), transparent); color: var(--kb-err); }
  .loading { padding: 24px; text-align: center; color: var(--kb-text-2); }

  .card[data-uid] { cursor: pointer; touch-action: manipulation; }
  .col-head .add { width: 28px; height: 28px; border-radius: 9px; font-size: 18px; line-height: 1; padding: 0; }
  .col-head .pill { margin-right: 2px; }
  .sortable-ghost { opacity: 0.35; }
  .sortable-fallback { opacity: 0.9; }
  header .new, .primary-btn { height: 32px; padding: 0 12px; border-radius: 10px; border: 0; background: var(--kb-primary-bg); color: var(--kb-primary-color); font-size: 13px; font-weight: 600; white-space: nowrap; }
  header .round-btn { width: 32px; height: 32px; border-radius: 10px; }

  dialog.kb-dialog { padding: 0; border: 0; border-radius: 24px; background: var(--kb-card); color: var(--kb-text); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18); width: min(480px, calc(100vw - 24px)); max-height: calc(100vh - 24px); overflow: auto; }
  dialog.kb-dialog::backdrop { background: rgba(0, 0, 0, 0.36); }
  .dlg { display: flex; flex-direction: column; gap: 14px; padding: 18px 20px 20px; }
  .dlg-head { display: flex; align-items: center; gap: 10px; }
  .dlg-head .dot { width: 36px; height: 36px; --mdc-icon-size: 20px; }
  .dlg-kicker { flex: 1; font-size: 12px; color: var(--kb-text-2); }
  .dlg-label { font-size: 13px; font-weight: 600; color: var(--kb-text); }
  .field { display: flex; flex-direction: column; gap: 8px; }
  .vis-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .dlg input, .dlg textarea { font: inherit; color: inherit; }
  .dlg input:focus-visible, .dlg textarea:focus-visible { outline: 2px solid var(--kb-accent); outline-offset: 2px; }
  .dlg-title { border: 0; border-radius: 14px; background: var(--kb-tile-bg); padding: 0 14px; height: 44px; font-size: 15px; font-weight: 600; width: 100%; }
  .dlg textarea { resize: none; border-radius: var(--kb-tile-radius); background: var(--kb-tile-bg); border: var(--kb-tile-border); box-shadow: var(--kb-tile-shadow); padding: 10px 14px; font-size: 13px; line-height: 1.5; width: 100%; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
  .dlg-chip { padding-left: 4px; }
  .seg3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; padding: 4px; border-radius: 12px; background: var(--kb-seg-track); }
  .seg3 button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 34px; border-radius: 9px; border: 0; background: transparent; color: var(--kb-text-2); font-size: 13px; font-weight: 500; }
  .seg3 button[aria-checked="true"] { background: var(--kb-seg-on); box-shadow: var(--kb-seg-on-shadow); color: var(--kb-seg-on-color); font-weight: 600; }
  .seg3 .prio-1 { color: var(--kb-up-color); }
  .pill-btn { height: 32px; padding: 0 12px; border-radius: 10px; font-size: 13px; font-weight: 600; }
  .dlg .chips .pill-btn { background: var(--kb-fill); box-shadow: none; height: 28px; border-radius: 14px; font-size: 12px; color: var(--kb-text-2); }
  .pill-btn.on, .pill-btn[aria-pressed="true"], .dlg .chips .pill-btn[aria-pressed="true"] { background: var(--kb-primary-bg); color: var(--kb-primary-color); box-shadow: none; }
  .pill-input { display: inline-flex; align-items: center; height: 36px; padding: 0 12px; border-radius: 12px; }
  .pill-input input { border: 0; background: transparent; font-size: 13px; font-weight: 600; color-scheme: light dark; }
  .round-btn { width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; padding: 0; }
  .dlg-head .round-btn, .sheet-head .round-btn { background: transparent; box-shadow: none; }
  .dlg-foot { display: flex; align-items: center; gap: 8px; padding-top: 2px; flex-wrap: wrap; }
  .dlg-foot .pill-btn { background: var(--kb-fill); box-shadow: none; }
  .grow { flex: 1; }
  .primary-btn:disabled { opacity: 0.45; cursor: default; }
  .danger-link { height: 32px; padding: 0 4px; border: 0; background: transparent; color: var(--kb-err); font-size: 13px; font-weight: 600; }
  .danger-btn { height: 32px; padding: 0 12px; border-radius: 10px; border: 0; background: var(--kb-err); color: #fff; font-size: 13px; font-weight: 600; }
  .danger-text { font-size: 13px; font-weight: 600; color: var(--kb-err); }

  .note-btn { display: flex; align-items: center; justify-content: center; min-height: 34px; padding: 4px 12px; border: 0; border-radius: 10px; background: var(--kb-card); color: var(--kb-text-2); text-align: center; font-family: inherit; font-weight: 500; cursor: pointer; }
  .note-btn:focus-visible, .hist-reopen:focus-visible, .hist-search input:focus-visible { outline: 2px solid var(--kb-accent); outline-offset: 2px; }
  dialog.kb-history { height: min(720px, calc(100vh - 24px)); }
  .kb-history .dlg { min-height: 100%; box-sizing: border-box; }
  .hist-title { margin: 0; font-size: 18px; font-weight: 500; }
  .hist-sub { font-size: 12px; color: var(--kb-text-2); }
  .hist-search { display: flex; align-items: center; height: 44px; padding: 0 14px; border-radius: 14px; }
  .hist-search input { flex: 1; min-width: 0; border: 0; background: transparent; outline: none; font: inherit; font-size: 14px; color: var(--kb-text); }
  .hist-chip { display: inline-flex; align-items: center; gap: 6px; padding-left: 4px; }
  .hist-list { display: flex; flex-direction: column; gap: 14px; }
  .hist-group { display: flex; flex-direction: column; gap: 6px; }
  .hist-group h3 { margin: 0; }
  .hist-rows { list-style: none; margin: 0; padding: 4px 6px 4px 12px; border-radius: var(--kb-tile-radius); display: flex; flex-direction: column; }
  .hist-row { display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 4px 0; }
  .hist-row + .hist-row { border-top: 1px solid var(--kb-border); }
  .hist-check { width: 20px; height: 20px; flex: none; border-radius: 50%; background: var(--kb-ok); color: #fff; display: grid; place-items: center; }
  .hist-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
  .hist-name { font-size: 14px; font-weight: 600; overflow-wrap: anywhere; }
  .hist-meta { font-size: 12px; color: var(--kb-text-2); }
  .hist-reopen { width: 32px; height: 32px; flex: none; border-radius: 10px; border: 0; background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); display: grid; place-items: center; padding: 0; cursor: pointer; }
  .hist-empty { padding: 24px; text-align: center; font-size: 14px; }
  .hist-more { align-self: center; }

  .tiles-view { display: flex; flex-direction: column; gap: 12px; }
  .tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .tile { display: flex; flex-direction: column; align-items: stretch; gap: 8px; padding: 12px; min-height: 44px; text-align: left; border-radius: var(--kb-tile-radius); color: var(--kb-text); }
  .tile.wide { grid-column: 1 / -1; }
  .qchips { display: flex; gap: 8px; }
  .qchip { flex: 1 1 0; min-width: 0; display: flex; align-items: center; gap: 8px; min-height: 48px; padding: 10px 12px; border-radius: var(--kb-tile-radius); color: var(--kb-text); font-size: 13px; font-weight: 600; }
  .qlabel { flex: 1; min-width: 0; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .qcount, .pcount { display: inline-grid; place-items: center; min-width: 22px; height: 20px; padding: 0 6px; border-radius: 10px; font-size: 11px; font-weight: 600; color: var(--kb-text-2); background: var(--kb-card); }
  .tile-label { flex: 1; min-width: 0; font-size: 13px; font-weight: 600; }
  .tile-count { font-size: 28px; font-weight: 700; line-height: 1; font-variant-numeric: tabular-nums; }
  .preview { display: flex; flex-direction: column; gap: 5px; }
  .preview .t { flex: 1; min-width: 0; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .preview .mark { width: 6px; height: 6px; flex: none; border-radius: 50%; background: var(--kb-border); }
  .tiles-h { padding: 2px 2px 0; }
  .plist { display: flex; flex-direction: column; gap: 8px; background: transparent; border: 0; box-shadow: none; }
  .prow { display: flex; align-items: center; gap: 10px; min-height: 52px; padding: 6px 12px 6px 10px; border-radius: var(--kb-tile-radius); text-align: left; font-size: 14px; font-weight: 600; color: var(--kb-text); }
  .pname { flex: 1; min-width: 0; }
  .prow > span[aria-hidden] { color: var(--kb-text-2); padding: 0 4px; }

  dialog.sheet { margin: auto 0 0; padding: 0; width: 100%; max-width: 100%; height: 82vh; height: 82dvh; max-height: 82dvh; overflow: hidden; border: 0; border-radius: 24px 24px 0 0; background: var(--kb-card); box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.2); color: var(--kb-text); animation: kb-slide-up 0.38s cubic-bezier(0.2, 0.8, 0.2, 1); }
  dialog.sheet[open] { display: flex; flex-direction: column; }
  dialog.sheet::backdrop { background: rgba(0, 0, 0, 0.36); }
  @keyframes kb-slide-up { from { transform: translateY(100%); } to { transform: none; } }
  @media (prefers-reduced-motion: reduce) { .sheet { animation: none; } }
  .grabber { display: grid; place-items: center; padding: 8px 0 2px; flex: none; }
  .grabber span { width: 36px; height: 5px; border-radius: 3px; background: var(--kb-border); }
  .sheet-head { display: flex; align-items: center; gap: 10px; padding: 6px 16px 10px; flex: none; }
  .sheet-head h2 { margin: 0; font-size: 16px; font-weight: 600; }
  .sheet-head .count { display: inline-grid; place-items: center; min-width: 22px; height: 20px; padding: 0 6px; border-radius: 10px; font-size: 11px; font-weight: 600; color: var(--kb-text-2); background: var(--kb-fill); margin-right: auto; }
  .sheet-list { display: flex; flex-direction: column; gap: 8px; margin: 0 16px 24px; padding: 8px; border-radius: var(--kb-tile-radius); background: var(--kb-tile-bg); overflow-y: auto; flex: 1; min-height: 0; -webkit-touch-callout: none; user-select: none; }
  .sheet-list > * { flex-shrink: 0; }
  .sheet-list .card { min-height: 44px; }
  .sheet-list .link { min-height: 44px; }
  .sheet-head .sclose { width: 44px; height: 44px; }
  .sheet-list .check { width: 44px; height: 44px; margin: -12px; border: 0; background: transparent; position: relative; }
  .sheet-list .check::before { content: ""; position: absolute; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--kb-border); box-sizing: border-box; }
  .sheet-list .check[aria-pressed="true"]::before { border-color: var(--kb-ok); background: var(--kb-ok); }
  .sheet-list .check svg { position: relative; color: transparent; }
  .sheet-list .check[aria-pressed="true"] svg { color: #fff; }
  .sheet-list .title { min-height: 44px; padding: 10px 0; }
  .sheet-list .row.top { align-items: center; }
  .sheet-list .hist-link { align-self: center; min-height: 44px; }
  .menu-wrap { position: absolute; inset: 0; z-index: 2; display: flex; align-items: flex-end; background: rgba(0, 0, 0, 0.36); border-radius: 24px 24px 0 0; }
  .menu { width: 100%; display: flex; flex-direction: column; gap: 6px; padding: 14px 16px 20px; border-radius: 24px 24px 0 0; background: var(--kb-card); box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.18); }
  .menu-title { display: flex; flex-direction: column; font-size: 12px; color: var(--kb-text-2); padding: 2px 4px 6px; }
  .menu-title small { font-size: 14px; font-weight: 600; color: var(--kb-text); overflow-wrap: anywhere; }
  .menu-btn { min-height: 48px; border-radius: var(--kb-tile-radius); font-size: 14px; font-weight: 600; text-align: left; padding: 0 14px; }
  .menu-btn.muted { background: transparent; border: 0; box-shadow: none; color: var(--kb-text-2); }

  header .gear-btn { flex: none; }
  dialog.kb-settings { width: min(560px, calc(100vw - 24px)); height: min(1040px, calc(100vh - 24px)); overflow: hidden; }
  dialog.kb-settings.narrow { margin: auto 0 0; width: 100%; max-width: 100%; height: 100dvh; max-height: 100dvh; border-radius: 24px 24px 0 0; animation: kb-slide-up 0.38s cubic-bezier(0.2, 0.8, 0.2, 1); }
  @media (prefers-reduced-motion: reduce) { dialog.kb-settings.narrow { animation: none; } }
  .kb-settings .dlg { height: 100%; }
  .kb-settings.narrow .dlg { padding: 18px 16px 20px; }
  .kb-settings .dlg-kicker { display: block; }
  .set-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; padding: 4px; border-radius: 12px; background: var(--kb-seg-track); }
  .set-tabs button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 34px; padding: 0 6px; border-radius: 9px; border: 0; background: transparent; color: var(--kb-text-2); font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; --mdc-icon-size: 15px; }
  .set-tabs button[aria-selected="true"] { background: var(--kb-seg-on); box-shadow: var(--kb-seg-on-shadow); color: var(--kb-seg-on-color); font-weight: 600; }
  .set-body { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 18px; margin: 0 -6px; padding: 2px 6px; }
  .set-body > * { flex-shrink: 0; }
  /* scope = an info alert under the tabs */
  .scope { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; border-radius: 12px; background: color-mix(in srgb, var(--kb-info) var(--kb-tint), transparent); color: var(--kb-info); }
  .scope svg { flex: none; margin-top: 1px; }
  .scope-text { display: block; font-size: 13px; line-height: 1.45; }
  .scope-text b { font-weight: 600; }
  .scope-text b::after { content: ". "; }
  .set-sec { display: flex; flex-direction: column; gap: 8px; }
  .set-sec h3 { margin: 0; }
  .set-rows { display: flex; flex-direction: column; gap: 8px; background: transparent; border: 0; box-shadow: none; }
  .set-row { display: flex; align-items: center; gap: 10px; min-height: 52px; padding: 8px 8px 8px 10px; border-radius: var(--kb-tile-radius); background: var(--kb-tile-bg); border: var(--kb-tile-border); box-shadow: var(--kb-tile-shadow); }
  .set-text { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0; }
  .set-name { font-size: 14px; font-weight: 600; }
  .set-hint { font-size: 12px; color: var(--kb-text-2); }
  .set-hint.pad { padding: 0 2px; margin: 0; }
  .mono { font-family: ui-monospace, "SF Mono", Menlo, monospace; overflow-wrap: anywhere; }
  .set-line { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 12px; min-height: 52px; padding: 8px 8px 8px 14px; border-radius: var(--kb-tile-radius); background: var(--kb-tile-bg); border: var(--kb-tile-border); box-shadow: var(--kb-tile-shadow); font-size: 13px; font-weight: 600; color: var(--kb-text); }
  .set-line .seg { background: var(--kb-card); padding: 3px; }
  .set-line .seg button { height: 30px; padding: 0 10px; white-space: nowrap; }
  .set-line .seg button[aria-checked="true"] { background: var(--kb-fill); box-shadow: none; }
  .kb-settings.narrow .set-line .seg button { padding: 0 8px; }
  .kb-settings.narrow .set-tabs ha-icon { display: none; }
  .led { width: 8px; height: 8px; flex: none; border-radius: 50%; background: var(--kb-text-2); }
  .switch { position: relative; width: 40px; height: 24px; flex: none; padding: 0; border: 0; border-radius: 12px; background: var(--kb-border); }
  .switch::after { content: ""; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25); transition: left 0.15s; }
  .switch[aria-checked="true"] { background: var(--kb-accent); }
  .switch[aria-checked="true"]::after { left: 19px; }
  .switch:disabled { opacity: 0.5; cursor: default; }
  .set-badge { display: inline-flex; align-items: center; height: 22px; padding: 0 8px; border-radius: 11px; background: var(--kb-card); color: var(--kb-text-2); font-size: 11px; font-weight: 600; white-space: nowrap; }
  .icon-btn { width: 32px; height: 32px; flex: none; padding: 0; border: 0; border-radius: 10px; background: transparent; color: var(--kb-text-2); display: grid; place-items: center; }
  .icon-btn:disabled, .add-list:disabled { opacity: 0.45; cursor: default; }
  .add-list { align-self: stretch; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 40px; padding: 0 14px; border-radius: 10px; border: 0; background: var(--kb-fill); color: var(--kb-text); font-size: 13px; font-weight: 600; }
  .sort-keys { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; color: var(--kb-text-2); }
  .sort-key { display: inline-flex; color: var(--kb-text); align-items: center; gap: 6px; height: 32px; padding: 0 12px 0 4px; border-radius: 16px; background: var(--kb-fill); font-size: 13px; font-weight: 600; }
  .sort-n { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; background: var(--kb-card); color: var(--kb-text-2); font-size: 12px; font-weight: 700; }
  .person-chip { display: inline-flex; align-items: center; gap: 6px; padding-left: 4px; }
  .kb-settings .dlg-foot { justify-content: flex-end; }
  .eod-opts { display: flex; flex-direction: column; gap: 4px; padding: 4px; border-radius: var(--kb-tile-radius); background: var(--kb-tile-bg); border: var(--kb-tile-border); box-shadow: var(--kb-tile-shadow); }
  .eod-opt, .check-row { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; color: var(--kb-text); }
  .eod-opt { padding: 8px 10px; border-radius: 11px; border: 0; background: transparent; }
  .eod-opt[aria-checked="true"] { background: var(--kb-seg-on); box-shadow: var(--kb-seg-on-shadow); }
  .eod-opt .radio { order: 3; }
  .radio { width: 22px; height: 22px; flex: none; box-sizing: border-box; border-radius: 50%; border: 1.5px solid var(--kb-border); }
  [aria-checked="true"] > .radio { border: 6px solid var(--kb-accent); }
  .time-in, .text-in { height: 36px; padding: 0 10px; border-radius: 10px; color: var(--kb-text); font: inherit; font-size: 14px; font-weight: 600; color-scheme: light dark; }
  .text-in { border: 0; background: var(--kb-card); box-sizing: border-box; width: 100%; }
  .notify-whom { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 6px; padding: 4px 0 0; }
  .notify-whom > .set-name, .notify-whom > .check-row:nth-child(2) { grid-column: 1 / -1; }
  .check-row { min-height: 52px; padding: 8px 10px; border-radius: 12px; border: 0; background: var(--kb-fill); }
  .check-row[aria-checked="true"] { background: var(--kb-card); box-shadow: 0 0 0 1.5px var(--kb-accent); }
  .check-row > svg { flex: none; color: var(--kb-text-2); }
  .box { width: 22px; height: 22px; flex: none; box-sizing: border-box; border-radius: 50%; display: grid; place-items: center; border: 1.5px solid var(--kb-border); background: transparent; color: transparent; }
  [aria-checked="true"] > .box { border-color: var(--kb-accent); background: var(--kb-accent); color: #fff; }
  .parent-form { display: flex; flex-direction: column; gap: 12px; padding: 14px; border-radius: var(--kb-tile-radius); background: var(--kb-tile-bg); border: var(--kb-tile-border); box-shadow: var(--kb-tile-shadow); }
  .color-chip { width: 28px; height: 28px; padding: 0; border-radius: 50%; border: 2px solid transparent; background: rgb(var(--pc)); }
  .color-chip[aria-checked="true"] { box-shadow: 0 0 0 2px var(--kb-card), 0 0 0 4px rgb(var(--pc)); }
  .form-foot { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .remove-parent { color: var(--kb-err); }
`;
