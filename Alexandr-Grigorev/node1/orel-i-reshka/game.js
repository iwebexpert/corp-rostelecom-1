const readline = require('readline')
const chalk = require('chalk')
const { StringDecoder } = require('string_decoder')

const error = chalk.bgRed
const greeting = chalk.green
const win = chalk.black.bgGreen
const lose = chalk.black.bgGray
let wins = 0
let loses = 0


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
function side(moneta) {
    if (moneta == 1) return 'Орел'
    if (moneta == 2) return 'Решка'
}
console.log(greeting('Добро пожаловать в игру Орел и решка!'))
console.log('Введите: 1 - орел, 2 - решка. Для выхода из игры введите exit')

rl.on('line', (cmd) => {
    if ((cmd == 1) || (cmd == 2)) {
        let moneta = Math.round(Math.random()) + 1 // подбрасываем монету
        if (cmd == moneta) {
            console.log(win('Поздравляем! Вы угадали! Выпало:', side(moneta), 'Вы загадали:', side(cmd)))
            wins++
        }
        else {
            console.log(lose('К сожалению, Вы не угадали. Выпало:', side(moneta), 'Вы загадали:', side(cmd)))
            loses++
        }
    }
    else {
        if (cmd === 'exit') {
            let colorClose = chalk.red
            if (wins >= loses) {
                colorClose = greeting
            }
            console.log(colorClose(`Всего хорошего! Побед: ${wins} Поражений: ${loses}`))
            rl.close()
        }
        else (console.log(error('Введено некорректное значение! 1 - орел, 2 - решка, exit - выход')))
    }
})