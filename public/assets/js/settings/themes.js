document.getElementById("Themes").onchange = function()
{
  if(this.value === "classic") {
  localStorage.setItem('classic', 'on');
	document.body.style.backgroundColor = "#111";
	document.body.style.color = "#ffffff";
	document.body.style.setProperty('--bg-c', "#111");
	localStorage.setItem('Ocean', 'off');
	window.localStorage.removeItem('Midnight');
	window.localStorage.setItem('Ocean', 'off');
	window.localStorage.removeItem('Ocean');
}
    if(this.value === "ocean") {
  localStorage.setItem('ocean', 'on');
	document.body.style.backgroundColor = "#162545";
	document.body.style.color = "#ffffff";
	document.body.style.setProperty('--bg-c', "#162545");
	localStorage.setItem('classic', 'off');
	window.localStorage.removeItem('classic');
	window.localStorage.setItem('lava', 'off');
	window.localStorage.removeItem('lava');
}
  if(this.value === "midnight") {
  localStorage.setItem('midnight', 'on');
	document.body.style.backgroundColor = "#000";
	document.body.style.color = "#ffffff";
	document.body.style.setProperty('--bg-c', "#000");
	localStorage.setItem('classic', 'off');
	window.localStorage.removeItem('classic');
	window.localStorage.setItem('lava', 'off');
	window.localStorage.removeItem('lava');
  }
    };
