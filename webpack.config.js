'use strict';

const webpack = require('webpack');
const version = require('./package.json').version;

module.exports = {
  entry: './src/index.js',
  output: {
    path: './lib',
    filename: 'vue-hypercomments.js',
    library: 'VueHypercomments',
    libraryTarget: 'umd',
    sourcePrefix: ''
  },
  module: {
    loaders: [
      {test: /.\js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/}
    ]
  },
  plugins: [
    new webpack.BannerPlugin(`Vue Hypercomments version ${version} under MIT License copyright ${new Date().getFullYear()} Rikcon`)
  ]
};
