const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const dependencies = require("./package.json").dependencies;

module.exports = (_, argv) => {
  const isDev = argv.mode === "development";

  return {
    devtool: "source-map",
    entry: "./src/index.ts",
    optimization: {
      minimize: false,
    },
    devServer: {
      hot: true,
      static: path.join(__dirname, "dist"),
      port: 3001,
      liveReload: false,
      allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
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
          use: ["style-loader", "css-loader"],
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
        exposes: {
          "./RemoteCounter": "./src/RemoteCounter",
        },
      }),
      // allows usage of dynamic remote urls
      new ExternalTemplateRemotesPlugin(),
    ].filter(Boolean),
  };
};
