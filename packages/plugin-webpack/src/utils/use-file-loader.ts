import { Loader } from "webpack";

export default function useFileLoader(): Loader {
  return {
    loader: require.resolve("file-loader"),
    options: {
      name: "bundles/file/[name]-[contenthash:12].[ext]",
    },
  };
}
