import { createHash } from "node:crypto";
import { cp, readdir, readFile, writeFile, rm, mkdir } from "node:fs/promises";
import path from "node:path";
import { minify } from "terser";
import JavaScriptObfuscator from "javascript-obfuscator";
import chalk from "chalk";

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

const KEEP_IN_PLACE = new Set();

// scramjet.*: already-built vendor bundles.
// scramjet.config.js / uv.config.js: hold codec functions the proxies eval in another
// realm, where the obfuscator's string-array helpers do not exist.
const SKIP_OBFUSCATE = new Set([
  "scramjet.all.js",
  "scramjet.sync.js",
  "scramjet.config.js",
  "uv.config.js",
]);

const OLD_UV_SCOPE = "/uv/";
const OLD_SCRAMJET_SCOPE = "/uv/scramjet/";

const WORDS = [
  "api",
  "lib",
  "src",
  "net",
  "sys",
  "io",
  "pkg",
  "app",
  "mod",
  "ext",
  "math",
  "calc",
  "units",
  "matrix",
  "vector",
  "scalar",
  "ratio",
  "delta",
  "sigma",
  "alpha",
  "beta",
  "gamma",
  "omega",
  "phi",
  "theta",
  "core",
  "util",
  "data",
  "base",
  "node",
  "tree",
  "heap",
  "stack",
  "queue",
  "graph",
  "hash",
  "map",
  "set",
  "list",
  "ring",
  "chain",
  "parse",
  "fmt",
  "log",
  "proc",
  "exec",
  "init",
  "boot",
  "load",
  "sync",
  "async",
  "fetch",
  "emit",
  "bind",
  "wrap",
  "pool",
  "fork",
  "dictionary",
  "mapping",
  "resolver",
  "adapter",
  "encoder",
  "decoder",
  "scheduler",
  "dispatcher",
  "observer",
  "registry",
  "factory",
  "builder",
  "transform",
  "pipeline",
  "middleware",
  "handler",
  "router",
  "broker",
  "storage",
  "cache",
  "buffer",
  "stream",
  "channel",
  "socket",
  "bridge",
  "monitor",
  "profiler",
  "tracer",
  "validator",
  "sanitizer",
  "1",
  "2",
  "3",
  "v1",
  "v2",
  "v3",
  "that",
  "was",
  "my",
  "part",
  "of",
  "the",
  "deal",
  "honest",
  "we",
  "got",
  "so",
  "familiar",
  "spending",
  "each",
  "day",
  "of",
  "the",
  "year",
  "white",
  "ferrari",
  "good",
  "times",
];

const FILENAMES = [
  "x",
  "y",
  "z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "1",
  "2",
  "3",
  "10",
  "11",
  "100",
  "mod",
  "lib",
  "api",
  "run",
  "cli",
  "app",
  "env",
  "cfg",
  "index",
  "main",
  "core",
  "init",
  "loader",
  "worker",
  "runtime",
  "parser",
  "formatter",
  "handler",
  "manager",
  "client",
  "server",
  "config",
  "schema",
  "mapper",
  "adapter",
  "resolver",
  "encoder",
  "decoder",
  "sync",
  "fetch",
  "stream",
  "buffer",
  "queue",
  "cache",
  "router",
  "dispatcher",
  "emitter",
  "observer",
  "builder",
  "factory",
  "transform",
  "pipeline",
  "registry",
  "validator",
  "scheduler",
  "monitor",
  "tracer",
  "bridge",
  "channel",
  "storage",
  "profiler",
];

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

function randomDir() {
  const depth = randomInt(1, 2);
  return Array.from({ length: depth }, randomSegment).join("/");
}

