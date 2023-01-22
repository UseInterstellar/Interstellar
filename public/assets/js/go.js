function go(value) {
  console.log("go() called with value: ", value);
  let iframe = document.querySelector(".iframe.active");
  window.navigator.serviceWorker
    .register("./sw.js", {
      scope: __uv$config.prefix,
    })
    .then(() => {
      let url = value.trim();
      if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "https://" + url;
      document.querySelector("#iframeid").src = __uv$config.encodeUrl(url);
      location.href = "widgetbot.html";
    });
}
