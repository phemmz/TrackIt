const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const webpackCommonConfig = require('./webpack.common');

module.exports = merge(webpackCommonConfig, {
  output: {
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  ],
  devtool: "source-map",
  devServer: {
    port: 3000,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './src'),
    hot: true,
    publicPath: '/',
    watchContentBase: true,
    overlay: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }
  }
});
