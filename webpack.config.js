const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [{
                test: /\.(ts|tsx)$/,
                use: [{
                    loader: 'awesome-typescript-loader'
                }]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'source-map-loader',
                    options: {
                        enforce: 'pre',
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'sass-loader',
                }],
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'url-loader'
            },
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve('./src'),
        ],
        extensions: ['.tsx', '.js', '.ts', 'json', '.scss', '.css', '.jpg', '.png']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        watchContentBase: true,
        historyApiFallback: true,
    },
    target: "web",
    plugins: [
        new LiveReloadPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};