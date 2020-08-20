const readline = require('readline')
const chalk = require('chalk')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

console.log(chalk.blue.bgWhite('Игра "Орёл и решка"'))
console.log(chalk.black.bgWhite('Введите 1 для выбора "орла" или 2 для выбора "решки"'))
console.log(chalk.black.bgWhite('Для выхода из игры введите "exit"'))

rl.on('line', (cmd) => {
    if (cmd === 'exit') {
        rl.close()
    }
    else if (['1', '2'].includes(cmd)) {
        if (~~(Math.random() * 2) + 1 === +cmd) {
            console.log(`Ваш выбор ${cmd} - ${chalk.green('Win!')}`)
        } else {
            console.log(`Ваш выбор ${cmd} - ${chalk.red('Fail!')}`)
        }
    }
    else {
        console.log(chalk.white.bgRed('Введите 1, 2 или exit'))
    }
})
