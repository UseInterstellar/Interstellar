import { randomBytes } from "node:crypto";


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
    if (!/^wss?:\/\/[^\s]+$/i.test(url)) throw new Error(`wisp.config.js: "${url}" is not a ws:// or wss:// URL`);
    return url;
  };
  const numeric = ["timeoutMs", "verifyTtlMs", "cooldownMs", "maxCooldownMs", "recheckMs", "connectDeadlineMs"];
  const o = Object.fromEntries(Object.entries(options).filter(([name, value]) => (numeric.includes(name) && Number.isFinite(value) && value > 0) || (["sameOrigin", "requireHandshake"].includes(name) && typeof value === "boolean")));
  if (o.sameOrigin === false && !preferred.length && !fallback.length) throw new Error("wisp.config.js: sameOrigin is false but no preferred or fallback endpoints are listed. The built site would have no Wisp server at all.");
  return { k: key, p: preferred.map(check).map(encodeUrl), f: fallback.map(check).map(encodeUrl), o };
}

export function wispConfigStatement(config) {
  return `globalThis.__wispCfg = ${JSON.stringify(encodeWispConfig(config))};`;
}
