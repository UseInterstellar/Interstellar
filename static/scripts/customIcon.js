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
    if(themeid == "l") {
        themeEle.href = "/css/themes/light.css";
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
    if(themeid == "s") {
        themeEle.href = "/css/themes/sunset.css";
    }
    document.body.appendChild(themeEle);
});

