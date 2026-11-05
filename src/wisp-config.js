import { createHash, randomBytes } from "node:crypto";

export class WispArgError extends Error {
  constructor(message) {
    super(message);
    this.name = "WispArgError";
  }
}

const FLAGS = { "--wisp-preferred": "preferred", "--wisp-fallback": "fallback" };
const SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;
const HOSTNAME = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
const IPV6 = /^\[[0-9a-f:.]+\]$/i;
export const DEFAULT_WISP_PATH = "/wisp/";

export function normalizeEndpoint(raw, { warnings = [] } = {}) {
  const text = String(raw).trim();
  const bad = reason => new WispArgError(`"${text}" ${reason}`);
  if (!text) throw bad("is empty");
  if (/\s/.test(text)) throw bad("contains whitespace; separate endpoints with commas");

  const scheme = text.match(SCHEME);
  if (scheme) {
    const protocol = scheme[0].slice(0, -3).toLowerCase();
    if (protocol === "http" || protocol === "https") throw bad(`uses ${protocol}://; Wisp servers are WebSocket endpoints, use ${protocol === "https" ? "wss" : "ws"}:// (or just the hostname)`);
    if (protocol !== "ws" && protocol !== "wss") throw bad(`uses the unsupported protocol ${protocol}://; use ws:// or wss://`);
  }

  const bareHost = !scheme && !text.includes("/");
  let url;
  try {
    url = new URL(scheme ? text : `wss://${text}`);
  } catch {
    throw bad(text.includes(":") && !text.includes("[") && text.split(":").length > 2 ? "is not a valid URL; wrap IPv6 addresses in brackets, e.g. [::1]:8080" : "is not a valid hostname or ws:// / wss:// URL");
  }

  if (url.username || url.password) throw bad("contains credentials, which are not supported");
  if (url.search || url.hash) throw bad("contains a query string or fragment, which are not supported");
  if (!url.hostname) throw bad("has no hostname");
  if (!HOSTNAME.test(url.hostname) && !IPV6.test(url.hostname)) throw bad(`has an invalid hostname "${url.hostname}"`);
  if (url.hostname.length > 253) throw bad("has a hostname longer than 253 characters");
  if (url.port !== "" && (Number(url.port) < 1 || Number(url.port) > 65535)) throw bad(`has an invalid port ${url.port}; use 1-65535`);

  const pathname = bareHost ? DEFAULT_WISP_PATH : url.pathname;
  if (!pathname.endsWith("/")) throw bad(`has the path "${pathname}", which must end with "/" (e.g. ${pathname}/); a path without the trailing slash is not a Wisp endpoint`);
  if (pathname.includes("//")) throw bad(`has an empty path segment in "${pathname}"`);

  const protocol = scheme ? url.protocol : "wss:";
  const loopback = url.hostname === "localhost" || url.hostname === "[::1]" || /^127\./.test(url.hostname);
  if (protocol === "ws:" && !loopback) warnings.push(`${url.host}: ws:// is unencrypted and browsers block it on HTTPS pages; prefer wss://`);
  return `${protocol}//${url.host}${pathname}`;
}

export function parseEndpointList(value, flag, warnings = []) {
  const text = String(value ?? "").trim();
  if (!text) return [];
  const out = [];
  text.split(",").forEach((token, index) => {
    if (!token.trim()) throw new WispArgError(`${flag}: entry ${index + 1} is empty; check for doubled or trailing commas in "${text}"`);
    let endpoint;
    try {
      endpoint = normalizeEndpoint(token, { warnings });
    } catch (error) {
      if (error instanceof WispArgError) throw new WispArgError(`${flag}: ${error.message}`);
      throw error;
    }
    if (!out.includes(endpoint)) out.push(endpoint);
  });
  return out;
}

export function parseWispArgs(argv = process.argv.slice(2)) {
  const overrides = {};
  const warnings = [];
  const raw = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--wisp")) continue;
    const eq = arg.indexOf("=");
    const flag = eq < 0 ? arg : arg.slice(0, eq);
    const field = FLAGS[flag];
    if (!field) throw new WispArgError(`Unknown option ${flag}. Supported options: ${Object.keys(FLAGS).join(", ")}.`);
    if (field in overrides) throw new WispArgError(`${flag} was given more than once; list every endpoint in one comma-separated value.`);
    let value;
    if (eq >= 0) value = arg.slice(eq + 1);
    else {
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) throw new WispArgError(`${flag} needs a value, e.g. ${flag}=host.example,host2.example (use ${flag}= with nothing after it to clear the list).`);
      value = next;
      i++;
    }
    overrides[field] = parseEndpointList(value, flag, warnings);
    raw.push(`${flag}=${value}`);
  }
  return { overrides, warnings, raw };
}

