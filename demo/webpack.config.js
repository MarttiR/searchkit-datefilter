var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'app')
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/static'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions:[".js", ".ts", ".tsx", ".webpack.js", ".web.js"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [ 'file-loader?name=[name].[ext]' ]
      }
    ]
  }
};
