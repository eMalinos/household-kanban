/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, X = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), ie = /* @__PURE__ */ new WeakMap();
let ve = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (X && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = ie.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ie.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Te = (r) => new ve(typeof r == "string" ? r : r + "", void 0, ee), Me = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((s, o, n) => s + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + r[n + 1], r[0]);
  return new ve(t, r, ee);
}, Ue = (r, e) => {
  if (X) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), o = B.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = t.cssText, r.appendChild(s);
  }
}, ae = X ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Te(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Oe, defineProperty: ze, getOwnPropertyDescriptor: Ne, getOwnPropertyNames: He, getOwnPropertySymbols: Re, getPrototypeOf: Le } = Object, m = globalThis, de = m.trustedTypes, je = de ? de.emptyScript : "", Y = m.reactiveElementPolyfillSupport, M = (r, e) => r, J = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? je : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, xe = (r, e) => !Oe(r, e), le = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: xe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = le) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, t);
      o !== void 0 && ze(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: o, set: n } = Ne(this.prototype, e) ?? { get() {
      return this[t];
    }, set(i) {
      this[t] = i;
    } };
    return { get: o, set(i) {
      const a = o == null ? void 0 : o.call(this);
      n == null || n.call(this, i), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? le;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const e = Le(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const t = this.properties, s = [...He(t), ...Re(t)];
      for (const o of s) this.createProperty(o, t[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, o] of t) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const o = this._$Eu(t, s);
      o !== void 0 && this._$Eh.set(o, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) t.unshift(ae(o));
    } else e !== void 0 && t.push(ae(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ue(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostConnected) == null ? void 0 : s.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    var n;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const i = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : J).toAttribute(t, s.type);
      this._$Em = e, i == null ? this.removeAttribute(o) : this.setAttribute(o, i), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, i;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = s.getPropertyOptions(o), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : J;
      this._$Em = o;
      const l = d.fromAttribute(t, a.type);
      this[o] = l ?? ((i = this._$Ej) == null ? void 0 : i.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, o = !1, n) {
    var i;
    if (e !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[e]), s ?? (s = a.getPropertyOptions(e)), !((s.hasChanged ?? xe)(n, t) || s.useDefault && s.reflect && n === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: o, wrapped: n }, i) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, i ?? t ?? this[e]), n !== !0 || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, i] of this._$Ep) this[n] = i;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, i] of o) {
        const { wrapped: a } = i, d = this[n];
        a !== !0 || this._$AL.has(n) || d === void 0 || this.C(n, void 0, i, d);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
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
    (t = this._$EO) == null || t.forEach((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[M("elementProperties")] = /* @__PURE__ */ new Map(), S[M("finalized")] = /* @__PURE__ */ new Map(), Y == null || Y({ ReactiveElement: S }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, ce = (r) => r, F = U.trustedTypes, pe = F ? F.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, we = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, ke = "?" + y, Be = `<${ke}>`, A = document, z = () => A.createComment(""), N = (r) => r === null || typeof r != "object" && typeof r != "function", te = Array.isArray, Fe = (r) => te(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, ue = />/g, x = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, fe = /"/g, Ae = /^(?:script|style|textarea|title)$/i, Ie = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), h = Ie(1), E = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), be = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function Se(r, e) {
  if (!te(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pe !== void 0 ? pe.createHTML(e) : e;
}
const Ve = (r, e) => {
  const t = r.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", i = T;
  for (let a = 0; a < t; a++) {
    const d = r[a];
    let l, g, c = -1, b = 0;
    for (; b < d.length && (i.lastIndex = b, g = i.exec(d), g !== null); ) b = i.lastIndex, i === T ? g[1] === "!--" ? i = he : g[1] !== void 0 ? i = ue : g[2] !== void 0 ? (Ae.test(g[2]) && (o = RegExp("</" + g[2], "g")), i = x) : g[3] !== void 0 && (i = x) : i === x ? g[0] === ">" ? (i = o ?? T, c = -1) : g[1] === void 0 ? c = -2 : (c = i.lastIndex - g[2].length, l = g[1], i = g[3] === void 0 ? x : g[3] === '"' ? fe : ge) : i === fe || i === ge ? i = x : i === he || i === ue ? i = T : (i = x, o = void 0);
    const _ = i === x && r[a + 1].startsWith("/>") ? " " : "";
    n += i === T ? d + Be : c >= 0 ? (s.push(l), d.slice(0, c) + we + d.slice(c) + y + _) : d + y + (c === -2 ? a : _);
  }
  return [Se(r, n + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class H {
  constructor({ strings: e, _$litType$: t }, s) {
    let o;
    this.parts = [];
    let n = 0, i = 0;
    const a = e.length - 1, d = this.parts, [l, g] = Ve(e, t);
    if (this.el = H.createElement(l, s), w.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = w.nextNode()) !== null && d.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(we)) {
          const b = g[i++], _ = o.getAttribute(c).split(y), v = /([.?@])?(.*)/.exec(b);
          d.push({ type: 1, index: n, name: v[2], strings: _, ctor: v[1] === "." ? Ye : v[1] === "?" ? Ze : v[1] === "@" ? qe : V }), o.removeAttribute(c);
        } else c.startsWith(y) && (d.push({ type: 6, index: n }), o.removeAttribute(c));
        if (Ae.test(o.tagName)) {
          const c = o.textContent.split(y), b = c.length - 1;
          if (b > 0) {
            o.textContent = F ? F.emptyScript : "";
            for (let _ = 0; _ < b; _++) o.append(c[_], z()), w.nextNode(), d.push({ type: 2, index: ++n });
            o.append(c[b], z());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ke) d.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = o.data.indexOf(y, c + 1)) !== -1; ) d.push({ type: 7, index: n }), c += y.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = A.createElement("template");
    return s.innerHTML = e, s;
  }
}
function C(r, e, t = r, s) {
  var i, a;
  if (e === E) return e;
  let o = s !== void 0 ? (i = t._$Co) == null ? void 0 : i[s] : t._$Cl;
  const n = N(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(r), o._$AT(r, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = o : t._$Cl = o), o !== void 0 && (e = C(r, o._$AS(r, e.values), o, s)), e;
}
class We {
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
    const { el: { content: t }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? A).importNode(t, !0);
    w.currentNode = o;
    let n = w.nextNode(), i = 0, a = 0, d = s[0];
    for (; d !== void 0; ) {
      if (i === d.index) {
        let l;
        d.type === 2 ? l = new R(n, n.nextSibling, this, e) : d.type === 1 ? l = new d.ctor(n, d.name, d.strings, this, e) : d.type === 6 && (l = new Ke(n, this, e)), this._$AV.push(l), d = s[++a];
      }
      i !== (d == null ? void 0 : d.index) && (n = w.nextNode(), i++);
    }
    return w.currentNode = A, o;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class R {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, s, o) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = C(this, e, t), N(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Fe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && N(this._$AH) ? this._$AA.nextSibling.data = e : this.T(A.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = H.createElement(Se(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(t);
    else {
      const i = new We(o, this), a = i.u(this.options);
      i.p(t), this.T(a), this._$AH = i;
    }
  }
  _$AC(e) {
    let t = be.get(e.strings);
    return t === void 0 && be.set(e.strings, t = new H(e)), t;
  }
  k(e) {
    te(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, o = 0;
    for (const n of e) o === t.length ? t.push(s = new R(this.O(z()), this.O(z()), this, this.options)) : s = t[o], s._$AI(n), o++;
    o < t.length && (this._$AR(s && s._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = ce(e).nextSibling;
      ce(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, o, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(e, t = this, s, o) {
    const n = this.strings;
    let i = !1;
    if (n === void 0) e = C(this, e, t, 0), i = !N(e) || e !== this._$AH && e !== E, i && (this._$AH = e);
    else {
      const a = e;
      let d, l;
      for (e = n[0], d = 0; d < n.length - 1; d++) l = C(this, a[s + d], t, d), l === E && (l = this._$AH[d]), i || (i = !N(l) || l !== this._$AH[d]), l === p ? e = p : e !== p && (e += (l ?? "") + n[d + 1]), this._$AH[d] = l;
    }
    i && !o && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ye extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class Ze extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class qe extends V {
  constructor(e, t, s, o, n) {
    super(e, t, s, o, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = C(this, e, t, 0) ?? p) === E) return;
    const s = this._$AH, o = e === p && s !== p || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== p && (s === p || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ke {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    C(this, e);
  }
}
const q = U.litHtmlPolyfillSupport;
q == null || q(H, R), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.3");
const Je = (r, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = o = new R(e.insertBefore(z(), n), n, void 0, t ?? {});
  }
  return o._$AI(r), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis;
class O extends S {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Je(t, this.renderRoot, this.renderOptions);
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
    return E;
  }
}
var me;
O._$litElement$ = !0, O.finalized = !0, (me = k.litElementHydrateSupport) == null || me.call(k, { LitElement: O });
const K = k.litElementPolyfillSupport;
K == null || K({ LitElement: O });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.2");
const Ee = "household_kanban";
function Ge(r, e) {
  return r.connection.subscribeMessage((t) => e(t.board), { type: `${Ee}/subscribe` });
}
function Qe(r, e, t) {
  return r.callService(Ee, "set_status", { uid: e, status: t });
}
const Xe = 864e5;
function $(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate());
}
function L(r, e) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate() + e);
}
function re(r, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(r.getFullYear(), r.getMonth(), r.getDate())) / Xe);
}
function D(r) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(r)) {
    const [e, t, s] = r.split("-").map(Number);
    return { date: new Date(e, t - 1, s), hasTime: !1 };
  }
  return { date: new Date(r), hasTime: !0 };
}
function et(r, e) {
  const t = $(r), s = (t.getDay() - e + 7) % 7, o = L(t, -s);
  return s === 6 ? { start: L(o, 7), end: L(o, 13) } : { start: o, end: L(o, 6) };
}
const tt = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function rt(r, e) {
  var o, n;
  if (r === "saturday") return 0;
  if (r === "sunday") return 1;
  const t = e == null ? void 0 : e.first_weekday, s = tt.indexOf(t ?? "");
  if (s >= 0) return s;
  try {
    const i = new Intl.Locale((e == null ? void 0 : e.language) ?? "en"), a = (n = ((o = i.getWeekInfo) == null ? void 0 : o.call(i)) ?? i.weekInfo) == null ? void 0 : n.firstDay;
    if (a) return a % 7;
  } catch {
  }
  return 1;
}
function G(r, e) {
  const t = $(e.now);
  if (r.status === "completed")
    return !r.completed_at || !e.enabled.has("done") ? null : re(new Date(r.completed_at), t) < e.doneDays ? "done" : null;
  if (!r.due) return "todo";
  const s = $(D(r.due).date), o = (...n) => n.find((i) => e.enabled.has(i)) ?? "todo";
  return s < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : o("today", "week") : +s == +t ? o("today", "week") : s <= e.week.end ? o("week") : o("later");
}
function st(r) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(r, 10));
}
const Ce = {
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
  err_update: "Could not update the task."
}, ot = {
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
  err_update: "Úkol se nepodařilo změnit."
}, nt = { en: Ce, cs: ot };
function u(r, e, t = {}) {
  return (nt[(r ?? "en").split("-")[0]] ?? Ce)[e].replace(/\{(\w+)\}/g, (o, n) => String(t[n] ?? ""));
}
const _e = {
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
function j(r, e, t) {
  const s = (r ?? "en").split("-")[0], o = s in _e ? s : "en", n = _e[o][e];
  return (n[new Intl.PluralRules(o).select(t)] ?? n.other).replace("{n}", String(t));
}
const it = Me`
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
  .title { flex: 1; min-width: 0; font-size: 15px; font-weight: 600; letter-spacing: -0.2px; line-height: 1.3; overflow-wrap: anywhere; }
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
`;
function $e(r) {
  if (!r.due) return 1 / 0;
  const { date: e, hasTime: t } = D(r.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function ye(r, e) {
  const t = $e(r), s = $e(e);
  return t !== s ? t < s ? -1 : 1 : r.priority - e.priority || +new Date(r.created_at) - +new Date(e.created_at);
}
function at(r, e, t) {
  const s = [], o = /* @__PURE__ */ new Map();
  for (const n of r) {
    const i = e.find((d) => d.id === n.parent);
    if (!(i != null && i.collapse) || i.id === t) {
      s.push(n);
      continue;
    }
    let a = o.get(i.id);
    a || (a = { parent: i, items: [] }, o.set(i.id, a), s.push(a)), a.items.push(n);
  }
  return s;
}
const dt = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], se = (r) => `c-${dt.includes(r) ? r : "grey"}`;
function De(r, e) {
  var t;
  return String(((t = r.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function lt(r) {
  return r.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function oe(r, e = !1) {
  return h`<span class="dot ${e ? "sm" : ""} ${se((r == null ? void 0 : r.color) ?? "grey")}"><ha-icon .icon=${(r == null ? void 0 : r.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function ne(r, e, t = "", s = !1) {
  var a;
  if (!e) return h`<span class="ava none ${t}" title="-">+</span>`;
  const o = De(r, e), n = (a = r.states[e]) == null ? void 0 : a.attributes.entity_picture;
  if (typeof n == "string" && n) return h`<img class="ava ${t}" src=${n} alt=${s ? "" : o} title=${o} />`;
  const i = [...o].reduce((d, l) => (d * 31 + l.charCodeAt(0)) % 360, 7);
  return h`<span class="ava ${t}" title=${o} style="background:linear-gradient(135deg,hsl(${i} 55% 62%),hsl(${(i + 25) % 360} 55% 42%))">${lt(o)}</span>`;
}
const ct = h`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function Pe(r, e, t = !1) {
  const s = r.status === "completed";
  return h`<button class="check ${t ? "xs" : ""}" type="button" aria-pressed=${s} aria-label=${r.summary}
    @click=${() => e.onToggle(r)}>${ct}</button>`;
}
function pt(r, e) {
  const { date: t, hasTime: s } = D(r.due), o = re($(e.now), t);
  let n;
  return o === -1 ? n = u(e.lang, "yesterday") : o < -1 ? n = u(e.lang, "days_ago", { n: -o }) : o === 0 ? n = u(e.lang, "today") : o === 1 ? n = u(e.lang, "tomorrow") : n = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), s ? `${n} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : n;
}
function ht(r, e) {
  const t = re(new Date(r.completed_at), $(e.now));
  return t <= 0 ? u(e.lang, "done_today") : t === 1 ? u(e.lang, "done_yesterday") : u(e.lang, "done_days_ago", { n: t });
}
function ut(r, e, t) {
  const s = r.status === "completed", o = e.parents.find((l) => l.id === r.parent), n = $(e.now), i = !s && r.due && $(D(r.due).date) < n, a = !s && r.due && +$(D(r.due).date) == +n, d = h`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
  return h`<article class="card ${s ? "done" : ""}">
    <div class="row">
      ${oe(o, !0)}
      <span class="parent-name">${(o == null ? void 0 : o.name) ?? r.parent}</span>
      ${ne(e.hass, r.assignee)}
    </div>
    <div class="row top">
      ${Pe(r, e)}
      <span class="title">${r.summary}</span>
    </div>
    <div class="pills">
      ${!s && t ? h`<span class="pill prio-${r.priority} ${se(["", "red", "orange", "grey"][r.priority])}">${d}${u(e.lang, `prio_${r.priority}`)}</span>` : p}
      ${!s && r.moved > 0 ? h`<span class="pill c-orange">${u(e.lang, r.raised ? "moved_raised" : "moved", { n: r.moved })}</span>` : p}
      ${s && r.completed_at ? h`<span class="pill c-green">${ht(r, e)}</span>` : p}
      ${!s && r.due ? h`<span class="pill ${i ? "c-red" : a ? "today" : "later"}">${pt(r, e)}</span>` : p}
    </div>
  </article>`;
}
function gt(r, e, t, s, o) {
  const n = t ? r.items : r.items.slice(0, 3), i = r.items.length - n.length;
  return h`<article class="card">
    <div class="row">
      ${oe(r.parent)}
      <span class="stack-head">${r.parent.name}</span>
      <span class="stack-sub">${r.items.length}</span>
    </div>
    <div class="stack-rows">
      ${n.map((a) => h`<div class="item">
        ${Pe(a, e, !0)}
        <span class="t">${a.summary}</span>
        ${a.assignee ? ne(e.hass, a.assignee, "xs") : p}
      </div>`)}
      ${i > 0 ? h`<button class="link" type="button" @click=${() => s(r.parent.id, !0)}>${u(e.lang, "more", { n: i })}</button>` : p}
      ${t && r.items.length > 3 ? h`<button class="link muted" type="button" @click=${() => s(r.parent.id, !1)}>${u(e.lang, "collapse")}</button>` : p}
    </div>
    <button class="link" type="button" @click=${() => o(r.parent.id)}>${u(e.lang, "open_list")} ›</button>
  </article>`;
}
const ft = ["todo", "later", "week", "overdue", "today", "done"], bt = (r, e) => +new Date(e.completed_at ?? 0) - +new Date(r.completed_at ?? 0);
function _t(r, e, t) {
  const { ctx: s } = e, o = r.filter((d) => d.status === "needs_action"), n = r.filter((d) => G(d, s) === "done").sort(bt), i = r.filter((d) => d.status === "completed").length - n.length, a = e.group === "date" ? ft.filter((d) => d !== "done" && (d === "todo" || s.enabled.has(d))).map((d) => ({
    id: d,
    label: u(t, `col_${d}`),
    led: d === "overdue" ? "rgb(var(--c-red))" : d === "week" || d === "today" ? "var(--kb-accent)" : void 0,
    items: o.filter((l) => G(l, s) === d).sort(ye)
  })) : [1, 2, 3].map((d) => ({
    id: `p${d}`,
    label: u(t, `prio_${d}`),
    led: d === 1 ? "rgb(var(--c-red))" : d === 2 ? "rgb(var(--c-orange))" : void 0,
    items: o.filter((l) => l.priority === d).sort(ye)
  }));
  return s.enabled.has("done") && a.push({ id: "done", label: u(t, "col_done"), led: "rgb(var(--c-green))", items: n, done: !0 }), { cols: a, olderDone: i };
}
function $t(r, e, t) {
  const { cols: s, olderDone: o } = _t(r, e, t.lang);
  return h`<div class="board">${s.map((n) => {
    const i = n.done ? n.items : at(n.items, e.board.parents, e.parent);
    return h`<section class="col">
      <div class="col-head">
        <span class="led" style=${n.led ? `background:${n.led}` : ""}></span>
        <span class="label">${n.label}</span><span class="count">${n.items.length}</span>
      </div>
      ${i.map((a) => "items" in a ? gt(a, t, e.expanded.has(a.parent.id), e.onExpand, e.onFocus) : ut(a, t, e.group === "date"))}
      ${n.done ? h`<div class="note">${u(t.lang, "done_note", { days: e.ctx.doneDays, older: o })}</div>` : p}
      ${!n.done && i.length === 0 ? h`<div class="empty">${u(t.lang, "nothing")}</div>` : p}
    </section>`;
  })}</div>`;
}
function yt(r, e, t, s, o) {
  const n = s.filter((a) => a.status === "needs_action" && (!e.who || a.assignee === e.who)), i = (a) => {
    const d = e.parent === ((a == null ? void 0 : a.id) ?? null), l = n.filter((g) => !a || g.parent === a.id).length;
    return h`<button class="chip ${a ? se(a.color) : ""}" type="button" aria-pressed=${d}
      @click=${() => o({ parent: d ? null : (a == null ? void 0 : a.id) ?? null })}>
      ${oe(a ?? void 0)}<span>${(a == null ? void 0 : a.name) ?? u(r.lang, "all_parents")}</span><b>${l}</b></button>`;
  };
  return h`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${u(r.lang, "filter_people")}>
      ${t.map((a) => {
    const d = e.who === a;
    return h`<button class="person" type="button" aria-pressed=${d} @click=${() => o({ who: d ? null : a })}>
          ${ne(r.hass, a, "lg", !0)}<span>${De(r.hass, a)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${u(r.lang, "filter_parents")}>
      ${i(null)}${r.parents.map((a) => i(a))}
    </div>
    <div class="seg" role="group" aria-label=${u(r.lang, "group_label")}>
      ${["date", "priority"].map((a) => h`<button type="button" aria-pressed=${e.group === a}
        @click=${() => o({ group: a })}>${u(r.lang, `group_${a}`)}</button>`)}
    </div>
  </div>`;
}
const mt = ["todo", "week", "today", "done"], I = class I extends O {
  constructor() {
    super(...arguments), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set(), this._loadFailed = !1, this._attempts = 0;
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
    super.disconnectedCallback(), window.clearTimeout(this._retry), this._retry = void 0, (e = this._unsub) == null || e.then((t) => t()).catch(() => {
    }), this._unsub = void 0;
  }
  willUpdate(e) {
    e.has("hass") && this._subscribe();
  }
  /** Subscribe once; on failure retry on a capped backoff timer, never on hass updates. */
  _subscribe() {
    if (this._unsub || this._retry !== void 0 || !this.hass || !this.isConnected) return;
    const e = Ge(this.hass, (t) => {
      this._board = t, this._loadFailed = !1;
    });
    this._unsub = e, e.then(() => {
      this._unsub === e && (this._attempts = 0);
    }, () => {
      this._unsub === e && (this._unsub = void 0, this._loadFailed = !0, this._retry = window.setTimeout(() => {
        this._retry = void 0, this._subscribe();
      }, st(this._attempts++)));
    });
  }
  render() {
    var v;
    const e = this.hass, t = this._config, s = this._board;
    if (!e || !t) return p;
    const o = ((v = e.locale) == null ? void 0 : v.language) ?? e.language ?? "en";
    if (!s) return h`<ha-card><div class="loading">${u(o, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const n = /* @__PURE__ */ new Date(), i = s.parents.filter((f) => !t.parents || t.parents.includes(f.id)), a = new Set(t.columns ?? mt);
    a.add("todo"), s.end_of_day_mode === "overdue" && a.add("overdue");
    const d = {
      now: n,
      enabled: a,
      mode: s.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: et(n, rt(t.week_end, e.locale))
    }, l = {
      hass: e,
      lang: o,
      now: n,
      parents: i,
      onToggle: (f) => {
        Qe(e, f.uid, f.status === "completed" ? "needs_action" : "completed").catch((P) => {
          console.warn("household_kanban: set_status failed", P), this._notice = "err_update", window.setTimeout(() => {
            this._notice = void 0;
          }, 5e3);
        });
      }
    }, g = t.people ?? Object.keys(e.states).filter((f) => f.startsWith("person.")), c = this._filter, b = s.items.filter((f) => i.some((P) => P.id === f.parent)), _ = b.filter((f) => (!c.who || f.assignee === c.who) && (!c.parent || f.parent === c.parent));
    return h`<ha-card>
      ${this._notice ? h`<div class="notice" role="alert">${u(o, this._notice)}</div>` : p}
      <header>
        <div class="titles"><h1>${u(o, "title")}</h1><div class="summary">${this._summary(b, d, o)}</div></div>
      </header>
      ${yt(l, c, g, b, (f) => {
      this._filter = { ...c, ...f };
    })}
      ${$t(_, {
      board: { ...s, parents: i },
      ctx: d,
      group: c.group,
      who: c.who,
      parent: c.parent,
      expanded: this._expanded,
      onExpand: (f, P) => {
        const W = new Set(this._expanded);
        P ? W.add(f) : W.delete(f), this._expanded = W;
      },
      onFocus: (f) => {
        this._filter = { ...c, parent: f };
      }
    }, l)}
    </ha-card>`;
  }
  _summary(e, t, s) {
    const o = e.filter((l) => l.status === "needs_action"), n = $(t.now), i = o.filter((l) => l.due && $(D(l.due).date) < n).length, a = o.filter((l) => G(l, t) === "today").length, d = t.mode === "overdue" ? j(s, "sum_overdue", i) : j(s, "sum_moved", o.filter((l) => l.moved > 0).length);
    return [j(s, "sum_open", o.length), j(s, "sum_today", a), d].join(" · ");
  }
};
I.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _board: { state: !0 },
  _filter: { state: !0 },
  _expanded: { state: !0 },
  _loadFailed: { state: !0 },
  _notice: { state: !0 }
}, I.styles = it;
let Q = I;
customElements.define("household-kanban-card", Q);
(window.customCards ?? (window.customCards = [])).push({
  type: "household-kanban-card",
  name: "Household Kanban",
  description: "Kanban board for household tasks"
});
