const { resolve } = require("path");

module.exports = {
  devtool: false,
  mode: "development",
  entry: "./index.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          require.resolve("z-test/node_modules/css-loader"),
        ],
      },
    ],
  },
  plugins: [
    new (class {
      apply(compiler) {
        compiler.hooks.watchRun.tap(
          "WatchRunPlugin",
          ({ modifiedFiles, removedFiles }) => {
            console.log({ modifiedFiles, removedFiles });
          }
        );
      }
    })(),
  ],
  cache: {
    type: "filesystem",
    maxMemoryGenerations: 1,
  },
};
