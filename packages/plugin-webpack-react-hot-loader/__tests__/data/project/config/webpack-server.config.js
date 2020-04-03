module.exports = {
  hot: true,
  proxy: {
    "/api/musicRankings": {
      target: "https://api.apiopen.top",
      pathRewrite: { api: "" },
      secure: false,
    },
  },
};
