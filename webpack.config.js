const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = [
    'react', 'lodash', 'redux', 'react-redux', 'react-dom', 'react-router'
];

const config = {
    entry: {
        index: './src/scripts/index.js',
        vendor: VENDOR_LIBS
    },
    output: {   
        path: path.resolve(__dirname, 'build'),
        filename: 'scripts/[name].[chunkhash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                        ['css-loader?importLoaders=1', 'postcss-loader'])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles/[name].[contenthash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
       
        new HtmlWebpackPlugin({
            title: 'Reduct Starter',
            template: 'src/tmpl/tmpl.html'
        })
    ],
    devServer: {
        contentBase: './build',
        port: 3000
    }
}

module.exports = config;