document.body.classList.add("classic");


function blank3(){
    let inFrame
    
    try {
        inFrame = window !== top
    } catch (e) {
        inFrame = true
    }
    
    if (!inFrame && !navigator.userAgent.includes("Firefox")) {
        const popup = open("about:blank", "_blank")
        if (!popup || popup.closed) {
            alert("Popups are disabled!")
        } else {
            const doc = popup.document
            const iframe = doc.createElement("iframe")
            const style = iframe.style
            const link = doc.createElement("link")
    
            doc.title = "loading..."
            link.rel = "icon";
            link.href = "";
            iframe.src = location.href
            style.position = "fixed"
            style.top = style.bottom = style.left = style.right = 0
            style.border = style.outline = "none"
            style.width = style.height = "100%"
    
            doc.body.appendChild(iframe)
            //location.replace("https://google.com")
        }
    }}

const element = document.getElementById("tabcloak");
element.addEventListener("click", function() {
	blank3();
		document.getElementById("tabcloak").innerHTML = "Tab opened in about:blank!";
  });
function midnight() {
	localStorage.setItem('midnight', 'on');
	document.body.style.backgroundColor = "#162545"
	document.body.style.color = "#ffffff"
	document.body.style.setProperty('--bg-c', "#162545");
	localStorage.setItem('classic', 'off');
	window.localStorage.removeItem('classic');
	window.localStorage.setItem('lava', 'off')
	window.localStorage.removeItem('lava')
}
function lava() {
	window.localStorage.setItem('lava', 'on')
	document.body.style.backgroundColor = "#fb4509"
	document.body.style.color = "#000000"
	localStorage.setItem('classic', 'off');
	window.localStorage.removeItem('classic');
	window.localStorage.setItem('midnight', 'off')
	window.localStorage.removeItem('midnight')
}
function classic() {
	window.localStorage.setItem('classic', 'on')
	document.body.style.backgroundColor = "#000"
	document.body.style.color = "#ffffff"
	document.body.style.setProperty('--bg-c', "#000");
	window.localStorage.setItem('midnight', 'off')
	window.localStorage.removeItem('midnight')
	window.localStorage.setItem('lava', 'off')
	window.localStorage.removeItem('lava')
}
function retro() {
	window.localStorage.setItem('retro', 'on')
	document.body.style.backgroundColor = "#000000"
	document.body.style.color = "#14c832"
	window.localStorage.setItem('midnight', 'off')
	window.localStorage.removeItem('midnight')
	window.localStorage.setItem('lava', 'off')
	window.localStorage.removeItem('lava')
	window.localStorage.setItem('classic', 'off')
	window.localStorage.removeItem('classic')
}
function checkTheme() {
	if (window.localStorage.getItem('classic') == "on") {
		document.body.classList.add("classic")
	}

	else if (window.localStorage.getItem('midnight') == "on") {
		document.body.classList.add("midnight")
	}

	else if (window.localStorage.getItem('classic') == "on") {
		document.body.classList.add("classic")
	}
	else if (window.localStorage.getItem('retro') == "on") {
		document.body.classList.add("retro")
	}
}