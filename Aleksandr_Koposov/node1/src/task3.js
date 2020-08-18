// Написать консольную игру "Орел или решка",
// в которой надо будет угадывать выпадающее число (1 или 2).

const readline = require('readline')
const { err, info, ok } = require('./_colors') // Берём не все функции, а только указанные слева

const notify = () => {
    console.log(
        info(' Доступные команды: '),
        '\n\t1 - Вы думаете, что выпадет орёл',
        '\n\t2 - Вы думаете, что выпадет решка',
        '\n\tQ - выход'
    )
}

const check = (num, text) => {
    const result = `${num === 1 ? 'Выпал орёл' : 'Выпала решка'} (${num})`
    if (num === +text) {
        console.log(ok('Угадали :-)'), result)
    } else {
        console.log(err('Не угадали :-('), result)
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
rl.on('line', (cmd) => {
    const num = Math.round(Math.random() + 1)
    const text = cmd.trim().toUpperCase()
    switch (text) {
        case '1':
        case '2':
            check(num, text)
            break
        case 'Q':
        case 'Й':
            rl.close()
            break
        default:
            notify()
            break
    }
})

notify()
