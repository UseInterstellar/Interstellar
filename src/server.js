import { existsSync, readFileSync } from "node:fs";
import http from "node:http";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import mime from "mime";
import config from "../config.js";
// import { mountAnalytics } from "./analytics.js";
import { ghGamesProxies, mountGhGames } from "./games.js";
import { injectVersionInfo, resolveVersionInfo } from "./version.js";
import { handleWispUpgrade } from "./workers/wisp.js";

const IS_WORKERS = typeof WebSocketPair !== "undefined";
const { connect } = IS_WORKERS ? await import("cloudflare:sockets") : { connect: undefined };

const routes = [
  { path: "/apps", file: "apps.html" },
  { path: "/games", file: "games.html" },
  { path: "/play.html", file: "games.html" },
  { path: "/settings", file: "settings.html" },
  { path: "/tabs", file: "tabs.html" },
  { path: "/home", file: "home.html" },
  { path: "/", file: "home.html" },
];

const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const blockedSiteMatchers = config.blockedSites.map(host => new RegExp(`(^|\\.)${escapeRegExp(host.trim().toLowerCase())}$`, "i"));

const vendorMap = IS_WORKERS ? (await import("../dist/.runtime/vendor-map.cjs")).default : loadNodeVendorMap();

const WISP_PATH = vendorMap?.wisp ?? "/wisp/";
const BUILD_MARKER = vendorMap?.build ? `.${vendorMap.build}` : null;
const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";
const REVALIDATE_CACHE = "no-cache";
const cacheEnabled = config.cache?.enabled === true;

const pageFiles = new Map(routes.map(route => [vendorMap?.routes?.[route.path] || route.path, route.file]));

function projectRoot() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

function loadNodeVendorMap() {
  const require = createRequire(import.meta.url);
  const file = path.join(projectRoot(), "dist", ".runtime", "vendor-map.cjs");
  return existsSync(file) ? require(file) : null;
}

