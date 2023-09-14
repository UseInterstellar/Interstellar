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
