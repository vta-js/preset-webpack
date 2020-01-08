import { Loader } from "webpack";
import { useDeps } from "@vta/config";
import { loadModuleSync } from "@vta/helpers";
import { PathsConfig } from "../config/paths.config";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function useLessLoader(): Loader {
  return useDeps("paths", (pathsConfig: PathsConfig) => {
    return {
      loader: require.resolve("less-loader"),
      options: {
        modifyVars: loadModuleSync(pathsConfig.theme, {}),
        javascriptEnabled: true,
        paths: pathsConfig.lessPaths,
      },
    };
  }) as any;
}
