const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/entry/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },{
            loader: 'markdown-loader',
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [' ', '.js', '.json', '.jsx', '.md'],
    alias: {
      container: path.resolve(__dirname, './src/container'),
      utils: path.relative(__dirname, '../src/utils')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'src/entry/index.ejs',
      dll: 'bundle.js'
    })
  ]
}