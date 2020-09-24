const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // настройка index.html по шаблону
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // выносим файлы стилей в отдельный файл

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'), // путь до скрипта для сборки
    output: {
        filename: 'bundle.js', // название выходного файла
        path: path.resolve(__dirname, 'dist'),// путь до выходного скрипта
    },
    devtool: 'eval-source-map', // включаем поддержку просмотра кода через браузер и devtool

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.join(__dirname, 'src', 'components'),
            src: path.join(__dirname, 'src')
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
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],  //нужно для поддержки декораторов @
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }] //нужно для поддержки декораторов @
                        ]
                    }
                }
            },
            {
                test: /\.s?css|sass$/i,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // настройка для  поддержки стилей css/scss/sass
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)?$/,
                loader: 'file-loader', //поддержка файлов
                options: {
                    name: 'img/[name].[ext]',
                },
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'), // путь до шаблона
            filename: 'index.html' //название файла
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css', //настройка имени выходного файла
        })
    ]
    //,
    // devtool: 'eval-source-map',
    //
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             styles: {
    //                 name: 'styles',
    //                 test: /\.css$/,
    //                 chunks: 'all',
    //                 enforce: true,
    //             },
    //         },
    //     },
    // }

};