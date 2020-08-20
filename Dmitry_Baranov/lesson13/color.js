const chalk = require('chalk')

const log = console.log
const error = chalk.bold.red
const warning = chalk.italic.yellow


if (chalk.supportsColor) {
    log(chalk.cyan('yes your terminal supports color, this text should be cyan.'))
} else {
    log('sorry the terminal does not support color.')
}
log(`color level: ${chalk.level}`);


log(error('Error!'))
log(warning('Warning!'))


log(chalk.green(`I am a green line ${chalk.blue.underline.bold('with a blue substring')} that becomes green again!`))


const name = 'Olga'
log(chalk.magentaBright('Hello'), name)


log(chalk.rgb(rndColor(), rndColor(), rndColor())('Random color text'))


function rndColor(min = 0, max = 255) {
    let rnd = min + Math.random() * (max + 1 - min)
    return Math.floor(rnd)
}

