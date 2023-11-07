//Loads custom icons

document.addEventListener("DOMContentLoaded", function(event) { 
  const icon = document.getElementById('dynamic-favicon');
  const name = document.getElementById('dynamic-title');
  var selectedValue = localStorage.getItem("selectedOption");
  if (selectedValue === 'Google') {
      icon.setAttribute('href', '/images/favicon/google.png');
      name.textContent = 'Google';
      localStorage.setItem("name", "Google");
      localStorage.setItem("icon", "/images/favicon/google.png");
  } 
  else if (selectedValue === 'Drive') {
      icon.setAttribute('href', '/images/favicon/drive.png');
      name.textContent = 'My Drive - Google Drive';
      localStorage.setItem("name", "My Drive - Google Drive");
      localStorage.setItem("icon", "/images/favicon/drive.png");
  } 
  else if (selectedValue === 'Classroom') {
      icon.setAttribute('href', '/images/favicon/classroom.png');
      name.textContent = 'Classes';
      localStorage.setItem("name", "Classes");
      localStorage.setItem("icon", "/images/favicon/classroom.png");
  }
  else if (selectedValue === 'Schoology') {
      icon.setAttribute('href', '/images/favicon/schoology.png');
      name.textContent = 'Home | Schoology';
      localStorage.setItem("name", "Home | Schoology");
      localStorage.setItem("icon", "/images/favicon/schoology.png");
  }
  else if (selectedValue === 'Gmail') {
      icon.setAttribute('href', '/images/favicon/gmail.png');
      name.textContent = 'Gmail';
      localStorage.setItem("name", "Gmail");
      localStorage.setItem("icon", "/images/favicon/gmail.png");
  }
  else if (selectedValue === 'Clever') {
      icon.setAttribute('href', '/images/favicon/clever.png');
      name.textContent = 'Clever | Portal';
      localStorage.setItem("name", "Clever | Portal");
      localStorage.setItem("icon", "/images/favicon/clever.png");
  }
  else if (selectedValue === 'Khan') {
      icon.setAttribute('href', '/images/favicon/khan.png');
      name.textContent = 'Dashboard | Khan Academy';
      localStorage.setItem("name", "Dashboard | Khan Academy");
      localStorage.setItem("icon", "/images/favicon/khan.png");
  }
  var themeid = localStorage.getItem("theme");
  //Loads theme
  themeEle = document.createElement("link");
  themeEle.rel="stylesheet";
  if(themeid == "b") {
      themeEle.href = "/css/themes/bannana.css";
  }
  if(themeid == "bg") {
      themeEle.href = "/css/themes/blue-green.css";
  }
  if(themeid == "cr") {
      themeEle.href = "/css/themes/cherryRed.css";
  }
  if(themeid == "d") {
      themeEle.href = "/css/themes/dark.css";
  }
  if(themeid == "fg") {
      themeEle.href = "/css/themes/forestGreen.css";
  }
  if(themeid == "light") {
      themeEle.href = "/css/theme/solid/light.css";
  }
  if(themeid == "m") {
      themeEle.href = "/css/themes/milkshake.css";
  }
  if(themeid == "nb") {
      themeEle.href = "/css/themes/nightBlue.css";
  }
  if(themeid == "rb") {
      themeEle.href = "/css/themes/red-black.css";
  }
  if(themeid == "v4") {
      themeEle.href = "/css/theme/solid/legacy.css";
  }
  if(themeid == "midnight") {
    themeEle.href = "/css/theme/solid/midnight.css";
  }
  if(themeid == "black-red") {
    themeEle.href = "/css/theme/gradient/black-red.css";
  }
  if(themeid == "black-blue") {
    themeEle.href = "/css/theme/gradient/black-blue.css";
  }
  if(themeid == "black-green") {
    themeEle.href = "/css/theme/gradient/black-green.css";
  }
  if(themeid == "red") {
    themeEle.href = "/css/theme/gradient/red.css";
  } 
  if(themeid == "purple") {
    themeEle.href = "/css/theme/gradient/purple.css";
  }
  if(themeid == "black-orange") {
    themeEle.href = "/css/theme/gradient/black-orange.css";
  }
  if(themeid == "ocean-blue") {
    themeEle.href = "/css/theme/solid/ocean-blue.css";
  }
  if(themeid == "black-purple") {
    themeEle.href = "/css/theme/gradient/black-purple.css";
  }
  if(themeid == "black-coral") {
    themeEle.href = "/css/theme/gradient/black-coral.css";
  }
  if(themeid == "black-ruby") {
    themeEle.href = "/css/theme/gradient/black-ruby.css";
  }
  if(themeid == "black-yellow") {
    themeEle.href = "/css/theme/gradient/black-yellow.css";
  }
  if(themeid == "black-pink") {
    themeEle.href = "/css/theme/gradient/black-pink.css";
  }
  if(themeid == "black-white") {
    themeEle.href = "/css/theme/gradient/black-white.css";
  }
  if(themeid == "dark-purple") {
    themeEle.href = "/css/theme/gradient/dark-purple.css";
  }
  if(themeid == "sunset") {
    themeEle.href = "/css/theme/gradient/sunset.css";
  }
  if(themeid == "indigo") {
    themeEle.href = "/css/theme/gradient/indigo.css";
  }
  if(themeid == "fire-ice") {
    themeEle.href = "/css/theme/gradient/fire-ice.css";
  }
  if(themeid == "purple-blue") {
    themeEle.href = "/css/theme/gradient/purple-blue.css";
  }
  document.body.appendChild(themeEle);
});

document.addEventListener("DOMContentLoaded", function() {
  var saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", function() {
    var backgroundInput = document.getElementById("background-input");
    var imageURL = backgroundInput.value;

    if (imageURL !== "") {
      localStorage.setItem("backgroundImage", imageURL);
      document.body.style.backgroundImage = "url('" + imageURL + "')";
      backgroundInput.value = "";
    } else {

    }
  });

  var resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", function() {
    localStorage.removeItem("backgroundImage");
    document.body.style.backgroundImage = "url('default-background.jpg')";
  });

  var savedBackgroundImage = localStorage.getItem("backgroundImage");
  if (savedBackgroundImage) {
    document.body.style.backgroundImage = "url('" + savedBackgroundImage + "')";
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var savedBackgroundImage = localStorage.getItem("backgroundImage");
  if (savedBackgroundImage) {
    document.body.style.backgroundImage = "url('" + savedBackgroundImage + "')";
  }
});

var eventKey = localStorage.getItem("eventKey") || "`";
var panicLink = localStorage.getItem("panicLink") || "https://classroom.google.com/";

document.addEventListener("keydown", function(event) {
  if (event.key === eventKey) {
    if (window.self !== window.top) {
      window.parent.location.href = panicLink;
    } else {
      window.location.href = panicLink;
    }
  }
});

var eventKeyInput = document.getElementById("eventKeyInput");
eventKeyInput.addEventListener("input", function() {
  eventKey = eventKeyInput.value;
});

var linkInput = document.getElementById("linkInput");
linkInput.addEventListener("input", function() {
  panicLink = linkInput.value;
});

function saveEventKey() {
  eventKey = eventKeyInput.value;
  localStorage.setItem("eventKey", eventKey);
  localStorage.setItem("panicLink", panicLink);
}

// Retrieve selected option from localStorage and update the head section
const selectedOption = localStorage.getItem('selectedOption');
if (selectedOption) {
    updateHeadSection(selectedOption);
}

