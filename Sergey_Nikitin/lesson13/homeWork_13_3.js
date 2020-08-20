const readline = require('readline')
const { Console } = require('console')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
console.log(`Я хочу сыграть с тобой в одну игру)))`)
console.log(`Угадай орел или решка (орел='0', решка='1',завершить ='exit' )`)
rl.on('line', (cmd) => {

    let currentRound = getRandomInt(99) % 2
    if (cmd === 'exit') {

        rl.close()
        return
    }

    if (parseInt(cmd) === currentRound) {
        console.log(`Угадал(а)`)
    }
    else {
        console.log(`Не свезло!`)
    }



})
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}