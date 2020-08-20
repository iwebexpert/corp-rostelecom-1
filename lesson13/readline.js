const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.on('line', (cmd) => {
    if (cmd === 'exit') {
        rl.close()
    }
    let choice = (cmd == 'орел' || cmd == 'орёл') ? 1 :
        (cmd == 'решка') ? 0 : 3
    if (choice == 3) {
        console.log(`Сторона монеты с именем "${cmd}" отсутствует, необходимо сделать выбор между "орел" и "решка"`)
    } else if (choice == Math.floor(Math.random() * 2)) {
        console.log('Удача на Вашей стороне!')
    } else {
        console.log('Увы! Попробуйте еще раз')
    }
})
