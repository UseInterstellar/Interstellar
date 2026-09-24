import { createHash, randomBytes } from "node:crypto";
import { access, cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import chalk from "chalk";
import JavaScriptObfuscator from "javascript-obfuscator";
import { minify } from "terser";
import { injectVersionInfo, resolveVersionInfo, VERSION_TOKEN_COUNT } from "./version.js";

const OBFUSCATOR_PROMO_PATTERN = /\[javascript-obfuscator\]|JavaScript Obfuscator Pro|obfuscator\.io/i;

for (const method of ["log", "info", "warn"]) {
  const original = console[method].bind(console);
  console[method] = (...args) => {
    if (args.some(arg => OBFUSCATOR_PROMO_PATTERN.test(String(arg)))) return;
    original(...args);
  };
}

const OBFUSCATE = true;
const OBFUSCATE_HTML = true;

const SRC_DIR = path.join(process.cwd(), "static");
const DIST_DIR = path.join(process.cwd(), "dist");
const JS_DIR = path.join(DIST_DIR, "assets", "js");
const RUNTIME_DIR = path.join(DIST_DIR, ".runtime");

const require = createRequire(import.meta.url);
const { epoxyPath } = require("@mercuryworkshop/epoxy-transport");
const { baremuxPath } = require("@mercuryworkshop/bare-mux/node");
const { libcurlPath } = require("@mercuryworkshop/libcurl-transport");
const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");
const { scramjetPath } = require("@mercuryworkshop/scramjet/path");

const TERSER_ONLY = new Set();

function createCatalogueKey() {
  return Array.from(randomBytes(16));
}

function encodeCatalogue(json, key) {
  const bytes = Buffer.from(json, "utf8");
  const out = Buffer.alloc(bytes.length);
  for (let index = 0; index < bytes.length; index++) out[index] = bytes[index] ^ key[index % key.length];
  return JSON.stringify(out.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""));
}

const UNUSED_JSON = ["apps.json", "games.json"];
const RANDOMIZED_JSON = ["apps.min.json", "games.min.json"];
const UNUSED_CSS = ["assets/css/themes/template.css"];

const VENDOR_DROPPED_CONSOLE = ["console.log", "console.debug", "console.info", "console.warn"];

const VENDOR_SIZE_TOLERANCE = 1;

const RESERVED_GLOBALS =
  "Ultraviolet UVClient UVServiceWorker __uv __uvHook __uv$config __uv$cookies __uv$referrer $scramjetLoadWorker $scramjetLoadController $scramjetLoadClient $scramjetRequire $scramjetVersion __scramjet$config COOKIE WASM BareMuxConnection BareClient BareWebSocket WebSocketFields WorkerConnection browserSupportsTransferringStreams maxRedirects validProtocol epoxyInfo onconnect".split(
    " ",
  );

function vendorTerserOptions({ module, aggressive }) {
  return {
    ecma: 2020,
    module,
    compress: { passes: 2, pure_funcs: VENDOR_DROPPED_CONSOLE },
    mangle: { toplevel: Boolean(aggressive), reserved: RESERVED_GLOBALS },
    format: { comments: false },
  };
}

const OLD_UV_SCOPE = "/uv/";
const OLD_SCRAMJET_SCOPE = "/uv/scramjet/";

const RETIRED_PUBLIC_PREFIXES = ["/assets/ultraviolet/", "/assets/scramjet/", "/epoxy/", "/libcurl/", "/baremux/"];

const WORDS =
  "api lib src net sys io pkg app mod ext math calc units matrix vector scalar ratio delta sigma alpha beta gamma omega phi theta core util data base node tree heap stack queue graph hash map set list ring chain parse fmt log proc exec init boot load sync async fetch emit bind wrap pool fork dictionary mapping resolver adapter encoder decoder scheduler dispatcher observer registry factory builder transform pipeline middleware handler router broker storage cache buffer stream channel socket bridge monitor profiler tracer validator sanitizer 1 2 3 v1 v2 v3 that was my part of the deal honest we got so familiar spending each day of the year white ferrari good times".split(
    " ",
  );

const FILENAMES =
  "x y z a b c d e f g h 1 2 3 10 11 100 mod lib api run cli app env cfg index main core init loader worker runtime parser formatter handler manager client server config schema mapper adapter resolver encoder decoder sync fetch stream buffer queue cache router dispatcher emitter observer builder factory transform pipeline registry validator scheduler monitor tracer bridge channel storage profiler".split(
    " ",
  );

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSegment() {
  if (Math.random() < 0.1) return `${randomItem(WORDS)}-${randomItem(WORDS)}`;
  return randomItem(WORDS);
}

function randomWord() {
  return randomItem(WORDS);
}

function randomFilename() {
  if (Math.random() < 0.1) return `${randomItem(FILENAMES)}-${randomItem(FILENAMES)}`;
  return randomItem(FILENAMES);
}

function replaceAll(content, oldStr, newStr) {
  return content.split(oldStr).join(newStr);
}

class PathRegistry {
  constructor() {
    this.paths = new Set();
    this.topDirs = new Set();
  }

  reserveTopDir(name) {
    this.topDirs.add(name);
  }

  dir() {
    for (;;) {
      const depth = randomInt(1, 2);
      const segments = Array.from({ length: depth }, randomSegment);
      if (this.topDirs.has(segments[0])) continue;
      return segments.join("/");
    }
  }

  file(ext, baseDir) {
    for (;;) {
      const dir = baseDir ?? this.dir();
      const publicPath = `/${dir}/${randomFilename()}${ext}`;
      if (this.paths.has(publicPath)) continue;
      this.paths.add(publicPath);
      return publicPath;
    }
  }

  rootFile(ext) {
    for (;;) {
      const publicPath = `/${randomFilename()}${ext}`;
      if (this.paths.has(publicPath)) continue;
      this.paths.add(publicPath);
      return publicPath;
    }
  }
}

function pathVariants(publicPath, { bare = true, parent = false } = {}) {
  const relative = publicPath.slice(1);
  const variants = [publicPath, `./${relative}`];
  if (parent) variants.push(`../${relative}`);
  if (bare) variants.push(relative);
  return variants;
}

function orderRewrites(map) {
  return [...map.entries()].sort((a, b) => b[0].length - a[0].length);
}

function applyRewrites(content, orderedRewrites) {
  let result = content;
  for (const [from, to] of orderedRewrites) result = replaceAll(result, from, to);
  return result;
}

const URL_CODEC_NAMES = ["xor"];

const URL_CODEC_FUNCTIONS = {
  xor: {
    encode: 'url => url && encodeURIComponent(url.split("").map((char, index) => (index % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char)).join(""))',
    decode:
      'url => { if (!url) return url; const index = url.search(/[?#]/); const value = index < 0 ? url : url.slice(0, index); const tail = index < 0 ? "" : url.slice(index); return decodeURIComponent(value).split("").map((char, index) => (index % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char)).join("") + tail; }',
  },
};

function randomXorKey() {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  const firstChars = "23456789abcdefghijklmnopqrstuvwxyz";
  const length = randomInt(1, 2);
  let key = randomItem(firstChars);
  for (let index = 1; index < length; index++) key += randomItem(chars);
  return key;
}

function xorKeyValue(key) {
  const value = /^\d+$/.test(key) ? Number(key) : parseInt(key, 36);
  return Number.isFinite(value) && value > 1 ? (value % 30) + 2 : 2;
}

function randomCodecSpec(names = URL_CODEC_NAMES, keyed = true) {
  const codec = randomItem(names);
  return keyed && codec === "xor" ? `${codec}:${randomXorKey()}` : codec;
}

function parseCodecSpec(spec) {
  const [codec, ...keyParts] = String(spec).split(":");
  return { codec, key: keyParts.join(":") };
}

function createXorCodec(key) {
  if (!key) return URL_CODEC_FUNCTIONS.xor;

  const encodedKey = xorKeyValue(key);
  const encodeValue = `(url => encodeURIComponent(url.split("").map((char, index) => (index % ${encodedKey} ? String.fromCharCode(char.charCodeAt(0) ^ ${encodedKey}) : char)).join("")))`;
  const decodeValue = `(url => decodeURIComponent(url).split("").map((char, index) => (index % ${encodedKey} ? String.fromCharCode(char.charCodeAt(0) ^ ${encodedKey}) : char)).join(""))`;
  return {
    encode: `url => url && ${encodeValue}(url)`,
    decode: `url => { if (!url) return url; const index = url.search(/[?#]/); const value = index < 0 ? url : url.slice(0, index); const tail = index < 0 ? "" : url.slice(index); return ${decodeValue}(value) + tail; }`,
  };
}

function getUrlCodecFunctions(codec, key) {
  if (codec === "xor") return createXorCodec(key);
  return URL_CODEC_FUNCTIONS[codec];
}

function createProxyCodecs() {
  return {
    uv: randomCodecSpec(URL_CODEC_NAMES),
    scramjet: randomCodecSpec(URL_CODEC_NAMES),
  };
}

class CodecPatchError extends Error {
  constructor(message) {
    super(message);
    this.name = "CodecPatchError";
  }
}

class VerificationError extends Error {
  constructor(message) {
    super(message);
    this.name = "VerificationError";
  }
}

function patchOrFail(content, pattern, replacement, label, required = true) {
  if (!pattern.test(content)) {
    if (!required) return content;
    throw new CodecPatchError(`${label}: pattern no longer matches. Upstream file changed - update the pattern in patchProxyCodecs().`);
  }
  pattern.lastIndex = 0;
  return content.replace(pattern, replacement);
}

const SCRAMJET_GLOBAL_DEFAULTS = {
  wrapfn: "$scramjet$wrap",
  wrappropertybase: "$scramjet__",
  wrappropertyfn: "$scramjet$prop",
  cleanrestfn: "$scramjet$clean",
  importfn: "$scramjet$import",
  rewritefn: "$scramjet$rewrite",
  metafn: "$scramjet$meta",
  setrealmfn: "$scramjet$setrealm",
  pushsourcemapfn: "$scramjet$pushsourcemap",
  trysetfn: "$scramjet$tryset",
  templocid: "$scramjet$temploc",
  tempunusedid: "$scramjet$tempunused",
};

function createScramjetGlobals() {
  const token = randomBytes(4).toString("hex");
  const globals = {};
  let index = 0;
  for (const name of Object.keys(SCRAMJET_GLOBAL_DEFAULTS)) globals[name] = `_${token}$${(index++).toString(36)}${randomBytes(2).toString("hex")}`;
  return globals;
}

const SCRAMJET_DEFAULT_PREFIX = '"/scramjet/"';
const SCRAMJET_DEFAULT_PATH_LITERALS = [
  ['"/scramjet.wasm.wasm"', "sj.wasm"],
  ['"/scramjet.all.js"', "sj.all"],
  ['"/scramjet.sync.js"', "sj.sync"],
];

function applyScramjetDefaults(source, specs, scope) {
  const byId = Object.fromEntries(specs.map(spec => [spec.id, spec.publicPath]));
  const pairs = [[SCRAMJET_DEFAULT_PREFIX, scope], ...SCRAMJET_DEFAULT_PATH_LITERALS.map(([literal, id]) => [literal, byId[id]])];
  let out = source;
  for (const [literal, value] of pairs) {
    if (!value) throw new CodecPatchError(`scramjet.all.js: no emitted value for the default ${literal}.`);
    const found = out.split(literal).length - 1;
    if (found !== 1) throw new CodecPatchError(`scramjet.all.js: expected 1 occurrence of the default ${literal}, found ${found}. Upstream changed.`);
    out = replaceAll(out, literal, JSON.stringify(value));
  }
  for (const [literal] of pairs) {
    if (out.includes(literal)) throw new CodecPatchError(`scramjet.all.js: the default ${literal} survived the rewrite.`);
  }
  return out;
}

