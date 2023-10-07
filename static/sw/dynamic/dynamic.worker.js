(() => {
    var __webpack_modules__ = {
            206: function(e) {
                function r(e) {
                    var t;
                    return (s[e] || (t = s[e] = {
                        i: e,
                        l: !1,
                        exports: {}
                    }, i[e].call(t.exports, t, t.exports, r), t.l = !0, t)).exports
                }
                var i, s;
                e.exports = (i = {
                    17: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t["default"] = void 0;
                        var s = i(18);

                        function c() {}
                        c.getFirstMatch = function(e, t) {
                            e = t.match(e);
                            return e && 0 < e.length && e[1] || ""
                        }, c.getSecondMatch = function(e, t) {
                            e = t.match(e);
                            return e && 1 < e.length && e[2] || ""
                        }, c.matchAndReturnConst = function(e, t, i) {
                            if (e.test(t)) return i
                        }, c.getWindowsVersionName = function(e) {
                            switch (e) {
                                case "NT":
                                    return "NT";
                                case "XP":
                                    return "XP";
                                case "NT 5.0":
                                    return "2000";
                                case "NT 5.1":
                                    return "XP";
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
                        }, c.getMacOSVersionName = function(e) {
                            e = e.split(".").splice(0, 2).map(function(e) {
                                return parseInt(e, 10) || 0
                            });
                            if (e.push(0), 10 === e[0]) switch (e[1]) {
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
                        }, c.getAndroidVersionName = function(e) {
                            e = e.split(".").splice(0, 2).map(function(e) {
                                return parseInt(e, 10) || 0
                            });
                            if (e.push(0), !(1 === e[0] && e[1] < 5)) return 1 === e[0] && e[1] < 6 ? "Cupcake" : 1 === e[0] && 6 <= e[1] ? "Donut" : 2 === e[0] && e[1] < 2 ? "Eclair" : 2 === e[0] && 2 === e[1] ? "Froyo" : 2 === e[0] && 2 < e[1] ? "Gingerbread" : 3 === e[0] ? "Honeycomb" : 4 === e[0] && e[1] < 1 ? "Ice Cream Sandwich" : 4 === e[0] && e[1] < 4 ? "Jelly Bean" : 4 === e[0] && 4 <= e[1] ? "KitKat" : 5 === e[0] ? "Lollipop" : 6 === e[0] ? "Marshmallow" : 7 === e[0] ? "Nougat" : 8 === e[0] ? "Oreo" : 9 === e[0] ? "Pie" : void 0
                        }, c.getVersionPrecision = function(e) {
                            return e.split(".").length
                        }, c.compareVersions = function(e, t, i) {
                            void 0 === i && (i = !1);
                            var s = c.getVersionPrecision(e),
                                r = c.getVersionPrecision(t),
                                n = Math.max(s, r),
                                a = 0,
                                o = c.map([e, t], function(e) {
                                    var t = n - c.getVersionPrecision(e),
                                        e = e + new Array(1 + t).join(".0");
                                    return c.map(e.split("."), function(e) {
                                        return new Array(20 - e.length).join("0") + e
                                    }).reverse()
                                });
                            for (i && (a = n - Math.min(s, r)), --n; a <= n;) {
                                if (o[0][n] > o[1][n]) return 1;
                                if (o[0][n] === o[1][n]) {
                                    if (n === a) return 0;
                                    --n
                                } else if (o[0][n] < o[1][n]) return -1
                            }
                        }, c.map = function(e, t) {
                            var i, s = [];
                            if (Array.prototype.map) return Array.prototype.map.call(e, t);
                            for (i = 0; i < e.length; i += 1) s.push(t(e[i]));
                            return s
                        }, c.find = function(e, t) {
                            var i, s;
                            if (Array.prototype.find) return Array.prototype.find.call(e, t);
                            for (i = 0, s = e.length; i < s; i += 1) {
                                var r = e[i];
                                if (t(r, i)) return r
                            }
                        }, c.assign = function(e) {
                            for (var i = e, t = arguments.length, s = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) s[r - 1] = arguments[r];
                            if (Object.assign) return Object.assign.apply(Object, [e].concat(s));
                            for (var n = 0, a = s.length; n < a; n += 1) ! function() {
                                var t = s[n];
                                "object" == typeof t && null !== t && Object.keys(t).forEach(function(e) {
                                    i[e] = t[e]
                                })
                            }();
                            return e
                        }, c.getBrowserAlias = function(e) {
                            return s.BROWSER_ALIASES_MAP[e]
                        }, c.getBrowserTypeByAlias = function(e) {
                            return s.BROWSER_MAP[e] || ""
                        }, t["default"] = c, e.exports = t["default"]
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
                        t.__esModule = !0, t["default"] = void 0;
                        var s, r = (s = i(91)) && s.__esModule ? s : {
                                "default": s
                            },
                            n = i(18);

                        function a(e, t) {
                            for (var i = 0; i < t.length; i++) {
                                var s = t[i];
                                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
                            }
                        }

                        function o() {}
                        o.getParser = function(e, t) {
                            if (void 0 === t && (t = !1), "string" != typeof e) throw new Error("UserAgent should be a string");
                            return new r["default"](e, t)
                        }, o.parse = function(e) {
                            return new r["default"](e).getResult()
                        }, s = o, i = [{
                            key: "BROWSER_MAP",
                            get: function() {
                                return n.BROWSER_MAP
                            }
                        }, {
                            key: "ENGINE_MAP",
                            get: function() {
                                return n.ENGINE_MAP
                            }
                        }, {
                            key: "OS_MAP",
                            get: function() {
                                return n.OS_MAP
                            }
                        }, {
                            key: "PLATFORMS_MAP",
                            get: function() {
                                return n.PLATFORMS_MAP
                            }
                        }], null && a(s.prototype, null), a(s, i), t["default"] = o, e.exports = t["default"]
                    },
                    91: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t["default"] = void 0;
                        var s = o(i(92)),
                            r = o(i(93)),
                            n = o(i(94)),
                            a = o(i(95)),
                            c = o(i(17));

                        function o(e) {
                            return e && e.__esModule ? e : {
                                "default": e
                            }
                        }

                        function l(e, t) {
                            if (void 0 === t && (t = !1), null == e || "" === e) throw new Error("UserAgent parameter can't be empty");
                            this._ua = e, this.parsedResult = {}, !0 !== t && this.parse()
                        }(i = l.prototype).getUA = function() {
                            return this._ua
                        }, i.test = function(e) {
                            return e.test(this._ua)
                        }, i.parseBrowser = function() {
                            var t = this,
                                e = (this.parsedResult.browser = {}, c["default"].find(s["default"], function(e) {
                                    if ("function" == typeof e.test) return e.test(t);
                                    if (e.test instanceof Array) return e.test.some(function(e) {
                                        return t.test(e)
                                    });
                                    throw new Error("Browser's test function is not valid")
                                }));
                            return e && (this.parsedResult.browser = e.describe(this.getUA())), this.parsedResult.browser
                        }, i.getBrowser = function() {
                            return this.parsedResult.browser || this.parseBrowser()
                        }, i.getBrowserName = function(e) {
                            return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || ""
                        }, i.getBrowserVersion = function() {
                            return this.getBrowser().version
                        }, i.getOS = function() {
                            return this.parsedResult.os || this.parseOS()
                        }, i.parseOS = function() {
                            var t = this,
                                e = (this.parsedResult.os = {}, c["default"].find(r["default"], function(e) {
                                    if ("function" == typeof e.test) return e.test(t);
                                    if (e.test instanceof Array) return e.test.some(function(e) {
                                        return t.test(e)
                                    });
                                    throw new Error("Browser's test function is not valid")
                                }));
                            return e && (this.parsedResult.os = e.describe(this.getUA())), this.parsedResult.os
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
                            var t = this,
                                e = (this.parsedResult.platform = {}, c["default"].find(n["default"], function(e) {
                                    if ("function" == typeof e.test) return e.test(t);
                                    if (e.test instanceof Array) return e.test.some(function(e) {
                                        return t.test(e)
                                    });
                                    throw new Error("Browser's test function is not valid")
                                }));
                            return e && (this.parsedResult.platform = e.describe(this.getUA())), this.parsedResult.platform
                        }, i.getEngine = function() {
                            return this.parsedResult.engine || this.parseEngine()
                        }, i.getEngineName = function(e) {
                            return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || ""
                        }, i.parseEngine = function() {
                            var t = this,
                                e = (this.parsedResult.engine = {}, c["default"].find(a["default"], function(e) {
                                    if ("function" == typeof e.test) return e.test(t);
                                    if (e.test instanceof Array) return e.test.some(function(e) {
                                        return t.test(e)
                                    });
                                    throw new Error("Browser's test function is not valid")
                                }));
                            return e && (this.parsedResult.engine = e.describe(this.getUA())), this.parsedResult.engine
                        }, i.parse = function() {
                            return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this
                        }, i.getResult = function() {
                            return c["default"].assign({}, this.parsedResult)
                        }, i.satisfies = function(i) {
                            var t = this,
                                s = {},
                                r = 0,
                                n = {},
                                a = 0;
                            if (Object.keys(i).forEach(function(e) {
                                    var t = i[e];
                                    "string" == typeof t ? (n[e] = t, a += 1) : "object" == typeof t && (s[e] = t, r += 1)
                                }), 0 < r) {
                                var e = Object.keys(s),
                                    o = c["default"].find(e, function(e) {
                                        return t.isOS(e)
                                    });
                                if (o) {
                                    o = this.satisfies(s[o]);
                                    if (void 0 !== o) return o
                                }
                                o = c["default"].find(e, function(e) {
                                    return t.isPlatform(e)
                                });
                                if (o) {
                                    e = this.satisfies(s[o]);
                                    if (void 0 !== e) return e
                                }
                            }
                            if (0 < a) {
                                o = Object.keys(n), e = c["default"].find(o, function(e) {
                                    return t.isBrowser(e, !0)
                                });
                                if (void 0 !== e) return this.compareVersion(n[e])
                            }
                        }, i.isBrowser = function(e, t) {
                            void 0 === t && (t = !1);
                            var i = this.getBrowserName().toLowerCase(),
                                e = e.toLowerCase(),
                                s = c["default"].getBrowserTypeByAlias(e);
                            return (e = t && s ? s.toLowerCase() : e) === i
                        }, i.compareVersion = function(e) {
                            var t = [0],
                                i = e,
                                s = !1,
                                r = this.getBrowserVersion();
                            if ("string" == typeof r) return ">" === e[0] || "<" === e[0] ? (i = e.substr(1), "=" === e[1] ? (s = !0, i = e.substr(2)) : t = [], ">" === e[0] ? t.push(1) : t.push(-1)) : "=" === e[0] ? i = e.substr(1) : "~" === e[0] && (s = !0, i = e.substr(1)), -1 < t.indexOf(c["default"].compareVersions(r, i, s))
                        }, i.isOS = function(e) {
                            return this.getOSName(!0) === String(e).toLowerCase()
                        }, i.isPlatform = function(e) {
                            return this.getPlatformType(!0) === String(e).toLowerCase()
                        }, i.isEngine = function(e) {
                            return this.getEngineName(!0) === String(e).toLowerCase()
                        }, i.is = function(e, t) {
                            return this.isBrowser(e, t = void 0 === t ? !1 : t) || this.isOS(e) || this.isPlatform(e)
                        }, i.some = function(e) {
                            var t = this;
                            return (e = void 0 === e ? [] : e).some(function(e) {
                                return t.is(e)
                            })
                        }, t["default"] = l, e.exports = t["default"]
                    },
                    92: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t["default"] = void 0;
                        var s = (i = i(17)) && i.__esModule ? i : {
                                "default": i
                            },
                            r = /version\/(\d+(\.?_?\d+)+)/i;
                        t["default"] = [{
                            test: [/googlebot/i],
                            describe: function(e) {
                                var t = {
                                        name: "Googlebot"
                                    },
                                    e = s["default"].getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/opera/i],
                            describe: function(e) {
                                var t = {
                                        name: "Opera"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/opr\/|opios/i],
                            describe: function(e) {
                                var t = {
                                        name: "Opera"
                                    },
                                    e = s["default"].getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/SamsungBrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: "Samsung Internet for Android"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/Whale/i],
                            describe: function(e) {
                                var t = {
                                        name: "NAVER Whale Browser"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/MZBrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: "MZ Browser"
                                    },
                                    e = s["default"].getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/focus/i],
                            describe: function(e) {
                                var t = {
                                        name: "Focus"
                                    },
                                    e = s["default"].getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/swing/i],
                            describe: function(e) {
                                var t = {
                                        name: "Swing"
                                    },
                                    e = s["default"].getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/coast/i],
                            describe: function(e) {
                                var t = {
                                        name: "Opera Coast"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/opt\/\d+(?:.?_?\d+)+/i],
                            describe: function(e) {
                                var t = {
                                        name: "Opera Touch"
                                    },
                                    e = s["default"].getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/yabrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: "Yandex Browser"
                                    },
                                    e = s["default"].getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/ucbrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: "UC Browser"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/Maxthon|mxios/i],
                            describe: function(e) {
                                var t = {
                                        name: "Maxthon"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/epiphany/i],
                            describe: function(e) {
                                var t = {
                                        name: "Epiphany"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/puffin/i],
                            describe: function(e) {
                                var t = {
                                        name: "Puffin"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/sleipnir/i],
                            describe: function(e) {
                                var t = {
                                        name: "Sleipnir"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/k-meleon/i],
                            describe: function(e) {
                                var t = {
                                        name: "K-Meleon"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/micromessenger/i],
                            describe: function(e) {
                                var t = {
                                        name: "WeChat"
                                    },
                                    e = s["default"].getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/qqbrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
                                    },
                                    e = s["default"].getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/msie|trident/i],
                            describe: function(e) {
                                var t = {
                                        name: "Internet Explorer"
                                    },
                                    e = s["default"].getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/\sedg\//i],
                            describe: function(e) {
                                var t = {
                                        name: "Microsoft Edge"
                                    },
                                    e = s["default"].getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/edg([ea]|ios)/i],
                            describe: function(e) {
                                var t = {
                                        name: "Microsoft Edge"
                                    },
                                    e = s["default"].getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/vivaldi/i],
                            describe: function(e) {
                                var t = {
                                        name: "Vivaldi"
                                    },
                                    e = s["default"].getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/seamonkey/i],
                            describe: function(e) {
                                var t = {
                                        name: "SeaMonkey"
                                    },
                                    e = s["default"].getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/sailfish/i],
                            describe: function(e) {
                                var t = {
                                        name: "Sailfish"
                                    },
                                    e = s["default"].getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/silk/i],
                            describe: function(e) {
                                var t = {
                                        name: "Amazon Silk"
                                    },
                                    e = s["default"].getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/phantom/i],
                            describe: function(e) {
                                var t = {
                                        name: "PhantomJS"
                                    },
                                    e = s["default"].getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/slimerjs/i],
                            describe: function(e) {
                                var t = {
                                        name: "SlimerJS"
                                    },
                                    e = s["default"].getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                            describe: function(e) {
                                var t = {
                                        name: "BlackBerry"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/(web|hpw)[o0]s/i],
                            describe: function(e) {
                                var t = {
                                        name: "WebOS Browser"
                                    },
                                    e = s["default"].getFirstMatch(r, e) || s["default"].getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/bada/i],
                            describe: function(e) {
                                var t = {
                                        name: "Bada"
                                    },
                                    e = s["default"].getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/tizen/i],
                            describe: function(e) {
                                var t = {
                                        name: "Tizen"
                                    },
                                    e = s["default"].getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/qupzilla/i],
                            describe: function(e) {
                                var t = {
                                        name: "QupZilla"
                                    },
                                    e = s["default"].getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/firefox|iceweasel|fxios/i],
                            describe: function(e) {
                                var t = {
                                        name: "Firefox"
                                    },
                                    e = s["default"].getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/electron/i],
                            describe: function(e) {
                                var t = {
                                        name: "Electron"
                                    },
                                    e = s["default"].getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/MiuiBrowser/i],
                            describe: function(e) {
                                var t = {
                                        name: "Miui"
                                    },
                                    e = s["default"].getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/chromium/i],
                            describe: function(e) {
                                var t = {
                                        name: "Chromium"
                                    },
                                    e = s["default"].getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/chrome|crios|crmo/i],
                            describe: function(e) {
                                var t = {
                                        name: "Chrome"
                                    },
                                    e = s["default"].getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/GSA/i],
                            describe: function(e) {
                                var t = {
                                        name: "Google Search"
                                    },
                                    e = s["default"].getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
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
                                    e = s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/playstation 4/i],
                            describe: function(e) {
                                var t = {
                                        name: "PlayStation 4"
                                    },
                                    e = s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/safari|applewebkit/i],
                            describe: function(e) {
                                var t = {
                                        name: "Safari"
                                    },
                                    e = s["default"].getFirstMatch(r, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/.*/i],
                            describe: function(e) {
                                var t = -1 !== e.search("\\(") ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
                                return {
                                    name: s["default"].getFirstMatch(t, e),
                                    version: s["default"].getSecondMatch(t, e)
                                }
                            }
                        }], e.exports = t["default"]
                    },
                    93: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t["default"] = void 0;
                        var s, r = (s = i(17)) && s.__esModule ? s : {
                                "default": s
                            },
                            n = i(18);
                        t["default"] = [{
                            test: [/Roku\/DVP/],
                            describe: function(e) {
                                e = r["default"].getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
                                return {
                                    name: n.OS_MAP.Roku,
                                    version: e
                                }
                            }
                        }, {
                            test: [/windows phone/i],
                            describe: function(e) {
                                e = r["default"].getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
                                return {
                                    name: n.OS_MAP.WindowsPhone,
                                    version: e
                                }
                            }
                        }, {
                            test: [/windows /i],
                            describe: function(e) {
                                var e = r["default"].getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e),
                                    t = r["default"].getWindowsVersionName(e);
                                return {
                                    name: n.OS_MAP.Windows,
                                    version: e,
                                    versionName: t
                                }
                            }
                        }, {
                            test: [/Macintosh(.*?) FxiOS(.*?)\//],
                            describe: function(e) {
                                var t = {
                                        name: n.OS_MAP.iOS
                                    },
                                    e = r["default"].getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/macintosh/i],
                            describe: function(e) {
                                var e = r["default"].getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."),
                                    t = r["default"].getMacOSVersionName(e),
                                    e = {
                                        name: n.OS_MAP.MacOS,
                                        version: e
                                    };
                                return t && (e.versionName = t), e
                            }
                        }, {
                            test: [/(ipod|iphone|ipad)/i],
                            describe: function(e) {
                                e = r["default"].getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
                                return {
                                    name: n.OS_MAP.iOS,
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
                                var e = r["default"].getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e),
                                    t = r["default"].getAndroidVersionName(e),
                                    e = {
                                        name: n.OS_MAP.Android,
                                        version: e
                                    };
                                return t && (e.versionName = t), e
                            }
                        }, {
                            test: [/(web|hpw)[o0]s/i],
                            describe: function(e) {
                                var e = r["default"].getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e),
                                    t = {
                                        name: n.OS_MAP.WebOS
                                    };
                                return e && e.length && (t.version = e), t
                            }
                        }, {
                            test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                            describe: function(e) {
                                e = r["default"].getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || r["default"].getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || r["default"].getFirstMatch(/\bbb(\d+)/i, e);
                                return {
                                    name: n.OS_MAP.BlackBerry,
                                    version: e
                                }
                            }
                        }, {
                            test: [/bada/i],
                            describe: function(e) {
                                e = r["default"].getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
                                return {
                                    name: n.OS_MAP.Bada,
                                    version: e
                                }
                            }
                        }, {
                            test: [/tizen/i],
                            describe: function(e) {
                                e = r["default"].getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
                                return {
                                    name: n.OS_MAP.Tizen,
                                    version: e
                                }
                            }
                        }, {
                            test: [/linux/i],
                            describe: function() {
                                return {
                                    name: n.OS_MAP.Linux
                                }
                            }
                        }, {
                            test: [/CrOS/],
                            describe: function() {
                                return {
                                    name: n.OS_MAP.ChromeOS
                                }
                            }
                        }, {
                            test: [/PlayStation 4/],
                            describe: function(e) {
                                e = r["default"].getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
                                return {
                                    name: n.OS_MAP.PlayStation4,
                                    version: e
                                }
                            }
                        }], e.exports = t["default"]
                    },
                    94: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t["default"] = void 0;
                        var s, r = (s = i(17)) && s.__esModule ? s : {
                                "default": s
                            },
                            n = i(18);
                        t["default"] = [{
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
                                var e = r["default"].getFirstMatch(/(can-l01)/i, e) && "Nova",
                                    t = {
                                        type: n.PLATFORMS_MAP.mobile,
                                        vendor: "Huawei"
                                    };
                                return e && (t.model = e), t
                            }
                        }, {
                            test: [/nexus\s*(?:7|8|9|10).*/i],
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.tablet,
                                    vendor: "Nexus"
                                }
                            }
                        }, {
                            test: [/ipad/i],
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.tablet,
                                    vendor: "Apple",
                                    model: "iPad"
                                }
                            }
                        }, {
                            test: [/Macintosh(.*?) FxiOS(.*?)\//],
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.tablet,
                                    vendor: "Apple",
                                    model: "iPad"
                                }
                            }
                        }, {
                            test: [/kftt build/i],
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.tablet,
                                    vendor: "Amazon",
                                    model: "Kindle Fire HD 7"
                                }
                            }
                        }, {
                            test: [/silk/i],
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.tablet,
                                    vendor: "Amazon"
                                }
                            }
                        }, {
                            test: [/tablet(?! pc)/i],
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.tablet
                                }
                            }
                        }, {
                            test: function(e) {
                                var t = e.test(/ipod|iphone/i),
                                    e = e.test(/like (ipod|iphone)/i);
                                return t && !e
                            },
                            describe: function(e) {
                                e = r["default"].getFirstMatch(/(ipod|iphone)/i, e);
                                return {
                                    type: n.PLATFORMS_MAP.mobile,
                                    vendor: "Apple",
                                    model: e
                                }
                            }
                        }, {
                            test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.mobile,
                                    vendor: "Nexus"
                                }
                            }
                        }, {
                            test: [/[^-]mobi/i],
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.mobile
                                }
                            }
                        }, {
                            test: function(e) {
                                return "blackberry" === e.getBrowserName(!0)
                            },
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.mobile,
                                    vendor: "BlackBerry"
                                }
                            }
                        }, {
                            test: function(e) {
                                return "bada" === e.getBrowserName(!0)
                            },
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.mobile
                                }
                            }
                        }, {
                            test: function(e) {
                                return "windows phone" === e.getBrowserName()
                            },
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.mobile,
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
                                    type: n.PLATFORMS_MAP.tablet
                                }
                            }
                        }, {
                            test: function(e) {
                                return "android" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.mobile
                                }
                            }
                        }, {
                            test: function(e) {
                                return "macos" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.desktop,
                                    vendor: "Apple"
                                }
                            }
                        }, {
                            test: function(e) {
                                return "windows" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.desktop
                                }
                            }
                        }, {
                            test: function(e) {
                                return "linux" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.desktop
                                }
                            }
                        }, {
                            test: function(e) {
                                return "playstation 4" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.tv
                                }
                            }
                        }, {
                            test: function(e) {
                                return "roku" === e.getOSName(!0)
                            },
                            describe: function() {
                                return {
                                    type: n.PLATFORMS_MAP.tv
                                }
                            }
                        }], e.exports = t["default"]
                    },
                    95: function(e, t, i) {
                        "use strict";
                        t.__esModule = !0, t["default"] = void 0;
                        var s, r = (s = i(17)) && s.__esModule ? s : {
                                "default": s
                            },
                            n = i(18);
                        t["default"] = [{
                            test: function(e) {
                                return "microsoft edge" === e.getBrowserName(!0)
                            },
                            describe: function(e) {
                                return /\sedg\//i.test(e) ? {
                                    name: n.ENGINE_MAP.Blink
                                } : (e = r["default"].getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e), {
                                    name: n.ENGINE_MAP.EdgeHTML,
                                    version: e
                                })
                            }
                        }, {
                            test: [/trident/i],
                            describe: function(e) {
                                var t = {
                                        name: n.ENGINE_MAP.Trident
                                    },
                                    e = r["default"].getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: function(e) {
                                return e.test(/presto/i)
                            },
                            describe: function(e) {
                                var t = {
                                        name: n.ENGINE_MAP.Presto
                                    },
                                    e = r["default"].getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
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
                                        name: n.ENGINE_MAP.Gecko
                                    },
                                    e = r["default"].getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }, {
                            test: [/(apple)?webkit\/537\.36/i],
                            describe: function() {
                                return {
                                    name: n.ENGINE_MAP.Blink
                                }
                            }
                        }, {
                            test: [/(apple)?webkit/i],
                            describe: function(e) {
                                var t = {
                                        name: n.ENGINE_MAP.WebKit
                                    },
                                    e = r["default"].getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
                                return e && (t.version = e), t
                            }
                        }], e.exports = t["default"]
                    }
                }, s = {}, r.m = i, r.c = s, r.d = function(e, t, i) {
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
                }, r.t = function(t, e) {
                    if (1 & e && (t = r(t)), 8 & e) return t;
                    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                    var i = Object.create(null);
                    if (r.r(i), Object.defineProperty(i, "default", {
                            enumerable: !0,
                            value: t
                        }), 2 & e && "string" != typeof t)
                        for (var s in t) r.d(i, s, function(e) {
                            return t[e]
                        }.bind(null, s));
                    return i
                }, r.n = function(e) {
                    var t = e && e.__esModule ? function() {
                        return e["default"]
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

                function u(e) {
                    if ("string" != typeof e) throw new TypeError("Path must be a string. Received " + JSON.stringify(e))
                }

                function n(e, t) {
                    for (var i, s = "", r = 0, n = -1, a = 0, o = 0; o <= e.length; ++o) {
                        if (o < e.length) i = e.charCodeAt(o);
                        else {
                            if (47 === i) break;
                            i = 47
                        }
                        if (47 === i) {
                            if (n !== o - 1 && 1 !== a)
                                if (n !== o - 1 && 2 === a) {
                                    if (s.length < 2 || 2 !== r || 46 !== s.charCodeAt(s.length - 1) || 46 !== s.charCodeAt(s.length - 2))
                                        if (2 < s.length) {
                                            var c = s.lastIndexOf("/");
                                            if (c !== s.length - 1) {
                                                r = -1 === c ? (s = "", 0) : (s = s.slice(0, c)).length - 1 - s.lastIndexOf("/"), n = o, a = 0;
                                                continue
                                            }
                                        } else if (2 === s.length || 1 === s.length) {
                                        s = "", n = o, a = r = 0;
                                        continue
                                    }
                                    t && (0 < s.length ? s += "/.." : s = "..", r = 2)
                                } else 0 < s.length ? s += "/" + e.slice(n + 1, o) : s = e.slice(n + 1, o), r = o - n - 1;
                            n = o, a = 0
                        } else 46 === i && -1 !== a ? ++a : a = -1
                    }
                    return s
                }
                var d = {
                    resolve: function() {
                        for (var e, t = "", i = !1, s = arguments.length - 1; - 1 <= s && !i; s--) {
                            var r = 0 <= s ? arguments[s] : e = e === undefined ? process.cwd() : e;
                            u(r), 0 !== r.length && (t = r + "/" + t, i = 47 === r.charCodeAt(0))
                        }
                        return t = n(t, !i), i ? 0 < t.length ? "/" + t : "/" : 0 < t.length ? t : "."
                    },
                    normalize: function(e) {
                        var t, i;
                        return u(e), 0 === e.length ? "." : (t = 47 === e.charCodeAt(0), i = 47 === e.charCodeAt(e.length - 1), 0 < (e = 0 !== (e = n(e, !t)).length || t ? e : ".").length && i && (e += "/"), t ? "/" + e : e)
                    },
                    isAbsolute: function(e) {
                        return u(e), 0 < e.length && 47 === e.charCodeAt(0)
                    },
                    join: function() {
                        if (0 === arguments.length) return ".";
                        for (var e, t = 0; t < arguments.length; ++t) {
                            var i = arguments[t];
                            u(i), 0 < i.length && (e === undefined ? e = i : e += "/" + i)
                        }
                        return e === undefined ? "." : d.normalize(e)
                    },
                    relative: function(e, t) {
                        if (u(e), u(t), e === t) return "";
                        if ((e = d.resolve(e)) === (t = d.resolve(t))) return "";
                        for (var i = 1; i < e.length && 47 === e.charCodeAt(i); ++i);
                        for (var s = e.length, r = s - i, n = 1; n < t.length && 47 === t.charCodeAt(n); ++n);
                        for (var a = t.length - n, o = r < a ? r : a, c = -1, l = 0; l <= o; ++l) {
                            if (l === o) {
                                if (o < a) {
                                    if (47 === t.charCodeAt(n + l)) return t.slice(n + l + 1);
                                    if (0 === l) return t.slice(n + l)
                                } else o < r && (47 === e.charCodeAt(i + l) ? c = l : 0 === l && (c = 0));
                                break
                            }
                            var p = e.charCodeAt(i + l);
                            if (p !== t.charCodeAt(n + l)) break;
                            47 === p && (c = l)
                        }
                        for (var h = "", l = i + c + 1; l <= s; ++l) l !== s && 47 !== e.charCodeAt(l) || (0 === h.length ? h += ".." : h += "/..");
                        return 0 < h.length ? h + t.slice(n + c) : (47 === t.charCodeAt(n += c) && ++n, t.slice(n))
                    },
                    _makeLong: function(e) {
                        return e
                    },
                    dirname: function(e) {
                        if (u(e), 0 === e.length) return ".";
                        for (var t = 47 === e.charCodeAt(0), i = -1, s = !0, r = e.length - 1; 1 <= r; --r)
                            if (47 === e.charCodeAt(r)) {
                                if (!s) {
                                    i = r;
                                    break
                                }
                            } else s = !1;
                        return -1 === i ? t ? "/" : "." : t && 1 === i ? "//" : e.slice(0, i)
                    },
                    basename: function(e, t) {
                        if (t !== undefined && "string" != typeof t) throw new TypeError('"ext" argument must be a string');
                        u(e);
                        var i = 0,
                            s = -1,
                            r = !0;
                        if (t !== undefined && 0 < t.length && t.length <= e.length) {
                            if (t.length === e.length && t === e) return "";
                            for (var n = t.length - 1, a = -1, o = e.length - 1; 0 <= o; --o) {
                                var c = e.charCodeAt(o);
                                if (47 === c) {
                                    if (!r) {
                                        i = o + 1;
                                        break
                                    }
                                } else - 1 === a && (r = !1, a = o + 1), 0 <= n && (c === t.charCodeAt(n) ? -1 == --n && (s = o) : (n = -1, s = a))
                            }
                            return i === s ? s = a : -1 === s && (s = e.length), e.slice(i, s)
                        }
                        for (o = e.length - 1; 0 <= o; --o)
                            if (47 === e.charCodeAt(o)) {
                                if (!r) {
                                    i = o + 1;
                                    break
                                }
                            } else - 1 === s && (r = !1, s = o + 1);
                        return -1 === s ? "" : e.slice(i, s)
                    },
                    extname: function(e) {
                        u(e);
                        for (var t = -1, i = 0, s = -1, r = !0, n = 0, a = e.length - 1; 0 <= a; --a) {
                            var o = e.charCodeAt(a);
                            if (47 === o) {
                                if (r) continue;
                                i = a + 1;
                                break
                            } - 1 === s && (r = !1, s = a + 1), 46 === o ? -1 === t ? t = a : 1 !== n && (n = 1) : -1 !== t && (n = -1)
                        }
                        return -1 === t || -1 === s || 0 === n || 1 === n && t === s - 1 && t === i + 1 ? "" : e.slice(t, s)
                    },
                    format: function(e) {
                        if (null === e || "object" != typeof e) throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
                        return t = "/", i = (e = e).dir || e.root, s = e.base || (e.name || "") + (e.ext || ""), i ? i === e.root ? i + s : i + t + s : s;
                        var t, i, s
                    },
                    parse: function(e) {
                        u(e);
                        var t = {
                            root: "",
                            dir: "",
                            base: "",
                            ext: "",
                            name: ""
                        };
                        if (0 !== e.length) {
                            for (var i, s = 47 === e.charCodeAt(0), r = s ? (t.root = "/", 1) : 0, n = -1, a = 0, o = -1, c = !0, l = e.length - 1, p = 0; r <= l; --l) {
                                if (47 === (i = e.charCodeAt(l))) {
                                    if (c) continue;
                                    a = l + 1;
                                    break
                                } - 1 === o && (c = !1, o = l + 1), 46 === i ? -1 === n ? n = l : 1 !== p && (p = 1) : -1 !== n && (p = -1)
                            } - 1 === n || -1 === o || 0 === p || 1 === p && n === o - 1 && n === a + 1 ? -1 !== o && (t.base = t.name = 0 === a && s ? e.slice(1, o) : e.slice(a, o)) : (0 === a && s ? (t.name = e.slice(1, n), t.base = e.slice(1, o)) : (t.name = e.slice(a, n), t.base = e.slice(a, o)), t.ext = e.slice(n, o)), 0 < a ? t.dir = e.slice(0, a - 1) : s && (t.dir = "/")
                        }
                        return t
                    },
                    sep: "/",
                    delimiter: ":",
                    win32: null,
                    posix: null
                };
                d.posix = d, e.exports = d
            },
            328: e => {
                "use strict";
                var a = {
                    decodeValues: !0,
                    map: !1,
                    silent: !1
                };

                function o(e) {
                    return "string" == typeof e && !!e.trim()
                }

                function s(e, t) {
                    var e = e.split(";").filter(o),
                        i = function(e) {
                            var t = "",
                                i = "",
                                s = e.split("=");
                            i = 1 < s.length ? (t = s.shift(), s.join("=")) : e;
                            return {
                                name: t,
                                value: i
                            }
                        }(e.shift()),
                        s = i.name,
                        i = i.value;
                    t = t ? Object.assign({}, a, t) : a;
                    try {
                        i = t.decodeValues ? decodeURIComponent(i) : i
                    } catch (n) {
                        console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + i + "'. Set options.decodeValues to false to disable this feature.", n)
                    }
                    var r = {
                        name: s,
                        value: i
                    };
                    return e.forEach(function(e) {
                        var e = e.split("="),
                            t = e.shift().trimLeft().toLowerCase(),
                            e = e.join("=");
                        "expires" === t ? r.expires = new Date(e) : "max-age" === t ? r.maxAge = parseInt(e, 10) : "secure" === t ? r.secure = !0 : "httponly" === t ? r.httpOnly = !0 : "samesite" === t ? r.sameSite = e : r[t] = e
                    }), r
                }

                function t(e, i) {
                    var t;
                    return i = i ? Object.assign({}, a, i) : a, e ? (e.headers && (e = "function" == typeof e.headers.getSetCookie ? e.headers.getSetCookie() : e.headers["set-cookie"] || ((t = e.headers[Object.keys(e.headers).find(function(e) {
                        return "set-cookie" === e.toLowerCase()
                    })]) || !e.headers.cookie || i.silent || console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."), t)), Array.isArray(e) || (e = [e]), (i = i ? Object.assign({}, a, i) : a).map ? e.filter(o).reduce(function(e, t) {
                        t = s(t, i);
                        return e[t.name] = t, e
                    }, {}) : e.filter(o).map(function(e) {
                        return s(e, i)
                    })) : i.map ? {} : []
                }
                e.exports = t, e.exports.parse = t, e.exports.parseString = s, e.exports.splitCookiesString = function(e) {
                    if (Array.isArray(e)) return e;
                    if ("string" != typeof e) return [];
                    var t, i, s, r, n, a = [],
                        o = 0;

                    function c() {
                        for (; o < e.length && /\s/.test(e.charAt(o));) o += 1;
                        return o < e.length
                    }
                    for (; o < e.length;) {
                        for (t = o, n = !1; c();)
                            if ("," === (i = e.charAt(o))) {
                                for (s = o, o += 1, c(), r = o; o < e.length && "=" !== (i = e.charAt(o)) && ";" !== i && "," !== i;) o += 1;
                                o < e.length && "=" === e.charAt(o) ? (n = !0, o = r, a.push(e.substring(t, s)), t = o) : o = s + 1
                            } else o += 1;
                        (!n || o >= e.length) && a.push(e.substring(t, e.length))
                    }
                    return a
                }
            },
            734: (B, e, t) => {
                "use strict";
                t.d(e, {
                    TC: () => Ai
                });
                var V = {},
                    D = (t.r(V), t.d(V, {
                        deleteDB: () => function(e, {
                            blocked: t
                        } = {}) {
                            e = indexedDB.deleteDatabase(e);
                            t && e.addEventListener("blocked", e => t(e.oldVersion, e));
                            return l(e).then(() => undefined)
                        },
                        openDB: () => ae,
                        unwrap: () => s,
                        wrap: () => l
                    }), {}),
                    j = (t.r(D), t.d(D, {
                        decode: () => ue,
                        encode: () => he
                    }), {}),
                    F = (t.r(j), t.d(j, {
                        parse: () => function(e, t) {
                            if ("string" != typeof e) throw new TypeError("argument str must be a string");
                            for (var i = {}, s = (t || {}).decode || Ze, r = 0; r < e.length;) {
                                var n = e.indexOf("=", r);
                                if (-1 === n) break;
                                var a = e.indexOf(";", r);
                                if (-1 === a) a = e.length;
                                else if (a < n) {
                                    r = e.lastIndexOf(";", n - 1) + 1;
                                    continue
                                }
                                var o = e.slice(r, n).trim();
                                void 0 === i[o] && (34 === (n = e.slice(n + 1, a).trim()).charCodeAt(0) && (n = n.slice(1, -1)), i[o] = function(e, t) {
                                    try {
                                        return t(e)
                                    } catch (t) {
                                        return e
                                    }
                                }(n, s)), r = a + 1
                            }
                            return i
                        },
                        serialize: () => Ye
                    }), {}),
                    U = (t.r(F), t.d(F, {
                        base64: () => Ci,
                        caeser: () => ki,
                        none: () => Ei,
                        plain: () => Si,
                        xor: () => wi
                    }), t(470));
                const o = {
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
                var W, c, $, q, H = /^\s*([^;\s]*)(?:;|\s|$)/,
                    G = /^text\//i,
                    i = {};

                function z(e) {
                    var t;
                    return !(!e || "string" != typeof e) && ((t = (e = H.exec(e)) && o[e[1].toLowerCase()]) && t.charset ? t.charset : !(!e || !G.test(e[1])) && "UTF-8")
                }
                i.charset = z, i.charsets = {
                    lookup: z
                }, i.contentType = function(e) {
                    var t;
                    return !(!e || "string" != typeof e || !(e = -1 === e.indexOf("/") ? i.lookup(e) : e)) && (-1 === e.indexOf("charset") && (t = i.charset(e)) && (e += "; charset=" + t.toLowerCase()), e)
                }, i.extension = function(e) {
                    return !(!e || "string" != typeof e || !(e = (e = H.exec(e)) && i.extensions[e[1].toLowerCase()]) || !e.length) && e[0]
                }, i.extensions = Object.create(null), i.lookup = function(e) {
                    return e && "string" == typeof e && (e = (0, U.extname)("x." + e).toLowerCase().substr(1)) && i.types[e] || !1
                }, i.types = Object.create(null), W = i.extensions, c = i.types, $ = ["nginx", "apache", void 0, "iana"], Object.keys(o).forEach(function(e) {
                    var t = o[e],
                        i = t.extensions;
                    if (i && i.length) {
                        W[e] = i;
                        for (var s = 0; s < i.length; s++) {
                            var r = i[s];
                            if (c[r]) {
                                var n = $.indexOf(o[c[r]].source),
                                    a = $.indexOf(t.source);
                                if ("application/octet-stream" !== c[r] && (a < n || n === a && "application/" === c[r].substr(0, 12))) continue
                            }
                            c[r] = e
                        }
                    }
                });
                const K = i,
                    Q = (t, e) => e.some(e => t instanceof e);
                let X, Y;
                const Z = new WeakMap,
                    J = new WeakMap,
                    ee = new WeakMap,
                    te = new WeakMap,
                    ie = new WeakMap;
                let se = {
                    get(e, t, i) {
                        if (e instanceof IDBTransaction) {
                            if ("done" === t) return J.get(e);
                            if ("objectStoreNames" === t) return e.objectStoreNames || ee.get(e);
                            if ("store" === t) return i.objectStoreNames[1] ? undefined : i.objectStore(i.objectStoreNames[0])
                        }
                        return l(e[t])
                    },
                    set(e, t, i) {
                        return e[t] = i, !0
                    },
                    has(e, t) {
                        return e instanceof IDBTransaction && ("done" === t || "store" === t) || t in e
                    }
                };

                function re(i) {
                    return i !== IDBDatabase.prototype.transaction || "objectStoreNames" in IDBTransaction.prototype ? (Y = Y || [IDBCursor.prototype.advance, IDBCursor.prototype["continue"], IDBCursor.prototype.continuePrimaryKey]).includes(i) ? function(...e) {
                        return i.apply(s(this), e), l(Z.get(this))
                    } : function(...e) {
                        return l(i.apply(s(this), e))
                    } : function(e, ...t) {
                        t = i.call(s(this), e, ...t);
                        return ee.set(t, e.sort ? e.sort() : [e]), l(t)
                    }
                }

                function ne(e) {
                    var n, t;
                    return "function" == typeof e ? re(e) : (e instanceof IDBTransaction && (n = e, J.has(n) || (t = new Promise((e, t) => {
                        const i = () => {
                                n.removeEventListener("complete", s), n.removeEventListener("error", r), n.removeEventListener("abort", r)
                            },
                            s = () => {
                                e(), i()
                            },
                            r = () => {
                                t(n.error || new DOMException("AbortError", "AbortError")), i()
                            };
                        n.addEventListener("complete", s), n.addEventListener("error", r), n.addEventListener("abort", r)
                    }), J.set(n, t))), Q(e, X = X || [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]) ? new Proxy(e, se) : e)
                }

                function l(e) {
                    var n, t;
                    return e instanceof IDBRequest ? (n = e, (t = new Promise((e, t) => {
                        const i = () => {
                                n.removeEventListener("success", s), n.removeEventListener("error", r)
                            },
                            s = () => {
                                e(l(n.result)), i()
                            },
                            r = () => {
                                t(n.error), i()
                            };
                        n.addEventListener("success", s), n.addEventListener("error", r)
                    })).then(e => {
                        e instanceof IDBCursor && Z.set(e, n)
                    })["catch"](() => {}), ie.set(t, n), t) : te.has(e) ? te.get(e) : ((t = ne(e)) !== e && (te.set(e, t), ie.set(t, e)), t)
                }
                const s = e => ie.get(e);

                function ae(e, t, {
                    blocked: i,
                    upgrade: s,
                    blocking: r,
                    terminated: n
                } = {}) {
                    const a = indexedDB.open(e, t);
                    e = l(a);
                    return s && a.addEventListener("upgradeneeded", e => {
                        s(l(a.result), e.oldVersion, e.newVersion, l(a.transaction), e)
                    }), i && a.addEventListener("blocked", e => i(e.oldVersion, e.newVersion, e)), e.then(e => {
                        n && e.addEventListener("close", () => n()), r && e.addEventListener("versionchange", e => r(e.oldVersion, e.newVersion, e))
                    })["catch"](() => {}), e
                }
                const oe = ["get", "getKey", "getAll", "getAllKeys", "count"],
                    ce = ["put", "add", "delete", "clear"],
                    le = new Map;

                function pe(e, t) {
                    if (e instanceof IDBDatabase && !(t in e) && "string" == typeof t) {
                        if (le.get(t)) return le.get(t);
                        const s = t.replace(/FromIndex$/, ""),
                            r = t !== s,
                            n = ce.includes(s);
                        return s in (r ? IDBIndex : IDBObjectStore).prototype && (n || oe.includes(s)) ? (e = async function(e, ...t) {
                            e = this.transaction(e, n ? "readwrite" : "readonly");
                            let i = e.store;
                            return r && (i = i.index(t.shift())), (await Promise.all([i[s](...t), n && e.done]))[0]
                        }, le.set(t, e), e) : void 0
                    }
                }
                se = {
                    ...q = se,
                    get: (e, t, i) => pe(e, t) || q.get(e, t, i),
                    has: (e, t) => !!pe(e, t) || q.has(e, t)
                };
                const {
                    encode: he,
                    decode: ue
                } = {
                    encode(t) {
                        if (!t) return t;
                        t = t.toString();
                        var i = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
                        let s, r, n, a, o = "",
                            e = t.length % 3;
                        for (let e = 0; e < t.length;) {
                            if (255 < (r = t.charCodeAt(e++)) || 255 < (n = t.charCodeAt(e++)) || 255 < (a = t.charCodeAt(e++))) throw new TypeError("invalid character found");
                            s = r << 16 | n << 8 | a, o += i[s >> 18 & 63] + i[s >> 12 & 63] + i[s >> 6 & 63] + i[63 & s]
                        }
                        return encodeURIComponent(e ? o.slice(0, e - 3) + "===".substr(e) : o)
                    },
                    decode(t) {
                        if (!t) return t;
                        var i, s = {
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
                        t = (t = decodeURIComponent(t.toString())).replace(/\s+/g, ""), t += "==".slice(2 - (3 & t.length));
                        let r, n, a = "";
                        for (let e = 0; e < t.length;) i = s[t.charAt(e++)] << 18 | s[t.charAt(e++)] << 12 | (r = s[t.charAt(e++)]) << 6 | (n = s[t.charAt(e++)]), a += 64 === r ? String.fromCharCode(i >> 16 & 255) : 64 === n ? String.fromCharCode(i >> 16 & 255, i >> 8 & 255) : String.fromCharCode(i >> 16 & 255, i >> 8 & 255, 255 & i);
                        return a
                    }
                };

                function r(e, t, i) {
                    return e(i = {
                        path: t,
                        exports: {},
                        require: function(e, t) {
                            throw null == t && i.path, Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                        }
                    }, i.exports), i.exports
                }
                var d = r(function(e, t) {
                        t.__esModule = !0, t.isIdentifierChar = function(e, t) {
                            return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? 170 <= e && n.test(String.fromCharCode(e)) : !1 !== t && (c(e, a) || c(e, o)))))
                        }, t.isIdentifierStart = function(e, t) {
                            return e < 65 ? 36 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? 170 <= e && r.test(String.fromCharCode(e)) : !1 !== t && c(e, a)))
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
                        let s = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ca\ua7d0\ua7d1\ua7d3\ua7d5-\ua7d9\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc",
                            r = RegExp("[" + s + "]"),
                            n = RegExp("[" + s + "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0898-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]"),
                            a = (0, [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938]),
                            o = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];

                        function c(t, i) {
                            let s = 65536;
                            for (let e = 0; e < i.length; e += 2) {
                                if ((s += i[e]) > t) return !1;
                                if ((s += i[e + 1]) >= t) return !0
                            }
                        }
                    }),
                    g = r(function(e, t) {
                        t.__esModule = !0, t.types = t.keywords = t.TokenType = void 0;
                        class i {
                            constructor(e, t = {}) {
                                this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !!t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !!t.postfix, this.binop = t.binop || null, this.updateContext = null
                            }
                        }

                        function s(e, t) {
                            return new i(e, {
                                beforeExpr: !0,
                                binop: t
                            })
                        }
                        t.TokenType = i;
                        let r = {
                                beforeExpr: !0
                            },
                            n = {
                                startsExpr: !0
                            },
                            a = {};

                        function o(e, t = {}) {
                            return t.keyword = e, a[e] = new i(e, t)
                        }
                        t.keywords = a;
                        var c = {
                            num: new i("num", n),
                            regexp: new i("regexp", n),
                            string: new i("string", n),
                            name: new i("name", n),
                            privateId: new i("privateId", n),
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
                            comma: new i(",", r),
                            semi: new i(";", r),
                            colon: new i(":", r),
                            dot: new i("."),
                            question: new i("?", r),
                            questionDot: new i("?."),
                            arrow: new i("=>", r),
                            template: new i("template"),
                            invalidTemplate: new i("invalidTemplate"),
                            ellipsis: new i("...", r),
                            backQuote: new i("`", n),
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
                            logicalOR: s("||", 1),
                            logicalAND: s("&&", 2),
                            bitwiseOR: s("|", 3),
                            bitwiseXOR: s("^", 4),
                            bitwiseAND: s("&", 5),
                            equality: s("==/!=/===/!==", 6),
                            relational: s("</>/<=/>=", 7),
                            bitShift: s("<</>>/>>>", 8),
                            plusMin: new i("+/-", {
                                beforeExpr: !0,
                                binop: 9,
                                prefix: !0,
                                startsExpr: !0
                            }),
                            modulo: s("%", 10),
                            star: s("*", 10),
                            slash: s("/", 10),
                            starstar: new i("**", {
                                beforeExpr: !0
                            }),
                            coalesce: s("??", 1),
                            _break: o("break"),
                            _case: o("case", r),
                            _catch: o("catch"),
                            _continue: o("continue"),
                            _debugger: o("debugger"),
                            _default: o("default", r),
                            _do: o("do", {
                                isLoop: !0,
                                beforeExpr: !0
                            }),
                            _else: o("else", r),
                            _finally: o("finally"),
                            _for: o("for", {
                                isLoop: !0
                            }),
                            _function: o("function", n),
                            _if: o("if"),
                            _return: o("return", r),
                            _switch: o("switch"),
                            _throw: o("throw", r),
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
                            _this: o("this", n),
                            _super: o("super", n),
                            _class: o("class", n),
                            _extends: o("extends", r),
                            _export: o("export"),
                            _import: o("import", n),
                            _null: o("null", n),
                            _true: o("true", n),
                            _false: o("false", n),
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
                    p = r(function(e, t) {
                        t.__esModule = !0, t.isNewLine = n, t.lineBreakG = t.lineBreak = void 0, t.nextLineBreak = function(t, i, s = t.length) {
                            for (let e = i; e < s; e++) {
                                var r = t.charCodeAt(e);
                                if (n(r)) return e < s - 1 && 13 === r && 10 === t.charCodeAt(e + 1) ? e + 2 : e + 1
                            }
                            return -1
                        }, t.skipWhiteSpace = t.nonASCIIwhitespace = void 0;
                        var i = /\r\n?|\n|\u2028|\u2029/,
                            i = (t.lineBreak = i, RegExp(i.source, "g"));

                        function n(e) {
                            return 10 === e || 13 === e || 8232 === e || 8233 === e
                        }
                        t.lineBreakG = i, t.nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, t.skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g
                    }),
                    x = r(function(e, t) {
                        t.__esModule = !0, t.loneSurrogate = t.isArray = t.hasOwn = void 0, t.wordsRegexp = function(e) {
                            return RegExp("^(?:" + e.replace(/ /g, "|") + ")$")
                        };
                        let i = Object.prototype,
                            s = i.hasOwnProperty,
                            r = i.toString,
                            n = Object.hasOwn || ((e, t) => s.call(e, t));
                        t.hasOwn = n;
                        var a = Array.isArray || (e => "[object Array]" === r.call(e));
                        t.isArray = a, t.loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/
                    }),
                    h = r(function(e, t) {
                        t.__esModule = !0, t.SourceLocation = t.Position = void 0, t.getLineInfo = function(i, s) {
                            for (let e = 1, t = 0;;) {
                                var r = (0, p.nextLineBreak)(i, t, s);
                                if (r < 0) return new n(e, s - t);
                                ++e, t = r
                            }
                        };
                        class n {
                            constructor(e, t) {
                                this.line = e, this.column = t
                            }
                            offset(e) {
                                return new n(this.line, this.column + e)
                            }
                        }
                        t.Position = n, t.SourceLocation = class {
                            constructor(e, t, i) {
                                this.start = t, this.end = i, null !== e.sourceFile && (this.source = e.sourceFile)
                            }
                        }
                    }),
                    de = r(function(e, t) {
                        t.__esModule = !0, t.defaultOptions = void 0;
                        let s = {
                                ecmaVersion: null,
                                sourceType: "script",
                                onInsertedSemicolon: null,
                                onTrailingComma: null,
                                allowReserved: null,
                                allowReturnOutsideFunction: !(t.getOptions = function(e) {
                                    var a, o, t, i = {};
                                    for (t in s) i[t] = (e && (0, x.hasOwn)(e, t) ? e : s)[t];
                                    if ("latest" === i.ecmaVersion ? i.ecmaVersion = 1e8 : null == i.ecmaVersion ? (!r && "object" == typeof console && console.warn && (r = !0, console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.")), i.ecmaVersion = 11) : 2015 <= i.ecmaVersion && (i.ecmaVersion -= 2009), null == i.allowReserved && (i.allowReserved = i.ecmaVersion < 5), (0, x.isArray)(i.onToken)) {
                                        let t = i.onToken;
                                        i.onToken = e => t.push(e)
                                    }
                                    return (0, x.isArray)(i.onComment) && (i.onComment = (o = (a = i).onComment, function(e, t, i, s, r, n) {
                                        e = {
                                            type: e ? "Block" : "Line",
                                            value: t,
                                            start: i,
                                            end: s
                                        };
                                        a.locations && (e.loc = new h.SourceLocation(this, r, n)), a.ranges && (e.range = [i, s]), o.push(e)
                                    })), i
                                }),
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
                            r = (t.defaultOptions = s, !1)
                    }),
                    u = r(function(e, t) {
                        t.__esModule = !0, t.SCOPE_VAR = t.SCOPE_TOP = t.SCOPE_SUPER = t.SCOPE_SIMPLE_CATCH = t.SCOPE_GENERATOR = t.SCOPE_FUNCTION = t.SCOPE_DIRECT_SUPER = t.SCOPE_CLASS_STATIC_BLOCK = t.SCOPE_ASYNC = t.SCOPE_ARROW = t.BIND_VAR = t.BIND_SIMPLE_CATCH = t.BIND_OUTSIDE = t.BIND_NONE = t.BIND_LEXICAL = t.BIND_FUNCTION = void 0, t.functionFlags = function(e, t) {
                            return 2 | (e ? 4 : 0) | (t ? 8 : 0)
                        }, t.SCOPE_VAR = 259, t.SCOPE_CLASS_STATIC_BLOCK = 256, t.SCOPE_DIRECT_SUPER = 128, t.SCOPE_SUPER = 64, t.SCOPE_SIMPLE_CATCH = 32, t.SCOPE_ARROW = 16, t.SCOPE_GENERATOR = 8, t.SCOPE_ASYNC = 4, t.SCOPE_FUNCTION = 2, t.SCOPE_TOP = 1, t.BIND_OUTSIDE = 5, t.BIND_SIMPLE_CATCH = 4, t.BIND_FUNCTION = 3, t.BIND_LEXICAL = 2, t.BIND_VAR = 1, t.BIND_NONE = 0
                    }),
                    f = r(function(e, t) {
                        t.__esModule = !0, t.Parser = void 0, t.Parser = class {
                            constructor(e, t, i) {
                                this.options = e = (0, de.getOptions)(e), this.sourceFile = e.sourceFile, this.keywords = (0, x.wordsRegexp)(d.keywords[6 <= e.ecmaVersion ? 6 : "module" === e.sourceType ? "5module" : 5]);
                                let s = "";
                                !0 !== e.allowReserved && (s = d.reservedWords[6 <= e.ecmaVersion ? 6 : 5 === e.ecmaVersion ? 5 : 3], "module" === e.sourceType) && (s += " await"), this.reservedWords = (0, x.wordsRegexp)(s);
                                var r = (s ? s + " " : "") + d.reservedWords.strict;
                                this.reservedWordsStrict = (0, x.wordsRegexp)(r), this.reservedWordsStrictBind = (0, x.wordsRegexp)(r + " " + d.reservedWords.strictBind), this.input = String(t), this.containsEsc = !1, i ? (this.pos = i, this.lineStart = this.input.lastIndexOf("\n", i - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(p.lineBreak).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = g.types.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = "module" === e.sourceType, this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = Object.create(null), 0 === this.pos && e.allowHashBang && "#!" === this.input.slice(0, 2) && this.skipLineComment(2), this.scopeStack = [], this.enterScope(u.SCOPE_TOP), this.regexpState = null, this.privateNameStack = []
                            }
                            parse() {
                                var e = this.options.program || this.startNode();
                                return this.nextToken(), this.parseTopLevel(e)
                            }
                            get inFunction() {
                                return 0 < (this.currentVarScope().flags & u.SCOPE_FUNCTION)
                            }
                            get inGenerator() {
                                return 0 < (this.currentVarScope().flags & u.SCOPE_GENERATOR) && !this.currentVarScope().inClassFieldInit
                            }
                            get inAsync() {
                                return 0 < (this.currentVarScope().flags & u.SCOPE_ASYNC) && !this.currentVarScope().inClassFieldInit
                            }
                            get canAwait() {
                                for (let e = this.scopeStack.length - 1; 0 <= e; e--) {
                                    var t = this.scopeStack[e];
                                    if (t.inClassFieldInit || t.flags & u.SCOPE_CLASS_STATIC_BLOCK) return !1;
                                    if (t.flags & u.SCOPE_FUNCTION) return 0 < (t.flags & u.SCOPE_ASYNC)
                                }
                                return this.inModule && 13 <= this.options.ecmaVersion || this.options.allowAwaitOutsideFunction
                            }
                            get allowSuper() {
                                var e = this.currentThisScope(),
                                    t = e.flags,
                                    e = e.inClassFieldInit;
                                return 0 < (t & u.SCOPE_SUPER) || e || this.options.allowSuperOutsideMethod
                            }
                            get allowDirectSuper() {
                                return 0 < (this.currentThisScope().flags & u.SCOPE_DIRECT_SUPER)
                            }
                            get treatFunctionsAsVar() {
                                return this.treatFunctionsAsVarInScope(this.currentScope())
                            }
                            get allowNewDotTarget() {
                                var e = this.currentThisScope(),
                                    t = e.flags,
                                    e = e.inClassFieldInit;
                                return 0 < (t & (u.SCOPE_FUNCTION | u.SCOPE_CLASS_STATIC_BLOCK)) || e
                            }
                            get inClassStaticBlock() {
                                return 0 < (this.currentVarScope().flags & u.SCOPE_CLASS_STATIC_BLOCK)
                            }
                            static extend(...t) {
                                let i = this;
                                for (let e = 0; e < t.length; e++) i = t[e](i);
                                return i
                            }
                            static parse(e, t) {
                                return new this(t, e).parse()
                            }
                            static parseExpressionAt(e, t, i) {
                                i = new this(i, e, t);
                                return i.nextToken(), i.parseExpression()
                            }
                            static tokenizer(e, t) {
                                return new this(t, e)
                            }
                        }
                    }),
                    v = r(function(e, t) {
                        t.__esModule = !0, t.DestructuringErrors = function() {
                            this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1
                        };
                        let i = f.Parser.prototype,
                            s = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
                        i.strictDirective = function(e) {
                            for (;;) {
                                p.skipWhiteSpace.lastIndex = e, e += p.skipWhiteSpace.exec(this.input)[0].length;
                                var t = s.exec(this.input.slice(e));
                                if (!t || "use strict" === (t[1] || t[2])) return !1;
                                e += t[0].length, p.skipWhiteSpace.lastIndex = e, e += p.skipWhiteSpace.exec(this.input)[0].length, ";" === this.input[e] && e++
                            }
                        }, i.eat = function(e) {
                            return this.type === e && (this.next(), !0)
                        }, i.isContextual = function(e) {
                            return this.type === g.types.name && this.value === e && !this.containsEsc
                        }, i.eatContextual = function(e) {
                            return !!this.isContextual(e) && (this.next(), !0)
                        }, i.expectContextual = function(e) {
                            this.eatContextual(e) || this.unexpected()
                        }, i.canInsertSemicolon = function() {
                            return this.type === g.types.eof || this.type === g.types.braceR || p.lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
                        }, i.insertSemicolon = function() {
                            if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0
                        }, i.semicolon = function() {
                            this.eat(g.types.semi) || this.insertSemicolon() || this.unexpected()
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

                function m(e, t) {
                    var i, s = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (s) return (s = s.call(e)).next.bind(s);
                    if (Array.isArray(e) || (s = function(e, t) {
                            {
                                var i;
                                if (e) return "string" == typeof e ? fe(e, t) : "Map" === (i = "Object" === (i = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : i) || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? fe(e, t) : void 0
                            }
                        }(e)) || t && e && "number" == typeof e.length) return s && (e = s), i = 0,
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

                function fe(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var i = 0, s = Array(t); i < t; i++) s[i] = e[i];
                    return s
                }
                e = f.Parser.prototype;
                e.parseTopLevel = function(e) {
                    var t = Object.create(null);
                    for (e.body || (e.body = []); this.type !== g.types.eof;) {
                        var i = this.parseStatement(null, !0, t);
                        e.body.push(i)
                    }
                    if (this.inModule)
                        for (var s = 0, r = Object.keys(this.undefinedExports); s < r.length; s++) {
                            var n = r[s];
                            this.raiseRecoverable(this.undefinedExports[n].start, `Export '${n}' is not defined`)
                        }
                    return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType, this.finishNode(e, "Program")
                };
                let me = {
                        kind: "loop"
                    },
                    ye = {
                        kind: "switch"
                    },
                    ge = (e.isLet = function(s) {
                        if (!(this.options.ecmaVersion < 6) && this.isContextual("let")) {
                            p.skipWhiteSpace.lastIndex = this.pos;
                            let e = p.skipWhiteSpace.exec(this.input),
                                t = this.pos + e[0].length,
                                i = this.input.charCodeAt(t);
                            if (91 === i || 92 === i || 55295 < i && i < 56320) return !0;
                            if (!s) {
                                if (123 === i) return !0;
                                if ((0, d.isIdentifierStart)(i, !0)) {
                                    let e = t + 1;
                                    for (;
                                        (0, d.isIdentifierChar)(i = this.input.charCodeAt(e), !0);) ++e;
                                    if (92 === i || 55295 < i && i < 56320) return !0;
                                    s = this.input.slice(t, e);
                                    if (!d.keywordRelationalOperator.test(s)) return !0
                                }
                            }
                        }
                        return !1
                    }, e.isAsyncFunction = function() {
                        if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;
                        p.skipWhiteSpace.lastIndex = this.pos;
                        var e = p.skipWhiteSpace.exec(this.input),
                            e = this.pos + e[0].length;
                        return !(p.lineBreak.test(this.input.slice(this.pos, e)) || "function" !== this.input.slice(e, e + 8) || e + 8 !== this.input.length && ((0, d.isIdentifierChar)(e = this.input.charCodeAt(e + 8)) || 55295 < e && e < 56320))
                    }, e.parseStatement = function(e, t, i) {
                        let s = this.type,
                            r = this.startNode(),
                            n;
                        switch (this.isLet(e) && (s = g.types._var, n = "let"), s) {
                            case g.types._break:
                            case g.types._continue:
                                return this.parseBreakContinueStatement(r, s.keyword);
                            case g.types._debugger:
                                return this.parseDebuggerStatement(r);
                            case g.types._do:
                                return this.parseDoStatement(r);
                            case g.types._for:
                                return this.parseForStatement(r);
                            case g.types._function:
                                return e && (this.strict || "if" !== e && "label" !== e) && 6 <= this.options.ecmaVersion && this.unexpected(), this.parseFunctionStatement(r, !1, !e);
                            case g.types._class:
                                return e && this.unexpected(), this.parseClass(r, !0);
                            case g.types._if:
                                return this.parseIfStatement(r);
                            case g.types._return:
                                return this.parseReturnStatement(r);
                            case g.types._switch:
                                return this.parseSwitchStatement(r);
                            case g.types._throw:
                                return this.parseThrowStatement(r);
                            case g.types._try:
                                return this.parseTryStatement(r);
                            case g.types._const:
                            case g.types._var:
                                return n = n || this.value, e && "var" !== n && this.unexpected(), this.parseVarStatement(r, n);
                            case g.types._while:
                                return this.parseWhileStatement(r);
                            case g.types._with:
                                return this.parseWithStatement(r);
                            case g.types.braceL:
                                return this.parseBlock(!0, r);
                            case g.types.semi:
                                return this.parseEmptyStatement(r);
                            case g.types._export:
                            case g.types._import:
                                if (10 < this.options.ecmaVersion && s === g.types._import) {
                                    p.skipWhiteSpace.lastIndex = this.pos;
                                    var a = p.skipWhiteSpace.exec(this.input),
                                        a = this.pos + a[0].length,
                                        a = this.input.charCodeAt(a);
                                    if (40 === a || 46 === a) return this.parseExpressionStatement(r, this.parseExpression())
                                }
                                return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule) || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'"), s === g.types._import ? this.parseImport(r) : this.parseExport(r, i);
                            default:
                                var o;
                                return this.isAsyncFunction() ? (e && this.unexpected(), this.next(), this.parseFunctionStatement(r, !0, !e)) : (a = this.value, o = this.parseExpression(), s === g.types.name && "Identifier" === o.type && this.eat(g.types.colon) ? this.parseLabeledStatement(r, a, o, e) : this.parseExpressionStatement(r, o))
                        }
                    }, e.parseBreakContinueStatement = function(e, t) {
                        var i = "break" === t;
                        this.next(), this.eat(g.types.semi) || this.insertSemicolon() ? e.label = null : this.type !== g.types.name ? this.unexpected() : (e.label = this.parseIdent(), this.semicolon());
                        let s = 0;
                        for (; s < this.labels.length; ++s) {
                            var r = this.labels[s];
                            if ((null == e.label || r.name === e.label.name) && (null != r.kind && (i || "loop" === r.kind) || e.label && i)) break
                        }
                        return s === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, i ? "BreakStatement" : "ContinueStatement")
                    }, e.parseDebuggerStatement = function(e) {
                        return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement")
                    }, e.parseDoStatement = function(e) {
                        return this.next(), this.labels.push(me), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(g.types._while), e.test = this.parseParenExpression(), 6 <= this.options.ecmaVersion ? this.eat(g.types.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement")
                    }, e.parseForStatement = function(e) {
                        this.next();
                        var t = 9 <= this.options.ecmaVersion && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
                        if (this.labels.push(me), this.enterScope(0), this.expect(g.types.parenL), this.type === g.types.semi) return -1 < t && this.unexpected(t), this.parseFor(e, null);
                        var i, s = this.isLet();
                        if (this.type === g.types._var || this.type === g.types._const || s) return i = this.startNode(), s = s ? "let" : this.value, this.next(), this.parseVar(i, !0, s), this.finishNode(i, "VariableDeclaration"), (this.type === g.types._in || 6 <= this.options.ecmaVersion && this.isContextual("of")) && 1 === i.declarations.length ? (9 <= this.options.ecmaVersion && (this.type === g.types._in ? -1 < t && this.unexpected(t) : e["await"] = -1 < t), this.parseForIn(e, i)) : (-1 < t && this.unexpected(t), this.parseFor(e, i));
                        let r = this.isContextual("let"),
                            n = !1,
                            a = new v.DestructuringErrors,
                            o = this.parseExpression(!(-1 < t) || "await", a);
                        return this.type === g.types._in || (n = 6 <= this.options.ecmaVersion && this.isContextual("of")) ? (9 <= this.options.ecmaVersion && (this.type === g.types._in ? -1 < t && this.unexpected(t) : e["await"] = -1 < t), r && n && this.raise(o.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(o, !1, a), this.checkLValPattern(o), this.parseForIn(e, o)) : (this.checkExpressionErrors(a, !0), -1 < t && this.unexpected(t), this.parseFor(e, o))
                    }, e.parseFunctionStatement = function(e, t, i) {
                        return this.next(), this.parseFunction(e, y | (i ? 0 : xe), !1, t)
                    }, e.parseIfStatement = function(e) {
                        return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(g.types._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement")
                    }, e.parseReturnStatement = function(e) {
                        return this.inFunction || this.options.allowReturnOutsideFunction || this.raise(this.start, "'return' outside of function"), this.next(), this.eat(g.types.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement")
                    }, e.parseSwitchStatement = function(t) {
                        this.next(), t.discriminant = this.parseParenExpression(), t.cases = [], this.expect(g.types.braceL), this.labels.push(ye), this.enterScope(0);
                        let i;
                        for (let e = !1; this.type !== g.types.braceR;) {
                            var s;
                            this.type === g.types._case || this.type === g.types._default ? (s = this.type === g.types._case, i && this.finishNode(i, "SwitchCase"), t.cases.push(i = this.startNode()), i.consequent = [], this.next(), s ? i.test = this.parseExpression() : (e && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), e = !0, i.test = null), this.expect(g.types.colon)) : (i || this.unexpected(), i.consequent.push(this.parseStatement(null)))
                        }
                        return this.exitScope(), i && this.finishNode(i, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(t, "SwitchStatement")
                    }, e.parseThrowStatement = function(e) {
                        return this.next(), p.lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement")
                    }, []),
                    y = (e.parseTryStatement = function(e) {
                        var t, i;
                        return this.next(), e.block = this.parseBlock(), e.handler = null, this.type === g.types._catch && (t = this.startNode(), this.next(), this.eat(g.types.parenL) ? (t.param = this.parseBindingAtom(), i = "Identifier" === t.param.type, this.enterScope(i ? u.SCOPE_SIMPLE_CATCH : 0), this.checkLValPattern(t.param, i ? u.BIND_SIMPLE_CATCH : u.BIND_LEXICAL), this.expect(g.types.parenR)) : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause")), e.finalizer = this.eat(g.types._finally) ? this.parseBlock() : null, e.handler || e.finalizer || this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement")
                    }, e.parseVarStatement = function(e, t) {
                        return this.next(), this.parseVar(e, !1, t), this.semicolon(), this.finishNode(e, "VariableDeclaration")
                    }, e.parseWhileStatement = function(e) {
                        return this.next(), e.test = this.parseParenExpression(), this.labels.push(me), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement")
                    }, e.parseWithStatement = function(e) {
                        return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement")
                    }, e.parseEmptyStatement = function(e) {
                        return this.next(), this.finishNode(e, "EmptyStatement")
                    }, e.parseLabeledStatement = function(t, e, i, s) {
                        for (var r, n = m(this.labels); !(r = n()).done;) r.value.name === e && this.raise(i.start, "Label '" + e + "' is already declared");
                        var a = this.type.isLoop ? "loop" : this.type === g.types._switch ? "switch" : null;
                        for (let e = this.labels.length - 1; 0 <= e; e--) {
                            var o = this.labels[e];
                            if (o.statementStart !== t.start) break;
                            o.statementStart = this.start, o.kind = a
                        }
                        return this.labels.push({
                            name: e,
                            kind: a,
                            statementStart: this.start
                        }), t.body = this.parseStatement(s ? -1 === s.indexOf("label") ? s + "label" : s : "label"), this.labels.pop(), t.label = i, this.finishNode(t, "LabeledStatement")
                    }, e.parseExpressionStatement = function(e, t) {
                        return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement")
                    }, e.parseBlock = function(e = !0, t = this.startNode(), i) {
                        for (t.body = [], this.expect(g.types.braceL), e && this.enterScope(0); this.type !== g.types.braceR;) {
                            var s = this.parseStatement(null);
                            t.body.push(s)
                        }
                        return i && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement")
                    }, e.parseFor = function(e, t) {
                        return e.init = t, this.expect(g.types.semi), e.test = this.type === g.types.semi ? null : this.parseExpression(), this.expect(g.types.semi), e.update = this.type === g.types.parenR ? null : this.parseExpression(), this.expect(g.types.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement")
                    }, e.parseForIn = function(e, t) {
                        var i = this.type === g.types._in;
                        return this.next(), "VariableDeclaration" === t.type && null != t.declarations[0].init && (!i || this.options.ecmaVersion < 8 || this.strict || "var" !== t.kind || "Identifier" !== t.declarations[0].id.type) && this.raise(t.start, `${i?"for-in":"for-of"} loop variable declaration may not have an initializer`), e.left = t, e.right = i ? this.parseExpression() : this.parseMaybeAssign(), this.expect(g.types.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, i ? "ForInStatement" : "ForOfStatement")
                    }, e.parseVar = function(e, t, i) {
                        for (e.declarations = [], e.kind = i;;) {
                            var s = this.startNode();
                            if (this.parseVarId(s, i), this.eat(g.types.eq) ? s.init = this.parseMaybeAssign(t) : "const" !== i || this.type === g.types._in || 6 <= this.options.ecmaVersion && this.isContextual("of") ? "Identifier" === s.id.type || t && (this.type === g.types._in || this.isContextual("of")) ? s.init = null : this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : this.unexpected(), e.declarations.push(this.finishNode(s, "VariableDeclarator")), !this.eat(g.types.comma)) break
                        }
                        return e
                    }, e.parseVarId = function(e, t) {
                        e.id = this.parseBindingAtom(), this.checkLValPattern(e.id, "var" === t ? u.BIND_VAR : u.BIND_LEXICAL, !1)
                    }, 1),
                    xe = 2;

                function b(e, t) {
                    var i = e.computed,
                        e = e.key;
                    return !i && ("Identifier" === e.type && e.name === t || "Literal" === e.type && e.value === t)
                }

                function ve(e, t) {
                    var i, s = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (s) return (s = s.call(e)).next.bind(s);
                    if (Array.isArray(e) || (s = function(e, t) {
                            {
                                var i;
                                if (e) return "string" == typeof e ? be(e, t) : "Map" === (i = "Object" === (i = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : i) || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? be(e, t) : void 0
                            }
                        }(e)) || t && e && "number" == typeof e.length) return s && (e = s), i = 0,
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

                function be(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var i = 0, s = Array(t); i < t; i++) s[i] = e[i];
                    return s
                }
                e.parseFunction = function(e, t, i, s, r) {
                    this.initFunction(e), (9 <= this.options.ecmaVersion || 6 <= this.options.ecmaVersion && !s) && (this.type === g.types.star && t & xe && this.unexpected(), e.generator = this.eat(g.types.star)), 8 <= this.options.ecmaVersion && (e["async"] = !!s), t & y && (e.id = 4 & t && this.type !== g.types.name ? null : this.parseIdent(), e.id) && !(t & xe) && this.checkLValSimple(e.id, this.strict || e.generator || e["async"] ? this.treatFunctionsAsVar ? u.BIND_VAR : u.BIND_LEXICAL : u.BIND_FUNCTION);
                    var s = this.yieldPos,
                        n = this.awaitPos,
                        a = this.awaitIdentPos;
                    return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope((0, u.functionFlags)(e["async"], e.generator)), t & y || (e.id = this.type === g.types.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, i, !1, r), this.yieldPos = s, this.awaitPos = n, this.awaitIdentPos = a, this.finishNode(e, t & y ? "FunctionDeclaration" : "FunctionExpression")
                }, e.parseFunctionParams = function(e) {
                    this.expect(g.types.parenL), e.params = this.parseBindingList(g.types.parenR, !1, 8 <= this.options.ecmaVersion), this.checkYieldAwaitInDefaultParams()
                }, e.parseClass = function(e, t) {
                    this.next();
                    var i = this.strict;
                    this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
                    let s = this.enterClassBody(),
                        r = this.startNode(),
                        n = !1;
                    for (r.body = [], this.expect(g.types.braceL); this.type !== g.types.braceR;) {
                        var a = this.parseClassElement(null !== e.superClass);
                        a && (r.body.push(a), "MethodDefinition" === a.type && "constructor" === a.kind ? (n && this.raise(a.start, "Duplicate constructor in the same class"), n = !0) : a.key && "PrivateIdentifier" === a.key.type && function(e, t) {
                            let i = t.key.name,
                                s = e[i],
                                r = "true";
                            return "MethodDefinition" !== t.type || "get" !== t.kind && "set" !== t.kind || (r = (t["static"] ? "s" : "i") + t.kind), "iget" === s && "iset" === r || "iset" === s && "iget" === r || "sget" === s && "sset" === r || "sset" === s && "sget" === r ? (e[i] = "true", 0) : s || (e[i] = r, 0)
                        }(s, a) && this.raiseRecoverable(a.key.start, `Identifier '#${a.key.name}' has already been declared`))
                    }
                    return this.strict = i, this.next(), e.body = this.finishNode(r, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression")
                }, e.parseClassElement = function(e) {
                    if (this.eat(g.types.semi)) return null;
                    let t = this.options.ecmaVersion,
                        i = this.startNode(),
                        s = "",
                        r = !1,
                        n = !1,
                        a = "method",
                        o = !1;
                    if (this.eatContextual("static")) {
                        if (13 <= t && this.eat(g.types.braceL)) return this.parseClassStaticBlock(i), i;
                        this.isClassElementNameStart() || this.type === g.types.star ? o = !0 : s = "static"
                    }
                    var c;
                    return i["static"] = o, !s && 8 <= t && this.eatContextual("async") && (!this.isClassElementNameStart() && this.type !== g.types.star || this.canInsertSemicolon() ? s = "async" : n = !0), !s && (9 <= t || !n) && this.eat(g.types.star) && (r = !0), s || n || r || (c = this.value, (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? a = c : s = c)), s ? (i.computed = !1, i.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), i.key.name = s, this.finishNode(i.key, "Identifier")) : this.parseClassElementName(i), t < 13 || this.type === g.types.parenL || "method" !== a || r || n ? ((c = !i["static"] && b(i, "constructor")) && "method" !== a && this.raise(i.key.start, "Constructor can't have get/set modifier"), i.kind = c ? "constructor" : a, this.parseClassMethod(i, r, n, c && e)) : this.parseClassField(i), i
                }, e.isClassElementNameStart = function() {
                    return this.type === g.types.name || this.type === g.types.privateId || this.type === g.types.num || this.type === g.types.string || this.type === g.types.bracketL || this.type.keyword
                }, e.parseClassElementName = function(e) {
                    this.type === g.types.privateId ? ("constructor" === this.value && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e)
                }, e.parseClassMethod = function(e, t, i, s) {
                    var r = e.key,
                        r = ("constructor" === e.kind ? (t && this.raise(r.start, "Constructor can't be a generator"), i && this.raise(r.start, "Constructor can't be an async method")) : e["static"] && b(e, "prototype") && this.raise(r.start, "Classes may not have a static property named prototype"), e.value = this.parseMethod(t, i, s));
                    return "get" === e.kind && 0 !== r.params.length && this.raiseRecoverable(r.start, "getter should have no params"), "set" === e.kind && 1 !== r.params.length && this.raiseRecoverable(r.start, "setter should have exactly one param"), "set" === e.kind && "RestElement" === r.params[0].type && this.raiseRecoverable(r.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition")
                }, e.parseClassField = function(e) {
                    var t, i;
                    return b(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e["static"] && b(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(g.types.eq) ? (i = (t = this.currentThisScope()).inClassFieldInit, t.inClassFieldInit = !0, e.value = this.parseMaybeAssign(), t.inClassFieldInit = i) : e.value = null, this.semicolon(), this.finishNode(e, "PropertyDefinition")
                }, e.parseClassStaticBlock = function(e) {
                    e.body = [];
                    var t = this.labels;
                    for (this.labels = [], this.enterScope(u.SCOPE_CLASS_STATIC_BLOCK | u.SCOPE_SUPER); this.type !== g.types.braceR;) {
                        var i = this.parseStatement(null);
                        e.body.push(i)
                    }
                    return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock")
                }, e.parseClassId = function(e, t) {
                    this.type === g.types.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, u.BIND_LEXICAL, !1)) : (!0 === t && this.unexpected(), e.id = null)
                }, e.parseClassSuper = function(e) {
                    e.superClass = this.eat(g.types._extends) ? this.parseExprSubscripts(!1) : null
                }, e.enterClassBody = function() {
                    var e = {
                        declared: Object.create(null),
                        used: []
                    };
                    return this.privateNameStack.push(e), e.declared
                }, e.exitClassBody = function() {
                    var e = this.privateNameStack.pop(),
                        t = e.declared,
                        i = e.used,
                        e = this.privateNameStack.length,
                        s = 0 === e ? null : this.privateNameStack[e - 1];
                    for (let e = 0; e < i.length; ++e) {
                        var r = i[e];
                        (0, x.hasOwn)(t, r.name) || (s ? s.used.push(r) : this.raiseRecoverable(r.start, `Private field '#${r.name}' must be declared in an enclosing class`))
                    }
                }, e.parseExport = function(t, i) {
                    if (this.next(), this.eat(g.types.star)) return 11 <= this.options.ecmaVersion && (this.eatContextual("as") ? (t.exported = this.parseModuleExportName(), this.checkExport(i, t.exported.name, this.lastTokStart)) : t.exported = null), this.expectContextual("from"), this.type !== g.types.string && this.unexpected(), t.source = this.parseExprAtom(), this.semicolon(), this.finishNode(t, "ExportAllDeclaration");
                    if (this.eat(g.types._default)) {
                        this.checkExport(i, "default", this.lastTokStart);
                        let e;
                        var s;
                        return this.type === g.types._function || (e = this.isAsyncFunction()) ? (s = this.startNode(), this.next(), e && this.next(), t.declaration = this.parseFunction(s, 4 | y, !1, e)) : this.type === g.types._class ? (s = this.startNode(), t.declaration = this.parseClass(s, "nullableID")) : (t.declaration = this.parseMaybeAssign(), this.semicolon()), this.finishNode(t, "ExportDefaultDeclaration")
                    }
                    if (this.shouldParseExportStatement()) t.declaration = this.parseStatement(null), "VariableDeclaration" === t.declaration.type ? this.checkVariableExport(i, t.declaration.declarations) : this.checkExport(i, t.declaration.id.name, t.declaration.id.start), t.specifiers = [], t.source = null;
                    else {
                        if (t.declaration = null, t.specifiers = this.parseExportSpecifiers(i), this.eatContextual("from")) this.type !== g.types.string && this.unexpected(), t.source = this.parseExprAtom();
                        else {
                            for (var e = m(t.specifiers); !(r = e()).done;) {
                                var r = r.value;
                                this.checkUnreserved(r.local), this.checkLocalExport(r.local), "Literal" === r.local.type && this.raise(r.local.start, "A string literal cannot be used as an exported binding without `from`.")
                            }
                            t.source = null
                        }
                        this.semicolon()
                    }
                    return this.finishNode(t, "ExportNamedDeclaration")
                }, e.checkExport = function(e, t, i) {
                    e && ((0, x.hasOwn)(e, t) && this.raiseRecoverable(i, "Duplicate export '" + t + "'"), e[t] = !0)
                }, e.checkPatternExport = function(e, t) {
                    var i = t.type;
                    if ("Identifier" === i) this.checkExport(e, t.name, t.start);
                    else if ("ObjectPattern" === i)
                        for (var s = m(t.properties); !(r = s()).done;) {
                            var r = r.value;
                            this.checkPatternExport(e, r)
                        } else if ("ArrayPattern" === i)
                            for (var n = m(t.elements); !(a = n()).done;) {
                                var a = a.value;
                                a && this.checkPatternExport(e, a)
                            } else "Property" === i ? this.checkPatternExport(e, t.value) : "AssignmentPattern" === i ? this.checkPatternExport(e, t.left) : "RestElement" === i ? this.checkPatternExport(e, t.argument) : "ParenthesizedExpression" === i && this.checkPatternExport(e, t.expression)
                }, e.checkVariableExport = function(e, t) {
                    if (e)
                        for (var i = m(t); !(s = i()).done;) {
                            var s = s.value;
                            this.checkPatternExport(e, s.id)
                        }
                }, e.shouldParseExportStatement = function() {
                    return "var" === this.type.keyword || "const" === this.type.keyword || "class" === this.type.keyword || "function" === this.type.keyword || this.isLet() || this.isAsyncFunction()
                }, e.parseExportSpecifiers = function(e) {
                    let t = [],
                        i = !0;
                    for (this.expect(g.types.braceL); !this.eat(g.types.braceR);) {
                        if (i) i = !1;
                        else if (this.expect(g.types.comma), this.afterTrailingComma(g.types.braceR)) break;
                        var s = this.startNode();
                        s.local = this.parseModuleExportName(), s.exported = this.eatContextual("as") ? this.parseModuleExportName() : s.local, this.checkExport(e, s.exported["Identifier" === s.exported.type ? "name" : "value"], s.exported.start), t.push(this.finishNode(s, "ExportSpecifier"))
                    }
                    return t
                }, e.parseImport = function(e) {
                    return this.next(), this.type === g.types.string ? (e.specifiers = ge, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === g.types.string ? this.parseExprAtom() : this.unexpected()), this.semicolon(), this.finishNode(e, "ImportDeclaration")
                }, e.parseImportSpecifiers = function() {
                    let e = [],
                        t = !0;
                    if (this.type === g.types.name) {
                        var i = this.startNode();
                        if (i.local = this.parseIdent(), this.checkLValSimple(i.local, u.BIND_LEXICAL), e.push(this.finishNode(i, "ImportDefaultSpecifier")), !this.eat(g.types.comma)) return e
                    }
                    if (this.type === g.types.star) i = this.startNode(), this.next(), this.expectContextual("as"), i.local = this.parseIdent(), this.checkLValSimple(i.local, u.BIND_LEXICAL), e.push(this.finishNode(i, "ImportNamespaceSpecifier"));
                    else
                        for (this.expect(g.types.braceL); !this.eat(g.types.braceR);) {
                            if (t) t = !1;
                            else if (this.expect(g.types.comma), this.afterTrailingComma(g.types.braceR)) break;
                            var s = this.startNode();
                            s.imported = this.parseModuleExportName(), this.eatContextual("as") ? s.local = this.parseIdent() : (this.checkUnreserved(s.imported), s.local = s.imported), this.checkLValSimple(s.local, u.BIND_LEXICAL), e.push(this.finishNode(s, "ImportSpecifier"))
                        }
                    return e
                }, e.parseModuleExportName = function() {
                    var e;
                    return 13 <= this.options.ecmaVersion && this.type === g.types.string ? (e = this.parseLiteral(this.value), x.loneSurrogate.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e) : this.parseIdent(!0)
                }, e.adaptDirectivePrologue = function(t) {
                    for (let e = 0; e < t.length && this.isDirectiveCandidate(t[e]); ++e) t[e].directive = t[e].expression.raw.slice(1, -1)
                }, e.isDirectiveCandidate = function(e) {
                    return "ExpressionStatement" === e.type && "Literal" === e.expression.type && "string" == typeof e.expression.value && ('"' === this.input[e.start] || "'" === this.input[e.start])
                };
                var e = f.Parser.prototype,
                    _ = (e.toAssignable = function(e, t, i) {
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
                                for (var s = ve(e.properties); !(r = s()).done;) {
                                    var r = r.value;
                                    this.toAssignable(r, t), "RestElement" !== r.type || "ArrayPattern" !== r.argument.type && "ObjectPattern" !== r.argument.type || this.raise(r.argument.start, "Unexpected token")
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
                    }, e.toAssignableList = function(t, i) {
                        var e, s = t.length;
                        for (let e = 0; e < s; e++) {
                            var r = t[e];
                            r && this.toAssignable(r, i)
                        }
                        return s && (e = t[s - 1], 6 === this.options.ecmaVersion) && i && e && "RestElement" === e.type && "Identifier" !== e.argument.type && this.unexpected(e.argument.start), t
                    }, e.parseSpread = function(e) {
                        var t = this.startNode();
                        return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement")
                    }, e.parseRestBinding = function() {
                        var e = this.startNode();
                        return this.next(), 6 === this.options.ecmaVersion && this.type !== g.types.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement")
                    }, e.parseBindingAtom = function() {
                        if (6 <= this.options.ecmaVersion) switch (this.type) {
                            case g.types.bracketL:
                                var e = this.startNode();
                                return this.next(), e.elements = this.parseBindingList(g.types.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");
                            case g.types.braceL:
                                return this.parseObj(!0)
                        }
                        return this.parseIdent()
                    }, e.parseBindingList = function(e, t, i) {
                        let s = [],
                            r = !0;
                        for (; !this.eat(e);)
                            if (r ? r = !1 : this.expect(g.types.comma), t && this.type === g.types.comma) s.push(null);
                            else {
                                if (i && this.afterTrailingComma(e)) break;
                                if (this.type === g.types.ellipsis) {
                                    var n = this.parseRestBinding();
                                    this.parseBindingListItem(n), s.push(n), this.type === g.types.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.expect(e);
                                    break
                                }
                                n = this.parseMaybeDefault(this.start, this.startLoc);
                                this.parseBindingListItem(n), s.push(n)
                            } return s
                    }, e.parseBindingListItem = function(e) {
                        return e
                    }, e.parseMaybeDefault = function(e, t, i) {
                        return i = i || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(g.types.eq) ? i : ((e = this.startNodeAt(e, t)).left = i, e.right = this.parseMaybeAssign(), this.finishNode(e, "AssignmentPattern"))
                    }, e.checkLValSimple = function(e, t = u.BIND_NONE, i) {
                        var s = t !== u.BIND_NONE;
                        switch (e.type) {
                            case "Identifier":
                                this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (s ? "Binding " : "Assigning to ") + e.name + " in strict mode"), s && (t === u.BIND_LEXICAL && "let" === e.name && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), i && ((0, x.hasOwn)(i, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), i[e.name] = !0), t !== u.BIND_OUTSIDE) && this.declareName(e.name, t, e.start);
                                break;
                            case "ChainExpression":
                                this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
                                break;
                            case "MemberExpression":
                                s && this.raiseRecoverable(e.start, "Binding member expression");
                                break;
                            case "ParenthesizedExpression":
                                return s && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, i);
                            default:
                                this.raise(e.start, (s ? "Binding" : "Assigning to") + " rvalue")
                        }
                    }, e.checkLValPattern = function(e, t = u.BIND_NONE, i) {
                        switch (e.type) {
                            case "ObjectPattern":
                                for (var s = ve(e.properties); !(r = s()).done;) {
                                    var r = r.value;
                                    this.checkLValInnerPattern(r, t, i)
                                }
                                break;
                            case "ArrayPattern":
                                for (var n = ve(e.elements); !(a = n()).done;) {
                                    var a = a.value;
                                    a && this.checkLValInnerPattern(a, t, i)
                                }
                                break;
                            default:
                                this.checkLValSimple(e, t, i)
                        }
                    }, e.checkLValInnerPattern = function(e, t = u.BIND_NONE, i) {
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
                    }, r(function(e, t) {
                        t.__esModule = !0, t.types = t.TokContext = void 0;
                        class i {
                            constructor(e, t, i, s, r) {
                                this.token = e, this.isExpr = !!t, this.preserveSpace = !!i, this.override = s, this.generator = !!r
                            }
                        }
                        let s = {
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
                        t.types = s;
                        t = f.Parser.prototype;
                        t.initialContext = function() {
                            return [s.b_stat]
                        }, t.curContext = function() {
                            return this.context[this.context.length - 1]
                        }, t.braceIsBlock = function(e) {
                            var t = this.curContext();
                            return t === s.f_expr || t === s.f_stat || (e !== g.types.colon || t !== s.b_stat && t !== s.b_expr ? e === g.types._return || e === g.types.name && this.exprAllowed ? p.lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) : e === g.types._else || e === g.types.semi || e === g.types.eof || e === g.types.parenR || e === g.types.arrow || (e === g.types.braceL ? t === s.b_stat : e !== g.types._var && e !== g.types._const && e !== g.types.name && !this.exprAllowed) : !t.isExpr)
                        }, t.inGeneratorContext = function() {
                            for (let e = this.context.length - 1; 1 <= e; e--) {
                                var t = this.context[e];
                                if ("function" === t.token) return t.generator
                            }
                            return !1
                        }, t.updateContext = function(e) {
                            var t, i = this.type;
                            i.keyword && e === g.types.dot ? this.exprAllowed = !1 : (t = i.updateContext) ? t.call(this, e) : this.exprAllowed = i.beforeExpr
                        }, t.overrideContext = function(e) {
                            this.curContext() !== e && (this.context[this.context.length - 1] = e)
                        }, g.types.parenR.updateContext = g.types.braceR.updateContext = function() {
                            if (1 === this.context.length) this.exprAllowed = !0;
                            else {
                                let e = this.context.pop();
                                e === s.b_stat && "function" === this.curContext().token && (e = this.context.pop()), this.exprAllowed = !e.isExpr
                            }
                        }, g.types.braceL.updateContext = function(e) {
                            this.context.push(this.braceIsBlock(e) ? s.b_stat : s.b_expr), this.exprAllowed = !0
                        }, g.types.dollarBraceL.updateContext = function() {
                            this.context.push(s.b_tmpl), this.exprAllowed = !0
                        }, g.types.parenL.updateContext = function(e) {
                            e = e === g.types._if || e === g.types._for || e === g.types._with || e === g.types._while;
                            this.context.push(e ? s.p_stat : s.p_expr), this.exprAllowed = !0
                        }, g.types.incDec.updateContext = function() {}, g.types._function.updateContext = g.types._class.updateContext = function(e) {
                            !e.beforeExpr || e === g.types._else || e === g.types.semi && this.curContext() !== s.p_stat || e === g.types._return && p.lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) || (e === g.types.colon || e === g.types.braceL) && this.curContext() === s.b_stat ? this.context.push(s.f_stat) : this.context.push(s.f_expr), this.exprAllowed = !1
                        }, g.types.backQuote.updateContext = function() {
                            this.curContext() === s.q_tmpl ? this.context.pop() : this.context.push(s.q_tmpl), this.exprAllowed = !1
                        }, g.types.star.updateContext = function(e) {
                            e === g.types._function && (e = this.context.length - 1, this.context[e] === s.f_expr ? this.context[e] = s.f_expr_gen : this.context[e] = s.f_gen), this.exprAllowed = !0
                        }, g.types.name.updateContext = function(e) {
                            let t = !1;
                            6 <= this.options.ecmaVersion && e !== g.types.dot && ("of" === this.value && !this.exprAllowed || "yield" === this.value && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t
                        }
                    }));

                function _e(e, t) {
                    var i, s = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (s) return (s = s.call(e)).next.bind(s);
                    if (Array.isArray(e) || (s = function(e, t) {
                            {
                                var i;
                                if (e) return "string" == typeof e ? we(e, t) : "Map" === (i = "Object" === (i = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : i) || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? we(e, t) : void 0
                            }
                        }(e)) || t && e && "number" == typeof e.length) return s && (e = s), i = 0,
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

                function we(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var i = 0, s = Array(t); i < t; i++) s[i] = e[i];
                    return s
                }
                e = f.Parser.prototype;
                e.checkPropClash = function(s, r, e) {
                    if (!(9 <= this.options.ecmaVersion && "SpreadElement" === s.type || 6 <= this.options.ecmaVersion && (s.computed || s.method || s.shorthand))) {
                        let t = s.key,
                            i;
                        switch (t.type) {
                            case "Identifier":
                                i = t.name;
                                break;
                            case "Literal":
                                i = String(t.value);
                                break;
                            default:
                                return
                        }
                        s = s.kind;
                        if (6 <= this.options.ecmaVersion) "__proto__" === i && "init" === s && (r.proto && (e ? e.doubleProto < 0 && (e.doubleProto = t.start) : this.raiseRecoverable(t.start, "Redefinition of __proto__ property")), r.proto = !0);
                        else {
                            let e = r[i = "$" + i];
                            e ? ("init" === s ? this.strict && e.init || e.get || e.set : e.init || e[s]) && this.raiseRecoverable(t.start, "Redefinition of property") : e = r[i] = {
                                init: !1,
                                get: !1,
                                set: !1
                            }, e[s] = !0
                        }
                    }
                }, e.parseExpression = function(e, t) {
                    var i = this.start,
                        s = this.startLoc,
                        r = this.parseMaybeAssign(e, t);
                    if (this.type !== g.types.comma) return r;
                    var n = this.startNodeAt(i, s);
                    for (n.expressions = [r]; this.eat(g.types.comma);) n.expressions.push(this.parseMaybeAssign(e, t));
                    return this.finishNode(n, "SequenceExpression")
                }, e.parseMaybeAssign = function(e, t, i) {
                    if (this.isContextual("yield")) {
                        if (this.inGenerator) return this.parseYield(e);
                        this.exprAllowed = !1
                    }
                    let s = !1,
                        r = -1,
                        n = -1,
                        a = -1;
                    t ? (r = t.parenthesizedAssign, n = t.trailingComma, a = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new v.DestructuringErrors, s = !0);
                    var o = this.start,
                        c = this.startLoc;
                    this.type !== g.types.parenL && this.type !== g.types.name || (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = "await" === e);
                    let l = this.parseMaybeConditional(e, t);
                    return i && (l = i.call(this, l, o, c)), this.type.isAssign ? ((i = this.startNodeAt(o, c)).operator = this.value, this.type === g.types.eq && (l = this.toAssignable(l, !1, t)), s || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= l.start && (t.shorthandAssign = -1), this.type === g.types.eq ? this.checkLValPattern(l) : this.checkLValSimple(l), i.left = l, this.next(), i.right = this.parseMaybeAssign(e), -1 < a && (t.doubleProto = a), this.finishNode(i, "AssignmentExpression")) : (s && this.checkExpressionErrors(t, !0), -1 < r && (t.parenthesizedAssign = r), -1 < n && (t.trailingComma = n), l)
                }, e.parseMaybeConditional = function(e, t) {
                    var i = this.start,
                        s = this.startLoc,
                        r = this.parseExprOps(e, t);
                    return !this.checkExpressionErrors(t) && this.eat(g.types.question) ? ((t = this.startNodeAt(i, s)).test = r, t.consequent = this.parseMaybeAssign(), this.expect(g.types.colon), t.alternate = this.parseMaybeAssign(e), this.finishNode(t, "ConditionalExpression")) : r
                }, e.parseExprOps = function(e, t) {
                    var i = this.start,
                        s = this.startLoc,
                        r = this.parseMaybeUnary(t, !1, !1, e);
                    return this.checkExpressionErrors(t) || r.start === i && "ArrowFunctionExpression" === r.type ? r : this.parseExprOp(r, i, s, -1, e)
                }, e.parseExprOp = function(e, t, i, s, r) {
                    let n = this.type.binop;
                    var a, o, c, l, p;
                    return null != n && (!r || this.type !== g.types._in) && n > s ? (a = this.type === g.types.logicalOR || this.type === g.types.logicalAND, (o = this.type === g.types.coalesce) && (n = g.types.logicalAND.binop), c = this.value, this.next(), l = this.start, p = this.startLoc, l = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, r), l, p, n, r), p = this.buildBinary(t, i, e, l, c, a || o), (a && this.type === g.types.coalesce || o && (this.type === g.types.logicalOR || this.type === g.types.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(p, t, i, s, r)) : e
                }, e.buildBinary = function(e, t, i, s, r, n) {
                    "PrivateIdentifier" === s.type && this.raise(s.start, "Private identifier can only be left side of binary expression");
                    e = this.startNodeAt(e, t);
                    return e.left = i, e.operator = r, e.right = s, this.finishNode(e, n ? "LogicalExpression" : "BinaryExpression")
                }, e.parseMaybeUnary = function(e, t, i, s) {
                    let r = this.start,
                        n = this.startLoc,
                        a;
                    if (this.isContextual("await") && this.canAwait) a = this.parseAwait(s), t = !0;
                    else if (this.type.prefix) {
                        var o = this.startNode(),
                            c = this.type === g.types.incDec;
                        o.operator = this.value, o.prefix = !0, this.next(), o.argument = this.parseMaybeUnary(null, !0, c, s), this.checkExpressionErrors(e, !0), c ? this.checkLValSimple(o.argument) : this.strict && "delete" === o.operator && "Identifier" === o.argument.type ? this.raiseRecoverable(o.start, "Deleting local variable in strict mode") : "delete" === o.operator && function p(e) {
                            return "MemberExpression" === e.type && "PrivateIdentifier" === e.property.type || "ChainExpression" === e.type && p(e.expression)
                        }(o.argument) ? this.raiseRecoverable(o.start, "Private fields can not be deleted") : t = !0, a = this.finishNode(o, c ? "UpdateExpression" : "UnaryExpression")
                    } else if (t || this.type !== g.types.privateId) {
                        if (a = this.parseExprSubscripts(e, s), this.checkExpressionErrors(e)) return a;
                        for (; this.type.postfix && !this.canInsertSemicolon();) {
                            var l = this.startNodeAt(r, n);
                            l.operator = this.value, l.prefix = !1, l.argument = a, this.checkLValSimple(a), this.next(), a = this.finishNode(l, "UpdateExpression")
                        }
                    } else !s && 0 !== this.privateNameStack.length || this.unexpected(), a = this.parsePrivateIdent(), this.type !== g.types._in && this.unexpected();
                    return !i && this.eat(g.types.starstar) ? t ? void this.unexpected(this.lastTokStart) : this.buildBinary(r, n, a, this.parseMaybeUnary(null, !1, !1, s), "**", !1) : a
                }, e.parseExprSubscripts = function(e, t) {
                    var i = this.start,
                        s = this.startLoc,
                        r = this.parseExprAtom(e, t);
                    return "ArrowFunctionExpression" === r.type && ")" !== this.input.slice(this.lastTokStart, this.lastTokEnd) || (r = this.parseSubscripts(r, i, s, !1, t), e && "MemberExpression" === r.type && (e.parenthesizedAssign >= r.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= r.start && (e.parenthesizedBind = -1), e.trailingComma >= r.start) && (e.trailingComma = -1)), r
                }, e.parseSubscripts = function(t, i, s, r, n) {
                    let a = 8 <= this.options.ecmaVersion && "Identifier" === t.type && "async" === t.name && this.lastTokEnd === t.end && !this.canInsertSemicolon() && t.end - t.start == 5 && this.potentialArrowAt === t.start,
                        o = !1;
                    for (;;) {
                        let e = this.parseSubscript(t, i, s, r, a, o, n);
                        var c;
                        if (e.optional && (o = !0), e === t || "ArrowFunctionExpression" === e.type) return o && ((c = this.startNodeAt(i, s)).expression = e, e = this.finishNode(c, "ChainExpression")), e;
                        t = e
                    }
                }, e.parseSubscript = function(e, t, i, s, r, n, a) {
                    var o = 11 <= this.options.ecmaVersion,
                        c = o && this.eat(g.types.questionDot),
                        l = (s && c && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions"), this.eat(g.types.bracketL));
                    if (l || c && this.type !== g.types.parenL && this.type !== g.types.backQuote || this.eat(g.types.dot)) {
                        var p = this.startNodeAt(t, i);
                        p.object = e, l ? (p.property = this.parseExpression(), this.expect(g.types.bracketR)) : this.type === g.types.privateId && "Super" !== e.type ? p.property = this.parsePrivateIdent() : p.property = this.parseIdent("never" !== this.options.allowReserved), p.computed = !!l, o && (p.optional = c || p.object.optional), e = this.finishNode(p, "MemberExpression")
                    } else if (!s && this.eat(g.types.parenL)) {
                        var l = new v.DestructuringErrors,
                            p = this.yieldPos,
                            s = this.awaitPos,
                            h = this.awaitIdentPos,
                            u = (this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.parseExprList(g.types.parenR, 8 <= this.options.ecmaVersion, !1, l));
                        if (r && !c && !this.canInsertSemicolon() && this.eat(g.types.arrow)) return this.checkPatternErrors(l, !1), this.checkYieldAwaitInDefaultParams(), 0 < this.awaitIdentPos && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = p, this.awaitPos = s, this.awaitIdentPos = h, this.parseArrowExpression(this.startNodeAt(t, i), u, !0, a);
                        this.checkExpressionErrors(l, !0), this.yieldPos = p || this.yieldPos, this.awaitPos = s || this.awaitPos, this.awaitIdentPos = h || this.awaitIdentPos;
                        r = this.startNodeAt(t, i);
                        r.callee = e, r.arguments = u, o && (r.optional = c), e = this.finishNode(r, "CallExpression")
                    } else this.type === g.types.backQuote && ((c || n) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions"), (a = this.startNodeAt(t, i)).tag = e, a.quasi = this.parseTemplate({
                        isTagged: !0
                    }), e = this.finishNode(a, "TaggedTemplateExpression"));
                    return e
                }, e.parseExprAtom = function(r, n) {
                    this.type === g.types.slash && this.readRegexp();
                    let a, o = this.potentialArrowAt === this.start;
                    switch (this.type) {
                        case g.types._super:
                            return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), a = this.startNode(), this.next(), this.type !== g.types.parenL || this.allowDirectSuper || this.raise(a.start, "super() call outside constructor of a subclass"), this.type !== g.types.dot && this.type !== g.types.bracketL && this.type !== g.types.parenL && this.unexpected(), this.finishNode(a, "Super");
                        case g.types._this:
                            return a = this.startNode(), this.next(), this.finishNode(a, "ThisExpression");
                        case g.types.name:
                            let e = this.start,
                                t = this.startLoc,
                                i = this.containsEsc,
                                s = this.parseIdent(!1);
                            if (8 <= this.options.ecmaVersion && !i && "async" === s.name && !this.canInsertSemicolon() && this.eat(g.types._function)) return this.overrideContext(_.types.f_expr), this.parseFunction(this.startNodeAt(e, t), 0, !1, !0, n);
                            if (o && !this.canInsertSemicolon()) {
                                if (this.eat(g.types.arrow)) return this.parseArrowExpression(this.startNodeAt(e, t), [s], !1, n);
                                if (8 <= this.options.ecmaVersion && "async" === s.name && this.type === g.types.name && !i && (!this.potentialArrowInForAwait || "of" !== this.value || this.containsEsc)) return s = this.parseIdent(!1), !this.canInsertSemicolon() && this.eat(g.types.arrow) || this.unexpected(), this.parseArrowExpression(this.startNodeAt(e, t), [s], !0, n)
                            }
                            return s;
                        case g.types.regexp:
                            var c = this.value;
                            return (a = this.parseLiteral(c.value)).regex = {
                                pattern: c.pattern,
                                flags: c.flags
                            }, a;
                        case g.types.num:
                        case g.types.string:
                            return this.parseLiteral(this.value);
                        case g.types._null:
                        case g.types._true:
                        case g.types._false:
                            return (a = this.startNode()).value = this.type === g.types._null ? null : this.type === g.types._true, a.raw = this.type.keyword, this.next(), this.finishNode(a, "Literal");
                        case g.types.parenL:
                            var c = this.start,
                                l = this.parseParenAndDistinguishExpression(o, n);
                            return r && (r.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(l) && (r.parenthesizedAssign = c), r.parenthesizedBind < 0) && (r.parenthesizedBind = c), l;
                        case g.types.bracketL:
                            return a = this.startNode(), this.next(), a.elements = this.parseExprList(g.types.bracketR, !0, !0, r), this.finishNode(a, "ArrayExpression");
                        case g.types.braceL:
                            return this.overrideContext(_.types.b_expr), this.parseObj(!1, r);
                        case g.types._function:
                            return a = this.startNode(), this.next(), this.parseFunction(a, 0);
                        case g.types._class:
                            return this.parseClass(this.startNode(), !1);
                        case g.types._new:
                            return this.parseNew();
                        case g.types.backQuote:
                            return this.parseTemplate();
                        case g.types._import:
                            return 11 <= this.options.ecmaVersion ? this.parseExprImport() : this.unexpected();
                        default:
                            this.unexpected()
                    }
                }, e.parseExprImport = function() {
                    var e = this.startNode(),
                        t = (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.parseIdent(!0));
                    switch (this.type) {
                        case g.types.parenL:
                            return this.parseDynamicImport(e);
                        case g.types.dot:
                            return e.meta = t, this.parseImportMeta(e);
                        default:
                            this.unexpected()
                    }
                }, e.parseDynamicImport = function(e) {
                    var t;
                    return this.next(), e.source = this.parseMaybeAssign(), this.eat(g.types.parenR) || (t = this.start, this.eat(g.types.comma) && this.eat(g.types.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t)), this.finishNode(e, "ImportExpression")
                }, e.parseImportMeta = function(e) {
                    this.next();
                    var t = this.containsEsc;
                    return e.property = this.parseIdent(!0), "meta" !== e.property.name && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), "module" === this.options.sourceType || this.options.allowImportExportEverywhere || this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty")
                }, e.parseLiteral = function(e) {
                    var t = this.startNode();
                    return t.value = e, t.raw = this.input.slice(this.start, this.end), 110 === t.raw.charCodeAt(t.raw.length - 1) && (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(t, "Literal")
                }, e.parseParenExpression = function() {
                    this.expect(g.types.parenL);
                    var e = this.parseExpression();
                    return this.expect(g.types.parenR), e
                }, e.parseParenAndDistinguishExpression = function(l, p) {
                    let h = this.start,
                        u = this.startLoc,
                        d, f = 8 <= this.options.ecmaVersion;
                    if (6 <= this.options.ecmaVersion) {
                        this.next();
                        let e = this.start,
                            t = this.startLoc,
                            i = [],
                            s = !0,
                            r = !1,
                            n = new v.DestructuringErrors,
                            a = this.yieldPos,
                            o = this.awaitPos,
                            c;
                        for (this.yieldPos = 0, this.awaitPos = 0; this.type !== g.types.parenR;) {
                            if (s ? s = !1 : this.expect(g.types.comma), f && this.afterTrailingComma(g.types.parenR, !0)) {
                                r = !0;
                                break
                            }
                            if (this.type === g.types.ellipsis) {
                                c = this.start, i.push(this.parseParenItem(this.parseRestBinding())), this.type === g.types.comma && this.raise(this.start, "Comma is not permitted after the rest element");
                                break
                            }
                            i.push(this.parseMaybeAssign(!1, n, this.parseParenItem))
                        }
                        var m = this.lastTokEnd,
                            y = this.lastTokEndLoc;
                        if (this.expect(g.types.parenR), l && !this.canInsertSemicolon() && this.eat(g.types.arrow)) return this.checkPatternErrors(n, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = a, this.awaitPos = o, this.parseParenArrowList(h, u, i, p);
                        i.length && !r || this.unexpected(this.lastTokStart), c && this.unexpected(c), this.checkExpressionErrors(n, !0), this.yieldPos = a || this.yieldPos, this.awaitPos = o || this.awaitPos, 1 < i.length ? ((d = this.startNodeAt(e, t)).expressions = i, this.finishNodeAt(d, "SequenceExpression", m, y)) : d = i[0]
                    } else d = this.parseParenExpression();
                    return this.options.preserveParens ? ((l = this.startNodeAt(h, u)).expression = d, this.finishNode(l, "ParenthesizedExpression")) : d
                }, e.parseParenItem = function(e) {
                    return e
                }, e.parseParenArrowList = function(e, t, i, s) {
                    return this.parseArrowExpression(this.startNodeAt(e, t), i, !1, s)
                };
                let Se = [];
                e.parseNew = function() {
                    this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
                    var e, t, i = this.startNode(),
                        s = this.parseIdent(!0);
                    return 6 <= this.options.ecmaVersion && this.eat(g.types.dot) ? (i.meta = s, s = this.containsEsc, i.property = this.parseIdent(!0), "target" !== i.property.name && this.raiseRecoverable(i.property.start, "The only valid meta property for new is 'new.target'"), s && this.raiseRecoverable(i.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(i.start, "'new.target' can only be used in functions and class static block"), this.finishNode(i, "MetaProperty")) : (s = this.start, e = this.startLoc, t = this.type === g.types._import, i.callee = this.parseSubscripts(this.parseExprAtom(), s, e, !0, !1), t && "ImportExpression" === i.callee.type && this.raise(s, "Cannot use new with import()"), this.eat(g.types.parenL) ? i.arguments = this.parseExprList(g.types.parenR, 8 <= this.options.ecmaVersion, !1) : i.arguments = Se, this.finishNode(i, "NewExpression"))
                }, e.parseTemplateElement = function({
                    isTagged: e
                }) {
                    var t = this.startNode();
                    return this.type === g.types.invalidTemplate ? (e || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), t.value = {
                        raw: this.value,
                        cooked: null
                    }) : t.value = {
                        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
                        cooked: this.value
                    }, this.next(), t.tail = this.type === g.types.backQuote, this.finishNode(t, "TemplateElement")
                }, e.parseTemplate = function({
                    isTagged: e = !1
                } = {}) {
                    var t = this.startNode();
                    this.next(), t.expressions = [];
                    let i = this.parseTemplateElement({
                        isTagged: e
                    });
                    for (t.quasis = [i]; !i.tail;) this.type === g.types.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(g.types.dollarBraceL), t.expressions.push(this.parseExpression()), this.expect(g.types.braceR), t.quasis.push(i = this.parseTemplateElement({
                        isTagged: e
                    }));
                    return this.next(), this.finishNode(t, "TemplateLiteral")
                }, e.isAsyncProp = function(e) {
                    return !e.computed && "Identifier" === e.key.type && "async" === e.key.name && (this.type === g.types.name || this.type === g.types.num || this.type === g.types.string || this.type === g.types.bracketL || this.type.keyword || 9 <= this.options.ecmaVersion && this.type === g.types.star) && !p.lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
                }, e.parseObj = function(e, t) {
                    let i = this.startNode(),
                        s = !0,
                        r = {};
                    for (i.properties = [], this.next(); !this.eat(g.types.braceR);) {
                        if (s) s = !1;
                        else if (this.expect(g.types.comma), 5 <= this.options.ecmaVersion && this.afterTrailingComma(g.types.braceR)) break;
                        var n = this.parseProperty(e, t);
                        e || this.checkPropClash(n, r, t), i.properties.push(n)
                    }
                    return this.finishNode(i, e ? "ObjectPattern" : "ObjectExpression")
                }, e.parseProperty = function(e, t) {
                    let i = this.startNode(),
                        s, r, n, a;
                    if (9 <= this.options.ecmaVersion && this.eat(g.types.ellipsis)) return e ? (i.argument = this.parseIdent(!1), this.type === g.types.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.finishNode(i, "RestElement")) : (this.type === g.types.parenL && t && (t.parenthesizedAssign < 0 && (t.parenthesizedAssign = this.start), t.parenthesizedBind < 0) && (t.parenthesizedBind = this.start), i.argument = this.parseMaybeAssign(!1, t), this.type === g.types.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(i, "SpreadElement"));
                    6 <= this.options.ecmaVersion && (i.method = !1, i.shorthand = !1, (e || t) && (n = this.start, a = this.startLoc), e || (s = this.eat(g.types.star)));
                    var o = this.containsEsc;
                    return this.parsePropertyName(i), !e && !o && 8 <= this.options.ecmaVersion && !s && this.isAsyncProp(i) ? (r = !0, s = 9 <= this.options.ecmaVersion && this.eat(g.types.star), this.parsePropertyName(i, t)) : r = !1, this.parsePropertyValue(i, e, s, r, n, a, t, o), this.finishNode(i, "Property")
                }, e.parsePropertyValue = function(e, t, i, s, r, n, a, o) {
                    (i || s) && this.type === g.types.colon && this.unexpected(), this.eat(g.types.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, a), e.kind = "init") : 6 <= this.options.ecmaVersion && this.type === g.types.parenL ? (t && this.unexpected(), e.kind = "init", e.method = !0, e.value = this.parseMethod(i, s)) : t || o || !(5 <= this.options.ecmaVersion) || e.computed || "Identifier" !== e.key.type || "get" !== e.key.name && "set" !== e.key.name || this.type === g.types.comma || this.type === g.types.braceR || this.type === g.types.eq ? 6 <= this.options.ecmaVersion && !e.computed && "Identifier" === e.key.type ? ((i || s) && this.unexpected(), this.checkUnreserved(e.key), "await" !== e.key.name || this.awaitIdentPos || (this.awaitIdentPos = r), e.kind = "init", t ? e.value = this.parseMaybeDefault(r, n, this.copyNode(e.key)) : this.type === g.types.eq && a ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start), e.value = this.parseMaybeDefault(r, n, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.shorthand = !0) : this.unexpected() : ((i || s) && this.unexpected(), e.kind = e.key.name, this.parsePropertyName(e), e.value = this.parseMethod(!1), o = "get" === e.kind ? 0 : 1, e.value.params.length !== o ? (t = e.value.start, "get" === e.kind ? this.raiseRecoverable(t, "getter should have no params") : this.raiseRecoverable(t, "setter should have exactly one param")) : "set" === e.kind && "RestElement" === e.value.params[0].type && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params"))
                }, e.parsePropertyName = function(e) {
                    if (6 <= this.options.ecmaVersion) {
                        if (this.eat(g.types.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(g.types.bracketR), e.key;
                        e.computed = !1
                    }
                    return e.key = this.type === g.types.num || this.type === g.types.string ? this.parseExprAtom() : this.parseIdent("never" !== this.options.allowReserved)
                }, e.initFunction = function(e) {
                    e.id = null, 6 <= this.options.ecmaVersion && (e.generator = e.expression = !1), 8 <= this.options.ecmaVersion && (e["async"] = !1)
                }, e.parseMethod = function(e, t, i) {
                    var s = this.startNode(),
                        r = this.yieldPos,
                        n = this.awaitPos,
                        a = this.awaitIdentPos;
                    return this.initFunction(s), 6 <= this.options.ecmaVersion && (s.generator = e), 8 <= this.options.ecmaVersion && (s["async"] = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope((0, u.functionFlags)(t, s.generator) | u.SCOPE_SUPER | (i ? u.SCOPE_DIRECT_SUPER : 0)), this.expect(g.types.parenL), s.params = this.parseBindingList(g.types.parenR, !1, 8 <= this.options.ecmaVersion), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(s, !1, !0, !1), this.yieldPos = r, this.awaitPos = n, this.awaitIdentPos = a, this.finishNode(s, "FunctionExpression")
                }, e.parseArrowExpression = function(e, t, i, s) {
                    var r = this.yieldPos,
                        n = this.awaitPos,
                        a = this.awaitIdentPos;
                    return this.enterScope((0, u.functionFlags)(i, !1) | u.SCOPE_ARROW), this.initFunction(e), 8 <= this.options.ecmaVersion && (e["async"] = !!i), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, s), this.yieldPos = r, this.awaitPos = n, this.awaitIdentPos = a, this.finishNode(e, "ArrowFunctionExpression")
                }, e.parseFunctionBody = function(e, t, i, s) {
                    let r = t && this.type !== g.types.braceL,
                        n = this.strict,
                        a = !1;
                    r ? (e.body = this.parseMaybeAssign(s), e.expression = !0, this.checkParams(e, !1)) : (s = 7 <= this.options.ecmaVersion && !this.isSimpleParamList(e.params), (!n || s) && (a = this.strictDirective(this.end)) && s && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"), s = this.labels, this.labels = [], a && (this.strict = !0), this.checkParams(e, !n && !a && !t && !i && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, u.BIND_OUTSIDE), e.body = this.parseBlock(!1, void 0, a && !n), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = s), this.exitScope()
                }, e.isSimpleParamList = function(e) {
                    for (var t, i = _e(e); !(t = i()).done;)
                        if ("Identifier" !== t.value.type) return !1;
                    return !0
                }, e.checkParams = function(e, t) {
                    for (var i = Object.create(null), s = _e(e.params); !(r = s()).done;) {
                        var r = r.value;
                        this.checkLValInnerPattern(r, u.BIND_VAR, t ? null : i)
                    }
                }, e.parseExprList = function(t, i, s, r) {
                    let n = [],
                        a = !0;
                    for (; !this.eat(t);) {
                        if (a) a = !1;
                        else if (this.expect(g.types.comma), i && this.afterTrailingComma(t)) break;
                        let e;
                        s && this.type === g.types.comma ? e = null : this.type === g.types.ellipsis ? (e = this.parseSpread(r), r && this.type === g.types.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : e = this.parseMaybeAssign(!1, r), n.push(e)
                    }
                    return n
                }, e.checkUnreserved = function({
                    start: e,
                    end: t,
                    name: i
                }) {
                    this.inGenerator && "yield" === i && this.raiseRecoverable(e, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && "await" === i && this.raiseRecoverable(e, "Cannot use 'await' as identifier inside an async function"), this.currentThisScope().inClassFieldInit && "arguments" === i && this.raiseRecoverable(e, "Cannot use 'arguments' in class field initializer"), !this.inClassStaticBlock || "arguments" !== i && "await" !== i || this.raise(e, `Cannot use ${i} in class static initialization block`), this.keywords.test(i) && this.raise(e, `Unexpected keyword '${i}'`), this.options.ecmaVersion < 6 && -1 !== this.input.slice(e, t).indexOf("\\") || (this.strict ? this.reservedWordsStrict : this.reservedWords).test(i) && (this.inAsync || "await" !== i || this.raiseRecoverable(e, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(e, `The keyword '${i}' is reserved`))
                }, e.parseIdent = function(e, t) {
                    var i = this.startNode();
                    return this.type === g.types.name ? i.name = this.value : this.type.keyword ? (i.name = this.type.keyword, "class" !== i.name && "function" !== i.name || this.lastTokEnd === this.lastTokStart + 1 && 46 === this.input.charCodeAt(this.lastTokStart) || this.context.pop()) : this.unexpected(), this.next(!!e), this.finishNode(i, "Identifier"), e || (this.checkUnreserved(i), "await" !== i.name) || this.awaitIdentPos || (this.awaitIdentPos = i.start), i
                }, e.parsePrivateIdent = function() {
                    var e = this.startNode();
                    return this.type === g.types.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), 0 === this.privateNameStack.length ? this.raise(e.start, `Private field '#${e.name}' must be declared in an enclosing class`) : this.privateNameStack[this.privateNameStack.length - 1].used.push(e), e
                }, e.parseYield = function(e) {
                    this.yieldPos || (this.yieldPos = this.start);
                    var t = this.startNode();
                    return this.next(), this.type === g.types.semi || this.canInsertSemicolon() || this.type !== g.types.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(g.types.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression")
                }, e.parseAwait = function(e) {
                    this.awaitPos || (this.awaitPos = this.start);
                    var t = this.startNode();
                    return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, "AwaitExpression")
                };
                e = f.Parser.prototype, e.raise = function(e, t) {
                    var i = (0, h.getLineInfo)(this.input, e),
                        t = SyntaxError(t += " (" + i.line + ":" + i.column + ")");
                    throw t.pos = e, t.loc = i, t.raisedAt = this.pos, t
                }, e.raiseRecoverable = e.raise, e.curPosition = function() {
                    if (this.options.locations) return new h.Position(this.curLine, this.pos - this.lineStart)
                }, e = f.Parser.prototype;
                class ke {
                    constructor(e) {
                        this.flags = e, this["var"] = [], this.lexical = [], this.functions = [], this.inClassFieldInit = !1
                    }
                }
                e.enterScope = function(e) {
                    this.scopeStack.push(new ke(e))
                }, e.exitScope = function() {
                    this.scopeStack.pop()
                }, e.treatFunctionsAsVarInScope = function(e) {
                    return e.flags & u.SCOPE_FUNCTION || !this.inModule && e.flags & u.SCOPE_TOP
                }, e.declareName = function(t, e, i) {
                    let s = !1;
                    if (e === u.BIND_LEXICAL) {
                        var r = this.currentScope();
                        s = -1 < r.lexical.indexOf(t) || -1 < r.functions.indexOf(t) || -1 < r["var"].indexOf(t), r.lexical.push(t), this.inModule && r.flags & u.SCOPE_TOP && delete this.undefinedExports[t]
                    } else if (e === u.BIND_SIMPLE_CATCH) this.currentScope().lexical.push(t);
                    else if (e === u.BIND_FUNCTION) {
                        r = this.currentScope();
                        s = this.treatFunctionsAsVar ? -1 < r.lexical.indexOf(t) : -1 < r.lexical.indexOf(t) || -1 < r["var"].indexOf(t), r.functions.push(t)
                    } else
                        for (let e = this.scopeStack.length - 1; 0 <= e; --e) {
                            var n = this.scopeStack[e];
                            if (-1 < n.lexical.indexOf(t) && !(n.flags & u.SCOPE_SIMPLE_CATCH && n.lexical[0] === t) || !this.treatFunctionsAsVarInScope(n) && -1 < n.functions.indexOf(t)) {
                                s = !0;
                                break
                            }
                            if (n["var"].push(t), this.inModule && n.flags & u.SCOPE_TOP && delete this.undefinedExports[t], n.flags & u.SCOPE_VAR) break
                        }
                    s && this.raiseRecoverable(i, `Identifier '${t}' has already been declared`)
                }, e.checkLocalExport = function(e) {
                    -1 === this.scopeStack[0].lexical.indexOf(e.name) && -1 === this.scopeStack[0]["var"].indexOf(e.name) && (this.undefinedExports[e.name] = e)
                }, e.currentScope = function() {
                    return this.scopeStack[this.scopeStack.length - 1]
                }, e.currentVarScope = function() {
                    for (let e = this.scopeStack.length - 1;; e--) {
                        var t = this.scopeStack[e];
                        if (t.flags & u.SCOPE_VAR) return t
                    }
                }, e.currentThisScope = function() {
                    for (let e = this.scopeStack.length - 1;; e--) {
                        var t = this.scopeStack[e];
                        if (t.flags & u.SCOPE_VAR && !(t.flags & u.SCOPE_ARROW)) return t
                    }
                };
                var Ee = r(function(e, t) {
                        t.__esModule = !0, t.Node = void 0;
                        class s {
                            constructor(e, t, i) {
                                this.type = "", this.start = t, this.end = 0, e.options.locations && (this.loc = new h.SourceLocation(e, i)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0])
                            }
                        }
                        t.Node = s;
                        t = f.Parser.prototype;

                        function r(e, t, i, s) {
                            return e.type = t, e.end = i, this.options.locations && (e.loc.end = s), this.options.ranges && (e.range[1] = i), e
                        }
                        t.startNode = function() {
                            return new s(this, this.start, this.startLoc)
                        }, t.startNodeAt = function(e, t) {
                            return new s(this, e, t)
                        }, t.finishNode = function(e, t) {
                            return r.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc)
                        }, t.finishNodeAt = function(e, t, i, s) {
                            return r.call(this, e, t, i, s)
                        }, t.copyNode = function(e) {
                            var t, i = new s(this, e.start, this.startLoc);
                            for (t in e) i[t] = e[t];
                            return i
                        }
                    }),
                    w = r(function(e, t) {
                        t.__esModule = !0, t["default"] = void 0;
                        let i = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",
                            s = i + " Extended_Pictographic",
                            r = s,
                            n = r + " EBase EComp EMod EPres ExtPict",
                            a = {
                                9: i,
                                10: s,
                                11: r,
                                12: n,
                                13: n
                            },
                            o = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",
                            c = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",
                            l = c + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",
                            p = l + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",
                            h = p + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",
                            u = {
                                9: c,
                                10: l,
                                11: p,
                                12: h,
                                13: h + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith"
                            },
                            d = {};
                        for (var f, m = 0, y = [9, 10, 11, 12, 13]; m < y.length; m++) f = y[m], (f = d[f] = {
                            binary: (0, x.wordsRegexp)(a[f] + " " + o),
                            nonBinary: {
                                General_Category: (0, x.wordsRegexp)(o),
                                Script: (0, x.wordsRegexp)(u[f])
                            }
                        }).nonBinary.Script_Extensions = f.nonBinary.Script, f.nonBinary.gc = f.nonBinary.General_Category, f.nonBinary.sc = f.nonBinary.Script, f.nonBinary.scx = f.nonBinary.Script_Extensions;
                        t["default"] = d, e.exports = t["default"]
                    }),
                    Ce = r(function(e, t) {
                        t.__esModule = !0, t.RegExpValidationState = void 0;
                        var i = w && w.__esModule ? w : {
                            "default": w
                        };

                        function n(e, t) {
                            (null == t || t > e.length) && (t = e.length);
                            for (var i = 0, s = Array(t); i < t; i++) s[i] = e[i];
                            return s
                        }
                        var s = f.Parser.prototype;

                        function r(e) {
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
                                this.parser = e, this.validFlags = "gim" + (6 <= e.options.ecmaVersion ? "uy" : "") + (9 <= e.options.ecmaVersion ? "s" : "") + (13 <= e.options.ecmaVersion ? "d" : ""), this.unicodeProperties = i["default"][13 <= e.options.ecmaVersion ? 13 : e.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = [], this.backReferenceNames = []
                            }
                            reset(e, t, i) {
                                var s = -1 !== i.indexOf("u");
                                this.start = 0 | e, this.source = t + "", this.flags = i, this.switchU = s && 6 <= this.parser.options.ecmaVersion, this.switchN = s && 9 <= this.parser.options.ecmaVersion
                            }
                            raise(e) {
                                this.parser.raiseRecoverable(this.start, `Invalid regular expression: /${this.source}/: ` + e)
                            }
                            at(e, t = !1) {
                                var i, s = this.source,
                                    r = s.length;
                                return r <= e ? -1 : (i = s.charCodeAt(e), !(!t && !this.switchU || i <= 55295 || 57344 <= i || r <= e + 1) && 56320 <= (t = s.charCodeAt(e + 1)) && t <= 57343 ? (i << 10) + t - 56613888 : i)
                            }
                            nextIndex(e, t = !1) {
                                var i = this.source,
                                    s = i.length;
                                if (s <= e) return s;
                                let r = i.charCodeAt(e),
                                    n;
                                return !t && !this.switchU || r <= 55295 || 57344 <= r || s <= e + 1 || (n = i.charCodeAt(e + 1)) < 56320 || 57343 < n ? e + 1 : e + 2
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
                        }, s.validateRegExpFlags = function(t) {
                            var i = t.validFlags,
                                s = t.flags;
                            for (let e = 0; e < s.length; e++) {
                                var r = s.charAt(e); - 1 === i.indexOf(r) && this.raise(t.start, "Invalid regular expression flag"), -1 < s.indexOf(r, e + 1) && this.raise(t.start, "Duplicate regular expression flag")
                            }
                        }, s.validateRegExpPattern = function(e) {
                            this.regexp_pattern(e), !e.switchN && 9 <= this.options.ecmaVersion && 0 < e.groupNames.length && (e.switchN = !0, this.regexp_pattern(e))
                        }, s.regexp_pattern = function(r) {
                            r.pos = 0, r.lastIntValue = 0, r.lastStringValue = "", r.lastAssertionIsQuantifiable = !1, r.numCapturingParens = 0, r.maxBackReference = 0, r.groupNames.length = 0, r.backReferenceNames.length = 0, this.regexp_disjunction(r), r.pos !== r.source.length && (r.eat(41) && r.raise("Unmatched ')'"), r.eat(93) || r.eat(125)) && r.raise("Lone quantifier brackets"), r.maxBackReference > r.numCapturingParens && r.raise("Invalid escape");
                            for (var e = function r(e, t) {
                                    var i, s = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                    if (s) return (s = s.call(e)).next.bind(s);
                                    if (Array.isArray(e) || (s = function r(e, t) {
                                            var i;
                                            if (e) return "string" == typeof e ? n(e, t) : "Map" === (i = "Object" === (i = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : i) || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? n(e, t) : void 0
                                        }(e))) return s && (e = s), i = 0,
                                        function() {
                                            return i >= e.length ? {
                                                done: !0
                                            } : {
                                                done: !1,
                                                value: e[i++]
                                            }
                                        };
                                    throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                }(r.backReferenceNames); !(t = e()).done;) {
                                var t = t.value; - 1 === r.groupNames.indexOf(t) && r.raise("Invalid named capture referenced")
                            }
                        }, s.regexp_disjunction = function(e) {
                            for (this.regexp_alternative(e); e.eat(124);) this.regexp_alternative(e);
                            this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(123) && e.raise("Lone quantifier brackets")
                        }, s.regexp_alternative = function(e) {
                            for (; e.pos < e.source.length && this.regexp_eatTerm(e););
                        }, s.regexp_eatTerm = function(e) {
                            return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : (e.switchU ? !!this.regexp_eatAtom(e) : !!this.regexp_eatExtendedAtom(e)) && (this.regexp_eatQuantifier(e), !0)
                        }, s.regexp_eatAssertion = function(t) {
                            var e = t.pos;
                            if (t.lastAssertionIsQuantifiable = !1, t.eat(94) || t.eat(36)) return !0;
                            if (t.eat(92)) {
                                if (t.eat(66) || t.eat(98)) return !0;
                                t.pos = e
                            }
                            if (t.eat(40) && t.eat(63)) {
                                let e = !1;
                                if (9 <= this.options.ecmaVersion && (e = t.eat(60)), t.eat(61) || t.eat(33)) return this.regexp_disjunction(t), t.eat(41) || t.raise("Unterminated group"), t.lastAssertionIsQuantifiable = !e, !0
                            }
                            return t.pos = e, !1
                        }, s.regexp_eatQuantifier = function(e, t = !1) {
                            return !!this.regexp_eatQuantifierPrefix(e, t) && (e.eat(63), !0)
                        }, s.regexp_eatQuantifierPrefix = function(e, t) {
                            return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t)
                        }, s.regexp_eatBracedQuantifier = function(i, s) {
                            var r = i.pos;
                            if (i.eat(123)) {
                                let e = 0,
                                    t = -1;
                                if (this.regexp_eatDecimalDigits(i) && (e = i.lastIntValue, i.eat(44) && this.regexp_eatDecimalDigits(i) && (t = i.lastIntValue), i.eat(125))) return -1 !== t && t < e && !s && i.raise("numbers out of order in {} quantifier"), !0;
                                i.switchU && !s && i.raise("Incomplete quantifier"), i.pos = r
                            }
                            return !1
                        }, s.regexp_eatAtom = function(e) {
                            return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e)
                        }, s.regexp_eatReverseSolidusAtomEscape = function(e) {
                            var t = e.pos;
                            if (e.eat(92)) {
                                if (this.regexp_eatAtomEscape(e)) return !0;
                                e.pos = t
                            }
                            return !1
                        }, s.regexp_eatUncapturingGroup = function(e) {
                            var t = e.pos;
                            if (e.eat(40)) {
                                if (e.eat(63) && e.eat(58)) {
                                    if (this.regexp_disjunction(e), e.eat(41)) return !0;
                                    e.raise("Unterminated group")
                                }
                                e.pos = t
                            }
                            return !1
                        }, s.regexp_eatCapturingGroup = function(e) {
                            if (e.eat(40)) {
                                if (9 <= this.options.ecmaVersion ? this.regexp_groupSpecifier(e) : 63 === e.current() && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;
                                e.raise("Unterminated group")
                            }
                            return !1
                        }, s.regexp_eatExtendedAtom = function(e) {
                            return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e)
                        }, s.regexp_eatInvalidBracedQuantifier = function(e) {
                            return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1
                        }, s.regexp_eatSyntaxCharacter = function(e) {
                            var t = e.current();
                            return !!a(t) && (e.lastIntValue = t, e.advance(), !0)
                        }, s.regexp_eatPatternCharacters = function(e) {
                            for (var t, i = e.pos; - 1 !== (t = e.current()) && !a(t);) e.advance();
                            return e.pos !== i
                        }, s.regexp_eatExtendedPatternCharacter = function(e) {
                            var t = e.current();
                            return !(-1 === t || 36 === t || 40 <= t && t <= 43 || 46 === t || 63 === t || 91 === t || 94 === t || 124 === t || (e.advance(), 0))
                        }, s.regexp_groupSpecifier = function(e) {
                            e.eat(63) && (this.regexp_eatGroupName(e) ? (-1 !== e.groupNames.indexOf(e.lastStringValue) && e.raise("Duplicate capture group name"), e.groupNames.push(e.lastStringValue)) : e.raise("Invalid group"))
                        }, s.regexp_eatGroupName = function(e) {
                            if (e.lastStringValue = "", e.eat(60)) {
                                if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
                                e.raise("Invalid capture group name")
                            }
                            return !1
                        }, s.regexp_eatRegExpIdentifierName = function(e) {
                            if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
                                for (e.lastStringValue += r(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) e.lastStringValue += r(e.lastIntValue);
                                return !0
                            }
                            return !1
                        }, s.regexp_eatRegExpIdentifierStart = function(e) {
                            var t;
                            let i = e.pos,
                                s = 11 <= this.options.ecmaVersion,
                                r = e.current(s);
                            return e.advance(s), t = r = 92 === r && this.regexp_eatRegExpUnicodeEscapeSequence(e, s) ? e.lastIntValue : r, (0, d.isIdentifierStart)(t, !0) || 36 === t || 95 === t ? (e.lastIntValue = r, !0) : (e.pos = i, !1)
                        }, s.regexp_eatRegExpIdentifierPart = function(e) {
                            var t;
                            let i = e.pos,
                                s = 11 <= this.options.ecmaVersion,
                                r = e.current(s);
                            return e.advance(s), t = r = 92 === r && this.regexp_eatRegExpUnicodeEscapeSequence(e, s) ? e.lastIntValue : r, (0, d.isIdentifierChar)(t, !0) || 36 === t || 95 === t || 8204 === t || 8205 === t ? (e.lastIntValue = r, !0) : (e.pos = i, !1)
                        }, s.regexp_eatAtomEscape = function(e) {
                            return !!(this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e)) || (e.switchU && (99 === e.current() && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1)
                        }, s.regexp_eatBackReference = function(e) {
                            var t = e.pos;
                            if (this.regexp_eatDecimalEscape(e)) {
                                var i = e.lastIntValue;
                                if (e.switchU) return i > e.maxBackReference && (e.maxBackReference = i), !0;
                                if (i <= e.numCapturingParens) return !0;
                                e.pos = t
                            }
                            return !1
                        }, s.regexp_eatKGroupName = function(e) {
                            if (e.eat(107)) {
                                if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
                                e.raise("Invalid named reference")
                            }
                            return !1
                        }, s.regexp_eatCharacterEscape = function(e) {
                            return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e)
                        }, s.regexp_eatCControlLetter = function(e) {
                            var t = e.pos;
                            if (e.eat(99)) {
                                if (this.regexp_eatControlLetter(e)) return !0;
                                e.pos = t
                            }
                            return !1
                        }, s.regexp_eatZero = function(e) {
                            return !(48 !== e.current() || l(e.lookahead()) || (e.lastIntValue = 0, e.advance(), 0))
                        }, s.regexp_eatControlEscape = function(e) {
                            var t = e.current();
                            return 116 === t ? (e.lastIntValue = 9, e.advance(), !0) : 110 === t ? (e.lastIntValue = 10, e.advance(), !0) : 118 === t ? (e.lastIntValue = 11, e.advance(), !0) : 102 === t ? (e.lastIntValue = 12, e.advance(), !0) : 114 === t && (e.lastIntValue = 13, e.advance(), !0)
                        }, s.regexp_eatControlLetter = function(e) {
                            var t = e.current();
                            return !!o(t) && (e.lastIntValue = t % 32, e.advance(), !0)
                        }, s.regexp_eatRegExpUnicodeEscapeSequence = function(e, t = !1) {
                            var i = e.pos,
                                t = t || e.switchU;
                            if (e.eat(117)) {
                                if (this.regexp_eatFixedHexDigits(e, 4)) {
                                    var s = e.lastIntValue;
                                    if (t && 55296 <= s && s <= 56319) {
                                        var r = e.pos;
                                        if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
                                            var n = e.lastIntValue;
                                            if (56320 <= n && n <= 57343) return e.lastIntValue = 1024 * (s - 55296) + (n - 56320) + 65536, !0
                                        }
                                        e.pos = r, e.lastIntValue = s
                                    }
                                    return !0
                                }
                                if (t && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && 0 <= (n = e.lastIntValue) && n <= 1114111) return !0;
                                t && e.raise("Invalid unicode escape"), e.pos = i
                            }
                            return !1
                        }, s.regexp_eatIdentityEscape = function(e) {
                            var t;
                            return e.switchU ? !!this.regexp_eatSyntaxCharacter(e) || !!e.eat(47) && (e.lastIntValue = 47, !0) : !(99 === (t = e.current()) || e.switchN && 107 === t || (e.lastIntValue = t, e.advance(), 0))
                        }, s.regexp_eatDecimalEscape = function(e) {
                            e.lastIntValue = 0;
                            let t = e.current();
                            if (49 <= t && t <= 57) {
                                for (; e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance(), 48 <= (t = e.current()) && t <= 57;);
                                return !0
                            }
                            return !1
                        }, s.regexp_eatCharacterClassEscape = function(e) {
                            var t = e.current();
                            if (100 === t || 68 === t || 115 === t || 83 === t || 119 === t || 87 === t) return e.lastIntValue = -1, e.advance(), !0;
                            if (e.switchU && 9 <= this.options.ecmaVersion && (80 === t || 112 === t)) {
                                if (e.lastIntValue = -1, e.advance(), e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125)) return !0;
                                e.raise("Invalid property name")
                            }
                            return !1
                        }, s.regexp_eatUnicodePropertyValueExpression = function(e) {
                            var t = e.pos;
                            if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
                                var i, s = e.lastStringValue;
                                if (this.regexp_eatUnicodePropertyValue(e)) return i = e.lastStringValue, this.regexp_validateUnicodePropertyNameAndValue(e, s, i), !0
                            }
                            return e.pos = t, !!this.regexp_eatLoneUnicodePropertyNameOrValue(e) && (s = e.lastStringValue, this.regexp_validateUnicodePropertyNameOrValue(e, s), !0)
                        }, s.regexp_validateUnicodePropertyNameAndValue = function(e, t, i) {
                            (0, x.hasOwn)(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(i) || e.raise("Invalid property value")
                        }, s.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
                            e.unicodeProperties.binary.test(t) || e.raise("Invalid property name")
                        }, s.regexp_eatUnicodePropertyName = function(e) {
                            var t;
                            for (e.lastStringValue = ""; c(t = e.current());) e.lastStringValue += r(t), e.advance();
                            return "" !== e.lastStringValue
                        }, s.regexp_eatUnicodePropertyValue = function(e) {
                            var t, i;
                            for (e.lastStringValue = ""; c(i = t = e.current()) || l(i);) e.lastStringValue += r(t), e.advance();
                            return "" !== e.lastStringValue
                        }, s.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
                            return this.regexp_eatUnicodePropertyValue(e)
                        }, s.regexp_eatCharacterClass = function(e) {
                            if (e.eat(91)) {
                                if (e.eat(94), this.regexp_classRanges(e), e.eat(93)) return !0;
                                e.raise("Unterminated character class")
                            }
                            return !1
                        }, s.regexp_classRanges = function(e) {
                            for (; this.regexp_eatClassAtom(e);) {
                                var t, i = e.lastIntValue;
                                e.eat(45) && this.regexp_eatClassAtom(e) && (t = e.lastIntValue, !e.switchU || -1 !== i && -1 !== t || e.raise("Invalid character class"), -1 !== i) && -1 !== t && t < i && e.raise("Range out of order in character class")
                            }
                        }, s.regexp_eatClassAtom = function(e) {
                            var t = e.pos;
                            if (e.eat(92)) {
                                if (this.regexp_eatClassEscape(e)) return !0;
                                e.switchU && (99 !== (i = e.current()) && !u(i) || e.raise("Invalid class escape"), e.raise("Invalid escape")), e.pos = t
                            }
                            var i = e.current();
                            return 93 !== i && (e.lastIntValue = i, e.advance(), !0)
                        }, s.regexp_eatClassEscape = function(e) {
                            var t = e.pos;
                            if (e.eat(98)) return e.lastIntValue = 8, !0;
                            if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;
                            if (!e.switchU && e.eat(99)) {
                                if (this.regexp_eatClassControlLetter(e)) return !0;
                                e.pos = t
                            }
                            return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e)
                        }, s.regexp_eatClassControlLetter = function(e) {
                            var t = e.current();
                            return !(!l(t) && 95 !== t || (e.lastIntValue = t % 32, e.advance(), 0))
                        }, s.regexp_eatHexEscapeSequence = function(e) {
                            var t = e.pos;
                            if (e.eat(120)) {
                                if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
                                e.switchU && e.raise("Invalid escape"), e.pos = t
                            }
                            return !1
                        }, s.regexp_eatDecimalDigits = function(e) {
                            var t, i = e.pos;
                            for (e.lastIntValue = 0; l(t = e.current());) e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
                            return e.pos !== i
                        }, s.regexp_eatHexDigits = function(e) {
                            var t, i = e.pos;
                            for (e.lastIntValue = 0; p(t = e.current());) e.lastIntValue = 16 * e.lastIntValue + h(t), e.advance();
                            return e.pos !== i
                        }, s.regexp_eatLegacyOctalEscapeSequence = function(e) {
                            var t, i;
                            return !!this.regexp_eatOctalDigit(e) && (t = e.lastIntValue, this.regexp_eatOctalDigit(e) ? (i = e.lastIntValue, t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = 64 * t + 8 * i + e.lastIntValue : e.lastIntValue = 8 * t + i) : e.lastIntValue = t, !0)
                        }, s.regexp_eatOctalDigit = function(e) {
                            var t = e.current();
                            return u(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1)
                        }, s.regexp_eatFixedHexDigits = function(t, i) {
                            var s = t.pos;
                            for (let e = t.lastIntValue = 0; e < i; ++e) {
                                var r = t.current();
                                if (!p(r)) return t.pos = s, !1;
                                t.lastIntValue = 16 * t.lastIntValue + h(r), t.advance()
                            }
                            return !0
                        }
                    }),
                    Ae = r(function(e, t) {
                        t.__esModule = !0, t.Token = void 0;
                        class i {
                            constructor(e) {
                                this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new h.SourceLocation(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end])
                            }
                        }
                        t.Token = i;
                        t = f.Parser.prototype;

                        function r(e) {
                            return "function" != typeof BigInt ? null : BigInt(e.replace(/_/g, ""))
                        }

                        function n(e) {
                            return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(55296 + ((e -= 65536) >> 10), 56320 + (1023 & e))
                        }
                        t.next = function(e) {
                            !e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new i(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken()
                        }, t.getToken = function() {
                            return this.next(), new i(this)
                        }, "undefined" != typeof Symbol && (t[Symbol.iterator] = function() {
                            return {
                                next: () => {
                                    var e = this.getToken();
                                    return {
                                        done: e.type === g.types.eof,
                                        value: e
                                    }
                                }
                            }
                        }), t.nextToken = function() {
                            var e = this.curContext();
                            return e && e.preserveSpace || this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length ? this.finishToken(g.types.eof) : e.override ? e.override(this) : void this.readToken(this.fullCharCodeAtPos())
                        }, t.readToken = function(e) {
                            return (0, d.isIdentifierStart)(e, 6 <= this.options.ecmaVersion) || 92 === e ? this.readWord() : this.getTokenFromCode(e)
                        }, t.fullCharCodeAtPos = function() {
                            var e, t = this.input.charCodeAt(this.pos);
                            return t <= 55295 || 56320 <= t || (e = this.input.charCodeAt(this.pos + 1)) <= 56319 || 57344 <= e ? t : (t << 10) + e - 56613888
                        }, t.skipBlockComment = function() {
                            var e = this.options.onComment && this.curPosition(),
                                i = this.pos,
                                t = this.input.indexOf("*/", this.pos += 2);
                            if (-1 === t && this.raise(this.pos - 2, "Unterminated comment"), this.pos = t + 2, this.options.locations)
                                for (let e, t = i; - 1 < (e = (0, p.nextLineBreak)(this.input, t, this.pos));) ++this.curLine, t = this.lineStart = e;
                            this.options.onComment && this.options.onComment(!0, this.input.slice(i + 2, t), i, this.pos, e, this.curPosition())
                        }, t.skipLineComment = function(e) {
                            let t = this.pos,
                                i = this.options.onComment && this.curPosition(),
                                s = this.input.charCodeAt(this.pos += e);
                            for (; this.pos < this.input.length && !(0, p.isNewLine)(s);) s = this.input.charCodeAt(++this.pos);
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
                                        if (!(8 < e && e < 14 || 5760 <= e && p.nonASCIIwhitespace.test(String.fromCharCode(e)))) break e;
                                        ++this.pos
                                }
                            }
                        }, t.finishToken = function(e, t) {
                            this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
                            var i = this.type;
                            this.type = e, this.value = t, this.updateContext(i)
                        }, t.readToken_dot = function() {
                            var e, t = this.input.charCodeAt(this.pos + 1);
                            return 48 <= t && t <= 57 ? this.readNumber(!0) : (e = this.input.charCodeAt(this.pos + 2), 6 <= this.options.ecmaVersion && 46 === t && 46 === e ? (this.pos += 3, this.finishToken(g.types.ellipsis)) : (++this.pos, this.finishToken(g.types.dot)))
                        }, t.readToken_slash = function() {
                            var e = this.input.charCodeAt(this.pos + 1);
                            return this.exprAllowed ? (++this.pos, this.readRegexp()) : 61 === e ? this.finishOp(g.types.assign, 2) : this.finishOp(g.types.slash, 1)
                        }, t.readToken_mult_modulo_exp = function(e) {
                            let t = this.input.charCodeAt(this.pos + 1),
                                i = 1,
                                s = 42 === e ? g.types.star : g.types.modulo;
                            return 7 <= this.options.ecmaVersion && 42 === e && 42 === t && (++i, s = g.types.starstar, t = this.input.charCodeAt(this.pos + 2)), 61 === t ? this.finishOp(g.types.assign, i + 1) : this.finishOp(s, i)
                        }, t.readToken_pipe_amp = function(e) {
                            var t = this.input.charCodeAt(this.pos + 1);
                            return t === e ? 12 <= this.options.ecmaVersion && 61 === this.input.charCodeAt(this.pos + 2) ? this.finishOp(g.types.assign, 3) : this.finishOp(124 === e ? g.types.logicalOR : g.types.logicalAND, 2) : 61 === t ? this.finishOp(g.types.assign, 2) : this.finishOp(124 === e ? g.types.bitwiseOR : g.types.bitwiseAND, 1)
                        }, t.readToken_caret = function() {
                            return 61 === this.input.charCodeAt(this.pos + 1) ? this.finishOp(g.types.assign, 2) : this.finishOp(g.types.bitwiseXOR, 1)
                        }, t.readToken_plus_min = function(e) {
                            var t = this.input.charCodeAt(this.pos + 1);
                            return t === e ? 45 !== t || this.inModule || 62 !== this.input.charCodeAt(this.pos + 2) || 0 !== this.lastTokEnd && !p.lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)) ? this.finishOp(g.types.incDec, 2) : (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : 61 === t ? this.finishOp(g.types.assign, 2) : this.finishOp(g.types.plusMin, 1)
                        }, t.readToken_lt_gt = function(e) {
                            let t = this.input.charCodeAt(this.pos + 1),
                                i = 1;
                            return t === e ? (i = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2, 61 === this.input.charCodeAt(this.pos + i) ? this.finishOp(g.types.assign, i + 1) : this.finishOp(g.types.bitShift, i)) : 33 !== t || 60 !== e || this.inModule || 45 !== this.input.charCodeAt(this.pos + 2) || 45 !== this.input.charCodeAt(this.pos + 3) ? (61 === t && (i = 2), this.finishOp(g.types.relational, i)) : (this.skipLineComment(4), this.skipSpace(), this.nextToken())
                        }, t.readToken_eq_excl = function(e) {
                            var t = this.input.charCodeAt(this.pos + 1);
                            return 61 === t ? this.finishOp(g.types.equality, 61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2) : 61 === e && 62 === t && 6 <= this.options.ecmaVersion ? (this.pos += 2, this.finishToken(g.types.arrow)) : this.finishOp(61 === e ? g.types.eq : g.types.prefix, 1)
                        }, t.readToken_question = function() {
                            var e = this.options.ecmaVersion;
                            if (11 <= e) {
                                var t = this.input.charCodeAt(this.pos + 1);
                                if (46 === t) {
                                    var i = this.input.charCodeAt(this.pos + 2);
                                    if (i < 48 || 57 < i) return this.finishOp(g.types.questionDot, 2)
                                }
                                if (63 === t) return 12 <= e && 61 === this.input.charCodeAt(this.pos + 2) ? this.finishOp(g.types.assign, 3) : this.finishOp(g.types.coalesce, 2)
                            }
                            return this.finishOp(g.types.question, 1)
                        }, t.readToken_numberSign = function() {
                            let e = this.options.ecmaVersion,
                                t = 35;
                            if (13 <= e && (++this.pos, t = this.fullCharCodeAtPos(), (0, d.isIdentifierStart)(t, !0) || 92 === t)) return this.finishToken(g.types.privateId, this.readWord1());
                            this.raise(this.pos, "Unexpected character '" + n(t) + "'")
                        }, t.getTokenFromCode = function(e) {
                            switch (e) {
                                case 46:
                                    return this.readToken_dot();
                                case 40:
                                    return ++this.pos, this.finishToken(g.types.parenL);
                                case 41:
                                    return ++this.pos, this.finishToken(g.types.parenR);
                                case 59:
                                    return ++this.pos, this.finishToken(g.types.semi);
                                case 44:
                                    return ++this.pos, this.finishToken(g.types.comma);
                                case 91:
                                    return ++this.pos, this.finishToken(g.types.bracketL);
                                case 93:
                                    return ++this.pos, this.finishToken(g.types.bracketR);
                                case 123:
                                    return ++this.pos, this.finishToken(g.types.braceL);
                                case 125:
                                    return ++this.pos, this.finishToken(g.types.braceR);
                                case 58:
                                    return ++this.pos, this.finishToken(g.types.colon);
                                case 96:
                                    if (this.options.ecmaVersion < 6) break;
                                    return ++this.pos, this.finishToken(g.types.backQuote);
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
                                    return this.finishOp(g.types.prefix, 1);
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
                                var s = this.input.charAt(this.pos);
                                if (p.lineBreak.test(s) && this.raise(i, "Unterminated regular expression"), e) e = !1;
                                else {
                                    if ("[" === s) t = !0;
                                    else if ("]" === s && t) t = !1;
                                    else if ("/" === s && !t) break;
                                    e = "\\" === s
                                }++this.pos
                            }
                            var r = this.input.slice(i, this.pos),
                                n = (++this.pos, this.pos),
                                a = this.readWord1(),
                                n = (this.containsEsc && this.unexpected(n), this.regexpState || (this.regexpState = new Ce.RegExpValidationState(this)));
                            n.reset(i, r, a), this.validateRegExpFlags(n), this.validateRegExpPattern(n);
                            let o = null;
                            try {
                                o = RegExp(r, a)
                            } catch (c) {}
                            return this.finishToken(g.types.regexp, {
                                pattern: r,
                                flags: a,
                                value: o
                            })
                        }, t.readInt = function(i, s, e) {
                            let r = 12 <= this.options.ecmaVersion && void 0 === s,
                                n = e && 48 === this.input.charCodeAt(this.pos),
                                t = this.pos,
                                a = 0,
                                o = 0;
                            for (let e = 0, t = null == s ? 1 / 0 : s; e < t; ++e, ++this.pos) {
                                var c, l = this.input.charCodeAt(this.pos);
                                if (r && 95 === l) n && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), 95 === o && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), 0 === e && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), o = l;
                                else {
                                    if ((c = 97 <= l ? l - 97 + 10 : 65 <= l ? l - 65 + 10 : 48 <= l && l <= 57 ? l - 48 : 1 / 0) >= i) break;
                                    o = l, a = a * i + c
                                }
                            }
                            return r && 95 === o && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === t || null != s && this.pos - t !== s ? null : a
                        }, t.readRadixNumber = function(e) {
                            var t = this.pos;
                            this.pos += 2;
                            let i = this.readInt(e);
                            return null == i && this.raise(this.start + 2, "Expected number in radix " + e), 11 <= this.options.ecmaVersion && 110 === this.input.charCodeAt(this.pos) ? (i = r(this.input.slice(t, this.pos)), ++this.pos) : (0, d.isIdentifierStart)(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(g.types.num, i)
                        }, t.readNumber = function(e) {
                            var t = this.pos;
                            e || null !== this.readInt(10, void 0, !0) || this.raise(t, "Invalid number");
                            let i = 2 <= this.pos - t && 48 === this.input.charCodeAt(t),
                                s = (i && this.strict && this.raise(t, "Invalid number"), this.input.charCodeAt(this.pos));
                            if (!i && !e && 11 <= this.options.ecmaVersion && 110 === s) return e = r(this.input.slice(t, this.pos)), ++this.pos, (0, d.isIdentifierStart)(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(g.types.num, e);
                            i && /[89]/.test(this.input.slice(t, this.pos)) && (i = !1), 46 !== s || i || (++this.pos, this.readInt(10), s = this.input.charCodeAt(this.pos)), 69 !== s && 101 !== s || i || (43 !== (s = this.input.charCodeAt(++this.pos)) && 45 !== s || ++this.pos, null === this.readInt(10) && this.raise(t, "Invalid number")), (0, d.isIdentifierStart)(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
                            e = this.input.slice(t, this.pos);
                            t = i ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
                            return this.finishToken(g.types.num, t)
                        }, t.readCodePoint = function() {
                            let e;
                            var t;
                            return 123 === this.input.charCodeAt(this.pos) ? (this.options.ecmaVersion < 6 && this.unexpected(), t = ++this.pos, e = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, 1114111 < e && this.invalidStringToken(t, "Code point out of bounds")) : e = this.readHexChar(4), e
                        }, t.readString = function(e) {
                            let t = "",
                                i = ++this.pos;
                            for (;;) {
                                this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
                                var s = this.input.charCodeAt(this.pos);
                                if (s === e) break;
                                92 === s ? (t = (t += this.input.slice(i, this.pos)) + this.readEscapedChar(!1), i = this.pos) : 8232 === s || 8233 === s ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : ((0, p.isNewLine)(s) && this.raise(this.start, "Unterminated string constant"), ++this.pos)
                            }
                            return t += this.input.slice(i, this.pos++), this.finishToken(g.types.string, t)
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
                                if (96 === i || 36 === i && 123 === this.input.charCodeAt(this.pos + 1)) return this.pos !== this.start || this.type !== g.types.template && this.type !== g.types.invalidTemplate ? (e += this.input.slice(t, this.pos), this.finishToken(g.types.template, e)) : 36 === i ? (this.pos += 2, this.finishToken(g.types.dollarBraceL)) : (++this.pos, this.finishToken(g.types.backQuote));
                                if (92 === i) e = (e += this.input.slice(t, this.pos)) + this.readEscapedChar(!0), t = this.pos;
                                else if ((0, p.isNewLine)(i)) {
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
                                    return this.finishToken(g.types.invalidTemplate, this.input.slice(this.start, this.pos))
                            }
                            this.raise(this.start, "Unterminated template")
                        }, t.readEscapedChar = function(i) {
                            let s = this.input.charCodeAt(++this.pos);
                            switch (++this.pos, s) {
                                case 110:
                                    return "\n";
                                case 114:
                                    return "\r";
                                case 120:
                                    return String.fromCharCode(this.readHexChar(2));
                                case 117:
                                    return n(this.readCodePoint());
                                case 116:
                                    return "\t";
                                case 98:
                                    return "\b";
                                case 118:
                                    return "\x0B";
                                case 102:
                                    return "\f";
                                case 13:
                                    10 === this.input.charCodeAt(this.pos) && ++this.pos;
                                case 10:
                                    return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
                                case 56:
                                case 57:
                                    var e;
                                    if (this.strict && this.invalidStringToken(this.pos - 1, "Invalid escape sequence"), i) return e = this.pos - 1, this.invalidStringToken(e, "Invalid escape sequence in template string"), null;
                                default:
                                    if (48 <= s && s <= 55) {
                                        let e = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
                                            t = parseInt(e, 8);
                                        return 255 < t && (t = parseInt(e = e.slice(0, -1), 8)), this.pos += e.length - 1, s = this.input.charCodeAt(this.pos), "0" === e && 56 !== s && 57 !== s || !this.strict && !i || this.invalidStringToken(this.pos - 1 - e.length, i ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(t)
                                    }
                                    return (0, p.isNewLine)(s) ? "" : String.fromCharCode(s)
                            }
                        }, t.readHexChar = function(e) {
                            var t = this.pos,
                                e = this.readInt(16, e);
                            return null === e && this.invalidStringToken(t, "Bad character escape sequence"), e
                        }, t.readWord1 = function() {
                            let e = "",
                                t = !(this.containsEsc = !1),
                                i = this.pos,
                                s = 6 <= this.options.ecmaVersion;
                            for (; this.pos < this.input.length;) {
                                var r = this.fullCharCodeAtPos();
                                if ((0, d.isIdentifierChar)(r, s)) this.pos += r <= 65535 ? 1 : 2;
                                else {
                                    if (92 !== r) break;
                                    this.containsEsc = !0, e += this.input.slice(i, this.pos);
                                    var r = this.pos,
                                        n = (117 !== this.input.charCodeAt(++this.pos) && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos, this.readCodePoint());
                                    (t ? d.isIdentifierStart : d.isIdentifierChar)(n, s) || this.invalidStringToken(r, "Invalid Unicode escape"), e += this.input.substr(this.pos - 6, 6), i = this.pos
                                }
                                t = !1
                            }
                            return e + this.input.slice(i, this.pos)
                        }, t.readWord = function() {
                            let e = this.readWord1(),
                                t = g.types.name;
                            return this.keywords.test(e) && (t = g.keywords[e]), this.finishToken(t, e)
                        }
                    }),
                    e = r(function(e, t) {
                        t.__esModule = !0, t.parse = function(e, t) {
                            return f.Parser.parse(e, t)
                        }, t.parseExpressionAt = function(e, t, i) {
                            return f.Parser.parseExpressionAt(e, t, i)
                        }, t.tokenizer = function(e, t) {
                            return f.Parser.tokenizer(e, t)
                        }, t.version = void 0, t.Parser = f.Parser, t.defaultOptions = de.defaultOptions, t.Position = h.Position, t.SourceLocation = h.SourceLocation, t.getLineInfo = h.getLineInfo, t.Node = Ee.Node, t.TokenType = g.TokenType, t.tokTypes = g.types, t.keywordTypes = g.keywords, t.TokContext = _.TokContext, t.tokContexts = _.types, t.isIdentifierChar = d.isIdentifierChar, t.isIdentifierStart = d.isIdentifierStart, t.Token = Ae.Token, t.isNewLine = p.isNewLine, t.lineBreak = p.lineBreak, t.lineBreakG = p.lineBreakG, t.nonASCIIwhitespace = p.nonASCIIwhitespace;
                        var i = function(e, t) {
                            if (!t && e && e.__esModule) return e;
                            if (null === e || "object" != typeof e && "function" != typeof e) return {
                                "default": e
                            };
                            t = a(t);
                            if (t && t.has(e)) return t.get(e);
                            var i, s, r = {},
                                n = Object.defineProperty && Object.getOwnPropertyDescriptor;
                            for (i in e) "default" !== i && Object.prototype.hasOwnProperty.call(e, i) && ((s = n ? Object.getOwnPropertyDescriptor(e, i) : null) && (s.get || s.set) ? Object.defineProperty(r, i, s) : r[i] = e[i]);
                            return r["default"] = e, t && t.set(e, r), r
                        }(x);

                        function a(t) {
                            var i, s;
                            return "function" != typeof WeakMap ? null : (i = new WeakMap, s = new WeakMap, (a = function t(e) {
                                return e ? s : i
                            })(t))
                        }
                        t.version = "8.7.0", f.Parser.acorn = {
                            Parser: f.Parser,
                            version: "8.7.0",
                            defaultOptions: de.defaultOptions,
                            Position: h.Position,
                            SourceLocation: h.SourceLocation,
                            getLineInfo: h.getLineInfo,
                            Node: Ee.Node,
                            TokenType: g.TokenType,
                            tokTypes: g.types,
                            keywordTypes: g.keywords,
                            TokContext: _.TokContext,
                            tokContexts: _.types,
                            isIdentifierChar: d.isIdentifierChar,
                            isIdentifierStart: d.isIdentifierStart,
                            Token: Ae.Token,
                            isNewLine: p.isNewLine,
                            lineBreak: p.lineBreak,
                            lineBreakG: p.lineBreakG,
                            nonASCIIwhitespace: p.nonASCIIwhitespace
                        };
                        let s = i.wordsRegexp,
                            r = {};
                        i.wordsRegexp = function(e) {
                            return r[e] || (r[e] = s(e)), r[e]
                        }
                    }),
                    Pe = ((a = e) && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") && a["default"], e.Node, e.Parser, e.Position, e.SourceLocation, e.TokContext, e.Token, e.TokenType, e.defaultOptions, e.getLineInfo, e.isIdentifierChar, e.isIdentifierStart, e.isNewLine, e.keywordTypes, e.lineBreak, e.lineBreakG, e.nonASCIIwhitespace, e.parse);
                e.parseExpressionAt, e.tokContexts, e.tokTypes, e.tokenizer, e.version;
                const Ie = globalThis.fetch,
                    S = globalThis.WebSocket,
                    Oe = globalThis.Request,
                    Ne = globalThis.Response,
                    k = {
                        prototype: {
                            send: S.prototype.send
                        },
                        CLOSED: S.CLOSED,
                        CLOSING: S.CLOSING,
                        CONNECTING: S.CONNECTING,
                        OPEN: S.OPEN
                    },
                    Te = [101, 204, 205, 304],
                    Le = [301, 302, 303, 307, 308];
                class Me extends Error {
                    status;
                    body;
                    constructor(e, t) {
                        super(t.message || t.code), this.status = e, this.body = t
                    }
                }

                function E(e, t) {
                    var i = (65535 & e) + (65535 & t);
                    return (e >> 16) + (t >> 16) + (i >> 16) << 16 | 65535 & i
                }

                function C(e, t, i, s, r, n) {
                    return E((t = E(E(t, e), E(s, n))) << r | t >>> 32 - r, i)
                }

                function A(e, t, i, s, r, n, a) {
                    return C(t & i | ~t & s, e, t, r, n, a)
                }

                function P(e, t, i, s, r, n, a) {
                    return C(t & s | i & ~s, e, t, r, n, a)
                }

                function I(e, t, i, s, r, n, a) {
                    return C(t ^ i ^ s, e, t, r, n, a)
                }

                function O(e, t, i, s, r, n, a) {
                    return C(i ^ (t | ~s), e, t, r, n, a)
                }

                function n(t, e) {
                    t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
                    let i = 1732584193,
                        s = -271733879,
                        r = -1732584194,
                        n = 271733878;
                    for (let e = 0; e < t.length; e += 16) {
                        var a = i,
                            o = s,
                            c = r,
                            l = n;
                        i = A(i, s, r, n, t[e], 7, -680876936), n = A(n, i, s, r, t[e + 1], 12, -389564586), r = A(r, n, i, s, t[e + 2], 17, 606105819), s = A(s, r, n, i, t[e + 3], 22, -1044525330), i = A(i, s, r, n, t[e + 4], 7, -176418897), n = A(n, i, s, r, t[e + 5], 12, 1200080426), r = A(r, n, i, s, t[e + 6], 17, -1473231341), s = A(s, r, n, i, t[e + 7], 22, -45705983), i = A(i, s, r, n, t[e + 8], 7, 1770035416), n = A(n, i, s, r, t[e + 9], 12, -1958414417), r = A(r, n, i, s, t[e + 10], 17, -42063), s = A(s, r, n, i, t[e + 11], 22, -1990404162), i = A(i, s, r, n, t[e + 12], 7, 1804603682), n = A(n, i, s, r, t[e + 13], 12, -40341101), r = A(r, n, i, s, t[e + 14], 17, -1502002290), s = A(s, r, n, i, t[e + 15], 22, 1236535329), i = P(i, s, r, n, t[e + 1], 5, -165796510), n = P(n, i, s, r, t[e + 6], 9, -1069501632), r = P(r, n, i, s, t[e + 11], 14, 643717713), s = P(s, r, n, i, t[e], 20, -373897302), i = P(i, s, r, n, t[e + 5], 5, -701558691), n = P(n, i, s, r, t[e + 10], 9, 38016083), r = P(r, n, i, s, t[e + 15], 14, -660478335), s = P(s, r, n, i, t[e + 4], 20, -405537848), i = P(i, s, r, n, t[e + 9], 5, 568446438), n = P(n, i, s, r, t[e + 14], 9, -1019803690), r = P(r, n, i, s, t[e + 3], 14, -187363961), s = P(s, r, n, i, t[e + 8], 20, 1163531501), i = P(i, s, r, n, t[e + 13], 5, -1444681467), n = P(n, i, s, r, t[e + 2], 9, -51403784), r = P(r, n, i, s, t[e + 7], 14, 1735328473), s = P(s, r, n, i, t[e + 12], 20, -1926607734), i = I(i, s, r, n, t[e + 5], 4, -378558), n = I(n, i, s, r, t[e + 8], 11, -2022574463), r = I(r, n, i, s, t[e + 11], 16, 1839030562), s = I(s, r, n, i, t[e + 14], 23, -35309556), i = I(i, s, r, n, t[e + 1], 4, -1530992060), n = I(n, i, s, r, t[e + 4], 11, 1272893353), r = I(r, n, i, s, t[e + 7], 16, -155497632), s = I(s, r, n, i, t[e + 10], 23, -1094730640), i = I(i, s, r, n, t[e + 13], 4, 681279174), n = I(n, i, s, r, t[e], 11, -358537222), r = I(r, n, i, s, t[e + 3], 16, -722521979), s = I(s, r, n, i, t[e + 6], 23, 76029189), i = I(i, s, r, n, t[e + 9], 4, -640364487), n = I(n, i, s, r, t[e + 12], 11, -421815835), r = I(r, n, i, s, t[e + 15], 16, 530742520), s = I(s, r, n, i, t[e + 2], 23, -995338651), i = O(i, s, r, n, t[e], 6, -198630844), n = O(n, i, s, r, t[e + 7], 10, 1126891415), r = O(r, n, i, s, t[e + 14], 15, -1416354905), s = O(s, r, n, i, t[e + 5], 21, -57434055), i = O(i, s, r, n, t[e + 12], 6, 1700485571), n = O(n, i, s, r, t[e + 3], 10, -1894986606), r = O(r, n, i, s, t[e + 10], 15, -1051523), s = O(s, r, n, i, t[e + 1], 21, -2054922799), i = O(i, s, r, n, t[e + 8], 6, 1873313359), n = O(n, i, s, r, t[e + 15], 10, -30611744), r = O(r, n, i, s, t[e + 6], 15, -1560198380), s = O(s, r, n, i, t[e + 13], 21, 1309151649), i = O(i, s, r, n, t[e + 4], 6, -145523070), n = O(n, i, s, r, t[e + 11], 10, -1120210379), r = O(r, n, i, s, t[e + 2], 15, 718787259), s = O(s, r, n, i, t[e + 9], 21, -343485551), i = E(i, a), s = E(s, o), r = E(r, c), n = E(n, l)
                    }
                    return [i, s, r, n]
                }

                function Re(t) {
                    let i = "";
                    var s = 32 * t.length;
                    for (let e = 0; e < s; e += 8) i += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
                    return i
                }

                function Be(t) {
                    var i = [],
                        s = t.length >> 2;
                    for (let e = 0; e < s; e += 1) i[e] = 0;
                    var r = 8 * t.length;
                    for (let e = 0; e < r; e += 8) i[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
                    return i
                }

                function Ve(t) {
                    var i = "0123456789abcdef";
                    let s = "";
                    for (let e = 0; e < t.length; e += 1) {
                        var r = t.charCodeAt(e);
                        s += i.charAt(r >>> 4 & 15) + i.charAt(15 & r)
                    }
                    return s
                }

                function De(e) {
                    return unescape(encodeURIComponent(e))
                }

                function je(e) {
                    return Re(n(Be(e = De(e)), 8 * e.length))
                }

                function Fe(e, i) {
                    {
                        e = De(e), i = De(i);
                        let t = Be(e);
                        var s = [],
                            r = [];
                        16 < t.length && (t = n(t, 8 * e.length));
                        for (let e = 0; e < 16; e += 1) s[e] = 909522486 ^ t[e], r[e] = 1549556828 ^ t[e];
                        return e = n(s.concat(Be(i)), 512 + 8 * i.length), Re(n(r.concat(e), 640))
                    }
                }

                function Ue(e, t, i) {
                    return t ? i ? Fe(t, e) : Ve(Fe(t, e)) : i ? je(e) : Ve(je(e))
                }
                class We extends class {
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
                    connect(t, i, s, r, n) {
                        const a = new S(this.ws),
                            o = () => {
                                a.removeEventListener("close", e), a.removeEventListener("message", c)
                            },
                            e = () => {
                                o()
                            },
                            c = e => {
                                if (o(), "string" != typeof e.data) throw new TypeError("the first websocket message was not a text frame");
                                var t = JSON.parse(e.data);
                                if ("open" !== t.type) throw new TypeError("message was not of open type");
                                e.stopImmediatePropagation(), r({
                                    protocol: t.protocol,
                                    setCookies: t.setCookies
                                }), n(k.OPEN), a.dispatchEvent(new Event("open"))
                            };
                        return a.addEventListener("close", e), a.addEventListener("message", c), a.addEventListener("open", e => {
                            e.stopImmediatePropagation(), n(k.CONNECTING), s().then(e => k.prototype.send.call(a, JSON.stringify({
                                type: "connect",
                                remote: t.toString(),
                                protocols: i,
                                headers: e,
                                forwardHeaders: []
                            })))
                        }, {
                            once: !0
                        }), a
                    }
                    async request(e, t, i, s, r, n, a) {
                        if (s.protocol.startsWith("blob:")) {
                            const p = await Ie(s),
                                h = new Ne(p.body, p);
                            return h.rawHeaders = Object.fromEntries(p.headers), h.rawResponse = p, h
                        }
                        var o = {};
                        if (t instanceof Headers)
                            for (var [c, l] of t) o[c] = l;
                        else
                            for (const u in t) o[u] = t[u];
                        e = {
                            credentials: "omit",
                            method: e,
                            signal: a
                        };
                        "only-if-cached" !== r && (e.cache = r), i !== undefined && (e.body = i), n !== undefined && (e.duplex = n), e.headers = this.createBareHeaders(s, o);
                        const p = await Ie(this.http + "?cache=" + Ue(s.toString()), e);
                        a = await this.readBareResponse(p);
                        const h = new Ne(Te.includes(a.status) ? undefined : p.body, {
                            status: a.status,
                            statusText: a.statusText ?? undefined,
                            headers: new Headers(a.headers)
                        });
                        return h.rawHeaders = a.headers, h.rawResponse = p, h
                    }
                    async readBareResponse(e) {
                        var t, i, s;
                        if (e.ok) return i = {}, null !== (s = (t = function(e) {
                            var t = new Headers(e),
                                i = "x-bare-headers";
                            if (e.has(i + "-0")) {
                                var s, r, n = [];
                                for ([s, r] of e)
                                    if (s.startsWith(i)) {
                                        if (!r.startsWith(";")) throw new Me(400, {
                                            code: "INVALID_BARE_HEADER",
                                            id: "request.headers." + s,
                                            message: "Value didn't begin with semi-colon."
                                        });
                                        n[parseInt(s.slice(i.length + 1))] = r.slice(1), t["delete"](s)
                                    } t.set(i, n.join(""))
                            }
                            return t
                        }(e.headers)).get("x-bare-status")) && (i.status = parseInt(s)), null !== (s = t.get("x-bare-status-text")) && (i.statusText = s), null !== (s = t.get("x-bare-headers")) && (i.headers = JSON.parse(s)), i;
                        throw new Me(e.status, await e.json())
                    }
                    createBareHeaders(e, t, i = [], s = [], r = []) {
                        var n = new Headers;
                        n.set("x-bare-url", e.toString()), n.set("x-bare-headers", JSON.stringify(t));
                        for (const p of i) n.append("x-bare-forward-headers", p);
                        for (const h of s) n.append("x-bare-pass-headers", h);
                        for (const u of r) n.append("x-bare-pass-status", u.toString());
                        var e = n,
                            a = new Headers(e);
                        if (e.has("x-bare-headers")) {
                            var o = e.get("x-bare-headers");
                            if (3072 < o.length) {
                                a["delete"]("x-bare-headers");
                                let t = 0;
                                for (let e = 0; e < o.length; e += 3072) {
                                    var c = o.slice(e, e + 3072),
                                        l = t++;
                                    a.set("x-bare-headers-" + l, ";" + c)
                                }
                            }
                        }
                        return n
                    }
                }
                const $e = [
                    ["v3", We]
                ];
                async function qe(e, t) {
                    e = await Ie(e, {
                        signal: t
                    });
                    if (e.ok) return e.json();
                    throw new Error(`Unable to fetch Bare meta: ${e.status} ` + await e.text())
                }
                const He = Object.getOwnPropertyDescriptor(S.prototype, "readyState").get,
                    Ge = ["ws:", "wss:"];
                class ze {
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
                        return this.onDemand ? (this.working || (this.working = qe(this.server, this.onDemandSignal).then(e => this.loadManifest(e))["catch"](e => {
                            throw delete this.working, e
                        })), this.working) : this.client
                    }
                    getClient() {
                        for (var [e, t] of $e)
                            if (this.manifest.versions.includes(e)) return new t(this.server);
                        throw new Error("Unable to find compatible client version. Starting from v2.0.0, @tomphttp/bare-client only supports Bare servers v3+. For more information, see https://github.com/tomphttp/bare-client/")
                    }
                    createWebSocket(t, e = [], i) {
                        if (!this.client) throw new TypeError("You need to wait for the client to finish fetching the manifest before creating any WebSockets. Try caching the manifest data before making this request.");
                        try {
                            t = new URL(t)
                        } catch (c) {
                            throw new DOMException(`Faiiled to construct 'WebSocket': The URL '${t}' is invalid.`)
                        }
                        if (!Ge.includes(t.protocol)) throw new DOMException(`Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${t.protocol}' is not allowed.`);
                        for (const l of e = (e = Array.isArray(e) ? e : [e]).map(String))
                            if (! function(t) {
                                    for (let e = 0; e < t.length; e++) {
                                        var i = t[e];
                                        if (!"!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~".includes(i)) return
                                    }
                                    return 1
                                }(l)) throw new DOMException(`Failed to construct 'WebSocket': The subprotocol '${l}' is invalid.`);
                        const s = this.client.connect(t, e, async () => {
                            var e = "function" == typeof i.headers ? await i.headers() : i.headers || {},
                                e = e instanceof Headers ? Object.fromEntries(e) : e;
                            return e.Host = t.host, e.Pragma = "no-cache", e["Cache-Control"] = "no-cache", e.Upgrade = "websocket", e.Connection = "Upgrade", e
                        }, e => {
                            r = e.protocol, i.setCookiesCallback && i.setCookiesCallback(e.setCookies)
                        }, e => {
                            n = e
                        }, i.webSocketImpl || S);
                        let r = "",
                            n = k.CONNECTING;
                        const a = () => {
                                var e = He.call(s);
                                return e === k.OPEN ? n : e
                            },
                            o = (i.readyStateHook ? i.readyStateHook(s, a) : Object.defineProperty(s, "readyState", {
                                get: a,
                                configurable: !0,
                                enumerable: !0
                            }), () => {
                                if (a() === k.CONNECTING) return new DOMException("Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.")
                            });
                        i.sendErrorHook ? i.sendErrorHook(s, o) : s.send = function(...e) {
                            var t = o();
                            if (t) throw t;
                            k.prototype.send.call(this, ...e)
                        }, i.urlHook ? i.urlHook(s, t) : Object.defineProperty(s, "url", {
                            get: () => t.toString(),
                            configurable: !0,
                            enumerable: !0
                        });
                        e = () => r;
                        return i.protocolHook ? i.protocolHook(s, e) : Object.defineProperty(s, "protocol", {
                            get: e,
                            configurable: !0,
                            enumerable: !0
                        }), s
                    }
                    async fetch(e, t) {
                        var i = "string" == typeof(s = e) || s instanceof URL ? new Oe(e, t) : e,
                            s = t?.headers || i.headers,
                            r = s instanceof Headers ? Object.fromEntries(s) : s,
                            n = t?.duplex,
                            a = t?.body || i.body;
                        let o = new URL(i.url);
                        var c = await this.demand();
                        for (let e = 0;; e++) {
                            "host" in r ? r.host = o.host : r.Host = o.host;
                            var l = await c.request(i.method, r, a, o, i.cache, n, i.signal),
                                p = (l.finalURL = o.toString(), t?.redirect || i.redirect);
                            if (!Le.includes(l.status)) return l;
                            switch (p) {
                                case "follow":
                                    var h = l.headers.get("location");
                                    if (e < 20 && null !== h) {
                                        o = new URL(h, o);
                                        continue
                                    }
                                    throw new TypeError("Failed to fetch");
                                case "error":
                                    throw new TypeError("Failed to fetch");
                                case "manual":
                                    return l
                            }
                        }
                    }
                }
                async function Ke(e, t) {
                    t = await qe(e, t);
                    return new ze(e, t)
                }
                var Qe = Object.prototype.toString,
                    Xe = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

                function Ye(e, t, i) {
                    var i = i || {},
                        s = i.encode || Je;
                    if ("function" != typeof s) throw new TypeError("option encode is invalid");
                    if (!Xe.test(e)) throw new TypeError("argument name is invalid");
                    t = s(t);
                    if (t && !Xe.test(t)) throw new TypeError("argument val is invalid");
                    var r = e + "=" + t;
                    if (null != i.maxAge) {
                        s = +i.maxAge;
                        if (isNaN(s) || !isFinite(s)) throw new TypeError("option maxAge is invalid");
                        r += "; Max-Age=" + Math.floor(s)
                    }
                    if (i.domain) {
                        if (!Xe.test(i.domain)) throw new TypeError("option domain is invalid");
                        r += "; Domain=" + i.domain
                    }
                    if (i.path) {
                        if (!Xe.test(i.path)) throw new TypeError("option path is invalid");
                        r += "; Path=" + i.path
                    }
                    if (i.expires && (e = i.expires, t = e, ("[object Date]" === Qe.call(t) || t instanceof Date) && !isNaN(e.valueOf()) || (r += "; Expires=" + new Date(0).toUTCString()), r += "; Expires=" + e.toUTCString()), i.httpOnly && (r += "; HttpOnly"), i.secure && (r += "; Secure"), i.priority) switch ("string" == typeof i.priority ? i.priority.toLowerCase() : i.priority) {
                        case "low":
                            r += "; Priority=Low";
                            break;
                        case "medium":
                            r += "; Priority=Medium";
                            break;
                        case "high":
                            r += "; Priority=High";
                            break;
                        default:
                            throw new TypeError("option priority is invalid")
                    }
                    if (i.sameSite) switch ("string" == typeof i.sameSite ? i.sameSite.toLowerCase() : i.sameSite) {
                        case !0:
                            r += "; SameSite=Strict";
                            break;
                        case "lax":
                            r += "; SameSite=Lax";
                            break;
                        case "strict":
                            r += "; SameSite=Strict";
                            break;
                        case "none":
                            r += "; SameSite=None";
                            break;
                        default:
                            throw new TypeError("option sameSite is invalid")
                    }
                    return r
                }

                function Ze(e) {
                    return -1 !== e.indexOf("%") ? decodeURIComponent(e) : e
                }

                function Je(e) {
                    return encodeURIComponent(e)
                }
                var et = t(328),
                    a = {};

                function tt(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var s = t[i];
                        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
                    }
                }
                Object.defineProperty(a, "__esModule", {
                    value: !0
                }), a.GENERATOR = a.EXPRESSIONS_PRECEDENCE = a.NEEDS_PARENTHESES = void 0;
                var it = JSON.stringify;
                if (!String.prototype.repeat) throw new Error("String.prototype.repeat is undefined, see https://github.com/davidbonnet/astring#installation");
                if (!String.prototype.endsWith) throw new Error("String.prototype.endsWith is undefined, see https://github.com/davidbonnet/astring#installation");
                var st = {
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
                        "in": 9,
                        "instanceof": 9,
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
                    N = 17,
                    rt = {
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
                        ArrowFunctionExpression: a.NEEDS_PARENTHESES = N,
                        ClassExpression: N,
                        FunctionExpression: N,
                        ObjectExpression: N,
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

                function T(e, t) {
                    var i = e.generator;
                    if (e.write("("), null != t && 0 < t.length) {
                        i[t[0].type](t[0], e);
                        for (var s = t.length, r = 1; r < s; r++) {
                            var n = t[r];
                            e.write(", "), i[n.type](n, e)
                        }
                    }
                    e.write(")")
                }

                function nt(e, t, i, s) {
                    var r = e.expressionsPrecedence[t.type];
                    return r === N || (r !== (e = e.expressionsPrecedence[i.type]) ? !s && 15 === r && 14 === e && "**" === i.operator || r < e : (13 === r || 14 === r) && ("**" === t.operator && "**" === i.operator ? !s : s ? st[t.operator] <= st[i.operator] : st[t.operator] < st[i.operator]))
                }

                function at(e, t, i, s) {
                    var r = e.generator;
                    nt(e, t, i, s) ? (e.write("("), r[t.type](t, e), e.write(")")) : r[t.type](t, e)
                }

                function L(e, t, i, s) {
                    for (var r = t.length, n = 0; n < r; n++) {
                        var a = t[n];
                        if (e.write(i), "L" === a.type[0]) e.write("// " + a.value.trim() + "\n", a);
                        else {
                            e.write("/*");
                            {
                                o = void 0;
                                c = void 0;
                                l = void 0;
                                p = void 0;
                                h = void 0;
                                u = void 0;
                                d = void 0;
                                var o = e;
                                var c = a.value;
                                var l = i;
                                var p = s;
                                var h = c.split("\n"),
                                    u = h.length - 1;
                                if (o.write(h[0].trim()), 0 < u) {
                                    o.write(p);
                                    for (var d = 1; d < u; d++) o.write(l + h[d].trim() + p);
                                    o.write(l + h[u].trim())
                                }
                            }
                            e.write("*/" + s)
                        }
                    }
                }

                function ot(e, t) {
                    var i = e.generator,
                        s = t.declarations,
                        r = (e.write(t.kind + " "), s.length);
                    if (0 < r) {
                        i.VariableDeclarator(s[0], e);
                        for (var n = 1; n < r; n++) e.write(", "), i.VariableDeclarator(s[n], e)
                    }
                }
                a.EXPRESSIONS_PRECEDENCE = rt;
                var ct, lt = {
                        Program: function(e, t) {
                            var i = t.indent.repeat(t.indentLevel),
                                s = t.lineEnd,
                                r = t.writeComments;
                            r && null != e.comments && L(t, e.comments, i, s);
                            for (var n = e.body, a = n.length, o = 0; o < a; o++) {
                                var c = n[o];
                                r && null != c.comments && L(t, c.comments, i, s), t.write(i), this[c.type](c, t), t.write(s)
                            }
                            r && null != e.trailingComments && L(t, e.trailingComments, i, s)
                        },
                        ParenthesizedExpression: function(e, t) {
                            t.write("("), this[e.expression.type](e.expression, t), t.write(")")
                        },
                        BlockStatement: e = function(e, t) {
                            var i = t.indent.repeat(t.indentLevel++),
                                s = t.lineEnd,
                                r = t.writeComments,
                                n = i + t.indent,
                                a = (t.write("{"), e.body);
                            if (null != a && 0 < a.length) {
                                t.write(s), r && null != e.comments && L(t, e.comments, n, s);
                                for (var o = a.length, c = 0; c < o; c++) {
                                    var l = a[c];
                                    r && null != l.comments && L(t, l.comments, n, s), t.write(n), this[l.type](l, t), t.write(s)
                                }
                                t.write(i)
                            } else r && null != e.comments && (t.write(s), L(t, e.comments, n, s), t.write(i));
                            r && null != e.trailingComments && L(t, e.trailingComments, n, s), t.write("}"), t.indentLevel--
                        },
                        ClassBody: e,
                        StaticBlock: function(e, t) {
                            t.write("static "), this.BlockStatement(e, t)
                        },
                        EmptyStatement: function(e, t) {
                            t.write(";")
                        },
                        ExpressionStatement: function(e, t) {
                            var i = t.expressionsPrecedence[e.expression.type];
                            i === N || 3 === i && "O" === e.expression.left.type[0] ? (t.write("("), this[e.expression.type](e.expression, t), t.write(")")) : this[e.expression.type](e.expression, t), t.write(";")
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
                                s = t.lineEnd,
                                r = t.writeComments,
                                n = (t.indentLevel++, i + t.indent),
                                a = n + t.indent;
                            t.write("switch ("), this[e.discriminant.type](e.discriminant, t), t.write(") {" + s);
                            for (var o = e.cases, c = o.length, l = 0; l < c; l++) {
                                var p = o[l];
                                r && null != p.comments && L(t, p.comments, n, s), p.test ? (t.write(n + "case "), this[p.test.type](p.test, t), t.write(":" + s)) : t.write(n + "default:" + s);
                                for (var h = p.consequent, u = h.length, d = 0; d < u; d++) {
                                    var f = h[d];
                                    r && null != f.comments && L(t, f.comments, a, s), t.write(a), this[f.type](f, t), t.write(s)
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
                            t.write("for ("), null != e.init && ("V" === (i = e.init).type[0] ? ot(t, i) : this[i.type](i, t)), t.write("; "), e.test && this[e.test.type](e.test, t), t.write("; "), e.update && this[e.update.type](e.update, t), t.write(") "), this[e.body.type](e.body, t)
                        },
                        ForInStatement: e = function(e, t) {
                            t.write("for ".concat(e["await"] ? "await " : "", "("));
                            var i = e.left;
                            "V" === i.type[0] ? ot(t, i) : this[i.type](i, t), t.write("I" === e.type[3] ? " in " : " of "), this[e.right.type](e.right, t), t.write(") "), this[e.body.type](e.body, t)
                        },
                        ForOfStatement: e,
                        DebuggerStatement: function(e, t) {
                            t.write("debugger;", e)
                        },
                        FunctionDeclaration: e = function(e, t) {
                            t.write((e["async"] ? "async " : "") + (e.generator ? "function* " : "function ") + (e.id ? e.id.name : ""), e), T(t, e.params), t.write(" "), this[e.body.type](e.body, t)
                        },
                        FunctionExpression: e,
                        VariableDeclaration: function(e, t) {
                            ot(t, e), t.write(";")
                        },
                        VariableDeclarator: function(e, t) {
                            this[e.id.type](e.id, t), null != e.init && (t.write(" = "), this[e.init.type](e.init, t))
                        },
                        ClassDeclaration: function(e, t) {
                            var i, s, r;
                            t.write("class " + (e.id ? "".concat(e.id.name, " ") : ""), e), e.superClass && (t.write("extends "), s = (i = e.superClass).type, r = t.expressionsPrecedence[s], "C" === s[0] && "l" === s[1] && "E" === s[5] || !(r === N || r < t.expressionsPrecedence.ClassExpression) ? this[i.type](i, t) : (t.write("("), this[e.superClass.type](i, t), t.write(")")), t.write(" ")), this.ClassBody(e.body, t)
                        },
                        ImportDeclaration: function(e, t) {
                            t.write("import ");
                            var i = e.specifiers,
                                s = i.length,
                                r = 0;
                            if (0 < s) {
                                for (; r < s;) {
                                    0 < r && t.write(", ");
                                    var n = i[r],
                                        a = n.type[6];
                                    if ("D" === a) t.write(n.local.name, n);
                                    else {
                                        if ("N" !== a) break;
                                        t.write("* as " + n.local.name, n)
                                    }
                                    r++
                                }
                                if (r < s) {
                                    for (t.write("{");;) {
                                        var o = i[r],
                                            c = o.imported.name;
                                        if (t.write(c, o), c !== o.local.name && t.write(" as " + o.local.name), !(++r < s)) break;
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
                                    s = i.length;
                                if (0 < s)
                                    for (var r = 0;;) {
                                        var n = i[r],
                                            a = n.local.name;
                                        if (t.write(a, n), a !== n.exported.name && t.write(" as " + n.exported.name), !(++r < s)) break;
                                        t.write(", ")
                                    }
                                t.write("}"), e.source && (t.write(" from "), this.Literal(e.source, t)), t.write(";")
                            }
                        },
                        ExportAllDeclaration: function(e, t) {
                            null != e.exported ? t.write("export * as " + e.exported.name + " from ") : t.write("export * from "), this.Literal(e.source, t), t.write(";")
                        },
                        MethodDefinition: function(e, t) {
                            e["static"] && t.write("static ");
                            var i = e.kind[0];
                            "g" !== i && "s" !== i || t.write(e.kind + " "), e.value["async"] && t.write("async "), e.value.generator && t.write("*"), e.computed ? (t.write("["), this[e.key.type](e.key, t), t.write("]")) : this[e.key.type](e.key, t), T(t, e.value.params), t.write(" "), this[e.value.body.type](e.value.body, t)
                        },
                        ClassExpression: function(e, t) {
                            this.ClassDeclaration(e, t)
                        },
                        ArrowFunctionExpression: function(e, t) {
                            t.write(e["async"] ? "async " : "", e);
                            var i = e.params;
                            null != i && (1 === i.length && "I" === i[0].type[0] ? t.write(i[0].name, i[0]) : T(t, e.params)), t.write(" => "), "O" === e.body.type[0] ? (t.write("("), this.ObjectExpression(e.body, t), t.write(")")) : this[e.body.type](e.body, t)
                        },
                        ThisExpression: function(e, t) {
                            t.write("this", e)
                        },
                        Super: function(e, t) {
                            t.write("super", e)
                        },
                        RestElement: e = function(e, t) {
                            t.write("..."), this[e.argument.type](e.argument, t)
                        },
                        SpreadElement: e,
                        YieldExpression: function(e, t) {
                            t.write(e.delegate ? "yield*" : "yield"), e.argument && (t.write(" "), this[e.argument.type](e.argument, t))
                        },
                        AwaitExpression: function(e, t) {
                            t.write("await ", e), at(t, e.argument, e)
                        },
                        TemplateLiteral: function(e, t) {
                            var i = e.quasis,
                                s = e.expressions;
                            t.write("`");
                            for (var r = s.length, n = 0; n < r; n++) {
                                var a = s[n],
                                    o = i[n];
                                t.write(o.value.raw, o), t.write("${"), this[a.type](a, t), t.write("}")
                            }
                            e = i[i.length - 1];
                            t.write(e.value.raw, e), t.write("`")
                        },
                        TemplateElement: function(e, t) {
                            t.write(e.value.raw, e)
                        },
                        TaggedTemplateExpression: function(e, t) {
                            at(t, e.tag, e), this[e.quasi.type](e.quasi, t)
                        },
                        ArrayExpression: e = function(e, t) {
                            if (t.write("["), 0 < e.elements.length)
                                for (var i = e.elements, s = i.length, r = 0;;) {
                                    var n = i[r];
                                    if (null != n && this[n.type](n, t), !(++r < s)) {
                                        null == n && t.write(", ");
                                        break
                                    }
                                    t.write(", ")
                                }
                            t.write("]")
                        },
                        ArrayPattern: e,
                        ObjectExpression: function(e, t) {
                            var i = t.indent.repeat(t.indentLevel++),
                                s = t.lineEnd,
                                r = t.writeComments,
                                n = i + t.indent;
                            if (t.write("{"), 0 < e.properties.length) {
                                t.write(s), r && null != e.comments && L(t, e.comments, n, s);
                                for (var a = "," + s, o = e.properties, c = o.length, l = 0;;) {
                                    var p = o[l];
                                    if (r && null != p.comments && L(t, p.comments, n, s), t.write(n), this[p.type](p, t), !(++l < c)) break;
                                    t.write(a)
                                }
                                t.write(s), r && null != e.trailingComments && L(t, e.trailingComments, n, s), t.write(i + "}")
                            } else r ? null != e.comments ? (t.write(s), L(t, e.comments, n, s), null != e.trailingComments && L(t, e.trailingComments, n, s), t.write(i + "}")) : null != e.trailingComments ? (t.write(s), L(t, e.trailingComments, n, s), t.write(i + "}")) : t.write("}") : t.write("}");
                            t.indentLevel--
                        },
                        Property: function(e, t) {
                            e.method || "i" !== e.kind[0] ? this.MethodDefinition(e, t) : (e.shorthand || (e.computed ? (t.write("["), this[e.key.type](e.key, t), t.write("]")) : this[e.key.type](e.key, t), t.write(": ")), this[e.value.type](e.value, t))
                        },
                        PropertyDefinition: function(e, t) {
                            e["static"] && t.write("static "), e.computed && t.write("["), this[e.key.type](e.key, t), e.computed && t.write("]"), null != e.value ? (t.write(" = "), this[e.value.type](e.value, t), t.write(";")) : "F" !== e.key.type[0] && t.write(";")
                        },
                        ObjectPattern: function(e, t) {
                            if (t.write("{"), 0 < e.properties.length)
                                for (var i = e.properties, s = i.length, r = 0; this[i[r].type](i[r], t), ++r < s;) t.write(", ");
                            t.write("}")
                        },
                        SequenceExpression: function(e, t) {
                            T(t, e.expressions)
                        },
                        UnaryExpression: function(e, t) {
                            var i, s, r, n;
                            e.prefix ? (i = e.operator, s = e.argument, r = e.argument.type, t.write(i), (n = nt(t, s, e)) || !(1 < i.length) && ("U" !== r[0] || "n" !== r[1] && "p" !== r[1] || !s.prefix || s.operator[0] !== i || "+" !== i && "-" !== i) || t.write(" "), n ? (t.write(1 < i.length ? " (" : "("), this[r](s, t), t.write(")")) : this[r](s, t)) : (this[e.argument.type](e.argument, t), t.write(e.operator))
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
                        BinaryExpression: e = function(e, t) {
                            var i = "in" === e.operator;
                            i && t.write("("), at(t, e.left, e, !1), t.write(" " + e.operator + " "), at(t, e.right, e, !0), i && t.write(")")
                        },
                        LogicalExpression: e,
                        ConditionalExpression: function(e, t) {
                            var i = e.test,
                                s = t.expressionsPrecedence[i.type];
                            s === N || s <= t.expressionsPrecedence.ConditionalExpression ? (t.write("("), this[i.type](i, t), t.write(")")) : this[i.type](i, t), t.write(" ? "), this[e.consequent.type](e.consequent, t), t.write(" : "), this[e.alternate.type](e.alternate, t)
                        },
                        NewExpression: function(e, t) {
                            t.write("new ");
                            var i = t.expressionsPrecedence[e.callee.type];
                            i === N || i < t.expressionsPrecedence.CallExpression || function(e) {
                                for (var t = e; null != t;) {
                                    var i = t.type;
                                    if ("C" === i[0] && "a" === i[1]) return 1;
                                    if ("M" !== i[0] || "e" !== i[1] || "m" !== i[2]) return;
                                    t = t.object
                                }
                            }(e.callee) ? (t.write("("), this[e.callee.type](e.callee, t), t.write(")")) : this[e.callee.type](e.callee, t), T(t, e.arguments)
                        },
                        CallExpression: function(e, t) {
                            var i = t.expressionsPrecedence[e.callee.type];
                            i === N || i < t.expressionsPrecedence.CallExpression ? (t.write("("), this[e.callee.type](e.callee, t), t.write(")")) : this[e.callee.type](e.callee, t), e.optional && t.write("?."), T(t, e.arguments)
                        },
                        ChainExpression: function(e, t) {
                            this[e.expression.type](e.expression, t)
                        },
                        MemberExpression: function(e, t) {
                            var i = t.expressionsPrecedence[e.object.type];
                            i === N || i < t.expressionsPrecedence.MemberExpression ? (t.write("("), this[e.object.type](e.object, t), t.write(")")) : this[e.object.type](e.object, t), e.computed ? (e.optional && t.write("?."), t.write("["), this[e.property.type](e.property, t), t.write("]")) : (e.optional ? t.write("?.") : t.write("."), this[e.property.type](e.property, t))
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
                            null != e.raw ? t.write(e.raw, e) : null != e.regex ? this.RegExpLiteral(e, t) : null != e.bigint ? t.write(e.bigint + "n", e) : t.write(it(e.value), e)
                        },
                        RegExpLiteral: function(e, t) {
                            var i = e.regex;
                            t.write("/".concat(i.pattern, "/").concat(i.flags), e)
                        }
                    },
                    pt = (a.GENERATOR = lt, {}),
                    ht = (a.baseGenerator = lt, e = ut, (a = [{
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
                                    for (var s = e.length, r = this.column, n = this.line, a = 0; a < s; a++) "\n" === e[a] ? (r = 0, n++) : r++;
                                    return this.column = r, void(this.line = n)
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
                    }]) && tt(e.prototype, a), ct && tt(e, ct), ut);

                function ut(e) {
                    if (!(this instanceof ut)) throw new TypeError("Cannot call a class as a function");
                    e = null == e ? pt : e;
                    this.output = "", null != e.output ? (this.output = e.output, this.write = this.writeToStream) : this.output = "", this.generator = null != e.generator ? e.generator : lt, this.expressionsPrecedence = null != e.expressionsPrecedence ? e.expressionsPrecedence : rt, this.indent = null != e.indent ? e.indent : "  ", this.lineEnd = null != e.lineEnd ? e.lineEnd : "\n", this.indentLevel = null != e.startingIndentLevel ? e.startingIndentLevel : 0, this.writeComments = !!e.comments && e.comments, null != e.sourceMap && (this.write = null == e.output ? this.writeAndMap : this.writeToStreamAndMap, this.sourceMap = e.sourceMap, this.line = 1, this.column = 0, this.lineEndSize = this.lineEnd.split("\n").length - 1, this.mapping = {
                        original: null,
                        generated: this,
                        name: void 0,
                        source: e.sourceMap.file || e.sourceMap._file
                    })
                }

                function dt(e, t) {
                    t = new ht(t);
                    return t.generator[e.type](e, t), t.output
                }
                var ft = t(206);
                class mt {
                    constructor(e) {
                        this.mime = K, this.idb = V, this.path = U, this.acorn = {
                            parse: Pe
                        }, this.bare = {
                            createBareClient: Ke,
                            BareClient: ze
                        }, this.base64 = D, this.estree = {
                            generate: dt
                        }, this.cookie = Object.assign(Object.assign({}, j), {
                            serialize: (...e) => {
                                try {
                                    return Ye.apply({}, e)
                                } catch (t) {
                                    console.log(t)
                                }
                            }
                        }), this.setCookieParser = et, this.bowser = ft, this.ctx = e
                    }
                }
                const yt = mt;

                function gt(e, t, i, s, r = "", n = !1, a = "") {
                    var o;
                    return o = !!self.__dynamic$config && "development" == self.__dynamic$config.mode, n ? (n = [{
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
                    }], this.ctx.config.assets.files.inject && n.unshift({
                        nodeName: "script",
                        tagName: "script",
                        namespaceURI: "http://www.w3.org/1999/xhtml",
                        childNodes: [],
                        attrs: [{
                            name: "src",
                            value: this.ctx.config.assets.files.inject + (o ? "?" + Math.floor(89999 * Math.random() + 1e4) : "")
                        }]
                    }), s && n.unshift({
                        nodeName: "script",
                        tagName: "script",
                        namespaceURI: "http://www.w3.org/1999/xhtml",
                        childNodes: [],
                        attrs: [{
                            name: "src",
                            value: "data:application/javascript;base64," + btoa(`self.__dynamic$cookies = atob("${btoa(s)}");document.currentScript?.remove();`)
                        }]
                    }), r && n.unshift({
                        nodeName: "script",
                        tagName: "script",
                        namespaceURI: "http://www.w3.org/1999/xhtml",
                        childNodes: [],
                        attrs: [{
                            name: "src",
                            value: "data:application/javascript;base64," + btoa(r + ";document.currentScript?.remove();")
                        }]
                    }), a && n.unshift({
                        nodeName: "script",
                        tagName: "script",
                        namespaceURI: "http://www.w3.org/1999/xhtml",
                        childNodes: [],
                        attrs: [{
                            name: "src",
                            value: "data:application/javascript;base64," + btoa(a + ";document.currentScript?.remove();")
                        }]
                    }), n) : (n = [`<script src="${t+(o?"?"+Math.floor(89999*Math.random()+1e4):"")}"></script>`, `<script src="${e+(o?"?"+Math.floor(89999*Math.random()+1e4):"")}"></script>`], this.ctx.config.assets.files.inject && n.unshift(`<script src="${this.ctx.config.assets.files.inject+(o?"?"+Math.floor(89999*Math.random()+1e4):"")}"></script>`), s && n.unshift(`<script src="${"data:application/javascript;base64,"+btoa(`self.__dynamic$cookies = atob("${btoa(s)}");document.currentScript?.remove();`)}"></script>`), r && n.unshift(`<script src="${"data:application/javascript;base64,"+btoa(r+";document.currentScript?.remove();")}"></script>`), a && n.unshift(`<script src="${"data:application/javascript;base64,"+btoa(a+";document.currentScript?.remove();")}"></script>`), n)
                }
                class xt {
                    constructor(e) {
                        this.generateHead = gt, this.config = [{
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
                            "new": "nointegrity"
                        }, {
                            elements: ["script", "link"],
                            tags: ["nonce"],
                            action: "rewrite",
                            "new": "nononce"
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
                    iterate(i, s) {
                        ! function r(e = i) {
                            for (var t = 0; t < e.childNodes.length; t++) s(e.childNodes[t]), e.childNodes[t].childNodes && e.childNodes[t].childNodes.length && r(e.childNodes[t])
                        }(i)
                    }
                    rewrite(e, t, i = []) {
                        return (e = Array.isArray(e) ? e[0] : e) && (!(e = e.toString()).match(/<(html|script|style)[^>]*>/g) && e.match(/<\!DOCTYPE[^>]*>/gi) ? e : e.replace(/(<!DOCTYPE html>|<html(.*?)>)/im, `$1${i.join("")}
`).replace(/<(script|link)\b[^>]*>/g, (e, t) => e.replace(/\snonce\s*=\s*"[^"]*"/, e => e.replace("nonce", "nononce")).replace(/\sintegrity\s*=\s*"[^"]*"/, e => e.replace("integrity", "nointegrity"))))
                    }
                }
                class vt {
                    constructor(e) {
                        this.ctx = e.ctx
                    }
                    rewrite(e, t, i = 0) {
                        const s = this;
                        return e && e.toString().replace(/((@import ['"`]+|url\(['"`]?)(.*?)(['"`]?\)|['"`]+))/gim, function() {
                            try {
                                return arguments[0].replace(arguments[3], s.ctx.url.encode(arguments[3], t))
                            } catch (e) {}
                        })
                    }
                }

                function bt(e, t) {
                    "object" == typeof e && t && ! function r(t, e, i) {
                        if ("object" != typeof t || !i) return;
                        t.parent = e;
                        i(t, e, i);
                        for (const s in t) "parent" !== s && (Array.isArray(t[s]) ? t[s].forEach(e => {
                            e && r(e, t, i)
                        }) : t[s] && r(t[s], t, i));
                        "function" == typeof t.iterateEnd && t.iterateEnd()
                    }(e, null, t)
                }

                function _t(e, i = {}, s, r) {
                    var t = this.ctx.modules.acorn.parse(e.toString(), {
                        sourceType: i.module ? "module" : "script",
                        allowImportExportEverywhere: !0,
                        allowAwaitOutsideFunction: !0,
                        allowReturnOutsideFunction: !0,
                        ecmaVersion: "latest",
                        preserveParens: !0,
                        loose: !0,
                        allowReserved: !0
                    });
                    return this.iterate(t, (e, t = null) => {
                        this.emit(e, e.type, t, s, r, i)
                    }), e = this.ctx.modules.estree.generate(t)
                }

                function wt(i) {
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
                        arguments: [i.object || i, {
                            type: "Identifier",
                            name: "self",
                            __dynamic: !0
                        }]
                    }).forEach(([e, t]) => i[e] = t)
                }

                function St(e) {
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
                const kt = function(e, t, i = {}, s = {}, r = {}, n = {}) {
                    if (!e.__dynamic) {
                        switch (t) {
                            case "Identifier":
                                var [a, o = {}] = [e, i];
                                if ("string" == typeof a.name && !0 !== a.__dynamic && ["parent", "top", "postMessage", "opener", "window", "self", "globalThis", "parent", "location"].includes(a.name) && ("AssignmentExpression" != o.type || o.left != a || "location" != a.name) && ("CallExpression" != o.type || o.callee != a) && ("MemberExpression" != o.type || o.object === a || ["document", "window", "self", "globalThis"].includes(o.object.name)) && "FunctionDeclaration" != o.type && "VariableDeclaration" != o.type && !("VariableDeclarator" == o.type && o.id == a || "LabeledStatement" == o.type || "Property" == o.type && o.key == a || "ArrowFunctionExpression" == o.type && o.params.includes(a) || "FunctionExpression" == o.type && o.params.includes(a) || "FunctionExpression" == o.type && o.id == a || "CatchClause" == o.type && o.param == a || "ContinueStatement" == o.type || "BreakStatement" == o.type || "AssignmentExpression" == o.type && o.left == a || "UpdateExpression" == o.type || "UpdateExpression" == o.type || "ForInStatement" == o.type && o.left == a || "MethodDefinition" == o.type && o.key == a || "AssignmentPattern" == o.type && o.left == a || "NewExpression" == o.type || "NewExpression" == (null == (h = null == o ? void 0 : o.parent) ? void 0 : h.type) || "UnaryExpression" == o.type && o.argument == a || "Property" == o.type && 1 == o.shorthand && o.value == a)) "__dynamic" == a.name ? a.name = "undefined" : "eval" == a.name && o.right !== a ? a.name = "__dynamic$eval" : a.name = `dg$(${a.name})`;
                                break;
                            case "MemberExpression":
                                ! function(e, t = {}, i = {}) {
                                    var s;
                                    if (e.object.name += "", "AssignmentExpression" !== t.type && t.left !== e) {
                                        if ("postMessage" == e.property.value && "CallExpression" == t.type && t.callee == e) return wt(e);
                                        if ("postMessage" == e.object.value && "CallExpression" == t.type && t.callee == e) return wt(e);
                                        if (("postMessage" == e.property.name || "postMessage" == e.object.name) && "Super" !== e.object.type) return s = null == (s = e.object) ? void 0 : s.name, e.type = "CallExpression", e.callee = {
                                            type: "Identifier",
                                            name: "__dynamic$message"
                                        }, e.arguments = [{
                                            type: "Identifier",
                                            name: s
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
                                    }), "location" == e.property.name) && "BinaryExpression" !== t.type && "AssignmentExpression" !== t.type && (e.property.__dynamic = !0, e.__dynamic = !0, s = Object.assign({}, e), e.type = "CallExpression", e.callee = {
                                        type: "Identifier",
                                        name: "dg$",
                                        __dynamic: !0
                                    }, e.arguments = [s], e.__dynamic = !0), e.computed && (e.property = {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "dp$"
                                        },
                                        arguments: [e.property],
                                        __dynamic: !0
                                    })
                                }(e, i, n);
                                break;
                            case "Literal":
                                [h, o = {}] = [e, i], h.value instanceof String && ("__dynamic" == h.value && (h.value = "undefined"), ["location", "parent", "top", "postMessage"].includes(h.value)) && ("postMessage" == h.value && "AssignmentExpression" != o.type && o.left != h && wt(h), "location" == h.value && (h.value = "__dynamic$location"), "__dynamic" == h.value && (h.value = "undefined"), "eval" == h.value) && (h.value = "__dynamic$eval");
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
                                            "eval" == e.callee.name && St(e)
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
                                            "eval" == e.callee.object.name && St(e)
                                        }
                                        0 < e.arguments.length && e.arguments.length
                                    }
                                }(e, i);
                                break;
                            case "AssignmentExpression":
                                "Identifier" == (a = e).left.type && !0 !== a.left.__dynamic && "location" == a.left.name && (l = structuredClone(a.left), p = structuredClone(a.right), a.right.type = "CallExpression", a.right.callee = {
                                    type: "Identifier",
                                    name: "ds$"
                                }, a.right.arguments = [l, p]);
                                break;
                            case "ThisExpression":
                                break;
                            case "Property":
                                "ObjectPattern" != (l = e).parent.type && "AssignmentExpression" != (null == (p = null == (p = l.parent) ? void 0 : p.parent) ? void 0 : p.type) && (l.shorthand = !1);
                                break;
                            case "VariableDeclarator":
                                "Identifier" === (c = e).id.type && !0 !== c.id.__dynamic && c.id.name
                        }
                        var c, l, p, h, u;
                        [t, s = {}, r = {}, u = {}] = [e, i, s, r], "Literal" != t.type || "ImportDeclaration" != s.type && "ExportNamedDeclaration" != s.type && "ExportAllDeclaration" != s.type || (s = t.value + "", t.value = r.url.encode(t.value, u.meta), t.raw = t.raw.replace(s, t.value), t.__dynamic = !0), "ImportExpression" == t.type && (t.source = {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "__dynamic$import"
                            },
                            arguments: [t.source, {
                                type: "Literal",
                                __dynamic: !0,
                                value: r.meta.href
                            }]
                        }, t.__dynamic = !0)
                    }
                };
                class Et {
                    constructor(e) {
                        this.iterate = bt, this.process = _t, this.emit = kt, this.ctx = e.ctx
                    }
                    rewrite(e, t = {}, i = !0, s = {}) {
                        if (e && !(e instanceof Object || (e = e.toString()).includes("/* dynamic.js */"))) {
                            e = `/* dynamic.js */ 

` + e;
                            try {
                                try {
                                    e = this.process(e, t, Object.assign({
                                        module: !0
                                    }, this.ctx), s)
                                } catch (r) {
                                    e = this.process(e, t, Object.assign({
                                        module: !1
                                    }, this.ctx), s)
                                }
                            } catch (r) {}
                            i && (e = `
      if (typeof self !== undefined && typeof self.importScripts == 'function' && typeof self.__dynamic == 'undefined') importScripts('/dynamic/dynamic.config.js', '/dynamic/dynamic.handler.js?'+Math.floor(Math.random()*(99999-10000)+10000));

      ` + e)
                        }
                        return e
                    }
                }
                class Ct {
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
                            "delete": ["serviceworker"]
                        }, this.ctx = e.ctx
                    }
                    rewrite(e, t) {
                        var i, s = JSON.parse(e);
                        for (i in this.config)
                            if ("rewrite" == i)
                                for (var [r, n] of this.config[i])
                                    if ("urlit" == n && s[r])
                                        for (var a = 0; a < s[r].length; a++) s[r][a].src = this.ctx.url.encode(s[r][a].src, t);
                                    else if ("urlev" == n && s[r])
                            for (a = 0; a < s[r].length; a++) s[r][a].url = this.ctx.url.encode(s[r][a].url, t);
                        else "url" == n && s[r] ? s[r] = this.ctx.url.encode(s[r], t) : "url" != n && "urlit" != n && "urlev" != n && (s[r] = s[r] + n);
                        else if ("delete" == i)
                            for (var r of this.config[i]) s[r] && delete s[r];
                        return JSON.stringify(s)
                    }
                }
                const At = {
                    encode(e, i) {
                        return e && (e.toString() ? e.split(", ").map(e => e.split(" ").map((e, t) => 0 == t ? i.url.encode(e, i.baseURL || i.meta) : e).join(" ")).join(", ") : e)
                    },
                    decode(e) {
                        return e
                    }
                };
                class Pt {
                    constructor(e) {
                        this.ctx = e, this.html = new xt(this), this.srcset = At, this.js = new Et(this), this.css = new vt(this), this.man = new Ct(this)
                    }
                }
                const It = Pt;
                var Ot = undefined && undefined.__awaiter || function(e, t, o, c) {
                    return new(o = o || Promise)(function(i, s) {
                        function r(e) {
                            try {
                                a(c.next(e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function n(e) {
                            try {
                                a(c["throw"](e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function a(e) {
                            var t;
                            e.done ? i(e.value) : ((t = e.value) instanceof o ? t : new o(function(e) {
                                e(t)
                            })).then(r, n)
                        }
                        a((c = c.apply(e, t || [])).next())
                    })
                };

                function Nt(t) {
                    return Ot(this, void 0, void 0, function*() {
                        var e = new URL(t.url).searchParams.get("url");
                        return new Response("", {
                            status: 301,
                            headers: {
                                location: location.origin + this.ctx.config.prefix + this.ctx.encoding.encode(e)
                            }
                        })
                    })
                }

                function Tt({
                    url: e
                }) {
                    return !e.toString().substr(location.origin.length, (this.ctx.config.prefix + "route").length).startsWith(this.ctx.config.prefix + "route")
                }

                function Lt({
                    url: e
                }) {
                    return !e.toString().substr(location.origin.length, this.ctx.config.prefix.length).startsWith(this.ctx.config.prefix)
                }
                var Mt = undefined && undefined.__awaiter || function(e, t, o, c) {
                        return new(o = o || Promise)(function(i, s) {
                            function r(e) {
                                try {
                                    a(c.next(e))
                                } catch (t) {
                                    s(t)
                                }
                            }

                            function n(e) {
                                try {
                                    a(c["throw"](e))
                                } catch (t) {
                                    s(t)
                                }
                            }

                            function a(e) {
                                var t;
                                e.done ? i(e.value) : ((t = e.value) instanceof o ? t : new o(function(e) {
                                    e(t)
                                })).then(r, n)
                            }
                            a((c = c.apply(e, t || [])).next())
                        })
                    },
                    Rt = undefined && undefined.__asyncValues || function(a) {
                        var e, t;
                        if (Symbol.asyncIterator) return (e = a[Symbol.asyncIterator]) ? e.call(a) : (a = "function" == typeof __values ? __values(a) : a[Symbol.iterator](), t = {}, i("next"), i("throw"), i("return"), t[Symbol.asyncIterator] = function() {
                            return this
                        }, t);
                        throw new TypeError("Symbol.asyncIterator is not defined.");

                        function i(n) {
                            t[n] = a[n] && function(r) {
                                return new Promise(function(e, t) {
                                    var i, s;
                                    r = a[n](r), i = e, e = t, s = r.done, t = r.value, Promise.resolve(t).then(function(e) {
                                        i({
                                            value: e,
                                            done: s
                                        })
                                    }, e)
                                })
                            }
                        }
                    };

                function Bt(n, a, o) {
                    var c, l, p, h;
                    return Mt(this, void 0, void 0, function*() {
                        for (const r in n)
                            if (-1 !== this.ctx.headers.csp.indexOf(r.toLowerCase()) && delete n[r], "location" == r.toLowerCase()) n[r] = this.ctx.url.encode(n[r], a);
                            else if ("set-cookie" === r.toLowerCase()) {
                            Array.isArray(n[r]) ? n[r] = n[r].map(e => this.ctx.modules.setCookieParser(e, {
                                decodeValues: !1
                            })[0]) : n[r] = this.ctx.modules.setCookieParser(n[r], {
                                decodeValues: !1
                            });
                            try {
                                for (var e, t = !0, i = (l = void 0, Rt(n[r])); e = yield i.next(), !(c = e.done);) {
                                    h = e.value, t = !1;
                                    try {
                                        yield o.set(a.host, this.ctx.modules.cookie.serialize(h.name, h.value, Object.assign(Object.assign({}, h), {
                                            encode: e => e
                                        })));
                                        continue
                                    } finally {
                                        t = !0
                                    }
                                }
                            } catch (s) {
                                l = {
                                    error: s
                                }
                            } finally {
                                try {
                                    t || c || !(p = i["return"]) || (yield p.call(i))
                                } finally {
                                    if (l) throw l.error
                                }
                            }
                            delete n[r]
                        }
                        return new Headers(n)
                    })
                }

                function Vt(t, e, i, s) {
                    let r = i["referrer"];
                    if (["origin", "Origin", "host", "Host", "referer", "Referer"].forEach(e => {
                            t[e] && delete t[e]
                        }), t.Origin = e.protocol + "//" + e.host + (e.port ? ":" + e.port : ""), t.Host = e.host + (e.port ? ":" + e.port : ""), t.Referer = e.href, "strict-origin-when-cross-origin" == i.referrerPolicy && (t.Referer = `${e.protocol}//${e.host}/`), "origin" == i.referrerPolicy && e.origin && (r = e.origin + "/"), s) {
                        switch (i.credentials) {
                            case "omit":
                                break;
                            case "same-origin":
                                i.client && e.origin == i.client.__dynamic$location.origin && (t.Cookie = s), i.client || (t.Cookie = s);
                                break;
                            case "include":
                                t.Cookie = s
                        }
                        t.Cookie = s
                    }
                    if (r && r != location.origin + "/") try {
                        t.Referer = this.ctx.url.decode(r), "strict-origin-when-cross-origin" == i.referrerPolicy && (t.Referer = new URL(this.ctx.url.decode(r)).origin), t.Origin = new URL(this.ctx.url.decode(r)).origin
                    } catch (n) {}
                    return i.client && (t.Origin = i.client.__dynamic$location.origin, t.Referer = i.client.__dynamic$location.href, "strict-origin-when-cross-origin" == i.referrerPolicy) && (t.Referer = i.client.__dynamic$location.origin), this.ctx.config.tab && this.ctx.config.tab.ua && (delete t["user-agent"], delete t["User-Agent"], t["user-agent"] = this.ctx.config.tab.ua), t["sec-fetch-dest"] = i.destination || "empty", t["sec-fetch-mode"] = i.mode || "cors", t["sec-fetch-site"] = i.client ? i.client.__dynamic$location.origin == e.origin ? i.client.__dynamic$location.port == e.port ? "same-origin" : "same-site" : "cross-origin" : "none", "navigate" == i.mode && (t["sec-fetch-site"] = "same-origin"), t["sec-fetch-user"] = "?1", new Headers(t)
                }

                function Dt(e) {
                    return Object.assign(Object.create(Object.getPrototypeOf(e)), e)
                }

                function jt(e) {
                    try {
                        if (new new Proxy(e, {
                                construct: () => ({})
                            }), Object.getOwnPropertyNames(e).includes("arguments")) return !0;
                        throw new Error("")
                    } catch (t) {
                        return !1
                    }
                }

                function Ft(e) {
                    return e.url.toString().substr(location.origin.length, e.url.toString().length).startsWith(self.__dynamic$config.assets.prefix)
                }
                var Ut = undefined && undefined.__awaiter || function(e, t, o, c) {
                    return new(o = o || Promise)(function(i, s) {
                        function r(e) {
                            try {
                                a(c.next(e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function n(e) {
                            try {
                                a(c["throw"](e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function a(e) {
                            var t;
                            e.done ? i(e.value) : ((t = e.value) instanceof o ? t : new o(function(e) {
                                e(t)
                            })).then(r, n)
                        }
                        a((c = c.apply(e, t || [])).next())
                    })
                };

                function Wt(s) {
                    return Ut(this, void 0, void 0, function*() {
                        let e;
                        var t;
                        let i = yield(e = "development" !== self.__dynamic$config.mode && (t = yield caches.open("__dynamic$files")) && (yield t.match(s.url)) || (yield fetch(s))).blob();
                        return (s.url.startsWith(location.origin + "/dynamic/dynamic.config.js") || s.url.startsWith(location.origin + "/dynamic/dynamic.client.js")) && (i = new Blob([(yield i.text()) + `
self.document?.currentScript?.remove();`], {
                            type: "application/javascript"
                        })), new Response(i, {
                            headers: e.headers,
                            status: e.status,
                            statusText: e.statusText
                        })
                    })
                }
                var $t = undefined && undefined.__awaiter || function(e, t, o, c) {
                    return new(o = o || Promise)(function(i, s) {
                        function r(e) {
                            try {
                                a(c.next(e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function n(e) {
                            try {
                                a(c["throw"](e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function a(e) {
                            var t;
                            e.done ? i(e.value) : ((t = e.value) instanceof o ? t : new o(function(e) {
                                e(t)
                            })).then(r, n)
                        }
                        a((c = c.apply(e, t || [])).next())
                    })
                };

                function qt(e, t) {
                    return $t(this, void 0, void 0, function*() {})
                }
                var Ht = undefined && undefined.__awaiter || function(e, t, o, c) {
                    return new(o = o || Promise)(function(i, s) {
                        function r(e) {
                            try {
                                a(c.next(e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function n(e) {
                            try {
                                a(c["throw"](e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function a(e) {
                            var t;
                            e.done ? i(e.value) : ((t = e.value) instanceof o ? t : new o(function(e) {
                                e(t)
                            })).then(r, n)
                        }
                        a((c = c.apply(e, t || [])).next())
                    })
                };
                class Gt {
                    constructor(e) {
                        this.rawHeaders = {}, this.headers = new Headers({}), this.status = 200, this.statusText = "OK", this.body = e
                    }
                    blob() {
                        return Ht(this, void 0, void 0, function*() {
                            return this.body
                        })
                    }
                    text() {
                        return Ht(this, void 0, void 0, function*() {
                            return yield this.body.text()
                        })
                    }
                }

                function zt(e) {
                    var t = this.ctx.encoding,
                        t = "object" == typeof this.ctx.config.encoding ? Object.assign(Object.assign({}, t), this.ctx.encoding) : Object.assign({}, this.ctx.encoding[this.ctx.config.encoding]);
                    return this.ctx.encoding = Object.assign(Object.assign({}, this.ctx.encoding), t), this.ctx.encoding
                }

                function Kt(e, t, i) {
                    if (!e.url.startsWith("http")) return e.url;
                    let s = e.url.toString();
                    return e.url.startsWith(location.origin) && (s = s.substr(self.location.origin.length)), s = new URL(s, new URL(t.__dynamic$location.href)).href, this.ctx.url.encode(s, i)
                }
                class Qt {
                    constructor(e) {
                        this.route = Nt, this.routePath = Tt, this.path = Lt, this.resHeader = Bt, this.reqHeader = Vt, this.clone = Dt, this["class"] = jt, this.file = Ft, this.edit = Wt, this.error = qt, this.encode = zt, this.rewritePath = Kt, this.about = Gt, this.ctx = e
                    }
                }
                const Xt = Qt;

                function Yt(e, t) {
                    var i, s, r, n, a, o;
                    if (!e) return e;
                    if ((e = new String(e).toString()).startsWith("about:blank")) return location.origin + this.ctx.config.prefix + e;
                    if (!e.match(this.ctx.regex.ProtocolRegex) && e.match(/^([a-zA-Z0-9\-]+)\:\/\//g)) return e;
                    if (e.startsWith("chrome-extension://")) return e;
                    if ((e = e.match(this.ctx.regex.WeirdRegex) && (i = this.ctx.regex.WeirdRegex.exec(e)) ? i[2] : e).startsWith(location.origin + this.ctx.config.prefix) || e.startsWith(this.ctx.config.prefix)) return e;
                    if (e.startsWith(location.origin + this.ctx.config.assets.prefix + "dynamic.")) return e;
                    if (e.match(this.ctx.regex.BypassRegex)) return e;
                    if (e.match(this.ctx.regex.DataRegex)) {
                        try {
                            (i = this.ctx.regex.DataRegex.exec(e)) && ([s, r, n, a, o] = i, o = "base64" == a ? this.ctx.modules.base64.atob(decodeURIComponent(o)) : decodeURIComponent(o), r && ("text/html" == r ? o = this.ctx.rewrite.html.rewrite(o, t, this.ctx.rewrite.html.generateHead(location.origin + "/dynamic/dynamic.client.js", location.origin + "/dynamic/dynamic.config.js", "", `window.__dynamic$url = "${t.href}"; window.__dynamic$parentURL = "${location.href}";`)) : "text/css" == r ? o = this.ctx.rewrite.css.rewrite(o, t) : "text/javascript" != r && "application/javascript" != r || (o = this.ctx.rewrite.js.rewrite(o, t))), o = "base64" == a ? this.ctx.modules.base64.btoa(o) : encodeURIComponent(o), e = n ? a ? `data:${r};${n};${a},` + o : `data:${r};${n},` + o : a ? `data:${r};${a},` + o : `data:${r},` + o)
                        } catch (c) {}
                        return e
                    }
                    return e = new String(e).toString(), t.href.match(this.ctx.regex.BypassRegex) && (e = new URL(e, new URL((this.ctx.parent.__dynamic || this.ctx).meta.href)).href), e = new URL(e, t.href), ((null == (i = this.ctx._location) ? void 0 : i.origin) || ("null" == location.origin ? location.ancestorOrigins[0] : location.origin)) + this.ctx.config.prefix + (this.ctx.encoding.encode(e.origin + e.pathname) + e.search + e.hash)
                }

                function Zt(e) {
                    if (e && !(e = new String(e).toString()).match(this.ctx.regex.BypassRegex)) {
                        var t = e.indexOf(this.ctx.config.prefix);
                        if (-1 != t) {
                            try {
                                if (t = (e = new URL(e, new URL(self.location.origin)).href).indexOf(this.ctx.config.prefix), "about:blank" == e.slice(t + this.ctx.config.prefix.length).trim()) return "about:blank";
                                var i = new URL(e).search + new URL(e).hash || "",
                                    s = new URL(this.ctx.encoding.decode(e.slice(t + this.ctx.config.prefix.length).replace("https://", "https:/").replace("https:/", "https://").split("?")[0]))
                            } catch (r) {
                                return e
                            }
                            e = s.origin + s.pathname + i + (new URL(e).search ? s.search.replace("?", "&") : s.search)
                        }
                    }
                    return e
                }
                class Jt {
                    constructor(e) {
                        this.encode = Yt, this.decode = Zt, this.ctx = e
                    }
                }
                const ei = Jt;

                function ti(e) {
                    for (var t in e = new URL(e.href)) this.ctx.meta[t] = e[t];
                    return !0
                }
                class ii extends class {
                    constructor() {}
                } {
                    constructor(e) {
                        super(), this.load = ti, this.ctx = e
                    }
                }
                const si = ii;
                class ri {
                    constructor(e = "", t = new Request("")) {
                        this.headers = new Headers({}), this.redirect = "manual", this.body = null, this.method = "GET", t.headers && (this.headers = t.headers), t.redirect && (this.redirect = t.redirect), t.body && (this.body = t.body), this.method = t.method || "GET", this.url = new String(e)
                    }
                    get init() {
                        return {
                            headers: this.headers || new Headers({}),
                            redirect: this.redirect || "manual",
                            body: this.body || null,
                            method: this.method || "GET"
                        }
                    }
                }
                class ni extends Response {
                    constructor(e = "", t = new Response("")) {
                        super(e, t), this.status = 200, this.statusText = "OK", this.headers = new Headers({}), this.body = e, t.status && (this.status = t.status), t.statusText && (this.statusText = t.statusText), t.headers && (this.headers = t.headers)
                    }
                    get init() {
                        return {
                            headers: this.headers || new Headers({}),
                            statusText: this.statusText || 200,
                            body: this.body || new Blob([]),
                            status: this.statusText || "OK"
                        }
                    }
                }
                class ai {
                    constructor(e) {
                        this.Request = ri, this.Response = ni, this.ctx = e
                    }
                }
                const oi = ai,
                    ci = /^(#|about:|mailto:|blob:|javascript:)/g,
                    li = /^data:([a-z\/A-Z0-9\-\+]+);?(charset\=[\-A-Za-z0-9]+)?;?(base64)?[;,]*(.*)/g,
                    pi = /^([\/A-Za-z0-9\-%]+)(http[s]?:\/\/.*)/g;
                class hi {
                    constructor(e) {
                        this.BypassRegex = ci, this.DataRegex = li, this.WeirdRegex = pi, this.ctx = e
                    }
                }
                class ui {
                    constructor(e) {
                        this.ctx = e
                    }
                }
                const di = ui,
                    fi = {
                        csp: ["cross-origin-embedder-policy", "cross-origin-opener-policy", "cross-origin-resource-policy", "content-security-policy", "content-security-policy-report-only", "expect-ct", "feature-policy", "origin-isolation", "strict-transport-security", "upgrade-insecure-requests", "x-content-type-options", "x-frame-options", "x-permitted-cross-domain-policies", "x-xss-protection"],
                        status: {
                            empty: [204, 101, 205, 304]
                        },
                        method: {
                            body: ["GET", "HEAD"]
                        }
                    };

                function mi(e, t = "") {
                    return "text/css" === (this.ctx.modules.mime.contentType(t || e.pathname) || "text/css").split(";")[0]
                }

                function yi(e, t = "", i = "") {
                    return t || this.ctx.modules.mime.contentType(e.pathname) != e.pathname ? "text/html" === (this.ctx.modules.mime.contentType(t || e.pathname) || "text/html").split(";")[0] || i.trim().match(/\<\!(doctype|DOCTYPE) html\>/g) : i.trim().match(/<(html|script|body)[^>]*>/g) && !!(-1 < (t = i.trim().indexOf((i.trim().match(/<(html|script|body)[^>]*>/g) || [])[0])) && t < 100)
                }

                function gi(e, t = "") {
                    return !(!e.pathname.endsWith(".js") || "text/plain" != t) || "text/javascript" == (t = (this.ctx.modules.mime.contentType(t || e.pathname) || "application/javascript").split(";")[0]) || "application/javascript" == t || "application/x-javascript" == t
                }
                class xi {
                    constructor(e) {
                        this.html = yi, this.js = gi, this.css = mi, this.ctx = e
                    }
                }
                const vi = xi;
                var M = undefined && undefined.__awaiter || function(e, t, o, c) {
                    return new(o = o || Promise)(function(i, s) {
                        function r(e) {
                            try {
                                a(c.next(e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function n(e) {
                            try {
                                a(c["throw"](e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function a(e) {
                            var t;
                            e.done ? i(e.value) : ((t = e.value) instanceof o ? t : new o(function(e) {
                                e(t)
                            })).then(r, n)
                        }
                        a((c = c.apply(e, t || [])).next())
                    })
                };
                const R = {
                    open: () => M(void 0, void 0, void 0, function*() {
                        return ae("__dynamic$cookies", 1, {
                            upgrade(e) {
                                return M(this, void 0, void 0, function*() {
                                    yield e.createObjectStore("__dynamic$cookies")
                                })
                            }
                        })
                    }),
                    set: (i, s, r) => M(void 0, void 0, void 0, function*() {
                        var e, t;
                        if (((i = s.domain ? s.domain : i).startsWith(".") && (i = i.slice(1)), s.expires) && new Date(s.expires) < new Date) return R.remove(i, s, r);
                        return yield(yield r).put("__dynamic$cookies", (e = yield(yield r).get("__dynamic$cookies", i), t = s, (e = e || []).find(e => e.name == t.name) ? e[e.findIndex(e => e.name == t.name)] = {
                            name: t.name,
                            value: t.value,
                            expires: t.expires
                        } : e.push({
                            name: t.name,
                            value: t.value,
                            expires: t.expires
                        }), e), i), !0
                    }),
                    get: (a, o) => M(void 0, void 0, void 0, function*() {
                        var e = a.replace(/^(.*\.)?([^.]*\..*)$/g, "$2"),
                            t = (yield(yield o).get("__dynamic$cookies", a)) || [];
                        if (a !== e && a !== "." + e) {
                            var i = yield(yield o).get("__dynamic$cookies", e);
                            if (i)
                                for (var {
                                        name: s,
                                        value: r,
                                        expires: n
                                    }
                                    of i) {
                                    if (n)
                                        if (new Date(n) <= new Date) {
                                            R.remove(a, i.find(e => e.name == s && e.value == r && e.expires == n), o);
                                            continue
                                        } t.find(e => e.name == s && e.value == r) || t.push({
                                        name: s,
                                        value: r,
                                        expires: n || new Date(1e13)
                                    })
                                }
                        }
                        return t
                    }),
                    remove: (t, i, s) => M(void 0, void 0, void 0, function*() {
                        (t = i.domain ? i.domain : t).startsWith(".") && (t = t.slice(1));
                        var e = yield(yield s).get("__dynamic$cookies", t);
                        return !!e && (e = e.filter(e => e.name !== i.name), yield(yield s).put("__dynamic$cookies", e, t), !0)
                    }),
                    update: (r, n) => M(void 0, void 0, void 0, function*() {
                        var e = r.replace(/^(.*\.)?([^.]*\..*)$/g, "$2"),
                            e = yield(yield n).get("__dynamic$cookies", e);
                        if (e)
                            for (var {
                                    name: t,
                                    value: i,
                                    expires: s
                                }
                                of e) s && new Date(s) <= new Date && R.remove(r, {
                                name: t,
                                value: i,
                                expires: s
                            }, n);
                        return e
                    })
                };
                var bi = undefined && undefined.__awaiter || function(e, t, o, c) {
                    return new(o = o || Promise)(function(i, s) {
                        function r(e) {
                            try {
                                a(c.next(e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function n(e) {
                            try {
                                a(c["throw"](e))
                            } catch (t) {
                                s(t)
                            }
                        }

                        function a(e) {
                            var t;
                            e.done ? i(e.value) : ((t = e.value) instanceof o ? t : new o(function(e) {
                                e(t)
                            })).then(r, n)
                        }
                        a((c = c.apply(e, t || [])).next())
                    })
                };
                class _i {
                    constructor(e) {
                        this.db = R, this.ctx = e
                    }
                    get(t) {
                        return bi(this, void 0, void 0, function*() {
                            this._db || (this._db = this.db.open());
                            var e = yield R.get(t, this._db);
                            return [e = []] = [e], e.map(e => e.name + "=" + e.value).join("; ")
                        })
                    }
                    set(e, t = "") {
                        return bi(this, void 0, void 0, function*() {
                            return t = this.ctx.modules.setCookieParser.parse(t, {
                                decodeValues: !1
                            })[0], this._db || (this._db = this.db.open()), yield R.set(e, t, this._db)
                        })
                    }
                    open() {
                        return bi(this, void 0, void 0, function*() {
                            yield R.open()
                        })
                    }
                    update(e) {
                        return bi(this, void 0, void 0, function*() {
                            return this._db || (this._db = this.db.open()), yield R.update(e, this._db)
                        })
                    }
                }
                const wi = {
                        encode: (e, i = 2) => e && encodeURIComponent(e.split("").map((e, t) => t % i ? String.fromCharCode(e.charCodeAt(0) ^ i) : e).join("")),
                        decode: (e, i = 2) => e && decodeURIComponent(e).split("").map((e, t) => t % i ? String.fromCharCode(e.charCodeAt(0) ^ i) : e).join("")
                    },
                    Si = {
                        encode: e => e && encodeURIComponent(e),
                        decode: e => e && decodeURIComponent(e)
                    },
                    ki = {
                        encode: i => {
                            if (!i) return i;
                            let s = "";
                            for (let t = 0; t < i.length; t++) {
                                var r, n = i[t];
                                let e = n;
                                "a" <= n && n <= "z" ? (r = n.charCodeAt(0) + 3, e = String.fromCharCode((r - 97) % 26 + 97)) : "A" <= n && n <= "Z" && (r = n.charCodeAt(0) + 3, e = String.fromCharCode((r - 65) % 26 + 65)), s += e
                            }
                            return encodeURIComponent(s)
                        },
                        decode: e => {
                            if (!e) return e;
                            var i = decodeURIComponent(e);
                            let s = "";
                            for (let t = 0; t < i.length; t++) {
                                var r, n = i[t];
                                let e = n;
                                "a" <= n && n <= "z" ? (r = n.charCodeAt(0) - 3, e = String.fromCharCode((r - 97 + 26) % 26 + 97)) : "A" <= n && n <= "Z" && (r = n.charCodeAt(0) - 3, e = String.fromCharCode((r - 65 + 26) % 26 + 65)), s += e
                            }
                            return s
                        }
                    },
                    Ei = {
                        encode: e => e,
                        decode: e => e
                    },
                    Ci = {
                        encode: e => e && decodeURIComponent(he(e)),
                        decode: e => e && ue(e)
                    };
                class Ai {
                    on(e, t) {
                        this.listeners.push({
                            event: e,
                            cb: t
                        })
                    }
                    fire(e, t) {
                        var i, s = !1;
                        for (i of this.listeners) i.event === e && (s = !0, t = i.cb(...t));
                        return s && t ? t : null
                    }
                    constructor(e) {
                        this.modules = new yt(this), this.util = new Xt(this), this.http = new oi(this), this.meta = new si(this), this.rewrite = new It(this), this.url = new ei(this), this.is = new vi(this), this.cookies = new _i(this), this.regex = new hi(this), this.headers = fi, this.encoding = F, this.middleware = new di(this), this.listeners = [], e && !this.config && (this.config = e), e && this.util.encode(self)
                    }
                }
            }
        },
        __webpack_module_cache__ = {};

    function __webpack_require__(e) {
        var t = __webpack_module_cache__[e];
        return t !== undefined || (t = __webpack_module_cache__[e] = {
            exports: {}
        }, __webpack_modules__[e].call(t.exports, t, t.exports, __webpack_require__)), t.exports
    }
    __webpack_require__.d = (e, t) => {
        for (var i in t) __webpack_require__.o(t, i) && !__webpack_require__.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
        })
    }, __webpack_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), __webpack_require__.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    };
    var __webpack_exports__ = {};
    (() => {
        "use strict";
        var _global_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(734),
            __awaiter = undefined && undefined.__awaiter || function(e, t, o, c) {
                return new(o = o || Promise)(function(i, s) {
                    function r(e) {
                        try {
                            a(c.next(e))
                        } catch (t) {
                            s(t)
                        }
                    }

                    function n(e) {
                        try {
                            a(c["throw"](e))
                        } catch (t) {
                            s(t)
                        }
                    }

                    function a(e) {
                        var t;
                        e.done ? i(e.value) : ((t = e.value) instanceof o ? t : new o(function(e) {
                            e(t)
                        })).then(r, n)
                    }
                    a((c = c.apply(e, t || [])).next())
                })
            },
            __asyncValues = undefined && undefined.__asyncValues || function(a) {
                var e, t;
                if (Symbol.asyncIterator) return (e = a[Symbol.asyncIterator]) ? e.call(a) : (a = "function" == typeof __values ? __values(a) : a[Symbol.iterator](), t = {}, i("next"), i("throw"), i("return"), t[Symbol.asyncIterator] = function() {
                    return this
                }, t);
                throw new TypeError("Symbol.asyncIterator is not defined.");

                function i(n) {
                    t[n] = a[n] && function(r) {
                        return new Promise(function(e, t) {
                            var i, s;
                            r = a[n](r), i = e, e = t, s = r.done, t = r.value, Promise.resolve(t).then(function(e) {
                                i({
                                    value: e,
                                    done: s
                                })
                            }, e)
                        })
                    }
                }
            };
        ! function(self) {
            self.skipWaiting(), self.addEventListener("install", (event, cl) => __awaiter(this, void 0, void 0, function*() {
                var _a, e_1, _b, _c, _d, e_2, _e, _f;
                const log = self.__dynamic$config.logLevel || 0;
                if (1 < log && console["development" == self.__dynamic$config.mode ? "group" : "groupCollapsed"]("Dynamic Install Sequence:"), "object" == typeof self.ORIGINS)
                    if (self.ORIGINS.length)
                        if ("*" == self.ORIGINS[0]) console.log("Wildcard Origin Accepted");
                        else {
                            if (!self.ORIGINS.includes(location.origin)) return console.error("Illegal Origin: " + location.origin), console.log("Status: Aborting Install"), console.groupEnd(), yield self.registration.unregister();
                            1 < log && console.log("Origin Verified: " + location.origin)
                        }
                else console.warn("Warning: No Origins Specified");
                else "string" == typeof self.ORIGINS ? "*" == self.ORIGINS && 1 < log && console.log("Wildcard Origin Accepted") : 0 < log && console.warn("Warning: No Origins Specified");
                1 < log && console.log("ServiceWorker Installed:", event), 1 < log && console.log("Configuration Loaded:", self.__dynamic$config), yield self.skipWaiting(), 1 < log && console.groupCollapsed("Loading Dynamic Modules:");
                try {
                    for (var _g = !0, _h = __asyncValues([
                            ["html", "dynamic.html.js"]
                        ]), _j; _j = yield _h.next(), _a = _j.done, !_a;) {
                        _c = _j.value, _g = !1;
                        try {
                            var i = _c,
                                [name, url] = i;
                            url = new URL(url, new URL(location.origin + self.__dynamic$config.assets.prefix + "dynamic.worker.js")).href, self[name] = fetch(url).then(e => (1 < log && console.log("Loaded Dynamic Module: " + name, e), self[name] = e.text())).then(text => eval(text)), 1 < log && console.log("Loading: " + name, url);
                            continue
                        } finally {
                            _g = !0
                        }
                    }
                } catch (e_1_1) {
                    e_1 = {
                        error: e_1_1
                    }
                } finally {
                    try {
                        _g || _a || !(_b = _h["return"]) || (yield _b.call(_h))
                    } finally {
                        if (e_1) throw e_1.error
                    }
                }
                if (console.groupEnd(), "development" == self.__dynamic$config.mode) return console.groupEnd();
                const cache = yield caches.open("__dynamic$files");
                1 < log && console.groupCollapsed("Dynamic File Cache:");
                try {
                    for (var _k = !0, _l = __asyncValues(Object.values(self.__dynamic$config.assets.files)), _m; _m = yield _l.next(), _d = _m.done, !_d;) {
                        _f = _m.value, _k = !1;
                        try {
                            var i = _f;
                            if (i) {
                                var url = i;
                                url = new URL(url, new URL(location.origin + self.__dynamic$config.assets.prefix + "dynamic.worker.js")).href;
                                const res = yield fetch(url);
                                yield cache.put(url, res), 1 < log && console.log("Cache Installed: " + url.split("/").pop(), res)
                            }
                        } finally {
                            _k = !0
                        }
                    }
                } catch (e_2_1) {
                    e_2 = {
                        error: e_2_1
                    }
                } finally {
                    try {
                        _k || _d || !(_e = _l["return"]) || (yield _e.call(_l))
                    } finally {
                        if (e_2) throw e_2.error
                    }
                }
                console.groupEnd(), console.groupEnd()
            })), self.addEventListener("activate", e => {
                self.skipWaiting(), e.waitUntil(self.clients.claim())
            }), self.addEventListener("message", r => __awaiter(this, void 0, void 0, function*() {
                var e, t, i, s = r["data"];
                "createBlobHandler" == s.type && (e = new Response(s.blob, {
                    headers: {
                        "Content-Type": "text/html",
                        "Content-Length": s.blob.size,
                        "x-dynamic-location": s.location
                    }
                }), t = yield caches.open("__dynamic$blob"), i = __dynamic.config.prefix + "caches/" + s.url, yield t.put(i, e), self.clients.matchAll().then(e => {
                    e.forEach(e => {
                        e.postMessage({
                            url: i
                        })
                    })
                }))
            })), self.__dynamic$config || importScripts("/dynamic/dynamic.config.js");
            const __dynamic = new _global_bundle__WEBPACK_IMPORTED_MODULE_0__.TC(self.__dynamic$config),
                blockList = self.__dynamic$config.block || [];
            __dynamic.config = self.__dynamic$config, __dynamic.config.bare.path = "string" == typeof __dynamic.config.bare.path ? new URL(__dynamic.config.bare.path, self.location) : __dynamic.config.bare.path.map(e => new URL(e, self.location)), __dynamic.encoding = Object.assign(Object.assign({}, __dynamic.encoding), __dynamic.encoding[__dynamic.config.encoding || "none"]), self.__dynamic = __dynamic, self.Object.defineProperty(self.WindowClient.prototype, "__dynamic$location", {
                get() {
                    return new URL(__dynamic.url.decode(this.url))
                }
            }), self.Dynamic = class {
                constructor(e = self.__dynamic$config) {
                    this.listeners = [], this.middleware = __dynamic.middleware, this.on = self.__dynamic.on, this.fire = self.__dynamic.fire, __dynamic.bare = __dynamic.modules.bare.createBareClient(__dynamic.config.bare.path), self.__dynamic$config = e
                }
                route(t) {
                    return __awaiter(this, void 0, void 0, function*() {
                        var e = t["request"];
                        return !e.url.startsWith(__dynamic.config.bare.path.toString()) && (!!e.url.startsWith(location.origin + self.__dynamic$config.prefix) || !blockList.includes(e.url) && ("navigate" !== e.mode && (e.client = (yield self.clients.matchAll()).find(e => e.id == t.clientId)), e.url.startsWith(location.origin + self.__dynamic$config.prefix) ? void 0 : !!e.client && !!e.client.url.startsWith(location.origin + self.__dynamic$config.prefix)))
                    })
                }
                fetch(T) {
                    var L, M, R, B;
                    return __awaiter(this, void 0, void 0, function*() {
                        var i = T["request"];
                        __dynamic.modules.bowser.parse(navigator.userAgent).browser.name;
                        try {
                            if ("navigate" !== i.mode && (i.client = (yield self.clients.matchAll()).find(e => e.id == T.clientId)), __dynamic.util.file(i)) return yield __dynamic.util.edit(i);
                            if (i.url.startsWith(self.__dynamic$config.bare.path.toString())) return yield fetch(i);
                            if (__dynamic.util.path(i)) {
                                if (!i.client || !i.url.startsWith("http")) return yield fetch(i);
                                Object.defineProperty(i, "url", {
                                    value: __dynamic.util.rewritePath(i, i.client, new URL(self.__dynamic.url.decode(new URL(i.url))))
                                })
                            }
                            if (!__dynamic.util.routePath(i)) return yield __dynamic.util.route(i);
                            yield __dynamic.bare.working;
                            var s, r, n, a, o, c = new _global_bundle__WEBPACK_IMPORTED_MODULE_0__.TC(__dynamic.config),
                                l = (c.encoding = Object.assign(Object.assign({}, c.encoding), c.encoding[__dynamic.config.encoding || "none"]), c.on = (e, t) => self.__dynamic.on(e, t), c.fire = (e, ...t) => self.__dynamic.fire(e, t), c.fire("request", [i]));
                            if (l) return l;
                            if (i.url.startsWith(location.origin + __dynamic.config.prefix + "caches/")) return (s = yield(yield caches.open("__dynamic")).match(new URL(i.url).pathname)) ? (a = yield(n = yield s.blob()).text(), o = c.rewrite.html.generateHead(location.origin + self.__dynamic$config.assets.prefix + self.__dynamic$config.assets.files.client, location.origin + self.__dynamic$config.assets.prefix + self.__dynamic$config.assets.files.config, location.origin + self.__dynamic$config.assets.prefix + self.__dynamic$config.assets.files.config, "", `window.__dynamic$url = "${s.headers.get("x-dynamic-location")}"`), c.meta.load(new URL(s.headers.get("x-dynamic-location"))), r = c.is.html(c.meta, s.headers.get("content-type"), a) ? new Blob([c.rewrite.html.rewrite(a, c.meta, o)]) : n, new Response(r, {
                                status: s.status,
                                statusText: s.statusText,
                                headers: s.headers
                            })) : new Response(null, {
                                status: 201
                            });
                            if (c.meta.load(new URL(c.url.decode(new URL(i.url)))), -1 !== blockList.indexOf(c.meta.host)) return this.fire("blocked", [c.meta, i]) || new Response(null, {
                                status: 403,
                                statusText: "Forbidden"
                            });
                            var p = c.cookies,
                                h = (yield p.open(), yield p.update(c.meta.host), Object.fromEntries(i.headers.entries())),
                                u = __dynamic.util.reqHeader(h, c.meta, i, yield p.get((i.client ? i.client.__dynamic$location : c.meta).host)),
                                d = new __dynamic.http.Request(c.meta.href, {
                                    headers: u,
                                    redirect: i.redirect || "manual",
                                    method: i.method,
                                    credentials: i.credentials,
                                    body: null,
                                    cache: i.cache
                                });
                            let e; - 1 == __dynamic.headers.method.body.indexOf(i.method.toUpperCase()) && (d.body = yield i.blob()), e = "about:" !== c.meta.protocol ? yield(yield __dynamic.bare).fetch(c.meta.href, d.init): new __dynamic.util.about(new Blob(["<html><head></head><body></body></html>"]));
                            var f = this.fire("fetched", [c.meta, e, i]);
                            if (f) return f;
                            var m = yield c.util.resHeader(e.rawHeaders, c.meta, p), y = yield self.clients.matchAll();
                            try {
                                for (var g, x = !0, v = __asyncValues(y); g = yield v.next(), !(L = g.done);) {
                                    B = g.value, x = !1;
                                    try {
                                        B.postMessage({
                                            type: "cookies",
                                            host: c.meta.host,
                                            cookies: yield p.get(c.meta.host)
                                        });
                                        continue
                                    } finally {
                                        x = !0
                                    }
                                }
                            } catch (I) {
                                M = {
                                    error: I
                                }
                            } finally {
                                try {
                                    x || L || !(R = v["return"]) || (yield R.call(v))
                                } finally {
                                    if (M) throw M.error
                                }
                            }
                            let t = !1;
                            switch (i.destination) {
                                case "document":
                                    var b = yield e.blob(), _ = yield b.text(), w = c.rewrite.html.generateHead(location.origin + self.__dynamic$config.assets.prefix + self.__dynamic$config.assets.files.client, location.origin + self.__dynamic$config.assets.prefix + self.__dynamic$config.assets.files.config, location.origin + self.__dynamic$config.assets.prefix + self.__dynamic$config.assets.files.client, yield p.get(c.meta.host), "", !1, "self.__dynamic$bare = JSON.parse('" + JSON.stringify((yield __dynamic.bare).manifest) + "');");
                                    t = c.is.html(c.meta, e.headers.get("content-type"), _) ? new Blob([c.rewrite.html.rewrite(_, c.meta, w)], {
                                        type: e.headers.get("content-type") || "text/html; charset=utf-8"
                                    }) : b;
                                    break;
                                case "iframe":
                                    var S = yield e.blob(), k = yield S.text();
                                    if (c.is.html(c.meta, e.headers.get("content-type"), k)) try {
                                        var E = c.rewrite.html.generateHead(location.origin + self.__dynamic$config.assets.prefix + self.__dynamic$config.assets.files.client, location.origin + self.__dynamic$config.assets.prefix + self.__dynamic$config.assets.files.config, location.origin + self.__dynamic$config.assets.prefix + self.__dynamic$config.assets.files.client, yield p.get(c.meta.host), "", !0, "self.__dynamic$bare = JSON.parse('" + JSON.stringify((yield __dynamic.bare).manifest) + "');");
                                        t = new Blob([new(yield self.html)({
                                            ctx: c
                                        }).rewrite(k, c.meta, E)], {
                                            type: e.headers.get("content-type") || "text/html; charset=utf-8"
                                        })
                                    } catch (O) {
                                        t = S
                                    } else t = S;
                                    break;
                                case "worker":
                                case "script":
                                    c.is.js(c.meta, e.headers.get("content-type")) && (t = new Blob([c.rewrite.js.rewrite(yield e.text(), i, !0, c)], {
                                        type: e.headers.get("content-type") || "application/javascript"
                                    }));
                                    break;
                                case "style":
                                    c.is.css(c.meta, e.headers.get("content-type")) && (t = new Blob([c.rewrite.css.rewrite(yield e.text(), c.meta)], {
                                        type: e.headers.get("content-type") || "text/css"
                                    }));
                                    break;
                                case "manifest":
                                    t = new Blob([c.rewrite.man.rewrite(yield e.text(), c.meta)], {
                                        type: e.headers.get("content-type") || "application/json"
                                    });
                                    break;
                                default:
                                    var C = yield e.blob(), A = yield C.text();
                                    if (c.is.html(c.meta, e.headers.get("content-type"), A)) try {
                                        t = new Blob([new(yield self.html)({
                                            ctx: c
                                        }).rewrite(A, c.meta, [])], {
                                            type: e.headers.get("content-type") || "text/html; charset=utf-8"
                                        })
                                    } catch (N) {
                                        t = C
                                    } else t = C
                            }
                            0 == t && (t = yield e.blob()), -1 !== __dynamic.headers.status.empty.indexOf(e.status) && (t = null), "text/event-stream" === u.get("accept") && m.set("content-type", "text/event-stream"), t && m.set("content-length", t.size);
                            var P = this.fire("response", [c.meta, e, i, m, t]);
                            return P ? P : new Response(t, {
                                status: e.status,
                                statusText: e.statusText,
                                headers: m
                            })
                        } catch (e) {
                            return 1 <= self.__dynamic$config.logLevel && console.error(e), new Response(e, {
                                status: 500,
                                statusText: "error",
                                headers: new Headers({})
                            })
                        }
                    })
                }
            }
        }(self)
    })()
})();