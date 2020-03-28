import path from "path";
import { Plugin, PrepareHelpers, App } from "vta";

/* eslint-disable class-methods-use-this */
export default class ReactPlugin extends Plugin {
  constructor() {
    super("@vta/plugin-react");
  }

  prepare(helpers: PrepareHelpers) {
    helpers.registFeature("react");
  }

  apply(app: App) {
    app.hooks.config.init(registDir => {
      registDir(path.resolve(__dirname, "./config"));
    });
  }
}
