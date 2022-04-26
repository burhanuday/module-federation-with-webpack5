const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dependencies = require("./package.json").dependencies;

module.exports = (_, argv) => ({
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
        test: /\.css$/i,
        use: [
          argv.mode === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.(ts|js)x?$/i,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
          plugins: [
            argv.mode === "development" &&
              require.resolve("react-refresh/babel"),
          ].filter(Boolean),
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
      filename: "remoteEntry.js",
      remotes: {
        host: "host@[hostUrl]/remoteEntry.js",
      },
      exposes: {
        "./Button": "./src/Button",
        "./Heading": "./src/Heading",
        "./Controls": "./src/Controls",
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new MiniCssExtractPlugin(),
    argv.mode === "development" &&
      new ReactRefreshWebpackPlugin({
        exclude: [/node_modules/, /bootstrap\.js$/],
      }),
  ].filter(Boolean),
});
