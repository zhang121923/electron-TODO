const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const borswerConfig = {
    entry: path.join(__dirname, 'src', 'renderer', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist', 'renderer'),
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        contentBase: './dist/renderer'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, 'src', 'renderer')],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            {
                test: /\.(css|scss)$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: './iconfont/[name].[ext]'
                }
            },
            {
                test: /\.(jpg|png|jpeg)$/i,
                loader: 'file-loader',
                options: {
                    name: './assets/[name].[ext]',
                    limit: 102400,
                }
            }
        ]
    },
    target: 'web',
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'renderer', 'index.html'),
            filename: 'index.html',
            inject: true,
            // chunksSortMode: function (a, b) {
            //     if (a.name[0] > b.name[0]) {
            //         return 1;
            //     } else if (a.name[0] < b.name[0]) {
            //         return -1;
            //     } else {
            //         return 0
            //     }
            // }
        })
    ]
};

const nodeConfig = {};

module.exports = [borswerConfig];
