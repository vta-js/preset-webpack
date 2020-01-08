import chalk from "chalk";
import detectPort from "detect-port";
import clearConsole from "./clear-console";
import askConfirm from "./ask-confirm";

export default function choosePort(
  host: string,
  defaultPort: number,
  silent: boolean,
): Promise<number> {
  return detectPort(defaultPort).then(
    (port: number) => {
      if (defaultPort === port) {
        return port;
      }
      const message =
        defaultPort < 1024
          ? "Admin permissions are required to run a server on a port below 1024."
          : `Something is already running on port ${defaultPort}.`;
      clearConsole();
      if (process.stdout.isTTY) {
        return askConfirm(
          chalk.yellow(`${message}\n\nWould you like to run the app on another port instead?`),
        ).then(confirmed => {
          if (confirmed) {
            return port;
          }
          return undefined;
        });
      }
      if (!silent) {
        clearConsole();
        console.log(chalk.red(message));
      }
      return undefined;
    },
    err => {
      if (!silent) {
        clearConsole();
        console.log(chalk.red(`Could not find an open port at ${chalk.bold(host)}`));
        console.log(`Network error message: ${err.message || err}`);
      }
      return undefined;
    },
  );
}
