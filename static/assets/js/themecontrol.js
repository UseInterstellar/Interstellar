document.addEventListener("DOMContentLoaded", function (event) {
  if (localStorage.getItem("Classic") === "on") {
    document.body.style.backgroundColor = "#111";
    document.body.style.color = "#ffffff";
    document.body.style.setProperty("--bg-c", "#111");
    document.getElementById("Themes").value = "Classic";
  } else if (localStorage.getItem("Ocean") === "on") {
    document.body.style.backgroundColor = "#162545";
    document.body.style.color = "#ffffff";
    document.body.style.setProperty("--bg-c", "#162545");
    document.getElementById("Themes").value = "Ocean";
  } else if (localStorage.getItem("Midnight") === "on") {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#ffffff";
    document.body.style.setProperty("--bg-c", "#000");
    document.getElementById("Themes").value = "Midnight";
  } else if (localStorage.getItem("Light") === "on") {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
    document.body.style.setProperty("--bg-c", "#fff");
    document.getElementById("Themes").value = "Light";
  }
});
