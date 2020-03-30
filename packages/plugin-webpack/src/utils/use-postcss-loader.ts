import { Loader } from "webpack";
import { useDeps } from "@vta/config";

export default function usePostcssLoader(): Loader {
  return {
    loader: require.resolve("postcss-loader"),
    options: useDeps("postcss", (config) => config),
  };
}
