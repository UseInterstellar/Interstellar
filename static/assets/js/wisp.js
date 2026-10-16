
(() => {
  const DEFAULTS = {
    timeoutMs: 5000,
    verifyTtlMs: 60000,
    cooldownMs: 30000,
    maxCooldownMs: 600000,
    recheckMs: 300000,
    connectDeadlineMs: 20000,
    requireHandshake: true,
  };

  class WispUnavailableError extends Error {
    constructor(attempts, { skipped = 0, reason = "unreachable" } = {}) {
      super("No Wisp server could be reached");
      this.name = "WispUnavailableError";
      this.attempts = attempts;
      this.skipped = skipped;
      this.reason = reason;
    }
  }

  function unb64(text) {
    const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
    return out;
  }


  function decodeConfig(blob) {
    if (!blob) return null;
    const { k: key, p, f, o } = blob;
    const url = chunks => {
      const parts = chunks.map(unb64);
      const bytes = new Uint8Array(parts.reduce((n, part) => n + part.length, 0));
      let at = 0;
      for (const part of parts) {
        bytes.set(part, at);
        at += part.length;
      }
      for (let i = 0; i < bytes.length; i++) bytes[i] ^= key[i % key.length];
      return new TextDecoder().decode(bytes);
    };
    return { preferred: p.map(url), fallback: f.map(url), ...o };
  }

  function sameOriginUrl() {
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    return `${protocol}://${location.host}/wisp/`;
  }


  function loadConfig() {
    const decoded = decodeConfig(globalThis.__wispCfg);
    if (!decoded) return { preferred: [sameOriginUrl()], fallback: [] };
    if (!decoded.preferred.length && !decoded.fallback.length && decoded.sameOrigin !== false) return { ...decoded, preferred: [sameOriginUrl()] };
    return decoded;
  }


  function isWispHello(data) {
    if (!(data instanceof ArrayBuffer)) return false;
    const view = new DataView(data);
    if (view.byteLength < 5 || view.getUint32(1, true) !== 0) return false;
    const type = view.getUint8(0);
    return (type === 0x03 && view.byteLength >= 9) || (type === 0x05 && view.byteLength >= 7);
  }


  function probe(url, { timeoutMs, WebSocketImpl, signal, requireHandshake = true }) {
    return new Promise((resolve, reject) => {
      let socket;
      let timer;
      let done = false;
      let opened = false;
      const finish = (error, reason) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        signal?.removeEventListener("abort", onAbort);
        try {
          if (socket) {
            socket.onopen = socket.onerror = socket.onclose = socket.onmessage = null;
            socket.close();
          }
        } catch {}
        if (error) reject(Object.assign(new Error(reason), { reason }));
        else resolve();
      };
      const onAbort = () => finish(true, "aborted");
      if (signal?.aborted) return finish(true, "aborted");
      signal?.addEventListener("abort", onAbort, { once: true });
      try {
        socket = new WebSocketImpl(url);
        socket.binaryType = "arraybuffer";
      } catch {
        return finish(true, "invalid");
      }
      timer = setTimeout(() => finish(true, opened ? "no-handshake" : "timeout"), timeoutMs);
      socket.onopen = () => {
        opened = true;
        if (!requireHandshake) finish(false);
      };
      socket.onmessage = event => finish(!isWispHello(event.data), "protocol");
      socket.onerror = () => finish(true, "error");
      socket.onclose = () => finish(true, "closed");
    });
  }

  function shuffle(list, random) {
    const out = list.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function keyOf(url) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < url.length; i++) hash = Math.imul(hash ^ url.charCodeAt(i), 0x01000193);
    return (hash >>> 0).toString(16);
  }

  function memoryStorage() {
    let state = null;
    return {
      load: () => state,
      save: value => {
        state = value;
      },
    };
  }


  function createSelector({ config, WebSocketImpl = globalThis.WebSocket, random = Math.random, now = Date.now, storage = memoryStorage() }) {
    const opts = { ...DEFAULTS, ...config };
    const lists = [
      ["preferred", [...new Set(config.preferred || [])]],
      ["fallback", [...new Set(config.fallback || [])]],
    ];

    const read = () => {
      const saved = storage.load() || {};
      return { active: saved.active || null, fails: { ...saved.fails }, checked: saved.checked || 0 };
    };
    const update = change => {
      const state = read();
      change(state);
      storage.save(state);
    };
    const cooldownOf = failures => Math.min(opts.cooldownMs * 2 ** (failures - 1), opts.maxCooldownMs);
    const recordFailure = (state, key) => {
      const n = (state.fails[key]?.n || 0) + 1;
      state.fails[key] = { n, until: now() + cooldownOf(n) };
    };

    function order(urls, active) {
      const ordered = shuffle(urls, random);
      const at = ordered.findIndex(url => keyOf(url) === active?.k);
      if (at > 0) ordered.unshift(...ordered.splice(at, 1));
      return ordered;
    }

    const selector = {
      async select({ signal, force = false, tiers = ["preferred", "fallback"] } = {}) {
        const attempts = [];
        let skipped = 0;
        let configured = 0;
        const state = read();
        for (const [tier, urls] of lists) {
          if (!tiers.includes(tier)) continue;
          configured += urls.length;
          for (const url of order(urls, state.active)) {
            if (signal?.aborted) throw new WispUnavailableError(attempts, { skipped, reason: "deadline" });
            const key = keyOf(url);
            if (!force && (state.fails[key]?.until ?? 0) > now()) {
              skipped++;
              continue;
            }
            if (state.active?.k === key && state.active.tier === tier && now() - state.active.at < opts.verifyTtlMs) return { url, tier, attempts };
            try {
              await probe(url, { timeoutMs: opts.timeoutMs, WebSocketImpl, signal, requireHandshake: opts.requireHandshake });
              update(next => {
                next.active = { k: key, tier, at: now() };
                delete next.fails[key];
              });
              return { url, tier, attempts };
            } catch (error) {
              const reason = error.reason || "error";
              attempts.push({ url, tier, reason });
              if (reason !== "aborted") update(next => recordFailure(next, key));
            }
          }
        }
        throw new WispUnavailableError(attempts, { skipped, reason: signal?.aborted ? "deadline" : configured ? "unreachable" : "not-configured" });
      },


      reportFailure(url) {
        const key = keyOf(url);
        const state = read();
        if (state.active && state.active.k !== key) return false;
        update(next => {
          next.active = null;
          recordFailure(next, key);
        });
        return true;
      },


      async reconsiderPreferred({ signal } = {}) {
        const state = read();
        if (state.active?.tier !== "fallback") return null;
        if (now() - state.checked < opts.recheckMs) return null;
        update(next => {
          next.checked = now();
        });
        try {
          return await selector.select({ signal, tiers: ["preferred"] });
        } catch (error) {
          if (error instanceof WispUnavailableError) return null;
          throw error;
        }
      },
    };
    return selector;
  }


  function createManager({ selector, apply, lock = run => run(), getCustom = () => null }) {
    let current = null;

    const use = async selection => {
      current = selection;
      await apply(selection.url);
      return selection;
    };

    return {
      get current() {
        return current;
      },
      async connect({ force = false, signal } = {}) {
        const custom = getCustom();
        if (custom) return use({ url: custom, tier: "custom", attempts: [] });
        try {
          return await lock(async () => use(await selector.select({ force, signal })), signal);
        } catch (error) {
          if (signal?.aborted && !(error instanceof WispUnavailableError)) throw new WispUnavailableError([], { reason: "deadline" });
          throw error;
        }
      },
      async recover(url, { signal } = {}) {
        if (!current || current.url !== url || current.tier === "custom") return null;
        return lock(async () => {
          selector.reportFailure(url);
          return use(await selector.select({ signal }));
        }, signal);
      },
      async recheck() {
        if (current?.tier !== "fallback") return null;
        return lock(async () => {
          const better = await selector.reconsiderPreferred();
          return better && better.url !== current.url ? use(better) : null;
        });
      },
    };
  }


  const TRANSPORT_ERROR = /Wisp WebSocket failed to connect|Multiplexor task ended|Failed to (?:send|receive) multiplexor message|Incompatible Wisp protocol version|Invalid Wisp transport|Websocket implementation error/;
  function classifyError(message) {
    const text = String(message);
    if (text.includes("WispCloseReason(")) return "stream";
    return TRANSPORT_ERROR.test(text) ? "transport" : "other";
  }

  function showError(error, onRetry) {
    const id = "wisp-error";
    document.getElementById(id)?.remove();
    const box = document.createElement("div");
    box.id = id;
    box.setAttribute("role", "alert");
    box.style.cssText = "position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:2147483647;max-width:min(92vw,420px);padding:14px 16px;border-radius:10px;background:#1c1c24;color:#f2f2f5;font:14px/1.4 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.45);display:flex;gap:12px;align-items:center";
    const tried = error?.attempts?.length || 0;
    const text = document.createElement("span");
    text.textContent =
      error?.reason === "not-configured"
        ? "No proxy servers are configured for this site."
        : error?.reason === "deadline"
          ? "Connecting to a proxy server is taking too long. Check your connection and retry."
          : tried
            ? `Couldn't connect to any proxy server (${tried} tried). Check your connection and retry.`
            : "Proxy servers were unreachable a moment ago. Retry to try them again.";
    const button = document.createElement("button");
    button.textContent = "Retry";
    button.style.cssText = "flex:none;padding:6px 12px;border:0;border-radius:6px;background:#6c7bff;color:#fff;cursor:pointer;font:inherit";
    button.onclick = () => {
      box.remove();
      onRetry();
    };
    box.append(text, button);
    document.body.append(box);
  }

  globalThis.WispSelector = { createSelector, createManager, decodeConfig, probe, isWispHello, classifyError, TRANSPORT_ERROR, showError, loadConfig, keyOf, WispUnavailableError };
})();
