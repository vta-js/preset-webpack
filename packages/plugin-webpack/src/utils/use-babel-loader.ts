import { Loader } from "webpack";
import { useDeps } from "@vta/config";

export default function useBabelLoader(): Loader {
  return {
    loader: require.resolve("babel-loader"),
    options: useDeps("babel", config => config),
  };
}
