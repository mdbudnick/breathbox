const path = require('path')

const config = {
  mode: 'none',
  entry: './src/ts/main.ts',
  output: {
    path: path.resolve(__dirname, '../www/assets/js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}

module.exports = config
