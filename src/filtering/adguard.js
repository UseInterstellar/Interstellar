export const ADGUARD_DNS_FILTER_URL = "https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt";

const REFRESH_MS = 12 * 60 * 60 * 1000;
const RETRY_MS = 60 * 1000;
const FETCH_TIMEOUT_MS = 60 * 1000;
const MIN_USABLE_RULES = 1000;
const TRACKER_SECTION = /tracking|privacy|tracker/i;
const SOURCE_HEADER = /^!\s*Source name:\s*(.*)$/i;
const DOMAIN_RULE = /^(@@)?\|\|([a-z0-9-]+(?:\.[a-z0-9-]+)+)\^?(?:\$([a-z0-9_,~=-]+))?$/i;

export function parseAdguardList(text) {
  const ads = new Set();
  const trackers = new Set();
  const allows = new Set();
  const badfilter = new Set();
  const skipped = {};
  let inTrackerSection = false;

  const skip = reason => {
    skipped[reason] = (skipped[reason] ?? 0) + 1;
  };

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("[")) continue;
    if (line[0] === "!" || line[0] === "#") {
      const source = SOURCE_HEADER.exec(line);
      if (source) inTrackerSection = TRACKER_SECTION.test(source[1]);
      continue;
    }

    const match = DOMAIN_RULE.exec(line);
    if (!match) {
      skip("unsupported syntax");
      continue;
    }
    const [, exception, name, modifierText] = match;
    const domain = name.toLowerCase();
    const modifiers = modifierText ? modifierText.split(",") : [];

    if (exception) {
      if (modifiers.length) skip("exception with modifiers");
      else allows.add(domain);
      continue;
    }
    if (modifiers.includes("badfilter")) {
      badfilter.add(domain);
      continue;
    }
    const unsupported = modifiers.find(modifier => modifier !== "important");
    if (unsupported) {
      skip(`modifier $${unsupported}`);
      continue;
    }
    (inTrackerSection ? trackers : ads).add(domain);
  }

  for (const domain of badfilter) {
    ads.delete(domain);
    trackers.delete(domain);
  }

  return { ads, trackers, allows, skipped };
}

function domainChain(host) {
  const labels = host.split(".");
  const chain = [];
  for (let i = 0; i < labels.length - 1; i++) chain.push(labels.slice(i).join("."));
  return chain;
}

async function defaultFetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

export class AdguardFilter {
  constructor({ url = ADGUARD_DNS_FILTER_URL, categories, refreshMs = REFRESH_MS, fetchText = defaultFetchText, log = console.log, warn = console.warn }) {
    this.url = url;
    this.categories = categories;
    this.refreshMs = refreshMs;
    this.fetchText = fetchText;
    this.log = log;
    this.warn = warn;
    this.rules = null;
    this.pending = null;
    this.timer = null;
    this.retryTimer = null;
  }

  start() {
    this.timer = setInterval(() => this.refresh(), this.refreshMs);
    this.timer.unref();
    return this.refresh();
  }

  refresh() {
    if (!this.pending) {
      this.pending = this.load().finally(() => {
        this.pending = null;
      });
    }
    return this.pending;
  }

  async load() {
    try {
      const text = await this.fetchText(this.url);
      const parsed = parseAdguardList(text);
      const usable = parsed.ads.size + parsed.trackers.size;
      if (usable < MIN_USABLE_RULES) throw new Error(`only ${usable} usable domain rules`);
      this.rules = parsed;
      const skipped = Object.values(parsed.skipped).reduce((sum, count) => sum + count, 0);
      this.log(`AdGuard DNS filter loaded: ${parsed.ads.size} ad domains, ${parsed.trackers.size} tracker domains, ${parsed.allows.size} exceptions, ${skipped} rules skipped`);
    } catch (error) {
      this.warn(`AdGuard DNS filter refresh failed: ${error.message}${this.rules ? ", keeping the previous list" : ""}`);
      if (!this.rules && !this.retryTimer) {
        this.retryTimer = setTimeout(() => {
          this.retryTimer = null;
          this.refresh();
        }, RETRY_MS);
        this.retryTimer.unref();
      }
    }
  }

  check(host) {
    if (!this.rules) return { unavailable: true };
    const chain = domainChain(host);
    if (chain.some(domain => this.rules.allows.has(domain))) return { blocked: false };
    for (const domain of chain) {
      if (this.categories.ads && this.rules.ads.has(domain)) return { blocked: true, category: "ads" };
      if (this.categories.trackers && this.rules.trackers.has(domain)) return { blocked: true, category: "trackers" };
    }
    return { blocked: false };
  }
}
