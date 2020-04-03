const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@vta/react-test": path.resolve(
        __dirname,
        "../../../../../plugin-webpack-react/__tests__/data/project/src",
      ),
    },
  },
};