function randomFilename() {
  if (Math.random() < 0.1) return `${randomItem(FILENAMES)}-${randomItem(FILENAMES)}`;
  return randomItem(FILENAMES);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyRenameMap(content, renameMap, protectedPrefixes) {
  let result = content;
  for (const [original, newPublicPath] of renameMap) {
    const q = `['"\`]`;
    const pattern = new RegExp(`(${q})([^'"\`]*${escapeRegex(original)})(${q})`, "g");
    result = result.replace(pattern, (_m, open, inner, close) => {
      if (protectedPrefixes.some(p => inner.includes(p))) return `${open}${inner}${close}`;
      return `${open}${newPublicPath}${close}`;
    });
  }
  return result;
}

function replaceAll(content, oldStr, newStr) {
  return content.split(oldStr).join(newStr);
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

// Fatal: a half-patched build encodes and decodes with different keys, silently breaking
// every proxied URL.
class CodecPatchError extends Error {
  constructor(message) {
    super(message);
    this.name = "CodecPatchError";
  }
}

// Optional patches cover patterns that exist in only some files sharing a branch below.
function patchOrFail(content, pattern, replacement, label, required = true) {
  if (!pattern.test(content)) {
    if (!required) return content;
    throw new CodecPatchError(`${label}: pattern no longer matches. Upstream file changed - update the pattern in patchProxyCodecs().`);
  }
  pattern.lastIndex = 0;
  return content.replace(pattern, replacement);
}

function patchProxyCodecs(content, basename, proxyCodecs) {
  if (basename === "uv.config.js") {
    const { codec, key } = parseCodecSpec(proxyCodecs.uv);
    const uvCodec = getUrlCodecFunctions(codec, key);
    content = patchOrFail(content, /encodeUrl:\s*Ultraviolet\.codec\.\w+\.encode,/, `encodeUrl: ${uvCodec.encode},`, "uv.config.js encodeUrl");
    content = patchOrFail(content, /decodeUrl:\s*Ultraviolet\.codec\.\w+\.decode,/, `decodeUrl: ${uvCodec.decode},`, "uv.config.js decodeUrl");
  }

  if (basename === "scramjet.config.js") {
    const { codec, key } = parseCodecSpec(proxyCodecs.scramjet);
    const sjCodec = getUrlCodecFunctions(codec, key);
    content = patchOrFail(content, /codec:\s*\{[\s\S]*?\n\s*\},\n\s*files:/, `codec: {\n    encode: ${sjCodec.encode},\n    decode: ${sjCodec.decode},\n  },\n  files:`, "scramjet.config.js codec");
  }

  return content;
}

// sw.js importScripts six files into one scope and inline scripts share window, so the
// obfuscator's hex identifiers collide. Give each file its own prefix.
function identifiersPrefixFor(scopeKey) {
  return `_${createHash("sha1").update(scopeKey).digest("hex").slice(0, 8)}_`;
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

async function getJsFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await getJsFiles(full)));
    else if (entry.name.endsWith(".js")) files.push(full);
  }
  return files;
}

