(function () {
  "use strict";

  function cleanupLegacy() {
    localStorage.removeItem("pChoice");
    localStorage.removeItem("uv");
    localStorage.removeItem("dy");
  }

  function migrate() {
    var v = localStorage.getItem("pchoice");
    if (v === "sc") {
      localStorage.setItem("pchoice", "sj");
      v = "sj";
    }
    if (v === "uv" || v === "dy" || v === "sj") {
      if (
        localStorage.getItem("pChoice") !== null ||
        localStorage.getItem("uv") !== null ||
        localStorage.getItem("dy") !== null
      ) {
        cleanupLegacy();
      }
      return v;
    }
    var legacyPc = localStorage.getItem("pChoice");
    if (legacyPc === "uv" || legacyPc === "dy" || legacyPc === "sj" || legacyPc === "sc") {
      var n = legacyPc === "sc" ? "sj" : legacyPc;
      localStorage.setItem("pchoice", n);
      cleanupLegacy();
      return n;
    }
    var dyLeg = localStorage.getItem("dy");
    if (dyLeg === "true" || dyLeg === "auto") {
      localStorage.setItem("pchoice", "dy");
      cleanupLegacy();
      return "dy";
    }
    if (localStorage.getItem("uv") === "true") {
      localStorage.setItem("pchoice", "uv");
      cleanupLegacy();
      return "uv";
    }
    localStorage.setItem("pchoice", "uv");
    cleanupLegacy();
    return "uv";
  }

  window.resolveProxyPchoice = migrate;
  migrate();
})();
