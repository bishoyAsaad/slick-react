const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    './demo/src/app.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: './dist'
  },
  mode: 'production'
};

module.exports = config;