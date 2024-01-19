function styledLog(message, style) {
    console.log(`%c${message}`, style);
}

function runTopLogs() {
    console.log('%cdiscord.gg/interstellar', 'font-weight: bold; font-size: 39px; color: red; text-shadow: 3px 3px 0 rgb(217,31,38), 6px 6px 0 rgb(226,91,14), 9px 9px 0 rgb(245,221,8), 12px 12px 0 rgb(5,148,68), 15px 15px 0 rgb(2,135,206), 18px 18px 0 rgb(4,77,145), 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%;');
    console.log('%cCredits to @xbubbo and @xderpman on Discord.', 'font-weight: bold; font-size: 20px; color: blue;');
    console.log('%cYou can use this code with proper credits.', 'font-weight: bold; font-size: 20px; color: purple;');
}

var adjustmentCompleted = false;
var attempts = 0;

function adjustElements() {
    if (adjustmentCompleted) {
        console.log('%cNow.GG Adjustment already completed. Stopping script.', 'font-size: 30px; color: green;');
        return true;
    }

    var iframe = top.document.getElementById('iframeId');

    if (iframe) {
        var innerDoc = iframe.contentWindow.document;

        var roblox = innerDoc.getElementById('js-game-video');
        var controlBar = innerDoc.getElementById('ng-control-bar');

        if (roblox && controlBar) {
            roblox.style.top = '295px';
            controlBar.style.top = '90%';
            console.log('%cSuccessfully adjusted Now.GG.', 'font-size: 30px; color: green;');

            adjustmentCompleted = true;

            return true;
        } else {
            console.log('%cFailed to find elements (roblox or controlBar).', 'font-size: 15px; color: red;');
            return false;
        }
    } else {
        console.log('%cFailed to find iframe with the specified ID.', 'font-size: 15px; color: red;');
        return false;
    }
}

function checkAndAdjust() {
    var intervalId = setInterval(function () {
        runTopLogs();
        attempts++;
        if (adjustElements()) {
            clearInterval(intervalId);
        } else if (attempts >= 5) {
            console.log('%cNow.GG Script ran 5 times without finding elements. Stopping script.', 'font-size: 15px; color: red;');
            clearInterval(intervalId);
        }
    }, 7000);
}

checkAndAdjust();
console.log('%cNow.GG Adjustment script started. Checking every 7 seconds.', 'font-size: 15px; color: blue;');
