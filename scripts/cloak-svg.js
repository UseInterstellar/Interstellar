import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import mime from "mime";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DECOY = path.join(ROOT, "static", "decoy");

const escapeAttr = text =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\r/g, "&#13;").replace(/\n/g, "&#10;").replace(/\t/g, "&#9;");

function walkHtml(dir, base = dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walkHtml(full, base, out);
    else if (/\.html?$/i.test(name)) out.push(path.relative(base, full).split(path.sep).join("/"));
  }
  return out;
}

const svgName = rel => rel.replace(/\.html?$/i, ".svg");

const LOCATION_SHIM = `<script>window.__loc=new Proxy({},{get(_,k){const l=parent.location,v=l[k];return typeof v==="function"?v.bind(l):v},set(_,k,v){parent.location[k]=v;return true}});</script>`;
const LOCATION_USE = /(?<![.\w$])(?:window\.|self\.|globalThis\.)?location(?=\s*\.\s*(?:href|assign|search|pathname|origin|hash|host|hostname|replace|reload|protocol|port)\b)/g;
const patchScript = code => code.replace(LOCATION_USE, "__loc");

const INTERSTELLAR_REF = /\b[a-z]{3,10}-[a-z]{3,10}-[a-z]{3,10}\.svg\b/g;
const isInterstellarSvg = file => /id="p"/.test(readFileSync(file, "latin1").slice(0, 2048));

