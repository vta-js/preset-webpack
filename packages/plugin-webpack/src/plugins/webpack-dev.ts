import chalk from "chalk";
import { Plugin, App } from "vta";
import webpackDev from "../webpack-engine/dev";
// import askConfirm from "../webpack-engine/utils/ask-confirm";

/* when run from package.json's script, now always exit due to npm or yarn implements */
function askConfirm(message: string): Promise<boolean> {
  return Promise.resolve(!!message);
}

/* eslint-disable class-methods-use-this */
export default class WebpackDevPlugin extends Plugin {
  constructor() {
    super("@vta/plugin-webpack/dev");
  }

  apply(app: App) {
    let closeServer: () => Promise<void>;
    app.hooks.run.tapPromise(this.name, (worker) => {
      return webpackDev(
        worker.resolveConfig("webpack"),
        worker.resolveConfig("webpack-server"),
        worker.resolveConfig("app").name,
        app.silent,
      ).then(({ close }) => {
        closeServer = close;
        return new Promise((resolve) => {
          process.on("SIGINT", () => {
            askConfirm(chalk.yellow("Would you want to stop the webpack dev server?")).then(
              (confirmed) => {
                if (confirmed) {
                  closeServer().then(() => {
                    resolve();
                  });
                }
              },
            );
          });
        });
      });
    });

    app.hooks.restart.tapPromise(this.name, () => {
      process.removeAllListeners("SIGINT");
      return typeof closeServer === "function" ? closeServer() : Promise.resolve();
    });
  }
}