const ENV_LISTS = { preferred: "WISP_PREFERRED", fallback: "WISP_FALLBACK" };
const ENV_NUMBERS = { timeoutMs: "WISP_TIMEOUT_MS", verifyTtlMs: "WISP_VERIFY_TTL_MS", cooldownMs: "WISP_COOLDOWN_MS", maxCooldownMs: "WISP_MAX_COOLDOWN_MS", recheckMs: "WISP_RECHECK_MS", connectDeadlineMs: "WISP_CONNECT_DEADLINE_MS" };

function envBoolean(name, value) {
  const text = String(value).trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(text)) return true;
  if (["0", "false", "no", "off"].includes(text)) return false;
  throw new WispArgError(`${name}: "${value}" is not a boolean; use true or false (unset the variable for the default)`);
}

export function resolveWispConfig(overrides = {}, env = process.env) {
  const config = { preferred: [], fallback: [] };
  const sources = { preferred: "default", fallback: "default" };
  const warnings = [];
  let explicit = Object.keys(overrides).length > 0;
  for (const [field, name] of Object.entries(ENV_LISTS)) {
    if (env[name] !== undefined) {
      config[field] = parseEndpointList(env[name], name, warnings);
      sources[field] = "environment";
      explicit = true;
    }
    if (field in overrides) {
      config[field] = [...overrides[field]];
      sources[field] = "command line";
    }
  }
  for (const [field, name] of Object.entries(ENV_NUMBERS)) {
    if (env[name] === undefined) continue;
    const text = String(env[name]).trim();
    const value = Number(text);
    if (!/^[0-9]+$/.test(text) || !Number.isSafeInteger(value) || value < 1) throw new WispArgError(`${name}: "${env[name]}" is not a positive whole number of milliseconds (unset the variable for the default)`);
    config[field] = value;
    explicit = true;
  }
  if (env.WISP_REQUIRE_HANDSHAKE !== undefined) {
    config.requireHandshake = envBoolean("WISP_REQUIRE_HANDSHAKE", env.WISP_REQUIRE_HANDSHAKE);
    explicit = true;
  }
  if (env.INTERSTELLAR_STATIC !== undefined && envBoolean("INTERSTELLAR_STATIC", env.INTERSTELLAR_STATIC)) {
    config.sameOrigin = false;
    explicit = true;
  }
  const preferred = new Set(config.preferred);
  const kept = config.fallback.filter(url => !preferred.has(url));
  if (kept.length !== config.fallback.length) {
    warnings.push("Some fallback endpoints are also preferred; they were kept in the preferred list only.");
    config.fallback = kept;
  }
  return { config, sources, warnings, explicit };
}

export function wispFingerprint(config) {
  const canonical = JSON.stringify(Object.fromEntries(Object.entries(config).sort(([a], [b]) => (a < b ? -1 : 1))));
  return {
    hash: createHash("sha256").update(canonical).digest("hex").slice(0, 16),
    preferred: (config.preferred || []).length,
    fallback: (config.fallback || []).length,
  };
}

export function loadWispConfig(argv = process.argv.slice(2), env = process.env) {
  const { overrides, warnings, raw } = parseWispArgs(argv);
  const resolved = resolveWispConfig(overrides, env);
  return { ...resolved, raw, warnings: [...warnings, ...resolved.warnings] };
}

export function encodeWispConfig({ preferred = [], fallback = [], ...options }, { key = Array.from(randomBytes(12)), rng = Math.random } = {}) {
  const b64 = bytes => Buffer.from(bytes).toString("base64url");
  const encodeUrl = url => {
    const bytes = Buffer.from(url, "utf8");
    for (let i = 0; i < bytes.length; i++) bytes[i] ^= key[i % key.length];
    const chunks = [];
    for (let at = 0; at < bytes.length; ) {
      const size = 3 + Math.floor(rng() * 6);
      chunks.push(b64(bytes.subarray(at, at + size)));
      at += size;
    }
    return chunks;
  };
  const check = url => {
    if (!/^wss?:\/\/[^\s]+$/i.test(url)) throw new WispArgError(`Wisp config: "${url}" is not a ws:// or wss:// URL`);
    return url;
  };
  const numeric = ["timeoutMs", "verifyTtlMs", "cooldownMs", "maxCooldownMs", "recheckMs", "connectDeadlineMs"];
  const o = Object.fromEntries(Object.entries(options).filter(([name, value]) => (numeric.includes(name) && Number.isFinite(value) && value > 0) || (["sameOrigin", "requireHandshake"].includes(name) && typeof value === "boolean")));
  if (o.sameOrigin === false && !preferred.length && !fallback.length) throw new WispArgError("Wisp config: sameOrigin is false but no preferred or fallback endpoints are listed. The built site would have no Wisp server at all.");
  return { k: key, p: preferred.map(check).map(encodeUrl), f: fallback.map(check).map(encodeUrl), o };
}

export function wispConfigStatement(config) {
  return `globalThis.__wispCfg = ${JSON.stringify(encodeWispConfig(config))};`;
}
