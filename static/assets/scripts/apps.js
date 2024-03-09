document.addEventListener('DOMContentLoaded', () => {
  fetch('/assets/json/apps.min.json')
    .then((response) => response.json())
    .then((appsList) => {
      appsList.sort((a, b) => a.name.localeCompare(b.name))

      const nonPinnedApps = document.querySelector('.container-apps')
      const pinnedApps = document.querySelector('.pinned-apps')

      var pinList = localStorage.getItem('pinnedGames')
      try {
        pinList = pinList.split(',').map(Number)
      } catch {}

      var appInd = 0
      appsList.forEach((app) => {
        let pinNum = appInd

        const columnDiv = document.createElement('div')
        columnDiv.classList.add('column')
        columnDiv.setAttribute('data-category', app.categories.join(' '))

        const pinIcon = document.createElement('i')
        pinIcon.classList.add('fa', 'fa-map-pin')
        pinIcon.ariaHidden = true

        const btn = document.createElement('button')
        btn.appendChild(pinIcon)
        btn.style.float = 'right'
        btn.style.backgroundColor = 'rgb(45,45,45)'
        btn.style.borderRadius = '50%'
        btn.style.borderColor = 'transparent'
        btn.style.color = 'white'
        btn.style.top = '-200px'
        btn.style.position = 'relative'
        btn.onclick = function () {
          setPin(pinNum)
        }
        btn.title = 'Pin'

        const link = document.createElement('a')

        function saveToLocal(path) {
          sessionStorage.setItem('GoUrl', path)
        }

        function handleClick(app) {
          if (typeof app.say !== 'undefined') {
            alert(app.say)
          }

          if (app.local) {
            saveToLocal(app.link)
            window.location.href = '&'
          } else if (app.local2) {
            saveToLocal(app.link)
            window.location.href = app.link
          } else if (app.blank) {
            blank(app.link)
          } else {
            go(app.link)
          }

          return false
        }

        link.onclick = function () {
          handleClick(app)
        }

        const image = document.createElement('img')
        image.width = 145
        image.height = 145
        image.src = app.image
        image.loading = 'lazy'

        const paragraph = document.createElement('p')
        paragraph.textContent = app.name
        if (app.error) {
          paragraph.style.color = 'red'
        }

        link.appendChild(image)
        link.appendChild(paragraph)
        columnDiv.appendChild(link)

        if (appInd != 0) {
          columnDiv.appendChild(btn)
        }

        if (pinList != null && appInd != 0) {
          if (pinContains(appInd, pinList)) {
            pinnedApps.appendChild(columnDiv)
          } else {
            nonPinnedApps.appendChild(columnDiv)
          }
        } else {
          nonPinnedApps.appendChild(columnDiv)
        }
        appInd++
      })

      const appsContainer = document.getElementById('apps-container')
      appsContainer.appendChild(pinnedApps)
      appsContainer.appendChild(nonPinnedApps)
    })
    .catch((error) => {
      console.error('Error fetching JSON data:', error)
    })
})

function setPin(index) {
  let pins = localStorage.getItem('pinnedGames')
  if (pins == null) {
    pins = []
  }
  if (pins == '') {
    pins = []
  } else {
    pins = pins.split(',').map(Number)
  }
  if (pinContains(index, pins)) {
    let remove = pins.indexOf(index)
    pins.splice(remove, 1)
  } else {
    pins.push(index)
  }
  localStorage.setItem('pinnedGames', pins)
  location.reload()
}

function pinContains(i, p) {
  if (p == '') {
    return false
  }
  for (var x = 0; x < p.length; x++) {
    if (p[x] === i) {
      return true
    }
  }
  return false
}

function show_category() {
  var selectedCategories = Array.from(document.querySelectorAll('#category option:checked')).map(
    (option) => option.value
  )
  var games = document.getElementsByClassName('column')

  for (var i = 0; i < games.length; i++) {
    var game = games[i]
    var categories = game.getAttribute('data-category').split(' ')

    if (selectedCategories.length === 0 || selectedCategories.some((category) => categories.includes(category))) {
      game.style.display = 'block'
    } else {
      game.style.display = 'none'
    }
  }
}

function search_bar() {
  var input = document.getElementById('searchbarbottom')
  var filter = input.value.toLowerCase()
  var games = document.getElementsByClassName('column')

  for (var i = 0; i < games.length; i++) {
    var game = games[i]
    var name = game.getElementsByTagName('p')[0].textContent.toLowerCase()

    if (name.includes(filter)) {
      game.style.display = 'block'
    } else {
      game.style.display = 'none'
    }
  }
}
