import { useDeps } from "@vta/config";
import { AppConfig } from "./app.config";

export declare interface EnvConfig {
  [key: string]: string | number | boolean;
}

export default useDeps<AppConfig, EnvConfig>("app", (appConfig) => {
  return {
    "process.env.NODE_ENV": process.env.NODE_ENV || "development",
    "process.env.VTA_ENV": process.env.VTA_ENV || "development",
    APP_NAME: appConfig.name,
    APP_VERSION: appConfig.version,
  };
});
