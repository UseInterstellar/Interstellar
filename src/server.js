import { existsSync, readFileSync } from "node:fs";
import http from "node:http";
import { createRequire } from "node:module";
import path from "node:path";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import express from "express";
import basicAuth from "express-basic-auth";
import rateLimit from "express-rate-limit";
import config from "../config.js";
import { mountAds } from "./ads.js";
import { mountGhGames } from "./games.js";
import { injectVersionInfo, resolveVersionInfo } from "./version.js";

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

if (config.challenge !== false) {
  console.log(chalk.green("🔒 Password protection is enabled! Listing logins below"));
  Object.entries(config.users).forEach(([username, password]) => {
    console.log(chalk.blue(`Username: ${username}, Password: ${password}`));
  });
  app.use(basicAuth({ users: config.users, challenge: true }));
}

mountGhGames(app);

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

if (vendorMap?.analytics) mountAds(app, vendorMap.analytics);

if (!vendorMap) {
  try {
    const info = await resolveVersionInfo();
    const settingsHtml = injectVersionInfo(readFileSync(path.join(SERVE_DIR, "settings.html"), "utf8"), info).html;
    const sendSettings = (_req, res) => res.type("html").send(settingsHtml);
    app.get("/settings", generalLimiter, sendSettings);
    app.get("/settings.html", generalLimiter, sendSettings);
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

// In dist the build randomizes the page routes and records them in the vendor map, so serve each
// page at its opaque path (build id vendorMap.routes). "/" and "/play.html" have no entry and stay
// clean. In static/dev vendorMap is null, so the clean routes are used as-is.
routes.forEach(route => {
  const servePath = vendorMap?.routes?.[route.path] || route.path;
  app.get(servePath, generalLimiter, (_req, res) => {
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
