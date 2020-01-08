import { resolve } from "path";
import { useBase } from "@vta/config";

export declare type Path = string | Array<Path> | { [key: string]: Path };

function injectPath(path: Path, cwd: string): Path {
  if (!path) return undefined;
  if (typeof path === "string") {
    return resolve(cwd, path);
  }
  if (Array.isArray(path)) {
    return path.map(p => injectPath(p, cwd));
  }
  Object.keys(path).forEach(key => {
    /* eslint-disable no-param-reassign */
    path[key] = injectPath(path[key], cwd);
  });
  return path;
}

export default function injectPathsConfig(cwd: string) {
  return useBase(config => {
    return injectPath(config, cwd) as unknown;
  });
}
