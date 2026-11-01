/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis, Xt = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Gt = Symbol(), rn = /* @__PURE__ */ new WeakMap();
let On = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== Gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Xt && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = rn.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && rn.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const oo = (n) => new On(typeof n == "string" ? n : n + "", void 0, Gt), ro = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((o, r, i) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[i + 1], n[0]);
  return new On(t, n, Gt);
}, io = (n, e) => {
  if (Xt) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), r = dt.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = t.cssText, n.appendChild(o);
  }
}, an = Xt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return oo(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ao, defineProperty: so, getOwnPropertyDescriptor: lo, getOwnPropertyNames: co, getOwnPropertySymbols: uo, getPrototypeOf: ho } = Object, ce = globalThis, sn = ce.trustedTypes, po = sn ? sn.emptyScript : "", St = ce.reactiveElementPolyfillSupport, Ue = (n, e) => n, Lt = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? po : null;
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
} }, Pn = (n, e) => !ao(n, e), ln = { attribute: !0, type: String, converter: Lt, reflect: !1, useDefault: !1, hasChanged: Pn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ce.litPropertyMetadata ?? (ce.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let $e = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ln) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(e, o, t);
      r !== void 0 && so(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: r, set: i } = lo(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: r, set(a) {
      const s = r == null ? void 0 : r.call(this);
      i == null || i.call(this, a), this.requestUpdate(e, s, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ln;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ue("elementProperties"))) return;
    const e = ho(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ue("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ue("properties"))) {
      const t = this.properties, o = [...co(t), ...uo(t)];
      for (const r of o) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [o, r] of t) this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, o] of this.elementProperties) {
      const r = this._$Eu(t, o);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const r of o) t.unshift(an(r));
    } else e !== void 0 && t.push(an(e));
    return t;
  }
  static _$Eu(e, t) {
    const o = t.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const o of t.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return io(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var o;
      return (o = t.hostConnected) == null ? void 0 : o.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var o;
      return (o = t.hostDisconnected) == null ? void 0 : o.call(t);
    });
  }
  attributeChangedCallback(e, t, o) {
    this._$AK(e, o);
  }
  _$ET(e, t) {
    var i;
    const o = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, o);
    if (r !== void 0 && o.reflect === !0) {
      const a = (((i = o.converter) == null ? void 0 : i.toAttribute) !== void 0 ? o.converter : Lt).toAttribute(t, o.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, a;
    const o = this.constructor, r = o._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = o.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((i = s.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? s.converter : Lt;
      this._$Em = r;
      const d = l.fromAttribute(t, s.type);
      this[r] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, r = !1, i) {
    var a;
    if (e !== void 0) {
      const s = this.constructor;
      if (r === !1 && (i = this[e]), o ?? (o = s.getPropertyOptions(e)), !((o.hasChanged ?? Pn)(i, t) || o.useDefault && o.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(s._$Eu(e, o)))) return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: o, reflect: r, wrapped: i }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), i !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [i, a] of this._$Ep) this[i] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, a] of r) {
        const { wrapped: s } = a, l = this[i];
        s !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, a, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (o = this._$EO) == null || o.forEach((r) => {
        var i;
        return (i = r.hostUpdate) == null ? void 0 : i.call(r);
      }), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((o) => {
      var r;
      return (r = o.hostUpdated) == null ? void 0 : r.call(o);
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
$e.elementStyles = [], $e.shadowRootOptions = { mode: "open" }, $e[Ue("elementProperties")] = /* @__PURE__ */ new Map(), $e[Ue("finalized")] = /* @__PURE__ */ new Map(), St == null || St({ ReactiveElement: $e }), (ce.reactiveElementVersions ?? (ce.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Be = globalThis, dn = (n) => n, bt = Be.trustedTypes, cn = bt ? bt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Mn = "$lit$", ae = `lit$${Math.random().toFixed(9).slice(2)}$`, Nn = "?" + ae, fo = `<${Nn}>`, ye = document, Ve = () => ye.createComment(""), Ze = (n) => n === null || typeof n != "object" && typeof n != "function", Vt = Array.isArray, go = (n) => Vt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Dt = `[ 	
\f\r]`, He = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, un = /-->/g, hn = />/g, fe = RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pn = /'/g, fn = /"/g, In = /^(?:script|style|textarea|title)$/i, bo = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), m = bo(1), De = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), gn = /* @__PURE__ */ new WeakMap(), ve = ye.createTreeWalker(ye, 129);
function zn(n, e) {
  if (!Vt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return cn !== void 0 ? cn.createHTML(e) : e;
}
const mo = (n, e) => {
  const t = n.length - 1, o = [];
  let r, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = He;
  for (let s = 0; s < t; s++) {
    const l = n[s];
    let d, u, c = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, u = a.exec(l), u !== null); ) f = a.lastIndex, a === He ? u[1] === "!--" ? a = un : u[1] !== void 0 ? a = hn : u[2] !== void 0 ? (In.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = fe) : u[3] !== void 0 && (a = fe) : a === fe ? u[0] === ">" ? (a = r ?? He, c = -1) : u[1] === void 0 ? c = -2 : (c = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? fe : u[3] === '"' ? fn : pn) : a === fn || a === pn ? a = fe : a === un || a === hn ? a = He : (a = fe, r = void 0);
    const _ = a === fe && n[s + 1].startsWith("/>") ? " " : "";
    i += a === He ? l + fo : c >= 0 ? (o.push(d), l.slice(0, c) + Mn + l.slice(c) + ae + _) : l + ae + (c === -2 ? s : _);
  }
  return [zn(n, i + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class Ke {
  constructor({ strings: e, _$litType$: t }, o) {
    let r;
    this.parts = [];
    let i = 0, a = 0;
    const s = e.length - 1, l = this.parts, [d, u] = mo(e, t);
    if (this.el = Ke.createElement(d, o), ve.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = ve.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(Mn)) {
          const f = u[a++], _ = r.getAttribute(c).split(ae), y = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: i, name: y[2], strings: _, ctor: y[1] === "." ? _o : y[1] === "?" ? yo : y[1] === "@" ? wo : kt }), r.removeAttribute(c);
        } else c.startsWith(ae) && (l.push({ type: 6, index: i }), r.removeAttribute(c));
        if (In.test(r.tagName)) {
          const c = r.textContent.split(ae), f = c.length - 1;
          if (f > 0) {
            r.textContent = bt ? bt.emptyScript : "";
            for (let _ = 0; _ < f; _++) r.append(c[_], Ve()), ve.nextNode(), l.push({ type: 2, index: ++i });
            r.append(c[f], Ve());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Nn) l.push({ type: 2, index: i });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(ae, c + 1)) !== -1; ) l.push({ type: 7, index: i }), c += ae.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const o = ye.createElement("template");
    return o.innerHTML = e, o;
  }
}
function Ae(n, e, t = n, o) {
  var a, s;
  if (e === De) return e;
  let r = o !== void 0 ? (a = t._$Co) == null ? void 0 : a[o] : t._$Cl;
  const i = Ze(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== i && ((s = r == null ? void 0 : r._$AO) == null || s.call(r, !1), i === void 0 ? r = void 0 : (r = new i(n), r._$AT(n, t, o)), o !== void 0 ? (t._$Co ?? (t._$Co = []))[o] = r : t._$Cl = r), r !== void 0 && (e = Ae(n, r._$AS(n, e.values), r, o)), e;
}
class vo {
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
    const { el: { content: t }, parts: o } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? ye).importNode(t, !0);
    ve.currentNode = r;
    let i = ve.nextNode(), a = 0, s = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new Je(i, i.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (d = new xo(i, this, e)), this._$AV.push(d), l = o[++s];
      }
      a !== (l == null ? void 0 : l.index) && (i = ve.nextNode(), a++);
    }
    return ve.currentNode = ye, r;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class Je {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, o, r) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = Ae(this, e, t), Ze(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== De && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : go(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== w && Ze(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ye.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: t, _$litType$: o } = e, r = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Ke.createElement(zn(o.h, o.h[0]), this.options)), o);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === r) this._$AH.p(t);
    else {
      const a = new vo(r, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = gn.get(e.strings);
    return t === void 0 && gn.set(e.strings, t = new Ke(e)), t;
  }
  k(e) {
    Vt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, r = 0;
    for (const i of e) r === t.length ? t.push(o = new Je(this.O(Ve()), this.O(Ve()), this, this.options)) : o = t[r], o._$AI(i), r++;
    r < t.length && (this._$AR(o && o._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = dn(e).nextSibling;
      dn(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class kt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, r, i) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = w;
  }
  _$AI(e, t = this, o, r) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) e = Ae(this, e, t, 0), a = !Ze(e) || e !== this._$AH && e !== De, a && (this._$AH = e);
    else {
      const s = e;
      let l, d;
      for (e = i[0], l = 0; l < i.length - 1; l++) d = Ae(this, s[o + l], t, l), d === De && (d = this._$AH[l]), a || (a = !Ze(d) || d !== this._$AH[l]), d === w ? e = w : e !== w && (e += (d ?? "") + i[l + 1]), this._$AH[l] = d;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class _o extends kt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === w ? void 0 : e;
  }
}
class yo extends kt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== w);
  }
}
class wo extends kt {
  constructor(e, t, o, r, i) {
    super(e, t, o, r, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Ae(this, e, t, 0) ?? w) === De) return;
    const o = this._$AH, r = e === w && o !== w || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, i = e !== w && (o === w || r);
    r && this.element.removeEventListener(this.name, this, o), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class xo {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ae(this, e);
  }
}
const At = Be.litHtmlPolyfillSupport;
At == null || At(Ke, Je), (Be.litHtmlVersions ?? (Be.litHtmlVersions = [])).push("3.3.3");
const $o = (n, e, t) => {
  const o = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = o._$litPart$;
  if (r === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null;
    o._$litPart$ = r = new Je(e.insertBefore(Ve(), i), i, void 0, t ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = globalThis;
class je extends $e {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = $o(t, this.renderRoot, this.renderOptions);
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
var Tn;
je._$litElement$ = !0, je.finalized = !0, (Tn = _e.litElementHydrateSupport) == null || Tn.call(_e, { LitElement: je });
const Ct = _e.litElementPolyfillSupport;
Ct == null || Ct({ LitElement: je });
(_e.litElementVersions ?? (_e.litElementVersions = [])).push("4.2.2");
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function bn(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    e && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(n, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function Z(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? bn(Object(t), !0).forEach(function(o) {
      ko(n, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : bn(Object(t)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return n;
}
function ct(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ct = function(e) {
    return typeof e;
  } : ct = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ct(n);
}
function ko(n, e, t) {
  return e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function ee() {
  return ee = Object.assign || function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
    }
    return n;
  }, ee.apply(this, arguments);
}
function Eo(n, e) {
  if (n == null) return {};
  var t = {}, o = Object.keys(n), r, i;
  for (i = 0; i < o.length; i++)
    r = o[i], !(e.indexOf(r) >= 0) && (t[r] = n[r]);
  return t;
}
function So(n, e) {
  if (n == null) return {};
  var t = Eo(n, e), o, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n);
    for (r = 0; r < i.length; r++)
      o = i[r], !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(n, o) && (t[o] = n[o]);
  }
  return t;
}
var Do = "1.15.6";
function J(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var ne = J(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Qe = J(/Edge/i), mn = J(/firefox/i), Ye = J(/safari/i) && !J(/chrome/i) && !J(/android/i), Zt = J(/iP(ad|od|hone)/i), Hn = J(/chrome/i) && J(/android/i), Rn = {
  capture: !1,
  passive: !1
};
function $(n, e, t) {
  n.addEventListener(e, t, !ne && Rn);
}
function x(n, e, t) {
  n.removeEventListener(e, t, !ne && Rn);
}
function mt(n, e) {
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
function Fn(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function W(n, e, t, o) {
  if (n) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? n.parentNode === t && mt(n, e) : mt(n, e)) || o && n === t)
        return n;
      if (n === t) break;
    } while (n = Fn(n));
  }
  return null;
}
var vn = /\s+/g;
function B(n, e, t) {
  if (n && e)
    if (n.classList)
      n.classList[t ? "add" : "remove"](e);
    else {
      var o = (" " + n.className + " ").replace(vn, " ").replace(" " + e + " ", " ");
      n.className = (o + (t ? " " + e : "")).replace(vn, " ");
    }
}
function g(n, e, t) {
  var o = n && n.style;
  if (o) {
    if (t === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? t = document.defaultView.getComputedStyle(n, "") : n.currentStyle && (t = n.currentStyle), e === void 0 ? t : t[e];
    !(e in o) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), o[e] = t + (typeof t == "string" ? "" : "px");
  }
}
function Se(n, e) {
  var t = "";
  if (typeof n == "string")
    t = n;
  else
    do {
      var o = g(n, "transform");
      o && o !== "none" && (t = o + " " + t);
    } while (!e && (n = n.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(t);
}
function Ln(n, e, t) {
  if (n) {
    var o = n.getElementsByTagName(e), r = 0, i = o.length;
    if (t)
      for (; r < i; r++)
        t(o[r], r);
    return o;
  }
  return [];
}
function V() {
  var n = document.scrollingElement;
  return n || document.documentElement;
}
function T(n, e, t, o, r) {
  if (!(!n.getBoundingClientRect && n !== window)) {
    var i, a, s, l, d, u, c;
    if (n !== window && n.parentNode && n !== V() ? (i = n.getBoundingClientRect(), a = i.top, s = i.left, l = i.bottom, d = i.right, u = i.height, c = i.width) : (a = 0, s = 0, l = window.innerHeight, d = window.innerWidth, u = window.innerHeight, c = window.innerWidth), (e || t) && n !== window && (r = r || n.parentNode, !ne))
      do
        if (r && r.getBoundingClientRect && (g(r, "transform") !== "none" || t && g(r, "position") !== "static")) {
          var f = r.getBoundingClientRect();
          a -= f.top + parseInt(g(r, "border-top-width")), s -= f.left + parseInt(g(r, "border-left-width")), l = a + i.height, d = s + i.width;
          break;
        }
      while (r = r.parentNode);
    if (o && n !== window) {
      var _ = Se(r || n), y = _ && _.a, p = _ && _.d;
      _ && (a /= p, s /= y, c /= y, u /= p, l = a + u, d = s + c);
    }
    return {
      top: a,
      left: s,
      bottom: l,
      right: d,
      width: c,
      height: u
    };
  }
}
function _n(n, e, t) {
  for (var o = le(n, !0), r = T(n)[e]; o; ) {
    var i = T(o)[t], a = void 0;
    if (a = r >= i, !a) return o;
    if (o === V()) break;
    o = le(o, !1);
  }
  return !1;
}
function Ce(n, e, t, o) {
  for (var r = 0, i = 0, a = n.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== b.ghost && (o || a[i] !== b.dragged) && W(a[i], t.draggable, n, !1)) {
      if (r === e)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function Kt(n, e) {
  for (var t = n.lastElementChild; t && (t === b.ghost || g(t, "display") === "none" || e && !mt(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function Y(n, e) {
  var t = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== b.clone && (!e || mt(n, e)) && t++;
  return t;
}
function yn(n) {
  var e = 0, t = 0, o = V();
  if (n)
    do {
      var r = Se(n), i = r.a, a = r.d;
      e += n.scrollLeft * i, t += n.scrollTop * a;
    } while (n !== o && (n = n.parentNode));
  return [e, t];
}
function Ao(n, e) {
  for (var t in n)
    if (n.hasOwnProperty(t)) {
      for (var o in e)
        if (e.hasOwnProperty(o) && e[o] === n[t][o]) return Number(t);
    }
  return -1;
}
function le(n, e) {
  if (!n || !n.getBoundingClientRect) return V();
  var t = n, o = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var r = g(t);
      if (t.clientWidth < t.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return V();
        if (o || e) return t;
        o = !0;
      }
    }
  while (t = t.parentNode);
  return V();
}
function Co(n, e) {
  if (n && e)
    for (var t in e)
      e.hasOwnProperty(t) && (n[t] = e[t]);
  return n;
}
function Tt(n, e) {
  return Math.round(n.top) === Math.round(e.top) && Math.round(n.left) === Math.round(e.left) && Math.round(n.height) === Math.round(e.height) && Math.round(n.width) === Math.round(e.width);
}
var qe;
function Un(n, e) {
  return function() {
    if (!qe) {
      var t = arguments, o = this;
      t.length === 1 ? n.call(o, t[0]) : n.apply(o, t), qe = setTimeout(function() {
        qe = void 0;
      }, e);
    }
  };
}
function To() {
  clearTimeout(qe), qe = void 0;
}
function Bn(n, e, t) {
  n.scrollLeft += e, n.scrollTop += t;
}
function jn(n) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(n).cloneNode(!0) : t ? t(n).clone(!0)[0] : n.cloneNode(!0);
}
function Yn(n, e, t) {
  var o = {};
  return Array.from(n.children).forEach(function(r) {
    var i, a, s, l;
    if (!(!W(r, e.draggable, n, !1) || r.animated || r === t)) {
      var d = T(r);
      o.left = Math.min((i = o.left) !== null && i !== void 0 ? i : 1 / 0, d.left), o.top = Math.min((a = o.top) !== null && a !== void 0 ? a : 1 / 0, d.top), o.right = Math.max((s = o.right) !== null && s !== void 0 ? s : -1 / 0, d.right), o.bottom = Math.max((l = o.bottom) !== null && l !== void 0 ? l : -1 / 0, d.bottom);
    }
  }), o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
var F = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Oo() {
  var n = [], e;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(r) {
          if (!(g(r, "display") === "none" || r === b.ghost)) {
            n.push({
              target: r,
              rect: T(r)
            });
            var i = Z({}, n[n.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = Se(r, !0);
              a && (i.top -= a.f, i.left -= a.e);
            }
            r.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function(o) {
      n.push(o);
    },
    removeAnimationState: function(o) {
      n.splice(Ao(n, {
        target: o
      }), 1);
    },
    animateAll: function(o) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof o == "function" && o();
        return;
      }
      var i = !1, a = 0;
      n.forEach(function(s) {
        var l = 0, d = s.target, u = d.fromRect, c = T(d), f = d.prevFromRect, _ = d.prevToRect, y = s.rect, p = Se(d, !0);
        p && (c.top -= p.f, c.left -= p.e), d.toRect = c, d.thisAnimationDuration && Tt(f, c) && !Tt(u, c) && // Make sure animatingRect is on line between toRect & fromRect
        (y.top - c.top) / (y.left - c.left) === (u.top - c.top) / (u.left - c.left) && (l = Mo(y, f, _, r.options)), Tt(c, u) || (d.prevFromRect = u, d.prevToRect = c, l || (l = r.options.animation), r.animate(d, y, c, l)), l && (i = !0, a = Math.max(a, l), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, l), d.thisAnimationDuration = l);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, a) : typeof o == "function" && o(), n = [];
    },
    animate: function(o, r, i, a) {
      if (a) {
        g(o, "transition", ""), g(o, "transform", "");
        var s = Se(this.el), l = s && s.a, d = s && s.d, u = (r.left - i.left) / (l || 1), c = (r.top - i.top) / (d || 1);
        o.animatingX = !!u, o.animatingY = !!c, g(o, "transform", "translate3d(" + u + "px," + c + "px,0)"), this.forRepaintDummy = Po(o), g(o, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), g(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          g(o, "transition", ""), g(o, "transform", ""), o.animated = !1, o.animatingX = !1, o.animatingY = !1;
        }, a);
      }
    }
  };
}
function Po(n) {
  return n.offsetWidth;
}
function Mo(n, e, t, o) {
  return Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * o.animation;
}
var we = [], Ot = {
  initializeByDefault: !0
}, et = {
  mount: function(e) {
    for (var t in Ot)
      Ot.hasOwnProperty(t) && !(t in e) && (e[t] = Ot[t]);
    we.forEach(function(o) {
      if (o.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), we.push(e);
  },
  pluginEvent: function(e, t, o) {
    var r = this;
    this.eventCanceled = !1, o.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = e + "Global";
    we.forEach(function(a) {
      t[a.pluginName] && (t[a.pluginName][i] && t[a.pluginName][i](Z({
        sortable: t
      }, o)), t.options[a.pluginName] && t[a.pluginName][e] && t[a.pluginName][e](Z({
        sortable: t
      }, o)));
    });
  },
  initializePlugins: function(e, t, o, r) {
    we.forEach(function(s) {
      var l = s.pluginName;
      if (!(!e.options[l] && !s.initializeByDefault)) {
        var d = new s(e, t, e.options);
        d.sortable = e, d.options = e.options, e[l] = d, ee(o, d.defaults);
      }
    });
    for (var i in e.options)
      if (e.options.hasOwnProperty(i)) {
        var a = this.modifyOption(e, i, e.options[i]);
        typeof a < "u" && (e.options[i] = a);
      }
  },
  getEventProperties: function(e, t) {
    var o = {};
    return we.forEach(function(r) {
      typeof r.eventProperties == "function" && ee(o, r.eventProperties.call(t[r.pluginName], e));
    }), o;
  },
  modifyOption: function(e, t, o) {
    var r;
    return we.forEach(function(i) {
      e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], o));
    }), r;
  }
};
function No(n) {
  var e = n.sortable, t = n.rootEl, o = n.name, r = n.targetEl, i = n.cloneEl, a = n.toEl, s = n.fromEl, l = n.oldIndex, d = n.newIndex, u = n.oldDraggableIndex, c = n.newDraggableIndex, f = n.originalEvent, _ = n.putSortable, y = n.extraEventProperties;
  if (e = e || t && t[F], !!e) {
    var p, E = e.options, M = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !ne && !Qe ? p = new CustomEvent(o, {
      bubbles: !0,
      cancelable: !0
    }) : (p = document.createEvent("Event"), p.initEvent(o, !0, !0)), p.to = a || t, p.from = s || t, p.item = r || t, p.clone = i, p.oldIndex = l, p.newIndex = d, p.oldDraggableIndex = u, p.newDraggableIndex = c, p.originalEvent = f, p.pullMode = _ ? _.lastPutMode : void 0;
    var O = Z(Z({}, y), et.getEventProperties(o, e));
    for (var H in O)
      p[H] = O[H];
    t && t.dispatchEvent(p), E[M] && E[M].call(e, p);
  }
}
var Io = ["evt"], R = function(e, t) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = o.evt, i = So(o, Io);
  et.pluginEvent.bind(b)(e, t, Z({
    dragEl: h,
    parentEl: A,
    ghostEl: v,
    rootEl: S,
    nextEl: me,
    lastDownEl: ut,
    cloneEl: D,
    cloneHidden: se,
    dragStarted: Re,
    putSortable: P,
    activeSortable: b.active,
    originalEvent: r,
    oldIndex: Ee,
    oldDraggableIndex: We,
    newIndex: j,
    newDraggableIndex: ie,
    hideGhostForTarget: Gn,
    unhideGhostForTarget: Vn,
    cloneNowHidden: function() {
      se = !0;
    },
    cloneNowShown: function() {
      se = !1;
    },
    dispatchSortableEvent: function(s) {
      z({
        sortable: t,
        name: s,
        originalEvent: r
      });
    }
  }, i));
};
function z(n) {
  No(Z({
    putSortable: P,
    cloneEl: D,
    targetEl: h,
    rootEl: S,
    oldIndex: Ee,
    oldDraggableIndex: We,
    newIndex: j,
    newDraggableIndex: ie
  }, n));
}
var h, A, v, S, me, ut, D, se, Ee, j, We, ie, ot, P, ke = !1, vt = !1, _t = [], ge, q, Pt, Mt, wn, xn, Re, xe, Xe, Ge = !1, rt = !1, ht, N, Nt = [], Ut = !1, yt = [], Et = typeof document < "u", it = Zt, $n = Qe || ne ? "cssFloat" : "float", zo = Et && !Hn && !Zt && "draggable" in document.createElement("div"), qn = (function() {
  if (Et) {
    if (ne)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
})(), Wn = function(e, t) {
  var o = g(e), r = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), i = Ce(e, 0, t), a = Ce(e, 1, t), s = i && g(i), l = a && g(a), d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + T(i).width, u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + T(a).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return i && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || d >= r && o[$n] === "none" || a && o[$n] === "none" && d + u > r) ? "vertical" : "horizontal";
}, Ho = function(e, t, o) {
  var r = o ? e.left : e.top, i = o ? e.right : e.bottom, a = o ? e.width : e.height, s = o ? t.left : t.top, l = o ? t.right : t.bottom, d = o ? t.width : t.height;
  return r === s || i === l || r + a / 2 === s + d / 2;
}, Ro = function(e, t) {
  var o;
  return _t.some(function(r) {
    var i = r[F].options.emptyInsertThreshold;
    if (!(!i || Kt(r))) {
      var a = T(r), s = e >= a.left - i && e <= a.right + i, l = t >= a.top - i && t <= a.bottom + i;
      if (s && l)
        return o = r;
    }
  }), o;
}, Xn = function(e) {
  function t(i, a) {
    return function(s, l, d, u) {
      var c = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
      if (i == null && (a || c))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return t(i(s, l, d, u), a)(s, l, d, u);
      var f = (a ? s : l).options.group.name;
      return i === !0 || typeof i == "string" && i === f || i.join && i.indexOf(f) > -1;
    };
  }
  var o = {}, r = e.group;
  (!r || ct(r) != "object") && (r = {
    name: r
  }), o.name = r.name, o.checkPull = t(r.pull, !0), o.checkPut = t(r.put), o.revertClone = r.revertClone, e.group = o;
}, Gn = function() {
  !qn && v && g(v, "display", "none");
}, Vn = function() {
  !qn && v && g(v, "display", "");
};
Et && !Hn && document.addEventListener("click", function(n) {
  if (vt)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), vt = !1, !1;
}, !0);
var be = function(e) {
  if (h) {
    e = e.touches ? e.touches[0] : e;
    var t = Ro(e.clientX, e.clientY);
    if (t) {
      var o = {};
      for (var r in e)
        e.hasOwnProperty(r) && (o[r] = e[r]);
      o.target = o.rootEl = t, o.preventDefault = void 0, o.stopPropagation = void 0, t[F]._onDragOver(o);
    }
  }
}, Fo = function(e) {
  h && h.parentNode[F]._isOutsideThisEl(e.target);
};
function b(n, e) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = e = ee({}, e), n[F] = this;
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
      return Wn(n, this.options);
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
    supportPointer: b.supportPointer !== !1 && "PointerEvent" in window && (!Ye || Zt),
    emptyInsertThreshold: 5
  };
  et.initializePlugins(this, n, t);
  for (var o in t)
    !(o in e) && (e[o] = t[o]);
  Xn(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : zo, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? $(n, "pointerdown", this._onTapStart) : ($(n, "mousedown", this._onTapStart), $(n, "touchstart", this._onTapStart)), this.nativeDraggable && ($(n, "dragover", this), $(n, "dragenter", this)), _t.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ee(this, Oo());
}
b.prototype = /** @lends Sortable.prototype */
{
  constructor: b,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (xe = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, h) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, o = this.el, r = this.options, i = r.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, d = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, u = r.filter;
      if (Xo(o), !h && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Ye && l && l.tagName.toUpperCase() === "SELECT") && (l = W(l, r.draggable, o, !1), !(l && l.animated) && ut !== l)) {
        if (Ee = Y(l), We = Y(l, r.draggable), typeof u == "function") {
          if (u.call(this, e, l, this)) {
            z({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: l,
              toEl: o,
              fromEl: o
            }), R("filter", t, {
              evt: e
            }), i && e.preventDefault();
            return;
          }
        } else if (u && (u = u.split(",").some(function(c) {
          if (c = W(d, c.trim(), o, !1), c)
            return z({
              sortable: t,
              rootEl: c,
              name: "filter",
              targetEl: l,
              fromEl: o,
              toEl: o
            }), R("filter", t, {
              evt: e
            }), !0;
        }), u)) {
          i && e.preventDefault();
          return;
        }
        r.handle && !W(d, r.handle, o, !1) || this._prepareDragStart(e, s, l);
      }
    }
  },
  _prepareDragStart: function(e, t, o) {
    var r = this, i = r.el, a = r.options, s = i.ownerDocument, l;
    if (o && !h && o.parentNode === i) {
      var d = T(o);
      if (S = i, h = o, A = h.parentNode, me = h.nextSibling, ut = o, ot = a.group, b.dragged = h, ge = {
        target: h,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, wn = ge.clientX - d.left, xn = ge.clientY - d.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, h.style["will-change"] = "all", l = function() {
        if (R("delayEnded", r, {
          evt: e
        }), b.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !mn && r.nativeDraggable && (h.draggable = !0), r._triggerDragStart(e, t), z({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), B(h, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(u) {
        Ln(h, u.trim(), It);
      }), $(s, "dragover", be), $(s, "mousemove", be), $(s, "touchmove", be), a.supportPointer ? ($(s, "pointerup", r._onDrop), !this.nativeDraggable && $(s, "pointercancel", r._onDrop)) : ($(s, "mouseup", r._onDrop), $(s, "touchend", r._onDrop), $(s, "touchcancel", r._onDrop)), mn && this.nativeDraggable && (this.options.touchStartThreshold = 4, h.draggable = !0), R("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(Qe || ne))) {
        if (b.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? ($(s, "pointerup", r._disableDelayedDrag), $(s, "pointercancel", r._disableDelayedDrag)) : ($(s, "mouseup", r._disableDelayedDrag), $(s, "touchend", r._disableDelayedDrag), $(s, "touchcancel", r._disableDelayedDrag)), $(s, "mousemove", r._delayedDragTouchMoveHandler), $(s, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && $(s, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(l, a.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    h && It(h), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    x(e, "mouseup", this._disableDelayedDrag), x(e, "touchend", this._disableDelayedDrag), x(e, "touchcancel", this._disableDelayedDrag), x(e, "pointerup", this._disableDelayedDrag), x(e, "pointercancel", this._disableDelayedDrag), x(e, "mousemove", this._delayedDragTouchMoveHandler), x(e, "touchmove", this._delayedDragTouchMoveHandler), x(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? $(document, "pointermove", this._onTouchMove) : t ? $(document, "touchmove", this._onTouchMove) : $(document, "mousemove", this._onTouchMove) : ($(h, "dragend", this), $(S, "dragstart", this._onDragStart));
    try {
      document.selection ? pt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (ke = !1, S && h) {
      R("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && $(document, "dragover", Fo);
      var o = this.options;
      !e && B(h, o.dragClass, !1), B(h, o.ghostClass, !0), b.active = this, e && this._appendGhost(), z({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (q) {
      this._lastX = q.clientX, this._lastY = q.clientY, Gn();
      for (var e = document.elementFromPoint(q.clientX, q.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(q.clientX, q.clientY), e !== t); )
        t = e;
      if (h.parentNode[F]._isOutsideThisEl(e), t)
        do {
          if (t[F]) {
            var o = void 0;
            if (o = t[F]._onDragOver({
              clientX: q.clientX,
              clientY: q.clientY,
              target: e,
              rootEl: t
            }), o && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = Fn(t));
      Vn();
    }
  },
  _onTouchMove: function(e) {
    if (ge) {
      var t = this.options, o = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = v && Se(v, !0), s = v && a && a.a, l = v && a && a.d, d = it && N && yn(N), u = (i.clientX - ge.clientX + r.x) / (s || 1) + (d ? d[0] - Nt[0] : 0) / (s || 1), c = (i.clientY - ge.clientY + r.y) / (l || 1) + (d ? d[1] - Nt[1] : 0) / (l || 1);
      if (!b.active && !ke) {
        if (o && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < o)
          return;
        this._onDragStart(e, !0);
      }
      if (v) {
        a ? (a.e += u - (Pt || 0), a.f += c - (Mt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: u,
          f: c
        };
        var f = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        g(v, "webkitTransform", f), g(v, "mozTransform", f), g(v, "msTransform", f), g(v, "transform", f), Pt = u, Mt = c, q = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!v) {
      var e = this.options.fallbackOnBody ? document.body : S, t = T(h, !0, it, !0, e), o = this.options;
      if (it) {
        for (N = e; g(N, "position") === "static" && g(N, "transform") === "none" && N !== document; )
          N = N.parentNode;
        N !== document.body && N !== document.documentElement ? (N === document && (N = V()), t.top += N.scrollTop, t.left += N.scrollLeft) : N = V(), Nt = yn(N);
      }
      v = h.cloneNode(!0), B(v, o.ghostClass, !1), B(v, o.fallbackClass, !0), B(v, o.dragClass, !0), g(v, "transition", ""), g(v, "transform", ""), g(v, "box-sizing", "border-box"), g(v, "margin", 0), g(v, "top", t.top), g(v, "left", t.left), g(v, "width", t.width), g(v, "height", t.height), g(v, "opacity", "0.8"), g(v, "position", it ? "absolute" : "fixed"), g(v, "zIndex", "100000"), g(v, "pointerEvents", "none"), b.ghost = v, e.appendChild(v), g(v, "transform-origin", wn / parseInt(v.style.width) * 100 + "% " + xn / parseInt(v.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var o = this, r = e.dataTransfer, i = o.options;
    if (R("dragStart", this, {
      evt: e
    }), b.eventCanceled) {
      this._onDrop();
      return;
    }
    R("setupClone", this), b.eventCanceled || (D = jn(h), D.removeAttribute("id"), D.draggable = !1, D.style["will-change"] = "", this._hideClone(), B(D, this.options.chosenClass, !1), b.clone = D), o.cloneId = pt(function() {
      R("clone", o), !b.eventCanceled && (o.options.removeCloneOnHide || S.insertBefore(D, h), o._hideClone(), z({
        sortable: o,
        name: "clone"
      }));
    }), !t && B(h, i.dragClass, !0), t ? (vt = !0, o._loopId = setInterval(o._emulateDragOver, 50)) : (x(document, "mouseup", o._onDrop), x(document, "touchend", o._onDrop), x(document, "touchcancel", o._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(o, r, h)), $(document, "drop", o), g(h, "transform", "translateZ(0)")), ke = !0, o._dragStartId = pt(o._dragStarted.bind(o, t, e)), $(document, "selectstart", o), Re = !0, window.getSelection().removeAllRanges(), Ye && g(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, o = e.target, r, i, a, s = this.options, l = s.group, d = b.active, u = ot === l, c = s.sort, f = P || d, _, y = this, p = !1;
    if (Ut) return;
    function E(ze, to) {
      R(ze, y, Z({
        evt: e,
        isOwner: u,
        axis: _ ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: c,
        fromSortable: f,
        target: o,
        completed: O,
        onMove: function(on, no) {
          return at(S, t, h, r, on, T(on), e, no);
        },
        changed: H
      }, to));
    }
    function M() {
      E("dragOverAnimationCapture"), y.captureAnimationState(), y !== f && f.captureAnimationState();
    }
    function O(ze) {
      return E("dragOverCompleted", {
        insertion: ze
      }), ze && (u ? d._hideClone() : d._showClone(y), y !== f && (B(h, P ? P.options.ghostClass : d.options.ghostClass, !1), B(h, s.ghostClass, !0)), P !== y && y !== b.active ? P = y : y === b.active && P && (P = null), f === y && (y._ignoreWhileAnimating = o), y.animateAll(function() {
        E("dragOverAnimationComplete"), y._ignoreWhileAnimating = null;
      }), y !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (o === h && !h.animated || o === t && !o.animated) && (xe = null), !s.dragoverBubble && !e.rootEl && o !== document && (h.parentNode[F]._isOutsideThisEl(e.target), !ze && be(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), p = !0;
    }
    function H() {
      j = Y(h), ie = Y(h, s.draggable), z({
        sortable: y,
        name: "change",
        toEl: t,
        newIndex: j,
        newDraggableIndex: ie,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = W(o, s.draggable, t, !0), E("dragOver"), b.eventCanceled) return p;
    if (h.contains(e.target) || o.animated && o.animatingX && o.animatingY || y._ignoreWhileAnimating === o)
      return O(!1);
    if (vt = !1, d && !s.disabled && (u ? c || (a = A !== S) : P === this || (this.lastPutMode = ot.checkPull(this, d, h, e)) && l.checkPut(this, d, h, e))) {
      if (_ = this._getDirection(e, o) === "vertical", r = T(h), E("dragOverValid"), b.eventCanceled) return p;
      if (a)
        return A = S, M(), this._hideClone(), E("revert"), b.eventCanceled || (me ? S.insertBefore(h, me) : S.appendChild(h)), O(!0);
      var I = Kt(t, s.draggable);
      if (!I || jo(e, _, this) && !I.animated) {
        if (I === h)
          return O(!1);
        if (I && t === e.target && (o = I), o && (i = T(o)), at(S, t, h, r, o, i, e, !!o) !== !1)
          return M(), I && I.nextSibling ? t.insertBefore(h, I.nextSibling) : t.appendChild(h), A = t, H(), O(!0);
      } else if (I && Bo(e, _, this)) {
        var ue = Ce(t, 0, s, !0);
        if (ue === h)
          return O(!1);
        if (o = ue, i = T(o), at(S, t, h, r, o, i, e, !1) !== !1)
          return M(), t.insertBefore(h, ue), A = t, H(), O(!0);
      } else if (o.parentNode === t) {
        i = T(o);
        var X = 0, he, Pe = h.parentNode !== t, U = !Ho(h.animated && h.toRect || r, o.animated && o.toRect || i, _), Me = _ ? "top" : "left", oe = _n(o, "top", "top") || _n(h, "top", "top"), Ne = oe ? oe.scrollTop : void 0;
        xe !== o && (he = i[Me], Ge = !1, rt = !U && s.invertSwap || Pe), X = Yo(e, o, i, _, U ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, rt, xe === o);
        var K;
        if (X !== 0) {
          var pe = Y(h);
          do
            pe -= X, K = A.children[pe];
          while (K && (g(K, "display") === "none" || K === v));
        }
        if (X === 0 || K === o)
          return O(!1);
        xe = o, Xe = X;
        var Ie = o.nextElementSibling, re = !1;
        re = X === 1;
        var nt = at(S, t, h, r, o, i, e, re);
        if (nt !== !1)
          return (nt === 1 || nt === -1) && (re = nt === 1), Ut = !0, setTimeout(Uo, 30), M(), re && !Ie ? t.appendChild(h) : o.parentNode.insertBefore(h, re ? Ie : o), oe && Bn(oe, 0, Ne - oe.scrollTop), A = h.parentNode, he !== void 0 && !rt && (ht = Math.abs(he - T(o)[Me])), H(), O(!0);
      }
      if (t.contains(h))
        return O(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    x(document, "mousemove", this._onTouchMove), x(document, "touchmove", this._onTouchMove), x(document, "pointermove", this._onTouchMove), x(document, "dragover", be), x(document, "mousemove", be), x(document, "touchmove", be);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    x(e, "mouseup", this._onDrop), x(e, "touchend", this._onDrop), x(e, "pointerup", this._onDrop), x(e, "pointercancel", this._onDrop), x(e, "touchcancel", this._onDrop), x(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, o = this.options;
    if (j = Y(h), ie = Y(h, o.draggable), R("drop", this, {
      evt: e
    }), A = h && h.parentNode, j = Y(h), ie = Y(h, o.draggable), b.eventCanceled) {
      this._nulling();
      return;
    }
    ke = !1, rt = !1, Ge = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Bt(this.cloneId), Bt(this._dragStartId), this.nativeDraggable && (x(document, "drop", this), x(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ye && g(document.body, "user-select", ""), g(h, "transform", ""), e && (Re && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), v && v.parentNode && v.parentNode.removeChild(v), (S === A || P && P.lastPutMode !== "clone") && D && D.parentNode && D.parentNode.removeChild(D), h && (this.nativeDraggable && x(h, "dragend", this), It(h), h.style["will-change"] = "", Re && !ke && B(h, P ? P.options.ghostClass : this.options.ghostClass, !1), B(h, this.options.chosenClass, !1), z({
      sortable: this,
      name: "unchoose",
      toEl: A,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), S !== A ? (j >= 0 && (z({
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
    })), P && P.save()) : j !== Ee && j >= 0 && (z({
      sortable: this,
      name: "update",
      toEl: A,
      originalEvent: e
    }), z({
      sortable: this,
      name: "sort",
      toEl: A,
      originalEvent: e
    })), b.active && ((j == null || j === -1) && (j = Ee, ie = We), z({
      sortable: this,
      name: "end",
      toEl: A,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    R("nulling", this), S = h = A = v = me = D = ut = se = ge = q = Re = j = ie = Ee = We = xe = Xe = P = ot = b.dragged = b.ghost = b.clone = b.active = null, yt.forEach(function(e) {
      e.checked = !0;
    }), yt.length = Pt = Mt = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        h && (this._onDragOver(e), Lo(e));
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
    for (var e = [], t, o = this.el.children, r = 0, i = o.length, a = this.options; r < i; r++)
      t = o[r], W(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || Wo(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var o = {}, r = this.el;
    this.toArray().forEach(function(i, a) {
      var s = r.children[a];
      W(s, this.options.draggable, r, !1) && (o[i] = s);
    }, this), t && this.captureAnimationState(), e.forEach(function(i) {
      o[i] && (r.removeChild(o[i]), r.appendChild(o[i]));
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
    return W(e, t || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, t) {
    var o = this.options;
    if (t === void 0)
      return o[e];
    var r = et.modifyOption(this, e, t);
    typeof r < "u" ? o[e] = r : o[e] = t, e === "group" && Xn(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    R("destroy", this);
    var e = this.el;
    e[F] = null, x(e, "mousedown", this._onTapStart), x(e, "touchstart", this._onTapStart), x(e, "pointerdown", this._onTapStart), this.nativeDraggable && (x(e, "dragover", this), x(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), _t.splice(_t.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!se) {
      if (R("hideClone", this), b.eventCanceled) return;
      g(D, "display", "none"), this.options.removeCloneOnHide && D.parentNode && D.parentNode.removeChild(D), se = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (se) {
      if (R("showClone", this), b.eventCanceled) return;
      h.parentNode == S && !this.options.group.revertClone ? S.insertBefore(D, h) : me ? S.insertBefore(D, me) : S.appendChild(D), this.options.group.revertClone && this.animate(h, D), g(D, "display", ""), se = !1;
    }
  }
};
function Lo(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function at(n, e, t, o, r, i, a, s) {
  var l, d = n[F], u = d.options.onMove, c;
  return window.CustomEvent && !ne && !Qe ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = n, l.dragged = t, l.draggedRect = o, l.related = r || e, l.relatedRect = i || T(e), l.willInsertAfter = s, l.originalEvent = a, n.dispatchEvent(l), u && (c = u.call(d, l, a)), c;
}
function It(n) {
  n.draggable = !1;
}
function Uo() {
  Ut = !1;
}
function Bo(n, e, t) {
  var o = T(Ce(t.el, 0, t.options, !0)), r = Yn(t.el, t.options, v), i = 10;
  return e ? n.clientX < r.left - i || n.clientY < o.top && n.clientX < o.right : n.clientY < r.top - i || n.clientY < o.bottom && n.clientX < o.left;
}
function jo(n, e, t) {
  var o = T(Kt(t.el, t.options.draggable)), r = Yn(t.el, t.options, v), i = 10;
  return e ? n.clientX > r.right + i || n.clientY > o.bottom && n.clientX > o.left : n.clientY > r.bottom + i || n.clientX > o.right && n.clientY > o.top;
}
function Yo(n, e, t, o, r, i, a, s) {
  var l = o ? n.clientY : n.clientX, d = o ? t.height : t.width, u = o ? t.top : t.left, c = o ? t.bottom : t.right, f = !1;
  if (!a) {
    if (s && ht < d * r) {
      if (!Ge && (Xe === 1 ? l > u + d * i / 2 : l < c - d * i / 2) && (Ge = !0), Ge)
        f = !0;
      else if (Xe === 1 ? l < u + ht : l > c - ht)
        return -Xe;
    } else if (l > u + d * (1 - r) / 2 && l < c - d * (1 - r) / 2)
      return qo(e);
  }
  return f = f || a, f && (l < u + d * i / 2 || l > c - d * i / 2) ? l > u + d / 2 ? 1 : -1 : 0;
}
function qo(n) {
  return Y(h) < Y(n) ? 1 : -1;
}
function Wo(n) {
  for (var e = n.tagName + n.className + n.src + n.href + n.textContent, t = e.length, o = 0; t--; )
    o += e.charCodeAt(t);
  return o.toString(36);
}
function Xo(n) {
  yt.length = 0;
  for (var e = n.getElementsByTagName("input"), t = e.length; t--; ) {
    var o = e[t];
    o.checked && yt.push(o);
  }
}
function pt(n) {
  return setTimeout(n, 0);
}
function Bt(n) {
  return clearTimeout(n);
}
Et && $(document, "touchmove", function(n) {
  (b.active || ke) && n.cancelable && n.preventDefault();
});
b.utils = {
  on: $,
  off: x,
  css: g,
  find: Ln,
  is: function(e, t) {
    return !!W(e, t, e, !1);
  },
  extend: Co,
  throttle: Un,
  closest: W,
  toggleClass: B,
  clone: jn,
  index: Y,
  nextTick: pt,
  cancelNextTick: Bt,
  detectDirection: Wn,
  getChild: Ce,
  expando: F
};
b.get = function(n) {
  return n[F];
};
b.mount = function() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (b.utils = Z(Z({}, b.utils), o.utils)), et.mount(o);
  });
};
b.create = function(n, e) {
  return new b(n, e);
};
b.version = Do;
var C = [], Fe, jt, Yt = !1, zt, Ht, wt, Le;
function Go() {
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
      var o = t.originalEvent;
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? $(document, "pointermove", this._handleFallbackAutoScroll) : o.touches ? $(document, "touchmove", this._handleFallbackAutoScroll) : $(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var o = t.originalEvent;
      !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
    },
    drop: function() {
      this.sortable.nativeDraggable ? x(document, "dragover", this._handleAutoScroll) : (x(document, "pointermove", this._handleFallbackAutoScroll), x(document, "touchmove", this._handleFallbackAutoScroll), x(document, "mousemove", this._handleFallbackAutoScroll)), kn(), ft(), To();
    },
    nulling: function() {
      wt = jt = Fe = Yt = Le = zt = Ht = null, C.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, o) {
      var r = this, i = (t.touches ? t.touches[0] : t).clientX, a = (t.touches ? t.touches[0] : t).clientY, s = document.elementFromPoint(i, a);
      if (wt = t, o || this.options.forceAutoScrollFallback || Qe || ne || Ye) {
        Rt(t, this.options, s, o);
        var l = le(s, !0);
        Yt && (!Le || i !== zt || a !== Ht) && (Le && kn(), Le = setInterval(function() {
          var d = le(document.elementFromPoint(i, a), !0);
          d !== l && (l = d, ft()), Rt(t, r.options, d, o);
        }, 10), zt = i, Ht = a);
      } else {
        if (!this.options.bubbleScroll || le(s, !0) === V()) {
          ft();
          return;
        }
        Rt(t, this.options, le(s, !1), !1);
      }
    }
  }, ee(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function ft() {
  C.forEach(function(n) {
    clearInterval(n.pid);
  }), C = [];
}
function kn() {
  clearInterval(Le);
}
var Rt = Un(function(n, e, t, o) {
  if (e.scroll) {
    var r = (n.touches ? n.touches[0] : n).clientX, i = (n.touches ? n.touches[0] : n).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = V(), d = !1, u;
    jt !== t && (jt = t, ft(), Fe = e.scroll, u = e.scrollFn, Fe === !0 && (Fe = le(t, !0)));
    var c = 0, f = Fe;
    do {
      var _ = f, y = T(_), p = y.top, E = y.bottom, M = y.left, O = y.right, H = y.width, I = y.height, ue = void 0, X = void 0, he = _.scrollWidth, Pe = _.scrollHeight, U = g(_), Me = _.scrollLeft, oe = _.scrollTop;
      _ === l ? (ue = H < he && (U.overflowX === "auto" || U.overflowX === "scroll" || U.overflowX === "visible"), X = I < Pe && (U.overflowY === "auto" || U.overflowY === "scroll" || U.overflowY === "visible")) : (ue = H < he && (U.overflowX === "auto" || U.overflowX === "scroll"), X = I < Pe && (U.overflowY === "auto" || U.overflowY === "scroll"));
      var Ne = ue && (Math.abs(O - r) <= a && Me + H < he) - (Math.abs(M - r) <= a && !!Me), K = X && (Math.abs(E - i) <= a && oe + I < Pe) - (Math.abs(p - i) <= a && !!oe);
      if (!C[c])
        for (var pe = 0; pe <= c; pe++)
          C[pe] || (C[pe] = {});
      (C[c].vx != Ne || C[c].vy != K || C[c].el !== _) && (C[c].el = _, C[c].vx = Ne, C[c].vy = K, clearInterval(C[c].pid), (Ne != 0 || K != 0) && (d = !0, C[c].pid = setInterval((function() {
        o && this.layer === 0 && b.active._onTouchMove(wt);
        var Ie = C[this.layer].vy ? C[this.layer].vy * s : 0, re = C[this.layer].vx ? C[this.layer].vx * s : 0;
        typeof u == "function" && u.call(b.dragged.parentNode[F], re, Ie, n, wt, C[this.layer].el) !== "continue" || Bn(C[this.layer].el, re, Ie);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && f !== l && (f = le(f, !1)));
    Yt = d;
  }
}, 30), Zn = function(e) {
  var t = e.originalEvent, o = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, s = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var d = o || i;
    s();
    var u = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, c = document.elementFromPoint(u.clientX, u.clientY);
    l(), d && !d.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: o
    }));
  }
};
function Jt() {
}
Jt.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var r = Ce(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), o && o.animateAll();
  },
  drop: Zn
};
ee(Jt, {
  pluginName: "revertOnSpill"
});
function Qt() {
}
Qt.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable, r = o || this.sortable;
    r.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), r.animateAll();
  },
  drop: Zn
};
ee(Qt, {
  pluginName: "removeOnSpill"
});
b.mount(new Go());
b.mount(Qt, Jt);
const Oe = "household_kanban";
function Vo(n, e) {
  return n.connection.subscribeMessage((t) => e(t.board), { type: `${Oe}/subscribe` });
}
function st(n, e, t) {
  return n.callService(Oe, "set_status", { uid: e, status: t });
}
function Zo(n, e) {
  return n.connection.sendMessagePromise({ type: `${Oe}/history`, ...e });
}
function Ko(n, e) {
  return n.callService(Oe, "create_item", { ...e });
}
function Ft(n, e, t) {
  return n.callService(Oe, "update_item", { uid: e, ...t });
}
function Jo(n, e) {
  return n.callService(Oe, "delete_item", { uid: e });
}
const Qo = 864e5;
function L(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
const de = (n) => String(n).padStart(2, "0");
function Q(n) {
  return `${n.getFullYear()}-${de(n.getMonth() + 1)}-${de(n.getDate())}`;
}
function er(n, e) {
  if (!n) return null;
  if (!e) return n;
  const [t, o, r] = n.split("-").map(Number), [i, a] = e.split(":").map(Number), s = -new Date(t, o - 1, r, i, a).getTimezoneOffset(), l = Math.abs(s);
  return `${n}T${de(i)}:${de(a)}:00${s < 0 ? "-" : "+"}${de(Math.floor(l / 60))}:${de(l % 60)}`;
}
function tr(n) {
  if (!n) return "";
  const { date: e, hasTime: t } = te(n);
  return t ? `${de(e.getHours())}:${de(e.getMinutes())}` : "";
}
function G(n, e) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + e);
}
function en(n, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / Qo);
}
function te(n) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(n)) {
    const [e, t, o] = n.split("-").map(Number);
    return { date: new Date(e, t - 1, o), hasTime: !1 };
  }
  return { date: new Date(n), hasTime: !0 };
}
function nr(n, e) {
  const t = L(n), o = (t.getDay() - e + 7) % 7, r = G(t, -o);
  return o === 6 ? { start: G(r, 7), end: G(r, 13) } : { start: r, end: G(r, 6) };
}
const or = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function En(n, e) {
  var r, i;
  if (n === "saturday") return 0;
  if (n === "sunday") return 1;
  const t = e == null ? void 0 : e.first_weekday, o = or.indexOf(t ?? "");
  if (o >= 0) return o;
  try {
    const a = new Intl.Locale((e == null ? void 0 : e.language) ?? "en"), s = (i = ((r = a.getWeekInfo) == null ? void 0 : r.call(a)) ?? a.weekInfo) == null ? void 0 : i.firstDay;
    if (s) return s % 7;
  } catch {
  }
  return 1;
}
function xt(n, e) {
  const t = L(e.now);
  if (n.status === "completed")
    return !n.completed_at || !e.enabled.has("done") ? null : en(new Date(n.completed_at), t) < e.doneDays ? "done" : null;
  if (!n.due) return "todo";
  const o = L(te(n.due).date), r = (...i) => i.find((a) => e.enabled.has(a)) ?? "todo";
  return o < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : r("today", "week") : +o == +t ? r("today", "week") : o <= e.week.end ? r("week") : r("later");
}
const rr = 8;
function ir(n, e, t) {
  return Math.hypot(n, e) >= rr;
}
function ar(n, e, t) {
  const o = n.status === "completed" ? { status: "needs_action" } : {};
  if (typeof e == "number")
    return n.status === "needs_action" && n.priority === e ? null : { ...o, ...n.priority === e ? {} : { priority: e } };
  if (e === "overdue" || xt(n, t) === e) return null;
  if (e === "done") return { status: "completed" };
  if (e === "todo") return { ...o, due: null };
  if (e === "week") return { ...o, due: Q(t.week.end) };
  if (e === "later") return { ...o, due: Q(G(t.week.end, 1)) };
  const r = L(t.now);
  return n.due && +L(te(n.due).date) == +r ? Object.keys(o).length ? o : null : { ...o, due: Q(r) };
}
function sr(n) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(n, 10));
}
function lr(n) {
  const e = `custom:${n}`, t = (o) => {
    var r;
    for (const i of o.querySelectorAll("*")) {
      if (i.localName === "hui-error-card") {
        const a = i, s = a.config ?? a._config;
        ((s == null ? void 0 : s.type) === e || ((r = s == null ? void 0 : s.origConfig) == null ? void 0 : r.type) === e) && i.dispatchEvent(new Event("ll-rebuild", { bubbles: !0, composed: !0 }));
      }
      i.shadowRoot && t(i.shadowRoot);
    }
  };
  t(document);
}
function dr(n, e) {
  let t = !1, o = !1;
  const r = (s = window.customElements) => {
    if (!s.get(n)) {
      try {
        s.define(n, e);
      } catch (l) {
        o || (o = !0, console.warn("household_kanban: could not register the card", l));
        return;
      }
      t && lr(n);
    }
  };
  r(), t = !0;
  try {
    const s = Object.getOwnPropertyDescriptor(window, "customElements");
    if (!s || s.configurable) {
      let l = window.customElements;
      Object.defineProperty(window, "customElements", {
        configurable: !0,
        enumerable: (s == null ? void 0 : s.enumerable) ?? !0,
        get: () => l,
        set: (d) => {
          l = d, r(d);
        }
      });
    }
  } catch {
  }
  document.addEventListener("DOMContentLoaded", () => r()), window.addEventListener("load", () => r());
  const i = Date.now(), a = () => {
    r();
    const s = Date.now() - i;
    s < 2e4 && window.setTimeout(a, s < 3e3 ? 40 : 250);
  };
  window.setTimeout(a, 40);
}
const Kn = {
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
  err_delete: "Could not delete the task.",
  history: "History",
  hist_total: "{n} completed",
  hist_search: "Search",
  hist_search_ph: "Search completed…",
  hist_empty: "Nothing found",
  hist_more: "Load more",
  hist_last_week: "Last week",
  reopen: "Reopen",
  err_history: "Could not load the history.",
  err_reopen: "Could not reopen the task."
}, cr = {
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
  err_delete: "Úkol se nepodařilo smazat.",
  history: "Historie",
  hist_total: "Hotových: {n}",
  hist_search: "Hledat",
  hist_search_ph: "Hledat v hotových…",
  hist_empty: "Nic nenalezeno",
  hist_more: "Načíst další",
  hist_last_week: "Minulý týden",
  reopen: "Znovu otevřít",
  err_history: "Historii se nepodařilo načíst.",
  err_reopen: "Úkol se nepodařilo znovu otevřít."
}, ur = { en: Kn, cs: cr };
function k(n, e, t = {}) {
  return (ur[(n ?? "en").split("-")[0]] ?? Kn)[e].replace(/\{(\w+)\}/g, (r, i) => String(t[i] ?? ""));
}
const Sn = {
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
function lt(n, e, t) {
  const o = (n ?? "en").split("-")[0], r = o in Sn ? o : "en", i = Sn[r][e];
  return (i[new Intl.PluralRules(r).select(t)] ?? i.other).replace("{n}", String(t));
}
const hr = ro`
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
`, pr = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], tn = (n) => `c-${pr.includes(n) ? n : "grey"}`;
function nn(n, e) {
  var t;
  return String(((t = n.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function fr(n) {
  return n.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function tt(n, e = !1) {
  return m`<span class="dot ${e ? "sm" : ""} ${tn((n == null ? void 0 : n.color) ?? "grey")}"><ha-icon .icon=${(n == null ? void 0 : n.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function Te(n, e, t = "", o = !1) {
  var s;
  if (!e) return m`<span class="ava none ${t}" title="-">+</span>`;
  const r = nn(n, e), i = (s = n.states[e]) == null ? void 0 : s.attributes.entity_picture;
  if (typeof i == "string" && i) return m`<img class="ava ${t}" src=${i} alt=${o ? "" : r} title=${r} />`;
  const a = [...r].reduce((l, d) => (l * 31 + d.charCodeAt(0)) % 360, 7);
  return m`<span class="ava ${t}" title=${r} style="background:linear-gradient(135deg,hsl(${a} 55% 62%),hsl(${(a + 25) % 360} 55% 42%))">${fr(r)}</span>`;
}
const gr = m`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function Jn(n, e, t = !1) {
  const o = n.status === "completed";
  return m`<button class="check ${t ? "xs" : ""}" type="button" aria-pressed=${o} aria-label=${n.summary}
    @click=${() => e.onToggle(n)}>${gr}</button>`;
}
function br(n, e) {
  const { date: t, hasTime: o } = te(n.due), r = en(L(e.now), t);
  let i;
  return r === -1 ? i = k(e.lang, "yesterday") : r < -1 ? i = k(e.lang, "days_ago", { n: -r }) : r === 0 ? i = k(e.lang, "today") : r === 1 ? i = k(e.lang, "tomorrow") : i = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), o ? `${i} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : i;
}
function mr(n, e) {
  const t = en(new Date(n.completed_at), L(e.now));
  return t <= 0 ? k(e.lang, "done_today") : t === 1 ? k(e.lang, "done_yesterday") : k(e.lang, "done_days_ago", { n: t });
}
function vr(n, e, t) {
  const o = n.status === "completed", r = e.parents.find((d) => d.id === n.parent), i = L(e.now), a = !o && n.due && L(te(n.due).date) < i, s = !o && n.due && +L(te(n.due).date) == +i, l = m`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
  return m`<article class="card ${o ? "done" : ""}" data-uid=${n.uid} @click=${(d) => {
    d.target.closest(".check") || e.onOpen(n, d);
  }}>
    <div class="row">
      ${tt(r, !0)}
      <span class="parent-name">${(r == null ? void 0 : r.name) ?? n.parent}</span>
      ${Te(e.hass, n.assignee)}
    </div>
    <div class="row top">
      ${Jn(n, e)}
      <button class="title" type="button">${n.summary}</button>
    </div>
    <div class="pills">
      ${!o && t ? m`<span class="pill prio-${n.priority} ${tn(["", "red", "orange", "grey"][n.priority])}">${l}${k(e.lang, `prio_${n.priority}`)}</span>` : w}
      ${!o && n.moved > 0 ? m`<span class="pill c-orange">${k(e.lang, n.raised ? "moved_raised" : "moved", { n: n.moved })}</span>` : w}
      ${o && n.completed_at ? m`<span class="pill c-green">${mr(n, e)}</span>` : w}
      ${!o && n.due ? m`<span class="pill ${a ? "c-red" : s ? "today" : "later"}">${br(n, e)}</span>` : w}
    </div>
  </article>`;
}
function _r(n, e, t, o, r) {
  const i = t ? n.items : n.items.slice(0, 3), a = n.items.length - i.length;
  return m`<article class="card">
    <div class="row">
      ${tt(n.parent)}
      <span class="stack-head">${n.parent.name}</span>
      <span class="stack-sub">${n.items.length}</span>
    </div>
    <div class="stack-rows">
      ${i.map((s) => m`<div class="item">
        ${Jn(s, e, !0)}
        <span class="t">${s.summary}</span>
        ${s.assignee ? Te(e.hass, s.assignee, "xs") : w}
      </div>`)}
      ${a > 0 ? m`<button class="link" type="button" @click=${() => o(n.parent.id, !0)}>${k(e.lang, "more", { n: a })}</button>` : w}
      ${t && n.items.length > 3 ? m`<button class="link muted" type="button" @click=${() => o(n.parent.id, !1)}>${k(e.lang, "collapse")}</button>` : w}
    </div>
    <button class="link" type="button" @click=${() => r(n.parent.id)}>${k(e.lang, "open_list")} ›</button>
  </article>`;
}
function Qn(n) {
  return {
    uid: n.uid,
    status: n.status,
    heading: n.summary,
    parent: n.parent,
    summary: n.summary,
    description: n.description,
    priority: n.priority,
    assignee: n.assignee,
    date: n.due ? Q(te(n.due).date) : "",
    time: tr(n.due),
    confirmDelete: !1
  };
}
function yr(n, e = {}) {
  return { status: "needs_action", heading: "", parent: n, summary: "", description: "", priority: 2, assignee: null, date: "", time: "", confirmDelete: !1, ...e };
}
function eo(n) {
  return {
    summary: n.summary.trim(),
    description: n.description,
    due: er(n.date, n.date ? n.time : ""),
    priority: n.priority,
    assignee: n.assignee,
    parent: n.parent
  };
}
function Dn(n, e) {
  const t = eo(e), o = Qn(n), r = {};
  return t.summary !== n.summary && (r.summary = t.summary), t.description !== n.description && (r.description = t.description), (e.date !== o.date || e.time !== o.time) && (r.due = t.due), t.priority !== n.priority && (r.priority = t.priority), t.assignee !== n.assignee && (r.assignee = t.assignee), t.parent !== n.parent && (r.parent = t.parent), r;
}
function gt(n, e) {
  const t = L(e);
  return n === "none" ? "" : Q(n === "today" ? t : n === "tomorrow" ? G(t, 1) : G(t, (6 - t.getDay() + 7) % 7));
}
const wr = m`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
function xr(n, e) {
  const t = (a) => k(e.lang, a), o = !n.uid, r = ["today", "tomorrow", "weekend", "none"], i = (a) => {
    a.target === a.currentTarget && e.onClose();
  };
  return m`<dialog class="kb-dialog" aria-label=${o ? t("new_task") : n.heading} @close=${e.onClose} @click=${i}>
    <div class="dlg">
      <div class="dlg-head">
        <span class="dlg-kicker">${t(o ? "new_note" : "f_title")}</span>
        ${o ? w : m`<button class="pill-btn ${n.status === "completed" ? "on" : ""}" type="button" @click=${e.onToggleDone}>
          ${t(n.status === "completed" ? "mark_open" : "mark_done")}</button>`}
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>

      ${e.error ? m`<div class="notice" role="alert">${t(e.error)}</div>` : w}
      <label class="vis-hidden" for="kb-title">${t("f_title")}</label>
      <input id="kb-title" class="dlg-title" type="text" autocomplete="off" .value=${n.summary} placeholder=${t("f_title_ph")}
        @input=${(a) => e.onChange({ summary: a.target.value })} />

      <label class="field"><span class="dlg-label">${t("f_note")}</span>
        <textarea rows="3" .value=${n.description} placeholder=${t("f_note_ph")}
          @input=${(a) => e.onChange({ description: a.target.value })}></textarea></label>

      <div class="field"><span class="dlg-label">${t("f_parent")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_parent")}>
          ${e.parents.map((a) => m`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.parent === a.id}
            @click=${() => e.onChange({ parent: a.id })}>${tt(a, !0)}${a.name}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_prio")}</span>
        <div class="seg3" role="radiogroup" aria-label=${t("f_prio")}>
          ${[1, 2, 3].map((a) => m`<button type="button" role="radio" aria-checked=${n.priority === a}
            class="prio-${a}" @click=${() => e.onChange({ priority: a })}>${wr}${t(`prio_${a}`)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_due")}</span>
        <div class="chips">
          ${r.map((a) => m`<button class="pill-btn ${gt(a, e.now) === n.date ? "on" : ""}" type="button"
            aria-pressed=${gt(a, e.now) === n.date}
            @click=${() => e.onChange({ date: gt(a, e.now), ...a === "none" ? { time: "" } : {} })}>${t(`q_${a}`)}</button>`)}
          <label class="pill-input"><span class="vis-hidden">${t("f_date")}</span>
            <input type="date" .value=${n.date} @input=${(a) => e.onChange({ date: a.target.value })} /></label>
          <label class="pill-input"><span class="vis-hidden">${t("f_time")}</span>
            <input type="time" .value=${n.time} ?disabled=${!n.date} @input=${(a) => e.onChange({ time: a.target.value })} /></label>
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_who")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_who")}>
          <button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === null}
            @click=${() => e.onChange({ assignee: null })}>${Te(e.hass, null, "", !0)}${t("unassigned")}</button>
          ${e.people.map((a) => m`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === a}
            @click=${() => e.onChange({ assignee: a })}>${Te(e.hass, a, "", !0)}${nn(e.hass, a)}</button>`)}
        </div></div>

      <div class="dlg-foot">
        ${o ? w : n.confirmDelete ? m`<span class="danger-text" role="alert">${t("delete_confirm")}</span>
              <button class="danger-btn" type="button" ?disabled=${e.busy} @click=${e.onDelete}>${t("delete_yes")}</button>
              <button class="pill-btn" type="button" @click=${() => e.onChange({ confirmDelete: !1 })}>${t("cancel")}</button>` : m`<button class="danger-link" type="button" @click=${() => e.onChange({ confirmDelete: !0 })}>${t("delete")}</button>`}
        <span class="grow"></span>
        ${n.confirmDelete ? w : m`
          <button class="pill-btn" type="button" @click=${e.onClose}>${t("cancel")}</button>
          <button class="primary-btn" type="button" ?disabled=${!n.summary.trim() || e.busy} @click=${e.onSave}>${t("save")}</button>`}
      </div>
    </div>
  </dialog>`;
}
function An(n) {
  if (!n.due) return 1 / 0;
  const { date: e, hasTime: t } = te(n.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function Cn(n, e) {
  const t = An(n), o = An(e);
  return t !== o ? t < o ? -1 : 1 : n.priority - e.priority || +new Date(n.created_at) - +new Date(e.created_at);
}
function $r(n, e, t) {
  const o = [], r = /* @__PURE__ */ new Map();
  for (const i of n) {
    const a = e.find((l) => l.id === i.parent);
    if (!(a != null && a.collapse) || a.id === t) {
      o.push(i);
      continue;
    }
    let s = r.get(a.id);
    s || (s = { parent: a, items: [] }, r.set(a.id, s), o.push(s)), s.items.push(i);
  }
  return o;
}
const kr = ["todo", "later", "week", "overdue", "today", "done"], Er = (n, e) => +new Date(e.completed_at ?? 0) - +new Date(n.completed_at ?? 0);
function Sr(n, e, t) {
  const { ctx: o } = e, r = n.filter((l) => l.status === "needs_action"), i = n.filter((l) => xt(l, o) === "done").sort(Er), a = n.filter((l) => l.status === "completed").length - i.length, s = e.group === "date" ? kr.filter((l) => l !== "done" && (l === "todo" || o.enabled.has(l))).map((l) => ({
    id: l,
    label: k(t, `col_${l}`),
    led: l === "overdue" ? "rgb(var(--c-red))" : l === "week" || l === "today" ? "var(--kb-accent)" : void 0,
    items: r.filter((d) => xt(d, o) === l).sort(Cn)
  })) : [1, 2, 3].map((l) => ({
    id: `p${l}`,
    label: k(t, `prio_${l}`),
    led: l === 1 ? "rgb(var(--c-red))" : l === 2 ? "rgb(var(--c-orange))" : void 0,
    items: r.filter((d) => d.priority === l).sort(Cn)
  }));
  return o.enabled.has("done") && s.push({ id: "done", label: k(t, "col_done"), led: "rgb(var(--c-green))", items: i, done: !0 }), { cols: s, olderDone: a };
}
function Dr(n, e, t) {
  const { cols: o, olderDone: r } = Sr(n, e, t.lang);
  return m`<div class="board">${o.map((i) => {
    const a = i.done ? i.items : $r(i.items, e.board.parents, e.parent);
    return m`<section class="col" data-col=${i.id}>
      <div class="col-head">
        <span class="led" style=${i.led ? `background:${i.led}` : ""}></span>
        <span class="label">${i.label}</span><span class="count">${i.items.length}</span>
        ${i.done || i.id === "overdue" ? w : m`<button class="add" type="button" aria-label=${`${k(t.lang, "add_here")}: ${i.label}`} @click=${() => e.onAdd(i.id)}>+</button>`}
      </div>
      ${a.map((s) => "items" in s ? _r(s, t, e.expanded.has(s.parent.id), e.onExpand, e.onFocus) : vr(s, t, e.group === "date"))}
      ${i.done ? m`<button class="note note-btn" type="button" @click=${e.onHistory}>${k(t.lang, "done_note", { days: e.ctx.doneDays, older: r })}</button>` : w}
      ${!i.done && a.length === 0 ? m`<div class="empty">${k(t.lang, "nothing")}</div>` : w}
    </section>`;
  })}</div>`;
}
function Ar(n, e, t, o, r) {
  const i = o.filter((s) => s.status === "needs_action" && (!e.who || s.assignee === e.who)), a = (s) => {
    const l = e.parent === ((s == null ? void 0 : s.id) ?? null), d = i.filter((u) => !s || u.parent === s.id).length;
    return m`<button class="chip ${s ? tn(s.color) : ""}" type="button" aria-pressed=${l}
      @click=${() => r({ parent: l ? null : (s == null ? void 0 : s.id) ?? null })}>
      ${tt(s ?? void 0)}<span>${(s == null ? void 0 : s.name) ?? k(n.lang, "all_parents")}</span><b>${d}</b></button>`;
  };
  return m`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${k(n.lang, "filter_people")}>
      ${t.map((s) => {
    const l = e.who === s;
    return m`<button class="person" type="button" aria-pressed=${l} @click=${() => r({ who: l ? null : s })}>
          ${Te(n.hass, s, "lg", !0)}<span>${nn(n.hass, s)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${k(n.lang, "filter_parents")}>
      ${a(null)}${n.parents.map((s) => a(s))}
    </div>
    <div class="seg" role="group" aria-label=${k(n.lang, "group_label")}>
      ${["date", "priority"].map((s) => m`<button type="button" aria-pressed=${e.group === s}
        @click=${() => r({ group: s })}>${k(n.lang, `group_${s}`)}</button>`)}
    </div>
  </div>`;
}
function Cr(n, e, t, o) {
  const r = L(e), i = G(r, -((r.getDay() - o + 7) % 7)), a = G(i, -7), s = new Intl.DateTimeFormat(t, { month: "long", year: "numeric" }), l = /* @__PURE__ */ new Map();
  for (const d of n) {
    const u = new Date(d.completed_at ?? 0);
    let c, f;
    u >= i ? (c = "this", f = k(t, "col_week")) : u >= a ? (c = "last", f = k(t, "hist_last_week")) : (c = `${u.getFullYear()}-${u.getMonth()}`, f = s.format(u), t.startsWith("cs") && (f = f.toLocaleLowerCase("cs")));
    const _ = l.get(c) ?? { label: f, items: [] };
    _.items.push(d), l.set(c, _);
  }
  return [...l.values()];
}
const Tr = m`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path></svg>`;
function Or(n, e) {
  const t = (s) => k(e.lang, s), o = new Intl.DateTimeFormat(e.lang, { day: "numeric", month: "short" }), r = (s) => {
    s.target === s.currentTarget && e.onClose();
  }, i = (s) => e.parents.find((l) => l.id === s), a = Cr(n.items, e.now, e.lang, e.firstDay);
  return m`<dialog class="kb-dialog kb-history" aria-labelledby="kb-hist-title" @close=${e.onClose} @click=${r}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><h2 id="kb-hist-title" class="hist-title">${t("history")}</h2>
          <span class="hist-sub">${k(e.lang, "hist_total", { n: n.total })}</span></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      ${n.error ? m`<div class="notice" role="alert">${t(n.error)}</div>` : w}
      <label class="hist-search">
        <span class="vis-hidden">${t("hist_search")}</span>
        <input type="search" autocomplete="off" .value=${n.search} placeholder=${t("hist_search_ph")}
          @input=${(s) => e.onSearch(s.target.value)} />
      </label>
      <div class="chips" role="group" aria-label=${t("filter_parents")}>
        <button class="pill-btn" type="button" aria-pressed=${n.parent === null} @click=${() => e.onParent(null)}>${t("all_parents")}</button>
        ${e.parents.map((s) => m`<button class="pill-btn hist-chip" type="button" aria-pressed=${n.parent === s.id}
          @click=${() => e.onParent(s.id)}>${tt(s, !0)}${s.name}</button>`)}
      </div>
      <div class="hist-list">
        ${a.map((s) => m`<section class="hist-group">
          <h3 class="dlg-label">${s.label}</h3>
          <ul class="hist-rows">${s.items.map((l) => {
    var d;
    return m`<li class="hist-row" data-uid=${l.uid}>
            <span class="hist-check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>
            <div class="hist-text"><span class="hist-name">${l.summary}</span>
              <span class="hist-meta">${((d = i(l.parent)) == null ? void 0 : d.name) ?? l.parent} · ${l.completed_at ? o.format(new Date(l.completed_at)) : ""}</span></div>
            ${l.assignee ? Te(e.hass, l.assignee) : w}
            <button class="hist-reopen" type="button" title=${t("reopen")} aria-label=${`${t("reopen")}: ${l.summary}`}
              @click=${() => e.onReopen(l)}>${Tr}</button>
          </li>`;
  })}</ul>
        </section>`)}
        ${n.items.length === 0 && !n.loading && !n.error ? m`<div class="empty hist-empty">${t("hist_empty")}</div>` : w}
        ${n.items.length < n.total ? m`<button class="pill-btn hist-more" type="button" ?disabled=${n.loading} @click=${e.onMore}>${t("hist_more")}</button>` : w}
      </div>
    </div>
  </dialog>`;
}
const Pr = ["todo", "week", "today", "done"], Mr = 50, $t = class $t extends je {
  constructor() {
    super(), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set(), this._loadFailed = !1, this._busy = !1, this._hq = 0, this._hMore = null, this._sortables = /* @__PURE__ */ new Map(), this._seq = 0, this._attempts = 0, this.addEventListener("pointerdown", (e) => {
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
    var e, t;
    super.disconnectedCallback(), window.clearTimeout(this._retry), this._retry = void 0, this._sortables.forEach((o) => o.destroy()), this._sortables.clear(), this._endDrag(), window.clearTimeout(this._hTimer), (e = this._hObs) == null || e.disconnect(), this._hObs = void 0, this._hMore = null, (t = this._unsub) == null || t.then((o) => o()).catch(() => {
    }), this._unsub = void 0;
  }
  willUpdate(e) {
    e.has("hass") && this._subscribe();
  }
  /** Subscribe once; on failure retry on a capped backoff timer, never on hass updates. */
  _subscribe() {
    if (this._unsub || this._retry !== void 0 || !this.hass || !this.isConnected) return;
    const e = Vo(this.hass, (t) => {
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
      }, sr(this._attempts++)));
    });
  }
  _fail(e) {
    this._notice = e, window.setTimeout(() => {
      this._notice = void 0;
    }, 5e3);
  }
  /** Run a write from inside the dialog; close it on success, show the error in it otherwise. */
  async _dialogWrite(e, t) {
    const o = this._seq;
    this._busy = !0, this._dlgError = void 0;
    try {
      await t(), o === this._seq && (this._draft = void 0);
    } catch (r) {
      console.warn("household_kanban: write failed", r), o === this._seq && (this._dlgError = e);
    } finally {
      o === this._seq && (this._busy = !1);
    }
  }
  _save() {
    var r;
    const e = this.hass, t = this._draft;
    if (!e || !t) return;
    const o = t.uid ? (r = this._board) == null ? void 0 : r.items.find((i) => i.uid === t.uid) : void 0;
    if (t.uid && !o) {
      this._dlgError = "err_save";
      return;
    }
    this._dialogWrite("err_save", () => o ? Ft(e, o.uid, Dn(o, t)) : Ko(e, eo(t)));
  }
  /** Tap on a card; a click that ends a drag is not a tap. */
  _open(e, t) {
    const o = t, r = this._down;
    this._down = void 0, !(o.detail !== 0 && r && ir(o.clientX - r.x, o.clientY - r.y, t.timeStamp - r.t)) && this._openDialog(Qn(e), () => {
      var i;
      return (i = [...this.renderRoot.querySelectorAll("[data-uid]")].find((a) => a.dataset.uid === e.uid)) == null ? void 0 : i.querySelector(".title");
    });
  }
  _openDialog(e, t) {
    this._seq++, this._busy = !1, this._dlgError = void 0, this._returnTo = t, this._draft = e;
  }
  _openHistory(e) {
    this._draft || this._hist || (this._returnTo = () => this.renderRoot.querySelector(e), this._hist = { search: "", parent: null, items: [], total: 0, loading: !1 }, this._loadHistory(!0));
  }
  _closeHistory() {
    window.clearTimeout(this._hTimer), this._hq++, this._hist = void 0;
  }
  /** `reset` starts over at offset 0 for the current filters; otherwise appends the next page. */
  async _loadHistory(e) {
    const t = this.hass, o = this._hist;
    if (!t || !o) return;
    if (e) this._hq++;
    else if (o.loading) return;
    const r = this._hq;
    this._hist = { ...o, loading: !0, error: void 0 };
    try {
      const i = await Zo(t, {
        search: o.search.trim() || void 0,
        parent: o.parent ?? void 0,
        offset: e ? 0 : o.items.length,
        limit: Mr
      });
      if (r !== this._hq || !this._hist) return;
      this._hist = { ...this._hist, items: e ? i.items : [...this._hist.items, ...i.items], total: i.total, loading: !1 };
    } catch (i) {
      console.warn("household_kanban: history failed", i), r === this._hq && this._hist && (this._hist = { ...this._hist, loading: !1, error: "err_history" });
    }
  }
  _histFilter(e, t) {
    this._hist && (this._hist = { ...this._hist, ...e }, window.clearTimeout(this._hTimer), this._hTimer = window.setTimeout(() => void this._loadHistory(!0), t));
  }
  _reopen(e) {
    const t = this.hass;
    t && st(t, e, "needs_action").then(() => {
      const o = this._hist;
      !o || !o.items.some((r) => r.uid === e) || (this._hist = { ...o, items: o.items.filter((r) => r.uid !== e), total: Math.max(0, o.total - 1), error: void 0 });
    }, (o) => {
      console.warn("household_kanban: reopen failed", o), this._hist && (this._hist = { ...this._hist, error: "err_reopen" });
    });
  }
  /** Load the next page when the "Load more" button scrolls into view; the button itself is the fallback. */
  _observeMore() {
    var o, r, i, a;
    const e = this.renderRoot.querySelector(".hist-more"), t = ((o = this._hist) == null ? void 0 : o.items.length) ?? 0;
    if (!e || (r = this._hist) != null && r.loading) {
      e || ((i = this._hObs) == null || i.disconnect(), this._hMore = null);
      return;
    }
    ((a = this._hMore) == null ? void 0 : a.el) === e && this._hMore.n === t || (this._hMore = { el: e, n: t }, !(typeof IntersectionObserver > "u") && (this._hObs ?? (this._hObs = new IntersectionObserver((s) => {
      s.some((l) => l.isIntersecting) && this._loadHistory(!1);
    })), this._hObs.disconnect(), this._hObs.observe(e)));
  }
  _add(e, t, o, r = `.col[data-col="${e}"] .add`) {
    var d, u;
    const i = () => this.renderRoot.querySelector(r), a = this._filter.parent ?? ((d = t.find((c) => c.id === "household")) == null ? void 0 : d.id) ?? ((u = t[0]) == null ? void 0 : u.id);
    if (!a) return;
    const s = /^p([123])$/.exec(e), l = {
      today: gt("today", o.now),
      week: Q(o.week.end),
      later: Q(G(o.week.end, 1))
    };
    this._openDialog(yr(a, s ? { priority: Number(s[1]) } : { date: l[e] ?? "" }), i);
  }
  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  _syncSortables() {
    var o;
    const e = new Set(this.renderRoot.querySelectorAll(".col"));
    for (const [r, i] of this._sortables) e.has(r) || (i.destroy(), this._sortables.delete(r));
    const t = ((o = window.matchMedia) == null ? void 0 : o.call(window, "(pointer: coarse)").matches) ?? !1;
    for (const r of e)
      this._sortables.has(r) || this._sortables.set(r, b.create(r, {
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
          this._endDrag(i.item), i.to !== i.from && this._drop(i.item.dataset.uid, i.to.dataset.col);
        }
      }));
  }
  /** Put a dragged card back inside its Lit part and apply the board push held during the drag. */
  _endDrag(e) {
    const t = this._dragFrom;
    this._dragFrom = void 0, t && e && t.parent.insertBefore(e, t.next && t.next.parentNode === t.parent ? t.next : null), this._pending && (this._board = this._pending, this._loadFailed = !1, this._pending = void 0);
  }
  _drop(e, t) {
    var c;
    const o = this.hass, r = this._ctx, i = (c = this._board) == null ? void 0 : c.items.find((f) => f.uid === e);
    if (!o || !r || !i || !t) return;
    const a = /^p([123])$/.exec(t), s = ar(i, a ? Number(a[1]) : t, r);
    if (!s) return;
    const { status: l, ...d } = s;
    (async () => {
      Object.keys(d).length && await Ft(o, i.uid, d), l && await st(o, i.uid, l);
    })().catch((f) => {
      console.warn("household_kanban: drop failed", f), this._fail("err_update");
    });
  }
  updated() {
    var t, o, r, i;
    this._syncSortables(), this._observeMore();
    const e = this.renderRoot.querySelector("dialog");
    if (e && !e.open)
      e.showModal(), this._hist ? (t = this.renderRoot.querySelector(".kb-history input")) == null || t.focus() : (o = this._draft) != null && o.uid || (r = this.renderRoot.querySelector("#kb-title")) == null || r.focus();
    else if (!e && this._returnTo) {
      const a = this._returnTo;
      this._returnTo = void 0, (i = a()) == null || i.focus();
    }
  }
  render() {
    var y;
    const e = this.hass, t = this._config, o = this._board;
    if (!e || !t) return w;
    const r = ((y = e.locale) == null ? void 0 : y.language) ?? e.language ?? "en";
    if (!o) return m`<ha-card><div class="loading">${k(r, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const i = /* @__PURE__ */ new Date(), a = o.parents.filter((p) => !t.parents || t.parents.includes(p.id)), s = new Set(t.columns ?? Pr);
    s.add("todo"), o.end_of_day_mode === "overdue" && s.add("overdue");
    const l = {
      now: i,
      enabled: s,
      mode: o.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: nr(i, En(t.week_end, e.locale))
    };
    this._ctx = l;
    const d = {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      onOpen: (p, E) => this._open(p, E),
      onToggle: (p) => {
        st(e, p.uid, p.status === "completed" ? "needs_action" : "completed").catch((E) => {
          console.warn("household_kanban: set_status failed", E), this._fail("err_update");
        });
      }
    }, u = t.people ?? Object.keys(e.states).filter((p) => p.startsWith("person.")), c = this._filter, f = o.items.filter((p) => a.some((E) => E.id === p.parent)), _ = f.filter((p) => (!c.who || p.assignee === c.who) && (!c.parent || p.parent === c.parent));
    return m`<ha-card>
      ${this._notice ? m`<div class="notice" role="alert">${k(r, this._notice)}</div>` : w}
      <header>
        <div class="titles"><h1>${k(r, "title")}</h1><div class="summary">${this._summary(f, l, r)}</div></div>
        <button class="pill-btn hist-btn" type="button" @click=${() => this._openHistory("header .hist-btn")}>${k(r, "history")}</button>
        <button class="new" type="button" @click=${() => this._add("todo", a, l, "header .new")}>+ ${k(r, "new_note")}</button>
      </header>
      ${Ar(d, c, u, f, (p) => {
      this._filter = { ...c, ...p };
    })}
      ${Dr(_, {
      board: { ...o, parents: a },
      ctx: l,
      group: c.group,
      who: c.who,
      parent: c.parent,
      expanded: this._expanded,
      onExpand: (p, E) => {
        const M = new Set(this._expanded);
        E ? M.add(p) : M.delete(p), this._expanded = M;
      },
      onFocus: (p) => {
        this._filter = { ...c, parent: p };
      },
      onAdd: (p) => this._add(p, a, l),
      onHistory: () => this._openHistory('.col[data-col="done"] .note-btn')
    }, d)}
      ${this._hist ? Or(this._hist, {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      firstDay: En(t.week_end, e.locale),
      onSearch: (p) => this._histFilter({ search: p }, 300),
      onParent: (p) => this._histFilter({ parent: p }, 0),
      onReopen: (p) => this._reopen(p.uid),
      onMore: () => void this._loadHistory(!1),
      onClose: () => this._closeHistory()
    }) : w}
      ${this._draft ? xr(this._draft, {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      people: u,
      busy: this._busy,
      error: this._dlgError,
      onChange: (p) => {
        this._draft && (this._draft = { ...this._draft, ...p });
      },
      onSave: () => this._save(),
      onClose: () => {
        this._draft = void 0;
      },
      onToggleDone: () => {
        var H;
        const p = this._draft, E = p == null ? void 0 : p.uid;
        if (!p || !E) return;
        const M = (H = this._board) == null ? void 0 : H.items.find((I) => I.uid === E);
        if (!M) {
          this._dlgError = "err_update";
          return;
        }
        const O = Dn(M, p);
        this._dialogWrite("err_update", async () => {
          Object.keys(O).length && await Ft(e, E, O), await st(e, E, p.status === "completed" ? "needs_action" : "completed");
        });
      },
      onDelete: () => {
        const p = this._draft;
        p != null && p.uid && this._dialogWrite("err_delete", () => Jo(e, p.uid));
      }
    }) : w}
    </ha-card>`;
  }
  _summary(e, t, o) {
    const r = e.filter((d) => d.status === "needs_action"), i = L(t.now), a = r.filter((d) => d.due && L(te(d.due).date) < i).length, s = r.filter((d) => xt(d, t) === "today").length, l = t.mode === "overdue" ? lt(o, "sum_overdue", a) : lt(o, "sum_moved", r.filter((d) => d.moved > 0).length);
    return [lt(o, "sum_open", r.length), lt(o, "sum_today", s), l].join(" · ");
  }
};
$t.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _board: { state: !0 },
  _filter: { state: !0 },
  _expanded: { state: !0 },
  _loadFailed: { state: !0 },
  _notice: { state: !0 },
  _draft: { state: !0 },
  _busy: { state: !0 },
  _dlgError: { state: !0 },
  _hist: { state: !0 }
}, $t.styles = hr;
let qt = $t;
const Wt = "household-kanban-card";
dr(Wt, qt);
(window.customCards ?? (window.customCards = [])).some((n) => n.type === Wt) || window.customCards.push({ type: Wt, name: "Household Kanban", description: "Kanban board for household tasks" });
