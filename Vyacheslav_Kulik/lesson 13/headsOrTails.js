const readline = require('readline')

function tossCoin() {
    return Math.floor(Math.random() * Math.floor(2))
}

const rl = readline.createInterface({
    input: process.stdin,
    outout: process.stdout
})

console.log(`0 - орел, 1 - решка, exit - выход:`)
rl.on('line', (cmd) => {

    coin = tossCoin()

    switch (cmd) {
        case(coin+''):
            console.log('Угадал')
            rl.close()
            break
        case(!coin+''):
            console.log('Не угадал, попробуй еще раз')
            break
        case('exit'):
            rl.close()
            break
        default:
            console.log(`0 - орел, 1 - решка, exit - выход:`)
            break
    }



})