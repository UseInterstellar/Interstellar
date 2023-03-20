
let inFrame

try {
    inFrame = window !== top
} catch (e) {
    inFrame = true
}

if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = open("about:blank", "_blank")
    if (!popup || popup.closed) {
        alert("Allow popups and redirects to hide this from showing up in your history.")
    } else {
        const doc = popup.document
        const iframe = doc.createElement("iframe")
        const style = iframe.style
        const link = doc.createElement("link")

        doc.title = "My Drive - Google Drive"
        link.rel = "icon";
        link.href = "/assets/images/misc/gd.png";
        iframe.src = location.href
        style.position = "fixed"
        style.top = style.bottom = style.left = style.right = 0
        style.border = style.outline = "none"
        style.width = style.height = "100%"

        doc.body.appendChild(iframe)
        location.replace("https://google.com")
    }
}

function clockTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClock").innerText = time;
    document.getElementById("MyClock").textContent = time;
    
    setTimeout(clockTime, 1000);
    
};

