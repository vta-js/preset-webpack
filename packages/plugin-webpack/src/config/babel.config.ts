import { useBase, useDeps } from "@vta/config";
import { AppConfig } from "./app.config";
import resolveBabelRuntime from "./utils/resolve-babel-runtime";

/* eslint-disable @typescript-eslint/no-explicit-any */
export declare interface BabelConfig {
  presets: Array<string | [string, object?]>;
  plugins: Array<string | [string, object?]>;
}

export default useBase(({ cwd }) =>
  useDeps<AppConfig, BabelConfig>("app", appConfig => {
    const runtime = resolveBabelRuntime(cwd);
    return {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            targets: appConfig.runtime,
            useBuiltIns: runtime && runtime.installedCoreJs ? "usage" : false,
            corejs: runtime ? runtime.installedCoreJs : undefined,
          },
        ],
      ],
      plugins: (runtime
        ? [
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true,
                corejs: runtime.corejs,
                version: runtime.version,
              },
            ],
          ]
        : []
      ).concat([
        ["@babel/plugin-proposal-optional-chaining"],
        ["@babel/plugin-syntax-dynamic-import"],
      ]),
    } as BabelConfig;
  }),
);