async function getHtmlFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await getHtmlFiles(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

async function updateServerRoutes(uvScope, scramjetScope) {
  const indexPath = path.join(process.cwd(), "index.js");
  try {
    let content = await readFile(indexPath, "utf8");
    content = replaceAll(content, OLD_UV_SCOPE, uvScope);
    content = replaceAll(content, OLD_SCRAMJET_SCOPE, scramjetScope);
    await writeFile(indexPath, content, "utf8");
    console.log(chalk.green("  + index.js (scope routes updated)"));
  } catch {}
}

async function build() {
  console.log("Cleaning dist/...");
  await rm(DIST_DIR, { recursive: true, force: true });

  console.log("Copying static/ -> dist/...");
  await cp(SRC_DIR, DIST_DIR, { recursive: true });

  console.log(OBFUSCATE ? chalk.yellow("Obfuscation: ON") : chalk.yellow("Obfuscation: OFF (rename + rewrite only)"));

  const uvBase = randomWord();
  const scramjetSub = randomWord();

  const NEW_UV_SCOPE = `/${uvBase}/`;
  const NEW_SCRAMJET_SCOPE = `/${uvBase}/${scramjetSub}/`;
  const proxyCodecs = createProxyCodecs();

  console.log(`\nScope paths:`);
  console.log(`  ${OLD_UV_SCOPE} -> ${NEW_UV_SCOPE}`);
  console.log(`  ${OLD_SCRAMJET_SCOPE} -> ${NEW_SCRAMJET_SCOPE}`);
  console.log(`\nURL codecs:`);
  console.log(`  ultraviolet: ${proxyCodecs.uv}`);
  console.log(`  scramjet:    ${proxyCodecs.scramjet}`);

  const jsPublicDir = randomDir();
  const jsDirFull = path.join(DIST_DIR, jsPublicDir);
  await mkdir(jsDirFull, { recursive: true });

  const PROTECTED = ["/wisp/", "/baremux/", "/epoxy/", "/libcurl/", "/assets/scramjet/", "/assets/ultraviolet/", NEW_UV_SCOPE, NEW_SCRAMJET_SCOPE];

  const usedPaths = new Set();

  function nextOutputPath(basePublicDir, baseDirFull) {
    const existingSegments = new Set(basePublicDir.split("/").filter(Boolean));
    let publicPath, fullPath;
    do {
      const filename = `${randomFilename()}.js`;
      if (Math.random() < 0.05) {
        let subDir;
        do {
          subDir = randomWord();
        } while (existingSegments.has(subDir));
        publicPath = `/${basePublicDir}/${subDir}/${filename}`;
        fullPath = path.join(baseDirFull, subDir, filename);
      } else {
        publicPath = `/${basePublicDir}/${filename}`;
        fullPath = path.join(baseDirFull, filename);
      }
    } while (usedPaths.has(publicPath));
    usedPaths.add(publicPath);
    return { publicPath, fullPath };
  }

  const jsRenameMap = new Map();
  const plan = new Map();

  for (const filePath of await getJsFiles(JS_DIR)) {
    const basename = path.basename(filePath);
    const { publicPath: newPublicPath, fullPath: newFullPath } = nextOutputPath(jsPublicDir, jsDirFull);
    plan.set(filePath, { basename, newPublicPath, newFullPath, inPlace: false, group: "js" });
    jsRenameMap.set(basename, newPublicPath);
  }

  const ROOT_JS = ["sw.js"];
  for (const name of ROOT_JS) {
    const filePath = path.join(DIST_DIR, name);
    let newName;
    do {
      newName = `${randomFilename()}.js`;
    } while (usedPaths.has(`/${newName}`));
    usedPaths.add(`/${newName}`);
    const newPublicPath = `/${newName}`;
    const newFullPath = path.join(DIST_DIR, newName);
    plan.set(filePath, { basename: name, newPublicPath, newFullPath, inPlace: false, group: "uv" });
    jsRenameMap.set(name, newPublicPath);
  }

  console.log(`\nJS/UV output:   /${jsPublicDir}\n`);

  let passed = 0;
  let failed = 0;
  const codecFailures = [];

  await Promise.all(
    [...plan.entries()].map(async ([filePath, { basename, newPublicPath, newFullPath, inPlace, group }]) => {
      try {
        let output = await readFile(filePath, "utf8");
        output = patchProxyCodecs(output, basename, proxyCodecs);

        output = replaceAll(output, OLD_SCRAMJET_SCOPE, NEW_SCRAMJET_SCOPE);
        output = replaceAll(output, OLD_UV_SCOPE, NEW_UV_SCOPE);

        if (group === "js" || group === "uv") {
          output = applyRenameMap(output, jsRenameMap, PROTECTED);
        }

        const shouldObfuscate = OBFUSCATE && !SKIP_OBFUSCATE.has(basename);
        if (shouldObfuscate) output = await runObfuscator(output, basename);

        await mkdir(path.dirname(newFullPath), { recursive: true });
        await writeFile(newFullPath, output, "utf8");
        if (!inPlace) await rm(filePath);

        const tag = shouldObfuscate ? "(obfuscated)" : SKIP_OBFUSCATE.has(basename) ? "(skip-obfuscate)" : inPlace ? "(in place)" : "(renamed)";
        console.log(chalk.green(`  + ${basename} -> ${newPublicPath} ${tag}`));
        passed++;
      } catch (err) {
        if (err instanceof CodecPatchError) codecFailures.push(err.message);
        console.error(chalk.red(`  x ${basename}: ${err.message}`));
        failed++;
      }
    }),
  );

  console.log(`\n${passed} processed${failed ? `, ${failed} failed` : ""}`);

  if (codecFailures.length) {
    console.error(chalk.red("\nAborting: URL codec patching failed."));
    console.error(chalk.red("The client and the proxy would encode/decode with mismatched keys, breaking every proxied URL.\n"));
    for (const message of codecFailures) console.error(chalk.red(`  - ${message}`));
    console.error(chalk.gray("\ndist/ is incomplete and will be rebuilt from static/ on the next run.\n"));
    process.exit(1);
  }

  for (const dir of [JS_DIR]) {
    await rm(dir, { recursive: true, force: true });
  }

  const allRenames = new Map([...jsRenameMap]);
  const htmlFiles = await getHtmlFiles(DIST_DIR);
  console.log(`\nUpdating ${htmlFiles.length} HTML files${OBFUSCATE_HTML ? " + obfuscating" : ""}...\n`);

  await Promise.all(
    htmlFiles.map(async htmlPath => {
      let html = await readFile(htmlPath, "utf8");
      let changed = false;

      for (const [oldScope, newScope] of [
        [OLD_SCRAMJET_SCOPE, NEW_SCRAMJET_SCOPE],
        [OLD_UV_SCOPE, NEW_UV_SCOPE],
      ]) {
        const updated = replaceAll(html, oldScope, newScope);
        if (updated !== html) {
          html = updated;
          changed = true;
        }
      }

      for (const [original, newPublicPath] of allRenames) {
        const pattern = new RegExp(`((?:src|href)=["'])[^"']*${escapeRegex(original)}(["'])`, "g");
        const updated = html.replace(pattern, `$1${newPublicPath}$2`);
        if (updated !== html) {
          html = updated;
          changed = true;
        }
      }

      if (OBFUSCATE_HTML) {
        const obfuscated = await obfuscateHtml(html, path.relative(DIST_DIR, htmlPath));
        if (obfuscated !== html) {
          html = obfuscated;
          changed = true;
        }
      }

      if (changed) {
        await writeFile(htmlPath, html, "utf8");
        console.log(chalk.green(`  + ${path.relative(DIST_DIR, htmlPath)}${OBFUSCATE_HTML ? " (html-obfuscated)" : ""}`));
      } else {
        console.log(chalk.gray(`  - ${path.relative(DIST_DIR, htmlPath)} (no changes)`));
      }
    }),
  );

  const allJs = await getJsFiles(DIST_DIR);
  const otherJs = allJs.filter(f => !f.startsWith(jsDirFull) && !f.startsWith(JS_DIR));

  if (otherJs.length) {
    console.log(`\nUpdating ${otherJs.length} other JS files...\n`);
    await Promise.all(
      otherJs.map(async jsPath => {
        const content = await readFile(jsPath, "utf8");
        let updated = content;
        updated = patchProxyCodecs(updated, path.basename(jsPath), proxyCodecs);
        updated = replaceAll(updated, OLD_SCRAMJET_SCOPE, NEW_SCRAMJET_SCOPE);
        updated = replaceAll(updated, OLD_UV_SCOPE, NEW_UV_SCOPE);
        updated = applyRenameMap(updated, allRenames, PROTECTED);
        if (updated !== content) {
          await writeFile(jsPath, updated, "utf8");
          console.log(chalk.green(`  + ${path.relative(DIST_DIR, jsPath)}`));
        }
      }),
    );
  }

  console.log("\nUpdating server routes...\n");
  await updateServerRoutes(NEW_UV_SCOPE, NEW_SCRAMJET_SCOPE);

  console.log(chalk.green("\nBuild complete -> dist/"));
  console.log(chalk.blue(`\nNew scope: ${NEW_UV_SCOPE}  scramjet: ${NEW_SCRAMJET_SCOPE}`));
}

build().catch(err => {
  console.error(chalk.red("\nBuild failed:"), err);
  process.exit(1);
});
