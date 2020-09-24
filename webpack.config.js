const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

module.exports = {
  mode,
  entry: {
    'core-js': 'core-js/stable',
    'regenerator-runtime': 'regenerator-runtime/runtime',
    newtab: path.resolve(__dirname, './src/pages/newtab/index.js'),
    options: path.resolve(__dirname, './src/pages/options/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  devtool: 'hidden-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, './src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },

      {
        test: /\.less$/,
        include: path.join(__dirname, './src'),
        use: [
          isDev ? { loader: 'style-loader' } : { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          { loader: 'less-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: path.resolve(__dirname, './src/pages/newtab/index.html'),
      filename: 'newtab.html',
      chunks: ['core-js', 'regenerator-runtime', 'newtab'],
    }),
    new HTMLPlugin({
      template: path.resolve(__dirname, './src/pages/options/index.html'),
      filename: 'options.html',
      chunks: ['core-js', 'regenerator-runtime', 'options'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/manifest.json'),
          to: path.resolve(__dirname, './dist/manifest.json'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
