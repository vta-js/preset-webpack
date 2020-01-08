import path from "path";
import { useDeps, useBase } from "@vta/config";
import { WebpackServerConfig } from "../webpack-server.config";
import { PathsConfig } from "../paths.config";

export default function injectWebpackServerConfig(cwd: string) {
  return useDeps("paths", (pathsConfig: PathsConfig) =>
    useBase<WebpackServerConfig>(serverConfig => {
      const contentBase: string[] = [];
      if (typeof serverConfig.contentBase === "string") {
        contentBase.push(path.resolve(cwd, serverConfig.contentBase));
      }
      if (Array.isArray(serverConfig.contentBase)) {
        serverConfig.contentBase.forEach(dir => {
          contentBase.push(dir);
        });
      }

      pathsConfig.public.forEach(dir => {
        contentBase.push(dir);
      });

      return {
        contentBase,
        stats: "none",
        logLevel: "silent",
        hotOnly: serverConfig.hot,
        liveReload: false,
      };
    }),
  );
}
