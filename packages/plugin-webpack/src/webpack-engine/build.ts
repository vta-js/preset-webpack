import chalk from "chalk";
import fse from "fs-extra";
import { Configuration } from "webpack";
import { Configuration as ServerConfiguration } from "webpack-dev-server";
import createCompiler from "./utils/create-compiler";
import StatsPrintor from "./utils/Stats-Printor";
import printBuildInstructions from "./utils/print-build-instructions";
import askConfirm from "./utils/ask-confirm";
import copyPublicFiles from "./utils/copy-public-files";

export default async function build(
  config: Configuration,
  serverConfig: ServerConfiguration,
  buildDir: string,
  silent?: boolean,
): Promise<void> {
  fse.emptyDirSync(buildDir);

  if (!silent) {
    console.log("Creating an optimized production build...");
  }

  const compiler = await createCompiler(
    config,
    new StatsPrintor(() => {
      printBuildInstructions(config.output.publicPath, buildDir);
    }, silent),
  );

  await copyPublicFiles(serverConfig.contentBase as string[], buildDir);

  await new Promise((resolve, reject) => {
    compiler.run(err => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });

    process.on("SIGINT", () => {
      askConfirm(chalk.yellow("Would you want to stop the webpack building?")).then(confirmed => {
        if (confirmed) {
          reject(new Error(`webpack building stopped by signal ${chalk.yellow("SIGINT")}`));
        }
      });
    });
  });
}
