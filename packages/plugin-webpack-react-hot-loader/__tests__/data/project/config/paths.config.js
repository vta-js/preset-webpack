const path = require("path");
const { useBase } = require("@vta/config");

const reactTestDirPath = path.relative(
  path.resolve(__dirname, "../"),
  path.resolve(__dirname, "../../../../../plugin-webpack-react/__tests__/data/project"),
);

module.exports = useBase((config) => {
  return {
    public: [`${reactTestDirPath}/public`],
    html: `${reactTestDirPath}/public/index.html`,
    theme: `${reactTestDirPath}/theme`,
    babel: {
      include: config.babel.include.concat([`${reactTestDirPath}/src`]),
    },
    sources: config.sources.concat([`${reactTestDirPath}/src`]),
  };
});
