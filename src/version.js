import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { inflateSync } from "node:zlib";

const VERSION_TOKENS = [
  ["{{VERSION}}", info => (info.version ? `v${info.version}` : "-")],
  ["{{LAST_UPDATED}}", info => info.updated || "-"],
];
export const VERSION_TOKEN_COUNT = VERSION_TOKENS.length;

function escapeHtmlText(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

async function readMaybe(file) {
  try {
    return (await readFile(file, "utf8")).trim();
  } catch {
    return null;
  }
}

async function packedRefSha(gitDir, ref) {
  const packed = await readMaybe(path.join(gitDir, "packed-refs"));
  if (!packed) return null;
  for (const line of packed.split("\n")) {
    if (!line || line[0] === "#" || line[0] === "^") continue;
    const sp = line.indexOf(" ");
    if (line.slice(sp + 1) === ref) return line.slice(0, sp);
  }
  return null;
}

async function headCommitSha(gitDir) {
  const head = await readMaybe(path.join(gitDir, "HEAD"));
  if (!head) return null;
  if (!head.startsWith("ref:")) return head;
  const ref = head.slice(4).trim();
  return (await readMaybe(path.join(gitDir, ref))) ?? (await packedRefSha(gitDir, ref));
}

function commitTimeFromGit(root) {
  try {
    const ts = execFileSync("git", ["log", "-1", "--format=%ct"], { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return ts ? Number(ts) * 1000 : null;
  } catch {
    return null;
  }
}

async function commitTimeMs(root) {
  const gitDir = path.join(root, ".git");
  const sha = await headCommitSha(gitDir);
  if (sha) {
    try {
      const text = inflateSync(await readFile(path.join(gitDir, "objects", sha.slice(0, 2), sha.slice(2)))).toString("utf8");
      const m = text.match(/\ncommitter [^\n]*? (\d+) [+-]\d{4}\n/);
      if (m) return Number(m[1]) * 1000;
    } catch {}
  }
  return commitTimeFromGit(root);
}

function formatCommitDate(ms) {
  const d = new Date(ms);
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const day = d.getUTCDate();
  const tens = day % 100;
  const suffix = tens >= 11 && tens <= 13 ? "th" : ["th", "st", "nd", "rd"][day % 10] || "th";
  return `${month} ${day}${suffix}, ${d.getUTCFullYear()}`;
}

export async function resolveVersionInfo() {
  const root = process.cwd();
  let version = null;
  try {
    version = JSON.parse(await readFile(path.join(root, "package.json"), "utf8")).version || null;
  } catch {}
  let ms = null;
  try {
    ms = await commitTimeMs(root);
  } catch {}
  return { version, updated: ms === null ? null : formatCommitDate(ms) };
}

export function injectVersionInfo(html, info) {
  let count = 0;
  let out = html;
  for (const [token, format] of VERSION_TOKENS) {
    const occurrences = out.split(token).length - 1;
    if (occurrences !== 1) throw new Error(`settings.html: expected exactly one ${token}, found ${occurrences}. Upstream changed.`);
    out = out.replace(token, () => escapeHtmlText(format(info)));
    count++;
  }
  return { html: out, count };
}
