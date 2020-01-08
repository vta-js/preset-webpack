import path from "path";
import { fileExistsSync } from "@vta/helpers";

export default function useYarn(cwd = process.cwd()): boolean {
  return fileExistsSync(path.resolve(cwd, "./yarn.lock"));
}
