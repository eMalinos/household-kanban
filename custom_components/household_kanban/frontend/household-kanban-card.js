/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = globalThis, bn = mt.ShadowRoot && (mt.ShadyCSS === void 0 || mt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, mn = Symbol(), Cn = /* @__PURE__ */ new WeakMap();
let co = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== mn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (bn && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = Cn.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && Cn.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Go = (n) => new co(typeof n == "string" ? n : n + "", void 0, mn), ho = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((o, i, r) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new co(t, n, mn);
}, Vo = (n, e) => {
  if (bn) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), i = mt.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = t.cssText, n.appendChild(o);
  }
}, Tn = bn ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return Go(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ko, defineProperty: Zo, getOwnPropertyDescriptor: Jo, getOwnPropertyNames: Qo, getOwnPropertySymbols: ei, getPrototypeOf: ti } = Object, fe = globalThis, On = fe.trustedTypes, ni = On ? On.emptyScript : "", jt = fe.reactiveElementPolyfillSupport, Ke = (n, e) => n, on = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? ni : null;
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
} }, po = (n, e) => !Ko(n, e), Mn = { attribute: !0, type: String, converter: on, reflect: !1, useDefault: !1, hasChanged: po };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), fe.litPropertyMetadata ?? (fe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Oe = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Mn) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(e, o, t);
      i !== void 0 && Zo(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: i, set: r } = Jo(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const s = i == null ? void 0 : i.call(this);
      r == null || r.call(this, a), this.requestUpdate(e, s, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Mn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ke("elementProperties"))) return;
    const e = ti(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ke("properties"))) {
      const t = this.properties, o = [...Qo(t), ...ei(t)];
      for (const i of o) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [o, i] of t) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, o] of this.elementProperties) {
      const i = this._$Eu(t, o);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const i of o) t.unshift(Tn(i));
    } else e !== void 0 && t.push(Tn(e));
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
    return Vo(e, this.constructor.elementStyles), e;
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
    var r;
    const o = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, o);
    if (i !== void 0 && o.reflect === !0) {
      const a = (((r = o.converter) == null ? void 0 : r.toAttribute) !== void 0 ? o.converter : on).toAttribute(t, o.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, a;
    const o = this.constructor, i = o._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = o.getPropertyOptions(i), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((r = s.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? s.converter : on;
      this._$Em = i;
      const d = l.fromAttribute(t, s.type);
      this[i] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, i = !1, r) {
    var a;
    if (e !== void 0) {
      const s = this.constructor;
      if (i === !1 && (r = this[e]), o ?? (o = s.getPropertyOptions(e)), !((o.hasChanged ?? po)(r, t) || o.useDefault && o.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(s._$Eu(e, o)))) return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: o, reflect: i, wrapped: r }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, a] of i) {
        const { wrapped: s } = a, l = this[r];
        s !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, a, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (o = this._$EO) == null || o.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((o) => {
      var i;
      return (i = o.hostUpdated) == null ? void 0 : i.call(o);
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
Oe.elementStyles = [], Oe.shadowRootOptions = { mode: "open" }, Oe[Ke("elementProperties")] = /* @__PURE__ */ new Map(), Oe[Ke("finalized")] = /* @__PURE__ */ new Map(), jt == null || jt({ ReactiveElement: Oe }), (fe.reactiveElementVersions ?? (fe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ze = globalThis, Pn = (n) => n, $t = Ze.trustedTypes, zn = $t ? $t.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, uo = "$lit$", ce = `lit$${Math.random().toFixed(9).slice(2)}$`, fo = "?" + ce, oi = `<${fo}>`, Ee = document, ot = () => Ee.createComment(""), it = (n) => n === null || typeof n != "object" && typeof n != "function", _n = Array.isArray, ii = (n) => _n(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", qt = `[ 	
\f\r]`, We = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nn = /-->/g, In = />/g, ve = RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Rn = /'/g, Hn = /"/g, go = /^(?:script|style|textarea|title)$/i, ri = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), h = ri(1), Re = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), Ln = /* @__PURE__ */ new WeakMap(), ke = Ee.createTreeWalker(Ee, 129);
function bo(n, e) {
  if (!_n(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zn !== void 0 ? zn.createHTML(e) : e;
}
const si = (n, e) => {
  const t = n.length - 1, o = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = We;
  for (let s = 0; s < t; s++) {
    const l = n[s];
    let d, p, c = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, p = a.exec(l), p !== null); ) f = a.lastIndex, a === We ? p[1] === "!--" ? a = Nn : p[1] !== void 0 ? a = In : p[2] !== void 0 ? (go.test(p[2]) && (i = RegExp("</" + p[2], "g")), a = ve) : p[3] !== void 0 && (a = ve) : a === ve ? p[0] === ">" ? (a = i ?? We, c = -1) : p[1] === void 0 ? c = -2 : (c = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? ve : p[3] === '"' ? Hn : Rn) : a === Hn || a === Rn ? a = ve : a === Nn || a === In ? a = We : (a = ve, i = void 0);
    const _ = a === ve && n[s + 1].startsWith("/>") ? " " : "";
    r += a === We ? l + oi : c >= 0 ? (o.push(d), l.slice(0, c) + uo + l.slice(c) + ce + _) : l + ce + (c === -2 ? s : _);
  }
  return [bo(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class rt {
  constructor({ strings: e, _$litType$: t }, o) {
    let i;
    this.parts = [];
    let r = 0, a = 0;
    const s = e.length - 1, l = this.parts, [d, p] = si(e, t);
    if (this.el = rt.createElement(d, o), ke.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = ke.nextNode()) !== null && l.length < s; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(uo)) {
          const f = p[a++], _ = i.getAttribute(c).split(ce), k = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: r, name: k[2], strings: _, ctor: k[1] === "." ? li : k[1] === "?" ? di : k[1] === "@" ? ci : Nt }), i.removeAttribute(c);
        } else c.startsWith(ce) && (l.push({ type: 6, index: r }), i.removeAttribute(c));
        if (go.test(i.tagName)) {
          const c = i.textContent.split(ce), f = c.length - 1;
          if (f > 0) {
            i.textContent = $t ? $t.emptyScript : "";
            for (let _ = 0; _ < f; _++) i.append(c[_], ot()), ke.nextNode(), l.push({ type: 2, index: ++r });
            i.append(c[f], ot());
          }
        }
      } else if (i.nodeType === 8) if (i.data === fo) l.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(ce, c + 1)) !== -1; ) l.push({ type: 7, index: r }), c += ce.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const o = Ee.createElement("template");
    return o.innerHTML = e, o;
  }
}
function He(n, e, t = n, o) {
  var a, s;
  if (e === Re) return e;
  let i = o !== void 0 ? (a = t._$Co) == null ? void 0 : a[o] : t._$Cl;
  const r = it(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((s = i == null ? void 0 : i._$AO) == null || s.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, t, o)), o !== void 0 ? (t._$Co ?? (t._$Co = []))[o] = i : t._$Cl = i), i !== void 0 && (e = He(n, i._$AS(n, e.values), i, o)), e;
}
class ai {
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
    const { el: { content: t }, parts: o } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? Ee).importNode(t, !0);
    ke.currentNode = i;
    let r = ke.nextNode(), a = 0, s = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new st(r, r.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (d = new hi(r, this, e)), this._$AV.push(d), l = o[++s];
      }
      a !== (l == null ? void 0 : l.index) && (r = ke.nextNode(), a++);
    }
    return ke.currentNode = Ee, i;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class st {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, o, i) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = He(this, e, t), it(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== Re && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ii(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && it(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ee.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: o } = e, i = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = rt.createElement(bo(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(t);
    else {
      const a = new ai(i, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Ln.get(e.strings);
    return t === void 0 && Ln.set(e.strings, t = new rt(e)), t;
  }
  k(e) {
    _n(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, i = 0;
    for (const r of e) i === t.length ? t.push(o = new st(this.O(ot()), this.O(ot()), this, this.options)) : o = t[i], o._$AI(r), i++;
    i < t.length && (this._$AR(o && o._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = Pn(e).nextSibling;
      Pn(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Nt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, i, r) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = b;
  }
  _$AI(e, t = this, o, i) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = He(this, e, t, 0), a = !it(e) || e !== this._$AH && e !== Re, a && (this._$AH = e);
    else {
      const s = e;
      let l, d;
      for (e = r[0], l = 0; l < r.length - 1; l++) d = He(this, s[o + l], t, l), d === Re && (d = this._$AH[l]), a || (a = !it(d) || d !== this._$AH[l]), d === b ? e = b : e !== b && (e += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class li extends Nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class di extends Nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class ci extends Nt {
  constructor(e, t, o, i, r) {
    super(e, t, o, i, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = He(this, e, t, 0) ?? b) === Re) return;
    const o = this._$AH, i = e === b && o !== b || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, r = e !== b && (o === b || i);
    i && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class hi {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    He(this, e);
  }
}
const Ut = Ze.litHtmlPolyfillSupport;
Ut == null || Ut(rt, st), (Ze.litHtmlVersions ?? (Ze.litHtmlVersions = [])).push("3.3.3");
const pi = (n, e, t) => {
  const o = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = o._$litPart$;
  if (i === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    o._$litPart$ = i = new st(e.insertBefore(ot(), r), r, void 0, t ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = globalThis;
class ze extends Oe {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pi(t, this.renderRoot, this.renderOptions);
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
    return Re;
  }
}
var lo;
ze._$litElement$ = !0, ze.finalized = !0, (lo = $e.litElementHydrateSupport) == null || lo.call($e, { LitElement: ze });
const Bt = $e.litElementPolyfillSupport;
Bt == null || Bt({ LitElement: ze });
($e.litElementVersions ?? ($e.litElementVersions = [])).push("4.2.2");
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Fn(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    e && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function Q(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Fn(Object(t), !0).forEach(function(o) {
      ui(n, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : Fn(Object(t)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return n;
}
function _t(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _t = function(e) {
    return typeof e;
  } : _t = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, _t(n);
}
function ui(n, e, t) {
  return e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function re() {
  return re = Object.assign || function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
    }
    return n;
  }, re.apply(this, arguments);
}
function fi(n, e) {
  if (n == null) return {};
  var t = {}, o = Object.keys(n), i, r;
  for (r = 0; r < o.length; r++)
    i = o[r], !(e.indexOf(i) >= 0) && (t[i] = n[i]);
  return t;
}
function gi(n, e) {
  if (n == null) return {};
  var t = fi(n, e), o, i;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    for (i = 0; i < r.length; i++)
      o = r[i], !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(n, o) && (t[o] = n[o]);
  }
  return t;
}
var bi = "1.15.6";
function oe(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var se = oe(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), at = oe(/Edge/i), jn = oe(/firefox/i), Je = oe(/safari/i) && !oe(/chrome/i) && !oe(/android/i), vn = oe(/iP(ad|od|hone)/i), mo = oe(/chrome/i) && oe(/android/i), _o = {
  capture: !1,
  passive: !1
};
function S(n, e, t) {
  n.addEventListener(e, t, !se && _o);
}
function $(n, e, t) {
  n.removeEventListener(e, t, !se && _o);
}
function St(n, e) {
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
function vo(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function X(n, e, t, o) {
  if (n) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? n.parentNode === t && St(n, e) : St(n, e)) || o && n === t)
        return n;
      if (n === t) break;
    } while (n = vo(n));
  }
  return null;
}
var qn = /\s+/g;
function U(n, e, t) {
  if (n && e)
    if (n.classList)
      n.classList[t ? "add" : "remove"](e);
    else {
      var o = (" " + n.className + " ").replace(qn, " ").replace(" " + e + " ", " ");
      n.className = (o + (t ? " " + e : "")).replace(qn, " ");
    }
}
function v(n, e, t) {
  var o = n && n.style;
  if (o) {
    if (t === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? t = document.defaultView.getComputedStyle(n, "") : n.currentStyle && (t = n.currentStyle), e === void 0 ? t : t[e];
    !(e in o) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), o[e] = t + (typeof t == "string" ? "" : "px");
  }
}
function Ne(n, e) {
  var t = "";
  if (typeof n == "string")
    t = n;
  else
    do {
      var o = v(n, "transform");
      o && o !== "none" && (t = o + " " + t);
    } while (!e && (n = n.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(t);
}
function yo(n, e, t) {
  if (n) {
    var o = n.getElementsByTagName(e), i = 0, r = o.length;
    if (t)
      for (; i < r; i++)
        t(o[i], i);
    return o;
  }
  return [];
}
function J() {
  var n = document.scrollingElement;
  return n || document.documentElement;
}
function M(n, e, t, o, i) {
  if (!(!n.getBoundingClientRect && n !== window)) {
    var r, a, s, l, d, p, c;
    if (n !== window && n.parentNode && n !== J() ? (r = n.getBoundingClientRect(), a = r.top, s = r.left, l = r.bottom, d = r.right, p = r.height, c = r.width) : (a = 0, s = 0, l = window.innerHeight, d = window.innerWidth, p = window.innerHeight, c = window.innerWidth), (e || t) && n !== window && (i = i || n.parentNode, !se))
      do
        if (i && i.getBoundingClientRect && (v(i, "transform") !== "none" || t && v(i, "position") !== "static")) {
          var f = i.getBoundingClientRect();
          a -= f.top + parseInt(v(i, "border-top-width")), s -= f.left + parseInt(v(i, "border-left-width")), l = a + r.height, d = s + r.width;
          break;
        }
      while (i = i.parentNode);
    if (o && n !== window) {
      var _ = Ne(i || n), k = _ && _.a, u = _ && _.d;
      _ && (a /= u, s /= k, c /= k, p /= u, l = a + p, d = s + c);
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
function Un(n, e, t) {
  for (var o = pe(n, !0), i = M(n)[e]; o; ) {
    var r = M(o)[t], a = void 0;
    if (a = i >= r, !a) return o;
    if (o === J()) break;
    o = pe(o, !1);
  }
  return !1;
}
function Le(n, e, t, o) {
  for (var i = 0, r = 0, a = n.children; r < a.length; ) {
    if (a[r].style.display !== "none" && a[r] !== y.ghost && (o || a[r] !== y.dragged) && X(a[r], t.draggable, n, !1)) {
      if (i === e)
        return a[r];
      i++;
    }
    r++;
  }
  return null;
}
function yn(n, e) {
  for (var t = n.lastElementChild; t && (t === y.ghost || v(t, "display") === "none" || e && !St(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function Y(n, e) {
  var t = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== y.clone && (!e || St(n, e)) && t++;
  return t;
}
function Bn(n) {
  var e = 0, t = 0, o = J();
  if (n)
    do {
      var i = Ne(n), r = i.a, a = i.d;
      e += n.scrollLeft * r, t += n.scrollTop * a;
    } while (n !== o && (n = n.parentNode));
  return [e, t];
}
function mi(n, e) {
  for (var t in n)
    if (n.hasOwnProperty(t)) {
      for (var o in e)
        if (e.hasOwnProperty(o) && e[o] === n[t][o]) return Number(t);
    }
  return -1;
}
function pe(n, e) {
  if (!n || !n.getBoundingClientRect) return J();
  var t = n, o = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var i = v(t);
      if (t.clientWidth < t.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return J();
        if (o || e) return t;
        o = !0;
      }
    }
  while (t = t.parentNode);
  return J();
}
function _i(n, e) {
  if (n && e)
    for (var t in e)
      e.hasOwnProperty(t) && (n[t] = e[t]);
  return n;
}
function Yt(n, e) {
  return Math.round(n.top) === Math.round(e.top) && Math.round(n.left) === Math.round(e.left) && Math.round(n.height) === Math.round(e.height) && Math.round(n.width) === Math.round(e.width);
}
var Qe;
function xo(n, e) {
  return function() {
    if (!Qe) {
      var t = arguments, o = this;
      t.length === 1 ? n.call(o, t[0]) : n.apply(o, t), Qe = setTimeout(function() {
        Qe = void 0;
      }, e);
    }
  };
}
function vi() {
  clearTimeout(Qe), Qe = void 0;
}
function wo(n, e, t) {
  n.scrollLeft += e, n.scrollTop += t;
}
function ko(n) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(n).cloneNode(!0) : t ? t(n).clone(!0)[0] : n.cloneNode(!0);
}
function $o(n, e, t) {
  var o = {};
  return Array.from(n.children).forEach(function(i) {
    var r, a, s, l;
    if (!(!X(i, e.draggable, n, !1) || i.animated || i === t)) {
      var d = M(i);
      o.left = Math.min((r = o.left) !== null && r !== void 0 ? r : 1 / 0, d.left), o.top = Math.min((a = o.top) !== null && a !== void 0 ? a : 1 / 0, d.top), o.right = Math.max((s = o.right) !== null && s !== void 0 ? s : -1 / 0, d.right), o.bottom = Math.max((l = o.bottom) !== null && l !== void 0 ? l : -1 / 0, d.bottom);
    }
  }), o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
var j = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function yi() {
  var n = [], e;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(i) {
          if (!(v(i, "display") === "none" || i === y.ghost)) {
            n.push({
              target: i,
              rect: M(i)
            });
            var r = Q({}, n[n.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = Ne(i, !0);
              a && (r.top -= a.f, r.left -= a.e);
            }
            i.fromRect = r;
          }
        });
      }
    },
    addAnimationState: function(o) {
      n.push(o);
    },
    removeAnimationState: function(o) {
      n.splice(mi(n, {
        target: o
      }), 1);
    },
    animateAll: function(o) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof o == "function" && o();
        return;
      }
      var r = !1, a = 0;
      n.forEach(function(s) {
        var l = 0, d = s.target, p = d.fromRect, c = M(d), f = d.prevFromRect, _ = d.prevToRect, k = s.rect, u = Ne(d, !0);
        u && (c.top -= u.f, c.left -= u.e), d.toRect = c, d.thisAnimationDuration && Yt(f, c) && !Yt(p, c) && // Make sure animatingRect is on line between toRect & fromRect
        (k.top - c.top) / (k.left - c.left) === (p.top - c.top) / (p.left - c.left) && (l = wi(k, f, _, i.options)), Yt(c, p) || (d.prevFromRect = p, d.prevToRect = c, l || (l = i.options.animation), i.animate(d, k, c, l)), l && (r = !0, a = Math.max(a, l), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, l), d.thisAnimationDuration = l);
      }), clearTimeout(e), r ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, a) : typeof o == "function" && o(), n = [];
    },
    animate: function(o, i, r, a) {
      if (a) {
        v(o, "transition", ""), v(o, "transform", "");
        var s = Ne(this.el), l = s && s.a, d = s && s.d, p = (i.left - r.left) / (l || 1), c = (i.top - r.top) / (d || 1);
        o.animatingX = !!p, o.animatingY = !!c, v(o, "transform", "translate3d(" + p + "px," + c + "px,0)"), this.forRepaintDummy = xi(o), v(o, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), v(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          v(o, "transition", ""), v(o, "transform", ""), o.animated = !1, o.animatingX = !1, o.animatingY = !1;
        }, a);
      }
    }
  };
}
function xi(n) {
  return n.offsetWidth;
}
function wi(n, e, t, o) {
  return Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * o.animation;
}
var Ce = [], Wt = {
  initializeByDefault: !0
}, lt = {
  mount: function(e) {
    for (var t in Wt)
      Wt.hasOwnProperty(t) && !(t in e) && (e[t] = Wt[t]);
    Ce.forEach(function(o) {
      if (o.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Ce.push(e);
  },
  pluginEvent: function(e, t, o) {
    var i = this;
    this.eventCanceled = !1, o.cancel = function() {
      i.eventCanceled = !0;
    };
    var r = e + "Global";
    Ce.forEach(function(a) {
      t[a.pluginName] && (t[a.pluginName][r] && t[a.pluginName][r](Q({
        sortable: t
      }, o)), t.options[a.pluginName] && t[a.pluginName][e] && t[a.pluginName][e](Q({
        sortable: t
      }, o)));
    });
  },
  initializePlugins: function(e, t, o, i) {
    Ce.forEach(function(s) {
      var l = s.pluginName;
      if (!(!e.options[l] && !s.initializeByDefault)) {
        var d = new s(e, t, e.options);
        d.sortable = e, d.options = e.options, e[l] = d, re(o, d.defaults);
      }
    });
    for (var r in e.options)
      if (e.options.hasOwnProperty(r)) {
        var a = this.modifyOption(e, r, e.options[r]);
        typeof a < "u" && (e.options[r] = a);
      }
  },
  getEventProperties: function(e, t) {
    var o = {};
    return Ce.forEach(function(i) {
      typeof i.eventProperties == "function" && re(o, i.eventProperties.call(t[i.pluginName], e));
    }), o;
  },
  modifyOption: function(e, t, o) {
    var i;
    return Ce.forEach(function(r) {
      e[r.pluginName] && r.optionListeners && typeof r.optionListeners[t] == "function" && (i = r.optionListeners[t].call(e[r.pluginName], o));
    }), i;
  }
};
function ki(n) {
  var e = n.sortable, t = n.rootEl, o = n.name, i = n.targetEl, r = n.cloneEl, a = n.toEl, s = n.fromEl, l = n.oldIndex, d = n.newIndex, p = n.oldDraggableIndex, c = n.newDraggableIndex, f = n.originalEvent, _ = n.putSortable, k = n.extraEventProperties;
  if (e = e || t && t[j], !!e) {
    var u, x = e.options, C = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !se && !at ? u = new CustomEvent(o, {
      bubbles: !0,
      cancelable: !0
    }) : (u = document.createEvent("Event"), u.initEvent(o, !0, !0)), u.to = a || t, u.from = s || t, u.item = i || t, u.clone = r, u.oldIndex = l, u.newIndex = d, u.oldDraggableIndex = p, u.newDraggableIndex = c, u.originalEvent = f, u.pullMode = _ ? _.lastPutMode : void 0;
    var T = Q(Q({}, k), lt.getEventProperties(o, e));
    for (var N in T)
      u[N] = T[N];
    t && t.dispatchEvent(u), x[C] && x[C].call(e, u);
  }
}
var $i = ["evt"], F = function(e, t) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = o.evt, r = gi(o, $i);
  lt.pluginEvent.bind(y)(e, t, Q({
    dragEl: g,
    parentEl: A,
    ghostEl: w,
    rootEl: E,
    nextEl: we,
    lastDownEl: vt,
    cloneEl: D,
    cloneHidden: he,
    dragStarted: Xe,
    putSortable: I,
    activeSortable: y.active,
    originalEvent: i,
    oldIndex: Pe,
    oldDraggableIndex: et,
    newIndex: B,
    newDraggableIndex: de,
    hideGhostForTarget: Ao,
    unhideGhostForTarget: Co,
    cloneNowHidden: function() {
      he = !0;
    },
    cloneNowShown: function() {
      he = !1;
    },
    dispatchSortableEvent: function(s) {
      H({
        sortable: t,
        name: s,
        originalEvent: i
      });
    }
  }, r));
};
function H(n) {
  ki(Q({
    putSortable: I,
    cloneEl: D,
    targetEl: g,
    rootEl: E,
    oldIndex: Pe,
    oldDraggableIndex: et,
    newIndex: B,
    newDraggableIndex: de
  }, n));
}
var g, A, w, E, we, vt, D, he, Pe, B, et, de, ht, I, Me = !1, Et = !1, Dt = [], ye, W, Xt, Gt, Yn, Wn, Xe, Te, tt, nt = !1, pt = !1, yt, R, Vt = [], rn = !1, At = [], It = typeof document < "u", ut = vn, Xn = at || se ? "cssFloat" : "float", Si = It && !mo && !vn && "draggable" in document.createElement("div"), So = (function() {
  if (It) {
    if (se)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
})(), Eo = function(e, t) {
  var o = v(e), i = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), r = Le(e, 0, t), a = Le(e, 1, t), s = r && v(r), l = a && v(a), d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + M(r).width, p = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + M(a).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (r && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return r && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || d >= i && o[Xn] === "none" || a && o[Xn] === "none" && d + p > i) ? "vertical" : "horizontal";
}, Ei = function(e, t, o) {
  var i = o ? e.left : e.top, r = o ? e.right : e.bottom, a = o ? e.width : e.height, s = o ? t.left : t.top, l = o ? t.right : t.bottom, d = o ? t.width : t.height;
  return i === s || r === l || i + a / 2 === s + d / 2;
}, Di = function(e, t) {
  var o;
  return Dt.some(function(i) {
    var r = i[j].options.emptyInsertThreshold;
    if (!(!r || yn(i))) {
      var a = M(i), s = e >= a.left - r && e <= a.right + r, l = t >= a.top - r && t <= a.bottom + r;
      if (s && l)
        return o = i;
    }
  }), o;
}, Do = function(e) {
  function t(r, a) {
    return function(s, l, d, p) {
      var c = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
      if (r == null && (a || c))
        return !0;
      if (r == null || r === !1)
        return !1;
      if (a && r === "clone")
        return r;
      if (typeof r == "function")
        return t(r(s, l, d, p), a)(s, l, d, p);
      var f = (a ? s : l).options.group.name;
      return r === !0 || typeof r == "string" && r === f || r.join && r.indexOf(f) > -1;
    };
  }
  var o = {}, i = e.group;
  (!i || _t(i) != "object") && (i = {
    name: i
  }), o.name = i.name, o.checkPull = t(i.pull, !0), o.checkPut = t(i.put), o.revertClone = i.revertClone, e.group = o;
}, Ao = function() {
  !So && w && v(w, "display", "none");
}, Co = function() {
  !So && w && v(w, "display", "");
};
It && !mo && document.addEventListener("click", function(n) {
  if (Et)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), Et = !1, !1;
}, !0);
var xe = function(e) {
  if (g) {
    e = e.touches ? e.touches[0] : e;
    var t = Di(e.clientX, e.clientY);
    if (t) {
      var o = {};
      for (var i in e)
        e.hasOwnProperty(i) && (o[i] = e[i]);
      o.target = o.rootEl = t, o.preventDefault = void 0, o.stopPropagation = void 0, t[j]._onDragOver(o);
    }
  }
}, Ai = function(e) {
  g && g.parentNode[j]._isOutsideThisEl(e.target);
};
function y(n, e) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = e = re({}, e), n[j] = this;
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
      return Eo(n, this.options);
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
    supportPointer: y.supportPointer !== !1 && "PointerEvent" in window && (!Je || vn),
    emptyInsertThreshold: 5
  };
  lt.initializePlugins(this, n, t);
  for (var o in t)
    !(o in e) && (e[o] = t[o]);
  Do(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Si, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? S(n, "pointerdown", this._onTapStart) : (S(n, "mousedown", this._onTapStart), S(n, "touchstart", this._onTapStart)), this.nativeDraggable && (S(n, "dragover", this), S(n, "dragenter", this)), Dt.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), re(this, yi());
}
y.prototype = /** @lends Sortable.prototype */
{
  constructor: y,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (Te = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, g) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, o = this.el, i = this.options, r = i.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, d = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, p = i.filter;
      if (Ii(o), !g && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Je && l && l.tagName.toUpperCase() === "SELECT") && (l = X(l, i.draggable, o, !1), !(l && l.animated) && vt !== l)) {
        if (Pe = Y(l), et = Y(l, i.draggable), typeof p == "function") {
          if (p.call(this, e, l, this)) {
            H({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: l,
              toEl: o,
              fromEl: o
            }), F("filter", t, {
              evt: e
            }), r && e.preventDefault();
            return;
          }
        } else if (p && (p = p.split(",").some(function(c) {
          if (c = X(d, c.trim(), o, !1), c)
            return H({
              sortable: t,
              rootEl: c,
              name: "filter",
              targetEl: l,
              fromEl: o,
              toEl: o
            }), F("filter", t, {
              evt: e
            }), !0;
        }), p)) {
          r && e.preventDefault();
          return;
        }
        i.handle && !X(d, i.handle, o, !1) || this._prepareDragStart(e, s, l);
      }
    }
  },
  _prepareDragStart: function(e, t, o) {
    var i = this, r = i.el, a = i.options, s = r.ownerDocument, l;
    if (o && !g && o.parentNode === r) {
      var d = M(o);
      if (E = r, g = o, A = g.parentNode, we = g.nextSibling, vt = o, ht = a.group, y.dragged = g, ye = {
        target: g,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, Yn = ye.clientX - d.left, Wn = ye.clientY - d.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, g.style["will-change"] = "all", l = function() {
        if (F("delayEnded", i, {
          evt: e
        }), y.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !jn && i.nativeDraggable && (g.draggable = !0), i._triggerDragStart(e, t), H({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), U(g, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(p) {
        yo(g, p.trim(), Kt);
      }), S(s, "dragover", xe), S(s, "mousemove", xe), S(s, "touchmove", xe), a.supportPointer ? (S(s, "pointerup", i._onDrop), !this.nativeDraggable && S(s, "pointercancel", i._onDrop)) : (S(s, "mouseup", i._onDrop), S(s, "touchend", i._onDrop), S(s, "touchcancel", i._onDrop)), jn && this.nativeDraggable && (this.options.touchStartThreshold = 4, g.draggable = !0), F("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(at || se))) {
        if (y.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (S(s, "pointerup", i._disableDelayedDrag), S(s, "pointercancel", i._disableDelayedDrag)) : (S(s, "mouseup", i._disableDelayedDrag), S(s, "touchend", i._disableDelayedDrag), S(s, "touchcancel", i._disableDelayedDrag)), S(s, "mousemove", i._delayedDragTouchMoveHandler), S(s, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && S(s, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(l, a.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    g && Kt(g), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    $(e, "mouseup", this._disableDelayedDrag), $(e, "touchend", this._disableDelayedDrag), $(e, "touchcancel", this._disableDelayedDrag), $(e, "pointerup", this._disableDelayedDrag), $(e, "pointercancel", this._disableDelayedDrag), $(e, "mousemove", this._delayedDragTouchMoveHandler), $(e, "touchmove", this._delayedDragTouchMoveHandler), $(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? S(document, "pointermove", this._onTouchMove) : t ? S(document, "touchmove", this._onTouchMove) : S(document, "mousemove", this._onTouchMove) : (S(g, "dragend", this), S(E, "dragstart", this._onDragStart));
    try {
      document.selection ? xt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (Me = !1, E && g) {
      F("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && S(document, "dragover", Ai);
      var o = this.options;
      !e && U(g, o.dragClass, !1), U(g, o.ghostClass, !0), y.active = this, e && this._appendGhost(), H({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (W) {
      this._lastX = W.clientX, this._lastY = W.clientY, Ao();
      for (var e = document.elementFromPoint(W.clientX, W.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(W.clientX, W.clientY), e !== t); )
        t = e;
      if (g.parentNode[j]._isOutsideThisEl(e), t)
        do {
          if (t[j]) {
            var o = void 0;
            if (o = t[j]._onDragOver({
              clientX: W.clientX,
              clientY: W.clientY,
              target: e,
              rootEl: t
            }), o && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = vo(t));
      Co();
    }
  },
  _onTouchMove: function(e) {
    if (ye) {
      var t = this.options, o = t.fallbackTolerance, i = t.fallbackOffset, r = e.touches ? e.touches[0] : e, a = w && Ne(w, !0), s = w && a && a.a, l = w && a && a.d, d = ut && R && Bn(R), p = (r.clientX - ye.clientX + i.x) / (s || 1) + (d ? d[0] - Vt[0] : 0) / (s || 1), c = (r.clientY - ye.clientY + i.y) / (l || 1) + (d ? d[1] - Vt[1] : 0) / (l || 1);
      if (!y.active && !Me) {
        if (o && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < o)
          return;
        this._onDragStart(e, !0);
      }
      if (w) {
        a ? (a.e += p - (Xt || 0), a.f += c - (Gt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: p,
          f: c
        };
        var f = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        v(w, "webkitTransform", f), v(w, "mozTransform", f), v(w, "msTransform", f), v(w, "transform", f), Xt = p, Gt = c, W = r;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!w) {
      var e = this.options.fallbackOnBody ? document.body : E, t = M(g, !0, ut, !0, e), o = this.options;
      if (ut) {
        for (R = e; v(R, "position") === "static" && v(R, "transform") === "none" && R !== document; )
          R = R.parentNode;
        R !== document.body && R !== document.documentElement ? (R === document && (R = J()), t.top += R.scrollTop, t.left += R.scrollLeft) : R = J(), Vt = Bn(R);
      }
      w = g.cloneNode(!0), U(w, o.ghostClass, !1), U(w, o.fallbackClass, !0), U(w, o.dragClass, !0), v(w, "transition", ""), v(w, "transform", ""), v(w, "box-sizing", "border-box"), v(w, "margin", 0), v(w, "top", t.top), v(w, "left", t.left), v(w, "width", t.width), v(w, "height", t.height), v(w, "opacity", "0.8"), v(w, "position", ut ? "absolute" : "fixed"), v(w, "zIndex", "100000"), v(w, "pointerEvents", "none"), y.ghost = w, e.appendChild(w), v(w, "transform-origin", Yn / parseInt(w.style.width) * 100 + "% " + Wn / parseInt(w.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var o = this, i = e.dataTransfer, r = o.options;
    if (F("dragStart", this, {
      evt: e
    }), y.eventCanceled) {
      this._onDrop();
      return;
    }
    F("setupClone", this), y.eventCanceled || (D = ko(g), D.removeAttribute("id"), D.draggable = !1, D.style["will-change"] = "", this._hideClone(), U(D, this.options.chosenClass, !1), y.clone = D), o.cloneId = xt(function() {
      F("clone", o), !y.eventCanceled && (o.options.removeCloneOnHide || E.insertBefore(D, g), o._hideClone(), H({
        sortable: o,
        name: "clone"
      }));
    }), !t && U(g, r.dragClass, !0), t ? (Et = !0, o._loopId = setInterval(o._emulateDragOver, 50)) : ($(document, "mouseup", o._onDrop), $(document, "touchend", o._onDrop), $(document, "touchcancel", o._onDrop), i && (i.effectAllowed = "move", r.setData && r.setData.call(o, i, g)), S(document, "drop", o), v(g, "transform", "translateZ(0)")), Me = !0, o._dragStartId = xt(o._dragStarted.bind(o, t, e)), S(document, "selectstart", o), Xe = !0, window.getSelection().removeAllRanges(), Je && v(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, o = e.target, i, r, a, s = this.options, l = s.group, d = y.active, p = ht === l, c = s.sort, f = I || d, _, k = this, u = !1;
    if (rn) return;
    function x(Ye, Wo) {
      F(Ye, k, Q({
        evt: e,
        isOwner: p,
        axis: _ ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: r,
        canSort: c,
        fromSortable: f,
        target: o,
        completed: T,
        onMove: function(An, Xo) {
          return ft(E, t, g, i, An, M(An), e, Xo);
        },
        changed: N
      }, Wo));
    }
    function C() {
      x("dragOverAnimationCapture"), k.captureAnimationState(), k !== f && f.captureAnimationState();
    }
    function T(Ye) {
      return x("dragOverCompleted", {
        insertion: Ye
      }), Ye && (p ? d._hideClone() : d._showClone(k), k !== f && (U(g, I ? I.options.ghostClass : d.options.ghostClass, !1), U(g, s.ghostClass, !0)), I !== k && k !== y.active ? I = k : k === y.active && I && (I = null), f === k && (k._ignoreWhileAnimating = o), k.animateAll(function() {
        x("dragOverAnimationComplete"), k._ignoreWhileAnimating = null;
      }), k !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (o === g && !g.animated || o === t && !o.animated) && (Te = null), !s.dragoverBubble && !e.rootEl && o !== document && (g.parentNode[j]._isOutsideThisEl(e.target), !Ye && xe(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), u = !0;
    }
    function N() {
      B = Y(g), de = Y(g, s.draggable), H({
        sortable: k,
        name: "change",
        toEl: t,
        newIndex: B,
        newDraggableIndex: de,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = X(o, s.draggable, t, !0), x("dragOver"), y.eventCanceled) return u;
    if (g.contains(e.target) || o.animated && o.animatingX && o.animatingY || k._ignoreWhileAnimating === o)
      return T(!1);
    if (Et = !1, d && !s.disabled && (p ? c || (a = A !== E) : I === this || (this.lastPutMode = ht.checkPull(this, d, g, e)) && l.checkPut(this, d, g, e))) {
      if (_ = this._getDirection(e, o) === "vertical", i = M(g), x("dragOverValid"), y.eventCanceled) return u;
      if (a)
        return A = E, C(), this._hideClone(), x("revert"), y.eventCanceled || (we ? E.insertBefore(g, we) : E.appendChild(g)), T(!0);
      var P = yn(t, s.draggable);
      if (!P || Mi(e, _, this) && !P.animated) {
        if (P === g)
          return T(!1);
        if (P && t === e.target && (o = P), o && (r = M(o)), ft(E, t, g, i, o, r, e, !!o) !== !1)
          return C(), P && P.nextSibling ? t.insertBefore(g, P.nextSibling) : t.appendChild(g), A = t, N(), T(!0);
      } else if (P && Oi(e, _, this)) {
        var L = Le(t, 0, s, !0);
        if (L === g)
          return T(!1);
        if (o = L, r = M(o), ft(E, t, g, i, o, r, e, !1) !== !1)
          return C(), t.insertBefore(g, L), A = t, N(), T(!0);
      } else if (o.parentNode === t) {
        r = M(o);
        var K = 0, me, je = g.parentNode !== t, q = !Ei(g.animated && g.toRect || i, o.animated && o.toRect || r, _), qe = _ ? "top" : "left", ae = Un(o, "top", "top") || Un(g, "top", "top"), Ue = ae ? ae.scrollTop : void 0;
        Te !== o && (me = r[qe], nt = !1, pt = !q && s.invertSwap || je), K = Pi(e, o, r, _, q ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, pt, Te === o);
        var ee;
        if (K !== 0) {
          var _e = Y(g);
          do
            _e -= K, ee = A.children[_e];
          while (ee && (v(ee, "display") === "none" || ee === w));
        }
        if (K === 0 || ee === o)
          return T(!1);
        Te = o, tt = K;
        var Be = o.nextElementSibling, le = !1;
        le = K === 1;
        var ct = ft(E, t, g, i, o, r, e, le);
        if (ct !== !1)
          return (ct === 1 || ct === -1) && (le = ct === 1), rn = !0, setTimeout(Ti, 30), C(), le && !Be ? t.appendChild(g) : o.parentNode.insertBefore(g, le ? Be : o), ae && wo(ae, 0, Ue - ae.scrollTop), A = g.parentNode, me !== void 0 && !pt && (yt = Math.abs(me - M(o)[qe])), N(), T(!0);
      }
      if (t.contains(g))
        return T(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    $(document, "mousemove", this._onTouchMove), $(document, "touchmove", this._onTouchMove), $(document, "pointermove", this._onTouchMove), $(document, "dragover", xe), $(document, "mousemove", xe), $(document, "touchmove", xe);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    $(e, "mouseup", this._onDrop), $(e, "touchend", this._onDrop), $(e, "pointerup", this._onDrop), $(e, "pointercancel", this._onDrop), $(e, "touchcancel", this._onDrop), $(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, o = this.options;
    if (B = Y(g), de = Y(g, o.draggable), F("drop", this, {
      evt: e
    }), A = g && g.parentNode, B = Y(g), de = Y(g, o.draggable), y.eventCanceled) {
      this._nulling();
      return;
    }
    Me = !1, pt = !1, nt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), sn(this.cloneId), sn(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Je && v(document.body, "user-select", ""), v(g, "transform", ""), e && (Xe && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), w && w.parentNode && w.parentNode.removeChild(w), (E === A || I && I.lastPutMode !== "clone") && D && D.parentNode && D.parentNode.removeChild(D), g && (this.nativeDraggable && $(g, "dragend", this), Kt(g), g.style["will-change"] = "", Xe && !Me && U(g, I ? I.options.ghostClass : this.options.ghostClass, !1), U(g, this.options.chosenClass, !1), H({
      sortable: this,
      name: "unchoose",
      toEl: A,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), E !== A ? (B >= 0 && (H({
      rootEl: A,
      name: "add",
      toEl: A,
      fromEl: E,
      originalEvent: e
    }), H({
      sortable: this,
      name: "remove",
      toEl: A,
      originalEvent: e
    }), H({
      rootEl: A,
      name: "sort",
      toEl: A,
      fromEl: E,
      originalEvent: e
    }), H({
      sortable: this,
      name: "sort",
      toEl: A,
      originalEvent: e
    })), I && I.save()) : B !== Pe && B >= 0 && (H({
      sortable: this,
      name: "update",
      toEl: A,
      originalEvent: e
    }), H({
      sortable: this,
      name: "sort",
      toEl: A,
      originalEvent: e
    })), y.active && ((B == null || B === -1) && (B = Pe, de = et), H({
      sortable: this,
      name: "end",
      toEl: A,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    F("nulling", this), E = g = A = w = we = D = vt = he = ye = W = Xe = B = de = Pe = et = Te = tt = I = ht = y.dragged = y.ghost = y.clone = y.active = null, At.forEach(function(e) {
      e.checked = !0;
    }), At.length = Xt = Gt = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        g && (this._onDragOver(e), Ci(e));
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
    for (var e = [], t, o = this.el.children, i = 0, r = o.length, a = this.options; i < r; i++)
      t = o[i], X(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || Ni(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var o = {}, i = this.el;
    this.toArray().forEach(function(r, a) {
      var s = i.children[a];
      X(s, this.options.draggable, i, !1) && (o[r] = s);
    }, this), t && this.captureAnimationState(), e.forEach(function(r) {
      o[r] && (i.removeChild(o[r]), i.appendChild(o[r]));
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
    var o = this.options;
    if (t === void 0)
      return o[e];
    var i = lt.modifyOption(this, e, t);
    typeof i < "u" ? o[e] = i : o[e] = t, e === "group" && Do(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    F("destroy", this);
    var e = this.el;
    e[j] = null, $(e, "mousedown", this._onTapStart), $(e, "touchstart", this._onTapStart), $(e, "pointerdown", this._onTapStart), this.nativeDraggable && ($(e, "dragover", this), $(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Dt.splice(Dt.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!he) {
      if (F("hideClone", this), y.eventCanceled) return;
      v(D, "display", "none"), this.options.removeCloneOnHide && D.parentNode && D.parentNode.removeChild(D), he = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (he) {
      if (F("showClone", this), y.eventCanceled) return;
      g.parentNode == E && !this.options.group.revertClone ? E.insertBefore(D, g) : we ? E.insertBefore(D, we) : E.appendChild(D), this.options.group.revertClone && this.animate(g, D), v(D, "display", ""), he = !1;
    }
  }
};
function Ci(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function ft(n, e, t, o, i, r, a, s) {
  var l, d = n[j], p = d.options.onMove, c;
  return window.CustomEvent && !se && !at ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = n, l.dragged = t, l.draggedRect = o, l.related = i || e, l.relatedRect = r || M(e), l.willInsertAfter = s, l.originalEvent = a, n.dispatchEvent(l), p && (c = p.call(d, l, a)), c;
}
function Kt(n) {
  n.draggable = !1;
}
function Ti() {
  rn = !1;
}
function Oi(n, e, t) {
  var o = M(Le(t.el, 0, t.options, !0)), i = $o(t.el, t.options, w), r = 10;
  return e ? n.clientX < i.left - r || n.clientY < o.top && n.clientX < o.right : n.clientY < i.top - r || n.clientY < o.bottom && n.clientX < o.left;
}
function Mi(n, e, t) {
  var o = M(yn(t.el, t.options.draggable)), i = $o(t.el, t.options, w), r = 10;
  return e ? n.clientX > i.right + r || n.clientY > o.bottom && n.clientX > o.left : n.clientY > i.bottom + r || n.clientX > o.right && n.clientY > o.top;
}
function Pi(n, e, t, o, i, r, a, s) {
  var l = o ? n.clientY : n.clientX, d = o ? t.height : t.width, p = o ? t.top : t.left, c = o ? t.bottom : t.right, f = !1;
  if (!a) {
    if (s && yt < d * i) {
      if (!nt && (tt === 1 ? l > p + d * r / 2 : l < c - d * r / 2) && (nt = !0), nt)
        f = !0;
      else if (tt === 1 ? l < p + yt : l > c - yt)
        return -tt;
    } else if (l > p + d * (1 - i) / 2 && l < c - d * (1 - i) / 2)
      return zi(e);
  }
  return f = f || a, f && (l < p + d * r / 2 || l > c - d * r / 2) ? l > p + d / 2 ? 1 : -1 : 0;
}
function zi(n) {
  return Y(g) < Y(n) ? 1 : -1;
}
function Ni(n) {
  for (var e = n.tagName + n.className + n.src + n.href + n.textContent, t = e.length, o = 0; t--; )
    o += e.charCodeAt(t);
  return o.toString(36);
}
function Ii(n) {
  At.length = 0;
  for (var e = n.getElementsByTagName("input"), t = e.length; t--; ) {
    var o = e[t];
    o.checked && At.push(o);
  }
}
function xt(n) {
  return setTimeout(n, 0);
}
function sn(n) {
  return clearTimeout(n);
}
It && S(document, "touchmove", function(n) {
  (y.active || Me) && n.cancelable && n.preventDefault();
});
y.utils = {
  on: S,
  off: $,
  css: v,
  find: yo,
  is: function(e, t) {
    return !!X(e, t, e, !1);
  },
  extend: _i,
  throttle: xo,
  closest: X,
  toggleClass: U,
  clone: ko,
  index: Y,
  nextTick: xt,
  cancelNextTick: sn,
  detectDirection: Eo,
  getChild: Le,
  expando: j
};
y.get = function(n) {
  return n[j];
};
y.mount = function() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (y.utils = Q(Q({}, y.utils), o.utils)), lt.mount(o);
  });
};
y.create = function(n, e) {
  return new y(n, e);
};
y.version = bi;
var O = [], Ge, an, ln = !1, Zt, Jt, Ct, Ve;
function Ri() {
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
      this.sortable.nativeDraggable ? S(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? S(document, "pointermove", this._handleFallbackAutoScroll) : o.touches ? S(document, "touchmove", this._handleFallbackAutoScroll) : S(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var o = t.originalEvent;
      !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
    },
    drop: function() {
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), Gn(), wt(), vi();
    },
    nulling: function() {
      Ct = an = Ge = ln = Ve = Zt = Jt = null, O.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, o) {
      var i = this, r = (t.touches ? t.touches[0] : t).clientX, a = (t.touches ? t.touches[0] : t).clientY, s = document.elementFromPoint(r, a);
      if (Ct = t, o || this.options.forceAutoScrollFallback || at || se || Je) {
        Qt(t, this.options, s, o);
        var l = pe(s, !0);
        ln && (!Ve || r !== Zt || a !== Jt) && (Ve && Gn(), Ve = setInterval(function() {
          var d = pe(document.elementFromPoint(r, a), !0);
          d !== l && (l = d, wt()), Qt(t, i.options, d, o);
        }, 10), Zt = r, Jt = a);
      } else {
        if (!this.options.bubbleScroll || pe(s, !0) === J()) {
          wt();
          return;
        }
        Qt(t, this.options, pe(s, !1), !1);
      }
    }
  }, re(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function wt() {
  O.forEach(function(n) {
    clearInterval(n.pid);
  }), O = [];
}
function Gn() {
  clearInterval(Ve);
}
var Qt = xo(function(n, e, t, o) {
  if (e.scroll) {
    var i = (n.touches ? n.touches[0] : n).clientX, r = (n.touches ? n.touches[0] : n).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = J(), d = !1, p;
    an !== t && (an = t, wt(), Ge = e.scroll, p = e.scrollFn, Ge === !0 && (Ge = pe(t, !0)));
    var c = 0, f = Ge;
    do {
      var _ = f, k = M(_), u = k.top, x = k.bottom, C = k.left, T = k.right, N = k.width, P = k.height, L = void 0, K = void 0, me = _.scrollWidth, je = _.scrollHeight, q = v(_), qe = _.scrollLeft, ae = _.scrollTop;
      _ === l ? (L = N < me && (q.overflowX === "auto" || q.overflowX === "scroll" || q.overflowX === "visible"), K = P < je && (q.overflowY === "auto" || q.overflowY === "scroll" || q.overflowY === "visible")) : (L = N < me && (q.overflowX === "auto" || q.overflowX === "scroll"), K = P < je && (q.overflowY === "auto" || q.overflowY === "scroll"));
      var Ue = L && (Math.abs(T - i) <= a && qe + N < me) - (Math.abs(C - i) <= a && !!qe), ee = K && (Math.abs(x - r) <= a && ae + P < je) - (Math.abs(u - r) <= a && !!ae);
      if (!O[c])
        for (var _e = 0; _e <= c; _e++)
          O[_e] || (O[_e] = {});
      (O[c].vx != Ue || O[c].vy != ee || O[c].el !== _) && (O[c].el = _, O[c].vx = Ue, O[c].vy = ee, clearInterval(O[c].pid), (Ue != 0 || ee != 0) && (d = !0, O[c].pid = setInterval((function() {
        o && this.layer === 0 && y.active._onTouchMove(Ct);
        var Be = O[this.layer].vy ? O[this.layer].vy * s : 0, le = O[this.layer].vx ? O[this.layer].vx * s : 0;
        typeof p == "function" && p.call(y.dragged.parentNode[j], le, Be, n, Ct, O[this.layer].el) !== "continue" || wo(O[this.layer].el, le, Be);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && f !== l && (f = pe(f, !1)));
    ln = d;
  }
}, 30), To = function(e) {
  var t = e.originalEvent, o = e.putSortable, i = e.dragEl, r = e.activeSortable, a = e.dispatchSortableEvent, s = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var d = o || r;
    s();
    var p = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, c = document.elementFromPoint(p.clientX, p.clientY);
    l(), d && !d.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: i,
      putSortable: o
    }));
  }
};
function xn() {
}
xn.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var i = Le(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(t, i) : this.sortable.el.appendChild(t), this.sortable.animateAll(), o && o.animateAll();
  },
  drop: To
};
re(xn, {
  pluginName: "revertOnSpill"
});
function wn() {
}
wn.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable, i = o || this.sortable;
    i.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), i.animateAll();
  },
  drop: To
};
re(wn, {
  pluginName: "removeOnSpill"
});
y.mount(new Ri());
y.mount(wn, xn);
const V = "household_kanban";
function Oo(n, e) {
  return n.connection.subscribeMessage((t) => e(t.board), { type: `${V}/subscribe` });
}
function gt(n, e, t) {
  return n.callService(V, "set_status", { uid: e, status: t });
}
function Hi(n, e) {
  return n.connection.sendMessagePromise({ type: `${V}/history`, ...e });
}
function Li(n, e) {
  return n.callService(V, "create_item", { ...e });
}
function bt(n, e, t) {
  return n.callService(V, "update_item", { uid: e, ...t });
}
function Fi(n, e) {
  return n.callService(V, "delete_item", { uid: e });
}
function ji(n, e) {
  return n.connection.sendMessagePromise({ type: "lovelace/config", url_path: e });
}
function qi(n, e, t) {
  return n.connection.sendMessagePromise({ type: "lovelace/config/save", url_path: e, config: t });
}
function Ui(n) {
  return n.connection.sendMessagePromise({ type: `${V}/settings` });
}
function Bi(n, e) {
  return n.connection.sendMessagePromise({ type: `${V}/settings/update`, ...e });
}
function Yi(n, e) {
  return n.connection.sendMessagePromise({ type: `${V}/parents/add`, ...e });
}
function Wi(n, e, t) {
  return n.connection.sendMessagePromise({ type: `${V}/parents/update`, parent_id: e, ...t });
}
function Xi(n, e, t) {
  return n.connection.sendMessagePromise({ type: `${V}/parents/remove`, parent_id: e, target: t });
}
const Gi = 864e5;
function z(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
const ue = (n) => String(n).padStart(2, "0");
function ie(n) {
  return `${n.getFullYear()}-${ue(n.getMonth() + 1)}-${ue(n.getDate())}`;
}
function Vi(n, e) {
  if (!n) return null;
  if (!e) return n;
  const [t, o, i] = n.split("-").map(Number), [r, a] = e.split(":").map(Number), s = -new Date(t, o - 1, i, r, a).getTimezoneOffset(), l = Math.abs(s);
  return `${n}T${ue(r)}:${ue(a)}:00${s < 0 ? "-" : "+"}${ue(Math.floor(l / 60))}:${ue(l % 60)}`;
}
function Ki(n) {
  if (!n) return "";
  const { date: e, hasTime: t } = G(n);
  return t ? `${ue(e.getHours())}:${ue(e.getMinutes())}` : "";
}
function Z(n, e) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + e);
}
function kn(n, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / Gi);
}
function G(n) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(n)) {
    const [e, t, o] = n.split("-").map(Number);
    return { date: new Date(e, t - 1, o), hasTime: !1 };
  }
  return { date: new Date(n), hasTime: !0 };
}
function Zi(n, e) {
  const t = z(n), o = (t.getDay() - e + 7) % 7, i = Z(t, -o);
  return o === 6 ? { start: Z(i, 7), end: Z(i, 13) } : { start: i, end: Z(i, 6) };
}
const Ji = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function Vn(n) {
  var o, i;
  const e = n == null ? void 0 : n.first_weekday, t = Ji.indexOf(e ?? "");
  if (t >= 0) return t;
  try {
    const r = new Intl.Locale((n == null ? void 0 : n.language) ?? "en"), a = (i = ((o = r.getWeekInfo) == null ? void 0 : o.call(r)) ?? r.weekInfo) == null ? void 0 : i.firstDay;
    if (a) return a % 7;
  } catch {
  }
  return 1;
}
function Se(n, e) {
  const t = z(e.now);
  if (n.status === "completed")
    return !n.completed_at || !e.enabled.has("done") ? null : kn(new Date(n.completed_at), t) < e.doneDays ? "done" : null;
  if (!n.due) return "todo";
  const o = z(G(n.due).date), i = (...r) => r.find((a) => e.enabled.has(a)) ?? "todo";
  return o < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : i("today", "week") : +o == +t ? i("today", "week") : o <= e.week.end ? i("week") : i("later");
}
const Qi = 8;
function Kn(n, e, t) {
  return Math.hypot(n, e) >= Qi;
}
function er(n, e, t) {
  const o = n.status === "completed" ? { status: "needs_action" } : {};
  if (typeof e == "number")
    return n.status === "needs_action" && n.priority === e ? null : { ...o, ...n.priority === e ? {} : { priority: e } };
  if (e === "overdue" || Se(n, t) === e) return null;
  if (e === "done") return { status: "completed" };
  if (e === "todo") return { ...o, due: null };
  if (e === "week") return { ...o, due: ie(t.week.end) };
  if (e === "later") return { ...o, due: ie(Z(t.week.end, 1)) };
  const i = z(t.now);
  return n.due && +z(G(n.due).date) == +i ? Object.keys(o).length ? o : null : { ...o, due: ie(i) };
}
function Mo(n) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(n, 10));
}
function tr(n) {
  const e = `custom:${n}`, t = (o) => {
    var i;
    for (const r of o.querySelectorAll("*")) {
      if (r.localName === "hui-error-card") {
        const a = r, s = a.config ?? a._config;
        ((s == null ? void 0 : s.type) === e || ((i = s == null ? void 0 : s.origConfig) == null ? void 0 : i.type) === e) && r.dispatchEvent(new Event("ll-rebuild", { bubbles: !0, composed: !0 }));
      }
      r.shadowRoot && t(r.shadowRoot);
    }
  };
  t(document);
}
const dn = [];
function nr() {
  try {
    const n = Object.getOwnPropertyDescriptor(window, "customElements");
    if (n && !n.configurable) return;
    let e = window.customElements;
    Object.defineProperty(window, "customElements", {
      configurable: !0,
      enumerable: (n == null ? void 0 : n.enumerable) ?? !0,
      get: () => e,
      set: (t) => {
        e = t;
        for (const o of dn) o(t);
      }
    });
  } catch {
  }
}
function Po(n, e) {
  let t = !1, o = !1;
  const i = (s = window.customElements) => {
    try {
      if (s.get(n)) return;
      s.define(n, e), t && tr(n);
    } catch (l) {
      o || (o = !0, console.warn("household_kanban: could not register the card", l));
    }
  };
  i(), t = !0, dn.length || nr(), dn.push(i), document.addEventListener("DOMContentLoaded", () => i()), window.addEventListener("load", () => i());
  const r = Date.now(), a = () => {
    if (typeof window > "u") return;
    i();
    const s = Date.now() - r;
    s < 2e4 && window.setTimeout(a, s < 3e3 ? 40 : 250);
  };
  window.setTimeout(a, 40);
}
const Zn = ["todo", "later", "week", "today", "overdue", "done"], or = ["todo", "week", "today", "done"], $n = [1, 3, 7, 30], Sn = ["cs", "en"], zo = { cs: "Čeština", en: "English" };
function Ie(n) {
  const e = n.columns ?? or, t = e.filter((r) => !Zn.includes(r));
  if (t.length) throw new Error(`Unknown column id: ${t.join(", ")}`);
  const o = new Set(e).add("todo"), i = {
    type: n.type,
    columns: Zn.filter((r) => o.has(r)),
    done_days: $n.find((r) => r === n.done_days) ?? 7,
    group: n.group === "priority" ? "priority" : "date"
  };
  return n.parents && (i.parents = n.parents), n.people && (i.people = n.people), Sn.includes(n.language) && (i.language = n.language), i;
}
function cn(n, e, t, o) {
  const i = new Set(n ?? e);
  return o ? i.add(t) : i.delete(t), i.size === 0 || i.size === e.length ? void 0 : e.filter((r) => i.has(r));
}
function No(n, e) {
  const t = { ...n, ...e };
  for (const o of ["parents", "people", "language"]) o in e || delete t[o];
  return t;
}
function Io(n, e) {
  var t;
  return (e == null ? void 0 : e.language) ?? ((t = n.locale) == null ? void 0 : t.language) ?? n.language ?? "en";
}
function ir(n) {
  const e = n.split("/").find(Boolean);
  return !e || e === "lovelace" ? null : e;
}
function Ro(n, e) {
  if (n === e) return !0;
  if (!n || !e || typeof n != "object" || typeof e != "object" || Array.isArray(n) !== Array.isArray(e)) return !1;
  const t = n, o = e, i = Object.keys(t);
  return i.length === Object.keys(o).length && i.every((r) => Object.hasOwn(o, r) && Ro(t[r], o[r]));
}
function rr(n, e, t) {
  let o = 0;
  const i = (a) => Ro(a, e) ? (o++, t) : Array.isArray(a) ? a.map(i) : a && typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, l]) => [s, i(l)])) : a, r = i(n);
  return { config: o === 1 ? r : n, matches: o };
}
const Ho = {
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
  cl_list: "List",
  cl_add_ph: "Add item…",
  cl_remove: "Remove item",
  cl_default_title: "Shopping",
  cl_hide_ticked: "Hide ticked",
  cl_show_less: "Show less",
  cl_all_done: "All ticked",
  cl_mark_done: "Mark done",
  list_checklist: "Shopping list",
  list_checklist_hint: "Each note holds a tick list. Assist adds items to the open note.",
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
  fmt_bold: "Bold",
  fmt_italic: "Italic",
  fmt_bullets: "Bullet list",
  fmt_link: "Link",
  note_edit: "Edit",
  note_preview: "Preview",
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
  err_unsaved: "These changes were not saved last time. Check them and save again.",
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
  err_reopen: "Could not reopen the task.",
  lists: "Lists",
  move_to: "Move to…",
  older_history: "Older in history ({n})",
  ed_columns: "Columns",
  ed_done_days: "Keep done on the board (days)",
  settings: "Settings",
  tab_board: "Board",
  tab_eod: "End of day",
  tab_lists: "Lists & people",
  scope_dashboard: "This dashboard only",
  scope_dashboard_hint: "Saved in the card settings. The kitchen tablet can show other columns than your phone.",
  scope_lists_hint: "Which lists and people show here.",
  scope_household: "Whole household",
  scope_household_hint: "Same settings as Settings → Household Kanban. Applies to every dashboard.",
  eod_title: "Unfinished tasks at the end of the day",
  eod_keep: "Keep in Today",
  eod_keep_hint: "They stay in the Today column with a red label",
  eod_overdue: "Overdue column",
  eod_overdue_hint: "Past-due tasks move to their own column before Today",
  eod_move: "Move to the next day",
  eod_move_hint: "Due date +1 day, priority unchanged",
  eod_raise: "Move and raise priority",
  eod_raise_hint: "Due date +1 day, Low → Medium → High",
  close_at: "The day closes at",
  close_hint: "Unfinished tasks are handled at this time.",
  notify_title: "Notifications",
  notify_on: "Announce what happened to unfinished tasks",
  notify_on_hint: "Summary of the closed day at the set time",
  notify_at: "Send at",
  notify_at_hint: "In the morning after the day closes, not at midnight",
  notify_whom: "To whom",
  notify_assignee: "Assigned person",
  notify_assignee_hint: "To the phone the person has in HA · unassigned tasks go to the phones below",
  event_hint: "The event {event} is also fired for your own automations.",
  remove_list: "Remove list",
  move_items_to: "Move its tasks to",
  list_name: "Name",
  list_icon: "Icon",
  list_color: "Colour",
  color_red: "Red",
  color_orange: "Orange",
  color_yellow: "Yellow",
  color_green: "Green",
  color_teal: "Teal",
  color_cyan: "Cyan",
  color_blue: "Blue",
  color_indigo: "Indigo",
  color_purple: "Purple",
  color_pink: "Pink",
  color_brown: "Brown",
  color_grey: "Grey",
  form_unsaved: "Save or cancel the list first",
  retry: "Retry",
  err_load_settings: "Could not load the settings.",
  err_parent: "Could not save the list.",
  columns: "Columns",
  col_hint_todo: "Always · everything that fits no other column",
  col_hint_later: "Due after the end of the week",
  col_hint_week: "Due by the end of the week",
  col_hint_today: "Due today or overdue",
  col_hint_done: "Recently completed",
  done_keep: "Keep done on the board",
  done_keep_hint: "Older done tasks leave the board but stay in History (search, filter by list).",
  view: "View",
  language: "Language",
  lang_ha: "Like Home Assistant",
  sort_order: "Sort in a column",
  sort_due: "Due date and time",
  sort_created: "Created",
  sort_hint: "Nearest due date and time first, then higher priority, then older first.",
  lists_here: "Lists on this dashboard",
  lists_hint: "The switch hides a list here only. Adding, renaming and colour apply to the whole household.",
  show_list: "Show {name}",
  edit_list: "Edit list",
  add_list: "Add list",
  people_filter: "People in the filter",
  err_card_ambiguous: "This card is twice on the dashboard with the same settings. Change it in the dashboard editor.",
  err_card_missing: "The card was not found in the dashboard. Reload the page and try again.",
  err_not_editable: "This dashboard can't be edited from here (YAML or auto-generated). Change the card in its YAML.",
  err_settings: "Could not save the settings."
}, sr = {
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
  cl_list: "Seznam",
  cl_add_ph: "Přidat položku…",
  cl_remove: "Odebrat položku",
  cl_default_title: "Nákup",
  cl_hide_ticked: "Skrýt odškrtnuté",
  cl_show_less: "Méně",
  cl_all_done: "Vše odškrtnuto",
  cl_mark_done: "Hotovo",
  list_checklist: "Nákupní seznam",
  list_checklist_hint: "Každý lístek drží seznam k odškrtávání. Assist přidává do otevřeného lístku.",
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
  fmt_bold: "Tučně",
  fmt_italic: "Kurzíva",
  fmt_bullets: "Odrážky",
  fmt_link: "Odkaz",
  note_edit: "Upravit",
  note_preview: "Náhled",
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
  err_unsaved: "Tyto změny se minule neuložily. Zkontroluj je a ulož znovu.",
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
  err_reopen: "Úkol se nepodařilo znovu otevřít.",
  lists: "Seznamy",
  move_to: "Přesunout do…",
  older_history: "Starší v historii ({n})",
  ed_columns: "Sloupce",
  ed_done_days: "Hotové nechat na boardu (dny)",
  settings: "Nastavení",
  tab_board: "Board",
  tab_eod: "Konec dne",
  tab_lists: "Seznamy a lidé",
  scope_dashboard: "Jen tento dashboard",
  scope_dashboard_hint: "Uloží se do nastavení karty. Tablet v kuchyni může mít jiné sloupce než mobil.",
  scope_lists_hint: "Které seznamy a lidé se tu zobrazí.",
  scope_household: "Celá domácnost",
  scope_household_hint: "Stejné nastavení jako v Nastavení → Household Kanban. Platí pro všechny dashboardy.",
  eod_title: "Nesplněné úkoly na konci dne",
  eod_keep: "Nechat v Dnes",
  eod_keep_hint: "Zůstanou ve sloupci Dnes s červeným štítkem",
  eod_overdue: "Sloupec Po termínu",
  eod_overdue_hint: "Prošlé se přesunou do vlastního sloupce před Dnes",
  eod_move: "Přesunout na další den",
  eod_move_hint: "Termín +1 den, priorita beze změny",
  eod_raise: "Přesunout a zvýšit prioritu",
  eod_raise_hint: "Termín +1 den, Nízká → Střední → Vysoká",
  close_at: "Den se uzavře v",
  close_hint: "V tento čas se zpracují nesplněné úkoly.",
  notify_title: "Notifikace",
  notify_on: "Oznámit, co se stalo s nesplněnými",
  notify_on_hint: "Souhrn uzavřeného dne v nastavený čas",
  notify_at: "Poslat v",
  notify_at_hint: "Ráno po uzavření dne, ne o půlnoci",
  notify_whom: "Komu",
  notify_assignee: "Přiřazené osobě",
  notify_assignee_hint: "Na telefon, který má osoba v HA · nepřiřazené dostanou telefony níže",
  event_hint: "Zároveň se vyšle událost {event} pro vlastní automatizace.",
  remove_list: "Odebrat seznam",
  move_items_to: "Jeho úkoly přesunout do",
  list_name: "Název",
  list_icon: "Ikona",
  list_color: "Barva",
  color_red: "Červená",
  color_orange: "Oranžová",
  color_yellow: "Žlutá",
  color_green: "Zelená",
  color_teal: "Modrozelená",
  color_cyan: "Azurová",
  color_blue: "Modrá",
  color_indigo: "Indigová",
  color_purple: "Fialová",
  color_pink: "Růžová",
  color_brown: "Hnědá",
  color_grey: "Šedá",
  form_unsaved: "Nejdřív ulož nebo zruš úpravu seznamu",
  retry: "Zkusit znovu",
  err_load_settings: "Nastavení se nepodařilo načíst.",
  err_parent: "Seznam se nepodařilo uložit.",
  columns: "Sloupce",
  col_hint_todo: "Vždy · vše, co nepatří do jiného sloupce",
  col_hint_later: "Termín po konci týdne",
  col_hint_week: "Termín do konce týdne",
  col_hint_today: "Termín dnes nebo po termínu",
  col_hint_done: "Nedávno dokončené",
  done_keep: "Hotové nechat na boardu",
  done_keep_hint: "Starší hotové zmizí z boardu, ale zůstanou v Historii (hledání, filtr podle rodiče).",
  view: "Zobrazení",
  language: "Jazyk",
  lang_ha: "Podle Home Assistantu",
  sort_order: "Řazení ve sloupci",
  sort_due: "Termín a čas",
  sort_created: "Datum založení",
  sort_hint: "Nahoře úkoly s nejbližším termínem a časem, při shodě vyšší priorita, nakonec starší dřív.",
  lists_here: "Seznamy na tomto dashboardu",
  lists_hint: "Vypínač skryje seznam jen tady. Přidání, přejmenování a barva platí pro celou domácnost.",
  show_list: "Zobrazit {name}",
  edit_list: "Upravit seznam",
  add_list: "Přidat seznam",
  people_filter: "Lidé ve filtru",
  err_card_ambiguous: "Tahle karta je na dashboardu dvakrát se stejným nastavením. Změň ji v editoru dashboardu.",
  err_card_missing: "Karta se v dashboardu nenašla. Obnov stránku a zkus to znovu.",
  err_not_editable: "Tenhle dashboard odsud upravit nejde (YAML nebo automatický). Změň kartu v jejím YAML.",
  err_settings: "Nastavení se nepodařilo uložit."
}, ar = { en: Ho, cs: sr };
function m(n, e, t = {}) {
  return (ar[(n ?? "en").split("-")[0]] ?? Ho)[e].replace(/\{(\w+)\}/g, (i, r) => String(t[r] ?? ""));
}
const Jn = {
  en: {
    sum_open: { other: "{n} open" },
    sum_today: { other: "{n} for today" },
    sum_moved: { other: "{n} moved from yesterday" },
    sum_overdue: { other: "{n} overdue" },
    days: { one: "{n} day", other: "{n} days" },
    cl_more: { other: "{n} more" },
    cl_ticked: { other: "{n} ticked" }
  },
  cs: {
    sum_open: { one: "{n} otevřený", few: "{n} otevřené", other: "{n} otevřených" },
    sum_today: { other: "{n} na dnes" },
    sum_moved: { one: "{n} přesunutý ze včerejška", few: "{n} přesunuté ze včerejška", other: "{n} přesunutých ze včerejška" },
    sum_overdue: { other: "{n} po termínu" },
    days: { one: "{n} den", few: "{n} dny", other: "{n} dní" },
    cl_more: { one: "{n} další", few: "{n} další", other: "{n} dalších" },
    cl_ticked: { one: "{n} odškrtnutá", few: "{n} odškrtnuté", other: "{n} odškrtnutých" }
  }
};
function te(n, e, t) {
  const o = (n ?? "en").split("-")[0], i = o in Jn ? o : "en", r = Jn[i][e];
  return (r[new Intl.PluralRules(i).select(t)] ?? r.other).replace("{n}", String(t));
}
const lr = ["todo", "later", "week", "today", "done"], Pt = class Pt extends ze {
  constructor() {
    super(...arguments), this._parents = [], this._raw = {}, this._attempts = 0, this._subbing = !1;
  }
  setConfig(e) {
    this._raw = { ...e };
    try {
      this._config = Ie(e);
    } catch {
      this._config = Ie({ type: e.type });
    }
  }
  connectedCallback() {
    super.connectedCallback(), this._sub();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), window.clearTimeout(this._retry), this._retry = void 0, (e = this._unsub) == null || e.call(this), this._unsub = void 0;
  }
  /** Subscribe once; on failure retry on the card's backoff timer, not on every update. */
  _sub() {
    this._unsub || this._subbing || this._retry !== void 0 || !this.hass || !this.isConnected || (this._subbing = !0, Oo(this.hass, (e) => {
      this._parents = e.parents;
    }).then((e) => {
      this._attempts = 0, this.isConnected ? this._unsub = e : e();
    }).catch((e) => {
      console.warn("household_kanban: editor subscribe failed", e), this.isConnected && (this._retry = window.setTimeout(() => {
        this._retry = void 0, this._sub();
      }, Mo(this._attempts++)));
    }).finally(() => {
      this._subbing = !1;
    }));
  }
  updated() {
    this._sub();
  }
  _set(e) {
    if (!this._config) return;
    const t = { ...this._config, ...e };
    for (const i of ["parents", "people"]) t[i] === void 0 && delete t[i];
    this._config = Ie(t);
    const o = No(this._raw, this._config);
    this._raw = o, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: o }, bubbles: !0, composed: !0 }));
  }
  _checks(e, t) {
    var r;
    const o = t.map((a) => a.id), i = (r = this._config) == null ? void 0 : r[e];
    return t.map((a) => h`<label class="row">
      <input type="checkbox" .checked=${!i || i.includes(a.id)}
        @change=${(s) => {
      var l;
      return this._set({ [e]: cn((l = this._config) == null ? void 0 : l[e], o, a.id, s.target.checked) });
    }} />
      <span>${a.name}</span>
    </label>`);
  }
  render() {
    var a;
    const e = this._config, t = this.hass;
    if (!e || !t) return b;
    const o = Io(t, e), i = (s) => m(o, s), r = Object.entries(t.states).filter(([s]) => s.startsWith("person.")).map(([s, l]) => ({ id: s, name: String(l.attributes.friendly_name ?? s) }));
    return h`
      <h3>${i("ed_columns")}</h3>
      ${lr.map((s) => {
      var l;
      return h`<label class="row">
        <input type="checkbox" role="switch" .checked=${((l = e.columns) == null ? void 0 : l.includes(s)) ?? !1} ?disabled=${s === "todo"}
          @change=${(d) => {
        const p = d.target.checked;
        this._set({ columns: (e.columns ?? []).filter((c) => c !== s).concat(p ? [s] : []) });
      }} />
        <span>${i(`col_${s}`)}</span>
      </label>`;
    })}
      ${(a = e.columns) != null && a.includes("done") ? h`
        <div class="row"><span class="grow">${i("ed_done_days")}</span>
          <div class="seg" role="radiogroup" aria-label=${i("ed_done_days")}>
            ${$n.map((s) => h`<button type="button" role="radio" aria-checked=${e.done_days === s}
              @click=${() => this._set({ done_days: s })}>${s}</button>`)}
          </div>
        </div>` : b}
      <h3>${i("group_label")}</h3>
      <select aria-label=${i("group_label")} @change=${(s) => this._set({ group: s.target.value })}>
        <option value="date" ?selected=${e.group === "date"}>${i("group_date")}</option>
        <option value="priority" ?selected=${e.group === "priority"}>${i("group_priority")}</option>
      </select>
      <h3>${i("language")}</h3>
      <select aria-label=${i("language")} @change=${(s) => this._set({ language: s.target.value || void 0 })}>
        <option value="" ?selected=${!e.language}>${i("lang_ha")}</option>
        ${Sn.map((s) => h`<option value=${s} ?selected=${e.language === s}>${zo[s]}</option>`)}
      </select>
      <h3>${i("filter_parents")}</h3>
      ${this._checks("parents", this._parents)}
      <h3>${i("filter_people")}</h3>
      ${this._checks("people", r)}`;
  }
};
Pt.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _parents: { state: !0 }
}, Pt.styles = ho`
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
let hn = Pt;
Po("household-kanban-card-editor", hn);
const dr = ho`
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
`, cr = /^- \[( |x|X)\] ([^\n]+)$/;
function Tt(n) {
  const e = n.replace(/\r\n?/g, `
`).trimEnd().split(`
`), t = [];
  for (let o; e.length && (o = cr.exec(e[e.length - 1])); e.pop()) t.unshift({ done: o[1] !== " ", text: o[2] });
  return { note: e.join(`
`).trimEnd(), lines: t };
}
const De = (n) => [...n.filter((e) => !e.done), ...n.filter((e) => e.done)];
function Rt(n, e) {
  const t = De(e).map((i) => `- [${i.done ? "x" : " "}] ${i.text}`).join(`
`), o = n.trimEnd();
  return o && t ? `${o}

${t}` : o || t;
}
const Lo = (n, e) => De(De(n).map((t, o) => o === e ? { ...t, done: !t.done } : t)), hr = (n, e) => De(n).filter((t, o) => o !== e);
function pr(n, e) {
  const t = e.replace(/[\r\n]+/g, " ").trim();
  return t ? De([...n, { done: !1, text: t }]) : n;
}
const En = (n) => ({ done: n.filter((e) => e.done).length, total: n.length });
function Fo(n, e = {}) {
  const t = e.clamp ? `--clamp:${e.clamp}` : b, o = e.clamp ? "note clamp" : "note";
  return customElements.get("ha-markdown") ? h`<div class=${o} style=${t}><ha-markdown .content=${n} breaks></ha-markdown></div>` : h`<div class="${o} plain" style=${t}>${n}</div>`;
}
function ur(n, e, t, o) {
  const i = (f, _) => ({
    value: n.slice(0, e) + f + n.slice(e, t) + _ + n.slice(t),
    start: e + f.length,
    end: t + f.length
  });
  if (o === "bold") return i("**", "**");
  if (o === "italic") return i("*", "*");
  if (o === "link")
    return { ...i("[", "](https://)"), start: t + 3, end: t + 3 + 8 };
  const r = e ? n.lastIndexOf(`
`, e - 1) + 1 : 0, a = n.indexOf(`
`, t), s = a < 0 ? n.length : a, l = n.slice(r, s).split(`
`), d = (f) => l.length > 1 && !f.trim(), p = l.every((f) => d(f) || f.startsWith("- ")), c = l.map((f) => d(f) ? f : p ? f.slice(2) : f.startsWith("- ") ? f : `- ${f}`).join(`
`);
  return { value: n.slice(0, r) + c + n.slice(s), start: r, end: r + c.length };
}
const fr = ".check, .cl button", pn = (n) => !!n.target.closest(fr) || n.composedPath().some((e) => e.tagName === "A"), gr = 5, un = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], ge = (n) => `c-${un.includes(n) ? n : "grey"}`;
function dt(n, e) {
  var t;
  return String(((t = n.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function br(n) {
  return n.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function Ae(n, e = !1) {
  return h`<span class="dot ${e ? "sm" : ""} ${ge((n == null ? void 0 : n.color) ?? "grey")}"><ha-icon .icon=${(n == null ? void 0 : n.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function be(n, e, t = "", o = !1) {
  var s;
  if (!e) return h`<span class="ava none ${t}" title="-">+</span>`;
  const i = dt(n, e), r = (s = n.states[e]) == null ? void 0 : s.attributes.entity_picture;
  if (typeof r == "string" && r) return h`<img class="ava ${t}" src=${r} alt=${o ? "" : i} title=${i} />`;
  const a = [...i].reduce((l, d) => (l * 31 + d.charCodeAt(0)) % 360, 7);
  return h`<span class="ava ${t}" title=${i} style="background:linear-gradient(135deg,hsl(${a} 55% 62%),hsl(${(a + 25) % 360} 55% 42%))">${br(i)}</span>`;
}
const jo = h`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function mr(n, e) {
  const t = n.status === "completed";
  return h`<button class="check" type="button" aria-pressed=${t} aria-label=${n.summary}
    @click=${() => e.onToggle(n)}>${jo}</button>`;
}
function _r(n, e) {
  const { date: t, hasTime: o } = G(n.due), i = kn(z(e.now), t);
  let r;
  return i === -1 ? r = m(e.lang, "yesterday") : i < -1 ? r = m(e.lang, "days_ago", { n: -i }) : i === 0 ? r = m(e.lang, "today") : i === 1 ? r = m(e.lang, "tomorrow") : r = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), o ? `${r} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : r;
}
function vr(n, e) {
  const t = kn(new Date(n.completed_at), z(e.now));
  return t <= 0 ? m(e.lang, "done_today") : t === 1 ? m(e.lang, "done_yesterday") : m(e.lang, "done_days_ago", { n: t });
}
function qo(n, e, t) {
  const o = n.status === "completed", i = e.parents.find((_) => _.id === n.parent), r = z(e.now), a = !o && n.due && z(G(n.due).date) < r, s = !o && n.due && +z(G(n.due).date) == +r, l = h`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`, { note: d, lines: p } = Tt(n.description), c = De(p), f = En(c);
  return h`<article class="card ${o ? "done" : ""}" data-uid=${n.uid} @click=${(_) => {
    pn(_) || e.onOpen(n, _);
  }}>
    <div class="row">
      ${Ae(i, !0)}
      <span class="parent-name">${(i == null ? void 0 : i.name) ?? n.parent}</span>
      ${be(e.hass, n.assignee)}
    </div>
    <div class="row top">
      ${f.total && !o ? b : mr(n, e)}
      <button class="title" type="button">${n.summary}</button>
      ${f.total ? h`<span class="pill c-green cl-progress">${f.done}/${f.total}</span>` : b}
    </div>
    ${d ? Fo(d, { clamp: 3 }) : b}
    ${f.total ? yr(n, d, c, e) : b}
    <div class="pills">
      ${!o && t ? h`<span class="pill prio-${n.priority} ${ge(["", "red", "orange", "grey"][n.priority])}">${l}${m(e.lang, `prio_${n.priority}`)}</span>` : b}
      ${!o && n.moved > 0 ? h`<span class="pill c-orange">${m(e.lang, n.raised ? "moved_raised" : "moved", { n: n.moved })}</span>` : b}
      ${o && n.completed_at ? h`<span class="pill c-green">${vr(n, e)}</span>` : b}
      ${!o && n.due ? h`<span class="pill ${a ? "c-red" : s ? "today" : "later"}">${_r(n, e)}</span>` : b}
    </div>
  </article>`;
}
function yr(n, e, t, o) {
  const i = (c) => m(o.lang, c), r = En(t), a = r.total - r.done, s = o.expanded.has(n.uid), l = s ? t : t.slice(0, Math.min(a, gr)), d = a - l.filter((c) => !c.done).length, p = s ? i(r.done ? "cl_hide_ticked" : "cl_show_less") : `+ ${[d ? te(o.lang, "cl_more", d) : "", r.done ? te(o.lang, "cl_ticked", r.done) : ""].filter(Boolean).join(" · ")}`;
  return h`<div class="cl-bar"><span style="width:${Math.round(r.done / r.total * 100)}%"></span></div>
    <div class="cl">
      ${l.map((c, f) => h`<button class="cl-row" type="button" role="checkbox" aria-checked=${c.done}
        @click=${() => o.onLines(n, Rt(e, Lo(t, f)))}><span class="cl-box">${jo}</span><span class="cl-t">${c.text}</span></button>`)}
      ${s || d || r.done ? h`<button class="link muted cl-more" type="button" @click=${() => o.onExpand(n.uid, !s)}>${p}</button>` : b}
      ${!a && n.status !== "completed" ? h`<div class="cl-alldone"><span>${i("cl_all_done")}</span>
        <button class="pill-btn" type="button" @click=${() => o.onToggle(n)}>${i("cl_mark_done")}</button></div>` : b}
    </div>`;
}
function Uo(n) {
  const { note: e, lines: t } = Tt(n.description);
  return {
    uid: n.uid,
    status: n.status,
    heading: n.summary,
    parent: n.parent,
    summary: n.summary,
    description: e,
    lines: De(t),
    base: Rt(e, t),
    preview: e !== "",
    priority: n.priority,
    assignee: n.assignee,
    date: n.due ? ie(G(n.due).date) : "",
    time: Ki(n.due),
    confirmDelete: !1
  };
}
function xr(n, e, t = {}) {
  return {
    status: "needs_action",
    heading: "",
    parent: n.id,
    summary: n.checklist ? m(e, "cl_default_title") : "",
    description: "",
    lines: [],
    base: "",
    preview: !1,
    priority: 2,
    assignee: null,
    date: "",
    time: "",
    confirmDelete: !1,
    ...t
  };
}
function Bo(n) {
  return {
    summary: n.summary.trim(),
    description: Rt(n.description, n.lines),
    due: Vi(n.date, n.date ? n.time : ""),
    priority: n.priority,
    assignee: n.assignee,
    parent: n.parent
  };
}
function Qn(n, e) {
  const t = Bo(e), o = Uo(n), i = {};
  return t.summary !== n.summary && (i.summary = t.summary), t.description !== e.base && (i.description = wr(e, n.description)), (e.date !== o.date || e.time !== o.time) && (i.due = t.due), t.priority !== n.priority && (i.priority = t.priority), t.assignee !== n.assignee && (i.assignee = t.assignee), t.parent !== n.parent && (i.parent = t.parent), i;
}
function wr(n, e) {
  const t = new Set([...Tt(n.base).lines, ...n.lines].map((o) => o.text));
  return Rt(n.description, [...n.lines, ...Tt(e).lines.filter((o) => !t.has(o.text))]);
}
function kt(n, e) {
  const t = z(e);
  return n === "none" ? "" : ie(n === "today" ? t : n === "tomorrow" ? Z(t, 1) : Z(t, (6 - t.getDay() + 7) % 7));
}
const kr = h`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
function $r(n, e) {
  var a;
  const t = (s) => m(e.lang, s), o = !n.uid, i = ["today", "tomorrow", "weekend", "none"], r = (s) => {
    s.target === s.currentTarget && e.onClose();
  };
  return h`<dialog class="kb-dialog" aria-label=${o ? t("new_task") : n.heading} @close=${e.onClose} @click=${r}>
    <div class="dlg">
      <div class="dlg-head">
        ${Ae(e.parents.find((s) => s.id === n.parent))}
        <span class="dlg-kicker">${t(o ? "new_note" : "f_title")}</span>
        ${o ? b : h`<button class="pill-btn ${n.status === "completed" ? "on" : ""}" type="button" @click=${e.onToggleDone}>
          ${t(n.status === "completed" ? "mark_open" : "mark_done")}</button>`}
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>

      ${e.error ? h`<div class="notice" role="alert">${t(e.error)}</div>` : b}
      <label class="vis-hidden" for="kb-title">${t("f_title")}</label>
      <input id="kb-title" class="dlg-title" type="text" autocomplete="off" .value=${n.summary} placeholder=${t("f_title_ph")}
        @input=${(s) => e.onChange({ summary: s.target.value })} />

      ${n.lines.length || (a = e.parents.find((s) => s.id === n.parent)) != null && a.checklist ? Cr(n, e) : b}

      <div class="field">
        <div class="row"><span class="dlg-label grow">${t("f_note")}</span>
          ${n.preview ? b : Er.map(([s, l]) => h`<button class="fmt-btn" type="button" data-fmt=${s}
            aria-label=${t(`fmt_${s}`)} title=${t(`fmt_${s}`)} @click=${(d) => eo(d, s)}>${l}</button>`)}
          <span class="seg2" role="group">
            <button class="pill-btn ${n.preview ? "" : "on"}" type="button" aria-pressed=${!n.preview} @click=${() => e.onChange({ preview: !1 })}>${t("note_edit")}</button>
            <button class="pill-btn ${n.preview ? "on" : ""}" type="button" aria-pressed=${n.preview} @click=${() => e.onChange({ preview: !0 })}>${t("note_preview")}</button>
          </span></div>
        ${n.preview ? Fo(n.description) : h`<textarea rows="3" aria-label=${t("f_note")} .value=${n.description} placeholder=${t("f_note_ph")}
          @input=${(s) => e.onChange({ description: s.target.value })}
          @keydown=${(s) => {
    const l = s.key.toLowerCase();
    (s.ctrlKey || s.metaKey) && !s.shiftKey && !s.altKey && (l === "b" || l === "i") && (s.preventDefault(), eo(s, l === "b" ? "bold" : "italic"));
  }}></textarea>`}
      </div>

      <div class="field"><span class="dlg-label">${t("f_parent")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_parent")}>
          ${e.parents.map((s) => h`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.parent === s.id}
            @click=${() => e.onChange({ parent: s.id })}>${Ae(s, !0)}${s.name}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_prio")}</span>
        <div class="seg3" role="radiogroup" aria-label=${t("f_prio")}>
          ${[1, 2, 3].map((s) => h`<button type="button" role="radio" aria-checked=${n.priority === s}
            class="prio-${s}" @click=${() => e.onChange({ priority: s })}>${kr}${t(`prio_${s}`)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_due")}</span>
        <div class="chips">
          ${i.map((s) => h`<button class="pill-btn ${kt(s, e.now) === n.date ? "on" : ""}" type="button"
            aria-pressed=${kt(s, e.now) === n.date}
            @click=${() => e.onChange({ date: kt(s, e.now), ...s === "none" ? { time: "" } : {} })}>${t(`q_${s}`)}</button>`)}
          <label class="pill-input"><span class="vis-hidden">${t("f_date")}</span>
            <input type="date" .value=${n.date} @input=${(s) => e.onChange({ date: s.target.value })} /></label>
          <label class="pill-input"><span class="vis-hidden">${t("f_time")}</span>
            <input type="time" .value=${n.time} ?disabled=${!n.date} @input=${(s) => e.onChange({ time: s.target.value })} /></label>
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_who")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_who")}>
          <button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === null}
            @click=${() => e.onChange({ assignee: null })}>${be(e.hass, null, "", !0)}${t("unassigned")}</button>
          ${e.people.map((s) => h`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === s}
            @click=${() => e.onChange({ assignee: s })}>${be(e.hass, s, "", !0)}${dt(e.hass, s)}</button>`)}
        </div></div>

      <div class="dlg-foot">
        ${o ? b : n.confirmDelete ? h`<span class="danger-text" role="alert">${t("delete_confirm")}</span>
              <button class="danger-btn" type="button" ?disabled=${e.busy} @click=${e.onDelete}>${t("delete_yes")}</button>
              <button class="pill-btn" type="button" @click=${() => e.onChange({ confirmDelete: !1 })}>${t("cancel")}</button>` : h`<button class="danger-link" type="button" @click=${() => e.onChange({ confirmDelete: !0 })}>${t("delete")}</button>`}
        <span class="grow"></span>
        ${n.confirmDelete ? b : h`
          <button class="pill-btn" type="button" @click=${e.onClose}>${t("cancel")}</button>
          <button class="primary-btn" type="button" ?disabled=${!n.summary.trim() || e.busy} @click=${e.onSave}>${t("save")}</button>`}
      </div>
    </div>
  </dialog>`;
}
const Sr = h`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`, Er = [
  ["bold", h`<b>B</b>`],
  ["italic", h`<i>I</i>`],
  ["bullets", "•"],
  ["link", Sr]
];
function eo(n, e) {
  var l, d;
  const t = (l = n.currentTarget.closest(".field")) == null ? void 0 : l.querySelector("textarea");
  if (!t) return;
  const o = t.value, i = ur(o, t.selectionStart, t.selectionEnd, e);
  if (i.value === o) return;
  let r = 0, a = 0;
  for (; r < o.length && r < i.value.length && o[r] === i.value[r]; ) r++;
  for (; a < o.length - r && a < i.value.length - r && o[o.length - 1 - a] === i.value[i.value.length - 1 - a]; ) a++;
  const s = i.value.slice(r, i.value.length - a);
  t.focus(), t.setSelectionRange(r, o.length - a), (!((d = document.execCommand) != null && d.call(document, s ? "insertText" : "delete", !1, s)) || t.value !== i.value) && (t.value = o, t.setRangeText(s, r, o.length - a), t.dispatchEvent(new Event("input", { bubbles: !0 }))), t.setSelectionRange(i.start, i.end);
}
const Dr = h`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>`, Ar = h`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function Cr(n, e) {
  const t = (a) => m(e.lang, a), o = En(n.lines), i = n.lines.findIndex((a) => a.done), r = (a) => {
    const s = pr(n.lines, a.value);
    a.value = "", s !== n.lines && e.onChange({ lines: s });
  };
  return h`<section class="field cl-list">
    <div class="row"><span class="dlg-label grow">${t("cl_list")}</span>
      ${o.total ? h`<span class="pill c-green">${o.done}/${o.total}</span>` : b}</div>
    <div class="cl-box-list">
      ${n.lines.map((a, s) => h`<div class="cl-item ${a.done ? "done" : ""} ${s === i && s > 0 ? "first-done" : ""}">
        <button class="cl-check" type="button" role="checkbox" aria-checked=${a.done} aria-label=${a.text}
          @click=${() => e.onChange({ lines: Lo(n.lines, s) })}>${Ar}</button>
        <span class="cl-text">${a.text}</span>
        <button class="cl-x" type="button" aria-label=${`${t("cl_remove")}: ${a.text}`} @click=${() => e.onChange({ lines: hr(n.lines, s) })}>${Dr}</button>
      </div>`)}
      <label class="cl-add"><span aria-hidden="true">+</span>
        <input type="text" autocomplete="off" placeholder=${t("cl_add_ph")} aria-label=${t("cl_add_ph")}
          @keydown=${(a) => {
    a.key === "Enter" && !a.isComposing && (a.preventDefault(), r(a.target));
  }}
          @blur=${(a) => r(a.target)} /></label>
    </div>
  </section>`;
}
function to(n) {
  if (!n.due) return 1 / 0;
  const { date: e, hasTime: t } = G(n.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function Ot(n, e) {
  const t = to(n), o = to(e);
  return t !== o ? t < o ? -1 : 1 : n.priority - e.priority || +new Date(n.created_at) - +new Date(e.created_at);
}
function Tr(n, e) {
  const t = { todo: 0, later: 0, week: 0, today: 0, overdue: 0, done: 0 }, o = z(e.now), i = [], r = [];
  let a = 0;
  for (const l of n) {
    const d = Se(l, e);
    d && t[d]++, d === "today" && i.push(l), d === "week" && r.push(l), d === "today" && l.due && z(G(l.due).date) < o && a++;
  }
  const s = (l) => l.sort(Ot).slice(0, 3);
  return { counts: t, overdue: a, preview: s(i), weekPreview: s(r) };
}
const ne = {
  today: { icon: "mdi:calendar-today", color: "blue" },
  overdue: { icon: "mdi:alert-circle-outline", color: "red" },
  week: { icon: "mdi:calendar-week", color: "indigo" },
  todo: { icon: "mdi:format-list-checks", color: "teal" },
  later: { icon: "mdi:calendar-clock", color: "purple" },
  done: { icon: "mdi:check-circle-outline", color: "green" }
}, Or = ["today", "overdue", "week", "later"], Mr = ["todo", "done"];
function Pr(n, e) {
  const t = Tr(n.items, n.ctx), o = n.items.filter((i) => i.status === "needs_action");
  return h`<div class="tiles-view">
    <div class="people ${n.who ? "has-filter" : ""}" role="group" aria-label=${m(e.lang, "filter_people")}>
      ${n.people.map((i) => {
    const r = n.who === i;
    return h`<button class="person" type="button" aria-pressed=${r} @click=${() => n.onWho(r ? null : i)}>
          ${be(e.hass, i, "lg", !0)}<span>${dt(e.hass, i)}</span></button>`;
  })}
    </div>
    <div class="tiles">
      ${Or.filter((i) => n.ctx.enabled.has(i)).map((i) => {
    const r = i === "today" || i === "week", a = i === "today" ? t.overdue : 0;
    return h`<button class="tile ${r ? "wide" : ""} ${ge(ne[i].color)}" type="button" data-tile=${i} @click=${() => n.onTile(i)}>
          <span class="row">
            <span class="dot"><ha-icon .icon=${ne[i].icon}></ha-icon></span>
            <span class="tile-label">${m(e.lang, `col_${i}`)}</span>
            ${a > 0 ? h`<span class="pill c-red">${te(e.lang, "sum_overdue", a)}</span>` : b}
          </span>
          <span class="tile-count">${t.counts[i]}</span>
          ${r ? h`<span class="preview">${(i === "today" ? t.preview : t.weekPreview).map((s) => h`<span class="row">
            <span class="mark"></span><span class="t">${s.summary}</span>${s.assignee ? be(e.hass, s.assignee, "xs", !0) : b}</span>`)}</span>` : b}
        </button>`;
  })}
    </div>
    <div class="qchips">
      ${Mr.filter((i) => n.ctx.enabled.has(i)).map((i) => h`<button class="qchip ${ge(ne[i].color)}" type="button" data-tile=${i} @click=${() => n.onTile(i)}>
        <span class="dot"><ha-icon .icon=${ne[i].icon}></ha-icon></span>
        <span class="qlabel">${m(e.lang, `col_${i}`)}</span><span class="qcount">${t.counts[i]}</span></button>`)}
    </div>
    <span class="dlg-label tiles-h">${m(e.lang, "lists")}</span>
    <div class="plist">
      ${e.parents.map((i) => h`<button class="prow" type="button" data-parent=${i.id} @click=${() => n.onParent(i.id)}>
        ${Ae(i)}<span class="pname">${i.name}</span>
        <span class="pcount">${o.filter((r) => r.parent === i.id).length}</span><span aria-hidden="true">›</span></button>`)}
    </div>
  </div>`;
}
const no = (n, e) => n.filter((t) => t.due && z(G(t.due).date) < z(e.now)).length, zr = ["todo", "later", "week", "overdue", "today", "done"], Yo = (n, e) => +new Date(e.completed_at ?? 0) - +new Date(n.completed_at ?? 0);
function Nr(n, e, t) {
  const { ctx: o } = e, i = n.filter((l) => l.status === "needs_action"), r = n.filter((l) => Se(l, o) === "done").sort(Yo), a = n.filter((l) => l.status === "completed").length - r.length, s = e.group === "date" ? zr.filter((l) => l !== "done" && (l === "todo" || o.enabled.has(l))).map((l) => ({
    id: l,
    label: m(t, `col_${l}`),
    ...ne[l],
    items: i.filter((d) => Se(d, o) === l).sort(Ot)
  })) : [1, 2, 3].map((l) => ({
    id: `p${l}`,
    label: m(t, `prio_${l}`),
    icon: "mdi:flag-outline",
    color: ["", "red", "orange", "grey"][l],
    items: i.filter((d) => d.priority === l).sort(Ot)
  }));
  return o.enabled.has("done") && s.push({ id: "done", label: m(t, "col_done"), ...ne.done, items: r, done: !0 }), { cols: s, olderDone: a };
}
function Ir(n, e, t) {
  const { cols: o, olderDone: i } = Nr(n, e, t.lang);
  return h`<div class="board">${o.map((r) => h`<section class="col" data-col=${r.id}>
      <div class="col-head">
        <span class="dot ${ge(r.color)}"><ha-icon .icon=${r.icon}></ha-icon></span>
        <span class="label">${r.label}</span>
        ${r.id === "today" && no(r.items, e.ctx) ? h`<span class="pill c-red">${te(t.lang, "sum_overdue", no(r.items, e.ctx))}</span>` : b}
        <span class="count">${r.items.length}</span>
        ${r.done || r.id === "overdue" ? b : h`<button class="add" type="button" aria-label=${`${m(t.lang, "add_here")}: ${r.label}`} @click=${() => e.onAdd(r.id)}>+</button>`}
      </div>
      ${r.items.map((a) => qo(a, t, e.group === "date"))}
      ${r.done ? h`<button class="note note-btn" type="button" @click=${e.onHistory}>${m(t.lang, "done_note", { days: e.ctx.doneDays, older: i })}</button>` : b}
      ${!r.done && r.items.length === 0 ? h`<div class="empty">${m(t.lang, "nothing")}</div>` : b}
    </section>`)}</div>`;
}
const Rr = ["today", "week", "todo", "done"];
function Hr(n, e) {
  return h`<dialog class="sheet kb-sheet" aria-label=${n.title}
    @cancel=${(t) => {
    t.preventDefault(), n.onCancel();
  }}
    @click=${(t) => {
    t.target === t.currentTarget && n.onClose();
  }}>
    <div class="grabber"><span></span></div>
    <div class="sheet-head">
      <span class="dot ${ge(n.color)}"><ha-icon .icon=${n.icon}></ha-icon></span>
      <h2>${n.title}</h2>
      <span class="count">${n.count}</span>
      <button class="round-btn sclose" type="button" aria-label=${m(e.lang, "close")} @click=${n.onClose}>✕</button>
    </div>
    <div class="sheet-list" @pointerdown=${n.press.down} @pointermove=${n.press.move} @pointerup=${n.press.end}
      @pointercancel=${n.press.end} @pointerleave=${n.press.end} @contextmenu=${(t) => t.preventDefault()}>
      ${n.entries.map((t) => qo(t, e, !0))}
      ${n.entries.length === 0 ? h`<div class="empty">${m(e.lang, "nothing")}</div>` : b}
      ${n.isDone ? h`<button class="pill-btn hist-link" type="button" @click=${n.onHistory}>${m(e.lang, "older_history", { n: n.olderDone })}</button>` : b}
    </div>
    ${n.menu ? Lr(n.menu, n, e) : b}
  </dialog>`;
}
function Lr(n, e, t) {
  return h`<div class="menu-wrap" @click=${(o) => {
    o.target === o.currentTarget && e.onMenuClose();
  }}>
    <div class="menu" role="group" aria-label=${m(t.lang, "move_to")}>
      <div class="menu-title">${m(t.lang, "move_to")}<small>${n.summary}</small></div>
      ${Rr.map((o) => h`<button class="menu-btn" type="button" data-move=${o} @click=${() => e.onMove(n, o)}>${m(t.lang, `col_${o}`)}</button>`)}
      <button class="menu-btn muted" type="button" @click=${e.onMenuClose}>${m(t.lang, "cancel")}</button>
    </div>
  </div>`;
}
function Fr(n, e, t, o, i) {
  const r = o.filter((s) => s.status === "needs_action" && (!e.who || s.assignee === e.who)), a = (s) => {
    const l = e.parent === ((s == null ? void 0 : s.id) ?? null), d = r.filter((p) => !s || p.parent === s.id).length;
    return h`<button class="chip ${s ? ge(s.color) : ""}" type="button" aria-pressed=${l}
      @click=${() => i({ parent: l ? null : (s == null ? void 0 : s.id) ?? null })}>
      ${Ae(s ?? void 0)}<span>${(s == null ? void 0 : s.name) ?? m(n.lang, "all_parents")}</span><b>${d}</b></button>`;
  };
  return h`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${m(n.lang, "filter_people")}>
      ${t.map((s) => {
    const l = e.who === s;
    return h`<button class="person" type="button" aria-pressed=${l} @click=${() => i({ who: l ? null : s })}>
          ${be(n.hass, s, "lg", !0)}<span>${dt(n.hass, s)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${m(n.lang, "filter_parents")}>
      ${a(null)}${n.parents.map((s) => a(s))}
    </div>
    <div class="seg" role="group" aria-label=${m(n.lang, "group_label")}>
      ${["date", "priority"].map((s) => h`<button type="button" aria-pressed=${e.group === s}
        @click=${() => i({ group: s })}>${m(n.lang, `group_${s}`)}</button>`)}
    </div>
  </div>`;
}
function jr(n, e, t, o) {
  const i = z(e), r = Z(i, -((i.getDay() - o + 7) % 7)), a = Z(r, -7), s = new Intl.DateTimeFormat(t, { month: "long", year: "numeric" }), l = /* @__PURE__ */ new Map();
  for (const d of n) {
    const p = new Date(d.completed_at ?? 0);
    let c, f;
    p >= r ? (c = "this", f = m(t, "col_week")) : p >= a ? (c = "last", f = m(t, "hist_last_week")) : (c = `${p.getFullYear()}-${p.getMonth()}`, f = s.format(p), t.startsWith("cs") && (f = f.toLocaleLowerCase("cs")));
    const _ = l.get(c) ?? { label: f, items: [] };
    _.items.push(d), l.set(c, _);
  }
  return [...l.values()];
}
const qr = h`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path></svg>`;
function Ur(n, e) {
  const t = (s) => m(e.lang, s), o = new Intl.DateTimeFormat(e.lang, { day: "numeric", month: "short" }), i = (s) => {
    s.target === s.currentTarget && e.onClose();
  }, r = (s) => e.parents.find((l) => l.id === s), a = jr(n.items, e.now, e.lang, e.firstDay);
  return h`<dialog class="kb-dialog kb-history" aria-labelledby="kb-hist-title" @close=${e.onClose} @click=${i}>
    <div class="dlg">
      <div class="dlg-head">
        <span class="dot idle"><ha-icon .icon=${"mdi:history"}></ha-icon></span>
        <div class="grow"><h2 id="kb-hist-title" class="hist-title">${t("history")}</h2>
          <span class="hist-sub">${m(e.lang, "hist_total", { n: n.total })}</span></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      ${n.error ? h`<div class="notice" role="alert">${t(n.error)}</div>` : b}
      <label class="hist-search">
        <span class="vis-hidden">${t("hist_search")}</span>
        <input type="search" autocomplete="off" .value=${n.search} placeholder=${t("hist_search_ph")}
          @input=${(s) => e.onSearch(s.target.value)} />
      </label>
      <div class="chips" role="group" aria-label=${t("filter_parents")}>
        <button class="pill-btn" type="button" aria-pressed=${n.parent === null} @click=${() => e.onParent(null)}>${t("all_parents")}</button>
        ${e.parents.map((s) => h`<button class="pill-btn hist-chip" type="button" aria-pressed=${n.parent === s.id}
          @click=${() => e.onParent(s.id)}>${Ae(s, !0)}${s.name}</button>`)}
      </div>
      <div class="hist-list">
        ${a.map((s) => h`<section class="hist-group">
          <h3 class="dlg-label">${s.label}</h3>
          <ul class="hist-rows">${s.items.map((l) => {
    var d;
    return h`<li class="hist-row" data-uid=${l.uid}>
            <span class="hist-check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>
            <div class="hist-text"><span class="hist-name">${l.summary}</span>
              <span class="hist-meta">${((d = r(l.parent)) == null ? void 0 : d.name) ?? l.parent} · ${l.completed_at ? o.format(new Date(l.completed_at)) : ""}</span></div>
            ${l.assignee ? be(e.hass, l.assignee) : b}
            <button class="hist-reopen" type="button" title=${t("reopen")} aria-label=${`${t("reopen")}: ${l.summary}`}
              @click=${() => e.onReopen(l)}>${qr}</button>
          </li>`;
  })}</ul>
        </section>`)}
        ${n.items.length === 0 && !n.loading && !n.error ? h`<div class="empty hist-empty">${t("hist_empty")}</div>` : b}
        ${n.items.length < n.total ? h`<button class="pill-btn hist-more" type="button" ?disabled=${n.loading} @click=${e.onMore}>${t("hist_more")}</button>` : b}
      </div>
    </div>
  </dialog>`;
}
const en = "household", Dn = { name: "", icon: "mdi:format-list-checks", color: "blue", checklist: !1 };
function Br(n, e) {
  if (!n || !e) return null;
  const t = ["end_of_day_mode", "close_time", "notify_enabled", "notify_time", "notify_assignee", "notify_services"], o = {};
  for (const i of t) JSON.stringify(n[i]) !== JSON.stringify(e[i]) && (o[i] = e[i]);
  return Object.keys(o).length ? o : null;
}
const Yr = ["todo", "later", "week", "today", "done"], oo = [["board", "tab_board", "mdi:view-column"], ["eod", "tab_eod", "mdi:weather-night"], ["lists", "tab_lists", "mdi:account-group"]], Wr = "M3 5h18v12H3zM8 21h8M12 17v4", Xr = "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", Fe = (n, e = 16) => h`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${n}></path></svg>`, Ht = (n, e) => (n.includes(!0) ? n[e] : e === 0) ? 0 : -1;
function Lt(n) {
  const e = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }, t = [...n.currentTarget.querySelectorAll('[role="radio"],[role="tab"]')], o = t.indexOf(n.target);
  if (o < 0) return;
  const i = n.key === "Home" ? 0 : n.key === "End" ? t.length - 1 : n.key in e ? (o + e[n.key] + t.length) % t.length : -1;
  i < 0 || (n.preventDefault(), t[i].focus(), t[i].click());
}
function Gr(n, e) {
  if (!n) return !1;
  const t = n.id === void 0 ? Dn : e.find((o) => o.id === n.id);
  return n.target !== void 0 || !t || ["name", "icon", "color", "checklist"].some((o) => n[o] !== t[o]);
}
function Ft(n, e, t, o = {}, i = !1) {
  return h`<button class="switch" type="button" role="switch" aria-checked=${n} aria-label=${e} ?disabled=${i}
    data-col=${o.col ?? b} data-parent=${o.parent ?? b} @click=${t}></button>`;
}
function tn(n, e, t) {
  return h`<div class="scope ${e ? "household" : "dashboard"}" role="note">
    ${Fe(e ? Xr : Wr)}
    <span class="scope-text"><b>${m(n, e ? "scope_household" : "scope_dashboard")}</b><span>${m(n, t)}</span></span>
  </div>`;
}
function Vr(n, e) {
  const t = (a) => m(e.lang, a), o = n.columns ?? [], i = (a, s, l, d) => h`
    <div class="set-line"><span class="grow">${a}</span>
      <div class="seg" role="radiogroup" aria-label=${a} @keydown=${Lt}>
        ${s.map(([p, c], f) => h`<button type="button" role="radio" aria-checked=${p === l} tabindex=${Ht(s.map(([_]) => _ === l), f)} @click=${() => d(p)}>${c}</button>`)}
      </div>
    </div>`, r = ["sort_due", "f_prio", "sort_created"];
  return h`
    <section class="set-sec">
      <h3 class="dlg-label">${t("columns")}</h3>
      <div class="set-rows">${Yr.map((a) => h`<div class="set-row">
        <span class="dot ${ge(ne[a].color)}"><ha-icon .icon=${ne[a].icon}></ha-icon></span>
        <span class="set-text"><span class="set-name">${t(`col_${a}`)}</span><span class="set-hint">${t(`col_hint_${a}`)}</span></span>
        ${Ft(
    a === "todo" || o.includes(a),
    t(`col_${a}`),
    () => e.onChange({ columns: o.filter((s) => s !== a).concat(o.includes(a) ? [] : [a]) }),
    { col: a },
    a === "todo"
  )}
      </div>`)}</div>
      ${o.includes("done") ? h`
        ${i(t("done_keep"), $n.map((a) => [a, te(e.lang, "days", a)]), n.done_days, (a) => e.onChange({ done_days: a }))}
        <span class="set-hint pad">${t("done_keep_hint")}</span>` : b}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("view")}</h3>
      ${i(t("group_label"), [["date", t("group_date")], ["priority", t("group_priority")]], n.group, (a) => e.onChange({ group: a }))}
      ${i(
    t("language"),
    [[void 0, t("lang_ha")], ...Sn.map((a) => [a, zo[a]])],
    n.language,
    (a) => e.onChange({ language: a })
  )}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("sort_order")}</h3>
      <div class="sort-keys">${r.map((a, s) => h`${s ? Fe("M9 6l6 6-6 6") : b}<span class="sort-key"><span class="sort-n">${s + 1}</span>${t(a)}</span>`)}</div>
      <span class="set-hint pad">${t("sort_hint")}</span>
    </section>`;
}
const io = [
  ["keep", "M5 21V4h11l-1.5 4L16 12H5", "red"],
  ["overdue", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16.5h.01", "red"],
  ["move", "M4 12h13M13 7l5 5-5 5M20 5v14", "blue"],
  ["raise", "M12 19V5M6 11l6-6 6 6", "orange"]
], Kr = /^([01]\d|2[0-3]):[0-5]\d$/, Zr = h`<span class="box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>`;
function ro(n, e, t) {
  return h`<input class="time-in" type="time" aria-label=${e} .value=${n}
    @change=${(o) => {
    const i = o.target;
    Kr.test(i.value) ? t(i.value) : i.value = n;
  }}>`;
}
function so(n, e, t, o, i) {
  return h`<button class="check-row" type="button" role="checkbox" aria-checked=${n} data-service=${i ?? b} @click=${o}>
    ${Zr}${i ? Fe("M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2") : b}
    <span class="set-text"><span class="set-name">${e}</span><span class="set-hint ${i ? "mono" : ""}">${t}</span></span>
  </button>`;
}
function Jr(n, e) {
  const t = (s) => m(e.lang, s), o = n.eod;
  if (!o)
    return n.eodError ? h`<div class="notice" role="alert">${t("err_load_settings")}
      <button class="pill-btn retry-eod" type="button" @click=${e.onRetry}>${t("retry")}</button></div>` : n.eodLoading ? h`<p class="set-hint pad">${t("loading")}</p>` : h``;
  const i = [...o.offered_services, ...o.notify_services.filter((s) => !o.offered_services.includes(s))], [r, a] = m(e.lang, "event_hint", { event: "\0" }).split("\0");
  return h`
    <section class="set-sec">
      <h3 class="dlg-label">${t("eod_title")}</h3>
      <div class="eod-opts" role="radiogroup" aria-label=${t("eod_title")} @keydown=${Lt}>${io.map(([s, l, d], p) => h`
        <button class="eod-opt" type="button" role="radio" data-mode=${s} aria-checked=${o.end_of_day_mode === s}
          tabindex=${Ht(io.map(([c]) => c === o.end_of_day_mode), p)} @click=${() => e.onEod({ end_of_day_mode: s })}>
          <span class="radio"></span><span class="dot c-${d}">${Fe(l, 15)}</span>
          <span class="set-text"><span class="set-name">${t(`eod_${s}`)}</span><span class="set-hint">${t(`eod_${s}_hint`)}</span></span>
        </button>`)}</div>
      <label class="set-line"><span class="grow">${t("close_at")}</span>${ro(o.close_time, t("close_at"), (s) => e.onEod({ close_time: s }))}</label>
      <span class="set-hint pad">${t("close_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("notify_title")}</h3>
      <div class="set-rows">
        <div class="set-row">
          <span class="set-text"><span class="set-name">${t("notify_on")}</span><span class="set-hint">${t("notify_on_hint")}</span></span>
          ${Ft(o.notify_enabled, t("notify_on"), () => e.onEod({ notify_enabled: !o.notify_enabled }))}
        </div>
        ${o.notify_enabled ? h`
          <label class="set-row">
            <span class="set-text"><span class="set-name">${t("notify_at")}</span><span class="set-hint">${t("notify_at_hint")}</span></span>
            ${ro(o.notify_time, t("notify_at"), (s) => e.onEod({ notify_time: s }))}
          </label>
          <div class="notify-whom">
            <span class="set-name">${t("notify_whom")}</span>
            ${so(o.notify_assignee, t("notify_assignee"), t("notify_assignee_hint"), () => e.onEod({ notify_assignee: !o.notify_assignee }))}
            ${i.map((s) => {
    const l = o.notify_services.includes(s), d = o.offered_services.includes(s) ? s.replace(/^notify\.mobile_app_/, "").replace(/_/g, " ") : s;
    return so(l, d, s, () => e.onEod({ notify_services: l ? o.notify_services.filter((p) => p !== s) : [...o.notify_services, s] }), s);
  })}
          </div>` : b}
      </div>
      ${o.notify_enabled ? h`<span class="set-hint pad">${r}<code class="mono">household_kanban_day_closed</code>${a}</span>` : b}
    </section>`;
}
function ao(n, e) {
  const t = (a) => m(e.lang, a), o = (a) => e.onForm({ ...n, ...a, error: !1 }), i = e.parents.filter((a) => a.id !== n.id), r = (a) => a.target.value;
  return h`<div class="parent-form">
    <label class="field"><span class="dlg-label">${t("list_name")}</span>
      <input class="text-in" name="name" .value=${n.name} @input=${(a) => o({ name: r(a) })}></label>
    <label class="field"><span class="dlg-label">${t("list_icon")}</span>
      ${customElements.get("ha-icon-picker") ? h`<ha-icon-picker .hass=${e.hass} .value=${n.icon} @value-changed=${(a) => o({ icon: a.detail.value ?? "" })}></ha-icon-picker>` : h`<input class="text-in mono" name="icon" placeholder="mdi:…" .value=${n.icon} @input=${(a) => o({ icon: r(a) })}>`}</label>
    <div class="field"><span class="dlg-label">${t("list_color")}</span>
      <div class="chips" role="radiogroup" aria-label=${t("list_color")} @keydown=${Lt}>${un.map((a, s) => h`
        <button class="color-chip c-${a}" type="button" role="radio" data-color=${a} aria-label=${t(`color_${a}`)} aria-checked=${n.color === a}
          tabindex=${Ht(un.map((l) => l === n.color), s)} @click=${() => o({ color: a })}></button>`)}</div></div>
    <div class="set-line"><span class="set-text grow"><span class="set-name">${t("list_checklist")}</span><span class="set-hint">${t("list_checklist_hint")}</span></span>${Ft(n.checklist, t("list_checklist"), () => o({ checklist: !n.checklist }))}</div>
    ${n.target !== void 0 ? h`<label class="field"><span class="dlg-label">${t("move_items_to")}</span>
      <select class="text-in" @change=${(a) => o({ target: r(a) })}>${i.map((a) => h`<option value=${a.id} ?selected=${a.id === n.target}>${a.name}</option>`)}</select></label>` : b}
    ${n.error ? h`<div class="notice" role="alert">${t("err_parent")}</div>` : b}
    <div class="form-foot">
      ${n.id && n.id !== en && n.target === void 0 && i.length ? h`<button class="pill-btn remove-parent" type="button"
        @click=${() => o({ target: i.some((a) => a.id === en) ? en : i[0].id })}>${t("remove_list")}</button>` : b}
      <span class="grow"></span>
      <button class="pill-btn" type="button" @click=${() => e.onForm(void 0)}>${t("cancel")}</button>
      ${n.target === void 0 ? h`<button class="primary-btn save-parent" type="button" ?disabled=${n.busy || !n.name.trim()} @click=${e.onFormSave}>${t("save")}</button>` : h`<button class="primary-btn confirm-remove" type="button" ?disabled=${n.busy} @click=${e.onFormRemove}>${t("remove_list")}</button>`}
    </div>
  </div>`;
}
function Qr(n, e, t) {
  const o = (r) => m(t.lang, r), i = t.parents.map((r) => r.id);
  return h`
    <section class="set-sec">
      <h3 class="dlg-label">${o("lists_here")}</h3>
      <div class="set-rows">${t.parents.map((r) => {
    const a = !n.parents || n.parents.includes(r.id);
    return h`<div class="set-row">
          ${Ae(r)}
          <span class="set-text"><span class="set-name">${r.name}</span><span class="set-hint mono">${r.entity_id}</span></span>
          ${r.checklist ? h`<span class="set-badge">${o("list_checklist")}</span>` : b}
          ${Ft(a, m(t.lang, "show_list", { name: r.name }), () => t.onChange({ parents: cn(n.parents, i, r.id, !a) }), { parent: r.id })}
          <button class="icon-btn edit-list" type="button" data-parent=${r.id} aria-label=${o("edit_list")} aria-expanded=${(e == null ? void 0 : e.id) === r.id}
            @click=${() => t.onForm((e == null ? void 0 : e.id) === r.id ? void 0 : { id: r.id, name: r.name, icon: r.icon, color: r.color, checklist: r.checklist })}>${Fe("M4 20h4L19 9l-4-4L4 16zM14 6l4 4")}</button>
        </div>${(e == null ? void 0 : e.id) === r.id ? ao(e, t) : b}`;
  })}</div>
      ${e && e.id === void 0 ? ao(e, t) : h`<button class="add-list" type="button" @click=${() => t.onForm({ ...Dn })}>${Fe("M12 5v14M5 12h14", 14)}${o("add_list")}</button>`}
      <span class="set-hint pad">${o("lists_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${o("people_filter")}</h3>
      <div class="chips">${t.people.map((r) => {
    const a = !n.people || n.people.includes(r);
    return h`<button class="pill-btn person-chip" type="button" aria-pressed=${a} data-person=${r}
          @click=${() => t.onChange({ people: cn(n.people, t.people, r, !a) })}>${be(t.hass, r, "", !0)}${dt(t.hass, r)}</button>`;
  })}</div>
    </section>`;
}
function es(n, e) {
  const t = (s) => m(e.lang, s), o = Gr(n.form, e.parents), i = () => o ? e.onForm(void 0) : e.onClose(), r = (s) => {
    s.target === s.currentTarget && i();
  }, a = n.tab === "board" ? h`${tn(e.lang, !1, "scope_dashboard_hint")}${Vr(n.draft, e)}` : n.tab === "lists" ? h`${tn(e.lang, !1, "scope_lists_hint")}${Qr(n.draft, n.form, e)}` : h`${tn(e.lang, !0, "scope_household_hint")}${Jr(n, e)}`;
  return h`<dialog class="kb-dialog kb-settings ${n.narrow ? "narrow" : ""}" aria-labelledby="kb-set-title" @close=${e.onClose}
    @cancel=${(s) => {
    n.form && (s.preventDefault(), e.onForm(void 0));
  }} @click=${r}>
    <div class="dlg">
      <div class="dlg-head">
        <span class="dot idle"><ha-icon .icon=${"mdi:cog"}></ha-icon></span>
        <div class="grow"><span class="dlg-kicker">Household Kanban</span>
          <h2 id="kb-set-title" class="hist-title">${t("settings")}</h2></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${i}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      <div class="set-tabs" role="tablist" aria-label=${t("settings")} @keydown=${Lt}>
        ${oo.map(([s, l, d], p) => h`<button type="button" role="tab" id="kb-tab-${s}" data-tab=${s} aria-selected=${n.tab === s} aria-controls="kb-panel"
          tabindex=${Ht(oo.map(([c]) => c === n.tab), p)} @click=${() => e.onTab(s)}><ha-icon .icon=${d}></ha-icon>${t(l)}</button>`)}
      </div>
      <div class="set-body" id="kb-panel" role="tabpanel" aria-labelledby="kb-tab-${n.tab}">${a}</div>
      ${n.error ? h`<div class="notice" role="alert">${t(n.error)}</div>` : b}
      <div class="dlg-foot">
        ${o ? h`<span class="set-hint form-unsaved" role="status">${t("form_unsaved")}</span>` : b}
        <span class="grow"></span>
        <button class="pill-btn" type="button" @click=${i}>${t("cancel")}</button>
        <button class="primary-btn" type="button" ?disabled=${n.saving || o} @click=${e.onSave}>${t("save")}</button>
      </div>
    </div>
  </dialog>`;
}
const ts = 50, ns = 600, os = 500, Mt = "household_kanban:unsaved";
function nn(n) {
  try {
    n ? localStorage.setItem(Mt, JSON.stringify(n)) : localStorage.removeItem(Mt);
  } catch {
  }
}
function is() {
  try {
    const n = localStorage.getItem(Mt);
    return localStorage.removeItem(Mt), n ? JSON.parse(n) : void 0;
  } catch {
    return;
  }
}
const rs = h`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`, zt = class zt extends ze {
  constructor() {
    super(), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set(), this._loadFailed = !1, this._busy = !1, this._narrow = !1, this._raw = {}, this._sheetShown = !1, this._menuShown = !1, this._lpFired = !1, this._hq = 0, this._hMore = null, this._sortables = /* @__PURE__ */ new Map(), this._ticks = /* @__PURE__ */ new Map(), this._seq = 0, this._attempts = 0, this.addEventListener("pointerdown", (e) => {
      this._down = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    }, !0);
  }
  static getConfigElement() {
    return document.createElement("household-kanban-card-editor");
  }
  static getStubConfig() {
    return Ie({ type: "custom:household-kanban-card" });
  }
  setConfig(e) {
    const t = Ie(e);
    this._raw = e, this._config = t, this._filter = { ...this._filter, group: t.group ?? "date" };
  }
  getCardSize() {
    return 8;
  }
  /** Sections view: the board needs the full width. */
  getGridOptions() {
    return { columns: "full", rows: 8, min_rows: 4 };
  }
  connectedCallback() {
    super.connectedCallback(), this._subscribe(), typeof ResizeObserver < "u" && (this._ro = new ResizeObserver((e) => {
      var o;
      const t = ((o = e[e.length - 1]) == null ? void 0 : o.contentRect.width) ?? 0;
      t > 0 && (this._narrow = t < ns), this._narrow || this._closeSheet();
    }), this._ro.observe(this));
  }
  disconnectedCallback() {
    var e, t, o;
    super.disconnectedCallback(), window.clearTimeout(this._retry), this._retry = void 0, (e = this._ro) == null || e.disconnect(), this._ro = void 0, this._lpCancel(), this._sortables.forEach((i) => i.destroy()), this._sortables.clear(), this._endDrag(), window.clearTimeout(this._hTimer), (t = this._hObs) == null || t.disconnect(), this._hObs = void 0, this._hMore = null, (o = this._unsub) == null || o.then((i) => i()).catch(() => {
    }), this._unsub = void 0;
  }
  willUpdate(e) {
    e.has("hass") && this._subscribe();
  }
  /** Subscribe once; on failure retry on a capped backoff timer, never on hass updates. */
  _subscribe() {
    if (this._unsub || this._retry !== void 0 || !this.hass || !this.isConnected) return;
    const e = Oo(this.hass, (t) => {
      var i;
      for (const [r, a] of this._ticks) {
        const s = (i = t.items.find((l) => l.uid === r)) == null ? void 0 : i.description;
        (s === void 0 || s !== a.base && !a.sent.slice(0, -1).includes(s)) && this._ticks.delete(r);
      }
      if (this._dragFrom) {
        this._pending = t;
        return;
      }
      this._board = t, this._loadFailed = !1;
      const o = this._draft ? void 0 : is();
      o && (this._draft = { ...o, confirmDelete: !1 }, this._dlgError = "err_unsaved");
    });
    this._unsub = e, e.then(() => {
      this._unsub === e && (this._attempts = 0);
    }, () => {
      this._unsub === e && (this._unsub = void 0, this._loadFailed = !0, this._retry = window.setTimeout(() => {
        this._retry = void 0, this._subscribe();
      }, Mo(this._attempts++)));
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
      await t(), nn(void 0), o === this._seq && (this._draft = void 0);
    } catch (i) {
      console.warn("household_kanban: write failed", i), o === this._seq && (this._dlgError = e);
    } finally {
      o === this._seq && (this._busy = !1);
    }
  }
  _save() {
    var i;
    const e = this.hass, t = this._draft;
    if (!e || !t) return;
    const o = t.uid ? (i = this._board) == null ? void 0 : i.items.find((r) => r.uid === t.uid) : void 0;
    if (t.uid && !o) {
      this._dlgError = "err_save";
      return;
    }
    this._dialogWrite("err_save", () => (o ? bt(e, o.uid, Qn(o, t)) : Li(e, Bo(t))).catch((r) => {
      throw nn(t), r;
    }));
  }
  /** Tap on a card; a click that ends a drag is not a tap. */
  _open(e, t) {
    const o = t, i = this._down;
    if (this._down = void 0, this._lpFired) {
      this._lpFired = !1;
      return;
    }
    o.detail !== 0 && i && Kn(o.clientX - i.x, o.clientY - i.y, t.timeStamp - i.t) || this._openDialog(Uo(e), () => {
      var r;
      return (r = [...this.renderRoot.querySelectorAll("[data-uid]")].find((a) => a.dataset.uid === e.uid)) == null ? void 0 : r.querySelector(".title");
    });
  }
  _openDialog(e, t) {
    this._seq++, this._busy = !1, this._dlgError = void 0, this._returnTo = t, this._draft = e;
  }
  _openSettings() {
    this._draft || this._hist || this._settings || !this._config || (this._seq++, this._returnTo = () => this.renderRoot.querySelector("header .gear-btn"), this._settings = { tab: "board", draft: { ...this._config }, saving: !1, narrow: this._narrow });
  }
  /** Save the changed sides: the board options into the dashboard, then the household settings. One failing does not stop or undo the other. */
  async _saveSettings() {
    const e = this.hass, t = this._settings, o = this._seq;
    if (!e || !t || t.saving) return;
    const i = () => o === this._seq && !!this._settings, r = (d) => {
      i() && (this._settings = { ...this._settings, ...d });
    };
    r({ saving: !0, error: void 0 });
    const a = Ie(t.draft);
    let s = JSON.stringify(a) === JSON.stringify(this._config) ? void 0 : await this._saveDashboard(e, a, i);
    const l = Br(t.server, t.eod);
    if (l && i())
      try {
        const d = await Bi(e, l);
        r({ server: d });
      } catch (d) {
        console.warn("household_kanban: settings update failed", d), s ?? (s = "err_settings");
      }
    i() && (s ? r({ saving: !1, error: s }) : this._settings = void 0);
  }
  /** Write the config into this card's entry of the dashboard config; HA reloads the dashboard after the save. */
  async _saveDashboard(e, t, o) {
    const i = ir(window.location.pathname);
    try {
      const r = await ji(e, i);
      if (r && typeof r == "object" && "strategy" in r) return "err_not_editable";
      const a = No(this._raw, t), s = rr(r, this._raw, a);
      if (s.matches !== 1) return s.matches ? "err_card_ambiguous" : "err_card_missing";
      if (!o()) return;
      await qi(e, i, s.config), this.setConfig(a);
      return;
    } catch (r) {
      console.warn("household_kanban: dashboard save failed", r);
      const a = r;
      return (a == null ? void 0 : a.code) === "config_not_editable" || (a == null ? void 0 : a.code) === "config_not_found" || /yaml/i.test((a == null ? void 0 : a.message) ?? "") ? "err_not_editable" : "err_settings";
    }
  }
  /** Household settings, loaded when the End of day tab first opens. */
  async _loadEod() {
    const e = this.hass, t = this._settings, o = this._seq;
    if (!e || !t || t.server || t.eodLoading) return;
    const i = (r) => {
      o === this._seq && this._settings && (this._settings = { ...this._settings, ...r });
    };
    i({ eodLoading: !0, eodError: !1 });
    try {
      const r = await Ui(e);
      i({ server: r, eod: r, eodLoading: !1 });
    } catch (r) {
      console.warn("household_kanban: settings load failed", r), i({ eodLoading: !1, eodError: !0 });
    }
  }
  /** Add, edit or remove a list right away; the new board arrives through the subscription. */
  async _parentWrite(e) {
    var s, l;
    const t = this.hass, o = (s = this._settings) == null ? void 0 : s.form, i = this._seq;
    if (!t || !o || o.busy) return;
    const r = () => {
      var d, p;
      return i === this._seq && ((p = (d = this._settings) == null ? void 0 : d.form) == null ? void 0 : p.id) === o.id;
    }, a = (d) => {
      r() && this._settings && (this._settings = { ...this._settings, form: d });
    };
    a({ ...o, busy: !0, error: !1 });
    try {
      await e(t), a(void 0);
    } catch (d) {
      console.warn("household_kanban: list write failed", d), r() && a({ ...(l = this._settings) == null ? void 0 : l.form, busy: !1, error: !0 });
    }
  }
  _saveParent() {
    var r, a;
    const e = (r = this._settings) == null ? void 0 : r.form;
    if (!e) return;
    const t = { name: e.name.trim(), icon: e.icon.trim() || Dn.icon, color: e.color, checklist: e.checklist };
    if (!e.id) {
      const s = this._seq;
      this._parentWrite(async (l) => {
        const d = await Yi(l, t), p = this._settings;
        s === this._seq && (p != null && p.draft.parents) && (d != null && d.id) && (this._settings = { ...p, draft: { ...p.draft, parents: [...p.draft.parents, d.id] } });
      });
      return;
    }
    const o = (a = this._board) == null ? void 0 : a.parents.find((s) => s.id === e.id), i = Object.fromEntries(Object.entries(t).filter(([s, l]) => !o || o[s] !== l));
    if (!Object.keys(i).length) {
      this._settings && (this._settings = { ...this._settings, form: void 0 });
      return;
    }
    this._parentWrite((s) => Wi(s, e.id, i));
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
    const i = this._hq;
    this._hist = { ...o, loading: !0, error: void 0 };
    try {
      const r = await Hi(t, {
        search: o.search.trim() || void 0,
        parent: o.parent ?? void 0,
        offset: e ? 0 : o.items.length,
        limit: ts
      });
      if (i !== this._hq || !this._hist) return;
      this._hist = { ...this._hist, items: e ? r.items : [...this._hist.items, ...r.items], total: r.total, loading: !1 };
    } catch (r) {
      console.warn("household_kanban: history failed", r), i === this._hq && this._hist && (this._hist = { ...this._hist, loading: !1, error: "err_history" });
    }
  }
  _histFilter(e, t) {
    this._hist && (this._hist = { ...this._hist, ...e }, window.clearTimeout(this._hTimer), this._hTimer = window.setTimeout(() => void this._loadHistory(!0), t));
  }
  _reopen(e) {
    const t = this.hass;
    t && gt(t, e, "needs_action").then(() => {
      const o = this._hist;
      !o || !o.items.some((i) => i.uid === e) || (this._hist = { ...o, items: o.items.filter((i) => i.uid !== e), total: Math.max(0, o.total - 1), error: void 0 });
    }, (o) => {
      console.warn("household_kanban: reopen failed", o), this._hist && (this._hist = { ...this._hist, error: "err_reopen" });
    });
  }
  /** Load the next page when the "Load more" button scrolls into view; the button itself is the fallback. */
  _observeMore() {
    var o, i, r, a;
    const e = this.renderRoot.querySelector(".hist-more"), t = ((o = this._hist) == null ? void 0 : o.items.length) ?? 0;
    if (!e || (i = this._hist) != null && i.loading) {
      e || ((r = this._hObs) == null || r.disconnect(), this._hMore = null);
      return;
    }
    ((a = this._hMore) == null ? void 0 : a.el) === e && this._hMore.n === t || (this._hMore = { el: e, n: t }, !(typeof IntersectionObserver > "u") && (this._hObs ?? (this._hObs = new IntersectionObserver((s) => {
      s.some((l) => l.isIntersecting) && this._loadHistory(!1);
    })), this._hObs.disconnect(), this._hObs.observe(e)));
  }
  _add(e, t, o, i, r = `.col[data-col="${e}"] .add`) {
    const a = () => this.renderRoot.querySelector(r), s = this._filter.parent ?? "household", l = t.find((c) => c.id === s) ?? t[0];
    if (!l) return;
    const d = /^p([123])$/.exec(e), p = {
      today: kt("today", o.now),
      week: ie(o.week.end),
      later: ie(Z(o.week.end, 1))
    };
    this._openDialog(xr(l, i, d ? { priority: Number(d[1]) } : { date: p[e] ?? "" }), a);
  }
  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  _syncSortables() {
    var o;
    const e = new Set(this.renderRoot.querySelectorAll(".col"));
    for (const [i, r] of this._sortables) e.has(i) || (r.destroy(), this._sortables.delete(i));
    const t = ((o = window.matchMedia) == null ? void 0 : o.call(window, "(pointer: coarse)").matches) ?? !1;
    for (const i of e)
      this._sortables.has(i) || this._sortables.set(i, y.create(i, {
        group: { name: "kb", pull: !0, put: (r) => r.el.dataset.col !== "overdue" },
        draggable: "[data-uid]",
        filter: (r) => pn(r),
        preventOnFilter: !1,
        sort: !1,
        delay: 150,
        delayOnTouchOnly: !0,
        touchStartThreshold: 8,
        forceFallback: t,
        // the exact node after the card is its own Lit end marker, so the card goes back inside its part
        onStart: (r) => {
          this._dragFrom = { parent: r.item.parentNode, next: r.item.nextSibling };
        },
        onEnd: (r) => {
          this._endDrag(r.item), r.to !== r.from && this._drop(r.item.dataset.uid, r.to.dataset.col);
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
    const o = this.hass, i = this._ctx, r = (c = this._board) == null ? void 0 : c.items.find((f) => f.uid === e);
    if (!o || !i || !r || !t) return;
    const a = /^p([123])$/.exec(t), s = er(r, a ? Number(a[1]) : t, i);
    if (!s) return;
    const { status: l, ...d } = s;
    (async () => {
      Object.keys(d).length && await bt(o, r.uid, d), l && await gt(o, r.uid, l);
    })().catch((f) => {
      console.warn("household_kanban: drop failed", f), this._fail("err_update");
    });
  }
  _openSheet(e, t, o) {
    this._sheetReturn = o, this._menu = void 0, this._sheet = { kind: e, id: t };
  }
  _closeSheet() {
    this._lpCancel(), this._closeMenu(), this._sheet = void 0;
  }
  _closeMenu() {
    this._menu = void 0, this._lpFired = !1;
  }
  _sheetCancel() {
    this._menu ? this._closeMenu() : this._closeSheet();
  }
  _lpStart(e) {
    this._lpFired = !1, this._lpCancel();
    const t = e.target, o = t.closest("[data-uid]"), i = o == null ? void 0 : o.dataset.uid;
    !i || pn(e) || (this._lp = { x: e.clientX, y: e.clientY, timer: window.setTimeout(() => {
      this._lp = void 0, this._lpFired = !0, this._menu = i, this._menuFor = i;
    }, os) });
  }
  _lpMove(e) {
    const t = this._lp;
    t && Kn(e.clientX - t.x, e.clientY - t.y) && this._lpCancel();
  }
  _lpCancel() {
    this._lp && window.clearTimeout(this._lp.timer), this._lp = void 0;
  }
  /** Focus handling for the sheet and its menu; the native dialog, when open, owns the focus. */
  _sheetFocus(e) {
    var i, r, a, s;
    if (e) return;
    const t = this.renderRoot.querySelector(".sheet");
    if (t && !this._sheetShown)
      this._sheetShown = !0, (i = t.querySelector(".sclose")) == null || i.focus();
    else if (!t && this._sheetShown) {
      this._sheetShown = !1;
      const l = this._sheetReturn;
      (r = l && this.renderRoot.querySelector(l) || this.renderRoot.querySelector("header .new")) == null || r.focus();
    }
    const o = this.renderRoot.querySelector(".menu-btn");
    if (o && !this._menuShown)
      this._menuShown = !0, o.focus();
    else if (!o && this._menuShown) {
      this._menuShown = !1;
      const l = this._menuFor;
      (s = ((a = [...this.renderRoot.querySelectorAll(".sheet [data-uid]")].find((p) => p.dataset.uid === l)) == null ? void 0 : a.querySelector(".title")) ?? this.renderRoot.querySelector(".sheet .sclose")) == null || s.focus();
    }
  }
  updated() {
    var o, i, r, a;
    this._syncSortables(), this._observeMore();
    const e = this.renderRoot.querySelector("dialog.kb-sheet");
    e && !e.open && e.showModal();
    const t = this.renderRoot.querySelector("dialog.kb-dialog");
    if (this._sheetFocus(!!t), t && !t.open)
      t.showModal(), this._hist ? (o = this.renderRoot.querySelector(".kb-history input")) == null || o.focus() : (i = this._draft) != null && i.uid || (r = this.renderRoot.querySelector(".cl-add input") ?? this.renderRoot.querySelector("#kb-title")) == null || r.focus();
    else if (!t && this._returnTo) {
      const s = this._returnTo;
      this._returnTo = void 0, (a = s()) == null || a.focus();
    }
  }
  render() {
    var k;
    const e = this.hass, t = this._config, o = this._board;
    if (!e || !t) return b;
    const i = Io(e, t);
    if (!o) return h`<ha-card><div class="loading">${m(i, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const r = /* @__PURE__ */ new Date(), a = o.parents.filter((u) => !t.parents || t.parents.includes(u.id)), s = new Set(t.columns ?? []);
    s.add("todo"), o.end_of_day_mode === "overdue" && s.add("overdue");
    const l = {
      now: r,
      enabled: s,
      mode: o.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: Zi(r, Vn(e.locale))
    };
    this._ctx = l;
    const d = {
      hass: e,
      lang: i,
      now: r,
      parents: a,
      expanded: this._expanded,
      onExpand: (u, x) => {
        const C = new Set(this._expanded);
        x ? C.add(u) : C.delete(u), this._expanded = C;
      },
      // ponytail: the whole description is written, so two people ticking in the same second is last write wins;
      // a per-line server op can come later. Own rapid ticks build on `_ticks` until the board echoes them.
      onLines: (u, x) => {
        var N, P;
        const C = this._ticks.get(u.uid) ?? { base: ((P = (N = this._board) == null ? void 0 : N.items.find((L) => L.uid === u.uid)) == null ? void 0 : P.description) ?? u.description, sent: [] };
        this._ticks.set(u.uid, { base: C.base, sent: [...C.sent, x] }), this.requestUpdate();
        const T = () => {
          var L;
          ((L = this._ticks.get(u.uid)) == null ? void 0 : L.sent.at(-1)) === x && (this._ticks.delete(u.uid), this.requestUpdate());
        };
        bt(e, u.uid, { description: x }).then(() => {
          window.setTimeout(T, 1e4);
        }, (L) => {
          console.warn("household_kanban: update_item failed", L), T(), this._fail("err_update");
        });
      },
      onOpen: (u, x) => this._open(u, x),
      onToggle: (u) => {
        gt(e, u.uid, u.status === "completed" ? "needs_action" : "completed").catch((x) => {
          console.warn("household_kanban: set_status failed", x), this._fail("err_update");
        });
      }
    }, p = t.people ?? Object.keys(e.states).filter((u) => u.startsWith("person.")), c = this._filter, f = o.items.filter((u) => a.some((x) => x.id === u.parent)).map((u) => {
      const x = this._ticks.get(u.uid);
      return x ? { ...u, description: x.sent.at(-1) } : u;
    }), _ = f.filter((u) => (!c.who || u.assignee === c.who) && (!c.parent || u.parent === c.parent));
    return h`<ha-card>
      ${this._notice ? h`<div class="notice" role="alert">${m(i, this._notice)}</div>` : b}
      <header class=${this._narrow ? "narrow" : ""}>
        <span class="dot hdr-dot"><ha-icon .icon=${"mdi:format-list-checks"}></ha-icon></span>
        <div class="titles"><h1>${m(i, "title")}</h1><div class="summary">${this._summary(f, l, i)}</div></div>
        ${(k = e.user) != null && k.is_admin ? h`<button class="round-btn gear-btn" type="button" aria-label=${m(i, "settings")} title=${m(i, "settings")}
          @click=${() => this._openSettings()}>${rs}</button>` : b}
        <button class="pill-btn hist-btn" type="button" @click=${() => this._openHistory("header .hist-btn")}>${m(i, "history")}</button>
        <button class="new" type="button" @click=${() => this._add("todo", a, l, i, "header .new")}>+ ${m(i, "new_note")}</button>
      </header>
      ${this._narrow ? this._renderNarrow(d, l, f, p, a) : h`
      ${Fr(d, c, p, f, (u) => {
      this._filter = { ...c, ...u };
    })}
      ${Ir(_, {
      ctx: l,
      group: c.group,
      onAdd: (u) => this._add(u, a, l, i),
      onHistory: () => this._openHistory('.col[data-col="done"] .note-btn')
    }, d)}`}
      ${this._hist ? Ur(this._hist, {
      hass: e,
      lang: i,
      now: r,
      parents: a,
      firstDay: Vn(e.locale),
      onSearch: (u) => this._histFilter({ search: u }, 300),
      onParent: (u) => this._histFilter({ parent: u }, 0),
      onReopen: (u) => this._reopen(u.uid),
      onMore: () => void this._loadHistory(!1),
      onClose: () => this._closeHistory()
    }) : b}
      ${this._settings ? es({ ...this._settings, narrow: this._narrow }, {
      hass: e,
      lang: i,
      parents: o.parents,
      people: Object.keys(e.states).filter((u) => u.startsWith("person.")),
      onTab: (u) => {
        this._settings && (this._settings = { ...this._settings, tab: u }), u === "eod" && this._loadEod();
      },
      onChange: (u) => {
        this._settings && (this._settings = { ...this._settings, draft: { ...this._settings.draft, ...u }, error: void 0 });
      },
      onEod: (u) => {
        const x = this._settings;
        x != null && x.eod && (this._settings = { ...x, eod: { ...x.eod, ...u }, error: void 0 });
      },
      onRetry: () => void this._loadEod(),
      onForm: (u) => {
        this._settings && (this._settings = { ...this._settings, form: u });
      },
      onFormSave: () => this._saveParent(),
      onFormRemove: () => {
        var x;
        const u = (x = this._settings) == null ? void 0 : x.form;
        u != null && u.id && u.target && this._parentWrite((C) => Xi(C, u.id, u.target));
      },
      onSave: () => void this._saveSettings(),
      onClose: () => {
        this._seq++, this._settings = void 0;
      }
    }) : b}
      ${this._draft ? $r(this._draft, {
      hass: e,
      lang: i,
      now: r,
      parents: a,
      people: p,
      busy: this._busy,
      error: this._dlgError,
      onChange: (u) => {
        this._draft && (this._draft = { ...this._draft, ...u });
      },
      onSave: () => this._save(),
      onClose: () => {
        this._draft = void 0, nn(void 0);
      },
      onToggleDone: () => {
        var N;
        const u = this._draft, x = u == null ? void 0 : u.uid;
        if (!u || !x) return;
        const C = (N = this._board) == null ? void 0 : N.items.find((P) => P.uid === x);
        if (!C) {
          this._dlgError = "err_update";
          return;
        }
        const T = Qn(C, u);
        this._dialogWrite("err_update", async () => {
          Object.keys(T).length && await bt(e, x, T), await gt(e, x, u.status === "completed" ? "needs_action" : "completed");
        });
      },
      onDelete: () => {
        const u = this._draft;
        u != null && u.uid && this._dialogWrite("err_delete", () => Fi(e, u.uid));
      }
    }) : b}
    </ha-card>`;
  }
  /** Tiles + parents list, and the bottom sheet when one is open. */
  _renderNarrow(e, t, o, i, r) {
    const a = this._filter.who, s = o.filter((c) => !a || c.assignee === a);
    let l = this._sheet, d = b;
    const p = (l == null ? void 0 : l.kind) === "parent" ? r.find((c) => c.id === (l == null ? void 0 : l.id)) : void 0;
    if ((l == null ? void 0 : l.kind) === "parent" && !p && (l = void 0, queueMicrotask(() => this._closeSheet())), l) {
      const c = l.id, f = (u) => u.filter((x) => x.status === "needs_action").sort(Ot), _ = l.kind === "parent" ? f(s.filter((u) => u.parent === l.id)) : c === "done" ? s.filter((u) => Se(u, t) === "done").sort(Yo) : f(s.filter((u) => Se(u, t) === c)), k = p ? { icon: p.icon, color: p.color, title: p.name } : { ...ne[c], title: m(e.lang, `col_${c}`) };
      d = Hr({
        ...k,
        count: _.length,
        isDone: c === "done" && !p,
        entries: _,
        olderDone: s.filter((u) => u.status === "completed").length - _.length,
        menu: this._menu ? s.find((u) => u.uid === this._menu) : void 0,
        onClose: () => this._closeSheet(),
        onCancel: () => this._sheetCancel(),
        onHistory: () => this._openHistory(".sheet .hist-link"),
        onMove: (u, x) => {
          this._closeMenu(), this._drop(u.uid, x);
        },
        onMenuClose: () => this._closeMenu(),
        press: { down: (u) => this._lpStart(u), move: (u) => this._lpMove(u), end: () => this._lpCancel() }
      }, e);
    }
    return h`${Pr({
      ctx: t,
      items: s,
      people: i,
      who: a,
      onWho: (c) => {
        this._filter = { ...this._filter, who: c };
      },
      onTile: (c) => this._openSheet("col", c, `[data-tile="${c}"]`),
      onParent: (c) => this._openSheet("parent", c, `.prow[data-parent="${c}"]`)
    }, e)}${d}`;
  }
  _summary(e, t, o) {
    const i = e.filter((d) => d.status === "needs_action"), r = z(t.now), a = i.filter((d) => d.due && z(G(d.due).date) < r).length, s = i.filter((d) => Se(d, t) === "today").length, l = t.mode === "overdue" ? te(o, "sum_overdue", a) : te(o, "sum_moved", i.filter((d) => d.moved > 0).length);
    return [te(o, "sum_open", i.length), te(o, "sum_today", s), l].join(" · ");
  }
};
zt.properties = {
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
  _hist: { state: !0 },
  _narrow: { state: !0 },
  _sheet: { state: !0 },
  _menu: { state: !0 },
  _settings: { state: !0 }
}, zt.styles = dr;
let fn = zt;
const gn = "household-kanban-card";
Po(gn, fn);
(window.customCards ?? (window.customCards = [])).some((n) => n.type === gn) || window.customCards.push({ type: gn, name: "Household Kanban", description: "Kanban board for household tasks" });
