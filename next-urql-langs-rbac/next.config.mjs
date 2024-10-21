/** @type {import('next').NextConfig} */
//import i18n from "./next-i18next.config.js";

const nextConfig = {
  i18n: {
    locales: ["en-US", "es", "fr", "nl-NL"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-US",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    domains: [
      {
        domain: "example.com",
        defaultLocale: "en-US",
        // other locales that should be handled on this domain
        locales: ["es"],
      },
      {
        domain: "example.vi",
        defaultLocale: "vi-VI",
      },
    ],
  },
};

export default nextConfig;
