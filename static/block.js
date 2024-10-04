function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function checkBlocked() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'blocked.txt', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var blocked = JSON.parse(xhr.responseText);
            var workCookie = getCookie('work');
            if (blocked[workCookie]) {
                window.location.href = 'https://www.bing.com';
            } else {
                var lastVisited = new Date().toISOString();
                setCookie('work', workCookie || Math.random().toString(36).substring(2), 7);
                saveCookieData(workCookie, lastVisited);
            }
        }
    };
    xhr.send();
}

function saveCookieData(cookie, lastVisited) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_cookie.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('cookie=' + encodeURIComponent(cookie) + '&last_visited=' + encodeURIComponent(lastVisited));
}

checkBlocked();
