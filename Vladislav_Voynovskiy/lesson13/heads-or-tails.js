const chalk = require('chalk')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const randomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}


const Game = () => {
  console.log(chalk.cyan.bgBlack('Guess the number between 1 and 2'))
  rl.on('line', (cmd) => {
    if (cmd.toLowerCase() === 'exit') {
      rl.close()
    }
    else if (['1', '2'].includes(cmd)) {
      if (randomInt(1, 2) == Number(cmd)) {
        console.log(chalk.green('Correct!') + '\n' + chalk.cyan('Guess again!'))
      } else {
        console.log(chalk.red('Wrong!') + '\n' + chalk.cyan('Guess again!'))
      }
    }
    else {
      console.log(chalk.cyan.bgGray('type 1, 2 or exit'))
    }
  })
}
Game();