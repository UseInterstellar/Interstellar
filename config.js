const config = {
  challenge: false, // Set to true if you want to enable password protection.
  users: {
    // You can add multiple users by doing username: 'password'.
    interstellar: "password",
  },
  multiServer: true, // Set this to true to enable the use of multiple Bare servers
  // The server hosted by 
  servers: {
    // Servers can be added with the format name: {url: "url", latitude: latitude, longitude: longitude}
    // Coordinates will be rounded to 3 decimal places when sent to users devices for privacy
    USEAST: {url: "https://bare.example.com/", latitude: 41.878, longitude: -87.630},
    USWEST: {url: "https://bare2.example.com/", latitude: 46.878, longitude: -67.630},
  },
}
export default config
