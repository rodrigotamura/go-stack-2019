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
      },
      // loader for CSS
      {
        test: /\.css$/,
        use: [
          // imports CSS files (imported in our JS files) and will throw in a <style> tag in the header of /public/index.html
          { loader: "style-loader" },

          // CSS can have another imports, like images (background: url('image.png'))
          // or @import './another-css-files',
          // and 'css-loader' will resolve these inner importations
          { loader: "css-loader" }
        ]
      },

      // loading images
      {
        test: /\.(gif|jpe?g|svg|png)$/i,
        // ? symbol in 'jpe?g' means that is acceptable 'jpg' or 'jpeg'
        // i means case insensitive
        use: {
          loader: "file-loader"
        }
      }
    ]
  }
};
