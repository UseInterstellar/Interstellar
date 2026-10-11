import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import express from "express";

const COOKIE_NAME = "m";
const SEARCH_PATH = "/search";
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

function loadDecoyMap(decoyRoot) {
  const map = new Map();
  for (const entry of readdirSync(decoyRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || !existsSync(path.join(decoyRoot, entry.name, "index.html"))) continue;
    registerHost(map, entry.name, entry.name, "directory name");

    const aliasFile = path.join(decoyRoot, entry.name, "domains.json");
    if (!existsSync(aliasFile)) continue;
    let aliases;
    try {
      aliases = JSON.parse(readFileSync(aliasFile, "utf8"));
    } catch (error) {
      throw new Error(`Masqr decoy ${entry.name}: domains.json is invalid JSON (${error.message})`);
    }
    if (!Array.isArray(aliases) || !aliases.every(alias => typeof alias === "string")) {
      throw new Error(`Masqr decoy ${entry.name}: domains.json must be a JSON array of hostnames`);
    }
    for (const host of aliases) registerHost(map, host, entry.name, "domains.json");
  }
  return map;
}

function safeDecoyFile(decoyRoot, folder, requestPath) {
  const relative = requestPath === "/" ? "index.html" : decodeURIComponent(requestPath).replace(/^\/+/, "");
  const parts = relative.split(/[\\/]+/).filter(Boolean);
  if (!parts.length || parts.some(part => part === "." || part === "..")) return null;
  if (BLOCKED_DECOY_FILES.has(parts.at(-1).toLowerCase())) return null;

  const root = realpathSync(path.join(decoyRoot, folder));
  const candidate = path.join(root, ...parts);
  let resolved;
  try {
    resolved = realpathSync(candidate);
  } catch {
    return null;
  }
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) return null;
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

export function mountMasqr(app, { decoyRoot, secureCookie = true, sessionMs = 30 * DAY_MS, searchTrigger = null }) {
  if (!existsSync(path.join(decoyRoot, "index.html"))) throw new Error(`Masqr decoy set ${decoyRoot} has no index.html`);
  const decoyMap = loadDecoyMap(decoyRoot);
  const decoyFolderFor = req => decoyMap.get(normaliseHost(req.headers.host)) ?? "";

  const searchRedirects = new Map([["", loadSearchRedirect(decoyRoot)]]);
  for (const folder of new Set(decoyMap.values())) searchRedirects.set(folder, loadSearchRedirect(path.join(decoyRoot, folder)));
  const searchRedirectFor = req => searchRedirects.get(decoyFolderFor(req)) ?? searchRedirects.get("");

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

  app.post(SEARCH_PATH, express.urlencoded({ extended: false, limit: "1kb" }), (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const query = String(req.body?.q ?? "");
    if (triggerMatches(query, searchTrigger)) {
      consumeToken(issueToken({ days: 1 }), null);
      setSession(res);
      return res.redirect(303, "/");
    }
    const target = searchRedirectFor(req);
    if (!query || !target) return res.redirect(303, "/");
    return res.redirect(303, `${target}${encodeURIComponent(query)}`);
  });

  app.use((req, res, next) => {
    if (isAuthorized(req)) return next();
    if (req.method === "GET" || req.method === "HEAD") {
      let file = null;
      try {
        file = safeDecoyFile(decoyRoot, decoyFolderFor(req), req.path);
      } catch {
        file = null;
      }
      if (file) return res.sendFile(file, { dotfiles: "deny" });
    }
    res.status(404).type("text/plain").send("Not Found");
  });

  return { isAuthorized, normaliseHost, decoyFolderFor };
}
