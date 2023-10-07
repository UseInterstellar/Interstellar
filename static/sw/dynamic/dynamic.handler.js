(() => {
    var e = {
            206: function(e) {
                var t, i;

                function r(e) {
                    var n;
                    return (i[e] || (n = i[e] = {
                        i: e,
                        l: !1,
                        exports: {}
                    }, t[e].call(n.exports, n, n.exports, r), n.l = !0, n)).exports
                }
                e.exports = (t = {
                    17: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t.default = void 0;
                        var r = i(18);

                        function n() {}
                        n.getFirstMatch = function(e, t) {
                            return (e = t.match(e)) && 0 < e.length && e[1] || ""
                        }, n.getSecondMatch = function(e, t) {
                            return (e = t.match(e)) && 1 < e.length && e[2] || ""
                        }, n.matchAndReturnConst = function(e, t, i) {
                            if (e.test(t)) return i
                        }, n.getWindowsVersionName = function(e) {
                            switch (e) {
                                case "NT":
                                    return "NT";
                                case "XP":
                                case "NT 5.1":
                                    return "XP";
                                case "NT 5.0":
                                    return "2000";
                                case "NT 5.2":
                                    return "2003";
                                case "NT 6.0":
                                    return "Vista";
                                case "NT 6.1":
                                    return "7";
                                case "NT 6.2":
                                    return "8";
                                case "NT 6.3":
                                    return "8.1";
                                case "NT 10.0":
                                    return "10";
                                default:
                                    return
                            }
                        }, n.getMacOSVersionName = function(e) {
                            if ((e = e.split(".").splice(0, 2).map(function(e) {
                                    return parseInt(e, 10) || 0
                                })).push(0), 10 === e[0]) switch (e[1]) {
                                case 5:
                                    return "Leopard";
                                case 6:
                                    return "Snow Leopard";
                                case 7:
                                    return "Lion";
                                case 8:
                                    return "Mountain Lion";
                                case 9:
                                    return "Mavericks";
                                case 10:
                                    return "Yosemite";
                                case 11:
                                    return "El Capitan";
                                case 12:
                                    return "Sierra";
                                case 13:
                                    return "High Sierra";
                                case 14:
                                    return "Mojave";
                                case 15:
                                    return "Catalina";
                                default:
                                    return
                            }
                        }, n.getAndroidVersionName = function(e) {
                            if ((e = e.split(".").splice(0, 2).map(function(e) {
                                    return parseInt(e, 10) || 0
                                })).push(0), !(1 === e[0] && e[1] < 5)) return 1 === e[0] && e[1] < 6 ? "Cupcake" : 1 === e[0] && 6 <= e[1] ? "Donut" : 2 === e[0] && e[1] < 2 ? "Eclair" : 2 === e[0] && 2 === e[1] ? "Froyo" : 2 === e[0] && 2 < e[1] ? "Gingerbread" : 3 === e[0] ? "Honeycomb" : 4 === e[0] && e[1] < 1 ? "Ice Cream Sandwich" : 4 === e[0] && e[1] < 4 ? "Jelly Bean" : 4 === e[0] && 4 <= e[1] ? "KitKat" : 5 === e[0] ? "Lollipop" : 6 === e[0] ? "Marshmallow" : 7 === e[0] ? "Nougat" : 8 === e[0] ? "Oreo" : 9 === e[0] ? "Pie" : void 0
                        }, n.getVersionPrecision = function(e) {
                            return e.split(".").length
                        }, n.compareVersions = function(e, t, i) {
                            void 0 === i && (i = !1);
                            var r = n.getVersionPrecision(e),
                                s = n.getVersionPrecision(t),
                                a = Math.max(r, s),
                                o = 0,
                                c = n.map([e, t], function(e) {
                                    var t = a - n.getVersionPrecision(e),
                                        e = e + Array(1 + t).join(".0");
                                    return n.map(e.split("."), function(e) {
                                        return Array(20 - e.length).join("0") + e
                                    }).reverse()
                                });
                            for (i && (o = a - Math.min(r, s)), --a; o <= a;) {
                                if (c[0][a] > c[1][a]) return 1;
                                if (c[0][a] === c[1][a]) {
                                    if (a === o) return 0;
                                    --a
                                } else if (c[0][a] < c[1][a]) return -1
                            }
                        }, n.map = function(e, t) {
                            var i, r = [];
                            if (Array.prototype.map) return Array.prototype.map.call(e, t);
                            for (i = 0; i < e.length; i += 1) r.push(t(e[i]));
                            return r
                        }, n.find = function(e, t) {
                            var i, r;
                            if (Array.prototype.find) return Array.prototype.find.call(e, t);
                            for (i = 0, r = e.length; i < r; i += 1) {
                                var n = e[i];
                                if (t(n, i)) return n
                            }
                        }, n.assign = function(e) {
                            for (var t = arguments.length, i = Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) i[r - 1] = arguments[r];
                            if (Object.assign) return Object.assign.apply(Object, [e].concat(i));
                            for (var n = 0, s = i.length; n < s; n += 1) ! function() {
                                var t = i[n];
                                "object" == typeof t && null !== t && Object.keys(t).forEach(function(i) {
                                    e[i] = t[i]
                                })
                            }();
                            return e
                        }, n.getBrowserAlias = function(e) {
                            return r.BROWSER_ALIASES_MAP[e]
                        }, n.getBrowserTypeByAlias = function(e) {
                            return r.BROWSER_MAP[e] || ""
                        }, t.default = n, e.exports = t.default
                    },
                    18: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t.ENGINE_MAP = t.OS_MAP = t.PLATFORMS_MAP = t.BROWSER_MAP = t.BROWSER_ALIASES_MAP = void 0, t.BROWSER_ALIASES_MAP = {
                            "Amazon Silk": "amazon_silk",
                            "Android Browser": "android",
                            Bada: "bada",
                            BlackBerry: "blackberry",
                            Chrome: "chrome",
                            Chromium: "chromium",
                            Electron: "electron",
                            Epiphany: "epiphany",
                            Firefox: "firefox",
                            Focus: "focus",
                            Generic: "generic",
                            "Google Search": "google_search",
                            Googlebot: "googlebot",
                            "Internet Explorer": "ie",
                            "K-Meleon": "k_meleon",
                            Maxthon: "maxthon",
                            "Microsoft Edge": "edge",
                            "MZ Browser": "mz",
                            "NAVER Whale Browser": "naver",
                            Opera: "opera",
                            "Opera Coast": "opera_coast",
                            PhantomJS: "phantomjs",
                            Puffin: "puffin",
                            QupZilla: "qupzilla",
                            QQ: "qq",
                            QQLite: "qqlite",
                            Safari: "safari",
                            Sailfish: "sailfish",
                            "Samsung Internet for Android": "samsung_internet",
                            SeaMonkey: "seamonkey",
                            Sleipnir: "sleipnir",
                            Swing: "swing",
                            Tizen: "tizen",
                            "UC Browser": "uc",
                            Vivaldi: "vivaldi",
                            "WebOS Browser": "webos",
                            WeChat: "wechat",
                            "Yandex Browser": "yandex",
                            Roku: "roku"
                        }, t.BROWSER_MAP = {
                            amazon_silk: "Amazon Silk",
                            android: "Android Browser",
                            bada: "Bada",
                            blackberry: "BlackBerry",
                            chrome: "Chrome",
                            chromium: "Chromium",
                            electron: "Electron",
                            epiphany: "Epiphany",
                            firefox: "Firefox",
                            focus: "Focus",
                            generic: "Generic",
                            googlebot: "Googlebot",
                            google_search: "Google Search",
                            ie: "Internet Explorer",
                            k_meleon: "K-Meleon",
                            maxthon: "Maxthon",
                            edge: "Microsoft Edge",
                            mz: "MZ Browser",
                            naver: "NAVER Whale Browser",
                            opera: "Opera",
                            opera_coast: "Opera Coast",
                            phantomjs: "PhantomJS",
                            puffin: "Puffin",
                            qupzilla: "QupZilla",
                            qq: "QQ Browser",
                            qqlite: "QQ Browser Lite",
                            safari: "Safari",
                            sailfish: "Sailfish",
                            samsung_internet: "Samsung Internet for Android",
                            seamonkey: "SeaMonkey",
                            sleipnir: "Sleipnir",
                            swing: "Swing",
                            tizen: "Tizen",
                            uc: "UC Browser",
                            vivaldi: "Vivaldi",
                            webos: "WebOS Browser",
                            wechat: "WeChat",
                            yandex: "Yandex Browser"
                        }, t.PLATFORMS_MAP = {
                            tablet: "tablet",
                            mobile: "mobile",
                            desktop: "desktop",
                            tv: "tv"
                        }, t.OS_MAP = {
                            WindowsPhone: "Windows Phone",
                            Windows: "Windows",
                            MacOS: "macOS",
                            iOS: "iOS",
                            Android: "Android",
                            WebOS: "WebOS",
                            BlackBerry: "BlackBerry",
                            Bada: "Bada",
                            Tizen: "Tizen",
                            Linux: "Linux",
                            ChromeOS: "Chrome OS",
                            PlayStation4: "PlayStation 4",
                            Roku: "Roku"
                        }, t.ENGINE_MAP = {
                            EdgeHTML: "EdgeHTML",
                            Blink: "Blink",
                            Trident: "Trident",
                            Presto: "Presto",
                            Gecko: "Gecko",
                            WebKit: "WebKit"
                        }
                    },
                    90: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t.default = void 0;
                        var r, n = (r = i(91)) && r.__esModule ? r : {
                                default: r
                            },
                            s = i(18);

                        function a() {}
                        a.getParser = function(e, t) {
                                if (void 0 === t && (t = !1), "string" != typeof e) throw Error("UserAgent should be a string");
                                return new n.default(e, t)
                            }, a.parse = function(e) {
                                return new n.default(e).getResult()
                            },
                            function(e, t) {
                                for (var i = 0; i < t.length; i++) {
                                    var r = t[i];
                                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                                }
                            }(r = a, i = [{
                                key: "BROWSER_MAP",
                                get: function() {
                                    return s.BROWSER_MAP
                                }
                            }, {
                                key: "ENGINE_MAP",
                                get: function() {
                                    return s.ENGINE_MAP
                                }
                            }, {
                                key: "OS_MAP",
                                get: function() {
                                    return s.OS_MAP
                                }
                            }, {
                                key: "PLATFORMS_MAP",
                                get: function() {
                                    return s.PLATFORMS_MAP
                                }
                            }]), t.default = a, e.exports = t.default
                    },
                    91: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t.default = void 0;
                        var r = c(i(92)),
                            n = c(i(93)),
                            s = c(i(94)),
                            a = c(i(95)),
                            o = c(i(17));

                        function c(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            }
                        }

                        function l(e, t) {
                            if (void 0 === t && (t = !1), null == e || "" === e) throw Error("UserAgent parameter can't be empty");
                            this._ua = e, this.parsedResult = {}, !0 !== t && this.parse()
                        }(i = l.prototype).getUA = function() {
                            return this._ua
                        }, i.test = function(e) {
                            return e.test(this._ua)
                        }, i.parseBrowser = function() {
                            var e = this,
                                t = (this.parsedResult.browser = {}, o.default.find(r.default, function(t) {
                                    if ("function" == typeof t.test) return t.test(e);
                                    if (t.test instanceof Array) return t.test.some(function(t) {
                                        return e.test(t)
                                    });
                                    throw Error("Browser's test function is not valid")
                                }));
                            return t && (this.parsedResult.browser = t.describe(this.getUA())), this.parsedResult.browser
                        }, i.getBrowser = function() {
                            return this.parsedResult.browser || this.parseBrowser()
                        }, i.getBrowserName = function(e) {
                            return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || ""
                        }, i.getBrowserVersion = function() {
                            return this.getBrowser().version
                        }, i.getOS = function() {
                            return this.parsedResult.os || this.parseOS()
                        }, i.parseOS = function() {
                            var e = this,
                                t = (this.parsedResult.os = {}, o.default.find(n.default, function(t) {
                                    if ("function" == typeof t.test) return t.test(e);
                                    if (t.test instanceof Array) return t.test.some(function(t) {
                                        return e.test(t)
                                    });
                                    throw Error("Browser's test function is not valid")
                                }));
                            return t && (this.parsedResult.os = t.describe(this.getUA())), this.parsedResult.os
                        }, i.getOSName = function(e) {
                            var t = this.getOS().name;
                            return e ? String(t).toLowerCase() || "" : t || ""
                        }, i.getOSVersion = function() {
                            return this.getOS().version
                        }, i.getPlatform = function() {
                            return this.parsedResult.platform || this.parsePlatform()
                        }, i.getPlatformType = function(e) {
                            void 0 === e && (e = !1);
                            var t = this.getPlatform().type;
                            return e ? String(t).toLowerCase() || "" : t || ""
                        }, i.parsePlatform = function() {
                            var e = this,
                                t = (this.parsedResult.platform = {}, o.default.find(s.default, function(t) {
                                    if ("function" == typeof t.test) return t.test(e);
                                    if (t.test instanceof Array) return t.test.some(function(t) {
                                        return e.test(t)
                                    });
                                    throw Error("Browser's test function is not valid")
                                }));
                            return t && (this.parsedResult.platform = t.describe(this.getUA())), this.parsedResult.platform
                        }, i.getEngine = function() {
                            return this.parsedResult.engine || this.parseEngine()
                        }, i.getEngineName = function(e) {
                            return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || ""
                        }, i.parseEngine = function() {
                            var e = this,
                                t = (this.parsedResult.engine = {}, o.default.find(a.default, function(t) {
                                    if ("function" == typeof t.test) return t.test(e);
                                    if (t.test instanceof Array) return t.test.some(function(t) {
                                        return e.test(t)
                                    });
                                    throw Error("Browser's test function is not valid")
                                }));
                            return t && (this.parsedResult.engine = t.describe(this.getUA())), this.parsedResult.engine
                        }, i.parse = function() {
                            return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this
                        }, i.getResult = function() {
                            return o.default.assign({}, this.parsedResult)
                        }, i.satisfies = function(e) {
                            var t = this,
                                i = {},
                                r = 0,
                                n = {},
                                s = 0;
                            if (Object.keys(e).forEach(function(t) {
                                    var a = e[t];
                                    "string" == typeof a ? (n[t] = a, s += 1) : "object" == typeof a && (i[t] = a, r += 1)
                                }), 0 < r) {
                                var a = Object.keys(i),
                                    c = o.default.find(a, function(e) {
                                        return t.isOS(e)
                                    });
                                if (c && void 0 !== (c = this.satisfies(i[c]))) return c;
                                if ((c = o.default.find(a, function(e) {
                                        return t.isPlatform(e)
                                    })) && void 0 !== (a = this.satisfies(i[c]))) return a
                            }
                            if (0 < s && (c = Object.keys(n), void 0 !== (a = o.default.find(c, function(e) {
                                    return t.isBrowser(e, !0)
                                })))) return this.compareVersion(n[a])
                        }, i.isBrowser = function(e, t) {
                            void 0 === t && (t = !1);
                            var i = this.getBrowserName().toLowerCase(),
                                e = e.toLowerCase(),
                                r = o.default.getBrowserTypeByAlias(e);
                            return (e = t && r ? r.toLowerCase() : e) === i
                        }, i.compareVersion = function(e) {
                            var t = [0],
                                i = e,
                                r = !1,
                                n = this.getBrowserVersion();
                            if ("string" == typeof n) return ">" === e[0] || "<" === e[0] ? (i = e.substr(1), "=" === e[1] ? (r = !0, i = e.substr(2)) : t = [], ">" === e[0] ? t.push(1) : t.push(-1)) : "=" === e[0] ? i = e.substr(1) : "~" === e[0] && (r = !0, i = e.substr(1)), -1 < t.indexOf(o.default.compareVersions(n, i, r))
                        }, i.isOS = function(e) {
                            return this.getOSName(!0) === String(e).toLowerCase()
                        }, i.isPlatform = function(e) {
                            return this.getPlatformType(!0) === String(e).toLowerCase()
                        }, i.isEngine = function(e) {
                            return this.getEngineName(!0) === String(e).toLowerCase()
                        }, i.is = function(e, t) {
                            return this.isBrowser(e, t = void 0 !== t && t) || this.isOS(e) || this.isPlatform(e)
                        }, i.some = function(e) {
                            var t = this;
                            return (e = void 0 === e ? [] : e).some(function(e) {
                                return t.is(e)
                            })
                        }, t.default = l, e.exports = t.default
                    },
                    92: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t.default = void 0;
                        var r = (i = i(17)) && i.__esModule ? i : {
                                default: i
                            },
                            n = /version\/(\d+(\.?_?\d+)+)/i;
                        t.default = [{
                            test: [/googlebot/i],
                            describe: function(e) {
                                var t = {
                                        name: "Googlebot"
                                    },
                                    e = r.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/opera/i],
                            describe: function(e) {
                                var t = {
                                        name: "Opera"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/opr\/|opios/i],
                            describe: function(e) {
                                var t = {
                                        name: "Opera"
                                    },
                                    e = r.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/SamsungBrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: "Samsung Internet for Android"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/Whale/i],
                            describe: function(e) {
                                var t = {
                                        name: "NAVER Whale Browser"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/MZBrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: "MZ Browser"
                                    },
                                    e = r.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/focus/i],
                            describe: function(e) {
                                var t = {
                                        name: "Focus"
                                    },
                                    e = r.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/swing/i],
                            describe: function(e) {
                                var t = {
                                        name: "Swing"
                                    },
                                    e = r.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/coast/i],
                            describe: function(e) {
                                var t = {
                                        name: "Opera Coast"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/opt\/\d+(?:.?_?\d+)+/i],
                            describe: function(e) {
                                var t = {
                                        name: "Opera Touch"
                                    },
                                    e = r.default.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/yabrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: "Yandex Browser"
                                    },
                                    e = r.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/ucbrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: "UC Browser"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/Maxthon|mxios/i],
                            describe: function(e) {
                                var t = {
                                        name: "Maxthon"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/epiphany/i],
                            describe: function(e) {
                                var t = {
                                        name: "Epiphany"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/puffin/i],
                            describe: function(e) {
                                var t = {
                                        name: "Puffin"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/sleipnir/i],
                            describe: function(e) {
                                var t = {
                                        name: "Sleipnir"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/k-meleon/i],
                            describe: function(e) {
                                var t = {
                                        name: "K-Meleon"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/micromessenger/i],
                            describe: function(e) {
                                var t = {
                                        name: "WeChat"
                                    },
                                    e = r.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/qqbrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
                                    },
                                    e = r.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/msie|trident/i],
                            describe: function(e) {
                                var t = {
                                        name: "Internet Explorer"
                                    },
                                    e = r.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/\sedg\//i],
                            describe: function(e) {
                                var t = {
                                        name: "Microsoft Edge"
                                    },
                                    e = r.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/edg([ea]|ios)/i],
                            describe: function(e) {
                                var t = {
                                        name: "Microsoft Edge"
                                    },
                                    e = r.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/vivaldi/i],
                            describe: function(e) {
                                var t = {
                                        name: "Vivaldi"
                                    },
                                    e = r.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/seamonkey/i],
                            describe: function(e) {
                                var t = {
                                        name: "SeaMonkey"
                                    },
                                    e = r.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/sailfish/i],
                            describe: function(e) {
                                var t = {
                                        name: "Sailfish"
                                    },
                                    e = r.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/silk/i],
                            describe: function(e) {
                                var t = {
                                        name: "Amazon Silk"
                                    },
                                    e = r.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/phantom/i],
                            describe: function(e) {
                                var t = {
                                        name: "PhantomJS"
                                    },
                                    e = r.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/slimerjs/i],
                            describe: function(e) {
                                var t = {
                                        name: "SlimerJS"
                                    },
                                    e = r.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                            describe: function(e) {
                                var t = {
                                        name: "BlackBerry"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/(web|hpw)[o0]s/i],
                            describe: function(e) {
                                var t = {
                                        name: "WebOS Browser"
                                    },
                                    e = r.default.getFirstMatch(n, e) || r.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/bada/i],
                            describe: function(e) {
                                var t = {
                                        name: "Bada"
                                    },
                                    e = r.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/tizen/i],
                            describe: function(e) {
                                var t = {
                                        name: "Tizen"
                                    },
                                    e = r.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/qupzilla/i],
                            describe: function(e) {
                                var t = {
                                        name: "QupZilla"
                                    },
                                    e = r.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/firefox|iceweasel|fxios/i],
                            describe: function(e) {
                                var t = {
                                        name: "Firefox"
                                    },
                                    e = r.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/electron/i],
                            describe: function(e) {
                                var t = {
                                        name: "Electron"
                                    },
                                    e = r.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/MiuiBrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: "Miui"
                                    },
                                    e = r.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/chromium/i],
                            describe: function(e) {
                                var t = {
                                        name: "Chromium"
                                    },
                                    e = r.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/chrome|crios|crmo/i],
                            describe: function(e) {
                                var t = {
                                        name: "Chrome"
                                    },
                                    e = r.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/GSA/i],
                            describe: function(e) {
                                var t = {
                                        name: "Google Search"
                                    },
                                    e = r.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: function(e) {
                                var t = !e.test(/like android/i),
                                    e = e.test(/android/i);
                                return t && e
                            },
                            describe: function(e) {
                                var t = {
                                        name: "Android Browser"
                                    },
                                    e = r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/playstation 4/i],
                            describe: function(e) {
                                var t = {
                                        name: "PlayStation 4"
                                    },
                                    e = r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/safari|applewebkit/i],
                            describe: function(e) {
                                var t = {
                                        name: "Safari"
                                    },
                                    e = r.default.getFirstMatch(n, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/.*/i],
                            describe: function(e) {
                                var t = -1 !== e.search("\\(") ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
                                return {
                                    name: r.default.getFirstMatch(t, e),
                                    version: r.default.getSecondMatch(t, e)
                                }
                            }
                        }], e.exports = t.default
                    },
                    93: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t.default = void 0;
                        var r, n = (r = i(17)) && r.__esModule ? r : {
                                default: r
                            },
                            s = i(18);
                        t.default = [{
                            test: [/Roku\/DVP/],
                            describe: function(e) {
                                return e = n.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e), {
                                    name: s.OS_MAP.Roku,
                                    version: e
                                }
                            }
                        }, {
                            test: [/windows phone/i],
                            describe: function(e) {
                                return e = n.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e), {
                                    name: s.OS_MAP.WindowsPhone,
                                    version: e
                                }
                            }
                        }, {
                            test: [/windows /i],
                            describe: function(e) {
                                var e = n.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e),
                                    t = n.default.getWindowsVersionName(e);
                                return {
                                    name: s.OS_MAP.Windows,
                                    version: e,
                                    versionName: t
                                }
                            }
                        }, {
                            test: [/Macintosh(.*?) FxiOS(.*?)\//],
                            describe: function(e) {
                                var t = {
                                        name: s.OS_MAP.iOS
                                    },
                                    e = n.default.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/macintosh/i],
                            describe: function(e) {
                                var e = n.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."),
                                    t = n.default.getMacOSVersionName(e),
                                    e = {
                                        name: s.OS_MAP.MacOS,
                                        version: e
                                    };
                                return t && (e.versionName = t), e
                            }
                        }, {
                            test: [/(ipod|iphone|ipad)/i],
                            describe: function(e) {
                                return e = n.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, "."), {
                                    name: s.OS_MAP.iOS,
                                    version: e
                                }
                            }
                        }, {
                            test: function(e) {
                                var t = !e.test(/like android/i),
                                    e = e.test(/android/i);
                                return t && e
                            },
                            describe: function(e) {
                                var e = n.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e),
                                    t = n.default.getAndroidVersionName(e),
                                    e = {
                                        name: s.OS_MAP.Android,
                                        version: e
                                    };
                                return t && (e.versionName = t), e
                            }
                        }, {
                            test: [/(web|hpw)[o0]s/i],
                            describe: function(e) {
                                var e = n.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e),
                                    t = {
                                        name: s.OS_MAP.WebOS
                                    };
                                return e && e.length && (t.version = e), t
                            }
                        }, {
                            test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                            describe: function(e) {
                                return e = n.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || n.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || n.default.getFirstMatch(/\bbb(\d+)/i, e), {
                                    name: s.OS_MAP.BlackBerry,
                                    version: e
                                }
                            }
                        }, {
                            test: [/bada/i],
                            describe: function(e) {
                                return e = n.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e), {
                                    name: s.OS_MAP.Bada,
                                    version: e
                                }
                            }
                        }, {
                            test: [/tizen/i],
                            describe: function(e) {
                                return e = n.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e), {
                                    name: s.OS_MAP.Tizen,
                                    version: e
                                }
                            }
                        }, {
                            test: [/linux/i],
                            describe: function() {
                                return {
                                    name: s.OS_MAP.Linux
                                }
                            }
                        }, {
                            test: [/CrOS/],
                            describe: function() {
                                return {
                                    name: s.OS_MAP.ChromeOS
                                }
                            }
                        }, {
                            test: [/PlayStation 4/],
                            describe: function(e) {
                                return e = n.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e), {
                                    name: s.OS_MAP.PlayStation4,
                                    version: e
                                }
                            }
                        }], e.exports = t.default
                    },
                    94: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t.default = void 0;
                        var r, n = (r = i(17)) && r.__esModule ? r : {
                                default: r
                            },
                            s = i(18);
                        t.default = [{
                            test: [/googlebot/i],
                            describe: function() {
                                return {
                                    type: "bot",
                                    vendor: "Google"
                                }
                            }
                        }, {
                            test: [/huawei/i],
                            describe: function(e) {
                                var e = n.default.getFirstMatch(/(can-l01)/i, e) && "Nova",
                                    t = {
                                        type: s.PLATFORMS_MAP.mobile,
                                        vendor: "Huawei"
                                    };
                                return e && (t.model = e), t
                            }
                        }, {
                            test: [/nexus\s*(?:7|8|9|10).*/i],
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.tablet,
                                    vendor: "Nexus"
                                }
                            }
                        }, {
                            test: [/ipad/i],
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.tablet,
                                    vendor: "Apple",
                                    model: "iPad"
                                }
                            }
                        }, {
                            test: [/Macintosh(.*?) FxiOS(.*?)\//],
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.tablet,
                                    vendor: "Apple",
                                    model: "iPad"
                                }
                            }
                        }, {
                            test: [/kftt build/i],
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.tablet,
                                    vendor: "Amazon",
                                    model: "Kindle Fire HD 7"
                                }
                            }
                        }, {
                            test: [/silk/i],
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.tablet,
                                    vendor: "Amazon"
                                }
                            }
                        }, {
                            test: [/tablet(?! pc)/i],
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.tablet
                                }
                            }
                        }, {
                            test: function(e) {
                                var t = e.test(/ipod|iphone/i),
                                    e = e.test(/like (ipod|iphone)/i);
                                return t && !e
                            },
                            describe: function(e) {
                                return e = n.default.getFirstMatch(/(ipod|iphone)/i, e), {
                                    type: s.PLATFORMS_MAP.mobile,
                                    vendor: "Apple",
                                    model: e
                                }
                            }
                        }, {
                            test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.mobile,
                                    vendor: "Nexus"
                                }
                            }
                        }, {
                            test: [/[^-]mobi/i],
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.mobile
                                }
                            }
                        }, {
                            test: function(e) {
                                return "blackberry" === e.getBrowserName(!0)
                            },
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.mobile,
                                    vendor: "BlackBerry"
                                }
                            }
                        }, {
                            test: function(e) {
                                return "bada" === e.getBrowserName(!0)
                            },
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.mobile
                                }
                            }
                        }, {
                            test: function(e) {
                                return "windows phone" === e.getBrowserName()
                            },
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.mobile,
                                    vendor: "Microsoft"
                                }
                            }
                        }, {
                            test: function(e) {
                                var t = Number(String(e.getOSVersion()).split(".")[0]);
                                return "android" === e.getOSName(!0) && 3 <= t
                            },
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.tablet
                                }
                            }
                        }, {
                            test: function(e) {
                                return "android" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.mobile
                                }
                            }
                        }, {
                            test: function(e) {
                                return "macos" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.desktop,
                                    vendor: "Apple"
                                }
                            }
                        }, {
                            test: function(e) {
                                return "windows" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.desktop
                                }
                            }
                        }, {
                            test: function(e) {
                                return "linux" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.desktop
                                }
                            }
                        }, {
                            test: function(e) {
                                return "playstation 4" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.tv
                                }
                            }
                        }, {
                            test: function(e) {
                                return "roku" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: s.PLATFORMS_MAP.tv
                                }
                            }
                        }], e.exports = t.default
                    },
                    95: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t.default = void 0;
                        var r, n = (r = i(17)) && r.__esModule ? r : {
                                default: r
                            },
                            s = i(18);
                        t.default = [{
                            test: function(e) {
                                return "microsoft edge" === e.getBrowserName(!0)
                            },
                            describe: function(e) {
                                return /\sedg\//i.test(e) ? {
                                    name: s.ENGINE_MAP.Blink
                                } : (e = n.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e), {
                                    name: s.ENGINE_MAP.EdgeHTML,
                                    version: e
                                })
                            }
                        }, {
                            test: [/trident/i],
                            describe: function(e) {
                                var t = {
                                        name: s.ENGINE_MAP.Trident
                                    },
                                    e = n.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: function(e) {
                                return e.test(/presto/i)
                            },
                            describe: function(e) {
                                var t = {
                                        name: s.ENGINE_MAP.Presto
                                    },
                                    e = n.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: function(e) {
                                var t = e.test(/gecko/i),
                                    e = e.test(/like gecko/i);
                                return t && !e
                            },
                            describe: function(e) {
                                var t = {
                                        name: s.ENGINE_MAP.Gecko
                                    },
                                    e = n.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/(apple)?webkit\/537\.36/i],
                            describe: function() {
                                return {
                                    name: s.ENGINE_MAP.Blink
                                }
                            }
                        }, {
                            test: [/(apple)?webkit/i],
                            describe: function(e) {
                                var t = {
                                        name: s.ENGINE_MAP.WebKit
                                    },
                                    e = n.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }], e.exports = t.default
                    }
                }, i = {}, r.m = t, r.c = i, r.d = function(e, t, i) {
                    r.o(e, t) || Object.defineProperty(e, t, {
                        enumerable: !0,
                        get: i
                    })
                }, r.r = function(e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }), Object.defineProperty(e, "__esModule", {
                        value: !0
                    })
                }, r.t = function(e, t) {
                    if (1 & t && (e = r(e)), 8 & t || 4 & t && "object" == typeof e && e && e.__esModule) return e;
                    var i = Object.create(null);
                    if (r.r(i), Object.defineProperty(i, "default", {
                            enumerable: !0,
                            value: e
                        }), 2 & t && "string" != typeof e)
                        for (var n in e) r.d(i, n, (function(t) {
                            return e[t]
                        }).bind(null, n));
                    return i
                }, r.n = function(e) {
                    var t = e && e.__esModule ? function() {
                        return e.default
                    } : function() {
                        return e
                    };
                    return r.d(t, "a", t), t
                }, r.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }, r.p = "", r(r.s = 90))
            },
            470: e => {
                "use strict";

                function t(e) {
                    if ("string" != typeof e) throw TypeError("Path must be a string. Received " + JSON.stringify(e))
                }

                function i(e, t) {
                    for (var i, r = "", n = 0, s = -1, a = 0, o = 0; o <= e.length; ++o) {
                        if (o < e.length) i = e.charCodeAt(o);
                        else {
                            if (47 === i) break;
                            i = 47
                        }
                        if (47 === i) {
                            if (s !== o - 1 && 1 !== a) {
                                if (s !== o - 1 && 2 === a) {
                                    if (r.length < 2 || 2 !== n || 46 !== r.charCodeAt(r.length - 1) || 46 !== r.charCodeAt(r.length - 2)) {
                                        if (2 < r.length) {
                                            var c = r.lastIndexOf("/");
                                            if (c !== r.length - 1) {
                                                n = -1 === c ? (r = "", 0) : (r = r.slice(0, c)).length - 1 - r.lastIndexOf("/"), s = o, a = 0;
                                                continue
                                            }
                                        } else if (2 === r.length || 1 === r.length) {
                                            r = "", s = o, a = n = 0;
                                            continue
                                        }
                                    }
                                    t && (0 < r.length ? r += "/.." : r = "..", n = 2)
                                } else 0 < r.length ? r += "/" + e.slice(s + 1, o) : r = e.slice(s + 1, o), n = o - s - 1
                            }
                            s = o, a = 0
                        } else 46 === i && -1 !== a ? ++a : a = -1
                    }
                    return r
                }
                var r = {
                    resolve: function() {
                        for (var e, r = "", n = !1, s = arguments.length - 1; - 1 <= s && !n; s--) {
                            var a = 0 <= s ? arguments[s] : e = void 0 === e ? process.cwd() : e;
                            t(a), 0 !== a.length && (r = a + "/" + r, n = 47 === a.charCodeAt(0))
                        }
                        return r = i(r, !n), n ? 0 < r.length ? "/" + r : "/" : 0 < r.length ? r : "."
                    },
                    normalize: function(e) {
                        var r, n;
                        return t(e), 0 === e.length ? "." : (r = 47 === e.charCodeAt(0), n = 47 === e.charCodeAt(e.length - 1), 0 < (e = 0 !== (e = i(e, !r)).length || r ? e : ".").length && n && (e += "/"), r ? "/" + e : e)
                    },
                    isAbsolute: function(e) {
                        return t(e), 0 < e.length && 47 === e.charCodeAt(0)
                    },
                    join: function() {
                        if (0 == arguments.length) return ".";
                        for (var e, i = 0; i < arguments.length; ++i) {
                            var n = arguments[i];
                            t(n), 0 < n.length && (void 0 === e ? e = n : e += "/" + n)
                        }
                        return void 0 === e ? "." : r.normalize(e)
                    },
                    relative: function(e, i) {
                        if (t(e), t(i), e === i || (e = r.resolve(e)) === (i = r.resolve(i))) return "";
                        for (var n = 1; n < e.length && 47 === e.charCodeAt(n); ++n);
                        for (var s = e.length, a = s - n, o = 1; o < i.length && 47 === i.charCodeAt(o); ++o);
                        for (var c = i.length - o, l = a < c ? a : c, p = -1, h = 0; h <= l; ++h) {
                            if (h === l) {
                                if (l < c) {
                                    if (47 === i.charCodeAt(o + h)) return i.slice(o + h + 1);
                                    if (0 === h) return i.slice(o + h)
                                } else l < a && (47 === e.charCodeAt(n + h) ? p = h : 0 === h && (p = 0));
                                break
                            }
                            var u = e.charCodeAt(n + h);
                            if (u !== i.charCodeAt(o + h)) break;
                            47 === u && (p = h)
                        }
                        for (var d = "", h = n + p + 1; h <= s; ++h) h !== s && 47 !== e.charCodeAt(h) || (0 === d.length ? d += ".." : d += "/..");
                        return 0 < d.length ? d + i.slice(o + p) : (47 === i.charCodeAt(o += p) && ++o, i.slice(o))
                    },
                    _makeLong: function(e) {
                        return e
                    },
                    dirname: function(e) {
                        if (t(e), 0 === e.length) return ".";
                        for (var i = 47 === e.charCodeAt(0), r = -1, n = !0, s = e.length - 1; 1 <= s; --s)
                            if (47 === e.charCodeAt(s)) {
                                if (!n) {
                                    r = s;
                                    break
                                }
                            } else n = !1;
                        return -1 === r ? i ? "/" : "." : i && 1 === r ? "//" : e.slice(0, r)
                    },
                    basename: function(e, i) {
                        if (void 0 !== i && "string" != typeof i) throw TypeError('"ext" argument must be a string');
                        t(e);
                        var r = 0,
                            n = -1,
                            s = !0;
                        if (void 0 !== i && 0 < i.length && i.length <= e.length) {
                            if (i.length === e.length && i === e) return "";
                            for (var a = i.length - 1, o = -1, c = e.length - 1; 0 <= c; --c) {
                                var l = e.charCodeAt(c);
                                if (47 === l) {
                                    if (!s) {
                                        r = c + 1;
                                        break
                                    }
                                } else - 1 === o && (s = !1, o = c + 1), 0 <= a && (l === i.charCodeAt(a) ? -1 == --a && (n = c) : (a = -1, n = o))
                            }
                            return r === n ? n = o : -1 === n && (n = e.length), e.slice(r, n)
                        }
                        for (c = e.length - 1; 0 <= c; --c)
                            if (47 === e.charCodeAt(c)) {
                                if (!s) {
                                    r = c + 1;
                                    break
                                }
                            } else - 1 === n && (s = !1, n = c + 1);
                        return -1 === n ? "" : e.slice(r, n)
                    },
                    extname: function(e) {
                        t(e);
                        for (var i = -1, r = 0, n = -1, s = !0, a = 0, o = e.length - 1; 0 <= o; --o) {
                            var c = e.charCodeAt(o);
                            if (47 === c) {
                                if (s) continue;
                                r = o + 1;
                                break
                            } - 1 === n && (s = !1, n = o + 1), 46 === c ? -1 === i ? i = o : 1 !== a && (a = 1) : -1 !== i && (a = -1)
                        }
                        return -1 === i || -1 === n || 0 === a || 1 === a && i === n - 1 && i === r + 1 ? "" : e.slice(i, n)
                    },
                    format: function(e) {
                        var t, i;
                        if (null === e || "object" != typeof e) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
                        return t = e.dir || e.root, i = e.base || (e.name || "") + (e.ext || ""), t ? t === e.root ? t + i : t + "/" + i : i
                    },
                    parse: function(e) {
                        t(e);
                        var i = {
                            root: "",
                            dir: "",
                            base: "",
                            ext: "",
                            name: ""
                        };
                        if (0 !== e.length) {
                            for (var r, n = 47 === e.charCodeAt(0), s = n ? (i.root = "/", 1) : 0, a = -1, o = 0, c = -1, l = !0, p = e.length - 1, h = 0; s <= p; --p) {
                                if (47 === (r = e.charCodeAt(p))) {
                                    if (l) continue;
                                    o = p + 1;
                                    break
                                } - 1 === c && (l = !1, c = p + 1), 46 === r ? -1 === a ? a = p : 1 !== h && (h = 1) : -1 !== a && (h = -1)
                            } - 1 === a || -1 === c || 0 === h || 1 === h && a === c - 1 && a === o + 1 ? -1 !== c && (i.base = i.name = 0 === o && n ? e.slice(1, c) : e.slice(o, c)) : (0 === o && n ? (i.name = e.slice(1, a), i.base = e.slice(1, c)) : (i.name = e.slice(o, a), i.base = e.slice(o, c)), i.ext = e.slice(a, c)), 0 < o ? i.dir = e.slice(0, o - 1) : n && (i.dir = "/")
                        }
                        return i
                    },
                    sep: "/",
                    delimiter: ":",
                    win32: null,
                    posix: null
                };
                r.posix = r, e.exports = r
            },
            328: e => {
                "use strict";
                var t = {
                    decodeValues: !0,
                    map: !1,
                    silent: !1
                };

                function i(e) {
                    return "string" == typeof e && !!e.trim()
                }

                function r(e, r) {
                    var n, s, a, o, e = e.split(";").filter(i),
                        c = (n = e.shift(), s = "", a = "", a = 1 < (o = n.split("=")).length ? (s = o.shift(), o.join("=")) : n, {
                            name: s,
                            value: a
                        }),
                        l = c.name,
                        c = c.value;
                    r = r ? Object.assign({}, t, r) : t;
                    try {
                        c = r.decodeValues ? decodeURIComponent(c) : c
                    } catch (e) {
                        console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + c + "'. Set options.decodeValues to false to disable this feature.", e)
                    }
                    var p = {
                        name: l,
                        value: c
                    };
                    return e.forEach(function(e) {
                        var e = e.split("="),
                            t = e.shift().trimLeft().toLowerCase(),
                            e = e.join("=");
                        "expires" === t ? p.expires = new Date(e) : "max-age" === t ? p.maxAge = parseInt(e, 10) : "secure" === t ? p.secure = !0 : "httponly" === t ? p.httpOnly = !0 : "samesite" === t ? p.sameSite = e : p[t] = e
                    }), p
                }

                function n(e, n) {
                    var s;
                    return n = n ? Object.assign({}, t, n) : t, e ? (e.headers && (e = "function" == typeof e.headers.getSetCookie ? e.headers.getSetCookie() : e.headers["set-cookie"] || ((s = e.headers[Object.keys(e.headers).find(function(e) {
                        return "set-cookie" === e.toLowerCase()
                    })]) || !e.headers.cookie || n.silent || console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."), s)), Array.isArray(e) || (e = [e]), (n = n ? Object.assign({}, t, n) : t).map ? e.filter(i).reduce(function(e, t) {
                        return e[(t = r(t, n)).name] = t, e
                    }, {}) : e.filter(i).map(function(e) {
                        return r(e, n)
                    })) : n.map ? {} : []
                }
                e.exports = n, e.exports.parse = n, e.exports.parseString = r, e.exports.splitCookiesString = function(e) {
                    if (Array.isArray(e)) return e;
                    if ("string" != typeof e) return [];
                    var t, i, r, n, s, a = [],
                        o = 0;

                    function c() {
                        for (; o < e.length && /\s/.test(e.charAt(o));) o += 1;
                        return o < e.length
                    }
                    for (; o < e.length;) {
                        for (t = o, s = !1; c();)
                            if ("," === (i = e.charAt(o))) {
                                for (r = o, o += 1, c(), n = o; o < e.length && "=" !== (i = e.charAt(o)) && ";" !== i && "," !== i;) o += 1;
                                o < e.length && "=" === e.charAt(o) ? (s = !0, o = n, a.push(e.substring(t, r)), t = o) : o = r + 1
                            } else o += 1;
                        (!s || o >= e.length) && a.push(e.substring(t, e.length))
                    }
                    return a
                }
            }
        },
        t = {};

    function i(r) {
        var n = t[r];
        return void 0 !== n || (n = t[r] = {
            exports: {}
        }, e[r].call(n.exports, n, n.exports, i)), n.exports
    }
    i.d = (e, t) => {
        for (var r in t) i.o(t, r) && !i.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        })
    }, i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), i.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        "use strict";
        let e, t;
        var r = {},
            n = (i.r(r), i.d(r, {
                deleteDB: () => function(e, {
                    blocked: t
                } = {}) {
                    return e = indexedDB.deleteDatabase(e), t && e.addEventListener("blocked", e => t(e.oldVersion, e)), E(e).then(() => void 0)
                },
                openDB: () => C,
                unwrap: () => k,
                wrap: () => E
            }), {}),
            s = (i.r(n), i.d(n, {
                decode: () => T,
                encode: () => O
            }), {}),
            a = (i.r(s), i.d(s, {
                parse: () => function(e, t) {
                    if ("string" != typeof e) throw TypeError("argument str must be a string");
                    for (var i = {}, r = (t || {}).decode || eF, n = 0; n < e.length;) {
                        var s = e.indexOf("=", n);
                        if (-1 === s) break;
                        var a = e.indexOf(";", n);
                        if (-1 === a) a = e.length;
                        else if (a < s) {
                            n = e.lastIndexOf(";", s - 1) + 1;
                            continue
                        }
                        var o = e.slice(n, s).trim();
                        void 0 === i[o] && (34 === (s = e.slice(s + 1, a).trim()).charCodeAt(0) && (s = s.slice(1, -1)), i[o] = function(e, t) {
                            try {
                                return t(e)
                            } catch (t) {
                                return e
                            }
                        }(s, r)), n = a + 1
                    }
                    return i
                },
                serialize: () => eD
            }), {}),
            o = (i.r(a), i.d(a, {
                base64: () => iu,
                caeser: () => ip,
                none: () => ih,
                plain: () => il,
                xor: () => ic
            }), i(470));
        let c = {
            "application/ecmascript": {
                source: "apache",
                compressible: !0,
                extensions: ["ecma"]
            },
            "application/gzip": {
                source: "iana",
                compressible: !1,
                extensions: ["gz"]
            },
            "application/http": {
                source: "iana"
            },
            "application/javascript": {
                source: "apache",
                charset: "UTF-8",
                compressible: !0,
                extensions: ["js"]
            },
            "application/json": {
                source: "iana",
                charset: "UTF-8",
                compressible: !0,
                extensions: ["json", "map"]
            },
            "application/manifest+json": {
                source: "iana",
                charset: "UTF-8",
                compressible: !0,
                extensions: ["webmanifest"]
            },
            "application/marc": {
                source: "iana",
                extensions: ["mrc"]
            },
            "application/mp4": {
                source: "iana",
                extensions: ["mp4", "mpg4", "mp4s", "m4p"]
            },
            "application/ogg": {
                source: "iana",
                compressible: !1,
                extensions: ["ogx"]
            },
            "application/sql": {
                source: "iana",
                extensions: ["sql"]
            },
            "application/wasm": {
                source: "iana",
                compressible: !0,
                extensions: ["wasm"]
            },
            "application/x-bittorrent": {
                source: "apache",
                extensions: ["torrent"]
            },
            "application/x-gzip": {
                source: "apache"
            },
            "application/x-javascript": {
                compressible: !0
            },
            "application/x-web-app-manifest+json": {
                compressible: !0,
                extensions: ["webapp"]
            },
            "application/x-www-form-urlencoded": {
                source: "iana",
                compressible: !0
            },
            "application/xhtml+xml": {
                source: "iana",
                compressible: !0,
                extensions: ["xhtml", "xht"]
            },
            "application/xhtml-voice+xml": {
                source: "apache",
                compressible: !0
            },
            "application/xml": {
                source: "iana",
                compressible: !0,
                extensions: ["xml", "xsl", "xsd", "rng"]
            },
            "application/zip": {
                source: "iana",
                compressible: !1,
                extensions: ["zip"]
            },
            "application/zlib": {
                source: "iana"
            },
            "audio/midi": {
                source: "apache",
                extensions: ["mid", "midi", "kar", "rmi"]
            },
            "audio/mp3": {
                compressible: !1,
                extensions: ["mp3"]
            },
            "audio/mp4": {
                source: "iana",
                compressible: !1,
                extensions: ["m4a", "mp4a"]
            },
            "audio/mp4a-latm": {
                source: "iana"
            },
            "audio/mpa": {
                source: "iana"
            },
            "audio/mpa-robust": {
                source: "iana"
            },
            "audio/mpeg": {
                source: "iana",
                compressible: !1,
                extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
            },
            "audio/ogg": {
                source: "iana",
                compressible: !1,
                extensions: ["oga", "ogg", "spx", "opus"]
            },
            "audio/red": {
                source: "iana"
            },
            "audio/rtx": {
                source: "iana"
            },
            "audio/scip": {
                source: "iana"
            },
            "audio/silk": {
                source: "apache",
                extensions: ["sil"]
            },
            "audio/smv": {
                source: "iana"
            },
            "audio/wav": {
                compressible: !1,
                extensions: ["wav"]
            },
            "audio/wave": {
                compressible: !1,
                extensions: ["wav"]
            },
            "audio/webm": {
                source: "apache",
                compressible: !1,
                extensions: ["weba"]
            },
            "audio/x-aac": {
                source: "apache",
                compressible: !1,
                extensions: ["aac"]
            },
            "audio/x-aiff": {
                source: "apache",
                extensions: ["aif", "aiff", "aifc"]
            },
            "audio/x-caf": {
                source: "apache",
                compressible: !1,
                extensions: ["caf"]
            },
            "audio/x-flac": {
                source: "apache",
                extensions: ["flac"]
            },
            "audio/x-m4a": {
                source: "nginx",
                extensions: ["m4a"]
            },
            "audio/x-matroska": {
                source: "apache",
                extensions: ["mka"]
            },
            "audio/x-mpegurl": {
                source: "apache",
                extensions: ["m3u"]
            },
            "audio/x-ms-wax": {
                source: "apache",
                extensions: ["wax"]
            },
            "audio/x-ms-wma": {
                source: "apache",
                extensions: ["wma"]
            },
            "audio/x-pn-realaudio": {
                source: "apache",
                extensions: ["ram", "ra"]
            },
            "audio/x-pn-realaudio-plugin": {
                source: "apache",
                extensions: ["rmp"]
            },
            "audio/x-realaudio": {
                source: "nginx",
                extensions: ["ra"]
            },
            "audio/x-tta": {
                source: "apache"
            },
            "audio/x-wav": {
                source: "apache",
                extensions: ["wav"]
            },
            "audio/xm": {
                source: "apache",
                extensions: ["xm"]
            },
            "font/collection": {
                source: "iana",
                extensions: ["ttc"]
            },
            "font/otf": {
                source: "iana",
                compressible: !0,
                extensions: ["otf"]
            },
            "font/sfnt": {
                source: "iana"
            },
            "font/ttf": {
                source: "iana",
                compressible: !0,
                extensions: ["ttf"]
            },
            "font/woff": {
                source: "iana",
                extensions: ["woff"]
            },
            "font/woff2": {
                source: "iana",
                extensions: ["woff2"]
            },
            "image/gif": {
                source: "iana",
                compressible: !1,
                extensions: ["gif"]
            },
            "image/heic": {
                source: "iana",
                extensions: ["heic"]
            },
            "image/heic-sequence": {
                source: "iana",
                extensions: ["heics"]
            },
            "image/heif": {
                source: "iana",
                extensions: ["heif"]
            },
            "image/jpeg": {
                source: "iana",
                compressible: !1,
                extensions: ["jpeg", "jpg", "jpe"]
            },
            "image/png": {
                source: "iana",
                compressible: !1,
                extensions: ["png"]
            },
            "image/svg+xml": {
                source: "iana",
                compressible: !0,
                extensions: ["svg", "svgz"]
            },
            "image/webp": {
                source: "iana",
                extensions: ["webp"]
            },
            "text/coffeescript": {
                extensions: ["coffee", "litcoffee"]
            },
            "text/css": {
                source: "iana",
                charset: "UTF-8",
                compressible: !0,
                extensions: ["css"]
            },
            "text/ecmascript": {
                source: "apache"
            },
            "text/html": {
                source: "iana",
                compressible: !0,
                extensions: ["html", "htm", "shtml"]
            },
            "text/jade": {
                extensions: ["jade"]
            },
            "text/javascript": {
                source: "iana",
                charset: "UTF-8",
                compressible: !0,
                extensions: ["js", "mjs"]
            },
            "text/markdown": {
                source: "iana",
                compressible: !0,
                extensions: ["md", "markdown"]
            }
        };
        var l, p, h, u, d = /^\s*([^;\s]*)(?:;|\s|$)/,
            m = /^text\//i,
            f = {};

        function y(e) {
            var t;
            return !(!e || "string" != typeof e) && ((t = (e = d.exec(e)) && c[e[1].toLowerCase()]) && t.charset ? t.charset : !(!e || !m.test(e[1])) && "UTF-8")
        }
        f.charset = y, f.charsets = {
            lookup: y
        }, f.contentType = function(e) {
            var t;
            return !(!e || "string" != typeof e || !(e = -1 === e.indexOf("/") ? f.lookup(e) : e)) && (-1 === e.indexOf("charset") && (t = f.charset(e)) && (e += "; charset=" + t.toLowerCase()), e)
        }, f.extension = function(e) {
            return !(!e || "string" != typeof e || !(e = (e = d.exec(e)) && f.extensions[e[1].toLowerCase()]) || !e.length) && e[0]
        }, f.extensions = Object.create(null), f.lookup = function(e) {
            return e && "string" == typeof e && (e = (0, o.extname)("x." + e).toLowerCase().substr(1)) && f.types[e] || !1
        }, f.types = Object.create(null), l = f.extensions, p = f.types, h = ["nginx", "apache", void 0, "iana"], Object.keys(c).forEach(function(e) {
            var t = c[e],
                i = t.extensions;
            if (i && i.length) {
                l[e] = i;
                for (var r = 0; r < i.length; r++) {
                    var n = i[r];
                    if (p[n]) {
                        var s = h.indexOf(c[p[n]].source),
                            a = h.indexOf(t.source);
                        if ("application/octet-stream" !== p[n] && (a < s || s === a && "application/" === p[n].substr(0, 12))) continue
                    }
                    p[n] = e
                }
            }
        });
        let g = (e, t) => t.some(t => e instanceof t),
            _ = new WeakMap,
            v = new WeakMap,
            x = new WeakMap,
            b = new WeakMap,
            w = new WeakMap,
            S = {
                get(e, t, i) {
                    if (e instanceof IDBTransaction) {
                        if ("done" === t) return v.get(e);
                        if ("objectStoreNames" === t) return e.objectStoreNames || x.get(e);
                        if ("store" === t) return i.objectStoreNames[1] ? void 0 : i.objectStore(i.objectStoreNames[0])
                    }
                    return E(e[t])
                },
                set: (e, t, i) => (e[t] = i, !0),
                has: (e, t) => e instanceof IDBTransaction && ("done" === t || "store" === t) || t in e
            };

        function E(i) {
            var r, n;
            return i instanceof IDBRequest ? ((r = new Promise((e, t) => {
                let r = () => {
                        i.removeEventListener("success", n), i.removeEventListener("error", s)
                    },
                    n = () => {
                        e(E(i.result)), r()
                    },
                    s = () => {
                        t(i.error), r()
                    };
                i.addEventListener("success", n), i.addEventListener("error", s)
            })).then(e => {
                e instanceof IDBCursor && _.set(e, i)
            }).catch(() => {}), w.set(r, i), r) : b.has(i) ? b.get(i) : ((r = "function" == typeof i ? i !== IDBDatabase.prototype.transaction || "objectStoreNames" in IDBTransaction.prototype ? (t = t || [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]).includes(i) ? function(...e) {
                return i.apply(k(this), e), E(_.get(this))
            } : function(...e) {
                return E(i.apply(k(this), e))
            } : function(e, ...t) {
                return t = i.call(k(this), e, ...t), x.set(t, e.sort ? e.sort() : [e]), E(t)
            } : (i instanceof IDBTransaction && (v.has(i) || (n = new Promise((e, t) => {
                let r = () => {
                        i.removeEventListener("complete", n), i.removeEventListener("error", s), i.removeEventListener("abort", s)
                    },
                    n = () => {
                        e(), r()
                    },
                    s = () => {
                        t(i.error || new DOMException("AbortError", "AbortError")), r()
                    };
                i.addEventListener("complete", n), i.addEventListener("error", s), i.addEventListener("abort", s)
            }), v.set(i, n))), g(i, e = e || [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]) ? new Proxy(i, S) : i)) !== i && (b.set(i, r), w.set(r, i)), r)
        }
        let k = e => w.get(e);

        function C(e, t, {
            blocked: i,
            upgrade: r,
            blocking: n,
            terminated: s
        } = {}) {
            let a = indexedDB.open(e, t);
            return e = E(a), r && a.addEventListener("upgradeneeded", e => {
                r(E(a.result), e.oldVersion, e.newVersion, E(a.transaction), e)
            }), i && a.addEventListener("blocked", e => i(e.oldVersion, e.newVersion, e)), e.then(e => {
                s && e.addEventListener("close", () => s()), n && e.addEventListener("versionchange", e => n(e.oldVersion, e.newVersion, e))
            }).catch(() => {}), e
        }
        let A = ["get", "getKey", "getAll", "getAllKeys", "count"],
            P = ["put", "add", "delete", "clear"],
            I = new Map;

        function L(e, t) {
            if (e instanceof IDBDatabase && !(t in e) && "string" == typeof t) {
                if (I.get(t)) return I.get(t);
                let i = t.replace(/FromIndex$/, ""),
                    r = t !== i,
                    n = P.includes(i);
                return i in (r ? IDBIndex : IDBObjectStore).prototype && (n || A.includes(i)) ? (e = async function(e, ...t) {
                    let s = (e = this.transaction(e, n ? "readwrite" : "readonly")).store;
                    return r && (s = s.index(t.shift())), (await Promise.all([s[i](...t), n && e.done]))[0]
                }, I.set(t, e), e) : void 0
            }
        }
        S = {
            ...u = S,
            get: (e, t, i) => L(e, t) || u.get(e, t, i),
            has: (e, t) => !!L(e, t) || u.has(e, t)
        };
        let {
            encode: O,
            decode: T
        } = {
            encode(e) {
                if (!e) return e;
                e = e.toString();
                var t = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
                let i, r, n, s, a = "",
                    o = e.length % 3;
                for (let o = 0; o < e.length;) {
                    if (255 < (r = e.charCodeAt(o++)) || 255 < (n = e.charCodeAt(o++)) || 255 < (s = e.charCodeAt(o++))) throw TypeError("invalid character found");
                    a += t[(i = r << 16 | n << 8 | s) >> 18 & 63] + t[i >> 12 & 63] + t[i >> 6 & 63] + t[63 & i]
                }
                return encodeURIComponent(o ? a.slice(0, o - 3) + "===".substr(o) : a)
            },
            decode(e) {
                if (!e) return e;
                var t, i = {
                    0: 52,
                    1: 53,
                    2: 54,
                    3: 55,
                    4: 56,
                    5: 57,
                    6: 58,
                    7: 59,
                    8: 60,
                    9: 61,
                    A: 0,
                    B: 1,
                    C: 2,
                    D: 3,
                    E: 4,
                    F: 5,
                    G: 6,
                    H: 7,
                    I: 8,
                    J: 9,
                    K: 10,
                    L: 11,
                    M: 12,
                    N: 13,
                    O: 14,
                    P: 15,
                    Q: 16,
                    R: 17,
                    S: 18,
                    T: 19,
                    U: 20,
                    V: 21,
                    W: 22,
                    X: 23,
                    Y: 24,
                    Z: 25,
                    a: 26,
                    b: 27,
                    c: 28,
                    d: 29,
                    e: 30,
                    f: 31,
                    g: 32,
                    h: 33,
                    i: 34,
                    j: 35,
                    k: 36,
                    l: 37,
                    m: 38,
                    n: 39,
                    o: 40,
                    p: 41,
                    q: 42,
                    r: 43,
                    s: 44,
                    t: 45,
                    u: 46,
                    v: 47,
                    w: 48,
                    x: 49,
                    y: 50,
                    z: 51,
                    "+": 62,
                    "/": 63,
                    "=": 64
                };
                e = (e = decodeURIComponent(e.toString())).replace(/\s+/g, ""), e += "==".slice(2 - (3 & e.length));
                let r, n, s = "";
                for (let a = 0; a < e.length;) t = i[e.charAt(a++)] << 18 | i[e.charAt(a++)] << 12 | (r = i[e.charAt(a++)]) << 6 | (n = i[e.charAt(a++)]), s += 64 === r ? String.fromCharCode(t >> 16 & 255) : 64 === n ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
                return s
            }
        };

        function M(e, t, i) {
            return e(i = {
                path: t,
                exports: {},
                require: function(e, t) {
                    throw null == t && i.path, Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                }
            }, i.exports), i.exports
        }
        var R = M(function(e, t) {
                t.__esModule = !0, t.isIdentifierChar = function(e, t) {
                    return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? 170 <= e && s.test(String.fromCharCode(e)) : !1 !== t && (c(e, a) || c(e, o)))))
                }, t.isIdentifierStart = function(e, t) {
                    return e < 65 ? 36 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? 170 <= e && n.test(String.fromCharCode(e)) : !1 !== t && c(e, a)))
                }, t.reservedWords = t.keywords = t.keywordRelationalOperator = void 0, t.reservedWords = {
                    3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
                    5: "class enum extends super const export import",
                    6: "enum",
                    strict: "implements interface let package private protected public static yield",
                    strictBind: "eval arguments"
                };
                var i = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
                t.keywords = {
                    5: i,
                    "5module": i + " export import",
                    6: i + " const class extends export import super"
                }, t.keywordRelationalOperator = /^in(stanceof)?$/;
                let r = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
                    n = RegExp("[" + r + "]"),
                    s = RegExp("[" + r + "‌‍\xb7̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿]"),
                    a = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938],
                    o = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];

                function c(e, t) {
                    let i = 65536;
                    for (let r = 0; r < t.length; r += 2) {
                        if ((i += t[r]) > e) return !1;
                        if ((i += t[r + 1]) >= e) return !0
                    }
                }
            }),
            N = M(function(e, t) {
                t.__esModule = !0, t.types = t.keywords = t.TokenType = void 0;
                class i {
                    constructor(e, t = {}) {
                        this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !!t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !!t.postfix, this.binop = t.binop || null, this.updateContext = null
                    }
                }

                function r(e, t) {
                    return new i(e, {
                        beforeExpr: !0,
                        binop: t
                    })
                }
                t.TokenType = i;
                let n = {
                        beforeExpr: !0
                    },
                    s = {
                        startsExpr: !0
                    },
                    a = {};

                function o(e, t = {}) {
                    return t.keyword = e, a[e] = new i(e, t)
                }
                t.keywords = a;
                var c = {
                    num: new i("num", s),
                    regexp: new i("regexp", s),
                    string: new i("string", s),
                    name: new i("name", s),
                    privateId: new i("privateId", s),
                    eof: new i("eof"),
                    bracketL: new i("[", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    bracketR: new i("]"),
                    braceL: new i("{", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    braceR: new i("}"),
                    parenL: new i("(", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    parenR: new i(")"),
                    comma: new i(",", n),
                    semi: new i(";", n),
                    colon: new i(":", n),
                    dot: new i("."),
                    question: new i("?", n),
                    questionDot: new i("?."),
                    arrow: new i("=>", n),
                    template: new i("template"),
                    invalidTemplate: new i("invalidTemplate"),
                    ellipsis: new i("...", n),
                    backQuote: new i("`", s),
                    dollarBraceL: new i("${", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    eq: new i("=", {
                        beforeExpr: !0,
                        isAssign: !0
                    }),
                    assign: new i("_=", {
                        beforeExpr: !0,
                        isAssign: !0
                    }),
                    incDec: new i("++/--", {
                        prefix: !0,
                        postfix: !0,
                        startsExpr: !0
                    }),
                    prefix: new i("!/~", {
                        beforeExpr: !0,
                        prefix: !0,
                        startsExpr: !0
                    }),
                    logicalOR: r("||", 1),
                    logicalAND: r("&&", 2),
                    bitwiseOR: r("|", 3),
                    bitwiseXOR: r("^", 4),
                    bitwiseAND: r("&", 5),
                    equality: r("==/!=/===/!==", 6),
                    relational: r("</>/<=/>=", 7),
                    bitShift: r("<</>>/>>>", 8),
                    plusMin: new i("+/-", {
                        beforeExpr: !0,
                        binop: 9,
                        prefix: !0,
                        startsExpr: !0
                    }),
                    modulo: r("%", 10),
                    star: r("*", 10),
                    slash: r("/", 10),
                    starstar: new i("**", {
                        beforeExpr: !0
                    }),
                    coalesce: r("??", 1),
                    _break: o("break"),
                    _case: o("case", n),
                    _catch: o("catch"),
                    _continue: o("continue"),
                    _debugger: o("debugger"),
                    _default: o("default", n),
                    _do: o("do", {
                        isLoop: !0,
                        beforeExpr: !0
                    }),
                    _else: o("else", n),
                    _finally: o("finally"),
                    _for: o("for", {
                        isLoop: !0
                    }),
                    _function: o("function", s),
                    _if: o("if"),
                    _return: o("return", n),
                    _switch: o("switch"),
                    _throw: o("throw", n),
                    _try: o("try"),
                    _var: o("var"),
                    _const: o("const"),
                    _while: o("while", {
                        isLoop: !0
                    }),
                    _with: o("with"),
                    _new: o("new", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    _this: o("this", s),
                    _super: o("super", s),
                    _class: o("class", s),
                    _extends: o("extends", n),
                    _export: o("export"),
                    _import: o("import", s),
                    _null: o("null", s),
                    _true: o("true", s),
                    _false: o("false", s),
                    _in: o("in", {
                        beforeExpr: !0,
                        binop: 7
                    }),
                    _instanceof: o("instanceof", {
                        beforeExpr: !0,
                        binop: 7
                    }),
                    _typeof: o("typeof", {
                        beforeExpr: !0,
                        prefix: !0,
                        startsExpr: !0
                    }),
                    _void: o("void", {
                        beforeExpr: !0,
                        prefix: !0,
                        startsExpr: !0
                    }),
                    _delete: o("delete", {
                        beforeExpr: !0,
                        prefix: !0,
                        startsExpr: !0
                    })
                };
                t.types = c
            }),
            B = M(function(e, t) {
                t.__esModule = !0, t.isNewLine = r, t.lineBreakG = t.lineBreak = void 0, t.nextLineBreak = function(e, t, i = e.length) {
                    for (let s = t; s < i; s++) {
                        var n = e.charCodeAt(s);
                        if (r(n)) return s < i - 1 && 13 === n && 10 === e.charCodeAt(s + 1) ? s + 2 : s + 1
                    }
                    return -1
                }, t.skipWhiteSpace = t.nonASCIIwhitespace = void 0;
                var i = /\r\n?|\n|\u2028|\u2029/,
                    i = (t.lineBreak = i, RegExp(i.source, "g"));

                function r(e) {
                    return 10 === e || 13 === e || 8232 === e || 8233 === e
                }
                t.lineBreakG = i, t.nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, t.skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g
            }),
            V = M(function(e, t) {
                t.__esModule = !0, t.loneSurrogate = t.isArray = t.hasOwn = void 0, t.wordsRegexp = function(e) {
                    return RegExp("^(?:" + e.replace(/ /g, "|") + ")$")
                };
                let i = Object.prototype,
                    r = i.hasOwnProperty,
                    n = i.toString,
                    s = Object.hasOwn || ((e, t) => r.call(e, t));
                t.hasOwn = s;
                var a = Array.isArray || (e => "[object Array]" === n.call(e));
                t.isArray = a, t.loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/
            }),
            j = M(function(e, t) {
                t.__esModule = !0, t.SourceLocation = t.Position = void 0, t.getLineInfo = function(e, t) {
                    for (let n = 1, s = 0;;) {
                        var r = (0, B.nextLineBreak)(e, s, t);
                        if (r < 0) return new i(n, t - s);
                        ++n, s = r
                    }
                };
                class i {
                    constructor(e, t) {
                        this.line = e, this.column = t
                    }
                    offset(e) {
                        return new i(this.line, this.column + e)
                    }
                }
                t.Position = i, t.SourceLocation = class {
                    constructor(e, t, i) {
                        this.start = t, this.end = i, null !== e.sourceFile && (this.source = e.sourceFile)
                    }
                }
            }),
            D = M(function(e, t) {
                t.__esModule = !0, t.defaultOptions = void 0;
                let i = {
                        ecmaVersion: null,
                        sourceType: "script",
                        onInsertedSemicolon: null,
                        onTrailingComma: null,
                        allowReserved: null,
                        allowReturnOutsideFunction: (t.getOptions = function(e) {
                            var t, n, s = {};
                            for (n in i) s[n] = (e && (0, V.hasOwn)(e, n) ? e : i)[n];
                            if ("latest" === s.ecmaVersion ? s.ecmaVersion = 1e8 : null == s.ecmaVersion ? (!r && "object" == typeof console && console.warn && (r = !0, console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.")), s.ecmaVersion = 11) : 2015 <= s.ecmaVersion && (s.ecmaVersion -= 2009), null == s.allowReserved && (s.allowReserved = s.ecmaVersion < 5), (0, V.isArray)(s.onToken)) {
                                let e = s.onToken;
                                s.onToken = t => e.push(t)
                            }
                            return (0, V.isArray)(s.onComment) && (s.onComment = (t = s.onComment, function(e, i, r, n, a, o) {
                                e = {
                                    type: e ? "Block" : "Line",
                                    value: i,
                                    start: r,
                                    end: n
                                }, s.locations && (e.loc = new j.SourceLocation(this, a, o)), s.ranges && (e.range = [r, n]), t.push(e)
                            })), s
                        }, !1),
                        allowImportExportEverywhere: !1,
                        allowAwaitOutsideFunction: null,
                        allowSuperOutsideMethod: null,
                        allowHashBang: !1,
                        locations: !1,
                        onToken: null,
                        onComment: null,
                        ranges: !1,
                        program: null,
                        sourceFile: null,
                        directSourceFile: null,
                        preserveParens: !1
                    },
                    r = (t.defaultOptions = i, !1)
            }),
            F = M(function(e, t) {
                t.__esModule = !0, t.SCOPE_VAR = t.SCOPE_TOP = t.SCOPE_SUPER = t.SCOPE_SIMPLE_CATCH = t.SCOPE_GENERATOR = t.SCOPE_FUNCTION = t.SCOPE_DIRECT_SUPER = t.SCOPE_CLASS_STATIC_BLOCK = t.SCOPE_ASYNC = t.SCOPE_ARROW = t.BIND_VAR = t.BIND_SIMPLE_CATCH = t.BIND_OUTSIDE = t.BIND_NONE = t.BIND_LEXICAL = t.BIND_FUNCTION = void 0, t.functionFlags = function(e, t) {
                    return 2 | (e ? 4 : 0) | (t ? 8 : 0)
                }, t.SCOPE_VAR = 259, t.SCOPE_CLASS_STATIC_BLOCK = 256, t.SCOPE_DIRECT_SUPER = 128, t.SCOPE_SUPER = 64, t.SCOPE_SIMPLE_CATCH = 32, t.SCOPE_ARROW = 16, t.SCOPE_GENERATOR = 8, t.SCOPE_ASYNC = 4, t.SCOPE_FUNCTION = 2, t.SCOPE_TOP = 1, t.BIND_OUTSIDE = 5, t.BIND_SIMPLE_CATCH = 4, t.BIND_FUNCTION = 3, t.BIND_LEXICAL = 2, t.BIND_VAR = 1, t.BIND_NONE = 0
            }),
            $ = M(function(e, t) {
                t.__esModule = !0, t.Parser = void 0, t.Parser = class {
                    constructor(e, t, i) {
                        this.options = e = (0, D.getOptions)(e), this.sourceFile = e.sourceFile, this.keywords = (0, V.wordsRegexp)(R.keywords[6 <= e.ecmaVersion ? 6 : "module" === e.sourceType ? "5module" : 5]);
                        let r = "";
                        !0 !== e.allowReserved && (r = R.reservedWords[6 <= e.ecmaVersion ? 6 : 5 === e.ecmaVersion ? 5 : 3], "module" === e.sourceType) && (r += " await"), this.reservedWords = (0, V.wordsRegexp)(r);
                        var n = (r ? r + " " : "") + R.reservedWords.strict;
                        this.reservedWordsStrict = (0, V.wordsRegexp)(n), this.reservedWordsStrictBind = (0, V.wordsRegexp)(n + " " + R.reservedWords.strictBind), this.input = String(t), this.containsEsc = !1, i ? (this.pos = i, this.lineStart = this.input.lastIndexOf("\n", i - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(B.lineBreak).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = N.types.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = "module" === e.sourceType, this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = Object.create(null), 0 === this.pos && e.allowHashBang && "#!" === this.input.slice(0, 2) && this.skipLineComment(2), this.scopeStack = [], this.enterScope(F.SCOPE_TOP), this.regexpState = null, this.privateNameStack = []
                    }
                    parse() {
                        var e = this.options.program || this.startNode();
                        return this.nextToken(), this.parseTopLevel(e)
                    }
                    get inFunction() {
                        return 0 < (this.currentVarScope().flags & F.SCOPE_FUNCTION)
                    }
                    get inGenerator() {
                        return 0 < (this.currentVarScope().flags & F.SCOPE_GENERATOR) && !this.currentVarScope().inClassFieldInit
                    }
                    get inAsync() {
                        return 0 < (this.currentVarScope().flags & F.SCOPE_ASYNC) && !this.currentVarScope().inClassFieldInit
                    }
                    get canAwait() {
                        for (let t = this.scopeStack.length - 1; 0 <= t; t--) {
                            var e = this.scopeStack[t];
                            if (e.inClassFieldInit || e.flags & F.SCOPE_CLASS_STATIC_BLOCK) return !1;
                            if (e.flags & F.SCOPE_FUNCTION) return 0 < (e.flags & F.SCOPE_ASYNC)
                        }
                        return this.inModule && 13 <= this.options.ecmaVersion || this.options.allowAwaitOutsideFunction
                    }
                    get allowSuper() {
                        var e = this.currentThisScope(),
                            t = e.flags,
                            e = e.inClassFieldInit;
                        return 0 < (t & F.SCOPE_SUPER) || e || this.options.allowSuperOutsideMethod
                    }
                    get allowDirectSuper() {
                        return 0 < (this.currentThisScope().flags & F.SCOPE_DIRECT_SUPER)
                    }
                    get treatFunctionsAsVar() {
                        return this.treatFunctionsAsVarInScope(this.currentScope())
                    }
                    get allowNewDotTarget() {
                        var e = this.currentThisScope(),
                            t = e.flags,
                            e = e.inClassFieldInit;
                        return 0 < (t & (F.SCOPE_FUNCTION | F.SCOPE_CLASS_STATIC_BLOCK)) || e
                    }
                    get inClassStaticBlock() {
                        return 0 < (this.currentVarScope().flags & F.SCOPE_CLASS_STATIC_BLOCK)
                    }
                    static extend(...e) {
                        let t = this;
                        for (let i = 0; i < e.length; i++) t = e[i](t);
                        return t
                    }
                    static parse(e, t) {
                        return new this(t, e).parse()
                    }
                    static parseExpressionAt(e, t, i) {
                        return (i = new this(i, e, t)).nextToken(), i.parseExpression()
                    }
                    static tokenizer(e, t) {
                        return new this(t, e)
                    }
                }
            }),
            U = M(function(e, t) {
                t.__esModule = !0, t.DestructuringErrors = function() {
                    this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1
                };
                let i = $.Parser.prototype,
                    r = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
                i.strictDirective = function(e) {
                    for (;;) {
                        B.skipWhiteSpace.lastIndex = e, e += B.skipWhiteSpace.exec(this.input)[0].length;
                        var t = r.exec(this.input.slice(e));
                        if (!t || "use strict" === (t[1] || t[2])) return !1;
                        e += t[0].length, B.skipWhiteSpace.lastIndex = e, e += B.skipWhiteSpace.exec(this.input)[0].length, ";" === this.input[e] && e++
                    }
                }, i.eat = function(e) {
                    return this.type === e && (this.next(), !0)
                }, i.isContextual = function(e) {
                    return this.type === N.types.name && this.value === e && !this.containsEsc
                }, i.eatContextual = function(e) {
                    return !!this.isContextual(e) && (this.next(), !0)
                }, i.expectContextual = function(e) {
                    this.eatContextual(e) || this.unexpected()
                }, i.canInsertSemicolon = function() {
                    return this.type === N.types.eof || this.type === N.types.braceR || B.lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
                }, i.insertSemicolon = function() {
                    if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0
                }, i.semicolon = function() {
                    this.eat(N.types.semi) || this.insertSemicolon() || this.unexpected()
                }, i.afterTrailingComma = function(e, t) {
                    if (this.type === e) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0
                }, i.expect = function(e) {
                    this.eat(e) || this.unexpected()
                }, i.unexpected = function(e) {
                    this.raise(null != e ? e : this.start, "Unexpected token")
                }, i.checkPatternErrors = function(e, t) {
                    e && (-1 < e.trailingComma && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element"), -1 < (t = t ? e.parenthesizedAssign : e.parenthesizedBind)) && this.raiseRecoverable(t, "Parenthesized pattern")
                }, i.checkExpressionErrors = function(e, t) {
                    var i;
                    return !!e && (i = e.shorthandAssign, e = e.doubleProto, t ? (0 <= i && this.raise(i, "Shorthand property assignments are valid only in destructuring patterns"), void(0 <= e && this.raiseRecoverable(e, "Redefinition of __proto__ property"))) : 0 <= i || 0 <= e)
                }, i.checkYieldAwaitInDefaultParams = function() {
                    this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value")
                }, i.isSimpleAssignTarget = function(e) {
                    return "ParenthesizedExpression" === e.type ? this.isSimpleAssignTarget(e.expression) : "Identifier" === e.type || "MemberExpression" === e.type
                }
            });

        function H(e, t) {
            var i, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (r) return (r = r.call(e)).next.bind(r);
            if (Array.isArray(e) || (r = function(e, t) {
                    var i;
                    if (e) return "string" == typeof e ? W(e, t) : "Map" === (i = "Object" === (i = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : i) || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? W(e, t) : void 0
                }(e)) || t && e && "number" == typeof e.length) return r && (e = r), i = 0,
                function() {
                    return i >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[i++]
                    }
                };
            throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }

        function W(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var i = 0, r = Array(t); i < t; i++) r[i] = e[i];
            return r
        }
        var q = $.Parser.prototype;
        q.parseTopLevel = function(e) {
            var t = Object.create(null);
            for (e.body || (e.body = []); this.type !== N.types.eof;) {
                var i = this.parseStatement(null, !0, t);
                e.body.push(i)
            }
            if (this.inModule)
                for (var r = 0, n = Object.keys(this.undefinedExports); r < n.length; r++) {
                    var s = n[r];
                    this.raiseRecoverable(this.undefinedExports[s].start, `Export '${s}' is not defined`)
                }
            return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType, this.finishNode(e, "Program")
        };
        let G = {
                kind: "loop"
            },
            z = {
                kind: "switch"
            },
            K = (q.isLet = function(e) {
                if (!(this.options.ecmaVersion < 6) && this.isContextual("let")) {
                    B.skipWhiteSpace.lastIndex = this.pos;
                    let t = B.skipWhiteSpace.exec(this.input),
                        i = this.pos + t[0].length,
                        r = this.input.charCodeAt(i);
                    if (91 === r || 92 === r || 55295 < r && r < 56320) return !0;
                    if (!e) {
                        if (123 === r) return !0;
                        if ((0, R.isIdentifierStart)(r, !0)) {
                            let t = i + 1;
                            for (;
                                (0, R.isIdentifierChar)(r = this.input.charCodeAt(t), !0);) ++t;
                            if (92 === r || 55295 < r && r < 56320 || (e = this.input.slice(i, t), !R.keywordRelationalOperator.test(e))) return !0
                        }
                    }
                }
                return !1
            }, q.isAsyncFunction = function() {
                if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;
                B.skipWhiteSpace.lastIndex = this.pos;
                var e = B.skipWhiteSpace.exec(this.input),
                    e = this.pos + e[0].length;
                return !(B.lineBreak.test(this.input.slice(this.pos, e)) || "function" !== this.input.slice(e, e + 8) || e + 8 !== this.input.length && ((0, R.isIdentifierChar)(e = this.input.charCodeAt(e + 8)) || 55295 < e && e < 56320))
            }, q.parseStatement = function(e, t, i) {
                let r = this.type,
                    n = this.startNode(),
                    s;
                switch (this.isLet(e) && (r = N.types._var, s = "let"), r) {
                    case N.types._break:
                    case N.types._continue:
                        return this.parseBreakContinueStatement(n, r.keyword);
                    case N.types._debugger:
                        return this.parseDebuggerStatement(n);
                    case N.types._do:
                        return this.parseDoStatement(n);
                    case N.types._for:
                        return this.parseForStatement(n);
                    case N.types._function:
                        return e && (this.strict || "if" !== e && "label" !== e) && 6 <= this.options.ecmaVersion && this.unexpected(), this.parseFunctionStatement(n, !1, !e);
                    case N.types._class:
                        return e && this.unexpected(), this.parseClass(n, !0);
                    case N.types._if:
                        return this.parseIfStatement(n);
                    case N.types._return:
                        return this.parseReturnStatement(n);
                    case N.types._switch:
                        return this.parseSwitchStatement(n);
                    case N.types._throw:
                        return this.parseThrowStatement(n);
                    case N.types._try:
                        return this.parseTryStatement(n);
                    case N.types._const:
                    case N.types._var:
                        return s = s || this.value, e && "var" !== s && this.unexpected(), this.parseVarStatement(n, s);
                    case N.types._while:
                        return this.parseWhileStatement(n);
                    case N.types._with:
                        return this.parseWithStatement(n);
                    case N.types.braceL:
                        return this.parseBlock(!0, n);
                    case N.types.semi:
                        return this.parseEmptyStatement(n);
                    case N.types._export:
                    case N.types._import:
                        if (10 < this.options.ecmaVersion && r === N.types._import) {
                            B.skipWhiteSpace.lastIndex = this.pos;
                            var a, o = B.skipWhiteSpace.exec(this.input),
                                o = this.pos + o[0].length,
                                o = this.input.charCodeAt(o);
                            if (40 === o || 46 === o) return this.parseExpressionStatement(n, this.parseExpression())
                        }
                        return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule) || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'"), r === N.types._import ? this.parseImport(n) : this.parseExport(n, i);
                    default:
                        return this.isAsyncFunction() ? (e && this.unexpected(), this.next(), this.parseFunctionStatement(n, !0, !e)) : (o = this.value, a = this.parseExpression(), r === N.types.name && "Identifier" === a.type && this.eat(N.types.colon) ? this.parseLabeledStatement(n, o, a, e) : this.parseExpressionStatement(n, a))
                }
            }, q.parseBreakContinueStatement = function(e, t) {
                var i = "break" === t;
                this.next(), this.eat(N.types.semi) || this.insertSemicolon() ? e.label = null : this.type !== N.types.name ? this.unexpected() : (e.label = this.parseIdent(), this.semicolon());
                let r = 0;
                for (; r < this.labels.length; ++r) {
                    var n = this.labels[r];
                    if ((null == e.label || n.name === e.label.name) && (null != n.kind && (i || "loop" === n.kind) || e.label && i)) break
                }
                return r === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, i ? "BreakStatement" : "ContinueStatement")
            }, q.parseDebuggerStatement = function(e) {
                return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement")
            }, q.parseDoStatement = function(e) {
                return this.next(), this.labels.push(G), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(N.types._while), e.test = this.parseParenExpression(), 6 <= this.options.ecmaVersion ? this.eat(N.types.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement")
            }, q.parseForStatement = function(e) {
                this.next();
                var t = 9 <= this.options.ecmaVersion && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
                if (this.labels.push(G), this.enterScope(0), this.expect(N.types.parenL), this.type === N.types.semi) return -1 < t && this.unexpected(t), this.parseFor(e, null);
                var i, r = this.isLet();
                if (this.type === N.types._var || this.type === N.types._const || r) return i = this.startNode(), r = r ? "let" : this.value, this.next(), this.parseVar(i, !0, r), this.finishNode(i, "VariableDeclaration"), (this.type === N.types._in || 6 <= this.options.ecmaVersion && this.isContextual("of")) && 1 === i.declarations.length ? (9 <= this.options.ecmaVersion && (this.type === N.types._in ? -1 < t && this.unexpected(t) : e.await = -1 < t), this.parseForIn(e, i)) : (-1 < t && this.unexpected(t), this.parseFor(e, i));
                let n = this.isContextual("let"),
                    s = !1,
                    a = new U.DestructuringErrors,
                    o = this.parseExpression(!(-1 < t) || "await", a);
                return this.type === N.types._in || (s = 6 <= this.options.ecmaVersion && this.isContextual("of")) ? (9 <= this.options.ecmaVersion && (this.type === N.types._in ? -1 < t && this.unexpected(t) : e.await = -1 < t), n && s && this.raise(o.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(o, !1, a), this.checkLValPattern(o), this.parseForIn(e, o)) : (this.checkExpressionErrors(a, !0), -1 < t && this.unexpected(t), this.parseFor(e, o))
            }, q.parseFunctionStatement = function(e, t, i) {
                return this.next(), this.parseFunction(e, Q | (i ? 0 : X), !1, t)
            }, q.parseIfStatement = function(e) {
                return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(N.types._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement")
            }, q.parseReturnStatement = function(e) {
                return this.inFunction || this.options.allowReturnOutsideFunction || this.raise(this.start, "'return' outside of function"), this.next(), this.eat(N.types.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement")
            }, q.parseSwitchStatement = function(e) {
                let t;
                this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(N.types.braceL), this.labels.push(z), this.enterScope(0);
                for (let r = !1; this.type !== N.types.braceR;) {
                    var i;
                    this.type === N.types._case || this.type === N.types._default ? (i = this.type === N.types._case, t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), i ? t.test = this.parseExpression() : (r && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), r = !0, t.test = null), this.expect(N.types.colon)) : (t || this.unexpected(), t.consequent.push(this.parseStatement(null)))
                }
                return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement")
            }, q.parseThrowStatement = function(e) {
                return this.next(), B.lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement")
            }, []),
            Q = (q.parseTryStatement = function(e) {
                var t, i;
                return this.next(), e.block = this.parseBlock(), e.handler = null, this.type === N.types._catch && (t = this.startNode(), this.next(), this.eat(N.types.parenL) ? (t.param = this.parseBindingAtom(), i = "Identifier" === t.param.type, this.enterScope(i ? F.SCOPE_SIMPLE_CATCH : 0), this.checkLValPattern(t.param, i ? F.BIND_SIMPLE_CATCH : F.BIND_LEXICAL), this.expect(N.types.parenR)) : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause")), e.finalizer = this.eat(N.types._finally) ? this.parseBlock() : null, e.handler || e.finalizer || this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement")
            }, q.parseVarStatement = function(e, t) {
                return this.next(), this.parseVar(e, !1, t), this.semicolon(), this.finishNode(e, "VariableDeclaration")
            }, q.parseWhileStatement = function(e) {
                return this.next(), e.test = this.parseParenExpression(), this.labels.push(G), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement")
            }, q.parseWithStatement = function(e) {
                return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement")
            }, q.parseEmptyStatement = function(e) {
                return this.next(), this.finishNode(e, "EmptyStatement")
            }, q.parseLabeledStatement = function(e, t, i, r) {
                for (var n, s = H(this.labels); !(n = s()).done;) n.value.name === t && this.raise(i.start, "Label '" + t + "' is already declared");
                var a = this.type.isLoop ? "loop" : this.type === N.types._switch ? "switch" : null;
                for (let t = this.labels.length - 1; 0 <= t; t--) {
                    var o = this.labels[t];
                    if (o.statementStart !== e.start) break;
                    o.statementStart = this.start, o.kind = a
                }
                return this.labels.push({
                    name: t,
                    kind: a,
                    statementStart: this.start
                }), e.body = this.parseStatement(r ? -1 === r.indexOf("label") ? r + "label" : r : "label"), this.labels.pop(), e.label = i, this.finishNode(e, "LabeledStatement")
            }, q.parseExpressionStatement = function(e, t) {
                return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement")
            }, q.parseBlock = function(e = !0, t = this.startNode(), i) {
                for (t.body = [], this.expect(N.types.braceL), e && this.enterScope(0); this.type !== N.types.braceR;) {
                    var r = this.parseStatement(null);
                    t.body.push(r)
                }
                return i && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement")
            }, q.parseFor = function(e, t) {
                return e.init = t, this.expect(N.types.semi), e.test = this.type === N.types.semi ? null : this.parseExpression(), this.expect(N.types.semi), e.update = this.type === N.types.parenR ? null : this.parseExpression(), this.expect(N.types.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement")
            }, q.parseForIn = function(e, t) {
                var i = this.type === N.types._in;
                return this.next(), "VariableDeclaration" === t.type && null != t.declarations[0].init && (!i || this.options.ecmaVersion < 8 || this.strict || "var" !== t.kind || "Identifier" !== t.declarations[0].id.type) && this.raise(t.start, `${i?"for-in":"for-of"} loop variable declaration may not have an initializer`), e.left = t, e.right = i ? this.parseExpression() : this.parseMaybeAssign(), this.expect(N.types.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, i ? "ForInStatement" : "ForOfStatement")
            }, q.parseVar = function(e, t, i) {
                for (e.declarations = [], e.kind = i;;) {
                    var r = this.startNode();
                    if (this.parseVarId(r, i), this.eat(N.types.eq) ? r.init = this.parseMaybeAssign(t) : "const" !== i || this.type === N.types._in || 6 <= this.options.ecmaVersion && this.isContextual("of") ? "Identifier" === r.id.type || t && (this.type === N.types._in || this.isContextual("of")) ? r.init = null : this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : this.unexpected(), e.declarations.push(this.finishNode(r, "VariableDeclarator")), !this.eat(N.types.comma)) break
                }
                return e
            }, q.parseVarId = function(e, t) {
                e.id = this.parseBindingAtom(), this.checkLValPattern(e.id, "var" === t ? F.BIND_VAR : F.BIND_LEXICAL, !1)
            }, 1),
            X = 2;

        function Y(e, t) {
            var i = e.computed,
                e = e.key;
            return !i && ("Identifier" === e.type && e.name === t || "Literal" === e.type && e.value === t)
        }

        function Z(e, t) {
            var i, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (r) return (r = r.call(e)).next.bind(r);
            if (Array.isArray(e) || (r = function(e, t) {
                    var i;
                    if (e) return "string" == typeof e ? J(e, t) : "Map" === (i = "Object" === (i = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : i) || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? J(e, t) : void 0
                }(e)) || t && e && "number" == typeof e.length) return r && (e = r), i = 0,
                function() {
                    return i >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[i++]
                    }
                };
            throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }

        function J(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var i = 0, r = Array(t); i < t; i++) r[i] = e[i];
            return r
        }
        q.parseFunction = function(e, t, i, r, n) {
            this.initFunction(e), (9 <= this.options.ecmaVersion || 6 <= this.options.ecmaVersion && !r) && (this.type === N.types.star && t & X && this.unexpected(), e.generator = this.eat(N.types.star)), 8 <= this.options.ecmaVersion && (e.async = !!r), t & Q && (e.id = 4 & t && this.type !== N.types.name ? null : this.parseIdent(), e.id) && !(t & X) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? F.BIND_VAR : F.BIND_LEXICAL : F.BIND_FUNCTION);
            var r = this.yieldPos,
                s = this.awaitPos,
                a = this.awaitIdentPos;
            return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope((0, F.functionFlags)(e.async, e.generator)), t & Q || (e.id = this.type === N.types.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, i, !1, n), this.yieldPos = r, this.awaitPos = s, this.awaitIdentPos = a, this.finishNode(e, t & Q ? "FunctionDeclaration" : "FunctionExpression")
        }, q.parseFunctionParams = function(e) {
            this.expect(N.types.parenL), e.params = this.parseBindingList(N.types.parenR, !1, 8 <= this.options.ecmaVersion), this.checkYieldAwaitInDefaultParams()
        }, q.parseClass = function(e, t) {
            this.next();
            var i = this.strict;
            this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
            let r = this.enterClassBody(),
                n = this.startNode(),
                s = !1;
            for (n.body = [], this.expect(N.types.braceL); this.type !== N.types.braceR;) {
                var a = this.parseClassElement(null !== e.superClass);
                a && (n.body.push(a), "MethodDefinition" === a.type && "constructor" === a.kind ? (s && this.raise(a.start, "Duplicate constructor in the same class"), s = !0) : a.key && "PrivateIdentifier" === a.key.type && function(e, t) {
                    let i = t.key.name,
                        r = e[i],
                        n = "true";
                    return "MethodDefinition" !== t.type || "get" !== t.kind && "set" !== t.kind || (n = (t.static ? "s" : "i") + t.kind), "iget" === r && "iset" === n || "iset" === r && "iget" === n || "sget" === r && "sset" === n || "sset" === r && "sget" === n ? (e[i] = "true", 0) : r || (e[i] = n, 0)
                }(r, a) && this.raiseRecoverable(a.key.start, `Identifier '#${a.key.name}' has already been declared`))
            }
            return this.strict = i, this.next(), e.body = this.finishNode(n, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression")
        }, q.parseClassElement = function(e) {
            var t;
            if (this.eat(N.types.semi)) return null;
            let i = this.options.ecmaVersion,
                r = this.startNode(),
                n = "",
                s = !1,
                a = !1,
                o = "method",
                c = !1;
            if (this.eatContextual("static")) {
                if (13 <= i && this.eat(N.types.braceL)) return this.parseClassStaticBlock(r), r;
                this.isClassElementNameStart() || this.type === N.types.star ? c = !0 : n = "static"
            }
            return r.static = c, !n && 8 <= i && this.eatContextual("async") && (!this.isClassElementNameStart() && this.type !== N.types.star || this.canInsertSemicolon() ? n = "async" : a = !0), !n && (9 <= i || !a) && this.eat(N.types.star) && (s = !0), n || a || s || (t = this.value, (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? o = t : n = t)), n ? (r.computed = !1, r.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), r.key.name = n, this.finishNode(r.key, "Identifier")) : this.parseClassElementName(r), i < 13 || this.type === N.types.parenL || "method" !== o || s || a ? ((t = !r.static && Y(r, "constructor")) && "method" !== o && this.raise(r.key.start, "Constructor can't have get/set modifier"), r.kind = t ? "constructor" : o, this.parseClassMethod(r, s, a, t && e)) : this.parseClassField(r), r
        }, q.isClassElementNameStart = function() {
            return this.type === N.types.name || this.type === N.types.privateId || this.type === N.types.num || this.type === N.types.string || this.type === N.types.bracketL || this.type.keyword
        }, q.parseClassElementName = function(e) {
            this.type === N.types.privateId ? ("constructor" === this.value && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e)
        }, q.parseClassMethod = function(e, t, i, r) {
            var n = e.key,
                n = ("constructor" === e.kind ? (t && this.raise(n.start, "Constructor can't be a generator"), i && this.raise(n.start, "Constructor can't be an async method")) : e.static && Y(e, "prototype") && this.raise(n.start, "Classes may not have a static property named prototype"), e.value = this.parseMethod(t, i, r));
            return "get" === e.kind && 0 !== n.params.length && this.raiseRecoverable(n.start, "getter should have no params"), "set" === e.kind && 1 !== n.params.length && this.raiseRecoverable(n.start, "setter should have exactly one param"), "set" === e.kind && "RestElement" === n.params[0].type && this.raiseRecoverable(n.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition")
        }, q.parseClassField = function(e) {
            var t, i;
            return Y(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && Y(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(N.types.eq) ? (i = (t = this.currentThisScope()).inClassFieldInit, t.inClassFieldInit = !0, e.value = this.parseMaybeAssign(), t.inClassFieldInit = i) : e.value = null, this.semicolon(), this.finishNode(e, "PropertyDefinition")
        }, q.parseClassStaticBlock = function(e) {
            e.body = [];
            var t = this.labels;
            for (this.labels = [], this.enterScope(F.SCOPE_CLASS_STATIC_BLOCK | F.SCOPE_SUPER); this.type !== N.types.braceR;) {
                var i = this.parseStatement(null);
                e.body.push(i)
            }
            return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock")
        }, q.parseClassId = function(e, t) {
            this.type === N.types.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, F.BIND_LEXICAL, !1)) : (!0 === t && this.unexpected(), e.id = null)
        }, q.parseClassSuper = function(e) {
            e.superClass = this.eat(N.types._extends) ? this.parseExprSubscripts(!1) : null
        }, q.enterClassBody = function() {
            var e = {
                declared: Object.create(null),
                used: []
            };
            return this.privateNameStack.push(e), e.declared
        }, q.exitClassBody = function() {
            var e = this.privateNameStack.pop(),
                t = e.declared,
                i = e.used,
                e = this.privateNameStack.length,
                r = 0 === e ? null : this.privateNameStack[e - 1];
            for (let e = 0; e < i.length; ++e) {
                var n = i[e];
                (0, V.hasOwn)(t, n.name) || (r ? r.used.push(n) : this.raiseRecoverable(n.start, `Private field '#${n.name}' must be declared in an enclosing class`))
            }
        }, q.parseExport = function(e, t) {
            if (this.next(), this.eat(N.types.star)) return 11 <= this.options.ecmaVersion && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported.name, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== N.types.string && this.unexpected(), e.source = this.parseExprAtom(), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
            if (this.eat(N.types._default)) {
                var i;
                let r;
                return this.checkExport(t, "default", this.lastTokStart), this.type === N.types._function || (r = this.isAsyncFunction()) ? (i = this.startNode(), this.next(), r && this.next(), e.declaration = this.parseFunction(i, 4 | Q, !1, r)) : this.type === N.types._class ? (i = this.startNode(), e.declaration = this.parseClass(i, "nullableID")) : (e.declaration = this.parseMaybeAssign(), this.semicolon()), this.finishNode(e, "ExportDefaultDeclaration")
            }
            if (this.shouldParseExportStatement()) e.declaration = this.parseStatement(null), "VariableDeclaration" === e.declaration.type ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id.name, e.declaration.id.start), e.specifiers = [], e.source = null;
            else {
                if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from")) this.type !== N.types.string && this.unexpected(), e.source = this.parseExprAtom();
                else {
                    for (var r = H(e.specifiers); !(n = r()).done;) {
                        var n = n.value;
                        this.checkUnreserved(n.local), this.checkLocalExport(n.local), "Literal" === n.local.type && this.raise(n.local.start, "A string literal cannot be used as an exported binding without `from`.")
                    }
                    e.source = null
                }
                this.semicolon()
            }
            return this.finishNode(e, "ExportNamedDeclaration")
        }, q.checkExport = function(e, t, i) {
            e && ((0, V.hasOwn)(e, t) && this.raiseRecoverable(i, "Duplicate export '" + t + "'"), e[t] = !0)
        }, q.checkPatternExport = function(e, t) {
            var i = t.type;
            if ("Identifier" === i) this.checkExport(e, t.name, t.start);
            else if ("ObjectPattern" === i)
                for (var r = H(t.properties); !(n = r()).done;) {
                    var n = n.value;
                    this.checkPatternExport(e, n)
                } else if ("ArrayPattern" === i)
                    for (var s = H(t.elements); !(a = s()).done;) {
                        var a = a.value;
                        a && this.checkPatternExport(e, a)
                    } else "Property" === i ? this.checkPatternExport(e, t.value) : "AssignmentPattern" === i ? this.checkPatternExport(e, t.left) : "RestElement" === i ? this.checkPatternExport(e, t.argument) : "ParenthesizedExpression" === i && this.checkPatternExport(e, t.expression)
        }, q.checkVariableExport = function(e, t) {
            if (e)
                for (var i = H(t); !(r = i()).done;) {
                    var r = r.value;
                    this.checkPatternExport(e, r.id)
                }
        }, q.shouldParseExportStatement = function() {
            return "var" === this.type.keyword || "const" === this.type.keyword || "class" === this.type.keyword || "function" === this.type.keyword || this.isLet() || this.isAsyncFunction()
        }, q.parseExportSpecifiers = function(e) {
            let t = [],
                i = !0;
            for (this.expect(N.types.braceL); !this.eat(N.types.braceR);) {
                if (i) i = !1;
                else if (this.expect(N.types.comma), this.afterTrailingComma(N.types.braceR)) break;
                var r = this.startNode();
                r.local = this.parseModuleExportName(), r.exported = this.eatContextual("as") ? this.parseModuleExportName() : r.local, this.checkExport(e, r.exported["Identifier" === r.exported.type ? "name" : "value"], r.exported.start), t.push(this.finishNode(r, "ExportSpecifier"))
            }
            return t
        }, q.parseImport = function(e) {
            return this.next(), this.type === N.types.string ? (e.specifiers = K, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === N.types.string ? this.parseExprAtom() : this.unexpected()), this.semicolon(), this.finishNode(e, "ImportDeclaration")
        }, q.parseImportSpecifiers = function() {
            let e = [],
                t = !0;
            if (this.type === N.types.name) {
                var i = this.startNode();
                if (i.local = this.parseIdent(), this.checkLValSimple(i.local, F.BIND_LEXICAL), e.push(this.finishNode(i, "ImportDefaultSpecifier")), !this.eat(N.types.comma)) return e
            }
            if (this.type === N.types.star) i = this.startNode(), this.next(), this.expectContextual("as"), i.local = this.parseIdent(), this.checkLValSimple(i.local, F.BIND_LEXICAL), e.push(this.finishNode(i, "ImportNamespaceSpecifier"));
            else
                for (this.expect(N.types.braceL); !this.eat(N.types.braceR);) {
                    if (t) t = !1;
                    else if (this.expect(N.types.comma), this.afterTrailingComma(N.types.braceR)) break;
                    var r = this.startNode();
                    r.imported = this.parseModuleExportName(), this.eatContextual("as") ? r.local = this.parseIdent() : (this.checkUnreserved(r.imported), r.local = r.imported), this.checkLValSimple(r.local, F.BIND_LEXICAL), e.push(this.finishNode(r, "ImportSpecifier"))
                }
            return e
        }, q.parseModuleExportName = function() {
            var e;
            return 13 <= this.options.ecmaVersion && this.type === N.types.string ? (e = this.parseLiteral(this.value), V.loneSurrogate.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e) : this.parseIdent(!0)
        }, q.adaptDirectivePrologue = function(e) {
            for (let t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) e[t].directive = e[t].expression.raw.slice(1, -1)
        }, q.isDirectiveCandidate = function(e) {
            return "ExpressionStatement" === e.type && "Literal" === e.expression.type && "string" == typeof e.expression.value && ('"' === this.input[e.start] || "'" === this.input[e.start])
        };
        var q = $.Parser.prototype,
            ee = (q.toAssignable = function(e, t, i) {
                if (6 <= this.options.ecmaVersion && e) switch (e.type) {
                    case "Identifier":
                        this.inAsync && "await" === e.name && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
                        break;
                    case "ObjectPattern":
                    case "ArrayPattern":
                    case "AssignmentPattern":
                    case "RestElement":
                        break;
                    case "ObjectExpression":
                        e.type = "ObjectPattern", i && this.checkPatternErrors(i, !0);
                        for (var r = Z(e.properties); !(n = r()).done;) {
                            var n = n.value;
                            this.toAssignable(n, t), "RestElement" !== n.type || "ArrayPattern" !== n.argument.type && "ObjectPattern" !== n.argument.type || this.raise(n.argument.start, "Unexpected token")
                        }
                        break;
                    case "Property":
                        "init" !== e.kind && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
                        break;
                    case "ArrayExpression":
                        e.type = "ArrayPattern", i && this.checkPatternErrors(i, !0), this.toAssignableList(e.elements, t);
                        break;
                    case "SpreadElement":
                        e.type = "RestElement", this.toAssignable(e.argument, t), "AssignmentPattern" === e.argument.type && this.raise(e.argument.start, "Rest elements cannot have a default value");
                        break;
                    case "AssignmentExpression":
                        "=" !== e.operator && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
                        break;
                    case "ParenthesizedExpression":
                        this.toAssignable(e.expression, t, i);
                        break;
                    case "ChainExpression":
                        this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
                        break;
                    case "MemberExpression":
                        if (!t) break;
                    default:
                        this.raise(e.start, "Assigning to rvalue")
                } else i && this.checkPatternErrors(i, !0);
                return e
            }, q.toAssignableList = function(e, t) {
                var i, r = e.length;
                for (let i = 0; i < r; i++) {
                    var n = e[i];
                    n && this.toAssignable(n, t)
                }
                return r && (i = e[r - 1], 6 === this.options.ecmaVersion) && t && i && "RestElement" === i.type && "Identifier" !== i.argument.type && this.unexpected(i.argument.start), e
            }, q.parseSpread = function(e) {
                var t = this.startNode();
                return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement")
            }, q.parseRestBinding = function() {
                var e = this.startNode();
                return this.next(), 6 === this.options.ecmaVersion && this.type !== N.types.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement")
            }, q.parseBindingAtom = function() {
                if (6 <= this.options.ecmaVersion) switch (this.type) {
                    case N.types.bracketL:
                        var e = this.startNode();
                        return this.next(), e.elements = this.parseBindingList(N.types.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");
                    case N.types.braceL:
                        return this.parseObj(!0)
                }
                return this.parseIdent()
            }, q.parseBindingList = function(e, t, i) {
                let r = [],
                    n = !0;
                for (; !this.eat(e);)
                    if (n ? n = !1 : this.expect(N.types.comma), t && this.type === N.types.comma) r.push(null);
                    else {
                        if (i && this.afterTrailingComma(e)) break;
                        if (this.type === N.types.ellipsis) {
                            var s = this.parseRestBinding();
                            this.parseBindingListItem(s), r.push(s), this.type === N.types.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.expect(e);
                            break
                        }
                        s = this.parseMaybeDefault(this.start, this.startLoc), this.parseBindingListItem(s), r.push(s)
                    } return r
            }, q.parseBindingListItem = function(e) {
                return e
            }, q.parseMaybeDefault = function(e, t, i) {
                return i = i || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(N.types.eq) ? i : ((e = this.startNodeAt(e, t)).left = i, e.right = this.parseMaybeAssign(), this.finishNode(e, "AssignmentPattern"))
            }, q.checkLValSimple = function(e, t = F.BIND_NONE, i) {
                var r = t !== F.BIND_NONE;
                switch (e.type) {
                    case "Identifier":
                        this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (r ? "Binding " : "Assigning to ") + e.name + " in strict mode"), r && (t === F.BIND_LEXICAL && "let" === e.name && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), i && ((0, V.hasOwn)(i, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), i[e.name] = !0), t !== F.BIND_OUTSIDE) && this.declareName(e.name, t, e.start);
                        break;
                    case "ChainExpression":
                        this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
                        break;
                    case "MemberExpression":
                        r && this.raiseRecoverable(e.start, "Binding member expression");
                        break;
                    case "ParenthesizedExpression":
                        return r && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, i);
                    default:
                        this.raise(e.start, (r ? "Binding" : "Assigning to") + " rvalue")
                }
            }, q.checkLValPattern = function(e, t = F.BIND_NONE, i) {
                switch (e.type) {
                    case "ObjectPattern":
                        for (var r = Z(e.properties); !(n = r()).done;) {
                            var n = n.value;
                            this.checkLValInnerPattern(n, t, i)
                        }
                        break;
                    case "ArrayPattern":
                        for (var s = Z(e.elements); !(a = s()).done;) {
                            var a = a.value;
                            a && this.checkLValInnerPattern(a, t, i)
                        }
                        break;
                    default:
                        this.checkLValSimple(e, t, i)
                }
            }, q.checkLValInnerPattern = function(e, t = F.BIND_NONE, i) {
                switch (e.type) {
                    case "Property":
                        this.checkLValInnerPattern(e.value, t, i);
                        break;
                    case "AssignmentPattern":
                        this.checkLValPattern(e.left, t, i);
                        break;
                    case "RestElement":
                        this.checkLValPattern(e.argument, t, i);
                        break;
                    default:
                        this.checkLValPattern(e, t, i)
                }
            }, M(function(e, t) {
                t.__esModule = !0, t.types = t.TokContext = void 0;
                class i {
                    constructor(e, t, i, r, n) {
                        this.token = e, this.isExpr = !!t, this.preserveSpace = !!i, this.override = r, this.generator = !!n
                    }
                }
                let r = {
                    b_stat: new(t.TokContext = i)("{", !1),
                    b_expr: new i("{", !0),
                    b_tmpl: new i("${", !1),
                    p_stat: new i("(", !1),
                    p_expr: new i("(", !0),
                    q_tmpl: new i("`", !0, !0, e => e.tryReadTemplateToken()),
                    f_stat: new i("function", !1),
                    f_expr: new i("function", !0),
                    f_expr_gen: new i("function", !0, !1, null, !0),
                    f_gen: new i("function", !1, !1, null, !0)
                };
                t.types = r, (t = $.Parser.prototype).initialContext = function() {
                    return [r.b_stat]
                }, t.curContext = function() {
                    return this.context[this.context.length - 1]
                }, t.braceIsBlock = function(e) {
                    var t = this.curContext();
                    return t === r.f_expr || t === r.f_stat || (e !== N.types.colon || t !== r.b_stat && t !== r.b_expr ? e === N.types._return || e === N.types.name && this.exprAllowed ? B.lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) : e === N.types._else || e === N.types.semi || e === N.types.eof || e === N.types.parenR || e === N.types.arrow || (e === N.types.braceL ? t === r.b_stat : e !== N.types._var && e !== N.types._const && e !== N.types.name && !this.exprAllowed) : !t.isExpr)
                }, t.inGeneratorContext = function() {
                    for (let t = this.context.length - 1; 1 <= t; t--) {
                        var e = this.context[t];
                        if ("function" === e.token) return e.generator
                    }
                    return !1
                }, t.updateContext = function(e) {
                    var t, i = this.type;
                    i.keyword && e === N.types.dot ? this.exprAllowed = !1 : (t = i.updateContext) ? t.call(this, e) : this.exprAllowed = i.beforeExpr
                }, t.overrideContext = function(e) {
                    this.curContext() !== e && (this.context[this.context.length - 1] = e)
                }, N.types.parenR.updateContext = N.types.braceR.updateContext = function() {
                    if (1 === this.context.length) this.exprAllowed = !0;
                    else {
                        let e = this.context.pop();
                        e === r.b_stat && "function" === this.curContext().token && (e = this.context.pop()), this.exprAllowed = !e.isExpr
                    }
                }, N.types.braceL.updateContext = function(e) {
                    this.context.push(this.braceIsBlock(e) ? r.b_stat : r.b_expr), this.exprAllowed = !0
                }, N.types.dollarBraceL.updateContext = function() {
                    this.context.push(r.b_tmpl), this.exprAllowed = !0
                }, N.types.parenL.updateContext = function(e) {
                    e = e === N.types._if || e === N.types._for || e === N.types._with || e === N.types._while, this.context.push(e ? r.p_stat : r.p_expr), this.exprAllowed = !0
                }, N.types.incDec.updateContext = function() {}, N.types._function.updateContext = N.types._class.updateContext = function(e) {
                    !e.beforeExpr || e === N.types._else || e === N.types.semi && this.curContext() !== r.p_stat || e === N.types._return && B.lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) || (e === N.types.colon || e === N.types.braceL) && this.curContext() === r.b_stat ? this.context.push(r.f_stat) : this.context.push(r.f_expr), this.exprAllowed = !1
                }, N.types.backQuote.updateContext = function() {
                    this.curContext() === r.q_tmpl ? this.context.pop() : this.context.push(r.q_tmpl), this.exprAllowed = !1
                }, N.types.star.updateContext = function(e) {
                    e === N.types._function && (e = this.context.length - 1, this.context[e] === r.f_expr ? this.context[e] = r.f_expr_gen : this.context[e] = r.f_gen), this.exprAllowed = !0
                }, N.types.name.updateContext = function(e) {
                    let t = !1;
                    6 <= this.options.ecmaVersion && e !== N.types.dot && ("of" === this.value && !this.exprAllowed || "yield" === this.value && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t
                }
            }));

        function et(e, t) {
            var i, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (r) return (r = r.call(e)).next.bind(r);
            if (Array.isArray(e) || (r = function(e, t) {
                    var i;
                    if (e) return "string" == typeof e ? ei(e, t) : "Map" === (i = "Object" === (i = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : i) || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? ei(e, t) : void 0
                }(e)) || t && e && "number" == typeof e.length) return r && (e = r), i = 0,
                function() {
                    return i >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[i++]
                    }
                };
            throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }

        function ei(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var i = 0, r = Array(t); i < t; i++) r[i] = e[i];
            return r
        }(q = $.Parser.prototype).checkPropClash = function(e, t, i) {
            if (!(9 <= this.options.ecmaVersion && "SpreadElement" === e.type || 6 <= this.options.ecmaVersion && (e.computed || e.method || e.shorthand))) {
                let r = e.key,
                    n;
                switch (r.type) {
                    case "Identifier":
                        n = r.name;
                        break;
                    case "Literal":
                        n = String(r.value);
                        break;
                    default:
                        return
                }
                if (e = e.kind, 6 <= this.options.ecmaVersion) "__proto__" === n && "init" === e && (t.proto && (i ? i.doubleProto < 0 && (i.doubleProto = r.start) : this.raiseRecoverable(r.start, "Redefinition of __proto__ property")), t.proto = !0);
                else {
                    let i = t[n = "$" + n];
                    i ? ("init" === e ? this.strict && i.init || i.get || i.set : i.init || i[e]) && this.raiseRecoverable(r.start, "Redefinition of property") : i = t[n] = {
                        init: !1,
                        get: !1,
                        set: !1
                    }, i[e] = !0
                }
            }
        }, q.parseExpression = function(e, t) {
            var i = this.start,
                r = this.startLoc,
                n = this.parseMaybeAssign(e, t);
            if (this.type !== N.types.comma) return n;
            var s = this.startNodeAt(i, r);
            for (s.expressions = [n]; this.eat(N.types.comma);) s.expressions.push(this.parseMaybeAssign(e, t));
            return this.finishNode(s, "SequenceExpression")
        }, q.parseMaybeAssign = function(e, t, i) {
            if (this.isContextual("yield")) {
                if (this.inGenerator) return this.parseYield(e);
                this.exprAllowed = !1
            }
            let r = !1,
                n = -1,
                s = -1,
                a = -1;
            t ? (n = t.parenthesizedAssign, s = t.trailingComma, a = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new U.DestructuringErrors, r = !0);
            var o = this.start,
                c = this.startLoc;
            this.type !== N.types.parenL && this.type !== N.types.name || (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = "await" === e);
            let l = this.parseMaybeConditional(e, t);
            return i && (l = i.call(this, l, o, c)), this.type.isAssign ? ((i = this.startNodeAt(o, c)).operator = this.value, this.type === N.types.eq && (l = this.toAssignable(l, !1, t)), r || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= l.start && (t.shorthandAssign = -1), this.type === N.types.eq ? this.checkLValPattern(l) : this.checkLValSimple(l), i.left = l, this.next(), i.right = this.parseMaybeAssign(e), -1 < a && (t.doubleProto = a), this.finishNode(i, "AssignmentExpression")) : (r && this.checkExpressionErrors(t, !0), -1 < n && (t.parenthesizedAssign = n), -1 < s && (t.trailingComma = s), l)
        }, q.parseMaybeConditional = function(e, t) {
            var i = this.start,
                r = this.startLoc,
                n = this.parseExprOps(e, t);
            return !this.checkExpressionErrors(t) && this.eat(N.types.question) ? ((t = this.startNodeAt(i, r)).test = n, t.consequent = this.parseMaybeAssign(), this.expect(N.types.colon), t.alternate = this.parseMaybeAssign(e), this.finishNode(t, "ConditionalExpression")) : n
        }, q.parseExprOps = function(e, t) {
            var i = this.start,
                r = this.startLoc,
                n = this.parseMaybeUnary(t, !1, !1, e);
            return this.checkExpressionErrors(t) || n.start === i && "ArrowFunctionExpression" === n.type ? n : this.parseExprOp(n, i, r, -1, e)
        }, q.parseExprOp = function(e, t, i, r, n) {
            var s, a, o, c, l;
            let p = this.type.binop;
            return null != p && (!n || this.type !== N.types._in) && p > r ? (s = this.type === N.types.logicalOR || this.type === N.types.logicalAND, (a = this.type === N.types.coalesce) && (p = N.types.logicalAND.binop), o = this.value, this.next(), c = this.start, l = this.startLoc, c = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, n), c, l, p, n), l = this.buildBinary(t, i, e, c, o, s || a), (s && this.type === N.types.coalesce || a && (this.type === N.types.logicalOR || this.type === N.types.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(l, t, i, r, n)) : e
        }, q.buildBinary = function(e, t, i, r, n, s) {
            return "PrivateIdentifier" === r.type && this.raise(r.start, "Private identifier can only be left side of binary expression"), (e = this.startNodeAt(e, t)).left = i, e.operator = n, e.right = r, this.finishNode(e, s ? "LogicalExpression" : "BinaryExpression")
        }, q.parseMaybeUnary = function(e, t, i, r) {
            let n = this.start,
                s = this.startLoc,
                a;
            if (this.isContextual("await") && this.canAwait) a = this.parseAwait(r), t = !0;
            else if (this.type.prefix) {
                var o = this.startNode(),
                    c = this.type === N.types.incDec;
                o.operator = this.value, o.prefix = !0, this.next(), o.argument = this.parseMaybeUnary(null, !0, c, r), this.checkExpressionErrors(e, !0), c ? this.checkLValSimple(o.argument) : this.strict && "delete" === o.operator && "Identifier" === o.argument.type ? this.raiseRecoverable(o.start, "Deleting local variable in strict mode") : "delete" === o.operator && function e(t) {
                    return "MemberExpression" === t.type && "PrivateIdentifier" === t.property.type || "ChainExpression" === t.type && e(t.expression)
                }(o.argument) ? this.raiseRecoverable(o.start, "Private fields can not be deleted") : t = !0, a = this.finishNode(o, c ? "UpdateExpression" : "UnaryExpression")
            } else if (t || this.type !== N.types.privateId) {
                if (a = this.parseExprSubscripts(e, r), this.checkExpressionErrors(e)) return a;
                for (; this.type.postfix && !this.canInsertSemicolon();) {
                    var l = this.startNodeAt(n, s);
                    l.operator = this.value, l.prefix = !1, l.argument = a, this.checkLValSimple(a), this.next(), a = this.finishNode(l, "UpdateExpression")
                }
            } else(r || 0 === this.privateNameStack.length) && this.unexpected(), a = this.parsePrivateIdent(), this.type !== N.types._in && this.unexpected();
            return !i && this.eat(N.types.starstar) ? t ? void this.unexpected(this.lastTokStart) : this.buildBinary(n, s, a, this.parseMaybeUnary(null, !1, !1, r), "**", !1) : a
        }, q.parseExprSubscripts = function(e, t) {
            var i = this.start,
                r = this.startLoc,
                n = this.parseExprAtom(e, t);
            return "ArrowFunctionExpression" === n.type && ")" !== this.input.slice(this.lastTokStart, this.lastTokEnd) || (n = this.parseSubscripts(n, i, r, !1, t), e && "MemberExpression" === n.type && (e.parenthesizedAssign >= n.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= n.start && (e.parenthesizedBind = -1), e.trailingComma >= n.start) && (e.trailingComma = -1)), n
        }, q.parseSubscripts = function(e, t, i, r, n) {
            let s = 8 <= this.options.ecmaVersion && "Identifier" === e.type && "async" === e.name && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start == 5 && this.potentialArrowAt === e.start,
                a = !1;
            for (;;) {
                var o;
                let c = this.parseSubscript(e, t, i, r, s, a, n);
                if (c.optional && (a = !0), c === e || "ArrowFunctionExpression" === c.type) return a && ((o = this.startNodeAt(t, i)).expression = c, c = this.finishNode(o, "ChainExpression")), c;
                e = c
            }
        }, q.parseSubscript = function(e, t, i, r, n, s, a) {
            var o = 11 <= this.options.ecmaVersion,
                c = o && this.eat(N.types.questionDot),
                l = (r && c && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions"), this.eat(N.types.bracketL));
            if (l || c && this.type !== N.types.parenL && this.type !== N.types.backQuote || this.eat(N.types.dot)) {
                var p = this.startNodeAt(t, i);
                p.object = e, l ? (p.property = this.parseExpression(), this.expect(N.types.bracketR)) : this.type === N.types.privateId && "Super" !== e.type ? p.property = this.parsePrivateIdent() : p.property = this.parseIdent("never" !== this.options.allowReserved), p.computed = !!l, o && (p.optional = c || p.object.optional), e = this.finishNode(p, "MemberExpression")
            } else if (!r && this.eat(N.types.parenL)) {
                var l = new U.DestructuringErrors,
                    p = this.yieldPos,
                    r = this.awaitPos,
                    h = this.awaitIdentPos,
                    u = (this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.parseExprList(N.types.parenR, 8 <= this.options.ecmaVersion, !1, l));
                if (n && !c && !this.canInsertSemicolon() && this.eat(N.types.arrow)) return this.checkPatternErrors(l, !1), this.checkYieldAwaitInDefaultParams(), 0 < this.awaitIdentPos && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = p, this.awaitPos = r, this.awaitIdentPos = h, this.parseArrowExpression(this.startNodeAt(t, i), u, !0, a);
                this.checkExpressionErrors(l, !0), this.yieldPos = p || this.yieldPos, this.awaitPos = r || this.awaitPos, this.awaitIdentPos = h || this.awaitIdentPos, (n = this.startNodeAt(t, i)).callee = e, n.arguments = u, o && (n.optional = c), e = this.finishNode(n, "CallExpression")
            } else this.type === N.types.backQuote && ((c || s) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions"), (a = this.startNodeAt(t, i)).tag = e, a.quasi = this.parseTemplate({
                isTagged: !0
            }), e = this.finishNode(a, "TaggedTemplateExpression"));
            return e
        }, q.parseExprAtom = function(e, t) {
            this.type === N.types.slash && this.readRegexp();
            let i, r = this.potentialArrowAt === this.start;
            switch (this.type) {
                case N.types._super:
                    return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), i = this.startNode(), this.next(), this.type !== N.types.parenL || this.allowDirectSuper || this.raise(i.start, "super() call outside constructor of a subclass"), this.type !== N.types.dot && this.type !== N.types.bracketL && this.type !== N.types.parenL && this.unexpected(), this.finishNode(i, "Super");
                case N.types._this:
                    return i = this.startNode(), this.next(), this.finishNode(i, "ThisExpression");
                case N.types.name:
                    let n = this.start,
                        s = this.startLoc,
                        a = this.containsEsc,
                        o = this.parseIdent(!1);
                    if (8 <= this.options.ecmaVersion && !a && "async" === o.name && !this.canInsertSemicolon() && this.eat(N.types._function)) return this.overrideContext(ee.types.f_expr), this.parseFunction(this.startNodeAt(n, s), 0, !1, !0, t);
                    if (r && !this.canInsertSemicolon()) {
                        if (this.eat(N.types.arrow)) return this.parseArrowExpression(this.startNodeAt(n, s), [o], !1, t);
                        if (8 <= this.options.ecmaVersion && "async" === o.name && this.type === N.types.name && !a && (!this.potentialArrowInForAwait || "of" !== this.value || this.containsEsc)) return o = this.parseIdent(!1), !this.canInsertSemicolon() && this.eat(N.types.arrow) || this.unexpected(), this.parseArrowExpression(this.startNodeAt(n, s), [o], !0, t)
                    }
                    return o;
                case N.types.regexp:
                    var c = this.value;
                    return (i = this.parseLiteral(c.value)).regex = {
                        pattern: c.pattern,
                        flags: c.flags
                    }, i;
                case N.types.num:
                case N.types.string:
                    return this.parseLiteral(this.value);
                case N.types._null:
                case N.types._true:
                case N.types._false:
                    return (i = this.startNode()).value = this.type === N.types._null ? null : this.type === N.types._true, i.raw = this.type.keyword, this.next(), this.finishNode(i, "Literal");
                case N.types.parenL:
                    var c = this.start,
                        l = this.parseParenAndDistinguishExpression(r, t);
                    return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(l) && (e.parenthesizedAssign = c), e.parenthesizedBind < 0) && (e.parenthesizedBind = c), l;
                case N.types.bracketL:
                    return i = this.startNode(), this.next(), i.elements = this.parseExprList(N.types.bracketR, !0, !0, e), this.finishNode(i, "ArrayExpression");
                case N.types.braceL:
                    return this.overrideContext(ee.types.b_expr), this.parseObj(!1, e);
                case N.types._function:
                    return i = this.startNode(), this.next(), this.parseFunction(i, 0);
                case N.types._class:
                    return this.parseClass(this.startNode(), !1);
                case N.types._new:
                    return this.parseNew();
                case N.types.backQuote:
                    return this.parseTemplate();
                case N.types._import:
                    return 11 <= this.options.ecmaVersion ? this.parseExprImport() : this.unexpected();
                default:
                    this.unexpected()
            }
        }, q.parseExprImport = function() {
            var e = this.startNode(),
                t = (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.parseIdent(!0));
            switch (this.type) {
                case N.types.parenL:
                    return this.parseDynamicImport(e);
                case N.types.dot:
                    return e.meta = t, this.parseImportMeta(e);
                default:
                    this.unexpected()
            }
        }, q.parseDynamicImport = function(e) {
            var t;
            return this.next(), e.source = this.parseMaybeAssign(), this.eat(N.types.parenR) || (t = this.start, this.eat(N.types.comma) && this.eat(N.types.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t)), this.finishNode(e, "ImportExpression")
        }, q.parseImportMeta = function(e) {
            this.next();
            var t = this.containsEsc;
            return e.property = this.parseIdent(!0), "meta" !== e.property.name && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), "module" === this.options.sourceType || this.options.allowImportExportEverywhere || this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty")
        }, q.parseLiteral = function(e) {
            var t = this.startNode();
            return t.value = e, t.raw = this.input.slice(this.start, this.end), 110 === t.raw.charCodeAt(t.raw.length - 1) && (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(t, "Literal")
        }, q.parseParenExpression = function() {
            this.expect(N.types.parenL);
            var e = this.parseExpression();
            return this.expect(N.types.parenR), e
        }, q.parseParenAndDistinguishExpression = function(e, t) {
            let i = this.start,
                r = this.startLoc,
                n, s = 8 <= this.options.ecmaVersion;
            if (6 <= this.options.ecmaVersion) {
                this.next();
                let c = this.start,
                    l = this.startLoc,
                    p = [],
                    h = !0,
                    u = !1,
                    d = new U.DestructuringErrors,
                    m = this.yieldPos,
                    f = this.awaitPos,
                    y;
                for (this.yieldPos = 0, this.awaitPos = 0; this.type !== N.types.parenR;) {
                    if (h ? h = !1 : this.expect(N.types.comma), s && this.afterTrailingComma(N.types.parenR, !0)) {
                        u = !0;
                        break
                    }
                    if (this.type === N.types.ellipsis) {
                        y = this.start, p.push(this.parseParenItem(this.parseRestBinding())), this.type === N.types.comma && this.raise(this.start, "Comma is not permitted after the rest element");
                        break
                    }
                    p.push(this.parseMaybeAssign(!1, d, this.parseParenItem))
                }
                var a = this.lastTokEnd,
                    o = this.lastTokEndLoc;
                if (this.expect(N.types.parenR), e && !this.canInsertSemicolon() && this.eat(N.types.arrow)) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = m, this.awaitPos = f, this.parseParenArrowList(i, r, p, t);
                p.length && !u || this.unexpected(this.lastTokStart), y && this.unexpected(y), this.checkExpressionErrors(d, !0), this.yieldPos = m || this.yieldPos, this.awaitPos = f || this.awaitPos, 1 < p.length ? ((n = this.startNodeAt(c, l)).expressions = p, this.finishNodeAt(n, "SequenceExpression", a, o)) : n = p[0]
            } else n = this.parseParenExpression();
            return this.options.preserveParens ? ((e = this.startNodeAt(i, r)).expression = n, this.finishNode(e, "ParenthesizedExpression")) : n
        }, q.parseParenItem = function(e) {
            return e
        }, q.parseParenArrowList = function(e, t, i, r) {
            return this.parseArrowExpression(this.startNodeAt(e, t), i, !1, r)
        };
        let er = [];
        q.parseNew = function() {
            this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
            var e, t, i = this.startNode(),
                r = this.parseIdent(!0);
            return 6 <= this.options.ecmaVersion && this.eat(N.types.dot) ? (i.meta = r, r = this.containsEsc, i.property = this.parseIdent(!0), "target" !== i.property.name && this.raiseRecoverable(i.property.start, "The only valid meta property for new is 'new.target'"), r && this.raiseRecoverable(i.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(i.start, "'new.target' can only be used in functions and class static block"), this.finishNode(i, "MetaProperty")) : (r = this.start, e = this.startLoc, t = this.type === N.types._import, i.callee = this.parseSubscripts(this.parseExprAtom(), r, e, !0, !1), t && "ImportExpression" === i.callee.type && this.raise(r, "Cannot use new with import()"), this.eat(N.types.parenL) ? i.arguments = this.parseExprList(N.types.parenR, 8 <= this.options.ecmaVersion, !1) : i.arguments = er, this.finishNode(i, "NewExpression"))
        }, q.parseTemplateElement = function({
            isTagged: e
        }) {
            var t = this.startNode();
            return this.type === N.types.invalidTemplate ? (e || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), t.value = {
                raw: this.value,
                cooked: null
            }) : t.value = {
                raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
                cooked: this.value
            }, this.next(), t.tail = this.type === N.types.backQuote, this.finishNode(t, "TemplateElement")
        }, q.parseTemplate = function({
            isTagged: e = !1
        } = {}) {
            var t = this.startNode();
            this.next(), t.expressions = [];
            let i = this.parseTemplateElement({
                isTagged: e
            });
            for (t.quasis = [i]; !i.tail;) this.type === N.types.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(N.types.dollarBraceL), t.expressions.push(this.parseExpression()), this.expect(N.types.braceR), t.quasis.push(i = this.parseTemplateElement({
                isTagged: e
            }));
            return this.next(), this.finishNode(t, "TemplateLiteral")
        }, q.isAsyncProp = function(e) {
            return !e.computed && "Identifier" === e.key.type && "async" === e.key.name && (this.type === N.types.name || this.type === N.types.num || this.type === N.types.string || this.type === N.types.bracketL || this.type.keyword || 9 <= this.options.ecmaVersion && this.type === N.types.star) && !B.lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
        }, q.parseObj = function(e, t) {
            let i = this.startNode(),
                r = !0,
                n = {};
            for (i.properties = [], this.next(); !this.eat(N.types.braceR);) {
                if (r) r = !1;
                else if (this.expect(N.types.comma), 5 <= this.options.ecmaVersion && this.afterTrailingComma(N.types.braceR)) break;
                var s = this.parseProperty(e, t);
                e || this.checkPropClash(s, n, t), i.properties.push(s)
            }
            return this.finishNode(i, e ? "ObjectPattern" : "ObjectExpression")
        }, q.parseProperty = function(e, t) {
            let i = this.startNode(),
                r, n, s, a;
            if (9 <= this.options.ecmaVersion && this.eat(N.types.ellipsis)) return e ? (i.argument = this.parseIdent(!1), this.type === N.types.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.finishNode(i, "RestElement")) : (this.type === N.types.parenL && t && (t.parenthesizedAssign < 0 && (t.parenthesizedAssign = this.start), t.parenthesizedBind < 0) && (t.parenthesizedBind = this.start), i.argument = this.parseMaybeAssign(!1, t), this.type === N.types.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(i, "SpreadElement"));
            6 <= this.options.ecmaVersion && (i.method = !1, i.shorthand = !1, (e || t) && (s = this.start, a = this.startLoc), e || (r = this.eat(N.types.star)));
            var o = this.containsEsc;
            return this.parsePropertyName(i), !e && !o && 8 <= this.options.ecmaVersion && !r && this.isAsyncProp(i) ? (n = !0, r = 9 <= this.options.ecmaVersion && this.eat(N.types.star), this.parsePropertyName(i, t)) : n = !1, this.parsePropertyValue(i, e, r, n, s, a, t, o), this.finishNode(i, "Property")
        }, q.parsePropertyValue = function(e, t, i, r, n, s, a, o) {
            (i || r) && this.type === N.types.colon && this.unexpected(), this.eat(N.types.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, a), e.kind = "init") : 6 <= this.options.ecmaVersion && this.type === N.types.parenL ? (t && this.unexpected(), e.kind = "init", e.method = !0, e.value = this.parseMethod(i, r)) : t || o || !(5 <= this.options.ecmaVersion) || e.computed || "Identifier" !== e.key.type || "get" !== e.key.name && "set" !== e.key.name || this.type === N.types.comma || this.type === N.types.braceR || this.type === N.types.eq ? 6 <= this.options.ecmaVersion && !e.computed && "Identifier" === e.key.type ? ((i || r) && this.unexpected(), this.checkUnreserved(e.key), "await" !== e.key.name || this.awaitIdentPos || (this.awaitIdentPos = n), e.kind = "init", t ? e.value = this.parseMaybeDefault(n, s, this.copyNode(e.key)) : this.type === N.types.eq && a ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start), e.value = this.parseMaybeDefault(n, s, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.shorthand = !0) : this.unexpected() : ((i || r) && this.unexpected(), e.kind = e.key.name, this.parsePropertyName(e), e.value = this.parseMethod(!1), o = "get" === e.kind ? 0 : 1, e.value.params.length !== o ? (t = e.value.start, "get" === e.kind ? this.raiseRecoverable(t, "getter should have no params") : this.raiseRecoverable(t, "setter should have exactly one param")) : "set" === e.kind && "RestElement" === e.value.params[0].type && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params"))
        }, q.parsePropertyName = function(e) {
            if (6 <= this.options.ecmaVersion) {
                if (this.eat(N.types.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(N.types.bracketR), e.key;
                e.computed = !1
            }
            return e.key = this.type === N.types.num || this.type === N.types.string ? this.parseExprAtom() : this.parseIdent("never" !== this.options.allowReserved)
        }, q.initFunction = function(e) {
            e.id = null, 6 <= this.options.ecmaVersion && (e.generator = e.expression = !1), 8 <= this.options.ecmaVersion && (e.async = !1)
        }, q.parseMethod = function(e, t, i) {
            var r = this.startNode(),
                n = this.yieldPos,
                s = this.awaitPos,
                a = this.awaitIdentPos;
            return this.initFunction(r), 6 <= this.options.ecmaVersion && (r.generator = e), 8 <= this.options.ecmaVersion && (r.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope((0, F.functionFlags)(t, r.generator) | F.SCOPE_SUPER | (i ? F.SCOPE_DIRECT_SUPER : 0)), this.expect(N.types.parenL), r.params = this.parseBindingList(N.types.parenR, !1, 8 <= this.options.ecmaVersion), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(r, !1, !0, !1), this.yieldPos = n, this.awaitPos = s, this.awaitIdentPos = a, this.finishNode(r, "FunctionExpression")
        }, q.parseArrowExpression = function(e, t, i, r) {
            var n = this.yieldPos,
                s = this.awaitPos,
                a = this.awaitIdentPos;
            return this.enterScope((0, F.functionFlags)(i, !1) | F.SCOPE_ARROW), this.initFunction(e), 8 <= this.options.ecmaVersion && (e.async = !!i), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, r), this.yieldPos = n, this.awaitPos = s, this.awaitIdentPos = a, this.finishNode(e, "ArrowFunctionExpression")
        }, q.parseFunctionBody = function(e, t, i, r) {
            let n = t && this.type !== N.types.braceL,
                s = this.strict,
                a = !1;
            n ? (e.body = this.parseMaybeAssign(r), e.expression = !0, this.checkParams(e, !1)) : (r = 7 <= this.options.ecmaVersion && !this.isSimpleParamList(e.params), (!s || r) && (a = this.strictDirective(this.end)) && r && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"), r = this.labels, this.labels = [], a && (this.strict = !0), this.checkParams(e, !s && !a && !t && !i && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, F.BIND_OUTSIDE), e.body = this.parseBlock(!1, void 0, a && !s), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = r), this.exitScope()
        }, q.isSimpleParamList = function(e) {
            for (var t, i = et(e); !(t = i()).done;)
                if ("Identifier" !== t.value.type) return !1;
            return !0
        }, q.checkParams = function(e, t) {
            for (var i = Object.create(null), r = et(e.params); !(n = r()).done;) {
                var n = n.value;
                this.checkLValInnerPattern(n, F.BIND_VAR, t ? null : i)
            }
        }, q.parseExprList = function(e, t, i, r) {
            let n = [],
                s = !0;
            for (; !this.eat(e);) {
                let a;
                if (s) s = !1;
                else if (this.expect(N.types.comma), t && this.afterTrailingComma(e)) break;
                i && this.type === N.types.comma ? a = null : this.type === N.types.ellipsis ? (a = this.parseSpread(r), r && this.type === N.types.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : a = this.parseMaybeAssign(!1, r), n.push(a)
            }
            return n
        }, q.checkUnreserved = function({
            start: e,
            end: t,
            name: i
        }) {
            this.inGenerator && "yield" === i && this.raiseRecoverable(e, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && "await" === i && this.raiseRecoverable(e, "Cannot use 'await' as identifier inside an async function"), this.currentThisScope().inClassFieldInit && "arguments" === i && this.raiseRecoverable(e, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && ("arguments" === i || "await" === i) && this.raise(e, `Cannot use ${i} in class static initialization block`), this.keywords.test(i) && this.raise(e, `Unexpected keyword '${i}'`), this.options.ecmaVersion < 6 && -1 !== this.input.slice(e, t).indexOf("\\") || (this.strict ? this.reservedWordsStrict : this.reservedWords).test(i) && (this.inAsync || "await" !== i || this.raiseRecoverable(e, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(e, `The keyword '${i}' is reserved`))
        }, q.parseIdent = function(e, t) {
            var i = this.startNode();
            return this.type === N.types.name ? i.name = this.value : this.type.keyword ? (i.name = this.type.keyword, "class" !== i.name && "function" !== i.name || this.lastTokEnd === this.lastTokStart + 1 && 46 === this.input.charCodeAt(this.lastTokStart) || this.context.pop()) : this.unexpected(), this.next(!!e), this.finishNode(i, "Identifier"), e || (this.checkUnreserved(i), "await" !== i.name) || this.awaitIdentPos || (this.awaitIdentPos = i.start), i
        }, q.parsePrivateIdent = function() {
            var e = this.startNode();
            return this.type === N.types.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), 0 === this.privateNameStack.length ? this.raise(e.start, `Private field '#${e.name}' must be declared in an enclosing class`) : this.privateNameStack[this.privateNameStack.length - 1].used.push(e), e
        }, q.parseYield = function(e) {
            this.yieldPos || (this.yieldPos = this.start);
            var t = this.startNode();
            return this.next(), this.type === N.types.semi || this.canInsertSemicolon() || this.type !== N.types.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(N.types.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression")
        }, q.parseAwait = function(e) {
            this.awaitPos || (this.awaitPos = this.start);
            var t = this.startNode();
            return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, "AwaitExpression")
        }, (q = $.Parser.prototype).raise = function(e, t) {
            var i = (0, j.getLineInfo)(this.input, e),
                t = SyntaxError(t += " (" + i.line + ":" + i.column + ")");
            throw t.pos = e, t.loc = i, t.raisedAt = this.pos, t
        }, q.raiseRecoverable = q.raise, q.curPosition = function() {
            if (this.options.locations) return new j.Position(this.curLine, this.pos - this.lineStart)
        }, q = $.Parser.prototype;
        class en {
            constructor(e) {
                this.flags = e, this.var = [], this.lexical = [], this.functions = [], this.inClassFieldInit = !1
            }
        }
        q.enterScope = function(e) {
            this.scopeStack.push(new en(e))
        }, q.exitScope = function() {
            this.scopeStack.pop()
        }, q.treatFunctionsAsVarInScope = function(e) {
            return e.flags & F.SCOPE_FUNCTION || !this.inModule && e.flags & F.SCOPE_TOP
        }, q.declareName = function(e, t, i) {
            let r = !1;
            if (t === F.BIND_LEXICAL) {
                var n = this.currentScope();
                r = -1 < n.lexical.indexOf(e) || -1 < n.functions.indexOf(e) || -1 < n.var.indexOf(e), n.lexical.push(e), this.inModule && n.flags & F.SCOPE_TOP && delete this.undefinedExports[e]
            } else if (t === F.BIND_SIMPLE_CATCH) this.currentScope().lexical.push(e);
            else if (t === F.BIND_FUNCTION) n = this.currentScope(), r = this.treatFunctionsAsVar ? -1 < n.lexical.indexOf(e) : -1 < n.lexical.indexOf(e) || -1 < n.var.indexOf(e), n.functions.push(e);
            else
                for (let t = this.scopeStack.length - 1; 0 <= t; --t) {
                    var s = this.scopeStack[t];
                    if (-1 < s.lexical.indexOf(e) && !(s.flags & F.SCOPE_SIMPLE_CATCH && s.lexical[0] === e) || !this.treatFunctionsAsVarInScope(s) && -1 < s.functions.indexOf(e)) {
                        r = !0;
                        break
                    }
                    if (s.var.push(e), this.inModule && s.flags & F.SCOPE_TOP && delete this.undefinedExports[e], s.flags & F.SCOPE_VAR) break
                }
            r && this.raiseRecoverable(i, `Identifier '${e}' has already been declared`)
        }, q.checkLocalExport = function(e) {
            -1 === this.scopeStack[0].lexical.indexOf(e.name) && -1 === this.scopeStack[0].var.indexOf(e.name) && (this.undefinedExports[e.name] = e)
        }, q.currentScope = function() {
            return this.scopeStack[this.scopeStack.length - 1]
        }, q.currentVarScope = function() {
            for (let t = this.scopeStack.length - 1;; t--) {
                var e = this.scopeStack[t];
                if (e.flags & F.SCOPE_VAR) return e
            }
        }, q.currentThisScope = function() {
            for (let t = this.scopeStack.length - 1;; t--) {
                var e = this.scopeStack[t];
                if (e.flags & F.SCOPE_VAR && !(e.flags & F.SCOPE_ARROW)) return e
            }
        };
        var es = M(function(e, t) {
                t.__esModule = !0, t.Node = void 0;
                class i {
                    constructor(e, t, i) {
                        this.type = "", this.start = t, this.end = 0, e.options.locations && (this.loc = new j.SourceLocation(e, i)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0])
                    }
                }

                function r(e, t, i, r) {
                    return e.type = t, e.end = i, this.options.locations && (e.loc.end = r), this.options.ranges && (e.range[1] = i), e
                }
                t.Node = i, (t = $.Parser.prototype).startNode = function() {
                    return new i(this, this.start, this.startLoc)
                }, t.startNodeAt = function(e, t) {
                    return new i(this, e, t)
                }, t.finishNode = function(e, t) {
                    return r.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc)
                }, t.finishNodeAt = function(e, t, i, n) {
                    return r.call(this, e, t, i, n)
                }, t.copyNode = function(e) {
                    var t, r = new i(this, e.start, this.startLoc);
                    for (t in e) r[t] = e[t];
                    return r
                }
            }),
            ea = M(function(e, t) {
                t.__esModule = !0, t.default = void 0;
                let i = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",
                    r = i + " Extended_Pictographic",
                    n = r + " EBase EComp EMod EPres ExtPict",
                    s = {
                        9: i,
                        10: r,
                        11: r,
                        12: n,
                        13: n
                    },
                    a = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",
                    o = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",
                    c = o + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",
                    l = c + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",
                    p = l + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",
                    h = {
                        9: o,
                        10: c,
                        11: l,
                        12: p,
                        13: p + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith"
                    },
                    u = {};
                for (var d, m = 0, f = [9, 10, 11, 12, 13]; m < f.length; m++)(d = u[d = f[m]] = {
                    binary: (0, V.wordsRegexp)(s[d] + " " + a),
                    nonBinary: {
                        General_Category: (0, V.wordsRegexp)(a),
                        Script: (0, V.wordsRegexp)(h[d])
                    }
                }).nonBinary.Script_Extensions = d.nonBinary.Script, d.nonBinary.gc = d.nonBinary.General_Category, d.nonBinary.sc = d.nonBinary.Script, d.nonBinary.scx = d.nonBinary.Script_Extensions;
                t.default = u, e.exports = t.default
            }),
            eo = M(function(e, t) {
                t.__esModule = !0, t.RegExpValidationState = void 0;
                var i = ea && ea.__esModule ? ea : {
                    default: ea
                };

                function r(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var i = 0, r = Array(t); i < t; i++) r[i] = e[i];
                    return r
                }
                var n = $.Parser.prototype;

                function s(e) {
                    return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(55296 + ((e -= 65536) >> 10), 56320 + (1023 & e))
                }

                function a(e) {
                    return 36 === e || 40 <= e && e <= 43 || 46 === e || 63 === e || 91 <= e && e <= 94 || 123 <= e && e <= 125
                }

                function o(e) {
                    return 65 <= e && e <= 90 || 97 <= e && e <= 122
                }

                function c(e) {
                    return o(e) || 95 === e
                }

                function l(e) {
                    return 48 <= e && e <= 57
                }

                function p(e) {
                    return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102
                }

                function h(e) {
                    return 65 <= e && e <= 70 ? e - 65 + 10 : 97 <= e && e <= 102 ? e - 97 + 10 : e - 48
                }

                function u(e) {
                    return 48 <= e && e <= 55
                }
                t.RegExpValidationState = class {
                    constructor(e) {
                        this.parser = e, this.validFlags = "gim" + (6 <= e.options.ecmaVersion ? "uy" : "") + (9 <= e.options.ecmaVersion ? "s" : "") + (13 <= e.options.ecmaVersion ? "d" : ""), this.unicodeProperties = i.default[13 <= e.options.ecmaVersion ? 13 : e.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = [], this.backReferenceNames = []
                    }
                    reset(e, t, i) {
                        var r = -1 !== i.indexOf("u");
                        this.start = 0 | e, this.source = t + "", this.flags = i, this.switchU = r && 6 <= this.parser.options.ecmaVersion, this.switchN = r && 9 <= this.parser.options.ecmaVersion
                    }
                    raise(e) {
                        this.parser.raiseRecoverable(this.start, `Invalid regular expression: /${this.source}/: ` + e)
                    }
                    at(e, t = !1) {
                        var i, r = this.source,
                            n = r.length;
                        return n <= e ? -1 : (i = r.charCodeAt(e), !(!t && !this.switchU || i <= 55295 || 57344 <= i || n <= e + 1) && 56320 <= (t = r.charCodeAt(e + 1)) && t <= 57343 ? (i << 10) + t - 56613888 : i)
                    }
                    nextIndex(e, t = !1) {
                        var i = this.source,
                            r = i.length;
                        if (r <= e) return r;
                        let n = i.charCodeAt(e),
                            s;
                        return !t && !this.switchU || n <= 55295 || 57344 <= n || r <= e + 1 || (s = i.charCodeAt(e + 1)) < 56320 || 57343 < s ? e + 1 : e + 2
                    }
                    current(e = !1) {
                        return this.at(this.pos, e)
                    }
                    lookahead(e = !1) {
                        return this.at(this.nextIndex(this.pos, e), e)
                    }
                    advance(e = !1) {
                        this.pos = this.nextIndex(this.pos, e)
                    }
                    eat(e, t = !1) {
                        return this.current(t) === e && (this.advance(t), !0)
                    }
                }, n.validateRegExpFlags = function(e) {
                    var t = e.validFlags,
                        i = e.flags;
                    for (let n = 0; n < i.length; n++) {
                        var r = i.charAt(n); - 1 === t.indexOf(r) && this.raise(e.start, "Invalid regular expression flag"), -1 < i.indexOf(r, n + 1) && this.raise(e.start, "Duplicate regular expression flag")
                    }
                }, n.validateRegExpPattern = function(e) {
                    this.regexp_pattern(e), !e.switchN && 9 <= this.options.ecmaVersion && 0 < e.groupNames.length && (e.switchN = !0, this.regexp_pattern(e))
                }, n.regexp_pattern = function(e) {
                    e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames.length = 0, e.backReferenceNames.length = 0, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"), e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets"), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
                    for (var t = function(e, t) {
                            var i, n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                            if (n) return (n = n.call(e)).next.bind(n);
                            if (Array.isArray(e) || (n = function(e, t) {
                                    var i;
                                    if (e) return "string" == typeof e ? r(e, t) : "Map" === (i = "Object" === (i = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : i) || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? r(e, t) : void 0
                                }(e))) return n && (e = n), i = 0,
                                function() {
                                    return i >= e.length ? {
                                        done: !0
                                    } : {
                                        done: !1,
                                        value: e[i++]
                                    }
                                };
                            throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }(e.backReferenceNames); !(i = t()).done;) {
                        var i = i.value; - 1 === e.groupNames.indexOf(i) && e.raise("Invalid named capture referenced")
                    }
                }, n.regexp_disjunction = function(e) {
                    for (this.regexp_alternative(e); e.eat(124);) this.regexp_alternative(e);
                    this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(123) && e.raise("Lone quantifier brackets")
                }, n.regexp_alternative = function(e) {
                    for (; e.pos < e.source.length && this.regexp_eatTerm(e););
                }, n.regexp_eatTerm = function(e) {
                    return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : (e.switchU ? !!this.regexp_eatAtom(e) : !!this.regexp_eatExtendedAtom(e)) && (this.regexp_eatQuantifier(e), !0)
                }, n.regexp_eatAssertion = function(e) {
                    var t = e.pos;
                    if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36)) return !0;
                    if (e.eat(92)) {
                        if (e.eat(66) || e.eat(98)) return !0;
                        e.pos = t
                    }
                    if (e.eat(40) && e.eat(63)) {
                        let t = !1;
                        if (9 <= this.options.ecmaVersion && (t = e.eat(60)), e.eat(61) || e.eat(33)) return this.regexp_disjunction(e), e.eat(41) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !t, !0
                    }
                    return e.pos = t, !1
                }, n.regexp_eatQuantifier = function(e, t = !1) {
                    return !!this.regexp_eatQuantifierPrefix(e, t) && (e.eat(63), !0)
                }, n.regexp_eatQuantifierPrefix = function(e, t) {
                    return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t)
                }, n.regexp_eatBracedQuantifier = function(e, t) {
                    var i = e.pos;
                    if (e.eat(123)) {
                        let r = 0,
                            n = -1;
                        if (this.regexp_eatDecimalDigits(e) && (r = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (n = e.lastIntValue), e.eat(125))) return -1 !== n && n < r && !t && e.raise("numbers out of order in {} quantifier"), !0;
                        e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = i
                    }
                    return !1
                }, n.regexp_eatAtom = function(e) {
                    return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e)
                }, n.regexp_eatReverseSolidusAtomEscape = function(e) {
                    var t = e.pos;
                    if (e.eat(92)) {
                        if (this.regexp_eatAtomEscape(e)) return !0;
                        e.pos = t
                    }
                    return !1
                }, n.regexp_eatUncapturingGroup = function(e) {
                    var t = e.pos;
                    if (e.eat(40)) {
                        if (e.eat(63) && e.eat(58)) {
                            if (this.regexp_disjunction(e), e.eat(41)) return !0;
                            e.raise("Unterminated group")
                        }
                        e.pos = t
                    }
                    return !1
                }, n.regexp_eatCapturingGroup = function(e) {
                    if (e.eat(40)) {
                        if (9 <= this.options.ecmaVersion ? this.regexp_groupSpecifier(e) : 63 === e.current() && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;
                        e.raise("Unterminated group")
                    }
                    return !1
                }, n.regexp_eatExtendedAtom = function(e) {
                    return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e)
                }, n.regexp_eatInvalidBracedQuantifier = function(e) {
                    return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1
                }, n.regexp_eatSyntaxCharacter = function(e) {
                    var t = e.current();
                    return !!a(t) && (e.lastIntValue = t, e.advance(), !0)
                }, n.regexp_eatPatternCharacters = function(e) {
                    for (var t, i = e.pos; - 1 !== (t = e.current()) && !a(t);) e.advance();
                    return e.pos !== i
                }, n.regexp_eatExtendedPatternCharacter = function(e) {
                    var t = e.current();
                    return !(-1 === t || 36 === t || 40 <= t && t <= 43 || 46 === t || 63 === t || 91 === t || 94 === t || 124 === t || (e.advance(), 0))
                }, n.regexp_groupSpecifier = function(e) {
                    e.eat(63) && (this.regexp_eatGroupName(e) ? (-1 !== e.groupNames.indexOf(e.lastStringValue) && e.raise("Duplicate capture group name"), e.groupNames.push(e.lastStringValue)) : e.raise("Invalid group"))
                }, n.regexp_eatGroupName = function(e) {
                    if (e.lastStringValue = "", e.eat(60)) {
                        if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
                        e.raise("Invalid capture group name")
                    }
                    return !1
                }, n.regexp_eatRegExpIdentifierName = function(e) {
                    if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
                        for (e.lastStringValue += s(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) e.lastStringValue += s(e.lastIntValue);
                        return !0
                    }
                    return !1
                }, n.regexp_eatRegExpIdentifierStart = function(e) {
                    var t;
                    let i = e.pos,
                        r = 11 <= this.options.ecmaVersion,
                        n = e.current(r);
                    return e.advance(r), t = n = 92 === n && this.regexp_eatRegExpUnicodeEscapeSequence(e, r) ? e.lastIntValue : n, (0, R.isIdentifierStart)(t, !0) || 36 === t || 95 === t ? (e.lastIntValue = n, !0) : (e.pos = i, !1)
                }, n.regexp_eatRegExpIdentifierPart = function(e) {
                    var t;
                    let i = e.pos,
                        r = 11 <= this.options.ecmaVersion,
                        n = e.current(r);
                    return e.advance(r), t = n = 92 === n && this.regexp_eatRegExpUnicodeEscapeSequence(e, r) ? e.lastIntValue : n, (0, R.isIdentifierChar)(t, !0) || 36 === t || 95 === t || 8204 === t || 8205 === t ? (e.lastIntValue = n, !0) : (e.pos = i, !1)
                }, n.regexp_eatAtomEscape = function(e) {
                    return !!(this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e)) || (e.switchU && (99 === e.current() && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1)
                }, n.regexp_eatBackReference = function(e) {
                    var t = e.pos;
                    if (this.regexp_eatDecimalEscape(e)) {
                        var i = e.lastIntValue;
                        if (e.switchU) return i > e.maxBackReference && (e.maxBackReference = i), !0;
                        if (i <= e.numCapturingParens) return !0;
                        e.pos = t
                    }
                    return !1
                }, n.regexp_eatKGroupName = function(e) {
                    if (e.eat(107)) {
                        if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
                        e.raise("Invalid named reference")
                    }
                    return !1
                }, n.regexp_eatCharacterEscape = function(e) {
                    return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e)
                }, n.regexp_eatCControlLetter = function(e) {
                    var t = e.pos;
                    if (e.eat(99)) {
                        if (this.regexp_eatControlLetter(e)) return !0;
                        e.pos = t
                    }
                    return !1
                }, n.regexp_eatZero = function(e) {
                    return !(48 !== e.current() || l(e.lookahead()) || (e.lastIntValue = 0, e.advance(), 0))
                }, n.regexp_eatControlEscape = function(e) {
                    var t = e.current();
                    return 116 === t ? (e.lastIntValue = 9, e.advance(), !0) : 110 === t ? (e.lastIntValue = 10, e.advance(), !0) : 118 === t ? (e.lastIntValue = 11, e.advance(), !0) : 102 === t ? (e.lastIntValue = 12, e.advance(), !0) : 114 === t && (e.lastIntValue = 13, e.advance(), !0)
                }, n.regexp_eatControlLetter = function(e) {
                    var t = e.current();
                    return !!o(t) && (e.lastIntValue = t % 32, e.advance(), !0)
                }, n.regexp_eatRegExpUnicodeEscapeSequence = function(e, t = !1) {
                    var i = e.pos,
                        t = t || e.switchU;
                    if (e.eat(117)) {
                        if (this.regexp_eatFixedHexDigits(e, 4)) {
                            var r = e.lastIntValue;
                            if (t && 55296 <= r && r <= 56319) {
                                var n = e.pos;
                                if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
                                    var s = e.lastIntValue;
                                    if (56320 <= s && s <= 57343) return e.lastIntValue = 1024 * (r - 55296) + (s - 56320) + 65536, !0
                                }
                                e.pos = n, e.lastIntValue = r
                            }
                            return !0
                        }
                        if (t && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && 0 <= (s = e.lastIntValue) && s <= 1114111) return !0;
                        t && e.raise("Invalid unicode escape"), e.pos = i
                    }
                    return !1
                }, n.regexp_eatIdentityEscape = function(e) {
                    var t;
                    return e.switchU ? !!this.regexp_eatSyntaxCharacter(e) || !!e.eat(47) && (e.lastIntValue = 47, !0) : !(99 === (t = e.current()) || e.switchN && 107 === t || (e.lastIntValue = t, e.advance(), 0))
                }, n.regexp_eatDecimalEscape = function(e) {
                    e.lastIntValue = 0;
                    let t = e.current();
                    if (49 <= t && t <= 57) {
                        for (; e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance(), 48 <= (t = e.current()) && t <= 57;);
                        return !0
                    }
                    return !1
                }, n.regexp_eatCharacterClassEscape = function(e) {
                    var t = e.current();
                    if (100 === t || 68 === t || 115 === t || 83 === t || 119 === t || 87 === t) return e.lastIntValue = -1, e.advance(), !0;
                    if (e.switchU && 9 <= this.options.ecmaVersion && (80 === t || 112 === t)) {
                        if (e.lastIntValue = -1, e.advance(), e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125)) return !0;
                        e.raise("Invalid property name")
                    }
                    return !1
                }, n.regexp_eatUnicodePropertyValueExpression = function(e) {
                    var t = e.pos;
                    if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
                        var i, r = e.lastStringValue;
                        if (this.regexp_eatUnicodePropertyValue(e)) return i = e.lastStringValue, this.regexp_validateUnicodePropertyNameAndValue(e, r, i), !0
                    }
                    return e.pos = t, !!this.regexp_eatLoneUnicodePropertyNameOrValue(e) && (r = e.lastStringValue, this.regexp_validateUnicodePropertyNameOrValue(e, r), !0)
                }, n.regexp_validateUnicodePropertyNameAndValue = function(e, t, i) {
                    (0, V.hasOwn)(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(i) || e.raise("Invalid property value")
                }, n.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
                    e.unicodeProperties.binary.test(t) || e.raise("Invalid property name")
                }, n.regexp_eatUnicodePropertyName = function(e) {
                    var t;
                    for (e.lastStringValue = ""; c(t = e.current());) e.lastStringValue += s(t), e.advance();
                    return "" !== e.lastStringValue
                }, n.regexp_eatUnicodePropertyValue = function(e) {
                    var t, i;
                    for (e.lastStringValue = ""; c(i = t = e.current()) || l(i);) e.lastStringValue += s(t), e.advance();
                    return "" !== e.lastStringValue
                }, n.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
                    return this.regexp_eatUnicodePropertyValue(e)
                }, n.regexp_eatCharacterClass = function(e) {
                    if (e.eat(91)) {
                        if (e.eat(94), this.regexp_classRanges(e), e.eat(93)) return !0;
                        e.raise("Unterminated character class")
                    }
                    return !1
                }, n.regexp_classRanges = function(e) {
                    for (; this.regexp_eatClassAtom(e);) {
                        var t, i = e.lastIntValue;
                        e.eat(45) && this.regexp_eatClassAtom(e) && (t = e.lastIntValue, e.switchU && (-1 === i || -1 === t) && e.raise("Invalid character class"), -1 !== i) && -1 !== t && t < i && e.raise("Range out of order in character class")
                    }
                }, n.regexp_eatClassAtom = function(e) {
                    var t = e.pos;
                    if (e.eat(92)) {
                        if (this.regexp_eatClassEscape(e)) return !0;
                        e.switchU && ((99 === (i = e.current()) || u(i)) && e.raise("Invalid class escape"), e.raise("Invalid escape")), e.pos = t
                    }
                    var i = e.current();
                    return 93 !== i && (e.lastIntValue = i, e.advance(), !0)
                }, n.regexp_eatClassEscape = function(e) {
                    var t = e.pos;
                    if (e.eat(98)) return e.lastIntValue = 8, !0;
                    if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;
                    if (!e.switchU && e.eat(99)) {
                        if (this.regexp_eatClassControlLetter(e)) return !0;
                        e.pos = t
                    }
                    return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e)
                }, n.regexp_eatClassControlLetter = function(e) {
                    var t = e.current();
                    return !(!l(t) && 95 !== t || (e.lastIntValue = t % 32, e.advance(), 0))
                }, n.regexp_eatHexEscapeSequence = function(e) {
                    var t = e.pos;
                    if (e.eat(120)) {
                        if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
                        e.switchU && e.raise("Invalid escape"), e.pos = t
                    }
                    return !1
                }, n.regexp_eatDecimalDigits = function(e) {
                    var t, i = e.pos;
                    for (e.lastIntValue = 0; l(t = e.current());) e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
                    return e.pos !== i
                }, n.regexp_eatHexDigits = function(e) {
                    var t, i = e.pos;
                    for (e.lastIntValue = 0; p(t = e.current());) e.lastIntValue = 16 * e.lastIntValue + h(t), e.advance();
                    return e.pos !== i
                }, n.regexp_eatLegacyOctalEscapeSequence = function(e) {
                    var t, i;
                    return !!this.regexp_eatOctalDigit(e) && (t = e.lastIntValue, this.regexp_eatOctalDigit(e) ? (i = e.lastIntValue, t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = 64 * t + 8 * i + e.lastIntValue : e.lastIntValue = 8 * t + i) : e.lastIntValue = t, !0)
                }, n.regexp_eatOctalDigit = function(e) {
                    var t = e.current();
                    return u(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1)
                }, n.regexp_eatFixedHexDigits = function(e, t) {
                    var i = e.pos;
                    for (let n = e.lastIntValue = 0; n < t; ++n) {
                        var r = e.current();
                        if (!p(r)) return e.pos = i, !1;
                        e.lastIntValue = 16 * e.lastIntValue + h(r), e.advance()
                    }
                    return !0
                }
            }),
            ec = M(function(e, t) {
                t.__esModule = !0, t.Token = void 0;
                class i {
                    constructor(e) {
                        this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new j.SourceLocation(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end])
                    }
                }

                function r(e) {
                    return "function" != typeof BigInt ? null : BigInt(e.replace(/_/g, ""))
                }

                function n(e) {
                    return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(55296 + ((e -= 65536) >> 10), 56320 + (1023 & e))
                }
                t.Token = i, (t = $.Parser.prototype).next = function(e) {
                    !e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new i(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken()
                }, t.getToken = function() {
                    return this.next(), new i(this)
                }, "undefined" != typeof Symbol && (t[Symbol.iterator] = function() {
                    return {
                        next: () => {
                            var e = this.getToken();
                            return {
                                done: e.type === N.types.eof,
                                value: e
                            }
                        }
                    }
                }), t.nextToken = function() {
                    var e = this.curContext();
                    return e && e.preserveSpace || this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length ? this.finishToken(N.types.eof) : e.override ? e.override(this) : void this.readToken(this.fullCharCodeAtPos())
                }, t.readToken = function(e) {
                    return (0, R.isIdentifierStart)(e, 6 <= this.options.ecmaVersion) || 92 === e ? this.readWord() : this.getTokenFromCode(e)
                }, t.fullCharCodeAtPos = function() {
                    var e, t = this.input.charCodeAt(this.pos);
                    return t <= 55295 || 56320 <= t || (e = this.input.charCodeAt(this.pos + 1)) <= 56319 || 57344 <= e ? t : (t << 10) + e - 56613888
                }, t.skipBlockComment = function() {
                    var e = this.options.onComment && this.curPosition(),
                        t = this.pos,
                        i = this.input.indexOf("*/", this.pos += 2);
                    if (-1 === i && this.raise(this.pos - 2, "Unterminated comment"), this.pos = i + 2, this.options.locations)
                        for (let e, i = t; - 1 < (e = (0, B.nextLineBreak)(this.input, i, this.pos));) ++this.curLine, i = this.lineStart = e;
                    this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, i), t, this.pos, e, this.curPosition())
                }, t.skipLineComment = function(e) {
                    let t = this.pos,
                        i = this.options.onComment && this.curPosition(),
                        r = this.input.charCodeAt(this.pos += e);
                    for (; this.pos < this.input.length && !(0, B.isNewLine)(r);) r = this.input.charCodeAt(++this.pos);
                    this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, i, this.curPosition())
                }, t.skipSpace = function() {
                    e: for (; this.pos < this.input.length;) {
                        var e = this.input.charCodeAt(this.pos);
                        switch (e) {
                            case 32:
                            case 160:
                                ++this.pos;
                                break;
                            case 13:
                                10 === this.input.charCodeAt(this.pos + 1) && ++this.pos;
                            case 10:
                            case 8232:
                            case 8233:
                                ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
                                break;
                            case 47:
                                switch (this.input.charCodeAt(this.pos + 1)) {
                                    case 42:
                                        this.skipBlockComment();
                                        break;
                                    case 47:
                                        this.skipLineComment(2);
                                        break;
                                    default:
                                        break e
                                }
                                break;
                            default:
                                if (!(8 < e && e < 14 || 5760 <= e && B.nonASCIIwhitespace.test(String.fromCharCode(e)))) break e;
                                ++this.pos
                        }
                    }
                }, t.finishToken = function(e, t) {
                    this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
                    var i = this.type;
                    this.type = e, this.value = t, this.updateContext(i)
                }, t.readToken_dot = function() {
                    var e, t = this.input.charCodeAt(this.pos + 1);
                    return 48 <= t && t <= 57 ? this.readNumber(!0) : (e = this.input.charCodeAt(this.pos + 2), 6 <= this.options.ecmaVersion && 46 === t && 46 === e ? (this.pos += 3, this.finishToken(N.types.ellipsis)) : (++this.pos, this.finishToken(N.types.dot)))
                }, t.readToken_slash = function() {
                    var e = this.input.charCodeAt(this.pos + 1);
                    return this.exprAllowed ? (++this.pos, this.readRegexp()) : 61 === e ? this.finishOp(N.types.assign, 2) : this.finishOp(N.types.slash, 1)
                }, t.readToken_mult_modulo_exp = function(e) {
                    let t = this.input.charCodeAt(this.pos + 1),
                        i = 1,
                        r = 42 === e ? N.types.star : N.types.modulo;
                    return 7 <= this.options.ecmaVersion && 42 === e && 42 === t && (++i, r = N.types.starstar, t = this.input.charCodeAt(this.pos + 2)), 61 === t ? this.finishOp(N.types.assign, i + 1) : this.finishOp(r, i)
                }, t.readToken_pipe_amp = function(e) {
                    var t = this.input.charCodeAt(this.pos + 1);
                    return t === e ? 12 <= this.options.ecmaVersion && 61 === this.input.charCodeAt(this.pos + 2) ? this.finishOp(N.types.assign, 3) : this.finishOp(124 === e ? N.types.logicalOR : N.types.logicalAND, 2) : 61 === t ? this.finishOp(N.types.assign, 2) : this.finishOp(124 === e ? N.types.bitwiseOR : N.types.bitwiseAND, 1)
                }, t.readToken_caret = function() {
                    return 61 === this.input.charCodeAt(this.pos + 1) ? this.finishOp(N.types.assign, 2) : this.finishOp(N.types.bitwiseXOR, 1)
                }, t.readToken_plus_min = function(e) {
                    var t = this.input.charCodeAt(this.pos + 1);
                    return t === e ? 45 !== t || this.inModule || 62 !== this.input.charCodeAt(this.pos + 2) || 0 !== this.lastTokEnd && !B.lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)) ? this.finishOp(N.types.incDec, 2) : (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : 61 === t ? this.finishOp(N.types.assign, 2) : this.finishOp(N.types.plusMin, 1)
                }, t.readToken_lt_gt = function(e) {
                    let t = this.input.charCodeAt(this.pos + 1),
                        i = 1;
                    return t === e ? (i = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2, 61 === this.input.charCodeAt(this.pos + i) ? this.finishOp(N.types.assign, i + 1) : this.finishOp(N.types.bitShift, i)) : 33 !== t || 60 !== e || this.inModule || 45 !== this.input.charCodeAt(this.pos + 2) || 45 !== this.input.charCodeAt(this.pos + 3) ? (61 === t && (i = 2), this.finishOp(N.types.relational, i)) : (this.skipLineComment(4), this.skipSpace(), this.nextToken())
                }, t.readToken_eq_excl = function(e) {
                    var t = this.input.charCodeAt(this.pos + 1);
                    return 61 === t ? this.finishOp(N.types.equality, 61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2) : 61 === e && 62 === t && 6 <= this.options.ecmaVersion ? (this.pos += 2, this.finishToken(N.types.arrow)) : this.finishOp(61 === e ? N.types.eq : N.types.prefix, 1)
                }, t.readToken_question = function() {
                    var e = this.options.ecmaVersion;
                    if (11 <= e) {
                        var t = this.input.charCodeAt(this.pos + 1);
                        if (46 === t) {
                            var i = this.input.charCodeAt(this.pos + 2);
                            if (i < 48 || 57 < i) return this.finishOp(N.types.questionDot, 2)
                        }
                        if (63 === t) return 12 <= e && 61 === this.input.charCodeAt(this.pos + 2) ? this.finishOp(N.types.assign, 3) : this.finishOp(N.types.coalesce, 2)
                    }
                    return this.finishOp(N.types.question, 1)
                }, t.readToken_numberSign = function() {
                    let e = this.options.ecmaVersion,
                        t = 35;
                    if (13 <= e && (++this.pos, t = this.fullCharCodeAtPos(), (0, R.isIdentifierStart)(t, !0) || 92 === t)) return this.finishToken(N.types.privateId, this.readWord1());
                    this.raise(this.pos, "Unexpected character '" + n(t) + "'")
                }, t.getTokenFromCode = function(e) {
                    switch (e) {
                        case 46:
                            return this.readToken_dot();
                        case 40:
                            return ++this.pos, this.finishToken(N.types.parenL);
                        case 41:
                            return ++this.pos, this.finishToken(N.types.parenR);
                        case 59:
                            return ++this.pos, this.finishToken(N.types.semi);
                        case 44:
                            return ++this.pos, this.finishToken(N.types.comma);
                        case 91:
                            return ++this.pos, this.finishToken(N.types.bracketL);
                        case 93:
                            return ++this.pos, this.finishToken(N.types.bracketR);
                        case 123:
                            return ++this.pos, this.finishToken(N.types.braceL);
                        case 125:
                            return ++this.pos, this.finishToken(N.types.braceR);
                        case 58:
                            return ++this.pos, this.finishToken(N.types.colon);
                        case 96:
                            if (this.options.ecmaVersion < 6) break;
                            return ++this.pos, this.finishToken(N.types.backQuote);
                        case 48:
                            var t = this.input.charCodeAt(this.pos + 1);
                            if (120 === t || 88 === t) return this.readRadixNumber(16);
                            if (6 <= this.options.ecmaVersion) {
                                if (111 === t || 79 === t) return this.readRadixNumber(8);
                                if (98 === t || 66 === t) return this.readRadixNumber(2)
                            }
                        case 49:
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                        case 55:
                        case 56:
                        case 57:
                            return this.readNumber(!1);
                        case 34:
                        case 39:
                            return this.readString(e);
                        case 47:
                            return this.readToken_slash();
                        case 37:
                        case 42:
                            return this.readToken_mult_modulo_exp(e);
                        case 124:
                        case 38:
                            return this.readToken_pipe_amp(e);
                        case 94:
                            return this.readToken_caret();
                        case 43:
                        case 45:
                            return this.readToken_plus_min(e);
                        case 60:
                        case 62:
                            return this.readToken_lt_gt(e);
                        case 61:
                        case 33:
                            return this.readToken_eq_excl(e);
                        case 63:
                            return this.readToken_question();
                        case 126:
                            return this.finishOp(N.types.prefix, 1);
                        case 35:
                            return this.readToken_numberSign()
                    }
                    this.raise(this.pos, "Unexpected character '" + n(e) + "'")
                }, t.finishOp = function(e, t) {
                    var i = this.input.slice(this.pos, this.pos + t);
                    return this.pos += t, this.finishToken(e, i)
                }, t.readRegexp = function() {
                    let e, t, i = this.pos;
                    for (;;) {
                        this.pos >= this.input.length && this.raise(i, "Unterminated regular expression");
                        var r = this.input.charAt(this.pos);
                        if (B.lineBreak.test(r) && this.raise(i, "Unterminated regular expression"), e) e = !1;
                        else {
                            if ("[" === r) t = !0;
                            else if ("]" === r && t) t = !1;
                            else if ("/" === r && !t) break;
                            e = "\\" === r
                        }++this.pos
                    }
                    var n = this.input.slice(i, this.pos),
                        s = (++this.pos, this.pos),
                        a = this.readWord1(),
                        s = (this.containsEsc && this.unexpected(s), this.regexpState || (this.regexpState = new eo.RegExpValidationState(this)));
                    s.reset(i, n, a), this.validateRegExpFlags(s), this.validateRegExpPattern(s);
                    let o = null;
                    try {
                        o = RegExp(n, a)
                    } catch (e) {}
                    return this.finishToken(N.types.regexp, {
                        pattern: n,
                        flags: a,
                        value: o
                    })
                }, t.readInt = function(e, t, i) {
                    let r = 12 <= this.options.ecmaVersion && void 0 === t,
                        n = i && 48 === this.input.charCodeAt(this.pos),
                        s = this.pos,
                        a = 0,
                        o = 0;
                    for (let i = 0, s = null == t ? 1 / 0 : t; i < s; ++i, ++this.pos) {
                        var c, l = this.input.charCodeAt(this.pos);
                        if (r && 95 === l) n && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), 95 === o && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), 0 === i && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), o = l;
                        else {
                            if ((c = 97 <= l ? l - 97 + 10 : 65 <= l ? l - 65 + 10 : 48 <= l && l <= 57 ? l - 48 : 1 / 0) >= e) break;
                            o = l, a = a * e + c
                        }
                    }
                    return r && 95 === o && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === s || null != t && this.pos - s !== t ? null : a
                }, t.readRadixNumber = function(e) {
                    var t = this.pos;
                    this.pos += 2;
                    let i = this.readInt(e);
                    return null == i && this.raise(this.start + 2, "Expected number in radix " + e), 11 <= this.options.ecmaVersion && 110 === this.input.charCodeAt(this.pos) ? (i = r(this.input.slice(t, this.pos)), ++this.pos) : (0, R.isIdentifierStart)(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(N.types.num, i)
                }, t.readNumber = function(e) {
                    var t = this.pos;
                    e || null !== this.readInt(10, void 0, !0) || this.raise(t, "Invalid number");
                    let i = 2 <= this.pos - t && 48 === this.input.charCodeAt(t),
                        n = (i && this.strict && this.raise(t, "Invalid number"), this.input.charCodeAt(this.pos));
                    return i || e || !(11 <= this.options.ecmaVersion) || 110 !== n ? (i && /[89]/.test(this.input.slice(t, this.pos)) && (i = !1), 46 !== n || i || (++this.pos, this.readInt(10), n = this.input.charCodeAt(this.pos)), 69 !== n && 101 !== n || i || (43 !== (n = this.input.charCodeAt(++this.pos)) && 45 !== n || ++this.pos, null === this.readInt(10) && this.raise(t, "Invalid number")), (0, R.isIdentifierStart)(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), e = this.input.slice(t, this.pos), t = i ? parseInt(e, 8) : parseFloat(e.replace(/_/g, "")), this.finishToken(N.types.num, t)) : (e = r(this.input.slice(t, this.pos)), ++this.pos, (0, R.isIdentifierStart)(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(N.types.num, e))
                }, t.readCodePoint = function() {
                    var e;
                    let t;
                    return 123 === this.input.charCodeAt(this.pos) ? (this.options.ecmaVersion < 6 && this.unexpected(), e = ++this.pos, t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, 1114111 < t && this.invalidStringToken(e, "Code point out of bounds")) : t = this.readHexChar(4), t
                }, t.readString = function(e) {
                    let t = "",
                        i = ++this.pos;
                    for (;;) {
                        this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
                        var r = this.input.charCodeAt(this.pos);
                        if (r === e) break;
                        92 === r ? (t = (t += this.input.slice(i, this.pos)) + this.readEscapedChar(!1), i = this.pos) : 8232 === r || 8233 === r ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : ((0, B.isNewLine)(r) && this.raise(this.start, "Unterminated string constant"), ++this.pos)
                    }
                    return t += this.input.slice(i, this.pos++), this.finishToken(N.types.string, t)
                };
                let s = {};
                t.tryReadTemplateToken = function() {
                    this.inTemplateElement = !0;
                    try {
                        this.readTmplToken()
                    } catch (e) {
                        if (e !== s) throw e;
                        this.readInvalidTemplateToken()
                    }
                    this.inTemplateElement = !1
                }, t.invalidStringToken = function(e, t) {
                    if (this.inTemplateElement && 9 <= this.options.ecmaVersion) throw s;
                    this.raise(e, t)
                }, t.readTmplToken = function() {
                    let e = "",
                        t = this.pos;
                    for (;;) {
                        this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
                        var i = this.input.charCodeAt(this.pos);
                        if (96 === i || 36 === i && 123 === this.input.charCodeAt(this.pos + 1)) return this.pos !== this.start || this.type !== N.types.template && this.type !== N.types.invalidTemplate ? (e += this.input.slice(t, this.pos), this.finishToken(N.types.template, e)) : 36 === i ? (this.pos += 2, this.finishToken(N.types.dollarBraceL)) : (++this.pos, this.finishToken(N.types.backQuote));
                        if (92 === i) e = (e += this.input.slice(t, this.pos)) + this.readEscapedChar(!0), t = this.pos;
                        else if ((0, B.isNewLine)(i)) {
                            switch (e += this.input.slice(t, this.pos), ++this.pos, i) {
                                case 13:
                                    10 === this.input.charCodeAt(this.pos) && ++this.pos;
                                case 10:
                                    e += "\n";
                                    break;
                                default:
                                    e += String.fromCharCode(i)
                            }
                            this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos
                        } else ++this.pos
                    }
                }, t.readInvalidTemplateToken = function() {
                    for (; this.pos < this.input.length; this.pos++) switch (this.input[this.pos]) {
                        case "\\":
                            ++this.pos;
                            break;
                        case "$":
                            if ("{" !== this.input[this.pos + 1]) break;
                        case "`":
                            return this.finishToken(N.types.invalidTemplate, this.input.slice(this.start, this.pos))
                    }
                    this.raise(this.start, "Unterminated template")
                }, t.readEscapedChar = function(e) {
                    let t = this.input.charCodeAt(++this.pos);
                    switch (++this.pos, t) {
                        case 110:
                            return "\n";
                        case 114:
                            return "\r";
                        case 120:
                            return String.fromCharCode(this.readHexChar(2));
                        case 117:
                            return n(this.readCodePoint());
                        case 116:
                            return "	";
                        case 98:
                            return "\b";
                        case 118:
                            return "\v";
                        case 102:
                            return "\f";
                        case 13:
                            10 === this.input.charCodeAt(this.pos) && ++this.pos;
                        case 10:
                            return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
                        case 56:
                        case 57:
                            var i;
                            if (this.strict && this.invalidStringToken(this.pos - 1, "Invalid escape sequence"), e) return i = this.pos - 1, this.invalidStringToken(i, "Invalid escape sequence in template string"), null;
                        default:
                            if (48 <= t && t <= 55) {
                                let i = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
                                    r = parseInt(i, 8);
                                return 255 < r && (r = parseInt(i = i.slice(0, -1), 8)), this.pos += i.length - 1, t = this.input.charCodeAt(this.pos), ("0" !== i || 56 === t || 57 === t) && (this.strict || e) && this.invalidStringToken(this.pos - 1 - i.length, e ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(r)
                            }
                            return (0, B.isNewLine)(t) ? "" : String.fromCharCode(t)
                    }
                }, t.readHexChar = function(e) {
                    var t = this.pos,
                        e = this.readInt(16, e);
                    return null === e && this.invalidStringToken(t, "Bad character escape sequence"), e
                }, t.readWord1 = function() {
                    let e = "",
                        t = (this.containsEsc = !1, !0),
                        i = this.pos,
                        r = 6 <= this.options.ecmaVersion;
                    for (; this.pos < this.input.length;) {
                        var n = this.fullCharCodeAtPos();
                        if ((0, R.isIdentifierChar)(n, r)) this.pos += n <= 65535 ? 1 : 2;
                        else {
                            if (92 !== n) break;
                            this.containsEsc = !0, e += this.input.slice(i, this.pos);
                            var n = this.pos,
                                s = (117 !== this.input.charCodeAt(++this.pos) && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos, this.readCodePoint());
                            (t ? R.isIdentifierStart : R.isIdentifierChar)(s, r) || this.invalidStringToken(n, "Invalid Unicode escape"), e += this.input.substr(this.pos - 6, 6), i = this.pos
                        }
                        t = !1
                    }
                    return e + this.input.slice(i, this.pos)
                }, t.readWord = function() {
                    let e = this.readWord1(),
                        t = N.types.name;
                    return this.keywords.test(e) && (t = N.keywords[e]), this.finishToken(t, e)
                }
            }),
            q = M(function(e, t) {
                t.__esModule = !0, t.parse = function(e, t) {
                    return $.Parser.parse(e, t)
                }, t.parseExpressionAt = function(e, t, i) {
                    return $.Parser.parseExpressionAt(e, t, i)
                }, t.tokenizer = function(e, t) {
                    return $.Parser.tokenizer(e, t)
                }, t.version = void 0, t.Parser = $.Parser, t.defaultOptions = D.defaultOptions, t.Position = j.Position, t.SourceLocation = j.SourceLocation, t.getLineInfo = j.getLineInfo, t.Node = es.Node, t.TokenType = N.TokenType, t.tokTypes = N.types, t.keywordTypes = N.keywords, t.TokContext = ee.TokContext, t.tokContexts = ee.types, t.isIdentifierChar = R.isIdentifierChar, t.isIdentifierStart = R.isIdentifierStart, t.Token = ec.Token, t.isNewLine = B.isNewLine, t.lineBreak = B.lineBreak, t.lineBreakG = B.lineBreakG, t.nonASCIIwhitespace = B.nonASCIIwhitespace;
                var i = function(e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || "object" != typeof e && "function" != typeof e) return {
                        default: e
                    };
                    if ((t = r(t)) && t.has(e)) return t.get(e);
                    var i, n, s = {},
                        a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (i in e) "default" !== i && Object.prototype.hasOwnProperty.call(e, i) && ((n = a ? Object.getOwnPropertyDescriptor(e, i) : null) && (n.get || n.set) ? Object.defineProperty(s, i, n) : s[i] = e[i]);
                    return s.default = e, t && t.set(e, s), s
                }(V);

                function r(e) {
                    var t, i;
                    return "function" != typeof WeakMap ? null : (t = new WeakMap, i = new WeakMap, (r = function(e) {
                        return e ? i : t
                    })(e))
                }
                t.version = "8.7.0", $.Parser.acorn = {
                    Parser: $.Parser,
                    version: "8.7.0",
                    defaultOptions: D.defaultOptions,
                    Position: j.Position,
                    SourceLocation: j.SourceLocation,
                    getLineInfo: j.getLineInfo,
                    Node: es.Node,
                    TokenType: N.TokenType,
                    tokTypes: N.types,
                    keywordTypes: N.keywords,
                    TokContext: ee.TokContext,
                    tokContexts: ee.types,
                    isIdentifierChar: R.isIdentifierChar,
                    isIdentifierStart: R.isIdentifierStart,
                    Token: ec.Token,
                    isNewLine: B.isNewLine,
                    lineBreak: B.lineBreak,
                    lineBreakG: B.lineBreakG,
                    nonASCIIwhitespace: B.nonASCIIwhitespace
                };
                let n = i.wordsRegexp,
                    s = {};
                i.wordsRegexp = function(e) {
                    return s[e] || (s[e] = n(e)), s[e]
                }
            }),
            el = ((eH = q) && eH.__esModule && Object.prototype.hasOwnProperty.call(eH, "default") && eH.default, q.Node, q.Parser, q.Position, q.SourceLocation, q.TokContext, q.Token, q.TokenType, q.defaultOptions, q.getLineInfo, q.isIdentifierChar, q.isIdentifierStart, q.isNewLine, q.keywordTypes, q.lineBreak, q.lineBreakG, q.nonASCIIwhitespace, q.parse);
        q.parseExpressionAt, q.tokContexts, q.tokTypes, q.tokenizer, q.version;
        let ep = globalThis.fetch,
            eh = globalThis.WebSocket,
            eu = globalThis.Request,
            ed = globalThis.Response,
            em = {
                prototype: {
                    send: eh.prototype.send
                },
                CLOSED: eh.CLOSED,
                CLOSING: eh.CLOSING,
                CONNECTING: eh.CONNECTING,
                OPEN: eh.OPEN
            },
            ef = [101, 204, 205, 304],
            ey = [301, 302, 303, 307, 308];
        class eg extends Error {
            status;
            body;
            constructor(e, t) {
                super(t.message || t.code), this.status = e, this.body = t
            }
        }

        function e_(e, t) {
            var i = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (i >> 16) << 16 | 65535 & i
        }

        function ev(e, t, i, r, n, s) {
            return e_((t = e_(e_(t, e), e_(r, s))) << n | t >>> 32 - n, i)
        }

        function ex(e, t, i, r, n, s, a) {
            return ev(t & i | ~t & r, e, t, n, s, a)
        }

        function eb(e, t, i, r, n, s, a) {
            return ev(t & r | i & ~r, e, t, n, s, a)
        }

        function ew(e, t, i, r, n, s, a) {
            return ev(t ^ i ^ r, e, t, n, s, a)
        }

        function eS(e, t, i, r, n, s, a) {
            return ev(i ^ (t | ~r), e, t, n, s, a)
        }

        function eE(e, t) {
            e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
            let i = 1732584193,
                r = -271733879,
                n = -1732584194,
                s = 271733878;
            for (let t = 0; t < e.length; t += 16) {
                var a = i,
                    o = r,
                    c = n,
                    l = s;
                i = ex(i, r, n, s, e[t], 7, -680876936), s = ex(s, i, r, n, e[t + 1], 12, -389564586), n = ex(n, s, i, r, e[t + 2], 17, 606105819), r = ex(r, n, s, i, e[t + 3], 22, -1044525330), i = ex(i, r, n, s, e[t + 4], 7, -176418897), s = ex(s, i, r, n, e[t + 5], 12, 1200080426), n = ex(n, s, i, r, e[t + 6], 17, -1473231341), r = ex(r, n, s, i, e[t + 7], 22, -45705983), i = ex(i, r, n, s, e[t + 8], 7, 1770035416), s = ex(s, i, r, n, e[t + 9], 12, -1958414417), n = ex(n, s, i, r, e[t + 10], 17, -42063), r = ex(r, n, s, i, e[t + 11], 22, -1990404162), i = ex(i, r, n, s, e[t + 12], 7, 1804603682), s = ex(s, i, r, n, e[t + 13], 12, -40341101), n = ex(n, s, i, r, e[t + 14], 17, -1502002290), r = ex(r, n, s, i, e[t + 15], 22, 1236535329), i = eb(i, r, n, s, e[t + 1], 5, -165796510), s = eb(s, i, r, n, e[t + 6], 9, -1069501632), n = eb(n, s, i, r, e[t + 11], 14, 643717713), r = eb(r, n, s, i, e[t], 20, -373897302), i = eb(i, r, n, s, e[t + 5], 5, -701558691), s = eb(s, i, r, n, e[t + 10], 9, 38016083), n = eb(n, s, i, r, e[t + 15], 14, -660478335), r = eb(r, n, s, i, e[t + 4], 20, -405537848), i = eb(i, r, n, s, e[t + 9], 5, 568446438), s = eb(s, i, r, n, e[t + 14], 9, -1019803690), n = eb(n, s, i, r, e[t + 3], 14, -187363961), r = eb(r, n, s, i, e[t + 8], 20, 1163531501), i = eb(i, r, n, s, e[t + 13], 5, -1444681467), s = eb(s, i, r, n, e[t + 2], 9, -51403784), n = eb(n, s, i, r, e[t + 7], 14, 1735328473), r = eb(r, n, s, i, e[t + 12], 20, -1926607734), i = ew(i, r, n, s, e[t + 5], 4, -378558), s = ew(s, i, r, n, e[t + 8], 11, -2022574463), n = ew(n, s, i, r, e[t + 11], 16, 1839030562), r = ew(r, n, s, i, e[t + 14], 23, -35309556), i = ew(i, r, n, s, e[t + 1], 4, -1530992060), s = ew(s, i, r, n, e[t + 4], 11, 1272893353), n = ew(n, s, i, r, e[t + 7], 16, -155497632), r = ew(r, n, s, i, e[t + 10], 23, -1094730640), i = ew(i, r, n, s, e[t + 13], 4, 681279174), s = ew(s, i, r, n, e[t], 11, -358537222), n = ew(n, s, i, r, e[t + 3], 16, -722521979), r = ew(r, n, s, i, e[t + 6], 23, 76029189), i = ew(i, r, n, s, e[t + 9], 4, -640364487), s = ew(s, i, r, n, e[t + 12], 11, -421815835), n = ew(n, s, i, r, e[t + 15], 16, 530742520), r = ew(r, n, s, i, e[t + 2], 23, -995338651), i = eS(i, r, n, s, e[t], 6, -198630844), s = eS(s, i, r, n, e[t + 7], 10, 1126891415), n = eS(n, s, i, r, e[t + 14], 15, -1416354905), r = eS(r, n, s, i, e[t + 5], 21, -57434055), i = eS(i, r, n, s, e[t + 12], 6, 1700485571), s = eS(s, i, r, n, e[t + 3], 10, -1894986606), n = eS(n, s, i, r, e[t + 10], 15, -1051523), r = eS(r, n, s, i, e[t + 1], 21, -2054922799), i = eS(i, r, n, s, e[t + 8], 6, 1873313359), s = eS(s, i, r, n, e[t + 15], 10, -30611744), n = eS(n, s, i, r, e[t + 6], 15, -1560198380), r = eS(r, n, s, i, e[t + 13], 21, 1309151649), i = eS(i, r, n, s, e[t + 4], 6, -145523070), s = eS(s, i, r, n, e[t + 11], 10, -1120210379), n = eS(n, s, i, r, e[t + 2], 15, 718787259), r = eS(r, n, s, i, e[t + 9], 21, -343485551), i = e_(i, a), r = e_(r, o), n = e_(n, c), s = e_(s, l)
            }
            return [i, r, n, s]
        }

        function ek(e) {
            let t = "";
            var i = 32 * e.length;
            for (let r = 0; r < i; r += 8) t += String.fromCharCode(e[r >> 5] >>> r % 32 & 255);
            return t
        }

        function eC(e) {
            var t = [],
                i = e.length >> 2;
            for (let e = 0; e < i; e += 1) t[e] = 0;
            var r = 8 * e.length;
            for (let i = 0; i < r; i += 8) t[i >> 5] |= (255 & e.charCodeAt(i / 8)) << i % 32;
            return t
        }

        function eA(e) {
            var t = "0123456789abcdef";
            let i = "";
            for (let n = 0; n < e.length; n += 1) {
                var r = e.charCodeAt(n);
                i += t.charAt(r >>> 4 & 15) + t.charAt(15 & r)
            }
            return i
        }

        function eP(e) {
            return unescape(encodeURIComponent(e))
        }

        function eI(e) {
            return ek(eE(eC(e = eP(e)), 8 * e.length))
        }

        function eL(e, t) {
            {
                e = eP(e), t = eP(t);
                let n = eC(e);
                var i = [],
                    r = [];
                16 < n.length && (n = eE(n, 8 * e.length));
                for (let e = 0; e < 16; e += 1) i[e] = 909522486 ^ n[e], r[e] = 1549556828 ^ n[e];
                return e = eE(i.concat(eC(t)), 512 + 8 * t.length), ek(eE(r.concat(e), 640))
            }
        }
        let eO = [
            ["v3", class extends class {
                base;
                constructor(e, t) {
                    this.base = new URL(`./v${e}/`, t)
                }
            } {
                ws;
                http;
                constructor(e) {
                    super(3, e), this.ws = new URL(this.base), this.http = new URL(this.base), "https:" === this.ws.protocol ? this.ws.protocol = "wss:" : this.ws.protocol = "ws:"
                }
                connect(e, t, i, r, n) {
                    let s = new eh(this.ws),
                        a = () => {
                            s.removeEventListener("close", o), s.removeEventListener("message", c)
                        },
                        o = () => {
                            a()
                        },
                        c = e => {
                            if (a(), "string" != typeof e.data) throw TypeError("the first websocket message was not a text frame");
                            var t = JSON.parse(e.data);
                            if ("open" !== t.type) throw TypeError("message was not of open type");
                            e.stopImmediatePropagation(), r({
                                protocol: t.protocol,
                                setCookies: t.setCookies
                            }), n(em.OPEN), s.dispatchEvent(new Event("open"))
                        };
                    return s.addEventListener("close", o), s.addEventListener("message", c), s.addEventListener("open", r => {
                        r.stopImmediatePropagation(), n(em.CONNECTING), i().then(i => em.prototype.send.call(s, JSON.stringify({
                            type: "connect",
                            remote: e.toString(),
                            protocols: t,
                            headers: i,
                            forwardHeaders: []
                        })))
                    }, {
                        once: !0
                    }), s
                }
                async request(e, t, i, r, n, s, a) {
                    if (r.protocol.startsWith("blob:")) {
                        let e = await ep(r),
                            t = new ed(e.body, e);
                        return t.rawHeaders = Object.fromEntries(e.headers), t.rawResponse = e, t
                    }
                    var o, c, l, p = {};
                    if (t instanceof Headers)
                        for (var [h, u] of t) p[h] = u;
                    else
                        for (let e in t) p[e] = t[e];
                    e = {
                        credentials: "omit",
                        method: e,
                        signal: a
                    }, "only-if-cached" !== n && (e.cache = n), void 0 !== i && (e.body = i), void 0 !== s && (e.duplex = s), e.headers = this.createBareHeaders(r, p);
                    let d = await ep(this.http + "?cache=" + (o = r.toString(), c ? l ? eL(c, o) : eA(eL(c, o)) : l ? eI(o) : eA(eI(o))), e);
                    a = await this.readBareResponse(d);
                    let m = new ed(ef.includes(a.status) ? void 0 : d.body, {
                        status: a.status,
                        statusText: a.statusText ?? void 0,
                        headers: new Headers(a.headers)
                    });
                    return m.rawHeaders = a.headers, m.rawResponse = d, m
                }
                async readBareResponse(e) {
                    var t, i, r;
                    if (e.ok) return i = {}, null !== (r = (t = function(e) {
                        var t = new Headers(e),
                            i = "x-bare-headers";
                        if (e.has(i + "-0")) {
                            var r, n, s = [];
                            for ([r, n] of e)
                                if (r.startsWith(i)) {
                                    if (!n.startsWith(";")) throw new eg(400, {
                                        code: "INVALID_BARE_HEADER",
                                        id: "request.headers." + r,
                                        message: "Value didn't begin with semi-colon."
                                    });
                                    s[parseInt(r.slice(i.length + 1))] = n.slice(1), t.delete(r)
                                } t.set(i, s.join(""))
                        }
                        return t
                    }(e.headers)).get("x-bare-status")) && (i.status = parseInt(r)), null !== (r = t.get("x-bare-status-text")) && (i.statusText = r), null !== (r = t.get("x-bare-headers")) && (i.headers = JSON.parse(r)), i;
                    throw new eg(e.status, await e.json())
                }
                createBareHeaders(e, t, i = [], r = [], n = []) {
                    var s = new Headers;
                    for (let r of (s.set("x-bare-url", e.toString()), s.set("x-bare-headers", JSON.stringify(t)), i)) s.append("x-bare-forward-headers", r);
                    for (let e of r) s.append("x-bare-pass-headers", e);
                    for (let e of n) s.append("x-bare-pass-status", e.toString());
                    var e = s,
                        a = new Headers(e);
                    if (e.has("x-bare-headers")) {
                        var o = e.get("x-bare-headers");
                        if (3072 < o.length) {
                            a.delete("x-bare-headers");
                            let e = 0;
                            for (let t = 0; t < o.length; t += 3072) {
                                var c = o.slice(t, t + 3072),
                                    l = e++;
                                a.set("x-bare-headers-" + l, ";" + c)
                            }
                        }
                    }
                    return s
                }
            }]
        ];
        async function eT(e, t) {
            if ((e = await ep(e, {
                    signal: t
                })).ok) return e.json();
            throw Error(`Unable to fetch Bare meta: ${e.status} ` + await e.text())
        }
        let eM = Object.getOwnPropertyDescriptor(eh.prototype, "readyState").get,
            eR = ["ws:", "wss:"];
        class eN {
            manifest;
            client;
            server;
            working;
            onDemand;
            onDemandSignal;
            constructor(e, t) {
                this.server = new URL(e), !t || t instanceof AbortSignal ? (this.onDemand = !0, this.onDemandSignal = t) : (this.onDemand = !1, this.loadManifest(t))
            }
            loadManifest(e) {
                return this.manifest = e, this.client = this.getClient(), this.client
            }
            demand() {
                return this.onDemand ? (this.working || (this.working = eT(this.server, this.onDemandSignal).then(e => this.loadManifest(e)).catch(e => {
                    throw delete this.working, e
                })), this.working) : this.client
            }
            getClient() {
                for (var [e, t] of eO)
                    if (this.manifest.versions.includes(e)) return new t(this.server);
                throw Error("Unable to find compatible client version. Starting from v2.0.0, @tomphttp/bare-client only supports Bare servers v3+. For more information, see https://github.com/tomphttp/bare-client/")
            }
            createWebSocket(e, t = [], i) {
                if (!this.client) throw TypeError("You need to wait for the client to finish fetching the manifest before creating any WebSockets. Try caching the manifest data before making this request.");
                try {
                    e = new URL(e)
                } catch (t) {
                    throw new DOMException(`Faiiled to construct 'WebSocket': The URL '${e}' is invalid.`)
                }
                if (!eR.includes(e.protocol)) throw new DOMException(`Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${e.protocol}' is not allowed.`);
                for (let e of t = (t = Array.isArray(t) ? t : [t]).map(String))
                    if (! function(e) {
                            for (let i = 0; i < e.length; i++) {
                                var t = e[i];
                                if (!"!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~".includes(t)) return
                            }
                            return 1
                        }(e)) throw new DOMException(`Failed to construct 'WebSocket': The subprotocol '${e}' is invalid.`);
                let r = this.client.connect(e, t, async () => {
                        var t = "function" == typeof i.headers ? await i.headers() : i.headers || {},
                            t = t instanceof Headers ? Object.fromEntries(t) : t;
                        return t.Host = e.host, t.Pragma = "no-cache", t["Cache-Control"] = "no-cache", t.Upgrade = "websocket", t.Connection = "Upgrade", t
                    }, e => {
                        n = e.protocol, i.setCookiesCallback && i.setCookiesCallback(e.setCookies)
                    }, e => {
                        s = e
                    }, i.webSocketImpl || eh),
                    n = "",
                    s = em.CONNECTING,
                    a = () => {
                        var e = eM.call(r);
                        return e === em.OPEN ? s : e
                    },
                    o = (i.readyStateHook ? i.readyStateHook(r, a) : Object.defineProperty(r, "readyState", {
                        get: a,
                        configurable: !0,
                        enumerable: !0
                    }), () => {
                        if (a() === em.CONNECTING) return new DOMException("Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.")
                    });
                return i.sendErrorHook ? i.sendErrorHook(r, o) : r.send = function(...e) {
                    var t = o();
                    if (t) throw t;
                    em.prototype.send.call(this, ...e)
                }, i.urlHook ? i.urlHook(r, e) : Object.defineProperty(r, "url", {
                    get: () => e.toString(),
                    configurable: !0,
                    enumerable: !0
                }), t = () => n, i.protocolHook ? i.protocolHook(r, t) : Object.defineProperty(r, "protocol", {
                    get: t,
                    configurable: !0,
                    enumerable: !0
                }), r
            }
            async fetch(e, t) {
                var i = "string" == typeof(r = e) || r instanceof URL ? new eu(e, t) : e,
                    r = t?.headers || i.headers,
                    n = r instanceof Headers ? Object.fromEntries(r) : r,
                    s = t?.duplex,
                    a = t?.body || i.body;
                let o = new URL(i.url);
                var c = await this.demand();
                for (let e = 0;; e++) {
                    "host" in n ? n.host = o.host : n.Host = o.host;
                    var l = await c.request(i.method, n, a, o, i.cache, s, i.signal),
                        p = (l.finalURL = o.toString(), t?.redirect || i.redirect);
                    if (!ey.includes(l.status)) return l;
                    switch (p) {
                        case "follow":
                            var h = l.headers.get("location");
                            if (e < 20 && null !== h) {
                                o = new URL(h, o);
                                continue
                            }
                            throw TypeError("Failed to fetch");
                        case "error":
                            throw TypeError("Failed to fetch");
                        case "manual":
                            return l
                    }
                }
            }
        }
        async function eB(e, t) {
            return t = await eT(e, t), new eN(e, t)
        }
        var eV = Object.prototype.toString,
            ej = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

        function eD(e, t, i) {
            var i = i || {},
                r = i.encode || e$;
            if ("function" != typeof r) throw TypeError("option encode is invalid");
            if (!ej.test(e)) throw TypeError("argument name is invalid");
            if ((t = r(t)) && !ej.test(t)) throw TypeError("argument val is invalid");
            var n = e + "=" + t;
            if (null != i.maxAge) {
                if (isNaN(r = +i.maxAge) || !isFinite(r)) throw TypeError("option maxAge is invalid");
                n += "; Max-Age=" + Math.floor(r)
            }
            if (i.domain) {
                if (!ej.test(i.domain)) throw TypeError("option domain is invalid");
                n += "; Domain=" + i.domain
            }
            if (i.path) {
                if (!ej.test(i.path)) throw TypeError("option path is invalid");
                n += "; Path=" + i.path
            }
            if (i.expires && (t = e = i.expires, ("[object Date]" === eV.call(t) || t instanceof Date) && !isNaN(e.valueOf()) || (n += "; Expires=" + new Date(0).toUTCString()), n += "; Expires=" + e.toUTCString()), i.httpOnly && (n += "; HttpOnly"), i.secure && (n += "; Secure"), i.priority) switch ("string" == typeof i.priority ? i.priority.toLowerCase() : i.priority) {
                case "low":
                    n += "; Priority=Low";
                    break;
                case "medium":
                    n += "; Priority=Medium";
                    break;
                case "high":
                    n += "; Priority=High";
                    break;
                default:
                    throw TypeError("option priority is invalid")
            }
            if (i.sameSite) switch ("string" == typeof i.sameSite ? i.sameSite.toLowerCase() : i.sameSite) {
                case !0:
                case "strict":
                    n += "; SameSite=Strict";
                    break;
                case "lax":
                    n += "; SameSite=Lax";
                    break;
                case "none":
                    n += "; SameSite=None";
                    break;
                default:
                    throw TypeError("option sameSite is invalid")
            }
            return n
        }

        function eF(e) {
            return -1 !== e.indexOf("%") ? decodeURIComponent(e) : e
        }

        function e$(e) {
            return encodeURIComponent(e)
        }
        var eU = i(328),
            eH = {};

        function eW(e, t) {
            for (var i = 0; i < t.length; i++) {
                var r = t[i];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        Object.defineProperty(eH, "__esModule", {
            value: !0
        }), eH.GENERATOR = eH.EXPRESSIONS_PRECEDENCE = eH.NEEDS_PARENTHESES = void 0;
        var eq = JSON.stringify;
        if (!String.prototype.repeat) throw Error("String.prototype.repeat is undefined, see https://github.com/davidbonnet/astring#installation");
        if (!String.prototype.endsWith) throw Error("String.prototype.endsWith is undefined, see https://github.com/davidbonnet/astring#installation");
        var eG = {
                "||": 3,
                "&&": 4,
                "|": 5,
                "??": 5,
                "^": 6,
                "&": 7,
                "==": 8,
                "!=": 8,
                "===": 8,
                "!==": 8,
                "<": 9,
                ">": 9,
                "<=": 9,
                ">=": 9,
                in: 9,
                instanceof: 9,
                "<<": 10,
                ">>": 10,
                ">>>": 10,
                "+": 11,
                "-": 11,
                "*": 12,
                "%": 12,
                "/": 12,
                "**": 13
            },
            ez = {
                ArrayExpression: 20,
                TaggedTemplateExpression: 20,
                ThisExpression: 20,
                Identifier: 20,
                PrivateIdentifier: 20,
                Literal: 18,
                TemplateLiteral: 20,
                Super: 20,
                SequenceExpression: 20,
                MemberExpression: 19,
                ChainExpression: 19,
                CallExpression: 19,
                NewExpression: 19,
                ArrowFunctionExpression: eH.NEEDS_PARENTHESES = 17,
                ClassExpression: 17,
                FunctionExpression: 17,
                ObjectExpression: 17,
                UpdateExpression: 16,
                UnaryExpression: 15,
                AwaitExpression: 15,
                BinaryExpression: 14,
                LogicalExpression: 13,
                ConditionalExpression: 4,
                AssignmentExpression: 3,
                YieldExpression: 2,
                RestElement: 1
            };

        function eK(e, t) {
            var i = e.generator;
            if (e.write("("), null != t && 0 < t.length) {
                i[t[0].type](t[0], e);
                for (var r = t.length, n = 1; n < r; n++) {
                    var s = t[n];
                    e.write(", "), i[s.type](s, e)
                }
            }
            e.write(")")
        }

        function eQ(e, t, i, r) {
            var n = e.expressionsPrecedence[t.type];
            return 17 === n || (n !== (e = e.expressionsPrecedence[i.type]) ? !r && 15 === n && 14 === e && "**" === i.operator || n < e : (13 === n || 14 === n) && ("**" === t.operator && "**" === i.operator ? !r : r ? eG[t.operator] <= eG[i.operator] : eG[t.operator] < eG[i.operator]))
        }

        function eX(e, t, i, r) {
            var n = e.generator;
            eQ(e, t, i, r) ? (e.write("("), n[t.type](t, e), e.write(")")) : n[t.type](t, e)
        }

        function eY(e, t, i, r) {
            for (var n = t.length, s = 0; s < n; s++) {
                var a = t[s];
                if (e.write(i), "L" === a.type[0]) e.write("// " + a.value.trim() + "\n", a);
                else {
                    e.write("/*"), o = void 0, c = void 0, l = void 0, p = void 0, h = void 0, u = void 0, d = void 0;
                    var o = e,
                        c = a.value,
                        l = i,
                        p = r,
                        h = c.split("\n"),
                        u = h.length - 1;
                    if (o.write(h[0].trim()), 0 < u) {
                        o.write(p);
                        for (var d = 1; d < u; d++) o.write(l + h[d].trim() + p);
                        o.write(l + h[u].trim())
                    }
                    e.write("*/" + r)
                }
            }
        }

        function eZ(e, t) {
            var i = e.generator,
                r = t.declarations,
                n = (e.write(t.kind + " "), r.length);
            if (0 < n) {
                i.VariableDeclarator(r[0], e);
                for (var s = 1; s < n; s++) e.write(", "), i.VariableDeclarator(r[s], e)
            }
        }
        eH.EXPRESSIONS_PRECEDENCE = ez;
        var eJ = {
                Program: function(e, t) {
                    var i = t.indent.repeat(t.indentLevel),
                        r = t.lineEnd,
                        n = t.writeComments;
                    n && null != e.comments && eY(t, e.comments, i, r);
                    for (var s = e.body, a = s.length, o = 0; o < a; o++) {
                        var c = s[o];
                        n && null != c.comments && eY(t, c.comments, i, r), t.write(i), this[c.type](c, t), t.write(r)
                    }
                    n && null != e.trailingComments && eY(t, e.trailingComments, i, r)
                },
                ParenthesizedExpression: function(e, t) {
                    t.write("("), this[e.expression.type](e.expression, t), t.write(")")
                },
                BlockStatement: q = function(e, t) {
                    var i = t.indent.repeat(t.indentLevel++),
                        r = t.lineEnd,
                        n = t.writeComments,
                        s = i + t.indent,
                        a = (t.write("{"), e.body);
                    if (null != a && 0 < a.length) {
                        t.write(r), n && null != e.comments && eY(t, e.comments, s, r);
                        for (var o = a.length, c = 0; c < o; c++) {
                            var l = a[c];
                            n && null != l.comments && eY(t, l.comments, s, r), t.write(s), this[l.type](l, t), t.write(r)
                        }
                        t.write(i)
                    } else n && null != e.comments && (t.write(r), eY(t, e.comments, s, r), t.write(i));
                    n && null != e.trailingComments && eY(t, e.trailingComments, s, r), t.write("}"), t.indentLevel--
                },
                ClassBody: q,
                StaticBlock: function(e, t) {
                    t.write("static "), this.BlockStatement(e, t)
                },
                EmptyStatement: function(e, t) {
                    t.write(";")
                },
                ExpressionStatement: function(e, t) {
                    var i = t.expressionsPrecedence[e.expression.type];
                    17 === i || 3 === i && "O" === e.expression.left.type[0] ? (t.write("("), this[e.expression.type](e.expression, t), t.write(")")) : this[e.expression.type](e.expression, t), t.write(";")
                },
                IfStatement: function(e, t) {
                    t.write("if ("), this[e.test.type](e.test, t), t.write(") "), this[e.consequent.type](e.consequent, t), null != e.alternate && (t.write(" else "), this[e.alternate.type](e.alternate, t))
                },
                LabeledStatement: function(e, t) {
                    this[e.label.type](e.label, t), t.write(": "), this[e.body.type](e.body, t)
                },
                BreakStatement: function(e, t) {
                    t.write("break"), null != e.label && (t.write(" "), this[e.label.type](e.label, t)), t.write(";")
                },
                ContinueStatement: function(e, t) {
                    t.write("continue"), null != e.label && (t.write(" "), this[e.label.type](e.label, t)), t.write(";")
                },
                WithStatement: function(e, t) {
                    t.write("with ("), this[e.object.type](e.object, t), t.write(") "), this[e.body.type](e.body, t)
                },
                SwitchStatement: function(e, t) {
                    var i = t.indent.repeat(t.indentLevel++),
                        r = t.lineEnd,
                        n = t.writeComments,
                        s = (t.indentLevel++, i + t.indent),
                        a = s + t.indent;
                    t.write("switch ("), this[e.discriminant.type](e.discriminant, t), t.write(") {" + r);
                    for (var o = e.cases, c = o.length, l = 0; l < c; l++) {
                        var p = o[l];
                        n && null != p.comments && eY(t, p.comments, s, r), p.test ? (t.write(s + "case "), this[p.test.type](p.test, t), t.write(":" + r)) : t.write(s + "default:" + r);
                        for (var h = p.consequent, u = h.length, d = 0; d < u; d++) {
                            var m = h[d];
                            n && null != m.comments && eY(t, m.comments, a, r), t.write(a), this[m.type](m, t), t.write(r)
                        }
                    }
                    t.indentLevel -= 2, t.write(i + "}")
                },
                ReturnStatement: function(e, t) {
                    t.write("return"), e.argument && (t.write(" "), this[e.argument.type](e.argument, t)), t.write(";")
                },
                ThrowStatement: function(e, t) {
                    t.write("throw "), this[e.argument.type](e.argument, t), t.write(";")
                },
                TryStatement: function(e, t) {
                    var i;
                    t.write("try "), this[e.block.type](e.block, t), e.handler && (null == (i = e.handler).param ? t.write(" catch ") : (t.write(" catch ("), this[i.param.type](i.param, t), t.write(") ")), this[i.body.type](i.body, t)), e.finalizer && (t.write(" finally "), this[e.finalizer.type](e.finalizer, t))
                },
                WhileStatement: function(e, t) {
                    t.write("while ("), this[e.test.type](e.test, t), t.write(") "), this[e.body.type](e.body, t)
                },
                DoWhileStatement: function(e, t) {
                    t.write("do "), this[e.body.type](e.body, t), t.write(" while ("), this[e.test.type](e.test, t), t.write(");")
                },
                ForStatement: function(e, t) {
                    var i;
                    t.write("for ("), null != e.init && ("V" === (i = e.init).type[0] ? eZ(t, i) : this[i.type](i, t)), t.write("; "), e.test && this[e.test.type](e.test, t), t.write("; "), e.update && this[e.update.type](e.update, t), t.write(") "), this[e.body.type](e.body, t)
                },
                ForInStatement: q = function(e, t) {
                    t.write("for ".concat(e.await ? "await " : "", "("));
                    var i = e.left;
                    "V" === i.type[0] ? eZ(t, i) : this[i.type](i, t), t.write("I" === e.type[3] ? " in " : " of "), this[e.right.type](e.right, t), t.write(") "), this[e.body.type](e.body, t)
                },
                ForOfStatement: q,
                DebuggerStatement: function(e, t) {
                    t.write("debugger;", e)
                },
                FunctionDeclaration: q = function(e, t) {
                    t.write((e.async ? "async " : "") + (e.generator ? "function* " : "function ") + (e.id ? e.id.name : ""), e), eK(t, e.params), t.write(" "), this[e.body.type](e.body, t)
                },
                FunctionExpression: q,
                VariableDeclaration: function(e, t) {
                    eZ(t, e), t.write(";")
                },
                VariableDeclarator: function(e, t) {
                    this[e.id.type](e.id, t), null != e.init && (t.write(" = "), this[e.init.type](e.init, t))
                },
                ClassDeclaration: function(e, t) {
                    var i, r, n;
                    t.write("class " + (e.id ? "".concat(e.id.name, " ") : ""), e), e.superClass && (t.write("extends "), r = (i = e.superClass).type, n = t.expressionsPrecedence[r], ("C" !== r[0] || "l" !== r[1] || "E" !== r[5]) && (17 === n || n < t.expressionsPrecedence.ClassExpression) ? (t.write("("), this[e.superClass.type](i, t), t.write(")")) : this[i.type](i, t), t.write(" ")), this.ClassBody(e.body, t)
                },
                ImportDeclaration: function(e, t) {
                    t.write("import ");
                    var i = e.specifiers,
                        r = i.length,
                        n = 0;
                    if (0 < r) {
                        for (; n < r;) {
                            0 < n && t.write(", ");
                            var s = i[n],
                                a = s.type[6];
                            if ("D" === a) t.write(s.local.name, s);
                            else {
                                if ("N" !== a) break;
                                t.write("* as " + s.local.name, s)
                            }
                            n++
                        }
                        if (n < r) {
                            for (t.write("{");;) {
                                var o = i[n],
                                    c = o.imported.name;
                                if (t.write(c, o), c !== o.local.name && t.write(" as " + o.local.name), !(++n < r)) break;
                                t.write(", ")
                            }
                            t.write("}")
                        }
                        t.write(" from ")
                    }
                    this.Literal(e.source, t), t.write(";")
                },
                ImportExpression: function(e, t) {
                    t.write("import("), this[e.source.type](e.source, t), t.write(")")
                },
                ExportDefaultDeclaration: function(e, t) {
                    t.write("export default "), this[e.declaration.type](e.declaration, t), null != t.expressionsPrecedence[e.declaration.type] && "F" !== e.declaration.type[0] && t.write(";")
                },
                ExportNamedDeclaration: function(e, t) {
                    if (t.write("export "), e.declaration) this[e.declaration.type](e.declaration, t);
                    else {
                        t.write("{");
                        var i = e.specifiers,
                            r = i.length;
                        if (0 < r)
                            for (var n = 0;;) {
                                var s = i[n],
                                    a = s.local.name;
                                if (t.write(a, s), a !== s.exported.name && t.write(" as " + s.exported.name), !(++n < r)) break;
                                t.write(", ")
                            }
                        t.write("}"), e.source && (t.write(" from "), this.Literal(e.source, t)), t.write(";")
                    }
                },
                ExportAllDeclaration: function(e, t) {
                    null != e.exported ? t.write("export * as " + e.exported.name + " from ") : t.write("export * from "), this.Literal(e.source, t), t.write(";")
                },
                MethodDefinition: function(e, t) {
                    e.static && t.write("static ");
                    var i = e.kind[0];
                    "g" !== i && "s" !== i || t.write(e.kind + " "), e.value.async && t.write("async "), e.value.generator && t.write("*"), e.computed ? (t.write("["), this[e.key.type](e.key, t), t.write("]")) : this[e.key.type](e.key, t), eK(t, e.value.params), t.write(" "), this[e.value.body.type](e.value.body, t)
                },
                ClassExpression: function(e, t) {
                    this.ClassDeclaration(e, t)
                },
                ArrowFunctionExpression: function(e, t) {
                    t.write(e.async ? "async " : "", e);
                    var i = e.params;
                    null != i && (1 === i.length && "I" === i[0].type[0] ? t.write(i[0].name, i[0]) : eK(t, e.params)), t.write(" => "), "O" === e.body.type[0] ? (t.write("("), this.ObjectExpression(e.body, t), t.write(")")) : this[e.body.type](e.body, t)
                },
                ThisExpression: function(e, t) {
                    t.write("this", e)
                },
                Super: function(e, t) {
                    t.write("super", e)
                },
                RestElement: q = function(e, t) {
                    t.write("..."), this[e.argument.type](e.argument, t)
                },
                SpreadElement: q,
                YieldExpression: function(e, t) {
                    t.write(e.delegate ? "yield*" : "yield"), e.argument && (t.write(" "), this[e.argument.type](e.argument, t))
                },
                AwaitExpression: function(e, t) {
                    t.write("await ", e), eX(t, e.argument, e)
                },
                TemplateLiteral: function(e, t) {
                    var i = e.quasis,
                        r = e.expressions;
                    t.write("`");
                    for (var n = r.length, s = 0; s < n; s++) {
                        var a = r[s],
                            o = i[s];
                        t.write(o.value.raw, o), t.write("${"), this[a.type](a, t), t.write("}")
                    }
                    e = i[i.length - 1], t.write(e.value.raw, e), t.write("`")
                },
                TemplateElement: function(e, t) {
                    t.write(e.value.raw, e)
                },
                TaggedTemplateExpression: function(e, t) {
                    eX(t, e.tag, e), this[e.quasi.type](e.quasi, t)
                },
                ArrayExpression: q = function(e, t) {
                    if (t.write("["), 0 < e.elements.length)
                        for (var i = e.elements, r = i.length, n = 0;;) {
                            var s = i[n];
                            if (null != s && this[s.type](s, t), !(++n < r)) {
                                null == s && t.write(", ");
                                break
                            }
                            t.write(", ")
                        }
                    t.write("]")
                },
                ArrayPattern: q,
                ObjectExpression: function(e, t) {
                    var i = t.indent.repeat(t.indentLevel++),
                        r = t.lineEnd,
                        n = t.writeComments,
                        s = i + t.indent;
                    if (t.write("{"), 0 < e.properties.length) {
                        t.write(r), n && null != e.comments && eY(t, e.comments, s, r);
                        for (var a = "," + r, o = e.properties, c = o.length, l = 0;;) {
                            var p = o[l];
                            if (n && null != p.comments && eY(t, p.comments, s, r), t.write(s), this[p.type](p, t), !(++l < c)) break;
                            t.write(a)
                        }
                        t.write(r), n && null != e.trailingComments && eY(t, e.trailingComments, s, r), t.write(i + "}")
                    } else n ? null != e.comments ? (t.write(r), eY(t, e.comments, s, r), null != e.trailingComments && eY(t, e.trailingComments, s, r), t.write(i + "}")) : null != e.trailingComments ? (t.write(r), eY(t, e.trailingComments, s, r), t.write(i + "}")) : t.write("}") : t.write("}");
                    t.indentLevel--
                },
                Property: function(e, t) {
                    e.method || "i" !== e.kind[0] ? this.MethodDefinition(e, t) : (e.shorthand || (e.computed ? (t.write("["), this[e.key.type](e.key, t), t.write("]")) : this[e.key.type](e.key, t), t.write(": ")), this[e.value.type](e.value, t))
                },
                PropertyDefinition: function(e, t) {
                    e.static && t.write("static "), e.computed && t.write("["), this[e.key.type](e.key, t), e.computed && t.write("]"), null != e.value ? (t.write(" = "), this[e.value.type](e.value, t), t.write(";")) : "F" !== e.key.type[0] && t.write(";")
                },
                ObjectPattern: function(e, t) {
                    if (t.write("{"), 0 < e.properties.length)
                        for (var i = e.properties, r = i.length, n = 0; this[i[n].type](i[n], t), ++n < r;) t.write(", ");
                    t.write("}")
                },
                SequenceExpression: function(e, t) {
                    eK(t, e.expressions)
                },
                UnaryExpression: function(e, t) {
                    var i, r, n, s;
                    e.prefix ? (i = e.operator, r = e.argument, n = e.argument.type, t.write(i), (s = eQ(t, r, e)) || !(1 < i.length) && ("U" !== n[0] || "n" !== n[1] && "p" !== n[1] || !r.prefix || r.operator[0] !== i || "+" !== i && "-" !== i) || t.write(" "), s ? (t.write(1 < i.length ? " (" : "("), this[n](r, t), t.write(")")) : this[n](r, t)) : (this[e.argument.type](e.argument, t), t.write(e.operator))
                },
                UpdateExpression: function(e, t) {
                    e.prefix ? (t.write(e.operator), this[e.argument.type](e.argument, t)) : (this[e.argument.type](e.argument, t), t.write(e.operator))
                },
                AssignmentExpression: function(e, t) {
                    this[e.left.type](e.left, t), t.write(" " + e.operator + " "), this[e.right.type](e.right, t)
                },
                AssignmentPattern: function(e, t) {
                    this[e.left.type](e.left, t), t.write(" = "), this[e.right.type](e.right, t)
                },
                BinaryExpression: q = function(e, t) {
                    var i = "in" === e.operator;
                    i && t.write("("), eX(t, e.left, e, !1), t.write(" " + e.operator + " "), eX(t, e.right, e, !0), i && t.write(")")
                },
                LogicalExpression: q,
                ConditionalExpression: function(e, t) {
                    var i = e.test,
                        r = t.expressionsPrecedence[i.type];
                    17 === r || r <= t.expressionsPrecedence.ConditionalExpression ? (t.write("("), this[i.type](i, t), t.write(")")) : this[i.type](i, t), t.write(" ? "), this[e.consequent.type](e.consequent, t), t.write(" : "), this[e.alternate.type](e.alternate, t)
                },
                NewExpression: function(e, t) {
                    t.write("new ");
                    var i = t.expressionsPrecedence[e.callee.type];
                    17 === i || i < t.expressionsPrecedence.CallExpression || function(e) {
                        for (var t = e; null != t;) {
                            var i = t.type;
                            if ("C" === i[0] && "a" === i[1]) return 1;
                            if ("M" !== i[0] || "e" !== i[1] || "m" !== i[2]) return;
                            t = t.object
                        }
                    }(e.callee) ? (t.write("("), this[e.callee.type](e.callee, t), t.write(")")) : this[e.callee.type](e.callee, t), eK(t, e.arguments)
                },
                CallExpression: function(e, t) {
                    var i = t.expressionsPrecedence[e.callee.type];
                    17 === i || i < t.expressionsPrecedence.CallExpression ? (t.write("("), this[e.callee.type](e.callee, t), t.write(")")) : this[e.callee.type](e.callee, t), e.optional && t.write("?."), eK(t, e.arguments)
                },
                ChainExpression: function(e, t) {
                    this[e.expression.type](e.expression, t)
                },
                MemberExpression: function(e, t) {
                    var i = t.expressionsPrecedence[e.object.type];
                    17 === i || i < t.expressionsPrecedence.MemberExpression ? (t.write("("), this[e.object.type](e.object, t), t.write(")")) : this[e.object.type](e.object, t), e.computed ? (e.optional && t.write("?."), t.write("["), this[e.property.type](e.property, t), t.write("]")) : (e.optional ? t.write("?.") : t.write("."), this[e.property.type](e.property, t))
                },
                MetaProperty: function(e, t) {
                    t.write(e.meta.name + "." + e.property.name, e)
                },
                Identifier: function(e, t) {
                    t.write(e.name, e)
                },
                PrivateIdentifier: function(e, t) {
                    t.write("#".concat(e.name), e)
                },
                Literal: function(e, t) {
                    null != e.raw ? t.write(e.raw, e) : null != e.regex ? this.RegExpLiteral(e, t) : null != e.bigint ? t.write(e.bigint + "n", e) : t.write(eq(e.value), e)
                },
                RegExpLiteral: function(e, t) {
                    var i = e.regex;
                    t.write("/".concat(i.pattern, "/").concat(i.flags), e)
                }
            },
            e0 = (eH.GENERATOR = eJ, {}),
            e1 = (eH.baseGenerator = eJ, q = e2, eH = [{
                key: "write",
                value: function(e) {
                    this.output += e
                }
            }, {
                key: "writeToStream",
                value: function(e) {
                    this.output.write(e)
                }
            }, {
                key: "writeAndMap",
                value: function(e, t) {
                    this.output += e, this.map(e, t)
                }
            }, {
                key: "writeToStreamAndMap",
                value: function(e, t) {
                    this.output.write(e), this.map(e, t)
                }
            }, {
                key: "map",
                value: function(e, t) {
                    if (null != t) {
                        var i = t.type;
                        if ("L" === i[0] && "n" === i[2]) return this.column = 0, void this.line++;
                        if (null != t.loc && ((o = this.mapping).original = t.loc.start, o.name = t.name, this.sourceMap.addMapping(o)), "T" === i[0] && "E" === i[8] || "L" === i[0] && "i" === i[1] && "string" == typeof t.value) {
                            for (var r = e.length, n = this.column, s = this.line, a = 0; a < r; a++) "\n" === e[a] ? (n = 0, s++) : n++;
                            return this.column = n, void(this.line = s)
                        }
                    }
                    var o = e.length,
                        i = this.lineEnd;
                    0 < o && (0 < this.lineEndSize && (1 === i.length ? e[o - 1] === i : e.endsWith(i)) ? (this.line += this.lineEndSize, this.column = 0) : this.column += o)
                }
            }, {
                key: "toString",
                value: function() {
                    return this.output
                }
            }], eW(q.prototype, eH), is && eW(q, is), e2);

        function e2(e) {
            if (!(this instanceof e2)) throw TypeError("Cannot call a class as a function");
            e = null == e ? e0 : e, this.output = "", null != e.output ? (this.output = e.output, this.write = this.writeToStream) : this.output = "", this.generator = null != e.generator ? e.generator : eJ, this.expressionsPrecedence = null != e.expressionsPrecedence ? e.expressionsPrecedence : ez, this.indent = null != e.indent ? e.indent : "  ", this.lineEnd = null != e.lineEnd ? e.lineEnd : "\n", this.indentLevel = null != e.startingIndentLevel ? e.startingIndentLevel : 0, this.writeComments = !!e.comments && e.comments, null != e.sourceMap && (this.write = null == e.output ? this.writeAndMap : this.writeToStreamAndMap, this.sourceMap = e.sourceMap, this.line = 1, this.column = 0, this.lineEndSize = this.lineEnd.split("\n").length - 1, this.mapping = {
                original: null,
                generated: this,
                name: void 0,
                source: e.sourceMap.file || e.sourceMap._file
            })
        }

        function e3(e, t) {
            return (t = new e1(t)).generator[e.type](e, t), t.output
        }
        var e4 = i(206);
        let e6 = class {
            constructor(e) {
                this.mime = f, this.idb = r, this.path = o, this.acorn = {
                    parse: el
                }, this.bare = {
                    createBareClient: eB,
                    BareClient: eN
                }, this.base64 = n, this.estree = {
                    generate: e3
                }, this.cookie = Object.assign(Object.assign({}, s), {
                    serialize: (...e) => {
                        try {
                            return eD.apply({}, e)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }), this.setCookieParser = eU, this.bowser = e4, this.ctx = e
            }
        };

        function e5(e, t, i, r, n = "", s = !1, a = "") {
            var o;
            return o = !!self.__dynamic$config && "development" == self.__dynamic$config.mode, s ? (s = [{
                nodeName: "script",
                tagName: "script",
                namespaceURI: "http://www.w3.org/1999/xhtml",
                childNodes: [],
                attrs: [{
                    name: "src",
                    value: e + (o ? "?" + Math.floor(89999 * Math.random() + 1e4) : "")
                }]
            }, {
                nodeName: "script",
                tagName: "script",
                namespaceURI: "http://www.w3.org/1999/xhtml",
                childNodes: [],
                attrs: [{
                    name: "src",
                    value: t + (o ? "?" + Math.floor(89999 * Math.random() + 1e4) : "")
                }]
            }], this.ctx.config.assets.files.inject && s.unshift({
                nodeName: "script",
                tagName: "script",
                namespaceURI: "http://www.w3.org/1999/xhtml",
                childNodes: [],
                attrs: [{
                    name: "src",
                    value: this.ctx.config.assets.files.inject + (o ? "?" + Math.floor(89999 * Math.random() + 1e4) : "")
                }]
            }), r && s.unshift({
                nodeName: "script",
                tagName: "script",
                namespaceURI: "http://www.w3.org/1999/xhtml",
                childNodes: [],
                attrs: [{
                    name: "src",
                    value: "data:application/javascript;base64," + btoa(`self.__dynamic$cookies = atob("${btoa(r)}");document.currentScript?.remove();`)
                }]
            }), n && s.unshift({
                nodeName: "script",
                tagName: "script",
                namespaceURI: "http://www.w3.org/1999/xhtml",
                childNodes: [],
                attrs: [{
                    name: "src",
                    value: "data:application/javascript;base64," + btoa(n + ";document.currentScript?.remove();")
                }]
            }), a && s.unshift({
                nodeName: "script",
                tagName: "script",
                namespaceURI: "http://www.w3.org/1999/xhtml",
                childNodes: [],
                attrs: [{
                    name: "src",
                    value: "data:application/javascript;base64," + btoa(a + ";document.currentScript?.remove();")
                }]
            })) : (s = [`<script src="${t+(o?"?"+Math.floor(89999*Math.random()+1e4):"")}"></script>`, `<script src="${e+(o?"?"+Math.floor(89999*Math.random()+1e4):"")}"></script>`], this.ctx.config.assets.files.inject && s.unshift(`<script src="${this.ctx.config.assets.files.inject+(o?"?"+Math.floor(89999*Math.random()+1e4):"")}"></script>`), r && s.unshift(`<script src="${"data:application/javascript;base64,"+btoa(`self.__dynamic$cookies = atob("${btoa(r)}");document.currentScript?.remove();`)}"></script>`), n && s.unshift(`<script src="${"data:application/javascript;base64,"+btoa(n+";document.currentScript?.remove();")}"></script>`), a && s.unshift(`<script src="${"data:application/javascript;base64,"+btoa(a+";document.currentScript?.remove();")}"></script>`)), s
        }
        class e9 {
            constructor(e) {
                this.generateHead = e5, this.config = [{
                    elements: "all",
                    tags: ["style"],
                    action: "css"
                }, {
                    elements: ["script", "iframe", "embed", "input", "track", "media", "source", "img", "a", "link", "area", "form", "object"],
                    tags: ["src", "href", "action", "data"],
                    action: "url"
                }, {
                    elements: ["source", "img"],
                    tags: ["srcset"],
                    action: "srcset"
                }, {
                    elements: ["script", "link"],
                    tags: ["integrity"],
                    action: "rewrite",
                    new: "nointegrity"
                }, {
                    elements: ["script", "link"],
                    tags: ["nonce"],
                    action: "rewrite",
                    new: "nononce"
                }, {
                    elements: ["meta"],
                    tags: ["http-equiv"],
                    action: "http-equiv"
                }, {
                    elements: ["iframe"],
                    tags: ["srcdoc"],
                    action: "html"
                }, {
                    elements: ["link"],
                    tags: ["imagesrcset"],
                    action: "srcset"
                }, {
                    elements: "all",
                    tags: ["onclick"],
                    action: "js"
                }], this.ctx = e.ctx
            }
            generateRedirect(e) {
                return `
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="${e}">here</A>.
</BODY></HTML>
    `
            }
            iterate(e, t) {
                ! function i(r = e) {
                    for (var n = 0; n < r.childNodes.length; n++) t(r.childNodes[n]), r.childNodes[n].childNodes && r.childNodes[n].childNodes.length && i(r.childNodes[n])
                }(e)
            }
            rewrite(e, t, i = []) {
                return (e = Array.isArray(e) ? e[0] : e) && (!(e = e.toString()).match(/<(html|script|style)[^>]*>/g) && e.match(/<\!DOCTYPE[^>]*>/gi) ? e : e.replace(/(<!DOCTYPE html>|<html(.*?)>)/im, `$1${i.join("")}
`).replace(/<(script|link)\b[^>]*>/g, (e, t) => e.replace(/\snonce\s*=\s*"[^"]*"/, e => e.replace("nonce", "nononce")).replace(/\sintegrity\s*=\s*"[^"]*"/, e => e.replace("integrity", "nointegrity"))))
            }
        }
        class e8 {
            constructor(e) {
                this.ctx = e.ctx
            }
            rewrite(e, t, i = 0) {
                let r = this;
                return e && e.toString().replace(/((@import ['"`]+|url\(['"`]?)(.*?)(['"`]?\)|['"`]+))/gim, function() {
                    try {
                        return arguments[0].replace(arguments[3], r.ctx.url.encode(arguments[3], t))
                    } catch (e) {}
                })
            }
        }

        function e7(e, t) {
            "object" == typeof e && t && function e(t, i, r) {
                if ("object" == typeof t && r) {
                    for (let n in t.parent = i, r(t, i, r), t) "parent" !== n && (Array.isArray(t[n]) ? t[n].forEach(i => {
                        i && e(i, t, r)
                    }) : t[n] && e(t[n], t, r));
                    "function" == typeof t.iterateEnd && t.iterateEnd()
                }
            }(e, null, t)
        }

        function te(e, t = {}, i, r) {
            var n = this.ctx.modules.acorn.parse(e.toString(), {
                sourceType: t.module ? "module" : "script",
                allowImportExportEverywhere: !0,
                allowAwaitOutsideFunction: !0,
                allowReturnOutsideFunction: !0,
                ecmaVersion: "latest",
                preserveParens: !0,
                loose: !0,
                allowReserved: !0
            });
            return this.iterate(n, (e, n = null) => {
                this.emit(e, e.type, n, i, r, t)
            }), e = this.ctx.modules.estree.generate(n)
        }

        function tt(e) {
            Object.entries({
                type: "CallExpression",
                callee: {
                    type: "MemberExpression",
                    object: {
                        type: "Identifier",
                        name: "self"
                    },
                    property: {
                        type: "Identifier",
                        name: "__dynamic$message"
                    }
                },
                arguments: [e.object || e, {
                    type: "Identifier",
                    name: "self",
                    __dynamic: !0
                }]
            }).forEach(([t, i]) => e[t] = i)
        }

        function ti(e) {
            e.__dynamic || e.arguments.length && (e.arguments = [{
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    name: "__dynamic$wrapEval",
                    __dynamic: !0
                },
                arguments: e.arguments,
                __dynamic: !0
            }], e.__dynamic = !0)
        }
        let tr = function(e, t, i = {}, r = {}, n = {}, s = {}) {
            if (!e.__dynamic) {
                switch (t) {
                    case "Identifier":
                        var a, o, c, l, [p, h = {}] = [e, i];
                        "string" == typeof p.name && !0 !== p.__dynamic && ["parent", "top", "postMessage", "opener", "window", "self", "globalThis", "parent", "location"].includes(p.name) && ("AssignmentExpression" != h.type || h.left != p || "location" != p.name) && ("CallExpression" != h.type || h.callee != p) && ("MemberExpression" != h.type || h.object === p || ["document", "window", "self", "globalThis"].includes(h.object.name)) && "FunctionDeclaration" != h.type && "VariableDeclaration" != h.type && !("VariableDeclarator" == h.type && h.id == p || "LabeledStatement" == h.type || "Property" == h.type && h.key == p || "ArrowFunctionExpression" == h.type && h.params.includes(p) || "FunctionExpression" == h.type && h.params.includes(p) || "FunctionExpression" == h.type && h.id == p || "CatchClause" == h.type && h.param == p || "ContinueStatement" == h.type || "BreakStatement" == h.type || "AssignmentExpression" == h.type && h.left == p || "UpdateExpression" == h.type || "UpdateExpression" == h.type || "ForInStatement" == h.type && h.left == p || "MethodDefinition" == h.type && h.key == p || "AssignmentPattern" == h.type && h.left == p || "NewExpression" == h.type || "NewExpression" == (null == (c = null == h ? void 0 : h.parent) ? void 0 : c.type) || "UnaryExpression" == h.type && h.argument == p || "Property" == h.type && 1 == h.shorthand && h.value == p) && ("__dynamic" == p.name ? p.name = "undefined" : "eval" == p.name && h.right !== p ? p.name = "__dynamic$eval" : p.name = `dg$(${p.name})`);
                        break;
                    case "MemberExpression":
                        ! function(e, t = {}, i = {}) {
                            var r;
                            if (e.object.name += "", "AssignmentExpression" !== t.type && t.left !== e) {
                                if ("postMessage" == e.property.value && "CallExpression" == t.type && t.callee == e || "postMessage" == e.object.value && "CallExpression" == t.type && t.callee == e) return tt(e);
                                if (("postMessage" == e.property.name || "postMessage" == e.object.name) && "Super" !== e.object.type) return r = null == (r = e.object) ? void 0 : r.name, e.type = "CallExpression", e.callee = {
                                    type: "Identifier",
                                    name: "__dynamic$message"
                                }, e.arguments = [{
                                    type: "Identifier",
                                    name: r
                                }, {
                                    type: "Identifier",
                                    name: "self",
                                    __dynamic: !0
                                }], "CallExpression" == t.type && (t.arguments = t.arguments)
                            }
                            "eval" == e.property.name && (e.property.name = "__dynamic$eval"), "eval" == e.object.name && (e.object.name = "__dynamic$eval"), "worker" !== i.destination && ("window" != e.property.name || "top" == e.object.name || "self" != e.object.name && "globalThis" != e.object.name || "NewExpression" !== t.type && ("CallExpression" !== t.type || "CallExpression" == t.type && e !== t.callee) && (e.property.name = "__dynamic$window"), "top" == e.object.name && "NewExpression" !== t.type && ("CallExpression" !== t.type || "CallExpression" == t.type && e !== t.callee) && (e.object.name = "top.__dynamic$window"), "top" != e.property.name || "self" != e.object.name && "globalThis" != e.object.name || "NewExpression" !== t.type && ("CallExpression" !== t.type || "CallExpression" == t.type && e !== t.callee) && (e.property.name = "top.__dynamic$window"), "NewExpression" !== t.type && ("CallExpression" !== t.type || "CallExpression" == t.type && e !== t.callee) && ("window" == e.object.name && (e.object = {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "dg$"
                                },
                                arguments: [e.object],
                                __dynamic: !0
                            }), "parent" == e.object.name && (e.object = {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "dg$"
                                },
                                arguments: [e.object],
                                __dynamic: !0
                            }), "__dynamic" == e.property.name && (e.property.name = "undefined"), "self" == e.object.name && (e.object = {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "dg$"
                                },
                                arguments: [e.object],
                                __dynamic: !0
                            }), "document" == e.object.name && (e.object = {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "dg$"
                                },
                                arguments: [e.object],
                                __dynamic: !0
                            }), "globalThis" == e.object.name) && (e.object = {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "dg$"
                                },
                                arguments: [e.object],
                                __dynamic: !0
                            }), "location" == e.object.name && (e.object = {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "dg$"
                                },
                                arguments: [e.object],
                                __dynamic: !0
                            }), "location" == e.property.name) && "BinaryExpression" !== t.type && "AssignmentExpression" !== t.type && (e.property.__dynamic = !0, e.__dynamic = !0, r = Object.assign({}, e), e.type = "CallExpression", e.callee = {
                                type: "Identifier",
                                name: "dg$",
                                __dynamic: !0
                            }, e.arguments = [r], e.__dynamic = !0), e.computed && (e.property = {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "dp$"
                                },
                                arguments: [e.property],
                                __dynamic: !0
                            })
                        }(e, i, s);
                        break;
                    case "Literal":
                        [c, h = {}] = [e, i], c.value instanceof String && ("__dynamic" == c.value && (c.value = "undefined"), ["location", "parent", "top", "postMessage"].includes(c.value)) && ("postMessage" == c.value && "AssignmentExpression" != h.type && h.left != c && tt(c), "location" == c.value && (c.value = "__dynamic$location"), "__dynamic" == c.value && (c.value = "undefined"), "eval" == c.value) && (c.value = "__dynamic$eval");
                        break;
                    case "CallExpression":
                        ! function(e, t = {}) {
                            if ("AssignmentExpression" != t.type || t.left != e) {
                                if ("Identifier" == e.callee.type) {
                                    if ("postMessage" == e.callee.name) return e.callee.type = "CallExpression", e.callee.callee = {
                                        type: "Identifier",
                                        name: "__dynamic$message"
                                    }, e.callee.arguments = [{
                                        type: "Identifier",
                                        name: "undefined"
                                    }, {
                                        type: "Identifier",
                                        name: "self",
                                        __dynamic: !0
                                    }];
                                    "eval" == e.callee.name && ti(e)
                                }
                                if ("MemberExpression" == e.callee.type) {
                                    if ("postMessage" == e.callee.property.name && "Super" !== e.callee.object.type) return t = e.callee.object, e.callee.type = "CallExpression", e.callee.callee = {
                                        type: "Identifier",
                                        name: "__dynamic$message"
                                    }, e.callee.arguments = [t, {
                                        type: "Identifier",
                                        name: "self",
                                        __dynamic: !0
                                    }];
                                    "eval" == e.callee.object.name && ti(e)
                                }
                                0 < e.arguments.length && e.arguments.length
                            }
                        }(e, i);
                        break;
                    case "AssignmentExpression":
                        "Identifier" == (p = e).left.type && !0 !== p.left.__dynamic && "location" == p.left.name && (a = structuredClone(p.left), o = structuredClone(p.right), p.right.type = "CallExpression", p.right.callee = {
                            type: "Identifier",
                            name: "ds$"
                        }, p.right.arguments = [a, o]);
                        break;
                    case "ThisExpression":
                        break;
                    case "Property":
                        "ObjectPattern" != (a = e).parent.type && "AssignmentExpression" != (null == (o = null == (o = a.parent) ? void 0 : o.parent) ? void 0 : o.type) && (a.shorthand = !1);
                        break;
                    case "VariableDeclarator":
                        "Identifier" === e.id.type && !0 !== e.id.__dynamic && e.id.name
                } [t, r = {}, n = {}, l = {}] = [e, i, r, n], "Literal" != t.type || "ImportDeclaration" != r.type && "ExportNamedDeclaration" != r.type && "ExportAllDeclaration" != r.type || (r = t.value + "", t.value = n.url.encode(t.value, l.meta), t.raw = t.raw.replace(r, t.value), t.__dynamic = !0), "ImportExpression" == t.type && (t.source = {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        name: "__dynamic$import"
                    },
                    arguments: [t.source, {
                        type: "Literal",
                        __dynamic: !0,
                        value: n.meta.href
                    }]
                }, t.__dynamic = !0)
            }
        };
        class tn {
            constructor(e) {
                this.iterate = e7, this.process = te, this.emit = tr, this.ctx = e.ctx
            }
            rewrite(e, t = {}, i = !0, r = {}) {
                if (e && !(e instanceof Object || (e = e.toString()).includes("/* dynamic.js */"))) {
                    e = `/* dynamic.js */ 

` + e;
                    try {
                        try {
                            e = this.process(e, t, Object.assign({
                                module: !0
                            }, this.ctx), r)
                        } catch (i) {
                            e = this.process(e, t, Object.assign({
                                module: !1
                            }, this.ctx), r)
                        }
                    } catch (e) {}
                    i && (e = `
      if (typeof self !== undefined && typeof self.importScripts == 'function' && typeof self.__dynamic == 'undefined') importScripts('/dynamic/dynamic.config.js', '/dynamic/dynamic.handler.js?'+Math.floor(Math.random()*(99999-10000)+10000));

      ` + e)
                }
                return e
            }
        }
        class ts {
            constructor(e) {
                this.config = {
                    rewrite: [
                        ["icons", "urlit"],
                        ["name", " - Dynamic"],
                        ["start_url", "url"],
                        ["scope", "url"],
                        ["short_name", " - Dynamic"],
                        ["shortcuts", "urlev"]
                    ],
                    delete: ["serviceworker"]
                }, this.ctx = e.ctx
            }
            rewrite(e, t) {
                var i, r = JSON.parse(e);
                for (i in this.config)
                    if ("rewrite" == i)
                        for (var [n, s] of this.config[i])
                            if ("urlit" == s && r[n])
                                for (var a = 0; a < r[n].length; a++) r[n][a].src = this.ctx.url.encode(r[n][a].src, t);
                            else if ("urlev" == s && r[n])
                    for (a = 0; a < r[n].length; a++) r[n][a].url = this.ctx.url.encode(r[n][a].url, t);
                else "url" == s && r[n] ? r[n] = this.ctx.url.encode(r[n], t) : "url" != s && "urlit" != s && "urlev" != s && (r[n] = r[n] + s);
                else if ("delete" == i)
                    for (var n of this.config[i]) r[n] && delete r[n];
                return JSON.stringify(r)
            }
        }
        let ta = {
                encode: (e, t) => e && (e.toString() ? e.split(", ").map(e => e.split(" ").map((e, i) => 0 == i ? t.url.encode(e, t.baseURL || t.meta) : e).join(" ")).join(", ") : e),
                decode: e => e
            },
            to = class {
                constructor(e) {
                    this.ctx = e, this.html = new e9(this), this.srcset = ta, this.js = new tn(this), this.css = new e8(this), this.man = new ts(this)
                }
            };

        function tc(e) {
            var t, i, r, n;
            return t = this, i = void 0, r = void 0, n = function*() {
                var t = new URL(e.url).searchParams.get("url");
                return new Response("", {
                    status: 301,
                    headers: {
                        location: location.origin + this.ctx.config.prefix + this.ctx.encoding.encode(t)
                    }
                })
            }, new(r = r || Promise)(function(e, s) {
                function a(e) {
                    try {
                        c(n.next(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function o(e) {
                    try {
                        c(n.throw(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function c(t) {
                    var i;
                    t.done ? e(t.value) : ((i = t.value) instanceof r ? i : new r(function(e) {
                        e(i)
                    })).then(a, o)
                }
                c((n = n.apply(t, i || [])).next())
            })
        }

        function tl({
            url: e
        }) {
            return !e.toString().substr(location.origin.length, (this.ctx.config.prefix + "route").length).startsWith(this.ctx.config.prefix + "route")
        }

        function tp({
            url: e
        }) {
            return !e.toString().substr(location.origin.length, this.ctx.config.prefix.length).startsWith(this.ctx.config.prefix)
        }
        var th = function(e) {
            var t, i;
            if (Symbol.asyncIterator) return (t = e[Symbol.asyncIterator]) ? t.call(e) : (e = "function" == typeof __values ? __values(e) : e[Symbol.iterator](), i = {}, r("next"), r("throw"), r("return"), i[Symbol.asyncIterator] = function() {
                return this
            }, i);
            throw TypeError("Symbol.asyncIterator is not defined.");

            function r(t) {
                i[t] = e[t] && function(i) {
                    return new Promise(function(r, n) {
                        var s, a;
                        i = e[t](i), s = r, r = n, a = i.done, Promise.resolve(n = i.value).then(function(e) {
                            s({
                                value: e,
                                done: a
                            })
                        }, r)
                    })
                }
            }
        };

        function tu(e, t, i) {
            var r, n, s, a, o, c, l, p;
            return o = this, c = void 0, l = void 0, p = function*() {
                for (let p in e)
                    if (-1 !== this.ctx.headers.csp.indexOf(p.toLowerCase()) && delete e[p], "location" == p.toLowerCase()) e[p] = this.ctx.url.encode(e[p], t);
                    else if ("set-cookie" === p.toLowerCase()) {
                    Array.isArray(e[p]) ? e[p] = e[p].map(e => this.ctx.modules.setCookieParser(e, {
                        decodeValues: !1
                    })[0]) : e[p] = this.ctx.modules.setCookieParser(e[p], {
                        decodeValues: !1
                    });
                    try {
                        for (var o, c = !0, l = (n = void 0, th(e[p])); !(r = (o = yield l.next()).done);) {
                            a = o.value, c = !1;
                            try {
                                yield i.set(t.host, this.ctx.modules.cookie.serialize(a.name, a.value, Object.assign(Object.assign({}, a), {
                                    encode: e => e
                                })));
                                continue
                            } finally {
                                c = !0
                            }
                        }
                    } catch (e) {
                        n = {
                            error: e
                        }
                    } finally {
                        try {
                            !c && !r && (s = l.return) && (yield s.call(l))
                        } finally {
                            if (n) throw n.error
                        }
                    }
                    delete e[p]
                }
                return new Headers(e)
            }, new(l = l || Promise)(function(e, t) {
                function i(e) {
                    try {
                        n(p.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function r(e) {
                    try {
                        n(p.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function n(t) {
                    var n;
                    t.done ? e(t.value) : ((n = t.value) instanceof l ? n : new l(function(e) {
                        e(n)
                    })).then(i, r)
                }
                n((p = p.apply(o, c || [])).next())
            })
        }

        function td(e, t, i, r) {
            let n = i.referrer;
            if (["origin", "Origin", "host", "Host", "referer", "Referer"].forEach(t => {
                    e[t] && delete e[t]
                }), e.Origin = t.protocol + "//" + t.host + (t.port ? ":" + t.port : ""), e.Host = t.host + (t.port ? ":" + t.port : ""), e.Referer = t.href, "strict-origin-when-cross-origin" == i.referrerPolicy && (e.Referer = `${t.protocol}//${t.host}/`), "origin" == i.referrerPolicy && t.origin && (n = t.origin + "/"), r) {
                switch (i.credentials) {
                    case "omit":
                        break;
                    case "same-origin":
                        i.client && t.origin == i.client.__dynamic$location.origin && (e.Cookie = r), i.client || (e.Cookie = r);
                        break;
                    case "include":
                        e.Cookie = r
                }
                e.Cookie = r
            }
            if (n && n != location.origin + "/") try {
                e.Referer = this.ctx.url.decode(n), "strict-origin-when-cross-origin" == i.referrerPolicy && (e.Referer = new URL(this.ctx.url.decode(n)).origin), e.Origin = new URL(this.ctx.url.decode(n)).origin
            } catch (e) {}
            return i.client && (e.Origin = i.client.__dynamic$location.origin, e.Referer = i.client.__dynamic$location.href, "strict-origin-when-cross-origin" == i.referrerPolicy) && (e.Referer = i.client.__dynamic$location.origin), this.ctx.config.tab && this.ctx.config.tab.ua && (delete e["user-agent"], delete e["User-Agent"], e["user-agent"] = this.ctx.config.tab.ua), e["sec-fetch-dest"] = i.destination || "empty", e["sec-fetch-mode"] = i.mode || "cors", e["sec-fetch-site"] = i.client ? i.client.__dynamic$location.origin == t.origin ? i.client.__dynamic$location.port == t.port ? "same-origin" : "same-site" : "cross-origin" : "none", "navigate" == i.mode && (e["sec-fetch-site"] = "same-origin"), e["sec-fetch-user"] = "?1", new Headers(e)
        }

        function tm(e) {
            return Object.assign(Object.create(Object.getPrototypeOf(e)), e)
        }

        function tf(e) {
            try {
                if (new new Proxy(e, {
                        construct: () => ({})
                    }), Object.getOwnPropertyNames(e).includes("arguments")) return !0;
                throw Error("")
            } catch (e) {
                return !1
            }
        }

        function ty(e) {
            return e.url.toString().substr(location.origin.length, e.url.toString().length).startsWith(self.__dynamic$config.assets.prefix)
        }

        function tg(e) {
            var t, i, r, n;
            return t = this, i = void 0, r = void 0, n = function*() {
                var t;
                let i;
                let r = yield(i = "development" !== self.__dynamic$config.mode && (t = yield caches.open("__dynamic$files")) && (yield t.match(e.url)) || (yield fetch(e))).blob();
                return (e.url.startsWith(location.origin + "/dynamic/dynamic.config.js") || e.url.startsWith(location.origin + "/dynamic/dynamic.client.js")) && (r = new Blob([(yield r.text()) + `
self.document?.currentScript?.remove();`], {
                    type: "application/javascript"
                })), new Response(r, {
                    headers: i.headers,
                    status: i.status,
                    statusText: i.statusText
                })
            }, new(r = r || Promise)(function(e, s) {
                function a(e) {
                    try {
                        c(n.next(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function o(e) {
                    try {
                        c(n.throw(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function c(t) {
                    var i;
                    t.done ? e(t.value) : ((i = t.value) instanceof r ? i : new r(function(e) {
                        e(i)
                    })).then(a, o)
                }
                c((n = n.apply(t, i || [])).next())
            })
        }

        function t_(e, t) {
            var i, r, n, s;
            return i = this, r = void 0, s = function*() {}, new(n = void 0, n = Promise)(function(e, t) {
                function a(e) {
                    try {
                        c(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        c(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function c(t) {
                    var i;
                    t.done ? e(t.value) : ((i = t.value) instanceof n ? i : new n(function(e) {
                        e(i)
                    })).then(a, o)
                }
                c((s = s.apply(i, r || [])).next())
            })
        }
        var tv = function(e, t, i, r) {
            return new(i = i || Promise)(function(n, s) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function o(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value) instanceof i ? t : new i(function(e) {
                        e(t)
                    })).then(a, o)
                }
                c((r = r.apply(e, t || [])).next())
            })
        };
        class tx {
            constructor(e) {
                this.rawHeaders = {}, this.headers = new Headers({}), this.status = 200, this.statusText = "OK", this.body = e
            }
            blob() {
                return tv(this, void 0, void 0, function*() {
                    return this.body
                })
            }
            text() {
                return tv(this, void 0, void 0, function*() {
                    return yield this.body.text()
                })
            }
        }

        function tb(e) {
            var t = this.ctx.encoding,
                t = "object" == typeof this.ctx.config.encoding ? Object.assign(Object.assign({}, t), this.ctx.encoding) : Object.assign({}, this.ctx.encoding[this.ctx.config.encoding]);
            return this.ctx.encoding = Object.assign(Object.assign({}, this.ctx.encoding), t), this.ctx.encoding
        }

        function tw(e, t, i) {
            if (!e.url.startsWith("http")) return e.url;
            let r = e.url.toString();
            return e.url.startsWith(location.origin) && (r = r.substr(self.location.origin.length)), r = new URL(r, new URL(t.__dynamic$location.href)).href, this.ctx.url.encode(r, i)
        }
        let tS = class {
            constructor(e) {
                this.route = tc, this.routePath = tl, this.path = tp, this.resHeader = tu, this.reqHeader = td, this.clone = tm, this.class = tf, this.file = ty, this.edit = tg, this.error = t_, this.encode = tb, this.rewritePath = tw, this.about = tx, this.ctx = e
            }
        };

        function tE(e, t) {
            var i, r, n, s, a, o;
            if (!e) return e;
            if ((e = new String(e).toString()).startsWith("about:blank")) return location.origin + this.ctx.config.prefix + e;
            if (!e.match(this.ctx.regex.ProtocolRegex) && e.match(/^([a-zA-Z0-9\-]+)\:\/\//g) || e.startsWith("chrome-extension://") || (e = e.match(this.ctx.regex.WeirdRegex) && (i = this.ctx.regex.WeirdRegex.exec(e)) ? i[2] : e).startsWith(location.origin + this.ctx.config.prefix) || e.startsWith(this.ctx.config.prefix) || e.startsWith(location.origin + this.ctx.config.assets.prefix + "dynamic.") || e.match(this.ctx.regex.BypassRegex)) return e;
            if (e.match(this.ctx.regex.DataRegex)) {
                try {
                    (i = this.ctx.regex.DataRegex.exec(e)) && ([r, n, s, a, o] = i, o = "base64" == a ? this.ctx.modules.base64.atob(decodeURIComponent(o)) : decodeURIComponent(o), n && ("text/html" == n ? o = this.ctx.rewrite.html.rewrite(o, t, this.ctx.rewrite.html.generateHead(location.origin + "/dynamic/dynamic.client.js", location.origin + "/dynamic/dynamic.config.js", "", `window.__dynamic$url = "${t.href}"; window.__dynamic$parentURL = "${location.href}";`)) : "text/css" == n ? o = this.ctx.rewrite.css.rewrite(o, t) : "text/javascript" != n && "application/javascript" != n || (o = this.ctx.rewrite.js.rewrite(o, t))), o = "base64" == a ? this.ctx.modules.base64.btoa(o) : encodeURIComponent(o), e = s ? a ? `data:${n};${s};${a},` + o : `data:${n};${s},` + o : a ? `data:${n};${a},` + o : `data:${n},` + o)
                } catch (e) {}
                return e
            }
            return e = new String(e).toString(), t.href.match(this.ctx.regex.BypassRegex) && (e = new URL(e, new URL((this.ctx.parent.__dynamic || this.ctx).meta.href)).href), e = new URL(e, t.href), ((null == (i = this.ctx._location) ? void 0 : i.origin) || ("null" == location.origin ? location.ancestorOrigins[0] : location.origin)) + this.ctx.config.prefix + (this.ctx.encoding.encode(e.origin + e.pathname) + e.search + e.hash)
        }

        function tk(e) {
            if (e && !(e = new String(e).toString()).match(this.ctx.regex.BypassRegex)) {
                var t = e.indexOf(this.ctx.config.prefix);
                if (-1 != t) {
                    try {
                        if (t = (e = new URL(e, new URL(self.location.origin)).href).indexOf(this.ctx.config.prefix), "about:blank" == e.slice(t + this.ctx.config.prefix.length).trim()) return "about:blank";
                        var i = new URL(e).search + new URL(e).hash || "",
                            r = new URL(this.ctx.encoding.decode(e.slice(t + this.ctx.config.prefix.length).replace("https://", "https:/").replace("https:/", "https://").split("?")[0]))
                    } catch (t) {
                        return e
                    }
                    e = r.origin + r.pathname + i + (new URL(e).search ? r.search.replace("?", "&") : r.search)
                }
            }
            return e
        }
        let tC = class {
                constructor(e) {
                    this.encode = tE, this.decode = tk, this.ctx = e
                }
            },
            tA = /^(#|about:|mailto:|blob:|javascript:)/g,
            tP = /^data:([a-z\/A-Z0-9\-\+]+);?(charset\=[\-A-Za-z0-9]+)?;?(base64)?[;,]*(.*)/g,
            tI = /^([\/A-Za-z0-9\-%]+)(http[s]?:\/\/.*)/g;
        class tL {
            constructor(e) {
                this.BypassRegex = tA, this.DataRegex = tP, this.WeirdRegex = tI, this.ctx = e
            }
        }

        function tO(e) {
            for (var t in e = new URL(e.href)) this.ctx.meta[t] = e[t];
            return !0
        }
        let tT = class extends class {
                constructor() {}
            } {
                constructor(e) {
                    super(), this.load = tO, this.ctx = e
                }
            },
            tM = {
                csp: ["cross-origin-embedder-policy", "cross-origin-opener-policy", "cross-origin-resource-policy", "content-security-policy", "content-security-policy-report-only", "expect-ct", "feature-policy", "origin-isolation", "strict-transport-security", "upgrade-insecure-requests", "x-content-type-options", "x-frame-options", "x-permitted-cross-domain-policies", "x-xss-protection"],
                status: {
                    empty: [204, 101, 205, 304]
                },
                method: {
                    body: ["GET", "HEAD"]
                }
            };

        function tR(e, t = "") {
            return "text/css" === (this.ctx.modules.mime.contentType(t || e.pathname) || "text/css").split(";")[0]
        }

        function tN(e, t = "", i = "") {
            return t || this.ctx.modules.mime.contentType(e.pathname) != e.pathname ? "text/html" === (this.ctx.modules.mime.contentType(t || e.pathname) || "text/html").split(";")[0] || i.trim().match(/\<\!(doctype|DOCTYPE) html\>/g) : i.trim().match(/<(html|script|body)[^>]*>/g) && !!(-1 < (t = i.trim().indexOf((i.trim().match(/<(html|script|body)[^>]*>/g) || [])[0])) && t < 100)
        }

        function tB(e, t = "") {
            return !(!e.pathname.endsWith(".js") || "text/plain" != t) || "text/javascript" == (t = (this.ctx.modules.mime.contentType(t || e.pathname) || "application/javascript").split(";")[0]) || "application/javascript" == t || "application/x-javascript" == t
        }
        let tV = class {
            constructor(e) {
                this.html = tN, this.js = tB, this.css = tR, this.ctx = e
            }
        };

        function tj(e, t = 0) {
            let i = e.location.ancestorOrigins || [];
            var r = [e.Window, e.Location, e.WorkerLocation, e.Document].filter(e => e);
            [...r, e.Object].forEach(e => {
                delete e.prototype.__dynamic$location
            });
            let n = {
                get: () => e.__dynamic.location,
                set(t) {
                    if (t instanceof e.Location) return e.__dynamic.location = t;
                    e.__dynamic.location.href = t
                },
                configurable: !0
            };
            try {
                var s = new URL(e.__dynamic$url || e.__dynamic.url.decode(e.location.pathname + e.location.search + e.location.hash))
            } catch (t) {
                e.__dynamic$url = "about:blank", s = new URL("about:blank")
            }
            return e.__dynamic.property = s, e.__dynamic.meta.load(s), e.__dynamic.location = e.__dynamic.util.clone(e.location), ["href", "host", "hash", "origin", "hostname", "port", "pathname", "protocol", "search"].forEach(t => {
                e.__dynamic.define(e.__dynamic.location, t, {
                    get: () => "search" == t && e.location[t] + (e.location.search ? s.search.replace("?", "&") : s.search) || ("hash" == t ? location : s)[t],
                    set: i => e.location[t] = e.__dynamic.url.encode(e.__dynamic.meta.href.replace(s[t], i), s)
                })
            }), e.__dynamic.define(e.Object.prototype, "__dynamic$location", {
                get() {
                    var t;
                    return this === e || this === e.__dynamic$window || this === e.document || this === e.__dynamic$document ? null == (t = this.__dynamic) ? void 0 : t.location : this.location
                },
                set(t) {
                    return this === e || this === e.__dynamic$window || this === e.document || this === e.__dynamic$document ? this.__dynamic.location.href = t : this.location = t
                },
                configurable: !0
            }), ["assign", "replace", "toString", "reload"].forEach(t => {
                e.__dynamic.define(e.__dynamic.location, t, {
                    get: () => "toString" == t ? () => s.href : new e.__dynamic.Function("arg", `return window.location.${t}(arg?${"reload"!==t&&"toString"!==t?"(self.__dynamic).url.encode(arg, new URL('"+s.href+"'))":"arg"}:null)`),
                    set: () => null
                })
            }), i.length && e.__dynamic.define(e.__dynamic.location, "ancestorOrigins", {
                get: () => {
                    for (var t = e.__dynamic.util.clone(i), r = 0; r < i.length; r++) e.__dynamic.define(t, r, {
                        value: (e.top.__dynamic$location || e.__dynamic$location).origin,
                        configurable: !0,
                        enumerable: !0,
                        writable: !1
                    });
                    return e.__dynamic.define(t, "length", {
                        value: i.length,
                        configurable: !0,
                        enumerable: !0,
                        writable: !1
                    }), t
                },
                set: () => null
            }), r.forEach(t => {
                e.__dynamic.define(t.prototype, "__dynamic$location", n)
            }), e.__dynamic.hashchange || (e.__dynamic.hashchange = (e.addEventListener("hashchange", e => {}), !0)), e.__dynamic.location
        }

        function tD(e) {
            e.__dynamic$get = function(t) {
                var i = e.__dynamic.fire("get", [t]);
                if (i) return i;
                try {
                    return t == e.parent ? e.parent.__dynamic$window : t == e.top ? e.top.__dynamic$window : t == e.location || (e.Location || e.WorkerLocation) && t instanceof(e.Location || e.WorkerLocation) ? e.__dynamic$location : e.Document && t instanceof e.Document ? e.__dynamic$document : t == e ? e.__dynamic$window : "function" == typeof t && "__d$Send" == t.name ? e.__dynamic$message(t.target, e) : t
                } catch (e) {
                    return t
                }
            }, e.__dynamic$property = function(e) {
                return "string" != typeof e ? e : "location" == e ? "__dynamic$location" : "eval" == e ? "__dynamic$eval" : e
            }, e.__dynamic$set = function(t, i) {
                return t ? e.__dynamic.url.encode(e.__dynamic.meta.href.replace(e.__dynamic.property.href, i), e.__dynamic.property) : i
            }, e.__dynamic$var = function(e, t) {
                return window[t] = e
            }, e.dg$ = e.__dynamic$get, e.ds$ = e.__dynamic$set, e.dp$ = e.__dynamic$property, e.dv$ = e.__dynamic$var, e.d$g_ = e.__dynamic$get, e.d$s_ = e.__dynamic$set, e.d$p_ = e.__dynamic$property, e.d$v_ = e.__dynamic$var
        }

        function tF(e) {
            e.__dynamic.util.CreateDocumentProxy = function(t) {
                return new Proxy(t, {
                    get(i, r) {
                        let n = i[r];
                        return "location" == r ? (t.defaultView || e).__dynamic$location : "documentURI" == r && t.defaultView || "baseURI" == r && t.defaultView ? t.defaultView.__dynamic.location.toString() : n && ("function" == typeof n && n.toString == e.Object.toString ? new Proxy(n, {
                            apply: (i, r, s) => ((t.defaultView && s[0] == t.defaultView.__dynamic$document || s[0] == e.__dynamic$document) && (s[0] = t), n.apply(t, s))
                        }) : n)
                    },
                    set(e, i, r) {
                        try {
                            try {
                                t.defaultView.__dynamic ? t.defaultView.__dynamic.Reflect.set(e, i, r) : e[i] = r
                            } catch (e) {}
                            return r || e[i] || !0
                        } catch (t) {
                            return r || e[i] || !0
                        }
                    }
                })
            }, e.__dynamic.util.CreateWindowProxy = function(t) {
                return new Proxy(t, {
                    get(i, r) {
                        var n = e.__dynamic.Reflect.get(i, r);
                        if (Object.getOwnPropertyDescriptor(i, r)) {
                            var s = Object.getOwnPropertyDescriptor(i, r);
                            if (!1 === (null == s ? void 0 : s.configurable) && !1 === (null == s ? void 0 : s.writable) && null != s && s.hasOwnProperty("enumerable")) return (null == s ? void 0 : s.value) || (null == (s = null == s ? void 0 : s.get) ? void 0 : s.call(i))
                        }
                        return "__dynamic$self" == r ? t.window : "location" == r ? t.__dynamic$location : "parent" == r ? t.parent.__dynamic$window || t.parent : "top" == r ? (t.top.__dynamic ? t.top : t.parent).__dynamic$window : "self" == r || "globalThis" == r ? t.__dynamic$window : n && ("function" == typeof n && n.toString == e.Object.toString ? new Proxy(n, {
                            apply: (e, i, r) => Reflect.apply(e, t, r)
                        }) : n)
                    },
                    set(i, r, n) {
                        try {
                            var s = Object.getOwnPropertyDescriptor(i, r);
                            if (!1 === (null == s ? void 0 : s.writable) && !1 === (null == s ? void 0 : s.enumerable)) return !1;
                            if (r.constructor == e.Symbol) return Reflect.set(i, r, n), i[r];
                            if (i.hasOwnProperty("undefined") && i[r] + "" == r) return i[r] || n || !0;
                            if ("location" == r) return t.__dynamic$location = n;
                            if (i.hasOwnProperty(r) && !i.propertyIsEnumerable(r) && (null == s || !s.writable)) return i[r];
                            try {
                                t.__dynamic ? t.__dynamic.Reflect.set(i, r, n) : i[r] = n
                            } catch (e) {}
                            return i[r] || !0
                        } catch (e) {
                            return i[r] || !0
                        }
                    }
                })
            }, e.__dynamic.define(e, "__dynamic$window", {
                value: e.__dynamic.util.CreateWindowProxy(e),
                configurable: !1,
                enumerable: !1,
                writable: !1
            }), e.document && e.__dynamic.define(e, "__dynamic$document", {
                value: e.__dynamic.util.CreateDocumentProxy(e.document),
                configurable: !1,
                enumerable: !1,
                writable: !1
            }), e.__dynamic$globalThis = e.__dynamic$window, e.__dynamic$self = e.__dynamic$window
        }

        function t$(e) {
            e.__dynamic.rewrite.dom = function(t, i) {
                return void 0 === e.DOMParser ? t : t && ((t = (new e.DOMParser).parseFromString(t.toString(), "text/html").documentElement).querySelectorAll("script").forEach(function(t) {
                    !t.type || t.type && "text/javascript" !== t.type && "application/javascript" !== t.type && "application/x-javascript" !== t.type ? t.src && (t.src = e.__dynamic.url.encode(t.getAttribute("src"), i)) : t.innerHTML && (t.innerHTML = e.__dynamic.js.encode(t.innerHTML, {
                        type: "script"
                    }, i, {}))
                }), t.querySelectorAll("link").forEach(function(t) {
                    t.href && "stylesheet" !== t.getAttribute("rel") && (t.href = e.__dynamic.url.encode(t.getAttribute("href"), i))
                }), t.querySelectorAll("img").forEach(function(t) {
                    t.src && (t.src = e.__dynamic.url.encode(t.getAttribute("src"), i)), t.srcset && (t.srcset = e.__dynamic.rewrite.srcset.encode(t.getAttribute("srcset"), e.__dynamic))
                }), t.querySelectorAll("a").forEach(function(t) {
                    t.href && (t.href = e.__dynamic.url.encode(t.getAttribute("href"), i))
                }), t.querySelectorAll("style").forEach(function(t) {
                    t.innerHTML && (t.innerHTML = e.__dynamic.rewrite.css.rewrite(t.innerHTML, i))
                }), t.outerHTML)
            }
        }

        function tU(e) {
            var t;
            e.__dynamic.elements.config.forEach(t => {
                t.elements.forEach(i => {
                    t.tags.forEach(r => {
                        var n = (n = Object.getOwnPropertyDescriptor(i.prototype, r)) || Object.getOwnPropertyDescriptor(HTMLElement.prototype, r);
                        void 0 === i.prototype.setAttribute.__dynamic$target && (i.prototype.setAttribute = e.__dynamic.wrap(i.prototype.setAttribute, function(t, ...i) {
                            if (this instanceof HTMLLinkElement && e.__dynamic$icon && "href" == i[0].toLowerCase() && ("icon" == this.rel || "shortcut icon" == this.rel)) i[1] = e.__dynamic$icon;
                            else if (-1 != e.__dynamic.elements.attributes.indexOf(i[0].toLowerCase())) {
                                if ("srcset" == i[0].toLowerCase() || "imagesrcset" == i[0].toLowerCase()) this.dataset["dynamic_" + i[0]] = i[1], i[1] = e.__dynamic.rewrite.srcset.encode(i[1], e.__dynamic);
                                else {
                                    if ("integrity" == i[0].toLowerCase() || "nonce" == i[0].toLowerCase()) return this.dataset["dynamic_" + i[0]] = i[1], this.removeAttribute(i[0]), Reflect.apply(t, this, ["nointegrity", i[1]]);
                                    this.dataset["dynamic_" + i[0]] = i[1], i[1] = e.__dynamic.url.encode(i[1], e.__dynamic.baseURL || e.__dynamic.meta)
                                }
                            }
                            return Reflect.apply(t, this, i)
                        }, "setAttribute"), i.prototype.setAttributeNS = e.__dynamic.wrap(i.prototype.setAttributeNS, function(t, ...i) {
                            if (this instanceof HTMLLinkElement && e.__dynamic$icon && "href" == i[1].toLowerCase() && ("icon" == this.rel || "shortcut icon" == this.rel)) i[2] = e.__dynamic$icon;
                            else if (-1 != e.__dynamic.elements.attributes.indexOf(i[1].toLowerCase())) {
                                if ("srcset" == i[1].toLowerCase() || "imagesrcset" == i[1].toLowerCase()) this.dataset["dynamic_" + i[1]] = i[2], i[2] = e.__dynamic.rewrite.srcset.encode(i[2], e.__dynamic);
                                else {
                                    if ("integrity" == i[1].toLowerCase() || "nonce" == i[1].toLowerCase()) return this.dataset["dynamic_" + i[1]] = i[2], this.removeAttribute(i[1]), Reflect.apply(t, this, ["nointegrity", i[2]]);
                                    this.dataset["dynamic_" + i[1]] = i[2], i[2] = e.__dynamic.url.encode(i[2], e.__dynamic.baseURL || e.__dynamic.meta)
                                }
                            }
                            return Reflect.apply(t, this, i)
                        }, "setAttributeNS"), i.prototype.getAttribute = e.__dynamic.wrap(i.prototype.getAttribute, function(e, ...t) {
                            return this.dataset["dynamic_" + t[0]] ? this.dataset["dynamic_" + t[0]] : Reflect.apply(e, this, t)
                        }, "getAttribute"), i.prototype.getAttributeNS = e.__dynamic.wrap(i.prototype.getAttributeNS, function(e, ...t) {
                            return this.dataset["dynamic_" + t[1]] ? this.dataset["dynamic_" + t[1]] : Reflect.apply(e, this, t)
                        }, "getAttributeNS")), e.__dynamic.define(i.prototype, r, {
                            get() {
                                if ("window" == t.action) {
                                    var i = e.__dynamic.elements.contentWindow.get.call(this);
                                    let t = !0;
                                    try {
                                        i.location.href
                                    } catch (e) {
                                        t = !1
                                    }
                                    if (!t || i.__dynamic || e.__dynamic.elements.client(i, e.__dynamic$config, decodeURIComponent(this.src)), "contentDocument" == r) return i.document;
                                    if ("contentWindow" == r) return t && i.__dynamic$window || i
                                }
                                if ("css" != t.action) try {
                                    return e.__dynamic.url.decode(n.get.call(this))
                                } catch (e) {}
                                return n.get.call(this)
                            },
                            set(i) {
                                return i && "string" == typeof i && (i = i.toString()), "href" == r && this instanceof HTMLLinkElement && e.__dynamic$icon && ("icon" == this.rel || "shortcut icon" == this.rel) && (this.dataset["dynamic_" + r] = i, i = e.__dynamic$icon), "html" == t.action ? (Promise.resolve(e.__dynamic.createBlobHandler(new Blob([i], {
                                    type: "text/html"
                                }), this, i)).then(e => {
                                    this.setAttribute(r, e)
                                }), i) : ("srcset" == t.action && (i = e.__dynamic.rewrite.srcset.encode(i, e.__dynamic)), "rewrite" == t.action ? (this.dataset["dynamic_" + r] = i, this.removeAttribute(r), this.setAttribute(t.new, i)) : ("css" == t.action && (i = e.__dynamic.rewrite.css.rewrite(i, e.__dynamic.meta)), "url" == t.action && (i = e.__dynamic.url.encode(i, e.__dynamic.baseURL || e.__dynamic.meta)), this.dataset["dynamic_" + r] = i, n.set.call(this, i)))
                            }
                        })
                    })
                })
            }), ["innerHTML", "outerHTML"].forEach(t => {
                e.__dynamic.define(e.HTMLElement.prototype, t, {
                    get() {
                        return (this["__" + t] || e.__dynamic.elements[t].get.call(this)).toString()
                    },
                    set(i) {
                        return this["__" + t] = (new DOMParser).parseFromString(i, "text/html").body.innerHTML, this instanceof e.HTMLTextAreaElement ? e.__dynamic.elements[t].set.call(this, i) : this instanceof e.HTMLScriptElement ? e.__dynamic.elements[t].set.call(this, e.__dynamic.rewrite.js.rewrite(i, {
                            type: "script"
                        })) : this instanceof e.HTMLStyleElement ? e.__dynamic.elements[t].set.call(this, e.__dynamic.rewrite.css.rewrite(i, e.__dynamic.meta)) : e.__dynamic.elements[t].set.call(this, e.__dynamic.rewrite.dom(i, e.__dynamic.meta))
                    }
                })
            }), ["MutationObserver", "ResizeObserver", "IntersectionObserver"].forEach(t => {
                e[t].prototype.observe = e.__dynamic.wrap(e[t].prototype.observe, function(t, ...i) {
                    return i[0] == e.__dynamic$document && (i[0] = e.document), Reflect.apply(t, this, i)
                }, t + ".prototype.observe")
            }), e.__dynamic.defines(e.HTMLAnchorElement.prototype, {
                pathname: e.__dynamic.elements.createGetter("pathname"),
                origin: e.__dynamic.elements.createGetter("origin"),
                host: e.__dynamic.elements.createGetter("host"),
                hostname: e.__dynamic.elements.createGetter("hostname"),
                port: e.__dynamic.elements.createGetter("port"),
                protocol: e.__dynamic.elements.createGetter("protocol"),
                search: e.__dynamic.elements.createGetter("search"),
                hash: e.__dynamic.elements.createGetter("hash"),
                toString: {
                    get: function() {
                        return this.__toString || (() => this.href ? new URL(this.href).toString() : "")
                    },
                    set: function(e) {
                        this.__toString = e
                    }
                }
            }), e.HTMLElement.prototype.insertAdjacentHTML = e.__dynamic.wrap(e.HTMLElement.prototype.insertAdjacentHTML, function(t, ...i) {
                return this instanceof e.HTMLStyleElement ? Reflect.apply(t, this, [i[0], e.__dynamic.rewrite.css.rewrite(i[1], e.__dynamic.meta)]) : this instanceof e.HTMLScriptElement ? Reflect.apply(t, this, [i[0], e.__dynamic.rewrite.js.rewrite(i[1], {
                    type: "script"
                }, !1, e.__dynamic)]) : this instanceof e.HTMLTextAreaElement ? Reflect.apply(t, this, i) : Reflect.apply(t, this, [i[0], e.__dynamic.rewrite.html.rewrite(i[1], e.__dynamic.meta)])
            }, "insertAdjacentHTML"), [
                [e.Node, "textContent"],
                [e.HTMLElement, "innerText"]
            ].forEach(([t, i]) => {
                var r = Object.getOwnPropertyDescriptor(t.prototype, i);

                function n() {
                    return this["__" + i] || (null == r ? void 0 : r.get) && r.get.call(this)
                }
                e.__dynamic.define(e.HTMLStyleElement.prototype, i, {
                    get: n,
                    set(t) {
                        return this["__" + i] = t, (null == r ? void 0 : r.set) && r.set.call(this, e.__dynamic.rewrite.css.rewrite(t, e.__dynamic.meta))
                    }
                }), e.__dynamic.define(e.HTMLScriptElement.prototype, i, {
                    get: n,
                    set(t) {
                        return this["__" + i] = t, null !== this.type || "application/javascript" !== this.type || "text/javascript" !== this.type || "application/x-javascript" !== this.type ? (null == r ? void 0 : r.set) && r.set.call(this, t) : (null == r ? void 0 : r.set) && r.set.call(this, e.__dynamic.rewrite.js.rewrite(t, {
                            type: "script"
                        }, !1, e.__dynamic))
                    }
                })
            }), e.Text.prototype.toString = function() {
                return this.textContent
            }, e.document.createElement = e.__dynamic.wrap(e.document.createElement, function(e, ...t) {
                return (e = Reflect.apply(e, this, t)).rewritten = !0, "iframe" == t[0].toLowerCase() && (e.src = "about:blank"), e
            }, "createElement"), document.querySelector('link[rel="icon"], link[rel="shortcut icon"]') || ((t = document.createElement("link")).rel = "icon", t.href = (e.__dynamic$icon || "/favicon.ico") + "?dynamic", t.dataset.dynamic_hidden = "true", document.head.appendChild(t)), e.__dynamic.define(e.Attr.prototype, "value", {
                get() {
                    return this.__value || e.__dynamic.elements.attrValue.get.call(this)
                },
                set(t) {
                    return this.__value = t, "href" == this.name || "src" == this.name ? e.__dynamic.elements.attrValue.set.call(this, e.__dynamic.url.encode(t, e.__dynamic.meta)) : "style" == this.name ? e.__dynamic.elements.attrValue.set.call(this, e.__dynamic.rewrite.css.rewrite(t, e.__dynamic.meta)) : "onclick" == this.name ? e.__dynamic.elements.attrValue.set.call(this, e.__dynamic.rewrite.js.rewrite(t, {
                        type: "script"
                    }, !1, e.__dynamic)) : e.__dynamic.elements.attrValue.set.call(this, t)
                }
            })
        }

        function tH(e) {
            let t = e.XMLHttpRequest;
            e.Worker = new Proxy(e.Worker, {
                construct(i, r) {
                    var n;
                    return r[0] && (r[0] = r[0].toString(), r[0].trim().startsWith("blob:" + e.location.origin) ? ((n = new t).open("GET", r[0], !1), n.send(), n = e.__dynamic.rewrite.js.rewrite(n.responseText, {
                        type: "worker"
                    }, !0), n = new Blob([n], {
                        type: "application/javascript"
                    }), r[0] = URL.createObjectURL(n)) : r[0] = e.__dynamic.url.encode(r[0], e.__dynamic.meta)), Reflect.construct(i, r)
                }
            })
        }

        function tW(e) {
            e.__dynamic$history = function(t, ...i) {
                i[2] && (i[2] = e.__dynamic.url.encode(i[2], e.__dynamic.meta)), e.__dynamic.Reflect.apply(t, this, i), e.__dynamic.client.location(e, !0, !1)
            }, e.History.prototype.pushState = e.__dynamic.wrap(e.History.prototype.pushState, e.__dynamic$history), e.History.prototype.replaceState = e.__dynamic.wrap(e.History.prototype.replaceState, e.__dynamic$history)
        }

        function tq(e) {
            e.WebSocket = new Proxy(e.WebSocket, {
                construct(t, i) {
                    var r;
                    return r = i[0], i = i[1], e.__dynamic.bare.createWebSocket.apply(e.__dynamic.bare, [r, i || [], {}])
                }
            })
        }

        function tG(e) {
            e.Request = e.__dynamic.wrap(e.Request, function(t, ...i) {
                return i[0] instanceof t ? (t = Reflect.construct(t, i), "navigate" === i[0].mode && (t.mode = "same-origin"), t) : (i[0] && (i[0] = e.__dynamic.url.encode(i[0], e.__dynamic.meta)), i)
            }), e.__dynamic.define(e.Request.prototype, "url", {
                get() {
                    return e.__dynamic.url.decode(e.__dynamic.http.RequestURL.get.call(this))
                },
                set: e => e
            }), e.fetch = e.__dynamic.wrap(e.fetch, function(t, ...i) {
                return e.Request && ("Request" === i[0].constructor.name || i[0] instanceof e.Request) ? console.log(i[0]) : i[0] && e.__dynamic && (i[0] = e.__dynamic.url.encode(i[0], e.__dynamic.meta)), Reflect.apply(t, e, i)
            }, "fetch"), e.XMLHttpRequest.prototype.open = e.__dynamic.wrap(e.XMLHttpRequest.prototype.open, function(t, ...i) {
                return i[1] && (i[1] = e.__dynamic.url.encode(i[1], e.__dynamic.meta)), !1 === i[2] && (i[2] = !0), Reflect.apply(t, this, i)
            }, "XMLHttpRequest.prototype.open"), Object.defineProperty(e.XMLHttpRequest.prototype, "responseURL", {
                get() {
                    return e.__dynamic.url.decode(e.__dynamic.http.XMLResponseURL.get.call(this))
                },
                set: e => e
            }), Object.defineProperty(e.Response.prototype, "url", {
                get() {
                    return e.__dynamic.url.decode(e.__dynamic.http.ResponseURL.get.call(this))
                },
                set: e => e
            }), e.open = e.__dynamic.wrap(e.open, function(t, ...i) {
                "" != i[0] && i[0] && (i[0] = e.__dynamic.url.encode(i[0], e.__dynamic.meta)), "" == i[0] && (i[0] = "about:blank"), (t = Reflect.apply(t, this, i)).opener = e.__dynamic$window;
                try {
                    "about:" === new URL(i[0]).protocol ? t.__dynamic$url = "about:srcdoc" : t.__dynamic$url = e.__dynamic.url.decode(i[0])
                } catch (e) {
                    t.__dynamic$url = "about:srcdoc"
                }
                return e.__dynamic.elements.client(t, e.__dynamic$config, t.__dynamic$url), t.__dynamic$window
            }, "window.open"), e.__dynamic.define(e, "__dynamic$import", {
                get: () => function(t, i) {
                    try {
                        return e.__dynamic.url.encode(t, new URL(i))
                    } catch (i) {
                        return e.__dynamic.url.encode(t, e.__dynamic.meta)
                    }
                },
                set: () => {}
            })
        }

        function tz(e) {
            e.__dynamic$message = function(t, i = top) {
                return t = t || e,
                    function() {
                        var r, n = arguments;
                        return "Worker" == (r = t).constructor.name || "MessagePort" == r.constructor.name || "DedicatedWorkerGlobalScope" == e.constructor.name || "Window" != (r = t).constructor.name && "global" != r.constructor.name ? t.postMessage.call(t, ...n) : ((t = t.__dynamic$self ? t.__dynamic$self : t)._postMessage || t.postMessage).call(t, [n[0], i.__dynamic$location.origin, i.location.href, i.name, i !== e], "*", n[2] || [])
                    }
            }, "Window" == e.constructor.name && (e.addEventListener && (e.addEventListener = new Proxy(e.addEventListener, {
                apply(t, i, r) {
                    var n;
                    return i == e.__dynamic$window && (i = e), r[1] && r[0] && "function" == typeof r[1] && "message" == r[0] && (n = r[1].bind({}), r[1] = function(t) {
                        return n(function(t) {
                            let i;
                            var r, n, s = e.__dynamic.util.clone(t);
                            for (var a in t.source && (r = t.data[3], n = t.data[2], i = Object.keys(window || {}).map(e => parseInt(e)).filter(e => isFinite(e)).map(e => window[e]).filter(e => e || !1).find(e => {
                                    try {
                                        return e.name == r && e.location.href == n
                                    } catch (e) {
                                        return !1
                                    }
                                }) || t.currentTarget), e.__dynamic.define(s, "isTrusted", {
                                    value: !0,
                                    writable: !1
                                }), t.origin && (Array.isArray(t.data) && 5 == t.data.length ? e.__dynamic.define(s, "origin", {
                                    value: t.data[1],
                                    writable: !1
                                }) : e.__dynamic.define(s, "origin", {
                                    value: t.origin,
                                    writable: !1
                                })), t.data && (Array.isArray(t.data) && 5 == t.data.length ? e.__dynamic.define(s, "data", {
                                    value: t.data[0],
                                    writable: !1
                                }) : e.__dynamic.define(s, "data", {
                                    value: t.data,
                                    writable: !1
                                })), t.source && (i ? e.__dynamic.define(s, "source", {
                                    value: (null == i ? void 0 : i.__dynamic$window) || i,
                                    writable: !0
                                }) : e.__dynamic.define(s, "source", {
                                    value: i || Array.isArray(t.data) && 3 == t.data.length && !0 === t.data[2] ? t.source : t.currentTarget,
                                    writable: !0
                                })), t) "isTrusted" !== a && "origin" !== a && "data" !== a && "source" !== a && e.__dynamic.define(s, a, {
                                value: t[a],
                                writable: !1
                            });
                            return s
                        }(t))
                    }), Reflect.apply(t, i, r)
                }
            })), "Window" == e.constructor.name) && e.__dynamic.define(e, "onmessage", {
                get: () => e._onmessage || null,
                set: t => (e._onmessage && e.removeEventListener("message", e._onmessage), e.addEventListener("message", t), e._onmessage = t)
            })
        }

        function tK(e) {
            function t(i, ...r) {
                for (var n in r) r[n] = e.__dynamic.rewrite.dom(r[n], e.__dynamic.meta);
                return i.apply(this, r)
            } ["write", "writeln"].forEach(i => {
                e.document[i] = e.__dynamic.wrap(e.document[i], t, "document." + i)
            })
        }

        function tQ(e) {
            e.importScripts = new Proxy(e.importScripts, {
                apply: (t, i, r) => ([...r].forEach((t, i) => {
                    r[i] = e.__dynamic.url.encode(t, e.__dynamic.meta)
                }), Reflect.apply(t, i, r))
            }), e.__dynamic.define(e.__dynamic, "_location", {
                value: e.location,
                writable: !0
            }), e.__dynamic.define(e.WorkerGlobalScope.prototype, "location", {
                get: () => e.__dynamic.location,
                set: e => e
            }), e.location = e.__dynamic.location
        }

        function tX(e) {
            var t = e.Reflect.get.bind({}),
                i = e.Reflect.set.bind({});
            e.Reflect.set = e.__dynamic.wrap(e.Reflect.set, function(t, ...r) {
                return "Window" == r[0].constructor.name && "location" == r[1] ? (r[0].__dynamic$location = r[2], !0) : "Location" == r[0].constructor.name ? (e.__dynamic$location[r[1]] = r[2], !0) : Reflect.apply(i, this, r)
            }, "Reflect.set"), e.Reflect.get = e.__dynamic.wrap(e.Reflect.get, function(i, ...r) {
                if ("object" == typeof r[0]) {
                    if ("Window" == r[0].constructor.name) {
                        if ("location" == r[1]) return r[0].__dynamic ? r[0].__dynamic$location : Reflect.apply(t, this, r);
                        if (r[0][r[1]] && "Window" == r[0][r[1]].constructor.name) return r[0][r[1]].__dynamic$window
                    }
                    if ("Location" == r[0].constructor.name) return e.__dynamic$location[r[1]]
                }
                return Reflect.apply(t, this, r)
            }, "Reflect.get"), e.__dynamic.Reflect = {
                get: t,
                set: i,
                apply: e.Reflect.apply.bind({}),
                construct: e.Reflect.construct.bind({}),
                defineProperty: e.Reflect.defineProperty.bind({}),
                deleteProperty: e.Reflect.deleteProperty.bind({}),
                getOwnPropertyDescriptor: e.Reflect.getOwnPropertyDescriptor.bind({}),
                getPrototypeOf: e.Reflect.getPrototypeOf.bind({}),
                has: e.Reflect.has.bind({}),
                isExtensible: e.Reflect.isExtensible.bind({}),
                ownKeys: e.Reflect.ownKeys.bind({}),
                preventExtensions: e.Reflect.preventExtensions.bind({}),
                setPrototypeOf: e.Reflect.setPrototypeOf.bind({})
            }
        }

        function tY(e) {
            e.__dynamic.define(e.document, "origin", {
                value: e.__dynamic$location.origin,
                configurable: !1,
                enumerable: !1
            }), e.__dynamic.define(e.document, "domain", {
                value: e.__dynamic$location.hostname,
                configurable: !1,
                enumerable: !1
            }), ["referrer", "URL", "documentURI"].forEach(t => {
                e.__dynamic.define(e.document, t, {
                    value: e.__dynamic$location.toString(),
                    configurable: !1,
                    enumerable: !1
                })
            }), [e.document, e.HTMLElement.prototype].forEach(t => {
                e.__dynamic.define(t, "baseURI", {
                    get: () => (e.__dynamic.baseURL || e.__dynamic$location).href
                })
            }), ["getEntries", "getEntriesByName", "getEntriesByType"].forEach(t => {
                e.performance[t] = new Proxy(e.performance[t], {
                    apply: (t, i, r) => Reflect.apply(t, i, r).filter(t => !(null != (t = t.name) && t.includes(e.location.origin + "/dynamic/dynamic."))).filter(t => !t.name.includes(e.location.origin + e.__dynamic.config.prefix + "caches/")).map(t => {
                        if (t.name) {
                            var i, r, n = e.__dynamic.util.clone(t);
                            for (i in n.__defineGetter__("name", function() {
                                    return this._name
                                }), n.__defineSetter__("name", function(e) {
                                    this._name = e
                                }), n.name = e.__dynamic.url.decode(t.name), e.__dynamic.define(n, "name", {
                                    get: void 0,
                                    set: void 0
                                }), e.__dynamic.define(n, "name", {
                                    value: n._name,
                                    writable: !1
                                }), delete n._name, t) "name" != i && (r = "function" == typeof t[i] ? new Proxy(t[i], {
                                apply(e, i, r) {
                                    if ("toJSON" != e.name) return Reflect.apply(e, t, r);
                                    var s, a = {};
                                    for (s in n) a[s] = n[s];
                                    return a
                                }
                            }) : t[i], Object.defineProperty(n, i, {
                                value: r,
                                writable: !0
                            }));
                            t = n
                        }
                        return t
                    })
                })
            }), e.MouseEvent && (e.MouseEvent.prototype.initMouseEvent = e.__dynamic.wrap(e.MouseEvent.prototype.initMouseEvent, function(t, ...i) {
                return i.length && (i = i.map(t => t == e.__dynamic$window ? e : t)), Reflect.apply(t, this, i)
            })), e.KeyboardEvent && (e.KeyboardEvent.prototype.initKeyboardEvent = e.__dynamic.wrap(e.KeyboardEvent.prototype.initKeyboardEvent, function(t, ...i) {
                return i.length && (i = i.map(t => t == e.__dynamic$window ? e : t)), Reflect.apply(t, this, i)
            })), e.StorageEvent && (e.StorageEvent.prototype.initStorageEvent = e.__dynamic.wrap(e.StorageEvent.prototype.initStorageEvent, function(t, ...i) {
                return i.length && (i = i.map(t => t == e.localStorage ? e.__dynamic.storage.localStorage : t == e.sessionStorage ? e.__dynamic.storage.sessionStorage : t)), Reflect.apply(t, this, i)
            })), e.Object.defineProperty = e.__dynamic.wrap(e.Object.defineProperty, function(e, ...t) {
                try {
                    return Reflect.apply(e, this, t)
                } catch (e) {
                    e.toString().includes("Cannot redefine property:") && (t[0].__defined || (t[0].__defined = {}), t[0].__defined[t[1]] = t[2])
                }
            }), "https://www.google.com" == e.__dynamic.meta.origin && (e.setInterval = new Proxy(e.setInterval, {
                apply: (e, t, i) => 500 == i[1] ? null : Reflect.apply(e, t, i)
            }))
        }

        function tZ(e) {
            e.Storage.prototype.setItem = e.__dynamic.wrap(e.Storage.prototype.setItem, function(t, ...i) {
                return i[0] && (i[0] = "__dynamic$" + e.__dynamic$location.host + "$" + i[0].toString()), Reflect.apply(t, this, i)
            }, "Storage.prototype.setItem"), e.Storage.prototype.getItem = e.__dynamic.wrap(e.Storage.prototype.getItem, function(t, ...i) {
                return i[0] && (i[0] = "__dynamic$" + e.__dynamic$location.host + "$" + i[0].toString()), Reflect.apply(t, this, i) || null
            }, "Storage.prototype.getItem"), e.Storage.prototype.removeItem = e.__dynamic.wrap(e.Storage.prototype.removeItem, function(t, ...i) {
                return i[0] && (i[0] = "__dynamic$" + e.__dynamic$location.host + "$" + i[0].toString()), Reflect.apply(t, this, i)
            }, "Storage.prototype.removeItem"), e.Storage.prototype.clear = e.__dynamic.wrap(e.Storage.prototype.clear, function(t) {
                for (var i, r, n = [], s = 0; s < this.length; s++) null != (i = t.call(this, s)) && i.startsWith("__dynamic$" + e.__dynamic$location.host + "$") && n.push(null == (i = t.call(this, s)) ? void 0 : i.replace("__dynamic$" + e.__dynamic$location.host + "$", ""));
                for (r in n) t.call(this, n[r])
            }, "Storage.prototype.clear"), e.Storage.prototype.key = e.__dynamic.wrap(e.Storage.prototype.key, function(t, ...i) {
                for (var r, n = [], s = 0; s < this.length; s++) null != (r = t.call(this, s)) && r.startsWith("__dynamic$" + e.__dynamic$location.host + "$") && n.push(null == (r = t.call(this, s)) ? void 0 : r.replace("__dynamic$" + e.__dynamic$location.host + "$", ""));
                return n[i[0]] || null
            }, "Storage.prototype.key"), ["localStorage", "sessionStorage"].forEach(t => {
                e["__dynamic$" + t] = new Proxy(e[t], {
                    get(i, r) {
                        if ("length" != r) return e.__dynamic.storage.methods.includes(r) ? e.__dynamic.storage.cloned[t][r].bind(e.__dynamic.storage[t]) : e.__dynamic.storage[t].getItem("__dynamic$" + e.__dynamic$location.host + "$" + r.toString());
                        for (var n = [], s = 0; s < Object.keys(e.__dynamic.storage[t]).length; s++) Object.keys(e.__dynamic.storage[t])[s].startsWith("__dynamic$" + e.__dynamic$location.host + "$") && n.push(Object.keys(e.__dynamic.storage[t])[s].replace("__dynamic$" + e.__dynamic$location.host + "$", ""));
                        return n.length
                    },
                    set: (i, r, n) => (e.__dynamic.storage[t].setItem("__dynamic$" + e.__dynamic$location.host + "$" + r.toString(), n), n || !0),
                    deleteProperty: (i, r) => e.__dynamic.storage[t].removeItem("__dynamic$" + e.__dynamic$location.host + "$" + r.toString())
                }), delete e[t], e[t] = e["__dynamic$" + t]
            })
        }

        function tJ(e) {
            "serviceWorker" in e.navigator && (e.__dynamic.sw = e.navigator.serviceWorker, delete e.navigator.serviceWorker, delete e.Navigator.prototype.serviceWorker), e.navigator.sendBeacon = e.__dynamic.wrap(e.navigator.sendBeacon, function(t, ...i) {
                return i[0] && (i[0] = e.__dynamic.url.encode(i[0], e.__dynamic.meta)), Reflect.apply(t, this, i)
            }, "navigator.sendBeacon")
        }
        let t0 = e => e ? e.split(";").map(e => e.split("=")).reduce((e, t) => (e[t[0].trim()] = t[1].trim(), e), {}) : {},
            t1 = (e = []) => e.map(e => e.name + "=" + e.value).join("; ");

        function t2(e) {
            if (delete e.Document.prototype.cookie, e.__dynamic.define(e.document, "cookie", {
                    get() {
                        return e.__dynamic.fire("getCookies", [e.__dynamic.location.host, e.__dynamic.cookie.str || ""]) || (e.__dynamic.cookies.update(e.__dynamic.location.host), e.__dynamic.cookie.str) || e.__dynamic.cookie.desc.get.call(this) || ""
                    },
                    set(t) {
                        var i = e.__dynamic.modules.setCookieParser.parse(t, {
                                decodeValues: !1
                            })[0],
                            t = e.__dynamic.fire("setCookie", [e.__dynamic.location.host, t, i]);
                        if (t) return t;
                        i.name = i.name.replace(/^\./g, ""), Promise.resolve(e.__dynamic.cookies.set(e.__dynamic.location.host, e.__dynamic.modules.cookie.serialize(i.name, i.value, Object.assign(Object.assign({}, i), {
                            encode: e => e
                        })))).then(t => {
                            var i, r, n, s;
                            return i = this, r = void 0, n = void 0, s = function*() {
                                yield e.__dynamic.cookies.update(e.__dynamic.location.host), e.__dynamic.cookie.str = yield e.__dynamic.cookies.get(e.__dynamic.location.host)
                            }, new(n = n || Promise)(function(e, t) {
                                function a(e) {
                                    try {
                                        c(s.next(e))
                                    } catch (e) {
                                        t(e)
                                    }
                                }

                                function o(e) {
                                    try {
                                        c(s.throw(e))
                                    } catch (e) {
                                        t(e)
                                    }
                                }

                                function c(t) {
                                    var i;
                                    t.done ? e(t.value) : ((i = t.value) instanceof n ? i : new n(function(e) {
                                        e(i)
                                    })).then(a, o)
                                }
                                c((s = s.apply(i, r || [])).next())
                            })
                        }), (t = t0(e.__dynamic.cookie.str || ""))[i.name] = i.value, e.__dynamic.cookie.str = t1(Object.entries(t).map(e => ({
                            name: e[0],
                            value: e[1]
                        })))
                    }
                }), e.navigator.serviceWorker) try {
                e.navigator.serviceWorker.onmessage = ({
                    data: t
                }) => {
                    var i, r;
                    t.host == e.__dynamic.location.host && "set-cookie" == t.type && (i = e.__dynamic.modules.cookie.parse(t.val), (r = t0(e.__dynamic.cookie.str || ""))[Object.entries(i)[0][0]] = Object.entries(i)[0][1], e.__dynamic.cookie.str = t1(Object.entries(r).map(e => ({
                        name: e[0],
                        value: e[1]
                    })))), t.host == e.__dynamic.location.host && "cookies" == t.type && (e.__dynamic.cookie.str = t.cookies)
                }
            } catch (e) {}
        }

        function t3(e) {
            e.CSSStyleDeclaration.prototype._setProperty = e.CSSStyleDeclaration.prototype.setProperty, e.CSSStyleDeclaration.prototype.setProperty = e.__dynamic.wrap(e.CSSStyleDeclaration.prototype.setProperty, function(t, ...i) {
                return "background-image" != i[0] && "background" != i[0] && "backgroundImage" != i[0] || (i[1] = e.__dynamic.rewrite.css.rewrite(i[1], e.__dynamic.meta)), t.apply(this, i)
            }, "CSSStyleDeclaration.prototype.setProperty"), e.__dynamic.define(e.CSSStyleDeclaration.prototype, "background", {
                get() {
                    return this._background || this.getPropertyValue("background")
                },
                set(t) {
                    return this._background = t, this._setProperty("background", e.__dynamic.rewrite.css.rewrite(t, e.__dynamic.meta))
                }
            }), e.__dynamic.define(e.CSSStyleDeclaration.prototype, "backgroundImage", {
                get() {
                    return this._backgroundImage || this.getPropertyValue("background-image")
                },
                set(t) {
                    return this._backgroundImage = t, this._setProperty("background-image", e.__dynamic.rewrite.css.rewrite(t, e.__dynamic.meta))
                }
            }), e.__dynamic.define(e.CSSStyleDeclaration.prototype, "background-image", {
                get() {
                    return this._backgroundImage || this.getPropertyValue("background-image")
                },
                set(t) {
                    return this._backgroundImage = t, this._setProperty("background-image", e.__dynamic.rewrite.css.rewrite(t, e.__dynamic.meta))
                }
            })
        }

        function t4(e) {
            e.__dynamic.createBlobHandler = function(t, i, r) {
                var n, s, a, o;
                return n = this, s = void 0, a = void 0, o = function*() {
                    var n = (yield e.__dynamic.sw.ready).active;
                    e.__dynamic.sw.addEventListener("message", ({
                        data: {
                            url: t
                        }
                    }) => {
                        t && e.__dynamic.elements.iframeSrc.set.call(i, t)
                    }, {
                        once: !0
                    }), n.postMessage({
                        type: "createBlobHandler",
                        blob: t,
                        url: e.__dynamic.modules.base64.encode(r.toString().split("").slice(0, 10)),
                        location: e.__dynamic.location.href
                    })
                }, new(a = a || Promise)(function(e, t) {
                    function i(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            t(e)
                        }
                    }

                    function r(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            t(e)
                        }
                    }

                    function c(t) {
                        var n;
                        t.done ? e(t.value) : ((n = t.value) instanceof a ? n : new a(function(e) {
                            e(n)
                        })).then(i, r)
                    }
                    c((o = o.apply(n, s || [])).next())
                })
            }
        }

        function t6(e, t) {
            var i, r, n;

            function s(e) {
                var i, r;
                e.rewritten || 1 !== e.nodeType && 3 !== e.nodeType || ((e = new Proxy(e, {
                    get: (e, i) => "src" == i || "href" == i || "srcset" == i || "imageSrcset" == i || "data" == i || "action" == i ? t.elements.getAttribute.call(e, i.toLowerCase()) : "setAttribute" == i || "getAttribute" == i || "removeAttribute" == i || "hasAttribute" == i || "cloneNode" == i || "addEventListener" == i ? (...r) => t.elements[i].call(e, ...r) : "node" == i ? e : e[i],
                    set: (e, i, r) => ("src" == i || "href" == i || "srcset" == i || "imageSrcset" == i || "data" == i || "action" == i ? t.elements.setAttribute.call(e, i.toLowerCase(), r) : e[i] = r, !0)
                })) instanceof HTMLScriptElement && (e.src && (e.dataset.dynamic_src = e.src, e.src = t.url.encode(e.src, t.meta)), e.type && null != (i = e.textContent) && i.length ? ("application/javascript" == e.type || "text/javascript" == e.type || "application/x-javascript" == e.type && null != (i = e.textContent) && i.length) && (e.textContent = t.rewrite.js.rewrite(e.textContent, {
                    type: "script"
                }, !1, t)) : !e.type && null != (i = e.textContent) && i.length && (e.textContent = t.rewrite.js.rewrite(e.textContent, {
                    type: "script"
                }, !1, t))), e instanceof HTMLStyleElement && null != (i = e.textContent) && i.length && (e.textContent = t.rewrite.css.rewrite(e.textContent, t.meta)), e instanceof HTMLIFrameElement && (e.src && (e.dataset.dynamic_src = e.src, e.src = t.url.encode(e.src, t.meta)), e.srcdoc) && (e.dataset.dynamic_srcdoc = e.srcdoc, i = new Blob([t.rewrite.html.rewrite(e.srcdoc, t.meta)], {
                    type: "text/html"
                }), e.src = URL.createObjectURL(i)), e instanceof HTMLLinkElement && ("stylesheet" !== e.getAttribute("rel") && "prefetch" !== e.getAttribute("rel") && "dns-prefetch" !== e.getAttribute("rel") ? (e.href && (e.dataset.dynamic_href = e.href, e.href = t.url.encode(e.href, t.meta)), e.imageSrcset && (e.dataset.dynamic_imagesrcset = e.imageSrcset, e.imageSrcset = t.rewrite.srcset.encode(e.imageSrcset, t))) : e.addEventListener("error", i => {
                    if (e instanceof HTMLLinkElement) return e.href && (e.dataset.dynamic_href = e.href, e.href = t.url.encode(e.href, t.meta)), e.imageSrcset && (e.dataset.dynamic_imagesrcset = e.imageSrcset, e.imageSrcset = t.rewrite.srcset.encode(e.imageSrcset, t)), i.preventDefault(), !1
                }, {
                    once: !0
                })), e instanceof HTMLAnchorElement && e.href && (e.dataset.dynamic_href = e.href, e.href = t.url.encode(e.href, t.meta)), e instanceof HTMLFormElement && e.action && (e.dataset.dynamic_action = e.action, e.action = t.url.encode(e.action, t.meta)), e instanceof HTMLObjectElement && e.data && (e.dataset.dynamic_data = e.data, e.data = t.url.encode(e.data, t.meta)), e instanceof HTMLSourceElement && (e.src && (e.dataset.dynamic_src = e.src, e.src = t.url.encode(e.src, t.meta)), e.srcset) && (e.dataset.dynamic_srcset = e.srcset, e.srcset = t.rewrite.srcset.encode(e.srcset, t)), e instanceof HTMLImageElement && (e.src && (e.dataset.dynamic_src = e.src, e.src = t.url.encode(e.src, t.meta)), e.srcset) && (e.dataset.dynamic_srcset = e.srcset, e.srcset = t.rewrite.srcset.encode(e.srcset, t)), e instanceof HTMLAreaElement && e.href && (e.dataset.dynamic_href = e.href, e.href = t.url.encode(e.href, t.meta)), e instanceof HTMLBaseElement && e.href && (e.dataset.dynamic_href = e.href, e.href = t.url.encode(e.href, t.meta)), e instanceof HTMLInputElement && e.src && (e.dataset.dynamic_src = e.src, e.src = t.url.encode(e.src, t.meta)), e instanceof HTMLAudioElement && e.src && (e.dataset.dynamic_src = e.src, e.src = t.url.encode(e.src, t.meta)), e instanceof HTMLVideoElement && e.src && (e.dataset.dynamic_src = e.src, e.src = t.url.encode(e.src, t.meta)), e instanceof HTMLTrackElement && e.src && (e.dataset.dynamic_src = e.src, e.src = t.url.encode(e.src, t.meta)), e instanceof HTMLMediaElement && e.src && (e.dataset.dynamic_src = e.src, e.src = t.url.encode(e.src, t.meta)), e instanceof HTMLMetaElement && e.httpEquiv && ("refresh" == e.httpEquiv.toLowerCase() && (i = e.content.split(";url=")[0], r = e.content.split(";url=")[1], e.content = i + ";url=" + t.url.encode(r, t.meta)), "content-security-policy" == e.httpEquiv.toLowerCase()) && e.remove(), e instanceof HTMLElement && (e.getAttribute("style") && e.setAttribute("style", t.rewrite.css.rewrite(e.getAttribute("style"), t.meta)), e.integrity && (e.setAttribute("nointegrity", e.integrity), e.removeAttribute("integrity")), e.nonce) && (e.setAttribute("nononce", e.nonce), e.removeAttribute("nonce")), e.rewritten = !0)
            }
            t = t || e.__dynamic, i = {
                childList(e) {
                    for (var t of (s(e.target), e.addedNodes))
                        if (t.childNodes)
                            for (var i of t.childNodes) s(i);
                    if (e.target.childNodes)
                        for (var r of e.target.childNodes) s(r)
                },
                attributes(e) {},
                characterData(e) {}
            }, r = e.document, (n = new MutationObserver(function(e) {
                for (var t of e) i[t.type](t), document.dispatchEvent(new CustomEvent({
                    attributes: "attrChanged",
                    characterData: "characterData",
                    childList: "nodeChanged"
                } [t.type], {
                    detail: t
                }))
            })).observe(r, {
                subtree: !0,
                attributes: !0,
                childList: !0
            }), e.document.addEventListener("DOMContentLoaded", function() {
                n.disconnect()
            }, {
                once: !0
            })
        }

        function t5(e) {
            e.__dynamic.eval = e.__dynamic.wrap(eval, function(t, ...i) {
                if (i.length) return i = i[0].toString(), i = e.__dynamic.rewrite.js.rewrite(i, {
                    type: "script"
                }, !1, e.__dynamic), t.apply(this, [i])
            }, "eval"), e.__dynamic.define(e.Object.prototype, "__dynamic$eval", {
                get() {
                    return (this === window ? e.__dynamic : this).eval
                },
                set: e => e
            }), e.__dynamic$wrapEval = function(t) {
                return arguments.length ? e.__dynamic.fire("eval", [e, t]) || e.__dynamic.rewrite.js.rewrite(t, {
                    type: "script"
                }, !1, e.__dynamic) : arguments[0]
            }
        }

        function t9(e) {
            var t = e.Function.prototype.toString,
                i = (e.__dynamic.Function = e.Function.bind({}), e.__dynamic.define(e.Function.prototype, "_toString", {
                    get: () => t,
                    set: () => {}
                }), function() {
                    try {
                        var e = Reflect.apply(t, this, [])
                    } catch (e) {
                        return `function ${this.name}() { [native code] }`
                    }
                    return e.includes("[native code]") ? `function ${this.name}() { [native code] }` : e
                });
            e.__dynamic.define(e.Function.prototype, "toString", {
                get() {
                    return this.__toString || i
                },
                set(e) {
                    this.__toString = e
                }
            }), e.Function = new Proxy(e.Function, {
                apply(t, i, r) {
                    var r = [...r],
                        n = r.pop(),
                        n = `(function anonymous(${r.toString()}) {${n}})`;
                    return n = e.__dynamic.rewrite.js.rewrite(n, {
                        type: "script"
                    }, !1, e.__dynamic), e.eval(n)
                },
                construct(t, i) {
                    var i = [...i],
                        r = i.pop(),
                        r = `(function anonymous(${i.toString()}) {${r}})`;
                    return r = e.__dynamic.rewrite.js.rewrite(r, {
                        type: "script"
                    }, !1, e.__dynamic), e.eval(r)
                }
            }), e.Function.prototype.apply = e.__dynamic.wrap(e.Function.prototype.apply, function(t, ...i) {
                return i[0] == e.__dynamic$window && (i[0] = i[0].__dynamic$self), i[0] == e.__dynamic$document && (i[0] = e.document), Reflect.apply(t, this, i)
            }, "Function.prototype.apply"), e.Function.prototype.call = new Proxy(e.Function.prototype.call, {
                apply: (t, i, r) => (r[0] == e.__dynamic$window && (r[0] = r[0].__dynamic$self), r[0] == e.__dynamic$document && (r[0] = e.document), Reflect.apply(t, i, r))
            }), e.Function.prototype.bind = e.__dynamic.wrap(e.Function.prototype.bind, function(t, ...i) {
                return i[0] == e.__dynamic$window && (i[0] = i[0].__dynamic$self), i[0] == e.__dynamic$document && (i[0] = e.document), t.apply(this, i)
            }, "Function.prototype.bind")
        }

        function t8(e) {}

        function t7(e) {}
        let ie = [{
            name: "get",
            function: "self"
        }, {
            name: "func",
            function: "self"
        }, {
            name: "location",
            function: "self"
        }, {
            name: "mutation",
            function: "self"
        }, {
            name: "dom",
            function: "self"
        }, {
            name: "write",
            function: "self"
        }, {
            name: "message",
            function: "self"
        }, {
            name: "reflect",
            function: "self"
        }, {
            name: "window",
            function: "self"
        }, {
            name: "eval",
            function: "self"
        }, {
            name: "attr",
            function: "self"
        }, {
            name: "policy",
            function: "self"
        }, {
            name: "worker",
            function: "self"
        }, {
            name: "history",
            function: "self"
        }, {
            name: "ws",
            function: "self"
        }, {
            name: "cookie",
            function: "self"
        }, {
            name: "fetch",
            function: "self"
        }, {
            name: "niche",
            function: "self"
        }, {
            name: "storage",
            function: "self"
        }, {
            name: "style",
            function: "self"
        }, {
            name: "rtc",
            function: "self"
        }, {
            name: "blob",
            function: "self"
        }, {
            name: "navigator",
            function: "self"
        }];
        class it {
            constructor(e) {
                this.methods = ie, "DedicatedWorkerGlobalScope" == self.constructor.name || "SharedWorkerGlobalScope" == self.constructor.name ? (this.message = tz, this.location = tj, this.window = tF, this.get = tD, this.reflect = tX, this.imports = tQ, this.blob = t4, this.mutation = t6) : (this.location = tj, this.get = tD, this.window = tF, this.attr = tU, this.worker = tH, this.history = tW, this.ws = tq, this.fetch = tG, this.message = tz, this.policy = t8, this.write = tK, this.imports = tQ, this.reflect = tX, this.niche = tY, this.storage = tZ, this.navigator = tJ, this.cookie = t2, this.style = t3, this.blob = t4, this.mutation = t6, this.eval = t5, this.func = t9, this.rtc = t7, this.dom = t$), this.ctx = e
            }
        }
        var ii = function(e, t, i, r) {
            return new(i = i || Promise)(function(n, s) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function o(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value) instanceof i ? t : new i(function(e) {
                        e(t)
                    })).then(a, o)
                }
                c((r = r.apply(e, t || [])).next())
            })
        };
        let ir = {
            open: () => ii(void 0, void 0, void 0, function*() {
                return C("__dynamic$cookies", 1, {
                    upgrade(e) {
                        return ii(this, void 0, void 0, function*() {
                            yield e.createObjectStore("__dynamic$cookies")
                        })
                    }
                })
            }),
            set: (e, t, i) => ii(void 0, void 0, void 0, function*() {
                var r;
                return ((e = t.domain ? t.domain : e).startsWith(".") && (e = e.slice(1)), t.expires && new Date(t.expires) < new Date) ? ir.remove(e, t, i) : (yield(yield i).put("__dynamic$cookies", ((r = (r = yield(yield i).get("__dynamic$cookies", e)) || []).find(e => e.name == t.name) ? r[r.findIndex(e => e.name == t.name)] = {
                    name: t.name,
                    value: t.value,
                    expires: t.expires
                } : r.push({
                    name: t.name,
                    value: t.value,
                    expires: t.expires
                }), r), e), !0)
            }),
            get: (e, t) => ii(void 0, void 0, void 0, function*() {
                var i = e.replace(/^(.*\.)?([^.]*\..*)$/g, "$2"),
                    r = (yield(yield t).get("__dynamic$cookies", e)) || [];
                if (e !== i && e !== "." + i) {
                    var n = yield(yield t).get("__dynamic$cookies", i);
                    if (n)
                        for (var {
                                name: s,
                                value: a,
                                expires: o
                            }
                            of n) {
                            if (o && new Date(o) <= new Date) {
                                ir.remove(e, n.find(e => e.name == s && e.value == a && e.expires == o), t);
                                continue
                            }
                            r.find(e => e.name == s && e.value == a) || r.push({
                                name: s,
                                value: a,
                                expires: o || new Date(1e13)
                            })
                        }
                }
                return r
            }),
            remove: (e, t, i) => ii(void 0, void 0, void 0, function*() {
                (e = t.domain ? t.domain : e).startsWith(".") && (e = e.slice(1));
                var r = yield(yield i).get("__dynamic$cookies", e);
                return !!r && (r = r.filter(e => e.name !== t.name), yield(yield i).put("__dynamic$cookies", r, e), !0)
            }),
            update: (e, t) => ii(void 0, void 0, void 0, function*() {
                var i = e.replace(/^(.*\.)?([^.]*\..*)$/g, "$2"),
                    i = yield(yield t).get("__dynamic$cookies", i);
                if (i)
                    for (var {
                            name: r,
                            value: n,
                            expires: s
                        }
                        of i) s && new Date(s) <= new Date && ir.remove(e, {
                        name: r,
                        value: n,
                        expires: s
                    }, t);
                return i
            })
        };
        var is, ia = function(e, t, i, r) {
            return new(i = i || Promise)(function(n, s) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function o(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value) instanceof i ? t : new i(function(e) {
                        e(t)
                    })).then(a, o)
                }
                c((r = r.apply(e, t || [])).next())
            })
        };
        class io {
            constructor(e) {
                this.db = ir, this.ctx = e
            }
            get(e) {
                return ia(this, void 0, void 0, function*() {
                    return this._db || (this._db = this.db.open()), t1((yield ir.get(e, this._db)))
                })
            }
            set(e, t = "") {
                return ia(this, void 0, void 0, function*() {
                    return t = this.ctx.modules.setCookieParser.parse(t, {
                        decodeValues: !1
                    })[0], this._db || (this._db = this.db.open()), yield ir.set(e, t, this._db)
                })
            }
            open() {
                return ia(this, void 0, void 0, function*() {
                    yield ir.open()
                })
            }
            update(e) {
                return ia(this, void 0, void 0, function*() {
                    return this._db || (this._db = this.db.open()), yield ir.update(e, this._db)
                })
            }
        }
        let ic = {
                encode: (e, t = 2) => e && encodeURIComponent(e.split("").map((e, i) => i % t ? String.fromCharCode(e.charCodeAt(0) ^ t) : e).join("")),
                decode: (e, t = 2) => e && decodeURIComponent(e).split("").map((e, i) => i % t ? String.fromCharCode(e.charCodeAt(0) ^ t) : e).join("")
            },
            il = {
                encode: e => e && encodeURIComponent(e),
                decode: e => e && decodeURIComponent(e)
            },
            ip = {
                encode: e => {
                    if (!e) return e;
                    let t = "";
                    for (let r = 0; r < e.length; r++) {
                        var i = e[r];
                        let n = i;
                        "a" <= i && i <= "z" ? n = String.fromCharCode((i.charCodeAt(0) + 3 - 97) % 26 + 97) : "A" <= i && i <= "Z" && (n = String.fromCharCode((i.charCodeAt(0) + 3 - 65) % 26 + 65)), t += n
                    }
                    return encodeURIComponent(t)
                },
                decode: e => {
                    if (!e) return e;
                    var t = decodeURIComponent(e);
                    let i = "";
                    for (let e = 0; e < t.length; e++) {
                        var r = t[e];
                        let n = r;
                        "a" <= r && r <= "z" ? n = String.fromCharCode((r.charCodeAt(0) - 3 - 97 + 26) % 26 + 97) : "A" <= r && r <= "Z" && (n = String.fromCharCode((r.charCodeAt(0) - 3 - 65 + 26) % 26 + 65)), i += n
                    }
                    return i
                }
            },
            ih = {
                encode: e => e,
                decode: e => e
            },
            iu = {
                encode: e => e && decodeURIComponent(O(e)),
                decode: e => e && T(e)
            };
        class id {
            on(e, t) {
                this.listeners.push({
                    event: e,
                    cb: t
                })
            }
            fire(e, t) {
                var i, r = !1;
                for (i of this.listeners) i.event === e && (r = !0, t = i.cb(...t));
                return r && t ? t : null
            }
            constructor(e) {
                this.modules = new e6(this), this.util = new tS(this), this.meta = new tT(this), this.regex = new tL(this), this.rewrite = new to(this), this.url = new tC(this), this.is = new tV(this), this.cookies = new io(this), this.client = new it(this), this.encoding = a, this.headers = tM, this.listeners = [], e && !this.config && (this.config = e), e && this.util.encode(self)
            }
        }

        function im(e) {
            e.__dynamic.wrap = function(t, i, r) {
                if (t.__dynamic$target) return t;
                if (t.toString().includes("{ [native code] }") && !t.prototype) return n = function(...n) {
                    if ("string" == typeof r) {
                        var s = e.__dynamic.fire(r, this ? [this, ...n] : n);
                        if (s) return s
                    }
                    return i.call(this, t, ...n)
                }, e.__dynamic.define(s = function(...e) {
                    return n.call(this, ...e)
                }, "name", {
                    value: t.name,
                    writable: !1
                }), s.__dynamic$target = t, s.toString = () => `function ${t.name}() { [native code] }`, s;
                try {
                    var n, s, a = class extends t {
                        constructor(...e) {
                            var n = [...e];
                            super(...e = i.call(t, t, ...e) || e), r && r(this, n)
                        }
                    };
                    return Object.defineProperty(a, "name", {
                        value: t.name,
                        writable: !1
                    }), a
                } catch (e) {
                    return t
                }
            }
        }

        function iy(e, t = {}, i = "") {
            if (e.hasOwnProperty("__dynamic")) return !1;
            e.hasOwnProperty("__dynamic$config") || (e.__dynamic$config = t), null != (t = e.parent) && t.__dynamic && (e.__dynamic$bare = e.parent.__dynamic$bare);
            var r, t = new id(e.__dynamic$config);
            for (r of (t.config.bare.path = "string" == typeof t.config.bare.path || t.config.bare.path instanceof URL ? new URL(t.config.bare.path, e.location) : t.config.bare.path.map(t => new URL(t, e.location)), e.__dynamic$baseURL = i || e.__dynamic$url || t.url.decode(location.pathname + location.search + location.hash) || "", e.__dynamic = t, e.__dynamic.bare = new e.__dynamic.modules.bare.BareClient(e.__dynamic$config.bare.path, e.__dynamic$bare), e.__dynamic.meta.load(new URL(e.__dynamic$baseURL)), ig(e, null), im(e), e.__dynamic.client.methods)) {
                let t = r.name;
                var n = Object.entries(e.__dynamic.client).find(e => e[0] == t);
                "mutation" == t && e.frameElement || "self" == r.function && n[1](e)
            }
            return e
        }

        function ig(e, t) {
            (t = t || e.__dynamic).define = new e.Proxy(e.Object.defineProperty, {
                apply(e, t, i) {
                    try {
                        return Reflect.apply(e, t, i)
                    } catch (e) {
                        return i[2]
                    }
                }
            }), t.defines = new e.Proxy(e.Object.defineProperties, {
                apply(e, t, i) {
                    try {
                        return Reflect.apply(e, t, i)
                    } catch (e) {
                        return i[1]
                    }
                }
            }), e.parent && (t.parent = e.parent), e.top && (t.top = e.top), e.document && (t.elements = {
                attributes: ["src", "href", "srcset", "action", "data", "integrity", "nonce", "imagesrcset"],
                iframeSrc: Object.getOwnPropertyDescriptor(e.HTMLIFrameElement.prototype, "src"),
                contentWindow: Object.getOwnPropertyDescriptor(e.HTMLIFrameElement.prototype, "contentWindow"),
                innerHTML: Object.getOwnPropertyDescriptor(e.Element.prototype, "innerHTML"),
                outerHTML: Object.getOwnPropertyDescriptor(e.Element.prototype, "outerHTML"),
                attrValue: Object.getOwnPropertyDescriptor(e.Attr.prototype, "value"),
                setAttribute: e.Element.prototype.setAttribute,
                getAttribute: e.Element.prototype.getAttribute,
                removeAttribute: e.Element.prototype.removeAttribute,
                hasAttribute: e.Element.prototype.hasAttribute,
                cloneNode: e.Node.prototype.cloneNode,
                addEventListener: e.Node.prototype.addEventListener,
                config: [{
                    elements: [e.HTMLScriptElement, e.HTMLIFrameElement, e.HTMLEmbedElement, e.HTMLInputElement, e.HTMLTrackElement, e.HTMLMediaElement, e.HTMLSourceElement, e.Image, e.HTMLImageElement],
                    tags: ["src"],
                    action: "url"
                }, {
                    elements: [e.HTMLSourceElement, e.HTMLImageElement],
                    tags: ["srcset"],
                    action: "srcset"
                }, {
                    elements: [e.HTMLAnchorElement, e.HTMLLinkElement, e.HTMLAreaElement, e.SVGImageElement, e.HTMLBaseElement],
                    tags: ["href"],
                    action: "url"
                }, {
                    elements: [e.HTMLIFrameElement],
                    tags: ["contentWindow", "contentDocument"],
                    action: "window"
                }, {
                    elements: [e.HTMLFormElement],
                    tags: ["action"],
                    action: "url"
                }, {
                    elements: [e.HTMLObjectElement],
                    tags: ["data"],
                    action: "url"
                }, {
                    elements: [e.HTMLScriptElement, e.HTMLLinkElement],
                    tags: ["integrity"],
                    action: "rewrite",
                    new: "nointegrity"
                }, {
                    elements: [e.HTMLScriptElement, e.HTMLLinkElement],
                    tags: ["nonce"],
                    action: "rewrite",
                    new: "nononce"
                }, {
                    elements: [e.HTMLIFrameElement],
                    tags: ["srcdoc"],
                    action: "html"
                }, {
                    elements: [e.HTMLElement],
                    tags: ["style"],
                    action: "css"
                }, {
                    elements: [e.HTMLLinkElement],
                    tags: ["imageSrcset"],
                    action: "srcset"
                }],
                createGetter: t => ({
                    get() {
                        return new URL(this.href || e.__dynamic$location.href)[t]
                    },
                    set(e) {}
                }),
                client: iy
            }, e.__dynamic.baseURL = e.document ? new URL(e.__dynamic.url.decode(e.document.baseURI)) : null), e.document && (t.cookie = {
                str: e.__dynamic$cookie || "",
                desc: Object.getOwnPropertyDescriptor(e.Document.prototype, "cookie")
            }), e.XMLHttpRequest && (t.http = {
                XMLResponseURL: Object.getOwnPropertyDescriptor(e.XMLHttpRequest.prototype, "responseURL"),
                ResponseURL: Object.getOwnPropertyDescriptor(e.Response.prototype, "url"),
                RequestURL: Object.getOwnPropertyDescriptor(e.Request.prototype, "url"),
                XMLHttpRequest: e.XMLHttpRequest
            }), e.Storage && (t.storage = {
                localStorage: e.localStorage,
                sessionStorage: e.sessionStorage,
                keys: {
                    localStorage: Object.keys(e.localStorage),
                    sessionStorage: Object.keys(e.sessionStorage)
                },
                methods: ["getItem", "setItem", "removeItem", "clear", "length", "keys", "values", "entries", "forEach", "hasOwnProperty", "toString", "toLocaleString", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "constructor", "key"]
            }, t.storage.cloned = {
                localStorage: t.util.clone(t.storage.localStorage),
                sessionStorage: t.util.clone(t.storage.sessionStorage)
            }), e.RTCPeerConnection && (t.webrtc = {
                endpoints: ["stun:stun.webice.org"]
            }), e.trustedTypes && (t.trustedTypes = {
                policy: e.trustedTypes.createPolicy("dynamic", {
                    createHTML: e => e,
                    createScript: e => e,
                    createScriptURL: e => e,
                    createURL: e => e
                }),
                createScript: e.TrustedTypePolicy.prototype.createScript
            }), e.__dynamic$config.tab && (e.document && e.__dynamic$config.tab.title && (document.title = e.__dynamic$config.tab.title, t.define(e.document, "title", {
                get: () => e.__dynamic$config.tab.title,
                set: e => e
            })), e.__dynamic$config.tab.icon && (e.__dynamic$icon = e.__dynamic$config.tab.icon), e.Navigator) && e.__dynamic$config.tab.ua && t.define(e.navigator, "userAgent", {
                get: () => e.__dynamic$config.tab.ua,
                set() {}
            })
        }
        importScripts("/dynamic/dynamic.config.js"), eH = self, q = new id(eH.__dynamic$config), is = (eH.__dynamic = q).url.decode(location.pathname), q.meta.load(new URL(is)), ig(eH, null), im(eH), q.client.message(eH), q.client.location(eH, !1), q.client.window(eH), q.client.get(eH), q.client.reflect(eH), q.client.imports(eH), q.client.blob(eH)
    })()
})();