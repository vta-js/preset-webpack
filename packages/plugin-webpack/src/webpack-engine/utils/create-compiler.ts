import webpack, { Configuration, Compiler } from "webpack";
import StatsPrintor from "./Stats-Printor";

export default function createCompiler(
  config: Configuration,
  statsPrintor: StatsPrintor,
): Promise<Compiler> {
  return new Promise((resolve, reject) => {
    try {
      const compiler = webpack(config);

      compiler.hooks.invalid.tap("invalid", () => {
        statsPrintor.printCompiling();
      });

      compiler.hooks.done.tap("done", (stats) => {
        statsPrintor.print(stats);
      });

      resolve(compiler);
    } catch (err) {
      reject(err);
    }
  });
}
