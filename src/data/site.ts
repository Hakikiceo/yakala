export const siteConfig = {
  name: "YAKALA.IO",
  publicSiteMode: "comingSoon",
  email: "hello@yakala.io",
  phone: "+90 (212) 000 00 00",
  location: {
    tr: "Ankara, Türkiye",
    en: "Ankara, Türkiye",
  },
} as const;

export const isComingSoonModeEnabled = siteConfig.publicSiteMode === "comingSoon";
