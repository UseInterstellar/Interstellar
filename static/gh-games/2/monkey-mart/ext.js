setTimeout(function(){
    document.getElementById("popupPlay").style.display = "none";
}, 6000);
function hiddenPopup(){
    document.getElementById("popupPlay").style.display = "none";
}

document.getElementById("popupPlay").addEventListener("click", hiddenPopup);
