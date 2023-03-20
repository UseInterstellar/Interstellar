let inFrame
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }

if (!inFrame && !navigator.userAgent.includes("Firefox")) 
    const popup = open("about:blank", "_blank")
    if (!popup || popup.closed) {
        alert("Allow popups and redirects to hide this from showing up in your history.")
    } else 


var redirectSite = "https://www.google.com";

{
    var tab = window.open('about:blank', '_blank');
    tab.document.documentElement.innerHTML = '<!DOCTYPE html><html><head><title>' + 'Interstellar' + '</title><link rel="icon" type="image/png" href="' + window.location.origin + "/favicon.ico" + '"><style>body {margin:0;overflow:hidden}</style></head><body><iframe width="100%" height="100%" src="' + window.location.origin + frameUrl + '" frameborder="0"></iframe></body></html>';
    tab.document.close();
    window.location.replace(redirectSite);
}