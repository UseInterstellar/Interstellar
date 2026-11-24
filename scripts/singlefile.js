import { spawnSync } from "node:child_process";
import { createHash, randomInt } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { gzipSync } from "node:zlib";
import chalk from "chalk";
import "dotenv/config";
import mime from "mime";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SKIP = new Set(["_headers", "_redirects", ".assetsignore"]);
// The build is made once with a placeholder folder. The loader and the pages swap in the folder the
// files were really uploaded to, so nothing about the host or the directory is decided here.
const PLACEHOLDER = "/__IB__";
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
  Object.assign(ctx, { __B: "/__IB__", self: ctx, globalThis: ctx, location: new URL(href), addEventListener: quiet, skipWaiting: () => Promise.resolve(), clients: { matchAll: async () => [], claim: async () => {} } });
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

const DEBUG_NAV = process.argv.includes("--debug-nav")
  ? "(function(){var t0=Date.now(),L=function(){try{console.log.apply(console,[\"[ISDBG]\",Date.now()-t0].concat([].slice.call(arguments)))}catch(e){}},d=0;try{for(var x=window;x!==x.parent;x=x.parent)d++}catch(e){}var H=function(){try{return location.href.slice(-70)}catch(e){return\"?\"}};L(\"doc-v3\",\"depth\",d,H());addEventListener(\"beforeunload\",function(){L(\"unload\",\"depth\",d,H())});if(window.navigation)navigation.addEventListener(\"navigate\",function(e){L(\"navigate\",e.navigationType,e.destination.url.slice(-70),\"user\",e.userInitiated)});document.addEventListener(\"load\",function(e){var f=e.target;if(f&&f.tagName===\"IFRAME\"){var h=\"?\";try{h=f.contentWindow.location.href.slice(-70)}catch(z){h=\"(x-origin)\"}L(\"iframe-load\",(f.className||\"\").slice(0,20),(f.getAttribute(\"src\")||\"\").slice(-60),h)}},true);new MutationObserver(function(m){m.forEach(function(r){if(r.attributeName===\"src\"){L(\"src-set\",(r.target.getAttribute(\"src\")||\"\").slice(-70))}if(r.type===\"childList\"){r.addedNodes.forEach(function(n){if(n.tagName===\"IFRAME\")L(\"iframe-added\",(n.getAttribute(\"src\")||\"\").slice(-70))})}})}).observe(document,{subtree:true,childList:true,attributes:true,attributeFilter:[\"src\"]});var seen=new WeakSet(),cnt=0,walk=function(w,dp,path){try{var fs=w.document.querySelectorAll(\"iframe,frame\");for(var i=0;i<fs.length;i++){var f=fs[i];if(!seen.has(f)){seen.add(f);if(++cnt<=40){var src=\"\";try{src=(f.getAttribute(\"src\")||\"\").slice(-80)}catch(z){}var host=\"\";try{host=f.contentWindow.location.href.slice(-50)}catch(z){host=\"(x)\"}L(\"nested-frame\",\"d\"+dp,\"id=\"+(f.id||\"\").slice(0,20),\"cls=\"+(f.className||\"\").slice(0,20),\"src=\"+src,\"now=\"+host,\"in=\"+path)}}try{walk(f.contentWindow,dp+1,(f.getAttribute(\"src\")||\"\").slice(-30))}catch(z){}}}catch(e){}};setInterval(function(){walk(window,1,\"host\")},200);var last={},c2=0,w2=function(w,p){try{var t=w.performance.timeOrigin;if(last[p]!==t){last[p]=t;if(++c2<=60)L(\"doc-new\",\"p=\"+p,w.location.href.slice(-70),\"rs=\"+w.document.readyState,\"kids=\"+w.length)}for(var i=0;i<w.length;i++)w2(w[i],p+\".\"+i)}catch(e){}};setInterval(function(){w2(window,\"t\")},30);if(navigator.serviceWorker){navigator.serviceWorker.addEventListener(\"message\",function(e){if(e.data&&e.data.isdbg)L.apply(null,e.data.isdbg)});try{navigator.serviceWorker.startMessages()}catch(z){}}})();"
  : "";
