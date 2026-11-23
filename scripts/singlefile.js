import { spawnSync } from "node:child_process";
import { randomInt } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { gzipSync } from "node:zlib";
import chalk from "chalk";
import "dotenv/config";
import mime from "mime";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SKIP = new Set(["_headers", "_redirects", ".assetsignore"]);
const MAX_RECOMMENDED = 20 * 1024 * 1024;

let LABEL = "singlefile";
const fail = message => {
  console.error(chalk.red(`${LABEL}: ${message}`));
  process.exit(1);
};

function wispHosts() {
  const hosts = new Set();
  for (const variable of ["WISP_URL", "WISP_PREFERRED", "WISP_FALLBACK"]) {
    for (const entry of (process.env[variable] ?? "").split(",")) {
      const text = entry.trim();
      if (!text) continue;
      try {
        hosts.add(new URL(/^wss?:\/\//i.test(text) ? text : `wss://${text}`).host);
      } catch {
        fail(`${variable} contains an invalid entry "${text}"`);
      }
    }
  }
  return [...hosts];
}

function walk(dir, base = dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full, base));
    else files.push(path.relative(base, full).split(path.sep).join("/"));
  }
  return files;
}

function pickName(outDir, ext) {
  const words = readFileSync(path.join(ROOT, "src", "build", "words.txt"), "utf8")
    .split(/\r?\n/)
    .map(word => word.trim().toLowerCase())
    .filter(word => /^[a-z]{3,10}$/.test(word));
  if (words.length < 20) fail("src/build/words.txt has too few usable words");
  for (let attempt = 0; attempt < 100; attempt++) {
    const name = Array.from({ length: 3 }, () => words[randomInt(words.length)]).join("-");
    if (!existsSync(path.join(outDir, `${name}.${ext}`))) return name;
  }
  return fail("could not find an unused name");
}

function discoverImports(swName, code) {
  const href = `https://svg.invalid/${swName}`;
  const imports = [];
  const scope = {};
  for (const key of Object.getOwnPropertyNames(globalThis)) {
    if (["globalThis", "global", "process", "require", "console"].includes(key)) continue;
    try {
      scope[key] = globalThis[key];
    } catch {}
  }
  const ctx = vm.createContext(scope);
  const quiet = () => {};
  Object.assign(ctx, { self: ctx, globalThis: ctx, location: new URL(href), addEventListener: quiet, skipWaiting: () => Promise.resolve(), clients: { matchAll: async () => [], claim: async () => {} } });
  ctx.console = { log: quiet, info: quiet, warn: quiet, error: quiet, debug: quiet };
  ctx.navigator = { serviceWorker: {}, userAgent: "worker", language: "en", languages: ["en"] };
  ctx.importScripts = (...urls) => {
    for (const url of urls) {
      const pathname = new URL(url, href).pathname;
      imports.push(pathname);
      vm.runInContext(readFileSync(path.join(DIST, pathname), "utf8"), ctx, { filename: pathname });
    }
  };
  try {
    vm.runInContext(code, ctx);
  } catch (error) {
    fail(`could not evaluate ${swName} to find its imports: ${error.message}`);
  }
  if (imports.length < 2) fail(`${swName} imported ${imports.length} script(s); expected the proxy bundles. The build output changed shape.`);
  return imports;
}

function parseRedirects() {
  const file = path.join(DIST, "_redirects");
  if (!existsSync(file)) return [];
  return readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map(line => line.trim().split(/\s+/))
    .filter(parts => parts.length >= 3 && parts[2] === "200" && parts[0].startsWith("/"))
    .map(([from, to]) => [from, to]);
}

