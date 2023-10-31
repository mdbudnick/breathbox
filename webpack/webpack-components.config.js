const path = require('path');

const config = {
  mode: 'none',
  entry: {
    header: './src/components/Header.tsx',
    config: './src/components/Config.tsx',
    controlbar: './src/components/ControlBar.tsx',
    breathbox: './src/components/BreathBox.tsx',
    index: './src/components/Index.tsx',
    notfound: './src/components/404.tsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist/components'),
    filename: '[name].jsx'
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
    ]
  }
};

module.exports = config;