const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.common");

const {PurgeCSSPlugin} = require('purgecss-webpack-plugin');
const glob = require('glob');
const purgePath = {
    src: path.join(__dirname, "src"),
}
module.exports = merge(commonConfig, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CopyPlugin({
                    patterns: [
                        {
                            from: path.resolve(__dirname,"src/assets/images/*"),
                            to: path.resolve(__dirname, "dist"),
                            context: "src",
                        }
                    ]
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${purgePath.src}/**/*`, {nodir: true}),
            safelist: ["dummy-css"],
        })
    ]
});