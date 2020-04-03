import { Plugin, PrepareHelpers } from "vta";
import PluginSyntaxReact from "@vta/plugin-syntax-react";

export default class PluginWebpackReact extends Plugin {
  constructor() {
    super("@vta/plugin-webpack-react");
  }

  /* eslint-disable class-methods-use-this */
  prepare(helpers: PrepareHelpers) {
    helpers.registPlugin(new PluginSyntaxReact());
  }
}
