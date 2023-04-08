document.addEventListener("keydown", function(event) {
  if (event.key === "`") {
    if (window.self !== window.top) { 
      window.parent.location.href = "https://classroom.google.com/";
    } else {
      window.location.href = "https://classroom.google.com/"; 
    }
  }
});
