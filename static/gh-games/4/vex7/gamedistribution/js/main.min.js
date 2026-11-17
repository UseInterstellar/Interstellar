/*
* Project: @gamedistribution.com/html5-sdk
* Description: GameDistribution.com HTML5 SDK
* Development By: GameDistribution.com
* Copyright(c): 2021
* Version: 1.15.7 (01-09-2021 11:07)
*/
!function r(i, o, a) {
    function s(t, e) {
        if (!o[t]) {
            if (!i[t]) {
                var n = "function" == typeof require && require;
                if (!e && n)
                    return n(t, !0);
                if (c)
                    return c(t, !0);
                throw (n = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND",
                n
            }
            n = o[t] = {
                exports: {}
            },
            i[t][0].call(n.exports, function(e) {
                return s(i[t][1][e] || e)
            }, n, n.exports, r, i, o, a)
        }
        return o[t].exports
    }
    for (var c = "function" == typeof require && require, e = 0; e < a.length; e++)
        s(a[e]);
    return s
}({
    1: [function(e, t, n) {
        !function(pf, gf) {
            !function() {
                !function() {
                    "use strict";
                    function p(e, t) {
                        if (e !== t)
                            throw new TypeError("Cannot instantiate an arrow function")
                    }
                    function t(e) {
                        return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        }
                        : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }
                        )(e)
                    }
                    var je = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== pf ? pf : "undefined" != typeof self ? self : {}
                      , e = function(e) {
                        return e && e.Math == Math && e
                    }
                      , n = e("object" == typeof globalThis && globalThis) || e("object" == typeof window && window) || e("object" == typeof self && self) || e("object" == typeof je && je) || function() {
                        return this
                    }() || Function("return this")()
                      , r = {}
                      , i = function(e) {
                        try {
                            return !!e()
                        } catch (e) {
                            return !0
                        }
                    }
                      , o = !i(function() {
                        return 7 != Object.defineProperty({}, 1, {
                            get: function() {
                                return 7
                            }
                        })[1]
                    })
                      , a = {}
                      , s = {}.propertyIsEnumerable
                      , c = Object.getOwnPropertyDescriptor
                      , u = c && !s.call({
                        1: 2
                    }, 1);
                    a.f = u ? function(e) {
                        e = c(this, e);
                        return !!e && e.enumerable
                    }
                    : s;
                    function d(e, t) {
                        return {
                            enumerable: !(1 & e),
                            configurable: !(2 & e),
                            writable: !(4 & e),
                            value: t
                        }
                    }
                    function l(e) {
                        if (null == e)
                            throw TypeError("Can't call method on " + e);
                        return e
                    }
                    function h(e) {
                        return _(w(e))
                    }
                    function f(e) {
                        return "object" == typeof e ? null !== e : "function" == typeof e
                    }
                    var g = {}.toString
                      , m = function(e) {
                        return g.call(e).slice(8, -1)
                    }
                      , v = m
                      , y = "".split
                      , b = i(function() {
                        return !Object("z").propertyIsEnumerable(0)
                    }) ? function(e) {
                        return "String" == v(e) ? y.call(e, "") : Object(e)
                    }
                    : Object
                      , _ = b
                      , w = l
                      , A = n
                      , E = function(e, t) {
                        return arguments.length < 2 ? "function" == typeof (n = A[e]) ? n : void 0 : A[e] && A[e][t];
                        var n
                    }
                      , k = E("navigator", "userAgent") || ""
                      , x = k
                      , S = n.process
                      , D = n.Deno
                      , T = S && S.versions || D && D.version
                      , R = T && T.v8;
                    R ? yn = (mn = R.split("."))[0] < 4 ? 1 : mn[0] + mn[1] : x && (!(mn = x.match(/Edge\/(\d+)/)) || 74 <= mn[1]) && (mn = x.match(/Chrome\/(\d+)/)) && (yn = mn[1]);
                    var O = yn && +yn
                      , C = O
                      , I = i
                      , P = !!Object.getOwnPropertySymbols && !I(function() {
                        var e = Symbol();
                        return !String(e) || !(Object(e)instanceof Symbol) || !Symbol.sham && C && C < 41
                    })
                      , L = P && !Symbol.sham && "symbol" == typeof Symbol.iterator
                      , j = E
                      , B = L ? function(e) {
                        return "symbol" == typeof e
                    }
                    : function(e) {
                        var t = j("Symbol");
                        return "function" == typeof t && Object(e)instanceof t
                    }
                      , M = f
                      , U = {
                        exports: {}
                    }
                      , N = n
                      , G = function(t, n) {
                        try {
                            Object.defineProperty(N, t, {
                                value: n,
                                configurable: !0,
                                writable: !0
                            })
                        } catch (e) {
                            N[t] = n
                        }
                        return n
                    }
                      , F = G
                      , q = "__core-js_shared__"
                      , z = n[q] || F(q, {})
                      , V = z;
                    (U.exports = function(e, t) {
                        return V[e] || (V[e] = void 0 !== t ? t : {})
                    }
                    )("versions", []).push({
                        version: "3.16.1",
                        mode: "global",
                        copyright: "Â© 2021 Denis Pushkarev (zloirock.ru)"
                    });
                    var K = l
                      , H = function(e) {
                        return Object(K(e))
                    }
                      , W = H
                      , $ = {}.hasOwnProperty
                      , Y = Object.hasOwn || function(e, t) {
                        return $.call(W(e), t)
                    }
                      , Q = 0
                      , J = Math.random()
                      , Z = function(e) {
                        return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++Q + J).toString(36)
                    }
                      , X = n
                      , ee = U.exports
                      , te = Y
                      , ne = Z
                      , re = P
                      , ie = L
                      , oe = ee("wks")
                      , ae = X.Symbol
                      , se = ie ? ae : ae && ae.withoutSetter || ne
                      , ce = function(e) {
                        return te(oe, e) && (re || "string" == typeof oe[e]) || (re && te(ae, e) ? oe[e] = ae[e] : oe[e] = se("Symbol." + e)),
                        oe[e]
                    }
                      , ue = f
                      , de = B
                      , le = function(e, t) {
                        var n, r;
                        if ("string" === t && "function" == typeof (n = e.toString) && !M(r = n.call(e)))
                            return r;
                        if ("function" == typeof (n = e.valueOf) && !M(r = n.call(e)))
                            return r;
                        if ("string" !== t && "function" == typeof (n = e.toString) && !M(r = n.call(e)))
                            return r;
                        throw TypeError("Can't convert object to primitive value")
                    }
                      , he = ce("toPrimitive")
                      , fe = B
                      , pe = function(e) {
                        e = function(e, t) {
                            if (!ue(e) || de(e))
                                return e;
                            var n = e[he];
                            if (void 0 === n)
                                return le(e, t = void 0 === t ? "number" : t);
                            if (t = n.call(e, t = void 0 === t ? "default" : t),
                            !ue(t) || de(t))
                                return t;
                            throw TypeError("Can't convert object to primitive value")
                        }(e, "string");
                        return fe(e) ? e : String(e)
                    }
                      , ge = f
                      , me = n.document
                      , ve = ge(me) && ge(me.createElement)
                      , ye = function(e) {
                        return ve ? me.createElement(e) : {}
                    }
                      , be = ye
                      , _e = !o && !i(function() {
                        return 7 != Object.defineProperty(be("div"), "a", {
                            get: function() {
                                return 7
                            }
                        }).a
                    })
                      , we = a
                      , Ae = d
                      , Ee = h
                      , ke = pe
                      , xe = Y
                      , Se = _e
                      , De = Object.getOwnPropertyDescriptor;
                    r.f = o ? De : function(e, t) {
                        if (e = Ee(e),
                        t = ke(t),
                        Se)
                            try {
                                return De(e, t)
                            } catch (e) {}
                        if (xe(e, t))
                            return Ae(!we.f.call(e, t), e[t])
                    }
                    ;
                    function Te(e) {
                        if (!Oe(e))
                            throw TypeError(String(e) + " is not an object");
                        return e
                    }
                    var Re = {}
                      , Oe = f
                      , Ce = _e
                      , Ie = Te
                      , Pe = pe
                      , Le = Object.defineProperty;
                    Re.f = o ? Le : function(e, t, n) {
                        if (Ie(e),
                        t = Pe(t),
                        Ie(n),
                        Ce)
                            try {
                                return Le(e, t, n)
                            } catch (e) {}
                        if ("get"in n || "set"in n)
                            throw TypeError("Accessors not supported");
                        return "value"in n && (e[t] = n.value),
                        e
                    }
                    ;
                    var Be = Re
                      , Me = d
                      , Ue = o ? function(e, t, n) {
                        return Be.f(e, t, Me(1, n))
                    }
                    : function(e, t, n) {
                        return e[t] = n,
                        e
                    }
                      , Ne = {
                        exports: {}
                    }
                      , Ge = z
                      , Fe = Function.toString;
                    "function" != typeof Ge.inspectSource && (Ge.inspectSource = function(e) {
                        return Fe.call(e)
                    }
                    );
                    var qe, ze, Ve, Ke, He, We, $e, Ye, Qe = Ge.inspectSource, Je = Qe, Ze = n.WeakMap, Xe = "function" == typeof Ze && /native code/.test(Je(Ze)), et = U.exports, tt = Z, nt = et("keys"), rt = function(e) {
                        return nt[e] || (nt[e] = tt(e))
                    }, it = {}, ot = f, at = Ue, st = Y, ct = z, ut = rt, dt = it, lt = "Object already initialized", ht = n.WeakMap;
                    $e = Xe || ct.state ? (qe = ct.state || (ct.state = new ht),
                    ze = qe.get,
                    Ve = qe.has,
                    Ke = qe.set,
                    He = function(e, t) {
                        if (Ve.call(qe, e))
                            throw new TypeError(lt);
                        return t.facade = e,
                        Ke.call(qe, e, t),
                        t
                    }
                    ,
                    We = function(e) {
                        return ze.call(qe, e) || {}
                    }
                    ,
                    function(e) {
                        return Ve.call(qe, e)
                    }
                    ) : (dt[Ye = ut("state")] = !0,
                    He = function(e, t) {
                        if (st(e, Ye))
                            throw new TypeError(lt);
                        return t.facade = e,
                        at(e, Ye, t),
                        t
                    }
                    ,
                    We = function(e) {
                        return st(e, Ye) ? e[Ye] : {}
                    }
                    ,
                    function(e) {
                        return st(e, Ye)
                    }
                    );
                    var ft = {
                        set: He,
                        get: We,
                        has: $e,
                        enforce: function(e) {
                            return $e(e) ? We(e) : He(e, {})
                        },
                        getterFor: function(n) {
                            return function(e) {
                                var t;
                                if (!ot(e) || (t = We(e)).type !== n)
                                    throw TypeError("Incompatible receiver, " + n + " required");
                                return t
                            }
                        }
                    }
                      , pt = n
                      , gt = Ue
                      , mt = Y
                      , vt = G
                      , yt = Qe
                      , bt = ft.get
                      , _t = ft.enforce
                      , wt = String(String).split("String");
                    (Ne.exports = function(e, t, n, r) {
                        var i = !!r && !!r.unsafe
                          , o = !!r && !!r.enumerable
                          , a = !!r && !!r.noTargetGet;
                        "function" == typeof n && ("string" != typeof t || mt(n, "name") || gt(n, "name", t),
                        (r = _t(n)).source || (r.source = wt.join("string" == typeof t ? t : ""))),
                        e !== pt ? (i ? !a && e[t] && (o = !0) : delete e[t],
                        o ? e[t] = n : gt(e, t, n)) : o ? e[t] = n : vt(t, n)
                    }
                    )(Function.prototype, "toString", function() {
                        return "function" == typeof this && bt(this).source || yt(this)
                    });
                    function At(e) {
                        return 0 < e ? Tt(Dt(e), 9007199254740991) : 0
                    }
                    var Et = {}
                      , kt = Math.ceil
                      , xt = Math.floor
                      , St = function(e) {
                        return isNaN(e = +e) ? 0 : (0 < e ? xt : kt)(e)
                    }
                      , Dt = St
                      , Tt = Math.min
                      , Rt = St
                      , Ot = Math.max
                      , Ct = Math.min
                      , It = function(e, t) {
                        e = Rt(e);
                        return e < 0 ? Ot(e + t, 0) : Ct(e, t)
                    }
                      , Pt = h
                      , Lt = At
                      , jt = It
                      , Bt = function(s) {
                        return function(e, t, n) {
                            var r, i = Pt(e), o = Lt(i.length), a = jt(n, o);
                            if (s && t != t) {
                                for (; a < o; )
                                    if ((r = i[a++]) != r)
                                        return !0
                            } else
                                for (; a < o; a++)
                                    if ((s || a in i) && i[a] === t)
                                        return s || a || 0;
                            return !s && -1
                        }
                    }
                      , Mt = {
                        includes: Bt(!0),
                        indexOf: Bt(!1)
                    }
                      , Ut = Y
                      , Nt = h
                      , Gt = Mt.indexOf
                      , Ft = it
                      , qt = function(e, t) {
                        var n, r = Nt(e), i = 0, o = [];
                        for (n in r)
                            !Ut(Ft, n) && Ut(r, n) && o.push(n);
                        for (; t.length > i; )
                            Ut(r, n = t[i++]) && (~Gt(o, n) || o.push(n));
                        return o
                    }
                      , e = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
                      , zt = qt
                      , Vt = e.concat("length", "prototype");
                    Et.f = Object.getOwnPropertyNames || function(e) {
                        return zt(e, Vt)
                    }
                    ;
                    u = {};
                    u.f = Object.getOwnPropertySymbols;
                    var Kt = Et
                      , Ht = u
                      , Wt = Te
                      , s = E("Reflect", "ownKeys") || function(e) {
                        var t = Kt.f(Wt(e))
                          , n = Ht.f;
                        return n ? t.concat(n(e)) : t
                    }
                      , $t = Y
                      , Yt = s
                      , Qt = r
                      , Jt = Re
                      , S = function(e, t) {
                        for (var n = Yt(t), r = Jt.f, i = Qt.f, o = 0; o < n.length; o++) {
                            var a = n[o];
                            $t(e, a) || r(e, a, i(t, a))
                        }
                    }
                      , Zt = i
                      , Xt = /#|\.prototype\./
                      , D = function(e, t) {
                        e = tn[en(e)];
                        return e == rn || e != nn && ("function" == typeof t ? Zt(t) : !!t)
                    }
                      , en = D.normalize = function(e) {
                        return String(e).replace(Xt, ".").toLowerCase()
                    }
                      , tn = D.data = {}
                      , nn = D.NATIVE = "N"
                      , rn = D.POLYFILL = "P"
                      , T = D
                      , on = n
                      , an = r.f
                      , sn = Ue
                      , cn = Ne.exports
                      , un = G
                      , dn = S
                      , ln = T
                      , R = function(e, t) {
                        var n, r, i, o, a = e.target, s = e.global, c = e.stat;
                        if (n = s ? on : c ? on[a] || un(a, {}) : (on[a] || {}).prototype)
                            for (r in t) {
                                if (i = t[r],
                                o = e.noTargetGet ? (o = an(n, r)) && o.value : n[r],
                                !ln(s ? r : a + (c ? "." : "#") + r, e.forced) && void 0 !== o) {
                                    if (typeof i == typeof o)
                                        continue;
                                    dn(i, o)
                                }
                                (e.sham || o && o.sham) && sn(i, "sham", !0),
                                cn(n, r, i, e)
                            }
                    }
                      , hn = qt
                      , fn = e
                      , x = Object.keys || function(e) {
                        return hn(e, fn)
                    }
                      , pn = H
                      , gn = x;
                    R({
                        target: "Object",
                        stat: !0,
                        forced: i(function() {
                            gn(1)
                        })
                    }, {
                        keys: function(e) {
                            return gn(pn(e))
                        }
                    });
                    var mn = function(e) {
                        if ("function" != typeof e)
                            throw TypeError(String(e) + " is not a function");
                        return e
                    }
                      , vn = mn
                      , yn = function(r, i, e) {
                        if (vn(r),
                        void 0 === i)
                            return r;
                        switch (e) {
                        case 0:
                            return function() {
                                return r.call(i)
                            }
                            ;
                        case 1:
                            return function(e) {
                                return r.call(i, e)
                            }
                            ;
                        case 2:
                            return function(e, t) {
                                return r.call(i, e, t)
                            }
                            ;
                        case 3:
                            return function(e, t, n) {
                                return r.call(i, e, t, n)
                            }
                        }
                        return function() {
                            return r.apply(i, arguments)
                        }
                    }
                      , bn = m
                      , I = Array.isArray || function(e) {
                        return "Array" == bn(e)
                    }
                      , _n = f
                      , wn = I
                      , An = ce("species")
                      , F = function(e, t) {
                        return new (void 0 === (n = wn(e = e) && ("function" == typeof (n = e.constructor) && (n === Array || wn(n.prototype)) || _n(n) && null === (n = n[An])) ? void 0 : n) ? Array : n)(0 === t ? 0 : t);
                        var n
                    }
                      , En = yn
                      , kn = b
                      , xn = H
                      , Sn = At
                      , Dn = F
                      , Tn = [].push
                      , q = function(h) {
                        var f = 1 == h
                          , p = 2 == h
                          , g = 3 == h
                          , m = 4 == h
                          , v = 6 == h
                          , y = 7 == h
                          , b = 5 == h || v;
                        return function(e, t, n, r) {
                            for (var i, o, a = xn(e), s = kn(a), c = En(t, n, 3), u = Sn(s.length), d = 0, r = r || Dn, l = f ? r(e, u) : p || y ? r(e, 0) : void 0; d < u; d++)
                                if ((b || d in s) && (o = c(i = s[d], d, a),
                                h))
                                    if (f)
                                        l[d] = o;
                                    else if (o)
                                        switch (h) {
                                        case 3:
                                            return !0;
                                        case 5:
                                            return i;
                                        case 6:
                                            return d;
                                        case 2:
                                            Tn.call(l, i)
                                        }
                                    else
                                        switch (h) {
                                        case 4:
                                            return !1;
                                        case 7:
                                            Tn.call(l, i)
                                        }
                            return v ? -1 : g || m ? m : l
                        }
                    }
                      , L = {
                        forEach: q(0),
                        map: q(1),
                        filter: q(2),
                        some: q(3),
                        every: q(4),
                        find: q(5),
                        findIndex: q(6),
                        filterReject: q(7)
                    }
                      , Rn = i
                      , On = O
                      , Cn = ce("species")
                      , ee = function(t) {
                        return 51 <= On || !Rn(function() {
                            var e = [];
                            return (e.constructor = {})[Cn] = function() {
                                return {
                                    foo: 1
                                }
                            }
                            ,
                            1 !== e[t](Boolean).foo
                        })
                    }
                      , In = L.filter;
                    R({
                        target: "Array",
                        proto: !0,
                        forced: !ee("filter")
                    }, {
                        filter: function(e) {
                            return In(this, e, 1 < arguments.length ? arguments[1] : void 0)
                        }
                    });
                    var X = R
                      , ie = i
                      , Pn = h
                      , Ln = r.f
                      , ne = o
                      , ge = ie(function() {
                        Ln(1)
                    });
                    X({
                        target: "Object",
                        stat: !0,
                        forced: !ne || ge,
                        sham: !ne
                    }, {
                        getOwnPropertyDescriptor: function(e, t) {
                            return Ln(Pn(e), t)
                        }
                    });
                    var jn = pe
                      , Bn = Re
                      , Mn = d
                      , _e = function(e, t, n) {
                        t = jn(t);
                        t in e ? Bn.f(e, t, Mn(0, n)) : e[t] = n
                    }
                      , Un = s
                      , Nn = h
                      , Gn = r
                      , Fn = _e;
                    function qn(e, t, n) {
                        return t in e ? Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[t] = n,
                        e
                    }
                    function zn(e, t, n, r, i, o, a) {
                        try {
                            var s = e[o](a)
                              , c = s.value
                        } catch (e) {
                            return n(e),
                            0
                        }
                        s.done ? t(c) : Promise.resolve(c).then(r, i)
                    }
                    function Vn(s) {
                        return function() {
                            var e = this
                              , a = arguments;
                            return new Promise(function(t, n) {
                                var r = s.apply(e, a);
                                function i(e) {
                                    zn(r, t, n, i, o, "next", e)
                                }
                                function o(e) {
                                    zn(r, t, n, i, o, "throw", e)
                                }
                                i(void 0)
                            }
                            )
                        }
                    }
                    function Kn(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }
                    function Hn(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1,
                            r.configurable = !0,
                            "value"in r && (r.writable = !0),
                            Object.defineProperty(e, r.key, r)
                        }
                    }
                    function Wn(e, t, n) {
                        return t && Hn(e.prototype, t),
                        n && Hn(e, n),
                        e
                    }
                    R({
                        target: "Object",
                        stat: !0,
                        sham: !o
                    }, {
                        getOwnPropertyDescriptors: function(e) {
                            for (var t, n, r = Nn(e), i = Gn.f, o = Un(r), a = {}, s = 0; o.length > s; )
                                void 0 !== (n = i(r, t = o[s++])) && Fn(a, t, n);
                            return a
                        }
                    });
                    var $n = {
                        exports: {}
                    };
                    !function() {
                        var t = function(a) {
                            var c, e = Object.prototype, u = e.hasOwnProperty, t = "function" == typeof Symbol ? Symbol : {}, r = t.iterator || "@@iterator", n = t.asyncIterator || "@@asyncIterator", i = t.toStringTag || "@@toStringTag";
                            function o(e, t, n) {
                                return Object.defineProperty(e, t, {
                                    value: n,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }),
                                e[t]
                            }
                            try {
                                o({}, "")
                            } catch (a) {
                                o = function(e, t, n) {
                                    return e[t] = n
                                }
                            }
                            function s(e, t, n, r) {
                                var i, o, a, s, t = t && t.prototype instanceof m ? t : m, t = Object.create(t.prototype), r = new x(r || []);
                                return t._invoke = (i = e,
                                o = n,
                                a = r,
                                s = l,
                                function(e, t) {
                                    if (s === f)
                                        throw new Error("Generator is already running");
                                    if (s === p) {
                                        if ("throw" === e)
                                            throw t;
                                        return D()
                                    }
                                    for (a.method = e,
                                    a.arg = t; ; ) {
                                        var n = a.delegate;
                                        if (n) {
                                            var r = function e(t, n) {
                                                var r = t.iterator[n.method];
                                                if (r === c) {
                                                    if (n.delegate = null,
                                                    "throw" === n.method) {
                                                        if (t.iterator.return && (n.method = "return",
                                                        n.arg = c,
                                                        e(t, n),
                                                        "throw" === n.method))
                                                            return g;
                                                        n.method = "throw",
                                                        n.arg = new TypeError("The iterator does not provide a 'throw' method")
                                                    }
                                                    return g
                                                }
                                                var r = d(r, t.iterator, n.arg);
                                                if ("throw" === r.type)
                                                    return n.method = "throw",
                                                    n.arg = r.arg,
                                                    n.delegate = null,
                                                    g;
                                                r = r.arg;
                                                return r ? r.done ? (n[t.resultName] = r.value,
                                                n.next = t.nextLoc,
                                                "return" !== n.method && (n.method = "next",
                                                n.arg = c),
                                                n.delegate = null,
                                                g) : r : (n.method = "throw",
                                                n.arg = new TypeError("iterator result is not an object"),
                                                n.delegate = null,
                                                g)
                                            }(n, a);
                                            if (r) {
                                                if (r === g)
                                                    continue;
                                                return r
                                            }
                                        }
                                        if ("next" === a.method)
                                            a.sent = a._sent = a.arg;
                                        else if ("throw" === a.method) {
                                            if (s === l)
                                                throw s = p,
                                                a.arg;
                                            a.dispatchException(a.arg)
                                        } else
                                            "return" === a.method && a.abrupt("return", a.arg);
                                        s = f;
                                        r = d(i, o, a);
                                        if ("normal" === r.type) {
                                            if (s = a.done ? p : h,
                                            r.arg === g)
                                                continue;
                                            return {
                                                value: r.arg,
                                                done: a.done
                                            }
                                        }
                                        "throw" === r.type && (s = p,
                                        a.method = "throw",
                                        a.arg = r.arg)
                                    }
                                }
                                ),
                                t
                            }
                            function d(e, t, n) {
                                try {
                                    return {
                                        type: "normal",
                                        arg: e.call(t, n)
                                    }
                                } catch (e) {
                                    return {
                                        type: "throw",
                                        arg: e
                                    }
                                }
                            }
                            a.wrap = s;
                            var l = "suspendedStart"
                              , h = "suspendedYield"
                              , f = "executing"
                              , p = "completed"
                              , g = {};
                            function m() {}
                            function v() {}
                            function y() {}
                            var b = {};
                            o(b, r, function() {
                                return this
                            });
                            t = Object.getPrototypeOf,
                            t = t && t(t(S([])));
                            t && t !== e && u.call(t, r) && (b = t);
                            var _ = y.prototype = m.prototype = Object.create(b);
                            function w(e) {
                                ["next", "throw", "return"].forEach(function(t) {
                                    o(e, t, function(e) {
                                        return this._invoke(t, e)
                                    })
                                })
                            }
                            function A(a, s) {
                                var t;
                                this._invoke = function(n, r) {
                                    function e() {
                                        return new s(function(e, t) {
                                            !function t(e, n, r, i) {
                                                e = d(a[e], a, n);
                                                if ("throw" !== e.type) {
                                                    var o = e.arg;
                                                    return (n = o.value) && "object" == typeof n && u.call(n, "__await") ? s.resolve(n.__await).then(function(e) {
                                                        t("next", e, r, i)
                                                    }, function(e) {
                                                        t("throw", e, r, i)
                                                    }) : s.resolve(n).then(function(e) {
                                                        o.value = e,
                                                        r(o)
                                                    }, function(e) {
                                                        return t("throw", e, r, i)
                                                    })
                                                }
                                                i(e.arg)
                                            }(n, r, e, t)
                                        }
                                        )
                                    }
                                    return t = t ? t.then(e, e) : e()
                                }
                            }
                            function E(e) {
                                var t = {
                                    tryLoc: e[0]
                                };
                                1 in e && (t.catchLoc = e[1]),
                                2 in e && (t.finallyLoc = e[2],
                                t.afterLoc = e[3]),
                                this.tryEntries.push(t)
                            }
                            function k(e) {
                                var t = e.completion || {};
                                t.type = "normal",
                                delete t.arg,
                                e.completion = t
                            }
                            function x(e) {
                                this.tryEntries = [{
                                    tryLoc: "root"
                                }],
                                e.forEach(E, this),
                                this.reset(!0)
                            }
                            function S(t) {
                                if (t) {
                                    var e = t[r];
                                    if (e)
                                        return e.call(t);
                                    if ("function" == typeof t.next)
                                        return t;
                                    if (!isNaN(t.length)) {
                                        var n = -1
                                          , e = function e() {
                                            for (; ++n < t.length; )
                                                if (u.call(t, n))
                                                    return e.value = t[n],
                                                    e.done = !1,
                                                    e;
                                            return e.value = c,
                                            e.done = !0,
                                            e
                                        };
                                        return e.next = e
                                    }
                                }
                                return {
                                    next: D
                                }
                            }
                            function D() {
                                return {
                                    value: c,
                                    done: !0
                                }
                            }
                            return o(_, "constructor", v.prototype = y),
                            o(y, "constructor", v),
                            v.displayName = o(y, i, "GeneratorFunction"),
                            a.isGeneratorFunction = function(e) {
                                e = "function" == typeof e && e.constructor;
                                return !!e && (e === v || "GeneratorFunction" === (e.displayName || e.name))
                            }
                            ,
                            a.mark = function(e) {
                                return Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y,
                                o(e, i, "GeneratorFunction")),
                                e.prototype = Object.create(_),
                                e
                            }
                            ,
                            a.awrap = function(e) {
                                return {
                                    __await: e
                                }
                            }
                            ,
                            w(A.prototype),
                            o(A.prototype, n, function() {
                                return this
                            }),
                            a.AsyncIterator = A,
                            a.async = function(e, t, n, r, i) {
                                void 0 === i && (i = Promise);
                                var o = new A(s(e, t, n, r),i);
                                return a.isGeneratorFunction(t) ? o : o.next().then(function(e) {
                                    return e.done ? e.value : o.next()
                                })
                            }
                            ,
                            w(_),
                            o(_, i, "Generator"),
                            o(_, r, function() {
                                return this
                            }),
                            o(_, "toString", function() {
                                return "[object Generator]"
                            }),
                            a.keys = function(n) {
                                var e, r = [];
                                for (e in n)
                                    r.push(e);
                                return r.reverse(),
                                function e() {
                                    for (; r.length; ) {
                                        var t = r.pop();
                                        if (t in n)
                                            return e.value = t,
                                            e.done = !1,
                                            e
                                    }
                                    return e.done = !0,
                                    e
                                }
                            }
                            ,
                            a.values = S,
                            x.prototype = {
                                constructor: x,
                                reset: function(e) {
                                    if (this.prev = 0,
                                    this.next = 0,
                                    this.sent = this._sent = c,
                                    this.done = !1,
                                    this.delegate = null,
                                    this.method = "next",
                                    this.arg = c,
                                    this.tryEntries.forEach(k),
                                    !e)
                                        for (var t in this)
                                            "t" === t.charAt(0) && u.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = c)
                                },
                                stop: function() {
                                    this.done = !0;
                                    var e = this.tryEntries[0].completion;
                                    if ("throw" === e.type)
                                        throw e.arg;
                                    return this.rval
                                },
                                dispatchException: function(n) {
                                    if (this.done)
                                        throw n;
                                    var r = this;
                                    function e(e, t) {
                                        return o.type = "throw",
                                        o.arg = n,
                                        r.next = e,
                                        t && (r.method = "next",
                                        r.arg = c),
                                        !!t
                                    }
                                    for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                                        var i = this.tryEntries[t]
                                          , o = i.completion;
                                        if ("root" === i.tryLoc)
                                            return e("end");
                                        if (i.tryLoc <= this.prev) {
                                            var a = u.call(i, "catchLoc")
                                              , s = u.call(i, "finallyLoc");
                                            if (a && s) {
                                                if (this.prev < i.catchLoc)
                                                    return e(i.catchLoc, !0);
                                                if (this.prev < i.finallyLoc)
                                                    return e(i.finallyLoc)
                                            } else if (a) {
                                                if (this.prev < i.catchLoc)
                                                    return e(i.catchLoc, !0)
                                            } else {
                                                if (!s)
                                                    throw new Error("try statement without catch or finally");
                                                if (this.prev < i.finallyLoc)
                                                    return e(i.finallyLoc)
                                            }
                                        }
                                    }
                                },
                                abrupt: function(e, t) {
                                    for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
                                        var r = this.tryEntries[n];
                                        if (r.tryLoc <= this.prev && u.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                            var i = r;
                                            break
                                        }
                                    }
                                    var o = (i = i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc ? null : i) ? i.completion : {};
                                    return o.type = e,
                                    o.arg = t,
                                    i ? (this.method = "next",
                                    this.next = i.finallyLoc,
                                    g) : this.complete(o)
                                },
                                complete: function(e, t) {
                                    if ("throw" === e.type)
                                        throw e.arg;
                                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
                                    this.method = "return",
                                    this.next = "end") : "normal" === e.type && t && (this.next = t),
                                    g
                                },
                                finish: function(e) {
                                    for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                                        var n = this.tryEntries[t];
                                        if (n.finallyLoc === e)
                                            return this.complete(n.completion, n.afterLoc),
                                            k(n),
                                            g
                                    }
                                },
                                catch: function(e) {
                                    for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                                        var n = this.tryEntries[t];
                                        if (n.tryLoc === e) {
                                            var r, i = n.completion;
                                            return "throw" === i.type && (r = i.arg,
                                            k(n)),
                                            r
                                        }
                                    }
                                    throw new Error("illegal catch attempt")
                                },
                                delegateYield: function(e, t, n) {
                                    return this.delegate = {
                                        iterator: S(e),
                                        resultName: t,
                                        nextLoc: n
                                    },
                                    "next" === this.method && (this.arg = c),
                                    g
                                }
                            },
                            a
                        }($n.exports);
                        try {
                            regeneratorRuntime = t
                        } catch (e) {
                            "object" == typeof globalThis ? globalThis.regeneratorRuntime = t : Function("r", "regeneratorRuntime = r")(t)
                        }
                    }();
                    var Yn = $n.exports
                      , Ge = {};
                    Ge[ce("toStringTag")] = "z";
                    var Je = "[object z]" === String(Ge)
                      , Ze = Je
                      , Qn = m
                      , Jn = ce("toStringTag")
                      , Zn = "Arguments" == Qn(function() {
                        return arguments
                    }())
                      , et = Ze ? Qn : function(e) {
                        var t;
                        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (e = function(e, t) {
                            try {
                                return e[t]
                            } catch (e) {}
                        }(t = Object(e), Jn)) ? e : Zn ? Qn(t) : "Object" == (e = Qn(t)) && "function" == typeof t.callee ? "Arguments" : e
                    }
                      , Xn = et
                      , z = Ne.exports;
                    Je || z(Object.prototype, "toString", Je ? {}.toString : function() {
                        return "[object " + Xn(this) + "]"
                    }
                    , {
                        unsafe: !0
                    });
                    function er(e, t) {
                        this.stopped = e,
                        this.result = t
                    }
                    var Xe = n.Promise
                      , tr = Ne.exports
                      , nr = f
                      , rr = Te
                      , ct = Object.setPrototypeOf || ("__proto__"in {} ? function() {
                        var n, r = !1, e = {};
                        try {
                            (n = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(e, []),
                            r = e instanceof Array
                        } catch (n) {}
                        return function(e, t) {
                            return rr(e),
                            function(e) {
                                if (!nr(e) && null !== e)
                                    throw TypeError("Can't set " + String(e) + " as a prototype")
                            }(t),
                            r ? n.call(e, t) : e.__proto__ = t,
                            e
                        }
                    }() : void 0)
                      , ir = Re.f
                      , or = Y
                      , ar = ce("toStringTag")
                      , ht = function(e, t, n) {
                        e && !or(e = n ? e : e.prototype, ar) && ir(e, ar, {
                            configurable: !0,
                            value: t
                        })
                    }
                      , sr = E
                      , cr = Re
                      , ur = o
                      , dr = ce("species")
                      , dt = function(e) {
                        var t = sr(e)
                          , e = cr.f;
                        ur && t && !t[dr] && e(t, dr, {
                            configurable: !0,
                            get: function() {
                                return this
                            }
                        })
                    }
                      , ut = {}
                      , lr = ut
                      , hr = ce("iterator")
                      , fr = Array.prototype
                      , Bt = function(e) {
                        return void 0 !== e && (lr.Array === e || fr[hr] === e)
                    }
                      , pr = et
                      , gr = ut
                      , mr = ce("iterator")
                      , D = function(e) {
                        if (null != e)
                            return e[mr] || e["@@iterator"] || gr[pr(e)]
                    }
                      , vr = Te
                      , G = function(e) {
                        var t = e.return;
                        if (void 0 !== t)
                            return vr(t.call(e)).value
                    }
                      , yr = Te
                      , br = Bt
                      , _r = At
                      , wr = yn
                      , Ar = D
                      , Er = G
                      , kr = ce("iterator")
                      , xr = !1;
                    try {
                        var Sr = 0
                          , Dr = {
                            next: function() {
                                return {
                                    done: !!Sr++
                                }
                            },
                            return: function() {
                                xr = !0
                            }
                        };
                        Dr[kr] = function() {
                            return this
                        }
                        ,
                        Array.from(Dr, function() {
                            throw 2
                        })
                    } catch (p) {}
                    var Tr, Rr, qt = function(e, t) {
                        if (!t && !xr)
                            return !1;
                        var n = !1;
                        try {
                            var r = {};
                            r[kr] = function() {
                                return {
                                    next: function() {
                                        return {
                                            done: n = !0
                                        }
                                    }
                                }
                            }
                            ,
                            e(r)
                        } catch (e) {}
                        return n
                    }, Or = Te, Cr = mn, Ir = ce("species"), b = function(e, t) {
                        var n, e = Or(e).constructor;
                        return void 0 === e || null == (n = Or(e)[Ir]) ? t : Cr(n)
                    }, q = E("document", "documentElement"), ie = /(?:iphone|ipod|ipad).*applewebkit/i.test(k), X = "process" == m(n.process), Pr = n, ge = i, ne = yn, Lr = q, jr = ye, s = ie, Ge = X, Ze = Pr.setImmediate, z = Pr.clearImmediate, Br = Pr.process, Je = Pr.MessageChannel, Mr = Pr.Dispatch, Ur = 0, Nr = {};
                    try {
                        Tr = Pr.location
                    } catch (p) {}
                    function Gr(e) {
                        return function() {
                            Fr(e)
                        }
                    }
                    var Fr = function(e) {
                        var t;
                        Nr.hasOwnProperty(e) && (t = Nr[e],
                        delete Nr[e],
                        t())
                    }
                      , et = function(e) {
                        Fr(e.data)
                    }
                      , Dr = function(e) {
                        Pr.postMessage(String(e), Tr.protocol + "//" + Tr.host)
                    };
                    Ze && z || (Ze = function(e) {
                        for (var t = [], n = arguments.length, r = 1; r < n; )
                            t.push(arguments[r++]);
                        return Nr[++Ur] = function() {
                            ("function" == typeof e ? e : Function(e)).apply(void 0, t)
                        }
                        ,
                        Rr(Ur),
                        Ur
                    }
                    ,
                    z = function(e) {
                        delete Nr[e]
                    }
                    ,
                    Ge ? Rr = function(e) {
                        Br.nextTick(Gr(e))
                    }
                    : Mr && Mr.now ? Rr = function(e) {
                        Mr.now(Gr(e))
                    }
                    : Je && !s ? (Zr = (Qr = new Je).port2,
                    Qr.port1.onmessage = et,
                    Rr = ne(Zr.postMessage, Zr, 1)) : Pr.addEventListener && "function" == typeof postMessage && !Pr.importScripts && Tr && "file:" !== Tr.protocol && !ge(Dr) ? (Rr = Dr,
                    Pr.addEventListener("message", et, !1)) : Rr = "onreadystatechange"in jr("script") ? function(e) {
                        Lr.appendChild(jr("script")).onreadystatechange = function() {
                            Lr.removeChild(this),
                            Fr(e)
                        }
                    }
                    : function(e) {
                        setTimeout(Gr(e), 0)
                    }
                    );
                    var qr, zr, Vr, Kr, Hr, Wr, $r, Yr, s = {
                        set: Ze,
                        clear: z
                    }, Je = n, Qr = /iphone|ipod|ipad/i.test(k) && void 0 !== Je.Pebble, ne = /web0s(?!.*chrome)/i.test(k), Jr = n, Zr = r.f, Xr = s.set, ge = ie, Dr = Qr, et = ne, ei = X, Ze = Jr.MutationObserver || Jr.WebKitMutationObserver, z = Jr.document, ti = Jr.process, Je = Jr.Promise, k = Zr(Jr, "queueMicrotask"), ie = k && k.value;
                    ie || (qr = function() {
                        var e, t;
                        for (ei && (e = ti.domain) && e.exit(); zr; ) {
                            t = zr.fn,
                            zr = zr.next;
                            try {
                                t()
                            } catch (e) {
                                throw zr ? Kr() : Vr = void 0,
                                e
                            }
                        }
                        Vr = void 0,
                        e && e.enter()
                    }
                    ,
                    Kr = ge || ei || et || !Ze || !z ? !Dr && Je && Je.resolve ? (($r = Je.resolve(void 0)).constructor = Je,
                    Yr = $r.then,
                    function() {
                        Yr.call($r, qr)
                    }
                    ) : ei ? function() {
                        ti.nextTick(qr)
                    }
                    : function() {
                        Xr.call(Jr, qr)
                    }
                    : (Hr = !0,
                    Wr = z.createTextNode(""),
                    new Ze(qr).observe(Wr, {
                        characterData: !0
                    }),
                    function() {
                        Wr.data = Hr = !Hr
                    }
                    ));
                    function ni(e) {
                        var n, r;
                        this.promise = new e(function(e, t) {
                            if (void 0 !== n || void 0 !== r)
                                throw TypeError("Bad Promise constructor");
                            n = e,
                            r = t
                        }
                        ),
                        this.resolve = ri(n),
                        this.reject = ri(r)
                    }
                    var Qr = ie || function(e) {
                        e = {
                            fn: e,
                            next: void 0
                        };
                        Vr && (Vr.next = e),
                        zr || (zr = e,
                        Kr()),
                        Vr = e
                    }
                      , ne = {}
                      , ri = mn;
                    ne.f = function(e) {
                        return new ni(e)
                    }
                    ;
                    function ii(e, t, n) {
                        function r(e) {
                            return o && Er(o),
                            new er(!0,e)
                        }
                        function i(e) {
                            return h ? (yr(e),
                            p ? g(e[0], e[1], r) : g(e[0], e[1])) : p ? g(e, r) : g(e)
                        }
                        var o, a, s, c, u, d, l = n && n.that, h = !(!n || !n.AS_ENTRIES), f = !(!n || !n.IS_ITERATOR), p = !(!n || !n.INTERRUPTED), g = wr(t, l, 1 + h + p);
                        if (f)
                            o = e;
                        else {
                            if ("function" != typeof (f = Ar(e)))
                                throw TypeError("Target is not iterable");
                            if (br(f)) {
                                for (a = 0,
                                s = _r(e.length); a < s; a++)
                                    if ((c = i(e[a])) && c instanceof er)
                                        return c;
                                return new er(!1)
                            }
                            o = f.call(e)
                        }
                        for (u = o.next; !(d = u.call(o)).done; ) {
                            try {
                                c = i(d.value)
                            } catch (e) {
                                throw Er(o),
                                e
                            }
                            if ("object" == typeof c && c && c instanceof er)
                                return c
                        }
                        return new er(!1)
                    }
                    var oi, ai, si, ci, ui = Te, di = f, li = ne, Zr = function(e, t) {
                        if (ui(e),
                        di(t) && t.constructor === e)
                            return t;
                        e = li.f(e);
                        return (0,
                        e.resolve)(t),
                        e.promise
                    }, hi = n, k = "object" == typeof window, ge = R, fi = n, et = E, Dr = Xe, Je = Ne.exports, z = ct, Ze = ht, ie = dt, pi = f, gi = mn, mi = Qe, Qe = qt, vi = b, yi = s.set, bi = Qr, _i = Zr, s = ne, wi = function(e) {
                        try {
                            return {
                                error: !1,
                                value: e()
                            }
                        } catch (e) {
                            return {
                                error: !0,
                                value: e
                            }
                        }
                    }, Qr = ft, ne = T, Ai = k, Ei = X, ki = O, xi = ce("species"), Si = "Promise", Di = Qr.get, Ti = Qr.set, Ri = Qr.getterFor(Si), X = Dr && Dr.prototype, Oi = Dr, Qr = X, Ci = fi.TypeError, Ii = fi.document, Pi = fi.process, Li = s.f, ji = Li, Bi = !!(Ii && Ii.createEvent && fi.dispatchEvent), Mi = "function" == typeof PromiseRejectionEvent, Ui = "unhandledrejection", Ni = !1, ne = ne(Si, function() {
                        var e = mi(Oi)
                          , t = e !== String(Oi);
                        if (!t && 66 === ki)
                            return !0;
                        if (51 <= ki && /native code/.test(e))
                            return !1;
                        var n = new Oi(function(e) {
                            e(1)
                        }
                        )
                          , e = function(e) {
                            e(function() {}, function() {})
                        };
                        return (n.constructor = {})[xi] = e,
                        !(Ni = n.then(function() {})instanceof e) || !t && Ai && !Mi
                    }), Qe = ne || !Qe(function(e) {
                        Oi.all(e).catch(function() {})
                    }), Gi = function(e) {
                        var t;
                        return !(!pi(e) || "function" != typeof (t = e.then)) && t
                    }, Fi = function(h, f) {
                        var p;
                        h.notified || (h.notified = !0,
                        p = h.reactions,
                        bi(function() {
                            for (var r, e = h.value, t = 1 == h.state, n = 0; p.length > n; ) {
                                var i, o, a, s = p[n++], c = t ? s.ok : s.fail, u = s.resolve, d = s.reject, l = s.domain;
                                try {
                                    c ? (t || (2 === h.rejection && function(t) {
                                        yi.call(fi, function() {
                                            var e = t.facade;
                                            Ei ? Pi.emit("rejectionHandled", e) : qi("rejectionhandled", e, t.value)
                                        })
                                    }(h),
                                    h.rejection = 1),
                                    !0 === c ? i = e : (l && l.enter(),
                                    i = c(e),
                                    l && (l.exit(),
                                    a = !0)),
                                    i === s.promise ? d(Ci("Promise-chain cycle")) : (o = Gi(i)) ? o.call(i, u, d) : u(i)) : d(e)
                                } catch (e) {
                                    l && !a && l.exit(),
                                    d(e)
                                }
                            }
                            h.reactions = [],
                            h.notified = !1,
                            f && !h.rejection && (r = h,
                            yi.call(fi, function() {
                                var e, t = r.facade, n = r.value;
                                if (zi(r) && (e = wi(function() {
                                    Ei ? Pi.emit("unhandledRejection", n, t) : qi(Ui, t, n)
                                }),
                                r.rejection = Ei || zi(r) ? 2 : 1,
                                e.error))
                                    throw e.value
                            }))
                        }))
                    }, qi = function(e, t, n) {
                        var r, i;
                        Bi ? ((r = Ii.createEvent("Event")).promise = t,
                        r.reason = n,
                        r.initEvent(e, !1, !0),
                        fi.dispatchEvent(r)) : r = {
                            promise: t,
                            reason: n
                        },
                        !Mi && (i = fi["on" + e]) ? i(r) : e === Ui && function(e, t) {
                            var n = hi.console;
                            n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t))
                        }("Unhandled promise rejection", n)
                    }, zi = function(e) {
                        return 1 !== e.rejection && !e.parent
                    }, Vi = function(t, n, r) {
                        return function(e) {
                            t(n, e, r)
                        }
                    }, Ki = function(e, t, n) {
                        e.done || (e.done = !0,
                        (e = n ? n : e).value = t,
                        e.state = 2,
                        Fi(e, !0))
                    }, Hi = function(n, e, t) {
                        if (!n.done) {
                            n.done = !0,
                            t && (n = t);
                            try {
                                if (n.facade === e)
                                    throw Ci("Promise can't be resolved itself");
                                var r = Gi(e);
                                r ? bi(function() {
                                    var t = {
                                        done: !1
                                    };
                                    try {
                                        r.call(e, Vi(Hi, t, n), Vi(Ki, t, n))
                                    } catch (e) {
                                        Ki(t, e, n)
                                    }
                                }) : (n.value = e,
                                n.state = 1,
                                Fi(n, !1))
                            } catch (e) {
                                Ki({
                                    done: !1
                                }, e, n)
                            }
                        }
                    };
                    if (ne && (Qr = (Oi = function(e) {
                        (function(e, t, n) {
                            if (!(e instanceof t))
                                throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation")
                        }
                        )(this, Oi, Si),
                        gi(e),
                        oi.call(this);
                        var t = Di(this);
                        try {
                            e(Vi(Hi, t), Vi(Ki, t))
                        } catch (e) {
                            Ki(t, e)
                        }
                    }
                    ).prototype,
                    (oi = function(e) {
                        Ti(this, {
                            type: Si,
                            done: !1,
                            notified: !1,
                            parent: !1,
                            reactions: [],
                            rejection: !1,
                            state: 0,
                            value: void 0
                        })
                    }
                    ).prototype = function(e, t, n) {
                        for (var r in t)
                            tr(e, r, t[r], n);
                        return e
                    }(Qr, {
                        then: function(e, t) {
                            var n = Ri(this)
                              , r = Li(vi(this, Oi));
                            return r.ok = "function" != typeof e || e,
                            r.fail = "function" == typeof t && t,
                            r.domain = Ei ? Pi.domain : void 0,
                            n.parent = !0,
                            n.reactions.push(r),
                            0 != n.state && Fi(n, !1),
                            r.promise
                        },
                        catch: function(e) {
                            return this.then(void 0, e)
                        }
                    }),
                    ai = function() {
                        var e = new oi
                          , t = Di(e);
                        this.promise = e,
                        this.resolve = Vi(Hi, t),
                        this.reject = Vi(Ki, t)
                    }
                    ,
                    s.f = Li = function(e) {
                        return e === Oi || e === si ? new ai : ji(e)
                    }
                    ,
                    "function" == typeof Dr && X !== Object.prototype)) {
                        ci = X.then,
                        Ni || (Je(X, "then", function(e, t) {
                            var n = this;
                            return new Oi(function(e, t) {
                                ci.call(n, e, t)
                            }
                            ).then(e, t)
                        }, {
                            unsafe: !0
                        }),
                        Je(X, "catch", Qr.catch, {
                            unsafe: !0
                        }));
                        try {
                            delete X.constructor
                        } catch (p) {}
                        z && z(X, Qr)
                    }
                    ge({
                        global: !0,
                        wrap: !0,
                        forced: ne
                    }, {
                        Promise: Oi
                    }),
                    Ze(Oi, Si, !1),
                    ie(Si),
                    si = et(Si),
                    ge({
                        target: Si,
                        stat: !0,
                        forced: ne
                    }, {
                        reject: function(e) {
                            var t = Li(this);
                            return t.reject.call(void 0, e),
                            t.promise
                        }
                    }),
                    ge({
                        target: Si,
                        stat: !0,
                        forced: ne
                    }, {
                        resolve: function(e) {
                            return _i(this, e)
                        }
                    }),
                    ge({
                        target: Si,
                        stat: !0,
                        forced: Qe
                    }, {
                        all: function(e) {
                            var s = this
                              , t = Li(s)
                              , c = t.resolve
                              , u = t.reject
                              , n = wi(function() {
                                var r = gi(s.resolve)
                                  , i = []
                                  , o = 0
                                  , a = 1;
                                ii(e, function(e) {
                                    var t = o++
                                      , n = !1;
                                    i.push(void 0),
                                    a++,
                                    r.call(s, e).then(function(e) {
                                        n || (n = !0,
                                        i[t] = e,
                                        --a || c(i))
                                    }, u)
                                }),
                                --a || c(i)
                            });
                            return n.error && u(n.value),
                            t.promise
                        },
                        race: function(e) {
                            var n = this
                              , r = Li(n)
                              , i = r.reject
                              , t = wi(function() {
                                var t = gi(n.resolve);
                                ii(e, function(e) {
                                    t.call(n, e).then(r.resolve, i)
                                })
                            });
                            return t.error && i(t.value),
                            r.promise
                        }
                    });
                    var Je = R
                      , Wi = Xe
                      , z = i
                      , $i = E
                      , Yi = b
                      , Qi = Zr
                      , X = Ne.exports;
                    Je({
                        target: "Promise",
                        proto: !0,
                        real: !0,
                        forced: !!Wi && z(function() {
                            Wi.prototype.finally.call({
                                then: function() {}
                            }, function() {})
                        })
                    }, {
                        finally: function(t) {
                            var n = Yi(this, $i("Promise"))
                              , e = "function" == typeof t;
                            return this.then(e ? function(e) {
                                return Qi(n, t()).then(function() {
                                    return e
                                })
                            }
                            : t, e ? function(e) {
                                return Qi(n, t()).then(function() {
                                    throw e
                                })
                            }
                            : t)
                        }
                    }),
                    "function" == typeof Wi && (bo = $i("Promise").prototype.finally,
                    Wi.prototype.finally !== bo && X(Wi.prototype, "finally", bo, {
                        unsafe: !0
                    }));
                    function Ji(e, t) {
                        return RegExp(e, t)
                    }
                    var Zi = B
                      , Qr = function(e) {
                        if (Zi(e))
                            throw TypeError("Cannot convert a Symbol value to a string");
                        return String(e)
                    }
                      , Xi = Te
                      , Ze = function() {
                        var e = Xi(this)
                          , t = "";
                        return e.global && (t += "g"),
                        e.ignoreCase && (t += "i"),
                        e.multiline && (t += "m"),
                        e.dotAll && (t += "s"),
                        e.unicode && (t += "u"),
                        e.sticky && (t += "y"),
                        t
                    }
                      , ie = {}
                      , et = i;
                    ie.UNSUPPORTED_Y = et(function() {
                        var e = Ji("a", "y");
                        return e.lastIndex = 2,
                        null != e.exec("abcd")
                    }),
                    ie.BROKEN_CARET = et(function() {
                        var e = Ji("^r", "gy");
                        return e.lastIndex = 2,
                        null != e.exec("str")
                    });
                    function eo() {}
                    function to(e) {
                        e.write(fo("")),
                        e.close();
                        var t = e.parentWindow.Object;
                        return e = null,
                        t
                    }
                    var no, ro = Re, io = Te, oo = x, ne = o ? Object.defineProperties : function(e, t) {
                        io(e);
                        for (var n, r = oo(t), i = r.length, o = 0; o < i; )
                            ro.f(e, n = r[o++], t[n]);
                        return e
                    }
                    , ao = Te, so = ne, co = e, ge = it, uo = q, lo = ye, ho = rt("IE_PROTO"), fo = function(e) {
                        return "<script>" + e + "<\/script>"
                    }, po = function() {
                        try {
                            no = new ActiveXObject("htmlfile")
                        } catch (e) {}
                        po = (!document.domain || !no) && function() {
                            var e = lo("iframe");
                            if (e.style)
                                return e.style.display = "none",
                                uo.appendChild(e),
                                e.src = String("javascript:"),
                                (e = e.contentWindow.document).open(),
                                e.write(fo("document.F=Object")),
                                e.close(),
                                e.F
                        }() || to(no);
                        for (var e = co.length; e--; )
                            delete po.prototype[co[e]];
                        return po()
                    };
                    ge[ho] = !0;
                    var Qe = Object.create || function(e, t) {
                        var n;
                        return null !== e ? (eo.prototype = ao(e),
                        n = new eo,
                        eo.prototype = null,
                        n[ho] = e) : n = po(),
                        void 0 === t ? n : so(n, t)
                    }
                      , Xe = i(function() {
                        var e = RegExp(".", "string".charAt(0));
                        return !e.dotAll || !e.exec("\n") || "s" !== e.flags
                    })
                      , Zr = i(function() {
                        var e = RegExp("(?<a>b)", "string".charAt(5));
                        return "b" !== e.exec("b").groups.a || "bc" !== "b".replace(e, "$<a>c")
                    })
                      , go = Qr
                      , mo = Ze
                      , Je = ie
                      , z = U.exports
                      , vo = Qe
                      , yo = ft.get
                      , X = Xe
                      , bo = Zr
                      , _o = RegExp.prototype.exec
                      , wo = z("native-string-replace", String.prototype.replace)
                      , Ao = _o
                      , Eo = (et = /a/,
                    ne = /b*/g,
                    _o.call(et, "a"),
                    _o.call(ne, "a"),
                    0 !== et.lastIndex || 0 !== ne.lastIndex)
                      , ko = Je.UNSUPPORTED_Y || Je.BROKEN_CARET
                      , xo = void 0 !== /()??/.exec("")[1]
                      , e = Ao = Eo || xo || ko || X || bo ? function(e) {
                        var t, n, r, i, o, a, s = this, c = yo(s), u = go(e), d = c.raw;
                        if (d)
                            return d.lastIndex = s.lastIndex,
                            f = Ao.call(d, u),
                            s.lastIndex = d.lastIndex,
                            f;
                        var l = c.groups
                          , h = ko && s.sticky
                          , e = mo.call(s)
                          , d = s.source
                          , f = 0
                          , c = u;
                        if (h && (-1 === (e = e.replace("y", "")).indexOf("g") && (e += "g"),
                        c = u.slice(s.lastIndex),
                        0 < s.lastIndex && (!s.multiline || s.multiline && "\n" !== u.charAt(s.lastIndex - 1)) && (d = "(?: " + d + ")",
                        c = " " + c,
                        f++),
                        t = new RegExp("^(?:" + d + ")",e)),
                        xo && (t = new RegExp("^" + d + "$(?!\\s)",e)),
                        Eo && (n = s.lastIndex),
                        r = _o.call(h ? t : s, c),
                        h ? r ? (r.input = r.input.slice(f),
                        r[0] = r[0].slice(f),
                        r.index = s.lastIndex,
                        s.lastIndex += r[0].length) : s.lastIndex = 0 : Eo && r && (s.lastIndex = s.global ? r.index + r[0].length : n),
                        xo && r && 1 < r.length && wo.call(r[0], t, function() {
                            for (i = 1; i < arguments.length - 2; i++)
                                void 0 === arguments[i] && (r[i] = void 0)
                        }),
                        r && l)
                            for (r.groups = o = vo(null),
                            i = 0; i < l.length; i++)
                                o[(a = l[i])[0]] = r[a[1]];
                        return r
                    }
                    : Ao;
                    R({
                        target: "RegExp",
                        proto: !0,
                        forced: /./.exec !== e
                    }, {
                        exec: e
                    });
                    var So = Ne.exports
                      , Do = e
                      , To = i
                      , Ro = ce
                      , Oo = Ue
                      , Co = Ro("species")
                      , Io = RegExp.prototype
                      , q = function(n, e, t, r) {
                        var a, i = Ro(n), s = !To(function() {
                            var e = {};
                            return e[i] = function() {
                                return 7
                            }
                            ,
                            7 != ""[n](e)
                        }), o = s && !To(function() {
                            var e = !1
                              , t = /a/;
                            return "split" === n && ((t = {}).constructor = {},
                            t.constructor[Co] = function() {
                                return t
                            }
                            ,
                            t.flags = "",
                            t[i] = /./[i]),
                            t.exec = function() {
                                return e = !0,
                                null
                            }
                            ,
                            t[i](""),
                            !e
                        });
                        s && o && !t || (a = /./[i],
                        e = e(i, ""[n], function(e, t, n, r, i) {
                            var o = t.exec;
                            return o === Do || o === Io.exec ? s && !i ? {
                                done: !0,
                                value: a.call(t, n, r)
                            } : {
                                done: !0,
                                value: e.call(n, t, r)
                            } : {
                                done: !1
                            }
                        }),
                        So(String.prototype, n, e[0]),
                        So(Io, i, e[1])),
                        r && Oo(Io[i], "sham", !0)
                    }
                      , ye = Object.is || function(e, t) {
                        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
                    }
                      , Po = m
                      , Lo = e
                      , ge = function(e, t) {
                        var n = e.exec;
                        if ("function" == typeof n) {
                            n = n.call(e, t);
                            if ("object" != typeof n)
                                throw TypeError("RegExp exec method returned something other than an Object or null");
                            return n
                        }
                        if ("RegExp" !== Po(e))
                            throw TypeError("RegExp#exec called on incompatible receiver");
                        return Lo.call(e, t)
                    }
                      , jo = Te
                      , Bo = l
                      , Mo = ye
                      , Uo = Qr
                      , No = ge;
                    q("search", function(r, i, o) {
                        return [function(e) {
                            var t = Bo(this)
                              , n = null == e ? void 0 : e[r];
                            return void 0 !== n ? n.call(e, t) : new RegExp(e)[r](Uo(t))
                        }
                        , function(e) {
                            var t = jo(this)
                              , n = Uo(e)
                              , e = o(i, t, n);
                            if (e.done)
                                return e.value;
                            e = t.lastIndex;
                            Mo(e, 0) || (t.lastIndex = 0);
                            n = No(t, n);
                            return Mo(t.lastIndex, e) || (t.lastIndex = e),
                            null === n ? -1 : n.index
                        }
                        ]
                    });
                    var Go, Fo = l, qo = Qr, z = "[\t\n\v\f\r Â áš€â€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029\ufeff]", zo = RegExp("^" + z + z + "*"), Vo = RegExp(z + z + "*$"), et = function(t) {
                        return function(e) {
                            e = qo(Fo(e));
                            return 1 & t && (e = e.replace(zo, "")),
                            e = 2 & t ? e.replace(Vo, "") : e
                        }
                    }, ne = {
                        start: et(1),
                        end: et(2),
                        trim: et(3)
                    }, Je = i, Ko = "\t\n\v\f\r Â áš€â€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029\ufeff", Ho = ne.trim;
                    R({
                        target: "String",
                        proto: !0,
                        forced: (Go = "trim",
                        Je(function() {
                            return !!Ko[Go]() || "â€‹Â…á Ž" != "â€‹Â…á Ž"[Go]() || Ko[Go].name !== Go
                        }))
                    }, {
                        trim: function() {
                            return Ho(this)
                        }
                    });
                    var Wo, $o, X = {
                        CSSRuleList: 0,
                        CSSStyleDeclaration: 0,
                        CSSValueList: 0,
                        ClientRectList: 0,
                        DOMRectList: 0,
                        DOMStringList: 0,
                        DOMTokenList: 1,
                        DataTransferItemList: 0,
                        FileList: 0,
                        HTMLAllCollection: 0,
                        HTMLCollection: 0,
                        HTMLFormElement: 0,
                        HTMLSelectElement: 0,
                        MediaList: 0,
                        MimeTypeArray: 0,
                        NamedNodeMap: 0,
                        NodeList: 1,
                        PaintRequestList: 0,
                        Plugin: 0,
                        PluginArray: 0,
                        SVGLengthList: 0,
                        SVGNumberList: 0,
                        SVGPathSegList: 0,
                        SVGPointList: 0,
                        SVGStringList: 0,
                        SVGTransformList: 0,
                        SourceBufferList: 0,
                        StyleSheetList: 0,
                        TextTrackCueList: 0,
                        TextTrackList: 0,
                        TouchList: 0
                    }, bo = i, Yo = L.forEach, Qo = n, ye = X, Jo = (Wo = [].forEach) && bo(function() {
                        Wo.call(null, function() {
                            throw 1
                        }, 1)
                    }) ? [].forEach : function(e) {
                        return Yo(this, e, 1 < arguments.length ? arguments[1] : void 0)
                    }
                    , Zo = Ue;
                    for ($o in ye) {
                        var Xo = Qo[$o]
                          , Xo = Xo && Xo.prototype;
                        if (Xo && Xo.forEach !== Jo)
                            try {
                                Zo(Xo, "forEach", Jo)
                            } catch (p) {
                                Xo.forEach = Jo
                            }
                    }
                    var ea = f
                      , ta = ct
                      , na = f
                      , ra = m
                      , ia = ce("match")
                      , z = function(e) {
                        var t;
                        return na(e) && (void 0 !== (t = e[ia]) ? !!t : "RegExp" == ra(e))
                    }
                      , et = o
                      , ne = n
                      , Je = T
                      , oa = function(e, t, n) {
                        var r, i;
                        return ta && "function" == typeof (r = t.constructor) && r !== n && ea(i = r.prototype) && i !== n.prototype && ta(e, i),
                        e
                    }
                      , aa = Ue
                      , sa = Re.f
                      , bo = Et.f
                      , ca = z
                      , ua = Qr
                      , da = Ze
                      , ye = ie
                      , m = Ne.exports
                      , T = i
                      , la = Y
                      , ha = ft.enforce
                      , dt = dt
                      , fa = Xe
                      , pa = Zr
                      , ga = ce("match")
                      , ma = ne.RegExp
                      , va = ma.prototype
                      , ya = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/
                      , ba = /a/g
                      , _a = /a/g
                      , Zr = new ma(ba) !== ba
                      , wa = ye.UNSUPPORTED_Y;
                    if (Je("RegExp", et && (!Zr || wa || fa || pa || T(function() {
                        return _a[ga] = !1,
                        ma(ba) != ba || ma(_a) == _a || "/a/i" != ma(ba, "i")
                    })))) {
                        for (var Aa = function(e, t) {
                            var n, r, i = this instanceof Aa, o = ca(e), a = void 0 === t, s = [], c = e;
                            if (!i && o && a && e.constructor === Aa)
                                return e;
                            if ((o || e instanceof Aa) && (e = e.source,
                            a && (t = "flags"in c ? c.flags : da.call(c))),
                            e = void 0 === e ? "" : ua(e),
                            t = void 0 === t ? "" : ua(t),
                            c = e,
                            o = t = fa && "dotAll"in ba && (n = !!t && -1 < t.indexOf("s")) ? t.replace(/s/g, "") : t,
                            wa && "sticky"in ba && (r = !!t && -1 < t.indexOf("y")) && (t = t.replace(/y/g, "")),
                            pa && (e = (a = function(e) {
                                for (var t, n = e.length, r = 0, i = "", o = [], a = {}, s = !1, c = !1, u = 0, d = ""; r <= n; r++) {
                                    if ("\\" === (t = e.charAt(r)))
                                        t += e.charAt(++r);
                                    else if ("]" === t)
                                        s = !1;
                                    else if (!s)
                                        switch (!0) {
                                        case "[" === t:
                                            s = !0;
                                            break;
                                        case "(" === t:
                                            ya.test(e.slice(r + 1)) && (r += 2,
                                            c = !0),
                                            i += t,
                                            u++;
                                            continue;
                                        case ">" === t && c:
                                            if ("" === d || la(a, d))
                                                throw new SyntaxError("Invalid capture group name");
                                            a[d] = !0,
                                            o.push([d, u]),
                                            c = !1,
                                            d = "";
                                            continue
                                        }
                                    c ? d += t : i += t
                                }
                                return [i, o]
                            }(e))[0],
                            s = a[1]),
                            t = oa(ma(e, t), i ? this : va, Aa),
                            (n || r || s.length) && (i = ha(t),
                            n && (i.dotAll = !0,
                            i.raw = Aa(function(e) {
                                for (var t, n = e.length, r = 0, i = "", o = !1; r <= n; r++)
                                    "\\" !== (t = e.charAt(r)) ? o || "." !== t ? ("[" === t ? o = !0 : "]" === t && (o = !1),
                                    i += t) : i += "[\\s\\S]" : i += t + e.charAt(++r);
                                return i
                            }(e), o)),
                            r && (i.sticky = !0),
                            s.length && (i.groups = s)),
                            e !== c)
                                try {
                                    aa(t, "source", "" === c ? "(?:)" : c)
                                } catch (e) {}
                            return t
                        }, Ea = bo(ma), ka = 0; Ea.length > ka; )
                            !function(t) {
                                t in Aa || sa(Aa, t, {
                                    configurable: !0,
                                    get: function() {
                                        return ma[t]
                                    },
                                    set: function(e) {
                                        ma[t] = e
                                    }
                                })
                            }(Ea[ka++]);
                        (va.constructor = Aa).prototype = va,
                        m(ne, "RegExp", Aa)
                    }
                    dt("RegExp");
                    var T = Ne.exports
                      , xa = Te
                      , Sa = Qr
                      , bo = i
                      , Da = Ze
                      , m = "toString"
                      , Ta = RegExp.prototype
                      , Ra = Ta.toString
                      , ne = bo(function() {
                        return "/a/b" != Ra.call({
                            source: "a",
                            flags: "b"
                        })
                    })
                      , dt = Ra.name != m;
                    (ne || dt) && T(RegExp.prototype, m, function() {
                        var e = xa(this)
                          , t = Sa(e.source)
                          , n = e.flags;
                        return "/" + t + "/" + Sa(void 0 === n && e instanceof RegExp && !("flags"in Ta) ? Da.call(e) : n)
                    }, {
                        unsafe: !0
                    });
                    var Ze = R
                      , bo = i
                      , Oa = I
                      , Ca = f
                      , Ia = H
                      , Pa = At
                      , La = _e
                      , ja = F
                      , ne = ee
                      , dt = O
                      , Ba = ce("isConcatSpreadable")
                      , Ma = 9007199254740991
                      , Ua = "Maximum allowed index exceeded"
                      , T = 51 <= dt || !bo(function() {
                        var e = [];
                        return e[Ba] = !1,
                        e.concat()[0] !== e
                    })
                      , m = ne("concat");
                    Ze({
                        target: "Array",
                        proto: !0,
                        forced: !T || !m
                    }, {
                        concat: function(e) {
                            for (var t, n, r, i = Ia(this), o = ja(i, 0), a = 0, s = -1, c = arguments.length; s < c; s++)
                                if (function(e) {
                                    if (!Ca(e))
                                        return !1;
                                    var t = e[Ba];
                                    return void 0 !== t ? !!t : Oa(e)
                                }(r = -1 === s ? i : arguments[s])) {
                                    if (a + (n = Pa(r.length)) > Ma)
                                        throw TypeError(Ua);
                                    for (t = 0; t < n; t++,
                                    a++)
                                        t in r && La(o, a, r[t])
                                } else {
                                    if (Ma <= a)
                                        throw TypeError(Ua);
                                    La(o, a++, r)
                                }
                            return o.length = a,
                            o
                        }
                    });
                    var Na = z
                      , F = function(e) {
                        if (Na(e))
                            throw TypeError("The method doesn't accept regular expressions");
                        return e
                    }
                      , Ga = ce("match")
                      , O = function(t) {
                        var n = /./;
                        try {
                            "/./"[t](n)
                        } catch (e) {
                            try {
                                return n[Ga] = !1,
                                "/./"[t](n)
                            } catch (t) {}
                        }
                        return !1
                    }
                      , dt = R
                      , bo = r.f
                      , Fa = At
                      , qa = Qr
                      , za = F
                      , Va = l
                      , ne = O
                      , Ka = "".startsWith
                      , Ha = Math.min
                      , Ze = ne("startsWith");
                    dt({
                        target: "String",
                        proto: !0,
                        forced: !(!Ze && ((is = bo(String.prototype, "startsWith")) && !is.writable) || Ze)
                    }, {
                        startsWith: function(e) {
                            var t = qa(Va(this));
                            za(e);
                            var n = Fa(Ha(1 < arguments.length ? arguments[1] : void 0, t.length))
                              , e = qa(e);
                            return Ka ? Ka.call(t, e, n) : t.slice(n, n + e.length) === e
                        }
                    });
                    var T = Re.f
                      , m = Function.prototype
                      , Wa = m.toString
                      , $a = /^\s*function ([^ (]*)/;
                    !o || "name"in m || T(m, "name", {
                        configurable: !0,
                        get: function() {
                            try {
                                return Wa.call(this).match($a)[1]
                            } catch (e) {
                                return ""
                            }
                        }
                    });
                    var Ya = St
                      , Qa = Qr
                      , Ja = l
                      , ne = function(o) {
                        return function(e, t) {
                            var n, r = Qa(Ja(e)), i = Ya(t), e = r.length;
                            return i < 0 || e <= i ? o ? "" : void 0 : (t = r.charCodeAt(i)) < 55296 || 56319 < t || i + 1 === e || (n = r.charCodeAt(i + 1)) < 56320 || 57343 < n ? o ? r.charAt(i) : t : o ? r.slice(i, i + 2) : n - 56320 + (t - 55296 << 10) + 65536
                        }
                    }
                      , dt = {
                        codeAt: ne(!1),
                        charAt: ne(!0)
                    }
                      , Za = dt.charAt
                      , bo = function(e, t, n) {
                        return t + (n ? Za(e, t).length : 1)
                    }
                      , Xa = H
                      , es = Math.floor
                      , ts = "".replace
                      , ns = /\$([$&'`]|\d{1,2}|<[^>]*>)/g
                      , rs = /\$([$&'`]|\d{1,2})/g
                      , is = q
                      , Ze = i
                      , os = Te
                      , as = St
                      , ss = At
                      , cs = Qr
                      , us = l
                      , ds = bo
                      , ls = ge
                      , hs = ce("replace")
                      , fs = Math.max
                      , ps = Math.min
                      , T = "$0" === "a".replace(/./, "$0")
                      , gs = !!/./[hs] && "" === /./[hs]("a", "$0");
                    is("replace", function(e, b, _) {
                        var w = gs ? "$" : "$0";
                        return [function(e, t) {
                            var n = us(this)
                              , r = null == e ? void 0 : e[hs];
                            return void 0 !== r ? r.call(e, n, t) : b.call(cs(n), e, t)
                        }
                        , function(e, t) {
                            var n = os(this)
                              , r = cs(e);
                            if ("string" == typeof t && -1 === t.indexOf(w) && -1 === t.indexOf("$<")) {
                                e = _(b, n, r, t);
                                if (e.done)
                                    return e.value
                            }
                            var i = "function" == typeof t;
                            i || (t = cs(t));
                            var o, a = n.global;
                            a && (o = n.unicode,
                            n.lastIndex = 0);
                            for (var s = []; ; ) {
                                var c = ls(n, r);
                                if (null === c)
                                    break;
                                if (s.push(c),
                                !a)
                                    break;
                                "" === cs(c[0]) && (n.lastIndex = ds(r, ss(n.lastIndex), o))
                            }
                            for (var u, d = "", l = 0, h = 0; h < s.length; h++) {
                                for (var c = s[h], f = cs(c[0]), p = fs(ps(as(c.index), r.length), 0), g = [], m = 1; m < c.length; m++)
                                    g.push(void 0 === (u = c[m]) ? u : String(u));
                                var v, y = c.groups, y = i ? (v = [f].concat(g, p, r),
                                void 0 !== y && v.push(y),
                                cs(t.apply(void 0, v))) : function(o, a, s, c, u, e) {
                                    var d = s + o.length
                                      , l = c.length
                                      , t = rs;
                                    return void 0 !== u && (u = Xa(u),
                                    t = ns),
                                    ts.call(e, t, function(e, t) {
                                        var n;
                                        switch (t.charAt(0)) {
                                        case "$":
                                            return "$";
                                        case "&":
                                            return o;
                                        case "`":
                                            return a.slice(0, s);
                                        case "'":
                                            return a.slice(d);
                                        case "<":
                                            n = u[t.slice(1, -1)];
                                            break;
                                        default:
                                            var r = +t;
                                            if (0 == r)
                                                return e;
                                            if (l < r) {
                                                var i = es(r / 10);
                                                return 0 !== i && i <= l ? void 0 === c[i - 1] ? t.charAt(1) : c[i - 1] + t.charAt(1) : e
                                            }
                                            n = c[r - 1]
                                        }
                                        return void 0 === n ? "" : n
                                    })
                                }(f, r, p, g, y, t);
                                l <= p && (d += r.slice(l, p) + y,
                                l = p + f.length)
                            }
                            return d + r.slice(l)
                        }
                        ]
                    }, !!Ze(function() {
                        var e = /./;
                        return e.exec = function() {
                            var e = [];
                            return e.groups = {
                                a: "7"
                            },
                            e
                        }
                        ,
                        "7" !== "".replace(e, "$<a>")
                    }) || !T || gs);
                    var m = {}
                      , ms = h
                      , vs = Et.f
                      , ys = {}.toString
                      , bs = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
                    m.f = function(e) {
                        return bs && "[object Window]" == ys.call(e) ? function(e) {
                            try {
                                return vs(e)
                            } catch (e) {
                                return bs.slice()
                            }
                        }(e) : vs(ms(e))
                    }
                    ;
                    ne = {};
                    ne.f = ce;
                    function _s(e, t) {
                        var n = oc[e] = Gs(Xs.prototype);
                        return Qs(n, {
                            type: Ys,
                            tag: e,
                            description: t
                        }),
                        Rs || (n.description = t),
                        n
                    }
                    function ws(e, t, n) {
                        return e === Zs && ws(ac, t, n),
                        Ls(e),
                        t = Ms(t),
                        Ls(n),
                        Os(oc, t) ? (n.enumerable ? (Os(e, $s) && e[$s][t] && (e[$s][t] = !1),
                        n = Gs(n, {
                            enumerable: Ns(0, !1)
                        })) : (Os(e, $s) || nc(e, $s, Ns(1, {})),
                        e[$s][t] = !0),
                        dc(e, t, n)) : nc(e, t, n)
                    }
                    function As(t, e) {
                        Ls(t);
                        var n = Bs(e)
                          , e = Fs(n).concat(ks(n));
                        return Ws(e, function(e) {
                            Rs && !Es.call(n, e) || ws(t, e, n[e])
                        }),
                        t
                    }
                    function Es(e) {
                        var t = Ms(e)
                          , e = ic.call(this, t);
                        return !(this === Zs && Os(oc, t) && !Os(ac, t)) && (!(e || !Os(this, t) || !Os(oc, t) || Os(this, $s) && this[$s][t]) || e)
                    }
                    function ks(e) {
                        var t = e === Zs
                          , e = rc(t ? ac : Bs(e))
                          , n = [];
                        return Ws(e, function(e) {
                            !Os(oc, e) || t && !Os(Zs, e) || n.push(oc[e])
                        }),
                        n
                    }
                    var xs = n
                      , Ss = Y
                      , Ds = ne
                      , Ts = Re.f
                      , St = function(e) {
                        var t = xs.Symbol || (xs.Symbol = {});
                        Ss(t, e) || Ts(t, e, {
                            value: Ds.f(e)
                        })
                    }
                      , is = R
                      , Ze = n
                      , T = E
                      , Rs = o
                      , E = P
                      , P = i
                      , Os = Y
                      , Cs = I
                      , Is = f
                      , Ps = B
                      , Ls = Te
                      , js = H
                      , Bs = h
                      , Ms = pe
                      , Us = Qr
                      , Ns = d
                      , Gs = Qe
                      , Fs = x
                      , B = Et
                      , pe = m
                      , qs = u
                      , x = r
                      , Et = Re
                      , m = a
                      , u = Ue
                      , r = Ne.exports
                      , a = U.exports
                      , zs = it
                      , Vs = Z
                      , Ks = ce
                      , U = ne
                      , Hs = St
                      , it = ht
                      , Z = ft
                      , Ws = L.forEach
                      , $s = rt("hidden")
                      , Ys = "Symbol"
                      , ne = Ks("toPrimitive")
                      , Qs = Z.set
                      , Js = Z.getterFor(Ys)
                      , Zs = Object.prototype
                      , Xs = Ze.Symbol
                      , ec = T("JSON", "stringify")
                      , tc = x.f
                      , nc = Et.f
                      , rc = pe.f
                      , ic = m.f
                      , oc = a("symbols")
                      , ac = a("op-symbols")
                      , sc = a("string-to-symbol-registry")
                      , cc = a("symbol-to-string-registry")
                      , T = a("wks")
                      , a = Ze.QObject
                      , uc = !a || !a.prototype || !a.prototype.findChild
                      , dc = Rs && P(function() {
                        return 7 != Gs(nc({}, "a", {
                            get: function() {
                                return nc(this, "a", {
                                    value: 7
                                }).a
                            }
                        })).a
                    }) ? function(e, t, n) {
                        var r = tc(Zs, t);
                        r && delete Zs[t],
                        nc(e, t, n),
                        r && e !== Zs && nc(Zs, t, r)
                    }
                    : nc
                      , Ze = function(e, t) {
                        var n = Bs(e)
                          , e = Ms(t);
                        if (n !== Zs || !Os(oc, e) || Os(ac, e)) {
                            t = tc(n, e);
                            return !t || !Os(oc, e) || Os(n, $s) && n[$s][e] || (t.enumerable = !0),
                            t
                        }
                    }
                      , a = function(e) {
                        var e = rc(Bs(e))
                          , t = [];
                        return Ws(e, function(e) {
                            Os(oc, e) || Os(zs, e) || t.push(e)
                        }),
                        t
                    };
                    E || (r((Xs = function() {
                        if (this instanceof Xs)
                            throw TypeError("Symbol is not a constructor");
                        var e = arguments.length && void 0 !== arguments[0] ? Us(arguments[0]) : void 0
                          , t = Vs(e)
                          , n = function(e) {
                            this === Zs && n.call(ac, e),
                            Os(this, $s) && Os(this[$s], t) && (this[$s][t] = !1),
                            dc(this, t, Ns(1, e))
                        };
                        return Rs && uc && dc(Zs, t, {
                            configurable: !0,
                            set: n
                        }),
                        _s(t, e)
                    }
                    ).prototype, "toString", function() {
                        return Js(this).tag
                    }),
                    r(Xs, "withoutSetter", function(e) {
                        return _s(Vs(e), e)
                    }),
                    m.f = Es,
                    Et.f = ws,
                    x.f = Ze,
                    B.f = pe.f = a,
                    qs.f = ks,
                    U.f = function(e) {
                        return _s(Ks(e), e)
                    }
                    ,
                    Rs && (nc(Xs.prototype, "description", {
                        configurable: !0,
                        get: function() {
                            return Js(this).description
                        }
                    }),
                    r(Zs, "propertyIsEnumerable", Es, {
                        unsafe: !0
                    }))),
                    is({
                        global: !0,
                        wrap: !0,
                        forced: !E,
                        sham: !E
                    }, {
                        Symbol: Xs
                    }),
                    Ws(Fs(T), function(e) {
                        Hs(e)
                    }),
                    is({
                        target: Ys,
                        stat: !0,
                        forced: !E
                    }, {
                        for: function(e) {
                            var t = Us(e);
                            if (Os(sc, t))
                                return sc[t];
                            e = Xs(t);
                            return sc[t] = e,
                            cc[e] = t,
                            e
                        },
                        keyFor: function(e) {
                            if (!Ps(e))
                                throw TypeError(e + " is not a symbol");
                            if (Os(cc, e))
                                return cc[e]
                        },
                        useSetter: function() {
                            uc = !0
                        },
                        useSimple: function() {
                            uc = !1
                        }
                    }),
                    is({
                        target: "Object",
                        stat: !0,
                        forced: !E,
                        sham: !Rs
                    }, {
                        create: function(e, t) {
                            return void 0 === t ? Gs(e) : As(Gs(e), t)
                        },
                        defineProperty: ws,
                        defineProperties: As,
                        getOwnPropertyDescriptor: Ze
                    }),
                    is({
                        target: "Object",
                        stat: !0,
                        forced: !E
                    }, {
                        getOwnPropertyNames: a,
                        getOwnPropertySymbols: ks
                    }),
                    is({
                        target: "Object",
                        stat: !0,
                        forced: P(function() {
                            qs.f(1)
                        })
                    }, {
                        getOwnPropertySymbols: function(e) {
                            return qs.f(js(e))
                        }
                    }),
                    ec && is({
                        target: "JSON",
                        stat: !0,
                        forced: !E || P(function() {
                            var e = Xs();
                            return "[null]" != ec([e]) || "{}" != ec({
                                a: e
                            }) || "{}" != ec(Object(e))
                        })
                    }, {
                        stringify: function(e, t, n) {
                            for (var r, i = [e], o = 1; o < arguments.length; )
                                i.push(arguments[o++]);
                            if ((Is(r = t) || void 0 !== e) && !Ps(e))
                                return Cs(t) || (t = function(e, t) {
                                    if ("function" == typeof r && (t = r.call(this, e, t)),
                                    !Ps(t))
                                        return t
                                }
                                ),
                                i[1] = t,
                                ec.apply(null, i)
                        }
                    }),
                    Xs.prototype[ne] || u(Xs.prototype, ne, Xs.prototype.valueOf),
                    it(Xs, Ys),
                    zs[$s] = !0;
                    var lc, hc, fc, pc, gc, ne = R, mc = Y, vc = f, it = Re.f, S = S, yc = n.Symbol;
                    !o || "function" != typeof yc || "description"in yc.prototype && void 0 === yc().description || (lc = {},
                    S(hc = function() {
                        var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0])
                          , t = this instanceof hc ? new yc(e) : void 0 === e ? yc() : yc(e);
                        return "" === e && (lc[t] = !0),
                        t
                    }
                    , yc),
                    (S = hc.prototype = yc.prototype).constructor = hc,
                    fc = S.toString,
                    pc = "Symbol(test)" == String(yc("test")),
                    gc = /^Symbol\((.*)\)[^)]+$/,
                    it(S, "description", {
                        configurable: !0,
                        get: function() {
                            var e = vc(this) ? this.valueOf() : this
                              , t = fc.call(e);
                            if (mc(lc, e))
                                return "";
                            t = pc ? t.slice(7, -1) : t.replace(gc, "$1");
                            return "" === t ? void 0 : t
                        }
                    }),
                    ne({
                        global: !0,
                        forced: !0
                    }, {
                        Symbol: hc
                    }));
                    var ne = Qe
                      , Re = Re
                      , bc = ce("unscopables")
                      , _c = Array.prototype;
                    null == _c[bc] && Re.f(_c, bc, {
                        configurable: !0,
                        value: ne(null)
                    });
                    var ne = function(e) {
                        _c[bc][e] = !0
                    }
                      , wc = Mt.includes
                      , Mt = ne;
                    R({
                        target: "Array",
                        proto: !0
                    }, {
                        includes: function(e) {
                            return wc(this, e, 1 < arguments.length ? arguments[1] : void 0)
                        }
                    }),
                    Mt("includes");
                    var Ac = F
                      , Ec = l
                      , kc = Qr;
                    R({
                        target: "String",
                        proto: !0,
                        forced: !O("includes")
                    }, {
                        includes: function(e) {
                            return !!~kc(Ec(this)).indexOf(kc(Ac(e)), 1 < arguments.length ? arguments[1] : void 0)
                        }
                    });
                    var O = R
                      , xc = L.find
                      , L = ne
                      , Sc = !0;
                    "find"in [] && Array(1).find(function() {
                        Sc = !1
                    }),
                    O({
                        target: "Array",
                        proto: !0,
                        forced: Sc
                    }, {
                        find: function(e) {
                            return xc(this, e, 1 < arguments.length ? arguments[1] : void 0)
                        }
                    }),
                    L("find");
                    var Dc, Tc, Rc = "undefined" != typeof globalThis && globalThis || "undefined" != typeof self && self || void 0 !== Rc && Rc, Oc = "URLSearchParams"in Rc, Cc = "Symbol"in Rc && "iterator"in Symbol, Ic = "FileReader"in Rc && "Blob"in Rc && function() {
                        try {
                            return new Blob,
                            !0
                        } catch (e) {
                            return !1
                        }
                    }(), Pc = "FormData"in Rc, Lc = "ArrayBuffer"in Rc;
                    function jc(e) {
                        if ("string" != typeof e && (e = String(e)),
                        /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || "" === e)
                            throw new TypeError('Invalid character in header field name: "' + e + '"');
                        return e.toLowerCase()
                    }
                    function Bc(e) {
                        return e = "string" != typeof e ? String(e) : e
                    }
                    function Mc(t) {
                        var e = {
                            next: function() {
                                var e = t.shift();
                                return {
                                    done: void 0 === e,
                                    value: e
                                }
                            }
                        };
                        return Cc && (e[Symbol.iterator] = function() {
                            return e
                        }
                        ),
                        e
                    }
                    function Uc(t) {
                        this.map = {},
                        t instanceof Uc ? t.forEach(function(e, t) {
                            this.append(t, e)
                        }, this) : Array.isArray(t) ? t.forEach(function(e) {
                            this.append(e[0], e[1])
                        }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                            this.append(e, t[e])
                        }, this)
                    }
                    function Nc(e) {
                        if (e.bodyUsed)
                            return Promise.reject(new TypeError("Already read"));
                        e.bodyUsed = !0
                    }
                    function Gc(n) {
                        return new Promise(function(e, t) {
                            n.onload = function() {
                                e(n.result)
                            }
                            ,
                            n.onerror = function() {
                                t(n.error)
                            }
                        }
                        )
                    }
                    function Fc(e) {
                        var t = new FileReader
                          , n = Gc(t);
                        return t.readAsArrayBuffer(e),
                        n
                    }
                    function qc(e) {
                        if (e.slice)
                            return e.slice(0);
                        var t = new Uint8Array(e.byteLength);
                        return t.set(new Uint8Array(e)),
                        t.buffer
                    }
                    function zc() {
                        return this.bodyUsed = !1,
                        this._initBody = function(e) {
                            var t;
                            this.bodyUsed = this.bodyUsed,
                            (this._bodyInit = e) ? "string" == typeof e ? this._bodyText = e : Ic && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : Pc && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : Oc && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : Lc && Ic && (t = e) && DataView.prototype.isPrototypeOf(t) ? (this._bodyArrayBuffer = qc(e.buffer),
                            this._bodyInit = new Blob([this._bodyArrayBuffer])) : Lc && (ArrayBuffer.prototype.isPrototypeOf(e) || Tc(e)) ? this._bodyArrayBuffer = qc(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "",
                            this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : Oc && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                        }
                        ,
                        Ic && (this.blob = function() {
                            var e = Nc(this);
                            if (e)
                                return e;
                            if (this._bodyBlob)
                                return Promise.resolve(this._bodyBlob);
                            if (this._bodyArrayBuffer)
                                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                            if (this._bodyFormData)
                                throw new Error("could not read FormData body as blob");
                            return Promise.resolve(new Blob([this._bodyText]))
                        }
                        ,
                        this.arrayBuffer = function() {
                            return this._bodyArrayBuffer ? Nc(this) || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer)) : this.blob().then(Fc)
                        }
                        ),
                        this.text = function() {
                            var e, t, n = Nc(this);
                            if (n)
                                return n;
                            if (this._bodyBlob)
                                return e = this._bodyBlob,
                                t = new FileReader,
                                n = Gc(t),
                                t.readAsText(e),
                                n;
                            if (this._bodyArrayBuffer)
                                return Promise.resolve(function(e) {
                                    for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++)
                                        n[r] = String.fromCharCode(t[r]);
                                    return n.join("")
                                }(this._bodyArrayBuffer));
                            if (this._bodyFormData)
                                throw new Error("could not read FormData body as text");
                            return Promise.resolve(this._bodyText)
                        }
                        ,
                        Pc && (this.formData = function() {
                            return this.text().then(Hc)
                        }
                        ),
                        this.json = function() {
                            return this.text().then(JSON.parse)
                        }
                        ,
                        this
                    }
                    Lc && (Dc = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                    Tc = ArrayBuffer.isView || function(e) {
                        return e && -1 < Dc.indexOf(Object.prototype.toString.call(e))
                    }
                    ),
                    Uc.prototype.append = function(e, t) {
                        e = jc(e),
                        t = Bc(t);
                        var n = this.map[e];
                        this.map[e] = n ? n + ", " + t : t
                    }
                    ,
                    Uc.prototype.delete = function(e) {
                        delete this.map[jc(e)]
                    }
                    ,
                    Uc.prototype.get = function(e) {
                        return e = jc(e),
                        this.has(e) ? this.map[e] : null
                    }
                    ,
                    Uc.prototype.has = function(e) {
                        return this.map.hasOwnProperty(jc(e))
                    }
                    ,
                    Uc.prototype.set = function(e, t) {
                        this.map[jc(e)] = Bc(t)
                    }
                    ,
                    Uc.prototype.forEach = function(e, t) {
                        for (var n in this.map)
                            this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
                    }
                    ,
                    Uc.prototype.keys = function() {
                        var n = [];
                        return this.forEach(function(e, t) {
                            n.push(t)
                        }),
                        Mc(n)
                    }
                    ,
                    Uc.prototype.values = function() {
                        var t = [];
                        return this.forEach(function(e) {
                            t.push(e)
                        }),
                        Mc(t)
                    }
                    ,
                    Uc.prototype.entries = function() {
                        var n = [];
                        return this.forEach(function(e, t) {
                            n.push([t, e])
                        }),
                        Mc(n)
                    }
                    ,
                    Cc && (Uc.prototype[Symbol.iterator] = Uc.prototype.entries);
                    var Vc = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
                    function Kc(e, t) {
                        if (!(this instanceof Kc))
                            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
                        var n, r = (t = t || {}).body;
                        if (e instanceof Kc) {
                            if (e.bodyUsed)
                                throw new TypeError("Already read");
                            this.url = e.url,
                            this.credentials = e.credentials,
                            t.headers || (this.headers = new Uc(e.headers)),
                            this.method = e.method,
                            this.mode = e.mode,
                            this.signal = e.signal,
                            r || null == e._bodyInit || (r = e._bodyInit,
                            e.bodyUsed = !0)
                        } else
                            this.url = String(e);
                        if (this.credentials = t.credentials || this.credentials || "same-origin",
                        !t.headers && this.headers || (this.headers = new Uc(t.headers)),
                        this.method = (n = t.method || this.method || "GET",
                        e = n.toUpperCase(),
                        -1 < Vc.indexOf(e) ? e : n),
                        this.mode = t.mode || this.mode || null,
                        this.signal = t.signal || this.signal,
                        this.referrer = null,
                        ("GET" === this.method || "HEAD" === this.method) && r)
                            throw new TypeError("Body not allowed for GET or HEAD requests");
                        this._initBody(r),
                        "GET" !== this.method && "HEAD" !== this.method || "no-store" !== t.cache && "no-cache" !== t.cache || ((t = /([?&])_=[^&]*/).test(this.url) ? this.url = this.url.replace(t, "$1_=" + (new Date).getTime()) : this.url += (/\?/.test(this.url) ? "&" : "?") + "_=" + (new Date).getTime())
                    }
                    function Hc(e) {
                        var n = new FormData;
                        return e.trim().split("&").forEach(function(e) {
                            var t;
                            e && (e = (t = e.split("=")).shift().replace(/\+/g, " "),
                            t = t.join("=").replace(/\+/g, " "),
                            n.append(decodeURIComponent(e), decodeURIComponent(t)))
                        }),
                        n
                    }
                    function Wc(e, t) {
                        if (!(this instanceof Wc))
                            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
                        t = t || {},
                        this.type = "default",
                        this.status = void 0 === t.status ? 200 : t.status,
                        this.ok = 200 <= this.status && this.status < 300,
                        this.statusText = void 0 === t.statusText ? "" : "" + t.statusText,
                        this.headers = new Uc(t.headers),
                        this.url = t.url || "",
                        this._initBody(e)
                    }
                    Kc.prototype.clone = function() {
                        return new Kc(this,{
                            body: this._bodyInit
                        })
                    }
                    ,
                    zc.call(Kc.prototype),
                    zc.call(Wc.prototype),
                    Wc.prototype.clone = function() {
                        return new Wc(this._bodyInit,{
                            status: this.status,
                            statusText: this.statusText,
                            headers: new Uc(this.headers),
                            url: this.url
                        })
                    }
                    ,
                    Wc.error = function() {
                        var e = new Wc(null,{
                            status: 0,
                            statusText: ""
                        });
                        return e.type = "error",
                        e
                    }
                    ;
                    var $c = [301, 302, 303, 307, 308];
                    Wc.redirect = function(e, t) {
                        if (-1 === $c.indexOf(t))
                            throw new RangeError("Invalid status code");
                        return new Wc(null,{
                            status: t,
                            headers: {
                                location: e
                            }
                        })
                    }
                    ;
                    var Yc = Rc.DOMException;
                    try {
                        new Yc
                    } catch (p) {
                        (Yc = function(e, t) {
                            this.message = e,
                            this.name = t;
                            e = Error(e);
                            this.stack = e.stack
                        }
                        ).prototype = Object.create(Error.prototype),
                        Yc.prototype.constructor = Yc
                    }
                    function Qc(r, a) {
                        return new Promise(function(i, e) {
                            var t = new Kc(r,a);
                            if (t.signal && t.signal.aborted)
                                return e(new Yc("Aborted","AbortError"));
                            var o = new XMLHttpRequest;
                            function n() {
                                o.abort()
                            }
                            o.onload = function() {
                                var e, n, t = {
                                    status: o.status,
                                    statusText: o.statusText,
                                    headers: (e = o.getAllResponseHeaders() || "",
                                    n = new Uc,
                                    e.replace(/\r?\n[\t ]+/g, " ").split("\r").map(function(e) {
                                        return 0 === e.indexOf("\n") ? e.substr(1, e.length) : e
                                    }).forEach(function(e) {
                                        var t = e.split(":")
                                          , e = t.shift().trim();
                                        e && (t = t.join(":").trim(),
                                        n.append(e, t))
                                    }),
                                    n)
                                };
                                t.url = "responseURL"in o ? o.responseURL : t.headers.get("X-Request-URL");
                                var r = "response"in o ? o.response : o.responseText;
                                setTimeout(function() {
                                    i(new Wc(r,t))
                                }, 0)
                            }
                            ,
                            o.onerror = function() {
                                setTimeout(function() {
                                    e(new TypeError("Network request failed"))
                                }, 0)
                            }
                            ,
                            o.ontimeout = function() {
                                setTimeout(function() {
                                    e(new TypeError("Network request failed"))
                                }, 0)
                            }
                            ,
                            o.onabort = function() {
                                setTimeout(function() {
                                    e(new Yc("Aborted","AbortError"))
                                }, 0)
                            }
                            ,
                            o.open(t.method, function(t) {
                                try {
                                    return "" === t && Rc.location.href ? Rc.location.href : t
                                } catch (e) {
                                    return t
                                }
                            }(t.url), !0),
                            "include" === t.credentials ? o.withCredentials = !0 : "omit" === t.credentials && (o.withCredentials = !1),
                            "responseType"in o && (Ic ? o.responseType = "blob" : Lc && t.headers.get("Content-Type") && -1 !== t.headers.get("Content-Type").indexOf("application/octet-stream") && (o.responseType = "arraybuffer")),
                            !a || "object" != typeof a.headers || a.headers instanceof Uc ? t.headers.forEach(function(e, t) {
                                o.setRequestHeader(t, e)
                            }) : Object.getOwnPropertyNames(a.headers).forEach(function(e) {
                                o.setRequestHeader(e, Bc(a.headers[e]))
                            }),
                            t.signal && (t.signal.addEventListener("abort", n),
                            o.onreadystatechange = function() {
                                4 === o.readyState && t.signal.removeEventListener("abort", n)
                            }
                            ),
                            o.send(void 0 === t._bodyInit ? null : t._bodyInit)
                        }
                        )
                    }
                    Qc.polyfill = !0,
                    Rc.fetch || (Rc.fetch = Qc,
                    Rc.Headers = Uc,
                    Rc.Request = Kc,
                    Rc.Response = Wc);
                    var Jc = "1.15.7"
                      , L = q
                      , Zc = z
                      , Xc = Te
                      , eu = l
                      , tu = b
                      , nu = bo
                      , ru = At
                      , iu = Qr
                      , ou = ge
                      , au = e
                      , e = i
                      , su = ie.UNSUPPORTED_Y
                      , cu = [].push
                      , uu = Math.min
                      , du = 4294967295;
                    L("split", function(i, p, g) {
                        var m = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || 1 < ".".split(/()()/).length || "".split(/.?/).length ? function(e, t) {
                            var n = iu(eu(this))
                              , r = void 0 === t ? du : t >>> 0;
                            if (0 == r)
                                return [];
                            if (void 0 === e)
                                return [n];
                            if (!Zc(e))
                                return p.call(n, e, r);
                            for (var i, o, a, s = [], t = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), c = 0, u = new RegExp(e.source,t + "g"); (i = au.call(u, n)) && !((o = u.lastIndex) > c && (s.push(n.slice(c, i.index)),
                            1 < i.length && i.index < n.length && cu.apply(s, i.slice(1)),
                            a = i[0].length,
                            c = o,
                            s.length >= r)); )
                                u.lastIndex === i.index && u.lastIndex++;
                            return c === n.length ? !a && u.test("") || s.push("") : s.push(n.slice(c)),
                            s.length > r ? s.slice(0, r) : s
                        }
                        : "0".split(void 0, 0).length ? function(e, t) {
                            return void 0 === e && 0 === t ? [] : p.call(this, e, t)
                        }
                        : p;
                        return [function(e, t) {
                            var n = eu(this)
                              , r = null == e ? void 0 : e[i];
                            return void 0 !== r ? r.call(e, n, t) : m.call(iu(n), e, t)
                        }
                        , function(e, t) {
                            var n = Xc(this)
                              , r = iu(e)
                              , i = g(m, n, r, t, m !== p);
                            if (i.done)
                                return i.value;
                            var e = tu(n, RegExp)
                              , o = n.unicode
                              , i = (n.ignoreCase ? "i" : "") + (n.multiline ? "m" : "") + (n.unicode ? "u" : "") + (su ? "g" : "y")
                              , a = new e(su ? "^(?:" + n.source + ")" : n,i)
                              , s = void 0 === t ? du : t >>> 0;
                            if (0 == s)
                                return [];
                            if (0 === r.length)
                                return null === ou(a, r) ? [r] : [];
                            for (var c = 0, u = 0, d = []; u < r.length; ) {
                                a.lastIndex = su ? 0 : u;
                                var l, h = ou(a, su ? r.slice(u) : r);
                                if (null === h || (l = uu(ru(a.lastIndex + (su ? u : 0)), r.length)) === c)
                                    u = nu(r, u, o);
                                else {
                                    if (d.push(r.slice(c, u)),
                                    d.length === s)
                                        return d;
                                    for (var f = 1; f <= h.length - 1; f++)
                                        if (d.push(h[f]),
                                        d.length === s)
                                            return d;
                                    u = c = l
                                }
                            }
                            return d.push(r.slice(c)),
                            d
                        }
                        ]
                    }, !!e(function() {
                        var e = /(?:)/
                          , t = e.exec;
                        e.exec = function() {
                            return t.apply(this, arguments)
                        }
                        ;
                        e = "ab".split(e);
                        return 2 !== e.length || "a" !== e[0] || "b" !== e[1]
                    }), su);
                    var lu = Te
                      , hu = At
                      , fu = Qr
                      , pu = l
                      , gu = bo
                      , mu = ge;
                    q("match", function(r, s, c) {
                        return [function(e) {
                            var t = pu(this)
                              , n = null == e ? void 0 : e[r];
                            return void 0 !== n ? n.call(e, t) : new RegExp(e)[r](fu(t))
                        }
                        , function(e) {
                            var t = lu(this)
                              , n = fu(e)
                              , e = c(s, t, n);
                            if (e.done)
                                return e.value;
                            if (!t.global)
                                return mu(t, n);
                            for (var r = t.unicode, i = [], o = t.lastIndex = 0; null !== (a = mu(t, n)); ) {
                                var a = fu(a[0]);
                                "" === (i[o] = a) && (t.lastIndex = gu(n, hu(t.lastIndex), r)),
                                o++
                            }
                            return 0 === o ? null : i
                        }
                        ]
                    });
                    var vu = {}
                      , yu = Object.prototype.hasOwnProperty;
                    function bu(e) {
                        try {
                            return decodeURIComponent(e.replace(/\+/g, " "))
                        } catch (e) {
                            return null
                        }
                    }
                    function _u(e) {
                        try {
                            return encodeURIComponent(e)
                        } catch (e) {
                            return null
                        }
                    }
                    vu.stringify = function(e, t) {
                        var n, r, i = [];
                        for (r in "string" != typeof (t = t || "") && (t = "?"),
                        e)
                            if (yu.call(e, r)) {
                                if ((n = e[r]) || null != n && !isNaN(n) || (n = ""),
                                r = _u(r),
                                n = _u(n),
                                null === r || null === n)
                                    continue;
                                i.push(r + "=" + n)
                            }
                        return i.length ? t + i.join("&") : ""
                    }
                    ,
                    vu.parse = function(e) {
                        for (var t = /([^=?#&]+)=?([^&]*)/g, n = {}; i = t.exec(e); ) {
                            var r = bu(i[1])
                              , i = bu(i[2]);
                            null === r || null === i || r in n || (n[r] = i)
                        }
                        return n
                    }
                    ;
                    function wu(e, t) {
                        if (t = t.split(":")[0],
                        e = +e) {
                            switch (t) {
                            case "http":
                            case "ws":
                                return 80 !== e;
                            case "https":
                            case "wss":
                                return 443 !== e;
                            case "ftp":
                                return 21 !== e;
                            case "gopher":
                                return 70 !== e;
                            case "file":
                                return
                            }
                            return 0 !== e
                        }
                    }
                    var Au = vu
                      , Eu = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
                      , ku = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i
                      , xu = /^[a-zA-Z]:/
                      , Su = new RegExp("^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+");
                    function Du(e) {
                        return (e || "").toString().replace(Su, "")
                    }
                    var Tu = [["#", "hash"], ["?", "query"], function(e, t) {
                        return Cu(t.protocol) ? e.replace(/\\/g, "/") : e
                    }
                    , ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d+)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]]
                      , Ru = {
                        hash: 1,
                        query: 1
                    };
                    function Ou(e) {
                        var t, n = ("undefined" != typeof window ? window : void 0 !== je ? je : "undefined" != typeof self ? self : {}).location || {}, r = {}, n = typeof (e = e || n);
                        if ("blob:" === e.protocol)
                            r = new Pu(unescape(e.pathname),{});
                        else if ("string" == n)
                            for (t in r = new Pu(e,{}),
                            Ru)
                                delete r[t];
                        else if ("object" == n) {
                            for (t in e)
                                t in Ru || (r[t] = e[t]);
                            void 0 === r.slashes && (r.slashes = Eu.test(e.href))
                        }
                        return r
                    }
                    function Cu(e) {
                        return "file:" === e || "ftp:" === e || "http:" === e || "https:" === e || "ws:" === e || "wss:" === e
                    }
                    function Iu(e, t) {
                        e = Du(e),
                        t = t || {};
                        var n, r = ku.exec(e), i = r[1] ? r[1].toLowerCase() : "", o = !!r[2], a = !!r[3], e = 0;
                        return o ? e = a ? (n = r[2] + r[3] + r[4],
                        r[2].length + r[3].length) : (n = r[2] + r[4],
                        r[2].length) : a ? (n = r[3] + r[4],
                        e = r[3].length) : n = r[4],
                        "file:" === i ? 2 <= e && (n = n.slice(2)) : Cu(i) ? n = r[4] : i ? o && (n = n.slice(2)) : 2 <= e && Cu(t.protocol) && (n = r[4]),
                        {
                            protocol: i,
                            slashes: o || Cu(i),
                            slashesCount: e,
                            rest: n
                        }
                    }
                    function Pu(e, t, n) {
                        if (e = Du(e),
                        !(this instanceof Pu))
                            return new Pu(e,t,n);
                        var r, i, o, a, s, c = Tu.slice(), u = typeof t, d = this, l = 0;
                        for ("object" != u && "string" != u && (n = t,
                        t = null),
                        n && "function" != typeof n && (n = Au.parse),
                        r = !(u = Iu(e || "", t = Ou(t))).protocol && !u.slashes,
                        d.slashes = u.slashes || r && t.slashes,
                        d.protocol = u.protocol || t.protocol || "",
                        e = u.rest,
                        ("file:" === u.protocol && (2 !== u.slashesCount || xu.test(e)) || !u.slashes && (u.protocol || u.slashesCount < 2 || !Cu(d.protocol))) && (c[3] = [/(.*)/, "pathname"]); l < c.length; l++)
                            "function" != typeof (o = c[l]) ? (i = o[0],
                            s = o[1],
                            i != i ? d[s] = e : "string" == typeof i ? ~(a = e.indexOf(i)) && (e = "number" == typeof o[2] ? (d[s] = e.slice(0, a),
                            e.slice(a + o[2])) : (d[s] = e.slice(a),
                            e.slice(0, a))) : (a = i.exec(e)) && (d[s] = a[1],
                            e = e.slice(0, a.index)),
                            d[s] = d[s] || r && o[3] && t[s] || "",
                            o[4] && (d[s] = d[s].toLowerCase())) : e = o(e, d);
                        n && (d.query = n(d.query)),
                        r && t.slashes && "/" !== d.pathname.charAt(0) && ("" !== d.pathname || "" !== t.pathname) && (d.pathname = function(e, t) {
                            if ("" === e)
                                return t;
                            for (var n = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = n.length, e = n[r - 1], i = !1, o = 0; r--; )
                                "." === n[r] ? n.splice(r, 1) : ".." === n[r] ? (n.splice(r, 1),
                                o++) : o && (0 === r && (i = !0),
                                n.splice(r, 1),
                                o--);
                            return i && n.unshift(""),
                            "." !== e && ".." !== e || n.push(""),
                            n.join("/")
                        }(d.pathname, t.pathname)),
                        "/" !== d.pathname.charAt(0) && Cu(d.protocol) && (d.pathname = "/" + d.pathname),
                        wu(d.port, d.protocol) || (d.host = d.hostname,
                        d.port = ""),
                        d.username = d.password = "",
                        d.auth && (o = d.auth.split(":"),
                        d.username = o[0] || "",
                        d.password = o[1] || ""),
                        d.origin = "file:" !== d.protocol && Cu(d.protocol) && d.host ? d.protocol + "//" + d.host : "null",
                        d.href = d.toString()
                    }
                    Pu.prototype = {
                        set: function(e, t, n) {
                            var r, i = this;
                            switch (e) {
                            case "query":
                                "string" == typeof t && t.length && (t = (n || Au.parse)(t)),
                                i[e] = t;
                                break;
                            case "port":
                                i[e] = t,
                                wu(t, i.protocol) ? t && (i.host = i.hostname + ":" + t) : (i.host = i.hostname,
                                i[e] = "");
                                break;
                            case "hostname":
                                i[e] = t,
                                i.port && (t += ":" + i.port),
                                i.host = t;
                                break;
                            case "host":
                                i[e] = t,
                                /:\d+$/.test(t) ? (t = t.split(":"),
                                i.port = t.pop(),
                                i.hostname = t.join(":")) : (i.hostname = t,
                                i.port = "");
                                break;
                            case "protocol":
                                i.protocol = t.toLowerCase(),
                                i.slashes = !n;
                                break;
                            case "pathname":
                            case "hash":
                                t ? (r = "pathname" === e ? "/" : "#",
                                i[e] = t.charAt(0) !== r ? r + t : t) : i[e] = t;
                                break;
                            default:
                                i[e] = t
                            }
                            for (var o = 0; o < Tu.length; o++) {
                                var a = Tu[o];
                                a[4] && (i[a[1]] = i[a[1]].toLowerCase())
                            }
                            return i.origin = "file:" !== i.protocol && Cu(i.protocol) && i.host ? i.protocol + "//" + i.host : "null",
                            i.href = i.toString(),
                            i
                        },
                        toString: function(e) {
                            e && "function" == typeof e || (e = Au.stringify);
                            var t = this
                              , n = t.protocol;
                            n && ":" !== n.charAt(n.length - 1) && (n += ":");
                            n += t.slashes || Cu(t.protocol) ? "//" : "";
                            return t.username && (n += t.username,
                            t.password && (n += ":" + t.password),
                            n += "@"),
                            n += t.host + t.pathname,
                            (e = "object" == typeof t.query ? e(t.query) : t.query) && (n += "?" !== e.charAt(0) ? "?" + e : e),
                            t.hash && (n += t.hash),
                            n
                        }
                    },
                    Pu.extractProtocol = Iu,
                    Pu.location = Ou,
                    Pu.trimLeft = Du,
                    Pu.qs = Au;
                    var Lu = Pu
                      , q = {
                        exports: {}
                    };
                    !function(e, t) {
                        var r = "__lodash_hash_undefined__"
                          , c = 9007199254740991
                          , p = "[object Arguments]"
                          , g = "[object Boolean]"
                          , m = "[object Date]"
                          , v = "[object Function]"
                          , y = "[object GeneratorFunction]"
                          , b = "[object Map]"
                          , _ = "[object Number]"
                          , w = "[object Object]"
                          , n = "[object Promise]"
                          , A = "[object RegExp]"
                          , E = "[object Set]"
                          , k = "[object String]"
                          , x = "[object Symbol]"
                          , i = "[object WeakMap]"
                          , S = "[object ArrayBuffer]"
                          , D = "[object DataView]"
                          , T = "[object Float32Array]"
                          , R = "[object Float64Array]"
                          , O = "[object Int8Array]"
                          , C = "[object Int16Array]"
                          , I = "[object Int32Array]"
                          , P = "[object Uint8Array]"
                          , L = "[object Uint8ClampedArray]"
                          , j = "[object Uint16Array]"
                          , B = "[object Uint32Array]"
                          , M = /\w*$/
                          , o = /^\[object .+?Constructor\]$/
                          , u = /^(?:0|[1-9]\d*)$/
                          , U = {};
                        U[p] = U["[object Array]"] = U[S] = U[D] = U[g] = U[m] = U[T] = U[R] = U[O] = U[C] = U[I] = U[b] = U[_] = U[w] = U[A] = U[E] = U[k] = U[x] = U[P] = U[L] = U[j] = U[B] = !0,
                        U["[object Error]"] = U[v] = U[i] = !1;
                        var a = "object" == typeof je && je && je.Object === Object && je
                          , s = "object" == typeof self && self && self.Object === Object && self
                          , d = a || s || Function("return this")()
                          , l = t && !t.nodeType && t
                          , h = l && e && !e.nodeType && e
                          , f = h && h.exports === l;
                        function N(e, t) {
                            return e.set(t[0], t[1]),
                            e
                        }
                        function G(e, t) {
                            return e.add(t),
                            e
                        }
                        function F(e, t, n, r) {
                            var i = -1
                              , o = e ? e.length : 0;
                            for (r && o && (n = e[++i]); ++i < o; )
                                n = t(n, e[i], i, e);
                            return n
                        }
                        function q(e) {
                            var t = !1;
                            if (null != e && "function" != typeof e.toString)
                                try {
                                    t = !!(e + "")
                                } catch (e) {}
                            return t
                        }
                        function z(e) {
                            var n = -1
                              , r = Array(e.size);
                            return e.forEach(function(e, t) {
                                r[++n] = [t, e]
                            }),
                            r
                        }
                        function V(t, n) {
                            return function(e) {
                                return t(n(e))
                            }
                        }
                        function K(e) {
                            var t = -1
                              , n = Array(e.size);
                            return e.forEach(function(e) {
                                n[++t] = e
                            }),
                            n
                        }
                        var a = Array.prototype
                          , s = Function.prototype
                          , H = Object.prototype
                          , t = d["__core-js_shared__"]
                          , W = (h = /[^.]+$/.exec(t && t.keys && t.keys.IE_PROTO || "")) ? "Symbol(src)_1." + h : ""
                          , $ = s.toString
                          , Y = H.hasOwnProperty
                          , Q = H.toString
                          , J = RegExp("^" + $.call(Y).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
                          , l = f ? d.Buffer : void 0
                          , t = d.Symbol
                          , Z = d.Uint8Array
                          , X = V(Object.getPrototypeOf, Object)
                          , ee = Object.create
                          , te = H.propertyIsEnumerable
                          , ne = a.splice
                          , h = Object.getOwnPropertySymbols
                          , s = l ? l.isBuffer : void 0
                          , re = V(Object.keys, Object)
                          , f = Ee(d, "DataView")
                          , ie = Ee(d, "Map")
                          , a = Ee(d, "Promise")
                          , l = Ee(d, "Set")
                          , d = Ee(d, "WeakMap")
                          , oe = Ee(Object, "create")
                          , ae = De(f)
                          , se = De(ie)
                          , ce = De(a)
                          , ue = De(l)
                          , de = De(d)
                          , t = t ? t.prototype : void 0
                          , le = t ? t.valueOf : void 0;
                        function he(e) {
                            var t = -1
                              , n = e ? e.length : 0;
                            for (this.clear(); ++t < n; ) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }
                        function fe(e) {
                            var t = -1
                              , n = e ? e.length : 0;
                            for (this.clear(); ++t < n; ) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }
                        function pe(e) {
                            var t = -1
                              , n = e ? e.length : 0;
                            for (this.clear(); ++t < n; ) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }
                        function ge(e) {
                            this.__data__ = new fe(e)
                        }
                        function me(e, t) {
                            var n, r, i, o = Re(e) || (r = n = e) && "object" == typeof r && Oe(r) && Y.call(n, "callee") && (!te.call(n, "callee") || Q.call(n) == p) ? function(e, t) {
                                for (var n = -1, r = Array(e); ++n < e; )
                                    r[n] = t(n);
                                return r
                            }(e.length, String) : [], a = o.length, s = !!a;
                            for (i in e)
                                !t && !Y.call(e, i) || s && ("length" == i || function e(t, n) {
                                    return !!(n = null == n ? c : n) && ("number" == typeof t || u.test(t)) && -1 < t && t % 1 == 0 && t < n
                                }(i, a)) || o.push(i);
                            return o
                        }
                        function ve(e, t, n) {
                            var r = e[t];
                            Y.call(e, t) && Te(r, n) && (void 0 !== n || t in e) || (e[t] = n)
                        }
                        function ye(e, t) {
                            for (var n = e.length; n--; )
                                if (Te(e[n][0], t))
                                    return n;
                            return -1
                        }
                        function be(o, a, s, c, e, t, u) {
                            var d;
                            if (void 0 !== (d = c ? t ? c(o, e, t, u) : c(o) : d))
                                return d;
                            if (!Pe(o))
                                return o;
                            var n, r = Re(o);
                            if (r) {
                                if (e = (n = o).length,
                                i = n.constructor(e),
                                e && "string" == typeof n[0] && Y.call(n, "index") && (i.index = n.index,
                                i.input = n.input),
                                d = i,
                                !a)
                                    return function(e, t) {
                                        var n = -1
                                          , r = e.length;
                                        for (t = t || Array(r); ++n < r; )
                                            t[n] = e[n];
                                        return t
                                    }(o, d)
                            } else {
                                var l = xe(o)
                                  , i = l == v || l == y;
                                if (Ce(o))
                                    return function(e) {
                                        if (a)
                                            return e.slice();
                                        var t = new e.constructor(e.length);
                                        return e.copy(t),
                                        t
                                    }(o);
                                if (l == w || l == p || i && !t) {
                                    if (q(o))
                                        return t ? o : {};
                                    if (d = "function" != typeof (i = i ? {} : o).constructor || Se(i) ? {} : Pe(i = X(i)) ? ee(i) : {},
                                    !a)
                                        return i = o,
                                        f = (f = d) && we(o, Le(o), f),
                                        we(i, ke(i), f)
                                } else {
                                    if (!U[l])
                                        return t ? o : {};
                                    d = function(e, t, n) {
                                        var r, i, o, a, s = e.constructor;
                                        switch (l) {
                                        case S:
                                            return _e(e);
                                        case g:
                                        case m:
                                            return new s(+e);
                                        case D:
                                            return o = e,
                                            a = n ? _e(o.buffer) : o.buffer,
                                            new o.constructor(a,o.byteOffset,o.byteLength);
                                        case T:
                                        case R:
                                        case O:
                                        case C:
                                        case I:
                                        case P:
                                        case L:
                                        case j:
                                        case B:
                                            return a = e,
                                            o = n ? _e(a.buffer) : a.buffer,
                                            new a.constructor(o,a.byteOffset,a.length);
                                        case b:
                                            return i = e,
                                            F(n ? t(z(i), !0) : z(i), N, new i.constructor);
                                        case _:
                                        case k:
                                            return new s(e);
                                        case A:
                                            return (r = new (i = e).constructor(i.source,M.exec(i))).lastIndex = i.lastIndex,
                                            r;
                                        case E:
                                            return r = e,
                                            F(n ? t(K(r), !0) : K(r), G, new r.constructor);
                                        case x:
                                            return le ? Object(le.call(e)) : {}
                                        }
                                    }(o, be, a)
                                }
                            }
                            var h, f = (u = u || new ge).get(o);
                            return f || (u.set(o, d),
                            function(e) {
                                for (var t, n, r = -1, i = e ? e.length : 0; ++r < i && !1 !== (t = e[r],
                                n = r,
                                h && (t = o[n = t]),
                                void ve(d, n, be(t, a, s, c, n, o, u))); )
                                    ;
                            }((h = !r ? s ? (t = ke,
                            r = Le(f = o),
                            Re(f) ? r : function(e, t) {
                                for (var n = -1, r = t.length, i = e.length; ++n < r; )
                                    e[i + n] = t[n];
                                return e
                            }(r, t(f))) : Le(o) : h) || o),
                            d)
                        }
                        function _e(e) {
                            var t = new e.constructor(e.byteLength);
                            return new Z(t).set(new Z(e)),
                            t
                        }
                        function we(e, t, n, r) {
                            n = n || {};
                            for (var i = -1, o = t.length; ++i < o; ) {
                                var a = t[i]
                                  , s = r ? r(n[a], e[a], a, n, e) : void 0;
                                ve(n, a, void 0 === s ? e[a] : s)
                            }
                            return n
                        }
                        function Ae(e, t) {
                            var n = e.__data__;
                            return ("string" == (e = typeof t) || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t) ? n["string" == typeof t ? "string" : "hash"] : n.map
                        }
                        function Ee(e, t) {
                            t = null == e ? void 0 : e[t];
                            return function e(t) {
                                return Pe(t) && !(W && W in t) && (Ie(t) || q(t) ? J : o).test(De(t))
                            }(t) ? t : void 0
                        }
                        he.prototype.clear = function() {
                            this.__data__ = oe ? oe(null) : {}
                        }
                        ,
                        he.prototype.delete = function(e) {
                            return this.has(e) && delete this.__data__[e]
                        }
                        ,
                        he.prototype.get = function(e) {
                            var t = this.__data__;
                            if (oe) {
                                var n = t[e];
                                return n === r ? void 0 : n
                            }
                            return Y.call(t, e) ? t[e] : void 0
                        }
                        ,
                        he.prototype.has = function(e) {
                            var t = this.__data__;
                            return oe ? void 0 !== t[e] : Y.call(t, e)
                        }
                        ,
                        he.prototype.set = function(e, t) {
                            return this.__data__[e] = oe && void 0 === t ? r : t,
                            this
                        }
                        ,
                        fe.prototype.clear = function() {
                            this.__data__ = []
                        }
                        ,
                        fe.prototype.delete = function(e) {
                            var t = this.__data__
                              , e = ye(t, e);
                            return !(e < 0 || (e == t.length - 1 ? t.pop() : ne.call(t, e, 1),
                            0))
                        }
                        ,
                        fe.prototype.get = function(e) {
                            var t = this.__data__
                              , e = ye(t, e);
                            return e < 0 ? void 0 : t[e][1]
                        }
                        ,
                        fe.prototype.has = function(e) {
                            return -1 < ye(this.__data__, e)
                        }
                        ,
                        fe.prototype.set = function(e, t) {
                            var n = this.__data__
                              , r = ye(n, e);
                            return r < 0 ? n.push([e, t]) : n[r][1] = t,
                            this
                        }
                        ,
                        pe.prototype.clear = function() {
                            this.__data__ = {
                                hash: new he,
                                map: new (ie || fe),
                                string: new he
                            }
                        }
                        ,
                        pe.prototype.delete = function(e) {
                            return Ae(this, e).delete(e)
                        }
                        ,
                        pe.prototype.get = function(e) {
                            return Ae(this, e).get(e)
                        }
                        ,
                        pe.prototype.has = function(e) {
                            return Ae(this, e).has(e)
                        }
                        ,
                        pe.prototype.set = function(e, t) {
                            return Ae(this, e).set(e, t),
                            this
                        }
                        ,
                        ge.prototype.clear = function() {
                            this.__data__ = new fe
                        }
                        ,
                        ge.prototype.delete = function(e) {
                            return this.__data__.delete(e)
                        }
                        ,
                        ge.prototype.get = function(e) {
                            return this.__data__.get(e)
                        }
                        ,
                        ge.prototype.has = function(e) {
                            return this.__data__.has(e)
                        }
                        ,
                        ge.prototype.set = function(e, t) {
                            var n = this.__data__;
                            if (n instanceof fe) {
                                var r = n.__data__;
                                if (!ie || r.length < 199)
                                    return r.push([e, t]),
                                    this;
                                n = this.__data__ = new pe(r)
                            }
                            return n.set(e, t),
                            this
                        }
                        ;
                        var ke = h ? V(h, Object) : function() {
                            return []
                        }
                          , xe = function(e) {
                            return Q.call(e)
                        };
                        function Se(e) {
                            var t = e && e.constructor;
                            return e === ("function" == typeof t && t.prototype || H)
                        }
                        function De(e) {
                            if (null != e) {
                                try {
                                    return $.call(e)
                                } catch (e) {}
                                try {
                                    return e + ""
                                } catch (e) {}
                            }
                            return ""
                        }
                        function Te(e, t) {
                            return e === t || e != e && t != t
                        }
                        (f && xe(new f(new ArrayBuffer(1))) != D || ie && xe(new ie) != b || a && xe(a.resolve()) != n || l && xe(new l) != E || d && xe(new d) != i) && (xe = function(e) {
                            var t = Q.call(e)
                              , e = t == w ? e.constructor : void 0
                              , e = e ? De(e) : void 0;
                            if (e)
                                switch (e) {
                                case ae:
                                    return D;
                                case se:
                                    return b;
                                case ce:
                                    return n;
                                case ue:
                                    return E;
                                case de:
                                    return i
                                }
                            return t
                        }
                        );
                        var Re = Array.isArray;
                        function Oe(e) {
                            return null != e && ("number" == typeof (t = e.length) && -1 < t && t % 1 == 0 && t <= c) && !Ie(e);
                            var t
                        }
                        var Ce = s || function() {
                            return !1
                        }
                        ;
                        function Ie(e) {
                            e = Pe(e) ? Q.call(e) : "";
                            return e == v || e == y
                        }
                        function Pe(e) {
                            var t = typeof e;
                            return e && ("object" == t || "function" == t)
                        }
                        function Le(e) {
                            return (Oe(e) ? me : function(e) {
                                if (!Se(e))
                                    return re(e);
                                var t, n = [];
                                for (t in Object(e))
                                    Y.call(e, t) && "constructor" != t && n.push(t);
                                return n
                            }
                            )(e)
                        }
                        e.exports = function(e) {
                            return be(e, !0, !0)
                        }
                    }(q, q.exports);
                    var ju = q.exports;
                    function Bu(e) {
                        return "[object Object]" === Object.prototype.toString.call(e)
                    }
                    function Mu(e) {
                        return !1 !== Bu(e) && (void 0 === (e = e.constructor) || !1 !== Bu(e = e.prototype) && !1 !== e.hasOwnProperty("isPrototypeOf"))
                    }
                    function Uu(e) {
                        if (e) {
                            var t = Vu.call(e);
                            return "[object Function]" === t || "function" == typeof e && "[object RegExp]" !== t || "undefined" != typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e === window.prompt)
                        }
                    }
                    var Nu = String.prototype.valueOf
                      , Gu = Object.prototype.toString
                      , Fu = function() {
                        if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols)
                            return !1;
                        if ("symbol" == typeof Symbol.iterator)
                            return !0;
                        var e = {}
                          , t = Symbol("test")
                          , n = Object(t);
                        if ("string" == typeof t)
                            return !1;
                        if ("[object Symbol]" !== Object.prototype.toString.call(t))
                            return !1;
                        if ("[object Symbol]" !== Object.prototype.toString.call(n))
                            return !1;
                        for (t in e[t] = 42,
                        e)
                            return !1;
                        if ("function" == typeof Object.keys && 0 !== Object.keys(e).length)
                            return !1;
                        if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length)
                            return !1;
                        n = Object.getOwnPropertySymbols(e);
                        if (1 !== n.length || n[0] !== t)
                            return !1;
                        if (!Object.prototype.propertyIsEnumerable.call(e, t))
                            return !1;
                        if ("function" == typeof Object.getOwnPropertyDescriptor) {
                            e = Object.getOwnPropertyDescriptor(e, t);
                            if (42 !== e.value || !0 !== e.enumerable)
                                return !1
                        }
                        return !0
                    }() && !!Symbol.toStringTag
                      , q = Array.isArray
                      , qu = Object.prototype.toString
                      , zu = q || function(e) {
                        return !!e && "[object Array]" == qu.call(e)
                    }
                      , Vu = Object.prototype.toString
                      , q = {
                        exports: {}
                    }
                      , Ku = q
                      , Hu = q.exports;
                    (function(i, l) {
                        function o(e, t) {
                            if ("object" == typeof e && (t = e,
                            e = l),
                            !(this instanceof o))
                                return new o(e,t).getResult();
                            var n = e || (void 0 !== i && i.navigator && i.navigator.userAgent ? i.navigator.userAgent : "")
                              , r = t ? v.extend(_, t) : _;
                            return this.getBrowser = function() {
                                var e = {
                                    name: l,
                                    version: l
                                };
                                return y.rgx.call(e, n, r.browser),
                                e.major = v.major(e.version),
                                e
                            }
                            ,
                            this.getCPU = function() {
                                var e = {
                                    architecture: l
                                };
                                return y.rgx.call(e, n, r.cpu),
                                e
                            }
                            ,
                            this.getDevice = function() {
                                var e = {
                                    vendor: l,
                                    model: l,
                                    type: l
                                };
                                return y.rgx.call(e, n, r.device),
                                e
                            }
                            ,
                            this.getEngine = function() {
                                var e = {
                                    name: l,
                                    version: l
                                };
                                return y.rgx.call(e, n, r.engine),
                                e
                            }
                            ,
                            this.getOS = function() {
                                var e = {
                                    name: l,
                                    version: l
                                };
                                return y.rgx.call(e, n, r.os),
                                e
                            }
                            ,
                            this.getResult = function() {
                                return {
                                    ua: this.getUA(),
                                    browser: this.getBrowser(),
                                    engine: this.getEngine(),
                                    os: this.getOS(),
                                    device: this.getDevice(),
                                    cpu: this.getCPU()
                                }
                            }
                            ,
                            this.getUA = function() {
                                return n
                            }
                            ,
                            this.setUA = function(e) {
                                return n = typeof e == a && 255 < e.length ? v.trim(e, 255) : e,
                                this
                            }
                            ,
                            this.setUA(n),
                            this
                        }
                        var h = "function"
                          , a = "string"
                          , e = "model"
                          , t = "name"
                          , n = "type"
                          , r = "vendor"
                          , s = "version"
                          , c = "architecture"
                          , u = "console"
                          , d = "mobile"
                          , f = "tablet"
                          , p = "smarttv"
                          , g = "wearable"
                          , m = "embedded"
                          , v = {
                            extend: function(e, t) {
                                var n, r = {};
                                for (n in e)
                                    t[n] && t[n].length % 2 == 0 ? r[n] = t[n].concat(e[n]) : r[n] = e[n];
                                return r
                            },
                            has: function(e, t) {
                                return typeof e == a && -1 !== t.toLowerCase().indexOf(e.toLowerCase())
                            },
                            lowerize: function(e) {
                                return e.toLowerCase()
                            },
                            major: function(e) {
                                return typeof e == a ? e.replace(/[^\d\.]/g, "").split(".")[0] : l
                            },
                            trim: function(e, t) {
                                return e = e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
                                void 0 === t ? e : e.substring(0, 255)
                            }
                        }
                          , y = {
                            rgx: function(e, t) {
                                for (var n, r, i, o, a, s = 0; s < t.length && !o; ) {
                                    for (var c = t[s], u = t[s + 1], d = n = 0; d < c.length && !o; )
                                        if (o = c[d++].exec(e))
                                            for (r = 0; r < u.length; r++)
                                                a = o[++n],
                                                "object" == typeof (i = u[r]) && 0 < i.length ? 2 == i.length ? typeof i[1] == h ? this[i[0]] = i[1].call(this, a) : this[i[0]] = i[1] : 3 == i.length ? typeof i[1] != h || i[1].exec && i[1].test ? this[i[0]] = a ? a.replace(i[1], i[2]) : l : this[i[0]] = a ? i[1].call(this, a, i[2]) : l : 4 == i.length && (this[i[0]] = a ? i[3].call(this, a.replace(i[1], i[2])) : l) : this[i] = a || l;
                                    s += 2
                                }
                            },
                            str: function(e, t) {
                                for (var n in t)
                                    if ("object" == typeof t[n] && 0 < t[n].length) {
                                        for (var r = 0; r < t[n].length; r++)
                                            if (v.has(t[n][r], e))
                                                return "?" === n ? l : n
                                    } else if (v.has(t[n], e))
                                        return "?" === n ? l : n;
                                return e
                            }
                        }
                          , b = {
                            browser: {
                                oldSafari: {
                                    version: {
                                        "1.0": "/8",
                                        1.2: "/1",
                                        1.3: "/3",
                                        "2.0": "/412",
                                        "2.0.2": "/416",
                                        "2.0.3": "/417",
                                        "2.0.4": "/419",
                                        "?": "/"
                                    }
                                },
                                oldEdge: {
                                    version: {
                                        .1: "12.",
                                        21: "13.",
                                        31: "14.",
                                        39: "15.",
                                        41: "16.",
                                        42: "17.",
                                        44: "18."
                                    }
                                }
                            },
                            os: {
                                windows: {
                                    version: {
                                        ME: "4.90",
                                        "NT 3.11": "NT3.51",
                                        "NT 4.0": "NT4.0",
                                        2e3: "NT 5.0",
                                        XP: ["NT 5.1", "NT 5.2"],
                                        Vista: "NT 6.0",
                                        7: "NT 6.1",
                                        8: "NT 6.2",
                                        8.1: "NT 6.3",
                                        10: ["NT 6.4", "NT 10.0"],
                                        RT: "ARM"
                                    }
                                }
                            }
                        }
                          , _ = {
                            browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [s, [t, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [s, [t, "Edge"]], [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]{3,6})\b.+version\/([\w\.-]+)/i, /(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i], [t, s], [/opios[\/\s]+([\w\.]+)/i], [s, [t, "Opera Mini"]], [/\sopr\/([\w\.]+)/i], [s, [t, "Opera"]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i, /(ba?idubrowser)[\/\s]?([\w\.]+)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i, /(rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.]+)/i, /(weibo)__([\d\.]+)/i], [t, s], [/(?:[\s\/]uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i], [s, [t, "UCBrowser"]], [/(?:windowswechat)?\sqbcore\/([\w\.]+)\b.*(?:windowswechat)?/i], [s, [t, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [s, [t, "WeChat"]], [/konqueror\/([\w\.]+)/i], [s, [t, "Konqueror"]], [/trident.+rv[:\s]([\w\.]{1,9})\b.+like\sgecko/i], [s, [t, "IE"]], [/yabrowser\/([\w\.]+)/i], [s, [t, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[t, /(.+)/, "$1 Secure Browser"], s], [/focus\/([\w\.]+)/i], [s, [t, "Firefox Focus"]], [/opt\/([\w\.]+)/i], [s, [t, "Opera Touch"]], [/coc_coc_browser\/([\w\.]+)/i], [s, [t, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [s, [t, "Dolphin"]], [/coast\/([\w\.]+)/i], [s, [t, "Opera Coast"]], [/xiaomi\/miuibrowser\/([\w\.]+)/i], [s, [t, "MIUI Browser"]], [/fxios\/([\w\.-]+)/i], [s, [t, "Firefox"]], [/(qihu|qhbrowser|qihoobrowser|360browser)/i], [[t, "360 Browser"]], [/(oculus|samsung|sailfish)browser\/([\w\.]+)/i], [[t, /(.+)/, "$1 Browser"], s], [/(comodo_dragon)\/([\w\.]+)/i], [[t, /_/g, " "], s], [/\s(electron)\/([\w\.]+)\ssafari/i, /(tesla)(?:\sqtcarbrowser|\/(20[12]\d\.[\w\.-]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i], [t, s], [/(MetaSr)[\/\s]?([\w\.]+)/i, /(LBBROWSER)/i], [t], [/;fbav\/([\w\.]+);/i], [s, [t, "Facebook"]], [/FBAN\/FBIOS|FB_IAB\/FB4A/i], [[t, "Facebook"]], [/safari\s(line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/\s]([\w\.-]+)/i], [t, s], [/\bgsa\/([\w\.]+)\s.*safari\//i], [s, [t, "GSA"]], [/headlesschrome(?:\/([\w\.]+)|\s)/i], [s, [t, "Chrome Headless"]], [/\swv\).+(chrome)\/([\w\.]+)/i], [[t, "Chrome WebView"], s], [/droid.+\sversion\/([\w\.]+)\b.+(?:mobile\ssafari|safari)/i], [s, [t, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i], [t, s], [/version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i], [s, [t, "Mobile Safari"]], [/version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i], [s, t], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [t, [s, y.str, b.browser.oldSafari.version]], [/(webkit|khtml)\/([\w\.]+)/i], [t, s], [/(navigator|netscape)\/([\w\.-]+)/i], [[t, "Netscape"], s], [/ile\svr;\srv:([\w\.]+)\).+firefox/i], [s, [t, "Firefox Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i, /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [t, s]],
                            cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[c, "amd64"]], [/(ia32(?=;))/i], [[c, v.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[c, "ia32"]], [/\b(aarch64|armv?8e?l?)\b/i], [[c, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[c, "armhf"]], [/windows\s(ce|mobile);\sppc;/i], [[c, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[c, /ower/, "", v.lowerize]], [/(sun4\w)[;\)]/i], [[c, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[c, v.lowerize]]],
                            device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus\s10)/i], [e, [r, "Samsung"], [n, f]], [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy\snexus)/i, /\ssamsung[\s-]([\w-]+)/i, /sec-(sgh\w+)/i], [e, [r, "Samsung"], [n, d]], [/\((ip(?:hone|od)[\s\w]*);/i], [e, [r, "Apple"], [n, d]], [/\((ipad);[\w\s\),;-]+apple/i, /applecoremedia\/[\w\.]+\s\((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [e, [r, "Apple"], [n, f]], [/\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i], [e, [r, "Huawei"], [n, f]], [/d\/huawei([\w\s-]+)[;\)]/i, /\b(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i, /\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i], [e, [r, "Huawei"], [n, d]], [/\b(poco[\s\w]+)(?:\sbuild|\))/i, /\b;\s(\w+)\sbuild\/hm\1/i, /\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i, /\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?:\sbuild|\))/i, /\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i], [[e, /_/g, " "], [r, "Xiaomi"], [n, d]], [/\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?:\sbuild|\))/i], [[e, /_/g, " "], [r, "Xiaomi"], [n, f]], [/;\s(\w+)\sbuild.+\soppo/i, /\s(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i], [e, [r, "OPPO"], [n, d]], [/\svivo\s(\w+)(?:\sbuild|\))/i, /\s(v[12]\d{3}\w?[at])(?:\sbuild|;)/i], [e, [r, "Vivo"], [n, d]], [/\s(rmx[12]\d{3})(?:\sbuild|;)/i], [e, [r, "Realme"], [n, d]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)\b[\w\s]+build\//i, /\smot(?:orola)?[\s-](\w*)/i, /((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?=\sbuild|\)))/i], [e, [r, "Motorola"], [n, d]], [/\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [e, [r, "Motorola"], [n, f]], [/((?=lg)?[vl]k\-?\d{3})\sbuild|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i], [e, [r, "LG"], [n, f]], [/(lm-?f100[nv]?|nexus\s[45])/i, /lg[e;\s\/-]+((?!browser|netcast)\w+)/i, /\blg(\-?[\d\w]+)\sbuild/i], [e, [r, "LG"], [n, d]], [/(ideatab[\w\-\s]+)/i, /lenovo\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i], [e, [r, "Lenovo"], [n, f]], [/(?:maemo|nokia).*(n900|lumia\s\d+)/i, /nokia[\s_-]?([\w\.-]*)/i], [[e, /_/g, " "], [r, "Nokia"], [n, d]], [/droid.+;\s(pixel\sc)[\s)]/i], [e, [r, "Google"], [n, f]], [/droid.+;\s(pixel[\s\daxl]{0,6})(?:\sbuild|\))/i], [e, [r, "Google"], [n, d]], [/droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [e, [r, "Sony"], [n, d]], [/sony\stablet\s[ps]\sbuild\//i, /(?:sony)?sgp\w+(?:\sbuild\/|\))/i], [[e, "Xperia Tablet"], [r, "Sony"], [n, f]], [/\s(kb2005|in20[12]5|be20[12][59])\b/i, /\ba000(1)\sbuild/i, /\boneplus\s(a\d{4})[\s)]/i], [e, [r, "OnePlus"], [n, d]], [/(alexa)webm/i, /(kf[a-z]{2}wi)(\sbuild\/|\))/i, /(kf[a-z]+)(\sbuild\/|\)).+silk\//i], [e, [r, "Amazon"], [n, f]], [/(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i], [[e, "Fire Phone"], [r, "Amazon"], [n, d]], [/\((playbook);[\w\s\),;-]+(rim)/i], [e, r, [n, f]], [/((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10;\s(\w+)/i], [e, [r, "BlackBerry"], [n, d]], [/(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus\s7|padfone|p00[cj])/i], [e, [r, "ASUS"], [n, f]], [/\s(z[es]6[027][01][km][ls]|zenfone\s\d\w?)\b/i], [e, [r, "ASUS"], [n, d]], [/(nexus\s9)/i], [e, [r, "HTC"], [n, f]], [/(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i], [r, [e, /_/g, " "], [n, d]], [/droid[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i], [e, [r, "Acer"], [n, f]], [/droid.+;\s(m[1-5]\snote)\sbuild/i, /\bmz-([\w-]{2,})/i], [e, [r, "Meizu"], [n, d]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i, /(microsoft);\s(lumia[\s\w]+)/i, /(lenovo)[_\s-]?([\w-]+)/i, /linux;.+(jolla);/i, /droid.+;\s(oppo)\s?([\w\s]+)\sbuild/i], [r, e, [n, d]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i, /[;\/]\s?(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbuild/i, /[;\/]\s?(trinity)[\-\s]*(t\d{3})\sbuild/i, /\b(gigaset)[\s\-]+(q\w{1,9})\sbuild/i, /\b(vodafone)\s([\w\s]+)(?:\)|\sbuild)/i], [r, e, [n, f]], [/\s(surface\sduo)\s/i], [e, [r, "Microsoft"], [n, f]], [/droid\s[\d\.]+;\s(fp\du?)\sbuild/i], [e, [r, "Fairphone"], [n, d]], [/\s(u304aa)\sbuild/i], [e, [r, "AT&T"], [n, d]], [/sie-(\w*)/i], [e, [r, "Siemens"], [n, d]], [/[;\/]\s?(rct\w+)\sbuild/i], [e, [r, "RCA"], [n, f]], [/[;\/\s](venue[\d\s]{2,7})\sbuild/i], [e, [r, "Dell"], [n, f]], [/[;\/]\s?(q(?:mv|ta)\w+)\sbuild/i], [e, [r, "Verizon"], [n, f]], [/[;\/]\s(?:barnes[&\s]+noble\s|bn[rt])([\w\s\+]*)\sbuild/i], [e, [r, "Barnes & Noble"], [n, f]], [/[;\/]\s(tm\d{3}\w+)\sbuild/i], [e, [r, "NuVision"], [n, f]], [/;\s(k88)\sbuild/i], [e, [r, "ZTE"], [n, f]], [/;\s(nx\d{3}j)\sbuild/i], [e, [r, "ZTE"], [n, d]], [/[;\/]\s?(gen\d{3})\sbuild.*49h/i], [e, [r, "Swiss"], [n, d]], [/[;\/]\s?(zur\d{3})\sbuild/i], [e, [r, "Swiss"], [n, f]], [/[;\/]\s?((zeki)?tb.*\b)\sbuild/i], [e, [r, "Zeki"], [n, f]], [/[;\/]\s([yr]\d{2})\sbuild/i, /[;\/]\s(dragon[\-\s]+touch\s|dt)(\w{5})\sbuild/i], [[r, "Dragon Touch"], e, [n, f]], [/[;\/]\s?(ns-?\w{0,9})\sbuild/i], [e, [r, "Insignia"], [n, f]], [/[;\/]\s?((nxa|Next)-?\w{0,9})\sbuild/i], [e, [r, "NextBook"], [n, f]], [/[;\/]\s?(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05]))\sbuild/i], [[r, "Voice"], e, [n, d]], [/[;\/]\s?(lvtel\-)?(v1[12])\sbuild/i], [[r, "LvTel"], e, [n, d]], [/;\s(ph-1)\s/i], [e, [r, "Essential"], [n, d]], [/[;\/]\s?(v(100md|700na|7011|917g).*\b)\sbuild/i], [e, [r, "Envizen"], [n, f]], [/[;\/]\s?(trio[\s\w\-\.]+)\sbuild/i], [e, [r, "MachSpeed"], [n, f]], [/[;\/]\s?tu_(1491)\sbuild/i], [e, [r, "Rotor"], [n, f]], [/(shield[\w\s]+)\sbuild/i], [e, [r, "Nvidia"], [n, f]], [/(sprint)\s(\w+)/i], [r, e, [n, d]], [/(kin\.[onetw]{3})/i], [[e, /\./g, " "], [r, "Microsoft"], [n, d]], [/droid\s[\d\.]+;\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [e, [r, "Zebra"], [n, f]], [/droid\s[\d\.]+;\s(ec30|ps20|tc[2-8]\d[kx])\)/i], [e, [r, "Zebra"], [n, d]], [/\s(ouya)\s/i, /(nintendo)\s([wids3utch]+)/i], [r, e, [n, u]], [/droid.+;\s(shield)\sbuild/i], [e, [r, "Nvidia"], [n, u]], [/(playstation\s[345portablevi]+)/i], [e, [r, "Sony"], [n, u]], [/[\s\(;](xbox(?:\sone)?(?!;\sxbox))[\s\);]/i], [e, [r, "Microsoft"], [n, u]], [/smart-tv.+(samsung)/i], [r, [n, p]], [/hbbtv.+maple;(\d+)/i], [[e, /^/, "SmartTV"], [r, "Samsung"], [n, p]], [/(?:linux;\snetcast.+smarttv|lg\snetcast\.tv-201\d)/i], [[r, "LG"], [n, p]], [/(apple)\s?tv/i], [r, [e, "Apple TV"], [n, p]], [/crkey/i], [[e, "Chromecast"], [r, "Google"], [n, p]], [/droid.+aft([\w])(\sbuild\/|\))/i], [e, [r, "Amazon"], [n, p]], [/\(dtv[\);].+(aquos)/i], [e, [r, "Sharp"], [n, p]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i], [[r, v.trim], [e, v.trim], [n, p]], [/[\s\/\(](android\s|smart[-\s]?|opera\s)tv[;\)\s]/i], [[n, p]], [/((pebble))app\/[\d\.]+\s/i], [r, e, [n, g]], [/droid.+;\s(glass)\s\d/i], [e, [r, "Google"], [n, g]], [/droid\s[\d\.]+;\s(wt63?0{2,3})\)/i], [e, [r, "Zebra"], [n, g]], [/(tesla)(?:\sqtcarbrowser|\/20[12]\d\.[\w\.-]+)/i], [r, [n, m]], [/droid .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i], [e, [n, d]], [/droid .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i], [e, [n, f]], [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i], [[n, v.lowerize]], [/(android[\w\.\s\-]{0,9});.+build/i], [e, [r, "Generic"]], [/(phone)/i], [[n, d]]],
                            engine: [[/windows.+\sedge\/([\w\.]+)/i], [s, [t, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [s, [t, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [t, s], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [s, t]],
                            os: [[/microsoft\s(windows)\s(vista|xp)/i], [t, s], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)(?!.+xbox)/i], [t, [s, y.str, b.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[t, "Windows"], [s, y.str, b.os.windows.version]], [/ip[honead]{2,4}\b(?:.*os\s([\w]+)\slike\smac|;\sopera)/i, /cfnetwork\/.+darwin/i], [[s, /_/g, "."], [t, "iOS"]], [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)(?!.+haiku)/i], [[t, "Mac OS"], [s, /_/g, "."]], [/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/\s]([\w\.]+)/i, /\((series40);/i], [t, s], [/\(bb(10);/i], [s, [t, "BlackBerry"]], [/(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i], [s, [t, "Symbian"]], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[t, "Firefox OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [s, [t, "webOS"]], [/crkey\/([\d\.]+)/i], [s, [t, "Chromecast"]], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[t, "Chromium OS"], s], [/(nintendo|playstation)\s([wids345portablevuch]+)/i, /(xbox);\s+xbox\s([^\);]+)/i, /(mint)[\/\s\(\)]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\sgnu\/linux)?(?:\slinux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i, /\s([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku)\s(\w+)/i], [t, s], [/(sunos)\s?([\w\.\d]*)/i], [[t, "Solaris"], s], [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, /(unix)\s?([\w\.]*)/i], [t, s]]
                        };
                        o.VERSION = "0.7.28",
                        o.BROWSER = {
                            NAME: t,
                            MAJOR: "major",
                            VERSION: s
                        },
                        o.CPU = {
                            ARCHITECTURE: c
                        },
                        o.DEVICE = {
                            MODEL: e,
                            VENDOR: r,
                            TYPE: n,
                            CONSOLE: u,
                            MOBILE: d,
                            SMARTTV: p,
                            TABLET: f,
                            WEARABLE: g,
                            EMBEDDED: m
                        },
                        o.ENGINE = {
                            NAME: t,
                            VERSION: s
                        },
                        o.OS = {
                            NAME: t,
                            VERSION: s
                        },
                        (Hu = Ku.exports ? Ku.exports = o : Hu).UAParser = o;
                        var w, A = void 0 !== i && (i.jQuery || i.Zepto);
                        A && !A.ua && (w = new o,
                        A.ua = w.getResult(),
                        A.ua.get = function() {
                            return w.getUA()
                        }
                        ,
                        A.ua.set = function(e) {
                            w.setUA(e);
                            var t, n = w.getResult();
                            for (t in n)
                                A.ua[t] = n[t]
                        }
                        )
                    }
                    )("object" == typeof window ? window : je);
                    var Wu, $u = q.exports, Yu = {
                        exports: {}
                    };
                    Wu = Yu,
                    q = "undefined" != typeof self ? self : "undefined" != typeof window ? window : je,
                    Wu.exports = function(t) {
                        function n(e) {
                            if (e.length < 2)
                                return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? d(192 | t >>> 6) + d(128 | 63 & t) : d(224 | t >>> 12 & 15) + d(128 | t >>> 6 & 63) + d(128 | 63 & t);
                            var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                            return d(240 | t >>> 18 & 7) + d(128 | t >>> 12 & 63) + d(128 | t >>> 6 & 63) + d(128 | 63 & t)
                        }
                        function r(e) {
                            var t = [0, 2, 1][e.length % 3]
                              , e = e.charCodeAt(0) << 16 | (1 < e.length ? e.charCodeAt(1) : 0) << 8 | (2 < e.length ? e.charCodeAt(2) : 0);
                            return [u.charAt(e >>> 18), u.charAt(e >>> 12 & 63), 2 <= t ? "=" : u.charAt(e >>> 6 & 63), 1 <= t ? "=" : u.charAt(63 & e)].join("")
                        }
                        function i(e) {
                            return f(h(String(e)))
                        }
                        function c(e) {
                            return e.replace(/[+\/]/g, function(e) {
                                return "+" == e ? "-" : "_"
                            }).replace(/=/g, "")
                        }
                        function o(e, t) {
                            return t ? c(i(e)) : i(e)
                        }
                        var e, a = (t = t || {}).Base64, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = function(e) {
                            for (var t = {}, n = 0, r = e.length; n < r; n++)
                                t[e.charAt(n)] = n;
                            return t
                        }(u), d = String.fromCharCode, l = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, h = function(e) {
                            return e.replace(l, n)
                        }, f = t.btoa && "function" == typeof t.btoa ? function(e) {
                            return t.btoa(e)
                        }
                        : function(e) {
                            if (e.match(/[^\x00-\xFF]/))
                                throw new RangeError("The string contains invalid characters.");
                            return e.replace(/[\s\S]{1,3}/g, r)
                        }
                        ;
                        t.Uint8Array && (e = function(e, t) {
                            for (var n = "", r = 0, i = e.length; r < i; r += 3) {
                                var o = e[r]
                                  , a = e[r + 1]
                                  , s = e[r + 2]
                                  , o = o << 16 | a << 8 | s;
                                n += u.charAt(o >>> 18) + u.charAt(o >>> 12 & 63) + (void 0 !== a ? u.charAt(o >>> 6 & 63) : "=") + (void 0 !== s ? u.charAt(63 & o) : "=")
                            }
                            return t ? c(n) : n
                        }
                        );
                        function p(e) {
                            switch (e.length) {
                            case 4:
                                var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
                                return d(55296 + (t >>> 10)) + d(56320 + (1023 & t));
                            case 3:
                                return d((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                            default:
                                return d((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
                            }
                        }
                        function g(e) {
                            var t = e.length
                              , n = t % 4
                              , e = (0 < t ? s[e.charAt(0)] << 18 : 0) | (1 < t ? s[e.charAt(1)] << 12 : 0) | (2 < t ? s[e.charAt(2)] << 6 : 0) | (3 < t ? s[e.charAt(3)] : 0);
                            return (e = [d(e >>> 16), d(e >>> 8 & 255), d(255 & e)]).length -= [0, 0, 2, 1][n],
                            e.join("")
                        }
                        function m(e) {
                            return A(String(e).replace(/[^A-Za-z0-9\+\/]/g, ""))
                        }
                        function v(e) {
                            return String(e).replace(/[-_]/g, function(e) {
                                return "-" == e ? "+" : "/"
                            }).replace(/[^A-Za-z0-9\+\/]/g, "")
                        }
                        function y(e) {
                            return e = v(e),
                            w(A(e))
                        }
                        var b, _ = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g, w = function(e) {
                            return e.replace(_, p)
                        }, A = t.atob && "function" == typeof t.atob ? function(e) {
                            return t.atob(e)
                        }
                        : function(e) {
                            return e.replace(/\S{1,4}/g, g)
                        }
                        ;
                        t.Uint8Array && (b = function(e) {
                            return Uint8Array.from(m(v(e)), function(e) {
                                return e.charCodeAt(0)
                            })
                        }
                        );
                        var E;
                        return t.Base64 = {
                            VERSION: "2.6.4",
                            atob: m,
                            btoa: f,
                            fromBase64: y,
                            toBase64: o,
                            utob: h,
                            encode: o,
                            encodeURI: function(e) {
                                return o(e, !0)
                            },
                            btou: w,
                            decode: y,
                            noConflict: function() {
                                var e = t.Base64;
                                return t.Base64 = a,
                                e
                            },
                            fromUint8Array: e,
                            toUint8Array: b
                        },
                        "function" == typeof Object.defineProperty && (E = function(e) {
                            return {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }
                        ,
                        t.Base64.extendString = function() {
                            Object.defineProperty(String.prototype, "fromBase64", E(function() {
                                return y(this)
                            })),
                            Object.defineProperty(String.prototype, "toBase64", E(function(e) {
                                return o(this, e)
                            })),
                            Object.defineProperty(String.prototype, "toBase64URI", E(function() {
                                return o(this, !0)
                            }))
                        }
                        ),
                        t.Meteor && (Base64 = t.Base64),
                        Wu.exports && (Wu.exports.Base64 = t.Base64),
                        {
                            Base64: t.Base64
                        }
                    }(q);
                    var Qu = {
                        Rewarded: "rewarded",
                        Interstitial: "interstitial",
                        Preroll: "interstitial",
                        Midroll: "interstitial",
                        Display: "display"
                    };
                    function Ju(e, t) {
                        for (var n in t)
                            t.hasOwnProperty(n) && null !== t[n] && void 0 !== t[n] && (e[n] = t[n]);
                        return e
                    }
                    function Zu(e, t) {
                        t = t || window.location.href,
                        t = new RegExp("[?&]" + e + "=([^&#]*)","i").exec(t);
                        return t ? t[1] : null
                    }
                    function Xu() {
                        for (var e, t = /\+/g, n = /([^&=]+)=?([^&]*)/g, r = function(e) {
                            return decodeURIComponent(e.toLowerCase().replace(t, " "))
                        }, i = window.location.search.substring(1), o = {}; e = n.exec(i); )
                            o[r(e[1])] = r(e[2]);
                        return o
                    }
                    function ed(e) {
                        for (; function e(t) {
                            return (t = t || "") !== decodeURIComponent(t)
                        }(e); )
                            e = decodeURIComponent(e);
                        return e
                    }
                    function td(o, a, s) {
                        return new Promise(function(e, t) {
                            var n, r, i;
                            s && s.exists && s.exists() ? e() : (r = (n = s && s.alternates && 0 < s.alternates.length ? function(e) {
                                if (e && e.length) {
                                    var t = document.querySelectorAll("script");
                                    if (t)
                                        for (var n in t) {
                                            n = t[n];
                                            if (e.includes(n.src))
                                                return n
                                        }
                                }
                            }(s.alternates) : void 0) || document.createElement("script"),
                            i = s && s.error_prefix ? s.error_prefix : "Failed:",
                            r.onload = function() {
                                s && s.exists && !s.exists() ? t("".concat(i, " ").concat(o)) : e()
                            }
                            ,
                            r.onerror = function() {
                                t("".concat(i, " ").concat(o))
                            }
                            ,
                            n || (r.type = "text/javascript",
                            !0 === s.defer ? r.defer = !0 : r.async = !0,
                            r.src = o,
                            r.id = a,
                            document.head.appendChild(r)))
                        }
                        )
                    }
                    function nd() {
                        var e = 0
                          , t = window;
                        try {
                            for (; t != t.parent; )
                                e++,
                                t = t.parent
                        } catch (e) {}
                        return e
                    }
                    function rd(e, t) {
                        return function e(t) {
                            return localStorage.getItem(t)
                        }(e) ? "true" === (e = localStorage.getItem(e)) || !0 === e || 1 === e || "1" === e : t
                    }
                    function id(e) {
                        localStorage.removeItem(e)
                    }
                    function od(e, t) {
                        localStorage.setItem(e, t)
                    }
                    var ad = function() {
                        var e = Date.now();
                        try {
                            return localStorage.setItem(e, e),
                            localStorage.removeItem(e),
                            !0
                        } catch (e) {
                            return !1
                        }
                    }()
                      , sd = Date.now()
                      , cd = {
                        console: !1
                    };
                    function ud(e, t, n) {
                        try {
                            var r, i;
                            (ad && rd("gd_debug_ex") || cd && !0 === cd.console) && (r = "error" === n ? "background: #c4161e; color: #fff" : "warning" === n ? "background: #ff8c1c; color: #fff" : "info" === n ? "background: #ff0080; color: #fff" : "background: #44a5ab; color: #fff",
                            i = console.log("[" + (Date.now() - sd) / 1e3 + "s]%c %c %c gdsdk %c %c %c " + e + " ", "background: #9854d8", "background: #6c2ca7", "color: #fff; background: #450f78;", "background: #6c2ca7", "background: #9854d8", r, void 0 !== t ? t : ""),
                            console.log.apply(console, i))
                        } catch (e) {
                            console.log(e)
                        }
                    }
                    var dd = ["SDK_READY", "SDK_ERROR", "SDK_LB_LOGIN", "SDK_SHW_LB", "SDK_GAME_START", "SDK_GAME_PAUSE", "SDK_GDPR_TRACKING", "SDK_GDPR_TARGETING", "SDK_GDPR_THIRD_PARTY", "AD_SDK_MANAGER_READY", "AD_SDK_CANCELED", "AD_IS_ALREADY_RUNNING"]
                      , ld = ["AD_ERROR", "AD_BREAK_READY", "AD_METADATA", "ALL_ADS_COMPLETED", "CLICK", "COMPLETE", "CONTENT_PAUSE_REQUESTED", "CONTENT_RESUME_REQUESTED", "DURATION_CHANGE", "FIRST_QUARTILE", "IMPRESSION", "INTERACTION", "LINEAR_CHANGED", "LOADED", "LOG", "MIDPOINT", "PAUSED", "RESUMED", "SKIPPABLE_STATE_CHANGED", "SKIPPED", "STARTED", "THIRD_QUARTILE", "USER_CLOSE", "VOLUME_CHANGED", "VOLUME_MUTED", "DISPLAYAD_IMPRESSION", "DISPLAYAD_ERROR"]
                      , hd = 1010
                      , fd = 1020
                      , pd = 1100
                      , gd = null
                      , md = (Wn(Rd, [{
                        key: "_getListenerIdx",
                        value: function(e, t, n) {
                            var r, i = this.listeners[e], o = -1;
                            if (!i || 0 === i.length)
                                return o;
                            for (r = 0; r < i.length; r++)
                                if (i[r].callback === t && (!n || n === i[r].scope)) {
                                    o = r;
                                    break
                                }
                            return o
                        }
                    }, {
                        key: "subscribe",
                        value: function(e, t, n) {
                            if (!e)
                                throw new Error("Event name cannot be null or undefined.");
                            if (!t || "function" != typeof t)
                                throw new Error("Listener must be of type function.");
                            0 <= this._getListenerIdx(e, t, n) ? console.log(e, n) : (n = {
                                callback: t,
                                scope: n
                            },
                            this.listeners[e] = this.listeners[e] || [],
                            this.listeners[e].push(n))
                        }
                    }, {
                        key: "unsubscribeScope",
                        value: function(e) {
                            for (var t = Object.keys(this.listeners), n = 0; n < t.length; n++) {
                                for (var r = t[n], i = this.listeners[r], o = 0; o < i.length; o++)
                                    i[o].scope === e && (i.splice(o, 1),
                                    o--);
                                0 === i.length && delete this.listeners[r]
                            }
                        }
                    }, {
                        key: "broadcast",
                        value: function(e, t) {
                            var n = this.listeners[e];
                            e && this.listeners[e] && ((t = t || {}).name = t.name || e,
                            n.forEach(function(e) {
                                e.callback.call(e.scope, t, e.scope)
                            }))
                        }
                    }, {
                        key: "printScope",
                        value: function(e) {
                            for (var t = Object.keys(this.listeners), n = 0; n < t.length; n++)
                                for (var r = t[n], i = this.listeners[r], o = 0; o < i.length; o++)
                                    i[o].scope === e && console.log(r, e)
                        }
                    }]),
                    Rd)
                      , vd = (Wn(Td, [{
                        key: "transform",
                        value: function(e, t) {
                            e = ju(e);
                            return this.transformValue(e, t)
                        }
                    }, {
                        key: "transformValue",
                        value: function(t, e) {
                            if (Mu(t) || zu(t))
                                for (var n in t)
                                    t[n] = this.transformValue(t[n], e);
                            else if ("string" == typeof (c = t) || "object" == typeof c && (Fu ? function(e) {
                                try {
                                    return Nu.call(e),
                                    !0
                                } catch (e) {
                                    return !1
                                }
                            }(c) : "[object String]" === Gu.call(c))) {
                                var r, i, o, a = /\{\{(\w+)\}\}/g, s = [];
                                do {} while ((r = a.exec(t)) && (r[0],
                                i = r[1],
                                void 0 !== (o = this.getMacroKeyValue(i, e)) && s.push({
                                    key: i,
                                    value: o
                                })),
                                r);
                                0 < s.length && s.forEach(function(e) {
                                    t = t.replace(new RegExp("{{" + e.key + "}}","g"), e.value)
                                })
                            }
                            var c;
                            return t
                        }
                    }, {
                        key: "getMacroKeyValue",
                        value: function(e, t) {
                            switch (e) {
                            case "CACHEBUSTER":
                                return Date.now();
                            case "GAME_ID":
                                return this.game.gameId;
                            case "GAME_TITLE":
                                return this.game.title;
                            case "COUNTRY_CODE":
                                return this.game.ctry;
                            case "PAGE_URL":
                                return this.bridge.parentURL;
                            case "PAGE_URL_ESC":
                                return encodeURIComponent(this.bridge.parentURL);
                            case "PAGE_URL_ESC_ESC":
                                return encodeURIComponent(encodeURIComponent(this.bridge.parentURL));
                            case "DOMAIN_MATCHED":
                                return this.bridge.domainMatched ? 1 : 0;
                            case "DOMAIN_PARENT":
                                return this.bridge.parentDomain;
                            case "DOMAIN_TOP":
                                return this.bridge.topDomain;
                            case "DEPTH":
                            case "GAME_DEPTH":
                                return this.bridge.depth;
                            default:
                                if (t && Uu(t.get))
                                    return t.get(e)
                            }
                        }
                    }]),
                    Td)
                      , yd = (Wn(Dd, [{
                        key: "send",
                        value: function(e, t) {
                            if (!this._config.isCoreSDKMode) {
                                var n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                                  , r = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                                r -= r % 64,
                                this._size = "".concat(n -= n % 64, " x ").concat(r);
                                r = this._topic_counter[e] || 0;
                                this._topic_counter[e] = ++r;
                                t = {
                                    gmid: this._config.gameId,
                                    tdmn: this._config.topDomain,
                                    domn: this._config.domain,
                                    rfrr: this._config.referrer,
                                    lthr: this._config.hours,
                                    ctry: this._config.country,
                                    dpth: this._config.depth,
                                    vers: this._config.version,
                                    trac: this._config.tracking,
                                    whlb: this._config.whitelabel,
                                    plat: this._config.platform,
                                    tpct: r,
                                    args: t,
                                    ttle: document.title,
                                    size: this._size,
                                    brnm: this._ua.browser.name,
                                    brmj: this._ua.browser.major,
                                    osnm: this._ua.os.name,
                                    osvr: this._ua.os.version,
                                    dvmd: this._ua.device.model,
                                    byld: this._config.byloader,
                                    bylv: this._config.byloaderVersion,
                                    imgu: this._config.isMasterGameURL,
                                    iegu: this._config.isExtHostedGameURL,
                                    itgu: this._config.isTokenGameURL,
                                    cmpe: !1,
                                    host: window.location.hostname
                                };
                                "undefined" != typeof idhb && void 0 !== idhb.iabCmpExists() && (t.cmpe = idhb.iabCmpExists());
                                try {
                                    t = encodeURIComponent(Yu.exports.Base64.encode(JSON.stringify([t]))),
                                    fetch(this._url + "?tp=com.gdsdk.".concat(e, "&ar=").concat(t, "&ts=").concat(Date.now()))
                                } catch (e) {}
                            }
                        }
                    }, {
                        key: "setGameData",
                        value: function(e) {
                            this._gameData = e,
                            this._config.country = e.ctry
                        }
                    }]),
                    Dd)
                      , bd = null
                      , _d = (Wn(Sd, [{
                        key: "start",
                        value: function() {
                            var e = "\n            #gdsdk__console_container {\n                display: flex;\n                box-sizing: border-box;\n                padding: 3px;\n                background: linear-gradient(90deg,#3d1b5d,#5c3997);\n                box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);\n                color: #fff;\n                font-family: Helvetica, Arial, sans-serif;\n                font-size: 8px;\n            }\n            #gdsdk__console_container button {\n                flex: 1;\n                background: #44a5ab;\n                padding: 3px 10px;\n                margin: 2px;\n                border: 0;\n                border-radius: 3px;\n                color: #fff;\n                outline: 0;\n                cursor: pointer;\n                font-size: 8px;\n                box-shadow: 0 0 0 transparent;\n                text-shadow: 0 0 0 transparent;\n                text-overflow: ellipsis;\n                overflow: hidden;\n                white-space: nowrap;\n            }\n            #gdsdk__console_container button:hover {\n                background: #4fb3b9;\n            }\n            #gdsdk__console_container button:active {\n                background: #62bbc0;\n            }\n        "
                              , t = document.head || document.getElementsByTagName("head")[0]
                              , n = document.createElement("style");
                            n.type = "text/css",
                            n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e)),
                            t.appendChild(n);
                            var r = document.body || document.getElementsByTagName("body")[0]
                              , i = document.createElement("div");
                            i.id = "gdsdk__console",
                            i.style.position = "fixed",
                            i.style.zIndex = pd,
                            i.style.bottom = "0",
                            i.style.left = "0",
                            i.style.width = "100%",
                            i.innerHTML = '\n            <div id="gdsdk__console_container">\n                <button id="gdsdk__hbgdDebug">Activate hbgd debug</button>\n                <button id="gdsdk__hbgdConfig">Log idhb config</button>\n                \x3c!--\n                <button id="gdsdk__resumeGame">Resume</button>\n                <button id="gdsdk__pauseGame">Pause</button>\n                --\x3e\n                <button id="gdsdk__showLeaderboard">LeaderBoard</button>\n                <button id="gdsdk__showInterstitial">Interstitial</button>\n                <button id="gdsdk__showRewarded">Rewarded</button>\n                \x3c!--\n                <button id="gdsdk__preloadRewarded">Preload rewarded</button>\n                --\x3e\n                <button id="gdsdk__cancel">Cancel</button>\n                <button id="gdsdk__demo">Demo VAST tag</button>\n                <button id="gdsdk__disableMidrollTimer">Disable delay</button>\n                <button id="gdsdk__closeDebug">Close</button>\n            </div>\n        ',
                            r.appendChild(i);
                            var o = document.getElementById("gdsdk__showLeaderboard")
                              , a = document.getElementById("gdsdk__showInterstitial")
                              , s = document.getElementById("gdsdk__showRewarded")
                              , c = document.getElementById("gdsdk__cancel")
                              , e = document.getElementById("gdsdk__demo")
                              , t = document.getElementById("gdsdk__disableMidrollTimer")
                              , n = document.getElementById("gdsdk__hbgdDebug")
                              , r = document.getElementById("gdsdk__hbgdConfig")
                              , i = document.getElementById("gdsdk__closeDebug");
                            rd("gd_tag") ? (e.innerHTML = "Revert Vast tag",
                            e.style.background = "#ff8c1c") : (e.innerHTML = "Demo VAST tag",
                            e.style.background = "#44a5ab"),
                            rd("gd_disable_midroll_timer") ? (t.innerHTML = "Revert delay",
                            t.style.background = "#ff8c1c") : (t.innerHTML = "Disable delay",
                            t.style.background = "#44a5ab"),
                            rd("gd_hb_debug") ? (n.innerHTML = "Revert HB Debug",
                            n.style.background = "#ff8c1c") : (n.innerHTML = "HB Debug",
                            n.style.background = "#44a5ab"),
                            o.addEventListener("click", function() {
                                window.gdsdk.showLeaderBoard().catch(function(e) {})
                            }),
                            a.addEventListener("click", function() {
                                window.gdsdk.showAd(Qu.Interstitial).catch(function(e) {})
                            }),
                            s.addEventListener("click", function() {
                                window.gdsdk.showAd(Qu.Rewarded).catch(function(e) {})
                            }),
                            c.addEventListener("click", function() {
                                window.gdsdk.cancelAd().then(function(e) {}).catch(function(e) {})
                            }),
                            e.addEventListener("click", function() {
                                try {
                                    rd("gd_tag") ? id("gd_tag") : od("gd_tag", !0),
                                    location.reload()
                                } catch (e) {
                                    console.log(e)
                                }
                            }),
                            t.addEventListener("click", function() {
                                try {
                                    rd("gd_disable_midroll_timer") ? id("gd_disable_midroll_timer") : od("gd_disable_midroll_timer", !0),
                                    location.reload()
                                } catch (e) {
                                    console.log(e)
                                }
                            }),
                            i.addEventListener("click", function() {
                                try {
                                    rd("gd_debug_ex") ? id("gd_debug_ex") : od("gd_debug_ex", !0),
                                    location.reload()
                                } catch (e) {
                                    console.log(e)
                                }
                            }),
                            n.addEventListener("click", function() {
                                try {
                                    rd("gd_hb_debug") ? id("gd_hb_debug") : od("gd_hb_debug", !0),
                                    window.idhb && window.idhb.debug(!(!ad || !rd("gd_hb_debug"))),
                                    location.reload()
                                } catch (e) {
                                    console.log(e)
                                }
                            }),
                            r.addEventListener("click", function() {
                                try {
                                    var e = window.idhb.getConfig();
                                    console.info(e)
                                } catch (e) {
                                    console.log(e)
                                }
                            })
                        }
                    }]),
                    Sd)
                      , wd = (Wn(xd, [{
                        key: "_getFakeCustomParams",
                        value: function() {
                            var e, t = {
                                _vid: ["bla_bla1", "bla_bla2", "bla_bla3"],
                                _1ld: ["1ld_1", "1ld_2", "1ld_3", "1ld_4"],
                                _1lp: ["1lp_1", "1lp_2"]
                            }, n = {};
                            for (e in t) {
                                var r = t[e];
                                n[e] = r[Math.floor(Math.random() * r.length)]
                            }
                            return n
                        }
                    }, {
                        key: "checkCustomParams",
                        value: function() {
                            try {
                                var e = {};
                                if (this.gameData.diagnostic && this.gameData.diagnostic.cp && this.gameData.diagnostic.cp.enabled) {
                                    var t, n = new Lu(location.href,!0);
                                    for (t in n.query)
                                        e[t] = n.query[t];
                                    return Object.keys(e).length,
                                    e
                                }
                            } catch (e) {
                                console.log("_checkCustomParams.Error", e)
                            }
                        }
                    }]),
                    xd)
                      , Ad = (Wn(kd, [{
                        key: "show",
                        value: function() {
                            this.adResumeButton.style.display = "block",
                            this.adResumeButtonOverlay.style.display = "block"
                        }
                    }, {
                        key: "hide",
                        value: function() {
                            this.adResumeButton.style.display = "none",
                            this.adResumeButtonOverlay.style.display = "none"
                        }
                    }, {
                        key: "add",
                        value: function() {
                            var e = this;
                            try {
                                var t = document.createElement("div");
                                (this.adResumeButton = t).id = "gd__resume__button",
                                t.setAttribute("title", "Resume"),
                                this.addStyles(),
                                t.classList.add("gd__resume__button"),
                                t.addEventListener("click", function() {
                                    p(this, e),
                                    this.onResume()
                                }
                                .bind(this)),
                                this.adContainer.appendChild(t);
                                var n = document.createElement("div");
                                (this.adResumeButtonOverlay = n).id = "gd__resume__button__overlay",
                                n.classList.add("gd__resume__button__overlay"),
                                this.adContainer.appendChild(n)
                            } catch (e) {
                                console.log("Resume button add error", e)
                            }
                        }
                    }, {
                        key: "addStyles",
                        value: function() {
                            var e = document.body || document.getElementsByTagName("body")[0];
                            this.addStylesheet("gd__resume__button__style", e, '\n                        .gd__resume__button{\n                          background-image: url("https://img.gamedistribution.com/play-black.svg");\n                          background-color:white;                      \n                          width: 120px;\n                          height: 120px;\n                          position: absolute;\n                          display: none;\n                          z-index: 2000;\n                          cursor: pointer;\n                          top: calc(50% - 60px);\n                          left: calc(50% - 60px);\n                          margin: 0;\n                          border-radius: 50%;\n                          border: 2px solid white;\n                          animation: play-button 1s ease-in-out infinite alternate;\n                          -webkit-animation: play-button 1s ease-in-out infinite alternate;\n                        }\n    \n                        .gd__resume__button__overlay {\n                          position: fixed;\n                          display: none;\n                          width: 100%;\n                          height: 100%;\n                          top: 0;\n                          left: 0;\n                          right: 0;\n                          bottom: 0;\n                          background-color: rgba(0,0,0,0.5);\n                          z-index: 1999;\n                          cursor: pointer;\n                        }\n                        @keyframes play-button {\n                          0% {\n                              transform: scale(1.0);\n                              -webkit-transform: scale(1.0);\n                          }\n                          100% {\n                              transform: scale(1.1);\n                              -webkit-transform: scale(1.1);\n                          }\n                      }\n                        .gd__resume__button:hover{\n                          filter: invert(100%) sepia(51%) saturate(0%) hue-rotate(346deg) brightness(104%) contrast(100%);                      \n                        }\n                        ')
                        }
                    }, {
                        key: "addStylesheet",
                        value: function(e, t, n) {
                            var r;
                            document.getElementById(e) || ((r = document.createElement("style")).type = "text/css",
                            r.id = e,
                            r.styleSheet ? r.styleSheet.cssText = n : r.appendChild(document.createTextNode(n)),
                            t.appendChild(r))
                        }
                    }]),
                    kd)
                      , Ed = (new Blob([new Uint8Array([255, 227, 24, 196, 0, 0, 0, 3, 72, 1, 64, 0, 0, 4, 132, 16, 31, 227, 192, 225, 76, 255, 67, 12, 255, 221, 27, 255, 228, 97, 73, 63, 255, 195, 131, 69, 192, 232, 223, 255, 255, 207, 102, 239, 255, 255, 255, 101, 158, 206, 70, 20, 59, 255, 254, 95, 70, 149, 66, 4, 16, 128, 0, 2, 2, 32, 240, 138, 255, 36, 106, 183, 255, 227, 24, 196, 59, 11, 34, 62, 80, 49, 135, 40, 0, 253, 29, 191, 209, 200, 141, 71, 7, 255, 252, 152, 74, 15, 130, 33, 185, 6, 63, 255, 252, 195, 70, 203, 86, 53, 15, 255, 255, 247, 103, 76, 121, 64, 32, 47, 255, 34, 227, 194, 209, 138, 76, 65, 77, 69, 51, 46, 57, 55, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 255, 227, 24, 196, 73, 13, 153, 210, 100, 81, 135, 56, 0, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170])],{
                        type: "audio/mpeg"
                    }),
                    new Blob([new Uint8Array([0, 0, 0, 28, 102, 116, 121, 112, 105, 115, 111, 109, 0, 0, 2, 0, 105, 115, 111, 109, 105, 115, 111, 50, 109, 112, 52, 49, 0, 0, 0, 8, 102, 114, 101, 101, 0, 0, 2, 239, 109, 100, 97, 116, 33, 16, 5, 32, 164, 27, 255, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 167, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 33, 16, 5, 32, 164, 27, 255, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 167, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 2, 194, 109, 111, 111, 118, 0, 0, 0, 108, 109, 118, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 232, 0, 0, 0, 47, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 236, 116, 114, 97, 107, 0, 0, 0, 92, 116, 107, 104, 100, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 101, 100, 116, 115, 0, 0, 0, 28, 101, 108, 115, 116, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 47, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 100, 109, 100, 105, 97, 0, 0, 0, 32, 109, 100, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 68, 0, 0, 8, 0, 85, 196, 0, 0, 0, 0, 0, 45, 104, 100, 108, 114, 0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0, 0, 0, 1, 15, 109, 105, 110, 102, 0, 0, 0, 16, 115, 109, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 100, 105, 110, 102, 0, 0, 0, 28, 100, 114, 101, 102, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1, 0, 0, 0, 211, 115, 116, 98, 108, 0, 0, 0, 103, 115, 116, 115, 100, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 87, 109, 112, 52, 97, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 16, 0, 0, 0, 0, 172, 68, 0, 0, 0, 0, 0, 51, 101, 115, 100, 115, 0, 0, 0, 0, 3, 128, 128, 128, 34, 0, 2, 0, 4, 128, 128, 128, 20, 64, 21, 0, 0, 0, 0, 1, 244, 0, 0, 1, 243, 249, 5, 128, 128, 128, 2, 18, 16, 6, 128, 128, 128, 1, 2, 0, 0, 0, 24, 115, 116, 116, 115, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 28, 115, 116, 115, 99, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 28, 115, 116, 115, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 115, 0, 0, 1, 116, 0, 0, 0, 20, 115, 116, 99, 111, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 44, 0, 0, 0, 98, 117, 100, 116, 97, 0, 0, 0, 90, 109, 101, 116, 97, 0, 0, 0, 0, 0, 0, 0, 33, 104, 100, 108, 114, 0, 0, 0, 0, 0, 0, 0, 0, 109, 100, 105, 114, 97, 112, 112, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 105, 108, 115, 116, 0, 0, 0, 37, 169, 116, 111, 111, 0, 0, 0, 29, 100, 97, 116, 97, 0, 0, 0, 1, 0, 0, 0, 0, 76, 97, 118, 102, 53, 54, 46, 52, 48, 46, 49, 48, 49])],{
                        type: "video/mp4"
                    }));
                    function kd(e, t) {
                        Kn(this, kd),
                        this.adContainer = e,
                        this.onResume = t
                    }
                    function xd(e) {
                        Kn(this, xd),
                        this.gameData = e
                    }
                    function Sd(e) {
                        if (Kn(this, Sd),
                        bd)
                            return bd;
                        (bd = this).eventBus = new md,
                        this._sdk = e
                    }
                    function Dd(e) {
                        Kn(this, Dd),
                        this._config = e || {},
                        this._url = e.url || "json/ping.json?https://msgrt.gamedistribution.com/collect",
                        this._topic_counter = {},
                        this._ua = (new $u).getResult()
                    }
                    function Td(e) {
                        Kn(this, Td),
                        this.game = e.game,
                        this.bridge = e.bridge
                    }
                    function Rd() {
                        if (Kn(this, Rd),
                        gd)
                            return gd;
                        (gd = this).listeners = {}
                    }
                    function Od(e) {
                        return Object.assign({
                            muted: !1,
                            timeout: 250,
                            inline: !1
                        }, e)
                    }
                    function Cd(e, t) {
                        var r, n = e.muted, i = e.timeout, e = e.inline, t = t(), o = t.element, t = t.source, a = void 0, s = void 0;
                        return !0 === (o.muted = n) && o.setAttribute("muted", "muted"),
                        !0 === e && o.setAttribute("playsinline", "playsinline"),
                        o.src = t,
                        new Promise(function(n) {
                            a = o.play(),
                            r = setTimeout(function() {
                                s(!1, new Error("Timeout " + i + " ms has been reached"))
                            }, i),
                            s = function(e) {
                                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
                                o.remove(),
                                o.srcObject = null,
                                clearTimeout(r),
                                n({
                                    result: e,
                                    error: t
                                })
                            }
                            ,
                            void 0 !== a ? a.then(function() {
                                return s(!0)
                            }).catch(function(e) {
                                return s(!1, e)
                            }) : s(!0)
                        }
                        )
                    }
                    var Id = function(e) {
                        return Cd(e = Od(e), function() {
                            return {
                                element: document.createElement("video"),
                                source: URL.createObjectURL(Ed)
                            }
                        })
                    }
                      , q = {
                        exports: {}
                    };
                    !function(e, t) {
                        var r = "__lodash_hash_undefined__"
                          , i = 9007199254740991
                          , n = "[object Arguments]"
                          , o = "[object Function]"
                          , f = "[object Object]"
                          , a = /^\[object .+?Constructor\]$/
                          , s = /^(?:0|[1-9]\d*)$/
                          , c = {};
                        c["[object Float32Array]"] = c["[object Float64Array]"] = c["[object Int8Array]"] = c["[object Int16Array]"] = c["[object Int32Array]"] = c["[object Uint8Array]"] = c["[object Uint8ClampedArray]"] = c["[object Uint16Array]"] = c["[object Uint32Array]"] = !0,
                        c[n] = c["[object Array]"] = c["[object ArrayBuffer]"] = c["[object Boolean]"] = c["[object DataView]"] = c["[object Date]"] = c["[object Error]"] = c[o] = c["[object Map]"] = c["[object Number]"] = c[f] = c["[object RegExp]"] = c["[object Set]"] = c["[object String]"] = c["[object WeakMap]"] = !1;
                        var u = "object" == typeof je && je && je.Object === Object && je
                          , d = "object" == typeof self && self && self.Object === Object && self
                          , l = u || d || Function("return this")()
                          , h = t && !t.nodeType && t
                          , p = h && e && !e.nodeType && e
                          , g = p && p.exports === h
                          , m = g && u.process
                          , d = function() {
                            try {
                                return p && p.require && p.require("util").types || m && m.binding && m.binding("util")
                            } catch (e) {}
                        }()
                          , t = d && d.isTypedArray;
                        var v, y, h = Array.prototype, u = Function.prototype, b = Object.prototype, d = l["__core-js_shared__"], _ = u.toString, w = b.hasOwnProperty, A = (d = /[^.]+$/.exec(d && d.keys && d.keys.IE_PROTO || "")) ? "Symbol(src)_1." + d : "", E = b.toString, k = _.call(Object), x = RegExp("^" + _.call(w).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), d = g ? l.Buffer : void 0, g = l.Symbol, S = l.Uint8Array, D = (d && d.allocUnsafe,
                        v = Object.getPrototypeOf,
                        y = Object,
                        function(e) {
                            return v(y(e))
                        }
                        ), T = Object.create, R = b.propertyIsEnumerable, O = h.splice, C = g ? g.toStringTag : void 0, I = function() {
                            try {
                                var e = J(Object, "defineProperty");
                                return e({}, "", {}),
                                e
                            } catch (e) {}
                        }(), d = d ? d.isBuffer : void 0, P = Math.max, L = Date.now, j = J(l, "Map"), B = J(Object, "create"), M = function(e) {
                            if (!he(e))
                                return {};
                            if (T)
                                return T(e);
                            U.prototype = e;
                            e = new U;
                            return U.prototype = void 0,
                            e
                        };
                        function U() {}
                        function N(e) {
                            var t = -1
                              , n = null == e ? 0 : e.length;
                            for (this.clear(); ++t < n; ) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }
                        function G(e) {
                            var t = -1
                              , n = null == e ? 0 : e.length;
                            for (this.clear(); ++t < n; ) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }
                        function F(e) {
                            var t = -1
                              , n = null == e ? 0 : e.length;
                            for (this.clear(); ++t < n; ) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }
                        function q(e) {
                            e = this.__data__ = new G(e);
                            this.size = e.size
                        }
                        function z(e, t, n) {
                            (void 0 === n || oe(e[t], n)) && (void 0 !== n || t in e) || K(e, t, n)
                        }
                        function V(e, t) {
                            for (var n = e.length; n--; )
                                if (oe(e[n][0], t))
                                    return n;
                            return -1
                        }
                        function K(e, t, n) {
                            "__proto__" == t && I ? I(e, t, {
                                configurable: !0,
                                enumerable: !0,
                                value: n,
                                writable: !0
                            }) : e[t] = n
                        }
                        N.prototype.clear = function() {
                            this.__data__ = B ? B(null) : {},
                            this.size = 0
                        }
                        ,
                        N.prototype.delete = function(e) {
                            e = this.has(e) && delete this.__data__[e];
                            return this.size -= e ? 1 : 0,
                            e
                        }
                        ,
                        N.prototype.get = function(e) {
                            var t = this.__data__;
                            if (B) {
                                var n = t[e];
                                return n === r ? void 0 : n
                            }
                            return w.call(t, e) ? t[e] : void 0
                        }
                        ,
                        N.prototype.has = function(e) {
                            var t = this.__data__;
                            return B ? void 0 !== t[e] : w.call(t, e)
                        }
                        ,
                        N.prototype.set = function(e, t) {
                            var n = this.__data__;
                            return this.size += this.has(e) ? 0 : 1,
                            n[e] = B && void 0 === t ? r : t,
                            this
                        }
                        ,
                        G.prototype.clear = function() {
                            this.__data__ = [],
                            this.size = 0
                        }
                        ,
                        G.prototype.delete = function(e) {
                            var t = this.__data__
                              , e = V(t, e);
                            return !(e < 0 || (e == t.length - 1 ? t.pop() : O.call(t, e, 1),
                            --this.size,
                            0))
                        }
                        ,
                        G.prototype.get = function(e) {
                            var t = this.__data__
                              , e = V(t, e);
                            return e < 0 ? void 0 : t[e][1]
                        }
                        ,
                        G.prototype.has = function(e) {
                            return -1 < V(this.__data__, e)
                        }
                        ,
                        G.prototype.set = function(e, t) {
                            var n = this.__data__
                              , r = V(n, e);
                            return r < 0 ? (++this.size,
                            n.push([e, t])) : n[r][1] = t,
                            this
                        }
                        ,
                        F.prototype.clear = function() {
                            this.size = 0,
                            this.__data__ = {
                                hash: new N,
                                map: new (j || G),
                                string: new N
                            }
                        }
                        ,
                        F.prototype.delete = function(e) {
                            e = Q(this, e).delete(e);
                            return this.size -= e ? 1 : 0,
                            e
                        }
                        ,
                        F.prototype.get = function(e) {
                            return Q(this, e).get(e)
                        }
                        ,
                        F.prototype.has = function(e) {
                            return Q(this, e).has(e)
                        }
                        ,
                        F.prototype.set = function(e, t) {
                            var n = Q(this, e)
                              , r = n.size;
                            return n.set(e, t),
                            this.size += n.size == r ? 0 : 1,
                            this
                        }
                        ,
                        q.prototype.clear = function() {
                            this.__data__ = new G,
                            this.size = 0
                        }
                        ,
                        q.prototype.delete = function(e) {
                            var t = this.__data__
                              , e = t.delete(e);
                            return this.size = t.size,
                            e
                        }
                        ,
                        q.prototype.get = function(e) {
                            return this.__data__.get(e)
                        }
                        ,
                        q.prototype.has = function(e) {
                            return this.__data__.has(e)
                        }
                        ,
                        q.prototype.set = function(e, t) {
                            var n = this.__data__;
                            if (n instanceof G) {
                                var r = n.__data__;
                                if (!j || r.length < 199)
                                    return r.push([e, t]),
                                    this.size = ++n.size,
                                    this;
                                n = this.__data__ = new F(r)
                            }
                            return n.set(e, t),
                            this.size = n.size,
                            this
                        }
                        ;
                        var H = function(e, t, n) {
                            for (var r = -1, i = Object(e), o = n(e), a = o.length; a--; ) {
                                var s = o[++r];
                                if (!1 === t(i[s], s, i))
                                    break
                            }
                            return e
                        };
                        function W(e) {
                            return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : C && C in Object(e) ? function(e) {
                                var t = w.call(e, C)
                                  , n = e[C];
                                try {
                                    var r = !(e[C] = void 0)
                                } catch (e) {}
                                var i = E.call(e);
                                return r && (t ? e[C] = n : delete e[C]),
                                i
                            }(e) : E.call(e)
                        }
                        function $(e) {
                            return fe(e) && W(e) == n
                        }
                        function Y(r, i, o, a, s) {
                            r !== i && H(i, function(e, t) {
                                var n;
                                s = s || new q,
                                he(e) ? function(e, t, n, r, i, o, a) {
                                    var s = ee(e, n)
                                      , c = ee(t, n)
                                      , u = a.get(c);
                                    if (u)
                                        return z(e, n, u);
                                    var d, l = o ? o(s, c, n + "", e, t, a) : void 0, h = void 0 === l;
                                    h && (u = !(d = se(c)) && ue(c),
                                    t = !d && !u && ge(c),
                                    l = c,
                                    d || u || t ? l = se(s) ? s : fe(d = s) && ce(d) ? function(e, t) {
                                        var n = -1
                                          , r = e.length;
                                        for (t = t || Array(r); ++n < r; )
                                            t[n] = e[n];
                                        return t
                                    }(s) : u ? (h = !1,
                                    c.slice()) : t ? (h = !1,
                                    t = new (u = (d = c).buffer).constructor(u.byteLength),
                                    new S(t).set(new S(u)),
                                    new d.constructor(t,d.byteOffset,d.length)) : [] : function(e) {
                                        if (fe(e) && W(e) == f) {
                                            e = D(e);
                                            if (null === e)
                                                return 1;
                                            e = w.call(e, "constructor") && e.constructor;
                                            return "function" == typeof e && e instanceof e && _.call(e) == k
                                        }
                                    }(c) || ae(c) ? ae(l = s) ? l = function(e, t, n) {
                                        var r = !n;
                                        n = n || {};
                                        for (var i = -1, o = t.length; ++i < o; ) {
                                            var a = t[i]
                                              , s = void 0;
                                            (r ? K : function e(t, n, r) {
                                                var i = t[n];
                                                w.call(t, n) && oe(i, r) && (void 0 !== r || n in t) || K(t, n, r)
                                            }
                                            )(n, a, s = void 0 === s ? e[a] : s)
                                        }
                                        return n
                                    }(s, me(s)) : he(s) && !de(s) || (l = "function" != typeof c.constructor || X(c) ? {} : M(D(c))) : h = !1),
                                    h && (a.set(c, l),
                                    i(l, c, r, o, a),
                                    a.delete(c)),
                                    z(e, n, l)
                                }(r, i, t, o, Y, a, s) : (n = a ? a(ee(r, t), e, t + "", r, i, s) : void 0,
                                z(r, t, n = void 0 === n ? e : n))
                            }, me)
                        }
                        function Q(e, t) {
                            var n = e.__data__;
                            return ("string" == (e = typeof t) || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t) ? n["string" == typeof t ? "string" : "hash"] : n.map
                        }
                        function J(e, t) {
                            t = null == e ? void 0 : e[t];
                            return function e(t) {
                                return he(t) && !(A && A in t) && (de(t) ? x : a).test(function(e) {
                                    if (null != e) {
                                        try {
                                            return _.call(e)
                                        } catch (e) {}
                                        try {
                                            return e + ""
                                        } catch (e) {}
                                    }
                                    return ""
                                }(t))
                            }(t) ? t : void 0
                        }
                        function Z(e, t) {
                            var n = typeof e;
                            return (t = null == t ? i : t) && ("number" == n || "symbol" != n && s.test(e)) && -1 < e && e % 1 == 0 && e < t
                        }
                        function X(e) {
                            var t = e && e.constructor;
                            return e === ("function" == typeof t && t.prototype || b)
                        }
                        function ee(e, t) {
                            if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
                                return e[t]
                        }
                        var te, ne, re, ie = (te = I ? function(e, t) {
                            return I(e, "toString", {
                                configurable: !0,
                                enumerable: !1,
                                value: (n = t,
                                function() {
                                    return n
                                }
                                ),
                                writable: !0
                            });
                            var n
                        }
                        : ye,
                        re = ne = 0,
                        function() {
                            var e = L()
                              , t = 16 - (e - re);
                            if (re = e,
                            0 < t) {
                                if (800 <= ++ne)
                                    return arguments[0]
                            } else
                                ne = 0;
                            return te.apply(void 0, arguments)
                        }
                        );
                        function oe(e, t) {
                            return e === t || e != e && t != t
                        }
                        var ae = $(function() {
                            return arguments
                        }()) ? $ : function(e) {
                            return fe(e) && w.call(e, "callee") && !R.call(e, "callee")
                        }
                          , se = Array.isArray;
                        function ce(e) {
                            return null != e && le(e.length) && !de(e)
                        }
                        var ue = d || function() {
                            return !1
                        }
                        ;
                        function de(e) {
                            if (he(e)) {
                                e = W(e);
                                return e == o || "[object GeneratorFunction]" == e || "[object AsyncFunction]" == e || "[object Proxy]" == e
                            }
                        }
                        function le(e) {
                            return "number" == typeof e && -1 < e && e % 1 == 0 && e <= i
                        }
                        function he(e) {
                            var t = typeof e;
                            return null != e && ("object" == t || "function" == t)
                        }
                        function fe(e) {
                            return null != e && "object" == typeof e
                        }
                        var pe, ge = t ? (pe = t,
                        function(e) {
                            return pe(e)
                        }
                        ) : function(e) {
                            return fe(e) && le(e.length) && !!c[W(e)]
                        }
                        ;
                        function me(e) {
                            return ce(e) ? function e(t, n) {
                                var r, i = se(t), o = !i && ae(t), a = !i && !o && ue(t), s = !i && !o && !a && ge(t), c = i || o || a || s, u = c ? function(e, t) {
                                    for (var n = -1, r = Array(e); ++n < e; )
                                        r[n] = t(n);
                                    return r
                                }(t.length, String) : [], d = u.length;
                                for (r in t)
                                    !n && !w.call(t, r) || c && ("length" == r || a && ("offset" == r || "parent" == r) || s && ("buffer" == r || "byteLength" == r || "byteOffset" == r) || Z(r, d)) || u.push(r);
                                return u
                            }(e, !0) : function e(n) {
                                if (!he(n))
                                    return function() {
                                        var e = [];
                                        if (null != n)
                                            for (var t in Object(n))
                                                e.push(t);
                                        return e
                                    }();
                                var t, r = X(n), i = [];
                                for (t in n)
                                    ("constructor" != t || !r && w.call(n, t)) && i.push(t);
                                return i
                            }(e)
                        }
                        var ve, t = (ve = function(e, t, n) {
                            Y(e, t, n)
                        }
                        ,
                        function e(t, n) {
                            return ie((o = t,
                            s = ye,
                            a = P(void 0 === (a = n) ? o.length - 1 : a, 0),
                            function() {
                                for (var e = arguments, t = -1, n = P(e.length - a, 0), r = Array(n); ++t < n; )
                                    r[t] = e[a + t];
                                for (var t = -1, i = Array(a + 1); ++t < a; )
                                    i[t] = e[t];
                                return i[a] = s(r),
                                function e(t, n, r) {
                                    switch (r.length) {
                                    case 0:
                                        return t.call(n);
                                    case 1:
                                        return t.call(n, r[0]);
                                    case 2:
                                        return t.call(n, r[0], r[1]);
                                    case 3:
                                        return t.call(n, r[0], r[1], r[2])
                                    }
                                    return t.apply(n, r)
                                }(o, this, i)
                            }
                            ), t + "");
                            var o, a, s
                        }(function(e, t) {
                            var n = -1
                              , r = t.length
                              , i = 1 < r ? t[r - 1] : void 0
                              , o = 2 < r ? t[2] : void 0
                              , i = 3 < ve.length && "function" == typeof i ? (r--,
                            i) : void 0;
                            for (o && function(e, t, n) {
                                if (he(n)) {
                                    var r = typeof t;
                                    return ("number" == r ? ce(n) && Z(t, n.length) : "string" == r && t in n) && oe(n[t], e)
                                }
                            }(t[0], t[1], o) && (i = r < 3 ? void 0 : i,
                            r = 1),
                            e = Object(e); ++n < r; ) {
                                var a = t[n];
                                a && ve(e, a, n)
                            }
                            return e
                        }));
                        function ye(e) {
                            return e
                        }
                        e.exports = t
                    }(q, q.exports);
                    var Pd = q.exports;
                    function Ld(t, e) {
                        var n, r = Object.keys(t);
                        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
                        e && (n = n.filter(function(e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable
                        })),
                        r.push.apply(r, n)),
                        r
                    }
                    function jd(t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = null != arguments[e] ? arguments[e] : {};
                            e % 2 ? Ld(Object(n), !0).forEach(function(e) {
                                qn(t, e, n[e])
                            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Ld(Object(n)).forEach(function(e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                            })
                        }
                        return t
                    }
                    function Bd(e) {
                        return (null != e && e.error_url ? "<vmap:VASTAdData>".concat(((t = e).promo_url ? '<VAST version="3.0">\n            <Ad id="'.concat(t.id, '">\n                <Wrapper fallbackOnNoAd="true">\n                    <AdSystem>GDFP</AdSystem>\n                    <Error><![CDATA[').concat(t.error_url, "]]></Error>\n                    <Impression><![CDATA[").concat(t.impression_url, "]]></Impression>\n                    <VASTAdTagURI><![CDATA[").concat(t.adtag_url, ']]></VASTAdTagURI>\n                    <Extensions>\n                        <Extension type="waterfall" fallback_index="0" />\n                    </Extensions>\n                </Wrapper>\n            </Ad>\n            <Ad id="promo">\n                <Wrapper>\n                    <AdSystem>Rainbow</AdSystem>\n                    <Impression><![CDATA[').concat(t.promo_imp_green_url, "]]></Impression>\n                    <VASTAdTagURI><![CDATA[").concat(t.promo_url, ']]></VASTAdTagURI>\n                    <Extensions>\n                        <Extension type="waterfall" fallback_index="1" />\n                    </Extensions>\n                </Wrapper>\n            </Ad>\n        </VAST>') : '<VAST version="3.0">\n        <Ad id="'.concat(t.id, '">\n            <Wrapper>\n                <AdSystem>GDFP</AdSystem>\n                <Error><![CDATA[').concat(t.error_url, "]]></Error>\n                <Impression><![CDATA[").concat(t.impression_url, "]]></Impression>\n                <VASTAdTagURI><![CDATA[").concat(t.adtag_url, "]]></VASTAdTagURI>\n            </Wrapper>\n        </Ad>\n    </VAST>")).trim(), "</vmap:VASTAdData>") : '<vmap:AdTagURI templateType="vast3"><![CDATA['.concat(null == e ? void 0 : e.adtag_url, "]]></vmap:AdTagURI>")).trim();
                        var t
                    }
                    const Md = "function" == typeof atob
                      , Ud = "function" == typeof btoa
                      , Nd = "function" == typeof gf
                      , Gd = "function" == typeof TextDecoder ? new TextDecoder : void 0
                      , Fd = "function" == typeof TextEncoder ? new TextEncoder : void 0
                      , qd = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="]
                      , zd = (e=>{
                        let n = {};
                        return e.forEach((e,t)=>n[e] = t),
                        n
                    }
                    )(qd)
                      , Vd = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/
                      , Kd = String.fromCharCode.bind(String)
                      , Hd = "function" == typeof Uint8Array.from ? Uint8Array.from.bind(Uint8Array) : (e,t=e=>e)=>new Uint8Array(Array.prototype.slice.call(e, 0).map(t))
                      , Wd = e=>e.replace(/[^A-Za-z0-9\+\/]/g, "")
                      , $d = Ud ? e=>btoa(e) : Nd ? e=>gf.from(e, "binary").toString("base64") : t=>{
                        let n, r, i, o, a = "";
                        var e = t.length % 3;
                        for (let e = 0; e < t.length; ) {
                            if (255 < (r = t.charCodeAt(e++)) || 255 < (i = t.charCodeAt(e++)) || 255 < (o = t.charCodeAt(e++)))
                                throw new TypeError("invalid character found");
                            n = r << 16 | i << 8 | o,
                            a += qd[n >> 18 & 63] + qd[n >> 12 & 63] + qd[n >> 6 & 63] + qd[63 & n]
                        }
                        return e ? a.slice(0, e - 3) + "===".substring(e) : a
                    }
                      , Yd = Nd ? e=>gf.from(e).toString("base64") : n=>{
                        let r = [];
                        for (let e = 0, t = n.length; e < t; e += 4096)
                            r.push(Kd.apply(null, n.subarray(e, e + 4096)));
                        return $d(r.join(""))
                    }
                      , Qd = e=>{
                        if (e.length < 2)
                            return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? Kd(192 | t >>> 6) + Kd(128 | 63 & t) : Kd(224 | t >>> 12 & 15) + Kd(128 | t >>> 6 & 63) + Kd(128 | 63 & t);
                        var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                        return Kd(240 | t >>> 18 & 7) + Kd(128 | t >>> 12 & 63) + Kd(128 | t >>> 6 & 63) + Kd(128 | 63 & t)
                    }
                      , Jd = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
                      , Zd = Nd ? e=>gf.from(e, "utf8").toString("base64") : Fd ? e=>Yd(Fd.encode(e)) : e=>$d((e=>e.replace(Jd, Qd))(e))
                      , Xd = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g
                      , el = e=>{
                        switch (e.length) {
                        case 4:
                            var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
                            return Kd(55296 + (t >>> 10)) + Kd(56320 + (1023 & t));
                        case 3:
                            return Kd((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                        default:
                            return Kd((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
                        }
                    }
                      , tl = Md ? e=>atob(Wd(e)) : Nd ? e=>gf.from(e, "base64").toString("binary") : t=>{
                        if (t = t.replace(/\s+/g, ""),
                        !Vd.test(t))
                            throw new TypeError("malformed base64.");
                        t += "==".slice(2 - (3 & t.length));
                        let n, r, i, o = "";
                        for (let e = 0; e < t.length; )
                            n = zd[t.charAt(e++)] << 18 | zd[t.charAt(e++)] << 12 | (r = zd[t.charAt(e++)]) << 6 | (i = zd[t.charAt(e++)]),
                            o += 64 === r ? Kd(n >> 16 & 255) : 64 === i ? Kd(n >> 16 & 255, n >> 8 & 255) : Kd(n >> 16 & 255, n >> 8 & 255, 255 & n);
                        return o
                    }
                      , nl = Nd ? e=>Hd(gf.from(e, "base64")) : e=>Hd(tl(e), e=>e.charCodeAt(0))
                      , rl = Nd ? e=>gf.from(e, "base64").toString("utf8") : Gd ? e=>Gd.decode(nl(e)) : e=>(e=>e.replace(Xd, el))(tl(e))
                      , il = (e,t=!1)=>t ? (e=>e.replace(/[+\/]/g, e=>"+" == e ? "-" : "_").replace(/=+$/m, ""))(Zd(e)) : Zd(e)
                      , ol = e=>rl((e=>Wd(e.replace(/[-_]/g, e=>"-" == e ? "+" : "/")))(e));
                    function al(t, e) {
                        var n, r = Object.keys(t);
                        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
                        e && (n = n.filter(function(e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable
                        })),
                        r.push.apply(r, n)),
                        r
                    }
                    function sl(t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = null != arguments[e] ? arguments[e] : {};
                            e % 2 ? al(Object(n), !0).forEach(function(e) {
                                qn(t, e, n[e])
                            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : al(Object(n)).forEach(function(e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                            })
                        }
                        return t
                    }
                    var cl, ul, dl, ll, hl, fl, pl, gl, ml, vl, yl, bl, _l = null, wl = (Wn(Cl, [{
                        key: "start",
                        value: (bl = Vn(Yn.mark(function e() {
                            var t, n, r = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.prev = 0,
                                        n = this._getPrebidScripts(),
                                        t = n[0],
                                        window.HB_OPTIONSgd = {
                                            gameId: this.gameId
                                        },
                                        e.next = 6,
                                        td(t, "gdsdk_prebid", {
                                            alternates: n,
                                            error_prefix: "Blocked:",
                                            exists: function() {
                                                return p(this, r),
                                                window.idhb
                                            }
                                            .bind(this)
                                        });
                                    case 6:
                                        return window.idhb = window.idhb || {},
                                        window.idhb.que = window.idhb.que || [],
                                        window.idhb.que.push(function() {
                                            var i = this;
                                            p(this, r),
                                            window.idhb.addEventListener("slotRenderEnded", function(e) {
                                                var t = this;
                                                p(this, i);
                                                try {
                                                    var n, r = 1 === (r = e.slotId.split("@")).length ? r[0] : r[1];
                                                    e.isEmpty ? (null !== (n = this.atom_display) && void 0 !== n && n.error_url && (fetch(this.atom_display.error_url).catch(function(e) {
                                                        p(this, t)
                                                    }
                                                    .bind(this)),
                                                    delete this.atom_display),
                                                    this.eventBus.broadcast("DISPLAYAD_ERROR", {
                                                        message: r,
                                                        status: "warning"
                                                    })) : (this.atom_display.impression_url && (fetch(this.atom_display.impression_url).catch(function(e) {
                                                        p(this, t)
                                                    }
                                                    .bind(this)),
                                                    delete this.atom_display),
                                                    this.eventBus.broadcast("DISPLAYAD_IMPRESSION", {
                                                        message: r,
                                                        status: "success"
                                                    }))
                                                } catch (e) {}
                                            }
                                            .bind(this))
                                        }
                                        .bind(this)),
                                        t = ["https://imasdk.googleapis.com/js/sdkloader/ima3_debug.js", "https://imasdk.googleapis.com/js/sdkloader/ima3.js", "http://imasdk.googleapis.com/js/sdkloader/ima3_debug.js", "http://imasdk.googleapis.com/js/sdkloader/ima3.js"],
                                        n = this.options.debug ? t[0] : t[1],
                                        e.next = 13,
                                        td(n, "gdsdk_ima", {
                                            alternates: t,
                                            error_prefix: "Blocked:",
                                            exists: function() {
                                                return p(this, r),
                                                window.google && window.google.ima
                                            }
                                            .bind(this)
                                        });
                                    case 13:
                                        this._createPlayer(),
                                        this._setUpIMA(),
                                        e.next = 20;
                                        break;
                                    case 17:
                                        throw e.prev = 17,
                                        e.t0 = e.catch(0),
                                        new Error(e.t0);
                                    case 20:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this, [[0, 17]])
                        })),
                        function() {
                            return bl.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_getAdVast",
                        value: function(u, d) {
                            var t, l = this;
                            return new Promise((t = Vn(Yn.mark(function e(i) {
                                var t, o, n, a, r, s, c = this;
                                return Yn.wrap(function(e) {
                                    for (; ; )
                                        switch (e.prev = e.next) {
                                        case 0:
                                            if (ad && rd("gd_debug_ex") && rd("gd_tag"))
                                                return t = l.IMASampleTags[u],
                                                n = Math.floor(Math.random() * t.length),
                                                n = t[n],
                                                i({
                                                    url: n
                                                }),
                                                e.abrupt("return");
                                            e.next = 6;
                                            break;
                                        case 6:
                                            if (void 0 === window.idhb.requestAds)
                                                throw new Error("Prebid.js wrapper script hit an error or didn't exist!");
                                            e.next = 8;
                                            break;
                                        case 8:
                                            return e.prev = 8,
                                            e.next = 11,
                                            l._getTunnlKeys(u);
                                        case 11:
                                            if (r = e.sent,
                                            o = r.data,
                                            n = o.nsid || "TNL_T-17102571517",
                                            r = o.tid || "TNL_NS-18101700058",
                                            a = "".concat(n, "/").concat(r),
                                            delete o.nsid,
                                            delete o.tid,
                                            Pd(o, {
                                                tnl_system: "1",
                                                tnl_content_category: l.category.toLowerCase()
                                            }),
                                            l.eventBus.broadcast("AD_REQUEST", {
                                                message: o.tnl_ad_pos
                                            }),
                                            r = l.options,
                                            "preroll" === o.tnl_ad_pos && Mu(r.preroll) ? r = r.preroll : "midroll" === o.tnl_ad_pos && Mu(r.midroll) ? r = r.midroll : "rewarded" === o.tnl_ad_pos && Mu(r.rewarded) && (r = r.rewarded),
                                            d && d.retry_on_success && Mu(r.retry_on_success) && Mu(r.retry_on_success.vast))
                                                return e.abrupt("return", i(l._createCustomAdVastUrl(r.retry_on_success.vast, {
                                                    tnl_keys: o
                                                })));
                                            e.next = 26;
                                            break;
                                        case 26:
                                            if (d && d.retry_on_failure && l.options.retry_on_failure && Mu(r.retry_on_failure.vast))
                                                return e.abrupt("return", i(l._createCustomAdVastUrl(r.retry_on_failure.vast, {
                                                    tnl_keys: o
                                                })));
                                            e.next = 30;
                                            break;
                                        case 30:
                                            if (Mu(r.vast))
                                                return e.abrupt("return", i(l._createCustomAdVastUrl(r.vast, {
                                                    tnl_keys: o
                                                })));
                                            e.next = 32;
                                            break;
                                        case 32:
                                            return e.next = 34,
                                            l._create_dp_context(o.tnl_ad_pos);
                                        case 34:
                                            s = e.sent,
                                            window.idhb.que.push(function() {
                                                var r = this;
                                                p(this, c),
                                                window.idhb.setRefererUrl(encodeURIComponent(l.parentURL)),
                                                window.idhb.allowPersonalizedAds(!!parseInt(l.userAllowedPersonalizedAds));
                                                var e = "rewarded" === o.tnl_ad_pos ? "rewardedVideo" : "gdbanner" === o.tnl_ad_pos ? "gd__banner" : "midroll" === o.tnl_ad_pos ? "midroll" : "video1";
                                                window.idhb.setDfpAdUnitCodeForAdSlot(e, a),
                                                window.idhb.setAdserverTargetingForAdSlot(e, o),
                                                window.idhb.requestAds({
                                                    slots: qn({}, e, {
                                                        bidFloor: null != s && s.floor_price ? s.floor_price : void 0
                                                    }),
                                                    callback: function(e, t) {
                                                        var n = this;
                                                        p(this, r),
                                                        s && !t.bidFloorApplied && fetch(s.skip_url).catch(function(e) {
                                                            p(this, n)
                                                        }
                                                        .bind(this)),
                                                        i({
                                                            tnl_keys: o,
                                                            url: e,
                                                            dp: s,
                                                            hl: t
                                                        })
                                                    }
                                                    .bind(this)
                                                })
                                            }
                                            .bind(this)),
                                            e.next = 41;
                                            break;
                                        case 38:
                                            throw e.prev = 38,
                                            e.t0 = e.catch(8),
                                            new Error(e.t0);
                                        case 41:
                                        case "end":
                                            return e.stop()
                                        }
                                }, e, this, [[8, 38]])
                            })),
                            function(e) {
                                return t.apply(this, arguments)
                            }
                            ))
                        }
                    }, {
                        key: "nextAdPosition",
                        value: function(e) {
                            if (e === Qu.Rewarded)
                                return this.adRewardedCount++,
                                "rewarded";
                            if (e !== Qu.Interstitial)
                                return "midroll";
                            e = !1 === this.gameData.preroll || !0 === this.noPreroll || 1 === this.adPrerollCount;
                            return e ? this.adMidrollCount++ : this.adPrerollCount++,
                            e || 0 < this.adMidrollCount ? "midroll" : "preroll"
                        }
                    }, {
                        key: "getAdPosition",
                        value: function(e) {
                            return e === Qu.Rewarded ? "rewarded" : e !== Qu.Interstitial || !1 === this.gameData.preroll || !0 === this.noPreroll || 1 === this.adPrerollCount || 0 < this.adMidrollCount ? "midroll" : "preroll"
                        }
                    }, {
                        key: "_getTunnlKeys",
                        value: function(s) {
                            var c = this;
                            return new Promise(function(n) {
                                var r = this;
                                p(this, c);
                                var e = !navigator.userAgent.match(/Crosswalk/i) && void 0 === window.cordova || "m.hopy.com" !== this.parentDomain ? "page_url=".concat(encodeURIComponent(this.parentURL)) : "bundle=com.hopy.frivgames"
                                  , i = this.nextAdPosition(s)
                                  , t = Zu("ch", window.location.href)
                                  , o = Zu("ch_date", window.location.href)
                                  , t = t ? "&ch=".concat(t) : ""
                                  , o = o ? "&ch_date=".concat(o) : ""
                                  , a = "json/null.json?https://pub.headerlift.com/opphb?".concat(e, "&player_width=").concat(this.options.width, "&player_height=").concat(this.options.height, "&ad_type=video_image&game_id=").concat(this.gameId, "&ad_position=").concat(i).concat(t).concat(o, "&correlator=").concat(Date.now())
                                  , o = new Request(a,{
                                    method: "GET"
                                });
                                fetch(o).then(function(e) {
                                    p(this, r);
                                    var t = e.headers.get("content-type");
                                    if (t && -1 !== t.indexOf("application/json"))
                                        return e.json();
                                    throw new TypeError("Oops, we didn't get JSON!")
                                }
                                .bind(this)).then(function(e) {
                                    p(this, r),
                                    function(e) {
                                        if (e) {
                                            for (var t in e)
                                                if (e.hasOwnProperty(t))
                                                    return;
                                            return 1
                                        }
                                    }(e) && (e = this._createTunnlReportingFallbackKeys(i),
                                    this.eventBus.broadcast("AD_REQUEST_KEYS_EMPTY", {
                                        message: "Tunnl returned empty response.",
                                        details: a
                                    })),
                                    n({
                                        data: e,
                                        url: a
                                    })
                                }
                                .bind(this)).catch(function(e) {
                                    p(this, r);
                                    var t = this._createTunnlReportingFallbackKeys(i);
                                    this.eventBus.broadcast("AD_REQUEST_KEYS_FALLBACK", {
                                        message: e.message,
                                        details: a
                                    }),
                                    n({
                                        data: t,
                                        url: a
                                    })
                                }
                                .bind(this))
                            }
                            .bind(this))
                        }
                    }, {
                        key: "_createTunnlReportingFallbackKeys",
                        value: function(e) {
                            return {
                                tid: "TNL_T-17102571517",
                                nsid: "TNL_NS-18101700058",
                                tnl_tid: "T-17102571517",
                                tnl_nsid: "NS-18101700058",
                                tnl_pw: this.options.width,
                                tnl_ph: this.options.height,
                                tnl_pt: "22",
                                tnl_pid: "P-17101800031",
                                tnl_paid: "17",
                                tnl_ad_type: "video_image",
                                tnl_asset_id: this.gameId.toString(),
                                tnl_ad_pos: e,
                                tnl_skippable: "1",
                                tnl_cp1: "",
                                tnl_cp2: "",
                                tnl_cp3: "",
                                tnl_cp4: "",
                                tnl_cp5: "",
                                tnl_cp6: "",
                                tnl_campaign: "2",
                                tnl_gdpr: "0",
                                tnl_gdpr_consent: "1",
                                consent_string: "BOWJjG9OWJjG9CLAAAENBx-AAAAiDAAA",
                                tnl_content_category: this.category.toLowerCase()
                            }
                        }
                    }, {
                        key: "_requestAd",
                        value: function(l, h) {
                            var f = this;
                            return h = h || {},
                            new Promise(function(e) {
                                if (p(this, f),
                                "undefined" == typeof google)
                                    throw new Error("Unable to load ad, google IMA SDK not defined.");
                                try {
                                    var t, n = null == l || null === (t = l.tnl_keys) || void 0 === t ? void 0 : t.tnl_ad_pos;
                                    this.adSuccess = !1;
                                    var r = new google.ima.AdsRequest
                                      , i = this._transformVast(l, h)
                                      , o = sl(sl({}, h), {}, {
                                        adTag: i,
                                        tnl_ad_pos: n
                                    });
                                    this.adCounter[n] = this.adCounter[n] || 0,
                                    this.adCounter[n]++;
                                    var a, s, c = l.dp, u = l.hl;
                                    c && (c.adtag_url = i.url),
                                    this._isVMAP(n) ? (a = function(e) {
                                        var t = e.position || "midroll"
                                          , n = e.dp_1
                                          , r = e.dp_2
                                          , i = Date.now()
                                          , o = new Lu(e.adtag_url_1,!0);
                                        o.query = jd(jd({}, o.query), {}, {
                                            ad_rule: 0,
                                            vpos: t,
                                            pod: 1,
                                            ppos: 1,
                                            lip: !0,
                                            correlator: i,
                                            output: "xml_vast3"
                                        });
                                        o = o.toString(),
                                        e = new Lu(e.adtag_url_2,!0);
                                        e.query = jd(jd({}, e.query), {}, {
                                            ad_rule: 0,
                                            vpos: t,
                                            pod: 1,
                                            correlator: ++i,
                                            output: "xml_vast3"
                                        });
                                        i = e.toString(),
                                        e = Date.now();
                                        return '<?xml version="1.0" encoding="UTF-8"?>\n<vmap:VMAP xmlns:vmap="http://www.iab.net/videosuite/vmap" version="1.0">\n<vmap:AdBreak timeOffset="start" breakType="linear,nonlinear" breakId="break-1">\n    <vmap:AdSource id="'.concat(e++, '" allowMultipleAds="false" followRedirects="true">\n        ').concat(Bd({
                                            id: e++,
                                            adtag_url: o,
                                            error_url: null == n ? void 0 : n.error_url,
                                            impression_url: null == n ? void 0 : n.impression_url
                                        }), '\n    </vmap:AdSource>\n</vmap:AdBreak>\n<vmap:AdBreak timeOffset="start" breakType="linear,nonlinear" breakId="break-2">\n    <vmap:AdSource id="').concat(e++, '" allowMultipleAds="false" followRedirects="true">\n        ').concat(Bd({
                                            id: e++,
                                            adtag_url: i,
                                            error_url: null == r ? void 0 : r.error_url,
                                            impression_url: null == r ? void 0 : r.impression_url
                                        }), '\n    </vmap:AdSource>\n    <vmap:Extensions>\n        <vmap:Extension type="bumper" suppress_bumper="true"></vmap:Extension>\n    </vmap:Extensions>\n</vmap:AdBreak>\n</vmap:VMAP>').trim()
                                    }(this._get_vmap_context({
                                        dp: c,
                                        adtag: i,
                                        position: "preroll" === o.tnl_ad_pos ? "preroll" : "midroll",
                                        config: this._get_vmap_config(n)
                                    })),
                                    r.adsResponse = a) : c && u.bidFloorApplied ? (s = ((d = c).promo_url ? '<?xml version="1.0" encoding="utf-8"?>\n        <VAST version="3.0">\n            <Ad id="'.concat(d.id, '">\n                <Wrapper fallbackOnNoAd="true">\n                    <AdSystem>GDFP</AdSystem>\n                    <Error><![CDATA[').concat(d.error_url, "]]></Error>\n                    <Impression><![CDATA[").concat(d.impression_url, "]]></Impression>\n                    <VASTAdTagURI><![CDATA[").concat(d.adtag_url, ']]></VASTAdTagURI>\n                    <Extensions>\n                        <Extension type="waterfall" fallback_index="0" />\n                    </Extensions>\n                </Wrapper>\n            </Ad>\n            <Ad id="promo">\n                <Wrapper>\n                    <AdSystem>Rainbow</AdSystem>\n                    <Impression><![CDATA[').concat(d.promo_imp_green_url, "]]></Impression>\n                    <VASTAdTagURI><![CDATA[").concat(d.promo_url, ']]></VASTAdTagURI>\n                    <Extensions>\n                        <Extension type="waterfall" fallback_index="1" />\n                    </Extensions>\n                </Wrapper>\n            </Ad>\n        </VAST>') : '<?xml version="1.0" encoding="utf-8"?>\n        <VAST version="3.0">\n            <Ad id="'.concat(d.id, '">\n                <Wrapper>\n                    <AdSystem>GDFP</AdSystem>\n                    <Error><![CDATA[').concat(d.error_url, "]]></Error>\n                    <Impression><![CDATA[").concat(d.impression_url, "]]></Impression>\n                    <VASTAdTagURI><![CDATA[").concat(d.adtag_url, "]]></VASTAdTagURI>\n                </Wrapper>\n            </Ad>\n        </VAST>")).trim(),
                                    r.adsResponse = s) : r.adTagUrl = i.url,
                                    r.linearAdSlotWidth = this.options.width,
                                    r.linearAdSlotHeight = this.options.height,
                                    r.nonLinearAdSlotWidth = this.options.width,
                                    r.nonLinearAdSlotHeight = this.options.height,
                                    r.forceNonLinearFullSlot = !0,
                                    this.options.vast_load_timeout && (r.vastLoadTimeout = this.options.vast_load_timeout),
                                    r.setAdWillAutoPlay(h.autoplayAllowed),
                                    r.setAdWillPlayMuted(h.autoplayRequiresMute),
                                    this.adsLoader.requestAds(r, o);
                                    try {
                                        this.eventBus.broadcast("AD_SDK_REQUEST", {
                                            message: o
                                        })
                                    } catch (e) {}
                                    e(r)
                                } catch (e) {
                                    throw new Error(e)
                                }
                                var d
                            }
                            .bind(this))
                        }
                    }, {
                        key: "cancel",
                        value: function() {
                            var e;
                            !1 !== this.requestRunning && (this.requestRunning = !1,
                            this._resetAdsLoader(),
                            this._hide("cancel"),
                            this.eventBus.broadcast(e = "AD_SDK_CANCELED", {
                                name: e,
                                message: "Advertisement has been canceled.",
                                status: "warning",
                                analytics: {
                                    category: this.eventCategory,
                                    action: e,
                                    label: this.gameId
                                }
                            }))
                        }
                    }, {
                        key: "_checkAutoPlay",
                        value: (yl = Vn(Yn.mark(function e() {
                            var i = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.abrupt("return", new Promise(function(n, e) {
                                            var r = this;
                                            p(this, i);
                                            var t = navigator.userAgent.toLowerCase();
                                            -1 < t.indexOf("safari") && t.indexOf("chrome") < 0 ? n({
                                                autoplayAllowed: !0,
                                                autoplayRequiresMute: !0
                                            }) : Id({
                                                inline: !0,
                                                muted: !1
                                            }).then(function(e) {
                                                p(this, r);
                                                var t = e.result;
                                                e.error,
                                                n(!0 === t ? {
                                                    autoplayAllowed: !0,
                                                    autoplayRequiresMute: !1
                                                } : {
                                                    autoplayAllowed: !0,
                                                    autoplayRequiresMute: !0
                                                })
                                            }
                                            .bind(this))
                                        }
                                        .bind(this)));
                                    case 1:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this)
                        })),
                        function() {
                            return yl.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_initDisplayContainerWithAutoPlay",
                        value: (vl = Vn(Yn.mark(function e() {
                            var t;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2,
                                        this._checkAutoPlay(!1);
                                    case 2:
                                        return t = e.sent,
                                        this._autoplay = t,
                                        this.video_ad_player.autoplay = t.autoplayAllowed,
                                        this.video_ad_player.volume = t.autoplayRequiresMute ? 0 : 1,
                                        this.video_ad_player.muted = !!t.autoplayRequiresMute,
                                        t.adDisplayContainerInitialized || (this.adDisplayContainer.initialize(),
                                        this.adDisplayContainerInitialized = !0),
                                        e.abrupt("return", t);
                                    case 9:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this)
                        })),
                        function() {
                            return vl.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "startAd",
                        value: (ml = Vn(Yn.mark(function e(t, n) {
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (t === Qu.Interstitial)
                                            return e.abrupt("return", this._startInterstitialAd(n));
                                        e.next = 4;
                                        break;
                                    case 4:
                                        if (t === Qu.Rewarded)
                                            return e.abrupt("return", this._startRewardedAd(n));
                                        e.next = 8;
                                        break;
                                    case 8:
                                        throw new Error("Unsupported ad type");
                                    case 9:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this)
                        })),
                        function(e, t) {
                            return ml.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "preloadAd",
                        value: (gl = Vn(Yn.mark(function e(t) {
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (t === Qu.Interstitial)
                                            return e.abrupt("return", this._preloadInterstitialAd());
                                        e.next = 4;
                                        break;
                                    case 4:
                                        if (t === Qu.Rewarded)
                                            return e.abrupt("return", this._preloadRewardedAd());
                                        e.next = 8;
                                        break;
                                    case 8:
                                        throw new Error("Unsupported ad type");
                                    case 9:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this)
                        })),
                        function(e) {
                            return gl.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "addAdResume",
                        value: function() {
                            var e = this
                              , t = function() {
                                p(this, e),
                                this.adsManager.resume()
                            }
                            .bind(this);
                            try {
                                this.adResume = new Ad(this.adContainer,t),
                                this.adResume.add()
                            } catch (e) {
                                console.log("error on adding adResume", e)
                            }
                        }
                    }, {
                        key: "loadDisplayAd",
                        value: (pl = Vn(Yn.mark(function e(c) {
                            var u = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.abrupt("return", new Promise(function() {
                                            var n = Vn(Yn.mark(function e(t, n) {
                                                var r, i, o, a, s = this;
                                                return Yn.wrap(function(e) {
                                                    for (; ; )
                                                        switch (e.prev = e.next) {
                                                        case 0:
                                                            return e.prev = 0,
                                                            (o = c ? c.containerId : null) || n("Container id is not specified"),
                                                            r = document.getElementById(o),
                                                            document.getElementById(o) || n("No container is found with this id - ".concat(o)),
                                                            void 0 === window.idhb.requestAds && n("Prebid.js wrapper script hit an error or didn't exist!"),
                                                            i = c.slotId || "gd__banner@".concat(o),
                                                            document.getElementById(i) || (o = "\n                    .gd__banner{\n                        z-index: ".concat(fd, ";\n                        height: 100%;\n                        display: flex !important;\n                        align-items: center;\n                        justify-content: center;\n                    }"),
                                                            document.getElementById("gd__banner__style") || ((a = document.createElement("style")).type = "text/css",
                                                            a.id = "gd__banner__style",
                                                            a.styleSheet ? a.styleSheet.cssText = o : a.appendChild(document.createTextNode(o)),
                                                            r.appendChild(a)),
                                                            (a = document.createElement("div")).id = i,
                                                            a.classList.add("gd__banner"),
                                                            r.appendChild(a)),
                                                            e.next = 10,
                                                            u._create_dp_display_context();
                                                        case 10:
                                                            u.atom_display = e.sent,
                                                            window.idhb.que.push(function() {
                                                                var e, t = this;
                                                                p(this, s),
                                                                window.idhb.setRefererUrl(encodeURIComponent(u.parentURL)),
                                                                window.idhb.allowPersonalizedAds(!!parseInt(u.userAllowedPersonalizedAds)),
                                                                window.idhb.setDefaultGdprConsentString("BOWJjG9OWJjG9CLAAAENBx-AAAAiDAAA"),
                                                                null !== (e = u.atom_display) && void 0 !== e && e.params && window.idhb.setAdserverTargeting(null === (n = u.atom_display) || void 0 === n ? void 0 : n.params);
                                                                var n = {};
                                                                n[i] = {
                                                                    maxSize: [r.offsetWidth, r.offsetHeight]
                                                                },
                                                                window.idhb.requestAds({
                                                                    slots: n,
                                                                    callback: function(e) {
                                                                        p(this, t)
                                                                    }
                                                                    .bind(this)
                                                                })
                                                            }
                                                            .bind(this)),
                                                            t(),
                                                            e.next = 18;
                                                            break;
                                                        case 15:
                                                            e.prev = 15,
                                                            e.t0 = e.catch(0),
                                                            n(e.t0.message || e.t0);
                                                        case 18:
                                                        case "end":
                                                            return e.stop()
                                                        }
                                                }, e, this, [[0, 15]])
                                            }));
                                            return function(e, t) {
                                                return n.apply(this, arguments)
                                            }
                                        }()));
                                    case 1:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        })),
                        function(e) {
                            return pl.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_startInterstitialAd",
                        value: (fl = Vn(Yn.mark(function e(t) {
                            var n;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (e.prev = 0,
                                        this.requestRunning)
                                            return this.eventBus.broadcast("AD_IS_ALREADY_RUNNING", {
                                                status: "warning"
                                            }),
                                            e.abrupt("return");
                                        e.next = 4;
                                        break;
                                    case 4:
                                        return this.requestRunning = !0,
                                        e.next = 7,
                                        this._initDisplayContainerWithAutoPlay();
                                    case 7:
                                        return n = e.sent,
                                        e.next = 10,
                                        this._loadInterstitialAd(sl(sl({}, n), t));
                                    case 10:
                                        n.autoplayRequiresMute && this.adsManager.setVolume(0),
                                        this.adsManager.init(this.options.width, this.options.height, google.ima.ViewMode.NORMAL),
                                        this.adsManager.start(),
                                        e.next = 19;
                                        break;
                                    case 15:
                                        throw e.prev = 15,
                                        e.t0 = e.catch(0),
                                        this._onError(e.t0),
                                        e.t0;
                                    case 19:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this, [[0, 15]])
                        })),
                        function(e) {
                            return fl.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_loadInterstitialAd",
                        value: (hl = Vn(Yn.mark(function e(t) {
                            var n, r, a = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (this._resetAdsLoader(),
                                        e.prev = 1,
                                        e.t0 = this.preloadedInterstitialAdVast,
                                        e.t0) {
                                            e.next = 7;
                                            break
                                        }
                                        return e.next = 6,
                                        this._getAdVast(Qu.Interstitial, t);
                                    case 6:
                                        e.t0 = e.sent;
                                    case 7:
                                        return n = e.t0,
                                        delete this.preloadedInterstitialAdVast,
                                        e.next = 11,
                                        this._requestAd(n, sl({
                                            adType: Qu.Interstitial
                                        }, t));
                                    case 11:
                                        return r = e.sent,
                                        e.next = 14,
                                        new Promise(function(t, n) {
                                            var r = this;
                                            p(this, a);
                                            var i = "videoad.preloadad";
                                            this.eventBus.unsubscribeScope(i);
                                            var e = function(e) {
                                                p(this, r),
                                                this.eventBus.unsubscribeScope(i),
                                                t(e.message)
                                            }
                                            .bind(this)
                                              , o = function(e) {
                                                p(this, r),
                                                this.eventBus.unsubscribeScope(i),
                                                n(e.message)
                                            }
                                            .bind(this);
                                            this.eventBus.subscribe("AD_SDK_MANAGER_READY", e, i),
                                            this.eventBus.subscribe("AD_SDK_CANCELED", o, i),
                                            this.eventBus.subscribe("AD_ERROR", o, i)
                                        }
                                        .bind(this));
                                    case 14:
                                        return e.abrupt("return", r);
                                    case 17:
                                        throw e.prev = 17,
                                        e.t1 = e.catch(1),
                                        new Error(e.t1);
                                    case 20:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this, [[1, 17]])
                        })),
                        function(e) {
                            return hl.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_startRewardedAd",
                        value: (ll = Vn(Yn.mark(function e(t) {
                            var n;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (e.prev = 0,
                                        this.requestRunning)
                                            return this.eventBus.broadcast("AD_IS_ALREADY_RUNNING", {
                                                status: "warning"
                                            }),
                                            e.abrupt("return");
                                        e.next = 4;
                                        break;
                                    case 4:
                                        return this.requestRunning = !0,
                                        e.next = 7,
                                        this._initDisplayContainerWithAutoPlay();
                                    case 7:
                                        return n = e.sent,
                                        e.next = 10,
                                        this._loadRewardedAd(sl(sl({}, n), t));
                                    case 10:
                                        n.autoplayRequiresMute && this.adsManager.setVolume(0),
                                        this.adsManager.init(this.options.width, this.options.height, google.ima.ViewMode.NORMAL),
                                        this.adsManager.start(),
                                        e.next = 19;
                                        break;
                                    case 15:
                                        throw e.prev = 15,
                                        e.t0 = e.catch(0),
                                        this._onError(e.t0),
                                        e.t0;
                                    case 19:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this, [[0, 15]])
                        })),
                        function(e) {
                            return ll.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_loadRewardedAd",
                        value: (dl = Vn(Yn.mark(function e(t) {
                            var n, r, a = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (this._resetAdsLoader(),
                                        e.prev = 1,
                                        e.t0 = this.preloadedRewardedAdVast,
                                        e.t0) {
                                            e.next = 7;
                                            break
                                        }
                                        return e.next = 6,
                                        this._getAdVast(Qu.Rewarded, t);
                                    case 6:
                                        e.t0 = e.sent;
                                    case 7:
                                        return n = e.t0,
                                        delete this.preloadedRewardedAdVast,
                                        e.next = 11,
                                        this._requestAd(n, sl({
                                            adType: Qu.Rewarded
                                        }, t));
                                    case 11:
                                        return r = e.sent,
                                        e.next = 14,
                                        new Promise(function(t, n) {
                                            var r = this;
                                            p(this, a);
                                            var i = "videoad.preloadad";
                                            this.eventBus.unsubscribeScope(i);
                                            var e = function(e) {
                                                p(this, r),
                                                this.eventBus.unsubscribeScope(i),
                                                t(e.message)
                                            }
                                            .bind(this)
                                              , o = function(e) {
                                                p(this, r),
                                                this.eventBus.unsubscribeScope(i),
                                                n(e.message)
                                            }
                                            .bind(this);
                                            this.eventBus.subscribe("AD_SDK_MANAGER_READY", e, i),
                                            this.eventBus.subscribe("AD_SDK_CANCELED", o, i),
                                            this.eventBus.subscribe("AD_ERROR", o, i)
                                        }
                                        .bind(this));
                                    case 14:
                                        return e.abrupt("return", r);
                                    case 17:
                                        throw e.prev = 17,
                                        e.t1 = e.catch(1),
                                        new Error(e.t1);
                                    case 20:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this, [[1, 17]])
                        })),
                        function(e) {
                            return dl.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_preloadInterstitialAd",
                        value: (ul = Vn(Yn.mark(function e() {
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.prev = 0,
                                        e.next = 3,
                                        this._getAdVast(Qu.Interstitial);
                                    case 3:
                                        return this.preloadedInterstitialAdVast = e.sent,
                                        e.abrupt("return", this.preloadedInterstitialAdVast.url);
                                    case 7:
                                        throw e.prev = 7,
                                        e.t0 = e.catch(0),
                                        new Error(e.t0);
                                    case 10:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this, [[0, 7]])
                        })),
                        function() {
                            return ul.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_preloadRewardedAd",
                        value: (cl = Vn(Yn.mark(function e() {
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.prev = 0,
                                        e.next = 3,
                                        this._getAdVast(Qu.Rewarded);
                                    case 3:
                                        return this.preloadedRewardedAdVast = e.sent,
                                        e.abrupt("return", this.preloadedRewardedAdVast.url);
                                    case 7:
                                        throw e.prev = 7,
                                        e.t0 = e.catch(0),
                                        new Error(e.t0);
                                    case 10:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this, [[0, 7]])
                        })),
                        function() {
                            return cl.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_onError",
                        value: function(e) {
                            this.cancel(),
                            this._clearSafetyTimer("ERROR")
                        }
                    }, {
                        key: "_hide",
                        value: function(e) {
                            this.video_ad_player.src = "",
                            this.activeAdContainer && (this.activeAdContainer.style.visibility = "hidden")
                        }
                    }, {
                        key: "_show",
                        value: function(e) {
                            var t, n, r = this;
                            this.activeAdContainer && (this.activeAdContainer.style.visibility = "visible",
                            t = null == e ? void 0 : e.mode,
                            n = this._isT4R(e),
                            e = this._getT4ROptions(),
                            "loaded" === t ? (this.activeAdContainer.style.opacity = n ? .001 : 1,
                            n && this.eventBus.broadcast("AD_T4R"),
                            n && setTimeout(function() {
                                p(this, r),
                                this.activeAdContainer.style.opacity = 1
                            }
                            .bind(this), ((null == e ? void 0 : e.min) || 1234) + Math.random() * ((null == e ? void 0 : e.max) || 3210))) : "click" !== t && "first_quartile" !== t || (this.activeAdContainer.style.opacity = 1))
                        }
                    }, {
                        key: "_createPlayer",
                        value: function() {
                            var n = this
                              , e = document.body || document.getElementsByTagName("body")[0];
                            this.adContainer = document.createElement("div"),
                            this.adContainer.id = "".concat(this.prefix, "advertisement"),
                            this.adContainer.style.position = this.thirdPartyContainer ? "absolute" : "fixed",
                            this.adContainer.style.zIndex = hd,
                            this.adContainer.style.top = "0",
                            this.adContainer.style.left = "0",
                            this.adContainer.style.width = "100%",
                            this.adContainer.style.height = "100%",
                            this.thirdPartyContainer && (this.thirdPartyContainer.style.transform = null);
                            var r = document.createElement("video");
                            r.setAttribute("playsinline", !0),
                            r.setAttribute("webkit-playsinline", !0),
                            r.id = "".concat(this.prefix, "advertisement_video"),
                            r.style.position = "absolute",
                            r.style.backgroundColor = "#000000",
                            r.style.top = "0",
                            r.style.left = "0",
                            r.style.width = this.options.width + "px",
                            r.style.height = this.options.height + "px",
                            this.video_ad_player = r,
                            this.adContainer.appendChild(r);
                            var i = document.createElement("div");
                            i.id = "".concat(this.prefix, "advertisement_slot"),
                            i.style.position = "absolute",
                            i.style.top = "0",
                            i.style.left = "0",
                            i.style.width = this.options.width + "px",
                            i.style.height = this.options.height + "px",
                            this.adContainerInner = i,
                            this.activeAdContainer = this.adContainer,
                            this.thirdPartyContainer ? (this.adContainer.appendChild(i),
                            this.thirdPartyContainer.appendChild(this.adContainer),
                            this.activeAdContainer = this.thirdPartyContainer) : (this.adContainer.appendChild(i),
                            e.appendChild(this.adContainer)),
                            this.addAdResume(),
                            this.activeAdContainer.style.visibility = "hidden";
                            e = function() {
                                p(this, n);
                                var e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                                  , t = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                                this.options.width = this.thirdPartyContainer ? this.thirdPartyContainer.offsetWidth : e,
                                this.options.height = this.thirdPartyContainer ? this.thirdPartyContainer.offsetHeight : t,
                                i.style.width = this.options.width + "px",
                                i.style.height = this.options.height + "px",
                                r.style.width = this.options.width + "px",
                                r.style.height = this.options.height + "px"
                            }
                            .bind(this);
                            window.addEventListener("resize", e),
                            window.document.addEventListener("DOMContentLoaded", e)
                        }
                    }, {
                        key: "_setUpIMA",
                        value: function() {
                            this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainerInner,this.video_ad_player),
                            this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer),
                            this.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(!0),
                            this.adsLoader.getSettings().setLocale(this.options.locale),
                            this.adsLoader.getSettings().setVpaidMode(this._getVPAIDMode()),
                            this.adsLoader.getSettings().setAutoPlayAdBreaks(!0),
                            this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._onAdsManagerLoaded, !1, this),
                            this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._onAdError, !1, this)
                        }
                    }, {
                        key: "_onAdsManagerLoaded",
                        value: function(e) {
                            var t = this
                              , n = new google.ima.AdsRenderingSettings;
                            n.autoAlign = !1,
                            n.enablePreloading = !1,
                            n.restoreCustomPlaybackStateOnAdBreakComplete = !0,
                            n.useStyledNonLinearAds = !0,
                            n.uiElements = [google.ima.UiElements.AD_ATTRIBUTION, google.ima.UiElements.COUNTDOWN],
                            this.adsManager = e.getAdsManager(this.video_ad_player, n),
                            this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._onAdError.bind(this), !1, this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_METADATA, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.DURATION_CHANGE, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.IMPRESSION, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.INTERACTION, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.LINEAR_CHANGED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.LOG, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.MIDPOINT, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED, this._onAdEvent.bind(this), this),
                            this.adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_MUTED, this._onAdEvent.bind(this), this),
                            window.addEventListener("resize", function() {
                                p(this, t),
                                this.adsManager && this.adsManager.resize(this.options.width, this.options.height, google.ima.ViewMode.NORMAL)
                            }
                            .bind(this)),
                            this.adDisplayContainerInitialized || (this.adDisplayContainer.initialize(),
                            this.adDisplayContainerInitialized = !0);
                            var r = new Date
                              , i = r.getHours()
                              , o = r.getDate()
                              , a = r.getMonth()
                              , n = r.getFullYear()
                              , r = "AD_SDK_MANAGER_READY";
                            this.eventBus.broadcast(r, {
                                name: r,
                                message: "AD SDK is ready",
                                status: "success",
                                analytics: {
                                    category: r,
                                    action: this.parentDomain,
                                    label: "h".concat(i, " d").concat(o, " m").concat(a, " y").concat(n)
                                }
                            }),
                            this._adrequest_user_context = e.getUserRequestContext()
                        }
                    }, {
                        key: "_onAdEvent",
                        value: function(e) {
                            var t, n, r = new Date, i = r.getHours(), o = r.getDate(), a = r.getMonth(), s = r.getFullYear(), c = (t = google.ima.AdEvent.Type,
                            n = e.type,
                            Object.keys(t).find(function(e) {
                                return t[e] === n
                            })), u = !1, r = e.getAd().getContentType() || "", d = !r.startsWith("image") && !r.startsWith("text");
                            this._sendIMAEventsToHB(e);
                            var l = "";
                            switch (e.type) {
                            case google.ima.AdEvent.Type.AD_BREAK_READY:
                                l = "Fired when an ad rule or a VMAP ad break would have played if autoPlayAdBreaks is false.";
                                break;
                            case google.ima.AdEvent.Type.AD_METADATA:
                                l = "Fired when an ads list is loaded.";
                                break;
                            case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                                u = !0,
                                l = "Fired when the ads manager is done playing all the ads.";
                                break;
                            case google.ima.AdEvent.Type.CLICK:
                                var l = "Fired when the ad is clicked."
                                  , h = e.getAd().getContentType();
                                this._show({
                                    mode: "click",
                                    contentType: h
                                });
                                break;
                            case google.ima.AdEvent.Type.COMPLETE:
                                u = this._is_completed(e.getAd()),
                                l = "Fired when the ad completes playing.";
                                break;
                            case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                                l = "Fired when content should be paused. This usually happens right before an ad is about to cover the content.";
                                break;
                            case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                                l = "Fired when content should be resumed. This usually happens when an ad finishes or collapses.",
                                u = !0;
                                break;
                            case google.ima.AdEvent.Type.DURATION_CHANGE:
                                l = "Fired when the ad's duration changes.";
                                break;
                            case google.ima.AdEvent.Type.FIRST_QUARTILE:
                                l = "Fired when the ad playhead crosses first quartile.";
                                var f = e.getAd().getContentType();
                                this._show({
                                    mode: "first_quartile",
                                    contentType: f
                                });
                                break;
                            case google.ima.AdEvent.Type.IMPRESSION:
                                l = "Fired when the impression URL has been pinged.";
                                break;
                            case google.ima.AdEvent.Type.INTERACTION:
                                l = "Fired when an ad triggers the interaction callback. Ad interactions contain an interaction ID string in the ad data.";
                                break;
                            case google.ima.AdEvent.Type.LINEAR_CHANGED:
                                l = "Fired when the displayed ad changes from linear to nonlinear, or vice versa.";
                                break;
                            case google.ima.AdEvent.Type.LOADED:
                                f = e.getAd().getContentType();
                                this._show({
                                    mode: "loaded",
                                    contentType: l = f
                                });
                                break;
                            case google.ima.AdEvent.Type.LOG:
                                e.getAdData().adError && (l = e.getAdData());
                                break;
                            case google.ima.AdEvent.Type.MIDPOINT:
                                l = "Fired when the ad playhead crosses midpoint.";
                                break;
                            case google.ima.AdEvent.Type.PAUSED:
                                d && this.adResume.show(),
                                l = "Fired when the ad is paused.";
                                break;
                            case google.ima.AdEvent.Type.RESUMED:
                                l = "Fired when the ad is resumed.",
                                d && this.adResume.hide();
                                break;
                            case google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED:
                                l = "Fired when the displayed ads skippable state is changed.";
                                break;
                            case google.ima.AdEvent.Type.SKIPPED:
                                u = this._is_completed(e.getAd()),
                                l = "Fired when the ad is skipped by the user.";
                                break;
                            case google.ima.AdEvent.Type.STARTED:
                                l = "Fired when the ad starts playing.";
                                break;
                            case google.ima.AdEvent.Type.THIRD_QUARTILE:
                                l = "Fired when the ad playhead crosses third quartile.";
                                break;
                            case google.ima.AdEvent.Type.USER_CLOSE:
                                u = this._is_completed(e.getAd()),
                                l = "Fired when the ad is closed by the user.";
                                break;
                            case google.ima.AdEvent.Type.VOLUME_CHANGED:
                                l = "Fired when the ad volume has changed.";
                                break;
                            case google.ima.AdEvent.Type.VOLUME_MUTED:
                                l = "Fired when the ad volume has been muted."
                            }
                            "" !== c && "" !== l && this.eventBus.broadcast(c, {
                                name: c,
                                message: l,
                                status: "success",
                                analytics: {
                                    category: c,
                                    action: this.parentDomain,
                                    label: "h".concat(i, " d").concat(o, " m").concat(a, " y").concat(s)
                                }
                            }),
                            u && !this.adSuccess && (this.adSuccess = !0,
                            this.eventBus.broadcast("AD_SUCCESS", {
                                message: "Ad succeeded.",
                                status: "success"
                            }),
                            this.resetForNext(e))
                        }
                    }, {
                        key: "_onAdError",
                        value: function(e) {
                            this.requestRunning = !1,
                            this._resetAdsLoader(),
                            this._clearSafetyTimer("ERROR"),
                            this._hide("_onAdError"),
                            this._sendIMAEventsToHB(e);
                            try {
                                var t = "AD_ERROR"
                                  , n = e.getError()
                                  , r = n.getErrorCode().toString() || n.getVastErrorCode().toString()
                                  , i = this._getInnerErrorCode(n);
                                this.eventBus.broadcast(t, {
                                    message: r,
                                    details: i,
                                    status: "warning",
                                    analytics: {
                                        category: t,
                                        action: i,
                                        label: r
                                    }
                                })
                            } catch (e) {}
                        }
                    }, {
                        key: "_sendIMAEventsToHB",
                        value: function(e) {
                            if (window.idhb && "function" == typeof window.idhb.onImaEvent)
                                try {
                                    window.idhb.onImaEvent(e)
                                } catch (e) {}
                        }
                    }, {
                        key: "_resetAdsLoader",
                        value: function() {
                            this.adsManager && (this.adsManager.destroy(),
                            this.adsManager = null,
                            this._adrequest_user_context = null),
                            this.adsLoader && this.adsLoader.contentComplete()
                        }
                    }, {
                        key: "_startSafetyTimer",
                        value: function(e, t) {
                            var n = this;
                            this.safetyTimer && clearTimeout(this.safetyTimer),
                            this.safetyTimer = window.setTimeout(function() {
                                p(this, n),
                                this.cancel(),
                                this._clearSafetyTimer(t)
                            }
                            .bind(this), e)
                        }
                    }, {
                        key: "_clearSafetyTimer",
                        value: function(e) {
                            void 0 !== this.safetyTimer && null !== this.safetyTimer && (clearTimeout(this.safetyTimer),
                            this.safetyTimer = void 0)
                        }
                    }, {
                        key: "_getVPAIDMode",
                        value: function() {
                            return google.ima.ImaSdkSettings.VpaidMode.ENABLED
                        }
                    }, {
                        key: "_getPrebidScripts",
                        value: function() {
                            // var e = ["js/gameDistributionV1.3.min.js", "js/gameDistributionV1.3.min.js"];
                            var e = ["js/null.js", "js/null.js"];
                            return this.options.hb_script ? [this.options.hb_script].concat(e) : e
                        }
                    }, {
                        key: "_getInnerErrorCode",
                        value: function(e) {
                            if (Uu(e.getInnerError)) {
                                e = e.getInnerError();
                                if (e)
                                    return Uu(e.getErrorCode) && Uu(e.getVastErrorCode) ? e.getErrorCode().toString() || e.getVastErrorCode().toString() : e.message
                            }
                        }
                    }, {
                        key: "resetForNext",
                        value: function() {
                            this.requestRunning = !1,
                            this._hide("resetForNext")
                        }
                    }, {
                        key: "_createCustomAdVastUrl",
                        value: function(e, t) {
                            var n = this;
                            if (e) {
                                var r, i = this.macros.transform(e, {
                                    get: function(e) {
                                        if (p(this, n),
                                        t && t.tnl_keys)
                                            return t.tnl_keys[e.toLowerCase()]
                                    }
                                    .bind(this)
                                });
                                for (r in i.query || {}) {
                                    var o = i.query[r];
                                    Mu(o) && (i.query[r] = vu.stringify(o))
                                }
                                e = new Lu(i.url,!0);
                                return Pd(e.query, i.query || {}),
                                sl({
                                    url: e.toString()
                                }, t)
                            }
                        }
                    }, {
                        key: "_transformVast",
                        value: function(e, t) {
                            var n = {
                                url: e.url
                            };
                            try {
                                var r = new Lu(e.url,!0)
                                  , i = this._transformQuery(e, t, r);
                                i && (n.url = r.toString());
                                var o, a = i ? r : new Lu(e.url,!0);
                                a.query.cust_params && (o = vu.parse(a.query.cust_params),
                                n.bidder = o.hb_bidder,
                                n.cust_params = o),
                                n.url_parsed = a
                            } catch (e) {
                                n.hasError = !0,
                                n.message = e.message,
                                n.bidder = "error",
                                console.log(e.message)
                            }
                            return n
                        }
                    }, {
                        key: "_transformQuery",
                        value: function(t, e, n) {
                            var r = this;
                            if (t && e && t.tnl_keys) {
                                var i = this.options.vast_query;
                                if (e.retry_on_success && this.options.retry_on_success && Mu(this.options.retry_on_success.vast_query) ? i = this.options.retry_on_success.vast_query : e.retry_on_failure && this.options.retry_on_failure && Mu(this.options.retry_on_failure.vast_query) && (i = this.options.retry_on_failure.vast_query),
                                Mu(i = ju(i))) {
                                    var o = n.query;
                                    if (i.$$remove) {
                                        for (var a in o)
                                            new RegExp(i.$$remove,"i").test(a) && delete o[a];
                                        delete i.$$remove
                                    }
                                    var s = vu.parse(o.cust_params);
                                    if (i.cust_params && i.cust_params.$$remove) {
                                        for (var c in s)
                                            new RegExp(i.cust_params.$$remove,"i").test(c) && delete s[c];
                                        delete i.cust_params.$$remove
                                    }
                                    n = this.macros.transform(i, {
                                        get: function(e) {
                                            return p(this, r),
                                            t.tnl_keys[e.toLowerCase()]
                                        }
                                        .bind(this)
                                    });
                                    return o.cust_params = s,
                                    Pd(o, n),
                                    o.cust_params = vu.stringify(o.cust_params),
                                    !0
                                }
                            }
                        }
                    }, {
                        key: "_isT4R",
                        value: function(e) {
                            var t, n, r, i, o, a, s, c = null === (c = this._adrequest_user_context) || void 0 === c ? void 0 : c.tnl_ad_pos;
                            return c && ((null == e || null === (t = e.contentType) || void 0 === t ? void 0 : t.startsWith("image/")) || "text" === (null == e ? void 0 : e.contentType)) && ("preroll" === c && (null === (e = this.gameData) || void 0 === e || null === (n = e.pAds) || void 0 === n || null === (r = n.t4r) || void 0 === r ? void 0 : r.enabled) || "midroll" === c && (null === (r = this.gameData) || void 0 === r || null === (i = r.mAds) || void 0 === i || null === (o = i.t4r) || void 0 === o ? void 0 : o.enabled) || "rewarded" === c && (null === (c = this.gameData) || void 0 === c || null === (a = c.rAds) || void 0 === a || null === (s = a.t4r) || void 0 === s ? void 0 : s.enabled))
                        }
                    }, {
                        key: "_isVMAP",
                        value: function(e) {
                            var t, n, r, i, o, a, s, c;
                            if (!e)
                                return !1;
                            var u = "preroll" === e && (!0 === (null === (t = this.gameData) || void 0 === t || null === (n = t.pAds) || void 0 === n ? void 0 : n.vmap) || !0 === (null === (n = this.gameData) || void 0 === n || null === (r = n.pAds) || void 0 === r || null === (i = r.vmap) || void 0 === i ? void 0 : i.enabled)) || "midroll" === e && (!0 === (null === (i = this.gameData) || void 0 === i || null === (o = i.mAds) || void 0 === o ? void 0 : o.vmap) || !0 === (null === (o = this.gameData) || void 0 === o || null === (a = o.mAds) || void 0 === a || null === (s = a.vmap) || void 0 === s ? void 0 : s.enabled)) || "rewarded" === e && (!0 === (null === (s = this.gameData) || void 0 === s || null === (c = s.rAds) || void 0 === c ? void 0 : c.vmap) || !0 === (null === (c = this.gameData) || void 0 === c || null === (u = c.rAds) || void 0 === u || null === (d = u.vmap) || void 0 === d ? void 0 : d.enabled));
                            if (!u)
                                return !1;
                            var d = this._get_vmap_config(e)
                              , e = this.adCounter[e];
                            return void 0 !== (null == d ? void 0 : d.start) ? e >= (null == d ? void 0 : d.start) : u
                        }
                    }, {
                        key: "_getT4ROptions",
                        value: function() {
                            var e, t, n, r, i;
                            switch (null === (e = this._adrequest_user_context) || void 0 === e ? void 0 : e.tnl_ad_pos) {
                            case "preroll":
                                return null === (t = this.gameData) || void 0 === t || null === (n = t.pAds) || void 0 === n ? void 0 : n.t4r;
                            case "midroll":
                                return null === (n = this.gameData) || void 0 === n || null === (r = n.mAds) || void 0 === r ? void 0 : r.t4r;
                            case "rewarded":
                                return null === (r = this.gameData) || void 0 === r || null === (i = r.rAds) || void 0 === i ? void 0 : i.t4r
                            }
                        }
                    }, {
                        key: "_is_completed",
                        value: function(e) {
                            var t = e.getContentType()
                              , e = e.getAdPodInfo();
                            return !(!t.startsWith("image/") && "text" !== t && 1 !== e.getTotalAds())
                        }
                    }, {
                        key: "_get_vmap_context",
                        value: function(e) {
                            var t = e.adtag
                              , n = e.position
                              , r = e.config
                              , i = e.dp
                              , o = this._createCustomAdVastUrl(null == r ? void 0 : r.vast_1) || t
                              , e = this._createCustomAdVastUrl(null == r ? void 0 : r.vast_2) || t
                              , t = null != r && r.vast_1 ? void 0 : i
                              , i = null != r && r.vast_2 ? void 0 : i;
                            return {
                                adtag_url_1: null == o ? void 0 : o.url,
                                adtag_url_2: null == e ? void 0 : e.url,
                                position: n,
                                dp_1: t,
                                dp_2: i
                            }
                        }
                    }, {
                        key: "_get_vmap_config",
                        value: function(e) {
                            var t, n, r, i, o;
                            switch (e) {
                            case "preroll":
                                return null === (t = this.gameData) || void 0 === t || null === (n = t.pAds) || void 0 === n ? void 0 : n.vmap;
                            case "midroll":
                                return null === (n = this.gameData) || void 0 === n || null === (r = n.mAds) || void 0 === r ? void 0 : r.vmap;
                            case "rewarded":
                                return null === (r = this.gameData) || void 0 === r || null === (i = r.rAds) || void 0 === i ? void 0 : i.vmap;
                            default:
                                return null === (i = this.gameData) || void 0 === i || null === (o = i.pAds) || void 0 === o ? void 0 : o.vmap
                            }
                        }
                    }, {
                        key: "_isDP",
                        value: function(e) {
                            var t, n, r, i, o, a, s, c, u, d;
                            return !!e && ("preroll" === e && (!0 === (null === (t = this.gameData) || void 0 === t || null === (n = t.pAds) || void 0 === n ? void 0 : n.dp) || !0 === (null === (n = this.gameData) || void 0 === n || null === (r = n.pAds) || void 0 === r || null === (i = r.dp) || void 0 === i ? void 0 : i.enabled)) || "midroll" === e && (!0 === (null === (i = this.gameData) || void 0 === i || null === (o = i.mAds) || void 0 === o ? void 0 : o.dp) || !0 === (null === (o = this.gameData) || void 0 === o || null === (a = o.mAds) || void 0 === a || null === (s = a.dp) || void 0 === s ? void 0 : s.enabled)) || "rewarded" === e && (!0 === (null === (e = this.gameData) || void 0 === e || null === (c = e.rAds) || void 0 === c ? void 0 : c.dp) || !0 === (null === (c = this.gameData) || void 0 === c || null === (u = c.rAds) || void 0 === u || null === (d = u.dp) || void 0 === d ? void 0 : d.enabled)))
                        }
                    }, {
                        key: "_create_dp_display_context",
                        value: function() {
                            var o = this;
                            return new Promise(function(t) {
                                var n = this;
                                p(this, o);
                                try {
                                    var e = {
                                        id: this.topDomain || this.parentDomain,
                                        au: "display",
                                        ty: "display",
                                        aid: this.gameData.gameId,
                                        pgu: this.parentURL
                                    }
                                      , r = new wd(this.gameData).checkCustomParams();
                                    r && (e.cp = r);
                                    var i = encodeURIComponent(il(JSON.stringify(e)));
                                    fetch("https://tag.atom.gamedistribution.com/v1/atm?ar=".concat(i)).then(function(e) {
                                        return p(this, n),
                                        e.json()
                                    }
                                    .bind(this)).then(function(e) {
                                        if (p(this, n),
                                        !e || !e.p)
                                            return this.msgrt.send("dp.na", {
                                                message: "atom"
                                            }),
                                            t();
                                        this.msgrt.send("dp.fp", {
                                            message: e.p / 100
                                        }),
                                        t({
                                            params: {
                                                fp: e.p / 100
                                            },
                                            error_url: "https://tag.atom.gamedistribution.com/v1/err?ar=".concat(i),
                                            impression_url: "https://tag.atom.gamedistribution.com/v1/imp?ar=".concat(i)
                                        })
                                    }
                                    .bind(this)).catch(function(e) {
                                        p(this, n),
                                        this.msgrt.send("dp.err", {
                                            message: (null == e ? void 0 : e.message) || e
                                        }),
                                        t()
                                    }
                                    .bind(this))
                                } catch (e) {
                                    this.msgrt.send("dp.err", {
                                        message: (null == e ? void 0 : e.message) || e
                                    }),
                                    t()
                                }
                            }
                            .bind(this))
                        }
                    }, {
                        key: "_create_dp_context",
                        value: function(s) {
                            var t, c = this;
                            return new Promise((t = Vn(Yn.mark(function e(t) {
                                var n, r, i, o, a = this;
                                return Yn.wrap(function(e) {
                                    for (; ; )
                                        switch (e.prev = e.next) {
                                        case 0:
                                            if (e.prev = 0,
                                            c._isDP(s)) {
                                                e.next = 5;
                                                break
                                            }
                                            return c.msgrt.send("dp.na", {
                                                message: "rule"
                                            }),
                                            e.abrupt("return", t());
                                        case 5:
                                            n = {
                                                id: c.topDomain || c.parentDomain,
                                                au: s || "unknown",
                                                ty: "video",
                                                aid: c.gameData.gameId,
                                                pgu: c.parentURL
                                            },
                                            (r = new wd(c.gameData).checkCustomParams()) && (n.cp = r),
                                            i = encodeURIComponent(il(JSON.stringify(n))),
                                            o = null === (n = c.gameData.promo) || void 0 === n ? void 0 : n.rainbow,
                                            fetch("https://tag.atom.gamedistribution.com/v1/atm?ar=".concat(i)).then(function(e) {
                                                return p(this, a),
                                                e.json()
                                            }
                                            .bind(this)).then(function(e) {
                                                if (p(this, a),
                                                !e || !e.p)
                                                    return c.msgrt.send("dp.na", {
                                                        message: "atom"
                                                    }),
                                                    t();
                                                e = e.p / 100;
                                                t({
                                                    id: Date.now(),
                                                    floor_price: e,
                                                    error_url: "https://tag.atom.gamedistribution.com/v1/err?ar=".concat(i, "&ec=[ERRORCODE]"),
                                                    impression_url: "https://tag.atom.gamedistribution.com/v1/imp?ar=".concat(i),
                                                    skip_url: "https://tag.atom.gamedistribution.com/v1/skp?ar=".concat(i),
                                                    promo_url: null != o && o.enabled ? "https://tag.atom.gamedistribution.com/v1/rainbow?ar=".concat(i) : void 0,
                                                    promo_imp_blue_url: null != o && o.enabled ? "https://tag.atom.gamedistribution.com/v1/rainbow/blue" : void 0,
                                                    promo_imp_green_url: null != o && o.enabled ? "https://tag.atom.gamedistribution.com/v1/rainbow/green" : void 0
                                                })
                                            }
                                            .bind(this)).catch(function(e) {
                                                p(this, a),
                                                c.msgrt.send("dp.err", {
                                                    message: (null == e ? void 0 : e.message) || e
                                                }),
                                                t()
                                            }
                                            .bind(this)),
                                            e.next = 17;
                                            break;
                                        case 13:
                                            e.prev = 13,
                                            e.t0 = e.catch(0),
                                            c.msgrt.send("dp.err", {
                                                message: (null === e.t0 || void 0 === e.t0 ? void 0 : e.t0.message) || e.t0
                                            }),
                                            t();
                                        case 17:
                                        case "end":
                                            return e.stop()
                                        }
                                }, e, this, [[0, 13]])
                            })),
                            function(e) {
                                return t.apply(this, arguments)
                            }
                            ))
                        }
                    }]),
                    Cl), q = R, Al = f, El = I, kl = It, xl = At, Sl = h, Dl = _e, It = ce, ee = ee("slice"), Tl = It("species"), Rl = [].slice, Ol = Math.max;
                    function Cl(e, t, n) {
                        var r = this;
                        if (Kn(this, Cl),
                        _l)
                            return _l;
                        var i = {
                            debug: !1,
                            width: 640,
                            height: 360,
                            locale: "en"
                        };
                        (_l = this).options = t ? Ju(i, t) : i,
                        this.prefix = "gdsdk__",
                        this.adsLoader = null,
                        this.adsManager = null,
                        this.adDisplayContainer = null,
                        this.eventBus = new md,
                        this.safetyTimer = null,
                        this.containerTransitionSpeed = 0,
                        this.adCounter = {},
                        this.adPrerollCount = 0,
                        this.adMidrollCount = 0,
                        this.adRewardedCount = 0,
                        this.preloadedAdType = null,
                        this.requestRunning = !1,
                        this.parentDomain = n.parentDomain,
                        this.topDomain = n.topDomain,
                        this.parentURL = n.parentURL,
                        this.adDisplayContainerInitialized = !1,
                        this.IMASampleTags = {
                            interstitial: ["https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=", "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dredirectlinear&correlator=", "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dredirecterror&correlator="],
                            rewarded: ["https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator="]
                        },
                        this.atom_display,
                        this.userAllowedPersonalizedAds = 0 <= document.location.search.indexOf("gdpr-targeting=0") || 0 <= document.cookie.indexOf("ogdpr_advertisement=0") ? "0" : "1",
                        this.parentDomain.includes("girlsgogames") && (this.userAllowedPersonalizedAds = !1),
                        this.thirdPartyContainer = "" !== e ? document.getElementById(e) : null,
                        this.options.width = "number" == typeof this.options.width ? this.options.width : "100%" === this.options.width ? 640 : this.options.width.replace(/[^0-9]/g, ""),
                        this.options.height = "number" == typeof this.options.height ? this.options.height : "100%" === this.options.height ? 360 : this.options.height.replace(/[^0-9]/g, "");
                        n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                        e = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                        this.options.width = this.thirdPartyContainer ? this.thirdPartyContainer.offsetWidth : n,
                        this.options.height = this.thirdPartyContainer ? this.thirdPartyContainer.offsetHeight : e,
                        this.gameId = "0",
                        this.category = "",
                        this.tags = [],
                        this.eventCategory = "AD",
                        this.eventBus.subscribe("LOADED", function() {
                            p(this, r),
                            this._clearSafetyTimer("LOADED"),
                            this._startSafetyTimer(8e3, "LOADED")
                        }
                        .bind(this), "ima"),
                        this.eventBus.subscribe("STARTED", function() {
                            p(this, r),
                            this._clearSafetyTimer("STARTED")
                        }
                        .bind(this), "ima")
                    }
                    q({
                        target: "Array",
                        proto: !0,
                        forced: !ee
                    }, {
                        slice: function(e, t) {
                            var n, r, i, o = Sl(this), a = xl(o.length), s = kl(e, a), c = kl(void 0 === t ? a : t, a);
                            if (El(o) && ((n = "function" == typeof (n = o.constructor) && (n === Array || El(n.prototype)) || Al(n) && null === (n = n[Tl]) ? void 0 : n) === Array || void 0 === n))
                                return Rl.call(o, s, c);
                            for (r = new (void 0 === n ? Array : n)(Ol(c - s, 0)),
                            i = 0; s < c; s++,
                            i++)
                                s in o && Dl(r, i, o[s]);
                            return r.length = i,
                            r
                        }
                    });
                    var Il = Te
                      , Pl = G
                      , Ll = yn
                      , jl = H
                      , Bl = Bt
                      , Ml = At
                      , Ul = _e
                      , Nl = D;
                    R({
                        target: "Array",
                        stat: !0,
                        forced: !qt(function(e) {
                            Array.from(e)
                        })
                    }, {
                        from: function(e) {
                            var t, n, r, i, o, a, s = jl(e), c = "function" == typeof this ? this : Array, u = arguments.length, d = 1 < u ? arguments[1] : void 0, l = void 0 !== d, e = Nl(s), h = 0;
                            if (l && (d = Ll(d, 2 < u ? arguments[2] : void 0, 2)),
                            null == e || c == Array && Bl(e))
                                for (n = new c(t = Ml(s.length)); h < t; h++)
                                    a = l ? d(s[h], h) : s[h],
                                    Ul(n, h, a);
                            else
                                for (o = (i = e.call(s)).next,
                                n = new c; !(r = o.call(i)).done; h++)
                                    a = l ? function(e, t, n, r) {
                                        try {
                                            return r ? t(Il(n)[0], n[1]) : t(n)
                                        } catch (t) {
                                            throw Pl(e),
                                            t
                                        }
                                    }(i, d, [r.value, h], !0) : r.value,
                                    Ul(n, h, a);
                            return n.length = h,
                            n
                        }
                    });
                    var Gl, _e = !i(function() {
                        function e() {}
                        return e.prototype.constructor = null,
                        Object.getPrototypeOf(new e) !== e.prototype
                    }), Fl = Y, ql = H, D = _e, zl = rt("IE_PROTO"), Vl = Object.prototype, qt = D ? Object.getPrototypeOf : function(e) {
                        return e = ql(e),
                        Fl(e, zl) ? e[zl] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? Vl : null
                    }
                    , H = i, _e = qt, rt = Ue, D = Y, Kl = ce("iterator"), i = !1;
                    [].keys && ("next"in (Y = [].keys()) ? (Y = _e(_e(Y))) !== Object.prototype && (Gl = Y) : i = !0),
                    D(Gl = null == Gl || H(function() {
                        var e = {};
                        return Gl[Kl].call(e) !== e
                    }) ? {} : Gl, Kl) || rt(Gl, Kl, function() {
                        return this
                    });
                    function Hl() {
                        return this
                    }
                    var i = {
                        IteratorPrototype: Gl,
                        BUGGY_SAFARI_ITERATORS: i
                    }
                      , Wl = i.IteratorPrototype
                      , $l = Qe
                      , Yl = d
                      , Ql = ht
                      , Jl = ut
                      , Zl = function() {
                        return this
                    }
                      , Xl = R
                      , eh = qt
                      , th = ct
                      , nh = ht
                      , rh = Ue
                      , ih = Ne.exports
                      , oh = ut
                      , ah = i.IteratorPrototype
                      , sh = i.BUGGY_SAFARI_ITERATORS
                      , ch = ce("iterator")
                      , uh = "values"
                      , dh = "entries"
                      , i = function(e, t, n, r, i, o, a) {
                        !function(e, t, n) {
                            t += " Iterator";
                            e.prototype = $l(Wl, {
                                next: Yl(1, n)
                            }),
                            Ql(e, t, !1),
                            Jl[t] = Zl
                        }(n, t, r);
                        function s(e) {
                            if (e === i && p)
                                return p;
                            if (!sh && e in h)
                                return h[e];
                            switch (e) {
                            case "keys":
                            case uh:
                            case dh:
                                return function() {
                                    return new n(this,e)
                                }
                            }
                            return function() {
                                return new n(this)
                            }
                        }
                        var c, u, d = t + " Iterator", l = !1, h = e.prototype, f = h[ch] || h["@@iterator"] || i && h[i], p = !sh && f || s(i), r = "Array" == t && h.entries || f;
                        if (r && (e = eh(r.call(new e)),
                        ah !== Object.prototype && e.next && (eh(e) !== ah && (th ? th(e, ah) : "function" != typeof e[ch] && rh(e, ch, Hl)),
                        nh(e, d, !0))),
                        i == uh && f && f.name !== uh && (l = !0,
                        p = function() {
                            return f.call(this)
                        }
                        ),
                        h[ch] !== p && rh(h, ch, p),
                        oh[t] = p,
                        i)
                            if (c = {
                                values: s(uh),
                                keys: o ? p : s("keys"),
                                entries: s(dh)
                            },
                            a)
                                for (u in c)
                                    !sh && !l && u in h || ih(h, u, c[u]);
                            else
                                Xl({
                                    target: t,
                                    proto: !0,
                                    forced: sh || l
                                }, c);
                        return c
                    }
                      , lh = dt.charAt
                      , hh = Qr
                      , dt = ft
                      , Qr = i
                      , fh = "String Iterator"
                      , ph = dt.set
                      , gh = dt.getterFor(fh);
                    Qr(String, "String", function(e) {
                        ph(this, {
                            type: fh,
                            string: hh(e),
                            index: 0
                        })
                    }, function() {
                        var e = gh(this)
                          , t = e.string
                          , n = e.index;
                        return n >= t.length ? {
                            value: void 0,
                            done: !0
                        } : (n = lh(t, n),
                        e.index += n.length,
                        {
                            value: n,
                            done: !1
                        })
                    }),
                    St("iterator");
                    var mh = h
                      , ne = ne
                      , ut = ut
                      , ft = ft
                      , i = i
                      , vh = "Array Iterator"
                      , yh = ft.set
                      , bh = ft.getterFor(vh)
                      , i = i(Array, "Array", function(e, t) {
                        yh(this, {
                            type: vh,
                            target: mh(e),
                            index: 0,
                            kind: t
                        })
                    }, function() {
                        var e = bh(this)
                          , t = e.target
                          , n = e.kind
                          , r = e.index++;
                        return !t || r >= t.length ? {
                            value: e.target = void 0,
                            done: !0
                        } : "keys" == n ? {
                            value: r,
                            done: !1
                        } : "values" == n ? {
                            value: t[r],
                            done: !1
                        } : {
                            value: [r, t[r]],
                            done: !1
                        }
                    }, "values");
                    ut.Arguments = ut.Array,
                    ne("keys"),
                    ne("values"),
                    ne("entries");
                    var _h, wh = n, Ah = X, Eh = i, kh = Ue, ce = ce, xh = ce("iterator"), Sh = ce("toStringTag"), Dh = Eh.values;
                    for (_h in Ah) {
                        var Th = wh[_h]
                          , Rh = Th && Th.prototype;
                        if (Rh) {
                            if (Rh[xh] !== Dh)
                                try {
                                    kh(Rh, xh, Dh)
                                } catch (p) {
                                    Rh[xh] = Dh
                                }
                            if (Rh[Sh] || kh(Rh, Sh, _h),
                            Ah[_h])
                                for (var Oh in Eh)
                                    if (Rh[Oh] !== Eh[Oh])
                                        try {
                                            kh(Rh, Oh, Eh[Oh])
                                        } catch (p) {
                                            Rh[Oh] = Eh[Oh]
                                        }
                        }
                    }
                    function Ch(e, t) {
                        (null == t || t > e.length) && (t = e.length);
                        for (var n = 0, r = new Array(t); n < t; n++)
                            r[n] = e[n];
                        return r
                    }
                    function Ih(t, e) {
                        var n, r = Object.keys(t);
                        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
                        e && (n = n.filter(function(e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable
                        })),
                        r.push.apply(r, n)),
                        r
                    }
                    function Ph(t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = null != arguments[e] ? arguments[e] : {};
                            e % 2 ? Ih(Object(n), !0).forEach(function(e) {
                                qn(t, e, n[e])
                            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Ih(Object(n)).forEach(function(e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                            })
                        }
                        return t
                    }
                    function Lh(e, t) {
                        Fh[e] = Ph(Ph({}, t), {}, {
                            isLoading: !1
                        })
                    }
                    function jh(e) {
                        var r = this
                          , i = e.id
                          , o = e.src;
                        return new Promise(function(e, t) {
                            var n;
                            p(this, r),
                            document.getElementById(i) ? e() : ((n = document.createElement("script")).onload = function() {
                                e()
                            }
                            ,
                            n.id = i,
                            n.setAttribute("crossorigin", !0),
                            n.src = o,
                            document.head.appendChild(n))
                        }
                        .bind(this))
                    }
                    function Bh(e) {
                        var t = this;
                        Kn(this, Bh),
                        qn(this, "load", Vn(Yn.mark(function e() {
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2,
                                        qh(t.moduleName);
                                    case 2:
                                        t.stone = e.sent;
                                    case 3:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        }))),
                        qn(this, "promo", Vn(Yn.mark(function e() {
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (t.stone) {
                                            e.next = 3;
                                            break
                                        }
                                        return e.next = 3,
                                        t.load();
                                    case 3:
                                        return e.abrupt("return", t.stone[t.modulePromo]);
                                    case 4:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        }))),
                        this.moduleName = "GDPromoByOrbit",
                        this.modulePromo = e,
                        this.moduleConfig = {
                            source: "https://pm.gamedistribution.com/@bygd/gd-sdk-stone-dynamic/1.0.7/dist/" + this.modulePromo.toLowerCase() + "/iife/index.js",
                            dependencies: ["react", "react-dom", "material-ui-core"]
                        },
                        Lh(this.moduleName, this.moduleConfig)
                    }
                    function Mh(e) {
                        var t = this;
                        Kn(this, Mh),
                        qn(this, "load", Vn(Yn.mark(function e() {
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2,
                                        qh(t.moduleName);
                                    case 2:
                                        t.air = e.sent;
                                    case 3:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        }))),
                        qn(this, "splash", Vn(Yn.mark(function e() {
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (t.air) {
                                            e.next = 3;
                                            break
                                        }
                                        return e.next = 3,
                                        t.load();
                                    case 3:
                                        return e.abrupt("return", t.air[t.moduleSplash]);
                                    case 4:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        })));
                        var n = e.package || "gd-sdk-air-dynamic"
                          , r = e.package_version || "1.2.0"
                          , i = e.template || "pluto"
                          , e = e.dependencies || [];
                        this.moduleName = "GDSplashDynamic",
                        this.moduleSplash = i.charAt(0).toUpperCase() + i.slice(1),
                        this.moduleConfig = {
                            source: "https://pm.gamedistribution.com/@bygd/".concat(n, "/").concat(r, "/dist/").concat(i.toLowerCase(), "/iife/index.js"),
                            dependencies: e
                        },
                        Lh(this.moduleName, this.moduleConfig)
                    }
                    function Uh(e, t) {
                        console.log(e, t)
                    }
                    var Nh, Gh = {
                        react: {
                            src: "https://pm.gamedistribution.com/react/16.14.0/umd/react.production.min.js",
                            name: "React"
                        },
                        "react-dom": {
                            src: "https://pm.gamedistribution.com/react-dom/16.14.0/umd/react-dom.production.min.js",
                            name: "ReactDOM"
                        },
                        redux: {
                            src: "https://pm.gamedistribution.com/redux/4.0.5/dist/redux.min.js",
                            name: "Redux"
                        },
                        "react-redux": {
                            src: "https://pm.gamedistribution.com/react-redux/7.2.1/dist/react-redux.min.js",
                            name: "ReactRedux"
                        },
                        "material-ui-core": {
                            src: "https://pm.gamedistribution.com/@material-ui/core/4.11.3/umd/material-ui.production.min.js",
                            name: "MaterialUI"
                        }
                    }, Fh = {}, qh = (Nh = Vn(Yn.mark(function e(t) {
                        var n, r, i, o, a, s;
                        return Yn.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (n = window[t])
                                        return e.abrupt("return", n);
                                    e.next = 3;
                                    break;
                                case 3:
                                    if ((r = Fh[t]).isLoading)
                                        return e.abrupt("return");
                                    e.next = 6;
                                    break;
                                case 6:
                                    r.isLoading = !0,
                                    i = function e(t, n) {
                                        var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                                        if (!r) {
                                            if (Array.isArray(t) || (r = function(e) {
                                                if (e) {
                                                    if ("string" == typeof e)
                                                        return Ch(e, void 0);
                                                    var t = Object.prototype.toString.call(e).slice(8, -1);
                                                    return "Map" === (t = "Object" === t && e.constructor ? e.constructor.name : t) || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Ch(e, void 0) : void 0
                                                }
                                            }(t)) || n && t && "number" == typeof t.length) {
                                                r && (t = r);
                                                var i = 0
                                                  , n = function() {};
                                                return {
                                                    s: n,
                                                    n: function() {
                                                        return i >= t.length ? {
                                                            done: !0
                                                        } : {
                                                            done: !1,
                                                            value: t[i++]
                                                        }
                                                    },
                                                    e: function(e) {
                                                        throw e
                                                    },
                                                    f: n
                                                }
                                            }
                                            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                        }
                                        var o, a = !0, s = !1;
                                        return {
                                            s: function() {
                                                r = r.call(t)
                                            },
                                            n: function() {
                                                var e = r.next();
                                                return a = e.done,
                                                e
                                            },
                                            e: function(e) {
                                                s = !0,
                                                o = e
                                            },
                                            f: function() {
                                                try {
                                                    a || null == r.return || r.return()
                                                } finally {
                                                    if (s)
                                                        throw o
                                                }
                                            }
                                        }
                                    }(r.dependencies),
                                    e.prev = 8,
                                    i.s();
                                case 10:
                                    if ((a = i.n()).done) {
                                        e.next = 26;
                                        break
                                    }
                                    if (o = a.value,
                                    e.prev = 12,
                                    s = Gh[o].name,
                                    window[s])
                                        return e.abrupt("continue", 24);
                                    e.next = 16;
                                    break;
                                case 16:
                                    return e.next = 18,
                                    jh({
                                        id: o,
                                        src: Gh[o].src
                                    });
                                case 18:
                                    e.next = 24;
                                    break;
                                case 20:
                                    e.prev = 20,
                                    e.t0 = e.catch(12),
                                    a = o.id,
                                    s = o.src,
                                    console.log("Could not load external script ".concat(a, " ").concat(s), e.t0);
                                case 24:
                                    e.next = 10;
                                    break;
                                case 26:
                                    e.next = 31;
                                    break;
                                case 28:
                                    e.prev = 28,
                                    e.t1 = e.catch(8),
                                    i.e(e.t1);
                                case 31:
                                    return e.prev = 31,
                                    i.f(),
                                    e.finish(31);
                                case 34:
                                    return e.prev = 34,
                                    e.next = 37,
                                    jh({
                                        id: t,
                                        src: r.source
                                    });
                                case 37:
                                    n = window[t],
                                    e.next = 43;
                                    break;
                                case 40:
                                    e.prev = 40,
                                    e.t2 = e.catch(34),
                                    console.log("Could not load module ".concat(t, " ").concat(r.source, "."), e.t2);
                                case 43:
                                    return r.isLoading = !1,
                                    e.abrupt("return", n);
                                case 45:
                                case "end":
                                    return e.stop()
                                }
                        }, e, null, [[8, 28, 31, 34], [12, 20], [34, 40]])
                    })),
                    function(e) {
                        return Nh.apply(this, arguments)
                    }
                    ), zh = {}, Vh = {}, Kh = null;
                    function Hh() {
                        for (var e, t = window, n = null, r = null; !e; ) {
                            try {
                                if ("function" == typeof t.__tcfapi || "function" == typeof t.__cmp) {
                                    n = "function" == typeof t.__tcfapi ? (r = 2,
                                    t.__tcfapi) : (r = 1,
                                    t.__cmp),
                                    e = t;
                                    break
                                }
                            } catch (e) {}
                            try {
                                if (t.frames.__tcfapiLocator) {
                                    r = 2,
                                    e = t;
                                    break
                                }
                            } catch (e) {}
                            try {
                                if (t.frames.__cmpLocator) {
                                    r = 1,
                                    e = t;
                                    break
                                }
                            } catch (e) {}
                            if (t === window.top)
                                break;
                            t = t.parent
                        }
                        return zh.version = r,
                        zh.frame = e,
                        zh.function = n,
                        zh.version
                    }
                    function Wh(r) {
                        var t = this;
                        return Kh = Kh || new Promise(function(n) {
                            function e(e, t) {
                                if (Uh("Received a response from CMP", e),
                                t) {
                                    if (!1 !== e.gdprApplies)
                                        return "tcloaded" === e.eventStatus || "useractioncomplete" === e.eventStatus ? (("boolean" != typeof (t = e && "boolean" == typeof e.gdprApplies ? e.gdprApplies : r.defaultGdprScope) || !0 === t && "string" != typeof e.tcString) && n({
                                            result: "cmpUnexpectedResponse",
                                            cmp: zh,
                                            consentData: e
                                        }),
                                        void n({
                                            result: "ok",
                                            consentData: e
                                        })) : void 0;
                                    n({
                                        result: "ok",
                                        consentData: e
                                    })
                                } else
                                    n({
                                        result: "cmpCallFailed"
                                    })
                            }
                            p(this, t),
                            Hh(),
                            zh.frame ? 2 === zh.version ? (Uh("TCF v2 CMP found. Fetching the consent."),
                            zh.function ? (Uh("CMP API is directly accessible, calling it now..."),
                            zh.function("addEventListener", zh.version, e)) : (Uh("CMP API is outside the current iframe, calling it now..."),
                            function(o, e) {
                                var a = this
                                  , s = "__tcfapi";
                                window[s] = function(e, t, n, r) {
                                    p(this, a);
                                    var i = Math.random() + ""
                                      , t = qn({}, "".concat(s, "Call"), {
                                        command: e,
                                        parameter: r,
                                        callId: i,
                                        version: t
                                    });
                                    Vh[i] = n,
                                    o.postMessage(t, "*")
                                }
                                .bind(this),
                                window.addEventListener("message", function e(t) {
                                    var n = "".concat(s, "Return");
                                    (t = "string" == typeof t.data && 0 <= t.data.indexOf(n) ? JSON.parse(t.data) : t.data)[n] && t[n].callId && (n = t[n],
                                    void 0 !== Vh[n.callId] && Vh[n.callId](n.returnValue, n.success))
                                }, !1),
                                window[s]("addEventListener", zh.version, e)
                            }(zh.frame, e))) : n({
                                result: "cmpVersionNotV2",
                                cmp: zh
                            }) : n({
                                result: "cmpNotFound"
                            })
                        }
                        .bind(this))
                    }
                    var $h, Yh = (Wn(Qh, [{
                        key: "track",
                        value: ($h = Vn(Yn.mark(function e(t) {
                            var n, r, i, o, a;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (r = null == t || null === (n = t.visitor) || void 0 === n ? void 0 : n.visitorId) {
                                            e.next = 3;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 3:
                                        return i = encodeURIComponent(this.productName),
                                        o = encodeURIComponent(r),
                                        e.prev = 5,
                                        a = "json/null.json?https://tracker-v4.gamedock.io/v1/events-tracker/track/product/".concat(i, "/user_id/").concat(o),
                                        e.next = 9,
                                        fetch(a, {
                                            method: "POST"
                                        });
                                    case 9:
                                        e.next = 25;
                                        break;
                                    case 12:
                                        return e.prev = 12,
                                        e.t0 = e.catch(5),
                                        console.log("GAME_DOCK. fail v4", e.t0),
                                        e.prev = 15,
                                        a = "json/null.json?https://tracker.gamedock.io/v1/events-tracker/track/product/".concat(i, "/user_id/").concat(o),
                                        e.next = 19,
                                        fetch(a, {
                                            method: "POST"
                                        });
                                    case 19:
                                        e.next = 25;
                                        break;
                                    case 22:
                                        e.prev = 22,
                                        e.t1 = e.catch(15),
                                        console.log("GAME_DOCK. fail v6", e.t1);
                                    case 25:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this, [[5, 12], [15, 22]])
                        })),
                        function(e) {
                            return $h.apply(this, arguments)
                        }
                        )
                    }]),
                    new Qh);
                    function Qh() {
                        Kn(this, Qh),
                        this.productName = "Game Distribution"
                    }
                    function Jh(t, e) {
                        var n, r = Object.keys(t);
                        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
                        e && (n = n.filter(function(e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable
                        })),
                        r.push.apply(r, n)),
                        r
                    }
                    function Zh(t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = null != arguments[e] ? arguments[e] : {};
                            e % 2 ? Jh(Object(n), !0).forEach(function(e) {
                                qn(t, e, n[e])
                            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Jh(Object(n)).forEach(function(e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                            })
                        }
                        return t
                    }
                    var Xh, ef, tf, nf, rf, of, af, sf, cf, uf = null, ce = (Wn(hf, [{
                        key: "testConsent",
                        value: function() {
                            console.log("test-consent. Finding CMP");
                            try {
                                var e = Hh();
                                console.log("CMP found", e),
                                Vn(Yn.mark(function e() {
                                    var t;
                                    return Yn.wrap(function(e) {
                                        for (; ; )
                                            switch (e.prev = e.next) {
                                            case 0:
                                                return e.next = 2,
                                                Wh({});
                                            case 2:
                                                t = e.sent,
                                                console.log("After lookup IAB consent", t);
                                            case 4:
                                            case "end":
                                                return e.stop()
                                            }
                                    }, e)
                                }))()
                            } catch (e) {
                                console.log("find CMP error", e)
                            }
                        }
                    }, {
                        key: "_sendLoaderDataEvent",
                        value: function() {
                            try {
                                this.options.onLoaderEvent({
                                    name: "LOADER_DATA",
                                    message: {
                                        game: this._gameData,
                                        bridge: this._bridge
                                    },
                                    status: this._sdk_ready ? "success" : "error"
                                })
                            } catch (e) {}
                        }
                    }, {
                        key: "isLoaded",
                        value: function() {
                            var e, t, n;
                            return void 0 === this._isLoaded && (e = this._isTokenGameURL(),
                            t = this._isExtHostedGameURL(),
                            n = this._isMasterGameURL(),
                            this._isLoaded = (e || t && !n) && this._gameData.loader.enabled),
                            this._isLoaded
                        }
                    }, {
                        key: "setIsLoaded",
                        value: function(e) {
                            this._isLoaded = e
                        }
                    }, {
                        key: "_sendLoadedEvent",
                        value: function() {
                            if (!this.isLoaded()) {
                                this.setIsLoaded(!0);
                                try {
                                    this._sendTunnlEvent(1),
                                    this.msgrt.send("loaded", {
                                        message: this._hasBlocker ? "Has Blocker" : "No Blocker"
                                    }),
                                    this._initGamedockTracker(window.GamedockSDK, "gameplay")
                                } catch (e) {}
                            }
                        }
                    }, {
                        key: "_safeInit",
                        value: function() {
                            this._checkUserDeclinedTracking(),
                            this._checkWhitelabelPartner(),
                            this._gdpr();
                            var e = this._gameData.diagnostic;
                            void 0 !== e && void 0 !== e.close_ga && !1 !== e.close_ga || this._bridge.isCoreSDKMode || this._loadGoogleAnalytics(),
                            void 0 !== e && void 0 !== e.close_gamedock && !1 !== e.close_gamedock || this._bridge.isCoreSDKMode || this._bridge.noGamedockSDK || this._loadGamedockTracker(),
                            void 0 !== e && void 0 !== e.close_minijuegos && !1 !== e.close_minijuegos || !this._bridge.isCoreSDKMode && !this._bridge.noMinijuegosSDK && 0 <= document.location.search.indexOf("mp_game_id") && this._loadMiniJuegosGratisTracker()
                        }
                    }, {
                        key: "_initializeSDKWithGameData",
                        value: (cf = Vn(Yn.mark(function e(t, n) {
                            var r, i = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.prev = 0,
                                        e.next = 3,
                                        this._getGameData();
                                    case 3:
                                        this._gameData = e.sent,
                                        this._bridge.isCoreSDKMode = !(!0 === this._gameData.enableAds || !0 === (null === (r = this._gameData.enableAds) || void 0 === r ? void 0 : r.enabled)),
                                        this._safeInit(),
                                        this._checkGameId(),
                                        this._checkGameDeleted(),
                                        this._checkBlocking(),
                                        this._changeMidrollInDebugMode(),
                                        void 0 !== this._gameData.diagnostic && void 0 !== this._gameData.diagnostic.close_ads && !1 !== this._gameData.diagnostic.close_ads || (this.videoAdReady = this._initializeVideoAd().catch(function(e) {
                                            return p(this, i),
                                            console.error(e.message || e)
                                        }
                                        .bind(this))),
                                        this._sendSDKReady(),
                                        t(this._gameData),
                                        e.next = 20;
                                        break;
                                    case 15:
                                        e.prev = 15,
                                        e.t0 = e.catch(0),
                                        this._sendSDKError(e.t0),
                                        this.onResumeGame(e.t0.message, "warning"),
                                        n(e.t0);
                                    case 20:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this, [[0, 15]])
                        })),
                        function(e, t) {
                            return cf.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_getDefaultOptions",
                        value: function() {
                            return {
                                debug: !1,
                                testing: !1,
                                gameId: "4f3d7d38d24b740c95da2b03dc3a2333",
                                prefix: "gdsdk__",
                                onEvent: function(e) {},
                                onLoaderEvent: function(e) {},
                                flashSettings: {
                                    adContainerId: "",
                                    splashContainerId: ""
                                },
                                advertisementSettings: {},
                                resumeGame: function() {},
                                pauseGame: function() {},
                                onInit: function(e) {},
                                onError: function(e) {},
                                loader: {}
                            }
                        }
                    }, {
                        key: "_extendDefaultOptions",
                        value: function(e, t) {
                            e = ju(e);
                            this.options = t ? Ju(e, t) : e,
                            this.options.gameId = this.options.gameId.trim()
                        }
                    }, {
                        key: "_setConsoleBanner",
                        value: function() {
                            var e;
                            this._bridge.noConsoleBanner || (e = console.log("%c %c %c GameDistribution.com HTML5 SDK | Version: 1.15.7 %c %c %c", "background: #9854d8", "background: #6c2ca7", "color: #fff; background: #450f78;", "background: #6c2ca7", "background: #9854d8", "background: #ffffff"),
                            console.log.apply(console, e))
                        }
                    }, {
                        key: "_sendTunnlEvent",
                        value: function(e) {
                            var t = null !== (t = this._gameData.diagnostic && this._gameData.diagnostic.useTopDomains) && void 0 !== t && t
                              , e = {
                                page_url: decodeURIComponent(t ? this._topDomain : this._parentURL),
                                game_id: this.options.gameId,
                                eventtype: e,
                                ts: Date.now()
                            };
                            fetch("json/null.json?https://ana.headerlift.com/event?".concat(vu.stringify(e)))
                        }
                    }, {
                        key: "_sendAdRequestContext",
                        value: function(e) {
                            this.msgrt.send("adctx", {
                                message: e.adTag.bidder
                            })
                        }
                    }, {
                        key: "_checkWhitelabelPartner",
                        value: function() {
                            this._whitelabelPartner = !1;
                            var e = Xu();
                            e.hasOwnProperty("xanthophyll") && "true" === e.xanthophyll && (this._whitelabelPartner = !0,
                            ud("White label publisher", "".concat(this._whitelabelPartner), "success"))
                        }
                    }, {
                        key: "_checkConsole",
                        value: function() {
                            try {
                                if (!ad)
                                    return;
                                "developer.gamedistribution.com" === this._parentDomain ? (od("gd_debug_ex", !0),
                                od("gd_disable_midroll_timer", !0),
                                od("gd_tag", !0)) : "localhost:3000" === this._parentDomain && (od("gd_debug_ex", !0),
                                od("gd_disable_midroll_timer", !0)),
                                rd("gd_debug_ex") && (this.openConsole(),
                                this.msgrt.send("dev.console", {
                                    message: this._parentDomain
                                }))
                            } catch (e) {}
                        }
                    }, {
                        key: "_checkUserDeclinedTracking",
                        value: function() {
                            this._userDeclinedTracking = this._bridge.isCoreSDKMode || 0 <= document.location.search.indexOf("gdpr-tracking=0") || 0 <= document.cookie.indexOf("ogdpr_tracking=0")
                        }
                    }, {
                        key: "_initializeMessageRouter",
                        value: function() {
                            var e;
                            this.msgrt = new yd({
                                gameId: this.options.gameId,
                                hours: (new Date).getHours(),
                                topDomain: this._topDomain,
                                domain: this._parentDomain,
                                referrer: this._parentURL,
                                depth: nd(),
                                version: Jc,
                                tracking: this._userDeclinedTracking,
                                whitelabel: this._whitelabelPartner,
                                platform: (e = navigator.userAgent || navigator.vendor || window.opera,
                                /windows phone/i.test(e) ? "windows" : /android/i.test(e) ? "android" : /iPad|iPhone|iPod/.test(e) && !window.MSStream ? "ios" : ""),
                                byloader: this._bridge.isTokenGameURL,
                                isTokenGameURL: this._bridge.isTokenGameURL,
                                isMasterGameURL: this._bridge.isMasterGameURL,
                                isExtHostedGameURL: this._bridge.isExtHostedGameURL,
                                byloaderVersion: this._bridge.version
                            })
                        }
                    }, {
                        key: "_loadGamedockTracker",
                        value: function() {
                            var t = this;
                            try {
                                var e = ["js/null.js?https://cdn.gamedock.io/gamedock-web-tracker/4.3.0/script/gamedock-sdk.min.js"];
                                td(e[0], "GamedockSDK", {
                                    alternates: e
                                }).then(function() {
                                    p(this, t);
                                    var e = this._initGamedockTracker(window.GamedockSDK, "pageview");
                                    Yh.track(e)
                                }
                                .bind(this)).catch(function(e) {
                                    p(this, t),
                                    this._sendSDKError(e)
                                }
                                .bind(this))
                            } catch (e) {}
                        }
                    }, {
                        key: "_initGamedockTracker",
                        value: function(e, t) {
                            if (!this._bridge.isCoreSDKMode) {
                                e = e.initialize("gd", this._parentDomain);
                                return e.tracking.trackEvent(t, {
                                    pageId: this.options.gameId,
                                    pageType: "game"
                                }),
                                e
                            }
                        }
                    }, {
                        key: "_loadMiniJuegosGratisTracker",
                        value: function() {
                            var t = this;
                            window.mpConfig = {
                                game: this.options.gameId,
                                partner: "game-distribution"
                            };
                            var e = ["https://ext.minijuegosgratis.com/external-host/main.js"];
                            td(e[0], "MinijuegosSDK", {
                                alternates: e
                            }).catch(function(e) {
                                p(this, t),
                                this._sendSDKError(e)
                            }
                            .bind(this))
                        }
                    }, {
                        key: "_loadGoogleAnalytics",
                        value: function() {
                            var t = this
                              , e = ["js/null.js?https://www.google-analytics.com/analytics.js"];
                            td(e[0], "gdsdk_google_analytics", {
                                alternates: e,
                                error_prefix: "Blocked:",
                                exists: function() {
                                    return p(this, t),
                                    window.ga
                                }
                                .bind(this)
                            }).then(function() {
                                p(this, t),
                                window.ga("create", "UA-60359297-49", {
                                    name: "gd",
                                    cookieExpires: 7776e3,
                                    sampleRate: 5
                                }, "auto"),
                                this._bridge.noGAPageView || window.ga("gd.send", "pageview"),
                                this._userDeclinedTracking || window.ga("gd.set", "anonymizeIp", !0)
                            }
                            .bind(this)).catch(function(e) {
                                p(this, t),
                                this._sendSDKError(e)
                            }
                            .bind(this))
                        }
                    }, {
                        key: "_subscribeToEvents",
                        value: function() {
                            var n = this;
                            this.eventBus = new md,
                            dd.forEach(function(e) {
                                var t = this;
                                return p(this, n),
                                this.eventBus.subscribe(e, function(e) {
                                    return p(this, t),
                                    this._onEvent(e)
                                }
                                .bind(this), "sdk")
                            }
                            .bind(this)),
                            this.eventBus.subscribe("AD_SDK_CANCELED", function() {
                                p(this, n)
                            }
                            .bind(this), "sdk"),
                            ld.forEach(function(e) {
                                var t = this;
                                return p(this, n),
                                this.eventBus.subscribe(e, function(e) {
                                    return p(this, t),
                                    this._onEvent(e)
                                }
                                .bind(this), "ima")
                            }
                            .bind(this)),
                            this.eventBus.subscribe("COMPLETE", function() {
                                if (p(this, n),
                                "developer.gamedistribution.com" === this._parentDomain || !0 === new RegExp("^localhost").test(this._parentDomain)) {
                                    fetch("https://game.api.gamedistribution.com/game/v2/hasapi/".concat(this.options.gameId, "?timestamp=").concat((new Date).valueOf()));
                                    try {
                                        var e = JSON.stringify({
                                            type: "GD_SDK_IMPLEMENTED",
                                            gameID: this.options.gameId
                                        });
                                        window.location !== window.top.location ? window.top.postMessage(e, "*") : null !== window.opener && window.opener.location !== window.location && window.opener.postMessage(e, "*")
                                    } catch (e) {}
                                }
                            }
                            .bind(this), "ima"),
                            this.eventBus.subscribe("CONTENT_PAUSE_REQUESTED", function() {
                                return p(this, n),
                                this.onPauseGame("New advertisements requested and loaded", "success")
                            }
                            .bind(this), "ima"),
                            this.eventBus.subscribe("IMPRESSION", function(e) {
                                p(this, n),
                                this.msgrt.send("ad.impression")
                            }
                            .bind(this), "ima"),
                            this.eventBus.subscribe("SKIPPED", function(e) {
                                p(this, n)
                            }
                            .bind(this), "ima"),
                            this.eventBus.subscribe("AD_ERROR", function(e) {
                                p(this, n),
                                this.msgrt.send("ad.error", {
                                    message: e.message,
                                    details: e.details
                                })
                            }
                            .bind(this), "ima"),
                            this.eventBus.subscribe("CLICK", function(e) {
                                p(this, n)
                            }
                            .bind(this), "ima"),
                            this.eventBus.subscribe("COMPLETE", function(e) {
                                p(this, n)
                            }
                            .bind(this), "ima"),
                            this.eventBus.subscribe("AD_SDK_REQUEST", function(e) {
                                p(this, n),
                                this._sendAdRequestContext(e.message)
                            }
                            .bind(this), "sdk"),
                            this.eventBus.subscribe("SDK_ERROR", function(e) {
                                p(this, n),
                                e.message.startsWith("Blocked:") ? this._bridge.noBlockerEvent || (this.msgrt.send("error", {
                                    message: e.message
                                }),
                                this._hasBlocker || (this._hasBlocker = !0,
                                this._sendTunnlEvent(3))) : this.msgrt.send("error", {
                                    message: e.message
                                })
                            }
                            .bind(this), "sdk"),
                            this.eventBus.subscribe("AD_REQUEST", function(e) {
                                p(this, n)
                            }
                            .bind(this), "sdk"),
                            this.eventBus.subscribe("AD_REQUEST_KEYS_EMPTY", function(e) {
                                p(this, n),
                                this.msgrt.send("tunnl.keys.empty", {
                                    message: e.message,
                                    details: e.details
                                })
                            }
                            .bind(this), "sdk"),
                            this.eventBus.subscribe("AD_REQUEST_KEYS_FALLBACK", function(e) {
                                p(this, n),
                                this.msgrt.send("tunnl.keys.fallback", {
                                    message: e.message,
                                    details: e.details
                                })
                            }
                            .bind(this), "sdk"),
                            this.eventBus.subscribe("AD_T4R", function(e) {
                                return p(this, n),
                                this.msgrt.send("adt4r")
                            }
                            .bind(this), "sdk")
                        }
                    }, {
                        key: "_gdpr",
                        value: function() {
                            var t = this
                              , e = !this._bridge.isCoreSDKMode && 0 <= document.location.search.indexOf("gdpr-tracking")
                              , n = 0 <= document.location.search.indexOf("gdpr-tracking=1")
                              , r = !this._bridge.isCoreSDKMode && 0 <= document.location.search.indexOf("gdpr-targeting")
                              , i = 0 <= document.location.search.indexOf("gdpr-targeting=1")
                              , o = !this._bridge.isCoreSDKMode && 0 <= document.location.search.indexOf("gdpr-third-party")
                              , a = 0 <= document.location.search.indexOf("gdpr-third-party=1");
                            [{
                                name: "SDK_GDPR_TRACKING",
                                message: e ? n ? "Allowed" : "Not allowed" : "Not set",
                                status: n ? "success" : "warning",
                                label: e ? n ? "1" : "0" : "not set"
                            }, {
                                name: "SDK_GDPR_TARGETING",
                                message: r ? i ? "Allowed" : "Not allowed" : "Not set",
                                status: i ? "success" : "warning",
                                label: r ? i ? "1" : "0" : "not set"
                            }, {
                                name: "SDK_GDPR_THIRD_PARTY",
                                message: o ? a ? "Allowed" : "Not allowed" : "Not set",
                                status: a ? "success" : "warning",
                                label: o ? a ? "1" : "0" : "not set"
                            }].forEach(function(e) {
                                p(this, t),
                                this.eventBus.broadcast(e.name, {
                                    name: e.name,
                                    message: e.message,
                                    status: e.status,
                                    analytics: {
                                        category: e.name,
                                        action: this._parentDomain,
                                        label: e.label
                                    }
                                })
                            }
                            .bind(this))
                        }
                    }, {
                        key: "_checkGameId",
                        value: function() {
                            this.options.gameId === this._defaults.gameId && this._sendSDKError("Check correctness of your GAME ID. Otherwise, no revenue will be recorded.")
                        }
                    }, {
                        key: "_getDefaultGameData",
                        value: function() {
                            return {
                                gameId: this.options.gameId,
                                enableAds: !0,
                                preroll: !0,
                                midroll: 12e4,
                                rewardedAds: !1,
                                title: "",
                                tags: [],
                                category: "",
                                assets: [],
                                dmain: !0,
                                sdk: this._getDefaultAdSDKData(),
                                loader: this._getDefaultLoaderData(),
                                splash: this._getDefaultSplashData(),
                                promo: this._getDefaultPromoData(),
                                dAds: this._getDefaultDisplayAdsData(),
                                pAds: this._getDefaultPrerollAdsData(),
                                mAds: this._getDefaultMidrollAdsData(),
                                rAds: this._getDefaultRewardedAdsData()
                            }
                        }
                    }, {
                        key: "_getDefaultAdSDKData",
                        value: function() {
                            return {}
                        }
                    }, {
                        key: "_getDefaultLoaderData",
                        value: function() {
                            return {}
                        }
                    }, {
                        key: "_getDefaultSplashData",
                        value: function() {
                            return {}
                        }
                    }, {
                        key: "_getDefaultPromoData",
                        value: function() {
                            return {}
                        }
                    }, {
                        key: "_getDefaultDisplayAdsData",
                        value: function() {
                            return {
                                enabled: !0
                            }
                        }
                    }, {
                        key: "_getDefaultPrerollAdsData",
                        value: function() {
                            return {}
                        }
                    }, {
                        key: "_getDefaultMidrollAdsData",
                        value: function() {
                            return {}
                        }
                    }, {
                        key: "_getDefaultRewardedAdsData",
                        value: function() {
                            return {}
                        }
                    }, {
                        key: "_getGameDataUrl",
                        value: function() {
                            var e = void 0 !== this._topDomain && "undefined" !== this._topDomain ? this._topDomain : this._parentDomain;
                            return "json/config.json?https://game.api.gamedistribution.com/game/v4/get/".concat(this.options.gameId.replace(/-/g, ""), "/?domain=").concat(e, "&v=").concat(Jc, "&localTime=").concat((new Date).getHours())
                        }
                    }, {
                        key: "_checkBlocking",
                        value: (sf = Vn(Yn.mark(function e() {
                            var t, n, r = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        console.log("Block And Redirect!");
                                        n = this._gameData,
                                        t = void 0 === this._gameData.dmain || this._gameData.dmain,
                                        (n.bloc_gard && !0 === n.bloc_gard.enabled || !t) && (this.msgrt.send("blocked"),
                                        setTimeout(function() {
                                            p(this, r),
                                            window.location.href == "https://html5.api.gamedistribution.com/blocked.html?".concat(vu.stringify({
                                                domain: this._parentDomain,
                                                id: n.gameId,
                                                img: this._get_game_thumbnail_url(),
                                                title: n.title
                                            }))
                                        }
                                        .bind(this), 100));
                                    case 5:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this)
                        })),
                        function() {
                            return sf.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_checkGameDeleted",
                        value: function() {
                            var e = this;
                            6 === this._gameData.status && (console.log("%c %c %c This game was deleted, please remove it in your website... ", "background: #F2181A", "background: #F23818", "color: #fff; background: #F23818;", "background: #F55E60", "background: #F55E60", "background: #c4161e; color: #fff;"),
                            setTimeout(function() {
                                p(this, e),
                                document.location = "https://html5.api.gamedistribution.com/deleted.html"
                            }
                            .bind(this), 100))
                        }
                    }, {
                        key: "_changeMidrollInDebugMode",
                        value: function() {
                            var e = this._gameData;
                            ad && rd("gd_debug_ex") && (rd("gd_disable_midroll_timer") ? e.midroll = 0 : e.midroll = this._getDefaultGameData().midroll)
                        }
                    }, {
                        key: "_checkSplashAndPromoScreens",
                        value: function() {
                            this._gameData.loader && !1 === this._gameData.loader.mobile && this._getisMobile() && (this._gameData.loader.enabled = !1);
                            var e = this._gameData
                              , t = e.gdpr && !0 === e.gdpr.consent
                              , n = e.loader
                              , r = e.promo;
                            e.preroll || (this.adRequestTimer = Date.now()),
                            this.options.loader.enabled ? r.enabled ? this._createPromoBeforeSplash(e, t) : n.enabled ? this._createSplash(e, t) : this.onResumeGame("Advertisement(s) are done. Start / resume the game.", "success") : n.enabled || this._bridge.isTokenGameURL && this._bridge.isExtHostedGameURL || (this.options.advertisementSettings.autoplay || t ? r.enabled ? this._createPromoBeforeSplash(e, t) : !1 !== n.enabled && this._createSplash(e, t) : r.enabled && this._createPromo(e, t))
                        }
                    }, {
                        key: "_initializeVideoAd",
                        value: (af = Vn(Yn.mark(function e() {
                            var t;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (this._bridge.isCoreSDKMode)
                                            return e.abrupt("return");
                                        e.next = 2;
                                        break;
                                    case 2:
                                        return (t = this._gameData).sdk.enabled && (this.options.advertisementSettings = Ju(this.options.advertisementSettings, t.sdk)),
                                        this.macros = new vd({
                                            game: t,
                                            bridge: this._bridge
                                        }),
                                        this.adInstance = new wl(this.options.flashSettings.adContainerId,this.options.advertisementSettings,{
                                            parentURL: this._parentURL,
                                            parentDomain: this._parentDomain,
                                            topDomain: this._topDomain
                                        }),
                                        this.adInstance.gameId = t.gameId,
                                        this.adInstance.category = t.category,
                                        this.adInstance.tags = t.tags,
                                        this.adInstance.noPreroll = this._bridge.noPreroll,
                                        this.adInstance.macros = this.macros,
                                        this.adInstance.gameData = t,
                                        this.adInstance.msgrt = this.msgrt,
                                        e.next = 15,
                                        this.adInstance.start();
                                    case 15:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this)
                        })),
                        function() {
                            return af.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_sendSDKReady",
                        value: function() {
                            var e = "Everything is ready.";
                            this.eventBus.broadcast("SDK_READY", {
                                message: e,
                                status: "success"
                            });
                            try {
                                this.options.onInit(e)
                            } catch (e) {
                                ud("DEVELOPER_ERROR", e.message, "warning")
                            }
                        }
                    }, {
                        key: "_sendSDKError",
                        value: function(e) {
                            e = e.message ? e : {
                                message: e
                            },
                            this.eventBus.broadcast("SDK_ERROR", {
                                message: e.message,
                                status: "error"
                            });
                            try {
                                this.options.onError(e)
                            } catch (e) {
                                ud("DEVELOPER_ERROR", e.message, "warning")
                            }
                        }
                    }, {
                        key: "_onEvent",
                        value: function(e) {
                            ud(e.name, e.message, e.status);
                            try {
                                this.options.onEvent({
                                    name: e.name,
                                    message: e.message,
                                    status: e.status
                                })
                            } catch (e) {
                                ud("DEVELOPER_ERROR", e.message, "warning")
                            }
                        }
                    }, {
                        key: "_getGameData",
                        value: function() {
                            var t = this;
                            return new Promise(function(n) {
                                var r = this;
                                p(this, t);
                                var i = this._getDefaultGameData()
                                  , e = this._getGameDataUrl();
                                fetch(e).then(function(e) {
                                    return p(this, r),
                                    e.json()
                                }
                                .bind(this)).then(function(e) {
                                    var t;
                                    p(this, r),
                                    e.success ? (t = {
                                        gameId: (e = e.result.game).gameMd5,
                                        status: e.status,
                                        description: e.description,
                                        enableAds: !0 === e.enableAds || !0 === (null === (t = e.enableAds) || void 0 === t ? void 0 : t.enabled),
                                        preroll: e.preRoll,
                                        midroll: 6e4 * e.timeAds,
                                        rewardedAds: e.rewardedAds,
                                        title: e.title,
                                        tags: e.tags,
                                        category: e.category,
                                        assets: e.assets,
                                        disp_2nd_prer: e.disp_2nd_prer,
                                        ctry_vst: e.ctry_vst,
                                        ctry: e.ctry,
                                        crtv: e.crtv,
                                        dmain: e.dmain,
                                        block_exts: this._parseAndSelectRandomOne(e.push_cuda),
                                        bloc_gard: this._parseAndSelectRandomOne(e.bloc_gard),
                                        cookie: this._parseAndSelectRandomOne(e.cookie),
                                        gdpr: this._parseAndSelectRandomOne(e.gdpr),
                                        diagnostic: this._parseAndSelectRandomOne(e.diagnostic),
                                        sdk: this._parseAndSelectRandomOne(e.sdk) || this._getDefaultAdSDKData(),
                                        loader: this._parseAndSelectRandomOne(e.loader) || this._getDefaultLoaderData(),
                                        splash: this._parseAndSelectRandomOne(e.splash) || this._getDefaultSplashData(),
                                        promo: this._parseAndSelectRandomOne(e.promo) || this._getDefaultPromoData(),
                                        dAds: this._parseAndSelectRandomOne(e.dads) || this._getDefaultDisplayAdsData(),
                                        pAds: this._parseAndSelectRandomOne(e.pads) || this._getDefaultPrerollAdsData(),
                                        mAds: this._parseAndSelectRandomOne(e.mads) || this._getDefaultMidrollAdsData(),
                                        rAds: this._parseAndSelectRandomOne(e.rads) || this._getDefaultRewardedAdsData()
                                    },
                                    e = Ju(ju(i), t),
                                    this._bridge.noPreroll = (!this._getisMobile() || !1 !== e.loader.mobile) && this._bridge.noPreroll,
                                    this._bridge.noPreroll && (this.adRequestTimer = Date.now()),
                                    this.msgrt.setGameData(e),
                                    t = e.diagnostic,
                                    cd = t,
                                    n(e)) : (i.failed = !0,
                                    n(i))
                                }
                                .bind(this)).catch(function(e) {
                                    p(this, r),
                                    i.failed = !0,
                                    n(i)
                                }
                                .bind(this))
                            }
                            .bind(this))
                        }
                    }, {
                        key: "_createSplash",
                        value: (of = Vn(Yn.mark(function e(t, n) {
                            var r, i, o = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2,
                                        this._getSplashTemplate(t);
                                    case 2:
                                        r = e.sent,
                                        (i = new r(Zh(Zh({}, this.options), {}, {
                                            isConsentDomain: n,
                                            version: Jc
                                        }),t,this._parentDomain)).on("playClick", function() {
                                            var e, t = this;
                                            p(this, o),
                                            n && ((e = new Date).setDate(e.getDate() + 90),
                                            document.cookie = "ogdpr_tracking=1; expires=".concat(e.toUTCString(), "; path=/")),
                                            this.showAd(Qu.Interstitial).catch(function(e) {
                                                p(this, t)
                                            }
                                            .bind(this))
                                        }
                                        .bind(this)),
                                        i.on("slotVisibilityChanged", function(e) {
                                            p(this, o)
                                        }
                                        .bind(this)),
                                        this.onPauseGame("Pause the game and wait for a user gesture", "success"),
                                        this.eventBus.subscribe("SDK_GAME_PAUSE", function() {
                                            p(this, o),
                                            i.hide()
                                        }
                                        .bind(this)),
                                        this.eventBus.subscribe("SDK_GAME_START", function() {
                                            p(this, o),
                                            i.hide()
                                        }
                                        .bind(this));
                                    case 9:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this)
                        })),
                        function(e, t) {
                            return of.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_createPromoBeforeSplash",
                        value: (rf = Vn(Yn.mark(function e(t, n) {
                            var r, i, o = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2,
                                        this._instancePromo(t);
                                    case 2:
                                        r = e.sent,
                                        (i = new r(Zh(Zh({}, this.options), {}, {
                                            isConsentDomain: n,
                                            version: Jc
                                        }),t)).on("skipClick", function() {
                                            p(this, o),
                                            i.hide(),
                                            this._createSplash(t, n)
                                        }
                                        .bind(this)),
                                        i.on("adCompleted", function() {
                                            p(this, o),
                                            i.hide(),
                                            this._createSplash(t, n)
                                        }
                                        .bind(this));
                                    case 6:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this)
                        })),
                        function(e, t) {
                            return rf.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_createPromo",
                        value: (nf = Vn(Yn.mark(function e(t, n) {
                            var r, i, o = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2,
                                        this._instancePromo(t);
                                    case 2:
                                        r = e.sent,
                                        (i = new r(Zh(Zh({}, this.options), {}, {
                                            isConsentDomain: n,
                                            version: Jc
                                        }),t)).on("skipClick", function() {
                                            p(this, o),
                                            i.hide(),
                                            this.onResumeGame("Resumed after the promo", "warning")
                                        }
                                        .bind(this)),
                                        this.onPauseGame("Pause the game for the promo", "success");
                                    case 6:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e, this)
                        })),
                        function(e, t) {
                            return nf.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "showBanner",
                        value: function() {
                            var t = this;
                            this.showAd(Qu.Interstitial).catch(function(e) {
                                p(this, t)
                            }
                            .bind(this))
                        }
                    }, {
                        key: "showAd",
                        value: (tf = Vn(Yn.mark(function e(d, l) {
                            var h = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.abrupt("return", new Promise(function() {
                                            var n = Vn(Yn.mark(function e(o, a) {
                                                var s, i, c, t, n, u = this;
                                                return Yn.wrap(function(e) {
                                                    for (; ; )
                                                        switch (e.prev = e.next) {
                                                        case 0:
                                                            return e.prev = 0,
                                                            e.next = 3,
                                                            h.sdkReady;
                                                        case 3:
                                                            return s = e.sent,
                                                            e.next = 6,
                                                            h.videoAdReady;
                                                        case 6:
                                                            if (h._sendLoadedEvent(),
                                                            s.bloc_gard && !0 === s.bloc_gard.enabled)
                                                                throw new Error("Game or domain is blocked.");
                                                            e.next = 9;
                                                            break;
                                                        case 9:
                                                            if (!s.enableAds || h._whitelabelPartner)
                                                                throw new Error("Advertisements are disabled.");
                                                            e.next = 11;
                                                            break;
                                                        case 11:
                                                            if (d) {
                                                                e.next = 15;
                                                                break
                                                            }
                                                            d = Qu.Interstitial,
                                                            e.next = 17;
                                                            break;
                                                        case 15:
                                                            if (d !== Qu.Interstitial && d !== Qu.Rewarded)
                                                                throw new Error("Unsupported an advertisement type: ",d);
                                                            e.next = 17;
                                                            break;
                                                        case 17:
                                                            if (d !== Qu.Rewarded || s.rewardedAds) {
                                                                e.next = 19;
                                                                break
                                                            }
                                                            throw new Error("Rewarded ads are disabled.");
                                                        case 19:
                                                            if (d !== Qu.Interstitial || void 0 === h.adRequestTimer) {
                                                                e.next = 23;
                                                                break
                                                            }
                                                            if (Date.now() - h.adRequestTimer < s.midroll)
                                                                throw new Error("The advertisement was requested too soon.");
                                                            e.next = 23;
                                                            break;
                                                        case 23:
                                                            return i = "main.showad",
                                                            c = function(r) {
                                                                var i = this;
                                                                p(this, u),
                                                                h.adInstance.resetForNext(),
                                                                h.showAd(d, r).then(function(e) {
                                                                    p(this, i),
                                                                    h.adRequestTimer = Date.now(),
                                                                    h.onResumeGame("Advertisement(s) are done. Start / resume the game.", "success"),
                                                                    o("")
                                                                }
                                                                .bind(this)).catch(function(e) {
                                                                    var t, n = this;
                                                                    p(this, i),
                                                                    r.retry_on_success ? (h.adRequestTimer = Date.now(),
                                                                    h.onResumeGame("Advertisement(s) are done. Start / resume the game.", "success"),
                                                                    o("")) : r.retry_on_failure && (t = (s.promo || {}).puzzle || {}).enabled && (t.trigger.interstitial_failure && d === Qu.Interstitial || t.trigger.rewarded_failure && d === Qu.Rewarded) ? h._showPromoDisplayAd().then(function(e) {
                                                                        p(this, n),
                                                                        h.onResumeGame("DisplayAd succeded.", "success"),
                                                                        o("DisplayAd succeded.")
                                                                    }
                                                                    .bind(this)).catch(function(e) {
                                                                        p(this, n),
                                                                        h.onResumeGame("DisplayAd failed.", "warning"),
                                                                        a("DisplayAd failed.")
                                                                    }
                                                                    .bind(this)) : (h.onResumeGame(e.message || e, "warning"),
                                                                    a(e.message || e))
                                                                }
                                                                .bind(this))
                                                            }
                                                            .bind(this),
                                                            t = function(e) {
                                                                var t, n, r = this;
                                                                p(this, u),
                                                                h.eventBus.unsubscribeScope(i),
                                                                void 0 !== l ? a(e.message) : h._isRetryOnFailureEnabled(d) ? c({
                                                                    retry_on_failure: !0
                                                                }) : (h.adRequestTimer = Date.now(),
                                                                (n = (s.promo || {}).puzzle || {}).enabled && (n.trigger.interstitial_failure && d === Qu.Interstitial || n.trigger.rewarded_failure && d === Qu.Rewarded) ? h._showPromoDisplayAd().then(function(e) {
                                                                    p(this, r),
                                                                    h.onResumeGame("DisplayAd succeded.", "success"),
                                                                    o("DisplayAd succeded.")
                                                                }
                                                                .bind(this)).catch(function(e) {
                                                                    p(this, r),
                                                                    h.onResumeGame("DisplayAd failed.", "warning"),
                                                                    a("DisplayAd failed.")
                                                                }
                                                                .bind(this)) : (!0 === (null === (n = h._gameData.promo) || void 0 === n || null === (t = n.puzzle) || void 0 === t ? void 0 : t.enableAfterPreroll) && (h._gameData.promo.puzzle.enabled = !0),
                                                                h.onResumeGame(e.message, "warning"),
                                                                a(e.message)))
                                                            }
                                                            .bind(this),
                                                            n = function(e) {
                                                                p(this, u),
                                                                h.eventBus.unsubscribeScope(i),
                                                                void 0 !== l ? o(e.message) : h._isRetryOnSuccessEnabled(d) ? c({
                                                                    retry_on_success: !0
                                                                }) : (h.adRequestTimer = Date.now(),
                                                                h.onResumeGame("Advertisement(s) are done. Start / resume the game.", "success"),
                                                                o(e.message))
                                                            }
                                                            .bind(this),
                                                            h.eventBus.subscribe("AD_ERROR", t, i),
                                                            h.eventBus.subscribe("AD_SDK_CANCELED", t, i),
                                                            h.eventBus.subscribe("AD_SUCCESS", n, i),
                                                            e.next = 32,
                                                            h.adInstance.startAd(d, l);
                                                        case 32:
                                                            h._post_message({
                                                                topic: "adrequest.instream"
                                                            }),
                                                            e.next = 39;
                                                            break;
                                                        case 35:
                                                            e.prev = 35,
                                                            e.t0 = e.catch(0),
                                                            h.onResumeGame(e.t0.message, "warning"),
                                                            a(e.t0.message);
                                                        case 39:
                                                        case "end":
                                                            return e.stop()
                                                        }
                                                }, e, this, [[0, 35]])
                                            }));
                                            return function(e, t) {
                                                return n.apply(this, arguments)
                                            }
                                        }()));
                                    case 1:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        })),
                        function(e, t) {
                            return tf.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "_isRetryOnSuccessEnabled",
                        value: function(e) {
                            var t = this._gameData
                              , n = this.adInstance.getAdPosition(e)
                              , e = t.sdk.enabled && (!0 === t.sdk.retry_on_success || Mu(t.sdk.retry_on_success));
                            return "preroll" === n && void 0 !== t.pAds.retry_on_success ? e = e && t.pAds.retry_on_success : "midroll" === n && void 0 !== t.mAds.retry_on_success ? e = e && t.mAds.retry_on_success : "rewarded" === n && void 0 !== t.rAds.retry_on_success && (e = e && t.rAds.retry_on_success),
                            e
                        }
                    }, {
                        key: "_isRetryOnFailureEnabled",
                        value: function(e) {
                            var t = this._gameData
                              , n = this.adInstance.getAdPosition(e)
                              , e = t.sdk.enabled && (!0 === t.sdk.retry_on_failure || Mu(t.sdk.retry_on_failure));
                            return "preroll" === n && void 0 !== t.pAds.retry_on_failure ? e = e && t.pAds.retry_on_failure : "midroll" === n && void 0 !== t.mAds.retry_on_failure ? e = e && t.mAds.retry_on_failure : "rewarded" === n && void 0 !== t.rAds.retry_on_failure && (e = e && t.rAds.retry_on_failure),
                            e
                        }
                    }, {
                        key: "preloadAd",
                        value: (ef = Vn(Yn.mark(function e(o) {
                            var a = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.abrupt("return", new Promise(function() {
                                            var n = Vn(Yn.mark(function e(t, n) {
                                                var r, i;
                                                return Yn.wrap(function(e) {
                                                    for (; ; )
                                                        switch (e.prev = e.next) {
                                                        case 0:
                                                            return e.prev = 0,
                                                            e.next = 3,
                                                            a.sdkReady;
                                                        case 3:
                                                            return r = e.sent,
                                                            e.next = 6,
                                                            a.videoAdReady;
                                                        case 6:
                                                            if (r.bloc_gard && !0 === r.bloc_gard.enabled)
                                                                throw new Error("Game or domain is blocked.");
                                                            e.next = 8;
                                                            break;
                                                        case 8:
                                                            if (!r.enableAds || a._whitelabelPartner)
                                                                throw new Error("Advertisements are disabled.");
                                                            e.next = 10;
                                                            break;
                                                        case 10:
                                                            if (o) {
                                                                e.next = 14;
                                                                break
                                                            }
                                                            o = Qu.Rewarded,
                                                            e.next = 16;
                                                            break;
                                                        case 14:
                                                            if (o !== Qu.Interstitial && o !== Qu.Rewarded)
                                                                throw new Error("Unsupported an advertisement type:" + o);
                                                            e.next = 16;
                                                            break;
                                                        case 16:
                                                            if (o !== Qu.Rewarded || r.rewardedAds) {
                                                                e.next = 18;
                                                                break
                                                            }
                                                            throw new Error("Rewarded ads are disabled.");
                                                        case 18:
                                                            return e.next = 20,
                                                            a.adInstance.preloadAd(o);
                                                        case 20:
                                                            i = e.sent,
                                                            t(i),
                                                            e.next = 27;
                                                            break;
                                                        case 24:
                                                            e.prev = 24,
                                                            e.t0 = e.catch(0),
                                                            n(e.t0);
                                                        case 27:
                                                        case "end":
                                                            return e.stop()
                                                        }
                                                }, e, null, [[0, 24]])
                                            }));
                                            return function(e, t) {
                                                return n.apply(this, arguments)
                                            }
                                        }()));
                                    case 1:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        })),
                        function(e) {
                            return ef.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "cancelAd",
                        value: (Xh = Vn(Yn.mark(function e() {
                            var r = this;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.abrupt("return", new Promise(function() {
                                            var n = Vn(Yn.mark(function e(t, n) {
                                                return Yn.wrap(function(e) {
                                                    for (; ; )
                                                        switch (e.prev = e.next) {
                                                        case 0:
                                                            try {
                                                                r.adInstance.cancel(),
                                                                r.onResumeGame("Advertisement(s) are cancelled. Start / resume the game.", "success"),
                                                                n()
                                                            } catch (e) {
                                                                r.onResumeGame("Advertisement(s) are cancelled. Start / resume the game.", "success"),
                                                                t(e.message)
                                                            }
                                                        case 1:
                                                        case "end":
                                                            return e.stop()
                                                        }
                                                }, e)
                                            }));
                                            return function(e, t) {
                                                return n.apply(this, arguments)
                                            }
                                        }()));
                                    case 1:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        })),
                        function() {
                            return Xh.apply(this, arguments)
                        }
                        )
                    }, {
                        key: "showDisplayAd",
                        value: function(i) {
                            var n, o = this;
                            return new Promise((n = Vn(Yn.mark(function e(t, n) {
                                var r;
                                return Yn.wrap(function(e) {
                                    for (; ; )
                                        switch (e.prev = e.next) {
                                        case 0:
                                            return e.prev = 0,
                                            e.next = 3,
                                            o.sdkReady;
                                        case 3:
                                            return r = e.sent,
                                            e.next = 6,
                                            o.videoAdReady;
                                        case 6:
                                            if (r.dAds.enabled)
                                                return e.next = 9,
                                                o.adInstance.loadDisplayAd(i);
                                            e.next = 13;
                                            break;
                                        case 9:
                                            o._post_message({
                                                topic: "adrequest.display"
                                            }),
                                            t(),
                                            e.next = 14;
                                            break;
                                        case 13:
                                            n("Display-Ads are disabled.");
                                        case 14:
                                            e.next = 19;
                                            break;
                                        case 16:
                                            e.prev = 16,
                                            e.t0 = e.catch(0),
                                            n(e.t0.message || e.t0);
                                        case 19:
                                        case "end":
                                            return e.stop()
                                        }
                                }, e, null, [[0, 16]])
                            })),
                            function(e, t) {
                                return n.apply(this, arguments)
                            }
                            ))
                        }
                    }, {
                        key: "onResumeGame",
                        value: function(e, t) {
                            this._allowExternals({
                                enabled: !1
                            });
                            try {
                                this.options.resumeGame()
                            } catch (e) {
                                ud("DEVELOPER_ERROR", e.message, "warning")
                            }
                            var n = "SDK_GAME_START";
                            this.eventBus.broadcast(n, {
                                name: n,
                                message: e,
                                status: t,
                                analytics: {
                                    category: "SDK",
                                    action: n,
                                    label: this.options.gameId + ""
                                }
                            })
                        }
                    }, {
                        key: "onPauseGame",
                        value: function(e, t) {
                            this._allowExternals({
                                enabled: !0
                            });
                            try {
                                this.options.pauseGame()
                            } catch (e) {
                                ud("DEVELOPER_ERROR", e.message, "warning")
                            }
                            var n = "SDK_GAME_PAUSE";
                            this.eventBus.broadcast(n, {
                                name: n,
                                message: e,
                                status: t,
                                analytics: {
                                    category: "SDK",
                                    action: n,
                                    label: this.options.gameId + ""
                                }
                            })
                        }
                    }, {
                        key: "openConsole",
                        value: function() {
                            try {
                                new _d(this).start(),
                                od("gd_debug_ex", !0)
                            } catch (e) {
                                console.log(e)
                            }
                        }
                    }, {
                        key: "_initBlockingExternals",
                        value: function() {
                            var e = this._gameData;
                            (e.failed || e.block_exts && e.block_exts.enabled) && (this.window_open = window.open,
                            this._allowExternals({
                                enabled: !1
                            }),
                            this._removeExternalsInHtml({
                                enabled: !1
                            }))
                        }
                    }, {
                        key: "_checkFullscreen",
                        value: function() {
                            var n = this;
                            try {
                                var e = this._gameData;
                                e.sdk.fullscreen && "auto" === e.sdk.fullscreen && document.addEventListener("click", function() {
                                    var e, t;
                                    p(this, n),
                                    this._isFullScreen || ((e = (t = document.body).requestFullScreen || t.webkitRequestFullScreen || t.mozRequestFullScreen || t.msRequestFullscreen) ? e.call(t) : void 0 === window.ActiveXObject || null !== (t = new ActiveXObject("WScript.Shell")) && t.SendKeys("{F11}"),
                                    this._isFullScreen = !0)
                                }
                                .bind(this))
                            } catch (e) {
                                console.log("Fullscreen error handled...", e)
                            }
                        }
                    }, {
                        key: "_allowExternals",
                        value: function(e) {
                            var t = this;
                            void 0 !== this.window_open && (!1 === e.enabled ? window.open = function(e) {
                                p(this, t),
                                this.msgrt.send("external", {
                                    message: "C> ".concat(e)
                                }),
                                (e.startsWith("https://play.google.com") || e.startsWith("https://itunes.apple.com")) && this.window_open.call(null, e)
                            }
                            .bind(this) : window.open = this.window_open)
                        }
                    }, {
                        key: "_removeExternalsInHtml",
                        value: function(e) {
                            var i = this;
                            !1 === e.enabled && window.document.querySelectorAll("a").forEach(function(e) {
                                var t = this;
                                p(this, i);
                                var n = !!(e.innerText.toLowerCase().includes("start") || e.innerText.toLowerCase().includes("play") || e.innerText.toLowerCase().includes("continue"))
                                  , r = e.getAttribute("href");
                                e.removeAttribute("href"),
                                n || (e.onclick = function(e) {
                                    return p(this, t),
                                    e.preventDefault(),
                                    this.msgrt.send("external", {
                                        message: "H> ".concat(r)
                                    }),
                                    !1
                                }
                                .bind(this))
                            }
                            .bind(this))
                        }
                    }, {
                        key: "_getBridgeContext",
                        value: function() {
                            var e, t, n = this._isTokenGameURL(), r = this._isMasterGameURL(), i = this._isExtHostedGameURL(), o = (o = n || i ? this._getTokenGameURLConfig() : {}) || {}, a = decodeURIComponent((n || i) && o.parentURL ? o.parentURL : function() {
                                var e = Xu();
                                if (e.gd_sdk_referrer_url)
                                    return e.gd_sdk_referrer_url;
                                var t = window.location !== window.parent.location && document.referrer && "" !== document.referrer ? document.referrer : document.location.href;
                                return -1 !== document.referrer.indexOf("gameplayer.io") ? (t = "https://gamedistribution.com",
                                (e = Zu("ref", document.referrer)) && "" !== e && "{portal%20name}" !== e && "{spilgames}" !== e && "{portal name}" !== e && (t = ed(e).replace(/^(?:https?:\/\/)?(?:\/\/)?/i, ""),
                                t = "https://".concat(t))) : -1 !== document.referrer.indexOf("localhost") && (t = "https://gamedistribution.com/"),
                                t
                            }()), s = decodeURIComponent((n || i) && o.parentDomain ? o.parentDomain : (e = Xu(),
                            t = (e.gd_sdk_referrer_url || (window.location !== window.parent.location && document.referrer && "" !== document.referrer ? document.referrer.split("/")[2] : document.location.host)).replace(/^(?:https?:\/\/)?(?:\/\/)?(?:www\.)?/i, "").split("/")[0],
                            -1 !== document.referrer.indexOf("gameplayer.io") ? (t = "gamedistribution.com",
                            (e = Zu("ref", document.referrer)) && "" !== e && "{portal%20name}" !== e && "{spilgames}" !== e && "{portal name}" !== e && (t = ed(e).replace(/^(?:https?:\/\/)?(?:\/\/)?(?:www\.)?/i, "").split("/")[0])) : -1 !== document.referrer.indexOf("localhost") && (t = "gamedistribution.com"),
                            t)), c = decodeURIComponent((n || i) && o.topDomain ? o.topDomain : function() {
                                var e = nd();
                                if (0 === e)
                                    return location.host.replace(/^www\.(.*)$/i, "$1");
                                if (location.ancestorOrigins && 0 < location.ancestorOrigins.length)
                                    return location.ancestorOrigins[location.ancestorOrigins.length - 1].replace(/^https?:\/\/(www\.)?(.*)$/i, "$2");
                                if (1 === e) {
                                    e = function(e) {
                                        if (e && "" !== e)
                                            try {
                                                return new Lu(e)
                                            } catch (e) {}
                                    }(document.referrer);
                                    if (e)
                                        return e.host.replace(/^www\.(.*)$/i, "$1")
                                }
                            }()), u = (n || i) && o.loaderEnabled, d = (n || i) && o.loaderEnabled, l = (n || i) && o.loaderEnabled, h = (n || i) && o.loaderEnabled, f = (n || i) && o.loaderEnabled, p = (n || i) && o.loaderEnabled, g = (n || i) && o.loaderEnabled, e = (n || i) && o.loaderEnabled, t = (n || i) && o.loaderEnabled && o.hasImpression && "1.1.24" <= o.version;
                            return {
                                isTokenGameURL: n,
                                isMasterGameURL: r,
                                isExtHostedGameURL: i,
                                noConsoleBanner: u,
                                noLoadedEvent: d,
                                noBlockerEvent: l,
                                noPreroll: e,
                                parentURL: a,
                                parentDomain: s,
                                topDomain: c,
                                noGAPageView: h,
                                noLotamePageView: f,
                                noGamedockSDK: p,
                                noMinijuegosSDK: g,
                                version: o.version,
                                pauseGameOnStartup: t,
                                depth: nd(),
                                domainMatched: s === c,
                                exports: {
                                    formatTokenURLSearch: this._formatTokenURLSearch.bind(this),
                                    extendUrlQuery: this._extendUrlQuery.bind(this),
                                    base64Encode: this._base64_encode.bind(this)
                                }
                            }
                        }
                    }, {
                        key: "_isMasterGameURL",
                        value: function() {
                            var e = /http[s]?:\/\/(html5\.gamedistribution\.com\/[A-Fa-f0-9]{32})(.*)$/i;
                            return e.test(location.href) || !this._isTokenGameURL() && e.test(document.referrer)
                        }
                    }, {
                        key: "_isTokenGameURL",
                        value: function() {
                            var e = /http[s]?:\/\/(html5\.gamedistribution\.com\/[A-Za-z0-9]{8})\/(.*)$/i;
                            return e.test(location.href) || e.test(document.referrer)
                        }
                    }, {
                        key: "_isExtHostedGameURL",
                        value: function() {
                            var e = /^http[s]?:\/\/.*?gd_sdk_referrer_url=.*$/i;
                            return e.test(location.href) || e.test(document.referrer)
                        }
                    }, {
                        key: "_getTokenGameURLConfig",
                        value: function() {
                            try {
                                var e, t = /http[s]?:\/\/html5\.gamedistribution\.com\/[A-Za-z0-9]{8}\/[A-Fa-f0-9]{32}\/.*/i;
                                if (t.test(location.href)) {
                                    var n = new Lu(location.href,!0);
                                    if (!n.query.gd_zone_config)
                                        return;
                                    e = n.query.gd_zone_config
                                } else if (t.test(document.referrer)) {
                                    var r = new Lu(document.referrer,!0);
                                    if (!r.query.gd_zone_config)
                                        return;
                                    e = r.query.gd_zone_config
                                } else {
                                    var i = new Lu(location.href,!0);
                                    if (!i.query.gd_zone_config)
                                        return;
                                    e = i.query.gd_zone_config
                                }
                                return JSON.parse(ol(decodeURIComponent(e)))
                            } catch (e) {}
                        }
                    }, {
                        key: "_getSplashTemplate",
                        value: function(e) {
                            return new Mh(e.splash).splash()
                        }
                    }, {
                        key: "_instancePromo",
                        value: function(e) {
                            e = null !== (e = e.promo) && void 0 !== e && e.puzzle ? "Puzzle" : "Hammer";
                            return new Bh(e).promo()
                        }
                    }, {
                        key: "_formatTokenURLSearch",
                        value: function(e) {
                            var t = "";
                            try {
                                t = encodeURIComponent(il(JSON.stringify(e)))
                            } catch (e) {}
                            try {
                                var n = new Lu(location.href,!0);
                                return n.query = n.query || {},
                                n.query.gd_zone_config = t,
                                "?".concat(vu.stringify(n.query))
                            } catch (e) {
                                return "?gd_zone_config=".concat(t)
                            }
                        }
                    }, {
                        key: "_extendUrlQuery",
                        value: function(e, t) {
                            e = new Lu(e,!0);
                            return e.query = Zh(Zh({}, e.query), t),
                            e.toString()
                        }
                    }, {
                        key: "_base64_encode",
                        value: function(e) {
                            return il(JSON.stringify(e))
                        }
                    }, {
                        key: "_parseAndSelectRandomOne",
                        value: function(e) {
                            e = this._selectRandomOne("object" === t(e) ? e : function(e) {
                                if (e)
                                    try {
                                        return JSON.parse(e)
                                    } catch (e) {}
                            }(e));
                            return !e || !e.version || Jc >= e.version ? e : void 0
                        }
                    }, {
                        key: "_selectRandomOne",
                        value: function(e) {
                            var t = this;
                            if (!zu(e) || 0 === e.length)
                                return e;
                            if (1 === e.length)
                                return e[0];
                            var n = 0;
                            e.forEach(function(e) {
                                p(this, t),
                                e.weight = e.weight || 1,
                                n += e.weight
                            }
                            .bind(this));
                            for (var r = Math.floor(Math.random() * Math.floor(n)), n = 0, i = 0; i < e.length; i++) {
                                var o = e[i];
                                if (r < (n += o.weight))
                                    return o
                            }
                        }
                    }, {
                        key: "session",
                        value: function() {
                            var n, i = this;
                            return new Promise((n = Vn(Yn.mark(function e(t, n) {
                                var r;
                                return Yn.wrap(function(e) {
                                    for (; ; )
                                        switch (e.prev = e.next) {
                                        case 0:
                                            return e.prev = 0,
                                            e.next = 3,
                                            i.sdkReady;
                                        case 3:
                                            e.next = 7;
                                            break;
                                        case 5:
                                            e.prev = 5,
                                            e.t0 = e.catch(0);
                                        case 7:
                                            r = i._gameData,
                                            t({
                                                ads: {
                                                    display: {
                                                        enabled: r.dAds.enabled
                                                    },
                                                    rewarded: {
                                                        enabled: r.rewardedAds
                                                    }
                                                },
                                                location: {
                                                    parentDomain: i._bridge.parentDomain,
                                                    topDomain: i._bridge.topDomain,
                                                    parentURL: i._bridge.parentURL,
                                                    depth: i._bridge.depth,
                                                    loadedByGameZone: i._bridge.isTokenGameURL
                                                }
                                            });
                                        case 9:
                                        case "end":
                                            return e.stop()
                                        }
                                }, e, null, [[0, 5]])
                            })),
                            function(e, t) {
                                return n.apply(this, arguments)
                            }
                            ))
                        }
                    }, {
                        key: "_showPromoDisplayAd",
                        value: function() {
                            var e = this;
                            return new Promise(function(o, a) {
                                var s = this;
                                p(this, e);
                                var c = this._gameData;
                                this._instancePromo(c).then(function(e) {
                                    var t = this;
                                    p(this, s);
                                    var n = new e(Zh(Zh({}, this.options), {}, {
                                        version: Jc
                                    }),c)
                                      , r = "promo-display";
                                    this.eventBus.unsubscribeScope(r);
                                    var i = function() {
                                        p(this, t),
                                        this.eventBus.unsubscribeScope(r),
                                        n.show()
                                    }
                                    .bind(this)
                                      , e = function() {
                                        p(this, t),
                                        this.eventBus.unsubscribeScope(r),
                                        n.hide(),
                                        a("No promo display ad")
                                    }
                                    .bind(this);
                                    this.eventBus.subscribe("DISPLAYAD_IMPRESSION", i, r),
                                    this.eventBus.subscribe("DISPLAYAD_ERROR", e, r),
                                    this.showDisplayAd({
                                        containerId: n.getSlotContainerId(),
                                        slotId: n.getSlotId(),
                                        visible: !0
                                    }).catch(function(e) {
                                        p(this, t),
                                        n.hide(),
                                        a(e)
                                    }
                                    .bind(this)),
                                    n.on("skipClick", function() {
                                        p(this, t),
                                        n.hide(),
                                        o()
                                    }
                                    .bind(this)),
                                    n.on("adCompleted", function() {
                                        p(this, t),
                                        n.hide(),
                                        o()
                                    }
                                    .bind(this))
                                }
                                .bind(this))
                            }
                            .bind(this))
                        }
                    }, {
                        key: "_getisMobile",
                        value: function() {
                            var e = !1
                              , t = navigator.userAgent || navigator.vendor || window.opera;
                            return e = !1 === (e = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4)) ? !0 : e) && -1 < window.orientation ? !0 : e
                        }
                    }, {
                        key: "_get_game_thumbnail_url",
                        value: function() {
                            var t = this
                              , e = this._gameData
                              , n = (n = e.assets.find(function(e) {
                                return p(this, t),
                                e.hasOwnProperty("name") && 512 === e.width && 512 === e.height
                            }
                            .bind(this))) || (0 < e.assets.length ? e.assets[0] : {
                                name: "logo.svg"
                            });
                            return "https://img.gamedistribution.com/".concat(n.name)
                        }
                    }, {
                        key: "_post_message",
                        value: function(e) {
                            var t = e.topic
                              , n = e.data
                              , r = null !== (r = location.ancestorOrigins) && void 0 !== r && r.length ? location.ancestorOrigins[location.ancestorOrigins.length - 1] : "*";
                            try {
                                var i = window.top || window.parent;
                                i && i.postMessage({
                                    source: "gdsdk",
                                    topic: t,
                                    data: n
                                }, r)
                            } catch (e) {
                                console.error((null == e ? void 0 : e.message) || e)
                            }
                        }
                    }]),
                    hf), df = new function e() {
                        var t, n, r = this;
                        Kn(this, e),
                        qn(this, "load", Vn(Yn.mark(function e() {
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2,
                                        qh("Leaderboard");
                                    case 2:
                                        r.leaderboard = e.sent;
                                    case 3:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        }))),
                        qn(this, "showLeaderboard", (n = Vn(Yn.mark(function e(t) {
                            var n;
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (n = window.GD_OPTIONS.gameId,
                                        r.leaderboard) {
                                            e.next = 4;
                                            break
                                        }
                                        return e.next = 4,
                                        r.load();
                                    case 4:
                                        r.leaderboard.showLeaderBoard(n, t);
                                    case 5:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        })),
                        function(e) {
                            return n.apply(this, arguments)
                        }
                        )),
                        qn(this, "addScore", (t = Vn(Yn.mark(function e(t) {
                            return Yn.wrap(function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (r.leaderboard) {
                                            e.next = 3;
                                            break
                                        }
                                        return e.next = 3,
                                        r.load();
                                    case 3:
                                        r.leaderboard.addScore(t);
                                    case 4:
                                    case "end":
                                        return e.stop()
                                    }
                            }, e)
                        })),
                        function(e) {
                            return t.apply(this, arguments)
                        }
                        )),
                        this.moduleName = "Leaderboard",
                        this.moduleConfig = {
                            source: "https://pm.gamedistribution.com/@bygd/gd-sdk-leaderboard/0.1.43/dist/default/iife/index.js",
                            dependencies: ["react", "react-dom", "redux", "react-redux", "material-ui-core"]
                        },
                        Lh(this.moduleName, this.moduleConfig)
                    }
                    , lf = new ce(function() {
                        var e = {};
                        try {
                            "object" === ("undefined" == typeof GD_OPTIONS ? "undefined" : t(GD_OPTIONS)) && GD_OPTIONS ? e = GD_OPTIONS : window.gdApi && "object" === t(window.gdApi.q[0][0]) && window.gdApi.q[0][0] && ((e = window.gdApi.q[0][0]).hasOwnProperty("advertisementSettings") || (e.advertisementSettings = {
                                autoplay: !0
                            }))
                        } catch (e) {
                            console.log("_get_developer_sets failed", e)
                        }
                        return e
                    }());
                    function hf(e) {
                        var n = this;
                        if (Kn(this, hf),
                        uf)
                            return uf;
                        (uf = this)._defaults = this._getDefaultOptions(),
                        this._extendDefaultOptions(this._defaults, e),
                        this._version = e.version || "0.0.0",
                        this._bridge = this._getBridgeContext(),
                        this._parentURL = this._bridge.parentURL,
                        this._parentDomain = this._bridge.parentDomain,
                        this._topDomain = this._bridge.topDomain,
                        this._isFullScreen = !1,
                        this._setConsoleBanner(),
                        this._initializeMessageRouter(),
                        this._checkConsole(),
                        this._subscribeToEvents(),
                        this.sdkReady = new Promise(this._initializeSDKWithGameData.bind(this)),
                        this.sdkReady.then(function(e) {
                            p(this, n),
                            this._sdk_ready = !0
                        }
                        .bind(this)).catch(function(e) {
                            p(this, n),
                            this._sdk_ready = !1
                        }
                        .bind(this)).finally(function() {
                            var t = this;
                            p(this, n),
                            this._sendLoaderDataEvent(),
                            this._checkSplashAndPromoScreens(),
                            this._initBlockingExternals(),
                            window.addEventListener("DOMNodeInserted", function() {
                                var e;
                                p(this, t),
                                this._gameData.block_exts && this._removeExternalsInHtml({
                                    enabled: !1
                                }),
                                document.getElementsByClassName("webgl-content")[0] && (e = document.getElementsByClassName("webgl-content")[0].getElementsByClassName("footer")[0]) && e.setAttribute("style", "display:none")
                            }
                            .bind(this)),
                            this._checkFullscreen()
                        }
                        .bind(this))
                    }
                    function ff() {
                        var t = this;
                        this.AdType = Qu,
                        this.preloadAd = function(e) {
                            return lf.preloadAd(e)
                        }
                        ,
                        this.showAd = function(e, t) {
                            return e === Qu.Display ? lf.showDisplayAd(t) : lf.showAd(e)
                        }
                        ,
                        this.cancelAd = function() {
                            return lf.cancelAd()
                        }
                        ,
                        this.openConsole = function() {
                            lf.openConsole()
                        }
                        ,
                        this.getSession = function() {
                            return lf.session()
                        }
                        ,
                        this.leaderboard = {
                            show: function() {
                                p(this, t),
                                df.showLeaderboard()
                            }
                            .bind(this),
                            addScore: function(e) {
                                p(this, t),
                                df.addScore(e)
                            }
                            .bind(this)
                        }
                    }
                    ff.prototype = new function() {
                        this.showBanner = function() {
                            lf.showBanner()
                        }
                        ,
                        this.play = function() {}
                        ,
                        this.customLog = function() {}
                    }
                    ,
                    window.gdsdk = new ff,
                    window.gdApi = window.gdsdk
                }()
            }
            .call(this)
        }
        .call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer)
    }
    , {
        buffer: 3
    }],
    2: [function(e, t, n) {
        "use strict";
        n.byteLength = function e(t) {
            var n = l(t)
              , t = n[0]
              , n = n[1];
            return 3 * (t + n) / 4 - n
        }
        ,
        n.toByteArray = function e(t) {
            var n, r, i = l(t), o = i[0], i = i[1], a = new d(function e(t, n, r) {
                return 3 * (n + r) / 4 - r
            }(0, o, i)), s = 0, c = 0 < i ? o - 4 : o;
            for (r = 0; r < c; r += 4)
                n = u[t.charCodeAt(r)] << 18 | u[t.charCodeAt(r + 1)] << 12 | u[t.charCodeAt(r + 2)] << 6 | u[t.charCodeAt(r + 3)],
                a[s++] = n >> 16 & 255,
                a[s++] = n >> 8 & 255,
                a[s++] = 255 & n;
            2 === i && (n = u[t.charCodeAt(r)] << 2 | u[t.charCodeAt(r + 1)] >> 4,
            a[s++] = 255 & n);
            1 === i && (n = u[t.charCodeAt(r)] << 10 | u[t.charCodeAt(r + 1)] << 4 | u[t.charCodeAt(r + 2)] >> 2,
            a[s++] = n >> 8 & 255,
            a[s++] = 255 & n);
            return a
        }
        ,
        n.fromByteArray = function e(t) {
            for (var n, r = t.length, i = r % 3, o = [], a = 0, s = r - i; a < s; a += 16383)
                o.push(function e(t, n, r) {
                    for (var i, o = [], a = n; a < r; a += 3)
                        i = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]),
                        o.push(function e(t) {
                            return c[t >> 18 & 63] + c[t >> 12 & 63] + c[t >> 6 & 63] + c[63 & t]
                        }(i));
                    return o.join("")
                }(t, a, s < a + 16383 ? s : a + 16383));
            1 == i ? (n = t[r - 1],
            o.push(c[n >> 2] + c[n << 4 & 63] + "==")) : 2 == i && (n = (t[r - 2] << 8) + t[r - 1],
            o.push(c[n >> 10] + c[n >> 4 & 63] + c[n << 2 & 63] + "="));
            return o.join("")
        }
        ;
        for (var c = [], u = [], d = "undefined" != typeof Uint8Array ? Uint8Array : Array, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, o = r.length; i < o; ++i)
            c[i] = r[i],
            u[r.charCodeAt(i)] = i;
        function l(e) {
            var t = e.length;
            if (0 < t % 4)
                throw new Error("Invalid string. Length must be a multiple of 4");
            e = e.indexOf("=");
            return [e = -1 === e ? t : e, e === t ? 0 : 4 - e % 4]
        }
        u["-".charCodeAt(0)] = 62,
        u["_".charCodeAt(0)] = 63
    }
    , {}],
    3: [function(C, e, I) {
        !function(e) {
            !function() {
                "use strict";
                var i = C("base64-js")
                  , o = C("ieee754");
                I.Buffer = h,
                I.SlowBuffer = function e(t) {
                    +t != t && (t = 0);
                    return h.alloc(+t)
                }
                ,
                I.INSPECT_MAX_BYTES = 50;
                var t = 2147483647;
                function a(e) {
                    if (t < e)
                        throw new RangeError('The value "' + e + '" is invalid for option "size"');
                    e = new Uint8Array(e);
                    return e.__proto__ = h.prototype,
                    e
                }
                function h(e, t, n) {
                    if ("number" != typeof e)
                        return r(e, t, n);
                    if ("string" == typeof t)
                        throw new TypeError('The "string" argument must be of type string. Received type number');
                    return c(e)
                }
                function r(e, t, n) {
                    if ("string" == typeof e)
                        return function e(t, n) {
                            "string" == typeof n && "" !== n || (n = "utf8");
                            if (!h.isEncoding(n))
                                throw new TypeError("Unknown encoding: " + n);
                            var r = 0 | l(t, n)
                              , i = a(r)
                              , n = i.write(t, n);
                            n !== r && (i = i.slice(0, n));
                            return i
                        }(e, t);
                    if (ArrayBuffer.isView(e))
                        return u(e);
                    if (null == e)
                        throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                    if (R(e, ArrayBuffer) || e && R(e.buffer, ArrayBuffer))
                        return function e(t, n, r) {
                            if (n < 0 || t.byteLength < n)
                                throw new RangeError('"offset" is outside of buffer bounds');
                            if (t.byteLength < n + (r || 0))
                                throw new RangeError('"length" is outside of buffer bounds');
                            r = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t,n) : new Uint8Array(t,n,r);
                            return r.__proto__ = h.prototype,
                            r
                        }(e, t, n);
                    if ("number" == typeof e)
                        throw new TypeError('The "value" argument must not be of type number. Received type number');
                    var r = e.valueOf && e.valueOf();
                    if (null != r && r !== e)
                        return h.from(r, t, n);
                    r = function e(t) {
                        if (h.isBuffer(t)) {
                            var n = 0 | d(t.length)
                              , r = a(n);
                            return 0 === r.length ? r : (t.copy(r, 0, 0, n),
                            r)
                        }
                        if (void 0 !== t.length)
                            return "number" != typeof t.length || O(t.length) ? a(0) : u(t);
                        if ("Buffer" === t.type && Array.isArray(t.data))
                            return u(t.data)
                    }(e);
                    if (r)
                        return r;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive])
                        return h.from(e[Symbol.toPrimitive]("string"), t, n);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
                }
                function s(e) {
                    if ("number" != typeof e)
                        throw new TypeError('"size" argument must be of type number');
                    if (e < 0)
                        throw new RangeError('The value "' + e + '" is invalid for option "size"')
                }
                function c(e) {
                    return s(e),
                    a(e < 0 ? 0 : 0 | d(e))
                }
                function u(e) {
                    for (var t = e.length < 0 ? 0 : 0 | d(e.length), n = a(t), r = 0; r < t; r += 1)
                        n[r] = 255 & e[r];
                    return n
                }
                function d(e) {
                    if (t <= e)
                        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + t.toString(16) + " bytes");
                    return 0 | e
                }
                function l(e, t) {
                    if (h.isBuffer(e))
                        return e.length;
                    if (ArrayBuffer.isView(e) || R(e, ArrayBuffer))
                        return e.byteLength;
                    if ("string" != typeof e)
                        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                    var n = e.length
                      , r = 2 < arguments.length && !0 === arguments[2];
                    if (!r && 0 === n)
                        return 0;
                    for (var i = !1; ; )
                        switch (t) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return n;
                        case "utf8":
                        case "utf-8":
                            return S(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return D(e).length;
                        default:
                            if (i)
                                return r ? -1 : S(e).length;
                            t = ("" + t).toLowerCase(),
                            i = !0
                        }
                }
                function n(e, t, n) {
                    var r = !1;
                    if ((t = void 0 === t || t < 0 ? 0 : t) > this.length)
                        return "";
                    if ((n = void 0 === n || n > this.length ? this.length : n) <= 0)
                        return "";
                    if ((n >>>= 0) <= (t >>>= 0))
                        return "";
                    for (e = e || "utf8"; ; )
                        switch (e) {
                        case "hex":
                            return function e(t, n, r) {
                                var i = t.length;
                                (!n || n < 0) && (n = 0);
                                (!r || r < 0 || i < r) && (r = i);
                                for (var o = "", a = n; a < r; ++a)
                                    o += function e(t) {
                                        return t < 16 ? "0" + t.toString(16) : t.toString(16)
                                    }(t[a]);
                                return o
                            }(this, t, n);
                        case "utf8":
                        case "utf-8":
                            return y(this, t, n);
                        case "ascii":
                            return function e(t, n, r) {
                                var i = "";
                                r = Math.min(t.length, r);
                                for (var o = n; o < r; ++o)
                                    i += String.fromCharCode(127 & t[o]);
                                return i
                            }(this, t, n);
                        case "latin1":
                        case "binary":
                            return function e(t, n, r) {
                                var i = "";
                                r = Math.min(t.length, r);
                                for (var o = n; o < r; ++o)
                                    i += String.fromCharCode(t[o]);
                                return i
                            }(this, t, n);
                        case "base64":
                            return function e(t, n, r) {
                                return 0 === n && r === t.length ? i.fromByteArray(t) : i.fromByteArray(t.slice(n, r))
                            }(this, t, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return function e(t, n, r) {
                                for (var i = t.slice(n, r), o = "", a = 0; a < i.length; a += 2)
                                    o += String.fromCharCode(i[a] + 256 * i[a + 1]);
                                return o
                            }(this, t, n);
                        default:
                            if (r)
                                throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase(),
                            r = !0
                        }
                }
                function f(e, t, n) {
                    var r = e[t];
                    e[t] = e[n],
                    e[n] = r
                }
                function p(e, t, n, r, i) {
                    if (0 === e.length)
                        return -1;
                    if ("string" == typeof n ? (r = n,
                    n = 0) : 2147483647 < n ? n = 2147483647 : n < -2147483648 && (n = -2147483648),
                    (n = (n = O(n = +n) ? i ? 0 : e.length - 1 : n) < 0 ? e.length + n : n) >= e.length) {
                        if (i)
                            return -1;
                        n = e.length - 1
                    } else if (n < 0) {
                        if (!i)
                            return -1;
                        n = 0
                    }
                    if ("string" == typeof t && (t = h.from(t, r)),
                    h.isBuffer(t))
                        return 0 === t.length ? -1 : g(e, t, n, r, i);
                    if ("number" == typeof t)
                        return t &= 255,
                        "function" == typeof Uint8Array.prototype.indexOf ? (i ? Uint8Array.prototype.indexOf : Uint8Array.prototype.lastIndexOf).call(e, t, n) : g(e, [t], n, r, i);
                    throw new TypeError("val must be string, number or Buffer")
                }
                function g(e, t, n, r, i) {
                    var o = 1
                      , a = e.length
                      , s = t.length;
                    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (e.length < 2 || t.length < 2)
                            return -1;
                        a /= o = 2,
                        s /= 2,
                        n /= 2
                    }
                    function c(e, t) {
                        return 1 === o ? e[t] : e.readUInt16BE(t * o)
                    }
                    if (i)
                        for (var u = -1, d = n; d < a; d++)
                            if (c(e, d) === c(t, -1 === u ? 0 : d - u)) {
                                if (d - (u = -1 === u ? d : u) + 1 === s)
                                    return u * o
                            } else
                                -1 !== u && (d -= d - u),
                                u = -1;
                    else
                        for (d = n = a < n + s ? a - s : n; 0 <= d; d--) {
                            for (var l = !0, h = 0; h < s; h++)
                                if (c(e, d + h) !== c(t, h)) {
                                    l = !1;
                                    break
                                }
                            if (l)
                                return d
                        }
                    return -1
                }
                function m(e, t, n, r) {
                    return T(function e(t) {
                        for (var n = [], r = 0; r < t.length; ++r)
                            n.push(255 & t.charCodeAt(r));
                        return n
                    }(t), e, n, r)
                }
                function v(e, t, n, r) {
                    return T(function e(t, n) {
                        for (var r, i, o = [], a = 0; a < t.length && !((n -= 2) < 0); ++a)
                            i = t.charCodeAt(a),
                            r = i >> 8,
                            i = i % 256,
                            o.push(i),
                            o.push(r);
                        return o
                    }(t, e.length - n), e, n, r)
                }
                function y(e, t, n) {
                    n = Math.min(e.length, n);
                    for (var r = [], i = t; i < n; ) {
                        var o, a, s, c, u = e[i], d = null, l = 239 < u ? 4 : 223 < u ? 3 : 191 < u ? 2 : 1;
                        if (i + l <= n)
                            switch (l) {
                            case 1:
                                u < 128 && (d = u);
                                break;
                            case 2:
                                128 == (192 & (o = e[i + 1])) && 127 < (c = (31 & u) << 6 | 63 & o) && (d = c);
                                break;
                            case 3:
                                o = e[i + 1],
                                a = e[i + 2],
                                128 == (192 & o) && 128 == (192 & a) && 2047 < (c = (15 & u) << 12 | (63 & o) << 6 | 63 & a) && (c < 55296 || 57343 < c) && (d = c);
                                break;
                            case 4:
                                o = e[i + 1],
                                a = e[i + 2],
                                s = e[i + 3],
                                128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && 65535 < (c = (15 & u) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) && c < 1114112 && (d = c)
                            }
                        null === d ? (d = 65533,
                        l = 1) : 65535 < d && (d -= 65536,
                        r.push(d >>> 10 & 1023 | 55296),
                        d = 56320 | 1023 & d),
                        r.push(d),
                        i += l
                    }
                    return function e(t) {
                        var n = t.length;
                        if (n <= b)
                            return String.fromCharCode.apply(String, t);
                        var r = ""
                          , i = 0;
                        for (; i < n; )
                            r += String.fromCharCode.apply(String, t.slice(i, i += b));
                        return r
                    }(r)
                }
                I.kMaxLength = t,
                (h.TYPED_ARRAY_SUPPORT = function e() {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        },
                        42 === t.foo()
                    } catch (e) {
                        return !1
                    }
                }()) || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
                Object.defineProperty(h.prototype, "parent", {
                    enumerable: !0,
                    get: function() {
                        if (h.isBuffer(this))
                            return this.buffer
                    }
                }),
                Object.defineProperty(h.prototype, "offset", {
                    enumerable: !0,
                    get: function() {
                        if (h.isBuffer(this))
                            return this.byteOffset
                    }
                }),
                "undefined" != typeof Symbol && null != Symbol.species && h[Symbol.species] === h && Object.defineProperty(h, Symbol.species, {
                    value: null,
                    configurable: !0,
                    enumerable: !1,
                    writable: !1
                }),
                h.poolSize = 8192,
                h.from = r,
                h.prototype.__proto__ = Uint8Array.prototype,
                h.__proto__ = Uint8Array,
                h.alloc = function e(t, n, r) {
                    return s(t),
                    !(t <= 0) && void 0 !== n ? "string" == typeof r ? a(t).fill(n, r) : a(t).fill(n) : a(t)
                }
                ,
                h.allocUnsafe = c,
                h.allocUnsafeSlow = c,
                h.isBuffer = function e(t) {
                    return null != t && !0 === t._isBuffer && t !== h.prototype
                }
                ,
                h.compare = function e(t, n) {
                    if (R(t, Uint8Array) && (t = h.from(t, t.offset, t.byteLength)),
                    R(n, Uint8Array) && (n = h.from(n, n.offset, n.byteLength)),
                    !h.isBuffer(t) || !h.isBuffer(n))
                        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (t === n)
                        return 0;
                    for (var r = t.length, i = n.length, o = 0, a = Math.min(r, i); o < a; ++o)
                        if (t[o] !== n[o]) {
                            r = t[o],
                            i = n[o];
                            break
                        }
                    return r < i ? -1 : i < r ? 1 : 0
                }
                ,
                h.isEncoding = function e(t) {
                    switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                    }
                }
                ,
                h.concat = function e(t, n) {
                    if (!Array.isArray(t))
                        throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length)
                        return h.alloc(0);
                    if (void 0 === n)
                        for (o = n = 0; o < t.length; ++o)
                            n += t[o].length;
                    for (var r = h.allocUnsafe(n), i = 0, o = 0; o < t.length; ++o) {
                        var a = t[o];
                        if (R(a, Uint8Array) && (a = h.from(a)),
                        !h.isBuffer(a))
                            throw new TypeError('"list" argument must be an Array of Buffers');
                        a.copy(r, i),
                        i += a.length
                    }
                    return r
                }
                ,
                h.byteLength = l,
                h.prototype._isBuffer = !0,
                h.prototype.swap16 = function e() {
                    var t = this.length;
                    if (t % 2 != 0)
                        throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var n = 0; n < t; n += 2)
                        f(this, n, n + 1);
                    return this
                }
                ,
                h.prototype.swap32 = function e() {
                    var t = this.length;
                    if (t % 4 != 0)
                        throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var n = 0; n < t; n += 4)
                        f(this, n, n + 3),
                        f(this, n + 1, n + 2);
                    return this
                }
                ,
                h.prototype.swap64 = function e() {
                    var t = this.length;
                    if (t % 8 != 0)
                        throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var n = 0; n < t; n += 8)
                        f(this, n, n + 7),
                        f(this, n + 1, n + 6),
                        f(this, n + 2, n + 5),
                        f(this, n + 3, n + 4);
                    return this
                }
                ,
                h.prototype.toLocaleString = h.prototype.toString = function e() {
                    var t = this.length;
                    return 0 === t ? "" : 0 === arguments.length ? y(this, 0, t) : n.apply(this, arguments)
                }
                ,
                h.prototype.equals = function e(t) {
                    if (!h.isBuffer(t))
                        throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === h.compare(this, t)
                }
                ,
                h.prototype.inspect = function e() {
                    var t = ""
                      , n = I.INSPECT_MAX_BYTES
                      , t = this.toString("hex", 0, n).replace(/(.{2})/g, "$1 ").trim();
                    return this.length > n && (t += " ... "),
                    "<Buffer " + t + ">"
                }
                ,
                h.prototype.compare = function e(t, n, r, i, o) {
                    if (R(t, Uint8Array) && (t = h.from(t, t.offset, t.byteLength)),
                    !h.isBuffer(t))
                        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                    if (void 0 === r && (r = t ? t.length : 0),
                    void 0 === i && (i = 0),
                    void 0 === o && (o = this.length),
                    (n = void 0 === n ? 0 : n) < 0 || r > t.length || i < 0 || o > this.length)
                        throw new RangeError("out of range index");
                    if (o <= i && r <= n)
                        return 0;
                    if (o <= i)
                        return -1;
                    if (r <= n)
                        return 1;
                    if (this === t)
                        return 0;
                    for (var a = (o >>>= 0) - (i >>>= 0), s = (r >>>= 0) - (n >>>= 0), c = Math.min(a, s), u = this.slice(i, o), d = t.slice(n, r), l = 0; l < c; ++l)
                        if (u[l] !== d[l]) {
                            a = u[l],
                            s = d[l];
                            break
                        }
                    return a < s ? -1 : s < a ? 1 : 0
                }
                ,
                h.prototype.includes = function e(t, n, r) {
                    return -1 !== this.indexOf(t, n, r)
                }
                ,
                h.prototype.indexOf = function e(t, n, r) {
                    return p(this, t, n, r, !0)
                }
                ,
                h.prototype.lastIndexOf = function e(t, n, r) {
                    return p(this, t, n, r, !1)
                }
                ,
                h.prototype.write = function e(t, n, r, i) {
                    if (void 0 === n)
                        i = "utf8",
                        r = this.length,
                        n = 0;
                    else if (void 0 === r && "string" == typeof n)
                        i = n,
                        r = this.length,
                        n = 0;
                    else {
                        if (!isFinite(n))
                            throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        n >>>= 0,
                        isFinite(r) ? (r >>>= 0,
                        void 0 === i && (i = "utf8")) : (i = r,
                        r = void 0)
                    }
                    var o = this.length - n;
                    if ((void 0 === r || o < r) && (r = o),
                    0 < t.length && (r < 0 || n < 0) || n > this.length)
                        throw new RangeError("Attempt to write outside buffer bounds");
                    i = i || "utf8";
                    for (var a = !1; ; )
                        switch (i) {
                        case "hex":
                            return function e(t, n, r, i) {
                                r = Number(r) || 0;
                                var o = t.length - r;
                                (!i || o < (i = Number(i))) && (i = o),
                                (o = n.length) / 2 < i && (i = o / 2);
                                for (var a = 0; a < i; ++a) {
                                    var s = parseInt(n.substr(2 * a, 2), 16);
                                    if (O(s))
                                        return a;
                                    t[r + a] = s
                                }
                                return a
                            }(this, t, n, r);
                        case "utf8":
                        case "utf-8":
                            return function e(t, n, r, i) {
                                return T(S(n, t.length - r), t, r, i)
                            }(this, t, n, r);
                        case "ascii":
                            return m(this, t, n, r);
                        case "latin1":
                        case "binary":
                            return m(this, t, n, r);
                        case "base64":
                            return function e(t, n, r, i) {
                                return T(D(n), t, r, i)
                            }(this, t, n, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return v(this, t, n, r);
                        default:
                            if (a)
                                throw new TypeError("Unknown encoding: " + i);
                            i = ("" + i).toLowerCase(),
                            a = !0
                        }
                }
                ,
                h.prototype.toJSON = function e() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                }
                ;
                var b = 4096;
                function _(e, t, n) {
                    if (e % 1 != 0 || e < 0)
                        throw new RangeError("offset is not uint");
                    if (n < e + t)
                        throw new RangeError("Trying to access beyond buffer length")
                }
                function w(e, t, n, r, i, o) {
                    if (!h.isBuffer(e))
                        throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (i < t || t < o)
                        throw new RangeError('"value" argument is out of bounds');
                    if (n + r > e.length)
                        throw new RangeError("Index out of range")
                }
                function A(e, t, n, r) {
                    if (n + r > e.length)
                        throw new RangeError("Index out of range");
                    if (n < 0)
                        throw new RangeError("Index out of range")
                }
                function E(e, t, n, r, i) {
                    return t = +t,
                    n >>>= 0,
                    i || A(e, 0, n, 4),
                    o.write(e, t, n, r, 23, 4),
                    n + 4
                }
                function k(e, t, n, r, i) {
                    return t = +t,
                    n >>>= 0,
                    i || A(e, 0, n, 8),
                    o.write(e, t, n, r, 52, 8),
                    n + 8
                }
                h.prototype.slice = function e(t, n) {
                    var r = this.length;
                    (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : r < t && (t = r),
                    (n = void 0 === n ? r : ~~n) < 0 ? (n += r) < 0 && (n = 0) : r < n && (n = r),
                    n < t && (n = t);
                    n = this.subarray(t, n);
                    return n.__proto__ = h.prototype,
                    n
                }
                ,
                h.prototype.readUIntLE = function e(t, n, r) {
                    t >>>= 0,
                    n >>>= 0,
                    r || _(t, n, this.length);
                    for (var i = this[t], o = 1, a = 0; ++a < n && (o *= 256); )
                        i += this[t + a] * o;
                    return i
                }
                ,
                h.prototype.readUIntBE = function e(t, n, r) {
                    t >>>= 0,
                    n >>>= 0,
                    r || _(t, n, this.length);
                    for (var i = this[t + --n], o = 1; 0 < n && (o *= 256); )
                        i += this[t + --n] * o;
                    return i
                }
                ,
                h.prototype.readUInt8 = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 1, this.length),
                    this[t]
                }
                ,
                h.prototype.readUInt16LE = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 2, this.length),
                    this[t] | this[t + 1] << 8
                }
                ,
                h.prototype.readUInt16BE = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 2, this.length),
                    this[t] << 8 | this[t + 1]
                }
                ,
                h.prototype.readUInt32LE = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 4, this.length),
                    (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }
                ,
                h.prototype.readUInt32BE = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 4, this.length),
                    16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }
                ,
                h.prototype.readIntLE = function e(t, n, r) {
                    t >>>= 0,
                    n >>>= 0,
                    r || _(t, n, this.length);
                    for (var i = this[t], o = 1, a = 0; ++a < n && (o *= 256); )
                        i += this[t + a] * o;
                    return (o *= 128) <= i && (i -= Math.pow(2, 8 * n)),
                    i
                }
                ,
                h.prototype.readIntBE = function e(t, n, r) {
                    t >>>= 0,
                    n >>>= 0,
                    r || _(t, n, this.length);
                    for (var i = n, o = 1, a = this[t + --i]; 0 < i && (o *= 256); )
                        a += this[t + --i] * o;
                    return (o *= 128) <= a && (a -= Math.pow(2, 8 * n)),
                    a
                }
                ,
                h.prototype.readInt8 = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 1, this.length),
                    128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }
                ,
                h.prototype.readInt16LE = function e(t, n) {
                    t >>>= 0,
                    n || _(t, 2, this.length);
                    t = this[t] | this[t + 1] << 8;
                    return 32768 & t ? 4294901760 | t : t
                }
                ,
                h.prototype.readInt16BE = function e(t, n) {
                    t >>>= 0,
                    n || _(t, 2, this.length);
                    t = this[t + 1] | this[t] << 8;
                    return 32768 & t ? 4294901760 | t : t
                }
                ,
                h.prototype.readInt32LE = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 4, this.length),
                    this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }
                ,
                h.prototype.readInt32BE = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 4, this.length),
                    this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }
                ,
                h.prototype.readFloatLE = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 4, this.length),
                    o.read(this, t, !0, 23, 4)
                }
                ,
                h.prototype.readFloatBE = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 4, this.length),
                    o.read(this, t, !1, 23, 4)
                }
                ,
                h.prototype.readDoubleLE = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 8, this.length),
                    o.read(this, t, !0, 52, 8)
                }
                ,
                h.prototype.readDoubleBE = function e(t, n) {
                    return t >>>= 0,
                    n || _(t, 8, this.length),
                    o.read(this, t, !1, 52, 8)
                }
                ,
                h.prototype.writeUIntLE = function e(t, n, r, i) {
                    t = +t,
                    n >>>= 0,
                    r >>>= 0,
                    i || w(this, t, n, r, Math.pow(2, 8 * r) - 1, 0);
                    var o = 1
                      , a = 0;
                    for (this[n] = 255 & t; ++a < r && (o *= 256); )
                        this[n + a] = t / o & 255;
                    return n + r
                }
                ,
                h.prototype.writeUIntBE = function e(t, n, r, i) {
                    t = +t,
                    n >>>= 0,
                    r >>>= 0,
                    i || w(this, t, n, r, Math.pow(2, 8 * r) - 1, 0);
                    var o = r - 1
                      , a = 1;
                    for (this[n + o] = 255 & t; 0 <= --o && (a *= 256); )
                        this[n + o] = t / a & 255;
                    return n + r
                }
                ,
                h.prototype.writeUInt8 = function e(t, n, r) {
                    return t = +t,
                    n >>>= 0,
                    r || w(this, t, n, 1, 255, 0),
                    this[n] = 255 & t,
                    n + 1
                }
                ,
                h.prototype.writeUInt16LE = function e(t, n, r) {
                    return t = +t,
                    n >>>= 0,
                    r || w(this, t, n, 2, 65535, 0),
                    this[n] = 255 & t,
                    this[n + 1] = t >>> 8,
                    n + 2
                }
                ,
                h.prototype.writeUInt16BE = function e(t, n, r) {
                    return t = +t,
                    n >>>= 0,
                    r || w(this, t, n, 2, 65535, 0),
                    this[n] = t >>> 8,
                    this[n + 1] = 255 & t,
                    n + 2
                }
                ,
                h.prototype.writeUInt32LE = function e(t, n, r) {
                    return t = +t,
                    n >>>= 0,
                    r || w(this, t, n, 4, 4294967295, 0),
                    this[n + 3] = t >>> 24,
                    this[n + 2] = t >>> 16,
                    this[n + 1] = t >>> 8,
                    this[n] = 255 & t,
                    n + 4
                }
                ,
                h.prototype.writeUInt32BE = function e(t, n, r) {
                    return t = +t,
                    n >>>= 0,
                    r || w(this, t, n, 4, 4294967295, 0),
                    this[n] = t >>> 24,
                    this[n + 1] = t >>> 16,
                    this[n + 2] = t >>> 8,
                    this[n + 3] = 255 & t,
                    n + 4
                }
                ,
                h.prototype.writeIntLE = function e(t, n, r, i) {
                    t = +t,
                    n >>>= 0,
                    i || w(this, t, n, r, (i = Math.pow(2, 8 * r - 1)) - 1, -i);
                    var o = 0
                      , a = 1
                      , s = 0;
                    for (this[n] = 255 & t; ++o < r && (a *= 256); )
                        t < 0 && 0 === s && 0 !== this[n + o - 1] && (s = 1),
                        this[n + o] = (t / a >> 0) - s & 255;
                    return n + r
                }
                ,
                h.prototype.writeIntBE = function e(t, n, r, i) {
                    t = +t,
                    n >>>= 0,
                    i || w(this, t, n, r, (i = Math.pow(2, 8 * r - 1)) - 1, -i);
                    var o = r - 1
                      , a = 1
                      , s = 0;
                    for (this[n + o] = 255 & t; 0 <= --o && (a *= 256); )
                        t < 0 && 0 === s && 0 !== this[n + o + 1] && (s = 1),
                        this[n + o] = (t / a >> 0) - s & 255;
                    return n + r
                }
                ,
                h.prototype.writeInt8 = function e(t, n, r) {
                    return t = +t,
                    n >>>= 0,
                    r || w(this, t, n, 1, 127, -128),
                    this[n] = 255 & (t = t < 0 ? 255 + t + 1 : t),
                    n + 1
                }
                ,
                h.prototype.writeInt16LE = function e(t, n, r) {
                    return t = +t,
                    n >>>= 0,
                    r || w(this, t, n, 2, 32767, -32768),
                    this[n] = 255 & t,
                    this[n + 1] = t >>> 8,
                    n + 2
                }
                ,
                h.prototype.writeInt16BE = function e(t, n, r) {
                    return t = +t,
                    n >>>= 0,
                    r || w(this, t, n, 2, 32767, -32768),
                    this[n] = t >>> 8,
                    this[n + 1] = 255 & t,
                    n + 2
                }
                ,
                h.prototype.writeInt32LE = function e(t, n, r) {
                    return t = +t,
                    n >>>= 0,
                    r || w(this, t, n, 4, 2147483647, -2147483648),
                    this[n] = 255 & t,
                    this[n + 1] = t >>> 8,
                    this[n + 2] = t >>> 16,
                    this[n + 3] = t >>> 24,
                    n + 4
                }
                ,
                h.prototype.writeInt32BE = function e(t, n, r) {
                    return t = +t,
                    n >>>= 0,
                    r || w(this, t, n, 4, 2147483647, -2147483648),
                    this[n] = (t = t < 0 ? 4294967295 + t + 1 : t) >>> 24,
                    this[n + 1] = t >>> 16,
                    this[n + 2] = t >>> 8,
                    this[n + 3] = 255 & t,
                    n + 4
                }
                ,
                h.prototype.writeFloatLE = function e(t, n, r) {
                    return E(this, t, n, !0, r)
                }
                ,
                h.prototype.writeFloatBE = function e(t, n, r) {
                    return E(this, t, n, !1, r)
                }
                ,
                h.prototype.writeDoubleLE = function e(t, n, r) {
                    return k(this, t, n, !0, r)
                }
                ,
                h.prototype.writeDoubleBE = function e(t, n, r) {
                    return k(this, t, n, !1, r)
                }
                ,
                h.prototype.copy = function e(t, n, r, i) {
                    if (!h.isBuffer(t))
                        throw new TypeError("argument should be a Buffer");
                    if (r = r || 0,
                    i || 0 === i || (i = this.length),
                    n >= t.length && (n = t.length),
                    (i = 0 < i && i < r ? r : i) === r)
                        return 0;
                    if (0 === t.length || 0 === this.length)
                        return 0;
                    if ((n = n || 0) < 0)
                        throw new RangeError("targetStart out of bounds");
                    if (r < 0 || r >= this.length)
                        throw new RangeError("Index out of range");
                    if (i < 0)
                        throw new RangeError("sourceEnd out of bounds");
                    i > this.length && (i = this.length);
                    var o = (i = t.length - n < i - r ? t.length - n + r : i) - r;
                    if (this === t && "function" == typeof Uint8Array.prototype.copyWithin)
                        this.copyWithin(n, r, i);
                    else if (this === t && r < n && n < i)
                        for (var a = o - 1; 0 <= a; --a)
                            t[a + n] = this[a + r];
                    else
                        Uint8Array.prototype.set.call(t, this.subarray(r, i), n);
                    return o
                }
                ,
                h.prototype.fill = function e(t, n, r, i) {
                    if ("string" == typeof t) {
                        if ("string" == typeof n ? (i = n,
                        n = 0,
                        r = this.length) : "string" == typeof r && (i = r,
                        r = this.length),
                        void 0 !== i && "string" != typeof i)
                            throw new TypeError("encoding must be a string");
                        if ("string" == typeof i && !h.isEncoding(i))
                            throw new TypeError("Unknown encoding: " + i);
                        var o;
                        1 === t.length && (o = t.charCodeAt(0),
                        ("utf8" === i && o < 128 || "latin1" === i) && (t = o))
                    } else
                        "number" == typeof t && (t &= 255);
                    if (n < 0 || this.length < n || this.length < r)
                        throw new RangeError("Out of range index");
                    if (r <= n)
                        return this;
                    var a;
                    if (n >>>= 0,
                    r = void 0 === r ? this.length : r >>> 0,
                    "number" == typeof (t = t || 0))
                        for (a = n; a < r; ++a)
                            this[a] = t;
                    else {
                        var s = h.isBuffer(t) ? t : h.from(t, i)
                          , c = s.length;
                        if (0 === c)
                            throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                        for (a = 0; a < r - n; ++a)
                            this[a + n] = s[a % c]
                    }
                    return this
                }
                ;
                var x = /[^+/0-9A-Za-z-_]/g;
                function S(e, t) {
                    var n;
                    t = t || 1 / 0;
                    for (var r = e.length, i = null, o = [], a = 0; a < r; ++a) {
                        if (55295 < (n = e.charCodeAt(a)) && n < 57344) {
                            if (!i) {
                                if (56319 < n) {
                                    -1 < (t -= 3) && o.push(239, 191, 189);
                                    continue
                                }
                                if (a + 1 === r) {
                                    -1 < (t -= 3) && o.push(239, 191, 189);
                                    continue
                                }
                                i = n;
                                continue
                            }
                            if (n < 56320) {
                                -1 < (t -= 3) && o.push(239, 191, 189),
                                i = n;
                                continue
                            }
                            n = 65536 + (i - 55296 << 10 | n - 56320)
                        } else
                            i && -1 < (t -= 3) && o.push(239, 191, 189);
                        if (i = null,
                        n < 128) {
                            if (--t < 0)
                                break;
                            o.push(n)
                        } else if (n < 2048) {
                            if ((t -= 2) < 0)
                                break;
                            o.push(n >> 6 | 192, 63 & n | 128)
                        } else if (n < 65536) {
                            if ((t -= 3) < 0)
                                break;
                            o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                        } else {
                            if (!(n < 1114112))
                                throw new Error("Invalid code point");
                            if ((t -= 4) < 0)
                                break;
                            o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                        }
                    }
                    return o
                }
                function D(e) {
                    return i.toByteArray(function e(t) {
                        if ((t = (t = t.split("=")[0]).trim().replace(x, "")).length < 2)
                            return "";
                        for (; t.length % 4 != 0; )
                            t += "=";
                        return t
                    }(e))
                }
                function T(e, t, n, r) {
                    for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i)
                        t[i + n] = e[i];
                    return i
                }
                function R(e, t) {
                    return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
                }
                function O(e) {
                    return e != e
                }
            }
            .call(this)
        }
        .call(this, C("buffer").Buffer)
    }
    , {
        "base64-js": 2,
        buffer: 3,
        ieee754: 4
    }],
    4: [function(e, t, n) {
        n.read = function(e, t, n, r, i) {
            var o, a, s = 8 * i - r - 1, c = (1 << s) - 1, u = c >> 1, d = -7, l = n ? i - 1 : 0, h = n ? -1 : 1, n = e[t + l];
            for (l += h,
            o = n & (1 << -d) - 1,
            n >>= -d,
            d += s; 0 < d; o = 256 * o + e[t + l],
            l += h,
            d -= 8)
                ;
            for (a = o & (1 << -d) - 1,
            o >>= -d,
            d += r; 0 < d; a = 256 * a + e[t + l],
            l += h,
            d -= 8)
                ;
            if (0 === o)
                o = 1 - u;
            else {
                if (o === c)
                    return a ? NaN : 1 / 0 * (n ? -1 : 1);
                a += Math.pow(2, r),
                o -= u
            }
            return (n ? -1 : 1) * a * Math.pow(2, o - r)
        }
        ,
        n.write = function(e, t, n, r, i, o) {
            var a, s, c = 8 * o - i - 1, u = (1 << c) - 1, d = u >> 1, l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = r ? 0 : o - 1, f = r ? 1 : -1, o = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t),
            isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0,
            a = u) : (a = Math.floor(Math.log(t) / Math.LN2),
            t * (r = Math.pow(2, -a)) < 1 && (a--,
            r *= 2),
            2 <= (t += 1 <= a + d ? l / r : l * Math.pow(2, 1 - d)) * r && (a++,
            r /= 2),
            u <= a + d ? (s = 0,
            a = u) : 1 <= a + d ? (s = (t * r - 1) * Math.pow(2, i),
            a += d) : (s = t * Math.pow(2, d - 1) * Math.pow(2, i),
            a = 0)); 8 <= i; e[n + h] = 255 & s,
            h += f,
            s /= 256,
            i -= 8)
                ;
            for (a = a << i | s,
            c += i; 0 < c; e[n + h] = 255 & a,
            h += f,
            a /= 256,
            c -= 8)
                ;
            e[n + h - f] |= 128 * o
        }
    }
    , {}],
    5: [function(e, t, n) {
        "use strict";
        e("@bygd/gd-sdk-pes/dist/default")
    }
    , {
        "@bygd/gd-sdk-pes/dist/default": 1
    }]
}, {}, [5]);
