document.addEventListener("DOMContentLoaded", function(event) { 
    if(window.localStorage.getItem("v4Particles") == "true") {
      const scr = document.createElement("script");
      scr.src="/scripts/particles.js";
      document.body.appendChild(scr);
    }
  });