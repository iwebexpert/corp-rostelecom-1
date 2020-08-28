const chalk = require('chalk')
const log = console.log
const readline = require('readline')

const translate = require('@vitalets/google-translate-api')


log(`${chalk.red('Переводчик  en -> ru')}`)


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

log("Введите слово или Q для выхода")

rl.on('line', (word) => {
    if (word === 'Q') {
        rl.close()
    } else {
        translate(word, { to: 'ru' }).then(res => {
            log(res.text);

            //console.log(res.from.language);
            log("Введите слово или Q для выхода")

        }).catch(err => {
            console.error(err)
        });
    }
})