var webpack = require('webpack');
var path = require('path');
var libraryName = 'react-deathstar';

var config = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: libraryName + '.min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ comments: false })
  ],
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  devtool: "source-map"
};

module.exports = config;
