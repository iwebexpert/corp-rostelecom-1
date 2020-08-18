const chalk = require('chalk')// по сути взято из примеров к самому пакету

console.log(chalk.blue('Hello world!'))//синий текст 
console.log(chalk.blue('Hello') + ' World' + chalk.red('!'))//синий хелло обычнй ворлд и красный знак
console.log(chalk.blue.bgRed.bold('Hello world!'))//синий текст на красном фоне
console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!')) //красный текст но мир на синем фоне
console.log(chalk.green(
    'I am a green line ' +
    chalk.blue.underline.bold('with a blue substring') +
    ' that becomes green again!'
))

// Использование  RGB 
console.log(chalk.keyword('orange')('Yay for orange colored text!'));
console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
console.log(chalk.hex('#DEADED').bold('Bold gray!'));