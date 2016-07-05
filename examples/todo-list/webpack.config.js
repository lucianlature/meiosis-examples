/*global process*/
var isProduction = process.env.NODE_ENV === "production";
var webpack = require("webpack");

module.exports = {
  entry: "./app.js",
  devtool: "source-map",
  output: {
    path: ".",
    filename: isProduction ? "generated-app.min.js" : "generated-app.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: isProduction ? [
    new webpack.optimize.UglifyJsPlugin()
  ] : []
};
