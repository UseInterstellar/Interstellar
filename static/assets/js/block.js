(function () {
  const REASONS = {
    families: "Cloudflare Families blocks this site for malware or adult content.",
    ads: "This site is on the AdGuard ad filter.",
    trackers: "This site is on the AdGuard tracking filter.",
    blocklist: "This instance's blocklist includes this site.",
  };

  function fill() {
    const hash = decodeURIComponent(location.hash.slice(1));
    const split = hash.indexOf("|");
    const source = split === -1 ? "" : hash.slice(0, split);
    let host = split === -1 ? "" : hash.slice(split + 1);
    try {
      host = new URL(host).hostname || host;
    } catch {}

    const paragraphs = document.querySelectorAll("main p");
    if (paragraphs.length < 2) return;
    paragraphs[0].textContent = `${host || "This site"} cannot be opened on this Interstellar instance.`;
    paragraphs[1].textContent = REASONS[source] ?? "This site is blocked on this instance.";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fill);
  } else {
    fill();
  }
  window.addEventListener("hashchange", fill);
})();
