import { Plugin, App } from "vta";
import { useDeps } from "@vta/config";
import { addEntries } from "@vta/plugin-webpack";

export default class PluginWebpackReactHotLoader extends Plugin {
  constructor() {
    super("@vta/plugin-webpack-react-hot-loader");
  }

  /* eslint-disable class-methods-use-this */
  apply(app: App) {
    app.hooks.config.itemUserDone("babel", (config) =>
      useDeps("webpack-server", (serverConfig) => {
        if (serverConfig.hot) {
          return { plugins: config.plugins.concat([require.resolve("react-hot-loader/babel")]) };
        }
        return undefined;
      }),
    );
    app.hooks.config.itemUserDone("webpack", (config) =>
      useDeps("webpack-server", (serverConfig) => {
        if (serverConfig.hot) {
          addEntries(config, [require.resolve("react-hot-loader/patch")]);
          return {
            resolve: {
              alias: {
                "react-dom": require.resolve("@hot-loader/react-dom"),
              },
            },
          };
        }
        return undefined;
      }),
    );
  }
}
