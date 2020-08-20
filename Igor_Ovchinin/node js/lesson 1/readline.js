const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// генерируем рандомное число в пределах заданного максимального знач-я
// и округляем до целого числа
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.round(max));
}

rl.on('line', (cmd) => {

    console.log(`Вы ввели: ${cmd}, а мы загадали: ` + getRandomInt(2))

    if (cmd === 'exit') {
        rl.close()
    }
})