async function startNodeServer() {
  const { server: wisp } = await import("@mercuryworkshop/wisp-js/server");
  const { createBlockVerdict, setupFiltering } = await import("./filtering/index.js");
  const { default: express } = await import("express");
  const { default: basicAuth } = await import("express-basic-auth");
  const { mountMasqr } = await import("./Masqr.js");
  console.log(chalk.yellow("🚀 Starting server..."));
  const NETLIFY = process.argv.includes("--netlify");

  const require = createRequire(import.meta.url);
  const root = projectRoot();

  const DIST_DIR = path.join(root, "dist");
  const STATIC_DIR = path.join(root, "static");

  if (!vendorMap && process.env.VERCEL) {
    throw new Error("dist/.runtime/vendor-map.cjs is missing on Vercel. The build did not run before the function was packaged.");
  }

  if (NETLIFY && !vendorMap?.netlify) {
    console.log(chalk.red("--netlify needs a Netlify build in dist/. Run `pnpm build:netlify` first."));
    process.exit(1);
  }
  if (!NETLIFY && vendorMap?.netlify) {
    console.log(chalk.red("dist/ is a Netlify build (no server-side Wisp). Run `pnpm start:netlify` to preview it, or `pnpm build` for the normal server build."));
    process.exit(1);
  }

  const SERVE_DIR = vendorMap ? DIST_DIR : STATIC_DIR;
  console.log(chalk.blue(`Serving from ${path.relative(root, SERVE_DIR)}/`));
  if (vendorMap) {
    console.log(chalk.blue(`Build ${vendorMap.build}, proxy scope ${vendorMap.scopes.uv}, scramjet ${vendorMap.scopes.scramjet}`));
  } else if (existsSync(DIST_DIR)) {
    console.log(chalk.yellow("dist/ exists but has no .runtime/vendor-map.cjs, run `pnpm build`. Falling back to static/."));
  }

  const server = http.createServer();
  const app = express();

  function resolvePort() {
    const args = process.argv.slice(2);
    let flag = null;

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg === "--port" || arg === "-p") flag = args[i + 1];
      else if (arg.startsWith("--port=")) flag = arg.slice("--port=".length);
      else continue;

      if (!/^\d+$/.test(flag ?? "") || Number(flag) < 1 || Number(flag) > 65535) {
        console.log(chalk.red(`Invalid port ${JSON.stringify(flag ?? null)}, expected 1-65535.`));
        process.exit(1);
      }
      break;
    }

    return flag ? Number(flag) : process.env.PORT || 8080;
  }

  const PORT = resolvePort();

  wisp.options.allow_loopback_ips = false;
  wisp.options.allow_private_ips = false;

  wisp.options.hostname_blacklist = blockedSiteMatchers.length ? blockedSiteMatchers : null;

  const filteringState = await setupFiltering({ wisp, filtering: config.filtering });
  const blockVerdict = createBlockVerdict({ blocklist: blockedSiteMatchers, policy: filteringState.policy });

  if (NETLIFY) console.log(chalk.yellow("Netlify preview: static files only (plus the /gh-games proxy, which Netlify does with _redirects). No Wisp, password protection or Masqr, as on a static host."));

  if (!NETLIFY && config.challenge !== false) {
    console.log(chalk.green("🔒 Password protection is enabled."));
    app.use(basicAuth({ users: config.users, challenge: true }));
  }

  let masqr = null;
  if (!NETLIFY && config.masqr?.enabled) {
    masqr = mountMasqr(app, {
      decoyBase: path.join(STATIC_DIR, "decoy"),
      decoySet: config.masqr.decoy ?? "default",
      searchTrigger: process.env.MASQR_SEARCH_TRIGGER ?? config.masqr.searchTrigger ?? null,
      sites: config.masqr.sites ?? [],
      decoyOnly: config.masqr.decoyOnly === true,
      secureCookie: config.masqr.secureCookie !== false,
      sessionMs: (config.masqr.sessionDays ?? 30) * 24 * 60 * 60 * 1000,
    });
    console.log(chalk.green("🔑 Masqr gate is enabled"));
  }

  mountGhGames(app);

  const useAssetCache = cacheEnabled && Boolean(vendorMap?.build);
  if (cacheEnabled) {
    console.log(useAssetCache ? chalk.green("📦 Asset caching is enabled (assets cached until the HTML changes)") : chalk.yellow("config.cache.enabled is set but this is not a dist build, so caching is off. Run `pnpm build`."));
  }
  const buildMarker = useAssetCache ? BUILD_MARKER : null;

  function cacheControlFor(filePath) {
    return filePath.includes(buildMarker) ? IMMUTABLE_CACHE : REVALIDATE_CACHE;
  }

  const jsStaticOptions = {
    setHeaders: (res, filePath) => {
      if (useAssetCache && filePath.startsWith(SERVE_DIR)) res.setHeader("Cache-Control", cacheControlFor(filePath));
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

  if (!NETLIFY)
    app.post("/filter/verdict", express.json(), async (req, res) => {
      const host = typeof req.body?.host === "string" ? req.body.host.slice(0, 254) : "";
      res.set("Cache-Control", "no-store").json(await blockVerdict(host));
    });

  // if (vendorMap?.analytics) mountAnalytics(app, vendorMap.analytics);

  if (!vendorMap) {
    try {
      const info = await resolveVersionInfo();
      const settingsHtml = injectVersionInfo(readFileSync(path.join(SERVE_DIR, "settings.html"), "utf8"), info).html;
      const sendSettings = (_req, res) => res.type("html").send(settingsHtml);
      app.get("/settings", sendSettings);
      app.get("/settings.html", sendSettings);
    } catch (err) {
      console.warn(chalk.yellow(`Settings version injection skipped, serving placeholders: ${err.message}`));
    }
  }

  app.use(express.static(SERVE_DIR, { ...jsStaticOptions, dotfiles: "ignore" }));

  if (!vendorMap) {
    const { epoxyPath } = require("@mercuryworkshop/epoxy-transport");
    const { baremuxPath } = require("@mercuryworkshop/bare-mux/node");
    const { libcurlPath } = require("@mercuryworkshop/libcurl-transport");
    const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");
    const { scramjetPath } = require("@useinterstellar/scramjet/path");

    app.use("/epoxy/", express.static(epoxyPath));
    app.use("/libcurl/", express.static(libcurlPath));
    app.use("/baremux/", express.static(baremuxPath));
    app.use("/assets/ultraviolet/", express.static(uvPath, jsStaticOptions));
    app.use("/assets/scramjet/", express.static(scramjetPath, jsStaticOptions));
  }

  for (const [servePath, file] of pageFiles) {
    app.get(servePath, (_req, res) => {
      if (useAssetCache) res.setHeader("Cache-Control", REVALIDATE_CACHE);
      res.sendFile(path.join(SERVE_DIR, file));
    });
  }

  app.use((_req, res) => {
    res.status(404).sendFile(path.join(SERVE_DIR, "404.html"));
  });

  app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(SERVE_DIR, "404.html"));
  });

  server.on("request", (req, res) => {
    app(req, res);
  });

  server.on("upgrade", (req, socket, head) => {
    if (NETLIFY) return socket.destroy();
    if (masqr && masqr.isGated(req) && !masqr.isAuthorized(req)) return socket.destroy();
    if (new URL(req.url, "http://localhost").pathname !== WISP_PATH) return socket.destroy();
    wisp.routeRequest(req, socket, head);
  });

  server.on("listening", () => {
    console.log(chalk.green(`🌍 Server is running on http://localhost:${PORT}`));
  });

  server.listen({ port: PORT });
}

