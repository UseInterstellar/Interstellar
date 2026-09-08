self.__scramjet$config = {
  prefix: "/uv/scramjet/",
  codec: {
    encode: url => url && encodeURIComponent(url),
    decode: url => url && decodeURIComponent(url),
  },
  files: {
    wasm: "/assets/scramjet/scramjet.wasm",
    all: "/assets/scramjet/scramjet.all.js",
    sync: "/assets/scramjet/scramjet.sync.js",
  },
  flags: {
    rewriterLogs: false,
    scramitize: false,
    cleanErrors: true,
    sourcemaps: true,
  },
};
