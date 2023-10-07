(() => {
    "use strict";
    let e = self.Ultraviolet,
        t = ["cross-origin-embedder-policy", "cross-origin-opener-policy", "cross-origin-resource-policy", "content-security-policy", "content-security-policy-report-only", "expect-ct", "feature-policy", "origin-isolation", "strict-transport-security", "upgrade-insecure-requests", "x-content-type-options", "x-download-options", "x-frame-options", "x-permitted-cross-domain-policies", "x-powered-by", "x-xss-protection"],
        r = ["GET", "HEAD"];
    class i extends e.EventEmitter {
        constructor(t = __uv$config) {
            super(), t.bare || (t.bare = "/bare/"), t.prefix || (t.prefix = "/service/"), this.config = t;
            let r = (Array.isArray(t.bare) ? t.bare : [t.bare]).map(e => new URL(e, location).toString());
            this.address = r[~~(Math.random() * r.length)], this.bareClient = new e.BareClient(this.address)
        }
        async fetch({
            request: i
        }) {
            let n;
            try {
                if (!i.url.startsWith(location.origin + this.config.prefix)) return await fetch(i);
                let l = new e(this.config, this.address);
                "function" == typeof this.config.construct && this.config.construct(l, "service");
                let c = await l.cookie.db();
                l.meta.origin = location.origin, l.meta.base = l.meta.url = new URL(l.sourceUrl(i.url));
                let d = new o(i, this, l, r.includes(i.method.toUpperCase()) ? null : await i.blob());
                if ("blob:" === l.meta.url.protocol && (d.blob = !0, d.base = d.url = new URL(d.url.pathname)), i.referrer && i.referrer.startsWith(location.origin)) {
                    let e = new URL(l.sourceUrl(i.referrer));
                    (d.headers.origin || l.meta.url.origin !== e.origin && "cors" === i.mode) && (d.headers.origin = e.origin), d.headers.referer = e.href
                }
                let h = await l.cookie.getCookies(c) || [],
                    u = l.cookie.serialize(h, l.meta, !1);
                d.headers["user-agent"] = navigator.userAgent, u && (d.headers.cookie = u);
                let m = new a(d, null, null);
                if (this.emit("request", m), m.intercepted) return m.returnValue;
                n = d.blob ? "blob:" + location.origin + d.url.pathname : d.url;
                let p = await this.bareClient.fetch(n, {
                        headers: d.headers,
                        method: d.method,
                        body: d.body,
                        credentials: d.credentials,
                        mode: location.origin !== d.address.origin ? "cors" : d.mode,
                        cache: d.cache,
                        redirect: d.redirect
                    }),
                    f = new s(d, p),
                    b = new a(f, null, null);
                if (this.emit("beforemod", b), b.intercepted) return b.returnValue;
                for (let e of t) f.headers[e] && delete f.headers[e];
                if (f.headers.location && (f.headers.location = l.rewriteUrl(f.headers.location)), "document" === i.destination) {
                    let e = f.headers["content-disposition"];
                    if (!/\s*?((inline|attachment);\s*?)filename=/i.test(e)) {
                        let t = /^\s*?attachment/i.test(e) ? "attachment" : "inline",
                            [r] = new URL(p.finalURL).pathname.split("/").slice(-1);
                        f.headers["content-disposition"] = `${t}; filename=${JSON.stringify(r)}`
                    }
                }
                if (f.headers["set-cookie"] && (Promise.resolve(l.cookie.setCookies(f.headers["set-cookie"], c, l.meta)).then(() => {
                        self.clients.matchAll().then(function(e) {
                            e.forEach(function(e) {
                                e.postMessage({
                                    msg: "updateCookies",
                                    url: l.meta.url.href
                                })
                            })
                        })
                    }), delete f.headers["set-cookie"]), f.body) switch (i.destination) {
                    case "script":
                    case "worker": {
                        let e = [l.bundleScript, l.clientScript, l.configScript, l.handlerScript].map(e => JSON.stringify(e)).join(",");
                        f.body = `if (!self.__uv && self.importScripts) { ${l.createJsInject(this.address,this.bareClient.manfiest,l.cookie.serialize(h,l.meta,!0),i.referrer)} importScripts(${e}); }
`, f.body += l.js.rewrite(await p.text())
                    }
                    break;
                    case "style":
                        f.body = l.rewriteCSS(await p.text());
                        break;
                    case "iframe":
                    case "document":
                        (function(t, r = "") {
                            return "text/html" === (e.mime.contentType(r || t.pathname) || "text/html").split(";")[0]
                        })(l.meta.url, f.headers["content-type"] || "") && (f.body = l.rewriteHtml(await p.text(), {
                            document: !0,
                            injectHead: l.createHtmlInject(l.handlerScript, l.bundleScript, l.clientScript, l.configScript, this.address, this.bareClient.manfiest, l.cookie.serialize(h, l.meta, !0), i.referrer)
                        }))
                }
                return "text/event-stream" === d.headers.accept && (f.headers["content-type"] = "text/event-stream"), crossOriginIsolated && (f.headers["Cross-Origin-Embedder-Policy"] = "require-corp"), this.emit("response", b), b.intercepted ? b.returnValue : new Response(f.body, {
                    headers: f.headers,
                    status: f.status,
                    statusText: f.statusText
                })
            } catch (a) {
                var l, c;
                let e, t, r, s, o;
                return ["document", "iframe"].includes(i.destination) ? (console.error(a), l = n, c = this.address, o = "", a instanceof Error && "object" == typeof a.body ? (e = a.status, t = "Error communicating with the Bare server", s = a.body.message, r = a.body.code, o = a.body.id) : (e = 500, t = "Error processing your request", s = "Internal Server Error", r = a instanceof Error ? a.name : "UNKNOWN"), new Response(function(e, t, r, i, s, o, a) {
                    if ("The specified host could not be resolved." === i) return function(e, t) {
                        let r = new URL(e),
                            i = `remoteHostname.textContent = ${JSON.stringify(r.hostname)};bareServer.href = ${JSON.stringify(t)};uvHostname.textContent = ${JSON.stringify(location.hostname)};reload.addEventListener("click", () => location.reload());uvVersion.textContent = ${JSON.stringify("2.0.0")};`;
                        return `<!DOCTYPE html><html><head><meta charset='utf-8' /><title>Error</title></head><body><h1>This site can’t be reached</h1><hr /><p><b id="remoteHostname"></b>’s server IP address could not be found.</p><p>Try:</p><ul><li>Verifying you entered the correct address</li><li>Clearing the site data</li><li>Contacting <b id="uvHostname"></b>'s administrator</li><li>Verifying the <a id='bareServer' title='Bare server'>Bare server</a> isn't censored</li></ul><button id="reload">Reload</button><hr /><p><i>Ultraviolet v<span id="uvVersion"></span></i></p><script src="${"data:application/javascript,"+encodeURIComponent(i)}"></script></body></html>`
                    }(o, a);
                    let n = `errorTitle.textContent = ${JSON.stringify(e)};errorCode.textContent = ${JSON.stringify(t)};` + (r ? `errorId.textContent = ${JSON.stringify(r)};` : "") + `errorMessage.textContent =  ${JSON.stringify(i)};` + `errorTrace.value = ${JSON.stringify(s)};` + `fetchedURL.textContent = ${JSON.stringify(o)};` + `bareServer.href = ${JSON.stringify(a)};` + `for (const node of document.querySelectorAll("#uvHostname")) node.textContent = ${JSON.stringify(location.hostname)};reload.addEventListener("click", () => location.reload());` + `uvVersion.textContent = ${JSON.stringify("2.0.0")};`;
                    return '<!DOCTYPE html><html><head><meta charset=\'utf-8\' /><title>Error</title></head><body><h1 id=\'errorTitle\'></h1><hr /><p>Failed to load <b id="fetchedURL"></b></p><p id="errorMessage"></p><table><tbody><tr><td>Code:</td><td id="errorCode"></td></tr>' + (r ? '<tr><td>ID:</td><td id="errorId"></td></tr>' : "") + '</tbody></table><textarea id="errorTrace" cols="40" rows="10" readonly></textarea><p>Try:</p><ul><li>Checking your internet connection</li><li>Verifying you entered the correct address</li><li>Clearing the site data</li><li>Contacting <b id="uvHostname"></b>\'s administrator</li><li>Verify the <a id=\'bareServer\' title=\'Bare server\'>Bare server</a> isn\'t censored</li></ul><p>If you\'re the administrator of <b id="uvHostname"></b>, try:</p><ul><li>Restarting your Bare server</li><li>Updating Ultraviolet</li><li>Troubleshooting the error on the <a href="https://github.com/titaniumnetwork-dev/Ultraviolet" target="_blank">GitHub repository</a></li></ul><button id="reload">Reload</button><hr /><p><i>Ultraviolet v<span id="uvVersion"></span></i></p>' + `<script src="${"data:application/javascript,"+encodeURIComponent(n)}"></script></body></html>`
                }(t, r, o, s, String(a), l, c), {
                    status: e,
                    headers: {
                        "content-type": "text/html"
                    }
                })) : new Response(void 0, {
                    status: 500
                })
            }
        }
        static Ultraviolet = e
    }
    self.UVServiceWorker = i;
    class s {
        constructor(e, t) {
            for (let r in this.request = e, this.raw = t, this.ultraviolet = e.ultraviolet, this.headers = {}, t.rawHeaders) this.headers[r.toLowerCase()] = t.rawHeaders[r];
            this.status = t.status, this.statusText = t.statusText, this.body = t.body
        }
        get url() {
            return this.request.url
        }
        get base() {
            return this.request.base
        }
        set base(e) {
            this.request.base = e
        }
    }
    class o {
        constructor(e, t, r, i = null) {
            this.ultraviolet = r, this.request = e, this.headers = Object.fromEntries(e.headers.entries()), this.method = e.method, this.address = t.address, this.body = i || null, this.cache = e.cache, this.redirect = e.redirect, this.credentials = "omit", this.mode = "cors" === e.mode ? e.mode : "same-origin", this.blob = !1
        }
        get url() {
            return this.ultraviolet.meta.url
        }
        set url(e) {
            this.ultraviolet.meta.url = e
        }
        get base() {
            return this.ultraviolet.meta.base
        }
        set base(e) {
            this.ultraviolet.meta.base = e
        }
    }
    class a {
        #e;
        #t;
        constructor(e = {}, t = null, r = null) {
            this.#e = !1, this.#t = null, this.data = e, this.target = t, this.that = r
        }
        get intercepted() {
            return this.#e
        }
        get returnValue() {
            return this.#t
        }
        respondWith(e) {
            this.#t = e, this.#e = !0
        }
    }
})();