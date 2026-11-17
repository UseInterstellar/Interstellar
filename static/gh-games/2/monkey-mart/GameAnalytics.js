(function(scope) {
    var CryptoJS = CryptoJS || function(o) {
        function t() {}
        var e = {},
            n = e.lib = {},
            i = n.Base = {
                extend: function(e) {
                    t.prototype = this;
                    var n = new t;
                    return e && n.mixIn(e), n.hasOwnProperty("init") || (n.init = function() {
                        n.$super.init.apply(this, arguments)
                    }), (n.init.prototype = n).$super = this, n
                },
                create: function() {
                    var e = this.extend();
                    return e.init.apply(e, arguments), e
                },
                init: function() {},
                mixIn: function(e) {
                    for (var n in e) e.hasOwnProperty(n) && (this[n] = e[n]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString)
                },
                clone: function() {
                    return this.init.prototype.extend(this)
                }
            },
            d = n.WordArray = i.extend({
                init: function(e, n) {
                    e = this.words = e || [], this.sigBytes = null != n ? n : 4 * e.length
                },
                toString: function(e) {
                    return (e || s).stringify(this)
                },
                concat: function(e) {
                    var n = this.words,
                        t = e.words,
                        i = this.sigBytes;
                    if (e = e.sigBytes, this.clamp(), i % 4)
                        for (var r = 0; r < e; r++) n[i + r >>> 2] |= (t[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 24 - (i + r) % 4 * 8;
                    else if (65535 < t.length)
                        for (r = 0; r < e; r += 4) n[i + r >>> 2] = t[r >>> 2];
                    else n.push.apply(n, t);
                    return this.sigBytes += e, this
                },
                clamp: function() {
                    var e = this.words,
                        n = this.sigBytes;
                    e[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, e.length = o.ceil(n / 4)
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e.words = this.words.slice(0), e
                },
                random: function(e) {
                    for (var n = [], t = 0; t < e; t += 4) n.push(4294967296 * o.random() | 0);
                    return new d.init(n, e)
                }
            }),
            r = e.enc = {},
            s = r.Hex = {
                stringify: function(e) {
                    var n = e.words;
                    e = e.sigBytes;
                    for (var t = [], i = 0; i < e; i++) {
                        var r = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                        t.push((r >>> 4).toString(16)), t.push((15 & r).toString(16))
                    }
                    return t.join("")
                },
                parse: function(e) {
                    for (var n = e.length, t = [], i = 0; i < n; i += 2) t[i >>> 3] |= parseInt(e.substr(i, 2), 16) << 24 - i % 8 * 4;
                    return new d.init(t, n / 2)
                }
            },
            a = r.Latin1 = {
                stringify: function(e) {
                    var n = e.words;
                    e = e.sigBytes;
                    for (var t = [], i = 0; i < e; i++) t.push(String.fromCharCode(n[i >>> 2] >>> 24 - i % 4 * 8 & 255));
                    return t.join("")
                },
                parse: function(e) {
                    for (var n = e.length, t = [], i = 0; i < n; i++) t[i >>> 2] |= (255 & e.charCodeAt(i)) << 24 - i % 4 * 8;
                    return new d.init(t, n)
                }
            },
            l = r.Utf8 = {
                stringify: function(e) {
                    try {
                        return decodeURIComponent(escape(a.stringify(e)))
                    } catch (e) {
                        throw Error("Malformed UTF-8 data")
                    }
                },
                parse: function(e) {
                    return a.parse(unescape(encodeURIComponent(e)))
                }
            },
            u = n.BufferedBlockAlgorithm = i.extend({
                reset: function() {
                    this._data = new d.init, this._nDataBytes = 0
                },
                _append: function(e) {
                    "string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                },
                _process: function(e) {
                    var n = this._data,
                        t = n.words,
                        i = n.sigBytes,
                        r = this.blockSize,
                        s = i / (4 * r);
                    if (e = (s = e ? o.ceil(s) : o.max((0 | s) - this._minBufferSize, 0)) * r, i = o.min(4 * e, i), e) {
                        for (var a = 0; a < e; a += r) this._doProcessBlock(t, a);
                        a = t.splice(0, e), n.sigBytes -= i
                    }
                    return new d.init(a, i)
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e._data = this._data.clone(), e
                },
                _minBufferSize: 0
            });
        n.Hasher = u.extend({
            cfg: i.extend(),
            init: function(e) {
                this.cfg = this.cfg.extend(e), this.reset()
            },
            reset: function() {
                u.reset.call(this), this._doReset()
            },
            update: function(e) {
                return this._append(e), this._process(), this
            },
            finalize: function(e) {
                return e && this._append(e), this._doFinalize()
            },
            blockSize: 16,
            _createHelper: function(t) {
                return function(e, n) {
                    return new t.init(n).finalize(e)
                }
            },
            _createHmacHelper: function(t) {
                return function(e, n) {
                    return new c.HMAC.init(t, n).finalize(e)
                }
            }
        });
        var c = e.algo = {};
        return e
    }(Math);
    ! function(r) {
        function e(e) {
            return 4294967296 * (e - (0 | e)) | 0
        }
        for (var n = CryptoJS, t = (s = n.lib).WordArray, i = s.Hasher, s = n.algo, a = [], f = [], o = 2, d = 0; d < 64;) {
            var l;
            e: {
                l = o;
                for (var u = r.sqrt(l), c = 2; c <= u; c++)
                    if (!(l % c)) {
                        l = !1;
                        break e
                    }
                l = !0
            }
            l && (d < 8 && (a[d] = e(r.pow(o, .5))), f[d] = e(r.pow(o, 1 / 3)), d++), o++
        }
        var m = [];
        s = s.SHA256 = i.extend({
            _doReset: function() {
                this._hash = new t.init(a.slice(0))
            },
            _doProcessBlock: function(e, n) {
                for (var t = this._hash.words, i = t[0], r = t[1], s = t[2], a = t[3], o = t[4], d = t[5], l = t[6], u = t[7], c = 0; c < 64; c++) {
                    if (c < 16) m[c] = 0 | e[n + c];
                    else {
                        var v = m[c - 15],
                            g = m[c - 2];
                        m[c] = ((v << 25 | v >>> 7) ^ (v << 14 | v >>> 18) ^ v >>> 3) + m[c - 7] + ((g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10) + m[c - 16]
                    }
                    v = u + ((o << 26 | o >>> 6) ^ (o << 21 | o >>> 11) ^ (o << 7 | o >>> 25)) + (o & d ^ ~o & l) + f[c] + m[c], g = ((i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22)) + (i & r ^ i & s ^ r & s), u = l, l = d, d = o, o = a + v | 0, a = s, s = r, r = i, i = v + g | 0
                }
                t[0] = t[0] + i | 0, t[1] = t[1] + r | 0, t[2] = t[2] + s | 0, t[3] = t[3] + a | 0, t[4] = t[4] + o | 0, t[5] = t[5] + d | 0, t[6] = t[6] + l | 0, t[7] = t[7] + u | 0
            },
            _doFinalize: function() {
                var e = this._data,
                    n = e.words,
                    t = 8 * this._nDataBytes,
                    i = 8 * e.sigBytes;
                return n[i >>> 5] |= 128 << 24 - i % 32, n[14 + (64 + i >>> 9 << 4)] = r.floor(t / 4294967296), n[15 + (64 + i >>> 9 << 4)] = t, e.sigBytes = 4 * n.length, this._process(), this._hash
            },
            clone: function() {
                var e = i.clone.call(this);
                return e._hash = this._hash.clone(), e
            }
        });
        n.SHA256 = i._createHelper(s), n.HmacSHA256 = i._createHmacHelper(s)
    }(Math),
    function() {
        var l = CryptoJS.enc.Utf8;
        CryptoJS.algo.HMAC = CryptoJS.lib.Base.extend({
            init: function(e, n) {
                e = this._hasher = new e.init, "string" == typeof n && (n = l.parse(n));
                var t = e.blockSize,
                    i = 4 * t;
                n.sigBytes > i && (n = e.finalize(n)), n.clamp();
                for (var r = this._oKey = n.clone(), s = this._iKey = n.clone(), a = r.words, o = s.words, d = 0; d < t; d++) a[d] ^= 1549556828, o[d] ^= 909522486;
                r.sigBytes = s.sigBytes = i, this.reset()
            },
            reset: function() {
                var e = this._hasher;
                e.reset(), e.update(this._iKey)
            },
            update: function(e) {
                return this._hasher.update(e), this
            },
            finalize: function(e) {
                var n = this._hasher;
                return e = n.finalize(e), n.reset(), n.finalize(this._oKey.clone().concat(e))
            }
        })
    }(),
    function() {
        var d = CryptoJS.lib.WordArray;
        CryptoJS.enc.Base64 = {
            stringify: function(e) {
                var n = e.words,
                    t = e.sigBytes,
                    i = this._map;
                e.clamp(), e = [];
                for (var r = 0; r < t; r += 3)
                    for (var s = (n[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 16 | (n[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255) << 8 | n[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255, a = 0; a < 4 && r + .75 * a < t; a++) e.push(i.charAt(s >>> 6 * (3 - a) & 63));
                if (n = i.charAt(64))
                    for (; e.length % 4;) e.push(n);
                return e.join("")
            },
            parse: function(e) {
                var n = e.length,
                    t = this._map;
                !(i = t.charAt(64)) || -1 != (i = e.indexOf(i)) && (n = i);
                for (var i = [], r = 0, s = 0; s < n; s++)
                    if (s % 4) {
                        var a = t.indexOf(e.charAt(s - 1)) << s % 4 * 2,
                            o = t.indexOf(e.charAt(s)) >>> 6 - s % 4 * 2;
                        i[r >>> 2] |= (a | o) << 24 - r % 4 * 8, r++
                    }
                return d.create(i, r)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
    }(),
    function(e) {
        var n, t, i, r, s, a, o, d, l, u, c, v, g;
        (n = e.EGAErrorSeverity || (e.EGAErrorSeverity = {}))[n.Undefined = 0] = "Undefined", n[n.Debug = 1] = "Debug", n[n.Info = 2] = "Info", n[n.Warning = 3] = "Warning", n[n.Error = 4] = "Error", n[n.Critical = 5] = "Critical", (t = e.EGAProgressionStatus || (e.EGAProgressionStatus = {}))[t.Undefined = 0] = "Undefined", t[t.Start = 1] = "Start", t[t.Complete = 2] = "Complete", t[t.Fail = 3] = "Fail", (i = e.EGAResourceFlowType || (e.EGAResourceFlowType = {}))[i.Undefined = 0] = "Undefined", i[i.Source = 1] = "Source", i[i.Sink = 2] = "Sink", (r = e.EGAAdAction || (e.EGAAdAction = {}))[r.Undefined = 0] = "Undefined", r[r.Clicked = 1] = "Clicked", r[r.Show = 2] = "Show", r[r.FailedShow = 3] = "FailedShow", r[r.RewardReceived = 4] = "RewardReceived", (s = e.EGAAdError || (e.EGAAdError = {}))[s.Undefined = 0] = "Undefined", s[s.Unknown = 1] = "Unknown", s[s.Offline = 2] = "Offline", s[s.NoFill = 3] = "NoFill", s[s.InternalError = 4] = "InternalError", s[s.InvalidRequest = 5] = "InvalidRequest", s[s.UnableToPrecache = 6] = "UnableToPrecache", (a = e.EGAAdType || (e.EGAAdType = {}))[a.Undefined = 0] = "Undefined", a[a.Video = 1] = "Video", a[a.RewardedVideo = 2] = "RewardedVideo", a[a.Playable = 3] = "Playable", a[a.Interstitial = 4] = "Interstitial", a[a.OfferWall = 5] = "OfferWall", a[a.Banner = 6] = "Banner", o = e.http || (e.http = {}), (d = o.EGAHTTPApiResponse || (o.EGAHTTPApiResponse = {}))[d.NoResponse = 0] = "NoResponse", d[d.BadResponse = 1] = "BadResponse", d[d.RequestTimeout = 2] = "RequestTimeout", d[d.JsonEncodeFailed = 3] = "JsonEncodeFailed", d[d.JsonDecodeFailed = 4] = "JsonDecodeFailed", d[d.InternalServerError = 5] = "InternalServerError", d[d.BadRequest = 6] = "BadRequest", d[d.Unauthorized = 7] = "Unauthorized", d[d.UnknownResponseCode = 8] = "UnknownResponseCode", d[d.Ok = 9] = "Ok", d[d.Created = 10] = "Created", l = e.events || (e.events = {}), (u = l.EGASdkErrorCategory || (l.EGASdkErrorCategory = {}))[u.Undefined = 0] = "Undefined", u[u.EventValidation = 1] = "EventValidation", u[u.Database = 2] = "Database", u[u.Init = 3] = "Init", u[u.Http = 4] = "Http", u[u.Json = 5] = "Json", (c = l.EGASdkErrorArea || (l.EGASdkErrorArea = {}))[c.Undefined = 0] = "Undefined", c[c.BusinessEvent = 1] = "BusinessEvent", c[c.ResourceEvent = 2] = "ResourceEvent", c[c.ProgressionEvent = 3] = "ProgressionEvent", c[c.DesignEvent = 4] = "DesignEvent", c[c.ErrorEvent = 5] = "ErrorEvent", c[c.InitHttp = 9] = "InitHttp", c[c.EventsHttp = 10] = "EventsHttp", c[c.ProcessEvents = 11] = "ProcessEvents", c[c.AddEventsToStore = 12] = "AddEventsToStore", c[c.AdEvent = 20] = "AdEvent", (v = l.EGASdkErrorAction || (l.EGASdkErrorAction = {}))[v.Undefined = 0] = "Undefined", v[v.InvalidCurrency = 1] = "InvalidCurrency", v[v.InvalidShortString = 2] = "InvalidShortString", v[v.InvalidEventPartLength = 3] = "InvalidEventPartLength", v[v.InvalidEventPartCharacters = 4] = "InvalidEventPartCharacters", v[v.InvalidStore = 5] = "InvalidStore", v[v.InvalidFlowType = 6] = "InvalidFlowType", v[v.StringEmptyOrNull = 7] = "StringEmptyOrNull", v[v.NotFoundInAvailableCurrencies = 8] = "NotFoundInAvailableCurrencies", v[v.InvalidAmount = 9] = "InvalidAmount", v[v.NotFoundInAvailableItemTypes = 10] = "NotFoundInAvailableItemTypes", v[v.WrongProgressionOrder = 11] = "WrongProgressionOrder", v[v.InvalidEventIdLength = 12] = "InvalidEventIdLength", v[v.InvalidEventIdCharacters = 13] = "InvalidEventIdCharacters", v[v.InvalidProgressionStatus = 15] = "InvalidProgressionStatus", v[v.InvalidSeverity = 16] = "InvalidSeverity", v[v.InvalidLongString = 17] = "InvalidLongString", v[v.DatabaseTooLarge = 18] = "DatabaseTooLarge", v[v.DatabaseOpenOrCreate = 19] = "DatabaseOpenOrCreate", v[v.JsonError = 25] = "JsonError", v[v.FailHttpJsonDecode = 29] = "FailHttpJsonDecode", v[v.FailHttpJsonEncode = 30] = "FailHttpJsonEncode", v[v.InvalidAdAction = 31] = "InvalidAdAction", v[v.InvalidAdType = 32] = "InvalidAdType", v[v.InvalidString = 33] = "InvalidString", (g = l.EGASdkErrorParameter || (l.EGASdkErrorParameter = {}))[g.Undefined = 0] = "Undefined", g[g.Currency = 1] = "Currency", g[g.CartType = 2] = "CartType", g[g.ItemType = 3] = "ItemType", g[g.ItemId = 4] = "ItemId", g[g.Store = 5] = "Store", g[g.FlowType = 6] = "FlowType", g[g.Amount = 7] = "Amount", g[g.Progression01 = 8] = "Progression01", g[g.Progression02 = 9] = "Progression02", g[g.Progression03 = 10] = "Progression03", g[g.EventId = 11] = "EventId", g[g.ProgressionStatus = 12] = "ProgressionStatus", g[g.Severity = 13] = "Severity", g[g.Message = 14] = "Message", g[g.AdAction = 15] = "AdAction", g[g.AdType = 16] = "AdType", g[g.AdSdkName = 17] = "AdSdkName", g[g.AdPlacement = 18] = "AdPlacement"
    }(gameanalytics = gameanalytics || {});
    var gameanalytics, EGAErrorSeverity = gameanalytics.EGAErrorSeverity,
        EGAProgressionStatus = gameanalytics.EGAProgressionStatus,
        EGAResourceFlowType = gameanalytics.EGAResourceFlowType;
    ! function(e) {
        ! function(e) {
            var t, n;
            (n = t = t || {})[n.Error = 0] = "Error", n[n.Warning = 1] = "Warning", n[n.Info = 2] = "Info", n[n.Debug = 3] = "Debug";
            var i = (r.setInfoLog = function(e) {
                r.instance.infoLogEnabled = e
            }, r.setVerboseLog = function(e) {
                r.instance.infoLogVerboseEnabled = e
            }, r.i = function(e) {
                if (r.instance.infoLogEnabled) {
                    var n = "Info/" + r.Tag + ": " + e;
                    r.instance.sendNotificationMessage(n, t.Info)
                }
            }, r.w = function(e) {
                var n = "Warning/" + r.Tag + ": " + e;
                r.instance.sendNotificationMessage(n, t.Warning)
            }, r.e = function(e) {
                var n = "Error/" + r.Tag + ": " + e;
                r.instance.sendNotificationMessage(n, t.Error)
            }, r.ii = function(e) {
                if (r.instance.infoLogVerboseEnabled) {
                    var n = "Verbose/" + r.Tag + ": " + e;
                    r.instance.sendNotificationMessage(n, t.Info)
                }
            }, r.d = function(e) {
                if (r.debugEnabled) {
                    var n = "Debug/" + r.Tag + ": " + e;
                    r.instance.sendNotificationMessage(n, t.Debug)
                }
            }, r.prototype.sendNotificationMessage = function(e, n) {
                switch (n) {
                    case t.Error:
                        console.error(e);
                        break;
                    case t.Warning:
                        console.warn(e);
                        break;
                    case t.Debug:
                        "function" == typeof console.debug ? console.debug(e) : console.log(e);
                        break;
                    case t.Info:
                        console.log(e)
                }
            }, r.instance = new r, r.Tag = "GameAnalytics", r);

            function r() {
                r.debugEnabled = !1
            }
            e.GALogger = i
        }(e.logging || (e.logging = {}))
    }(gameanalytics = gameanalytics || {}),
    function(e) {
        var n, l, t;

        function u() {}
        n = e.utilities || (e.utilities = {}), l = e.logging.GALogger, u.getHmac = function(e, n) {
            var t = CryptoJS.HmacSHA256(n, e);
            return CryptoJS.enc.Base64.stringify(t)
        }, u.stringMatch = function(e, n) {
            return !(!e || !n) && n.test(e)
        }, u.joinStringArray = function(e, n) {
            for (var t = "", i = 0, r = e.length; i < r; i++) 0 < i && (t += n), t += e[i];
            return t
        }, u.stringArrayContainsString = function(e, n) {
            if (0 === e.length) return !1;
            for (var t in e)
                if (e[t] === n) return !0;
            return !1
        }, u.encode64 = function(e) {
            e = encodeURI(e);
            for (var n, t, i, r, s, a = "", o = 0, d = 0, l = 0; i = (n = e.charCodeAt(l++)) >> 2, r = (3 & n) << 4 | (t = e.charCodeAt(l++)) >> 4, s = (15 & t) << 2 | (o = e.charCodeAt(l++)) >> 6, d = 63 & o, isNaN(t) ? s = d = 64 : isNaN(o) && (d = 64), a = a + u.keyStr.charAt(i) + u.keyStr.charAt(r) + u.keyStr.charAt(s) + u.keyStr.charAt(d), n = t = o = 0, i = r = s = d = 0, l < e.length;);
            return a
        }, u.decode64 = function(e) {
            var n, t, i, r, s = "",
                a = 0,
                o = 0,
                d = 0;
            for (/[^A-Za-z0-9\+\/\=]/g.exec(e) && l.w("There were invalid base64 characters in the input text. Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='. Expect errors in decoding."), e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); n = u.keyStr.indexOf(e.charAt(d++)) << 2 | (i = u.keyStr.indexOf(e.charAt(d++))) >> 4, t = (15 & i) << 4 | (r = u.keyStr.indexOf(e.charAt(d++))) >> 2, a = (3 & r) << 6 | (o = u.keyStr.indexOf(e.charAt(d++))), s += String.fromCharCode(n), 64 != r && (s += String.fromCharCode(t)), 64 != o && (s += String.fromCharCode(a)), n = t = a = 0, i = r = o = 0, d < e.length;);
            return decodeURI(s)
        }, u.timeIntervalSince1970 = function() {
            var e = new Date;
            return Math.round(e.getTime() / 1e3)
        }, u.createGuid = function() {
            return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, function(e) {
                return (+e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16)
            })
        }, u.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", t = u, n.GAUtilities = t
    }(gameanalytics = gameanalytics || {}),
    function(m) {
        ! function(e) {
            var d = m.logging.GALogger,
                o = m.utilities.GAUtilities,
                l = m.events.EGASdkErrorCategory,
                u = m.events.EGASdkErrorArea,
                c = m.events.EGASdkErrorAction,
                v = m.events.EGASdkErrorParameter,
                g = function(e, n, t, i, r) {
                    this.category = e, this.area = n, this.action = t, this.parameter = i, this.reason = r
                };
            e.ValidationResult = g;
            var n = (f.validateBusinessEvent = function(e, n, t, i, r) {
                return f.validateCurrency(e) ? n < 0 ? (d.w("Validation fail - business event - amount. Cannot be less than 0. Failed amount: " + n), new g(l.EventValidation, u.BusinessEvent, c.InvalidAmount, v.Amount, n + "")) : f.validateShortString(t, !0) ? f.validateEventPartLength(i, !1) ? f.validateEventPartCharacters(i) ? f.validateEventPartLength(r, !1) ? f.validateEventPartCharacters(r) ? null : (d.w("Validation fail - business event - itemId: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + r), new g(l.EventValidation, u.BusinessEvent, c.InvalidEventPartCharacters, v.ItemId, r)) : (d.w("Validation fail - business event - itemId. Cannot be (null), empty or above 64 characters. String: " + r), new g(l.EventValidation, u.BusinessEvent, c.InvalidEventPartLength, v.ItemId, r)) : (d.w("Validation fail - business event - itemType: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + i), new g(l.EventValidation, u.BusinessEvent, c.InvalidEventPartCharacters, v.ItemType, i)) : (d.w("Validation fail - business event - itemType: Cannot be (null), empty or above 64 characters. String: " + i), new g(l.EventValidation, u.BusinessEvent, c.InvalidEventPartLength, v.ItemType, i)) : (d.w("Validation fail - business event - cartType. Cannot be above 32 length. String: " + t), new g(l.EventValidation, u.BusinessEvent, c.InvalidShortString, v.CartType, t)) : (d.w("Validation fail - business event - currency: Cannot be (null) and need to be A-Z, 3 characters and in the standard at openexchangerates.org. Failed currency: " + e), new g(l.EventValidation, u.BusinessEvent, c.InvalidCurrency, v.Currency, e))
            }, f.validateResourceEvent = function(e, n, t, i, r, s, a) {
                return e == m.EGAResourceFlowType.Undefined ? (d.w("Validation fail - resource event - flowType: Invalid flow type."), new g(l.EventValidation, u.ResourceEvent, c.InvalidFlowType, v.FlowType, "")) : n ? o.stringArrayContainsString(s, n) ? 0 < t ? i ? f.validateEventPartLength(i, !1) ? f.validateEventPartCharacters(i) ? o.stringArrayContainsString(a, i) ? f.validateEventPartLength(r, !1) ? f.validateEventPartCharacters(r) ? null : (d.w("Validation fail - resource event - itemId: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + r), new g(l.EventValidation, u.ResourceEvent, c.InvalidEventPartCharacters, v.ItemId, r)) : (d.w("Validation fail - resource event - itemId: Cannot be (null), empty or above 64 characters. String: " + r), new g(l.EventValidation, u.ResourceEvent, c.InvalidEventPartLength, v.ItemId, r)) : (d.w("Validation fail - resource event - itemType: Not found in list of pre-defined available resource itemTypes. String: " + i), new g(l.EventValidation, u.ResourceEvent, c.NotFoundInAvailableItemTypes, v.ItemType, i)) : (d.w("Validation fail - resource event - itemType: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + i), new g(l.EventValidation, u.ResourceEvent, c.InvalidEventPartCharacters, v.ItemType, i)) : (d.w("Validation fail - resource event - itemType: Cannot be (null), empty or above 64 characters. String: " + i), new g(l.EventValidation, u.ResourceEvent, c.InvalidEventPartLength, v.ItemType, i)) : (d.w("Validation fail - resource event - itemType: Cannot be (null)"), new g(l.EventValidation, u.ResourceEvent, c.StringEmptyOrNull, v.ItemType, "")) : (d.w("Validation fail - resource event - amount: Float amount cannot be 0 or negative. Value: " + t), new g(l.EventValidation, u.ResourceEvent, c.InvalidAmount, v.Amount, t + "")) : (d.w("Validation fail - resource event - currency: Not found in list of pre-defined available resource currencies. String: " + n), new g(l.EventValidation, u.ResourceEvent, c.NotFoundInAvailableCurrencies, v.Currency, n)) : (d.w("Validation fail - resource event - currency: Cannot be (null)"), new g(l.EventValidation, u.ResourceEvent, c.StringEmptyOrNull, v.Currency, ""))
            }, f.validateProgressionEvent = function(e, n, t, i) {
                if (e == m.EGAProgressionStatus.Undefined) return d.w("Validation fail - progression event: Invalid progression status."), new g(l.EventValidation, u.ProgressionEvent, c.InvalidProgressionStatus, v.ProgressionStatus, "");
                if (i && !t && n) return d.w("Validation fail - progression event: 03 found but 01+02 are invalid. Progression must be set as either 01, 01+02 or 01+02+03."), new g(l.EventValidation, u.ProgressionEvent, c.WrongProgressionOrder, v.Undefined, n + ":" + t + ":" + i);
                if (t && !n) return d.w("Validation fail - progression event: 02 found but not 01. Progression must be set as either 01, 01+02 or 01+02+03"), new g(l.EventValidation, u.ProgressionEvent, c.WrongProgressionOrder, v.Undefined, n + ":" + t + ":" + i);
                if (!n) return d.w("Validation fail - progression event: progression01 not valid. Progressions must be set as either 01, 01+02 or 01+02+03"), new g(l.EventValidation, u.ProgressionEvent, c.WrongProgressionOrder, v.Undefined, (n || "") + ":" + (t || "") + ":" + (i || ""));
                if (!f.validateEventPartLength(n, !1)) return d.w("Validation fail - progression event - progression01: Cannot be (null), empty or above 64 characters. String: " + n), new g(l.EventValidation, u.ProgressionEvent, c.InvalidEventPartLength, v.Progression01, n);
                if (!f.validateEventPartCharacters(n)) return d.w("Validation fail - progression event - progression01: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + n), new g(l.EventValidation, u.ProgressionEvent, c.InvalidEventPartCharacters, v.Progression01, n);
                if (t) {
                    if (!f.validateEventPartLength(t, !0)) return d.w("Validation fail - progression event - progression02: Cannot be empty or above 64 characters. String: " + t), new g(l.EventValidation, u.ProgressionEvent, c.InvalidEventPartLength, v.Progression02, t);
                    if (!f.validateEventPartCharacters(t)) return d.w("Validation fail - progression event - progression02: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + t), new g(l.EventValidation, u.ProgressionEvent, c.InvalidEventPartCharacters, v.Progression02, t)
                }
                if (i) {
                    if (!f.validateEventPartLength(i, !0)) return d.w("Validation fail - progression event - progression03: Cannot be empty or above 64 characters. String: " + i), new g(l.EventValidation, u.ProgressionEvent, c.InvalidEventPartLength, v.Progression03, i);
                    if (!f.validateEventPartCharacters(i)) return d.w("Validation fail - progression event - progression03: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + i), new g(l.EventValidation, u.ProgressionEvent, c.InvalidEventPartCharacters, v.Progression03, i)
                }
                return null
            }, f.validateDesignEvent = function(e) {
                return f.validateEventIdLength(e) ? f.validateEventIdCharacters(e) ? null : (d.w("Validation fail - design event - eventId: Non valid characters. Only allowed A-z, 0-9, -_., ()!?. String: " + e), new g(l.EventValidation, u.DesignEvent, c.InvalidEventIdCharacters, v.EventId, e)) : (d.w("Validation fail - design event - eventId: Cannot be (null) or empty. Only 5 event parts allowed seperated by :. Each part need to be 64 characters or less. String: " + e), new g(l.EventValidation, u.DesignEvent, c.InvalidEventIdLength, v.EventId, e))
            }, f.validateErrorEvent = function(e, n) {
                return e == m.EGAErrorSeverity.Undefined ? (d.w("Validation fail - error event - severity: Severity was unsupported value."), new g(l.EventValidation, u.ErrorEvent, c.InvalidSeverity, v.Severity, "")) : f.validateLongString(n, !0) ? null : (d.w("Validation fail - error event - message: Message cannot be above 8192 characters."), new g(l.EventValidation, u.ErrorEvent, c.InvalidLongString, v.Message, n))
            }, f.validateAdEvent = function(e, n, t, i) {
                return e == m.EGAAdAction.Undefined ? (d.w("Validation fail - error event - severity: Severity was unsupported value."), new g(l.EventValidation, u.AdEvent, c.InvalidAdAction, v.AdAction, "")) : n == m.EGAAdType.Undefined ? (d.w("Validation fail - ad event - adType: Ad type was unsupported value."), new g(l.EventValidation, u.AdEvent, c.InvalidAdType, v.AdType, "")) : f.validateShortString(t, !1) ? f.validateString(i, !1) ? null : (d.w("Validation fail - ad event - message: Ad placement cannot be above 64 characters."), new g(l.EventValidation, u.AdEvent, c.InvalidString, v.AdPlacement, i)) : (d.w("Validation fail - ad event - message: Ad SDK name cannot be above 32 characters."), new g(l.EventValidation, u.AdEvent, c.InvalidShortString, v.AdSdkName, t))
            }, f.validateSdkErrorEvent = function(e, n, t, i, r) {
                return !(!f.validateKeys(e, n) || (t === l.Undefined ? (d.w("Validation fail - sdk error event - type: Category was unsupported value."), 1) : i === u.Undefined ? (d.w("Validation fail - sdk error event - type: Area was unsupported value."), 1) : r === c.Undefined && (d.w("Validation fail - sdk error event - type: Action was unsupported value."), 1)))
            }, f.validateKeys = function(e, n) {
                return !(!o.stringMatch(e, /^[A-z0-9]{32}$/) || !o.stringMatch(n, /^[A-z0-9]{40}$/))
            }, f.validateCurrency = function(e) {
                return !!e && !!o.stringMatch(e, /^[A-Z]{3}$/)
            }, f.validateEventPartLength = function(e, n) {
                return !(!n || e) || !!e && !(64 < e.length)
            }, f.validateEventPartCharacters = function(e) {
                return !!o.stringMatch(e, /^[A-Za-z0-9\s\-_\.\(\)\!\?]{1,64}$/)
            }, f.validateEventIdLength = function(e) {
                return !!e && !!o.stringMatch(e, /^[^:]{1,64}(?::[^:]{1,64}){0,4}$/)
            }, f.validateEventIdCharacters = function(e) {
                return !!e && !!o.stringMatch(e, /^[A-Za-z0-9\s\-_\.\(\)\!\?]{1,64}(:[A-Za-z0-9\s\-_\.\(\)\!\?]{1,64}){0,4}$/)
            }, f.validateAndCleanInitRequestResponse = function(n, e) {
                if (null == n) return d.w("validateInitRequestResponse failed - no response dictionary."), null;
                var t = {};
                try {
                    var i = n.server_ts;
                    if (!(0 < i)) return d.w("validateInitRequestResponse failed - invalid value in 'server_ts' field."), null;
                    t.server_ts = i
                } catch (e) {
                    return d.w("validateInitRequestResponse failed - invalid type in 'server_ts' field. type=" + typeof n.server_ts + ", value=" + n.server_ts + ", " + e), null
                }
                if (e) {
                    try {
                        var r = n.configs;
                        t.configs = r
                    } catch (e) {
                        return d.w("validateInitRequestResponse failed - invalid type in 'configs' field. type=" + typeof n.configs + ", value=" + n.configs + ", " + e), null
                    }
                    try {
                        var s = n.configs_hash;
                        t.configs_hash = s
                    } catch (e) {
                        return d.w("validateInitRequestResponse failed - invalid type in 'configs_hash' field. type=" + typeof n.configs_hash + ", value=" + n.configs_hash + ", " + e), null
                    }
                    try {
                        var a = n.ab_id;
                        t.ab_id = a
                    } catch (e) {
                        return d.w("validateInitRequestResponse failed - invalid type in 'ab_id' field. type=" + typeof n.ab_id + ", value=" + n.ab_id + ", " + e), null
                    }
                    try {
                        var o = n.ab_variant_id;
                        t.ab_variant_id = o
                    } catch (e) {
                        return d.w("validateInitRequestResponse failed - invalid type in 'ab_variant_id' field. type=" + typeof n.ab_variant_id + ", value=" + n.ab_variant_id + ", " + e), null
                    }
                }
                return t
            }, f.validateBuild = function(e) {
                return !!f.validateShortString(e, !1)
            }, f.validateSdkWrapperVersion = function(e) {
                return !!o.stringMatch(e, /^(unity|unreal|gamemaker|cocos2d|construct|defold|godot|flutter) [0-9]{0,5}(\.[0-9]{0,5}){0,2}$/)
            }, f.validateEngineVersion = function(e) {
                return !(!e || !o.stringMatch(e, /^(unity|unreal|gamemaker|cocos2d|construct|defold|godot) [0-9]{0,5}(\.[0-9]{0,5}){0,2}$/))
            }, f.validateUserId = function(e) {
                return !!f.validateString(e, !1) || (d.w("Validation fail - user id: id cannot be (null), empty or above 64 characters."), !1)
            }, f.validateShortString = function(e, n) {
                return !(!n || e) || !(!e || 32 < e.length)
            }, f.validateString = function(e, n) {
                return !(!n || e) || !(!e || 64 < e.length)
            }, f.validateLongString = function(e, n) {
                return !(!n || e) || !(!e || 8192 < e.length)
            }, f.validateConnectionType = function(e) {
                return o.stringMatch(e, /^(wwan|wifi|lan|offline)$/)
            }, f.validateCustomDimensions = function(e) {
                return f.validateArrayOfStrings(20, 32, !1, "custom dimensions", e)
            }, f.validateResourceCurrencies = function(e) {
                if (!f.validateArrayOfStrings(20, 64, !1, "resource currencies", e)) return !1;
                for (var n = 0; n < e.length; ++n)
                    if (!o.stringMatch(e[n], /^[A-Za-z]+$/)) return d.w("resource currencies validation failed: a resource currency can only be A-Z, a-z. String was: " + e[n]), !1;
                return !0
            }, f.validateResourceItemTypes = function(e) {
                if (!f.validateArrayOfStrings(20, 32, !1, "resource item types", e)) return !1;
                for (var n = 0; n < e.length; ++n)
                    if (!f.validateEventPartCharacters(e[n])) return d.w("resource item types validation failed: a resource item type cannot contain other characters than A-z, 0-9, -_., ()!?. String was: " + e[n]), !1;
                return !0
            }, f.validateDimension01 = function(e, n) {
                return !e || !!o.stringArrayContainsString(n, e)
            }, f.validateDimension02 = function(e, n) {
                return !e || !!o.stringArrayContainsString(n, e)
            }, f.validateDimension03 = function(e, n) {
                return !e || !!o.stringArrayContainsString(n, e)
            }, f.validateArrayOfStrings = function(e, n, t, i, r) {
                var s = i;
                if (s = s || "Array", !r) return d.w(s + " validation failed: array cannot be null. "), !1;
                if (0 == t && 0 == r.length) return d.w(s + " validation failed: array cannot be empty. "), !1;
                if (0 < e && r.length > e) return d.w(s + " validation failed: array cannot exceed " + e + " values. It has " + r.length + " values."), !1;
                for (var a = 0; a < r.length; ++a) {
                    var o = r[a] ? r[a].length : 0;
                    if (0 === o) return d.w(s + " validation failed: contained an empty string. Array=" + JSON.stringify(r)), !1;
                    if (0 < n && n < o) return d.w(s + " validation failed: a string exceeded max allowed length (which is: " + n + "). String was: " + r[a]), !1
                }
                return !0
            }, f.validateClientTs = function(e) {
                return !(e < 0 || 99999999999 < e)
            }, f);

            function f() {}
            e.GAValidator = n
        }(m.validators || (m.validators = {}))
    }(gameanalytics = gameanalytics || {}),
    function(e) {
        ! function(e) {
            var n = function(e, n, t) {
                this.name = e, this.value = n, this.version = t
            };
            e.NameValueVersion = n;
            var u = function(e, n) {
                this.name = e, this.version = n
            };
            e.NameVersion = u;
            var t = (r.touch = function() {}, r.getRelevantSdkVersion = function() {
                return r.sdkGameEngineVersion ? r.sdkGameEngineVersion : r.sdkWrapperVersion
            }, r.getConnectionType = function() {
                return r.connectionType
            }, r.updateConnectionType = function() {
                navigator.onLine ? r.connectionType = "ios" === r.buildPlatform || "android" === r.buildPlatform ? "wwan" : "lan" : r.connectionType = "offline"
            }, r.getOSVersionString = function() {
                return r.buildPlatform + " " + r.osVersionPair.version
            }, r.runtimePlatformToString = function() {
                return r.osVersionPair.name
            }, r.getBrowserVersionString = function() {
                var e, n = navigator.userAgent,
                    t = n.match(/(opera|chrome|safari|firefox|ubrowser|msie|trident|fbav(?=\/))\/?\s*(\d+)/i) || [];
                if (0 == t.length && "ios" === r.buildPlatform) return "webkit_" + r.osVersion;
                if (/trident/i.test(t[1])) return "IE " + ((e = /\brv[ :]+(\d+)/g.exec(n) || [])[1] || "");
                if ("Chrome" === t[1] && null != (e = n.match(/\b(OPR|Edge|UBrowser)\/(\d+)/))) return e.slice(1).join(" ").replace("OPR", "Opera").replace("UBrowser", "UC").toLowerCase();
                if (t[1] && "fbav" === t[1].toLowerCase() && (t[1] = "facebook", t[2])) return "facebook " + t[2];
                var i = t[2] ? [t[1], t[2]] : [navigator.appName, navigator.appVersion, "-?"];
                return null != (e = n.match(/version\/(\d+)/i)) && i.splice(1, 1, e[1]), i.join(" ").toLowerCase()
            }, r.getDeviceModel = function() {
                return "unknown"
            }, r.getDeviceManufacturer = function() {
                return "unknown"
            }, r.matchItem = function(e, n) {
                var t, i, r, s, a = new u("unknown", "0.0.0"),
                    o = 0,
                    d = 0;
                for (o = 0; o < n.length; o += 1)
                    if (new RegExp(n[o].value, "i").test(e)) {
                        if (t = new RegExp(n[o].version + "[- /:;]([\\d._]+)", "i"), s = "", (i = e.match(t)) && i[1] && (r = i[1]), r) {
                            var l = r.split(/[._]+/);
                            for (d = 0; d < Math.min(l.length, 3); d += 1) s += l[d] + (d < Math.min(l.length, 3) - 1 ? "." : "")
                        } else s = "0.0.0";
                        return a.name = n[o].name, a.version = s, a
                    }
                return a
            }, r.sdkWrapperVersion = "javascript 4.4.4", r.osVersionPair = r.matchItem([navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor].join(" "), [new n("windows_phone", "Windows Phone", "OS"), new n("windows", "Win", "NT"), new n("ios", "iPhone", "OS"), new n("ios", "iPad", "OS"), new n("ios", "iPod", "OS"), new n("android", "Android", "Android"), new n("blackBerry", "BlackBerry", "/"), new n("mac_osx", "Mac", "OS X"), new n("tizen", "Tizen", "Tizen"), new n("linux", "Linux", "rv"), new n("kai_os", "KAIOS", "KAIOS")]), r.buildPlatform = r.runtimePlatformToString(), r.deviceModel = r.getDeviceModel(), r.deviceManufacturer = r.getDeviceManufacturer(), r.osVersion = r.getOSVersionString(), r.browserVersion = r.getBrowserVersionString(), r);

            function r() {}
            e.GADevice = t
        }(e.device || (e.device = {}))
    }(gameanalytics = gameanalytics || {}),
    function(e) {
        var n, t;

        function i(e) {
            this.deadline = e, this.ignore = !1, this.async = !1, this.running = !1, this.id = ++i.idCounter
        }
        n = e.threading || (e.threading = {}), i.idCounter = 0, t = i, n.TimedBlock = t
    }(gameanalytics = gameanalytics || {}),
    function(e) {
        var n, t;

        function i(e) {
            this.comparer = e, this._subQueues = {}, this._sortedKeys = []
        }
        n = e.threading || (e.threading = {}), i.prototype.enqueue = function(e, n) {
            -1 === this._sortedKeys.indexOf(e) && this.addQueueOfPriority(e), this._subQueues[e].push(n)
        }, i.prototype.addQueueOfPriority = function(e) {
            var t = this;
            this._sortedKeys.push(e), this._sortedKeys.sort(function(e, n) {
                return t.comparer.compare(e, n)
            }), this._subQueues[e] = []
        }, i.prototype.peek = function() {
            if (this.hasItems()) return this._subQueues[this._sortedKeys[0]][0];
            throw new Error("The queue is empty")
        }, i.prototype.hasItems = function() {
            return 0 < this._sortedKeys.length
        }, i.prototype.dequeue = function() {
            if (this.hasItems()) return this.dequeueFromHighPriorityQueue();
            throw new Error("The queue is empty")
        }, i.prototype.dequeueFromHighPriorityQueue = function() {
            var e = this._sortedKeys[0],
                n = this._subQueues[e].shift();
            return 0 === this._subQueues[e].length && (this._sortedKeys.shift(), delete this._subQueues[e]), n
        }, t = i, n.PriorityQueue = t
    }(gameanalytics = gameanalytics || {}),
    function(a) {
        ! function(e) {
            var c, n, t, i, r = a.logging.GALogger;
            (n = c = e.EGAStoreArgsOperator || (e.EGAStoreArgsOperator = {}))[n.Equal = 0] = "Equal", n[n.LessOrEqual = 1] = "LessOrEqual", n[n.NotEqual = 2] = "NotEqual", (i = t = e.EGAStore || (e.EGAStore = {}))[i.Events = 0] = "Events", i[i.Sessions = 1] = "Sessions", i[i.Progression = 2] = "Progression";
            var s = (v.isStorageAvailable = function() {
                return v.storageAvailable
            }, v.isStoreTooLargeForEvents = function() {
                return v.instance.eventsStore.length + v.instance.sessionsStore.length > v.MaxNumberOfEntries
            }, v.select = function(e, n, t, i) {
                void 0 === n && (n = []), void 0 === t && (t = !1), void 0 === i && (i = 0);
                var r = v.getStore(e);
                if (!r) return null;
                for (var s = [], a = 0; a < r.length; ++a) {
                    for (var o = r[a], d = !0, l = 0; l < n.length; ++l) {
                        var u = n[l];
                        if (o[u[0]]) switch (u[1]) {
                            case c.Equal:
                                d = o[u[0]] == u[2];
                                break;
                            case c.LessOrEqual:
                                d = o[u[0]] <= u[2];
                                break;
                            case c.NotEqual:
                                d = o[u[0]] != u[2];
                                break;
                            default:
                                d = !1
                        } else d = !1;
                        if (!d) break
                    }
                    d && s.push(o)
                }
                return t && s.sort(function(e, n) {
                    return e.client_ts - n.client_ts
                }), 0 < i && s.length > i && (s = s.slice(0, i + 1)), s
            }, v.update = function(e, n, t) {
                void 0 === t && (t = []);
                var i = v.getStore(e);
                if (!i) return !1;
                for (var r = 0; r < i.length; ++r) {
                    for (var s = i[r], a = !0, o = 0; o < t.length; ++o) {
                        var d = t[o];
                        if (s[d[0]]) switch (d[1]) {
                            case c.Equal:
                                a = s[d[0]] == d[2];
                                break;
                            case c.LessOrEqual:
                                a = s[d[0]] <= d[2];
                                break;
                            case c.NotEqual:
                                a = s[d[0]] != d[2];
                                break;
                            default:
                                a = !1
                        } else a = !1;
                        if (!a) break
                    }
                    if (a)
                        for (o = 0; o < n.length; ++o) {
                            var l = n[o];
                            s[l[0]] = l[1]
                        }
                }
                return !0
            }, v.delete = function(e, n) {
                var t = v.getStore(e);
                if (t)
                    for (var i = 0; i < t.length; ++i) {
                        for (var r = t[i], s = !0, a = 0; a < n.length; ++a) {
                            var o = n[a];
                            if (r[o[0]]) switch (o[1]) {
                                case c.Equal:
                                    s = r[o[0]] == o[2];
                                    break;
                                case c.LessOrEqual:
                                    s = r[o[0]] <= o[2];
                                    break;
                                case c.NotEqual:
                                    s = r[o[0]] != o[2];
                                    break;
                                default:
                                    s = !1
                            } else s = !1;
                            if (!s) break
                        }
                        s && (t.splice(i, 1), --i)
                    }
            }, v.insert = function(e, n, t, i) {
                void 0 === t && (t = !1), void 0 === i && (i = null);
                var r = v.getStore(e);
                if (r)
                    if (t) {
                        if (!i) return;
                        for (var s = !1, a = 0; a < r.length; ++a) {
                            var o = r[a];
                            if (o[i] == n[i]) {
                                for (var d in n) o[d] = n[d];
                                s = !0;
                                break
                            }
                        }
                        s || r.push(n)
                    } else r.push(n)
            }, v.save = function(e) {
                v.isStorageAvailable() ? (localStorage.setItem(v.StringFormat(v.KeyFormat, e, v.EventsStoreKey), JSON.stringify(v.instance.eventsStore)), localStorage.setItem(v.StringFormat(v.KeyFormat, e, v.SessionsStoreKey), JSON.stringify(v.instance.sessionsStore)), localStorage.setItem(v.StringFormat(v.KeyFormat, e, v.ProgressionStoreKey), JSON.stringify(v.instance.progressionStore)), localStorage.setItem(v.StringFormat(v.KeyFormat, e, v.ItemsStoreKey), JSON.stringify(v.instance.storeItems))) : r.w("Storage is not available, cannot save.")
            }, v.load = function(e) {
                if (v.isStorageAvailable()) {
                    try {
                        v.instance.eventsStore = JSON.parse(localStorage.getItem(v.StringFormat(v.KeyFormat, e, v.EventsStoreKey))), v.instance.eventsStore || (v.instance.eventsStore = [])
                    } catch (e) {
                        r.w("Load failed for 'events' store. Using empty store."), v.instance.eventsStore = []
                    }
                    try {
                        v.instance.sessionsStore = JSON.parse(localStorage.getItem(v.StringFormat(v.KeyFormat, e, v.SessionsStoreKey))), v.instance.sessionsStore || (v.instance.sessionsStore = [])
                    } catch (e) {
                        r.w("Load failed for 'sessions' store. Using empty store."), v.instance.sessionsStore = []
                    }
                    try {
                        v.instance.progressionStore = JSON.parse(localStorage.getItem(v.StringFormat(v.KeyFormat, e, v.ProgressionStoreKey))), v.instance.progressionStore || (v.instance.progressionStore = [])
                    } catch (e) {
                        r.w("Load failed for 'progression' store. Using empty store."), v.instance.progressionStore = []
                    }
                    try {
                        v.instance.storeItems = JSON.parse(localStorage.getItem(v.StringFormat(v.KeyFormat, e, v.ItemsStoreKey))), v.instance.storeItems || (v.instance.storeItems = {})
                    } catch (e) {
                        r.w("Load failed for 'items' store. Using empty store."), v.instance.progressionStore = []
                    }
                } else r.w("Storage is not available, cannot load.")
            }, v.setItem = function(e, n, t) {
                var i = v.StringFormat(v.KeyFormat, e, n);
                t ? v.instance.storeItems[i] = t : i in v.instance.storeItems && delete v.instance.storeItems[i]
            }, v.getItem = function(e, n) {
                var t = v.StringFormat(v.KeyFormat, e, n);
                return t in v.instance.storeItems ? v.instance.storeItems[t] : null
            }, v.getStore = function(e) {
                switch (e) {
                    case t.Events:
                        return v.instance.eventsStore;
                    case t.Sessions:
                        return v.instance.sessionsStore;
                    case t.Progression:
                        return v.instance.progressionStore;
                    default:
                        return r.w("GAStore.getStore(): Cannot find store: " + e), null
                }
            }, v.instance = new v, v.MaxNumberOfEntries = 2e3, v.StringFormat = function(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                return e.replace(/{(\d+)}/g, function(e, n) {
                    return t[n] || ""
                })
            }, v.KeyFormat = "GA::{0}::{1}", v.EventsStoreKey = "ga_event", v.SessionsStoreKey = "ga_session", v.ProgressionStoreKey = "ga_progression", v.ItemsStoreKey = "ga_items", v);

            function v() {
                this.eventsStore = [], this.sessionsStore = [], this.progressionStore = [], this.storeItems = {};
                try {
                    "object" == typeof localStorage ? (localStorage.setItem("testingLocalStorage", "yes"), localStorage.removeItem("testingLocalStorage"), v.storageAvailable = !0) : v.storageAvailable = !1
                } catch (e) {}
            }
            e.GAStore = s
        }(a.store || (a.store = {}))
    }(gameanalytics = gameanalytics || {}),
    function(e) {
        var n, r, c, v, d, s, l, t, i;

        function g() {
            this.availableCustomDimensions01 = [], this.availableCustomDimensions02 = [], this.availableCustomDimensions03 = [], this.currentGlobalCustomEventFields = {}, this.availableResourceCurrencies = [], this.availableResourceItemTypes = [], this.configurations = {}, this.remoteConfigsListeners = [], this.beforeUnloadListeners = [], this.sdkConfigDefault = {}, this.sdkConfig = {}, this.progressionTries = {}, this._isEventSubmissionEnabled = !0, this.isUnloading = !1
        }
        n = e.state || (e.state = {}), r = e.validators.GAValidator, c = e.utilities.GAUtilities, v = e.logging.GALogger, d = e.store.GAStore, s = e.device.GADevice, l = e.store.EGAStore, t = e.store.EGAStoreArgsOperator, g.setUserId = function(e) {
            g.instance.userId = e, g.cacheIdentifier()
        }, g.getIdentifier = function() {
            return g.instance.identifier
        }, g.isInitialized = function() {
            return g.instance.initialized
        }, g.setInitialized = function(e) {
            g.instance.initialized = e
        }, g.getSessionStart = function() {
            return g.instance.sessionStart
        }, g.getSessionNum = function() {
            return g.instance.sessionNum
        }, g.getTransactionNum = function() {
            return g.instance.transactionNum
        }, g.getSessionId = function() {
            return g.instance.sessionId
        }, g.getCurrentCustomDimension01 = function() {
            return g.instance.currentCustomDimension01
        }, g.getCurrentCustomDimension02 = function() {
            return g.instance.currentCustomDimension02
        }, g.getCurrentCustomDimension03 = function() {
            return g.instance.currentCustomDimension03
        }, g.getGameKey = function() {
            return g.instance.gameKey
        }, g.getGameSecret = function() {
            return g.instance.gameSecret
        }, g.getAvailableCustomDimensions01 = function() {
            return g.instance.availableCustomDimensions01
        }, g.setAvailableCustomDimensions01 = function(e) {
            r.validateCustomDimensions(e) && (g.instance.availableCustomDimensions01 = e, g.validateAndFixCurrentDimensions(), v.i("Set available custom01 dimension values: (" + c.joinStringArray(e, ", ") + ")"))
        }, g.getAvailableCustomDimensions02 = function() {
            return g.instance.availableCustomDimensions02
        }, g.setAvailableCustomDimensions02 = function(e) {
            r.validateCustomDimensions(e) && (g.instance.availableCustomDimensions02 = e, g.validateAndFixCurrentDimensions(), v.i("Set available custom02 dimension values: (" + c.joinStringArray(e, ", ") + ")"))
        }, g.getAvailableCustomDimensions03 = function() {
            return g.instance.availableCustomDimensions03
        }, g.setAvailableCustomDimensions03 = function(e) {
            r.validateCustomDimensions(e) && (g.instance.availableCustomDimensions03 = e, g.validateAndFixCurrentDimensions(), v.i("Set available custom03 dimension values: (" + c.joinStringArray(e, ", ") + ")"))
        }, g.getAvailableResourceCurrencies = function() {
            return g.instance.availableResourceCurrencies
        }, g.setAvailableResourceCurrencies = function(e) {
            r.validateResourceCurrencies(e) && (g.instance.availableResourceCurrencies = e, v.i("Set available resource currencies: (" + c.joinStringArray(e, ", ") + ")"))
        }, g.getAvailableResourceItemTypes = function() {
            return g.instance.availableResourceItemTypes
        }, g.setAvailableResourceItemTypes = function(e) {
            r.validateResourceItemTypes(e) && (g.instance.availableResourceItemTypes = e, v.i("Set available resource item types: (" + c.joinStringArray(e, ", ") + ")"))
        }, g.getBuild = function() {
            return g.instance.build
        }, g.setBuild = function(e) {
            g.instance.build = e, v.i("Set build version: " + e)
        }, g.getUseManualSessionHandling = function() {
            return g.instance.useManualSessionHandling
        }, g.isEventSubmissionEnabled = function() {
            return g.instance._isEventSubmissionEnabled
        }, g.getABTestingId = function() {
            return g.instance.abId
        }, g.getABTestingVariantId = function() {
            return g.instance.abVariantId
        }, g.prototype.setDefaultId = function(e) {
            this.defaultUserId = e || "", g.cacheIdentifier()
        }, g.getDefaultId = function() {
            return g.instance.defaultUserId
        }, g.getSdkConfig = function() {
            var e, n = 0;
            for (var t in g.instance.sdkConfig) 0 === n && (e = t), ++n;
            if (e && 0 < n) return g.instance.sdkConfig;
            for (var t in n = 0, g.instance.sdkConfigCached) 0 === n && (e = t), ++n;
            return e && 0 < n ? g.instance.sdkConfigCached : g.instance.sdkConfigDefault
        }, g.isEnabled = function() {
            return !!g.instance.initAuthorized
        }, g.setCustomDimension01 = function(e) {
            g.instance.currentCustomDimension01 = e, d.setItem(g.getGameKey(), g.Dimension01Key, e), v.i("Set custom01 dimension value: " + e)
        }, g.setCustomDimension02 = function(e) {
            g.instance.currentCustomDimension02 = e, d.setItem(g.getGameKey(), g.Dimension02Key, e), v.i("Set custom02 dimension value: " + e)
        }, g.setCustomDimension03 = function(e) {
            g.instance.currentCustomDimension03 = e, d.setItem(g.getGameKey(), g.Dimension03Key, e), v.i("Set custom03 dimension value: " + e)
        }, g.incrementSessionNum = function() {
            var e = g.getSessionNum() + 1;
            g.instance.sessionNum = e
        }, g.incrementTransactionNum = function() {
            var e = g.getTransactionNum() + 1;
            g.instance.transactionNum = e
        }, g.incrementProgressionTries = function(e) {
            var n = g.getProgressionTries(e) + 1;
            g.instance.progressionTries[e] = n;
            var t = {};
            t.progression = e, t.tries = n, d.insert(l.Progression, t, !0, "progression")
        }, g.getProgressionTries = function(e) {
            return e in g.instance.progressionTries ? g.instance.progressionTries[e] : 0
        }, g.clearProgressionTries = function(e) {
            e in g.instance.progressionTries && delete g.instance.progressionTries[e];
            var n = [];
            n.push(["progression", t.Equal, e]), d.delete(l.Progression, n)
        }, g.setKeys = function(e, n) {
            g.instance.gameKey = e, g.instance.gameSecret = n
        }, g.setManualSessionHandling = function(e) {
            g.instance.useManualSessionHandling = e, v.i("Use manual session handling: " + e)
        }, g.setEnabledEventSubmission = function(e) {
            g.instance._isEventSubmissionEnabled = e
        }, g.getEventAnnotations = function() {
            var e = {
                v: 2
            };
            e.event_uuid = c.createGuid(), e.user_id = g.instance.identifier, e.client_ts = g.getClientTsAdjusted(), e.sdk_version = s.getRelevantSdkVersion(), e.os_version = s.osVersion, e.manufacturer = s.deviceManufacturer, e.device = s.deviceModel, e.browser_version = s.browserVersion, e.platform = s.buildPlatform, e.session_id = g.instance.sessionId, e[g.SessionNumKey] = g.instance.sessionNum;
            var n = s.getConnectionType();
            if (r.validateConnectionType(n) && (e.connection_type = n), s.gameEngineVersion && (e.engine_version = s.gameEngineVersion), g.instance.configurations) {
                var t = 0;
                for (var i in g.instance.configurations) {
                    t++;
                    break
                }
                0 < t && (e.configurations = g.instance.configurations)
            }
            return g.instance.abId && (e.ab_id = g.instance.abId), g.instance.abVariantId && (e.ab_variant_id = g.instance.abVariantId), g.instance.build && (e.build = g.instance.build), e
        }, g.getSdkErrorEventAnnotations = function() {
            var e = {
                v: 2
            };
            e.event_uuid = c.createGuid(), e.category = g.CategorySdkError, e.sdk_version = s.getRelevantSdkVersion(), e.os_version = s.osVersion, e.manufacturer = s.deviceManufacturer, e.device = s.deviceModel, e.platform = s.buildPlatform;
            var n = s.getConnectionType();
            return r.validateConnectionType(n) && (e.connection_type = n), s.gameEngineVersion && (e.engine_version = s.gameEngineVersion), e
        }, g.getInitAnnotations = function() {
            var e = {};
            return g.getIdentifier() || g.cacheIdentifier(), d.setItem(g.getGameKey(), g.LastUsedIdentifierKey, g.getIdentifier()), e.user_id = g.getIdentifier(), e.sdk_version = s.getRelevantSdkVersion(), e.os_version = s.osVersion, e.platform = s.buildPlatform, g.getBuild() ? e.build = g.getBuild() : e.build = null, e.session_num = g.getSessionNum(), e.random_salt = g.getSessionNum(), e
        }, g.getClientTsAdjusted = function() {
            var e = c.timeIntervalSince1970(),
                n = e + g.instance.clientServerTimeOffset;
            return r.validateClientTs(n) ? n : e
        }, g.sessionIsStarted = function() {
            return 0 != g.instance.sessionStart
        }, g.cacheIdentifier = function() {
            g.instance.userId ? g.instance.identifier = g.instance.userId : g.instance.defaultUserId && (g.instance.identifier = g.instance.defaultUserId)
        }, g.ensurePersistedStates = function() {
            d.isStorageAvailable() && d.load(g.getGameKey());
            var e = g.instance;
            e.setDefaultId(null != d.getItem(g.getGameKey(), g.DefaultUserIdKey) ? d.getItem(g.getGameKey(), g.DefaultUserIdKey) : c.createGuid()), e.sessionNum = null != d.getItem(g.getGameKey(), g.SessionNumKey) ? Number(d.getItem(g.getGameKey(), g.SessionNumKey)) : 0, e.transactionNum = null != d.getItem(g.getGameKey(), g.TransactionNumKey) ? Number(d.getItem(g.getGameKey(), g.TransactionNumKey)) : 0, e.currentCustomDimension01 ? d.setItem(g.getGameKey(), g.Dimension01Key, e.currentCustomDimension01) : (e.currentCustomDimension01 = null != d.getItem(g.getGameKey(), g.Dimension01Key) ? d.getItem(g.getGameKey(), g.Dimension01Key) : "", e.currentCustomDimension01), e.currentCustomDimension02 ? d.setItem(g.getGameKey(), g.Dimension02Key, e.currentCustomDimension02) : (e.currentCustomDimension02 = null != d.getItem(g.getGameKey(), g.Dimension02Key) ? d.getItem(g.getGameKey(), g.Dimension02Key) : "", e.currentCustomDimension02), e.currentCustomDimension03 ? d.setItem(g.getGameKey(), g.Dimension03Key, e.currentCustomDimension03) : (e.currentCustomDimension03 = null != d.getItem(g.getGameKey(), g.Dimension03Key) ? d.getItem(g.getGameKey(), g.Dimension03Key) : "", e.currentCustomDimension03);
            var n = null != d.getItem(g.getGameKey(), g.SdkConfigCachedKey) ? d.getItem(g.getGameKey(), g.SdkConfigCachedKey) : "";
            if (n) {
                var t = JSON.parse(c.decode64(n));
                if (t) {
                    var i = d.getItem(g.getGameKey(), g.LastUsedIdentifierKey);
                    null != i && i != g.getIdentifier() && (v.w("New identifier spotted compared to last one used, clearing cached configs hash!!"), t.configs_hash && delete t.configs_hash), e.sdkConfigCached = t
                }
            }
            var r = g.getSdkConfig();
            e.configsHash = r.configs_hash ? r.configs_hash : "", e.abId = r.ab_id ? r.ab_id : "", e.abVariantId = r.ab_variant_id ? r.ab_variant_id : "";
            var s = d.select(l.Progression);
            if (s)
                for (var a = 0; a < s.length; ++a) {
                    var o = s[a];
                    o && (e.progressionTries[o.progression] = o.tries)
                }
        }, g.calculateServerTimeOffset = function(e) {
            return e - c.timeIntervalSince1970()
        }, g.formatString = function(e, n) {
            for (var t = e, i = 0; i < n.length; i++) {
                var r = new RegExp("\\{" + i + "\\}", "gi");
                t = t.replace(r, arguments[i])
            }
            return t
        }, g.validateAndCleanCustomFields = function(e, n) {
            void 0 === n && (n = null);
            var t = {};
            if (e) {
                var i = 0;
                for (var r in e) {
                    var s = e[r];
                    if (r && s)
                        if (i < g.MAX_CUSTOM_FIELDS_COUNT) {
                            var a = new RegExp("^[a-zA-Z0-9_]{1," + g.MAX_CUSTOM_FIELDS_KEY_LENGTH + "}$");
                            if (c.stringMatch(r, a)) {
                                var o = typeof s;
                                if ("string" == o || s instanceof String) s.length <= g.MAX_CUSTOM_FIELDS_VALUE_STRING_LENGTH && 0 < s.length ? (t[r] = s, ++i) : (u = g.formatString(l = "validateAndCleanCustomFields: entry with key={0}, value={1} has been omitted because its value is an empty string or exceeds the max number of characters (" + g.MAX_CUSTOM_FIELDS_VALUE_STRING_LENGTH + ")", [r, s]), v.w(u), n && n(l, u));
                                else if ("number" == o || s instanceof Number) {
                                    var d = s;
                                    t[r] = d, ++i
                                } else u = g.formatString(l = "validateAndCleanCustomFields: entry with key={0}, value={1} has been omitted because its value is not a string or number", [r, s]), v.w(u), n && n(l, u)
                            } else u = g.formatString(l = "validateAndCleanCustomFields: entry with key={0}, value={1} has been omitted because its key contains illegal character, is empty or exceeds the max number of characters (" + g.MAX_CUSTOM_FIELDS_KEY_LENGTH + ")", [r, s]), v.w(u), n && n(l, u)
                        } else u = g.formatString(l = "validateAndCleanCustomFields: entry with key={0}, value={1} has been omitted because it exceeds the max number of custom fields (" + g.MAX_CUSTOM_FIELDS_COUNT + ")", [r, s]), v.w(u), n && n(l, u);
                    else {
                        var l, u = g.formatString(l = "validateAndCleanCustomFields: entry with key={0}, value={1} has been omitted because its key or value is null", [r, s]);
                        v.w(u), n && n(l, u)
                    }
                }
            }
            return t
        }, g.validateAndFixCurrentDimensions = function() {
            r.validateDimension01(g.getCurrentCustomDimension01(), g.getAvailableCustomDimensions01()) || g.setCustomDimension01(""), r.validateDimension02(g.getCurrentCustomDimension02(), g.getAvailableCustomDimensions02()) || g.setCustomDimension02(""), r.validateDimension03(g.getCurrentCustomDimension03(), g.getAvailableCustomDimensions03()) || g.setCustomDimension03("")
        }, g.getConfigurationStringValue = function(e, n) {
            return g.instance.configurations[e] ? g.instance.configurations[e].toString() : n
        }, g.isRemoteConfigsReady = function() {
            return g.instance.remoteConfigsIsReady
        }, g.addRemoteConfigsListener = function(e) {
            g.instance.remoteConfigsListeners.indexOf(e) < 0 && g.instance.remoteConfigsListeners.push(e)
        }, g.removeRemoteConfigsListener = function(e) {
            var n = g.instance.remoteConfigsListeners.indexOf(e); - 1 < n && g.instance.remoteConfigsListeners.splice(n, 1)
        }, g.getRemoteConfigsContentAsString = function() {
            return JSON.stringify(g.instance.configurations)
        }, g.populateConfigurations = function(e) {
            var n = e.configs;
            if (n) {
                g.instance.configurations = {};
                for (var t = 0; t < n.length; ++t) {
                    var i = n[t];
                    if (i) {
                        var r = i.key,
                            s = i.value,
                            a = i.start_ts ? i.start_ts : Number.MIN_VALUE,
                            o = i.end_ts ? i.end_ts : Number.MAX_VALUE,
                            d = g.getClientTsAdjusted();
                        r && s && a < d && d < o && (g.instance.configurations[r] = s)
                    }
                }
            }
            g.instance.remoteConfigsIsReady = !0;
            var l = g.instance.remoteConfigsListeners;
            for (t = 0; t < l.length; ++t) l[t] && l[t].onRemoteConfigsUpdated()
        }, g.addOnBeforeUnloadListener = function(e) {
            g.instance.beforeUnloadListeners.indexOf(e) < 0 && g.instance.beforeUnloadListeners.push(e)
        }, g.removeOnBeforeUnloadListener = function(e) {
            var n = g.instance.beforeUnloadListeners.indexOf(e); - 1 < n && g.instance.beforeUnloadListeners.splice(n, 1)
        }, g.notifyBeforeUnloadListeners = function() {
            for (var e = g.instance.beforeUnloadListeners, n = 0; n < e.length; ++n) e[n] && e[n].onBeforeUnload()
        }, g.CategorySdkError = "sdk_error", g.MAX_CUSTOM_FIELDS_COUNT = 50, g.MAX_CUSTOM_FIELDS_KEY_LENGTH = 64, g.MAX_CUSTOM_FIELDS_VALUE_STRING_LENGTH = 256, g.instance = new g, g.DefaultUserIdKey = "default_user_id", g.SessionNumKey = "session_num", g.TransactionNumKey = "transaction_num", g.Dimension01Key = "dimension01", g.Dimension02Key = "dimension02", g.Dimension03Key = "dimension03", g.SdkConfigCachedKey = "sdk_config_cached", g.LastUsedIdentifierKey = "last_used_identifier", i = g, n.GAState = i
    }(gameanalytics = gameanalytics || {}),
    function(e) {
        var n, o, d, t;

        function l() {}
        n = e.tasks || (e.tasks = {}), o = e.utilities.GAUtilities, d = e.logging.GALogger, l.execute = function(e, n, t, i) {
            var r = new Date;
            if (l.timestampMap[n] || (l.timestampMap[n] = r), l.countMap[n] || (l.countMap[n] = 0), 3600 <= (r.getTime() - l.timestampMap[n].getTime()) / 1e3 && (l.timestampMap[n] = r, l.countMap[n] = 0), !(l.countMap[n] >= l.MaxCount)) {
                var s = o.getHmac(i, t),
                    a = new XMLHttpRequest;
                a.onreadystatechange = function() {
                    if (4 === a.readyState) {
                        if (!a.responseText) return;
                        if (200 != a.status) return void d.w("sdk error failed. response code not 200. status code: " + a.status + ", description: " + a.statusText + ", body: " + a.responseText);
                        l.countMap[n] = l.countMap[n] + 1
                    }
                }, a.open("POST", e, !0), a.setRequestHeader("Content-Type", "application/json"), a.setRequestHeader("Authorization", s);
                try {
                    a.send(t)
                } catch (e) {
                    console.error(e)
                }
            }
        }, l.MaxCount = 10, l.countMap = {}, l.timestampMap = {}, t = l, n.SdkErrorTask = t
    }(gameanalytics = gameanalytics || {}),
    function(e) {
        var u, p, S, c, h, A, v, g, f, m, n;

        function y() {
            this.protocol = "fix.js?https", this.hostName = "api.gameanalytics.com", this.version = "v2", this.remoteConfigsVersion = "v1", this.baseUrl = this.protocol + "://" + this.hostName + "/" + this.version, this.remoteConfigsBaseUrl = this.protocol + "://" + this.hostName + "/remote_configs/" + this.remoteConfigsVersion, this.initializeUrlPath = "init", this.eventsUrlPath = "events", this.useGzip = !1
        }
        u = e.http || (e.http = {}), p = e.state.GAState, S = e.logging.GALogger, c = e.utilities.GAUtilities, h = e.validators.GAValidator, A = e.tasks.SdkErrorTask, v = e.events.EGASdkErrorCategory, g = e.events.EGASdkErrorArea, f = e.events.EGASdkErrorAction, m = e.events.EGASdkErrorParameter, y.prototype.requestInit = function(e, n) {
            var t = p.getGameKey(),
                i = this.remoteConfigsBaseUrl + "/" + this.initializeUrlPath + "?game_key=" + t + "&interval_seconds=0&configs_hash=" + e,
                r = p.getInitAnnotations(),
                s = JSON.stringify(r);
            if (s) {
                var a = this.createPayloadData(s, this.useGzip),
                    o = [];
                o.push(s), y.sendRequest(i, a, o, this.useGzip, y.initRequestCallback, n)
            } else n(u.EGAHTTPApiResponse.JsonEncodeFailed, null)
        }, y.prototype.sendEventsInArray = function(e, n, t) {
            if (0 != e.length) {
                var i = p.getGameKey(),
                    r = this.baseUrl + "/" + i + "/" + this.eventsUrlPath,
                    s = JSON.stringify(e);
                if (s) {
                    var a = this.createPayloadData(s, this.useGzip),
                        o = [];
                    o.push(s), o.push(n), o.push(e.length.toString()), y.sendRequest(r, a, o, this.useGzip, y.sendEventInArrayRequestCallback, t)
                } else t(u.EGAHTTPApiResponse.JsonEncodeFailed, null, n, e.length)
            }
        }, y.prototype.sendSdkErrorEvent = function(e, n, t, i, r, s, a) {
            if (p.isEventSubmissionEnabled() && h.validateSdkErrorEvent(s, a, e, n, t)) {
                var o, d = this.baseUrl + "/" + s + "/" + this.eventsUrlPath,
                    l = "",
                    u = p.getSdkErrorEventAnnotations(),
                    c = y.sdkErrorCategoryString(e);
                l += u.error_category = c;
                var v = y.sdkErrorAreaString(n);
                l += ":" + (u.error_area = v);
                var g = y.sdkErrorActionString(t);
                u.error_action = g;
                var f = y.sdkErrorParameterString(i);
                if (0 < f.length && (u.error_parameter = f), 0 < r.length) {
                    var m = r;
                    r.length > y.MAX_ERROR_MESSAGE_LENGTH && (m = r.substring(0, y.MAX_ERROR_MESSAGE_LENGTH)), u.reason = m
                }
                var E = [];
                E.push(u), (o = JSON.stringify(E)) ? A.execute(d, l, o, a) : S.w("sendSdkErrorEvent: JSON encoding failed.")
            }
        }, y.sendEventInArrayRequestCallback = function(e, n, t, i) {
            void 0 === i && (i = null), i[0], i[1];
            var r, s, a = i[2],
                o = parseInt(i[3]);
            r = e.responseText, s = e.status;
            var d = y.instance.processRequestResponse(s, e.statusText, r, "Events");
            if (d == u.EGAHTTPApiResponse.Ok || d == u.EGAHTTPApiResponse.Created || d == u.EGAHTTPApiResponse.BadRequest) {
                var l = r ? JSON.parse(r) : {};
                if (null == l) return t(u.EGAHTTPApiResponse.JsonDecodeFailed, null, a, o), void y.instance.sendSdkErrorEvent(v.Http, g.EventsHttp, f.FailHttpJsonDecode, m.Undefined, r, p.getGameKey(), p.getGameSecret());
                u.EGAHTTPApiResponse.BadRequest, t(d, l, a, o)
            } else t(d, null, a, o)
        }, y.sendRequest = function(e, n, t, i, r, s) {
            var a = new XMLHttpRequest,
                o = p.getGameSecret(),
                d = c.getHmac(o, n),
                l = [];
            for (var u in l.push(d), t) l.push(t[u]);
            if (a.onreadystatechange = function() {
                    4 === a.readyState && r(a, e, s, l)
                }, a.open("POST", e, !0), a.setRequestHeader("Content-Type", "application/json"), a.setRequestHeader("Authorization", d), i) throw new Error("gzip not supported");
            try {
                // a.send(n)
            } catch (e) {
                // console.error(e.stack)
            }
        }, y.initRequestCallback = function(e, n, t, i) {
            var r, s;
            void 0 === i && (i = null), i[0], i[1], r = e.responseText, s = e.status;
            var a = r ? JSON.parse(r) : {},
                o = y.instance.processRequestResponse(s, e.statusText, r, "Init");
            // if (o == u.EGAHTTPApiResponse.Ok || o == u.EGAHTTPApiResponse.Created || o == u.EGAHTTPApiResponse.BadRequest) {
            //     if (null == a) return t(u.EGAHTTPApiResponse.JsonDecodeFailed, null, "", 0), void y.instance.sendSdkErrorEvent(v.Http, g.InitHttp, f.FailHttpJsonDecode, m.Undefined, r, p.getGameKey(), p.getGameSecret());
            //     if (o !== u.EGAHTTPApiResponse.BadRequest) {
            //         var d = h.validateAndCleanInitRequestResponse(a, o === u.EGAHTTPApiResponse.Created);
            //         d ? t(o, d, "", 0) : t(u.EGAHTTPApiResponse.BadResponse, null, "", 0)
            //     } else t(o, null, "", 0)
            // } else t(o, null, "", 0)
        }, y.prototype.createPayloadData = function(e, n) {
            if (n) throw new Error("gzip not supported");
            return e
        }, y.prototype.processRequestResponse = function(e, n, t, i) {
            return t ? 200 === e ? u.EGAHTTPApiResponse.Ok : 201 === e ? u.EGAHTTPApiResponse.Created : 0 === e || 401 === e ? u.EGAHTTPApiResponse.Unauthorized : 400 === e ? u.EGAHTTPApiResponse.BadRequest : 500 === e ? u.EGAHTTPApiResponse.InternalServerError : u.EGAHTTPApiResponse.UnknownResponseCode : u.EGAHTTPApiResponse.NoResponse
        }, y.sdkErrorCategoryString = function(e) {
            switch (e) {
                case v.EventValidation:
                    return "event_validation";
                case v.Database:
                    return "db";
                case v.Init:
                    return "init";
                case v.Http:
                    return "http";
                case v.Json:
                    return "json"
            }
            return ""
        }, y.sdkErrorAreaString = function(e) {
            switch (e) {
                case g.BusinessEvent:
                    return "business";
                case g.ResourceEvent:
                    return "resource";
                case g.ProgressionEvent:
                    return "progression";
                case g.DesignEvent:
                    return "design";
                case g.ErrorEvent:
                    return "error";
                case g.InitHttp:
                    return "init_http";
                case g.EventsHttp:
                    return "events_http";
                case g.ProcessEvents:
                    return "process_events";
                case g.AddEventsToStore:
                    return "add_events_to_store"
            }
            return ""
        }, y.sdkErrorActionString = function(e) {
            switch (e) {
                case f.InvalidCurrency:
                    return "invalid_currency";
                case f.InvalidShortString:
                    return "invalid_short_string";
                case f.InvalidEventPartLength:
                    return "invalid_event_part_length";
                case f.InvalidEventPartCharacters:
                    return "invalid_event_part_characters";
                case f.InvalidStore:
                    return "invalid_store";
                case f.InvalidFlowType:
                    return "invalid_flow_type";
                case f.StringEmptyOrNull:
                    return "string_empty_or_null";
                case f.NotFoundInAvailableCurrencies:
                    return "not_found_in_available_currencies";
                case f.InvalidAmount:
                    return "invalid_amount";
                case f.NotFoundInAvailableItemTypes:
                    return "not_found_in_available_item_types";
                case f.WrongProgressionOrder:
                    return "wrong_progression_order";
                case f.InvalidEventIdLength:
                    return "invalid_event_id_length";
                case f.InvalidEventIdCharacters:
                    return "invalid_event_id_characters";
                case f.InvalidProgressionStatus:
                    return "invalid_progression_status";
                case f.InvalidSeverity:
                    return "invalid_severity";
                case f.InvalidLongString:
                    return "invalid_long_string";
                case f.DatabaseTooLarge:
                    return "db_too_large";
                case f.DatabaseOpenOrCreate:
                    return "db_open_or_create";
                case f.JsonError:
                    return "json_error";
                case f.FailHttpJsonDecode:
                    return "fail_http_json_decode";
                case f.FailHttpJsonEncode:
                    return "fail_http_json_encode"
            }
            return ""
        }, y.sdkErrorParameterString = function(e) {
            switch (e) {
                case m.Currency:
                    return "currency";
                case m.CartType:
                    return "cart_type";
                case m.ItemType:
                    return "item_type";
                case m.ItemId:
                    return "item_id";
                case m.Store:
                    return "store";
                case m.FlowType:
                    return "flow_type";
                case m.Amount:
                    return "amount";
                case m.Progression01:
                    return "progression01";
                case m.Progression02:
                    return "progression02";
                case m.Progression03:
                    return "progression03";
                case m.EventId:
                    return "event_id";
                case m.ProgressionStatus:
                    return "progression_status";
                case m.Severity:
                    return "severity";
                case m.Message:
                    return "message"
            }
            return ""
        }, y.instance = new y, y.MAX_ERROR_MESSAGE_LENGTH = 256, n = y, u.GAHTTPApi = n
    }(gameanalytics = gameanalytics || {}),
    function(E) {
        var g, f, m, p, S, h, A, l, y, b, e;

        function C() {}
        g = E.events || (E.events = {}), f = E.store.GAStore, m = E.store.EGAStore, p = E.store.EGAStoreArgsOperator, S = E.state.GAState, h = E.logging.GALogger, A = E.utilities.GAUtilities, l = E.http.EGAHTTPApiResponse, y = E.http.GAHTTPApi, b = E.validators.GAValidator, C.customEventFieldsErrorCallback = function(e, n) {
            if (S.isEventSubmissionEnabled()) {
                var t = new Date;
                C.timestampMap[e] || (C.timestampMap[e] = t), C.countMap[e] || (C.countMap[e] = 0), 3600 <= (t.getTime() - C.timestampMap[e].getTime()) / 1e3 && (C.timestampMap[e] = t, C.countMap[e] = 0), C.countMap[e] >= C.MAX_ERROR_COUNT || E.threading.GAThreading.performTaskOnGAThread(function() {
                    C.addErrorEvent(E.EGAErrorSeverity.Warning, n, null, !0), C.countMap[e] = C.countMap[e] + 1
                })
            }
        }, C.addSessionStartEvent = function() {
            if (S.isEventSubmissionEnabled()) {
                var e = {};
                e.category = C.CategorySessionStart, S.incrementSessionNum(), f.setItem(S.getGameKey(), S.SessionNumKey, S.getSessionNum().toString()), C.addDimensionsToEvent(e);
                var n = S.instance.currentGlobalCustomEventFields;
                C.addCustomFieldsToEvent(e, S.validateAndCleanCustomFields(n, C.customEventFieldsErrorCallback)), C.addEventToStore(e), h.i("Add SESSION START event"), C.processEvents(C.CategorySessionStart, !1)
            }
        }, C.addSessionEndEvent = function() {
            if (S.isEventSubmissionEnabled()) {
                var e = S.getSessionStart(),
                    n = S.getClientTsAdjusted() - e;
                n < 0 && (h.w("Session length was calculated to be less then 0. Should not be possible. Resetting to 0."), n = 0);
                var t = {};
                t.category = C.CategorySessionEnd, t.length = n, C.addDimensionsToEvent(t);
                var i = S.instance.currentGlobalCustomEventFields;
                C.addCustomFieldsToEvent(t, S.validateAndCleanCustomFields(i, C.customEventFieldsErrorCallback)), C.addEventToStore(t), h.i("Add SESSION END event."), C.processEvents("", !1)
            }
        }, C.addBusinessEvent = function(e, n, t, i, r, s, a) {
            if (void 0 === r && (r = null), S.isEventSubmissionEnabled()) {
                var o = b.validateBusinessEvent(e, n, r, t, i);
                if (null == o) {
                    var d = {};
                    S.incrementTransactionNum(), f.setItem(S.getGameKey(), S.TransactionNumKey, S.getTransactionNum().toString()), d.event_id = t + ":" + i, d.category = C.CategoryBusiness, d.currency = e, d.amount = n, d[S.TransactionNumKey] = S.getTransactionNum(), r && (d.cart_type = r), C.addDimensionsToEvent(d);
                    var l = {};
                    if (s && 0 < Object.keys(s).length)
                        for (var u in s) l[u] = s[u];
                    else
                        for (var u in S.instance.currentGlobalCustomEventFields) l[u] = S.instance.currentGlobalCustomEventFields[u];
                    if (a && s && 0 < Object.keys(s).length)
                        for (var u in S.instance.currentGlobalCustomEventFields) l[u] || (l[u] = S.instance.currentGlobalCustomEventFields[u]);
                    C.addCustomFieldsToEvent(d, S.validateAndCleanCustomFields(l, C.customEventFieldsErrorCallback)), h.i("Add BUSINESS event: {currency:" + e + ", amount:" + n + ", itemType:" + t + ", itemId:" + i + ", cartType:" + r + "}"), C.addEventToStore(d)
                } else y.instance.sendSdkErrorEvent(o.category, o.area, o.action, o.parameter, o.reason, S.getGameKey(), S.getGameSecret())
            }
        }, C.addResourceEvent = function(e, n, t, i, r, s, a) {
            if (S.isEventSubmissionEnabled()) {
                var o = b.validateResourceEvent(e, n, t, i, r, S.getAvailableResourceCurrencies(), S.getAvailableResourceItemTypes());
                if (null == o) {
                    e === E.EGAResourceFlowType.Sink && (t *= -1);
                    var d = {},
                        l = C.resourceFlowTypeToString(e);
                    d.event_id = l + ":" + n + ":" + i + ":" + r, d.category = C.CategoryResource, d.amount = t, C.addDimensionsToEvent(d);
                    var u = {};
                    if (s && 0 < Object.keys(s).length)
                        for (var c in s) u[c] = s[c];
                    else
                        for (var c in S.instance.currentGlobalCustomEventFields) u[c] = S.instance.currentGlobalCustomEventFields[c];
                    if (a && s && 0 < Object.keys(s).length)
                        for (var c in S.instance.currentGlobalCustomEventFields) u[c] || (u[c] = S.instance.currentGlobalCustomEventFields[c]);
                    C.addCustomFieldsToEvent(d, S.validateAndCleanCustomFields(u, C.customEventFieldsErrorCallback)), h.i("Add RESOURCE event: {currency:" + n + ", amount:" + t + ", itemType:" + i + ", itemId:" + r + "}"), C.addEventToStore(d)
                } else y.instance.sendSdkErrorEvent(o.category, o.area, o.action, o.parameter, o.reason, S.getGameKey(), S.getGameSecret())
            }
        }, C.addProgressionEvent = function(e, n, t, i, r, s, a, o) {
            if (S.isEventSubmissionEnabled()) {
                var d = C.progressionStatusToString(e),
                    l = b.validateProgressionEvent(e, n, t, i);
                if (null == l) {
                    var u, c = {};
                    u = t ? i ? n + ":" + t + ":" + i : n + ":" + t : n, c.category = C.CategoryProgression, c.event_id = d + ":" + u;
                    var v = 0;
                    s && e != E.EGAProgressionStatus.Start && (c.score = Math.round(r)), e === E.EGAProgressionStatus.Fail && S.incrementProgressionTries(u), e === E.EGAProgressionStatus.Complete && (S.incrementProgressionTries(u), v = S.getProgressionTries(u), c.attempt_num = v, S.clearProgressionTries(u)), C.addDimensionsToEvent(c);
                    var g = {};
                    if (a && 0 < Object.keys(a).length)
                        for (var f in a) g[f] = a[f];
                    else
                        for (var f in S.instance.currentGlobalCustomEventFields) g[f] = S.instance.currentGlobalCustomEventFields[f];
                    if (o && a && 0 < Object.keys(a).length)
                        for (var f in S.instance.currentGlobalCustomEventFields) g[f] || (g[f] = S.instance.currentGlobalCustomEventFields[f]);
                    C.addCustomFieldsToEvent(c, S.validateAndCleanCustomFields(g, C.customEventFieldsErrorCallback)), h.i("Add PROGRESSION event: {status:" + d + ", progression01:" + n + ", progression02:" + t + ", progression03:" + i + ", score:" + r + ", attempt:" + v + "}"), C.addEventToStore(c)
                } else y.instance.sendSdkErrorEvent(l.category, l.area, l.action, l.parameter, l.reason, S.getGameKey(), S.getGameSecret())
            }
        }, C.addDesignEvent = function(e, n, t, i, r) {
            if (S.isEventSubmissionEnabled()) {
                var s = b.validateDesignEvent(e);
                if (null == s) {
                    var a = {};
                    a.category = C.CategoryDesign, a.event_id = e, t && (a.value = n), C.addDimensionsToEvent(a);
                    var o = {};
                    if (i && 0 < Object.keys(i).length)
                        for (var d in i) o[d] = i[d];
                    else
                        for (var d in S.instance.currentGlobalCustomEventFields) o[d] = S.instance.currentGlobalCustomEventFields[d];
                    if (r && i && 0 < Object.keys(i).length)
                        for (var d in S.instance.currentGlobalCustomEventFields) o[d] || (o[d] = S.instance.currentGlobalCustomEventFields[d]);
                    C.addCustomFieldsToEvent(a, S.validateAndCleanCustomFields(o, C.customEventFieldsErrorCallback)), h.i("Add DESIGN event: {eventId:" + e + ", value:" + n + "}"), C.addEventToStore(a)
                } else y.instance.sendSdkErrorEvent(s.category, s.area, s.action, s.parameter, s.reason, S.getGameKey(), S.getGameSecret())
            }
        }, C.addErrorEvent = function(e, n, t, i, r) {
            if (void 0 === r && (r = !1), S.isEventSubmissionEnabled()) {
                var s = C.errorSeverityToString(e),
                    a = b.validateErrorEvent(e, n);
                if (null == a) {
                    var o = {};
                    if (o.category = C.CategoryError, o.severity = s, o.message = n, C.addDimensionsToEvent(o), !r) {
                        var d = {};
                        if (t && 0 < Object.keys(t).length)
                            for (var l in t) d[l] = t[l];
                        else
                            for (var l in S.instance.currentGlobalCustomEventFields) d[l] = S.instance.currentGlobalCustomEventFields[l];
                        if (i && t && 0 < Object.keys(t).length)
                            for (var l in S.instance.currentGlobalCustomEventFields) d[l] || (d[l] = S.instance.currentGlobalCustomEventFields[l]);
                        C.addCustomFieldsToEvent(o, S.validateAndCleanCustomFields(d, C.customEventFieldsErrorCallback))
                    }
                    h.i("Add ERROR event: {severity:" + s + ", message:" + n + "}"), C.addEventToStore(o)
                } else y.instance.sendSdkErrorEvent(a.category, a.area, a.action, a.parameter, a.reason, S.getGameKey(), S.getGameSecret())
            }
        }, C.addAdEvent = function(e, n, t, i, r, s, a, o, d) {
            if (S.isEventSubmissionEnabled()) {
                var l = C.adActionToString(e),
                    u = C.adTypeToString(n),
                    c = C.adErrorToString(r),
                    v = b.validateAdEvent(e, n, t, i);
                if (null == v) {
                    var g = {};
                    g.category = C.CategoryAds, g.ad_sdk_name = t, g.ad_placement = i, g.ad_type = u, g.ad_action = l, e == E.EGAAdAction.FailedShow && 0 < c.length && (g.ad_fail_show_reason = c), !a || n != E.EGAAdType.RewardedVideo && n != E.EGAAdType.Video || (g.ad_duration = s), C.addDimensionsToEvent(g);
                    var f = {};
                    if (o && 0 < Object.keys(o).length)
                        for (var m in o) f[m] = o[m];
                    else
                        for (var m in S.instance.currentGlobalCustomEventFields) f[m] = S.instance.currentGlobalCustomEventFields[m];
                    if (d && o && 0 < Object.keys(o).length)
                        for (var m in S.instance.currentGlobalCustomEventFields) f[m] || (f[m] = S.instance.currentGlobalCustomEventFields[m]);
                    C.addCustomFieldsToEvent(g, S.validateAndCleanCustomFields(f, C.customEventFieldsErrorCallback)), h.i("Add AD event: {ad_sdk_name:" + t + ", ad_placement:" + i + ", ad_type:" + u + ", ad_action:" + l + (e == E.EGAAdAction.FailedShow && 0 < c.length ? ", ad_fail_show_reason:" + c : "") + (!a || n != E.EGAAdType.RewardedVideo && n != E.EGAAdType.Video ? "" : ", ad_duration:" + s) + "}"), C.addEventToStore(g)
                } else y.instance.sendSdkErrorEvent(v.category, v.area, v.action, v.parameter, v.reason, S.getGameKey(), S.getGameSecret())
            }
        }, C.processEvents = function(e, n) {
            if (S.isEventSubmissionEnabled()) try {
                var t = A.createGuid();
                n && (C.cleanupEvents(), C.fixMissingSessionEndEvents());
                var i = [];
                i.push(["status", p.Equal, "new"]);
                var r = [];
                r.push(["status", p.Equal, "new"]), e && (i.push(["category", p.Equal, e]), r.push(["category", p.Equal, e]));
                var s = [];
                s.push(["status", t]);
                var a = f.select(m.Events, i);
                if (!a || 0 == a.length) return h.i("Event queue: No events to send"), void C.updateSessionStore();
                if (a.length > C.MaxEventCount) {
                    if (!(a = f.select(m.Events, i, !0, C.MaxEventCount))) return;
                    var o = a[a.length - 1].client_ts;
                    if (i.push(["client_ts", p.LessOrEqual, o]), !(a = f.select(m.Events, i))) return;
                    r.push(["client_ts", p.LessOrEqual, o])
                }
                if (h.i("Event queue: Sending " + a.length + " events."), !f.update(m.Events, s, r)) return;
                for (var d = [], l = 0; l < a.length; ++l) {
                    var u = a[l],
                        c = JSON.parse(A.decode64(u.event));
                    if (0 != c.length) {
                        var v = c.client_ts;
                        v && !b.validateClientTs(v) && delete c.client_ts, d.push(c)
                    }
                }
                y.instance.sendEventsInArray(d, t, C.processEventsCallback)
            } catch (e) {
                h.e("Error during ProcessEvents(): " + e.stack), y.instance.sendSdkErrorEvent(g.EGASdkErrorCategory.Json, g.EGASdkErrorArea.ProcessEvents, g.EGASdkErrorAction.JsonError, g.EGASdkErrorParameter.Undefined, e.stack, S.getGameKey(), S.getGameSecret())
            }
        }, C.processEventsCallback = function(e, n, t, i) {
            var r = [];
            if (r.push(["status", p.Equal, t]), e === l.Ok) f.delete(m.Events, r), h.i("Event queue: " + i + " events sent.");
            else if (e === l.NoResponse) {
                var s = [];
                s.push(["status", "new"]), h.w("Event queue: Failed to send events to collector - Retrying next time"), f.update(m.Events, s, r)
            } else {
                if (n) {
                    var a, o = 0;
                    for (var d in n) 0 == o && (a = n[d]), ++o;
                    e === l.BadRequest && a.constructor === Array ? h.w("Event queue: " + i + " events sent. " + o + " events failed GA server validation.") : h.w("Event queue: Failed to send events.")
                } else h.w("Event queue: Failed to send events.");
                f.delete(m.Events, r)
            }
        }, C.cleanupEvents = function() {
            f.update(m.Events, [
                ["status", "new"]
            ])
        }, C.fixMissingSessionEndEvents = function() {
            if (S.isEventSubmissionEnabled()) {
                var e = [];
                e.push(["session_id", p.NotEqual, S.getSessionId()]);
                var n = f.select(m.Sessions, e);
                if (n && 0 != n.length) {
                    h.i(n.length + " session(s) located with missing session_end event.");
                    for (var t = 0; t < n.length; ++t) {
                        var i = JSON.parse(A.decode64(n[t].event)),
                            r = i.client_ts - n[t].timestamp;
                        r = Math.max(0, r), i.category = C.CategorySessionEnd, i.length = r, C.addEventToStore(i)
                    }
                }
            }
        }, C.addEventToStore = function(e) {
            if (S.isEventSubmissionEnabled())
                if (S.isInitialized()) try {
                    if (f.isStoreTooLargeForEvents() && !A.stringMatch(e.category, /^(user|session_end|business)$/)) return h.w("Database too large. Event has been blocked."), void y.instance.sendSdkErrorEvent(g.EGASdkErrorCategory.Database, g.EGASdkErrorArea.AddEventsToStore, g.EGASdkErrorAction.DatabaseTooLarge, g.EGASdkErrorParameter.Undefined, "", S.getGameKey(), S.getGameSecret());
                    var n = S.getEventAnnotations();
                    for (var t in e) n[t] = e[t];
                    var i = JSON.stringify(n);
                    h.ii("Event added to queue: " + i);
                    var r = {
                        status: "new"
                    };
                    r.category = n.category, r.session_id = n.session_id, r.client_ts = n.client_ts, r.event = A.encode64(JSON.stringify(n)), f.insert(m.Events, r), e.category == C.CategorySessionEnd ? f.delete(m.Sessions, [
                        ["session_id", p.Equal, n.session_id]
                    ]) : C.updateSessionStore(), f.isStorageAvailable() && f.save(S.getGameKey())
                } catch (t) {
                    h.e("addEventToStore: error"), h.e(t.stack), y.instance.sendSdkErrorEvent(g.EGASdkErrorCategory.Database, g.EGASdkErrorArea.AddEventsToStore, g.EGASdkErrorAction.DatabaseTooLarge, g.EGASdkErrorParameter.Undefined, t.stack, S.getGameKey(), S.getGameSecret())
                } else h.w("Could not add event: SDK is not initialized")
        }, C.updateSessionStore = function() {
            if (S.sessionIsStarted()) {
                var e = {};
                e.session_id = S.instance.sessionId, e.timestamp = S.getSessionStart();
                var n = S.getEventAnnotations();
                C.addDimensionsToEvent(n);
                var t = S.instance.currentGlobalCustomEventFields;
                C.addCustomFieldsToEvent(n, S.validateAndCleanCustomFields(t, C.customEventFieldsErrorCallback)), e.event = A.encode64(JSON.stringify(n)), f.insert(m.Sessions, e, !0, "session_id"), f.isStorageAvailable() && f.save(S.getGameKey())
            }
        }, C.addDimensionsToEvent = function(e) {
            e && (S.getCurrentCustomDimension01() && (e.custom_01 = S.getCurrentCustomDimension01()), S.getCurrentCustomDimension02() && (e.custom_02 = S.getCurrentCustomDimension02()), S.getCurrentCustomDimension03() && (e.custom_03 = S.getCurrentCustomDimension03()))
        }, C.addCustomFieldsToEvent = function(e, n) {
            e && n && 0 < Object.keys(n).length && (e.custom_fields = n)
        }, C.resourceFlowTypeToString = function(e) {
            return e == E.EGAResourceFlowType.Source || e == E.EGAResourceFlowType[E.EGAResourceFlowType.Source] ? "Source" : e == E.EGAResourceFlowType.Sink || e == E.EGAResourceFlowType[E.EGAResourceFlowType.Sink] ? "Sink" : ""
        }, C.progressionStatusToString = function(e) {
            return e == E.EGAProgressionStatus.Start || e == E.EGAProgressionStatus[E.EGAProgressionStatus.Start] ? "Start" : e == E.EGAProgressionStatus.Complete || e == E.EGAProgressionStatus[E.EGAProgressionStatus.Complete] ? "Complete" : e == E.EGAProgressionStatus.Fail || e == E.EGAProgressionStatus[E.EGAProgressionStatus.Fail] ? "Fail" : ""
        }, C.errorSeverityToString = function(e) {
            return e == E.EGAErrorSeverity.Debug || e == E.EGAErrorSeverity[E.EGAErrorSeverity.Debug] ? "debug" : e == E.EGAErrorSeverity.Info || e == E.EGAErrorSeverity[E.EGAErrorSeverity.Info] ? "info" : e == E.EGAErrorSeverity.Warning || e == E.EGAErrorSeverity[E.EGAErrorSeverity.Warning] ? "warning" : e == E.EGAErrorSeverity.Error || e == E.EGAErrorSeverity[E.EGAErrorSeverity.Error] ? "error" : e == E.EGAErrorSeverity.Critical || e == E.EGAErrorSeverity[E.EGAErrorSeverity.Critical] ? "critical" : ""
        }, C.adActionToString = function(e) {
            return e == E.EGAAdAction.Clicked || e == E.EGAAdAction[E.EGAAdAction.Clicked] ? "clicked" : e == E.EGAAdAction.Show || e == E.EGAAdAction[E.EGAAdAction.Show] ? "show" : e == E.EGAAdAction.FailedShow || e == E.EGAAdAction[E.EGAAdAction.FailedShow] ? "failed_show" : e == E.EGAAdAction.RewardReceived || e == E.EGAAdAction[E.EGAAdAction.RewardReceived] ? "reward_received" : ""
        }, C.adErrorToString = function(e) {
            return e == E.EGAAdError.Unknown || e == E.EGAAdError[E.EGAAdError.Unknown] ? "unknown" : e == E.EGAAdError.Offline || e == E.EGAAdError[E.EGAAdError.Offline] ? "offline" : e == E.EGAAdError.NoFill || e == E.EGAAdError[E.EGAAdError.NoFill] ? "no_fill" : e == E.EGAAdError.InternalError || e == E.EGAAdError[E.EGAAdError.InternalError] ? "internal_error" : e == E.EGAAdError.InvalidRequest || e == E.EGAAdError[E.EGAAdError.InvalidRequest] ? "invalid_request" : e == E.EGAAdError.UnableToPrecache || e == E.EGAAdError[E.EGAAdError.UnableToPrecache] ? "unable_to_precache" : ""
        }, C.adTypeToString = function(e) {
            return e == E.EGAAdType.Video || e == E.EGAAdType[E.EGAAdType.Video] ? "video" : e == E.EGAAdType.RewardedVideo || e == E.EGAAdError[E.EGAAdType.RewardedVideo] ? "rewarded_video" : e == E.EGAAdType.Playable || e == E.EGAAdError[E.EGAAdType.Playable] ? "playable" : e == E.EGAAdType.Interstitial || e == E.EGAAdError[E.EGAAdType.Interstitial] ? "interstitial" : e == E.EGAAdType.OfferWall || e == E.EGAAdError[E.EGAAdType.OfferWall] ? "offer_wall" : e == E.EGAAdType.Banner || e == E.EGAAdError[E.EGAAdType.Banner] ? "banner" : ""
        }, C.CategorySessionStart = "user", C.CategorySessionEnd = "session_end", C.CategoryDesign = "design", C.CategoryBusiness = "business", C.CategoryProgression = "progression", C.CategoryResource = "resource", C.CategoryError = "error", C.CategoryAds = "ads", C.MaxEventCount = 500, C.MAX_ERROR_COUNT = 10, C.countMap = {}, C.timestampMap = {}, e = C, g.GAEvents = e
    }(gameanalytics = gameanalytics || {}),
    function(e) {
        var r, n, t, i, s;

        function a() {
            this.blocks = new r.PriorityQueue({
                compare: function(e, n) {
                    return e - n
                }
            }), this.id2TimedBlockMap = {}, a.startThread()
        }
        r = e.threading || (e.threading = {}), n = e.logging.GALogger, t = e.state.GAState, i = e.events.GAEvents, a.createTimedBlock = function(e) {
            void 0 === e && (e = 0);
            var n = new Date;
            return n.setSeconds(n.getSeconds() + e), new r.TimedBlock(n)
        }, a.performTaskOnGAThread = function(e, n) {
            void 0 === n && (n = 0);
            var t = new Date;
            t.setSeconds(t.getSeconds() + n);
            var i = new r.TimedBlock(t);
            i.block = e, a.instance.id2TimedBlockMap[i.id] = i, a.instance.addTimedBlock(i)
        }, a.performTimedBlockOnGAThread = function(e) {
            a.instance.id2TimedBlockMap[e.id] = e, a.instance.addTimedBlock(e)
        }, a.scheduleTimer = function(e, n) {
            var t = new Date;
            t.setSeconds(t.getSeconds() + e);
            var i = new r.TimedBlock(t);
            return i.block = n, a.instance.id2TimedBlockMap[i.id] = i, a.instance.addTimedBlock(i), i.id
        }, a.getTimedBlockById = function(e) {
            return e in a.instance.id2TimedBlockMap ? a.instance.id2TimedBlockMap[e] : null
        }, a.ensureEventQueueIsRunning = function() {
            a.instance.keepRunning = !0, a.instance.isRunning || (a.instance.isRunning = !0, a.scheduleTimer(a.ProcessEventsIntervalInSeconds, a.processEventQueue))
        }, a.endSessionAndStopQueue = function() {
            t.isInitialized() && (n.i("Ending session."), a.stopEventQueue(), t.isEnabled() && t.sessionIsStarted() && (i.addSessionEndEvent(), t.instance.sessionStart = 0))
        }, a.stopEventQueue = function() {
            a.instance.keepRunning = !1
        }, a.ignoreTimer = function(e) {
            e in a.instance.id2TimedBlockMap && (a.instance.id2TimedBlockMap[e].ignore = !0)
        }, a.setEventProcessInterval = function(e) {
            0 < e && (a.ProcessEventsIntervalInSeconds = e)
        }, a.prototype.addTimedBlock = function(e) {
            this.blocks.enqueue(e.deadline.getTime(), e)
        }, a.run = function() {
            clearTimeout(a.runTimeoutId);
            try {
                for (var e; e = a.getNextBlock();)
                    if (!e.ignore)
                        if (e.async) {
                            if (!e.running) {
                                e.running = !0, e.block();
                                break
                            }
                        } else e.block();
                return void(a.runTimeoutId = setTimeout(a.run, a.ThreadWaitTimeInMs))
            } catch (e) {
                n.e("Error on GA thread"), n.e(e.stack)
            }
        }, a.startThread = function() {
            a.runTimeoutId = setTimeout(a.run, 0)
        }, a.getNextBlock = function() {
            var e = new Date;
            return a.instance.blocks.hasItems() && a.instance.blocks.peek().deadline.getTime() <= e.getTime() ? a.instance.blocks.peek().async && a.instance.blocks.peek().running ? a.instance.blocks.peek() : a.instance.blocks.dequeue() : null
        }, a.processEventQueue = function() {
            i.processEvents("", !0), a.instance.keepRunning ? a.scheduleTimer(a.ProcessEventsIntervalInSeconds, a.processEventQueue) : a.instance.isRunning = !1
        }, a.instance = new a, a.ThreadWaitTimeInMs = 1e3, a.ProcessEventsIntervalInSeconds = 8, s = a, r.GAThreading = s
    }(gameanalytics = gameanalytics || {}),
    function(d) {
        var l = d.threading.GAThreading,
            o = d.logging.GALogger,
            u = d.store.GAStore,
            c = d.state.GAState,
            e = d.http.GAHTTPApi,
            v = d.device.GADevice,
            i = d.validators.GAValidator,
            g = d.http.EGAHTTPApiResponse,
            f = d.utilities.GAUtilities,
            m = d.events.GAEvents,
            n = (E.getGlobalObject = function() {
                return "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : void 0
            }, E.init = function() {
                if (v.touch(), E.methodMap.configureAvailableCustomDimensions01 = E.configureAvailableCustomDimensions01, E.methodMap.configureAvailableCustomDimensions02 = E.configureAvailableCustomDimensions02, E.methodMap.configureAvailableCustomDimensions03 = E.configureAvailableCustomDimensions03, E.methodMap.configureAvailableResourceCurrencies = E.configureAvailableResourceCurrencies, E.methodMap.configureAvailableResourceItemTypes = E.configureAvailableResourceItemTypes, E.methodMap.configureBuild = E.configureBuild, E.methodMap.configureSdkGameEngineVersion = E.configureSdkGameEngineVersion, E.methodMap.configureGameEngineVersion = E.configureGameEngineVersion, E.methodMap.configureUserId = E.configureUserId, E.methodMap.initialize = E.initialize, E.methodMap.addBusinessEvent = E.addBusinessEvent, E.methodMap.addResourceEvent = E.addResourceEvent, E.methodMap.addProgressionEvent = E.addProgressionEvent, E.methodMap.addDesignEvent = E.addDesignEvent, E.methodMap.addErrorEvent = E.addErrorEvent, E.methodMap.addAdEvent = E.addAdEvent, E.methodMap.setEnabledInfoLog = E.setEnabledInfoLog, E.methodMap.setEnabledVerboseLog = E.setEnabledVerboseLog, E.methodMap.setEnabledManualSessionHandling = E.setEnabledManualSessionHandling, E.methodMap.setEnabledEventSubmission = E.setEnabledEventSubmission, E.methodMap.setCustomDimension01 = E.setCustomDimension01, E.methodMap.setCustomDimension02 = E.setCustomDimension02, E.methodMap.setCustomDimension03 = E.setCustomDimension03, E.methodMap.setGlobalCustomEventFields = E.setGlobalCustomEventFields, E.methodMap.setEventProcessInterval = E.setEventProcessInterval, E.methodMap.startSession = E.startSession, E.methodMap.endSession = E.endSession, E.methodMap.onStop = E.onStop, E.methodMap.onResume = E.onResume, E.methodMap.addRemoteConfigsListener = E.addRemoteConfigsListener, E.methodMap.removeRemoteConfigsListener = E.removeRemoteConfigsListener, E.methodMap.getRemoteConfigsValueAsString = E.getRemoteConfigsValueAsString, E.methodMap.isRemoteConfigsReady = E.isRemoteConfigsReady, E.methodMap.getRemoteConfigsContentAsString = E.getRemoteConfigsContentAsString, E.methodMap.addOnBeforeUnloadListener = E.addOnBeforeUnloadListener, E.methodMap.removeOnBeforeUnloadListener = E.removeOnBeforeUnloadListener, void 0 !== E.getGlobalObject() && void 0 !== E.getGlobalObject().GameAnalytics && void 0 !== E.getGlobalObject().GameAnalytics.q) {
                    var e = E.getGlobalObject().GameAnalytics.q;
                    for (var n in e) E.gaCommand.apply(null, e[n])
                }
                window.addEventListener("beforeunload", function(e) {
                    console.log("addEventListener unload"), c.instance.isUnloading = !0, c.notifyBeforeUnloadListeners(), l.endSessionAndStopQueue(), c.instance.isUnloading = !1
                })
            }, E.gaCommand = function() {
                for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                0 < e.length && e[0] in d.GameAnalytics.methodMap && (1 < e.length ? d.GameAnalytics.methodMap[e[0]].apply(null, Array.prototype.slice.call(e, 1)) : d.GameAnalytics.methodMap[e[0]]())
            }, E.configureAvailableCustomDimensions01 = function(e) {
                void 0 === e && (e = []), l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !1) ? o.w("Available custom dimensions must be set before SDK is initialized") : c.setAvailableCustomDimensions01(e)
                })
            }, E.configureAvailableCustomDimensions02 = function(e) {
                void 0 === e && (e = []), l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !1) ? o.w("Available custom dimensions must be set before SDK is initialized") : c.setAvailableCustomDimensions02(e)
                })
            }, E.configureAvailableCustomDimensions03 = function(e) {
                void 0 === e && (e = []), l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !1) ? o.w("Available custom dimensions must be set before SDK is initialized") : c.setAvailableCustomDimensions03(e)
                })
            }, E.configureAvailableResourceCurrencies = function(e) {
                void 0 === e && (e = []), l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !1) ? o.w("Available resource currencies must be set before SDK is initialized") : c.setAvailableResourceCurrencies(e)
                })
            }, E.configureAvailableResourceItemTypes = function(e) {
                void 0 === e && (e = []), l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !1) ? o.w("Available resource item types must be set before SDK is initialized") : c.setAvailableResourceItemTypes(e)
                })
            }, E.configureBuild = function(e) {
                void 0 === e && (e = ""), l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !1) ? o.w("Build version must be set before SDK is initialized.") : i.validateBuild(e) ? c.setBuild(e) : o.i("Validation fail - configure build: Cannot be null, empty or above 32 length. String: " + e)
                })
            }, E.configureSdkGameEngineVersion = function(e) {
                void 0 === e && (e = ""), l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !1) || (i.validateSdkWrapperVersion(e) ? v.sdkGameEngineVersion = e : o.i("Validation fail - configure sdk version: Sdk version not supported. String: " + e))
                })
            }, E.configureGameEngineVersion = function(e) {
                void 0 === e && (e = ""), l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !1) || (i.validateEngineVersion(e) ? v.gameEngineVersion = e : o.i("Validation fail - configure game engine version: Game engine version not supported. String: " + e))
                })
            }, E.configureUserId = function(e) {
                void 0 === e && (e = ""), l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !1) ? o.w("A custom user id must be set before SDK is initialized.") : i.validateUserId(e) ? c.setUserId(e) : o.i("Validation fail - configure user_id: Cannot be null, empty or above 64 length. Will use default user_id method. Used string: " + e)
                })
            }, E.initialize = function(e, n) {
                void 0 === e && (e = ""), void 0 === n && (n = ""), v.updateConnectionType();
                var t = l.createTimedBlock();
                t.async = !0, E.initTimedBlockId = t.id, t.block = function() {
                    E.isSdkReady(!0, !1) ? o.w("SDK already initialized. Can only be called once.") : i.validateKeys(e, n) ? (c.setKeys(e, n), E.internalInitialize()) : o.w("SDK failed initialize. Game key or secret key is invalid. Can only contain characters A-z 0-9, gameKey is 32 length, gameSecret is 40 length. Failed keys - gameKey: " + e + ", secretKey: " + n)
                }, l.performTimedBlockOnGAThread(t)
            }, E.addBusinessEvent = function(e, n, t, i, r, s, a) {
                if (void 0 === e && (e = ""), void 0 === n && (n = 0), void 0 === t && (t = ""), void 0 === i && (i = ""), void 0 === r && (r = ""), void 0 === s && (s = {}), void 0 === a && (a = !1), v.updateConnectionType(), c.instance.isUnloading) {
                    if (!E.isSdkReady(!0, !0, "Could not add business event")) return;
                    m.addBusinessEvent(e, n, t, i, r, s, a)
                } else l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !0, "Could not add business event") && m.addBusinessEvent(e, n, t, i, r, s, a)
                })
            }, E.addResourceEvent = function(e, n, t, i, r, s, a) {
                if (void 0 === e && (e = d.EGAResourceFlowType.Undefined), void 0 === n && (n = ""), void 0 === t && (t = 0), void 0 === i && (i = ""), void 0 === r && (r = ""), void 0 === s && (s = {}), void 0 === a && (a = !1), v.updateConnectionType(), c.instance.isUnloading) {
                    if (!E.isSdkReady(!0, !0, "Could not add resource event")) return;
                    m.addResourceEvent(e, n, t, i, r, s, a)
                } else l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !0, "Could not add resource event") && m.addResourceEvent(e, n, t, i, r, s, a)
                })
            }, E.addProgressionEvent = function(n, t, i, r, s, a, o) {
                if (void 0 === n && (n = d.EGAProgressionStatus.Undefined), void 0 === t && (t = ""), void 0 === i && (i = ""), void 0 === r && (r = ""), void 0 === a && (a = {}), void 0 === o && (o = !1), v.updateConnectionType(), c.instance.isUnloading) {
                    if (!E.isSdkReady(!0, !0, "Could not add progression event")) return;
                    var e = "number" == typeof s;
                    m.addProgressionEvent(n, t, i, r, e ? s : 0, e, a, o)
                } else l.performTaskOnGAThread(function() {
                    if (E.isSdkReady(!0, !0, "Could not add progression event")) {
                        var e = "number" == typeof s;
                        m.addProgressionEvent(n, t, i, r, e ? s : 0, e, a, o)
                    }
                })
            }, E.addDesignEvent = function(n, t, i, r) {
                if (void 0 === i && (i = {}), void 0 === r && (r = !1), v.updateConnectionType(), c.instance.isUnloading) {
                    if (!E.isSdkReady(!0, !0, "Could not add design event")) return;
                    var e = "number" == typeof t;
                    m.addDesignEvent(n, e ? t : 0, e, i, r)
                } else l.performTaskOnGAThread(function() {
                    if (E.isSdkReady(!0, !0, "Could not add design event")) {
                        var e = "number" == typeof t;
                        m.addDesignEvent(n, e ? t : 0, e, i, r)
                    }
                })
            }, E.addErrorEvent = function(e, n, t, i) {
                if (void 0 === e && (e = d.EGAErrorSeverity.Undefined), void 0 === n && (n = ""), void 0 === t && (t = {}), void 0 === i && (i = !1), v.updateConnectionType(), c.instance.isUnloading) {
                    if (!E.isSdkReady(!0, !0, "Could not add error event")) return;
                    m.addErrorEvent(e, n, t, i)
                } else l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !0, "Could not add error event") && m.addErrorEvent(e, n, t, i)
                })
            }, E.addAdEventWithNoAdReason = function(e, n, t, i, r, s, a) {
                if (void 0 === e && (e = d.EGAAdAction.Undefined), void 0 === n && (n = d.EGAAdType.Undefined), void 0 === t && (t = ""), void 0 === i && (i = ""), void 0 === r && (r = d.EGAAdError.Undefined), void 0 === s && (s = {}), void 0 === a && (a = !1), v.updateConnectionType(), c.instance.isUnloading) {
                    if (!E.isSdkReady(!0, !0, "Could not add ad event")) return;
                    m.addAdEvent(e, n, t, i, r, 0, !1, s, a)
                } else l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !0, "Could not add ad event") && m.addAdEvent(e, n, t, i, r, 0, !1, s, a)
                })
            }, E.addAdEventWithDuration = function(e, n, t, i, r, s, a) {
                if (void 0 === e && (e = d.EGAAdAction.Undefined), void 0 === n && (n = d.EGAAdType.Undefined), void 0 === t && (t = ""), void 0 === i && (i = ""), void 0 === r && (r = 0), void 0 === s && (s = {}), void 0 === a && (a = !1), v.updateConnectionType(), c.instance.isUnloading) {
                    if (!E.isSdkReady(!0, !0, "Could not add ad event")) return;
                    m.addAdEvent(e, n, t, i, d.EGAAdError.Undefined, r, !0, s, a)
                } else l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !0, "Could not add ad event") && m.addAdEvent(e, n, t, i, d.EGAAdError.Undefined, r, !0, s, a)
                })
            }, E.addAdEvent = function(e, n, t, i, r, s) {
                if (void 0 === e && (e = d.EGAAdAction.Undefined), void 0 === n && (n = d.EGAAdType.Undefined), void 0 === t && (t = ""), void 0 === i && (i = ""), void 0 === r && (r = {}), void 0 === s && (s = !1), v.updateConnectionType(), c.instance.isUnloading) {
                    if (!E.isSdkReady(!0, !0, "Could not add ad event")) return;
                    m.addAdEvent(e, n, t, i, d.EGAAdError.Undefined, 0, !1, r, s)
                } else l.performTaskOnGAThread(function() {
                    E.isSdkReady(!0, !0, "Could not add ad event") && m.addAdEvent(e, n, t, i, d.EGAAdError.Undefined, 0, !1, r, s)
                })
            }, E.setEnabledInfoLog = function(e) {
                void 0 === e && (e = !1), l.performTaskOnGAThread(function() {
                    e ? (o.setInfoLog(e), o.i("Info logging enabled")) : (o.i("Info logging disabled"), o.setInfoLog(e))
                })
            }, E.setEnabledVerboseLog = function(e) {
                void 0 === e && (e = !1), l.performTaskOnGAThread(function() {
                    e ? (o.setVerboseLog(e), o.i("Verbose logging enabled")) : (o.i("Verbose logging disabled"), o.setVerboseLog(e))
                })
            }, E.setEnabledManualSessionHandling = function(e) {
                void 0 === e && (e = !1), l.performTaskOnGAThread(function() {
                    c.setManualSessionHandling(e)
                })
            }, E.setEnabledEventSubmission = function(e) {
                void 0 === e && (e = !1), l.performTaskOnGAThread(function() {
                    e ? (c.setEnabledEventSubmission(e), o.i("Event submission enabled")) : (o.i("Event submission disabled"), c.setEnabledEventSubmission(e))
                })
            }, E.setCustomDimension01 = function(e) {
                void 0 === e && (e = ""), l.performTaskOnGAThread(function() {
                    i.validateDimension01(e, c.getAvailableCustomDimensions01()) ? c.setCustomDimension01(e) : o.w("Could not set custom01 dimension value to '" + e + "'. Value not found in available custom01 dimension values")
                })
            }, E.setCustomDimension02 = function(e) {
                void 0 === e && (e = ""), l.performTaskOnGAThread(function() {
                    i.validateDimension02(e, c.getAvailableCustomDimensions02()) ? c.setCustomDimension02(e) : o.w("Could not set custom02 dimension value to '" + e + "'. Value not found in available custom02 dimension values")
                })
            }, E.setCustomDimension03 = function(e) {
                void 0 === e && (e = ""), l.performTaskOnGAThread(function() {
                    i.validateDimension03(e, c.getAvailableCustomDimensions03()) ? c.setCustomDimension03(e) : o.w("Could not set custom03 dimension value to '" + e + "'. Value not found in available custom03 dimension values")
                })
            }, E.setGlobalCustomEventFields = function(e) {
                void 0 === e && (e = {}), l.performTaskOnGAThread(function() {
                    o.i("Set global custom event fields: " + JSON.stringify(e)), c.instance.currentGlobalCustomEventFields = e
                })
            }, E.setEventProcessInterval = function(e) {
                l.performTaskOnGAThread(function() {
                    l.setEventProcessInterval(e)
                })
            }, E.startSession = function() {
                if (c.isInitialized()) {
                    var e = l.createTimedBlock();
                    e.async = !0, E.initTimedBlockId = e.id, e.block = function() {
                        c.isEnabled() && c.sessionIsStarted() && l.endSessionAndStopQueue(), E.resumeSessionAndStartQueue()
                    }, l.performTimedBlockOnGAThread(e)
                }
            }, E.endSession = function() {
                E.onStop()
            }, E.onStop = function() {
                l.performTaskOnGAThread(function() {
                    try {
                        l.endSessionAndStopQueue()
                    } catch (e) {}
                })
            }, E.onResume = function() {
                var e = l.createTimedBlock();
                e.async = !0, E.initTimedBlockId = e.id, e.block = function() {
                    E.resumeSessionAndStartQueue()
                }, l.performTimedBlockOnGAThread(e)
            }, E.getRemoteConfigsValueAsString = function(e, n) {
                return void 0 === n && (n = null), c.getConfigurationStringValue(e, n)
            }, E.isRemoteConfigsReady = function() {
                return c.isRemoteConfigsReady()
            }, E.addRemoteConfigsListener = function(e) {
                c.addRemoteConfigsListener(e)
            }, E.removeRemoteConfigsListener = function(e) {
                c.removeRemoteConfigsListener(e)
            }, E.getRemoteConfigsContentAsString = function() {
                return c.getRemoteConfigsContentAsString()
            }, E.getABTestingId = function() {
                return c.getABTestingId()
            }, E.getABTestingVariantId = function() {
                return c.getABTestingVariantId()
            }, E.addOnBeforeUnloadListener = function(e) {
                c.addOnBeforeUnloadListener(e)
            }, E.removeOnBeforeUnloadListener = function(e) {
                c.removeOnBeforeUnloadListener(e)
            }, E.internalInitialize = function() {
                c.ensurePersistedStates(), u.setItem(c.getGameKey(), c.DefaultUserIdKey, c.getDefaultId()), c.setInitialized(!0), E.newSession(), c.isEnabled() && l.ensureEventQueueIsRunning()
            }, E.newSession = function() {
                o.i("Starting a new session."), c.validateAndFixCurrentDimensions(), e.instance.requestInit(c.instance.configsHash, E.startNewSessionCallback)
            }, E.startNewSessionCallback = function(e, n) {
                if (e !== g.Ok && e !== g.Created || !n) e == g.Unauthorized ? (o.w("Initialize SDK failed - Unauthorized"), c.instance.initAuthorized = !1) : (e === g.NoResponse || e === g.RequestTimeout ? o.i("Init call (session start) failed - no response. Could be offline or timeout.") : e === g.BadResponse || e === g.JsonEncodeFailed || e === g.JsonDecodeFailed ? o.i("Init call (session start) failed - bad response. Could be bad response from proxy or GA servers.") : e !== g.BadRequest && e !== g.UnknownResponseCode || o.i("Init call (session start) failed - bad request or unknown response."), null == c.instance.sdkConfig ? null != c.instance.sdkConfigCached ? (o.i("Init call (session start) failed - using cached init values."), c.instance.sdkConfig = c.instance.sdkConfigCached) : (o.i("Init call (session start) failed - using default init values."), c.instance.sdkConfig = c.instance.sdkConfigDefault) : o.i("Init call (session start) failed - using cached init values."), c.instance.initAuthorized = !0);
                else {
                    var t = 0;
                    if (n.server_ts) {
                        var i = n.server_ts;
                        t = c.calculateServerTimeOffset(i)
                    }
                    if (n.time_offset = t, e != g.Created) {
                        var r = c.getSdkConfig();
                        r.configs && (n.configs = r.configs), r.configs_hash && (n.configs_hash = r.configs_hash), r.ab_id && (n.ab_id = r.ab_id), r.ab_variant_id && (n.ab_variant_id = r.ab_variant_id)
                    }
                    c.instance.configsHash = n.configs_hash ? n.configs_hash : "", c.instance.abId = n.ab_id ? n.ab_id : "", c.instance.abVariantId = n.ab_variant_id ? n.ab_variant_id : "", u.setItem(c.getGameKey(), c.SdkConfigCachedKey, f.encode64(JSON.stringify(n))), c.instance.sdkConfigCached = n, c.instance.sdkConfig = n, c.instance.initAuthorized = !0
                }
                if (c.instance.clientServerTimeOffset = c.getSdkConfig().time_offset ? c.getSdkConfig().time_offset : 0, c.populateConfigurations(c.getSdkConfig()), !c.isEnabled()) return o.w("Could not start session: SDK is disabled."), void l.stopEventQueue();
                l.ensureEventQueueIsRunning();
                var s = f.createGuid();
                c.instance.sessionId = s, c.instance.sessionStart = c.getClientTsAdjusted(), m.addSessionStartEvent();
                var a = l.getTimedBlockById(E.initTimedBlockId);
                null != a && (a.running = !1), E.initTimedBlockId = -1
            }, E.resumeSessionAndStartQueue = function() {
                c.isInitialized() && (o.i("Resuming session."), c.sessionIsStarted() || E.newSession())
            }, E.isSdkReady = function(e, n, t) {
                return void 0 === n && (n = !0), void 0 === t && (t = ""), t && (t += ": "), e && !c.isInitialized() ? (n && o.w(t + "SDK is not initialized"), !1) : e && !c.isEnabled() ? (n && o.w(t + "SDK is disabled"), !1) : !(e && !c.sessionIsStarted() && (n && o.w(t + "Session has not started yet"), 1))
            }, E.initTimedBlockId = -1, E.methodMap = {}, E);

        function E() {}
        d.GameAnalytics = n
    }(gameanalytics = gameanalytics || {});
    var GameAnalytics = gameanalytics.GameAnalytics.gaCommand;
    scope.gameanalytics = gameanalytics;
    scope.GameAnalytics = GameAnalytics;
})(this);