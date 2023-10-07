let bareServer = "tomp.app";
importScripts("/sw/uv/uv.bundle.js"), importScripts("/sw/uv/uv.config.js"), importScripts("/sw/uv/uv.sw.js"), importScripts("/sw/dynamic/dynamic.config.js"), importScripts("/sw/dynamic/dynamic.worker.js"), addEventListener("install", async function(t) {
    t.waitUntil(self.skipWaiting());
    let e = await caches.open("astro-scripts");
    e.keys().then(async t => {
        for (var {
                url: r
            }
            of t) {
            let t = await e.match(r),
                i = await t.text();
            (0, eval)(`let moduleID = "${r.split("/").pop().split(".")[0]}";
` + i)
        }
    })
}), addEventListener("activate", function(t) {
    t.waitUntil(self.clients.claim())
});
const warn = (t, e, r, i) => console.warn(`%c[%cWORKER ERROR%c] %c${t}
%c[%cAT%c] %c${e||"UNKNOWN"}:${r||"UNKNOWN"}:${i||"UNKNOWN"}`, "color: white; font-weight: bold;", "color: red; font-weight: bold;", "color: white; font-weight: bold;", "font-weight: 100; color: white", "color: white; font-weight: bold;", "color: red; font-weight: bold;", "color: white; font-weight: bold;", "font-weight: 100; color: white"),
    oglist = self.onerror;
self.onerror = function(t, e, r, i, a) {
    return oglist && oglist(...arguments), warn(a.toString(), e, r, i), !0
};
const ogrej = self.onunhandledrejection;
self.onunhandledrejection = function(t, e, r, i, a) {
    return ogrej && ogrej(...arguments), warn(t.reason.toString(), t.stack, "", ""), !0
};
const p = new Promise(async t => {
    let e = await caches.open("astro-data");
    await e.match("/bare.txt") && (bareServer = await (await e.match("/bare.txt")).text());
    try {
        let t = await fetch("http://" + bareServer.replace(/\/$/, "") + "/", {
            redirect: "follow"
        });
        self.__uv$config.bare = t.url, self.__dynamic$config.bare.path = t.url
    } catch {}
    navigator.onLine && (self.dynamic = new Dynamic(self.__dynamic$config), self.uv = new UVServiceWorker(self.__uv$config)), t(await caches.open("astro-cache"))
});
addEventListener("message", async t => {
    "updateCloak" == t.data && self.clients.matchAll().then(e => {
        for (var r of e) r.id != t.source.id && r.postMessage("updateCloak")
    })
}), addEventListener("fetch", function(t) {
    t.respondWith(async function() {
        try {
            let r = await p;
            if (await r.match(t.request.url)) return await r.match(t.request.url);
            if (t.request.url.endsWith("?sw=ignore")) return await fetch(t.request);
            if (navigator.onLine) {
                if (t.request.url.startsWith(location.origin + "/~/uv/")) return await self.uv.fetch(t);
                if (await self.dynamic.route(t)) return await self.dynamic.fetch(t)
            } else if (t.request.url.startsWith(location.origin + "/~/")) return new Response("Offline", {
                status: 500
            });
            if ("font" === t.request.destination || "image" === t.request.destination && t.request.url.startsWith(location.origin + "/icons/games/") || t.request.url.startsWith(location.origin + "/_astro/")) {
                var e;
                let i = await r.match(t.request.url) || (e = await fetch(t.request), await r.put(t.request.url, e.clone()), e);
                return i
            }
            return await fetch(t.request)
        } catch (e) {
            return onerror("", t.request.url, "", "", e), new Response(e.toString(), {
                status: 500
            })
        }
    }())
});