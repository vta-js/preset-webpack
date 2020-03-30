import { Compiler } from "webpack";
import HtmlWebpackPlugin, { Hooks } from "html-webpack-plugin";
import escapeStringRegexp from "escape-string-regexp";

export declare interface Replacement {
  [key: string]: string | number | boolean;
}

export default class InterpolateHtmlPlugin {
  constructor(replacements: Replacement) {
    this.replacements = replacements;
  }

  private replacements: Replacement;

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap("InterpolateHtmlPlugin", (compilation) => {
      (HtmlWebpackPlugin as { getHooks?(com: typeof compilation): Hooks })
        .getHooks(compilation)
        .afterTemplateExecution.tap("InterpolateHtmlPlugin", (data) => {
          let { html } = data;
          Object.keys(this.replacements).forEach((key) => {
            const value = this.replacements[key];
            /* eslint-disable no-param-reassign */
            html = html.replace(new RegExp(`%${escapeStringRegexp(key)}%`, "g"), value.toString());
          });
          return { ...data, html };
        });

      return undefined;
    });
  }
}