const loaderSource = (cacheName, known, rules) => `const K=new Set(${JSON.stringify(known)}),Q=${JSON.stringify(rules.map(r => r[0]))},C=${JSON.stringify(cacheName)},T={},V=new URL(registration.scope).pathname=="/",A=self.addEventListener.bind(self);
self.addEventListener=(t,f,o)=>/^(fetch|message|install|activate)$/.test(t)?(T[t]??=[]).push(f):A(t,f,o);
const R=(async()=>{const c=await caches.open(C),x=async p=>(await c.match(p)).text(),m=JSON.parse(await x("/__sw")),F={};
if(!V){await Promise.all(m.i.map(async p=>F[p]=await x(p)));
self.importScripts=(...u)=>u.forEach(p=>(0,eval)(F[new URL(p,location).pathname]));
(0,eval)(m.c)}return{c,r:m.r}})();
const D=(t,e)=>{const w=[];let r;const q=new Proxy(e,{get:(o,k)=>k=="respondWith"?v=>{r=v}:k=="waitUntil"?v=>w.push(v):typeof o[k]=="function"?o[k].bind(o):o[k]});(T[t]||[]).forEach(f=>f(q));return{r,w}};
A("install",e=>e.waitUntil(V?skipWaiting():R.then(()=>Promise.all(D("install",e).w))));
A("activate",e=>e.waitUntil(V?clients.claim():R.then(()=>Promise.all(D("activate",e).w))));
A("message",e=>e.waitUntil(R.then(()=>D("message",e).w)));
A("fetch",e=>{const u=new URL(e.request.url),n=decodeURIComponent(u.pathname);
if(V&&((e.request.destination=="document"&&n=="/")||u.origin!=location.origin||e.request.method!="GET"||!(K.has(n)||Q.some(f=>f.endsWith("*")?n.startsWith(f.slice(0,-1)):n==f))))return;
e.respondWith(R.then(async({c,r})=>{if(u.origin==location.origin&&e.request.method=="GET"&&!(e.request.destination=="document"&&u.pathname=="/")){let p=decodeURIComponent(u.pathname);
for(const[f,t]of r){const s=f.endsWith("*");if(s?p.startsWith(f.slice(0,-1)):p==f){const g=t.replace(":splat",s?p.slice(f.length-1):"");if(/^https?:/.test(g))return fetch(g);p=g;break}}
const h=await c.match(p,{ignoreSearch:true})||await c.match(p.replace(/\\/$/,"")+".html")||await c.match(p.replace(/\\/?$/,"/index.html"));if(h)return h}
return(!V&&D("fetch",e).r)||fetch(e.request)}))});
`;

export const bootScript = ({ cacheName, loaderName, count }) => `(async () => {
  const C = ${JSON.stringify(cacheName)}, L = ${JSON.stringify(loaderName)};
  const d = document, f = d.getElementById("f"), m = d.getElementById("m");
  const say = text => { m.textContent = text; m.style.display = text ? "block" : "none"; };
  try {
    if (location.protocol === "file:") throw new Error("Service workers cannot run from file://. Upload the file and its loader .js to the root of a website (or serve the folder over http://localhost) and open it from there.");
    if (!("serviceWorker" in navigator)) throw new Error("This browser cannot run service workers here.");
    const base = new URL(".", location.href);
    if (base.pathname !== "/") throw new Error("Put the file and its loader .js in the root of the site, not a subfolder.");
    const cache = await caches.open(C);
    if (!(await cache.match("/__ok"))) {
      say("Unpacking...");
      const b64 = d.getElementById("p").textContent.trim();
      const packed = new Uint8Array(Math.ceil(b64.length * 3 / 4));
      let used = 0;
      for (let i = 0; i < b64.length; i += 1 << 20) {
        const bin = atob(b64.slice(i, i + (1 << 20)));
        for (let j = 0; j < bin.length; j++) packed[used++] = bin.charCodeAt(j);
      }
      const bytes = new Uint8Array(await new Response(new Blob([packed.subarray(0, used)]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer());
      const headLength = new DataView(bytes.buffer).getUint32(0, true);
      const index = JSON.parse(new TextDecoder().decode(bytes.subarray(4, 4 + headLength)));
      if (index.length !== ${count}) throw new Error("Corrupt payload.");
      const start = 4 + headLength;
      for (let i = 0; i < index.length; i += 16) {
        await Promise.all(index.slice(i, i + 16).map(([path, type, at, size]) => cache.put(path, new Response(bytes.slice(start + at, start + at + size), { headers: { "content-type": type } }))));
      }
      await cache.put("/__ok", new Response("1"));
    }
    say("Starting...");
    const reg = await navigator.serviceWorker.register(new URL(L, base), { scope: "/" });
    const worker = reg.installing || reg.waiting || reg.active;
    if (worker.state !== "activated") await new Promise(done => worker.addEventListener("statechange", () => worker.state === "activated" && done()));
    for (const key of await caches.keys()) if (key.startsWith("isv-") && key !== C) await caches.delete(key);
    f.addEventListener("load", () => {
      try {
        const doc = f.contentDocument;
        const mirror = () => {
          if (doc.title) d.title = doc.title;
          const icon = doc.querySelector('link[rel~="icon"]');
          if (icon && d.head) { let own = d.head.querySelector("link[rel=icon]"); if (!own) { own = d.createElement("link"); own.rel = "icon"; d.head.appendChild(own); } own.href = icon.href; }
        };
        mirror();
        const node = doc.querySelector("title");
        if (node) new MutationObserver(mirror).observe(node, { childList: true, characterData: true, subtree: true });
      } catch {}
    });
    f.src = "/";
    say("");
  } catch (error) {
    say(String(error && error.message || error));
  }
})();`;

