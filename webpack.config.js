const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'none',
  entry: './src/tsx/main.tsx',
  output: {
    path: path.resolve(__dirname, 'www/assets/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
};

module.exports = config;