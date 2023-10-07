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