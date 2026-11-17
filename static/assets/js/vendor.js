// Browser-side proxy libraries. Served untouched from the static public root;
// `pnpm vendor` copies them here from node_modules.
self.__deps = {
  baremux: "/assets/baremux/index.mjs",
  baremuxWorker: "/assets/baremux/worker.js",
  epoxy: "/assets/epoxy/index.mjs",
  libcurl: "/assets/libcurl/index.mjs",
};
