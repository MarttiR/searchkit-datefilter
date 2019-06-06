const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  mode: 'production',
  entry: {
    "bundle":['./src/index.ts', './theming/index.ts']
  },
  output: {
    path: path.join(__dirname, 'release'),
    filename: '[name].js',
    library: 'searchkit-datefilter',
    libraryTarget: 'umd',
    publicPath: '',
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".webpack.js", ".web.js", ".scss"],
    alias: {
      'searchkit': path.resolve(path.join(process.cwd(), 'node_modules', 'searchkit'))
    }
  },
  plugins: [
    new ExtractTextPlugin("theme.css", { allChunks: true })
  ],
  externals: [
    'react',
    'react-dom',
    'lodash',
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        include: [path.join(__dirname, 'src'),path.join(__dirname, 'theming')]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ]
        }),
        include: path.join(__dirname, 'theming')
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract( {
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
          ]
        }),
      }
    ]
  }
};
