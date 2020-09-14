const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry : path.join(__dirname, "src", 'index.js'),
    output: {
        path : path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    module : {
        rules: [
            // the 'transform-runtime' plugin tells Babel to
            // require the runtime instead of inlining it.
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react' ],
//                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template : path.join(__dirname, 'src', 'index.html'),
            filename: "index.html"})
    ],
}