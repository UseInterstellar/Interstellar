document.addEventListener("DOMContentLoaded", function (event) {
  const addTabButton = document.getElementById("add-tab")
  const tabList = document.getElementById("tab-list")
  const iframeContainer = document.getElementById("iframe-container")

  let tabCounter = 1

  addTabButton.addEventListener("click", () => {
    createNewTab()
  })

  function createNewTab() {
    const newTab = document.createElement("li")
    const tabTitle = document.createElement("span")
    const newIframe = document.createElement("iframe")

    tabTitle.textContent = `New Tab ${tabCounter}`
    tabTitle.className = "tab-title"
    newTab.dataset.tabId = tabCounter
    newTab.addEventListener("click", switchTab)
    newTab.setAttribute("draggable", true)

    const closeButton = document.createElement("button")
    closeButton.classList.add("close-tab")
    closeButton.innerHTML = "&#10005;"
    closeButton.addEventListener("click", closeTab)

    newTab.appendChild(tabTitle)
    newTab.appendChild(closeButton)
    tabList.appendChild(newTab)

    const allTabs = Array.from(tabList.querySelectorAll("li"))
    allTabs.forEach((tab) => tab.classList.remove("active"))
    const allIframes = Array.from(iframeContainer.querySelectorAll("iframe"))
    allIframes.forEach((iframe) => iframe.classList.remove("active"))

    newTab.classList.add("active")

    newIframe.src = "/"
    newIframe.dataset.tabId = tabCounter
    newIframe.classList.add("active")

    newIframe.setAttribute("onload", "Load()")

    if (tabCounter === 1) {
      newIframe.setAttribute("onload", "OnLoad()")
    }

    iframeContainer.appendChild(newIframe)

    newIframe.addEventListener("load", () => {
      const title = newIframe.contentDocument.title
      if (title.length <= 1) {
        tabTitle.textContent = "New Tab"
      } else {
        tabTitle.textContent = title
      }
      Load()
    })

    tabCounter++
  }

  function closeTab(event) {
    event.stopPropagation()

    const tabId = event.target.closest("li").dataset.tabId

    const tabToRemove = tabList.querySelector(`[data-tab-id='${tabId}']`)
    const iframeToRemove = iframeContainer.querySelector(`[data-tab-id='${tabId}']`)

    if (tabToRemove && iframeToRemove) {
      tabToRemove.remove()
      iframeToRemove.remove()

      const remainingTabs = Array.from(tabList.querySelectorAll("li"))
      const nextTabIndex = remainingTabs.findIndex((tab) => tab.dataset.tabId !== tabId)

      if (nextTabIndex > -1) {
        const nextTabToActivate = remainingTabs[nextTabIndex]
        const nextIframeToActivate = iframeContainer.querySelector(`[data-tab-id='${nextTabToActivate.dataset.tabId}']`)

        remainingTabs.forEach((tab) => tab.classList.remove("active"))
        remainingTabs[nextTabIndex].classList.add("active")

        const allIframes = Array.from(iframeContainer.querySelectorAll("iframe"))
        allIframes.forEach((iframe) => iframe.classList.remove("active"))
        nextIframeToActivate.classList.add("active")
      }
    }
  }

  function switchTab(event) {
    const tabId = event.target.closest("li").dataset.tabId

    const allTabs = Array.from(tabList.querySelectorAll("li"))
    allTabs.forEach((tab) => tab.classList.remove("active"))
    const allIframes = Array.from(iframeContainer.querySelectorAll("iframe"))
    allIframes.forEach((iframe) => iframe.classList.remove("active"))

    const selectedTab = tabList.querySelector(`[data-tab-id='${tabId}']`)
    if (selectedTab) {
      selectedTab.classList.add("active")
      Load()
    } else {
      console.log("No selected tab found with ID:", tabId)
    }

    const selectedIframe = iframeContainer.querySelector(`[data-tab-id='${tabId}']`)
    if (selectedIframe) {
      selectedIframe.classList.add("active")
    } else {
      console.log("No selected iframe found with ID:", tabId)
    }
  }

  let dragTab = null

  tabList.addEventListener("dragstart", (event) => {
    dragTab = event.target
  })

  tabList.addEventListener("dragover", (event) => {
    event.preventDefault()
    const targetTab = event.target
    if (targetTab.tagName === "LI" && targetTab !== dragTab) {
      const targetIndex = Array.from(tabList.children).indexOf(targetTab)
      const dragIndex = Array.from(tabList.children).indexOf(dragTab)
      if (targetIndex < dragIndex) {
        tabList.insertBefore(dragTab, targetTab)
      } else {
        tabList.insertBefore(dragTab, targetTab.nextSibling)
      }
    }
  })

  tabList.addEventListener("dragend", () => {
    dragTab = null
  })

  createNewTab()
})
