import { Configuration } from "webpack-dev-server";

export declare type WebpackServerConfig = Configuration;

export default {
  host: "0.0.0.0",
  port: 8088,
  hot: true,
  proxy: {},
} as WebpackServerConfig;
