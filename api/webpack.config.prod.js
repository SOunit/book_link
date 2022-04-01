const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const { IgnorePlugin } = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },
  target: 'node',
  devtool: 'none',
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(),
    new IgnorePlugin({
      resourceRegExp: /^pg-native$/,
    }),
  ],
};
