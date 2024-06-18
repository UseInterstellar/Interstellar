
(() => {
	var aa = Object.create;
	var Xe = Object.defineProperty;
	var sa = Object.getOwnPropertyDescriptor;
	var oa = Object.getOwnPropertyNames;
	var ca = Object.getPrototypeOf,
		ua = Object.prototype.hasOwnProperty;
	var la = (e, t, i) =>
		t in e
			? Xe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
			: (e[t] = i);
	var Tt = (e, t) => () => (
			t || e((t = { exports: {} }).exports, t), t.exports
		),
		dr = (e, t) => {
			for (var i in t) Xe(e, i, { get: t[i], enumerable: !0 });
		},
		ha = (e, t, i, r) => {
			if ((t && typeof t == "object") || typeof t == "function")
				for (const n of oa(t))
					!ua.call(e, n) &&
						n !== i &&
						Xe(e, n, {
							get: () => t[n],
							enumerable: !(r = sa(t, n)) || r.enumerable,
						});
			return e;
		};
	var Qe = (e, t, i) => (
		(i = e != null ? aa(ca(e)) : {}),
		ha(
			t || !e || !e.__esModule
				? Xe(i, "default", { value: e, enumerable: !0 })
				: i,
			e,
		)
	);
	var q = (e, t, i) => (la(e, typeof t != "symbol" ? t + "" : t, i), i);
	var Nt = Tt((go, yr) => {
		function te(e) {
			if (typeof e != "string")
				throw new TypeError(
					"Path must be a string. Received " + JSON.stringify(e),
				);
		}
		function mr(e, t) {
			for (var i = "", r = 0, n = -1, a = 0, s, o = 0; o <= e.length; ++o) {
				if (o < e.length) s = e.charCodeAt(o);
				else {
					if (s === 47) break;
					s = 47;
				}
				if (s === 47) {
					if (!(n === o - 1 || a === 1))
						if (n !== o - 1 && a === 2) {
							if (
								i.length < 2 ||
								r !== 2 ||
								i.charCodeAt(i.length - 1) !== 46 ||
								i.charCodeAt(i.length - 2) !== 46
							) {
								if (i.length > 2) {
									var c = i.lastIndexOf("/");
									if (c !== i.length - 1) {
										c === -1
											? ((i = ""), (r = 0))
											: ((i = i.slice(0, c)),
												(r = i.length - 1 - i.lastIndexOf("/"))),
											(n = o),
											(a = 0);
										continue;
									}
								} else if (i.length === 2 || i.length === 1) {
									(i = ""), (r = 0), (n = o), (a = 0);
									continue;
								}
							}
							t && (i.length > 0 ? (i += "/..") : (i = ".."), (r = 2));
						} else
							i.length > 0
								? (i += "/" + e.slice(n + 1, o))
								: (i = e.slice(n + 1, o)),
								(r = o - n - 1);
					(n = o), (a = 0);
				} else s === 46 && a !== -1 ? ++a : (a = -1);
			}
			return i;
		}
		function pa(e, t) {
			var i = t.dir || t.root,
				r = t.base || (t.name || "") + (t.ext || "");
			return i ? (i === t.root ? i + r : i + e + r) : r;
		}
		var _e = {
			resolve: () => {
				for (
					var t = "", i = !1, r, n = arguments.length - 1;
					n >= -1 && !i;
					n--
				) {
					var a;
					n >= 0
						? (a = arguments[n])
						: (r === void 0 && (r = process.cwd()), (a = r)),
						te(a),
						a.length !== 0 && ((t = a + "/" + t), (i = a.charCodeAt(0) === 47));
				}
				return (
					(t = mr(t, !i)),
					i ? (t.length > 0 ? "/" + t : "/") : t.length > 0 ? t : "."
				);
			},
			normalize: (t) => {
				if ((te(t), t.length === 0)) return ".";
				var i = t.charCodeAt(0) === 47,
					r = t.charCodeAt(t.length - 1) === 47;
				return (
					(t = mr(t, !i)),
					t.length === 0 && !i && (t = "."),
					t.length > 0 && r && (t += "/"),
					i ? "/" + t : t
				);
			},
			isAbsolute: (t) => (te(t), t.length > 0 && t.charCodeAt(0) === 47),
			join: () => {
				if (arguments.length === 0) return ".";
				for (var t, i = 0; i < arguments.length; ++i) {
					var r = arguments[i];
					te(r), r.length > 0 && (t === void 0 ? (t = r) : (t += "/" + r));
				}
				return t === void 0 ? "." : _e.normalize(t);
			},
			relative: (t, i) => {
				if (
					(te(t),
					te(i),
					t === i || ((t = _e.resolve(t)), (i = _e.resolve(i)), t === i))
				)
					return "";
				for (var r = 1; r < t.length && t.charCodeAt(r) === 47; ++r);
				for (
					var n = t.length, a = n - r, s = 1;
					s < i.length && i.charCodeAt(s) === 47;
					++s
				);
				for (
					var o = i.length, c = o - s, l = a < c ? a : c, h = -1, f = 0;
					f <= l;
					++f
				) {
					if (f === l) {
						if (c > l) {
							if (i.charCodeAt(s + f) === 47) return i.slice(s + f + 1);
							if (f === 0) return i.slice(s + f);
						} else
							a > l &&
								(t.charCodeAt(r + f) === 47 ? (h = f) : f === 0 && (h = 0));
						break;
					}
					var A = t.charCodeAt(r + f),
						d = i.charCodeAt(s + f);
					if (A !== d) break;
					A === 47 && (h = f);
				}
				var p = "";
				for (f = r + h + 1; f <= n; ++f)
					(f === n || t.charCodeAt(f) === 47) &&
						(p.length === 0 ? (p += "..") : (p += "/.."));
				return p.length > 0
					? p + i.slice(s + h)
					: ((s += h), i.charCodeAt(s) === 47 && ++s, i.slice(s));
			},
			_makeLong: (t) => t,
			dirname: (t) => {
				if ((te(t), t.length === 0)) return ".";
				for (
					var i = t.charCodeAt(0),
						r = i === 47,
						n = -1,
						a = !0,
						s = t.length - 1;
					s >= 1;
					--s
				)
					if (((i = t.charCodeAt(s)), i === 47)) {
						if (!a) {
							n = s;
							break;
						}
					} else a = !1;
				return n === -1 ? (r ? "/" : ".") : r && n === 1 ? "//" : t.slice(0, n);
			},
			basename: (t, i) => {
				if (i !== void 0 && typeof i != "string")
					throw new TypeError('"ext" argument must be a string');
				te(t);
				var r = 0,
					n = -1,
					a = !0,
					s;
				if (i !== void 0 && i.length > 0 && i.length <= t.length) {
					if (i.length === t.length && i === t) return "";
					var o = i.length - 1,
						c = -1;
					for (s = t.length - 1; s >= 0; --s) {
						var l = t.charCodeAt(s);
						if (l === 47) {
							if (!a) {
								r = s + 1;
								break;
							}
						} else
							c === -1 && ((a = !1), (c = s + 1)),
								o >= 0 &&
									(l === i.charCodeAt(o)
										? --o === -1 && (n = s)
										: ((o = -1), (n = c)));
					}
					return r === n ? (n = c) : n === -1 && (n = t.length), t.slice(r, n);
				} else {
					for (s = t.length - 1; s >= 0; --s)
						if (t.charCodeAt(s) === 47) {
							if (!a) {
								r = s + 1;
								break;
							}
						} else n === -1 && ((a = !1), (n = s + 1));
					return n === -1 ? "" : t.slice(r, n);
				}
			},
			extname: (t) => {
				te(t);
				for (
					var i = -1, r = 0, n = -1, a = !0, s = 0, o = t.length - 1;
					o >= 0;
					--o
				) {
					var c = t.charCodeAt(o);
					if (c === 47) {
						if (!a) {
							r = o + 1;
							break;
						}
						continue;
					}
					n === -1 && ((a = !1), (n = o + 1)),
						c === 46
							? i === -1
								? (i = o)
								: s !== 1 && (s = 1)
							: i !== -1 && (s = -1);
				}
				return i === -1 ||
					n === -1 ||
					s === 0 ||
					(s === 1 && i === n - 1 && i === r + 1)
					? ""
					: t.slice(i, n);
			},
			format: (t) => {
				if (t === null || typeof t != "object")
					throw new TypeError(
						'The "pathObject" argument must be of type Object. Received type ' +
							typeof t,
					);
				return pa("/", t);
			},
			parse: (t) => {
				te(t);
				var i = { root: "", dir: "", base: "", ext: "", name: "" };
				if (t.length === 0) return i;
				var r = t.charCodeAt(0),
					n = r === 47,
					a;
				n ? ((i.root = "/"), (a = 1)) : (a = 0);
				for (
					var s = -1, o = 0, c = -1, l = !0, h = t.length - 1, f = 0;
					h >= a;
					--h
				) {
					if (((r = t.charCodeAt(h)), r === 47)) {
						if (!l) {
							o = h + 1;
							break;
						}
						continue;
					}
					c === -1 && ((l = !1), (c = h + 1)),
						r === 46
							? s === -1
								? (s = h)
								: f !== 1 && (f = 1)
							: s !== -1 && (f = -1);
				}
				return (
					s === -1 ||
					c === -1 ||
					f === 0 ||
					(f === 1 && s === c - 1 && s === o + 1)
						? c !== -1 &&
							(o === 0 && n
								? (i.base = i.name = t.slice(1, c))
								: (i.base = i.name = t.slice(o, c)))
						: (o === 0 && n
								? ((i.name = t.slice(1, s)), (i.base = t.slice(1, c)))
								: ((i.name = t.slice(o, s)), (i.base = t.slice(o, c))),
							(i.ext = t.slice(s, c))),
					o > 0 ? (i.dir = t.slice(0, o - 1)) : n && (i.dir = "/"),
					i
				);
			},
			sep: "/",
			delimiter: ":",
			win32: null,
			posix: null,
		};
		_e.posix = _e;
		yr.exports = _e;
	});
	var vn = Tt((si) => {
		si.parse = Ls;
		si.serialize = Ps;
		var As = Object.prototype.toString,
			lt = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
		function Ls(e, t) {
			if (typeof e != "string")
				throw new TypeError("argument str must be a string");
			for (var i = {}, r = t || {}, n = r.decode || Rs, a = 0; a < e.length; ) {
				var s = e.indexOf("=", a);
				if (s === -1) break;
				var o = e.indexOf(";", a);
				if (o === -1) o = e.length;
				else if (o < s) {
					a = e.lastIndexOf(";", s - 1) + 1;
					continue;
				}
				var c = e.slice(a, s).trim();
				if (i[c] === void 0) {
					var l = e.slice(s + 1, o).trim();
					l.charCodeAt(0) === 34 && (l = l.slice(1, -1)), (i[c] = Ns(l, n));
				}
				a = o + 1;
			}
			return i;
		}
		function Ps(e, t, i) {
			var r = i || {},
				n = r.encode || Is;
			if (typeof n != "function")
				throw new TypeError("option encode is invalid");
			if (!lt.test(e)) throw new TypeError("argument name is invalid");
			var a = n(t);
			if (a && !lt.test(a)) throw new TypeError("argument val is invalid");
			var s = e + "=" + a;
			if (r.maxAge != null) {
				var o = r.maxAge - 0;
				if (isNaN(o) || !isFinite(o))
					throw new TypeError("option maxAge is invalid");
				s += "; Max-Age=" + Math.floor(o);
			}
			if (r.domain) {
				if (!lt.test(r.domain)) throw new TypeError("option domain is invalid");
				s += "; Domain=" + r.domain;
			}
			if (r.path) {
				if (!lt.test(r.path)) throw new TypeError("option path is invalid");
				s += "; Path=" + r.path;
			}
			if (r.expires) {
				var c = r.expires;
				if (!Ts(c) || isNaN(c.valueOf()))
					throw new TypeError("option expires is invalid");
				s += "; Expires=" + c.toUTCString();
			}
			if (
				(r.httpOnly && (s += "; HttpOnly"),
				r.secure && (s += "; Secure"),
				r.priority)
			) {
				var l =
					typeof r.priority == "string" ? r.priority.toLowerCase() : r.priority;
				switch (l) {
					case "low":
						s += "; Priority=Low";
						break;
					case "medium":
						s += "; Priority=Medium";
						break;
					case "high":
						s += "; Priority=High";
						break;
					default:
						throw new TypeError("option priority is invalid");
				}
			}
			if (r.sameSite) {
				var h =
					typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite;
				switch (h) {
					case !0:
						s += "; SameSite=Strict";
						break;
					case "lax":
						s += "; SameSite=Lax";
						break;
					case "strict":
						s += "; SameSite=Strict";
						break;
					case "none":
						s += "; SameSite=None";
						break;
					default:
						throw new TypeError("option sameSite is invalid");
				}
			}
			return s;
		}
		function Rs(e) {
			return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
		}
		function Is(e) {
			return encodeURIComponent(e);
		}
		function Ts(e) {
			return As.call(e) === "[object Date]" || e instanceof Date;
		}
		function Ns(e, t) {
			try {
				return t(e);
			} catch {
				return e;
			}
		}
	});
	var En = Tt((ko, Oe) => {
		var Ee = { decodeValues: !0, map: !1, silent: !1 };
		function oi(e) {
			return typeof e == "string" && !!e.trim();
		}
		function ci(e, t) {
			var i = e.split(";").filter(oi),
				r = i.shift(),
				n = Ms(r),
				a = n.name,
				s = n.value;
			t = t ? Object.assign({}, Ee, t) : Ee;
			try {
				s = t.decodeValues ? decodeURIComponent(s) : s;
			} catch (c) {
				console.error(
					"set-cookie-parser encountered an error while decoding a cookie with value '" +
						s +
						"'. Set options.decodeValues to false to disable this feature.",
					c,
				);
			}
			var o = { name: a, value: s };
			return (
				i.forEach((c) => {
					var l = c.split("="),
						h = l.shift().trimLeft().toLowerCase(),
						f = l.join("=");
					h === "expires"
						? (o.expires = new Date(f))
						: h === "max-age"
							? (o.maxAge = Number.parseInt(f, 10))
							: h === "secure"
								? (o.secure = !0)
								: h === "httponly"
									? (o.httpOnly = !0)
									: h === "samesite"
										? (o.sameSite = f)
										: (o[h] = f);
				}),
				o
			);
		}
		function Ms(e) {
			var t = "",
				i = "",
				r = e.split("=");
			return (
				r.length > 1 ? ((t = r.shift()), (i = r.join("="))) : (i = e),
				{ name: t, value: i }
			);
		}
		function Sn(e, t) {
			if (((t = t ? Object.assign({}, Ee, t) : Ee), !e)) return t.map ? {} : [];
			if (e.headers)
				if (typeof e.headers.getSetCookie == "function")
					e = e.headers.getSetCookie();
				else if (e.headers["set-cookie"]) e = e.headers["set-cookie"];
				else {
					var i =
						e.headers[
							Object.keys(e.headers).find((n) => n.toLowerCase() === "set-cookie")
						];
					!i &&
						e.headers.cookie &&
						!t.silent &&
						console.warn(
							"Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.",
						),
						(e = i);
				}
			if (
				(Array.isArray(e) || (e = [e]),
				(t = t ? Object.assign({}, Ee, t) : Ee),
				t.map)
			) {
				var r = {};
				return e.filter(oi).reduce((n, a) => {
					var s = ci(a, t);
					return (n[s.name] = s), n;
				}, r);
			} else
				return e.filter(oi).map((n) => ci(n, t));
		}
		function Ds(e) {
			if (Array.isArray(e)) return e;
			if (typeof e != "string") return [];
			var t = [],
				i = 0,
				r,
				n,
				a,
				s,
				o;
			function c() {
				while (i < e.length && /\s/.test(e.charAt(i))) i += 1;
				return i < e.length;
			}
			function l() {
				return (n = e.charAt(i)), n !== "=" && n !== ";" && n !== ",";
			}
			while (i < e.length) {
				for (r = i, o = !1; c(); )
					if (((n = e.charAt(i)), n === ",")) {
						for (a = i, i += 1, c(), s = i; i < e.length && l(); ) i += 1;
						i < e.length && e.charAt(i) === "="
							? ((o = !0), (i = s), t.push(e.substring(r, a)), (r = i))
							: (i = a + 1);
					} else i += 1;
				(!o || i >= e.length) && t.push(e.substring(r, e.length));
			}
			return t;
		}
		Oe.exports = Sn;
		Oe.exports.parse = Sn;
		Oe.exports.parseString = ci;
		Oe.exports.splitCookiesString = Ds;
	});
	var xr = Qe(Nt()),
		Ye = {
			"application/ecmascript": {
				source: "apache",
				compressible: !0,
				extensions: ["ecma"],
			},
			"application/gzip": {
				source: "iana",
				compressible: !1,
				extensions: ["gz"],
			},
			"application/http": { source: "iana" },
			"application/javascript": {
				source: "apache",
				charset: "UTF-8",
				compressible: !0,
				extensions: ["js"],
			},
			"application/json": {
				source: "iana",
				charset: "UTF-8",
				compressible: !0,
				extensions: ["json", "map"],
			},
			"application/manifest+json": {
				source: "iana",
				charset: "UTF-8",
				compressible: !0,
				extensions: ["webmanifest"],
			},
			"application/marc": { source: "iana", extensions: ["mrc"] },
			"application/mp4": {
				source: "iana",
				extensions: ["mp4", "mpg4", "mp4s", "m4p"],
			},
			"application/ogg": {
				source: "iana",
				compressible: !1,
				extensions: ["ogx"],
			},
			"application/sql": { source: "iana", extensions: ["sql"] },
			"application/wasm": {
				source: "iana",
				compressible: !0,
				extensions: ["wasm"],
			},
			"application/x-bittorrent": { source: "apache", extensions: ["torrent"] },
			"application/x-gzip": { source: "apache" },
			"application/x-javascript": { compressible: !0 },
			"application/x-web-app-manifest+json": {
				compressible: !0,
				extensions: ["webapp"],
			},
			"application/x-www-form-urlencoded": { source: "iana", compressible: !0 },
			"application/xhtml+xml": {
				source: "iana",
				compressible: !0,
				extensions: ["xhtml", "xht"],
			},
			"application/xhtml-voice+xml": { source: "apache", compressible: !0 },
			"application/xml": {
				source: "iana",
				compressible: !0,
				extensions: ["xml", "xsl", "xsd", "rng"],
			},
			"application/zip": {
				source: "iana",
				compressible: !1,
				extensions: ["zip"],
			},
			"application/zlib": { source: "iana" },
			"audio/midi": {
				source: "apache",
				extensions: ["mid", "midi", "kar", "rmi"],
			},
			"audio/mp3": { compressible: !1, extensions: ["mp3"] },
			"audio/mp4": {
				source: "iana",
				compressible: !1,
				extensions: ["m4a", "mp4a"],
			},
			"audio/mp4a-latm": { source: "iana" },
			"audio/mpa": { source: "iana" },
			"audio/mpa-robust": { source: "iana" },
			"audio/mpeg": {
				source: "iana",
				compressible: !1,
				extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
			},
			"audio/ogg": {
				source: "iana",
				compressible: !1,
				extensions: ["oga", "ogg", "spx", "opus"],
			},
			"audio/red": { source: "iana" },
			"audio/rtx": { source: "iana" },
			"audio/scip": { source: "iana" },
			"audio/silk": { source: "apache", extensions: ["sil"] },
			"audio/smv": { source: "iana" },
			"audio/wav": { compressible: !1, extensions: ["wav"] },
			"audio/wave": { compressible: !1, extensions: ["wav"] },
			"audio/webm": {
				source: "apache",
				compressible: !1,
				extensions: ["weba"],
			},
			"audio/x-aac": {
				source: "apache",
				compressible: !1,
				extensions: ["aac"],
			},
			"audio/x-aiff": { source: "apache", extensions: ["aif", "aiff", "aifc"] },
			"audio/x-caf": {
				source: "apache",
				compressible: !1,
				extensions: ["caf"],
			},
			"audio/x-flac": { source: "apache", extensions: ["flac"] },
			"audio/x-m4a": { source: "nginx", extensions: ["m4a"] },
			"audio/x-matroska": { source: "apache", extensions: ["mka"] },
			"audio/x-mpegurl": { source: "apache", extensions: ["m3u"] },
			"audio/x-ms-wax": { source: "apache", extensions: ["wax"] },
			"audio/x-ms-wma": { source: "apache", extensions: ["wma"] },
			"audio/x-pn-realaudio": { source: "apache", extensions: ["ram", "ra"] },
			"audio/x-pn-realaudio-plugin": { source: "apache", extensions: ["rmp"] },
			"audio/x-realaudio": { source: "nginx", extensions: ["ra"] },
			"audio/x-tta": { source: "apache" },
			"audio/x-wav": { source: "apache", extensions: ["wav"] },
			"audio/xm": { source: "apache", extensions: ["xm"] },
			"font/collection": { source: "iana", extensions: ["ttc"] },
			"font/otf": { source: "iana", compressible: !0, extensions: ["otf"] },
			"font/sfnt": { source: "iana" },
			"font/ttf": { source: "iana", compressible: !0, extensions: ["ttf"] },
			"font/woff": { source: "iana", extensions: ["woff"] },
			"font/woff2": { source: "iana", extensions: ["woff2"] },
			"image/gif": { source: "iana", compressible: !1, extensions: ["gif"] },
			"image/heic": { source: "iana", extensions: ["heic"] },
			"image/heic-sequence": { source: "iana", extensions: ["heics"] },
			"image/heif": { source: "iana", extensions: ["heif"] },
			"image/jpeg": {
				source: "iana",
				compressible: !1,
				extensions: ["jpeg", "jpg", "jpe"],
			},
			"image/png": { source: "iana", compressible: !1, extensions: ["png"] },
			"image/svg+xml": {
				source: "iana",
				compressible: !0,
				extensions: ["svg", "svgz"],
			},
			"image/webp": { source: "iana", extensions: ["webp"] },
			"text/coffeescript": { extensions: ["coffee", "litcoffee"] },
			"text/css": {
				source: "iana",
				charset: "UTF-8",
				compressible: !0,
				extensions: ["css"],
			},
			"text/ecmascript": { source: "apache" },
			"text/html": {
				source: "iana",
				compressible: !0,
				extensions: ["html", "htm", "shtml"],
			},
			"text/jade": { extensions: ["jade"] },
			"text/javascript": {
				source: "iana",
				charset: "UTF-8",
				compressible: !0,
				extensions: ["js", "mjs"],
			},
			"text/markdown": {
				source: "iana",
				compressible: !0,
				extensions: ["md", "markdown"],
			},
		},
		_r = /^\s*([^;\s]*)(?:;|\s|$)/,
		fa = /^text\//i,
		U = {};
	function gr(e) {
		if (!e || typeof e != "string") return !1;
		var t = _r.exec(e),
			i = t && Ye[t[1].toLowerCase()];
		return i && i.charset ? i.charset : !(!t || !fa.test(t[1])) && "UTF-8";
	}
	function da(e) {
		if (!e || typeof e != "string") return !1;
		var t = e.indexOf("/") === -1 ? U.lookup(e) : e;
		if (!t) return !1;
		if (t.indexOf("charset") === -1) {
			var i = U.charset(t);
			i && (t += "; charset=" + i.toLowerCase());
		}
		return t;
	}
	function ma(e) {
		if (!e || typeof e != "string") return !1;
		var t = _r.exec(e),
			i = t && U.extensions[t[1].toLowerCase()];
		return !(!i || !i.length) && i[0];
	}
	function ya(e) {
		if (!e || typeof e != "string") return !1;
		var t = (0, xr.extname)("x." + e)
			.toLowerCase()
			.substr(1);
		return (t && U.types[t]) || !1;
	}
	function ga(e, t) {
		var i = ["nginx", "apache", void 0, "iana"];
		Object.keys(Ye).forEach((r) => {
			var n = Ye[r],
				a = n.extensions;
			if (a && a.length) {
				e[r] = a;
				for (var s = 0; s < a.length; s++) {
					var o = a[s];
					if (t[o]) {
						var c = i.indexOf(Ye[t[o]].source),
							l = i.indexOf(n.source);
						if (
							t[o] !== "application/octet-stream" &&
							(c > l || (c === l && t[o].substr(0, 12) === "application/"))
						)
							continue;
					}
					t[o] = r;
				}
			}
		});
	}
	(U.charset = gr),
		(U.charsets = { lookup: gr }),
		(U.contentType = da),
		(U.extension = ma),
		(U.extensions = Object.create(null)),
		(U.lookup = ya),
		(U.types = Object.create(null)),
		ga(U.extensions, U.types);
	var br = U;
	var Us = Qe(Nt(), 1);
	var Je = {};
	dr(Je, {
		deleteDB: () => Ca,
		openDB: () => Bt,
		unwrap: () => Le,
		wrap: () => G,
	});
	var xa = (e, t) => t.some((i) => e instanceof i),
		wr,
		vr;
	function _a() {
		return (
			wr ||
			(wr = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
		);
	}
	function ba() {
		return (
			vr ||
			(vr = [
				IDBCursor.prototype.advance,
				IDBCursor.prototype.continue,
				IDBCursor.prototype.continuePrimaryKey,
			])
		);
	}
	var Sr = new WeakMap(),
		Dt = new WeakMap(),
		Er = new WeakMap(),
		Mt = new WeakMap(),
		Vt = new WeakMap();
	function wa(e) {
		const t = new Promise((i, r) => {
			const n = () => {
					e.removeEventListener("success", a),
						e.removeEventListener("error", s);
				},
				a = () => {
					i(G(e.result)), n();
				},
				s = () => {
					r(e.error), n();
				};
			e.addEventListener("success", a), e.addEventListener("error", s);
		});
		return (
			t
				.then((i) => {
					i instanceof IDBCursor && Sr.set(i, e);
				})
				.catch(() => {}),
			Vt.set(t, e),
			t
		);
	}
	function va(e) {
		if (Dt.has(e)) return;
		const t = new Promise((i, r) => {
			const n = () => {
					e.removeEventListener("complete", a),
						e.removeEventListener("error", s),
						e.removeEventListener("abort", s);
				},
				a = () => {
					i(), n();
				},
				s = () => {
					r(e.error || new DOMException("AbortError", "AbortError")), n();
				};
			e.addEventListener("complete", a),
				e.addEventListener("error", s),
				e.addEventListener("abort", s);
		});
		Dt.set(e, t);
	}
	var Ot = {
		get(e, t, i) {
			if (e instanceof IDBTransaction) {
				if (t === "done") return Dt.get(e);
				if (t === "objectStoreNames") return e.objectStoreNames || Er.get(e);
				if (t === "store")
					return i.objectStoreNames[1]
						? void 0
						: i.objectStore(i.objectStoreNames[0]);
			}
			return G(e[t]);
		},
		set(e, t, i) {
			return (e[t] = i), !0;
		},
		has(e, t) {
			return e instanceof IDBTransaction && (t === "done" || t === "store")
				? !0
				: t in e;
		},
	};
	function Cr(e) {
		Ot = e(Ot);
	}
	function Sa(e) {
		return e === IDBDatabase.prototype.transaction &&
			!("objectStoreNames" in IDBTransaction.prototype)
			? function (t, ...i) {
					const r = e.call(Le(this), t, ...i);
					return Er.set(r, t.sort ? t.sort() : [t]), G(r);
				}
			: ba().includes(e)
				? function (...t) {
						return e.apply(Le(this), t), G(Sr.get(this));
					}
				: function (...t) {
						return G(e.apply(Le(this), t));
					};
	}
	function Ea(e) {
		return typeof e == "function"
			? Sa(e)
			: (e instanceof IDBTransaction && va(e),
				xa(e, _a()) ? new Proxy(e, Ot) : e);
	}
	function G(e) {
		if (e instanceof IDBRequest) return wa(e);
		if (Mt.has(e)) return Mt.get(e);
		const t = Ea(e);
		return t !== e && (Mt.set(e, t), Vt.set(t, e)), t;
	}
	var Le = (e) => Vt.get(e);
	function Bt(
		e,
		t,
		{ blocked: i, upgrade: r, blocking: n, terminated: a } = {},
	) {
		const s = indexedDB.open(e, t),
			o = G(s);
		return (
			r &&
				s.addEventListener("upgradeneeded", (c) => {
					r(G(s.result), c.oldVersion, c.newVersion, G(s.transaction), c);
				}),
			i &&
				s.addEventListener("blocked", (c) => i(c.oldVersion, c.newVersion, c)),
			o
				.then((c) => {
					a && c.addEventListener("close", () => a()),
						n &&
							c.addEventListener("versionchange", (l) =>
								n(l.oldVersion, l.newVersion, l),
							);
				})
				.catch(() => {}),
			o
		);
	}
	function Ca(e, { blocked: t } = {}) {
		const i = indexedDB.deleteDatabase(e);
		return (
			t && i.addEventListener("blocked", (r) => t(r.oldVersion, r)),
			G(i).then(() => {})
		);
	}
	var ka = ["get", "getKey", "getAll", "getAllKeys", "count"],
		Aa = ["put", "add", "delete", "clear"],
		Ft = new Map();
	function kr(e, t) {
		if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
			return;
		if (Ft.get(t)) return Ft.get(t);
		const i = t.replace(/FromIndex$/, ""),
			r = t !== i,
			n = Aa.includes(i);
		if (
			!(i in (r ? IDBIndex : IDBObjectStore).prototype) ||
			!(n || ka.includes(i))
		)
			return;
		const a = async function (s, ...o) {
			let c = this.transaction(s, n ? "readwrite" : "readonly"),
				l = c.store;
			return (
				r && (l = l.index(o.shift())),
				(await Promise.all([l[i](...o), n && c.done]))[0]
			);
		};
		return Ft.set(t, a), a;
	}
	Cr((e) => ({
		...e,
		get: (t, i, r) => kr(t, i) || e.get(t, i, r),
		has: (t, i) => !!kr(t, i) || e.has(t, i),
	}));
	var La = [
			509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1,
			574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1,
			11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49,
			13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3,
			1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9,
			214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14,
			166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9,
			41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13,
			123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10,
			1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60,
			6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22,
			543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0,
			15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10,
			9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239,
		],
		Ir = [
			0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48,
			48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35,
			5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68,
			310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3,
			22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16,
			3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14,
			17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21,
			43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30,
			0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1,
			64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2,
			4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185,
			46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63,
			32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0,
			29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0,
			50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18,
			16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16,
			1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3,
			32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9,
			1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9,
			395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3,
			3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4,
			6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30,
			2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19,
			43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2,
			26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2,
			2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3,
			2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221,
			3, 5761, 15, 7472, 3104, 541, 1507, 4938, 6, 4191,
		],
		Pa =
			"\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F",
		Tr =
			"\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
		$t = {
			3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
			5: "class enum extends super const export import",
			6: "enum",
			strict:
				"implements interface let package private protected public static yield",
			strictBind: "eval arguments",
		},
		jt =
			"break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",
		Ra = {
			5: jt,
			"5module": jt + " export import",
			6: jt + " const class extends export import super",
		},
		Ia = /^in(stanceof)?$/,
		Ta = new RegExp("[" + Tr + "]"),
		Na = new RegExp("[" + Tr + Pa + "]");
	function Ht(e, t) {
		for (var i = 65536, r = 0; r < t.length; r += 2) {
			if (((i += t[r]), i > e)) return !1;
			if (((i += t[r + 1]), i >= e)) return !0;
		}
		return !1;
	}
	function ce(e, t) {
		return e < 65
			? e === 36
			: e < 91
				? !0
				: e < 97
					? e === 95
					: e < 123
						? !0
						: e <= 65535
							? e >= 170 && Ta.test(String.fromCharCode(e))
							: t === !1
								? !1
								: Ht(e, Ir);
	}
	function be(e, t) {
		return e < 48
			? e === 36
			: e < 58
				? !0
				: e < 65
					? !1
					: e < 91
						? !0
						: e < 97
							? e === 95
							: e < 123
								? !0
								: e <= 65535
									? e >= 170 && Na.test(String.fromCharCode(e))
									: t === !1
										? !1
										: Ht(e, Ir) || Ht(e, La);
	}
	var L = function (t, i) {
		i === void 0 && (i = {}),
			(this.label = t),
			(this.keyword = i.keyword),
			(this.beforeExpr = !!i.beforeExpr),
			(this.startsExpr = !!i.startsExpr),
			(this.isLoop = !!i.isLoop),
			(this.isAssign = !!i.isAssign),
			(this.prefix = !!i.prefix),
			(this.postfix = !!i.postfix),
			(this.binop = i.binop || null),
			(this.updateContext = null);
	};
	function z(e, t) {
		return new L(e, { beforeExpr: !0, binop: t });
	}
	var K = { beforeExpr: !0 },
		H = { startsExpr: !0 },
		Gt = {};
	function k(e, t) {
		return t === void 0 && (t = {}), (t.keyword = e), (Gt[e] = new L(e, t));
	}
	var u = {
			num: new L("num", H),
			regexp: new L("regexp", H),
			string: new L("string", H),
			name: new L("name", H),
			privateId: new L("privateId", H),
			eof: new L("eof"),
			bracketL: new L("[", { beforeExpr: !0, startsExpr: !0 }),
			bracketR: new L("]"),
			braceL: new L("{", { beforeExpr: !0, startsExpr: !0 }),
			braceR: new L("}"),
			parenL: new L("(", { beforeExpr: !0, startsExpr: !0 }),
			parenR: new L(")"),
			comma: new L(",", K),
			semi: new L(";", K),
			colon: new L(":", K),
			dot: new L("."),
			question: new L("?", K),
			questionDot: new L("?."),
			arrow: new L("=>", K),
			template: new L("template"),
			invalidTemplate: new L("invalidTemplate"),
			ellipsis: new L("...", K),
			backQuote: new L("`", H),
			dollarBraceL: new L("${", { beforeExpr: !0, startsExpr: !0 }),
			eq: new L("=", { beforeExpr: !0, isAssign: !0 }),
			assign: new L("_=", { beforeExpr: !0, isAssign: !0 }),
			incDec: new L("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
			prefix: new L("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
			logicalOR: z("||", 1),
			logicalAND: z("&&", 2),
			bitwiseOR: z("|", 3),
			bitwiseXOR: z("^", 4),
			bitwiseAND: z("&", 5),
			equality: z("==/!=/===/!==", 6),
			relational: z("</>/<=/>=", 7),
			bitShift: z("<</>>/>>>", 8),
			plusMin: new L("+/-", {
				beforeExpr: !0,
				binop: 9,
				prefix: !0,
				startsExpr: !0,
			}),
			modulo: z("%", 10),
			star: z("*", 10),
			slash: z("/", 10),
			starstar: new L("**", { beforeExpr: !0 }),
			coalesce: z("??", 1),
			_break: k("break"),
			_case: k("case", K),
			_catch: k("catch"),
			_continue: k("continue"),
			_debugger: k("debugger"),
			_default: k("default", K),
			_do: k("do", { isLoop: !0, beforeExpr: !0 }),
			_else: k("else", K),
			_finally: k("finally"),
			_for: k("for", { isLoop: !0 }),
			_function: k("function", H),
			_if: k("if"),
			_return: k("return", K),
			_switch: k("switch"),
			_throw: k("throw", K),
			_try: k("try"),
			_var: k("var"),
			_const: k("const"),
			_while: k("while", { isLoop: !0 }),
			_with: k("with"),
			_new: k("new", { beforeExpr: !0, startsExpr: !0 }),
			_this: k("this", H),
			_super: k("super", H),
			_class: k("class", H),
			_extends: k("extends", K),
			_export: k("export"),
			_import: k("import", H),
			_null: k("null", H),
			_true: k("true", H),
			_false: k("false", H),
			_in: k("in", { beforeExpr: !0, binop: 7 }),
			_instanceof: k("instanceof", { beforeExpr: !0, binop: 7 }),
			_typeof: k("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
			_void: k("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
			_delete: k("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
		},
		Y = /\r\n?|\n|\u2028|\u2029/,
		Ma = new RegExp(Y.source, "g");
	function we(e) {
		return e === 10 || e === 13 || e === 8232 || e === 8233;
	}
	function Nr(e, t, i) {
		i === void 0 && (i = e.length);
		for (var r = t; r < i; r++) {
			var n = e.charCodeAt(r);
			if (we(n))
				return r < i - 1 && n === 13 && e.charCodeAt(r + 1) === 10
					? r + 2
					: r + 1;
		}
		return -1;
	}
	var Mr = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
		X = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
		Dr = Object.prototype,
		Da = Dr.hasOwnProperty,
		Oa = Dr.toString,
		Te =
			Object.hasOwn ||
			((e, t) => Da.call(e, t)),
		Ar =
			Array.isArray ||
			((e) => Oa.call(e) === "[object Array]");
	function pe(e) {
		return new RegExp("^(?:" + e.replace(/ /g, "|") + ")$");
	}
	function fe(e) {
		return e <= 65535
			? String.fromCharCode(e)
			: ((e -= 65536),
				String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
	}
	var Va =
			/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,
		Re = function (t, i) {
			(this.line = t), (this.column = i);
		};
	Re.prototype.offset = function (t) {
		return new Re(this.line, this.column + t);
	};
	var rt = function (t, i, r) {
		(this.start = i),
			(this.end = r),
			t.sourceFile !== null && (this.source = t.sourceFile);
	};
	function Or(e, t) {
		for (var i = 1, r = 0; ; ) {
			var n = Nr(e, r, t);
			if (n < 0) return new Re(i, t - r);
			++i, (r = n);
		}
	}
	var Wt = {
			ecmaVersion: null,
			sourceType: "script",
			onInsertedSemicolon: null,
			onTrailingComma: null,
			allowReserved: null,
			allowReturnOutsideFunction: !1,
			allowImportExportEverywhere: !1,
			allowAwaitOutsideFunction: null,
			allowSuperOutsideMethod: null,
			allowHashBang: !1,
			checkPrivateFields: !0,
			locations: !1,
			onToken: null,
			onComment: null,
			ranges: !1,
			program: null,
			sourceFile: null,
			directSourceFile: null,
			preserveParens: !1,
		},
		Lr = !1;
	function Fa(e) {
		var t = {};
		for (var i in Wt) t[i] = e && Te(e, i) ? e[i] : Wt[i];
		if (
			(t.ecmaVersion === "latest"
				? (t.ecmaVersion = 1e8)
				: t.ecmaVersion == null
					? (!Lr &&
							typeof console == "object" &&
							console.warn &&
							((Lr = !0),
							console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),
						(t.ecmaVersion = 11))
					: t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009),
			t.allowReserved == null && (t.allowReserved = t.ecmaVersion < 5),
			(!e || e.allowHashBang == null) &&
				(t.allowHashBang = t.ecmaVersion >= 14),
			Ar(t.onToken))
		) {
			var r = t.onToken;
			t.onToken = (n) => r.push(n);
		}
		return Ar(t.onComment) && (t.onComment = Ba(t, t.onComment)), t;
	}
	function Ba(e, t) {
		return function (i, r, n, a, s, o) {
			var c = { type: i ? "Block" : "Line", value: r, start: n, end: a };
			e.locations && (c.loc = new rt(this, s, o)),
				e.ranges && (c.range = [n, a]),
				t.push(c);
		};
	}
	var Ie = 1,
		ve = 2,
		zt = 4,
		Vr = 8,
		Fr = 16,
		Br = 32,
		Kt = 64,
		$r = 128,
		Ne = 256,
		Xt = Ie | ve | Ne;
	function Qt(e, t) {
		return ve | (e ? zt : 0) | (t ? Vr : 0);
	}
	var et = 0,
		Yt = 1,
		le = 2,
		jr = 3,
		Ur = 4,
		Hr = 5,
		T = function (t, i, r) {
			(this.options = t = Fa(t)),
				(this.sourceFile = t.sourceFile),
				(this.keywords = pe(
					Ra[
						t.ecmaVersion >= 6 ? 6 : t.sourceType === "module" ? "5module" : 5
					],
				));
			var n = "";
			t.allowReserved !== !0 &&
				((n = $t[t.ecmaVersion >= 6 ? 6 : t.ecmaVersion === 5 ? 5 : 3]),
				t.sourceType === "module" && (n += " await")),
				(this.reservedWords = pe(n));
			var a = (n ? n + " " : "") + $t.strict;
			(this.reservedWordsStrict = pe(a)),
				(this.reservedWordsStrictBind = pe(a + " " + $t.strictBind)),
				(this.input = String(i)),
				(this.containsEsc = !1),
				r
					? ((this.pos = r),
						(this.lineStart =
							this.input.lastIndexOf(
								`
`,
								r - 1,
							) + 1),
						(this.curLine = this.input
							.slice(0, this.lineStart)
							.split(Y).length))
					: ((this.pos = this.lineStart = 0), (this.curLine = 1)),
				(this.type = u.eof),
				(this.value = null),
				(this.start = this.end = this.pos),
				(this.startLoc = this.endLoc = this.curPosition()),
				(this.lastTokEndLoc = this.lastTokStartLoc = null),
				(this.lastTokStart = this.lastTokEnd = this.pos),
				(this.context = this.initialContext()),
				(this.exprAllowed = !0),
				(this.inModule = t.sourceType === "module"),
				(this.strict = this.inModule || this.strictDirective(this.pos)),
				(this.potentialArrowAt = -1),
				(this.potentialArrowInForAwait = !1),
				(this.yieldPos = this.awaitPos = this.awaitIdentPos = 0),
				(this.labels = []),
				(this.undefinedExports = Object.create(null)),
				this.pos === 0 &&
					t.allowHashBang &&
					this.input.slice(0, 2) === "#!" &&
					this.skipLineComment(2),
				(this.scopeStack = []),
				this.enterScope(Ie),
				(this.regexpState = null),
				(this.privateNameStack = []);
		},
		ie = {
			inFunction: { configurable: !0 },
			inGenerator: { configurable: !0 },
			inAsync: { configurable: !0 },
			canAwait: { configurable: !0 },
			allowSuper: { configurable: !0 },
			allowDirectSuper: { configurable: !0 },
			treatFunctionsAsVar: { configurable: !0 },
			allowNewDotTarget: { configurable: !0 },
			inClassStaticBlock: { configurable: !0 },
		};
	T.prototype.parse = function () {
		var t = this.options.program || this.startNode();
		return this.nextToken(), this.parseTopLevel(t);
	};
	ie.inFunction.get = function () {
		return (this.currentVarScope().flags & ve) > 0;
	};
	ie.inGenerator.get = function () {
		return (
			(this.currentVarScope().flags & Vr) > 0 &&
			!this.currentVarScope().inClassFieldInit
		);
	};
	ie.inAsync.get = function () {
		return (
			(this.currentVarScope().flags & zt) > 0 &&
			!this.currentVarScope().inClassFieldInit
		);
	};
	ie.canAwait.get = function () {
		for (var e = this.scopeStack.length - 1; e >= 0; e--) {
			var t = this.scopeStack[e];
			if (t.inClassFieldInit || t.flags & Ne) return !1;
			if (t.flags & ve) return (t.flags & zt) > 0;
		}
		return (
			(this.inModule && this.options.ecmaVersion >= 13) ||
			this.options.allowAwaitOutsideFunction
		);
	};
	ie.allowSuper.get = function () {
		var e = this.currentThisScope(),
			t = e.flags,
			i = e.inClassFieldInit;
		return (t & Kt) > 0 || i || this.options.allowSuperOutsideMethod;
	};
	ie.allowDirectSuper.get = function () {
		return (this.currentThisScope().flags & $r) > 0;
	};
	ie.treatFunctionsAsVar.get = function () {
		return this.treatFunctionsAsVarInScope(this.currentScope());
	};
	ie.allowNewDotTarget.get = function () {
		var e = this.currentThisScope(),
			t = e.flags,
			i = e.inClassFieldInit;
		return (t & (ve | Ne)) > 0 || i;
	};
	ie.inClassStaticBlock.get = function () {
		return (this.currentVarScope().flags & Ne) > 0;
	};
	T.extend = function () {
		for (var t = [], i = arguments.length; i--; ) t[i] = arguments[i];
		for (var r = this, n = 0; n < t.length; n++) r = t[n](r);
		return r;
	};
	T.parse = function (t, i) {
		return new this(i, t).parse();
	};
	T.parseExpressionAt = function (t, i, r) {
		var n = new this(r, t, i);
		return n.nextToken(), n.parseExpression();
	};
	T.tokenizer = function (t, i) {
		return new this(i, t);
	};
	Object.defineProperties(T.prototype, ie);
	var $ = T.prototype,
		$a = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
	$.strictDirective = function (e) {
		if (this.options.ecmaVersion < 5) return !1;
		for (;;) {
			(X.lastIndex = e), (e += X.exec(this.input)[0].length);
			var t = $a.exec(this.input.slice(e));
			if (!t) return !1;
			if ((t[1] || t[2]) === "use strict") {
				X.lastIndex = e + t[0].length;
				var i = X.exec(this.input),
					r = i.index + i[0].length,
					n = this.input.charAt(r);
				return (
					n === ";" ||
					n === "}" ||
					(Y.test(i[0]) &&
						!(
							/[(`.[+\-/*%<>=,?^&]/.test(n) ||
							(n === "!" && this.input.charAt(r + 1) === "=")
						))
				);
			}
			(e += t[0].length),
				(X.lastIndex = e),
				(e += X.exec(this.input)[0].length),
				this.input[e] === ";" && e++;
		}
	};
	$.eat = function (e) {
		return this.type === e ? (this.next(), !0) : !1;
	};
	$.isContextual = function (e) {
		return this.type === u.name && this.value === e && !this.containsEsc;
	};
	$.eatContextual = function (e) {
		return this.isContextual(e) ? (this.next(), !0) : !1;
	};
	$.expectContextual = function (e) {
		this.eatContextual(e) || this.unexpected();
	};
	$.canInsertSemicolon = function () {
		return (
			this.type === u.eof ||
			this.type === u.braceR ||
			Y.test(this.input.slice(this.lastTokEnd, this.start))
		);
	};
	$.insertSemicolon = function () {
		if (this.canInsertSemicolon())
			return (
				this.options.onInsertedSemicolon &&
					this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc),
				!0
			);
	};
	$.semicolon = function () {
		!this.eat(u.semi) && !this.insertSemicolon() && this.unexpected();
	};
	$.afterTrailingComma = function (e, t) {
		if (this.type === e)
			return (
				this.options.onTrailingComma &&
					this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc),
				t || this.next(),
				!0
			);
	};
	$.expect = function (e) {
		this.eat(e) || this.unexpected();
	};
	$.unexpected = function (e) {
		this.raise(e ?? this.start, "Unexpected token");
	};
	var nt = function () {
		this.shorthandAssign =
			this.trailingComma =
			this.parenthesizedAssign =
			this.parenthesizedBind =
			this.doubleProto =
				-1;
	};
	$.checkPatternErrors = function (e, t) {
		if (e) {
			e.trailingComma > -1 &&
				this.raiseRecoverable(
					e.trailingComma,
					"Comma is not permitted after the rest element",
				);
			var i = t ? e.parenthesizedAssign : e.parenthesizedBind;
			i > -1 &&
				this.raiseRecoverable(
					i,
					t ? "Assigning to rvalue" : "Parenthesized pattern",
				);
		}
	};
	$.checkExpressionErrors = function (e, t) {
		if (!e) return !1;
		var i = e.shorthandAssign,
			r = e.doubleProto;
		if (!t) return i >= 0 || r >= 0;
		i >= 0 &&
			this.raise(
				i,
				"Shorthand property assignments are valid only in destructuring patterns",
			),
			r >= 0 && this.raiseRecoverable(r, "Redefinition of __proto__ property");
	};
	$.checkYieldAwaitInDefaultParams = function () {
		this.yieldPos &&
			(!this.awaitPos || this.yieldPos < this.awaitPos) &&
			this.raise(this.yieldPos, "Yield expression cannot be a default value"),
			this.awaitPos &&
				this.raise(this.awaitPos, "Await expression cannot be a default value");
	};
	$.isSimpleAssignTarget = function (e) {
		return e.type === "ParenthesizedExpression"
			? this.isSimpleAssignTarget(e.expression)
			: e.type === "Identifier" || e.type === "MemberExpression";
	};
	var w = T.prototype;
	w.parseTopLevel = function (e) {
		var t = Object.create(null);
		for (e.body || (e.body = []); this.type !== u.eof; ) {
			var i = this.parseStatement(null, !0, t);
			e.body.push(i);
		}
		if (this.inModule)
			for (
				var r = 0, n = Object.keys(this.undefinedExports);
				r < n.length;
				r += 1
			) {
				var a = n[r];
				this.raiseRecoverable(
					this.undefinedExports[a].start,
					"Export '" + a + "' is not defined",
				);
			}
		return (
			this.adaptDirectivePrologue(e.body),
			this.next(),
			(e.sourceType = this.options.sourceType),
			this.finishNode(e, "Program")
		);
	};
	var Jt = { kind: "loop" },
		ja = { kind: "switch" };
	w.isLet = function (e) {
		if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;
		X.lastIndex = this.pos;
		var t = X.exec(this.input),
			i = this.pos + t[0].length,
			r = this.input.charCodeAt(i);
		if (r === 91 || r === 92) return !0;
		if (e) return !1;
		if (r === 123 || (r > 55295 && r < 56320)) return !0;
		if (ce(r, !0)) {
			for (var n = i + 1; be((r = this.input.charCodeAt(n)), !0); ) ++n;
			if (r === 92 || (r > 55295 && r < 56320)) return !0;
			var a = this.input.slice(i, n);
			if (!Ia.test(a)) return !0;
		}
		return !1;
	};
	w.isAsyncFunction = function () {
		if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;
		X.lastIndex = this.pos;
		var e = X.exec(this.input),
			t = this.pos + e[0].length,
			i;
		return (
			!Y.test(this.input.slice(this.pos, t)) &&
			this.input.slice(t, t + 8) === "function" &&
			(t + 8 === this.input.length ||
				!(be((i = this.input.charCodeAt(t + 8))) || (i > 55295 && i < 56320)))
		);
	};
	w.parseStatement = function (e, t, i) {
		var r = this.type,
			n = this.startNode(),
			a;
		switch ((this.isLet(e) && ((r = u._var), (a = "let")), r)) {
			case u._break:
			case u._continue:
				return this.parseBreakContinueStatement(n, r.keyword);
			case u._debugger:
				return this.parseDebuggerStatement(n);
			case u._do:
				return this.parseDoStatement(n);
			case u._for:
				return this.parseForStatement(n);
			case u._function:
				return (
					e &&
						(this.strict || (e !== "if" && e !== "label")) &&
						this.options.ecmaVersion >= 6 &&
						this.unexpected(),
					this.parseFunctionStatement(n, !1, !e)
				);
			case u._class:
				return e && this.unexpected(), this.parseClass(n, !0);
			case u._if:
				return this.parseIfStatement(n);
			case u._return:
				return this.parseReturnStatement(n);
			case u._switch:
				return this.parseSwitchStatement(n);
			case u._throw:
				return this.parseThrowStatement(n);
			case u._try:
				return this.parseTryStatement(n);
			case u._const:
			case u._var:
				return (
					(a = a || this.value),
					e && a !== "var" && this.unexpected(),
					this.parseVarStatement(n, a)
				);
			case u._while:
				return this.parseWhileStatement(n);
			case u._with:
				return this.parseWithStatement(n);
			case u.braceL:
				return this.parseBlock(!0, n);
			case u.semi:
				return this.parseEmptyStatement(n);
			case u._export:
			case u._import:
				if (this.options.ecmaVersion > 10 && r === u._import) {
					X.lastIndex = this.pos;
					var s = X.exec(this.input),
						o = this.pos + s[0].length,
						c = this.input.charCodeAt(o);
					if (c === 40 || c === 46)
						return this.parseExpressionStatement(n, this.parseExpression());
				}
				return (
					this.options.allowImportExportEverywhere ||
						(t ||
							this.raise(
								this.start,
								"'import' and 'export' may only appear at the top level",
							),
						this.inModule ||
							this.raise(
								this.start,
								"'import' and 'export' may appear only with 'sourceType: module'",
							)),
					r === u._import ? this.parseImport(n) : this.parseExport(n, i)
				);
			default:
				if (this.isAsyncFunction())
					return (
						e && this.unexpected(),
						this.next(),
						this.parseFunctionStatement(n, !0, !e)
					);
				var l = this.value,
					h = this.parseExpression();
				return r === u.name && h.type === "Identifier" && this.eat(u.colon)
					? this.parseLabeledStatement(n, l, h, e)
					: this.parseExpressionStatement(n, h);
		}
	};
	w.parseBreakContinueStatement = function (e, t) {
		var i = t === "break";
		this.next(),
			this.eat(u.semi) || this.insertSemicolon()
				? (e.label = null)
				: this.type !== u.name
					? this.unexpected()
					: ((e.label = this.parseIdent()), this.semicolon());
		for (var r = 0; r < this.labels.length; ++r) {
			var n = this.labels[r];
			if (
				(e.label == null || n.name === e.label.name) &&
				((n.kind != null && (i || n.kind === "loop")) || (e.label && i))
			)
				break;
		}
		return (
			r === this.labels.length && this.raise(e.start, "Unsyntactic " + t),
			this.finishNode(e, i ? "BreakStatement" : "ContinueStatement")
		);
	};
	w.parseDebuggerStatement = function (e) {
		return (
			this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement")
		);
	};
	w.parseDoStatement = function (e) {
		return (
			this.next(),
			this.labels.push(Jt),
			(e.body = this.parseStatement("do")),
			this.labels.pop(),
			this.expect(u._while),
			(e.test = this.parseParenExpression()),
			this.options.ecmaVersion >= 6 ? this.eat(u.semi) : this.semicolon(),
			this.finishNode(e, "DoWhileStatement")
		);
	};
	w.parseForStatement = function (e) {
		this.next();
		var t =
			this.options.ecmaVersion >= 9 &&
			this.canAwait &&
			this.eatContextual("await")
				? this.lastTokStart
				: -1;
		if (
			(this.labels.push(Jt),
			this.enterScope(0),
			this.expect(u.parenL),
			this.type === u.semi)
		)
			return t > -1 && this.unexpected(t), this.parseFor(e, null);
		var i = this.isLet();
		if (this.type === u._var || this.type === u._const || i) {
			var r = this.startNode(),
				n = i ? "let" : this.value;
			return (
				this.next(),
				this.parseVar(r, !0, n),
				this.finishNode(r, "VariableDeclaration"),
				(this.type === u._in ||
					(this.options.ecmaVersion >= 6 && this.isContextual("of"))) &&
				r.declarations.length === 1
					? (this.options.ecmaVersion >= 9 &&
							(this.type === u._in
								? t > -1 && this.unexpected(t)
								: (e.await = t > -1)),
						this.parseForIn(e, r))
					: (t > -1 && this.unexpected(t), this.parseFor(e, r))
			);
		}
		var a = this.isContextual("let"),
			s = !1,
			o = new nt(),
			c = this.parseExpression(t > -1 ? "await" : !0, o);
		return this.type === u._in ||
			(s = this.options.ecmaVersion >= 6 && this.isContextual("of"))
			? (this.options.ecmaVersion >= 9 &&
					(this.type === u._in
						? t > -1 && this.unexpected(t)
						: (e.await = t > -1)),
				a &&
					s &&
					this.raise(
						c.start,
						"The left-hand side of a for-of loop may not start with 'let'.",
					),
				this.toAssignable(c, !1, o),
				this.checkLValPattern(c),
				this.parseForIn(e, c))
			: (this.checkExpressionErrors(o, !0),
				t > -1 && this.unexpected(t),
				this.parseFor(e, c));
	};
	w.parseFunctionStatement = function (e, t, i) {
		return this.next(), this.parseFunction(e, Pe | (i ? 0 : qt), !1, t);
	};
	w.parseIfStatement = function (e) {
		return (
			this.next(),
			(e.test = this.parseParenExpression()),
			(e.consequent = this.parseStatement("if")),
			(e.alternate = this.eat(u._else) ? this.parseStatement("if") : null),
			this.finishNode(e, "IfStatement")
		);
	};
	w.parseReturnStatement = function (e) {
		return (
			!this.inFunction &&
				!this.options.allowReturnOutsideFunction &&
				this.raise(this.start, "'return' outside of function"),
			this.next(),
			this.eat(u.semi) || this.insertSemicolon()
				? (e.argument = null)
				: ((e.argument = this.parseExpression()), this.semicolon()),
			this.finishNode(e, "ReturnStatement")
		);
	};
	w.parseSwitchStatement = function (e) {
		this.next(),
			(e.discriminant = this.parseParenExpression()),
			(e.cases = []),
			this.expect(u.braceL),
			this.labels.push(ja),
			this.enterScope(0);
		for (var t, i = !1; this.type !== u.braceR; )
			if (this.type === u._case || this.type === u._default) {
				var r = this.type === u._case;
				t && this.finishNode(t, "SwitchCase"),
					e.cases.push((t = this.startNode())),
					(t.consequent = []),
					this.next(),
					r
						? (t.test = this.parseExpression())
						: (i &&
								this.raiseRecoverable(
									this.lastTokStart,
									"Multiple default clauses",
								),
							(i = !0),
							(t.test = null)),
					this.expect(u.colon);
			} else
				t || this.unexpected(), t.consequent.push(this.parseStatement(null));
		return (
			this.exitScope(),
			t && this.finishNode(t, "SwitchCase"),
			this.next(),
			this.labels.pop(),
			this.finishNode(e, "SwitchStatement")
		);
	};
	w.parseThrowStatement = function (e) {
		return (
			this.next(),
			Y.test(this.input.slice(this.lastTokEnd, this.start)) &&
				this.raise(this.lastTokEnd, "Illegal newline after throw"),
			(e.argument = this.parseExpression()),
			this.semicolon(),
			this.finishNode(e, "ThrowStatement")
		);
	};
	var Ua = [];
	w.parseCatchClauseParam = function () {
		var e = this.parseBindingAtom(),
			t = e.type === "Identifier";
		return (
			this.enterScope(t ? Br : 0),
			this.checkLValPattern(e, t ? Ur : le),
			this.expect(u.parenR),
			e
		);
	};
	w.parseTryStatement = function (e) {
		if (
			(this.next(),
			(e.block = this.parseBlock()),
			(e.handler = null),
			this.type === u._catch)
		) {
			var t = this.startNode();
			this.next(),
				this.eat(u.parenL)
					? (t.param = this.parseCatchClauseParam())
					: (this.options.ecmaVersion < 10 && this.unexpected(),
						(t.param = null),
						this.enterScope(0)),
				(t.body = this.parseBlock(!1)),
				this.exitScope(),
				(e.handler = this.finishNode(t, "CatchClause"));
		}
		return (
			(e.finalizer = this.eat(u._finally) ? this.parseBlock() : null),
			!e.handler &&
				!e.finalizer &&
				this.raise(e.start, "Missing catch or finally clause"),
			this.finishNode(e, "TryStatement")
		);
	};
	w.parseVarStatement = function (e, t, i) {
		return (
			this.next(),
			this.parseVar(e, !1, t, i),
			this.semicolon(),
			this.finishNode(e, "VariableDeclaration")
		);
	};
	w.parseWhileStatement = function (e) {
		return (
			this.next(),
			(e.test = this.parseParenExpression()),
			this.labels.push(Jt),
			(e.body = this.parseStatement("while")),
			this.labels.pop(),
			this.finishNode(e, "WhileStatement")
		);
	};
	w.parseWithStatement = function (e) {
		return (
			this.strict && this.raise(this.start, "'with' in strict mode"),
			this.next(),
			(e.object = this.parseParenExpression()),
			(e.body = this.parseStatement("with")),
			this.finishNode(e, "WithStatement")
		);
	};
	w.parseEmptyStatement = function (e) {
		return this.next(), this.finishNode(e, "EmptyStatement");
	};
	w.parseLabeledStatement = function (e, t, i, r) {
		for (var n = 0, a = this.labels; n < a.length; n += 1) {
			var s = a[n];
			s.name === t &&
				this.raise(i.start, "Label '" + t + "' is already declared");
		}
		for (
			var o = this.type.isLoop
					? "loop"
					: this.type === u._switch
						? "switch"
						: null,
				c = this.labels.length - 1;
			c >= 0;
			c--
		) {
			var l = this.labels[c];
			if (l.statementStart === e.start)
				(l.statementStart = this.start), (l.kind = o);
			else break;
		}
		return (
			this.labels.push({ name: t, kind: o, statementStart: this.start }),
			(e.body = this.parseStatement(
				r ? (r.indexOf("label") === -1 ? r + "label" : r) : "label",
			)),
			this.labels.pop(),
			(e.label = i),
			this.finishNode(e, "LabeledStatement")
		);
	};
	w.parseExpressionStatement = function (e, t) {
		return (
			(e.expression = t),
			this.semicolon(),
			this.finishNode(e, "ExpressionStatement")
		);
	};
	w.parseBlock = function (e, t, i) {
		for (
			e === void 0 && (e = !0),
				t === void 0 && (t = this.startNode()),
				t.body = [],
				this.expect(u.braceL),
				e && this.enterScope(0);
			this.type !== u.braceR;
		) {
			var r = this.parseStatement(null);
			t.body.push(r);
		}
		return (
			i && (this.strict = !1),
			this.next(),
			e && this.exitScope(),
			this.finishNode(t, "BlockStatement")
		);
	};
	w.parseFor = function (e, t) {
		return (
			(e.init = t),
			this.expect(u.semi),
			(e.test = this.type === u.semi ? null : this.parseExpression()),
			this.expect(u.semi),
			(e.update = this.type === u.parenR ? null : this.parseExpression()),
			this.expect(u.parenR),
			(e.body = this.parseStatement("for")),
			this.exitScope(),
			this.labels.pop(),
			this.finishNode(e, "ForStatement")
		);
	};
	w.parseForIn = function (e, t) {
		var i = this.type === u._in;
		return (
			this.next(),
			t.type === "VariableDeclaration" &&
				t.declarations[0].init != null &&
				(!i ||
					this.options.ecmaVersion < 8 ||
					this.strict ||
					t.kind !== "var" ||
					t.declarations[0].id.type !== "Identifier") &&
				this.raise(
					t.start,
					(i ? "for-in" : "for-of") +
						" loop variable declaration may not have an initializer",
				),
			(e.left = t),
			(e.right = i ? this.parseExpression() : this.parseMaybeAssign()),
			this.expect(u.parenR),
			(e.body = this.parseStatement("for")),
			this.exitScope(),
			this.labels.pop(),
			this.finishNode(e, i ? "ForInStatement" : "ForOfStatement")
		);
	};
	w.parseVar = function (e, t, i, r) {
		for (e.declarations = [], e.kind = i; ; ) {
			var n = this.startNode();
			if (
				(this.parseVarId(n, i),
				this.eat(u.eq)
					? (n.init = this.parseMaybeAssign(t))
					: !r &&
							i === "const" &&
							!(
								this.type === u._in ||
								(this.options.ecmaVersion >= 6 && this.isContextual("of"))
							)
						? this.unexpected()
						: !r &&
								n.id.type !== "Identifier" &&
								!(t && (this.type === u._in || this.isContextual("of")))
							? this.raise(
									this.lastTokEnd,
									"Complex binding patterns require an initialization value",
								)
							: (n.init = null),
				e.declarations.push(this.finishNode(n, "VariableDeclarator")),
				!this.eat(u.comma))
			)
				break;
		}
		return e;
	};
	w.parseVarId = function (e, t) {
		(e.id = this.parseBindingAtom()),
			this.checkLValPattern(e.id, t === "var" ? Yt : le, !1);
	};
	var Pe = 1,
		qt = 2,
		Wr = 4;
	w.parseFunction = function (e, t, i, r, n) {
		this.initFunction(e),
			(this.options.ecmaVersion >= 9 ||
				(this.options.ecmaVersion >= 6 && !r)) &&
				(this.type === u.star && t & qt && this.unexpected(),
				(e.generator = this.eat(u.star))),
			this.options.ecmaVersion >= 8 && (e.async = !!r),
			t & Pe &&
				((e.id = t & Wr && this.type !== u.name ? null : this.parseIdent()),
				e.id &&
					!(t & qt) &&
					this.checkLValSimple(
						e.id,
						this.strict || e.generator || e.async
							? this.treatFunctionsAsVar
								? Yt
								: le
							: jr,
					));
		var a = this.yieldPos,
			s = this.awaitPos,
			o = this.awaitIdentPos;
		return (
			(this.yieldPos = 0),
			(this.awaitPos = 0),
			(this.awaitIdentPos = 0),
			this.enterScope(Qt(e.async, e.generator)),
			t & Pe || (e.id = this.type === u.name ? this.parseIdent() : null),
			this.parseFunctionParams(e),
			this.parseFunctionBody(e, i, !1, n),
			(this.yieldPos = a),
			(this.awaitPos = s),
			(this.awaitIdentPos = o),
			this.finishNode(e, t & Pe ? "FunctionDeclaration" : "FunctionExpression")
		);
	};
	w.parseFunctionParams = function (e) {
		this.expect(u.parenL),
			(e.params = this.parseBindingList(
				u.parenR,
				!1,
				this.options.ecmaVersion >= 8,
			)),
			this.checkYieldAwaitInDefaultParams();
	};
	w.parseClass = function (e, t) {
		this.next();
		var i = this.strict;
		(this.strict = !0), this.parseClassId(e, t), this.parseClassSuper(e);
		var r = this.enterClassBody(),
			n = this.startNode(),
			a = !1;
		for (n.body = [], this.expect(u.braceL); this.type !== u.braceR; ) {
			var s = this.parseClassElement(e.superClass !== null);
			s &&
				(n.body.push(s),
				s.type === "MethodDefinition" && s.kind === "constructor"
					? (a &&
							this.raiseRecoverable(
								s.start,
								"Duplicate constructor in the same class",
							),
						(a = !0))
					: s.key &&
						s.key.type === "PrivateIdentifier" &&
						Ha(r, s) &&
						this.raiseRecoverable(
							s.key.start,
							"Identifier '#" + s.key.name + "' has already been declared",
						));
		}
		return (
			(this.strict = i),
			this.next(),
			(e.body = this.finishNode(n, "ClassBody")),
			this.exitClassBody(),
			this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression")
		);
	};
	w.parseClassElement = function (e) {
		if (this.eat(u.semi)) return null;
		var t = this.options.ecmaVersion,
			i = this.startNode(),
			r = "",
			n = !1,
			a = !1,
			s = "method",
			o = !1;
		if (this.eatContextual("static")) {
			if (t >= 13 && this.eat(u.braceL))
				return this.parseClassStaticBlock(i), i;
			this.isClassElementNameStart() || this.type === u.star
				? (o = !0)
				: (r = "static");
		}
		if (
			((i.static = o),
			!r &&
				t >= 8 &&
				this.eatContextual("async") &&
				((this.isClassElementNameStart() || this.type === u.star) &&
				!this.canInsertSemicolon()
					? (a = !0)
					: (r = "async")),
			!r && (t >= 9 || !a) && this.eat(u.star) && (n = !0),
			!r && !a && !n)
		) {
			var c = this.value;
			(this.eatContextual("get") || this.eatContextual("set")) &&
				(this.isClassElementNameStart() ? (s = c) : (r = c));
		}
		if (
			(r
				? ((i.computed = !1),
					(i.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc)),
					(i.key.name = r),
					this.finishNode(i.key, "Identifier"))
				: this.parseClassElementName(i),
			t < 13 || this.type === u.parenL || s !== "method" || n || a)
		) {
			var l = !i.static && tt(i, "constructor"),
				h = l && e;
			l &&
				s !== "method" &&
				this.raise(i.key.start, "Constructor can't have get/set modifier"),
				(i.kind = l ? "constructor" : s),
				this.parseClassMethod(i, n, a, h);
		} else this.parseClassField(i);
		return i;
	};
	w.isClassElementNameStart = function () {
		return (
			this.type === u.name ||
			this.type === u.privateId ||
			this.type === u.num ||
			this.type === u.string ||
			this.type === u.bracketL ||
			this.type.keyword
		);
	};
	w.parseClassElementName = function (e) {
		this.type === u.privateId
			? (this.value === "constructor" &&
					this.raise(
						this.start,
						"Classes can't have an element named '#constructor'",
					),
				(e.computed = !1),
				(e.key = this.parsePrivateIdent()))
			: this.parsePropertyName(e);
	};
	w.parseClassMethod = function (e, t, i, r) {
		var n = e.key;
		e.kind === "constructor"
			? (t && this.raise(n.start, "Constructor can't be a generator"),
				i && this.raise(n.start, "Constructor can't be an async method"))
			: e.static &&
				tt(e, "prototype") &&
				this.raise(
					n.start,
					"Classes may not have a static property named prototype",
				);
		var a = (e.value = this.parseMethod(t, i, r));
		return (
			e.kind === "get" &&
				a.params.length !== 0 &&
				this.raiseRecoverable(a.start, "getter should have no params"),
			e.kind === "set" &&
				a.params.length !== 1 &&
				this.raiseRecoverable(a.start, "setter should have exactly one param"),
			e.kind === "set" &&
				a.params[0].type === "RestElement" &&
				this.raiseRecoverable(
					a.params[0].start,
					"Setter cannot use rest params",
				),
			this.finishNode(e, "MethodDefinition")
		);
	};
	w.parseClassField = function (e) {
		if (
			(tt(e, "constructor")
				? this.raise(
						e.key.start,
						"Classes can't have a field named 'constructor'",
					)
				: e.static &&
					tt(e, "prototype") &&
					this.raise(
						e.key.start,
						"Classes can't have a static field named 'prototype'",
					),
			this.eat(u.eq))
		) {
			var t = this.currentThisScope(),
				i = t.inClassFieldInit;
			(t.inClassFieldInit = !0),
				(e.value = this.parseMaybeAssign()),
				(t.inClassFieldInit = i);
		} else e.value = null;
		return this.semicolon(), this.finishNode(e, "PropertyDefinition");
	};
	w.parseClassStaticBlock = function (e) {
		e.body = [];
		var t = this.labels;
		for (this.labels = [], this.enterScope(Ne | Kt); this.type !== u.braceR; ) {
			var i = this.parseStatement(null);
			e.body.push(i);
		}
		return (
			this.next(),
			this.exitScope(),
			(this.labels = t),
			this.finishNode(e, "StaticBlock")
		);
	};
	w.parseClassId = function (e, t) {
		this.type === u.name
			? ((e.id = this.parseIdent()), t && this.checkLValSimple(e.id, le, !1))
			: (t === !0 && this.unexpected(), (e.id = null));
	};
	w.parseClassSuper = function (e) {
		e.superClass = this.eat(u._extends)
			? this.parseExprSubscripts(null, !1)
			: null;
	};
	w.enterClassBody = function () {
		var e = { declared: Object.create(null), used: [] };
		return this.privateNameStack.push(e), e.declared;
	};
	w.exitClassBody = function () {
		var e = this.privateNameStack.pop(),
			t = e.declared,
			i = e.used;
		if (this.options.checkPrivateFields)
			for (
				var r = this.privateNameStack.length,
					n = r === 0 ? null : this.privateNameStack[r - 1],
					a = 0;
				a < i.length;
				++a
			) {
				var s = i[a];
				Te(t, s.name) ||
					(n
						? n.used.push(s)
						: this.raiseRecoverable(
								s.start,
								"Private field '#" +
									s.name +
									"' must be declared in an enclosing class",
							));
			}
	};
	function Ha(e, t) {
		var i = t.key.name,
			r = e[i],
			n = "true";
		return (
			t.type === "MethodDefinition" &&
				(t.kind === "get" || t.kind === "set") &&
				(n = (t.static ? "s" : "i") + t.kind),
			(r === "iget" && n === "iset") ||
			(r === "iset" && n === "iget") ||
			(r === "sget" && n === "sset") ||
			(r === "sset" && n === "sget")
				? ((e[i] = "true"), !1)
				: r
					? !0
					: ((e[i] = n), !1)
		);
	}
	function tt(e, t) {
		var i = e.computed,
			r = e.key;
		return (
			!i &&
			((r.type === "Identifier" && r.name === t) ||
				(r.type === "Literal" && r.value === t))
		);
	}
	w.parseExportAllDeclaration = function (e, t) {
		return (
			this.options.ecmaVersion >= 11 &&
				(this.eatContextual("as")
					? ((e.exported = this.parseModuleExportName()),
						this.checkExport(t, e.exported, this.lastTokStart))
					: (e.exported = null)),
			this.expectContextual("from"),
			this.type !== u.string && this.unexpected(),
			(e.source = this.parseExprAtom()),
			this.semicolon(),
			this.finishNode(e, "ExportAllDeclaration")
		);
	};
	w.parseExport = function (e, t) {
		if ((this.next(), this.eat(u.star)))
			return this.parseExportAllDeclaration(e, t);
		if (this.eat(u._default))
			return (
				this.checkExport(t, "default", this.lastTokStart),
				(e.declaration = this.parseExportDefaultDeclaration()),
				this.finishNode(e, "ExportDefaultDeclaration")
			);
		if (this.shouldParseExportStatement())
			(e.declaration = this.parseExportDeclaration(e)),
				e.declaration.type === "VariableDeclaration"
					? this.checkVariableExport(t, e.declaration.declarations)
					: this.checkExport(t, e.declaration.id, e.declaration.id.start),
				(e.specifiers = []),
				(e.source = null);
		else {
			if (
				((e.declaration = null),
				(e.specifiers = this.parseExportSpecifiers(t)),
				this.eatContextual("from"))
			)
				this.type !== u.string && this.unexpected(),
					(e.source = this.parseExprAtom());
			else {
				for (var i = 0, r = e.specifiers; i < r.length; i += 1) {
					var n = r[i];
					this.checkUnreserved(n.local),
						this.checkLocalExport(n.local),
						n.local.type === "Literal" &&
							this.raise(
								n.local.start,
								"A string literal cannot be used as an exported binding without `from`.",
							);
				}
				e.source = null;
			}
			this.semicolon();
		}
		return this.finishNode(e, "ExportNamedDeclaration");
	};
	w.parseExportDeclaration = function (e) {
		return this.parseStatement(null);
	};
	w.parseExportDefaultDeclaration = function () {
		var e;
		if (this.type === u._function || (e = this.isAsyncFunction())) {
			var t = this.startNode();
			return (
				this.next(), e && this.next(), this.parseFunction(t, Pe | Wr, !1, e)
			);
		} else if (this.type === u._class) {
			var i = this.startNode();
			return this.parseClass(i, "nullableID");
		} else {
			var r = this.parseMaybeAssign();
			return this.semicolon(), r;
		}
	};
	w.checkExport = function (e, t, i) {
		e &&
			(typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value),
			Te(e, t) && this.raiseRecoverable(i, "Duplicate export '" + t + "'"),
			(e[t] = !0));
	};
	w.checkPatternExport = function (e, t) {
		var i = t.type;
		if (i === "Identifier") this.checkExport(e, t, t.start);
		else if (i === "ObjectPattern")
			for (var r = 0, n = t.properties; r < n.length; r += 1) {
				var a = n[r];
				this.checkPatternExport(e, a);
			}
		else if (i === "ArrayPattern")
			for (var s = 0, o = t.elements; s < o.length; s += 1) {
				var c = o[s];
				c && this.checkPatternExport(e, c);
			}
		else
			i === "Property"
				? this.checkPatternExport(e, t.value)
				: i === "AssignmentPattern"
					? this.checkPatternExport(e, t.left)
					: i === "RestElement"
						? this.checkPatternExport(e, t.argument)
						: i === "ParenthesizedExpression" &&
							this.checkPatternExport(e, t.expression);
	};
	w.checkVariableExport = function (e, t) {
		if (e)
			for (var i = 0, r = t; i < r.length; i += 1) {
				var n = r[i];
				this.checkPatternExport(e, n.id);
			}
	};
	w.shouldParseExportStatement = function () {
		return (
			this.type.keyword === "var" ||
			this.type.keyword === "const" ||
			this.type.keyword === "class" ||
			this.type.keyword === "function" ||
			this.isLet() ||
			this.isAsyncFunction()
		);
	};
	w.parseExportSpecifier = function (e) {
		var t = this.startNode();
		return (
			(t.local = this.parseModuleExportName()),
			(t.exported = this.eatContextual("as")
				? this.parseModuleExportName()
				: t.local),
			this.checkExport(e, t.exported, t.exported.start),
			this.finishNode(t, "ExportSpecifier")
		);
	};
	w.parseExportSpecifiers = function (e) {
		var t = [],
			i = !0;
		for (this.expect(u.braceL); !this.eat(u.braceR); ) {
			if (i) i = !1;
			else if ((this.expect(u.comma), this.afterTrailingComma(u.braceR))) break;
			t.push(this.parseExportSpecifier(e));
		}
		return t;
	};
	w.parseImport = function (e) {
		return (
			this.next(),
			this.type === u.string
				? ((e.specifiers = Ua), (e.source = this.parseExprAtom()))
				: ((e.specifiers = this.parseImportSpecifiers()),
					this.expectContextual("from"),
					(e.source =
						this.type === u.string ? this.parseExprAtom() : this.unexpected())),
			this.semicolon(),
			this.finishNode(e, "ImportDeclaration")
		);
	};
	w.parseImportSpecifier = function () {
		var e = this.startNode();
		return (
			(e.imported = this.parseModuleExportName()),
			this.eatContextual("as")
				? (e.local = this.parseIdent())
				: (this.checkUnreserved(e.imported), (e.local = e.imported)),
			this.checkLValSimple(e.local, le),
			this.finishNode(e, "ImportSpecifier")
		);
	};
	w.parseImportDefaultSpecifier = function () {
		var e = this.startNode();
		return (
			(e.local = this.parseIdent()),
			this.checkLValSimple(e.local, le),
			this.finishNode(e, "ImportDefaultSpecifier")
		);
	};
	w.parseImportNamespaceSpecifier = function () {
		var e = this.startNode();
		return (
			this.next(),
			this.expectContextual("as"),
			(e.local = this.parseIdent()),
			this.checkLValSimple(e.local, le),
			this.finishNode(e, "ImportNamespaceSpecifier")
		);
	};
	w.parseImportSpecifiers = function () {
		var e = [],
			t = !0;
		if (
			this.type === u.name &&
			(e.push(this.parseImportDefaultSpecifier()), !this.eat(u.comma))
		)
			return e;
		if (this.type === u.star)
			return e.push(this.parseImportNamespaceSpecifier()), e;
		for (this.expect(u.braceL); !this.eat(u.braceR); ) {
			if (t) t = !1;
			else if ((this.expect(u.comma), this.afterTrailingComma(u.braceR))) break;
			e.push(this.parseImportSpecifier());
		}
		return e;
	};
	w.parseModuleExportName = function () {
		if (this.options.ecmaVersion >= 13 && this.type === u.string) {
			var e = this.parseLiteral(this.value);
			return (
				Va.test(e.value) &&
					this.raise(
						e.start,
						"An export name cannot include a lone surrogate.",
					),
				e
			);
		}
		return this.parseIdent(!0);
	};
	w.adaptDirectivePrologue = function (e) {
		for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
			e[t].directive = e[t].expression.raw.slice(1, -1);
	};
	w.isDirectiveCandidate = function (e) {
		return (
			this.options.ecmaVersion >= 5 &&
			e.type === "ExpressionStatement" &&
			e.expression.type === "Literal" &&
			typeof e.expression.value == "string" &&
			(this.input[e.start] === '"' || this.input[e.start] === "'")
		);
	};
	var J = T.prototype;
	J.toAssignable = function (e, t, i) {
		if (this.options.ecmaVersion >= 6 && e)
			switch (e.type) {
				case "Identifier":
					this.inAsync &&
						e.name === "await" &&
						this.raise(
							e.start,
							"Cannot use 'await' as identifier inside an async function",
						);
					break;
				case "ObjectPattern":
				case "ArrayPattern":
				case "AssignmentPattern":
				case "RestElement":
					break;
				case "ObjectExpression":
					(e.type = "ObjectPattern"), i && this.checkPatternErrors(i, !0);
					for (var r = 0, n = e.properties; r < n.length; r += 1) {
						var a = n[r];
						this.toAssignable(a, t),
							a.type === "RestElement" &&
								(a.argument.type === "ArrayPattern" ||
									a.argument.type === "ObjectPattern") &&
								this.raise(a.argument.start, "Unexpected token");
					}
					break;
				case "Property":
					e.kind !== "init" &&
						this.raise(
							e.key.start,
							"Object pattern can't contain getter or setter",
						),
						this.toAssignable(e.value, t);
					break;
				case "ArrayExpression":
					(e.type = "ArrayPattern"),
						i && this.checkPatternErrors(i, !0),
						this.toAssignableList(e.elements, t);
					break;
				case "SpreadElement":
					(e.type = "RestElement"),
						this.toAssignable(e.argument, t),
						e.argument.type === "AssignmentPattern" &&
							this.raise(
								e.argument.start,
								"Rest elements cannot have a default value",
							);
					break;
				case "AssignmentExpression":
					e.operator !== "=" &&
						this.raise(
							e.left.end,
							"Only '=' operator can be used for specifying default value.",
						),
						(e.type = "AssignmentPattern"),
						delete e.operator,
						this.toAssignable(e.left, t);
					break;
				case "ParenthesizedExpression":
					this.toAssignable(e.expression, t, i);
					break;
				case "ChainExpression":
					this.raiseRecoverable(
						e.start,
						"Optional chaining cannot appear in left-hand side",
					);
					break;
				case "MemberExpression":
					if (!t) break;
				default:
					this.raise(e.start, "Assigning to rvalue");
			}
		else i && this.checkPatternErrors(i, !0);
		return e;
	};
	J.toAssignableList = function (e, t) {
		for (var i = e.length, r = 0; r < i; r++) {
			var n = e[r];
			n && this.toAssignable(n, t);
		}
		if (i) {
			var a = e[i - 1];
			this.options.ecmaVersion === 6 &&
				t &&
				a &&
				a.type === "RestElement" &&
				a.argument.type !== "Identifier" &&
				this.unexpected(a.argument.start);
		}
		return e;
	};
	J.parseSpread = function (e) {
		var t = this.startNode();
		return (
			this.next(),
			(t.argument = this.parseMaybeAssign(!1, e)),
			this.finishNode(t, "SpreadElement")
		);
	};
	J.parseRestBinding = function () {
		var e = this.startNode();
		return (
			this.next(),
			this.options.ecmaVersion === 6 &&
				this.type !== u.name &&
				this.unexpected(),
			(e.argument = this.parseBindingAtom()),
			this.finishNode(e, "RestElement")
		);
	};
	J.parseBindingAtom = function () {
		if (this.options.ecmaVersion >= 6)
			switch (this.type) {
				case u.bracketL:
					var e = this.startNode();
					return (
						this.next(),
						(e.elements = this.parseBindingList(u.bracketR, !0, !0)),
						this.finishNode(e, "ArrayPattern")
					);
				case u.braceL:
					return this.parseObj(!0);
			}
		return this.parseIdent();
	};
	J.parseBindingList = function (e, t, i, r) {
		for (var n = [], a = !0; !this.eat(e); )
			if ((a ? (a = !1) : this.expect(u.comma), t && this.type === u.comma))
				n.push(null);
			else {
				if (i && this.afterTrailingComma(e)) break;
				if (this.type === u.ellipsis) {
					var s = this.parseRestBinding();
					this.parseBindingListItem(s),
						n.push(s),
						this.type === u.comma &&
							this.raiseRecoverable(
								this.start,
								"Comma is not permitted after the rest element",
							),
						this.expect(e);
					break;
				} else n.push(this.parseAssignableListItem(r));
			}
		return n;
	};
	J.parseAssignableListItem = function (e) {
		var t = this.parseMaybeDefault(this.start, this.startLoc);
		return this.parseBindingListItem(t), t;
	};
	J.parseBindingListItem = (e) => e;
	J.parseMaybeDefault = function (e, t, i) {
		if (
			((i = i || this.parseBindingAtom()),
			this.options.ecmaVersion < 6 || !this.eat(u.eq))
		)
			return i;
		var r = this.startNodeAt(e, t);
		return (
			(r.left = i),
			(r.right = this.parseMaybeAssign()),
			this.finishNode(r, "AssignmentPattern")
		);
	};
	J.checkLValSimple = function (e, t, i) {
		t === void 0 && (t = et);
		var r = t !== et;
		switch (e.type) {
			case "Identifier":
				this.strict &&
					this.reservedWordsStrictBind.test(e.name) &&
					this.raiseRecoverable(
						e.start,
						(r ? "Binding " : "Assigning to ") + e.name + " in strict mode",
					),
					r &&
						(t === le &&
							e.name === "let" &&
							this.raiseRecoverable(
								e.start,
								"let is disallowed as a lexically bound name",
							),
						i &&
							(Te(i, e.name) &&
								this.raiseRecoverable(e.start, "Argument name clash"),
							(i[e.name] = !0)),
						t !== Hr && this.declareName(e.name, t, e.start));
				break;
			case "ChainExpression":
				this.raiseRecoverable(
					e.start,
					"Optional chaining cannot appear in left-hand side",
				);
				break;
			case "MemberExpression":
				r && this.raiseRecoverable(e.start, "Binding member expression");
				break;
			case "ParenthesizedExpression":
				return (
					r &&
						this.raiseRecoverable(e.start, "Binding parenthesized expression"),
					this.checkLValSimple(e.expression, t, i)
				);
			default:
				this.raise(e.start, (r ? "Binding" : "Assigning to") + " rvalue");
		}
	};
	J.checkLValPattern = function (e, t, i) {
		switch ((t === void 0 && (t = et), e.type)) {
			case "ObjectPattern":
				for (var r = 0, n = e.properties; r < n.length; r += 1) {
					var a = n[r];
					this.checkLValInnerPattern(a, t, i);
				}
				break;
			case "ArrayPattern":
				for (var s = 0, o = e.elements; s < o.length; s += 1) {
					var c = o[s];
					c && this.checkLValInnerPattern(c, t, i);
				}
				break;
			default:
				this.checkLValSimple(e, t, i);
		}
	};
	J.checkLValInnerPattern = function (e, t, i) {
		switch ((t === void 0 && (t = et), e.type)) {
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
				this.checkLValPattern(e, t, i);
		}
	};
	var Z = function (t, i, r, n, a) {
			(this.token = t),
				(this.isExpr = !!i),
				(this.preserveSpace = !!r),
				(this.override = n),
				(this.generator = !!a);
		},
		R = {
			b_stat: new Z("{", !1),
			b_expr: new Z("{", !0),
			b_tmpl: new Z("${", !1),
			p_stat: new Z("(", !1),
			p_expr: new Z("(", !0),
			q_tmpl: new Z("`", !0, !0, (e) => e.tryReadTemplateToken()),
			f_stat: new Z("function", !1),
			f_expr: new Z("function", !0),
			f_expr_gen: new Z("function", !0, !1, null, !0),
			f_gen: new Z("function", !1, !1, null, !0),
		},
		Se = T.prototype;
	Se.initialContext = () => [R.b_stat];
	Se.curContext = function () {
		return this.context[this.context.length - 1];
	};
	Se.braceIsBlock = function (e) {
		var t = this.curContext();
		return t === R.f_expr || t === R.f_stat
			? !0
			: e === u.colon && (t === R.b_stat || t === R.b_expr)
				? !t.isExpr
				: e === u._return || (e === u.name && this.exprAllowed)
					? Y.test(this.input.slice(this.lastTokEnd, this.start))
					: e === u._else ||
							e === u.semi ||
							e === u.eof ||
							e === u.parenR ||
							e === u.arrow
						? !0
						: e === u.braceL
							? t === R.b_stat
							: e === u._var || e === u._const || e === u.name
								? !1
								: !this.exprAllowed;
	};
	Se.inGeneratorContext = function () {
		for (var e = this.context.length - 1; e >= 1; e--) {
			var t = this.context[e];
			if (t.token === "function") return t.generator;
		}
		return !1;
	};
	Se.updateContext = function (e) {
		var t,
			i = this.type;
		i.keyword && e === u.dot
			? (this.exprAllowed = !1)
			: (t = i.updateContext)
				? t.call(this, e)
				: (this.exprAllowed = i.beforeExpr);
	};
	Se.overrideContext = function (e) {
		this.curContext() !== e && (this.context[this.context.length - 1] = e);
	};
	u.parenR.updateContext = u.braceR.updateContext = function () {
		if (this.context.length === 1) {
			this.exprAllowed = !0;
			return;
		}
		var e = this.context.pop();
		e === R.b_stat &&
			this.curContext().token === "function" &&
			(e = this.context.pop()),
			(this.exprAllowed = !e.isExpr);
	};
	u.braceL.updateContext = function (e) {
		this.context.push(this.braceIsBlock(e) ? R.b_stat : R.b_expr),
			(this.exprAllowed = !0);
	};
	u.dollarBraceL.updateContext = function () {
		this.context.push(R.b_tmpl), (this.exprAllowed = !0);
	};
	u.parenL.updateContext = function (e) {
		var t = e === u._if || e === u._for || e === u._with || e === u._while;
		this.context.push(t ? R.p_stat : R.p_expr), (this.exprAllowed = !0);
	};
	u.incDec.updateContext = () => {};
	u._function.updateContext = u._class.updateContext = function (e) {
		e.beforeExpr &&
		e !== u._else &&
		!(e === u.semi && this.curContext() !== R.p_stat) &&
		!(
			e === u._return && Y.test(this.input.slice(this.lastTokEnd, this.start))
		) &&
		!((e === u.colon || e === u.braceL) && this.curContext() === R.b_stat)
			? this.context.push(R.f_expr)
			: this.context.push(R.f_stat),
			(this.exprAllowed = !1);
	};
	u.backQuote.updateContext = function () {
		this.curContext() === R.q_tmpl
			? this.context.pop()
			: this.context.push(R.q_tmpl),
			(this.exprAllowed = !1);
	};
	u.star.updateContext = function (e) {
		if (e === u._function) {
			var t = this.context.length - 1;
			this.context[t] === R.f_expr
				? (this.context[t] = R.f_expr_gen)
				: (this.context[t] = R.f_gen);
		}
		this.exprAllowed = !0;
	};
	u.name.updateContext = function (e) {
		var t = !1;
		this.options.ecmaVersion >= 6 &&
			e !== u.dot &&
			((this.value === "of" && !this.exprAllowed) ||
				(this.value === "yield" && this.inGeneratorContext())) &&
			(t = !0),
			(this.exprAllowed = t);
	};
	var v = T.prototype;
	v.checkPropClash = function (e, t, i) {
		if (
			!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") &&
			!(
				this.options.ecmaVersion >= 6 &&
				(e.computed || e.method || e.shorthand)
			)
		) {
			var r = e.key,
				n;
			switch (r.type) {
				case "Identifier":
					n = r.name;
					break;
				case "Literal":
					n = String(r.value);
					break;
				default:
					return;
			}
			var a = e.kind;
			if (this.options.ecmaVersion >= 6) {
				n === "__proto__" &&
					a === "init" &&
					(t.proto &&
						(i
							? i.doubleProto < 0 && (i.doubleProto = r.start)
							: this.raiseRecoverable(
									r.start,
									"Redefinition of __proto__ property",
								)),
					(t.proto = !0));
				return;
			}
			n = "$" + n;
			var s = t[n];
			if (s) {
				var o;
				a === "init"
					? (o = (this.strict && s.init) || s.get || s.set)
					: (o = s.init || s[a]),
					o && this.raiseRecoverable(r.start, "Redefinition of property");
			} else s = t[n] = { init: !1, get: !1, set: !1 };
			s[a] = !0;
		}
	};
	v.parseExpression = function (e, t) {
		var i = this.start,
			r = this.startLoc,
			n = this.parseMaybeAssign(e, t);
		if (this.type === u.comma) {
			var a = this.startNodeAt(i, r);
			for (a.expressions = [n]; this.eat(u.comma); )
				a.expressions.push(this.parseMaybeAssign(e, t));
			return this.finishNode(a, "SequenceExpression");
		}
		return n;
	};
	v.parseMaybeAssign = function (e, t, i) {
		if (this.isContextual("yield")) {
			if (this.inGenerator) return this.parseYield(e);
			this.exprAllowed = !1;
		}
		var r = !1,
			n = -1,
			a = -1,
			s = -1;
		t
			? ((n = t.parenthesizedAssign),
				(a = t.trailingComma),
				(s = t.doubleProto),
				(t.parenthesizedAssign = t.trailingComma = -1))
			: ((t = new nt()), (r = !0));
		var o = this.start,
			c = this.startLoc;
		(this.type === u.parenL || this.type === u.name) &&
			((this.potentialArrowAt = this.start),
			(this.potentialArrowInForAwait = e === "await"));
		var l = this.parseMaybeConditional(e, t);
		if ((i && (l = i.call(this, l, o, c)), this.type.isAssign)) {
			var h = this.startNodeAt(o, c);
			return (
				(h.operator = this.value),
				this.type === u.eq && (l = this.toAssignable(l, !1, t)),
				r || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1),
				t.shorthandAssign >= l.start && (t.shorthandAssign = -1),
				this.type === u.eq ? this.checkLValPattern(l) : this.checkLValSimple(l),
				(h.left = l),
				this.next(),
				(h.right = this.parseMaybeAssign(e)),
				s > -1 && (t.doubleProto = s),
				this.finishNode(h, "AssignmentExpression")
			);
		} else r && this.checkExpressionErrors(t, !0);
		return (
			n > -1 && (t.parenthesizedAssign = n), a > -1 && (t.trailingComma = a), l
		);
	};
	v.parseMaybeConditional = function (e, t) {
		var i = this.start,
			r = this.startLoc,
			n = this.parseExprOps(e, t);
		if (this.checkExpressionErrors(t)) return n;
		if (this.eat(u.question)) {
			var a = this.startNodeAt(i, r);
			return (
				(a.test = n),
				(a.consequent = this.parseMaybeAssign()),
				this.expect(u.colon),
				(a.alternate = this.parseMaybeAssign(e)),
				this.finishNode(a, "ConditionalExpression")
			);
		}
		return n;
	};
	v.parseExprOps = function (e, t) {
		var i = this.start,
			r = this.startLoc,
			n = this.parseMaybeUnary(t, !1, !1, e);
		return this.checkExpressionErrors(t) ||
			(n.start === i && n.type === "ArrowFunctionExpression")
			? n
			: this.parseExprOp(n, i, r, -1, e);
	};
	v.parseExprOp = function (e, t, i, r, n) {
		var a = this.type.binop;
		if (a != null && (!n || this.type !== u._in) && a > r) {
			var s = this.type === u.logicalOR || this.type === u.logicalAND,
				o = this.type === u.coalesce;
			o && (a = u.logicalAND.binop);
			var c = this.value;
			this.next();
			var l = this.start,
				h = this.startLoc,
				f = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, n), l, h, a, n),
				A = this.buildBinary(t, i, e, f, c, s || o);
			return (
				((s && this.type === u.coalesce) ||
					(o && (this.type === u.logicalOR || this.type === u.logicalAND))) &&
					this.raiseRecoverable(
						this.start,
						"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses",
					),
				this.parseExprOp(A, t, i, r, n)
			);
		}
		return e;
	};
	v.buildBinary = function (e, t, i, r, n, a) {
		r.type === "PrivateIdentifier" &&
			this.raise(
				r.start,
				"Private identifier can only be left side of binary expression",
			);
		var s = this.startNodeAt(e, t);
		return (
			(s.left = i),
			(s.operator = n),
			(s.right = r),
			this.finishNode(s, a ? "LogicalExpression" : "BinaryExpression")
		);
	};
	v.parseMaybeUnary = function (e, t, i, r) {
		var n = this.start,
			a = this.startLoc,
			s;
		if (this.isContextual("await") && this.canAwait)
			(s = this.parseAwait(r)), (t = !0);
		else if (this.type.prefix) {
			var o = this.startNode(),
				c = this.type === u.incDec;
			(o.operator = this.value),
				(o.prefix = !0),
				this.next(),
				(o.argument = this.parseMaybeUnary(null, !0, c, r)),
				this.checkExpressionErrors(e, !0),
				c
					? this.checkLValSimple(o.argument)
					: this.strict &&
							o.operator === "delete" &&
							o.argument.type === "Identifier"
						? this.raiseRecoverable(
								o.start,
								"Deleting local variable in strict mode",
							)
						: o.operator === "delete" && qr(o.argument)
							? this.raiseRecoverable(
									o.start,
									"Private fields can not be deleted",
								)
							: (t = !0),
				(s = this.finishNode(o, c ? "UpdateExpression" : "UnaryExpression"));
		} else if (!t && this.type === u.privateId)
			(r || this.privateNameStack.length === 0) &&
				this.options.checkPrivateFields &&
				this.unexpected(),
				(s = this.parsePrivateIdent()),
				this.type !== u._in && this.unexpected();
		else {
			if (((s = this.parseExprSubscripts(e, r)), this.checkExpressionErrors(e)))
				return s;
			while (this.type.postfix && !this.canInsertSemicolon()) {
				var l = this.startNodeAt(n, a);
				(l.operator = this.value),
					(l.prefix = !1),
					(l.argument = s),
					this.checkLValSimple(s),
					this.next(),
					(s = this.finishNode(l, "UpdateExpression"));
			}
		}
		if (!i && this.eat(u.starstar))
			if (t) this.unexpected(this.lastTokStart);
			else
				return this.buildBinary(
					n,
					a,
					s,
					this.parseMaybeUnary(null, !1, !1, r),
					"**",
					!1,
				);
		else return s;
	};
	function qr(e) {
		return (
			(e.type === "MemberExpression" &&
				e.property.type === "PrivateIdentifier") ||
			(e.type === "ChainExpression" && qr(e.expression))
		);
	}
	v.parseExprSubscripts = function (e, t) {
		var i = this.start,
			r = this.startLoc,
			n = this.parseExprAtom(e, t);
		if (
			n.type === "ArrowFunctionExpression" &&
			this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")"
		)
			return n;
		var a = this.parseSubscripts(n, i, r, !1, t);
		return (
			e &&
				a.type === "MemberExpression" &&
				(e.parenthesizedAssign >= a.start && (e.parenthesizedAssign = -1),
				e.parenthesizedBind >= a.start && (e.parenthesizedBind = -1),
				e.trailingComma >= a.start && (e.trailingComma = -1)),
			a
		);
	};
	v.parseSubscripts = function (e, t, i, r, n) {
		for (
			var a =
					this.options.ecmaVersion >= 8 &&
					e.type === "Identifier" &&
					e.name === "async" &&
					this.lastTokEnd === e.end &&
					!this.canInsertSemicolon() &&
					e.end - e.start === 5 &&
					this.potentialArrowAt === e.start,
				s = !1;
			;
		) {
			var o = this.parseSubscript(e, t, i, r, a, s, n);
			if (
				(o.optional && (s = !0),
				o === e || o.type === "ArrowFunctionExpression")
			) {
				if (s) {
					var c = this.startNodeAt(t, i);
					(c.expression = o), (o = this.finishNode(c, "ChainExpression"));
				}
				return o;
			}
			e = o;
		}
	};
	v.shouldParseAsyncArrow = function () {
		return !this.canInsertSemicolon() && this.eat(u.arrow);
	};
	v.parseSubscriptAsyncArrow = function (e, t, i, r) {
		return this.parseArrowExpression(this.startNodeAt(e, t), i, !0, r);
	};
	v.parseSubscript = function (e, t, i, r, n, a, s) {
		var o = this.options.ecmaVersion >= 11,
			c = o && this.eat(u.questionDot);
		r &&
			c &&
			this.raise(
				this.lastTokStart,
				"Optional chaining cannot appear in the callee of new expressions",
			);
		var l = this.eat(u.bracketL);
		if (
			l ||
			(c && this.type !== u.parenL && this.type !== u.backQuote) ||
			this.eat(u.dot)
		) {
			var h = this.startNodeAt(t, i);
			(h.object = e),
				l
					? ((h.property = this.parseExpression()), this.expect(u.bracketR))
					: this.type === u.privateId && e.type !== "Super"
						? (h.property = this.parsePrivateIdent())
						: (h.property = this.parseIdent(
								this.options.allowReserved !== "never",
							)),
				(h.computed = !!l),
				o && (h.optional = c),
				(e = this.finishNode(h, "MemberExpression"));
		} else if (!r && this.eat(u.parenL)) {
			var f = new nt(),
				A = this.yieldPos,
				d = this.awaitPos,
				p = this.awaitIdentPos;
			(this.yieldPos = 0), (this.awaitPos = 0), (this.awaitIdentPos = 0);
			var W = this.parseExprList(
				u.parenR,
				this.options.ecmaVersion >= 8,
				!1,
				f,
			);
			if (n && !c && this.shouldParseAsyncArrow())
				return (
					this.checkPatternErrors(f, !1),
					this.checkYieldAwaitInDefaultParams(),
					this.awaitIdentPos > 0 &&
						this.raise(
							this.awaitIdentPos,
							"Cannot use 'await' as identifier inside an async function",
						),
					(this.yieldPos = A),
					(this.awaitPos = d),
					(this.awaitIdentPos = p),
					this.parseSubscriptAsyncArrow(t, i, W, s)
				);
			this.checkExpressionErrors(f, !0),
				(this.yieldPos = A || this.yieldPos),
				(this.awaitPos = d || this.awaitPos),
				(this.awaitIdentPos = p || this.awaitIdentPos);
			var ae = this.startNodeAt(t, i);
			(ae.callee = e),
				(ae.arguments = W),
				o && (ae.optional = c),
				(e = this.finishNode(ae, "CallExpression"));
		} else if (this.type === u.backQuote) {
			(c || a) &&
				this.raise(
					this.start,
					"Optional chaining cannot appear in the tag of tagged template expressions",
				);
			var se = this.startNodeAt(t, i);
			(se.tag = e),
				(se.quasi = this.parseTemplate({ isTagged: !0 })),
				(e = this.finishNode(se, "TaggedTemplateExpression"));
		}
		return e;
	};
	v.parseExprAtom = function (e, t, i) {
		this.type === u.slash && this.readRegexp();
		var r,
			n = this.potentialArrowAt === this.start;
		switch (this.type) {
			case u._super:
				return (
					this.allowSuper ||
						this.raise(this.start, "'super' keyword outside a method"),
					(r = this.startNode()),
					this.next(),
					this.type === u.parenL &&
						!this.allowDirectSuper &&
						this.raise(
							r.start,
							"super() call outside constructor of a subclass",
						),
					this.type !== u.dot &&
						this.type !== u.bracketL &&
						this.type !== u.parenL &&
						this.unexpected(),
					this.finishNode(r, "Super")
				);
			case u._this:
				return (
					(r = this.startNode()),
					this.next(),
					this.finishNode(r, "ThisExpression")
				);
			case u.name:
				var a = this.start,
					s = this.startLoc,
					o = this.containsEsc,
					c = this.parseIdent(!1);
				if (
					this.options.ecmaVersion >= 8 &&
					!o &&
					c.name === "async" &&
					!this.canInsertSemicolon() &&
					this.eat(u._function)
				)
					return (
						this.overrideContext(R.f_expr),
						this.parseFunction(this.startNodeAt(a, s), 0, !1, !0, t)
					);
				if (n && !this.canInsertSemicolon()) {
					if (this.eat(u.arrow))
						return this.parseArrowExpression(
							this.startNodeAt(a, s),
							[c],
							!1,
							t,
						);
					if (
						this.options.ecmaVersion >= 8 &&
						c.name === "async" &&
						this.type === u.name &&
						!o &&
						(!this.potentialArrowInForAwait ||
							this.value !== "of" ||
							this.containsEsc)
					)
						return (
							(c = this.parseIdent(!1)),
							(this.canInsertSemicolon() || !this.eat(u.arrow)) &&
								this.unexpected(),
							this.parseArrowExpression(this.startNodeAt(a, s), [c], !0, t)
						);
				}
				return c;
			case u.regexp:
				var l = this.value;
				return (
					(r = this.parseLiteral(l.value)),
					(r.regex = { pattern: l.pattern, flags: l.flags }),
					r
				);
			case u.num:
			case u.string:
				return this.parseLiteral(this.value);
			case u._null:
			case u._true:
			case u._false:
				return (
					(r = this.startNode()),
					(r.value = this.type === u._null ? null : this.type === u._true),
					(r.raw = this.type.keyword),
					this.next(),
					this.finishNode(r, "Literal")
				);
			case u.parenL:
				var h = this.start,
					f = this.parseParenAndDistinguishExpression(n, t);
				return (
					e &&
						(e.parenthesizedAssign < 0 &&
							!this.isSimpleAssignTarget(f) &&
							(e.parenthesizedAssign = h),
						e.parenthesizedBind < 0 && (e.parenthesizedBind = h)),
					f
				);
			case u.bracketL:
				return (
					(r = this.startNode()),
					this.next(),
					(r.elements = this.parseExprList(u.bracketR, !0, !0, e)),
					this.finishNode(r, "ArrayExpression")
				);
			case u.braceL:
				return this.overrideContext(R.b_expr), this.parseObj(!1, e);
			case u._function:
				return (r = this.startNode()), this.next(), this.parseFunction(r, 0);
			case u._class:
				return this.parseClass(this.startNode(), !1);
			case u._new:
				return this.parseNew();
			case u.backQuote:
				return this.parseTemplate();
			case u._import:
				return this.options.ecmaVersion >= 11
					? this.parseExprImport(i)
					: this.unexpected();
			default:
				return this.parseExprAtomDefault();
		}
	};
	v.parseExprAtomDefault = function () {
		this.unexpected();
	};
	v.parseExprImport = function (e) {
		var t = this.startNode();
		this.containsEsc &&
			this.raiseRecoverable(this.start, "Escape sequence in keyword import");
		var i = this.parseIdent(!0);
		if (this.type === u.parenL && !e) return this.parseDynamicImport(t);
		if (this.type === u.dot) return (t.meta = i), this.parseImportMeta(t);
		this.unexpected();
	};
	v.parseDynamicImport = function (e) {
		if (
			(this.next(), (e.source = this.parseMaybeAssign()), !this.eat(u.parenR))
		) {
			var t = this.start;
			this.eat(u.comma) && this.eat(u.parenR)
				? this.raiseRecoverable(t, "Trailing comma is not allowed in import()")
				: this.unexpected(t);
		}
		return this.finishNode(e, "ImportExpression");
	};
	v.parseImportMeta = function (e) {
		this.next();
		var t = this.containsEsc;
		return (
			(e.property = this.parseIdent(!0)),
			e.property.name !== "meta" &&
				this.raiseRecoverable(
					e.property.start,
					"The only valid meta property for import is 'import.meta'",
				),
			t &&
				this.raiseRecoverable(
					e.start,
					"'import.meta' must not contain escaped characters",
				),
			this.options.sourceType !== "module" &&
				!this.options.allowImportExportEverywhere &&
				this.raiseRecoverable(
					e.start,
					"Cannot use 'import.meta' outside a module",
				),
			this.finishNode(e, "MetaProperty")
		);
	};
	v.parseLiteral = function (e) {
		var t = this.startNode();
		return (
			(t.value = e),
			(t.raw = this.input.slice(this.start, this.end)),
			t.raw.charCodeAt(t.raw.length - 1) === 110 &&
				(t.bigint = t.raw.slice(0, -1).replace(/_/g, "")),
			this.next(),
			this.finishNode(t, "Literal")
		);
	};
	v.parseParenExpression = function () {
		this.expect(u.parenL);
		var e = this.parseExpression();
		return this.expect(u.parenR), e;
	};
	v.shouldParseArrow = function (e) {
		return !this.canInsertSemicolon();
	};
	v.parseParenAndDistinguishExpression = function (e, t) {
		var i = this.start,
			r = this.startLoc,
			n,
			a = this.options.ecmaVersion >= 8;
		if (this.options.ecmaVersion >= 6) {
			this.next();
			var s = this.start,
				o = this.startLoc,
				c = [],
				l = !0,
				h = !1,
				f = new nt(),
				A = this.yieldPos,
				d = this.awaitPos,
				p;
			for (this.yieldPos = 0, this.awaitPos = 0; this.type !== u.parenR; )
				if (
					(l ? (l = !1) : this.expect(u.comma),
					a && this.afterTrailingComma(u.parenR, !0))
				) {
					h = !0;
					break;
				} else if (this.type === u.ellipsis) {
					(p = this.start),
						c.push(this.parseParenItem(this.parseRestBinding())),
						this.type === u.comma &&
							this.raiseRecoverable(
								this.start,
								"Comma is not permitted after the rest element",
							);
					break;
				} else c.push(this.parseMaybeAssign(!1, f, this.parseParenItem));
			var W = this.lastTokEnd,
				ae = this.lastTokEndLoc;
			if (
				(this.expect(u.parenR),
				e && this.shouldParseArrow(c) && this.eat(u.arrow))
			)
				return (
					this.checkPatternErrors(f, !1),
					this.checkYieldAwaitInDefaultParams(),
					(this.yieldPos = A),
					(this.awaitPos = d),
					this.parseParenArrowList(i, r, c, t)
				);
			(!c.length || h) && this.unexpected(this.lastTokStart),
				p && this.unexpected(p),
				this.checkExpressionErrors(f, !0),
				(this.yieldPos = A || this.yieldPos),
				(this.awaitPos = d || this.awaitPos),
				c.length > 1
					? ((n = this.startNodeAt(s, o)),
						(n.expressions = c),
						this.finishNodeAt(n, "SequenceExpression", W, ae))
					: (n = c[0]);
		} else n = this.parseParenExpression();
		if (this.options.preserveParens) {
			var se = this.startNodeAt(i, r);
			return (
				(se.expression = n), this.finishNode(se, "ParenthesizedExpression")
			);
		} else return n;
	};
	v.parseParenItem = (e) => e;
	v.parseParenArrowList = function (e, t, i, r) {
		return this.parseArrowExpression(this.startNodeAt(e, t), i, !1, r);
	};
	var Wa = [];
	v.parseNew = function () {
		this.containsEsc &&
			this.raiseRecoverable(this.start, "Escape sequence in keyword new");
		var e = this.startNode(),
			t = this.parseIdent(!0);
		if (this.options.ecmaVersion >= 6 && this.eat(u.dot)) {
			e.meta = t;
			var i = this.containsEsc;
			return (
				(e.property = this.parseIdent(!0)),
				e.property.name !== "target" &&
					this.raiseRecoverable(
						e.property.start,
						"The only valid meta property for new is 'new.target'",
					),
				i &&
					this.raiseRecoverable(
						e.start,
						"'new.target' must not contain escaped characters",
					),
				this.allowNewDotTarget ||
					this.raiseRecoverable(
						e.start,
						"'new.target' can only be used in functions and class static block",
					),
				this.finishNode(e, "MetaProperty")
			);
		}
		var r = this.start,
			n = this.startLoc;
		return (
			(e.callee = this.parseSubscripts(
				this.parseExprAtom(null, !1, !0),
				r,
				n,
				!0,
				!1,
			)),
			this.eat(u.parenL)
				? (e.arguments = this.parseExprList(
						u.parenR,
						this.options.ecmaVersion >= 8,
						!1,
					))
				: (e.arguments = Wa),
			this.finishNode(e, "NewExpression")
		);
	};
	v.parseTemplateElement = function (e) {
		var t = e.isTagged,
			i = this.startNode();
		return (
			this.type === u.invalidTemplate
				? (t ||
						this.raiseRecoverable(
							this.start,
							"Bad escape sequence in untagged template literal",
						),
					(i.value = { raw: this.value, cooked: null }))
				: (i.value = {
						raw: this.input.slice(this.start, this.end).replace(
							/\r\n?/g,
							`
`,
						),
						cooked: this.value,
					}),
			this.next(),
			(i.tail = this.type === u.backQuote),
			this.finishNode(i, "TemplateElement")
		);
	};
	v.parseTemplate = function (e) {
		e === void 0 && (e = {});
		var t = e.isTagged;
		t === void 0 && (t = !1);
		var i = this.startNode();
		this.next(), (i.expressions = []);
		var r = this.parseTemplateElement({ isTagged: t });
		for (i.quasis = [r]; !r.tail; )
			this.type === u.eof &&
				this.raise(this.pos, "Unterminated template literal"),
				this.expect(u.dollarBraceL),
				i.expressions.push(this.parseExpression()),
				this.expect(u.braceR),
				i.quasis.push((r = this.parseTemplateElement({ isTagged: t })));
		return this.next(), this.finishNode(i, "TemplateLiteral");
	};
	v.isAsyncProp = function (e) {
		return (
			!e.computed &&
			e.key.type === "Identifier" &&
			e.key.name === "async" &&
			(this.type === u.name ||
				this.type === u.num ||
				this.type === u.string ||
				this.type === u.bracketL ||
				this.type.keyword ||
				(this.options.ecmaVersion >= 9 && this.type === u.star)) &&
			!Y.test(this.input.slice(this.lastTokEnd, this.start))
		);
	};
	v.parseObj = function (e, t) {
		var i = this.startNode(),
			r = !0,
			n = {};
		for (i.properties = [], this.next(); !this.eat(u.braceR); ) {
			if (r) r = !1;
			else if (
				(this.expect(u.comma),
				this.options.ecmaVersion >= 5 && this.afterTrailingComma(u.braceR))
			)
				break;
			var a = this.parseProperty(e, t);
			e || this.checkPropClash(a, n, t), i.properties.push(a);
		}
		return this.finishNode(i, e ? "ObjectPattern" : "ObjectExpression");
	};
	v.parseProperty = function (e, t) {
		var i = this.startNode(),
			r,
			n,
			a,
			s;
		if (this.options.ecmaVersion >= 9 && this.eat(u.ellipsis))
			return e
				? ((i.argument = this.parseIdent(!1)),
					this.type === u.comma &&
						this.raiseRecoverable(
							this.start,
							"Comma is not permitted after the rest element",
						),
					this.finishNode(i, "RestElement"))
				: ((i.argument = this.parseMaybeAssign(!1, t)),
					this.type === u.comma &&
						t &&
						t.trailingComma < 0 &&
						(t.trailingComma = this.start),
					this.finishNode(i, "SpreadElement"));
		this.options.ecmaVersion >= 6 &&
			((i.method = !1),
			(i.shorthand = !1),
			(e || t) && ((a = this.start), (s = this.startLoc)),
			e || (r = this.eat(u.star)));
		var o = this.containsEsc;
		return (
			this.parsePropertyName(i),
			!e && !o && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(i)
				? ((n = !0),
					(r = this.options.ecmaVersion >= 9 && this.eat(u.star)),
					this.parsePropertyName(i))
				: (n = !1),
			this.parsePropertyValue(i, e, r, n, a, s, t, o),
			this.finishNode(i, "Property")
		);
	};
	v.parseGetterSetter = function (e) {
		(e.kind = e.key.name),
			this.parsePropertyName(e),
			(e.value = this.parseMethod(!1));
		var t = e.kind === "get" ? 0 : 1;
		if (e.value.params.length !== t) {
			var i = e.value.start;
			e.kind === "get"
				? this.raiseRecoverable(i, "getter should have no params")
				: this.raiseRecoverable(i, "setter should have exactly one param");
		} else
			e.kind === "set" &&
				e.value.params[0].type === "RestElement" &&
				this.raiseRecoverable(
					e.value.params[0].start,
					"Setter cannot use rest params",
				);
	};
	v.parsePropertyValue = function (e, t, i, r, n, a, s, o) {
		(i || r) && this.type === u.colon && this.unexpected(),
			this.eat(u.colon)
				? ((e.value = t
						? this.parseMaybeDefault(this.start, this.startLoc)
						: this.parseMaybeAssign(!1, s)),
					(e.kind = "init"))
				: this.options.ecmaVersion >= 6 && this.type === u.parenL
					? (t && this.unexpected(),
						(e.kind = "init"),
						(e.method = !0),
						(e.value = this.parseMethod(i, r)))
					: !t &&
							!o &&
							this.options.ecmaVersion >= 5 &&
							!e.computed &&
							e.key.type === "Identifier" &&
							(e.key.name === "get" || e.key.name === "set") &&
							this.type !== u.comma &&
							this.type !== u.braceR &&
							this.type !== u.eq
						? ((i || r) && this.unexpected(), this.parseGetterSetter(e))
						: this.options.ecmaVersion >= 6 &&
								!e.computed &&
								e.key.type === "Identifier"
							? ((i || r) && this.unexpected(),
								this.checkUnreserved(e.key),
								e.key.name === "await" &&
									!this.awaitIdentPos &&
									(this.awaitIdentPos = n),
								(e.kind = "init"),
								t
									? (e.value = this.parseMaybeDefault(
											n,
											a,
											this.copyNode(e.key),
										))
									: this.type === u.eq && s
										? (s.shorthandAssign < 0 &&
												(s.shorthandAssign = this.start),
											(e.value = this.parseMaybeDefault(
												n,
												a,
												this.copyNode(e.key),
											)))
										: (e.value = this.copyNode(e.key)),
								(e.shorthand = !0))
							: this.unexpected();
	};
	v.parsePropertyName = function (e) {
		if (this.options.ecmaVersion >= 6) {
			if (this.eat(u.bracketL))
				return (
					(e.computed = !0),
					(e.key = this.parseMaybeAssign()),
					this.expect(u.bracketR),
					e.key
				);
			e.computed = !1;
		}
		return (e.key =
			this.type === u.num || this.type === u.string
				? this.parseExprAtom()
				: this.parseIdent(this.options.allowReserved !== "never"));
	};
	v.initFunction = function (e) {
		(e.id = null),
			this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1),
			this.options.ecmaVersion >= 8 && (e.async = !1);
	};
	v.parseMethod = function (e, t, i) {
		var r = this.startNode(),
			n = this.yieldPos,
			a = this.awaitPos,
			s = this.awaitIdentPos;
		return (
			this.initFunction(r),
			this.options.ecmaVersion >= 6 && (r.generator = e),
			this.options.ecmaVersion >= 8 && (r.async = !!t),
			(this.yieldPos = 0),
			(this.awaitPos = 0),
			(this.awaitIdentPos = 0),
			this.enterScope(Qt(t, r.generator) | Kt | (i ? $r : 0)),
			this.expect(u.parenL),
			(r.params = this.parseBindingList(
				u.parenR,
				!1,
				this.options.ecmaVersion >= 8,
			)),
			this.checkYieldAwaitInDefaultParams(),
			this.parseFunctionBody(r, !1, !0, !1),
			(this.yieldPos = n),
			(this.awaitPos = a),
			(this.awaitIdentPos = s),
			this.finishNode(r, "FunctionExpression")
		);
	};
	v.parseArrowExpression = function (e, t, i, r) {
		var n = this.yieldPos,
			a = this.awaitPos,
			s = this.awaitIdentPos;
		return (
			this.enterScope(Qt(i, !1) | Fr),
			this.initFunction(e),
			this.options.ecmaVersion >= 8 && (e.async = !!i),
			(this.yieldPos = 0),
			(this.awaitPos = 0),
			(this.awaitIdentPos = 0),
			(e.params = this.toAssignableList(t, !0)),
			this.parseFunctionBody(e, !0, !1, r),
			(this.yieldPos = n),
			(this.awaitPos = a),
			(this.awaitIdentPos = s),
			this.finishNode(e, "ArrowFunctionExpression")
		);
	};
	v.parseFunctionBody = function (e, t, i, r) {
		var n = t && this.type !== u.braceL,
			a = this.strict,
			s = !1;
		if (n)
			(e.body = this.parseMaybeAssign(r)),
				(e.expression = !0),
				this.checkParams(e, !1);
		else {
			var o =
				this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
			(!a || o) &&
				((s = this.strictDirective(this.end)),
				s &&
					o &&
					this.raiseRecoverable(
						e.start,
						"Illegal 'use strict' directive in function with non-simple parameter list",
					));
			var c = this.labels;
			(this.labels = []),
				s && (this.strict = !0),
				this.checkParams(
					e,
					!a && !s && !t && !i && this.isSimpleParamList(e.params),
				),
				this.strict && e.id && this.checkLValSimple(e.id, Hr),
				(e.body = this.parseBlock(!1, void 0, s && !a)),
				(e.expression = !1),
				this.adaptDirectivePrologue(e.body.body),
				(this.labels = c);
		}
		this.exitScope();
	};
	v.isSimpleParamList = (e) => {
		for (var t = 0, i = e; t < i.length; t += 1) {
			var r = i[t];
			if (r.type !== "Identifier") return !1;
		}
		return !0;
	};
	v.checkParams = function (e, t) {
		for (
			var i = Object.create(null), r = 0, n = e.params;
			r < n.length;
			r += 1
		) {
			var a = n[r];
			this.checkLValInnerPattern(a, Yt, t ? null : i);
		}
	};
	v.parseExprList = function (e, t, i, r) {
		for (var n = [], a = !0; !this.eat(e); ) {
			if (a) a = !1;
			else if ((this.expect(u.comma), t && this.afterTrailingComma(e))) break;
			var s = void 0;
			i && this.type === u.comma
				? (s = null)
				: this.type === u.ellipsis
					? ((s = this.parseSpread(r)),
						r &&
							this.type === u.comma &&
							r.trailingComma < 0 &&
							(r.trailingComma = this.start))
					: (s = this.parseMaybeAssign(!1, r)),
				n.push(s);
		}
		return n;
	};
	v.checkUnreserved = function (e) {
		var t = e.start,
			i = e.end,
			r = e.name;
		if (
			(this.inGenerator &&
				r === "yield" &&
				this.raiseRecoverable(
					t,
					"Cannot use 'yield' as identifier inside a generator",
				),
			this.inAsync &&
				r === "await" &&
				this.raiseRecoverable(
					t,
					"Cannot use 'await' as identifier inside an async function",
				),
			this.currentThisScope().inClassFieldInit &&
				r === "arguments" &&
				this.raiseRecoverable(
					t,
					"Cannot use 'arguments' in class field initializer",
				),
			this.inClassStaticBlock &&
				(r === "arguments" || r === "await") &&
				this.raise(
					t,
					"Cannot use " + r + " in class static initialization block",
				),
			this.keywords.test(r) && this.raise(t, "Unexpected keyword '" + r + "'"),
			!(
				this.options.ecmaVersion < 6 &&
				this.input.slice(t, i).indexOf("\\") !== -1
			))
		) {
			var n = this.strict ? this.reservedWordsStrict : this.reservedWords;
			n.test(r) &&
				(!this.inAsync &&
					r === "await" &&
					this.raiseRecoverable(
						t,
						"Cannot use keyword 'await' outside an async function",
					),
				this.raiseRecoverable(t, "The keyword '" + r + "' is reserved"));
		}
	};
	v.parseIdent = function (e) {
		var t = this.parseIdentNode();
		return (
			this.next(!!e),
			this.finishNode(t, "Identifier"),
			e ||
				(this.checkUnreserved(t),
				t.name === "await" &&
					!this.awaitIdentPos &&
					(this.awaitIdentPos = t.start)),
			t
		);
	};
	v.parseIdentNode = function () {
		var e = this.startNode();
		return (
			this.type === u.name
				? (e.name = this.value)
				: this.type.keyword
					? ((e.name = this.type.keyword),
						(e.name === "class" || e.name === "function") &&
							(this.lastTokEnd !== this.lastTokStart + 1 ||
								this.input.charCodeAt(this.lastTokStart) !== 46) &&
							this.context.pop())
					: this.unexpected(),
			e
		);
	};
	v.parsePrivateIdent = function () {
		var e = this.startNode();
		return (
			this.type === u.privateId ? (e.name = this.value) : this.unexpected(),
			this.next(),
			this.finishNode(e, "PrivateIdentifier"),
			this.options.checkPrivateFields &&
				(this.privateNameStack.length === 0
					? this.raise(
							e.start,
							"Private field '#" +
								e.name +
								"' must be declared in an enclosing class",
						)
					: this.privateNameStack[this.privateNameStack.length - 1].used.push(
							e,
						)),
			e
		);
	};
	v.parseYield = function (e) {
		this.yieldPos || (this.yieldPos = this.start);
		var t = this.startNode();
		return (
			this.next(),
			this.type === u.semi ||
			this.canInsertSemicolon() ||
			(this.type !== u.star && !this.type.startsExpr)
				? ((t.delegate = !1), (t.argument = null))
				: ((t.delegate = this.eat(u.star)),
					(t.argument = this.parseMaybeAssign(e))),
			this.finishNode(t, "YieldExpression")
		);
	};
	v.parseAwait = function (e) {
		this.awaitPos || (this.awaitPos = this.start);
		var t = this.startNode();
		return (
			this.next(),
			(t.argument = this.parseMaybeUnary(null, !0, !1, e)),
			this.finishNode(t, "AwaitExpression")
		);
	};
	var it = T.prototype;
	it.raise = function (e, t) {
		var i = Or(this.input, e);
		t += " (" + i.line + ":" + i.column + ")";
		var r = new SyntaxError(t);
		throw ((r.pos = e), (r.loc = i), (r.raisedAt = this.pos), r);
	};
	it.raiseRecoverable = it.raise;
	it.curPosition = function () {
		if (this.options.locations)
			return new Re(this.curLine, this.pos - this.lineStart);
	};
	var de = T.prototype,
		qa = function (t) {
			(this.flags = t),
				(this.var = []),
				(this.lexical = []),
				(this.functions = []),
				(this.inClassFieldInit = !1);
		};
	de.enterScope = function (e) {
		this.scopeStack.push(new qa(e));
	};
	de.exitScope = function () {
		this.scopeStack.pop();
	};
	de.treatFunctionsAsVarInScope = function (e) {
		return e.flags & ve || (!this.inModule && e.flags & Ie);
	};
	de.declareName = function (e, t, i) {
		var r = !1;
		if (t === le) {
			var n = this.currentScope();
			(r =
				n.lexical.indexOf(e) > -1 ||
				n.functions.indexOf(e) > -1 ||
				n.var.indexOf(e) > -1),
				n.lexical.push(e),
				this.inModule && n.flags & Ie && delete this.undefinedExports[e];
		} else if (t === Ur) {
			var a = this.currentScope();
			a.lexical.push(e);
		} else if (t === jr) {
			var s = this.currentScope();
			this.treatFunctionsAsVar
				? (r = s.lexical.indexOf(e) > -1)
				: (r = s.lexical.indexOf(e) > -1 || s.var.indexOf(e) > -1),
				s.functions.push(e);
		} else
			for (var o = this.scopeStack.length - 1; o >= 0; --o) {
				var c = this.scopeStack[o];
				if (
					(c.lexical.indexOf(e) > -1 &&
						!(c.flags & Br && c.lexical[0] === e)) ||
					(!this.treatFunctionsAsVarInScope(c) && c.functions.indexOf(e) > -1)
				) {
					r = !0;
					break;
				}
				if (
					(c.var.push(e),
					this.inModule && c.flags & Ie && delete this.undefinedExports[e],
					c.flags & Xt)
				)
					break;
			}
		r &&
			this.raiseRecoverable(
				i,
				"Identifier '" + e + "' has already been declared",
			);
	};
	de.checkLocalExport = function (e) {
		this.scopeStack[0].lexical.indexOf(e.name) === -1 &&
			this.scopeStack[0].var.indexOf(e.name) === -1 &&
			(this.undefinedExports[e.name] = e);
	};
	de.currentScope = function () {
		return this.scopeStack[this.scopeStack.length - 1];
	};
	de.currentVarScope = function () {
		for (var e = this.scopeStack.length - 1; ; e--) {
			var t = this.scopeStack[e];
			if (t.flags & Xt) return t;
		}
	};
	de.currentThisScope = function () {
		for (var e = this.scopeStack.length - 1; ; e--) {
			var t = this.scopeStack[e];
			if (t.flags & Xt && !(t.flags & Fr)) return t;
		}
	};
	var at = function (t, i, r) {
			(this.type = ""),
				(this.start = i),
				(this.end = 0),
				t.options.locations && (this.loc = new rt(t, r)),
				t.options.directSourceFile &&
					(this.sourceFile = t.options.directSourceFile),
				t.options.ranges && (this.range = [i, 0]);
		},
		Me = T.prototype;
	Me.startNode = function () {
		return new at(this, this.start, this.startLoc);
	};
	Me.startNodeAt = function (e, t) {
		return new at(this, e, t);
	};
	function Gr(e, t, i, r) {
		return (
			(e.type = t),
			(e.end = i),
			this.options.locations && (e.loc.end = r),
			this.options.ranges && (e.range[1] = i),
			e
		);
	}
	Me.finishNode = function (e, t) {
		return Gr.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
	};
	Me.finishNodeAt = function (e, t, i, r) {
		return Gr.call(this, e, t, i, r);
	};
	Me.copyNode = function (e) {
		var t = new at(this, e.start, this.startLoc);
		for (var i in e) t[i] = e[i];
		return t;
	};
	var zr =
			"ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",
		Kr = zr + " Extended_Pictographic",
		Xr = Kr,
		Qr = Xr + " EBase EComp EMod EPres ExtPict",
		Yr = Qr,
		Ga = Yr,
		za = { 9: zr, 10: Kr, 11: Xr, 12: Qr, 13: Yr, 14: Ga },
		Ka =
			"Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",
		Xa = { 9: "", 10: "", 11: "", 12: "", 13: "", 14: Ka },
		Pr =
			"Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",
		Jr =
			"Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",
		Zr =
			Jr +
			" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",
		en =
			Zr +
			" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",
		tn =
			en +
			" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",
		rn =
			tn + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",
		Qa = rn + " Hrkt Katakana_Or_Hiragana Kawi Nag_Mundari Nagm Unknown Zzzz",
		Ya = { 9: Jr, 10: Zr, 11: en, 12: tn, 13: rn, 14: Qa },
		nn = {};
	function Ja(e) {
		var t = (nn[e] = {
			binary: pe(za[e] + " " + Pr),
			binaryOfStrings: pe(Xa[e]),
			nonBinary: { General_Category: pe(Pr), Script: pe(Ya[e]) },
		});
		(t.nonBinary.Script_Extensions = t.nonBinary.Script),
			(t.nonBinary.gc = t.nonBinary.General_Category),
			(t.nonBinary.sc = t.nonBinary.Script),
			(t.nonBinary.scx = t.nonBinary.Script_Extensions);
	}
	for (Ze = 0, Ut = [9, 10, 11, 12, 13, 14]; Ze < Ut.length; Ze += 1)
		(Rr = Ut[Ze]), Ja(Rr);
	var Rr,
		Ze,
		Ut,
		b = T.prototype,
		re = function (t) {
			(this.parser = t),
				(this.validFlags =
					"gim" +
					(t.options.ecmaVersion >= 6 ? "uy" : "") +
					(t.options.ecmaVersion >= 9 ? "s" : "") +
					(t.options.ecmaVersion >= 13 ? "d" : "") +
					(t.options.ecmaVersion >= 15 ? "v" : "")),
				(this.unicodeProperties =
					nn[t.options.ecmaVersion >= 14 ? 14 : t.options.ecmaVersion]),
				(this.source = ""),
				(this.flags = ""),
				(this.start = 0),
				(this.switchU = !1),
				(this.switchV = !1),
				(this.switchN = !1),
				(this.pos = 0),
				(this.lastIntValue = 0),
				(this.lastStringValue = ""),
				(this.lastAssertionIsQuantifiable = !1),
				(this.numCapturingParens = 0),
				(this.maxBackReference = 0),
				(this.groupNames = []),
				(this.backReferenceNames = []);
		};
	re.prototype.reset = function (t, i, r) {
		var n = r.indexOf("v") !== -1,
			a = r.indexOf("u") !== -1;
		(this.start = t | 0),
			(this.source = i + ""),
			(this.flags = r),
			n && this.parser.options.ecmaVersion >= 15
				? ((this.switchU = !0), (this.switchV = !0), (this.switchN = !0))
				: ((this.switchU = a && this.parser.options.ecmaVersion >= 6),
					(this.switchV = !1),
					(this.switchN = a && this.parser.options.ecmaVersion >= 9));
	};
	re.prototype.raise = function (t) {
		this.parser.raiseRecoverable(
			this.start,
			"Invalid regular expression: /" + this.source + "/: " + t,
		);
	};
	re.prototype.at = function (t, i) {
		i === void 0 && (i = !1);
		var r = this.source,
			n = r.length;
		if (t >= n) return -1;
		var a = r.charCodeAt(t);
		if (!(i || this.switchU) || a <= 55295 || a >= 57344 || t + 1 >= n)
			return a;
		var s = r.charCodeAt(t + 1);
		return s >= 56320 && s <= 57343 ? (a << 10) + s - 56613888 : a;
	};
	re.prototype.nextIndex = function (t, i) {
		i === void 0 && (i = !1);
		var r = this.source,
			n = r.length;
		if (t >= n) return n;
		var a = r.charCodeAt(t),
			s;
		return !(i || this.switchU) ||
			a <= 55295 ||
			a >= 57344 ||
			t + 1 >= n ||
			(s = r.charCodeAt(t + 1)) < 56320 ||
			s > 57343
			? t + 1
			: t + 2;
	};
	re.prototype.current = function (t) {
		return t === void 0 && (t = !1), this.at(this.pos, t);
	};
	re.prototype.lookahead = function (t) {
		return t === void 0 && (t = !1), this.at(this.nextIndex(this.pos, t), t);
	};
	re.prototype.advance = function (t) {
		t === void 0 && (t = !1), (this.pos = this.nextIndex(this.pos, t));
	};
	re.prototype.eat = function (t, i) {
		return (
			i === void 0 && (i = !1),
			this.current(i) === t ? (this.advance(i), !0) : !1
		);
	};
	re.prototype.eatChars = function (t, i) {
		i === void 0 && (i = !1);
		for (var r = this.pos, n = 0, a = t; n < a.length; n += 1) {
			var s = a[n],
				o = this.at(r, i);
			if (o === -1 || o !== s) return !1;
			r = this.nextIndex(r, i);
		}
		return (this.pos = r), !0;
	};
	b.validateRegExpFlags = function (e) {
		for (
			var t = e.validFlags, i = e.flags, r = !1, n = !1, a = 0;
			a < i.length;
			a++
		) {
			var s = i.charAt(a);
			t.indexOf(s) === -1 &&
				this.raise(e.start, "Invalid regular expression flag"),
				i.indexOf(s, a + 1) > -1 &&
					this.raise(e.start, "Duplicate regular expression flag"),
				s === "u" && (r = !0),
				s === "v" && (n = !0);
		}
		this.options.ecmaVersion >= 15 &&
			r &&
			n &&
			this.raise(e.start, "Invalid regular expression flag");
	};
	b.validateRegExpPattern = function (e) {
		this.regexp_pattern(e),
			!e.switchN &&
				this.options.ecmaVersion >= 9 &&
				e.groupNames.length > 0 &&
				((e.switchN = !0), this.regexp_pattern(e));
	};
	b.regexp_pattern = function (e) {
		(e.pos = 0),
			(e.lastIntValue = 0),
			(e.lastStringValue = ""),
			(e.lastAssertionIsQuantifiable = !1),
			(e.numCapturingParens = 0),
			(e.maxBackReference = 0),
			(e.groupNames.length = 0),
			(e.backReferenceNames.length = 0),
			this.regexp_disjunction(e),
			e.pos !== e.source.length &&
				(e.eat(41) && e.raise("Unmatched ')'"),
				(e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")),
			e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
		for (var t = 0, i = e.backReferenceNames; t < i.length; t += 1) {
			var r = i[t];
			e.groupNames.indexOf(r) === -1 &&
				e.raise("Invalid named capture referenced");
		}
	};
	b.regexp_disjunction = function (e) {
		for (this.regexp_alternative(e); e.eat(124); ) this.regexp_alternative(e);
		this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"),
			e.eat(123) && e.raise("Lone quantifier brackets");
	};
	b.regexp_alternative = function (e) {
		while (e.pos < e.source.length && this.regexp_eatTerm(e));
	};
	b.regexp_eatTerm = function (e) {
		return this.regexp_eatAssertion(e)
			? (e.lastAssertionIsQuantifiable &&
					this.regexp_eatQuantifier(e) &&
					e.switchU &&
					e.raise("Invalid quantifier"),
				!0)
			: (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e))
				? (this.regexp_eatQuantifier(e), !0)
				: !1;
	};
	b.regexp_eatAssertion = function (e) {
		var t = e.pos;
		if (((e.lastAssertionIsQuantifiable = !1), e.eat(94) || e.eat(36)))
			return !0;
		if (e.eat(92)) {
			if (e.eat(66) || e.eat(98)) return !0;
			e.pos = t;
		}
		if (e.eat(40) && e.eat(63)) {
			var i = !1;
			if (
				(this.options.ecmaVersion >= 9 && (i = e.eat(60)),
				e.eat(61) || e.eat(33))
			)
				return (
					this.regexp_disjunction(e),
					e.eat(41) || e.raise("Unterminated group"),
					(e.lastAssertionIsQuantifiable = !i),
					!0
				);
		}
		return (e.pos = t), !1;
	};
	b.regexp_eatQuantifier = function (e, t) {
		return (
			t === void 0 && (t = !1),
			this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1
		);
	};
	b.regexp_eatQuantifierPrefix = function (e, t) {
		return (
			e.eat(42) ||
			e.eat(43) ||
			e.eat(63) ||
			this.regexp_eatBracedQuantifier(e, t)
		);
	};
	b.regexp_eatBracedQuantifier = function (e, t) {
		var i = e.pos;
		if (e.eat(123)) {
			var r = 0,
				n = -1;
			if (
				this.regexp_eatDecimalDigits(e) &&
				((r = e.lastIntValue),
				e.eat(44) && this.regexp_eatDecimalDigits(e) && (n = e.lastIntValue),
				e.eat(125))
			)
				return (
					n !== -1 &&
						n < r &&
						!t &&
						e.raise("numbers out of order in {} quantifier"),
					!0
				);
			e.switchU && !t && e.raise("Incomplete quantifier"), (e.pos = i);
		}
		return !1;
	};
	b.regexp_eatAtom = function (e) {
		return (
			this.regexp_eatPatternCharacters(e) ||
			e.eat(46) ||
			this.regexp_eatReverseSolidusAtomEscape(e) ||
			this.regexp_eatCharacterClass(e) ||
			this.regexp_eatUncapturingGroup(e) ||
			this.regexp_eatCapturingGroup(e)
		);
	};
	b.regexp_eatReverseSolidusAtomEscape = function (e) {
		var t = e.pos;
		if (e.eat(92)) {
			if (this.regexp_eatAtomEscape(e)) return !0;
			e.pos = t;
		}
		return !1;
	};
	b.regexp_eatUncapturingGroup = function (e) {
		var t = e.pos;
		if (e.eat(40)) {
			if (e.eat(63) && e.eat(58)) {
				if ((this.regexp_disjunction(e), e.eat(41))) return !0;
				e.raise("Unterminated group");
			}
			e.pos = t;
		}
		return !1;
	};
	b.regexp_eatCapturingGroup = function (e) {
		if (e.eat(40)) {
			if (
				(this.options.ecmaVersion >= 9
					? this.regexp_groupSpecifier(e)
					: e.current() === 63 && e.raise("Invalid group"),
				this.regexp_disjunction(e),
				e.eat(41))
			)
				return (e.numCapturingParens += 1), !0;
			e.raise("Unterminated group");
		}
		return !1;
	};
	b.regexp_eatExtendedAtom = function (e) {
		return (
			e.eat(46) ||
			this.regexp_eatReverseSolidusAtomEscape(e) ||
			this.regexp_eatCharacterClass(e) ||
			this.regexp_eatUncapturingGroup(e) ||
			this.regexp_eatCapturingGroup(e) ||
			this.regexp_eatInvalidBracedQuantifier(e) ||
			this.regexp_eatExtendedPatternCharacter(e)
		);
	};
	b.regexp_eatInvalidBracedQuantifier = function (e) {
		return (
			this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1
		);
	};
	b.regexp_eatSyntaxCharacter = (e) => {
		var t = e.current();
		return an(t) ? ((e.lastIntValue = t), e.advance(), !0) : !1;
	};
	function an(e) {
		return (
			e === 36 ||
			(e >= 40 && e <= 43) ||
			e === 46 ||
			e === 63 ||
			(e >= 91 && e <= 94) ||
			(e >= 123 && e <= 125)
		);
	}
	b.regexp_eatPatternCharacters = (e) => {
		for (var t = e.pos, i = 0; (i = e.current()) !== -1 && !an(i); )
			e.advance();
		return e.pos !== t;
	};
	b.regexp_eatExtendedPatternCharacter = (e) => {
		var t = e.current();
		return t !== -1 &&
			t !== 36 &&
			!(t >= 40 && t <= 43) &&
			t !== 46 &&
			t !== 63 &&
			t !== 91 &&
			t !== 94 &&
			t !== 124
			? (e.advance(), !0)
			: !1;
	};
	b.regexp_groupSpecifier = function (e) {
		if (e.eat(63)) {
			if (this.regexp_eatGroupName(e)) {
				e.groupNames.indexOf(e.lastStringValue) !== -1 &&
					e.raise("Duplicate capture group name"),
					e.groupNames.push(e.lastStringValue);
				return;
			}
			e.raise("Invalid group");
		}
	};
	b.regexp_eatGroupName = function (e) {
		if (((e.lastStringValue = ""), e.eat(60))) {
			if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
			e.raise("Invalid capture group name");
		}
		return !1;
	};
	b.regexp_eatRegExpIdentifierName = function (e) {
		if (((e.lastStringValue = ""), this.regexp_eatRegExpIdentifierStart(e))) {
			for (
				e.lastStringValue += fe(e.lastIntValue);
				this.regexp_eatRegExpIdentifierPart(e);
			)
				e.lastStringValue += fe(e.lastIntValue);
			return !0;
		}
		return !1;
	};
	b.regexp_eatRegExpIdentifierStart = function (e) {
		var t = e.pos,
			i = this.options.ecmaVersion >= 11,
			r = e.current(i);
		return (
			e.advance(i),
			r === 92 &&
				this.regexp_eatRegExpUnicodeEscapeSequence(e, i) &&
				(r = e.lastIntValue),
			Za(r) ? ((e.lastIntValue = r), !0) : ((e.pos = t), !1)
		);
	};
	function Za(e) {
		return ce(e, !0) || e === 36 || e === 95;
	}
	b.regexp_eatRegExpIdentifierPart = function (e) {
		var t = e.pos,
			i = this.options.ecmaVersion >= 11,
			r = e.current(i);
		return (
			e.advance(i),
			r === 92 &&
				this.regexp_eatRegExpUnicodeEscapeSequence(e, i) &&
				(r = e.lastIntValue),
			es(r) ? ((e.lastIntValue = r), !0) : ((e.pos = t), !1)
		);
	};
	function es(e) {
		return be(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
	}
	b.regexp_eatAtomEscape = function (e) {
		return this.regexp_eatBackReference(e) ||
			this.regexp_eatCharacterClassEscape(e) ||
			this.regexp_eatCharacterEscape(e) ||
			(e.switchN && this.regexp_eatKGroupName(e))
			? !0
			: (e.switchU &&
					(e.current() === 99 && e.raise("Invalid unicode escape"),
					e.raise("Invalid escape")),
				!1);
	};
	b.regexp_eatBackReference = function (e) {
		var t = e.pos;
		if (this.regexp_eatDecimalEscape(e)) {
			var i = e.lastIntValue;
			if (e.switchU)
				return i > e.maxBackReference && (e.maxBackReference = i), !0;
			if (i <= e.numCapturingParens) return !0;
			e.pos = t;
		}
		return !1;
	};
	b.regexp_eatKGroupName = function (e) {
		if (e.eat(107)) {
			if (this.regexp_eatGroupName(e))
				return e.backReferenceNames.push(e.lastStringValue), !0;
			e.raise("Invalid named reference");
		}
		return !1;
	};
	b.regexp_eatCharacterEscape = function (e) {
		return (
			this.regexp_eatControlEscape(e) ||
			this.regexp_eatCControlLetter(e) ||
			this.regexp_eatZero(e) ||
			this.regexp_eatHexEscapeSequence(e) ||
			this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) ||
			(!e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e)) ||
			this.regexp_eatIdentityEscape(e)
		);
	};
	b.regexp_eatCControlLetter = function (e) {
		var t = e.pos;
		if (e.eat(99)) {
			if (this.regexp_eatControlLetter(e)) return !0;
			e.pos = t;
		}
		return !1;
	};
	b.regexp_eatZero = (e) => e.current() === 48 && !st(e.lookahead())
			? ((e.lastIntValue = 0), e.advance(), !0)
			: !1;
	b.regexp_eatControlEscape = (e) => {
		var t = e.current();
		return t === 116
			? ((e.lastIntValue = 9), e.advance(), !0)
			: t === 110
				? ((e.lastIntValue = 10), e.advance(), !0)
				: t === 118
					? ((e.lastIntValue = 11), e.advance(), !0)
					: t === 102
						? ((e.lastIntValue = 12), e.advance(), !0)
						: t === 114
							? ((e.lastIntValue = 13), e.advance(), !0)
							: !1;
	};
	b.regexp_eatControlLetter = (e) => {
		var t = e.current();
		return sn(t) ? ((e.lastIntValue = t % 32), e.advance(), !0) : !1;
	};
	function sn(e) {
		return (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
	}
	b.regexp_eatRegExpUnicodeEscapeSequence = function (e, t) {
		t === void 0 && (t = !1);
		var i = e.pos,
			r = t || e.switchU;
		if (e.eat(117)) {
			if (this.regexp_eatFixedHexDigits(e, 4)) {
				var n = e.lastIntValue;
				if (r && n >= 55296 && n <= 56319) {
					var a = e.pos;
					if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
						var s = e.lastIntValue;
						if (s >= 56320 && s <= 57343)
							return (
								(e.lastIntValue = (n - 55296) * 1024 + (s - 56320) + 65536), !0
							);
					}
					(e.pos = a), (e.lastIntValue = n);
				}
				return !0;
			}
			if (
				r &&
				e.eat(123) &&
				this.regexp_eatHexDigits(e) &&
				e.eat(125) &&
				ts(e.lastIntValue)
			)
				return !0;
			r && e.raise("Invalid unicode escape"), (e.pos = i);
		}
		return !1;
	};
	function ts(e) {
		return e >= 0 && e <= 1114111;
	}
	b.regexp_eatIdentityEscape = function (e) {
		if (e.switchU)
			return this.regexp_eatSyntaxCharacter(e)
				? !0
				: e.eat(47)
					? ((e.lastIntValue = 47), !0)
					: !1;
		var t = e.current();
		return t !== 99 && (!e.switchN || t !== 107)
			? ((e.lastIntValue = t), e.advance(), !0)
			: !1;
	};
	b.regexp_eatDecimalEscape = (e) => {
		e.lastIntValue = 0;
		var t = e.current();
		if (t >= 49 && t <= 57) {
			do (e.lastIntValue = 10 * e.lastIntValue + (t - 48)), e.advance();
			while ((t = e.current()) >= 48 && t <= 57);
			return !0;
		}
		return !1;
	};
	var on = 0,
		ue = 1,
		Q = 2;
	b.regexp_eatCharacterClassEscape = function (e) {
		var t = e.current();
		if (is(t)) return (e.lastIntValue = -1), e.advance(), ue;
		var i = !1;
		if (
			e.switchU &&
			this.options.ecmaVersion >= 9 &&
			((i = t === 80) || t === 112)
		) {
			(e.lastIntValue = -1), e.advance();
			var r;
			if (
				e.eat(123) &&
				(r = this.regexp_eatUnicodePropertyValueExpression(e)) &&
				e.eat(125)
			)
				return i && r === Q && e.raise("Invalid property name"), r;
			e.raise("Invalid property name");
		}
		return on;
	};
	function is(e) {
		return (
			e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87
		);
	}
	b.regexp_eatUnicodePropertyValueExpression = function (e) {
		var t = e.pos;
		if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
			var i = e.lastStringValue;
			if (this.regexp_eatUnicodePropertyValue(e)) {
				var r = e.lastStringValue;
				return this.regexp_validateUnicodePropertyNameAndValue(e, i, r), ue;
			}
		}
		if (((e.pos = t), this.regexp_eatLoneUnicodePropertyNameOrValue(e))) {
			var n = e.lastStringValue;
			return this.regexp_validateUnicodePropertyNameOrValue(e, n);
		}
		return on;
	};
	b.regexp_validateUnicodePropertyNameAndValue = (e, t, i) => {
		Te(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"),
			e.unicodeProperties.nonBinary[t].test(i) ||
				e.raise("Invalid property value");
	};
	b.regexp_validateUnicodePropertyNameOrValue = (e, t) => {
		if (e.unicodeProperties.binary.test(t)) return ue;
		if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return Q;
		e.raise("Invalid property name");
	};
	b.regexp_eatUnicodePropertyName = (e) => {
		var t = 0;
		for (e.lastStringValue = ""; cn((t = e.current())); )
			(e.lastStringValue += fe(t)), e.advance();
		return e.lastStringValue !== "";
	};
	function cn(e) {
		return sn(e) || e === 95;
	}
	b.regexp_eatUnicodePropertyValue = (e) => {
		var t = 0;
		for (e.lastStringValue = ""; rs((t = e.current())); )
			(e.lastStringValue += fe(t)), e.advance();
		return e.lastStringValue !== "";
	};
	function rs(e) {
		return cn(e) || st(e);
	}
	b.regexp_eatLoneUnicodePropertyNameOrValue = function (e) {
		return this.regexp_eatUnicodePropertyValue(e);
	};
	b.regexp_eatCharacterClass = function (e) {
		if (e.eat(91)) {
			var t = e.eat(94),
				i = this.regexp_classContents(e);
			return (
				e.eat(93) || e.raise("Unterminated character class"),
				t && i === Q && e.raise("Negated character class may contain strings"),
				!0
			);
		}
		return !1;
	};
	b.regexp_classContents = function (e) {
		return e.current() === 93
			? ue
			: e.switchV
				? this.regexp_classSetExpression(e)
				: (this.regexp_nonEmptyClassRanges(e), ue);
	};
	b.regexp_nonEmptyClassRanges = function (e) {
		while (this.regexp_eatClassAtom(e)) {
			var t = e.lastIntValue;
			if (e.eat(45) && this.regexp_eatClassAtom(e)) {
				var i = e.lastIntValue;
				e.switchU &&
					(t === -1 || i === -1) &&
					e.raise("Invalid character class"),
					t !== -1 &&
						i !== -1 &&
						t > i &&
						e.raise("Range out of order in character class");
			}
		}
	};
	b.regexp_eatClassAtom = function (e) {
		var t = e.pos;
		if (e.eat(92)) {
			if (this.regexp_eatClassEscape(e)) return !0;
			if (e.switchU) {
				var i = e.current();
				(i === 99 || hn(i)) && e.raise("Invalid class escape"),
					e.raise("Invalid escape");
			}
			e.pos = t;
		}
		var r = e.current();
		return r !== 93 ? ((e.lastIntValue = r), e.advance(), !0) : !1;
	};
	b.regexp_eatClassEscape = function (e) {
		var t = e.pos;
		if (e.eat(98)) return (e.lastIntValue = 8), !0;
		if (e.switchU && e.eat(45)) return (e.lastIntValue = 45), !0;
		if (!e.switchU && e.eat(99)) {
			if (this.regexp_eatClassControlLetter(e)) return !0;
			e.pos = t;
		}
		return (
			this.regexp_eatCharacterClassEscape(e) ||
			this.regexp_eatCharacterEscape(e)
		);
	};
	b.regexp_classSetExpression = function (e) {
		var t = ue,
			i;
		if (!this.regexp_eatClassSetRange(e))
			if ((i = this.regexp_eatClassSetOperand(e))) {
				i === Q && (t = Q);
				for (var r = e.pos; e.eatChars([38, 38]); ) {
					if (e.current() !== 38 && (i = this.regexp_eatClassSetOperand(e))) {
						i !== Q && (t = ue);
						continue;
					}
					e.raise("Invalid character in character class");
				}
				if (r !== e.pos) return t;
				while (e.eatChars([45, 45]))
					this.regexp_eatClassSetOperand(e) ||
						e.raise("Invalid character in character class");
				if (r !== e.pos) return t;
			} else e.raise("Invalid character in character class");
		for (;;)
			if (!this.regexp_eatClassSetRange(e)) {
				if (((i = this.regexp_eatClassSetOperand(e)), !i)) return t;
				i === Q && (t = Q);
			}
	};
	b.regexp_eatClassSetRange = function (e) {
		var t = e.pos;
		if (this.regexp_eatClassSetCharacter(e)) {
			var i = e.lastIntValue;
			if (e.eat(45) && this.regexp_eatClassSetCharacter(e)) {
				var r = e.lastIntValue;
				return (
					i !== -1 &&
						r !== -1 &&
						i > r &&
						e.raise("Range out of order in character class"),
					!0
				);
			}
			e.pos = t;
		}
		return !1;
	};
	b.regexp_eatClassSetOperand = function (e) {
		return this.regexp_eatClassSetCharacter(e)
			? ue
			: this.regexp_eatClassStringDisjunction(e) ||
					this.regexp_eatNestedClass(e);
	};
	b.regexp_eatNestedClass = function (e) {
		var t = e.pos;
		if (e.eat(91)) {
			var i = e.eat(94),
				r = this.regexp_classContents(e);
			if (e.eat(93))
				return (
					i &&
						r === Q &&
						e.raise("Negated character class may contain strings"),
					r
				);
			e.pos = t;
		}
		if (e.eat(92)) {
			var n = this.regexp_eatCharacterClassEscape(e);
			if (n) return n;
			e.pos = t;
		}
		return null;
	};
	b.regexp_eatClassStringDisjunction = function (e) {
		var t = e.pos;
		if (e.eatChars([92, 113])) {
			if (e.eat(123)) {
				var i = this.regexp_classStringDisjunctionContents(e);
				if (e.eat(125)) return i;
			} else e.raise("Invalid escape");
			e.pos = t;
		}
		return null;
	};
	b.regexp_classStringDisjunctionContents = function (e) {
		for (var t = this.regexp_classString(e); e.eat(124); )
			this.regexp_classString(e) === Q && (t = Q);
		return t;
	};
	b.regexp_classString = function (e) {
		for (var t = 0; this.regexp_eatClassSetCharacter(e); ) t++;
		return t === 1 ? ue : Q;
	};
	b.regexp_eatClassSetCharacter = function (e) {
		var t = e.pos;
		if (e.eat(92))
			return this.regexp_eatCharacterEscape(e) ||
				this.regexp_eatClassSetReservedPunctuator(e)
				? !0
				: e.eat(98)
					? ((e.lastIntValue = 8), !0)
					: ((e.pos = t), !1);
		var i = e.current();
		return i < 0 || (i === e.lookahead() && ns(i)) || as(i)
			? !1
			: (e.advance(), (e.lastIntValue = i), !0);
	};
	function ns(e) {
		return (
			e === 33 ||
			(e >= 35 && e <= 38) ||
			(e >= 42 && e <= 44) ||
			e === 46 ||
			(e >= 58 && e <= 64) ||
			e === 94 ||
			e === 96 ||
			e === 126
		);
	}
	function as(e) {
		return (
			e === 40 ||
			e === 41 ||
			e === 45 ||
			e === 47 ||
			(e >= 91 && e <= 93) ||
			(e >= 123 && e <= 125)
		);
	}
	b.regexp_eatClassSetReservedPunctuator = (e) => {
		var t = e.current();
		return ss(t) ? ((e.lastIntValue = t), e.advance(), !0) : !1;
	};
	function ss(e) {
		return (
			e === 33 ||
			e === 35 ||
			e === 37 ||
			e === 38 ||
			e === 44 ||
			e === 45 ||
			(e >= 58 && e <= 62) ||
			e === 64 ||
			e === 96 ||
			e === 126
		);
	}
	b.regexp_eatClassControlLetter = (e) => {
		var t = e.current();
		return st(t) || t === 95
			? ((e.lastIntValue = t % 32), e.advance(), !0)
			: !1;
	};
	b.regexp_eatHexEscapeSequence = function (e) {
		var t = e.pos;
		if (e.eat(120)) {
			if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
			e.switchU && e.raise("Invalid escape"), (e.pos = t);
		}
		return !1;
	};
	b.regexp_eatDecimalDigits = (e) => {
		var t = e.pos,
			i = 0;
		for (e.lastIntValue = 0; st((i = e.current())); )
			(e.lastIntValue = 10 * e.lastIntValue + (i - 48)), e.advance();
		return e.pos !== t;
	};
	function st(e) {
		return e >= 48 && e <= 57;
	}
	b.regexp_eatHexDigits = (e) => {
		var t = e.pos,
			i = 0;
		for (e.lastIntValue = 0; un((i = e.current())); )
			(e.lastIntValue = 16 * e.lastIntValue + ln(i)), e.advance();
		return e.pos !== t;
	};
	function un(e) {
		return (
			(e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102)
		);
	}
	function ln(e) {
		return e >= 65 && e <= 70
			? 10 + (e - 65)
			: e >= 97 && e <= 102
				? 10 + (e - 97)
				: e - 48;
	}
	b.regexp_eatLegacyOctalEscapeSequence = function (e) {
		if (this.regexp_eatOctalDigit(e)) {
			var t = e.lastIntValue;
			if (this.regexp_eatOctalDigit(e)) {
				var i = e.lastIntValue;
				t <= 3 && this.regexp_eatOctalDigit(e)
					? (e.lastIntValue = t * 64 + i * 8 + e.lastIntValue)
					: (e.lastIntValue = t * 8 + i);
			} else e.lastIntValue = t;
			return !0;
		}
		return !1;
	};
	b.regexp_eatOctalDigit = (e) => {
		var t = e.current();
		return hn(t)
			? ((e.lastIntValue = t - 48), e.advance(), !0)
			: ((e.lastIntValue = 0), !1);
	};
	function hn(e) {
		return e >= 48 && e <= 55;
	}
	b.regexp_eatFixedHexDigits = (e, t) => {
		var i = e.pos;
		e.lastIntValue = 0;
		for (var r = 0; r < t; ++r) {
			var n = e.current();
			if (!un(n)) return (e.pos = i), !1;
			(e.lastIntValue = 16 * e.lastIntValue + ln(n)), e.advance();
		}
		return !0;
	};
	var Zt = function (t) {
			(this.type = t.type),
				(this.value = t.value),
				(this.start = t.start),
				(this.end = t.end),
				t.options.locations && (this.loc = new rt(t, t.startLoc, t.endLoc)),
				t.options.ranges && (this.range = [t.start, t.end]);
		},
		C = T.prototype;
	C.next = function (e) {
		!e &&
			this.type.keyword &&
			this.containsEsc &&
			this.raiseRecoverable(
				this.start,
				"Escape sequence in keyword " + this.type.keyword,
			),
			this.options.onToken && this.options.onToken(new Zt(this)),
			(this.lastTokEnd = this.end),
			(this.lastTokStart = this.start),
			(this.lastTokEndLoc = this.endLoc),
			(this.lastTokStartLoc = this.startLoc),
			this.nextToken();
	};
	C.getToken = function () {
		return this.next(), new Zt(this);
	};
	typeof Symbol < "u" &&
		(C[Symbol.iterator] = function () {
			return {
				next: () => {
					var t = this.getToken();
					return { done: t.type === u.eof, value: t };
				},
			};
		});
	C.nextToken = function () {
		var e = this.curContext();
		if (
			((!e || !e.preserveSpace) && this.skipSpace(),
			(this.start = this.pos),
			this.options.locations && (this.startLoc = this.curPosition()),
			this.pos >= this.input.length)
		)
			return this.finishToken(u.eof);
		if (e.override) return e.override(this);
		this.readToken(this.fullCharCodeAtPos());
	};
	C.readToken = function (e) {
		return ce(e, this.options.ecmaVersion >= 6) || e === 92
			? this.readWord()
			: this.getTokenFromCode(e);
	};
	C.fullCharCodeAtPos = function () {
		var e = this.input.charCodeAt(this.pos);
		if (e <= 55295 || e >= 56320) return e;
		var t = this.input.charCodeAt(this.pos + 1);
		return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888;
	};
	C.skipBlockComment = function () {
		var e = this.options.onComment && this.curPosition(),
			t = this.pos,
			i = this.input.indexOf("*/", (this.pos += 2));
		if (
			(i === -1 && this.raise(this.pos - 2, "Unterminated comment"),
			(this.pos = i + 2),
			this.options.locations)
		)
			for (var r = void 0, n = t; (r = Nr(this.input, n, this.pos)) > -1; )
				++this.curLine, (n = this.lineStart = r);
		this.options.onComment &&
			this.options.onComment(
				!0,
				this.input.slice(t + 2, i),
				t,
				this.pos,
				e,
				this.curPosition(),
			);
	};
	C.skipLineComment = function (e) {
		for (
			var t = this.pos,
				i = this.options.onComment && this.curPosition(),
				r = this.input.charCodeAt((this.pos += e));
			this.pos < this.input.length && !we(r);
		)
			r = this.input.charCodeAt(++this.pos);
		this.options.onComment &&
			this.options.onComment(
				!1,
				this.input.slice(t + e, this.pos),
				t,
				this.pos,
				i,
				this.curPosition(),
			);
	};
	C.skipSpace = function () {
		e: while (this.pos < this.input.length) {
			var e = this.input.charCodeAt(this.pos);
			switch (e) {
				case 32:
				case 160:
					++this.pos;
					break;
				case 13:
					this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
				case 10:
				case 8232:
				case 8233:
					++this.pos,
						this.options.locations &&
							(++this.curLine, (this.lineStart = this.pos));
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
							break e;
					}
					break;
				default:
					if (
						(e > 8 && e < 14) ||
						(e >= 5760 && Mr.test(String.fromCharCode(e)))
					)
						++this.pos;
					else break e;
			}
		}
	};
	C.finishToken = function (e, t) {
		(this.end = this.pos),
			this.options.locations && (this.endLoc = this.curPosition());
		var i = this.type;
		(this.type = e), (this.value = t), this.updateContext(i);
	};
	C.readToken_dot = function () {
		var e = this.input.charCodeAt(this.pos + 1);
		if (e >= 48 && e <= 57) return this.readNumber(!0);
		var t = this.input.charCodeAt(this.pos + 2);
		return this.options.ecmaVersion >= 6 && e === 46 && t === 46
			? ((this.pos += 3), this.finishToken(u.ellipsis))
			: (++this.pos, this.finishToken(u.dot));
	};
	C.readToken_slash = function () {
		var e = this.input.charCodeAt(this.pos + 1);
		return this.exprAllowed
			? (++this.pos, this.readRegexp())
			: e === 61
				? this.finishOp(u.assign, 2)
				: this.finishOp(u.slash, 1);
	};
	C.readToken_mult_modulo_exp = function (e) {
		var t = this.input.charCodeAt(this.pos + 1),
			i = 1,
			r = e === 42 ? u.star : u.modulo;
		return (
			this.options.ecmaVersion >= 7 &&
				e === 42 &&
				t === 42 &&
				(++i, (r = u.starstar), (t = this.input.charCodeAt(this.pos + 2))),
			t === 61 ? this.finishOp(u.assign, i + 1) : this.finishOp(r, i)
		);
	};
	C.readToken_pipe_amp = function (e) {
		var t = this.input.charCodeAt(this.pos + 1);
		if (t === e) {
			if (this.options.ecmaVersion >= 12) {
				var i = this.input.charCodeAt(this.pos + 2);
				if (i === 61) return this.finishOp(u.assign, 3);
			}
			return this.finishOp(e === 124 ? u.logicalOR : u.logicalAND, 2);
		}
		return t === 61
			? this.finishOp(u.assign, 2)
			: this.finishOp(e === 124 ? u.bitwiseOR : u.bitwiseAND, 1);
	};
	C.readToken_caret = function () {
		var e = this.input.charCodeAt(this.pos + 1);
		return e === 61
			? this.finishOp(u.assign, 2)
			: this.finishOp(u.bitwiseXOR, 1);
	};
	C.readToken_plus_min = function (e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return t === e
			? t === 45 &&
				!this.inModule &&
				this.input.charCodeAt(this.pos + 2) === 62 &&
				(this.lastTokEnd === 0 ||
					Y.test(this.input.slice(this.lastTokEnd, this.pos)))
				? (this.skipLineComment(3), this.skipSpace(), this.nextToken())
				: this.finishOp(u.incDec, 2)
			: t === 61
				? this.finishOp(u.assign, 2)
				: this.finishOp(u.plusMin, 1);
	};
	C.readToken_lt_gt = function (e) {
		var t = this.input.charCodeAt(this.pos + 1),
			i = 1;
		return t === e
			? ((i = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2),
				this.input.charCodeAt(this.pos + i) === 61
					? this.finishOp(u.assign, i + 1)
					: this.finishOp(u.bitShift, i))
			: t === 33 &&
					e === 60 &&
					!this.inModule &&
					this.input.charCodeAt(this.pos + 2) === 45 &&
					this.input.charCodeAt(this.pos + 3) === 45
				? (this.skipLineComment(4), this.skipSpace(), this.nextToken())
				: (t === 61 && (i = 2), this.finishOp(u.relational, i));
	};
	C.readToken_eq_excl = function (e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return t === 61
			? this.finishOp(
					u.equality,
					this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2,
				)
			: e === 61 && t === 62 && this.options.ecmaVersion >= 6
				? ((this.pos += 2), this.finishToken(u.arrow))
				: this.finishOp(e === 61 ? u.eq : u.prefix, 1);
	};
	C.readToken_question = function () {
		var e = this.options.ecmaVersion;
		if (e >= 11) {
			var t = this.input.charCodeAt(this.pos + 1);
			if (t === 46) {
				var i = this.input.charCodeAt(this.pos + 2);
				if (i < 48 || i > 57) return this.finishOp(u.questionDot, 2);
			}
			if (t === 63) {
				if (e >= 12) {
					var r = this.input.charCodeAt(this.pos + 2);
					if (r === 61) return this.finishOp(u.assign, 3);
				}
				return this.finishOp(u.coalesce, 2);
			}
		}
		return this.finishOp(u.question, 1);
	};
	C.readToken_numberSign = function () {
		var e = this.options.ecmaVersion,
			t = 35;
		if (
			e >= 13 &&
			(++this.pos, (t = this.fullCharCodeAtPos()), ce(t, !0) || t === 92)
		)
			return this.finishToken(u.privateId, this.readWord1());
		this.raise(this.pos, "Unexpected character '" + fe(t) + "'");
	};
	C.getTokenFromCode = function (e) {
		switch (e) {
			case 46:
				return this.readToken_dot();
			case 40:
				return ++this.pos, this.finishToken(u.parenL);
			case 41:
				return ++this.pos, this.finishToken(u.parenR);
			case 59:
				return ++this.pos, this.finishToken(u.semi);
			case 44:
				return ++this.pos, this.finishToken(u.comma);
			case 91:
				return ++this.pos, this.finishToken(u.bracketL);
			case 93:
				return ++this.pos, this.finishToken(u.bracketR);
			case 123:
				return ++this.pos, this.finishToken(u.braceL);
			case 125:
				return ++this.pos, this.finishToken(u.braceR);
			case 58:
				return ++this.pos, this.finishToken(u.colon);
			case 96:
				if (this.options.ecmaVersion < 6) break;
				return ++this.pos, this.finishToken(u.backQuote);
			case 48:
				var t = this.input.charCodeAt(this.pos + 1);
				if (t === 120 || t === 88) return this.readRadixNumber(16);
				if (this.options.ecmaVersion >= 6) {
					if (t === 111 || t === 79) return this.readRadixNumber(8);
					if (t === 98 || t === 66) return this.readRadixNumber(2);
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
				return this.finishOp(u.prefix, 1);
			case 35:
				return this.readToken_numberSign();
		}
		this.raise(this.pos, "Unexpected character '" + fe(e) + "'");
	};
	C.finishOp = function (e, t) {
		var i = this.input.slice(this.pos, this.pos + t);
		return (this.pos += t), this.finishToken(e, i);
	};
	C.readRegexp = function () {
		for (var e, t, i = this.pos; ; ) {
			this.pos >= this.input.length &&
				this.raise(i, "Unterminated regular expression");
			var r = this.input.charAt(this.pos);
			if ((Y.test(r) && this.raise(i, "Unterminated regular expression"), e))
				e = !1;
			else {
				if (r === "[") t = !0;
				else if (r === "]" && t) t = !1;
				else if (r === "/" && !t) break;
				e = r === "\\";
			}
			++this.pos;
		}
		var n = this.input.slice(i, this.pos);
		++this.pos;
		var a = this.pos,
			s = this.readWord1();
		this.containsEsc && this.unexpected(a);
		var o = this.regexpState || (this.regexpState = new re(this));
		o.reset(i, n, s),
			this.validateRegExpFlags(o),
			this.validateRegExpPattern(o);
		var c = null;
		try {
			c = new RegExp(n, s);
		} catch {}
		return this.finishToken(u.regexp, { pattern: n, flags: s, value: c });
	};
	C.readInt = function (e, t, i) {
		for (
			var r = this.options.ecmaVersion >= 12 && t === void 0,
				n = i && this.input.charCodeAt(this.pos) === 48,
				a = this.pos,
				s = 0,
				o = 0,
				c = 0,
				l = t ?? 1 / 0;
			c < l;
			++c, ++this.pos
		) {
			var h = this.input.charCodeAt(this.pos),
				f = void 0;
			if (r && h === 95) {
				n &&
					this.raiseRecoverable(
						this.pos,
						"Numeric separator is not allowed in legacy octal numeric literals",
					),
					o === 95 &&
						this.raiseRecoverable(
							this.pos,
							"Numeric separator must be exactly one underscore",
						),
					c === 0 &&
						this.raiseRecoverable(
							this.pos,
							"Numeric separator is not allowed at the first of digits",
						),
					(o = h);
				continue;
			}
			if (
				(h >= 97
					? (f = h - 97 + 10)
					: h >= 65
						? (f = h - 65 + 10)
						: h >= 48 && h <= 57
							? (f = h - 48)
							: (f = 1 / 0),
				f >= e)
			)
				break;
			(o = h), (s = s * e + f);
		}
		return (
			r &&
				o === 95 &&
				this.raiseRecoverable(
					this.pos - 1,
					"Numeric separator is not allowed at the last of digits",
				),
			this.pos === a || (t != null && this.pos - a !== t) ? null : s
		);
	};
	function os(e, t) {
		return t ? Number.parseInt(e, 8) : Number.parseFloat(e.replace(/_/g, ""));
	}
	function pn(e) {
		return typeof BigInt != "function" ? null : BigInt(e.replace(/_/g, ""));
	}
	C.readRadixNumber = function (e) {
		var t = this.pos;
		this.pos += 2;
		var i = this.readInt(e);
		return (
			i == null && this.raise(this.start + 2, "Expected number in radix " + e),
			this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110
				? ((i = pn(this.input.slice(t, this.pos))), ++this.pos)
				: ce(this.fullCharCodeAtPos()) &&
					this.raise(this.pos, "Identifier directly after number"),
			this.finishToken(u.num, i)
		);
	};
	C.readNumber = function (e) {
		var t = this.pos;
		!e &&
			this.readInt(10, void 0, !0) === null &&
			this.raise(t, "Invalid number");
		var i = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
		i && this.strict && this.raise(t, "Invalid number");
		var r = this.input.charCodeAt(this.pos);
		if (!i && !e && this.options.ecmaVersion >= 11 && r === 110) {
			var n = pn(this.input.slice(t, this.pos));
			return (
				++this.pos,
				ce(this.fullCharCodeAtPos()) &&
					this.raise(this.pos, "Identifier directly after number"),
				this.finishToken(u.num, n)
			);
		}
		i && /[89]/.test(this.input.slice(t, this.pos)) && (i = !1),
			r === 46 &&
				!i &&
				(++this.pos, this.readInt(10), (r = this.input.charCodeAt(this.pos))),
			(r === 69 || r === 101) &&
				!i &&
				((r = this.input.charCodeAt(++this.pos)),
				(r === 43 || r === 45) && ++this.pos,
				this.readInt(10) === null && this.raise(t, "Invalid number")),
			ce(this.fullCharCodeAtPos()) &&
				this.raise(this.pos, "Identifier directly after number");
		var a = os(this.input.slice(t, this.pos), i);
		return this.finishToken(u.num, a);
	};
	C.readCodePoint = function () {
		var e = this.input.charCodeAt(this.pos),
			t;
		if (e === 123) {
			this.options.ecmaVersion < 6 && this.unexpected();
			var i = ++this.pos;
			(t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos)),
				++this.pos,
				t > 1114111 && this.invalidStringToken(i, "Code point out of bounds");
		} else t = this.readHexChar(4);
		return t;
	};
	C.readString = function (e) {
		for (var t = "", i = ++this.pos; ; ) {
			this.pos >= this.input.length &&
				this.raise(this.start, "Unterminated string constant");
			var r = this.input.charCodeAt(this.pos);
			if (r === e) break;
			r === 92
				? ((t += this.input.slice(i, this.pos)),
					(t += this.readEscapedChar(!1)),
					(i = this.pos))
				: r === 8232 || r === 8233
					? (this.options.ecmaVersion < 10 &&
							this.raise(this.start, "Unterminated string constant"),
						++this.pos,
						this.options.locations &&
							(this.curLine++, (this.lineStart = this.pos)))
					: (we(r) && this.raise(this.start, "Unterminated string constant"),
						++this.pos);
		}
		return (
			(t += this.input.slice(i, this.pos++)), this.finishToken(u.string, t)
		);
	};
	var fn = {};
	C.tryReadTemplateToken = function () {
		this.inTemplateElement = !0;
		try {
			this.readTmplToken();
		} catch (e) {
			if (e === fn) this.readInvalidTemplateToken();
			else throw e;
		}
		this.inTemplateElement = !1;
	};
	C.invalidStringToken = function (e, t) {
		if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw fn;
		this.raise(e, t);
	};
	C.readTmplToken = function () {
		for (var e = "", t = this.pos; ; ) {
			this.pos >= this.input.length &&
				this.raise(this.start, "Unterminated template");
			var i = this.input.charCodeAt(this.pos);
			if (i === 96 || (i === 36 && this.input.charCodeAt(this.pos + 1) === 123))
				return this.pos === this.start &&
					(this.type === u.template || this.type === u.invalidTemplate)
					? i === 36
						? ((this.pos += 2), this.finishToken(u.dollarBraceL))
						: (++this.pos, this.finishToken(u.backQuote))
					: ((e += this.input.slice(t, this.pos)),
						this.finishToken(u.template, e));
			if (i === 92)
				(e += this.input.slice(t, this.pos)),
					(e += this.readEscapedChar(!0)),
					(t = this.pos);
			else if (we(i)) {
				switch (((e += this.input.slice(t, this.pos)), ++this.pos, i)) {
					case 13:
						this.input.charCodeAt(this.pos) === 10 && ++this.pos;
					case 10:
						e += `
`;
						break;
					default:
						e += String.fromCharCode(i);
						break;
				}
				this.options.locations && (++this.curLine, (this.lineStart = this.pos)),
					(t = this.pos);
			} else ++this.pos;
		}
	};
	C.readInvalidTemplateToken = function () {
		for (; this.pos < this.input.length; this.pos++)
			switch (this.input[this.pos]) {
				case "\\":
					++this.pos;
					break;
				case "$":
					if (this.input[this.pos + 1] !== "{") break;
				case "`":
					return this.finishToken(
						u.invalidTemplate,
						this.input.slice(this.start, this.pos),
					);
			}
		this.raise(this.start, "Unterminated template");
	};
	C.readEscapedChar = function (e) {
		var t = this.input.charCodeAt(++this.pos);
		switch ((++this.pos, t)) {
			case 110:
				return `
`;
			case 114:
				return "\r";
			case 120:
				return String.fromCharCode(this.readHexChar(2));
			case 117:
				return fe(this.readCodePoint());
			case 116:
				return "	";
			case 98:
				return "\b";
			case 118:
				return "\v";
			case 102:
				return "\f";
			case 13:
				this.input.charCodeAt(this.pos) === 10 && ++this.pos;
			case 10:
				return (
					this.options.locations &&
						((this.lineStart = this.pos), ++this.curLine),
					""
				);
			case 56:
			case 57:
				if (
					(this.strict &&
						this.invalidStringToken(this.pos - 1, "Invalid escape sequence"),
					e)
				) {
					var i = this.pos - 1;
					this.invalidStringToken(
						i,
						"Invalid escape sequence in template string",
					);
				}
			default:
				if (t >= 48 && t <= 55) {
					var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
						n = Number.parseInt(r, 8);
					return (
						n > 255 && ((r = r.slice(0, -1)), (n = Number.parseInt(r, 8))),
						(this.pos += r.length - 1),
						(t = this.input.charCodeAt(this.pos)),
						(r !== "0" || t === 56 || t === 57) &&
							(this.strict || e) &&
							this.invalidStringToken(
								this.pos - 1 - r.length,
								e
									? "Octal literal in template string"
									: "Octal literal in strict mode",
							),
						String.fromCharCode(n)
					);
				}
				return we(t) ? "" : String.fromCharCode(t);
		}
	};
	C.readHexChar = function (e) {
		var t = this.pos,
			i = this.readInt(16, e);
		return (
			i === null && this.invalidStringToken(t, "Bad character escape sequence"),
			i
		);
	};
	C.readWord1 = function () {
		this.containsEsc = !1;
		for (
			var e = "", t = !0, i = this.pos, r = this.options.ecmaVersion >= 6;
			this.pos < this.input.length;
		) {
			var n = this.fullCharCodeAtPos();
			if (be(n, r)) this.pos += n <= 65535 ? 1 : 2;
			else if (n === 92) {
				(this.containsEsc = !0), (e += this.input.slice(i, this.pos));
				var a = this.pos;
				this.input.charCodeAt(++this.pos) !== 117 &&
					this.invalidStringToken(
						this.pos,
						"Expecting Unicode escape sequence \\uXXXX",
					),
					++this.pos;
				var s = this.readCodePoint();
				(t ? ce : be)(s, r) ||
					this.invalidStringToken(a, "Invalid Unicode escape"),
					(e += fe(s)),
					(i = this.pos);
			} else break;
			t = !1;
		}
		return e + this.input.slice(i, this.pos);
	};
	C.readWord = function () {
		var e = this.readWord1(),
			t = u.name;
		return this.keywords.test(e) && (t = Gt[e]), this.finishToken(t, e);
	};
	var cs = "8.10.0";
	T.acorn = {
		Parser: T,
		version: cs,
		defaultOptions: Wt,
		Position: Re,
		SourceLocation: rt,
		getLineInfo: Or,
		Node: at,
		TokenType: L,
		tokTypes: u,
		keywordTypes: Gt,
		TokContext: Z,
		tokContexts: R,
		isIdentifierChar: be,
		isIdentifierStart: ce,
		Token: Zt,
		isNewLine: we,
		lineBreak: Y,
		lineBreakG: Ma,
		nonASCIIwhitespace: Mr,
	};
	function dn(e, t) {
		return T.parse(e, t);
	}
	var ti = globalThis.fetch,
		me = globalThis.WebSocket,
		us = globalThis.Request,
		mn = globalThis.Response,
		ge = {
			prototype: { send: me.prototype.send },
			CLOSED: me.CLOSED,
			CLOSING: me.CLOSING,
			CONNECTING: me.CONNECTING,
			OPEN: me.OPEN,
		},
		ls = 20,
		hs = [101, 204, 205, 304],
		ps = [301, 302, 303, 307, 308],
		ct = class extends Error {
			constructor(i, r) {
				super(r.message || r.code);
				q(this, "status");
				q(this, "body");
				(this.status = i), (this.body = r);
			}
		},
		ii = class {
			constructor(t, i) {
				q(this, "base");
				this.base = new URL(`./v${t}/`, i);
			}
		};
	function ye(e, t) {
		const i = (e & 65535) + (t & 65535);
		return (((e >> 16) + (t >> 16) + (i >> 16)) << 16) | (i & 65535);
	}
	function fs(e, t) {
		return (e << t) | (e >>> (32 - t));
	}
	function ut(e, t, i, r, n, a) {
		return ye(fs(ye(ye(t, e), ye(r, a)), n), i);
	}
	function D(e, t, i, r, n, a, s) {
		return ut((t & i) | (~t & r), e, t, n, a, s);
	}
	function O(e, t, i, r, n, a, s) {
		return ut((t & r) | (i & ~r), e, t, n, a, s);
	}
	function V(e, t, i, r, n, a, s) {
		return ut(t ^ i ^ r, e, t, n, a, s);
	}
	function F(e, t, i, r, n, a, s) {
		return ut(i ^ (t | ~r), e, t, n, a, s);
	}
	function ot(e, t) {
		(e[t >> 5] |= 128 << (t % 32)), (e[(((t + 64) >>> 9) << 4) + 14] = t);
		let i = 1732584193,
			r = -271733879,
			n = -1732584194,
			a = 271733878;
		for (let s = 0; s < e.length; s += 16) {
			const o = i,
				c = r,
				l = n,
				h = a;
			(i = D(i, r, n, a, e[s], 7, -680876936)),
				(a = D(a, i, r, n, e[s + 1], 12, -389564586)),
				(n = D(n, a, i, r, e[s + 2], 17, 606105819)),
				(r = D(r, n, a, i, e[s + 3], 22, -1044525330)),
				(i = D(i, r, n, a, e[s + 4], 7, -176418897)),
				(a = D(a, i, r, n, e[s + 5], 12, 1200080426)),
				(n = D(n, a, i, r, e[s + 6], 17, -1473231341)),
				(r = D(r, n, a, i, e[s + 7], 22, -45705983)),
				(i = D(i, r, n, a, e[s + 8], 7, 1770035416)),
				(a = D(a, i, r, n, e[s + 9], 12, -1958414417)),
				(n = D(n, a, i, r, e[s + 10], 17, -42063)),
				(r = D(r, n, a, i, e[s + 11], 22, -1990404162)),
				(i = D(i, r, n, a, e[s + 12], 7, 1804603682)),
				(a = D(a, i, r, n, e[s + 13], 12, -40341101)),
				(n = D(n, a, i, r, e[s + 14], 17, -1502002290)),
				(r = D(r, n, a, i, e[s + 15], 22, 1236535329)),
				(i = O(i, r, n, a, e[s + 1], 5, -165796510)),
				(a = O(a, i, r, n, e[s + 6], 9, -1069501632)),
				(n = O(n, a, i, r, e[s + 11], 14, 643717713)),
				(r = O(r, n, a, i, e[s], 20, -373897302)),
				(i = O(i, r, n, a, e[s + 5], 5, -701558691)),
				(a = O(a, i, r, n, e[s + 10], 9, 38016083)),
				(n = O(n, a, i, r, e[s + 15], 14, -660478335)),
				(r = O(r, n, a, i, e[s + 4], 20, -405537848)),
				(i = O(i, r, n, a, e[s + 9], 5, 568446438)),
				(a = O(a, i, r, n, e[s + 14], 9, -1019803690)),
				(n = O(n, a, i, r, e[s + 3], 14, -187363961)),
				(r = O(r, n, a, i, e[s + 8], 20, 1163531501)),
				(i = O(i, r, n, a, e[s + 13], 5, -1444681467)),
				(a = O(a, i, r, n, e[s + 2], 9, -51403784)),
				(n = O(n, a, i, r, e[s + 7], 14, 1735328473)),
				(r = O(r, n, a, i, e[s + 12], 20, -1926607734)),
				(i = V(i, r, n, a, e[s + 5], 4, -378558)),
				(a = V(a, i, r, n, e[s + 8], 11, -2022574463)),
				(n = V(n, a, i, r, e[s + 11], 16, 1839030562)),
				(r = V(r, n, a, i, e[s + 14], 23, -35309556)),
				(i = V(i, r, n, a, e[s + 1], 4, -1530992060)),
				(a = V(a, i, r, n, e[s + 4], 11, 1272893353)),
				(n = V(n, a, i, r, e[s + 7], 16, -155497632)),
				(r = V(r, n, a, i, e[s + 10], 23, -1094730640)),
				(i = V(i, r, n, a, e[s + 13], 4, 681279174)),
				(a = V(a, i, r, n, e[s], 11, -358537222)),
				(n = V(n, a, i, r, e[s + 3], 16, -722521979)),
				(r = V(r, n, a, i, e[s + 6], 23, 76029189)),
				(i = V(i, r, n, a, e[s + 9], 4, -640364487)),
				(a = V(a, i, r, n, e[s + 12], 11, -421815835)),
				(n = V(n, a, i, r, e[s + 15], 16, 530742520)),
				(r = V(r, n, a, i, e[s + 2], 23, -995338651)),
				(i = F(i, r, n, a, e[s], 6, -198630844)),
				(a = F(a, i, r, n, e[s + 7], 10, 1126891415)),
				(n = F(n, a, i, r, e[s + 14], 15, -1416354905)),
				(r = F(r, n, a, i, e[s + 5], 21, -57434055)),
				(i = F(i, r, n, a, e[s + 12], 6, 1700485571)),
				(a = F(a, i, r, n, e[s + 3], 10, -1894986606)),
				(n = F(n, a, i, r, e[s + 10], 15, -1051523)),
				(r = F(r, n, a, i, e[s + 1], 21, -2054922799)),
				(i = F(i, r, n, a, e[s + 8], 6, 1873313359)),
				(a = F(a, i, r, n, e[s + 15], 10, -30611744)),
				(n = F(n, a, i, r, e[s + 6], 15, -1560198380)),
				(r = F(r, n, a, i, e[s + 13], 21, 1309151649)),
				(i = F(i, r, n, a, e[s + 4], 6, -145523070)),
				(a = F(a, i, r, n, e[s + 11], 10, -1120210379)),
				(n = F(n, a, i, r, e[s + 2], 15, 718787259)),
				(r = F(r, n, a, i, e[s + 9], 21, -343485551)),
				(i = ye(i, o)),
				(r = ye(r, c)),
				(n = ye(n, l)),
				(a = ye(a, h));
		}
		return [i, r, n, a];
	}
	function yn(e) {
		let t = "",
			i = e.length * 32;
		for (let r = 0; r < i; r += 8)
			t += String.fromCharCode((e[r >> 5] >>> (r % 32)) & 255);
		return t;
	}
	function ri(e) {
		const t = [],
			i = e.length >> 2;
		for (let n = 0; n < i; n += 1) t[n] = 0;
		const r = e.length * 8;
		for (let n = 0; n < r; n += 8)
			t[n >> 5] |= (e.charCodeAt(n / 8) & 255) << (n % 32);
		return t;
	}
	function ds(e) {
		return yn(ot(ri(e), e.length * 8));
	}
	function ms(e, t) {
		let i = ri(e),
			r = [],
			n = [];
		i.length > 16 && (i = ot(i, e.length * 8));
		for (let s = 0; s < 16; s += 1)
			(r[s] = i[s] ^ 909522486), (n[s] = i[s] ^ 1549556828);
		const a = ot(r.concat(ri(t)), 512 + t.length * 8);
		return yn(ot(n.concat(a), 512 + 128));
	}
	function gn(e) {
		let t = "0123456789abcdef",
			i = "";
		for (let r = 0; r < e.length; r += 1) {
			const n = e.charCodeAt(r);
			i += t.charAt((n >>> 4) & 15) + t.charAt(n & 15);
		}
		return i;
	}
	function ni(e) {
		return unescape(encodeURIComponent(e));
	}
	function xn(e) {
		return ds(ni(e));
	}
	function ys(e) {
		return gn(xn(e));
	}
	function _n(e, t) {
		return ms(ni(e), ni(t));
	}
	function gs(e, t) {
		return gn(_n(e, t));
	}
	function xs(e, t, i) {
		return t ? (i ? _n(t, e) : gs(t, e)) : i ? xn(e) : ys(e);
	}
	var ei = 3072;
	function _s(e) {
		const t = new Headers(e);
		if (e.has("x-bare-headers")) {
			const i = e.get("x-bare-headers");
			if (i.length > ei) {
				t.delete("x-bare-headers");
				let r = 0;
				for (let n = 0; n < i.length; n += ei) {
					const a = i.slice(n, n + ei),
						s = r++;
					t.set(`x-bare-headers-${s}`, `;${a}`);
				}
			}
		}
		return t;
	}
	function bs(e) {
		const t = new Headers(e),
			i = "x-bare-headers";
		if (e.has(`${i}-0`)) {
			const r = [];
			for (const [n, a] of e) {
				if (!n.startsWith(i)) continue;
				if (!a.startsWith(";"))
					throw new ct(400, {
						code: "INVALID_BARE_HEADER",
						id: `request.headers.${n}`,
						message: "Value didn't begin with semi-colon.",
					});
				const s = Number.parseInt(n.slice(i.length + 1));
				(r[s] = a.slice(1)), t.delete(n);
			}
			t.set(i, r.join(""));
		}
		return t;
	}
	var ai = class extends ii {
			constructor(i) {
				super(3, i);
				q(this, "ws");
				q(this, "http");
				(this.ws = new URL(this.base)),
					(this.http = new URL(this.base)),
					this.ws.protocol === "https:"
						? (this.ws.protocol = "wss:")
						: (this.ws.protocol = "ws:");
			}
			connect(i, r, n, a, s) {
				const o = new me(this.ws),
					c = () => {
						o.removeEventListener("close", l),
							o.removeEventListener("message", h);
					},
					l = () => {
						c();
					},
					h = (f) => {
						if ((c(), typeof f.data != "string"))
							throw new TypeError(
								"the first websocket message was not a text frame",
							);
						const A = JSON.parse(f.data);
						if (A.type !== "open")
							throw new TypeError("message was not of open type");
						f.stopImmediatePropagation(),
							a({ protocol: A.protocol, setCookies: A.setCookies }),
							s(ge.OPEN),
							o.dispatchEvent(new Event("open"));
					};
				return (
					o.addEventListener("close", l),
					o.addEventListener("message", h),
					o.addEventListener(
						"open",
						(f) => {
							f.stopImmediatePropagation(),
								s(ge.CONNECTING),
								n().then((A) =>
									ge.prototype.send.call(
										o,
										JSON.stringify({
											type: "connect",
											remote: i.toString(),
											protocols: r,
											headers: A,
											forwardHeaders: [],
										}),
									),
								);
						},
						{ once: !0 },
					),
					o
				);
			}
			async request(i, r, n, a, s, o, c) {
				if (a.protocol.startsWith("blob:")) {
					const p = await ti(a),
						W = new mn(p.body, p);
					return (
						(W.rawHeaders = Object.fromEntries(p.headers)),
						(W.rawResponse = p),
						W
					);
				}
				const l = {};
				if (r instanceof Headers) for (const [p, W] of r) l[p] = W;
				else for (const p in r) l[p] = r[p];
				const h = { credentials: "omit", method: i, signal: c };
				s !== "only-if-cached" && (h.cache = s),
					n !== void 0 && (h.body = n),
					o !== void 0 && (h.duplex = o),
					(h.headers = this.createBareHeaders(a, l));
				const f = await ti(this.http + "?cache=" + xs(a.toString()), h),
					A = await this.readBareResponse(f),
					d = new mn(hs.includes(A.status) ? void 0 : f.body, {
						status: A.status,
						statusText: A.statusText ?? void 0,
						headers: new Headers(A.headers),
					});
				return (d.rawHeaders = A.headers), (d.rawResponse = f), d;
			}
			async readBareResponse(i) {
				if (!i.ok) throw new ct(i.status, await i.json());
				const r = bs(i.headers),
					n = {},
					a = r.get("x-bare-status");
				a !== null && (n.status = Number.parseInt(a));
				const s = r.get("x-bare-status-text");
				s !== null && (n.statusText = s);
				const o = r.get("x-bare-headers");
				return o !== null && (n.headers = JSON.parse(o)), n;
			}
			createBareHeaders(i, r, n = [], a = [], s = []) {
				const o = new Headers();
				o.set("x-bare-url", i.toString()),
					o.set("x-bare-headers", JSON.stringify(r));
				for (const c of n) o.append("x-bare-forward-headers", c);
				for (const c of a) o.append("x-bare-pass-headers", c);
				for (const c of s) o.append("x-bare-pass-status", c.toString());
				return _s(o), o;
			}
		},
		ws =
			"!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~";
	function vs(e) {
		for (let t = 0; t < e.length; t++) {
			const i = e[t];
			if (!ws.includes(i)) return !1;
		}
		return !0;
	}
	var Ss = [["v3", ai]];
	async function bn(e, t) {
		const i = await ti(e, { signal: t });
		if (!i.ok)
			throw new Error(
				`Unable to fetch Bare meta: ${i.status} ${await i.text()}`,
			);
		return await i.json();
	}
	var Es = Object.getOwnPropertyDescriptor(me.prototype, "readyState").get,
		Cs = ["ws:", "wss:"],
		De = class {
			constructor(t, i) {
				q(this, "manifest");
				q(this, "client");
				q(this, "server");
				q(this, "working");
				q(this, "onDemand");
				q(this, "onDemandSignal");
				(this.server = new URL(t)),
					!i || i instanceof AbortSignal
						? ((this.onDemand = !0), (this.onDemandSignal = i))
						: ((this.onDemand = !1), this.loadManifest(i));
			}
			loadManifest(t) {
				return (
					(this.manifest = t), (this.client = this.getClient()), this.client
				);
			}
			demand() {
				return this.onDemand
					? (this.working ||
							(this.working = bn(this.server, this.onDemandSignal)
								.then((t) => this.loadManifest(t))
								.catch((t) => {
									throw (delete this.working, t);
								})),
						this.working)
					: this.client;
			}
			getClient() {
				for (const [t, i] of Ss)
					if (this.manifest.versions.includes(t)) return new i(this.server);
				throw new Error(
					"Unable to find compatible client version. Starting from v2.0.0, @tomphttp/bare-client only supports Bare servers v3+. For more information, see https://github.com/tomphttp/bare-client/",
				);
			}
			createWebSocket(t, i = [], r) {
				if (!this.client)
					throw new TypeError(
						"You need to wait for the client to finish fetching the manifest before creating any WebSockets. Try caching the manifest data before making this request.",
					);
				try {
					t = new URL(t);
				} catch {
					throw new DOMException(
						`Faiiled to construct 'WebSocket': The URL '${t}' is invalid.`,
					);
				}
				if (!Cs.includes(t.protocol))
					throw new DOMException(
						`Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${t.protocol}' is not allowed.`,
					);
				Array.isArray(i) || (i = [i]), (i = i.map(String));
				for (const h of i)
					if (!vs(h))
						throw new DOMException(
							`Failed to construct 'WebSocket': The subprotocol '${h}' is invalid.`,
						);
				let n = this.client.connect(
						t,
						i,
						async () => {
							const h =
									typeof r.headers == "function"
										? await r.headers()
										: r.headers || {},
								f = h instanceof Headers ? Object.fromEntries(h) : h;
							return (
								(f.Host = t.host),
								(f.Pragma = "no-cache"),
								(f["Cache-Control"] = "no-cache"),
								(f.Upgrade = "websocket"),
								(f.Connection = "Upgrade"),
								f
							);
						},
						(h) => {
							(a = h.protocol),
								r.setCookiesCallback && r.setCookiesCallback(h.setCookies);
						},
						(h) => {
							s = h;
						},
						r.webSocketImpl || me,
					),
					a = "",
					s = ge.CONNECTING,
					o = () => {
						const h = Es.call(n);
						return h === ge.OPEN ? s : h;
					};
				r.readyStateHook
					? r.readyStateHook(n, o)
					: Object.defineProperty(n, "readyState", {
							get: o,
							configurable: !0,
							enumerable: !0,
						});
				const c = () => {
					if (o() === ge.CONNECTING)
						return new DOMException(
							"Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.",
						);
				};
				r.sendErrorHook
					? r.sendErrorHook(n, c)
					: (n.send = function (...h) {
							const f = c();
							if (f) throw f;
							ge.prototype.send.call(this, ...h);
						}),
					r.urlHook
						? r.urlHook(n, t)
						: Object.defineProperty(n, "url", {
								get: () => t.toString(),
								configurable: !0,
								enumerable: !0,
							});
				const l = () => a;
				return (
					r.protocolHook
						? r.protocolHook(n, l)
						: Object.defineProperty(n, "protocol", {
								get: l,
								configurable: !0,
								enumerable: !0,
							}),
					n
				);
			}
			async fetch(t, i) {
				let r = ks(t) ? new us(t, i) : t,
					n = i?.headers || r.headers,
					a = n instanceof Headers ? Object.fromEntries(n) : n,
					s = i?.duplex,
					o = i?.body || r.body,
					c = new URL(r.url),
					l = await this.demand();
				for (let h = 0; ; h++) {
					"host" in a ? (a.host = c.host) : (a.Host = c.host);
					const f = await l.request(r.method, a, o, c, r.cache, s, r.signal);
					f.finalURL = c.toString();
					const A = i?.redirect || r.redirect;
					if (ps.includes(f.status))
						switch (A) {
							case "follow": {
								const d = f.headers.get("location");
								if (ls > h && d !== null) {
									c = new URL(d, c);
									continue;
								} else throw new TypeError("Failed to fetch");
							}
							case "error":
								throw new TypeError("Failed to fetch");
							case "manual":
								return f;
						}
					else return f;
				}
			}
		};
	function ks(e) {
		return typeof e == "string" || e instanceof URL;
	}
	async function wn(e, t) {
		const i = await bn(e, t);
		return new De(e, i);
	}
	var Hs = Qe(vn(), 1),
		Nn = Qe(En(), 1);
	var { stringify: Os } = JSON;
	if (!String.prototype.repeat)
		throw new Error(
			"String.prototype.repeat is undefined, see https://github.com/davidbonnet/astring#installation",
		);
	if (!String.prototype.endsWith)
		throw new Error(
			"String.prototype.endsWith is undefined, see https://github.com/davidbonnet/astring#installation",
		);
	var ht = {
			"||": 2,
			"??": 3,
			"&&": 4,
			"|": 5,
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
			"**": 13,
		},
		ee = 17,
		Vs = {
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
			ArrowFunctionExpression: ee,
			ClassExpression: ee,
			FunctionExpression: ee,
			ObjectExpression: ee,
			UpdateExpression: 16,
			UnaryExpression: 15,
			AwaitExpression: 15,
			BinaryExpression: 14,
			LogicalExpression: 13,
			ConditionalExpression: 4,
			AssignmentExpression: 3,
			YieldExpression: 2,
			RestElement: 1,
		};
	function Ce(e, t) {
		const { generator: i } = e;
		if ((e.write("("), t != null && t.length > 0)) {
			i[t[0].type](t[0], e);
			const { length: r } = t;
			for (let n = 1; n < r; n++) {
				const a = t[n];
				e.write(", "), i[a.type](a, e);
			}
		}
		e.write(")");
	}
	function In(e, t, i, r) {
		const n = e.expressionsPrecedence[t.type];
		if (n === ee) return !0;
		const a = e.expressionsPrecedence[i.type];
		return n !== a
			? (!r && n === 15 && a === 14 && i.operator === "**") || n < a
			: n !== 13 && n !== 14
				? !1
				: t.operator === "**" && i.operator === "**"
					? !r
					: n === 13 && a === 13 && (t.operator === "??" || i.operator === "??")
						? !0
						: r
							? ht[t.operator] <= ht[i.operator]
							: ht[t.operator] < ht[i.operator];
	}
	function pt(e, t, i, r) {
		const { generator: n } = e;
		In(e, t, i, r)
			? (e.write("("), n[t.type](t, e), e.write(")"))
			: n[t.type](t, e);
	}
	function Fs(e, t, i, r) {
		const n = t.split(`
`),
			a = n.length - 1;
		if ((e.write(n[0].trim()), a > 0)) {
			e.write(r);
			for (let s = 1; s < a; s++) e.write(i + n[s].trim() + r);
			e.write(i + n[a].trim());
		}
	}
	function j(e, t, i, r) {
		const { length: n } = t;
		for (let a = 0; a < n; a++) {
			const s = t[a];
			e.write(i),
				s.type[0] === "L"
					? e.write(
							"// " +
								s.value.trim() +
								`
`,
							s,
						)
					: (e.write("/*"), Fs(e, s.value, i, r), e.write("*/" + r));
		}
	}
	function Bs(e) {
		let t = e;
		while (t != null) {
			const { type: i } = t;
			if (i[0] === "C" && i[1] === "a") return !0;
			if (i[0] === "M" && i[1] === "e" && i[2] === "m") t = t.object;
			else return !1;
		}
	}
	function ui(e, t) {
		const { generator: i } = e,
			{ declarations: r } = t;
		e.write(t.kind + " ");
		const { length: n } = r;
		if (n > 0) {
			i.VariableDeclarator(r[0], e);
			for (let a = 1; a < n; a++) e.write(", "), i.VariableDeclarator(r[a], e);
		}
	}
	var Cn,
		kn,
		An,
		Ln,
		Pn,
		Rn,
		$s = {
			Program(e, t) {
				const i = t.indent.repeat(t.indentLevel),
					{ lineEnd: r, writeComments: n } = t;
				n && e.comments != null && j(t, e.comments, i, r);
				const a = e.body,
					{ length: s } = a;
				for (let o = 0; o < s; o++) {
					const c = a[o];
					n && c.comments != null && j(t, c.comments, i, r),
						t.write(i),
						this[c.type](c, t),
						t.write(r);
				}
				n && e.trailingComments != null && j(t, e.trailingComments, i, r);
			},
			BlockStatement: (Rn = function (e, t) {
				const i = t.indent.repeat(t.indentLevel++),
					{ lineEnd: r, writeComments: n } = t,
					a = i + t.indent;
				t.write("{");
				const s = e.body;
				if (s != null && s.length > 0) {
					t.write(r), n && e.comments != null && j(t, e.comments, a, r);
					const { length: o } = s;
					for (let c = 0; c < o; c++) {
						const l = s[c];
						n && l.comments != null && j(t, l.comments, a, r),
							t.write(a),
							this[l.type](l, t),
							t.write(r);
					}
					t.write(i);
				} else
					n &&
						e.comments != null &&
						(t.write(r), j(t, e.comments, a, r), t.write(i));
				n && e.trailingComments != null && j(t, e.trailingComments, a, r),
					t.write("}"),
					t.indentLevel--;
			}),
			ClassBody: Rn,
			StaticBlock(e, t) {
				t.write("static "), this.BlockStatement(e, t);
			},
			EmptyStatement(e, t) {
				t.write(";");
			},
			ExpressionStatement(e, t) {
				const i = t.expressionsPrecedence[e.expression.type];
				i === ee || (i === 3 && e.expression.left.type[0] === "O")
					? (t.write("("),
						this[e.expression.type](e.expression, t),
						t.write(")"))
					: this[e.expression.type](e.expression, t),
					t.write(";");
			},
			IfStatement(e, t) {
				t.write("if ("),
					this[e.test.type](e.test, t),
					t.write(") "),
					this[e.consequent.type](e.consequent, t),
					e.alternate != null &&
						(t.write(" else "), this[e.alternate.type](e.alternate, t));
			},
			LabeledStatement(e, t) {
				this[e.label.type](e.label, t),
					t.write(": "),
					this[e.body.type](e.body, t);
			},
			BreakStatement(e, t) {
				t.write("break"),
					e.label != null && (t.write(" "), this[e.label.type](e.label, t)),
					t.write(";");
			},
			ContinueStatement(e, t) {
				t.write("continue"),
					e.label != null && (t.write(" "), this[e.label.type](e.label, t)),
					t.write(";");
			},
			WithStatement(e, t) {
				t.write("with ("),
					this[e.object.type](e.object, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			},
			SwitchStatement(e, t) {
				const i = t.indent.repeat(t.indentLevel++),
					{ lineEnd: r, writeComments: n } = t;
				t.indentLevel++;
				const a = i + t.indent,
					s = a + t.indent;
				t.write("switch ("),
					this[e.discriminant.type](e.discriminant, t),
					t.write(") {" + r);
				const { cases: o } = e,
					{ length: c } = o;
				for (let l = 0; l < c; l++) {
					const h = o[l];
					n && h.comments != null && j(t, h.comments, a, r),
						h.test
							? (t.write(a + "case "),
								this[h.test.type](h.test, t),
								t.write(":" + r))
							: t.write(a + "default:" + r);
					const { consequent: f } = h,
						{ length: A } = f;
					for (let d = 0; d < A; d++) {
						const p = f[d];
						n && p.comments != null && j(t, p.comments, s, r),
							t.write(s),
							this[p.type](p, t),
							t.write(r);
					}
				}
				(t.indentLevel -= 2), t.write(i + "}");
			},
			ReturnStatement(e, t) {
				t.write("return"),
					e.argument && (t.write(" "), this[e.argument.type](e.argument, t)),
					t.write(";");
			},
			ThrowStatement(e, t) {
				t.write("throw "), this[e.argument.type](e.argument, t), t.write(";");
			},
			TryStatement(e, t) {
				if ((t.write("try "), this[e.block.type](e.block, t), e.handler)) {
					const { handler: i } = e;
					i.param == null
						? t.write(" catch ")
						: (t.write(" catch ("),
							this[i.param.type](i.param, t),
							t.write(") ")),
						this[i.body.type](i.body, t);
				}
				e.finalizer &&
					(t.write(" finally "), this[e.finalizer.type](e.finalizer, t));
			},
			WhileStatement(e, t) {
				t.write("while ("),
					this[e.test.type](e.test, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			},
			DoWhileStatement(e, t) {
				t.write("do "),
					this[e.body.type](e.body, t),
					t.write(" while ("),
					this[e.test.type](e.test, t),
					t.write(");");
			},
			ForStatement(e, t) {
				if ((t.write("for ("), e.init != null)) {
					const { init: i } = e;
					i.type[0] === "V" ? ui(t, i) : this[i.type](i, t);
				}
				t.write("; "),
					e.test && this[e.test.type](e.test, t),
					t.write("; "),
					e.update && this[e.update.type](e.update, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			},
			ForInStatement: (Cn = function (e, t) {
				t.write(`for ${e.await ? "await " : ""}(`);
				const { left: i } = e;
				i.type[0] === "V" ? ui(t, i) : this[i.type](i, t),
					t.write(e.type[3] === "I" ? " in " : " of "),
					this[e.right.type](e.right, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			}),
			ForOfStatement: Cn,
			DebuggerStatement(e, t) {
				t.write("debugger;", e);
			},
			FunctionDeclaration: (kn = function (e, t) {
				t.write(
					(e.async ? "async " : "") +
						(e.generator ? "function* " : "function ") +
						(e.id ? e.id.name : ""),
					e,
				),
					Ce(t, e.params),
					t.write(" "),
					this[e.body.type](e.body, t);
			}),
			FunctionExpression: kn,
			VariableDeclaration(e, t) {
				ui(t, e), t.write(";");
			},
			VariableDeclarator(e, t) {
				this[e.id.type](e.id, t),
					e.init != null && (t.write(" = "), this[e.init.type](e.init, t));
			},
			ClassDeclaration(e, t) {
				if (
					(t.write("class " + (e.id ? `${e.id.name} ` : ""), e), e.superClass)
				) {
					t.write("extends ");
					const { superClass: i } = e,
						{ type: r } = i,
						n = t.expressionsPrecedence[r];
					(r[0] !== "C" || r[1] !== "l" || r[5] !== "E") &&
					(n === ee || n < t.expressionsPrecedence.ClassExpression)
						? (t.write("("), this[e.superClass.type](i, t), t.write(")"))
						: this[i.type](i, t),
						t.write(" ");
				}
				this.ClassBody(e.body, t);
			},
			ImportDeclaration(e, t) {
				t.write("import ");
				let { specifiers: i } = e,
					{ length: r } = i,
					n = 0;
				if (r > 0) {
					while (n < r) {
						n > 0 && t.write(", ");
						const a = i[n],
							s = a.type[6];
						if (s === "D") t.write(a.local.name, a), n++;
						else if (s === "N") t.write("* as " + a.local.name, a), n++;
						else break;
					}
					if (n < r) {
						for (t.write("{"); ; ) {
							const a = i[n],
								{ name: s } = a.imported;
							if (
								(t.write(s, a),
								s !== a.local.name && t.write(" as " + a.local.name),
								++n < r)
							)
								t.write(", ");
							else break;
						}
						t.write("}");
					}
					t.write(" from ");
				}
				this.Literal(e.source, t), t.write(";");
			},
			ImportExpression(e, t) {
				t.write("import("), this[e.source.type](e.source, t), t.write(")");
			},
			ExportDefaultDeclaration(e, t) {
				t.write("export default "),
					this[e.declaration.type](e.declaration, t),
					t.expressionsPrecedence[e.declaration.type] != null &&
						e.declaration.type[0] !== "F" &&
						t.write(";");
			},
			ExportNamedDeclaration(e, t) {
				if ((t.write("export "), e.declaration))
					this[e.declaration.type](e.declaration, t);
				else {
					t.write("{");
					const { specifiers: i } = e,
						{ length: r } = i;
					if (r > 0)
						for (let n = 0; ; ) {
							const a = i[n],
								{ name: s } = a.local;
							if (
								(t.write(s, a),
								s !== a.exported.name && t.write(" as " + a.exported.name),
								++n < r)
							)
								t.write(", ");
							else break;
						}
					t.write("}"),
						e.source && (t.write(" from "), this.Literal(e.source, t)),
						t.write(";");
				}
			},
			ExportAllDeclaration(e, t) {
				e.exported != null
					? t.write("export * as " + e.exported.name + " from ")
					: t.write("export * from "),
					this.Literal(e.source, t),
					t.write(";");
			},
			MethodDefinition(e, t) {
				e.static && t.write("static ");
				const i = e.kind[0];
				(i === "g" || i === "s") && t.write(e.kind + " "),
					e.value.async && t.write("async "),
					e.value.generator && t.write("*"),
					e.computed
						? (t.write("["), this[e.key.type](e.key, t), t.write("]"))
						: this[e.key.type](e.key, t),
					Ce(t, e.value.params),
					t.write(" "),
					this[e.value.body.type](e.value.body, t);
			},
			ClassExpression(e, t) {
				this.ClassDeclaration(e, t);
			},
			ArrowFunctionExpression(e, t) {
				t.write(e.async ? "async " : "", e);
				const { params: i } = e;
				i != null &&
					(i.length === 1 && i[0].type[0] === "I"
						? t.write(i[0].name, i[0])
						: Ce(t, e.params)),
					t.write(" => "),
					e.body.type[0] === "O"
						? (t.write("("), this.ObjectExpression(e.body, t), t.write(")"))
						: this[e.body.type](e.body, t);
			},
			ThisExpression(e, t) {
				t.write("this", e);
			},
			Super(e, t) {
				t.write("super", e);
			},
			RestElement: (An = function (e, t) {
				t.write("..."), this[e.argument.type](e.argument, t);
			}),
			SpreadElement: An,
			YieldExpression(e, t) {
				t.write(e.delegate ? "yield*" : "yield"),
					e.argument && (t.write(" "), this[e.argument.type](e.argument, t));
			},
			AwaitExpression(e, t) {
				t.write("await ", e), pt(t, e.argument, e);
			},
			TemplateLiteral(e, t) {
				const { quasis: i, expressions: r } = e;
				t.write("`");
				const { length: n } = r;
				for (let s = 0; s < n; s++) {
					const o = r[s],
						c = i[s];
					t.write(c.value.raw, c),
						t.write("${"),
						this[o.type](o, t),
						t.write("}");
				}
				const a = i[i.length - 1];
				t.write(a.value.raw, a), t.write("`");
			},
			TemplateElement(e, t) {
				t.write(e.value.raw, e);
			},
			TaggedTemplateExpression(e, t) {
				pt(t, e.tag, e), this[e.quasi.type](e.quasi, t);
			},
			ArrayExpression: (Pn = function (e, t) {
				if ((t.write("["), e.elements.length > 0)) {
					const { elements: i } = e,
						{ length: r } = i;
					for (let n = 0; ; ) {
						const a = i[n];
						if ((a != null && this[a.type](a, t), ++n < r)) t.write(", ");
						else {
							a == null && t.write(", ");
							break;
						}
					}
				}
				t.write("]");
			}),
			ArrayPattern: Pn,
			ObjectExpression(e, t) {
				const i = t.indent.repeat(t.indentLevel++),
					{ lineEnd: r, writeComments: n } = t,
					a = i + t.indent;
				if ((t.write("{"), e.properties.length > 0)) {
					t.write(r), n && e.comments != null && j(t, e.comments, a, r);
					const s = "," + r,
						{ properties: o } = e,
						{ length: c } = o;
					for (let l = 0; ; ) {
						const h = o[l];
						if (
							(n && h.comments != null && j(t, h.comments, a, r),
							t.write(a),
							this[h.type](h, t),
							++l < c)
						)
							t.write(s);
						else break;
					}
					t.write(r),
						n && e.trailingComments != null && j(t, e.trailingComments, a, r),
						t.write(i + "}");
				} else
					n
						? e.comments != null
							? (t.write(r),
								j(t, e.comments, a, r),
								e.trailingComments != null && j(t, e.trailingComments, a, r),
								t.write(i + "}"))
							: e.trailingComments != null
								? (t.write(r), j(t, e.trailingComments, a, r), t.write(i + "}"))
								: t.write("}")
						: t.write("}");
				t.indentLevel--;
			},
			Property(e, t) {
				e.method || e.kind[0] !== "i"
					? this.MethodDefinition(e, t)
					: (e.shorthand ||
							(e.computed
								? (t.write("["), this[e.key.type](e.key, t), t.write("]"))
								: this[e.key.type](e.key, t),
							t.write(": ")),
						this[e.value.type](e.value, t));
			},
			PropertyDefinition(e, t) {
				if (
					(e.static && t.write("static "),
					e.computed && t.write("["),
					this[e.key.type](e.key, t),
					e.computed && t.write("]"),
					e.value == null)
				) {
					e.key.type[0] !== "F" && t.write(";");
					return;
				}
				t.write(" = "), this[e.value.type](e.value, t), t.write(";");
			},
			ObjectPattern(e, t) {
				if ((t.write("{"), e.properties.length > 0)) {
					const { properties: i } = e,
						{ length: r } = i;
					for (let n = 0; this[i[n].type](i[n], t), ++n < r; ) t.write(", ");
				}
				t.write("}");
			},
			SequenceExpression(e, t) {
				Ce(t, e.expressions);
			},
			UnaryExpression(e, t) {
				if (e.prefix) {
					const {
						operator: i,
						argument: r,
						argument: { type: n },
					} = e;
					t.write(i);
					const a = In(t, r, e);
					!a &&
						(i.length > 1 ||
							(n[0] === "U" &&
								(n[1] === "n" || n[1] === "p") &&
								r.prefix &&
								r.operator[0] === i &&
								(i === "+" || i === "-"))) &&
						t.write(" "),
						a
							? (t.write(i.length > 1 ? " (" : "("),
								this[n](r, t),
								t.write(")"))
							: this[n](r, t);
				} else this[e.argument.type](e.argument, t), t.write(e.operator);
			},
			UpdateExpression(e, t) {
				e.prefix
					? (t.write(e.operator), this[e.argument.type](e.argument, t))
					: (this[e.argument.type](e.argument, t), t.write(e.operator));
			},
			AssignmentExpression(e, t) {
				this[e.left.type](e.left, t),
					t.write(" " + e.operator + " "),
					this[e.right.type](e.right, t);
			},
			AssignmentPattern(e, t) {
				this[e.left.type](e.left, t),
					t.write(" = "),
					this[e.right.type](e.right, t);
			},
			BinaryExpression: (Ln = (e, t) => {
				const i = e.operator === "in";
				i && t.write("("),
					pt(t, e.left, e, !1),
					t.write(" " + e.operator + " "),
					pt(t, e.right, e, !0),
					i && t.write(")");
			}),
			LogicalExpression: Ln,
			ConditionalExpression(e, t) {
				const { test: i } = e,
					r = t.expressionsPrecedence[i.type];
				r === ee || r <= t.expressionsPrecedence.ConditionalExpression
					? (t.write("("), this[i.type](i, t), t.write(")"))
					: this[i.type](i, t),
					t.write(" ? "),
					this[e.consequent.type](e.consequent, t),
					t.write(" : "),
					this[e.alternate.type](e.alternate, t);
			},
			NewExpression(e, t) {
				t.write("new ");
				const i = t.expressionsPrecedence[e.callee.type];
				i === ee || i < t.expressionsPrecedence.CallExpression || Bs(e.callee)
					? (t.write("("), this[e.callee.type](e.callee, t), t.write(")"))
					: this[e.callee.type](e.callee, t),
					Ce(t, e.arguments);
			},
			CallExpression(e, t) {
				const i = t.expressionsPrecedence[e.callee.type];
				i === ee || i < t.expressionsPrecedence.CallExpression
					? (t.write("("), this[e.callee.type](e.callee, t), t.write(")"))
					: this[e.callee.type](e.callee, t),
					e.optional && t.write("?."),
					Ce(t, e.arguments);
			},
			ChainExpression(e, t) {
				this[e.expression.type](e.expression, t);
			},
			MemberExpression(e, t) {
				const i = t.expressionsPrecedence[e.object.type];
				i === ee || i < t.expressionsPrecedence.MemberExpression
					? (t.write("("), this[e.object.type](e.object, t), t.write(")"))
					: this[e.object.type](e.object, t),
					e.computed
						? (e.optional && t.write("?."),
							t.write("["),
							this[e.property.type](e.property, t),
							t.write("]"))
						: (e.optional ? t.write("?.") : t.write("."),
							this[e.property.type](e.property, t));
			},
			MetaProperty(e, t) {
				t.write(e.meta.name + "." + e.property.name, e);
			},
			Identifier(e, t) {
				t.write(e.name, e);
			},
			PrivateIdentifier(e, t) {
				t.write(`#${e.name}`, e);
			},
			Literal(e, t) {
				e.raw != null
					? t.write(e.raw, e)
					: e.regex != null
						? this.RegExpLiteral(e, t)
						: e.bigint != null
							? t.write(e.bigint + "n", e)
							: t.write(Os(e.value), e);
			},
			RegExpLiteral(e, t) {
				const { regex: i } = e;
				t.write(`/${i.pattern}/${i.flags}`, e);
			},
		},
		js = {};
	var li = class {
		constructor(t) {
			const i = t ?? js;
			(this.output = ""),
				i.output != null
					? ((this.output = i.output), (this.write = this.writeToStream))
					: (this.output = ""),
				(this.generator = i.generator != null ? i.generator : $s),
				(this.expressionsPrecedence =
					i.expressionsPrecedence != null ? i.expressionsPrecedence : Vs),
				(this.indent = i.indent != null ? i.indent : "  "),
				(this.lineEnd =
					i.lineEnd != null
						? i.lineEnd
						: `
`),
				(this.indentLevel =
					i.startingIndentLevel != null ? i.startingIndentLevel : 0),
				(this.writeComments = i.comments ? i.comments : !1),
				i.sourceMap != null &&
					((this.write =
						i.output == null ? this.writeAndMap : this.writeToStreamAndMap),
					(this.sourceMap = i.sourceMap),
					(this.line = 1),
					(this.column = 0),
					(this.lineEndSize =
						this.lineEnd.split(`
`).length - 1),
					(this.mapping = {
						original: null,
						generated: this,
						name: void 0,
						source: i.sourceMap.file || i.sourceMap._file,
					}));
		}
		write(t) {
			this.output += t;
		}
		writeToStream(t) {
			this.output.write(t);
		}
		writeAndMap(t, i) {
			(this.output += t), this.map(t, i);
		}
		writeToStreamAndMap(t, i) {
			this.output.write(t), this.map(t, i);
		}
		map(t, i) {
			if (i != null) {
				const { type: a } = i;
				if (a[0] === "L" && a[2] === "n") {
					(this.column = 0), this.line++;
					return;
				}
				if (i.loc != null) {
					const { mapping: s } = this;
					(s.original = i.loc.start),
						(s.name = i.name),
						this.sourceMap.addMapping(s);
				}
				if (
					(a[0] === "T" && a[8] === "E") ||
					(a[0] === "L" && a[1] === "i" && typeof i.value == "string")
				) {
					let { length: s } = t,
						{ column: o, line: c } = this;
					for (let l = 0; l < s; l++)
						t[l] ===
						`
`
							? ((o = 0), c++)
							: o++;
					(this.column = o), (this.line = c);
					return;
				}
			}
			const { length: r } = t,
				{ lineEnd: n } = this;
			r > 0 &&
				(this.lineEndSize > 0 &&
				(n.length === 1 ? t[r - 1] === n : t.endsWith(n))
					? ((this.line += this.lineEndSize), (this.column = 0))
					: (this.column += r));
		}
		toString() {
			return this.output;
		}
	};
	function Tn(e, t) {
		const i = new li(t);
		return i.generator[e.type](e, i), i.output;
	}
	var hi = class {
			constructor(t) {
				this.mime = br;
				this.idb = Je;
				this.path = Us;
				this.acorn = { parse: dn };
				this.bare = { createBareClient: wn, BareClient: De };
				this.base64 = { encode: btoa, decode: atob };
				this.estree = { generate: Tn };
				this.cookie = Hs;
				this.setCookieParser = Nn.parse;
				this.ctx = t;
			}
		},
		Mn = hi;
	function pi(e, t, i, r, n = "", a = !1, s = "") {
		if (self.__dynamic$config)
			var o = self.__dynamic$config.mode == "development";
		else var o = !1;
		if (a) {
			var c = [
				{
					nodeName: "script",
					tagName: "script",
					namespaceURI: "http://www.w3.org/1999/xhtml",
					childNodes: [],
					attrs: [
						{
							name: "src",
							value:
								e + (o ? "?" + Math.floor(Math.random() * 89999 + 1e4) : ""),
						},
					],
				},
				{
					nodeName: "script",
					tagName: "script",
					namespaceURI: "http://www.w3.org/1999/xhtml",
					childNodes: [],
					attrs: [
						{
							name: "src",
							value:
								t + (o ? "?" + Math.floor(Math.random() * 89999 + 1e4) : ""),
						},
					],
				},
			];
			return (
				this.ctx.config.assets.files.inject &&
					c.unshift({
						nodeName: "script",
						tagName: "script",
						namespaceURI: "http://www.w3.org/1999/xhtml",
						childNodes: [],
						attrs: [
							{
								name: "src",
								value:
									this.ctx.config.assets.files.inject +
									(o
										? "?" + Math.floor(Math.random() * (99999 - 1e4) + 1e4)
										: ""),
							},
						],
					}),
				r &&
					c.unshift({
						nodeName: "script",
						tagName: "script",
						namespaceURI: "http://www.w3.org/1999/xhtml",
						childNodes: [],
						attrs: [
							{
								name: "src",
								value:
									"data:application/javascript;base64," +
									btoa(
										`self.__dynamic$cookies = atob("${btoa(r)}");document.currentScript?.remove();`,
									),
							},
						],
					}),
				n &&
					c.unshift({
						nodeName: "script",
						tagName: "script",
						namespaceURI: "http://www.w3.org/1999/xhtml",
						childNodes: [],
						attrs: [
							{
								name: "src",
								value:
									"data:application/javascript;base64," +
									btoa(n + ";document.currentScript?.remove();"),
							},
						],
					}),
				s &&
					c.unshift({
						nodeName: "script",
						tagName: "script",
						namespaceURI: "http://www.w3.org/1999/xhtml",
						childNodes: [],
						attrs: [
							{
								name: "src",
								value:
									"data:application/javascript;base64," +
									btoa(s + ";document.currentScript?.remove();"),
							},
						],
					}),
				c
			);
		} else {
			var l = [
				`<script src="${t + (o ? "?" + Math.floor(Math.random() * 89999 + 1e4) : "")}"><\/script>`,
				`<script src="${e + (o ? "?" + Math.floor(Math.random() * 89999 + 1e4) : "")}"><\/script>`,
			];
			return (
				this.ctx.config.assets.files.inject &&
					l.unshift(
						`<script src="${this.ctx.config.assets.files.inject + (o ? "?" + Math.floor(Math.random() * (99999 - 1e4) + 1e4) : "")}"><\/script>`,
					),
				r &&
					l.unshift(
						`<script src="${"data:application/javascript;base64," + btoa(`self.__dynamic$cookies = atob("${btoa(r)}");document.currentScript?.remove();`)}"><\/script>`,
					),
				n &&
					l.unshift(
						`<script src="${"data:application/javascript;base64," + btoa(n + ";document.currentScript?.remove();")}"><\/script>`,
					),
				s &&
					l.unshift(
						`<script src="${"data:application/javascript;base64," + btoa(s + ";document.currentScript?.remove();")}"><\/script>`,
					),
				l
			);
		}
	}
	var Ve = class {
		constructor(t) {
			this.generateHead = pi;
			this.config = [
				{ elements: "all", tags: ["style"], action: "css" },
				{
					elements: [
						"script",
						"iframe",
						"embed",
						"input",
						"track",
						"media",
						"source",
						"img",
						"a",
						"link",
						"area",
						"form",
						"object",
					],
					tags: ["src", "href", "action", "data"],
					action: "url",
				},
				{ elements: ["source", "img"], tags: ["srcset"], action: "srcset" },
				{
					elements: ["script", "link"],
					tags: ["integrity"],
					action: "rewrite",
					new: "nointegrity",
				},
				{
					elements: ["script", "link"],
					tags: ["nonce"],
					action: "rewrite",
					new: "nononce",
				},
				{ elements: ["meta"], tags: ["http-equiv"], action: "http-equiv" },
				{ elements: ["iframe"], tags: ["srcdoc"], action: "html" },
				{ elements: ["link"], tags: ["imagesrcset"], action: "srcset" },
				{ elements: "all", tags: ["onclick"], action: "js" },
			];
			this.ctx = t.ctx;
		}
		generateRedirect(t) {
			return `
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="${t}">here</A>.
</BODY></HTML>
    `;
		}
		iterate(t, i) {
			function r(n = t) {
				for (var a = 0; a < n.childNodes.length; a++)
					i(n.childNodes[a]),
						n.childNodes[a].childNodes &&
							n.childNodes[a].childNodes.length &&
							r(n.childNodes[a]);
			}
			r(t);
		}
		rewrite(t, i, r = []) {
			return (
				Array.isArray(t) && (t = t[0]),
				t &&
					((t = t.toString()),
					t.match(/<\!DOCTYPE[^>]*>/gi) || (t = "<!DOCTYPE html>" + t),
					t
						.replace(
							/(<!DOCTYPE html>|<html(.*?)>)/im,
							`$1${r.join("")}
`,
						)
						.replace(/<(script|link)\b[^>]*>/g, (n, a) =>
							n
								.replace(/\snonce\s*=\s*"[^"]*"/, (s) =>
									s.replace("nonce", "nononce"),
								)
								.replace(/\sintegrity\s*=\s*"[^"]*"/, (s) =>
									s.replace("integrity", "nointegrity"),
								),
						))
			);
		}
	};
	var Fe = class {
		constructor(t) {
			this.ctx = t.ctx;
		}
		rewrite(t, i, r = {}) {
			return (
				t &&
				t
					.toString()
					.replace(/(?:@import\s?|url\(?)['"]?(.*?)['")]/gim, (...n) => {
						try {
							return n[0].replace(n[3], this.ctx.url.encode(n[3], i));
						} catch {
							return n[0];
						}
					})
			);
		}
	};
	function fi(e, t) {
		if (typeof e != "object" || !t) return;
		i(e, null, t);
		function i(r, n, a) {
			if (!(typeof r != "object" || !a)) {
				(r.parent = n), a(r, n, a);
				for (const s in r)
					s !== "parent" &&
						(Array.isArray(r[s])
							? r[s].forEach((o) => {
									o && i(o, r, a);
								})
							: r[s] && i(r[s], r, a));
				typeof r.iterateEnd == "function" && r.iterateEnd();
			}
		}
	}
	function di(e, t = {}, i, r) {
		var n = this.ctx.modules.acorn.parse(e.toString(), {
			sourceType: t.module ? "module" : "script",
			allowImportExportEverywhere: !0,
			allowAwaitOutsideFunction: !0,
			allowReturnOutsideFunction: !0,
			ecmaVersion: "latest",
			preserveParens: !1,
			loose: !0,
			allowReserved: !0,
		});
		return (
			this.iterate(n, (a, s = null) => {
				this.emit(a, a.type, s, i, r, t);
			}),
			(e = this.ctx.modules.estree.generate(n)),
			e
		);
	}
	function mi(e, t = {}) {
		if (typeof e.name != "string") return !1;
		if (e.__dynamic !== !0) {
			if (
				![
					"parent",
					"top",
					"postMessage",
					"opener",
					"window",
					"self",
					"globalThis",
					"parent",
					"location",
				].includes(e.name)
			)
				return !1;
			if (
				!(t.type == "CallExpression" && t.callee == e) &&
				!(
					t.type == "MemberExpression" &&
					t.object !== e &&
					!["document", "window", "self", "globalThis"].includes(t.object.name)
				) &&
				t.type != "FunctionDeclaration" &&
				t.type != "VariableDeclaration" &&
				!(t.type == "VariableDeclarator" && t.id == e) &&
				t.type != "LabeledStatement" &&
				!(t.type == "Property" && t.key == e) &&
				!(t.type == "ArrowFunctionExpression" && t.params.includes(e)) &&
				!(t.type == "FunctionExpression" && t.params.includes(e)) &&
				!(t.type == "FunctionExpression" && t.id == e) &&
				!(t.type == "CatchClause" && t.param == e) &&
				t.type != "ContinueStatement" &&
				t.type != "BreakStatement" &&
				!(t.type == "AssignmentExpression" && t.left == e) &&
				t.type != "UpdateExpression" &&
				t.type != "UpdateExpression" &&
				!(t.type == "ForInStatement" && t.left == e) &&
				!(t.type == "MethodDefinition" && t.key == e) &&
				!(t.type == "AssignmentPattern" && t.left == e) &&
				t.type != "NewExpression" &&
				t?.parent?.type != "NewExpression" &&
				!(t.type == "UnaryExpression" && t.argument == e) &&
				!(t.type == "Property" && t.shorthand == !0 && t.value == e)
			) {
				if (e.name == "__dynamic") return (e.name = "undefined");
				if (e.name == "eval" && t.right !== e)
					return (e.name = "__dynamic$eval");
				e.name = `dg$(${e.name})`;
			}
		}
	}
	function ke(e, t = {}) {
		Object.entries({
			type: "CallExpression",
			callee: {
				type: "MemberExpression",
				object: { type: "Identifier", name: "self" },
				property: { type: "Identifier", name: "__dynamic$message" },
			},
			arguments: [
				e.object || e,
				{ type: "Identifier", name: "self", __dynamic: !0 },
			],
		}).forEach(([i, r]) => (e[i] = r));
	}
	function yi(e, t = {}, i = {}) {
		if (
			((e.object.name += ""), t.type !== "AssignmentExpression" && t.left !== e)
		) {
			if (
				e.property.value == "postMessage" &&
				t.type == "CallExpression" &&
				t.callee == e
			)
				return ke(e, t);
			if (
				e.object.value == "postMessage" &&
				t.type == "CallExpression" &&
				t.callee == e
			)
				return ke(e, t);
			if (
				(e.property.name == "postMessage" || e.object.name == "postMessage") &&
				e.object.type !== "Super"
			) {
				var r = e.object?.name;
				(e.type = "CallExpression"),
					(e.callee = { type: "Identifier", name: "__dynamic$message" }),
					(e.arguments = [
						{ type: "Identifier", name: r },
						{ type: "Identifier", name: "self", __dynamic: !0 },
					]),
					t.type == "CallExpression" && (t.arguments = t.arguments);
				return;
			}
		}
		if (
			(e.property.name == "eval" && (e.property.name = "__dynamic$eval"),
			e.object.name == "eval" && (e.object.name = "__dynamic$eval"),
			i.destination !== "worker" &&
				(e.property.name == "window" &&
					e.object.name != "top" &&
					(e.object.name == "self" || e.object.name == "globalThis") &&
					t.type !== "NewExpression" &&
					(t.type !== "CallExpression" ||
						(t.type == "CallExpression" && e !== t.callee)) &&
					(e.property.name = "__dynamic$window"),
				e.object.name == "top" &&
					t.type !== "NewExpression" &&
					(t.type !== "CallExpression" ||
						(t.type == "CallExpression" && e !== t.callee)) &&
					(e.object.name = "top.__dynamic$window"),
				e.property.name == "top" &&
					(e.object.name == "self" || e.object.name == "globalThis") &&
					t.type !== "NewExpression" &&
					(t.type !== "CallExpression" ||
						(t.type == "CallExpression" && e !== t.callee)) &&
					(e.property.name = "top.__dynamic$window"),
				t.type !== "NewExpression" &&
					(t.type !== "CallExpression" ||
						(t.type == "CallExpression" && e !== t.callee)) &&
					(e.object.name == "window" &&
						(e.object = {
							type: "CallExpression",
							callee: { type: "Identifier", name: "dg$" },
							arguments: [e.object],
							__dynamic: !0,
						}),
					e.object.name == "parent" &&
						(e.object = {
							type: "CallExpression",
							callee: { type: "Identifier", name: "dg$" },
							arguments: [e.object],
							__dynamic: !0,
						}),
					e.property.name == "__dynamic" && (e.property.name = "undefined"),
					e.object.name == "self" &&
						(e.object = {
							type: "CallExpression",
							callee: { type: "Identifier", name: "dg$" },
							arguments: [e.object],
							__dynamic: !0,
						}),
					e.object.name == "document" &&
						(e.object = {
							type: "CallExpression",
							callee: { type: "Identifier", name: "dg$" },
							arguments: [e.object],
							__dynamic: !0,
						}),
					e.object.name == "globalThis" &&
						(e.object = {
							type: "CallExpression",
							callee: { type: "Identifier", name: "dg$" },
							arguments: [e.object],
							__dynamic: !0,
						})),
				e.object.name == "location" &&
					(e.object = {
						type: "CallExpression",
						callee: { type: "Identifier", name: "dg$" },
						arguments: [e.object],
						__dynamic: !0,
					}),
				e.property.name == "location" &&
					t.type !== "BinaryExpression" &&
					t.type !== "AssignmentExpression"))
		) {
			(e.property.__dynamic = !0), (e.__dynamic = !0);
			const n = Object.assign({}, e);
			(e.type = "CallExpression"),
				(e.callee = { type: "Identifier", name: "dg$", __dynamic: !0 }),
				(e.arguments = [n]),
				(e.__dynamic = !0);
		}
		e.computed &&
			i.destination !== "worker" &&
			(e.property = {
				type: "CallExpression",
				callee: { type: "Identifier", name: "dp$" },
				arguments: [e.property],
				__dynamic: !0,
			});
	}
	function gi(e, t = {}) {
		if (
			!(e.value instanceof String) ||
			(e.value == "__dynamic" && (e.value = "undefined"),
			!["location", "parent", "top", "postMessage"].includes(e.value))
		)
			return !1;
		e.value == "postMessage" &&
			t.type != "AssignmentExpression" &&
			t.left != e &&
			ke(e, t),
			e.value == "location" && (e.value = "__dynamic$location"),
			e.value == "__dynamic" && (e.value = "undefined"),
			e.value == "eval" && (e.value = "__dynamic$eval");
	}
	function ft(e, t = {}) {
		e.__dynamic ||
			(e.arguments.length &&
				((e.arguments = [
					{
						type: "CallExpression",
						callee: {
							type: "Identifier",
							name: "__dynamic$wrapEval",
							__dynamic: !0,
						},
						arguments: e.arguments,
						__dynamic: !0,
					},
				]),
				(e.__dynamic = !0)));
	}
	function xi(e, t = {}) {
		if (!(t.type == "AssignmentExpression" && t.left == e)) {
			if (e.callee.type == "Identifier") {
				if (e.callee.name == "postMessage") {
					const i = "undefined";
					(e.callee.type = "CallExpression"),
						(e.callee.callee = {
							type: "Identifier",
							name: "__dynamic$message",
						}),
						(e.callee.arguments = [
							{ type: "Identifier", name: i },
							{ type: "Identifier", name: "self", __dynamic: !0 },
						]);
					return;
				}
				e.callee.name == "eval" && ft(e);
			}
			if (e.callee.type == "MemberExpression") {
				if (
					e.callee.property.name == "postMessage" &&
					e.callee.object.type !== "Super"
				) {
					const i = e.callee.object;
					(e.callee.type = "CallExpression"),
						(e.callee.callee = {
							type: "Identifier",
							name: "__dynamic$message",
						}),
						(e.callee.arguments = [
							i,
							{ type: "Identifier", name: "self", __dynamic: !0 },
						]);
					return;
				}
				e.callee.object.name == "eval" && ft(e);
			}
			e.arguments.length > 0 && e.arguments.length < 4;
			try {
			} catch {}
		}
	}
	function _i(e, t = {}) {
		if (e.left.type == "Identifier") {
			if (e.left.__dynamic === !0) return;
			if (e.left.name == "location") {
				var i = structuredClone(e.left),
					r = structuredClone(e.right);
				(e.right.type = "CallExpression"),
					(e.right.callee = { type: "Identifier", name: "ds$" }),
					(e.right.arguments = [i, r]);
			}
		}
	}
	function bi(e, t = {}) {
		e.parent.type != "ObjectPattern" &&
			e.parent?.parent?.type != "AssignmentExpression" &&
			(e.shorthand = !1);
	}
	function wi(e, t = {}, i = {}, r = {}) {
		if (
			e.type == "Literal" &&
			(t.type == "ImportDeclaration" ||
				t.type == "ExportNamedDeclaration" ||
				t.type == "ExportAllDeclaration")
		) {
			var n = e.value + "";
			(e.value = i.url.encode(e.value, r.meta)),
				(e.raw = e.raw.replace(n, e.value)),
				(e.__dynamic = !0);
		}
		e.type == "ImportExpression" &&
			((e.source = {
				type: "CallExpression",
				callee: { type: "Identifier", name: "__dynamic$import" },
				arguments: [
					e.source,
					{ type: "Literal", __dynamic: !0, value: i.meta.href },
				],
			}),
			(e.__dynamic = !0));
	}
	function vi(e, t = {}) {
		if (e.id.type !== "Identifier") return !1;
		e.id.__dynamic !== !0 && e.id.name != "location";
	}
	function Ws(e, t, i = {}, r = {}, n = {}, a = {}) {
		if (!e.__dynamic) {
			switch (t) {
				case "Identifier":
					mi(e, i);
					break;
				case "MemberExpression":
					yi(e, i, a);
					break;
				case "Literal":
					gi(e, i);
					break;
				case "CallExpression":
					xi(e, i);
					break;
				case "AssignmentExpression":
					_i(e, i);
					break;
				case "ThisExpression":
					break;
				case "Property":
					bi(e, i);
					break;
				case "VariableDeclarator":
					vi(e, i);
					break;
				case "CatchClause":
					break;
				default:
					break;
			}
			wi(e, i, r, n);
		}
	}
	var Dn = Ws;
	var Be = class {
		constructor(t) {
			this.iterate = fi;
			this.process = di;
			this.emit = Dn;
			this.ctx = t.ctx;
		}
		rewrite(t, i = {}, r = !0, n = {}) {
			if (
				!t ||
				t instanceof Object ||
				((t = t.toString()), t.includes("/* dynamic.js */"))
			)
				return t;
			t = `/* dynamic.js */ 

${t}`;
			try {
				try {
					t = this.process(t, i, { module: !0, ...this.ctx }, n);
				} catch {
					t = this.process(t, i, { module: !1, ...this.ctx }, n);
				}
			} catch {}
			return (
				r &&
					(t = `
      if (typeof self !== undefined && typeof self.importScripts == 'function' && typeof self.__dynamic == 'undefined') importScripts('/assets/-dy/config.js?v=6-17-2024', '/assets/-dy/handler.js?v=6-17-2024'+Math.floor(Math.random()*(99999-10000)+10000));

      ${t}`),
				t
			);
		}
	};
	var $e = class {
		constructor(t) {
			this.config = {
				rewrite: [
					["icons", "urlit"],
					["name", " - Dynamic"],
					["start_url", "url"],
					["scope", "url"],
					["short_name", " - Dynamic"],
					["shortcuts", "urlev"],
				],
				delete: ["serviceworker"],
			};
			this.ctx = t.ctx;
		}
		rewrite(t, i) {
			const r = JSON.parse(t);
			for (const o in this.config)
				if (o == "rewrite")
					for (var [n, a] of this.config[o]) {
						if (a == "urlit" && r[n]) {
							for (var s = 0; s < r[n].length; s++)
								r[n][s].src = this.ctx.url.encode(r[n][s].src, i);
							continue;
						}
						if (a == "urlev" && r[n]) {
							for (var s = 0; s < r[n].length; s++)
								r[n][s].url = this.ctx.url.encode(r[n][s].url, i);
							continue;
						}
						if (a == "url" && r[n]) {
							r[n] = this.ctx.url.encode(r[n], i);
							continue;
						}
						a == "url" || a == "urlit" || a == "urlev" || (r[n] = r[n] + a);
					}
				else if (o == "delete")
					for (var n of this.config[o]) r[n] && delete r[n];
			return JSON.stringify(r);
		}
	};
	var On = {
		encode(e, t) {
			return !e || !e.toString()
				? e
				: e
						.split(", ")
						.map((i) =>
							i
								.split(" ")
								.map((r, n) =>
									n == 0 ? t.url.encode(r, t.baseURL || t.meta) : r,
								)
								.join(" "),
						)
						.join(", ");
		},
		decode(e) {
			return e;
		},
	};
	var Si = class {
			constructor(t) {
				(this.ctx = t),
					(this.html = new Ve(this)),
					(this.srcset = On),
					(this.js = new Be(this)),
					(this.css = new Fe(this)),
					(this.man = new $e(this));
			}
		},
		Vn = Si;
	async function Fn(e) {
		var t;
		if (e.method === "GET") {
			var i = new URL(e.url);
			t = i.searchParams.get("url");
		} else if (e.method === "POST") {
			if (((t = (await e.formData()).get("url")), t === null)) {
				var i = new URL(e.url);
				t = i.searchParams.get("url");
			}
			if (!t)
				return new Response("Error: Invalid or Unfound url", { status: 400 });
		} else return new Response("Error: Invalid method", { status: 405 });
		return new Response("", {
			status: 301,
			headers: {
				location:
					location.origin +
					this.ctx.config.prefix +
					this.ctx.encoding.encode(t),
			},
		});
	}
	function Bn({ url: e }) {
		return !e
			.toString()
			.substr(location.origin.length, (this.ctx.config.prefix + "route").length)
			.startsWith(this.ctx.config.prefix + "route");
	}
	function Ei({ url: e }) {
		return !e
			.toString()
			.substr(location.origin.length, this.ctx.config.prefix.length)
			.startsWith(this.ctx.config.prefix);
	}
	async function Ci(e, t, i) {
		for (const n in e) {
			if (
				(this.ctx.headers.csp.indexOf(n.toLowerCase()) !== -1 && delete e[n],
				n.toLowerCase() == "location")
			) {
				e[n] = this.ctx.url.encode(e[n], t);
				continue;
			}
			if (n.toLowerCase() === "set-cookie") {
				Array.isArray(e[n])
					? (e[n] = e[n].map(
							(a) =>
								this.ctx.modules.setCookieParser(a, { decodeValues: !1 })[0],
						))
					: (e[n] = this.ctx.modules.setCookieParser(e[n], {
							decodeValues: !1,
						}));
				for await (var r of e[n])
					await i.set(
						t.host,
						this.ctx.modules.cookie.serialize(r.name, r.value, {
							...r,
							encode: (a) => a,
						}),
					);
				delete e[n];
				continue;
			}
		}
		return new Headers(e);
	}
	function ki(e, t, i, r) {
		let { referrer: n } = i;
		if (
			(["origin", "Origin", "host", "Host", "referer", "Referer"].forEach(
				(a) => {
					e[a] && delete e[a];
				},
			),
			(e.Origin = `${t.protocol}//${t.host}${t.port ? ":" + t.port : ""}`),
			(e.Host = t.host + (t.port ? ":" + t.port : "")),
			(e.Referer = t.href),
			i.referrerPolicy == "strict-origin-when-cross-origin" &&
				(e.Referer = `${t.protocol}//${t.host}/`),
			i.referrerPolicy == "origin" && t.origin && (n = t.origin + "/"),
			r)
		) {
			switch (i.credentials) {
				case "omit":
					break;
				case "same-origin":
					i.client &&
						t.origin == i.client.__dynamic$location.origin &&
						(e.Cookie = r),
						i.client || (e.Cookie = r);
					break;
				case "include":
					e.Cookie = r;
					break;
				default:
					break;
			}
			e.Cookie = r;
		}
		if (n && n != location.origin + "/")
			try {
				(e.Referer = this.ctx.url.decode(n)),
					i.referrerPolicy == "strict-origin-when-cross-origin" &&
						(e.Referer = new URL(this.ctx.url.decode(n)).origin),
					(e.Origin = new URL(this.ctx.url.decode(n)).origin);
			} catch {}
		return (
			i.client &&
				((e.Origin = i.client.__dynamic$location.origin),
				(e.Referer = i.client.__dynamic$location.href),
				i.referrerPolicy == "strict-origin-when-cross-origin" &&
					(e.Referer = i.client.__dynamic$location.origin)),
			this.ctx.config.tab &&
				this.ctx.config.tab.ua &&
				(delete e["user-agent"],
				delete e["User-Agent"],
				(e["user-agent"] = this.ctx.config.tab.ua)),
			(e["sec-fetch-dest"] = i.destination || "empty"),
			(e["sec-fetch-mode"] = i.mode || "cors"),
			(e["sec-fetch-site"] = i.client
				? i.client.__dynamic$location.origin == t.origin
					? i.client.__dynamic$location.port == t.port
						? "same-origin"
						: "same-site"
					: "cross-origin"
				: "none"),
			i.mode == "navigate" && (e["sec-fetch-site"] = "same-origin"),
			(e["sec-fetch-user"] = "?1"),
			new Headers(e)
		);
	}
	function Ai(e) {
		var t = Object.assign(Object.create(Object.getPrototypeOf(e)), e);
		return t;
	}
	function Li(e) {
		try {
			if (
				(new new Proxy(e, { construct: () => ({}) })(),
				!Object.getOwnPropertyNames(e).includes("arguments"))
			)
				throw new Error("");
			return !0;
		} catch {
			return !1;
		}
	}
	function Pi(e) {
		return e.url
			.toString()
			.substr(location.origin.length, e.url.toString().length)
			.startsWith(self.__dynamic$config.assets.prefix);
	}
	async function Ri(e) {
		let t;
		if (self.__dynamic$config.mode !== "development") {
			var i = await caches.open("__dynamic$files");
			i
				? (t = (await i.match(e.url)) || (await fetch(e)))
				: (t = await fetch(e));
		} else t = await fetch(e);
		let r = await t.blob();
		return (
			(e.url.startsWith(location.origin + "/assets/-dy/config.js?v=6-17-2024") ||
				e.url.startsWith(
					location.origin + "/assets/-dy/client.js?v=6-17-2024",
				)) &&
				(r = new Blob(
					[
						`${await r.text()}
self.document?.currentScript?.remove();`,
					],
					{ type: "application/javascript" },
				)),
			new Response(r, {
				headers: t.headers,
				status: t.status,
				statusText: t.statusText,
			})
		);
	}
	async function Ii(e, t) {}
	var je = class {
		constructor(t) {
			this.rawHeaders = {};
			this.headers = new Headers({});
			this.status = 200;
			this.statusText = "OK";
			this.body = t;
		}
		async blob() {
			return this.body;
		}
		async text() {
			return await this.body.text();
		}
	};
	function Ti(e) {
		var t = this.ctx.encoding;
		return (
			typeof this.ctx.config.encoding == "object"
				? (t = { ...t, ...this.ctx.encoding })
				: (t = { ...this.ctx.encoding[this.ctx.config.encoding] }),
			(this.ctx.encoding = { ...this.ctx.encoding, ...t }),
			this.ctx.encoding
		);
	}
	function Ni(e, t, i) {
		if (!e.url.startsWith("http")) return e.url;
		let r = e.url.toString();
		return (
			e.url.startsWith(location.origin) &&
				(r = r.substr(self.location.origin.length)),
			(r = new URL(r, new URL(t.__dynamic$location.href)).href),
			this.ctx.url.encode(r, i)
		);
	}
	var Mi = class {
			constructor(t) {
				this.route = Fn;
				this.routePath = Bn;
				this.path = Ei;
				this.resHeader = Ci;
				this.reqHeader = ki;
				this.clone = Ai;
				this.class = Li;
				this.file = Pi;
				this.edit = Ri;
				this.error = Ii;
				this.encode = Ti;
				this.rewritePath = Ni;
				this.about = je;
				this.ctx = t;
			}
		},
		$n = Mi;
	function Di(e, t) {
		if (!e) return e;
		if (((e = new String(e).toString()), e.startsWith("about:blank")))
			return location.origin + this.ctx.config.prefix + e;
		if (
			(!e.match(this.ctx.regex.ProtocolRegex) &&
				e.match(/^([a-zA-Z0-9\-]+)\:\/\//g)) ||
			e.startsWith("chrome-extension://")
		)
			return e;
		if (
			e.startsWith("javascript:") &&
			!e.startsWith("javascript:__dynamic$eval")
		) {
			const c = new URL(e);
			return `javascript:__dynamic$eval(${JSON.stringify(c.pathname)})`;
		}
		if (e.match(this.ctx.regex.WeirdRegex)) {
			var i = this.ctx.regex.WeirdRegex.exec(e);
			i && (e = i[2]);
		}
		if (
			e.startsWith(location.origin + this.ctx.config.prefix) ||
			e.startsWith(this.ctx.config.prefix) ||
			e.startsWith(
				location.origin + this.ctx.config.assets.prefix + "dynamic.",
			) ||
			e.match(this.ctx.regex.BypassRegex)
		)
			return e;
		if (e.match(this.ctx.regex.DataRegex)) {
			try {
				var i = this.ctx.regex.DataRegex.exec(e);
				if (i) {
					var [r, n, a, s, o] = i;
					s == "base64"
						? (o = this.ctx.modules.base64.atob(decodeURIComponent(o)))
						: (o = decodeURIComponent(o)),
						n &&
							(n == "text/html"
								? (o = this.ctx.rewrite.html.rewrite(
										o,
										t,
										this.ctx.rewrite.html.generateHead(
											location.origin + "/assets/-dy/client.js?v=6-17-2024",
											location.origin + "/assets/-dy/config.js?v=6-17-2024",
											"",
											`window.__dynamic$url = "${t.href}"; window.__dynamic$parentURL = "${location.href}";`,
										),
									))
								: n == "text/css"
									? (o = this.ctx.rewrite.css.rewrite(o, t))
									: (n == "text/javascript" || n == "application/javascript") &&
										(o = this.ctx.rewrite.js.rewrite(o, t))),
						s == "base64"
							? (o = this.ctx.modules.base64.btoa(o))
							: (o = encodeURIComponent(o)),
						a
							? s
								? (e = `data:${n};${a};${s},${o}`)
								: (e = `data:${n};${a},${o}`)
							: s
								? (e = `data:${n};${s},${o}`)
								: (e = `data:${n},${o}`);
				}
			} catch {}
			return e;
		}
		return (
			(e = new String(e).toString()),
			t.href.match(this.ctx.regex.BypassRegex) &&
				(e = new URL(
					e,
					new URL((this.ctx.parent.__dynamic || this.ctx).meta.href),
				).href),
			(e = new URL(e, t.href)),
			(this.ctx._location?.origin ||
				(location.origin == "null"
					? location.ancestorOrigins[0]
					: location.origin)) +
				this.ctx.config.prefix +
				(this.ctx.encoding.encode(e.origin + e.pathname) + e.search + e.hash)
		);
	}
	function Oi(e) {
		if (
			!e ||
			((e = new String(e).toString()), e.match(this.ctx.regex.BypassRegex))
		)
			return e;
		var t = e.indexOf(this.ctx.config.prefix);
		if (t == -1) return e;
		try {
			if (
				((e = new URL(e, new URL(self.location.origin)).href),
				(t = e.indexOf(this.ctx.config.prefix)),
				e.slice(t + this.ctx.config.prefix.length).trim() == "about:blank")
			)
				return "about:blank";
			var i = new URL(e).search + new URL(e).hash || "",
				r = new URL(
					this.ctx.encoding.decode(
						e
							.slice(t + this.ctx.config.prefix.length)
							.replace("https://", "https:/")
							.replace("https:/", "https://")
							.split("?")[0],
					),
				);
		} catch {
			return e;
		}
		return (
			(e =
				r.origin +
				r.pathname +
				i +
				(new URL(e).search ? r.search.replace("?", "&") : r.search)),
			e
		);
	}
	var Vi = class {
			constructor(t) {
				this.encode = Di;
				this.decode = Oi;
				this.ctx = t;
			}
		},
		jn = Vi;
	var qs = /^(#|about:|mailto:|blob:|javascript:)/g,
		Gs =
			/^data:([a-z\/A-Z0-9\-\+]+);?(charset\=[\-A-Za-z0-9]+)?;?(base64)?[;,]*(.*)/g,
		zs = /^([\/A-Za-z0-9\-%]+)(http[s]?:\/\/.*)/g,
		Ue = class {
			constructor(t) {
				this.BypassRegex = qs;
				this.DataRegex = Gs;
				this.WeirdRegex = zs;
				this.ctx = t;
			}
		};
	function Fi(e) {
		e = new URL(e.href);
		for (var t in e) this.ctx.meta[t] = e[t];
		return !0;
	}
	var He = class {
		constructor() {}
	};
	var Bi = class extends He {
			constructor(i) {
				super();
				this.load = Fi;
				this.ctx = i;
			}
		},
		Un = Bi;
	var Hn = {
		csp: [
			"cross-origin-embedder-policy",
			"cross-origin-opener-policy",
			"cross-origin-resource-policy",
			"content-security-policy",
			"content-security-policy-report-only",
			"expect-ct",
			"feature-policy",
			"origin-isolation",
			"strict-transport-security",
			"upgrade-insecure-requests",
			"x-content-type-options",
			"x-frame-options",
			"x-permitted-cross-domain-policies",
			"x-xss-protection",
		],
		status: { empty: [204, 101, 205, 304] },
		method: { body: ["GET", "HEAD"] },
	};
	function $i(e, t = "") {
		return (
			(this.ctx.modules.mime.contentType(t || e.pathname) || "text/css").split(
				";",
			)[0] === "text/css"
		);
	}
	function ji(e, t = "", i = "") {
		let r;
		return !t && this.ctx.modules.mime.contentType(e.pathname) == e.pathname
			? i.trim().match(/<(html|script|body)[^>]*>/g) &&
					((r = i
						.trim()
						.indexOf((i.trim().match(/<(html|script|body)[^>]*>/g) || [])[0])),
					r > -1 && r < 100)
			: (
					this.ctx.modules.mime.contentType(t || e.pathname) || "text/html"
				).split(";")[0] === "text/html" ||
					i.trim().match(/\<\!(doctype|DOCTYPE) html\>/g);
	}
	function Ui(e, t = "") {
		if (e.pathname.endsWith(".js") && t == "text/plain") return !0;
		var i = (
			this.ctx.modules.mime.contentType(t || e.pathname) ||
			"application/javascript"
		).split(";")[0];
		return (
			i == "text/javascript" ||
			i == "application/javascript" ||
			i == "application/x-javascript"
		);
	}
	var Hi = class {
			constructor(t) {
				this.html = ji;
				this.js = Ui;
				this.css = $i;
				this.ctx = t;
			}
		},
		Wn = Hi;
	function dt(e, t = !0) {
		const i = (l) => {
				const h = e.__dynamic.util.clone(l);
				for (var f = 0; f < l.length; f++)
					e.__dynamic.define(h, f, {
						value: (e.top.__dynamic$location || e.__dynamic$location).origin,
						configurable: !0,
						enumerable: !0,
						writable: !1,
					});
				return (
					e.__dynamic.define(h, "length", {
						value: l.length,
						configurable: !0,
						enumerable: !0,
						writable: !1,
					}),
					h
				);
			},
			r = e.location.ancestorOrigins || [],
			n = [e.Window, e.Location, e.WorkerLocation, e.Document].filter((l) => l);
		[...n, e.Object].forEach((l) => {
			delete l.prototype.__dynamic$location;
		});
		const a = {
				get() {
					return e.__dynamic.location;
				},
				set(l) {
					if (l instanceof e.Location) return (e.__dynamic.location = l);
					e.__dynamic.location.href = l;
				},
				configurable: !0,
			},
			s = [
				"href",
				"host",
				"hash",
				"origin",
				"hostname",
				"port",
				"pathname",
				"protocol",
				"search",
			],
			o = ["assign", "replace", "toString", "reload"];
		try {
			var c = new URL(
				e.__dynamic$url ||
					e.__dynamic.url.decode(
						e.location.pathname + e.location.search + e.location.hash,
					),
			);
		} catch {
			e.__dynamic$url = "about:blank";
			var c = new URL("about:blank");
		}
		return (
			(e.__dynamic.property = c),
			e.__dynamic.meta.load(c),
			(e.__dynamic.location = e.__dynamic.util.clone(e.location)),
			s.forEach((l) => {
				e.__dynamic.define(e.__dynamic.location, l, {
					get: () =>
						(l == "search" &&
							e.location[l] +
								(e.location.search ? c.search.replace("?", "&") : c.search)) ||
						(l == "hash" ? location[l] : c[l]),
					set: (h) => {
						l === "href"
							? (e.location[l] = e.__dynamic.url.encode(
									e.__dynamic.meta.href.replace(c[l], h),
									c,
								))
							: (e.location[l] = h.toString());
					},
				});
			}),
			e.__dynamic.define(e.Object.prototype, "__dynamic$location", {
				get() {
					return this === e ||
						this === e.__dynamic$window ||
						this === e.document ||
						this === e.__dynamic$document
						? this.__dynamic?.location
						: this.location;
				},
				set(l) {
					return this === e ||
						this === e.__dynamic$window ||
						this === e.document ||
						this === e.__dynamic$document
						? (this.__dynamic.location.href = l)
						: (this.location = l);
				},
				configurable: !0,
			}),
			o.forEach((l) => {
				e.__dynamic.define(e.__dynamic.location, l, {
					get: () =>
						l == "toString"
							? () => c.href
							: new e.__dynamic.Function(
									"arg",
									`return window.location.${l}(arg?${l !== "reload" && l !== "toString" ? "(self.__dynamic).url.encode(arg, new URL('" + c.href + "'))" : "arg"}:null)`,
								),
					set: () => null,
				});
			}),
			r.length &&
				e.__dynamic.define(e.__dynamic.location, "ancestorOrigins", {
					get: () => i(r),
					set: () => null,
				}),
			n.forEach((l) => {
				e.__dynamic.define(l.prototype, "__dynamic$location", a);
			}),
			e.__dynamic.hashchange ||
				(e.__dynamic.hashchange =
					(e.addEventListener("hashchange", (l) => {}), !0)),
			e.__dynamic.location
		);
	}
	function mt(e) {
		(e.__dynamic$get = (t) => {
			var i = e.__dynamic.fire("get", [t]);
			if (i) return i;
			try {
				return t == e.parent
					? e.parent.__dynamic$window
					: t == e.top
						? e.top.__dynamic$window
						: t == e.location ||
								((e.Location || e.WorkerLocation) &&
									t instanceof (e.Location || e.WorkerLocation))
							? e.__dynamic$location
							: e.Document && t instanceof e.Document
								? e.__dynamic$document
								: t == e
									? e.__dynamic$window
									: typeof t == "function" && t.name == "__d$Send"
										? e.__dynamic$message(t.target, e)
										: t;
			} catch {
				return t;
			}
		}),
			(e.__dynamic$property = (t) => typeof t != "string"
					? t
					: t == "location"
						? "__dynamic$location"
						: t == "eval"
							? "__dynamic$eval"
							: t),
			(e.__dynamic$set = (t, i) => t
					? e.__dynamic.url.encode(
							e.__dynamic.meta.href.replace(e.__dynamic.property.href, i),
							e.__dynamic.property,
						)
					: i),
			(e.__dynamic$var = (t, i) => (window[i] = t)),
			(e.dg$ = e.__dynamic$get),
			(e.ds$ = e.__dynamic$set),
			(e.dp$ = e.__dynamic$property),
			(e.dv$ = e.__dynamic$var),
			(e.d$g_ = e.__dynamic$get),
			(e.d$s_ = e.__dynamic$set),
			(e.d$p_ = e.__dynamic$property),
			(e.d$v_ = e.__dynamic$var);
	}
	function yt(e) {
		(e.__dynamic.util.CreateDocumentProxy = (i) => new Proxy(i, {
				get(r, n) {
					const a = r[n];
					return n == "location"
						? i.defaultView
							? i.defaultView.__dynamic$location
							: e.__dynamic$location
						: (n == "documentURI" && i.defaultView) ||
								(n == "baseURI" && i.defaultView)
							? i.defaultView.__dynamic.location.toString()
							: a &&
								(typeof a == "function" && a.toString == e.Object.toString
									? new Proxy(a, {
											apply(s, o, c) {
												return (
													((i.defaultView &&
														c[0] == i.defaultView.__dynamic$document) ||
														c[0] == e.__dynamic$document) &&
														(c[0] = i),
													a.apply(i, c)
												);
											},
										})
									: a);
				},
				set(r, n, a) {
					try {
						try {
							i.defaultView.__dynamic
								? i.defaultView.__dynamic.Reflect.set(r, n, a)
								: (r[n] = a);
						} catch {
							return a || r[n] || !0;
						}
						return a || r[n] || !0;
					} catch {
						return a || r[n] || !0;
					}
				},
			})),
			(e.__dynamic.util.CreateWindowProxy = (i) => new Proxy(i, {
					get(r, n) {
						const a = e.__dynamic.Reflect.get(r, n);
						if (Object.getOwnPropertyDescriptor(r, n)) {
							var s = Object.getOwnPropertyDescriptor(r, n);
							if (
								s?.configurable === !1 &&
								s?.writable === !1 &&
								s?.hasOwnProperty("enumerable")
							)
								return s?.value || s?.get?.call(r);
						}
						return n == "__dynamic$self"
							? i.window
							: n == "location"
								? i.__dynamic$location
								: n == "parent"
									? i.parent.__dynamic$window || i.parent
									: n == "top"
										? i.top.__dynamic
											? i.top.__dynamic$window
											: i.parent.__dynamic$window
										: n == "self" || n == "globalThis"
											? i.__dynamic$window
											: a &&
												(typeof a == "function" &&
												a.toString == e.Object.toString
													? new Proxy(a, {
															apply(o, c, l) {
																return Reflect.apply(o, i, l);
															},
														})
													: a);
					},
					set(r, n, a) {
						try {
							var s = Object.getOwnPropertyDescriptor(r, n);
							if (s?.writable === !1 && s?.enumerable === !1) return !1;
							if (n.constructor == e.Symbol) return Reflect.set(r, n, a), r[n];
							if (r.hasOwnProperty("undefined") && r[n] + "" == n)
								return r[n] || a || !0;
							if (n == "location") return (i.__dynamic$location = a);
							if (
								r.hasOwnProperty(n) &&
								!r.propertyIsEnumerable(n) &&
								!s?.writable
							)
								return r[n];
							try {
								i.__dynamic ? i.__dynamic.Reflect.set(r, n, a) : (r[n] = a);
							} catch {
								return r[n] || !0;
							}
							return r[n] || !0;
						} catch {
							return r[n] || !0;
						}
					},
				})),
			e.__dynamic.define(e, "__dynamic$window", {
				value: e.__dynamic.util.CreateWindowProxy(e),
				configurable: !1,
				enumerable: !1,
				writable: !1,
			}),
			e.document &&
				e.__dynamic.define(e, "__dynamic$document", {
					value: e.__dynamic.util.CreateDocumentProxy(e.document),
					configurable: !1,
					enumerable: !1,
					writable: !1,
				}),
			(e.__dynamic$globalThis = e.__dynamic$window),
			(e.__dynamic$self = e.__dynamic$window);
	}
	function Wi(e) {
		e.__dynamic.rewrite.dom = (t, i) => {
			if (typeof e.DOMParser > "u" || !t) return t;
			var r = new e.DOMParser(),
				n = r.parseFromString(t.toString(), "text/html"),
				a = n.documentElement;
			return (
				a.querySelectorAll("script").forEach((s) => {
					!s.type ||
					(s.type &&
						s.type !== "text/javascript" &&
						s.type !== "application/javascript" &&
						s.type !== "application/x-javascript")
						? s.src &&
							(s.src = e.__dynamic.url.encode(s.getAttribute("src"), i))
						: s.innerHTML &&
							(s.innerHTML = e.__dynamic.js.encode(
								s.innerHTML,
								{ type: "script" },
								i,
								{},
							));
				}),
				a.querySelectorAll("link").forEach((s) => {
					s.href &&
						s.getAttribute("rel") !== "stylesheet" &&
						(s.href = e.__dynamic.url.encode(s.getAttribute("href"), i));
				}),
				a.querySelectorAll("img").forEach((s) => {
					s.src && (s.src = e.__dynamic.url.encode(s.getAttribute("src"), i)),
						s.srcset &&
							(s.srcset = e.__dynamic.rewrite.srcset.encode(
								s.getAttribute("srcset"),
								e.__dynamic,
							));
				}),
				a.querySelectorAll("a").forEach((s) => {
					s.href &&
						(s.href = e.__dynamic.url.encode(s.getAttribute("href"), i));
				}),
				a.querySelectorAll("style").forEach((s) => {
					s.innerHTML &&
						(s.innerHTML = e.__dynamic.rewrite.css.rewrite(s.innerHTML, i));
				}),
				a.outerHTML
			);
		};
	}
	function qi(e) {
		const t = (r) =>
			new DOMParser().parseFromString(r, "text/html").body.innerHTML;
		if (
			(e.__dynamic.elements.config.forEach((r) => {
				r.elements.forEach((n) => {
					r.tags.forEach((a) => {
						var s = Object.getOwnPropertyDescriptor(n.prototype, a);
						s ||
							(s = Object.getOwnPropertyDescriptor(HTMLElement.prototype, a)),
							typeof n.prototype.setAttribute.__dynamic$target > "u" &&
								((n.prototype.setAttribute = e.__dynamic.wrap(
									n.prototype.setAttribute,
									function (o, ...c) {
										return this instanceof HTMLLinkElement &&
											e.__dynamic$icon &&
											c[0].toLowerCase() == "href" &&
											(this.rel == "icon" || this.rel == "shortcut icon")
											? ((c[1] = e.__dynamic$icon), Reflect.apply(o, this, c))
											: e.__dynamic.elements.attributes.indexOf(
														c[0].toLowerCase(),
													) == -1
												? Reflect.apply(o, this, c)
												: c[0].toLowerCase() == "srcset" ||
														c[0].toLowerCase() == "imagesrcset"
													? ((this.dataset[`dynamic_${c[0]}`] = c[1]),
														(c[1] = e.__dynamic.rewrite.srcset.encode(
															c[1],
															e.__dynamic,
														)),
														Reflect.apply(o, this, c))
													: c[0].toLowerCase() == "integrity" ||
															c[0].toLowerCase() == "nonce"
														? ((this.dataset[`dynamic_${c[0]}`] = c[1]),
															this.removeAttribute(c[0]),
															Reflect.apply(o, this, ["nointegrity", c[1]]))
														: ((this.dataset[`dynamic_${c[0]}`] = c[1]),
															(c[1] = e.__dynamic.url.encode(
																c[1],
																e.__dynamic.baseURL || e.__dynamic.meta,
															)),
															Reflect.apply(o, this, c));
									},
									"setAttribute",
								)),
								(n.prototype.setAttributeNS = e.__dynamic.wrap(
									n.prototype.setAttributeNS,
									function (o, ...c) {
										return this instanceof HTMLLinkElement &&
											e.__dynamic$icon &&
											c[1].toLowerCase() == "href" &&
											(this.rel == "icon" || this.rel == "shortcut icon")
											? ((c[2] = e.__dynamic$icon), Reflect.apply(o, this, c))
											: e.__dynamic.elements.attributes.indexOf(
														c[1].toLowerCase(),
													) == -1
												? Reflect.apply(o, this, c)
												: c[1].toLowerCase() == "srcset" ||
														c[1].toLowerCase() == "imagesrcset"
													? ((this.dataset[`dynamic_${c[1]}`] = c[2]),
														(c[2] = e.__dynamic.rewrite.srcset.encode(
															c[2],
															e.__dynamic,
														)),
														Reflect.apply(o, this, c))
													: c[1].toLowerCase() == "integrity" ||
															c[1].toLowerCase() == "nonce"
														? ((this.dataset[`dynamic_${c[1]}`] = c[2]),
															this.removeAttribute(c[1]),
															Reflect.apply(o, this, ["nointegrity", c[2]]))
														: ((this.dataset[`dynamic_${c[1]}`] = c[2]),
															(c[2] = e.__dynamic.url.encode(
																c[2],
																e.__dynamic.baseURL || e.__dynamic.meta,
															)),
															Reflect.apply(o, this, c));
									},
									"setAttributeNS",
								)),
								(n.prototype.getAttribute = e.__dynamic.wrap(
									n.prototype.getAttribute,
									function (o, ...c) {
										return this.dataset[`dynamic_${c[0]}`]
											? this.dataset[`dynamic_${c[0]}`]
											: Reflect.apply(o, this, c);
									},
									"getAttribute",
								)),
								(n.prototype.getAttributeNS = e.__dynamic.wrap(
									n.prototype.getAttributeNS,
									function (o, ...c) {
										return this.dataset[`dynamic_${c[1]}`]
											? this.dataset[`dynamic_${c[1]}`]
											: Reflect.apply(o, this, c);
									},
									"getAttributeNS",
								))),
							e.__dynamic.define(n.prototype, a, {
								get() {
									if (r.action == "window") {
										let o = e.__dynamic.elements.contentWindow.get.call(this),
											c = !0;
										try {
											o.location.href;
										} catch {
											c = !1;
										}
										if (
											(c &&
												(o.__dynamic ||
													e.__dynamic.elements.client(
														o,
														e.__dynamic$config,
														decodeURIComponent(this.src),
													)),
											a == "contentDocument")
										)
											return o.document;
										if (a == "contentWindow")
											return (c && o.__dynamic$window) || o;
									}
									if (r.action == "css") return s.get.call(this);
									try {
										return e.__dynamic.url.decode(s.get.call(this));
									} catch {}
									return s.get.call(this);
								},
								set(o) {
									return (
										o && typeof o == "string" && (o = o.toString()),
										a == "href" &&
											this instanceof HTMLLinkElement &&
											e.__dynamic$icon &&
											(this.rel == "icon" || this.rel == "shortcut icon") &&
											((this.dataset[`dynamic_${a}`] = o),
											(o = e.__dynamic$icon)),
										r.action == "html"
											? (Promise.resolve(
													e.__dynamic.createBlobHandler(
														new Blob([o], { type: "text/html" }),
														this,
														o,
													),
												).then((c) => {
													this.setAttribute(a, c);
												}),
												o)
											: (r.action == "srcset" &&
													(o = e.__dynamic.rewrite.srcset.encode(
														o,
														e.__dynamic,
													)),
												r.action == "rewrite"
													? ((this.dataset[`dynamic_${a}`] = o),
														this.removeAttribute(a),
														this.setAttribute(r.new, o))
													: (r.action == "css" &&
															(o = e.__dynamic.rewrite.css.rewrite(
																o,
																e.__dynamic.meta,
															)),
														r.action == "url" &&
															(o = e.__dynamic.url.encode(
																o,
																e.__dynamic.baseURL || e.__dynamic.meta,
															)),
														(this.dataset[`dynamic_${a}`] = o),
														s.set.call(this, o)))
									);
								},
							});
					});
				});
			}),
			["innerHTML", "outerHTML"].forEach((r) => {
				e.__dynamic.define(e.HTMLElement.prototype, r, {
					get() {
						return (
							this["__" + r] || e.__dynamic.elements[r].get.call(this)
						).toString();
					},
					set(n) {
						return (
							(this["__" + r] = t(n)),
							this instanceof e.HTMLTextAreaElement
								? e.__dynamic.elements[r].set.call(this, n)
								: this instanceof e.HTMLScriptElement
									? e.__dynamic.elements[r].set.call(
											this,
											e.__dynamic.rewrite.js.rewrite(n, { type: "script" }),
										)
									: this instanceof e.HTMLStyleElement
										? e.__dynamic.elements[r].set.call(
												this,
												e.__dynamic.rewrite.css.rewrite(n, e.__dynamic.meta),
											)
										: e.__dynamic.elements[r].set.call(
												this,
												e.__dynamic.rewrite.dom(n, e.__dynamic.meta),
											)
						);
					},
				});
			}),
			["MutationObserver", "ResizeObserver", "IntersectionObserver"].forEach(
				(r) => {
					e[r].prototype.observe = e.__dynamic.wrap(
						e[r].prototype.observe,
						function (n, ...a) {
							return (
								a[0] == e.__dynamic$document && (a[0] = e.document),
								Reflect.apply(n, this, a)
							);
						},
						r + ".prototype.observe",
					);
				},
			),
			e.__dynamic.defines(e.HTMLAnchorElement.prototype, {
				pathname: e.__dynamic.elements.createGetter("pathname"),
				origin: e.__dynamic.elements.createGetter("origin"),
				host: e.__dynamic.elements.createGetter("host"),
				hostname: e.__dynamic.elements.createGetter("hostname"),
				port: e.__dynamic.elements.createGetter("port"),
				protocol: e.__dynamic.elements.createGetter("protocol"),
				search: e.__dynamic.elements.createGetter("search"),
				hash: e.__dynamic.elements.createGetter("hash"),
				toString: {
					get: function () {
						return (
							this.__toString ||
							(() => (this.href ? new URL(this.href).toString() : ""))
						);
					},
					set: function (r) {
						this.__toString = r;
					},
				},
			}),
			(e.HTMLElement.prototype.insertAdjacentHTML = e.__dynamic.wrap(
				e.HTMLElement.prototype.insertAdjacentHTML,
				function (r, ...n) {
					return this instanceof e.HTMLStyleElement
						? Reflect.apply(r, this, [
								n[0],
								e.__dynamic.rewrite.css.rewrite(n[1], e.__dynamic.meta),
							])
						: this instanceof e.HTMLScriptElement
							? Reflect.apply(r, this, [
									n[0],
									e.__dynamic.rewrite.js.rewrite(
										n[1],
										{ type: "script" },
										!1,
										e.__dynamic,
									),
								])
							: this instanceof e.HTMLTextAreaElement
								? Reflect.apply(r, this, n)
								: Reflect.apply(r, this, [
										n[0],
										e.__dynamic.rewrite.html.rewrite(n[1], e.__dynamic.meta),
									]);
				},
				"insertAdjacentHTML",
			)),
			[
				[e.Node, "textContent"],
				[e.HTMLElement, "innerText"],
			].forEach(([r, n]) => {
				var a = Object.getOwnPropertyDescriptor(r.prototype, n);
				function s() {
					return this["__" + n] || (a?.get && a.get.call(this));
				}
				e.__dynamic.define(e.HTMLStyleElement.prototype, n, {
					get: s,
					set(o) {
						return (
							(this["__" + n] = o),
							a?.set &&
								a.set.call(
									this,
									e.__dynamic.rewrite.css.rewrite(o, e.__dynamic.meta),
								)
						);
					},
				}),
					e.__dynamic.define(e.HTMLScriptElement.prototype, n, {
						get: s,
						set(o) {
							return (
								(this["__" + n] = o),
								this.type !== null ||
								this.type !== "application/javascript" ||
								this.type !== "text/javascript" ||
								this.type !== "application/x-javascript"
									? a?.set && a.set.call(this, o)
									: a?.set &&
										a.set.call(
											this,
											e.__dynamic.rewrite.js.rewrite(
												o,
												{ type: "script" },
												!1,
												e.__dynamic,
											),
										)
							);
						},
					});
			}),
			(e.Text.prototype.toString = function () {
				return this.textContent;
			}),
			(e.document.createElement = e.__dynamic.wrap(
				e.document.createElement,
				function (r, ...n) {
					var a = Reflect.apply(r, this, n);
					return (
						(a.rewritten = !0),
						n[0].toLowerCase() == "iframe" && (a.src = "about:blank"),
						a
					);
				},
				"createElement",
			)),
			!document.querySelector('link[rel="icon"], link[rel="shortcut icon"]'))
		) {
			var i = document.createElement("link");
			(i.rel = "icon"),
				(i.href = (e.__dynamic$icon || "/favicon.ico") + "?dynamic"),
				(i.dataset.dynamic_hidden = "true"),
				document.head.appendChild(i);
		}
		e.__dynamic.define(e.Attr.prototype, "value", {
			get() {
				return this.__value || e.__dynamic.elements.attrValue.get.call(this);
			},
			set(r) {
				return (
					(this.__value = r),
					this.name == "href" || this.name == "src"
						? e.__dynamic.elements.attrValue.set.call(
								this,
								e.__dynamic.url.encode(r, e.__dynamic.meta),
							)
						: this.name == "style"
							? e.__dynamic.elements.attrValue.set.call(
									this,
									e.__dynamic.rewrite.css.rewrite(r, e.__dynamic.meta),
								)
							: this.name == "onclick"
								? e.__dynamic.elements.attrValue.set.call(
										this,
										e.__dynamic.rewrite.js.rewrite(
											r,
											{ type: "script" },
											!1,
											e.__dynamic,
										),
									)
								: e.__dynamic.elements.attrValue.set.call(this, r)
				);
			},
		});
	}
	function Gi(e) {
		const t = e.XMLHttpRequest;
		e.Worker = new Proxy(e.Worker, {
			construct(i, r) {
				if (r[0])
					if (
						((r[0] = r[0].toString()),
						r[0].trim().startsWith(`blob:${e.location.origin}`))
					) {
						const n = new t();
						n.open("GET", r[0], !1), n.send();
						const a = e.__dynamic.rewrite.js.rewrite(
								n.responseText,
								{ type: "worker" },
								!0,
							),
							s = new Blob([a], { type: "application/javascript" });
						r[0] = URL.createObjectURL(s);
					} else r[0] = e.__dynamic.url.encode(r[0], e.__dynamic.meta);
				return Reflect.construct(i, r);
			},
		});
	}
	function zi(e) {
		(e.__dynamic$history = function (t, ...i) {
			i[2] && (i[2] = e.__dynamic.url.encode(i[2], e.__dynamic.meta)),
				e.__dynamic.Reflect.apply(t, this, i),
				e.__dynamic.client.location(e, !0, !1);
		}),
			(e.History.prototype.pushState = e.__dynamic.wrap(
				e.History.prototype.pushState,
				e.__dynamic$history,
			)),
			(e.History.prototype.replaceState = e.__dynamic.wrap(
				e.History.prototype.replaceState,
				e.__dynamic$history,
			));
	}
	var Ks =
			"!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~",
		Xs = "%";
	function qn(e) {
		e = e.toString();
		let t = "";
		for (let i = 0; i < e.length; i++) {
			const r = e[i];
			if (Ks.includes(r) && !Xs.includes(r)) t += r;
			else {
				const n = r.charCodeAt();
				t += "%" + n.toString(16).padStart(2, 0);
			}
		}
		return t;
	}
	function Ki(e) {
		const t = () =>
				e.location.protocol.replace("http", "ws") +
				"//" +
				new URL(
					(e.__dynamic$config.bare.path + "/" || "/ov/") + "v1/",
					new URL(location.origin),
				).href
					.replace(/http(s?):\/\//g, "")
					.replace(/\/\//g, "/"),
			i = Object.getOwnPropertyDescriptor(e.WebSocket.prototype, "url");
		e.__dynamic.define(e.WebSocket.prototype, "url", {
			get() {
				const r = i.get.call(this);
				return e.__dynamic.url.decode(r);
			},
			set(r) {
				return !1;
			},
		}),
			(e.WebSocket = e.__dynamic.wrap(e.WebSocket, (r, ...n) => {
				console.log(n);
				const a = new URL(n[0]),
					s = {
						remote: {
							host: a.hostname,
							port: a.port || (a.protocol === "wss:" ? "443" : "80"),
							path: a.pathname + a.search,
							protocol: a.protocol,
						},
						headers: {
							Host: a.hostname + (a.port ? ":" + a.port : ""),
							Origin: e.__dynamic$location.origin,
							Pragma: "no-cache",
							"Cache-Control": "no-cache",
							Upgrade: "websocket",
							Connection: "Upgrade",
						},
						forward_headers: [
							"accept-encoding",
							"accept-language",
							"sec-websocket-extensions",
							"sec-websocket-key",
							"sec-websocket-version",
							"sec-websocket-accept",
						],
					};
				return (
					n[1] && (s.headers["sec-websocket-protocol"] = n[1].toString()),
					[t(), ["bare", qn(JSON.stringify(s))]]
				);
			}));
	}
	function Xi(e) {
		(e.Request = e.__dynamic.wrap(e.Request, (t, ...i) => {
			if (i[0] instanceof t) {
				const r = Reflect.construct(t, i);
				return i[0].mode === "navigate" && (r.mode = "same-origin"), r;
			}
			return i[0] && (i[0] = e.__dynamic.url.encode(i[0], e.__dynamic.meta)), i;
		})),
			e.__dynamic.define(e.Request.prototype, "url", {
				get() {
					return e.__dynamic.url.decode(
						e.__dynamic.http.RequestURL.get.call(this),
					);
				},
				set(t) {
					return t;
				},
			}),
			(e.fetch = e.__dynamic.wrap(
				e.fetch,
				(t, ...i) => e.Request &&
						(i[0].constructor.name === "Request" || i[0] instanceof e.Request)
						? (console.log(i[0]), Reflect.apply(t, e, i))
						: (i[0] &&
								e.__dynamic &&
								(i[0] = e.__dynamic.url.encode(i[0], e.__dynamic.meta)),
							Reflect.apply(t, e, i)),
				"fetch",
			)),
			(e.XMLHttpRequest.prototype.open = e.__dynamic.wrap(
				e.XMLHttpRequest.prototype.open,
				function (t, ...i) {
					return (
						i[1] && (i[1] = e.__dynamic.url.encode(i[1], e.__dynamic.meta)),
						i[2] === !1 && (i[2] = !0),
						Reflect.apply(t, this, i)
					);
				},
				"XMLHttpRequest.prototype.open",
			)),
			Object.defineProperty(e.XMLHttpRequest.prototype, "responseURL", {
				get() {
					return e.__dynamic.url.decode(
						e.__dynamic.http.XMLResponseURL.get.call(this),
					);
				},
				set(t) {
					return t;
				},
			}),
			Object.defineProperty(e.Response.prototype, "url", {
				get() {
					return e.__dynamic.url.decode(
						e.__dynamic.http.ResponseURL.get.call(this),
					);
				},
				set(t) {
					return t;
				},
			}),
			(e.open = e.__dynamic.wrap(
				e.open,
				function (t, ...i) {
					i[0] != "" &&
						i[0] &&
						(i[0] = e.__dynamic.url.encode(i[0], e.__dynamic.meta)),
						i[0] == "" && (i[0] = "about:blank");
					const r = Reflect.apply(t, this, i);
					r.opener = e.__dynamic$window;
					try {
						new URL(i[0]).protocol === "about:"
							? (r.__dynamic$url = "about:srcdoc")
							: (r.__dynamic$url = e.__dynamic.url.decode(i[0]));
					} catch {
						r.__dynamic$url = "about:srcdoc";
					}
					return (
						e.__dynamic.elements.client(r, e.__dynamic$config, r.__dynamic$url),
						r.__dynamic$window
					);
				},
				"window.open",
			)),
			e.__dynamic.define(e, "__dynamic$import", {
				get() {
					return (t, i) => {
						try {
							return e.__dynamic.url.encode(t, new URL(i));
						} catch {
							return e.__dynamic.url.encode(t, e.__dynamic.meta);
						}
					};
				},
				set: () => {},
			});
	}
	function gt(e) {
		const t = (a) =>
				a.constructor.name == "Worker" ||
				a.constructor.name == "MessagePort" ||
				e.constructor.name == "DedicatedWorkerGlobalScope",
			i = (a) =>
				a.constructor.name == "Window" || a.constructor.name == "global",
			r = (a, s) =>
				Object.keys(window || {})
					.map((o) => Number.parseInt(o))
					.filter((o) => isFinite(o))
					.map((o) => window[o])
					.filter((o) => o || !1)
					.find((o) => {
						try {
							return o.name == a && o.location.href == s;
						} catch {
							return !1;
						}
					});
		(e.__dynamic$message = (a, s = top) => {
			a || (a = e);
			function o() {
				var c = arguments;
				return t(a) || !i(a)
					? a.postMessage.call(a, ...c)
					: (a.__dynamic$self && (a = a.__dynamic$self),
						(a._postMessage || a.postMessage).call(
							a,
							[
								c[0],
								s.__dynamic$location.origin,
								s.location.href,
								s.name,
								s !== e,
							],
							"*",
							c[2] || [],
						));
			}
			return o;
		}),
			e.constructor.name == "Window" &&
				(e.addEventListener &&
					(e.addEventListener = new Proxy(e.addEventListener, {
						apply(a, s, o) {
							if (
								(s == e.__dynamic$window && (s = e),
								!o[1] || !o[0] || typeof o[1] != "function")
							)
								return Reflect.apply(a, s, o);
							if (o[0] == "message") {
								var c = o[1].bind({});
								o[1] = (l) => c(n(l));
							}
							return Reflect.apply(a, s, o);
						},
					})),
				e.constructor.name == "Window" &&
					e.__dynamic.define(e, "onmessage", {
						get() {
							return e._onmessage || null;
						},
						set(a) {
							return (
								e._onmessage && e.removeEventListener("message", e._onmessage),
								e.addEventListener("message", a),
								(e._onmessage = a)
							);
						},
					}));
		function n(a) {
			let s = e.__dynamic.util.clone(a),
				o;
			a.source && (o = r(a.data[3], a.data[2]) || a.currentTarget),
				e.__dynamic.define(s, "isTrusted", { value: !0, writable: !1 }),
				a.origin &&
					(Array.isArray(a.data) && a.data.length == 5
						? e.__dynamic.define(s, "origin", {
								value: a.data[1],
								writable: !1,
							})
						: e.__dynamic.define(s, "origin", {
								value: a.origin,
								writable: !1,
							})),
				a.data &&
					(Array.isArray(a.data) && a.data.length == 5
						? e.__dynamic.define(s, "data", { value: a.data[0], writable: !1 })
						: e.__dynamic.define(s, "data", { value: a.data, writable: !1 })),
				a.source &&
					(o
						? e.__dynamic.define(s, "source", {
								value: o?.__dynamic$window || o,
								writable: !0,
							})
						: e.__dynamic.define(s, "source", {
								value:
									o ||
									(Array.isArray(a.data) &&
										a.data.length == 3 &&
										a.data[2] === !0)
										? a.source
										: a.currentTarget,
								writable: !0,
							}));
			for (var c in a)
				switch (c) {
					default:
						c !== "isTrusted" &&
							c !== "origin" &&
							c !== "data" &&
							c !== "source" &&
							e.__dynamic.define(s, c, { value: a[c], writable: !1 });
						break;
				}
			return s;
		}
	}
	function Qi(e) {
		function t(i, ...r) {
			for (var n in r) r[n] = e.__dynamic.rewrite.dom(r[n], e.__dynamic.meta);
			return i.apply(this, r);
		}
		["write", "writeln"].forEach((i) => {
			e.document[i] = e.__dynamic.wrap(e.document[i], t, `document.${i}`);
		});
	}
	function xt(e) {
		(e.importScripts = new Proxy(e.importScripts, {
			apply(t, i, r) {
				return (
					[...r].forEach((n, a) => {
						r[a] = e.__dynamic.url.encode(n, e.__dynamic.meta);
					}),
					Reflect.apply(t, i, r)
				);
			},
		})),
			e.__dynamic.define(e.__dynamic, "_location", {
				value: e.location,
				writable: !0,
			}),
			e.__dynamic.define(e.WorkerGlobalScope.prototype, "location", {
				get() {
					return e.__dynamic.location;
				},
				set(t) {
					return t;
				},
			}),
			(e.location = e.__dynamic.location);
	}
	function _t(e) {
		var t = e.Reflect.get.bind({}),
			i = e.Reflect.set.bind({});
		(e.Reflect.set = e.__dynamic.wrap(
			e.Reflect.set,
			function (r, ...n) {
				return n[0].constructor.name == "Window" && n[1] == "location"
					? ((n[0].__dynamic$location = n[2]), !0)
					: n[0].constructor.name == "Location"
						? ((e.__dynamic$location[n[1]] = n[2]), !0)
						: Reflect.apply(i, this, n);
			},
			"Reflect.set",
		)),
			(e.Reflect.get = e.__dynamic.wrap(
				e.Reflect.get,
				function (r, ...n) {
					if (typeof n[0] == "object") {
						if (n[0].constructor.name == "Window") {
							if (n[1] == "location")
								return n[0].__dynamic
									? n[0].__dynamic$location
									: Reflect.apply(t, this, n);
							if (n[0][n[1]] && n[0][n[1]].constructor.name == "Window")
								return n[0][n[1]].__dynamic$window;
						}
						if (n[0].constructor.name == "Location")
							return e.__dynamic$location[n[1]];
					}
					return Reflect.apply(t, this, n);
				},
				"Reflect.get",
			)),
			(e.__dynamic.Reflect = {
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
				setPrototypeOf: e.Reflect.setPrototypeOf.bind({}),
			});
	}
	function Yi(e) {
		e.__dynamic.define(e.document, "origin", {
			value: e.__dynamic$location.origin,
			configurable: !1,
			enumerable: !1,
		}),
			e.__dynamic.define(e.document, "domain", {
				value: e.__dynamic$location.hostname,
				configurable: !1,
				enumerable: !1,
			}),
			["referrer", "URL", "documentURI"].forEach((t) => {
				e.__dynamic.define(e.document, t, {
					value: e.__dynamic$location.toString(),
					configurable: !1,
					enumerable: !1,
				});
			}),
			[e.document, e.HTMLElement.prototype].forEach((t) => {
				e.__dynamic.define(t, "baseURI", {
					get() {
						return (e.__dynamic.baseURL || e.__dynamic$location).href;
					},
				});
			}),
			["getEntries", "getEntriesByName", "getEntriesByType"].forEach((t) => {
				e.performance[t] = new Proxy(e.performance[t], {
					apply(i, r, n) {
						return Reflect.apply(i, r, n)
							.filter(
								(a) =>
									!a.name?.includes(e.location.origin + "/assets/-dy/dynamic."),
							)
							.filter(
								(a) =>
									!a.name.includes(
										e.location.origin + e.__dynamic.config.prefix + "caches/",
									),
							)
							.map((a) => {
								if (a.name) {
									var s = e.__dynamic.util.clone(a);
									s.__defineGetter__("name", function () {
										return this._name;
									}),
										s.__defineSetter__("name", function (l) {
											this._name = l;
										}),
										(s.name = e.__dynamic.url.decode(a.name)),
										e.__dynamic.define(s, "name", { get: void 0, set: void 0 }),
										e.__dynamic.define(s, "name", {
											value: s._name,
											writable: !1,
										}),
										delete s._name;
									for (var o in a)
										if (o != "name") {
											if (typeof a[o] == "function")
												var c = new Proxy(a[o], {
													apply(l, h, f) {
														if (l.name == "toJSON") {
															var A = {};
															for (var d in s) A[d] = s[d];
															return A;
														}
														return Reflect.apply(l, a, f);
													},
												});
											else var c = a[o];
											Object.defineProperty(s, o, { value: c, writable: !0 });
										}
									a = s;
								}
								return a;
							});
					},
				});
			}),
			e.MouseEvent &&
				(e.MouseEvent.prototype.initMouseEvent = e.__dynamic.wrap(
					e.MouseEvent.prototype.initMouseEvent,
					function (t, ...i) {
						return (
							i.length && (i = i.map((r) => (r == e.__dynamic$window ? e : r))),
							Reflect.apply(t, this, i)
						);
					},
				)),
			e.KeyboardEvent &&
				(e.KeyboardEvent.prototype.initKeyboardEvent = e.__dynamic.wrap(
					e.KeyboardEvent.prototype.initKeyboardEvent,
					function (t, ...i) {
						return (
							i.length && (i = i.map((r) => (r == e.__dynamic$window ? e : r))),
							Reflect.apply(t, this, i)
						);
					},
				)),
			e.StorageEvent &&
				(e.StorageEvent.prototype.initStorageEvent = e.__dynamic.wrap(
					e.StorageEvent.prototype.initStorageEvent,
					function (t, ...i) {
						return (
							i.length &&
								(i = i.map((r) =>
									r == e.localStorage
										? e.__dynamic.storage.localStorage
										: r == e.sessionStorage
											? e.__dynamic.storage.sessionStorage
											: r,
								)),
							Reflect.apply(t, this, i)
						);
					},
				)),
			(e.Object.defineProperty = e.__dynamic.wrap(
				e.Object.defineProperty,
				function (t, ...i) {
					try {
						return Reflect.apply(t, this, i);
					} catch (r) {
						r.toString().includes("Cannot redefine property:") &&
							(i[0].__defined || (i[0].__defined = {}),
							(i[0].__defined[i[1]] = i[2]));
					}
				},
			)),
			e.__dynamic.meta.origin == "https://www.google.com" &&
				(e.setInterval = new Proxy(e.setInterval, {
					apply(t, i, r) {
						return r[1] == 500 ? null : Reflect.apply(t, i, r);
					},
				}));
	}
	function Ji(e) {
		(e.Storage.prototype.setItem = e.__dynamic.wrap(
			e.Storage.prototype.setItem,
			function (t, ...i) {
				return (
					i[0] &&
						(i[0] =
							"__dynamic$" + e.__dynamic$location.host + "$" + i[0].toString()),
					Reflect.apply(t, this, i)
				);
			},
			"Storage.prototype.setItem",
		)),
			(e.Storage.prototype.getItem = e.__dynamic.wrap(
				e.Storage.prototype.getItem,
				function (t, ...i) {
					return (
						i[0] &&
							(i[0] =
								"__dynamic$" +
								e.__dynamic$location.host +
								"$" +
								i[0].toString()),
						Reflect.apply(t, this, i) || null
					);
				},
				"Storage.prototype.getItem",
			)),
			(e.Storage.prototype.removeItem = e.__dynamic.wrap(
				e.Storage.prototype.removeItem,
				function (t, ...i) {
					return (
						i[0] &&
							(i[0] =
								"__dynamic$" +
								e.__dynamic$location.host +
								"$" +
								i[0].toString()),
						Reflect.apply(t, this, i)
					);
				},
				"Storage.prototype.removeItem",
			)),
			(e.Storage.prototype.clear = e.__dynamic.wrap(
				e.Storage.prototype.clear,
				function (t, ...i) {
					for (var r = [], n = 0; n < this.length; n++)
						t
							.call(this, n)
							?.startsWith("__dynamic$" + e.__dynamic$location.host + "$") &&
							r.push(
								t
									.call(this, n)
									?.replace("__dynamic$" + e.__dynamic$location.host + "$", ""),
							);
					for (var a in r) t.call(this, r[a]);
				},
				"Storage.prototype.clear",
			)),
			(e.Storage.prototype.key = e.__dynamic.wrap(
				e.Storage.prototype.key,
				function (t, ...i) {
					for (var r = [], n = 0; n < this.length; n++)
						t
							.call(this, n)
							?.startsWith("__dynamic$" + e.__dynamic$location.host + "$") &&
							r.push(
								t
									.call(this, n)
									?.replace("__dynamic$" + e.__dynamic$location.host + "$", ""),
							);
					return r[i[0]] ? r[i[0]] : null;
				},
				"Storage.prototype.key",
			)),
			["localStorage", "sessionStorage"].forEach((t) => {
				(e["__dynamic$" + t] = new Proxy(e[t], {
					get(i, r) {
						if (r == "length") {
							for (
								var n = [], a = 0;
								a < Object.keys(e.__dynamic.storage[t]).length;
								a++
							)
								Object.keys(e.__dynamic.storage[t])[a].startsWith(
									"__dynamic$" + e.__dynamic$location.host + "$",
								) &&
									n.push(
										Object.keys(e.__dynamic.storage[t])[a].replace(
											"__dynamic$" + e.__dynamic$location.host + "$",
											"",
										),
									);
							return n.length;
						}
						return e.__dynamic.storage.methods.includes(r)
							? e.__dynamic.storage.cloned[t][r].bind(e.__dynamic.storage[t])
							: e.__dynamic.storage[t].getItem(
									"__dynamic$" + e.__dynamic$location.host + "$" + r.toString(),
								);
					},
					set(i, r, n) {
						return (
							e.__dynamic.storage[t].setItem(
								"__dynamic$" + e.__dynamic$location.host + "$" + r.toString(),
								n,
							),
							n || !0
						);
					},
					deleteProperty(i, r) {
						return e.__dynamic.storage[t].removeItem(
							"__dynamic$" + e.__dynamic$location.host + "$" + r.toString(),
						);
					},
				})),
					delete e[t],
					(e[t] = e["__dynamic$" + t]);
			});
	}
	function Zi(e) {
		"serviceWorker" in e.navigator &&
			((e.__dynamic.sw = e.navigator.serviceWorker),
			delete e.navigator.serviceWorker,
			delete e.Navigator.prototype.serviceWorker),
			(e.navigator.sendBeacon = e.__dynamic.wrap(
				e.navigator.sendBeacon,
				function (t, ...i) {
					return (
						i[0] && (i[0] = e.__dynamic.url.encode(i[0], e.__dynamic.meta)),
						Reflect.apply(t, this, i)
					);
				},
				"navigator.sendBeacon",
			));
	}
	var er = (e) =>
			e
				? e
						.split(";")
						.map((t) => t.split("="))
						.reduce((t, i) => ((t[i[0].trim()] = i[1].trim()), t), {})
				: {},
		We = (e = []) => e.map((t) => `${t.name}=${t.value}`).join("; ");
	function tr(e) {
		if (
			(delete e.Document.prototype.cookie,
			e.__dynamic.define(e.document, "cookie", {
				get() {
					var t = e.__dynamic.fire("getCookies", [
						e.__dynamic.location.host,
						e.__dynamic.cookie.str || "",
					]);
					return (
						t ||
						(e.__dynamic.cookies.update(e.__dynamic.location.host),
						e.__dynamic.cookie.str ||
							e.__dynamic.cookie.desc.get.call(this) ||
							"")
					);
				},
				set(t) {
					var i = e.__dynamic.modules.setCookieParser.parse(t, {
							decodeValues: !1,
						})[0],
						r = e.__dynamic.fire("setCookie", [
							e.__dynamic.location.host,
							t,
							i,
						]);
					if (r) return r;
					(i.name = i.name.replace(/^\./g, "")),
						Promise.resolve(
							e.__dynamic.cookies.set(
								e.__dynamic.location.host,
								e.__dynamic.modules.cookie.serialize(i.name, i.value, {
									...i,
									encode: (a) => a,
								}),
							),
						).then(async (a) => {
							await e.__dynamic.cookies.update(e.__dynamic.location.host),
								(e.__dynamic.cookie.str = await e.__dynamic.cookies.get(
									e.__dynamic.location.host,
								));
						});
					var n = er(e.__dynamic.cookie.str || "");
					(n[i.name] = i.value),
						(e.__dynamic.cookie.str = We(
							Object.entries(n).map((a) => ({ name: a[0], value: a[1] })),
						));
				},
			}),
			e.navigator.serviceWorker)
		)
			try {
				e.navigator.serviceWorker.onmessage = ({ data: t }) => {
					if (t.host == e.__dynamic.location.host && t.type == "set-cookie") {
						var i = e.__dynamic.modules.cookie.parse(t.val),
							r = er(e.__dynamic.cookie.str || "");
						(r[Object.entries(i)[0][0]] = Object.entries(i)[0][1]),
							(e.__dynamic.cookie.str = We(
								Object.entries(r).map((n) => ({ name: n[0], value: n[1] })),
							));
					}
					t.host == e.__dynamic.location.host &&
						t.type == "cookies" &&
						(e.__dynamic.cookie.str = t.cookies);
				};
			} catch {}
	}
	function ir(e) {
		(e.CSSStyleDeclaration.prototype._setProperty =
			e.CSSStyleDeclaration.prototype.setProperty),
			(e.CSSStyleDeclaration.prototype.setProperty = e.__dynamic.wrap(
				e.CSSStyleDeclaration.prototype.setProperty,
				function (t, ...i) {
					return (
						(i[0] == "background-image" ||
							i[0] == "background" ||
							i[0] == "backgroundImage") &&
							(i[1] = e.__dynamic.rewrite.css.rewrite(i[1], e.__dynamic.meta)),
						t.apply(this, i)
					);
				},
				"CSSStyleDeclaration.prototype.setProperty",
			)),
			e.__dynamic.define(e.CSSStyleDeclaration.prototype, "background", {
				get() {
					return this._background
						? this._background
						: this.getPropertyValue("background");
				},
				set(t) {
					return (
						(this._background = t),
						this._setProperty(
							"background",
							e.__dynamic.rewrite.css.rewrite(t, e.__dynamic.meta),
						)
					);
				},
			}),
			e.__dynamic.define(e.CSSStyleDeclaration.prototype, "backgroundImage", {
				get() {
					return this._backgroundImage
						? this._backgroundImage
						: this.getPropertyValue("background-image");
				},
				set(t) {
					return (
						(this._backgroundImage = t),
						this._setProperty(
							"background-image",
							e.__dynamic.rewrite.css.rewrite(t, e.__dynamic.meta),
						)
					);
				},
			}),
			e.__dynamic.define(e.CSSStyleDeclaration.prototype, "background-image", {
				get() {
					return this._backgroundImage
						? this._backgroundImage
						: this.getPropertyValue("background-image");
				},
				set(t) {
					return (
						(this._backgroundImage = t),
						this._setProperty(
							"background-image",
							e.__dynamic.rewrite.css.rewrite(t, e.__dynamic.meta),
						)
					);
				},
			});
	}
	function bt(e) {
		e.__dynamic.createBlobHandler = async (t, i, r) => {
			const n = (await e.__dynamic.sw.ready).active;
			e.__dynamic.sw.addEventListener(
				"message",
				({ data: { url: a } }) => {
					a && e.__dynamic.elements.iframeSrc.set.call(i, a);
				},
				{ once: !0 },
			),
				n.postMessage({
					type: "createBlobHandler",
					blob: t,
					url: e.__dynamic.modules.base64.encode(
						r.toString().split("").slice(0, 10),
					),
					location: e.__dynamic.location.href,
				});
		};
	}
	var Gn = (e, t, i) => (
		(i = new MutationObserver((n) => {
			for (var a of n)
				e[a.type](a),
					document.dispatchEvent(
						new CustomEvent(
							{
								attributes: "attrChanged",
								characterData: "characterData",
								childList: "nodeChanged",
							}[a.type],
							{ detail: a },
						),
					);
		})).observe(t, { subtree: !0, attributes: !0, childList: !0 }),
		i
	);
	function wt(e, t) {
		t || (t = e.__dynamic);
		function i(n) {
			if (!n.rewritten && !(n.nodeType !== 1 && n.nodeType !== 3)) {
				if (
					((n = new Proxy(n, {
						get(o, c) {
							return c == "src" ||
								c == "href" ||
								c == "srcset" ||
								c == "imageSrcset" ||
								c == "data" ||
								c == "action"
								? t.elements.getAttribute.call(o, c.toLowerCase())
								: c == "setAttribute" ||
										c == "getAttribute" ||
										c == "removeAttribute" ||
										c == "hasAttribute" ||
										c == "cloneNode" ||
										c == "addEventListener"
									? (...l) => t.elements[c].call(o, ...l)
									: c == "node"
										? o
										: o[c];
						},
						set(o, c, l) {
							return (
								c == "src" ||
								c == "href" ||
								c == "srcset" ||
								c == "imageSrcset" ||
								c == "data" ||
								c == "action"
									? t.elements.setAttribute.call(o, c.toLowerCase(), l)
									: (o[c] = l),
								!0
							);
						},
					})),
					n instanceof HTMLScriptElement &&
						(n.src &&
							((n.dataset.dynamic_src = n.src),
							(n.src = t.url.encode(n.src, t.meta))),
						n.type && n.textContent?.length
							? (n.type == "application/javascript" ||
									n.type == "text/javascript" ||
									(n.type == "application/x-javascript" &&
										n.textContent?.length)) &&
								(n.textContent = t.rewrite.js.rewrite(
									n.textContent,
									{ type: "script" },
									!1,
									t,
								))
							: !n.type &&
								n.textContent?.length &&
								(n.textContent = t.rewrite.js.rewrite(
									n.textContent,
									{ type: "script" },
									!1,
									t,
								))),
					n instanceof HTMLStyleElement &&
						n.textContent?.length &&
						(n.textContent = t.rewrite.css.rewrite(n.textContent, t.meta)),
					n instanceof HTMLIFrameElement &&
						(n.src &&
							((n.dataset.dynamic_src = n.src),
							(n.src = t.url.encode(n.src, t.meta))),
						n.srcdoc))
				) {
					n.dataset.dynamic_srcdoc = n.srcdoc;
					const o = new Blob([t.rewrite.html.rewrite(n.srcdoc, t.meta)], {
						type: "text/html",
					});
					n.src = URL.createObjectURL(o);
				}
				if (
					(n instanceof HTMLLinkElement &&
						(n.getAttribute("rel") !== "stylesheet" &&
						n.getAttribute("rel") !== "prefetch" &&
						n.getAttribute("rel") !== "dns-prefetch"
							? (n.href &&
									((n.dataset.dynamic_href = n.href),
									(n.href = t.url.encode(n.href, t.meta))),
								n.imageSrcset &&
									((n.dataset.dynamic_imagesrcset = n.imageSrcset),
									(n.imageSrcset = t.rewrite.srcset.encode(n.imageSrcset, t))))
							: n.addEventListener(
									"error",
									(o) => {
										if (n instanceof HTMLLinkElement)
											return (
												n.href &&
													((n.dataset.dynamic_href = n.href),
													(n.href = t.url.encode(n.href, t.meta))),
												n.imageSrcset &&
													((n.dataset.dynamic_imagesrcset = n.imageSrcset),
													(n.imageSrcset = t.rewrite.srcset.encode(
														n.imageSrcset,
														t,
													))),
												o.preventDefault(),
												!1
											);
									},
									{ once: !0 },
								)),
					n instanceof HTMLAnchorElement &&
						n.href &&
						((n.dataset.dynamic_href = n.href),
						(n.href = t.url.encode(n.href, t.meta))),
					n instanceof HTMLFormElement &&
						n.action &&
						((n.dataset.dynamic_action = n.action),
						(n.action = t.url.encode(n.action, t.meta))),
					n instanceof HTMLObjectElement &&
						n.data &&
						((n.dataset.dynamic_data = n.data),
						(n.data = t.url.encode(n.data, t.meta))),
					n instanceof HTMLSourceElement &&
						(n.src &&
							((n.dataset.dynamic_src = n.src),
							(n.src = t.url.encode(n.src, t.meta))),
						n.srcset &&
							((n.dataset.dynamic_srcset = n.srcset),
							(n.srcset = t.rewrite.srcset.encode(n.srcset, t)))),
					n instanceof HTMLImageElement &&
						(n.src &&
							((n.dataset.dynamic_src = n.src),
							(n.src = t.url.encode(n.src, t.meta))),
						n.srcset &&
							((n.dataset.dynamic_srcset = n.srcset),
							(n.srcset = t.rewrite.srcset.encode(n.srcset, t)))),
					n instanceof HTMLAreaElement &&
						n.href &&
						((n.dataset.dynamic_href = n.href),
						(n.href = t.url.encode(n.href, t.meta))),
					n instanceof HTMLBaseElement &&
						n.href &&
						((n.dataset.dynamic_href = n.href),
						(n.href = t.url.encode(n.href, t.meta))),
					n instanceof HTMLInputElement &&
						n.src &&
						((n.dataset.dynamic_src = n.src),
						(n.src = t.url.encode(n.src, t.meta))),
					n instanceof HTMLAudioElement &&
						n.src &&
						((n.dataset.dynamic_src = n.src),
						(n.src = t.url.encode(n.src, t.meta))),
					n instanceof HTMLVideoElement &&
						n.src &&
						((n.dataset.dynamic_src = n.src),
						(n.src = t.url.encode(n.src, t.meta))),
					n instanceof HTMLTrackElement &&
						n.src &&
						((n.dataset.dynamic_src = n.src),
						(n.src = t.url.encode(n.src, t.meta))),
					n instanceof HTMLMediaElement &&
						n.src &&
						((n.dataset.dynamic_src = n.src),
						(n.src = t.url.encode(n.src, t.meta))),
					n instanceof HTMLMetaElement && n.httpEquiv)
				) {
					if (n.httpEquiv.toLowerCase() == "refresh") {
						var a = n.content.split(";url=")[0],
							s = n.content.split(";url=")[1];
						n.content = `${a};url=${t.url.encode(s, t.meta)}`;
					}
					n.httpEquiv.toLowerCase() == "content-security-policy" && n.remove();
				}
				return (
					n instanceof HTMLElement &&
						(n.getAttribute("style") &&
							n.setAttribute(
								"style",
								t.rewrite.css.rewrite(n.getAttribute("style"), t.meta),
							),
						n.integrity &&
							(n.setAttribute("nointegrity", n.integrity),
							n.removeAttribute("integrity")),
						n.nonce &&
							(n.setAttribute("nononce", n.nonce), n.removeAttribute("nonce"))),
					(n.rewritten = !0)
				);
			}
		}
		const r = Gn(
			{
				childList(n) {
					i(n.target);
					for (const s of n.addedNodes)
						if (s.childNodes) for (const o of s.childNodes) i(o);
					if (n.target.childNodes) for (var a of n.target.childNodes) i(a);
				},
				attributes(n) {},
				characterData(n) {},
			},
			e.document,
		);
		e.document.addEventListener(
			"DOMContentLoaded",
			() => {
				r.disconnect();
			},
			{ once: !0 },
		);
	}
	function rr(e) {
		(e.__dynamic.eval = e.__dynamic.wrap(
			eval,
			function (t, ...i) {
				if (i.length) {
					var r = i[0].toString();
					return (
						(r = e.__dynamic.rewrite.js.rewrite(
							r,
							{ type: "script" },
							!1,
							e.__dynamic,
						)),
						t.apply(this, [r])
					);
				}
			},
			"eval",
		)),
			e.__dynamic.define(e.Object.prototype, "__dynamic$eval", {
				get() {
					return this === window ? e.__dynamic.eval : this.eval;
				},
				set(t) {
					return t;
				},
			}),
			(e.__dynamic$wrapEval = (t) => {
				if (!arguments.length) return arguments[0];
				var i = e.__dynamic.fire("eval", [e, t]);
				return (
					i ||
					((t = e.__dynamic.rewrite.js.rewrite(
						t,
						{ type: "script" },
						!1,
						e.__dynamic,
					)),
					t)
				);
			});
	}
	function nr(e) {
		var t = e.Function.prototype.toString;
		(e.__dynamic.Function = e.Function.bind({})),
			e.__dynamic.define(e.Function.prototype, "_toString", {
				get() {
					return t;
				},
				set: () => {},
			});
		var i = function () {
			try {
				var r = Reflect.apply(t, this, []);
			} catch {
				return `function ${this.name}() { [native code] }`;
			}
			return r.includes("[native code]")
				? `function ${this.name}() { [native code] }`
				: r;
		};
		e.__dynamic.define(e.Function.prototype, "toString", {
			get() {
				return this.__toString || i;
			},
			set(r) {
				this.__toString = r;
			},
		}),
			(e.Function = new Proxy(e.Function, {
				apply(r, n, a) {
					var s = [...a],
						o = s.pop();
					return (
						(o = `(function anonymous(${s.toString()}) {${o}})`),
						(o = e.__dynamic.rewrite.js.rewrite(
							o,
							{ type: "script" },
							!1,
							e.__dynamic,
						)),
						e.eval(o)
					);
				},
				construct(r, n) {
					var a = [...n],
						s = a.pop();
					return (
						(s = `(function anonymous(${a.toString()}) {${s}})`),
						(s = e.__dynamic.rewrite.js.rewrite(
							s,
							{ type: "script" },
							!1,
							e.__dynamic,
						)),
						e.eval(s)
					);
				},
			})),
			(e.Function.prototype.apply = e.__dynamic.wrap(
				e.Function.prototype.apply,
				function (r, ...n) {
					return (
						n[0] == e.__dynamic$window && (n[0] = n[0].__dynamic$self),
						n[0] == e.__dynamic$document && (n[0] = e.document),
						Reflect.apply(r, this, n)
					);
				},
				"Function.prototype.apply",
			)),
			(e.Function.prototype.call = new Proxy(e.Function.prototype.call, {
				apply(r, n, a) {
					return (
						a[0] == e.__dynamic$window && (a[0] = a[0].__dynamic$self),
						a[0] == e.__dynamic$document && (a[0] = e.document),
						Reflect.apply(r, n, a)
					);
				},
			})),
			(e.Function.prototype.bind = e.__dynamic.wrap(
				e.Function.prototype.bind,
				function (r, ...n) {
					return (
						n[0] == e.__dynamic$window && (n[0] = n[0].__dynamic$self),
						n[0] == e.__dynamic$document && (n[0] = e.document),
						r.apply(this, n)
					);
				},
				"Function.prototype.bind",
			));
	}
	function ar(e) {}
	function sr(e) {}
	var zn = [
		{ name: "get", function: "self" },
		{ name: "func", function: "self" },
		{ name: "location", function: "self" },
		{ name: "mutation", function: "self" },
		{ name: "dom", function: "self" },
		{ name: "write", function: "self" },
		{ name: "message", function: "self" },
		{ name: "reflect", function: "self" },
		{ name: "window", function: "self" },
		{ name: "eval", function: "self" },
		{ name: "attr", function: "self" },
		{ name: "policy", function: "self" },
		{ name: "worker", function: "self" },
		{ name: "history", function: "self" },
		{ name: "ws", function: "self" },
		{ name: "cookie", function: "self" },
		{ name: "fetch", function: "self" },
		{ name: "niche", function: "self" },
		{ name: "storage", function: "self" },
		{ name: "style", function: "self" },
		{ name: "rtc", function: "self" },
		{ name: "blob", function: "self" },
		{ name: "navigator", function: "self" },
	];
	var qe = class {
		constructor(t) {
			this.methods = zn;
			self.constructor.name == "DedicatedWorkerGlobalScope" ||
			self.constructor.name == "SharedWorkerGlobalScope"
				? ((this.message = gt),
					(this.location = dt),
					(this.window = yt),
					(this.get = mt),
					(this.reflect = _t),
					(this.imports = xt),
					(this.blob = bt),
					(this.mutation = wt))
				: ((this.location = dt),
					(this.get = mt),
					(this.window = yt),
					(this.attr = qi),
					(this.worker = Gi),
					(this.history = zi),
					(this.ws = Ki),
					(this.fetch = Xi),
					(this.message = gt),
					(this.policy = ar),
					(this.write = Qi),
					(this.imports = xt),
					(this.reflect = _t),
					(this.niche = Yi),
					(this.storage = Ji),
					(this.navigator = Zi),
					(this.cookie = tr),
					(this.style = ir),
					(this.blob = bt),
					(this.mutation = wt),
					(this.eval = rr),
					(this.func = nr),
					(this.rtc = sr),
					(this.dom = Wi)),
				(this.ctx = t);
		}
	};
	function Qs(e, t) {
		return (
			e || (e = []),
			e.find((i) => i.name == t.name)
				? (e[e.findIndex((i) => i.name == t.name)] = {
						name: t.name,
						value: t.value,
						expires: t.expires,
					})
				: e.push({ name: t.name, value: t.value, expires: t.expires }),
			e
		);
	}
	var he = {
		open: async () =>
			Bt("__dynamic$cookies", 1, {
				async upgrade(e) {
					await e.createObjectStore("__dynamic$cookies");
				},
			}),
		set: async (e, t, i) => {
			if (
				(t.domain && (e = t.domain),
				e.startsWith(".") && (e = e.slice(1)),
				t.expires)
			) {
				var r = new Date(t.expires);
				if (r < new Date()) return he.remove(e, t, i);
			}
			return (
				await (await i).put(
					"__dynamic$cookies",
					Qs(await (await i).get("__dynamic$cookies", e), t),
					e,
				),
				!0
			);
		},
		get: async (e, t) => {
			var i = e.replace(/^(.*\.)?([^.]*\..*)$/g, "$2"),
				r = (await (await t).get("__dynamic$cookies", e)) || [];
			if (e !== i && e !== "." + i) {
				var n = await (await t).get("__dynamic$cookies", i);
				if (n)
					for (var { name: a, value: s, expires: o } of n) {
						if (o) {
							var c = new Date(o);
							if (c <= new Date()) {
								he.remove(
									e,
									n.find((l) => l.name == a && l.value == s && l.expires == o),
									t,
								);
								continue;
							}
						}
						r.find((l) => l.name == a && l.value == s) ||
							r.push({ name: a, value: s, expires: o || new Date(1e13) });
					}
			}
			return r;
		},
		remove: async (e, t, i) => {
			t.domain && (e = t.domain), e.startsWith(".") && (e = e.slice(1));
			var r = await (await i).get("__dynamic$cookies", e);
			return r
				? ((r = r.filter((n) => n.name !== t.name)),
					await (await i).put("__dynamic$cookies", r, e),
					!0)
				: !1;
		},
		update: async (e, t) => {
			var i = e.replace(/^(.*\.)?([^.]*\..*)$/g, "$2"),
				r = await (await t).get("__dynamic$cookies", i);
			if (r) {
				for (var { name: n, value: a, expires: s } of r)
					if (s) {
						var o = new Date(s);
						if (o <= new Date()) {
							he.remove(e, { name: n, value: a, expires: s }, t);
							continue;
						}
					}
			}
			return r;
		},
	};
	var Ge = class {
		constructor(t) {
			this.db = he;
			this.ctx = t;
		}
		async get(t) {
			this._db || (this._db = this.db.open());
			const i = await he.get(t, this._db);
			return We(i);
		}
		async set(t, i = "") {
			return (
				(i = this.ctx.modules.setCookieParser.parse(i, {
					decodeValues: !1,
				})[0]),
				this._db || (this._db = this.db.open()),
				await he.set(t, i, this._db)
			);
		}
		async open() {
			await he.open();
		}
		async update(t) {
			return (
				this._db || (this._db = this.db.open()), await he.update(t, this._db)
			);
		}
	};
	var lr = {};
	dr(lr, {
		aes: () => po,
		base64: () => mo,
		none: () => fo,
		plain: () => ho,
		xor: () => lo,
	});
	var xe = 14,
		ne = 8,
		ze = !1,
		Ys = (e) => {
			try {
				return unescape(encodeURIComponent(e));
			} catch {
				throw "Error on UTF-8 encode";
			}
		},
		Js = (e) => {
			try {
				return decodeURIComponent(escape(e));
			} catch {
				throw "Bad Key";
			}
		},
		Zs = (e) => {
			var t = [],
				i,
				r;
			for (
				e.length < 16 &&
					((i = 16 - e.length),
					(t = [i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i])),
					r = 0;
				r < e.length;
				r++
			)
				t[r] = e[r];
			return t;
		},
		Kn = (e, t) => {
			var i = "",
				r,
				n;
			if (t) {
				if (((r = e[15]), r > 16)) throw "Decryption error: Maybe bad key";
				if (r === 16) return "";
				for (n = 0; n < 16 - r; n++) i += String.fromCharCode(e[n]);
			} else for (n = 0; n < 16; n++) i += String.fromCharCode(e[n]);
			return i;
		};
	var or = (e, t) => {
		var i = [],
			r;
		for (t || (e = Ys(e)), r = 0; r < e.length; r++) i[r] = e.charCodeAt(r);
		return i;
	};
	var eo = (e) => {
			var t = [],
				i;
			for (i = 0; i < e; i++) t = t.concat(Math.floor(Math.random() * 256));
			return t;
		},
		Yn = (e, t) => {
			var i = xe >= 12 ? 3 : 2,
				r = [],
				n = [],
				a = [],
				s = [],
				o = e.concat(t),
				c;
			for (a[0] = Qn(o), s = a[0], c = 1; c < i; c++)
				(a[c] = Qn(a[c - 1].concat(o))), (s = s.concat(a[c]));
			return (
				(r = s.slice(0, 4 * ne)),
				(n = s.slice(4 * ne, 4 * ne + 16)),
				{ key: r, iv: n }
			);
		},
		to = (e, t, i) => {
			t = ta(t);
			var r = Math.ceil(e.length / 16),
				n = [],
				a,
				s = [];
			for (a = 0; a < r; a++) n[a] = Zs(e.slice(a * 16, a * 16 + 16));
			for (
				e.length % 16 === 0 &&
					(n.push([
						16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
					]),
					r++),
					a = 0;
				a < n.length;
				a++
			)
				(n[a] = a === 0 ? Pt(n[a], i) : Pt(n[a], s[a - 1])),
					(s[a] = ro(n[a], t));
			return s;
		},
		io = (e, t, i, r) => {
			t = ta(t);
			var n = e.length / 16,
				a = [],
				s,
				o = [],
				c = "";
			for (s = 0; s < n; s++) a.push(e.slice(s * 16, (s + 1) * 16));
			for (s = a.length - 1; s >= 0; s--)
				(o[s] = no(a[s], t)),
					(o[s] = s === 0 ? Pt(o[s], i) : Pt(o[s], a[s - 1]));
			for (s = 0; s < n - 1; s++) c += Kn(o[s], !1);
			return (c += Kn(o[s], !0)), r ? c : Js(c);
		},
		ro = (e, t) => {
			ze = !1;
			var i = Lt(e, t, 0),
				r;
			for (r = 1; r < xe + 1; r++)
				(i = Jn(i)), (i = Zn(i)), r < xe && (i = ea(i)), (i = Lt(i, t, r));
			return i;
		},
		no = (e, t) => {
			ze = !0;
			var i = Lt(e, t, xe),
				r;
			for (r = xe - 1; r > -1; r--)
				(i = Zn(i)), (i = Jn(i)), (i = Lt(i, t, r)), r > 0 && (i = ea(i));
			return i;
		},
		Jn = (e) => {
			var t = ze ? co : ur,
				i = [],
				r;
			for (r = 0; r < 16; r++) i[r] = t[e[r]];
			return i;
		},
		Zn = (e) => {
			var t = [],
				i = ze
					? [0, 13, 10, 7, 4, 1, 14, 11, 8, 5, 2, 15, 12, 9, 6, 3]
					: [0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11],
				r;
			for (r = 0; r < 16; r++) t[r] = e[i[r]];
			return t;
		},
		ea = (e) => {
			var t = [],
				i;
			if (ze)
				for (i = 0; i < 4; i++)
					(t[i * 4] =
						At[e[i * 4]] ^
						Ct[e[1 + i * 4]] ^
						kt[e[2 + i * 4]] ^
						Et[e[3 + i * 4]]),
						(t[1 + i * 4] =
							Et[e[i * 4]] ^
							At[e[1 + i * 4]] ^
							Ct[e[2 + i * 4]] ^
							kt[e[3 + i * 4]]),
						(t[2 + i * 4] =
							kt[e[i * 4]] ^
							Et[e[1 + i * 4]] ^
							At[e[2 + i * 4]] ^
							Ct[e[3 + i * 4]]),
						(t[3 + i * 4] =
							Ct[e[i * 4]] ^
							kt[e[1 + i * 4]] ^
							Et[e[2 + i * 4]] ^
							At[e[3 + i * 4]]);
			else
				for (i = 0; i < 4; i++)
					(t[i * 4] =
						vt[e[i * 4]] ^ St[e[1 + i * 4]] ^ e[2 + i * 4] ^ e[3 + i * 4]),
						(t[1 + i * 4] =
							e[i * 4] ^ vt[e[1 + i * 4]] ^ St[e[2 + i * 4]] ^ e[3 + i * 4]),
						(t[2 + i * 4] =
							e[i * 4] ^ e[1 + i * 4] ^ vt[e[2 + i * 4]] ^ St[e[3 + i * 4]]),
						(t[3 + i * 4] =
							St[e[i * 4]] ^ e[1 + i * 4] ^ e[2 + i * 4] ^ vt[e[3 + i * 4]]);
			return t;
		},
		Lt = (e, t, i) => {
			var r = [],
				n;
			for (n = 0; n < 16; n++) r[n] = e[n] ^ t[i][n];
			return r;
		},
		Pt = (e, t) => {
			var i = [],
				r;
			for (r = 0; r < 16; r++) i[r] = e[r] ^ t[r];
			return i;
		},
		ta = (e) => {
			var t = [],
				i = [],
				r,
				n,
				a,
				s = [],
				o;
			for (r = 0; r < ne; r++)
				(n = [e[4 * r], e[4 * r + 1], e[4 * r + 2], e[4 * r + 3]]), (t[r] = n);
			for (r = ne; r < 4 * (xe + 1); r++) {
				for (t[r] = [], a = 0; a < 4; a++) i[a] = t[r - 1][a];
				for (
					r % ne === 0
						? ((i = Xn(ao(i))), (i[0] ^= uo[r / ne - 1]))
						: ne > 6 && r % ne === 4 && (i = Xn(i)),
						a = 0;
					a < 4;
					a++
				)
					t[r][a] = t[r - ne][a] ^ i[a];
			}
			for (r = 0; r < xe + 1; r++)
				for (s[r] = [], o = 0; o < 4; o++)
					s[r].push(
						t[r * 4 + o][0],
						t[r * 4 + o][1],
						t[r * 4 + o][2],
						t[r * 4 + o][3],
					);
			return s;
		},
		Xn = (e) => {
			for (var t = 0; t < 4; t++) e[t] = ur[e[t]];
			return e;
		},
		ao = (e) => {
			var t = e[0],
				i;
			for (i = 0; i < 3; i++) e[i] = e[i + 1];
			return (e[3] = t), e;
		},
		cr = (e, t) => {
			var i,
				r = [];
			for (i = 0; i < e.length; i += t) r[i / t] = Number.parseInt(e.substr(i, t), 16);
			return r;
		},
		so = (e) => {
			var t,
				i = [];
			for (t = 0; t < e.length; t++) i[e[t]] = t;
			return i;
		},
		oo = (e, t) => {
			var i, r;
			for (r = 0, i = 0; i < 8; i++)
				(r = (t & 1) === 1 ? r ^ e : r),
					(e = e > 127 ? 283 ^ (e << 1) : e << 1),
					(t >>>= 1);
			return r;
		},
		Ae = (e) => {
			var t,
				i = [];
			for (t = 0; t < 256; t++) i[t] = oo(e, t);
			return i;
		},
		ur = cr(
			"637c777bf26b6fc53001672bfed7ab76ca82c97dfa5947f0add4a2af9ca472c0b7fd9326363ff7cc34a5e5f171d8311504c723c31896059a071280e2eb27b27509832c1a1b6e5aa0523bd6b329e32f8453d100ed20fcb15b6acbbe394a4c58cfd0efaafb434d338545f9027f503c9fa851a3408f929d38f5bcb6da2110fff3d2cd0c13ec5f974417c4a77e3d645d197360814fdc222a908846eeb814de5e0bdbe0323a0a4906245cc2d3ac629195e479e7c8376d8dd54ea96c56f4ea657aae08ba78252e1ca6b4c6e8dd741f4bbd8b8a703eb5664803f60e613557b986c11d9ee1f8981169d98e949b1e87e9ce5528df8ca1890dbfe6426841992d0fb054bb16",
			2,
		),
		co = so(ur),
		uo = cr("01020408102040801b366cd8ab4d9a2f5ebc63c697356ad4b37dfaefc591", 2),
		vt = Ae(2),
		St = Ae(3),
		Et = Ae(9),
		Ct = Ae(11),
		kt = Ae(13),
		At = Ae(14),
		ia = (e, t, i) => {
			var r = eo(8),
				n = Yn(or(t, i), r),
				a = n.key,
				s = n.iv,
				o,
				c = [[83, 97, 108, 116, 101, 100, 95, 95].concat(r)];
			return (e = or(e, i)), (o = to(e, a, s)), (o = c.concat(o)), na.encode(o);
		},
		ra = (e, t, i) => {
			var r = na.decode(e),
				n = r.slice(8, 16),
				a = Yn(or(t, i), n),
				s = a.key,
				o = a.iv;
			return (r = r.slice(16, r.length)), (e = io(r, s, o, i)), e;
		},
		Qn = (e) => {
			function t(S, E) {
				return (S << E) | (S >>> (32 - E));
			}
			function i(S, E) {
				var P, N, B, M, I;
				return (
					(B = S & 2147483648),
					(M = E & 2147483648),
					(P = S & 1073741824),
					(N = E & 1073741824),
					(I = (S & 1073741823) + (E & 1073741823)),
					P & N
						? I ^ 2147483648 ^ B ^ M
						: P | N
							? I & 1073741824
								? I ^ 3221225472 ^ B ^ M
								: I ^ 1073741824 ^ B ^ M
							: I ^ B ^ M
				);
			}
			function r(S, E, P) {
				return (S & E) | (~S & P);
			}
			function n(S, E, P) {
				return (S & P) | (E & ~P);
			}
			function a(S, E, P) {
				return S ^ E ^ P;
			}
			function s(S, E, P) {
				return E ^ (S | ~P);
			}
			function o(S, E, P, N, B, M, I) {
				return (S = i(S, i(i(r(E, P, N), B), I))), i(t(S, M), E);
			}
			function c(S, E, P, N, B, M, I) {
				return (S = i(S, i(i(n(E, P, N), B), I))), i(t(S, M), E);
			}
			function l(S, E, P, N, B, M, I) {
				return (S = i(S, i(i(a(E, P, N), B), I))), i(t(S, M), E);
			}
			function h(S, E, P, N, B, M, I) {
				return (S = i(S, i(i(s(E, P, N), B), I))), i(t(S, M), E);
			}
			function f(S) {
				for (
					var E,
						P = S.length,
						N = P + 8,
						B = (N - (N % 64)) / 64,
						M = (B + 1) * 16,
						I = [],
						Ke = 0,
						oe = 0;
					oe < P;
				)
					(E = (oe - (oe % 4)) / 4),
						(Ke = (oe % 4) * 8),
						(I[E] = I[E] | (S[oe] << Ke)),
						oe++;
				return (
					(E = (oe - (oe % 4)) / 4),
					(Ke = (oe % 4) * 8),
					(I[E] = I[E] | (128 << Ke)),
					(I[M - 2] = P << 3),
					(I[M - 1] = P >>> 29),
					I
				);
			}
			function A(S) {
				var E,
					P,
					N = [];
				for (P = 0; P <= 3; P++) (E = (S >>> (P * 8)) & 255), (N = N.concat(E));
				return N;
			}
			var d = [],
				p,
				W,
				ae,
				se,
				fr,
				m,
				y,
				g,
				x,
				_ = cr(
					"67452301efcdab8998badcfe10325476d76aa478e8c7b756242070dbc1bdceeef57c0faf4787c62aa8304613fd469501698098d88b44f7afffff5bb1895cd7be6b901122fd987193a679438e49b40821f61e2562c040b340265e5a51e9b6c7aad62f105d02441453d8a1e681e7d3fbc821e1cde6c33707d6f4d50d87455a14eda9e3e905fcefa3f8676f02d98d2a4c8afffa39428771f6816d9d6122fde5380ca4beea444bdecfa9f6bb4b60bebfbc70289b7ec6eaa127fad4ef308504881d05d9d4d039e6db99e51fa27cf8c4ac5665f4292244432aff97ab9423a7fc93a039655b59c38f0ccc92ffeff47d85845dd16fa87e4ffe2ce6e0a30143144e0811a1f7537e82bd3af2352ad7d2bbeb86d391",
					8,
				);
			for (
				d = f(e), m = _[0], y = _[1], g = _[2], x = _[3], p = 0;
				p < d.length;
				p += 16
			)
				(W = m),
					(ae = y),
					(se = g),
					(fr = x),
					(m = o(m, y, g, x, d[p + 0], 7, _[4])),
					(x = o(x, m, y, g, d[p + 1], 12, _[5])),
					(g = o(g, x, m, y, d[p + 2], 17, _[6])),
					(y = o(y, g, x, m, d[p + 3], 22, _[7])),
					(m = o(m, y, g, x, d[p + 4], 7, _[8])),
					(x = o(x, m, y, g, d[p + 5], 12, _[9])),
					(g = o(g, x, m, y, d[p + 6], 17, _[10])),
					(y = o(y, g, x, m, d[p + 7], 22, _[11])),
					(m = o(m, y, g, x, d[p + 8], 7, _[12])),
					(x = o(x, m, y, g, d[p + 9], 12, _[13])),
					(g = o(g, x, m, y, d[p + 10], 17, _[14])),
					(y = o(y, g, x, m, d[p + 11], 22, _[15])),
					(m = o(m, y, g, x, d[p + 12], 7, _[16])),
					(x = o(x, m, y, g, d[p + 13], 12, _[17])),
					(g = o(g, x, m, y, d[p + 14], 17, _[18])),
					(y = o(y, g, x, m, d[p + 15], 22, _[19])),
					(m = c(m, y, g, x, d[p + 1], 5, _[20])),
					(x = c(x, m, y, g, d[p + 6], 9, _[21])),
					(g = c(g, x, m, y, d[p + 11], 14, _[22])),
					(y = c(y, g, x, m, d[p + 0], 20, _[23])),
					(m = c(m, y, g, x, d[p + 5], 5, _[24])),
					(x = c(x, m, y, g, d[p + 10], 9, _[25])),
					(g = c(g, x, m, y, d[p + 15], 14, _[26])),
					(y = c(y, g, x, m, d[p + 4], 20, _[27])),
					(m = c(m, y, g, x, d[p + 9], 5, _[28])),
					(x = c(x, m, y, g, d[p + 14], 9, _[29])),
					(g = c(g, x, m, y, d[p + 3], 14, _[30])),
					(y = c(y, g, x, m, d[p + 8], 20, _[31])),
					(m = c(m, y, g, x, d[p + 13], 5, _[32])),
					(x = c(x, m, y, g, d[p + 2], 9, _[33])),
					(g = c(g, x, m, y, d[p + 7], 14, _[34])),
					(y = c(y, g, x, m, d[p + 12], 20, _[35])),
					(m = l(m, y, g, x, d[p + 5], 4, _[36])),
					(x = l(x, m, y, g, d[p + 8], 11, _[37])),
					(g = l(g, x, m, y, d[p + 11], 16, _[38])),
					(y = l(y, g, x, m, d[p + 14], 23, _[39])),
					(m = l(m, y, g, x, d[p + 1], 4, _[40])),
					(x = l(x, m, y, g, d[p + 4], 11, _[41])),
					(g = l(g, x, m, y, d[p + 7], 16, _[42])),
					(y = l(y, g, x, m, d[p + 10], 23, _[43])),
					(m = l(m, y, g, x, d[p + 13], 4, _[44])),
					(x = l(x, m, y, g, d[p + 0], 11, _[45])),
					(g = l(g, x, m, y, d[p + 3], 16, _[46])),
					(y = l(y, g, x, m, d[p + 6], 23, _[47])),
					(m = l(m, y, g, x, d[p + 9], 4, _[48])),
					(x = l(x, m, y, g, d[p + 12], 11, _[49])),
					(g = l(g, x, m, y, d[p + 15], 16, _[50])),
					(y = l(y, g, x, m, d[p + 2], 23, _[51])),
					(m = h(m, y, g, x, d[p + 0], 6, _[52])),
					(x = h(x, m, y, g, d[p + 7], 10, _[53])),
					(g = h(g, x, m, y, d[p + 14], 15, _[54])),
					(y = h(y, g, x, m, d[p + 5], 21, _[55])),
					(m = h(m, y, g, x, d[p + 12], 6, _[56])),
					(x = h(x, m, y, g, d[p + 3], 10, _[57])),
					(g = h(g, x, m, y, d[p + 10], 15, _[58])),
					(y = h(y, g, x, m, d[p + 1], 21, _[59])),
					(m = h(m, y, g, x, d[p + 8], 6, _[60])),
					(x = h(x, m, y, g, d[p + 15], 10, _[61])),
					(g = h(g, x, m, y, d[p + 6], 15, _[62])),
					(y = h(y, g, x, m, d[p + 13], 21, _[63])),
					(m = h(m, y, g, x, d[p + 4], 6, _[64])),
					(x = h(x, m, y, g, d[p + 11], 10, _[65])),
					(g = h(g, x, m, y, d[p + 2], 15, _[66])),
					(y = h(y, g, x, m, d[p + 9], 21, _[67])),
					(m = i(m, W)),
					(y = i(y, ae)),
					(g = i(g, se)),
					(x = i(x, fr));
			return A(m).concat(A(y), A(g), A(x));
		};
	var na = (() => {
		var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			t = e.split(""),
			i = (n, a) => {
				var s = [],
					o = "",
					c,
					l,
					h = Math.floor((n.length * 16) / 3);
				for (c = 0; c < n.length * 16; c++)
					s.push(n[Math.floor(c / 16)][c % 16]);
				for (c = 0; c < s.length; c = c + 3)
					(o += t[s[c] >> 2]),
						(o += t[((s[c] & 3) << 4) | (s[c + 1] >> 4)]),
						s[c + 1] !== void 0
							? (o += t[((s[c + 1] & 15) << 2) | (s[c + 2] >> 6)])
							: (o += "="),
						s[c + 2] !== void 0 ? (o += t[s[c + 2] & 63]) : (o += "=");
				for (
					l =
						o.slice(0, 64) +
						`
`,
						c = 1;
					c < Math.ceil(o.length / 64);
					c++
				)
					l +=
						o.slice(c * 64, c * 64 + 64) +
						(Math.ceil(o.length / 64) === c + 1
							? ""
							: `
`);
				return l;
			},
			r = (n) => {
				n = n.replace(/\n/g, "");
				var a = [],
					s = [],
					o = [],
					c;
				for (c = 0; c < n.length; c = c + 4)
					(s[0] = e.indexOf(n.charAt(c))),
						(s[1] = e.indexOf(n.charAt(c + 1))),
						(s[2] = e.indexOf(n.charAt(c + 2))),
						(s[3] = e.indexOf(n.charAt(c + 3))),
						(o[0] = (s[0] << 2) | (s[1] >> 4)),
						(o[1] = ((s[1] & 15) << 4) | (s[2] >> 2)),
						(o[2] = ((s[2] & 3) << 6) | s[3]),
						a.push(o[0], o[1], o[2]);
				return (a = a.slice(0, a.length - (a.length % 16))), a;
			};
		return (
			typeof Array.indexOf == "function" && (e = t), { encode: i, decode: r }
		);
	})();
	var lo = {
			encode: (e, t = 2) =>
				e &&
				encodeURIComponent(
					e
						.split("")
						.map((i, r) =>
							r % t ? String.fromCharCode(i.charCodeAt(0) ^ t) : i,
						)
						.join(""),
				),
			decode: (e, t = 2) =>
				e &&
				decodeURIComponent(e)
					.split("")
					.map((i, r) => (r % t ? String.fromCharCode(i.charCodeAt(0) ^ t) : i))
					.join(""),
		},
		ho = {
			encode: (e) => e && encodeURIComponent(e),
			decode: (e) => e && decodeURIComponent(e),
		},
		po = {
			encode: (e) => e && encodeURIComponent(ia(e, "dynamic").substring(10)),
			decode: (e) => e && ra("U2FsdGVkX1" + decodeURIComponent(e), "dynamic"),
		},
		fo = { encode: (e) => e, decode: (e) => e },
		mo = {
			encode: (e) => e && decodeURIComponent(btoa(e)),
			decode: (e) => e && atob(e),
		};
	var Rt = class {
		constructor(t) {
			this.modules = new Mn(this);
			this.util = new $n(this);
			this.meta = new Un(this);
			this.regex = new Ue(this);
			this.rewrite = new Vn(this);
			this.url = new jn(this);
			this.is = new Wn(this);
			this.cookies = new Ge(this);
			this.client = new qe(this);
			this.encoding = lr;
			this.headers = Hn;
			this.listeners = [];
			t && !this.config && (this.config = t), t && this.util.encode(self);
		}
		on(t, i) {
			this.listeners.push({ event: t, cb: i });
		}
		fire(t, i) {
			let r = !1;
			for (const n of this.listeners)
				n.event === t && (i = ((r = !0), n.cb(...i)));
			return r && i ? i : null;
		}
	};
	function hr(e, t) {
		t || (t = e.__dynamic),
			(t.define = new e.Proxy(e.Object.defineProperty, {
				apply(i, r, n) {
					try {
						return Reflect.apply(i, r, n);
					} catch {
						return n[2];
					}
				},
			})),
			(t.defines = new e.Proxy(e.Object.defineProperties, {
				apply(i, r, n) {
					try {
						return Reflect.apply(i, r, n);
					} catch {
						return n[1];
					}
				},
			})),
			e.parent && (t.parent = e.parent),
			e.top && (t.top = e.top),
			e.document &&
				((t.elements = {
					attributes: [
						"src",
						"href",
						"srcset",
						"action",
						"data",
						"integrity",
						"nonce",
						"imagesrcset",
					],
					iframeSrc: Object.getOwnPropertyDescriptor(
						e.HTMLIFrameElement.prototype,
						"src",
					),
					contentWindow: Object.getOwnPropertyDescriptor(
						e.HTMLIFrameElement.prototype,
						"contentWindow",
					),
					innerHTML: Object.getOwnPropertyDescriptor(
						e.Element.prototype,
						"innerHTML",
					),
					outerHTML: Object.getOwnPropertyDescriptor(
						e.Element.prototype,
						"outerHTML",
					),
					attrValue: Object.getOwnPropertyDescriptor(e.Attr.prototype, "value"),
					setAttribute: e.Element.prototype.setAttribute,
					getAttribute: e.Element.prototype.getAttribute,
					removeAttribute: e.Element.prototype.removeAttribute,
					hasAttribute: e.Element.prototype.hasAttribute,
					cloneNode: e.Node.prototype.cloneNode,
					addEventListener: e.Node.prototype.addEventListener,
					config: [
						{
							elements: [
								e.HTMLScriptElement,
								e.HTMLIFrameElement,
								e.HTMLEmbedElement,
								e.HTMLInputElement,
								e.HTMLTrackElement,
								e.HTMLMediaElement,
								e.HTMLSourceElement,
								e.Image,
								e.HTMLImageElement,
							],
							tags: ["src"],
							action: "url",
						},
						{
							elements: [e.HTMLSourceElement, e.HTMLImageElement],
							tags: ["srcset"],
							action: "srcset",
						},
						{
							elements: [
								e.HTMLAnchorElement,
								e.HTMLLinkElement,
								e.HTMLAreaElement,
								e.SVGImageElement,
								e.HTMLBaseElement,
							],
							tags: ["href"],
							action: "url",
						},
						{
							elements: [e.HTMLIFrameElement],
							tags: ["contentWindow", "contentDocument"],
							action: "window",
						},
						{ elements: [e.HTMLFormElement], tags: ["action"], action: "url" },
						{ elements: [e.HTMLObjectElement], tags: ["data"], action: "url" },
						{
							elements: [e.HTMLScriptElement, e.HTMLLinkElement],
							tags: ["integrity"],
							action: "rewrite",
							new: "nointegrity",
						},
						{
							elements: [e.HTMLScriptElement, e.HTMLLinkElement],
							tags: ["nonce"],
							action: "rewrite",
							new: "nononce",
						},
						{
							elements: [e.HTMLIFrameElement],
							tags: ["srcdoc"],
							action: "html",
						},
						{ elements: [e.HTMLElement], tags: ["style"], action: "css" },
						{
							elements: [e.HTMLLinkElement],
							tags: ["imageSrcset"],
							action: "srcset",
						},
					],
					createGetter: (i) => ({
						get() {
							return new URL(this.href || e.__dynamic$location.href)[i];
						},
						set(r) {},
					}),
					client: It,
				}),
				(e.__dynamic.baseURL = e.document
					? new URL(e.__dynamic.url.decode(e.document.baseURI))
					: null)),
			e.document &&
				(t.cookie = {
					str: e.__dynamic$cookie || "",
					desc: Object.getOwnPropertyDescriptor(e.Document.prototype, "cookie"),
				}),
			e.XMLHttpRequest &&
				(t.http = {
					XMLResponseURL: Object.getOwnPropertyDescriptor(
						e.XMLHttpRequest.prototype,
						"responseURL",
					),
					ResponseURL: Object.getOwnPropertyDescriptor(
						e.Response.prototype,
						"url",
					),
					RequestURL: Object.getOwnPropertyDescriptor(
						e.Request.prototype,
						"url",
					),
					XMLHttpRequest: e.XMLHttpRequest,
				}),
			e.Storage &&
				((t.storage = {
					localStorage: e.localStorage,
					sessionStorage: e.sessionStorage,
					keys: {
						localStorage: Object.keys(e.localStorage),
						sessionStorage: Object.keys(e.sessionStorage),
					},
					methods: [
						"getItem",
						"setItem",
						"removeItem",
						"clear",
						"length",
						"keys",
						"values",
						"entries",
						"forEach",
						"hasOwnProperty",
						"toString",
						"toLocaleString",
						"valueOf",
						"isPrototypeOf",
						"propertyIsEnumerable",
						"constructor",
						"key",
					],
				}),
				(t.storage.cloned = {
					localStorage: t.util.clone(t.storage.localStorage),
					sessionStorage: t.util.clone(t.storage.sessionStorage),
				})),
			e.RTCPeerConnection &&
				(t.webrtc = { endpoints: ["stun:stun.webice.org"] }),
			e.trustedTypes &&
				(t.trustedTypes = {
					policy: e.trustedTypes.createPolicy("dynamic", {
						createHTML: (i) => i,
						createScript: (i) => i,
						createScriptURL: (i) => i,
						createURL: (i) => i,
					}),
					createScript: e.TrustedTypePolicy.prototype.createScript,
				}),
			e.__dynamic$config.tab &&
				(e.document &&
					e.__dynamic$config.tab.title &&
					((document.title = e.__dynamic$config.tab.title),
					t.define(e.document, "title", {
						get() {
							return e.__dynamic$config.tab.title;
						},
						set(i) {
							return i;
						},
					})),
				e.__dynamic$config.tab.icon &&
					(e.__dynamic$icon = e.__dynamic$config.tab.icon),
				e.Navigator &&
					e.__dynamic$config.tab.ua &&
					t.define(e.navigator, "userAgent", {
						get() {
							return e.__dynamic$config.tab.ua;
						},
						set() {},
					}));
	}
	function pr(e) {
		e.__dynamic.wrap = (t, i, r) => {
			if (t.__dynamic$target) return t;
			if (t.toString().includes("{ [native code] }") && !t.prototype) {
				var n = i,
					a = t,
					s = function (...c) {
						if (typeof r == "string") {
							var l = e.__dynamic.fire(r, this ? [this, ...c] : c);
							if (l) return l;
						}
						var h = n.call(this, a, ...c);
						return h;
					},
					o = function (...c) {
						return s.call(this, ...c);
					};
				return (
					e.__dynamic.define(o, "name", { value: t.name, writable: !1 }),
					(o.__dynamic$target = t),
					(o.toString = () => `function ${t.name}() { [native code] }`),
					o
				);
			} else
				try {
					const c = class extends t {
						constructor(...l) {
							var h = [...l],
								f = i.call(t, t, ...l);
							f && (l = f), super(...l), r && r(this, h);
						}
					};
					return (
						Object.defineProperty(c, "name", { value: t.name, writable: !1 }), c
					);
				} catch {
					return t;
				}
		};
	}
	function It(e, t = {}, i = "") {
		if (e.hasOwnProperty("__dynamic")) return !1;
		e.hasOwnProperty("__dynamic$config") || (e.__dynamic$config = t),
			e.parent?.__dynamic && (e.__dynamic$bare = e.parent.__dynamic$bare);
		const r = new Rt(e.__dynamic$config);
		(r.config.bare.path =
			typeof r.config.bare.path == "string" || r.config.bare.path instanceof URL
				? [new URL(r.config.bare.path, e.location)][0]
				: r.config.bare.path.map((a) => new URL(a, e.location))),
			(e.__dynamic$baseURL =
				i ||
				e.__dynamic$url ||
				r.url.decode(location.pathname + location.search + location.hash) ||
				""),
			(e.__dynamic = r),
			(e.__dynamic.bare = new e.__dynamic.modules.bare.BareClient(
				e.__dynamic$config.bare.path,
				e.__dynamic$bare,
			)),
			e.__dynamic.meta.load(new URL(e.__dynamic$baseURL)),
			hr(e, null),
			pr(e);
		for (var n of e.__dynamic.client.methods) {
			const a = n.name,
				s = Object.entries(e.__dynamic.client).find((o) => o[0] == a);
			(a == "mutation" && e.frameElement) || (n.function == "self" && s[1](e));
		}
		return e;
	}
	var Fl = It(self);
})();
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=client.js.map
