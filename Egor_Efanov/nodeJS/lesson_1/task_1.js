const chalk = require('chalk')
const readline = require('readline')

const blackBold = chalk.bold.black
const bgCyanBright = chalk.bgCyanBright
const yellowUnderline = chalk.underline.yellow



function randomColorStyleChalk(text) {
    switch (Math.floor(Math.random() * Math.floor(3)) + 1) {
        case (1):
            return blackBold(text)
        case (2):
            return bgCyanBright(text)
        case (3):
            return yellowUnderline(text)
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    outout: process.stdout
})

console.log(`${chalk.red(`Для выхода ввести в консоль exit или использовать сочетание клавишь ctrl + C. или нажмите Enter`)} \n${chalk.green(`Введите произвольную строку:`)}`)
rl.on('line', (cmdLine) => {
    console.log(`Отображение: ${randomColorStyleChalk(cmdLine)}`)
    console.log('-----');
    console.log(`${chalk.red(`Для выхода ввести в консоль exit или использовать сочетание клавишь ctrl + C. или нажмите Enter`)} \n${chalk.green(`Введите произвольную строку:`)}`)

    if (cmdLine === 'exit' || cmdLine === '') {
        rl.close()
    }

})



