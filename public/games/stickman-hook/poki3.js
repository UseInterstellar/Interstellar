! function(e) {
    var n = {};

    function t(o) {
        if (n[o]) return n[o].exports;
        var r = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }
    t.m = e, t.c = n, t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: o
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, n) {
        if (1 & n && (e = t(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (t.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var r in e) t.d(o, r, function(n) {
                return e[n]
            }.bind(null, r));
        return o
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, t.p = "", t(t.s = 68)
}({
    68: function(e, n, t) {
        var o = new(function() {
            function e() {
                var e = this;
                this.queue = [], this.init = function(n) {
                    return void 0 === n && (n = {}), new Promise((function(t, o) {
                        e.enqueue("init", n, t, o)
                    }))
                }, this.rewardedBreak = function() {
                    return new Promise((function(e) {
                        e(!1)
                    }))
                }, this.noArguments = function(n) {
                    return function() {
                        e.enqueue(n)
                    }
                }, this.oneArgument = function(n) {
                    return function(t) {
                        e.enqueue(n, t)
                    }
                }, this.handleAutoResolvePromise = function() {
                    return new Promise((function(e) {
                        e()
                    }))
                }, this.handleAutoResolvePromiseObj = function() {
                    return new Promise((function(e) {
                        e()
                    }))
                }, this.throwNotLoaded = function() {
                    console.debug("PokiSDK is not loaded yet. Not all methods are available.")
                }
            }
            return e.prototype.enqueue = function(e, n, t, o) {
                var r = {
                    fn: e,
                    options: n,
                    resolveFn: t,
                    rejectFn: o
                };
                this.queue.push(r)
            }, e.prototype.dequeue = function() {
                for (var e = function() {
                        var e = n.queue.shift(),
                            t = e,
                            o = t.fn,
                            r = t.options;
                        "function" == typeof window.PokiSDK[o] ? (null == e ? void 0 : e.resolveFn) || (null == e ? void 0 : e.rejectFn) ? window.PokiSDK[o](r).then((function() {
                            for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
                            "function" == typeof e.resolveFn && e.resolveFn.apply(e, n)
                        })).catch((function() {
                            for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
                            "function" == typeof e.rejectFn && e.rejectFn.apply(e, n)
                        })) : void 0 !== (null == e ? void 0 : e.fn) && window.PokiSDK[o](r) : console.error("Cannot execute " + e.fn)
                    }, n = this; this.queue.length > 0;) e()
            }, e
        }());
        window.PokiSDK = {
            init: o.init,
            initWithVideoHB: o.init,
            customEvent: o.throwNotLoaded,
            commercialBreak: o.handleAutoResolvePromise,
            rewardedBreak: o.rewardedBreak,
            displayAd: o.throwNotLoaded,
            destroyAd: o.throwNotLoaded,
            getLeaderboard: o.handleAutoResolvePromiseObj
        }, ["disableProgrammatic", "gameLoadingStart", "gameLoadingFinished", "gameInteractive", "roundStart", "roundEnd", "muteAd"].forEach((function(e) {
            window.PokiSDK[e] = o.noArguments(e)
        })), ["setDebug", "gameplayStart", "gameplayStop", "gameLoadingProgress", "happyTime", "setPlayerAge", "togglePlayerAdvertisingConsent", "toggleNonPersonalized", "setConsentString", "logError", "sendHighscore", "setDebugTouchOverlayController"].forEach((function(e) {
            window.PokiSDK[e] = o.oneArgument(e)
        }));
        var r = function() {
                var e, n = window.pokiSDKVersion;
                n || (n = (e = RegExp("[?&]" + "ab" + "=([^&]*)").exec(window.location.search)) && decodeURIComponent(e[1].replace(/\+/g, " ")) || "v2");
                return "./poki2.js"
            }(),
            i = document.createElement("script");
        i.setAttribute("src", r), i.setAttribute("type", "text/javascript"), i.onload = function() {
            return o.dequeue()
        }, document.head.appendChild(i)
    }
});