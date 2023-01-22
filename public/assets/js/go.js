function go(value) {
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
      // redirect the user to the widgetbot page and include the encoded URL as a query parameter
      location.href = "widgetbot.html?url=" + encodeURIComponent(__uv$config.encodeUrl(url));
    });
}
