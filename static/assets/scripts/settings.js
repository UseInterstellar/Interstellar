// Key
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

// Tab Cloaker
function saveName() {
  const name = document.getElementById('name').value
  localStorage.setItem('name', name)
}

function saveIcon() {
  const icon = document.getElementById('icon').value
  localStorage.setItem('icon', icon)
}

// Function to update favicon and title based on selected option
function updateHeadSection(selectedValue) {
  const icon = document.getElementById('dynamic-favicon')
  const name = document.getElementById('dynamic-title')

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
  }
}

// Redirect
function handleDropdownChange(selectElement) {
  var selectedValue = selectElement.value
  redirectToMainDomain(selectedValue)
}

function redirectToMainDomain(selectedValue) {
  var currentUrl = window.location.href
  var mainDomainUrl = currentUrl.replace(/\/[^\/]*$/, '')

  if (window != top) {
    top.location.href = mainDomainUrl
  } else {
    window.location.href = mainDomainUrl
  }
}

// Dropdown event listener
const dropdown = document.getElementById('dropdown')
dropdown.addEventListener('change', function () {
  const selectedValue = dropdown.value
  updateHeadSection(selectedValue)

  // Save selected option to localStorage
  localStorage.setItem('selectedOption', selectedValue)
})

const switches = document.getElementById('2')

if (window.localStorage.getItem('v4Particles') != '') {
  if (window.localStorage.getItem('v4Particles') == 'true') {
    switches.checked = true
  } else {
    switches.checked = false
  }
}

switches.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    window.localStorage.setItem('v4Particles', 'true')
  } else {
    window.localStorage.setItem('v4Particles', 'false')
  }
})

var themeId = localStorage.getItem('theme')
if (themeId == '') {
  themeId = 'd'
}

document.getElementsByClassName('td')[0].value = themeId

const themeDropdown = document.getElementsByClassName('td')
dropdown.addEventListener('change', function () {
  const selectedValue = dropdown.value

  localStorage.setItem('theme', selectedValue)

  window.location = window.location
})

function themeChange(ele) {
  const selTheme = ele.value

  localStorage.setItem('theme', selTheme)

  window.location = window.location
}

function AB() {
  let inFrame

  try {
    inFrame = window !== top
  } catch (e) {
    inFrame = true
  }

  if (!inFrame && !navigator.userAgent.includes('Firefox')) {
    const popup = open('about:blank', '_blank')
    if (!popup || popup.closed) {
      alert('Please allow popups and redirects.')
    } else {
      const doc = popup.document
      const iframe = doc.createElement('iframe')
      const style = iframe.style
      const link = doc.createElement('link')
      const name = localStorage.getItem('name') || 'My Drive - Google Drive'
      const icon =
        localStorage.getItem('icon') || 'https://ssl.gstatic.com/assets/media/branding/product/1x/drive_2020q4_32dp.png'
      doc.title = name
      link.rel = 'icon'
      link.href = icon
      iframe.src = location.href
      style.position = 'fixed'
      style.top = style.bottom = style.left = style.right = 0
      style.border = style.outline = 'none'
      style.width = style.height = '100%'
      doc.head.appendChild(link)
      doc.body.appendChild(iframe)
      location.replace('https://classroom.google.com')
    }
  }
}
