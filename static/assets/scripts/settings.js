// Ads
document.addEventListener('DOMContentLoaded', function () {
  function adChange(selectedValue) {
    if (selectedValue === 'default') {
      localStorage.setItem('ad', 'true')
    } else if (selectedValue === 'off') {
      localStorage.setItem('ad', 'false')
    }
  }

  var adTypeElement = document.getElementById('adType')

  if (adTypeElement) {
    adTypeElement.addEventListener('change', function () {
      var selectedOption = this.value
      adChange(selectedOption)
    })

    var storedAd = localStorage.getItem('ad')
    if (storedAd === 'true') {
      adTypeElement.value = 'default'
    } else if (storedAd === 'false') {
      adTypeElement.value = 'off'
    } else {
      adTypeElement.value = 'default'
    }
  }
})
// Dyn
document.addEventListener('DOMContentLoaded', function () {
  function pChange(selectedValue) {
    if (selectedValue === 'uv') {
      localStorage.setItem('uv', 'true')
      localStorage.setItem('dy', 'false')
    } else if (selectedValue === 'dy') {
      localStorage.setItem('uv', 'false')
      localStorage.setItem('dy', 'true')
    }
  }

  var pChangeElement = document.getElementById('pChange')

  if (pChangeElement) {
    pChangeElement.addEventListener('change', function () {
      var selectedOption = this.value
      pChange(selectedOption)
    })

    var storedP = localStorage.getItem('uv')
    if (storedP === 'true') {
      pChangeElement.value = 'uv'
    } else if (localStorage.getItem('dy') === 'true' || localStorage.getItem('dy') === 'auto') {
      pChangeElement.value = 'dy'
    } else {
      pChangeElement.value = 'uv'
    }
  }
})

// Key
var eventKey = localStorage.getItem('eventKey') || '`'
var pLink = localStorage.getItem('pLink') || 'https://classroom.google.com/'

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('eventKeyInput').value = eventKey
  document.getElementById('linkInput').value = pLink

  const selectedOption = localStorage.getItem('selectedOption')
  if (selectedOption) {
    updateHeadSection(selectedOption)
  }
})

var eventKeyInput = document.getElementById('eventKeyInput')
eventKeyInput.addEventListener('input', function () {
  eventKey = eventKeyInput.value
})

var linkInput = document.getElementById('linkInput')
linkInput.addEventListener('input', function () {
  pLink = linkInput.value
})

function saveEventKey() {
  eventKey = eventKeyInput.value
  localStorage.setItem('eventKey', eventKey)
  localStorage.setItem('pLink', pLink)
}
// Tab Cloaker
function saveIcon() {
  const iconElement = document.getElementById('icon')
  const iconValue = iconElement.value
  console.log('saveIcon function called with icon value:', iconValue)
  localStorage.setItem('icon', iconValue)
}

function saveName() {
  const nameElement = document.getElementById('name')
  const nameValue = nameElement.value
  console.log('saveName function called with name value:', nameValue)
  localStorage.setItem('name', nameValue)
}

function CustomIcon() {
  const iconElement = document.getElementById('icon')
  const iconValue = iconElement.value
  console.log('saveIcon function called with icon value:', iconValue)
  localStorage.setItem('CustomIcon', iconValue)
}

function CustomName() {
  const nameElement = document.getElementById('name')
  const nameValue = nameElement.value
  console.log('saveName function called with name value:', nameValue)
  localStorage.setItem('CustomName', nameValue)
}

function redirectToMainDomain() {
  var currentUrl = window.location.href
  var mainDomainUrl = currentUrl.replace(/\/[^\/]*$/, '')
  if (window != top) {
    top.location.href = mainDomainUrl + window.location.pathname
  } else {
    window.location.href = mainDomainUrl + window.location.pathname
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  const icon = document.getElementById('tab-favicon')
  const name = document.getElementById('tab-title')
  var selectedValue = localStorage.getItem('selectedOption') || 'Default'
  document.getElementById('dropdown').value = selectedValue
  updateHeadSection(selectedValue)
})

function handleDropdownChange(selectElement) {
  var selectedValue = selectElement.value
  localStorage.removeItem('CustomName')
  localStorage.removeItem('CustomIcon')
  localStorage.setItem('selectedOption', selectedValue)
  updateHeadSection(selectedValue)
  redirectToMainDomain(selectedValue)
}

function updateHeadSection(selectedValue) {
  const icon = document.getElementById('tab-favicon')
  const name = document.getElementById('tab-title')
  const customName = localStorage.getItem('CustomName')
  const customIcon = localStorage.getItem('CustomIcon')

  if (customName && customIcon) {
    name.textContent = customName
    icon.setAttribute('href', customIcon)
    localStorage.setItem('name', customName)
    localStorage.setItem('icon', customIcon)
  } else {
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
}
// Background Image
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
// Particles

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
// Themes

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
// AB Cloak
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
      const icon = localStorage.getItem('icon') || 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png'
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

function toggleAB() {
  ab = localStorage.getItem('ab')
  if (ab == null) {
    localStorage.setItem('ab', 'false')
  } else if (ab == 'true') {
    localStorage.setItem('ab', 'false')
  } else {
    localStorage.setItem('ab', 'true')
  }
}
// Search Engine
function EngineChange(dropdown) {
  var selectedEngine = dropdown.value

  var engineUrls = {
    Google: 'https://www.google.com/search?q=',
    Bing: 'https://www.bing.com/search?q=',
    DuckDuckGo: 'https://duckduckgo.com/?q=',
    Qwant: 'https://www.qwant.com/?q=',
    Startpage: 'https://www.startpage.com/search?q=',
    SearchEncrypt: 'https://www.searchencrypt.com/search/?q=',
    Ecosia: 'https://www.ecosia.org/search?q=',
  }

  localStorage.setItem('engine', engineUrls[selectedEngine])
  localStorage.setItem('enginename', selectedEngine)

  dropdown.value = selectedEngine
}

function SaveEngine() {
  var customEngine = document.getElementById('engine-form').value
  if (customEngine.trim() !== '') {
    localStorage.setItem('engine', customEngine)
    localStorage.setItem('enginename', 'Custom')
  } else {
    alert('Please enter a custom search engine value.')
  }
}
