import express from "express";

const GTAG_URL = "https://www.googletagmanager.com/gtag/js";
const COLLECT_URL = "https://www.google-analytics.com/g/collect";
const CACHE_MS = 3600000;
const MAX_PACKED_LENGTH = 8192;
const PACKED_PATTERN = /^[A-Za-z0-9_-]*$/;

export function mountAnalytics(app, analytics) {
  const { id, loader, transport, sink, param, key } = analytics;
  let cached = null;
  const decoder = new TextDecoder("utf-8", { fatal: true });

  const unpack = value => {
    const raw = Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64");
    return decoder.decode(raw.map((byte, index) => byte ^ key[index % key.length]));
  };

  const requestHook = `(function(){var B=${JSON.stringify(`${transport}/g/collect`)},S=${JSON.stringify(sink)},P=${JSON.stringify(param)},K=${JSON.stringify(key)};
function pack(s){var b=new TextEncoder().encode(s),o="";for(var i=0;i<b.length;i++)o+=String.fromCharCode(b[i]^K[i%K.length]);return btoa(o).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,"")}
function re(u){try{var l=new URL(String(u),location.href);if(l.origin!==location.origin||l.pathname!==B)return null;return location.origin+S+"?"+P+"="+pack(l.search.slice(1))}catch(e){return null}}
var sb=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);if(sb)navigator.sendBeacon=function(u,d){return sb(re(u)||u,d)};
var of=window.fetch;if(of)window.fetch=function(u,o){if(typeof Request!=="undefined"&&u instanceof Request){var r=re(u.url);if(!r)return of.call(this,u,o);var bodyless=u.method==="GET"||u.method==="HEAD";return (bodyless?Promise.resolve(null):u.arrayBuffer()).then(function(b){return of.call(window,new Request(r,{method:u.method,headers:u.headers,body:b,credentials:u.credentials,cache:u.cache,referrerPolicy:u.referrerPolicy,redirect:u.redirect,integrity:u.integrity,keepalive:u.keepalive,signal:u.signal}),o)})}return of.call(this,re(u)||u,o)};
var xo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){var a=[].slice.call(arguments);a[1]=re(u)||u;return xo.apply(this,a)}})();\n`;

  app.get(loader, async (_req, res) => {
    if (!cached || Date.now() - cached.at > CACHE_MS) {
      try {
        const upstream = await fetch(`${GTAG_URL}?id=${encodeURIComponent(id)}`);
        if (!upstream.ok) throw new Error(`gtag.js responded with ${upstream.status}`);
        const body = await upstream.text();
        if (!body) throw new Error("gtag.js responded with an empty body");
        const boot = `\n;window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config",${JSON.stringify(id)},{transport_url:location.origin+${JSON.stringify(transport)}});`;
        cached = { at: Date.now(), body: requestHook + body + boot };
      } catch (error) {
        console.error(`[analytics] could not fetch gtag.js for ${id}: ${error.message}`);
        if (!cached) return res.sendStatus(502);
      }
    }
    res.type("text/javascript").set("Cache-Control", "public, max-age=900").send(cached.body);
  });

  const forward = async (req, res, search) => {
    if (req.method !== "GET" && req.method !== "POST") return res.sendStatus(405);

    const target = new URL(COLLECT_URL);
    target.search = search;

    const headers = {};
    const userAgent = req.get("user-agent");
    const contentType = req.get("content-type");
    if (userAgent) headers["User-Agent"] = userAgent;
    if (contentType) headers["Content-Type"] = contentType;
    const hasBody = req.method === "POST" && Buffer.isBuffer(req.body) && req.body.length > 0;

    try {
      const upstream = await fetch(target, { method: req.method, headers, body: hasBody ? req.body : undefined });
      res.status(upstream.status).send(Buffer.from(await upstream.arrayBuffer()));
    } catch (error) {
      console.error(`[analytics] forwarding ${req.method} collect request failed: ${error.message}`);
      res.sendStatus(502);
    }
  };

  app.all(sink, express.raw({ type: "*/*", limit: "64kb" }), async (req, res) => {
    const packed = req.query[param];
    if (typeof packed !== "string" || packed.length > MAX_PACKED_LENGTH || !PACKED_PATTERN.test(packed)) return res.sendStatus(400);

    let query;
    try {
      query = unpack(packed);
    } catch {
      return res.sendStatus(400);
    }
    await forward(req, res, query);
  });

  app.all(`${transport}/g/collect`, express.raw({ type: "*/*", limit: "64kb" }), async (req, res) => {
    await forward(req, res, new URL(req.originalUrl, "http://localhost").search);
  });
}
