import path from "path";
import { Plugin, App, PrepareHelpers, FsWatcherToRestartPlugin } from "vta";
import PluginWebpackExtensionsResolver from "@vta/plugin-webpack-extensions-resolver";
import WebpackDevPlugin from "./webpack-dev";
import WebpackBuildPlugin from "./webpack-build";
import injectWebpack from "../config/inject/webpack.inject";
import injectWebpackServer from "../config/inject/webpack-server.inject";
import injectPaths from "../config/inject/paths.inject";
import injectApp from "../config/inject/app.inject";
import { ExtensionsConfig } from "../config/extensions.config";

export declare interface Options {
  autoOpen?: boolean;
}

/* eslint-disable class-methods-use-this */
export default class WebpackPlugin extends Plugin {
  constructor(options: Options = {}) {
    super("@vta/plugin-webpack");
    this.options = options;
  }

  private options: Options;

  prepare(helpers: PrepareHelpers) {
    helpers.registFeature("webpack");
    helpers.registPlugin(new PluginWebpackExtensionsResolver());
    helpers.registPlugin(
      process.env.NODE_ENV === "development"
        ? new WebpackDevPlugin()
        : new WebpackBuildPlugin(this.options.autoOpen),
      true,
    );
  }

  apply(app: App) {
    app.hooks.config.init(registDir => {
      registDir(path.resolve(__dirname, "../config"));
    });
    app.hooks.config.itemBaseStart("extensions", () => {
      return {
        "webpack-resolve": PluginWebpackExtensionsResolver.getResolver(app).resolve(
          "webpack-resolve",
        ),
        "babel-loader": PluginWebpackExtensionsResolver.getResolver(app).resolve("babel-loader"),
        "eslint-loader": PluginWebpackExtensionsResolver.getResolver(app).resolve("eslint-loader"),
        "url-loader": PluginWebpackExtensionsResolver.getResolver(app).resolve("url-loader"),
      } as ExtensionsConfig;
    });
    app.hooks.config.itemBaseStart("app", () => ({ cwd: app.cwd }));
    app.hooks.config.itemUserDone("app", () => injectApp());
    app.hooks.config.itemBaseStart("babel", () => ({ cwd: app.cwd }));
    app.hooks.config.itemBaseStart("paths", () => ({
      src: app.config.dirs.src,
      build: app.config.dirs.build,
    }));
    app.hooks.config.itemUserDone("paths", () => injectPaths(app.cwd));
    app.hooks.config.itemUserDone("webpack", () => injectWebpack());
    app.hooks.config.itemUserDone("webpack-server", () => injectWebpackServer(app.cwd));

    app.hooks.run.tap(this.name, worker => {
      FsWatcherToRestartPlugin.watchFile(require.resolve(worker.resolveConfig("paths").theme), app);
    });
  }
}
