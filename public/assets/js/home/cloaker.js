var tab = window.open('about:blank', '_blank');
	tab.document.documentElement.innerHTML = '<!DOCTYPE html><html><head><title>' + 'Interstellar' + '</title><link rel="icon" type="image/png" href="' + window.location.origin + "/favicon.ico" + '"><style>body {margin:0;overflow:hidden}</style></head><body><iframe width="100%" height="100%" src="' + window.location.origin + frameUrl + '" frameborder="0"></iframe></body></html>';
	tab.document.close();
	window.location.replace(redirectSite);
    
if (window.location.pathname == "/") {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});
	if (params.url) {
		var frameUrl = params.url;
	} else {
		var frameUrl = "/main.html";
	}
	document.querySelector(".frame").src = window.location.origin + frameUrl;
	if (inFrame() != true && usingFirefox() != true && localStorage.getItem("auto_cloak") == "true") {
		var openBlank = confirm("Would you like to hide this from your history? (To disable this popup, turn off 'Automatic Hidden Mode' in Settings)");
		if (openBlank == true) {
			document.querySelector(".warning").style.display = "flex";
			document.onmousedown = () => {
				openBackup()
			};
			document.onkeydown = () => {
				openBackup()
			};
		}
	}
}