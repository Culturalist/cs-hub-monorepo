module.exports = {
    reactStrictMode: true,
    transpilePackages: ["@cs/globals", "@cs/data", "@cs/ui", "@weresk/core", "@weresk/maket"],
    runtime: "edge", // for Edge API Routes only
    unstable_allowDynamic: ["/node_modules/**/lodash/**", "/.pnpm/**/node_modules/lodash/*.js"]
};
