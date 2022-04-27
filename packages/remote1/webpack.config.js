const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dependencies = require("./package.json").dependencies;

module.exports = (_, argv) => {
  const isDev = argv.mode === "development";

  return {
    devtool: "source-map",
    entry: { remote1: "./src/index.ts" },
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
          test: /\.css$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.(ts|js)x?$/i,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
            plugins: [isDev && require.resolve("react-refresh/babel")].filter(
              Boolean
            ),
          },
        },
      ],
    },
    plugins: [
      isDev &&
        new MFLiveReloadPlugin({
          container: "remote1",
          port: 3001,
        }),
      isDev &&
        new ReactRefreshWebpackPlugin({
          exclude: [/node_modules/, /bootstrap\.js$/],
        }),
      new ModuleFederationPlugin({
        name: "remote1",
        shared: {
          ...dependencies,
          react: { singleton: true, requiredVersion: dependencies.react },
          "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: dependencies["react-router-dom"],
          },
        },
        filename: "remote1.remoteEntry.js",
        remotes: {
          host: "host@[hostUrl]/host.remoteEntry.js",
        },
        exposes: {
          "./Button": "./src/Button",
          "./Heading": "./src/Heading",
          "./Controls": "./src/Controls",
        },
      }),
      new ExternalTemplateRemotesPlugin(),
      new MiniCssExtractPlugin(),
    ].filter(Boolean),
  };
};
