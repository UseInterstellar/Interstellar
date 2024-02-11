function styledLog(message, style) {
  console.log(`%c${message}`, style)
}

// Credits to @xbubbo and @xderpman on Discord
// You can use this code with proper credits.

var adjustmentCompleted = false
var attempts = 0

function adjustElements() {
  if (adjustmentCompleted) {
    console.log('%cNow.GG Adjustment already completed. Stopping script.', 'font-size: 15px; color: green;')
    return true
  }

  var iframe = top.document.getElementById('ifra')

  if (iframe) {
    var innerDoc = iframe.contentWindow.document

    var roblox = innerDoc.getElementById('js-game-video')
    var controlBar = innerDoc.getElementById('ng-control-bar')

    if (roblox && controlBar) {
      roblox.style.top = '415px'
      controlBar.style.top = '91%'
      console.log('%cSuccessfully adjusted Now.GG.', 'font-size: 15px; color: green;')

      adjust()

      return true
    } else {
      console.log('%cFailed to find elements (roblox or controlBar).', 'font-size: 15px; color: red;')
      return false
    }
  } else {
    console.log('%cFailed to find iframe with the specified ID.', 'font-size: 15px; color: red;')
    return false
  }
}

function CheckAndAdjust() {
  var intervalId = setInterval(function () {
    attempts++
    if (adjustElements()) {
      clearInterval(intervalId)
    } else if (attempts >= 30) {
      console.log(
        '%cNow.GG Script ran 30 times without finding elements. Stopping script.',
        'font-size: 15px; color: red;'
      )
      clearInterval(intervalId)
    }
  }, 5000)
}

function adjust() {
  setInterval(function () {
    var iframe = top.document.getElementById('ifra')

    if (iframe) {
      var innerDoc = iframe.contentWindow.document

      var roblox = innerDoc.getElementById('js-game-video')
      var controlBar = innerDoc.getElementById('ng-control-bar')
      var customClassElement = innerDoc.querySelector('.sc-rUGft.hLgqJJ')

      if (roblox) {
        checkAndAdjustStyles(roblox, 'top', ['415px'])
      }

      if (controlBar) {
        checkAndAdjustStyles(controlBar, 'top', ['91%'])
      }

      if (customClassElement) {
        customClassElement.remove()
        console.log('%cRemoved class "sc-rUGft hLgqJJ".', 'font-size: 15px; color: green;')
      }
    } else {
      console.log('%cFailed to find iframe with the specified ID.', 'font-size: 15px; color: red;')
    }
  }, 3000)
}

function checkAndAdjustStyles(element, property, targetValues) {
  if (element) {
    var currentStyle = window.getComputedStyle(element)[property]

    if (!targetValues.includes(currentStyle)) {
      element.style[property] = targetValues[0]
      console.log(`%cAdjusted ${property} to ${targetValues[0]}.`, 'font-size: 15px; color: green;')
    }
  } else {
    console.log('%cElement is null. Skipping check and adjustment.', 'font-size: 15px; color: red;')
  }
}

CheckAndAdjust()
console.log('%cNow.GG Adjustment script started. Checking every 5 seconds.', 'font-size: 15px; color: blue;')
