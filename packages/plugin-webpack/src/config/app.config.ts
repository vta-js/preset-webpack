import path from "path";
import { useBase } from "@vta/config";
import { loadModuleSync } from "@vta/helpers";

export declare interface AppConfig {
  name?: string;
  version?: string;
  /**
   * publicPath of webpack's output.publicPath. it always to be / if developement
   * [output.publicPath](https://webpack.js.org/configuration/output/#outputpublicpath)
   */
  publicPath?: string;
  /**
   * browserslist of support runtime
   * [browserslits](https://github.com/browserslist/browserslist#readme)
   */
  runtime?: string[];
}

export default useBase<AppConfig & { cwd: string }, AppConfig>(({ cwd }) => {
  const packageJson = loadModuleSync(path.resolve(cwd, "package.json"), {
    name: "Webpack App",
    version: "0.0.0",
  });
  return {
    name: packageJson.name,
    version: packageJson.version,
    publicPath: "./",
    runtime: undefined,
  };
});
