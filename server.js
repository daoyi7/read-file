const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  // webpack-dev-middleware options
  // publicPath: config.output.publicPath
}));

app.use((req, res) => {
  
  res.send('2222')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))