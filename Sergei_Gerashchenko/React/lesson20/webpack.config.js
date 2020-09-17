const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry : path.join(__dirname, "src", 'index.js'),
    output: {
        path : path.join(__dirname, "dist"),
        filename: "bundle.js"
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.join(__dirname, 'src', 'components'),
        },
    },

    module : {
        rules: [
            // the 'transform-runtime' plugin tells Babel to
            // require the runtime instead of inlining it.
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react' ],
                        plugins: ['@babel/plugin-proposal-class-properties'],
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