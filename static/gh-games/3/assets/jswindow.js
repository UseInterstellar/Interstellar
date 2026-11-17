// creation args: title (string), icon(url string)
// open args: width, height, left, top (all are numbers)

function jswindow(args) {
	// specify options here
	var borderThickness = 2;
	var defaultWidth = 250;
	var defaultHeight = 150;
	var topClip = 0;
	var bottomClip = 24;
	var leftClip = 48;
	var rightClip = 24;
	
	// vWindow instead of this for event.target workaround
	var vWindow = this;
	
	function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
	function clipRight() { return parseInt(vWindow.outerWindow.style.width) + parseInt(vWindow.outerWindow.style.left) + (borderThickness * 2) > window.innerWidth; }
	function clipBottom() { return parseInt(vWindow.outerWindow.style.height) + parseInt(vWindow.outerWindow.style.top) + (borderThickness * 2) > window.innerHeight; }
	
	this.setTitle = function(text) {
		vWindow.outerWindow.bar.wname.textContent = text;
	}
	
	this.setIcon = function(url) {
		vWindow.outerWindow.bar.icon.style.backgroundImage = 'url("' + url + '")';
	}
	
	// open window with optional width and height (will otherwise be default) and distances from the top left (otherwise random)
	this.open = function(args) {
		vWindow.outerWindow.style.width = (args && args.width ? args.width + "px" : defaultWidth + "px");
		vWindow.outerWindow.style.height = (args && args.height ? args.height + "px" : defaultHeight + "px");
		vWindow.outerWindow.style.left = (args && args.left ? args.left + "px" : randInt(0, window.innerWidth - parseInt(vWindow.outerWindow.style.width)) + "px");
		vWindow.outerWindow.style.top = (args && args.top ? args.top + "px" : randInt(0, window.innerHeight - parseInt(vWindow.outerWindow.style.height)) + "px");
		vWindow.outerWindow.style.maxWidth = (window.innerWidth - (parseInt(vWindow.outerWindow.style.left) + (borderThickness * 2))) + "px";
		vWindow.outerWindow.style.maxHeight = (window.innerHeight - (parseInt(vWindow.outerWindow.style.top) + (borderThickness * 2))) + "px";
		document.body.appendChild(vWindow.outerWindow);
	}
	
	this.onclose = function() {}
	
	this.close = function() {
		vWindow.outerWindow.remove();
		vWindow.onclose();
	}
	
	// start constructor creation
	// make nodes
	vWindow.outerWindow = document.createElement("div");
	vWindow.outerWindow.classList.add("window");
	
	vWindow.outerWindow.bar = document.createElement("div");
	vWindow.outerWindow.bar.classList.add("windowbar");
	
	if (args && args.icon) {
		vWindow.outerWindow.bar.icon = document.createElement("span");
		vWindow.outerWindow.bar.icon.classList.add("windowicon");
		vWindow.outerWindow.bar.icon.style.backgroundImage = 'url("' + args.icon + '")';
		vWindow.outerWindow.bar.appendChild(vWindow.outerWindow.bar.icon);
	}
	
	vWindow.outerWindow.bar.wname = document.createElement("span");
	vWindow.outerWindow.bar.wname.appendChild(document.createTextNode(args && args.title ? args.title : ""));
	vWindow.outerWindow.bar.wname.classList.add("windowtitle");
	
	vWindow.outerWindow.bar.close = document.createElement("span");
	vWindow.outerWindow.bar.close.appendChild(document.createTextNode(String.fromCharCode(10006)));
	vWindow.outerWindow.bar.close.classList.add("windowclose");
	vWindow.outerWindow.bar.close.title = "Close";
	vWindow.outerWindow.bar.close.onclick = vWindow.close;
	
	vWindow.innerWindow = document.createElement("div");
	vWindow.innerWindow.classList.add("windowcontent");
	
	// icon already appended if specified
	vWindow.outerWindow.bar.appendChild(vWindow.outerWindow.bar.wname);
	vWindow.outerWindow.bar.appendChild(vWindow.outerWindow.bar.close);
	vWindow.outerWindow.appendChild(vWindow.outerWindow.bar);
	vWindow.outerWindow.appendChild(vWindow.innerWindow);
	
	// move window to front
	vWindow.outerWindow.addEventListener("mousedown", function(e) {
		var allwindows = Array.from(document.querySelectorAll("div.window"));
		if ((allwindows.indexOf(vWindow.outerWindow) != (allwindows.length - 1)) && e.target != vWindow.outerWindow.bar.close) document.body.appendChild(vWindow.outerWindow);
	}, false);
	
	// move window around
	var oldcursorX, oldcursorY;
	vWindow.outerWindow.bar.addEventListener("mousedown", function(e) {
		if ((e.target != vWindow.outerWindow.bar.close) && (e.button == 0)) {
			e.preventDefault();
			oldcursorX = e.clientX;
			oldcursorY = e.clientY;
			document.addEventListener("mousemove", windowDrag, false);
			document.addEventListener("mouseup", windowDragEnd, false);
		}
	}, false);
	
	function windowDrag(e) {
		e.preventDefault();
		vWindow.outerWindow.style.left = (vWindow.outerWindow.offsetLeft - (oldcursorX - e.clientX)) + "px";
		oldcursorX = e.clientX;
		vWindow.outerWindow.style.top = (vWindow.outerWindow.offsetTop - (oldcursorY - e.clientY)) + "px";
		oldcursorY = e.clientY;
	}
	
	// pop window back into view area, and set max dimensions if it's not clipping into bottom right
	function windowDragEnd() {
		document.removeEventListener("mousemove", windowDrag);
		document.removeEventListener("mouseup", windowDragEnd);
		vWindow.outerWindow.style.left = Math.min(Math.max(vWindow.outerWindow.offsetLeft, 0 - parseInt(vWindow.outerWindow.style.width) + leftClip), window.innerWidth - rightClip) + "px";
		vWindow.outerWindow.style.top = Math.min(Math.max(vWindow.outerWindow.offsetTop, topClip), window.innerHeight - bottomClip) + "px";
		if (!clipRight()) vWindow.outerWindow.style.maxWidth = (window.innerWidth - (parseInt(vWindow.outerWindow.style.left) + (borderThickness * 2))) + "px";
		if (!clipBottom()) vWindow.outerWindow.style.maxHeight = (window.innerHeight - (parseInt(vWindow.outerWindow.style.top) + (borderThickness * 2))) + "px";
	}
	// end constructor creation
}