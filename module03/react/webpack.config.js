const path = require("path");

module.exports = {
  // entry: 'src/index.js', //this is the entry file of our project
  entry: path.resolve(__dirname, "src", "index.js"), // Windows will not accept paths like last line (src/index.js)
  output: {
    // indicating where our bundle will be stored after processed
    // create public folder
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  devServer: {
    // configuring webpack-dev-server
    contentBase: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      // awe can put may rules here in each object
      // not only for JS, but CSS, HTML, etc. as well
      {
        // RULE 1: Anytime that webpack find JS, Babel will transpile it
        test: /\.js$/,
        exclude: /node_modules/, // this folder will be ignored
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
