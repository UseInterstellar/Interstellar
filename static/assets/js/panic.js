var eventKey = localStorage.getItem("eventKey") || "`";

document.addEventListener("keydown", function(event) {
  if (event.key === eventKey) {
    if (window.self !== window.top) {
      window.parent.location.href = "https://classroom.google.com/";
    } else {
      window.location.href = "https://classroom.google.com/";
    }
  }
});

var inputField = document.getElementById("eventKeyInput");
inputField.addEventListener("input", function() {
  eventKey = inputField.value;
});

function saveEventKey() {
  localStorage.setItem("eventKey", eventKey);
  alert("Event key saved!");
}
