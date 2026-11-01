/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = globalThis, en = ht.ShadowRoot && (ht.ShadyCSS === void 0 || ht.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, tn = Symbol(), cn = /* @__PURE__ */ new WeakMap();
let Rn = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== tn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (en && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = cn.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && cn.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const _o = (n) => new Rn(typeof n == "string" ? n : n + "", void 0, tn), Fn = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((o, r, i) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[i + 1], n[0]);
  return new Rn(t, n, tn);
}, vo = (n, e) => {
  if (en) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), r = ht.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = t.cssText, n.appendChild(o);
  }
}, un = en ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return _o(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yo, defineProperty: wo, getOwnPropertyDescriptor: xo, getOwnPropertyNames: $o, getOwnPropertySymbols: ko, getPrototypeOf: So } = Object, ce = globalThis, hn = ce.trustedTypes, Eo = hn ? hn.emptyScript : "", Ot = ce.reactiveElementPolyfillSupport, Ye = (n, e) => n, Yt = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Eo : null;
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
} }, Hn = (n, e) => !yo(n, e), pn = { attribute: !0, type: String, converter: Yt, reflect: !1, useDefault: !1, hasChanged: Hn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ce.litPropertyMetadata ?? (ce.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Se = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = pn) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(e, o, t);
      r !== void 0 && wo(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: r, set: i } = xo(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? pn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ye("elementProperties"))) return;
    const e = So(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ye("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ye("properties"))) {
      const t = this.properties, o = [...$o(t), ...ko(t)];
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
      for (const r of o) t.unshift(un(r));
    } else e !== void 0 && t.push(un(e));
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
    return vo(e, this.constructor.elementStyles), e;
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
      const a = (((i = o.converter) == null ? void 0 : i.toAttribute) !== void 0 ? o.converter : Yt).toAttribute(t, o.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, a;
    const o = this.constructor, r = o._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = o.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((i = s.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? s.converter : Yt;
      this._$Em = r;
      const d = l.fromAttribute(t, s.type);
      this[r] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, r = !1, i) {
    var a;
    if (e !== void 0) {
      const s = this.constructor;
      if (r === !1 && (i = this[e]), o ?? (o = s.getPropertyOptions(e)), !((o.hasChanged ?? Hn)(i, t) || o.useDefault && o.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(s._$Eu(e, o)))) return;
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
Se.elementStyles = [], Se.shadowRootOptions = { mode: "open" }, Se[Ye("elementProperties")] = /* @__PURE__ */ new Map(), Se[Ye("finalized")] = /* @__PURE__ */ new Map(), Ot == null || Ot({ ReactiveElement: Se }), (ce.reactiveElementVersions ?? (ce.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We = globalThis, fn = (n) => n, vt = We.trustedTypes, gn = vt ? vt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ln = "$lit$", ae = `lit$${Math.random().toFixed(9).slice(2)}$`, Un = "?" + ae, Do = `<${Un}>`, xe = document, Qe = () => xe.createComment(""), et = (n) => n === null || typeof n != "object" && typeof n != "function", nn = Array.isArray, Co = (n) => nn(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Mt = `[ 	
\f\r]`, Le = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, bn = /-->/g, mn = />/g, ge = RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _n = /'/g, vn = /"/g, Bn = /^(?:script|style|textarea|title)$/i, Ao = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), f = Ao(1), Te = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), yn = /* @__PURE__ */ new WeakMap(), ve = xe.createTreeWalker(xe, 129);
function jn(n, e) {
  if (!nn(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gn !== void 0 ? gn.createHTML(e) : e;
}
const To = (n, e) => {
  const t = n.length - 1, o = [];
  let r, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Le;
  for (let s = 0; s < t; s++) {
    const l = n[s];
    let d, u, c = -1, g = 0;
    for (; g < l.length && (a.lastIndex = g, u = a.exec(l), u !== null); ) g = a.lastIndex, a === Le ? u[1] === "!--" ? a = bn : u[1] !== void 0 ? a = mn : u[2] !== void 0 ? (Bn.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = ge) : u[3] !== void 0 && (a = ge) : a === ge ? u[0] === ">" ? (a = r ?? Le, c = -1) : u[1] === void 0 ? c = -2 : (c = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? ge : u[3] === '"' ? vn : _n) : a === vn || a === _n ? a = ge : a === bn || a === mn ? a = Le : (a = ge, r = void 0);
    const v = a === ge && n[s + 1].startsWith("/>") ? " " : "";
    i += a === Le ? l + Do : c >= 0 ? (o.push(d), l.slice(0, c) + Ln + l.slice(c) + ae + v) : l + ae + (c === -2 ? s : v);
  }
  return [jn(n, i + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class tt {
  constructor({ strings: e, _$litType$: t }, o) {
    let r;
    this.parts = [];
    let i = 0, a = 0;
    const s = e.length - 1, l = this.parts, [d, u] = To(e, t);
    if (this.el = tt.createElement(d, o), ve.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = ve.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(Ln)) {
          const g = u[a++], v = r.getAttribute(c).split(ae), x = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: i, name: x[2], strings: v, ctor: x[1] === "." ? Mo : x[1] === "?" ? Po : x[1] === "@" ? No : Ct }), r.removeAttribute(c);
        } else c.startsWith(ae) && (l.push({ type: 6, index: i }), r.removeAttribute(c));
        if (Bn.test(r.tagName)) {
          const c = r.textContent.split(ae), g = c.length - 1;
          if (g > 0) {
            r.textContent = vt ? vt.emptyScript : "";
            for (let v = 0; v < g; v++) r.append(c[v], Qe()), ve.nextNode(), l.push({ type: 2, index: ++i });
            r.append(c[g], Qe());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Un) l.push({ type: 2, index: i });
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
function Oe(n, e, t = n, o) {
  var a, s;
  if (e === Te) return e;
  let r = o !== void 0 ? (a = t._$Co) == null ? void 0 : a[o] : t._$Cl;
  const i = et(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== i && ((s = r == null ? void 0 : r._$AO) == null || s.call(r, !1), i === void 0 ? r = void 0 : (r = new i(n), r._$AT(n, t, o)), o !== void 0 ? (t._$Co ?? (t._$Co = []))[o] = r : t._$Cl = r), r !== void 0 && (e = Oe(n, r._$AS(n, e.values), r, o)), e;
}
class Oo {
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
    ve.currentNode = r;
    let i = ve.nextNode(), a = 0, s = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new nt(i, i.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (d = new Io(i, this, e)), this._$AV.push(d), l = o[++s];
      }
      a !== (l == null ? void 0 : l.index) && (i = ve.nextNode(), a++);
    }
    return ve.currentNode = xe, r;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class nt {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, o, r) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = Oe(this, e, t), et(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== Te && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Co(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && et(this._$AH) ? this._$AA.nextSibling.data = e : this.T(xe.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: t, _$litType$: o } = e, r = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = tt.createElement(jn(o.h, o.h[0]), this.options)), o);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === r) this._$AH.p(t);
    else {
      const a = new Oo(r, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = yn.get(e.strings);
    return t === void 0 && yn.set(e.strings, t = new tt(e)), t;
  }
  k(e) {
    nn(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, r = 0;
    for (const i of e) r === t.length ? t.push(o = new nt(this.O(Qe()), this.O(Qe()), this, this.options)) : o = t[r], o._$AI(i), r++;
    r < t.length && (this._$AR(o && o._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = fn(e).nextSibling;
      fn(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Ct {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, r, i) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = b;
  }
  _$AI(e, t = this, o, r) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) e = Oe(this, e, t, 0), a = !et(e) || e !== this._$AH && e !== Te, a && (this._$AH = e);
    else {
      const s = e;
      let l, d;
      for (e = i[0], l = 0; l < i.length - 1; l++) d = Oe(this, s[o + l], t, l), d === Te && (d = this._$AH[l]), a || (a = !et(d) || d !== this._$AH[l]), d === b ? e = b : e !== b && (e += (d ?? "") + i[l + 1]), this._$AH[l] = d;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Mo extends Ct {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class Po extends Ct {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class No extends Ct {
  constructor(e, t, o, r, i) {
    super(e, t, o, r, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Oe(this, e, t, 0) ?? b) === Te) return;
    const o = this._$AH, r = e === b && o !== b || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, i = e !== b && (o === b || r);
    r && this.element.removeEventListener(this.name, this, o), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Io {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Oe(this, e);
  }
}
const Pt = We.litHtmlPolyfillSupport;
Pt == null || Pt(tt, nt), (We.litHtmlVersions ?? (We.litHtmlVersions = [])).push("3.3.3");
const zo = (n, e, t) => {
  const o = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = o._$litPart$;
  if (r === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null;
    o._$litPart$ = r = new nt(e.insertBefore(Qe(), i), i, void 0, t ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye = globalThis;
class Ce extends Se {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = zo(t, this.renderRoot, this.renderOptions);
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
    return Te;
  }
}
var zn;
Ce._$litElement$ = !0, Ce.finalized = !0, (zn = ye.litElementHydrateSupport) == null || zn.call(ye, { LitElement: Ce });
const Nt = ye.litElementPolyfillSupport;
Nt == null || Nt({ LitElement: Ce });
(ye.litElementVersions ?? (ye.litElementVersions = [])).push("4.2.2");
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function wn(n, e) {
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
    e % 2 ? wn(Object(t), !0).forEach(function(o) {
      Ro(n, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : wn(Object(t)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return n;
}
function pt(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? pt = function(e) {
    return typeof e;
  } : pt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, pt(n);
}
function Ro(n, e, t) {
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
function Fo(n, e) {
  if (n == null) return {};
  var t = {}, o = Object.keys(n), r, i;
  for (i = 0; i < o.length; i++)
    r = o[i], !(e.indexOf(r) >= 0) && (t[r] = n[r]);
  return t;
}
function Ho(n, e) {
  if (n == null) return {};
  var t = Fo(n, e), o, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n);
    for (r = 0; r < i.length; r++)
      o = i[r], !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(n, o) && (t[o] = n[o]);
  }
  return t;
}
var Lo = "1.15.6";
function Q(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var ne = Q(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), ot = Q(/Edge/i), xn = Q(/firefox/i), Xe = Q(/safari/i) && !Q(/chrome/i) && !Q(/android/i), on = Q(/iP(ad|od|hone)/i), qn = Q(/chrome/i) && Q(/android/i), Yn = {
  capture: !1,
  passive: !1
};
function k(n, e, t) {
  n.addEventListener(e, t, !ne && Yn);
}
function $(n, e, t) {
  n.removeEventListener(e, t, !ne && Yn);
}
function yt(n, e) {
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
function Wn(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function W(n, e, t, o) {
  if (n) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? n.parentNode === t && yt(n, e) : yt(n, e)) || o && n === t)
        return n;
      if (n === t) break;
    } while (n = Wn(n));
  }
  return null;
}
var $n = /\s+/g;
function B(n, e, t) {
  if (n && e)
    if (n.classList)
      n.classList[t ? "add" : "remove"](e);
    else {
      var o = (" " + n.className + " ").replace($n, " ").replace(" " + e + " ", " ");
      n.className = (o + (t ? " " + e : "")).replace($n, " ");
    }
}
function m(n, e, t) {
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
      var o = m(n, "transform");
      o && o !== "none" && (t = o + " " + t);
    } while (!e && (n = n.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(t);
}
function Xn(n, e, t) {
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
    var i, a, s, l, d, u, c;
    if (n !== window && n.parentNode && n !== V() ? (i = n.getBoundingClientRect(), a = i.top, s = i.left, l = i.bottom, d = i.right, u = i.height, c = i.width) : (a = 0, s = 0, l = window.innerHeight, d = window.innerWidth, u = window.innerHeight, c = window.innerWidth), (e || t) && n !== window && (r = r || n.parentNode, !ne))
      do
        if (r && r.getBoundingClientRect && (m(r, "transform") !== "none" || t && m(r, "position") !== "static")) {
          var g = r.getBoundingClientRect();
          a -= g.top + parseInt(m(r, "border-top-width")), s -= g.left + parseInt(m(r, "border-left-width")), l = a + i.height, d = s + i.width;
          break;
        }
      while (r = r.parentNode);
    if (o && n !== window) {
      var v = Ae(r || n), x = v && v.a, h = v && v.d;
      v && (a /= h, s /= x, c /= x, u /= h, l = a + u, d = s + c);
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
function kn(n, e, t) {
  for (var o = le(n, !0), r = O(n)[e]; o; ) {
    var i = O(o)[t], a = void 0;
    if (a = r >= i, !a) return o;
    if (o === V()) break;
    o = le(o, !1);
  }
  return !1;
}
function Me(n, e, t, o) {
  for (var r = 0, i = 0, a = n.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== _.ghost && (o || a[i] !== _.dragged) && W(a[i], t.draggable, n, !1)) {
      if (r === e)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function rn(n, e) {
  for (var t = n.lastElementChild; t && (t === _.ghost || m(t, "display") === "none" || e && !yt(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function q(n, e) {
  var t = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== _.clone && (!e || yt(n, e)) && t++;
  return t;
}
function Sn(n) {
  var e = 0, t = 0, o = V();
  if (n)
    do {
      var r = Ae(n), i = r.a, a = r.d;
      e += n.scrollLeft * i, t += n.scrollTop * a;
    } while (n !== o && (n = n.parentNode));
  return [e, t];
}
function Uo(n, e) {
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
      var r = m(t);
      if (t.clientWidth < t.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return V();
        if (o || e) return t;
        o = !0;
      }
    }
  while (t = t.parentNode);
  return V();
}
function Bo(n, e) {
  if (n && e)
    for (var t in e)
      e.hasOwnProperty(t) && (n[t] = e[t]);
  return n;
}
function It(n, e) {
  return Math.round(n.top) === Math.round(e.top) && Math.round(n.left) === Math.round(e.left) && Math.round(n.height) === Math.round(e.height) && Math.round(n.width) === Math.round(e.width);
}
var Ge;
function Gn(n, e) {
  return function() {
    if (!Ge) {
      var t = arguments, o = this;
      t.length === 1 ? n.call(o, t[0]) : n.apply(o, t), Ge = setTimeout(function() {
        Ge = void 0;
      }, e);
    }
  };
}
function jo() {
  clearTimeout(Ge), Ge = void 0;
}
function Vn(n, e, t) {
  n.scrollLeft += e, n.scrollTop += t;
}
function Zn(n) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(n).cloneNode(!0) : t ? t(n).clone(!0)[0] : n.cloneNode(!0);
}
function Kn(n, e, t) {
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
function qo() {
  var n = [], e;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(r) {
          if (!(m(r, "display") === "none" || r === _.ghost)) {
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
      n.splice(Uo(n, {
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
        var l = 0, d = s.target, u = d.fromRect, c = O(d), g = d.prevFromRect, v = d.prevToRect, x = s.rect, h = Ae(d, !0);
        h && (c.top -= h.f, c.left -= h.e), d.toRect = c, d.thisAnimationDuration && It(g, c) && !It(u, c) && // Make sure animatingRect is on line between toRect & fromRect
        (x.top - c.top) / (x.left - c.left) === (u.top - c.top) / (u.left - c.left) && (l = Wo(x, g, v, r.options)), It(c, u) || (d.prevFromRect = u, d.prevToRect = c, l || (l = r.options.animation), r.animate(d, x, c, l)), l && (i = !0, a = Math.max(a, l), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, l), d.thisAnimationDuration = l);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, a) : typeof o == "function" && o(), n = [];
    },
    animate: function(o, r, i, a) {
      if (a) {
        m(o, "transition", ""), m(o, "transform", "");
        var s = Ae(this.el), l = s && s.a, d = s && s.d, u = (r.left - i.left) / (l || 1), c = (r.top - i.top) / (d || 1);
        o.animatingX = !!u, o.animatingY = !!c, m(o, "transform", "translate3d(" + u + "px," + c + "px,0)"), this.forRepaintDummy = Yo(o), m(o, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), m(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          m(o, "transition", ""), m(o, "transform", ""), o.animated = !1, o.animatingX = !1, o.animatingY = !1;
        }, a);
      }
    }
  };
}
function Yo(n) {
  return n.offsetWidth;
}
function Wo(n, e, t, o) {
  return Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * o.animation;
}
var $e = [], zt = {
  initializeByDefault: !0
}, rt = {
  mount: function(e) {
    for (var t in zt)
      zt.hasOwnProperty(t) && !(t in e) && (e[t] = zt[t]);
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
function Xo(n) {
  var e = n.sortable, t = n.rootEl, o = n.name, r = n.targetEl, i = n.cloneEl, a = n.toEl, s = n.fromEl, l = n.oldIndex, d = n.newIndex, u = n.oldDraggableIndex, c = n.newDraggableIndex, g = n.originalEvent, v = n.putSortable, x = n.extraEventProperties;
  if (e = e || t && t[L], !!e) {
    var h, S = e.options, A = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !ne && !ot ? h = new CustomEvent(o, {
      bubbles: !0,
      cancelable: !0
    }) : (h = document.createEvent("Event"), h.initEvent(o, !0, !0)), h.to = a || t, h.from = s || t, h.item = r || t, h.clone = i, h.oldIndex = l, h.newIndex = d, h.oldDraggableIndex = u, h.newDraggableIndex = c, h.originalEvent = g, h.pullMode = v ? v.lastPutMode : void 0;
    var M = Z(Z({}, x), rt.getEventProperties(o, e));
    for (var F in M)
      h[F] = M[F];
    t && t.dispatchEvent(h), S[A] && S[A].call(e, h);
  }
}
var Go = ["evt"], H = function(e, t) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = o.evt, i = Ho(o, Go);
  rt.pluginEvent.bind(_)(e, t, Z({
    dragEl: p,
    parentEl: C,
    ghostEl: w,
    rootEl: E,
    nextEl: _e,
    lastDownEl: ft,
    cloneEl: D,
    cloneHidden: se,
    dragStarted: Ue,
    putSortable: P,
    activeSortable: _.active,
    originalEvent: r,
    oldIndex: De,
    oldDraggableIndex: Ve,
    newIndex: j,
    newDraggableIndex: ie,
    hideGhostForTarget: to,
    unhideGhostForTarget: no,
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
  Xo(Z({
    putSortable: P,
    cloneEl: D,
    targetEl: p,
    rootEl: E,
    oldIndex: De,
    oldDraggableIndex: Ve,
    newIndex: j,
    newDraggableIndex: ie
  }, n));
}
var p, C, w, E, _e, ft, D, se, De, j, Ve, ie, st, P, Ee = !1, wt = !1, xt = [], be, Y, Rt, Ft, En, Dn, Ue, ke, Ze, Ke = !1, lt = !1, gt, N, Ht = [], Wt = !1, $t = [], At = typeof document < "u", dt = on, Cn = ot || ne ? "cssFloat" : "float", Vo = At && !qn && !on && "draggable" in document.createElement("div"), Jn = (function() {
  if (At) {
    if (ne)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
})(), Qn = function(e, t) {
  var o = m(e), r = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), i = Me(e, 0, t), a = Me(e, 1, t), s = i && m(i), l = a && m(a), d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + O(i).width, u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + O(a).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return i && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || d >= r && o[Cn] === "none" || a && o[Cn] === "none" && d + u > r) ? "vertical" : "horizontal";
}, Zo = function(e, t, o) {
  var r = o ? e.left : e.top, i = o ? e.right : e.bottom, a = o ? e.width : e.height, s = o ? t.left : t.top, l = o ? t.right : t.bottom, d = o ? t.width : t.height;
  return r === s || i === l || r + a / 2 === s + d / 2;
}, Ko = function(e, t) {
  var o;
  return xt.some(function(r) {
    var i = r[L].options.emptyInsertThreshold;
    if (!(!i || rn(r))) {
      var a = O(r), s = e >= a.left - i && e <= a.right + i, l = t >= a.top - i && t <= a.bottom + i;
      if (s && l)
        return o = r;
    }
  }), o;
}, eo = function(e) {
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
      var g = (a ? s : l).options.group.name;
      return i === !0 || typeof i == "string" && i === g || i.join && i.indexOf(g) > -1;
    };
  }
  var o = {}, r = e.group;
  (!r || pt(r) != "object") && (r = {
    name: r
  }), o.name = r.name, o.checkPull = t(r.pull, !0), o.checkPut = t(r.put), o.revertClone = r.revertClone, e.group = o;
}, to = function() {
  !Jn && w && m(w, "display", "none");
}, no = function() {
  !Jn && w && m(w, "display", "");
};
At && !qn && document.addEventListener("click", function(n) {
  if (wt)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), wt = !1, !1;
}, !0);
var me = function(e) {
  if (p) {
    e = e.touches ? e.touches[0] : e;
    var t = Ko(e.clientX, e.clientY);
    if (t) {
      var o = {};
      for (var r in e)
        e.hasOwnProperty(r) && (o[r] = e[r]);
      o.target = o.rootEl = t, o.preventDefault = void 0, o.stopPropagation = void 0, t[L]._onDragOver(o);
    }
  }
}, Jo = function(e) {
  p && p.parentNode[L]._isOutsideThisEl(e.target);
};
function _(n, e) {
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
      return Qn(n, this.options);
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
    supportPointer: _.supportPointer !== !1 && "PointerEvent" in window && (!Xe || on),
    emptyInsertThreshold: 5
  };
  rt.initializePlugins(this, n, t);
  for (var o in t)
    !(o in e) && (e[o] = t[o]);
  eo(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Vo, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? k(n, "pointerdown", this._onTapStart) : (k(n, "mousedown", this._onTapStart), k(n, "touchstart", this._onTapStart)), this.nativeDraggable && (k(n, "dragover", this), k(n, "dragenter", this)), xt.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), te(this, qo());
}
_.prototype = /** @lends Sortable.prototype */
{
  constructor: _,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (ke = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, p) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, o = this.el, r = this.options, i = r.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, d = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, u = r.filter;
      if (ar(o), !p && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Xe && l && l.tagName.toUpperCase() === "SELECT") && (l = W(l, r.draggable, o, !1), !(l && l.animated) && ft !== l)) {
        if (De = q(l), Ve = q(l, r.draggable), typeof u == "function") {
          if (u.call(this, e, l, this)) {
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
        } else if (u && (u = u.split(",").some(function(c) {
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
    if (o && !p && o.parentNode === i) {
      var d = O(o);
      if (E = i, p = o, C = p.parentNode, _e = p.nextSibling, ft = o, st = a.group, _.dragged = p, be = {
        target: p,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, En = be.clientX - d.left, Dn = be.clientY - d.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, p.style["will-change"] = "all", l = function() {
        if (H("delayEnded", r, {
          evt: e
        }), _.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !xn && r.nativeDraggable && (p.draggable = !0), r._triggerDragStart(e, t), R({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), B(p, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(u) {
        Xn(p, u.trim(), Lt);
      }), k(s, "dragover", me), k(s, "mousemove", me), k(s, "touchmove", me), a.supportPointer ? (k(s, "pointerup", r._onDrop), !this.nativeDraggable && k(s, "pointercancel", r._onDrop)) : (k(s, "mouseup", r._onDrop), k(s, "touchend", r._onDrop), k(s, "touchcancel", r._onDrop)), xn && this.nativeDraggable && (this.options.touchStartThreshold = 4, p.draggable = !0), H("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(ot || ne))) {
        if (_.eventCanceled) {
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
    p && Lt(p), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    $(e, "mouseup", this._disableDelayedDrag), $(e, "touchend", this._disableDelayedDrag), $(e, "touchcancel", this._disableDelayedDrag), $(e, "pointerup", this._disableDelayedDrag), $(e, "pointercancel", this._disableDelayedDrag), $(e, "mousemove", this._delayedDragTouchMoveHandler), $(e, "touchmove", this._delayedDragTouchMoveHandler), $(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? k(document, "pointermove", this._onTouchMove) : t ? k(document, "touchmove", this._onTouchMove) : k(document, "mousemove", this._onTouchMove) : (k(p, "dragend", this), k(E, "dragstart", this._onDragStart));
    try {
      document.selection ? bt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (Ee = !1, E && p) {
      H("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && k(document, "dragover", Jo);
      var o = this.options;
      !e && B(p, o.dragClass, !1), B(p, o.ghostClass, !0), _.active = this, e && this._appendGhost(), R({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Y) {
      this._lastX = Y.clientX, this._lastY = Y.clientY, to();
      for (var e = document.elementFromPoint(Y.clientX, Y.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(Y.clientX, Y.clientY), e !== t); )
        t = e;
      if (p.parentNode[L]._isOutsideThisEl(e), t)
        do {
          if (t[L]) {
            var o = void 0;
            if (o = t[L]._onDragOver({
              clientX: Y.clientX,
              clientY: Y.clientY,
              target: e,
              rootEl: t
            }), o && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = Wn(t));
      no();
    }
  },
  _onTouchMove: function(e) {
    if (be) {
      var t = this.options, o = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = w && Ae(w, !0), s = w && a && a.a, l = w && a && a.d, d = dt && N && Sn(N), u = (i.clientX - be.clientX + r.x) / (s || 1) + (d ? d[0] - Ht[0] : 0) / (s || 1), c = (i.clientY - be.clientY + r.y) / (l || 1) + (d ? d[1] - Ht[1] : 0) / (l || 1);
      if (!_.active && !Ee) {
        if (o && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < o)
          return;
        this._onDragStart(e, !0);
      }
      if (w) {
        a ? (a.e += u - (Rt || 0), a.f += c - (Ft || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: u,
          f: c
        };
        var g = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        m(w, "webkitTransform", g), m(w, "mozTransform", g), m(w, "msTransform", g), m(w, "transform", g), Rt = u, Ft = c, Y = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!w) {
      var e = this.options.fallbackOnBody ? document.body : E, t = O(p, !0, dt, !0, e), o = this.options;
      if (dt) {
        for (N = e; m(N, "position") === "static" && m(N, "transform") === "none" && N !== document; )
          N = N.parentNode;
        N !== document.body && N !== document.documentElement ? (N === document && (N = V()), t.top += N.scrollTop, t.left += N.scrollLeft) : N = V(), Ht = Sn(N);
      }
      w = p.cloneNode(!0), B(w, o.ghostClass, !1), B(w, o.fallbackClass, !0), B(w, o.dragClass, !0), m(w, "transition", ""), m(w, "transform", ""), m(w, "box-sizing", "border-box"), m(w, "margin", 0), m(w, "top", t.top), m(w, "left", t.left), m(w, "width", t.width), m(w, "height", t.height), m(w, "opacity", "0.8"), m(w, "position", dt ? "absolute" : "fixed"), m(w, "zIndex", "100000"), m(w, "pointerEvents", "none"), _.ghost = w, e.appendChild(w), m(w, "transform-origin", En / parseInt(w.style.width) * 100 + "% " + Dn / parseInt(w.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var o = this, r = e.dataTransfer, i = o.options;
    if (H("dragStart", this, {
      evt: e
    }), _.eventCanceled) {
      this._onDrop();
      return;
    }
    H("setupClone", this), _.eventCanceled || (D = Zn(p), D.removeAttribute("id"), D.draggable = !1, D.style["will-change"] = "", this._hideClone(), B(D, this.options.chosenClass, !1), _.clone = D), o.cloneId = bt(function() {
      H("clone", o), !_.eventCanceled && (o.options.removeCloneOnHide || E.insertBefore(D, p), o._hideClone(), R({
        sortable: o,
        name: "clone"
      }));
    }), !t && B(p, i.dragClass, !0), t ? (wt = !0, o._loopId = setInterval(o._emulateDragOver, 50)) : ($(document, "mouseup", o._onDrop), $(document, "touchend", o._onDrop), $(document, "touchcancel", o._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(o, r, p)), k(document, "drop", o), m(p, "transform", "translateZ(0)")), Ee = !0, o._dragStartId = bt(o._dragStarted.bind(o, t, e)), k(document, "selectstart", o), Ue = !0, window.getSelection().removeAllRanges(), Xe && m(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, o = e.target, r, i, a, s = this.options, l = s.group, d = _.active, u = st === l, c = s.sort, g = P || d, v, x = this, h = !1;
    if (Wt) return;
    function S(He, bo) {
      H(He, x, Z({
        evt: e,
        isOwner: u,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: c,
        fromSortable: g,
        target: o,
        completed: M,
        onMove: function(dn, mo) {
          return ct(E, t, p, r, dn, O(dn), e, mo);
        },
        changed: F
      }, bo));
    }
    function A() {
      S("dragOverAnimationCapture"), x.captureAnimationState(), x !== g && g.captureAnimationState();
    }
    function M(He) {
      return S("dragOverCompleted", {
        insertion: He
      }), He && (u ? d._hideClone() : d._showClone(x), x !== g && (B(p, P ? P.options.ghostClass : d.options.ghostClass, !1), B(p, s.ghostClass, !0)), P !== x && x !== _.active ? P = x : x === _.active && P && (P = null), g === x && (x._ignoreWhileAnimating = o), x.animateAll(function() {
        S("dragOverAnimationComplete"), x._ignoreWhileAnimating = null;
      }), x !== g && (g.animateAll(), g._ignoreWhileAnimating = null)), (o === p && !p.animated || o === t && !o.animated) && (ke = null), !s.dragoverBubble && !e.rootEl && o !== document && (p.parentNode[L]._isOutsideThisEl(e.target), !He && me(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), h = !0;
    }
    function F() {
      j = q(p), ie = q(p, s.draggable), R({
        sortable: x,
        name: "change",
        toEl: t,
        newIndex: j,
        newDraggableIndex: ie,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = W(o, s.draggable, t, !0), S("dragOver"), _.eventCanceled) return h;
    if (p.contains(e.target) || o.animated && o.animatingX && o.animatingY || x._ignoreWhileAnimating === o)
      return M(!1);
    if (wt = !1, d && !s.disabled && (u ? c || (a = C !== E) : P === this || (this.lastPutMode = st.checkPull(this, d, p, e)) && l.checkPut(this, d, p, e))) {
      if (v = this._getDirection(e, o) === "vertical", r = O(p), S("dragOverValid"), _.eventCanceled) return h;
      if (a)
        return C = E, A(), this._hideClone(), S("revert"), _.eventCanceled || (_e ? E.insertBefore(p, _e) : E.appendChild(p)), M(!0);
      var z = rn(t, s.draggable);
      if (!z || nr(e, v, this) && !z.animated) {
        if (z === p)
          return M(!1);
        if (z && t === e.target && (o = z), o && (i = O(o)), ct(E, t, p, r, o, i, e, !!o) !== !1)
          return A(), z && z.nextSibling ? t.insertBefore(p, z.nextSibling) : t.appendChild(p), C = t, F(), M(!0);
      } else if (z && tr(e, v, this)) {
        var he = Me(t, 0, s, !0);
        if (he === p)
          return M(!1);
        if (o = he, i = O(o), ct(E, t, p, r, o, i, e, !1) !== !1)
          return A(), t.insertBefore(p, he), C = t, F(), M(!0);
      } else if (o.parentNode === t) {
        i = O(o);
        var X = 0, pe, Ie = p.parentNode !== t, U = !Zo(p.animated && p.toRect || r, o.animated && o.toRect || i, v), ze = v ? "top" : "left", oe = kn(o, "top", "top") || kn(p, "top", "top"), Re = oe ? oe.scrollTop : void 0;
        ke !== o && (pe = i[ze], Ke = !1, lt = !U && s.invertSwap || Ie), X = or(e, o, i, v, U ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, lt, ke === o);
        var J;
        if (X !== 0) {
          var fe = q(p);
          do
            fe -= X, J = C.children[fe];
          while (J && (m(J, "display") === "none" || J === w));
        }
        if (X === 0 || J === o)
          return M(!1);
        ke = o, Ze = X;
        var Fe = o.nextElementSibling, re = !1;
        re = X === 1;
        var at = ct(E, t, p, r, o, i, e, re);
        if (at !== !1)
          return (at === 1 || at === -1) && (re = at === 1), Wt = !0, setTimeout(er, 30), A(), re && !Fe ? t.appendChild(p) : o.parentNode.insertBefore(p, re ? Fe : o), oe && Vn(oe, 0, Re - oe.scrollTop), C = p.parentNode, pe !== void 0 && !lt && (gt = Math.abs(pe - O(o)[ze])), F(), M(!0);
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
    if (j = q(p), ie = q(p, o.draggable), H("drop", this, {
      evt: e
    }), C = p && p.parentNode, j = q(p), ie = q(p, o.draggable), _.eventCanceled) {
      this._nulling();
      return;
    }
    Ee = !1, lt = !1, Ke = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Xt(this.cloneId), Xt(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Xe && m(document.body, "user-select", ""), m(p, "transform", ""), e && (Ue && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), w && w.parentNode && w.parentNode.removeChild(w), (E === C || P && P.lastPutMode !== "clone") && D && D.parentNode && D.parentNode.removeChild(D), p && (this.nativeDraggable && $(p, "dragend", this), Lt(p), p.style["will-change"] = "", Ue && !Ee && B(p, P ? P.options.ghostClass : this.options.ghostClass, !1), B(p, this.options.chosenClass, !1), R({
      sortable: this,
      name: "unchoose",
      toEl: C,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), E !== C ? (j >= 0 && (R({
      rootEl: C,
      name: "add",
      toEl: C,
      fromEl: E,
      originalEvent: e
    }), R({
      sortable: this,
      name: "remove",
      toEl: C,
      originalEvent: e
    }), R({
      rootEl: C,
      name: "sort",
      toEl: C,
      fromEl: E,
      originalEvent: e
    }), R({
      sortable: this,
      name: "sort",
      toEl: C,
      originalEvent: e
    })), P && P.save()) : j !== De && j >= 0 && (R({
      sortable: this,
      name: "update",
      toEl: C,
      originalEvent: e
    }), R({
      sortable: this,
      name: "sort",
      toEl: C,
      originalEvent: e
    })), _.active && ((j == null || j === -1) && (j = De, ie = Ve), R({
      sortable: this,
      name: "end",
      toEl: C,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    H("nulling", this), E = p = C = w = _e = D = ft = se = be = Y = Ue = j = ie = De = Ve = ke = Ze = P = st = _.dragged = _.ghost = _.clone = _.active = null, $t.forEach(function(e) {
      e.checked = !0;
    }), $t.length = Rt = Ft = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        p && (this._onDragOver(e), Qo(e));
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
      t = o[r], W(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || ir(t));
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
    var r = rt.modifyOption(this, e, t);
    typeof r < "u" ? o[e] = r : o[e] = t, e === "group" && eo(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    H("destroy", this);
    var e = this.el;
    e[L] = null, $(e, "mousedown", this._onTapStart), $(e, "touchstart", this._onTapStart), $(e, "pointerdown", this._onTapStart), this.nativeDraggable && ($(e, "dragover", this), $(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), xt.splice(xt.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!se) {
      if (H("hideClone", this), _.eventCanceled) return;
      m(D, "display", "none"), this.options.removeCloneOnHide && D.parentNode && D.parentNode.removeChild(D), se = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (se) {
      if (H("showClone", this), _.eventCanceled) return;
      p.parentNode == E && !this.options.group.revertClone ? E.insertBefore(D, p) : _e ? E.insertBefore(D, _e) : E.appendChild(D), this.options.group.revertClone && this.animate(p, D), m(D, "display", ""), se = !1;
    }
  }
};
function Qo(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function ct(n, e, t, o, r, i, a, s) {
  var l, d = n[L], u = d.options.onMove, c;
  return window.CustomEvent && !ne && !ot ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = n, l.dragged = t, l.draggedRect = o, l.related = r || e, l.relatedRect = i || O(e), l.willInsertAfter = s, l.originalEvent = a, n.dispatchEvent(l), u && (c = u.call(d, l, a)), c;
}
function Lt(n) {
  n.draggable = !1;
}
function er() {
  Wt = !1;
}
function tr(n, e, t) {
  var o = O(Me(t.el, 0, t.options, !0)), r = Kn(t.el, t.options, w), i = 10;
  return e ? n.clientX < r.left - i || n.clientY < o.top && n.clientX < o.right : n.clientY < r.top - i || n.clientY < o.bottom && n.clientX < o.left;
}
function nr(n, e, t) {
  var o = O(rn(t.el, t.options.draggable)), r = Kn(t.el, t.options, w), i = 10;
  return e ? n.clientX > r.right + i || n.clientY > o.bottom && n.clientX > o.left : n.clientY > r.bottom + i || n.clientX > o.right && n.clientY > o.top;
}
function or(n, e, t, o, r, i, a, s) {
  var l = o ? n.clientY : n.clientX, d = o ? t.height : t.width, u = o ? t.top : t.left, c = o ? t.bottom : t.right, g = !1;
  if (!a) {
    if (s && gt < d * r) {
      if (!Ke && (Ze === 1 ? l > u + d * i / 2 : l < c - d * i / 2) && (Ke = !0), Ke)
        g = !0;
      else if (Ze === 1 ? l < u + gt : l > c - gt)
        return -Ze;
    } else if (l > u + d * (1 - r) / 2 && l < c - d * (1 - r) / 2)
      return rr(e);
  }
  return g = g || a, g && (l < u + d * i / 2 || l > c - d * i / 2) ? l > u + d / 2 ? 1 : -1 : 0;
}
function rr(n) {
  return q(p) < q(n) ? 1 : -1;
}
function ir(n) {
  for (var e = n.tagName + n.className + n.src + n.href + n.textContent, t = e.length, o = 0; t--; )
    o += e.charCodeAt(t);
  return o.toString(36);
}
function ar(n) {
  $t.length = 0;
  for (var e = n.getElementsByTagName("input"), t = e.length; t--; ) {
    var o = e[t];
    o.checked && $t.push(o);
  }
}
function bt(n) {
  return setTimeout(n, 0);
}
function Xt(n) {
  return clearTimeout(n);
}
At && k(document, "touchmove", function(n) {
  (_.active || Ee) && n.cancelable && n.preventDefault();
});
_.utils = {
  on: k,
  off: $,
  css: m,
  find: Xn,
  is: function(e, t) {
    return !!W(e, t, e, !1);
  },
  extend: Bo,
  throttle: Gn,
  closest: W,
  toggleClass: B,
  clone: Zn,
  index: q,
  nextTick: bt,
  cancelNextTick: Xt,
  detectDirection: Qn,
  getChild: Me,
  expando: L
};
_.get = function(n) {
  return n[L];
};
_.mount = function() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (_.utils = Z(Z({}, _.utils), o.utils)), rt.mount(o);
  });
};
_.create = function(n, e) {
  return new _(n, e);
};
_.version = Lo;
var T = [], Be, Gt, Vt = !1, Ut, Bt, kt, je;
function sr() {
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
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), An(), mt(), jo();
    },
    nulling: function() {
      kt = Gt = Be = Vt = je = Ut = Bt = null, T.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, o) {
      var r = this, i = (t.touches ? t.touches[0] : t).clientX, a = (t.touches ? t.touches[0] : t).clientY, s = document.elementFromPoint(i, a);
      if (kt = t, o || this.options.forceAutoScrollFallback || ot || ne || Xe) {
        jt(t, this.options, s, o);
        var l = le(s, !0);
        Vt && (!je || i !== Ut || a !== Bt) && (je && An(), je = setInterval(function() {
          var d = le(document.elementFromPoint(i, a), !0);
          d !== l && (l = d, mt()), jt(t, r.options, d, o);
        }, 10), Ut = i, Bt = a);
      } else {
        if (!this.options.bubbleScroll || le(s, !0) === V()) {
          mt();
          return;
        }
        jt(t, this.options, le(s, !1), !1);
      }
    }
  }, te(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function mt() {
  T.forEach(function(n) {
    clearInterval(n.pid);
  }), T = [];
}
function An() {
  clearInterval(je);
}
var jt = Gn(function(n, e, t, o) {
  if (e.scroll) {
    var r = (n.touches ? n.touches[0] : n).clientX, i = (n.touches ? n.touches[0] : n).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = V(), d = !1, u;
    Gt !== t && (Gt = t, mt(), Be = e.scroll, u = e.scrollFn, Be === !0 && (Be = le(t, !0)));
    var c = 0, g = Be;
    do {
      var v = g, x = O(v), h = x.top, S = x.bottom, A = x.left, M = x.right, F = x.width, z = x.height, he = void 0, X = void 0, pe = v.scrollWidth, Ie = v.scrollHeight, U = m(v), ze = v.scrollLeft, oe = v.scrollTop;
      v === l ? (he = F < pe && (U.overflowX === "auto" || U.overflowX === "scroll" || U.overflowX === "visible"), X = z < Ie && (U.overflowY === "auto" || U.overflowY === "scroll" || U.overflowY === "visible")) : (he = F < pe && (U.overflowX === "auto" || U.overflowX === "scroll"), X = z < Ie && (U.overflowY === "auto" || U.overflowY === "scroll"));
      var Re = he && (Math.abs(M - r) <= a && ze + F < pe) - (Math.abs(A - r) <= a && !!ze), J = X && (Math.abs(S - i) <= a && oe + z < Ie) - (Math.abs(h - i) <= a && !!oe);
      if (!T[c])
        for (var fe = 0; fe <= c; fe++)
          T[fe] || (T[fe] = {});
      (T[c].vx != Re || T[c].vy != J || T[c].el !== v) && (T[c].el = v, T[c].vx = Re, T[c].vy = J, clearInterval(T[c].pid), (Re != 0 || J != 0) && (d = !0, T[c].pid = setInterval((function() {
        o && this.layer === 0 && _.active._onTouchMove(kt);
        var Fe = T[this.layer].vy ? T[this.layer].vy * s : 0, re = T[this.layer].vx ? T[this.layer].vx * s : 0;
        typeof u == "function" && u.call(_.dragged.parentNode[L], re, Fe, n, kt, T[this.layer].el) !== "continue" || Vn(T[this.layer].el, re, Fe);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && g !== l && (g = le(g, !1)));
    Vt = d;
  }
}, 30), oo = function(e) {
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
function an() {
}
an.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var r = Me(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), o && o.animateAll();
  },
  drop: oo
};
te(an, {
  pluginName: "revertOnSpill"
});
function sn() {
}
sn.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable, r = o || this.sortable;
    r.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), r.animateAll();
  },
  drop: oo
};
te(sn, {
  pluginName: "removeOnSpill"
});
_.mount(new sr());
_.mount(sn, an);
const Pe = "household_kanban";
function ro(n, e) {
  return n.connection.subscribeMessage((t) => e(t.board), { type: `${Pe}/subscribe` });
}
function ut(n, e, t) {
  return n.callService(Pe, "set_status", { uid: e, status: t });
}
function lr(n, e) {
  return n.connection.sendMessagePromise({ type: `${Pe}/history`, ...e });
}
function dr(n, e) {
  return n.callService(Pe, "create_item", { ...e });
}
function qt(n, e, t) {
  return n.callService(Pe, "update_item", { uid: e, ...t });
}
function cr(n, e) {
  return n.callService(Pe, "delete_item", { uid: e });
}
const ur = 864e5;
function I(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
const de = (n) => String(n).padStart(2, "0");
function ee(n) {
  return `${n.getFullYear()}-${de(n.getMonth() + 1)}-${de(n.getDate())}`;
}
function hr(n, e) {
  if (!n) return null;
  if (!e) return n;
  const [t, o, r] = n.split("-").map(Number), [i, a] = e.split(":").map(Number), s = -new Date(t, o - 1, r, i, a).getTimezoneOffset(), l = Math.abs(s);
  return `${n}T${de(i)}:${de(a)}:00${s < 0 ? "-" : "+"}${de(Math.floor(l / 60))}:${de(l % 60)}`;
}
function pr(n) {
  if (!n) return "";
  const { date: e, hasTime: t } = K(n);
  return t ? `${de(e.getHours())}:${de(e.getMinutes())}` : "";
}
function G(n, e) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + e);
}
function ln(n, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / ur);
}
function K(n) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(n)) {
    const [e, t, o] = n.split("-").map(Number);
    return { date: new Date(e, t - 1, o), hasTime: !1 };
  }
  return { date: new Date(n), hasTime: !0 };
}
function fr(n, e) {
  const t = I(n), o = (t.getDay() - e + 7) % 7, r = G(t, -o);
  return o === 6 ? { start: G(r, 7), end: G(r, 13) } : { start: r, end: G(r, 6) };
}
const gr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function Tn(n, e) {
  var r, i;
  if (n === "saturday") return 0;
  if (n === "sunday") return 1;
  const t = e == null ? void 0 : e.first_weekday, o = gr.indexOf(t ?? "");
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
    return !n.completed_at || !e.enabled.has("done") ? null : ln(new Date(n.completed_at), t) < e.doneDays ? "done" : null;
  if (!n.due) return "todo";
  const o = I(K(n.due).date), r = (...i) => i.find((a) => e.enabled.has(a)) ?? "todo";
  return o < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : r("today", "week") : +o == +t ? r("today", "week") : o <= e.week.end ? r("week") : r("later");
}
const br = 8;
function On(n, e, t) {
  return Math.hypot(n, e) >= br;
}
function mr(n, e, t) {
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
function _r(n) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(n, 10));
}
function vr(n) {
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
function io(n, e) {
  let t = !1, o = !1;
  const r = (s = window.customElements) => {
    if (!s.get(n)) {
      try {
        s.define(n, e);
      } catch (l) {
        o || (o = !0, console.warn("household_kanban: could not register the card", l));
        return;
      }
      t && vr(n);
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
const Mn = ["todo", "later", "week", "today", "overdue", "done"], yr = ["todo", "week", "today", "done"], ao = [1, 3, 7, 30];
function Je(n) {
  const e = n.columns ?? yr, t = e.filter((i) => !Mn.includes(i));
  if (t.length) throw new Error(`Unknown column id: ${t.join(", ")}`);
  const o = new Set(e).add("todo"), r = {
    type: n.type,
    columns: Mn.filter((i) => o.has(i)),
    done_days: ao.find((i) => i === n.done_days) ?? 7,
    group: n.group === "priority" ? "priority" : "date",
    week_end: n.week_end === "saturday" || n.week_end === "sunday" ? n.week_end : "auto"
  };
  return n.parents && (r.parents = n.parents), n.people && (r.people = n.people), r;
}
const so = {
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
  older_history: "Older in history ({n})",
  ed_columns: "Columns",
  ed_done_days: "Keep done on the board (days)",
  ed_week_end: "Week ends",
  ed_auto: "Automatic (locale)",
  ed_saturday: "Saturday",
  ed_sunday: "Sunday"
}, wr = {
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
  older_history: "Starší v historii ({n})",
  ed_columns: "Sloupce",
  ed_done_days: "Hotové nechat na boardu (dny)",
  ed_week_end: "Týden končí",
  ed_auto: "Automaticky (dle jazyka)",
  ed_saturday: "V sobotu",
  ed_sunday: "V neděli"
}, xr = { en: so, cs: wr };
function y(n, e, t = {}) {
  return (xr[(n ?? "en").split("-")[0]] ?? so)[e].replace(/\{(\w+)\}/g, (r, i) => String(t[i] ?? ""));
}
const Pn = {
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
  const o = (n ?? "en").split("-")[0], r = o in Pn ? o : "en", i = Pn[r][e];
  return (i[new Intl.PluralRules(r).select(t)] ?? i.other).replace("{n}", String(t));
}
const $r = ["todo", "later", "week", "today", "done"], Et = class Et extends Ce {
  constructor() {
    super(...arguments), this._parents = [], this._subbing = !1;
  }
  setConfig(e) {
    try {
      this._config = Je(e);
    } catch {
      this._config = Je({ type: e.type });
    }
  }
  connectedCallback() {
    super.connectedCallback(), this._sub();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._unsub) == null || e.call(this), this._unsub = void 0;
  }
  _sub() {
    this._unsub || this._subbing || !this.hass || (this._subbing = !0, ro(this.hass, (e) => {
      this._parents = e.parents;
    }).then((e) => {
      this.isConnected ? this._unsub = e : e();
    }).catch((e) => console.warn("household_kanban: editor subscribe failed", e)).finally(() => {
      this._subbing = !1;
    }));
  }
  updated() {
    this._sub();
  }
  _set(e) {
    if (!this._config) return;
    const t = { ...this._config, ...e };
    for (const o of ["parents", "people"]) t[o] === void 0 && delete t[o];
    this._config = Je(t), this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 }));
  }
  /** Checkbox list where "nothing picked" means "all" (config key left out). */
  _toggleIn(e, t, o, r) {
    var a;
    const i = new Set(((a = this._config) == null ? void 0 : a[e]) ?? t);
    r ? i.add(o) : i.delete(o), this._set({ [e]: i.size === 0 || i.size === t.length ? void 0 : t.filter((s) => i.has(s)) });
  }
  _checks(e, t) {
    var i;
    const o = t.map((a) => a.id), r = (i = this._config) == null ? void 0 : i[e];
    return t.map((a) => f`<label class="row">
      <input type="checkbox" .checked=${!r || r.includes(a.id)}
        @change=${(s) => this._toggleIn(e, o, a.id, s.target.checked)} />
      <span>${a.name}</span>
    </label>`);
  }
  render() {
    var a, s;
    const e = this._config, t = this.hass;
    if (!e || !t) return b;
    const o = ((a = t.locale) == null ? void 0 : a.language) ?? t.language ?? "en", r = (l) => y(o, l), i = Object.entries(t.states).filter(([l]) => l.startsWith("person.")).map(([l, d]) => ({ id: l, name: String(d.attributes.friendly_name ?? l) }));
    return f`
      <h3>${r("ed_columns")}</h3>
      ${$r.map((l) => {
      var d;
      return f`<label class="row">
        <input type="checkbox" role="switch" .checked=${((d = e.columns) == null ? void 0 : d.includes(l)) ?? !1} ?disabled=${l === "todo"}
          @change=${(u) => {
        const c = u.target.checked;
        this._set({ columns: (e.columns ?? []).filter((g) => g !== l).concat(c ? [l] : []) });
      }} />
        <span>${r(`col_${l}`)}</span>
      </label>`;
    })}
      ${(s = e.columns) != null && s.includes("done") ? f`
        <div class="row"><span class="grow">${r("ed_done_days")}</span>
          <div class="seg" role="radiogroup" aria-label=${r("ed_done_days")}>
            ${ao.map((l) => f`<button type="button" role="radio" aria-checked=${e.done_days === l}
              @click=${() => this._set({ done_days: l })}>${l}</button>`)}
          </div>
        </div>` : b}
      <h3>${r("group_label")}</h3>
      <select aria-label=${r("group_label")} @change=${(l) => this._set({ group: l.target.value })}>
        <option value="date" ?selected=${e.group === "date"}>${r("group_date")}</option>
        <option value="priority" ?selected=${e.group === "priority"}>${r("group_priority")}</option>
      </select>
      <h3>${r("ed_week_end")}</h3>
      <select aria-label=${r("ed_week_end")} @change=${(l) => this._set({ week_end: l.target.value })}>
        <option value="auto" ?selected=${e.week_end === "auto"}>${r("ed_auto")}</option>
        <option value="saturday" ?selected=${e.week_end === "saturday"}>${r("ed_saturday")}</option>
        <option value="sunday" ?selected=${e.week_end === "sunday"}>${r("ed_sunday")}</option>
      </select>
      <h3>${r("filter_parents")}</h3>
      ${this._checks("parents", this._parents)}
      <h3>${r("filter_people")}</h3>
      ${this._checks("people", i)}`;
  }
};
Et.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _parents: { state: !0 }
}, Et.styles = Fn`
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
let Zt = Et;
io("household-kanban-card-editor", Zt);
const kr = Fn`
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
`, Sr = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], it = (n) => `c-${Sr.includes(n) ? n : "grey"}`;
function Tt(n, e) {
  var t;
  return String(((t = n.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function Er(n) {
  return n.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function Ne(n, e = !1) {
  return f`<span class="dot ${e ? "sm" : ""} ${it((n == null ? void 0 : n.color) ?? "grey")}"><ha-icon .icon=${(n == null ? void 0 : n.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function ue(n, e, t = "", o = !1) {
  var s;
  if (!e) return f`<span class="ava none ${t}" title="-">+</span>`;
  const r = Tt(n, e), i = (s = n.states[e]) == null ? void 0 : s.attributes.entity_picture;
  if (typeof i == "string" && i) return f`<img class="ava ${t}" src=${i} alt=${o ? "" : r} title=${r} />`;
  const a = [...r].reduce((l, d) => (l * 31 + d.charCodeAt(0)) % 360, 7);
  return f`<span class="ava ${t}" title=${r} style="background:linear-gradient(135deg,hsl(${a} 55% 62%),hsl(${(a + 25) % 360} 55% 42%))">${Er(r)}</span>`;
}
const Dr = f`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function lo(n, e, t = !1) {
  const o = n.status === "completed";
  return f`<button class="check ${t ? "xs" : ""}" type="button" aria-pressed=${o} aria-label=${n.summary}
    @click=${() => e.onToggle(n)}>${Dr}</button>`;
}
function Cr(n, e) {
  const { date: t, hasTime: o } = K(n.due), r = ln(I(e.now), t);
  let i;
  return r === -1 ? i = y(e.lang, "yesterday") : r < -1 ? i = y(e.lang, "days_ago", { n: -r }) : r === 0 ? i = y(e.lang, "today") : r === 1 ? i = y(e.lang, "tomorrow") : i = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), o ? `${i} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : i;
}
function Ar(n, e) {
  const t = ln(new Date(n.completed_at), I(e.now));
  return t <= 0 ? y(e.lang, "done_today") : t === 1 ? y(e.lang, "done_yesterday") : y(e.lang, "done_days_ago", { n: t });
}
function co(n, e, t) {
  const o = n.status === "completed", r = e.parents.find((d) => d.id === n.parent), i = I(e.now), a = !o && n.due && I(K(n.due).date) < i, s = !o && n.due && +I(K(n.due).date) == +i, l = f`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
  return f`<article class="card ${o ? "done" : ""}" data-uid=${n.uid} @click=${(d) => {
    d.target.closest(".check") || e.onOpen(n, d);
  }}>
    <div class="row">
      ${Ne(r, !0)}
      <span class="parent-name">${(r == null ? void 0 : r.name) ?? n.parent}</span>
      ${ue(e.hass, n.assignee)}
    </div>
    <div class="row top">
      ${lo(n, e)}
      <button class="title" type="button">${n.summary}</button>
    </div>
    <div class="pills">
      ${!o && t ? f`<span class="pill prio-${n.priority} ${it(["", "red", "orange", "grey"][n.priority])}">${l}${y(e.lang, `prio_${n.priority}`)}</span>` : b}
      ${!o && n.moved > 0 ? f`<span class="pill c-orange">${y(e.lang, n.raised ? "moved_raised" : "moved", { n: n.moved })}</span>` : b}
      ${o && n.completed_at ? f`<span class="pill c-green">${Ar(n, e)}</span>` : b}
      ${!o && n.due ? f`<span class="pill ${a ? "c-red" : s ? "today" : "later"}">${Cr(n, e)}</span>` : b}
    </div>
  </article>`;
}
function uo(n, e, t, o, r) {
  const i = t ? n.items : n.items.slice(0, 3), a = n.items.length - i.length;
  return f`<article class="card">
    <div class="row">
      ${Ne(n.parent)}
      <span class="stack-head">${n.parent.name}</span>
      <span class="stack-sub">${n.items.length}</span>
    </div>
    <div class="stack-rows">
      ${i.map((s) => f`<div class="item">
        ${lo(s, e, !0)}
        <span class="t">${s.summary}</span>
        ${s.assignee ? ue(e.hass, s.assignee, "xs") : b}
      </div>`)}
      ${a > 0 ? f`<button class="link" type="button" @click=${() => o(n.parent.id, !0)}>${y(e.lang, "more", { n: a })}</button>` : b}
      ${t && n.items.length > 3 ? f`<button class="link muted" type="button" @click=${() => o(n.parent.id, !1)}>${y(e.lang, "collapse")}</button>` : b}
    </div>
    <button class="link" type="button" @click=${() => r(n.parent.id)}>${y(e.lang, "open_list")} ›</button>
  </article>`;
}
function ho(n) {
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
    time: pr(n.due),
    confirmDelete: !1
  };
}
function Tr(n, e = {}) {
  return { status: "needs_action", heading: "", parent: n, summary: "", description: "", priority: 2, assignee: null, date: "", time: "", confirmDelete: !1, ...e };
}
function po(n) {
  return {
    summary: n.summary.trim(),
    description: n.description,
    due: hr(n.date, n.date ? n.time : ""),
    priority: n.priority,
    assignee: n.assignee,
    parent: n.parent
  };
}
function Nn(n, e) {
  const t = po(e), o = ho(n), r = {};
  return t.summary !== n.summary && (r.summary = t.summary), t.description !== n.description && (r.description = t.description), (e.date !== o.date || e.time !== o.time) && (r.due = t.due), t.priority !== n.priority && (r.priority = t.priority), t.assignee !== n.assignee && (r.assignee = t.assignee), t.parent !== n.parent && (r.parent = t.parent), r;
}
function _t(n, e) {
  const t = I(e);
  return n === "none" ? "" : ee(n === "today" ? t : n === "tomorrow" ? G(t, 1) : G(t, (6 - t.getDay() + 7) % 7));
}
const Or = f`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
function Mr(n, e) {
  const t = (a) => y(e.lang, a), o = !n.uid, r = ["today", "tomorrow", "weekend", "none"], i = (a) => {
    a.target === a.currentTarget && e.onClose();
  };
  return f`<dialog class="kb-dialog" aria-label=${o ? t("new_task") : n.heading} @close=${e.onClose} @click=${i}>
    <div class="dlg">
      <div class="dlg-head">
        <span class="dlg-kicker">${t(o ? "new_note" : "f_title")}</span>
        ${o ? b : f`<button class="pill-btn ${n.status === "completed" ? "on" : ""}" type="button" @click=${e.onToggleDone}>
          ${t(n.status === "completed" ? "mark_open" : "mark_done")}</button>`}
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>

      ${e.error ? f`<div class="notice" role="alert">${t(e.error)}</div>` : b}
      <label class="vis-hidden" for="kb-title">${t("f_title")}</label>
      <input id="kb-title" class="dlg-title" type="text" autocomplete="off" .value=${n.summary} placeholder=${t("f_title_ph")}
        @input=${(a) => e.onChange({ summary: a.target.value })} />

      <label class="field"><span class="dlg-label">${t("f_note")}</span>
        <textarea rows="3" .value=${n.description} placeholder=${t("f_note_ph")}
          @input=${(a) => e.onChange({ description: a.target.value })}></textarea></label>

      <div class="field"><span class="dlg-label">${t("f_parent")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_parent")}>
          ${e.parents.map((a) => f`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.parent === a.id}
            @click=${() => e.onChange({ parent: a.id })}>${Ne(a, !0)}${a.name}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_prio")}</span>
        <div class="seg3" role="radiogroup" aria-label=${t("f_prio")}>
          ${[1, 2, 3].map((a) => f`<button type="button" role="radio" aria-checked=${n.priority === a}
            class="prio-${a}" @click=${() => e.onChange({ priority: a })}>${Or}${t(`prio_${a}`)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_due")}</span>
        <div class="chips">
          ${r.map((a) => f`<button class="pill-btn ${_t(a, e.now) === n.date ? "on" : ""}" type="button"
            aria-pressed=${_t(a, e.now) === n.date}
            @click=${() => e.onChange({ date: _t(a, e.now), ...a === "none" ? { time: "" } : {} })}>${t(`q_${a}`)}</button>`)}
          <label class="pill-input"><span class="vis-hidden">${t("f_date")}</span>
            <input type="date" .value=${n.date} @input=${(a) => e.onChange({ date: a.target.value })} /></label>
          <label class="pill-input"><span class="vis-hidden">${t("f_time")}</span>
            <input type="time" .value=${n.time} ?disabled=${!n.date} @input=${(a) => e.onChange({ time: a.target.value })} /></label>
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_who")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_who")}>
          <button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === null}
            @click=${() => e.onChange({ assignee: null })}>${ue(e.hass, null, "", !0)}${t("unassigned")}</button>
          ${e.people.map((a) => f`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === a}
            @click=${() => e.onChange({ assignee: a })}>${ue(e.hass, a, "", !0)}${Tt(e.hass, a)}</button>`)}
        </div></div>

      <div class="dlg-foot">
        ${o ? b : n.confirmDelete ? f`<span class="danger-text" role="alert">${t("delete_confirm")}</span>
              <button class="danger-btn" type="button" ?disabled=${e.busy} @click=${e.onDelete}>${t("delete_yes")}</button>
              <button class="pill-btn" type="button" @click=${() => e.onChange({ confirmDelete: !1 })}>${t("cancel")}</button>` : f`<button class="danger-link" type="button" @click=${() => e.onChange({ confirmDelete: !0 })}>${t("delete")}</button>`}
        <span class="grow"></span>
        ${n.confirmDelete ? b : f`
          <button class="pill-btn" type="button" @click=${e.onClose}>${t("cancel")}</button>
          <button class="primary-btn" type="button" ?disabled=${!n.summary.trim() || e.busy} @click=${e.onSave}>${t("save")}</button>`}
      </div>
    </div>
  </dialog>`;
}
function In(n) {
  if (!n.due) return 1 / 0;
  const { date: e, hasTime: t } = K(n.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function St(n, e) {
  const t = In(n), o = In(e);
  return t !== o ? t < o ? -1 : 1 : n.priority - e.priority || +new Date(n.created_at) - +new Date(e.created_at);
}
function fo(n, e, t) {
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
const Pr = ["todo", "later", "week", "overdue", "today", "done"], go = (n, e) => +new Date(e.completed_at ?? 0) - +new Date(n.completed_at ?? 0);
function Nr(n, e, t) {
  const { ctx: o } = e, r = n.filter((l) => l.status === "needs_action"), i = n.filter((l) => we(l, o) === "done").sort(go), a = n.filter((l) => l.status === "completed").length - i.length, s = e.group === "date" ? Pr.filter((l) => l !== "done" && (l === "todo" || o.enabled.has(l))).map((l) => ({
    id: l,
    label: y(t, `col_${l}`),
    led: l === "overdue" ? "rgb(var(--c-red))" : l === "week" || l === "today" ? "var(--kb-accent)" : void 0,
    items: r.filter((d) => we(d, o) === l).sort(St)
  })) : [1, 2, 3].map((l) => ({
    id: `p${l}`,
    label: y(t, `prio_${l}`),
    led: l === 1 ? "rgb(var(--c-red))" : l === 2 ? "rgb(var(--c-orange))" : void 0,
    items: r.filter((d) => d.priority === l).sort(St)
  }));
  return o.enabled.has("done") && s.push({ id: "done", label: y(t, "col_done"), led: "rgb(var(--c-green))", items: i, done: !0 }), { cols: s, olderDone: a };
}
function Ir(n, e, t) {
  const { cols: o, olderDone: r } = Nr(n, e, t.lang);
  return f`<div class="board">${o.map((i) => {
    const a = i.done ? i.items : fo(i.items, e.board.parents, e.parent);
    return f`<section class="col" data-col=${i.id}>
      <div class="col-head">
        <span class="led" style=${i.led ? `background:${i.led}` : ""}></span>
        <span class="label">${i.label}</span><span class="count">${i.items.length}</span>
        ${i.done || i.id === "overdue" ? b : f`<button class="add" type="button" aria-label=${`${y(t.lang, "add_here")}: ${i.label}`} @click=${() => e.onAdd(i.id)}>+</button>`}
      </div>
      ${a.map((s) => "items" in s ? uo(s, t, e.expanded.has(s.parent.id), e.onExpand, e.onFocus) : co(s, t, e.group === "date"))}
      ${i.done ? f`<button class="note note-btn" type="button" @click=${e.onHistory}>${y(t.lang, "done_note", { days: e.ctx.doneDays, older: r })}</button>` : b}
      ${!i.done && a.length === 0 ? f`<div class="empty">${y(t.lang, "nothing")}</div>` : b}
    </section>`;
  })}</div>`;
}
const zr = ["today", "week", "todo", "done"];
function Rr(n, e) {
  return f`<dialog class="sheet kb-sheet" aria-label=${n.title}
    @cancel=${(t) => {
    t.preventDefault(), n.onCancel();
  }}
    @click=${(t) => {
    t.target === t.currentTarget && n.onClose();
  }}>
    <div class="grabber"><span></span></div>
    <div class="sheet-head">
      <span class="dot ${it(n.color)}"><ha-icon .icon=${n.icon}></ha-icon></span>
      <h2>${n.title}</h2>
      <span class="count">${n.count}</span>
      <button class="round-btn sclose" type="button" aria-label=${y(e.lang, "close")} @click=${n.onClose}>✕</button>
    </div>
    <div class="sheet-list" @pointerdown=${n.press.down} @pointermove=${n.press.move} @pointerup=${n.press.end}
      @pointercancel=${n.press.end} @pointerleave=${n.press.end} @contextmenu=${(t) => t.preventDefault()}>
      ${n.entries.map((t) => "items" in t ? uo(t, e, n.expanded.has(t.parent.id), n.onExpand, n.onFocus) : co(t, e, !0))}
      ${n.entries.length === 0 ? f`<div class="empty">${y(e.lang, "nothing")}</div>` : b}
      ${n.isDone ? f`<button class="pill-btn hist-link" type="button" @click=${n.onHistory}>${y(e.lang, "older_history", { n: n.olderDone })}</button>` : b}
    </div>
    ${n.menu ? Fr(n.menu, n, e) : b}
  </dialog>`;
}
function Fr(n, e, t) {
  return f`<div class="menu-wrap" @click=${(o) => {
    o.target === o.currentTarget && e.onMenuClose();
  }}>
    <div class="menu" role="group" aria-label=${y(t.lang, "move_to")}>
      <div class="menu-title">${y(t.lang, "move_to")}<small>${n.summary}</small></div>
      ${zr.map((o) => f`<button class="menu-btn" type="button" data-move=${o} @click=${() => e.onMove(n, o)}>${y(t.lang, `col_${o}`)}</button>`)}
      <button class="menu-btn muted" type="button" @click=${e.onMenuClose}>${y(t.lang, "cancel")}</button>
    </div>
  </div>`;
}
function Hr(n, e, t = []) {
  const o = { todo: 0, later: 0, week: 0, today: 0, overdue: 0, done: 0 }, r = I(e.now), i = [];
  let a = 0;
  for (const d of n) {
    const u = we(d, e);
    u && o[u]++, u === "today" && i.push(d), u === "today" && d.due && I(K(d.due).date) < r && a++;
  }
  const s = new Set(t.filter((d) => d.collapse).map((d) => d.id)), l = i.filter((d) => !s.has(d.parent)).sort(St).slice(0, 3);
  return { counts: o, overdue: a, preview: l };
}
const Kt = {
  today: { icon: "mdi:calendar-today", color: "blue" },
  overdue: { icon: "mdi:alert-circle-outline", color: "red" },
  week: { icon: "mdi:calendar-week", color: "indigo" },
  todo: { icon: "mdi:format-list-checks", color: "teal" },
  later: { icon: "mdi:calendar-clock", color: "purple" },
  done: { icon: "mdi:check-circle-outline", color: "green" }
}, Lr = ["today", "overdue", "week", "todo", "later", "done"];
function Ur(n, e) {
  const t = Hr(n.items, n.ctx, e.parents), o = n.items.filter((r) => r.status === "needs_action");
  return f`<div class="tiles-view">
    <div class="people ${n.who ? "has-filter" : ""}" role="group" aria-label=${y(e.lang, "filter_people")}>
      ${n.people.map((r) => {
    const i = n.who === r;
    return f`<button class="person" type="button" aria-pressed=${i} @click=${() => n.onWho(i ? null : r)}>
          ${ue(e.hass, r, "lg", !0)}<span>${Tt(e.hass, r)}</span></button>`;
  })}
    </div>
    <div class="tiles">
      ${Lr.filter((r) => n.ctx.enabled.has(r)).map((r) => {
    const i = r === "today" || r === "done", a = r === "today" ? t.overdue : 0;
    return f`<button class="tile ${i ? "wide" : ""} ${it(Kt[r].color)}" type="button" data-tile=${r} @click=${() => n.onTile(r)}>
          <span class="row">
            <span class="dot"><ha-icon .icon=${Kt[r].icon}></ha-icon></span>
            <span class="tile-label">${y(e.lang, `col_${r}`)}</span>
            ${a > 0 ? f`<span class="pill c-red">${qe(e.lang, "sum_overdue", a)}</span>` : b}
          </span>
          <span class="tile-count">${t.counts[r]}</span>
          ${r === "today" ? f`<span class="preview">${t.preview.map((s) => f`<span class="row">
            <span class="mark"></span><span class="t">${s.summary}</span>${s.assignee ? ue(e.hass, s.assignee, "xs", !0) : b}</span>`)}</span>` : b}
        </button>`;
  })}
    </div>
    <span class="dlg-label tiles-h">${y(e.lang, "lists")}</span>
    <div class="plist">
      ${e.parents.map((r) => f`<button class="prow" type="button" data-parent=${r.id} @click=${() => n.onParent(r.id)}>
        ${Ne(r)}<span class="pname">${r.name}</span>
        <span class="pcount">${o.filter((i) => i.parent === r.id).length}</span><span aria-hidden="true">›</span></button>`)}
    </div>
  </div>`;
}
function Br(n, e, t, o, r) {
  const i = o.filter((s) => s.status === "needs_action" && (!e.who || s.assignee === e.who)), a = (s) => {
    const l = e.parent === ((s == null ? void 0 : s.id) ?? null), d = i.filter((u) => !s || u.parent === s.id).length;
    return f`<button class="chip ${s ? it(s.color) : ""}" type="button" aria-pressed=${l}
      @click=${() => r({ parent: l ? null : (s == null ? void 0 : s.id) ?? null })}>
      ${Ne(s ?? void 0)}<span>${(s == null ? void 0 : s.name) ?? y(n.lang, "all_parents")}</span><b>${d}</b></button>`;
  };
  return f`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${y(n.lang, "filter_people")}>
      ${t.map((s) => {
    const l = e.who === s;
    return f`<button class="person" type="button" aria-pressed=${l} @click=${() => r({ who: l ? null : s })}>
          ${ue(n.hass, s, "lg", !0)}<span>${Tt(n.hass, s)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${y(n.lang, "filter_parents")}>
      ${a(null)}${n.parents.map((s) => a(s))}
    </div>
    <div class="seg" role="group" aria-label=${y(n.lang, "group_label")}>
      ${["date", "priority"].map((s) => f`<button type="button" aria-pressed=${e.group === s}
        @click=${() => r({ group: s })}>${y(n.lang, `group_${s}`)}</button>`)}
    </div>
  </div>`;
}
function jr(n, e, t, o) {
  const r = I(e), i = G(r, -((r.getDay() - o + 7) % 7)), a = G(i, -7), s = new Intl.DateTimeFormat(t, { month: "long", year: "numeric" }), l = /* @__PURE__ */ new Map();
  for (const d of n) {
    const u = new Date(d.completed_at ?? 0);
    let c, g;
    u >= i ? (c = "this", g = y(t, "col_week")) : u >= a ? (c = "last", g = y(t, "hist_last_week")) : (c = `${u.getFullYear()}-${u.getMonth()}`, g = s.format(u), t.startsWith("cs") && (g = g.toLocaleLowerCase("cs")));
    const v = l.get(c) ?? { label: g, items: [] };
    v.items.push(d), l.set(c, v);
  }
  return [...l.values()];
}
const qr = f`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path></svg>`;
function Yr(n, e) {
  const t = (s) => y(e.lang, s), o = new Intl.DateTimeFormat(e.lang, { day: "numeric", month: "short" }), r = (s) => {
    s.target === s.currentTarget && e.onClose();
  }, i = (s) => e.parents.find((l) => l.id === s), a = jr(n.items, e.now, e.lang, e.firstDay);
  return f`<dialog class="kb-dialog kb-history" aria-labelledby="kb-hist-title" @close=${e.onClose} @click=${r}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><h2 id="kb-hist-title" class="hist-title">${t("history")}</h2>
          <span class="hist-sub">${y(e.lang, "hist_total", { n: n.total })}</span></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      ${n.error ? f`<div class="notice" role="alert">${t(n.error)}</div>` : b}
      <label class="hist-search">
        <span class="vis-hidden">${t("hist_search")}</span>
        <input type="search" autocomplete="off" .value=${n.search} placeholder=${t("hist_search_ph")}
          @input=${(s) => e.onSearch(s.target.value)} />
      </label>
      <div class="chips" role="group" aria-label=${t("filter_parents")}>
        <button class="pill-btn" type="button" aria-pressed=${n.parent === null} @click=${() => e.onParent(null)}>${t("all_parents")}</button>
        ${e.parents.map((s) => f`<button class="pill-btn hist-chip" type="button" aria-pressed=${n.parent === s.id}
          @click=${() => e.onParent(s.id)}>${Ne(s, !0)}${s.name}</button>`)}
      </div>
      <div class="hist-list">
        ${a.map((s) => f`<section class="hist-group">
          <h3 class="dlg-label">${s.label}</h3>
          <ul class="hist-rows">${s.items.map((l) => {
    var d;
    return f`<li class="hist-row" data-uid=${l.uid}>
            <span class="hist-check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>
            <div class="hist-text"><span class="hist-name">${l.summary}</span>
              <span class="hist-meta">${((d = i(l.parent)) == null ? void 0 : d.name) ?? l.parent} · ${l.completed_at ? o.format(new Date(l.completed_at)) : ""}</span></div>
            ${l.assignee ? ue(e.hass, l.assignee) : b}
            <button class="hist-reopen" type="button" title=${t("reopen")} aria-label=${`${t("reopen")}: ${l.summary}`}
              @click=${() => e.onReopen(l)}>${qr}</button>
          </li>`;
  })}</ul>
        </section>`)}
        ${n.items.length === 0 && !n.loading && !n.error ? f`<div class="empty hist-empty">${t("hist_empty")}</div>` : b}
        ${n.items.length < n.total ? f`<button class="pill-btn hist-more" type="button" ?disabled=${n.loading} @click=${e.onMore}>${t("hist_more")}</button>` : b}
      </div>
    </div>
  </dialog>`;
}
const Wr = 50, Xr = 600, Gr = 500, Dt = class Dt extends Ce {
  constructor() {
    super(), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set(), this._loadFailed = !1, this._busy = !1, this._narrow = !1, this._sheetShown = !1, this._menuShown = !1, this._lpFired = !1, this._hq = 0, this._hMore = null, this._sortables = /* @__PURE__ */ new Map(), this._seq = 0, this._attempts = 0, this.addEventListener("pointerdown", (e) => {
      this._down = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    }, !0);
  }
  static getConfigElement() {
    return document.createElement("household-kanban-card-editor");
  }
  static getStubConfig() {
    return Je({ type: "custom:household-kanban-card" });
  }
  setConfig(e) {
    const t = Je(e);
    this._config = t, this._filter = { ...this._filter, group: t.group ?? "date" };
  }
  getCardSize() {
    return 8;
  }
  connectedCallback() {
    super.connectedCallback(), this._subscribe(), typeof ResizeObserver < "u" && (this._ro = new ResizeObserver((e) => {
      var o;
      const t = ((o = e[e.length - 1]) == null ? void 0 : o.contentRect.width) ?? 0;
      t > 0 && (this._narrow = t < Xr), this._narrow || this._closeSheet();
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
    const e = ro(this.hass, (t) => {
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
      }, _r(this._attempts++)));
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
    this._dialogWrite("err_save", () => o ? qt(e, o.uid, Nn(o, t)) : dr(e, po(t)));
  }
  /** Tap on a card; a click that ends a drag is not a tap. */
  _open(e, t) {
    const o = t, r = this._down;
    if (this._down = void 0, this._lpFired) {
      this._lpFired = !1;
      return;
    }
    o.detail !== 0 && r && On(o.clientX - r.x, o.clientY - r.y, t.timeStamp - r.t) || this._openDialog(ho(e), () => {
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
      const i = await lr(t, {
        search: o.search.trim() || void 0,
        parent: o.parent ?? void 0,
        offset: e ? 0 : o.items.length,
        limit: Wr
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
    t && ut(t, e, "needs_action").then(() => {
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
      today: _t("today", o.now),
      week: ee(o.week.end),
      later: ee(G(o.week.end, 1))
    };
    this._openDialog(Tr(a, s ? { priority: Number(s[1]) } : { date: l[e] ?? "" }), i);
  }
  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  _syncSortables() {
    var o;
    const e = new Set(this.renderRoot.querySelectorAll(".col"));
    for (const [r, i] of this._sortables) e.has(r) || (i.destroy(), this._sortables.delete(r));
    const t = ((o = window.matchMedia) == null ? void 0 : o.call(window, "(pointer: coarse)").matches) ?? !1;
    for (const r of e)
      this._sortables.has(r) || this._sortables.set(r, _.create(r, {
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
    const o = this.hass, r = this._ctx, i = (c = this._board) == null ? void 0 : c.items.find((g) => g.uid === e);
    if (!o || !r || !i || !t) return;
    const a = /^p([123])$/.exec(t), s = mr(i, a ? Number(a[1]) : t, r);
    if (!s) return;
    const { status: l, ...d } = s;
    (async () => {
      Object.keys(d).length && await qt(o, i.uid, d), l && await ut(o, i.uid, l);
    })().catch((g) => {
      console.warn("household_kanban: drop failed", g), this._fail("err_update");
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
    }, Gr) });
  }
  _lpMove(e) {
    const t = this._lp;
    t && On(e.clientX - t.x, e.clientY - t.y) && this._lpCancel();
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
      (s = ((a = [...this.renderRoot.querySelectorAll(".sheet [data-uid]")].find((u) => u.dataset.uid === l)) == null ? void 0 : a.querySelector(".title")) ?? this.renderRoot.querySelector(".sheet .sclose")) == null || s.focus();
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
    if (!e || !t) return b;
    const r = ((x = e.locale) == null ? void 0 : x.language) ?? e.language ?? "en";
    if (!o) return f`<ha-card><div class="loading">${y(r, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const i = /* @__PURE__ */ new Date(), a = o.parents.filter((h) => !t.parents || t.parents.includes(h.id)), s = new Set(t.columns ?? []);
    s.add("todo"), o.end_of_day_mode === "overdue" && s.add("overdue");
    const l = {
      now: i,
      enabled: s,
      mode: o.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: fr(i, Tn(t.week_end, e.locale))
    };
    this._ctx = l;
    const d = {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      onOpen: (h, S) => this._open(h, S),
      onToggle: (h) => {
        ut(e, h.uid, h.status === "completed" ? "needs_action" : "completed").catch((S) => {
          console.warn("household_kanban: set_status failed", S), this._fail("err_update");
        });
      }
    }, u = t.people ?? Object.keys(e.states).filter((h) => h.startsWith("person.")), c = this._filter, g = o.items.filter((h) => a.some((S) => S.id === h.parent)), v = g.filter((h) => (!c.who || h.assignee === c.who) && (!c.parent || h.parent === c.parent));
    return f`<ha-card>
      ${this._notice ? f`<div class="notice" role="alert">${y(r, this._notice)}</div>` : b}
      <header>
        <div class="titles"><h1>${y(r, "title")}</h1><div class="summary">${this._summary(g, l, r)}</div></div>
        <button class="pill-btn hist-btn" type="button" @click=${() => this._openHistory("header .hist-btn")}>${y(r, "history")}</button>
        <button class="new" type="button" @click=${() => this._add("todo", a, l, "header .new")}>+ ${y(r, "new_note")}</button>
      </header>
      ${this._narrow ? this._renderNarrow(d, l, g, u, a) : f`
      ${Br(d, c, u, g, (h) => {
      this._filter = { ...c, ...h };
    })}
      ${Ir(v, {
      board: { ...o, parents: a },
      ctx: l,
      group: c.group,
      who: c.who,
      parent: c.parent,
      expanded: this._expanded,
      onExpand: (h, S) => {
        const A = new Set(this._expanded);
        S ? A.add(h) : A.delete(h), this._expanded = A;
      },
      onFocus: (h) => {
        this._filter = { ...c, parent: h };
      },
      onAdd: (h) => this._add(h, a, l),
      onHistory: () => this._openHistory('.col[data-col="done"] .note-btn')
    }, d)}`}
      ${this._hist ? Yr(this._hist, {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      firstDay: Tn(t.week_end, e.locale),
      onSearch: (h) => this._histFilter({ search: h }, 300),
      onParent: (h) => this._histFilter({ parent: h }, 0),
      onReopen: (h) => this._reopen(h.uid),
      onMore: () => void this._loadHistory(!1),
      onClose: () => this._closeHistory()
    }) : b}
      ${this._draft ? Mr(this._draft, {
      hass: e,
      lang: r,
      now: i,
      parents: a,
      people: u,
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
        var F;
        const h = this._draft, S = h == null ? void 0 : h.uid;
        if (!h || !S) return;
        const A = (F = this._board) == null ? void 0 : F.items.find((z) => z.uid === S);
        if (!A) {
          this._dlgError = "err_update";
          return;
        }
        const M = Nn(A, h);
        this._dialogWrite("err_update", async () => {
          Object.keys(M).length && await qt(e, S, M), await ut(e, S, h.status === "completed" ? "needs_action" : "completed");
        });
      },
      onDelete: () => {
        const h = this._draft;
        h != null && h.uid && this._dialogWrite("err_delete", () => cr(e, h.uid));
      }
    }) : b}
    </ha-card>`;
  }
  /** Tiles + parents list, and the bottom sheet when one is open. */
  _renderNarrow(e, t, o, r, i) {
    const a = this._filter.who, s = o.filter((c) => !a || c.assignee === a);
    let l = this._sheet, d = b;
    const u = (l == null ? void 0 : l.kind) === "parent" ? i.find((c) => c.id === (l == null ? void 0 : l.id)) : void 0;
    if ((l == null ? void 0 : l.kind) === "parent" && !u && (l = void 0, queueMicrotask(() => this._closeSheet())), l) {
      const c = l.id, g = (h) => h.filter((S) => S.status === "needs_action").sort(St), v = l.kind === "parent" ? g(s.filter((h) => h.parent === l.id)) : c === "done" ? s.filter((h) => we(h, t) === "done").sort(go) : g(s.filter((h) => we(h, t) === c)), x = u ? { icon: u.icon, color: u.color, title: u.name } : { ...Kt[c], title: y(e.lang, `col_${c}`) };
      d = Rr({
        ...x,
        count: v.length,
        isDone: c === "done" && !u,
        entries: l.kind === "col" && c !== "done" ? fo(v, i, null) : v,
        olderDone: s.filter((h) => h.status === "completed").length - v.length,
        menu: this._menu ? s.find((h) => h.uid === this._menu) : void 0,
        expanded: this._expanded,
        onExpand: (h, S) => {
          const A = new Set(this._expanded);
          S ? A.add(h) : A.delete(h), this._expanded = A;
        },
        onFocus: (h) => this._openSheet("parent", h, this._sheetReturn ?? ""),
        onClose: () => this._closeSheet(),
        onCancel: () => this._sheetCancel(),
        onHistory: () => this._openHistory(".sheet .hist-link"),
        onMove: (h, S) => {
          this._closeMenu(), this._drop(h.uid, S);
        },
        onMenuClose: () => this._closeMenu(),
        press: { down: (h) => this._lpStart(h), move: (h) => this._lpMove(h), end: () => this._lpCancel() }
      }, e);
    }
    return f`${Ur({
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
Dt.properties = {
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
}, Dt.styles = kr;
let Jt = Dt;
const Qt = "household-kanban-card";
io(Qt, Jt);
(window.customCards ?? (window.customCards = [])).some((n) => n.type === Qt) || window.customCards.push({ type: Qt, name: "Household Kanban", description: "Kanban board for household tasks" });