const SCRAMJET_BRANDING = [
  /[ \t]*<li>Updating Scramjet<\/li>\n/,
  /[ \t]*<li>Troubleshooting the error on the <a href="https:\/\/github\.com\/MercuryWorkshop\/scramjet"[^>]*>GitHub repository<\/a><\/li>\n/,
  /[ \t]*<p id="version-wrapper"><i>Scramjet v<span id="version"><\/span> \(build <span id="build"><\/span>\)<\/i><\/p>\n/,
  /[ \t]*version\.textContent = \$\{JSON\.stringify\(globalThis\.\$scramjetVersion\?\.version\|\|"unknown"\)\};\n/,
  /[ \t]*build\.textContent = \$\{JSON\.stringify\(globalThis\.\$scramjetVersion\?\.build\|\|"unknown"\)\};\n/,
];
const SCRAMJET_TITLE = "<title>Scramjet</title>";
const SCRAMJET_VERSION_LITERAL = /\{build:"[0-9a-f]{7,40}",version:"\d+\.\d+\.\d+"\}/;

function stripScramjetBranding(source) {
  let out = source;
  for (const pattern of SCRAMJET_BRANDING) {
    if (!pattern.test(out)) throw new CodecPatchError(`scramjet.all.js branding: ${pattern} no longer matches. Upstream error page changed.`);
    out = out.replace(pattern, "");
  }
  if (!out.includes(SCRAMJET_TITLE)) throw new CodecPatchError(`scramjet.all.js branding: ${SCRAMJET_TITLE} not found. Upstream error page changed.`);
  out = replaceAll(out, SCRAMJET_TITLE, "<title></title>");
  if (!SCRAMJET_VERSION_LITERAL.test(out)) throw new CodecPatchError("scramjet.all.js: the $scramjetVersion value literal no longer matches. Upstream changed.");
  out = out.replace(SCRAMJET_VERSION_LITERAL, '{build:"unknown",version:"unknown"}');
  for (const marker of ["<title>Scramjet", "Updating Scramjet", "MercuryWorkshop", 'id="version-wrapper"', "Scramjet v<span", "version.textContent", "build.textContent"]) {
    if (out.includes(marker)) throw new CodecPatchError(`scramjet.all.js: branding marker ${marker} survived the strip.`);
  }
  return out;
}

const DIAGNOSTIC_STRINGS = [
  '"attempted to initialize a scramjet client, but one is already loaded - this is very bad"',
  '"YOU NEED TO USE `new ScramjetFrame()`! DIRECT IFRAMES WILL NOT WORK"',
  '"ERROR FROM SCRAMJET INTERNALS"',
  '"bare-mux: failed to get a bare-mux SharedWorker MessagePort as all clients returned an invalid MessagePort."',
  '"Unable to get bare-mux workerPath from localStorage."',
  '"there are no bare clients"',
  '"No BareTransport was set. Try creating a BareMuxConnection and calling `setTransport()` or `setManualTransport()` on it before using BareClient."',
  '"The BareTransport provided was invalid. Common causes of this are a default export that is not a class that implements BareTransport if you are using `setTransport()`"',
];
const DIAGNOSTIC_COUNTS = { "sj.all": 7, "uv.bundle": 2, "uv.client": 2, baremux: 2, "baremux.worker": 3 };

function stripDiagnosticStrings(source, id) {
  let out = source;
  let replaced = 0;
  for (const literal of DIAGNOSTIC_STRINGS) {
    const found = out.split(literal).length - 1;
    if (!found) continue;
    replaced += found;
    out = replaceAll(out, literal, '""');
  }
  if (replaced !== DIAGNOSTIC_COUNTS[id]) throw new CodecPatchError(`${id}: expected ${DIAGNOSTIC_COUNTS[id]} diagnostic strings, replaced ${replaced}. Upstream changed.`);
  for (const literal of DIAGNOSTIC_STRINGS) {
    if (out.includes(literal)) throw new CodecPatchError(`${id}: the diagnostic string ${literal.slice(0, 40)}... survived the strip.`);
  }
  return out;
}

const SCRAMJET_PROTOCOL_DEFAULTS = ["$scramjet$messagetype", "$scramjet$origin", "$scramjet$data", "$scramjet$type", "scramjet$response", "scramjet$request", "scramjet$token", "scramjet$type", "scramjet$port"];
const SCRAMJET_PROTOCOL_COUNTS = { $scramjet$messagetype: 2, $scramjet$origin: 3, $scramjet$data: 4, $scramjet$type: 5, scramjet$response: 3, scramjet$request: 2, scramjet$token: 12, scramjet$type: 25, scramjet$port: 2 };

function createScramjetProtocolKeys() {
  const token = randomBytes(4).toString("hex");
  return SCRAMJET_PROTOCOL_DEFAULTS.map((name, index) => [name, `_${token}${index.toString(36)}${randomBytes(2).toString("hex")}`]);
}

function applyScramjetProtocolKeys(source, protocolKeys) {
  let out = source;
  for (const [from, to] of protocolKeys) {
    const pattern = () => new RegExp(`(?<![\\w$])${from.replace(/\$/g, "\\$")}(?![\\w$])`, "g");
    const found = (out.match(pattern()) || []).length;
    if (found !== SCRAMJET_PROTOCOL_COUNTS[from]) throw new CodecPatchError(`scramjet.all.js: expected ${SCRAMJET_PROTOCOL_COUNTS[from]} occurrences of the protocol key ${from}, found ${found}. Upstream changed.`);
    out = out.replace(pattern(), to);
    if (pattern().test(out)) throw new CodecPatchError(`scramjet.all.js: the protocol key ${from} survived the rewrite.`);
    if ((out.match(new RegExp(`(?<![\\w$])${to}(?![\\w$])`, "g")) || []).length !== found) throw new CodecPatchError(`scramjet.all.js: ${from} -> ${to} did not keep its producer/consumer count.`);
  }
  return out;
}

const BAREMUX_STRING_DEFAULTS = ["bare-mux-worker-", "bare-mux-worker", "bare-mux-remote", "bare-mux-path", "bare-mux", "baremuxinit"];
const BAREMUX_STRING_COUNTS = { "uv.bundle": 14, "uv.client": 17, "uv.handler": 1, "sj.all": 19, baremux: 17, "baremux.worker": 4 };

function createBaremuxStrings() {
  const token = randomBytes(4).toString("hex");
  const name = index => `_${token}${index.toString(36)}${randomBytes(2).toString("hex")}`;
  const worker = name(0);
  return [
    ["bare-mux-worker-", `${worker}-`],
    ["bare-mux-worker", worker],
    ["bare-mux-remote", name(1)],
    ["bare-mux-path", name(2)],
    ["bare-mux", name(3)],
    ["baremuxinit", name(4)],
  ];
}

function applyBaremuxStrings(source, id, baremuxStrings) {
  let out = source;
  let replaced = 0;
  for (const [from, to] of baremuxStrings) {
    const found = out.split(from).length - 1;
    if (!found) continue;
    replaced += found;
    out = replaceAll(out, from, to);
  }
  if (replaced !== BAREMUX_STRING_COUNTS[id]) throw new CodecPatchError(`${id}: expected ${BAREMUX_STRING_COUNTS[id]} bare-mux strings, replaced ${replaced}. Upstream changed.`);
  for (const from of BAREMUX_STRING_DEFAULTS) {
    if (out.includes(from)) throw new CodecPatchError(`${id}: the bare-mux string ${from} survived the rewrite.`);
  }
  return out;
}

const RENAMED_IDENTIFIERS = [
  "__scramjet$config",
  "isScramjet",
  "isScramjetEnabled",
  "ScramjetServiceWorker",
  "ScramjetController",
  "$scramjetLoadWorker",
  "$scramjetLoadController",
  "$scramjetLoadClient",
  "$scramjetVersion",
  "$scramjetRequire",
  "$scramitize",
  "isGamesPage",
  "encodeProxyUrl",
  "encodeProxyUrlSync",
  "__uv$config",
  "UVClient",
  "UVServiceWorker",
  "BareMuxConnection",
  "BareClient",
  "uvHostname",
  "implementUVMiddleware",
  "ScramjetServiceWorkerRuntime",
  "ScramjetClient",
  "ScramjetFrame",
  "ScramjetContextEvent",
  "ScramjetGlobalDownloadEvent",
  "ScramjetRequestEvent",
  "ScramjetHandleResponseEvent",
];

// Dead branches: our config sets all four. They still carry the upstream names, and the
// substring derivation of the client path would 404 if one ever ran, so pointing them at the
// emitted paths removes the names and fixes the fallback at the same time.
const UV_DEFAULT_PATH_LITERALS = [
  ['"/uv.bundle.js"', "uv.bundle"],
  ['"/uv.handler.js"', "uv.handler"],
  ['"/uv.client.js"', "uv.client"],
  ['"/uv.config.js"', "uv.config"],
  ['"uv.bundle.js"', "uv.bundle"],
  ['"uv.client.js"', "uv.client"],
];

function applyUvDefaultPaths(source, specs) {
  const byId = Object.fromEntries(specs.map(spec => [spec.id, spec.publicPath]));
  let out = source;
  for (const [literal, id] of UV_DEFAULT_PATH_LITERALS) {
    if (!out.includes(literal)) throw new CodecPatchError(`uv.bundle.js: default path ${literal} not found. Upstream changed.`);
    out = replaceAll(out, literal, JSON.stringify(byId[id]));
  }
  return out;
}

// Message only: the throw is what matters, nothing reads the text.
const UV_ERROR_MESSAGE = '"Unable to load global UV data"';

function stripUvErrorMessage(source) {
  if (!source.includes(UV_ERROR_MESSAGE)) throw new CodecPatchError(`uv.handler.js: ${UV_ERROR_MESSAGE} not found. Upstream changed.`);
  return replaceAll(source, UV_ERROR_MESSAGE, '""');
}

// A substring swap, not a token rename: that would skip __uv$storageObj and still rewrite
// __uv-script, leaving the 15 variants incoherent. Runs after the token pass so __uv$config
// is already gone, and stays lowercase because __uv-script is an HTML attribute name.
const UV_PREFIX = "__uv";

function applyUvPrefixRename(source, name) {
  if (!source.includes(UV_PREFIX)) throw new CodecPatchError(`${UV_PREFIX} not found. Upstream UV file changed.`);
  const out = replaceAll(source, UV_PREFIX, name);
  if (out.includes(UV_PREFIX)) throw new CodecPatchError(`${UV_PREFIX} survived the rename.`);
  return out;
}

// Ultraviolet is replaced by exact pattern rather than as a token: the bare word also
// appears in UV's error page copy and its GitHub URL, which are branding, not contract.
// "Ultraviolet" in uv.handler.js filterKeys is the list of globals hidden from proxied
// pages, so it has to move with self.Ultraviolet or the real global stops being hidden.
const ULTRAVIOLET_PATTERNS = ["self.Ultraviolet", '"Ultraviolet"', "static Ultraviolet="];

