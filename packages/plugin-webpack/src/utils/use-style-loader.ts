import { Loader } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function useLessLoader(): Loader {
  if (process.env.NODE_ENV === "development") {
    return { loader: require.resolve("style-loader"), options: {} };
  }
  return {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "../../",
    },
  };
}
