import { useBase } from "@vta/config";

export default useBase((base) => {
  base.presets.push([require.resolve("@babel/preset-react")]);
  base.plugins.push([require.resolve("@babel/plugin-transform-react-constant-elements")]);
  return {};
});
