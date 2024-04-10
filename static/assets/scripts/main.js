document.addEventListener('DOMContentLoaded', function () {
  // Ads
  if (localStorage.getItem('ad') === null || localStorage.getItem('ad') === 'default') {
    localStorage.setItem('ad', 'on')
  }

  var advDiv = document.getElementById('adv')
  if (advDiv && localStorage.getItem('ad') === 'default') {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = '//oysterscoldtiny.com/1c/c3/8a/1cc38a6899fdf8ba4dfe779bcc54627b.js'
    advDiv.appendChild(script)
    console.log('Script inserted inside the adv div.')
  } else if (advDiv && localStorage.getItem('ad') === 'off') {
    advDiv.remove()
    console.log('The adv div has been removed.')
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
  } else if (selectedValue === 'i-Ready Math') {
    icon.setAttribute('href', '/assets/media/favicon/i-ready.ico')
    name.textContent = 'Math To Do, i-Ready'
    localStorage.setItem('name', 'Math To Do, i-Ready')
    localStorage.setItem('icon', '/assets/media/favicon/i-ready.ico')
  } else if (selectedValue === 'i-Ready Reading') {
    icon.setAttribute('href', '/assets/media/favicon/i-ready.ico')
    name.textContent = 'Reading To Do, i-Ready'
    localStorage.setItem('name', 'Reading To Do, i-Ready')
    localStorage.setItem('icon', '/assets/media/favicon/i-ready.ico')
  } else if (selectedValue === 'ClassLink Login') {
    icon.setAttribute('href', '/assets/media/favicon/classlink-login.png')
    name.textContent = 'Login'
    localStorage.setItem('name', 'Login')
    localStorage.setItem('icon', '/assets/media/favicon/classlink-login.png')
  } else if (selectedValue === 'Google Meet') {
    icon.setAttribute('href', '/assets/media/favicon/google-meet.png')
    name.textContent = 'Google Meet'
    localStorage.setItem('name', 'Google Meet')
    localStorage.setItem('icon', '/assets/media/favicon/google-meet.png')
  } else if (selectedValue === 'Google Docs') {
    icon.setAttribute('href', '/assets/media/favicon/google-docs.ico')
    name.textContent = 'Google Docs'
    localStorage.setItem('name', 'Google Docs')
    localStorage.setItem('icon', '/assets/media/favicon/google-docs.ico')
  } else if (selectedValue === 'Google Slides') {
    icon.setAttribute('href', '/assets/media/favicon/google-slides.ico')
    name.textContent = 'Google Slides'
    localStorage.setItem('name', 'Google Slides')
    localStorage.setItem('icon', '/assets/media/favicon/google-slides.ico')
  } else if (selectedValue === 'Wikipedia') {
    icon.setAttribute('href', '/assets/media/favicon/wikipedia.png')
    name.textContent = 'Wikipedia'
    localStorage.setItem('name', 'Wikipedia')
    localStorage.setItem('icon', '/assets/media/favicon/wikipedia.png')
  } else if (selectedValue === 'Britannica') {
    icon.setAttribute('href', '/assets/media/favicon/britannica.png')
    name.textContent = 'Encyclopedia Britannica | Britannica'
    localStorage.setItem('name', 'Encyclopedia Britannica | Britannica')
    localStorage.setItem('icon', '/assets/media/favicon/britannica.png')
  } else if (selectedValue === 'Ducksters') {
    icon.setAttribute('href', '/assets/media/favicon/ducksters.png')
    name.textContent = 'Ducksters'
    localStorage.setItem('name', 'Ducksters')
    localStorage.setItem('icon', '/assets/media/favicon/ducksters.png')
  } else if (selectedValue === 'Minga') {
    icon.setAttribute('href', '/assets/media/favicon/minga.png')
    name.textContent = 'Minga – Creating Amazing Schools'
    localStorage.setItem('name', 'Minga – Creating Amazing Schools')
    localStorage.setItem('icon', '/assets/media/favicon/minga.png')
  } else if (selectedValue === 'i-Ready Learning Games') {
    icon.setAttribute('href', '/assets/media/favicon/i-ready.ico')
    name.textContent = 'Learning Games, i-Ready'
    localStorage.setItem('name', 'Learning Games, i-Ready')
    localStorage.setItem('icon', '/assets/media/favicon/i-ready.ico')
  } else if (selectedValue === 'NoRedInk Home') {
    icon.setAttribute('href', '/assets/media/favicon/noredink.webp')
    name.textContent = 'Student Home | NoRedInk'
    localStorage.setItem('name', 'Student Home | NoRedInk')
    localStorage.setItem('icon', '/assets/media/favicon/noredink.webp')
  } else if (selectedValue === 'Newsela Binder') {
    icon.setAttribute('href', '/assets/media/favicon/newsela.png')
    name.textContent = 'Newsela | Binder'
    localStorage.setItem('name', 'Newsela | Binder')
    localStorage.setItem('icon', '/assets/media/favicon/newsela.png')
  } else if (selectedValue === 'Newsela Assignments') {
    icon.setAttribute('href', '/assets/media/favicon/newsela.png')
    name.textContent = 'Newsela | Assignments'
    localStorage.setItem('name', 'Newsela | Assignments')
    localStorage.setItem('icon', '/assets/media/favicon/newsela.png')
  } else if (selectedValue === 'Newsela Home') {
    icon.setAttribute('href', '/assets/media/favicon/newsela.png')
    name.textContent = 'Newsela | Instructional Content Platform'
    localStorage.setItem('name', 'Newsela | Instructional Content Platform')
    localStorage.setItem('icon', '/assets/media/favicon/newsela.png')
  } else if (selectedValue === 'PowerSchool Sign In') {
    icon.setAttribute('href', '/assets/media/favicon/powerschool.png')
    name.textContent = 'Student and Parent Sign In'
    localStorage.setItem('name', 'Student and Parent Sign In')
    localStorage.setItem('icon', '/assets/media/favicon/powerschool.png')
  } else if (selectedValue === 'PowerSchool Grades and Attendance') {
    icon.setAttribute('href', '/assets/media/favicon/powerschool.png')
    name.textContent = 'Grades and Attendance'
    localStorage.setItem('name', 'Grades and Attendance')
    localStorage.setItem('icon', '/assets/media/favicon/powerschool.png')
  } else if (selectedValue === 'PowerSchool Teacher Comments') {
    icon.setAttribute('href', '/assets/media/favicon/powerschool.png')
    name.textContent = 'Teacher Comments'
    localStorage.setItem('name', 'Teacher Comments')
    localStorage.setItem('icon', '/assets/media/favicon/powerschool.png')
  } else if (selectedValue === 'PowerSchool Standards Grades') {
    icon.setAttribute('href', '/assets/media/favicon/powerschool.png')
    name.textContent = 'Standards Grades'
    localStorage.setItem('name', 'Standards Grades')
    localStorage.setItem('icon', '/assets/media/favicon/powerschool.png')
  } else if (selectedValue === 'PowerSchool Attendance') {
    icon.setAttribute('href', '/assets/media/favicon/powerschool.png')
    name.textContent = 'Attendance'
    localStorage.setItem('name', 'Attendance')
    localStorage.setItem('icon', '/assets/media/favicon/powerschool.png')
  } else if (selectedValue === 'Nearpod') {
    icon.setAttribute('href', '/assets/media/favicon/nearpod.png')
    name.textContent = 'Nearpod'
    localStorage.setItem('name', 'Nearpod')
    localStorage.setItem('icon', '/assets/media/favicon/nearpod.png')
  } else if (selectedValue === 'StudentVUE') {
    icon.setAttribute('href', '/assets/media/favicon/studentvue.ico')
    name.textContent = 'StudentVUE'
    localStorage.setItem('name', 'StudentVUE')
    localStorage.setItem('icon', '/assets/media/favicon/studentvue.ico')
  } else if (selectedValue === 'Quizlet Home') {
    icon.setAttribute('href', '/assets/media/favicon/quizlet.webp')
    name.textContent = 'Flashcards, learning tools and textbook solutions | Quizlet'
    localStorage.setItem('name', 'Flashcards, learning tools and textbook solutions | Quizlet')
    localStorage.setItem('icon', '/assets/media/favicon/quizlet.webp')
  } else if (selectedValue === 'Google Forms Locked Mode') {
    icon.setAttribute('href', '/assets/media/favicon/googleforms.png')
    name.textContent = 'Start your quiz'
    localStorage.setItem('name', 'Start your quiz')
    localStorage.setItem('icon', '/assets/media/favicon/googleforms.png')
  } else if (selectedValue === 'DeltaMath') {
    icon.setAttribute('href', '/assets/media/favicon/deltamath.png')
    name.textContent = 'DeltaMath'
    localStorage.setItem('name', 'DeltaMath')
    localStorage.setItem('icon', '/assets/media/favicon/deltamath.png')
  } else if (selectedValue === 'Kami') {
    icon.setAttribute('href', '/assets/media/favicon/kami.png')
    name.textContent = 'Kami'
    localStorage.setItem('name', 'Kami')
    localStorage.setItem('icon', '/assets/media/favicon/kami.png')
  } else if (selectedValue === 'GoGuardian Admin Restricted') {
    icon.setAttribute('href', '/assets/media/favicon/goguardian-lock.png')
    name.textContent = 'Restricted'
    localStorage.setItem('name', 'Restricted')
    localStorage.setItem('icon', '/assets/media/favicon/goguardian-lock.png')
  } else if (selectedValue === 'GoGuardian Teacher Block') {
    icon.setAttribute('href', '/assets/media/favicon/goguardian.png')
    name.textContent = 'Uh oh!'
    localStorage.setItem('name', 'Uh oh!')
    localStorage.setItem('icon', '/assets/media/favicon/goguardian.png')
  } else if (selectedValue === 'World History Encyclopedia') {
    icon.setAttribute('href', '/assets/media/favicon/worldhistoryencyclopedia.png')
    name.textContent = 'World History Encyclopedia'
    localStorage.setItem('name', 'World History Encyclopedia')
    localStorage.setItem('icon', '/assets/media/favicon/worldhistoryencyclopedia.png')
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
