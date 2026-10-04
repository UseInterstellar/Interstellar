const config = {
  challenge: false, // Set to true if you want to enable password protection.
  users: {
    // You can add multiple users by doing username: 'password'.
    interstellar: "password",
  },
  masqr: {
    enabled: false, // Gate the app behind Masqr unlock tokens. Visitors without a session see the decoy site.
    decoy: "default", // Folder under static/decoy/ shown to hosts without a decoy of their own.
    secureCookie: true, // Keep true in production. Chrome also accepts it on http://localhost.
    sessionDays: 30,
  },
};

export default config;
