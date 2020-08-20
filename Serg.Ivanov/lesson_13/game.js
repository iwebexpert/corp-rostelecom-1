const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
console.log('Орел или Решка')
console.log('Введите 0 или 1')
console.log('Для выхода из игры наберите exit')
// console.log(Math.floor(Math.random()) + 1)
let result = null
rl.on('line', (cmd) => {
    if (cmd === 'exit') {
        rl.close()
        return
    }
    if (cmd === '0') { console.log(`Выбран Орел`) } else {
        if (cmd === '1') { console.log(`Выбрана Решка`) } else { console.log(`Введено неверное число`); return }
    }
    if (Math.random() < 0.5) {
        result = '0'
        console.log('Орел')
    } else {
        console.log('Решка')
        result = '1'
    }

    if (cmd === result) { console.log('Вы выиграли') } else { console.log('Попробуйте еще раз') }


})