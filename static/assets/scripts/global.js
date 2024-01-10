//Loads custom icons

document.addEventListener('DOMContentLoaded', function (event) {
  const icon = document.getElementById('dynamic-favicon')
  const name = document.getElementById('dynamic-title')
  var selectedValue = localStorage.getItem('selectedOption')
  if (selectedValue === 'Google') {
    icon.setAttribute('href', '/assets/media/favicon/google.png')
    name.textContent = 'Google'
    localStorage.setItem('name', 'Google')
    localStorage.setItem('icon', '/assets/media/favicon/google.png')
  } else if (selectedValue === 'Drive') {
    icon.setAttribute('href', '/assets/media/favicon/drive.png')
    name.textContent = 'My Drive - Google Drive'
    localStorage.setItem('name', 'My Drive - Google Drive')
    localStorage.setItem('icon', '/assets/media/favicon/drive.png')
  } else if (selectedValue === 'Classroom') {
    icon.setAttribute('href', '/assets/media/favicon/classroom.png')
    name.textContent = 'Home'
    localStorage.setItem('name', 'Home')
    localStorage.setItem('icon', '/assets/media/favicon/classroom.png')
  } else if (selectedValue === 'Schoology') {
    icon.setAttribute('href', '/assets/media/favicon/schoology.png')
    name.textContent = 'Home | Schoology'
    localStorage.setItem('name', 'Home | Schoology')
    localStorage.setItem('icon', '/assets/media/favicon/schoology.png')
  } else if (selectedValue === 'Gmail') {
    icon.setAttribute('href', '/assets/media/favicon/gmail.png')
    name.textContent = 'Gmail'
    localStorage.setItem('name', 'Gmail')
    localStorage.setItem('icon', '/assets/media/favicon/gmail.png')
  } else if (selectedValue === 'Clever') {
    icon.setAttribute('href', '/assets/media/favicon/clever.png')
    name.textContent = 'Clever | Portal'
    localStorage.setItem('name', 'Clever | Portal')
    localStorage.setItem('icon', '/assets/media/favicon/clever.png')
  } else if (selectedValue === 'Khan') {
    icon.setAttribute('href', '/assets/media/favicon/khan.png')
    name.textContent = 'Dashboard | Khan Academy'
    localStorage.setItem('name', 'Dashboard | Khan Academy')
    localStorage.setItem('icon', '/assets/media/favicon/khan.png')
  } else if (selectedValue === 'Campus') {
    icon.setAttribute('href', '/assets/media/favicon/campus.png')
    name.textContent = 'Infinite Campus'
    localStorage.setItem('name', 'Infinite Campus')
    localStorage.setItem('icon', '/assets/media/favicon/campus.png')
  } else if (selectedValue === 'IXL') {
    icon.setAttribute('href', '/assets/media/favicon/ixl.png')
    name.textContent = 'IXL | Dashboard'
    localStorage.setItem('name', 'IXL | Dashboard')
    localStorage.setItem('icon', '/assets/media/favicon/ixl.png')
  } else if (selectedValue === 'Canvas') {
    icon.setAttribute('href', '/assets/media/favicon/canvas.png')
    name.textContent = 'Dashboard'
    localStorage.setItem('name', 'Dashboard')
    localStorage.setItem('icon', '/assets/media/favicon/canvas.png')
  }

  var themeid = localStorage.getItem('theme')
  //Loads theme
  themeEle = document.createElement('link')
  themeEle.rel = 'stylesheet'
  if (themeid == 'b') {
    themeEle.href = '/assets/styles/themes/bannana.css'
  }
  if (themeid == 'bg') {
    themeEle.href = '/assets/styles/themes/blue-green.css'
  }
  if (themeid == 'cr') {
    themeEle.href = '/assets/styles/themes/cherryRed.css'
  }
  if (themeid == 'd') {
    themeEle.href = '/assets/styles/themes/dark.css'
  }
  if (themeid == 'fg') {
    themeEle.href = '/assets/styles/themes/forestGreen.css'
  }
  if (themeid == 'light') {
    themeEle.href = '/assets/styles/theme/solid/light.css'
  }
  if (themeid == 'm') {
    themeEle.href = '/assets/styles/themes/milkshake.css'
  }
  if (themeid == 'nb') {
    themeEle.href = '/assets/styles/themes/nightBlue.css'
  }
  if (themeid == 'rb') {
    themeEle.href = '/assets/styles/themes/red-black.css'
  }
  if (themeid == 'midnight') {
    themeEle.href = '/assets/styles/theme/solid/midnight.css'
  }
  if (themeid == 'black-red') {
    themeEle.href = '/assets/styles/theme/gradient/black-red.css'
  }
  if (themeid == 'black-blue') {
    themeEle.href = '/assets/styles/theme/gradient/black-blue.css'
  }
  if (themeid == 'black-green') {
    themeEle.href = '/assets/styles/theme/gradient/black-green.css'
  }
  if (themeid == 'red') {
    themeEle.href = '/assets/styles/theme/gradient/red.css'
  }
  if (themeid == 'purple') {
    themeEle.href = '/assets/styles/theme/gradient/purple.css'
  }
  if (themeid == 'black-orange') {
    themeEle.href = '/assets/styles/theme/gradient/black-orange.css'
  }
  if (themeid == 'ocean-blue') {
    themeEle.href = '/assets/styles/theme/solid/ocean-blue.css'
  }
  if (themeid == 'black-purple') {
    themeEle.href = '/assets/styles/theme/gradient/black-purple.css'
  }
  if (themeid == 'black-coral') {
    themeEle.href = '/assets/styles/theme/gradient/black-coral.css'
  }
  if (themeid == 'black-ruby') {
    themeEle.href = '/assets/styles/theme/gradient/black-ruby.css'
  }
  if (themeid == 'black-yellow') {
    themeEle.href = '/assets/styles/theme/gradient/black-yellow.css'
  }
  if (themeid == 'black-pink') {
    themeEle.href = '/assets/styles/theme/gradient/black-pink.css'
  }
  if (themeid == 'black-white') {
    themeEle.href = '/assets/styles/theme/gradient/black-white.css'
  }
  if (themeid == 'dark-purple') {
    themeEle.href = '/assets/styles/theme/gradient/dark-purple.css'
  }
  if (themeid == 'sunset') {
    themeEle.href = '/assets/styles/theme/gradient/sunset.css'
  }
  if (themeid == 'indigo') {
    themeEle.href = '/assets/styles/theme/gradient/indigo.css'
  }
  if (themeid == 'fire-ice') {
    themeEle.href = '/assets/styles/theme/gradient/fire-ice.css'
  }
  if (themeid == 'purple-blue') {
    themeEle.href = '/assets/styles/theme/gradient/purple-blue.css'
  }
  if (themeid == 'catppuccinMocha') {
    themeEle.href = '/assets/styles/theme/catppuccin/mocha.css'
  }
  if (themeid == 'catppuccinMacchiato') {
    themeEle.href = '/assets/styles/theme/catppuccin/macchiato.css'
  }
  if (themeid == 'catppuccinFrappe') {
    themeEle.href = '/assets/styles/theme/catppuccin/frappe.css'
  }
  if (themeid == 'catppuccinLatte') {
    themeEle.href = '/assets/styles/theme/catppuccin/latte.css'
  }
  document.body.appendChild(themeEle)
})

