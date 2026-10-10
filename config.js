const config = {
  // Password protection. Set challenge to true and add users to require a login.
  challenge: false,
  users: {
    interstellar: "password",
  },

  // Domains the proxy refuses to open. Each entry also blocks its subdomains,
  // so "example.com" blocks example.com and www.example.com. Plain hostnames only.
  blockedSites: [
    "googletagmanager.com",
    "amazon-adsystem.com",
    "doubleclick.net",
    "analytics.google.com",
  ],


  filtering: {
    enabled: false,
    cloudflareFamilies: true,
    adblock: true,
    blockTrackers: true,
  },

  masqr: {
    enabled: false, // Gate the app behind Masqr unlock tokens. Visitors without a session see the decoy site.
    decoy: "default", // Decoy set under static/decoy/. index.html is the fallback; each domain folder is its own decoy.
    searchTrigger: null, // Prefer the MASQR_SEARCH_TRIGGER env var. Searching this exact text unlocks the site.
    secureCookie: true, // Keep true in production. Chrome also accepts it on http://localhost.
    sessionDays: 30,
  },
};

export default config;
