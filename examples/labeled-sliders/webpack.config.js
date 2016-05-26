module.exports = {
  entry: "./main.js",
  output: {
    path: ".",
    filename: "generated-app.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};