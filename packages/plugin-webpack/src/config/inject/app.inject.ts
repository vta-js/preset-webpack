import { useBase } from "@vta/config";
import { AppConfig } from "../app.config";

export default function injectPathsConfig() {
  return useBase<AppConfig>(config => {
    return {
      publicPath: process.env.NODE_ENV === "development" ? "/" : config.publicPath,
    };
  });
}
