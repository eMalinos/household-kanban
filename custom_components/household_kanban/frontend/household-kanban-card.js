/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = globalThis, pn = mt.ShadowRoot && (mt.ShadyCSS === void 0 || mt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, hn = Symbol(), wn = /* @__PURE__ */ new WeakMap();
let Qn = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== hn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (pn && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = wn.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && wn.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Fo = (n) => new Qn(typeof n == "string" ? n : n + "", void 0, hn), eo = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((o, i, r) => o + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new Qn(t, n, hn);
}, Lo = (n, e) => {
  if (pn) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), i = mt.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = t.cssText, n.appendChild(o);
  }
}, kn = pn ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return Fo(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: jo, defineProperty: qo, getOwnPropertyDescriptor: Bo, getOwnPropertyNames: Uo, getOwnPropertySymbols: Wo, getPrototypeOf: Yo } = Object, fe = globalThis, $n = fe.trustedTypes, Xo = $n ? $n.emptyScript : "", Ht = fe.reactiveElementPolyfillSupport, Ke = (n, e) => n, Qt = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Xo : null;
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
} }, to = (n, e) => !jo(n, e), Sn = { attribute: !0, type: String, converter: Qt, reflect: !1, useDefault: !1, hasChanged: to };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), fe.litPropertyMetadata ?? (fe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ce = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Sn) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(e, o, t);
      i !== void 0 && qo(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: i, set: r } = Bo(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: i, set(s) {
      const a = i == null ? void 0 : i.call(this);
      r == null || r.call(this, s), this.requestUpdate(e, a, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Sn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ke("elementProperties"))) return;
    const e = Yo(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ke("properties"))) {
      const t = this.properties, o = [...Uo(t), ...Wo(t)];
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
      for (const i of o) t.unshift(kn(i));
    } else e !== void 0 && t.push(kn(e));
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
    return Lo(e, this.constructor.elementStyles), e;
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
      const s = (((r = o.converter) == null ? void 0 : r.toAttribute) !== void 0 ? o.converter : Qt).toAttribute(t, o.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, s;
    const o = this.constructor, i = o._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = o.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : Qt;
      this._$Em = i;
      const d = l.fromAttribute(t, a.type);
      this[i] = d ?? ((s = this._$Ej) == null ? void 0 : s.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, i = !1, r) {
    var s;
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (r = this[e]), o ?? (o = a.getPropertyOptions(e)), !((o.hasChanged ?? to)(r, t) || o.useDefault && o.reflect && r === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(a._$Eu(e, o)))) return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: o, reflect: i, wrapped: r }, s) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), r !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
Ce.elementStyles = [], Ce.shadowRootOptions = { mode: "open" }, Ce[Ke("elementProperties")] = /* @__PURE__ */ new Map(), Ce[Ke("finalized")] = /* @__PURE__ */ new Map(), Ht == null || Ht({ ReactiveElement: Ce }), (fe.reactiveElementVersions ?? (fe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ze = globalThis, En = (n) => n, $t = Ze.trustedTypes, Dn = $t ? $t.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, no = "$lit$", de = `lit$${Math.random().toFixed(9).slice(2)}$`, oo = "?" + de, Vo = `<${oo}>`, $e = document, ot = () => $e.createComment(""), it = (n) => n === null || typeof n != "object" && typeof n != "function", un = Array.isArray, Go = (n) => un(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Ft = `[ 	
\f\r]`, We = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Cn = /-->/g, An = />/g, me = RegExp(`>|${Ft}(?:([^\\s"'>=/]+)(${Ft}*=${Ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Tn = /'/g, On = /"/g, io = /^(?:script|style|textarea|title)$/i, Ko = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), h = Ko(1), ze = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), Mn = /* @__PURE__ */ new WeakMap(), xe = $e.createTreeWalker($e, 129);
function ro(n, e) {
  if (!un(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Dn !== void 0 ? Dn.createHTML(e) : e;
}
const Zo = (n, e) => {
  const t = n.length - 1, o = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = We;
  for (let a = 0; a < t; a++) {
    const l = n[a];
    let d, p, c = -1, g = 0;
    for (; g < l.length && (s.lastIndex = g, p = s.exec(l), p !== null); ) g = s.lastIndex, s === We ? p[1] === "!--" ? s = Cn : p[1] !== void 0 ? s = An : p[2] !== void 0 ? (io.test(p[2]) && (i = RegExp("</" + p[2], "g")), s = me) : p[3] !== void 0 && (s = me) : s === me ? p[0] === ">" ? (s = i ?? We, c = -1) : p[1] === void 0 ? c = -2 : (c = s.lastIndex - p[2].length, d = p[1], s = p[3] === void 0 ? me : p[3] === '"' ? On : Tn) : s === On || s === Tn ? s = me : s === Cn || s === An ? s = We : (s = me, i = void 0);
    const _ = s === me && n[a + 1].startsWith("/>") ? " " : "";
    r += s === We ? l + Vo : c >= 0 ? (o.push(d), l.slice(0, c) + no + l.slice(c) + de + _) : l + de + (c === -2 ? a : _);
  }
  return [ro(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class rt {
  constructor({ strings: e, _$litType$: t }, o) {
    let i;
    this.parts = [];
    let r = 0, s = 0;
    const a = e.length - 1, l = this.parts, [d, p] = Zo(e, t);
    if (this.el = rt.createElement(d, o), xe.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = xe.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(no)) {
          const g = p[s++], _ = i.getAttribute(c).split(de), k = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: r, name: k[2], strings: _, ctor: k[1] === "." ? Qo : k[1] === "?" ? ei : k[1] === "@" ? ti : zt }), i.removeAttribute(c);
        } else c.startsWith(de) && (l.push({ type: 6, index: r }), i.removeAttribute(c));
        if (io.test(i.tagName)) {
          const c = i.textContent.split(de), g = c.length - 1;
          if (g > 0) {
            i.textContent = $t ? $t.emptyScript : "";
            for (let _ = 0; _ < g; _++) i.append(c[_], ot()), xe.nextNode(), l.push({ type: 2, index: ++r });
            i.append(c[g], ot());
          }
        }
      } else if (i.nodeType === 8) if (i.data === oo) l.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(de, c + 1)) !== -1; ) l.push({ type: 7, index: r }), c += de.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const o = $e.createElement("template");
    return o.innerHTML = e, o;
  }
}
function Ne(n, e, t = n, o) {
  var s, a;
  if (e === ze) return e;
  let i = o !== void 0 ? (s = t._$Co) == null ? void 0 : s[o] : t._$Cl;
  const r = it(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, t, o)), o !== void 0 ? (t._$Co ?? (t._$Co = []))[o] = i : t._$Cl = i), i !== void 0 && (e = Ne(n, i._$AS(n, e.values), i, o)), e;
}
class Jo {
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
    const { el: { content: t }, parts: o } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? $e).importNode(t, !0);
    xe.currentNode = i;
    let r = xe.nextNode(), s = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let d;
        l.type === 2 ? d = new st(r, r.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (d = new ni(r, this, e)), this._$AV.push(d), l = o[++a];
      }
      s !== (l == null ? void 0 : l.index) && (r = xe.nextNode(), s++);
    }
    return xe.currentNode = $e, i;
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
    e = Ne(this, e, t), it(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== ze && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Go(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && it(this._$AH) ? this._$AA.nextSibling.data = e : this.T($e.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: o } = e, i = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = rt.createElement(ro(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(t);
    else {
      const s = new Jo(i, this), a = s.u(this.options);
      s.p(t), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = Mn.get(e.strings);
    return t === void 0 && Mn.set(e.strings, t = new rt(e)), t;
  }
  k(e) {
    un(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, i = 0;
    for (const r of e) i === t.length ? t.push(o = new st(this.O(ot()), this.O(ot()), this, this.options)) : o = t[i], o._$AI(r), i++;
    i < t.length && (this._$AR(o && o._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = En(e).nextSibling;
      En(e).remove(), e = i;
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
  constructor(e, t, o, i, r) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = b;
  }
  _$AI(e, t = this, o, i) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) e = Ne(this, e, t, 0), s = !it(e) || e !== this._$AH && e !== ze, s && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = r[0], l = 0; l < r.length - 1; l++) d = Ne(this, a[o + l], t, l), d === ze && (d = this._$AH[l]), s || (s = !it(d) || d !== this._$AH[l]), d === b ? e = b : e !== b && (e += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    s && !i && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Qo extends zt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class ei extends zt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class ti extends zt {
  constructor(e, t, o, i, r) {
    super(e, t, o, i, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Ne(this, e, t, 0) ?? b) === ze) return;
    const o = this._$AH, i = e === b && o !== b || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, r = e !== b && (o === b || i);
    i && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ni {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ne(this, e);
  }
}
const Lt = Ze.litHtmlPolyfillSupport;
Lt == null || Lt(rt, st), (Ze.litHtmlVersions ?? (Ze.litHtmlVersions = [])).push("3.3.3");
const oi = (n, e, t) => {
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
const we = globalThis;
class Oe extends Ce {
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
var Jn;
Oe._$litElement$ = !0, Oe.finalized = !0, (Jn = we.litElementHydrateSupport) == null || Jn.call(we, { LitElement: Oe });
const jt = we.litElementPolyfillSupport;
jt == null || jt({ LitElement: Oe });
(we.litElementVersions ?? (we.litElementVersions = [])).push("4.2.2");
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Pn(n, e) {
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
    e % 2 ? Pn(Object(t), !0).forEach(function(o) {
      ii(n, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : Pn(Object(t)).forEach(function(o) {
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
function ii(n, e, t) {
  return e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function ie() {
  return ie = Object.assign || function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
    }
    return n;
  }, ie.apply(this, arguments);
}
function ri(n, e) {
  if (n == null) return {};
  var t = {}, o = Object.keys(n), i, r;
  for (r = 0; r < o.length; r++)
    i = o[r], !(e.indexOf(i) >= 0) && (t[i] = n[i]);
  return t;
}
function si(n, e) {
  if (n == null) return {};
  var t = ri(n, e), o, i;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    for (i = 0; i < r.length; i++)
      o = r[i], !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(n, o) && (t[o] = n[o]);
  }
  return t;
}
var ai = "1.15.6";
function ne(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var re = ne(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), at = ne(/Edge/i), zn = ne(/firefox/i), Je = ne(/safari/i) && !ne(/chrome/i) && !ne(/android/i), fn = ne(/iP(ad|od|hone)/i), so = ne(/chrome/i) && ne(/android/i), ao = {
  capture: !1,
  passive: !1
};
function E(n, e, t) {
  n.addEventListener(e, t, !re && ao);
}
function S(n, e, t) {
  n.removeEventListener(e, t, !re && ao);
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
function lo(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function V(n, e, t, o) {
  if (n) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? n.parentNode === t && St(n, e) : St(n, e)) || o && n === t)
        return n;
      if (n === t) break;
    } while (n = lo(n));
  }
  return null;
}
var Nn = /\s+/g;
function B(n, e, t) {
  if (n && e)
    if (n.classList)
      n.classList[t ? "add" : "remove"](e);
    else {
      var o = (" " + n.className + " ").replace(Nn, " ").replace(" " + e + " ", " ");
      n.className = (o + (t ? " " + e : "")).replace(Nn, " ");
    }
}
function y(n, e, t) {
  var o = n && n.style;
  if (o) {
    if (t === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? t = document.defaultView.getComputedStyle(n, "") : n.currentStyle && (t = n.currentStyle), e === void 0 ? t : t[e];
    !(e in o) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), o[e] = t + (typeof t == "string" ? "" : "px");
  }
}
function Me(n, e) {
  var t = "";
  if (typeof n == "string")
    t = n;
  else
    do {
      var o = y(n, "transform");
      o && o !== "none" && (t = o + " " + t);
    } while (!e && (n = n.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(t);
}
function co(n, e, t) {
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
    var r, s, a, l, d, p, c;
    if (n !== window && n.parentNode && n !== J() ? (r = n.getBoundingClientRect(), s = r.top, a = r.left, l = r.bottom, d = r.right, p = r.height, c = r.width) : (s = 0, a = 0, l = window.innerHeight, d = window.innerWidth, p = window.innerHeight, c = window.innerWidth), (e || t) && n !== window && (i = i || n.parentNode, !re))
      do
        if (i && i.getBoundingClientRect && (y(i, "transform") !== "none" || t && y(i, "position") !== "static")) {
          var g = i.getBoundingClientRect();
          s -= g.top + parseInt(y(i, "border-top-width")), a -= g.left + parseInt(y(i, "border-left-width")), l = s + r.height, d = a + r.width;
          break;
        }
      while (i = i.parentNode);
    if (o && n !== window) {
      var _ = Me(i || n), k = _ && _.a, v = _ && _.d;
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
function In(n, e, t) {
  for (var o = pe(n, !0), i = M(n)[e]; o; ) {
    var r = M(o)[t], s = void 0;
    if (s = i >= r, !s) return o;
    if (o === J()) break;
    o = pe(o, !1);
  }
  return !1;
}
function Ie(n, e, t, o) {
  for (var i = 0, r = 0, s = n.children; r < s.length; ) {
    if (s[r].style.display !== "none" && s[r] !== x.ghost && (o || s[r] !== x.dragged) && V(s[r], t.draggable, n, !1)) {
      if (i === e)
        return s[r];
      i++;
    }
    r++;
  }
  return null;
}
function gn(n, e) {
  for (var t = n.lastElementChild; t && (t === x.ghost || y(t, "display") === "none" || e && !St(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function Y(n, e) {
  var t = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== x.clone && (!e || St(n, e)) && t++;
  return t;
}
function Rn(n) {
  var e = 0, t = 0, o = J();
  if (n)
    do {
      var i = Me(n), r = i.a, s = i.d;
      e += n.scrollLeft * r, t += n.scrollTop * s;
    } while (n !== o && (n = n.parentNode));
  return [e, t];
}
function li(n, e) {
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
      var i = y(t);
      if (t.clientWidth < t.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return J();
        if (o || e) return t;
        o = !0;
      }
    }
  while (t = t.parentNode);
  return J();
}
function di(n, e) {
  if (n && e)
    for (var t in e)
      e.hasOwnProperty(t) && (n[t] = e[t]);
  return n;
}
function qt(n, e) {
  return Math.round(n.top) === Math.round(e.top) && Math.round(n.left) === Math.round(e.left) && Math.round(n.height) === Math.round(e.height) && Math.round(n.width) === Math.round(e.width);
}
var Qe;
function po(n, e) {
  return function() {
    if (!Qe) {
      var t = arguments, o = this;
      t.length === 1 ? n.call(o, t[0]) : n.apply(o, t), Qe = setTimeout(function() {
        Qe = void 0;
      }, e);
    }
  };
}
function ci() {
  clearTimeout(Qe), Qe = void 0;
}
function ho(n, e, t) {
  n.scrollLeft += e, n.scrollTop += t;
}
function uo(n) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(n).cloneNode(!0) : t ? t(n).clone(!0)[0] : n.cloneNode(!0);
}
function fo(n, e, t) {
  var o = {};
  return Array.from(n.children).forEach(function(i) {
    var r, s, a, l;
    if (!(!V(i, e.draggable, n, !1) || i.animated || i === t)) {
      var d = M(i);
      o.left = Math.min((r = o.left) !== null && r !== void 0 ? r : 1 / 0, d.left), o.top = Math.min((s = o.top) !== null && s !== void 0 ? s : 1 / 0, d.top), o.right = Math.max((a = o.right) !== null && a !== void 0 ? a : -1 / 0, d.right), o.bottom = Math.max((l = o.bottom) !== null && l !== void 0 ? l : -1 / 0, d.bottom);
    }
  }), o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
var j = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function pi() {
  var n = [], e;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(i) {
          if (!(y(i, "display") === "none" || i === x.ghost)) {
            n.push({
              target: i,
              rect: M(i)
            });
            var r = Q({}, n[n.length - 1].rect);
            if (i.thisAnimationDuration) {
              var s = Me(i, !0);
              s && (r.top -= s.f, r.left -= s.e);
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
      n.splice(li(n, {
        target: o
      }), 1);
    },
    animateAll: function(o) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof o == "function" && o();
        return;
      }
      var r = !1, s = 0;
      n.forEach(function(a) {
        var l = 0, d = a.target, p = d.fromRect, c = M(d), g = d.prevFromRect, _ = d.prevToRect, k = a.rect, v = Me(d, !0);
        v && (c.top -= v.f, c.left -= v.e), d.toRect = c, d.thisAnimationDuration && qt(g, c) && !qt(p, c) && // Make sure animatingRect is on line between toRect & fromRect
        (k.top - c.top) / (k.left - c.left) === (p.top - c.top) / (p.left - c.left) && (l = ui(k, g, _, i.options)), qt(c, p) || (d.prevFromRect = p, d.prevToRect = c, l || (l = i.options.animation), i.animate(d, k, c, l)), l && (r = !0, s = Math.max(s, l), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, l), d.thisAnimationDuration = l);
      }), clearTimeout(e), r ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, s) : typeof o == "function" && o(), n = [];
    },
    animate: function(o, i, r, s) {
      if (s) {
        y(o, "transition", ""), y(o, "transform", "");
        var a = Me(this.el), l = a && a.a, d = a && a.d, p = (i.left - r.left) / (l || 1), c = (i.top - r.top) / (d || 1);
        o.animatingX = !!p, o.animatingY = !!c, y(o, "transform", "translate3d(" + p + "px," + c + "px,0)"), this.forRepaintDummy = hi(o), y(o, "transition", "transform " + s + "ms" + (this.options.easing ? " " + this.options.easing : "")), y(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          y(o, "transition", ""), y(o, "transform", ""), o.animated = !1, o.animatingX = !1, o.animatingY = !1;
        }, s);
      }
    }
  };
}
function hi(n) {
  return n.offsetWidth;
}
function ui(n, e, t, o) {
  return Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * o.animation;
}
var Ee = [], Bt = {
  initializeByDefault: !0
}, lt = {
  mount: function(e) {
    for (var t in Bt)
      Bt.hasOwnProperty(t) && !(t in e) && (e[t] = Bt[t]);
    Ee.forEach(function(o) {
      if (o.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Ee.push(e);
  },
  pluginEvent: function(e, t, o) {
    var i = this;
    this.eventCanceled = !1, o.cancel = function() {
      i.eventCanceled = !0;
    };
    var r = e + "Global";
    Ee.forEach(function(s) {
      t[s.pluginName] && (t[s.pluginName][r] && t[s.pluginName][r](Q({
        sortable: t
      }, o)), t.options[s.pluginName] && t[s.pluginName][e] && t[s.pluginName][e](Q({
        sortable: t
      }, o)));
    });
  },
  initializePlugins: function(e, t, o, i) {
    Ee.forEach(function(a) {
      var l = a.pluginName;
      if (!(!e.options[l] && !a.initializeByDefault)) {
        var d = new a(e, t, e.options);
        d.sortable = e, d.options = e.options, e[l] = d, ie(o, d.defaults);
      }
    });
    for (var r in e.options)
      if (e.options.hasOwnProperty(r)) {
        var s = this.modifyOption(e, r, e.options[r]);
        typeof s < "u" && (e.options[r] = s);
      }
  },
  getEventProperties: function(e, t) {
    var o = {};
    return Ee.forEach(function(i) {
      typeof i.eventProperties == "function" && ie(o, i.eventProperties.call(t[i.pluginName], e));
    }), o;
  },
  modifyOption: function(e, t, o) {
    var i;
    return Ee.forEach(function(r) {
      e[r.pluginName] && r.optionListeners && typeof r.optionListeners[t] == "function" && (i = r.optionListeners[t].call(e[r.pluginName], o));
    }), i;
  }
};
function fi(n) {
  var e = n.sortable, t = n.rootEl, o = n.name, i = n.targetEl, r = n.cloneEl, s = n.toEl, a = n.fromEl, l = n.oldIndex, d = n.newIndex, p = n.oldDraggableIndex, c = n.newDraggableIndex, g = n.originalEvent, _ = n.putSortable, k = n.extraEventProperties;
  if (e = e || t && t[j], !!e) {
    var v, u = e.options, $ = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !re && !at ? v = new CustomEvent(o, {
      bubbles: !0,
      cancelable: !0
    }) : (v = document.createEvent("Event"), v.initEvent(o, !0, !0)), v.to = s || t, v.from = a || t, v.item = i || t, v.clone = r, v.oldIndex = l, v.newIndex = d, v.oldDraggableIndex = p, v.newDraggableIndex = c, v.originalEvent = g, v.pullMode = _ ? _.lastPutMode : void 0;
    var D = Q(Q({}, k), lt.getEventProperties(o, e));
    for (var z in D)
      v[z] = D[z];
    t && t.dispatchEvent(v), u[$] && u[$].call(e, v);
  }
}
var gi = ["evt"], L = function(e, t) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = o.evt, r = si(o, gi);
  lt.pluginEvent.bind(x)(e, t, Q({
    dragEl: f,
    parentEl: T,
    ghostEl: w,
    rootEl: C,
    nextEl: ye,
    lastDownEl: vt,
    cloneEl: A,
    cloneHidden: ce,
    dragStarted: Ye,
    putSortable: N,
    activeSortable: x.active,
    originalEvent: i,
    oldIndex: Te,
    oldDraggableIndex: et,
    newIndex: U,
    newDraggableIndex: le,
    hideGhostForTarget: _o,
    unhideGhostForTarget: vo,
    cloneNowHidden: function() {
      ce = !0;
    },
    cloneNowShown: function() {
      ce = !1;
    },
    dispatchSortableEvent: function(a) {
      H({
        sortable: t,
        name: a,
        originalEvent: i
      });
    }
  }, r));
};
function H(n) {
  fi(Q({
    putSortable: N,
    cloneEl: A,
    targetEl: f,
    rootEl: C,
    oldIndex: Te,
    oldDraggableIndex: et,
    newIndex: U,
    newDraggableIndex: le
  }, n));
}
var f, T, w, C, ye, vt, A, ce, Te, U, et, le, pt, N, Ae = !1, Et = !1, Dt = [], _e, X, Ut, Wt, Hn, Fn, Ye, De, tt, nt = !1, ht = !1, yt, I, Yt = [], en = !1, Ct = [], Nt = typeof document < "u", ut = fn, Ln = at || re ? "cssFloat" : "float", bi = Nt && !so && !fn && "draggable" in document.createElement("div"), go = (function() {
  if (Nt) {
    if (re)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
})(), bo = function(e, t) {
  var o = y(e), i = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), r = Ie(e, 0, t), s = Ie(e, 1, t), a = r && y(r), l = s && y(s), d = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + M(r).width, p = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + M(s).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (r && a.float && a.float !== "none") {
    var c = a.float === "left" ? "left" : "right";
    return s && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return r && (a.display === "block" || a.display === "flex" || a.display === "table" || a.display === "grid" || d >= i && o[Ln] === "none" || s && o[Ln] === "none" && d + p > i) ? "vertical" : "horizontal";
}, mi = function(e, t, o) {
  var i = o ? e.left : e.top, r = o ? e.right : e.bottom, s = o ? e.width : e.height, a = o ? t.left : t.top, l = o ? t.right : t.bottom, d = o ? t.width : t.height;
  return i === a || r === l || i + s / 2 === a + d / 2;
}, _i = function(e, t) {
  var o;
  return Dt.some(function(i) {
    var r = i[j].options.emptyInsertThreshold;
    if (!(!r || gn(i))) {
      var s = M(i), a = e >= s.left - r && e <= s.right + r, l = t >= s.top - r && t <= s.bottom + r;
      if (a && l)
        return o = i;
    }
  }), o;
}, mo = function(e) {
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
      var g = (s ? a : l).options.group.name;
      return r === !0 || typeof r == "string" && r === g || r.join && r.indexOf(g) > -1;
    };
  }
  var o = {}, i = e.group;
  (!i || _t(i) != "object") && (i = {
    name: i
  }), o.name = i.name, o.checkPull = t(i.pull, !0), o.checkPut = t(i.put), o.revertClone = i.revertClone, e.group = o;
}, _o = function() {
  !go && w && y(w, "display", "none");
}, vo = function() {
  !go && w && y(w, "display", "");
};
Nt && !so && document.addEventListener("click", function(n) {
  if (Et)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), Et = !1, !1;
}, !0);
var ve = function(e) {
  if (f) {
    e = e.touches ? e.touches[0] : e;
    var t = _i(e.clientX, e.clientY);
    if (t) {
      var o = {};
      for (var i in e)
        e.hasOwnProperty(i) && (o[i] = e[i]);
      o.target = o.rootEl = t, o.preventDefault = void 0, o.stopPropagation = void 0, t[j]._onDragOver(o);
    }
  }
}, vi = function(e) {
  f && f.parentNode[j]._isOutsideThisEl(e.target);
};
function x(n, e) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = e = ie({}, e), n[j] = this;
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
      return bo(n, this.options);
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
    supportPointer: x.supportPointer !== !1 && "PointerEvent" in window && (!Je || fn),
    emptyInsertThreshold: 5
  };
  lt.initializePlugins(this, n, t);
  for (var o in t)
    !(o in e) && (e[o] = t[o]);
  mo(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : bi, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? E(n, "pointerdown", this._onTapStart) : (E(n, "mousedown", this._onTapStart), E(n, "touchstart", this._onTapStart)), this.nativeDraggable && (E(n, "dragover", this), E(n, "dragenter", this)), Dt.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ie(this, pi());
}
x.prototype = /** @lends Sortable.prototype */
{
  constructor: x,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (De = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, f) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, o = this.el, i = this.options, r = i.preventOnFilter, s = e.type, a = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (a || e).target, d = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, p = i.filter;
      if (Di(o), !f && !(/mousedown|pointerdown/.test(s) && e.button !== 0 || i.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Je && l && l.tagName.toUpperCase() === "SELECT") && (l = V(l, i.draggable, o, !1), !(l && l.animated) && vt !== l)) {
        if (Te = Y(l), et = Y(l, i.draggable), typeof p == "function") {
          if (p.call(this, e, l, this)) {
            H({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: l,
              toEl: o,
              fromEl: o
            }), L("filter", t, {
              evt: e
            }), r && e.preventDefault();
            return;
          }
        } else if (p && (p = p.split(",").some(function(c) {
          if (c = V(d, c.trim(), o, !1), c)
            return H({
              sortable: t,
              rootEl: c,
              name: "filter",
              targetEl: l,
              fromEl: o,
              toEl: o
            }), L("filter", t, {
              evt: e
            }), !0;
        }), p)) {
          r && e.preventDefault();
          return;
        }
        i.handle && !V(d, i.handle, o, !1) || this._prepareDragStart(e, a, l);
      }
    }
  },
  _prepareDragStart: function(e, t, o) {
    var i = this, r = i.el, s = i.options, a = r.ownerDocument, l;
    if (o && !f && o.parentNode === r) {
      var d = M(o);
      if (C = r, f = o, T = f.parentNode, ye = f.nextSibling, vt = o, pt = s.group, x.dragged = f, _e = {
        target: f,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, Hn = _e.clientX - d.left, Fn = _e.clientY - d.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, f.style["will-change"] = "all", l = function() {
        if (L("delayEnded", i, {
          evt: e
        }), x.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !zn && i.nativeDraggable && (f.draggable = !0), i._triggerDragStart(e, t), H({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), B(f, s.chosenClass, !0);
      }, s.ignore.split(",").forEach(function(p) {
        co(f, p.trim(), Xt);
      }), E(a, "dragover", ve), E(a, "mousemove", ve), E(a, "touchmove", ve), s.supportPointer ? (E(a, "pointerup", i._onDrop), !this.nativeDraggable && E(a, "pointercancel", i._onDrop)) : (E(a, "mouseup", i._onDrop), E(a, "touchend", i._onDrop), E(a, "touchcancel", i._onDrop)), zn && this.nativeDraggable && (this.options.touchStartThreshold = 4, f.draggable = !0), L("delayStart", this, {
        evt: e
      }), s.delay && (!s.delayOnTouchOnly || t) && (!this.nativeDraggable || !(at || re))) {
        if (x.eventCanceled) {
          this._onDrop();
          return;
        }
        s.supportPointer ? (E(a, "pointerup", i._disableDelayedDrag), E(a, "pointercancel", i._disableDelayedDrag)) : (E(a, "mouseup", i._disableDelayedDrag), E(a, "touchend", i._disableDelayedDrag), E(a, "touchcancel", i._disableDelayedDrag)), E(a, "mousemove", i._delayedDragTouchMoveHandler), E(a, "touchmove", i._delayedDragTouchMoveHandler), s.supportPointer && E(a, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(l, s.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    f && Xt(f), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    S(e, "mouseup", this._disableDelayedDrag), S(e, "touchend", this._disableDelayedDrag), S(e, "touchcancel", this._disableDelayedDrag), S(e, "pointerup", this._disableDelayedDrag), S(e, "pointercancel", this._disableDelayedDrag), S(e, "mousemove", this._delayedDragTouchMoveHandler), S(e, "touchmove", this._delayedDragTouchMoveHandler), S(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? E(document, "pointermove", this._onTouchMove) : t ? E(document, "touchmove", this._onTouchMove) : E(document, "mousemove", this._onTouchMove) : (E(f, "dragend", this), E(C, "dragstart", this._onDragStart));
    try {
      document.selection ? xt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (Ae = !1, C && f) {
      L("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && E(document, "dragover", vi);
      var o = this.options;
      !e && B(f, o.dragClass, !1), B(f, o.ghostClass, !0), x.active = this, e && this._appendGhost(), H({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (X) {
      this._lastX = X.clientX, this._lastY = X.clientY, _o();
      for (var e = document.elementFromPoint(X.clientX, X.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(X.clientX, X.clientY), e !== t); )
        t = e;
      if (f.parentNode[j]._isOutsideThisEl(e), t)
        do {
          if (t[j]) {
            var o = void 0;
            if (o = t[j]._onDragOver({
              clientX: X.clientX,
              clientY: X.clientY,
              target: e,
              rootEl: t
            }), o && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = lo(t));
      vo();
    }
  },
  _onTouchMove: function(e) {
    if (_e) {
      var t = this.options, o = t.fallbackTolerance, i = t.fallbackOffset, r = e.touches ? e.touches[0] : e, s = w && Me(w, !0), a = w && s && s.a, l = w && s && s.d, d = ut && I && Rn(I), p = (r.clientX - _e.clientX + i.x) / (a || 1) + (d ? d[0] - Yt[0] : 0) / (a || 1), c = (r.clientY - _e.clientY + i.y) / (l || 1) + (d ? d[1] - Yt[1] : 0) / (l || 1);
      if (!x.active && !Ae) {
        if (o && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < o)
          return;
        this._onDragStart(e, !0);
      }
      if (w) {
        s ? (s.e += p - (Ut || 0), s.f += c - (Wt || 0)) : s = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: p,
          f: c
        };
        var g = "matrix(".concat(s.a, ",").concat(s.b, ",").concat(s.c, ",").concat(s.d, ",").concat(s.e, ",").concat(s.f, ")");
        y(w, "webkitTransform", g), y(w, "mozTransform", g), y(w, "msTransform", g), y(w, "transform", g), Ut = p, Wt = c, X = r;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!w) {
      var e = this.options.fallbackOnBody ? document.body : C, t = M(f, !0, ut, !0, e), o = this.options;
      if (ut) {
        for (I = e; y(I, "position") === "static" && y(I, "transform") === "none" && I !== document; )
          I = I.parentNode;
        I !== document.body && I !== document.documentElement ? (I === document && (I = J()), t.top += I.scrollTop, t.left += I.scrollLeft) : I = J(), Yt = Rn(I);
      }
      w = f.cloneNode(!0), B(w, o.ghostClass, !1), B(w, o.fallbackClass, !0), B(w, o.dragClass, !0), y(w, "transition", ""), y(w, "transform", ""), y(w, "box-sizing", "border-box"), y(w, "margin", 0), y(w, "top", t.top), y(w, "left", t.left), y(w, "width", t.width), y(w, "height", t.height), y(w, "opacity", "0.8"), y(w, "position", ut ? "absolute" : "fixed"), y(w, "zIndex", "100000"), y(w, "pointerEvents", "none"), x.ghost = w, e.appendChild(w), y(w, "transform-origin", Hn / parseInt(w.style.width) * 100 + "% " + Fn / parseInt(w.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var o = this, i = e.dataTransfer, r = o.options;
    if (L("dragStart", this, {
      evt: e
    }), x.eventCanceled) {
      this._onDrop();
      return;
    }
    L("setupClone", this), x.eventCanceled || (A = uo(f), A.removeAttribute("id"), A.draggable = !1, A.style["will-change"] = "", this._hideClone(), B(A, this.options.chosenClass, !1), x.clone = A), o.cloneId = xt(function() {
      L("clone", o), !x.eventCanceled && (o.options.removeCloneOnHide || C.insertBefore(A, f), o._hideClone(), H({
        sortable: o,
        name: "clone"
      }));
    }), !t && B(f, r.dragClass, !0), t ? (Et = !0, o._loopId = setInterval(o._emulateDragOver, 50)) : (S(document, "mouseup", o._onDrop), S(document, "touchend", o._onDrop), S(document, "touchcancel", o._onDrop), i && (i.effectAllowed = "move", r.setData && r.setData.call(o, i, f)), E(document, "drop", o), y(f, "transform", "translateZ(0)")), Ae = !0, o._dragStartId = xt(o._dragStarted.bind(o, t, e)), E(document, "selectstart", o), Ye = !0, window.getSelection().removeAllRanges(), Je && y(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, o = e.target, i, r, s, a = this.options, l = a.group, d = x.active, p = pt === l, c = a.sort, g = N || d, _, k = this, v = !1;
    if (en) return;
    function u(Ue, Ro) {
      L(Ue, k, Q({
        evt: e,
        isOwner: p,
        axis: _ ? "vertical" : "horizontal",
        revert: s,
        dragRect: i,
        targetRect: r,
        canSort: c,
        fromSortable: g,
        target: o,
        completed: D,
        onMove: function(xn, Ho) {
          return ft(C, t, f, i, xn, M(xn), e, Ho);
        },
        changed: z
      }, Ro));
    }
    function $() {
      u("dragOverAnimationCapture"), k.captureAnimationState(), k !== g && g.captureAnimationState();
    }
    function D(Ue) {
      return u("dragOverCompleted", {
        insertion: Ue
      }), Ue && (p ? d._hideClone() : d._showClone(k), k !== g && (B(f, N ? N.options.ghostClass : d.options.ghostClass, !1), B(f, a.ghostClass, !0)), N !== k && k !== x.active ? N = k : k === x.active && N && (N = null), g === k && (k._ignoreWhileAnimating = o), k.animateAll(function() {
        u("dragOverAnimationComplete"), k._ignoreWhileAnimating = null;
      }), k !== g && (g.animateAll(), g._ignoreWhileAnimating = null)), (o === f && !f.animated || o === t && !o.animated) && (De = null), !a.dragoverBubble && !e.rootEl && o !== document && (f.parentNode[j]._isOutsideThisEl(e.target), !Ue && ve(e)), !a.dragoverBubble && e.stopPropagation && e.stopPropagation(), v = !0;
    }
    function z() {
      U = Y(f), le = Y(f, a.draggable), H({
        sortable: k,
        name: "change",
        toEl: t,
        newIndex: U,
        newDraggableIndex: le,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = V(o, a.draggable, t, !0), u("dragOver"), x.eventCanceled) return v;
    if (f.contains(e.target) || o.animated && o.animatingX && o.animatingY || k._ignoreWhileAnimating === o)
      return D(!1);
    if (Et = !1, d && !a.disabled && (p ? c || (s = T !== C) : N === this || (this.lastPutMode = pt.checkPull(this, d, f, e)) && l.checkPut(this, d, f, e))) {
      if (_ = this._getDirection(e, o) === "vertical", i = M(f), u("dragOverValid"), x.eventCanceled) return v;
      if (s)
        return T = C, $(), this._hideClone(), u("revert"), x.eventCanceled || (ye ? C.insertBefore(f, ye) : C.appendChild(f)), D(!0);
      var P = gn(t, a.draggable);
      if (!P || ki(e, _, this) && !P.animated) {
        if (P === f)
          return D(!1);
        if (P && t === e.target && (o = P), o && (r = M(o)), ft(C, t, f, i, o, r, e, !!o) !== !1)
          return $(), P && P.nextSibling ? t.insertBefore(f, P.nextSibling) : t.appendChild(f), T = t, z(), D(!0);
      } else if (P && wi(e, _, this)) {
        var W = Ie(t, 0, a, !0);
        if (W === f)
          return D(!1);
        if (o = W, r = M(o), ft(C, t, f, i, o, r, e, !1) !== !1)
          return $(), t.insertBefore(f, W), T = t, z(), D(!0);
      } else if (o.parentNode === t) {
        r = M(o);
        var F = 0, K, Le = f.parentNode !== t, q = !mi(f.animated && f.toRect || i, o.animated && o.toRect || r, _), je = _ ? "top" : "left", se = In(o, "top", "top") || In(f, "top", "top"), qe = se ? se.scrollTop : void 0;
        De !== o && (K = r[je], nt = !1, ht = !q && a.invertSwap || Le), F = $i(e, o, r, _, q ? 1 : a.swapThreshold, a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold, ht, De === o);
        var te;
        if (F !== 0) {
          var be = Y(f);
          do
            be -= F, te = T.children[be];
          while (te && (y(te, "display") === "none" || te === w));
        }
        if (F === 0 || te === o)
          return D(!1);
        De = o, tt = F;
        var Be = o.nextElementSibling, ae = !1;
        ae = F === 1;
        var ct = ft(C, t, f, i, o, r, e, ae);
        if (ct !== !1)
          return (ct === 1 || ct === -1) && (ae = ct === 1), en = !0, setTimeout(xi, 30), $(), ae && !Be ? t.appendChild(f) : o.parentNode.insertBefore(f, ae ? Be : o), se && ho(se, 0, qe - se.scrollTop), T = f.parentNode, K !== void 0 && !ht && (yt = Math.abs(K - M(o)[je])), z(), D(!0);
      }
      if (t.contains(f))
        return D(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    S(document, "mousemove", this._onTouchMove), S(document, "touchmove", this._onTouchMove), S(document, "pointermove", this._onTouchMove), S(document, "dragover", ve), S(document, "mousemove", ve), S(document, "touchmove", ve);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    S(e, "mouseup", this._onDrop), S(e, "touchend", this._onDrop), S(e, "pointerup", this._onDrop), S(e, "pointercancel", this._onDrop), S(e, "touchcancel", this._onDrop), S(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, o = this.options;
    if (U = Y(f), le = Y(f, o.draggable), L("drop", this, {
      evt: e
    }), T = f && f.parentNode, U = Y(f), le = Y(f, o.draggable), x.eventCanceled) {
      this._nulling();
      return;
    }
    Ae = !1, ht = !1, nt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tn(this.cloneId), tn(this._dragStartId), this.nativeDraggable && (S(document, "drop", this), S(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Je && y(document.body, "user-select", ""), y(f, "transform", ""), e && (Ye && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), w && w.parentNode && w.parentNode.removeChild(w), (C === T || N && N.lastPutMode !== "clone") && A && A.parentNode && A.parentNode.removeChild(A), f && (this.nativeDraggable && S(f, "dragend", this), Xt(f), f.style["will-change"] = "", Ye && !Ae && B(f, N ? N.options.ghostClass : this.options.ghostClass, !1), B(f, this.options.chosenClass, !1), H({
      sortable: this,
      name: "unchoose",
      toEl: T,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), C !== T ? (U >= 0 && (H({
      rootEl: T,
      name: "add",
      toEl: T,
      fromEl: C,
      originalEvent: e
    }), H({
      sortable: this,
      name: "remove",
      toEl: T,
      originalEvent: e
    }), H({
      rootEl: T,
      name: "sort",
      toEl: T,
      fromEl: C,
      originalEvent: e
    }), H({
      sortable: this,
      name: "sort",
      toEl: T,
      originalEvent: e
    })), N && N.save()) : U !== Te && U >= 0 && (H({
      sortable: this,
      name: "update",
      toEl: T,
      originalEvent: e
    }), H({
      sortable: this,
      name: "sort",
      toEl: T,
      originalEvent: e
    })), x.active && ((U == null || U === -1) && (U = Te, le = et), H({
      sortable: this,
      name: "end",
      toEl: T,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    L("nulling", this), C = f = T = w = ye = A = vt = ce = _e = X = Ye = U = le = Te = et = De = tt = N = pt = x.dragged = x.ghost = x.clone = x.active = null, Ct.forEach(function(e) {
      e.checked = !0;
    }), Ct.length = Ut = Wt = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        f && (this._onDragOver(e), yi(e));
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
    for (var e = [], t, o = this.el.children, i = 0, r = o.length, s = this.options; i < r; i++)
      t = o[i], V(t, s.draggable, this.el, !1) && e.push(t.getAttribute(s.dataIdAttr) || Ei(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var o = {}, i = this.el;
    this.toArray().forEach(function(r, s) {
      var a = i.children[s];
      V(a, this.options.draggable, i, !1) && (o[r] = a);
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
    return V(e, t || this.options.draggable, this.el, !1);
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
    typeof i < "u" ? o[e] = i : o[e] = t, e === "group" && mo(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    L("destroy", this);
    var e = this.el;
    e[j] = null, S(e, "mousedown", this._onTapStart), S(e, "touchstart", this._onTapStart), S(e, "pointerdown", this._onTapStart), this.nativeDraggable && (S(e, "dragover", this), S(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Dt.splice(Dt.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!ce) {
      if (L("hideClone", this), x.eventCanceled) return;
      y(A, "display", "none"), this.options.removeCloneOnHide && A.parentNode && A.parentNode.removeChild(A), ce = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (ce) {
      if (L("showClone", this), x.eventCanceled) return;
      f.parentNode == C && !this.options.group.revertClone ? C.insertBefore(A, f) : ye ? C.insertBefore(A, ye) : C.appendChild(A), this.options.group.revertClone && this.animate(f, A), y(A, "display", ""), ce = !1;
    }
  }
};
function yi(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function ft(n, e, t, o, i, r, s, a) {
  var l, d = n[j], p = d.options.onMove, c;
  return window.CustomEvent && !re && !at ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = n, l.dragged = t, l.draggedRect = o, l.related = i || e, l.relatedRect = r || M(e), l.willInsertAfter = a, l.originalEvent = s, n.dispatchEvent(l), p && (c = p.call(d, l, s)), c;
}
function Xt(n) {
  n.draggable = !1;
}
function xi() {
  en = !1;
}
function wi(n, e, t) {
  var o = M(Ie(t.el, 0, t.options, !0)), i = fo(t.el, t.options, w), r = 10;
  return e ? n.clientX < i.left - r || n.clientY < o.top && n.clientX < o.right : n.clientY < i.top - r || n.clientY < o.bottom && n.clientX < o.left;
}
function ki(n, e, t) {
  var o = M(gn(t.el, t.options.draggable)), i = fo(t.el, t.options, w), r = 10;
  return e ? n.clientX > i.right + r || n.clientY > o.bottom && n.clientX > o.left : n.clientY > i.bottom + r || n.clientX > o.right && n.clientY > o.top;
}
function $i(n, e, t, o, i, r, s, a) {
  var l = o ? n.clientY : n.clientX, d = o ? t.height : t.width, p = o ? t.top : t.left, c = o ? t.bottom : t.right, g = !1;
  if (!s) {
    if (a && yt < d * i) {
      if (!nt && (tt === 1 ? l > p + d * r / 2 : l < c - d * r / 2) && (nt = !0), nt)
        g = !0;
      else if (tt === 1 ? l < p + yt : l > c - yt)
        return -tt;
    } else if (l > p + d * (1 - i) / 2 && l < c - d * (1 - i) / 2)
      return Si(e);
  }
  return g = g || s, g && (l < p + d * r / 2 || l > c - d * r / 2) ? l > p + d / 2 ? 1 : -1 : 0;
}
function Si(n) {
  return Y(f) < Y(n) ? 1 : -1;
}
function Ei(n) {
  for (var e = n.tagName + n.className + n.src + n.href + n.textContent, t = e.length, o = 0; t--; )
    o += e.charCodeAt(t);
  return o.toString(36);
}
function Di(n) {
  Ct.length = 0;
  for (var e = n.getElementsByTagName("input"), t = e.length; t--; ) {
    var o = e[t];
    o.checked && Ct.push(o);
  }
}
function xt(n) {
  return setTimeout(n, 0);
}
function tn(n) {
  return clearTimeout(n);
}
Nt && E(document, "touchmove", function(n) {
  (x.active || Ae) && n.cancelable && n.preventDefault();
});
x.utils = {
  on: E,
  off: S,
  css: y,
  find: co,
  is: function(e, t) {
    return !!V(e, t, e, !1);
  },
  extend: di,
  throttle: po,
  closest: V,
  toggleClass: B,
  clone: uo,
  index: Y,
  nextTick: xt,
  cancelNextTick: tn,
  detectDirection: bo,
  getChild: Ie,
  expando: j
};
x.get = function(n) {
  return n[j];
};
x.mount = function() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (x.utils = Q(Q({}, x.utils), o.utils)), lt.mount(o);
  });
};
x.create = function(n, e) {
  return new x(n, e);
};
x.version = ai;
var O = [], Xe, nn, on = !1, Vt, Gt, At, Ve;
function Ci() {
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
      this.sortable.nativeDraggable ? E(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? E(document, "pointermove", this._handleFallbackAutoScroll) : o.touches ? E(document, "touchmove", this._handleFallbackAutoScroll) : E(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var o = t.originalEvent;
      !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
    },
    drop: function() {
      this.sortable.nativeDraggable ? S(document, "dragover", this._handleAutoScroll) : (S(document, "pointermove", this._handleFallbackAutoScroll), S(document, "touchmove", this._handleFallbackAutoScroll), S(document, "mousemove", this._handleFallbackAutoScroll)), jn(), wt(), ci();
    },
    nulling: function() {
      At = nn = Xe = on = Ve = Vt = Gt = null, O.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, o) {
      var i = this, r = (t.touches ? t.touches[0] : t).clientX, s = (t.touches ? t.touches[0] : t).clientY, a = document.elementFromPoint(r, s);
      if (At = t, o || this.options.forceAutoScrollFallback || at || re || Je) {
        Kt(t, this.options, a, o);
        var l = pe(a, !0);
        on && (!Ve || r !== Vt || s !== Gt) && (Ve && jn(), Ve = setInterval(function() {
          var d = pe(document.elementFromPoint(r, s), !0);
          d !== l && (l = d, wt()), Kt(t, i.options, d, o);
        }, 10), Vt = r, Gt = s);
      } else {
        if (!this.options.bubbleScroll || pe(a, !0) === J()) {
          wt();
          return;
        }
        Kt(t, this.options, pe(a, !1), !1);
      }
    }
  }, ie(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function wt() {
  O.forEach(function(n) {
    clearInterval(n.pid);
  }), O = [];
}
function jn() {
  clearInterval(Ve);
}
var Kt = po(function(n, e, t, o) {
  if (e.scroll) {
    var i = (n.touches ? n.touches[0] : n).clientX, r = (n.touches ? n.touches[0] : n).clientY, s = e.scrollSensitivity, a = e.scrollSpeed, l = J(), d = !1, p;
    nn !== t && (nn = t, wt(), Xe = e.scroll, p = e.scrollFn, Xe === !0 && (Xe = pe(t, !0)));
    var c = 0, g = Xe;
    do {
      var _ = g, k = M(_), v = k.top, u = k.bottom, $ = k.left, D = k.right, z = k.width, P = k.height, W = void 0, F = void 0, K = _.scrollWidth, Le = _.scrollHeight, q = y(_), je = _.scrollLeft, se = _.scrollTop;
      _ === l ? (W = z < K && (q.overflowX === "auto" || q.overflowX === "scroll" || q.overflowX === "visible"), F = P < Le && (q.overflowY === "auto" || q.overflowY === "scroll" || q.overflowY === "visible")) : (W = z < K && (q.overflowX === "auto" || q.overflowX === "scroll"), F = P < Le && (q.overflowY === "auto" || q.overflowY === "scroll"));
      var qe = W && (Math.abs(D - i) <= s && je + z < K) - (Math.abs($ - i) <= s && !!je), te = F && (Math.abs(u - r) <= s && se + P < Le) - (Math.abs(v - r) <= s && !!se);
      if (!O[c])
        for (var be = 0; be <= c; be++)
          O[be] || (O[be] = {});
      (O[c].vx != qe || O[c].vy != te || O[c].el !== _) && (O[c].el = _, O[c].vx = qe, O[c].vy = te, clearInterval(O[c].pid), (qe != 0 || te != 0) && (d = !0, O[c].pid = setInterval((function() {
        o && this.layer === 0 && x.active._onTouchMove(At);
        var Be = O[this.layer].vy ? O[this.layer].vy * a : 0, ae = O[this.layer].vx ? O[this.layer].vx * a : 0;
        typeof p == "function" && p.call(x.dragged.parentNode[j], ae, Be, n, At, O[this.layer].el) !== "continue" || ho(O[this.layer].el, ae, Be);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && g !== l && (g = pe(g, !1)));
    on = d;
  }
}, 30), yo = function(e) {
  var t = e.originalEvent, o = e.putSortable, i = e.dragEl, r = e.activeSortable, s = e.dispatchSortableEvent, a = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var d = o || r;
    a();
    var p = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, c = document.elementFromPoint(p.clientX, p.clientY);
    l(), d && !d.el.contains(c) && (s("spill"), this.onSpill({
      dragEl: i,
      putSortable: o
    }));
  }
};
function bn() {
}
bn.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var i = Ie(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(t, i) : this.sortable.el.appendChild(t), this.sortable.animateAll(), o && o.animateAll();
  },
  drop: yo
};
ie(bn, {
  pluginName: "revertOnSpill"
});
function mn() {
}
mn.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable, i = o || this.sortable;
    i.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), i.animateAll();
  },
  drop: yo
};
ie(mn, {
  pluginName: "removeOnSpill"
});
x.mount(new Ci());
x.mount(mn, bn);
const G = "household_kanban";
function xo(n, e) {
  return n.connection.subscribeMessage((t) => e(t.board), { type: `${G}/subscribe` });
}
function gt(n, e, t) {
  return n.callService(G, "set_status", { uid: e, status: t });
}
function Ai(n, e) {
  return n.connection.sendMessagePromise({ type: `${G}/history`, ...e });
}
function Ti(n, e) {
  return n.callService(G, "create_item", { ...e });
}
function bt(n, e, t) {
  return n.callService(G, "update_item", { uid: e, ...t });
}
function Oi(n, e) {
  return n.callService(G, "delete_item", { uid: e });
}
function Mi(n, e) {
  return n.connection.sendMessagePromise({ type: "lovelace/config", url_path: e });
}
function Pi(n, e, t) {
  return n.connection.sendMessagePromise({ type: "lovelace/config/save", url_path: e, config: t });
}
function zi(n) {
  return n.connection.sendMessagePromise({ type: `${G}/settings` });
}
function Ni(n, e) {
  return n.connection.sendMessagePromise({ type: `${G}/settings/update`, ...e });
}
function Ii(n, e) {
  return n.connection.sendMessagePromise({ type: `${G}/parents/add`, ...e });
}
function Ri(n, e, t) {
  return n.connection.sendMessagePromise({ type: `${G}/parents/update`, parent_id: e, ...t });
}
function Hi(n, e, t) {
  return n.connection.sendMessagePromise({ type: `${G}/parents/remove`, parent_id: e, target: t });
}
const Fi = 864e5;
function R(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
const he = (n) => String(n).padStart(2, "0");
function oe(n) {
  return `${n.getFullYear()}-${he(n.getMonth() + 1)}-${he(n.getDate())}`;
}
function Li(n, e) {
  if (!n) return null;
  if (!e) return n;
  const [t, o, i] = n.split("-").map(Number), [r, s] = e.split(":").map(Number), a = -new Date(t, o - 1, i, r, s).getTimezoneOffset(), l = Math.abs(a);
  return `${n}T${he(r)}:${he(s)}:00${a < 0 ? "-" : "+"}${he(Math.floor(l / 60))}:${he(l % 60)}`;
}
function ji(n) {
  if (!n) return "";
  const { date: e, hasTime: t } = ee(n);
  return t ? `${he(e.getHours())}:${he(e.getMinutes())}` : "";
}
function Z(n, e) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + e);
}
function _n(n, e) {
  return Math.round((Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / Fi);
}
function ee(n) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(n)) {
    const [e, t, o] = n.split("-").map(Number);
    return { date: new Date(e, t - 1, o), hasTime: !1 };
  }
  return { date: new Date(n), hasTime: !0 };
}
function qi(n, e) {
  const t = R(n), o = (t.getDay() - e + 7) % 7, i = Z(t, -o);
  return o === 6 ? { start: Z(i, 7), end: Z(i, 13) } : { start: i, end: Z(i, 6) };
}
const Bi = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function qn(n) {
  var o, i;
  const e = n == null ? void 0 : n.first_weekday, t = Bi.indexOf(e ?? "");
  if (t >= 0) return t;
  try {
    const r = new Intl.Locale((n == null ? void 0 : n.language) ?? "en"), s = (i = ((o = r.getWeekInfo) == null ? void 0 : o.call(r)) ?? r.weekInfo) == null ? void 0 : i.firstDay;
    if (s) return s % 7;
  } catch {
  }
  return 1;
}
function ke(n, e) {
  const t = R(e.now);
  if (n.status === "completed")
    return !n.completed_at || !e.enabled.has("done") ? null : _n(new Date(n.completed_at), t) < e.doneDays ? "done" : null;
  if (!n.due) return "todo";
  const o = R(ee(n.due).date), i = (...r) => r.find((s) => e.enabled.has(s)) ?? "todo";
  return o < t ? e.mode === "overdue" && e.enabled.has("overdue") ? "overdue" : i("today", "week") : +o == +t ? i("today", "week") : o <= e.week.end ? i("week") : i("later");
}
const Ui = 8;
function Bn(n, e, t) {
  return Math.hypot(n, e) >= Ui;
}
function Wi(n, e, t) {
  const o = n.status === "completed" ? { status: "needs_action" } : {};
  if (typeof e == "number")
    return n.status === "needs_action" && n.priority === e ? null : { ...o, ...n.priority === e ? {} : { priority: e } };
  if (e === "overdue" || ke(n, t) === e) return null;
  if (e === "done") return { status: "completed" };
  if (e === "todo") return { ...o, due: null };
  if (e === "week") return { ...o, due: oe(t.week.end) };
  if (e === "later") return { ...o, due: oe(Z(t.week.end, 1)) };
  const i = R(t.now);
  return n.due && +R(ee(n.due).date) == +i ? Object.keys(o).length ? o : null : { ...o, due: oe(i) };
}
function wo(n) {
  return Math.min(6e4, 5e3 * 2 ** Math.min(n, 10));
}
function Yi(n) {
  const e = `custom:${n}`, t = (o) => {
    var i;
    for (const r of o.querySelectorAll("*")) {
      if (r.localName === "hui-error-card") {
        const s = r, a = s.config ?? s._config;
        ((a == null ? void 0 : a.type) === e || ((i = a == null ? void 0 : a.origConfig) == null ? void 0 : i.type) === e) && r.dispatchEvent(new Event("ll-rebuild", { bubbles: !0, composed: !0 }));
      }
      r.shadowRoot && t(r.shadowRoot);
    }
  };
  t(document);
}
const rn = [];
function Xi() {
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
        for (const o of rn) o(t);
      }
    });
  } catch {
  }
}
function ko(n, e) {
  let t = !1, o = !1;
  const i = (a = window.customElements) => {
    try {
      if (a.get(n)) return;
      a.define(n, e), t && Yi(n);
    } catch (l) {
      o || (o = !0, console.warn("household_kanban: could not register the card", l));
    }
  };
  i(), t = !0, rn.length || Xi(), rn.push(i), document.addEventListener("DOMContentLoaded", () => i()), window.addEventListener("load", () => i());
  const r = Date.now(), s = () => {
    i();
    const a = Date.now() - r;
    a < 2e4 && window.setTimeout(s, a < 3e3 ? 40 : 250);
  };
  window.setTimeout(s, 40);
}
const Un = ["todo", "later", "week", "today", "overdue", "done"], Vi = ["todo", "week", "today", "done"], vn = [1, 3, 7, 30];
function Pe(n) {
  const e = n.columns ?? Vi, t = e.filter((r) => !Un.includes(r));
  if (t.length) throw new Error(`Unknown column id: ${t.join(", ")}`);
  const o = new Set(e).add("todo"), i = {
    type: n.type,
    columns: Un.filter((r) => o.has(r)),
    done_days: vn.find((r) => r === n.done_days) ?? 7,
    group: n.group === "priority" ? "priority" : "date"
  };
  return n.parents && (i.parents = n.parents), n.people && (i.people = n.people), i;
}
function sn(n, e, t, o) {
  const i = new Set(n ?? e);
  return o ? i.add(t) : i.delete(t), i.size === 0 || i.size === e.length ? void 0 : e.filter((r) => i.has(r));
}
function $o(n, e) {
  const t = { ...n, ...e };
  for (const o of ["parents", "people"]) o in e || delete t[o];
  return t;
}
function Gi(n) {
  const e = n.split("/").find(Boolean);
  return !e || e === "lovelace" ? null : e;
}
function So(n, e) {
  if (n === e) return !0;
  if (!n || !e || typeof n != "object" || typeof e != "object" || Array.isArray(n) !== Array.isArray(e)) return !1;
  const t = n, o = e, i = Object.keys(t);
  return i.length === Object.keys(o).length && i.every((r) => Object.hasOwn(o, r) && So(t[r], o[r]));
}
function Ki(n, e, t) {
  let o = 0;
  const i = (s) => So(s, e) ? (o++, t) : Array.isArray(s) ? s.map(i) : s && typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, l]) => [a, i(l)])) : s, r = i(n);
  return { config: o === 1 ? r : n, matches: o };
}
const Eo = {
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
}, Zi = {
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
}, Ji = { en: Eo, cs: Zi };
function m(n, e, t = {}) {
  return (Ji[(n ?? "en").split("-")[0]] ?? Eo)[e].replace(/\{(\w+)\}/g, (i, r) => String(t[r] ?? ""));
}
const Wn = {
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
function ue(n, e, t) {
  const o = (n ?? "en").split("-")[0], i = o in Wn ? o : "en", r = Wn[i][e];
  return (r[new Intl.PluralRules(i).select(t)] ?? r.other).replace("{n}", String(t));
}
const Qi = ["todo", "later", "week", "today", "done"], Mt = class Mt extends Oe {
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
    this._unsub || this._subbing || this._retry !== void 0 || !this.hass || !this.isConnected || (this._subbing = !0, xo(this.hass, (e) => {
      this._parents = e.parents;
    }).then((e) => {
      this._attempts = 0, this.isConnected ? this._unsub = e : e();
    }).catch((e) => {
      console.warn("household_kanban: editor subscribe failed", e), this.isConnected && (this._retry = window.setTimeout(() => {
        this._retry = void 0, this._sub();
      }, wo(this._attempts++)));
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
    const o = $o(this._raw, this._config);
    this._raw = o, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: o }, bubbles: !0, composed: !0 }));
  }
  _checks(e, t) {
    var r;
    const o = t.map((s) => s.id), i = (r = this._config) == null ? void 0 : r[e];
    return t.map((s) => h`<label class="row">
      <input type="checkbox" .checked=${!i || i.includes(s.id)}
        @change=${(a) => {
      var l;
      return this._set({ [e]: sn((l = this._config) == null ? void 0 : l[e], o, s.id, a.target.checked) });
    }} />
      <span>${s.name}</span>
    </label>`);
  }
  render() {
    var s, a;
    const e = this._config, t = this.hass;
    if (!e || !t) return b;
    const o = ((s = t.locale) == null ? void 0 : s.language) ?? t.language ?? "en", i = (l) => m(o, l), r = Object.entries(t.states).filter(([l]) => l.startsWith("person.")).map(([l, d]) => ({ id: l, name: String(d.attributes.friendly_name ?? l) }));
    return h`
      <h3>${i("ed_columns")}</h3>
      ${Qi.map((l) => {
      var d;
      return h`<label class="row">
        <input type="checkbox" role="switch" .checked=${((d = e.columns) == null ? void 0 : d.includes(l)) ?? !1} ?disabled=${l === "todo"}
          @change=${(p) => {
        const c = p.target.checked;
        this._set({ columns: (e.columns ?? []).filter((g) => g !== l).concat(c ? [l] : []) });
      }} />
        <span>${i(`col_${l}`)}</span>
      </label>`;
    })}
      ${(a = e.columns) != null && a.includes("done") ? h`
        <div class="row"><span class="grow">${i("ed_done_days")}</span>
          <div class="seg" role="radiogroup" aria-label=${i("ed_done_days")}>
            ${vn.map((l) => h`<button type="button" role="radio" aria-checked=${e.done_days === l}
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
Mt.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _parents: { state: !0 }
}, Mt.styles = eo`
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
let an = Mt;
ko("household-kanban-card-editor", an);
const er = eo`
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
  /* narrow: title + summary on the first row, the buttons on their own row */
  header.narrow { flex-wrap: wrap; justify-content: flex-end; row-gap: 10px; }
  header.narrow .titles { flex-basis: 100%; }
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
  .note { font-size: 13px; line-height: 1.45; color: var(--kb-text-2); overflow-wrap: anywhere; }
  .note.clamp { max-height: calc(var(--clamp, 3) * 1.45em); overflow: hidden; }
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
`, tr = /^- \[( |x|X)\] (.+)$/;
function Tt(n) {
  const e = n.replace(/\r\n?/g, `
`).trimEnd().split(`
`), t = [];
  for (let o; e.length && (o = tr.exec(e[e.length - 1])); e.pop()) t.unshift({ done: o[1] !== " ", text: o[2] });
  return { note: e.join(`
`).trimEnd(), lines: t };
}
const Se = (n) => [...n.filter((e) => !e.done), ...n.filter((e) => e.done)];
function It(n, e) {
  const t = Se(e).map((i) => `- [${i.done ? "x" : " "}] ${i.text}`).join(`
`), o = n.trimEnd();
  return o && t ? `${o}

${t}` : o || t;
}
const Do = (n, e) => Se(Se(n).map((t, o) => o === e ? { ...t, done: !t.done } : t)), nr = (n, e) => Se(n).filter((t, o) => o !== e);
function Co(n, e) {
  const t = e.replace(/[\r\n]+/g, " ").trim();
  return t ? Se([...n, { done: !1, text: t }]) : n;
}
const yn = (n) => ({ done: n.filter((e) => e.done).length, total: n.length });
function Ao(n, e = {}) {
  const t = e.clamp ? `--clamp:${e.clamp}` : b, o = e.clamp ? "note clamp" : "note";
  return customElements.get("ha-markdown") ? h`<div class=${o} style=${t}><ha-markdown .content=${n} breaks></ha-markdown></div>` : h`<div class="${o} plain" style=${t}>${n}</div>`;
}
function or(n, e, t, o) {
  const i = (c, g) => ({
    value: n.slice(0, e) + c + n.slice(e, t) + g + n.slice(t),
    start: e + c.length,
    end: t + c.length
  });
  if (o === "bold") return i("**", "**");
  if (o === "italic") return i("*", "*");
  if (o === "link")
    return { ...i("[", "](https://)"), start: t + 3, end: t + 3 + 8 };
  const r = e ? n.lastIndexOf(`
`, e - 1) + 1 : 0, s = n.indexOf(`
`, t), a = s < 0 ? n.length : s, l = n.slice(r, a).split(`
`), d = l.every((c) => c.startsWith("- ")), p = l.map((c) => d ? c.slice(2) : `- ${c}`).join(`
`);
  return { value: n.slice(0, r) + p + n.slice(a), start: r, end: r + p.length };
}
const ir = ".check, .cl button", ln = (n) => !!n.target.closest(ir) || n.composedPath().some((e) => e.tagName === "A"), rr = 5, To = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"], Re = (n) => `c-${To.includes(n) ? n : "grey"}`;
function dt(n, e) {
  var t;
  return String(((t = n.states[e]) == null ? void 0 : t.attributes.friendly_name) ?? e.split(".")[1] ?? e);
}
function sr(n) {
  return n.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join("");
}
function Fe(n, e = !1) {
  return h`<span class="dot ${e ? "sm" : ""} ${Re((n == null ? void 0 : n.color) ?? "grey")}"><ha-icon .icon=${(n == null ? void 0 : n.icon) ?? "mdi:format-list-checks"}></ha-icon></span>`;
}
function ge(n, e, t = "", o = !1) {
  var a;
  if (!e) return h`<span class="ava none ${t}" title="-">+</span>`;
  const i = dt(n, e), r = (a = n.states[e]) == null ? void 0 : a.attributes.entity_picture;
  if (typeof r == "string" && r) return h`<img class="ava ${t}" src=${r} alt=${o ? "" : i} title=${i} />`;
  const s = [...i].reduce((l, d) => (l * 31 + d.charCodeAt(0)) % 360, 7);
  return h`<span class="ava ${t}" title=${i} style="background:linear-gradient(135deg,hsl(${s} 55% 62%),hsl(${(s + 25) % 360} 55% 42%))">${sr(i)}</span>`;
}
const Oo = h`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function ar(n, e) {
  const t = n.status === "completed";
  return h`<button class="check" type="button" aria-pressed=${t} aria-label=${n.summary}
    @click=${() => e.onToggle(n)}>${Oo}</button>`;
}
function lr(n, e) {
  const { date: t, hasTime: o } = ee(n.due), i = _n(R(e.now), t);
  let r;
  return i === -1 ? r = m(e.lang, "yesterday") : i < -1 ? r = m(e.lang, "days_ago", { n: -i }) : i === 0 ? r = m(e.lang, "today") : i === 1 ? r = m(e.lang, "tomorrow") : r = t.toLocaleDateString(e.lang, { weekday: "short", day: "numeric", month: "numeric" }), o ? `${r} ${t.toLocaleTimeString(e.lang, { hour: "2-digit", minute: "2-digit" })}` : r;
}
function dr(n, e) {
  const t = _n(new Date(n.completed_at), R(e.now));
  return t <= 0 ? m(e.lang, "done_today") : t === 1 ? m(e.lang, "done_yesterday") : m(e.lang, "done_days_ago", { n: t });
}
function Mo(n, e, t) {
  const o = n.status === "completed", i = e.parents.find((_) => _.id === n.parent), r = R(e.now), s = !o && n.due && R(ee(n.due).date) < r, a = !o && n.due && +R(ee(n.due).date) == +r, l = h`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`, { note: d, lines: p } = Tt(n.description), c = Se(p), g = yn(c);
  return h`<article class="card ${o ? "done" : ""}" data-uid=${n.uid} @click=${(_) => {
    ln(_) || e.onOpen(n, _);
  }}>
    <div class="row">
      ${Fe(i, !0)}
      <span class="parent-name">${(i == null ? void 0 : i.name) ?? n.parent}</span>
      ${ge(e.hass, n.assignee)}
    </div>
    <div class="row top">
      ${g.total ? b : ar(n, e)}
      <button class="title" type="button">${n.summary}</button>
      ${g.total ? h`<span class="pill c-green cl-progress">${g.done}/${g.total}</span>` : b}
    </div>
    ${d ? Ao(d, { clamp: 3 }) : b}
    ${g.total ? cr(n, d, c, e) : b}
    <div class="pills">
      ${!o && t ? h`<span class="pill prio-${n.priority} ${Re(["", "red", "orange", "grey"][n.priority])}">${l}${m(e.lang, `prio_${n.priority}`)}</span>` : b}
      ${!o && n.moved > 0 ? h`<span class="pill c-orange">${m(e.lang, n.raised ? "moved_raised" : "moved", { n: n.moved })}</span>` : b}
      ${o && n.completed_at ? h`<span class="pill c-green">${dr(n, e)}</span>` : b}
      ${!o && n.due ? h`<span class="pill ${s ? "c-red" : a ? "today" : "later"}">${lr(n, e)}</span>` : b}
    </div>
  </article>`;
}
function cr(n, e, t, o) {
  const i = (c) => m(o.lang, c), r = yn(t), s = r.total - r.done, a = o.expanded.has(n.uid), l = a ? t : t.slice(0, Math.min(s, rr)), d = s - l.filter((c) => !c.done).length, p = a ? i("cl_hide_ticked") : `+ ${[d ? ue(o.lang, "cl_more", d) : "", r.done ? ue(o.lang, "cl_ticked", r.done) : ""].filter(Boolean).join(" · ")}`;
  return h`<div class="cl-bar"><span style="width:${Math.round(r.done / r.total * 100)}%"></span></div>
    <div class="cl">
      ${l.map((c, g) => h`<button class="cl-row" type="button" role="checkbox" aria-checked=${c.done}
        @click=${() => o.onLines(n, It(e, Do(t, g)))}><span class="cl-box">${Oo}</span><span class="cl-t">${c.text}</span></button>`)}
      ${a || d || r.done ? h`<button class="link muted cl-more" type="button" @click=${() => o.onExpand(n.uid, !a)}>${p}</button>` : b}
      ${!s && n.status !== "completed" ? h`<div class="cl-alldone"><span>${i("cl_all_done")}</span>
        <button class="pill-btn" type="button" @click=${() => o.onToggle(n)}>${i("cl_mark_done")}</button></div>` : b}
    </div>`;
}
function Po(n) {
  const { note: e, lines: t } = Tt(n.description);
  return {
    uid: n.uid,
    status: n.status,
    heading: n.summary,
    parent: n.parent,
    summary: n.summary,
    description: e,
    lines: Se(t),
    base: It(e, t),
    preview: e !== "",
    priority: n.priority,
    assignee: n.assignee,
    date: n.due ? oe(ee(n.due).date) : "",
    time: ji(n.due),
    confirmDelete: !1
  };
}
function pr(n, e, t = {}) {
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
function zo(n) {
  return {
    summary: n.summary.trim(),
    description: It(n.description, n.lines),
    due: Li(n.date, n.date ? n.time : ""),
    priority: n.priority,
    assignee: n.assignee,
    parent: n.parent
  };
}
function Yn(n, e) {
  const t = zo(e), o = Po(n), i = {};
  return t.summary !== n.summary && (i.summary = t.summary), t.description !== e.base && (i.description = hr(e, n.description)), (e.date !== o.date || e.time !== o.time) && (i.due = t.due), t.priority !== n.priority && (i.priority = t.priority), t.assignee !== n.assignee && (i.assignee = t.assignee), t.parent !== n.parent && (i.parent = t.parent), i;
}
function hr(n, e) {
  const t = new Set([...Tt(n.base).lines, ...n.lines].map((i) => i.text)), o = Tt(e).lines.reduce((i, r) => t.has(r.text) ? i : Co(i, r.text), n.lines);
  return It(n.description, o);
}
function kt(n, e) {
  const t = R(e);
  return n === "none" ? "" : oe(n === "today" ? t : n === "tomorrow" ? Z(t, 1) : Z(t, (6 - t.getDay() + 7) % 7));
}
const ur = h`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
function fr(n, e) {
  var s;
  const t = (a) => m(e.lang, a), o = !n.uid, i = ["today", "tomorrow", "weekend", "none"], r = (a) => {
    a.target === a.currentTarget && e.onClose();
  };
  return h`<dialog class="kb-dialog" aria-label=${o ? t("new_task") : n.heading} @close=${e.onClose} @click=${r}>
    <div class="dlg">
      <div class="dlg-head">
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
        @input=${(a) => e.onChange({ summary: a.target.value })} />

      ${n.lines.length || (s = e.parents.find((a) => a.id === n.parent)) != null && s.checklist ? _r(n, e) : b}

      <div class="field">
        <div class="row"><span class="dlg-label grow">${t("f_note")}</span>
          ${n.preview ? b : gr.map(([a, l]) => h`<button class="fmt-btn" type="button" data-fmt=${a} aria-label=${t(`fmt_${a}`)}
            @click=${(d) => Xn(d, a, e)}>${l}</button>`)}
          <span class="seg2" role="group">
            <button class="pill-btn ${n.preview ? "" : "on"}" type="button" aria-pressed=${!n.preview} @click=${() => e.onChange({ preview: !1 })}>${t("note_edit")}</button>
            <button class="pill-btn ${n.preview ? "on" : ""}" type="button" aria-pressed=${n.preview} @click=${() => e.onChange({ preview: !0 })}>${t("note_preview")}</button>
          </span></div>
        ${n.preview ? Ao(n.description) : h`<textarea rows="3" aria-label=${t("f_note")} .value=${n.description} placeholder=${t("f_note_ph")}
          @input=${(a) => e.onChange({ description: a.target.value })}
          @keydown=${(a) => {
    const l = a.key.toLowerCase();
    (a.ctrlKey || a.metaKey) && (l === "b" || l === "i") && (a.preventDefault(), Xn(a, l === "b" ? "bold" : "italic", e));
  }}></textarea>`}
      </div>

      <div class="field"><span class="dlg-label">${t("f_parent")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_parent")}>
          ${e.parents.map((a) => h`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.parent === a.id}
            @click=${() => e.onChange({ parent: a.id })}>${Fe(a, !0)}${a.name}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_prio")}</span>
        <div class="seg3" role="radiogroup" aria-label=${t("f_prio")}>
          ${[1, 2, 3].map((a) => h`<button type="button" role="radio" aria-checked=${n.priority === a}
            class="prio-${a}" @click=${() => e.onChange({ priority: a })}>${ur}${t(`prio_${a}`)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_due")}</span>
        <div class="chips">
          ${i.map((a) => h`<button class="pill-btn ${kt(a, e.now) === n.date ? "on" : ""}" type="button"
            aria-pressed=${kt(a, e.now) === n.date}
            @click=${() => e.onChange({ date: kt(a, e.now), ...a === "none" ? { time: "" } : {} })}>${t(`q_${a}`)}</button>`)}
          <label class="pill-input"><span class="vis-hidden">${t("f_date")}</span>
            <input type="date" .value=${n.date} @input=${(a) => e.onChange({ date: a.target.value })} /></label>
          <label class="pill-input"><span class="vis-hidden">${t("f_time")}</span>
            <input type="time" .value=${n.time} ?disabled=${!n.date} @input=${(a) => e.onChange({ time: a.target.value })} /></label>
        </div></div>

      <div class="field"><span class="dlg-label">${t("f_who")}</span>
        <div class="chips" role="radiogroup" aria-label=${t("f_who")}>
          <button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === null}
            @click=${() => e.onChange({ assignee: null })}>${ge(e.hass, null, "", !0)}${t("unassigned")}</button>
          ${e.people.map((a) => h`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${n.assignee === a}
            @click=${() => e.onChange({ assignee: a })}>${ge(e.hass, a, "", !0)}${dt(e.hass, a)}</button>`)}
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
const gr = [
  ["bold", h`<b>B</b>`],
  ["italic", h`<i>I</i>`],
  ["bullets", "•"],
  ["link", "🔗"]
];
function Xn(n, e, t) {
  var r;
  const o = (r = n.currentTarget.closest(".field")) == null ? void 0 : r.querySelector("textarea");
  if (!o) return;
  const i = or(o.value, o.selectionStart, o.selectionEnd, e);
  o.value = i.value, o.focus(), o.setSelectionRange(i.start, i.end), t.onChange({ description: i.value });
}
const br = h`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>`, mr = h`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;
function _r(n, e) {
  const t = (s) => m(e.lang, s), o = yn(n.lines), i = n.lines.findIndex((s) => s.done), r = (s) => {
    const a = Co(n.lines, s.value);
    s.value = "", a !== n.lines && e.onChange({ lines: a });
  };
  return h`<section class="field cl-list">
    <div class="row"><span class="dlg-label grow">${t("cl_list")}</span>
      ${o.total ? h`<span class="pill c-green">${o.done}/${o.total}</span>` : b}</div>
    <div class="cl-box-list">
      ${n.lines.map((s, a) => h`<div class="cl-item ${s.done ? "done" : ""} ${a === i && a > 0 ? "first-done" : ""}">
        <button class="cl-check" type="button" role="checkbox" aria-checked=${s.done} aria-label=${s.text}
          @click=${() => e.onChange({ lines: Do(n.lines, a) })}>${mr}</button>
        <span class="cl-text">${s.text}</span>
        <button class="cl-x" type="button" aria-label=${t("cl_remove")} @click=${() => e.onChange({ lines: nr(n.lines, a) })}>${br}</button>
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
function Vn(n) {
  if (!n.due) return 1 / 0;
  const { date: e, hasTime: t } = ee(n.due);
  return t ? +e : +new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1) - 1;
}
function Ot(n, e) {
  const t = Vn(n), o = Vn(e);
  return t !== o ? t < o ? -1 : 1 : n.priority - e.priority || +new Date(n.created_at) - +new Date(e.created_at);
}
const vr = ["todo", "later", "week", "overdue", "today", "done"], No = (n, e) => +new Date(e.completed_at ?? 0) - +new Date(n.completed_at ?? 0);
function yr(n, e, t) {
  const { ctx: o } = e, i = n.filter((l) => l.status === "needs_action"), r = n.filter((l) => ke(l, o) === "done").sort(No), s = n.filter((l) => l.status === "completed").length - r.length, a = e.group === "date" ? vr.filter((l) => l !== "done" && (l === "todo" || o.enabled.has(l))).map((l) => ({
    id: l,
    label: m(t, `col_${l}`),
    led: l === "overdue" ? "rgb(var(--c-red))" : l === "week" || l === "today" ? "var(--kb-accent)" : void 0,
    items: i.filter((d) => ke(d, o) === l).sort(Ot)
  })) : [1, 2, 3].map((l) => ({
    id: `p${l}`,
    label: m(t, `prio_${l}`),
    led: l === 1 ? "rgb(var(--c-red))" : l === 2 ? "rgb(var(--c-orange))" : void 0,
    items: i.filter((d) => d.priority === l).sort(Ot)
  }));
  return o.enabled.has("done") && a.push({ id: "done", label: m(t, "col_done"), led: "rgb(var(--c-green))", items: r, done: !0 }), { cols: a, olderDone: s };
}
function xr(n, e, t) {
  const { cols: o, olderDone: i } = yr(n, e, t.lang);
  return h`<div class="board">${o.map((r) => h`<section class="col" data-col=${r.id}>
      <div class="col-head">
        <span class="led" style=${r.led ? `background:${r.led}` : ""}></span>
        <span class="label">${r.label}</span><span class="count">${r.items.length}</span>
        ${r.done || r.id === "overdue" ? b : h`<button class="add" type="button" aria-label=${`${m(t.lang, "add_here")}: ${r.label}`} @click=${() => e.onAdd(r.id)}>+</button>`}
      </div>
      ${r.items.map((s) => Mo(s, t, e.group === "date"))}
      ${r.done ? h`<button class="note note-btn" type="button" @click=${e.onHistory}>${m(t.lang, "done_note", { days: e.ctx.doneDays, older: i })}</button>` : b}
      ${!r.done && r.items.length === 0 ? h`<div class="empty">${m(t.lang, "nothing")}</div>` : b}
    </section>`)}</div>`;
}
const wr = ["today", "week", "todo", "done"];
function kr(n, e) {
  return h`<dialog class="sheet kb-sheet" aria-label=${n.title}
    @cancel=${(t) => {
    t.preventDefault(), n.onCancel();
  }}
    @click=${(t) => {
    t.target === t.currentTarget && n.onClose();
  }}>
    <div class="grabber"><span></span></div>
    <div class="sheet-head">
      <span class="dot ${Re(n.color)}"><ha-icon .icon=${n.icon}></ha-icon></span>
      <h2>${n.title}</h2>
      <span class="count">${n.count}</span>
      <button class="round-btn sclose" type="button" aria-label=${m(e.lang, "close")} @click=${n.onClose}>✕</button>
    </div>
    <div class="sheet-list" @pointerdown=${n.press.down} @pointermove=${n.press.move} @pointerup=${n.press.end}
      @pointercancel=${n.press.end} @pointerleave=${n.press.end} @contextmenu=${(t) => t.preventDefault()}>
      ${n.entries.map((t) => Mo(t, e, !0))}
      ${n.entries.length === 0 ? h`<div class="empty">${m(e.lang, "nothing")}</div>` : b}
      ${n.isDone ? h`<button class="pill-btn hist-link" type="button" @click=${n.onHistory}>${m(e.lang, "older_history", { n: n.olderDone })}</button>` : b}
    </div>
    ${n.menu ? $r(n.menu, n, e) : b}
  </dialog>`;
}
function $r(n, e, t) {
  return h`<div class="menu-wrap" @click=${(o) => {
    o.target === o.currentTarget && e.onMenuClose();
  }}>
    <div class="menu" role="group" aria-label=${m(t.lang, "move_to")}>
      <div class="menu-title">${m(t.lang, "move_to")}<small>${n.summary}</small></div>
      ${wr.map((o) => h`<button class="menu-btn" type="button" data-move=${o} @click=${() => e.onMove(n, o)}>${m(t.lang, `col_${o}`)}</button>`)}
      <button class="menu-btn muted" type="button" @click=${e.onMenuClose}>${m(t.lang, "cancel")}</button>
    </div>
  </div>`;
}
function Sr(n, e) {
  const t = { todo: 0, later: 0, week: 0, today: 0, overdue: 0, done: 0 }, o = R(e.now), i = [], r = [];
  let s = 0;
  for (const l of n) {
    const d = ke(l, e);
    d && t[d]++, d === "today" && i.push(l), d === "week" && r.push(l), d === "today" && l.due && R(ee(l.due).date) < o && s++;
  }
  const a = (l) => l.sort(Ot).slice(0, 3);
  return { counts: t, overdue: s, preview: a(i), weekPreview: a(r) };
}
const Ge = {
  today: { icon: "mdi:calendar-today", color: "blue" },
  overdue: { icon: "mdi:alert-circle-outline", color: "red" },
  week: { icon: "mdi:calendar-week", color: "indigo" },
  todo: { icon: "mdi:format-list-checks", color: "teal" },
  later: { icon: "mdi:calendar-clock", color: "purple" },
  done: { icon: "mdi:check-circle-outline", color: "green" }
}, Er = ["today", "overdue", "week", "later"], Dr = ["todo", "done"];
function Cr(n, e) {
  const t = Sr(n.items, n.ctx), o = n.items.filter((i) => i.status === "needs_action");
  return h`<div class="tiles-view">
    <div class="people ${n.who ? "has-filter" : ""}" role="group" aria-label=${m(e.lang, "filter_people")}>
      ${n.people.map((i) => {
    const r = n.who === i;
    return h`<button class="person" type="button" aria-pressed=${r} @click=${() => n.onWho(r ? null : i)}>
          ${ge(e.hass, i, "lg", !0)}<span>${dt(e.hass, i)}</span></button>`;
  })}
    </div>
    <div class="tiles">
      ${Er.filter((i) => n.ctx.enabled.has(i)).map((i) => {
    const r = i === "today" || i === "week", s = i === "today" ? t.overdue : 0;
    return h`<button class="tile ${r ? "wide" : ""} ${Re(Ge[i].color)}" type="button" data-tile=${i} @click=${() => n.onTile(i)}>
          <span class="row">
            <span class="dot"><ha-icon .icon=${Ge[i].icon}></ha-icon></span>
            <span class="tile-label">${m(e.lang, `col_${i}`)}</span>
            ${s > 0 ? h`<span class="pill c-red">${ue(e.lang, "sum_overdue", s)}</span>` : b}
          </span>
          <span class="tile-count">${t.counts[i]}</span>
          ${r ? h`<span class="preview">${(i === "today" ? t.preview : t.weekPreview).map((a) => h`<span class="row">
            <span class="mark"></span><span class="t">${a.summary}</span>${a.assignee ? ge(e.hass, a.assignee, "xs", !0) : b}</span>`)}</span>` : b}
        </button>`;
  })}
    </div>
    <div class="qchips">
      ${Dr.filter((i) => n.ctx.enabled.has(i)).map((i) => h`<button class="qchip ${Re(Ge[i].color)}" type="button" data-tile=${i} @click=${() => n.onTile(i)}>
        <span class="dot"><ha-icon .icon=${Ge[i].icon}></ha-icon></span>
        <span class="qlabel">${m(e.lang, `col_${i}`)}</span><span class="qcount">${t.counts[i]}</span></button>`)}
    </div>
    <span class="dlg-label tiles-h">${m(e.lang, "lists")}</span>
    <div class="plist">
      ${e.parents.map((i) => h`<button class="prow" type="button" data-parent=${i.id} @click=${() => n.onParent(i.id)}>
        ${Fe(i)}<span class="pname">${i.name}</span>
        <span class="pcount">${o.filter((r) => r.parent === i.id).length}</span><span aria-hidden="true">›</span></button>`)}
    </div>
  </div>`;
}
function Ar(n, e, t, o, i) {
  const r = o.filter((a) => a.status === "needs_action" && (!e.who || a.assignee === e.who)), s = (a) => {
    const l = e.parent === ((a == null ? void 0 : a.id) ?? null), d = r.filter((p) => !a || p.parent === a.id).length;
    return h`<button class="chip ${a ? Re(a.color) : ""}" type="button" aria-pressed=${l}
      @click=${() => i({ parent: l ? null : (a == null ? void 0 : a.id) ?? null })}>
      ${Fe(a ?? void 0)}<span>${(a == null ? void 0 : a.name) ?? m(n.lang, "all_parents")}</span><b>${d}</b></button>`;
  };
  return h`<div class="filters">
    <div class="people ${e.who ? "has-filter" : ""}" role="group" aria-label=${m(n.lang, "filter_people")}>
      ${t.map((a) => {
    const l = e.who === a;
    return h`<button class="person" type="button" aria-pressed=${l} @click=${() => i({ who: l ? null : a })}>
          ${ge(n.hass, a, "lg", !0)}<span>${dt(n.hass, a)}</span></button>`;
  })}
    </div>
    <div class="parents" role="group" aria-label=${m(n.lang, "filter_parents")}>
      ${s(null)}${n.parents.map((a) => s(a))}
    </div>
    <div class="seg" role="group" aria-label=${m(n.lang, "group_label")}>
      ${["date", "priority"].map((a) => h`<button type="button" aria-pressed=${e.group === a}
        @click=${() => i({ group: a })}>${m(n.lang, `group_${a}`)}</button>`)}
    </div>
  </div>`;
}
function Tr(n, e, t, o) {
  const i = R(e), r = Z(i, -((i.getDay() - o + 7) % 7)), s = Z(r, -7), a = new Intl.DateTimeFormat(t, { month: "long", year: "numeric" }), l = /* @__PURE__ */ new Map();
  for (const d of n) {
    const p = new Date(d.completed_at ?? 0);
    let c, g;
    p >= r ? (c = "this", g = m(t, "col_week")) : p >= s ? (c = "last", g = m(t, "hist_last_week")) : (c = `${p.getFullYear()}-${p.getMonth()}`, g = a.format(p), t.startsWith("cs") && (g = g.toLocaleLowerCase("cs")));
    const _ = l.get(c) ?? { label: g, items: [] };
    _.items.push(d), l.set(c, _);
  }
  return [...l.values()];
}
const Or = h`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path></svg>`;
function Mr(n, e) {
  const t = (a) => m(e.lang, a), o = new Intl.DateTimeFormat(e.lang, { day: "numeric", month: "short" }), i = (a) => {
    a.target === a.currentTarget && e.onClose();
  }, r = (a) => e.parents.find((l) => l.id === a), s = Tr(n.items, e.now, e.lang, e.firstDay);
  return h`<dialog class="kb-dialog kb-history" aria-labelledby="kb-hist-title" @close=${e.onClose} @click=${i}>
    <div class="dlg">
      <div class="dlg-head">
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
          @input=${(a) => e.onSearch(a.target.value)} />
      </label>
      <div class="chips" role="group" aria-label=${t("filter_parents")}>
        <button class="pill-btn" type="button" aria-pressed=${n.parent === null} @click=${() => e.onParent(null)}>${t("all_parents")}</button>
        ${e.parents.map((a) => h`<button class="pill-btn hist-chip" type="button" aria-pressed=${n.parent === a.id}
          @click=${() => e.onParent(a.id)}>${Fe(a, !0)}${a.name}</button>`)}
      </div>
      <div class="hist-list">
        ${s.map((a) => h`<section class="hist-group">
          <h3 class="dlg-label">${a.label}</h3>
          <ul class="hist-rows">${a.items.map((l) => {
    var d;
    return h`<li class="hist-row" data-uid=${l.uid}>
            <span class="hist-check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>
            <div class="hist-text"><span class="hist-name">${l.summary}</span>
              <span class="hist-meta">${((d = r(l.parent)) == null ? void 0 : d.name) ?? l.parent} · ${l.completed_at ? o.format(new Date(l.completed_at)) : ""}</span></div>
            ${l.assignee ? ge(e.hass, l.assignee) : b}
            <button class="hist-reopen" type="button" title=${t("reopen")} aria-label=${`${t("reopen")}: ${l.summary}`}
              @click=${() => e.onReopen(l)}>${Or}</button>
          </li>`;
  })}</ul>
        </section>`)}
        ${n.items.length === 0 && !n.loading && !n.error ? h`<div class="empty hist-empty">${t("hist_empty")}</div>` : b}
        ${n.items.length < n.total ? h`<button class="pill-btn hist-more" type="button" ?disabled=${n.loading} @click=${e.onMore}>${t("hist_more")}</button>` : b}
      </div>
    </div>
  </dialog>`;
}
const Zt = "household", Io = { name: "", icon: "mdi:format-list-checks", color: "blue", checklist: !1 };
function Pr(n, e) {
  if (!n || !e) return null;
  const t = ["end_of_day_mode", "close_time", "notify_enabled", "notify_time", "notify_assignee", "notify_services"], o = {};
  for (const i of t) JSON.stringify(n[i]) !== JSON.stringify(e[i]) && (o[i] = e[i]);
  return Object.keys(o).length ? o : null;
}
const zr = ["todo", "later", "week", "today", "done"], Nr = [["board", "tab_board"], ["eod", "tab_eod"], ["lists", "tab_lists"]], Ir = "M3 5h18v12H3zM8 21h8M12 17v4", Rr = "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", He = (n, e = 16) => h`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${n}></path></svg>`;
function Rt(n, e, t, o = {}, i = !1) {
  return h`<button class="switch" type="button" role="switch" aria-checked=${n} aria-label=${e} ?disabled=${i}
    data-col=${o.col ?? b} data-parent=${o.parent ?? b} @click=${t}></button>`;
}
function Jt(n, e, t) {
  return h`<div class="scope ${e ? "household" : "dashboard"}" role="note">
    ${He(e ? Rr : Ir)}
    <span class="scope-text"><b>${m(n, e ? "scope_household" : "scope_dashboard")}</b><span>${m(n, t)}</span></span>
  </div>`;
}
function Hr(n, e) {
  const t = (s) => m(e.lang, s), o = n.columns ?? [], i = (s, a, l, d) => h`
    <div class="set-line"><span class="grow">${s}</span>
      <div class="seg" role="radiogroup" aria-label=${s}>
        ${a.map(([p, c]) => h`<button type="button" role="radio" aria-checked=${p === l} @click=${() => d(p)}>${c}</button>`)}
      </div>
    </div>`, r = ["sort_due", "f_prio", "sort_created"];
  return h`
    <section class="set-sec">
      <h3 class="dlg-label">${t("columns")}</h3>
      <div class="set-rows">${zr.map((s) => h`<div class="set-row">
        <span class="led led-${s}"></span>
        <span class="set-text"><span class="set-name">${t(`col_${s}`)}</span><span class="set-hint">${t(`col_hint_${s}`)}</span></span>
        ${Rt(
    s === "todo" || o.includes(s),
    t(`col_${s}`),
    () => e.onChange({ columns: o.filter((a) => a !== s).concat(o.includes(s) ? [] : [s]) }),
    { col: s },
    s === "todo"
  )}
      </div>`)}</div>
      ${o.includes("done") ? h`
        ${i(t("done_keep"), vn.map((s) => [s, ue(e.lang, "days", s)]), n.done_days, (s) => e.onChange({ done_days: s }))}
        <span class="set-hint pad">${t("done_keep_hint")}</span>` : b}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("view")}</h3>
      ${i(t("group_label"), [["date", t("group_date")], ["priority", t("group_priority")]], n.group, (s) => e.onChange({ group: s }))}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("sort_order")}</h3>
      <div class="sort-keys">${r.map((s, a) => h`${a ? He("M9 6l6 6-6 6") : b}<span class="sort-key"><span class="sort-n">${a + 1}</span>${t(s)}</span>`)}</div>
      <span class="set-hint pad">${t("sort_hint")}</span>
    </section>`;
}
const Fr = [
  ["keep", "M5 21V4h11l-1.5 4L16 12H5", "red"],
  ["overdue", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16.5h.01", "red"],
  ["move", "M4 12h13M13 7l5 5-5 5M20 5v14", "blue"],
  ["raise", "M12 19V5M6 11l6-6 6 6", "orange"]
], Lr = /^([01]\d|2[0-3]):[0-5]\d$/, jr = h`<span class="box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>`;
function Gn(n, e, t) {
  return h`<input class="time-in" type="time" aria-label=${e} .value=${n}
    @change=${(o) => {
    const i = o.target.value;
    Lr.test(i) && t(i);
  }}>`;
}
function Kn(n, e, t, o, i) {
  return h`<button class="check-row" type="button" role="checkbox" aria-checked=${n} data-service=${i ?? b} @click=${o}>
    ${jr}${i ? He("M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2") : b}
    <span class="set-text"><span class="set-name">${e}</span><span class="set-hint ${i ? "mono" : ""}">${t}</span></span>
  </button>`;
}
function qr(n, e) {
  const t = (a) => m(e.lang, a), o = n.eod;
  if (!o) return n.eodLoading ? h`<p class="set-hint pad">${t("loading")}</p>` : h``;
  const i = [...o.offered_services, ...o.notify_services.filter((a) => !o.offered_services.includes(a))], [r, s] = m(e.lang, "event_hint", { event: "\0" }).split("\0");
  return h`
    <section class="set-sec">
      <h3 class="dlg-label">${t("eod_title")}</h3>
      <div class="eod-opts" role="radiogroup" aria-label=${t("eod_title")}>${Fr.map(([a, l, d]) => h`
        <button class="eod-opt" type="button" role="radio" data-mode=${a} aria-checked=${o.end_of_day_mode === a} @click=${() => e.onEod({ end_of_day_mode: a })}>
          <span class="radio"></span><span class="dot c-${d}">${He(l, 15)}</span>
          <span class="set-text"><span class="set-name">${t(`eod_${a}`)}</span><span class="set-hint">${t(`eod_${a}_hint`)}</span></span>
        </button>`)}</div>
      <label class="set-line"><span class="grow">${t("close_at")}</span>${Gn(o.close_time, t("close_at"), (a) => e.onEod({ close_time: a }))}</label>
      <span class="set-hint pad">${t("close_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${t("notify_title")}</h3>
      <div class="set-rows">
        <div class="set-row">
          <span class="set-text"><span class="set-name">${t("notify_on")}</span><span class="set-hint">${t("notify_on_hint")}</span></span>
          ${Rt(o.notify_enabled, t("notify_on"), () => e.onEod({ notify_enabled: !o.notify_enabled }))}
        </div>
        ${o.notify_enabled ? h`
          <label class="set-row">
            <span class="set-text"><span class="set-name">${t("notify_at")}</span><span class="set-hint">${t("notify_at_hint")}</span></span>
            ${Gn(o.notify_time, t("notify_at"), (a) => e.onEod({ notify_time: a }))}
          </label>
          <div class="notify-whom">
            <span class="set-name">${t("notify_whom")}</span>
            ${Kn(o.notify_assignee, t("notify_assignee"), t("notify_assignee_hint"), () => e.onEod({ notify_assignee: !o.notify_assignee }))}
            ${i.map((a) => {
    const l = o.notify_services.includes(a), d = o.offered_services.includes(a) ? a.replace(/^notify\.mobile_app_/, "").replace(/_/g, " ") : a;
    return Kn(l, d, a, () => e.onEod({ notify_services: l ? o.notify_services.filter((p) => p !== a) : [...o.notify_services, a] }), a);
  })}
          </div>` : b}
      </div>
      ${o.notify_enabled ? h`<span class="set-hint pad">${r}<code class="mono">household_kanban_day_closed</code>${s}</span>` : b}
    </section>`;
}
function Zn(n, e) {
  const t = (s) => m(e.lang, s), o = (s) => e.onForm({ ...n, ...s, error: !1 }), i = e.parents.filter((s) => s.id !== n.id), r = (s) => s.target.value;
  return h`<div class="parent-form">
    <label class="field"><span class="dlg-label">${t("list_name")}</span>
      <input class="text-in" name="name" .value=${n.name} @input=${(s) => o({ name: r(s) })}></label>
    <label class="field"><span class="dlg-label">${t("list_icon")}</span>
      ${customElements.get("ha-icon-picker") ? h`<ha-icon-picker .hass=${e.hass} .value=${n.icon} @value-changed=${(s) => o({ icon: s.detail.value ?? "" })}></ha-icon-picker>` : h`<input class="text-in mono" name="icon" placeholder="mdi:…" .value=${n.icon} @input=${(s) => o({ icon: r(s) })}>`}</label>
    <div class="field"><span class="dlg-label">${t("list_color")}</span>
      <div class="chips" role="radiogroup" aria-label=${t("list_color")}>${To.map((s) => h`
        <button class="color-chip c-${s}" type="button" role="radio" data-color=${s} aria-label=${s} aria-checked=${n.color === s} @click=${() => o({ color: s })}></button>`)}</div></div>
    <div class="set-line"><span class="set-text grow"><span class="set-name">${t("list_checklist")}</span><span class="set-hint">${t("list_checklist_hint")}</span></span>${Rt(n.checklist, t("list_checklist"), () => o({ checklist: !n.checklist }))}</div>
    ${n.target !== void 0 ? h`<label class="field"><span class="dlg-label">${t("move_items_to")}</span>
      <select class="text-in" @change=${(s) => o({ target: r(s) })}>${i.map((s) => h`<option value=${s.id} ?selected=${s.id === n.target}>${s.name}</option>`)}</select></label>` : b}
    ${n.error ? h`<div class="notice" role="alert">${t("err_parent")}</div>` : b}
    <div class="form-foot">
      ${n.id && n.id !== Zt && n.target === void 0 && i.length ? h`<button class="pill-btn remove-parent" type="button"
        @click=${() => o({ target: i.some((s) => s.id === Zt) ? Zt : i[0].id })}>${t("remove_list")}</button>` : b}
      <span class="grow"></span>
      <button class="pill-btn" type="button" @click=${() => e.onForm(void 0)}>${t("cancel")}</button>
      ${n.target === void 0 ? h`<button class="primary-btn save-parent" type="button" ?disabled=${n.busy || !n.name.trim()} @click=${e.onFormSave}>${t("save")}</button>` : h`<button class="primary-btn confirm-remove" type="button" ?disabled=${n.busy} @click=${e.onFormRemove}>${t("remove_list")}</button>`}
    </div>
  </div>`;
}
function Br(n, e, t) {
  const o = (r) => m(t.lang, r), i = t.parents.map((r) => r.id);
  return h`
    <section class="set-sec">
      <h3 class="dlg-label">${o("lists_here")}</h3>
      <div class="set-rows">${t.parents.map((r) => {
    const s = !n.parents || n.parents.includes(r.id);
    return h`<div class="set-row">
          ${Fe(r)}
          <span class="set-text"><span class="set-name">${r.name}</span><span class="set-hint mono">${r.entity_id}</span></span>
          ${r.checklist ? h`<span class="set-badge">${o("list_checklist")}</span>` : b}
          ${Rt(s, m(t.lang, "show_list", { name: r.name }), () => t.onChange({ parents: sn(n.parents, i, r.id, !s) }), { parent: r.id })}
          <button class="icon-btn edit-list" type="button" data-parent=${r.id} aria-label=${o("edit_list")} aria-expanded=${(e == null ? void 0 : e.id) === r.id}
            @click=${() => t.onForm((e == null ? void 0 : e.id) === r.id ? void 0 : { id: r.id, name: r.name, icon: r.icon, color: r.color, checklist: r.checklist })}>${He("M4 20h4L19 9l-4-4L4 16zM14 6l4 4")}</button>
        </div>${(e == null ? void 0 : e.id) === r.id ? Zn(e, t) : b}`;
  })}</div>
      ${e && e.id === void 0 ? Zn(e, t) : h`<button class="add-list" type="button" @click=${() => t.onForm({ ...Io })}>${He("M12 5v14M5 12h14", 14)}${o("add_list")}</button>`}
      <span class="set-hint pad">${o("lists_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${o("people_filter")}</h3>
      <div class="chips">${t.people.map((r) => {
    const s = !n.people || n.people.includes(r);
    return h`<button class="pill-btn person-chip" type="button" aria-pressed=${s} data-person=${r}
          @click=${() => t.onChange({ people: sn(n.people, t.people, r, !s) })}>${ge(t.hass, r, "", !0)}${dt(t.hass, r)}</button>`;
  })}</div>
    </section>`;
}
function Ur(n, e) {
  const t = (r) => m(e.lang, r), o = (r) => {
    r.target === r.currentTarget && e.onClose();
  }, i = n.tab === "board" ? h`${Jt(e.lang, !1, "scope_dashboard_hint")}${Hr(n.draft, e)}` : n.tab === "lists" ? h`${Jt(e.lang, !1, "scope_lists_hint")}${Br(n.draft, n.form, e)}` : h`${Jt(e.lang, !0, "scope_household_hint")}${qr(n, e)}`;
  return h`<dialog class="kb-dialog kb-settings ${n.narrow ? "narrow" : ""}" aria-labelledby="kb-set-title" @close=${e.onClose} @click=${o}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><span class="dlg-kicker">${t("settings")}</span>
          <h2 id="kb-set-title" class="hist-title">${t("title")} · ${t("settings")}</h2></div>
        <button class="round-btn" type="button" aria-label=${t("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      <div class="set-tabs" role="tablist" aria-label=${t("settings")}>
        ${Nr.map(([r, s]) => h`<button type="button" role="tab" data-tab=${r} aria-selected=${n.tab === r} @click=${() => e.onTab(r)}>${t(s)}</button>`)}
      </div>
      <div class="set-body" role="tabpanel">${i}</div>
      ${n.error ? h`<div class="notice" role="alert">${t(n.error)}</div>` : b}
      <div class="dlg-foot">
        <span class="grow"></span>
        <button class="pill-btn" type="button" @click=${e.onClose}>${t("cancel")}</button>
        <button class="primary-btn" type="button" ?disabled=${n.saving} @click=${e.onSave}>${t("save")}</button>
      </div>
    </div>
  </dialog>`;
}
const Wr = 50, Yr = 600, Xr = 500, Vr = h`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`, Pt = class Pt extends Oe {
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
      var o;
      const t = ((o = e[e.length - 1]) == null ? void 0 : o.contentRect.width) ?? 0;
      t > 0 && (this._narrow = t < Yr), this._narrow || this._closeSheet();
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
    const e = xo(this.hass, (t) => {
      var o;
      for (const [i, r] of this._ticks) ((o = t.items.find((s) => s.uid === i)) == null ? void 0 : o.description) !== r.base && this._ticks.delete(i);
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
      }, wo(this._attempts++)));
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
    this._dialogWrite("err_save", () => o ? bt(e, o.uid, Yn(o, t)) : Ti(e, zo(t)));
  }
  /** Tap on a card; a click that ends a drag is not a tap. */
  _open(e, t) {
    const o = t, i = this._down;
    if (this._down = void 0, this._lpFired) {
      this._lpFired = !1;
      return;
    }
    o.detail !== 0 && i && Bn(o.clientX - i.x, o.clientY - i.y, t.timeStamp - i.t) || this._openDialog(Po(e), () => {
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
    const e = this.hass, t = this._settings, o = this._seq;
    if (!e || !t || t.saving) return;
    const i = () => o === this._seq && !!this._settings, r = (d) => {
      i() && (this._settings = { ...this._settings, ...d });
    };
    r({ saving: !0, error: void 0 });
    const s = Pe(t.draft);
    let a = JSON.stringify(s) === JSON.stringify(this._config) ? void 0 : await this._saveDashboard(e, s, i);
    const l = Pr(t.server, t.eod);
    if (l && i())
      try {
        const d = await Ni(e, l);
        r({ server: d });
      } catch (d) {
        console.warn("household_kanban: settings update failed", d), a ?? (a = "err_settings");
      }
    i() && (a ? r({ saving: !1, error: a }) : this._settings = void 0);
  }
  /** Write the config into this card's entry of the dashboard config; HA reloads the dashboard after the save. */
  async _saveDashboard(e, t, o) {
    const i = Gi(window.location.pathname);
    try {
      const r = await Mi(e, i);
      if (r && typeof r == "object" && "strategy" in r) return "err_not_editable";
      const s = $o(this._raw, t), a = Ki(r, this._raw, s);
      if (a.matches !== 1) return a.matches ? "err_card_ambiguous" : "err_card_missing";
      if (!o()) return;
      await Pi(e, i, a.config), this.setConfig(s);
      return;
    } catch (r) {
      console.warn("household_kanban: dashboard save failed", r);
      const s = r;
      return (s == null ? void 0 : s.code) === "config_not_editable" || (s == null ? void 0 : s.code) === "config_not_found" || /yaml/i.test((s == null ? void 0 : s.message) ?? "") ? "err_not_editable" : "err_settings";
    }
  }
  /** Household settings, loaded when the End of day tab first opens. */
  async _loadEod() {
    const e = this.hass, t = this._settings, o = this._seq;
    if (!e || !t || t.server || t.eodLoading) return;
    const i = (r) => {
      o === this._seq && this._settings && (this._settings = { ...this._settings, ...r });
    };
    i({ eodLoading: !0, error: void 0 });
    try {
      const r = await zi(e);
      i({ server: r, eod: r, eodLoading: !1 });
    } catch (r) {
      console.warn("household_kanban: settings load failed", r), i({ eodLoading: !1, error: "err_load_settings" });
    }
  }
  /** Add, edit or remove a list right away; the new board arrives through the subscription. */
  async _parentWrite(e) {
    var a, l;
    const t = this.hass, o = (a = this._settings) == null ? void 0 : a.form, i = this._seq;
    if (!t || !o || o.busy) return;
    const r = () => {
      var d, p;
      return i === this._seq && ((p = (d = this._settings) == null ? void 0 : d.form) == null ? void 0 : p.id) === o.id;
    }, s = (d) => {
      r() && this._settings && (this._settings = { ...this._settings, form: d });
    };
    s({ ...o, busy: !0, error: !1 });
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
    const t = { name: e.name.trim(), icon: e.icon.trim() || Io.icon, color: e.color, checklist: e.checklist };
    if (!e.id) {
      const a = this._seq;
      this._parentWrite(async (l) => {
        const d = await Ii(l, t), p = this._settings;
        a === this._seq && (p != null && p.draft.parents) && (d != null && d.id) && (this._settings = { ...p, draft: { ...p.draft, parents: [...p.draft.parents, d.id] } });
      });
      return;
    }
    const o = (s = this._board) == null ? void 0 : s.parents.find((a) => a.id === e.id), i = Object.fromEntries(Object.entries(t).filter(([a, l]) => !o || o[a] !== l));
    if (!Object.keys(i).length) {
      this._settings && (this._settings = { ...this._settings, form: void 0 });
      return;
    }
    this._parentWrite((a) => Ri(a, e.id, i));
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
      const r = await Ai(t, {
        search: o.search.trim() || void 0,
        parent: o.parent ?? void 0,
        offset: e ? 0 : o.items.length,
        limit: Wr
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
    var o, i, r, s;
    const e = this.renderRoot.querySelector(".hist-more"), t = ((o = this._hist) == null ? void 0 : o.items.length) ?? 0;
    if (!e || (i = this._hist) != null && i.loading) {
      e || ((r = this._hObs) == null || r.disconnect(), this._hMore = null);
      return;
    }
    ((s = this._hMore) == null ? void 0 : s.el) === e && this._hMore.n === t || (this._hMore = { el: e, n: t }, !(typeof IntersectionObserver > "u") && (this._hObs ?? (this._hObs = new IntersectionObserver((a) => {
      a.some((l) => l.isIntersecting) && this._loadHistory(!1);
    })), this._hObs.disconnect(), this._hObs.observe(e)));
  }
  _add(e, t, o, i, r = `.col[data-col="${e}"] .add`) {
    const s = () => this.renderRoot.querySelector(r), a = this._filter.parent ?? "household", l = t.find((c) => c.id === a) ?? t[0];
    if (!l) return;
    const d = /^p([123])$/.exec(e), p = {
      today: kt("today", o.now),
      week: oe(o.week.end),
      later: oe(Z(o.week.end, 1))
    };
    this._openDialog(pr(l, i, d ? { priority: Number(d[1]) } : { date: p[e] ?? "" }), s);
  }
  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  _syncSortables() {
    var o;
    const e = new Set(this.renderRoot.querySelectorAll(".col"));
    for (const [i, r] of this._sortables) e.has(i) || (r.destroy(), this._sortables.delete(i));
    const t = ((o = window.matchMedia) == null ? void 0 : o.call(window, "(pointer: coarse)").matches) ?? !1;
    for (const i of e)
      this._sortables.has(i) || this._sortables.set(i, x.create(i, {
        group: { name: "kb", pull: !0, put: (r) => r.el.dataset.col !== "overdue" },
        draggable: "[data-uid]",
        filter: (r) => ln(r),
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
    const o = this.hass, i = this._ctx, r = (c = this._board) == null ? void 0 : c.items.find((g) => g.uid === e);
    if (!o || !i || !r || !t) return;
    const s = /^p([123])$/.exec(t), a = Wi(r, s ? Number(s[1]) : t, i);
    if (!a) return;
    const { status: l, ...d } = a;
    (async () => {
      Object.keys(d).length && await bt(o, r.uid, d), l && await gt(o, r.uid, l);
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
    const t = e.target, o = t.closest("[data-uid]"), i = o == null ? void 0 : o.dataset.uid;
    !i || ln(e) || (this._lp = { x: e.clientX, y: e.clientY, timer: window.setTimeout(() => {
      this._lp = void 0, this._lpFired = !0, this._menu = i, this._menuFor = i;
    }, Xr) });
  }
  _lpMove(e) {
    const t = this._lp;
    t && Bn(e.clientX - t.x, e.clientY - t.y) && this._lpCancel();
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
    const o = this.renderRoot.querySelector(".menu-btn");
    if (o && !this._menuShown)
      this._menuShown = !0, o.focus();
    else if (!o && this._menuShown) {
      this._menuShown = !1;
      const l = this._menuFor;
      (a = ((s = [...this.renderRoot.querySelectorAll(".sheet [data-uid]")].find((p) => p.dataset.uid === l)) == null ? void 0 : s.querySelector(".title")) ?? this.renderRoot.querySelector(".sheet .sclose")) == null || a.focus();
    }
  }
  updated() {
    var o, i, r, s;
    this._syncSortables(), this._observeMore();
    const e = this.renderRoot.querySelector("dialog.kb-sheet");
    e && !e.open && e.showModal();
    const t = this.renderRoot.querySelector("dialog.kb-dialog");
    if (this._sheetFocus(!!t), t && !t.open)
      t.showModal(), this._hist ? (o = this.renderRoot.querySelector(".kb-history input")) == null || o.focus() : (i = this._draft) != null && i.uid || (r = this.renderRoot.querySelector(".cl-add input") ?? this.renderRoot.querySelector("#kb-title")) == null || r.focus();
    else if (!t && this._returnTo) {
      const a = this._returnTo;
      this._returnTo = void 0, (s = a()) == null || s.focus();
    }
  }
  render() {
    var k, v;
    const e = this.hass, t = this._config, o = this._board;
    if (!e || !t) return b;
    const i = ((k = e.locale) == null ? void 0 : k.language) ?? e.language ?? "en";
    if (!o) return h`<ha-card><div class="loading">${m(i, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;
    const r = /* @__PURE__ */ new Date(), s = o.parents.filter((u) => !t.parents || t.parents.includes(u.id)), a = new Set(t.columns ?? []);
    a.add("todo"), o.end_of_day_mode === "overdue" && a.add("overdue");
    const l = {
      now: r,
      enabled: a,
      mode: o.end_of_day_mode,
      doneDays: t.done_days ?? 7,
      week: qi(r, qn(e.locale))
    };
    this._ctx = l;
    const d = {
      hass: e,
      lang: i,
      now: r,
      parents: s,
      expanded: this._expanded,
      onExpand: (u, $) => {
        const D = new Set(this._expanded);
        $ ? D.add(u) : D.delete(u), this._expanded = D;
      },
      // ponytail: the whole description is written, so two people ticking in the same second is last write wins;
      // a per-line server op can come later. Own rapid ticks build on `_ticks` until the board echoes them.
      onLines: (u, $) => {
        var z, P, W;
        const D = ((z = this._ticks.get(u.uid)) == null ? void 0 : z.base) ?? ((W = (P = this._board) == null ? void 0 : P.items.find((F) => F.uid === u.uid)) == null ? void 0 : W.description) ?? u.description;
        this._ticks.set(u.uid, { base: D, next: $ }), this.requestUpdate(), bt(e, u.uid, { description: $ }).catch((F) => {
          var K;
          console.warn("household_kanban: update_item failed", F), ((K = this._ticks.get(u.uid)) == null ? void 0 : K.next) === $ && (this._ticks.delete(u.uid), this.requestUpdate()), this._fail("err_update");
        });
      },
      onOpen: (u, $) => this._open(u, $),
      onToggle: (u) => {
        gt(e, u.uid, u.status === "completed" ? "needs_action" : "completed").catch(($) => {
          console.warn("household_kanban: set_status failed", $), this._fail("err_update");
        });
      }
    }, p = t.people ?? Object.keys(e.states).filter((u) => u.startsWith("person.")), c = this._filter, g = o.items.filter((u) => s.some(($) => $.id === u.parent)).map((u) => {
      const $ = this._ticks.get(u.uid);
      return $ ? { ...u, description: $.next } : u;
    }), _ = g.filter((u) => (!c.who || u.assignee === c.who) && (!c.parent || u.parent === c.parent));
    return h`<ha-card>
      ${this._notice ? h`<div class="notice" role="alert">${m(i, this._notice)}</div>` : b}
      <header class=${this._narrow ? "narrow" : ""}>
        <div class="titles"><h1>${m(i, "title")}</h1><div class="summary">${this._summary(g, l, i)}</div></div>
        ${(v = e.user) != null && v.is_admin ? h`<button class="round-btn gear-btn" type="button" aria-label=${m(i, "settings")} title=${m(i, "settings")}
          @click=${() => this._openSettings()}>${Vr}</button>` : b}
        <button class="pill-btn hist-btn" type="button" @click=${() => this._openHistory("header .hist-btn")}>${m(i, "history")}</button>
        <button class="new" type="button" @click=${() => this._add("todo", s, l, i, "header .new")}>+ ${m(i, "new_note")}</button>
      </header>
      ${this._narrow ? this._renderNarrow(d, l, g, p, s) : h`
      ${Ar(d, c, p, g, (u) => {
      this._filter = { ...c, ...u };
    })}
      ${xr(_, {
      ctx: l,
      group: c.group,
      onAdd: (u) => this._add(u, s, l, i),
      onHistory: () => this._openHistory('.col[data-col="done"] .note-btn')
    }, d)}`}
      ${this._hist ? Mr(this._hist, {
      hass: e,
      lang: i,
      now: r,
      parents: s,
      firstDay: qn(e.locale),
      onSearch: (u) => this._histFilter({ search: u }, 300),
      onParent: (u) => this._histFilter({ parent: u }, 0),
      onReopen: (u) => this._reopen(u.uid),
      onMore: () => void this._loadHistory(!1),
      onClose: () => this._closeHistory()
    }) : b}
      ${this._settings ? Ur({ ...this._settings, narrow: this._narrow }, {
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
        const $ = this._settings;
        $ != null && $.eod && (this._settings = { ...$, eod: { ...$.eod, ...u }, error: void 0 });
      },
      onForm: (u) => {
        this._settings && (this._settings = { ...this._settings, form: u });
      },
      onFormSave: () => this._saveParent(),
      onFormRemove: () => {
        var $;
        const u = ($ = this._settings) == null ? void 0 : $.form;
        u != null && u.id && u.target && this._parentWrite((D) => Hi(D, u.id, u.target));
      },
      onSave: () => void this._saveSettings(),
      onClose: () => {
        this._seq++, this._settings = void 0;
      }
    }) : b}
      ${this._draft ? fr(this._draft, {
      hass: e,
      lang: i,
      now: r,
      parents: s,
      people: p,
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
        var P;
        const u = this._draft, $ = u == null ? void 0 : u.uid;
        if (!u || !$) return;
        const D = (P = this._board) == null ? void 0 : P.items.find((W) => W.uid === $);
        if (!D) {
          this._dlgError = "err_update";
          return;
        }
        const z = Yn(D, u);
        this._dialogWrite("err_update", async () => {
          Object.keys(z).length && await bt(e, $, z), await gt(e, $, u.status === "completed" ? "needs_action" : "completed");
        });
      },
      onDelete: () => {
        const u = this._draft;
        u != null && u.uid && this._dialogWrite("err_delete", () => Oi(e, u.uid));
      }
    }) : b}
    </ha-card>`;
  }
  /** Tiles + parents list, and the bottom sheet when one is open. */
  _renderNarrow(e, t, o, i, r) {
    const s = this._filter.who, a = o.filter((c) => !s || c.assignee === s);
    let l = this._sheet, d = b;
    const p = (l == null ? void 0 : l.kind) === "parent" ? r.find((c) => c.id === (l == null ? void 0 : l.id)) : void 0;
    if ((l == null ? void 0 : l.kind) === "parent" && !p && (l = void 0, queueMicrotask(() => this._closeSheet())), l) {
      const c = l.id, g = (v) => v.filter((u) => u.status === "needs_action").sort(Ot), _ = l.kind === "parent" ? g(a.filter((v) => v.parent === l.id)) : c === "done" ? a.filter((v) => ke(v, t) === "done").sort(No) : g(a.filter((v) => ke(v, t) === c)), k = p ? { icon: p.icon, color: p.color, title: p.name } : { ...Ge[c], title: m(e.lang, `col_${c}`) };
      d = kr({
        ...k,
        count: _.length,
        isDone: c === "done" && !p,
        entries: _,
        olderDone: a.filter((v) => v.status === "completed").length - _.length,
        menu: this._menu ? a.find((v) => v.uid === this._menu) : void 0,
        onClose: () => this._closeSheet(),
        onCancel: () => this._sheetCancel(),
        onHistory: () => this._openHistory(".sheet .hist-link"),
        onMove: (v, u) => {
          this._closeMenu(), this._drop(v.uid, u);
        },
        onMenuClose: () => this._closeMenu(),
        press: { down: (v) => this._lpStart(v), move: (v) => this._lpMove(v), end: () => this._lpCancel() }
      }, e);
    }
    return h`${Cr({
      ctx: t,
      items: a,
      people: i,
      who: s,
      onWho: (c) => {
        this._filter = { ...this._filter, who: c };
      },
      onTile: (c) => this._openSheet("col", c, `[data-tile="${c}"]`),
      onParent: (c) => this._openSheet("parent", c, `.prow[data-parent="${c}"]`)
    }, e)}${d}`;
  }
  _summary(e, t, o) {
    const i = e.filter((d) => d.status === "needs_action"), r = R(t.now), s = i.filter((d) => d.due && R(ee(d.due).date) < r).length, a = i.filter((d) => ke(d, t) === "today").length, l = t.mode === "overdue" ? ue(o, "sum_overdue", s) : ue(o, "sum_moved", i.filter((d) => d.moved > 0).length);
    return [ue(o, "sum_open", i.length), ue(o, "sum_today", a), l].join(" · ");
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
}, Pt.styles = er;
let dn = Pt;
const cn = "household-kanban-card";
ko(cn, dn);
(window.customCards ?? (window.customCards = [])).some((n) => n.type === cn) || window.customCards.push({ type: cn, name: "Household Kanban", description: "Kanban board for household tasks" });
