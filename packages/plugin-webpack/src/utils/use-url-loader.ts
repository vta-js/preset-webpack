import { Loader } from "webpack";

export default function useUrlLoader(): Loader {
  return {
    loader: require.resolve("url-loader"),
    options: {
      limit: 10240,
      name: "bundles/media/[name]-[contenthash:12].[ext]",
    },
  };
}
