const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  devServer: {
    hot: true,
    static: path.join(__dirname, "dist"),
    port: 3000,
    historyApiFallback: {
      index: "/index.html",
    },
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
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote1: "remote1@[remote1Url]/remoteEntry.js",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: true },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/, /bootstrap\.js$/],
    }),
  ],
};
