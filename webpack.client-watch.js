const webpack = require('webpack');
const config = require('./webpack.client.js');

config.cache = true;
config.debug = true;
config.devtool = 'eval-source-map';

config.entry.unshift(
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
);

config.output.publicPath = 'http://localhost:8080/js/';
config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

config.module = {
  loaders: [
    {include: /\.json$/, loaders: ['json-loader']},
    {test: /\.js$/, loaders: ['react-hot', 'babel-loader'], include: /app/}
  ]
};

config.devServer = {
  publicPath: 'http://localhost:8080/js/',
  contentBase: './build',
  hot: true,
  inline: true,
  quiet: true,
  lazy: false,
  noInfo: true,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

module.exports = config;
