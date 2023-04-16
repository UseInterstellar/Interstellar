var gaenabled = window.localStorage.getItem("ga");
if (gaenabled == "false") {
  script("Skipped GA injection because it is disabled by the user.");
} else {
  const gascript = document.createElement("script");
  gascript.setAttribute("async", "");
  gascript.setAttribute(
    "src",
    "https://www.googletagmanager.com/gtag/js?id=G-WKJQ5QHQTJ"
  );
  const inlinegascript = document.createElement("script");
  inlinegascript.innerHTML = `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WKJQ5QHQTJ');`;
  document.head.append(gascript, inlinegascript);
  console.log("Injected script 1/2");
}
