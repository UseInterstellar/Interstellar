//Loads custom icons

document.addEventListener('DOMContentLoaded', function (event) {
  const icon = document.getElementById('tab-favicon')
  const name = document.getElementById('tab-title')
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
  } else if (selectedValue === 'LinkIt') {
    icon.setAttribute('href', '/assets/media/favicon/linkit.ico')
    name.textContent = 'Test Taker'
    localStorage.setItem('name', 'Test Taker')
    localStorage.setItem('icon', '/assets/media/favicon/linkit.ico')
  } else if (selectedValue === 'Edpuzzle') {
    icon.setAttribute('href', '/assets/media/favicon/edpuzzle.png')
    name.textContent = 'Edpuzzle'
    localStorage.setItem('name', 'Edpuzzle')
    localStorage.setItem('icon', '/assets/media/favicon/edpuzzle.png')
  }

  var themeid = localStorage.getItem('theme')
  //Loads theme
  themeEle = document.createElement('link')
  themeEle.rel = 'stylesheet'
  if (themeid == 'catppuccinMocha') {
    themeEle.href = '/assets/styles/themes/catppuccin/mocha.css'
  }
  if (themeid == 'catppuccinMacchiato') {
    themeEle.href = '/assets/styles/themes/catppuccin/macchiato.css'
  }
  if (themeid == 'catppuccinFrappe') {
    themeEle.href = '/assets/styles/themes/catppuccin/frappe.css'
  }
  if (themeid == 'catppuccinLatte') {
    themeEle.href = '/assets/styles/themes/catppuccin/latte.css'
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

document.addEventListener('DOMContentLoaded', function () {
  var eventKey = localStorage.getItem('eventKey') || '`'
  var panicLink = localStorage.getItem('panicLink') || 'https://classroom.google.com/'

  document.getElementById('eventKeyInput').value = eventKey
  document.getElementById('linkInput').value = panicLink

  const selectedOption = localStorage.getItem('selectedOption')
  if (selectedOption) {
    updateHeadSection(selectedOption)
  }
})

function saveEventKey() {
  var eventKey = document.getElementById('eventKeyInput').value
  var panicLink = document.getElementById('linkInput').value

  localStorage.setItem('eventKey', eventKey)
  localStorage.setItem('panicLink', panicLink)

  document.getElementById('eventKeyInput').value = ''
  document.getElementById('linkInput').value = ''
}
