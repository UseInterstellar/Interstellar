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
      // Update the iframe src before redirecting the user
      document.querySelector("#iframeId").src = __uv$config.encodeUrl(url);
      // redirect the user to the widgetbot page
      location.href = "widgetbot.html";
    });
}
