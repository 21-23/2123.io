const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.config.base.js');


module.exports = function(env) {
    return webpackMerge(baseConfig, {
        output: {
            path: path.resolve(__dirname, 'dist-prod'),
            filename: '[name].[hash].js'
        },
        devtool: 'nosources-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                    'LOG_LEVEL': JSON.stringify('none'),
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
        ],
    });
};
