(() => {
  function migrate() {
    const hadLegacy = localStorage.getItem("pChoice") !== null || localStorage.getItem("uv") !== null || localStorage.getItem("dy") !== null;

    localStorage.removeItem("pChoice");
    localStorage.removeItem("uv");
    localStorage.removeItem("dy");

    const v = localStorage.getItem("pchoice");
    if (v === "sc") {
      localStorage.setItem("pchoice", "sj");
      return "sj";
    }

    if (hadLegacy) {
      localStorage.setItem("pchoice", "sj");
      return "sj";
    }

    if (v === "uv" || v === "dy" || v === "sj") {
      return v;
    }

    localStorage.setItem("pchoice", "sj");
    return "sj";
  }

  window.resolveProxyPchoice = migrate;
  migrate();
})();
