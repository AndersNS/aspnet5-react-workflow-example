const webpack = require('webpack');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  outputPath = path.join(__dirname, 'wwwroot/js');
} else {
  outputPath = path.join(__dirname, 'build/js');
}

module.exports = {
  target: 'web',
  cache: false,
  context: __dirname,
  devtool: false,
  entry: ['./app/client.js'],
  output: {
    path: outputPath,
    filename: 'bundle.js',
    chunkFilename: '[name].[id].js',
    publicPath: 'js/'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {include: /\.json$/, loaders: ['json-loader']},
      {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/}
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      'web_modules'
    ],
    extensions: ['', '.json', '.jsx', '.js']
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
};