// UV's 500 page names the project, links its repo and prints its version. The two
// textContent assignments go with the spans: they reach those elements through the implicit
// id globals, so leaving them would throw a ReferenceError once the spans are gone.
const ULTRAVIOLET_BRANDING = [
  /[ \t]*<li>Updating Ultraviolet<\/li>\n/,
  /[ \t]*<li>Troubleshooting the error on the <a href="https:\/\/github\.com\/titaniumnetwork-dev\/Ultraviolet"[^>]*>GitHub repository<\/a><\/li>\n/,
  /[ \t]*<p><i>Ultraviolet v<span id="uvVersion"><\/span> \(build <span id="uvBuild"><\/span>\)<\/i><\/p>\n/,
  /[ \t]*uvVersion\.textContent = \$\{JSON\.stringify\("[^"]*"\)\};\n/,
  /[ \t]*uvBuild\.textContent = \$\{JSON\.stringify\("[^"]*"\)\};\n/,
];

function stripUltravioletBranding(source) {
  let out = source;
  for (const pattern of ULTRAVIOLET_BRANDING) {
    if (!pattern.test(out)) throw new CodecPatchError(`uv.sw.js branding: ${pattern} no longer matches. Upstream error page changed.`);
    out = out.replace(pattern, "");
  }
  return out;
}

// Internal to uv.sw.js: setter and reader both live there, it never reaches injected page
// code, and it never appears as a string literal so no computed access can reach it. Matched
// on the leading dot so /assets/ultraviolet/ path segments cannot be hit.
const UV_PROPERTY = /\.ultraviolet(?![\w$])/g;

function applyUvPropertyRename(source, name) {
  const found = (source.match(UV_PROPERTY) || []).length;
  if (!found) throw new CodecPatchError("uv.sw.js: the .ultraviolet property was not found. Upstream file changed.");
  const out = source.replace(UV_PROPERTY, `.${name}`);
  if (UV_PROPERTY.test(out)) throw new CodecPatchError("uv.sw.js: .ultraviolet survived the rename.");
  return out;
}

function applyUltravioletRename(source, name) {
  let out = source;
  for (const pattern of ULTRAVIOLET_PATTERNS) out = replaceAll(out, pattern, pattern.replace("Ultraviolet", name));
  return out;
}

// File-local, but renameGlobals:false leaves top level worker declarations alone. Scoped to
// sw.js only, because a bare uv token also occurs in uv.bundle.js as a regex flag pair. The
// lookbehind rejects the dot and slash forms so paths and property access cannot be hit.
const SW_LOCAL_COUNTS = { uv: 2, sj: 4 };
const swLocalPattern = name => new RegExp(`(?<![\\w$./"'\`-])${name}(?![\\w$])`, "g");

function createSwLocalRenames() {
  return new Map(Object.keys(SW_LOCAL_COUNTS).map(name => [name, `_${randomBytes(5).toString("hex")}`]));
}

function applySwLocalRenames(source, renames) {
  let out = source;
  for (const [from, to] of renames) {
    const found = (out.match(swLocalPattern(from)) || []).length;
    if (found !== SW_LOCAL_COUNTS[from]) throw new CodecPatchError(`sw.js: expected ${SW_LOCAL_COUNTS[from]} occurrences of the local ${from}, found ${found}. sw.js changed - update SW_LOCAL_COUNTS.`);
    out = out.replace(swLocalPattern(from), to);
    if (swLocalPattern(from).test(out)) throw new CodecPatchError(`sw.js: the local ${from} survived the rename.`);
  }
  return out;
}

// Inline onkeyup/onchange/onclick handlers call these app-owned globals by name, so the name
// survives into emitted HTML. Renamed per build in both the JS definition and the handler
// attribute; the on* attribute names themselves are standard and left untouched.
// Two shapes: window.X property assignments, and bare function identifiers (def/call/reference).
const INLINE_HANDLER_WINDOW = { "launcher.js": ["bar", "category"] };
const INLINE_HANDLER_FUNCS = {
  "tabs.js": ["goHome", "goBack", "goForward", "reload", "popoutTab", "toggleDevTools", "toggleFullscreen"],
  "settings.js": ["toggleAB", "changeEngine", "saveEventKey", "exportSaveData", "importSaveData", "openAboutBlank"],
  "search.js": ["openUrl"],
  "launcher.js": ["openUrl"],
};
const INLINE_HANDLER_ATTR = /(\son(?:keyup|change|click)\s*=\s*")([A-Za-z_$][\w$]*)(\s*\()/gi;
// window.bar/category (2) + tabs.js funcs (9) + settings.js funcs (7) + search openUrl (1) + launcher openUrl (1).
const INLINE_HANDLER_JS_COUNT = 20;
// onkeyup/onchange (6) + onclick: tabs (7) + settings (4) + 404 openUrl (1).
const INLINE_HANDLER_HTML_COUNT = 18;

function createHandlerRenames() {
  const names = [...new Set([...Object.values(INLINE_HANDLER_WINDOW).flat(), ...Object.values(INLINE_HANDLER_FUNCS).flat()])];
  return new Map(names.map(name => [name, `_${randomBytes(5).toString("hex")}`]));
}

// Strings and comments become same-length spaces so token matching only ever hits code, never a
// name that also appears in a string (e.g. "AB" inside an alert) or a property (e.g. .reload).
function maskJsStrings(source) {
  const n = source.length;
  let out = "";
  let i = 0;
  while (i < n) {
    const c = source[i];
    if (c === "/" && source[i + 1] === "*") {
      const e = source.indexOf("*/", i + 2);
      const stop = e < 0 ? n : e + 2;
      out += " ".repeat(stop - i);
      i = stop;
      continue;
    }
    if (c === "/" && source[i + 1] === "/") {
      let j = i;
      while (j < n && source[j] !== "\n") j++;
      out += " ".repeat(j - i);
      i = j;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      let j = i + 1;
      while (j < n && source[j] !== c) j += source[j] === "\\" ? 2 : 1;
      const stop = Math.min(j + 1, n);
      out += " ".repeat(stop - i);
      i = stop;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

// window.X (bar/category) are targeted exact strings. Function identifiers are renamed only at
// code positions, excluding method access (the leading dot) and string occurrences (via the mask).
function applyHandlerDefs(source, basename, renames) {
  let out = source;
  let changed = 0;
  for (const name of INLINE_HANDLER_WINDOW[basename] ?? []) {
    const from = `window.${name}`;
    const n = out.split(from).length - 1;
    out = replaceAll(out, from, `window.${renames.get(name)}`);
    changed += n;
  }
  for (const name of INLINE_HANDLER_FUNCS[basename] ?? []) {
    const masked = maskJsStrings(out);
    const re = new RegExp(`(?<![\\w$.])${name}(?![\\w$])`, "g");
    out = out.replace(re, (match, offset) => {
      if (masked.slice(offset, offset + name.length) !== name) return match;
      changed++;
      return renames.get(name);
    });
  }
  return { source: out, changed };
}

function applyHandlerAttrs(html, renames) {
  let count = 0;
  const out = html.replace(INLINE_HANDLER_ATTR, (match, lead, fn, tail) => {
    if (!renames.has(fn)) return match;
    count++;
    return `${lead}${renames.get(fn)}${tail}`;
  });
  return { html: out, count };
}

// data-tab-id is app-owned and lives only in tabs.js, as dataset.tabId and [data-tab-id='...'].
// The opaque suffix has no hyphens, so dataset.<suffix> maps cleanly to data-<suffix>.
function createTabAttr() {
  return `t${randomBytes(4).toString("hex")}`;
}

function applyTabAttr(source, attr) {
  const ds = source.split("dataset.tabId").length - 1;
  const kb = source.split("data-tab-id").length - 1;
  if (!ds || !kb) throw new CodecPatchError(`tabs.js: expected dataset.tabId and data-tab-id, found ${ds}/${kb}. Upstream changed.`);
  return replaceAll(replaceAll(source, "dataset.tabId", `dataset.${attr}`), "data-tab-id", `data-${attr}`);
}

// Only to keep "uv" and "sj" out of the emitted JS: javascript-obfuscator leaves strings
// shorter than three characters inline. The stored value is opaque already, so the pair is
// fixed rather than per build.
const PROXY_CHOICE_VALUES = { uv: "k3d", sj: "w9p" };
const PROXY_CHOICE_LITERAL = /(["'`])(uv|sj)\1/g;
const PROXY_CHOICE_COUNTS = { js: 9, html: 2 };

function applyProxyChoiceValues(source) {
  let count = 0;
  const out = source.replace(PROXY_CHOICE_LITERAL, (match, quote, name) => {
    count++;
    return `${quote}${PROXY_CHOICE_VALUES[name]}${quote}`;
  });
  return { source: out, count };
}

// Per-build opaque page routes. build.js generates one map, writes it to the manifest for the
// server, and rewrites the clean route literals in the application JS so the navbar and every
// in-app navigation point at the same opaque paths. "/" (root) and "/play.html" (a compatibility
// alias for the games page) are deliberately left clean and are not part of this map.
const PAGE_ROUTES = ["/apps", "/games", "/tabs", "/settings"];

function createPageRoutes(registry) {
  const map = {};
  const used = new Set();
  for (const clean of PAGE_ROUTES) {
    let token;
    do {
      token = `/${randomItem("abcdefghijklmnopqrstuvwxyz".split(""))}${randomBytes(3).toString("hex")}`;
    } while (used.has(token) || registry.paths.has(token) || registry.topDirs.has(token.slice(1)));
    used.add(token);
    registry.paths.add(token);
    map[clean] = token;
  }
  return map;
}

// Quoted-literal rewrites, so a route token can never match inside an asset path such as
// "/assets/json/apps.min.json". Both the "/x" form (pathname comparisons, navigate targets) and the
// navbar "/./x" form are covered; the bare "tabs" in launcher.js is a relative navigation target
// that must become the absolute, opaque tabs route.
function routeRewriteTable(routes) {
  return [
    [`"/./games"`, `"${routes["/games"]}"`],
    [`"/./apps"`, `"${routes["/apps"]}"`],
    [`"/./settings"`, `"${routes["/settings"]}"`],
    [`"/games"`, `"${routes["/games"]}"`],
    [`"/apps"`, `"${routes["/apps"]}"`],
    [`"/tabs"`, `"${routes["/tabs"]}"`],
    [`"tabs"`, `"${routes["/tabs"]}"`],
  ];
}
const ROUTE_REWRITE_COUNT = 11;

function applyRouteRewrites(source, table) {
  let count = 0;
  let out = source;
  for (const [from, to] of table) {
    const n = out.split(from).length - 1;
    if (n) {
      out = replaceAll(out, from, to);
      count += n;
    }
  }
  return { source: out, count };
}

const SPLIT_WRAPPERS = ["span", "x-a", "x-b", "ab-x", "s-p"];
const HARDEN_ZERO_WIDTH = ["​", "‌", "‍", "⁠"];

function fnv1a(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// An HTML entity is one indivisible unit: chunking must never split inside &amp; or &#233;, and
// the occasional character encoding must never re-encode an existing entity. Sticky so it can be
// anchored at a position.
const HTML_ENTITY = /&(?:#\d+|#x[\da-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/y;

function textUnits(word) {
  const units = [];
  for (let i = 0; i < word.length; ) {
    HTML_ENTITY.lastIndex = i;
    const m = HTML_ENTITY.exec(word);
    if (m && m.index === i) {
      units.push(m[0]);
      i += m[0].length;
    } else {
      units.push(word[i]);
      i++;
    }
  }
  return units;
}

// Split one whitespace-free word into inner strings of 2 to 4 units, guaranteeing at least two
// chunks once a word is 3+ units so a real element boundary always sits inside it. Words of 1 or 2
// units stay in a single wrapper: splitting them would be noise, and they are not fingerprints.
function chunkWord(word, seed) {
  const units = textUnits(word);
  if (units.length < 3) return [units.join("")];
  const chunks = [];
  for (let i = 0; i < units.length; ) {
    const size = 2 + ((seed + chunks.length) % 3);
    chunks.push(units.slice(i, i + size).join(""));
    i += size;
  }
  if (chunks.length < 2) {
    const mid = Math.max(1, units.length >> 1);
    return [units.slice(0, mid).join(""), units.slice(mid).join("")];
  }
  return chunks;
}

// Numeric-encode a single plain character inside an inner string, skipping characters that are
// already part of an entity, whitespace, or a surrogate. One call per text run keeps it occasional.
function encodeOneChar(inner, seed) {
  const spots = [];
  for (let i = 0; i < inner.length; ) {
    HTML_ENTITY.lastIndex = i;
    const m = HTML_ENTITY.exec(inner);
    if (m && m.index === i) {
      i += m[0].length;
      continue;
    }
    if (!/\s/.test(inner[i]) && inner.charCodeAt(i) < 0xd800) spots.push(i);
    i++;
  }
  if (!spots.length) return inner;
  const p = spots[seed % spots.length];
  return `${inner.slice(0, p)}&#${inner.charCodeAt(p)};${inner.slice(p + 1)}`;
}

// Harden one text run (the text between two tags). Whitespace-only runs are returned untouched, so
// minifyHtml collapses page indentation exactly as before. Every word becomes one or more wrappers;
// whitespace is folded into an adjacent wrapper so none is ever left bare between two tags, which
// minifyHtml's >\s+< rule would delete and so join two words. Detagged and decoded, the run is byte
// identical to the source.
function hardenTextRun(text) {
  if (!text.trim()) return text;
  const seed = fnv1a(text);
  const inners = [];
  let lead = "";
  for (const seg of text.match(/\s+|\S+/g)) {
    if (!/\S/.test(seg)) {
      if (inners.length) inners[inners.length - 1] += seg;
      else lead += seg;
      continue;
    }
    const parts = chunkWord(seg, seed);
    parts[0] = lead + parts[0];
    lead = "";
    for (const part of parts) inners.push(part);
  }
  const entIdx = seed % inners.length;
  const parts = inners.map((inner, i) => {
    const w = SPLIT_WRAPPERS[(seed + i) % SPLIT_WRAPPERS.length];
    return `<${w}>${i === entIdx ? encodeOneChar(inner, seed) : inner}</${w}>`;
  });
  let out = parts[0];
  for (let i = 1; i < parts.length; i++) out += HARDEN_ZERO_WIDTH[(seed + i) % HARDEN_ZERO_WIDTH.length] + parts[i];
  return out;
}

// Text that must not be wrapped: executable, presentational-verbatim, or where injected markup
// would render as literal text (title). Pulled out first so the text-node matcher can stay a flat
// regex, the same way obfuscateTextNodes relies on obfuscateHtmlMarkup having protected them.
const HARDEN_SKIP = /<(script|style|pre|code|textarea|template|title|noscript|svg)\b[\s\S]*?<\/\1>|<!--[\s\S]*?-->/gi;
/*
const TITLE_ELEMENT = /(<title\b[^>]*>)[\s\S]*?(<\/title>)/gi;
function stripTitleText(html) {
  let count = 0;
  const out = html.replace(TITLE_ELEMENT, (_match, open, close) => {
    count += 1;
    return open + close;
  });
  return { html: out, count };
}

const TITLE_ATTR = /\stitle\s*=\s*("[^"]*"|'[^']*')/gi;
function stripTitleAttributes(html) {
  let count = 0;
  const out = html.replace(TITLE_ATTR, () => {
    count += 1;
    return "";
  });
  return { html: out, count };
}
*/
function hardenTextNodes(html) {
  const skipped = [];
  const guarded = html.replace(HARDEN_SKIP, block => {
    const token = `<hz-skip data-i="${skipped.length}"></hz-skip>`;
    skipped.push(block);
    return token;
  });
  let seen = 0;
  let transformed = 0;
  const out = guarded.replace(/>([^<>]+)</g, (match, text) => {
    if (!text.trim()) return match;
    seen++;
    const wrapped = hardenTextRun(text);
    if (wrapped !== text) transformed++;
    return `>${wrapped}<`;
  });
  const restored = out.replace(/<hz-skip data-i="(\d+)"><\/hz-skip>/g, (_, i) => skipped[+i]);
  return { html: restored, seen, transformed };
}

// Visible text as a browser would read it: skip blocks gone, tags stripped, numeric entities
// decoded, whitespace collapsed. Named entities are left literal, identical on both sides of the
// comparison, so equality proves the transform changed structure only, never characters.
function visibleText(html) {
  return html
    .replace(HARDEN_SKIP, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&#x([\da-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/​|‌|‍|⁠|﻿/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Independent lower bound on wrappers the transform must emit: one per whitespace-free segment of
// every non-empty text node. If a future change silently stops covering text nodes, the emitted
// wrapper count drops below this and the build aborts.
function countHardenableSegments(html) {
  let n = 0;
  for (const m of html.replace(HARDEN_SKIP, " ").matchAll(/>([^<>]+)</g)) {
    if (m[1].trim()) n += m[1].match(/\S+/g).length;
  }
  return n;
}

// scramjet.all.js strips this with a hardcoded `e.slice(14)`, so the replacement must keep
// the same length, and stay lowercase because setAttribute lowercases.
const SCRAMJET_ATTR_PREFIX = "scramjet-attr";
const SCRAMJET_IDB_NAME = "$scramjet";


const SCRAMJET_SYMBOL_KEYS = ["scramjet client global", "scramjet frame handle", "scramjet original onevent function", "scramjet realm pollutant"];
const SCRAMJET_LOG_STRINGS = ['"initializing scramjet client"'];

function createIdentifierRenames() {
  return new Map(RENAMED_IDENTIFIERS.map(name => [name, `_${randomBytes(5).toString("hex")}`]));
}

function createScramjetStrings() {
  const attr = randomItem("abcdefghijklmnopqrstuvwxyz".split("")) + randomBytes(6).toString("hex");
  if (attr.length !== SCRAMJET_ATTR_PREFIX.length) throw new Error(`attribute prefix must stay ${SCRAMJET_ATTR_PREFIX.length} chars to keep slice(14) correct, got ${attr.length}`);
  return {
    attr,
    idb: `_${randomBytes(5).toString("hex")}`,
    symbols: new Map(SCRAMJET_SYMBOL_KEYS.map(key => [key, randomBytes(8).toString("hex")])),
  };
}

// The lookarounds stop isScramjet matching inside isScramjetEnabled.
function applyIdentifierRenames(source, renames) {
  let out = source;
  for (const [from, to] of renames) out = out.replace(new RegExp(`(?<![\\w$])${from.replace(/\$/g, "\\$")}(?![\\w$])`, "g"), to);
  return out;
}

function patchProxyCodecs(content, basename, proxyCodecs, scramjetGlobals) {
  if (basename === "uv.config.js") {
    const { codec, key } = parseCodecSpec(proxyCodecs.uv);
    const uvCodec = getUrlCodecFunctions(codec, key);
    content = patchOrFail(content, /encodeUrl:\s*Ultraviolet\.codec\.\w+\.encode,/, `encodeUrl: ${uvCodec.encode},`, "uv.config.js encodeUrl");
    content = patchOrFail(content, /decodeUrl:\s*Ultraviolet\.codec\.\w+\.decode,/, `decodeUrl: ${uvCodec.decode},`, "uv.config.js decodeUrl");
  }

  if (basename === "scramjet.config.js") {
    const { codec, key } = parseCodecSpec(proxyCodecs.scramjet);
    const sjCodec = getUrlCodecFunctions(codec, key);
    const globals = Object.entries(scramjetGlobals)
      .map(([name, value]) => `    ${name}: ${JSON.stringify(value)},`)
      .join("\n");
    content = patchOrFail(content, /codec:\s*\{[\s\S]*?\},\s*files:/, `codec: {\n    encode: ${sjCodec.encode},\n    decode: ${sjCodec.decode},\n  },\n  globals: {\n${globals}\n  },\n  files:`, "scramjet.config.js codec");
  }

  return content;
}

// sw.js importScripts six files into one scope and inline scripts share window, so the
// obfuscator's hex identifiers collide. Give each file its own prefix.
function identifiersPrefixFor(scopeKey) {
  return `_${createHash("sha1").update(scopeKey).digest("hex").slice(0, 8)}_`;
}

async function minifyVendor(source, { module, aggressive }) {
  const result = await minify(source, vendorTerserOptions({ module, aggressive }));
  if (!result.code) throw new Error("Terser returned empty output");
  return result.code;
}

async function assertParses(source, { module }) {
  await minify(source, { module, compress: false, mangle: false, format: { comments: true } });
}

async function runObfuscator(source, scopeKey) {
  const minified = await minify(source, {
    compress: { drop_console: false, passes: 2 },
    mangle: true,
    format: { comments: false },
  });
  if (!minified.code) throw new Error("Terser returned empty output");

  const obfuscated = JavaScriptObfuscator.obfuscate(minified.code, {
    identifiersPrefix: identifiersPrefixFor(scopeKey),
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    deadCodeInjection: false,
    debugProtection: false,
    disableConsoleOutput: false,
    identifierNamesGenerator: "hexadecimal",
    renameGlobals: false,
    selfDefending: false,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayEncoding: ["rc4"],
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
  });
  return obfuscated.getObfuscatedCode();
}

function shouldProcessInlineScript(attrs) {
  if (/\bsrc\s*=/i.test(attrs)) return false;

  const typeMatch = attrs.match(/\btype\s*=\s*(["']?)([^"'\s>]+)\1/i);
  if (!typeMatch) return true;

  const type = typeMatch[2].toLowerCase();
  return ["text/javascript", "application/javascript", "module"].includes(type);
}

async function obfuscateInlineScripts(html, htmlName) {
  const scripts = [];
  let index = 0;

  const protectedHtml = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (match, attrs, source) => {
    const token = `___HTML_SCRIPT_${index++}___`;
    scripts.push({ token, match, attrs, source });
    return token;
  });

  const processedScripts = await Promise.all(
    scripts.map(async script => {
      if (!script.source.trim() || !shouldProcessInlineScript(script.attrs)) return [script.token, script.match];

      try {
        const obfuscated = await runObfuscator(script.source, `${htmlName}#${script.token}`);
        return [script.token, `<script${script.attrs}>${obfuscated}</script>`];
      } catch (err) {
        console.warn(chalk.yellow(`  ! inline script skipped: ${err.message}`));
        return [script.token, script.match];
      }
    }),
  );

  let output = protectedHtml;
  // Function replacement, never a string: obfuscated code contains `$&`/`$\``/`$'`, which
  // String.replace would expand.
  for (const [token, script] of processedScripts) output = output.replace(token, () => script);
  return output;
}

function minifyHtml(html) {
  const blocks = [];
  let index = 0;

  const protectBlock = block => {
    const token = `___HTML_BLOCK_${index++}___`;
    blocks.push([token, block]);
    return token;
  };

  let output = html
    .replace(/<(script|style|pre|textarea)\b[\s\S]*?<\/\1>/gi, protectBlock)
    .replace(/<!--(?!\[if\b)[\s\S]*?-->/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s+\/>/g, "/>")
    .trim();

  for (const [token, block] of blocks) output = output.replace(token, () => block);
  return output;
}

function encodeHtmlText(text) {
  return text.replace(/&(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);|./gis, match => {
    if (match.startsWith("&") && match.endsWith(";")) return match;
    return `&#${match.codePointAt(0)};`;
  });
}

function obfuscateTextNodes(html) {
  return html.replace(/>([^<>]+)</g, (_match, text) => {
    if (!text.trim()) return `>${text}<`;
    return `>${encodeHtmlText(text)}<`;
  });
}

function obfuscateAttributeValues(html) {
  const valueAttrs = "alt|aria-label|class|content|crossorigin|href|id|method|name|onclick|onchange|onkeyup|placeholder|rel|src|style|title|type|value";
  const attrPattern = new RegExp(`\\s(${valueAttrs})=(["'])(.*?)\\2`, "gis");

  return html.replace(/<([a-z][\w:-]*)([^<>]*)>/gi, (tag, name, attrs) => {
    if (/^style$/i.test(name)) return tag;

    const encodedAttrs = attrs.replace(attrPattern, (_match, attrName, quote, value) => {
      if (!value) return ` ${attrName}=${quote}${value}${quote}`;
      return ` ${attrName}=${quote}${encodeHtmlText(value)}${quote}`;
    });

    return `<${name}${encodedAttrs}>`;
  });
}

function obfuscateHtmlMarkup(html) {
  const blocks = [];
  let index = 0;

  const protectBlock = block => {
    const token = `<html-obfuscation-block data-index="${index++}"></html-obfuscation-block>`;
    blocks.push([token, block]);
    return token;
  };

  let output = html.replace(/<(script|style|pre|textarea)\b[\s\S]*?<\/\1>/gi, protectBlock);
  output = obfuscateAttributeValues(output);
  output = obfuscateTextNodes(output);

  for (const [token, block] of blocks) output = output.replace(token, () => block);
  return output;
}

async function obfuscateHtml(html, htmlName) {
  return obfuscateHtmlMarkup(minifyHtml(await obfuscateInlineScripts(html, htmlName)));
}

async function collectFiles(dir, predicate) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(full, predicate)));
    else if (predicate(entry.name)) files.push(full);
  }
  return files;
}

const getJsFiles = dir => collectFiles(dir, name => name.endsWith(".js"));
const getHtmlFiles = dir => collectFiles(dir, name => name.endsWith(".html"));

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function vendorSpecs() {
  return [
    {
      id: "uv.bundle",
      renameUvPrefix: true,
      rewriteUvDefaults: true,
      renameIdentifiers: true,
      stripDiagnostics: true,
      rewriteBaremuxStrings: true,
      renameUltraviolet: true,
      src: path.join(uvPath, "uv.bundle.js"),
      old: "/assets/ultraviolet/uv.bundle.js",
      ext: ".js",
      globals: ["Ultraviolet", "__uv$cookies", "__uv$referrer"],
    },
    { id: "uv.client", renameUvPrefix: true, renameIdentifiers: true, stripDiagnostics: true, rewriteBaremuxStrings: true, renameUltraviolet: true, src: path.join(uvPath, "uv.client.js"), old: "/assets/ultraviolet/uv.client.js", ext: ".js", globals: ["UVClient"] },
    {
      id: "uv.handler",
      renameUvPrefix: true,
      rewriteBaremuxStrings: true,
      stripUvError: true,
      renameIdentifiers: true,
      renameUltraviolet: true,
      src: path.join(uvPath, "uv.handler.js"),
      old: "/assets/ultraviolet/uv.handler.js",
      ext: ".js",
      globals: ["__uvHook", "Ultraviolet", "UVClient", "__uv$config", "__uv$cookies", "__uv"],
    },
    { id: "uv.sw", renameUvPrefix: true, renameIdentifiers: true, renameUltraviolet: true, stripBranding: true, renameUvProperty: true, src: path.join(uvPath, "uv.sw.js"), old: "/assets/ultraviolet/uv.sw.js", ext: ".js", globals: ["UVServiceWorker", "Ultraviolet", "__uv"] },
    {
      id: "uv.config",
      renameIdentifiers: true,
      renameUltraviolet: true,
      src: path.join(SRC_DIR, "assets", "ultraviolet", "uv.config.js"),
      old: "/assets/ultraviolet/uv.config.js",
      ext: ".js",
      // Holds codec arrows UV serializes into another realm, so Terser stays off.
      minify: false,
      rewritePaths: true,
      rewriteScopes: true,
      patchCodec: true,
      globals: ["__uv$config"],
    },
    {
      id: "sj.all",
      src: path.join(scramjetPath, "scramjet.all.js"),
      old: "/assets/scramjet/scramjet.all.js",
      ext: ".js",
      rewriteGlobals: true,
      stripScramjetBranding: true,
      stripDiagnostics: true,
      rewriteBaremuxStrings: true,
      rewriteProtocolKeys: true,
      renameIdentifiers: true,
      rewriteScramjetStrings: true,
      globals: ["$scramjetLoadWorker", "$scramjetLoadController", "$scramjetLoadClient", "$scramjetRequire", "$scramjetVersion", "COOKIE", "WASM"],
    },
    { id: "sj.sync", src: path.join(scramjetPath, "scramjet.sync.js"), old: "/assets/scramjet/scramjet.sync.js", ext: ".js", renameIdentifiers: true },
    { id: "sj.wasm", src: path.join(scramjetPath, "scramjet.wasm.wasm"), old: "/assets/scramjet/scramjet.wasm.wasm", ext: ".wasm", binary: true },
    {
      id: "sj.config",
      src: path.join(SRC_DIR, "assets", "scramjet", "scramjet.config.js"),
      old: "/assets/scramjet/scramjet.config.js",
      ext: ".js",
      minify: false,
      rewritePaths: true,
      rewriteScopes: true,
      patchCodec: true,
      renameIdentifiers: true,
      globals: ["__scramjet$config"],
    },
    {
      id: "baremux",
      src: path.join(baremuxPath, "index.mjs"),
      old: "/baremux/index.mjs",
      ext: ".mjs",
      module: true,
      aggressive: true,
      stripDiagnostics: true,
      rewriteBaremuxStrings: true,
      renameIdentifiers: true,
      globals: ["BareMuxConnection", "BareClient", "BareWebSocket", "WebSocketFields", "WorkerConnection", "browserSupportsTransferringStreams", "maxRedirects", "validProtocol"],
    },
    { id: "baremux.worker", src: path.join(baremuxPath, "worker.js"), old: "/baremux/worker.js", ext: ".js", aggressive: true, stripDiagnostics: true, rewriteBaremuxStrings: true, globals: ["onconnect"] },
    {
      id: "epoxy",
      src: path.join(epoxyPath, "index.mjs"),
      old: "/epoxy/index.mjs",
      ext: ".mjs",
      module: true,
      aggressive: true,
      globals: ["epoxyInfo"],
      mangledAway: ["__wbg_get_imports", "getStringFromWasm", "EpoxyClientOptions"],
    },
    {
      id: "libcurl",
      src: path.join(libcurlPath, "index.mjs"),
      old: "/libcurl/index.mjs",
      ext: ".mjs",
      module: true,
      aggressive: true,
      mangledAway: ["moduleOverrides", "ENVIRONMENT_IS_WEB", "wasmBinaryFile"],
    },
  ];
}

function browserVendorModule(manifest) {
  const map = {
    baremux: manifest.vendor.baremux,
    baremuxWorker: manifest.vendor["baremux.worker"],
    epoxy: manifest.vendor.epoxy,
    libcurl: manifest.vendor.libcurl,
  };
  return `self.__deps = ${JSON.stringify(map, null, 2)};\n`;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)}kb`;
}

async function verifyBuild({ manifest, specs, emitted, references, distJsFiles, serverRoutes = [], identifierRenames = new Map(), swLocalRenames = new Map() }) {
  const failures = [];
  const emittedPaths = new Set([...emitted.keys(), ...serverRoutes]);

  for (const [id, publicPath] of Object.entries(manifest.vendor)) {
    const full = path.join(DIST_DIR, publicPath);
    if (!(await exists(full))) failures.push(`manifest asset "${id}" -> ${publicPath} is missing from dist/`);
    if (!emittedPaths.has(publicPath)) failures.push(`manifest asset "${id}" -> ${publicPath} was never emitted`);
  }

  if (!emittedPaths.has(manifest.sw)) failures.push(`service worker ${manifest.sw} was never emitted`);
  if (!(await exists(path.join(DIST_DIR, manifest.sw)))) failures.push(`service worker ${manifest.sw} is missing from dist/`);

  for (const [publicPath, fullPath] of emitted) {
    if (!(await exists(fullPath))) failures.push(`emitted path ${publicPath} does not resolve to a file`);
  }

  for (const { file, source, module } of distJsFiles) {
    try {
      await assertParses(source, { module });
    } catch (err) {
      failures.push(`${file} does not parse: ${err.message}`);
    }
  }

  for (const spec of specs) {
    if (!spec.globals && !spec.mangledAway && spec.minify === false) continue;
    const emittedPath = manifest.vendor[spec.id];
    if (spec.binary) continue;
    const source = await readFile(path.join(DIST_DIR, emittedPath), "utf8");

    for (const identifier of spec.globals ?? []) {
      if (!source.includes(identifierRenames.get(identifier) ?? identifier)) failures.push(`global "${identifier}" did not survive processing of ${spec.id} (${emittedPath})`);
    }

    for (const identifier of spec.mangledAway ?? []) {
      if (source.includes(identifier)) {
        failures.push(`internal identifier "${identifier}" survived mangling in ${spec.id} (${emittedPath}) - mangling regressed, or upstream renamed it`);
      }
    }

    if (spec.minify !== false) {
      const before = (await readFile(spec.src, "utf8")).length;
      const after = source.length;
      if (after > before * VENDOR_SIZE_TOLERANCE + 256) {
        failures.push(`${spec.id} inflated: ${formatKb(before)} -> ${formatKb(after)} (limit ${(VENDOR_SIZE_TOLERANCE * 100).toFixed(0)}% + 256b)`);
      }
    }
  }

  const swSource = await readFile(path.join(DIST_DIR, manifest.sw), "utf8");
  for (const [from, to] of swLocalRenames) {
    if (swLocalPattern(from).test(swSource)) failures.push(`the local ${from} is still present in the emitted service worker ${manifest.sw}`);
    if ((swSource.match(new RegExp(`(?<![\\w$])${to}(?![\\w$])`, "g")) || []).length !== SW_LOCAL_COUNTS[from]) {
      failures.push(`the renamed local ${from} -> ${to} has the wrong number of references in ${manifest.sw}`);
    }
  }

  const maps = await collectFiles(DIST_DIR, name => name.endsWith(".map"));
  for (const file of maps) failures.push(`source map shipped to production: ${path.relative(DIST_DIR, file)}`);

  for (const { file, source } of distJsFiles) {
    if (source.includes("sourceMappingURL")) failures.push(`${file} still carries a sourceMappingURL comment`);
  }

  let checkedReferences = 0;
  for (const { file, source } of references) {
    for (const prefix of RETIRED_PUBLIC_PREFIXES) {
      if (source.includes(prefix)) failures.push(`${file} still references the retired public path ${prefix}`);
    }

    for (const [, literal] of source.matchAll(/["'`](\/[A-Za-z0-9_\-./]*\.(?:js|mjs|wasm))["'`]/g)) {
      checkedReferences++;
      if (!emittedPaths.has(literal)) failures.push(`${file} references ${literal}, which is not an emitted manifest path`);
    }
  }

  if (failures.length) {
    throw new VerificationError(`${failures.length} verification failure(s):\n${failures.map(message => `  - ${message}`).join("\n")}`);
  }
  return { checkedReferences };
}

// CDN stylesheets own the fa/material names; rc- ids reach gsap.to(), not a selector call.
const SELECTOR_KEEP = [/^fa$|^fas$|^far$|^fab$|^fa-/, /^material-symbols/, /^adsbygoogle$/, /^rc-/];

// Applied from a bare array literal, so renaming means guessing at ordinary strings.
const SELECTOR_KEEP_DYNAMIC = new Set(["stars", "stars2", "stars3"]);

function isKeptSelector(name) {
  return SELECTOR_KEEP.some(pattern => pattern.test(name)) || SELECTOR_KEEP_DYNAMIC.has(name);
}

const CSS_NESTING_AT_RULES = /^@(media|supports|document|layer|container|scope|keyframes)\b/i;
// A preceding word character is allowed: `li.active` and `div#main` are selectors too.
const CSS_CLASS_TOKEN = /(?<!\\)\.(-?[_a-zA-Z][\w-]*)/g;
const CSS_ID_TOKEN = /(?<!\\)#(-?[_a-zA-Z][\w-]*)/g;

function mapSelectorText(text, fn) {
  return text
    .split(/(["'][^"']*["'])/)
    .map((part, index) => {
      if (index % 2) return part;
      return part.replace(CSS_CLASS_TOKEN, (_m, name) => `.${fn("class", name)}`).replace(CSS_ID_TOKEN, (_m, name) => `#${fn("id", name)}`);
    })
    .join("");
}

// Conservative minifier: drops comments and collapses whitespace runs, but copies strings and
// url() verbatim, so selectors, calc() spacing, value lists, and data URIs are unchanged. A run
// of whitespace next to { } ; or , is dropped, otherwise it becomes a single space, which is
// always semantically equivalent in CSS.
function minifyCss(css) {
  const n = css.length;
  let out = "";
  let i = 0;
  while (i < n) {
    const ch = css[i];
    if (ch === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end < 0 ? n : end + 2;
      continue;
    }
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < n && css[j] !== ch) j += css[j] === "\\" ? 2 : 1;
      out += css.slice(i, Math.min(j + 1, n));
      i = Math.min(j + 1, n);
      continue;
    }
    if ((ch === "u" || ch === "U") && /^url\(/i.test(css.slice(i, i + 4))) {
      let j = i + 4;
      while (j < n && css[j] !== ")") {
        if (css[j] === '"' || css[j] === "'") {
          const q = css[j++];
          while (j < n && css[j] !== q) j += css[j] === "\\" ? 2 : 1;
        }
        j++;
      }
      out += css.slice(i, Math.min(j + 1, n));
      i = Math.min(j + 1, n);
      continue;
    }
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r" || ch === "\f") {
      let j = i;
      while (j < n && (css[j] === " " || css[j] === "\t" || css[j] === "\n" || css[j] === "\r" || css[j] === "\f")) j++;
      const prev = out[out.length - 1] || "";
      const next = css[j] || "";
      if (prev && next && !"{};,".includes(prev) && !"{};,".includes(next)) out += " ";
      i = j;
      continue;
    }
    if (ch === "}" && out[out.length - 1] === ";") out = out.slice(0, -1);
    out += ch;
    i++;
  }
  return out.trim();
}

function transformCss(css, fn) {
  let out = "";
  // Unmappable, or "/* based on codepen.io/... */" yields a class named io.
  let parts = [];
  const stack = [];
  let i = 0;

  const inDeclarations = () => stack[stack.length - 1] === "declarations";
  const preludeText = () => parts.map(part => part.text).join("");
  const emitPrelude = at => {
    const text = preludeText();
    if (at === "rule") out += parts.map(part => (part.map ? mapSelectorText(part.text, fn) : part.text)).join("");
    else out += text;
    parts = [];
    return text;
  };
  const push = (text, map) => {
    if (inDeclarations()) {
      out += text;
      return;
    }
    const last = parts[parts.length - 1];
    if (last?.map && map) last.text += text;
    else parts.push({ text, map });
  };

  while (i < css.length) {
    const ch = css[i];

    if (ch === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      const stop = end < 0 ? css.length : end + 2;
      push(css.slice(i, stop), false);
      i = stop;
      continue;
    }

    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < css.length && css[j] !== ch) j += css[j] === "\\" ? 2 : 1;
      push(css.slice(i, Math.min(j + 1, css.length)), false);
      i = j + 1;
      continue;
    }

    if (ch === "{") {
      if (inDeclarations()) {
        out += ch;
        stack.push("declarations");
      } else {
        const trimmed = preludeText().trim();
        const nesting = CSS_NESTING_AT_RULES.test(trimmed);
        emitPrelude(nesting || !trimmed.length ? "verbatim" : "rule");
        out += ch;
        stack.push(nesting ? "container" : "declarations");
      }
      i++;
      continue;
    }

    if (ch === "}") {
      emitPrelude(preludeText().trim() && !inDeclarations() ? "rule" : "verbatim");
      stack.pop();
      out += ch;
      i++;
      continue;
    }

    push(ch, true);
    i++;
  }

  emitPrelude(preludeText().trim() ? "rule" : "verbatim");
  return out;
}

function transformMarkupAttrs(text, fn) {
  return text
    .replace(
      /(\sclass\s*=\s*)(["'])([^"']*)\2/gi,
      (_m, lead, quote, value) =>
        `${lead}${quote}${value
          .split(/(\s+)/)
          .map(token => (token.trim() ? fn("class", token) : token))
          .join("")}${quote}`,
    )
    .replace(/(\sid\s*=\s*)(["'])([^"']*)\2/gi, (_m, lead, quote, value) => `${lead}${quote}${value.trim() ? fn("id", value.trim()) : value}${quote}`);
}

// Quotes stay inside the class, or `.column[data-x="${i}"]` never matches.
const QUOTED = `((?:\\\\.|(?!\\2)[^\\\\])*)\\2`;
const SELECTOR_CALLS = new RegExp(`\\.(querySelectorAll|querySelector|closest|matches)\\s*\\(\\s*(["'\`])${QUOTED}`, "g");
const ID_CALLS = new RegExp(`\\.getElementById\\s*\\(\\s*()(["'\`])${QUOTED}`, "g");
const CLASS_NAME_CALLS = new RegExp(`\\.getElementsByClassName\\s*\\(\\s*()(["'\`])${QUOTED}`, "g");
const CLASS_LIST_CALLS = /\.classList\s*\.\s*(?:add|remove|toggle|contains|replace)\s*\(([^)]*)\)/g;
const CLASS_NAME_ASSIGN = new RegExp(`\\.className\\s*=\\s*()(["'\`])${QUOTED}`, "g");
const ID_ASSIGN = new RegExp(`\\.id\\s*=\\s*()(["'\`])${QUOTED}`, "g");

const mapClassList = (value, fn) =>
  value
    .split(/(\s+)/)
    .map(token => (token.trim() ? fn("class", token) : token))
    .join("");

function transformJsSelectors(js, fn) {
  let out = js;
  out = out.replace(SELECTOR_CALLS, (_m, method, quote, selector) => `.${method}(${quote}${mapSelectorText(selector, fn)}${quote}`);
  out = out.replace(ID_CALLS, (_m, _pad, quote, name) => `.getElementById(${quote}${fn("id", name)}${quote}`);
  out = out.replace(CLASS_NAME_CALLS, (_m, _pad, quote, name) => `.getElementsByClassName(${quote}${fn("class", name)}${quote}`);
  out = out.replace(CLASS_LIST_CALLS, (m, args) =>
    m.replace(
      args,
      args.replace(/(["'])([^"']+)\1/g, (_s, quote, name) => `${quote}${fn("class", name)}${quote}`),
    ),
  );
  out = out.replace(CLASS_NAME_ASSIGN, (_m, _pad, quote, value) => `.className = ${quote}${mapClassList(value, fn)}${quote}`);
  out = out.replace(ID_ASSIGN, (_m, _pad, quote, name) => `.id = ${quote}${fn("id", name)}${quote}`);
  return transformMarkupAttrs(out, fn);
}

// Deliberately not sharing the rewrite regexes, so a construct they miss is still caught.
// Input must be comment-free, or an apostrophe in prose reads as a string opener.
const JS_STRING_LITERAL = /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;

async function stripJsComments(js) {
  const result = await minify(js, { compress: false, mangle: false, format: { comments: false } });
  return result.code ?? js;
}

function findStaleSelectorStrings(js, maps) {
  const stale = new Set();
  for (const [, , value] of js.matchAll(JS_STRING_LITERAL)) {
    if (!/[.#][a-zA-Z_-]/.test(value)) continue;
    for (const [, name] of value.matchAll(CSS_CLASS_TOKEN)) if (maps.class.has(name)) stale.add(`class .${name}`);
    for (const [, name] of value.matchAll(CSS_ID_TOKEN)) if (maps.id.has(name)) stale.add(`id #${name}`);
  }
  return stale;
}

function findStaleSelectorsInCss(css, maps) {
  const stale = new Set();
  const unquoted = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(["'])(?:\\.|(?!\1)[^\\])*\1/g, '""');
  for (const [, name] of unquoted.matchAll(CSS_CLASS_TOKEN)) if (maps.class.has(name)) stale.add(`class .${name}`);
  for (const [, name] of unquoted.matchAll(CSS_ID_TOKEN)) if (maps.id.has(name)) stale.add(`id #${name}`);
  return stale;
}

const GTAG_LOADER = /[ \t]*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=(G-[A-Z0-9]+)"><\/script>\r?\n/;
const GTAG_BOOTSTRAP = /[ \t]*<script>\s*window\.dataLayer[\s\S]*?gtag\("config",[\s\S]*?<\/script>\r?\n/;
const GTAG_MARKER = /[ \t]*<!--\s*DO NOT REMOVE\s*-->\r?\n/g;

// Keeps the measurement id out of the served HTML. It still travels in the proxied script
// body, so this hides the tag from source, not from the network.
function replaceAnalytics(html, loaderPath) {
  const loader = html.match(GTAG_LOADER);
  if (!loader) return { html, id: null };
  return {
    id: loader[1],
    html: html.replace(GTAG_LOADER, `  <script async src="${loaderPath}"></script>\n`).replace(GTAG_BOOTSTRAP, "").replace(GTAG_MARKER, ""),
  };
}

async function obfuscateSelectors() {
  const cssFiles = await collectFiles(DIST_DIR, name => name.endsWith(".css"));
  const htmlFiles = await getHtmlFiles(DIST_DIR);
  const jsFiles = await getJsFiles(JS_DIR);

  const read = async file => ({ file, source: await readFile(file, "utf8") });
  const css = await Promise.all(cssFiles.map(read));
  const html = await Promise.all(htmlFiles.map(read));
  const js = await Promise.all(jsFiles.map(read));

  const seen = { class: new Set(), id: new Set() };
  const kept = new Set();
  const collect = (type, name) => {
    if (!name) return name;
    if (isKeptSelector(name)) kept.add(name);
    else seen[type].add(name);
    return name;
  };

  for (const { source } of css) transformCss(source, collect);
  for (const { source } of html) transformMarkupAttrs(source, collect);
  for (const { source } of js) transformJsSelectors(source, collect);

  const used = new Set();
  const nextIdent = () => {
    for (;;) {
      const ident = `${randomItem("abcdefghijklmnopqrstuvwxyz".split(""))}${randomBytes(3).toString("hex").slice(0, 4)}`;
      if (!used.has(ident)) {
        used.add(ident);
        return ident;
      }
    }
  };

  const maps = { class: new Map(), id: new Map() };
  for (const type of ["class", "id"]) for (const name of [...seen[type]].sort()) maps[type].set(name, nextIdent());

  const apply = (type, name) => maps[type].get(name) ?? name;

  await Promise.all([...css.map(({ file, source }) => writeFile(file, transformCss(source, apply), "utf8")), ...html.map(({ file, source }) => writeFile(file, transformMarkupAttrs(source, apply), "utf8")), ...js.map(({ file, source }) => writeFile(file, transformJsSelectors(source, apply), "utf8"))]);

  const leaked = new Set();
  const recheck = (type, name) => {
    if (maps[type].has(name)) leaked.add(`${type} ${name}`);
    return name;
  };
  for (const file of await collectFiles(DIST_DIR, name => name.endsWith(".css"))) {
    const source = await readFile(file, "utf8");
    transformCss(source, recheck);
    for (const entry of findStaleSelectorsInCss(source, maps)) leaked.add(`${path.basename(file)}: ${entry}`);
  }
  for (const file of await getHtmlFiles(DIST_DIR)) transformMarkupAttrs(await readFile(file, "utf8"), recheck);
  for (const file of await getJsFiles(JS_DIR)) {
    const source = await readFile(file, "utf8");
    transformJsSelectors(source, recheck);
    for (const entry of findStaleSelectorStrings(await stripJsComments(source), maps)) leaked.add(`${path.basename(file)}: ${entry}`);
  }

  return { maps, kept: [...kept].sort(), leaked: [...leaked].sort() };
}

async function build() {
  console.log("Cleaning dist/...");
  await rm(DIST_DIR, { recursive: true, force: true });

  console.log("Copying static/ -> dist/...");
  await cp(SRC_DIR, DIST_DIR, { recursive: true });

  console.log(OBFUSCATE ? chalk.yellow("Obfuscation: ON") : chalk.yellow("Obfuscation: OFF (rename + rewrite only)"));

  const selectors = await obfuscateSelectors();
  console.log(`\nSelectors: ${selectors.maps.class.size} classes, ${selectors.maps.id.size} ids obfuscated`);
  if (selectors.kept.length) console.log(chalk.gray(`  kept (externally owned or not statically resolvable): ${selectors.kept.join(", ")}`));
  if (selectors.leaked.length) {
    console.error(chalk.red(`\nAborting: ${selectors.leaked.length} selector reference(s) were renamed in one file but not another.`));
    for (const entry of selectors.leaked) console.error(chalk.red(`  - ${entry}`));
    process.exit(1);
  }

  const registry = new PathRegistry();

  const uvBase = randomWord();
  const scramjetSub = randomWord();
  registry.reserveTopDir(uvBase);

  const NEW_UV_SCOPE = `/${uvBase}/`;
  const NEW_SCRAMJET_SCOPE = `/${uvBase}/${scramjetSub}/`;
  const proxyCodecs = createProxyCodecs();
  const scramjetGlobals = createScramjetGlobals();
  const identifierRenames = createIdentifierRenames();
  const protocolKeys = createScramjetProtocolKeys();
  const baremuxStrings = createBaremuxStrings();
  const ultravioletName = `_${randomBytes(5).toString("hex")}`;
  const uvPropertyName = `_${randomBytes(5).toString("hex")}`;
  const uvPrefixName = `_${randomBytes(4).toString("hex")}`;
  const scramjetStrings = createScramjetStrings();
  const catalogueKey = createCatalogueKey();
  const pageRoutes = createPageRoutes(registry);
  console.log(
    `Page routes: ${Object.entries(pageRoutes)
      .map(([from, to]) => `${from} -> ${to}`)
      .join(", ")}`,
  );
  console.log(`Scramjet identifiers: ${[...identifierRenames].map(([from, to]) => `${from} -> ${to}`).join(", ")}`);
  console.log(`Proxy selector values: ${JSON.stringify(PROXY_CHOICE_VALUES)}`);
  console.log(`Scramjet protocol keys: ${protocolKeys.map(([from, to]) => `${from} -> ${to}`).join(", ")}`);
  console.log(`bare-mux strings: ${baremuxStrings.map(([from, to]) => `${from} -> ${to}`).join(", ")}`);
  console.log(`Scramjet strings: attr ${SCRAMJET_ATTR_PREFIX} -> ${scramjetStrings.attr}, idb ${SCRAMJET_IDB_NAME} -> ${scramjetStrings.idb}`);

  const manifest = {
    build: randomBytes(4).toString("hex"),
    scopes: { uv: NEW_UV_SCOPE, scramjet: NEW_SCRAMJET_SCOPE },
    sw: null,
    routes: pageRoutes,
    vendor: {},
  };

  const specs = vendorSpecs();
  for (const spec of specs) {
    spec.publicPath = registry.file(spec.ext);
    manifest.vendor[spec.id] = spec.publicPath;
  }

  await writeFile(path.join(JS_DIR, "vendor.js"), browserVendorModule(manifest), "utf8");

  const jsPublicDir = registry.dir();
  const appPlan = new Map();
  for (const filePath of await getJsFiles(JS_DIR)) {
    const publicPath = registry.file(".js", jsPublicDir);
    appPlan.set(filePath, { basename: path.basename(filePath), publicPath, fullPath: path.join(DIST_DIR, publicPath) });
  }

  const swSource = path.join(DIST_DIR, "sw.js");
  manifest.sw = registry.rootFile(".js");
  appPlan.set(swSource, { basename: "sw.js", publicPath: manifest.sw, fullPath: path.join(DIST_DIR, manifest.sw) });

  // apps.json and games.json are byte-equivalent duplicates of the .min files that nothing
  // fetches, so they are dropped rather than shipped as a second plaintext copy.
  for (const name of UNUSED_JSON) await rm(path.join(DIST_DIR, "assets", "json", name), { force: true });

  const jsonMoves = new Map();
  for (const name of RANDOMIZED_JSON) {
    const source = path.join(DIST_DIR, "assets", "json", name);
    if (!(await exists(source))) throw new Error(`expected dataset ${name} is missing from dist/assets/json`);
    jsonMoves.set(source, registry.file(".json"));
  }

  for (const name of UNUSED_CSS) await rm(path.join(DIST_DIR, name), { force: true });
  const cssMoves = new Map();
  const cssByOldPublic = new Map();
  for (const source of await collectFiles(DIST_DIR, name => name.endsWith(".css"))) {
    const newPublic = registry.file(".css");
    cssMoves.set(source, newPublic);
    cssByOldPublic.set(`/${path.relative(DIST_DIR, source).split(path.sep).join("/")}`, newPublic);
  }
  const palettePublic = cssByOldPublic.get("/assets/css/themes/catppuccin/palette.css");

  const rewriteMap = new Map();
  for (const spec of specs) {
    for (const variant of pathVariants(spec.old)) rewriteMap.set(variant, spec.publicPath);
  }
  for (const [source, publicPath] of jsonMoves) {
    for (const variant of pathVariants(`/${path.relative(DIST_DIR, source).split(path.sep).join("/")}`)) rewriteMap.set(variant, publicPath);
  }
  for (const [oldPublic, newPublic] of cssByOldPublic) {
    for (const variant of pathVariants(oldPublic)) rewriteMap.set(variant, newPublic);
  }
  for (const [filePath, entry] of appPlan) {
    if (filePath === swSource) {
      for (const variant of pathVariants("/sw.js", { bare: false, parent: true })) rewriteMap.set(variant, entry.publicPath);
    } else {
      const oldPublic = `/${path.relative(DIST_DIR, filePath).split(path.sep).join("/")}`;
      for (const variant of pathVariants(oldPublic)) rewriteMap.set(variant, entry.publicPath);
    }
  }
  const rewrites = orderRewrites(rewriteMap);

  const scopeRewrites = [
    [OLD_SCRAMJET_SCOPE, NEW_SCRAMJET_SCOPE],
    [OLD_UV_SCOPE, NEW_UV_SCOPE],
  ];

  console.log(`\nScope paths:`);
  console.log(`  ${OLD_UV_SCOPE} -> ${NEW_UV_SCOPE}`);
  console.log(`  ${OLD_SCRAMJET_SCOPE} -> ${NEW_SCRAMJET_SCOPE}`);
  console.log(`\nURL codecs:`);
  console.log(`  ultraviolet: ${proxyCodecs.uv}`);
  console.log(`  scramjet:    ${proxyCodecs.scramjet}`);

  const emitted = new Map();
  const references = [];

  for (const [source, publicPath] of jsonMoves) {
    const destination = path.join(DIST_DIR, publicPath);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, encodeCatalogue(await readFile(source, "utf8"), catalogueKey), "utf8");
    await rm(source);
    emitted.set(publicPath, destination);
    console.log(chalk.green(`  + ${path.basename(source)} -> ${publicPath}`));
  }

  let cssIn = 0;
  let cssOut = 0;
  for (const [source, newPublic] of cssMoves) {
    const destination = path.join(DIST_DIR, newPublic);
    await mkdir(path.dirname(destination), { recursive: true });
    let css = await readFile(source, "utf8");
    cssIn += css.length;
    // The catppuccin themes @import palette.css by relative path; repoint it at the moved file.
    if (palettePublic) css = css.replace(/@import\s+url\(\s*(["']?)palette\.css\1\s*\)/g, `@import url("${palettePublic}")`);
    css = minifyCss(css);
    cssOut += css.length;
    await writeFile(destination, css, "utf8");
    await rm(source);
    emitted.set(newPublic, destination);
  }
  await rm(path.join(DIST_DIR, "assets", "css"), { recursive: true, force: true });
  console.log(`\nCSS: ${cssMoves.size} files -> randomized paths, minified ${formatKb(cssIn)} -> ${formatKb(cssOut)}`);

  console.log(`\nVendor assets:\n`);
  for (const spec of specs) {
    const destination = path.join(DIST_DIR, spec.publicPath);
    await mkdir(path.dirname(destination), { recursive: true });

    if (spec.binary) {
      const buffer = await readFile(spec.src);
      await writeFile(destination, buffer);
      emitted.set(spec.publicPath, destination);
      console.log(chalk.green(`  + ${spec.id} -> ${spec.publicPath} (${formatKb(buffer.length)}, copied)`));
      continue;
    }

    let source = await readFile(spec.src, "utf8");
    const sizeIn = Buffer.byteLength(source);

    if (spec.patchCodec) source = patchProxyCodecs(source, path.basename(spec.src), proxyCodecs, scramjetGlobals);
    if (spec.rewriteGlobals) {
      for (const [name, fallback] of Object.entries(SCRAMJET_GLOBAL_DEFAULTS)) {
        const literal = `"${fallback}"`;
        if (!source.includes(literal)) throw new CodecPatchError(`scramjet.all.js: default global ${name} (${fallback}) not found. Upstream changed - update SCRAMJET_GLOBAL_DEFAULTS.`);
        source = replaceAll(source, literal, `"${scramjetGlobals[name]}"`);
      }
      source = applyScramjetDefaults(source, specs, NEW_SCRAMJET_SCOPE);
    }
    // Before the identifier pass, so the branding patterns can match $scramjetVersion.
    if (spec.stripScramjetBranding) source = stripScramjetBranding(source);
    if (spec.stripDiagnostics) source = stripDiagnosticStrings(source, spec.id);
    // After the diagnostic strip, whose literals carry bare-mux occurrences of their own.
    if (spec.rewriteBaremuxStrings) source = applyBaremuxStrings(source, spec.id, baremuxStrings);
    if (spec.rewriteProtocolKeys) source = applyScramjetProtocolKeys(source, protocolKeys);
    if (spec.renameIdentifiers) source = applyIdentifierRenames(source, identifierRenames);
    if (spec.stripBranding) source = stripUltravioletBranding(source);
    if (spec.renameUltraviolet) source = applyUltravioletRename(source, ultravioletName);
    if (spec.renameUvProperty) source = applyUvPropertyRename(source, uvPropertyName);
    if (spec.renameUvPrefix) source = applyUvPrefixRename(source, uvPrefixName);
    if (spec.rewriteUvDefaults) source = applyUvDefaultPaths(source, specs);
    if (spec.stripUvError) source = stripUvErrorMessage(source);
    if (spec.rewriteScramjetStrings) {
      for (const [literal, label] of [
        [SCRAMJET_ATTR_PREFIX, "attribute prefix"],
        [`"${SCRAMJET_IDB_NAME}"`, "IndexedDB name"],
      ]) {
        if (!source.includes(literal)) throw new CodecPatchError(`scramjet.all.js: ${label} ${literal} not found. Upstream changed.`);
      }
      source = replaceAll(source, SCRAMJET_ATTR_PREFIX, scramjetStrings.attr);
      source = replaceAll(source, `"${SCRAMJET_IDB_NAME}"`, `"${scramjetStrings.idb}"`);
      for (const [key, replacement] of scramjetStrings.symbols) {
        const literal = `"${key}"`;
        if (!source.includes(literal)) throw new CodecPatchError(`scramjet.all.js: Symbol.for key ${literal} not found. Upstream changed.`);
        source = replaceAll(source, literal, `"${replacement}"`);
      }
      for (const literal of SCRAMJET_LOG_STRINGS) {
        if (!source.includes(literal)) throw new CodecPatchError(`scramjet.all.js: log string ${literal} not found. Upstream changed.`);
        source = replaceAll(source, literal, '""');
      }
    }
    if (spec.rewriteScopes) for (const [from, to] of scopeRewrites) source = replaceAll(source, from, to);
    if (spec.rewritePaths) {
      source = applyRewrites(source, rewrites);
      references.push({ file: `${spec.id} (${spec.publicPath})`, source });
    }

    const minified = spec.minify === false ? source : await minifyVendor(source, { module: Boolean(spec.module), aggressive: Boolean(spec.aggressive) });
    await writeFile(destination, minified, "utf8");
    emitted.set(spec.publicPath, destination);

    const sizeOut = Buffer.byteLength(minified);
    const delta = spec.minify === false ? "terser off" : `${(((sizeIn - sizeOut) / sizeIn) * 100).toFixed(1)}% smaller`;
    console.log(chalk.green(`  + ${spec.id} -> ${spec.publicPath} (${formatKb(sizeIn)} -> ${formatKb(sizeOut)}, ${delta})`));
  }

  await rm(path.join(DIST_DIR, "assets", "ultraviolet"), { recursive: true, force: true });
  await rm(path.join(DIST_DIR, "assets", "scramjet"), { recursive: true, force: true });

  console.log(`\nApplication JS -> /${jsPublicDir}\n`);

  let failed = 0;
  const codecFailures = [];
  const swLocalRenames = createSwLocalRenames();
  const handlerRenames = createHandlerRenames();
  const tabAttr = createTabAttr();
  let handlerJsCount = 0;
  let handlerHtmlCount = 0;
  let proxyChoiceJs = 0;
  let routeRewriteJs = 0;
  const routeTable = routeRewriteTable(pageRoutes);

  await Promise.all(
    [...appPlan.entries()].map(async ([filePath, { basename, publicPath, fullPath }]) => {
      try {
        let output = await readFile(filePath, "utf8");
        for (const [from, to] of scopeRewrites) output = replaceAll(output, from, to);
        output = applyRewrites(output, rewrites);
        output = applyIdentifierRenames(output, identifierRenames);
        if (basename === "sw.js") output = applySwLocalRenames(output, swLocalRenames);
        const proxyChoice = applyProxyChoiceValues(output);
        output = proxyChoice.source;
        proxyChoiceJs += proxyChoice.count;
        const routeChange = applyRouteRewrites(output, routeTable);
        output = routeChange.source;
        routeRewriteJs += routeChange.count;
        const handlerDefs = applyHandlerDefs(output, basename, handlerRenames);
        output = handlerDefs.source;
        handlerJsCount += handlerDefs.changed;
        if (basename === "tabs.js") output = applyTabAttr(output, tabAttr);
        if (basename === "launcher.js") output = patchOrFail(output, /const CATALOGUE_KEY = \[0\];/, `const CATALOGUE_KEY = ${JSON.stringify(catalogueKey)};`, "launcher.js catalogue key");
        references.push({ file: `${basename} (${publicPath})`, source: output });

        const terserOnly = TERSER_ONLY.has(basename);
        if (OBFUSCATE) output = terserOnly ? await minifyVendor(output, { module: false }) : await runObfuscator(output, basename);

        await mkdir(path.dirname(fullPath), { recursive: true });
        await writeFile(fullPath, output, "utf8");
        await rm(filePath);
        emitted.set(publicPath, fullPath);

        const tag = !OBFUSCATE ? "(renamed)" : terserOnly ? "(terser only)" : "(obfuscated)";
        console.log(chalk.green(`  + ${basename} -> ${publicPath} ${tag}`));
      } catch (err) {
        if (err instanceof CodecPatchError) codecFailures.push(err.message);
        console.error(chalk.red(`  x ${basename}: ${err.message}`));
        failed++;
      }
    }),
  );

  if (codecFailures.length) {
    console.error(chalk.red("\nAborting: URL codec patching failed."));
    console.error(chalk.red("The client and the proxy would encode/decode with mismatched keys, breaking every proxied URL.\n"));
    for (const message of codecFailures) console.error(chalk.red(`  - ${message}`));
    process.exit(1);
  }
  if (failed) throw new Error(`${failed} file(s) failed to process`);
  if (proxyChoiceJs !== PROXY_CHOICE_COUNTS.js) throw new Error(`expected ${PROXY_CHOICE_COUNTS.js} proxy selector literals in application JS, replaced ${proxyChoiceJs}. Update PROXY_CHOICE_COUNTS.`);
  if (routeRewriteJs !== ROUTE_REWRITE_COUNT) throw new Error(`expected ${ROUTE_REWRITE_COUNT} page-route literals in application JS, rewrote ${routeRewriteJs}. Upstream changed.`);
  for (const ref of references) {
    if (!ref.file.includes(".js")) continue;
    for (const stale of ['"/apps"', '"/games"', '"/tabs"', '"/./apps"', '"/./games"', '"/./settings"']) {
      if (ref.source.includes(stale)) throw new Error(`stale clean page-route literal ${stale} left in ${ref.file}`);
    }
  }
  if (handlerJsCount !== INLINE_HANDLER_JS_COUNT) throw new Error(`expected ${INLINE_HANDLER_JS_COUNT} inline-handler identifier renames in JS, made ${handlerJsCount}. Upstream changed.`);

  await rm(JS_DIR, { recursive: true, force: true });

  const htmlFiles = await getHtmlFiles(DIST_DIR);
  const analyticsPaths = {
    loader: registry.file(".js"),
    transport: `/${registry.dir()}`,
    sink: registry.file(""),
    param: randomItem(FILENAMES).slice(0, 2),
    key: Array.from(randomBytes(8)),
  };
  const analyticsIds = new Set();
  let proxyChoiceHtml = 0;
  /*
  let titleStripCount = 0;
  let titleAttrStripCount = 0;
  */
  const hardenStats = [];
  const WRAPPER_OPEN = /<(?:span|x-a|x-b|ab-x|s-p)>/g;
  const versionInfo = await resolveVersionInfo();
  let versionInjections = 0;
  console.log(`Settings version card: ${versionInfo.version ? `v${versionInfo.version}` : "-"} / ${versionInfo.updated ?? "-"}`);
  console.log(`\nUpdating ${htmlFiles.length} HTML files${OBFUSCATE_HTML ? " + obfuscating" : ""}...\n`);

  await Promise.all(
    htmlFiles.map(async htmlPath => {
      const name = path.relative(DIST_DIR, htmlPath).split(path.sep).join("/");
      let html = await readFile(htmlPath, "utf8");
      /*
      const titleStrip = stripTitleText(html);
      html = titleStrip.html;
      titleStripCount += titleStrip.count;
      const titleAttrStrip = stripTitleAttributes(html);
      html = titleAttrStrip.html;
      titleAttrStripCount += titleAttrStrip.count;
      if (/\stitle\s*=/i.test(html)) throw new Error(`${name}: title attributes still present after strip. Upstream changed.`);
      */
      for (const [from, to] of scopeRewrites) html = replaceAll(html, from, to);
      html = applyRewrites(html, rewrites);

      const proxyChoice = applyProxyChoiceValues(html);
      html = proxyChoice.source;
      proxyChoiceHtml += proxyChoice.count;

      const handlerAttrs = applyHandlerAttrs(html, handlerRenames);
      html = handlerAttrs.html;
      handlerHtmlCount += handlerAttrs.count;

      if (name === "settings.html") {
        const injected = injectVersionInfo(html, versionInfo);
        html = injected.html;
        versionInjections += injected.count;
      }

      const beforeHarden = html;
      const hardened = hardenTextNodes(html);
      html = hardened.html;
      const segments = countHardenableSegments(beforeHarden);
      const wrappersBefore = (beforeHarden.match(WRAPPER_OPEN) || []).length;
      const wrappersAfter = (html.match(WRAPPER_OPEN) || []).length;
      const wrappersAdded = wrappersAfter - wrappersBefore;
      if (visibleText(beforeHarden) !== visibleText(html)) throw new Error(`${name}: text hardening altered visible text. Aborting.`);
      if (wrappersAdded < segments) throw new Error(`${name}: text hardening under-covered, ${wrappersAdded} wrappers for ${segments} text segments. Upstream changed.`);
      hardenStats.push({ name, seen: hardened.seen, transformed: hardened.transformed, segments, wrappersAdded });

      const analytics = replaceAnalytics(html, analyticsPaths.loader);
      html = analytics.html;
      if (analytics.id) analyticsIds.add(analytics.id);

      references.push({ file: name, source: html });

      if (OBFUSCATE_HTML) html = await obfuscateHtml(html, name);
      await writeFile(htmlPath, html, "utf8");
      console.log(chalk.green(`  + ${name}${OBFUSCATE_HTML ? " (html-obfuscated)" : ""}`));
    }),
  );
  /*
  if (titleStripCount !== htmlFiles.length) throw new Error(`expected one <title> per HTML file (${htmlFiles.length}), stripped ${titleStripCount}. Upstream changed.`);
  console.log(`Stripped ${titleStripCount} <title> texts and ${titleAttrStripCount} title="" attributes`);
  */
  if (proxyChoiceHtml !== PROXY_CHOICE_COUNTS.html) throw new Error(`expected ${PROXY_CHOICE_COUNTS.html} proxy selector literals in HTML, replaced ${proxyChoiceHtml}. Update PROXY_CHOICE_COUNTS.`);
  if (handlerHtmlCount !== INLINE_HANDLER_HTML_COUNT) throw new Error(`expected ${INLINE_HANDLER_HTML_COUNT} inline-handler attributes in HTML, rewrote ${handlerHtmlCount}. Upstream changed.`);
  if (versionInjections !== VERSION_TOKEN_COUNT) throw new Error(`expected ${VERSION_TOKEN_COUNT} version tokens injected into settings.html, injected ${versionInjections}. Upstream changed.`);
  for (const s of hardenStats.sort((a, b) => a.name.localeCompare(b.name))) console.log(`  text hardening: ${s.name} -> ${s.transformed}/${s.seen} nodes, ${s.wrappersAdded} wrappers`);
  if (analyticsIds.size > 1) throw new Error(`HTML pages disagree on the analytics id: ${[...analyticsIds].join(", ")}`);
  if (analyticsIds.size === 1) {
    manifest.analytics = { id: [...analyticsIds][0], ...analyticsPaths };
    console.log(`\nAnalytics: proxied via ${analyticsPaths.loader}, hits to ${analyticsPaths.transport}/g/collect`);
  } else {
    console.log(chalk.yellow("\nAnalytics: no gtag block found in any page, nothing proxied"));
  }

  await mkdir(RUNTIME_DIR, { recursive: true });
  await writeFile(path.join(RUNTIME_DIR, "vendor-map.cjs"), `"use strict";\n// Generated by build.js on every build. Do not edit; do not serve.\nmodule.exports = ${JSON.stringify(manifest, null, 2)};\n`, "utf8");

  console.log("\nVerifying build...");
  const distJsFiles = [];
  for (const file of await collectFiles(DIST_DIR, name => name.endsWith(".js") || name.endsWith(".mjs"))) {
    if (file.startsWith(RUNTIME_DIR)) continue;
    distJsFiles.push({ file: path.relative(DIST_DIR, file).split(path.sep).join("/"), source: await readFile(file, "utf8"), module: file.endsWith(".mjs") });
  }

  const gateRenames = new Map([...identifierRenames, ["Ultraviolet", ultravioletName]]);
  for (const spec of specs) for (const name of spec.globals ?? []) if (name.startsWith(UV_PREFIX) && !gateRenames.has(name)) gateRenames.set(name, name.replace(UV_PREFIX, uvPrefixName));
  const { checkedReferences } = await verifyBuild({ manifest, specs, emitted, references, distJsFiles, serverRoutes: manifest.analytics ? [manifest.analytics.loader] : [], identifierRenames: gateRenames, swLocalRenames });
  console.log(chalk.green(`  all checks passed (${emitted.size} emitted assets, ${distJsFiles.length} scripts parsed, ${checkedReferences} asset references resolved across ${references.length} files)`));

  console.log(chalk.green("\nBuild complete -> dist/"));
  console.log(chalk.blue(`\nBuild id: ${manifest.build}  scope: ${NEW_UV_SCOPE}  scramjet: ${NEW_SCRAMJET_SCOPE}  sw: ${manifest.sw}`));
}

build().catch(err => {
  if (err instanceof VerificationError) {
    console.error(chalk.red("\nBuild verification failed:\n"));
    console.error(chalk.red(err.message));
    console.error(chalk.gray("\ndist/ is incomplete and will be rebuilt from static/ on the next run.\n"));
  } else {
    console.error(chalk.red("\nBuild failed:"), err);
  }
  process.exit(1);
});
