const config = {
  challenge: false, // Set to true if you want to enable password protection.
  users: {
    // You can add multiple users by doing username: 'password'.
    interstellar: "password",
  },
  masqr: {
    enabled: false, // Gate the app behind Masqr unlock tokens. Visitors without a session see the decoy site.
    decoy: "default", // Decoy set under static/decoy/. Its index.html is the fallback, and each domain folder is its own decoy.
    searchTrigger: null, // Prefer the MASQR_SEARCH_TRIGGER env var. Searching this exact text unlocks the site.
    secureCookie: true, // Keep true in production. Chrome also accepts it on http://localhost.
    sessionDays: 30,
  },
};

export default config;
