const chalk = require('chalk')
const log = console.log
const readline = require('readline')

const coin = {
    1: 'Орел',
    2: 'Решка'
}

const stat = {
    'total': 0,
    'wins': 0,
    'fails': 0,
}

log(`${chalk.red('Игра Орел или Решка')}`)
log(`${chalk.green('Ваша задача угадать что выпало Орел или Решка')}`)

log(`${chalk.white('Бросок совершен')}`)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

log("Что выпало Орел - 1, Решка - 2, Закончить игру - 3 ")

rl.on('line', (cmd) => {
    let luckyNumber = Math.ceil(Math.random() * 2)
    if (cmd === '3') {
        log(`
        ${chalk.blue('Всего бросков:')} ${chalk.blue(stat.total)}
        ${chalk.yellow('Угадали:      ')} ${chalk.yellow(stat.wins)}
        ${chalk.white('Не угадали:   ')} ${chalk.white(stat.fails)}
        `);

        rl.close()
    } else {
        stat.total++
        if (cmd == luckyNumber) {
            log(`${chalk.yellow('Вы выиграли !!!')} ${chalk.yellow('Выпал(а): ' + coin[luckyNumber])}`)
            stat.wins++
        } else {
            log(`${chalk.black.bgWhite('Вы проиграли !!! ')} ${chalk.yellow('Выпал(а): ' + coin[luckyNumber])}`)
            stat.fails++
        }
        log(`${chalk.white('Бросок совершен')}`)
        log("Что выпало Орел - 1, Решка - 2, Закончить игру - 3 ")

    }
})


