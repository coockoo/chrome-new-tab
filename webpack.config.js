const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HTMLPlugin({
      template: path.resolve(__dirname, './src/newtab.html'),
      filename: 'newtab.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/manifest.json'),
          to: path.resolve(__dirname, './dist/manifest.json'),
        },
      ],
    }),
  ],
};
