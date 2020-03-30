import { useBase, useDeps } from "@vta/config";
import { WebpackConfig } from "../webpack.config";
import { ExtensionsConfig } from "../extensions.config";
import { PathsConfig } from "../paths.config";
import buildExtensionsRegexp from "../../utils/build-extensions-regexp";
import useFileLoader from "../../utils/use-file-loader";

export default function injectWebpackConfig() {
  return useDeps<[ExtensionsConfig, PathsConfig]>(
    ["extensions", "paths"],
    ([extensions, pathsConfig]) =>
      useBase<WebpackConfig>((config) => {
        const rules = [];
        if (process.env.NODE_ENV === "development") {
          rules.push({
            test: buildExtensionsRegexp(extensions["eslint-loader"]),
            include: pathsConfig.src,
            enforce: "pre",
            loader: require.resolve("eslint-loader"),
          });
        }
        rules.push({
          oneOf: config.module.rules.concat([
            { include: [pathsConfig.src], use: [useFileLoader()] },
          ]),
        });
        return {
          module: {
            rules,
          },
        };
      }),
  );
}