process.on("uncaughtException", () => {});
process.on("unhandledRejection", () => {});

export async function buildSingleFile({ kind, wrap }) {
  LABEL = `build-${kind}`;
  const outDir = path.join(ROOT, "singlefile", kind);
  mkdirSync(outDir, { recursive: true });
  const hosts = wispHosts();
  if (!hosts.length) fail("no Wisp servers found. Set WISP_URL, or WISP_PREFERRED / WISP_FALLBACK, in .env (see .env.example).");

  if (!process.argv.includes("--no-build")) {
    console.log(chalk.cyan(`Building static site with ${hosts.length} Wisp host(s)...`));
    const result = spawnSync(process.execPath, ["src/build.js", "--netlify"], { cwd: ROOT, stdio: "inherit", env: process.env });
    if (result.status !== 0) fail("the static build failed");
  }
  if (!existsSync(DIST)) fail("dist/ does not exist");
  const redirectsFile = path.join(DIST, "_redirects");
  if (!existsSync(redirectsFile) || !/^\/ \S+\.html 200$/m.test(readFileSync(redirectsFile, "utf8"))) fail("dist/ is not a --netlify build (no home redirect). Run without --no-build.");

  const rootScripts = readdirSync(DIST).filter(name => name.endsWith(".js") && statSync(path.join(DIST, name)).isFile());
  if (rootScripts.length !== 1) fail(`expected exactly one worker script in dist/, found ${rootScripts.length}`);
  const loaderName = rootScripts[0];
  const swCode = readFileSync(path.join(DIST, loaderName), "utf8");
  const imports = discoverImports(loaderName, swCode);
  const buildId = (loaderName.match(/\.([0-9a-f]{8})\.js$/) ?? [])[1];
  if (!buildId) fail(`cannot read a build id from ${loaderName}`);
  const cacheName = `isv-${buildId}`;

  const entries = [];
  for (const rel of walk(DIST)) {
    if (SKIP.has(rel) || rel.startsWith(".runtime/") || rel === loaderName) continue;
    entries.push({ path: `/${rel}`, type: mime.getType(rel) ?? "application/octet-stream", data: readFileSync(path.join(DIST, rel)) });
  }
  for (const url of imports) if (!entries.some(entry => entry.path === url)) fail(`worker imports ${url}, which is not in dist/`);

  entries.push({ path: "/__sw", type: "application/json", data: Buffer.from(JSON.stringify({ c: swCode, i: imports, r: parseRedirects() })) });

  for (const entry of entries) {
    if (!/^text\/|javascript|json|svg/.test(entry.type)) continue;
    const text = entry.data.toString("latin1");
    for (const host of hosts) if (text.includes(host)) fail(`Wisp host ${host} is readable in ${entry.path}`);
  }

  let offset = 0;
  const index = entries.map(entry => {
    const row = [entry.path, entry.type, offset, entry.data.length];
    offset += entry.data.length;
    return row;
  });
  const head = Buffer.from(JSON.stringify(index));
  const sizeField = Buffer.alloc(4);
  sizeField.writeUInt32LE(head.length);
  const packed = gzipSync(Buffer.concat([sizeField, head, ...entries.map(entry => entry.data)]), { level: 9 });

  const name = pickName(outDir, kind);
  const output = wrap({ payload: packed.toString("base64"), cacheName, loaderName, count: entries.length });
  const known = new Set();
  for (const entry of entries) {
    const q = entry.path;
    known.add(q);
    if (q.endsWith(".html")) known.add(q.slice(0, -5));
    if (q.endsWith("/index.html")) { known.add(q.slice(0, -10)); known.add(q.slice(0, -11)); }
  }
  const loader = loaderSource(cacheName, [...known].filter(q => q !== "/__sw"), parseRedirects());
  writeFileSync(path.join(outDir, `${name}.${kind}`), output);
  writeFileSync(path.join(outDir, loaderName), loader);

  const size = Buffer.byteLength(output);
  console.log(chalk.green(`\nWrote ${name}.${kind} (${(size / 1048576).toFixed(1)} MB, ${entries.length} files) and ${loaderName} (${loader.length} bytes) to singlefile/${kind}/.`));
  console.log(chalk.gray(`Upload both to the root of the same host (not a subfolder). Wisp: ${hosts.length} host(s), encoded by the build (split, base64, xor), not present in clear text.`));
  if (size > MAX_RECOMMENDED) console.log(chalk.yellow("Warning: over 20 MB; jsDelivr and some hosts reject files that large."));
  process.exit(0);
}
