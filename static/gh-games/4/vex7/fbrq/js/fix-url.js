function fbrqUrlCheck(url) {
	if (typeof url === 'string' || url instanceof String) {
		return true;
	} else {
		return false;
	}
}

function fbrqFixUrl(url) {
	url= url.replace("https://cdn.fbrq.io/@orange-games/splash/assets/spine/", "kizi/");
	url= url.replace("https://cdn.fbrq.io/@orange-games/splash/assets/images/", "kizi/");	
	
	url= url.replace("https://cdn.fbrq.io/@azerion/splash/assets/images/", "");
	
	url= url.replace("https://cdn.fbrq.io/@orange-games/splash/assets/json/", "json/null.json?");		
	
	console.log("fx--fbrqFixUrl--", url);
	return url;
}

// loadFile: if (fbrqUrlCheck(t.url)) fbrqFixUrl(t.url);
// "https://cdn.fbrq.io/@azerion/splash/assets/" => "./fbrq/"
