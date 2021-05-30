const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const path = require('path')

const webpackPlugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html'),
    filename: 'index.html',
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: './src/manifest.json', to: '' }
    ]
  })
]

if ('production' === process.env.NODE_ENV) {
  webpackPlugins.push(new InjectManifest({
    swSrc: './src/src-sw.js',
    swDest: 'sw.js',
  }));
}

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    historyApiFallback: {
      disableDotRule: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
      {
        test: /\.s[c]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: [{
          loader: "file-loader",
          options: {
            limit: 25000,
          }
        }]
      },
    ],
  },
  plugins: webpackPlugins,
}
