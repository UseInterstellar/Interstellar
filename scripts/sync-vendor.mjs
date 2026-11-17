// Copies the browser-side proxy libraries out of node_modules into the static public root.
// The files are byte-for-byte copies: the site serves them untouched at runtime.
import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");
const { scramjetPath } = require("@useinterstellar/scramjet/path");
const { baremuxPath } = require("@mercuryworkshop/bare-mux/node");
const { epoxyPath } = require("@mercuryworkshop/epoxy-transport");
const { libcurlPath } = require("@mercuryworkshop/libcurl-transport");

const copies = [
  {
    from: uvPath,
    to: "static/assets/ultraviolet",
    files: ["uv.bundle.js", "uv.client.js", "uv.handler.js", "uv.sw.js"],
  },
  {
    from: scramjetPath,
    to: "static/assets/scramjet",
    files: ["scramjet.all.js", "scramjet.sync.js", "scramjet.wasm.wasm"],
  },
  {
    from: baremuxPath,
    to: "static/assets/baremux",
    files: ["index.mjs", "worker.js"],
  },
  {
    from: epoxyPath,
    to: "static/assets/epoxy",
    files: ["index.mjs"],
  },
  {
    from: libcurlPath,
    to: "static/assets/libcurl",
    files: ["index.mjs"],
  },
];

for (const { from, to, files } of copies) {
  const target = path.join(root, to);
  await mkdir(target, { recursive: true });
  for (const file of files) {
    await copyFile(path.join(from, file), path.join(target, file));
    console.log(`copied ${file} -> ${to}/${file}`);
  }
}
