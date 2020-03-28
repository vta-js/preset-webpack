import { Plugin, App } from "vta";
import Resolver from "./Resolver";

const MAP_APP = new Map<App, Resolver>();

export default class PluginWebpackExtensionsResolver extends Plugin {
  constructor() {
    super("@vta/plugin-webpack-extensions-resolver");
  }

  static getResolver(app: App): Resolver {
    return MAP_APP.has(app) ? MAP_APP.get(app) : null;
  }

  /* eslint-disable class-methods-use-this */
  apply(app: App) {
    if (MAP_APP.has(app)) {
      return;
    }
    MAP_APP.set(app, new Resolver(app));
  }
}
