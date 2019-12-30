module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "commonjs",
        useBuiltIns: "usage",
        corejs: 3,
        targets: {
          node: "10.16.0",
        },
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", { corejs: false, version: "7.7.7" }],
    ["@babel/plugin-proposal-optional-chaining"],
  ],
};
