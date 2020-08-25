const readline = require('readline')
const translate = require('google-translate-free')
const chalk = require('chalk')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})


rl.setPrompt(chalk.blue('Введите текст для перевода или exit для выхода: '))
rl.prompt()
rl.on('line', (cmd) => {
  if (cmd === 'exit') {
    rl.close()
    return
  }
  const result = translate(cmd, {
    from: 'en',
    to: 'ru',
  }).then(res => {
    console.log(chalk.green('Перевод: ' + res.text))
    rl.setPrompt(chalk.blue('Введите текст для перевода: '))
    rl.prompt()
  })

})