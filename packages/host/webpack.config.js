const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dependencies = require("./package.json").dependencies;

module.exports = (_, argv) => ({
  // entry point name should match name in module federation plugin
  entry: { host: "./src/index.ts" },
  mode: "development",
  devtool: "source-map",
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
  optimization: {
    /**
     * Module federation breaks when setting runtimeChunk to single
     * In the future - https://github.com/module-federation/concat-runtime
     */
    // runtimeChunk: 'single',
    minimize: true,
    moduleIds: "named",
    chunkIds: "named",
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: new RegExp(
            /[\\/]node_modules[\\/](?!(html2canvas|d3|@mikecousins|@bundled-es-modules|chart.js|react-chartjs-2|react-virtualized|react-dates|crypto-js))/
          ),
          chunks: "all",
          name: "vendor",
          enforce: true,
          priority: 20,
        },
        common: {
          name: "common",
          minChunks: 3,
          reuseExistingChunk: true,
          enforce: true,
          priority: 10,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // MiniCssExtract breaks with module federation in dev mode
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
    // new MFLiveReloadPlugin({
    //   container: "host",
    //   port: 3000,
    // }),
    new ModuleFederationPlugin({
      name: "host",
      // avoid exporting as remoteEntry.js May cause confusion
      filename: "host.remoteEntry.js",
      // remote1Url is set on window
      remotes: {
        remote1: "remote1@[remote1Url]/remote1.remoteEntry.js",
      },
      exposes: {},
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
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
    argv.mode === "development" &&
      new ReactRefreshWebpackPlugin({
        exclude: [/node_modules/, /bootstrap\.js$/],
      }),
  ].filter(Boolean),
});
