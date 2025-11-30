const path = require('path');
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig,{ mode: "development",
   devServer: {
    static: {
        directory: path.resolve(__dirname, "dist"),
       
       
    },
    historyApiFallback: true,
     open: true,
     port: 9000,
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
                use: [ 'style-loader',   'css-loader', 'postcss-loader' ],
                
            },
            {
                test: /\.s[ac]ss$/,
                use:['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({})
    ],
    
});