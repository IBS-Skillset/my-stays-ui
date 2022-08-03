const webpack = require('webpack')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const analyse = process.env.npm_config_analyse ? true : false;

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('Production'),
        })
    ].concat(analyse ? [new BundleAnalyzerPlugin()] : []),
}