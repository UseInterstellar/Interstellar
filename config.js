const config = {
  // Authentication
  // Enable password protection and configure authorized users.
  challenge: false,
  users: {
    interstellar: "password",
  },

  // Blocked Domains
  // Block access to specified domains and their subdomains.
  // Use hostnames only, without protocols or paths.
  blockedSites: [
    "googletagmanager.com",
    "amazon-adsystem.com",
    "doubleclick.net",
    "analytics.google.com",
  ],

  // DNS Filtering
  // Configure DNS-based content filtering and privacy protection.
  filtering: {
    enabled: false,
    cloudflareFamilies: true, // Block malware and adult content.
    adblock: true,
    blockTrackers: true,
  },

  // Masqr
  // Restrict access to Interstellar using decoy sites and search triggers.
  masqr: {
    enabled: false,
    decoy: "/default/", 
    searchTrigger: "interstellar", // Default trigger for unlisted domains.
    secureCookie: true,
    sessionDays: 30,
    decoyOnly: false, // Only enable Masqr on hosts with configured decoys.

    // Domain-Specific Triggers
    // Apply custom search triggers to groups of domains sharing a name.
    // Unlisted domains use the global searchTrigger.
    sites: [
      { name: "example1", tlds: ["org", "com", "net"], searchTrigger: "example1" },
      { name: "interstellar", tlds: ["com", "net", "xyz"], searchTrigger: "interstellar2" },
    ],
  },
};

export default config;
