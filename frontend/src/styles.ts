import { css } from "lit";

// Bento tokens first, standard HA variables as fallback.
export const styles = css`
  :host {
    --kb-card: var(--bento-card, var(--card-background-color, #fff));
    --kb-fill: var(--bento-fill, var(--secondary-background-color, #f0f2f5));
    --kb-border: var(--bento-border, var(--divider-color, #dfe3e8));
    --kb-accent: var(--bento-accent, var(--primary-color, #4f6b8c));
    --kb-warm: var(--bento-warm, var(--kb-fill));
    --kb-warm-text: var(--bento-warm-text, var(--kb-accent));
    --kb-text: var(--bento-text, var(--primary-text-color, #1c2128));
    --kb-text-2: var(--bento-text-2, var(--secondary-text-color, #646c77));
    --kb-shadow: var(--bento-shadow, var(--ha-card-box-shadow, 0 1px 2px rgba(0, 0, 0, 0.08)));
    --kb-raised: var(--bento-raised, var(--kb-card));
    --kb-raised-shadow: var(--bento-raised-shadow, 0 1px 2px rgba(0, 0, 0, 0.1));
    --kb-inset: var(--bento-idle-shadow, inset 0 1px 3px rgba(0, 0, 0, 0.08));
    --c-red: var(--bento-rgb-red, 255, 59, 48);
    --c-orange: var(--bento-rgb-orange, 255, 149, 0);
    --c-yellow: var(--bento-rgb-yellow, 255, 204, 0);
    --c-green: var(--bento-rgb-green, 52, 199, 89);
    --c-teal: var(--bento-rgb-teal, 48, 176, 199);
    --c-cyan: var(--bento-rgb-cyan, 50, 173, 230);
    --c-blue: var(--bento-rgb-blue, 0, 122, 255);
    --c-indigo: var(--bento-rgb-indigo, 88, 86, 214);
    --c-purple: var(--bento-rgb-purple, 175, 82, 222);
    --c-pink: var(--bento-rgb-pink, 255, 45, 85);
    --c-brown: var(--bento-rgb-brown, 162, 132, 94);
    --c-grey: var(--bento-rgb-grey, 142, 142, 147);
    display: block;
    color: var(--kb-text);
  }
  * { box-sizing: border-box; }
  button { font: inherit; cursor: pointer; color: inherit; }
  button:focus-visible { outline: 2px solid var(--kb-accent); outline-offset: 2px; }
  ha-card { padding: 18px; display: flex; flex-direction: column; gap: 14px; }

  .c-red { --pc: var(--c-red); } .c-orange { --pc: var(--c-orange); } .c-yellow { --pc: var(--c-yellow); }
  .c-green { --pc: var(--c-green); } .c-teal { --pc: var(--c-teal); } .c-cyan { --pc: var(--c-cyan); }
  .c-blue { --pc: var(--c-blue); } .c-indigo { --pc: var(--c-indigo); } .c-purple { --pc: var(--c-purple); }
  .c-pink { --pc: var(--c-pink); } .c-brown { --pc: var(--c-brown); } .c-grey { --pc: var(--c-grey); }

  header { display: flex; align-items: center; gap: 12px; }
  header .titles { flex: 1; min-width: 0; }
  /* narrow: title + summary on the first row, the buttons on their own row */
  header.narrow { flex-wrap: wrap; justify-content: flex-end; row-gap: 10px; }
  header.narrow .titles { flex-basis: 100%; }
  h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.4px; }
  .summary { font-size: 13px; color: var(--kb-text-2); }
  .seg { display: flex; gap: 4px; padding: 4px; border-radius: 999px; background: var(--kb-fill); box-shadow: var(--kb-inset); }
  .seg button { height: 32px; padding: 0 14px; border-radius: 999px; border: 1px solid transparent; background: transparent; color: var(--kb-text-2); font-size: 13px; font-weight: 600; }
  .seg button[aria-pressed="true"] { border-color: var(--kb-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); }

  .filters { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; }
  .people, .parents { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; padding: 2px; }
  .parents { flex-wrap: wrap; }
  .person { display: flex; align-items: center; gap: 8px; flex: none; padding: 3px 12px 3px 3px; border-radius: 999px; border: 0; background: transparent; font-size: 13px; font-weight: 600; color: var(--kb-text-2); }
  .person[aria-pressed="true"] { background: var(--kb-warm); color: var(--kb-warm-text); }
  .people.has-filter .person[aria-pressed="false"] { opacity: 0.45; }
  .all-ava { background: var(--kb-raised); color: var(--kb-text-2); box-shadow: var(--kb-raised-shadow); border: 1px solid var(--kb-border); }
  .chip { display: inline-flex; align-items: center; gap: 8px; flex: none; height: 36px; padding: 0 14px 0 4px; border-radius: 999px; font-size: 13px; font-weight: 600; background: var(--kb-raised); color: var(--kb-text-2); border: 1px solid var(--kb-border); box-shadow: var(--kb-raised-shadow); }
  .chip[aria-pressed="true"] { background: var(--kb-warm); color: var(--kb-warm-text); border-color: color-mix(in srgb, var(--kb-accent) 45%, transparent); box-shadow: var(--kb-inset); }
  .chip b { color: var(--kb-text); }
  .dot { width: 28px; height: 28px; flex: none; border-radius: 50%; display: grid; place-items: center; background: rgba(var(--pc, var(--c-grey)), 0.16); color: rgb(var(--pc, var(--c-grey))); --mdc-icon-size: 16px; }
  .dot.sm { width: 22px; height: 22px; --mdc-icon-size: 13px; }
  .ava { width: 24px; height: 24px; flex: none; border-radius: 50%; display: grid; place-items: center; color: #fff; font-size: 10px; font-weight: 700; object-fit: cover; box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.35); }
  .ava.lg { width: 34px; height: 34px; font-size: 13px; }
  .ava.xs { width: 20px; height: 20px; font-size: 9px; }
  .ava.none { background: transparent; border: 1.5px dashed var(--kb-border); color: var(--kb-text-2); box-shadow: none; }

  .board { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(260px, 1fr); gap: 12px; overflow-x: auto; align-items: start; scroll-snap-type: x proximity; scrollbar-width: none; }
  .col { display: flex; flex-direction: column; gap: 10px; padding: 10px; border-radius: 20px; background: var(--kb-fill); box-shadow: var(--kb-inset); min-width: 0; scroll-snap-align: start; }
  .col-head { display: flex; align-items: center; gap: 8px; padding: 4px 6px 2px; }
  .col-head .led { width: 8px; height: 8px; border-radius: 50%; background: var(--kb-text-2); }
  .col-head .label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--kb-text-2); }
  .col-head .count { font-size: 12px; font-weight: 700; color: var(--kb-text-2); background: var(--kb-card); border: 1px solid var(--kb-border); border-radius: 999px; padding: 1px 8px; }
  .note, .empty { font-size: 12px; color: var(--kb-text-2); padding: 4px 6px; }
  .empty { text-align: center; font-size: 13px; padding: 18px 8px; }

  .card { display: flex; flex-direction: column; gap: 8px; padding: 12px; border-radius: 16px; background: var(--kb-card); border: 1px solid var(--kb-border); box-shadow: var(--kb-shadow); }
  .card.done { opacity: 0.7; }
  .row { display: flex; align-items: center; gap: 8px; }
  .row.top { align-items: flex-start; gap: 10px; }
  .parent-name { font-size: 12px; font-weight: 600; color: var(--kb-text-2); flex: 1; min-width: 0; }
  .check { width: 22px; height: 22px; flex: none; padding: 0; margin-top: 1px; border-radius: 50%; display: grid; place-items: center; border: 1.5px solid var(--kb-border); background: var(--kb-card); color: transparent; }
  .check[aria-pressed="true"] { border: 0; background: rgb(var(--c-green)); color: #fff; }
  .title { flex: 1; text-align: left; border: 0; background: transparent; padding: 0; min-width: 0; font-size: 15px; font-weight: 600; letter-spacing: -0.2px; line-height: 1.3; overflow-wrap: anywhere; }
  .done .title { color: var(--kb-text-2); text-decoration: line-through; }
  .pills { display: flex; flex-wrap: wrap; gap: 6px; padding-left: 32px; }
  .pill { display: inline-flex; align-items: center; gap: 4px; height: 22px; padding: 0 8px; border-radius: 999px; font-size: 12px; font-weight: 600; background: rgba(var(--pc, var(--c-grey)), 0.14); color: rgb(var(--pc, var(--c-grey))); --mdc-icon-size: 12px; }
  .pill.prio-3, .pill.later { background: var(--kb-fill); color: var(--kb-text-2); }
  .pill.today { background: var(--kb-warm); color: var(--kb-warm-text); }

  .cl-bar { height: 4px; border-radius: 999px; background: var(--kb-fill); overflow: hidden; }
  .cl-bar span { display: block; height: 100%; background: rgb(var(--c-green)); }
  .cl { display: flex; flex-direction: column; gap: 2px; }
  .cl-row { display: flex; align-items: center; gap: 10px; padding: 5px 4px; border: 0; border-radius: 8px; background: transparent; text-align: left; font-size: 14px; color: var(--kb-text); }
  .cl-row .cl-t { flex: 1; min-width: 0; overflow-wrap: anywhere; }
  .cl-box, .cl-check { width: 18px; height: 18px; flex: none; box-sizing: border-box; border-radius: 6px; display: grid; place-items: center; padding: 0; border: 2px solid var(--kb-border); background: var(--kb-card); color: transparent; }
  .cl-row[aria-checked="true"] .cl-box, .cl-check[aria-checked="true"] { border: 0; background: rgb(var(--c-green)); color: #fff; }
  .cl-row[aria-checked="true"] .cl-t, .cl-item.done .cl-text { color: var(--kb-text-2); text-decoration: line-through; }
  .cl-more { align-self: flex-start; }
  .note { font-size: 13px; line-height: 1.45; color: var(--kb-text-2); overflow-wrap: anywhere; }
  .note.clamp { max-height: calc(var(--clamp, 3) * 1.45em); overflow: hidden; }
  .note.plain { white-space: pre-wrap; }
  .note ha-markdown { display: block; }
  .fmt-btn { border: 1px solid var(--kb-border); background: var(--kb-fill); color: inherit; border-radius: 8px; min-width: 30px; height: 28px; font: inherit; font-size: 13px; cursor: pointer; }
  .seg2 { display: inline-flex; gap: 4px; margin-left: 6px; }
  .cl-alldone { display: flex; align-items: center; gap: 8px; padding: 4px; font-size: 13px; font-weight: 600; color: rgb(var(--c-green)); }
  .cl-alldone span { flex: 1; }
  .cl-box-list { display: flex; flex-direction: column; padding: 4px; border-radius: 16px; background: var(--kb-fill); box-shadow: var(--kb-inset); }
  .cl-item { display: flex; align-items: center; gap: 12px; padding: 6px 6px 6px 10px; border-radius: 12px; }
  .cl-item.first-done { border-top: 1px dashed var(--kb-border); margin-top: 4px; padding-top: 10px; }
  .cl-check { width: 22px; height: 22px; border-radius: 7px; }
  .cl-text { flex: 1; min-width: 0; font-size: 15px; font-weight: 500; overflow-wrap: anywhere; }
  .cl-x { width: 28px; height: 28px; flex: none; border-radius: 50%; border: 0; background: transparent; color: var(--kb-text-2); display: grid; place-items: center; padding: 0; opacity: 0.7; }
  .cl-add { display: flex; align-items: center; gap: 12px; padding: 8px 10px; border-top: 1px solid var(--kb-border); margin-top: 4px; color: var(--kb-accent); font-size: 18px; font-weight: 600; }
  .cl-add input { flex: 1; min-width: 0; border: 0; background: transparent; padding: 4px 0; font-size: 15px; font-weight: 400; color: var(--kb-text); }
  .link { border: 0; background: transparent; padding: 4px 6px; text-align: left; font-size: 13px; font-weight: 600; color: var(--kb-warm-text); display: flex; align-items: center; gap: 4px; }
  .link.muted { color: var(--kb-text-2); }
  .notice { padding: 8px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; background: rgba(var(--c-red), 0.14); color: rgb(var(--c-red)); }
  .loading { padding: 24px; text-align: center; color: var(--kb-text-2); }

  .card[data-uid] { cursor: pointer; touch-action: manipulation; }
  .col-head .add { margin-left: auto; width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--kb-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text-2); font-size: 18px; line-height: 1; padding: 0; }
  .sortable-ghost { opacity: 0.35; }
  .sortable-fallback { opacity: 0.9; }
  header .new { height: 36px; padding: 0 16px; border-radius: 999px; border: 0; background: var(--kb-accent); color: var(--bento-on-accent, #fff); font-size: 14px; font-weight: 700; }

  dialog.kb-dialog { padding: 0; border: 1px solid var(--kb-border); border-radius: 24px; background: var(--kb-card); color: var(--kb-text); box-shadow: 0 10px 40px rgba(20, 30, 45, 0.25); width: min(560px, calc(100vw - 24px)); max-height: calc(100vh - 24px); overflow: auto; }
  dialog.kb-dialog::backdrop { background: rgba(10, 14, 20, 0.45); }
  .dlg { display: flex; flex-direction: column; gap: 16px; padding: 20px; }
  .dlg-head { display: flex; align-items: center; gap: 10px; }
  .dlg-kicker { flex: 1; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--kb-text-2); }
  .dlg-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--kb-text-2); }
  .field { display: flex; flex-direction: column; gap: 8px; }
  .vis-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .dlg input, .dlg textarea { font: inherit; color: inherit; }
  .dlg input:focus-visible, .dlg textarea:focus-visible { outline: 2px solid var(--kb-accent); outline-offset: 2px; }
  .dlg-title { border: 0; background: transparent; padding: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.4px; width: 100%; }
  .dlg textarea { resize: none; border: 1px solid var(--kb-border); border-radius: 14px; background: var(--kb-fill); box-shadow: var(--kb-inset); padding: 10px 12px; font-size: 14px; line-height: 1.4; width: 100%; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
  .dlg-chip { padding-left: 6px; }
  .dlg-chip[aria-checked="true"] { background: var(--kb-warm); color: var(--kb-warm-text); border-color: color-mix(in srgb, var(--kb-accent) 45%, transparent); box-shadow: var(--kb-inset); }
  .seg3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; padding: 4px; border-radius: 16px; background: var(--kb-fill); box-shadow: var(--kb-inset); }
  .seg3 button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 36px; border-radius: 12px; border: 1px solid transparent; background: transparent; color: var(--kb-text-2); font-size: 13px; font-weight: 600; }
  .seg3 button[aria-checked="true"] { border-color: var(--kb-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); }
  .seg3 .prio-1[aria-checked="true"] { color: rgb(var(--c-red)); } .seg3 .prio-2[aria-checked="true"] { color: rgb(var(--c-orange)); }
  .pill-btn { height: 36px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--kb-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); font-size: 13px; font-weight: 600; }
  .pill-btn.on, .pill-btn[aria-pressed="true"] { background: var(--kb-warm); color: var(--kb-warm-text); border-color: color-mix(in srgb, var(--kb-accent) 45%, transparent); box-shadow: var(--kb-inset); }
  .pill-input { display: inline-flex; align-items: center; height: 36px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--kb-border); background: var(--kb-fill); box-shadow: var(--kb-inset); }
  .pill-input input { border: 0; background: transparent; font-size: 13px; font-weight: 600; color-scheme: light dark; }
  .round-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--kb-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text-2); display: grid; place-items: center; padding: 0; }
  .dlg-foot { display: flex; align-items: center; gap: 10px; padding-top: 16px; border-top: 1px solid var(--kb-border); flex-wrap: wrap; }
  .grow { flex: 1; }
  .primary-btn { height: 40px; padding: 0 22px; border-radius: 999px; border: 0; background: var(--kb-accent); color: var(--bento-on-accent, #fff); font-size: 14px; font-weight: 700; }
  .primary-btn:disabled { opacity: 0.45; cursor: default; }
  .danger-link { height: 40px; padding: 0 6px; border: 0; background: transparent; color: rgb(var(--c-red)); font-size: 14px; font-weight: 600; }
  .danger-btn { height: 40px; padding: 0 18px; border-radius: 999px; border: 0; background: rgb(var(--c-red)); color: #fff; font-size: 14px; font-weight: 700; }
  .danger-text { font-size: 14px; font-weight: 600; color: rgb(var(--c-red)); }

  .note-btn { border: 0; background: transparent; text-align: left; font-family: inherit; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
  .note-btn:focus-visible, .hist-reopen:focus-visible, .hist-search input:focus-visible { outline: 2px solid var(--kb-accent); outline-offset: 2px; }
  dialog.kb-history { height: min(720px, calc(100vh - 24px)); }
  .kb-history .dlg { min-height: 100%; box-sizing: border-box; }
  .hist-title { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.4px; }
  .hist-sub { font-size: 13px; color: var(--kb-text-2); }
  .hist-search { display: flex; align-items: center; height: 42px; padding: 0 14px; border-radius: 14px; border: 1px solid var(--kb-border); background: var(--kb-fill); box-shadow: var(--kb-inset); }
  .hist-search input { flex: 1; min-width: 0; border: 0; background: transparent; outline: none; font: inherit; font-size: 14px; color: var(--kb-text); }
  .hist-chip { display: inline-flex; align-items: center; gap: 6px; padding-left: 6px; }
  .hist-list { display: flex; flex-direction: column; gap: 14px; }
  .hist-group { display: flex; flex-direction: column; gap: 6px; }
  .hist-group h3 { margin: 0; padding: 0 4px; }
  .hist-rows { list-style: none; margin: 0; padding: 4px; border-radius: 16px; background: var(--kb-fill); box-shadow: var(--kb-inset); display: flex; flex-direction: column; }
  .hist-row { display: flex; align-items: center; gap: 10px; padding: 8px; }
  .hist-row + .hist-row { border-top: 1px solid var(--kb-border); }
  .hist-check { width: 20px; height: 20px; flex: none; border-radius: 50%; background: rgb(var(--c-green)); color: #fff; display: grid; place-items: center; }
  .hist-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
  .hist-name { font-size: 14px; font-weight: 600; overflow-wrap: anywhere; }
  .hist-meta { font-size: 12px; color: var(--kb-text-2); }
  .hist-reopen { width: 32px; height: 32px; flex: none; border-radius: 50%; border: 0; background: transparent; color: var(--kb-text-2); display: grid; place-items: center; padding: 0; cursor: pointer; }
  .hist-empty { padding: 24px; text-align: center; font-size: 14px; }
  .hist-more { align-self: center; }

  .tiles-view { display: flex; flex-direction: column; gap: 12px; }
  .tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .tile { display: flex; flex-direction: column; align-items: stretch; gap: 8px; padding: 14px; min-height: 44px; text-align: left; border-radius: 20px; border: 1px solid var(--kb-border); background: var(--kb-card); box-shadow: var(--kb-shadow); }
  .tile.wide { grid-column: 1 / -1; }
  .qchips { display: flex; gap: 12px; }
  .qchip { flex: 1 1 0; min-width: 0; display: flex; align-items: center; gap: 10px; height: 52px; padding: 0 16px 0 10px; border-radius: 999px; border: 1px solid var(--kb-border); background: var(--kb-card); box-shadow: var(--kb-shadow); color: var(--kb-text); font-size: 15px; font-weight: 600; }
  .qlabel { flex: 1; min-width: 0; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .qcount { font-size: 17px; font-weight: 700; }
  .tile-label { flex: 1; min-width: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--kb-text-2); }
  .tile-count { font-size: 36px; font-weight: 700; letter-spacing: -1px; line-height: 1; }
  .preview { display: flex; flex-direction: column; gap: 6px; }
  .preview .t { flex: 1; min-width: 0; font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .preview .mark { width: 8px; height: 8px; flex: none; border-radius: 50%; background: var(--kb-accent); }
  .tiles-h { padding: 6px 4px 0; }
  .plist { display: flex; flex-direction: column; border-radius: 20px; background: var(--kb-card); border: 1px solid var(--kb-border); box-shadow: var(--kb-shadow); overflow: hidden; }
  .prow { display: flex; align-items: center; gap: 12px; min-height: 52px; padding: 0 16px; border: 0; background: transparent; text-align: left; font-size: 15px; font-weight: 600; color: var(--kb-text); }
  .prow + .prow { border-top: 1px solid var(--kb-border); }
  .pname { flex: 1; min-width: 0; }
  .pcount { font-size: 14px; color: var(--kb-text-2); }
  .prow > span[aria-hidden] { color: var(--kb-text-2); }

  dialog.sheet { margin: auto 0 0; padding: 0; width: 100%; max-width: 100%; height: 82vh; height: 82dvh; max-height: 82dvh; overflow: hidden; border-width: 1px 0 0; border-style: solid; border-radius: 28px 28px 0 0; background: color-mix(in srgb, var(--kb-fill) 70%, var(--kb-card)); border-color: var(--kb-border); box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.18); color: var(--kb-text); animation: kb-slide-up 0.38s cubic-bezier(0.2, 0.8, 0.2, 1); }
  dialog.sheet[open] { display: flex; flex-direction: column; }
  dialog.sheet::backdrop { background: rgba(10, 14, 20, 0.45); }
  @keyframes kb-slide-up { from { transform: translateY(100%); } to { transform: none; } }
  @media (prefers-reduced-motion: reduce) { .sheet { animation: none; } }
  .grabber { display: grid; place-items: center; padding: 8px 0 2px; flex: none; }
  .grabber span { width: 38px; height: 5px; border-radius: 999px; background: var(--kb-border); }
  .sheet-head { display: flex; align-items: center; gap: 10px; padding: 6px 18px 12px; flex: none; }
  .sheet-head h2 { margin: 0; flex: 1; font-size: 22px; font-weight: 700; letter-spacing: -0.4px; }
  .sheet-head .count { font-size: 13px; font-weight: 700; color: var(--kb-text-2); background: var(--kb-fill); border-radius: 999px; padding: 2px 10px; }
  .sheet-list { display: flex; flex-direction: column; gap: 10px; padding: 0 14px 24px; overflow-y: auto; flex: 1; min-height: 0; -webkit-touch-callout: none; user-select: none; }
  .sheet-list > * { flex-shrink: 0; }
  .sheet-list .card { min-height: 44px; }
  .sheet-list .link { min-height: 44px; }
  .sheet-head .sclose { width: 44px; height: 44px; }
  .sheet-list .check { width: 44px; height: 44px; margin: -11px -11px -11px -11px; border: 0; background: transparent; position: relative; }
  .sheet-list .check::before { content: ""; position: absolute; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--kb-border); background: var(--kb-card); }
  .sheet-list .check[aria-pressed="true"]::before { border: 0; background: rgb(var(--c-green)); }
  .sheet-list .check svg { position: relative; color: transparent; }
  .sheet-list .check[aria-pressed="true"] svg { color: #fff; }
  .sheet-list .title { min-height: 44px; padding: 10px 0; }
  .sheet-list .hist-link { align-self: center; min-height: 44px; }
  .menu-wrap { position: absolute; inset: 0; z-index: 2; display: flex; align-items: flex-end; background: rgba(10, 14, 20, 0.35); border-radius: 28px 28px 0 0; }
  .menu { width: 100%; display: flex; flex-direction: column; gap: 4px; padding: 14px; border-radius: 24px 24px 0 0; background: var(--kb-card); box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.18); }
  .menu-title { display: flex; flex-direction: column; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--kb-text-2); padding: 2px 6px 6px; }
  .menu-title small { font-size: 14px; letter-spacing: 0; text-transform: none; color: var(--kb-text); overflow-wrap: anywhere; }
  .menu-btn { min-height: 48px; border: 0; border-radius: 14px; background: var(--kb-fill); font-size: 15px; font-weight: 600; text-align: left; padding: 0 16px; }
  .menu-btn.muted { background: transparent; color: var(--kb-text-2); }

  header .gear-btn { flex: none; }
  dialog.kb-settings { width: min(600px, calc(100vw - 24px)); height: min(1040px, calc(100vh - 24px)); overflow: hidden; border-radius: 28px; }
  dialog.kb-settings.narrow { margin: auto 0 0; width: 100%; max-width: 100%; height: 100dvh; max-height: 100dvh; border-width: 1px 0 0; border-radius: 28px 28px 0 0; animation: kb-slide-up 0.38s cubic-bezier(0.2, 0.8, 0.2, 1); }
  @media (prefers-reduced-motion: reduce) { dialog.kb-settings.narrow { animation: none; } }
  .kb-settings .dlg { height: 100%; gap: 20px; padding: 22px 24px; }
  .kb-settings.narrow .dlg { gap: 16px; padding: 18px 16px 20px; }
  .kb-settings .dlg-kicker { display: block; }
  .set-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; padding: 4px; border-radius: 999px; background: var(--kb-fill); box-shadow: var(--kb-inset); }
  .set-tabs button { height: 34px; padding: 0 6px; border-radius: 999px; border: 1px solid transparent; background: transparent; color: var(--kb-text-2); font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .set-tabs button[aria-selected="true"] { border-color: var(--kb-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); }
  .set-body { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 22px; margin: 0 -6px; padding: 2px 6px; }
  .set-body > * { flex-shrink: 0; }
  .scope { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 14px; background: var(--kb-warm); color: var(--kb-warm-text); }
  .scope.household { background: rgba(var(--c-orange), 0.14); color: color-mix(in srgb, rgb(var(--c-orange)) 60%, var(--kb-text)); }
  .scope svg { flex: none; }
  .scope-text { display: flex; flex-direction: column; gap: 1px; font-size: 12px; }
  .scope-text b { font-size: 13px; }
  .scope-text span { opacity: 0.85; }
  .set-sec { display: flex; flex-direction: column; gap: 8px; }
  .set-sec h3 { margin: 0; }
  .set-rows { display: flex; flex-direction: column; padding: 4px; border-radius: 16px; background: var(--kb-fill); box-shadow: var(--kb-inset); }
  .set-row { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 12px; }
  .set-text { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0; }
  .set-name { font-size: 14px; font-weight: 600; }
  .set-hint { font-size: 12px; color: var(--kb-text-2); }
  .set-hint.pad { padding: 0 4px; margin: 0; }
  .mono { font-family: ui-monospace, "SF Mono", Menlo, monospace; overflow-wrap: anywhere; }
  .set-line { display: flex; align-items: center; gap: 12px; padding: 4px 4px 0; font-size: 13px; font-weight: 600; color: var(--kb-text-2); }
  .set-line .seg button { height: 30px; padding: 0 12px; white-space: nowrap; }
  .kb-settings.narrow .set-line .seg button { padding: 0 8px; }
  .seg button[aria-checked="true"] { border-color: var(--kb-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); }
  .led { width: 8px; height: 8px; flex: none; border-radius: 50%; background: var(--kb-text-2); }
  .led-week, .led-today { background: var(--kb-accent); }
  .led-done { background: rgb(var(--c-green)); }
  .switch { position: relative; width: 44px; height: 26px; flex: none; padding: 0; border: 0; border-radius: 999px; background: color-mix(in srgb, var(--kb-text-2) 50%, var(--kb-fill)); }
  .switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 22px; height: 22px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25); transition: left 0.15s; }
  .switch[aria-checked="true"] { background: rgb(var(--c-green)); }
  .switch[aria-checked="true"]::after { left: 20px; }
  .switch:disabled { opacity: 0.5; cursor: default; }
  .set-badge { display: inline-flex; align-items: center; height: 24px; padding: 0 10px; border-radius: 999px; background: var(--kb-warm); color: var(--kb-warm-text); font-size: 12px; font-weight: 600; white-space: nowrap; }
  .icon-btn { width: 32px; height: 32px; flex: none; padding: 0; border: 0; border-radius: 50%; background: transparent; color: var(--kb-text-2); display: grid; place-items: center; }
  .icon-btn:disabled, .add-list:disabled { opacity: 0.45; cursor: default; }
  .add-list { align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; height: 36px; padding: 0 14px; border-radius: 999px; border: 1.5px dashed var(--kb-border); background: transparent; color: var(--kb-text-2); font-size: 13px; font-weight: 600; }
  .sort-keys { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; color: var(--kb-text-2); }
  .sort-key { display: inline-flex; color: var(--kb-text); align-items: center; gap: 8px; height: 36px; padding: 0 14px 0 5px; border-radius: 999px; border: 1px solid var(--kb-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); font-size: 13px; font-weight: 600; }
  .sort-n { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: var(--kb-warm); color: var(--kb-warm-text); font-size: 12px; font-weight: 700; }
  .person-chip { display: inline-flex; align-items: center; gap: 8px; padding-left: 4px; }
  .kb-settings .dlg-foot { justify-content: flex-end; }
  .eod-opts { display: flex; flex-direction: column; gap: 8px; }
  .eod-opt, .check-row { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; color: var(--kb-text); }
  .eod-opt { padding: 12px 14px; border-radius: 16px; border: 1px solid var(--kb-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); }
  .eod-opt[aria-checked="true"] { background: var(--kb-warm); border-color: color-mix(in srgb, var(--kb-accent) 45%, transparent); box-shadow: var(--kb-inset); }
  .eod-opt .dot { width: 30px; height: 30px; }
  .radio { width: 20px; height: 20px; flex: none; box-sizing: border-box; border-radius: 50%; border: 2px solid color-mix(in srgb, var(--kb-text-2) 50%, var(--kb-fill)); display: grid; place-items: center; }
  [aria-checked="true"] > .radio { border-color: var(--kb-accent); }
  [aria-checked="true"] > .radio::after { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--kb-accent); }
  .time-in, .text-in { height: 36px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--kb-border); background: var(--kb-card); color: var(--kb-text); font: inherit; font-size: 14px; font-weight: 600; color-scheme: light dark; }
  .text-in { border-radius: 12px; box-sizing: border-box; width: 100%; }
  .notify-whom { display: flex; flex-direction: column; gap: 8px; padding: 8px 12px 12px; }
  .check-row { padding: 10px 12px; border-radius: 12px; border: 1px solid var(--kb-border); background: var(--kb-card); }
  .check-row > svg { flex: none; color: var(--kb-text-2); }
  .box { width: 20px; height: 20px; flex: none; box-sizing: border-box; border-radius: 6px; display: grid; place-items: center; border: 2px solid color-mix(in srgb, var(--kb-text-2) 50%, var(--kb-fill)); background: var(--kb-card); color: transparent; }
  [aria-checked="true"] > .box { border: 0; background: var(--kb-accent); color: var(--bento-on-accent, #fff); }
  .parent-form { display: flex; flex-direction: column; gap: 12px; margin: 4px; padding: 14px; border-radius: 14px; border: 1px solid var(--kb-border); background: var(--kb-card); }
  .color-chip { width: 28px; height: 28px; padding: 0; border-radius: 50%; border: 2px solid transparent; background: rgb(var(--pc)); }
  .color-chip[aria-checked="true"] { box-shadow: 0 0 0 2px var(--kb-card), 0 0 0 4px rgb(var(--pc)); }
  .form-foot { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .remove-parent { color: rgb(var(--c-red)); }
`;
