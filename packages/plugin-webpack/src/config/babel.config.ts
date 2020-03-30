import { useBase, useDeps } from "@vta/config";
import { AppConfig } from "./app.config";
import resolveBabelRuntime from "./utils/resolve-babel-runtime";

export declare interface BabelConfig {
  presets: Array<string | [string, object?]>;
  plugins: Array<string | [string, object?]>;
}

/* eslint-disable global-require */
export default useBase(({ cwd }) =>
  useDeps<AppConfig, BabelConfig>("app", (appConfig) => {
    const runtime = resolveBabelRuntime(cwd);
    return {
      presets: [
        [
          require.resolve("@babel/preset-env"),
          {
            modules: false,
            targets: appConfig.runtime,
            useBuiltIns: runtime && runtime.installedCoreJs ? "usage" : false,
            corejs: runtime ? runtime.installedCoreJs : undefined,
          },
        ],
      ],
      plugins: [
        runtime
          ? [
              require.resolve("@babel/plugin-transform-runtime"),
              {
                useESModules: true,
                corejs: runtime.corejs,
                version: runtime.version,
              },
            ]
          : undefined,
      ].filter((plugin) => plugin),
    } as BabelConfig;
  }),
);
