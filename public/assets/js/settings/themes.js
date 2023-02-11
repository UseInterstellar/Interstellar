document.getElementById("Themes").onchange = function()
{
    if(this.value === "Midnight") {
  localStorage.setItem('midnight', 'on');
	document.body.style.backgroundColor = "#162545";
	document.body.style.color = "#ffffff";
	document.body.style.setProperty('--bg-c', "#162545");
	localStorage.setItem('classic', 'off');
	window.localStorage.removeItem('classic');
	window.localStorage.setItem('lava', 'off');
	window.localStorage.removeItem('lava');
}
  if(this.value === "Midnight") {
  localStorage.setItem('midnight', 'on');
	document.body.style.backgroundColor = "#162545";
	document.body.style.color = "#ffffff";
	document.body.style.setProperty('--bg-c', "#162545");
	localStorage.setItem('classic', 'off');
	window.localStorage.removeItem('classic');
	window.localStorage.setItem('lava', 'off');
	window.localStorage.removeItem('lava');
  }
    };