/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = globalThis, Kt = ht.ShadowRoot && (ht.ShadyCSS === void 0 || ht.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Jt = Symbol(), sn = /* @__PURE__ */ new WeakMap();
let Pn = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== Jt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Kt && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = sn.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && sn.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const co = (n) => new Pn(typeof n == "string" ? n : n + "", void 0, Jt), ho = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((o, r, i) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[i + 1], n[0]);
  return new Pn(t, n, Jt);
}, uo = (n, e) => {
  if (Kt) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), r = ht.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = t.cssText, n.appendChild(o);
  }
}, ln = Kt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return co(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: po, defineProperty: fo, getOwnPropertyDescriptor: go, getOwnPropertyNames: bo, getOwnPropertySymbols: mo, getPrototypeOf: vo } = Object, ce = globalThis, dn = ce.trustedTypes, _o = dn ? dn.emptyScript : "", Ct = ce.reactiveElementPolyfillSupport, Ye = (n, e) => n, qt = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? _o : null;
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
} }, Nn = (n, e) => !po(n, e), cn = { attribute: !0, type: String, converter: qt, reflect: !1, useDefault: !1, hasChanged: Nn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ce.litPropertyMetadata ?? (ce.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Se = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = cn) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(e, o, t);
      r !== void 0 && fo(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: r, set: i } = go(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? cn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ye("elementProperties"))) return;
    const e = vo(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ye("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ye("properties"))) {
      const t = this.properties, o = [...bo(t), ...mo(t)];
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
      for (const r of o) t.unshift(ln(r));
    } else e !== void 0 && t.push(ln(e));
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
    return uo(e, this.constructor.elementStyles), e;
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
      const a = (((i = o.converter) == null ? void 0 : i.toAttribute) !== void 0 ? o.converter : qt).toAttribute(t, o.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, a;
    const o = this.constructor, r = o._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = o.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((i = s.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? s.converter : qt;
      this._$Em = r;
      const d = l.fromAttribute(t, s.type);
      this[r] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, r = !1, i) {
    var a;
    if (e !== void 0) {
      const s = this.constructor;
      if (r === !1 && (i = this[e]), o ?? (o = s.getPropertyOptions(e)), !((o.hasChanged ?? Nn)(i, t) || o.useDefault && o.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(s._$Eu(e, o)))) return;
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
Se.elementStyles = [], Se.shadowRootOptions = { mode: "open" }, Se[Ye("elementProperties")] = /* @__PURE__ */ new Map(), Se[Ye("finalized")] = /* @__PURE__ */ new Map(), Ct == null || Ct({ ReactiveElement: Se }), (ce.reactiveElementVersions ?? (ce.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = globalThis, hn = (n) => n, vt = je.trustedTypes, un = vt ? vt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, In = "$lit$", ae = `lit$${Math.random().toFixed(9).slice(2)}$`, zn = "?" + ae, yo = `<${zn}>`, xe = document, Je = () => xe.createComment(""), Qe = (n) => n === null || typeof n != "object" && typeof n != "function", Qt = Array.isArray, wo = (n) => Qt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Tt = `[ 	
\f\r]`, He = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pn = /-->/g, fn = />/g, ge = RegExp(`>|${Tt}(?:([^\\s"'>=/]+)(${Tt}*=${Tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gn = /'/g, bn = /"/g, Rn = /^(?:script|style|textarea|title)$/i, xo = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), g = xo(1), Ce = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), mn = /* @__PURE__ */ new WeakMap(), _e = xe.createTreeWalker(xe, 129);
function Fn(n, e) {
  if (!Qt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return un !== void 0 ? un.createHTML(e) : e;
}
const $o = (n, e) => {
  const t = n.length - 1, o = [];
  let r, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = He;
  for (let s = 0; s < t; s++) {
    const l = n[s];
    let d, h, c = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, h = a.exec(l), h !== null); ) f = a.lastIndex, a === He ? h[1] === "!--" ? a = pn : h[1] !== void 0 ? a = fn : h[2] !== void 0 ? (Rn.test(h[2]) && (r = RegExp("</" + h[2], "g")), a = ge) : h[3] !== void 0 && (a = ge) : a === ge ? h[0] === ">" ? (a = r ?? He, c = -1) : h[1] === void 0 ? c = -2 : (c = a.lastIndex - h[2].length, d = h[1], a = h[3] === void 0 ? ge : h[3] === '"' ? bn : gn) : a === bn || a === gn ? a = ge : a === pn || a === fn ? a = He : (a = ge, r = void 0);
    const v = a === ge && n[s + 1].startsWith("/>") ? " " : "";
    i += a === He ? l + yo : c >= 0 ? (o.push(d), l.slice(0, c) + In + l.slice(c) + ae + v) : l + ae + (c === -2 ? s : v);
  }
  return [Fn(n, i + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class et {
  constructor({ strings: e, _$litType$: t }, o) {
    let r;
    this.parts = [];
    let i = 0, a = 0;
    const s = e.length - 1, l = this.parts, [d, h] = $o(e, t);
    if (this.el = et.createElement(d, o), _e.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = _e.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(In)) {
          const f = h[a++], v = r.getAttribute(c).split(ae), x = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: i, name: x[2], strings: v, ctor: x[1] === "." ? So : x[1] === "?" ? Eo : x[1] === "@" ? Do : Et }), r.removeAttribute(c);
        } else c.startsWith(ae) && (l.push({ type: 6, index: i }), r.removeAttribute(c));
        if (Rn.test(r.tagName)) {
          const c = r.textContent.split(ae), f = c.length - 1;
          if (f > 0) {
            r.textContent = vt ? vt.emptyScript : "";
            for (let v = 0; v < f; v++) r.append(c[v], Je()), _e.nextNode(), l.push({ type: 2, index: ++i });
            r.append(c[f], Je());
          }
        }
      } else if (r.nodeType === 8) if (r.data === zn) l.push({ type: 2, index: i });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(ae, c + 1)) !== -1; ) l.push({ type: 7, index: i }), c += ae.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const o = xe.createElement("template");
    return o.innerHTML = e, o;
  }
}
function Te(n, e, t = n, o) {
  var a, s;
  if (e === Ce) return e;
  let r = o !== void 0 ? (a = t._$Co) == null ? void 0 : a[o] : t._$Cl;
  const i = Qe(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== i && ((s = r == null ? void 0 : r._$AO) == null || s.call(r, !1), i === void 0 ? r = void 0 : (r = new i(n), r._$AT(n, t, o)), o !== void 0 ? (t._$Co ?? (t._$Co = []))[o] = r : t._$Cl = r), r !== void 0 && (e = Te(n, r._$AS(n, e.values), r, o)), e;
}
class ko {
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
    const { el: { content: t }, parts: o } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? xe).importNode(t, !0);
    _e.currentNode = r;
    let i = _e.nextNode(), a = 0, s = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new tt(i, i.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (d = new Ao(i, this, e)), this._$AV.push(d), l = o[++s];
      }
      a !== (l == null ? void 0 : l.index) && (i = _e.nextNode(), a++);
    }
    return _e.currentNode = xe, r;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class tt {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, o, r) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = Te(this, e, t), Qe(e) ? e === _ || e == null || e === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : e !== this._$AH && e !== Ce && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : wo(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== _ && Qe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(xe.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: t, _$litType$: o } = e, r = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = et.createElement(Fn(o.h, o.h[0]), this.options)), o);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === r) this._$AH.p(t);
    else {
      const a = new ko(r, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = mn.get(e.strings);
    return t === void 0 && mn.set(e.strings, t = new et(e)), t;
  }
  k(e) {
    Qt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, r = 0;
    for (const i of e) r === t.length ? t.push(o = new tt(this.O(Je()), this.O(Je()), this, this.options)) : o = t[r], o._$AI(i), r++;
    r < t.length && (this._$AR(o && o._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = hn(e).nextSibling;
      hn(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Et {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, r, i) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = _;
  }
  _$AI(e, t = this, o, r) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) e = Te(this, e, t, 0), a = !Qe(e) || e !== this._$AH && e !== Ce, a && (this._$AH = e);
    else {
      const s = e;
      let l, d;
      for (e = i[0], l = 0; l < i.length - 1; l++) d = Te(this, s[o + l], t, l), d === Ce && (d = this._$AH[l]), a || (a = !Qe(d) || d !== this._$AH[l]), d === _ ? e = _ : e !== _ && (e += (d ?? "") + i[l + 1]), this._$AH[l] = d;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class So extends Et {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === _ ? void 0 : e;
  }
}
class Eo extends Et {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== _);
  }
}
class Do extends Et {
  constructor(e, t, o, r, i) {
    super(e, t, o, r, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Te(this, e, t, 0) ?? _) === Ce) return;
    const o = this._$AH, r = e === _ && o !== _ || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, i = e !== _ && (o === _ || r);
    r && this.element.removeEventListener(this.name, this, o), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ao {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Te(this, e);
  }
}
const Ot = je.litHtmlPolyfillSupport;
Ot == null || Ot(et, tt), (je.litHtmlVersions ?? (je.litHtmlVersions = [])).push("3.3.3");
const Co = (n, e, t) => {
  const o = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = o._$litPart$;
  if (r === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null;
    o._$litPart$ = r = new tt(e.insertBefore(Je(), i), i, void 0, t ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye = globalThis;
class We extends Se {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Co(t, this.renderRoot, this.renderOptions);
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
    return Ce;
  }
}
var Mn;
We._$litElement$ = !0, We.finalized = !0, (Mn = ye.litElementHydrateSupport) == null || Mn.call(ye, { LitElement: We });
const Mt = ye.litElementPolyfillSupport;
Mt == null || Mt({ LitElement: We });
(ye.litElementVersions ?? (ye.litElementVersions = [])).push("4.2.2");
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function vn(n, e) {
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
    e % 2 ? vn(Object(t), !0).forEach(function(o) {
      To(n, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : vn(Object(t)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return n;
}
function ut(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ut = function(e) {
    return typeof e;
  } : ut = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ut(n);
}
function To(n, e, t) {
  return e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function te() {
  return te = Object.assign || function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
    }
    return n;
  }, te.apply(this, arguments);
}
function Oo(n, e) {
  if (n == null) return {};
  var t = {}, o = Object.keys(n), r, i;
  for (i = 0; i < o.length; i++)
    r = o[i], !(e.indexOf(r) >= 0) && (t[r] = n[r]);
  return t;
}
function Mo(n, e) {
  if (n == null) return {};
  var t = Oo(n, e), o, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n);
    for (r = 0; r < i.length; r++)
      o = i[r], !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(n, o) && (t[o] = n[o]);
  }
  return t;
}
var Po = "1.15.6";
function Q(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var ne = Q(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), nt = Q(/Edge/i), _n = Q(/firefox/i), Xe = Q(/safari/i) && !Q(/chrome/i) && !Q(/android/i), en = Q(/iP(ad|od|hone)/i), Hn = Q(/chrome/i) && Q(/android/i), Ln = {
  capture: !1,
  passive: !1
};
function k(n, e, t) {
  n.addEventListener(e, t, !ne && Ln);
}
function $(n, e, t) {
  n.removeEventListener(e, t, !ne && Ln);
}
function _t(n, e) {
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
function Un(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function W(n, e, t, o) {
  if (n) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? n.parentNode === t && _t(n, e) : _t(n, e)) || o && n === t)
        return n;
      if (n === t) break;
    } while (n = Un(n));
  }
  return null;
}
var yn = /\s+/g;
function B(n, e, t) {
  if (n && e)
    if (n.classList)
      n.classList[t ? "add" : "remove"](e);
    else {
      var o = (" " + n.className + " ").replace(yn, " ").replace(" " + e + " ", " ");
      n.className = (o + (t ? " " + e : "")).replace(yn, " ");
    }
}
function b(n, e, t) {
  var o = n && n.style;
  if (o) {
    if (t === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? t = document.defaultView.getComputedStyle(n, "") : n.currentStyle && (t = n.currentStyle), e === void 0 ? t : t[e];
    !(e in o) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), o[e] = t + (typeof t == "string" ? "" : "px");
  }
}
function Ae(n, e) {
  var t = "";
  if (typeof n == "string")
    t = n;
  else
    do {
      var o = b(n, "transform");
      o && o !== "none" && (t = o + " " + t);
    } while (!e && (n = n.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(t);
}
function Bn(n, e, t) {
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
function O(n, e, t, o, r) {
  if (!(!n.getBoundingClientRect && n !== window)) {
    var i, a, s, l, d, h, c;
    if (n !== window && n.parentNode && n !== V() ? (i = n.getBoundingClientRect(), a = i.top, s = i.left, l = i.bottom, d = i.right, h = i.height, c = i.width) : (a = 0, s = 0, l = window.innerHeight, d = window.innerWidth, h = window.innerHeight, c = window.innerWidth), (e || t) && n !== window && (r = r || n.parentNode, !ne))
      do
        if (r && r.getBoundingClientRect && (b(r, "transform") !== "none" || t && b(r, "position") !== "static")) {
          var f = r.getBoundingClientRect();
          a -= f.top + parseInt(b(r, "border-top-width")), s -= f.left + parseInt(b(r, "border-left-width")), l = a + i.height, d = s + i.width;
          break;
        }
      while (r = r.parentNode);
    if (o && n !== window) {
      var v = Ae(r || n), x = v && v.a, u = v && v.d;
      v && (a /= u, s /= x, c /= x, h /= u, l = a + h, d = s + c);
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
function wn(n, e, t) {
  for (var o = le(n, !0), r = O(n)[e]; o; ) {
    var i = O(o)[t], a = void 0;
    if (a = r >= i, !a) return o;
    if (o === V()) break;
    o = le(o, !1);
  }
  return !1;
}
function Oe(n, e, t, o) {
  for (var r = 0, i = 0, a = n.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== m.ghost && (o || a[i] !== m.dragged) && W(a[i], t.draggable, n, !1)) {
      if (r === e)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function tn(n, e) {
  for (var t = n.lastElementChild; t && (t === m.ghost || b(t, "display") === "none" || e && !_t(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function Y(n, e) {
  var t = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== m.clone && (!e || _t(n, e)) && t++;
  return t;
}
function xn(n) {
  var e = 0, t = 0, o = V();
  if (n)
    do {
      var r = Ae(n), i = r.a, a = r.d;
      e += n.scrollLeft * i, t += n.scrollTop * a;
    } while (n !== o && (n = n.parentNode));
  return [e, t];
}
function No(n, e) {
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
      var r = b(t);
      if (t.clientWidth < t.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return V();
        if (o || e) return t;
        o = !0;
      }
    }
  while (t = t.parentNode);
  return V();
}
function Io(n, e) {
  if (n && e)
    for (var t in e)
      e.hasOwnProperty(t) && (n[t] = e[t]);
  return n;
}
function Pt(n, e) {
  return Math.round(n.top) === Math.round(e.top) && Math.round(n.left) === Math.round(e.left) && Math.round(n.height) === Math.round(e.height) && Math.round(n.width) === Math.round(e.width);
}
var Ge;
function qn(n, e) {
  return function() {
    if (!Ge) {
      var t = arguments, o = this;
      t.length === 1 ? n.call(o, t[0]) : n.apply(o, t), Ge = setTimeout(function() {
        Ge = void 0;
      }, e);
    }
  };
}
function zo() {
  clearTimeout(Ge), Ge = void 0;
}
function Yn(n, e, t) {
  n.scrollLeft += e, n.scrollTop += t;
}
function jn(n) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(n).cloneNode(!0) : t ? t(n).clone(!0)[0] : n.cloneNode(!0);
}
function Wn(n, e, t) {
  var o = {};
  return Array.from(n.children).forEach(function(r) {
    var i, a, s, l;
    if (!(!W(r, e.draggable, n, !1) || r.animated || r === t)) {
      var d = O(r);
      o.left = Math.min((i = o.left) !== null && i !== void 0 ? i : 1 / 0, d.left), o.top = Math.min((a = o.top) !== null && a !== void 0 ? a : 1 / 0, d.top), o.right = Math.max((s = o.right) !== null && s !== void 0 ? s : -1 / 0, d.right), o.bottom = Math.max((l = o.bottom) !== null && l !== void 0 ? l : -1 / 0, d.bottom);
    }
  }), o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
var L = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ro() {
  var n = [], e;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(r) {
          if (!(b(r, "display") === "none" || r === m.ghost)) {
            n.push({
              target: r,
              rect: O(r)
            });
            var i = Z({}, n[n.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = Ae(r, !0);
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
      n.splice(No(n, {
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
        var l = 0, d = s.target, h = d.fromRect, c = O(d), f = d.prevFromRect, v = d.prevToRect, x = s.rect, u = Ae(d, !0);
        u && (c.top -= u.f, c.left -= u.e), d.toRect = c, d.thisAnimationDuration && Pt(f, c) && !Pt(h, c) && // Make sure animatingRect is on line between toRect & fromRect
        (x.top - c.top) / (x.left - c.left) === (h.top - c.top) / (h.left - c.left) && (l = Ho(x, f, v, r.options)), Pt(c, h) || (d.prevFromRect = h, d.prevToRect = c, l || (l = r.options.animation), r.animate(d, x, c, l)), l && (i = !0, a = Math.max(a, l), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, l), d.thisAnimationDuration = l);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, a) : typeof o == "function" && o(), n = [];
    },
    animate: function(o, r, i, a) {
      if (a) {
        b(o, "transition", ""), b(o, "transform", "");
        var s = Ae(this.el), l = s && s.a, d = s && s.d, h = (r.left - i.left) / (l || 1), c = (r.top - i.top) / (d || 1);
        o.animatingX = !!h, o.animatingY = !!c, b(o, "transform", "translate3d(" + h + "px," + c + "px,0)"), this.forRepaintDummy = Fo(o), b(o, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), b(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          b(o, "transition", ""), b(o, "transform", ""), o.animated = !1, o.animatingX = !1, o.animatingY = !1;
        }, a);
      }
    }
  };
}
function Fo(n) {
  return n.offsetWidth;
}
function Ho(n, e, t, o) {
  return Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * o.animation;
}
var $e = [], Nt = {
  initializeByDefault: !0
}, ot = {
  mount: function(e) {
    for (var t in Nt)
      Nt.hasOwnProperty(t) && !(t in e) && (e[t] = Nt[t]);
    $e.forEach(function(o) {
      if (o.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), $e.push(e);
  },
  pluginEvent: function(e, t, o) {
    var r = this;
    this.eventCanceled = !1, o.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = e + "Global";
    $e.forEach(function(a) {
      t[a.pluginName] && (t[a.pluginName][i] && t[a.pluginName][i](Z({
        sortable: t
      }, o)), t.options[a.pluginName] && t[a.pluginName][e] && t[a.pluginName][e](Z({
        sortable: t
      }, o)));
    });
  },
  initializePlugins: function(e, t, o, r) {
    $e.forEach(function(s) {
      var l = s.pluginName;
      if (!(!e.options[l] && !s.initializeByDefault)) {
        var d = new s(e, t, e.options);
        d.sortable = e, d.options = e.options, e[l] = d, te(o, d.defaults);
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
    return $e.forEach(function(r) {
      typeof r.eventProperties == "function" && te(o, r.eventProperties.call(t[r.pluginName], e));
    }), o;
  },
  modifyOption: function(e, t, o) {
    var r;
    return $e.forEach(function(i) {
      e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], o));
    }), r;
  }
};
function Lo(n) {
  var e = n.sortable, t = n.rootEl, o = n.name, r = n.targetEl, i = n.cloneEl, a = n.toEl, s = n.fromEl, l = n.oldIndex, d = n.newIndex, h = n.oldDraggableIndex, c = n.newDraggableIndex, f = n.originalEvent, v = n.putSortable, x = n.extraEventProperties;
  if (e = e || t && t[L], !!e) {
    var u, S = e.options, C = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !ne && !nt ? u = new CustomEvent(o, {
      bubbles: !0,
      cancelable: !0
    }) : (u = document.createEvent("Event"), u.initEvent(o, !0, !0)), u.to = a || t, u.from = s || t, u.item = r || t, u.clone = i, u.oldIndex = l, u.newIndex = d, u.oldDraggableIndex = h, u.newDraggableIndex = c, u.originalEvent = f, u.pullMode = v ? v.lastPutMode : void 0;
    var M = Z(Z({}, x), ot.getEventProperties(o, e));
    for (var F in M)
      u[F] = M[F];
    t && t.dispatchEvent(u), S[C] && S[C].call(e, u);
  }
}
var Uo = ["evt"], H = function(e, t) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = o.evt, i = Mo(o, Uo);
  ot.pluginEvent.bind(m)(e, t, Z({
    dragEl: p,
    parentEl: A,
    ghostEl: y,
    rootEl: E,
    nextEl: ve,
    lastDownEl: pt,
    cloneEl: D,
    cloneHidden: se,
    dragStarted: Le,
    putSortable: P,
    activeSortable: m.active,
    originalEvent: r,
    oldIndex: De,
    oldDraggableIndex: Ve,
    newIndex: q,
    newDraggableIndex: ie,
    hideGhostForTarget: Zn,
    unhideGhostForTarget: Kn,
    cloneNowHidden: function() {
      se = !0;
    },
    cloneNowShown: function() {
      se = !1;
    },
    dispatchSortableEvent: function(s) {
      R({
        sortable: t,
        name: s,
        originalEvent: r
      });
    }
  }, i));
};
function R(n) {
  Lo(Z({
    putSortable: P,
    cloneEl: D,
    targetEl: p,
    rootEl: E,
    oldIndex: De,
    oldDraggableIndex: Ve,
    newIndex: q,
    newDraggableIndex: ie
  }, n));
}
var p, A, y, E, ve, pt, D, se, De, q, Ve, ie, at, P, Ee = !1, yt = !1, wt = [], be, j, It, zt, $n, kn, Le, ke, Ze, Ke = !1, st = !1, ft, N, Rt = [], Yt = !1, xt = [], Dt = typeof document < "u", lt = en, Sn = nt || ne ? "cssFloat" : "float", Bo = Dt && !Hn && !en && "draggable" in document.createElement("div"), Xn = (function() {
  if (Dt) {
    if (ne)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
})(), Gn = function(e, t) {
  var o = b(e), r = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), i = Oe(e, 0, t), a = Oe(e, 1, t), s = i && b(i), l = a && b(a), d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + O(i).width, h = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + O(a).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return i && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || d >= r && o[Sn] === "none" || a && o[Sn] === "none" && d + h > r) ? "vertical" : "horizontal";
}, qo = function(e, t, o) {
  var r = o ? e.left : e.top, i = o ? e.right : e.bottom, a = o ? e.width : e.height, s = o ? t.left : t.top, l = o ? t.right : t.bottom, d = o ? t.width : t.height;
  return r === s || i === l || r + a / 2 === s + d / 2;
}, Yo = function(e, t) {
  var o;
  return wt.some(function(r) {
    var i = r[L].options.emptyInsertThreshold;
    if (!(!i || tn(r))) {
      var a = O(r), s = e >= a.left - i && e <= a.right + i, l = t >= a.top - i && t <= a.bottom + i;
      if (s && l)
        return o = r;
    }
  }), o;
}, Vn = function(e) {
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
  var o = {}, r = e.group;
  (!r || ut(r) != "object") && (r = {
    name: r
  }), o.name = r.name, o.checkPull = t(r.pull, !0), o.checkPut = t(r.put), o.revertClone = r.revertClone, e.group = o;
}, Zn = function() {
  !Xn && y && b(y, "display", "none");
}, Kn = function() {
  !Xn && y && b(y, "display", "");
};
Dt && !Hn && document.addEventListener("click", function(n) {
  if (yt)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), yt = !1, !1;
}, !0);
var me = function(e) {
  if (p) {
    e = e.touches ? e.touches[0] : e;
    var t = Yo(e.clientX, e.clientY);
    if (t) {
      var o = {};
      for (var r in e)
        e.hasOwnProperty(r) && (o[r] = e[r]);
      o.target = o.rootEl = t, o.preventDefault = void 0, o.stopPropagation = void 0, t[L]._onDragOver(o);
    }
  }
}, jo = function(e) {
  p && p.parentNode[L]._isOutsideThisEl(e.target);
};
function m(n, e) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = e = te({}, e), n[L] = this;
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
      return Gn(n, this.options);
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
    supportPointer: m.supportPointer !== !1 && "PointerEvent" in window && (!Xe || en),
    emptyInsertThreshold: 5
  };
  ot.initializePlugins(this, n, t);
  for (var o in t)
    !(o in e) && (e[o] = t[o]);
  Vn(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Bo, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? k(n, "pointerdown", this._onTapStart) : (k(n, "mousedown", this._onTapStart), k(n, "touchstart", this._onTapStart)), this.nativeDraggable && (k(n, "dragover", this), k(n, "dragenter", this)), wt.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), te(this, Ro());
}
m.prototype = /** @lends Sortable.prototype */
{
  constructor: m,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (ke = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, p) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, o = this.el, r = this.options, i = r.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, d = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, h = r.filter;
      if (Qo(o), !p && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Xe && l && l.tagName.toUpperCase() === "SELECT") && (l = W(l, r.draggable, o, !1), !(l && l.animated) && pt !== l)) {
        if (De = Y(l), Ve = Y(l, r.draggable), typeof h == "function") {
          if (h.call(this, e, l, this)) {
            R({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: l,
              toEl: o,
              fromEl: o
            }), H("filter", t, {
              evt: e
            }), i && e.preventDefault();
            return;
          }
        } else if (h && (h = h.split(",").some(function(c) {
          if (c = W(d, c.trim(), o, !1), c)
            return R({
              sortable: t,
              rootEl: c,
              name: "filter",
              targetEl: l,
              fromEl: o,
              toEl: o
            }), H("filter", t, {
              evt: e
            }), !0;
        }), h)) {
          i && e.preventDefault();
          return;
        }
        r.handle && !W(d, r.handle, o, !1) || this._prepareDragStart(e, s, l);
      }
    }
  },
  _prepareDragStart: function(e, t, o) {
    var r = this, i = r.el, a = r.options, s = i.ownerDocument, l;
    if (o && !p && o.parentNode === i) {
      var d = O(o);
      if (E = i, p = o, A = p.parentNode, ve = p.nextSibling, pt = o, at = a.group, m.dragged = p, be = {
        target: p,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, $n = be.clientX - d.left, kn = be.clientY - d.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, p.style["will-change"] = "all", l = function() {
        if (H("delayEnded", r, {
          evt: e
        }), m.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !_n && r.nativeDraggable && (p.draggable = !0), r._triggerDragStart(e, t), R({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), B(p, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(h) {
        Bn(p, h.trim(), Ft);
      }), k(s, "dragover", me), k(s, "mousemove", me), k(s, "touchmove", me), a.supportPointer ? (k(s, "pointerup", r._onDrop), !this.nativeDraggable && k(s, "pointercancel", r._onDrop)) : (k(s, "mouseup", r._onDrop), k(s, "touchend", r._onDrop), k(s, "touchcancel", r._onDrop)), _n && this.nativeDraggable && (this.options.touchStartThreshold = 4, p.draggable = !0), H("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(nt || ne))) {
        if (m.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (k(s, "pointerup", r._disableDelayedDrag), k(s, "pointercancel", r._disableDelayedDrag)) : (k(s, "mouseup", r._disableDelayedDrag), k(s, "touchend", r._disableDelayedDrag), k(s, "touchcancel", r._disableDelayedDrag)), k(s, "mousemove", r._delayedDragTouchMoveHandler), k(s, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && k(s, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(l, a.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    p && Ft(p), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    $(e, "mouseup", this._disableDelayedDrag), $(e, "touchend", this._disableDelayedDrag), $(e, "touchcancel", this._disableDelayedDrag), $(e, "pointerup", this._disableDelayedDrag), $(e, "pointercancel", this._disableDelayedDrag), $(e, "mousemove", this._delayedDragTouchMoveHandler), $(e, "touchmove", this._delayedDragTouchMoveHandler), $(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? k(document, "pointermove", this._onTouchMove) : t ? k(document, "touchmove", this._onTouchMove) : k(document, "mousemove", this._onTouchMove) : (k(p, "dragend", this), k(E, "dragstart", this._onDragStart));
    try {
      document.selection ? gt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (Ee = !1, E && p) {
      H("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && k(document, "dragover", jo);
      var o = this.options;
      !e && B(p, o.dragClass, !1), B(p, o.ghostClass, !0), m.active = this, e && this._appendGhost(), R({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (j) {
      this._lastX = j.clientX, this._lastY = j.clientY, Zn();
      for (var e = document.elementFromPoint(j.clientX, j.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(j.clientX, j.clientY), e !== t); )
        t = e;
      if (p.parentNode[L]._isOutsideThisEl(e), t)
        do {
          if (t[L]) {
            var o = void 0;
            if (o = t[L]._onDragOver({
              clientX: j.clientX,
              clientY: j.clientY,
              target: e,
              rootEl: t
            }), o && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = Un(t));
      Kn();
    }
  },
  _onTouchMove: function(e) {
    if (be) {
      var t = this.options, o = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = y && Ae(y, !0), s = y && a && a.a, l = y && a && a.d, d = lt && N && xn(N), h = (i.clientX - be.clientX + r.x) / (s || 1) + (d ? d[0] - Rt[0] : 0) / (s || 1), c = (i.clientY - be.clientY + r.y) / (l || 1) + (d ? d[1] - Rt[1] : 0) / (l || 1);
      if (!m.active && !Ee) {
        if (o && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < o)
          return;
        this._onDragStart(e, !0);
      }
      if (y) {
        a ? (a.e += h - (It || 0), a.f += c - (zt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: h,
          f: c
        };
        var f = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        b(y, "webkitTransform", f), b(y, "mozTransform", f), b(y, "msTransform", f), b(y, "transform", f), It = h, zt = c, j = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!y) {
      var e = this.options.fallbackOnBody ? document.body : E, t = O(p, !0, lt, !0, e), o = this.options;
      if (lt) {
        for (N = e; b(N, "position") === "static" && b(N, "transform") === "none" && N !== document; )
          N = N.parentNode;
        N !== document.body && N !== document.documentElement ? (N === document && (N = V()), t.top += N.scrollTop, t.left += N.scrollLeft) : N = V(), Rt = xn(N);
      }
      y = p.cloneNode(!0), B(y, o.ghostClass, !1), B(y, o.fallbackClass, !0), B(y, o.dragClass, !0), b(y, "transition", ""), b(y, "transform", ""), b(y, "box-sizing", "border-box"), b(y, "margin", 0), b(y, "top", t.top), b(y, "left", t.left), b(y, "width", t.width), b(y, "height", t.height), b(y, "opacity", "0.8"), b(y, "position", lt ? "absolute" : "fixed"), b(y, "zIndex", "100000"), b(y, "pointerEvents", "none"), m.ghost = y, e.appendChild(y), b(y, "transform-origin", $n / parseInt(y.style.width) * 100 + "% " + kn / parseInt(y.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var o = this, r = e.dataTransfer, i = o.options;
    if (H("dragStart", this, {
      evt: e
    }), m.eventCanceled) {
      this._onDrop();
      return;
    }
    H("setupClone", this), m.eventCanceled || (D = jn(p), D.removeAttribute("id"), D.draggable = !1, D.style["will-change"] = "", this._hideClone(), B(D, this.options.chosenClass, !1), m.clone = D), o.cloneId = gt(function() {
      H("clone", o), !m.eventCanceled && (o.options.removeCloneOnHide || E.insertBefore(D, p), o._hideClone(), R({
        sortable: o,
        name: "clone"
      }));
    }), !t && B(p, i.dragClass, !0), t ? (yt = !0, o._loopId = setInterval(o._emulateDragOver, 50)) : ($(document, "mouseup", o._onDrop), $(document, "touchend", o._onDrop), $(document, "touchcancel", o._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(o, r, p)), k(document, "drop", o), b(p, "transform", "translateZ(0)")), Ee = !0, o._dragStartId = gt(o._dragStarted.bind(o, t, e)), k(document, "selectstart", o), Le = !0, window.getSelection().removeAllRanges(), Xe && b(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, o = e.target, r, i, a, s = this.options, l = s.group, d = m.active, h = at === l, c = s.sort, f = P || d, v, x = this, u = !1;
    if (Yt) return;
    function S(Fe, so) {
      H(Fe, x, Z({
        evt: e,
        isOwner: h,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: c,
        fromSortable: f,
        target: o,
        completed: M,
        onMove: function(an, lo) {
          return dt(E, t, p, r, an, O(an), e, lo);
        },
        changed: F
      }, so));
    }
    function C() {
      S("dragOverAnimationCapture"), x.captureAnimationState(), x !== f && f.captureAnimationState();
    }
    function M(Fe) {
      return S("dragOverCompleted", {
        insertion: Fe
      }), Fe && (h ? d._hideClone() : d._showClone(x), x !== f && (B(p, P ? P.options.ghostClass : d.options.ghostClass, !1), B(p, s.ghostClass, !0)), P !== x && x !== m.active ? P = x : x === m.active && P && (P = null), f === x && (x._ignoreWhileAnimating = o), x.animateAll(function() {
        S("dragOverAnimationComplete"), x._ignoreWhileAnimating = null;
      }), x !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (o === p && !p.animated || o === t && !o.animated) && (ke = null), !s.dragoverBubble && !e.rootEl && o !== document && (p.parentNode[L]._isOutsideThisEl(e.target), !Fe && me(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), u = !0;
    }
    function F() {
      q = Y(p), ie = Y(p, s.draggable), R({
        sortable: x,
        name: "change",
        toEl: t,
        newIndex: q,
        newDraggableIndex: ie,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = W(o, s.draggable, t, !0), S("dragOver"), m.eventCanceled) return u;
    if (p.contains(e.target) || o.animated && o.animatingX && o.animatingY || x._ignoreWhileAnimating === o)
      return M(!1);
    if (yt = !1, d && !s.disabled && (h ? c || (a = A !== E) : P === this || (this.lastPutMode = at.checkPull(this, d, p, e)) && l.checkPut(this, d, p, e))) {
      if (v = this._getDirection(e, o) === "vertical", r = O(p), S("dragOverValid"), m.eventCanceled) return u;
      if (a)
        return A = E, C(), this._hideClone(), S("revert"), m.eventCanceled || (ve ? E.insertBefore(p, ve) : E.appendChild(p)), M(!0);
      var z = tn(t, s.draggable);
      if (!z || Vo(e, v, this) && !z.animated) {
        if (z === p)
          return M(!1);
        if (z && t === e.target && (o = z), o && (i = O(o)), dt(E, t, p, r, o, i, e, !!o) !== !1)
          return C(), z && z.nextSibling ? t.insertBefore(p, z.nextSibling) : t.appendChild(p), A = t, F(), M(!0);
      } else if (z && Go(e, v, this)) {
        var ue = Oe(t, 0, s, !0);
        if (ue === p)
          return M(!1);
        if (o = ue, i = O(o), dt(E, t, p, r, o, i, e, !1) !== !1)
          return C(), t.insertBefore(p, ue), A = t, F(), M(!0);
      } else if (o.parentNode === t) {
        i = O(o);
        var X = 0, pe, Ne = p.parentNode !== t, U = !qo(p.animated && p.toRect || r, o.animated && o.toRect || i, v), Ie = v ? "top" : "left", oe = wn(o, "top", "top") || wn(p, "top", "top"), ze = oe ? oe.scrollTop : void 0;
        ke !== o && (pe = i[Ie], Ke = !1, st = !U && s.invertSwap || Ne), X = Zo(e, o, i, v, U ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, st, ke === o);
        var J;
        if (X !== 0) {
          var fe = Y(p);
          do
            fe -= X, J = A.children[fe];
          while (J && (b(J, "display") === "none" || J === y));
        }
        if (X === 0 || J === o)
          return M(!1);
        ke = o, Ze = X;
        var Re = o.nextElementSibling, re = !1;
        re = X === 1;
        var it = dt(E, t, p, r, o, i, e, re);
        if (it !== !1)
          return (it === 1 || it === -1) && (re = it === 1), Yt = !0, setTimeout(Xo, 30), C(), re && !Re ? t.appendChild(p) : o.parentNode.insertBefore(p, re ? Re : o), oe && Yn(oe, 0, ze - oe.scrollTop), A = p.parentNode, pe !== void 0 && !st && (ft = Math.abs(pe - O(o)[Ie])), F(), M(!0);
      }
      if (t.contains(p))
        return M(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    $(document, "mousemove", this._onTouchMove), $(document, "touchmove", this._onTouchMove), $(document, "pointermove", this._onTouchMove), $(document, "dragover", me), $(document, "mousemove", me), $(document, "touchmove", me);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    $(e, "mouseup", this._onDrop), $(e, "touchend", this._onDrop), $(e, "pointerup", this._onDrop), $(e, "pointercancel", this._onDrop), $(e, "touchcancel", this._onDrop), $(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, o = this.options;
    if (q = Y(p), ie = Y(p, o.draggable), H("drop", this, {
      evt: e
    }), A = p && p.parentNode, q = Y(p), ie = Y(p, o.draggable), m.eventCanceled) {
      this._nulling();
      return;
    }
    Ee = !1, st = !1, Ke = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), jt(this.cloneId), jt(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Xe && b(document.body, "user-select", ""), b(p, "transform", ""), e && (Le && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), y && y.parentNode && y.parentNode.removeChild(y), (E === A || P && P.lastPutMode !== "clone") && D && D.parentNode && D.parentNode.removeChild(D), p && (this.nativeDraggable && $(p, "dragend", this), Ft(p), p.style["will-change"] = "", Le && !Ee && B(p, P ? P.options.ghostClass : this.options.ghostClass, !1), B(p, this.options.chosenClass, !1), R({
      sortable: this,
      name: "unchoose",
      toEl: A,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), E !== A ? (q >= 0 && (R({
      rootEl: A,
      name: "add",
      toEl: A,
      fromEl: E,
      originalEvent: e
    }), R({
      sortable: this,
      name: "remove",
      toEl: A,
      originalEvent: e
    }), R({
      rootEl: A,
      name: "sort",
      toEl: A,
      fromEl: E,
      originalEvent: e
    }), R({
      sortable: this,
      name: "sort",
      toEl: A,
      originalEvent: e
    })), P && P.save()) : q !== De && q >= 0 && (R({
      sortable: this,
      name: "update",
      toEl: A,
      originalEvent: e
    }), R({
      sortable: this,
      name: "sort",
      toEl: A,
      originalEvent: e
    })), m.active && ((q == null || q === -1) && (q = De, ie = Ve), R({
      sortable: this,
      name: "end",
      toEl: A,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    H("nulling", this), E = p = A = y = ve = D = pt = se = be = j = Le = q = ie = De = Ve = ke = Ze = P = at = m.dragged = m.ghost = m.clone = m.active = null, xt.forEach(function(e) {
      e.checked = !0;
    }), xt.length = It = zt = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        p && (this._onDragOver(e), Wo(e));
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
      t = o[r], W(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || Jo(t));
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
    var r = ot.modifyOption(this, e, t);
    typeof r < "u" ? o[e] = r : o[e] = t, e === "group" && Vn(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    H("destroy", this);
    var e = this.el;
    e[L] = null, $(e, "mousedown", this._onTapStart), $(e, "touchstart", this._onTapStart), $(e, "pointerdown", this._onTapStart), this.nativeDraggable && ($(e, "dragover", this), $(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), wt.splice(wt.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!se) {
      if (H("hideClone", this), m.eventCanceled) return;
      b(D, "display", "none"), this.options.removeCloneOnHide && D.parentNode && D.parentNode.removeChild(D), se = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (se) {
      if (H("showClone", this), m.eventCanceled) return;
      p.parentNode == E && !this.options.group.revertClone ? E.insertBefore(D, p) : ve ? E.insertBefore(D, ve) : E.appendChild(D), this.options.group.revertClone && this.animate(p, D), b(D, "display", ""), se = !1;
    }
  }
};
function Wo(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function dt(n, e, t, o, r, i, a, s) {
  var l, d = n[L], h = d.options.onMove, c;
  return window.CustomEvent && !ne && !nt ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = n, l.dragged = t, l.draggedRect = o, l.related = r || e, l.relatedRect = i || O(e), l.willInsertAfter = s, l.originalEvent = a, n.dispatchEvent(l), h && (c = h.call(d, l, a)), c;
}
function Ft(n) {
  n.draggable = !1;
}
function Xo() {
  Yt = !1;
}
function Go(n, e, t) {
  var o = O(Oe(t.el, 0, t.options, !0)), r = Wn(t.el, t.options, y), i = 10;
  return e ? n.clientX < r.left - i || n.clientY < o.top && n.clientX < o.right : n.clientY < r.top - i || n.clientY < o.bottom && n.clientX < o.left;
}
function Vo(n, e, t) {
  var o = O(tn(t.el, t.options.draggable)), r = Wn(t.el, t.options, y), i = 10;
  return e ? n.clientX > r.right + i || n.clientY > o.bottom && n.clientX > o.left : n.clientY > r.bottom + i || n.clientX > o.right && n.clientY > o.top;
}
function Zo(n, e, t, o, r, i, a, s) {
  var l = o ? n.clientY : n.clientX, d = o ? t.height : t.width, h = o ? t.top : t.left, c = o ? t.bottom : t.right, f = !1;
  if (!a) {
    if (s && ft < d * r) {
      if (!Ke && (Ze === 1 ? l > h + d * i / 2 : l < c - d * i / 2) && (Ke = !0), Ke)
        f = !0;
      else if (Ze === 1 ? l < h + ft : l > c - ft)
        return -Ze;
    } else if (l > h + d * (1 - r) / 2 && l < c - d * (1 - r) / 2)
      return Ko(e);
  }
  return f = f || a, f && (l < h + d * i / 2 || l > c - d * i / 2) ? l > h + d / 2 ? 1 : -1 : 0;
}
function Ko(n) {
  return Y(p) < Y(n) ? 1 : -1;
}
function Jo(n) {
  for (var e = n.tagName + n.className + n.src + n.href + n.textContent, t = e.length, o = 0; t--; )
    o += e.charCodeAt(t);
  return o.toString(36);
}
function Qo(n) {
  xt.length = 0;
  for (var e = n.getElementsByTagName("input"), t = e.length; t--; ) {
    var o = e[t];
    o.checked && xt.push(o);
  }
}
function gt(n) {
  return setTimeout(n, 0);
}
function jt(n) {
  return clearTimeout(n);
}
Dt && k(document, "touchmove", function(n) {
  (m.active || Ee) && n.cancelable && n.preventDefault();
});
m.utils = {
  on: k,
  off: $,
  css: b,
  find: Bn,
  is: function(e, t) {
    return !!W(e, t, e, !1);
  },
  extend: Io,
  throttle: qn,
  closest: W,
  toggleClass: B,
  clone: jn,
  index: Y,
  nextTick: gt,
  cancelNextTick: jt,
  detectDirection: Gn,
  getChild: Oe,
  expando: L
};
m.get = function(n) {
  return n[L];
};
m.mount = function() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (m.utils = Z(Z({}, m.utils), o.utils)), ot.mount(o);
  });
};
m.create = function(n, e) {
  return new m(n, e);
};
m.version = Po;
var T = [], Ue, Wt, Xt = !1, Ht, Lt, $t, Be;
function er() {
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
      this.sortable.nativeDraggable ? k(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? k(document, "pointermove", this._handleFallbackAutoScroll) : o.touches ? k(document, "touchmove", this._handleFallbackAutoScroll) : k(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var o = t.originalEvent;
      !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
    },
    drop: function() {
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), En(), bt(), zo();
    },
    nulling: function() {
      $t = Wt = Ue = Xt = Be = Ht = Lt = null, T.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, o) {
      var r = this, i = (t.touches ? t.touches[0] : t).clientX, a = (t.touches ? t.touches[0] : t).clientY, s = document.elementFromPoint(i, a);
      if ($t = t, o || this.options.forceAutoScrollFallback || nt || ne || Xe) {
        Ut(t, this.options, s, o);
        var l = le(s, !0);
        Xt && (!Be || i !== Ht || a !== Lt) && (Be && En(), Be = setInterval(function() {
          var d = le(document.elementFromPoint(i, a), !0);
          d !== l && (l = d, bt()), Ut(t, r.options, d, o);
        }, 10), Ht = i, Lt = a);
      } else {
        if (!this.options.bubbleScroll || le(s, !0) === V()) {
          bt();
          return;
        }
        Ut(t, this.options, le(s, !1), !1);
      }
    }
  }, te(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function bt() {
  T.forEach(function(n) {
    clearInterval(n.pid);
  }), T = [];
}
function En() {
  clearInterval(Be);
}
var Ut = qn(function(n, e, t, o) {
  if (e.scroll) {
    var r = (n.touches ? n.touches[0] : n).clientX, i = (n.touches ? n.touches[0] : n).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = V(), d = !1, h;
    Wt !== t && (Wt = t, bt(), Ue = e.scroll, h = e.scrollFn, Ue === !0 && (Ue = le(t, !0)));
    var c = 0, f = Ue;
    do {
      var v = f, x = O(v), u = x.top, S = x.bottom, C = x.left, M = x.right, F = x.width, z = x.height, ue = void 0, X = void 0, pe = v.scrollWidth, Ne = v.scrollHeight, U = b(v), Ie = v.scrollLeft, oe = v.scrollTop;
      v === l ? (ue = F < pe && (U.overflowX === "auto" || U.overflowX === "scroll" || U.overflowX === "visible"), X = z < Ne && (U.overflowY === "auto" || U.overflowY === "scroll" || U.overflowY === "visible")) : (ue = F < pe && (U.overflowX === "auto" || U.overflowX === "scroll"), X = z < Ne && (U.overflowY === "auto" || U.overflowY === "scroll"));
      var ze = ue && (Math.abs(M - r) <= a && Ie + F < pe) - (Math.abs(C - r) <= a && !!Ie), J = X && (Math.abs(S - i) <= a && oe + z < Ne) - (Math.abs(u - i) <= a && !!oe);
      if (!T[c])
        for (var fe = 0; fe <= c; fe++)
          T[fe] || (T[fe] = {});
      (T[c].vx != ze || T[c].vy != J || T[c].el !== v) && (T[c].el = v, T[c].vx = ze, T[c].vy = J, clearInterval(T[c].pid), (ze != 0 || J != 0) && (d = !0, T[c].pid = setInterval((function() {
        o && this.layer === 0 && m.active._onTouchMove($t);
        var Re = T[this.layer].vy ? T[this.layer].vy * s : 0, re = T[this.layer].vx ? T[this.layer].vx * s : 0;
        typeof h == "function" && h.call(m.dragged.parentNode[L], re, Re, n, $t, T[this.layer].el) !== "continue" || Yn(T[this.layer].el, re, Re);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && f !== l && (f = le(f, !1)));
    Xt = d;
  }
}, 30), Jn = function(e) {
  var t = e.originalEvent, o = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, s = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var d = o || i;
    s();
    var h = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, c = document.elementFromPoint(h.clientX, h.clientY);
    l(), d && !d.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: o
    }));
  }
};
function nn() {
}
nn.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var r = Oe(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), o && o.animateAll();
  },
  drop: Jn
};
te(nn, {
  pluginName: "revertOnSpill"
});
function on() {
}
on.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable, r = o || this.sortable;
    r.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), r.animateAll();
  },
  drop: Jn
};
te(on, {
  pluginName: "removeOnSpill"
});
m.mount(new er());
m.mount(on, nn);
const Me = "household_kanban";
function tr(n, e) {
  return n.connection.subscribeMessage((t) => e(t.board), { type: `${Me}/subscribe` });
}
function ct(n, e, t) {
  return n.callService(Me, "set_status", { uid: e, status: t });
}
function nr(n, e) {
  return n.connection.sendMessagePromise({ type: `${Me}/history`, ...e });
}
function or(n, e) {
  return n.callService(Me, "create_item", { ...e });
}
function Bt(n, e, t) {
  return n.callService(Me, "update_item", { uid: e, ...t });
}
function rr(n, e) {
  return n.callService(Me, "delete_item", { uid: e });
}
const ir = 864e5;
function I(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
const de = (n) => String(n).padStart(2, "0");
function ee(n) {
  return `${n.getFullYear()}-${de(n.getMonth() + 1)}-${de(n.getDate())}`;
}
function ar(n, e) {
  if (!n) return null;
  if (!e) return n;
  const [t, o, r] = n.split("-").map(Number), [i, a] = e.split(":").map(Number), s = -new Date(t, o - 1, r, i, a).getTimezoneOffset(), l = Math.abs(s);
  return `${n}T${de(i)}:${de(a)}:00${s < 0 ? "-" : "+"}${de(Math.floor(l / 60))}:${de(l % 60)}`;
}
function sr(n) {
  if (!n) return "";
  const { date: e, hasTime: t } = K(n);
  return t ? `${de(e.getHours())}:${de(e.getMinutes())}` : "";
}
function G(n, e) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + e);
}
function rn(n, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / ir);
}
function K(n) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(n)) {
    const [e, t, o] = n.split("-").map(Number);
    return { date: new Date(e, t - 1, o), hasTime: !1 };
  }
  return { date: new Date(n), hasTime: !0 };
}
function lr(n, e) {
  const t = I(n), o = (t.getDay() - e + 7) % 7, r = G(t, -o);
  return o === 6 ? { start: G(r, 7), end: G(r, 13) } : { start: r, end: G(r, 6) };
}
const dr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function Dn(n, e) {
  var r, i;
  if (n === "saturday") return 0;
  if (n === "sunday") return 1;
  const t = e == null ? void 0 : e.first_weekday, o = dr.indexOf(t ?? "");
  if (o >= 0) return o;
  try {
    const a = new Intl.Locale((e == null ? void 0 : e.language) ?? "en"), s = (i = ((r = a.getWeekInfo) == null ? void 0 : r.call(a)) ?? a.weekInfo) == null ? void 0 : i.firstDay;
    if (s) return s % 7;
  } catch {
  }
  return 1;
}
function we(n, e) {
  const t = I(e.now);
  if (n.status === "completed")
    return !n.completed_at || !e.enabled.has("done") ? null : rn(new Date(n.completed_at), t) < e.doneDays ? "done" : null;
  if (!n.due) return "todo";
  const o = I(K(n.due).date), r = (...i) => i.find((a) => e.enabled.has(a)) ?? "todo";
  return o < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : r("today", "week") : +o == +t ? r("today", "week") : o <= e.week.end ? r("week") : r("later");
}
const cr = 8;
function An(n, e, t) {
  return Math.hypot(n, e) >= cr;
}
function hr(n, e, t) {
  const o = n.status === "completed" ? { status: "needs_action" } : {};
  if (typeof e == "number")
    return n.status === "needs_action" && n.priority === e ? null : { ...o, ...n.priority === e ? {} : { priority: e } };
  if (e === "overdue" || we(n, t) === e) return null;
  if (e === "done") return { status: "completed" };
  if (e === "todo") return { ...o, due: null };
  if (e === "week") return { ...o, due: ee(t.week.end) };
  if (e === "later") return { ...o, due: ee(G(t.week.end, 1)) };
  const r = I(t.now);
  return n.due && +I(K(n.due).date) == +r ? Object.keys(o).length ? o : null : { ...o, due: ee(r) };
}
function ur(n) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(n, 10));
}
function pr(n) {
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
function fr(n, e) {
  let t = !1, o = !1;
  const r = (s = window.customElements) => {
    if (!s.get(n)) {
      try {
        s.define(n, e);
      } catch (l) {
        o || (o = !0, console.warn("household_kanban: could not register the card", l));
        return;
      }
      t && pr(n);
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
const Qn = {
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
  err_reopen: "Could not reopen the task.",
  lists: "Lists",
  move_to: "Move to…",
  older_history: "Older in history ({n})"
}, gr = {
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
  err_reopen: "Úkol se nepodařilo znovu otevřít.",
  lists: "Seznamy",
  move_to: "Přesunout do…",
  older_history: "Starší v historii ({n})"
}, br = { en: Qn, cs: gr };
function w(n, e, t = {}) {
  return (br[(n ?? "en").split("-")[0]] ?? Qn)[e].replace(/\{(\w+)\}/g, (r, i) => String(t[i] ?? ""));
}
const Cn = {
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
function qe(n, e, t) {
  const o = (n ?? "en").split("-")[0], r = o in Cn ? o : "en", i = Cn[r][e];
  return (i[new Intl.PluralRules(r).select(t)] ?? i.other).replace("{n}", String(t));
}
const mr = ho`
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
`, vr = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], rt = (n) => `c-${vr.includes(n) ? n : "grey"}`;
function At(n, e) {
  var t;
  return String(((t = n.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function _r(n) {
  return n.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function Pe(n, e = !1) {
  return g`<span class="dot ${e ? "sm" : ""} ${rt((n == null ? void 0 : n.color) ?? "grey")}"><ha-icon .icon=${(n == null ? void 0 : n.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function he(n, e, t = "", o = !1) {
  var s;
  if (!e) return g`<span class="ava none ${t}" title="-">+</span>`;
  const r = At(n, e), i = (s = n.states[e]) == null ? void 0 : s.attributes.entity_picture;
  if (typeof i == "string" && i) return g`<img class="ava ${t}" src=${i} alt=${o ? "" : r} title=${r} />`;
  const a = [...r].reduce((l, d) => (l * 31 + d.charCodeAt(0)) % 360, 7);
  return g`<span class="ava ${t}" title=${r} style="background:linear-gradient(135deg,hsl(${a} 55% 62%),hsl(${(a + 25) % 360} 55% 42%))">${_r(r)}</span>`;
}
const yr = g`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function eo(n, e, t = !1) {
  const o = n.status === "completed";
  return g`<button class="check ${t ? "xs" : ""}" type="button" aria-pressed=${o} aria-label=${n.summary}
    @click=${() => e.onToggle(n)}>${yr}</button>`;
}
function wr(n, e) {
  const { date: t, hasTime: o } = K(n.due), r = rn(I(e.now), t);
  let i;
  return r === -1 ? i = w(e.lang, "yesterday") : r < -1 ? i = w(e.lang, "days_ago", { n: -r }) : r === 0 ? i = w(e.lang, "today") : r === 1 ? i = w(e.lang, "tomorrow") : i = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), o ? `${i} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : i;
}
function xr(n, e) {
  const t = rn(new Date(n.completed_at), I(e.now));
  return t <= 0 ? w(e.lang, "done_today") : t === 1 ? w(e.lang, "done_yesterday") : w(e.lang, "done_days_ago", { n: t });
}
function to(n, e, t) {
  const o = n.status === "completed", r = e.parents.find((d) => d.id === n.parent), i = I(e.now), a = !o && n.due && I(K(n.due).date) < i, s = !o && n.due && +I(K(n.due).date) == +i, l = g`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
  return g`<article class="card ${o ? "done" : ""}" data-uid=${n.uid} @click=${(d) => {
    d.target.closest(".check") || e.onOpen(n, d);
  }}>
    <div class="row">
      ${Pe(r, !0)}
      <span class="parent-name">${(r == null ? void 0 : r.name) ?? n.parent}</span>
      ${he(e.hass, n.assignee)}
    </div>
    <div class="row top">
      ${eo(n, e)}
      <button class="title" type="button">${n.summary}</button>
    </div>
    <div class="pills">
      ${!o && t ? g`<span class="pill prio-${n.priority} ${rt(["", "red", "orange", "grey"][n.priority])}">${l}${w(e.lang, `prio_${n.priority}`)}</span>` : _}
      ${!o && n.moved > 0 ? g`<span class="pill c-orange">${w(e.lang, n.raised ? "moved_raised" : "moved", { n: n.moved })}</span>` : _}
      ${o && n.completed_at ? g`<span class="pill c-green">${xr(n, e)}</span>` : _}
      ${!o && n.due ? g`<span class="pill ${a ? "c-red" : s ? "today" : "later"}">${wr(n, e)}</span>` : _}
    </div>
  </article>`;
}
function no(n, e, t, o, r) {
  const i = t ? n.items : n.items.slice(0, 3), a = n.items.length - i.length;
  return g`<article class="card">
    <div class="row">
      ${Pe(n.parent)}
      <span class="stack-head">${n.parent.name}</span>
      <span class="stack-sub">${n.items.length}</span>
    </div>
    <div class="stack-rows">
      ${i.map((s) => g`<div class="item">
        ${eo(s, e, !0)}
        <span class="t">${s.summary}</span>
        ${s.assignee ? he(e.hass, s.assignee, "xs") : _}
      </div>`)}
      ${a > 0 ? g`<button class="link" type="button" @click=${() => o(n.parent.id, !0)}>${w(e.lang, "more", { n: a })}</button>` : _}
      ${t && n.items.length > 3 ? g`<button class="link muted" type="button" @click=${() => o(n.parent.id, !1)}>${w(e.lang, "collapse")}</button>` : _}
    </div>
    <button class="link" type="button" @click=${() => r(n.parent.id)}>${w(e.lang, "open_list")} ›</button>
  </article>`;
}
function oo(n) {
  return {
    uid: n.uid,
    status: n.status,
    heading: n.summary,
    parent: n.parent,
    summary: n.summary,
    description: n.description,
    priority: n.priority,
    assignee: n.assignee,
    date: n.due ? ee(K(n.due).date) : "",
    time: sr(n.due),
    confirmDelete: !1
  };
}
function $r(n, e = {}) {
  return { status: "needs_action", heading: "", parent: n, summary: "", description: "", priority: 2, assignee: null, date: "", time: "", confirmDelete: !1, ...e };
}
function ro(n) {
  return {
    summary: n.summary.trim(),
    description: n.description,
    due: ar(n.date, n.date ? n.time : ""),
    priority: n.priority,
    assignee: n.assignee,
    parent: n.parent
  };
}
function Tn(n, e) {
  const t = ro(e), o = oo(n), r = {};
  return t.summary !== n.summary && (r.summary = t.summary), t.description !== n.description && (r.description = t.description), (e.date !== o.date || e.time !== o.time) && (r.due = t.due), t.priority !== n.priority && (r.priority = t.priority), t.assignee !== n.assignee && (r.assignee = t.assignee), t.parent !== n.parent && (r.parent = t.parent), r;
}
function mt(n, e) {
  const t = I(e);
  return n === "none" ? "" : ee(n === "today" ? t : n === "tomorrow" ? G(t, 1) : G(t, (6 - t.getDay() + 7) % 7));
}
const kr = g`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
function Sr(n, e) {
  const t = (a) => w(e.lang, a), o = !n.uid, r = ["today", "tomorrow", "weekend", "none"], i = (a) => {
    a.target === a.currentTarget && e.onClose();
  };
  return g`<dialog class="kb-dialog" aria-label=${o ? t("new_task") : n.heading} @close=${e.onClose} @click=${i}>
    <div class="dlg">
      <div class="dlg-head">
        <span class="dlg-kicker">${t(o ? "new_note" : "f_title")}</span>
        ${o ? _ : g`<button class="pill-btn ${n.status === "completed" ? "on" : ""}" type="button" @click=${e.onToggleDone}>
          ${t(n.status === "completed" ? "mark_open" : "mark_done")}</button>`}
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>

      ${e.error ? g`<div class="notice" role="alert">${t(e.error)}</div>` : _}
      <label class="vis-hidden" for="kb-title">${t("f_title")}</label>
      <input id="kb-title" class="dlg-title" type="text" autocomplete="off" .value=${n.summary} placeholder=${t("f_title_ph")}
        @input=${(a) => e.onChange({ summary: a.target.value })} />

      <label class="field"><span class="dlg-label">${t("f_note")}</span>
        <textarea rows="3" .value=${n.description} placeholder=${t("f_note_ph")}
          @input=${(a) => e.onChange({ description: a.target.value })}></textarea></label>

      <div class="field"><span class="dlg-label">${t("f_parent")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_parent")}>
          ${e.parents.map((a) => g`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.parent === a.id}
            @click=${() => e.onChange({ parent: a.id })}>${Pe(a, !0)}${a.name}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_prio")}</span>
        <div class="seg3" role="radiogroup" aria-label=${t("f_prio")}>
          ${[1, 2, 3].map((a) => g`<button type="button" role="radio" aria-checked=${n.priority === a}
            class="prio-${a}" @click=${() => e.onChange({ priority: a })}>${kr}${t(`prio_${a}`)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_due")}</span>
        <div class="chips">
          ${r.map((a) => g`<button class="pill-btn ${mt(a, e.now) === n.date ? "on" : ""}" type="button"
            aria-pressed=${mt(a, e.now) === n.date}
            @click=${() => e.onChange({ date: mt(a, e.now), ...a === "none" ? { time: "" } : {} })}>${t(`q_${a}`)}</button>`)}
          <label class="pill-input"><span class="vis-hidden">${t("f_date")}</span>
            <input type="date" .value=${n.date} @input=${(a) => e.onChange({ date: a.target.value })} /></label>
          <label class="pill-input"><span class="vis-hidden">${t("f_time")}</span>
            <input type="time" .value=${n.time} ?disabled=${!n.date} @input=${(a) => e.onChange({ time: a.target.value })} /></label>
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_who")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_who")}>
          <button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === null}
            @click=${() => e.onChange({ assignee: null })}>${he(e.hass, null, "", !0)}${t("unassigned")}</button>
          ${e.people.map((a) => g`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === a}
            @click=${() => e.onChange({ assignee: a })}>${he(e.hass, a, "", !0)}${At(e.hass, a)}</button>`)}
        </div></div>

      <div class="dlg-foot">
        ${o ? _ : n.confirmDelete ? g`<span class="danger-text" role="alert">${t("delete_confirm")}</span>
              <button class="danger-btn" type="button" ?disabled=${e.busy} @click=${e.onDelete}>${t("delete_yes")}</button>
              <button class="pill-btn" type="button" @click=${() => e.onChange({ confirmDelete: !1 })}>${t("cancel")}</button>` : g`<button class="danger-link" type="button" @click=${() => e.onChange({ confirmDelete: !0 })}>${t("delete")}</button>`}
        <span class="grow"></span>
        ${n.confirmDelete ? _ : g`
          <button class="pill-btn" type="button" @click=${e.onClose}>${t("cancel")}</button>
          <button class="primary-btn" type="button" ?disabled=${!n.summary.trim() || e.busy} @click=${e.onSave}>${t("save")}</button>`}
      </div>
    </div>
  </dialog>`;
}
function On(n) {
  if (!n.due) return 1 / 0;
  const { date: e, hasTime: t } = K(n.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function kt(n, e) {
  const t = On(n), o = On(e);
  return t !== o ? t < o ? -1 : 1 : n.priority - e.priority || +new Date(n.created_at) - +new Date(e.created_at);
}
function io(n, e, t) {
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
const Er = ["todo", "later", "week", "overdue", "today", "done"], ao = (n, e) => +new Date(e.completed_at ?? 0) - +new Date(n.completed_at ?? 0);
function Dr(n, e, t) {
  const { ctx: o } = e, r = n.filter((l) => l.status === "needs_action"), i = n.filter((l) => we(l, o) === "done").sort(ao), a = n.filter((l) => l.status === "completed").length - i.length, s = e.group === "date" ? Er.filter((l) => l !== "done" && (l === "todo" || o.enabled.has(l))).map((l) => ({
    id: l,
    label: w(t, `col_${l}`),
    led: l === "overdue" ? "rgb(var(--c-red))" : l === "week" || l === "today" ? "var(--kb-accent)" : void 0,
    items: r.filter((d) => we(d, o) === l).sort(kt)
  })) : [1, 2, 3].map((l) => ({
    id: `p${l}`,
    label: w(t, `prio_${l}`),
    led: l === 1 ? "rgb(var(--c-red))" : l === 2 ? "rgb(var(--c-orange))" : void 0,
    items: r.filter((d) => d.priority === l).sort(kt)
  }));
  return o.enabled.has("done") && s.push({ id: "done", label: w(t, "col_done"), led: "rgb(var(--c-green))", items: i, done: !0 }), { cols: s, olderDone: a };
}
function Ar(n, e, t) {
  const { cols: o, olderDone: r } = Dr(n, e, t.lang);
  return g`<div class="board">${o.map((i) => {
    const a = i.done ? i.items : io(i.items, e.board.parents, e.parent);
    return g`<section class="col" data-col=${i.id}>
      <div class="col-head">
        <span class="led" style=${i.led ? `background:${i.led}` : ""}></span>
        <span class="label">${i.label}</span><span class="count">${i.items.length}</span>
        ${i.done || i.id === "overdue" ? _ : g`<button class="add" type="button" aria-label=${`${w(t.lang, "add_here")}: ${i.label}`} @click=${() => e.onAdd(i.id)}>+</button>`}
      </div>
      ${a.map((s) => "items" in s ? no(s, t, e.expanded.has(s.parent.id), e.onExpand, e.onFocus) : to(s, t, e.group === "date"))}
      ${i.done ? g`<button class="note note-btn" type="button" @click=${e.onHistory}>${w(t.lang, "done_note", { days: e.ctx.doneDays, older: r })}</button>` : _}
      ${!i.done && a.length === 0 ? g`<div class="empty">${w(t.lang, "nothing")}</div>` : _}
    </section>`;
  })}</div>`;
}
const Cr = ["today", "week", "todo", "done"];
function Tr(n, e) {
  return g`<dialog class="sheet kb-sheet" aria-label=${n.title}
    @cancel=${(t) => {
    t.preventDefault(), n.onCancel();
  }}
    @click=${(t) => {
    t.target === t.currentTarget && n.onClose();
  }}>
    <div class="grabber"><span></span></div>
    <div class="sheet-head">
      <span class="dot ${rt(n.color)}"><ha-icon .icon=${n.icon}></ha-icon></span>
      <h2>${n.title}</h2>
      <span class="count">${n.count}</span>
      <button class="round-btn sclose" type="button" aria-label=${w(e.lang, "close")} @click=${n.onClose}>✕</button>
    </div>
    <div class="sheet-list" @pointerdown=${n.press.down} @pointermove=${n.press.move} @pointerup=${n.press.end}
      @pointercancel=${n.press.end} @pointerleave=${n.press.end} @contextmenu=${(t) => t.preventDefault()}>
      ${n.entries.map((t) => "items" in t ? no(t, e, n.expanded.has(t.parent.id), n.onExpand, n.onFocus) : to(t, e, !0))}
      ${n.entries.length === 0 ? g`<div class="empty">${w(e.lang, "nothing")}</div>` : _}
      ${n.isDone ? g`<button class="pill-btn hist-link" type="button" @click=${n.onHistory}>${w(e.lang, "older_history", { n: n.olderDone })}</button>` : _}
    </div>
    ${n.menu ? Or(n.menu, n, e) : _}
  </dialog>`;
}
function Or(n, e, t) {
  return g`<div class="menu-wrap" @click=${(o) => {
    o.target === o.currentTarget && e.onMenuClose();
  }}>
    <div class="menu" role="group" aria-label=${w(t.lang, "move_to")}>
      <div class="menu-title">${w(t.lang, "move_to")}<small>${n.summary}</small></div>
      ${Cr.map((o) => g`<button class="menu-btn" type="button" data-move=${o} @click=${() => e.onMove(n, o)}>${w(t.lang, `col_${o}`)}</button>`)}
      <button class="menu-btn muted" type="button" @click=${e.onMenuClose}>${w(t.lang, "cancel")}</button>
    </div>
  </div>`;
}
function Mr(n, e, t = []) {
  const o = { todo: 0, later: 0, week: 0, today: 0, overdue: 0, done: 0 }, r = I(e.now), i = [];
  let a = 0;
  for (const d of n) {
    const h = we(d, e);
    h && o[h]++, h === "today" && i.push(d), h === "today" && d.due && I(K(d.due).date) < r && a++;
  }
  const s = new Set(t.filter((d) => d.collapse).map((d) => d.id)), l = i.filter((d) => !s.has(d.parent)).sort(kt).slice(0, 3);
  return { counts: o, overdue: a, preview: l };
}
const Gt = {
  today: { icon: "mdi:calendar-today", color: "blue" },
  overdue: { icon: "mdi:alert-circle-outline", color: "red" },
  week: { icon: "mdi:calendar-week", color: "indigo" },
  todo: { icon: "mdi:format-list-checks", color: "teal" },
  later: { icon: "mdi:calendar-clock", color: "purple" },
  done: { icon: "mdi:check-circle-outline", color: "green" }
}, Pr = ["today", "overdue", "week", "todo", "later", "done"];
function Nr(n, e) {
  const t = Mr(n.items, n.ctx, e.parents), o = n.items.filter((r) => r.status === "needs_action");
  return g`<div class="tiles-view">
    <div class="people ${n.who ? "has-filter" : ""}" role="group" aria-label=${w(e.lang, "filter_people")}>
      ${n.people.map((r) => {
    const i = n.who === r;
    return g`<button class="person" type="button" aria-pressed=${i} @click=${() => n.onWho(i ? null : r)}>
          ${he(e.hass, r, "lg", !0)}<span>${At(e.hass, r)}</span></button>`;
  })}
    </div>
    <div class="tiles">
      ${Pr.filter((r) => n.ctx.enabled.has(r)).map((r) => {
    const i = r === "today" || r === "done", a = r === "today" ? t.overdue : 0;
    return g`<button class="tile ${i ? "wide" : ""} ${rt(Gt[r].color)}" type="button" data-tile=${r} @click=${() => n.onTile(r)}>
          <span class="row">
            <span class="dot"><ha-icon .icon=${Gt[r].icon}></ha-icon></span>
            <span class="tile-label">${w(e.lang, `col_${r}`)}</span>
            ${a > 0 ? g`<span class="pill c-red">${qe(e.lang, "sum_overdue", a)}</span>` : _}
          </span>
          <span class="tile-count">${t.counts[r]}</span>
          ${r === "today" ? g`<span class="preview">${t.preview.map((s) => g`<span class="row">
            <span class="mark"></span><span class="t">${s.summary}</span>${s.assignee ? he(e.hass, s.assignee, "xs", !0) : _}</span>`)}</span>` : _}
        </button>`;
  })}
    </div>
    <span class="dlg-label tiles-h">${w(e.lang, "lists")}</span>
    <div class="plist">
      ${e.parents.map((r) => g`<button class="prow" type="button" data-parent=${r.id} @click=${() => n.onParent(r.id)}>
        ${Pe(r)}<span class="pname">${r.name}</span>
        <span class="pcount">${o.filter((i) => i.parent === r.id).length}</span><span aria-hidden="true">›</span></button>`)}
    </div>
  </div>`;
}
function Ir(n, e, t, o, r) {
  const i = o.filter((s) => s.status === "needs_action" && (!e.who || s.assignee === e.who)), a = (s) => {
    const l = e.parent === ((s == null ? void 0 : s.id) ?? null), d = i.filter((h) => !s || h.parent === s.id).length;
    return g`<button class="chip ${s ? rt(s.color) : ""}" type="button" aria-pressed=${l}
      @click=${() => r({ parent: l ? null : (s == null ? void 0 : s.id) ?? null })}>
      ${Pe(s ?? void 0)}<span>${(s == null ? void 0 : s.name) ?? w(n.lang, "all_parents")}</span><b>${d}</b></button>`;
  };
  return g`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${w(n.lang, "filter_people")}>
      ${t.map((s) => {
    const l = e.who === s;
    return g`<button class="person" type="button" aria-pressed=${l} @click=${() => r({ who: l ? null : s })}>
          ${he(n.hass, s, "lg", !0)}<span>${At(n.hass, s)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${w(n.lang, "filter_parents")}>
      ${a(null)}${n.parents.map((s) => a(s))}
    </div>
    <div class="seg" role="group" aria-label=${w(n.lang, "group_label")}>
      ${["date", "priority"].map((s) => g`<button type="button" aria-pressed=${e.group === s}
        @click=${() => r({ group: s })}>${w(n.lang, `group_${s}`)}</button>`)}
    </div>
  </div>`;
}
function zr(n, e, t, o) {
  const r = I(e), i = G(r, -((r.getDay() - o + 7) % 7)), a = G(i, -7), s = new Intl.DateTimeFormat(t, { month: "long", year: "numeric" }), l = /* @__PURE__ */ new Map();
  for (const d of n) {
    const h = new Date(d.completed_at ?? 0);
    let c, f;
    h >= i ? (c = "this", f = w(t, "col_week")) : h >= a ? (c = "last", f = w(t, "hist_last_week")) : (c = `${h.getFullYear()}-${h.getMonth()}`, f = s.format(h), t.startsWith("cs") && (f = f.toLocaleLowerCase("cs")));
    const v = l.get(c) ?? { label: f, items: [] };
    v.items.push(d), l.set(c, v);
  }
  return [...l.values()];
}
const Rr = g`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path></svg>`;
function Fr(n, e) {
  const t = (s) => w(e.lang, s), o = new Intl.DateTimeFormat(e.lang, { day: "numeric", month: "short" }), r = (s) => {
    s.target === s.currentTarget && e.onClose();
  }, i = (s) => e.parents.find((l) => l.id === s), a = zr(n.items, e.now, e.lang, e.firstDay);
  return g`<dialog class="kb-dialog kb-history" aria-labelledby="kb-hist-title" @close=${e.onClose} @click=${r}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><h2 id="kb-hist-title" class="hist-title">${t("history")}</h2>
          <span class="hist-sub">${w(e.lang, "hist_total", { n: n.total })}</span></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      ${n.error ? g`<div class="notice" role="alert">${t(n.error)}</div>` : _}
      <label class="hist-search">
        <span class="vis-hidden">${t("hist_search")}</span>
        <input type="search" autocomplete="off" .value=${n.search} placeholder=${t("hist_search_ph")}
          @input=${(s) => e.onSearch(s.target.value)} />
      </label>
      <div class="chips" role="group" aria-label=${t("filter_parents")}>
        <button class="pill-btn" type="button" aria-pressed=${n.parent === null} @click=${() => e.onParent(null)}>${t("all_parents")}</button>
        ${e.parents.map((s) => g`<button class="pill-btn hist-chip" type="button" aria-pressed=${n.parent === s.id}
          @click=${() => e.onParent(s.id)}>${Pe(s, !0)}${s.name}</button>`)}
      </div>
      <div class="hist-list">
        ${a.map((s) => g`<section class="hist-group">
          <h3 class="dlg-label">${s.label}</h3>
          <ul class="hist-rows">${s.items.map((l) => {
    var d;
    return g`<li class="hist-row" data-uid=${l.uid}>
            <span class="hist-check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>
            <div class="hist-text"><span class="hist-name">${l.summary}</span>
              <span class="hist-meta">${((d = i(l.parent)) == null ? void 0 : d.name) ?? l.parent} · ${l.completed_at ? o.format(new Date(l.completed_at)) : ""}</span></div>
            ${l.assignee ? he(e.hass, l.assignee) : _}
            <button class="hist-reopen" type="button" title=${t("reopen")} aria-label=${`${t("reopen")}: ${l.summary}`}
              @click=${() => e.onReopen(l)}>${Rr}</button>
          </li>`;
  })}</ul>
        </section>`)}
        ${n.items.length === 0 && !n.loading && !n.error ? g`<div class="empty hist-empty">${t("hist_empty")}</div>` : _}
        ${n.items.length < n.total ? g`<button class="pill-btn hist-more" type="button" ?disabled=${n.loading} @click=${e.onMore}>${t("hist_more")}</button>` : _}
      </div>
    </div>
  </dialog>`;
}
const Hr = ["todo", "week", "today", "done"], Lr = 50, Ur = 600, Br = 500, St = class St extends We {
  constructor() {
    super(), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set(), this._loadFailed = !1, this._busy = !1, this._narrow = !1, this._sheetShown = !1, this._menuShown = !1, this._lpFired = !1, this._hq = 0, this._hMore = null, this._sortables = /* @__PURE__ */ new Map(), this._seq = 0, this._attempts = 0, this.addEventListener("pointerdown", (e) => {
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
    super.connectedCallback(), this._subscribe(), typeof ResizeObserver < "u" && (this._ro = new ResizeObserver((e) => {
      var o;
      const t = ((o = e[e.length - 1]) == null ? void 0 : o.contentRect.width) ?? 0;
      t > 0 && (this._narrow = t < Ur), this._narrow || this._closeSheet();
    }), this._ro.observe(this));
  }
  disconnectedCallback() {
    var e, t, o;
    super.disconnectedCallback(), window.clearTimeout(this._retry), this._retry = void 0, (e = this._ro) == null || e.disconnect(), this._ro = void 0, this._lpCancel(), this._sortables.forEach((r) => r.destroy()), this._sortables.clear(), this._endDrag(), window.clearTimeout(this._hTimer), (t = this._hObs) == null || t.disconnect(), this._hObs = void 0, this._hMore = null, (o = this._unsub) == null || o.then((r) => r()).catch(() => {
    }), this._unsub = void 0;
  }
  willUpdate(e) {
    e.has("hass") && this._subscribe();
  }
  /** Subscribe once; on failure retry on a capped backoff timer, never on hass updates. */
  _subscribe() {
    if (this._unsub || this._retry !== void 0 || !this.hass || !this.isConnected) return;
    const e = tr(this.hass, (t) => {
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
      }, ur(this._attempts++)));
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
    this._dialogWrite("err_save", () => o ? Bt(e, o.uid, Tn(o, t)) : or(e, ro(t)));
  }
  /** Tap on a card; a click that ends a drag is not a tap. */
  _open(e, t) {
    const o = t, r = this._down;
    if (this._down = void 0, this._lpFired) {
      this._lpFired = !1;
      return;
    }
    o.detail !== 0 && r && An(o.clientX - r.x, o.clientY - r.y, t.timeStamp - r.t) || this._openDialog(oo(e), () => {
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
      const i = await nr(t, {
        search: o.search.trim() || void 0,
        parent: o.parent ?? void 0,
        offset: e ? 0 : o.items.length,
        limit: Lr
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
    t && ct(t, e, "needs_action").then(() => {
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
    var d, h;
    const i = () => this.renderRoot.querySelector(r), a = this._filter.parent ?? ((d = t.find((c) => c.id === "household")) == null ? void 0 : d.id) ?? ((h = t[0]) == null ? void 0 : h.id);
    if (!a) return;
    const s = /^p([123])$/.exec(e), l = {
      today: mt("today", o.now),
      week: ee(o.week.end),
      later: ee(G(o.week.end, 1))
    };
    this._openDialog($r(a, s ? { priority: Number(s[1]) } : { date: l[e] ?? "" }), i);
  }
  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  _syncSortables() {
    var o;
    const e = new Set(this.renderRoot.querySelectorAll(".col"));
    for (const [r, i] of this._sortables) e.has(r) || (i.destroy(), this._sortables.delete(r));
    const t = ((o = window.matchMedia) == null ? void 0 : o.call(window, "(pointer: coarse)").matches) ?? !1;
    for (const r of e)
      this._sortables.has(r) || this._sortables.set(r, m.create(r, {
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
    const a = /^p([123])$/.exec(t), s = hr(i, a ? Number(a[1]) : t, r);
    if (!s) return;
    const { status: l, ...d } = s;
    (async () => {
      Object.keys(d).length && await Bt(o, i.uid, d), l && await ct(o, i.uid, l);
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
    const t = e.target, o = t.closest("[data-uid]"), r = o == null ? void 0 : o.dataset.uid;
    !r || t.closest(".check") || (this._lp = { x: e.clientX, y: e.clientY, timer: window.setTimeout(() => {
      this._lp = void 0, this._lpFired = !0, this._menu = r, this._menuFor = r;
    }, Br) });
  }
  _lpMove(e) {
    const t = this._lp;
    t && An(e.clientX - t.x, e.clientY - t.y) && this._lpCancel();
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
    const o = this.renderRoot.querySelector(".menu-btn");
    if (o && !this._menuShown)
      this._menuShown = !0, o.focus();
    else if (!o && this._menuShown) {
      this._menuShown = !1;
      const l = this._menuFor;
      (s = ((a = [...this.renderRoot.querySelectorAll(".sheet [data-uid]")].find((h) => h.dataset.uid === l)) == null ? void 0 : a.querySelector(".title")) ?? this.renderRoot.querySelector(".sheet .sclose")) == null || s.focus();
    }
  }
  updated() {
    var o, r, i, a;
    this._syncSortables(), this._observeMore();
    const e = this.renderRoot.querySelector("dialog.kb-sheet");
    e && !e.open && e.showModal();
    const t = this.renderRoot.querySelector("dialog.kb-dialog");
    if (this._sheetFocus(!!t), t && !t.open)
      t.showModal(), this._hist ? (o = this.renderRoot.querySelector(".kb-history input")) == null || o.focus() : (r = this._draft) != null && r.uid || (i = this.renderRoot.querySelector("#kb-title")) == null || i.focus();
    else if (!t && this._returnTo) {
      const s = this._returnTo;
      this._returnTo = void 0, (a = s()) == null || a.focus();
    }
  }
  render() {
    var x;
    const e = this.hass, t = this._config, o = this._board;
    if (!e || !t) return _;
    const r = ((x = e.locale) == null ? void 0 : x.language) ?? e.language ?? "en";
    if (!o) return g`<ha-card><div class="loading">${w(r, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const i = /* @__PURE__ */ new Date(), a = o.parents.filter((u) => !t.parents || t.parents.includes(u.id)), s = new Set(t.columns ?? Hr);
    s.add("todo"), o.end_of_day_mode === "overdue" && s.add("overdue");
    const l = {
      now: i,
      enabled: s,
      mode: o.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: lr(i, Dn(t.week_end, e.locale))
    };
    this._ctx = l;
    const d = {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      onOpen: (u, S) => this._open(u, S),
      onToggle: (u) => {
        ct(e, u.uid, u.status === "completed" ? "needs_action" : "completed").catch((S) => {
          console.warn("household_kanban: set_status failed", S), this._fail("err_update");
        });
      }
    }, h = t.people ?? Object.keys(e.states).filter((u) => u.startsWith("person.")), c = this._filter, f = o.items.filter((u) => a.some((S) => S.id === u.parent)), v = f.filter((u) => (!c.who || u.assignee === c.who) && (!c.parent || u.parent === c.parent));
    return g`<ha-card>
      ${this._notice ? g`<div class="notice" role="alert">${w(r, this._notice)}</div>` : _}
      <header>
        <div class="titles"><h1>${w(r, "title")}</h1><div class="summary">${this._summary(f, l, r)}</div></div>
        <button class="pill-btn hist-btn" type="button" @click=${() => this._openHistory("header .hist-btn")}>${w(r, "history")}</button>
        <button class="new" type="button" @click=${() => this._add("todo", a, l, "header .new")}>+ ${w(r, "new_note")}</button>
      </header>
      ${this._narrow ? this._renderNarrow(d, l, f, h, a) : g`
      ${Ir(d, c, h, f, (u) => {
      this._filter = { ...c, ...u };
    })}
      ${Ar(v, {
      board: { ...o, parents: a },
      ctx: l,
      group: c.group,
      who: c.who,
      parent: c.parent,
      expanded: this._expanded,
      onExpand: (u, S) => {
        const C = new Set(this._expanded);
        S ? C.add(u) : C.delete(u), this._expanded = C;
      },
      onFocus: (u) => {
        this._filter = { ...c, parent: u };
      },
      onAdd: (u) => this._add(u, a, l),
      onHistory: () => this._openHistory('.col[data-col="done"] .note-btn')
    }, d)}`}
      ${this._hist ? Fr(this._hist, {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      firstDay: Dn(t.week_end, e.locale),
      onSearch: (u) => this._histFilter({ search: u }, 300),
      onParent: (u) => this._histFilter({ parent: u }, 0),
      onReopen: (u) => this._reopen(u.uid),
      onMore: () => void this._loadHistory(!1),
      onClose: () => this._closeHistory()
    }) : _}
      ${this._draft ? Sr(this._draft, {
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
        var F;
        const u = this._draft, S = u == null ? void 0 : u.uid;
        if (!u || !S) return;
        const C = (F = this._board) == null ? void 0 : F.items.find((z) => z.uid === S);
        if (!C) {
          this._dlgError = "err_update";
          return;
        }
        const M = Tn(C, u);
        this._dialogWrite("err_update", async () => {
          Object.keys(M).length && await Bt(e, S, M), await ct(e, S, u.status === "completed" ? "needs_action" : "completed");
        });
      },
      onDelete: () => {
        const u = this._draft;
        u != null && u.uid && this._dialogWrite("err_delete", () => rr(e, u.uid));
      }
    }) : _}
    </ha-card>`;
  }
  /** Tiles + parents list, and the bottom sheet when one is open. */
  _renderNarrow(e, t, o, r, i) {
    const a = this._filter.who, s = o.filter((c) => !a || c.assignee === a);
    let l = this._sheet, d = _;
    const h = (l == null ? void 0 : l.kind) === "parent" ? i.find((c) => c.id === (l == null ? void 0 : l.id)) : void 0;
    if ((l == null ? void 0 : l.kind) === "parent" && !h && (l = void 0, queueMicrotask(() => this._closeSheet())), l) {
      const c = l.id, f = (u) => u.filter((S) => S.status === "needs_action").sort(kt), v = l.kind === "parent" ? f(s.filter((u) => u.parent === l.id)) : c === "done" ? s.filter((u) => we(u, t) === "done").sort(ao) : f(s.filter((u) => we(u, t) === c)), x = h ? { icon: h.icon, color: h.color, title: h.name } : { ...Gt[c], title: w(e.lang, `col_${c}`) };
      d = Tr({
        ...x,
        count: v.length,
        isDone: c === "done" && !h,
        entries: l.kind === "col" && c !== "done" ? io(v, i, null) : v,
        olderDone: s.filter((u) => u.status === "completed").length - v.length,
        menu: this._menu ? s.find((u) => u.uid === this._menu) : void 0,
        expanded: this._expanded,
        onExpand: (u, S) => {
          const C = new Set(this._expanded);
          S ? C.add(u) : C.delete(u), this._expanded = C;
        },
        onFocus: (u) => this._openSheet("parent", u, this._sheetReturn ?? ""),
        onClose: () => this._closeSheet(),
        onCancel: () => this._sheetCancel(),
        onHistory: () => this._openHistory(".sheet .hist-link"),
        onMove: (u, S) => {
          this._closeMenu(), this._drop(u.uid, S);
        },
        onMenuClose: () => this._closeMenu(),
        press: { down: (u) => this._lpStart(u), move: (u) => this._lpMove(u), end: () => this._lpCancel() }
      }, e);
    }
    return g`${Nr({
      ctx: t,
      items: s,
      people: r,
      who: a,
      onWho: (c) => {
        this._filter = { ...this._filter, who: c };
      },
      onTile: (c) => this._openSheet("col", c, `.tile[data-tile="${c}"]`),
      onParent: (c) => this._openSheet("parent", c, `.prow[data-parent="${c}"]`)
    }, e)}${d}`;
  }
  _summary(e, t, o) {
    const r = e.filter((d) => d.status === "needs_action"), i = I(t.now), a = r.filter((d) => d.due && I(K(d.due).date) < i).length, s = r.filter((d) => we(d, t) === "today").length, l = t.mode === "overdue" ? qe(o, "sum_overdue", a) : qe(o, "sum_moved", r.filter((d) => d.moved > 0).length);
    return [qe(o, "sum_open", r.length), qe(o, "sum_today", s), l].join(" · ");
  }
};
St.properties = {
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
  _menu: { state: !0 }
}, St.styles = mr;
let Vt = St;
const Zt = "household-kanban-card";
fr(Zt, Vt);
(window.customCards ?? (window.customCards = [])).some((n) => n.type === Zt) || window.customCards.push({ type: Zt, name: "Household Kanban", description: "Kanban board for household tasks" });
