/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = globalThis, ro = ut.ShadowRoot && (ut.ShadyCSS === void 0 || ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, io = Symbol(), go = /* @__PURE__ */ new WeakMap();
let Uo = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== io) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ro && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = go.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && go.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const En = (o) => new Uo(typeof o == "string" ? o : o + "", void 0, io), Bo = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((n, r, i) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + o[i + 1], o[0]);
  return new Uo(t, o, io);
}, Dn = (o, e) => {
  if (ro) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), r = ut.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = t.cssText, o.appendChild(n);
  }
}, bo = ro ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return En(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Cn, defineProperty: An, getOwnPropertyDescriptor: Tn, getOwnPropertyNames: On, getOwnPropertySymbols: Mn, getPrototypeOf: Pn } = Object, pe = globalThis, mo = pe.trustedTypes, zn = mo ? mo.emptyScript : "", Mt = pe.reactiveElementPolyfillSupport, We = (o, e) => o, Xt = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? zn : null;
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
} }, qo = (o, e) => !Cn(o, e), _o = { attribute: !0, type: String, converter: Xt, reflect: !1, useDefault: !1, hasChanged: qo };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), pe.litPropertyMetadata ?? (pe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ee = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = _o) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
      r !== void 0 && An(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: r, set: i } = Tn(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: r, set(s) {
      const a = r == null ? void 0 : r.call(this);
      i == null || i.call(this, s), this.requestUpdate(e, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? _o;
  }
  static _$Ei() {
    if (this.hasOwnProperty(We("elementProperties"))) return;
    const e = Pn(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(We("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(We("properties"))) {
      const t = this.properties, n = [...On(t), ...Mn(t)];
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
      for (const r of n) t.unshift(bo(r));
    } else e !== void 0 && t.push(bo(e));
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
    return Dn(e, this.constructor.elementStyles), e;
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
      const s = (((i = n.converter) == null ? void 0 : i.toAttribute) !== void 0 ? n.converter : Xt).toAttribute(t, n.type);
      this._$Em = e, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, s;
    const n = this.constructor, r = n._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = n.getPropertyOptions(r), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((i = a.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? a.converter : Xt;
      this._$Em = r;
      const d = l.fromAttribute(t, a.type);
      this[r] = d ?? ((s = this._$Ej) == null ? void 0 : s.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, n, r = !1, i) {
    var s;
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (i = this[e]), n ?? (n = a.getPropertyOptions(e)), !((n.hasChanged ?? qo)(i, t) || n.useDefault && n.reflect && i === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(a._$Eu(e, n)))) return;
      this.C(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: n, reflect: r, wrapped: i }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), i !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [i, s] of this._$Ep) this[i] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, s] of r) {
        const { wrapped: a } = s, l = this[i];
        a !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, s, l);
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
Ee.elementStyles = [], Ee.shadowRootOptions = { mode: "open" }, Ee[We("elementProperties")] = /* @__PURE__ */ new Map(), Ee[We("finalized")] = /* @__PURE__ */ new Map(), Mt == null || Mt({ ReactiveElement: Ee }), (pe.reactiveElementVersions ?? (pe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xe = globalThis, vo = (o) => o, yt = Xe.trustedTypes, yo = yt ? yt.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Yo = "$lit$", le = `lit$${Math.random().toFixed(9).slice(2)}$`, Wo = "?" + le, Nn = `<${Wo}>`, we = document, Qe = () => we.createComment(""), et = (o) => o === null || typeof o != "object" && typeof o != "function", so = Array.isArray, In = (o) => so(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", Pt = `[ 	
\f\r]`, Ue = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xo = /-->/g, wo = />/g, ge = RegExp(`>|${Pt}(?:([^\\s"'>=/]+)(${Pt}*=${Pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ko = /'/g, $o = /"/g, Xo = /^(?:script|style|textarea|title)$/i, Rn = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), p = Rn(1), Pe = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), So = /* @__PURE__ */ new WeakMap(), ve = we.createTreeWalker(we, 129);
function Go(o, e) {
  if (!so(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return yo !== void 0 ? yo.createHTML(e) : e;
}
const Hn = (o, e) => {
  const t = o.length - 1, n = [];
  let r, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = Ue;
  for (let a = 0; a < t; a++) {
    const l = o[a];
    let d, h, c = -1, g = 0;
    for (; g < l.length && (s.lastIndex = g, h = s.exec(l), h !== null); ) g = s.lastIndex, s === Ue ? h[1] === "!--" ? s = xo : h[1] !== void 0 ? s = wo : h[2] !== void 0 ? (Xo.test(h[2]) && (r = RegExp("</" + h[2], "g")), s = ge) : h[3] !== void 0 && (s = ge) : s === ge ? h[0] === ">" ? (s = r ?? Ue, c = -1) : h[1] === void 0 ? c = -2 : (c = s.lastIndex - h[2].length, d = h[1], s = h[3] === void 0 ? ge : h[3] === '"' ? $o : ko) : s === $o || s === ko ? s = ge : s === xo || s === wo ? s = Ue : (s = ge, r = void 0);
    const x = s === ge && o[a + 1].startsWith("/>") ? " " : "";
    i += s === Ue ? l + Nn : c >= 0 ? (n.push(d), l.slice(0, c) + Yo + l.slice(c) + le + x) : l + le + (c === -2 ? a : x);
  }
  return [Go(o, i + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class tt {
  constructor({ strings: e, _$litType$: t }, n) {
    let r;
    this.parts = [];
    let i = 0, s = 0;
    const a = e.length - 1, l = this.parts, [d, h] = Hn(e, t);
    if (this.el = tt.createElement(d, n), ve.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = ve.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(Yo)) {
          const g = h[s++], x = r.getAttribute(c).split(le), k = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: i, name: k[2], strings: x, ctor: k[1] === "." ? Ln : k[1] === "?" ? jn : k[1] === "@" ? Un : Tt }), r.removeAttribute(c);
        } else c.startsWith(le) && (l.push({ type: 6, index: i }), r.removeAttribute(c));
        if (Xo.test(r.tagName)) {
          const c = r.textContent.split(le), g = c.length - 1;
          if (g > 0) {
            r.textContent = yt ? yt.emptyScript : "";
            for (let x = 0; x < g; x++) r.append(c[x], Qe()), ve.nextNode(), l.push({ type: 2, index: ++i });
            r.append(c[g], Qe());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Wo) l.push({ type: 2, index: i });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(le, c + 1)) !== -1; ) l.push({ type: 7, index: i }), c += le.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const n = we.createElement("template");
    return n.innerHTML = e, n;
  }
}
function ze(o, e, t = o, n) {
  var s, a;
  if (e === Pe) return e;
  let r = n !== void 0 ? (s = t._$Co) == null ? void 0 : s[n] : t._$Cl;
  const i = et(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== i && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), i === void 0 ? r = void 0 : (r = new i(o), r._$AT(o, t, n)), n !== void 0 ? (t._$Co ?? (t._$Co = []))[n] = r : t._$Cl = r), r !== void 0 && (e = ze(o, r._$AS(o, e.values), r, n)), e;
}
class Fn {
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
    const { el: { content: t }, parts: n } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? we).importNode(t, !0);
    ve.currentNode = r;
    let i = ve.nextNode(), s = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let d;
        l.type === 2 ? d = new ot(i, i.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (d = new Bn(i, this, e)), this._$AV.push(d), l = n[++a];
      }
      s !== (l == null ? void 0 : l.index) && (i = ve.nextNode(), s++);
    }
    return ve.currentNode = we, r;
  }
  p(e) {
    let t = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++;
  }
}
class ot {
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
    e = ze(this, e, t), et(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== Pe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : In(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && et(this._$AH) ? this._$AA.nextSibling.data = e : this.T(we.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = tt.createElement(Go(n.h, n.h[0]), this.options)), n);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === r) this._$AH.p(t);
    else {
      const s = new Fn(r, this), a = s.u(this.options);
      s.p(t), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = So.get(e.strings);
    return t === void 0 && So.set(e.strings, t = new tt(e)), t;
  }
  k(e) {
    so(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, r = 0;
    for (const i of e) r === t.length ? t.push(n = new ot(this.O(Qe()), this.O(Qe()), this, this.options)) : n = t[r], n._$AI(i), r++;
    r < t.length && (this._$AR(n && n._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = vo(e).nextSibling;
      vo(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Tt {
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
    let s = !1;
    if (i === void 0) e = ze(this, e, t, 0), s = !et(e) || e !== this._$AH && e !== Pe, s && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = i[0], l = 0; l < i.length - 1; l++) d = ze(this, a[n + l], t, l), d === Pe && (d = this._$AH[l]), s || (s = !et(d) || d !== this._$AH[l]), d === b ? e = b : e !== b && (e += (d ?? "") + i[l + 1]), this._$AH[l] = d;
    }
    s && !r && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ln extends Tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class jn extends Tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class Un extends Tt {
  constructor(e, t, n, r, i) {
    super(e, t, n, r, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ze(this, e, t, 0) ?? b) === Pe) return;
    const n = this._$AH, r = e === b && n !== b || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== b && (n === b || r);
    r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Bn {
  constructor(e, t, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ze(this, e);
  }
}
const zt = Xe.litHtmlPolyfillSupport;
zt == null || zt(tt, ot), (Xe.litHtmlVersions ?? (Xe.litHtmlVersions = [])).push("3.3.3");
const qn = (o, e, t) => {
  const n = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = n._$litPart$;
  if (r === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null;
    n._$litPart$ = r = new ot(e.insertBefore(Qe(), i), i, void 0, t ?? {});
  }
  return r._$AI(o), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye = globalThis;
class Te extends Ee {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qn(t, this.renderRoot, this.renderOptions);
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
    return Pe;
  }
}
var jo;
Te._$litElement$ = !0, Te.finalized = !0, (jo = ye.litElementHydrateSupport) == null || jo.call(ye, { LitElement: Te });
const Nt = ye.litElementPolyfillSupport;
Nt == null || Nt({ LitElement: Te });
(ye.litElementVersions ?? (ye.litElementVersions = [])).push("4.2.2");
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Eo(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Z(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Eo(Object(t), !0).forEach(function(n) {
      Yn(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : Eo(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function ft(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ft = function(e) {
    return typeof e;
  } : ft = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ft(o);
}
function Yn(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function oe() {
  return oe = Object.assign || function(o) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (o[n] = t[n]);
    }
    return o;
  }, oe.apply(this, arguments);
}
function Wn(o, e) {
  if (o == null) return {};
  var t = {}, n = Object.keys(o), r, i;
  for (i = 0; i < n.length; i++)
    r = n[i], !(e.indexOf(r) >= 0) && (t[r] = o[r]);
  return t;
}
function Xn(o, e) {
  if (o == null) return {};
  var t = Wn(o, e), n, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      n = i[r], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(o, n) && (t[n] = o[n]);
  }
  return t;
}
var Gn = "1.15.6";
function ee(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var re = ee(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), nt = ee(/Edge/i), Do = ee(/firefox/i), Ge = ee(/safari/i) && !ee(/chrome/i) && !ee(/android/i), ao = ee(/iP(ad|od|hone)/i), Vo = ee(/chrome/i) && ee(/android/i), Zo = {
  capture: !1,
  passive: !1
};
function S(o, e, t) {
  o.addEventListener(e, t, !re && Zo);
}
function $(o, e, t) {
  o.removeEventListener(e, t, !re && Zo);
}
function xt(o, e) {
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
function Ko(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function W(o, e, t, n) {
  if (o) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? o.parentNode === t && xt(o, e) : xt(o, e)) || n && o === t)
        return o;
      if (o === t) break;
    } while (o = Ko(o));
  }
  return null;
}
var Co = /\s+/g;
function U(o, e, t) {
  if (o && e)
    if (o.classList)
      o.classList[t ? "add" : "remove"](e);
    else {
      var n = (" " + o.className + " ").replace(Co, " ").replace(" " + e + " ", " ");
      o.className = (n + (t ? " " + e : "")).replace(Co, " ");
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
function Oe(o, e) {
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
function Jo(o, e, t) {
  if (o) {
    var n = o.getElementsByTagName(e), r = 0, i = n.length;
    if (t)
      for (; r < i; r++)
        t(n[r], r);
    return n;
  }
  return [];
}
function V() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function M(o, e, t, n, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, s, a, l, d, h, c;
    if (o !== window && o.parentNode && o !== V() ? (i = o.getBoundingClientRect(), s = i.top, a = i.left, l = i.bottom, d = i.right, h = i.height, c = i.width) : (s = 0, a = 0, l = window.innerHeight, d = window.innerWidth, h = window.innerHeight, c = window.innerWidth), (e || t) && o !== window && (r = r || o.parentNode, !re))
      do
        if (r && r.getBoundingClientRect && (v(r, "transform") !== "none" || t && v(r, "position") !== "static")) {
          var g = r.getBoundingClientRect();
          s -= g.top + parseInt(v(r, "border-top-width")), a -= g.left + parseInt(v(r, "border-left-width")), l = s + i.height, d = a + i.width;
          break;
        }
      while (r = r.parentNode);
    if (n && o !== window) {
      var x = Oe(r || o), k = x && x.a, m = x && x.d;
      x && (s /= m, a /= k, c /= k, h /= m, l = s + h, d = a + c);
    }
    return {
      top: s,
      left: a,
      bottom: l,
      right: d,
      width: c,
      height: h
    };
  }
}
function Ao(o, e, t) {
  for (var n = ce(o, !0), r = M(o)[e]; n; ) {
    var i = M(n)[t], s = void 0;
    if (s = r >= i, !s) return n;
    if (n === V()) break;
    n = ce(n, !1);
  }
  return !1;
}
function Ne(o, e, t, n) {
  for (var r = 0, i = 0, s = o.children; i < s.length; ) {
    if (s[i].style.display !== "none" && s[i] !== y.ghost && (n || s[i] !== y.dragged) && W(s[i], t.draggable, o, !1)) {
      if (r === e)
        return s[i];
      r++;
    }
    i++;
  }
  return null;
}
function lo(o, e) {
  for (var t = o.lastElementChild; t && (t === y.ghost || v(t, "display") === "none" || e && !xt(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function q(o, e) {
  var t = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== y.clone && (!e || xt(o, e)) && t++;
  return t;
}
function To(o) {
  var e = 0, t = 0, n = V();
  if (o)
    do {
      var r = Oe(o), i = r.a, s = r.d;
      e += o.scrollLeft * i, t += o.scrollTop * s;
    } while (o !== n && (o = o.parentNode));
  return [e, t];
}
function Vn(o, e) {
  for (var t in o)
    if (o.hasOwnProperty(t)) {
      for (var n in e)
        if (e.hasOwnProperty(n) && e[n] === o[t][n]) return Number(t);
    }
  return -1;
}
function ce(o, e) {
  if (!o || !o.getBoundingClientRect) return V();
  var t = o, n = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var r = v(t);
      if (t.clientWidth < t.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return V();
        if (n || e) return t;
        n = !0;
      }
    }
  while (t = t.parentNode);
  return V();
}
function Zn(o, e) {
  if (o && e)
    for (var t in e)
      e.hasOwnProperty(t) && (o[t] = e[t]);
  return o;
}
function It(o, e) {
  return Math.round(o.top) === Math.round(e.top) && Math.round(o.left) === Math.round(e.left) && Math.round(o.height) === Math.round(e.height) && Math.round(o.width) === Math.round(e.width);
}
var Ve;
function Qo(o, e) {
  return function() {
    if (!Ve) {
      var t = arguments, n = this;
      t.length === 1 ? o.call(n, t[0]) : o.apply(n, t), Ve = setTimeout(function() {
        Ve = void 0;
      }, e);
    }
  };
}
function Kn() {
  clearTimeout(Ve), Ve = void 0;
}
function en(o, e, t) {
  o.scrollLeft += e, o.scrollTop += t;
}
function tn(o) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(o).cloneNode(!0) : t ? t(o).clone(!0)[0] : o.cloneNode(!0);
}
function on(o, e, t) {
  var n = {};
  return Array.from(o.children).forEach(function(r) {
    var i, s, a, l;
    if (!(!W(r, e.draggable, o, !1) || r.animated || r === t)) {
      var d = M(r);
      n.left = Math.min((i = n.left) !== null && i !== void 0 ? i : 1 / 0, d.left), n.top = Math.min((s = n.top) !== null && s !== void 0 ? s : 1 / 0, d.top), n.right = Math.max((a = n.right) !== null && a !== void 0 ? a : -1 / 0, d.right), n.bottom = Math.max((l = n.bottom) !== null && l !== void 0 ? l : -1 / 0, d.bottom);
    }
  }), n.width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n;
}
var L = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Jn() {
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
            var i = Z({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var s = Oe(r, !0);
              s && (i.top -= s.f, i.left -= s.e);
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
      o.splice(Vn(o, {
        target: n
      }), 1);
    },
    animateAll: function(n) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof n == "function" && n();
        return;
      }
      var i = !1, s = 0;
      o.forEach(function(a) {
        var l = 0, d = a.target, h = d.fromRect, c = M(d), g = d.prevFromRect, x = d.prevToRect, k = a.rect, m = Oe(d, !0);
        m && (c.top -= m.f, c.left -= m.e), d.toRect = c, d.thisAnimationDuration && It(g, c) && !It(h, c) && // Make sure animatingRect is on line between toRect & fromRect
        (k.top - c.top) / (k.left - c.left) === (h.top - c.top) / (h.left - c.left) && (l = er(k, g, x, r.options)), It(c, h) || (d.prevFromRect = h, d.prevToRect = c, l || (l = r.options.animation), r.animate(d, k, c, l)), l && (i = !0, s = Math.max(s, l), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, l), d.thisAnimationDuration = l);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof n == "function" && n();
      }, s) : typeof n == "function" && n(), o = [];
    },
    animate: function(n, r, i, s) {
      if (s) {
        v(n, "transition", ""), v(n, "transform", "");
        var a = Oe(this.el), l = a && a.a, d = a && a.d, h = (r.left - i.left) / (l || 1), c = (r.top - i.top) / (d || 1);
        n.animatingX = !!h, n.animatingY = !!c, v(n, "transform", "translate3d(" + h + "px," + c + "px,0)"), this.forRepaintDummy = Qn(n), v(n, "transition", "transform " + s + "ms" + (this.options.easing ? " " + this.options.easing : "")), v(n, "transform", "translate3d(0,0,0)"), typeof n.animated == "number" && clearTimeout(n.animated), n.animated = setTimeout(function() {
          v(n, "transition", ""), v(n, "transform", ""), n.animated = !1, n.animatingX = !1, n.animatingY = !1;
        }, s);
      }
    }
  };
}
function Qn(o) {
  return o.offsetWidth;
}
function er(o, e, t, n) {
  return Math.sqrt(Math.pow(e.top - o.top, 2) + Math.pow(e.left - o.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * n.animation;
}
var $e = [], Rt = {
  initializeByDefault: !0
}, rt = {
  mount: function(e) {
    for (var t in Rt)
      Rt.hasOwnProperty(t) && !(t in e) && (e[t] = Rt[t]);
    $e.forEach(function(n) {
      if (n.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), $e.push(e);
  },
  pluginEvent: function(e, t, n) {
    var r = this;
    this.eventCanceled = !1, n.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = e + "Global";
    $e.forEach(function(s) {
      t[s.pluginName] && (t[s.pluginName][i] && t[s.pluginName][i](Z({
        sortable: t
      }, n)), t.options[s.pluginName] && t[s.pluginName][e] && t[s.pluginName][e](Z({
        sortable: t
      }, n)));
    });
  },
  initializePlugins: function(e, t, n, r) {
    $e.forEach(function(a) {
      var l = a.pluginName;
      if (!(!e.options[l] && !a.initializeByDefault)) {
        var d = new a(e, t, e.options);
        d.sortable = e, d.options = e.options, e[l] = d, oe(n, d.defaults);
      }
    });
    for (var i in e.options)
      if (e.options.hasOwnProperty(i)) {
        var s = this.modifyOption(e, i, e.options[i]);
        typeof s < "u" && (e.options[i] = s);
      }
  },
  getEventProperties: function(e, t) {
    var n = {};
    return $e.forEach(function(r) {
      typeof r.eventProperties == "function" && oe(n, r.eventProperties.call(t[r.pluginName], e));
    }), n;
  },
  modifyOption: function(e, t, n) {
    var r;
    return $e.forEach(function(i) {
      e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], n));
    }), r;
  }
};
function tr(o) {
  var e = o.sortable, t = o.rootEl, n = o.name, r = o.targetEl, i = o.cloneEl, s = o.toEl, a = o.fromEl, l = o.oldIndex, d = o.newIndex, h = o.oldDraggableIndex, c = o.newDraggableIndex, g = o.originalEvent, x = o.putSortable, k = o.extraEventProperties;
  if (e = e || t && t[L], !!e) {
    var m, f = e.options, E = "on" + n.charAt(0).toUpperCase() + n.substr(1);
    window.CustomEvent && !re && !nt ? m = new CustomEvent(n, {
      bubbles: !0,
      cancelable: !0
    }) : (m = document.createEvent("Event"), m.initEvent(n, !0, !0)), m.to = s || t, m.from = a || t, m.item = r || t, m.clone = i, m.oldIndex = l, m.newIndex = d, m.oldDraggableIndex = h, m.newDraggableIndex = c, m.originalEvent = g, m.pullMode = x ? x.lastPutMode : void 0;
    var A = Z(Z({}, k), rt.getEventProperties(n, e));
    for (var H in A)
      m[H] = A[H];
    t && t.dispatchEvent(m), f[E] && f[E].call(e, m);
  }
}
var or = ["evt"], F = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = Xn(n, or);
  rt.pluginEvent.bind(y)(e, t, Z({
    dragEl: u,
    parentEl: T,
    ghostEl: w,
    rootEl: D,
    nextEl: _e,
    lastDownEl: gt,
    cloneEl: C,
    cloneHidden: de,
    dragStarted: Be,
    putSortable: P,
    activeSortable: y.active,
    originalEvent: r,
    oldIndex: Ce,
    oldDraggableIndex: Ze,
    newIndex: B,
    newDraggableIndex: ae,
    hideGhostForTarget: an,
    unhideGhostForTarget: ln,
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
        originalEvent: r
      });
    }
  }, i));
};
function R(o) {
  tr(Z({
    putSortable: P,
    cloneEl: C,
    targetEl: u,
    rootEl: D,
    oldIndex: Ce,
    oldDraggableIndex: Ze,
    newIndex: B,
    newDraggableIndex: ae
  }, o));
}
var u, T, w, D, _e, gt, C, de, Ce, B, Ze, ae, lt, P, De = !1, wt = !1, kt = [], be, Y, Ht, Ft, Oo, Mo, Be, Se, Ke, Je = !1, dt = !1, bt, N, Lt = [], Gt = !1, $t = [], Ot = typeof document < "u", ct = ao, Po = nt || re ? "cssFloat" : "float", nr = Ot && !Vo && !ao && "draggable" in document.createElement("div"), nn = (function() {
  if (Ot) {
    if (re)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
})(), rn = function(e, t) {
  var n = v(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = Ne(e, 0, t), s = Ne(e, 1, t), a = i && v(i), l = s && v(s), d = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + M(i).width, h = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + M(s).width;
  if (n.display === "flex")
    return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (n.display === "grid")
    return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && a.float && a.float !== "none") {
    var c = a.float === "left" ? "left" : "right";
    return s && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return i && (a.display === "block" || a.display === "flex" || a.display === "table" || a.display === "grid" || d >= r && n[Po] === "none" || s && n[Po] === "none" && d + h > r) ? "vertical" : "horizontal";
}, rr = function(e, t, n) {
  var r = n ? e.left : e.top, i = n ? e.right : e.bottom, s = n ? e.width : e.height, a = n ? t.left : t.top, l = n ? t.right : t.bottom, d = n ? t.width : t.height;
  return r === a || i === l || r + s / 2 === a + d / 2;
}, ir = function(e, t) {
  var n;
  return kt.some(function(r) {
    var i = r[L].options.emptyInsertThreshold;
    if (!(!i || lo(r))) {
      var s = M(r), a = e >= s.left - i && e <= s.right + i, l = t >= s.top - i && t <= s.bottom + i;
      if (a && l)
        return n = r;
    }
  }), n;
}, sn = function(e) {
  function t(i, s) {
    return function(a, l, d, h) {
      var c = a.options.group.name && l.options.group.name && a.options.group.name === l.options.group.name;
      if (i == null && (s || c))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (s && i === "clone")
        return i;
      if (typeof i == "function")
        return t(i(a, l, d, h), s)(a, l, d, h);
      var g = (s ? a : l).options.group.name;
      return i === !0 || typeof i == "string" && i === g || i.join && i.indexOf(g) > -1;
    };
  }
  var n = {}, r = e.group;
  (!r || ft(r) != "object") && (r = {
    name: r
  }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, an = function() {
  !nn && w && v(w, "display", "none");
}, ln = function() {
  !nn && w && v(w, "display", "");
};
Ot && !Vo && document.addEventListener("click", function(o) {
  if (wt)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), wt = !1, !1;
}, !0);
var me = function(e) {
  if (u) {
    e = e.touches ? e.touches[0] : e;
    var t = ir(e.clientX, e.clientY);
    if (t) {
      var n = {};
      for (var r in e)
        e.hasOwnProperty(r) && (n[r] = e[r]);
      n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[L]._onDragOver(n);
    }
  }
}, sr = function(e) {
  u && u.parentNode[L]._isOutsideThisEl(e.target);
};
function y(o, e) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = e = oe({}, e), o[L] = this;
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
      return rn(o, this.options);
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
    supportPointer: y.supportPointer !== !1 && "PointerEvent" in window && (!Ge || ao),
    emptyInsertThreshold: 5
  };
  rt.initializePlugins(this, o, t);
  for (var n in t)
    !(n in e) && (e[n] = t[n]);
  sn(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : nr, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? S(o, "pointerdown", this._onTapStart) : (S(o, "mousedown", this._onTapStart), S(o, "touchstart", this._onTapStart)), this.nativeDraggable && (S(o, "dragover", this), S(o, "dragenter", this)), kt.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), oe(this, Jn());
}
y.prototype = /** @lends Sortable.prototype */
{
  constructor: y,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (Se = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, u) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, n = this.el, r = this.options, i = r.preventOnFilter, s = e.type, a = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (a || e).target, d = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, h = r.filter;
      if (fr(n), !u && !(/mousedown|pointerdown/.test(s) && e.button !== 0 || r.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Ge && l && l.tagName.toUpperCase() === "SELECT") && (l = W(l, r.draggable, n, !1), !(l && l.animated) && gt !== l)) {
        if (Ce = q(l), Ze = q(l, r.draggable), typeof h == "function") {
          if (h.call(this, e, l, this)) {
            R({
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
        }), h)) {
          i && e.preventDefault();
          return;
        }
        r.handle && !W(d, r.handle, n, !1) || this._prepareDragStart(e, a, l);
      }
    }
  },
  _prepareDragStart: function(e, t, n) {
    var r = this, i = r.el, s = r.options, a = i.ownerDocument, l;
    if (n && !u && n.parentNode === i) {
      var d = M(n);
      if (D = i, u = n, T = u.parentNode, _e = u.nextSibling, gt = n, lt = s.group, y.dragged = u, be = {
        target: u,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, Oo = be.clientX - d.left, Mo = be.clientY - d.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, u.style["will-change"] = "all", l = function() {
        if (F("delayEnded", r, {
          evt: e
        }), y.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !Do && r.nativeDraggable && (u.draggable = !0), r._triggerDragStart(e, t), R({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), U(u, s.chosenClass, !0);
      }, s.ignore.split(",").forEach(function(h) {
        Jo(u, h.trim(), jt);
      }), S(a, "dragover", me), S(a, "mousemove", me), S(a, "touchmove", me), s.supportPointer ? (S(a, "pointerup", r._onDrop), !this.nativeDraggable && S(a, "pointercancel", r._onDrop)) : (S(a, "mouseup", r._onDrop), S(a, "touchend", r._onDrop), S(a, "touchcancel", r._onDrop)), Do && this.nativeDraggable && (this.options.touchStartThreshold = 4, u.draggable = !0), F("delayStart", this, {
        evt: e
      }), s.delay && (!s.delayOnTouchOnly || t) && (!this.nativeDraggable || !(nt || re))) {
        if (y.eventCanceled) {
          this._onDrop();
          return;
        }
        s.supportPointer ? (S(a, "pointerup", r._disableDelayedDrag), S(a, "pointercancel", r._disableDelayedDrag)) : (S(a, "mouseup", r._disableDelayedDrag), S(a, "touchend", r._disableDelayedDrag), S(a, "touchcancel", r._disableDelayedDrag)), S(a, "mousemove", r._delayedDragTouchMoveHandler), S(a, "touchmove", r._delayedDragTouchMoveHandler), s.supportPointer && S(a, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(l, s.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    u && jt(u), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    $(e, "mouseup", this._disableDelayedDrag), $(e, "touchend", this._disableDelayedDrag), $(e, "touchcancel", this._disableDelayedDrag), $(e, "pointerup", this._disableDelayedDrag), $(e, "pointercancel", this._disableDelayedDrag), $(e, "mousemove", this._delayedDragTouchMoveHandler), $(e, "touchmove", this._delayedDragTouchMoveHandler), $(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? S(document, "pointermove", this._onTouchMove) : t ? S(document, "touchmove", this._onTouchMove) : S(document, "mousemove", this._onTouchMove) : (S(u, "dragend", this), S(D, "dragstart", this._onDragStart));
    try {
      document.selection ? mt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (De = !1, D && u) {
      F("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && S(document, "dragover", sr);
      var n = this.options;
      !e && U(u, n.dragClass, !1), U(u, n.ghostClass, !0), y.active = this, e && this._appendGhost(), R({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Y) {
      this._lastX = Y.clientX, this._lastY = Y.clientY, an();
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
        } while (t = Ko(t));
      ln();
    }
  },
  _onTouchMove: function(e) {
    if (be) {
      var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, s = w && Oe(w, !0), a = w && s && s.a, l = w && s && s.d, d = ct && N && To(N), h = (i.clientX - be.clientX + r.x) / (a || 1) + (d ? d[0] - Lt[0] : 0) / (a || 1), c = (i.clientY - be.clientY + r.y) / (l || 1) + (d ? d[1] - Lt[1] : 0) / (l || 1);
      if (!y.active && !De) {
        if (n && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < n)
          return;
        this._onDragStart(e, !0);
      }
      if (w) {
        s ? (s.e += h - (Ht || 0), s.f += c - (Ft || 0)) : s = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: h,
          f: c
        };
        var g = "matrix(".concat(s.a, ",").concat(s.b, ",").concat(s.c, ",").concat(s.d, ",").concat(s.e, ",").concat(s.f, ")");
        v(w, "webkitTransform", g), v(w, "mozTransform", g), v(w, "msTransform", g), v(w, "transform", g), Ht = h, Ft = c, Y = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!w) {
      var e = this.options.fallbackOnBody ? document.body : D, t = M(u, !0, ct, !0, e), n = this.options;
      if (ct) {
        for (N = e; v(N, "position") === "static" && v(N, "transform") === "none" && N !== document; )
          N = N.parentNode;
        N !== document.body && N !== document.documentElement ? (N === document && (N = V()), t.top += N.scrollTop, t.left += N.scrollLeft) : N = V(), Lt = To(N);
      }
      w = u.cloneNode(!0), U(w, n.ghostClass, !1), U(w, n.fallbackClass, !0), U(w, n.dragClass, !0), v(w, "transition", ""), v(w, "transform", ""), v(w, "box-sizing", "border-box"), v(w, "margin", 0), v(w, "top", t.top), v(w, "left", t.left), v(w, "width", t.width), v(w, "height", t.height), v(w, "opacity", "0.8"), v(w, "position", ct ? "absolute" : "fixed"), v(w, "zIndex", "100000"), v(w, "pointerEvents", "none"), y.ghost = w, e.appendChild(w), v(w, "transform-origin", Oo / parseInt(w.style.width) * 100 + "% " + Mo / parseInt(w.style.height) * 100 + "%");
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
    F("setupClone", this), y.eventCanceled || (C = tn(u), C.removeAttribute("id"), C.draggable = !1, C.style["will-change"] = "", this._hideClone(), U(C, this.options.chosenClass, !1), y.clone = C), n.cloneId = mt(function() {
      F("clone", n), !y.eventCanceled && (n.options.removeCloneOnHide || D.insertBefore(C, u), n._hideClone(), R({
        sortable: n,
        name: "clone"
      }));
    }), !t && U(u, i.dragClass, !0), t ? (wt = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : ($(document, "mouseup", n._onDrop), $(document, "touchend", n._onDrop), $(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, u)), S(document, "drop", n), v(u, "transform", "translateZ(0)")), De = !0, n._dragStartId = mt(n._dragStarted.bind(n, t, e)), S(document, "selectstart", n), Be = !0, window.getSelection().removeAllRanges(), Ge && v(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, n = e.target, r, i, s, a = this.options, l = a.group, d = y.active, h = lt === l, c = a.sort, g = P || d, x, k = this, m = !1;
    if (Gt) return;
    function f(je, $n) {
      F(je, k, Z({
        evt: e,
        isOwner: h,
        axis: x ? "vertical" : "horizontal",
        revert: s,
        dragRect: r,
        targetRect: i,
        canSort: c,
        fromSortable: g,
        target: n,
        completed: A,
        onMove: function(fo, Sn) {
          return ht(D, t, u, r, fo, M(fo), e, Sn);
        },
        changed: H
      }, $n));
    }
    function E() {
      f("dragOverAnimationCapture"), k.captureAnimationState(), k !== g && g.captureAnimationState();
    }
    function A(je) {
      return f("dragOverCompleted", {
        insertion: je
      }), je && (h ? d._hideClone() : d._showClone(k), k !== g && (U(u, P ? P.options.ghostClass : d.options.ghostClass, !1), U(u, a.ghostClass, !0)), P !== k && k !== y.active ? P = k : k === y.active && P && (P = null), g === k && (k._ignoreWhileAnimating = n), k.animateAll(function() {
        f("dragOverAnimationComplete"), k._ignoreWhileAnimating = null;
      }), k !== g && (g.animateAll(), g._ignoreWhileAnimating = null)), (n === u && !u.animated || n === t && !n.animated) && (Se = null), !a.dragoverBubble && !e.rootEl && n !== document && (u.parentNode[L]._isOutsideThisEl(e.target), !je && me(e)), !a.dragoverBubble && e.stopPropagation && e.stopPropagation(), m = !0;
    }
    function H() {
      B = q(u), ae = q(u, a.draggable), R({
        sortable: k,
        name: "change",
        toEl: t,
        newIndex: B,
        newDraggableIndex: ae,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = W(n, a.draggable, t, !0), f("dragOver"), y.eventCanceled) return m;
    if (u.contains(e.target) || n.animated && n.animatingX && n.animatingY || k._ignoreWhileAnimating === n)
      return A(!1);
    if (wt = !1, d && !a.disabled && (h ? c || (s = T !== D) : P === this || (this.lastPutMode = lt.checkPull(this, d, u, e)) && l.checkPut(this, d, u, e))) {
      if (x = this._getDirection(e, n) === "vertical", r = M(u), f("dragOverValid"), y.eventCanceled) return m;
      if (s)
        return T = D, E(), this._hideClone(), f("revert"), y.eventCanceled || (_e ? D.insertBefore(u, _e) : D.appendChild(u)), A(!0);
      var z = lo(t, a.draggable);
      if (!z || cr(e, x, this) && !z.animated) {
        if (z === u)
          return A(!1);
        if (z && t === e.target && (n = z), n && (i = M(n)), ht(D, t, u, r, n, i, e, !!n) !== !1)
          return E(), z && z.nextSibling ? t.insertBefore(u, z.nextSibling) : t.appendChild(u), T = t, H(), A(!0);
      } else if (z && dr(e, x, this)) {
        var J = Ne(t, 0, a, !0);
        if (J === u)
          return A(!1);
        if (n = J, i = M(n), ht(D, t, u, r, n, i, e, !1) !== !1)
          return E(), t.insertBefore(u, J), T = t, H(), A(!0);
      } else if (n.parentNode === t) {
        i = M(n);
        var X = 0, ue, Re = u.parentNode !== t, j = !rr(u.animated && u.toRect || r, n.animated && n.toRect || i, x), He = x ? "top" : "left", ie = Ao(n, "top", "top") || Ao(u, "top", "top"), Fe = ie ? ie.scrollTop : void 0;
        Se !== n && (ue = i[He], Je = !1, dt = !j && a.invertSwap || Re), X = hr(e, n, i, x, j ? 1 : a.swapThreshold, a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold, dt, Se === n);
        var Q;
        if (X !== 0) {
          var fe = q(u);
          do
            fe -= X, Q = T.children[fe];
          while (Q && (v(Q, "display") === "none" || Q === w));
        }
        if (X === 0 || Q === n)
          return A(!1);
        Se = n, Ke = X;
        var Le = n.nextElementSibling, se = !1;
        se = X === 1;
        var at = ht(D, t, u, r, n, i, e, se);
        if (at !== !1)
          return (at === 1 || at === -1) && (se = at === 1), Gt = !0, setTimeout(lr, 30), E(), se && !Le ? t.appendChild(u) : n.parentNode.insertBefore(u, se ? Le : n), ie && en(ie, 0, Fe - ie.scrollTop), T = u.parentNode, ue !== void 0 && !dt && (bt = Math.abs(ue - M(n)[He])), H(), A(!0);
      }
      if (t.contains(u))
        return A(!1);
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
    var t = this.el, n = this.options;
    if (B = q(u), ae = q(u, n.draggable), F("drop", this, {
      evt: e
    }), T = u && u.parentNode, B = q(u), ae = q(u, n.draggable), y.eventCanceled) {
      this._nulling();
      return;
    }
    De = !1, dt = !1, Je = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Vt(this.cloneId), Vt(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ge && v(document.body, "user-select", ""), v(u, "transform", ""), e && (Be && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), w && w.parentNode && w.parentNode.removeChild(w), (D === T || P && P.lastPutMode !== "clone") && C && C.parentNode && C.parentNode.removeChild(C), u && (this.nativeDraggable && $(u, "dragend", this), jt(u), u.style["will-change"] = "", Be && !De && U(u, P ? P.options.ghostClass : this.options.ghostClass, !1), U(u, this.options.chosenClass, !1), R({
      sortable: this,
      name: "unchoose",
      toEl: T,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), D !== T ? (B >= 0 && (R({
      rootEl: T,
      name: "add",
      toEl: T,
      fromEl: D,
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
      fromEl: D,
      originalEvent: e
    }), R({
      sortable: this,
      name: "sort",
      toEl: T,
      originalEvent: e
    })), P && P.save()) : B !== Ce && B >= 0 && (R({
      sortable: this,
      name: "update",
      toEl: T,
      originalEvent: e
    }), R({
      sortable: this,
      name: "sort",
      toEl: T,
      originalEvent: e
    })), y.active && ((B == null || B === -1) && (B = Ce, ae = Ze), R({
      sortable: this,
      name: "end",
      toEl: T,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    F("nulling", this), D = u = T = w = _e = C = gt = de = be = Y = Be = B = ae = Ce = Ze = Se = Ke = P = lt = y.dragged = y.ghost = y.clone = y.active = null, $t.forEach(function(e) {
      e.checked = !0;
    }), $t.length = Ht = Ft = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        u && (this._onDragOver(e), ar(e));
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
    for (var e = [], t, n = this.el.children, r = 0, i = n.length, s = this.options; r < i; r++)
      t = n[r], W(t, s.draggable, this.el, !1) && e.push(t.getAttribute(s.dataIdAttr) || ur(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var n = {}, r = this.el;
    this.toArray().forEach(function(i, s) {
      var a = r.children[s];
      W(a, this.options.draggable, r, !1) && (n[i] = a);
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
    var r = rt.modifyOption(this, e, t);
    typeof r < "u" ? n[e] = r : n[e] = t, e === "group" && sn(n);
  },
  /**
   * Destroy
   */
  destroy: function() {
    F("destroy", this);
    var e = this.el;
    e[L] = null, $(e, "mousedown", this._onTapStart), $(e, "touchstart", this._onTapStart), $(e, "pointerdown", this._onTapStart), this.nativeDraggable && ($(e, "dragover", this), $(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), kt.splice(kt.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!de) {
      if (F("hideClone", this), y.eventCanceled) return;
      v(C, "display", "none"), this.options.removeCloneOnHide && C.parentNode && C.parentNode.removeChild(C), de = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (de) {
      if (F("showClone", this), y.eventCanceled) return;
      u.parentNode == D && !this.options.group.revertClone ? D.insertBefore(C, u) : _e ? D.insertBefore(C, _e) : D.appendChild(C), this.options.group.revertClone && this.animate(u, C), v(C, "display", ""), de = !1;
    }
  }
};
function ar(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function ht(o, e, t, n, r, i, s, a) {
  var l, d = o[L], h = d.options.onMove, c;
  return window.CustomEvent && !re && !nt ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = o, l.dragged = t, l.draggedRect = n, l.related = r || e, l.relatedRect = i || M(e), l.willInsertAfter = a, l.originalEvent = s, o.dispatchEvent(l), h && (c = h.call(d, l, s)), c;
}
function jt(o) {
  o.draggable = !1;
}
function lr() {
  Gt = !1;
}
function dr(o, e, t) {
  var n = M(Ne(t.el, 0, t.options, !0)), r = on(t.el, t.options, w), i = 10;
  return e ? o.clientX < r.left - i || o.clientY < n.top && o.clientX < n.right : o.clientY < r.top - i || o.clientY < n.bottom && o.clientX < n.left;
}
function cr(o, e, t) {
  var n = M(lo(t.el, t.options.draggable)), r = on(t.el, t.options, w), i = 10;
  return e ? o.clientX > r.right + i || o.clientY > n.bottom && o.clientX > n.left : o.clientY > r.bottom + i || o.clientX > n.right && o.clientY > n.top;
}
function hr(o, e, t, n, r, i, s, a) {
  var l = n ? o.clientY : o.clientX, d = n ? t.height : t.width, h = n ? t.top : t.left, c = n ? t.bottom : t.right, g = !1;
  if (!s) {
    if (a && bt < d * r) {
      if (!Je && (Ke === 1 ? l > h + d * i / 2 : l < c - d * i / 2) && (Je = !0), Je)
        g = !0;
      else if (Ke === 1 ? l < h + bt : l > c - bt)
        return -Ke;
    } else if (l > h + d * (1 - r) / 2 && l < c - d * (1 - r) / 2)
      return pr(e);
  }
  return g = g || s, g && (l < h + d * i / 2 || l > c - d * i / 2) ? l > h + d / 2 ? 1 : -1 : 0;
}
function pr(o) {
  return q(u) < q(o) ? 1 : -1;
}
function ur(o) {
  for (var e = o.tagName + o.className + o.src + o.href + o.textContent, t = e.length, n = 0; t--; )
    n += e.charCodeAt(t);
  return n.toString(36);
}
function fr(o) {
  $t.length = 0;
  for (var e = o.getElementsByTagName("input"), t = e.length; t--; ) {
    var n = e[t];
    n.checked && $t.push(n);
  }
}
function mt(o) {
  return setTimeout(o, 0);
}
function Vt(o) {
  return clearTimeout(o);
}
Ot && S(document, "touchmove", function(o) {
  (y.active || De) && o.cancelable && o.preventDefault();
});
y.utils = {
  on: S,
  off: $,
  css: v,
  find: Jo,
  is: function(e, t) {
    return !!W(e, t, e, !1);
  },
  extend: Zn,
  throttle: Qo,
  closest: W,
  toggleClass: U,
  clone: tn,
  index: q,
  nextTick: mt,
  cancelNextTick: Vt,
  detectDirection: rn,
  getChild: Ne,
  expando: L
};
y.get = function(o) {
  return o[L];
};
y.mount = function() {
  for (var o = arguments.length, e = new Array(o), t = 0; t < o; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(n) {
    if (!n.prototype || !n.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(n));
    n.utils && (y.utils = Z(Z({}, y.utils), n.utils)), rt.mount(n);
  });
};
y.create = function(o, e) {
  return new y(o, e);
};
y.version = Gn;
var O = [], qe, Zt, Kt = !1, Ut, Bt, St, Ye;
function gr() {
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
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), zo(), _t(), Kn();
    },
    nulling: function() {
      St = Zt = qe = Kt = Ye = Ut = Bt = null, O.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, n) {
      var r = this, i = (t.touches ? t.touches[0] : t).clientX, s = (t.touches ? t.touches[0] : t).clientY, a = document.elementFromPoint(i, s);
      if (St = t, n || this.options.forceAutoScrollFallback || nt || re || Ge) {
        qt(t, this.options, a, n);
        var l = ce(a, !0);
        Kt && (!Ye || i !== Ut || s !== Bt) && (Ye && zo(), Ye = setInterval(function() {
          var d = ce(document.elementFromPoint(i, s), !0);
          d !== l && (l = d, _t()), qt(t, r.options, d, n);
        }, 10), Ut = i, Bt = s);
      } else {
        if (!this.options.bubbleScroll || ce(a, !0) === V()) {
          _t();
          return;
        }
        qt(t, this.options, ce(a, !1), !1);
      }
    }
  }, oe(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function _t() {
  O.forEach(function(o) {
    clearInterval(o.pid);
  }), O = [];
}
function zo() {
  clearInterval(Ye);
}
var qt = Qo(function(o, e, t, n) {
  if (e.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, s = e.scrollSensitivity, a = e.scrollSpeed, l = V(), d = !1, h;
    Zt !== t && (Zt = t, _t(), qe = e.scroll, h = e.scrollFn, qe === !0 && (qe = ce(t, !0)));
    var c = 0, g = qe;
    do {
      var x = g, k = M(x), m = k.top, f = k.bottom, E = k.left, A = k.right, H = k.width, z = k.height, J = void 0, X = void 0, ue = x.scrollWidth, Re = x.scrollHeight, j = v(x), He = x.scrollLeft, ie = x.scrollTop;
      x === l ? (J = H < ue && (j.overflowX === "auto" || j.overflowX === "scroll" || j.overflowX === "visible"), X = z < Re && (j.overflowY === "auto" || j.overflowY === "scroll" || j.overflowY === "visible")) : (J = H < ue && (j.overflowX === "auto" || j.overflowX === "scroll"), X = z < Re && (j.overflowY === "auto" || j.overflowY === "scroll"));
      var Fe = J && (Math.abs(A - r) <= s && He + H < ue) - (Math.abs(E - r) <= s && !!He), Q = X && (Math.abs(f - i) <= s && ie + z < Re) - (Math.abs(m - i) <= s && !!ie);
      if (!O[c])
        for (var fe = 0; fe <= c; fe++)
          O[fe] || (O[fe] = {});
      (O[c].vx != Fe || O[c].vy != Q || O[c].el !== x) && (O[c].el = x, O[c].vx = Fe, O[c].vy = Q, clearInterval(O[c].pid), (Fe != 0 || Q != 0) && (d = !0, O[c].pid = setInterval((function() {
        n && this.layer === 0 && y.active._onTouchMove(St);
        var Le = O[this.layer].vy ? O[this.layer].vy * a : 0, se = O[this.layer].vx ? O[this.layer].vx * a : 0;
        typeof h == "function" && h.call(y.dragged.parentNode[L], se, Le, o, St, O[this.layer].el) !== "continue" || en(O[this.layer].el, se, Le);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && g !== l && (g = ce(g, !1)));
    Kt = d;
  }
}, 30), dn = function(e) {
  var t = e.originalEvent, n = e.putSortable, r = e.dragEl, i = e.activeSortable, s = e.dispatchSortableEvent, a = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var d = n || i;
    a();
    var h = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, c = document.elementFromPoint(h.clientX, h.clientY);
    l(), d && !d.el.contains(c) && (s("spill"), this.onSpill({
      dragEl: r,
      putSortable: n
    }));
  }
};
function co() {
}
co.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable;
    this.sortable.captureAnimationState(), n && n.captureAnimationState();
    var r = Ne(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
  },
  drop: dn
};
oe(co, {
  pluginName: "revertOnSpill"
});
function ho() {
}
ho.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable, r = n || this.sortable;
    r.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), r.animateAll();
  },
  drop: dn
};
oe(ho, {
  pluginName: "removeOnSpill"
});
y.mount(new gr());
y.mount(ho, co);
const Ie = "household_kanban";
function cn(o, e) {
  return o.connection.subscribeMessage((t) => e(t.board), { type: `${Ie}/subscribe` });
}
function pt(o, e, t) {
  return o.callService(Ie, "set_status", { uid: e, status: t });
}
function br(o, e) {
  return o.connection.sendMessagePromise({ type: `${Ie}/history`, ...e });
}
function mr(o, e) {
  return o.callService(Ie, "create_item", { ...e });
}
function Yt(o, e, t) {
  return o.callService(Ie, "update_item", { uid: e, ...t });
}
function _r(o, e) {
  return o.callService(Ie, "delete_item", { uid: e });
}
function vr(o, e) {
  return o.connection.sendMessagePromise({ type: "lovelace/config", url_path: e });
}
function yr(o, e, t) {
  return o.connection.sendMessagePromise({ type: "lovelace/config/save", url_path: e, config: t });
}
const xr = 864e5;
function I(o) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate());
}
const he = (o) => String(o).padStart(2, "0");
function te(o) {
  return `${o.getFullYear()}-${he(o.getMonth() + 1)}-${he(o.getDate())}`;
}
function wr(o, e) {
  if (!o) return null;
  if (!e) return o;
  const [t, n, r] = o.split("-").map(Number), [i, s] = e.split(":").map(Number), a = -new Date(t, n - 1, r, i, s).getTimezoneOffset(), l = Math.abs(a);
  return `${o}T${he(i)}:${he(s)}:00${a < 0 ? "-" : "+"}${he(Math.floor(l / 60))}:${he(l % 60)}`;
}
function kr(o) {
  if (!o) return "";
  const { date: e, hasTime: t } = K(o);
  return t ? `${he(e.getHours())}:${he(e.getMinutes())}` : "";
}
function G(o, e) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate() + e);
}
function po(o, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(o.getFullYear(), o.getMonth(), o.getDate())) / xr);
}
function K(o) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(o)) {
    const [e, t, n] = o.split("-").map(Number);
    return { date: new Date(e, t - 1, n), hasTime: !1 };
  }
  return { date: new Date(o), hasTime: !0 };
}
function $r(o, e) {
  const t = I(o), n = (t.getDay() - e + 7) % 7, r = G(t, -n);
  return n === 6 ? { start: G(r, 7), end: G(r, 13) } : { start: r, end: G(r, 6) };
}
const Sr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function No(o) {
  var n, r;
  const e = o == null ? void 0 : o.first_weekday, t = Sr.indexOf(e ?? "");
  if (t >= 0) return t;
  try {
    const i = new Intl.Locale((o == null ? void 0 : o.language) ?? "en"), s = (r = ((n = i.getWeekInfo) == null ? void 0 : n.call(i)) ?? i.weekInfo) == null ? void 0 : r.firstDay;
    if (s) return s % 7;
  } catch {
  }
  return 1;
}
function xe(o, e) {
  const t = I(e.now);
  if (o.status === "completed")
    return !o.completed_at || !e.enabled.has("done") ? null : po(new Date(o.completed_at), t) < e.doneDays ? "done" : null;
  if (!o.due) return "todo";
  const n = I(K(o.due).date), r = (...i) => i.find((s) => e.enabled.has(s)) ?? "todo";
  return n < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : r("today", "week") : +n == +t ? r("today", "week") : n <= e.week.end ? r("week") : r("later");
}
const Er = 8;
function Io(o, e, t) {
  return Math.hypot(o, e) >= Er;
}
function Dr(o, e, t) {
  const n = o.status === "completed" ? { status: "needs_action" } : {};
  if (typeof e == "number")
    return o.status === "needs_action" && o.priority === e ? null : { ...n, ...o.priority === e ? {} : { priority: e } };
  if (e === "overdue" || xe(o, t) === e) return null;
  if (e === "done") return { status: "completed" };
  if (e === "todo") return { ...n, due: null };
  if (e === "week") return { ...n, due: te(t.week.end) };
  if (e === "later") return { ...n, due: te(G(t.week.end, 1)) };
  const r = I(t.now);
  return o.due && +I(K(o.due).date) == +r ? Object.keys(n).length ? n : null : { ...n, due: te(r) };
}
function hn(o) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(o, 10));
}
function Cr(o) {
  const e = `custom:${o}`, t = (n) => {
    var r;
    for (const i of n.querySelectorAll("*")) {
      if (i.localName === "hui-error-card") {
        const s = i, a = s.config ?? s._config;
        ((a == null ? void 0 : a.type) === e || ((r = a == null ? void 0 : a.origConfig) == null ? void 0 : r.type) === e) && i.dispatchEvent(new Event("ll-rebuild", { bubbles: !0, composed: !0 }));
      }
      i.shadowRoot && t(i.shadowRoot);
    }
  };
  t(document);
}
const Jt = [];
function Ar() {
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
        for (const n of Jt) n(t);
      }
    });
  } catch {
  }
}
function pn(o, e) {
  let t = !1, n = !1;
  const r = (a = window.customElements) => {
    try {
      if (a.get(o)) return;
      a.define(o, e), t && Cr(o);
    } catch (l) {
      n || (n = !0, console.warn("household_kanban: could not register the card", l));
    }
  };
  r(), t = !0, Jt.length || Ar(), Jt.push(r), document.addEventListener("DOMContentLoaded", () => r()), window.addEventListener("load", () => r());
  const i = Date.now(), s = () => {
    r();
    const a = Date.now() - i;
    a < 2e4 && window.setTimeout(s, a < 3e3 ? 40 : 250);
  };
  window.setTimeout(s, 40);
}
const Ro = ["todo", "later", "week", "today", "overdue", "done"], Tr = ["todo", "week", "today", "done"], uo = [1, 3, 7, 30];
function Me(o) {
  const e = o.columns ?? Tr, t = e.filter((i) => !Ro.includes(i));
  if (t.length) throw new Error(`Unknown column id: ${t.join(", ")}`);
  const n = new Set(e).add("todo"), r = {
    type: o.type,
    columns: Ro.filter((i) => n.has(i)),
    done_days: uo.find((i) => i === o.done_days) ?? 7,
    group: o.group === "priority" ? "priority" : "date"
  };
  return o.parents && (r.parents = o.parents), o.people && (r.people = o.people), r;
}
function Qt(o, e, t, n) {
  const r = new Set(o ?? e);
  return n ? r.add(t) : r.delete(t), r.size === 0 || r.size === e.length ? void 0 : e.filter((i) => r.has(i));
}
function un(o, e) {
  const t = { ...o, ...e };
  for (const n of ["parents", "people"]) n in e || delete t[n];
  return t;
}
function Or(o) {
  const e = o.split("/").find(Boolean);
  return !e || e === "lovelace" ? null : e;
}
function fn(o, e) {
  if (o === e) return !0;
  if (!o || !e || typeof o != "object" || typeof e != "object" || Array.isArray(o) !== Array.isArray(e)) return !1;
  const t = o, n = e, r = Object.keys(t);
  return r.length === Object.keys(n).length && r.every((i) => Object.hasOwn(n, i) && fn(t[i], n[i]));
}
function Mr(o, e, t) {
  let n = 0;
  const r = (s) => fn(s, e) ? (n++, t) : Array.isArray(s) ? s.map(r) : s && typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, l]) => [a, r(l)])) : s, i = r(o);
  return { config: n === 1 ? i : o, matches: n };
}
const gn = {
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
  settings: "Settings",
  tab_board: "Board",
  tab_eod: "End of day",
  tab_lists: "Lists & people",
  scope_dashboard: "This dashboard only",
  scope_dashboard_hint: "Saved in the card settings. The kitchen tablet can show other columns than your phone.",
  scope_lists_hint: "Which lists and people show here.",
  scope_household: "Whole household",
  scope_household_hint: "Same settings as Settings → Household Kanban. Applies to every dashboard.",
  eod_soon: "End of day and notifications can be set here soon. Until then use Settings → Devices & services → Household Kanban → Configure.",
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
}, Pr = {
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
  settings: "Nastavení",
  tab_board: "Board",
  tab_eod: "Konec dne",
  tab_lists: "Seznamy a lidé",
  scope_dashboard: "Jen tento dashboard",
  scope_dashboard_hint: "Uloží se do nastavení karty. Tablet v kuchyni může mít jiné sloupce než mobil.",
  scope_lists_hint: "Které seznamy a lidé se tu zobrazí.",
  scope_household: "Celá domácnost",
  scope_household_hint: "Stejné nastavení jako v Nastavení → Household Kanban. Platí pro všechny dashboardy.",
  eod_soon: "Konec dne a notifikace tu půjde brzy nastavit. Zatím je najdeš v Nastavení → Zařízení a služby → Household Kanban → Konfigurovat.",
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
}, zr = { en: gn, cs: Pr };
function _(o, e, t = {}) {
  return (zr[(o ?? "en").split("-")[0]] ?? gn)[e].replace(/\{(\w+)\}/g, (r, i) => String(t[i] ?? ""));
}
const Ho = {
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
function Ae(o, e, t) {
  const n = (o ?? "en").split("-")[0], r = n in Ho ? n : "en", i = Ho[r][e];
  return (i[new Intl.PluralRules(r).select(t)] ?? i.other).replace("{n}", String(t));
}
const Nr = ["todo", "later", "week", "today", "done"], Ct = class Ct extends Te {
  constructor() {
    super(...arguments), this._parents = [], this._raw = {}, this._attempts = 0, this._subbing = !1;
  }
  setConfig(e) {
    this._raw = { ...e };
    try {
      this._config = Me(e);
    } catch {
      this._config = Me({ type: e.type });
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
    this._unsub || this._subbing || this._retry !== void 0 || !this.hass || !this.isConnected || (this._subbing = !0, cn(this.hass, (e) => {
      this._parents = e.parents;
    }).then((e) => {
      this._attempts = 0, this.isConnected ? this._unsub = e : e();
    }).catch((e) => {
      console.warn("household_kanban: editor subscribe failed", e), this.isConnected && (this._retry = window.setTimeout(() => {
        this._retry = void 0, this._sub();
      }, hn(this._attempts++)));
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
    this._config = Me(t);
    const n = un(this._raw, this._config);
    this._raw = n, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: n }, bubbles: !0, composed: !0 }));
  }
  _checks(e, t) {
    var i;
    const n = t.map((s) => s.id), r = (i = this._config) == null ? void 0 : i[e];
    return t.map((s) => p`<label class="row">
      <input type="checkbox" .checked=${!r || r.includes(s.id)}
        @change=${(a) => {
      var l;
      return this._set({ [e]: Qt((l = this._config) == null ? void 0 : l[e], n, s.id, a.target.checked) });
    }} />
      <span>${s.name}</span>
    </label>`);
  }
  render() {
    var s, a;
    const e = this._config, t = this.hass;
    if (!e || !t) return b;
    const n = ((s = t.locale) == null ? void 0 : s.language) ?? t.language ?? "en", r = (l) => _(n, l), i = Object.entries(t.states).filter(([l]) => l.startsWith("person.")).map(([l, d]) => ({ id: l, name: String(d.attributes.friendly_name ?? l) }));
    return p`
      <h3>${r("ed_columns")}</h3>
      ${Nr.map((l) => {
      var d;
      return p`<label class="row">
        <input type="checkbox" role="switch" .checked=${((d = e.columns) == null ? void 0 : d.includes(l)) ?? !1} ?disabled=${l === "todo"}
          @change=${(h) => {
        const c = h.target.checked;
        this._set({ columns: (e.columns ?? []).filter((g) => g !== l).concat(c ? [l] : []) });
      }} />
        <span>${r(`col_${l}`)}</span>
      </label>`;
    })}
      ${(a = e.columns) != null && a.includes("done") ? p`
        <div class="row"><span class="grow">${r("ed_done_days")}</span>
          <div class="seg" role="radiogroup" aria-label=${r("ed_done_days")}>
            ${uo.map((l) => p`<button type="button" role="radio" aria-checked=${e.done_days === l}
              @click=${() => this._set({ done_days: l })}>${l}</button>`)}
          </div>
        </div>` : b}
      <h3>${r("group_label")}</h3>
      <select aria-label=${r("group_label")} @change=${(l) => this._set({ group: l.target.value })}>
        <option value="date" ?selected=${e.group === "date"}>${r("group_date")}</option>
        <option value="priority" ?selected=${e.group === "priority"}>${r("group_priority")}</option>
      </select>
      <h3>${r("filter_parents")}</h3>
      ${this._checks("parents", this._parents)}
      <h3>${r("filter_people")}</h3>
      ${this._checks("people", i)}`;
  }
};
Ct.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _parents: { state: !0 }
}, Ct.styles = Bo`
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
let eo = Ct;
pn("household-kanban-card-editor", eo);
const Ir = Bo`
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
`, Rr = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], it = (o) => `c-${Rr.includes(o) ? o : "grey"}`;
function st(o, e) {
  var t;
  return String(((t = o.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function Hr(o) {
  return o.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function ke(o, e = !1) {
  return p`<span class="dot ${e ? "sm" : ""} ${it((o == null ? void 0 : o.color) ?? "grey")}"><ha-icon .icon=${(o == null ? void 0 : o.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function ne(o, e, t = "", n = !1) {
  var a;
  if (!e) return p`<span class="ava none ${t}" title="-">+</span>`;
  const r = st(o, e), i = (a = o.states[e]) == null ? void 0 : a.attributes.entity_picture;
  if (typeof i == "string" && i) return p`<img class="ava ${t}" src=${i} alt=${n ? "" : r} title=${r} />`;
  const s = [...r].reduce((l, d) => (l * 31 + d.charCodeAt(0)) % 360, 7);
  return p`<span class="ava ${t}" title=${r} style="background:linear-gradient(135deg,hsl(${s} 55% 62%),hsl(${(s + 25) % 360} 55% 42%))">${Hr(r)}</span>`;
}
const Fr = p`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function bn(o, e, t = !1) {
  const n = o.status === "completed";
  return p`<button class="check ${t ? "xs" : ""}" type="button" aria-pressed=${n} aria-label=${o.summary}
    @click=${() => e.onToggle(o)}>${Fr}</button>`;
}
function Lr(o, e) {
  const { date: t, hasTime: n } = K(o.due), r = po(I(e.now), t);
  let i;
  return r === -1 ? i = _(e.lang, "yesterday") : r < -1 ? i = _(e.lang, "days_ago", { n: -r }) : r === 0 ? i = _(e.lang, "today") : r === 1 ? i = _(e.lang, "tomorrow") : i = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), n ? `${i} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : i;
}
function jr(o, e) {
  const t = po(new Date(o.completed_at), I(e.now));
  return t <= 0 ? _(e.lang, "done_today") : t === 1 ? _(e.lang, "done_yesterday") : _(e.lang, "done_days_ago", { n: t });
}
function mn(o, e, t) {
  const n = o.status === "completed", r = e.parents.find((d) => d.id === o.parent), i = I(e.now), s = !n && o.due && I(K(o.due).date) < i, a = !n && o.due && +I(K(o.due).date) == +i, l = p`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
  return p`<article class="card ${n ? "done" : ""}" data-uid=${o.uid} @click=${(d) => {
    d.target.closest(".check") || e.onOpen(o, d);
  }}>
    <div class="row">
      ${ke(r, !0)}
      <span class="parent-name">${(r == null ? void 0 : r.name) ?? o.parent}</span>
      ${ne(e.hass, o.assignee)}
    </div>
    <div class="row top">
      ${bn(o, e)}
      <button class="title" type="button">${o.summary}</button>
    </div>
    <div class="pills">
      ${!n && t ? p`<span class="pill prio-${o.priority} ${it(["", "red", "orange", "grey"][o.priority])}">${l}${_(e.lang, `prio_${o.priority}`)}</span>` : b}
      ${!n && o.moved > 0 ? p`<span class="pill c-orange">${_(e.lang, o.raised ? "moved_raised" : "moved", { n: o.moved })}</span>` : b}
      ${n && o.completed_at ? p`<span class="pill c-green">${jr(o, e)}</span>` : b}
      ${!n && o.due ? p`<span class="pill ${s ? "c-red" : a ? "today" : "later"}">${Lr(o, e)}</span>` : b}
    </div>
  </article>`;
}
function _n(o, e, t, n, r) {
  const i = t ? o.items : o.items.slice(0, 3), s = o.items.length - i.length;
  return p`<article class="card">
    <div class="row">
      ${ke(o.parent)}
      <span class="stack-head">${o.parent.name}</span>
      <span class="stack-sub">${o.items.length}</span>
    </div>
    <div class="stack-rows">
      ${i.map((a) => p`<div class="item">
        ${bn(a, e, !0)}
        <span class="t">${a.summary}</span>
        ${a.assignee ? ne(e.hass, a.assignee, "xs") : b}
      </div>`)}
      ${s > 0 ? p`<button class="link" type="button" @click=${() => n(o.parent.id, !0)}>${_(e.lang, "more", { n: s })}</button>` : b}
      ${t && o.items.length > 3 ? p`<button class="link muted" type="button" @click=${() => n(o.parent.id, !1)}>${_(e.lang, "collapse")}</button>` : b}
    </div>
    <button class="link" type="button" @click=${() => r(o.parent.id)}>${_(e.lang, "open_list")} ›</button>
  </article>`;
}
function vn(o) {
  return {
    uid: o.uid,
    status: o.status,
    heading: o.summary,
    parent: o.parent,
    summary: o.summary,
    description: o.description,
    priority: o.priority,
    assignee: o.assignee,
    date: o.due ? te(K(o.due).date) : "",
    time: kr(o.due),
    confirmDelete: !1
  };
}
function Ur(o, e = {}) {
  return { status: "needs_action", heading: "", parent: o, summary: "", description: "", priority: 2, assignee: null, date: "", time: "", confirmDelete: !1, ...e };
}
function yn(o) {
  return {
    summary: o.summary.trim(),
    description: o.description,
    due: wr(o.date, o.date ? o.time : ""),
    priority: o.priority,
    assignee: o.assignee,
    parent: o.parent
  };
}
function Fo(o, e) {
  const t = yn(e), n = vn(o), r = {};
  return t.summary !== o.summary && (r.summary = t.summary), t.description !== o.description && (r.description = t.description), (e.date !== n.date || e.time !== n.time) && (r.due = t.due), t.priority !== o.priority && (r.priority = t.priority), t.assignee !== o.assignee && (r.assignee = t.assignee), t.parent !== o.parent && (r.parent = t.parent), r;
}
function vt(o, e) {
  const t = I(e);
  return o === "none" ? "" : te(o === "today" ? t : o === "tomorrow" ? G(t, 1) : G(t, (6 - t.getDay() + 7) % 7));
}
const Br = p`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
function qr(o, e) {
  const t = (s) => _(e.lang, s), n = !o.uid, r = ["today", "tomorrow", "weekend", "none"], i = (s) => {
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

      <label class="field"><span class="dlg-label">${t("f_note")}</span>
        <textarea rows="3" .value=${o.description} placeholder=${t("f_note_ph")}
          @input=${(s) => e.onChange({ description: s.target.value })}></textarea></label>

      <div class="field"><span class="dlg-label">${t("f_parent")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_parent")}>
          ${e.parents.map((s) => p`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${o.parent === s.id}
            @click=${() => e.onChange({ parent: s.id })}>${ke(s, !0)}${s.name}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_prio")}</span>
        <div class="seg3" role="radiogroup" aria-label=${t("f_prio")}>
          ${[1, 2, 3].map((s) => p`<button type="button" role="radio" aria-checked=${o.priority === s}
            class="prio-${s}" @click=${() => e.onChange({ priority: s })}>${Br}${t(`prio_${s}`)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_due")}</span>
        <div class="chips">
          ${r.map((s) => p`<button class="pill-btn ${vt(s, e.now) === o.date ? "on" : ""}" type="button"
            aria-pressed=${vt(s, e.now) === o.date}
            @click=${() => e.onChange({ date: vt(s, e.now), ...s === "none" ? { time: "" } : {} })}>${t(`q_${s}`)}</button>`)}
          <label class="pill-input"><span class="vis-hidden">${t("f_date")}</span>
            <input type="date" .value=${o.date} @input=${(s) => e.onChange({ date: s.target.value })} /></label>
          <label class="pill-input"><span class="vis-hidden">${t("f_time")}</span>
            <input type="time" .value=${o.time} ?disabled=${!o.date} @input=${(s) => e.onChange({ time: s.target.value })} /></label>
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_who")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_who")}>
          <button class="chip dlg-chip" type="button" role="radio" aria-checked=${o.assignee === null}
            @click=${() => e.onChange({ assignee: null })}>${ne(e.hass, null, "", !0)}${t("unassigned")}</button>
          ${e.people.map((s) => p`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${o.assignee === s}
            @click=${() => e.onChange({ assignee: s })}>${ne(e.hass, s, "", !0)}${st(e.hass, s)}</button>`)}
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
function Lo(o) {
  if (!o.due) return 1 / 0;
  const { date: e, hasTime: t } = K(o.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function Et(o, e) {
  const t = Lo(o), n = Lo(e);
  return t !== n ? t < n ? -1 : 1 : o.priority - e.priority || +new Date(o.created_at) - +new Date(e.created_at);
}
function xn(o, e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const i of o) {
    const s = e.find((l) => l.id === i.parent);
    if (!(s != null && s.collapse) || s.id === t) {
      n.push(i);
      continue;
    }
    let a = r.get(s.id);
    a || (a = { parent: s, items: [] }, r.set(s.id, a), n.push(a)), a.items.push(i);
  }
  return n;
}
const Yr = ["todo", "later", "week", "overdue", "today", "done"], wn = (o, e) => +new Date(e.completed_at ?? 0) - +new Date(o.completed_at ?? 0);
function Wr(o, e, t) {
  const { ctx: n } = e, r = o.filter((l) => l.status === "needs_action"), i = o.filter((l) => xe(l, n) === "done").sort(wn), s = o.filter((l) => l.status === "completed").length - i.length, a = e.group === "date" ? Yr.filter((l) => l !== "done" && (l === "todo" || n.enabled.has(l))).map((l) => ({
    id: l,
    label: _(t, `col_${l}`),
    led: l === "overdue" ? "rgb(var(--c-red))" : l === "week" || l === "today" ? "var(--kb-accent)" : void 0,
    items: r.filter((d) => xe(d, n) === l).sort(Et)
  })) : [1, 2, 3].map((l) => ({
    id: `p${l}`,
    label: _(t, `prio_${l}`),
    led: l === 1 ? "rgb(var(--c-red))" : l === 2 ? "rgb(var(--c-orange))" : void 0,
    items: r.filter((d) => d.priority === l).sort(Et)
  }));
  return n.enabled.has("done") && a.push({ id: "done", label: _(t, "col_done"), led: "rgb(var(--c-green))", items: i, done: !0 }), { cols: a, olderDone: s };
}
function Xr(o, e, t) {
  const { cols: n, olderDone: r } = Wr(o, e, t.lang);
  return p`<div class="board">${n.map((i) => {
    const s = i.done ? i.items : xn(i.items, e.board.parents, e.parent);
    return p`<section class="col" data-col=${i.id}>
      <div class="col-head">
        <span class="led" style=${i.led ? `background:${i.led}` : ""}></span>
        <span class="label">${i.label}</span><span class="count">${i.items.length}</span>
        ${i.done || i.id === "overdue" ? b : p`<button class="add" type="button" aria-label=${`${_(t.lang, "add_here")}: ${i.label}`} @click=${() => e.onAdd(i.id)}>+</button>`}
      </div>
      ${s.map((a) => "items" in a ? _n(a, t, e.expanded.has(a.parent.id), e.onExpand, e.onFocus) : mn(a, t, e.group === "date"))}
      ${i.done ? p`<button class="note note-btn" type="button" @click=${e.onHistory}>${_(t.lang, "done_note", { days: e.ctx.doneDays, older: r })}</button>` : b}
      ${!i.done && s.length === 0 ? p`<div class="empty">${_(t.lang, "nothing")}</div>` : b}
    </section>`;
  })}</div>`;
}
const Gr = ["today", "week", "todo", "done"];
function Vr(o, e) {
  return p`<dialog class="sheet kb-sheet" aria-label=${o.title}
    @cancel=${(t) => {
    t.preventDefault(), o.onCancel();
  }}
    @click=${(t) => {
    t.target === t.currentTarget && o.onClose();
  }}>
    <div class="grabber"><span></span></div>
    <div class="sheet-head">
      <span class="dot ${it(o.color)}"><ha-icon .icon=${o.icon}></ha-icon></span>
      <h2>${o.title}</h2>
      <span class="count">${o.count}</span>
      <button class="round-btn sclose" type="button" aria-label=${_(e.lang, "close")} @click=${o.onClose}>✕</button>
    </div>
    <div class="sheet-list" @pointerdown=${o.press.down} @pointermove=${o.press.move} @pointerup=${o.press.end}
      @pointercancel=${o.press.end} @pointerleave=${o.press.end} @contextmenu=${(t) => t.preventDefault()}>
      ${o.entries.map((t) => "items" in t ? _n(t, e, o.expanded.has(t.parent.id), o.onExpand, o.onFocus) : mn(t, e, !0))}
      ${o.entries.length === 0 ? p`<div class="empty">${_(e.lang, "nothing")}</div>` : b}
      ${o.isDone ? p`<button class="pill-btn hist-link" type="button" @click=${o.onHistory}>${_(e.lang, "older_history", { n: o.olderDone })}</button>` : b}
    </div>
    ${o.menu ? Zr(o.menu, o, e) : b}
  </dialog>`;
}
function Zr(o, e, t) {
  return p`<div class="menu-wrap" @click=${(n) => {
    n.target === n.currentTarget && e.onMenuClose();
  }}>
    <div class="menu" role="group" aria-label=${_(t.lang, "move_to")}>
      <div class="menu-title">${_(t.lang, "move_to")}<small>${o.summary}</small></div>
      ${Gr.map((n) => p`<button class="menu-btn" type="button" data-move=${n} @click=${() => e.onMove(o, n)}>${_(t.lang, `col_${n}`)}</button>`)}
      <button class="menu-btn muted" type="button" @click=${e.onMenuClose}>${_(t.lang, "cancel")}</button>
    </div>
  </div>`;
}
function Kr(o, e, t = []) {
  const n = { todo: 0, later: 0, week: 0, today: 0, overdue: 0, done: 0 }, r = I(e.now), i = [];
  let s = 0;
  for (const d of o) {
    const h = xe(d, e);
    h && n[h]++, h === "today" && i.push(d), h === "today" && d.due && I(K(d.due).date) < r && s++;
  }
  const a = new Set(t.filter((d) => d.collapse).map((d) => d.id)), l = i.filter((d) => !a.has(d.parent)).sort(Et).slice(0, 3);
  return { counts: n, overdue: s, preview: l };
}
const to = {
  today: { icon: "mdi:calendar-today", color: "blue" },
  overdue: { icon: "mdi:alert-circle-outline", color: "red" },
  week: { icon: "mdi:calendar-week", color: "indigo" },
  todo: { icon: "mdi:format-list-checks", color: "teal" },
  later: { icon: "mdi:calendar-clock", color: "purple" },
  done: { icon: "mdi:check-circle-outline", color: "green" }
}, Jr = ["today", "overdue", "week", "todo", "later", "done"];
function Qr(o, e) {
  const t = Kr(o.items, o.ctx, e.parents), n = o.items.filter((r) => r.status === "needs_action");
  return p`<div class="tiles-view">
    <div class="people ${o.who ? "has-filter" : ""}" role="group" aria-label=${_(e.lang, "filter_people")}>
      ${o.people.map((r) => {
    const i = o.who === r;
    return p`<button class="person" type="button" aria-pressed=${i} @click=${() => o.onWho(i ? null : r)}>
          ${ne(e.hass, r, "lg", !0)}<span>${st(e.hass, r)}</span></button>`;
  })}
    </div>
    <div class="tiles">
      ${Jr.filter((r) => o.ctx.enabled.has(r)).map((r) => {
    const i = r === "today" || r === "done", s = r === "today" ? t.overdue : 0;
    return p`<button class="tile ${i ? "wide" : ""} ${it(to[r].color)}" type="button" data-tile=${r} @click=${() => o.onTile(r)}>
          <span class="row">
            <span class="dot"><ha-icon .icon=${to[r].icon}></ha-icon></span>
            <span class="tile-label">${_(e.lang, `col_${r}`)}</span>
            ${s > 0 ? p`<span class="pill c-red">${Ae(e.lang, "sum_overdue", s)}</span>` : b}
          </span>
          <span class="tile-count">${t.counts[r]}</span>
          ${r === "today" ? p`<span class="preview">${t.preview.map((a) => p`<span class="row">
            <span class="mark"></span><span class="t">${a.summary}</span>${a.assignee ? ne(e.hass, a.assignee, "xs", !0) : b}</span>`)}</span>` : b}
        </button>`;
  })}
    </div>
    <span class="dlg-label tiles-h">${_(e.lang, "lists")}</span>
    <div class="plist">
      ${e.parents.map((r) => p`<button class="prow" type="button" data-parent=${r.id} @click=${() => o.onParent(r.id)}>
        ${ke(r)}<span class="pname">${r.name}</span>
        <span class="pcount">${n.filter((i) => i.parent === r.id).length}</span><span aria-hidden="true">›</span></button>`)}
    </div>
  </div>`;
}
function ei(o, e, t, n, r) {
  const i = n.filter((a) => a.status === "needs_action" && (!e.who || a.assignee === e.who)), s = (a) => {
    const l = e.parent === ((a == null ? void 0 : a.id) ?? null), d = i.filter((h) => !a || h.parent === a.id).length;
    return p`<button class="chip ${a ? it(a.color) : ""}" type="button" aria-pressed=${l}
      @click=${() => r({ parent: l ? null : (a == null ? void 0 : a.id) ?? null })}>
      ${ke(a ?? void 0)}<span>${(a == null ? void 0 : a.name) ?? _(o.lang, "all_parents")}</span><b>${d}</b></button>`;
  };
  return p`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${_(o.lang, "filter_people")}>
      ${t.map((a) => {
    const l = e.who === a;
    return p`<button class="person" type="button" aria-pressed=${l} @click=${() => r({ who: l ? null : a })}>
          ${ne(o.hass, a, "lg", !0)}<span>${st(o.hass, a)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${_(o.lang, "filter_parents")}>
      ${s(null)}${o.parents.map((a) => s(a))}
    </div>
    <div class="seg" role="group" aria-label=${_(o.lang, "group_label")}>
      ${["date", "priority"].map((a) => p`<button type="button" aria-pressed=${e.group === a}
        @click=${() => r({ group: a })}>${_(o.lang, `group_${a}`)}</button>`)}
    </div>
  </div>`;
}
function ti(o, e, t, n) {
  const r = I(e), i = G(r, -((r.getDay() - n + 7) % 7)), s = G(i, -7), a = new Intl.DateTimeFormat(t, { month: "long", year: "numeric" }), l = /* @__PURE__ */ new Map();
  for (const d of o) {
    const h = new Date(d.completed_at ?? 0);
    let c, g;
    h >= i ? (c = "this", g = _(t, "col_week")) : h >= s ? (c = "last", g = _(t, "hist_last_week")) : (c = `${h.getFullYear()}-${h.getMonth()}`, g = a.format(h), t.startsWith("cs") && (g = g.toLocaleLowerCase("cs")));
    const x = l.get(c) ?? { label: g, items: [] };
    x.items.push(d), l.set(c, x);
  }
  return [...l.values()];
}
const oi = p`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path></svg>`;
function ni(o, e) {
  const t = (a) => _(e.lang, a), n = new Intl.DateTimeFormat(e.lang, { day: "numeric", month: "short" }), r = (a) => {
    a.target === a.currentTarget && e.onClose();
  }, i = (a) => e.parents.find((l) => l.id === a), s = ti(o.items, e.now, e.lang, e.firstDay);
  return p`<dialog class="kb-dialog kb-history" aria-labelledby="kb-hist-title" @close=${e.onClose} @click=${r}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><h2 id="kb-hist-title" class="hist-title">${t("history")}</h2>
          <span class="hist-sub">${_(e.lang, "hist_total", { n: o.total })}</span></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      ${o.error ? p`<div class="notice" role="alert">${t(o.error)}</div>` : b}
      <label class="hist-search">
        <span class="vis-hidden">${t("hist_search")}</span>
        <input type="search" autocomplete="off" .value=${o.search} placeholder=${t("hist_search_ph")}
          @input=${(a) => e.onSearch(a.target.value)} />
      </label>
      <div class="chips" role="group" aria-label=${t("filter_parents")}>
        <button class="pill-btn" type="button" aria-pressed=${o.parent === null} @click=${() => e.onParent(null)}>${t("all_parents")}</button>
        ${e.parents.map((a) => p`<button class="pill-btn hist-chip" type="button" aria-pressed=${o.parent === a.id}
          @click=${() => e.onParent(a.id)}>${ke(a, !0)}${a.name}</button>`)}
      </div>
      <div class="hist-list">
        ${s.map((a) => p`<section class="hist-group">
          <h3 class="dlg-label">${a.label}</h3>
          <ul class="hist-rows">${a.items.map((l) => {
    var d;
    return p`<li class="hist-row" data-uid=${l.uid}>
            <span class="hist-check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>
            <div class="hist-text"><span class="hist-name">${l.summary}</span>
              <span class="hist-meta">${((d = i(l.parent)) == null ? void 0 : d.name) ?? l.parent} · ${l.completed_at ? n.format(new Date(l.completed_at)) : ""}</span></div>
            ${l.assignee ? ne(e.hass, l.assignee) : b}
            <button class="hist-reopen" type="button" title=${t("reopen")} aria-label=${`${t("reopen")}: ${l.summary}`}
              @click=${() => e.onReopen(l)}>${oi}</button>
          </li>`;
  })}</ul>
        </section>`)}
        ${o.items.length === 0 && !o.loading && !o.error ? p`<div class="empty hist-empty">${t("hist_empty")}</div>` : b}
        ${o.items.length < o.total ? p`<button class="pill-btn hist-more" type="button" ?disabled=${o.loading} @click=${e.onMore}>${t("hist_more")}</button>` : b}
      </div>
    </div>
  </dialog>`;
}
const ri = ["todo", "later", "week", "today", "done"], ii = [["board", "tab_board"], ["eod", "tab_eod"], ["lists", "tab_lists"]], si = "M3 5h18v12H3zM8 21h8M12 17v4", ai = "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", Dt = (o, e = 16) => p`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${o}></path></svg>`;
function kn(o, e, t, n, r = !1) {
  return p`<button class="switch" type="button" role="switch" aria-checked=${o} aria-label=${e} ?disabled=${r}
    data-col=${n.col ?? b} data-parent=${n.parent ?? b} @click=${t}></button>`;
}
function Wt(o, e, t) {
  return p`<div class="scope ${e ? "household" : "dashboard"}" role="note">
    ${Dt(e ? ai : si)}
    <span class="scope-text"><b>${_(o, e ? "scope_household" : "scope_dashboard")}</b><span>${_(o, t)}</span></span>
  </div>`;
}
function li(o, e) {
  const t = (s) => _(e.lang, s), n = o.columns ?? [], r = (s, a, l, d) => p`
    <div class="set-line"><span class="grow">${s}</span>
      <div class="seg" role="radiogroup" aria-label=${s}>
        ${a.map(([h, c]) => p`<button type="button" role="radio" aria-checked=${h === l} @click=${() => d(h)}>${c}</button>`)}
      </div>
    </div>`, i = ["sort_due", "f_prio", "sort_created"];
  return p`
    <section class="set-sec">
      <h3 class="dlg-label">${t("columns")}</h3>
      <div class="set-rows">${ri.map((s) => p`<div class="set-row">
        <span class="led led-${s}"></span>
        <span class="set-text"><span class="set-name">${t(`col_${s}`)}</span><span class="set-hint">${t(`col_hint_${s}`)}</span></span>
        ${kn(
    s === "todo" || n.includes(s),
    t(`col_${s}`),
    () => e.onChange({ columns: n.filter((a) => a !== s).concat(n.includes(s) ? [] : [s]) }),
    { col: s },
    s === "todo"
  )}
      </div>`)}</div>
      ${n.includes("done") ? p`
        ${r(t("done_keep"), uo.map((s) => [s, Ae(e.lang, "days", s)]), o.done_days, (s) => e.onChange({ done_days: s }))}
        <span class="set-hint pad">${t("done_keep_hint")}</span>` : b}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("view")}</h3>
      ${r(t("group_label"), [["date", t("group_date")], ["priority", t("group_priority")]], o.group, (s) => e.onChange({ group: s }))}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("sort_order")}</h3>
      <div class="sort-keys">${i.map((s, a) => p`${a ? Dt("M9 6l6 6-6 6") : b}<span class="sort-key"><span class="sort-n">${a + 1}</span>${t(s)}</span>`)}</div>
      <span class="set-hint pad">${t("sort_hint")}</span>
    </section>`;
}
function di(o, e) {
  const t = (r) => _(e.lang, r), n = e.parents.map((r) => r.id);
  return p`
    <section class="set-sec">
      <h3 class="dlg-label">${t("lists_here")}</h3>
      <div class="set-rows">${e.parents.map((r) => {
    const i = !o.parents || o.parents.includes(r.id);
    return p`<div class="set-row">
          ${ke(r)}
          <span class="set-text"><span class="set-name">${r.name}</span><span class="set-hint mono">${r.entity_id}</span></span>
          ${r.collapse ? p`<span class="set-badge">${t("collapse")}</span>` : b}
          ${kn(i, _(e.lang, "show_list", { name: r.name }), () => e.onChange({ parents: Qt(o.parents, n, r.id, !i) }), { parent: r.id })}
          <button class="icon-btn edit-list" type="button" aria-label=${t("edit_list")} disabled>${Dt("M4 20h4L19 9l-4-4L4 16zM14 6l4 4")}</button>
        </div>`;
  })}</div>
      <button class="add-list" type="button" disabled>${Dt("M12 5v14M5 12h14", 14)}${t("add_list")}</button>
      <span class="set-hint pad">${t("lists_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("people_filter")}</h3>
      <div class="chips">${e.people.map((r) => {
    const i = !o.people || o.people.includes(r);
    return p`<button class="pill-btn person-chip" type="button" aria-pressed=${i} data-person=${r}
          @click=${() => e.onChange({ people: Qt(o.people, e.people, r, !i) })}>${ne(e.hass, r, "", !0)}${st(e.hass, r)}</button>`;
  })}</div>
    </section>`;
}
function ci(o, e) {
  const t = (i) => _(e.lang, i), n = (i) => {
    i.target === i.currentTarget && e.onClose();
  }, r = o.tab === "board" ? p`${Wt(e.lang, !1, "scope_dashboard_hint")}${li(o.draft, e)}` : o.tab === "lists" ? p`${Wt(e.lang, !1, "scope_lists_hint")}${di(o.draft, e)}` : p`${Wt(e.lang, !0, "scope_household_hint")}<p class="set-hint pad">${t("eod_soon")}</p>`;
  return p`<dialog class="kb-dialog kb-settings ${o.narrow ? "narrow" : ""}" aria-labelledby="kb-set-title" @close=${e.onClose} @click=${n}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><span class="dlg-kicker">${t("settings")}</span>
          <h2 id="kb-set-title" class="hist-title">${t("title")} · ${t("settings")}</h2></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      <div class="set-tabs" role="tablist" aria-label=${t("settings")}>
        ${ii.map(([i, s]) => p`<button type="button" role="tab" data-tab=${i} aria-selected=${o.tab === i} @click=${() => e.onTab(i)}>${t(s)}</button>`)}
      </div>
      <div class="set-body" role="tabpanel">${r}</div>
      ${o.error ? p`<div class="notice" role="alert">${t(o.error)}</div>` : b}
      <div class="dlg-foot">
        <span class="grow"></span>
        <button class="pill-btn" type="button" @click=${e.onClose}>${t("cancel")}</button>
        <button class="primary-btn" type="button" ?disabled=${o.saving} @click=${e.onSave}>${t("save")}</button>
      </div>
    </div>
  </dialog>`;
}
const hi = 50, pi = 600, ui = 500, fi = p`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`, At = class At extends Te {
  constructor() {
    super(), this._filter = { who: null, parent: null, group: "date" }, this._expanded = /* @__PURE__ */ new Set(), this._loadFailed = !1, this._busy = !1, this._narrow = !1, this._raw = {}, this._sheetShown = !1, this._menuShown = !1, this._lpFired = !1, this._hq = 0, this._hMore = null, this._sortables = /* @__PURE__ */ new Map(), this._seq = 0, this._attempts = 0, this.addEventListener("pointerdown", (e) => {
      this._down = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    }, !0);
  }
  static getConfigElement() {
    return document.createElement("household-kanban-card-editor");
  }
  static getStubConfig() {
    return Me({ type: "custom:household-kanban-card" });
  }
  setConfig(e) {
    const t = Me(e);
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
      t > 0 && (this._narrow = t < pi), this._narrow || this._closeSheet();
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
    const e = cn(this.hass, (t) => {
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
      }, hn(this._attempts++)));
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
    this._dialogWrite("err_save", () => n ? Yt(e, n.uid, Fo(n, t)) : mr(e, yn(t)));
  }
  /** Tap on a card; a click that ends a drag is not a tap. */
  _open(e, t) {
    const n = t, r = this._down;
    if (this._down = void 0, this._lpFired) {
      this._lpFired = !1;
      return;
    }
    n.detail !== 0 && r && Io(n.clientX - r.x, n.clientY - r.y, t.timeStamp - r.t) || this._openDialog(vn(e), () => {
      var i;
      return (i = [...this.renderRoot.querySelectorAll("[data-uid]")].find((s) => s.dataset.uid === e.uid)) == null ? void 0 : i.querySelector(".title");
    });
  }
  _openDialog(e, t) {
    this._seq++, this._busy = !1, this._dlgError = void 0, this._returnTo = t, this._draft = e;
  }
  _openSettings() {
    this._draft || this._hist || this._settings || !this._config || (this._seq++, this._returnTo = () => this.renderRoot.querySelector("header .gear-btn"), this._settings = { tab: "board", draft: { ...this._config }, saving: !1, narrow: this._narrow });
  }
  /** Write the draft into this card's entry of the dashboard config; HA reloads the dashboard after the save. */
  async _saveSettings() {
    const e = this.hass, t = this._settings, n = this._seq;
    if (!e || !t || t.saving) return;
    const r = (s) => {
      n === this._seq && this._settings && (this._settings = { ...this._settings, ...s });
    };
    r({ saving: !0, error: void 0 });
    const i = Or(window.location.pathname);
    try {
      const s = await vr(e, i);
      if (s && typeof s == "object" && "strategy" in s) {
        r({ saving: !1, error: "err_not_editable" });
        return;
      }
      const a = un(this._raw, Me(t.draft)), l = Mr(s, this._raw, a);
      if (l.matches !== 1) {
        r({ saving: !1, error: l.matches ? "err_card_ambiguous" : "err_card_missing" });
        return;
      }
      if (await yr(e, i, l.config), n !== this._seq) return;
      this.setConfig(a), this._settings = void 0;
    } catch (s) {
      console.warn("household_kanban: dashboard save failed", s);
      const a = s, l = (a == null ? void 0 : a.code) === "config_not_editable" || (a == null ? void 0 : a.code) === "config_not_found" || /yaml/i.test((a == null ? void 0 : a.message) ?? "");
      r({ saving: !1, error: l ? "err_not_editable" : "err_settings" });
    }
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
      const i = await br(t, {
        search: n.search.trim() || void 0,
        parent: n.parent ?? void 0,
        offset: e ? 0 : n.items.length,
        limit: hi
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
    t && pt(t, e, "needs_action").then(() => {
      const n = this._hist;
      !n || !n.items.some((r) => r.uid === e) || (this._hist = { ...n, items: n.items.filter((r) => r.uid !== e), total: Math.max(0, n.total - 1), error: void 0 });
    }, (n) => {
      console.warn("household_kanban: reopen failed", n), this._hist && (this._hist = { ...this._hist, error: "err_reopen" });
    });
  }
  /** Load the next page when the "Load more" button scrolls into view; the button itself is the fallback. */
  _observeMore() {
    var n, r, i, s;
    const e = this.renderRoot.querySelector(".hist-more"), t = ((n = this._hist) == null ? void 0 : n.items.length) ?? 0;
    if (!e || (r = this._hist) != null && r.loading) {
      e || ((i = this._hObs) == null || i.disconnect(), this._hMore = null);
      return;
    }
    ((s = this._hMore) == null ? void 0 : s.el) === e && this._hMore.n === t || (this._hMore = { el: e, n: t }, !(typeof IntersectionObserver > "u") && (this._hObs ?? (this._hObs = new IntersectionObserver((a) => {
      a.some((l) => l.isIntersecting) && this._loadHistory(!1);
    })), this._hObs.disconnect(), this._hObs.observe(e)));
  }
  _add(e, t, n, r = `.col[data-col="${e}"] .add`) {
    var d, h;
    const i = () => this.renderRoot.querySelector(r), s = this._filter.parent ?? ((d = t.find((c) => c.id === "household")) == null ? void 0 : d.id) ?? ((h = t[0]) == null ? void 0 : h.id);
    if (!s) return;
    const a = /^p([123])$/.exec(e), l = {
      today: vt("today", n.now),
      week: te(n.week.end),
      later: te(G(n.week.end, 1))
    };
    this._openDialog(Ur(s, a ? { priority: Number(a[1]) } : { date: l[e] ?? "" }), i);
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
    const n = this.hass, r = this._ctx, i = (c = this._board) == null ? void 0 : c.items.find((g) => g.uid === e);
    if (!n || !r || !i || !t) return;
    const s = /^p([123])$/.exec(t), a = Dr(i, s ? Number(s[1]) : t, r);
    if (!a) return;
    const { status: l, ...d } = a;
    (async () => {
      Object.keys(d).length && await Yt(n, i.uid, d), l && await pt(n, i.uid, l);
    })().catch((g) => {
      console.warn("household_kanban: drop failed", g), this._fail("err_update");
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
    !r || t.closest(".check") || (this._lp = { x: e.clientX, y: e.clientY, timer: window.setTimeout(() => {
      this._lp = void 0, this._lpFired = !0, this._menu = r, this._menuFor = r;
    }, ui) });
  }
  _lpMove(e) {
    const t = this._lp;
    t && Io(e.clientX - t.x, e.clientY - t.y) && this._lpCancel();
  }
  _lpCancel() {
    this._lp && window.clearTimeout(this._lp.timer), this._lp = void 0;
  }
  /** Focus handling for the sheet and its menu; the native dialog, when open, owns the focus. */
  _sheetFocus(e) {
    var r, i, s, a;
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
      (a = ((s = [...this.renderRoot.querySelectorAll(".sheet [data-uid]")].find((h) => h.dataset.uid === l)) == null ? void 0 : s.querySelector(".title")) ?? this.renderRoot.querySelector(".sheet .sclose")) == null || a.focus();
    }
  }
  updated() {
    var n, r, i, s;
    this._syncSortables(), this._observeMore();
    const e = this.renderRoot.querySelector("dialog.kb-sheet");
    e && !e.open && e.showModal();
    const t = this.renderRoot.querySelector("dialog.kb-dialog");
    if (this._sheetFocus(!!t), t && !t.open)
      t.showModal(), this._hist ? (n = this.renderRoot.querySelector(".kb-history input")) == null || n.focus() : (r = this._draft) != null && r.uid || (i = this.renderRoot.querySelector("#kb-title")) == null || i.focus();
    else if (!t && this._returnTo) {
      const a = this._returnTo;
      this._returnTo = void 0, (s = a()) == null || s.focus();
    }
  }
  render() {
    var k, m;
    const e = this.hass, t = this._config, n = this._board;
    if (!e || !t) return b;
    const r = ((k = e.locale) == null ? void 0 : k.language) ?? e.language ?? "en";
    if (!n) return p`<ha-card><div class="loading">${_(r, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const i = /* @__PURE__ */ new Date(), s = n.parents.filter((f) => !t.parents || t.parents.includes(f.id)), a = new Set(t.columns ?? []);
    a.add("todo"), n.end_of_day_mode === "overdue" && a.add("overdue");
    const l = {
      now: i,
      enabled: a,
      mode: n.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: $r(i, No(e.locale))
    };
    this._ctx = l;
    const d = {
      hass: e,
      lang: r,
      now: i,
      parents: s,
      onOpen: (f, E) => this._open(f, E),
      onToggle: (f) => {
        pt(e, f.uid, f.status === "completed" ? "needs_action" : "completed").catch((E) => {
          console.warn("household_kanban: set_status failed", E), this._fail("err_update");
        });
      }
    }, h = t.people ?? Object.keys(e.states).filter((f) => f.startsWith("person.")), c = this._filter, g = n.items.filter((f) => s.some((E) => E.id === f.parent)), x = g.filter((f) => (!c.who || f.assignee === c.who) && (!c.parent || f.parent === c.parent));
    return p`<ha-card>
      ${this._notice ? p`<div class="notice" role="alert">${_(r, this._notice)}</div>` : b}
      <header>
        <div class="titles"><h1>${_(r, "title")}</h1><div class="summary">${this._summary(g, l, r)}</div></div>
        ${(m = e.user) != null && m.is_admin ? p`<button class="round-btn gear-btn" type="button" aria-label=${_(r, "settings")} title=${_(r, "settings")}
          @click=${() => this._openSettings()}>${fi}</button>` : b}
        <button class="pill-btn hist-btn" type="button" @click=${() => this._openHistory("header .hist-btn")}>${_(r, "history")}</button>
        <button class="new" type="button" @click=${() => this._add("todo", s, l, "header .new")}>+ ${_(r, "new_note")}</button>
      </header>
      ${this._narrow ? this._renderNarrow(d, l, g, h, s) : p`
      ${ei(d, c, h, g, (f) => {
      this._filter = { ...c, ...f };
    })}
      ${Xr(x, {
      board: { ...n, parents: s },
      ctx: l,
      group: c.group,
      who: c.who,
      parent: c.parent,
      expanded: this._expanded,
      onExpand: (f, E) => {
        const A = new Set(this._expanded);
        E ? A.add(f) : A.delete(f), this._expanded = A;
      },
      onFocus: (f) => {
        this._filter = { ...c, parent: f };
      },
      onAdd: (f) => this._add(f, s, l),
      onHistory: () => this._openHistory('.col[data-col="done"] .note-btn')
    }, d)}`}
      ${this._hist ? ni(this._hist, {
      hass: e,
      lang: r,
      now: i,
      parents: s,
      firstDay: No(e.locale),
      onSearch: (f) => this._histFilter({ search: f }, 300),
      onParent: (f) => this._histFilter({ parent: f }, 0),
      onReopen: (f) => this._reopen(f.uid),
      onMore: () => void this._loadHistory(!1),
      onClose: () => this._closeHistory()
    }) : b}
      ${this._settings ? ci({ ...this._settings, narrow: this._narrow }, {
      hass: e,
      lang: r,
      parents: n.parents,
      people: Object.keys(e.states).filter((f) => f.startsWith("person.")),
      onTab: (f) => {
        this._settings && (this._settings = { ...this._settings, tab: f });
      },
      onChange: (f) => {
        this._settings && (this._settings = { ...this._settings, draft: { ...this._settings.draft, ...f }, error: void 0 });
      },
      onSave: () => void this._saveSettings(),
      onClose: () => {
        this._seq++, this._settings = void 0;
      }
    }) : b}
      ${this._draft ? qr(this._draft, {
      hass: e,
      lang: r,
      now: i,
      parents: s,
      people: h,
      busy: this._busy,
      error: this._dlgError,
      onChange: (f) => {
        this._draft && (this._draft = { ...this._draft, ...f });
      },
      onSave: () => this._save(),
      onClose: () => {
        this._draft = void 0;
      },
      onToggleDone: () => {
        var z;
        const f = this._draft, E = f == null ? void 0 : f.uid;
        if (!f || !E) return;
        const A = (z = this._board) == null ? void 0 : z.items.find((J) => J.uid === E);
        if (!A) {
          this._dlgError = "err_update";
          return;
        }
        const H = Fo(A, f);
        this._dialogWrite("err_update", async () => {
          Object.keys(H).length && await Yt(e, E, H), await pt(e, E, f.status === "completed" ? "needs_action" : "completed");
        });
      },
      onDelete: () => {
        const f = this._draft;
        f != null && f.uid && this._dialogWrite("err_delete", () => _r(e, f.uid));
      }
    }) : b}
    </ha-card>`;
  }
  /** Tiles + parents list, and the bottom sheet when one is open. */
  _renderNarrow(e, t, n, r, i) {
    const s = this._filter.who, a = n.filter((c) => !s || c.assignee === s);
    let l = this._sheet, d = b;
    const h = (l == null ? void 0 : l.kind) === "parent" ? i.find((c) => c.id === (l == null ? void 0 : l.id)) : void 0;
    if ((l == null ? void 0 : l.kind) === "parent" && !h && (l = void 0, queueMicrotask(() => this._closeSheet())), l) {
      const c = l.id, g = (m) => m.filter((f) => f.status === "needs_action").sort(Et), x = l.kind === "parent" ? g(a.filter((m) => m.parent === l.id)) : c === "done" ? a.filter((m) => xe(m, t) === "done").sort(wn) : g(a.filter((m) => xe(m, t) === c)), k = h ? { icon: h.icon, color: h.color, title: h.name } : { ...to[c], title: _(e.lang, `col_${c}`) };
      d = Vr({
        ...k,
        count: x.length,
        isDone: c === "done" && !h,
        entries: l.kind === "col" && c !== "done" ? xn(x, i, null) : x,
        olderDone: a.filter((m) => m.status === "completed").length - x.length,
        menu: this._menu ? a.find((m) => m.uid === this._menu) : void 0,
        expanded: this._expanded,
        onExpand: (m, f) => {
          const E = new Set(this._expanded);
          f ? E.add(m) : E.delete(m), this._expanded = E;
        },
        onFocus: (m) => this._openSheet("parent", m, this._sheetReturn ?? ""),
        onClose: () => this._closeSheet(),
        onCancel: () => this._sheetCancel(),
        onHistory: () => this._openHistory(".sheet .hist-link"),
        onMove: (m, f) => {
          this._closeMenu(), this._drop(m.uid, f);
        },
        onMenuClose: () => this._closeMenu(),
        press: { down: (m) => this._lpStart(m), move: (m) => this._lpMove(m), end: () => this._lpCancel() }
      }, e);
    }
    return p`${Qr({
      ctx: t,
      items: a,
      people: r,
      who: s,
      onWho: (c) => {
        this._filter = { ...this._filter, who: c };
      },
      onTile: (c) => this._openSheet("col", c, `.tile[data-tile="${c}"]`),
      onParent: (c) => this._openSheet("parent", c, `.prow[data-parent="${c}"]`)
    }, e)}${d}`;
  }
  _summary(e, t, n) {
    const r = e.filter((d) => d.status === "needs_action"), i = I(t.now), s = r.filter((d) => d.due && I(K(d.due).date) < i).length, a = r.filter((d) => xe(d, t) === "today").length, l = t.mode === "overdue" ? Ae(n, "sum_overdue", s) : Ae(n, "sum_moved", r.filter((d) => d.moved > 0).length);
    return [Ae(n, "sum_open", r.length), Ae(n, "sum_today", a), l].join(" · ");
  }
};
At.properties = {
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
}, At.styles = Ir;
let oo = At;
const no = "household-kanban-card";
pn(no, oo);
(window.customCards ?? (window.customCards = [])).some((o) => o.type === no) || window.customCards.push({ type: no, name: "Household Kanban", description: "Kanban board for household tasks" });
