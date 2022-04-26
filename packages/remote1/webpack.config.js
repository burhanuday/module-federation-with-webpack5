const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  devServer: {
    hot: true,
    static: path.join(__dirname, "dist"),
    port: 3001,
    liveReload: false,
  },
  output: {
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
          plugins: [require.resolve("react-refresh/babel")],
        },
      },
    ],
  },
  plugins: [
    new MFLiveReloadPlugin({
      container: "remote1",
      port: 3001,
    }),
    new ModuleFederationPlugin({
      name: "remote1",
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: true },
      },
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
        "./Heading": "./src/Heading",
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["main"],
    }),
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/, /bootstrap\.js$/],
    }),
  ],
};
