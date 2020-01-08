import "./polyfill";
import App from "./app";

App();

if (module.hot) {
  module.hot.accept("./app", () => {
    require("./app").default(); // eslint-disable-line
    // App(); // only has effect when @babel/preset-env target is false
  });
}
