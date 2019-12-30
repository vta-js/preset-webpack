const env = process.env.VTA_ENV;

module.exports = {
  plugins: [
    [
      "@vta/monorepo",
      {
        filesToCopy: ["LICENSE"].concat(
          [".npmignore", "babel.config.js", "tsconfig.build.json"].map(file => ({
            src: `./config/shared-files/${file}`,
            dest: file,
          })),
        ),
        publish: env === "publish",
      },
    ],
    ["@vta/monorepo-builder-tsc", { options: { project: "tsconfig.build.json" } }],
  ],
};
