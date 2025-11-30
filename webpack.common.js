const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const EsLintPlugin = require('eslint-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const {PurgeCSSPlugin} = require('purgecss-webpack-plugin');
const glob = require('glob');
const { type } = require('os');
const purgePath = {
    src: path.join(__dirname, "src"),
}
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, "node_modules"),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                {
                    loader: "eslint-loader",
                    options: {
                        fix: true,
                    }
            }]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: "asset/resource",
            }
        ]
    },
    plugins: [
        new EsLintPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        //new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
};