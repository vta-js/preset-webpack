import path from "path";
import { loadModuleSync } from "@vta/helpers";

/* eslint-disable global-require,import/no-dynamic-require */

function resolveVersion(packageJson, pkg) {
  const version = (packageJson.dependencies || {})[pkg];
  if (!version) return null;
  const matches = /^[^\d]*(\d+\.\d+\.\d+)[^\d]*/.exec(version);
  if (matches) {
    return matches[1];
  }
  return null;
}

export declare type CoreJs = 3 | 2 | false;

export default function resolveBabelRuntime(
  cwd: string,
): { runtime: string; version: string; corejs: CoreJs; installedCoreJs: CoreJs } {
  const packageJson = loadModuleSync(path.resolve(cwd, "./package.json"), {});

  const runtimes = [
    { runtime: "@babel/runtime-corejs3", version: "7.0.0", corejs: 3, installedCoreJs: undefined },
    { runtime: "@babel/runtime-corejs2", version: "7.0.0", corejs: 2, installedCoreJs: undefined },
    { runtime: "@babel/runtime", version: "7.0.0", corejs: false, installedCoreJs: undefined },
  ];
  let runtime = null;
  for (let i = 0, len = runtimes.length; i < len; i += 1) {
    const version = resolveVersion(packageJson, runtimes[i].runtime);
    if (version) {
      runtime = runtimes[i];
      runtime.version = version;
      break;
    }
  }

  if (runtime) {
    if (runtime.corejs === false) {
      const corejsVersion = resolveVersion(packageJson, "core-js");
      if (corejsVersion) {
        runtime.installedCoreJs = parseInt(corejsVersion.split(".")[0], 10);
      } else {
        runtime.installedCoreJs = undefined;
      }
    } else {
      runtime.installedCoreJs = undefined;
    }
  }
  return runtime;
}
