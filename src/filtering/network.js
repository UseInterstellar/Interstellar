import dns from "node:dns/promises";
import net from "node:net";

export class LookupError extends Error {
  constructor(message, code, source = null) {
    super(message);
    this.name = "LookupError";
    this.code = code;
    this.source = source;
  }
}

const PRIVATE_RANGES = new net.BlockList();
for (const [address, prefix] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
]) {
  PRIVATE_RANGES.addSubnet(address, prefix, "ipv4");
}
for (const [address, prefix] of [
  ["::", 128],
  ["::1", 128],
  ["fc00::", 7],
  ["fe80::", 10],
  ["ff00::", 8],
]) {
  PRIVATE_RANGES.addSubnet(address, prefix, "ipv6");
}

export function isPublicAddress(address) {
  const family = net.isIP(address);
  if (family === 0) return false;
  if (family === 6 && address.toLowerCase().startsWith("::ffff:")) {
    const mapped = address.slice(7);
    return net.isIPv4(mapped) && isPublicAddress(mapped);
  }
  return !PRIVATE_RANGES.check(address, family === 4 ? "ipv4" : "ipv6");
}

const HOSTNAME = /^(?=.{1,253}$)([a-z0-9-]{1,63}\.)+[a-z0-9-]{2,63}$/;

export function normalizeHostname(raw) {
  const host = String(raw).trim().toLowerCase().replace(/\.$/, "");
  if (!HOSTNAME.test(host)) throw new LookupError(`refusing non-hostname ${JSON.stringify(raw)}`, "INVALID_HOST");
  return host;
}

export async function systemLookup(host) {
  const records = await dns.lookup(host, { all: true, verbatim: true });
  return records.map(record => record.address);
}
