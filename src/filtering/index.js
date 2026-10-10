import net from "node:net";
import { packet } from "@mercuryworkshop/wisp-js/server";
import { AdguardFilter } from "./adguard.js";
import { resolveFamilies } from "./cloudflare.js";
import { LookupError, isPublicAddress, normalizeHostname, systemLookup } from "./network.js";

const reportingClasses = new WeakSet();

export function createHostnamePolicy({ adguard = null, families = false, resolve = resolveFamilies, lookup = systemLookup } = {}) {
  return async function checkHostname(rawHost) {
    const host = normalizeHostname(rawHost);

    if (adguard) {
      const verdict = adguard.check(host);
      if (verdict.unavailable) throw new LookupError(`AdGuard list not loaded, refusing ${host}`, "FILTER_UNAVAILABLE");
      if (verdict.blocked) throw new LookupError(`${host} is blocked by the AdGuard ${verdict.category} filter`, "BLOCKED", verdict.category);
    }

    let addresses;
    if (families) {
      let answer;
      try {
        answer = await resolve(host);
      } catch (error) {
        throw new LookupError(`Cloudflare Families lookup failed for ${host}: ${error.message}`, "FILTER_UNAVAILABLE");
      }
      if (answer.blocked) throw new LookupError(`${host} is blocked by Cloudflare Families`, "BLOCKED", "families");
      if (answer.nxdomain) throw new LookupError(`${host} does not exist`, "NXDOMAIN");
      addresses = answer.addresses;
    } else {
      try {
        addresses = await lookup(host);
      } catch (error) {
        throw new LookupError(`lookup failed for ${host}: ${error.code ?? error.message}`, "LOOKUP_FAILED");
      }
    }

    if (addresses.length === 0) throw new LookupError(`${host} has no address records`, "NOT_FOUND");
    if (addresses.some(address => !isPublicAddress(address))) {
      throw new LookupError(`${host} resolves to a non-public address`, "PRIVATE_ADDRESS");
    }
    return addresses.find(address => net.isIPv4(address)) ?? addresses[0];
  };
}

const CLOSE_REASON_BY_CODE = {
  BLOCKED: packet.close_reasons.HostBlocked,
  NXDOMAIN: packet.close_reasons.UnreachableHost,
};

export function reportPolicyBlocks(ServerStream) {
  if (reportingClasses.has(ServerStream)) return;
  const setup = ServerStream.prototype.setup;
  if (typeof setup !== "function") throw new TypeError("wisp-js ServerStream has no setup(), cannot report policy blocks");
  ServerStream.prototype.setup = async function setupReportingPolicyBlocks() {
    try {
      await setup.call(this);
    } catch (error) {
      const reason = error instanceof LookupError ? CLOSE_REASON_BY_CODE[error.code] : undefined;
      if (reason === undefined) throw error;
      await this.conn.close_stream(this.stream_id, reason);
    }
  };
  reportingClasses.add(ServerStream);
}

export async function setupFiltering({ wisp, filtering, log = console.log, warn = console.warn }) {
  const enabled = filtering?.enabled === true;
  const families = enabled && filtering.cloudflareFamilies === true;
  const categories = {
    ads: enabled && filtering.adblock === true,
    trackers: enabled && filtering.blockTrackers === true,
  };
  if (!families && !categories.ads && !categories.trackers) return { active: false, policy: null };

  wisp.options.allow_direct_ip = false;

  const adguard = categories.ads || categories.trackers ? new AdguardFilter({ categories, log, warn }) : null;
  if (adguard) await adguard.start();

  const policy = createHostnamePolicy({ adguard, families });
  wisp.options.dns_method = policy;
  reportPolicyBlocks(wisp.ServerStream);
  log(`Filtering on: Cloudflare Families ${families ? "on" : "off"}, AdGuard ads ${categories.ads ? "on" : "off"}, trackers ${categories.trackers ? "on" : "off"}`);
  return { active: true, adguard, families, policy };
}

export function createBlockVerdict({ blocklist = [], policy = null } = {}) {
  return async function blockVerdict(rawHost) {
    let host;
    try {
      host = normalizeHostname(rawHost);
    } catch {
      return { blocked: false };
    }
    if (blocklist.some(matcher => matcher.test(host))) return { blocked: true, source: "blocklist" };
    if (!policy) return { blocked: false };
    try {
      await policy(host);
      return { blocked: false };
    } catch (error) {
      if (error instanceof LookupError && error.code === "BLOCKED") return { blocked: true, source: error.source };
      return { blocked: false };
    }
  };
}
