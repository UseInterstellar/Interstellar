import { existsSync } from "node:fs";
import http from "node:http";
import { createRequire } from "node:module";
import path from "node:path";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import express from "express";
import basicAuth from "express-basic-auth";
import rateLimit from "express-rate-limit";
import mime from "mime";
import config from "./config.js";

console.log(chalk.yellow("🚀 Starting server..."));

const require = createRequire(import.meta.url);
const __dirname = process.cwd();

const DIST_DIR = path.join(__dirname, "dist");
const STATIC_DIR = path.join(__dirname, "static");

const VENDOR_MAP_PATH = path.join(DIST_DIR, ".runtime", "vendor-map.cjs");
const vendorMap = existsSync(VENDOR_MAP_PATH) ? require(VENDOR_MAP_PATH) : null;

const SERVE_DIR = vendorMap ? DIST_DIR : STATIC_DIR;
console.log(chalk.blue(`Serving from ${path.relative(__dirname, SERVE_DIR)}/`));
if (vendorMap) {
  console.log(chalk.blue(`Build ${vendorMap.build}, proxy scope ${vendorMap.scopes.uv}, scramjet ${vendorMap.scopes.scramjet}`));
} else if (existsSync(DIST_DIR)) {
  console.log(chalk.yellow("dist/ exists but has no .runtime/vendor-map.cjs, run `pnpm build`. Falling back to static/."));
}

const server = http.createServer();
const app = express();
const PORT = process.env.PORT || 8080;

wisp.options.allow_loopback_ips = true;
wisp.options.allow_private_ips = true;

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

const ghGamesLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

if (config.challenge !== false) {
  console.log(chalk.green("🔒 Password protection is enabled! Listing logins below"));
  Object.entries(config.users).forEach(([username, password]) => {
    console.log(chalk.blue(`Username: ${username}, Password: ${password}`));
  });
  app.use(basicAuth({ users: config.users, challenge: true }));
}

const ghGamesBases = {
  "/gh-games/1/": "https://raw.githubusercontent.com/qrs/x/fixy/",
  "/gh-games/2/": "https://raw.githubusercontent.com/3v1/V5-Assets/main/",
  "/gh-games/3/": "https://raw.githubusercontent.com/3v1/V5-Retro/master/",
  "/gh-games/4/": "https://raw.githubusercontent.com/xbubbo/V6-Assets/main/",
};
const noMimeExts = new Set([".unityweb"]);

app.get("/gh-games/:path(*)", ghGamesLimiter, async (req, res, next) => {
  try {
    const reqPath = "/gh-games/" + req.params.path;
    let reqTarget;
    for (const [prefix, baseUrl] of Object.entries(ghGamesBases)) {
      if (reqPath.startsWith(prefix)) {
        reqTarget = baseUrl + reqPath.slice(prefix.length);
        break;
      }
    }
    if (!reqTarget) return next();

    const upstreamHeaders = {};
    if (req.headers["if-none-match"]) {
      upstreamHeaders["If-None-Match"] = req.headers["if-none-match"];
    }

    const asset = await fetch(reqTarget, { headers: upstreamHeaders });

    if (asset.status === 304) return res.sendStatus(304);
    if (!asset.ok) return next();

    const data = Buffer.from(await asset.arrayBuffer());
    const ext = path.extname(reqTarget);
    const contentType = noMimeExts.has(ext) ? "application/octet-stream" : mime.getType(ext);

    const etag = asset.headers.get("etag");
    const lastModified = asset.headers.get("last-modified");

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      ...(etag && { ETag: etag }),
      ...(lastModified && { "Last-Modified": lastModified }),
    });
    res.end(data);
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).type("text/html").send("Error fetching the asset");
  }
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jsStaticOptions = {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath);
    if (ext === ".js" || ext === ".mjs") {
      res.type("text/javascript");
      res.setHeader("Service-Worker-Allowed", "/");
    } else if (ext === ".wasm") {
      res.type("application/wasm");
    }
  },
};

app.use("/.runtime", (_req, res) => {
  res.sendStatus(404);
});

if (vendorMap?.analytics) {
  const { id, loader, transport, sink, param, key } = vendorMap.analytics;
  let cached = null;

  const unpack = value => {
    const raw = Buffer.from(String(value).replace(/-/g, "+").replace(/_/g, "/"), "base64");
    return Buffer.from(raw.map((byte, index) => byte ^ key[index % key.length])).toString("utf8");
  };

  // gtag builds its own URL and always ends it with /g/collect?v=2&tid=G-..., so the
  // recognizable shape can only be removed after gtag hands the request to the browser.
  // These wrappers pass everything that is not a collect hit straight through.
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
        // Bootstrapping here rather than inline in the page is what keeps the measurement
        // id out of the HTML. transport_url sends hits to our own origin.
        const boot = `\n;window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config",${JSON.stringify(id)},{transport_url:location.origin+${JSON.stringify(transport)}});`;
        // Hook first: gtag captures its transport references as it initialises.
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

app.use(express.static(SERVE_DIR, { ...jsStaticOptions, dotfiles: "ignore" }));

if (!vendorMap) {
  const { epoxyPath } = require("@mercuryworkshop/epoxy-transport");
  const { baremuxPath } = require("@mercuryworkshop/bare-mux/node");
  const { libcurlPath } = require("@mercuryworkshop/libcurl-transport");
  const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");
  const { scramjetPath } = require("@mercuryworkshop/scramjet/path");

  app.use("/epoxy/", express.static(epoxyPath));
  app.use("/libcurl/", express.static(libcurlPath));
  app.use("/baremux/", express.static(baremuxPath));
  app.use("/assets/ultraviolet/", express.static(uvPath, jsStaticOptions));
  app.use("/assets/scramjet/", express.static(scramjetPath, jsStaticOptions));
}

const routes = [
  { path: "/apps", file: "apps.html" },
  { path: "/games", file: "games.html" },
  { path: "/play.html", file: "games.html" },
  { path: "/settings", file: "settings.html" },
  { path: "/tabs", file: "tabs.html" },
  { path: "/", file: "index.html" },
];

routes.forEach(route => {
  app.get(route.path, generalLimiter, (_req, res) => {
    res.sendFile(path.join(SERVE_DIR, route.file));
  });
});

app.use(generalLimiter, (_req, res) => {
  res.status(404).sendFile(path.join(SERVE_DIR, "404.html"));
});

app.use(generalLimiter, (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(SERVE_DIR, "404.html"));
});

server.on("request", (req, res) => {
  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  wisp.routeRequest(req, socket, head);
});

server.on("listening", () => {
  console.log(chalk.green(`🌍 Server is running on http://localhost:${PORT}`));
});

server.listen({ port: PORT });