function inlinePage(html, rel, dir, pages, interstellar) {
  const pageDir = path.posix.dirname(rel);
  const resolve = ref => {
    if (!ref || /^([a-z][a-z0-9+.-]*:|\/\/|#|data:)/i.test(ref)) return null;
    const clean = ref.split(/[?#]/)[0];
    const target = clean.startsWith("/") ? clean.slice(1) : path.posix.normalize(path.posix.join(pageDir, clean));
    const file = path.join(dir, target);
    return existsSync(file) && statSync(file).isFile() ? { target, file } : null;
  };
  const dataUri = file => `data:${mime.getType(file) ?? "application/octet-stream"};base64,${readFileSync(file).toString("base64")}`;
  const pageLink = ref => {
    const clean = ref.split(/[?#]/)[0];
    const suffix = ref.slice(clean.length);
    if (clean === "/" || clean === "") return null;
    const hit = resolve(clean);
    if (hit && pages.has(hit.target)) return `${path.posix.relative(pageDir, svgName(hit.target)) || svgName(hit.target)}${suffix}`;
    return null;
  };

  let out = html;
  out = out.replace(/<link\b[^>]*>/gi, tag => {
    const href = /\bhref\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
    const hit = href && resolve(href);
    if (!hit) return tag;
    if (/\brel\s*=\s*["']?stylesheet/i.test(tag)) {
      const css = readFileSync(hit.file, "utf8").replace(/url\(\s*(["']?)([^)"']+)\1\s*\)/g, (whole, q, ref) => {
        const asset = ref.startsWith("/") ? path.join(dir, ref.slice(1)) : path.join(path.dirname(hit.file), ref);
        return /^(data:|https?:|\/\/)/i.test(ref) || !existsSync(asset) ? whole : `url("${dataUri(asset)}")`;
      });
      return `<style>${css.replace(/<\/style/gi, "<\\/style")}</style>`;
    }
    return tag.replace(href, dataUri(hit.file));
  });
  out = out.replace(/<script\b([^>]*?)\bsrc\s*=\s*["']([^"']+)["']([^>]*)>\s*<\/script>/gi, (tag, before, src, after) => {
    const hit = resolve(src);
    if (!hit) return tag;
    return `<script${before}${after}>${patchScript(readFileSync(hit.file, "utf8")).replace(/<\/script/gi, "<\\/script")}</script>`;
  });
  out = out.replace(/(<script\b(?![^>]*\bsrc\s*=)[^>]*>)([\s\S]*?)(<\/script>)/gi, (whole, open, code, close) => open + patchScript(code) + close);
  out = /<head\b[^>]*>/i.test(out) ? out.replace(/<head\b[^>]*>/i, tag => tag + LOCATION_SHIM) : LOCATION_SHIM + out;
  if (interstellar) {
    out = out.replace(INTERSTELLAR_REF, ref => {
      const file = path.join(dir, path.posix.dirname(rel), ref);
      return existsSync(file) && !isInterstellarSvg(file) ? ref : interstellar;
    });
  }
  out = out.replace(/(<(?:img|source|video|audio)\b[^>]*?\bsrc\s*=\s*["'])([^"']+)(["'])/gi, (whole, a, src, b) => {
    const hit = resolve(src);
    return hit ? `${a}${dataUri(hit.file)}${b}` : whole;
  });
  out = out.replace(/(<a\b[^>]*?\bhref\s*=\s*["'])([^"']*)(["'][^>]*>)/gi, (whole, a, href, b) => {
    if (href === "/" || href === "./") {
      const index = pages.has("index.html") ? "index.svg" : null;
      return index ? `${a}${path.posix.relative(pageDir, index)}${b}`.replace(/>$/, / target=/i.test(whole) ? ">" : ' target="_top">') : whole;
    }
    const link = pageLink(href);
    return link ? `${a}${link}${b}`.replace(/>$/, / target=/i.test(whole) ? ">" : ' target="_top">') : whole;
  });
  return out;
}

const wrap = (html, title) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
<title>${title.replace(/\s+/g, " ").replace(/&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);)(\w+);/gi, "&amp;$1;")}</title>
<foreignObject x="0" y="0" width="100%" height="100%">
<body xmlns="http://www.w3.org/1999/xhtml" style="margin:0">
<iframe srcdoc="${escapeAttr(html)}" style="position:fixed;top:0;left:0;width:100%;height:100%;border:0;margin:0"></iframe>
</body>
</foreignObject>
</svg>
`;

export function prepareCloak(name) {
  const dir = path.join(DECOY, name);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    const known = existsSync(DECOY) ? readdirSync(DECOY).filter(entry => statSync(path.join(DECOY, entry)).isDirectory()) : [];
    console.error(chalk.red(`build-svg: no cloak named "${name}" in static/decoy/. Available: ${known.join(", ") || "none"}`));
    process.exit(1);
  }
  if (!walkHtml(dir).length) {
    console.error(chalk.red(`build-svg: static/decoy/${name}/ has no .html files`));
    process.exit(1);
  }
  const outDir = path.join(ROOT, "singlefile", "svg", name);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  return outDir;
}

export function buildCloak(name, interstellar) {
  const dir = path.join(DECOY, name);
  const outDir = path.join(ROOT, "singlefile", "svg", name);
  const pages = walkHtml(dir);
  const pageSet = new Set(pages);
  let linked = 0;
  for (const rel of pages) {
    const html = readFileSync(path.join(dir, rel), "utf8");
    const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1].trim() ?? name;
    const target = path.join(outDir, svgName(rel));
    mkdirSync(path.dirname(target), { recursive: true });
    const svg = wrap(inlinePage(html, rel, dir, pageSet, interstellar), title);
    if (interstellar && svg.includes(escapeAttr(interstellar)) ) linked++;
    writeFileSync(target, svg);
    console.log(chalk.green(`  ${rel} -> singlefile/svg/${name}/${svgName(rel)} (${(statSync(target).size / 1024).toFixed(1)} KB)`));
  }
  console.log(chalk.gray(`\nConverted ${pages.length} page(s). Upload the folder as it is; links between pages stay relative.`));
  if (interstellar && !linked) console.log(chalk.yellow(`Note: no page in static/decoy/${name}/ references an Interstellar .svg, so nothing opens ${interstellar}. Point your cloak's script at it.`));
}
