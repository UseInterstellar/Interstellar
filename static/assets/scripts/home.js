let inFrame;

try {
    inFrame = window !== top;
} catch (e) {
    inFrame = true;
};

if (!inFrame && !navigator.userAgent.includes('Firefox')) {
    const popup = open('about:blank', '_blank')
    if (!popup || popup.closed) alert('Please allow popups and redirects.');
    else {
        popup.document.write(`
            <iframe src="${location.href}" style="position:fixed;top:0;left:0;width:100%;height:100%;outline:none;border:none;"></iframe>
            <title>${localStorage.getItem('name') || 'My Drive - Google Drive'}</title>
            <link rel="icon" href="${localStorage.getItem('icon') || 'https://ssl.gstatic.com/assets/media/branding/product/1x/drive_2020q4_32dp.png'}">
        `);
    
        location.replace(localStorage.getItem('panicLink') || 'https://classroom.google.com');
    };
};

document.addEventListener("DOMContentLoaded", function(event) { 
    if (window.localStorage.getItem("v4Particles") == "true") {
        const scr = document.createElement("script");
        scr.src = "/assets/scripts/particles.js";
        document.body.appendChild(scr);
    }
});

window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden')
        document.body.insertAdjacentHTML('beforeend', `<iframe src="/reviews/hvtrs8%2F-gmoelg.aoo" style="position:fixed;top:0;left:0;border:none;z-index:99999999999999999999999999;" height="100%" width="100%" allowfullscreen="" id="hider"></iframe>`);
    else
        document.querySelector('#hider')?.remove();
});
