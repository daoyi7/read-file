const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  // publicPath: config.output.publicPath,
  serverSideRender: true
}))

app.use((req, res) => {
  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName

  const normalizeAssets = (assets) => {
    return Array.isArray(assets) ? assets : [assets]
  }
  console.log(assetsByChunkName)
  res.send(`
  <html>
  <head>
    <title>Read File</title>
		${normalizeAssets(assetsByChunkName.main)
      .filter(path => path.endsWith('.css'))
      .map(path => `<link rel="stylesheet" href="${path}" />`)
      .join('\n')}
  </head>
  <body>
    <div id="root"></div>
		${normalizeAssets(assetsByChunkName.main)
      .filter(path => path.endsWith('.js'))
      .map(path => `<script src="${path}"></script>`)
      .join('\n')}
  </body>
</html>
  `)

})

app.listen(9999, () => {
  console.log('Example app listening on port 9999!\n')
})