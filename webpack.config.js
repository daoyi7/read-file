const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/entry/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
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
    new webpack.HotModuleReplacementPlugin()
  ],
  // devServer: {
  //   host: '0.0.0.0',
  //   port: '8888',
  //   hot: true,
  //   inline: true,
  //   historyApiFallback: true,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3000"
  //     }
  //   }
  // }
}