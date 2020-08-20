//дз п2
var clc = require("cli-color")
console.log(clc.red("Text in red"))
console.log(clc.yellow.bgBlack.underline("Underlined yellow text on black background."))


//дз п3
const readline = require('readline')
console.log(`Угадайте число 1 или 2, или exit для выхода:`)

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.on('line', (cmd) =>  {

    let rand = randomInteger(1, 2)

    if (+cmd == +rand) {
        console.log(`Угадали, поставлено на ${cmd} выпала ${rand}\r\nВведите число  1 или 2, или exit для выхода:`)
    } 
    // else (`Не угадали, выпала ${rand}`)
    if (cmd === 'exit') {
        rl.close()
    }
})
