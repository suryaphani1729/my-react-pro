const path = require('path');
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig,{ mode: "development",
   devServer: {
        historyApiFallback: true,
        static: './dist',
        port: 9000
    },
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
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use:['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({}),
    ],
    
});