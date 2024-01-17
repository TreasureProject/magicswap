/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  future: {
    v2_errorBoundary: true,
    v2_headers: true,
    v2_normalizeFormMethod: true,
  },
  serverDependenciesToBundle: [
    "@rainbow-me/rainbowkit",
    "@rainbow-me/rainbowkit/wallets",
    /^@?wagmi.*/,
  ],
  serverModuleFormat: "cjs",
};