const loaderSource = (cacheName, known, rules, origName) => `const P=${JSON.stringify(PLACEHOLDER)},D=new URL(".",location.href).pathname.slice(0,-1),K=new Set(${JSON.stringify(known)}),Q=${JSON.stringify(rules.map(r => r[0]))},C=${JSON.stringify(cacheName)},T={},V=new URL(registration.scope).pathname==D+"/",A=self.addEventListener.bind(self);
self.__B=D;const X=${JSON.stringify(DEBUG_NAV)},dl=(...a)=>{try{clients.matchAll({includeUncontrolled:true}).then(cs=>cs.forEach(c=>c.postMessage({isdbg:a})))}catch(_){}};
self.addEventListener=(t,f,o)=>/^(fetch|message|install|activate)$/.test(t)?(T[t]??=[]).push(f):A(t,f,o);
const k=n=>n.startsWith(D+"/")?P+n.slice(D.length):null,tx=t=>t.split(P).join(D),M=new Map();
const RG="(function(){var s=navigator.serviceWorker;if(!s||!s.register)return;var r=s.register,O="+JSON.stringify(D+"/"+${JSON.stringify(origName)})+",N="+JSON.stringify(location.pathname)+";s.register=function(u,o){try{var a=new URL(u,location.href);if(a.origin===location.origin&&a.pathname===O)u=N}catch(e){}return r.call(s,u,o)}})();";
const inj=t=>{const s="<script>self.__B="+JSON.stringify(D)+";"+RG+X+"</script>",i=t.toLowerCase().indexOf("<head"),j=i<0?-1:t.indexOf(">",i);return j<0?s+t:t.slice(0,j+1)+s+t.slice(j+1)};
const out=async(h,key)=>{const ct=h.headers.get("content-type")||"";if(!/text|javascript|json|xml|svg/.test(ct))return h;let t=M.get(key);if(t==null){t=tx(await h.text());if(ct.includes("html"))t=inj(t);M.set(key,t)}return new Response(t,{status:h.status,headers:{"content-type":ct}})};
const R=(async()=>{const c=await caches.open(C),x=async p=>tx(await(await c.match(p)).text()),m=JSON.parse(await(await c.match("/__sw")).text()),F={};
if(!V){const nf=self.fetch.bind(self);self.fetch=async(r,o)=>{try{const u=new URL(typeof r=="string"?r:r.url,location.href),y=u.origin==location.origin?k(decodeURIComponent(u.pathname)):null;if(y!=null&&((o&&o.method)||(r&&r.method)||"GET")=="GET"){const h=await c.match(y,{ignoreSearch:true});if(h)return out(h,y)}}catch(_){}return nf(r,o)};await Promise.all(m.i.map(async p=>F[p]=await x(p)));
self.importScripts=(...u)=>u.forEach(p=>(0,eval)(F[k(new URL(p,location).pathname)]));
(0,eval)(m.c)}return{c,r:m.r}})();
const H=(t,e)=>{const w=[];let r;const q=new Proxy(e,{get:(o,k)=>k=="respondWith"?v=>{r=v}:k=="waitUntil"?v=>w.push(v):typeof o[k]=="function"?o[k].bind(o):o[k]});(T[t]||[]).forEach(f=>f(q));return{r,w}};
A("install",e=>e.waitUntil(V?skipWaiting():R.then(()=>Promise.all(H("install",e).w))));
A("activate",e=>e.waitUntil(V?clients.claim():R.then(()=>Promise.all(H("activate",e).w))));
A("message",e=>{if(X&&!V){try{dl("[ISDBG-SW] msg",Object.keys(e.data||{}).join(",").slice(0,80))}catch(_){}}e.waitUntil(R.then(()=>H("message",e).w))});
A("fetch",e=>{const u=new URL(e.request.url),n=decodeURIComponent(u.pathname),y=k(n),own=u.origin==location.origin&&e.request.method=="GET"&&y!=null,top=e.request.destination=="document"&&n==D+"/";
if(V&&(!own||top||!(K.has(y)||Q.some(f=>f.endsWith("*")?y.startsWith(f.slice(0,-1)):y==f))))return;
e.respondWith(R.then(async({c,r})=>{if(own&&!top){let p=y;
for(const[f,t]of r){const s=f.endsWith("*");if(s?p.startsWith(f.slice(0,-1)):p==f){const g=t.replace(":splat",s?p.slice(f.length-1):"");if(/^https?:/.test(g))return fetch(g);p=g;break}}
const w=p.endsWith("/")?p.slice(0,-1):p,h=await c.match(p,{ignoreSearch:true})||await c.match(w+".html")||await c.match(w+"/index.html");if(h&&e.request.destination=="script"&&/wasm/.test(h.headers.get("content-type")||"")){const b=new Uint8Array(await h.arrayBuffer());let s="";for(let i=0;i<b.length;i+=8192)s+=String.fromCharCode.apply(null,b.subarray(i,i+8192));return new Response("if('document' in self&&document.currentScript){document.currentScript.remove()}self.WASM='"+btoa(s)+"';",{headers:{"content-type":"text/javascript"}})}if(h)return out(h,p)}
{const q=!V&&H("fetch",e).r;if(q&&X){const lg=z=>{try{const d=decodeURIComponent(u.pathname.split("/").pop()).split("").map((ch,i)=>i%4?String.fromCharCode(ch.charCodeAt(0)^4):ch).join("");dl("[ISDBG-SW]",e.request.method,e.request.destination||"-",e.request.mode,d.slice(0,130),z)}catch(_){}};return Promise.resolve(q).then(r=>{lg(r&&r.status+" "+(r.type||""));return r},er=>{lg("ERR "+(er&&er.message||er));throw er})}return q||fetch(e.request)}}))});
`;