document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.getElementById('save-button')
  saveButton.addEventListener('click', function () {
    var backgroundInput = document.getElementById('background-input')
    var imageURL = backgroundInput.value

    if (imageURL !== '') {
      localStorage.setItem('backgroundImage', imageURL)
      document.body.style.backgroundImage = "url('" + imageURL + "')"
      backgroundInput.value = ''
    } else {
    }
  })

  var resetButton = document.getElementById('reset-button')
  resetButton.addEventListener('click', function () {
    localStorage.removeItem('backgroundImage')
    document.body.style.backgroundImage = "url('default-background.jpg')"
  })

  var savedBackgroundImage = localStorage.getItem('backgroundImage')
  if (savedBackgroundImage) {
    document.body.style.backgroundImage = "url('" + savedBackgroundImage + "')"
  }
})

document.addEventListener('DOMContentLoaded', function () {
  var savedBackgroundImage = localStorage.getItem('backgroundImage')
  if (savedBackgroundImage) {
    document.body.style.backgroundImage = "url('" + savedBackgroundImage + "')"
  }
})

var eventKey = localStorage.getItem('eventKey') || '`'
var panicLink = localStorage.getItem('panicLink') || 'https://classroom.google.com/'

document.addEventListener('keydown', function (event) {
  if (event.key === eventKey) {
    if (window.self !== window.top) {
      window.parent.location.href = panicLink
    } else {
      window.location.href = panicLink
    }
  }
})

var eventKeyInput = document.getElementById('eventKeyInput')
eventKeyInput.addEventListener('input', function () {
  eventKey = eventKeyInput.value
})

var linkInput = document.getElementById('linkInput')
linkInput.addEventListener('input', function () {
  panicLink = linkInput.value
})

function saveEventKey() {
  eventKey = eventKeyInput.value
  localStorage.setItem('eventKey', eventKey)
  localStorage.setItem('panicLink', panicLink)
}

// Retrieve selected option from localStorage and update the head section
const selectedOption = localStorage.getItem('selectedOption')
if (selectedOption) {
  updateHeadSection(selectedOption)
}
