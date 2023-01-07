  window.navigator.serviceWorker
    .register("./sw.js?userkey=" + userKey, {
      scope: __uv$config.prefix,
    })
    .then(() => {
    //Service worker is registered, do ur href thingy here.

});