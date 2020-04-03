module.exports = {
  hot: false,
  proxy: {
    "/api/musicRankings": {
      target: "https://api.apiopen.top",
      pathRewrite: { api: "" },
      secure: false,
    },
  },
};
