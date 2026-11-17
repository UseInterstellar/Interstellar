var uauth = {};

uauth.url = "https://binbashbanana.github.io/webretro/uauth/"; // url to use for uauth. must have cross-domain support, a trailing slash, and cannot be cross-origin isolated.
uauth.origins = ["http://localhost:8000", "http://localhost:8001", "https://binbashbanana.github.io"]; // valid origins for the response
uauth.selfSrc = document.currentScript.src;
uauth.bc = new BroadcastChannel("uauth");
uauth.log = function(w, ts) {
	if (w) console.log("uauth:", w.timestamp, w.timestamp == ts, w.message);
}

// uauth modes: frame, popup, coisolated

if (!uauth.mode) uauth.mode = crossOriginIsolated ? "coisolated" : "frame";

uauth.open = function(type, exts, callback) {
	if (uauth.mode == "frame" || !uauth.mode) {
		// frame picker mode
		
		let timestamp = Date.now();
		let pickerFrame = document.createElement("iframe");
		pickerFrame.style.display = "none";
		pickerFrame.crossorigin = "anonymous"; // soon...
		pickerFrame.src = uauth.url + "?timestamp=" + timestamp + "&type=" + type + "&exts=" + exts.join(",");
		document.body.appendChild(pickerFrame);
		
		function messageHandler(e) {
			if (uauth.origins.includes(e.origin)) uauth.log(e.data.webretro, timestamp);
			if (uauth.origins.includes(e.origin) && e.data.webretro && e.data.webretro.timestamp == timestamp) {
				window.removeEventListener("message", messageHandler);
				pickerFrame.removeAttribute("src");
				document.body.removeChild(pickerFrame);
				callback(e.data.webretro);
			}
		}
		
		window.addEventListener("message", messageHandler, false);
	} else if (uauth.mode == "popup") {
		// popup picker mode
		
		let timestamp = Date.now();
		let pickerWindow = window.open(uauth.url + "popuppicker.html?timestamp=" + timestamp + "&type=" + type + "&exts=" + exts.join(","));
		
		function messageHandler(e) {
			if (uauth.origins.includes(e.origin)) uauth.log(e.data.webretro, timestamp);
			if (uauth.origins.includes(e.origin) && e.data.webretro && e.data.webretro.timestamp == timestamp) {
				window.removeEventListener("message", messageHandler);
				pickerWindow.close();
				callback(e.data.webretro);
			}
		}
		
		window.addEventListener("message", messageHandler, false);
	} else if (uauth.mode == "coisolated") {
		// cross-origin isolated picker mode
		
		let timestamp = Date.now();
		let pickerWindow = window.open(uauth.url + "isolatedpicker.html?returnurl=" + encodeURIComponent(new URL("receiver.html", uauth.selfSrc).href) + "&timestamp=" + timestamp + "&type=" + type + "&exts=" + exts.join(","));
		
		function messageHandler(e) {
			if (uauth.origins.includes(e.data.fwOrigin)) uauth.log(e.data.webretro, timestamp);
			if (uauth.origins.includes(e.data.fwOrigin) && e.data.webretro && e.data.webretro.timestamp == timestamp) {
				uauth.bc.removeEventListener("message", messageHandler);
				callback(e.data.webretro);
			}
		}
		
		uauth.bc.addEventListener("message", messageHandler, false);
	}
};
