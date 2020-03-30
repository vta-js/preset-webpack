import { Configuration } from "webpack";
import WebpackDevServer, { Configuration as ServerConfiguration } from "webpack-dev-server";
import choosePort from "./utils/choose-port";
import prepareUrls from "./utils/prepare-urls";
import StatsPrintor from "./utils/Stats-Printor";
import printDevInstructions from "./utils/print-dev-instructions";
import createCompiler from "./utils/create-compiler";
import openBrowser from "./utils/open-browser";

export default async function dev(
  config: Configuration,
  serverConfig: ServerConfiguration,
  appName: string,
  silent?: boolean,
): Promise<{ close(): Promise<void> }> {
  const protocol = serverConfig.https ? "https" : "http";
  const host = serverConfig.host || "localhost";
  const port = await choosePort(serverConfig.host, serverConfig.port || 8088, silent);
  const usedServerConfig: ServerConfiguration = {
    ...serverConfig,
    host,
    port,
    publicPath: config.output.publicPath,
  };
  const urls = prepareUrls(protocol, host, port);
  if (serverConfig.hot) {
    WebpackDevServer.addDevServerEntrypoints(config, usedServerConfig);
  }

  if (!silent) {
    console.log("Starting the development server...\n");
  }
  const compiler = await createCompiler(
    config,
    new StatsPrintor(() => {
      printDevInstructions(appName, urls);
    }),
  );
  compiler.hooks.done.tap("openBrowser", () => {
    if (process.env["@vta/plugin-webpack/hasOpenBrowser"] !== "true") {
      openBrowser(urls.local);
      process.env["@vta/plugin-webpack/hasOpenBrowser"] = "true";
    }
  });

  const server = new WebpackDevServer(compiler, usedServerConfig);
  server.listen(port, host, () => undefined);

  return {
    close() {
      return new Promise((resolve) => {
        server.close(() => {
          resolve();
        });
      });
    },
  };
}
