import { Loader } from "webpack";

export declare interface Options {
  modules?: boolean;
  importLoaders?: number;
}

export default function useCssLoader(options: Options): Loader {
  return {
    loader: require.resolve("css-loader"),
    options: {
      importLoaders: options?.importLoaders,
      modules: options?.modules
        ? {
            mode: "local",
            localIdentName:
              process.env.NODE_ENV === "development" ? "[path][name]__[local]" : "[hash:base64]",
          }
        : false,
    },
  };
}
