import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { useDeps } from "@vta/config";
import { AppConfig } from "./app.config";
import { PathsConfig } from "./paths.config";
import { ExtensionsConfig } from "./extensions.config";
import { EnvConfig } from "./env.config";
import normalizeExtension from "../utils/normalize-extension";
import buildExtensionsRegexp from "../utils/build-extensions-regexp";
import useBabelLoader from "../utils/use-babel-loader";
import useStyleLoader from "../utils/use-style-loader";
import useCssLoader from "../utils/use-css-loader";
import usePostcssLoader from "../utils/use-postcss-loader";
import useLessLoader from "../utils/use-less-loader";
import useUrlLoader from "../utils/use-url-loader";
import InterpolateHtmlPlugin from "../webpack-engine/plugins/interpolate-html-plugin";

export declare type WebpackConfig = Configuration;

const isDev = process.env.NODE_ENV === "development";

export default useDeps<[AppConfig, PathsConfig, EnvConfig, ExtensionsConfig]>(
  ["app", "paths", "env", "extensions"],
  ([appConfig, pathsConfig, envConfig, extensions]) => {
    const envs: { [key: string]: string } = Object.keys(envConfig).reduce((map, key) => {
      map[key] = JSON.stringify(envConfig[key]); // eslint-disable-line
      return map;
    }, {});

    return {
      mode: isDev ? "development" : "production",
      target: "web",
      entry: pathsConfig.entry,
      output: {
        path: pathsConfig.build,
        filename: "bundles/js/[name]-[hash:8].js",
        chunkFilename: "bundles/js/[id]-[contenthash:8].js",
        publicPath: appConfig.publicPath,
      },
      resolve: {
        extensions: extensions.default.map(ext => normalizeExtension(ext)),
      },
      module: {
        rules: [
          {
            test: buildExtensionsRegexp(extensions.babel),
            include: pathsConfig.babel.include,
            exclude: pathsConfig.babel.exclude,
            use: [useBabelLoader()],
          },
          {
            test: /\.modules\.css$/,
            use: [
              useStyleLoader(),
              useCssLoader({ modules: true, importLoaders: 1 }),
              usePostcssLoader(),
            ],
          },
          {
            test: /\.css$/,
            use: [
              useStyleLoader(),
              useCssLoader({ modules: false, importLoaders: 1 }),
              usePostcssLoader(),
            ],
          },
          {
            test: /\.modules\.less$/,
            use: [
              useStyleLoader(),
              useCssLoader({ modules: true, importLoaders: 2 }),
              usePostcssLoader(),
              useLessLoader(),
            ],
          },
          {
            test: /\.less$/,
            use: [
              useStyleLoader(),
              useCssLoader({ modules: false, importLoaders: 2 }),
              usePostcssLoader(),
              useLessLoader(),
            ],
          },
          {
            test: buildExtensionsRegexp([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg"]),
            use: [useUrlLoader()],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: pathsConfig.html,
        }),
        new webpack.DefinePlugin(envs),
        new InterpolateHtmlPlugin(envConfig),
        isDev
          ? undefined
          : new MiniCssExtractPlugin({
              filename: "bundles/css/[name]-[contenthash:8].css",
              chunkFilename: "bundles/css/[id]-[contenthash:8].css",
            }),
      ].filter(plugin => plugin),
      optimization: isDev
        ? undefined
        : {
            minimize: true,
            minimizer: [new TerserJSPlugin({ sourceMap: true }), new OptimizeCSSAssetsPlugin({})],
          },
    } as WebpackConfig;
  },
);
