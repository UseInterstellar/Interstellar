(() => {
    var e = {
            564: (e, t, i) => {
                var n, r, a;
                ! function(i, o) {
                    if (i) {
                        var s = {},
                            d = i.TraceKit,
                            A = [].slice,
                            c = "?",
                            l = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
                        s.noConflict = function() {
                            return i.TraceKit = d, s
                        }, s.wrap = function(e) {
                            return function() {
                                try {
                                    return e.apply(this, arguments)
                                } catch (e) {
                                    throw s.report(e), e
                                }
                            }
                        }, s.report = function() {
                            var e, t, n, r, a = [],
                                o = null,
                                d = null;

                            function A(e, t, i) {
                                var n = null;
                                if (!t || s.collectWindowErrors) {
                                    for (var r in a)
                                        if (p(a, r)) try {
                                            a[r](e, t, i)
                                        } catch (e) {
                                            n = e
                                        }
                                    if (n) throw n
                                }
                            }

                            function c(t, i, n, r, a) {
                                if (d) s.computeStackTrace.augmentStackTraceWithInitialElement(d, i, n, t), h();
                                else if (a) A(s.computeStackTrace(a), !0, a);
                                else {
                                    var o, c = {
                                            url: i,
                                            line: n,
                                            column: r
                                        },
                                        p = t;
                                    if ("[object String]" === {}.toString.call(t)) {
                                        var u = t.match(l);
                                        u && (o = u[1], p = u[2])
                                    }
                                    c.func = s.computeStackTrace.guessFunctionName(c.url, c.line), c.context = s.computeStackTrace.gatherContext(c.url, c.line), A({
                                        name: o,
                                        message: p,
                                        mode: "onerror",
                                        stack: [c]
                                    }, !0, null)
                                }
                                return !!e && e.apply(this, arguments)
                            }

                            function u(e) {
                                A(s.computeStackTrace(e.reason), !0, e.reason)
                            }

                            function h() {
                                var e = d,
                                    t = o;
                                d = null, o = null, A(e, !1, t)
                            }

                            function m(e) {
                                if (d) {
                                    if (o === e) return;
                                    h()
                                }
                                var t = s.computeStackTrace(e);
                                throw d = t, o = e, setTimeout((function() {
                                    o === e && h()
                                }), t.incomplete ? 2e3 : 0), e
                            }
                            return m.subscribe = function(o) {
                                ! function() {
                                    if (!0 === t) return;
                                    e = i.onerror, i.onerror = c, t = !0
                                }(),
                                function() {
                                    if (!0 === r) return;
                                    n = i.onunhandledrejection, i.onunhandledrejection = u, r = !0
                                }(), a.push(o)
                            }, m.unsubscribe = function(o) {
                                for (var s = a.length - 1; s >= 0; --s) a[s] === o && a.splice(s, 1);
                                0 === a.length && (t && (i.onerror = e, t = !1), r && (i.onunhandledrejection = n, r = !1))
                            }, m
                        }(), s.computeStackTrace = function() {
                            var e = !1,
                                t = {};

                            function n(e) {
                                if ("string" != typeof e) return [];
                                if (!p(t, e)) {
                                    var n = "",
                                        r = "";
                                    try {
                                        r = i.document.domain
                                    } catch (e) {}
                                    var a = /(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(e);
                                    a && a[2] === r && (n = function(e) {
                                        if (!s.remoteFetching) return "";
                                        try {
                                            var t = function() {
                                                try {
                                                    return new i.XMLHttpRequest
                                                } catch (e) {
                                                    return new i.ActiveXObject("Microsoft.XMLHTTP")
                                                }
                                            }();
                                            return t.open("GET", e, !1), t.send(""), t.responseText
                                        } catch (e) {
                                            return ""
                                        }
                                    }(e)), t[e] = n ? n.split("\n") : []
                                }
                                return t[e]
                            }

                            function r(e, t) {
                                var i, r = /function ([^(]*)\(([^)]*)\)/,
                                    a = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,
                                    o = "",
                                    s = n(e);
                                if (!s.length) return c;
                                for (var d = 0; d < 10; ++d)
                                    if (!u(o = s[t - d] + o)) {
                                        if (i = a.exec(o)) return i[1];
                                        if (i = r.exec(o)) return i[1]
                                    } return c
                            }

                            function a(e, t) {
                                var i = n(e);
                                if (!i.length) return null;
                                var r = [],
                                    a = Math.floor(s.linesOfContext / 2),
                                    o = a + s.linesOfContext % 2,
                                    d = Math.max(0, t - a - 1),
                                    A = Math.min(i.length, t + o - 1);
                                t -= 1;
                                for (var c = d; c < A; ++c) u(i[c]) || r.push(i[c]);
                                return r.length > 0 ? r : null
                            }

                            function o(e) {
                                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, "\\$&")
                            }

                            function d(e) {
                                return o(e).replace("<", "(?:<|&lt;)").replace(">", "(?:>|&gt;)").replace("&", "(?:&|&amp;)").replace('"', '(?:"|&quot;)').replace(/\s+/g, "\\s+")
                            }

                            function A(e, t) {
                                for (var i, r, a = 0, o = t.length; a < o; ++a)
                                    if ((i = n(t[a])).length && (i = i.join("\n"), r = e.exec(i))) return {
                                        url: t[a],
                                        line: i.substring(0, r.index).split("\n").length,
                                        column: r.index - i.lastIndexOf("\n", r.index) - 1
                                    };
                                return null
                            }

                            function l(e, t, i) {
                                var r, a = n(t),
                                    s = new RegExp("\\b" + o(e) + "\\b");
                                return i -= 1, a && a.length > i && (r = s.exec(a[i])) ? r.index : null
                            }

                            function h(e) {
                                if (!u(i && i.document)) {
                                    for (var t, n, r, a, s = [i.location.href], c = i.document.getElementsByTagName("script"), l = "" + e, p = 0; p < c.length; ++p) {
                                        var h = c[p];
                                        h.src && s.push(h.src)
                                    }
                                    if (r = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(l)) {
                                        var m = r[1] ? "\\s+" + r[1] : "",
                                            g = r[2].split(",").join("\\s*,\\s*");
                                        t = o(r[3]).replace(/;$/, ";?"), n = new RegExp("function" + m + "\\s*\\(\\s*" + g + "\\s*\\)\\s*{\\s*" + t + "\\s*}")
                                    } else n = new RegExp(o(l).replace(/\s+/g, "\\s+"));
                                    if (a = A(n, s)) return a;
                                    if (r = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(l)) {
                                        var v = r[1];
                                        if (t = d(r[2]), a = A(n = new RegExp("on" + v + "=[\\'\"]\\s*" + t + "\\s*[\\'\"]", "i"), s[0])) return a;
                                        if (a = A(n = new RegExp(t), s)) return a
                                    }
                                    return null
                                }
                            }

                            function m(e) {
                                if (!e.stack) return null;
                                for (var t, i, n, o = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, s = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, d = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, A = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, p = /\((\S*)(?::(\d+))(?::(\d+))\)/, h = e.stack.split("\n"), m = [], g = /^(.*) is undefined$/.exec(e.message), v = 0, f = h.length; v < f; ++v) {
                                    if (i = o.exec(h[v])) {
                                        var b = i[2] && 0 === i[2].indexOf("native");
                                        i[2] && 0 === i[2].indexOf("eval") && (t = p.exec(i[2])) && (i[2] = t[1], i[3] = t[2], i[4] = t[3]), n = {
                                            url: b ? null : i[2],
                                            func: i[1] || c,
                                            args: b ? [i[2]] : [],
                                            line: i[3] ? +i[3] : null,
                                            column: i[4] ? +i[4] : null
                                        }
                                    } else if (i = d.exec(h[v])) n = {
                                        url: i[2],
                                        func: i[1] || c,
                                        args: [],
                                        line: +i[3],
                                        column: i[4] ? +i[4] : null
                                    };
                                    else {
                                        if (!(i = s.exec(h[v]))) continue;
                                        i[3] && i[3].indexOf(" > eval") > -1 && (t = A.exec(i[3])) ? (i[3] = t[1], i[4] = t[2], i[5] = null) : 0 !== v || i[5] || u(e.columnNumber) || (m[0].column = e.columnNumber + 1), n = {
                                            url: i[3],
                                            func: i[1] || c,
                                            args: i[2] ? i[2].split(",") : [],
                                            line: i[4] ? +i[4] : null,
                                            column: i[5] ? +i[5] : null
                                        }
                                    }!n.func && n.line && (n.func = r(n.url, n.line)), n.context = n.line ? a(n.url, n.line) : null, m.push(n)
                                }
                                return m.length ? (m[0] && m[0].line && !m[0].column && g && (m[0].column = l(g[1], m[0].url, m[0].line)), {
                                    mode: "stack",
                                    name: e.name,
                                    message: e.message,
                                    stack: m
                                }) : null
                            }

                            function g(e, t, i, n) {
                                var o = {
                                    url: t,
                                    line: i
                                };
                                if (o.url && o.line) {
                                    e.incomplete = !1, o.func || (o.func = r(o.url, o.line)), o.context || (o.context = a(o.url, o.line));
                                    var s = / '([^']+)' /.exec(n);
                                    if (s && (o.column = l(s[1], o.url, o.line)), e.stack.length > 0 && e.stack[0].url === o.url) {
                                        if (e.stack[0].line === o.line) return !1;
                                        if (!e.stack[0].line && e.stack[0].func === o.func) return e.stack[0].line = o.line, e.stack[0].context = o.context, !1
                                    }
                                    return e.stack.unshift(o), e.partial = !0, !0
                                }
                                return e.incomplete = !0, !1
                            }

                            function v(e, t) {
                                for (var i, n, a, o = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, d = [], A = {}, p = !1, u = v.caller; u && !p; u = u.caller)
                                    if (u !== f && u !== s.report) {
                                        if (n = {
                                                url: null,
                                                func: c,
                                                args: [],
                                                line: null,
                                                column: null
                                            }, u.name ? n.func = u.name : (i = o.exec(u.toString())) && (n.func = i[1]), void 0 === n.func) try {
                                            n.func = i.input.substring(0, i.input.indexOf("{"))
                                        } catch (e) {}
                                        if (a = h(u)) {
                                            n.url = a.url, n.line = a.line, n.func === c && (n.func = r(n.url, n.line));
                                            var m = / '([^']+)' /.exec(e.message || e.description);
                                            m && (n.column = l(m[1], a.url, a.line))
                                        }
                                        A["" + u] ? p = !0 : A["" + u] = !0, d.push(n)
                                    } t && d.splice(0, t);
                                var b = {
                                    mode: "callers",
                                    name: e.name,
                                    message: e.message,
                                    stack: d
                                };
                                return g(b, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), b
                            }

                            function f(t, o) {
                                var s = null;
                                o = null == o ? 0 : +o;
                                try {
                                    if (s = function(e) {
                                            var t = e.stacktrace;
                                            if (t) {
                                                for (var i, n = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, o = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, s = t.split("\n"), d = [], A = 0; A < s.length; A += 2) {
                                                    var c = null;
                                                    if ((i = n.exec(s[A])) ? c = {
                                                            url: i[2],
                                                            line: +i[1],
                                                            column: null,
                                                            func: i[3],
                                                            args: []
                                                        } : (i = o.exec(s[A])) && (c = {
                                                            url: i[6],
                                                            line: +i[1],
                                                            column: +i[2],
                                                            func: i[3] || i[4],
                                                            args: i[5] ? i[5].split(",") : []
                                                        }), c) {
                                                        if (!c.func && c.line && (c.func = r(c.url, c.line)), c.line) try {
                                                            c.context = a(c.url, c.line)
                                                        } catch (e) {}
                                                        c.context || (c.context = [s[A + 1]]), d.push(c)
                                                    }
                                                }
                                                return d.length ? {
                                                    mode: "stacktrace",
                                                    name: e.name,
                                                    message: e.message,
                                                    stack: d
                                                } : null
                                            }
                                        }(t), s) return s
                                } catch (t) {
                                    e
                                }
                                try {
                                    if (s = m(t)) return s
                                } catch (t) {
                                    e
                                }
                                try {
                                    if (s = function(e) {
                                            var t = e.message.split("\n");
                                            if (t.length < 4) return null;
                                            var o, s = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                                                c = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                                                l = /^\s*Line (\d+) of function script\s*$/i,
                                                u = [],
                                                h = i && i.document && i.document.getElementsByTagName("script"),
                                                m = [];
                                            for (var g in h) p(h, g) && !h[g].src && m.push(h[g]);
                                            for (var v = 2; v < t.length; v += 2) {
                                                var f = null;
                                                if (o = s.exec(t[v])) f = {
                                                    url: o[2],
                                                    func: o[3],
                                                    args: [],
                                                    line: +o[1],
                                                    column: null
                                                };
                                                else if (o = c.exec(t[v])) {
                                                    f = {
                                                        url: o[3],
                                                        func: o[4],
                                                        args: [],
                                                        line: +o[1],
                                                        column: null
                                                    };
                                                    var b = +o[1],
                                                        y = m[o[2] - 1];
                                                    if (y) {
                                                        var k = n(f.url);
                                                        if (k) {
                                                            var w = (k = k.join("\n")).indexOf(y.innerText);
                                                            w >= 0 && (f.line = b + k.substring(0, w).split("\n").length)
                                                        }
                                                    }
                                                } else if (o = l.exec(t[v])) {
                                                    var I = i.location.href.replace(/#.*$/, ""),
                                                        S = A(new RegExp(d(t[v + 1])), [I]);
                                                    f = {
                                                        url: I,
                                                        func: "",
                                                        args: [],
                                                        line: S ? S.line : o[1],
                                                        column: null
                                                    }
                                                }
                                                if (f) {
                                                    f.func || (f.func = r(f.url, f.line));
                                                    var E = a(f.url, f.line),
                                                        _ = E ? E[Math.floor(E.length / 2)] : null;
                                                    E && _.replace(/^\s*/, "") === t[v + 1].replace(/^\s*/, "") ? f.context = E : f.context = [t[v + 1]], u.push(f)
                                                }
                                            }
                                            return u.length ? {
                                                mode: "multiline",
                                                name: e.name,
                                                message: t[0],
                                                stack: u
                                            } : null
                                        }(t), s) return s
                                } catch (t) {
                                    e
                                }
                                try {
                                    if (s = v(t, o + 1)) return s
                                } catch (t) {
                                    e
                                }
                                return {
                                    name: t.name,
                                    message: t.message,
                                    mode: "failed"
                                }
                            }
                            return f.augmentStackTraceWithInitialElement = g, f.computeStackTraceFromStackProp = m, f.guessFunctionName = r, f.gatherContext = a, f.ofCaller = function(e) {
                                e = 1 + (null == e ? 0 : +e);
                                try {
                                    throw new Error
                                } catch (t) {
                                    return f(t, e + 1)
                                }
                            }, f.getSource = n, f
                        }(), s.extendToAsynchronousCallbacks = function() {
                            var e = function(e) {
                                var t = i[e];
                                i[e] = function() {
                                    var e = A.call(arguments),
                                        i = e[0];
                                    return "function" == typeof i && (e[0] = s.wrap(i)), t.apply ? t.apply(this, e) : t(e[0], e[1])
                                }
                            };
                            e("setTimeout"), e("setInterval")
                        }, s.remoteFetching || (s.remoteFetching = !0), s.collectWindowErrors || (s.collectWindowErrors = !0), (!s.linesOfContext || s.linesOfContext < 1) && (s.linesOfContext = 11), r = [], void 0 === (a = "function" == typeof(n = s) ? n.apply(t, r) : n) || (e.exports = a)
                    }

                    function p(e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }

                    function u(e) {
                        return void 0 === e
                    }
                }("undefined" != typeof window ? window : i.g)
            }
        },
        t = {};

    function i(n) {
        if (t[n]) return t[n].exports;
        var r = t[n] = {
            exports: {}
        };
        return e[n](r, r.exports, i), r.exports
    }
    i.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return i.d(t, {
            a: t
        }), t
    }, i.d = (e, t) => {
        for (var n in t) i.o(t, n) && !i.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, i.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
        "use strict";
        var e = i(564),
            t = i.n(e);
        const n = {
            ready: "pokiAppReady",
            adblocked: "pokiAppAdblocked",
            ads: {
                completed: "pokiAdsCompleted",
                error: "pokiAdsError",
                impression: "pokiAdsImpression",
                durationChange: "pokiAdsDurationChange",
                limit: "pokiAdsLimit",
                ready: "pokiAdsReady",
                requested: "pokiAdsRequested",
                prebidRequested: "pokiAdsPrebidRequested",
                skipped: "pokiAdsSkipped",
                started: "pokiAdsStarted",
                stopped: "pokiAdsStopped",
                busy: "pokiAdsBusy",
                position: {
                    preroll: "PP",
                    midroll: "PM",
                    rewarded: "PR",
                    display: "DP"
                },
                video: {
                    clicked: "pokiVideoAdsClicked",
                    firstQuartile: "pokiVideoAdsFirstQuartile",
                    midPoint: "pokiVideoAdsMidPoint",
                    thirdQuartile: "pokiVideoAdsThirdQuartile",
                    error: "pokiVideoAdsError",
                    loaderError: "pokiVideoAdsLoaderError",
                    paused: "pokiVideoAdsPauseTriggered",
                    resumed: "pokiVideoAdsResumedTriggered",
                    progress: "pokiVideoAdsProgress",
                    buffering: "pokiVideoAdsBuffering"
                }
            },
            info: {
                messages: {
                    timeLimit: "The ad-request was not processed, because of a time constraint",
                    prerollLimit: "The ad-request was cancelled, because we're not allowed to show a preroll"
                }
            },
            message: {
                event: "pokiMessageEvent",
                sdkDetails: "pokiMessageSdkDetails",
                toggleProgrammaticAds: "pokiMessageToggleProgrammaticAds"
            },
            tracking: {
                custom: "pokiTrackingCustom",
                togglePlayerAdvertisingConsent: "pokiTrackingTogglePlayerAdvertisingConsent",
                debugTrueInProduction: "pokiMessageDebugTrueProduction",
                screen: {
                    gameplayStart: "pokiTrackingScreenGameplayStart",
                    gameplayStop: "pokiTrackingScreenGameplayStop",
                    gameLoadingStarted: "pokiTrackingScreenGameLoadingStarted",
                    gameLoadingProgress: "pokiTrackingScreenGameLoadingProgress",
                    gameLoadingFinished: "pokiTrackingScreenGameLoadingFinished",
                    commercialBreak: "pokiTrackingScreenCommercialBreak",
                    rewardedBreak: "pokiTrackingScreenRewardedBreak",
                    happyTime: "pokiTrackingScreenHappyTime",
                    firstRound: "pokiTrackingScreenFirstRound",
                    roundStart: "pokiTrackingScreenRoundStart",
                    roundEnd: "pokiTrackingScreenRoundEnd",
                    gameInteractive: "pokiTrackingScreenGameInteractive",
                    displayAd: "pokiTrackingScreenDisplayAdRequest",
                    destroyAd: "pokiTrackingScreenDisplayAdDestroy"
                },
                sdk: {
                    status: {
                        initialized: "pokiTrackingSdkStatusInitialized",
                        failed: "pokiTrackingSdkStatusFailed"
                    }
                },
                ads: {
                    status: {
                        busy: "pokiTrackingAdsStatusBusy",
                        completed: "pokiTrackingAdsStatusCompleted",
                        error: "pokiTrackingAdsStatusError",
                        displayError: "pokiTrackingAdsStatusDisplayError",
                        impression: "pokiTrackingAdsStatusImpression",
                        limit: "pokiTrackingAdsStatusLimit",
                        ready: "pokiTrackingAdsStatusReady",
                        requested: "pokiTrackingAdsStatusRequested",
                        prebidRequested: "pokiTrackingAdsStatusPrebidRequested",
                        skipped: "pokiTrackingAdsStatusSkipped",
                        started: "pokiTrackingAdsStatusStarted",
                        buffering: "pokiTrackingAdsStatusBuffering"
                    },
                    video: {
                        clicked: "pokiTrackingAdsVideoClicked",
                        error: "pokiTrackingAdsVideoError",
                        loaderError: "pokiTrackingAdsVideoLoaderError",
                        progress: "pokiTrackingAdsVideoProgress",
                        paused: "pokiTrackingAdsVideoPaused",
                        resumed: "pokiTrackingAdsVideoResumed"
                    },
                    display: {
                        requested: "pokiTrackingScreenDisplayAdRequested",
                        impression: "pokiTrackingScreenDisplayAdImpression",
                        viewable: "pokiTrackingScreenDisplayAdViewable"
                    }
                }
            }
        };
        const r = function() {
            function e() {}
            return e.debug = !1, e.log = !1, e
        }();
        var a = function() {
            return a = Object.assign || function(e) {
                for (var t, i = 1, n = arguments.length; i < n; i++)
                    for (var r in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }, a.apply(this, arguments)
        };
        const o = function() {
            function e() {}
            return e.clearEventListeners = function() {
                this.listeners = {}
            }, e.removeEventListener = function(e, t) {
                if (Object.prototype.hasOwnProperty.call(this.listeners, e)) {
                    var i = this.listeners[e].indexOf(t); - 1 !== i && this.listeners[e].splice(i, 1)
                }
            }, e.addEventListener = function(e, t, i) {
                var n = this;
                if (void 0 === i && (i = !1), i = !!i, Object.prototype.hasOwnProperty.call(this.listeners, e) || (this.listeners[e] = []), i) {
                    var r = function(i) {
                        n.removeEventListener.bind(n)(e, r), t(i)
                    };
                    this.listeners[e].push(r)
                } else this.listeners[e].push(t)
            }, e.dispatchEvent = function(e, t) {
                void 0 === t && (t = {}), !r.debug || window.process && window.process.env && "test" === window.process.env.NODE_ENV || console.info(e, t);
                for (var i = Object.keys(this.listeners), n = 0; n < i.length; n++) {
                    var o = i[n];
                    if (e === o)
                        for (var s = this.listeners[o], d = 0; d < s.length; d++) s[d](a(a({}, this.dataAnnotations), t))
                }
            }, e.setDataAnnotations = function(e) {
                this.dataAnnotations = a(a({}, this.dataAnnotations), e)
            }, e.getDataAnnotations = function() {
                return this.dataAnnotations
            }, e.clearAnnotations = function() {
                this.dataAnnotations = {}
            }, e.listeners = {}, e.dataAnnotations = {}, e
        }();
        const s = function(e, t) {
            var i = !1;
            return Object.keys(t).forEach((function(n) {
                t[n] === e && (i = !0)
            })), i
        };

        function d() {
            var e, t = (null === (e = null === window || void 0 === window ? void 0 : window.location) || void 0 === e ? void 0 : e.hostname) || "";
            return "game-cdn.poki.com" === t || t.endsWith(".poki-gdn.com"), !1
        }
        var A = {
                adTagUrl: "",
                adTiming: {
                    preroll: !1,
                    timeBetweenAds: 12e4,
                    timePerTry: 7e3,
                    startAdsAfter: 12e4
                },
                waterfallRetries: d() ? 1 : 2
            },
            c = {
                AE: {
                    video: {
                        amazon: .7,
                        appnexus: .76
                    }
                },
                AL: {
                    video: {
                        amazon: .75
                    }
                },
                AT: {
                    video: {
                        appnexus: .6,
                        onetag: .81,
                        pubmatic: .82
                    }
                },
                AU: {
                    video: {
                        pubmatic: .43,
                        rubicon: .38
                    }
                },
                AZ: {
                    video: {
                        amazon: .72,
                        onetag: .84
                    }
                },
                BE: {
                    video: {
                        amazon: .83,
                        appnexus: .79
                    }
                },
                BG: {
                    video: {
                        appnexus: .72
                    }
                },
                BO: {
                    video: {
                        ix: .84
                    }
                },
                CA: {
                    video: {
                        amazon: .84,
                        pubmatic: .81
                    }
                },
                CL: {
                    video: {
                        amazon: .78
                    }
                },
                CO: {
                    video: {
                        amazon: .85
                    }
                },
                CZ: {
                    video: {
                        appnexus: .77
                    }
                },
                DE: {
                    video: {
                        appnexus: .21,
                        onetag: .81
                    }
                },
                DO: {
                    video: {
                        onetag: .84
                    }
                },
                DZ: {
                    video: {
                        amazon: .41
                    }
                },
                EG: {
                    video: {
                        amazon: .15,
                        rubicon: .63
                    }
                },
                ES: {
                    video: {
                        appnexus: .66,
                        ix: .84,
                        onetag: .82,
                        openx: .84,
                        pubmatic: .79
                    }
                },
                FI: {
                    video: {
                        appnexus: .43
                    }
                },
                FR: {
                    video: {
                        appnexus: .26,
                        ix: .53,
                        onetag: .81
                    }
                },
                GB: {
                    video: {
                        districtm: .83,
                        onetag: .8
                    }
                },
                GT: {
                    video: {
                        amazon: .74
                    }
                },
                HU: {
                    video: {
                        amazon: .55,
                        appnexus: .65
                    }
                },
                IE: {
                    video: {
                        onetag: .66
                    }
                },
                IN: {
                    video: {
                        appnexus: .72
                    }
                },
                IT: {
                    video: {
                        appnexus: .46,
                        onetag: .46
                    }
                },
                JP: {
                    video: {
                        onetag: .84
                    }
                },
                KE: {
                    video: {
                        onetag: .84
                    }
                },
                KW: {
                    video: {
                        onetag: .83
                    }
                },
                KZ: {
                    video: {
                        onetag: .8
                    }
                },
                LU: {
                    video: {
                        onetag: .82
                    }
                },
                MA: {
                    video: {
                        amazon: .68
                    }
                },
                MD: {
                    video: {
                        onetag: .7
                    }
                },
                MX: {
                    video: {
                        amazon: .47,
                        pubmatic: .75
                    }
                },
                NL: {
                    video: {
                        ix: .39,
                        onetag: .81,
                        openx: .71,
                        richaudience: .72
                    }
                },
                NZ: {
                    video: {
                        amazon: .76,
                        openx: .83
                    }
                },
                OM: {
                    video: {
                        onetag: .84
                    }
                },
                PE: {
                    video: {
                        amazon: .82
                    }
                },
                PL: {
                    video: {
                        appnexus: .84,
                        districtm: .71,
                        onetag: .73
                    }
                },
                PR: {
                    video: {
                        amazon: .83
                    }
                },
                RU: {
                    video: {
                        amazon: .78,
                        onetag: .84
                    }
                },
                SA: {
                    video: {
                        amazon: .83,
                        appnexus: .74
                    }
                },
                SK: {
                    video: {
                        appnexus: .79
                    }
                },
                TN: {
                    video: {
                        amazon: .61
                    }
                },
                UA: {
                    video: {
                        onetag: .8
                    }
                },
                US: {
                    video: {
                        pubmatic: .01
                    }
                },
                VE: {
                    video: {
                        onetag: .8
                    }
                },
                VN: {
                    video: {
                        appnexus: .81
                    }
                }
            };
        const l = A;
        const p = function(e) {
            return e instanceof Array ? e : [e]
        };
        const u = function() {
            function e(e) {
                void 0 === e && (e = {}), this.setTimings(e), this.timingIdx = {
                    timePerTry: 0
                }, this.timers = {
                    timePerTry: void 0,
                    timeBetweenAds: void 0,
                    startAdsAfter: void 0
                }, o.addEventListener(n.ads.requested, this.startTimeBetweenAdsTimer.bind(this)), o.addEventListener(n.ads.completed, this.startTimeBetweenAdsTimer.bind(this)), o.addEventListener(n.ads.stopped, this.startTimeBetweenAdsTimer.bind(this))
            }
            return e.prototype.setTimings = function(e) {
                var t = l.adTiming,
                    i = e.preroll,
                    n = void 0 === i ? t.preroll : i,
                    r = e.timePerTry,
                    a = void 0 === r ? t.timePerTry : r,
                    o = e.timeBetweenAds,
                    s = void 0 === o ? t.timeBetweenAds : o,
                    d = e.startAdsAfter,
                    A = void 0 === d ? t.startAdsAfter : d;
                this.timings = {
                    preroll: !1 !== n,
                    timePerTry: p(a),
                    timeBetweenAds: s,
                    startAdsAfter: A
                }
            }, e.prototype.startTimeBetweenAdsTimer = function() {
                this.startTimer("timeBetweenAds")
            }, e.prototype.startStartAdsAfterTimer = function() {
                this.startTimer("startAdsAfter")
            }, e.prototype.requestPossible = function() {
                return !this.timers.timeBetweenAds && !this.timers.startAdsAfter
            }, e.prototype.startWaterfallTimer = function(e) {
                this.startTimer("timePerTry", e)
            }, e.prototype.stopWaterfallTimer = function() {
                this.stopTimer("timePerTry")
            }, e.prototype.nextWaterfallTimer = function() {
                this.nextTiming("timePerTry")
            }, e.prototype.resetWaterfallTimerIdx = function() {
                this.resetTimingIdx("timePerTry")
            }, e.prototype.stopTimer = function(e) {
                this.timers[e] && (clearTimeout(this.timers[e]), this.timers[e] = void 0)
            }, e.prototype.startTimer = function(e, t) {
                var i = this;
                void 0 === t && (t = function() {}), this.getTiming(e) <= 0 ? t() : (this.timers[e] && clearTimeout(this.timers[e]), this.timers[e] = window.setTimeout((function() {
                    i.stopTimer(e), t()
                }), this.getTiming(e)))
            }, e.prototype.getTiming = function(e) {
                var t = this.timings[e];
                return t instanceof Array ? t[this.timingIdx[e]] : t
            }, e.prototype.nextTiming = function(e) {
                if (void 0 === this.timingIdx[e]) throw new Error("AdTimings Error: " + e + " does not have multiple timers");
                this.timingIdx[e] = (this.timingIdx[e] + 1) % this.timings[e].length
            }, e.prototype.resetTimingIdx = function(e) {
                if (void 0 === this.timingIdx[e]) throw new Error("AdTimings Error: " + e + " does not have multiple timers");
                this.timingIdx[e] = 0
            }, e.prototype.prerollPossible = function() {
                return this.timings.preroll
            }, e
        }();
        var h = document.location.hostname;

        function m(e) {
            var t = new RegExp(e + "=([^;]+)(?:;|$)").exec(document.cookie);
            return t ? t[1] : ""
        }

        function g(e, t) {
            document.cookie = e + "=" + t + "; path=/; samesite=none; secure; max-age=15552000; domain=" + h
        }
        h.endsWith("poki-gdn.com") && (h = "poki-gdn.com");
        var v = function(e, t, i, n) {
                return new(i || (i = Promise))((function(r, a) {
                    function o(e) {
                        try {
                            d(n.next(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function s(e) {
                        try {
                            d(n.throw(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function d(e) {
                        var t;
                        e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                            e(t)
                        }))).then(o, s)
                    }
                    d((n = n.apply(e, t || [])).next())
                }))
            },
            f = function(e, t) {
                var i, n, r, a, o = {
                    label: 0,
                    sent: function() {
                        if (1 & r[0]) throw r[1];
                        return r[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                    return this
                }), a;

                function s(a) {
                    return function(s) {
                        return function(a) {
                            if (i) throw new TypeError("Generator is already executing.");
                            for (; o;) try {
                                if (i = 1, n && (r = 2 & a[0] ? n.return : a[0] ? n.throw || ((r = n.return) && r.call(n), 0) : n.next) && !(r = r.call(n, a[1])).done) return r;
                                switch (n = 0, r && (a = [2 & a[0], r.value]), a[0]) {
                                    case 0:
                                    case 1:
                                        r = a;
                                        break;
                                    case 4:
                                        return o.label++, {
                                            value: a[1],
                                            done: !1
                                        };
                                    case 5:
                                        o.label++, n = a[1], a = [0];
                                        continue;
                                    case 7:
                                        a = o.ops.pop(), o.trys.pop();
                                        continue;
                                    default:
                                        if (!(r = o.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                            o = 0;
                                            continue
                                        }
                                        if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                            o.label = a[1];
                                            break
                                        }
                                        if (6 === a[0] && o.label < r[1]) {
                                            o.label = r[1], r = a;
                                            break
                                        }
                                        if (r && o.label < r[2]) {
                                            o.label = r[2], o.ops.push(a);
                                            break
                                        }
                                        r[2] && o.ops.pop(), o.trys.pop();
                                        continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e], n = 0
                            } finally {
                                i = r = 0
                            }
                            if (5 & a[0]) throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, s])
                    }
                }
            },
            b = function(e, t, i) {
                if (i || 2 === arguments.length)
                    for (var n, r = 0, a = t.length; r < a; r++) !n && r in t || (n || (n = Array.prototype.slice.call(t, 0, r)), n[r] = t[r]);
                return e.concat(n || Array.prototype.slice.call(t))
            },
            y = "poki_gcuid",
            k = m(y);
        const w = function() {
                function e() {}
                return e.collectAndLog = function() {
                    return v(this, void 0, void 0, (function() {
                        var e, t, i, n, r;
                        return f(this, (function(a) {
                            switch (a.label) {
                                case 0:
                                    return a.trys.push([0, 5, , 6]), [4, window.cookieStore.getAll()];
                                case 1:
                                    return e = a.sent(), window.indexedDB.databases ? [4, window.indexedDB.databases()] : [3, 3];
                                case 2:
                                    return i = a.sent(), [3, 4];
                                case 3:
                                    i = [], a.label = 4;
                                case 4:
                                    return t = i, n = b(b(b([], e.map((function(e) {
                                        return {
                                            name: e.name,
                                            expire_seconds: Math.round((e.expires - Date.now()) / 1e3),
                                            type: "cookie"
                                        }
                                    })), !0), Object.keys(window.localStorage).map((function(e) {
                                        return {
                                            name: e,
                                            expire_seconds: 15552e3,
                                            type: "localStorage"
                                        }
                                    })), !0), t.map((function(e) {
                                        return {
                                            name: e.name,
                                            expire_seconds: 0,
                                            type: "idb"
                                        }
                                    })), !0), r = {
                                        cookies: n,
                                        p4d_game_id: tt.gameId,
                                        user_id: k
                                    }, window.fetch("https://t.poki.io/game-cookies", {
                                        method: "post",
                                        body: JSON.stringify(r)
                                    }).catch(), [3, 6];
                                case 5:
                                    return a.sent(), [3, 6];
                                case 6:
                                    return [2]
                            }
                        }))
                    }))
                }, e.trackSavegames = function() {
                    window.cookieStore && window.cookieStore.getAll && tt.gameId && (Math.random() > .01 || (k || (k = Math.random().toString(36).substr(2, 9), g(y, k)), e.collectAndLog(), setInterval(e.collectAndLog, 12e4)))
                }, e
            }(),
            I = function() {
                return window.location.href
            },
            S = function() {
                return "undefined" != typeof navigator && /(?:phone|windows\s+phone|ipod|blackberry|(?:android|bb\d+|meego|silk|googlebot) .+? mobile|palm|windows\s+ce|opera\smini|avantgo|mobilesafari|docomo)/i.test(navigator.userAgent)
            },
            E = function() {
                return "undefined" != typeof navigator && /(?:ipad|playbook|(?:android|bb\d+|meego|silk)(?! .+? mobile))/i.test(navigator.userAgent)
            },
            _ = function(e, t) {
                var i;
                if ("undefined" == typeof window && !t) return "";
                e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var n = new RegExp("(?:[\\?&]|^)" + e + "=([^&#]*)").exec(t || (null === (i = null === window || void 0 === window ? void 0 : window.location) || void 0 === i ? void 0 : i.search) || "");
                return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
            },
            x = function() {
                return "undefined" != typeof navigator && /MSIE \\d|Trident.*rv:/i.test(navigator.userAgent)
            };
        var C = {
            1: "eNjDw1AVTr",
            2: "HkuQJaWnBa",
            3: "AfRKClvdYk",
            4: "Db7uYbsnlW",
            5: "UprdYKe74r",
            6: "tBCJC9E6Y4",
            7: "AfRKClvdYk",
            8: "tJ44vpLpuM",
            9: "mF5ASaga4A",
            10: "rKV8rMwiwk",
            11: "SvK8BH5qS5",
            12: "SpfIMxnWTS",
            13: "ysxIcmt3tW",
            14: "gLmtGS4aUq",
            15: "RU6ebIFLw9",
            16: "r9G4tVMYw7",
            17: "SgcDa5B8s1",
            18: "AfRKClvdYk",
            19: "DNZX8XdJXV",
            20: "39o4YUyZTX",
            21: "5sb2HFpz5a",
            22: "pgXzCJZipE",
            23: "Oani8EAGI9",
            24: "IzCeh7d7vW",
            25: "I5vRNtjoMr",
            26: "KpySvG7luq",
            27: "dK42J4rI14",
            28: "HuYorw3fRg",
            29: "mf84cGYc1h",
            30: "9ALgxEyGXU",
            31: "lBzSdVGY8F",
            32: "hKYgk9Wb8q",
            33: "xPBr8E54eE",
            34: "ZvIK2WKC7G",
            35: "7kiYi3zlIX",
            36: "VpygYMTDgm",
            37: "mis9Mt4np4",
            38: "AfRKClvdYk",
            41: "Fqmjp9Hit3",
            42: "lS2XGg058L",
            43: "AfRKClvdYk",
            46: "AfRKClvdYk",
            47: "21OybbiIdc",
            48: "AfRKClvdYk",
            49: "CMVoMvvEmu",
            50: "IoQrhRb3wU",
            52: "AfRKClvdYk",
            53: "AfRKClvdYk"
        };
        const T = function(e) {
            return 15 === e ? "MP_gIE1VDieUi" : C[e] || ""
        };
        var B = ["AU", "CA", "IE", "NZ", "US", "GB"],
            P = ["AT", "BE", "DK", "FI", "FR", "DE", "JA", "NO", "NL", "SA", "ES", "SE", "CH", "AE", "IT"],
            D = ["BR", "CL", "CZ", "HU", "PL", "PT", "RU", "SK", "TH"],
            M = ["AR", "BG", "CO", "EC", "GR", "IN", "MX", "PE", "PH", "RO", "TR", "UY"];

        function R(e) {
            return B.includes(e) ? .13 : P.includes(e) ? .07 : D.includes(e) ? .04 : .02
        }

        function L(e) {
            return "US" === e ? 1.5 : B.includes(e) ? .5 : P.includes(e) ? .15 : D.includes(e) ? .08 : M.includes(e) ? .03 : .02
        }
        const z = function(e) {
            r.debug ? console.log(e) : fetch("https://t.poki.io/adserver", {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(e)
            })
        };
        var O = ["https://a.poki.com/houseads/duo_survival_3.xml", "https://a.poki.com/houseads/like_a_king.xml", "https://a.poki.com/houseads/merge_cyber_racers.xml", "https://a.poki.com/houseads/subway_surfers.xml", "https://a.poki.com/houseads/tower_crush_compressed.xml"];

        function G() {
            return (e = O)[Math.floor(Math.random() * e.length)];
            var e
        }
        var j = {
            v_k0treo: 2.5,
            v_qr1wxs: 7.5,
            v_9diccg: 19,
            v_13q0xkw: .25,
            v_dn33ls: 1,
            v_z07u2o: 1.5,
            v_1400iyo: 2.25,
            v_9w8kxs: 3,
            v_ufej9c: 3.5,
            v_10960ao: 4.25,
            v_1ksbym8: 4.75,
            v_1ag9340: 5.25,
            v_1tbhh4w: 5.75,
            v_jjcgzk: 6.5,
            v_brnu9s: 7,
            v_1wscef4: 7.75,
            v_q22xhc: 8.5,
            v_f8irk0: 9,
            v_1rik45c: 9.75,
            v_lxhyww: 10.5,
            v_a9z0u8: 11,
            v_1yhiww0: 11.75,
            v_10mwg74: 12.25,
            v_1ji4u80: 12.75,
            v_wm2c5c: 13.5,
            v_2na6tc: 14,
            v_1myzri8: 14.75,
            v_3pzm68: 6,
            v_16kerr4: 6.25,
            v_1mdrmkg: 6.75,
            v_1ga0k5c: 7.25,
            v_5iwz5s: 8,
            v_12tk934: 8.25,
            v_1hsybr4: 8.75,
            v_1cj61hc: 9.25,
            v_y3r5kw: 9.5,
            v_94ow0: 10,
            v_15woqgw: 10.25,
            v_1orx4hs: 10.75,
            v_1d4e6f4: 11.25,
            v_t57ev4: 11.5,
            v_783hmo: 12,
            v_m7hkao: 12.5,
            v_hmo9hc: 13,
            v_19djnr4: 13.25,
            v_1twpm2o: 13.75,
            v_17zlou8: 14.25,
            v_ign1mo: 14.5,
            v_ccvz7k: 15,
            v_1f7b4sg: 15.25,
            v_snq4g0: 15.5,
            v_5wnf28: 16,
            v_137aozk: 16.25,
            v_1j0njsw: 16.75,
            v_1b8yx34: 17.25,
            v_yhhlhc: 17.5,
            v_25swe8: 18,
            v_15081z4: 18.25,
            v_1pje0ao: 18.75,
            v_1eptudc: 19.25,
            v_1xl28e8: 19.75,
            v_gfliio: 21,
            v_3y3sao: 22,
            v_ixhuyo: 22.5,
            v_ro52io: 23.5,
            v_qa73ls: 24.5,
            v_emo5j4: 25,
            v_yq5fk: 26,
            v_aobxts: 27,
            v_6shmgw: 28,
            v_natgqo: 28.5,
            v_x0f94w: 29.5,
            v_d2hfr4: 31,
            v_dch14w: 33,
            v_1jyadc: 34,
            v_8p5tz4: 36,
            v_fwv9xc: 37,
            v_c60r9c: 39,
            v_58awow: 40,
            v_bbcow: 42,
            v_a0x534: 43,
            v_hdmdq8: 45,
            v_2e8b28: 46,
            v_5nljb4: 48,
            v_1wr0n4: 50,
            v_pam1og: .5,
            v_1ipf08w: .75,
            v_1axqdj4: 1.25,
            v_1qr38cg: 1.75,
            v_15ldds: 2,
            v_1q248w0: 2.75,
            v_1eelatc: 3.25,
            v_1x9tou8: 3.75,
            v_8iam0w: 4,
            v_nhooow: 4.5,
            v_fq01z4: 5,
            v_w0u77k: 5.5,
            v_1vi5a0w: 15.75,
            v_orvt34: 16.5,
            v_dybn5s: 17,
            v_1q8czr4: 17.75,
            v_l11af4: 18.5,
            v_uqn2tc: 19.5,
            v_7zkdfk: 20,
            v_o7a58g: 20.5,
            v_vezl6o: 21.5,
            v_b5t88w: 23,
            v_4x2d4w: 24,
            v_xhwjk0: 25.5,
            v_lhw3r4: 26.5,
            v_tjkbuo: 27.5,
            v_h72ebk: 29,
            v_31n3sw: 30,
            v_64rl6o: 32,
            v_9lmigw: 35,
            v_3fdjpc: 38,
            v_fapfcw: 41,
            v_7o0lc0: 44,
            v_clbdvk: 47,
            v_ee8qv4: 49
        };
        var U = function() {
                return U = Object.assign || function(e) {
                    for (var t, i = 1, n = arguments.length; i < n; i++)
                        for (var r in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }, U.apply(this, arguments)
            },
            N = function(e, t, i) {
                if (i || 2 === arguments.length)
                    for (var n, r = 0, a = t.length; r < a; r++) !n && r in t || (n || (n = Array.prototype.slice.call(t, 0, r)), n[r] = t[r]);
                return e.concat(n || Array.prototype.slice.call(t))
            },
            Q = parseInt(_("site_id"), 10) || 0,
            F = "desktop";
        S() && (F = "mobile"), E() && (F = "tablet");
        var X = "rewarded",
            Z = "video",
            K = {
                "728x90": "/21682198607/" + F + "_ingame_728x90/" + Q + "_" + F + "_ingame_728x90",
                "300x250": "/21682198607/" + F + "_ingame_300x250/" + Q + "_" + F + "_ingame_300x250",
                "970x250": "/21682198607/" + F + "_ingame_970x250/" + Q + "_" + F + "_ingame_970x250",
                "160x600": "/21682198607/" + F + "_ingame_160x600/" + Q + "_" + F + "_ingame_160x600",
                "320x50": "/21682198607/" + F + "_ingame_320x50/" + Q + "_" + F + "_ingame_320x50",
                "728x90_external": "/21682198607/external_" + F + "_display_ingame/external_" + F + "_ingame_728x90",
                "300x250_external": "/21682198607/external_" + F + "_display_ingame/external_" + F + "_ingame_300x250",
                "970x250_external": "/21682198607/external_" + F + "_display_ingame/external_" + F + "_ingame_970x250",
                "160x600_external": "/21682198607/external_" + F + "_display_ingame/external_" + F + "_ingame_160x600",
                "320x50_external": "/21682198607/external_" + F + "_display_ingame/external_" + F + "_ingame_320x50"
            },
            H = parseInt(_("site_id"), 10) || 0,
            W = function(e) {
                var t = x() || S() || E() ? ["video/mp4", "application/javascript"] : ["video/mp4", "video/webm", "video/ogg", "application/javascript"],
                    i = U(U({
                        mimes: t,
                        minduration: 0,
                        maxduration: 15,
                        protocols: [2, 3, 5, 6, 7, 8],
                        w: 640,
                        h: 480,
                        placement: 1,
                        linearity: 1
                    }, e ? {} : {
                        skip: 1,
                        skipafter: 5
                    }), {
                        boxingallowed: 1,
                        pos: 1,
                        api: [2]
                    });
                return {
                    bids: [{
                        bidder: "appnexus",
                        params: {
                            placementId: 13184250,
                            supplyType: "web"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            delDomain: "poki-d.openx.net",
                            unit: "540105196"
                        }
                    }, {
                        bidder: "spotx",
                        params: {
                            channel_id: "265590",
                            ad_unit: "instream",
                            secure: !0,
                            hide_skin: !0
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "436284",
                            video: U({}, i)
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: T(H),
                            supplyType: "site"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06",
                            ext: {
                                override_maxduration: 3600,
                                enforce_skip: !0
                            }
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: "18608",
                            siteId: "266914",
                            zoneId: "1322034",
                            position: "atf",
                            video: {
                                size_id: 204
                            }
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "3607869@640x360"
                        }
                    }, {
                        bidder: "districtm",
                        params: {
                            placementId: 12906789
                        }
                    }],
                    mediaTypes: {
                        video: U({
                            context: "instream",
                            playerSize: [640, 480]
                        }, i)
                    }
                }
            },
            V = W(!0),
            q = W(!1),
            J = [{
                code: Z,
                mediaTypes: q.mediaTypes,
                bids: N([], q.bids, !0)
            }, {
                code: X,
                mediaTypes: V.mediaTypes,
                bids: N([], V.bids, !0)
            }, {
                code: K["728x90"],
                mediaTypes: {
                    banner: {
                        sizes: [
                            [728, 90]
                        ]
                    }
                },
                bids: [{
                    bidder: "districtm",
                    params: {
                        placementId: "12906789"
                    }
                }, {
                    bidder: "appnexus",
                    params: {
                        placementId: "12940427"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "539859872",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "268177",
                        size: [728, 90]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "1374895@728x90"
                    }
                }, {
                    bidder: "emx_digital",
                    params: {
                        tagid: "80117"
                    }
                }, {
                    bidder: "conversant",
                    params: {
                        site_id: "117477",
                        secure: 1,
                        position: 1
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: "18608",
                        siteId: "204596",
                        zoneId: "1008080"
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: 15 === H ? "MP_gIE1VDieUi" : "1V6a2fgLvX",
                        supplyType: "site"
                    }
                }]
            }, {
                code: K["300x250"],
                mediaTypes: {
                    banner: {
                        sizes: [
                            [300, 250]
                        ]
                    }
                },
                bids: [{
                    bidder: "districtm",
                    params: {
                        placementId: "12906789"
                    }
                }, {
                    bidder: "appnexus",
                    params: {
                        placementId: "12935252"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "539859873",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "268178",
                        size: [300, 250]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "1374896@300x250"
                    }
                }, {
                    bidder: "emx_digital",
                    params: {
                        tagid: "80118"
                    }
                }, {
                    bidder: "conversant",
                    params: {
                        site_id: "117477",
                        secure: 1,
                        position: 1
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: "18608",
                        siteId: "204596",
                        zoneId: "1008080"
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: 15 === H ? "MP_gIE1VDieUi" : "pKqNt5LyvF",
                        supplyType: "site"
                    }
                }]
            }, {
                code: K["970x250"],
                mediaTypes: {
                    banner: {
                        sizes: [
                            [970, 250]
                        ]
                    }
                },
                bids: [{
                    bidder: "districtm",
                    params: {
                        placementId: "12906789"
                    }
                }, {
                    bidder: "appnexus",
                    params: {
                        placementId: "20595278"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543540497",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "597527",
                        size: [970, 250]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3344351@970x250"
                    }
                }, {
                    bidder: "emx_digital",
                    params: {
                        tagid: "123738"
                    }
                }, {
                    bidder: "conversant",
                    params: {
                        site_id: "117477",
                        secure: 1,
                        position: 1
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: 15 === H ? "MP_gIE1VDieUi" : "yYyae7vnIh",
                        supplyType: "site"
                    }
                }]
            }, {
                code: K["160x600"],
                mediaTypes: {
                    banner: {
                        sizes: [
                            [160, 600]
                        ]
                    }
                },
                bids: [{
                    bidder: "districtm",
                    params: {
                        placementId: "12906789"
                    }
                }, {
                    bidder: "appnexus",
                    params: {
                        placementId: "12940425"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "539859871",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "268175",
                        size: [160, 600]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "1374893@160x600"
                    }
                }, {
                    bidder: "emx_digital",
                    params: {
                        tagid: "80119"
                    }
                }, {
                    bidder: "conversant",
                    params: {
                        site_id: "117477",
                        secure: 1,
                        position: 1
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: "18608",
                        siteId: "204596",
                        zoneId: "1008080"
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: 15 === H ? "MP_gIE1VDieUi" : "rAEnPimPzC",
                        supplyType: "site"
                    }
                }]
            }, {
                code: K["320x50"],
                mediaTypes: {
                    banner: {
                        sizes: [
                            [320, 50]
                        ]
                    }
                },
                bids: [{
                    bidder: "districtm",
                    params: {
                        placementId: "12906789"
                    }
                }, {
                    bidder: "appnexus",
                    params: {
                        placementId: "20595224"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543540495",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "597529",
                        size: [320, 50]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3344350@320x50"
                    }
                }, {
                    bidder: "conversant",
                    params: {
                        site_id: "117477",
                        secure: 1,
                        position: 1
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: "18608",
                        siteId: "204596",
                        zoneId: "1008080"
                    }
                }, {
                    bidder: "emx_digital",
                    params: {
                        tagid: "123737"
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: 15 === H ? "MP_gIE1VDieUi" : "1DP5EtcOip",
                        supplyType: "site"
                    }
                }]
            }, {
                code: K["728x90_external"],
                mediaTypes: {
                    banner: {
                        sizes: [
                            [728, 90]
                        ]
                    }
                },
                bids: [{
                    bidder: "districtm",
                    params: {
                        placementId: "12906789"
                    }
                }, {
                    bidder: "appnexus",
                    params: {
                        placementId: "20973406"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543885656",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "268177",
                        placementId: "625562",
                        size: [728, 90]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3457872"
                    }
                }, {
                    bidder: "emx_digital",
                    params: {
                        tagid: "132973"
                    }
                }, {
                    bidder: "conversant",
                    params: {
                        site_id: "117477",
                        tag_id: "96373699",
                        secure: 1,
                        position: 1
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: "18608",
                        siteId: "362566",
                        zoneId: "1962680-2"
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: 15 === H ? "MP_gIE1VDieUi" : "1V6a2fgLvX",
                        supplyType: "site"
                    }
                }]
            }, {
                code: K["300x250_external"],
                mediaTypes: {
                    banner: {
                        sizes: [
                            [300, 250]
                        ]
                    }
                },
                bids: [{
                    bidder: "districtm",
                    params: {
                        placementId: "12906789"
                    }
                }, {
                    bidder: "appnexus",
                    params: {
                        placementId: "20973408"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543885657",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "625564",
                        size: [300, 250]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3457874"
                    }
                }, {
                    bidder: "emx_digital",
                    params: {
                        tagid: "132975"
                    }
                }, {
                    bidder: "conversant",
                    params: {
                        site_id: "117477",
                        tag_id: "94f55c24",
                        secure: 1,
                        position: 1
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: "18608",
                        siteId: "362566",
                        zoneId: "1962680-15"
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: 15 === H ? "MP_gIE1VDieUi" : "pKqNt5LyvF",
                        supplyType: "site"
                    }
                }]
            }, {
                code: K["970x250_external"],
                mediaTypes: {
                    banner: {
                        sizes: [
                            [970, 250]
                        ]
                    }
                },
                bids: [{
                    bidder: "districtm",
                    params: {
                        placementId: "12906789"
                    }
                }, {
                    bidder: "appnexus",
                    params: {
                        placementId: "20973415"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543885650",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "625560",
                        size: [970, 250]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3457879"
                    }
                }, {
                    bidder: "emx_digital",
                    params: {
                        tagid: "132979"
                    }
                }, {
                    bidder: "conversant",
                    params: {
                        site_id: "117477",
                        tag_id: "62235ccb",
                        secure: 1,
                        position: 1
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: "18608",
                        siteId: "362566",
                        zoneId: "1962680-57"
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: 15 === H ? "MP_gIE1VDieUi" : "yYyae7vnIh",
                        supplyType: "site"
                    }
                }]
            }, {
                code: K["160x600_external"],
                mediaTypes: {
                    banner: {
                        sizes: [
                            [160, 600]
                        ]
                    }
                },
                bids: [{
                    bidder: "districtm",
                    params: {
                        placementId: "12906789"
                    }
                }, {
                    bidder: "appnexus",
                    params: {
                        placementId: "20973407"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543885653",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "625563",
                        size: [160, 600]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3457877"
                    }
                }, {
                    bidder: "emx_digital",
                    params: {
                        tagid: "132974"
                    }
                }, {
                    bidder: "conversant",
                    params: {
                        site_id: "117477",
                        tag_id: "9960183e",
                        secure: 1,
                        position: 1
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: "18608",
                        siteId: "362566",
                        zoneId: "1962680-9"
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: 15 === H ? "MP_gIE1VDieUi" : "rAEnPimPzC",
                        supplyType: "site"
                    }
                }]
            }, {
                code: K["320x50_external"],
                mediaTypes: {
                    banner: {
                        sizes: [
                            [320, 50]
                        ]
                    }
                },
                bids: [{
                    bidder: "districtm",
                    params: {
                        placementId: "12906789"
                    }
                }, {
                    bidder: "appnexus",
                    params: {
                        placementId: "20973413"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543885649",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "625559",
                        size: [320, 50]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3457875"
                    }
                }, {
                    bidder: "conversant",
                    params: {
                        site_id: "117477",
                        tag_id: "402db827",
                        secure: 1,
                        position: 1
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: "18608",
                        siteId: "362566",
                        zoneId: "1962680-43"
                    }
                }, {
                    bidder: "emx_digital",
                    params: {
                        tagid: "132978"
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: 15 === H ? "MP_gIE1VDieUi" : "1DP5EtcOip",
                        supplyType: "site"
                    }
                }]
            }],
            Y = {
                debug: !1,
                enableSendAllBids: !0,
                usePrebidCache: !0,
                bidderTimeout: 1500,
                priceGranularity: {
                    buckets: [{
                        precision: 2,
                        min: .01,
                        max: 3,
                        increment: .01
                    }, {
                        precision: 2,
                        min: 3,
                        max: 8,
                        increment: .05
                    }, {
                        precision: 2,
                        min: 8,
                        max: 20,
                        increment: .5
                    }, {
                        precision: 2,
                        min: 20,
                        max: 45,
                        increment: 1
                    }]
                },
                currency: {
                    adServerCurrency: "EUR",
                    defaultRates: {
                        EUR: {
                            EUR: 1,
                            GBP: .86408,
                            USD: 1.2212
                        },
                        GBP: {
                            EUR: 1.157300249976854,
                            GBP: 1,
                            USD: 1.4132950652717342
                        },
                        USD: {
                            EUR: .8188666885031116,
                            GBP: .7075663282017687,
                            USD: 1
                        }
                    }
                },
                cache: {
                    url: "https://prebid.adnxs.com/pbc/v1/cache"
                },
                targetingControls: {
                    allowTargetingKeys: ["BIDDER", "AD_ID", "PRICE_BUCKET", "SIZE", "DEAL", "SOURCE", "FORMAT", "UUID", "CACHE_ID", "CACHE_HOST", "ADOMAIN"],
                    allowSendAllBidsTargetingKeys: ["BIDDER", "AD_ID", "PRICE_BUCKET", "SIZE", "DEAL", "SOURCE", "FORMAT", "UUID", "CACHE_ID", "CACHE_HOST", "ADOMAIN"]
                },
                userSync: {
                    filterSettings: {
                        all: {
                            bidders: "*",
                            filter: "include"
                        }
                    },
                    syncsPerBidder: 1e3,
                    syncDelay: 100,
                    userIds: [{
                        name: "pubCommonId",
                        storage: {
                            type: "cookie",
                            name: "poki_pubcid",
                            expires: 180
                        }
                    }]
                }
            },
            $ = function(e, t) {
                window.pbjs = window.pbjs || {}, window.pbjs.que = window.pbjs.que || [], window.pbjs.que.push((function() {
                    window.pbjs.aliasBidder("appnexus", "districtm");
                    var i = U(U({
                        floors: {
                            data: {
                                currency: "EUR",
                                schema: {
                                    fields: ["mediaType"]
                                },
                                values: {
                                    banner: R(t),
                                    video: L(t)
                                }
                            }
                        }
                    }, Y), e.config);
                    window.pbjs.addAdUnits(function(e, t, i) {
                        var n, r, a = t[i = i.toUpperCase()];
                        if (!a) return e;
                        for (var o = Math.random(), s = 0; s <= e.length; s++)
                            for (var d = e[s], A = a[(null === (n = null == d ? void 0 : d.mediaTypes) || void 0 === n ? void 0 : n.video) ? "video" : "display"] || {}, c = (null === (r = null == d ? void 0 : d.bids) || void 0 === r ? void 0 : r.length) - 1; c >= 0; c--) {
                                var l = d.bids[c];
                                A[l.bidder] && o > A[l.bidder] && e[s].bids.splice(c, 1)
                            }
                        return e
                    }(e.adUnits || J, c, t)), window.pbjs.setConfig(i), window.pbjs.bidderSettings = {
                        districtm: {
                            bidCpmAdjustment: function(e) {
                                return .85 * e
                            }
                        }
                    }
                }))
            },
            ee = !1,
            te = function(e, t, i) {
                (function(e, t) {
                    var i, n, r = null === (n = null === (i = e[t = t.toUpperCase()]) || void 0 === i ? void 0 : i.video) || void 0 === n ? void 0 : n.amazon;
                    return !!r && Math.random() > r
                })(c, t) || window.apstag && window.apstag.init(e.settings || U({
                    pubID: "e32f1423-28bc-43ed-8ab0-5ae6b4449cf8",
                    adServer: "",
                    videoAdServer: "GAM"
                }, i ? {
                    gdpr: {
                        cmpTimeout: 1e4
                    }
                } : {}), (function() {
                    ee = !0, e.callback && e.callback()
                }))
            },
            ie = function() {
                ! function() {
                    if (!window.__tcfapi) {
                        var e = window.top,
                            t = {};
                        window.__tcfapi = function(i, n, r, a) {
                            var o = "" + Math.random(),
                                s = {
                                    __tcfapiCall: {
                                        command: i,
                                        parameter: a,
                                        version: n,
                                        callId: o
                                    }
                                };
                            t[o] = r, e.postMessage(s, "*")
                        }, window.addEventListener("message", (function(e) {
                            var i = {};
                            try {
                                i = "string" == typeof e.data ? JSON.parse(e.data) : e.data
                            } catch (e) {}
                            var n = i.__tcfapiReturn;
                            n && "function" == typeof t[n.callId] && (t[n.callId](n.returnValue, n.success), t[n.callId] = null)
                        }), !1)
                    }
                }(), window.pbjs.que.push((function() {
                    window.pbjs.setConfig({
                        consentManagement: {
                            gdpr: {
                                cmpApi: "iab",
                                timeout: 8e3,
                                defaultGdprScope: !0
                            }
                        }
                    })
                }))
            },
            ne = function() {
                ! function() {
                    if (!window.__uspapi) {
                        var e = window.top,
                            t = {};
                        window.__uspapi = function(i, n, r) {
                            var a = "" + Math.random(),
                                o = {
                                    __uspapiCall: {
                                        command: i,
                                        version: n,
                                        callId: a
                                    }
                                };
                            t[a] = r, e.postMessage(o, "*")
                        }, window.addEventListener("message", (function(e) {
                            var i = e && e.data && e.data.__uspapiReturn;
                            i && i.callId && "function" == typeof t[i.callId] && (t[i.callId](i.returnValue, i.success), t[i.callId] = null)
                        }), !1)
                    }
                }(), window.pbjs.que.push((function() {
                    window.pbjs.setConfig({
                        consentManagement: {
                            usp: {
                                cmpApi: "iab",
                                timeout: 8e3
                            }
                        }
                    })
                }))
            };

        function re(e, t, i, r, a) {
            var s = d(),
                A = s ? "nope" : t;
            if (window.pbjs && window.pbjs.que && window.pbjs.getConfig) {
                var c, l = I().split("?"),
                    p = encodeURIComponent(l[0]),
                    u = r ? X : Z,
                    h = o.getDataAnnotations(),
                    m = 1,
                    g = function() {
                        if (!(--m > 0)) try {
                            o.dispatchEvent(n.ads.prebidRequested);
                            var d = window.pbjs.adUnits.filter((function(e) {
                                return e.code === u
                            }))[0];
                            if ("undefined" === d) return console.error("Video-ad-unit not found, did you give it the adunit.code='video' value?"), void e.requestAd(A);
                            var l = window.pbjs.adServers.dfp.buildVideoUrl({
                                    adUnit: d,
                                    params: {
                                        iu: _("iu", t),
                                        sz: "640x360|640x480",
                                        output: "vast",
                                        cust_params: i,
                                        description_url: p
                                    }
                                }),
                                g = window.pbjs.getHighestCpmBids(u);
                            window.pbjs.markWinningBidAsUsed({
                                adUnitCode: u
                            }), c && (l = l.replace("cust_params=", "cust_params=" + c + "%26"));
                            var v = !1;
                            if (s) {
                                var f = void 0;
                                if (g.length > 0 && (f = g[0]), c) {
                                    var b = function(e) {
                                        var t = decodeURIComponent(e),
                                            i = _("amznbid", t);
                                        if (!i) return null;
                                        var n = j[i];
                                        return n ? {
                                            bid: n,
                                            vast: "https://aax.amazon-adsystem.com/e/dtb/vast?b=" + _("amzniid", t) + "&rnd=" + Math.round(1e10 * Math.random()) + "&pp=" + i
                                        } : null
                                    }(c);
                                    b && (!f || !f.videoCacheKey || f.cpm < b.bid) && (f = {
                                        cpm: b.bid,
                                        vast: b.vast,
                                        bidder: "amazon",
                                        videoCacheKey: "amazon"
                                    })
                                }
                                if ((!f || !f.videoCacheKey || f.cpm < L(a)) && (r || Math.random() > .5)) {
                                    var y = void 0;
                                    y = function(e) {
                                        return "US" === e ? 6.1 : B.includes(e) ? .5 : P.includes(e) ? .15 : D.includes(e) ? .08 : M.includes(e) ? .03 : .02
                                    }(a), f = {
                                        cpm: 2 * y,
                                        vast: G(),
                                        bidder: "poki",
                                        videoCacheKey: "poki"
                                    }
                                }
                                if (!f || !f.videoCacheKey) return void o.dispatchEvent(n.ads.completed);
                                switch (f.bidder) {
                                    case "onetag":
                                        l = "https://onetag-sys.com/invocation/?key=" + f.videoCacheKey;
                                        break;
                                    case "rubicon":
                                        l = "https://prebid-server.rubiconproject.com/cache?uuid=" + f.videoCacheKey;
                                        break;
                                    case "spotx":
                                        l = "https://search.spotxchange.com/ad/vast.html?key=" + f.videoCacheKey;
                                        break;
                                    case "amazon":
                                    case "poki":
                                        l = f.vast;
                                        break;
                                    default:
                                        l = "https://prebid.adnxs.com/pbc/v1/cache?uuid=" + f.videoCacheKey
                                }
                                z({
                                    event: "video-ready",
                                    size: "640x360v",
                                    opportunityId: null == h ? void 0 : h.opportunityId,
                                    adUnitPath: null == h ? void 0 : h.adUnitPath,
                                    p4d_game_id: tt.gameId,
                                    p4d_version_id: tt.versionId,
                                    bidder: null == f ? void 0 : f.bidder,
                                    bid: null == f ? void 0 : f.cpm
                                }), v = !0, o.setDataAnnotations({
                                    p4d_game_id: tt.gameId,
                                    p4d_version_id: tt.versionId,
                                    bidder: null == f ? void 0 : f.bidder,
                                    bid: null == f ? void 0 : f.cpm
                                })
                            }
                            if (o.setDataAnnotations({
                                    vhbOnlyMode: v,
                                    adTagUrl: l
                                }), g.length > 0) {
                                f = g[0];
                                o.setDataAnnotations({
                                    prebidBidder: null == f ? void 0 : f.bidder,
                                    prebidBid: null == f ? void 0 : f.cpm
                                })
                            } else o.setDataAnnotations({
                                prebidBidder: void 0,
                                prebidBid: void 0
                            });
                            e.requestAd(l)
                        } catch (t) {
                            e.requestAd(A)
                        }
                    };
                ee && (m++, window.apstag.fetchBids({
                    slots: [{
                        slotID: r ? "Rewarded" : "Midroll",
                        mediaType: "video"
                    }],
                    timeout: Y.bidderTimeout
                }, (function(e) {
                    e.length > 0 && (c = e[0].encodedQsParams), g()
                }))), s && z({
                    event: "video-request",
                    size: "640x360v",
                    opportunityId: null == h ? void 0 : h.opportunityId,
                    adUnitPath: null == h ? void 0 : h.adUnitPath,
                    p4d_game_id: tt.gameId,
                    p4d_version_id: tt.versionId
                }), window.pbjs.que.push((function() {
                    window.pbjs.requestBids({
                        adUnitCodes: [u],
                        bidsBackHandler: function() {
                            g()
                        }
                    })
                }))
            } else e.requestAd(A)
        }
        var ae = function() {
            function e(e, t) {
                void 0 === t && (t = {}), this.retries = 0, this.running = !1, this.ima = e, this.siteID = t.siteID || 3, this.country = t.country || "ZZ", this.totalRetries = t.totalRetries || l.waterfallRetries || 1, this.timing = t.timing || new u(l.adTiming), d() && (this.totalRetries = 1), o.addEventListener(n.ads.video.error, this.moveThroughWaterfall.bind(this)), o.addEventListener(n.ads.video.loaderError, this.moveThroughWaterfall.bind(this)), o.addEventListener(n.ads.ready, this.timing.stopWaterfallTimer.bind(this.timing)), o.addEventListener(n.ads.started, this.stopWaterfall.bind(this))
            }
            return e.prototype.moveThroughWaterfall = function() {
                if (!1 !== this.running) {
                    if (this.timing.stopWaterfallTimer(), this.retries < this.totalRetries) return this.timing.nextWaterfallTimer(), void this.requestAd();
                    this.running = !1, this.timing.resetWaterfallTimerIdx(), o.dispatchEvent(n.ads.error, {
                        message: "No ads"
                    })
                }
            }, e.prototype.cutOffWaterfall = function() {
                this.ima.tearDown(), this.moveThroughWaterfall()
            }, e.prototype.buildAdUnitPaths = function(e) {
                if (r.debug) {
                    var t = "/21682198607/debug-video/";
                    return e === n.ads.position.rewarded ? [t + "debug-video-rewarded"] : e === n.ads.position.preroll ? [t + "debug-video-preroll"] : [t + "debug-video-midroll"]
                }
                var i = "desktop",
                    a = "midroll";
                S() ? i = "mobile" : E() && (i = "tablet"), e === n.ads.position.rewarded && (a = "rewarded");
                var o = "/21682198607/";
                return nt.GetIsPokiIFrame() ? ["" + o + i + "_ingame_" + a + "_1/" + this.siteID + "_" + i + "_ingame_" + a + "_1", "" + o + i + "_ingame_" + a + "_2/" + this.siteID + "_" + i + "_ingame_" + a + "_2"] : [o + "external_" + i + "_video_1/external_" + i + "_ingame_" + a + "_1", o + "external_" + i + "_video_2/external_" + i + "_ingame_" + a + "_2"]
            }, e.prototype.start = function(e, t) {
                void 0 === e && (e = {}), this.running = !0, this.retries = 0, this.criteria = e, this.timing.resetWaterfallTimerIdx(), this.rewarded = t === n.ads.position.rewarded, this.adUnitPaths = this.buildAdUnitPaths(t), this.requestAd()
            }, e.prototype.requestAd = function() {
                this.timing.startWaterfallTimer(this.cutOffWaterfall.bind(this)), this.retries++, this.criteria.waterfall = this.retries;
                var e = (this.retries - 1) % this.adUnitPaths.length,
                    t = this.adUnitPaths[e],
                    i = "https://securepubads.g.doubleclick.net/gampad/ads?sz=640x360|640x480&iu=" + t + "&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url={url}&description_url={descriptionUrl}&correlator={timestamp}";
                nt.consentString && nt.consentString.length > 0 && (this.criteria.consent_string = nt.consentString);
                var r = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 970;
                this.criteria.billboards_fit = r ? "yes" : "no";
                var a, s, A = function(e) {
                    var t = I().split("?"),
                        i = encodeURIComponent(t[0]);
                    return (e = e.split("{descriptionUrl}").join(i)).split("{timestamp}").join((new Date).getTime().toString())
                }(i) + (a = this.criteria, s = "", Object.keys(a).forEach((function(e) {
                    if (Object.prototype.hasOwnProperty.call(a, e)) {
                        var t = a[e];
                        Array.isArray(t) && (t = t.join()), s += e + "=" + t + "&"
                    }
                })), "&cust_params=" + (s = encodeURIComponent(s)) + "&");
                nt.childDirected && (A += "&tfcd=1"), nt.nonPersonalized && (A += "&npa=1"), o.setDataAnnotations({
                    adUnitPath: t,
                    adTagUrl: A,
                    waterfall: this.retries
                }), o.dispatchEvent(n.ads.requested), d() || 1 === this.retries && !S() && !E() ? (console.debug("adRequest started with Prebid Video enabled"), re(this.ima, A, this.criteria, this.rewarded, this.country)) : (console.debug("adRequest started in plain mode"), this.ima.requestAd(A))
            }, e.prototype.isRunning = function() {
                return this.running
            }, e.prototype.stopWaterfall = function() {
                this.running = !1, this.timing.stopWaterfallTimer(), this.timing.resetWaterfallTimerIdx()
            }, e
        }();
        const oe = ae;
        var se = "pokiSdkContainer",
            de = "pokiSdkFixed",
            Ae = "pokiSdkOverlay",
            ce = "pokiSdkHidden",
            le = "pokiSdkInsideContainer",
            pe = "pokiSdkPauseButton",
            ue = "pokiSdkPauseButtonBG",
            he = "pokiSdkStartAdButton",
            me = "pokiSdkProgressBar",
            ge = "pokiSdkProgressContainer",
            ve = "pokiSdkSpinnerContainer",
            fe = "pokiSdkVideoContainer",
            be = "pokiSdkVisible",
            ye = "pokiSDKAdContainer";
        var ke = function(e, t, i) {
            if (i || 2 === arguments.length)
                for (var n, r = 0, a = t.length; r < a; r++) !n && r in t || (n || (n = Array.prototype.slice.call(t, 0, r)), n[r] = t[r]);
            return e.concat(n || Array.prototype.slice.call(t))
        };
        const we = function() {
            function e(e) {
                var t = this;
                if (this.hideElement = function(e) {
                        e.classList.add(ce), e.classList.remove(be)
                    }, this.showElement = function(e) {
                        e.classList.add(be), e.classList.remove(ce)
                    }, this.wrapper = e.wrapper, this.progressFaker = new Ie((function(e) {
                        return t.updateProgressBar(e)
                    })), this.progressFaker.queueFakeProgress(10, 1e3, n.ads.prebidRequested), this.progressFaker.queueFakeProgress(20, 2e3, n.ads.started), this.wrapper instanceof HTMLElement || (console.error("POKI-SDK: wrapper is not a HTMLElement, falling back to document.body"), this.wrapper = document.body), this.createElements(), "undefined" != typeof window && document) {
                    var i = document.createElement("style");
                    i.innerHTML = "\n.pokiSdkContainer {\n\toverflow: hidden;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1000;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.pokiSdkContainer.pokiSdkFixed {\n\tposition: fixed;\n}\n\n.pokiSdkContainer.pokiSdkVisible {\n\tdisplay: block;\n}\n\n.pokiSdkContainer.pokiSdkHidden,\n.pokiSdkSpinnerContainer.pokiSdkHidden {\n\tdisplay: none;\n}\n\n.pokiSdkContainer.pokiSdkHidden,\n.pokiSdkSpinnerContainer {\n\tpointer-events: none;\n}\n\n.pokiSdkSpinnerContainer {\n\tz-index: 10;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: url('https://a.poki.com/images/thumb_anim_2x.gif') 50% 50% no-repeat;\n\tuser-select: none;\n}\n\n.pokiSdkInsideContainer {\n\tbackground: #000;\n\tposition: relative;\n\tz-index: 1;\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\n\topacity: 0;\n\t-webkit-transition: opacity 0.5s ease-in-out;\n\t-moz-transition: opacity 0.5s ease-in-out;\n\t-ms-transition: opacity 0.5s ease-in-out;\n\t-o-transition: opacity 0.5s ease-in-out;\n\ttransition: opacity 0.5s ease-in-out;\n}\n\n.pokiSdkContainer.pokiSdkVisible .pokiSdkInsideContainer {\n\topacity: 1;\n}\n\n.pokiSDKAdContainer, .pokiSdkVideoContainer {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.pokiSdkStartAdButton {\n\tposition: absolute;\n\tz-index: 9999;\n\ttop: 0;\n\n\tpadding-top: 10%;\n\twidth: 100%;\n\theight: 100%;\n\ttext-align: center;\n\tcolor: #FFF;\n\n\tfont: 700 15pt 'Arial', sans-serif;\n\tfont-weight: bold;\n\tletter-spacing: 1px;\n\ttransition: 0.1s ease-in-out;\n\tline-height: 1em;\n}\n\n.pokiSdkPauseButton {\n\tcursor:pointer;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    z-index: 1;\n}\n\n.pokiSdkPauseButton:before {\n\tcontent: '';\n\tposition: absolute;\n\twidth: 100px;\n\theight: 100px;\n\tdisplay: block;\n\tborder: 2px solid #fff;\n\tborder-radius: 50%;\n\tuser-select: none;\n\tbackground-color: rgba(0, 0, 0, 0.6);\n\ttransition: background-color 0.5s ease;\n\tanimation: 1s linear infinite pulse;\n}\n\n.pokiSdkPauseButton:after {\n\tcontent: '';\n\tposition: absolute;\n\tdisplay: block;\n\tbox-sizing: border-box;\n\tborder-color: transparent transparent transparent #fff;\n\tborder-style: solid;\n\tborder-width: 26px 0 26px 40px;\n\tpointer-events: none;\n\tanimation: 1s linear infinite pulse;\n\tleft: 6px;\n}\n.pokiSdkPauseButtonBG {\n    position: fixed;\n    top: 0;\n    left: 0;\n    display: block;\n    content: '';\n    background: rgba(0, 43, 80, 0.5);\n    width: 100%;\n    height: 100%;\n}\n\n.pokiSdkPauseButtonBG:hover{\n\tbackground: rgba(0, 43, 80, 0.7);\n}\n\n@keyframes pulse {\n\t0% {\n\t\ttransform: translate(-50%, -50%) scale(0.95);\n\t}\n\t70% {\n\t\ttransform: translate(-50%, -50%) scale(1.1);\n\t}\n\t100% {\n\t\ttransform: translate(-50%, -50%) scale(0.95);\n\t}\n}\n\n.pokiSdkProgressContainer {\n\tbackground: #B8C7DD;\n\twidth: 100%;\n\theight: 5px;\n\tposition: absolute;\n\tbottom: 0;\n\tz-index: 9999;\n}\n\n.pokiSdkProgressBar {\n\tposition:relative;\n\tbottom:0px;\n\tbackground: #FFDC00;\n\theight: 100%;\n\twidth: 0%;\n\ttransition: width 0.5s;\n\ttransition-timing-function: linear;\n}\n\n.pokiSdkProgressBar.pokiSdkVisible, .pokiSdkPauseButton.pokiSdkVisible, .pokiSdkStartAdButton.pokiSdkVisible {\n\tdisplay: block;\n\tpointer-events: auto;\n}\n\n.pokiSdkProgressBar.pokiSdkHidden, .pokiSdkPauseButton.pokiSdkHidden, .pokiSdkStartAdButton.pokiSdkHidden {\n\tdisplay: none;\n\tpointer-events: none;\n}\n", document.head.appendChild(i)
                }
            }
            return e.prototype.updateProgressBar = function(e) {
                this.progressBar.style.width = e + "%"
            }, e.prototype.setupEvents = function(e) {
                this.internalSDK = e
            }, e.prototype.hide = function() {
                this.hideElement(this.containerDiv), this.hideElement(this.progressContainer), this.hidePauseButton(), this.hideElement(this.startAdButton), this.containerDiv.classList.remove(Ae), this.progressBar.style.width = "0%", this.progressFaker.reset()
            }, e.prototype.hideSpinner = function() {
                this.hideElement(this.spinnerContainer)
            }, e.prototype.show = function() {
                this.containerDiv.classList.add(Ae), this.showElement(this.containerDiv), this.showElement(this.spinnerContainer), this.showElement(this.progressContainer), this.progressFaker.start()
            }, e.prototype.getVideoBounds = function() {
                return this.adContainer.getBoundingClientRect()
            }, e.prototype.getAdContainer = function() {
                return this.adContainer
            }, e.prototype.getVideoContainer = function() {
                return this.videoContainer
            }, e.prototype.showPauseButton = function() {
                this.showElement(this.pauseButton), this.internalSDK && this.pauseButton.addEventListener("click", this.internalSDK.resumeAd.bind(this.internalSDK))
            }, e.prototype.hidePauseButton = function() {
                this.hideElement(this.pauseButton), this.internalSDK && this.pauseButton.removeEventListener("click", this.internalSDK.resumeAd.bind(this.internalSDK))
            }, e.prototype.showStartAdButton = function() {
                this.showElement(this.startAdButton), this.internalSDK && this.startAdButton.addEventListener("click", this.internalSDK.startAdClicked.bind(this.internalSDK))
            }, e.prototype.hideStartAdButton = function() {
                this.hideElement(this.startAdButton), this.internalSDK && this.startAdButton.removeEventListener("click", this.internalSDK.startAdClicked.bind(this.internalSDK))
            }, e.prototype.createElements = function() {
                if (this.containerDiv = document.createElement("div"), this.insideContainer = document.createElement("div"), this.pauseButton = document.createElement("div"), this.pauseButtonBG = document.createElement("div"), this.startAdButton = document.createElement("div"), this.progressBar = document.createElement("div"), this.progressContainer = document.createElement("div"), this.spinnerContainer = document.createElement("div"), this.adContainer = document.createElement("div"), this.videoContainer = document.createElement("video"), this.adContainer.id = "pokiSDKAdContainer", this.videoContainer.id = "pokiSDKVideoContainer", this.containerDiv.className = se, this.insideContainer.className = le, this.pauseButton.className = pe, this.pauseButtonBG.className = ue, this.pauseButton.appendChild(this.pauseButtonBG), this.startAdButton.className = he, this.startAdButton.innerHTML = "Tap anywhere to play ad", this.progressBar.className = me, this.progressContainer.className = ge, this.spinnerContainer.className = ve, this.adContainer.className = ye, this.videoContainer.className = fe, this.hide(), this.videoContainer.setAttribute("playsinline", "playsinline"), this.videoContainer.setAttribute("muted", "muted"), this.containerDiv.appendChild(this.insideContainer), this.containerDiv.appendChild(this.spinnerContainer), this.insideContainer.appendChild(this.progressContainer), this.insideContainer.appendChild(this.videoContainer), this.insideContainer.appendChild(this.adContainer), this.containerDiv.appendChild(this.pauseButton), this.containerDiv.appendChild(this.startAdButton), this.progressContainer.appendChild(this.progressBar), this.wrapper.appendChild(this.containerDiv), this.wrapper === document.body) this.containerDiv.classList.add(de);
                else {
                    var e = window.getComputedStyle(this.wrapper).position;
                    e && -1 !== ["absolute", "fixed", "relative"].indexOf(e) || (this.wrapper.style.position = "relative")
                }
            }, e
        }();
        var Ie = function() {
                function e(e) {
                    var t = this;
                    this.storedQueue = [], this.progressCallback = e, this.reset(), o.addEventListener(n.ads.video.progress, (function(e) {
                        var i = 100 - t.currentProgress,
                            n = e.currentTime / e.duration * i;
                        n < i && t.progressCallback(t.currentProgress + n)
                    })), this.initializeNoProgressFix()
                }
                return e.prototype.queueFakeProgress = function(e, t, i) {
                    var n = this;
                    this.storedQueue.push({
                        progressToFake: e,
                        duration: t,
                        stopEvent: i
                    }), o.addEventListener(i, (function() {
                        n.eventWatcher[i] = !0, n.currentProgress = n.startProgress + e, n.startProgress = n.currentProgress, n.progressCallback(n.currentProgress), n.activeQueue.shift(), n.activeQueue.length > 0 ? n.continue() : n.pause()
                    }))
                }, e.prototype.fakeProgress = function(e, t, i) {
                    this.activeQueue.push({
                        progressToFake: e,
                        duration: t,
                        stopEvent: i
                    }), this.fakeProgressEvents = !0, this.continue()
                }, e.prototype.start = function() {
                    this.activeQueue.length > 0 || (this.activeQueue = ke([], this.storedQueue, !0), this.active = !0, this.continue())
                }, e.prototype.continue = function() {
                    if (this.activeQueue.length > 0 && !this.tickInterval) {
                        this.startTime = Date.now();
                        this.tickInterval = window.setInterval(this.tick.bind(this), 50), this.active = !0
                    }
                }, e.prototype.pause = function() {
                    this.clearInterval()
                }, e.prototype.tick = function() {
                    var e = this.activeQueue[0],
                        t = Date.now() - this.startTime,
                        i = Math.min(t / e.duration, 1);
                    this.currentProgress = this.startProgress + e.progressToFake * i, this.fakeProgressEvents && o.dispatchEvent(n.ads.video.progress, {
                        duration: e.duration / 1e3,
                        currentTime: t / 1e3
                    }), this.progressCallback(this.currentProgress), (this.eventWatcher[e.stopEvent] || 1 === i) && this.pause()
                }, e.prototype.clearInterval = function() {
                    this.tickInterval && (clearInterval(this.tickInterval), this.tickInterval = 0)
                }, e.prototype.initializeNoProgressFix = function() {
                    var e = this;
                    o.addEventListener(n.ads.started, (function(t) {
                        e.progressWatcherTimeout = window.setTimeout((function() {
                            if (e.active) {
                                var i = 100 - e.currentProgress,
                                    r = 1e3 * t.duration - 1e3;
                                e.fakeProgress(i, r, n.ads.completed)
                            }
                        }), 1e3)
                    })), o.addEventListener(n.ads.video.progress, (function() {
                        e.progressWatcherTimeout && (clearTimeout(e.progressWatcherTimeout), e.progressWatcherTimeout = 0)
                    }))
                }, e.prototype.reset = function() {
                    this.eventWatcher = {}, this.startProgress = 0, this.startTime = 0, this.currentProgress = 0, this.activeQueue = [], this.active = !1, this.fakeProgressEvents = !1, this.clearInterval()
                }, e
            }(),
            Se = !0,
            Ee = {};

        function _e() {
            if (document.body && document.body.appendChild) {
                var e = document.createElement("iframe");
                if (e.style.display = "none", document.body.appendChild(e), e.contentWindow && (window.pokiKeysChanged = new Map, e.contentWindow.document.open(), e.contentWindow.document.write("<script>\nconst lsKey = 'poki_lsexpire';\nconst lifetime = 1000*60*60*24*30*6;\n\nwindow.addEventListener('storage', function(event) {\n\ttry {\n\t\tconst key = event.key;\n\n\t\t// key is null when localStorage.clear() is called.\n\t\tif (key === null) {\n\t\t\tlocalStorage.removeItem(lsKey);\n\t\t\treturn;\n\t\t}\n\n\t\tif (key === lsKey) return;\n\n\t\tconst updates = JSON.parse(localStorage.getItem(lsKey)) || {};\n\n\t\t// newValue is null when localStorage.removeItem() is called.\n\t\tif (event.newValue === null) {\n\t\t\tdelete updates[key];\n\n\t\t\t// window.parent is the game itself. This code is executed in\n\t\t\t// an iframe without src which makes it the same context as it's parent\n\t\t\t// which makes it save to access the parent's properties.\n\t\t\twindow.parent.pokiKeysChanged.set(key, 'remove');\n\t\t} else {\n\t\t\tupdates[key] = Date.now();\n\t\t\twindow.parent.pokiKeysChanged.set(key, 'set');\n\t\t}\n\t\tlocalStorage.setItem(lsKey, JSON.stringify(updates));\n\t} catch (e) {}\n});\n\nfunction expire() {\n\tconst updates = JSON.parse(localStorage.getItem(lsKey)) || {};\n\tconst expireBefore = Date.now() - lifetime;\n\tvar removed = false;\n\n\tObject.keys(updates).map(function(key) {\n\t\tif (updates[key] < expireBefore) {\n\t\t\tlocalStorage.removeItem(key);\n\t\t\tdelete updates[key];\n\t\t\tremoved = true;\n\t\t}\n\t});\n\n\tif (removed) {\n\t\tlocalStorage.setItem(lsKey, JSON.stringify(updates));\n\t}\n}\n\ntry {\n\texpire();\n} catch (e) {}\n<\/script>"), e.contentWindow.document.close(), !window.location.hostname.endsWith("poki-gdn.com") && tt.gameId)) {
                    var t = document.createElement("iframe");
                    t.style.display = "none", t.src = "https://" + tt.gameId + ".poki-gdn.com/poki-savegame-store.html", t.onload = function() {
                        if (setInterval((function() {
                                var e = [];
                                window.pokiKeysChanged.forEach((function(t, i) {
                                    "set" === t ? e.push([t, i, localStorage.getItem(i)]) : e.push([t, i])
                                })), e.length > 0 && (t.contentWindow && t.contentWindow.postMessage({
                                    type: "store",
                                    data: e
                                }, "*"), window.pokiKeysChanged.clear())
                            }), 1e3), !localStorage.getItem("pokiMigrated")) {
                            for (var e = [], i = 0; i < localStorage.length; i++) {
                                var n = localStorage.key(i);
                                e.push(["set", n, localStorage.getItem(n)])
                            }
                            e.length > 0 && t.contentWindow && t.contentWindow.postMessage({
                                type: "store",
                                data: e
                            }, "*"), localStorage.setItem("pokiMigrated", "1")
                        }
                    }, document.body.appendChild(t)
                }
            } else document.addEventListener("DOMContentLoaded", _e)
        }
        var xe = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO"],
            Ce = ["US"],
            Te = ["ZZ"];

        function Be(e) {
            return xe.includes(e)
        }

        function Pe(e) {
            return Te.includes(e)
        }
        var De = function(e, t, i, n) {
                return new(i || (i = Promise))((function(r, a) {
                    function o(e) {
                        try {
                            d(n.next(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function s(e) {
                        try {
                            d(n.throw(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function d(e) {
                        var t;
                        e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                            e(t)
                        }))).then(o, s)
                    }
                    d((n = n.apply(e, t || [])).next())
                }))
            },
            Me = function(e, t) {
                var i, n, r, a, o = {
                    label: 0,
                    sent: function() {
                        if (1 & r[0]) throw r[1];
                        return r[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                    return this
                }), a;

                function s(a) {
                    return function(s) {
                        return function(a) {
                            if (i) throw new TypeError("Generator is already executing.");
                            for (; o;) try {
                                if (i = 1, n && (r = 2 & a[0] ? n.return : a[0] ? n.throw || ((r = n.return) && r.call(n), 0) : n.next) && !(r = r.call(n, a[1])).done) return r;
                                switch (n = 0, r && (a = [2 & a[0], r.value]), a[0]) {
                                    case 0:
                                    case 1:
                                        r = a;
                                        break;
                                    case 4:
                                        return o.label++, {
                                            value: a[1],
                                            done: !1
                                        };
                                    case 5:
                                        o.label++, n = a[1], a = [0];
                                        continue;
                                    case 7:
                                        a = o.ops.pop(), o.trys.pop();
                                        continue;
                                    default:
                                        if (!(r = o.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                            o = 0;
                                            continue
                                        }
                                        if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                            o.label = a[1];
                                            break
                                        }
                                        if (6 === a[0] && o.label < r[1]) {
                                            o.label = r[1], r = a;
                                            break
                                        }
                                        if (r && o.label < r[2]) {
                                            o.label = r[2], o.ops.push(a);
                                            break
                                        }
                                        r[2] && o.ops.pop(), o.trys.pop();
                                        continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e], n = 0
                            } finally {
                                i = r = 0
                            }
                            if (5 & a[0]) throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, s])
                    }
                }
            };
        const Re = function() {
            function e(e) {
                var t = this;
                this.bannerTimeout = null, this.allowedToPlayAd = !1, this.runningAd = !1, this.currentWidth = 640, this.currentHeight = 480, this.currentRequestIsMuted = !1, this.volume = 1, this.canWeAutoPlayWithSound = function() {
                    return De(t, void 0, void 0, (function() {
                        return Me(this, (function(e) {
                            switch (e.label) {
                                case 0:
                                    if (!this.blankVideo) return [2, !1];
                                    e.label = 1;
                                case 1:
                                    return e.trys.push([1, 3, , 4]), [4, this.blankVideo.play()];
                                case 2:
                                    return e.sent(), [2, !0];
                                case 3:
                                    return e.sent(), [2, !1];
                                case 4:
                                    return [2]
                            }
                        }))
                    }))
                }, this.videoElement = document.getElementById("pokiSDKVideoContainer"), this.adsManager = null, this.volume = e, this.initAdDisplayContainer(), this.initBlankVideo(), this.initAdsLoader()
            }
            return e.prototype.initAdDisplayContainer = function() {
               
            }, e.prototype.initBlankVideo = function() {
                this.blankVideo = document.createElement("video"), this.blankVideo.setAttribute("playsinline", "playsinline");
                var e = document.createElement("source");
                e.src = "data:video/mp4;base64, AAAAHGZ0eXBNNFYgAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXTeBAAAbGliZmFhYyAxLjI4AABCAJMgBDIARwAAArEGBf//rdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNDIgcjIgOTU2YzhkOCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCB2YnZfbWF4cmF0ZT03NjggdmJ2X2J1ZnNpemU9MzAwMCBjcmZfbWF4PTAuMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAFZliIQL8mKAAKvMnJycnJycnJycnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXiEASZACGQAjgCEASZACGQAjgAAAAAdBmjgX4GSAIQBJkAIZACOAAAAAB0GaVAX4GSAhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGagC/AySEASZACGQAjgAAAAAZBmqAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZrAL8DJIQBJkAIZACOAAAAABkGa4C/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmwAvwMkhAEmQAhkAI4AAAAAGQZsgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGbQC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm2AvwMkhAEmQAhkAI4AAAAAGQZuAL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGboC/AySEASZACGQAjgAAAAAZBm8AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZvgL8DJIQBJkAIZACOAAAAABkGaAC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmiAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpAL8DJIQBJkAIZACOAAAAABkGaYC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmoAvwMkhAEmQAhkAI4AAAAAGQZqgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGawC/AySEASZACGQAjgAAAAAZBmuAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZsAL8DJIQBJkAIZACOAAAAABkGbIC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm0AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZtgL8DJIQBJkAIZACOAAAAABkGbgCvAySEASZACGQAjgCEASZACGQAjgAAAAAZBm6AnwMkhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AAAAhubW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAABDcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAzB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAA+kAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAALAAAACQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPpAAAAAAABAAAAAAKobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAB1MAAAdU5VxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAhNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAALAAkABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALWF2Y0MBQsAN/+EAFWdCwA3ZAsTsBEAAAPpAADqYA8UKkgEABWjLg8sgAAAAHHV1aWRraEDyXyRPxbo5pRvPAyPzAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAAIxzdHN6AAAAAAAAAAAAAAAeAAADDwAAAAsAAAALAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAAiHN0Y28AAAAAAAAAHgAAAEYAAANnAAADewAAA5gAAAO0AAADxwAAA+MAAAP2AAAEEgAABCUAAARBAAAEXQAABHAAAASMAAAEnwAABLsAAATOAAAE6gAABQYAAAUZAAAFNQAABUgAAAVkAAAFdwAABZMAAAWmAAAFwgAABd4AAAXxAAAGDQAABGh0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAACAAAAAAAABDcAAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAQkAAADcAABAAAAAAPgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAC7gAAAykBVxAAAAAAALWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABTb3VuZEhhbmRsZXIAAAADi21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAADT3N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAgAEgICAFEAVBbjYAAu4AAAADcoFgICAAhGQBoCAgAECAAAAIHN0dHMAAAAAAAAAAgAAADIAAAQAAAAAAQAAAkAAAAFUc3RzYwAAAAAAAAAbAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAwAAAAEAAAABAAAABAAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACgAAAAEAAAABAAAACwAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGgAAAAEAAAABAAAAGwAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAQAAAABAAAA4HN0c3oAAAAAAAAAAAAAADMAAAAaAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAACMc3RjbwAAAAAAAAAfAAAALAAAA1UAAANyAAADhgAAA6IAAAO+AAAD0QAAA+0AAAQAAAAEHAAABC8AAARLAAAEZwAABHoAAASWAAAEqQAABMUAAATYAAAE9AAABRAAAAUjAAAFPwAABVIAAAVuAAAFgQAABZ0AAAWwAAAFzAAABegAAAX7AAAGFwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTUuMzMuMTAw", this.blankVideo.appendChild(e)
            }, e.prototype.initAdsLoader = function() {
                var e = this;
                this.adsLoader || window.google && (this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer), this.adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.INSECURE), this.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(!0), this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded, !1, this), this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdLoaderError, !1, this), this.videoElement.addEventListener("onended", (function() {
                    return e.adsLoader.contentComplete()
                })))
            }, e.prototype.requestAd = function(e) {
                return De(this, void 0, void 0, (function() {
                    var t;
                    return Me(this, (function(i) {
                        switch (i.label) {
                            case 0:
                                return this.runningAd ? [2] : (this.runningAd = !0, this.adDisplayContainer.initialize(), this.videoElement.src = "", (t = new google.ima.AdsRequest).adTagUrl = e, t.linearAdSlotWidth = this.currentWidth, t.linearAdSlotHeight = this.currentHeight, t.nonLinearAdSlotWidth = this.currentWidth, t.nonLinearAdSlotHeight = this.currentHeight, t.forceNonLinearFullSlot = !0, [4, this.canWeAutoPlayWithSound()]);
                            case 1:
                                return i.sent() ? (t.setAdWillPlayMuted(!1), this.currentRequestIsMuted = !1) : (t.setAdWillPlayMuted(!0), this.currentRequestIsMuted = !0), this.allowedToPlayAd = !0, this.adsLoader.requestAds(t), [2]
                        }
                    }))
                }))
            }, e.prototype.resize = function(e, t, i) {
                void 0 === i && (i = google.ima.ViewMode.NORMAL), this.currentWidth = e, this.currentHeight = t, this.adsManager && this.adsManager.resize(e, t, i)
            }, e.prototype.onAdsManagerLoaded = function(e) {
                var t = new google.ima.AdsRenderingSettings;
                t.enablePreloading = !0, t.restoreCustomPlaybackStateOnAdBreakComplete = !0, t.mimeTypes = x() || S() || E() ? ["video/mp4"] : ["video/mp4", "video/webm", "video/ogg"], t.loadVideoTimeout = 8e3, this.adsManager = e.getAdsManager(this.videoElement, t), this.adsManager.setVolume(Math.max(0, Math.min(1, this.volume))), this.currentRequestIsMuted && this.adsManager.setVolume(0), this.allowedToPlayAd ? (this.attachAdEvents(), o.dispatchEvent(n.ads.ready)) : this.tearDown()
            }, e.prototype.setVolume = function(e) {
                this.volume = e, this.adsManager && this.adsManager.setVolume(Math.max(0, Math.min(1, this.volume)))
            }, e.prototype.startPlayback = function() {
                try {
                    this.adsManager.init(this.currentWidth, this.currentHeight, google.ima.ViewMode.NORMAL), this.adsManager.start()
                } catch (e) {
                    this.videoElement.play()
                }
            }, e.prototype.startIOSPlayback = function() {
                this.adsManager.start()
            }, e.prototype.stopPlayback = function() {
                o.dispatchEvent(n.ads.stopped), this.tearDown()
            }, e.prototype.resumeAd = function() {
                o.dispatchEvent(n.ads.video.resumed), this.adsManager && this.adsManager.resume()
            }, e.prototype.tearDown = function() {
                this.adsManager && (this.adsManager.stop(), this.adsManager.destroy(), this.adsManager = null), null !== this.bannerTimeout && (clearTimeout(this.bannerTimeout), this.bannerTimeout = null), this.adsLoader && (this.adsLoader.contentComplete(), this.adsLoader.destroy(), this.adsLoader = null, this.initAdsLoader()), this.runningAd = !1
            }, e.prototype.attachAdEvents = function() {
                var e = this,
                    t = google.ima.AdEvent.Type;
                this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, !1, this), [t.AD_PROGRESS, t.ALL_ADS_COMPLETED, t.CLICK, t.COMPLETE, t.IMPRESSION, t.PAUSED, t.SKIPPED, t.STARTED, t.USER_CLOSE, t.AD_BUFFERING].forEach((function(t) {
                    e.adsManager.addEventListener(t, e.onAdEvent, !1, e)
                }))
            }, e.prototype.onAdEvent = function(e) {
                var t = this,
                    i = e.getAd();
                switch (e.type) {
                    case google.ima.AdEvent.Type.AD_PROGRESS:
                        o.dispatchEvent(n.ads.video.progress, e.getAdData());
                        break;
                    case google.ima.AdEvent.Type.STARTED:
                        e.remainingTime = this.adsManager.getRemainingTime(), e.remainingTime <= 0 && (e.remainingTime = 15), i.isLinear() || (this.bannerTimeout = window.setTimeout((function() {
                            o.dispatchEvent(n.ads.completed, {
                                rewardAllowed: !!e.rewardAllowed
                            }), t.tearDown()
                        }), 1e3 * (e.remainingTime + 1))), o.setDataAnnotations({
                            creativeId: i.getCreativeId()
                        }), o.dispatchEvent(n.ads.started, {
                            duration: i.getDuration()
                        });
                        break;
                    case google.ima.AdEvent.Type.COMPLETE:
                        o.dispatchEvent(n.ads.completed, {
                            rewardAllowed: !0
                        }), this.tearDown();
                        break;
                    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                    case google.ima.AdEvent.Type.USER_CLOSE:
                        this.tearDown();
                        break;
                    case google.ima.AdEvent.Type.PAUSED:
                        this.adsManager.pause(), o.dispatchEvent(n.ads.video.paused);
                        break;
                    case google.ima.AdEvent.Type.AD_BUFFERING:
                        o.dispatchEvent(n.ads.video.buffering);
                        break;
                    case google.ima.AdEvent.Type.CLICK:
                        o.dispatchEvent(n.ads.video.clicked);
                        break;
                    case google.ima.AdEvent.Type.SKIPPED:
                        o.dispatchEvent(n.ads.skipped), o.dispatchEvent(n.ads.completed, {
                            rewardAllowed: !0
                        }), document.activeElement && document.activeElement.blur();
                        break;
                    case google.ima.AdEvent.Type.IMPRESSION:
                        o.dispatchEvent(n.ads.impression)
                }
            }, e.prototype.onAdLoaderError = function(e) {
                this.tearDown();
                var t = e.getError && e.getError().toString() || "Unknown";
                o.dispatchEvent(n.ads.video.loaderError, {
                    message: t
                })
            }, e.prototype.onAdError = function(e) {
                this.tearDown();
                var t = e.getError && e.getError().toString() || "Unknown";
                o.dispatchEvent(n.ads.video.error, {
                    message: t
                })
            }, e.prototype.muteAd = function() {
                void 0 !== this.adsManager && null != this.adsManager && this.adsManager.setVolume(0)
            }, e.prototype.isAdRunning = function() {
                return this.runningAd
            }, e
        }();
        const Le = function(e) {
            return new Promise((function(t, i) {
                var n = document.createElement("script");
                n.type = "text/javascript", n.async = !0, n.src = e;
                var r = function() {
                    n.readyState && "loaded" !== n.readyState && "complete" !== n.readyState || (t(), n.onload = null, n.onreadystatechange = null)
                };
                n.onload = r, n.onreadystatechange = r, n.onerror = i, document.head.appendChild(n)
            }))
        };
        var ze = function(e, t, i, n) {
                return new(i || (i = Promise))((function(r, a) {
                    function o(e) {
                        try {
                            d(n.next(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function s(e) {
                        try {
                            d(n.throw(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function d(e) {
                        var t;
                        e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                            e(t)
                        }))).then(o, s)
                    }
                    d((n = n.apply(e, t || [])).next())
                }))
            },
            Oe = function(e, t) {
                var i, n, r, a, o = {
                    label: 0,
                    sent: function() {
                        if (1 & r[0]) throw r[1];
                        return r[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                    return this
                }), a;

                function s(a) {
                    return function(s) {
                        return function(a) {
                            if (i) throw new TypeError("Generator is already executing.");
                            for (; o;) try {
                                if (i = 1, n && (r = 2 & a[0] ? n.return : a[0] ? n.throw || ((r = n.return) && r.call(n), 0) : n.next) && !(r = r.call(n, a[1])).done) return r;
                                switch (n = 0, r && (a = [2 & a[0], r.value]), a[0]) {
                                    case 0:
                                    case 1:
                                        r = a;
                                        break;
                                    case 4:
                                        return o.label++, {
                                            value: a[1],
                                            done: !1
                                        };
                                    case 5:
                                        o.label++, n = a[1], a = [0];
                                        continue;
                                    case 7:
                                        a = o.ops.pop(), o.trys.pop();
                                        continue;
                                    default:
                                        if (!(r = o.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                            o = 0;
                                            continue
                                        }
                                        if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                            o.label = a[1];
                                            break
                                        }
                                        if (6 === a[0] && o.label < r[1]) {
                                            o.label = r[1], r = a;
                                            break
                                        }
                                        if (r && o.label < r[2]) {
                                            o.label = r[2], o.ops.push(a);
                                            break
                                        }
                                        r[2] && o.ops.pop(), o.trys.pop();
                                        continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e], n = 0
                            } finally {
                                i = r = 0
                            }
                            if (5 & a[0]) throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, s])
                    }
                }
            };
        const Ge = function() {

        };
        var je = function(e, t, i, n) {
                return new(i || (i = Promise))((function(r, a) {
                    function o(e) {
                        try {
                            d(n.next(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function s(e) {
                        try {
                            d(n.throw(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function d(e) {
                        var t;
                        e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                            e(t)
                        }))).then(o, s)
                    }
                    d((n = n.apply(e, t || [])).next())
                }))
            },
            Ue = function(e, t) {
                var i, n, r, a, o = {
                    label: 0,
                    sent: function() {
                        if (1 & r[0]) throw r[1];
                        return r[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                    return this
                }), a;

                function s(a) {
                    return function(s) {
                        return function(a) {
                            if (i) throw new TypeError("Generator is already executing.");
                            for (; o;) try {
                                if (i = 1, n && (r = 2 & a[0] ? n.return : a[0] ? n.throw || ((r = n.return) && r.call(n), 0) : n.next) && !(r = r.call(n, a[1])).done) return r;
                                switch (n = 0, r && (a = [2 & a[0], r.value]), a[0]) {
                                    case 0:
                                    case 1:
                                        r = a;
                                        break;
                                    case 4:
                                        return o.label++, {
                                            value: a[1],
                                            done: !1
                                        };
                                    case 5:
                                        o.label++, n = a[1], a = [0];
                                        continue;
                                    case 7:
                                        a = o.ops.pop(), o.trys.pop();
                                        continue;
                                    default:
                                        if (!(r = o.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                            o = 0;
                                            continue
                                        }
                                        if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                            o.label = a[1];
                                            break
                                        }
                                        if (6 === a[0] && o.label < r[1]) {
                                            o.label = r[1], r = a;
                                            break
                                        }
                                        if (r && o.label < r[2]) {
                                            o.label = r[2], o.ops.push(a);
                                            break
                                        }
                                        r[2] && o.ops.pop(), o.trys.pop();
                                        continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e], n = 0
                            } finally {
                                i = r = 0
                            }
                            if (5 & a[0]) throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, s])
                    }
                }
            };

        function Ne() {
            
        }
        var Qe = function(e, t, i, n) {
                return new(i || (i = Promise))((function(r, a) {
                    function o(e) {
                        try {
                            d(n.next(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function s(e) {
                        try {
                            d(n.throw(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function d(e) {
                        var t;
                        e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                            e(t)
                        }))).then(o, s)
                    }
                    d((n = n.apply(e, t || [])).next())
                }))
            },
            Fe = function(e, t) {
                var i, n, r, a, o = {
                    label: 0,
                    sent: function() {
                        if (1 & r[0]) throw r[1];
                        return r[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                    return this
                }), a;

                function s(a) {
                    return function(s) {
                        return function(a) {
                            if (i) throw new TypeError("Generator is already executing.");
                            for (; o;) try {
                                if (i = 1, n && (r = 2 & a[0] ? n.return : a[0] ? n.throw || ((r = n.return) && r.call(n), 0) : n.next) && !(r = r.call(n, a[1])).done) return r;
                                switch (n = 0, r && (a = [2 & a[0], r.value]), a[0]) {
                                    case 0:
                                    case 1:
                                        r = a;
                                        break;
                                    case 4:
                                        return o.label++, {
                                            value: a[1],
                                            done: !1
                                        };
                                    case 5:
                                        o.label++, n = a[1], a = [0];
                                        continue;
                                    case 7:
                                        a = o.ops.pop(), o.trys.pop();
                                        continue;
                                    default:
                                        if (!(r = o.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                            o = 0;
                                            continue
                                        }
                                        if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                            o.label = a[1];
                                            break
                                        }
                                        if (6 === a[0] && o.label < r[1]) {
                                            o.label = r[1], r = a;
                                            break
                                        }
                                        if (r && o.label < r[2]) {
                                            o.label = r[2], o.ops.push(a);
                                            break
                                        }
                                        r[2] && o.ops.pop(), o.trys.pop();
                                        continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e], n = 0
                            } finally {
                                i = r = 0
                            }
                            if (5 & a[0]) throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, s])
                    }
                }
            },
            Xe = !1,
            Ze = function() {
                return Qe(void 0, void 0, void 0, (function() {
                    var e, t, i;
                    return Fe(this, (function(n) {
                        switch (n.label) {
                            case 0:
                                if (Xe) return [2];
                                n.label = 1;
                            case 1:
                                return n.trys.push([1, 4, , 5]), [4, fetch("./touchControllerConfig.json")];
                            case 2:
                                return [4, n.sent().json()];
                            case 3:
                                return (e = n.sent()) && ((t = document.createElement("script")).src = "//game-cdn.poki.com/scripts/touchOverlayController.js", t.onload = function() {
                                    new window.OverlayController(document.body, e)
                                }, document.head.appendChild(t), Xe = !0), [3, 5];
                            case 4:
                                return i = n.sent(), console.log(i), [3, 5];
                            case 5:
                                return [2]
                        }
                    }))
                }))
            };
        const Ke = function() {
            for (var e = Math.floor(Date.now() / 1e3), t = "", i = 0; i < 4; i++) t = String.fromCharCode(255 & e) + t, e >>= 8;
            if (window.crypto && crypto.getRandomValues && Uint32Array) {
                var n = new Uint32Array(12);
                crypto.getRandomValues(n);
                for (i = 0; i < 12; i++) t += String.fromCharCode(255 & n[i])
            } else
                for (i = 0; i < 12; i++) t += String.fromCharCode(Math.floor(256 * Math.random()));
            return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
        };
        var He = function() {
            function e() {
                this.slotMap = new Map
            }
            return e.prototype.waitUntilReady = function(e) {
                    window.pbjs.que.push((function() {
                        e()
                    }))
            }, e.prototype.setupSlotRenderEndedListener = function() {
                var e = this;
                this.waitUntilReady((function() {
                    window.googletag.pubads().addEventListener("slotRenderEnded", (function(t) {
                    })), window.googletag.pubads().addEventListener("impressionViewable", (function(t) {
                    }))
                }))
            }, e.prototype.validateDisplaySettings = function(e) {
                return !!(S() || E() || ["970x250", "300x250", "728x90", "160x600", "320x50"].includes(e)) && !((S() || E()) && !["320x50"].includes(e))
            }, e.prototype.getDisplaySlotConfig = function(e) {
                var t = e.split("x").map((function(e) {
                        return parseInt(e, 10)
                    })),
                    i = "/21682198607/debug-display/debug-display-" + e,
                    n = "desktop";
                S() && (n = "mobile"), E() && (n = "tablet");
                var a = parseInt(_("site_id"), 10) || 0;
                return r.debug || (i = nt.GetIsPokiIFrame() ? "/21682198607/" + n + "_ingame_" + e + "/" + a + "_" + n + "_ingame_" + e : "/21682198607/external_" + n + "_display_ingame/external_" + n + "_ingame_" + e), {
                    id: "poki-" + Ke(),
                    adUnitPath: i,
                    size: e,
                    width: t[0],
                    height: t[1],
                    refresh: !1
                }
            }, e.prototype.renderIGDAd = function(e, t, i, n, r) {
                var a = this,
                    o = this.getIGDSlotID(e);
                o && this.slotMap.get(o) && (console.error("displayAd called with a container that already contains an ad"), this.clearIGDAd(e));
                var s = this.getDisplaySlotConfig(t);
                this.slotMap.set(s.id, s), s.opportunityId = n, s.duringGameplayFn = r;
                var d = document.createElement("div");
                d.style.width = s.width + "px", d.style.height = s.height + "px", e.appendChild(d), e.setAttribute("data-poki-ad-id", s.id), s.intersectionObserver = new window.IntersectionObserver((function(t) {
                    var r;
                    t[0].isIntersecting && (null === (r = s.intersectionObserver) || void 0 === r || r.disconnect(), a.waitUntilReady((function() {
                        var t = a.slotMap.get(s.id);
                        if (t && t.opportunityId === n) {
                            d.style.background = "#CCC", d.innerHTML = "<p>ADVERTISEMENT</p>", d.style.display = "flex", d.style.justifyContent = "center", d.style.alignItems = "center", d.style.position = "absolute", d.style.zIndex = "1", d.style.fontFamily = "Helvetica", d.style.fontSize = "16px", d.style.color = "#888", d.style.pointerEvents = "none";
                            var r = document.createElement("div");
                            r.id = s.id, r.className = "poki-ad-slot", r.style.width = s.width + "px", r.style.height = s.height + "px", r.style.position = "relative", r.style.zIndex = "2", r.setAttribute("data-poki-ad-size", s.size), e.appendChild(r), a.setupGPT(s, i), a.requestAd(s)
                        }
                    })))
                }), {
                    threshold: 1
                }), s.intersectionObserver.observe(d)
            }, e.prototype.setupGPT = function(e, t) {
                var i;
                e.gptSlot = window.googletag.defineSlot(e.adUnitPath, [e.width, e.height], e.id).addService(window.googletag.pubads()), window.googletag.enableServices(), null === (i = e.gptSlot) || void 0 === i || i.clearTargeting(), Object.keys(t).forEach((function(i) {
                    var n;
                    null === (n = e.gptSlot) || void 0 === n || n.setTargeting(i, t[i])
                }))
            }, e.prototype.requestAd = function(e) {
                var t, i = this;
                dt.track(n.tracking.ads.display.requested, {
                    size: e.size,
                    opportunityId: e.opportunityId,
                    adUnitPath: e.adUnitPath,
                    refresh: e.refresh,
                    duringGameplay: null === (t = e.duringGameplayFn) || void 0 === t ? void 0 : t.call(e)
                }), window.pbjs.requestBids({
                    adUnitCodes: [e.adUnitPath],
                    bidsBackHandler: function() {
                        i.bidsBackHandler(e.id)
                    }
                })
            }, e.prototype.clearIGDAd = function(e) {
                var t, i = this.getIGDSlotID(e);
                if (i) {
                    var r = this.slotMap.get(i) || null;
                    if (r) {
                        for (dt.track(n.tracking.screen.destroyAd, {
                                opportunityId: r.opportunityId
                            }), null === (t = r.intersectionObserver) || void 0 === t || t.disconnect(), r.gptSlot && googletag.destroySlots([r.gptSlot]); e.lastChild;) e.removeChild(e.lastChild);
                        e.removeAttribute("data-poki-ad-id"), this.slotMap.delete(r.id)
                    }
                } else console.error("destroyAd called on a container without ad")
            }, e.prototype.getIGDSlotID = function(e) {
                if (!e) return null;
                var t = e.getAttribute("data-poki-ad-id");
                return t || null
            }, e.prototype.bidsBackHandler = function(e) {
                var t = this.slotMap.get(e);
                t && t.gptSlot && (window.pbjs.setTargetingForGPTAsync([t.adUnitPath]), t.adserverTargeting = window.pbjs.getAdserverTargetingForAdUnitCode([t.adUnitPath]), window.googletag.display(t.id))
            }, e
        }();
        const We = He;
        var Ve, qe = (Ve = function(e, t) {
                return Ve = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                }, Ve(e, t)
            }, function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                function i() {
                    this.constructor = e
                }
                Ve(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
            }),
            Je = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return qe(t, e), t.prototype.waitUntilReady = function(e) {
                    window.pbjs.que.push((function() {
                        e()
                    }))
                }, t.prototype.requestAd = function(t) {
                    z({
                        event: "request",
                        size: t.size,
                        opportunityId: t.opportunityId,
                        adUnitPath: t.adUnitPath,
                        p4d_game_id: tt.gameId,
                        p4d_version_id: tt.versionId
                    }), e.prototype.requestAd.call(this, t)
                }, t.prototype.bidsBackHandler = function(e) {
                    var t, i, r = this.slotMap.get(e);
                    if (r) {
                        var a = document.createElement("iframe");
                        a.setAttribute("frameborder", "0"), a.setAttribute("scrolling", "no"), a.setAttribute("marginheight", "0"), a.setAttribute("marginwidth", "0"), a.setAttribute("topmargin", "0"), a.setAttribute("leftmargin", "0"), a.setAttribute("allowtransparency", "true"), a.setAttribute("width", "" + r.width), a.setAttribute("height", "" + r.height);
                        var o = document.getElementById(r.id);
                        if (o) {
                            o.appendChild(a);
                            var s = null === (t = null == a ? void 0 : a.contentWindow) || void 0 === t ? void 0 : t.document;
                            if (!s) return console.error("IGD error - iframe injection for ad failed", e), void this.clearIGDAd(o.parentNode);
                            if (r.adserverTargeting = window.pbjs.getAdserverTargetingForAdUnitCode([r.adUnitPath]), !r.adserverTargeting.hb_adid) return console.error("IGD info - nothing to render", e, r.adserverTargeting), void this.clearIGDAd(o.parentNode);
                            var d = r.adserverTargeting.hb_bidder,
                                A = parseFloat(r.adserverTargeting.hb_pb);
                            isNaN(A) && (A = 0), window.pbjs.renderAd(s, r.adserverTargeting.hb_adid), dt.track(n.tracking.ads.display.impression, {
                                size: r.size,
                                opportunityId: r.opportunityId,
                                duringGameplay: null === (i = r.duringGameplayFn) || void 0 === i ? void 0 : i.call(r),
                                adUnitPath: r.adUnitPath,
                                prebidBid: A,
                                prebidBidder: d,
                                preBidWon: !0,
                                dfpIsBackfill: !1,
                                dfpLineItemId: void 0,
                                dfpCampaignId: void 0
                            }), z({
                                event: "impression",
                                size: r.size,
                                opportunityId: r.opportunityId,
                                adUnitPath: r.adUnitPath,
                                p4d_game_id: tt.gameId,
                                p4d_version_id: tt.versionId,
                                bidder: d,
                                bid: A
                            }), r.intersectionObserver = new IntersectionObserver((function(e) {
                                e.forEach((function(e) {
                                    e.isIntersecting ? r.intersectingTimer || (r.intersectingTimer = setTimeout((function() {
                                        var t, i;
                                        null === (t = r.intersectionObserver) || void 0 === t || t.unobserve(e.target), dt.track(n.tracking.ads.display.viewable, {
                                            size: r.size,
                                            opportunityId: r.opportunityId,
                                            duringGameplay: null === (i = r.duringGameplayFn) || void 0 === i ? void 0 : i.call(r),
                                            adUnitPath: r.adUnitPath
                                        }), z({
                                            event: "viewable",
                                            size: r.size,
                                            opportunityId: r.opportunityId,
                                            adUnitPath: r.adUnitPath,
                                            p4d_game_id: tt.gameId,
                                            p4d_version_id: tt.versionId,
                                            bidder: d,
                                            bid: A
                                        })
                                    }), 1e3)) : r.intersectingTimer && (clearTimeout(r.intersectingTimer), r.intersectingTimer = void 0)
                                }))
                            }), {
                                threshold: .5
                            }), r.intersectionObserver.observe(o)
                        } else console.error("IGD error - container not found", e)
                    }
                }, t.prototype.setupGPT = function(e, t) {}, t.prototype.setupSlotRenderEndedListener = function() {}, t
            }(We);
        const Ye = Je;
        var $e = function() {
                return $e = Object.assign || function(e) {
                    for (var t, i = 1, n = arguments.length; i < n; i++)
                        for (var r in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }, $e.apply(this, arguments)
            },
            et = function(e, t, i) {
                if (i || 2 === arguments.length)
                    for (var n, r = 0, a = t.length; r < a; r++) !n && r in t || (n || (n = Array.prototype.slice.call(t, 0, r)), n[r] = t[r]);
                return e.concat(n || Array.prototype.slice.call(t))
            },
            tt = {
                gameId: _("game_id"),
                versionId: _("game_version_id")
            },
            it = function() {
                function e() {
                    this.autoStartOnReady = !1, this.criteria = {}, this.debugIsOverwritten = !1, this.handlers = {}, this.initializingPromise = null, this.isInitialized = !1, this.programmaticAdsEnabled = !0, this.sdkBooted = !1, this.sdkImaError = !1, this.startAdEnabled = !1, this.startStartAdsAfterTimerOnInit = !1, this.initOptions = {}, this.forceDisableCommercialBreak = !1, this.installedTCFv2 = !1, this.installedUSP = !1, this.isBot = !1, this.adReady = !1, this.debugTouchOverlayController = !1, this.setPlayerAge = function(e) {
                        e && function(e, t) {
                            if (Se) try {
                                localStorage.setItem(e, t)
                            } catch (i) {
                                Se = !1, Ee[e] = t
                            } else Ee[e] = t
                        }("playerAge", e)
                    }, this.toggleNonPersonalized = function(t) {
                        e.nonPersonalized = t
                    }, this.setConsentString = function(t) {
                        e.consentString = t
                    }, this.setLogging = function(e) {
                        r.log = e
                    }, this.sdkNotBootedButCalled = function() {
                        console.error("The Poki SDK has not yet been initialized")
                    }, d() ? this.IGD = new Ye : this.IGD = new We;
                    var t = _("pokiDebug");
                    "" !== t && (this.setDebug("true" === t), this.debugIsOverwritten = !0), "" !== _("pokiLogging") && this.setLogging(!0)
                }
                return e.prototype.init = function(e) {
                    if (void 0 === e && (e = {}), "undefined" != typeof window) {
                        var t = e.onReady,
                            i = void 0 === t ? null : t,
                            n = e.onAdblocked,
                            r = void 0 === n ? null : n;
                        return this.initOptions = e, i && this.registerHandler("onReady", i), r && this.registerHandler("onAdblocked", r), this.isInitialized ? console.error("Poki SDK has already been initialized") : (this.initializingPromise || (this.initializingPromise = this.lazyLoadInit()), this.initializingPromise)
                    }
                }, e.prototype.lazyLoadInit = function() {
                    var t = this,
                        i = this.initOptions,
                        a = i.debug,
                        s = void 0 !== a && a,
                        d = i.prebid,
                        A = void 0 === d ? {} : d,
                        c = i.a9,
                        p = void 0 === c ? {} : c,
                        u = i.volume,
                        h = void 0 === u ? 1 : u,
                        m = i.waterfallRetries,
                        g = i.wrapper,
                        v = void 0 === g ? document.body : g,
                        f = parseInt(_("site_id"), 10) || 0;
                    this.isBot = "1" === _("bot") || {
                        
                    }, this.setupDefaultEvents(), dt.setupDefaultEvents(), e.GetIsPokiIFrame() && _e(), setTimeout(w.trackSavegames, 1e4);
                    var b = $e({}, l),
                        y = Ge;
                    r.debug && (y = function() {
                        return Promise.resolve()
                    });
                    var k = Ne,
                        I = _("ccpaApplies"),
                        x = this.initOptions.country || _("country"),
                        C = void 0 !== this.initOptions.isCCPA ? this.initOptions.isCCPA : "" !== I ? "1" === I : void 0;
                    x && void 0 !== C && (k = function() {
                        return Promise.resolve({
                            ISO: x,
                            ccpaApplies: C
                        })
                    });
                    var T = !1;
                    x && ($(A, x), T = !0), window.addEventListener("resize", this.resize.bind(this), !1), window.addEventListener("message", this.onMessage.bind(this), !1), this.debugIsOverwritten || this.setDebug(r.debug || s), this.debugTouchOverlayController && (S() || E()) && Ze();
                    var B = [y(), k()],
                        P = et([], B, !0);
                    this.isBot || P.push(Le(""));
                    var D = function(e, i, a) {
                        if (void 0 === a && (a = !0), t.country = x || (null == i ? void 0 : i.ISO) || "zz", t.isCCPA = void 0 === C ? (null == i ? void 0 : i.ccpaApplies) || !1 : C, e) {
                            tt.gameId || (tt.gameId = e.gameId);
                            [""].includes(tt.gameId) && (S() || E()) && Ze(), b.adTiming = e.adTiming, b.customCriteria = $e($e({}, b.customCriteria), {
                                p4d_game_id: tt.gameId
                            })
                        }
                        Be(t.country) && !r.debug && (ie(), console.debug("GDPR - waiting for __tcfapi callback"), window.__tcfapi("ping", 2, (function() {
                            console.debug("GDPR - __tcfapi callback received"), t.installedTCFv2 = !0, a && o.dispatchEvent(n.ready)
                        })), setTimeout((function() {
                            t.installedTCFv2 || (console.error("GDPR - No __tcfapi callback after 2s, verify implementation!"), a && o.dispatchEvent(n.ready))
                        }), 2e3)), t.isCCPA && !r.debug && (ne(), console.debug("USPrivacy - waiting for __uspapi callback"), window.__uspapi("uspPing", 1, (function() {
                            console.debug("USPrivacy - __uspapi callback received"), t.installedUSP = !0, a && o.dispatchEvent(n.ready)
                        })), setTimeout((function() {
                            t.installedUSP || (console.error("USPrivacy - No __uspapi callback after 2s, verify implementation!"), a && o.dispatchEvent(n.ready))
                        }), 2e3))
                    };
                    return Promise.all(P).catch((function() {
                        Promise.all(B).then((function(e) {
                            var t = e[0],
                                i = e[1];
                            D(t, i, !1)
                        })), o.dispatchEvent(n.adblocked)
                    })).then((function(e) {
                        if (void 0 !== e) {
                            var i = e[0],
                                a = e[1];
                            D(i, a), T || $(A, t.country), r.debug && (b.adTiming.startAdsAfter = 0), t.enableSettings(b), t.playerSkin = new we({
                                wrapper: v
                            }), t.ima = new Re(h), t.playerSkin.setupEvents(t), t.startStartAdsAfterTimerOnInit && t.adTimings.startStartAdsAfterTimer(), t.waterfall = new oe(t.ima, {
                                timing: t.adTimings,
                                totalRetries: m,
                                siteID: f,
                                country: t.country
                            }), t.IGD.setupSlotRenderEndedListener();
                            var s = Be(t.country);
                            te(p, t.country, s), t.isInitialized = !0, t.isCCPA || s || o.dispatchEvent(n.ready), r.debug && o.dispatchEvent(n.ready)
                        }
                    }))
                }, e.prototype.requestAd = function(e) {
                    void 0 === e && (e = {});
                    var t = e.autoStart,
                        i = void 0 === t || t,
                        a = e.onFinish,
                        d = void 0 === a ? null : a,
                        A = e.onStart,
                        c = void 0 === A ? null : A,
                        l = e.position,
                        p = void 0 === l ? null : l;
                    if (this.autoStartOnReady = !1 !== i, d && this.registerHandler("onFinish", d), c && this.registerHandler("onStart", c), this.forceDisableCommercialBreak && [n.ads.position.midroll, n.ads.position.preroll].includes(p)) d && d();
                    else if (this.isBot) d && d({});
                    else {
                        if (!this.sdkBooted) return o.dispatchEvent(n.ads.error, {
                            message: "Requesting ad on unbooted SDK"
                        }), void this.sdkNotBootedButCalled();
                        else if (!S() && !E() || p === n.ads.position.rewarded)
                            if (null !== p && s(p, n.ads.position))
                                if (!Be(this.country) || this.installedTCFv2 || r.debug)
                                    if (!this.isCCPA || this.installedUSP)
                                       if (this.adReady) o.dispatchEvent(n.ads.ready);
                       
                            if (p === n.ads.position.rewarded) {

                            } else o.dispatchEvent(n.ads.limit, {
                                reason: n.info.messages.timeLimit
                            });

                    }
                }, e.prototype.displayAd = function(e, t, i, a) {
                    if (!this.isBot) {
                        var s = n.ads.position.display;
                        if (!Be(this.country) || this.installedTCFv2 || r.debug)
                            if (!this.isCCPA || window.__uspapi)
                                if (t) {
                                    if (!this.sdkBooted) return o.dispatchEvent(n.ads.error, {
                                        message: "Requesting ad on unbooted SDK",
                                        position: s
                                    }), void this.sdkNotBootedButCalled();
                                    if (e)
                                        if (this.sdkImaError) o.dispatchEvent(n.ads.error, {
                                            message: "Adblocker has been detected",
                                            position: s
                                        });
                                        else {
                                            if (!this.IGD.validateDisplaySettings(t)) return o.dispatchEvent(n.ads.error, {
                                                reason: "Display size " + t + " is not supported on this device",
                                                position: s
                                            });
                                            var d = $e($e({}, this.genericCriteria()), this.criteria);
                                            this.IGD.renderIGDAd(e, t, d, i, a)
                                        }
                                    else o.dispatchEvent(n.ads.error, {
                                        message: "Provided container does not exist",
                                        position: s
                                    })
                                } else o.dispatchEvent(n.ads.error, {
                                    message: "No ad size given, usage: displayAd(<container>, <size>)",
                                    position: s
                                });
                        else o.dispatchEvent(n.ads.error, {
                            message: "No USP detected, please contact developersupport@poki.com for more information",
                            position: s
                        });
                        else o.dispatchEvent(n.ads.error, {
                            message: "No TCFv2 CMP detected, please contact developersupport@poki.com for more information",
                            position: s
                        })
                    }
                }, e.prototype.destroyAd = function(e) {
                    if (!this.sdkBooted) return o.dispatchEvent(), void this.sdkNotBootedButCalled();
                    this.sdkImaError ? o.dispatchEvent() : (e = e || document.body, this.IGD.clearIGDAd(e))
                }, e.prototype.startStartAdsAfterTimer = function() {
                }, e.prototype.enableSettings = function(e) {
                    this.criteria = $e({}, e.customCriteria), this.adTimings = new u(e.adTiming)
                }, e.prototype.togglePlayerAdvertisingConsent = function(e) {
                    if (e) {
                        var t, i = parseInt(function(e) {
                                if (!Se) return Ee[e];
                                try {
                                    return localStorage.getItem(e)
                                } catch (t) {
                                    return Ee[e]
                                }
                            }("playerAge"), 10) || 0,
                            n = this.country,
                            r = Be(n),
                            a = (t = n, Ce.includes(t)),
                            o = Pe(n);
                        (r || a || Pe) && (r && i <= 12 || a && i <= 16 || o && i <= 16) ? this.disableProgrammatic(): this.enableProgrammatic()
                    } else this.disableProgrammatic()
                }, e.prototype.disableProgrammatic = function() {
                    e.childDirected = !0, this.programmaticAdsEnabled = !1
                }, e.prototype.enableProgrammatic = function() {
                    e.childDirected = !1, this.programmaticAdsEnabled = !0
                }, e.prototype.getProgrammaticAdsEnabled = function() {
                    return this.programmaticAdsEnabled
                }, e.prototype.setDebug = function(e) {
                    this.debugIsOverwritten ? e && dt.track(n.tracking.debugTrueInProduction) : r.debug = e
                }, e.prototype.resize = function() {
                    var e = this;
                    if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                    if (!this.sdkImaError) {
                        var t = this.playerSkin.getVideoBounds();
                        0 !== t.width && 0 !== t.height ? this.ima.resize(t.width, t.height) : setTimeout((function() {
                            e.resize()
                        }), 100)
                    }
                }, e.prototype.onMessage = function(e) {
                    if ("string" == typeof e.data.type) switch (e.data.type) {
                        case "toggleNonPersonalized":
                            this.toggleNonPersonalized(!(!e.data.content || !e.data.content.nonPersonalized));
                            break;
                        case "setPersonalizedADConsent":
                            this.toggleNonPersonalized(!(e.data.content && e.data.content.consent)), this.setConsentString(e.data.content ? e.data.content.consentString : "");
                            break;
                        case "forceDisableCommercialBreak":
                            this.forceDisableCommercialBreak = !0
                    }
                }, e.prototype.startAd = function() {
                    if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                    this.sdkImaError || (this.adReady ? (this.resize(), this.ima.startPlayback()) : o.dispatchEvent(n.ads.error, {
                        message: "No ads ready to start"
                    }))
                }, e.prototype.startAdClicked = function() {
                    "undefined" != typeof navigator && /(iPad|iPhone|iPod)/gi.test(navigator.userAgent) && this.startAdEnabled && (this.startAdEnabled = !1, this.playerSkin.hideStartAdButton(), this.ima.startIOSPlayback())
                }, e.prototype.stopAd = function() {
                    if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                    this.sdkImaError || (this.waterfall.stopWaterfall(), this.ima.stopPlayback(), this.playerSkin.hide())
                }, e.prototype.resumeAd = function() {
                    if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                    this.sdkImaError || (this.playerSkin.hidePauseButton(), this.ima.resumeAd())
                }, e.prototype.skipAd = function() {
                    this.stopAd(), this.callHandler("onFinish", {
                        type: n.ads.completed,
                        rewardAllowed: !0
                    })
                }, e.prototype.muteAd = function() {
                    if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                    this.sdkImaError || this.ima.muteAd()
                }, e.prototype.registerHandler = function(e, t) {
                    this.handlers[e] = t
                }, e.prototype.callHandler = function(e) {
                    for (var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
                    "function" == typeof this.handlers[e] && this.handlers[e](t)
                }, e.prototype.setupDefaultEvents = function() {
                    var e = this;
                    o.addEventListener(n.ready, (function() {
                        e.sdkBooted = !0, e.callHandler("onReady")
                    })), o.addEventListener(n.adblocked, (function() {
                        e.sdkBooted = !0, e.callHandler("onReady")
                    })), o.addEventListener(n.ads.ready, (function() {
                        e.adReady = !0, e.callHandler("onReady")
                    })), o.addEventListener(n.ads.started, (function() {
                        e.playerSkin.hideSpinner(), e.callHandler("onStart", {
                            type: n.ads.limit
                        })
                    })), o.addEventListener(n.ads.video.paused, (function() {
                        e.playerSkin.showPauseButton()
                    })), o.addEventListener(n.ads.limit, (function() {
                        e.callHandler("onFinish", {
                            type: n.ads.limit,
                            rewardAllowed: !1
                        })
                    })), o.addEventListener(n.ads.stopped, (function() {
                        e.callHandler("onFinish", {
                            type: n.ads.stopped,
                            rewardAllowed: !1
                        })
                    })), o.addEventListener(n.ads.error, (function() {
                        e.callHandler("onFinish", {
                            type: n.ads.error,
                            rewardAllowed: !1
                        })
                    })), o.addEventListener(n.ads.busy, (function() {
                        e.callHandler("onFinish", {
                            type: n.ads.busy,
                            rewardAllowed: !1
                        })
                    })), o.addEventListener(n.ads.completed, (function(t) {
                        e.callHandler("onFinish", {
                            type: n.ads.completed,
                            rewardAllowed: !!t.rewardAllowed
                        })
                    })), [n.ads.limit, n.ads.stopped, n.ads.error, n.ads.busy, n.ads.completed].forEach((function(t) {
                        o.addEventListener(t, (function() {
                            e.playerSkin && e.playerSkin.hide(), e.adReady = !1
                        }))
                    }))
                }, e.prototype.genericCriteria = function() {
                    var e = {},
                        t = encodeURIComponent(_("tag") || ""),
                        i = encodeURIComponent(_("site_id") || ""),
                        n = encodeURIComponent(_("experiment") || ""),
                        r = encodeURIComponent(_("categories") || "");
                    return e.tag = t, e.tag_site = t + "|" + i, e.site_id = i, e.experiment = n, e.categories = r, this.programmaticAdsEnabled || (e.disable_programmatic = 1), e
                }, e.prototype.setVolume = function(e) {
                    this.ima && this.ima.setVolume(e)
                }, e.GetIsPokiIFrame = function() {
                    return (parseInt(_("site_id"), 10) || 0) > 0
                }, e.childDirected = !1, e.nonPersonalized = !1, e.consentString = "", e
            }();
        const nt = it;
        const rt = function() {
            function e() {}
            return e.sendMessage = function(e, t) {
                var i = window.parent;
                if (!s(e, n.message)) {
                    var r = Object.keys(n.message).map((function(e) {
                        return "poki.message." + e
                    }));
                    throw new TypeError("Argument 'type' must be one of " + r.join(", "))
                }
                var a = t || {};
                tt.gameId && tt.versionId && (a.pokifordevs = {
                    game_id: tt.gameId,
                    game_version_id: tt.versionId
                }), i.postMessage({
                    type: e,
                    content: a
                }, "*")
            }, e
        }();
        var at = function(e) {
            var t = new Array;
            return Object.keys(e).forEach((function(i) {
                "object" == typeof e[i] ? t = t.concat(at(e[i])) : t.push(e[i])
            })), t
        };
        var ot = function() {
                return ot = Object.assign || function(e) {
                    for (var t, i = 1, n = arguments.length; i < n; i++)
                        for (var r in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }, ot.apply(this, arguments)
            },
            st = at(n.tracking);
        const dt = function() {
            function e() {}
            return e.track = function(e, t) {
                if (void 0 === t && (t = {}), -1 === st.indexOf(e)) throw new TypeError("Invalid 'event', must be one of " + st.join(", "));
                if ("object" != typeof t) throw new TypeError("Invalid data, must be an object");
                var i = o.getDataAnnotations();
                if (null == i ? void 0 : i.vhbOnlyMode) switch (e) {
                    case n.tracking.ads.status.impression:
                        z(ot({
                            event: "video-impression",
                            size: "640x360v"
                        }, i));
                        break;
                    case n.tracking.ads.video.error:
                        z(ot({
                            event: "video-error",
                            size: "640x360v"
                        }, i));
                        break;
                    case n.tracking.ads.video.loaderError:
                        z(ot({
                            event: "video-adsloader-error",
                            size: "640x360v"
                        }, i));
                        break;
                    case n.tracking.ads.status.completed:
                        z(ot({
                            event: "video-complete",
                            size: "640x360v"
                        }, i))
                }
                if (r.debug || r.log) {
                    if (window.process && window.process.env && "test" === window.process.env.NODE_ENV) return;
                    Object.keys(t).length ? console.info("%cPOKI_TRACKER: %cTracked event '" + e + "' with data:", "font-weight: bold", "", t) : console.info("%cPOKI_TRACKER: %cTracked event '" + e + "'", "font-weight: bold", "")
                }
                rt.sendMessage(n.message.event, {
                    event: e,
                    data: t
                })
            }, e.setupDefaultEvents = function() {
                var t, i = ((t = {})[n.ready] = n.tracking.sdk.status.initialized, t[n.adblocked] = console.log(n.tracking.sdk.status.failed), t[n.ads.busy] = n.tracking.ads.status.busy, t[n.ads.completed] = n.tracking.ads.status.completed, t[n.ads.error] = console.log(n.tracking.ads.status.error), t[n.ads.displayError] = console.log(n.tracking.ads.status.displayError), t[n.ads.impression] = n.tracking.ads.status.impression, t[n.ads.limit] = n.tracking.ads.status.limit, t[n.ads.ready] = n.tracking.ads.status.ready, t[n.ads.requested] = n.tracking.ads.status.requested, t[n.ads.prebidRequested] = n.tracking.ads.status.prebidRequested, t[n.ads.skipped] = n.tracking.ads.status.skipped, t[n.ads.started] = n.tracking.ads.status.started, t[n.ads.video.clicked] = n.tracking.ads.video.clicked, t[n.ads.video.error] = n.tracking.ads.video.error, t[n.ads.video.loaderError] = n.tracking.ads.video.loaderError, t[n.ads.video.buffering] = n.tracking.ads.status.buffering, t[n.ads.video.progress] = n.tracking.ads.video.progress, t[n.ads.video.paused] = n.tracking.ads.video.paused, t[n.ads.video.resumed] = n.tracking.ads.video.resumed, t[n.tracking.screen.gameplayStart] = n.tracking.screen.gameplayStart, t[n.tracking.screen.gameplayStop] = n.tracking.screen.gameplayStop, t[n.tracking.screen.loadingProgress] = n.tracking.screen.loadingProgress, t[n.tracking.screen.commercialBreak] = n.tracking.screen.commercialBreak, t[n.tracking.screen.rewardedBreak] = n.tracking.screen.rewardedBreak, t[n.tracking.screen.happyTime] = n.tracking.screen.happyTime, t);
                Object.keys(i).forEach((function(t) {
                    o.addEventListener(t, (function(n) {
                        e.track(i[t], n)
                    }))
                }))
            }, e
        }();

        function At(e) {
            switch (Object.prototype.toString.call(e)) {
                case "[object Error]":
                case "[object Exception]":
                case "[object DOMException]":
                    return !0;
                default:
                    return e instanceof Error
            }
        }
        var ct = "poki_erruid",
            lt = Date.now(),
            pt = m(ct);

        function ut(e) {
            if (tt.gameId && tt.versionId) {
                if (!(Date.now() < lt)) {
                    pt || (pt = Math.random().toString(36).substr(2, 9), g(ct, pt));
                    try {
                        var t = JSON.stringify({
                                gid: tt.gameId,
                                vid: tt.versionId,
                                ve: 7,
                                n: e.name,
                                m: e.message,
                                s: JSON.stringify(e.stack),
                                ui: pt
                            }),
                            i = "https://t.poki.io/ge";
                        if (navigator.sendBeacon) navigator.sendBeacon(i, t);
                        else {
                            var n = new XMLHttpRequest;
                            n.open("POST", i, !0), n.send(t)
                        }
                        lt = Date.now() + 100
                    } catch (e) {
                        console.error(e)
                    }
                }
            } else console.log(e)
        }
        "undefined" != typeof window && (t().remoteFetching = !1, t().report.subscribe((function(e) {
            if ("Script error." === e.message && window.pokiLastCatch) {
                var i = window.pokiLastCatch;
                window.pokiLastCatch = null, t().report(i)
            } else ut(e)
        })), window.onunhandledrejection = function(e) {
            At(e.reason) ? t().report(e.reason) : ut({
                name: "unhandledrejection",
                message: JSON.stringify(e.reason)
            })
        });
        var ht = function() {
                return ht = Object.assign || function(e) {
                    for (var t, i = 1, n = arguments.length; i < n; i++)
                        for (var r in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }, ht.apply(this, arguments)
            },
            mt = function() {
                function t() {
                    var t = this;
                    this.gameStarted = !1, this.SDK = new nt, this.gameplayStartCounter = 0, this.gameplayStopCounter = 0, this.duringGameplay = !1, this.init = function(e) {
                        return void 0 === e && (e = {}), new Promise((function(i, r) {
                            t.SDK.init(ht({
                                onReady: function() {
                                    if (_("preroll")) {
                                        var e = t.SDK.adTimings.prerollPossible;
                                        t.SDK.adTimings.prerollPossible = function() {
                                            return !0
                                        }, t.commercialBreak(), t.SDK.adTimings.prerollPossible = e
                                    }
                                    i()
                                },
                                onAdblocked: r
                            }, e)), rt.sendMessage(n.message.sdkDetails, {
                                version: "2.234.2"
                            })
                        }))
                    }, this.initWithVideoHB = function() {
                        return t.init()
                    }, this.gameLoadingProgress = function(e) {
                        var t = {};
                        void 0 !== e.percentageDone && (t.percentageDone = Number(e.percentageDone)), void 0 !== e.kbLoaded && (t.kbLoaded = Number(e.kbLoaded)), void 0 !== e.kbTotal && (t.kbTotal = Number(e.kbTotal)), void 0 !== e.fileNameLoaded && (t.fileNameLoaded = String(e.fileNameLoaded)), void 0 !== e.filesLoaded && (t.filesLoaded = Number(e.filesLoaded)), void 0 !== e.filesTotal && (t.filesTotal = Number(e.filesTotal)), dt.track(n.tracking.screen.gameLoadingProgress, t)
                    }, this.gameLoadingStart = function() {
                        var e, t;
                        dt.track(n.tracking.screen.gameLoadingStarted, {
                            now: Math.round(null === (t = null === (e = window.performance) || void 0 === e ? void 0 : e.now) || void 0 === t ? void 0 : t.call(e)) || void 0
                        })
                    }, this.gameLoadingFinished = function() {
                        var e, t, i, r, a;
                        try {
                            i = performance.getEntriesByType("resource").map((function(e) {
                                return e.transferSize
                            })).reduce((function(e, t) {
                                return e + t
                            })), i += performance.getEntriesByType("navigation")[0].transferSize
                        } catch (e) {}
                        dt.track(n.tracking.screen.gameLoadingFinished, {
                            transferSize: i,
                            trackers: (r = window, a = [], "function" != typeof r.ga, r.mixpanel && "function" == typeof r.mixpanel.track && a.push("mixpanel"), r.Countly && a.push("countly"), r.amplitude && a.push("amplitude"), a).join(","),
                            now: Math.round(null === (t = null === (e = window.performance) || void 0 === e ? void 0 : e.now) || void 0 === t ? void 0 : t.call(e)) || void 0
                        })
                    }, this.gameplayStart = function(e) {
                        t.gameplayStartCounter++, t.duringGameplay = !0, t.gameStarted || (t.gameStarted = !0, dt.track(n.tracking.screen.firstRound), t.SDK.startStartAdsAfterTimer()), dt.track(n.tracking.screen.gameplayStart, ht(ht({}, e), {
                            playId: t.gameplayStartCounter
                        }))
                    }, this.gameInteractive = function() {
                        dt.track(n.tracking.screen.gameInteractive)
                    }, this.gameplayStop = function(e) {
                        t.gameplayStopCounter++, t.duringGameplay = !1, dt.track(n.tracking.screen.gameplayStop, ht(ht({}, e), {
                            playId: t.gameplayStartCounter,
                            stopId: t.gameplayStopCounter
                        }))
                    }, this.roundStart = function(e) {
                        void 0 === e && (e = ""), e = String(e), dt.track(n.tracking.screen.roundStart, {
                            identifier: e
                        })
                    }, this.roundEnd = function(e) {
                        void 0 === e && (e = ""), e = String(e), dt.track(n.tracking.screen.roundEnd, {
                            identifier: e
                        })
                    }, this.customEvent = function(e, i, r) {
                        void 0 === r && (r = {}), e && i ? (e = String(e), i = String(i), r = ht({}, r), dt.track(n.tracking.custom, {
                            eventNoun: e,
                            eventVerb: i,
                            eventData: r
                        })) : t.error("customEvent", "customEvent needs at least a noun and a verb")
                    }, this.commercialBreak = function(e) {
                        return new Promise((function(i) {
                            var r = t.gameStarted ? n.ads.position.midroll : n.ads.position.preroll;
                            o.clearAnnotations(), o.setDataAnnotations({
                                opportunityId: Ke(),
                                position: r
                            }), dt.track(n.tracking.screen.commercialBreak), t.SDK.requestAd({
                                position: r,
                                onFinish: i,
                                onStart: e
                            })
                        }))
                    }, this.rewardedBreak = function(e) {
                        return new Promise((function(i) {
                            var r = n.ads.position.rewarded;
                            o.clearAnnotations(), o.setDataAnnotations({
                                opportunityId: Ke(),
                                position: r
                            }), dt.track(n.tracking.screen.rewardedBreak), t.SDK.requestAd({
                                position: r,
                                onFinish: function(e) {
                                    e.length > 0 ? i(e[0].rewardAllowed) : i(!1)
                                },
                                onStart: e
                            })
                        }))
                    }, this.happyTime = function(e) {
                        void 0 === e && (e = 1), ((e = Number(e)) < 0 || e > 1) && (e = Math.max(0, Math.min(1, e)), t.warning("happyTime", "Intensity should be a value between 0 and 1, adjusted to " + e)), dt.track(n.tracking.screen.happyTime, {
                            intensity: e
                        })
                    }, this.muteAd = function() {
                        t.SDK.muteAd()
                    }, this.setPlayerAge = function(e) {
                        e && t.SDK.setPlayerAge(e)
                    }, this.togglePlayerAdvertisingConsent = function(e) {
                        dt.track(n.tracking.togglePlayerAdvertisingConsent, {
                            didConsent: e
                        }), t.SDK.togglePlayerAdvertisingConsent(e), rt.sendMessage(n.message.toggleProgrammaticAds, {
                            enabled: t.SDK.getProgrammaticAdsEnabled()
                        })
                    }, this.displayAd = function(e, i) {
                        o.clearAnnotations();
                        var r = Ke();
                        dt.track(n.tracking.screen.displayAd, {
                            size: i,
                            opportunityId: r,
                            duringGameplay: t.duringGameplay
                        }), t.SDK.displayAd(e, i, r, (function() {
                            return t.duringGameplay
                        }))
                    }, this.logError = function(t) {
                        At(t) ? e.report(t) : ut({
                            name: "logError",
                            message: JSON.stringify(t)
                        })
                    }, this.sendHighscore = function() {}, this.setDebugTouchOverlayController = function(e) {
                        t.SDK.debugTouchOverlayController = e
                    }, this.getLeaderboard = function() {
                        return Promise.resolve([])
                    }, this.getIsoLanguage = function() {
                        return _("iso_lang")
                    }, this.warning = function(e, t) {
                        console.warn("PokiSDK." + e + ": " + t)
                    }, this.error = function(e, t) {
                        console.error("PokiSDK." + e + ": " + t)
                    }
                }
                return t.prototype.setDebug = function(e) {
                    void 0 === e && (e = !0), this.SDK.setDebug(e)
                }, t.prototype.disableProgrammatic = function() {
                    this.SDK.disableProgrammatic()
                }, t.prototype.toggleNonPersonalized = function(e) {
                    void 0 === e && (e = !1), this.SDK.toggleNonPersonalized(e)
                }, t.prototype.setConsentString = function(e) {
                    this.SDK.setConsentString(e)
                }, t.prototype.destroyAd = function(e) {
                    this.SDK.destroyAd(e)
                }, t.prototype.setVolume = function(e) {
                    this.SDK.setVolume(e)
                }, t
            }();
        var gt = new mt;
        for (var vt in gt) window.PokiSDK[vt] = gt[vt]
    })()
})();