const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  return {
    mode: argv.mode,
    devtool: isDevelopment && "cheap-module-source-map",
    entry: './src/ts/main.ts',
    output: {
      path: path.resolve(__dirname, "../www/assets/js/"),
      filename: "bundle.[contenthash:8].js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: isProduction ? "production" : "development"
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader"
          ]
        }
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
  }
}
