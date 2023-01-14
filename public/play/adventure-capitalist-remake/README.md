# Adventure Capitalist Game

This game was built on React + Redux. It was inspired from http://en.gameslol.net/adventure-capitalist-1086.html

This game is responsive, so it works on Desktop, Tablet and Mobile.

## Demo
https://than1089.github.io/adventure-capitalist/

## Dependencies
This game has minimum dependencies, no 3rd UI or game engine
- React
- Redux
- uuid

## Installation
```
yarn install
yarn start
```

## Technical explanation
This game has multiple busnesses. With managers, each business will be able to run independently and automatically.

The approach is to use `State Mangement - Redux` along with React to build components, all logics rely on the store state. Ex: which businesses, managers are available; increase/decrease total earning by events.

This game is only front-end, there can be a back-end part for users to play on multiple devices without losing data in the to-do features.

### Available businesses and managers
Available businesses and managers are calculated simply by comparing their price to `total earning`.

### Count Down and Progress Bar
They are calculated by `Date object` of JavavaScirpt, so it's more accurate.

I was trying with `setInterval` with `1000` miliseconds for the CountDown, and `CSS3 animation` for the Progress Bar. But they are not reliable.

### How to run businesses automantically with managers
When the countdown reaches zero, the `Business` component will check if it has manager and triggers a new run.

### Continuous Progress when leaving
The app will cache the state and leaving time when the user closes the game. When going back,
the latest state will be loaded, check `src/redux/store.js`

Based on `current time` and `close time`, we can calculate the earning. See `src/utils/game.js`

The running businesses in the middle will be kept. Ex: you have a business with `1 hour` taken time. It already run `30 mins`. If you close the browser for `15 mins`, when getting back you will see the progress at `45 mins`

## To-do features if I spend more time on this project
- Buy X3, X10, X100 and Buy Max.
- Design game assets, images. I only use css to style this game, but it's better to have graphic design to help the game looks more attractive for users.
- Implement login with Facebook and post data to back-end when leaving, so users can play on multiple devices without starting from the beginning on a new device.
