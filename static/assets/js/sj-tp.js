(() => {
  if (window.__isSjTpReady) {
    return;
  }

  window.__isSjTpReady = true;

  const sjConfig = {
    prefix: "/uv/scramjet/",
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

  function getWispUrl() {
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    return `${protocol}://${location.host}/wisp/`;
  }

  async function initSjTransport() {
    if (typeof window.$scramjetLoadController !== "function") {
      throw new Error("Sj bundle did not load.");
    }

    const [{ BareMuxConnection }, { ScramjetController }] = await Promise.all([import("/bm/index.mjs"), Promise.resolve(window.$scramjetLoadController())]);

    const sj = new ScramjetController(sjConfig);
    await sj.init();

    const connection = new BareMuxConnection("/bm/worker.js");
    await connection.setTransport("/ep/index.mjs", [{ wisp: getWispUrl() }]);

    window.__isSj = {
      connection,
      controller: sj,
      encodeUrl: url => sj.encodeUrl(url),
      decodeUrl: url => sj.decodeUrl(url),
      pxyUrl: url => sj.encodeUrl(url),
    };
  }

  async function boot() {
    try {
      await initSjTransport();
    } catch (error) {
      console.error("Failed to initialize sj transport:", error);
    }
  }

  if (document.readyState === "loading") {
    window.__isSjReady = new Promise(resolve => {
      document.addEventListener(
        "DOMContentLoaded",
        () => {
          void boot().finally(resolve);
        },
        { once: true },
      );
    });
  } else {
    window.__isSjReady = boot();
  }
})();
