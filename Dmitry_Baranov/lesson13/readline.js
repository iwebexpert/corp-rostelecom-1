const readline = require('readline')
const chalk = require('chalk')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

console.log('Угадай: орёл - 1 или решка - 2, выход - любой символ')
rl.on('line', (cmd) => {
    let coin = rnd()
    console.log(coin)
    if (cmd !== '1' && cmd !== '2') {
        console.log(chalk.magenta('Приходи ещё!'))
        rl.close()
        return
    }

    if (+cmd === coin) {
        console.log(chalk.green('Угадал!'))
    } else {
        console.log(chalk.red('Не угадал'))
    }
})


function rnd(min = 1, max = 2) {
    let rnd = min + Math.random() * (max + 1 - min)
    return Math.floor(rnd)
}