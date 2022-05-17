const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");

// commonJS module defines the visible interface through module property exports
// We export function rather then object to enable changing mode
// behaviour from within webpack.config
// https://webpack.js.org/configuration/mode
module.exports = (env, argv) => ({
  entry: {
    //Root of dependency graph
    //__dirname is current directory
    app: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    // bundle to this file
    filename: "[name].bundle.js",
    clean: true,
    //at path
    path: path.resolve(__dirname, "dist"),
  },
  mode: argv.mode === "development" ? "development" : "production",
  devtool: argv.mode === "development" ? "eval-cheap-module-source-map" : false,
  devServer: {
    //serve content from src folder
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: [/node_modules/],
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: argv.mode === "production",
        },
      },
      {
        test: [/.\vert/, /\.frag/],
        use: "raw-loader",
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new DefinePlugin({
      DEV: argv.mode === "development",
      WEBGL_RENDER: true,
      CANVAS_RENDER: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // every file inside assets folder
          from: "assets/*",
          context: "",
        },
        {
          // every file inside assets-src folder
          from: "assets-src/*",
          context: "",
        },
      ],
    }),
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
});
