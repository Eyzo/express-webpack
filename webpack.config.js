const path = require('path');
const ProgressPlugin = require('webpack').ProgressPlugin;

const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    console.info(percentage, message, ...args);
};

module.exports = {
    entry: './app/src/index.js',
    output: {
        path: path.resolve(__dirname + '/public', 'dist'),
        filename: 'bundle.js'
    },
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
                use: [
                    // Creates `style` nodes from JS strings
                    { loader: 'style-loader' },
                    // Translates CSS into CommonJS
                    { loader: 'css-loader' },
                    // Compiles Sass to CSS
                    {loader: 'sass-loader' },
                ],
            },
        ]
    },
    plugins: [
        new ProgressPlugin(handler)
    ]
};