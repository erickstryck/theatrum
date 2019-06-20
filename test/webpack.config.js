// webpack v4
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const jsSourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './js');
const sourcePath = path.join(__dirname, './src');

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(nodeEnv),
        },
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(sourcePath, 'index.html'),
        path: buildPath,
        filename: 'index.html',
    }),
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
    }),
    new WebpackMd5Hash()
];

if (isProduction) {
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        })
    );
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin({ port: 9091 })
    );
}

module.exports = {
    mode: nodeEnv,
    devtool: isProduction ? '' : 'source-map',
    context: jsSourcePath,
    entry: {
        js: './index.js',
        vendor: [
            'react-dom',
            'react-router',
            'react',
            'whatwg-fetch'
        ],
    },
    output: {
        path: buildPath,
        publicPath: '',
        filename: '[name].[hash].js'
    },
    optimization: isProduction ? {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    mangle: true
                }
            })
        ]
    } : {},
    module: {
        rules: [
            {
                test: /(\.less)$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader', 'less-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                type: 'javascript/auto',
                test: /\.(json|geojson)$/,
                use: 'json-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
			    test: /\.(ogg|mp3|wav|mpe?g)$/i,
			    use: 'file-loader'
			}
        ]
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            jsSourcePath,
        ]
    },
    externals: [
        (function () {
          var IGNORES = [
            'electron'
          ];
          return function (context, request, callback) {
            if (IGNORES.indexOf(request) >= 0) {
              return callback(null, "require('" + request + "')");
            }
            return callback();
          };
        })()
      ],
    plugins: plugins,
    devServer: {
        contentBase: isProduction ? './js' : './src',
        historyApiFallback: true,
        port: 9090,
        compress: isProduction,
        inline: !isProduction,
        hot: !isProduction,
        host: '0.0.0.0',
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: true,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m',
            },
        },
    }
};
