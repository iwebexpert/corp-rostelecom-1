
const translate = require('translate-google')
const readline = require('readline')
const chalk = require('chalk')
const { Console } = require('console')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
console.log(chalk.magenta('Введите строку для перевода.'))
rl.on('line', (cmd) => {

    if (cmd === 'exit') {

        rl.close()
        return
    }
    translate(cmd, { to: 'ja' }).then(res => {
        console.log(chalk.greenBright(res))
    }).catch(err => {
        console.error(err)
    })



})
