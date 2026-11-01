/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, G = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), oe = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (G && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = oe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && oe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const De = (s) => new ye(typeof s == "string" ? s : s + "", void 0, Q), Pe = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((r, o, n) => r + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new ye(t, s, Q);
}, Te = (s, e) => {
  if (G) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), o = L.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = t.cssText, s.appendChild(r);
  }
}, ne = G ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return De(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ue, defineProperty: Me, getOwnPropertyDescriptor: Oe, getOwnPropertyNames: ze, getOwnPropertySymbols: Ne, getPrototypeOf: He } = Object, m = globalThis, ie = m.trustedTypes, Re = ie ? ie.emptyScript : "", W = m.reactiveElementPolyfillSupport, T = (s, e) => s, K = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Re : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, me = (s, e) => !Ue(s, e), ae = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: me };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ae) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), o = this.getPropertyDescriptor(e, r, t);
      o !== void 0 && Me(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: o, set: n } = Oe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(i) {
      this[t] = i;
    } };
    return { get: o, set(i) {
      const d = o == null ? void 0 : o.call(this);
      n == null || n.call(this, i), this.requestUpdate(e, d, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ae;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const e = He(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const t = this.properties, r = [...ze(t), ...Ne(t)];
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
      for (const o of r) t.unshift(ne(o));
    } else e !== void 0 && t.push(ne(e));
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
    return Te(e, this.constructor.elementStyles), e;
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
    var n;
    const r = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, r);
    if (o !== void 0 && r.reflect === !0) {
      const i = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : K).toAttribute(t, r.type);
      this._$Em = e, i == null ? this.removeAttribute(o) : this.setAttribute(o, i), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, i;
    const r = this.constructor, o = r._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const d = r.getPropertyOptions(o), a = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((n = d.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? d.converter : K;
      this._$Em = o;
      const c = a.fromAttribute(t, d.type);
      this[o] = c ?? ((i = this._$Ej) == null ? void 0 : i.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, o = !1, n) {
    var i;
    if (e !== void 0) {
      const d = this.constructor;
      if (o === !1 && (n = this[e]), r ?? (r = d.getPropertyOptions(e)), !((r.hasChanged ?? me)(n, t) || r.useDefault && r.reflect && n === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(d._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: o, wrapped: n }, i) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, i ?? t ?? this[e]), n !== !0 || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [n, i] of this._$Ep) this[n] = i;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, i] of o) {
        const { wrapped: d } = i, a = this[n];
        d !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, i, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this._$EO) == null || r.forEach((o) => {
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[T("elementProperties")] = /* @__PURE__ */ new Map(), S[T("finalized")] = /* @__PURE__ */ new Map(), W == null || W({ ReactiveElement: S }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, de = (s) => s, j = U.trustedTypes, le = j ? j.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, ve = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, xe = "?" + y, Le = `<${xe}>`, A = document, O = () => A.createComment(""), z = (s) => s === null || typeof s != "object" && typeof s != "function", X = Array.isArray, je = (s) => X(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Y = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ce = /-->/g, pe = />/g, x = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), he = /'/g, ue = /"/g, we = /^(?:script|style|textarea|title)$/i, Be = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), u = Be(1), E = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ge = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function ke(s, e) {
  if (!X(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return le !== void 0 ? le.createHTML(e) : e;
}
const Ie = (s, e) => {
  const t = s.length - 1, r = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", i = P;
  for (let d = 0; d < t; d++) {
    const a = s[d];
    let c, g, l = -1, b = 0;
    for (; b < a.length && (i.lastIndex = b, g = i.exec(a), g !== null); ) b = i.lastIndex, i === P ? g[1] === "!--" ? i = ce : g[1] !== void 0 ? i = pe : g[2] !== void 0 ? (we.test(g[2]) && (o = RegExp("</" + g[2], "g")), i = x) : g[3] !== void 0 && (i = x) : i === x ? g[0] === ">" ? (i = o ?? P, l = -1) : g[1] === void 0 ? l = -2 : (l = i.lastIndex - g[2].length, c = g[1], i = g[3] === void 0 ? x : g[3] === '"' ? ue : he) : i === ue || i === he ? i = x : i === ce || i === pe ? i = P : (i = x, o = void 0);
    const _ = i === x && s[d + 1].startsWith("/>") ? " " : "";
    n += i === P ? a + Le : l >= 0 ? (r.push(c), a.slice(0, l) + ve + a.slice(l) + y + _) : a + y + (l === -2 ? d : _);
  }
  return [ke(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class N {
  constructor({ strings: e, _$litType$: t }, r) {
    let o;
    this.parts = [];
    let n = 0, i = 0;
    const d = e.length - 1, a = this.parts, [c, g] = Ie(e, t);
    if (this.el = N.createElement(c, r), w.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (o = w.nextNode()) !== null && a.length < d; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const l of o.getAttributeNames()) if (l.endsWith(ve)) {
          const b = g[i++], _ = o.getAttribute(l).split(y), v = /([.?@])?(.*)/.exec(b);
          a.push({ type: 1, index: n, name: v[2], strings: _, ctor: v[1] === "." ? Ve : v[1] === "?" ? We : v[1] === "@" ? Ye : I }), o.removeAttribute(l);
        } else l.startsWith(y) && (a.push({ type: 6, index: n }), o.removeAttribute(l));
        if (we.test(o.tagName)) {
          const l = o.textContent.split(y), b = l.length - 1;
          if (b > 0) {
            o.textContent = j ? j.emptyScript : "";
            for (let _ = 0; _ < b; _++) o.append(l[_], O()), w.nextNode(), a.push({ type: 2, index: ++n });
            o.append(l[b], O());
          }
        }
      } else if (o.nodeType === 8) if (o.data === xe) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = o.data.indexOf(y, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += y.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const r = A.createElement("template");
    return r.innerHTML = e, r;
  }
}
function C(s, e, t = s, r) {
  var i, d;
  if (e === E) return e;
  let o = r !== void 0 ? (i = t._$Co) == null ? void 0 : i[r] : t._$Cl;
  const n = z(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((d = o == null ? void 0 : o._$AO) == null || d.call(o, !1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = o : t._$Cl = o), o !== void 0 && (e = C(s, o._$AS(s, e.values), o, r)), e;
}
class Fe {
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
    const { el: { content: t }, parts: r } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? A).importNode(t, !0);
    w.currentNode = o;
    let n = w.nextNode(), i = 0, d = 0, a = r[0];
    for (; a !== void 0; ) {
      if (i === a.index) {
        let c;
        a.type === 2 ? c = new H(n, n.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (c = new qe(n, this, e)), this._$AV.push(c), a = r[++d];
      }
      i !== (a == null ? void 0 : a.index) && (n = w.nextNode(), i++);
    }
    return w.currentNode = A, o;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class H {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, o) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = C(this, e, t), z(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : je(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(A.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: r } = e, o = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = N.createElement(ke(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(t);
    else {
      const i = new Fe(o, this), d = i.u(this.options);
      i.p(t), this.T(d), this._$AH = i;
    }
  }
  _$AC(e) {
    let t = ge.get(e.strings);
    return t === void 0 && ge.set(e.strings, t = new N(e)), t;
  }
  k(e) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, o = 0;
    for (const n of e) o === t.length ? t.push(r = new H(this.O(O()), this.O(O()), this, this.options)) : r = t[o], r._$AI(n), o++;
    o < t.length && (this._$AR(r && r._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = de(e).nextSibling;
      de(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class I {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, o, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = h;
  }
  _$AI(e, t = this, r, o) {
    const n = this.strings;
    let i = !1;
    if (n === void 0) e = C(this, e, t, 0), i = !z(e) || e !== this._$AH && e !== E, i && (this._$AH = e);
    else {
      const d = e;
      let a, c;
      for (e = n[0], a = 0; a < n.length - 1; a++) c = C(this, d[r + a], t, a), c === E && (c = this._$AH[a]), i || (i = !z(c) || c !== this._$AH[a]), c === h ? e = h : e !== h && (e += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    i && !o && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ve extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class We extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class Ye extends I {
  constructor(e, t, r, o, n) {
    super(e, t, r, o, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = C(this, e, t, 0) ?? h) === E) return;
    const r = this._$AH, o = e === h && r !== h || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== h && (r === h || o);
    o && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class qe {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    C(this, e);
  }
}
const q = U.litHtmlPolyfillSupport;
q == null || q(N, H), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.3");
const Ze = (s, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = r._$litPart$;
  if (o === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = o = new H(e.insertBefore(O(), n), n, void 0, t ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis;
class M extends S {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ze(t, this.renderRoot, this.renderOptions);
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
var $e;
M._$litElement$ = !0, M.finalized = !0, ($e = k.litElementHydrateSupport) == null || $e.call(k, { LitElement: M });
const Z = k.litElementPolyfillSupport;
Z == null || Z({ LitElement: M });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.2");
const Ae = "household_kanban";
function Ke(s, e) {
  return s.connection.subscribeMessage((t) => e(t.board), { type: `${Ae}/subscribe` });
}
function Je(s, e, t) {
  return s.callService(Ae, "set_status", { uid: e, status: t });
}
const Ge = 864e5;
function $(s) {
  return new Date(s.getFullYear(), s.getMonth(), s.getDate());
}
function R(s, e) {
  return new Date(s.getFullYear(), s.getMonth(), s.getDate() + e);
}
function ee(s, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(s.getFullYear(), s.getMonth(), s.getDate())) / Ge);
}
function D(s) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const [e, t, r] = s.split("-").map(Number);
    return { date: new Date(e, t - 1, r), hasTime: !1 };
  }
  return { date: new Date(s), hasTime: !0 };
}
function Qe(s, e) {
  const t = $(s), r = (t.getDay() - e + 7) % 7, o = R(t, -r);
  return r === 6 ? { start: R(o, 7), end: R(o, 13) } : { start: o, end: R(o, 6) };
}
const Xe = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function et(s, e) {
  var o, n;
  if (s === "saturday") return 0;
  if (s === "sunday") return 1;
  const t = e == null ? void 0 : e.first_weekday, r = Xe.indexOf(t ?? "");
  if (r >= 0) return r;
  try {
    const i = new Intl.Locale((e == null ? void 0 : e.language) ?? "en"), d = (n = ((o = i.getWeekInfo) == null ? void 0 : o.call(i)) ?? i.weekInfo) == null ? void 0 : n.firstDay;
    if (d) return d % 7;
  } catch {
  }
  return 1;
}
const Se = {
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
  sum_open: "{n} open",
  sum_today: "{n} for today",
  sum_moved: "{n} moved from yesterday",
  sum_overdue: "{n} overdue",
  loading: "Loading…"
}, tt = {
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
  sum_open: "{n} otevřených",
  sum_today: "{n} na dnes",
  sum_moved: "{n} přesunuté ze včerejška",
  sum_overdue: "{n} po termínu",
  loading: "Načítání…"
}, rt = { en: Se, cs: tt };
function p(s, e, t = {}) {
  return (rt[(s ?? "en").split("-")[0]] ?? Se)[e].replace(/\{(\w+)\}/g, (o, n) => String(t[n] ?? ""));
}
const st = Pe`
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
  .loading { padding: 24px; text-align: center; color: var(--kb-text-2); }
`;
function fe(s, e) {
  const t = $(e.now);
  if (s.status === "completed")
    return !s.completed_at || !e.enabled.has("done") ? null : ee(new Date(s.completed_at), t) < e.doneDays ? "done" : null;
  if (!s.due) return "todo";
  const r = $(D(s.due).date), o = (...n) => n.find((i) => e.enabled.has(i)) ?? "todo";
  return r < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : o("today", "week") : +r == +t ? o("today", "week") : r <= e.week.end ? o("week") : o("later");
}
function be(s) {
  if (!s.due) return 1 / 0;
  const { date: e, hasTime: t } = D(s.due);
  return t ? +e : +e + 86399999;
}
function _e(s, e) {
  const t = be(s), r = be(e);
  return t !== r ? t < r ? -1 : 1 : s.priority - e.priority || +new Date(s.created_at) - +new Date(e.created_at);
}
function ot(s, e, t) {
  const r = [], o = /* @__PURE__ */ new Map();
  for (const n of s) {
    const i = e.find((a) => a.id === n.parent);
    if (!(i != null && i.collapse) || i.id === t) {
      r.push(n);
      continue;
    }
    let d = o.get(i.id);
    d || (d = { parent: i, items: [] }, o.set(i.id, d), r.push(d)), d.items.push(n);
  }
  return r;
}
const nt = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], te = (s) => `c-${nt.includes(s) ? s : "grey"}`;
function Ee(s, e) {
  var t;
  return String(((t = s.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function it(s) {
  return s.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function re(s, e = !1) {
  return u`<span class="dot ${e ? "sm" : ""} ${te((s == null ? void 0 : s.color) ?? "grey")}"><ha-icon .icon=${(s == null ? void 0 : s.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function se(s, e, t = "") {
  var i;
  if (!e) return u`<span class="ava none ${t}" title="-">+</span>`;
  const r = Ee(s, e), o = (i = s.states[e]) == null ? void 0 : i.attributes.entity_picture;
  if (typeof o == "string" && o) return u`<img class="ava ${t}" src=${o} alt=${r} title=${r} />`;
  const n = [...r].reduce((d, a) => (d * 31 + a.charCodeAt(0)) % 360, 7);
  return u`<span class="ava ${t}" title=${r} style="background:linear-gradient(135deg,hsl(${n} 55% 62%),hsl(${(n + 25) % 360} 55% 42%))">${it(r)}</span>`;
}
const at = u`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function Ce(s, e, t, r = !1) {
  const o = s.status === "completed";
  return u`<button class="check ${r ? "xs" : ""}" type="button" aria-pressed=${o} aria-label=${t}
    @click=${() => e.onToggle(s)}>${at}</button>`;
}
function dt(s, e) {
  const { date: t, hasTime: r } = D(s.due), o = ee($(e.now), t);
  let n;
  return o === -1 ? n = p(e.lang, "yesterday") : o < -1 ? n = p(e.lang, "days_ago", { n: -o }) : o === 0 ? n = p(e.lang, "today") : o === 1 ? n = p(e.lang, "tomorrow") : n = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), r ? `${n} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : n;
}
function lt(s, e) {
  const t = ee(new Date(s.completed_at), $(e.now));
  return t <= 0 ? p(e.lang, "done_today") : t === 1 ? p(e.lang, "done_yesterday") : p(e.lang, "done_days_ago", { n: t });
}
function ct(s, e, t) {
  const r = s.status === "completed", o = e.parents.find((c) => c.id === s.parent), n = $(e.now), i = !r && s.due && $(D(s.due).date) < n, d = !r && s.due && +$(D(s.due).date) == +n, a = u`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
  return u`<article class="card ${r ? "done" : ""}">
    <div class="row">
      ${re(o, !0)}
      <span class="parent-name">${(o == null ? void 0 : o.name) ?? s.parent}</span>
      ${se(e.hass, s.assignee)}
    </div>
    <div class="row top">
      ${Ce(s, e, p(e.lang, r ? "mark_open" : "mark_done"))}
      <span class="title">${s.summary}</span>
    </div>
    <div class="pills">
      ${!r && t ? u`<span class="pill prio-${s.priority} ${te(["", "red", "orange", "grey"][s.priority])}">${a}${p(e.lang, `prio_${s.priority}`)}</span>` : h}
      ${!r && s.moved > 0 ? u`<span class="pill c-orange">${p(e.lang, s.raised ? "moved_raised" : "moved", { n: s.moved })}</span>` : h}
      ${r && s.completed_at ? u`<span class="pill c-green">${lt(s, e)}</span>` : h}
      ${!r && s.due ? u`<span class="pill ${i ? "c-red" : d ? "today" : "later"}">${dt(s, e)}</span>` : h}
    </div>
  </article>`;
}
function pt(s, e, t, r, o) {
  const n = t ? s.items : s.items.slice(0, 3), i = s.items.length - n.length;
  return u`<article class="card">
    <div class="row">
      ${re(s.parent)}
      <span class="stack-head">${s.parent.name}</span>
      <span class="stack-sub">${s.items.length}</span>
    </div>
    <div class="stack-rows">
      ${n.map((d) => u`<div class="item">
        ${Ce(d, e, p(e.lang, "bought"), !0)}
        <span class="t">${d.summary}</span>
        ${d.assignee ? se(e.hass, d.assignee, "xs") : h}
      </div>`)}
      ${i > 0 ? u`<button class="link" type="button" @click=${() => r(s.parent.id, !0)}>${p(e.lang, "more", { n: i })}</button>` : h}
      ${t && s.items.length > 3 ? u`<button class="link muted" type="button" @click=${() => r(s.parent.id, !1)}>${p(e.lang, "collapse")}</button>` : h}
    </div>
    <button class="link" type="button" @click=${() => o(s.parent.id)}>${p(e.lang, "open_list")} ›</button>
  </article>`;
}
const ht = ["todo", "later", "week", "overdue", "today", "done"], ut = (s, e) => +new Date(e.completed_at ?? 0) - +new Date(s.completed_at ?? 0);
function gt(s, e, t) {
  const { ctx: r } = e, o = s.filter((a) => a.status === "needs_action"), n = s.filter((a) => fe(a, r) === "done").sort(ut), i = s.filter((a) => a.status === "completed").length - n.length, d = e.group === "date" ? ht.filter((a) => a !== "done" && (a === "todo" || r.enabled.has(a))).map((a) => ({
    id: a,
    label: p(t, `col_${a}`),
    led: a === "overdue" ? "rgb(var(--c-red))" : a === "week" || a === "today" ? "var(--kb-accent)" : void 0,
    items: o.filter((c) => fe(c, r) === a).sort(_e)
  })) : [1, 2, 3].map((a) => ({
    id: `p${a}`,
    label: p(t, `prio_${a}`),
    led: a === 1 ? "rgb(var(--c-red))" : a === 2 ? "rgb(var(--c-orange))" : void 0,
    items: o.filter((c) => c.priority === a).sort(_e)
  }));
  return r.enabled.has("done") && d.push({ id: "done", label: p(t, "col_done"), led: "rgb(var(--c-green))", items: n, done: !0 }), { cols: d, olderDone: i };
}
function ft(s, e, t) {
  const { cols: r, olderDone: o } = gt(s, e, t.lang);
  return u`<div class="board">${r.map((n) => {
    const i = n.done ? n.items : ot(n.items, e.board.parents, e.parent);
    return u`<section class="col">
      <div class="col-head">
        <span class="led" style=${n.led ? `background:${n.led}` : ""}></span>
        <span class="label">${n.label}</span><span class="count">${n.items.length}</span>
      </div>
      ${i.map((d) => "items" in d ? pt(d, t, e.expanded.has(d.parent.id), e.onExpand, e.onFocus) : ct(d, t, e.group === "date"))}
      ${n.done ? u`<div class="note">${p(t.lang, "done_note", { days: e.ctx.doneDays, older: o })}</div>` : h}
      ${!n.done && i.length === 0 ? u`<div class="empty">${p(t.lang, "nothing")}</div>` : h}
    </section>`;
  })}</div>`;
}
function bt(s, e, t, r, o) {
  const n = r.filter((d) => d.status === "needs_action" && (!e.who || d.assignee === e.who)), i = (d) => {
    const a = e.parent === ((d == null ? void 0 : d.id) ?? null), c = n.filter((g) => !d || g.parent === d.id).length;
    return u`<button class="chip ${d ? te(d.color) : ""}" type="button" aria-pressed=${a}
      @click=${() => o({ parent: a ? null : (d == null ? void 0 : d.id) ?? null })}>
      ${re(d ?? void 0)}<span>${(d == null ? void 0 : d.name) ?? p(s.lang, "all_parents")}</span><b>${c}</b></button>`;
  };
  return u`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${p(s.lang, "filter_people")}>
      ${t.map((d) => {
    const a = e.who === d;
    return u`<button class="person" type="button" aria-pressed=${a} @click=${() => o({ who: a ? null : d })}>
          ${se(s.hass, d, "lg")}<span>${Ee(s.hass, d)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${p(s.lang, "filter_parents")}>
      ${i(null)}${s.parents.map((d) => i(d))}
    </div>
    <div class="seg" role="group" aria-label=${p(s.lang, "group_label")}>
      ${["date", "priority"].map((d) => u`<button type="button" aria-pressed=${e.group === d}
        @click=${() => o({ group: d })}>${p(s.lang, `group_${d}`)}</button>`)}
    </div>
  </div>`;
}
const _t = ["todo", "week", "today", "done"], B = class B extends M {
  constructor() {
    super(...arguments), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set();
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
    super.disconnectedCallback(), (e = this._unsub) == null || e.then((t) => t()).catch(() => {
    }), this._unsub = void 0;
  }
  willUpdate(e) {
    e.has("hass") && this._subscribe();
  }
  _subscribe() {
    this._unsub || !this.hass || !this.isConnected || (this._unsub = Ke(this.hass, (e) => {
      this._board = e;
    }), this._unsub.catch(() => {
      this._unsub = void 0;
    }));
  }
  render() {
    var v;
    const e = this.hass, t = this._config, r = this._board;
    if (!e || !t) return h;
    const o = ((v = e.locale) == null ? void 0 : v.language) ?? e.language ?? "en";
    if (!r) return u`<ha-card><div class="loading">${p(o, "loading")}</div></ha-card>`;
    const n = /* @__PURE__ */ new Date(), i = r.parents.filter((f) => !t.parents || t.parents.includes(f.id)), d = new Set(t.columns ?? _t);
    d.add("todo"), r.end_of_day_mode === "overdue" && d.add("overdue");
    const a = {
      now: n,
      enabled: d,
      mode: r.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: Qe(n, et(t.week_end, e.locale))
    }, c = {
      hass: e,
      lang: o,
      now: n,
      parents: i,
      onToggle: (f) => void Je(e, f.uid, f.status === "completed" ? "needs_action" : "completed")
    }, g = t.people ?? Object.keys(e.states).filter((f) => f.startsWith("person.")), l = this._filter, b = r.items.filter((f) => i.some((F) => F.id === f.parent)), _ = b.filter((f) => (!l.who || f.assignee === l.who) && (!l.parent || f.parent === l.parent));
    return u`<ha-card>
      <header>
        <div class="titles"><h1>${p(o, "title")}</h1><div class="summary">${this._summary(b, a, o)}</div></div>
      </header>
      ${bt(c, l, g, b, (f) => {
      this._filter = { ...l, ...f };
    })}
      ${ft(_, {
      board: { ...r, parents: i },
      ctx: a,
      group: l.group,
      who: l.who,
      parent: l.parent,
      expanded: this._expanded,
      onExpand: (f, F) => {
        const V = new Set(this._expanded);
        F ? V.add(f) : V.delete(f), this._expanded = V;
      },
      onFocus: (f) => {
        this._filter = { ...l, parent: f };
      }
    }, c)}
    </ha-card>`;
  }
  _summary(e, t, r) {
    const o = e.filter((a) => a.status === "needs_action"), n = $(t.now), i = o.map((a) => a.due ? +$(D(a.due).date) - +n : null), d = t.mode === "overdue" ? p(r, "sum_overdue", { n: i.filter((a) => a !== null && a < 0).length }) : p(r, "sum_moved", { n: o.filter((a) => a.moved > 0).length });
    return [p(r, "sum_open", { n: o.length }), p(r, "sum_today", { n: i.filter((a) => a === 0).length }), d].join(" · ");
  }
};
B.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _board: { state: !0 },
  _filter: { state: !0 },
  _expanded: { state: !0 }
}, B.styles = st;
let J = B;
customElements.define("household-kanban-card", J);
(window.customCards ?? (window.customCards = [])).push({
  type: "household-kanban-card",
  name: "Household Kanban",
  description: "Kanban board for household tasks"
});
