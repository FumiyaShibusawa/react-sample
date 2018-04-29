const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app',
  output: {
    path: __dirname,
    filename: 'reactjs-[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [node_modules]
  },
  cache: true,
  watch: true
}
