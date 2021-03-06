import path from "path";
import { Plugin, App } from "vta";
import webpackBuild from "../webpack-engine/build";

/* eslint-disable class-methods-use-this */
export default class WebpackBuildPlugin extends Plugin {
  constructor(autoOpen = true) {
    super("@vta/plugin-webpack/build");
    this.#autoOpen = autoOpen;
  }

  #autoOpen: boolean;

  apply(app: App) {
    app.hooks.run.tapPromise(this.name, (worker) => {
      return webpackBuild(
        worker.resolveConfig("webpack"),
        worker.resolveConfig("webpack-server"),
        path.resolve(app.cwd, app.config.dirs.build),
        this.#autoOpen,
        app.silent,
      );
    });
  }
}
