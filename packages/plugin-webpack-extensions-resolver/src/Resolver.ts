import { App } from "vta";

export declare type ExtCategory =
  | "webpack-resolve"
  | "babel-loader"
  | "eslint-loader"
  | "url-loader"
  | "ts-loader";

declare interface Features {
  Typescript: boolean;
  React: boolean;
}

export default class WebpackExtensionsResolver {
  constructor(app: App) {
    this.#features = {
      Typescript: !!app.getFeature("typescript"),
      React: !!app.getFeature("React"),
    };
  }

  #features: Features;

  #extensions = new Map<ExtCategory, string[]>();

  regist(category: ExtCategory, extension: string | string[]): void {
    if (!this.#extensions.has(category)) {
      this.#extensions.set(category, []);
    }
    const registedExtensions = this.#extensions.get(category);
    (Array.isArray(extension) ? extension : [extension]).forEach((ext) => {
      if (typeof ext === "string") {
        registedExtensions.push(ext);
      }
    });
  }

  resolve(category: ExtCategory): string[] {
    const extensions = this.#getBuiltInExtensions(category);
    if (this.#extensions.has(category)) {
      this.#extensions.get(category).forEach((ext) => {
        extensions.push(ext);
      });
    }
    return extensions;
  }

  #getBuiltInExtensions = (category: ExtCategory): string[] => {
    switch (category) {
      case "webpack-resolve":
        return this.#resolveWebpackResolve();
      case "babel-loader":
        return this.#resolveBabelLoader();
      case "eslint-loader":
        return this.#resolveEslintLoader();
      case "url-loader":
        return this.#resolveUrlLoader();
      case "ts-loader":
        return this.#resolveTsLoader();
      default:
        return [];
    }
  };

  #resolveWebpackResolve = (): string[] => {
    const extensions = ["js"];
    if (this.#features.Typescript) {
      extensions.push("ts");
    }
    if (this.#features.React) {
      extensions.push("jsx");
      if (this.#features.Typescript) {
        extensions.push("tsx");
      }
    }
    return extensions;
  };

  #resolveBabelLoader = (): string[] => {
    const extensions = ["js"];
    if (this.#features.React) {
      extensions.push("jsx");
    }
    return extensions;
  };

  #resolveEslintLoader = (): string[] => {
    const extensions = ["js"];
    if (this.#features.Typescript) {
      extensions.push("ts");
    }
    if (this.#features.React) {
      extensions.push("jsx");
      if (this.#features.Typescript) {
        extensions.push("tsx");
      }
    }
    return extensions;
  };

  #resolveTsLoader = (): string[] => {
    const extensions = ["ts"];
    if (this.#features.React) {
      extensions.push("tsx");
    }
    return extensions;
  };

  /* eslint-disable class-methods-use-this */
  #resolveUrlLoader = (): string[] => {
    const extensions = ["png", "jpg", "jpeg", "gif", "bmp", "svg"];
    return extensions;
  };
}
