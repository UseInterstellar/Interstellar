# Changelog

## Version 6.1.0 - "The Customization Update" - Released October 4th, 2026

# Added

* Added obfuscation to page titles, including about:blank
* Added obfuscation to splash text, tab names, game/app names, home page titles, and navbar text
* Added migration support for old page titles
* Added obfuscation to the remaining Scramjet functions
* Added obfuscation to image filenames
* Added CLI port overriding
* Added gradient backgrounds
* Added color and pastel themes
* Added a background image gallery with a ton of new backgrounds
* Added background blur controls
* Added more particles and moved particle logic into `particles.js`
* Added particle customization
* Added particle state preservation across pages
* Added a ton of particle trails, click effects, and cursors

# Changed

* Prevented obfuscated text from being reassembled
* Changed the default cloak from Google Classroom to Thesaurus
* Modernized the Settings UI
* Separated background image and gradient options in Settings
* Changed the default background and particle options
* Stopped using accent colors for navbar text
* Disabled particles on the Tabs page
* Stopped using black text and logos with pastel themes
* Improved the default particle configurations
* Split particle effects into trails, clicks, and cursors
* Made particle trails, themes, and the panic key update without reloading the page
* Grouped particle options in the dropdown
* Moved custom search engine options into the search engine dropdown
* Updated the Google Analytics tag ID
* Improved the analytics proxy
* Converted background images to `.webp`
* Changed backgrounds to use persistent keys instead of file paths so builds don't break saved configurations

# Removed

* Removed the about:blank alert from the home page
* Removed title attributes from the Tabs page
* Removed broken rate limiting
* Removed the forced default background image
* Removed the save button for custom Wisp servers

# Cleaning / Bugfixes

* Properly named obfuscated or unclear functions in `/static/`
* Cleaned up `settings.js`
* Cleaned up `main.js`

## Version 6.0.0 - Released September 18th, 2026

# Added

* Dynamically show the version and latest updated date in Settings
* Added new themes
* Added a build pipeline that obfuscates the entire application
* Added cursor effects to Settings
* Added rate limiting
* Added hard caching for `games.js`
* Added proper `_top` link interception in tabs to preserve normal site functionality

# Changed

* Obfuscated the address bar in tabs
* Moved server code into `/src/` and split it into modules
* Minify CSS during builds
* Obfuscate the Google Analytics script
* Serve Scramjet and Ultraviolet files from `node_modules`
* Updated Ultraviolet to the latest version
* Polished site UI and animations
* Overhauled the theme system
* Updated Scramjet and made it the default proxy
* Updated links for broken games
* Load particles locally
* Properly sanitize URLs
* Properly named the CSS classes of `tabs.html` and the `main.js` navbar
* Made themes apply immediately on page load to fix the flashing bug
* Overhauled particles
* Prevent service worker errors for new users
* Moved the Custom App and Request An App cards into their own section on the Games and Apps page

# Removed

* Removed Dynamic proxy (outdated)
* Removed the Tabs button from the navbar and cleaned up its CSS
* Removed Masqr (unused)

# Cleaning / Bugfixes

* Cleaned up the code in `tabs.js` and fixed bugs
* Cleaned up the code in `settings.js` and fixed bugs
* Cleaned up the code in `main.js` and fixed themes
* Cleaned up the code in `launcher.js` and fixed bugs
* Properly named filenames and routes and removed all version-control parameters
