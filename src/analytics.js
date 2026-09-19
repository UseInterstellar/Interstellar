import express from "express";

export function mountAnalytics(app, analytics) {
  const { id, loader, transport, sink, param, key } = analytics;
  let cached = null;

  const unpack = value => {
    const raw = Buffer.from(String(value).replace(/-/g, "+").replace(/_/g, "/"), "base64");
    return Buffer.from(raw.map((byte, index) => byte ^ key[index % key.length])).toString("utf8");
  };

  const requestHook = `(function(){var B=location.origin+${JSON.stringify(transport)}+"/g/collect",S=${JSON.stringify(sink)},P=${JSON.stringify(param)},K=${JSON.stringify(key)};
function pack(s){var o="";for(var i=0;i<s.length;i++)o+=String.fromCharCode(s.charCodeAt(i)^K[i%K.length]);return btoa(o).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,"")}
function re(u){try{u=String(u);if(u.indexOf(B)!==0)return null;var q=u.indexOf("?");return S+"?"+P+"="+pack(q<0?"":u.slice(q+1))}catch(e){return null}}
var sb=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);if(sb)navigator.sendBeacon=function(u,d){return sb(re(u)||u,d)};
var of=window.fetch;if(of)window.fetch=function(u,o){if(typeof u==="string"){var r=re(u);if(r)u=r}return of.call(this,u,o)};
var xo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){var a=[].slice.call(arguments);a[1]=re(u)||u;return xo.apply(this,a)}})();\n`;

  app.get(loader, async (_req, res) => {
    try {
      if (!cached || Date.now() - cached.at > 3600000) {
        const upstream = await fetch(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
        if (!upstream.ok) return res.sendStatus(502);
        const body = await upstream.text();
        const boot = `\n;window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config",${JSON.stringify(id)},{transport_url:location.origin+${JSON.stringify(transport)}});`;
        cached = { at: Date.now(), body: requestHook + body + boot };
      }
      res.type("text/javascript").set("Cache-Control", "public, max-age=900").send(cached.body);
    } catch {
      res.sendStatus(502);
    }
  });

  app.all(sink, express.raw({ type: "*/*", limit: "64kb" }), async (req, res) => {
    try {
      const target = new URL("https://www.google-analytics.com/g/collect");
      target.search = unpack(req.query[param] ?? "");
      const upstream = await fetch(target, {
        method: req.method === "GET" ? "GET" : "POST",
        headers: {
          "User-Agent": req.get("user-agent") ?? "",
          "X-Forwarded-For": req.ip,
          ...(req.get("content-type") ? { "Content-Type": req.get("content-type") } : {}),
        },
        body: req.method === "GET" || !req.body?.length ? undefined : req.body,
      });
      res.status(upstream.status).send(Buffer.from(await upstream.arrayBuffer()));
    } catch {
      res.sendStatus(204);
    }
  });
}