const WORKER_NO_MIME_EXTS = new Set([".unityweb"]);

const isBlockedHost = host => blockedSiteMatchers.some(matcher => matcher.test(host));

function plainText(body, status) {
  return new Response(body, { status, headers: { "Content-Type": "text/plain; charset=UTF-8" } });
}

function workerBasicAuthFailure(request) {
  if (!config.challenge) return null;
  const [scheme, value] = (request.headers.get("Authorization") ?? "").split(" ");
  if (scheme === "Basic" && value) {
    const decoded = atob(value);
    const separator = decoded.indexOf(":");
    const user = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    if (separator >= 0 && Object.hasOwn(config.users, user) && config.users[user] === password) return null;
  }
  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Interstellar", charset="UTF-8"' },
  });
}

function withWorkerCacheHeaders(response, pathname, { page = false } = {}) {
  if (!cacheEnabled && !page) return response;
  const headers = new Headers(response.headers);
  const immutable = !page && BUILD_MARKER && pathname.includes(BUILD_MARKER);
  headers.set("Cache-Control", immutable ? IMMUTABLE_CACHE : REVALIDATE_CACHE);
  if (pathname.endsWith(".js") || pathname.endsWith(".mjs")) {
    headers.set("Content-Type", "text/javascript");
    headers.set("Service-Worker-Allowed", "/");
  }
  return new Response(response.body, { status: response.status, headers });
}

async function workerNotFound(env, url) {
  const page = await env.ASSETS.fetch(new Request(new URL("/404.html", url)));
  return new Response(page.body, { status: 404, headers: { "Content-Type": "text/html; charset=UTF-8" } });
}

async function workerFilterVerdict(request) {
  let host = "";
  try {
    const body = await request.json();
    host = typeof body?.host === "string" ? body.host.slice(0, 254) : "";
  } catch {}
  const normalized = host.trim().toLowerCase().replace(/\.$/, "");
  const result = normalized && isBlockedHost(normalized) ? { blocked: true, source: "blocklist" } : { blocked: false };
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function workerGameAsset(pathname, request, env, url) {
  const sources = ghGamesProxies();
  const prefix = Object.keys(sources).find(base => pathname.startsWith(base));
  if (!prefix) return workerNotFound(env, url);
  const target = sources[prefix] + pathname.slice(prefix.length);
  const upstreamHeaders = {};
  const ifNoneMatch = request.headers.get("if-none-match");
  if (ifNoneMatch) upstreamHeaders["If-None-Match"] = ifNoneMatch;

  const upstream = await fetch(target, { headers: upstreamHeaders });
  if (upstream.status === 304) return new Response(null, { status: 304 });
  if (!upstream.ok) return workerNotFound(env, url);

  const ext = new URL(target).pathname.match(/\.[^./]*$/)?.[0] ?? "";
  const headers = {
    "Content-Type": WORKER_NO_MIME_EXTS.has(ext) ? "application/octet-stream" : (mime.getType(ext) ?? "application/octet-stream"),
    "Cache-Control": IMMUTABLE_CACHE,
  };
  const etag = upstream.headers.get("etag");
  const lastModified = upstream.headers.get("last-modified");
  if (etag) headers.ETag = etag;
  if (lastModified) headers["Last-Modified"] = lastModified;
  return new Response(upstream.body, { status: 200, headers });
}

async function workersFetch(request, env) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname === "/.runtime" || pathname.startsWith("/.runtime/")) return plainText("Not found", 404);

  if (pathname === WISP_PATH) return handleWispUpgrade(request, { connect, isBlockedHost });

  const denied = workerBasicAuthFailure(request);
  if (denied) return denied;

  if (request.method === "POST" && pathname === "/filter/verdict") return workerFilterVerdict(request);
  if (pathname.startsWith("/gh-games/")) return workerGameAsset(pathname, request, env, url);

  if (request.method !== "GET" && request.method !== "HEAD") return workerNotFound(env, url);

  const page = pageFiles.get(pathname);
  if (page) {
    const response = await env.ASSETS.fetch(new Request(new URL(`/${page}`, url), request));
    if (!response.ok) return workerNotFound(env, url);
    return withWorkerCacheHeaders(response, pathname, { page: true });
  }

  const response = await env.ASSETS.fetch(request);
  if (response.status === 404) return workerNotFound(env, url);
  return withWorkerCacheHeaders(response, pathname);
}

export default {
  fetch: (request, env) => workersFetch(request, env),
};

if (!IS_WORKERS) await startNodeServer();
