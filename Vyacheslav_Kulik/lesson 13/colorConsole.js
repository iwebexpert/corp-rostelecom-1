const chalk = require('chalk');
const readline = require('readline')

const redBold = chalk.bold.red
const blue = chalk.blue
const bgMagenta = chalk.bgMagenta
const yellowBold = chalk.bold.yellow
const greenUnderlinebgRed = chalk.underline.bgRed.green

function randomConsoleStyle(text) {
    switch(Math.floor(Math.random() * Math.floor(5)) + 1) {
        case(1):
            return redBold(text)
        case(2):
            return blue(text)
        case(3):
            return bgMagenta(text)
        case(4):
            return yellowBold(text)
        case(5):
            return greenUnderlinebgRed(text)
    }
}

const rl = readline.createInterface({
    input:  process.stdin,
    outout:  process.stdout
})

console.log(`Введите что-нибудь:`)
rl.on('line', (cmd) => {

    console.log(`${randomConsoleStyle(cmd)}`)

    if(cmd === 'exit'){
        rl.close()
    }

})