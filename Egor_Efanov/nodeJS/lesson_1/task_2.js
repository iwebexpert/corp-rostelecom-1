const readline = require('readline')

function tossACoin() {
    return Math.floor(Math.random(0) * Math.floor(2)) + 1
}

const rl = readline.createInterface({
    input: process.stdin,
    outout: process.stdout
})
console.log(`1 - орел, 2 - решка, exit - выход:`)
rl.on('line', (cmdLine) => {
    if (cmdLine == 1 || cmdLine == 2) {
        coin = tossACoin()
        switch (cmdLine) {
            case (coin + ''):
                console.log('Правильно')
                rl.close()
                break
            case ('exit'):
                rl.close()
                break
            default:
                console.log('Неверно, попробуй еще раз.')
                console.log(`1 - орел, 2 - решка, exit - выход:`)
                break
        }
    }
    else {
        console.log(`Введено не верное число. Используются числа 1 и 2`)
        console.log(`1 - орел, 2 - решка, exit - выход:`)
    }


}) 