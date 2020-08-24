const translate = require('google-translate-free')
const chalk = require('chalk');
const readline = require('readline')

const textEn = chalk.redBright.bgBlack
const textRu = chalk.cyanBright.bgBlack

const strPrompt = textEn("Введите текст для перевода (Enter для выхода): ")

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

read.setPrompt(strPrompt)
read.prompt()

read.on('line', (str) => {
    if (str) {
        translate(str, { from: 'en', to: 'ru' }).then(res => {
            console.log(textRu("Перевод: ") + res.text);
            read.setPrompt(strPrompt)
            read.prompt()
        });
    }
    else
        read.close()
})