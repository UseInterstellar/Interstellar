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
  blockedSites: ["googletagmanager.com", "amazon-adsystem.com", "doubleclick.net", "analytics.google.com"],

  // DNS Filtering
  // Configure DNS-based content filtering and privacy protection.
  filtering: {
    enabled: false,
    cloudflareFamilies: true, // Block malware and adult content.
    adblock: true,
    blockTrackers: true,
  },

  // Caching
  // When enabled, built images, scripts and styles are cached by the browser until a new build changes them
  cache: {
    enabled: true,
  },

  // Masqr
  // Restrict access to Interstellar using decoy pages and typed trigger phrases.
  masqr: {
    enabled: false,
    // Choose a built-in page. Per-cloak triggers override the shared trigger below.
    decoy: "/default/",
    trigger: "james123", // Shared phrase. Enter it anywhere on the decoy page to unlock.
    searchTrigger: "interstellar", // Search-box phrase, separate from the typed trigger.
    cloaks: {
      default: { trigger: null }, // null inherits masqr.trigger; set a string to override it.
      nginx: { trigger: null },
      "apache2-ubuntu": { trigger: null },
      "vercel-paused": { trigger: null },
      "vercel-404": { trigger: null },
      "firebase-hosting": { trigger: null },
      "cloudflare-workers": { trigger: null },
      "cloudflare-timeout": { trigger: null },
      "cloudflare-ratelimit": { trigger: null },
      netlify: { trigger: null },
    },
    secureCookie: true,
    sessionDays: 30,
    decoyOnly: false, // Only enable Masqr on hosts with configured decoys.

    // Named decoy folders can serve several domains. For example,
    // static/decoy/pinkmath/domains.json can contain
    // ["pinkmath.com", "pinkmath.org", "pinkmath.edu"].

    // Domain-Specific Triggers
    // A site's trigger overrides its cloak trigger. searchTrigger keeps the search-box unlock separate.
    sites: [
      { name: "example1", tlds: ["org", "com", "net"], searchTrigger: "example1" },
      { name: "interstellar", tlds: ["com", "net", "xyz"], searchTrigger: "interstellar2" },
    ],
  },
};

export default config;