export const bootScript = ({ cacheName, loaderName, count }) => `(async () => {
  const C = ${JSON.stringify(cacheName)}, L = ${JSON.stringify(loaderName)};
  const d = document, f = d.getElementById("f"), m = d.getElementById("m");
  const say = text => { m.textContent = text; m.style.display = text ? "block" : "none"; };
  try {
    if (location.protocol === "file:") throw new Error("Service workers cannot run from file://. Upload the file and its loader .js together to a website (or serve the folder over http://localhost) and open it from there.");
    if (!("serviceWorker" in navigator)) throw new Error("This browser cannot run service workers here.");
    const base = new URL(".", location.href);
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
    const loaderUrl = new URL(L, base);
    let reg;
    for (let attempt = 0; !reg; attempt++) {
      try {
        reg = await navigator.serviceWorker.register(loaderUrl, { scope: base.pathname });
      } catch (error) {
        if (attempt < 2) { await new Promise(done => setTimeout(done, 800 * (attempt + 1))); continue; }
        let why = "";
        try {
          const probe = await fetch(loaderUrl, { cache: "no-store" });
          why = " The loader file answered " + probe.status + " (" + (probe.headers.get("content-type") || "no content type") + ").";
        } catch (probeError) {
          why = " The loader file could not be fetched at all: " + probeError.message + ".";
        }
        throw new Error("Could not register " + L + ": " + error.message + "." + why + " If it keeps failing, open " + loaderUrl.href + " in a tab, and try again without extensions or filters.");
      }
    }
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
    f.src = base.pathname;
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
    const result = spawnSync(process.execPath, ["src/build.js", "--netlify", "--dynamic-base"], { cwd: ROOT, stdio: "inherit", env: process.env });
    if (result.status !== 0) fail("the static build failed");
  }
  if (!existsSync(DIST)) fail("dist/ does not exist");
  const redirectsFile = path.join(DIST, "_redirects");
  if (!existsSync(redirectsFile) || !readFileSync(redirectsFile, "utf8").split(/\r?\n/).some(line => line.startsWith(`${PLACEHOLDER}/ `) && line.endsWith(".html 200"))) fail("dist/ is not a --netlify build (no home redirect). Run without --no-build.");

  const baseDir = path.join(DIST, PLACEHOLDER.slice(1));
  const rootScripts = existsSync(baseDir) ? readdirSync(baseDir).filter(name => name.endsWith(".js") && statSync(path.join(baseDir, name)).isFile()) : [];
  if (rootScripts.length !== 1) fail(`expected exactly one worker script in dist${PLACEHOLDER}, found ${rootScripts.length}`);
  const loaderName = rootScripts[0];
  const loaderRel = `${PLACEHOLDER.slice(1)}/${loaderName}`;
  const swCode = readFileSync(path.join(DIST, loaderRel), "utf8");
  const imports = discoverImports(loaderRel, swCode);
  const buildId = (loaderName.match(/\.([0-9a-f]{8})\.js$/) ?? [])[1];
  if (!buildId) fail(`cannot read a build id from ${loaderName}`);
  const cacheName = `isv-${buildId}`;

  const entries = [];
  for (const rel of walk(DIST)) {
    if (SKIP.has(rel) || !rel.startsWith(`${PLACEHOLDER.slice(1)}/`) || rel === loaderRel) continue;
    entries.push({ path: `/${rel}`, type: mime.getType(rel) ?? "application/octet-stream", data: readFileSync(path.join(DIST, rel)) });
  }

  // The backgrounds are most of the size. Re-encode them smaller (same paths, so nothing else changes).
  const argNumber = (name, fallback) => {
    const hit = process.argv.find(a => a.startsWith(`--${name}=`));
    const value = hit ? Number(hit.split("=")[1]) : fallback;
    return Number.isFinite(value) && value > 0 ? value : fallback;
  };
  const lite = process.argv.includes("--lite");
  const bgWidth = argNumber("bg-width", lite ? 640 : 1024);
  const bgQuality = argNumber("bg-quality", lite ? 28 : 35);
  if (!process.argv.includes("--full-size")) {
    let before = 0;
    let after = 0;
    for (const entry of entries) {
      if (!/\.(webp|jpe?g)$/i.test(entry.path) || entry.data.length < 16 * 1024) continue;
      before += entry.data.length;
      try {
        const small = await sharp(entry.data).resize({ width: bgWidth, withoutEnlargement: true }).webp({ quality: bgQuality, effort: 5 }).toBuffer();
        if (small.length < entry.data.length) {
          entry.data = small;
          entry.type = "image/webp";
        }
      } catch {}
      after += entry.data.length;
    }
    console.log(chalk.gray(`${LABEL}: backgrounds ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB (width ${bgWidth}, quality ${bgQuality}; --lite makes them smaller, --full-size keeps them as they are)`));
  }
  for (const url of imports) if (!entries.some(entry => entry.path === url)) fail(`worker imports ${url}, which is not in dist/`);

  entries.push({ path: "/__sw", type: "application/json", data: Buffer.from(JSON.stringify({ c: swCode, i: imports, r: parseRedirects() })) });

  for (const entry of entries) {
    if (!/^text\/|javascript|json|svg/.test(entry.type)) continue;
    const text = entry.data.toString("latin1");
    for (const host of hosts) if (text.includes(host)) fail(`Wisp host ${host} is readable in ${entry.path}`);
  }

  const known = new Set();
  for (const entry of entries) {
    const q = entry.path;
    known.add(q);
    if (q.endsWith(".html")) known.add(q.slice(0, -5));
    if (q.endsWith("/index.html")) { known.add(q.slice(0, -10)); known.add(q.slice(0, -11)); }
  }
  // The app registers the loader by its original name (the string is obfuscated, so it cannot be rewritten in the pack); the injected script in each app page redirects that registration to the published, hashed file.
  const loader = loaderSource(cacheName, [...known].filter(q => q !== "/__sw"), parseRedirects(), loaderName);
  // The loader name carries a content hash, so a host or CDN that caches by path (githack does) can never serve an older loader next to a newer page.
  const publishedLoader = loaderName.replace(/\.js$/, `-${createHash("sha256").update(loader).digest("hex").slice(0, 6)}.js`);

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
  const output = wrap({ payload: packed.toString("base64"), cacheName, loaderName: publishedLoader, count: entries.length });
  writeFileSync(path.join(outDir, `${name}.${kind}`), output);
  writeFileSync(path.join(outDir, publishedLoader), loader);

  const size = Buffer.byteLength(output);
  console.log(chalk.green(`\nWrote ${name}.${kind} (${(size / 1048576).toFixed(1)} MB, ${entries.length} files) and ${publishedLoader} (${loader.length} bytes) to singlefile/${kind}/.`));
  console.log(chalk.gray(`Upload the .${kind} and ${publishedLoader} together into any folder on the host (or its root). They work from wherever they are placed. Wisp: ${hosts.length} host(s), encoded by the build (split, base64, xor), not present in clear text.`));
  if (size > MAX_RECOMMENDED) console.log(chalk.yellow("Warning: over 20 MB; jsDelivr and some hosts reject files that large."));
  process.exit(0);
}
