document.body.classList.add("classic")
function midnight() {
	window.localStorage.setItem('midnight', 'on');
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
	document.body.style.backgroundColor = "#282834"
	document.body.style.color = "#ffffff"
	document.body.style.setProperty('--bg-c', "#282834");
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

	else if (window.localStorage.getItem('lava') == "on") {
		document.body.classList.add("lava")
	}
	else if (window.localStorage.getItem('retro') == "on") {
		document.body.classList.add("retro")
	}
}