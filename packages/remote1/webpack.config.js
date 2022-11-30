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
    // entry point name should match name in module federation plugin
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
          // MiniCssExtract breaks with module federation in dev mode
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
      // Used for automatic reloads. container should match
      // name of the current project
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
        // should match entry point name
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
        // avoid exporting as remoteEntry.js May cause confusion
        filename: "remote1.remoteEntry.js",
        remotes: {
          // hostUrl is set on window of host
          host: "host@[hostUrl]/host.remoteEntry.js",
        },
        exposes: {
          "./Button": "./src/Button",
          "./Heading": "./src/Heading",
        },
      }),
      // allows usage of dynamic remote urls
      new ExternalTemplateRemotesPlugin(),
      new MiniCssExtractPlugin(),
    ].filter(Boolean),
  };
};
