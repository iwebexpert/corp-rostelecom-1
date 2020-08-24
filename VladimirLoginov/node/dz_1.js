// 2. Продвинутый блок: создать с помощью Node.js консольную программу, которая будет выводить что - либо в консоль разными цветами.
// 3. Написать консольную игру "Орел или решка", в которой надо будет угадывать выпадающее число(1 или 2).

// dz_1
var clc = require("cli-color")
let text = "Colors, formatting and other goodies for the console. This package won't mess with built-ins and provides neat way to predefine formatting patterns, see below."
let arr = text.split(' ')
let arrColor = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"]

arr.forEach(function (item, index, array) {

    let color = arrColor[Math.floor(Math.random() * (6 + 1))]
    console.log(clc[color](item))

})

//dz_2
var clc = require("cli-color")
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
let acounYou = 0
let acounComputer = 0
console.log(`Game start. Enter namber 1 or 2.`)

rl.on('line', (cmd) => {

    // проверка правильности ввода 1 или 2
    if (cmd !== '1' && cmd !== '2') {
        console.log(clc.yellow.bgRed.italic("Input error.Input only 1 or 2."))
        return
    }

    // получаем рандомное число 1 или 2
    let randomOneTwo = Math.floor(Math.random() * 2 + 1)

    // проверяем, угадано ли число
    if (cmd == randomOneTwo) {
        acounYou++
        console.log(clc.green(`You number - ${cmd} | Computer number - ${randomOneTwo} | You winner`))

    } else {
        acounComputer++
        console.log(clc.magenta(`You number - ${cmd} | Computer number - ${randomOneTwo} | Computer winner`))
    }

    // печатаем текщий счёт 
    console.log(`You ${acounYou} : ${acounComputer} Computer`);

    // прекращаем игру при достижении 10 или печати EXIT
    if (cmd === 'exit' || acounYou == 10 || acounComputer == 10) {
        let winer = acounYou > acounComputer ? 'You winer' : 'Computer winer'
        console.log(clc.black.bgCyan(`<<<Game over ${winer}>>>`))
        rl.close()
    }
})
