/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, lo = bt.ShadowRoot && (bt.ShadyCSS === void 0 || bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, co = Symbol(), wo = /* @__PURE__ */ new WeakMap();
let Qo = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== co) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (lo && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = wo.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && wo.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Hn = (o) => new Qo(typeof o == "string" ? o : o + "", void 0, co), en = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((n, i, r) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[r + 1], o[0]);
  return new Qo(t, o, co);
}, Fn = (o, e) => {
  if (lo) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), i = bt.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = t.cssText, o.appendChild(n);
  }
}, ko = lo ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return Hn(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ln, defineProperty: jn, getOwnPropertyDescriptor: Bn, getOwnPropertyNames: qn, getOwnPropertySymbols: Un, getPrototypeOf: Yn } = Object, he = globalThis, $o = he.trustedTypes, Wn = $o ? $o.emptyScript : "", Nt = he.reactiveElementPolyfillSupport, Ve = (o, e) => o, Kt = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? Wn : null;
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
} }, tn = (o, e) => !Ln(o, e), So = { attribute: !0, type: String, converter: Kt, reflect: !1, useDefault: !1, hasChanged: tn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), he.litPropertyMetadata ?? (he.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let De = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = So) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(e, n, t);
      i !== void 0 && jn(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: i, set: r } = Bn(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: i, set(s) {
      const a = i == null ? void 0 : i.call(this);
      r == null || r.call(this, s), this.requestUpdate(e, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? So;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ve("elementProperties"))) return;
    const e = Yn(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ve("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ve("properties"))) {
      const t = this.properties, n = [...qn(t), ...Un(t)];
      for (const i of n) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [n, i] of t) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, n] of this.elementProperties) {
      const i = this._$Eu(t, n);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const i of n) t.unshift(ko(i));
    } else e !== void 0 && t.push(ko(e));
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
    return Fn(e, this.constructor.elementStyles), e;
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
    var r;
    const n = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, n);
    if (i !== void 0 && n.reflect === !0) {
      const s = (((r = n.converter) == null ? void 0 : r.toAttribute) !== void 0 ? n.converter : Kt).toAttribute(t, n.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, s;
    const n = this.constructor, i = n._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : Kt;
      this._$Em = i;
      const d = l.fromAttribute(t, a.type);
      this[i] = d ?? ((s = this._$Ej) == null ? void 0 : s.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, n, i = !1, r) {
    var s;
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (r = this[e]), n ?? (n = a.getPropertyOptions(e)), !((n.hasChanged ?? tn)(r, t) || n.useDefault && n.reflect && r === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(a._$Eu(e, n)))) return;
      this.C(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: n, reflect: i, wrapped: r }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), r !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [r, s] of this._$Ep) this[r] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, s] of i) {
        const { wrapped: a } = s, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, s, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (n = this._$EO) == null || n.forEach((i) => {
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
    (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostUpdated) == null ? void 0 : i.call(n);
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
De.elementStyles = [], De.shadowRootOptions = { mode: "open" }, De[Ve("elementProperties")] = /* @__PURE__ */ new Map(), De[Ve("finalized")] = /* @__PURE__ */ new Map(), Nt == null || Nt({ ReactiveElement: De }), (he.reactiveElementVersions ?? (he.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = globalThis, Eo = (o) => o, kt = Ge.trustedTypes, Do = kt ? kt.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, on = "$lit$", le = `lit$${Math.random().toFixed(9).slice(2)}$`, nn = "?" + le, Xn = `<${nn}>`, ke = document, tt = () => ke.createComment(""), ot = (o) => o === null || typeof o != "object" && typeof o != "function", po = Array.isArray, Vn = (o) => po(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", It = `[ 	
\f\r]`, Ue = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Co = /-->/g, Ao = />/g, be = RegExp(`>|${It}(?:([^\\s"'>=/]+)(${It}*=${It}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), To = /'/g, Oo = /"/g, rn = /^(?:script|style|textarea|title)$/i, Gn = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), h = Gn(1), ze = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), Mo = /* @__PURE__ */ new WeakMap(), ye = ke.createTreeWalker(ke, 129);
function sn(o, e) {
  if (!po(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Do !== void 0 ? Do.createHTML(e) : e;
}
const Kn = (o, e) => {
  const t = o.length - 1, n = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = Ue;
  for (let a = 0; a < t; a++) {
    const l = o[a];
    let d, p, c = -1, f = 0;
    for (; f < l.length && (s.lastIndex = f, p = s.exec(l), p !== null); ) f = s.lastIndex, s === Ue ? p[1] === "!--" ? s = Co : p[1] !== void 0 ? s = Ao : p[2] !== void 0 ? (rn.test(p[2]) && (i = RegExp("</" + p[2], "g")), s = be) : p[3] !== void 0 && (s = be) : s === be ? p[0] === ">" ? (s = i ?? Ue, c = -1) : p[1] === void 0 ? c = -2 : (c = s.lastIndex - p[2].length, d = p[1], s = p[3] === void 0 ? be : p[3] === '"' ? Oo : To) : s === Oo || s === To ? s = be : s === Co || s === Ao ? s = Ue : (s = be, i = void 0);
    const _ = s === be && o[a + 1].startsWith("/>") ? " " : "";
    r += s === Ue ? l + Xn : c >= 0 ? (n.push(d), l.slice(0, c) + on + l.slice(c) + le + _) : l + le + (c === -2 ? a : _);
  }
  return [sn(o, r + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class nt {
  constructor({ strings: e, _$litType$: t }, n) {
    let i;
    this.parts = [];
    let r = 0, s = 0;
    const a = e.length - 1, l = this.parts, [d, p] = Kn(e, t);
    if (this.el = nt.createElement(d, n), ye.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = ye.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(on)) {
          const f = p[s++], _ = i.getAttribute(c).split(le), k = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: r, name: k[2], strings: _, ctor: k[1] === "." ? Jn : k[1] === "?" ? Qn : k[1] === "@" ? ei : Mt }), i.removeAttribute(c);
        } else c.startsWith(le) && (l.push({ type: 6, index: r }), i.removeAttribute(c));
        if (rn.test(i.tagName)) {
          const c = i.textContent.split(le), f = c.length - 1;
          if (f > 0) {
            i.textContent = kt ? kt.emptyScript : "";
            for (let _ = 0; _ < f; _++) i.append(c[_], tt()), ye.nextNode(), l.push({ type: 2, index: ++r });
            i.append(c[f], tt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === nn) l.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(le, c + 1)) !== -1; ) l.push({ type: 7, index: r }), c += le.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const n = ke.createElement("template");
    return n.innerHTML = e, n;
  }
}
function Ne(o, e, t = o, n) {
  var s, a;
  if (e === ze) return e;
  let i = n !== void 0 ? (s = t._$Co) == null ? void 0 : s[n] : t._$Cl;
  const r = ot(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), r === void 0 ? i = void 0 : (i = new r(o), i._$AT(o, t, n)), n !== void 0 ? (t._$Co ?? (t._$Co = []))[n] = i : t._$Cl = i), i !== void 0 && (e = Ne(o, i._$AS(o, e.values), i, n)), e;
}
class Zn {
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
    const { el: { content: t }, parts: n } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? ke).importNode(t, !0);
    ye.currentNode = i;
    let r = ye.nextNode(), s = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let d;
        l.type === 2 ? d = new it(r, r.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (d = new ti(r, this, e)), this._$AV.push(d), l = n[++a];
      }
      s !== (l == null ? void 0 : l.index) && (r = ye.nextNode(), s++);
    }
    return ye.currentNode = ke, i;
  }
  p(e) {
    let t = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++;
  }
}
class it {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, n, i) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = Ne(this, e, t), ot(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== ze && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Vn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && ot(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ke.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: n } = e, i = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = nt.createElement(sn(n.h, n.h[0]), this.options)), n);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(t);
    else {
      const s = new Zn(i, this), a = s.u(this.options);
      s.p(t), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = Mo.get(e.strings);
    return t === void 0 && Mo.set(e.strings, t = new nt(e)), t;
  }
  k(e) {
    po(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, i = 0;
    for (const r of e) i === t.length ? t.push(n = new it(this.O(tt()), this.O(tt()), this, this.options)) : n = t[i], n._$AI(r), i++;
    i < t.length && (this._$AR(n && n._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = Eo(e).nextSibling;
      Eo(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, n, i, r) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = b;
  }
  _$AI(e, t = this, n, i) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) e = Ne(this, e, t, 0), s = !ot(e) || e !== this._$AH && e !== ze, s && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = r[0], l = 0; l < r.length - 1; l++) d = Ne(this, a[n + l], t, l), d === ze && (d = this._$AH[l]), s || (s = !ot(d) || d !== this._$AH[l]), d === b ? e = b : e !== b && (e += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    s && !i && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Jn extends Mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class Qn extends Mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class ei extends Mt {
  constructor(e, t, n, i, r) {
    super(e, t, n, i, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Ne(this, e, t, 0) ?? b) === ze) return;
    const n = this._$AH, i = e === b && n !== b || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== b && (n === b || i);
    i && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ti {
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
const Rt = Ge.litHtmlPolyfillSupport;
Rt == null || Rt(nt, it), (Ge.litHtmlVersions ?? (Ge.litHtmlVersions = [])).push("3.3.3");
const oi = (o, e, t) => {
  const n = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = n._$litPart$;
  if (i === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    n._$litPart$ = i = new it(e.insertBefore(tt(), r), r, void 0, t ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = globalThis;
class Oe extends De {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = oi(t, this.renderRoot, this.renderOptions);
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
var Jo;
Oe._$litElement$ = !0, Oe.finalized = !0, (Jo = xe.litElementHydrateSupport) == null || Jo.call(xe, { LitElement: Oe });
const Ht = xe.litElementPolyfillSupport;
Ht == null || Ht({ LitElement: Oe });
(xe.litElementVersions ?? (xe.litElementVersions = [])).push("4.2.2");
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Po(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(o, i).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Z(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Po(Object(t), !0).forEach(function(n) {
      ni(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : Po(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function mt(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? mt = function(e) {
    return typeof e;
  } : mt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, mt(o);
}
function ni(o, e, t) {
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
function ii(o, e) {
  if (o == null) return {};
  var t = {}, n = Object.keys(o), i, r;
  for (r = 0; r < n.length; r++)
    i = n[r], !(e.indexOf(i) >= 0) && (t[i] = o[i]);
  return t;
}
function ri(o, e) {
  if (o == null) return {};
  var t = ii(o, e), n, i;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(o);
    for (i = 0; i < r.length; i++)
      n = r[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(o, n) && (t[n] = o[n]);
  }
  return t;
}
var si = "1.15.6";
function te(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var ie = te(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), rt = te(/Edge/i), zo = te(/firefox/i), Ke = te(/safari/i) && !te(/chrome/i) && !te(/android/i), ho = te(/iP(ad|od|hone)/i), an = te(/chrome/i) && te(/android/i), ln = {
  capture: !1,
  passive: !1
};
function S(o, e, t) {
  o.addEventListener(e, t, !ie && ln);
}
function $(o, e, t) {
  o.removeEventListener(e, t, !ie && ln);
}
function $t(o, e) {
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
function dn(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function W(o, e, t, n) {
  if (o) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? o.parentNode === t && $t(o, e) : $t(o, e)) || n && o === t)
        return o;
      if (o === t) break;
    } while (o = dn(o));
  }
  return null;
}
var No = /\s+/g;
function B(o, e, t) {
  if (o && e)
    if (o.classList)
      o.classList[t ? "add" : "remove"](e);
    else {
      var n = (" " + o.className + " ").replace(No, " ").replace(" " + e + " ", " ");
      o.className = (n + (t ? " " + e : "")).replace(No, " ");
    }
}
function y(o, e, t) {
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
      var n = y(o, "transform");
      n && n !== "none" && (t = n + " " + t);
    } while (!e && (o = o.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(t);
}
function cn(o, e, t) {
  if (o) {
    var n = o.getElementsByTagName(e), i = 0, r = n.length;
    if (t)
      for (; i < r; i++)
        t(n[i], i);
    return n;
  }
  return [];
}
function K() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function M(o, e, t, n, i) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var r, s, a, l, d, p, c;
    if (o !== window && o.parentNode && o !== K() ? (r = o.getBoundingClientRect(), s = r.top, a = r.left, l = r.bottom, d = r.right, p = r.height, c = r.width) : (s = 0, a = 0, l = window.innerHeight, d = window.innerWidth, p = window.innerHeight, c = window.innerWidth), (e || t) && o !== window && (i = i || o.parentNode, !ie))
      do
        if (i && i.getBoundingClientRect && (y(i, "transform") !== "none" || t && y(i, "position") !== "static")) {
          var f = i.getBoundingClientRect();
          s -= f.top + parseInt(y(i, "border-top-width")), a -= f.left + parseInt(y(i, "border-left-width")), l = s + r.height, d = a + r.width;
          break;
        }
      while (i = i.parentNode);
    if (n && o !== window) {
      var _ = Me(i || o), k = _ && _.a, v = _ && _.d;
      _ && (s /= v, a /= k, c /= k, p /= v, l = s + p, d = a + c);
    }
    return {
      top: s,
      left: a,
      bottom: l,
      right: d,
      width: c,
      height: p
    };
  }
}
function Io(o, e, t) {
  for (var n = ce(o, !0), i = M(o)[e]; n; ) {
    var r = M(n)[t], s = void 0;
    if (s = i >= r, !s) return n;
    if (n === K()) break;
    n = ce(n, !1);
  }
  return !1;
}
function Ie(o, e, t, n) {
  for (var i = 0, r = 0, s = o.children; r < s.length; ) {
    if (s[r].style.display !== "none" && s[r] !== x.ghost && (n || s[r] !== x.dragged) && W(s[r], t.draggable, o, !1)) {
      if (i === e)
        return s[r];
      i++;
    }
    r++;
  }
  return null;
}
function uo(o, e) {
  for (var t = o.lastElementChild; t && (t === x.ghost || y(t, "display") === "none" || e && !$t(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function U(o, e) {
  var t = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== x.clone && (!e || $t(o, e)) && t++;
  return t;
}
function Ro(o) {
  var e = 0, t = 0, n = K();
  if (o)
    do {
      var i = Me(o), r = i.a, s = i.d;
      e += o.scrollLeft * r, t += o.scrollTop * s;
    } while (o !== n && (o = o.parentNode));
  return [e, t];
}
function ai(o, e) {
  for (var t in o)
    if (o.hasOwnProperty(t)) {
      for (var n in e)
        if (e.hasOwnProperty(n) && e[n] === o[t][n]) return Number(t);
    }
  return -1;
}
function ce(o, e) {
  if (!o || !o.getBoundingClientRect) return K();
  var t = o, n = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var i = y(t);
      if (t.clientWidth < t.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return K();
        if (n || e) return t;
        n = !0;
      }
    }
  while (t = t.parentNode);
  return K();
}
function li(o, e) {
  if (o && e)
    for (var t in e)
      e.hasOwnProperty(t) && (o[t] = e[t]);
  return o;
}
function Ft(o, e) {
  return Math.round(o.top) === Math.round(e.top) && Math.round(o.left) === Math.round(e.left) && Math.round(o.height) === Math.round(e.height) && Math.round(o.width) === Math.round(e.width);
}
var Ze;
function pn(o, e) {
  return function() {
    if (!Ze) {
      var t = arguments, n = this;
      t.length === 1 ? o.call(n, t[0]) : o.apply(n, t), Ze = setTimeout(function() {
        Ze = void 0;
      }, e);
    }
  };
}
function di() {
  clearTimeout(Ze), Ze = void 0;
}
function hn(o, e, t) {
  o.scrollLeft += e, o.scrollTop += t;
}
function un(o) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(o).cloneNode(!0) : t ? t(o).clone(!0)[0] : o.cloneNode(!0);
}
function fn(o, e, t) {
  var n = {};
  return Array.from(o.children).forEach(function(i) {
    var r, s, a, l;
    if (!(!W(i, e.draggable, o, !1) || i.animated || i === t)) {
      var d = M(i);
      n.left = Math.min((r = n.left) !== null && r !== void 0 ? r : 1 / 0, d.left), n.top = Math.min((s = n.top) !== null && s !== void 0 ? s : 1 / 0, d.top), n.right = Math.max((a = n.right) !== null && a !== void 0 ? a : -1 / 0, d.right), n.bottom = Math.max((l = n.bottom) !== null && l !== void 0 ? l : -1 / 0, d.bottom);
    }
  }), n.width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n;
}
var L = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function ci() {
  var o = [], e;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var n = [].slice.call(this.el.children);
        n.forEach(function(i) {
          if (!(y(i, "display") === "none" || i === x.ghost)) {
            o.push({
              target: i,
              rect: M(i)
            });
            var r = Z({}, o[o.length - 1].rect);
            if (i.thisAnimationDuration) {
              var s = Me(i, !0);
              s && (r.top -= s.f, r.left -= s.e);
            }
            i.fromRect = r;
          }
        });
      }
    },
    addAnimationState: function(n) {
      o.push(n);
    },
    removeAnimationState: function(n) {
      o.splice(ai(o, {
        target: n
      }), 1);
    },
    animateAll: function(n) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof n == "function" && n();
        return;
      }
      var r = !1, s = 0;
      o.forEach(function(a) {
        var l = 0, d = a.target, p = d.fromRect, c = M(d), f = d.prevFromRect, _ = d.prevToRect, k = a.rect, v = Me(d, !0);
        v && (c.top -= v.f, c.left -= v.e), d.toRect = c, d.thisAnimationDuration && Ft(f, c) && !Ft(p, c) && // Make sure animatingRect is on line between toRect & fromRect
        (k.top - c.top) / (k.left - c.left) === (p.top - c.top) / (p.left - c.left) && (l = hi(k, f, _, i.options)), Ft(c, p) || (d.prevFromRect = p, d.prevToRect = c, l || (l = i.options.animation), i.animate(d, k, c, l)), l && (r = !0, s = Math.max(s, l), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, l), d.thisAnimationDuration = l);
      }), clearTimeout(e), r ? e = setTimeout(function() {
        typeof n == "function" && n();
      }, s) : typeof n == "function" && n(), o = [];
    },
    animate: function(n, i, r, s) {
      if (s) {
        y(n, "transition", ""), y(n, "transform", "");
        var a = Me(this.el), l = a && a.a, d = a && a.d, p = (i.left - r.left) / (l || 1), c = (i.top - r.top) / (d || 1);
        n.animatingX = !!p, n.animatingY = !!c, y(n, "transform", "translate3d(" + p + "px," + c + "px,0)"), this.forRepaintDummy = pi(n), y(n, "transition", "transform " + s + "ms" + (this.options.easing ? " " + this.options.easing : "")), y(n, "transform", "translate3d(0,0,0)"), typeof n.animated == "number" && clearTimeout(n.animated), n.animated = setTimeout(function() {
          y(n, "transition", ""), y(n, "transform", ""), n.animated = !1, n.animatingX = !1, n.animatingY = !1;
        }, s);
      }
    }
  };
}
function pi(o) {
  return o.offsetWidth;
}
function hi(o, e, t, n) {
  return Math.sqrt(Math.pow(e.top - o.top, 2) + Math.pow(e.left - o.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * n.animation;
}
var Se = [], Lt = {
  initializeByDefault: !0
}, st = {
  mount: function(e) {
    for (var t in Lt)
      Lt.hasOwnProperty(t) && !(t in e) && (e[t] = Lt[t]);
    Se.forEach(function(n) {
      if (n.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Se.push(e);
  },
  pluginEvent: function(e, t, n) {
    var i = this;
    this.eventCanceled = !1, n.cancel = function() {
      i.eventCanceled = !0;
    };
    var r = e + "Global";
    Se.forEach(function(s) {
      t[s.pluginName] && (t[s.pluginName][r] && t[s.pluginName][r](Z({
        sortable: t
      }, n)), t.options[s.pluginName] && t[s.pluginName][e] && t[s.pluginName][e](Z({
        sortable: t
      }, n)));
    });
  },
  initializePlugins: function(e, t, n, i) {
    Se.forEach(function(a) {
      var l = a.pluginName;
      if (!(!e.options[l] && !a.initializeByDefault)) {
        var d = new a(e, t, e.options);
        d.sortable = e, d.options = e.options, e[l] = d, ne(n, d.defaults);
      }
    });
    for (var r in e.options)
      if (e.options.hasOwnProperty(r)) {
        var s = this.modifyOption(e, r, e.options[r]);
        typeof s < "u" && (e.options[r] = s);
      }
  },
  getEventProperties: function(e, t) {
    var n = {};
    return Se.forEach(function(i) {
      typeof i.eventProperties == "function" && ne(n, i.eventProperties.call(t[i.pluginName], e));
    }), n;
  },
  modifyOption: function(e, t, n) {
    var i;
    return Se.forEach(function(r) {
      e[r.pluginName] && r.optionListeners && typeof r.optionListeners[t] == "function" && (i = r.optionListeners[t].call(e[r.pluginName], n));
    }), i;
  }
};
function ui(o) {
  var e = o.sortable, t = o.rootEl, n = o.name, i = o.targetEl, r = o.cloneEl, s = o.toEl, a = o.fromEl, l = o.oldIndex, d = o.newIndex, p = o.oldDraggableIndex, c = o.newDraggableIndex, f = o.originalEvent, _ = o.putSortable, k = o.extraEventProperties;
  if (e = e || t && t[L], !!e) {
    var v, g = e.options, E = "on" + n.charAt(0).toUpperCase() + n.substr(1);
    window.CustomEvent && !ie && !rt ? v = new CustomEvent(n, {
      bubbles: !0,
      cancelable: !0
    }) : (v = document.createEvent("Event"), v.initEvent(n, !0, !0)), v.to = s || t, v.from = a || t, v.item = i || t, v.clone = r, v.oldIndex = l, v.newIndex = d, v.oldDraggableIndex = p, v.newDraggableIndex = c, v.originalEvent = f, v.pullMode = _ ? _.lastPutMode : void 0;
    var D = Z(Z({}, k), st.getEventProperties(n, e));
    for (var H in D)
      v[H] = D[H];
    t && t.dispatchEvent(v), g[E] && g[E].call(e, v);
  }
}
var fi = ["evt"], F = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = n.evt, r = ri(n, fi);
  st.pluginEvent.bind(x)(e, t, Z({
    dragEl: u,
    parentEl: T,
    ghostEl: w,
    rootEl: C,
    nextEl: ve,
    lastDownEl: _t,
    cloneEl: A,
    cloneHidden: de,
    dragStarted: Ye,
    putSortable: P,
    activeSortable: x.active,
    originalEvent: i,
    oldIndex: Ae,
    oldDraggableIndex: Je,
    newIndex: q,
    newDraggableIndex: ae,
    hideGhostForTarget: _n,
    unhideGhostForTarget: vn,
    cloneNowHidden: function() {
      de = !0;
    },
    cloneNowShown: function() {
      de = !1;
    },
    dispatchSortableEvent: function(a) {
      R({
        sortable: t,
        name: a,
        originalEvent: i
      });
    }
  }, r));
};
function R(o) {
  ui(Z({
    putSortable: P,
    cloneEl: A,
    targetEl: u,
    rootEl: C,
    oldIndex: Ae,
    oldDraggableIndex: Je,
    newIndex: q,
    newDraggableIndex: ae
  }, o));
}
var u, T, w, C, ve, _t, A, de, Ae, q, Je, ae, ct, P, Ce = !1, St = !1, Et = [], me, Y, jt, Bt, Ho, Fo, Ye, Ee, Qe, et = !1, pt = !1, vt, N, qt = [], Zt = !1, Dt = [], Pt = typeof document < "u", ht = ho, Lo = rt || ie ? "cssFloat" : "float", gi = Pt && !an && !ho && "draggable" in document.createElement("div"), gn = (function() {
  if (Pt) {
    if (ie)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
})(), bn = function(e, t) {
  var n = y(e), i = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), r = Ie(e, 0, t), s = Ie(e, 1, t), a = r && y(r), l = s && y(s), d = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + M(r).width, p = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + M(s).width;
  if (n.display === "flex")
    return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (n.display === "grid")
    return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (r && a.float && a.float !== "none") {
    var c = a.float === "left" ? "left" : "right";
    return s && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return r && (a.display === "block" || a.display === "flex" || a.display === "table" || a.display === "grid" || d >= i && n[Lo] === "none" || s && n[Lo] === "none" && d + p > i) ? "vertical" : "horizontal";
}, bi = function(e, t, n) {
  var i = n ? e.left : e.top, r = n ? e.right : e.bottom, s = n ? e.width : e.height, a = n ? t.left : t.top, l = n ? t.right : t.bottom, d = n ? t.width : t.height;
  return i === a || r === l || i + s / 2 === a + d / 2;
}, mi = function(e, t) {
  var n;
  return Et.some(function(i) {
    var r = i[L].options.emptyInsertThreshold;
    if (!(!r || uo(i))) {
      var s = M(i), a = e >= s.left - r && e <= s.right + r, l = t >= s.top - r && t <= s.bottom + r;
      if (a && l)
        return n = i;
    }
  }), n;
}, mn = function(e) {
  function t(r, s) {
    return function(a, l, d, p) {
      var c = a.options.group.name && l.options.group.name && a.options.group.name === l.options.group.name;
      if (r == null && (s || c))
        return !0;
      if (r == null || r === !1)
        return !1;
      if (s && r === "clone")
        return r;
      if (typeof r == "function")
        return t(r(a, l, d, p), s)(a, l, d, p);
      var f = (s ? a : l).options.group.name;
      return r === !0 || typeof r == "string" && r === f || r.join && r.indexOf(f) > -1;
    };
  }
  var n = {}, i = e.group;
  (!i || mt(i) != "object") && (i = {
    name: i
  }), n.name = i.name, n.checkPull = t(i.pull, !0), n.checkPut = t(i.put), n.revertClone = i.revertClone, e.group = n;
}, _n = function() {
  !gn && w && y(w, "display", "none");
}, vn = function() {
  !gn && w && y(w, "display", "");
};
Pt && !an && document.addEventListener("click", function(o) {
  if (St)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), St = !1, !1;
}, !0);
var _e = function(e) {
  if (u) {
    e = e.touches ? e.touches[0] : e;
    var t = mi(e.clientX, e.clientY);
    if (t) {
      var n = {};
      for (var i in e)
        e.hasOwnProperty(i) && (n[i] = e[i]);
      n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[L]._onDragOver(n);
    }
  }
}, _i = function(e) {
  u && u.parentNode[L]._isOutsideThisEl(e.target);
};
function x(o, e) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = e = ne({}, e), o[L] = this;
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
      return bn(o, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(s, a) {
      s.setData("Text", a.textContent);
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
    supportPointer: x.supportPointer !== !1 && "PointerEvent" in window && (!Ke || ho),
    emptyInsertThreshold: 5
  };
  st.initializePlugins(this, o, t);
  for (var n in t)
    !(n in e) && (e[n] = t[n]);
  mn(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : gi, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? S(o, "pointerdown", this._onTapStart) : (S(o, "mousedown", this._onTapStart), S(o, "touchstart", this._onTapStart)), this.nativeDraggable && (S(o, "dragover", this), S(o, "dragenter", this)), Et.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ne(this, ci());
}
x.prototype = /** @lends Sortable.prototype */
{
  constructor: x,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (Ee = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, u) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, n = this.el, i = this.options, r = i.preventOnFilter, s = e.type, a = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (a || e).target, d = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, p = i.filter;
      if (Ei(n), !u && !(/mousedown|pointerdown/.test(s) && e.button !== 0 || i.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Ke && l && l.tagName.toUpperCase() === "SELECT") && (l = W(l, i.draggable, n, !1), !(l && l.animated) && _t !== l)) {
        if (Ae = U(l), Je = U(l, i.draggable), typeof p == "function") {
          if (p.call(this, e, l, this)) {
            R({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: l,
              toEl: n,
              fromEl: n
            }), F("filter", t, {
              evt: e
            }), r && e.preventDefault();
            return;
          }
        } else if (p && (p = p.split(",").some(function(c) {
          if (c = W(d, c.trim(), n, !1), c)
            return R({
              sortable: t,
              rootEl: c,
              name: "filter",
              targetEl: l,
              fromEl: n,
              toEl: n
            }), F("filter", t, {
              evt: e
            }), !0;
        }), p)) {
          r && e.preventDefault();
          return;
        }
        i.handle && !W(d, i.handle, n, !1) || this._prepareDragStart(e, a, l);
      }
    }
  },
  _prepareDragStart: function(e, t, n) {
    var i = this, r = i.el, s = i.options, a = r.ownerDocument, l;
    if (n && !u && n.parentNode === r) {
      var d = M(n);
      if (C = r, u = n, T = u.parentNode, ve = u.nextSibling, _t = n, ct = s.group, x.dragged = u, me = {
        target: u,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, Ho = me.clientX - d.left, Fo = me.clientY - d.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, u.style["will-change"] = "all", l = function() {
        if (F("delayEnded", i, {
          evt: e
        }), x.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !zo && i.nativeDraggable && (u.draggable = !0), i._triggerDragStart(e, t), R({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), B(u, s.chosenClass, !0);
      }, s.ignore.split(",").forEach(function(p) {
        cn(u, p.trim(), Ut);
      }), S(a, "dragover", _e), S(a, "mousemove", _e), S(a, "touchmove", _e), s.supportPointer ? (S(a, "pointerup", i._onDrop), !this.nativeDraggable && S(a, "pointercancel", i._onDrop)) : (S(a, "mouseup", i._onDrop), S(a, "touchend", i._onDrop), S(a, "touchcancel", i._onDrop)), zo && this.nativeDraggable && (this.options.touchStartThreshold = 4, u.draggable = !0), F("delayStart", this, {
        evt: e
      }), s.delay && (!s.delayOnTouchOnly || t) && (!this.nativeDraggable || !(rt || ie))) {
        if (x.eventCanceled) {
          this._onDrop();
          return;
        }
        s.supportPointer ? (S(a, "pointerup", i._disableDelayedDrag), S(a, "pointercancel", i._disableDelayedDrag)) : (S(a, "mouseup", i._disableDelayedDrag), S(a, "touchend", i._disableDelayedDrag), S(a, "touchcancel", i._disableDelayedDrag)), S(a, "mousemove", i._delayedDragTouchMoveHandler), S(a, "touchmove", i._delayedDragTouchMoveHandler), s.supportPointer && S(a, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(l, s.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    u && Ut(u), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    $(e, "mouseup", this._disableDelayedDrag), $(e, "touchend", this._disableDelayedDrag), $(e, "touchcancel", this._disableDelayedDrag), $(e, "pointerup", this._disableDelayedDrag), $(e, "pointercancel", this._disableDelayedDrag), $(e, "mousemove", this._delayedDragTouchMoveHandler), $(e, "touchmove", this._delayedDragTouchMoveHandler), $(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? S(document, "pointermove", this._onTouchMove) : t ? S(document, "touchmove", this._onTouchMove) : S(document, "mousemove", this._onTouchMove) : (S(u, "dragend", this), S(C, "dragstart", this._onDragStart));
    try {
      document.selection ? yt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (Ce = !1, C && u) {
      F("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && S(document, "dragover", _i);
      var n = this.options;
      !e && B(u, n.dragClass, !1), B(u, n.ghostClass, !0), x.active = this, e && this._appendGhost(), R({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Y) {
      this._lastX = Y.clientX, this._lastY = Y.clientY, _n();
      for (var e = document.elementFromPoint(Y.clientX, Y.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(Y.clientX, Y.clientY), e !== t); )
        t = e;
      if (u.parentNode[L]._isOutsideThisEl(e), t)
        do {
          if (t[L]) {
            var n = void 0;
            if (n = t[L]._onDragOver({
              clientX: Y.clientX,
              clientY: Y.clientY,
              target: e,
              rootEl: t
            }), n && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = dn(t));
      vn();
    }
  },
  _onTouchMove: function(e) {
    if (me) {
      var t = this.options, n = t.fallbackTolerance, i = t.fallbackOffset, r = e.touches ? e.touches[0] : e, s = w && Me(w, !0), a = w && s && s.a, l = w && s && s.d, d = ht && N && Ro(N), p = (r.clientX - me.clientX + i.x) / (a || 1) + (d ? d[0] - qt[0] : 0) / (a || 1), c = (r.clientY - me.clientY + i.y) / (l || 1) + (d ? d[1] - qt[1] : 0) / (l || 1);
      if (!x.active && !Ce) {
        if (n && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < n)
          return;
        this._onDragStart(e, !0);
      }
      if (w) {
        s ? (s.e += p - (jt || 0), s.f += c - (Bt || 0)) : s = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: p,
          f: c
        };
        var f = "matrix(".concat(s.a, ",").concat(s.b, ",").concat(s.c, ",").concat(s.d, ",").concat(s.e, ",").concat(s.f, ")");
        y(w, "webkitTransform", f), y(w, "mozTransform", f), y(w, "msTransform", f), y(w, "transform", f), jt = p, Bt = c, Y = r;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!w) {
      var e = this.options.fallbackOnBody ? document.body : C, t = M(u, !0, ht, !0, e), n = this.options;
      if (ht) {
        for (N = e; y(N, "position") === "static" && y(N, "transform") === "none" && N !== document; )
          N = N.parentNode;
        N !== document.body && N !== document.documentElement ? (N === document && (N = K()), t.top += N.scrollTop, t.left += N.scrollLeft) : N = K(), qt = Ro(N);
      }
      w = u.cloneNode(!0), B(w, n.ghostClass, !1), B(w, n.fallbackClass, !0), B(w, n.dragClass, !0), y(w, "transition", ""), y(w, "transform", ""), y(w, "box-sizing", "border-box"), y(w, "margin", 0), y(w, "top", t.top), y(w, "left", t.left), y(w, "width", t.width), y(w, "height", t.height), y(w, "opacity", "0.8"), y(w, "position", ht ? "absolute" : "fixed"), y(w, "zIndex", "100000"), y(w, "pointerEvents", "none"), x.ghost = w, e.appendChild(w), y(w, "transform-origin", Ho / parseInt(w.style.width) * 100 + "% " + Fo / parseInt(w.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var n = this, i = e.dataTransfer, r = n.options;
    if (F("dragStart", this, {
      evt: e
    }), x.eventCanceled) {
      this._onDrop();
      return;
    }
    F("setupClone", this), x.eventCanceled || (A = un(u), A.removeAttribute("id"), A.draggable = !1, A.style["will-change"] = "", this._hideClone(), B(A, this.options.chosenClass, !1), x.clone = A), n.cloneId = yt(function() {
      F("clone", n), !x.eventCanceled && (n.options.removeCloneOnHide || C.insertBefore(A, u), n._hideClone(), R({
        sortable: n,
        name: "clone"
      }));
    }), !t && B(u, r.dragClass, !0), t ? (St = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : ($(document, "mouseup", n._onDrop), $(document, "touchend", n._onDrop), $(document, "touchcancel", n._onDrop), i && (i.effectAllowed = "move", r.setData && r.setData.call(n, i, u)), S(document, "drop", n), y(u, "transform", "translateZ(0)")), Ce = !0, n._dragStartId = yt(n._dragStarted.bind(n, t, e)), S(document, "selectstart", n), Ye = !0, window.getSelection().removeAllRanges(), Ke && y(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, n = e.target, i, r, s, a = this.options, l = a.group, d = x.active, p = ct === l, c = a.sort, f = P || d, _, k = this, v = !1;
    if (Zt) return;
    function g(qe, In) {
      F(qe, k, Z({
        evt: e,
        isOwner: p,
        axis: _ ? "vertical" : "horizontal",
        revert: s,
        dragRect: i,
        targetRect: r,
        canSort: c,
        fromSortable: f,
        target: n,
        completed: D,
        onMove: function(xo, Rn) {
          return ut(C, t, u, i, xo, M(xo), e, Rn);
        },
        changed: H
      }, In));
    }
    function E() {
      g("dragOverAnimationCapture"), k.captureAnimationState(), k !== f && f.captureAnimationState();
    }
    function D(qe) {
      return g("dragOverCompleted", {
        insertion: qe
      }), qe && (p ? d._hideClone() : d._showClone(k), k !== f && (B(u, P ? P.options.ghostClass : d.options.ghostClass, !1), B(u, a.ghostClass, !0)), P !== k && k !== x.active ? P = k : k === x.active && P && (P = null), f === k && (k._ignoreWhileAnimating = n), k.animateAll(function() {
        g("dragOverAnimationComplete"), k._ignoreWhileAnimating = null;
      }), k !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (n === u && !u.animated || n === t && !n.animated) && (Ee = null), !a.dragoverBubble && !e.rootEl && n !== document && (u.parentNode[L]._isOutsideThisEl(e.target), !qe && _e(e)), !a.dragoverBubble && e.stopPropagation && e.stopPropagation(), v = !0;
    }
    function H() {
      q = U(u), ae = U(u, a.draggable), R({
        sortable: k,
        name: "change",
        toEl: t,
        newIndex: q,
        newDraggableIndex: ae,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = W(n, a.draggable, t, !0), g("dragOver"), x.eventCanceled) return v;
    if (u.contains(e.target) || n.animated && n.animatingX && n.animatingY || k._ignoreWhileAnimating === n)
      return D(!1);
    if (St = !1, d && !a.disabled && (p ? c || (s = T !== C) : P === this || (this.lastPutMode = ct.checkPull(this, d, u, e)) && l.checkPut(this, d, u, e))) {
      if (_ = this._getDirection(e, n) === "vertical", i = M(u), g("dragOverValid"), x.eventCanceled) return v;
      if (s)
        return T = C, E(), this._hideClone(), g("revert"), x.eventCanceled || (ve ? C.insertBefore(u, ve) : C.appendChild(u)), D(!0);
      var z = uo(t, a.draggable);
      if (!z || wi(e, _, this) && !z.animated) {
        if (z === u)
          return D(!1);
        if (z && t === e.target && (n = z), n && (r = M(n)), ut(C, t, u, i, n, r, e, !!n) !== !1)
          return E(), z && z.nextSibling ? t.insertBefore(u, z.nextSibling) : t.appendChild(u), T = t, H(), D(!0);
      } else if (z && xi(e, _, this)) {
        var Q = Ie(t, 0, a, !0);
        if (Q === u)
          return D(!1);
        if (n = Q, r = M(n), ut(C, t, u, i, n, r, e, !1) !== !1)
          return E(), t.insertBefore(u, Q), T = t, H(), D(!0);
      } else if (n.parentNode === t) {
        r = M(n);
        var V = 0, fe, Fe = u.parentNode !== t, j = !bi(u.animated && u.toRect || i, n.animated && n.toRect || r, _), Le = _ ? "top" : "left", re = Io(n, "top", "top") || Io(u, "top", "top"), je = re ? re.scrollTop : void 0;
        Ee !== n && (fe = r[Le], et = !1, pt = !j && a.invertSwap || Fe), V = ki(e, n, r, _, j ? 1 : a.swapThreshold, a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold, pt, Ee === n);
        var ee;
        if (V !== 0) {
          var ge = U(u);
          do
            ge -= V, ee = T.children[ge];
          while (ee && (y(ee, "display") === "none" || ee === w));
        }
        if (V === 0 || ee === n)
          return D(!1);
        Ee = n, Qe = V;
        var Be = n.nextElementSibling, se = !1;
        se = V === 1;
        var dt = ut(C, t, u, i, n, r, e, se);
        if (dt !== !1)
          return (dt === 1 || dt === -1) && (se = dt === 1), Zt = !0, setTimeout(yi, 30), E(), se && !Be ? t.appendChild(u) : n.parentNode.insertBefore(u, se ? Be : n), re && hn(re, 0, je - re.scrollTop), T = u.parentNode, fe !== void 0 && !pt && (vt = Math.abs(fe - M(n)[Le])), H(), D(!0);
      }
      if (t.contains(u))
        return D(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    $(document, "mousemove", this._onTouchMove), $(document, "touchmove", this._onTouchMove), $(document, "pointermove", this._onTouchMove), $(document, "dragover", _e), $(document, "mousemove", _e), $(document, "touchmove", _e);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    $(e, "mouseup", this._onDrop), $(e, "touchend", this._onDrop), $(e, "pointerup", this._onDrop), $(e, "pointercancel", this._onDrop), $(e, "touchcancel", this._onDrop), $(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, n = this.options;
    if (q = U(u), ae = U(u, n.draggable), F("drop", this, {
      evt: e
    }), T = u && u.parentNode, q = U(u), ae = U(u, n.draggable), x.eventCanceled) {
      this._nulling();
      return;
    }
    Ce = !1, pt = !1, et = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Jt(this.cloneId), Jt(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ke && y(document.body, "user-select", ""), y(u, "transform", ""), e && (Ye && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), w && w.parentNode && w.parentNode.removeChild(w), (C === T || P && P.lastPutMode !== "clone") && A && A.parentNode && A.parentNode.removeChild(A), u && (this.nativeDraggable && $(u, "dragend", this), Ut(u), u.style["will-change"] = "", Ye && !Ce && B(u, P ? P.options.ghostClass : this.options.ghostClass, !1), B(u, this.options.chosenClass, !1), R({
      sortable: this,
      name: "unchoose",
      toEl: T,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), C !== T ? (q >= 0 && (R({
      rootEl: T,
      name: "add",
      toEl: T,
      fromEl: C,
      originalEvent: e
    }), R({
      sortable: this,
      name: "remove",
      toEl: T,
      originalEvent: e
    }), R({
      rootEl: T,
      name: "sort",
      toEl: T,
      fromEl: C,
      originalEvent: e
    }), R({
      sortable: this,
      name: "sort",
      toEl: T,
      originalEvent: e
    })), P && P.save()) : q !== Ae && q >= 0 && (R({
      sortable: this,
      name: "update",
      toEl: T,
      originalEvent: e
    }), R({
      sortable: this,
      name: "sort",
      toEl: T,
      originalEvent: e
    })), x.active && ((q == null || q === -1) && (q = Ae, ae = Je), R({
      sortable: this,
      name: "end",
      toEl: T,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    F("nulling", this), C = u = T = w = ve = A = _t = de = me = Y = Ye = q = ae = Ae = Je = Ee = Qe = P = ct = x.dragged = x.ghost = x.clone = x.active = null, Dt.forEach(function(e) {
      e.checked = !0;
    }), Dt.length = jt = Bt = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        u && (this._onDragOver(e), vi(e));
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
    for (var e = [], t, n = this.el.children, i = 0, r = n.length, s = this.options; i < r; i++)
      t = n[i], W(t, s.draggable, this.el, !1) && e.push(t.getAttribute(s.dataIdAttr) || Si(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var n = {}, i = this.el;
    this.toArray().forEach(function(r, s) {
      var a = i.children[s];
      W(a, this.options.draggable, i, !1) && (n[r] = a);
    }, this), t && this.captureAnimationState(), e.forEach(function(r) {
      n[r] && (i.removeChild(n[r]), i.appendChild(n[r]));
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
    var n = this.options;
    if (t === void 0)
      return n[e];
    var i = st.modifyOption(this, e, t);
    typeof i < "u" ? n[e] = i : n[e] = t, e === "group" && mn(n);
  },
  /**
   * Destroy
   */
  destroy: function() {
    F("destroy", this);
    var e = this.el;
    e[L] = null, $(e, "mousedown", this._onTapStart), $(e, "touchstart", this._onTapStart), $(e, "pointerdown", this._onTapStart), this.nativeDraggable && ($(e, "dragover", this), $(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Et.splice(Et.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!de) {
      if (F("hideClone", this), x.eventCanceled) return;
      y(A, "display", "none"), this.options.removeCloneOnHide && A.parentNode && A.parentNode.removeChild(A), de = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (de) {
      if (F("showClone", this), x.eventCanceled) return;
      u.parentNode == C && !this.options.group.revertClone ? C.insertBefore(A, u) : ve ? C.insertBefore(A, ve) : C.appendChild(A), this.options.group.revertClone && this.animate(u, A), y(A, "display", ""), de = !1;
    }
  }
};
function vi(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function ut(o, e, t, n, i, r, s, a) {
  var l, d = o[L], p = d.options.onMove, c;
  return window.CustomEvent && !ie && !rt ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = o, l.dragged = t, l.draggedRect = n, l.related = i || e, l.relatedRect = r || M(e), l.willInsertAfter = a, l.originalEvent = s, o.dispatchEvent(l), p && (c = p.call(d, l, s)), c;
}
function Ut(o) {
  o.draggable = !1;
}
function yi() {
  Zt = !1;
}
function xi(o, e, t) {
  var n = M(Ie(t.el, 0, t.options, !0)), i = fn(t.el, t.options, w), r = 10;
  return e ? o.clientX < i.left - r || o.clientY < n.top && o.clientX < n.right : o.clientY < i.top - r || o.clientY < n.bottom && o.clientX < n.left;
}
function wi(o, e, t) {
  var n = M(uo(t.el, t.options.draggable)), i = fn(t.el, t.options, w), r = 10;
  return e ? o.clientX > i.right + r || o.clientY > n.bottom && o.clientX > n.left : o.clientY > i.bottom + r || o.clientX > n.right && o.clientY > n.top;
}
function ki(o, e, t, n, i, r, s, a) {
  var l = n ? o.clientY : o.clientX, d = n ? t.height : t.width, p = n ? t.top : t.left, c = n ? t.bottom : t.right, f = !1;
  if (!s) {
    if (a && vt < d * i) {
      if (!et && (Qe === 1 ? l > p + d * r / 2 : l < c - d * r / 2) && (et = !0), et)
        f = !0;
      else if (Qe === 1 ? l < p + vt : l > c - vt)
        return -Qe;
    } else if (l > p + d * (1 - i) / 2 && l < c - d * (1 - i) / 2)
      return $i(e);
  }
  return f = f || s, f && (l < p + d * r / 2 || l > c - d * r / 2) ? l > p + d / 2 ? 1 : -1 : 0;
}
function $i(o) {
  return U(u) < U(o) ? 1 : -1;
}
function Si(o) {
  for (var e = o.tagName + o.className + o.src + o.href + o.textContent, t = e.length, n = 0; t--; )
    n += e.charCodeAt(t);
  return n.toString(36);
}
function Ei(o) {
  Dt.length = 0;
  for (var e = o.getElementsByTagName("input"), t = e.length; t--; ) {
    var n = e[t];
    n.checked && Dt.push(n);
  }
}
function yt(o) {
  return setTimeout(o, 0);
}
function Jt(o) {
  return clearTimeout(o);
}
Pt && S(document, "touchmove", function(o) {
  (x.active || Ce) && o.cancelable && o.preventDefault();
});
x.utils = {
  on: S,
  off: $,
  css: y,
  find: cn,
  is: function(e, t) {
    return !!W(e, t, e, !1);
  },
  extend: li,
  throttle: pn,
  closest: W,
  toggleClass: B,
  clone: un,
  index: U,
  nextTick: yt,
  cancelNextTick: Jt,
  detectDirection: bn,
  getChild: Ie,
  expando: L
};
x.get = function(o) {
  return o[L];
};
x.mount = function() {
  for (var o = arguments.length, e = new Array(o), t = 0; t < o; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(n) {
    if (!n.prototype || !n.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(n));
    n.utils && (x.utils = Z(Z({}, x.utils), n.utils)), st.mount(n);
  });
};
x.create = function(o, e) {
  return new x(o, e);
};
x.version = si;
var O = [], We, Qt, eo = !1, Yt, Wt, Ct, Xe;
function Di() {
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
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), jo(), xt(), di();
    },
    nulling: function() {
      Ct = Qt = We = eo = Xe = Yt = Wt = null, O.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, n) {
      var i = this, r = (t.touches ? t.touches[0] : t).clientX, s = (t.touches ? t.touches[0] : t).clientY, a = document.elementFromPoint(r, s);
      if (Ct = t, n || this.options.forceAutoScrollFallback || rt || ie || Ke) {
        Xt(t, this.options, a, n);
        var l = ce(a, !0);
        eo && (!Xe || r !== Yt || s !== Wt) && (Xe && jo(), Xe = setInterval(function() {
          var d = ce(document.elementFromPoint(r, s), !0);
          d !== l && (l = d, xt()), Xt(t, i.options, d, n);
        }, 10), Yt = r, Wt = s);
      } else {
        if (!this.options.bubbleScroll || ce(a, !0) === K()) {
          xt();
          return;
        }
        Xt(t, this.options, ce(a, !1), !1);
      }
    }
  }, ne(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function xt() {
  O.forEach(function(o) {
    clearInterval(o.pid);
  }), O = [];
}
function jo() {
  clearInterval(Xe);
}
var Xt = pn(function(o, e, t, n) {
  if (e.scroll) {
    var i = (o.touches ? o.touches[0] : o).clientX, r = (o.touches ? o.touches[0] : o).clientY, s = e.scrollSensitivity, a = e.scrollSpeed, l = K(), d = !1, p;
    Qt !== t && (Qt = t, xt(), We = e.scroll, p = e.scrollFn, We === !0 && (We = ce(t, !0)));
    var c = 0, f = We;
    do {
      var _ = f, k = M(_), v = k.top, g = k.bottom, E = k.left, D = k.right, H = k.width, z = k.height, Q = void 0, V = void 0, fe = _.scrollWidth, Fe = _.scrollHeight, j = y(_), Le = _.scrollLeft, re = _.scrollTop;
      _ === l ? (Q = H < fe && (j.overflowX === "auto" || j.overflowX === "scroll" || j.overflowX === "visible"), V = z < Fe && (j.overflowY === "auto" || j.overflowY === "scroll" || j.overflowY === "visible")) : (Q = H < fe && (j.overflowX === "auto" || j.overflowX === "scroll"), V = z < Fe && (j.overflowY === "auto" || j.overflowY === "scroll"));
      var je = Q && (Math.abs(D - i) <= s && Le + H < fe) - (Math.abs(E - i) <= s && !!Le), ee = V && (Math.abs(g - r) <= s && re + z < Fe) - (Math.abs(v - r) <= s && !!re);
      if (!O[c])
        for (var ge = 0; ge <= c; ge++)
          O[ge] || (O[ge] = {});
      (O[c].vx != je || O[c].vy != ee || O[c].el !== _) && (O[c].el = _, O[c].vx = je, O[c].vy = ee, clearInterval(O[c].pid), (je != 0 || ee != 0) && (d = !0, O[c].pid = setInterval((function() {
        n && this.layer === 0 && x.active._onTouchMove(Ct);
        var Be = O[this.layer].vy ? O[this.layer].vy * a : 0, se = O[this.layer].vx ? O[this.layer].vx * a : 0;
        typeof p == "function" && p.call(x.dragged.parentNode[L], se, Be, o, Ct, O[this.layer].el) !== "continue" || hn(O[this.layer].el, se, Be);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && f !== l && (f = ce(f, !1)));
    eo = d;
  }
}, 30), yn = function(e) {
  var t = e.originalEvent, n = e.putSortable, i = e.dragEl, r = e.activeSortable, s = e.dispatchSortableEvent, a = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var d = n || r;
    a();
    var p = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, c = document.elementFromPoint(p.clientX, p.clientY);
    l(), d && !d.el.contains(c) && (s("spill"), this.onSpill({
      dragEl: i,
      putSortable: n
    }));
  }
};
function fo() {
}
fo.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable;
    this.sortable.captureAnimationState(), n && n.captureAnimationState();
    var i = Ie(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(t, i) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
  },
  drop: yn
};
ne(fo, {
  pluginName: "revertOnSpill"
});
function go() {
}
go.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable, i = n || this.sortable;
    i.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), i.animateAll();
  },
  drop: yn
};
ne(go, {
  pluginName: "removeOnSpill"
});
x.mount(new Di());
x.mount(go, fo);
const X = "household_kanban";
function xn(o, e) {
  return o.connection.subscribeMessage((t) => e(t.board), { type: `${X}/subscribe` });
}
function ft(o, e, t) {
  return o.callService(X, "set_status", { uid: e, status: t });
}
function Ci(o, e) {
  return o.connection.sendMessagePromise({ type: `${X}/history`, ...e });
}
function Ai(o, e) {
  return o.callService(X, "create_item", { ...e });
}
function gt(o, e, t) {
  return o.callService(X, "update_item", { uid: e, ...t });
}
function Ti(o, e) {
  return o.callService(X, "delete_item", { uid: e });
}
function Oi(o, e) {
  return o.connection.sendMessagePromise({ type: "lovelace/config", url_path: e });
}
function Mi(o, e, t) {
  return o.connection.sendMessagePromise({ type: "lovelace/config/save", url_path: e, config: t });
}
function Pi(o) {
  return o.connection.sendMessagePromise({ type: `${X}/settings` });
}
function zi(o, e) {
  return o.connection.sendMessagePromise({ type: `${X}/settings/update`, ...e });
}
function Ni(o, e) {
  return o.connection.sendMessagePromise({ type: `${X}/parents/add`, ...e });
}
function Ii(o, e, t) {
  return o.connection.sendMessagePromise({ type: `${X}/parents/update`, parent_id: e, ...t });
}
function Ri(o, e, t) {
  return o.connection.sendMessagePromise({ type: `${X}/parents/remove`, parent_id: e, target: t });
}
const Hi = 864e5;
function I(o) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate());
}
const pe = (o) => String(o).padStart(2, "0");
function oe(o) {
  return `${o.getFullYear()}-${pe(o.getMonth() + 1)}-${pe(o.getDate())}`;
}
function Fi(o, e) {
  if (!o) return null;
  if (!e) return o;
  const [t, n, i] = o.split("-").map(Number), [r, s] = e.split(":").map(Number), a = -new Date(t, n - 1, i, r, s).getTimezoneOffset(), l = Math.abs(a);
  return `${o}T${pe(r)}:${pe(s)}:00${a < 0 ? "-" : "+"}${pe(Math.floor(l / 60))}:${pe(l % 60)}`;
}
function Li(o) {
  if (!o) return "";
  const { date: e, hasTime: t } = J(o);
  return t ? `${pe(e.getHours())}:${pe(e.getMinutes())}` : "";
}
function G(o, e) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate() + e);
}
function bo(o, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(o.getFullYear(), o.getMonth(), o.getDate())) / Hi);
}
function J(o) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(o)) {
    const [e, t, n] = o.split("-").map(Number);
    return { date: new Date(e, t - 1, n), hasTime: !1 };
  }
  return { date: new Date(o), hasTime: !0 };
}
function ji(o, e) {
  const t = I(o), n = (t.getDay() - e + 7) % 7, i = G(t, -n);
  return n === 6 ? { start: G(i, 7), end: G(i, 13) } : { start: i, end: G(i, 6) };
}
const Bi = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function Bo(o) {
  var n, i;
  const e = o == null ? void 0 : o.first_weekday, t = Bi.indexOf(e ?? "");
  if (t >= 0) return t;
  try {
    const r = new Intl.Locale((o == null ? void 0 : o.language) ?? "en"), s = (i = ((n = r.getWeekInfo) == null ? void 0 : n.call(r)) ?? r.weekInfo) == null ? void 0 : i.firstDay;
    if (s) return s % 7;
  } catch {
  }
  return 1;
}
function we(o, e) {
  const t = I(e.now);
  if (o.status === "completed")
    return !o.completed_at || !e.enabled.has("done") ? null : bo(new Date(o.completed_at), t) < e.doneDays ? "done" : null;
  if (!o.due) return "todo";
  const n = I(J(o.due).date), i = (...r) => r.find((s) => e.enabled.has(s)) ?? "todo";
  return n < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : i("today", "week") : +n == +t ? i("today", "week") : n <= e.week.end ? i("week") : i("later");
}
const qi = 8;
function qo(o, e, t) {
  return Math.hypot(o, e) >= qi;
}
function Ui(o, e, t) {
  const n = o.status === "completed" ? { status: "needs_action" } : {};
  if (typeof e == "number")
    return o.status === "needs_action" && o.priority === e ? null : { ...n, ...o.priority === e ? {} : { priority: e } };
  if (e === "overdue" || we(o, t) === e) return null;
  if (e === "done") return { status: "completed" };
  if (e === "todo") return { ...n, due: null };
  if (e === "week") return { ...n, due: oe(t.week.end) };
  if (e === "later") return { ...n, due: oe(G(t.week.end, 1)) };
  const i = I(t.now);
  return o.due && +I(J(o.due).date) == +i ? Object.keys(n).length ? n : null : { ...n, due: oe(i) };
}
function wn(o) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(o, 10));
}
function Yi(o) {
  const e = `custom:${o}`, t = (n) => {
    var i;
    for (const r of n.querySelectorAll("*")) {
      if (r.localName === "hui-error-card") {
        const s = r, a = s.config ?? s._config;
        ((a == null ? void 0 : a.type) === e || ((i = a == null ? void 0 : a.origConfig) == null ? void 0 : i.type) === e) && r.dispatchEvent(new Event("ll-rebuild", { bubbles: !0, composed: !0 }));
      }
      r.shadowRoot && t(r.shadowRoot);
    }
  };
  t(document);
}
const to = [];
function Wi() {
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
        for (const n of to) n(t);
      }
    });
  } catch {
  }
}
function kn(o, e) {
  let t = !1, n = !1;
  const i = (a = window.customElements) => {
    try {
      if (a.get(o)) return;
      a.define(o, e), t && Yi(o);
    } catch (l) {
      n || (n = !0, console.warn("household_kanban: could not register the card", l));
    }
  };
  i(), t = !0, to.length || Wi(), to.push(i), document.addEventListener("DOMContentLoaded", () => i()), window.addEventListener("load", () => i());
  const r = Date.now(), s = () => {
    i();
    const a = Date.now() - r;
    a < 2e4 && window.setTimeout(s, a < 3e3 ? 40 : 250);
  };
  window.setTimeout(s, 40);
}
const Uo = ["todo", "later", "week", "today", "overdue", "done"], Xi = ["todo", "week", "today", "done"], mo = [1, 3, 7, 30];
function Pe(o) {
  const e = o.columns ?? Xi, t = e.filter((r) => !Uo.includes(r));
  if (t.length) throw new Error(`Unknown column id: ${t.join(", ")}`);
  const n = new Set(e).add("todo"), i = {
    type: o.type,
    columns: Uo.filter((r) => n.has(r)),
    done_days: mo.find((r) => r === o.done_days) ?? 7,
    group: o.group === "priority" ? "priority" : "date"
  };
  return o.parents && (i.parents = o.parents), o.people && (i.people = o.people), i;
}
function oo(o, e, t, n) {
  const i = new Set(o ?? e);
  return n ? i.add(t) : i.delete(t), i.size === 0 || i.size === e.length ? void 0 : e.filter((r) => i.has(r));
}
function $n(o, e) {
  const t = { ...o, ...e };
  for (const n of ["parents", "people"]) n in e || delete t[n];
  return t;
}
function Vi(o) {
  const e = o.split("/").find(Boolean);
  return !e || e === "lovelace" ? null : e;
}
function Sn(o, e) {
  if (o === e) return !0;
  if (!o || !e || typeof o != "object" || typeof e != "object" || Array.isArray(o) !== Array.isArray(e)) return !1;
  const t = o, n = e, i = Object.keys(t);
  return i.length === Object.keys(n).length && i.every((r) => Object.hasOwn(n, r) && Sn(t[r], n[r]));
}
function Gi(o, e, t) {
  let n = 0;
  const i = (s) => Sn(s, e) ? (n++, t) : Array.isArray(s) ? s.map(i) : s && typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, l]) => [a, i(l)])) : s, r = i(o);
  return { config: n === 1 ? r : o, matches: n };
}
const En = {
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
  cl_list: "List",
  cl_add_ph: "Add item…",
  cl_remove: "Remove item",
  cl_more: "{n} more",
  cl_ticked: "{n} ticked",
  cl_hide_ticked: "Hide ticked",
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
}, Ki = {
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
  cl_list: "Seznam",
  cl_add_ph: "Přidat položku…",
  cl_remove: "Odebrat položku",
  cl_more: "{n} další",
  cl_ticked: "{n} odškrtnuté",
  cl_hide_ticked: "Skrýt odškrtnuté",
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
}, Zi = { en: En, cs: Ki };
function m(o, e, t = {}) {
  return (Zi[(o ?? "en").split("-")[0]] ?? En)[e].replace(/\{(\w+)\}/g, (i, r) => String(t[r] ?? ""));
}
const Yo = {
  en: {
    sum_open: { other: "{n} open" },
    sum_today: { other: "{n} for today" },
    sum_moved: { other: "{n} moved from yesterday" },
    sum_overdue: { other: "{n} overdue" },
    days: { one: "{n} day", other: "{n} days" }
  },
  cs: {
    sum_open: { one: "{n} otevřený", few: "{n} otevřené", other: "{n} otevřených" },
    sum_today: { other: "{n} na dnes" },
    sum_moved: { one: "{n} přesunutý ze včerejška", few: "{n} přesunuté ze včerejška", other: "{n} přesunutých ze včerejška" },
    sum_overdue: { other: "{n} po termínu" },
    days: { one: "{n} den", few: "{n} dny", other: "{n} dní" }
  }
};
function Te(o, e, t) {
  const n = (o ?? "en").split("-")[0], i = n in Yo ? n : "en", r = Yo[i][e];
  return (r[new Intl.PluralRules(i).select(t)] ?? r.other).replace("{n}", String(t));
}
const Ji = ["todo", "later", "week", "today", "done"], Tt = class Tt extends Oe {
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
    this._unsub || this._subbing || this._retry !== void 0 || !this.hass || !this.isConnected || (this._subbing = !0, xn(this.hass, (e) => {
      this._parents = e.parents;
    }).then((e) => {
      this._attempts = 0, this.isConnected ? this._unsub = e : e();
    }).catch((e) => {
      console.warn("household_kanban: editor subscribe failed", e), this.isConnected && (this._retry = window.setTimeout(() => {
        this._retry = void 0, this._sub();
      }, wn(this._attempts++)));
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
    this._config = Pe(t);
    const n = $n(this._raw, this._config);
    this._raw = n, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: n }, bubbles: !0, composed: !0 }));
  }
  _checks(e, t) {
    var r;
    const n = t.map((s) => s.id), i = (r = this._config) == null ? void 0 : r[e];
    return t.map((s) => h`<label class="row">
      <input type="checkbox" .checked=${!i || i.includes(s.id)}
        @change=${(a) => {
      var l;
      return this._set({ [e]: oo((l = this._config) == null ? void 0 : l[e], n, s.id, a.target.checked) });
    }} />
      <span>${s.name}</span>
    </label>`);
  }
  render() {
    var s, a;
    const e = this._config, t = this.hass;
    if (!e || !t) return b;
    const n = ((s = t.locale) == null ? void 0 : s.language) ?? t.language ?? "en", i = (l) => m(n, l), r = Object.entries(t.states).filter(([l]) => l.startsWith("person.")).map(([l, d]) => ({ id: l, name: String(d.attributes.friendly_name ?? l) }));
    return h`
      <h3>${i("ed_columns")}</h3>
      ${Ji.map((l) => {
      var d;
      return h`<label class="row">
        <input type="checkbox" role="switch" .checked=${((d = e.columns) == null ? void 0 : d.includes(l)) ?? !1} ?disabled=${l === "todo"}
          @change=${(p) => {
        const c = p.target.checked;
        this._set({ columns: (e.columns ?? []).filter((f) => f !== l).concat(c ? [l] : []) });
      }} />
        <span>${i(`col_${l}`)}</span>
      </label>`;
    })}
      ${(a = e.columns) != null && a.includes("done") ? h`
        <div class="row"><span class="grow">${i("ed_done_days")}</span>
          <div class="seg" role="radiogroup" aria-label=${i("ed_done_days")}>
            ${mo.map((l) => h`<button type="button" role="radio" aria-checked=${e.done_days === l}
              @click=${() => this._set({ done_days: l })}>${l}</button>`)}
          </div>
        </div>` : b}
      <h3>${i("group_label")}</h3>
      <select aria-label=${i("group_label")} @change=${(l) => this._set({ group: l.target.value })}>
        <option value="date" ?selected=${e.group === "date"}>${i("group_date")}</option>
        <option value="priority" ?selected=${e.group === "priority"}>${i("group_priority")}</option>
      </select>
      <h3>${i("filter_parents")}</h3>
      ${this._checks("parents", this._parents)}
      <h3>${i("filter_people")}</h3>
      ${this._checks("people", r)}`;
  }
};
Tt.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _parents: { state: !0 }
}, Tt.styles = en`
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
let no = Tt;
kn("household-kanban-card-editor", no);
const Qi = en`
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
  .note { font-size: 13px; line-height: 1.4; color: var(--kb-text-2); overflow-wrap: anywhere; }
  .note.clamp { display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }
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
`, er = /^- \[( |x|X)\] (.+)$/;
function _o(o) {
  const e = o.replace(/\r\n?/g, `
`).trimEnd().split(`
`), t = [];
  for (let n; e.length && (n = er.exec(e[e.length - 1])); e.pop()) t.unshift({ done: n[1] !== " ", text: n[2] });
  return { note: e.join(`
`).trimEnd(), lines: t };
}
const $e = (o) => [...o.filter((e) => !e.done), ...o.filter((e) => e.done)];
function vo(o, e) {
  const t = $e(e).map((i) => `- [${i.done ? "x" : " "}] ${i.text}`).join(`
`), n = o.trimEnd();
  return n && t ? `${n}

${t}` : n || t;
}
const Dn = (o, e) => $e($e(o).map((t, n) => n === e ? { ...t, done: !t.done } : t)), tr = (o, e) => $e(o).filter((t, n) => n !== e);
function or(o, e) {
  const t = e.replace(/[\r\n]+/g, " ").trim();
  return t ? $e([...o, { done: !1, text: t }]) : o;
}
const yo = (o) => ({ done: o.filter((e) => e.done).length, total: o.length });
function Cn(o, e = {}) {
  const t = e.clamp ? `-webkit-line-clamp:${e.clamp}` : b, n = e.clamp ? "note clamp" : "note";
  return customElements.get("ha-markdown") ? h`<div class=${n} style=${t}><ha-markdown .content=${o} breaks></ha-markdown></div>` : h`<div class="${n} plain" style=${t}>${o}</div>`;
}
function nr(o, e, t, n) {
  const i = (c, f) => ({
    value: o.slice(0, e) + c + o.slice(e, t) + f + o.slice(t),
    start: e + c.length,
    end: t + c.length
  });
  if (n === "bold") return i("**", "**");
  if (n === "italic") return i("*", "*");
  if (n === "link")
    return { ...i("[", "](https://)"), start: t + 3, end: t + 3 + 8 };
  const r = o.lastIndexOf(`
`, e - 1) + 1, s = o.indexOf(`
`, t), a = s < 0 ? o.length : s, l = o.slice(r, a).split(`
`), d = l.every((c) => c.startsWith("- ")), p = l.map((c) => d ? c.slice(2) : `- ${c}`).join(`
`);
  return { value: o.slice(0, r) + p + o.slice(a), start: r, end: r + p.length };
}
const io = ".check, .cl button, .note a", ir = 5, An = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], at = (o) => `c-${An.includes(o) ? o : "grey"}`;
function lt(o, e) {
  var t;
  return String(((t = o.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function rr(o) {
  return o.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function He(o, e = !1) {
  return h`<span class="dot ${e ? "sm" : ""} ${at((o == null ? void 0 : o.color) ?? "grey")}"><ha-icon .icon=${(o == null ? void 0 : o.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function ue(o, e, t = "", n = !1) {
  var a;
  if (!e) return h`<span class="ava none ${t}" title="-">+</span>`;
  const i = lt(o, e), r = (a = o.states[e]) == null ? void 0 : a.attributes.entity_picture;
  if (typeof r == "string" && r) return h`<img class="ava ${t}" src=${r} alt=${n ? "" : i} title=${i} />`;
  const s = [...i].reduce((l, d) => (l * 31 + d.charCodeAt(0)) % 360, 7);
  return h`<span class="ava ${t}" title=${i} style="background:linear-gradient(135deg,hsl(${s} 55% 62%),hsl(${(s + 25) % 360} 55% 42%))">${rr(i)}</span>`;
}
const Tn = h`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function sr(o, e) {
  const t = o.status === "completed";
  return h`<button class="check" type="button" aria-pressed=${t} aria-label=${o.summary}
    @click=${() => e.onToggle(o)}>${Tn}</button>`;
}
function ar(o, e) {
  const { date: t, hasTime: n } = J(o.due), i = bo(I(e.now), t);
  let r;
  return i === -1 ? r = m(e.lang, "yesterday") : i < -1 ? r = m(e.lang, "days_ago", { n: -i }) : i === 0 ? r = m(e.lang, "today") : i === 1 ? r = m(e.lang, "tomorrow") : r = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), n ? `${r} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : r;
}
function lr(o, e) {
  const t = bo(new Date(o.completed_at), I(e.now));
  return t <= 0 ? m(e.lang, "done_today") : t === 1 ? m(e.lang, "done_yesterday") : m(e.lang, "done_days_ago", { n: t });
}
function On(o, e, t) {
  const n = o.status === "completed", i = e.parents.find((_) => _.id === o.parent), r = I(e.now), s = !n && o.due && I(J(o.due).date) < r, a = !n && o.due && +I(J(o.due).date) == +r, l = h`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`, { note: d, lines: p } = _o(o.description), c = $e(p), f = yo(c);
  return h`<article class="card ${n ? "done" : ""}" data-uid=${o.uid} @click=${(_) => {
    _.target.closest(io) || e.onOpen(o, _);
  }}>
    <div class="row">
      ${He(i, !0)}
      <span class="parent-name">${(i == null ? void 0 : i.name) ?? o.parent}</span>
      ${ue(e.hass, o.assignee)}
    </div>
    <div class="row top">
      ${f.total ? b : sr(o, e)}
      <button class="title" type="button">${o.summary}</button>
      ${f.total ? h`<span class="pill c-green cl-progress">${f.done}/${f.total}</span>` : b}
    </div>
    ${d ? Cn(d, { clamp: 3 }) : b}
    ${f.total ? dr(o, d, c, e) : b}
    <div class="pills">
      ${!n && t ? h`<span class="pill prio-${o.priority} ${at(["", "red", "orange", "grey"][o.priority])}">${l}${m(e.lang, `prio_${o.priority}`)}</span>` : b}
      ${!n && o.moved > 0 ? h`<span class="pill c-orange">${m(e.lang, o.raised ? "moved_raised" : "moved", { n: o.moved })}</span>` : b}
      ${n && o.completed_at ? h`<span class="pill c-green">${lr(o, e)}</span>` : b}
      ${!n && o.due ? h`<span class="pill ${s ? "c-red" : a ? "today" : "later"}">${ar(o, e)}</span>` : b}
    </div>
  </article>`;
}
function dr(o, e, t, n) {
  const i = (c, f = 0) => m(n.lang, c, { n: f }), r = yo(t), s = r.total - r.done, a = n.expanded.has(o.uid), l = a ? t : t.slice(0, Math.min(s, ir)), d = s - l.filter((c) => !c.done).length, p = a ? i("cl_hide_ticked") : `+ ${[d ? i("cl_more", d) : "", r.done ? i("cl_ticked", r.done) : ""].filter(Boolean).join(" · ")}`;
  return h`<div class="cl-bar"><span style="width:${Math.round(r.done / r.total * 100)}%"></span></div>
    <div class="cl">
      ${l.map((c, f) => h`<button class="cl-row" type="button" role="checkbox" aria-checked=${c.done}
        @click=${() => n.onLines(o, vo(e, Dn(t, f)))}><span class="cl-box">${Tn}</span><span class="cl-t">${c.text}</span></button>`)}
      ${a || d || r.done ? h`<button class="link muted cl-more" type="button" @click=${() => n.onExpand(o.uid, !a)}>${p}</button>` : b}
      ${!s && o.status !== "completed" ? h`<div class="cl-alldone"><span>${i("cl_all_done")}</span>
        <button class="pill-btn" type="button" @click=${() => n.onToggle(o)}>${i("cl_mark_done")}</button></div>` : b}
    </div>`;
}
function Mn(o) {
  const { note: e, lines: t } = _o(o.description);
  return {
    uid: o.uid,
    status: o.status,
    heading: o.summary,
    parent: o.parent,
    summary: o.summary,
    description: e,
    lines: $e(t),
    preview: e !== "",
    priority: o.priority,
    assignee: o.assignee,
    date: o.due ? oe(J(o.due).date) : "",
    time: Li(o.due),
    confirmDelete: !1
  };
}
function cr(o, e = {}) {
  return { status: "needs_action", heading: "", parent: o, summary: "", description: "", lines: [], preview: !1, priority: 2, assignee: null, date: "", time: "", confirmDelete: !1, ...e };
}
function Pn(o) {
  return {
    summary: o.summary.trim(),
    description: vo(o.description, o.lines),
    due: Fi(o.date, o.date ? o.time : ""),
    priority: o.priority,
    assignee: o.assignee,
    parent: o.parent
  };
}
function Wo(o, e) {
  const t = Pn(e), n = Mn(o), i = {};
  t.summary !== o.summary && (i.summary = t.summary);
  const { note: r, lines: s } = _o(o.description);
  return t.description !== vo(r, s) && (i.description = t.description), (e.date !== n.date || e.time !== n.time) && (i.due = t.due), t.priority !== o.priority && (i.priority = t.priority), t.assignee !== o.assignee && (i.assignee = t.assignee), t.parent !== o.parent && (i.parent = t.parent), i;
}
function wt(o, e) {
  const t = I(e);
  return o === "none" ? "" : oe(o === "today" ? t : o === "tomorrow" ? G(t, 1) : G(t, (6 - t.getDay() + 7) % 7));
}
const pr = h`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
function hr(o, e) {
  var s;
  const t = (a) => m(e.lang, a), n = !o.uid, i = ["today", "tomorrow", "weekend", "none"], r = (a) => {
    a.target === a.currentTarget && e.onClose();
  };
  return h`<dialog class="kb-dialog" aria-label=${n ? t("new_task") : o.heading} @close=${e.onClose} @click=${r}>
    <div class="dlg">
      <div class="dlg-head">
        <span class="dlg-kicker">${t(n ? "new_note" : "f_title")}</span>
        ${n ? b : h`<button class="pill-btn ${o.status === "completed" ? "on" : ""}" type="button" @click=${e.onToggleDone}>
          ${t(o.status === "completed" ? "mark_open" : "mark_done")}</button>`}
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>

      ${e.error ? h`<div class="notice" role="alert">${t(e.error)}</div>` : b}
      <label class="vis-hidden" for="kb-title">${t("f_title")}</label>
      <input id="kb-title" class="dlg-title" type="text" autocomplete="off" .value=${o.summary} placeholder=${t("f_title_ph")}
        @input=${(a) => e.onChange({ summary: a.target.value })} />

      ${o.lines.length || (s = e.parents.find((a) => a.id === o.parent)) != null && s.checklist ? br(o, e) : b}

      <div class="field">
        <div class="row"><span class="dlg-label grow">${t("f_note")}</span>
          ${o.preview ? b : ur.map(([a, l]) => h`<button class="fmt-btn" type="button" data-fmt=${a} aria-label=${t(`fmt_${a}`)}
            @click=${(d) => Xo(d, a, e)}>${l}</button>`)}
          <span class="seg2" role="group">
            <button class="pill-btn ${o.preview ? "" : "on"}" type="button" aria-pressed=${!o.preview} @click=${() => e.onChange({ preview: !1 })}>${t("note_edit")}</button>
            <button class="pill-btn ${o.preview ? "on" : ""}" type="button" aria-pressed=${o.preview} @click=${() => e.onChange({ preview: !0 })}>${t("note_preview")}</button>
          </span></div>
        ${o.preview ? Cn(o.description) : h`<textarea rows="3" aria-label=${t("f_note")} .value=${o.description} placeholder=${t("f_note_ph")}
          @input=${(a) => e.onChange({ description: a.target.value })}
          @keydown=${(a) => {
    const l = a.key.toLowerCase();
    (a.ctrlKey || a.metaKey) && (l === "b" || l === "i") && (a.preventDefault(), Xo(a, l === "b" ? "bold" : "italic", e));
  }}></textarea>`}
      </div>

      <div class="field"><span class="dlg-label">${t("f_parent")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_parent")}>
          ${e.parents.map((a) => h`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${o.parent === a.id}
            @click=${() => e.onChange({ parent: a.id })}>${He(a, !0)}${a.name}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_prio")}</span>
        <div class="seg3" role="radiogroup" aria-label=${t("f_prio")}>
          ${[1, 2, 3].map((a) => h`<button type="button" role="radio" aria-checked=${o.priority === a}
            class="prio-${a}" @click=${() => e.onChange({ priority: a })}>${pr}${t(`prio_${a}`)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_due")}</span>
        <div class="chips">
          ${i.map((a) => h`<button class="pill-btn ${wt(a, e.now) === o.date ? "on" : ""}" type="button"
            aria-pressed=${wt(a, e.now) === o.date}
            @click=${() => e.onChange({ date: wt(a, e.now), ...a === "none" ? { time: "" } : {} })}>${t(`q_${a}`)}</button>`)}
          <label class="pill-input"><span class="vis-hidden">${t("f_date")}</span>
            <input type="date" .value=${o.date} @input=${(a) => e.onChange({ date: a.target.value })} /></label>
          <label class="pill-input"><span class="vis-hidden">${t("f_time")}</span>
            <input type="time" .value=${o.time} ?disabled=${!o.date} @input=${(a) => e.onChange({ time: a.target.value })} /></label>
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_who")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_who")}>
          <button class="chip dlg-chip" type="button" role="radio" aria-checked=${o.assignee === null}
            @click=${() => e.onChange({ assignee: null })}>${ue(e.hass, null, "", !0)}${t("unassigned")}</button>
          ${e.people.map((a) => h`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${o.assignee === a}
            @click=${() => e.onChange({ assignee: a })}>${ue(e.hass, a, "", !0)}${lt(e.hass, a)}</button>`)}
        </div></div>

      <div class="dlg-foot">
        ${n ? b : o.confirmDelete ? h`<span class="danger-text" role="alert">${t("delete_confirm")}</span>
              <button class="danger-btn" type="button" ?disabled=${e.busy} @click=${e.onDelete}>${t("delete_yes")}</button>
              <button class="pill-btn" type="button" @click=${() => e.onChange({ confirmDelete: !1 })}>${t("cancel")}</button>` : h`<button class="danger-link" type="button" @click=${() => e.onChange({ confirmDelete: !0 })}>${t("delete")}</button>`}
        <span class="grow"></span>
        ${o.confirmDelete ? b : h`
          <button class="pill-btn" type="button" @click=${e.onClose}>${t("cancel")}</button>
          <button class="primary-btn" type="button" ?disabled=${!o.summary.trim() || e.busy} @click=${e.onSave}>${t("save")}</button>`}
      </div>
    </div>
  </dialog>`;
}
const ur = [
  ["bold", h`<b>B</b>`],
  ["italic", h`<i>I</i>`],
  ["bullets", "•"],
  ["link", "🔗"]
];
function Xo(o, e, t) {
  var r;
  const n = (r = o.currentTarget.closest(".field")) == null ? void 0 : r.querySelector("textarea");
  if (!n) return;
  const i = nr(n.value, n.selectionStart, n.selectionEnd, e);
  n.value = i.value, n.focus(), n.setSelectionRange(i.start, i.end), t.onChange({ description: i.value });
}
const fr = h`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>`, gr = h`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function br(o, e) {
  const t = (s) => m(e.lang, s), n = yo(o.lines), i = o.lines.findIndex((s) => s.done), r = (s) => {
    const a = or(o.lines, s.value);
    s.value = "", a !== o.lines && e.onChange({ lines: a });
  };
  return h`<section class="field cl-list">
    <div class="row"><span class="dlg-label grow">${t("cl_list")}</span>
      ${n.total ? h`<span class="pill c-green">${n.done}/${n.total}</span>` : b}</div>
    <div class="cl-box-list">
      ${o.lines.map((s, a) => h`<div class="cl-item ${s.done ? "done" : ""} ${a === i && a > 0 ? "first-done" : ""}">
        <button class="cl-check" type="button" role="checkbox" aria-checked=${s.done} aria-label=${s.text}
          @click=${() => e.onChange({ lines: Dn(o.lines, a) })}>${gr}</button>
        <span class="cl-text">${s.text}</span>
        <button class="cl-x" type="button" aria-label=${t("cl_remove")} @click=${() => e.onChange({ lines: tr(o.lines, a) })}>${fr}</button>
      </div>`)}
      <label class="cl-add"><span aria-hidden="true">+</span>
        <input type="text" autocomplete="off" placeholder=${t("cl_add_ph")} aria-label=${t("cl_add_ph")}
          @keydown=${(s) => {
    s.key === "Enter" && !s.isComposing && (s.preventDefault(), r(s.target));
  }}
          @blur=${(s) => r(s.target)} /></label>
    </div>
  </section>`;
}
function Vo(o) {
  if (!o.due) return 1 / 0;
  const { date: e, hasTime: t } = J(o.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function At(o, e) {
  const t = Vo(o), n = Vo(e);
  return t !== n ? t < n ? -1 : 1 : o.priority - e.priority || +new Date(o.created_at) - +new Date(e.created_at);
}
const mr = ["todo", "later", "week", "overdue", "today", "done"], zn = (o, e) => +new Date(e.completed_at ?? 0) - +new Date(o.completed_at ?? 0);
function _r(o, e, t) {
  const { ctx: n } = e, i = o.filter((l) => l.status === "needs_action"), r = o.filter((l) => we(l, n) === "done").sort(zn), s = o.filter((l) => l.status === "completed").length - r.length, a = e.group === "date" ? mr.filter((l) => l !== "done" && (l === "todo" || n.enabled.has(l))).map((l) => ({
    id: l,
    label: m(t, `col_${l}`),
    led: l === "overdue" ? "rgb(var(--c-red))" : l === "week" || l === "today" ? "var(--kb-accent)" : void 0,
    items: i.filter((d) => we(d, n) === l).sort(At)
  })) : [1, 2, 3].map((l) => ({
    id: `p${l}`,
    label: m(t, `prio_${l}`),
    led: l === 1 ? "rgb(var(--c-red))" : l === 2 ? "rgb(var(--c-orange))" : void 0,
    items: i.filter((d) => d.priority === l).sort(At)
  }));
  return n.enabled.has("done") && a.push({ id: "done", label: m(t, "col_done"), led: "rgb(var(--c-green))", items: r, done: !0 }), { cols: a, olderDone: s };
}
function vr(o, e, t) {
  const { cols: n, olderDone: i } = _r(o, e, t.lang);
  return h`<div class="board">${n.map((r) => h`<section class="col" data-col=${r.id}>
      <div class="col-head">
        <span class="led" style=${r.led ? `background:${r.led}` : ""}></span>
        <span class="label">${r.label}</span><span class="count">${r.items.length}</span>
        ${r.done || r.id === "overdue" ? b : h`<button class="add" type="button" aria-label=${`${m(t.lang, "add_here")}: ${r.label}`} @click=${() => e.onAdd(r.id)}>+</button>`}
      </div>
      ${r.items.map((s) => On(s, t, e.group === "date"))}
      ${r.done ? h`<button class="note note-btn" type="button" @click=${e.onHistory}>${m(t.lang, "done_note", { days: e.ctx.doneDays, older: i })}</button>` : b}
      ${!r.done && r.items.length === 0 ? h`<div class="empty">${m(t.lang, "nothing")}</div>` : b}
    </section>`)}</div>`;
}
const yr = ["today", "week", "todo", "done"];
function xr(o, e) {
  return h`<dialog class="sheet kb-sheet" aria-label=${o.title}
    @cancel=${(t) => {
    t.preventDefault(), o.onCancel();
  }}
    @click=${(t) => {
    t.target === t.currentTarget && o.onClose();
  }}>
    <div class="grabber"><span></span></div>
    <div class="sheet-head">
      <span class="dot ${at(o.color)}"><ha-icon .icon=${o.icon}></ha-icon></span>
      <h2>${o.title}</h2>
      <span class="count">${o.count}</span>
      <button class="round-btn sclose" type="button" aria-label=${m(e.lang, "close")} @click=${o.onClose}>✕</button>
    </div>
    <div class="sheet-list" @pointerdown=${o.press.down} @pointermove=${o.press.move} @pointerup=${o.press.end}
      @pointercancel=${o.press.end} @pointerleave=${o.press.end} @contextmenu=${(t) => t.preventDefault()}>
      ${o.entries.map((t) => On(t, e, !0))}
      ${o.entries.length === 0 ? h`<div class="empty">${m(e.lang, "nothing")}</div>` : b}
      ${o.isDone ? h`<button class="pill-btn hist-link" type="button" @click=${o.onHistory}>${m(e.lang, "older_history", { n: o.olderDone })}</button>` : b}
    </div>
    ${o.menu ? wr(o.menu, o, e) : b}
  </dialog>`;
}
function wr(o, e, t) {
  return h`<div class="menu-wrap" @click=${(n) => {
    n.target === n.currentTarget && e.onMenuClose();
  }}>
    <div class="menu" role="group" aria-label=${m(t.lang, "move_to")}>
      <div class="menu-title">${m(t.lang, "move_to")}<small>${o.summary}</small></div>
      ${yr.map((n) => h`<button class="menu-btn" type="button" data-move=${n} @click=${() => e.onMove(o, n)}>${m(t.lang, `col_${n}`)}</button>`)}
      <button class="menu-btn muted" type="button" @click=${e.onMenuClose}>${m(t.lang, "cancel")}</button>
    </div>
  </div>`;
}
function kr(o, e) {
  const t = { todo: 0, later: 0, week: 0, today: 0, overdue: 0, done: 0 }, n = I(e.now), i = [];
  let r = 0;
  for (const a of o) {
    const l = we(a, e);
    l && t[l]++, l === "today" && i.push(a), l === "today" && a.due && I(J(a.due).date) < n && r++;
  }
  const s = i.sort(At).slice(0, 3);
  return { counts: t, overdue: r, preview: s };
}
const ro = {
  today: { icon: "mdi:calendar-today", color: "blue" },
  overdue: { icon: "mdi:alert-circle-outline", color: "red" },
  week: { icon: "mdi:calendar-week", color: "indigo" },
  todo: { icon: "mdi:format-list-checks", color: "teal" },
  later: { icon: "mdi:calendar-clock", color: "purple" },
  done: { icon: "mdi:check-circle-outline", color: "green" }
}, $r = ["today", "overdue", "week", "todo", "later", "done"];
function Sr(o, e) {
  const t = kr(o.items, o.ctx), n = o.items.filter((i) => i.status === "needs_action");
  return h`<div class="tiles-view">
    <div class="people ${o.who ? "has-filter" : ""}" role="group" aria-label=${m(e.lang, "filter_people")}>
      ${o.people.map((i) => {
    const r = o.who === i;
    return h`<button class="person" type="button" aria-pressed=${r} @click=${() => o.onWho(r ? null : i)}>
          ${ue(e.hass, i, "lg", !0)}<span>${lt(e.hass, i)}</span></button>`;
  })}
    </div>
    <div class="tiles">
      ${$r.filter((i) => o.ctx.enabled.has(i)).map((i) => {
    const r = i === "today" || i === "done", s = i === "today" ? t.overdue : 0;
    return h`<button class="tile ${r ? "wide" : ""} ${at(ro[i].color)}" type="button" data-tile=${i} @click=${() => o.onTile(i)}>
          <span class="row">
            <span class="dot"><ha-icon .icon=${ro[i].icon}></ha-icon></span>
            <span class="tile-label">${m(e.lang, `col_${i}`)}</span>
            ${s > 0 ? h`<span class="pill c-red">${Te(e.lang, "sum_overdue", s)}</span>` : b}
          </span>
          <span class="tile-count">${t.counts[i]}</span>
          ${i === "today" ? h`<span class="preview">${t.preview.map((a) => h`<span class="row">
            <span class="mark"></span><span class="t">${a.summary}</span>${a.assignee ? ue(e.hass, a.assignee, "xs", !0) : b}</span>`)}</span>` : b}
        </button>`;
  })}
    </div>
    <span class="dlg-label tiles-h">${m(e.lang, "lists")}</span>
    <div class="plist">
      ${e.parents.map((i) => h`<button class="prow" type="button" data-parent=${i.id} @click=${() => o.onParent(i.id)}>
        ${He(i)}<span class="pname">${i.name}</span>
        <span class="pcount">${n.filter((r) => r.parent === i.id).length}</span><span aria-hidden="true">›</span></button>`)}
    </div>
  </div>`;
}
function Er(o, e, t, n, i) {
  const r = n.filter((a) => a.status === "needs_action" && (!e.who || a.assignee === e.who)), s = (a) => {
    const l = e.parent === ((a == null ? void 0 : a.id) ?? null), d = r.filter((p) => !a || p.parent === a.id).length;
    return h`<button class="chip ${a ? at(a.color) : ""}" type="button" aria-pressed=${l}
      @click=${() => i({ parent: l ? null : (a == null ? void 0 : a.id) ?? null })}>
      ${He(a ?? void 0)}<span>${(a == null ? void 0 : a.name) ?? m(o.lang, "all_parents")}</span><b>${d}</b></button>`;
  };
  return h`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${m(o.lang, "filter_people")}>
      ${t.map((a) => {
    const l = e.who === a;
    return h`<button class="person" type="button" aria-pressed=${l} @click=${() => i({ who: l ? null : a })}>
          ${ue(o.hass, a, "lg", !0)}<span>${lt(o.hass, a)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${m(o.lang, "filter_parents")}>
      ${s(null)}${o.parents.map((a) => s(a))}
    </div>
    <div class="seg" role="group" aria-label=${m(o.lang, "group_label")}>
      ${["date", "priority"].map((a) => h`<button type="button" aria-pressed=${e.group === a}
        @click=${() => i({ group: a })}>${m(o.lang, `group_${a}`)}</button>`)}
    </div>
  </div>`;
}
function Dr(o, e, t, n) {
  const i = I(e), r = G(i, -((i.getDay() - n + 7) % 7)), s = G(r, -7), a = new Intl.DateTimeFormat(t, { month: "long", year: "numeric" }), l = /* @__PURE__ */ new Map();
  for (const d of o) {
    const p = new Date(d.completed_at ?? 0);
    let c, f;
    p >= r ? (c = "this", f = m(t, "col_week")) : p >= s ? (c = "last", f = m(t, "hist_last_week")) : (c = `${p.getFullYear()}-${p.getMonth()}`, f = a.format(p), t.startsWith("cs") && (f = f.toLocaleLowerCase("cs")));
    const _ = l.get(c) ?? { label: f, items: [] };
    _.items.push(d), l.set(c, _);
  }
  return [...l.values()];
}
const Cr = h`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path></svg>`;
function Ar(o, e) {
  const t = (a) => m(e.lang, a), n = new Intl.DateTimeFormat(e.lang, { day: "numeric", month: "short" }), i = (a) => {
    a.target === a.currentTarget && e.onClose();
  }, r = (a) => e.parents.find((l) => l.id === a), s = Dr(o.items, e.now, e.lang, e.firstDay);
  return h`<dialog class="kb-dialog kb-history" aria-labelledby="kb-hist-title" @close=${e.onClose} @click=${i}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><h2 id="kb-hist-title" class="hist-title">${t("history")}</h2>
          <span class="hist-sub">${m(e.lang, "hist_total", { n: o.total })}</span></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      ${o.error ? h`<div class="notice" role="alert">${t(o.error)}</div>` : b}
      <label class="hist-search">
        <span class="vis-hidden">${t("hist_search")}</span>
        <input type="search" autocomplete="off" .value=${o.search} placeholder=${t("hist_search_ph")}
          @input=${(a) => e.onSearch(a.target.value)} />
      </label>
      <div class="chips" role="group" aria-label=${t("filter_parents")}>
        <button class="pill-btn" type="button" aria-pressed=${o.parent === null} @click=${() => e.onParent(null)}>${t("all_parents")}</button>
        ${e.parents.map((a) => h`<button class="pill-btn hist-chip" type="button" aria-pressed=${o.parent === a.id}
          @click=${() => e.onParent(a.id)}>${He(a, !0)}${a.name}</button>`)}
      </div>
      <div class="hist-list">
        ${s.map((a) => h`<section class="hist-group">
          <h3 class="dlg-label">${a.label}</h3>
          <ul class="hist-rows">${a.items.map((l) => {
    var d;
    return h`<li class="hist-row" data-uid=${l.uid}>
            <span class="hist-check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>
            <div class="hist-text"><span class="hist-name">${l.summary}</span>
              <span class="hist-meta">${((d = r(l.parent)) == null ? void 0 : d.name) ?? l.parent} · ${l.completed_at ? n.format(new Date(l.completed_at)) : ""}</span></div>
            ${l.assignee ? ue(e.hass, l.assignee) : b}
            <button class="hist-reopen" type="button" title=${t("reopen")} aria-label=${`${t("reopen")}: ${l.summary}`}
              @click=${() => e.onReopen(l)}>${Cr}</button>
          </li>`;
  })}</ul>
        </section>`)}
        ${o.items.length === 0 && !o.loading && !o.error ? h`<div class="empty hist-empty">${t("hist_empty")}</div>` : b}
        ${o.items.length < o.total ? h`<button class="pill-btn hist-more" type="button" ?disabled=${o.loading} @click=${e.onMore}>${t("hist_more")}</button>` : b}
      </div>
    </div>
  </dialog>`;
}
const Vt = "household", Nn = { name: "", icon: "mdi:format-list-checks", color: "blue", checklist: !1 };
function Tr(o, e) {
  if (!o || !e) return null;
  const t = ["end_of_day_mode", "close_time", "notify_enabled", "notify_time", "notify_assignee", "notify_services"], n = {};
  for (const i of t) JSON.stringify(o[i]) !== JSON.stringify(e[i]) && (n[i] = e[i]);
  return Object.keys(n).length ? n : null;
}
const Or = ["todo", "later", "week", "today", "done"], Mr = [["board", "tab_board"], ["eod", "tab_eod"], ["lists", "tab_lists"]], Pr = "M3 5h18v12H3zM8 21h8M12 17v4", zr = "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", Re = (o, e = 16) => h`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${o}></path></svg>`;
function zt(o, e, t, n = {}, i = !1) {
  return h`<button class="switch" type="button" role="switch" aria-checked=${o} aria-label=${e} ?disabled=${i}
    data-col=${n.col ?? b} data-parent=${n.parent ?? b} @click=${t}></button>`;
}
function Gt(o, e, t) {
  return h`<div class="scope ${e ? "household" : "dashboard"}" role="note">
    ${Re(e ? zr : Pr)}
    <span class="scope-text"><b>${m(o, e ? "scope_household" : "scope_dashboard")}</b><span>${m(o, t)}</span></span>
  </div>`;
}
function Nr(o, e) {
  const t = (s) => m(e.lang, s), n = o.columns ?? [], i = (s, a, l, d) => h`
    <div class="set-line"><span class="grow">${s}</span>
      <div class="seg" role="radiogroup" aria-label=${s}>
        ${a.map(([p, c]) => h`<button type="button" role="radio" aria-checked=${p === l} @click=${() => d(p)}>${c}</button>`)}
      </div>
    </div>`, r = ["sort_due", "f_prio", "sort_created"];
  return h`
    <section class="set-sec">
      <h3 class="dlg-label">${t("columns")}</h3>
      <div class="set-rows">${Or.map((s) => h`<div class="set-row">
        <span class="led led-${s}"></span>
        <span class="set-text"><span class="set-name">${t(`col_${s}`)}</span><span class="set-hint">${t(`col_hint_${s}`)}</span></span>
        ${zt(
    s === "todo" || n.includes(s),
    t(`col_${s}`),
    () => e.onChange({ columns: n.filter((a) => a !== s).concat(n.includes(s) ? [] : [s]) }),
    { col: s },
    s === "todo"
  )}
      </div>`)}</div>
      ${n.includes("done") ? h`
        ${i(t("done_keep"), mo.map((s) => [s, Te(e.lang, "days", s)]), o.done_days, (s) => e.onChange({ done_days: s }))}
        <span class="set-hint pad">${t("done_keep_hint")}</span>` : b}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("view")}</h3>
      ${i(t("group_label"), [["date", t("group_date")], ["priority", t("group_priority")]], o.group, (s) => e.onChange({ group: s }))}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("sort_order")}</h3>
      <div class="sort-keys">${r.map((s, a) => h`${a ? Re("M9 6l6 6-6 6") : b}<span class="sort-key"><span class="sort-n">${a + 1}</span>${t(s)}</span>`)}</div>
      <span class="set-hint pad">${t("sort_hint")}</span>
    </section>`;
}
const Ir = [
  ["keep", "M5 21V4h11l-1.5 4L16 12H5", "red"],
  ["overdue", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16.5h.01", "red"],
  ["move", "M4 12h13M13 7l5 5-5 5M20 5v14", "blue"],
  ["raise", "M12 19V5M6 11l6-6 6 6", "orange"]
], Rr = /^([01]\d|2[0-3]):[0-5]\d$/, Hr = h`<span class="box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>`;
function Go(o, e, t) {
  return h`<input class="time-in" type="time" aria-label=${e} .value=${o}
    @change=${(n) => {
    const i = n.target.value;
    Rr.test(i) && t(i);
  }}>`;
}
function Ko(o, e, t, n, i) {
  return h`<button class="check-row" type="button" role="checkbox" aria-checked=${o} data-service=${i ?? b} @click=${n}>
    ${Hr}${i ? Re("M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2") : b}
    <span class="set-text"><span class="set-name">${e}</span><span class="set-hint ${i ? "mono" : ""}">${t}</span></span>
  </button>`;
}
function Fr(o, e) {
  const t = (a) => m(e.lang, a), n = o.eod;
  if (!n) return o.eodLoading ? h`<p class="set-hint pad">${t("loading")}</p>` : h``;
  const i = [...n.offered_services, ...n.notify_services.filter((a) => !n.offered_services.includes(a))], [r, s] = m(e.lang, "event_hint", { event: "\0" }).split("\0");
  return h`
    <section class="set-sec">
      <h3 class="dlg-label">${t("eod_title")}</h3>
      <div class="eod-opts" role="radiogroup" aria-label=${t("eod_title")}>${Ir.map(([a, l, d]) => h`
        <button class="eod-opt" type="button" role="radio" data-mode=${a} aria-checked=${n.end_of_day_mode === a} @click=${() => e.onEod({ end_of_day_mode: a })}>
          <span class="radio"></span><span class="dot c-${d}">${Re(l, 15)}</span>
          <span class="set-text"><span class="set-name">${t(`eod_${a}`)}</span><span class="set-hint">${t(`eod_${a}_hint`)}</span></span>
        </button>`)}</div>
      <label class="set-line"><span class="grow">${t("close_at")}</span>${Go(n.close_time, t("close_at"), (a) => e.onEod({ close_time: a }))}</label>
      <span class="set-hint pad">${t("close_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("notify_title")}</h3>
      <div class="set-rows">
        <div class="set-row">
          <span class="set-text"><span class="set-name">${t("notify_on")}</span><span class="set-hint">${t("notify_on_hint")}</span></span>
          ${zt(n.notify_enabled, t("notify_on"), () => e.onEod({ notify_enabled: !n.notify_enabled }))}
        </div>
        ${n.notify_enabled ? h`
          <label class="set-row">
            <span class="set-text"><span class="set-name">${t("notify_at")}</span><span class="set-hint">${t("notify_at_hint")}</span></span>
            ${Go(n.notify_time, t("notify_at"), (a) => e.onEod({ notify_time: a }))}
          </label>
          <div class="notify-whom">
            <span class="set-name">${t("notify_whom")}</span>
            ${Ko(n.notify_assignee, t("notify_assignee"), t("notify_assignee_hint"), () => e.onEod({ notify_assignee: !n.notify_assignee }))}
            ${i.map((a) => {
    const l = n.notify_services.includes(a), d = n.offered_services.includes(a) ? a.replace(/^notify\.mobile_app_/, "").replace(/_/g, " ") : a;
    return Ko(l, d, a, () => e.onEod({ notify_services: l ? n.notify_services.filter((p) => p !== a) : [...n.notify_services, a] }), a);
  })}
          </div>` : b}
      </div>
      ${n.notify_enabled ? h`<span class="set-hint pad">${r}<code class="mono">household_kanban_day_closed</code>${s}</span>` : b}
    </section>`;
}
function Zo(o, e) {
  const t = (s) => m(e.lang, s), n = (s) => e.onForm({ ...o, ...s, error: !1 }), i = e.parents.filter((s) => s.id !== o.id), r = (s) => s.target.value;
  return h`<div class="parent-form">
    <label class="field"><span class="dlg-label">${t("list_name")}</span>
      <input class="text-in" name="name" .value=${o.name} @input=${(s) => n({ name: r(s) })}></label>
    <label class="field"><span class="dlg-label">${t("list_icon")}</span>
      ${customElements.get("ha-icon-picker") ? h`<ha-icon-picker .hass=${e.hass} .value=${o.icon} @value-changed=${(s) => n({ icon: s.detail.value ?? "" })}></ha-icon-picker>` : h`<input class="text-in mono" name="icon" placeholder="mdi:…" .value=${o.icon} @input=${(s) => n({ icon: r(s) })}>`}</label>
    <div class="field"><span class="dlg-label">${t("list_color")}</span>
      <div class="chips" role="radiogroup" aria-label=${t("list_color")}>${An.map((s) => h`
        <button class="color-chip c-${s}" type="button" role="radio" data-color=${s} aria-label=${s} aria-checked=${o.color === s} @click=${() => n({ color: s })}></button>`)}</div></div>
    <div class="set-line"><span class="set-text grow"><span class="set-name">${t("list_checklist")}</span><span class="set-hint">${t("list_checklist_hint")}</span></span>${zt(o.checklist, t("list_checklist"), () => n({ checklist: !o.checklist }))}</div>
    ${o.target !== void 0 ? h`<label class="field"><span class="dlg-label">${t("move_items_to")}</span>
      <select class="text-in" @change=${(s) => n({ target: r(s) })}>${i.map((s) => h`<option value=${s.id} ?selected=${s.id === o.target}>${s.name}</option>`)}</select></label>` : b}
    ${o.error ? h`<div class="notice" role="alert">${t("err_parent")}</div>` : b}
    <div class="form-foot">
      ${o.id && o.id !== Vt && o.target === void 0 && i.length ? h`<button class="pill-btn remove-parent" type="button"
        @click=${() => n({ target: i.some((s) => s.id === Vt) ? Vt : i[0].id })}>${t("remove_list")}</button>` : b}
      <span class="grow"></span>
      <button class="pill-btn" type="button" @click=${() => e.onForm(void 0)}>${t("cancel")}</button>
      ${o.target === void 0 ? h`<button class="primary-btn save-parent" type="button" ?disabled=${o.busy || !o.name.trim()} @click=${e.onFormSave}>${t("save")}</button>` : h`<button class="primary-btn confirm-remove" type="button" ?disabled=${o.busy} @click=${e.onFormRemove}>${t("remove_list")}</button>`}
    </div>
  </div>`;
}
function Lr(o, e, t) {
  const n = (r) => m(t.lang, r), i = t.parents.map((r) => r.id);
  return h`
    <section class="set-sec">
      <h3 class="dlg-label">${n("lists_here")}</h3>
      <div class="set-rows">${t.parents.map((r) => {
    const s = !o.parents || o.parents.includes(r.id);
    return h`<div class="set-row">
          ${He(r)}
          <span class="set-text"><span class="set-name">${r.name}</span><span class="set-hint mono">${r.entity_id}</span></span>
          ${r.checklist ? h`<span class="set-badge">${n("list_checklist")}</span>` : b}
          ${zt(s, m(t.lang, "show_list", { name: r.name }), () => t.onChange({ parents: oo(o.parents, i, r.id, !s) }), { parent: r.id })}
          <button class="icon-btn edit-list" type="button" data-parent=${r.id} aria-label=${n("edit_list")} aria-expanded=${(e == null ? void 0 : e.id) === r.id}
            @click=${() => t.onForm((e == null ? void 0 : e.id) === r.id ? void 0 : { id: r.id, name: r.name, icon: r.icon, color: r.color, checklist: r.checklist })}>${Re("M4 20h4L19 9l-4-4L4 16zM14 6l4 4")}</button>
        </div>${(e == null ? void 0 : e.id) === r.id ? Zo(e, t) : b}`;
  })}</div>
      ${e && e.id === void 0 ? Zo(e, t) : h`<button class="add-list" type="button" @click=${() => t.onForm({ ...Nn })}>${Re("M12 5v14M5 12h14", 14)}${n("add_list")}</button>`}
      <span class="set-hint pad">${n("lists_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${n("people_filter")}</h3>
      <div class="chips">${t.people.map((r) => {
    const s = !o.people || o.people.includes(r);
    return h`<button class="pill-btn person-chip" type="button" aria-pressed=${s} data-person=${r}
          @click=${() => t.onChange({ people: oo(o.people, t.people, r, !s) })}>${ue(t.hass, r, "", !0)}${lt(t.hass, r)}</button>`;
  })}</div>
    </section>`;
}
function jr(o, e) {
  const t = (r) => m(e.lang, r), n = (r) => {
    r.target === r.currentTarget && e.onClose();
  }, i = o.tab === "board" ? h`${Gt(e.lang, !1, "scope_dashboard_hint")}${Nr(o.draft, e)}` : o.tab === "lists" ? h`${Gt(e.lang, !1, "scope_lists_hint")}${Lr(o.draft, o.form, e)}` : h`${Gt(e.lang, !0, "scope_household_hint")}${Fr(o, e)}`;
  return h`<dialog class="kb-dialog kb-settings ${o.narrow ? "narrow" : ""}" aria-labelledby="kb-set-title" @close=${e.onClose} @click=${n}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><span class="dlg-kicker">${t("settings")}</span>
          <h2 id="kb-set-title" class="hist-title">${t("title")} · ${t("settings")}</h2></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      <div class="set-tabs" role="tablist" aria-label=${t("settings")}>
        ${Mr.map(([r, s]) => h`<button type="button" role="tab" data-tab=${r} aria-selected=${o.tab === r} @click=${() => e.onTab(r)}>${t(s)}</button>`)}
      </div>
      <div class="set-body" role="tabpanel">${i}</div>
      ${o.error ? h`<div class="notice" role="alert">${t(o.error)}</div>` : b}
      <div class="dlg-foot">
        <span class="grow"></span>
        <button class="pill-btn" type="button" @click=${e.onClose}>${t("cancel")}</button>
        <button class="primary-btn" type="button" ?disabled=${o.saving} @click=${e.onSave}>${t("save")}</button>
      </div>
    </div>
  </dialog>`;
}
const Br = 50, qr = 600, Ur = 500, Yr = h`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`, Ot = class Ot extends Oe {
  constructor() {
    super(), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set(), this._loadFailed = !1, this._busy = !1, this._narrow = !1, this._raw = {}, this._sheetShown = !1, this._menuShown = !1, this._lpFired = !1, this._hq = 0, this._hMore = null, this._sortables = /* @__PURE__ */ new Map(), this._seq = 0, this._attempts = 0, this.addEventListener("pointerdown", (e) => {
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
      t > 0 && (this._narrow = t < qr), this._narrow || this._closeSheet();
    }), this._ro.observe(this));
  }
  disconnectedCallback() {
    var e, t, n;
    super.disconnectedCallback(), window.clearTimeout(this._retry), this._retry = void 0, (e = this._ro) == null || e.disconnect(), this._ro = void 0, this._lpCancel(), this._sortables.forEach((i) => i.destroy()), this._sortables.clear(), this._endDrag(), window.clearTimeout(this._hTimer), (t = this._hObs) == null || t.disconnect(), this._hObs = void 0, this._hMore = null, (n = this._unsub) == null || n.then((i) => i()).catch(() => {
    }), this._unsub = void 0;
  }
  willUpdate(e) {
    e.has("hass") && this._subscribe();
  }
  /** Subscribe once; on failure retry on a capped backoff timer, never on hass updates. */
  _subscribe() {
    if (this._unsub || this._retry !== void 0 || !this.hass || !this.isConnected) return;
    const e = xn(this.hass, (t) => {
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
      }, wn(this._attempts++)));
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
    } catch (i) {
      console.warn("household_kanban: write failed", i), n === this._seq && (this._dlgError = e);
    } finally {
      n === this._seq && (this._busy = !1);
    }
  }
  _save() {
    var i;
    const e = this.hass, t = this._draft;
    if (!e || !t) return;
    const n = t.uid ? (i = this._board) == null ? void 0 : i.items.find((r) => r.uid === t.uid) : void 0;
    if (t.uid && !n) {
      this._dlgError = "err_save";
      return;
    }
    this._dialogWrite("err_save", () => n ? gt(e, n.uid, Wo(n, t)) : Ai(e, Pn(t)));
  }
  /** Tap on a card; a click that ends a drag is not a tap. */
  _open(e, t) {
    const n = t, i = this._down;
    if (this._down = void 0, this._lpFired) {
      this._lpFired = !1;
      return;
    }
    n.detail !== 0 && i && qo(n.clientX - i.x, n.clientY - i.y, t.timeStamp - i.t) || this._openDialog(Mn(e), () => {
      var r;
      return (r = [...this.renderRoot.querySelectorAll("[data-uid]")].find((s) => s.dataset.uid === e.uid)) == null ? void 0 : r.querySelector(".title");
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
    const i = () => n === this._seq && !!this._settings, r = (d) => {
      i() && (this._settings = { ...this._settings, ...d });
    };
    r({ saving: !0, error: void 0 });
    const s = Pe(t.draft);
    let a = JSON.stringify(s) === JSON.stringify(this._config) ? void 0 : await this._saveDashboard(e, s, i);
    const l = Tr(t.server, t.eod);
    if (l && i())
      try {
        const d = await zi(e, l);
        r({ server: d });
      } catch (d) {
        console.warn("household_kanban: settings update failed", d), a ?? (a = "err_settings");
      }
    i() && (a ? r({ saving: !1, error: a }) : this._settings = void 0);
  }
  /** Write the config into this card's entry of the dashboard config; HA reloads the dashboard after the save. */
  async _saveDashboard(e, t, n) {
    const i = Vi(window.location.pathname);
    try {
      const r = await Oi(e, i);
      if (r && typeof r == "object" && "strategy" in r) return "err_not_editable";
      const s = $n(this._raw, t), a = Gi(r, this._raw, s);
      if (a.matches !== 1) return a.matches ? "err_card_ambiguous" : "err_card_missing";
      if (!n()) return;
      await Mi(e, i, a.config), this.setConfig(s);
      return;
    } catch (r) {
      console.warn("household_kanban: dashboard save failed", r);
      const s = r;
      return (s == null ? void 0 : s.code) === "config_not_editable" || (s == null ? void 0 : s.code) === "config_not_found" || /yaml/i.test((s == null ? void 0 : s.message) ?? "") ? "err_not_editable" : "err_settings";
    }
  }
  /** Household settings, loaded when the End of day tab first opens. */
  async _loadEod() {
    const e = this.hass, t = this._settings, n = this._seq;
    if (!e || !t || t.server || t.eodLoading) return;
    const i = (r) => {
      n === this._seq && this._settings && (this._settings = { ...this._settings, ...r });
    };
    i({ eodLoading: !0, error: void 0 });
    try {
      const r = await Pi(e);
      i({ server: r, eod: r, eodLoading: !1 });
    } catch (r) {
      console.warn("household_kanban: settings load failed", r), i({ eodLoading: !1, error: "err_load_settings" });
    }
  }
  /** Add, edit or remove a list right away; the new board arrives through the subscription. */
  async _parentWrite(e) {
    var a, l;
    const t = this.hass, n = (a = this._settings) == null ? void 0 : a.form, i = this._seq;
    if (!t || !n || n.busy) return;
    const r = () => {
      var d, p;
      return i === this._seq && ((p = (d = this._settings) == null ? void 0 : d.form) == null ? void 0 : p.id) === n.id;
    }, s = (d) => {
      r() && this._settings && (this._settings = { ...this._settings, form: d });
    };
    s({ ...n, busy: !0, error: !1 });
    try {
      await e(t), s(void 0);
    } catch (d) {
      console.warn("household_kanban: list write failed", d), r() && s({ ...(l = this._settings) == null ? void 0 : l.form, busy: !1, error: !0 });
    }
  }
  _saveParent() {
    var r, s;
    const e = (r = this._settings) == null ? void 0 : r.form;
    if (!e) return;
    const t = { name: e.name.trim(), icon: e.icon.trim() || Nn.icon, color: e.color, checklist: e.checklist };
    if (!e.id) {
      const a = this._seq;
      this._parentWrite(async (l) => {
        const d = await Ni(l, t), p = this._settings;
        a === this._seq && (p != null && p.draft.parents) && (d != null && d.id) && (this._settings = { ...p, draft: { ...p.draft, parents: [...p.draft.parents, d.id] } });
      });
      return;
    }
    const n = (s = this._board) == null ? void 0 : s.parents.find((a) => a.id === e.id), i = Object.fromEntries(Object.entries(t).filter(([a, l]) => !n || n[a] !== l));
    if (!Object.keys(i).length) {
      this._settings && (this._settings = { ...this._settings, form: void 0 });
      return;
    }
    this._parentWrite((a) => Ii(a, e.id, i));
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
    const i = this._hq;
    this._hist = { ...n, loading: !0, error: void 0 };
    try {
      const r = await Ci(t, {
        search: n.search.trim() || void 0,
        parent: n.parent ?? void 0,
        offset: e ? 0 : n.items.length,
        limit: Br
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
    t && ft(t, e, "needs_action").then(() => {
      const n = this._hist;
      !n || !n.items.some((i) => i.uid === e) || (this._hist = { ...n, items: n.items.filter((i) => i.uid !== e), total: Math.max(0, n.total - 1), error: void 0 });
    }, (n) => {
      console.warn("household_kanban: reopen failed", n), this._hist && (this._hist = { ...this._hist, error: "err_reopen" });
    });
  }
  /** Load the next page when the "Load more" button scrolls into view; the button itself is the fallback. */
  _observeMore() {
    var n, i, r, s;
    const e = this.renderRoot.querySelector(".hist-more"), t = ((n = this._hist) == null ? void 0 : n.items.length) ?? 0;
    if (!e || (i = this._hist) != null && i.loading) {
      e || ((r = this._hObs) == null || r.disconnect(), this._hMore = null);
      return;
    }
    ((s = this._hMore) == null ? void 0 : s.el) === e && this._hMore.n === t || (this._hMore = { el: e, n: t }, !(typeof IntersectionObserver > "u") && (this._hObs ?? (this._hObs = new IntersectionObserver((a) => {
      a.some((l) => l.isIntersecting) && this._loadHistory(!1);
    })), this._hObs.disconnect(), this._hObs.observe(e)));
  }
  _add(e, t, n, i = `.col[data-col="${e}"] .add`) {
    var d, p;
    const r = () => this.renderRoot.querySelector(i), s = this._filter.parent ?? ((d = t.find((c) => c.id === "household")) == null ? void 0 : d.id) ?? ((p = t[0]) == null ? void 0 : p.id);
    if (!s) return;
    const a = /^p([123])$/.exec(e), l = {
      today: wt("today", n.now),
      week: oe(n.week.end),
      later: oe(G(n.week.end, 1))
    };
    this._openDialog(cr(s, a ? { priority: Number(a[1]) } : { date: l[e] ?? "" }), r);
  }
  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  _syncSortables() {
    var n;
    const e = new Set(this.renderRoot.querySelectorAll(".col"));
    for (const [i, r] of this._sortables) e.has(i) || (r.destroy(), this._sortables.delete(i));
    const t = ((n = window.matchMedia) == null ? void 0 : n.call(window, "(pointer: coarse)").matches) ?? !1;
    for (const i of e)
      this._sortables.has(i) || this._sortables.set(i, x.create(i, {
        group: { name: "kb", pull: !0, put: (r) => r.el.dataset.col !== "overdue" },
        draggable: "[data-uid]",
        filter: io,
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
    const n = this.hass, i = this._ctx, r = (c = this._board) == null ? void 0 : c.items.find((f) => f.uid === e);
    if (!n || !i || !r || !t) return;
    const s = /^p([123])$/.exec(t), a = Ui(r, s ? Number(s[1]) : t, i);
    if (!a) return;
    const { status: l, ...d } = a;
    (async () => {
      Object.keys(d).length && await gt(n, r.uid, d), l && await ft(n, r.uid, l);
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
    const t = e.target, n = t.closest("[data-uid]"), i = n == null ? void 0 : n.dataset.uid;
    !i || t.closest(io) || (this._lp = { x: e.clientX, y: e.clientY, timer: window.setTimeout(() => {
      this._lp = void 0, this._lpFired = !0, this._menu = i, this._menuFor = i;
    }, Ur) });
  }
  _lpMove(e) {
    const t = this._lp;
    t && qo(e.clientX - t.x, e.clientY - t.y) && this._lpCancel();
  }
  _lpCancel() {
    this._lp && window.clearTimeout(this._lp.timer), this._lp = void 0;
  }
  /** Focus handling for the sheet and its menu; the native dialog, when open, owns the focus. */
  _sheetFocus(e) {
    var i, r, s, a;
    if (e) return;
    const t = this.renderRoot.querySelector(".sheet");
    if (t && !this._sheetShown)
      this._sheetShown = !0, (i = t.querySelector(".sclose")) == null || i.focus();
    else if (!t && this._sheetShown) {
      this._sheetShown = !1;
      const l = this._sheetReturn;
      (r = l && this.renderRoot.querySelector(l) || this.renderRoot.querySelector("header .new")) == null || r.focus();
    }
    const n = this.renderRoot.querySelector(".menu-btn");
    if (n && !this._menuShown)
      this._menuShown = !0, n.focus();
    else if (!n && this._menuShown) {
      this._menuShown = !1;
      const l = this._menuFor;
      (a = ((s = [...this.renderRoot.querySelectorAll(".sheet [data-uid]")].find((p) => p.dataset.uid === l)) == null ? void 0 : s.querySelector(".title")) ?? this.renderRoot.querySelector(".sheet .sclose")) == null || a.focus();
    }
  }
  updated() {
    var n, i, r, s;
    this._syncSortables(), this._observeMore();
    const e = this.renderRoot.querySelector("dialog.kb-sheet");
    e && !e.open && e.showModal();
    const t = this.renderRoot.querySelector("dialog.kb-dialog");
    if (this._sheetFocus(!!t), t && !t.open)
      t.showModal(), this._hist ? (n = this.renderRoot.querySelector(".kb-history input")) == null || n.focus() : (i = this._draft) != null && i.uid || (r = this.renderRoot.querySelector(".cl-add input") ?? this.renderRoot.querySelector("#kb-title")) == null || r.focus();
    else if (!t && this._returnTo) {
      const a = this._returnTo;
      this._returnTo = void 0, (s = a()) == null || s.focus();
    }
  }
  render() {
    var k, v;
    const e = this.hass, t = this._config, n = this._board;
    if (!e || !t) return b;
    const i = ((k = e.locale) == null ? void 0 : k.language) ?? e.language ?? "en";
    if (!n) return h`<ha-card><div class="loading">${m(i, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const r = /* @__PURE__ */ new Date(), s = n.parents.filter((g) => !t.parents || t.parents.includes(g.id)), a = new Set(t.columns ?? []);
    a.add("todo"), n.end_of_day_mode === "overdue" && a.add("overdue");
    const l = {
      now: r,
      enabled: a,
      mode: n.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: ji(r, Bo(e.locale))
    };
    this._ctx = l;
    const d = {
      hass: e,
      lang: i,
      now: r,
      parents: s,
      expanded: this._expanded,
      onExpand: (g, E) => {
        const D = new Set(this._expanded);
        E ? D.add(g) : D.delete(g), this._expanded = D;
      },
      onLines: (g, E) => {
        gt(e, g.uid, { description: E }).catch((D) => {
          console.warn("household_kanban: update_item failed", D), this._fail("err_update");
        });
      },
      onOpen: (g, E) => this._open(g, E),
      onToggle: (g) => {
        ft(e, g.uid, g.status === "completed" ? "needs_action" : "completed").catch((E) => {
          console.warn("household_kanban: set_status failed", E), this._fail("err_update");
        });
      }
    }, p = t.people ?? Object.keys(e.states).filter((g) => g.startsWith("person.")), c = this._filter, f = n.items.filter((g) => s.some((E) => E.id === g.parent)), _ = f.filter((g) => (!c.who || g.assignee === c.who) && (!c.parent || g.parent === c.parent));
    return h`<ha-card>
      ${this._notice ? h`<div class="notice" role="alert">${m(i, this._notice)}</div>` : b}
      <header>
        <div class="titles"><h1>${m(i, "title")}</h1><div class="summary">${this._summary(f, l, i)}</div></div>
        ${(v = e.user) != null && v.is_admin ? h`<button class="round-btn gear-btn" type="button" aria-label=${m(i, "settings")} title=${m(i, "settings")}
          @click=${() => this._openSettings()}>${Yr}</button>` : b}
        <button class="pill-btn hist-btn" type="button" @click=${() => this._openHistory("header .hist-btn")}>${m(i, "history")}</button>
        <button class="new" type="button" @click=${() => this._add("todo", s, l, "header .new")}>+ ${m(i, "new_note")}</button>
      </header>
      ${this._narrow ? this._renderNarrow(d, l, f, p, s) : h`
      ${Er(d, c, p, f, (g) => {
      this._filter = { ...c, ...g };
    })}
      ${vr(_, {
      ctx: l,
      group: c.group,
      onAdd: (g) => this._add(g, s, l),
      onHistory: () => this._openHistory('.col[data-col="done"] .note-btn')
    }, d)}`}
      ${this._hist ? Ar(this._hist, {
      hass: e,
      lang: i,
      now: r,
      parents: s,
      firstDay: Bo(e.locale),
      onSearch: (g) => this._histFilter({ search: g }, 300),
      onParent: (g) => this._histFilter({ parent: g }, 0),
      onReopen: (g) => this._reopen(g.uid),
      onMore: () => void this._loadHistory(!1),
      onClose: () => this._closeHistory()
    }) : b}
      ${this._settings ? jr({ ...this._settings, narrow: this._narrow }, {
      hass: e,
      lang: i,
      parents: n.parents,
      people: Object.keys(e.states).filter((g) => g.startsWith("person.")),
      onTab: (g) => {
        this._settings && (this._settings = { ...this._settings, tab: g }), g === "eod" && this._loadEod();
      },
      onChange: (g) => {
        this._settings && (this._settings = { ...this._settings, draft: { ...this._settings.draft, ...g }, error: void 0 });
      },
      onEod: (g) => {
        const E = this._settings;
        E != null && E.eod && (this._settings = { ...E, eod: { ...E.eod, ...g }, error: void 0 });
      },
      onForm: (g) => {
        this._settings && (this._settings = { ...this._settings, form: g });
      },
      onFormSave: () => this._saveParent(),
      onFormRemove: () => {
        var E;
        const g = (E = this._settings) == null ? void 0 : E.form;
        g != null && g.id && g.target && this._parentWrite((D) => Ri(D, g.id, g.target));
      },
      onSave: () => void this._saveSettings(),
      onClose: () => {
        this._seq++, this._settings = void 0;
      }
    }) : b}
      ${this._draft ? hr(this._draft, {
      hass: e,
      lang: i,
      now: r,
      parents: s,
      people: p,
      busy: this._busy,
      error: this._dlgError,
      onChange: (g) => {
        this._draft && (this._draft = { ...this._draft, ...g });
      },
      onSave: () => this._save(),
      onClose: () => {
        this._draft = void 0;
      },
      onToggleDone: () => {
        var z;
        const g = this._draft, E = g == null ? void 0 : g.uid;
        if (!g || !E) return;
        const D = (z = this._board) == null ? void 0 : z.items.find((Q) => Q.uid === E);
        if (!D) {
          this._dlgError = "err_update";
          return;
        }
        const H = Wo(D, g);
        this._dialogWrite("err_update", async () => {
          Object.keys(H).length && await gt(e, E, H), await ft(e, E, g.status === "completed" ? "needs_action" : "completed");
        });
      },
      onDelete: () => {
        const g = this._draft;
        g != null && g.uid && this._dialogWrite("err_delete", () => Ti(e, g.uid));
      }
    }) : b}
    </ha-card>`;
  }
  /** Tiles + parents list, and the bottom sheet when one is open. */
  _renderNarrow(e, t, n, i, r) {
    const s = this._filter.who, a = n.filter((c) => !s || c.assignee === s);
    let l = this._sheet, d = b;
    const p = (l == null ? void 0 : l.kind) === "parent" ? r.find((c) => c.id === (l == null ? void 0 : l.id)) : void 0;
    if ((l == null ? void 0 : l.kind) === "parent" && !p && (l = void 0, queueMicrotask(() => this._closeSheet())), l) {
      const c = l.id, f = (v) => v.filter((g) => g.status === "needs_action").sort(At), _ = l.kind === "parent" ? f(a.filter((v) => v.parent === l.id)) : c === "done" ? a.filter((v) => we(v, t) === "done").sort(zn) : f(a.filter((v) => we(v, t) === c)), k = p ? { icon: p.icon, color: p.color, title: p.name } : { ...ro[c], title: m(e.lang, `col_${c}`) };
      d = xr({
        ...k,
        count: _.length,
        isDone: c === "done" && !p,
        entries: _,
        olderDone: a.filter((v) => v.status === "completed").length - _.length,
        menu: this._menu ? a.find((v) => v.uid === this._menu) : void 0,
        onClose: () => this._closeSheet(),
        onCancel: () => this._sheetCancel(),
        onHistory: () => this._openHistory(".sheet .hist-link"),
        onMove: (v, g) => {
          this._closeMenu(), this._drop(v.uid, g);
        },
        onMenuClose: () => this._closeMenu(),
        press: { down: (v) => this._lpStart(v), move: (v) => this._lpMove(v), end: () => this._lpCancel() }
      }, e);
    }
    return h`${Sr({
      ctx: t,
      items: a,
      people: i,
      who: s,
      onWho: (c) => {
        this._filter = { ...this._filter, who: c };
      },
      onTile: (c) => this._openSheet("col", c, `.tile[data-tile="${c}"]`),
      onParent: (c) => this._openSheet("parent", c, `.prow[data-parent="${c}"]`)
    }, e)}${d}`;
  }
  _summary(e, t, n) {
    const i = e.filter((d) => d.status === "needs_action"), r = I(t.now), s = i.filter((d) => d.due && I(J(d.due).date) < r).length, a = i.filter((d) => we(d, t) === "today").length, l = t.mode === "overdue" ? Te(n, "sum_overdue", s) : Te(n, "sum_moved", i.filter((d) => d.moved > 0).length);
    return [Te(n, "sum_open", i.length), Te(n, "sum_today", a), l].join(" · ");
  }
};
Ot.properties = {
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
}, Ot.styles = Qi;
let so = Ot;
const ao = "household-kanban-card";
kn(ao, so);
(window.customCards ?? (window.customCards = [])).some((o) => o.type === ao) || window.customCards.push({ type: ao, name: "Household Kanban", description: "Kanban board for household tasks" });
