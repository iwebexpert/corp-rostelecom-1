const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function getCoin() {
    return (Math.round(Math.random() + 1))
}

rl.on('line', (input) => {
    if (input == getCoin()) {
        console.log('Угадали')
    } else {
        console.log('Не угадали')
    }

    if (input == 'exit') {
        rl.close()
    }
})
 
console.log('Делайте ставку: Орел (введите 1) или Решка (введите 2), чтобы завершить введите exit')