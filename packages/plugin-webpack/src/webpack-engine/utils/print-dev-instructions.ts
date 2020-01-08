import chalk from "chalk";
import useYarn from "./use-yarn";

export default function printDevInstructions(
  appName: string,
  urls: { local: string; lan?: string },
  cwd?: string,
) {
  console.log();
  console.log(`You can now view ${chalk.bold(appName)} in the browser.`);
  console.log();
  console.log(`  ${chalk.bold("Local:")}            ${urls.local}`);
  if (urls.lan) {
    console.log(`  ${chalk.bold("On Your Network:")}  ${urls.lan}`);
  }

  console.log();
  console.log("Note that the development build is not optimized.");
  console.log(
    `To create a production build, use ${chalk.cyan(
      `${useYarn(cwd) ? "yarn" : "npm run"} build`,
    )}.`,
  );
  console.log();
}
