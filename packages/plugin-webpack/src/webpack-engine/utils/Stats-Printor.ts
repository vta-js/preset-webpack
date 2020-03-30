import chalk from "chalk";
import { Stats } from "webpack";
import clearConsole from "./clear-console";
import formatWebpackMessages from "./format-webpack-message";

const isDev = process.env.NODE_ENV === "development";

export default class StatsPrintor {
  constructor(printInstruction: () => void, silent?: boolean) {
    this.#printInstruction = printInstruction;
    this.#silent = silent;
  }

  #printInstruction: () => void;

  #silent: boolean;

  print(stats: Stats) {
    if (this.#silent) return;

    clearConsole();

    const messages = formatWebpackMessages(stats.toJson({}, true));

    if (messages.errors.length) {
      // Only keep the first error
      messages.errors.length = 1;
      console.log(chalk.red("Failed to compile.\n"));
      console.log(messages.errors.join("\n\n"));
      if (!isDev) {
        process.exit(0);
      }
      return;
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow("Compiled with warnings.\n"));
      console.log(messages.warnings.join("\n\n"));
      console.log(chalk.yellow("\n\nCompiled with warnings."));
    } else {
      console.log(chalk.green("Compiled successfully!"));
    }
    if (typeof this.#printInstruction === "function") {
      this.#printInstruction();
    }
  }

  printCompiling() {
    if (this.#silent) return;

    clearConsole();

    console.log("Compiling...");
  }
}
