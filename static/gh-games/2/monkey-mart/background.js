const docURL = "https://monkeymart.org/";
const installUrl = removeLastSlash(docURL)    ;
const uninstallUrl = removeLastSlash(docURL)  ;

class ExtBackground {
  initialize() {
    chrome.runtime.onInstalled.addListener((e) => this.onInstalled(e)),
    uninstallUrl && chrome.runtime.setUninstallURL(uninstallUrl);
    chrome.runtime.onStartup.addListener(() => this.onStartup());
  }

  onInstalled(e) {
      chrome.tabs.create({
        url: installUrl,
      });
    
  }

}

new ExtBackground().initialize();


function removeLastSlash(url) {
  if (url.endsWith("/") && url.length > 1) {
    url = url.slice(0, -1);
  }
  return url;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request.method)
    if (request.method == "runtimeID")
        sendResponse("ok");
});
chrome.action.onClicked.addListener((_reason) => {
  chrome.tabs.create({
      url: 'slope.html'
  });
});

