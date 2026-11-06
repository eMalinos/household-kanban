/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = globalThis, fo = mt.ShadowRoot && (mt.ShadyCSS === void 0 || mt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, go = Symbol(), Do = /* @__PURE__ */ new WeakMap();
let sn = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== go) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (fo && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = Do.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Do.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Wn = (o) => new sn(typeof o == "string" ? o : o + "", void 0, go), ln = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((n, r, i) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + o[i + 1], o[0]);
  return new sn(t, o, go);
}, Yn = (o, e) => {
  if (fo) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), r = mt.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = t.cssText, o.appendChild(n);
  }
}, Ao = fo ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return Wn(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Xn, defineProperty: Gn, getOwnPropertyDescriptor: Vn, getOwnPropertyNames: Kn, getOwnPropertySymbols: Zn, getPrototypeOf: Jn } = Object, ue = globalThis, Co = ue.trustedTypes, Qn = Co ? Co.emptyScript : "", Ft = ue.reactiveElementPolyfillSupport, Ke = (o, e) => o, to = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? Qn : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, dn = (o, e) => !Xn(o, e), To = { attribute: !0, type: String, converter: to, reflect: !1, useDefault: !1, hasChanged: dn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ue.litPropertyMetadata ?? (ue.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ae = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = To) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
      r !== void 0 && Gn(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: r, set: i } = Vn(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: r, set(a) {
      const s = r == null ? void 0 : r.call(this);
      i == null || i.call(this, a), this.requestUpdate(e, s, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? To;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ke("elementProperties"))) return;
    const e = Jn(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ke("properties"))) {
      const t = this.properties, n = [...Kn(t), ...Zn(t)];
      for (const r of n) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [n, r] of t) this.elementProperties.set(n, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, n] of this.elementProperties) {
      const r = this._$Eu(t, n);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const r of n) t.unshift(Ao(r));
    } else e !== void 0 && t.push(Ao(e));
    return t;
  }
  static _$Eu(e, t) {
    const n = t.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Yn(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var n;
      return (n = t.hostConnected) == null ? void 0 : n.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var n;
      return (n = t.hostDisconnected) == null ? void 0 : n.call(t);
    });
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n);
  }
  _$ET(e, t) {
    var i;
    const n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
    if (r !== void 0 && n.reflect === !0) {
      const a = (((i = n.converter) == null ? void 0 : i.toAttribute) !== void 0 ? n.converter : to).toAttribute(t, n.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, a;
    const n = this.constructor, r = n._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = n.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((i = s.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? s.converter : to;
      this._$Em = r;
      const d = l.fromAttribute(t, s.type);
      this[r] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, n, r = !1, i) {
    var a;
    if (e !== void 0) {
      const s = this.constructor;
      if (r === !1 && (i = this[e]), n ?? (n = s.getPropertyOptions(e)), !((n.hasChanged ?? dn)(i, t) || n.useDefault && n.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(s._$Eu(e, n)))) return;
      this.C(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), i !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var n;
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
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (n = this._$EO) == null || n.forEach((r) => {
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
    (t = this._$EO) == null || t.forEach((n) => {
      var r;
      return (r = n.hostUpdated) == null ? void 0 : r.call(n);
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
Ae.elementStyles = [], Ae.shadowRootOptions = { mode: "open" }, Ae[Ke("elementProperties")] = /* @__PURE__ */ new Map(), Ae[Ke("finalized")] = /* @__PURE__ */ new Map(), Ft == null || Ft({ ReactiveElement: Ae }), (ue.reactiveElementVersions ?? (ue.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ze = globalThis, Oo = (o) => o, $t = Ze.trustedTypes, Mo = $t ? $t.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, cn = "$lit$", le = `lit$${Math.random().toFixed(9).slice(2)}$`, pn = "?" + le, er = `<${pn}>`, $e = document, nt = () => $e.createComment(""), rt = (o) => o === null || typeof o != "object" && typeof o != "function", bo = Array.isArray, tr = (o) => bo(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", jt = `[ 	
\f\r]`, We = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Po = /-->/g, zo = />/g, me = RegExp(`>|${jt}(?:([^\\s"'>=/]+)(${jt}*=${jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), No = /'/g, Io = /"/g, hn = /^(?:script|style|textarea|title)$/i, or = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), p = or(1), ze = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), Ro = /* @__PURE__ */ new WeakMap(), xe = $e.createTreeWalker($e, 129);
function un(o, e) {
  if (!bo(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Mo !== void 0 ? Mo.createHTML(e) : e;
}
const nr = (o, e) => {
  const t = o.length - 1, n = [];
  let r, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = We;
  for (let s = 0; s < t; s++) {
    const l = o[s];
    let d, h, c = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, h = a.exec(l), h !== null); ) f = a.lastIndex, a === We ? h[1] === "!--" ? a = Po : h[1] !== void 0 ? a = zo : h[2] !== void 0 ? (hn.test(h[2]) && (r = RegExp("</" + h[2], "g")), a = me) : h[3] !== void 0 && (a = me) : a === me ? h[0] === ">" ? (a = r ?? We, c = -1) : h[1] === void 0 ? c = -2 : (c = a.lastIndex - h[2].length, d = h[1], a = h[3] === void 0 ? me : h[3] === '"' ? Io : No) : a === Io || a === No ? a = me : a === Po || a === zo ? a = We : (a = me, r = void 0);
    const _ = a === me && o[s + 1].startsWith("/>") ? " " : "";
    i += a === We ? l + er : c >= 0 ? (n.push(d), l.slice(0, c) + cn + l.slice(c) + le + _) : l + le + (c === -2 ? s : _);
  }
  return [un(o, i + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class it {
  constructor({ strings: e, _$litType$: t }, n) {
    let r;
    this.parts = [];
    let i = 0, a = 0;
    const s = e.length - 1, l = this.parts, [d, h] = nr(e, t);
    if (this.el = it.createElement(d, n), xe.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = xe.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(cn)) {
          const f = h[a++], _ = r.getAttribute(c).split(le), k = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: i, name: k[2], strings: _, ctor: k[1] === "." ? ir : k[1] === "?" ? ar : k[1] === "@" ? sr : zt }), r.removeAttribute(c);
        } else c.startsWith(le) && (l.push({ type: 6, index: i }), r.removeAttribute(c));
        if (hn.test(r.tagName)) {
          const c = r.textContent.split(le), f = c.length - 1;
          if (f > 0) {
            r.textContent = $t ? $t.emptyScript : "";
            for (let _ = 0; _ < f; _++) r.append(c[_], nt()), xe.nextNode(), l.push({ type: 2, index: ++i });
            r.append(c[f], nt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === pn) l.push({ type: 2, index: i });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(le, c + 1)) !== -1; ) l.push({ type: 7, index: i }), c += le.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const n = $e.createElement("template");
    return n.innerHTML = e, n;
  }
}
function Ne(o, e, t = o, n) {
  var a, s;
  if (e === ze) return e;
  let r = n !== void 0 ? (a = t._$Co) == null ? void 0 : a[n] : t._$Cl;
  const i = rt(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== i && ((s = r == null ? void 0 : r._$AO) == null || s.call(r, !1), i === void 0 ? r = void 0 : (r = new i(o), r._$AT(o, t, n)), n !== void 0 ? (t._$Co ?? (t._$Co = []))[n] = r : t._$Cl = r), r !== void 0 && (e = Ne(o, r._$AS(o, e.values), r, n)), e;
}
class rr {
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
    const { el: { content: t }, parts: n } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? $e).importNode(t, !0);
    xe.currentNode = r;
    let i = xe.nextNode(), a = 0, s = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new at(i, i.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (d = new lr(i, this, e)), this._$AV.push(d), l = n[++s];
      }
      a !== (l == null ? void 0 : l.index) && (i = xe.nextNode(), a++);
    }
    return xe.currentNode = $e, r;
  }
  p(e) {
    let t = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++;
  }
}
class at {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, n, r) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = Ne(this, e, t), rt(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== ze && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : tr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && rt(this._$AH) ? this._$AA.nextSibling.data = e : this.T($e.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = it.createElement(un(n.h, n.h[0]), this.options)), n);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === r) this._$AH.p(t);
    else {
      const a = new rr(r, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Ro.get(e.strings);
    return t === void 0 && Ro.set(e.strings, t = new it(e)), t;
  }
  k(e) {
    bo(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, r = 0;
    for (const i of e) r === t.length ? t.push(n = new at(this.O(nt()), this.O(nt()), this, this.options)) : n = t[r], n._$AI(i), r++;
    r < t.length && (this._$AR(n && n._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = Oo(e).nextSibling;
      Oo(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class zt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, n, r, i) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = b;
  }
  _$AI(e, t = this, n, r) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) e = Ne(this, e, t, 0), a = !rt(e) || e !== this._$AH && e !== ze, a && (this._$AH = e);
    else {
      const s = e;
      let l, d;
      for (e = i[0], l = 0; l < i.length - 1; l++) d = Ne(this, s[n + l], t, l), d === ze && (d = this._$AH[l]), a || (a = !rt(d) || d !== this._$AH[l]), d === b ? e = b : e !== b && (e += (d ?? "") + i[l + 1]), this._$AH[l] = d;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ir extends zt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class ar extends zt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class sr extends zt {
  constructor(e, t, n, r, i) {
    super(e, t, n, r, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Ne(this, e, t, 0) ?? b) === ze) return;
    const n = this._$AH, r = e === b && n !== b || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== b && (n === b || r);
    r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class lr {
  constructor(e, t, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ne(this, e);
  }
}
const qt = Ze.litHtmlPolyfillSupport;
qt == null || qt(it, at), (Ze.litHtmlVersions ?? (Ze.litHtmlVersions = [])).push("3.3.3");
const dr = (o, e, t) => {
  const n = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = n._$litPart$;
  if (r === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null;
    n._$litPart$ = r = new at(e.insertBefore(nt(), i), i, void 0, t ?? {});
  }
  return r._$AI(o), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we = globalThis;
class Oe extends Ae {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = dr(t, this.renderRoot, this.renderOptions);
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
    return ze;
  }
}
var an;
Oe._$litElement$ = !0, Oe.finalized = !0, (an = we.litElementHydrateSupport) == null || an.call(we, { LitElement: Oe });
const Bt = we.litElementPolyfillSupport;
Bt == null || Bt({ LitElement: Oe });
(we.litElementVersions ?? (we.litElementVersions = [])).push("4.2.2");
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Ho(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function J(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ho(Object(t), !0).forEach(function(n) {
      cr(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : Ho(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function _t(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _t = function(e) {
    return typeof e;
  } : _t = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, _t(o);
}
function cr(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function ne() {
  return ne = Object.assign || function(o) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (o[n] = t[n]);
    }
    return o;
  }, ne.apply(this, arguments);
}
function pr(o, e) {
  if (o == null) return {};
  var t = {}, n = Object.keys(o), r, i;
  for (i = 0; i < n.length; i++)
    r = n[i], !(e.indexOf(r) >= 0) && (t[r] = o[r]);
  return t;
}
function hr(o, e) {
  if (o == null) return {};
  var t = pr(o, e), n, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      n = i[r], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(o, n) && (t[n] = o[n]);
  }
  return t;
}
var ur = "1.15.6";
function te(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var re = te(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), st = te(/Edge/i), Lo = te(/firefox/i), Je = te(/safari/i) && !te(/chrome/i) && !te(/android/i), mo = te(/iP(ad|od|hone)/i), fn = te(/chrome/i) && te(/android/i), gn = {
  capture: !1,
  passive: !1
};
function S(o, e, t) {
  o.addEventListener(e, t, !re && gn);
}
function $(o, e, t) {
  o.removeEventListener(e, t, !re && gn);
}
function St(o, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), o)
      try {
        if (o.matches)
          return o.matches(e);
        if (o.msMatchesSelector)
          return o.msMatchesSelector(e);
        if (o.webkitMatchesSelector)
          return o.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function bn(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function X(o, e, t, n) {
  if (o) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? o.parentNode === t && St(o, e) : St(o, e)) || n && o === t)
        return o;
      if (o === t) break;
    } while (o = bn(o));
  }
  return null;
}
var Fo = /\s+/g;
function B(o, e, t) {
  if (o && e)
    if (o.classList)
      o.classList[t ? "add" : "remove"](e);
    else {
      var n = (" " + o.className + " ").replace(Fo, " ").replace(" " + e + " ", " ");
      o.className = (n + (t ? " " + e : "")).replace(Fo, " ");
    }
}
function v(o, e, t) {
  var n = o && o.style;
  if (n) {
    if (t === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? t = document.defaultView.getComputedStyle(o, "") : o.currentStyle && (t = o.currentStyle), e === void 0 ? t : t[e];
    !(e in n) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), n[e] = t + (typeof t == "string" ? "" : "px");
  }
}
function Me(o, e) {
  var t = "";
  if (typeof o == "string")
    t = o;
  else
    do {
      var n = v(o, "transform");
      n && n !== "none" && (t = n + " " + t);
    } while (!e && (o = o.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(t);
}
function mn(o, e, t) {
  if (o) {
    var n = o.getElementsByTagName(e), r = 0, i = n.length;
    if (t)
      for (; r < i; r++)
        t(n[r], r);
    return n;
  }
  return [];
}
function Z() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function M(o, e, t, n, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, s, l, d, h, c;
    if (o !== window && o.parentNode && o !== Z() ? (i = o.getBoundingClientRect(), a = i.top, s = i.left, l = i.bottom, d = i.right, h = i.height, c = i.width) : (a = 0, s = 0, l = window.innerHeight, d = window.innerWidth, h = window.innerHeight, c = window.innerWidth), (e || t) && o !== window && (r = r || o.parentNode, !re))
      do
        if (r && r.getBoundingClientRect && (v(r, "transform") !== "none" || t && v(r, "position") !== "static")) {
          var f = r.getBoundingClientRect();
          a -= f.top + parseInt(v(r, "border-top-width")), s -= f.left + parseInt(v(r, "border-left-width")), l = a + i.height, d = s + i.width;
          break;
        }
      while (r = r.parentNode);
    if (n && o !== window) {
      var _ = Me(r || o), k = _ && _.a, u = _ && _.d;
      _ && (a /= u, s /= k, c /= k, h /= u, l = a + h, d = s + c);
    }
    return {
      top: a,
      left: s,
      bottom: l,
      right: d,
      width: c,
      height: h
    };
  }
}
function jo(o, e, t) {
  for (var n = ce(o, !0), r = M(o)[e]; n; ) {
    var i = M(n)[t], a = void 0;
    if (a = r >= i, !a) return n;
    if (n === Z()) break;
    n = ce(n, !1);
  }
  return !1;
}
function Ie(o, e, t, n) {
  for (var r = 0, i = 0, a = o.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== y.ghost && (n || a[i] !== y.dragged) && X(a[i], t.draggable, o, !1)) {
      if (r === e)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function _o(o, e) {
  for (var t = o.lastElementChild; t && (t === y.ghost || v(t, "display") === "none" || e && !St(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function W(o, e) {
  var t = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== y.clone && (!e || St(o, e)) && t++;
  return t;
}
function qo(o) {
  var e = 0, t = 0, n = Z();
  if (o)
    do {
      var r = Me(o), i = r.a, a = r.d;
      e += o.scrollLeft * i, t += o.scrollTop * a;
    } while (o !== n && (o = o.parentNode));
  return [e, t];
}
function fr(o, e) {
  for (var t in o)
    if (o.hasOwnProperty(t)) {
      for (var n in e)
        if (e.hasOwnProperty(n) && e[n] === o[t][n]) return Number(t);
    }
  return -1;
}
function ce(o, e) {
  if (!o || !o.getBoundingClientRect) return Z();
  var t = o, n = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var r = v(t);
      if (t.clientWidth < t.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return Z();
        if (n || e) return t;
        n = !0;
      }
    }
  while (t = t.parentNode);
  return Z();
}
function gr(o, e) {
  if (o && e)
    for (var t in e)
      e.hasOwnProperty(t) && (o[t] = e[t]);
  return o;
}
function Ut(o, e) {
  return Math.round(o.top) === Math.round(e.top) && Math.round(o.left) === Math.round(e.left) && Math.round(o.height) === Math.round(e.height) && Math.round(o.width) === Math.round(e.width);
}
var Qe;
function _n(o, e) {
  return function() {
    if (!Qe) {
      var t = arguments, n = this;
      t.length === 1 ? o.call(n, t[0]) : o.apply(n, t), Qe = setTimeout(function() {
        Qe = void 0;
      }, e);
    }
  };
}
function br() {
  clearTimeout(Qe), Qe = void 0;
}
function vn(o, e, t) {
  o.scrollLeft += e, o.scrollTop += t;
}
function yn(o) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(o).cloneNode(!0) : t ? t(o).clone(!0)[0] : o.cloneNode(!0);
}
function xn(o, e, t) {
  var n = {};
  return Array.from(o.children).forEach(function(r) {
    var i, a, s, l;
    if (!(!X(r, e.draggable, o, !1) || r.animated || r === t)) {
      var d = M(r);
      n.left = Math.min((i = n.left) !== null && i !== void 0 ? i : 1 / 0, d.left), n.top = Math.min((a = n.top) !== null && a !== void 0 ? a : 1 / 0, d.top), n.right = Math.max((s = n.right) !== null && s !== void 0 ? s : -1 / 0, d.right), n.bottom = Math.max((l = n.bottom) !== null && l !== void 0 ? l : -1 / 0, d.bottom);
    }
  }), n.width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n;
}
var j = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function mr() {
  var o = [], e;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var n = [].slice.call(this.el.children);
        n.forEach(function(r) {
          if (!(v(r, "display") === "none" || r === y.ghost)) {
            o.push({
              target: r,
              rect: M(r)
            });
            var i = J({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = Me(r, !0);
              a && (i.top -= a.f, i.left -= a.e);
            }
            r.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function(n) {
      o.push(n);
    },
    removeAnimationState: function(n) {
      o.splice(fr(o, {
        target: n
      }), 1);
    },
    animateAll: function(n) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof n == "function" && n();
        return;
      }
      var i = !1, a = 0;
      o.forEach(function(s) {
        var l = 0, d = s.target, h = d.fromRect, c = M(d), f = d.prevFromRect, _ = d.prevToRect, k = s.rect, u = Me(d, !0);
        u && (c.top -= u.f, c.left -= u.e), d.toRect = c, d.thisAnimationDuration && Ut(f, c) && !Ut(h, c) && // Make sure animatingRect is on line between toRect & fromRect
        (k.top - c.top) / (k.left - c.left) === (h.top - c.top) / (h.left - c.left) && (l = vr(k, f, _, r.options)), Ut(c, h) || (d.prevFromRect = h, d.prevToRect = c, l || (l = r.options.animation), r.animate(d, k, c, l)), l && (i = !0, a = Math.max(a, l), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, l), d.thisAnimationDuration = l);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof n == "function" && n();
      }, a) : typeof n == "function" && n(), o = [];
    },
    animate: function(n, r, i, a) {
      if (a) {
        v(n, "transition", ""), v(n, "transform", "");
        var s = Me(this.el), l = s && s.a, d = s && s.d, h = (r.left - i.left) / (l || 1), c = (r.top - i.top) / (d || 1);
        n.animatingX = !!h, n.animatingY = !!c, v(n, "transform", "translate3d(" + h + "px," + c + "px,0)"), this.forRepaintDummy = _r(n), v(n, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), v(n, "transform", "translate3d(0,0,0)"), typeof n.animated == "number" && clearTimeout(n.animated), n.animated = setTimeout(function() {
          v(n, "transition", ""), v(n, "transform", ""), n.animated = !1, n.animatingX = !1, n.animatingY = !1;
        }, a);
      }
    }
  };
}
function _r(o) {
  return o.offsetWidth;
}
function vr(o, e, t, n) {
  return Math.sqrt(Math.pow(e.top - o.top, 2) + Math.pow(e.left - o.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * n.animation;
}
var Ee = [], Wt = {
  initializeByDefault: !0
}, lt = {
  mount: function(e) {
    for (var t in Wt)
      Wt.hasOwnProperty(t) && !(t in e) && (e[t] = Wt[t]);
    Ee.forEach(function(n) {
      if (n.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Ee.push(e);
  },
  pluginEvent: function(e, t, n) {
    var r = this;
    this.eventCanceled = !1, n.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = e + "Global";
    Ee.forEach(function(a) {
      t[a.pluginName] && (t[a.pluginName][i] && t[a.pluginName][i](J({
        sortable: t
      }, n)), t.options[a.pluginName] && t[a.pluginName][e] && t[a.pluginName][e](J({
        sortable: t
      }, n)));
    });
  },
  initializePlugins: function(e, t, n, r) {
    Ee.forEach(function(s) {
      var l = s.pluginName;
      if (!(!e.options[l] && !s.initializeByDefault)) {
        var d = new s(e, t, e.options);
        d.sortable = e, d.options = e.options, e[l] = d, ne(n, d.defaults);
      }
    });
    for (var i in e.options)
      if (e.options.hasOwnProperty(i)) {
        var a = this.modifyOption(e, i, e.options[i]);
        typeof a < "u" && (e.options[i] = a);
      }
  },
  getEventProperties: function(e, t) {
    var n = {};
    return Ee.forEach(function(r) {
      typeof r.eventProperties == "function" && ne(n, r.eventProperties.call(t[r.pluginName], e));
    }), n;
  },
  modifyOption: function(e, t, n) {
    var r;
    return Ee.forEach(function(i) {
      e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], n));
    }), r;
  }
};
function yr(o) {
  var e = o.sortable, t = o.rootEl, n = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, s = o.fromEl, l = o.oldIndex, d = o.newIndex, h = o.oldDraggableIndex, c = o.newDraggableIndex, f = o.originalEvent, _ = o.putSortable, k = o.extraEventProperties;
  if (e = e || t && t[j], !!e) {
    var u, x = e.options, C = "on" + n.charAt(0).toUpperCase() + n.substr(1);
    window.CustomEvent && !re && !st ? u = new CustomEvent(n, {
      bubbles: !0,
      cancelable: !0
    }) : (u = document.createEvent("Event"), u.initEvent(n, !0, !0)), u.to = a || t, u.from = s || t, u.item = r || t, u.clone = i, u.oldIndex = l, u.newIndex = d, u.oldDraggableIndex = h, u.newDraggableIndex = c, u.originalEvent = f, u.pullMode = _ ? _.lastPutMode : void 0;
    var T = J(J({}, k), lt.getEventProperties(n, e));
    for (var z in T)
      u[z] = T[z];
    t && t.dispatchEvent(u), x[C] && x[C].call(e, u);
  }
}
var xr = ["evt"], F = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = hr(n, xr);
  lt.pluginEvent.bind(y)(e, t, J({
    dragEl: g,
    parentEl: A,
    ghostEl: w,
    rootEl: E,
    nextEl: ye,
    lastDownEl: vt,
    cloneEl: D,
    cloneHidden: de,
    dragStarted: Ye,
    putSortable: N,
    activeSortable: y.active,
    originalEvent: r,
    oldIndex: Te,
    oldDraggableIndex: et,
    newIndex: U,
    newDraggableIndex: se,
    hideGhostForTarget: Sn,
    unhideGhostForTarget: En,
    cloneNowHidden: function() {
      de = !0;
    },
    cloneNowShown: function() {
      de = !1;
    },
    dispatchSortableEvent: function(s) {
      H({
        sortable: t,
        name: s,
        originalEvent: r
      });
    }
  }, i));
};
function H(o) {
  yr(J({
    putSortable: N,
    cloneEl: D,
    targetEl: g,
    rootEl: E,
    oldIndex: Te,
    oldDraggableIndex: et,
    newIndex: U,
    newDraggableIndex: se
  }, o));
}
var g, A, w, E, ye, vt, D, de, Te, U, et, se, pt, N, Ce = !1, Et = !1, Dt = [], _e, Y, Yt, Xt, Bo, Uo, Ye, De, tt, ot = !1, ht = !1, yt, I, Gt = [], oo = !1, At = [], Nt = typeof document < "u", ut = mo, Wo = st || re ? "cssFloat" : "float", wr = Nt && !fn && !mo && "draggable" in document.createElement("div"), wn = (function() {
  if (Nt) {
    if (re)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
})(), kn = function(e, t) {
  var n = v(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = Ie(e, 0, t), a = Ie(e, 1, t), s = i && v(i), l = a && v(a), d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + M(i).width, h = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + M(a).width;
  if (n.display === "flex")
    return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (n.display === "grid")
    return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return i && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || d >= r && n[Wo] === "none" || a && n[Wo] === "none" && d + h > r) ? "vertical" : "horizontal";
}, kr = function(e, t, n) {
  var r = n ? e.left : e.top, i = n ? e.right : e.bottom, a = n ? e.width : e.height, s = n ? t.left : t.top, l = n ? t.right : t.bottom, d = n ? t.width : t.height;
  return r === s || i === l || r + a / 2 === s + d / 2;
}, $r = function(e, t) {
  var n;
  return Dt.some(function(r) {
    var i = r[j].options.emptyInsertThreshold;
    if (!(!i || _o(r))) {
      var a = M(r), s = e >= a.left - i && e <= a.right + i, l = t >= a.top - i && t <= a.bottom + i;
      if (s && l)
        return n = r;
    }
  }), n;
}, $n = function(e) {
  function t(i, a) {
    return function(s, l, d, h) {
      var c = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
      if (i == null && (a || c))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return t(i(s, l, d, h), a)(s, l, d, h);
      var f = (a ? s : l).options.group.name;
      return i === !0 || typeof i == "string" && i === f || i.join && i.indexOf(f) > -1;
    };
  }
  var n = {}, r = e.group;
  (!r || _t(r) != "object") && (r = {
    name: r
  }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, Sn = function() {
  !wn && w && v(w, "display", "none");
}, En = function() {
  !wn && w && v(w, "display", "");
};
Nt && !fn && document.addEventListener("click", function(o) {
  if (Et)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Et = !1, !1;
}, !0);
var ve = function(e) {
  if (g) {
    e = e.touches ? e.touches[0] : e;
    var t = $r(e.clientX, e.clientY);
    if (t) {
      var n = {};
      for (var r in e)
        e.hasOwnProperty(r) && (n[r] = e[r]);
      n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[j]._onDragOver(n);
    }
  }
}, Sr = function(e) {
  g && g.parentNode[j]._isOutsideThisEl(e.target);
};
function y(o, e) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = e = ne({}, e), o[j] = this;
  var t = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(o.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return kn(o, this.options);
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
    supportPointer: y.supportPointer !== !1 && "PointerEvent" in window && (!Je || mo),
    emptyInsertThreshold: 5
  };
  lt.initializePlugins(this, o, t);
  for (var n in t)
    !(n in e) && (e[n] = t[n]);
  $n(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : wr, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? S(o, "pointerdown", this._onTapStart) : (S(o, "mousedown", this._onTapStart), S(o, "touchstart", this._onTapStart)), this.nativeDraggable && (S(o, "dragover", this), S(o, "dragenter", this)), Dt.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ne(this, mr());
}
y.prototype = /** @lends Sortable.prototype */
{
  constructor: y,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (De = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, g) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, n = this.el, r = this.options, i = r.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, d = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, h = r.filter;
      if (Pr(n), !g && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Je && l && l.tagName.toUpperCase() === "SELECT") && (l = X(l, r.draggable, n, !1), !(l && l.animated) && vt !== l)) {
        if (Te = W(l), et = W(l, r.draggable), typeof h == "function") {
          if (h.call(this, e, l, this)) {
            H({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: l,
              toEl: n,
              fromEl: n
            }), F("filter", t, {
              evt: e
            }), i && e.preventDefault();
            return;
          }
        } else if (h && (h = h.split(",").some(function(c) {
          if (c = X(d, c.trim(), n, !1), c)
            return H({
              sortable: t,
              rootEl: c,
              name: "filter",
              targetEl: l,
              fromEl: n,
              toEl: n
            }), F("filter", t, {
              evt: e
            }), !0;
        }), h)) {
          i && e.preventDefault();
          return;
        }
        r.handle && !X(d, r.handle, n, !1) || this._prepareDragStart(e, s, l);
      }
    }
  },
  _prepareDragStart: function(e, t, n) {
    var r = this, i = r.el, a = r.options, s = i.ownerDocument, l;
    if (n && !g && n.parentNode === i) {
      var d = M(n);
      if (E = i, g = n, A = g.parentNode, ye = g.nextSibling, vt = n, pt = a.group, y.dragged = g, _e = {
        target: g,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, Bo = _e.clientX - d.left, Uo = _e.clientY - d.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, g.style["will-change"] = "all", l = function() {
        if (F("delayEnded", r, {
          evt: e
        }), y.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !Lo && r.nativeDraggable && (g.draggable = !0), r._triggerDragStart(e, t), H({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), B(g, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(h) {
        mn(g, h.trim(), Vt);
      }), S(s, "dragover", ve), S(s, "mousemove", ve), S(s, "touchmove", ve), a.supportPointer ? (S(s, "pointerup", r._onDrop), !this.nativeDraggable && S(s, "pointercancel", r._onDrop)) : (S(s, "mouseup", r._onDrop), S(s, "touchend", r._onDrop), S(s, "touchcancel", r._onDrop)), Lo && this.nativeDraggable && (this.options.touchStartThreshold = 4, g.draggable = !0), F("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(st || re))) {
        if (y.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (S(s, "pointerup", r._disableDelayedDrag), S(s, "pointercancel", r._disableDelayedDrag)) : (S(s, "mouseup", r._disableDelayedDrag), S(s, "touchend", r._disableDelayedDrag), S(s, "touchcancel", r._disableDelayedDrag)), S(s, "mousemove", r._delayedDragTouchMoveHandler), S(s, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && S(s, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(l, a.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    g && Vt(g), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
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
    if (Ce = !1, E && g) {
      F("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && S(document, "dragover", Sr);
      var n = this.options;
      !e && B(g, n.dragClass, !1), B(g, n.ghostClass, !0), y.active = this, e && this._appendGhost(), H({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Y) {
      this._lastX = Y.clientX, this._lastY = Y.clientY, Sn();
      for (var e = document.elementFromPoint(Y.clientX, Y.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(Y.clientX, Y.clientY), e !== t); )
        t = e;
      if (g.parentNode[j]._isOutsideThisEl(e), t)
        do {
          if (t[j]) {
            var n = void 0;
            if (n = t[j]._onDragOver({
              clientX: Y.clientX,
              clientY: Y.clientY,
              target: e,
              rootEl: t
            }), n && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = bn(t));
      En();
    }
  },
  _onTouchMove: function(e) {
    if (_e) {
      var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = w && Me(w, !0), s = w && a && a.a, l = w && a && a.d, d = ut && I && qo(I), h = (i.clientX - _e.clientX + r.x) / (s || 1) + (d ? d[0] - Gt[0] : 0) / (s || 1), c = (i.clientY - _e.clientY + r.y) / (l || 1) + (d ? d[1] - Gt[1] : 0) / (l || 1);
      if (!y.active && !Ce) {
        if (n && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < n)
          return;
        this._onDragStart(e, !0);
      }
      if (w) {
        a ? (a.e += h - (Yt || 0), a.f += c - (Xt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: h,
          f: c
        };
        var f = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        v(w, "webkitTransform", f), v(w, "mozTransform", f), v(w, "msTransform", f), v(w, "transform", f), Yt = h, Xt = c, Y = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!w) {
      var e = this.options.fallbackOnBody ? document.body : E, t = M(g, !0, ut, !0, e), n = this.options;
      if (ut) {
        for (I = e; v(I, "position") === "static" && v(I, "transform") === "none" && I !== document; )
          I = I.parentNode;
        I !== document.body && I !== document.documentElement ? (I === document && (I = Z()), t.top += I.scrollTop, t.left += I.scrollLeft) : I = Z(), Gt = qo(I);
      }
      w = g.cloneNode(!0), B(w, n.ghostClass, !1), B(w, n.fallbackClass, !0), B(w, n.dragClass, !0), v(w, "transition", ""), v(w, "transform", ""), v(w, "box-sizing", "border-box"), v(w, "margin", 0), v(w, "top", t.top), v(w, "left", t.left), v(w, "width", t.width), v(w, "height", t.height), v(w, "opacity", "0.8"), v(w, "position", ut ? "absolute" : "fixed"), v(w, "zIndex", "100000"), v(w, "pointerEvents", "none"), y.ghost = w, e.appendChild(w), v(w, "transform-origin", Bo / parseInt(w.style.width) * 100 + "% " + Uo / parseInt(w.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var n = this, r = e.dataTransfer, i = n.options;
    if (F("dragStart", this, {
      evt: e
    }), y.eventCanceled) {
      this._onDrop();
      return;
    }
    F("setupClone", this), y.eventCanceled || (D = yn(g), D.removeAttribute("id"), D.draggable = !1, D.style["will-change"] = "", this._hideClone(), B(D, this.options.chosenClass, !1), y.clone = D), n.cloneId = xt(function() {
      F("clone", n), !y.eventCanceled && (n.options.removeCloneOnHide || E.insertBefore(D, g), n._hideClone(), H({
        sortable: n,
        name: "clone"
      }));
    }), !t && B(g, i.dragClass, !0), t ? (Et = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : ($(document, "mouseup", n._onDrop), $(document, "touchend", n._onDrop), $(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, g)), S(document, "drop", n), v(g, "transform", "translateZ(0)")), Ce = !0, n._dragStartId = xt(n._dragStarted.bind(n, t, e)), S(document, "selectstart", n), Ye = !0, window.getSelection().removeAllRanges(), Je && v(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, n = e.target, r, i, a, s = this.options, l = s.group, d = y.active, h = pt === l, c = s.sort, f = N || d, _, k = this, u = !1;
    if (oo) return;
    function x(Ue, Bn) {
      F(Ue, k, J({
        evt: e,
        isOwner: h,
        axis: _ ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: c,
        fromSortable: f,
        target: n,
        completed: T,
        onMove: function(Eo, Un) {
          return ft(E, t, g, r, Eo, M(Eo), e, Un);
        },
        changed: z
      }, Bn));
    }
    function C() {
      x("dragOverAnimationCapture"), k.captureAnimationState(), k !== f && f.captureAnimationState();
    }
    function T(Ue) {
      return x("dragOverCompleted", {
        insertion: Ue
      }), Ue && (h ? d._hideClone() : d._showClone(k), k !== f && (B(g, N ? N.options.ghostClass : d.options.ghostClass, !1), B(g, s.ghostClass, !0)), N !== k && k !== y.active ? N = k : k === y.active && N && (N = null), f === k && (k._ignoreWhileAnimating = n), k.animateAll(function() {
        x("dragOverAnimationComplete"), k._ignoreWhileAnimating = null;
      }), k !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (n === g && !g.animated || n === t && !n.animated) && (De = null), !s.dragoverBubble && !e.rootEl && n !== document && (g.parentNode[j]._isOutsideThisEl(e.target), !Ue && ve(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), u = !0;
    }
    function z() {
      U = W(g), se = W(g, s.draggable), H({
        sortable: k,
        name: "change",
        toEl: t,
        newIndex: U,
        newDraggableIndex: se,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = X(n, s.draggable, t, !0), x("dragOver"), y.eventCanceled) return u;
    if (g.contains(e.target) || n.animated && n.animatingX && n.animatingY || k._ignoreWhileAnimating === n)
      return T(!1);
    if (Et = !1, d && !s.disabled && (h ? c || (a = A !== E) : N === this || (this.lastPutMode = pt.checkPull(this, d, g, e)) && l.checkPut(this, d, g, e))) {
      if (_ = this._getDirection(e, n) === "vertical", r = M(g), x("dragOverValid"), y.eventCanceled) return u;
      if (a)
        return A = E, C(), this._hideClone(), x("revert"), y.eventCanceled || (ye ? E.insertBefore(g, ye) : E.appendChild(g)), T(!0);
      var P = _o(t, s.draggable);
      if (!P || Cr(e, _, this) && !P.animated) {
        if (P === g)
          return T(!1);
        if (P && t === e.target && (n = P), n && (i = M(n)), ft(E, t, g, r, n, i, e, !!n) !== !1)
          return C(), P && P.nextSibling ? t.insertBefore(g, P.nextSibling) : t.appendChild(g), A = t, z(), T(!0);
      } else if (P && Ar(e, _, this)) {
        var L = Ie(t, 0, s, !0);
        if (L === g)
          return T(!1);
        if (n = L, i = M(n), ft(E, t, g, r, n, i, e, !1) !== !1)
          return C(), t.insertBefore(g, L), A = t, z(), T(!0);
      } else if (n.parentNode === t) {
        i = M(n);
        var V = 0, ge, Fe = g.parentNode !== t, q = !kr(g.animated && g.toRect || r, n.animated && n.toRect || i, _), je = _ ? "top" : "left", ie = jo(n, "top", "top") || jo(g, "top", "top"), qe = ie ? ie.scrollTop : void 0;
        De !== n && (ge = i[je], ot = !1, ht = !q && s.invertSwap || Fe), V = Tr(e, n, i, _, q ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, ht, De === n);
        var ee;
        if (V !== 0) {
          var be = W(g);
          do
            be -= V, ee = A.children[be];
          while (ee && (v(ee, "display") === "none" || ee === w));
        }
        if (V === 0 || ee === n)
          return T(!1);
        De = n, tt = V;
        var Be = n.nextElementSibling, ae = !1;
        ae = V === 1;
        var ct = ft(E, t, g, r, n, i, e, ae);
        if (ct !== !1)
          return (ct === 1 || ct === -1) && (ae = ct === 1), oo = !0, setTimeout(Dr, 30), C(), ae && !Be ? t.appendChild(g) : n.parentNode.insertBefore(g, ae ? Be : n), ie && vn(ie, 0, qe - ie.scrollTop), A = g.parentNode, ge !== void 0 && !ht && (yt = Math.abs(ge - M(n)[je])), z(), T(!0);
      }
      if (t.contains(g))
        return T(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    $(document, "mousemove", this._onTouchMove), $(document, "touchmove", this._onTouchMove), $(document, "pointermove", this._onTouchMove), $(document, "dragover", ve), $(document, "mousemove", ve), $(document, "touchmove", ve);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    $(e, "mouseup", this._onDrop), $(e, "touchend", this._onDrop), $(e, "pointerup", this._onDrop), $(e, "pointercancel", this._onDrop), $(e, "touchcancel", this._onDrop), $(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, n = this.options;
    if (U = W(g), se = W(g, n.draggable), F("drop", this, {
      evt: e
    }), A = g && g.parentNode, U = W(g), se = W(g, n.draggable), y.eventCanceled) {
      this._nulling();
      return;
    }
    Ce = !1, ht = !1, ot = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), no(this.cloneId), no(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Je && v(document.body, "user-select", ""), v(g, "transform", ""), e && (Ye && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), w && w.parentNode && w.parentNode.removeChild(w), (E === A || N && N.lastPutMode !== "clone") && D && D.parentNode && D.parentNode.removeChild(D), g && (this.nativeDraggable && $(g, "dragend", this), Vt(g), g.style["will-change"] = "", Ye && !Ce && B(g, N ? N.options.ghostClass : this.options.ghostClass, !1), B(g, this.options.chosenClass, !1), H({
      sortable: this,
      name: "unchoose",
      toEl: A,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), E !== A ? (U >= 0 && (H({
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
    })), N && N.save()) : U !== Te && U >= 0 && (H({
      sortable: this,
      name: "update",
      toEl: A,
      originalEvent: e
    }), H({
      sortable: this,
      name: "sort",
      toEl: A,
      originalEvent: e
    })), y.active && ((U == null || U === -1) && (U = Te, se = et), H({
      sortable: this,
      name: "end",
      toEl: A,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    F("nulling", this), E = g = A = w = ye = D = vt = de = _e = Y = Ye = U = se = Te = et = De = tt = N = pt = y.dragged = y.ghost = y.clone = y.active = null, At.forEach(function(e) {
      e.checked = !0;
    }), At.length = Yt = Xt = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        g && (this._onDragOver(e), Er(e));
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
    for (var e = [], t, n = this.el.children, r = 0, i = n.length, a = this.options; r < i; r++)
      t = n[r], X(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || Mr(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var n = {}, r = this.el;
    this.toArray().forEach(function(i, a) {
      var s = r.children[a];
      X(s, this.options.draggable, r, !1) && (n[i] = s);
    }, this), t && this.captureAnimationState(), e.forEach(function(i) {
      n[i] && (r.removeChild(n[i]), r.appendChild(n[i]));
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
    var n = this.options;
    if (t === void 0)
      return n[e];
    var r = lt.modifyOption(this, e, t);
    typeof r < "u" ? n[e] = r : n[e] = t, e === "group" && $n(n);
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
    if (!de) {
      if (F("hideClone", this), y.eventCanceled) return;
      v(D, "display", "none"), this.options.removeCloneOnHide && D.parentNode && D.parentNode.removeChild(D), de = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (de) {
      if (F("showClone", this), y.eventCanceled) return;
      g.parentNode == E && !this.options.group.revertClone ? E.insertBefore(D, g) : ye ? E.insertBefore(D, ye) : E.appendChild(D), this.options.group.revertClone && this.animate(g, D), v(D, "display", ""), de = !1;
    }
  }
};
function Er(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function ft(o, e, t, n, r, i, a, s) {
  var l, d = o[j], h = d.options.onMove, c;
  return window.CustomEvent && !re && !st ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = o, l.dragged = t, l.draggedRect = n, l.related = r || e, l.relatedRect = i || M(e), l.willInsertAfter = s, l.originalEvent = a, o.dispatchEvent(l), h && (c = h.call(d, l, a)), c;
}
function Vt(o) {
  o.draggable = !1;
}
function Dr() {
  oo = !1;
}
function Ar(o, e, t) {
  var n = M(Ie(t.el, 0, t.options, !0)), r = xn(t.el, t.options, w), i = 10;
  return e ? o.clientX < r.left - i || o.clientY < n.top && o.clientX < n.right : o.clientY < r.top - i || o.clientY < n.bottom && o.clientX < n.left;
}
function Cr(o, e, t) {
  var n = M(_o(t.el, t.options.draggable)), r = xn(t.el, t.options, w), i = 10;
  return e ? o.clientX > r.right + i || o.clientY > n.bottom && o.clientX > n.left : o.clientY > r.bottom + i || o.clientX > n.right && o.clientY > n.top;
}
function Tr(o, e, t, n, r, i, a, s) {
  var l = n ? o.clientY : o.clientX, d = n ? t.height : t.width, h = n ? t.top : t.left, c = n ? t.bottom : t.right, f = !1;
  if (!a) {
    if (s && yt < d * r) {
      if (!ot && (tt === 1 ? l > h + d * i / 2 : l < c - d * i / 2) && (ot = !0), ot)
        f = !0;
      else if (tt === 1 ? l < h + yt : l > c - yt)
        return -tt;
    } else if (l > h + d * (1 - r) / 2 && l < c - d * (1 - r) / 2)
      return Or(e);
  }
  return f = f || a, f && (l < h + d * i / 2 || l > c - d * i / 2) ? l > h + d / 2 ? 1 : -1 : 0;
}
function Or(o) {
  return W(g) < W(o) ? 1 : -1;
}
function Mr(o) {
  for (var e = o.tagName + o.className + o.src + o.href + o.textContent, t = e.length, n = 0; t--; )
    n += e.charCodeAt(t);
  return n.toString(36);
}
function Pr(o) {
  At.length = 0;
  for (var e = o.getElementsByTagName("input"), t = e.length; t--; ) {
    var n = e[t];
    n.checked && At.push(n);
  }
}
function xt(o) {
  return setTimeout(o, 0);
}
function no(o) {
  return clearTimeout(o);
}
Nt && S(document, "touchmove", function(o) {
  (y.active || Ce) && o.cancelable && o.preventDefault();
});
y.utils = {
  on: S,
  off: $,
  css: v,
  find: mn,
  is: function(e, t) {
    return !!X(e, t, e, !1);
  },
  extend: gr,
  throttle: _n,
  closest: X,
  toggleClass: B,
  clone: yn,
  index: W,
  nextTick: xt,
  cancelNextTick: no,
  detectDirection: kn,
  getChild: Ie,
  expando: j
};
y.get = function(o) {
  return o[j];
};
y.mount = function() {
  for (var o = arguments.length, e = new Array(o), t = 0; t < o; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(n) {
    if (!n.prototype || !n.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(n));
    n.utils && (y.utils = J(J({}, y.utils), n.utils)), lt.mount(n);
  });
};
y.create = function(o, e) {
  return new y(o, e);
};
y.version = ur;
var O = [], Xe, ro, io = !1, Kt, Zt, Ct, Ge;
function zr() {
  function o() {
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
  return o.prototype = {
    dragStarted: function(t) {
      var n = t.originalEvent;
      this.sortable.nativeDraggable ? S(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? S(document, "pointermove", this._handleFallbackAutoScroll) : n.touches ? S(document, "touchmove", this._handleFallbackAutoScroll) : S(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var n = t.originalEvent;
      !this.options.dragOverBubble && !n.rootEl && this._handleAutoScroll(n);
    },
    drop: function() {
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), Yo(), wt(), br();
    },
    nulling: function() {
      Ct = ro = Xe = io = Ge = Kt = Zt = null, O.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, n) {
      var r = this, i = (t.touches ? t.touches[0] : t).clientX, a = (t.touches ? t.touches[0] : t).clientY, s = document.elementFromPoint(i, a);
      if (Ct = t, n || this.options.forceAutoScrollFallback || st || re || Je) {
        Jt(t, this.options, s, n);
        var l = ce(s, !0);
        io && (!Ge || i !== Kt || a !== Zt) && (Ge && Yo(), Ge = setInterval(function() {
          var d = ce(document.elementFromPoint(i, a), !0);
          d !== l && (l = d, wt()), Jt(t, r.options, d, n);
        }, 10), Kt = i, Zt = a);
      } else {
        if (!this.options.bubbleScroll || ce(s, !0) === Z()) {
          wt();
          return;
        }
        Jt(t, this.options, ce(s, !1), !1);
      }
    }
  }, ne(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function wt() {
  O.forEach(function(o) {
    clearInterval(o.pid);
  }), O = [];
}
function Yo() {
  clearInterval(Ge);
}
var Jt = _n(function(o, e, t, n) {
  if (e.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = Z(), d = !1, h;
    ro !== t && (ro = t, wt(), Xe = e.scroll, h = e.scrollFn, Xe === !0 && (Xe = ce(t, !0)));
    var c = 0, f = Xe;
    do {
      var _ = f, k = M(_), u = k.top, x = k.bottom, C = k.left, T = k.right, z = k.width, P = k.height, L = void 0, V = void 0, ge = _.scrollWidth, Fe = _.scrollHeight, q = v(_), je = _.scrollLeft, ie = _.scrollTop;
      _ === l ? (L = z < ge && (q.overflowX === "auto" || q.overflowX === "scroll" || q.overflowX === "visible"), V = P < Fe && (q.overflowY === "auto" || q.overflowY === "scroll" || q.overflowY === "visible")) : (L = z < ge && (q.overflowX === "auto" || q.overflowX === "scroll"), V = P < Fe && (q.overflowY === "auto" || q.overflowY === "scroll"));
      var qe = L && (Math.abs(T - r) <= a && je + z < ge) - (Math.abs(C - r) <= a && !!je), ee = V && (Math.abs(x - i) <= a && ie + P < Fe) - (Math.abs(u - i) <= a && !!ie);
      if (!O[c])
        for (var be = 0; be <= c; be++)
          O[be] || (O[be] = {});
      (O[c].vx != qe || O[c].vy != ee || O[c].el !== _) && (O[c].el = _, O[c].vx = qe, O[c].vy = ee, clearInterval(O[c].pid), (qe != 0 || ee != 0) && (d = !0, O[c].pid = setInterval((function() {
        n && this.layer === 0 && y.active._onTouchMove(Ct);
        var Be = O[this.layer].vy ? O[this.layer].vy * s : 0, ae = O[this.layer].vx ? O[this.layer].vx * s : 0;
        typeof h == "function" && h.call(y.dragged.parentNode[j], ae, Be, o, Ct, O[this.layer].el) !== "continue" || vn(O[this.layer].el, ae, Be);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && f !== l && (f = ce(f, !1)));
    io = d;
  }
}, 30), Dn = function(e) {
  var t = e.originalEvent, n = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, s = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var d = n || i;
    s();
    var h = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, c = document.elementFromPoint(h.clientX, h.clientY);
    l(), d && !d.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: n
    }));
  }
};
function vo() {
}
vo.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable;
    this.sortable.captureAnimationState(), n && n.captureAnimationState();
    var r = Ie(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
  },
  drop: Dn
};
ne(vo, {
  pluginName: "revertOnSpill"
});
function yo() {
}
yo.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable, r = n || this.sortable;
    r.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), r.animateAll();
  },
  drop: Dn
};
ne(yo, {
  pluginName: "removeOnSpill"
});
y.mount(new zr());
y.mount(yo, vo);
const G = "household_kanban";
function An(o, e) {
  return o.connection.subscribeMessage((t) => e(t.board), { type: `${G}/subscribe` });
}
function gt(o, e, t) {
  return o.callService(G, "set_status", { uid: e, status: t });
}
function Nr(o, e) {
  return o.connection.sendMessagePromise({ type: `${G}/history`, ...e });
}
function Ir(o, e) {
  return o.callService(G, "create_item", { ...e });
}
function bt(o, e, t) {
  return o.callService(G, "update_item", { uid: e, ...t });
}
function Rr(o, e) {
  return o.callService(G, "delete_item", { uid: e });
}
function Hr(o, e) {
  return o.connection.sendMessagePromise({ type: "lovelace/config", url_path: e });
}
function Lr(o, e, t) {
  return o.connection.sendMessagePromise({ type: "lovelace/config/save", url_path: e, config: t });
}
function Fr(o) {
  return o.connection.sendMessagePromise({ type: `${G}/settings` });
}
function jr(o, e) {
  return o.connection.sendMessagePromise({ type: `${G}/settings/update`, ...e });
}
function qr(o, e) {
  return o.connection.sendMessagePromise({ type: `${G}/parents/add`, ...e });
}
function Br(o, e, t) {
  return o.connection.sendMessagePromise({ type: `${G}/parents/update`, parent_id: e, ...t });
}
function Ur(o, e, t) {
  return o.connection.sendMessagePromise({ type: `${G}/parents/remove`, parent_id: e, target: t });
}
const Wr = 864e5;
function R(o) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate());
}
const pe = (o) => String(o).padStart(2, "0");
function oe(o) {
  return `${o.getFullYear()}-${pe(o.getMonth() + 1)}-${pe(o.getDate())}`;
}
function Yr(o, e) {
  if (!o) return null;
  if (!e) return o;
  const [t, n, r] = o.split("-").map(Number), [i, a] = e.split(":").map(Number), s = -new Date(t, n - 1, r, i, a).getTimezoneOffset(), l = Math.abs(s);
  return `${o}T${pe(i)}:${pe(a)}:00${s < 0 ? "-" : "+"}${pe(Math.floor(l / 60))}:${pe(l % 60)}`;
}
function Xr(o) {
  if (!o) return "";
  const { date: e, hasTime: t } = Q(o);
  return t ? `${pe(e.getHours())}:${pe(e.getMinutes())}` : "";
}
function K(o, e) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate() + e);
}
function xo(o, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(o.getFullYear(), o.getMonth(), o.getDate())) / Wr);
}
function Q(o) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(o)) {
    const [e, t, n] = o.split("-").map(Number);
    return { date: new Date(e, t - 1, n), hasTime: !1 };
  }
  return { date: new Date(o), hasTime: !0 };
}
function Gr(o, e) {
  const t = R(o), n = (t.getDay() - e + 7) % 7, r = K(t, -n);
  return n === 6 ? { start: K(r, 7), end: K(r, 13) } : { start: r, end: K(r, 6) };
}
const Vr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function Xo(o) {
  var n, r;
  const e = o == null ? void 0 : o.first_weekday, t = Vr.indexOf(e ?? "");
  if (t >= 0) return t;
  try {
    const i = new Intl.Locale((o == null ? void 0 : o.language) ?? "en"), a = (r = ((n = i.getWeekInfo) == null ? void 0 : n.call(i)) ?? i.weekInfo) == null ? void 0 : r.firstDay;
    if (a) return a % 7;
  } catch {
  }
  return 1;
}
function ke(o, e) {
  const t = R(e.now);
  if (o.status === "completed")
    return !o.completed_at || !e.enabled.has("done") ? null : xo(new Date(o.completed_at), t) < e.doneDays ? "done" : null;
  if (!o.due) return "todo";
  const n = R(Q(o.due).date), r = (...i) => i.find((a) => e.enabled.has(a)) ?? "todo";
  return n < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : r("today", "week") : +n == +t ? r("today", "week") : n <= e.week.end ? r("week") : r("later");
}
const Kr = 8;
function Go(o, e, t) {
  return Math.hypot(o, e) >= Kr;
}
function Zr(o, e, t) {
  const n = o.status === "completed" ? { status: "needs_action" } : {};
  if (typeof e == "number")
    return o.status === "needs_action" && o.priority === e ? null : { ...n, ...o.priority === e ? {} : { priority: e } };
  if (e === "overdue" || ke(o, t) === e) return null;
  if (e === "done") return { status: "completed" };
  if (e === "todo") return { ...n, due: null };
  if (e === "week") return { ...n, due: oe(t.week.end) };
  if (e === "later") return { ...n, due: oe(K(t.week.end, 1)) };
  const r = R(t.now);
  return o.due && +R(Q(o.due).date) == +r ? Object.keys(n).length ? n : null : { ...n, due: oe(r) };
}
function Cn(o) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(o, 10));
}
function Jr(o) {
  const e = `custom:${o}`, t = (n) => {
    var r;
    for (const i of n.querySelectorAll("*")) {
      if (i.localName === "hui-error-card") {
        const a = i, s = a.config ?? a._config;
        ((s == null ? void 0 : s.type) === e || ((r = s == null ? void 0 : s.origConfig) == null ? void 0 : r.type) === e) && i.dispatchEvent(new Event("ll-rebuild", { bubbles: !0, composed: !0 }));
      }
      i.shadowRoot && t(i.shadowRoot);
    }
  };
  t(document);
}
const ao = [];
function Qr() {
  try {
    const o = Object.getOwnPropertyDescriptor(window, "customElements");
    if (o && !o.configurable) return;
    let e = window.customElements;
    Object.defineProperty(window, "customElements", {
      configurable: !0,
      enumerable: (o == null ? void 0 : o.enumerable) ?? !0,
      get: () => e,
      set: (t) => {
        e = t;
        for (const n of ao) n(t);
      }
    });
  } catch {
  }
}
function Tn(o, e) {
  let t = !1, n = !1;
  const r = (s = window.customElements) => {
    try {
      if (s.get(o)) return;
      s.define(o, e), t && Jr(o);
    } catch (l) {
      n || (n = !0, console.warn("household_kanban: could not register the card", l));
    }
  };
  r(), t = !0, ao.length || Qr(), ao.push(r), document.addEventListener("DOMContentLoaded", () => r()), window.addEventListener("load", () => r());
  const i = Date.now(), a = () => {
    r();
    const s = Date.now() - i;
    s < 2e4 && window.setTimeout(a, s < 3e3 ? 40 : 250);
  };
  window.setTimeout(a, 40);
}
const Vo = ["todo", "later", "week", "today", "overdue", "done"], ei = ["todo", "week", "today", "done"], wo = [1, 3, 7, 30], ko = ["cs", "en"], On = { cs: "Čeština", en: "English" };
function Pe(o) {
  const e = o.columns ?? ei, t = e.filter((i) => !Vo.includes(i));
  if (t.length) throw new Error(`Unknown column id: ${t.join(", ")}`);
  const n = new Set(e).add("todo"), r = {
    type: o.type,
    columns: Vo.filter((i) => n.has(i)),
    done_days: wo.find((i) => i === o.done_days) ?? 7,
    group: o.group === "priority" ? "priority" : "date"
  };
  return o.parents && (r.parents = o.parents), o.people && (r.people = o.people), ko.includes(o.language) && (r.language = o.language), r;
}
function so(o, e, t, n) {
  const r = new Set(o ?? e);
  return n ? r.add(t) : r.delete(t), r.size === 0 || r.size === e.length ? void 0 : e.filter((i) => r.has(i));
}
function Mn(o, e) {
  const t = { ...o, ...e };
  for (const n of ["parents", "people", "language"]) n in e || delete t[n];
  return t;
}
function Pn(o, e) {
  var t;
  return (e == null ? void 0 : e.language) ?? ((t = o.locale) == null ? void 0 : t.language) ?? o.language ?? "en";
}
function ti(o) {
  const e = o.split("/").find(Boolean);
  return !e || e === "lovelace" ? null : e;
}
function zn(o, e) {
  if (o === e) return !0;
  if (!o || !e || typeof o != "object" || typeof e != "object" || Array.isArray(o) !== Array.isArray(e)) return !1;
  const t = o, n = e, r = Object.keys(t);
  return r.length === Object.keys(n).length && r.every((i) => Object.hasOwn(n, i) && zn(t[i], n[i]));
}
function oi(o, e, t) {
  let n = 0;
  const r = (a) => zn(a, e) ? (n++, t) : Array.isArray(a) ? a.map(r) : a && typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, l]) => [s, r(l)])) : a, i = r(o);
  return { config: n === 1 ? i : o, matches: n };
}
const Nn = {
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
}, ni = {
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
}, ri = { en: Nn, cs: ni };
function m(o, e, t = {}) {
  return (ri[(o ?? "en").split("-")[0]] ?? Nn)[e].replace(/\{(\w+)\}/g, (r, i) => String(t[i] ?? ""));
}
const Ko = {
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
function he(o, e, t) {
  const n = (o ?? "en").split("-")[0], r = n in Ko ? n : "en", i = Ko[r][e];
  return (i[new Intl.PluralRules(r).select(t)] ?? i.other).replace("{n}", String(t));
}
const ii = ["todo", "later", "week", "today", "done"], Mt = class Mt extends Oe {
  constructor() {
    super(...arguments), this._parents = [], this._raw = {}, this._attempts = 0, this._subbing = !1;
  }
  setConfig(e) {
    this._raw = { ...e };
    try {
      this._config = Pe(e);
    } catch {
      this._config = Pe({ type: e.type });
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
    this._unsub || this._subbing || this._retry !== void 0 || !this.hass || !this.isConnected || (this._subbing = !0, An(this.hass, (e) => {
      this._parents = e.parents;
    }).then((e) => {
      this._attempts = 0, this.isConnected ? this._unsub = e : e();
    }).catch((e) => {
      console.warn("household_kanban: editor subscribe failed", e), this.isConnected && (this._retry = window.setTimeout(() => {
        this._retry = void 0, this._sub();
      }, Cn(this._attempts++)));
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
    for (const r of ["parents", "people"]) t[r] === void 0 && delete t[r];
    this._config = Pe(t);
    const n = Mn(this._raw, this._config);
    this._raw = n, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: n }, bubbles: !0, composed: !0 }));
  }
  _checks(e, t) {
    var i;
    const n = t.map((a) => a.id), r = (i = this._config) == null ? void 0 : i[e];
    return t.map((a) => p`<label class="row">
      <input type="checkbox" .checked=${!r || r.includes(a.id)}
        @change=${(s) => {
      var l;
      return this._set({ [e]: so((l = this._config) == null ? void 0 : l[e], n, a.id, s.target.checked) });
    }} />
      <span>${a.name}</span>
    </label>`);
  }
  render() {
    var a;
    const e = this._config, t = this.hass;
    if (!e || !t) return b;
    const n = Pn(t, e), r = (s) => m(n, s), i = Object.entries(t.states).filter(([s]) => s.startsWith("person.")).map(([s, l]) => ({ id: s, name: String(l.attributes.friendly_name ?? s) }));
    return p`
      <h3>${r("ed_columns")}</h3>
      ${ii.map((s) => {
      var l;
      return p`<label class="row">
        <input type="checkbox" role="switch" .checked=${((l = e.columns) == null ? void 0 : l.includes(s)) ?? !1} ?disabled=${s === "todo"}
          @change=${(d) => {
        const h = d.target.checked;
        this._set({ columns: (e.columns ?? []).filter((c) => c !== s).concat(h ? [s] : []) });
      }} />
        <span>${r(`col_${s}`)}</span>
      </label>`;
    })}
      ${(a = e.columns) != null && a.includes("done") ? p`
        <div class="row"><span class="grow">${r("ed_done_days")}</span>
          <div class="seg" role="radiogroup" aria-label=${r("ed_done_days")}>
            ${wo.map((s) => p`<button type="button" role="radio" aria-checked=${e.done_days === s}
              @click=${() => this._set({ done_days: s })}>${s}</button>`)}
          </div>
        </div>` : b}
      <h3>${r("group_label")}</h3>
      <select aria-label=${r("group_label")} @change=${(s) => this._set({ group: s.target.value })}>
        <option value="date" ?selected=${e.group === "date"}>${r("group_date")}</option>
        <option value="priority" ?selected=${e.group === "priority"}>${r("group_priority")}</option>
      </select>
      <h3>${r("language")}</h3>
      <select aria-label=${r("language")} @change=${(s) => this._set({ language: s.target.value || void 0 })}>
        <option value="" ?selected=${!e.language}>${r("lang_ha")}</option>
        ${ko.map((s) => p`<option value=${s} ?selected=${e.language === s}>${On[s]}</option>`)}
      </select>
      <h3>${r("filter_parents")}</h3>
      ${this._checks("parents", this._parents)}
      <h3>${r("filter_people")}</h3>
      ${this._checks("people", i)}`;
  }
};
Mt.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _parents: { state: !0 }
}, Mt.styles = ln`
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
let lo = Mt;
Tn("household-kanban-card-editor", lo);
const ai = ln`
  :host {
    --kb-card: var(--bento-card, var(--card-background-color, #fff));
    --kb-fill: var(--bento-fill, var(--secondary-background-color, #f0f2f5));
    --kb-border: var(--bento-border, var(--divider-color, #dfe3e8));
    --kb-accent: var(--bento-accent, var(--primary-color, #4f6b8c));
    --kb-warm: var(--bento-warm, var(--kb-fill));
    --kb-warm-text: var(--bento-warm-text, var(--kb-accent));
    --kb-text: var(--bento-text, var(--primary-text-color, #1c2128));
    --kb-text-2: var(--bento-text-2, var(--secondary-text-color, #646c77));
    /* --bento-shadow is Bento's shadow strength (a number), not a box-shadow */
    --kb-shadow: var(--bento-card-shadow, var(--ha-card-box-shadow, 0 1px 2px rgba(0, 0, 0, 0.08)));
    /* design v7: a column is a shade off the ground (darker in light, lighter in dark) with a border */
    --kb-col: color-mix(in srgb, var(--bento-ground, var(--primary-background-color, #eceef1)) 96%, var(--kb-text));
    --kb-raised: var(--bento-raised, var(--kb-card));
    --kb-raised-shadow: var(--bento-raised-shadow, 0 1px 2px rgba(0, 0, 0, 0.1));
    /* wells (Bento "Inner tiles"), raised controls and the active look follow the theme like heating does */
    --kb-inset: var(--bento-idle-shadow, inset 0 1px 3px rgba(0, 0, 0, 0.08));
    --kb-well: var(--bento-idle-bg, var(--kb-fill));
    --kb-well-border: var(--bento-idle-border, 0 solid transparent);
    --kb-well-blur: var(--bento-idle-blur, none);
    --kb-raised-border: var(--bento-raised-border, 1px solid var(--kb-border));
    --kb-on: var(--bento-chip-on, var(--kb-warm));
    --kb-on-border: var(--bento-chip-on-border, color-mix(in srgb, var(--kb-accent) 45%, transparent));
    --kb-on-color: var(--bento-chip-on-color, var(--kb-warm-text));
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
  .seg { display: flex; gap: 4px; padding: 4px; border-radius: 999px; background: var(--kb-well); border: var(--kb-well-border); box-shadow: var(--kb-inset); backdrop-filter: var(--kb-well-blur); }
  .seg button { height: 32px; padding: 0 14px; border-radius: 999px; border: 1px solid transparent; background: transparent; color: var(--kb-text-2); font-size: 13px; font-weight: 600; }
  .seg button[aria-pressed="true"] { border: var(--kb-raised-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); }

  .filters { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; }
  .people, .parents { display: flex; gap: 6px; }
  .parents { flex-wrap: wrap; }
  /* scrolls sideways; the padding keeps the chips' shadows from being clipped to a rectangle */
  .people { overflow-x: auto; scrollbar-width: none; padding: 6px 10px 22px; margin: -6px -10px -22px; }
  .person { display: flex; align-items: center; gap: 8px; flex: none; padding: 3px 12px 3px 3px; border-radius: 999px; border: 0; background: transparent; font-size: 13px; font-weight: 600; color: var(--kb-text-2); }
  .person[aria-pressed="true"] { background: var(--kb-on); color: var(--kb-on-color); }
  .people.has-filter .person[aria-pressed="false"] { opacity: 0.45; }
  .all-ava { background: var(--kb-raised); color: var(--kb-text-2); box-shadow: var(--kb-raised-shadow); border: var(--kb-raised-border); }
  .chip { display: inline-flex; align-items: center; gap: 8px; flex: none; height: 36px; padding: 0 14px 0 4px; border-radius: 999px; font-size: 13px; font-weight: 600; background: var(--kb-raised); color: var(--kb-text-2); border: 1px solid var(--kb-border); box-shadow: var(--kb-raised-shadow); }
  .chip[aria-pressed="true"] { background: var(--kb-on); color: var(--kb-on-color); border-color: var(--kb-on-border); box-shadow: none; }
  .chip b { color: var(--kb-text); }
  .dot { width: 28px; height: 28px; flex: none; border-radius: 50%; display: grid; place-items: center; background: rgba(var(--pc, var(--c-grey)), 0.16); color: rgb(var(--pc, var(--c-grey))); --mdc-icon-size: 16px; }
  .dot.sm { width: 22px; height: 22px; --mdc-icon-size: 13px; }
  .ava { width: 24px; height: 24px; flex: none; border-radius: 50%; display: grid; place-items: center; color: #fff; font-size: 10px; font-weight: 700; object-fit: cover; box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.35); }
  .ava.lg { width: 34px; height: 34px; font-size: 13px; }
  .ava.xs { width: 20px; height: 20px; font-size: 9px; }
  .ava.none { background: transparent; border: 1.5px dashed var(--kb-border); color: var(--kb-text-2); box-shadow: none; }

  .board { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(260px, 1fr); gap: 12px; overflow-x: auto; align-items: start; scroll-snap-type: x proximity; scrollbar-width: none; }
  .col { display: flex; flex-direction: column; gap: 10px; padding: 10px; border-radius: 20px; background: var(--kb-col); border: 1px solid var(--kb-border); min-width: 0; scroll-snap-align: start; }
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
  .cl-box-list { display: flex; flex-direction: column; padding: 4px; border-radius: 16px; background: var(--kb-well); border: var(--kb-well-border); box-shadow: var(--kb-inset); backdrop-filter: var(--kb-well-blur); }
  .cl-item { display: flex; align-items: center; gap: 12px; padding: 6px 6px 6px 10px; border-radius: 12px; }
  .cl-item.first-done { border-top: 1px dashed var(--kb-border); margin-top: 4px; padding-top: 10px; }
  .cl-check { width: 22px; height: 22px; border-radius: 7px; }
  .cl-text { flex: 1; min-width: 0; font-size: 15px; font-weight: 500; overflow-wrap: anywhere; }
  .cl-x { width: 28px; height: 28px; flex: none; border-radius: 50%; border: 0; background: transparent; color: var(--kb-text-2); display: grid; place-items: center; padding: 0; opacity: 0.7; }
  .cl-add { display: flex; align-items: center; gap: 12px; padding: 8px 10px; border-top: 1px solid var(--kb-border); margin-top: 4px; color: var(--kb-accent); font-size: 18px; font-weight: 600; }
  .cl-add input { flex: 1; min-width: 0; border: 0; background: transparent; padding: 4px 0; font-size: 15px; font-weight: 400; color: var(--kb-text); }
  .link { border: 0; background: transparent; padding: 4px 6px; text-align: left; font-size: 13px; font-weight: 600; color: var(--kb-warm-text); display: flex; align-items: center; gap: 4px; }
  .link.muted { color: var(--kb-text-2); }
  .notice .retry-eod { margin-left: 8px; }
  .notice { padding: 8px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; background: rgba(var(--c-red), 0.14); color: rgb(var(--c-red)); }
  .loading { padding: 24px; text-align: center; color: var(--kb-text-2); }

  .card[data-uid] { cursor: pointer; touch-action: manipulation; }
  .col-head .add { margin-left: auto; width: 28px; height: 28px; border-radius: 50%; border: var(--kb-raised-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text-2); font-size: 18px; line-height: 1; padding: 0; }
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
  .dlg textarea { resize: none; border-radius: 14px; background: var(--kb-well); border: var(--kb-well-border); box-shadow: var(--kb-inset); backdrop-filter: var(--kb-well-blur); padding: 10px 12px; font-size: 14px; line-height: 1.4; width: 100%; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
  .dlg-chip { padding-left: 6px; }
  .dlg-chip[aria-checked="true"] { background: var(--kb-on); color: var(--kb-on-color); border-color: var(--kb-on-border); box-shadow: none; }
  .seg3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; padding: 4px; border-radius: 16px; background: var(--kb-well); border: var(--kb-well-border); box-shadow: var(--kb-inset); backdrop-filter: var(--kb-well-blur); }
  .seg3 button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 36px; border-radius: 12px; border: 1px solid transparent; background: transparent; color: var(--kb-text-2); font-size: 13px; font-weight: 600; }
  .seg3 button[aria-checked="true"] { border: var(--kb-raised-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); }
  .seg3 .prio-1[aria-checked="true"] { color: rgb(var(--c-red)); } .seg3 .prio-2[aria-checked="true"] { color: rgb(var(--c-orange)); }
  .pill-btn { height: 36px; padding: 0 14px; border-radius: 999px; border: var(--kb-raised-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); font-size: 13px; font-weight: 600; }
  .pill-btn.on, .pill-btn[aria-pressed="true"] { background: var(--kb-on); color: var(--kb-on-color); border-color: var(--kb-on-border); box-shadow: none; }
  .pill-input { display: inline-flex; align-items: center; height: 36px; padding: 0 12px; border-radius: 999px; background: var(--kb-well); border: var(--kb-well-border); box-shadow: var(--kb-inset); backdrop-filter: var(--kb-well-blur); }
  .pill-input input { border: 0; background: transparent; font-size: 13px; font-weight: 600; color-scheme: light dark; }
  .round-btn { width: 36px; height: 36px; border-radius: 50%; border: var(--kb-raised-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text-2); display: grid; place-items: center; padding: 0; }
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
  .hist-search { display: flex; align-items: center; height: 42px; padding: 0 14px; border-radius: 14px; background: var(--kb-well); border: var(--kb-well-border); box-shadow: var(--kb-inset); backdrop-filter: var(--kb-well-blur); }
  .hist-search input { flex: 1; min-width: 0; border: 0; background: transparent; outline: none; font: inherit; font-size: 14px; color: var(--kb-text); }
  .hist-chip { display: inline-flex; align-items: center; gap: 6px; padding-left: 6px; }
  .hist-list { display: flex; flex-direction: column; gap: 14px; }
  .hist-group { display: flex; flex-direction: column; gap: 6px; }
  .hist-group h3 { margin: 0; padding: 0 4px; }
  .hist-rows { list-style: none; margin: 0; padding: 4px; border-radius: 16px; background: var(--kb-well); border: var(--kb-well-border); box-shadow: var(--kb-inset); backdrop-filter: var(--kb-well-blur); display: flex; flex-direction: column; }
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
  .set-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; padding: 4px; border-radius: 999px; background: var(--kb-well); border: var(--kb-well-border); box-shadow: var(--kb-inset); backdrop-filter: var(--kb-well-blur); }
  .set-tabs button { height: 34px; padding: 0 6px; border-radius: 999px; border: 1px solid transparent; background: transparent; color: var(--kb-text-2); font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .set-tabs button[aria-selected="true"] { border: var(--kb-raised-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); }
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
  .set-rows { display: flex; flex-direction: column; padding: 4px; border-radius: 16px; background: var(--kb-well); border: var(--kb-well-border); box-shadow: var(--kb-inset); backdrop-filter: var(--kb-well-blur); }
  .set-row { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 12px; }
  .set-text { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0; }
  .set-name { font-size: 14px; font-weight: 600; }
  .set-hint { font-size: 12px; color: var(--kb-text-2); }
  .set-hint.pad { padding: 0 4px; margin: 0; }
  .mono { font-family: ui-monospace, "SF Mono", Menlo, monospace; overflow-wrap: anywhere; }
  .set-line { display: flex; align-items: center; gap: 12px; padding: 4px 4px 0; font-size: 13px; font-weight: 600; color: var(--kb-text-2); }
  .set-line .seg button { height: 30px; padding: 0 12px; white-space: nowrap; }
  .kb-settings.narrow .set-line .seg button { padding: 0 8px; }
  .seg button[aria-checked="true"] { border: var(--kb-raised-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); color: var(--kb-text); }
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
  .sort-key { display: inline-flex; color: var(--kb-text); align-items: center; gap: 8px; height: 36px; padding: 0 14px 0 5px; border-radius: 999px; border: var(--kb-raised-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); font-size: 13px; font-weight: 600; }
  .sort-n { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: var(--kb-warm); color: var(--kb-warm-text); font-size: 12px; font-weight: 700; }
  .person-chip { display: inline-flex; align-items: center; gap: 8px; padding-left: 4px; }
  .kb-settings .dlg-foot { justify-content: flex-end; }
  .eod-opts { display: flex; flex-direction: column; gap: 8px; }
  .eod-opt, .check-row { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; color: var(--kb-text); }
  .eod-opt { padding: 12px 14px; border-radius: 16px; border: var(--kb-raised-border); background: var(--kb-raised); box-shadow: var(--kb-raised-shadow); }
  .eod-opt[aria-checked="true"] { background: var(--kb-on); color: var(--kb-on-color); border-color: var(--kb-on-border); box-shadow: none; }
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
`, si = /^- \[( |x|X)\] ([^\n]+)$/;
function Tt(o) {
  const e = o.replace(/\r\n?/g, `
`).trimEnd().split(`
`), t = [];
  for (let n; e.length && (n = si.exec(e[e.length - 1])); e.pop()) t.unshift({ done: n[1] !== " ", text: n[2] });
  return { note: e.join(`
`).trimEnd(), lines: t };
}
const Se = (o) => [...o.filter((e) => !e.done), ...o.filter((e) => e.done)];
function It(o, e) {
  const t = Se(e).map((r) => `- [${r.done ? "x" : " "}] ${r.text}`).join(`
`), n = o.trimEnd();
  return n && t ? `${n}

${t}` : n || t;
}
const In = (o, e) => Se(Se(o).map((t, n) => n === e ? { ...t, done: !t.done } : t)), li = (o, e) => Se(o).filter((t, n) => n !== e);
function di(o, e) {
  const t = e.replace(/[\r\n]+/g, " ").trim();
  return t ? Se([...o, { done: !1, text: t }]) : o;
}
const $o = (o) => ({ done: o.filter((e) => e.done).length, total: o.length });
function Rn(o, e = {}) {
  const t = e.clamp ? `--clamp:${e.clamp}` : b, n = e.clamp ? "note clamp" : "note";
  return customElements.get("ha-markdown") ? p`<div class=${n} style=${t}><ha-markdown .content=${o} breaks></ha-markdown></div>` : p`<div class="${n} plain" style=${t}>${o}</div>`;
}
function ci(o, e, t, n) {
  const r = (f, _) => ({
    value: o.slice(0, e) + f + o.slice(e, t) + _ + o.slice(t),
    start: e + f.length,
    end: t + f.length
  });
  if (n === "bold") return r("**", "**");
  if (n === "italic") return r("*", "*");
  if (n === "link")
    return { ...r("[", "](https://)"), start: t + 3, end: t + 3 + 8 };
  const i = e ? o.lastIndexOf(`
`, e - 1) + 1 : 0, a = o.indexOf(`
`, t), s = a < 0 ? o.length : a, l = o.slice(i, s).split(`
`), d = (f) => l.length > 1 && !f.trim(), h = l.every((f) => d(f) || f.startsWith("- ")), c = l.map((f) => d(f) ? f : h ? f.slice(2) : f.startsWith("- ") ? f : `- ${f}`).join(`
`);
  return { value: o.slice(0, i) + c + o.slice(s), start: i, end: i + c.length };
}
const pi = ".check, .cl button", co = (o) => !!o.target.closest(pi) || o.composedPath().some((e) => e.tagName === "A"), hi = 5, po = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], Re = (o) => `c-${po.includes(o) ? o : "grey"}`;
function dt(o, e) {
  var t;
  return String(((t = o.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function ui(o) {
  return o.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function Le(o, e = !1) {
  return p`<span class="dot ${e ? "sm" : ""} ${Re((o == null ? void 0 : o.color) ?? "grey")}"><ha-icon .icon=${(o == null ? void 0 : o.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function fe(o, e, t = "", n = !1) {
  var s;
  if (!e) return p`<span class="ava none ${t}" title="-">+</span>`;
  const r = dt(o, e), i = (s = o.states[e]) == null ? void 0 : s.attributes.entity_picture;
  if (typeof i == "string" && i) return p`<img class="ava ${t}" src=${i} alt=${n ? "" : r} title=${r} />`;
  const a = [...r].reduce((l, d) => (l * 31 + d.charCodeAt(0)) % 360, 7);
  return p`<span class="ava ${t}" title=${r} style="background:linear-gradient(135deg,hsl(${a} 55% 62%),hsl(${(a + 25) % 360} 55% 42%))">${ui(r)}</span>`;
}
const Hn = p`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function fi(o, e) {
  const t = o.status === "completed";
  return p`<button class="check" type="button" aria-pressed=${t} aria-label=${o.summary}
    @click=${() => e.onToggle(o)}>${Hn}</button>`;
}
function gi(o, e) {
  const { date: t, hasTime: n } = Q(o.due), r = xo(R(e.now), t);
  let i;
  return r === -1 ? i = m(e.lang, "yesterday") : r < -1 ? i = m(e.lang, "days_ago", { n: -r }) : r === 0 ? i = m(e.lang, "today") : r === 1 ? i = m(e.lang, "tomorrow") : i = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), n ? `${i} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : i;
}
function bi(o, e) {
  const t = xo(new Date(o.completed_at), R(e.now));
  return t <= 0 ? m(e.lang, "done_today") : t === 1 ? m(e.lang, "done_yesterday") : m(e.lang, "done_days_ago", { n: t });
}
function Ln(o, e, t) {
  const n = o.status === "completed", r = e.parents.find((_) => _.id === o.parent), i = R(e.now), a = !n && o.due && R(Q(o.due).date) < i, s = !n && o.due && +R(Q(o.due).date) == +i, l = p`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`, { note: d, lines: h } = Tt(o.description), c = Se(h), f = $o(c);
  return p`<article class="card ${n ? "done" : ""}" data-uid=${o.uid} @click=${(_) => {
    co(_) || e.onOpen(o, _);
  }}>
    <div class="row">
      ${Le(r, !0)}
      <span class="parent-name">${(r == null ? void 0 : r.name) ?? o.parent}</span>
      ${fe(e.hass, o.assignee)}
    </div>
    <div class="row top">
      ${f.total && !n ? b : fi(o, e)}
      <button class="title" type="button">${o.summary}</button>
      ${f.total ? p`<span class="pill c-green cl-progress">${f.done}/${f.total}</span>` : b}
    </div>
    ${d ? Rn(d, { clamp: 3 }) : b}
    ${f.total ? mi(o, d, c, e) : b}
    <div class="pills">
      ${!n && t ? p`<span class="pill prio-${o.priority} ${Re(["", "red", "orange", "grey"][o.priority])}">${l}${m(e.lang, `prio_${o.priority}`)}</span>` : b}
      ${!n && o.moved > 0 ? p`<span class="pill c-orange">${m(e.lang, o.raised ? "moved_raised" : "moved", { n: o.moved })}</span>` : b}
      ${n && o.completed_at ? p`<span class="pill c-green">${bi(o, e)}</span>` : b}
      ${!n && o.due ? p`<span class="pill ${a ? "c-red" : s ? "today" : "later"}">${gi(o, e)}</span>` : b}
    </div>
  </article>`;
}
function mi(o, e, t, n) {
  const r = (c) => m(n.lang, c), i = $o(t), a = i.total - i.done, s = n.expanded.has(o.uid), l = s ? t : t.slice(0, Math.min(a, hi)), d = a - l.filter((c) => !c.done).length, h = s ? r(i.done ? "cl_hide_ticked" : "cl_show_less") : `+ ${[d ? he(n.lang, "cl_more", d) : "", i.done ? he(n.lang, "cl_ticked", i.done) : ""].filter(Boolean).join(" · ")}`;
  return p`<div class="cl-bar"><span style="width:${Math.round(i.done / i.total * 100)}%"></span></div>
    <div class="cl">
      ${l.map((c, f) => p`<button class="cl-row" type="button" role="checkbox" aria-checked=${c.done}
        @click=${() => n.onLines(o, It(e, In(t, f)))}><span class="cl-box">${Hn}</span><span class="cl-t">${c.text}</span></button>`)}
      ${s || d || i.done ? p`<button class="link muted cl-more" type="button" @click=${() => n.onExpand(o.uid, !s)}>${h}</button>` : b}
      ${!a && o.status !== "completed" ? p`<div class="cl-alldone"><span>${r("cl_all_done")}</span>
        <button class="pill-btn" type="button" @click=${() => n.onToggle(o)}>${r("cl_mark_done")}</button></div>` : b}
    </div>`;
}
function Fn(o) {
  const { note: e, lines: t } = Tt(o.description);
  return {
    uid: o.uid,
    status: o.status,
    heading: o.summary,
    parent: o.parent,
    summary: o.summary,
    description: e,
    lines: Se(t),
    base: It(e, t),
    preview: e !== "",
    priority: o.priority,
    assignee: o.assignee,
    date: o.due ? oe(Q(o.due).date) : "",
    time: Xr(o.due),
    confirmDelete: !1
  };
}
function _i(o, e, t = {}) {
  return {
    status: "needs_action",
    heading: "",
    parent: o.id,
    summary: o.checklist ? m(e, "cl_default_title") : "",
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
function jn(o) {
  return {
    summary: o.summary.trim(),
    description: It(o.description, o.lines),
    due: Yr(o.date, o.date ? o.time : ""),
    priority: o.priority,
    assignee: o.assignee,
    parent: o.parent
  };
}
function Zo(o, e) {
  const t = jn(e), n = Fn(o), r = {};
  return t.summary !== o.summary && (r.summary = t.summary), t.description !== e.base && (r.description = vi(e, o.description)), (e.date !== n.date || e.time !== n.time) && (r.due = t.due), t.priority !== o.priority && (r.priority = t.priority), t.assignee !== o.assignee && (r.assignee = t.assignee), t.parent !== o.parent && (r.parent = t.parent), r;
}
function vi(o, e) {
  const t = new Set([...Tt(o.base).lines, ...o.lines].map((n) => n.text));
  return It(o.description, [...o.lines, ...Tt(e).lines.filter((n) => !t.has(n.text))]);
}
function kt(o, e) {
  const t = R(e);
  return o === "none" ? "" : oe(o === "today" ? t : o === "tomorrow" ? K(t, 1) : K(t, (6 - t.getDay() + 7) % 7));
}
const yi = p`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
function xi(o, e) {
  var a;
  const t = (s) => m(e.lang, s), n = !o.uid, r = ["today", "tomorrow", "weekend", "none"], i = (s) => {
    s.target === s.currentTarget && e.onClose();
  };
  return p`<dialog class="kb-dialog" aria-label=${n ? t("new_task") : o.heading} @close=${e.onClose} @click=${i}>
    <div class="dlg">
      <div class="dlg-head">
        <span class="dlg-kicker">${t(n ? "new_note" : "f_title")}</span>
        ${n ? b : p`<button class="pill-btn ${o.status === "completed" ? "on" : ""}" type="button" @click=${e.onToggleDone}>
          ${t(o.status === "completed" ? "mark_open" : "mark_done")}</button>`}
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>

      ${e.error ? p`<div class="notice" role="alert">${t(e.error)}</div>` : b}
      <label class="vis-hidden" for="kb-title">${t("f_title")}</label>
      <input id="kb-title" class="dlg-title" type="text" autocomplete="off" .value=${o.summary} placeholder=${t("f_title_ph")}
        @input=${(s) => e.onChange({ summary: s.target.value })} />

      ${o.lines.length || (a = e.parents.find((s) => s.id === o.parent)) != null && a.checklist ? Ei(o, e) : b}

      <div class="field">
        <div class="row"><span class="dlg-label grow">${t("f_note")}</span>
          ${o.preview ? b : ki.map(([s, l]) => p`<button class="fmt-btn" type="button" data-fmt=${s}
            aria-label=${t(`fmt_${s}`)} title=${t(`fmt_${s}`)} @click=${(d) => Jo(d, s)}>${l}</button>`)}
          <span class="seg2" role="group">
            <button class="pill-btn ${o.preview ? "" : "on"}" type="button" aria-pressed=${!o.preview} @click=${() => e.onChange({ preview: !1 })}>${t("note_edit")}</button>
            <button class="pill-btn ${o.preview ? "on" : ""}" type="button" aria-pressed=${o.preview} @click=${() => e.onChange({ preview: !0 })}>${t("note_preview")}</button>
          </span></div>
        ${o.preview ? Rn(o.description) : p`<textarea rows="3" aria-label=${t("f_note")} .value=${o.description} placeholder=${t("f_note_ph")}
          @input=${(s) => e.onChange({ description: s.target.value })}
          @keydown=${(s) => {
    const l = s.key.toLowerCase();
    (s.ctrlKey || s.metaKey) && !s.shiftKey && !s.altKey && (l === "b" || l === "i") && (s.preventDefault(), Jo(s, l === "b" ? "bold" : "italic"));
  }}></textarea>`}
      </div>

      <div class="field"><span class="dlg-label">${t("f_parent")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_parent")}>
          ${e.parents.map((s) => p`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${o.parent === s.id}
            @click=${() => e.onChange({ parent: s.id })}>${Le(s, !0)}${s.name}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_prio")}</span>
        <div class="seg3" role="radiogroup" aria-label=${t("f_prio")}>
          ${[1, 2, 3].map((s) => p`<button type="button" role="radio" aria-checked=${o.priority === s}
            class="prio-${s}" @click=${() => e.onChange({ priority: s })}>${yi}${t(`prio_${s}`)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_due")}</span>
        <div class="chips">
          ${r.map((s) => p`<button class="pill-btn ${kt(s, e.now) === o.date ? "on" : ""}" type="button"
            aria-pressed=${kt(s, e.now) === o.date}
            @click=${() => e.onChange({ date: kt(s, e.now), ...s === "none" ? { time: "" } : {} })}>${t(`q_${s}`)}</button>`)}
          <label class="pill-input"><span class="vis-hidden">${t("f_date")}</span>
            <input type="date" .value=${o.date} @input=${(s) => e.onChange({ date: s.target.value })} /></label>
          <label class="pill-input"><span class="vis-hidden">${t("f_time")}</span>
            <input type="time" .value=${o.time} ?disabled=${!o.date} @input=${(s) => e.onChange({ time: s.target.value })} /></label>
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_who")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_who")}>
          <button class="chip dlg-chip" type="button" role="radio" aria-checked=${o.assignee === null}
            @click=${() => e.onChange({ assignee: null })}>${fe(e.hass, null, "", !0)}${t("unassigned")}</button>
          ${e.people.map((s) => p`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${o.assignee === s}
            @click=${() => e.onChange({ assignee: s })}>${fe(e.hass, s, "", !0)}${dt(e.hass, s)}</button>`)}
        </div></div>

      <div class="dlg-foot">
        ${n ? b : o.confirmDelete ? p`<span class="danger-text" role="alert">${t("delete_confirm")}</span>
              <button class="danger-btn" type="button" ?disabled=${e.busy} @click=${e.onDelete}>${t("delete_yes")}</button>
              <button class="pill-btn" type="button" @click=${() => e.onChange({ confirmDelete: !1 })}>${t("cancel")}</button>` : p`<button class="danger-link" type="button" @click=${() => e.onChange({ confirmDelete: !0 })}>${t("delete")}</button>`}
        <span class="grow"></span>
        ${o.confirmDelete ? b : p`
          <button class="pill-btn" type="button" @click=${e.onClose}>${t("cancel")}</button>
          <button class="primary-btn" type="button" ?disabled=${!o.summary.trim() || e.busy} @click=${e.onSave}>${t("save")}</button>`}
      </div>
    </div>
  </dialog>`;
}
const wi = p`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`, ki = [
  ["bold", p`<b>B</b>`],
  ["italic", p`<i>I</i>`],
  ["bullets", "•"],
  ["link", wi]
];
function Jo(o, e) {
  var l, d;
  const t = (l = o.currentTarget.closest(".field")) == null ? void 0 : l.querySelector("textarea");
  if (!t) return;
  const n = t.value, r = ci(n, t.selectionStart, t.selectionEnd, e);
  if (r.value === n) return;
  let i = 0, a = 0;
  for (; i < n.length && i < r.value.length && n[i] === r.value[i]; ) i++;
  for (; a < n.length - i && a < r.value.length - i && n[n.length - 1 - a] === r.value[r.value.length - 1 - a]; ) a++;
  const s = r.value.slice(i, r.value.length - a);
  t.focus(), t.setSelectionRange(i, n.length - a), (!((d = document.execCommand) != null && d.call(document, s ? "insertText" : "delete", !1, s)) || t.value !== r.value) && (t.value = n, t.setRangeText(s, i, n.length - a), t.dispatchEvent(new Event("input", { bubbles: !0 }))), t.setSelectionRange(r.start, r.end);
}
const $i = p`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>`, Si = p`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function Ei(o, e) {
  const t = (a) => m(e.lang, a), n = $o(o.lines), r = o.lines.findIndex((a) => a.done), i = (a) => {
    const s = di(o.lines, a.value);
    a.value = "", s !== o.lines && e.onChange({ lines: s });
  };
  return p`<section class="field cl-list">
    <div class="row"><span class="dlg-label grow">${t("cl_list")}</span>
      ${n.total ? p`<span class="pill c-green">${n.done}/${n.total}</span>` : b}</div>
    <div class="cl-box-list">
      ${o.lines.map((a, s) => p`<div class="cl-item ${a.done ? "done" : ""} ${s === r && s > 0 ? "first-done" : ""}">
        <button class="cl-check" type="button" role="checkbox" aria-checked=${a.done} aria-label=${a.text}
          @click=${() => e.onChange({ lines: In(o.lines, s) })}>${Si}</button>
        <span class="cl-text">${a.text}</span>
        <button class="cl-x" type="button" aria-label=${`${t("cl_remove")}: ${a.text}`} @click=${() => e.onChange({ lines: li(o.lines, s) })}>${$i}</button>
      </div>`)}
      <label class="cl-add"><span aria-hidden="true">+</span>
        <input type="text" autocomplete="off" placeholder=${t("cl_add_ph")} aria-label=${t("cl_add_ph")}
          @keydown=${(a) => {
    a.key === "Enter" && !a.isComposing && (a.preventDefault(), i(a.target));
  }}
          @blur=${(a) => i(a.target)} /></label>
    </div>
  </section>`;
}
function Qo(o) {
  if (!o.due) return 1 / 0;
  const { date: e, hasTime: t } = Q(o.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function Ot(o, e) {
  const t = Qo(o), n = Qo(e);
  return t !== n ? t < n ? -1 : 1 : o.priority - e.priority || +new Date(o.created_at) - +new Date(e.created_at);
}
const Di = ["todo", "later", "week", "overdue", "today", "done"], qn = (o, e) => +new Date(e.completed_at ?? 0) - +new Date(o.completed_at ?? 0);
function Ai(o, e, t) {
  const { ctx: n } = e, r = o.filter((l) => l.status === "needs_action"), i = o.filter((l) => ke(l, n) === "done").sort(qn), a = o.filter((l) => l.status === "completed").length - i.length, s = e.group === "date" ? Di.filter((l) => l !== "done" && (l === "todo" || n.enabled.has(l))).map((l) => ({
    id: l,
    label: m(t, `col_${l}`),
    led: l === "overdue" ? "rgb(var(--c-red))" : l === "week" || l === "today" ? "var(--kb-accent)" : void 0,
    items: r.filter((d) => ke(d, n) === l).sort(Ot)
  })) : [1, 2, 3].map((l) => ({
    id: `p${l}`,
    label: m(t, `prio_${l}`),
    led: l === 1 ? "rgb(var(--c-red))" : l === 2 ? "rgb(var(--c-orange))" : void 0,
    items: r.filter((d) => d.priority === l).sort(Ot)
  }));
  return n.enabled.has("done") && s.push({ id: "done", label: m(t, "col_done"), led: "rgb(var(--c-green))", items: i, done: !0 }), { cols: s, olderDone: a };
}
function Ci(o, e, t) {
  const { cols: n, olderDone: r } = Ai(o, e, t.lang);
  return p`<div class="board">${n.map((i) => p`<section class="col" data-col=${i.id}>
      <div class="col-head">
        <span class="led" style=${i.led ? `background:${i.led}` : ""}></span>
        <span class="label">${i.label}</span><span class="count">${i.items.length}</span>
        ${i.done || i.id === "overdue" ? b : p`<button class="add" type="button" aria-label=${`${m(t.lang, "add_here")}: ${i.label}`} @click=${() => e.onAdd(i.id)}>+</button>`}
      </div>
      ${i.items.map((a) => Ln(a, t, e.group === "date"))}
      ${i.done ? p`<button class="note note-btn" type="button" @click=${e.onHistory}>${m(t.lang, "done_note", { days: e.ctx.doneDays, older: r })}</button>` : b}
      ${!i.done && i.items.length === 0 ? p`<div class="empty">${m(t.lang, "nothing")}</div>` : b}
    </section>`)}</div>`;
}
const Ti = ["today", "week", "todo", "done"];
function Oi(o, e) {
  return p`<dialog class="sheet kb-sheet" aria-label=${o.title}
    @cancel=${(t) => {
    t.preventDefault(), o.onCancel();
  }}
    @click=${(t) => {
    t.target === t.currentTarget && o.onClose();
  }}>
    <div class="grabber"><span></span></div>
    <div class="sheet-head">
      <span class="dot ${Re(o.color)}"><ha-icon .icon=${o.icon}></ha-icon></span>
      <h2>${o.title}</h2>
      <span class="count">${o.count}</span>
      <button class="round-btn sclose" type="button" aria-label=${m(e.lang, "close")} @click=${o.onClose}>✕</button>
    </div>
    <div class="sheet-list" @pointerdown=${o.press.down} @pointermove=${o.press.move} @pointerup=${o.press.end}
      @pointercancel=${o.press.end} @pointerleave=${o.press.end} @contextmenu=${(t) => t.preventDefault()}>
      ${o.entries.map((t) => Ln(t, e, !0))}
      ${o.entries.length === 0 ? p`<div class="empty">${m(e.lang, "nothing")}</div>` : b}
      ${o.isDone ? p`<button class="pill-btn hist-link" type="button" @click=${o.onHistory}>${m(e.lang, "older_history", { n: o.olderDone })}</button>` : b}
    </div>
    ${o.menu ? Mi(o.menu, o, e) : b}
  </dialog>`;
}
function Mi(o, e, t) {
  return p`<div class="menu-wrap" @click=${(n) => {
    n.target === n.currentTarget && e.onMenuClose();
  }}>
    <div class="menu" role="group" aria-label=${m(t.lang, "move_to")}>
      <div class="menu-title">${m(t.lang, "move_to")}<small>${o.summary}</small></div>
      ${Ti.map((n) => p`<button class="menu-btn" type="button" data-move=${n} @click=${() => e.onMove(o, n)}>${m(t.lang, `col_${n}`)}</button>`)}
      <button class="menu-btn muted" type="button" @click=${e.onMenuClose}>${m(t.lang, "cancel")}</button>
    </div>
  </div>`;
}
function Pi(o, e) {
  const t = { todo: 0, later: 0, week: 0, today: 0, overdue: 0, done: 0 }, n = R(e.now), r = [], i = [];
  let a = 0;
  for (const l of o) {
    const d = ke(l, e);
    d && t[d]++, d === "today" && r.push(l), d === "week" && i.push(l), d === "today" && l.due && R(Q(l.due).date) < n && a++;
  }
  const s = (l) => l.sort(Ot).slice(0, 3);
  return { counts: t, overdue: a, preview: s(r), weekPreview: s(i) };
}
const Ve = {
  today: { icon: "mdi:calendar-today", color: "blue" },
  overdue: { icon: "mdi:alert-circle-outline", color: "red" },
  week: { icon: "mdi:calendar-week", color: "indigo" },
  todo: { icon: "mdi:format-list-checks", color: "teal" },
  later: { icon: "mdi:calendar-clock", color: "purple" },
  done: { icon: "mdi:check-circle-outline", color: "green" }
}, zi = ["today", "overdue", "week", "later"], Ni = ["todo", "done"];
function Ii(o, e) {
  const t = Pi(o.items, o.ctx), n = o.items.filter((r) => r.status === "needs_action");
  return p`<div class="tiles-view">
    <div class="people ${o.who ? "has-filter" : ""}" role="group" aria-label=${m(e.lang, "filter_people")}>
      ${o.people.map((r) => {
    const i = o.who === r;
    return p`<button class="person" type="button" aria-pressed=${i} @click=${() => o.onWho(i ? null : r)}>
          ${fe(e.hass, r, "lg", !0)}<span>${dt(e.hass, r)}</span></button>`;
  })}
    </div>
    <div class="tiles">
      ${zi.filter((r) => o.ctx.enabled.has(r)).map((r) => {
    const i = r === "today" || r === "week", a = r === "today" ? t.overdue : 0;
    return p`<button class="tile ${i ? "wide" : ""} ${Re(Ve[r].color)}" type="button" data-tile=${r} @click=${() => o.onTile(r)}>
          <span class="row">
            <span class="dot"><ha-icon .icon=${Ve[r].icon}></ha-icon></span>
            <span class="tile-label">${m(e.lang, `col_${r}`)}</span>
            ${a > 0 ? p`<span class="pill c-red">${he(e.lang, "sum_overdue", a)}</span>` : b}
          </span>
          <span class="tile-count">${t.counts[r]}</span>
          ${i ? p`<span class="preview">${(r === "today" ? t.preview : t.weekPreview).map((s) => p`<span class="row">
            <span class="mark"></span><span class="t">${s.summary}</span>${s.assignee ? fe(e.hass, s.assignee, "xs", !0) : b}</span>`)}</span>` : b}
        </button>`;
  })}
    </div>
    <div class="qchips">
      ${Ni.filter((r) => o.ctx.enabled.has(r)).map((r) => p`<button class="qchip ${Re(Ve[r].color)}" type="button" data-tile=${r} @click=${() => o.onTile(r)}>
        <span class="dot"><ha-icon .icon=${Ve[r].icon}></ha-icon></span>
        <span class="qlabel">${m(e.lang, `col_${r}`)}</span><span class="qcount">${t.counts[r]}</span></button>`)}
    </div>
    <span class="dlg-label tiles-h">${m(e.lang, "lists")}</span>
    <div class="plist">
      ${e.parents.map((r) => p`<button class="prow" type="button" data-parent=${r.id} @click=${() => o.onParent(r.id)}>
        ${Le(r)}<span class="pname">${r.name}</span>
        <span class="pcount">${n.filter((i) => i.parent === r.id).length}</span><span aria-hidden="true">›</span></button>`)}
    </div>
  </div>`;
}
function Ri(o, e, t, n, r) {
  const i = n.filter((s) => s.status === "needs_action" && (!e.who || s.assignee === e.who)), a = (s) => {
    const l = e.parent === ((s == null ? void 0 : s.id) ?? null), d = i.filter((h) => !s || h.parent === s.id).length;
    return p`<button class="chip ${s ? Re(s.color) : ""}" type="button" aria-pressed=${l}
      @click=${() => r({ parent: l ? null : (s == null ? void 0 : s.id) ?? null })}>
      ${Le(s ?? void 0)}<span>${(s == null ? void 0 : s.name) ?? m(o.lang, "all_parents")}</span><b>${d}</b></button>`;
  };
  return p`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${m(o.lang, "filter_people")}>
      ${t.map((s) => {
    const l = e.who === s;
    return p`<button class="person" type="button" aria-pressed=${l} @click=${() => r({ who: l ? null : s })}>
          ${fe(o.hass, s, "lg", !0)}<span>${dt(o.hass, s)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${m(o.lang, "filter_parents")}>
      ${a(null)}${o.parents.map((s) => a(s))}
    </div>
    <div class="seg" role="group" aria-label=${m(o.lang, "group_label")}>
      ${["date", "priority"].map((s) => p`<button type="button" aria-pressed=${e.group === s}
        @click=${() => r({ group: s })}>${m(o.lang, `group_${s}`)}</button>`)}
    </div>
  </div>`;
}
function Hi(o, e, t, n) {
  const r = R(e), i = K(r, -((r.getDay() - n + 7) % 7)), a = K(i, -7), s = new Intl.DateTimeFormat(t, { month: "long", year: "numeric" }), l = /* @__PURE__ */ new Map();
  for (const d of o) {
    const h = new Date(d.completed_at ?? 0);
    let c, f;
    h >= i ? (c = "this", f = m(t, "col_week")) : h >= a ? (c = "last", f = m(t, "hist_last_week")) : (c = `${h.getFullYear()}-${h.getMonth()}`, f = s.format(h), t.startsWith("cs") && (f = f.toLocaleLowerCase("cs")));
    const _ = l.get(c) ?? { label: f, items: [] };
    _.items.push(d), l.set(c, _);
  }
  return [...l.values()];
}
const Li = p`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path></svg>`;
function Fi(o, e) {
  const t = (s) => m(e.lang, s), n = new Intl.DateTimeFormat(e.lang, { day: "numeric", month: "short" }), r = (s) => {
    s.target === s.currentTarget && e.onClose();
  }, i = (s) => e.parents.find((l) => l.id === s), a = Hi(o.items, e.now, e.lang, e.firstDay);
  return p`<dialog class="kb-dialog kb-history" aria-labelledby="kb-hist-title" @close=${e.onClose} @click=${r}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><h2 id="kb-hist-title" class="hist-title">${t("history")}</h2>
          <span class="hist-sub">${m(e.lang, "hist_total", { n: o.total })}</span></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      ${o.error ? p`<div class="notice" role="alert">${t(o.error)}</div>` : b}
      <label class="hist-search">
        <span class="vis-hidden">${t("hist_search")}</span>
        <input type="search" autocomplete="off" .value=${o.search} placeholder=${t("hist_search_ph")}
          @input=${(s) => e.onSearch(s.target.value)} />
      </label>
      <div class="chips" role="group" aria-label=${t("filter_parents")}>
        <button class="pill-btn" type="button" aria-pressed=${o.parent === null} @click=${() => e.onParent(null)}>${t("all_parents")}</button>
        ${e.parents.map((s) => p`<button class="pill-btn hist-chip" type="button" aria-pressed=${o.parent === s.id}
          @click=${() => e.onParent(s.id)}>${Le(s, !0)}${s.name}</button>`)}
      </div>
      <div class="hist-list">
        ${a.map((s) => p`<section class="hist-group">
          <h3 class="dlg-label">${s.label}</h3>
          <ul class="hist-rows">${s.items.map((l) => {
    var d;
    return p`<li class="hist-row" data-uid=${l.uid}>
            <span class="hist-check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>
            <div class="hist-text"><span class="hist-name">${l.summary}</span>
              <span class="hist-meta">${((d = i(l.parent)) == null ? void 0 : d.name) ?? l.parent} · ${l.completed_at ? n.format(new Date(l.completed_at)) : ""}</span></div>
            ${l.assignee ? fe(e.hass, l.assignee) : b}
            <button class="hist-reopen" type="button" title=${t("reopen")} aria-label=${`${t("reopen")}: ${l.summary}`}
              @click=${() => e.onReopen(l)}>${Li}</button>
          </li>`;
  })}</ul>
        </section>`)}
        ${o.items.length === 0 && !o.loading && !o.error ? p`<div class="empty hist-empty">${t("hist_empty")}</div>` : b}
        ${o.items.length < o.total ? p`<button class="pill-btn hist-more" type="button" ?disabled=${o.loading} @click=${e.onMore}>${t("hist_more")}</button>` : b}
      </div>
    </div>
  </dialog>`;
}
const Qt = "household", So = { name: "", icon: "mdi:format-list-checks", color: "blue", checklist: !1 };
function ji(o, e) {
  if (!o || !e) return null;
  const t = ["end_of_day_mode", "close_time", "notify_enabled", "notify_time", "notify_assignee", "notify_services"], n = {};
  for (const r of t) JSON.stringify(o[r]) !== JSON.stringify(e[r]) && (n[r] = e[r]);
  return Object.keys(n).length ? n : null;
}
const qi = ["todo", "later", "week", "today", "done"], en = [["board", "tab_board"], ["eod", "tab_eod"], ["lists", "tab_lists"]], Bi = "M3 5h18v12H3zM8 21h8M12 17v4", Ui = "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", He = (o, e = 16) => p`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${o}></path></svg>`, Rt = (o, e) => (o.includes(!0) ? o[e] : e === 0) ? 0 : -1;
function Ht(o) {
  const e = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }, t = [...o.currentTarget.querySelectorAll('[role="radio"],[role="tab"]')], n = t.indexOf(o.target);
  if (n < 0) return;
  const r = o.key === "Home" ? 0 : o.key === "End" ? t.length - 1 : o.key in e ? (n + e[o.key] + t.length) % t.length : -1;
  r < 0 || (o.preventDefault(), t[r].focus(), t[r].click());
}
function Wi(o, e) {
  if (!o) return !1;
  const t = o.id === void 0 ? So : e.find((n) => n.id === o.id);
  return o.target !== void 0 || !t || ["name", "icon", "color", "checklist"].some((n) => o[n] !== t[n]);
}
function Lt(o, e, t, n = {}, r = !1) {
  return p`<button class="switch" type="button" role="switch" aria-checked=${o} aria-label=${e} ?disabled=${r}
    data-col=${n.col ?? b} data-parent=${n.parent ?? b} @click=${t}></button>`;
}
function eo(o, e, t) {
  return p`<div class="scope ${e ? "household" : "dashboard"}" role="note">
    ${He(e ? Ui : Bi)}
    <span class="scope-text"><b>${m(o, e ? "scope_household" : "scope_dashboard")}</b><span>${m(o, t)}</span></span>
  </div>`;
}
function Yi(o, e) {
  const t = (a) => m(e.lang, a), n = o.columns ?? [], r = (a, s, l, d) => p`
    <div class="set-line"><span class="grow">${a}</span>
      <div class="seg" role="radiogroup" aria-label=${a} @keydown=${Ht}>
        ${s.map(([h, c], f) => p`<button type="button" role="radio" aria-checked=${h === l} tabindex=${Rt(s.map(([_]) => _ === l), f)} @click=${() => d(h)}>${c}</button>`)}
      </div>
    </div>`, i = ["sort_due", "f_prio", "sort_created"];
  return p`
    <section class="set-sec">
      <h3 class="dlg-label">${t("columns")}</h3>
      <div class="set-rows">${qi.map((a) => p`<div class="set-row">
        <span class="led led-${a}"></span>
        <span class="set-text"><span class="set-name">${t(`col_${a}`)}</span><span class="set-hint">${t(`col_hint_${a}`)}</span></span>
        ${Lt(
    a === "todo" || n.includes(a),
    t(`col_${a}`),
    () => e.onChange({ columns: n.filter((s) => s !== a).concat(n.includes(a) ? [] : [a]) }),
    { col: a },
    a === "todo"
  )}
      </div>`)}</div>
      ${n.includes("done") ? p`
        ${r(t("done_keep"), wo.map((a) => [a, he(e.lang, "days", a)]), o.done_days, (a) => e.onChange({ done_days: a }))}
        <span class="set-hint pad">${t("done_keep_hint")}</span>` : b}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("view")}</h3>
      ${r(t("group_label"), [["date", t("group_date")], ["priority", t("group_priority")]], o.group, (a) => e.onChange({ group: a }))}
      ${r(
    t("language"),
    [[void 0, t("lang_ha")], ...ko.map((a) => [a, On[a]])],
    o.language,
    (a) => e.onChange({ language: a })
  )}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("sort_order")}</h3>
      <div class="sort-keys">${i.map((a, s) => p`${s ? He("M9 6l6 6-6 6") : b}<span class="sort-key"><span class="sort-n">${s + 1}</span>${t(a)}</span>`)}</div>
      <span class="set-hint pad">${t("sort_hint")}</span>
    </section>`;
}
const tn = [
  ["keep", "M5 21V4h11l-1.5 4L16 12H5", "red"],
  ["overdue", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16.5h.01", "red"],
  ["move", "M4 12h13M13 7l5 5-5 5M20 5v14", "blue"],
  ["raise", "M12 19V5M6 11l6-6 6 6", "orange"]
], Xi = /^([01]\d|2[0-3]):[0-5]\d$/, Gi = p`<span class="box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>`;
function on(o, e, t) {
  return p`<input class="time-in" type="time" aria-label=${e} .value=${o}
    @change=${(n) => {
    const r = n.target;
    Xi.test(r.value) ? t(r.value) : r.value = o;
  }}>`;
}
function nn(o, e, t, n, r) {
  return p`<button class="check-row" type="button" role="checkbox" aria-checked=${o} data-service=${r ?? b} @click=${n}>
    ${Gi}${r ? He("M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2") : b}
    <span class="set-text"><span class="set-name">${e}</span><span class="set-hint ${r ? "mono" : ""}">${t}</span></span>
  </button>`;
}
function Vi(o, e) {
  const t = (s) => m(e.lang, s), n = o.eod;
  if (!n)
    return o.eodError ? p`<div class="notice" role="alert">${t("err_load_settings")}
      <button class="pill-btn retry-eod" type="button" @click=${e.onRetry}>${t("retry")}</button></div>` : o.eodLoading ? p`<p class="set-hint pad">${t("loading")}</p>` : p``;
  const r = [...n.offered_services, ...n.notify_services.filter((s) => !n.offered_services.includes(s))], [i, a] = m(e.lang, "event_hint", { event: "\0" }).split("\0");
  return p`
    <section class="set-sec">
      <h3 class="dlg-label">${t("eod_title")}</h3>
      <div class="eod-opts" role="radiogroup" aria-label=${t("eod_title")} @keydown=${Ht}>${tn.map(([s, l, d], h) => p`
        <button class="eod-opt" type="button" role="radio" data-mode=${s} aria-checked=${n.end_of_day_mode === s}
          tabindex=${Rt(tn.map(([c]) => c === n.end_of_day_mode), h)} @click=${() => e.onEod({ end_of_day_mode: s })}>
          <span class="radio"></span><span class="dot c-${d}">${He(l, 15)}</span>
          <span class="set-text"><span class="set-name">${t(`eod_${s}`)}</span><span class="set-hint">${t(`eod_${s}_hint`)}</span></span>
        </button>`)}</div>
      <label class="set-line"><span class="grow">${t("close_at")}</span>${on(n.close_time, t("close_at"), (s) => e.onEod({ close_time: s }))}</label>
      <span class="set-hint pad">${t("close_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("notify_title")}</h3>
      <div class="set-rows">
        <div class="set-row">
          <span class="set-text"><span class="set-name">${t("notify_on")}</span><span class="set-hint">${t("notify_on_hint")}</span></span>
          ${Lt(n.notify_enabled, t("notify_on"), () => e.onEod({ notify_enabled: !n.notify_enabled }))}
        </div>
        ${n.notify_enabled ? p`
          <label class="set-row">
            <span class="set-text"><span class="set-name">${t("notify_at")}</span><span class="set-hint">${t("notify_at_hint")}</span></span>
            ${on(n.notify_time, t("notify_at"), (s) => e.onEod({ notify_time: s }))}
          </label>
          <div class="notify-whom">
            <span class="set-name">${t("notify_whom")}</span>
            ${nn(n.notify_assignee, t("notify_assignee"), t("notify_assignee_hint"), () => e.onEod({ notify_assignee: !n.notify_assignee }))}
            ${r.map((s) => {
    const l = n.notify_services.includes(s), d = n.offered_services.includes(s) ? s.replace(/^notify\.mobile_app_/, "").replace(/_/g, " ") : s;
    return nn(l, d, s, () => e.onEod({ notify_services: l ? n.notify_services.filter((h) => h !== s) : [...n.notify_services, s] }), s);
  })}
          </div>` : b}
      </div>
      ${n.notify_enabled ? p`<span class="set-hint pad">${i}<code class="mono">household_kanban_day_closed</code>${a}</span>` : b}
    </section>`;
}
function rn(o, e) {
  const t = (a) => m(e.lang, a), n = (a) => e.onForm({ ...o, ...a, error: !1 }), r = e.parents.filter((a) => a.id !== o.id), i = (a) => a.target.value;
  return p`<div class="parent-form">
    <label class="field"><span class="dlg-label">${t("list_name")}</span>
      <input class="text-in" name="name" .value=${o.name} @input=${(a) => n({ name: i(a) })}></label>
    <label class="field"><span class="dlg-label">${t("list_icon")}</span>
      ${customElements.get("ha-icon-picker") ? p`<ha-icon-picker .hass=${e.hass} .value=${o.icon} @value-changed=${(a) => n({ icon: a.detail.value ?? "" })}></ha-icon-picker>` : p`<input class="text-in mono" name="icon" placeholder="mdi:…" .value=${o.icon} @input=${(a) => n({ icon: i(a) })}>`}</label>
    <div class="field"><span class="dlg-label">${t("list_color")}</span>
      <div class="chips" role="radiogroup" aria-label=${t("list_color")} @keydown=${Ht}>${po.map((a, s) => p`
        <button class="color-chip c-${a}" type="button" role="radio" data-color=${a} aria-label=${t(`color_${a}`)} aria-checked=${o.color === a}
          tabindex=${Rt(po.map((l) => l === o.color), s)} @click=${() => n({ color: a })}></button>`)}</div></div>
    <div class="set-line"><span class="set-text grow"><span class="set-name">${t("list_checklist")}</span><span class="set-hint">${t("list_checklist_hint")}</span></span>${Lt(o.checklist, t("list_checklist"), () => n({ checklist: !o.checklist }))}</div>
    ${o.target !== void 0 ? p`<label class="field"><span class="dlg-label">${t("move_items_to")}</span>
      <select class="text-in" @change=${(a) => n({ target: i(a) })}>${r.map((a) => p`<option value=${a.id} ?selected=${a.id === o.target}>${a.name}</option>`)}</select></label>` : b}
    ${o.error ? p`<div class="notice" role="alert">${t("err_parent")}</div>` : b}
    <div class="form-foot">
      ${o.id && o.id !== Qt && o.target === void 0 && r.length ? p`<button class="pill-btn remove-parent" type="button"
        @click=${() => n({ target: r.some((a) => a.id === Qt) ? Qt : r[0].id })}>${t("remove_list")}</button>` : b}
      <span class="grow"></span>
      <button class="pill-btn" type="button" @click=${() => e.onForm(void 0)}>${t("cancel")}</button>
      ${o.target === void 0 ? p`<button class="primary-btn save-parent" type="button" ?disabled=${o.busy || !o.name.trim()} @click=${e.onFormSave}>${t("save")}</button>` : p`<button class="primary-btn confirm-remove" type="button" ?disabled=${o.busy} @click=${e.onFormRemove}>${t("remove_list")}</button>`}
    </div>
  </div>`;
}
function Ki(o, e, t) {
  const n = (i) => m(t.lang, i), r = t.parents.map((i) => i.id);
  return p`
    <section class="set-sec">
      <h3 class="dlg-label">${n("lists_here")}</h3>
      <div class="set-rows">${t.parents.map((i) => {
    const a = !o.parents || o.parents.includes(i.id);
    return p`<div class="set-row">
          ${Le(i)}
          <span class="set-text"><span class="set-name">${i.name}</span><span class="set-hint mono">${i.entity_id}</span></span>
          ${i.checklist ? p`<span class="set-badge">${n("list_checklist")}</span>` : b}
          ${Lt(a, m(t.lang, "show_list", { name: i.name }), () => t.onChange({ parents: so(o.parents, r, i.id, !a) }), { parent: i.id })}
          <button class="icon-btn edit-list" type="button" data-parent=${i.id} aria-label=${n("edit_list")} aria-expanded=${(e == null ? void 0 : e.id) === i.id}
            @click=${() => t.onForm((e == null ? void 0 : e.id) === i.id ? void 0 : { id: i.id, name: i.name, icon: i.icon, color: i.color, checklist: i.checklist })}>${He("M4 20h4L19 9l-4-4L4 16zM14 6l4 4")}</button>
        </div>${(e == null ? void 0 : e.id) === i.id ? rn(e, t) : b}`;
  })}</div>
      ${e && e.id === void 0 ? rn(e, t) : p`<button class="add-list" type="button" @click=${() => t.onForm({ ...So })}>${He("M12 5v14M5 12h14", 14)}${n("add_list")}</button>`}
      <span class="set-hint pad">${n("lists_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${n("people_filter")}</h3>
      <div class="chips">${t.people.map((i) => {
    const a = !o.people || o.people.includes(i);
    return p`<button class="pill-btn person-chip" type="button" aria-pressed=${a} data-person=${i}
          @click=${() => t.onChange({ people: so(o.people, t.people, i, !a) })}>${fe(t.hass, i, "", !0)}${dt(t.hass, i)}</button>`;
  })}</div>
    </section>`;
}
function Zi(o, e) {
  const t = (s) => m(e.lang, s), n = Wi(o.form, e.parents), r = () => n ? e.onForm(void 0) : e.onClose(), i = (s) => {
    s.target === s.currentTarget && r();
  }, a = o.tab === "board" ? p`${eo(e.lang, !1, "scope_dashboard_hint")}${Yi(o.draft, e)}` : o.tab === "lists" ? p`${eo(e.lang, !1, "scope_lists_hint")}${Ki(o.draft, o.form, e)}` : p`${eo(e.lang, !0, "scope_household_hint")}${Vi(o, e)}`;
  return p`<dialog class="kb-dialog kb-settings ${o.narrow ? "narrow" : ""}" aria-labelledby="kb-set-title" @close=${e.onClose}
    @cancel=${(s) => {
    o.form && (s.preventDefault(), e.onForm(void 0));
  }} @click=${i}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><span class="dlg-kicker">Household Kanban</span>
          <h2 id="kb-set-title" class="hist-title">${t("settings")}</h2></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${r}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      <div class="set-tabs" role="tablist" aria-label=${t("settings")} @keydown=${Ht}>
        ${en.map(([s, l], d) => p`<button type="button" role="tab" id="kb-tab-${s}" data-tab=${s} aria-selected=${o.tab === s} aria-controls="kb-panel"
          tabindex=${Rt(en.map(([h]) => h === o.tab), d)} @click=${() => e.onTab(s)}>${t(l)}</button>`)}
      </div>
      <div class="set-body" id="kb-panel" role="tabpanel" aria-labelledby="kb-tab-${o.tab}">${a}</div>
      ${o.error ? p`<div class="notice" role="alert">${t(o.error)}</div>` : b}
      <div class="dlg-foot">
        ${n ? p`<span class="set-hint form-unsaved" role="status">${t("form_unsaved")}</span>` : b}
        <span class="grow"></span>
        <button class="pill-btn" type="button" @click=${r}>${t("cancel")}</button>
        <button class="primary-btn" type="button" ?disabled=${o.saving || n} @click=${e.onSave}>${t("save")}</button>
      </div>
    </div>
  </dialog>`;
}
const Ji = 50, Qi = 600, ea = 500, ta = p`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`, Pt = class Pt extends Oe {
  constructor() {
    super(), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set(), this._loadFailed = !1, this._busy = !1, this._narrow = !1, this._raw = {}, this._sheetShown = !1, this._menuShown = !1, this._lpFired = !1, this._hq = 0, this._hMore = null, this._sortables = /* @__PURE__ */ new Map(), this._ticks = /* @__PURE__ */ new Map(), this._seq = 0, this._attempts = 0, this.addEventListener("pointerdown", (e) => {
      this._down = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    }, !0);
  }
  static getConfigElement() {
    return document.createElement("household-kanban-card-editor");
  }
  static getStubConfig() {
    return Pe({ type: "custom:household-kanban-card" });
  }
  setConfig(e) {
    const t = Pe(e);
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
      var n;
      const t = ((n = e[e.length - 1]) == null ? void 0 : n.contentRect.width) ?? 0;
      t > 0 && (this._narrow = t < Qi), this._narrow || this._closeSheet();
    }), this._ro.observe(this));
  }
  disconnectedCallback() {
    var e, t, n;
    super.disconnectedCallback(), window.clearTimeout(this._retry), this._retry = void 0, (e = this._ro) == null || e.disconnect(), this._ro = void 0, this._lpCancel(), this._sortables.forEach((r) => r.destroy()), this._sortables.clear(), this._endDrag(), window.clearTimeout(this._hTimer), (t = this._hObs) == null || t.disconnect(), this._hObs = void 0, this._hMore = null, (n = this._unsub) == null || n.then((r) => r()).catch(() => {
    }), this._unsub = void 0;
  }
  willUpdate(e) {
    e.has("hass") && this._subscribe();
  }
  /** Subscribe once; on failure retry on a capped backoff timer, never on hass updates. */
  _subscribe() {
    if (this._unsub || this._retry !== void 0 || !this.hass || !this.isConnected) return;
    const e = An(this.hass, (t) => {
      var n;
      for (const [r, i] of this._ticks) {
        const a = (n = t.items.find((s) => s.uid === r)) == null ? void 0 : n.description;
        (a === void 0 || a !== i.base && !i.sent.slice(0, -1).includes(a)) && this._ticks.delete(r);
      }
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
      }, Cn(this._attempts++)));
    });
  }
  _fail(e) {
    this._notice = e, window.setTimeout(() => {
      this._notice = void 0;
    }, 5e3);
  }
  /** Run a write from inside the dialog; close it on success, show the error in it otherwise. */
  async _dialogWrite(e, t) {
    const n = this._seq;
    this._busy = !0, this._dlgError = void 0;
    try {
      await t(), n === this._seq && (this._draft = void 0);
    } catch (r) {
      console.warn("household_kanban: write failed", r), n === this._seq && (this._dlgError = e);
    } finally {
      n === this._seq && (this._busy = !1);
    }
  }
  _save() {
    var r;
    const e = this.hass, t = this._draft;
    if (!e || !t) return;
    const n = t.uid ? (r = this._board) == null ? void 0 : r.items.find((i) => i.uid === t.uid) : void 0;
    if (t.uid && !n) {
      this._dlgError = "err_save";
      return;
    }
    this._dialogWrite("err_save", () => n ? bt(e, n.uid, Zo(n, t)) : Ir(e, jn(t)));
  }
  /** Tap on a card; a click that ends a drag is not a tap. */
  _open(e, t) {
    const n = t, r = this._down;
    if (this._down = void 0, this._lpFired) {
      this._lpFired = !1;
      return;
    }
    n.detail !== 0 && r && Go(n.clientX - r.x, n.clientY - r.y, t.timeStamp - r.t) || this._openDialog(Fn(e), () => {
      var i;
      return (i = [...this.renderRoot.querySelectorAll("[data-uid]")].find((a) => a.dataset.uid === e.uid)) == null ? void 0 : i.querySelector(".title");
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
    const e = this.hass, t = this._settings, n = this._seq;
    if (!e || !t || t.saving) return;
    const r = () => n === this._seq && !!this._settings, i = (d) => {
      r() && (this._settings = { ...this._settings, ...d });
    };
    i({ saving: !0, error: void 0 });
    const a = Pe(t.draft);
    let s = JSON.stringify(a) === JSON.stringify(this._config) ? void 0 : await this._saveDashboard(e, a, r);
    const l = ji(t.server, t.eod);
    if (l && r())
      try {
        const d = await jr(e, l);
        i({ server: d });
      } catch (d) {
        console.warn("household_kanban: settings update failed", d), s ?? (s = "err_settings");
      }
    r() && (s ? i({ saving: !1, error: s }) : this._settings = void 0);
  }
  /** Write the config into this card's entry of the dashboard config; HA reloads the dashboard after the save. */
  async _saveDashboard(e, t, n) {
    const r = ti(window.location.pathname);
    try {
      const i = await Hr(e, r);
      if (i && typeof i == "object" && "strategy" in i) return "err_not_editable";
      const a = Mn(this._raw, t), s = oi(i, this._raw, a);
      if (s.matches !== 1) return s.matches ? "err_card_ambiguous" : "err_card_missing";
      if (!n()) return;
      await Lr(e, r, s.config), this.setConfig(a);
      return;
    } catch (i) {
      console.warn("household_kanban: dashboard save failed", i);
      const a = i;
      return (a == null ? void 0 : a.code) === "config_not_editable" || (a == null ? void 0 : a.code) === "config_not_found" || /yaml/i.test((a == null ? void 0 : a.message) ?? "") ? "err_not_editable" : "err_settings";
    }
  }
  /** Household settings, loaded when the End of day tab first opens. */
  async _loadEod() {
    const e = this.hass, t = this._settings, n = this._seq;
    if (!e || !t || t.server || t.eodLoading) return;
    const r = (i) => {
      n === this._seq && this._settings && (this._settings = { ...this._settings, ...i });
    };
    r({ eodLoading: !0, eodError: !1 });
    try {
      const i = await Fr(e);
      r({ server: i, eod: i, eodLoading: !1 });
    } catch (i) {
      console.warn("household_kanban: settings load failed", i), r({ eodLoading: !1, eodError: !0 });
    }
  }
  /** Add, edit or remove a list right away; the new board arrives through the subscription. */
  async _parentWrite(e) {
    var s, l;
    const t = this.hass, n = (s = this._settings) == null ? void 0 : s.form, r = this._seq;
    if (!t || !n || n.busy) return;
    const i = () => {
      var d, h;
      return r === this._seq && ((h = (d = this._settings) == null ? void 0 : d.form) == null ? void 0 : h.id) === n.id;
    }, a = (d) => {
      i() && this._settings && (this._settings = { ...this._settings, form: d });
    };
    a({ ...n, busy: !0, error: !1 });
    try {
      await e(t), a(void 0);
    } catch (d) {
      console.warn("household_kanban: list write failed", d), i() && a({ ...(l = this._settings) == null ? void 0 : l.form, busy: !1, error: !0 });
    }
  }
  _saveParent() {
    var i, a;
    const e = (i = this._settings) == null ? void 0 : i.form;
    if (!e) return;
    const t = { name: e.name.trim(), icon: e.icon.trim() || So.icon, color: e.color, checklist: e.checklist };
    if (!e.id) {
      const s = this._seq;
      this._parentWrite(async (l) => {
        const d = await qr(l, t), h = this._settings;
        s === this._seq && (h != null && h.draft.parents) && (d != null && d.id) && (this._settings = { ...h, draft: { ...h.draft, parents: [...h.draft.parents, d.id] } });
      });
      return;
    }
    const n = (a = this._board) == null ? void 0 : a.parents.find((s) => s.id === e.id), r = Object.fromEntries(Object.entries(t).filter(([s, l]) => !n || n[s] !== l));
    if (!Object.keys(r).length) {
      this._settings && (this._settings = { ...this._settings, form: void 0 });
      return;
    }
    this._parentWrite((s) => Br(s, e.id, r));
  }
  _openHistory(e) {
    this._draft || this._hist || (this._returnTo = () => this.renderRoot.querySelector(e), this._hist = { search: "", parent: null, items: [], total: 0, loading: !1 }, this._loadHistory(!0));
  }
  _closeHistory() {
    window.clearTimeout(this._hTimer), this._hq++, this._hist = void 0;
  }
  /** `reset` starts over at offset 0 for the current filters; otherwise appends the next page. */
  async _loadHistory(e) {
    const t = this.hass, n = this._hist;
    if (!t || !n) return;
    if (e) this._hq++;
    else if (n.loading) return;
    const r = this._hq;
    this._hist = { ...n, loading: !0, error: void 0 };
    try {
      const i = await Nr(t, {
        search: n.search.trim() || void 0,
        parent: n.parent ?? void 0,
        offset: e ? 0 : n.items.length,
        limit: Ji
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
    t && gt(t, e, "needs_action").then(() => {
      const n = this._hist;
      !n || !n.items.some((r) => r.uid === e) || (this._hist = { ...n, items: n.items.filter((r) => r.uid !== e), total: Math.max(0, n.total - 1), error: void 0 });
    }, (n) => {
      console.warn("household_kanban: reopen failed", n), this._hist && (this._hist = { ...this._hist, error: "err_reopen" });
    });
  }
  /** Load the next page when the "Load more" button scrolls into view; the button itself is the fallback. */
  _observeMore() {
    var n, r, i, a;
    const e = this.renderRoot.querySelector(".hist-more"), t = ((n = this._hist) == null ? void 0 : n.items.length) ?? 0;
    if (!e || (r = this._hist) != null && r.loading) {
      e || ((i = this._hObs) == null || i.disconnect(), this._hMore = null);
      return;
    }
    ((a = this._hMore) == null ? void 0 : a.el) === e && this._hMore.n === t || (this._hMore = { el: e, n: t }, !(typeof IntersectionObserver > "u") && (this._hObs ?? (this._hObs = new IntersectionObserver((s) => {
      s.some((l) => l.isIntersecting) && this._loadHistory(!1);
    })), this._hObs.disconnect(), this._hObs.observe(e)));
  }
  _add(e, t, n, r, i = `.col[data-col="${e}"] .add`) {
    const a = () => this.renderRoot.querySelector(i), s = this._filter.parent ?? "household", l = t.find((c) => c.id === s) ?? t[0];
    if (!l) return;
    const d = /^p([123])$/.exec(e), h = {
      today: kt("today", n.now),
      week: oe(n.week.end),
      later: oe(K(n.week.end, 1))
    };
    this._openDialog(_i(l, r, d ? { priority: Number(d[1]) } : { date: h[e] ?? "" }), a);
  }
  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  _syncSortables() {
    var n;
    const e = new Set(this.renderRoot.querySelectorAll(".col"));
    for (const [r, i] of this._sortables) e.has(r) || (i.destroy(), this._sortables.delete(r));
    const t = ((n = window.matchMedia) == null ? void 0 : n.call(window, "(pointer: coarse)").matches) ?? !1;
    for (const r of e)
      this._sortables.has(r) || this._sortables.set(r, y.create(r, {
        group: { name: "kb", pull: !0, put: (i) => i.el.dataset.col !== "overdue" },
        draggable: "[data-uid]",
        filter: (i) => co(i),
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
    const n = this.hass, r = this._ctx, i = (c = this._board) == null ? void 0 : c.items.find((f) => f.uid === e);
    if (!n || !r || !i || !t) return;
    const a = /^p([123])$/.exec(t), s = Zr(i, a ? Number(a[1]) : t, r);
    if (!s) return;
    const { status: l, ...d } = s;
    (async () => {
      Object.keys(d).length && await bt(n, i.uid, d), l && await gt(n, i.uid, l);
    })().catch((f) => {
      console.warn("household_kanban: drop failed", f), this._fail("err_update");
    });
  }
  _openSheet(e, t, n) {
    this._sheetReturn = n, this._menu = void 0, this._sheet = { kind: e, id: t };
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
    const t = e.target, n = t.closest("[data-uid]"), r = n == null ? void 0 : n.dataset.uid;
    !r || co(e) || (this._lp = { x: e.clientX, y: e.clientY, timer: window.setTimeout(() => {
      this._lp = void 0, this._lpFired = !0, this._menu = r, this._menuFor = r;
    }, ea) });
  }
  _lpMove(e) {
    const t = this._lp;
    t && Go(e.clientX - t.x, e.clientY - t.y) && this._lpCancel();
  }
  _lpCancel() {
    this._lp && window.clearTimeout(this._lp.timer), this._lp = void 0;
  }
  /** Focus handling for the sheet and its menu; the native dialog, when open, owns the focus. */
  _sheetFocus(e) {
    var r, i, a, s;
    if (e) return;
    const t = this.renderRoot.querySelector(".sheet");
    if (t && !this._sheetShown)
      this._sheetShown = !0, (r = t.querySelector(".sclose")) == null || r.focus();
    else if (!t && this._sheetShown) {
      this._sheetShown = !1;
      const l = this._sheetReturn;
      (i = l && this.renderRoot.querySelector(l) || this.renderRoot.querySelector("header .new")) == null || i.focus();
    }
    const n = this.renderRoot.querySelector(".menu-btn");
    if (n && !this._menuShown)
      this._menuShown = !0, n.focus();
    else if (!n && this._menuShown) {
      this._menuShown = !1;
      const l = this._menuFor;
      (s = ((a = [...this.renderRoot.querySelectorAll(".sheet [data-uid]")].find((h) => h.dataset.uid === l)) == null ? void 0 : a.querySelector(".title")) ?? this.renderRoot.querySelector(".sheet .sclose")) == null || s.focus();
    }
  }
  updated() {
    var n, r, i, a;
    this._syncSortables(), this._observeMore();
    const e = this.renderRoot.querySelector("dialog.kb-sheet");
    e && !e.open && e.showModal();
    const t = this.renderRoot.querySelector("dialog.kb-dialog");
    if (this._sheetFocus(!!t), t && !t.open)
      t.showModal(), this._hist ? (n = this.renderRoot.querySelector(".kb-history input")) == null || n.focus() : (r = this._draft) != null && r.uid || (i = this.renderRoot.querySelector(".cl-add input") ?? this.renderRoot.querySelector("#kb-title")) == null || i.focus();
    else if (!t && this._returnTo) {
      const s = this._returnTo;
      this._returnTo = void 0, (a = s()) == null || a.focus();
    }
  }
  render() {
    var k;
    const e = this.hass, t = this._config, n = this._board;
    if (!e || !t) return b;
    const r = Pn(e, t);
    if (!n) return p`<ha-card><div class="loading">${m(r, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const i = /* @__PURE__ */ new Date(), a = n.parents.filter((u) => !t.parents || t.parents.includes(u.id)), s = new Set(t.columns ?? []);
    s.add("todo"), n.end_of_day_mode === "overdue" && s.add("overdue");
    const l = {
      now: i,
      enabled: s,
      mode: n.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: Gr(i, Xo(e.locale))
    };
    this._ctx = l;
    const d = {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      expanded: this._expanded,
      onExpand: (u, x) => {
        const C = new Set(this._expanded);
        x ? C.add(u) : C.delete(u), this._expanded = C;
      },
      // ponytail: the whole description is written, so two people ticking in the same second is last write wins;
      // a per-line server op can come later. Own rapid ticks build on `_ticks` until the board echoes them.
      onLines: (u, x) => {
        var z, P;
        const C = this._ticks.get(u.uid) ?? { base: ((P = (z = this._board) == null ? void 0 : z.items.find((L) => L.uid === u.uid)) == null ? void 0 : P.description) ?? u.description, sent: [] };
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
    }, h = t.people ?? Object.keys(e.states).filter((u) => u.startsWith("person.")), c = this._filter, f = n.items.filter((u) => a.some((x) => x.id === u.parent)).map((u) => {
      const x = this._ticks.get(u.uid);
      return x ? { ...u, description: x.sent.at(-1) } : u;
    }), _ = f.filter((u) => (!c.who || u.assignee === c.who) && (!c.parent || u.parent === c.parent));
    return p`<ha-card>
      ${this._notice ? p`<div class="notice" role="alert">${m(r, this._notice)}</div>` : b}
      <header class=${this._narrow ? "narrow" : ""}>
        <div class="titles"><h1>${m(r, "title")}</h1><div class="summary">${this._summary(f, l, r)}</div></div>
        ${(k = e.user) != null && k.is_admin ? p`<button class="round-btn gear-btn" type="button" aria-label=${m(r, "settings")} title=${m(r, "settings")}
          @click=${() => this._openSettings()}>${ta}</button>` : b}
        <button class="pill-btn hist-btn" type="button" @click=${() => this._openHistory("header .hist-btn")}>${m(r, "history")}</button>
        <button class="new" type="button" @click=${() => this._add("todo", a, l, r, "header .new")}>+ ${m(r, "new_note")}</button>
      </header>
      ${this._narrow ? this._renderNarrow(d, l, f, h, a) : p`
      ${Ri(d, c, h, f, (u) => {
      this._filter = { ...c, ...u };
    })}
      ${Ci(_, {
      ctx: l,
      group: c.group,
      onAdd: (u) => this._add(u, a, l, r),
      onHistory: () => this._openHistory('.col[data-col="done"] .note-btn')
    }, d)}`}
      ${this._hist ? Fi(this._hist, {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      firstDay: Xo(e.locale),
      onSearch: (u) => this._histFilter({ search: u }, 300),
      onParent: (u) => this._histFilter({ parent: u }, 0),
      onReopen: (u) => this._reopen(u.uid),
      onMore: () => void this._loadHistory(!1),
      onClose: () => this._closeHistory()
    }) : b}
      ${this._settings ? Zi({ ...this._settings, narrow: this._narrow }, {
      hass: e,
      lang: r,
      parents: n.parents,
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
        u != null && u.id && u.target && this._parentWrite((C) => Ur(C, u.id, u.target));
      },
      onSave: () => void this._saveSettings(),
      onClose: () => {
        this._seq++, this._settings = void 0;
      }
    }) : b}
      ${this._draft ? xi(this._draft, {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      people: h,
      busy: this._busy,
      error: this._dlgError,
      onChange: (u) => {
        this._draft && (this._draft = { ...this._draft, ...u });
      },
      onSave: () => this._save(),
      onClose: () => {
        this._draft = void 0;
      },
      onToggleDone: () => {
        var z;
        const u = this._draft, x = u == null ? void 0 : u.uid;
        if (!u || !x) return;
        const C = (z = this._board) == null ? void 0 : z.items.find((P) => P.uid === x);
        if (!C) {
          this._dlgError = "err_update";
          return;
        }
        const T = Zo(C, u);
        this._dialogWrite("err_update", async () => {
          Object.keys(T).length && await bt(e, x, T), await gt(e, x, u.status === "completed" ? "needs_action" : "completed");
        });
      },
      onDelete: () => {
        const u = this._draft;
        u != null && u.uid && this._dialogWrite("err_delete", () => Rr(e, u.uid));
      }
    }) : b}
    </ha-card>`;
  }
  /** Tiles + parents list, and the bottom sheet when one is open. */
  _renderNarrow(e, t, n, r, i) {
    const a = this._filter.who, s = n.filter((c) => !a || c.assignee === a);
    let l = this._sheet, d = b;
    const h = (l == null ? void 0 : l.kind) === "parent" ? i.find((c) => c.id === (l == null ? void 0 : l.id)) : void 0;
    if ((l == null ? void 0 : l.kind) === "parent" && !h && (l = void 0, queueMicrotask(() => this._closeSheet())), l) {
      const c = l.id, f = (u) => u.filter((x) => x.status === "needs_action").sort(Ot), _ = l.kind === "parent" ? f(s.filter((u) => u.parent === l.id)) : c === "done" ? s.filter((u) => ke(u, t) === "done").sort(qn) : f(s.filter((u) => ke(u, t) === c)), k = h ? { icon: h.icon, color: h.color, title: h.name } : { ...Ve[c], title: m(e.lang, `col_${c}`) };
      d = Oi({
        ...k,
        count: _.length,
        isDone: c === "done" && !h,
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
    return p`${Ii({
      ctx: t,
      items: s,
      people: r,
      who: a,
      onWho: (c) => {
        this._filter = { ...this._filter, who: c };
      },
      onTile: (c) => this._openSheet("col", c, `[data-tile="${c}"]`),
      onParent: (c) => this._openSheet("parent", c, `.prow[data-parent="${c}"]`)
    }, e)}${d}`;
  }
  _summary(e, t, n) {
    const r = e.filter((d) => d.status === "needs_action"), i = R(t.now), a = r.filter((d) => d.due && R(Q(d.due).date) < i).length, s = r.filter((d) => ke(d, t) === "today").length, l = t.mode === "overdue" ? he(n, "sum_overdue", a) : he(n, "sum_moved", r.filter((d) => d.moved > 0).length);
    return [he(n, "sum_open", r.length), he(n, "sum_today", s), l].join(" · ");
  }
};
Pt.properties = {
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
}, Pt.styles = ai;
let ho = Pt;
const uo = "household-kanban-card";
Tn(uo, ho);
(window.customCards ?? (window.customCards = [])).some((o) => o.type === uo) || window.customCards.push({ type: uo, name: "Household Kanban", description: "Kanban board for household tasks" });
