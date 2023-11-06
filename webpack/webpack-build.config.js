const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const svgToMiniDataURI = require('mini-svg-data-uri')

module.exports = function (_env, argv) {
  const isProduction = argv.mode === 'production'
  const isDevelopment = !isProduction

  return {
    mode: argv.mode,
    devtool: isDevelopment && 'cheap-module-source-map',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, '../www/'),
      filename: 'assets/js/bundle.js',
      publicPath: isProduction ? '/' : '/www/',
      assetModuleFilename: 'assets/img/[name][ext]'
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
            envName: isProduction ? 'production' : 'development',
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(jpg|png|gif)$/,
          type: 'asset',
        },
        {
          test: /\.svg/,
          type: 'asset/inline',
         generator: {
           dataUrl: content => {
             content = content.toString();
             return svgToMiniDataURI(content);
           }
         }
        }
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProduction ? 'production' : 'development'
        ),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        inject: true,
      }),
      new MiniCssExtractPlugin(),
    ].filter(Boolean),
  }
}
