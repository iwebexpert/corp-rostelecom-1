const chalk = require('chalk')
const readline = require('readline')

function randomInteger(min, max) {
    let randomInt = min + Math.random() * (max - min + 1)
    return Math.floor(randomInt)
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

console.log(chalk.bold.cyanBright(`Игра орёл/решка. 1 - орёл, 2 - решка, exit - выход. Вводите число:`));
rl.on('line', (cmd) => {

    switch (cmd) {
        case '1':
        case '2':
            if (randomInteger(1, 2) === +cmd) {
                console.log(chalk.bold.green(`Вы угадали!`))
            } else {
                console.log(chalk.bold.red(`Вы не угадали!`))
            }
            break
        case 'exit':
            console.log(chalk.bold.yellow(`Пока!`))
            rl.close()
            return
        default:
            console.log(chalk.bold.magenta('Введите 1 или 2. Exit для выхода!'))
            break
    }
})

