import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import express from "express";

const COOKIE_NAME = "m";
const SEARCH_PATH = "/search";
const LOGIN_PATH = "/login/";
const STORE_PATH = path.join(process.cwd(), "data", "masqr.json");
const DAY_MS = 24 * 60 * 60 * 1000;
const HOST_PATTERN = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const BLOCKED_DECOY_FILES = new Set(["domains.json"]);

function readStore() {
  if (!existsSync(STORE_PATH)) {
    const store = { secret: randomBytes(32).toString("hex"), tokens: {} };
    writeStore(store);
    return store;
  }
  return JSON.parse(readFileSync(STORE_PATH, "utf8"));
}

function writeStore(store) {
  mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), { mode: 0o600 });
}

const sha256 = value => createHash("sha256").update(value).digest("hex");
const sign = (secret, payload) => createHmac("sha256", secret).update(payload).digest("base64url");

export function issueToken({ host = null, days = 3 } = {}) {
  const store = readStore();
  const token = randomBytes(32).toString("base64url");
  const now = Date.now();
  for (const [key, entry] of Object.entries(store.tokens)) {
    if (entry.expires < now - 7 * DAY_MS) delete store.tokens[key];
  }
  store.tokens[sha256(token)] = { expires: now + days * DAY_MS, host, used: false };
  writeStore(store);
  return token;
}

function consumeToken(token, host) {
  const store = readStore();
  const entry = store.tokens[sha256(token)];
  if (!entry || entry.used || entry.expires < Date.now()) return false;
  if (entry.host && normaliseHost(entry.host) !== host) return false;
  entry.used = true;
  writeStore(store);
  return true;
}

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map(part => part.trim().split("="))
      .filter(([name]) => name)
      .map(([name, ...value]) => [name, value.join("=")]),
  );
}

function sessionIsValid(secret, value) {
  const parts = String(value ?? "").split(".");
  if (parts.length !== 3) return false;
  const [expires, nonce, signature] = parts;
  const expected = Buffer.from(sign(secret, `${expires}.${nonce}`));
  const actual = Buffer.from(signature);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
  return Number(expires) > Date.now();
}

export function normaliseHost(value) {
  const raw = String(value ?? "")
    .trim()
    .toLowerCase();
  if (!raw || /[\s/@\\]/.test(raw)) return null;

  let hostname = raw;
  if (hostname.startsWith("[")) {
    const close = hostname.indexOf("]");
    if (close < 0) return null;
    hostname = hostname.slice(1, close);
  } else {
    const colon = hostname.lastIndexOf(":");
    if (colon >= 0) {
      const port = hostname.slice(colon + 1);
      if (!/^\d+$/.test(port)) return null;
      hostname = hostname.slice(0, colon);
    }
  }

  if (hostname.endsWith(".")) hostname = hostname.slice(0, -1);
  if (hostname.startsWith("www.")) hostname = hostname.slice(4);
  if (!hostname || hostname.length > 253 || !HOST_PATTERN.test(hostname)) return null;
  return hostname;
}

function registerHost(map, rawHost, folder, source) {
  const host = normaliseHost(rawHost);
  if (!host) throw new Error(`Masqr decoy ${folder}: invalid hostname ${JSON.stringify(rawHost)} in ${source}`);

  const existing = map.get(host);
  if (existing && existing !== folder) {
    throw new Error(`Masqr hostname conflict for "${host}": ${existing} and ${folder}`);
  }
  map.set(host, folder);
}

export function expandSites(sites = []) {
  const entries = new Map();
  sites.forEach((site, index) => {
    const label = `Masqr site ${site.name ?? index}`;
    if (typeof site.searchTrigger !== "string" || !site.searchTrigger) throw new Error(`${label}: needs a searchTrigger`);
    const names = site.name && Array.isArray(site.tlds) ? site.tlds.map(tld => `${site.name}.${tld}`) : [];
    const hosts = [...names, ...(site.hosts ?? [])];
    if (!hosts.length) throw new Error(`${label}: needs name + tlds or a hosts list`);
    const family = names.length ? names.map(name => normaliseHost(name)) : null;
    for (const rawHost of hosts) {
      const host = normaliseHost(rawHost);
      if (!host) throw new Error(`${label}: invalid hostname ${JSON.stringify(rawHost)}`);
      if (entries.has(host)) throw new Error(`Masqr site ${host} is listed in more than one site`);
      entries.set(host, { searchTrigger: site.searchTrigger, family });
    }
  });
  return entries;
}

function loadDecoyMap(decoyBase, setName) {
  const folders = new Map();
  const aliases = new Map();
  for (const entry of readdirSync(decoyBase, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === setName || !entry.name.includes(".")) continue;
    if (!existsSync(path.join(decoyBase, entry.name, "index.html"))) continue;
    registerHost(folders, entry.name, entry.name, "directory name");
    const folderHost = normaliseHost(entry.name);
    if (folderHost) folders.set(folderHost, entry.name);

    const aliasFile = path.join(decoyBase, entry.name, "domains.json");
    if (!existsSync(aliasFile)) continue;
    let list;
    try {
      list = JSON.parse(readFileSync(aliasFile, "utf8"));
    } catch (error) {
      throw new Error(`Masqr decoy ${entry.name}: domains.json is invalid JSON (${error.message})`);
    }
    if (!Array.isArray(list) || !list.every(alias => typeof alias === "string")) {
      throw new Error(`Masqr decoy ${entry.name}: domains.json must be a JSON array of hostnames`);
    }
    for (const host of list) registerHost(aliases, host, entry.name, "domains.json");
  }
  return { folders, aliases };
}

