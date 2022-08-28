const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './data/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js'
  },

  devServer: {
    port: 3000,
    static:{
     watch: true
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
}