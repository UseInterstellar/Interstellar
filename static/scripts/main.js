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

// Dropdown event listener
const dropdown = document.getElementById('dropdown');
dropdown.addEventListener('change', function() {
    const selectedValue = dropdown.value;
    updateHeadSection(selectedValue);
    
    // Save selected option to localStorage
    localStorage.setItem('selectedOption', selectedValue);
});
