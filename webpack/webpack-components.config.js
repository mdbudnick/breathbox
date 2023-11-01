const path = require('path');

const config = {
  mode: 'none',
  entry: {
    Config: './src/components/Config.tsx',
    ControlBar: './src/components/ControlBar.tsx',
    BreathBox: './src/components/BreathBox.tsx',
    App: './src/components/App.tsx',
    PageNotFound: './src/components/PageNotFound.tsx',
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