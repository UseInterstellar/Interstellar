(()=>{
    "use strict";
    var t = {
        666: t=>{
            var e, r = "object" == typeof Reflect ? Reflect : null, i = r && "function" == typeof r.apply ? r.apply : function(t, e, r) {
                return Function.prototype.apply.call(t, e, r)
            }
            ;
            e = r && "function" == typeof r.ownKeys ? r.ownKeys : Object.getOwnPropertySymbols ? function(t) {
                return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
            }
            : function(t) {
                return Object.getOwnPropertyNames(t)
            }
            ;
            var o = Number.isNaN || function(t) {
                return t != t
            }
            ;
            function s() {
                s.init.call(this)
            }
            t.exports = s,
            t.exports.once = function(t, e) {
                return new Promise(function(r, i) {
                    function o(r) {
                        t.removeListener(e, s),
                        i(r)
                    }
                    function s() {
                        "function" == typeof t.removeListener && t.removeListener("error", o),
                        r([].slice.call(arguments))
                    }
                    v(t, e, s, {
                        once: !0
                    }),
                    "error" !== e && "function" == typeof t.on && v(t, "error", o, {
                        once: !0
                    })
                }
                )
            }
            ,
            s.EventEmitter = s,
            s.prototype._events = void 0,
            s.prototype._eventsCount = 0,
            s.prototype._maxListeners = void 0;
            var n = 10;
            function a(t) {
                if ("function" != typeof t)
                    throw TypeError('The "listener" argument must be of type Function. Received type ' + typeof t)
            }
            function h(t) {
                return void 0 === t._maxListeners ? s.defaultMaxListeners : t._maxListeners
            }
            function l(t, e, r, i) {
                var o, s, n;
                if (a(r),
                void 0 === (s = t._events) ? (s = t._events = Object.create(null),
                t._eventsCount = 0) : (void 0 !== s.newListener && (t.emit("newListener", e, r.listener ? r.listener : r),
                s = t._events),
                n = s[e]),
                void 0 === n)
                    n = s[e] = r,
                    ++t._eventsCount;
                else if ("function" == typeof n ? n = s[e] = i ? [r, n] : [n, r] : i ? n.unshift(r) : n.push(r),
                (o = h(t)) > 0 && n.length > o && !n.warned) {
                    n.warned = !0;
                    var l = Error("Possible EventEmitter memory leak detected. " + n.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    l.name = "MaxListenersExceededWarning",
                    l.emitter = t,
                    l.type = e,
                    l.count = n.length,
                    console && console.warn && console.warn(l)
                }
                return t
            }
            function d() {
                if (!this.fired)
                    return this.target.removeListener(this.type, this.wrapFn),
                    this.fired = !0,
                    0 == arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            }
            function c(t, e, r) {
                var i = {
                    fired: !1,
                    wrapFn: void 0,
                    target: t,
                    type: e,
                    listener: r
                }
                  , o = d.bind(i);
                return o.listener = r,
                i.wrapFn = o,
                o
            }
            function u(t, e, r) {
                var i = t._events;
                if (void 0 === i)
                    return [];
                var o = i[e];
                return void 0 === o ? [] : "function" == typeof o ? r ? [o.listener || o] : [o] : r ? function(t) {
                    for (var e = Array(t.length), r = 0; r < e.length; ++r)
                        e[r] = t[r].listener || t[r];
                    return e
                }(o) : w(o, o.length)
            }
            function p(t) {
                var e = this._events;
                if (void 0 !== e) {
                    var r = e[t];
                    if ("function" == typeof r)
                        return 1;
                    if (void 0 !== r)
                        return r.length
                }
                return 0
            }
            function w(t, e) {
                for (var r = Array(e), i = 0; i < e; ++i)
                    r[i] = t[i];
                return r
            }
            function v(t, e, r, i) {
                if ("function" == typeof t.on)
                    i.once ? t.once(e, r) : t.on(e, r);
                else {
                    if ("function" != typeof t.addEventListener)
                        throw TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
                    t.addEventListener(e, function o(s) {
                        i.once && t.removeEventListener(e, o),
                        r(s)
                    })
                }
            }
            Object.defineProperty(s, "defaultMaxListeners", {
                enumerable: !0,
                get: function() {
                    return n
                },
                set: function(t) {
                    if ("number" != typeof t || t < 0 || o(t))
                        throw RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
                    n = t
                }
            }),
            s.init = function() {
                void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null),
                this._eventsCount = 0),
                this._maxListeners = this._maxListeners || void 0
            }
            ,
            s.prototype.setMaxListeners = function(t) {
                if ("number" != typeof t || t < 0 || o(t))
                    throw RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
                return this._maxListeners = t,
                this
            }
            ,
            s.prototype.getMaxListeners = function() {
                return h(this)
            }
            ,
            s.prototype.emit = function(t) {
                for (var e = [], r = 1; r < arguments.length; r++)
                    e.push(arguments[r]);
                var o = "error" === t
                  , s = this._events;
                if (void 0 !== s)
                    o = o && void 0 === s.error;
                else if (!o)
                    return !1;
                if (o) {
                    if (e.length > 0 && (n = e[0]),
                    n instanceof Error)
                        throw n;
                    var n, a = Error("Unhandled error." + (n ? " (" + n.message + ")" : ""));
                    throw a.context = n,
                    a
                }
                var h = s[t];
                if (void 0 === h)
                    return !1;
                if ("function" == typeof h)
                    i(h, this, e);
                else {
                    var l = h.length
                      , d = w(h, l);
                    for (r = 0; r < l; ++r)
                        i(d[r], this, e)
                }
                return !0
            }
            ,
            s.prototype.addListener = function(t, e) {
                return l(this, t, e, !1)
            }
            ,
            s.prototype.on = s.prototype.addListener,
            s.prototype.prependListener = function(t, e) {
                return l(this, t, e, !0)
            }
            ,
            s.prototype.once = function(t, e) {
                return a(e),
                this.on(t, c(this, t, e)),
                this
            }
            ,
            s.prototype.prependOnceListener = function(t, e) {
                return a(e),
                this.prependListener(t, c(this, t, e)),
                this
            }
            ,
            s.prototype.removeListener = function(t, e) {
                var r, i, o, s, n;
                if (a(e),
                void 0 === (i = this._events) || void 0 === (r = i[t]))
                    return this;
                if (r === e || r.listener === e)
                    0 == --this._eventsCount ? this._events = Object.create(null) : (delete i[t],
                    i.removeListener && this.emit("removeListener", t, r.listener || e));
                else if ("function" != typeof r) {
                    for (o = -1,
                    s = r.length - 1; s >= 0; s--)
                        if (r[s] === e || r[s].listener === e) {
                            n = r[s].listener,
                            o = s;
                            break
                        }
                    if (o < 0)
                        return this;
                    0 === o ? r.shift() : function(t, e) {
                        for (; e + 1 < t.length; e++)
                            t[e] = t[e + 1];
                        t.pop()
                    }(r, o),
                    1 === r.length && (i[t] = r[0]),
                    void 0 !== i.removeListener && this.emit("removeListener", t, n || e)
                }
                return this
            }
            ,
            s.prototype.off = s.prototype.removeListener,
            s.prototype.removeAllListeners = function(t) {
                var e, r, i;
                if (void 0 === (r = this._events))
                    return this;
                if (void 0 === r.removeListener)
                    return 0 == arguments.length ? (this._events = Object.create(null),
                    this._eventsCount = 0) : void 0 !== r[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[t]),
                    this;
                if (0 == arguments.length) {
                    var o, s = Object.keys(r);
                    for (i = 0; i < s.length; ++i)
                        "removeListener" !== (o = s[i]) && this.removeAllListeners(o);
                    return this.removeAllListeners("removeListener"),
                    this._events = Object.create(null),
                    this._eventsCount = 0,
                    this
                }
                if ("function" == typeof (e = r[t]))
                    this.removeListener(t, e);
                else if (void 0 !== e)
                    for (i = e.length - 1; i >= 0; i--)
                        this.removeListener(t, e[i]);
                return this
            }
            ,
            s.prototype.listeners = function(t) {
                return u(this, t, !0)
            }
            ,
            s.prototype.rawListeners = function(t) {
                return u(this, t, !1)
            }
            ,
            s.listenerCount = function(t, e) {
                return "function" == typeof t.listenerCount ? t.listenerCount(e) : p.call(t, e)
            }
            ,
            s.prototype.listenerCount = p,
            s.prototype.eventNames = function() {
                return this._eventsCount > 0 ? e(this._events) : []
            }
        }
    }
      , e = {};
    (()=>{
        var r = function r(i) {
            var o = e[i];
            if (void 0 !== o)
                return o.exports;
            var s = e[i] = {
                exports: {}
            };
            return t[i](s, s.exports, r),
            s.exports
        }(666);
        let i = class {
            #t;
            #e;
            constructor(t={}, e=null, r=null) {
                this.#t = !1,
                this.#e = null,
                this.data = t,
                this.target = e,
                this.that = r
            }
            get intercepted() {
                return this.#t
            }
            get returnValue() {
                return this.#e
            }
            respondWith(t) {
                this.#e = t,
                this.#t = !0
            }
        }
          , o = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.document = this.window.document,
                this.Document = this.window.Document || {},
                this.DOMParser = this.window.DOMParser || {},
                this.docProto = this.Document.prototype || {},
                this.domProto = this.DOMParser.prototype || {},
                this.title = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "title"),
                this.cookie = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "cookie"),
                this.referrer = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "referrer"),
                this.domain = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "domain"),
                this.documentURI = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "documentURI"),
                this.write = this.docProto.write,
                this.writeln = this.docProto.writeln,
                this.querySelector = this.docProto.querySelector,
                this.querySelectorAll = this.docProto.querySelectorAll,
                this.parseFromString = this.domProto.parseFromString,
                this.URL = t.nativeMethods.getOwnPropertyDescriptor(this.docProto, "URL")
            }
            overrideParseFromString() {
                this.ctx.override(this.domProto, "parseFromString", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        string: o,
                        type: s
                    },t,e);
                    return this.emit("parseFromString", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.string, n.data.type)
                }
                )
            }
            overrideQuerySelector() {
                this.ctx.override(this.docProto, "querySelector", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        selectors: o
                    },t,e);
                    return this.emit("querySelector", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.selectors)
                }
                )
            }
            overrideDomain() {
                this.ctx.overrideDescriptor(this.docProto, "domain", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("getDomain", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                    ,
                    set: (t,e,[r])=>{
                        let o = new i({
                            value: r
                        },t,e);
                        return this.emit("setDomain", o),
                        o.intercepted ? o.returnValue : o.target.call(o.that, o.data.value)
                    }
                })
            }
            overrideReferrer() {
                this.ctx.overrideDescriptor(this.docProto, "referrer", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("referrer", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                })
            }
            overrideCreateTreeWalker() {
                this.ctx.override(this.docProto, "createTreeWalker", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o,s=4294967295,n,a] = r
                      , h = new i({
                        root: o,
                        show: s,
                        filter: n,
                        expandEntityReferences: a
                    },t,e);
                    return this.emit("createTreeWalker", h),
                    h.intercepted ? h.returnValue : h.target.call(h.that, h.data.root, h.data.show, h.data.filter, h.data.expandEntityReferences)
                }
                )
            }
            overrideWrite() {
                this.ctx.override(this.docProto, "write", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[...o] = r
                      , s = new i({
                        html: o
                    },t,e);
                    return this.emit("write", s),
                    s.intercepted ? s.returnValue : s.target.apply(s.that, s.data.html)
                }
                ),
                this.ctx.override(this.docProto, "writeln", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[...o] = r
                      , s = new i({
                        html: o
                    },t,e);
                    return this.emit("writeln", s),
                    s.intercepted ? s.returnValue : s.target.apply(s.that, s.data.html)
                }
                )
            }
            overrideDocumentURI() {
                this.ctx.overrideDescriptor(this.docProto, "documentURI", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("documentURI", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                })
            }
            overrideURL() {
                this.ctx.overrideDescriptor(this.docProto, "URL", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("url", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                })
            }
            overrideCookie() {
                this.ctx.overrideDescriptor(this.docProto, "cookie", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("getCookie", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                    ,
                    set: (t,e,[r])=>{
                        let o = new i({
                            value: r
                        },t,e);
                        return this.emit("setCookie", o),
                        o.intercepted ? o.returnValue : o.target.call(o.that, o.data.value)
                    }
                })
            }
            overrideTitle() {
                this.ctx.overrideDescriptor(this.docProto, "title", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("getTitle", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                    ,
                    set: (t,e,[r])=>{
                        let o = new i({
                            value: r
                        },t,e);
                        return this.emit("setTitle", o),
                        o.intercepted ? o.returnValue : o.target.call(o.that, o.data.value)
                    }
                })
            }
        }
          , s = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.Audio = this.window.Audio,
                this.Element = this.window.Element,
                this.elemProto = this.Element ? this.Element.prototype : {},
                this.innerHTML = t.nativeMethods.getOwnPropertyDescriptor(this.elemProto, "innerHTML"),
                this.outerHTML = t.nativeMethods.getOwnPropertyDescriptor(this.elemProto, "outerHTML"),
                this.setAttribute = this.elemProto.setAttribute,
                this.getAttribute = this.elemProto.getAttribute,
                this.removeAttribute = this.elemProto.removeAttribute,
                this.hasAttribute = this.elemProto.hasAttribute,
                this.querySelector = this.elemProto.querySelector,
                this.querySelectorAll = this.elemProto.querySelectorAll,
                this.insertAdjacentHTML = this.elemProto.insertAdjacentHTML,
                this.insertAdjacentText = this.elemProto.insertAdjacentText
            }
            overrideQuerySelector() {
                this.ctx.override(this.elemProto, "querySelector", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        selectors: o
                    },t,e);
                    return this.emit("querySelector", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.selectors)
                }
                )
            }
            overrideAttribute() {
                this.ctx.override(this.elemProto, "getAttribute", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        name: o
                    },t,e);
                    return this.emit("getAttribute", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }
                ),
                this.ctx.override(this.elemProto, "setAttribute", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        name: o,
                        value: s
                    },t,e);
                    return this.emit("setAttribute", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                }
                ),
                this.ctx.override(this.elemProto, "hasAttribute", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        name: o
                    },t,e);
                    return this.emit("hasAttribute", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }
                ),
                this.ctx.override(this.elemProto, "removeAttribute", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        name: o
                    },t,e);
                    return this.emit("removeAttribute", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }
                )
            }
            overrideAudio() {
                this.ctx.override(this.window, "Audio", (t,e,r)=>{
                    if (!r.length)
                        return new t(...r);
                    let[o] = r
                      , s = new i({
                        url: o
                    },t,e);
                    return this.emit("audio", s),
                    s.intercepted ? s.returnValue : new s.target(s.data.url)
                }
                , !0)
            }
            overrideHtml() {
                this.hookProperty(this.Element, "innerHTML", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("getInnerHTML", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                    ,
                    set: (t,e,[r])=>{
                        let o = new i({
                            value: r
                        },t,e);
                        if (this.emit("setInnerHTML", o),
                        o.intercepted)
                            return o.returnValue;
                        t.call(e, o.data.value)
                    }
                }),
                this.hookProperty(this.Element, "outerHTML", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("getOuterHTML", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                    ,
                    set: (t,e,[r])=>{
                        let o = new i({
                            value: r
                        },t,e);
                        if (this.emit("setOuterHTML", o),
                        o.intercepted)
                            return o.returnValue;
                        t.call(e, o.data.value)
                    }
                })
            }
            overrideInsertAdjacentHTML() {
                this.ctx.override(this.elemProto, "insertAdjacentHTML", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        position: o,
                        html: s
                    },t,e);
                    return this.emit("insertAdjacentHTML", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.position, n.data.html)
                }
                )
            }
            overrideInsertAdjacentText() {
                this.ctx.override(this.elemProto, "insertAdjacentText", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        position: o,
                        text: s
                    },t,e);
                    return this.emit("insertAdjacentText", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.position, n.data.text)
                }
                )
            }
            hookProperty(t, e, r) {
                if (!t)
                    return !1;
                if (this.ctx.nativeMethods.isArray(t)) {
                    for (let i of t)
                        this.hookProperty(i, e, r);
                    return !0
                }
                let i = t.prototype;
                return this.ctx.overrideDescriptor(i, e, r),
                !0
            }
        }
          , n = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.Node = t.window.Node || {},
                this.nodeProto = this.Node.prototype || {},
                this.compareDocumentPosition = this.nodeProto.compareDocumentPosition,
                this.contains = this.nodeProto.contains,
                this.insertBefore = this.nodeProto.insertBefore,
                this.replaceChild = this.nodeProto.replaceChild,
                this.append = this.nodeProto.append,
                this.appendChild = this.nodeProto.appendChild,
                this.removeChild = this.nodeProto.removeChild,
                this.textContent = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "textContent"),
                this.parentNode = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "parentNode"),
                this.parentElement = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "parentElement"),
                this.childNodes = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "childNodes"),
                this.baseURI = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "baseURI"),
                this.previousSibling = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "previousSibling"),
                this.ownerDocument = t.nativeMethods.getOwnPropertyDescriptor(this.nodeProto, "ownerDocument")
            }
            overrideTextContent() {
                this.ctx.overrideDescriptor(this.nodeProto, "textContent", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("getTextContent", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                    ,
                    set: (t,e,[r])=>{
                        let o = new i({
                            value: r
                        },t,e);
                        if (this.emit("setTextContent", o),
                        o.intercepted)
                            return o.returnValue;
                        t.call(e, o.data.value)
                    }
                })
            }
            overrideAppend() {
                this.ctx.override(this.nodeProto, "append", (t,e,[...r])=>{
                    let o = new i({
                        nodes: r
                    },t,e);
                    return this.emit("append", o),
                    o.intercepted ? o.returnValue : o.target.call(o.that, o.data.nodes)
                }
                ),
                this.ctx.override(this.nodeProto, "appendChild", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        node: o
                    },t,e);
                    return this.emit("appendChild", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.node)
                }
                )
            }
            overrideBaseURI() {
                this.ctx.overrideDescriptor(this.nodeProto, "baseURI", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("baseURI", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                })
            }
            overrideParent() {
                this.ctx.overrideDescriptor(this.nodeProto, "parentNode", {
                    get: (t,e)=>{
                        let r = new i({
                            node: t.call(e)
                        },t,e);
                        return this.emit("parentNode", r),
                        r.intercepted ? r.returnValue : r.data.node
                    }
                }),
                this.ctx.overrideDescriptor(this.nodeProto, "parentElement", {
                    get: (t,e)=>{
                        let r = new i({
                            element: t.call(e)
                        },t,e);
                        return this.emit("parentElement", r),
                        r.intercepted ? r.returnValue : r.data.node
                    }
                })
            }
            overrideOwnerDocument() {
                this.ctx.overrideDescriptor(this.nodeProto, "ownerDocument", {
                    get: (t,e)=>{
                        let r = new i({
                            document: t.call(e)
                        },t,e);
                        return this.emit("ownerDocument", r),
                        r.intercepted ? r.returnValue : r.data.document
                    }
                })
            }
            overrideCompareDocumentPosit1ion() {
                this.ctx.override(this.nodeProto, "compareDocumentPosition", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        node: o
                    },t,e);
                    return s.intercepted ? s.returnValue : s.target.call(s.that, s.data.node)
                }
                )
            }
            overrideChildMethods() {
                this.ctx.override(this.nodeProto, "removeChild")
            }
        }
          , a = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.Attr = this.window.Attr || {},
                this.attrProto = this.Attr.prototype || {},
                this.value = t.nativeMethods.getOwnPropertyDescriptor(this.attrProto, "value"),
                this.name = t.nativeMethods.getOwnPropertyDescriptor(this.attrProto, "name"),
                this.getNamedItem = this.attrProto.getNamedItem || null,
                this.setNamedItem = this.attrProto.setNamedItem || null,
                this.removeNamedItem = this.attrProto.removeNamedItem || null,
                this.getNamedItemNS = this.attrProto.getNamedItemNS || null,
                this.setNamedItemNS = this.attrProto.setNamedItemNS || null,
                this.removeNamedItemNS = this.attrProto.removeNamedItemNS || null,
                this.item = this.attrProto.item || null
            }
            overrideNameValue() {
                this.ctx.overrideDescriptor(this.attrProto, "name", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("name", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                }),
                this.ctx.overrideDescriptor(this.attrProto, "value", {
                    get: (t,e)=>{
                        let r = new i({
                            name: this.name.get.call(e),
                            value: t.call(e)
                        },t,e);
                        return this.emit("getValue", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                    ,
                    set: (t,e,[r])=>{
                        let o = new i({
                            name: this.name.get.call(e),
                            value: r
                        },t,e);
                        if (this.emit("setValue", o),
                        o.intercepted)
                            return o.returnValue;
                        o.target.call(o.that, o.data.value)
                    }
                })
            }
            overrideItemMethods() {
                this.ctx.override(this.attrProto, "getNamedItem", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        name: o
                    },t,e);
                    return this.emit("getNamedItem", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }
                ),
                this.ctx.override(this.attrProto, "setNamedItem", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        name: o,
                        value: s
                    },t,e);
                    return this.emit("setNamedItem", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                }
                ),
                this.ctx.override(this.attrProto, "removeNamedItem", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        name: o
                    },t,e);
                    return this.emit("removeNamedItem", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }
                ),
                this.ctx.override(this.attrProto, "item", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        index: o
                    },t,e);
                    return this.emit("item", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }
                ),
                this.ctx.override(this.attrProto, "getNamedItemNS", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        namespace: o,
                        localName: s
                    },t,e);
                    return this.emit("getNamedItemNS", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.namespace, n.data.localName)
                }
                ),
                this.ctx.override(this.attrProto, "setNamedItemNS", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        attr: o
                    },t,e);
                    return this.emit("setNamedItemNS", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }
                ),
                this.ctx.override(this.attrProto, "removeNamedItemNS", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        namespace: o,
                        localName: s
                    },t,e);
                    return this.emit("removeNamedItemNS", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.namespace, n.data.localName)
                }
                )
            }
        }
          , h = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.Function = this.window.Function,
                this.fnProto = this.Function.prototype,
                this.toString = this.fnProto.toString,
                this.fnStrings = t.fnStrings,
                this.call = this.fnProto.call,
                this.apply = this.fnProto.apply,
                this.bind = this.fnProto.bind
            }
            overrideFunction() {
                this.ctx.override(this.window, "Function", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let o = r[r.length - 1]
                      , s = [];
                    for (let t = 0; t < r.length - 1; t++)
                        s.push(r[t]);
                    let n = new i({
                        script: o,
                        args: s
                    },t,e);
                    return this.emit("function", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, ...n.data.args, n.data.script)
                }
                , !0)
            }
            overrideToString() {
                this.ctx.override(this.fnProto, "toString", (t,e)=>{
                    let r = new i({
                        fn: e
                    },t,e);
                    return this.emit("toString", r),
                    r.intercepted ? r.returnValue : r.target.call(r.data.fn)
                }
                )
            }
        }
          , l = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.Object = this.window.Object,
                this.getOwnPropertyDescriptors = this.Object.getOwnPropertyDescriptors,
                this.getOwnPropertyDescriptor = this.Object.getOwnPropertyDescriptor,
                this.getOwnPropertyNames = this.Object.getOwnPropertyNames
            }
            overrideGetPropertyNames() {
                this.ctx.override(this.Object, "getOwnPropertyNames", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        names: t.call(e, o)
                    },t,e);
                    return this.emit("getOwnPropertyNames", s),
                    s.intercepted ? s.returnValue : s.data.names
                }
                )
            }
            overrideGetOwnPropertyDescriptors() {
                this.ctx.override(this.Object, "getOwnPropertyDescriptors", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        descriptors: t.call(e, o)
                    },t,e);
                    return this.emit("getOwnPropertyDescriptors", s),
                    s.intercepted ? s.returnValue : s.data.descriptors
                }
                )
            }
        }
          , d = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.fetch = this.window.fetch,
                this.Request = this.window.Request,
                this.Response = this.window.Response,
                this.Headers = this.window.Headers,
                this.reqProto = this.Request ? this.Request.prototype : {},
                this.resProto = this.Response ? this.Response.prototype : {},
                this.headersProto = this.Headers ? this.Headers.prototype : {},
                this.reqUrl = t.nativeMethods.getOwnPropertyDescriptor(this.reqProto, "url"),
                this.resUrl = t.nativeMethods.getOwnPropertyDescriptor(this.resProto, "url"),
                this.reqHeaders = t.nativeMethods.getOwnPropertyDescriptor(this.reqProto, "headers"),
                this.resHeaders = t.nativeMethods.getOwnPropertyDescriptor(this.resProto, "headers")
            }
            override() {
                return this.overrideRequest(),
                this.overrideUrl(),
                this.overrideHeaders(),
                !0
            }
            overrideRequest() {
                return !!this.fetch && (this.ctx.override(this.window, "fetch", (t,e,r)=>{
                    if (!r.length || r[0]instanceof this.Request)
                        return t.apply(e, r);
                    let[o,s={}] = r
                      , n = new i({
                        input: o,
                        options: s
                    },t,e);
                    return this.emit("request", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.input, n.data.options)
                }
                ),
                this.ctx.override(this.window, "Request", (t,e,r)=>{
                    if (!r.length)
                        return new t(...r);
                    let[o,s={}] = r
                      , n = new i({
                        input: o,
                        options: s
                    },t);
                    return this.emit("request", n),
                    n.intercepted ? n.returnValue : new n.target(n.data.input,n.data.options)
                }
                , !0),
                !0)
            }
            overrideUrl() {
                return this.ctx.overrideDescriptor(this.reqProto, "url", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("requestUrl", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                }),
                this.ctx.overrideDescriptor(this.resProto, "url", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("responseUrl", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                }),
                !0
            }
            overrideHeaders() {
                return !!this.Headers && (this.ctx.overrideDescriptor(this.reqProto, "headers", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("requestHeaders", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                }),
                this.ctx.overrideDescriptor(this.resProto, "headers", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("responseHeaders", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                }),
                this.ctx.override(this.headersProto, "get", (t,e,[r])=>{
                    if (!r)
                        return t.call(e);
                    let o = new i({
                        name: r,
                        value: t.call(e, r)
                    },t,e);
                    return this.emit("getHeader", o),
                    o.intercepted ? o.returnValue : o.data.value
                }
                ),
                this.ctx.override(this.headersProto, "set", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        name: o,
                        value: s
                    },t,e);
                    return this.emit("setHeader", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                }
                ),
                this.ctx.override(this.headersProto, "has", (t,e,r)=>{
                    if (!r.length)
                        return t.call(e);
                    let[o] = r
                      , s = new i({
                        name: o,
                        value: t.call(e, o)
                    },t,e);
                    return this.emit("hasHeader", s),
                    s.intercepted ? s.returnValue : s.data
                }
                ),
                this.ctx.override(this.headersProto, "append", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        name: o,
                        value: s
                    },t,e);
                    return this.emit("appendHeader", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                }
                ),
                this.ctx.override(this.headersProto, "delete", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        name: o
                    },t,e);
                    return this.emit("deleteHeader", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }
                ),
                !0)
            }
        }
          , c = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.XMLHttpRequest = this.window.XMLHttpRequest,
                this.xhrProto = this.window.XMLHttpRequest ? this.window.XMLHttpRequest.prototype : {},
                this.open = this.xhrProto.open,
                this.abort = this.xhrProto.abort,
                this.send = this.xhrProto.send,
                this.overrideMimeType = this.xhrProto.overrideMimeType,
                this.getAllResponseHeaders = this.xhrProto.getAllResponseHeaders,
                this.getResponseHeader = this.xhrProto.getResponseHeader,
                this.setRequestHeader = this.xhrProto.setRequestHeader,
                this.responseURL = t.nativeMethods.getOwnPropertyDescriptor(this.xhrProto, "responseURL"),
                this.responseText = t.nativeMethods.getOwnPropertyDescriptor(this.xhrProto, "responseText")
            }
            override() {
                this.overrideOpen(),
                this.overrideSend(),
                this.overrideMimeType(),
                this.overrideGetResHeader(),
                this.overrideGetResHeaders(),
                this.overrideSetReqHeader()
            }
            overrideOpen() {
                this.ctx.override(this.xhrProto, "open", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s,n=!0,a=null,h=null] = r
                      , l = new i({
                        method: o,
                        input: s,
                        async: n,
                        user: a,
                        password: h
                    },t,e);
                    return this.emit("open", l),
                    l.intercepted ? l.returnValue : l.target.call(l.that, l.data.method, l.data.input, l.data.async, l.data.user, l.data.password)
                }
                )
            }
            overrideResponseUrl() {
                this.ctx.overrideDescriptor(this.xhrProto, "responseURL", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("responseUrl", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                })
            }
            overrideSend() {
                this.ctx.override(this.xhrProto, "send", (t,e,[r=null])=>{
                    let o = new i({
                        body: r
                    },t,e);
                    return this.emit("send", o),
                    o.intercepted ? o.returnValue : o.target.call(o.that, o.data.body)
                }
                )
            }
            overrideSetReqHeader() {
                this.ctx.override(this.xhrProto, "setRequestHeader", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        name: o,
                        value: s
                    },t,e);
                    return this.emit("setReqHeader", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                }
                )
            }
            overrideGetResHeaders() {
                this.ctx.override(this.xhrProto, "getAllResponseHeaders", (t,e)=>{
                    let r = new i({
                        value: t.call(e)
                    },t,e);
                    return this.emit("getAllResponseHeaders", r),
                    r.intercepted ? r.returnValue : r.data.value
                }
                )
            }
            overrideGetResHeader() {
                this.ctx.override(this.xhrProto, "getResponseHeader", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        name: o,
                        value: t.call(e, o)
                    },t,e);
                    return s.intercepted ? s.returnValue : s.data.value
                }
                )
            }
        }
          , u = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.EventSource = this.window.EventSource || {},
                this.esProto = this.EventSource.prototype || {},
                this.url = t.nativeMethods.getOwnPropertyDescriptor(this.esProto, "url"),
                this.CONNECTING = 0,
                this.OPEN = 1,
                this.CLOSED = 2
            }
            overrideConstruct() {
                this.ctx.override(this.window, "EventSource", (t,e,r)=>{
                    if (!r.length)
                        return new t(...r);
                    let[o,s={}] = r
                      , n = new i({
                        url: o,
                        config: s
                    },t,e);
                    return this.emit("construct", n),
                    n.intercepted ? n.returnValue : new n.target(n.data.url,n.data.config)
                }
                , !0),
                "EventSource"in this.window && (this.window.EventSource.CONNECTING = this.CONNECTING,
                this.window.EventSource.OPEN = this.OPEN,
                this.window.EventSource.CLOSED = this.CLOSED)
            }
            overrideUrl() {
                this.ctx.overrideDescriptor(this.esProto, "url", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("url", r),
                        r.data.value
                    }
                })
            }
        }
          , p = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = this.ctx.window,
                this.History = this.window.History,
                this.history = this.window.history,
                this.historyProto = this.History ? this.History.prototype : {},
                this.pushState = this.historyProto.pushState,
                this.replaceState = this.historyProto.replaceState,
                this.go = this.historyProto.go,
                this.back = this.historyProto.back,
                this.forward = this.historyProto.forward
            }
            override() {
                this.overridePushState(),
                this.overrideReplaceState(),
                this.overrideGo(),
                this.overrideForward(),
                this.overrideBack()
            }
            overridePushState() {
                this.ctx.override(this.historyProto, "pushState", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s,n=""] = r
                      , a = new i({
                        state: o,
                        title: s,
                        url: n
                    },t,e);
                    return this.emit("pushState", a),
                    a.intercepted ? a.returnValue : a.target.call(a.that, a.data.state, a.data.title, a.data.url)
                }
                )
            }
            overrideReplaceState() {
                this.ctx.override(this.historyProto, "replaceState", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s,n=""] = r
                      , a = new i({
                        state: o,
                        title: s,
                        url: n
                    },t,e);
                    return this.emit("replaceState", a),
                    a.intercepted ? a.returnValue : a.target.call(a.that, a.data.state, a.data.title, a.data.url)
                }
                )
            }
            overrideGo() {
                this.ctx.override(this.historyProto, "go", (t,e,[r])=>{
                    let o = new i({
                        delta: r
                    },t,e);
                    return this.emit("go", o),
                    o.intercepted ? o.returnValue : o.target.call(o.that, o.data.delta)
                }
                )
            }
            overrideForward() {
                this.ctx.override(this.historyProto, "forward", (t,e)=>{
                    let r = new i(null,t,e);
                    return this.emit("forward", r),
                    r.intercepted ? r.returnValue : r.target.call(r.that)
                }
                )
            }
            overrideBack() {
                this.ctx.override(this.historyProto, "back", (t,e)=>{
                    let r = new i(null,t,e);
                    return this.emit("back", r),
                    r.intercepted ? r.returnValue : r.target.call(r.that)
                }
                )
            }
        }
          , w = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.location = this.window.location,
                this.WorkerLocation = this.ctx.worker ? this.window.WorkerLocation : null,
                this.workerLocProto = this.WorkerLocation ? this.WorkerLocation.prototype : {},
                this.keys = ["href", "protocol", "host", "hostname", "port", "pathname", "search", "hash", "origin"],
                this.HashChangeEvent = this.window.HashChangeEvent || null,
                this.href = this.WorkerLocation ? t.nativeMethods.getOwnPropertyDescriptor(this.workerLocProto, "href") : t.nativeMethods.getOwnPropertyDescriptor(this.location, "href")
            }
            overrideWorkerLocation(t) {
                if (!this.WorkerLocation)
                    return !1;
                let e = this;
                for (let r of this.keys)
                    this.ctx.overrideDescriptor(this.workerLocProto, r, {
                        get: ()=>t(e.href.get.call(this.location))[r]
                    });
                return !0
            }
            emulate(t, e) {
                let r = {}
                  , i = this;
                for (let o of i.keys)
                    this.ctx.nativeMethods.defineProperty(r, o, {
                        get: ()=>t(i.href.get.call(i.location))[o],
                        set: "origin" !== o ? function(t) {
                            switch (o) {
                            case "href":
                                i.location.href = e(t);
                                break;
                            case "hash":
                                i.emit("hashchange", r.href, t.trim().startsWith("#") ? new URL(t.trim(),r.href).href : new URL("#" + t.trim(),r.href).href, i);
                                break;
                            default:
                                {
                                    let s = new URL(r.href);
                                    s[o] = t,
                                    i.location.href = e(s.href)
                                }
                            }
                        }
                        : void 0,
                        configurable: !1,
                        enumerable: !0
                    });
                return "reload"in this.location && this.ctx.nativeMethods.defineProperty(r, "reload", {
                    value: this.ctx.wrap(this.location, "reload", (t,e)=>t.call(e === r ? this.location : e)),
                    writable: !1,
                    enumerable: !0
                }),
                "replace"in this.location && this.ctx.nativeMethods.defineProperty(r, "replace", {
                    value: this.ctx.wrap(this.location, "assign", (t,i,o)=>{
                        o.length && i === r || t.call(i),
                        i = this.location;
                        let[s] = o
                          , n = new URL(s,r.href);
                        return t.call(i === r ? this.location : i, e(n.href))
                    }
                    ),
                    writable: !1,
                    enumerable: !0
                }),
                "assign"in this.location && this.ctx.nativeMethods.defineProperty(r, "assign", {
                    value: this.ctx.wrap(this.location, "assign", (t,i,o)=>{
                        o.length && i === r || t.call(i),
                        i = this.location;
                        let[s] = o
                          , n = new URL(s,r.href);
                        return t.call(i === r ? this.location : i, e(n.href))
                    }
                    ),
                    writable: !1,
                    enumerable: !0
                }),
                "ancestorOrigins"in this.location && this.ctx.nativeMethods.defineProperty(r, "ancestorOrigins", {
                    get() {
                        let t = [];
                        return i.window.DOMStringList && i.ctx.nativeMethods.setPrototypeOf(t, i.window.DOMStringList.prototype),
                        t
                    },
                    set: void 0,
                    enumerable: !0
                }),
                this.ctx.nativeMethods.defineProperty(r, "toString", {
                    value: this.ctx.wrap(this.location, "toString", ()=>r.href),
                    enumerable: !0,
                    writable: !1
                }),
                this.ctx.nativeMethods.defineProperty(r, Symbol.toPrimitive, {
                    value: ()=>r.href,
                    writable: !1,
                    enumerable: !1
                }),
                this.ctx.window.Location && this.ctx.nativeMethods.setPrototypeOf(r, this.ctx.window.Location.prototype),
                r
            }
        }
          , v = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = this.ctx.window,
                this.postMessage = this.window.postMessage,
                this.MessageEvent = this.window.MessageEvent || {},
                this.MessagePort = this.window.MessagePort || {},
                this.mpProto = this.MessagePort.prototype || {},
                this.mpPostMessage = this.mpProto.postMessage,
                this.messageProto = this.MessageEvent.prototype || {},
                this.messageData = t.nativeMethods.getOwnPropertyDescriptor(this.messageProto, "data"),
                this.messageOrigin = t.nativeMethods.getOwnPropertyDescriptor(this.messageProto, "origin")
            }
            overridePostMessage() {
                this.ctx.override(this.window, "postMessage", (t,e,r)=>{
                    let o, s, n;
                    if (!r.length)
                        return t.apply(e, r);
                    this.ctx.worker ? [o,n=[]] = r : [o,s,n=[]] = r;
                    let a = new i({
                        message: o,
                        origin: s,
                        transfer: n,
                        worker: this.ctx.worker
                    },t,e);
                    return this.emit("postMessage", a),
                    a.intercepted ? a.returnValue : this.ctx.worker ? a.target.call(a.that, a.data.message, a.data.transfer) : a.target.call(a.that, a.data.message, a.data.origin, a.data.transfer)
                }
                )
            }
            wrapPostMessage(t, e, r=!1) {
                return this.ctx.wrap(t, e, (e,o,s)=>{
                    let n, a, h;
                    if (this.ctx.worker ? !s.length : 2 > s)
                        return e.apply(o, s);
                    r ? ([n,h=[]] = s,
                    a = null) : [n,a,h=[]] = s;
                    let l = new i({
                        message: n,
                        origin: a,
                        transfer: h,
                        worker: this.ctx.worker
                    },e,t);
                    return this.emit("postMessage", l),
                    l.intercepted ? l.returnValue : r ? l.target.call(l.that, l.data.message, l.data.transfer) : l.target.call(l.that, l.data.message, l.data.origin, l.data.transfer)
                }
                )
            }
            overrideMessageOrigin() {
                this.ctx.overrideDescriptor(this.messageProto, "origin", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("origin", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                })
            }
            overrideMessageData() {
                this.ctx.overrideDescriptor(this.messageProto, "data", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("data", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                })
            }
        }
          , m = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.navigator = this.window.navigator,
                this.Navigator = this.window.Navigator || {},
                this.navProto = this.Navigator.prototype || {},
                this.sendBeacon = this.navProto.sendBeacon
            }
            overrideSendBeacon() {
                this.ctx.override(this.navProto, "sendBeacon", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o,s=""] = r
                      , n = new i({
                        url: o,
                        data: s
                    },t,e);
                    return this.emit("sendBeacon", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.url, n.data.data)
                }
                )
            }
        }
          , g = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.Worker = this.window.Worker || {},
                this.Worklet = this.window.Worklet || {},
                this.workletProto = this.Worklet.prototype || {},
                this.workerProto = this.Worker.prototype || {},
                this.postMessage = this.workerProto.postMessage,
                this.terminate = this.workerProto.terminate,
                this.addModule = this.workletProto.addModule
            }
            overrideWorker() {
                this.ctx.override(this.window, "Worker", (t,e,r)=>{
                    if (!r.length)
                        return new t(...r);
                    let[o,s={}] = r
                      , n = new i({
                        url: o,
                        options: s
                    },t,e);
                    return this.emit("worker", n),
                    n.intercepted ? n.returnValue : new n.target(...[n.data.url, n.data.options])
                }
                , !0)
            }
            overrideAddModule() {
                this.ctx.override(this.workletProto, "addModule", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o,s={}] = r
                      , n = new i({
                        url: o,
                        options: s
                    },t,e);
                    return this.emit("addModule", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.url, n.data.options)
                }
                )
            }
            overridePostMessage() {
                this.ctx.override(this.workerProto, "postMessage", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o,s=[]] = r
                      , n = new i({
                        message: o,
                        transfer: s
                    },t,e);
                    return this.emit("postMessage", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.message, n.data.transfer)
                }
                )
            }
            overrideImportScripts() {
                this.ctx.override(this.window, "importScripts", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let o = new i({
                        scripts: r
                    },t,e);
                    return this.emit("importScripts", o),
                    o.intercepted ? o.returnValue : o.target.apply(o.that, o.data.scripts)
                }
                )
            }
        }
          , y = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = this.ctx.window,
                this.URL = this.window.URL || {},
                this.createObjectURL = this.URL.createObjectURL,
                this.revokeObjectURL = this.URL.revokeObjectURL
            }
            overrideObjectURL() {
                this.ctx.override(this.URL, "createObjectURL", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        object: o
                    },t,e);
                    return this.emit("createObjectURL", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.object)
                }
                ),
                this.ctx.override(this.URL, "revokeObjectURL", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        url: o
                    },t,e);
                    return this.emit("revokeObjectURL", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.url)
                }
                )
            }
        }
          , P = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.localStorage = this.window.localStorage || null,
                this.sessionStorage = this.window.sessionStorage || null,
                this.Storage = this.window.Storage || {},
                this.storeProto = this.Storage.prototype || {},
                this.getItem = this.storeProto.getItem || null,
                this.setItem = this.storeProto.setItem || null,
                this.removeItem = this.storeProto.removeItem || null,
                this.clear = this.storeProto.clear || null,
                this.key = this.storeProto.key || null,
                this.methods = ["key", "getItem", "setItem", "removeItem", "clear"],
                this.wrappers = new t.nativeMethods.Map
            }
            overrideMethods() {
                this.ctx.override(this.storeProto, "getItem", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(this.wrappers.get(e) || e, r);
                    let[o] = r
                      , s = new i({
                        name: o
                    },t,this.wrappers.get(e) || e);
                    return this.emit("getItem", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }
                ),
                this.ctx.override(this.storeProto, "setItem", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(this.wrappers.get(e) || e, r);
                    let[o,s] = r
                      , n = new i({
                        name: o,
                        value: s
                    },t,this.wrappers.get(e) || e);
                    return this.emit("setItem", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.value)
                }
                ),
                this.ctx.override(this.storeProto, "removeItem", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(this.wrappers.get(e) || e, r);
                    let[o] = r
                      , s = new i({
                        name: o
                    },t,this.wrappers.get(e) || e);
                    return this.emit("removeItem", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.name)
                }
                ),
                this.ctx.override(this.storeProto, "clear", (t,e)=>{
                    let r = new i(null,t,this.wrappers.get(e) || e);
                    return this.emit("clear", r),
                    r.intercepted ? r.returnValue : r.target.call(r.that)
                }
                ),
                this.ctx.override(this.storeProto, "key", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(this.wrappers.get(e) || e, r);
                    let[o] = r
                      , s = new i({
                        index: o
                    },t,this.wrappers.get(e) || e);
                    return this.emit("key", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.index)
                }
                )
            }
            overrideLength() {
                this.ctx.overrideDescriptor(this.storeProto, "length", {
                    get: (t,e)=>{
                        let r = new i({
                            length: t.call(this.wrappers.get(e) || e)
                        },t,this.wrappers.get(e) || e);
                        return this.emit("length", r),
                        r.intercepted ? r.returnValue : r.data.length
                    }
                })
            }
            emulate(t, e={}) {
                this.ctx.nativeMethods.setPrototypeOf(e, this.storeProto);
                let r = new this.ctx.window.Proxy(e,{
                    get: (e,r)=>{
                        if (r in this.storeProto || "symbol" == typeof r)
                            return t[r];
                        let o = new i({
                            name: r
                        },null,t);
                        return this.emit("get", o),
                        o.intercepted ? o.returnValue : t[o.data.name]
                    }
                    ,
                    set: (e,r,o)=>{
                        if (r in this.storeProto || "symbol" == typeof r)
                            return t[r] = o;
                        let s = new i({
                            name: r,
                            value: o
                        },null,t);
                        return this.emit("set", s),
                        s.intercepted ? s.returnValue : t[s.data.name] = s.data.value
                    }
                    ,
                    deleteProperty: (e,r)=>{
                        if ("symbol" == typeof r)
                            return delete t[r];
                        let o = new i({
                            name: r
                        },null,t);
                        return this.emit("delete", o),
                        o.intercepted ? o.returnValue : delete t[o.data.name]
                    }
                });
                return this.wrappers.set(r, t),
                this.ctx.nativeMethods.setPrototypeOf(r, this.storeProto),
                r
            }
        }
          , f = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.CSSStyleDeclaration = this.window.CSSStyleDeclaration || {},
                this.cssStyleProto = this.CSSStyleDeclaration.prototype || {},
                this.getPropertyValue = this.cssStyleProto.getPropertyValue || null,
                this.setProperty = this.cssStyleProto.setProperty || null,
                this.cssText,
                t.nativeMethods.getOwnPropertyDescriptors(this.cssStyleProto, "cssText"),
                this.urlProps = ["background", "backgroundImage", "borderImage", "borderImageSource", "listStyle", "listStyleImage", "cursor"],
                this.dashedUrlProps = ["background", "background-image", "border-image", "border-image-source", "list-style", "list-style-image", "cursor"],
                this.propToDashed = {
                    background: "background",
                    backgroundImage: "background-image",
                    borderImage: "border-image",
                    borderImageSource: "border-image-source",
                    listStyle: "list-style",
                    listStyleImage: "list-style-image",
                    cursor: "cursor"
                }
            }
            overrideSetGetProperty() {
                this.ctx.override(this.cssStyleProto, "getPropertyValue", (t,e,r)=>{
                    if (!r.length)
                        return t.apply(e, r);
                    let[o] = r
                      , s = new i({
                        property: o
                    },t,e);
                    return this.emit("getPropertyValue", s),
                    s.intercepted ? s.returnValue : s.target.call(s.that, s.data.property)
                }
                ),
                this.ctx.override(this.cssStyleProto, "setProperty", (t,e,r)=>{
                    if (2 > r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        property: o,
                        value: s
                    },t,e);
                    return this.emit("setProperty", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.property, n.data.value)
                }
                )
            }
            overrideCssText() {
                this.ctx.overrideDescriptor(this.cssStyleProto, "cssText", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("getCssText", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                    ,
                    set: (t,e,[r])=>{
                        let o = new i({
                            value: r
                        },t,e);
                        return this.emit("setCssText", o),
                        o.intercepted ? o.returnValue : o.target.call(o.that, o.data.value)
                    }
                })
            }
        }
          , x = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = this.ctx.window,
                this.IDBDatabase = this.window.IDBDatabase || {},
                this.idbDatabaseProto = this.IDBDatabase.prototype || {},
                this.IDBFactory = this.window.IDBFactory || {},
                this.idbFactoryProto = this.IDBFactory.prototype || {},
                this.open = this.idbFactoryProto.open
            }
            overrideOpen() {
                this.ctx.override(this.IDBFactory.prototype, "open", (t,e,r)=>{
                    if (!r.length || !r.length)
                        return t.apply(e, r);
                    let[o,s] = r
                      , n = new i({
                        name: o,
                        version: s
                    },t,e);
                    return this.emit("idbFactoryOpen", n),
                    n.intercepted ? n.returnValue : n.target.call(n.that, n.data.name, n.data.version)
                }
                )
            }
            overrideName() {
                this.ctx.overrideDescriptor(this.idbDatabaseProto, "name", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("idbFactoryName", r),
                        r.intercepted ? r.returnValue : r.data.value
                    }
                })
            }
        }
          , b = class extends r {
            constructor(t) {
                super(),
                this.ctx = t,
                this.window = t.window,
                this.WebSocket = this.window.WebSocket || {},
                this.wsProto = this.WebSocket.prototype || {},
                this.url = t.nativeMethods.getOwnPropertyDescriptor(this.wsProto, "url"),
                this.protocol = t.nativeMethods.getOwnPropertyDescriptor(this.wsProto, "protocol"),
                this.readyState = t.nativeMethods.getOwnPropertyDescriptor(this.wsProto, "readyState"),
                this.send = this.wsProto.send,
                this.CONNECTING = WebSocket.CONNECTING,
                this.OPEN = WebSocket.OPEN,
                this.CLOSING = WebSocket.CLOSING,
                this.CLOSED = WebSocket.CLOSED
            }
            overrideWebSocket() {
                this.ctx.override(this.window, "WebSocket", (t,e,r)=>{
                    if (!r.length)
                        return new t(...r);
                    let o = new i({
                        args: r
                    },t,e);
                    return this.emit("websocket", o),
                    o.intercepted ? o.returnValue : new o.target(o.data.url,o.data.protocols)
                }
                , !0),
                this.window.WebSocket.CONNECTING = this.CONNECTING,
                this.window.WebSocket.OPEN = this.OPEN,
                this.window.WebSocket.CLOSING = this.CLOSING,
                this.window.WebSocket.CLOSED = this.CLOSED
            }
            overrideURL() {
                this.ctx.overrideDescriptor(this.wsProto, "url", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("url", r),
                        r.data.value
                    }
                })
            }
            overrideProtocol() {
                this.ctx.overrideDescriptor(this.wsProto, "protocol", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("protocol", r),
                        r.data.value
                    }
                })
            }
            overrideReadyState() {
                this.ctx.overrideDescriptor(this.wsProto, "readyState", {
                    get: (t,e)=>{
                        let r = new i({
                            value: t.call(e)
                        },t,e);
                        return this.emit("readyState", r),
                        r.data.value
                    }
                })
            }
            overrideSend() {
                this.ctx.override(this.wsProto, "send", (t,e,r)=>{
                    let o = new i({
                        args: r
                    },t,e);
                    return this.emit("send", o),
                    o.intercepted ? o.returnValue : o.target.call(o.that, o.data.args)
                }
                )
            }
        }
        ;
        "object" == typeof self && (self.UVClient = class extends r {
            constructor(t=self, e, r=!t.window) {
                super(),
                this.window = t,
                this.nativeMethods = {
                    fnToString: this.window.Function.prototype.toString,
                    defineProperty: this.window.Object.defineProperty,
                    getOwnPropertyDescriptor: this.window.Object.getOwnPropertyDescriptor,
                    getOwnPropertyDescriptors: this.window.Object.getOwnPropertyDescriptors,
                    getOwnPropertyNames: this.window.Object.getOwnPropertyNames,
                    keys: this.window.Object.keys,
                    getOwnPropertySymbols: this.window.Object.getOwnPropertySymbols,
                    isArray: this.window.Array.isArray,
                    setPrototypeOf: this.window.Object.setPrototypeOf,
                    isExtensible: this.window.Object.isExtensible,
                    Map: this.window.Map,
                    Proxy: this.window.Proxy
                },
                this.worker = r,
                this.bareClient = e,
                this.fetch = new d(this),
                this.xhr = new c(this),
                this.idb = new x(this),
                this.history = new p(this),
                this.element = new s(this),
                this.node = new n(this),
                this.document = new o(this),
                this.function = new h(this),
                this.object = new l(this),
                this.websocket = new b(this),
                this.message = new v(this),
                this.navigator = new m(this),
                this.eventSource = new u(this),
                this.attribute = new a(this),
                this.url = new y(this),
                this.workers = new g(this),
                this.location = new w(this),
                this.storage = new P(this),
                this.style = new f(this)
            }
            override(t, e, r, i) {
                let o = this.wrap(t, e, r, i);
                return t[e] = o,
                o
            }
            overrideDescriptor(t, e, r={}) {
                let i = this.wrapDescriptor(t, e, r);
                return i ? (this.nativeMethods.defineProperty(t, e, i),
                i) : {}
            }
            wrap(t, e, r, i=!1) {
                let o = t[e];
                if (!o)
                    return o;
                let s = "prototype"in o ? function() {
                    return r(o, this, [...arguments])
                }
                : ({
                    attach() {
                        return r(o, this, [...arguments])
                    }
                }).attach;
                return i && (s.prototype = o.prototype,
                s.prototype.constructor = s),
                this.emit("wrap", o, s, i),
                s
            }
            wrapDescriptor(t, e, r={}) {
                let i = this.nativeMethods.getOwnPropertyDescriptor(t, e);
                if (!i)
                    return !1;
                for (let t in r)
                    t in i && (i[t] = "get" === t || "set" === t ? this.wrap(i, t, r[t]) : "function" == typeof r[t] ? r[t](i[t]) : r[t]);
                return i
            }
        }
        )
    }
    )()
}
)();
