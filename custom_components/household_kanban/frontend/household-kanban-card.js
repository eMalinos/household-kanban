/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, Wt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Xt = Symbol(), nn = /* @__PURE__ */ new WeakMap();
let An = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== Xt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Wt && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = nn.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && nn.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const eo = (n) => new An(typeof n == "string" ? n : n + "", void 0, Xt), to = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((o, r, i) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[i + 1], n[0]);
  return new An(t, n, Xt);
}, no = (n, e) => {
  if (Wt) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), r = st.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = t.cssText, n.appendChild(o);
  }
}, on = Wt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return eo(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: oo, defineProperty: ro, getOwnPropertyDescriptor: io, getOwnPropertyNames: ao, getOwnPropertySymbols: so, getPrototypeOf: lo } = Object, ce = globalThis, rn = ce.trustedTypes, co = rn ? rn.emptyScript : "", Et = ce.reactiveElementPolyfillSupport, He = (n, e) => n, Ht = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? co : null;
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
} }, Cn = (n, e) => !oo(n, e), an = { attribute: !0, type: String, converter: Ht, reflect: !1, useDefault: !1, hasChanged: Cn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ce.litPropertyMetadata ?? (ce.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let $e = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = an) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(e, o, t);
      r !== void 0 && ro(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: r, set: i } = io(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? an;
  }
  static _$Ei() {
    if (this.hasOwnProperty(He("elementProperties"))) return;
    const e = lo(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(He("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(He("properties"))) {
      const t = this.properties, o = [...ao(t), ...so(t)];
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
      for (const r of o) t.unshift(on(r));
    } else e !== void 0 && t.push(on(e));
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
    return no(e, this.constructor.elementStyles), e;
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
      const a = (((i = o.converter) == null ? void 0 : i.toAttribute) !== void 0 ? o.converter : Ht).toAttribute(t, o.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, a;
    const o = this.constructor, r = o._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = o.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((i = s.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? s.converter : Ht;
      this._$Em = r;
      const d = l.fromAttribute(t, s.type);
      this[r] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, r = !1, i) {
    var a;
    if (e !== void 0) {
      const s = this.constructor;
      if (r === !1 && (i = this[e]), o ?? (o = s.getPropertyOptions(e)), !((o.hasChanged ?? Cn)(i, t) || o.useDefault && o.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(s._$Eu(e, o)))) return;
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
$e.elementStyles = [], $e.shadowRootOptions = { mode: "open" }, $e[He("elementProperties")] = /* @__PURE__ */ new Map(), $e[He("finalized")] = /* @__PURE__ */ new Map(), Et == null || Et({ ReactiveElement: $e }), (ce.reactiveElementVersions ?? (ce.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = globalThis, sn = (n) => n, ft = Le.trustedTypes, ln = ft ? ft.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Tn = "$lit$", ie = `lit$${Math.random().toFixed(9).slice(2)}$`, On = "?" + ie, uo = `<${On}>`, ye = document, Ge = () => ye.createComment(""), qe = (n) => n === null || typeof n != "object" && typeof n != "function", Gt = Array.isArray, po = (n) => Gt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", St = `[ 	
\f\r]`, Ie = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dn = /-->/g, cn = />/g, fe = RegExp(`>|${St}(?:([^\\s"'>=/]+)(${St}*=${St}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), un = /'/g, pn = /"/g, Pn = /^(?:script|style|textarea|title)$/i, ho = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), y = ho(1), De = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), hn = /* @__PURE__ */ new WeakMap(), ve = ye.createTreeWalker(ye, 129);
function Nn(n, e) {
  if (!Gt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ln !== void 0 ? ln.createHTML(e) : e;
}
const fo = (n, e) => {
  const t = n.length - 1, o = [];
  let r, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Ie;
  for (let s = 0; s < t; s++) {
    const l = n[s];
    let d, p, c = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, p = a.exec(l), p !== null); ) f = a.lastIndex, a === Ie ? p[1] === "!--" ? a = dn : p[1] !== void 0 ? a = cn : p[2] !== void 0 ? (Pn.test(p[2]) && (r = RegExp("</" + p[2], "g")), a = fe) : p[3] !== void 0 && (a = fe) : a === fe ? p[0] === ">" ? (a = r ?? Ie, c = -1) : p[1] === void 0 ? c = -2 : (c = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? fe : p[3] === '"' ? pn : un) : a === pn || a === un ? a = fe : a === dn || a === cn ? a = Ie : (a = fe, r = void 0);
    const _ = a === fe && n[s + 1].startsWith("/>") ? " " : "";
    i += a === Ie ? l + uo : c >= 0 ? (o.push(d), l.slice(0, c) + Tn + l.slice(c) + ie + _) : l + ie + (c === -2 ? s : _);
  }
  return [Nn(n, i + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class Ve {
  constructor({ strings: e, _$litType$: t }, o) {
    let r;
    this.parts = [];
    let i = 0, a = 0;
    const s = e.length - 1, l = this.parts, [d, p] = fo(e, t);
    if (this.el = Ve.createElement(d, o), ve.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = ve.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(Tn)) {
          const f = p[a++], _ = r.getAttribute(c).split(ie), v = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: i, name: v[2], strings: _, ctor: v[1] === "." ? bo : v[1] === "?" ? mo : v[1] === "@" ? vo : xt }), r.removeAttribute(c);
        } else c.startsWith(ie) && (l.push({ type: 6, index: i }), r.removeAttribute(c));
        if (Pn.test(r.tagName)) {
          const c = r.textContent.split(ie), f = c.length - 1;
          if (f > 0) {
            r.textContent = ft ? ft.emptyScript : "";
            for (let _ = 0; _ < f; _++) r.append(c[_], Ge()), ve.nextNode(), l.push({ type: 2, index: ++i });
            r.append(c[f], Ge());
          }
        }
      } else if (r.nodeType === 8) if (r.data === On) l.push({ type: 2, index: i });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(ie, c + 1)) !== -1; ) l.push({ type: 7, index: i }), c += ie.length - 1;
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
  const i = qe(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== i && ((s = r == null ? void 0 : r._$AO) == null || s.call(r, !1), i === void 0 ? r = void 0 : (r = new i(n), r._$AT(n, t, o)), o !== void 0 ? (t._$Co ?? (t._$Co = []))[o] = r : t._$Cl = r), r !== void 0 && (e = Ae(n, r._$AS(n, e.values), r, o)), e;
}
class go {
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
        l.type === 2 ? d = new Ke(i, i.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (d = new _o(i, this, e)), this._$AV.push(d), l = o[++s];
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
class Ke {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, o, r) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = Ae(this, e, t), qe(e) ? e === $ || e == null || e === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : e !== this._$AH && e !== De && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : po(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== $ && qe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ye.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: t, _$litType$: o } = e, r = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Ve.createElement(Nn(o.h, o.h[0]), this.options)), o);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === r) this._$AH.p(t);
    else {
      const a = new go(r, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = hn.get(e.strings);
    return t === void 0 && hn.set(e.strings, t = new Ve(e)), t;
  }
  k(e) {
    Gt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, r = 0;
    for (const i of e) r === t.length ? t.push(o = new Ke(this.O(Ge()), this.O(Ge()), this, this.options)) : o = t[r], o._$AI(i), r++;
    r < t.length && (this._$AR(o && o._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = sn(e).nextSibling;
      sn(e).remove(), e = r;
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
  constructor(e, t, o, r, i) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = $;
  }
  _$AI(e, t = this, o, r) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) e = Ae(this, e, t, 0), a = !qe(e) || e !== this._$AH && e !== De, a && (this._$AH = e);
    else {
      const s = e;
      let l, d;
      for (e = i[0], l = 0; l < i.length - 1; l++) d = Ae(this, s[o + l], t, l), d === De && (d = this._$AH[l]), a || (a = !qe(d) || d !== this._$AH[l]), d === $ ? e = $ : e !== $ && (e += (d ?? "") + i[l + 1]), this._$AH[l] = d;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class bo extends xt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === $ ? void 0 : e;
  }
}
class mo extends xt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== $);
  }
}
class vo extends xt {
  constructor(e, t, o, r, i) {
    super(e, t, o, r, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Ae(this, e, t, 0) ?? $) === De) return;
    const o = this._$AH, r = e === $ && o !== $ || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, i = e !== $ && (o === $ || r);
    r && this.element.removeEventListener(this.name, this, o), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class _o {
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
const Dt = Le.litHtmlPolyfillSupport;
Dt == null || Dt(Ve, Ke), (Le.litHtmlVersions ?? (Le.litHtmlVersions = [])).push("3.3.3");
const yo = (n, e, t) => {
  const o = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = o._$litPart$;
  if (r === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null;
    o._$litPart$ = r = new Ke(e.insertBefore(Ge(), i), i, void 0, t ?? {});
  }
  return r._$AI(n), r;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = yo(t, this.renderRoot, this.renderOptions);
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
var Dn;
Ue._$litElement$ = !0, Ue.finalized = !0, (Dn = _e.litElementHydrateSupport) == null || Dn.call(_e, { LitElement: Ue });
const At = _e.litElementPolyfillSupport;
At == null || At({ LitElement: Ue });
(_e.litElementVersions ?? (_e.litElementVersions = [])).push("4.2.2");
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function fn(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    e && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(n, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function V(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? fn(Object(t), !0).forEach(function(o) {
      wo(n, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : fn(Object(t)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(t, o));
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
function wo(n, e, t) {
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
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
    }
    return n;
  }, Q.apply(this, arguments);
}
function xo(n, e) {
  if (n == null) return {};
  var t = {}, o = Object.keys(n), r, i;
  for (i = 0; i < o.length; i++)
    r = o[i], !(e.indexOf(r) >= 0) && (t[r] = n[r]);
  return t;
}
function $o(n, e) {
  if (n == null) return {};
  var t = xo(n, e), o, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n);
    for (r = 0; r < i.length; r++)
      o = i[r], !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(n, o) && (t[o] = n[o]);
  }
  return t;
}
var ko = "1.15.6";
function K(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var te = K(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Je = K(/Edge/i), gn = K(/firefox/i), Be = K(/safari/i) && !K(/chrome/i) && !K(/android/i), qt = K(/iP(ad|od|hone)/i), Mn = K(/chrome/i) && K(/android/i), In = {
  capture: !1,
  passive: !1
};
function x(n, e, t) {
  n.addEventListener(e, t, !te && In);
}
function w(n, e, t) {
  n.removeEventListener(e, t, !te && In);
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
function zn(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function X(n, e, t, o) {
  if (n) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? n.parentNode === t && gt(n, e) : gt(n, e)) || o && n === t)
        return n;
      if (n === t) break;
    } while (n = zn(n));
  }
  return null;
}
var bn = /\s+/g;
function L(n, e, t) {
  if (n && e)
    if (n.classList)
      n.classList[t ? "add" : "remove"](e);
    else {
      var o = (" " + n.className + " ").replace(bn, " ").replace(" " + e + " ", " ");
      n.className = (o + (t ? " " + e : "")).replace(bn, " ");
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
function Rn(n, e, t) {
  if (n) {
    var o = n.getElementsByTagName(e), r = 0, i = o.length;
    if (t)
      for (; r < i; r++)
        t(o[r], r);
    return o;
  }
  return [];
}
function q() {
  var n = document.scrollingElement;
  return n || document.documentElement;
}
function C(n, e, t, o, r) {
  if (!(!n.getBoundingClientRect && n !== window)) {
    var i, a, s, l, d, p, c;
    if (n !== window && n.parentNode && n !== q() ? (i = n.getBoundingClientRect(), a = i.top, s = i.left, l = i.bottom, d = i.right, p = i.height, c = i.width) : (a = 0, s = 0, l = window.innerHeight, d = window.innerWidth, p = window.innerHeight, c = window.innerWidth), (e || t) && n !== window && (r = r || n.parentNode, !te))
      do
        if (r && r.getBoundingClientRect && (g(r, "transform") !== "none" || t && g(r, "position") !== "static")) {
          var f = r.getBoundingClientRect();
          a -= f.top + parseInt(g(r, "border-top-width")), s -= f.left + parseInt(g(r, "border-left-width")), l = a + i.height, d = s + i.width;
          break;
        }
      while (r = r.parentNode);
    if (o && n !== window) {
      var _ = Se(r || n), v = _ && _.a, h = _ && _.d;
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
function mn(n, e, t) {
  for (var o = se(n, !0), r = C(n)[e]; o; ) {
    var i = C(o)[t], a = void 0;
    if (a = r >= i, !a) return o;
    if (o === q()) break;
    o = se(o, !1);
  }
  return !1;
}
function Ce(n, e, t, o) {
  for (var r = 0, i = 0, a = n.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== b.ghost && (o || a[i] !== b.dragged) && X(a[i], t.draggable, n, !1)) {
      if (r === e)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function Vt(n, e) {
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
function vn(n) {
  var e = 0, t = 0, o = q();
  if (n)
    do {
      var r = Se(n), i = r.a, a = r.d;
      e += n.scrollLeft * i, t += n.scrollTop * a;
    } while (n !== o && (n = n.parentNode));
  return [e, t];
}
function Eo(n, e) {
  for (var t in n)
    if (n.hasOwnProperty(t)) {
      for (var o in e)
        if (e.hasOwnProperty(o) && e[o] === n[t][o]) return Number(t);
    }
  return -1;
}
function se(n, e) {
  if (!n || !n.getBoundingClientRect) return q();
  var t = n, o = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var r = g(t);
      if (t.clientWidth < t.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return q();
        if (o || e) return t;
        o = !0;
      }
    }
  while (t = t.parentNode);
  return q();
}
function So(n, e) {
  if (n && e)
    for (var t in e)
      e.hasOwnProperty(t) && (n[t] = e[t]);
  return n;
}
function Ct(n, e) {
  return Math.round(n.top) === Math.round(e.top) && Math.round(n.left) === Math.round(e.left) && Math.round(n.height) === Math.round(e.height) && Math.round(n.width) === Math.round(e.width);
}
var Ye;
function Fn(n, e) {
  return function() {
    if (!Ye) {
      var t = arguments, o = this;
      t.length === 1 ? n.call(o, t[0]) : n.apply(o, t), Ye = setTimeout(function() {
        Ye = void 0;
      }, e);
    }
  };
}
function Do() {
  clearTimeout(Ye), Ye = void 0;
}
function Hn(n, e, t) {
  n.scrollLeft += e, n.scrollTop += t;
}
function Ln(n) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(n).cloneNode(!0) : t ? t(n).clone(!0)[0] : n.cloneNode(!0);
}
function Un(n, e, t) {
  var o = {};
  return Array.from(n.children).forEach(function(r) {
    var i, a, s, l;
    if (!(!X(r, e.draggable, n, !1) || r.animated || r === t)) {
      var d = C(r);
      o.left = Math.min((i = o.left) !== null && i !== void 0 ? i : 1 / 0, d.left), o.top = Math.min((a = o.top) !== null && a !== void 0 ? a : 1 / 0, d.top), o.right = Math.max((s = o.right) !== null && s !== void 0 ? s : -1 / 0, d.right), o.bottom = Math.max((l = o.bottom) !== null && l !== void 0 ? l : -1 / 0, d.bottom);
    }
  }), o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
var z = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ao() {
  var n = [], e;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(r) {
          if (!(g(r, "display") === "none" || r === b.ghost)) {
            n.push({
              target: r,
              rect: C(r)
            });
            var i = V({}, n[n.length - 1].rect);
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
      n.splice(Eo(n, {
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
        var l = 0, d = s.target, p = d.fromRect, c = C(d), f = d.prevFromRect, _ = d.prevToRect, v = s.rect, h = Se(d, !0);
        h && (c.top -= h.f, c.left -= h.e), d.toRect = c, d.thisAnimationDuration && Ct(f, c) && !Ct(p, c) && // Make sure animatingRect is on line between toRect & fromRect
        (v.top - c.top) / (v.left - c.left) === (p.top - c.top) / (p.left - c.left) && (l = To(v, f, _, r.options)), Ct(c, p) || (d.prevFromRect = p, d.prevToRect = c, l || (l = r.options.animation), r.animate(d, v, c, l)), l && (i = !0, a = Math.max(a, l), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, l), d.thisAnimationDuration = l);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, a) : typeof o == "function" && o(), n = [];
    },
    animate: function(o, r, i, a) {
      if (a) {
        g(o, "transition", ""), g(o, "transform", "");
        var s = Se(this.el), l = s && s.a, d = s && s.d, p = (r.left - i.left) / (l || 1), c = (r.top - i.top) / (d || 1);
        o.animatingX = !!p, o.animatingY = !!c, g(o, "transform", "translate3d(" + p + "px," + c + "px,0)"), this.forRepaintDummy = Co(o), g(o, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), g(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          g(o, "transition", ""), g(o, "transform", ""), o.animated = !1, o.animatingX = !1, o.animatingY = !1;
        }, a);
      }
    }
  };
}
function Co(n) {
  return n.offsetWidth;
}
function To(n, e, t, o) {
  return Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * o.animation;
}
var we = [], Tt = {
  initializeByDefault: !0
}, Qe = {
  mount: function(e) {
    for (var t in Tt)
      Tt.hasOwnProperty(t) && !(t in e) && (e[t] = Tt[t]);
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
      t[a.pluginName] && (t[a.pluginName][i] && t[a.pluginName][i](V({
        sortable: t
      }, o)), t.options[a.pluginName] && t[a.pluginName][e] && t[a.pluginName][e](V({
        sortable: t
      }, o)));
    });
  },
  initializePlugins: function(e, t, o, r) {
    we.forEach(function(s) {
      var l = s.pluginName;
      if (!(!e.options[l] && !s.initializeByDefault)) {
        var d = new s(e, t, e.options);
        d.sortable = e, d.options = e.options, e[l] = d, Q(o, d.defaults);
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
      typeof r.eventProperties == "function" && Q(o, r.eventProperties.call(t[r.pluginName], e));
    }), o;
  },
  modifyOption: function(e, t, o) {
    var r;
    return we.forEach(function(i) {
      e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], o));
    }), r;
  }
};
function Oo(n) {
  var e = n.sortable, t = n.rootEl, o = n.name, r = n.targetEl, i = n.cloneEl, a = n.toEl, s = n.fromEl, l = n.oldIndex, d = n.newIndex, p = n.oldDraggableIndex, c = n.newDraggableIndex, f = n.originalEvent, _ = n.putSortable, v = n.extraEventProperties;
  if (e = e || t && t[z], !!e) {
    var h, T = e.options, R = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !te && !Je ? h = new CustomEvent(o, {
      bubbles: !0,
      cancelable: !0
    }) : (h = document.createEvent("Event"), h.initEvent(o, !0, !0)), h.to = a || t, h.from = s || t, h.item = r || t, h.clone = i, h.oldIndex = l, h.newIndex = d, h.oldDraggableIndex = p, h.newDraggableIndex = c, h.originalEvent = f, h.pullMode = _ ? _.lastPutMode : void 0;
    var N = V(V({}, v), Qe.getEventProperties(o, e));
    for (var j in N)
      h[j] = N[j];
    t && t.dispatchEvent(h), T[R] && T[R].call(e, h);
  }
}
var Po = ["evt"], I = function(e, t) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = o.evt, i = $o(o, Po);
  Qe.pluginEvent.bind(b)(e, t, V({
    dragEl: u,
    parentEl: D,
    ghostEl: m,
    rootEl: E,
    nextEl: me,
    lastDownEl: dt,
    cloneEl: S,
    cloneHidden: ae,
    dragStarted: ze,
    putSortable: O,
    activeSortable: b.active,
    originalEvent: r,
    oldIndex: Ee,
    oldDraggableIndex: je,
    newIndex: U,
    newDraggableIndex: re,
    hideGhostForTarget: Wn,
    unhideGhostForTarget: Xn,
    cloneNowHidden: function() {
      ae = !0;
    },
    cloneNowShown: function() {
      ae = !1;
    },
    dispatchSortableEvent: function(s) {
      M({
        sortable: t,
        name: s,
        originalEvent: r
      });
    }
  }, i));
};
function M(n) {
  Oo(V({
    putSortable: O,
    cloneEl: S,
    targetEl: u,
    rootEl: E,
    oldIndex: Ee,
    oldDraggableIndex: je,
    newIndex: U,
    newDraggableIndex: re
  }, n));
}
var u, D, m, E, me, dt, S, ae, Ee, U, je, re, nt, O, ke = !1, bt = !1, mt = [], ge, W, Ot, Pt, _n, yn, ze, xe, We, Xe = !1, ot = !1, ct, P, Nt = [], Lt = !1, vt = [], $t = typeof document < "u", rt = qt, wn = Je || te ? "cssFloat" : "float", No = $t && !Mn && !qt && "draggable" in document.createElement("div"), Bn = (function() {
  if ($t) {
    if (te)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
})(), Yn = function(e, t) {
  var o = g(e), r = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), i = Ce(e, 0, t), a = Ce(e, 1, t), s = i && g(i), l = a && g(a), d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + C(i).width, p = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + C(a).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return i && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || d >= r && o[wn] === "none" || a && o[wn] === "none" && d + p > r) ? "vertical" : "horizontal";
}, Mo = function(e, t, o) {
  var r = o ? e.left : e.top, i = o ? e.right : e.bottom, a = o ? e.width : e.height, s = o ? t.left : t.top, l = o ? t.right : t.bottom, d = o ? t.width : t.height;
  return r === s || i === l || r + a / 2 === s + d / 2;
}, Io = function(e, t) {
  var o;
  return mt.some(function(r) {
    var i = r[z].options.emptyInsertThreshold;
    if (!(!i || Vt(r))) {
      var a = C(r), s = e >= a.left - i && e <= a.right + i, l = t >= a.top - i && t <= a.bottom + i;
      if (s && l)
        return o = r;
    }
  }), o;
}, jn = function(e) {
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
  var o = {}, r = e.group;
  (!r || lt(r) != "object") && (r = {
    name: r
  }), o.name = r.name, o.checkPull = t(r.pull, !0), o.checkPut = t(r.put), o.revertClone = r.revertClone, e.group = o;
}, Wn = function() {
  !Bn && m && g(m, "display", "none");
}, Xn = function() {
  !Bn && m && g(m, "display", "");
};
$t && !Mn && document.addEventListener("click", function(n) {
  if (bt)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), bt = !1, !1;
}, !0);
var be = function(e) {
  if (u) {
    e = e.touches ? e.touches[0] : e;
    var t = Io(e.clientX, e.clientY);
    if (t) {
      var o = {};
      for (var r in e)
        e.hasOwnProperty(r) && (o[r] = e[r]);
      o.target = o.rootEl = t, o.preventDefault = void 0, o.stopPropagation = void 0, t[z]._onDragOver(o);
    }
  }
}, zo = function(e) {
  u && u.parentNode[z]._isOutsideThisEl(e.target);
};
function b(n, e) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = e = Q({}, e), n[z] = this;
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
    supportPointer: b.supportPointer !== !1 && "PointerEvent" in window && (!Be || qt),
    emptyInsertThreshold: 5
  };
  Qe.initializePlugins(this, n, t);
  for (var o in t)
    !(o in e) && (e[o] = t[o]);
  jn(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : No, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? x(n, "pointerdown", this._onTapStart) : (x(n, "mousedown", this._onTapStart), x(n, "touchstart", this._onTapStart)), this.nativeDraggable && (x(n, "dragover", this), x(n, "dragenter", this)), mt.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), Q(this, Ao());
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
      var t = this, o = this.el, r = this.options, i = r.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, d = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, p = r.filter;
      if (jo(o), !u && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Be && l && l.tagName.toUpperCase() === "SELECT") && (l = X(l, r.draggable, o, !1), !(l && l.animated) && dt !== l)) {
        if (Ee = Y(l), je = Y(l, r.draggable), typeof p == "function") {
          if (p.call(this, e, l, this)) {
            M({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: l,
              toEl: o,
              fromEl: o
            }), I("filter", t, {
              evt: e
            }), i && e.preventDefault();
            return;
          }
        } else if (p && (p = p.split(",").some(function(c) {
          if (c = X(d, c.trim(), o, !1), c)
            return M({
              sortable: t,
              rootEl: c,
              name: "filter",
              targetEl: l,
              fromEl: o,
              toEl: o
            }), I("filter", t, {
              evt: e
            }), !0;
        }), p)) {
          i && e.preventDefault();
          return;
        }
        r.handle && !X(d, r.handle, o, !1) || this._prepareDragStart(e, s, l);
      }
    }
  },
  _prepareDragStart: function(e, t, o) {
    var r = this, i = r.el, a = r.options, s = i.ownerDocument, l;
    if (o && !u && o.parentNode === i) {
      var d = C(o);
      if (E = i, u = o, D = u.parentNode, me = u.nextSibling, dt = o, nt = a.group, b.dragged = u, ge = {
        target: u,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, _n = ge.clientX - d.left, yn = ge.clientY - d.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, u.style["will-change"] = "all", l = function() {
        if (I("delayEnded", r, {
          evt: e
        }), b.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !gn && r.nativeDraggable && (u.draggable = !0), r._triggerDragStart(e, t), M({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), L(u, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(p) {
        Rn(u, p.trim(), Mt);
      }), x(s, "dragover", be), x(s, "mousemove", be), x(s, "touchmove", be), a.supportPointer ? (x(s, "pointerup", r._onDrop), !this.nativeDraggable && x(s, "pointercancel", r._onDrop)) : (x(s, "mouseup", r._onDrop), x(s, "touchend", r._onDrop), x(s, "touchcancel", r._onDrop)), gn && this.nativeDraggable && (this.options.touchStartThreshold = 4, u.draggable = !0), I("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(Je || te))) {
        if (b.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (x(s, "pointerup", r._disableDelayedDrag), x(s, "pointercancel", r._disableDelayedDrag)) : (x(s, "mouseup", r._disableDelayedDrag), x(s, "touchend", r._disableDelayedDrag), x(s, "touchcancel", r._disableDelayedDrag)), x(s, "mousemove", r._delayedDragTouchMoveHandler), x(s, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && x(s, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(l, a.delay);
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
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? x(document, "pointermove", this._onTouchMove) : t ? x(document, "touchmove", this._onTouchMove) : x(document, "mousemove", this._onTouchMove) : (x(u, "dragend", this), x(E, "dragstart", this._onDragStart));
    try {
      document.selection ? ut(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (ke = !1, E && u) {
      I("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && x(document, "dragover", zo);
      var o = this.options;
      !e && L(u, o.dragClass, !1), L(u, o.ghostClass, !0), b.active = this, e && this._appendGhost(), M({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (W) {
      this._lastX = W.clientX, this._lastY = W.clientY, Wn();
      for (var e = document.elementFromPoint(W.clientX, W.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(W.clientX, W.clientY), e !== t); )
        t = e;
      if (u.parentNode[z]._isOutsideThisEl(e), t)
        do {
          if (t[z]) {
            var o = void 0;
            if (o = t[z]._onDragOver({
              clientX: W.clientX,
              clientY: W.clientY,
              target: e,
              rootEl: t
            }), o && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = zn(t));
      Xn();
    }
  },
  _onTouchMove: function(e) {
    if (ge) {
      var t = this.options, o = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = m && Se(m, !0), s = m && a && a.a, l = m && a && a.d, d = rt && P && vn(P), p = (i.clientX - ge.clientX + r.x) / (s || 1) + (d ? d[0] - Nt[0] : 0) / (s || 1), c = (i.clientY - ge.clientY + r.y) / (l || 1) + (d ? d[1] - Nt[1] : 0) / (l || 1);
      if (!b.active && !ke) {
        if (o && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < o)
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
      var e = this.options.fallbackOnBody ? document.body : E, t = C(u, !0, rt, !0, e), o = this.options;
      if (rt) {
        for (P = e; g(P, "position") === "static" && g(P, "transform") === "none" && P !== document; )
          P = P.parentNode;
        P !== document.body && P !== document.documentElement ? (P === document && (P = q()), t.top += P.scrollTop, t.left += P.scrollLeft) : P = q(), Nt = vn(P);
      }
      m = u.cloneNode(!0), L(m, o.ghostClass, !1), L(m, o.fallbackClass, !0), L(m, o.dragClass, !0), g(m, "transition", ""), g(m, "transform", ""), g(m, "box-sizing", "border-box"), g(m, "margin", 0), g(m, "top", t.top), g(m, "left", t.left), g(m, "width", t.width), g(m, "height", t.height), g(m, "opacity", "0.8"), g(m, "position", rt ? "absolute" : "fixed"), g(m, "zIndex", "100000"), g(m, "pointerEvents", "none"), b.ghost = m, e.appendChild(m), g(m, "transform-origin", _n / parseInt(m.style.width) * 100 + "% " + yn / parseInt(m.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var o = this, r = e.dataTransfer, i = o.options;
    if (I("dragStart", this, {
      evt: e
    }), b.eventCanceled) {
      this._onDrop();
      return;
    }
    I("setupClone", this), b.eventCanceled || (S = Ln(u), S.removeAttribute("id"), S.draggable = !1, S.style["will-change"] = "", this._hideClone(), L(S, this.options.chosenClass, !1), b.clone = S), o.cloneId = ut(function() {
      I("clone", o), !b.eventCanceled && (o.options.removeCloneOnHide || E.insertBefore(S, u), o._hideClone(), M({
        sortable: o,
        name: "clone"
      }));
    }), !t && L(u, i.dragClass, !0), t ? (bt = !0, o._loopId = setInterval(o._emulateDragOver, 50)) : (w(document, "mouseup", o._onDrop), w(document, "touchend", o._onDrop), w(document, "touchcancel", o._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(o, r, u)), x(document, "drop", o), g(u, "transform", "translateZ(0)")), ke = !0, o._dragStartId = ut(o._dragStarted.bind(o, t, e)), x(document, "selectstart", o), ze = !0, window.getSelection().removeAllRanges(), Be && g(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, o = e.target, r, i, a, s = this.options, l = s.group, d = b.active, p = nt === l, c = s.sort, f = O || d, _, v = this, h = !1;
    if (Lt) return;
    function T(Me, Jn) {
      I(Me, v, V({
        evt: e,
        isOwner: p,
        axis: _ ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: c,
        fromSortable: f,
        target: o,
        completed: N,
        onMove: function(tn, Qn) {
          return it(E, t, u, r, tn, C(tn), e, Qn);
        },
        changed: j
      }, Jn));
    }
    function R() {
      T("dragOverAnimationCapture"), v.captureAnimationState(), v !== f && f.captureAnimationState();
    }
    function N(Me) {
      return T("dragOverCompleted", {
        insertion: Me
      }), Me && (p ? d._hideClone() : d._showClone(v), v !== f && (L(u, O ? O.options.ghostClass : d.options.ghostClass, !1), L(u, s.ghostClass, !0)), O !== v && v !== b.active ? O = v : v === b.active && O && (O = null), f === v && (v._ignoreWhileAnimating = o), v.animateAll(function() {
        T("dragOverAnimationComplete"), v._ignoreWhileAnimating = null;
      }), v !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (o === u && !u.animated || o === t && !o.animated) && (xe = null), !s.dragoverBubble && !e.rootEl && o !== document && (u.parentNode[z]._isOutsideThisEl(e.target), !Me && be(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), h = !0;
    }
    function j() {
      U = Y(u), re = Y(u, s.draggable), M({
        sortable: v,
        name: "change",
        toEl: t,
        newIndex: U,
        newDraggableIndex: re,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = X(o, s.draggable, t, !0), T("dragOver"), b.eventCanceled) return h;
    if (u.contains(e.target) || o.animated && o.animatingX && o.animatingY || v._ignoreWhileAnimating === o)
      return N(!1);
    if (bt = !1, d && !s.disabled && (p ? c || (a = D !== E) : O === this || (this.lastPutMode = nt.checkPull(this, d, u, e)) && l.checkPut(this, d, u, e))) {
      if (_ = this._getDirection(e, o) === "vertical", r = C(u), T("dragOverValid"), b.eventCanceled) return h;
      if (a)
        return D = E, R(), this._hideClone(), T("revert"), b.eventCanceled || (me ? E.insertBefore(u, me) : E.appendChild(u)), N(!0);
      var F = Vt(t, s.draggable);
      if (!F || Lo(e, _, this) && !F.animated) {
        if (F === u)
          return N(!1);
        if (F && t === e.target && (o = F), o && (i = C(o)), it(E, t, u, r, o, i, e, !!o) !== !1)
          return R(), F && F.nextSibling ? t.insertBefore(u, F.nextSibling) : t.appendChild(u), D = t, j(), N(!0);
      } else if (F && Ho(e, _, this)) {
        var ue = Ce(t, 0, s, !0);
        if (ue === u)
          return N(!1);
        if (o = ue, i = C(o), it(E, t, u, r, o, i, e, !1) !== !1)
          return R(), t.insertBefore(u, ue), D = t, j(), N(!0);
      } else if (o.parentNode === t) {
        i = C(o);
        var G = 0, pe, Te = u.parentNode !== t, H = !Mo(u.animated && u.toRect || r, o.animated && o.toRect || i, _), Oe = _ ? "top" : "left", ne = mn(o, "top", "top") || mn(u, "top", "top"), Pe = ne ? ne.scrollTop : void 0;
        xe !== o && (pe = i[Oe], Xe = !1, ot = !H && s.invertSwap || Te), G = Uo(e, o, i, _, H ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, ot, xe === o);
        var Z;
        if (G !== 0) {
          var he = Y(u);
          do
            he -= G, Z = D.children[he];
          while (Z && (g(Z, "display") === "none" || Z === m));
        }
        if (G === 0 || Z === o)
          return N(!1);
        xe = o, We = G;
        var Ne = o.nextElementSibling, oe = !1;
        oe = G === 1;
        var tt = it(E, t, u, r, o, i, e, oe);
        if (tt !== !1)
          return (tt === 1 || tt === -1) && (oe = tt === 1), Lt = !0, setTimeout(Fo, 30), R(), oe && !Ne ? t.appendChild(u) : o.parentNode.insertBefore(u, oe ? Ne : o), ne && Hn(ne, 0, Pe - ne.scrollTop), D = u.parentNode, pe !== void 0 && !ot && (ct = Math.abs(pe - C(o)[Oe])), j(), N(!0);
      }
      if (t.contains(u))
        return N(!1);
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
    var t = this.el, o = this.options;
    if (U = Y(u), re = Y(u, o.draggable), I("drop", this, {
      evt: e
    }), D = u && u.parentNode, U = Y(u), re = Y(u, o.draggable), b.eventCanceled) {
      this._nulling();
      return;
    }
    ke = !1, ot = !1, Xe = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Ut(this.cloneId), Ut(this._dragStartId), this.nativeDraggable && (w(document, "drop", this), w(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Be && g(document.body, "user-select", ""), g(u, "transform", ""), e && (ze && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), m && m.parentNode && m.parentNode.removeChild(m), (E === D || O && O.lastPutMode !== "clone") && S && S.parentNode && S.parentNode.removeChild(S), u && (this.nativeDraggable && w(u, "dragend", this), Mt(u), u.style["will-change"] = "", ze && !ke && L(u, O ? O.options.ghostClass : this.options.ghostClass, !1), L(u, this.options.chosenClass, !1), M({
      sortable: this,
      name: "unchoose",
      toEl: D,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), E !== D ? (U >= 0 && (M({
      rootEl: D,
      name: "add",
      toEl: D,
      fromEl: E,
      originalEvent: e
    }), M({
      sortable: this,
      name: "remove",
      toEl: D,
      originalEvent: e
    }), M({
      rootEl: D,
      name: "sort",
      toEl: D,
      fromEl: E,
      originalEvent: e
    }), M({
      sortable: this,
      name: "sort",
      toEl: D,
      originalEvent: e
    })), O && O.save()) : U !== Ee && U >= 0 && (M({
      sortable: this,
      name: "update",
      toEl: D,
      originalEvent: e
    }), M({
      sortable: this,
      name: "sort",
      toEl: D,
      originalEvent: e
    })), b.active && ((U == null || U === -1) && (U = Ee, re = je), M({
      sortable: this,
      name: "end",
      toEl: D,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    I("nulling", this), E = u = D = m = me = S = dt = ae = ge = W = ze = U = re = Ee = je = xe = We = O = nt = b.dragged = b.ghost = b.clone = b.active = null, vt.forEach(function(e) {
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
        u && (this._onDragOver(e), Ro(e));
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
      t = o[r], X(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || Yo(t));
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
      X(s, this.options.draggable, r, !1) && (o[i] = s);
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
    var r = Qe.modifyOption(this, e, t);
    typeof r < "u" ? o[e] = r : o[e] = t, e === "group" && jn(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    I("destroy", this);
    var e = this.el;
    e[z] = null, w(e, "mousedown", this._onTapStart), w(e, "touchstart", this._onTapStart), w(e, "pointerdown", this._onTapStart), this.nativeDraggable && (w(e, "dragover", this), w(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), mt.splice(mt.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!ae) {
      if (I("hideClone", this), b.eventCanceled) return;
      g(S, "display", "none"), this.options.removeCloneOnHide && S.parentNode && S.parentNode.removeChild(S), ae = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (ae) {
      if (I("showClone", this), b.eventCanceled) return;
      u.parentNode == E && !this.options.group.revertClone ? E.insertBefore(S, u) : me ? E.insertBefore(S, me) : E.appendChild(S), this.options.group.revertClone && this.animate(u, S), g(S, "display", ""), ae = !1;
    }
  }
};
function Ro(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function it(n, e, t, o, r, i, a, s) {
  var l, d = n[z], p = d.options.onMove, c;
  return window.CustomEvent && !te && !Je ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = n, l.dragged = t, l.draggedRect = o, l.related = r || e, l.relatedRect = i || C(e), l.willInsertAfter = s, l.originalEvent = a, n.dispatchEvent(l), p && (c = p.call(d, l, a)), c;
}
function Mt(n) {
  n.draggable = !1;
}
function Fo() {
  Lt = !1;
}
function Ho(n, e, t) {
  var o = C(Ce(t.el, 0, t.options, !0)), r = Un(t.el, t.options, m), i = 10;
  return e ? n.clientX < r.left - i || n.clientY < o.top && n.clientX < o.right : n.clientY < r.top - i || n.clientY < o.bottom && n.clientX < o.left;
}
function Lo(n, e, t) {
  var o = C(Vt(t.el, t.options.draggable)), r = Un(t.el, t.options, m), i = 10;
  return e ? n.clientX > r.right + i || n.clientY > o.bottom && n.clientX > o.left : n.clientY > r.bottom + i || n.clientX > o.right && n.clientY > o.top;
}
function Uo(n, e, t, o, r, i, a, s) {
  var l = o ? n.clientY : n.clientX, d = o ? t.height : t.width, p = o ? t.top : t.left, c = o ? t.bottom : t.right, f = !1;
  if (!a) {
    if (s && ct < d * r) {
      if (!Xe && (We === 1 ? l > p + d * i / 2 : l < c - d * i / 2) && (Xe = !0), Xe)
        f = !0;
      else if (We === 1 ? l < p + ct : l > c - ct)
        return -We;
    } else if (l > p + d * (1 - r) / 2 && l < c - d * (1 - r) / 2)
      return Bo(e);
  }
  return f = f || a, f && (l < p + d * i / 2 || l > c - d * i / 2) ? l > p + d / 2 ? 1 : -1 : 0;
}
function Bo(n) {
  return Y(u) < Y(n) ? 1 : -1;
}
function Yo(n) {
  for (var e = n.tagName + n.className + n.src + n.href + n.textContent, t = e.length, o = 0; t--; )
    o += e.charCodeAt(t);
  return o.toString(36);
}
function jo(n) {
  vt.length = 0;
  for (var e = n.getElementsByTagName("input"), t = e.length; t--; ) {
    var o = e[t];
    o.checked && vt.push(o);
  }
}
function ut(n) {
  return setTimeout(n, 0);
}
function Ut(n) {
  return clearTimeout(n);
}
$t && x(document, "touchmove", function(n) {
  (b.active || ke) && n.cancelable && n.preventDefault();
});
b.utils = {
  on: x,
  off: w,
  css: g,
  find: Rn,
  is: function(e, t) {
    return !!X(e, t, e, !1);
  },
  extend: So,
  throttle: Fn,
  closest: X,
  toggleClass: L,
  clone: Ln,
  index: Y,
  nextTick: ut,
  cancelNextTick: Ut,
  detectDirection: Yn,
  getChild: Ce,
  expando: z
};
b.get = function(n) {
  return n[z];
};
b.mount = function() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (b.utils = V(V({}, b.utils), o.utils)), Qe.mount(o);
  });
};
b.create = function(n, e) {
  return new b(n, e);
};
b.version = ko;
var A = [], Re, Bt, Yt = !1, It, zt, _t, Fe;
function Wo() {
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
      this.sortable.nativeDraggable ? x(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? x(document, "pointermove", this._handleFallbackAutoScroll) : o.touches ? x(document, "touchmove", this._handleFallbackAutoScroll) : x(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var o = t.originalEvent;
      !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
    },
    drop: function() {
      this.sortable.nativeDraggable ? w(document, "dragover", this._handleAutoScroll) : (w(document, "pointermove", this._handleFallbackAutoScroll), w(document, "touchmove", this._handleFallbackAutoScroll), w(document, "mousemove", this._handleFallbackAutoScroll)), xn(), pt(), Do();
    },
    nulling: function() {
      _t = Bt = Re = Yt = Fe = It = zt = null, A.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, o) {
      var r = this, i = (t.touches ? t.touches[0] : t).clientX, a = (t.touches ? t.touches[0] : t).clientY, s = document.elementFromPoint(i, a);
      if (_t = t, o || this.options.forceAutoScrollFallback || Je || te || Be) {
        Rt(t, this.options, s, o);
        var l = se(s, !0);
        Yt && (!Fe || i !== It || a !== zt) && (Fe && xn(), Fe = setInterval(function() {
          var d = se(document.elementFromPoint(i, a), !0);
          d !== l && (l = d, pt()), Rt(t, r.options, d, o);
        }, 10), It = i, zt = a);
      } else {
        if (!this.options.bubbleScroll || se(s, !0) === q()) {
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
  A.forEach(function(n) {
    clearInterval(n.pid);
  }), A = [];
}
function xn() {
  clearInterval(Fe);
}
var Rt = Fn(function(n, e, t, o) {
  if (e.scroll) {
    var r = (n.touches ? n.touches[0] : n).clientX, i = (n.touches ? n.touches[0] : n).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = q(), d = !1, p;
    Bt !== t && (Bt = t, pt(), Re = e.scroll, p = e.scrollFn, Re === !0 && (Re = se(t, !0)));
    var c = 0, f = Re;
    do {
      var _ = f, v = C(_), h = v.top, T = v.bottom, R = v.left, N = v.right, j = v.width, F = v.height, ue = void 0, G = void 0, pe = _.scrollWidth, Te = _.scrollHeight, H = g(_), Oe = _.scrollLeft, ne = _.scrollTop;
      _ === l ? (ue = j < pe && (H.overflowX === "auto" || H.overflowX === "scroll" || H.overflowX === "visible"), G = F < Te && (H.overflowY === "auto" || H.overflowY === "scroll" || H.overflowY === "visible")) : (ue = j < pe && (H.overflowX === "auto" || H.overflowX === "scroll"), G = F < Te && (H.overflowY === "auto" || H.overflowY === "scroll"));
      var Pe = ue && (Math.abs(N - r) <= a && Oe + j < pe) - (Math.abs(R - r) <= a && !!Oe), Z = G && (Math.abs(T - i) <= a && ne + F < Te) - (Math.abs(h - i) <= a && !!ne);
      if (!A[c])
        for (var he = 0; he <= c; he++)
          A[he] || (A[he] = {});
      (A[c].vx != Pe || A[c].vy != Z || A[c].el !== _) && (A[c].el = _, A[c].vx = Pe, A[c].vy = Z, clearInterval(A[c].pid), (Pe != 0 || Z != 0) && (d = !0, A[c].pid = setInterval((function() {
        o && this.layer === 0 && b.active._onTouchMove(_t);
        var Ne = A[this.layer].vy ? A[this.layer].vy * s : 0, oe = A[this.layer].vx ? A[this.layer].vx * s : 0;
        typeof p == "function" && p.call(b.dragged.parentNode[z], oe, Ne, n, _t, A[this.layer].el) !== "continue" || Hn(A[this.layer].el, oe, Ne);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && f !== l && (f = se(f, !1)));
    Yt = d;
  }
}, 30), Gn = function(e) {
  var t = e.originalEvent, o = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, s = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var d = o || i;
    s();
    var p = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, c = document.elementFromPoint(p.clientX, p.clientY);
    l(), d && !d.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: o
    }));
  }
};
function Zt() {
}
Zt.prototype = {
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
  drop: Gn
};
Q(Zt, {
  pluginName: "revertOnSpill"
});
function Kt() {
}
Kt.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable, r = o || this.sortable;
    r.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), r.animateAll();
  },
  drop: Gn
};
Q(Kt, {
  pluginName: "removeOnSpill"
});
b.mount(new Wo());
b.mount(Kt, Zt);
const et = "household_kanban";
function Xo(n, e) {
  return n.connection.subscribeMessage((t) => e(t.board), { type: `${et}/subscribe` });
}
function Ft(n, e, t) {
  return n.callService(et, "set_status", { uid: e, status: t });
}
function Go(n, e) {
  return n.callService(et, "create_item", { ...e });
}
function $n(n, e, t) {
  return n.callService(et, "update_item", { uid: e, ...t });
}
function qo(n, e) {
  return n.callService(et, "delete_item", { uid: e });
}
const Vo = 864e5;
function B(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
const le = (n) => String(n).padStart(2, "0");
function J(n) {
  return `${n.getFullYear()}-${le(n.getMonth() + 1)}-${le(n.getDate())}`;
}
function Zo(n, e) {
  if (!n) return null;
  if (!e) return n;
  const [t, o, r] = n.split("-").map(Number), [i, a] = e.split(":").map(Number), s = -new Date(t, o - 1, r, i, a).getTimezoneOffset(), l = Math.abs(s);
  return `${n}T${le(i)}:${le(a)}:00${s < 0 ? "-" : "+"}${le(Math.floor(l / 60))}:${le(l % 60)}`;
}
function Ko(n) {
  if (!n) return "";
  const { date: e, hasTime: t } = ee(n);
  return t ? `${le(e.getHours())}:${le(e.getMinutes())}` : "";
}
function de(n, e) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + e);
}
function Jt(n, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / Vo);
}
function ee(n) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(n)) {
    const [e, t, o] = n.split("-").map(Number);
    return { date: new Date(e, t - 1, o), hasTime: !1 };
  }
  return { date: new Date(n), hasTime: !0 };
}
function Jo(n, e) {
  const t = B(n), o = (t.getDay() - e + 7) % 7, r = de(t, -o);
  return o === 6 ? { start: de(r, 7), end: de(r, 13) } : { start: r, end: de(r, 6) };
}
const Qo = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function er(n, e) {
  var r, i;
  if (n === "saturday") return 0;
  if (n === "sunday") return 1;
  const t = e == null ? void 0 : e.first_weekday, o = Qo.indexOf(t ?? "");
  if (o >= 0) return o;
  try {
    const a = new Intl.Locale((e == null ? void 0 : e.language) ?? "en"), s = (i = ((r = a.getWeekInfo) == null ? void 0 : r.call(a)) ?? a.weekInfo) == null ? void 0 : i.firstDay;
    if (s) return s % 7;
  } catch {
  }
  return 1;
}
function yt(n, e) {
  const t = B(e.now);
  if (n.status === "completed")
    return !n.completed_at || !e.enabled.has("done") ? null : Jt(new Date(n.completed_at), t) < e.doneDays ? "done" : null;
  if (!n.due) return "todo";
  const o = B(ee(n.due).date), r = (...i) => i.find((a) => e.enabled.has(a)) ?? "todo";
  return o < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : r("today", "week") : +o == +t ? r("today", "week") : o <= e.week.end ? r("week") : r("later");
}
const tr = 8;
function nr(n, e, t) {
  return Math.hypot(n, e) >= tr;
}
function or(n, e, t) {
  const o = n.status === "completed" ? { status: "needs_action" } : {};
  if (typeof e == "number")
    return n.status === "needs_action" && n.priority === e ? null : { ...o, ...n.priority === e ? {} : { priority: e } };
  if (e === "overdue" || yt(n, t) === e) return null;
  if (e === "done") return { status: "completed" };
  if (e === "todo") return { ...o, due: null };
  if (e === "week") return { ...o, due: J(t.week.end) };
  if (e === "later") return { ...o, due: J(de(t.week.end, 1)) };
  const r = B(t.now);
  return n.due && +B(ee(n.due).date) == +r ? Object.keys(o).length ? o : null : { ...o, due: J(r) };
}
function rr(n) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(n, 10));
}
const qn = {
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
}, ir = {
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
  new_note: "Nová poznámka",
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
}, ar = { en: qn, cs: ir };
function k(n, e, t = {}) {
  return (ar[(n ?? "en").split("-")[0]] ?? qn)[e].replace(/\{(\w+)\}/g, (r, i) => String(t[i] ?? ""));
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
  const o = (n ?? "en").split("-")[0], r = o in kn ? o : "en", i = kn[r][e];
  return (i[new Intl.PluralRules(r).select(t)] ?? i.other).replace("{n}", String(t));
}
const sr = to`
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
`, lr = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], Qt = (n) => `c-${lr.includes(n) ? n : "grey"}`;
function en(n, e) {
  var t;
  return String(((t = n.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function dr(n) {
  return n.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function kt(n, e = !1) {
  return y`<span class="dot ${e ? "sm" : ""} ${Qt((n == null ? void 0 : n.color) ?? "grey")}"><ha-icon .icon=${(n == null ? void 0 : n.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function Ze(n, e, t = "", o = !1) {
  var s;
  if (!e) return y`<span class="ava none ${t}" title="-">+</span>`;
  const r = en(n, e), i = (s = n.states[e]) == null ? void 0 : s.attributes.entity_picture;
  if (typeof i == "string" && i) return y`<img class="ava ${t}" src=${i} alt=${o ? "" : r} title=${r} />`;
  const a = [...r].reduce((l, d) => (l * 31 + d.charCodeAt(0)) % 360, 7);
  return y`<span class="ava ${t}" title=${r} style="background:linear-gradient(135deg,hsl(${a} 55% 62%),hsl(${(a + 25) % 360} 55% 42%))">${dr(r)}</span>`;
}
const cr = y`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function Vn(n, e, t = !1) {
  const o = n.status === "completed";
  return y`<button class="check ${t ? "xs" : ""}" type="button" aria-pressed=${o} aria-label=${n.summary}
    @click=${() => e.onToggle(n)}>${cr}</button>`;
}
function ur(n, e) {
  const { date: t, hasTime: o } = ee(n.due), r = Jt(B(e.now), t);
  let i;
  return r === -1 ? i = k(e.lang, "yesterday") : r < -1 ? i = k(e.lang, "days_ago", { n: -r }) : r === 0 ? i = k(e.lang, "today") : r === 1 ? i = k(e.lang, "tomorrow") : i = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), o ? `${i} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : i;
}
function pr(n, e) {
  const t = Jt(new Date(n.completed_at), B(e.now));
  return t <= 0 ? k(e.lang, "done_today") : t === 1 ? k(e.lang, "done_yesterday") : k(e.lang, "done_days_ago", { n: t });
}
function hr(n, e, t) {
  const o = n.status === "completed", r = e.parents.find((d) => d.id === n.parent), i = B(e.now), a = !o && n.due && B(ee(n.due).date) < i, s = !o && n.due && +B(ee(n.due).date) == +i, l = y`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
  return y`<article class="card ${o ? "done" : ""}" data-uid=${n.uid} @click=${(d) => {
    d.target.closest(".check") || e.onOpen(n, d);
  }}>
    <div class="row">
      ${kt(r, !0)}
      <span class="parent-name">${(r == null ? void 0 : r.name) ?? n.parent}</span>
      ${Ze(e.hass, n.assignee)}
    </div>
    <div class="row top">
      ${Vn(n, e)}
      <button class="title" type="button">${n.summary}</button>
    </div>
    <div class="pills">
      ${!o && t ? y`<span class="pill prio-${n.priority} ${Qt(["", "red", "orange", "grey"][n.priority])}">${l}${k(e.lang, `prio_${n.priority}`)}</span>` : $}
      ${!o && n.moved > 0 ? y`<span class="pill c-orange">${k(e.lang, n.raised ? "moved_raised" : "moved", { n: n.moved })}</span>` : $}
      ${o && n.completed_at ? y`<span class="pill c-green">${pr(n, e)}</span>` : $}
      ${!o && n.due ? y`<span class="pill ${a ? "c-red" : s ? "today" : "later"}">${ur(n, e)}</span>` : $}
    </div>
  </article>`;
}
function fr(n, e, t, o, r) {
  const i = t ? n.items : n.items.slice(0, 3), a = n.items.length - i.length;
  return y`<article class="card">
    <div class="row">
      ${kt(n.parent)}
      <span class="stack-head">${n.parent.name}</span>
      <span class="stack-sub">${n.items.length}</span>
    </div>
    <div class="stack-rows">
      ${i.map((s) => y`<div class="item">
        ${Vn(s, e, !0)}
        <span class="t">${s.summary}</span>
        ${s.assignee ? Ze(e.hass, s.assignee, "xs") : $}
      </div>`)}
      ${a > 0 ? y`<button class="link" type="button" @click=${() => o(n.parent.id, !0)}>${k(e.lang, "more", { n: a })}</button>` : $}
      ${t && n.items.length > 3 ? y`<button class="link muted" type="button" @click=${() => o(n.parent.id, !1)}>${k(e.lang, "collapse")}</button>` : $}
    </div>
    <button class="link" type="button" @click=${() => r(n.parent.id)}>${k(e.lang, "open_list")} ›</button>
  </article>`;
}
function Zn(n) {
  return {
    uid: n.uid,
    status: n.status,
    parent: n.parent,
    summary: n.summary,
    description: n.description,
    priority: n.priority,
    assignee: n.assignee,
    date: n.due ? J(ee(n.due).date) : "",
    time: Ko(n.due),
    confirmDelete: !1
  };
}
function gr(n, e = {}) {
  return { status: "needs_action", parent: n, summary: "", description: "", priority: 2, assignee: null, date: "", time: "", confirmDelete: !1, ...e };
}
function Kn(n) {
  return {
    summary: n.summary.trim(),
    description: n.description,
    due: Zo(n.date, n.date ? n.time : ""),
    priority: n.priority,
    assignee: n.assignee,
    parent: n.parent
  };
}
function br(n, e) {
  const t = Kn(e), o = Zn(n), r = {};
  return t.summary !== n.summary && (r.summary = t.summary), t.description !== n.description && (r.description = t.description), (e.date !== o.date || e.time !== o.time) && (r.due = t.due), t.priority !== n.priority && (r.priority = t.priority), t.assignee !== n.assignee && (r.assignee = t.assignee), t.parent !== n.parent && (r.parent = t.parent), r;
}
function ht(n, e) {
  const t = B(e);
  return n === "none" ? "" : J(n === "today" ? t : n === "tomorrow" ? de(t, 1) : de(t, (6 - t.getDay() + 7) % 7));
}
const mr = y`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
function vr(n, e) {
  const t = (a) => k(e.lang, a), o = !n.uid, r = ["today", "tomorrow", "weekend", "none"], i = (a) => {
    a.target === a.currentTarget && e.onClose();
  };
  return y`<dialog class="kb-dialog" aria-labelledby="kb-dlg-title" @close=${e.onClose} @click=${i}>
    <div class="dlg">
      <div class="dlg-head">
        <span class="dlg-kicker" id="kb-dlg-title">${t(o ? "new_note" : "f_title")}</span>
        ${o ? $ : y`<button class="pill-btn ${n.status === "completed" ? "on" : ""}" type="button" @click=${e.onToggleDone}>
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
            class="prio-${a}" @click=${() => e.onChange({ priority: a })}>${mr}${t(`prio_${a}`)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_due")}</span>
        <div class="chips">
          ${r.map((a) => y`<button class="pill-btn ${ht(a, e.now) === n.date ? "on" : ""}" type="button"
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
            @click=${() => e.onChange({ assignee: a })}>${Ze(e.hass, a, "", !0)}${en(e.hass, a)}</button>`)}
        </div></div>

      <div class="dlg-foot">
        ${o ? $ : n.confirmDelete ? y`<span class="danger-text" role="alert">${t("delete_confirm")}</span>
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
function En(n) {
  if (!n.due) return 1 / 0;
  const { date: e, hasTime: t } = ee(n.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function Sn(n, e) {
  const t = En(n), o = En(e);
  return t !== o ? t < o ? -1 : 1 : n.priority - e.priority || +new Date(n.created_at) - +new Date(e.created_at);
}
function _r(n, e, t) {
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
const yr = ["todo", "later", "week", "overdue", "today", "done"], wr = (n, e) => +new Date(e.completed_at ?? 0) - +new Date(n.completed_at ?? 0);
function xr(n, e, t) {
  const { ctx: o } = e, r = n.filter((l) => l.status === "needs_action"), i = n.filter((l) => yt(l, o) === "done").sort(wr), a = n.filter((l) => l.status === "completed").length - i.length, s = e.group === "date" ? yr.filter((l) => l !== "done" && (l === "todo" || o.enabled.has(l))).map((l) => ({
    id: l,
    label: k(t, `col_${l}`),
    led: l === "overdue" ? "rgb(var(--c-red))" : l === "week" || l === "today" ? "var(--kb-accent)" : void 0,
    items: r.filter((d) => yt(d, o) === l).sort(Sn)
  })) : [1, 2, 3].map((l) => ({
    id: `p${l}`,
    label: k(t, `prio_${l}`),
    led: l === 1 ? "rgb(var(--c-red))" : l === 2 ? "rgb(var(--c-orange))" : void 0,
    items: r.filter((d) => d.priority === l).sort(Sn)
  }));
  return o.enabled.has("done") && s.push({ id: "done", label: k(t, "col_done"), led: "rgb(var(--c-green))", items: i, done: !0 }), { cols: s, olderDone: a };
}
function $r(n, e, t) {
  const { cols: o, olderDone: r } = xr(n, e, t.lang);
  return y`<div class="board">${o.map((i) => {
    const a = i.done ? i.items : _r(i.items, e.board.parents, e.parent);
    return y`<section class="col" data-col=${i.id}>
      <div class="col-head">
        <span class="led" style=${i.led ? `background:${i.led}` : ""}></span>
        <span class="label">${i.label}</span><span class="count">${i.items.length}</span>
        ${i.done || i.id === "overdue" ? $ : y`<button class="add" type="button" aria-label=${`${k(t.lang, "add_here")}: ${i.label}`} @click=${() => e.onAdd(i.id)}>+</button>`}
      </div>
      ${a.map((s) => "items" in s ? fr(s, t, e.expanded.has(s.parent.id), e.onExpand, e.onFocus) : hr(s, t, e.group === "date"))}
      ${i.done ? y`<div class="note">${k(t.lang, "done_note", { days: e.ctx.doneDays, older: r })}</div>` : $}
      ${!i.done && a.length === 0 ? y`<div class="empty">${k(t.lang, "nothing")}</div>` : $}
    </section>`;
  })}</div>`;
}
function kr(n, e, t, o, r) {
  const i = o.filter((s) => s.status === "needs_action" && (!e.who || s.assignee === e.who)), a = (s) => {
    const l = e.parent === ((s == null ? void 0 : s.id) ?? null), d = i.filter((p) => !s || p.parent === s.id).length;
    return y`<button class="chip ${s ? Qt(s.color) : ""}" type="button" aria-pressed=${l}
      @click=${() => r({ parent: l ? null : (s == null ? void 0 : s.id) ?? null })}>
      ${kt(s ?? void 0)}<span>${(s == null ? void 0 : s.name) ?? k(n.lang, "all_parents")}</span><b>${d}</b></button>`;
  };
  return y`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${k(n.lang, "filter_people")}>
      ${t.map((s) => {
    const l = e.who === s;
    return y`<button class="person" type="button" aria-pressed=${l} @click=${() => r({ who: l ? null : s })}>
          ${Ze(n.hass, s, "lg", !0)}<span>${en(n.hass, s)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${k(n.lang, "filter_parents")}>
      ${a(null)}${n.parents.map((s) => a(s))}
    </div>
    <div class="seg" role="group" aria-label=${k(n.lang, "group_label")}>
      ${["date", "priority"].map((s) => y`<button type="button" aria-pressed=${e.group === s}
        @click=${() => r({ group: s })}>${k(n.lang, `group_${s}`)}</button>`)}
    </div>
  </div>`;
}
const Er = ["todo", "week", "today", "done"], wt = class wt extends Ue {
  constructor() {
    super(), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set(), this._loadFailed = !1, this._busy = !1, this._sortables = /* @__PURE__ */ new Map(), this._attempts = 0, this.addEventListener("pointerdown", (e) => {
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
    const e = Xo(this.hass, (t) => {
      this._board = t, this._loadFailed = !1;
    });
    this._unsub = e, e.then(() => {
      this._unsub === e && (this._attempts = 0);
    }, () => {
      this._unsub === e && (this._unsub = void 0, this._loadFailed = !0, this._retry = window.setTimeout(() => {
        this._retry = void 0, this._subscribe();
      }, rr(this._attempts++)));
    });
  }
  _fail(e) {
    this._notice = e, window.setTimeout(() => {
      this._notice = void 0;
    }, 5e3);
  }
  /** Run a write from inside the dialog; close it on success, show the error in it otherwise. */
  async _dialogWrite(e, t) {
    this._busy = !0, this._dlgError = void 0;
    try {
      await t(), this._draft = void 0;
    } catch (o) {
      console.warn("household_kanban: write failed", o), this._dlgError = e;
    } finally {
      this._busy = !1;
    }
  }
  _save() {
    var r;
    const e = this.hass, t = this._draft;
    if (!e || !t) return;
    const o = t.uid ? (r = this._board) == null ? void 0 : r.items.find((i) => i.uid === t.uid) : void 0;
    this._dialogWrite("err_save", () => o ? $n(e, o.uid, br(o, t)) : Go(e, Kn(t)));
  }
  /** Tap on a card; a click that ends a drag is not a tap. */
  _open(e, t) {
    const o = t, r = this._down;
    r && nr(o.clientX - r.x, o.clientY - r.y, t.timeStamp - r.t) || (this._dlgError = void 0, this._draft = Zn(e));
  }
  _add(e, t, o) {
    var s, l;
    const r = this._filter.parent ?? ((s = t.find((d) => d.id === "household")) == null ? void 0 : s.id) ?? ((l = t[0]) == null ? void 0 : l.id);
    if (!r) return;
    const i = /^p([123])$/.exec(e), a = {
      today: ht("today", o.now),
      week: J(o.week.end),
      later: J(de(o.week.end, 1))
    };
    this._dlgError = void 0, this._draft = gr(r, i ? { priority: Number(i[1]) } : { date: a[e] ?? "" });
  }
  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  _syncSortables() {
    var o;
    const e = new Set(this.renderRoot.querySelectorAll(".col"));
    for (const [r, i] of this._sortables) e.has(r) || (i.destroy(), this._sortables.delete(r));
    const t = ((o = window.matchMedia) == null ? void 0 : o.call(window, "(pointer: coarse)").matches) ?? !1;
    for (const r of e) {
      if (this._sortables.has(r)) continue;
      let i = null;
      this._sortables.set(r, b.create(r, {
        group: { name: "kb", pull: !0, put: (a) => a.el.dataset.col !== "overdue" },
        draggable: "[data-uid]",
        filter: ".check",
        preventOnFilter: !1,
        sort: !1,
        delay: 150,
        delayOnTouchOnly: !0,
        touchStartThreshold: 8,
        forceFallback: t,
        onStart: (a) => {
          i = a.item.nextElementSibling;
        },
        onEnd: (a) => {
          a.from.insertBefore(a.item, i), a.to !== a.from && this._drop(a.item.dataset.uid, a.to.dataset.col);
        }
      }));
    }
  }
  _drop(e, t) {
    var c;
    const o = this.hass, r = this._ctx, i = (c = this._board) == null ? void 0 : c.items.find((f) => f.uid === e);
    if (!o || !r || !i || !t) return;
    const a = /^p([123])$/.exec(t), s = or(i, a ? Number(a[1]) : t, r);
    if (!s) return;
    const { status: l, ...d } = s;
    (async () => {
      Object.keys(d).length && await $n(o, i.uid, d), l && await Ft(o, i.uid, l);
    })().catch((f) => {
      console.warn("household_kanban: drop failed", f), this._fail("err_update");
    });
  }
  updated() {
    this._syncSortables();
    const e = this.renderRoot.querySelector("dialog");
    e && !e.open && e.showModal();
  }
  render() {
    var v;
    const e = this.hass, t = this._config, o = this._board;
    if (!e || !t) return $;
    const r = ((v = e.locale) == null ? void 0 : v.language) ?? e.language ?? "en";
    if (!o) return y`<ha-card><div class="loading">${k(r, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const i = /* @__PURE__ */ new Date(), a = o.parents.filter((h) => !t.parents || t.parents.includes(h.id)), s = new Set(t.columns ?? Er);
    s.add("todo"), o.end_of_day_mode === "overdue" && s.add("overdue");
    const l = {
      now: i,
      enabled: s,
      mode: o.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: Jo(i, er(t.week_end, e.locale))
    };
    this._ctx = l;
    const d = {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      onOpen: (h, T) => this._open(h, T),
      onToggle: (h) => {
        Ft(e, h.uid, h.status === "completed" ? "needs_action" : "completed").catch((T) => {
          console.warn("household_kanban: set_status failed", T), this._fail("err_update");
        });
      }
    }, p = t.people ?? Object.keys(e.states).filter((h) => h.startsWith("person.")), c = this._filter, f = o.items.filter((h) => a.some((T) => T.id === h.parent)), _ = f.filter((h) => (!c.who || h.assignee === c.who) && (!c.parent || h.parent === c.parent));
    return y`<ha-card>
      ${this._notice ? y`<div class="notice" role="alert">${k(r, this._notice)}</div>` : $}
      <header>
        <div class="titles"><h1>${k(r, "title")}</h1><div class="summary">${this._summary(f, l, r)}</div></div>
        <button class="new" type="button" @click=${() => this._add("todo", a, l)}>+ ${k(r, "new_note")}</button>
      </header>
      ${kr(d, c, p, f, (h) => {
      this._filter = { ...c, ...h };
    })}
      ${$r(_, {
      board: { ...o, parents: a },
      ctx: l,
      group: c.group,
      who: c.who,
      parent: c.parent,
      expanded: this._expanded,
      onExpand: (h, T) => {
        const R = new Set(this._expanded);
        T ? R.add(h) : R.delete(h), this._expanded = R;
      },
      onFocus: (h) => {
        this._filter = { ...c, parent: h };
      },
      onAdd: (h) => this._add(h, a, l)
    }, d)}
      ${this._draft ? vr(this._draft, {
      hass: e,
      lang: r,
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
        const h = this._draft;
        h != null && h.uid && this._dialogWrite("err_update", () => Ft(e, h.uid, h.status === "completed" ? "needs_action" : "completed"));
      },
      onDelete: () => {
        const h = this._draft;
        h != null && h.uid && this._dialogWrite("err_delete", () => qo(e, h.uid));
      }
    }) : $}
    </ha-card>`;
  }
  _summary(e, t, o) {
    const r = e.filter((d) => d.status === "needs_action"), i = B(t.now), a = r.filter((d) => d.due && B(ee(d.due).date) < i).length, s = r.filter((d) => yt(d, t) === "today").length, l = t.mode === "overdue" ? at(o, "sum_overdue", a) : at(o, "sum_moved", r.filter((d) => d.moved > 0).length);
    return [at(o, "sum_open", r.length), at(o, "sum_today", s), l].join(" · ");
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
}, wt.styles = sr;
let jt = wt;
customElements.define("household-kanban-card", jt);
(window.customCards ?? (window.customCards = [])).push({
  type: "household-kanban-card",
  name: "Household Kanban",
  description: "Kanban board for household tasks"
});
