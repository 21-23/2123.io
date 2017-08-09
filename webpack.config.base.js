const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: {
        'index': './app/index/index-view.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.styl?$/,
                loader: 'stylint-loader'
            },
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, 'app'),
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['es2015', { modules: false }]]
                        }
                    }
                ]
            },
            {
                test: /\.styl?$/,
                include: [
                    path.resolve(__dirname, 'app'),
                ],
                use: [
                    'style-loader',
                    'resolve-url-loader',
                    'stylus-loader',
                ]
            },
            {
                test: /\.otf?$/,
                include: [
                    path.resolve(__dirname, 'app'),
                ],
                use: [
                    'file-loader',
                ]
            },
            {
                test: /\.png?$/,
                include: [
                    path.resolve(__dirname, 'app'),
                ],
                use: [
                    'file-loader?name=[name].[ext]',
                ]
            },
        ]
    },
    resolve: {
        alias: {
            'common': path.resolve(__dirname, 'app/common'),
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'LOG_LEVEL': JSON.stringify('all'),
            }
        }),
        new FaviconsWebpackPlugin({
            logo: 'common/img/logo.png',
            persistentCache: true,
            inject: true,
            background: '#fff',
            title: '21/23',
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'app/index/index.html',
            chunks: ['index']
        }),
    ],
};
