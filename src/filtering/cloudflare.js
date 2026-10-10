import { LookupError } from "./network.js";

export const FAMILIES_DOH_URL = "https://family.cloudflare-dns.com/dns-query";

const TYPE_A = 1;
const TYPE_AAAA = 28;
const RCODE_NOERROR = 0;
const RCODE_NXDOMAIN = 3;
const EDE_POLICY = /^EDE\((15|16|17|18)\)/;
const TIMEOUT_MS = 3000;

async function queryType(host, type, { fetch, timeoutMs }) {
  const response = await fetch(`${FAMILIES_DOH_URL}?name=${host}&type=${type}`, {
    headers: { accept: "application/dns-json" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) throw new LookupError(`Families DoH answered HTTP ${response.status}`, "UPSTREAM");

  const body = await response.json();
  if (body.Status !== RCODE_NOERROR && body.Status !== RCODE_NXDOMAIN) {
    throw new LookupError(`Families DoH returned status ${body.Status}`, "UPSTREAM");
  }

  const answers = (body.Answer ?? []).filter(answer => answer.type === type);
  const filtered = (body.Comment ?? []).some(comment => EDE_POLICY.test(String(comment)));
  return { filtered, nxdomain: body.Status === RCODE_NXDOMAIN, addresses: answers.map(answer => answer.data) };
}

export async function resolveFamilies(host, { fetch = globalThis.fetch, timeoutMs = TIMEOUT_MS } = {}) {
  const options = { fetch, timeoutMs };
  const [ipv4, ipv6] = await Promise.all([queryType(host, TYPE_A, options), queryType(host, TYPE_AAAA, options)]);
  if (ipv4.filtered || ipv6.filtered) return { blocked: true, addresses: [] };
  return { blocked: false, nxdomain: ipv4.nxdomain && ipv6.nxdomain, addresses: [...ipv4.addresses, ...ipv6.addresses] };
}
