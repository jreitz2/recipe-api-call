const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                } 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'JavaScript Coffee',
            filename: 'index.html',
            template: 'src/template.html',
        }),
    ]
};