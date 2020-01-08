import { useDeps } from "@vta/config";
import postcssPresetEnv from "postcss-preset-env";
import { AppConfig } from "./app.config";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PostcssConfig {
  ident: string;
  plugins(): any[];
}

export default useDeps<AppConfig, PostcssConfig>("app", appConfig => ({
  ident: "postcss",
  plugins: () => [
    postcssPresetEnv({
      stage: 0,
      browsers: appConfig.runtime,
    }),
  ],
}));
