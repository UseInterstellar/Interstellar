# Changelog

## Version 6.0.0 - Released September 18, 2026

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
