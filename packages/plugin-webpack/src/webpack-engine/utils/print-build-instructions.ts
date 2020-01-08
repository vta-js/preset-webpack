import chalk from "chalk";

export default function printBuildInstructions(publicPath: string, buildDir: string) {
  console.log();
  console.log("The project was built assuming it is hosted at ", chalk.green(publicPath));
  console.log(
    "You can control this with the ",
    chalk.green("publicPath"),
    ` option in ${chalk.cyan("app.config.js")}.`,
  );
  console.log();
  console.log("The next line's folder is ready to be deployed.");
  console.log(chalk.cyan(buildDir));
  console.log();
}
