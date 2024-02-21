const config = {
  challenge: false, // Set to true if you want to enable password protection.
  users: {
    // You can add multiple users by doing username: 'password'.
    interstellar: 'password',
  },
  routes: true, // Change this to false if you just want to host a bare server.
  local: true, // Change this to false to disable local assets.
}
export default config
