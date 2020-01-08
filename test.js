const path = require("path"); // eslint-disable-line
const { run } = require("vta"); // eslint-disable-line

const isDev = true;

process.chdir(path.resolve(__dirname, "./packages/plugin-webpack/plugin-test"));
process.env.NODE_ENV = isDev ? "development" : "production";
process.env.VTA_ENV = isDev ? "development" : "production";
run();
