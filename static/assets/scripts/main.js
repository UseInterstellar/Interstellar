// Ads
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('ad') === null) {
    localStorage.setItem('ad', 'true')
  }

  if (localStorage.getItem('ad') === 'true') {
    var advDiv = document.getElementById('adv')
    if (advDiv) {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '//oysterscoldtiny.com/1c/c3/8a/1cc38a6899fdf8ba4dfe779bcc54627b.js'
      advDiv.appendChild(script)
      console.log('Script inserted inside the adv div.')
    }
  }

  if (localStorage.getItem('ad') === 'false') {
    var advDiv = document.getElementById('adv')
    if (advDiv) {
      advDiv.remove()
      console.log('The adv div has been removed.')
    }
  }
})
// Themes
var themeid = localStorage.getItem('theme')
themeEle = document.createElement('link')
themeEle.rel = 'stylesheet'
if (themeid == 'catppuccinMocha') {
  themeEle.href = '/assets/styles/themes/catppuccin/mocha.css?v=1'
}
if (themeid == 'catppuccinMacchiato') {
  themeEle.href = '/assets/styles/themes/catppuccin/macchiato.css?v=1'
}
if (themeid == 'catppuccinFrappe') {
  themeEle.href = '/assets/styles/themes/catppuccin/frappe.css?v=1'
}
if (themeid == 'catppuccinLatte') {
  themeEle.href = '/assets/styles/themes/catppuccin/latte.css?v=1'
}
document.body.appendChild(themeEle)
// Tab Cloaker
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
})
// Key
document.addEventListener('DOMContentLoaded', function () {
  var eventKey = localStorage.getItem('eventKey') || '`'
  var pLink = localStorage.getItem('pLink') || 'https://classroom.google.com/'

  document.addEventListener('keydown', function (event) {
    if (event.key === eventKey) {
      window.location.href = pLink
    }
  })
})
// Background Image
document.addEventListener('DOMContentLoaded', function () {
  var savedBackgroundImage = localStorage.getItem('backgroundImage')
  if (savedBackgroundImage) {
    document.body.style.backgroundImage = "url('" + savedBackgroundImage + "')"
  }
})
