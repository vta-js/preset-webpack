import path from "path";
import { Plugin, App, PrepareHelpers, FsWatcherToRestartPlugin } from "vta";
import WebpackDevPlugin from "./webpack-dev";
import WebpackBuildPlugin from "./webpack-build";
import injectWebpack from "../config/inject/webpack.inject";
import injectWebpackServer from "../config/inject/webpack-server.inject";
import injectPaths from "../config/inject/paths.inject";
import injectApp from "../config/inject/app.inject";
import { ExtensionsConfig } from "../config/extensions.config";

export declare type ExtCategory = keyof ExtensionsConfig;

export declare interface FeatureOptions {
  registExtension(category: ExtCategory, extension: string | string[]): void;
}

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

  private extensions = new Map<ExtCategory, string[]>();

  private registExtension(category: ExtCategory, extension: string | string[]) {
    if (!this.extensions.has(category)) {
      this.extensions.set(category, []);
    }
    if (typeof extension === "string") {
      this.extensions.get(category).push(extension);
    }
    if (Array.isArray(extension)) {
      extension.forEach(ext => {
        this.extensions.get(category).push(ext);
      });
    }
  }

  prepare(helpers: PrepareHelpers) {
    this.registExtension("default", "js");
    this.registExtension("eslint", "js");
    this.registExtension("babel", ["js"]);
    helpers.registFeature<FeatureOptions>("webpack", {
      registExtension: this.registExtension.bind(this),
    });
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
        default: this.extensions.get("default"),
        babel: this.extensions.get("babel"),
        eslint: this.extensions.get("eslint"),
        typescript: this.extensions.get("typescript"),
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

    /* eslint-disable @typescript-eslint/no-explicit-any */
    app.hooks.run.tap(this.name, (worker: any) => {
      FsWatcherToRestartPlugin.watchFile(require.resolve(worker.resolveConfig("paths").theme), app);
    });
  }
}
