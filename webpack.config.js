const path = require('path');

const TerserJSPlugin = require('terser-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
const ProgressPlugin = require('webpack').ProgressPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    console.info(percentage, message, ...args);
};

const dev = process.argv[2].split('=')[1] === 'development';


let config = {
    entry: './app/src/index.js',
    output: {
        path: path.resolve(__dirname + '/public', 'dist'),
        filename: dev ? '[name].js' : '[name].[chunkhash].js'
    },
    mode: 'development',
    watch: dev,
    devtool: 'eval-cheap-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    { loader: 'file-loader', options: { name: 'image/[name].[ext]' } }
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [

                    { loader: MiniCssExtractPlugin.loader },

                    // Translates CSS into CommonJS
                    { loader: 'css-loader' },

                    // Compiles Sass to CSS
                    {loader: 'sass-loader' },
                ],
            },
        ]
    },
    plugins: [
        new ProgressPlugin(handler),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: dev ? '[name].css' : '[name].[contenthash].css',
        })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    }
};

if (!dev) {
    config.mode = 'production';
    config.devtool = '(none)';
    config.plugins.push(new ManifestPlugin());
}

module.exports = config;