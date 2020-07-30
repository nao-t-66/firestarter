module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['@babel/polyfill', './develop/assets/scripts/index.js'],
  output: {
    path: __dirname+`/public/assets/scripts/`,
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
