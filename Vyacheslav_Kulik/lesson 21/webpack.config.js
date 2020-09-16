const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'), // путь до скрипта для сборки
    output: {
        filename: 'bundle.js', // название выходного файла
        path: path.resolve(__dirname, 'dist'),// путь до выходного скрипта
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.join(__dirname, 'src', 'components')
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/, // файлы xxx.js
                exclude: /node_modules/, // исключаем папку
                use: { //показывает,  какой loader использовать для преобразования test файлов (xxx.js)
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], //пресет для babel-loader @babel/preset-react - для JSX
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'), // путь до шаблона
            filename: 'index.html' //название файла
        })
    ]

};