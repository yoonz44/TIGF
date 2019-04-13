const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')	

module.exports = (env) => {
    let clientPath = path.resolve(__dirname, 'src/main/client');
    let outputPath = path.resolve(__dirname, 'out');

    return {
        mode: !env ? 'development' : env,
        entry: {
            index: clientPath + '/index.js',
            count: clientPath + '/count.js'
        },
        output: {
            path: outputPath,
            filename: '[name].js'
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors'
                    }
                }
            }
        },
        devServer: {
            hot: false,
            inline: true,
            contentBase: outputPath,
            publicPath: '/',
            host: '127.0.0.1',
            port: 8081,
            proxy: {
                '**': 'http://127.0.0.1'
            }
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }]
            }, {
                test: /\.(css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader'
                }]
            }, {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10 // 10kb
                    }
                }]
            }, {
                test: /\.(svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                path: outputPath,
                filename: '[name].css'
            })
        ]
    }
}