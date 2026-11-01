/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, Xt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, qt = Symbol(), rn = /* @__PURE__ */ new WeakMap();
let Cn = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== qt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Xt && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = rn.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && rn.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const tr = (n) => new Cn(typeof n == "string" ? n : n + "", void 0, qt), nr = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((r, o, i) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[i + 1], n[0]);
  return new Cn(t, n, qt);
}, rr = (n, e) => {
  if (Xt) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), o = st.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = t.cssText, n.appendChild(r);
  }
}, on = Xt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return tr(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: or, defineProperty: ir, getOwnPropertyDescriptor: ar, getOwnPropertyNames: sr, getOwnPropertySymbols: lr, getPrototypeOf: dr } = Object, ce = globalThis, an = ce.trustedTypes, cr = an ? an.emptyScript : "", Et = ce.reactiveElementPolyfillSupport, He = (n, e) => n, Lt = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? cr : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, Tn = (n, e) => !or(n, e), sn = { attribute: !0, type: String, converter: Lt, reflect: !1, useDefault: !1, hasChanged: Tn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ce.litPropertyMetadata ?? (ce.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let $e = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = sn) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), o = this.getPropertyDescriptor(e, r, t);
      o !== void 0 && ir(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: o, set: i } = ar(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: o, set(a) {
      const s = o == null ? void 0 : o.call(this);
      i == null || i.call(this, a), this.requestUpdate(e, s, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? sn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(He("elementProperties"))) return;
    const e = dr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(He("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(He("properties"))) {
      const t = this.properties, r = [...sr(t), ...lr(t)];
      for (const o of r) this.createProperty(o, t[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, o] of t) this.elementProperties.set(r, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const o = this._$Eu(t, r);
      o !== void 0 && this._$Eh.set(o, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const o of r) t.unshift(on(o));
    } else e !== void 0 && t.push(on(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return rr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostConnected) == null ? void 0 : r.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostDisconnected) == null ? void 0 : r.call(t);
    });
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    var i;
    const r = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, r);
    if (o !== void 0 && r.reflect === !0) {
      const a = (((i = r.converter) == null ? void 0 : i.toAttribute) !== void 0 ? r.converter : Lt).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, a;
    const r = this.constructor, o = r._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const s = r.getPropertyOptions(o), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((i = s.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? s.converter : Lt;
      this._$Em = o;
      const d = l.fromAttribute(t, s.type);
      this[o] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, o = !1, i) {
    var a;
    if (e !== void 0) {
      const s = this.constructor;
      if (o === !1 && (i = this[e]), r ?? (r = s.getPropertyOptions(e)), !((r.hasChanged ?? Tn)(i, t) || r.useDefault && r.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(s._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: o, wrapped: i }, a) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), i !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [i, a] of this._$Ep) this[i] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [i, a] of o) {
        const { wrapped: s } = a, l = this[i];
        s !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, a, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this._$EO) == null || r.forEach((o) => {
        var i;
        return (i = o.hostUpdate) == null ? void 0 : i.call(o);
      }), this.update(t)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var o;
      return (o = r.hostUpdated) == null ? void 0 : o.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
$e.elementStyles = [], $e.shadowRootOptions = { mode: "open" }, $e[He("elementProperties")] = /* @__PURE__ */ new Map(), $e[He("finalized")] = /* @__PURE__ */ new Map(), Et == null || Et({ ReactiveElement: $e }), (ce.reactiveElementVersions ?? (ce.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = globalThis, ln = (n) => n, ft = Le.trustedTypes, dn = ft ? ft.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, On = "$lit$", ie = `lit$${Math.random().toFixed(9).slice(2)}$`, Pn = "?" + ie, ur = `<${Pn}>`, ye = document, qe = () => ye.createComment(""), Ge = (n) => n === null || typeof n != "object" && typeof n != "function", Gt = Array.isArray, pr = (n) => Gt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", St = `[ 	
\f\r]`, Ie = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, cn = /-->/g, un = />/g, fe = RegExp(`>|${St}(?:([^\\s"'>=/]+)(${St}*=${St}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pn = /'/g, hn = /"/g, Nn = /^(?:script|style|textarea|title)$/i, hr = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), y = hr(1), De = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), fn = /* @__PURE__ */ new WeakMap(), ve = ye.createTreeWalker(ye, 129);
function Mn(n, e) {
  if (!Gt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dn !== void 0 ? dn.createHTML(e) : e;
}
const fr = (n, e) => {
  const t = n.length - 1, r = [];
  let o, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Ie;
  for (let s = 0; s < t; s++) {
    const l = n[s];
    let d, p, c = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, p = a.exec(l), p !== null); ) f = a.lastIndex, a === Ie ? p[1] === "!--" ? a = cn : p[1] !== void 0 ? a = un : p[2] !== void 0 ? (Nn.test(p[2]) && (o = RegExp("</" + p[2], "g")), a = fe) : p[3] !== void 0 && (a = fe) : a === fe ? p[0] === ">" ? (a = o ?? Ie, c = -1) : p[1] === void 0 ? c = -2 : (c = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? fe : p[3] === '"' ? hn : pn) : a === hn || a === pn ? a = fe : a === cn || a === un ? a = Ie : (a = fe, o = void 0);
    const _ = a === fe && n[s + 1].startsWith("/>") ? " " : "";
    i += a === Ie ? l + ur : c >= 0 ? (r.push(d), l.slice(0, c) + On + l.slice(c) + ie + _) : l + ie + (c === -2 ? s : _);
  }
  return [Mn(n, i + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Ve {
  constructor({ strings: e, _$litType$: t }, r) {
    let o;
    this.parts = [];
    let i = 0, a = 0;
    const s = e.length - 1, l = this.parts, [d, p] = fr(e, t);
    if (this.el = Ve.createElement(d, r), ve.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = ve.nextNode()) !== null && l.length < s; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(On)) {
          const f = p[a++], _ = o.getAttribute(c).split(ie), v = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: i, name: v[2], strings: _, ctor: v[1] === "." ? br : v[1] === "?" ? mr : v[1] === "@" ? vr : xt }), o.removeAttribute(c);
        } else c.startsWith(ie) && (l.push({ type: 6, index: i }), o.removeAttribute(c));
        if (Nn.test(o.tagName)) {
          const c = o.textContent.split(ie), f = c.length - 1;
          if (f > 0) {
            o.textContent = ft ? ft.emptyScript : "";
            for (let _ = 0; _ < f; _++) o.append(c[_], qe()), ve.nextNode(), l.push({ type: 2, index: ++i });
            o.append(c[f], qe());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Pn) l.push({ type: 2, index: i });
      else {
        let c = -1;
        for (; (c = o.data.indexOf(ie, c + 1)) !== -1; ) l.push({ type: 7, index: i }), c += ie.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const r = ye.createElement("template");
    return r.innerHTML = e, r;
  }
}
function Ae(n, e, t = n, r) {
  var a, s;
  if (e === De) return e;
  let o = r !== void 0 ? (a = t._$Co) == null ? void 0 : a[r] : t._$Cl;
  const i = Ge(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== i && ((s = o == null ? void 0 : o._$AO) == null || s.call(o, !1), i === void 0 ? o = void 0 : (o = new i(n), o._$AT(n, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = o : t._$Cl = o), o !== void 0 && (e = Ae(n, o._$AS(n, e.values), o, r)), e;
}
class gr {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: r } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? ye).importNode(t, !0);
    ve.currentNode = o;
    let i = ve.nextNode(), a = 0, s = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new Ke(i, i.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (d = new _r(i, this, e)), this._$AV.push(d), l = r[++s];
      }
      a !== (l == null ? void 0 : l.index) && (i = ve.nextNode(), a++);
    }
    return ve.currentNode = ye, o;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class Ke {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, o) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Ae(this, e, t), Ge(e) ? e === $ || e == null || e === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : e !== this._$AH && e !== De && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : pr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== $ && Ge(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ye.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: t, _$litType$: r } = e, o = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Ve.createElement(Mn(r.h, r.h[0]), this.options)), r);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === o) this._$AH.p(t);
    else {
      const a = new gr(o, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = fn.get(e.strings);
    return t === void 0 && fn.set(e.strings, t = new Ve(e)), t;
  }
  k(e) {
    Gt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, o = 0;
    for (const i of e) o === t.length ? t.push(r = new Ke(this.O(qe()), this.O(qe()), this, this.options)) : r = t[o], r._$AI(i), o++;
    o < t.length && (this._$AR(r && r._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = ln(e).nextSibling;
      ln(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class xt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, o, i) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = i, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = $;
  }
  _$AI(e, t = this, r, o) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) e = Ae(this, e, t, 0), a = !Ge(e) || e !== this._$AH && e !== De, a && (this._$AH = e);
    else {
      const s = e;
      let l, d;
      for (e = i[0], l = 0; l < i.length - 1; l++) d = Ae(this, s[r + l], t, l), d === De && (d = this._$AH[l]), a || (a = !Ge(d) || d !== this._$AH[l]), d === $ ? e = $ : e !== $ && (e += (d ?? "") + i[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class br extends xt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === $ ? void 0 : e;
  }
}
class mr extends xt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== $);
  }
}
class vr extends xt {
  constructor(e, t, r, o, i) {
    super(e, t, r, o, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Ae(this, e, t, 0) ?? $) === De) return;
    const r = this._$AH, o = e === $ && r !== $ || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, i = e !== $ && (r === $ || o);
    o && this.element.removeEventListener(this.name, this, r), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class _r {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ae(this, e);
  }
}
const Dt = Le.litHtmlPolyfillSupport;
Dt == null || Dt(Ve, Ke), (Le.litHtmlVersions ?? (Le.litHtmlVersions = [])).push("3.3.3");
const yr = (n, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = r._$litPart$;
  if (o === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = o = new Ke(e.insertBefore(qe(), i), i, void 0, t ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = globalThis;
class Ue extends $e {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = yr(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return De;
  }
}
var An;
Ue._$litElement$ = !0, Ue.finalized = !0, (An = _e.litElementHydrateSupport) == null || An.call(_e, { LitElement: Ue });
const At = _e.litElementPolyfillSupport;
At == null || At({ LitElement: Ue });
(_e.litElementVersions ?? (_e.litElementVersions = [])).push("4.2.2");
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function gn(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function V(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? gn(Object(t), !0).forEach(function(r) {
      wr(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : gn(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function lt(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? lt = function(e) {
    return typeof e;
  } : lt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, lt(n);
}
function wr(n, e, t) {
  return e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function Q() {
  return Q = Object.assign || function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, Q.apply(this, arguments);
}
function xr(n, e) {
  if (n == null) return {};
  var t = {}, r = Object.keys(n), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(e.indexOf(o) >= 0) && (t[o] = n[o]);
  return t;
}
function $r(n, e) {
  if (n == null) return {};
  var t = xr(n, e), r, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n);
    for (o = 0; o < i.length; o++)
      r = i[o], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(n, r) && (t[r] = n[r]);
  }
  return t;
}
var kr = "1.15.6";
function K(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var te = K(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Je = K(/Edge/i), bn = K(/firefox/i), Be = K(/safari/i) && !K(/chrome/i) && !K(/android/i), Vt = K(/iP(ad|od|hone)/i), In = K(/chrome/i) && K(/android/i), zn = {
  capture: !1,
  passive: !1
};
function x(n, e, t) {
  n.addEventListener(e, t, !te && zn);
}
function w(n, e, t) {
  n.removeEventListener(e, t, !te && zn);
}
function gt(n, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), n)
      try {
        if (n.matches)
          return n.matches(e);
        if (n.msMatchesSelector)
          return n.msMatchesSelector(e);
        if (n.webkitMatchesSelector)
          return n.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function Rn(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function X(n, e, t, r) {
  if (n) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? n.parentNode === t && gt(n, e) : gt(n, e)) || r && n === t)
        return n;
      if (n === t) break;
    } while (n = Rn(n));
  }
  return null;
}
var mn = /\s+/g;
function U(n, e, t) {
  if (n && e)
    if (n.classList)
      n.classList[t ? "add" : "remove"](e);
    else {
      var r = (" " + n.className + " ").replace(mn, " ").replace(" " + e + " ", " ");
      n.className = (r + (t ? " " + e : "")).replace(mn, " ");
    }
}
function g(n, e, t) {
  var r = n && n.style;
  if (r) {
    if (t === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? t = document.defaultView.getComputedStyle(n, "") : n.currentStyle && (t = n.currentStyle), e === void 0 ? t : t[e];
    !(e in r) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), r[e] = t + (typeof t == "string" ? "" : "px");
  }
}
function Se(n, e) {
  var t = "";
  if (typeof n == "string")
    t = n;
  else
    do {
      var r = g(n, "transform");
      r && r !== "none" && (t = r + " " + t);
    } while (!e && (n = n.parentNode));
  var o = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return o && new o(t);
}
function Fn(n, e, t) {
  if (n) {
    var r = n.getElementsByTagName(e), o = 0, i = r.length;
    if (t)
      for (; o < i; o++)
        t(r[o], o);
    return r;
  }
  return [];
}
function G() {
  var n = document.scrollingElement;
  return n || document.documentElement;
}
function T(n, e, t, r, o) {
  if (!(!n.getBoundingClientRect && n !== window)) {
    var i, a, s, l, d, p, c;
    if (n !== window && n.parentNode && n !== G() ? (i = n.getBoundingClientRect(), a = i.top, s = i.left, l = i.bottom, d = i.right, p = i.height, c = i.width) : (a = 0, s = 0, l = window.innerHeight, d = window.innerWidth, p = window.innerHeight, c = window.innerWidth), (e || t) && n !== window && (o = o || n.parentNode, !te))
      do
        if (o && o.getBoundingClientRect && (g(o, "transform") !== "none" || t && g(o, "position") !== "static")) {
          var f = o.getBoundingClientRect();
          a -= f.top + parseInt(g(o, "border-top-width")), s -= f.left + parseInt(g(o, "border-left-width")), l = a + i.height, d = s + i.width;
          break;
        }
      while (o = o.parentNode);
    if (r && n !== window) {
      var _ = Se(o || n), v = _ && _.a, h = _ && _.d;
      _ && (a /= h, s /= v, c /= v, p /= h, l = a + p, d = s + c);
    }
    return {
      top: a,
      left: s,
      bottom: l,
      right: d,
      width: c,
      height: p
    };
  }
}
function vn(n, e, t) {
  for (var r = se(n, !0), o = T(n)[e]; r; ) {
    var i = T(r)[t], a = void 0;
    if (a = o >= i, !a) return r;
    if (r === G()) break;
    r = se(r, !1);
  }
  return !1;
}
function Ce(n, e, t, r) {
  for (var o = 0, i = 0, a = n.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== b.ghost && (r || a[i] !== b.dragged) && X(a[i], t.draggable, n, !1)) {
      if (o === e)
        return a[i];
      o++;
    }
    i++;
  }
  return null;
}
function Zt(n, e) {
  for (var t = n.lastElementChild; t && (t === b.ghost || g(t, "display") === "none" || e && !gt(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function Y(n, e) {
  var t = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== b.clone && (!e || gt(n, e)) && t++;
  return t;
}
function _n(n) {
  var e = 0, t = 0, r = G();
  if (n)
    do {
      var o = Se(n), i = o.a, a = o.d;
      e += n.scrollLeft * i, t += n.scrollTop * a;
    } while (n !== r && (n = n.parentNode));
  return [e, t];
}
function Er(n, e) {
  for (var t in n)
    if (n.hasOwnProperty(t)) {
      for (var r in e)
        if (e.hasOwnProperty(r) && e[r] === n[t][r]) return Number(t);
    }
  return -1;
}
function se(n, e) {
  if (!n || !n.getBoundingClientRect) return G();
  var t = n, r = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var o = g(t);
      if (t.clientWidth < t.scrollWidth && (o.overflowX == "auto" || o.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (o.overflowY == "auto" || o.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return G();
        if (r || e) return t;
        r = !0;
      }
    }
  while (t = t.parentNode);
  return G();
}
function Sr(n, e) {
  if (n && e)
    for (var t in e)
      e.hasOwnProperty(t) && (n[t] = e[t]);
  return n;
}
function Ct(n, e) {
  return Math.round(n.top) === Math.round(e.top) && Math.round(n.left) === Math.round(e.left) && Math.round(n.height) === Math.round(e.height) && Math.round(n.width) === Math.round(e.width);
}
var je;
function Hn(n, e) {
  return function() {
    if (!je) {
      var t = arguments, r = this;
      t.length === 1 ? n.call(r, t[0]) : n.apply(r, t), je = setTimeout(function() {
        je = void 0;
      }, e);
    }
  };
}
function Dr() {
  clearTimeout(je), je = void 0;
}
function Ln(n, e, t) {
  n.scrollLeft += e, n.scrollTop += t;
}
function Un(n) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(n).cloneNode(!0) : t ? t(n).clone(!0)[0] : n.cloneNode(!0);
}
function Bn(n, e, t) {
  var r = {};
  return Array.from(n.children).forEach(function(o) {
    var i, a, s, l;
    if (!(!X(o, e.draggable, n, !1) || o.animated || o === t)) {
      var d = T(o);
      r.left = Math.min((i = r.left) !== null && i !== void 0 ? i : 1 / 0, d.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, d.top), r.right = Math.max((s = r.right) !== null && s !== void 0 ? s : -1 / 0, d.right), r.bottom = Math.max((l = r.bottom) !== null && l !== void 0 ? l : -1 / 0, d.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var H = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ar() {
  var n = [], e;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(o) {
          if (!(g(o, "display") === "none" || o === b.ghost)) {
            n.push({
              target: o,
              rect: T(o)
            });
            var i = V({}, n[n.length - 1].rect);
            if (o.thisAnimationDuration) {
              var a = Se(o, !0);
              a && (i.top -= a.f, i.left -= a.e);
            }
            o.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function(r) {
      n.push(r);
    },
    removeAnimationState: function(r) {
      n.splice(Er(n, {
        target: r
      }), 1);
    },
    animateAll: function(r) {
      var o = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof r == "function" && r();
        return;
      }
      var i = !1, a = 0;
      n.forEach(function(s) {
        var l = 0, d = s.target, p = d.fromRect, c = T(d), f = d.prevFromRect, _ = d.prevToRect, v = s.rect, h = Se(d, !0);
        h && (c.top -= h.f, c.left -= h.e), d.toRect = c, d.thisAnimationDuration && Ct(f, c) && !Ct(p, c) && // Make sure animatingRect is on line between toRect & fromRect
        (v.top - c.top) / (v.left - c.left) === (p.top - c.top) / (p.left - c.left) && (l = Tr(v, f, _, o.options)), Ct(c, p) || (d.prevFromRect = p, d.prevToRect = c, l || (l = o.options.animation), o.animate(d, v, c, l)), l && (i = !0, a = Math.max(a, l), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, l), d.thisAnimationDuration = l);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), n = [];
    },
    animate: function(r, o, i, a) {
      if (a) {
        g(r, "transition", ""), g(r, "transform", "");
        var s = Se(this.el), l = s && s.a, d = s && s.d, p = (o.left - i.left) / (l || 1), c = (o.top - i.top) / (d || 1);
        r.animatingX = !!p, r.animatingY = !!c, g(r, "transform", "translate3d(" + p + "px," + c + "px,0)"), this.forRepaintDummy = Cr(r), g(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), g(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          g(r, "transition", ""), g(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Cr(n) {
  return n.offsetWidth;
}
function Tr(n, e, t, r) {
  return Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * r.animation;
}
var we = [], Tt = {
  initializeByDefault: !0
}, Qe = {
  mount: function(e) {
    for (var t in Tt)
      Tt.hasOwnProperty(t) && !(t in e) && (e[t] = Tt[t]);
    we.forEach(function(r) {
      if (r.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), we.push(e);
  },
  pluginEvent: function(e, t, r) {
    var o = this;
    this.eventCanceled = !1, r.cancel = function() {
      o.eventCanceled = !0;
    };
    var i = e + "Global";
    we.forEach(function(a) {
      t[a.pluginName] && (t[a.pluginName][i] && t[a.pluginName][i](V({
        sortable: t
      }, r)), t.options[a.pluginName] && t[a.pluginName][e] && t[a.pluginName][e](V({
        sortable: t
      }, r)));
    });
  },
  initializePlugins: function(e, t, r, o) {
    we.forEach(function(s) {
      var l = s.pluginName;
      if (!(!e.options[l] && !s.initializeByDefault)) {
        var d = new s(e, t, e.options);
        d.sortable = e, d.options = e.options, e[l] = d, Q(r, d.defaults);
      }
    });
    for (var i in e.options)
      if (e.options.hasOwnProperty(i)) {
        var a = this.modifyOption(e, i, e.options[i]);
        typeof a < "u" && (e.options[i] = a);
      }
  },
  getEventProperties: function(e, t) {
    var r = {};
    return we.forEach(function(o) {
      typeof o.eventProperties == "function" && Q(r, o.eventProperties.call(t[o.pluginName], e));
    }), r;
  },
  modifyOption: function(e, t, r) {
    var o;
    return we.forEach(function(i) {
      e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (o = i.optionListeners[t].call(e[i.pluginName], r));
    }), o;
  }
};
function Or(n) {
  var e = n.sortable, t = n.rootEl, r = n.name, o = n.targetEl, i = n.cloneEl, a = n.toEl, s = n.fromEl, l = n.oldIndex, d = n.newIndex, p = n.oldDraggableIndex, c = n.newDraggableIndex, f = n.originalEvent, _ = n.putSortable, v = n.extraEventProperties;
  if (e = e || t && t[H], !!e) {
    var h, E = e.options, N = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !te && !Je ? h = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = a || t, h.from = s || t, h.item = o || t, h.clone = i, h.oldIndex = l, h.newIndex = d, h.oldDraggableIndex = p, h.newDraggableIndex = c, h.originalEvent = f, h.pullMode = _ ? _.lastPutMode : void 0;
    var O = V(V({}, v), Qe.getEventProperties(r, e));
    for (var R in O)
      h[R] = O[R];
    t && t.dispatchEvent(h), E[N] && E[N].call(e, h);
  }
}
var Pr = ["evt"], F = function(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = r.evt, i = $r(r, Pr);
  Qe.pluginEvent.bind(b)(e, t, V({
    dragEl: u,
    parentEl: A,
    ghostEl: m,
    rootEl: S,
    nextEl: me,
    lastDownEl: dt,
    cloneEl: D,
    cloneHidden: ae,
    dragStarted: ze,
    putSortable: P,
    activeSortable: b.active,
    originalEvent: o,
    oldIndex: Ee,
    oldDraggableIndex: Ye,
    newIndex: B,
    newDraggableIndex: oe,
    hideGhostForTarget: Xn,
    unhideGhostForTarget: qn,
    cloneNowHidden: function() {
      ae = !0;
    },
    cloneNowShown: function() {
      ae = !1;
    },
    dispatchSortableEvent: function(s) {
      z({
        sortable: t,
        name: s,
        originalEvent: o
      });
    }
  }, i));
};
function z(n) {
  Or(V({
    putSortable: P,
    cloneEl: D,
    targetEl: u,
    rootEl: S,
    oldIndex: Ee,
    oldDraggableIndex: Ye,
    newIndex: B,
    newDraggableIndex: oe
  }, n));
}
var u, A, m, S, me, dt, D, ae, Ee, B, Ye, oe, nt, P, ke = !1, bt = !1, mt = [], ge, W, Ot, Pt, yn, wn, ze, xe, We, Xe = !1, rt = !1, ct, M, Nt = [], Ut = !1, vt = [], $t = typeof document < "u", ot = Vt, xn = Je || te ? "cssFloat" : "float", Nr = $t && !In && !Vt && "draggable" in document.createElement("div"), jn = (function() {
  if ($t) {
    if (te)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
})(), Yn = function(e, t) {
  var r = g(e), o = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), i = Ce(e, 0, t), a = Ce(e, 1, t), s = i && g(i), l = a && g(a), d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + T(i).width, p = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + T(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return i && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || d >= o && r[xn] === "none" || a && r[xn] === "none" && d + p > o) ? "vertical" : "horizontal";
}, Mr = function(e, t, r) {
  var o = r ? e.left : e.top, i = r ? e.right : e.bottom, a = r ? e.width : e.height, s = r ? t.left : t.top, l = r ? t.right : t.bottom, d = r ? t.width : t.height;
  return o === s || i === l || o + a / 2 === s + d / 2;
}, Ir = function(e, t) {
  var r;
  return mt.some(function(o) {
    var i = o[H].options.emptyInsertThreshold;
    if (!(!i || Zt(o))) {
      var a = T(o), s = e >= a.left - i && e <= a.right + i, l = t >= a.top - i && t <= a.bottom + i;
      if (s && l)
        return r = o;
    }
  }), r;
}, Wn = function(e) {
  function t(i, a) {
    return function(s, l, d, p) {
      var c = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
      if (i == null && (a || c))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return t(i(s, l, d, p), a)(s, l, d, p);
      var f = (a ? s : l).options.group.name;
      return i === !0 || typeof i == "string" && i === f || i.join && i.indexOf(f) > -1;
    };
  }
  var r = {}, o = e.group;
  (!o || lt(o) != "object") && (o = {
    name: o
  }), r.name = o.name, r.checkPull = t(o.pull, !0), r.checkPut = t(o.put), r.revertClone = o.revertClone, e.group = r;
}, Xn = function() {
  !jn && m && g(m, "display", "none");
}, qn = function() {
  !jn && m && g(m, "display", "");
};
$t && !In && document.addEventListener("click", function(n) {
  if (bt)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), bt = !1, !1;
}, !0);
var be = function(e) {
  if (u) {
    e = e.touches ? e.touches[0] : e;
    var t = Ir(e.clientX, e.clientY);
    if (t) {
      var r = {};
      for (var o in e)
        e.hasOwnProperty(o) && (r[o] = e[o]);
      r.target = r.rootEl = t, r.preventDefault = void 0, r.stopPropagation = void 0, t[H]._onDragOver(r);
    }
  }
}, zr = function(e) {
  u && u.parentNode[H]._isOutsideThisEl(e.target);
};
function b(n, e) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = e = Q({}, e), n[H] = this;
  var t = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(n.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return Yn(n, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(a, s) {
      a.setData("Text", s.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: b.supportPointer !== !1 && "PointerEvent" in window && (!Be || Vt),
    emptyInsertThreshold: 5
  };
  Qe.initializePlugins(this, n, t);
  for (var r in t)
    !(r in e) && (e[r] = t[r]);
  Wn(e);
  for (var o in this)
    o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Nr, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? x(n, "pointerdown", this._onTapStart) : (x(n, "mousedown", this._onTapStart), x(n, "touchstart", this._onTapStart)), this.nativeDraggable && (x(n, "dragover", this), x(n, "dragenter", this)), mt.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), Q(this, Ar());
}
b.prototype = /** @lends Sortable.prototype */
{
  constructor: b,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (xe = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, u) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, r = this.el, o = this.options, i = o.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, d = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, p = o.filter;
      if (Yr(r), !u && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || o.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Be && l && l.tagName.toUpperCase() === "SELECT") && (l = X(l, o.draggable, r, !1), !(l && l.animated) && dt !== l)) {
        if (Ee = Y(l), Ye = Y(l, o.draggable), typeof p == "function") {
          if (p.call(this, e, l, this)) {
            z({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: l,
              toEl: r,
              fromEl: r
            }), F("filter", t, {
              evt: e
            }), i && e.preventDefault();
            return;
          }
        } else if (p && (p = p.split(",").some(function(c) {
          if (c = X(d, c.trim(), r, !1), c)
            return z({
              sortable: t,
              rootEl: c,
              name: "filter",
              targetEl: l,
              fromEl: r,
              toEl: r
            }), F("filter", t, {
              evt: e
            }), !0;
        }), p)) {
          i && e.preventDefault();
          return;
        }
        o.handle && !X(d, o.handle, r, !1) || this._prepareDragStart(e, s, l);
      }
    }
  },
  _prepareDragStart: function(e, t, r) {
    var o = this, i = o.el, a = o.options, s = i.ownerDocument, l;
    if (r && !u && r.parentNode === i) {
      var d = T(r);
      if (S = i, u = r, A = u.parentNode, me = u.nextSibling, dt = r, nt = a.group, b.dragged = u, ge = {
        target: u,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, yn = ge.clientX - d.left, wn = ge.clientY - d.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, u.style["will-change"] = "all", l = function() {
        if (F("delayEnded", o, {
          evt: e
        }), b.eventCanceled) {
          o._onDrop();
          return;
        }
        o._disableDelayedDragEvents(), !bn && o.nativeDraggable && (u.draggable = !0), o._triggerDragStart(e, t), z({
          sortable: o,
          name: "choose",
          originalEvent: e
        }), U(u, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(p) {
        Fn(u, p.trim(), Mt);
      }), x(s, "dragover", be), x(s, "mousemove", be), x(s, "touchmove", be), a.supportPointer ? (x(s, "pointerup", o._onDrop), !this.nativeDraggable && x(s, "pointercancel", o._onDrop)) : (x(s, "mouseup", o._onDrop), x(s, "touchend", o._onDrop), x(s, "touchcancel", o._onDrop)), bn && this.nativeDraggable && (this.options.touchStartThreshold = 4, u.draggable = !0), F("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(Je || te))) {
        if (b.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (x(s, "pointerup", o._disableDelayedDrag), x(s, "pointercancel", o._disableDelayedDrag)) : (x(s, "mouseup", o._disableDelayedDrag), x(s, "touchend", o._disableDelayedDrag), x(s, "touchcancel", o._disableDelayedDrag)), x(s, "mousemove", o._delayedDragTouchMoveHandler), x(s, "touchmove", o._delayedDragTouchMoveHandler), a.supportPointer && x(s, "pointermove", o._delayedDragTouchMoveHandler), o._dragStartTimer = setTimeout(l, a.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    u && Mt(u), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    w(e, "mouseup", this._disableDelayedDrag), w(e, "touchend", this._disableDelayedDrag), w(e, "touchcancel", this._disableDelayedDrag), w(e, "pointerup", this._disableDelayedDrag), w(e, "pointercancel", this._disableDelayedDrag), w(e, "mousemove", this._delayedDragTouchMoveHandler), w(e, "touchmove", this._delayedDragTouchMoveHandler), w(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? x(document, "pointermove", this._onTouchMove) : t ? x(document, "touchmove", this._onTouchMove) : x(document, "mousemove", this._onTouchMove) : (x(u, "dragend", this), x(S, "dragstart", this._onDragStart));
    try {
      document.selection ? ut(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (ke = !1, S && u) {
      F("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && x(document, "dragover", zr);
      var r = this.options;
      !e && U(u, r.dragClass, !1), U(u, r.ghostClass, !0), b.active = this, e && this._appendGhost(), z({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (W) {
      this._lastX = W.clientX, this._lastY = W.clientY, Xn();
      for (var e = document.elementFromPoint(W.clientX, W.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(W.clientX, W.clientY), e !== t); )
        t = e;
      if (u.parentNode[H]._isOutsideThisEl(e), t)
        do {
          if (t[H]) {
            var r = void 0;
            if (r = t[H]._onDragOver({
              clientX: W.clientX,
              clientY: W.clientY,
              target: e,
              rootEl: t
            }), r && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = Rn(t));
      qn();
    }
  },
  _onTouchMove: function(e) {
    if (ge) {
      var t = this.options, r = t.fallbackTolerance, o = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = m && Se(m, !0), s = m && a && a.a, l = m && a && a.d, d = ot && M && _n(M), p = (i.clientX - ge.clientX + o.x) / (s || 1) + (d ? d[0] - Nt[0] : 0) / (s || 1), c = (i.clientY - ge.clientY + o.y) / (l || 1) + (d ? d[1] - Nt[1] : 0) / (l || 1);
      if (!b.active && !ke) {
        if (r && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (m) {
        a ? (a.e += p - (Ot || 0), a.f += c - (Pt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: p,
          f: c
        };
        var f = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        g(m, "webkitTransform", f), g(m, "mozTransform", f), g(m, "msTransform", f), g(m, "transform", f), Ot = p, Pt = c, W = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!m) {
      var e = this.options.fallbackOnBody ? document.body : S, t = T(u, !0, ot, !0, e), r = this.options;
      if (ot) {
        for (M = e; g(M, "position") === "static" && g(M, "transform") === "none" && M !== document; )
          M = M.parentNode;
        M !== document.body && M !== document.documentElement ? (M === document && (M = G()), t.top += M.scrollTop, t.left += M.scrollLeft) : M = G(), Nt = _n(M);
      }
      m = u.cloneNode(!0), U(m, r.ghostClass, !1), U(m, r.fallbackClass, !0), U(m, r.dragClass, !0), g(m, "transition", ""), g(m, "transform", ""), g(m, "box-sizing", "border-box"), g(m, "margin", 0), g(m, "top", t.top), g(m, "left", t.left), g(m, "width", t.width), g(m, "height", t.height), g(m, "opacity", "0.8"), g(m, "position", ot ? "absolute" : "fixed"), g(m, "zIndex", "100000"), g(m, "pointerEvents", "none"), b.ghost = m, e.appendChild(m), g(m, "transform-origin", yn / parseInt(m.style.width) * 100 + "% " + wn / parseInt(m.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var r = this, o = e.dataTransfer, i = r.options;
    if (F("dragStart", this, {
      evt: e
    }), b.eventCanceled) {
      this._onDrop();
      return;
    }
    F("setupClone", this), b.eventCanceled || (D = Un(u), D.removeAttribute("id"), D.draggable = !1, D.style["will-change"] = "", this._hideClone(), U(D, this.options.chosenClass, !1), b.clone = D), r.cloneId = ut(function() {
      F("clone", r), !b.eventCanceled && (r.options.removeCloneOnHide || S.insertBefore(D, u), r._hideClone(), z({
        sortable: r,
        name: "clone"
      }));
    }), !t && U(u, i.dragClass, !0), t ? (bt = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (w(document, "mouseup", r._onDrop), w(document, "touchend", r._onDrop), w(document, "touchcancel", r._onDrop), o && (o.effectAllowed = "move", i.setData && i.setData.call(r, o, u)), x(document, "drop", r), g(u, "transform", "translateZ(0)")), ke = !0, r._dragStartId = ut(r._dragStarted.bind(r, t, e)), x(document, "selectstart", r), ze = !0, window.getSelection().removeAllRanges(), Be && g(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, r = e.target, o, i, a, s = this.options, l = s.group, d = b.active, p = nt === l, c = s.sort, f = P || d, _, v = this, h = !1;
    if (Ut) return;
    function E(Me, Qn) {
      F(Me, v, V({
        evt: e,
        isOwner: p,
        axis: _ ? "vertical" : "horizontal",
        revert: a,
        dragRect: o,
        targetRect: i,
        canSort: c,
        fromSortable: f,
        target: r,
        completed: O,
        onMove: function(nn, er) {
          return it(S, t, u, o, nn, T(nn), e, er);
        },
        changed: R
      }, Qn));
    }
    function N() {
      E("dragOverAnimationCapture"), v.captureAnimationState(), v !== f && f.captureAnimationState();
    }
    function O(Me) {
      return E("dragOverCompleted", {
        insertion: Me
      }), Me && (p ? d._hideClone() : d._showClone(v), v !== f && (U(u, P ? P.options.ghostClass : d.options.ghostClass, !1), U(u, s.ghostClass, !0)), P !== v && v !== b.active ? P = v : v === b.active && P && (P = null), f === v && (v._ignoreWhileAnimating = r), v.animateAll(function() {
        E("dragOverAnimationComplete"), v._ignoreWhileAnimating = null;
      }), v !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (r === u && !u.animated || r === t && !r.animated) && (xe = null), !s.dragoverBubble && !e.rootEl && r !== document && (u.parentNode[H]._isOutsideThisEl(e.target), !Me && be(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), h = !0;
    }
    function R() {
      B = Y(u), oe = Y(u, s.draggable), z({
        sortable: v,
        name: "change",
        toEl: t,
        newIndex: B,
        newDraggableIndex: oe,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = X(r, s.draggable, t, !0), E("dragOver"), b.eventCanceled) return h;
    if (u.contains(e.target) || r.animated && r.animatingX && r.animatingY || v._ignoreWhileAnimating === r)
      return O(!1);
    if (bt = !1, d && !s.disabled && (p ? c || (a = A !== S) : P === this || (this.lastPutMode = nt.checkPull(this, d, u, e)) && l.checkPut(this, d, u, e))) {
      if (_ = this._getDirection(e, r) === "vertical", o = T(u), E("dragOverValid"), b.eventCanceled) return h;
      if (a)
        return A = S, N(), this._hideClone(), E("revert"), b.eventCanceled || (me ? S.insertBefore(u, me) : S.appendChild(u)), O(!0);
      var I = Zt(t, s.draggable);
      if (!I || Lr(e, _, this) && !I.animated) {
        if (I === u)
          return O(!1);
        if (I && t === e.target && (r = I), r && (i = T(r)), it(S, t, u, o, r, i, e, !!r) !== !1)
          return N(), I && I.nextSibling ? t.insertBefore(u, I.nextSibling) : t.appendChild(u), A = t, R(), O(!0);
      } else if (I && Hr(e, _, this)) {
        var ue = Ce(t, 0, s, !0);
        if (ue === u)
          return O(!1);
        if (r = ue, i = T(r), it(S, t, u, o, r, i, e, !1) !== !1)
          return N(), t.insertBefore(u, ue), A = t, R(), O(!0);
      } else if (r.parentNode === t) {
        i = T(r);
        var q = 0, pe, Te = u.parentNode !== t, L = !Mr(u.animated && u.toRect || o, r.animated && r.toRect || i, _), Oe = _ ? "top" : "left", ne = vn(r, "top", "top") || vn(u, "top", "top"), Pe = ne ? ne.scrollTop : void 0;
        xe !== r && (pe = i[Oe], Xe = !1, rt = !L && s.invertSwap || Te), q = Ur(e, r, i, _, L ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, rt, xe === r);
        var Z;
        if (q !== 0) {
          var he = Y(u);
          do
            he -= q, Z = A.children[he];
          while (Z && (g(Z, "display") === "none" || Z === m));
        }
        if (q === 0 || Z === r)
          return O(!1);
        xe = r, We = q;
        var Ne = r.nextElementSibling, re = !1;
        re = q === 1;
        var tt = it(S, t, u, o, r, i, e, re);
        if (tt !== !1)
          return (tt === 1 || tt === -1) && (re = tt === 1), Ut = !0, setTimeout(Fr, 30), N(), re && !Ne ? t.appendChild(u) : r.parentNode.insertBefore(u, re ? Ne : r), ne && Ln(ne, 0, Pe - ne.scrollTop), A = u.parentNode, pe !== void 0 && !rt && (ct = Math.abs(pe - T(r)[Oe])), R(), O(!0);
      }
      if (t.contains(u))
        return O(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    w(document, "mousemove", this._onTouchMove), w(document, "touchmove", this._onTouchMove), w(document, "pointermove", this._onTouchMove), w(document, "dragover", be), w(document, "mousemove", be), w(document, "touchmove", be);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    w(e, "mouseup", this._onDrop), w(e, "touchend", this._onDrop), w(e, "pointerup", this._onDrop), w(e, "pointercancel", this._onDrop), w(e, "touchcancel", this._onDrop), w(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, r = this.options;
    if (B = Y(u), oe = Y(u, r.draggable), F("drop", this, {
      evt: e
    }), A = u && u.parentNode, B = Y(u), oe = Y(u, r.draggable), b.eventCanceled) {
      this._nulling();
      return;
    }
    ke = !1, rt = !1, Xe = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Bt(this.cloneId), Bt(this._dragStartId), this.nativeDraggable && (w(document, "drop", this), w(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Be && g(document.body, "user-select", ""), g(u, "transform", ""), e && (ze && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), m && m.parentNode && m.parentNode.removeChild(m), (S === A || P && P.lastPutMode !== "clone") && D && D.parentNode && D.parentNode.removeChild(D), u && (this.nativeDraggable && w(u, "dragend", this), Mt(u), u.style["will-change"] = "", ze && !ke && U(u, P ? P.options.ghostClass : this.options.ghostClass, !1), U(u, this.options.chosenClass, !1), z({
      sortable: this,
      name: "unchoose",
      toEl: A,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), S !== A ? (B >= 0 && (z({
      rootEl: A,
      name: "add",
      toEl: A,
      fromEl: S,
      originalEvent: e
    }), z({
      sortable: this,
      name: "remove",
      toEl: A,
      originalEvent: e
    }), z({
      rootEl: A,
      name: "sort",
      toEl: A,
      fromEl: S,
      originalEvent: e
    }), z({
      sortable: this,
      name: "sort",
      toEl: A,
      originalEvent: e
    })), P && P.save()) : B !== Ee && B >= 0 && (z({
      sortable: this,
      name: "update",
      toEl: A,
      originalEvent: e
    }), z({
      sortable: this,
      name: "sort",
      toEl: A,
      originalEvent: e
    })), b.active && ((B == null || B === -1) && (B = Ee, oe = Ye), z({
      sortable: this,
      name: "end",
      toEl: A,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    F("nulling", this), S = u = A = m = me = D = dt = ae = ge = W = ze = B = oe = Ee = Ye = xe = We = P = nt = b.dragged = b.ghost = b.clone = b.active = null, vt.forEach(function(e) {
      e.checked = !0;
    }), vt.length = Ot = Pt = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        u && (this._onDragOver(e), Rr(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], t, r = this.el.children, o = 0, i = r.length, a = this.options; o < i; o++)
      t = r[o], X(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || jr(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var r = {}, o = this.el;
    this.toArray().forEach(function(i, a) {
      var s = o.children[a];
      X(s, this.options.draggable, o, !1) && (r[i] = s);
    }, this), t && this.captureAnimationState(), e.forEach(function(i) {
      r[i] && (o.removeChild(r[i]), o.appendChild(r[i]));
    }), t && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, t) {
    return X(e, t || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, t) {
    var r = this.options;
    if (t === void 0)
      return r[e];
    var o = Qe.modifyOption(this, e, t);
    typeof o < "u" ? r[e] = o : r[e] = t, e === "group" && Wn(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    F("destroy", this);
    var e = this.el;
    e[H] = null, w(e, "mousedown", this._onTapStart), w(e, "touchstart", this._onTapStart), w(e, "pointerdown", this._onTapStart), this.nativeDraggable && (w(e, "dragover", this), w(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), mt.splice(mt.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!ae) {
      if (F("hideClone", this), b.eventCanceled) return;
      g(D, "display", "none"), this.options.removeCloneOnHide && D.parentNode && D.parentNode.removeChild(D), ae = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (ae) {
      if (F("showClone", this), b.eventCanceled) return;
      u.parentNode == S && !this.options.group.revertClone ? S.insertBefore(D, u) : me ? S.insertBefore(D, me) : S.appendChild(D), this.options.group.revertClone && this.animate(u, D), g(D, "display", ""), ae = !1;
    }
  }
};
function Rr(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function it(n, e, t, r, o, i, a, s) {
  var l, d = n[H], p = d.options.onMove, c;
  return window.CustomEvent && !te && !Je ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = n, l.dragged = t, l.draggedRect = r, l.related = o || e, l.relatedRect = i || T(e), l.willInsertAfter = s, l.originalEvent = a, n.dispatchEvent(l), p && (c = p.call(d, l, a)), c;
}
function Mt(n) {
  n.draggable = !1;
}
function Fr() {
  Ut = !1;
}
function Hr(n, e, t) {
  var r = T(Ce(t.el, 0, t.options, !0)), o = Bn(t.el, t.options, m), i = 10;
  return e ? n.clientX < o.left - i || n.clientY < r.top && n.clientX < r.right : n.clientY < o.top - i || n.clientY < r.bottom && n.clientX < r.left;
}
function Lr(n, e, t) {
  var r = T(Zt(t.el, t.options.draggable)), o = Bn(t.el, t.options, m), i = 10;
  return e ? n.clientX > o.right + i || n.clientY > r.bottom && n.clientX > r.left : n.clientY > o.bottom + i || n.clientX > r.right && n.clientY > r.top;
}
function Ur(n, e, t, r, o, i, a, s) {
  var l = r ? n.clientY : n.clientX, d = r ? t.height : t.width, p = r ? t.top : t.left, c = r ? t.bottom : t.right, f = !1;
  if (!a) {
    if (s && ct < d * o) {
      if (!Xe && (We === 1 ? l > p + d * i / 2 : l < c - d * i / 2) && (Xe = !0), Xe)
        f = !0;
      else if (We === 1 ? l < p + ct : l > c - ct)
        return -We;
    } else if (l > p + d * (1 - o) / 2 && l < c - d * (1 - o) / 2)
      return Br(e);
  }
  return f = f || a, f && (l < p + d * i / 2 || l > c - d * i / 2) ? l > p + d / 2 ? 1 : -1 : 0;
}
function Br(n) {
  return Y(u) < Y(n) ? 1 : -1;
}
function jr(n) {
  for (var e = n.tagName + n.className + n.src + n.href + n.textContent, t = e.length, r = 0; t--; )
    r += e.charCodeAt(t);
  return r.toString(36);
}
function Yr(n) {
  vt.length = 0;
  for (var e = n.getElementsByTagName("input"), t = e.length; t--; ) {
    var r = e[t];
    r.checked && vt.push(r);
  }
}
function ut(n) {
  return setTimeout(n, 0);
}
function Bt(n) {
  return clearTimeout(n);
}
$t && x(document, "touchmove", function(n) {
  (b.active || ke) && n.cancelable && n.preventDefault();
});
b.utils = {
  on: x,
  off: w,
  css: g,
  find: Fn,
  is: function(e, t) {
    return !!X(e, t, e, !1);
  },
  extend: Sr,
  throttle: Hn,
  closest: X,
  toggleClass: U,
  clone: Un,
  index: Y,
  nextTick: ut,
  cancelNextTick: Bt,
  detectDirection: Yn,
  getChild: Ce,
  expando: H
};
b.get = function(n) {
  return n[H];
};
b.mount = function() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (b.utils = V(V({}, b.utils), r.utils)), Qe.mount(r);
  });
};
b.create = function(n, e) {
  return new b(n, e);
};
b.version = kr;
var C = [], Re, jt, Yt = !1, It, zt, _t, Fe;
function Wr() {
  function n() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return n.prototype = {
    dragStarted: function(t) {
      var r = t.originalEvent;
      this.sortable.nativeDraggable ? x(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? x(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? x(document, "touchmove", this._handleFallbackAutoScroll) : x(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var r = t.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? w(document, "dragover", this._handleAutoScroll) : (w(document, "pointermove", this._handleFallbackAutoScroll), w(document, "touchmove", this._handleFallbackAutoScroll), w(document, "mousemove", this._handleFallbackAutoScroll)), $n(), pt(), Dr();
    },
    nulling: function() {
      _t = jt = Re = Yt = Fe = It = zt = null, C.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, r) {
      var o = this, i = (t.touches ? t.touches[0] : t).clientX, a = (t.touches ? t.touches[0] : t).clientY, s = document.elementFromPoint(i, a);
      if (_t = t, r || this.options.forceAutoScrollFallback || Je || te || Be) {
        Rt(t, this.options, s, r);
        var l = se(s, !0);
        Yt && (!Fe || i !== It || a !== zt) && (Fe && $n(), Fe = setInterval(function() {
          var d = se(document.elementFromPoint(i, a), !0);
          d !== l && (l = d, pt()), Rt(t, o.options, d, r);
        }, 10), It = i, zt = a);
      } else {
        if (!this.options.bubbleScroll || se(s, !0) === G()) {
          pt();
          return;
        }
        Rt(t, this.options, se(s, !1), !1);
      }
    }
  }, Q(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function pt() {
  C.forEach(function(n) {
    clearInterval(n.pid);
  }), C = [];
}
function $n() {
  clearInterval(Fe);
}
var Rt = Hn(function(n, e, t, r) {
  if (e.scroll) {
    var o = (n.touches ? n.touches[0] : n).clientX, i = (n.touches ? n.touches[0] : n).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = G(), d = !1, p;
    jt !== t && (jt = t, pt(), Re = e.scroll, p = e.scrollFn, Re === !0 && (Re = se(t, !0)));
    var c = 0, f = Re;
    do {
      var _ = f, v = T(_), h = v.top, E = v.bottom, N = v.left, O = v.right, R = v.width, I = v.height, ue = void 0, q = void 0, pe = _.scrollWidth, Te = _.scrollHeight, L = g(_), Oe = _.scrollLeft, ne = _.scrollTop;
      _ === l ? (ue = R < pe && (L.overflowX === "auto" || L.overflowX === "scroll" || L.overflowX === "visible"), q = I < Te && (L.overflowY === "auto" || L.overflowY === "scroll" || L.overflowY === "visible")) : (ue = R < pe && (L.overflowX === "auto" || L.overflowX === "scroll"), q = I < Te && (L.overflowY === "auto" || L.overflowY === "scroll"));
      var Pe = ue && (Math.abs(O - o) <= a && Oe + R < pe) - (Math.abs(N - o) <= a && !!Oe), Z = q && (Math.abs(E - i) <= a && ne + I < Te) - (Math.abs(h - i) <= a && !!ne);
      if (!C[c])
        for (var he = 0; he <= c; he++)
          C[he] || (C[he] = {});
      (C[c].vx != Pe || C[c].vy != Z || C[c].el !== _) && (C[c].el = _, C[c].vx = Pe, C[c].vy = Z, clearInterval(C[c].pid), (Pe != 0 || Z != 0) && (d = !0, C[c].pid = setInterval((function() {
        r && this.layer === 0 && b.active._onTouchMove(_t);
        var Ne = C[this.layer].vy ? C[this.layer].vy * s : 0, re = C[this.layer].vx ? C[this.layer].vx * s : 0;
        typeof p == "function" && p.call(b.dragged.parentNode[H], re, Ne, n, _t, C[this.layer].el) !== "continue" || Ln(C[this.layer].el, re, Ne);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && f !== l && (f = se(f, !1)));
    Yt = d;
  }
}, 30), Gn = function(e) {
  var t = e.originalEvent, r = e.putSortable, o = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, s = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var d = r || i;
    s();
    var p = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, c = document.elementFromPoint(p.clientX, p.clientY);
    l(), d && !d.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: o,
      putSortable: r
    }));
  }
};
function Kt() {
}
Kt.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, r = e.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var o = Ce(this.sortable.el, this.startIndex, this.options);
    o ? this.sortable.el.insertBefore(t, o) : this.sortable.el.appendChild(t), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: Gn
};
Q(Kt, {
  pluginName: "revertOnSpill"
});
function Jt() {
}
Jt.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, r = e.putSortable, o = r || this.sortable;
    o.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), o.animateAll();
  },
  drop: Gn
};
Q(Jt, {
  pluginName: "removeOnSpill"
});
b.mount(new Wr());
b.mount(Jt, Kt);
const et = "household_kanban";
function Xr(n, e) {
  return n.connection.subscribeMessage((t) => e(t.board), { type: `${et}/subscribe` });
}
function Ft(n, e, t) {
  return n.callService(et, "set_status", { uid: e, status: t });
}
function qr(n, e) {
  return n.callService(et, "create_item", { ...e });
}
function Ht(n, e, t) {
  return n.callService(et, "update_item", { uid: e, ...t });
}
function Gr(n, e) {
  return n.callService(et, "delete_item", { uid: e });
}
const Vr = 864e5;
function j(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
const le = (n) => String(n).padStart(2, "0");
function J(n) {
  return `${n.getFullYear()}-${le(n.getMonth() + 1)}-${le(n.getDate())}`;
}
function Zr(n, e) {
  if (!n) return null;
  if (!e) return n;
  const [t, r, o] = n.split("-").map(Number), [i, a] = e.split(":").map(Number), s = -new Date(t, r - 1, o, i, a).getTimezoneOffset(), l = Math.abs(s);
  return `${n}T${le(i)}:${le(a)}:00${s < 0 ? "-" : "+"}${le(Math.floor(l / 60))}:${le(l % 60)}`;
}
function Kr(n) {
  if (!n) return "";
  const { date: e, hasTime: t } = ee(n);
  return t ? `${le(e.getHours())}:${le(e.getMinutes())}` : "";
}
function de(n, e) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + e);
}
function Qt(n, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / Vr);
}
function ee(n) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(n)) {
    const [e, t, r] = n.split("-").map(Number);
    return { date: new Date(e, t - 1, r), hasTime: !1 };
  }
  return { date: new Date(n), hasTime: !0 };
}
function Jr(n, e) {
  const t = j(n), r = (t.getDay() - e + 7) % 7, o = de(t, -r);
  return r === 6 ? { start: de(o, 7), end: de(o, 13) } : { start: o, end: de(o, 6) };
}
const Qr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function eo(n, e) {
  var o, i;
  if (n === "saturday") return 0;
  if (n === "sunday") return 1;
  const t = e == null ? void 0 : e.first_weekday, r = Qr.indexOf(t ?? "");
  if (r >= 0) return r;
  try {
    const a = new Intl.Locale((e == null ? void 0 : e.language) ?? "en"), s = (i = ((o = a.getWeekInfo) == null ? void 0 : o.call(a)) ?? a.weekInfo) == null ? void 0 : i.firstDay;
    if (s) return s % 7;
  } catch {
  }
  return 1;
}
function yt(n, e) {
  const t = j(e.now);
  if (n.status === "completed")
    return !n.completed_at || !e.enabled.has("done") ? null : Qt(new Date(n.completed_at), t) < e.doneDays ? "done" : null;
  if (!n.due) return "todo";
  const r = j(ee(n.due).date), o = (...i) => i.find((a) => e.enabled.has(a)) ?? "todo";
  return r < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : o("today", "week") : +r == +t ? o("today", "week") : r <= e.week.end ? o("week") : o("later");
}
const to = 8;
function no(n, e, t) {
  return Math.hypot(n, e) >= to;
}
function ro(n, e, t) {
  const r = n.status === "completed" ? { status: "needs_action" } : {};
  if (typeof e == "number")
    return n.status === "needs_action" && n.priority === e ? null : { ...r, ...n.priority === e ? {} : { priority: e } };
  if (e === "overdue" || yt(n, t) === e) return null;
  if (e === "done") return { status: "completed" };
  if (e === "todo") return { ...r, due: null };
  if (e === "week") return { ...r, due: J(t.week.end) };
  if (e === "later") return { ...r, due: J(de(t.week.end, 1)) };
  const o = j(t.now);
  return n.due && +j(ee(n.due).date) == +o ? Object.keys(r).length ? r : null : { ...r, due: J(o) };
}
function oo(n) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(n, 10));
}
const Vn = {
  title: "Tasks",
  col_todo: "To-do",
  col_later: "Later",
  col_week: "This week",
  col_today: "Today",
  col_overdue: "Overdue",
  col_done: "Done",
  prio_1: "High",
  prio_2: "Medium",
  prio_3: "Low",
  group_date: "By date",
  group_priority: "By priority",
  group_label: "Group",
  filter_people: "Filter by person",
  filter_parents: "Filter by list",
  all_people: "Everyone",
  all_parents: "All",
  unassigned: "Unassigned",
  nothing: "Nothing here",
  mark_done: "Done",
  mark_open: "Reopen",
  bought: "Bought",
  moved: "Moved {n}×",
  moved_raised: "Moved {n}× · ↑ priority",
  yesterday: "Yesterday",
  today: "Today",
  tomorrow: "Tomorrow",
  days_ago: "{n} days ago",
  done_today: "Done today",
  done_yesterday: "Done yesterday",
  done_days_ago: "Done {n} days ago",
  done_note: "Last {days} days · {older} older in history",
  more: "+ {n} more",
  collapse: "Collapse",
  open_list: "Open list",
  loading: "Loading…",
  err_load: "Could not load tasks. Retrying…",
  err_update: "Could not update the task.",
  new_note: "New note",
  new_task: "New task",
  add_here: "Add task",
  close: "Close",
  f_title: "Title",
  f_title_ph: "What needs doing?",
  f_note: "Note",
  f_note_ph: "Details, link, measurements…",
  f_parent: "List",
  f_prio: "Priority",
  f_due: "Due",
  f_who: "Who",
  f_date: "Date",
  f_time: "Time",
  q_today: "Today",
  q_tomorrow: "Tomorrow",
  q_weekend: "Weekend",
  q_none: "No date",
  cancel: "Cancel",
  save: "Save",
  delete: "Delete",
  delete_confirm: "Delete this task?",
  delete_yes: "Delete",
  err_save: "Could not save the task.",
  err_delete: "Could not delete the task."
}, io = {
  title: "Úkoly",
  col_todo: "To-do",
  col_later: "Později",
  col_week: "Tento týden",
  col_today: "Dnes",
  col_overdue: "Po termínu",
  col_done: "Hotovo",
  prio_1: "Vysoká",
  prio_2: "Střední",
  prio_3: "Nízká",
  group_date: "Podle data",
  group_priority: "Podle priority",
  group_label: "Seskupit",
  filter_people: "Filtr podle osoby",
  filter_parents: "Filtr podle seznamu",
  all_people: "Všichni",
  all_parents: "Vše",
  unassigned: "Nepřiřazeno",
  nothing: "Nic tu není",
  mark_done: "Hotovo",
  mark_open: "Znovu otevřít",
  bought: "Koupeno",
  moved: "Přesunuto {n}×",
  moved_raised: "Přesunuto {n}× · ↑ priorita",
  yesterday: "Včera",
  today: "Dnes",
  tomorrow: "Zítra",
  days_ago: "Před {n} dny",
  done_today: "Hotovo dnes",
  done_yesterday: "Hotovo včera",
  done_days_ago: "Hotovo před {n} dny",
  done_note: "Za posledních {days} dní · {older} starších v historii",
  more: "+ {n} dalších",
  collapse: "Sbalit",
  open_list: "Otevřít seznam",
  loading: "Načítání…",
  err_load: "Úkoly se nepodařilo načíst. Zkouším znovu…",
  err_update: "Úkol se nepodařilo změnit.",
  new_note: "Nový lísteček",
  new_task: "Nový úkol",
  add_here: "Přidat úkol",
  close: "Zavřít",
  f_title: "Název",
  f_title_ph: "Co je potřeba udělat?",
  f_note: "Poznámka",
  f_note_ph: "Podrobnosti, odkaz, rozměry…",
  f_parent: "Seznam",
  f_prio: "Priorita",
  f_due: "Termín",
  f_who: "Kdo",
  f_date: "Datum",
  f_time: "Čas",
  q_today: "Dnes",
  q_tomorrow: "Zítra",
  q_weekend: "Víkend",
  q_none: "Bez termínu",
  cancel: "Zrušit",
  save: "Uložit",
  delete: "Smazat",
  delete_confirm: "Smazat tento úkol?",
  delete_yes: "Smazat",
  err_save: "Úkol se nepodařilo uložit.",
  err_delete: "Úkol se nepodařilo smazat."
}, ao = { en: Vn, cs: io };
function k(n, e, t = {}) {
  return (ao[(n ?? "en").split("-")[0]] ?? Vn)[e].replace(/\{(\w+)\}/g, (o, i) => String(t[i] ?? ""));
}
const kn = {
  en: {
    sum_open: { other: "{n} open" },
    sum_today: { other: "{n} for today" },
    sum_moved: { other: "{n} moved from yesterday" },
    sum_overdue: { other: "{n} overdue" }
  },
  cs: {
    sum_open: { one: "{n} otevřený", few: "{n} otevřené", other: "{n} otevřených" },
    sum_today: { other: "{n} na dnes" },
    sum_moved: { one: "{n} přesunutý ze včerejška", few: "{n} přesunuté ze včerejška", other: "{n} přesunutých ze včerejška" },
    sum_overdue: { other: "{n} po termínu" }
  }
};
function at(n, e, t) {
  const r = (n ?? "en").split("-")[0], o = r in kn ? r : "en", i = kn[o][e];
  return (i[new Intl.PluralRules(o).select(t)] ?? i.other).replace("{n}", String(t));
}
const so = nr`
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
  .check.xs { width: 20px; height: 20px; margin: 0; }
  .check[aria-pressed="true"] { border: 0; background: rgb(var(--c-green)); color: #fff; }
  .title { flex: 1; text-align: left; border: 0; background: transparent; padding: 0; min-width: 0; font-size: 15px; font-weight: 600; letter-spacing: -0.2px; line-height: 1.3; overflow-wrap: anywhere; }
  .done .title { color: var(--kb-text-2); text-decoration: line-through; }
  .pills { display: flex; flex-wrap: wrap; gap: 6px; padding-left: 32px; }
  .pill { display: inline-flex; align-items: center; gap: 4px; height: 22px; padding: 0 8px; border-radius: 999px; font-size: 12px; font-weight: 600; background: rgba(var(--pc, var(--c-grey)), 0.14); color: rgb(var(--pc, var(--c-grey))); --mdc-icon-size: 12px; }
  .pill.prio-3, .pill.later { background: var(--kb-fill); color: var(--kb-text-2); }
  .pill.today { background: var(--kb-warm); color: var(--kb-warm-text); }

  .stack-head { font-size: 14px; font-weight: 700; flex: 1; min-width: 0; }
  .stack-sub { font-size: 12px; font-weight: 600; color: var(--kb-text-2); }
  .stack-rows { display: flex; flex-direction: column; gap: 2px; padding: 6px; border-radius: 12px; background: var(--kb-fill); box-shadow: var(--kb-inset); }
  .stack-rows .item { display: flex; align-items: center; gap: 10px; padding: 5px 6px; font-size: 14px; font-weight: 500; }
  .stack-rows .item span.t { flex: 1; min-width: 0; overflow-wrap: anywhere; }
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
`, lo = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], en = (n) => `c-${lo.includes(n) ? n : "grey"}`;
function tn(n, e) {
  var t;
  return String(((t = n.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function co(n) {
  return n.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function kt(n, e = !1) {
  return y`<span class="dot ${e ? "sm" : ""} ${en((n == null ? void 0 : n.color) ?? "grey")}"><ha-icon .icon=${(n == null ? void 0 : n.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function Ze(n, e, t = "", r = !1) {
  var s;
  if (!e) return y`<span class="ava none ${t}" title="-">+</span>`;
  const o = tn(n, e), i = (s = n.states[e]) == null ? void 0 : s.attributes.entity_picture;
  if (typeof i == "string" && i) return y`<img class="ava ${t}" src=${i} alt=${r ? "" : o} title=${o} />`;
  const a = [...o].reduce((l, d) => (l * 31 + d.charCodeAt(0)) % 360, 7);
  return y`<span class="ava ${t}" title=${o} style="background:linear-gradient(135deg,hsl(${a} 55% 62%),hsl(${(a + 25) % 360} 55% 42%))">${co(o)}</span>`;
}
const uo = y`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function Zn(n, e, t = !1) {
  const r = n.status === "completed";
  return y`<button class="check ${t ? "xs" : ""}" type="button" aria-pressed=${r} aria-label=${n.summary}
    @click=${() => e.onToggle(n)}>${uo}</button>`;
}
function po(n, e) {
  const { date: t, hasTime: r } = ee(n.due), o = Qt(j(e.now), t);
  let i;
  return o === -1 ? i = k(e.lang, "yesterday") : o < -1 ? i = k(e.lang, "days_ago", { n: -o }) : o === 0 ? i = k(e.lang, "today") : o === 1 ? i = k(e.lang, "tomorrow") : i = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), r ? `${i} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : i;
}
function ho(n, e) {
  const t = Qt(new Date(n.completed_at), j(e.now));
  return t <= 0 ? k(e.lang, "done_today") : t === 1 ? k(e.lang, "done_yesterday") : k(e.lang, "done_days_ago", { n: t });
}
function fo(n, e, t) {
  const r = n.status === "completed", o = e.parents.find((d) => d.id === n.parent), i = j(e.now), a = !r && n.due && j(ee(n.due).date) < i, s = !r && n.due && +j(ee(n.due).date) == +i, l = y`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
  return y`<article class="card ${r ? "done" : ""}" data-uid=${n.uid} @click=${(d) => {
    d.target.closest(".check") || e.onOpen(n, d);
  }}>
    <div class="row">
      ${kt(o, !0)}
      <span class="parent-name">${(o == null ? void 0 : o.name) ?? n.parent}</span>
      ${Ze(e.hass, n.assignee)}
    </div>
    <div class="row top">
      ${Zn(n, e)}
      <button class="title" type="button">${n.summary}</button>
    </div>
    <div class="pills">
      ${!r && t ? y`<span class="pill prio-${n.priority} ${en(["", "red", "orange", "grey"][n.priority])}">${l}${k(e.lang, `prio_${n.priority}`)}</span>` : $}
      ${!r && n.moved > 0 ? y`<span class="pill c-orange">${k(e.lang, n.raised ? "moved_raised" : "moved", { n: n.moved })}</span>` : $}
      ${r && n.completed_at ? y`<span class="pill c-green">${ho(n, e)}</span>` : $}
      ${!r && n.due ? y`<span class="pill ${a ? "c-red" : s ? "today" : "later"}">${po(n, e)}</span>` : $}
    </div>
  </article>`;
}
function go(n, e, t, r, o) {
  const i = t ? n.items : n.items.slice(0, 3), a = n.items.length - i.length;
  return y`<article class="card">
    <div class="row">
      ${kt(n.parent)}
      <span class="stack-head">${n.parent.name}</span>
      <span class="stack-sub">${n.items.length}</span>
    </div>
    <div class="stack-rows">
      ${i.map((s) => y`<div class="item">
        ${Zn(s, e, !0)}
        <span class="t">${s.summary}</span>
        ${s.assignee ? Ze(e.hass, s.assignee, "xs") : $}
      </div>`)}
      ${a > 0 ? y`<button class="link" type="button" @click=${() => r(n.parent.id, !0)}>${k(e.lang, "more", { n: a })}</button>` : $}
      ${t && n.items.length > 3 ? y`<button class="link muted" type="button" @click=${() => r(n.parent.id, !1)}>${k(e.lang, "collapse")}</button>` : $}
    </div>
    <button class="link" type="button" @click=${() => o(n.parent.id)}>${k(e.lang, "open_list")} ›</button>
  </article>`;
}
function Kn(n) {
  return {
    uid: n.uid,
    status: n.status,
    heading: n.summary,
    parent: n.parent,
    summary: n.summary,
    description: n.description,
    priority: n.priority,
    assignee: n.assignee,
    date: n.due ? J(ee(n.due).date) : "",
    time: Kr(n.due),
    confirmDelete: !1
  };
}
function bo(n, e = {}) {
  return { status: "needs_action", heading: "", parent: n, summary: "", description: "", priority: 2, assignee: null, date: "", time: "", confirmDelete: !1, ...e };
}
function Jn(n) {
  return {
    summary: n.summary.trim(),
    description: n.description,
    due: Zr(n.date, n.date ? n.time : ""),
    priority: n.priority,
    assignee: n.assignee,
    parent: n.parent
  };
}
function En(n, e) {
  const t = Jn(e), r = Kn(n), o = {};
  return t.summary !== n.summary && (o.summary = t.summary), t.description !== n.description && (o.description = t.description), (e.date !== r.date || e.time !== r.time) && (o.due = t.due), t.priority !== n.priority && (o.priority = t.priority), t.assignee !== n.assignee && (o.assignee = t.assignee), t.parent !== n.parent && (o.parent = t.parent), o;
}
function ht(n, e) {
  const t = j(e);
  return n === "none" ? "" : J(n === "today" ? t : n === "tomorrow" ? de(t, 1) : de(t, (6 - t.getDay() + 7) % 7));
}
const mo = y`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
function vo(n, e) {
  const t = (a) => k(e.lang, a), r = !n.uid, o = ["today", "tomorrow", "weekend", "none"], i = (a) => {
    a.target === a.currentTarget && e.onClose();
  };
  return y`<dialog class="kb-dialog" aria-label=${r ? t("new_task") : n.heading} @close=${e.onClose} @click=${i}>
    <div class="dlg">
      <div class="dlg-head">
        <span class="dlg-kicker">${t(r ? "new_note" : "f_title")}</span>
        ${r ? $ : y`<button class="pill-btn ${n.status === "completed" ? "on" : ""}" type="button" @click=${e.onToggleDone}>
          ${t(n.status === "completed" ? "mark_open" : "mark_done")}</button>`}
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>

      ${e.error ? y`<div class="notice" role="alert">${t(e.error)}</div>` : $}
      <label class="vis-hidden" for="kb-title">${t("f_title")}</label>
      <input id="kb-title" class="dlg-title" type="text" autocomplete="off" .value=${n.summary} placeholder=${t("f_title_ph")}
        @input=${(a) => e.onChange({ summary: a.target.value })} />

      <label class="field"><span class="dlg-label">${t("f_note")}</span>
        <textarea rows="3" .value=${n.description} placeholder=${t("f_note_ph")}
          @input=${(a) => e.onChange({ description: a.target.value })}></textarea></label>

      <div class="field"><span class="dlg-label">${t("f_parent")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_parent")}>
          ${e.parents.map((a) => y`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.parent === a.id}
            @click=${() => e.onChange({ parent: a.id })}>${kt(a, !0)}${a.name}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_prio")}</span>
        <div class="seg3" role="radiogroup" aria-label=${t("f_prio")}>
          ${[1, 2, 3].map((a) => y`<button type="button" role="radio" aria-checked=${n.priority === a}
            class="prio-${a}" @click=${() => e.onChange({ priority: a })}>${mo}${t(`prio_${a}`)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_due")}</span>
        <div class="chips">
          ${o.map((a) => y`<button class="pill-btn ${ht(a, e.now) === n.date ? "on" : ""}" type="button"
            aria-pressed=${ht(a, e.now) === n.date}
            @click=${() => e.onChange({ date: ht(a, e.now), ...a === "none" ? { time: "" } : {} })}>${t(`q_${a}`)}</button>`)}
          <label class="pill-input"><span class="vis-hidden">${t("f_date")}</span>
            <input type="date" .value=${n.date} @input=${(a) => e.onChange({ date: a.target.value })} /></label>
          <label class="pill-input"><span class="vis-hidden">${t("f_time")}</span>
            <input type="time" .value=${n.time} ?disabled=${!n.date} @input=${(a) => e.onChange({ time: a.target.value })} /></label>
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_who")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_who")}>
          <button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === null}
            @click=${() => e.onChange({ assignee: null })}>${Ze(e.hass, null, "", !0)}${t("unassigned")}</button>
          ${e.people.map((a) => y`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === a}
            @click=${() => e.onChange({ assignee: a })}>${Ze(e.hass, a, "", !0)}${tn(e.hass, a)}</button>`)}
        </div></div>

      <div class="dlg-foot">
        ${r ? $ : n.confirmDelete ? y`<span class="danger-text" role="alert">${t("delete_confirm")}</span>
              <button class="danger-btn" type="button" ?disabled=${e.busy} @click=${e.onDelete}>${t("delete_yes")}</button>
              <button class="pill-btn" type="button" @click=${() => e.onChange({ confirmDelete: !1 })}>${t("cancel")}</button>` : y`<button class="danger-link" type="button" @click=${() => e.onChange({ confirmDelete: !0 })}>${t("delete")}</button>`}
        <span class="grow"></span>
        ${n.confirmDelete ? $ : y`
          <button class="pill-btn" type="button" @click=${e.onClose}>${t("cancel")}</button>
          <button class="primary-btn" type="button" ?disabled=${!n.summary.trim() || e.busy} @click=${e.onSave}>${t("save")}</button>`}
      </div>
    </div>
  </dialog>`;
}
function Sn(n) {
  if (!n.due) return 1 / 0;
  const { date: e, hasTime: t } = ee(n.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function Dn(n, e) {
  const t = Sn(n), r = Sn(e);
  return t !== r ? t < r ? -1 : 1 : n.priority - e.priority || +new Date(n.created_at) - +new Date(e.created_at);
}
function _o(n, e, t) {
  const r = [], o = /* @__PURE__ */ new Map();
  for (const i of n) {
    const a = e.find((l) => l.id === i.parent);
    if (!(a != null && a.collapse) || a.id === t) {
      r.push(i);
      continue;
    }
    let s = o.get(a.id);
    s || (s = { parent: a, items: [] }, o.set(a.id, s), r.push(s)), s.items.push(i);
  }
  return r;
}
const yo = ["todo", "later", "week", "overdue", "today", "done"], wo = (n, e) => +new Date(e.completed_at ?? 0) - +new Date(n.completed_at ?? 0);
function xo(n, e, t) {
  const { ctx: r } = e, o = n.filter((l) => l.status === "needs_action"), i = n.filter((l) => yt(l, r) === "done").sort(wo), a = n.filter((l) => l.status === "completed").length - i.length, s = e.group === "date" ? yo.filter((l) => l !== "done" && (l === "todo" || r.enabled.has(l))).map((l) => ({
    id: l,
    label: k(t, `col_${l}`),
    led: l === "overdue" ? "rgb(var(--c-red))" : l === "week" || l === "today" ? "var(--kb-accent)" : void 0,
    items: o.filter((d) => yt(d, r) === l).sort(Dn)
  })) : [1, 2, 3].map((l) => ({
    id: `p${l}`,
    label: k(t, `prio_${l}`),
    led: l === 1 ? "rgb(var(--c-red))" : l === 2 ? "rgb(var(--c-orange))" : void 0,
    items: o.filter((d) => d.priority === l).sort(Dn)
  }));
  return r.enabled.has("done") && s.push({ id: "done", label: k(t, "col_done"), led: "rgb(var(--c-green))", items: i, done: !0 }), { cols: s, olderDone: a };
}
function $o(n, e, t) {
  const { cols: r, olderDone: o } = xo(n, e, t.lang);
  return y`<div class="board">${r.map((i) => {
    const a = i.done ? i.items : _o(i.items, e.board.parents, e.parent);
    return y`<section class="col" data-col=${i.id}>
      <div class="col-head">
        <span class="led" style=${i.led ? `background:${i.led}` : ""}></span>
        <span class="label">${i.label}</span><span class="count">${i.items.length}</span>
        ${i.done || i.id === "overdue" ? $ : y`<button class="add" type="button" aria-label=${`${k(t.lang, "add_here")}: ${i.label}`} @click=${() => e.onAdd(i.id)}>+</button>`}
      </div>
      ${a.map((s) => "items" in s ? go(s, t, e.expanded.has(s.parent.id), e.onExpand, e.onFocus) : fo(s, t, e.group === "date"))}
      ${i.done ? y`<div class="note">${k(t.lang, "done_note", { days: e.ctx.doneDays, older: o })}</div>` : $}
      ${!i.done && a.length === 0 ? y`<div class="empty">${k(t.lang, "nothing")}</div>` : $}
    </section>`;
  })}</div>`;
}
function ko(n, e, t, r, o) {
  const i = r.filter((s) => s.status === "needs_action" && (!e.who || s.assignee === e.who)), a = (s) => {
    const l = e.parent === ((s == null ? void 0 : s.id) ?? null), d = i.filter((p) => !s || p.parent === s.id).length;
    return y`<button class="chip ${s ? en(s.color) : ""}" type="button" aria-pressed=${l}
      @click=${() => o({ parent: l ? null : (s == null ? void 0 : s.id) ?? null })}>
      ${kt(s ?? void 0)}<span>${(s == null ? void 0 : s.name) ?? k(n.lang, "all_parents")}</span><b>${d}</b></button>`;
  };
  return y`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${k(n.lang, "filter_people")}>
      ${t.map((s) => {
    const l = e.who === s;
    return y`<button class="person" type="button" aria-pressed=${l} @click=${() => o({ who: l ? null : s })}>
          ${Ze(n.hass, s, "lg", !0)}<span>${tn(n.hass, s)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${k(n.lang, "filter_parents")}>
      ${a(null)}${n.parents.map((s) => a(s))}
    </div>
    <div class="seg" role="group" aria-label=${k(n.lang, "group_label")}>
      ${["date", "priority"].map((s) => y`<button type="button" aria-pressed=${e.group === s}
        @click=${() => o({ group: s })}>${k(n.lang, `group_${s}`)}</button>`)}
    </div>
  </div>`;
}
const Eo = ["todo", "week", "today", "done"], wt = class wt extends Ue {
  constructor() {
    super(), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set(), this._loadFailed = !1, this._busy = !1, this._sortables = /* @__PURE__ */ new Map(), this._seq = 0, this._attempts = 0, this.addEventListener("pointerdown", (e) => {
      this._down = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    }, !0);
  }
  setConfig(e) {
    this._config = e, this._filter = { ...this._filter, group: e.group ?? "date" };
  }
  getCardSize() {
    return 8;
  }
  connectedCallback() {
    super.connectedCallback(), this._subscribe();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), window.clearTimeout(this._retry), this._retry = void 0, this._sortables.forEach((t) => t.destroy()), this._sortables.clear(), (e = this._unsub) == null || e.then((t) => t()).catch(() => {
    }), this._unsub = void 0;
  }
  willUpdate(e) {
    e.has("hass") && this._subscribe();
  }
  /** Subscribe once; on failure retry on a capped backoff timer, never on hass updates. */
  _subscribe() {
    if (this._unsub || this._retry !== void 0 || !this.hass || !this.isConnected) return;
    const e = Xr(this.hass, (t) => {
      if (this._dragFrom) {
        this._pending = t;
        return;
      }
      this._board = t, this._loadFailed = !1;
    });
    this._unsub = e, e.then(() => {
      this._unsub === e && (this._attempts = 0);
    }, () => {
      this._unsub === e && (this._unsub = void 0, this._loadFailed = !0, this._retry = window.setTimeout(() => {
        this._retry = void 0, this._subscribe();
      }, oo(this._attempts++)));
    });
  }
  _fail(e) {
    this._notice = e, window.setTimeout(() => {
      this._notice = void 0;
    }, 5e3);
  }
  /** Run a write from inside the dialog; close it on success, show the error in it otherwise. */
  async _dialogWrite(e, t) {
    const r = this._seq;
    this._busy = !0, this._dlgError = void 0;
    try {
      await t(), r === this._seq && (this._draft = void 0);
    } catch (o) {
      console.warn("household_kanban: write failed", o), r === this._seq && (this._dlgError = e);
    } finally {
      this._busy = !1;
    }
  }
  _save() {
    var o;
    const e = this.hass, t = this._draft;
    if (!e || !t) return;
    const r = t.uid ? (o = this._board) == null ? void 0 : o.items.find((i) => i.uid === t.uid) : void 0;
    if (t.uid && !r) {
      this._dlgError = "err_save";
      return;
    }
    this._dialogWrite("err_save", () => r ? Ht(e, r.uid, En(r, t)) : qr(e, Jn(t)));
  }
  /** Tap on a card; a click that ends a drag is not a tap. */
  _open(e, t) {
    const r = t, o = this._down;
    this._down = void 0, !(r.detail !== 0 && o && no(r.clientX - o.x, r.clientY - o.y, t.timeStamp - o.t)) && this._openDialog(Kn(e), `[data-uid="${e.uid}"] .title`);
  }
  _openDialog(e, t) {
    this._seq++, this._dlgError = void 0, this._returnTo = t, this._draft = e;
  }
  _add(e, t, r, o = `.col[data-col="${e}"] .add`) {
    var l, d;
    const i = this._filter.parent ?? ((l = t.find((p) => p.id === "household")) == null ? void 0 : l.id) ?? ((d = t[0]) == null ? void 0 : d.id);
    if (!i) return;
    const a = /^p([123])$/.exec(e), s = {
      today: ht("today", r.now),
      week: J(r.week.end),
      later: J(de(r.week.end, 1))
    };
    this._openDialog(bo(i, a ? { priority: Number(a[1]) } : { date: s[e] ?? "" }), o);
  }
  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  _syncSortables() {
    var r;
    const e = new Set(this.renderRoot.querySelectorAll(".col"));
    for (const [o, i] of this._sortables) e.has(o) || (i.destroy(), this._sortables.delete(o));
    const t = ((r = window.matchMedia) == null ? void 0 : r.call(window, "(pointer: coarse)").matches) ?? !1;
    for (const o of e)
      this._sortables.has(o) || this._sortables.set(o, b.create(o, {
        group: { name: "kb", pull: !0, put: (i) => i.el.dataset.col !== "overdue" },
        draggable: "[data-uid]",
        filter: ".check",
        preventOnFilter: !1,
        sort: !1,
        delay: 150,
        delayOnTouchOnly: !0,
        touchStartThreshold: 8,
        forceFallback: t,
        // the exact node after the card is its own Lit end marker, so the card goes back inside its part
        onStart: (i) => {
          this._dragFrom = { parent: i.item.parentNode, next: i.item.nextSibling };
        },
        onEnd: (i) => {
          const a = this._dragFrom;
          this._dragFrom = void 0, a && a.parent.insertBefore(i.item, a.next && a.next.parentNode === a.parent ? a.next : null), i.to !== i.from && this._drop(i.item.dataset.uid, i.to.dataset.col), this._pending && (this._board = this._pending, this._loadFailed = !1, this._pending = void 0);
        }
      }));
  }
  _drop(e, t) {
    var c;
    const r = this.hass, o = this._ctx, i = (c = this._board) == null ? void 0 : c.items.find((f) => f.uid === e);
    if (!r || !o || !i || !t) return;
    const a = /^p([123])$/.exec(t), s = ro(i, a ? Number(a[1]) : t, o);
    if (!s) return;
    const { status: l, ...d } = s;
    (async () => {
      Object.keys(d).length && await Ht(r, i.uid, d), l && await Ft(r, i.uid, l);
    })().catch((f) => {
      console.warn("household_kanban: drop failed", f), this._fail("err_update");
    });
  }
  updated() {
    var t, r, o;
    this._syncSortables();
    const e = this.renderRoot.querySelector("dialog");
    e && !e.open ? (e.showModal(), (t = this._draft) != null && t.uid || (r = this.renderRoot.querySelector("#kb-title")) == null || r.focus()) : !e && this._returnTo && ((o = this.renderRoot.querySelector(this._returnTo)) == null || o.focus(), this._returnTo = void 0);
  }
  render() {
    var v;
    const e = this.hass, t = this._config, r = this._board;
    if (!e || !t) return $;
    const o = ((v = e.locale) == null ? void 0 : v.language) ?? e.language ?? "en";
    if (!r) return y`<ha-card><div class="loading">${k(o, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const i = /* @__PURE__ */ new Date(), a = r.parents.filter((h) => !t.parents || t.parents.includes(h.id)), s = new Set(t.columns ?? Eo);
    s.add("todo"), r.end_of_day_mode === "overdue" && s.add("overdue");
    const l = {
      now: i,
      enabled: s,
      mode: r.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: Jr(i, eo(t.week_end, e.locale))
    };
    this._ctx = l;
    const d = {
      hass: e,
      lang: o,
      now: i,
      parents: a,
      onOpen: (h, E) => this._open(h, E),
      onToggle: (h) => {
        Ft(e, h.uid, h.status === "completed" ? "needs_action" : "completed").catch((E) => {
          console.warn("household_kanban: set_status failed", E), this._fail("err_update");
        });
      }
    }, p = t.people ?? Object.keys(e.states).filter((h) => h.startsWith("person.")), c = this._filter, f = r.items.filter((h) => a.some((E) => E.id === h.parent)), _ = f.filter((h) => (!c.who || h.assignee === c.who) && (!c.parent || h.parent === c.parent));
    return y`<ha-card>
      ${this._notice ? y`<div class="notice" role="alert">${k(o, this._notice)}</div>` : $}
      <header>
        <div class="titles"><h1>${k(o, "title")}</h1><div class="summary">${this._summary(f, l, o)}</div></div>
        <button class="new" type="button" @click=${() => this._add("todo", a, l, "header .new")}>+ ${k(o, "new_note")}</button>
      </header>
      ${ko(d, c, p, f, (h) => {
      this._filter = { ...c, ...h };
    })}
      ${$o(_, {
      board: { ...r, parents: a },
      ctx: l,
      group: c.group,
      who: c.who,
      parent: c.parent,
      expanded: this._expanded,
      onExpand: (h, E) => {
        const N = new Set(this._expanded);
        E ? N.add(h) : N.delete(h), this._expanded = N;
      },
      onFocus: (h) => {
        this._filter = { ...c, parent: h };
      },
      onAdd: (h) => this._add(h, a, l)
    }, d)}
      ${this._draft ? vo(this._draft, {
      hass: e,
      lang: o,
      now: i,
      parents: a,
      people: p,
      busy: this._busy,
      error: this._dlgError,
      onChange: (h) => {
        this._draft && (this._draft = { ...this._draft, ...h });
      },
      onSave: () => this._save(),
      onClose: () => {
        this._draft = void 0;
      },
      onToggleDone: () => {
        var R;
        const h = this._draft, E = h == null ? void 0 : h.uid;
        if (!h || !E) return;
        const N = (R = this._board) == null ? void 0 : R.items.find((I) => I.uid === E);
        if (!N) {
          this._dlgError = "err_update";
          return;
        }
        const O = En(N, h);
        this._dialogWrite("err_update", async () => {
          Object.keys(O).length && await Ht(e, E, O), await Ft(e, E, h.status === "completed" ? "needs_action" : "completed");
        });
      },
      onDelete: () => {
        const h = this._draft;
        h != null && h.uid && this._dialogWrite("err_delete", () => Gr(e, h.uid));
      }
    }) : $}
    </ha-card>`;
  }
  _summary(e, t, r) {
    const o = e.filter((d) => d.status === "needs_action"), i = j(t.now), a = o.filter((d) => d.due && j(ee(d.due).date) < i).length, s = o.filter((d) => yt(d, t) === "today").length, l = t.mode === "overdue" ? at(r, "sum_overdue", a) : at(r, "sum_moved", o.filter((d) => d.moved > 0).length);
    return [at(r, "sum_open", o.length), at(r, "sum_today", s), l].join(" · ");
  }
};
wt.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _board: { state: !0 },
  _filter: { state: !0 },
  _expanded: { state: !0 },
  _loadFailed: { state: !0 },
  _notice: { state: !0 },
  _draft: { state: !0 },
  _busy: { state: !0 },
  _dlgError: { state: !0 }
}, wt.styles = so;
let Wt = wt;
customElements.define("household-kanban-card", Wt);
(window.customCards ?? (window.customCards = [])).push({
  type: "household-kanban-card",
  name: "Household Kanban",
  description: "Kanban board for household tasks"
});
