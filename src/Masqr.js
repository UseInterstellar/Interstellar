import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import express from "express";

const COOKIE_NAME = "masqr_session";
const UNLOCK_PATH = "/masqr/unlock";
const DECOY_MOUNT = "/decoy";
const TOKEN_PATTERN = /^u:([A-Za-z0-9_-]{32,128})@/;
const STORE_PATH = path.join(process.cwd(), "data", "masqr.json");
const DAY_MS = 24 * 60 * 60 * 1000;

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
  if (entry.host && entry.host !== host) return false;
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

function normaliseHost(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/^www\./, "");
}

function loadDecoyMap(decoyRoot) {
  const map = new Map();
  for (const entry of readdirSync(decoyRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || !existsSync(path.join(decoyRoot, entry.name, "index.html"))) continue;
    map.set(normaliseHost(entry.name), entry.name);
    const aliasFile = path.join(decoyRoot, entry.name, "domains.json");
    if (!existsSync(aliasFile)) continue;
    for (const host of JSON.parse(readFileSync(aliasFile, "utf8"))) map.set(normaliseHost(host), entry.name);
  }
  return map;
}

export function mountMasqr(app, { decoyRoot, decoy = "default", secureCookie = true, sessionMs = 30 * DAY_MS }) {
  if (!existsSync(path.join(decoyRoot, decoy, "index.html"))) throw new Error(`Masqr default decoy "${decoy}" has no index.html in ${decoyRoot}`);
  const decoyMap = loadDecoyMap(decoyRoot);
  const decoyFolderFor = req => decoyMap.get(normaliseHost(req.headers.host)) ?? decoy;

  const { secret } = readStore();
  const isAuthorized = req => sessionIsValid(secret, parseCookies(req.headers.cookie)[COOKIE_NAME]);

  app.use(DECOY_MOUNT, express.static(decoyRoot, { dotfiles: "ignore" }));

  app.post(UNLOCK_PATH, express.urlencoded({ extended: false, limit: "1kb" }), (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const match = TOKEN_PATTERN.exec(String(req.body?.key ?? ""));
    if (match && consumeToken(match[1], req.headers.host)) {
      const payload = `${Date.now() + sessionMs}.${randomBytes(12).toString("base64url")}`;
      res.cookie(COOKIE_NAME, `${payload}.${sign(secret, payload)}`, {
        httpOnly: true,
        secure: secureCookie,
        sameSite: "lax",
        path: "/",
        maxAge: sessionMs,
      });
    }
    res.redirect(303, "/");
  });

  app.use((req, res, next) => {
    if (isAuthorized(req)) return next();
    if ((req.method === "GET" || req.method === "HEAD") && req.path === "/") {
      return res.sendFile(path.join(decoyRoot, decoyFolderFor(req), "index.html"));
    }
    res.status(404).type("text/plain").send("Not Found");
  });

  return { isAuthorized };
}
