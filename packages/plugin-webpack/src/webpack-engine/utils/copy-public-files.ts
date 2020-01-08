import fse from "fs-extra";

export default function copyPublicFiles(contentDirs: string[], buildDir: string): Promise<void> {
  return Promise.all(contentDirs.map(dir => fse.copy(dir, buildDir, { dereference: true }))).then(
    () => undefined,
  );
}
