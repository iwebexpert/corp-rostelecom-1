const readline = require('readline')
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
console.log(chalk.yellow(' Enter 1 or 2: '))
rl.on('line', (cmd) => {
  if (+cmd === 1 || +cmd === 2) {
    console.log(`You entered ${cmd}`)
    if (+cmd === Math.floor(1 + Math.random() * 2)) {
      console.log(chalk.hex('#fff').bgHex('#2d7a3a')(' You are winner! '))
    } else {
      console.log(chalk.white.bgRed.bold(' You are loser '))
    }
  }
  if (cmd === 'e') {
    console.log(chalk.hex('#cee2ed').bgGrey(' Game over '))
    rl.close()
  } else {
    console.log('----------')
    console.log(chalk.yellow(' Enter: 1 | 2 | e '))
  }
})