function safeDecoyFile(root, requestPath) {
  const relative = requestPath === "/" ? "index.html" : decodeURIComponent(requestPath).replace(/^\/+/, "");
  const parts = relative.split(/[\\/]+/).filter(Boolean);
  if (!parts.length || parts.some(part => part === "." || part === "..")) return null;
  if (BLOCKED_DECOY_FILES.has(parts.at(-1).toLowerCase())) return null;

  const realRoot = realpathSync(root);
  const candidate = path.join(root, ...parts);
  let resolved;
  try {
    resolved = realpathSync(candidate);
  } catch {
    return null;
  }
  if (resolved !== realRoot && !resolved.startsWith(`${realRoot}${path.sep}`)) return null;
  try {
    if (!statSync(resolved).isFile()) return null;
  } catch {
    return null;
  }
  return resolved;
}

function triggerMatches(value, trigger) {
  if (!trigger) return false;
  return timingSafeEqual(Buffer.from(sha256(String(value).trim())), Buffer.from(sha256(trigger)));
}

function loadSearchRedirect(folder) {
  const file = path.join(folder, "search.json");
  if (!existsSync(file)) return null;
  const { redirect } = JSON.parse(readFileSync(file, "utf8"));
  if (typeof redirect !== "string" || !redirect.startsWith("https://")) throw new Error(`Masqr: ${file} needs an https "redirect" URL`);
  return redirect;
}

export function mountMasqr(app, { decoyBase, decoySet = "default", secureCookie = true, sessionMs = 30 * DAY_MS, searchTrigger = null, sites = [], decoyOnly = false }) {
  // /math/, math and /math all select static/decoy/math.
  const setName = String(decoySet).trim().replace(/^\/+|\/+$/g, "");
  if (!setName || setName.includes("/") || setName.includes("\\") || setName === "." || setName === "..") {
    throw new Error(`Masqr decoy set name ${JSON.stringify(decoySet)} must be a single folder name`);
  }
  const setRoot = path.join(decoyBase, setName);
  if (!decoyOnly && !existsSync(path.join(setRoot, "index.html"))) throw new Error(`Masqr decoy set ${setRoot} has no index.html`);
  const { folders, aliases } = existsSync(decoyBase) ? loadDecoyMap(decoyBase, setName) : { folders: new Map(), aliases: new Map() };
  const siteEntries = expandSites(sites);
  const hostOf = req => normaliseHost(req.headers.host);

  const folderFor = host => {
    if (!host) return null;
    if (folders.has(host)) return folders.get(host);
    if (aliases.has(host)) return aliases.get(host);
    for (const sister of siteEntries.get(host)?.family ?? []) {
      if (folders.has(sister)) return folders.get(sister);
    }
    return null;
  };
  const rootFor = req => {
    const folder = folderFor(hostOf(req));
    return folder ? path.join(decoyBase, folder) : setRoot;
  };
  const triggerFor = req => siteEntries.get(hostOf(req))?.searchTrigger ?? searchTrigger;
  const gated = req => !decoyOnly || folders.has(hostOf(req)) || aliases.has(hostOf(req)) || siteEntries.has(hostOf(req));

  const searchRedirects = new Map();
  const searchRedirectFor = req => {
    const root = rootFor(req);
    if (!searchRedirects.has(root)) searchRedirects.set(root, loadSearchRedirect(root));
    return searchRedirects.get(root);
  };

  const { secret } = readStore();
  const isAuthorized = req => sessionIsValid(secret, parseCookies(req.headers.cookie)[COOKIE_NAME]);

  const setSession = res => {
    const payload = `${Date.now() + sessionMs}.${randomBytes(12).toString("base64url")}`;
    res.cookie(COOKIE_NAME, `${payload}.${sign(secret, payload)}`, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: "lax",
      path: "/",
      maxAge: sessionMs,
    });
  };

  app.post(SEARCH_PATH, express.urlencoded({ extended: false, limit: "1kb" }), (req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    if (!gated(req)) return next();
    const query = String(req.body?.q ?? "");
    if (triggerMatches(query, triggerFor(req))) {
      consumeToken(issueToken({ days: 1 }), null);
      setSession(res);
      return res.redirect(303, "/");
    }
    const target = searchRedirectFor(req);
    if (!query || !target) return res.redirect(303, "/");
    return res.redirect(303, `${target}${encodeURIComponent(query)}`);
  });

  app.post(LOGIN_PATH, express.urlencoded({ extended: false, limit: "1kb" }), (req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    if (!gated(req)) return next();
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!password || !triggerMatches(password, triggerFor(req))) {
      return res.status(401).json({ error: "Invalid login" });
    }
    setSession(res);
    return res.status(200).json({ ok: true });
  });

  app.use((req, res, next) => {
    if (!gated(req) || isAuthorized(req)) return next();
    if (req.method === "GET" || req.method === "HEAD") {
      let file = null;
      try {
        file = safeDecoyFile(rootFor(req), req.path);
      } catch {
        file = null;
      }
      if (file) return res.sendFile(file, { dotfiles: "deny" });
    }
    res.status(404).type("text/plain").send("Not Found");
  });

  return { isAuthorized, isGated: gated, normaliseHost };
}
