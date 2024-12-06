const config = {
  challenge: trur, // Set to true if you want to enable password protection.
  blocked: {
    // Normal users can ignore this option. This is for the owner of the website.
    "gointerstellar.app": "",
    localhost: "",
  },
  users: {
    // You can add multiple users by doing username: 'password'.
    ryankim: "green30Ten",
    paulfauve: "824824!",
    killsecurly: "killsecurlyfoundation",
  },
};

export default config;
