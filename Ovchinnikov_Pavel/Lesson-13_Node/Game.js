//** Константы
const chalk = require('chalk');
const readline = require('readline')

const headerInfo = chalk.bold.yellow.bgBlack.underline
const textInfo = chalk.blueBright.bgBlack
const gameWin = chalk.bold.greenBright.bgBlack
const gameLose = chalk.bold.redBright.bgBlack
const close = chalk.bold.red

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

//** Функции
function help() {
    console.log(headerInfo('Список команд'))
    console.log(textInfo('? help h - Вызов справки по командам'))
    console.log(textInfo('1 - Ваш выбор [Орел]'))
    console.log(textInfo('2 - Ваш выбор [Решка]'))
    console.log(textInfo('Прочие команды - Выход из приложения'))
}

function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function exit() {
    console.log(close('Вы вышли из приложения'))
    read.close()
}

function getGameResult(key) {
    if (key == getRandom(2) + 1)
        console.log(gameWin("Поздравляю! Вы выиграли!!!"))
    else
        console.log(gameLose("Увы! Вы проиграли!!!"))
}

function game(key) {
    switch (key.toUpperCase()) {
        case '?':
        case 'help'.toUpperCase():
        case 'h'.toUpperCase():
            help()
            break
        case '1':
            getGameResult(1)
            break
        case '2':
            getGameResult(2)
            break
        default:
            exit()
            break
    }
}

//** Запуск игры

// выводим на экран справку по командам
help()

// ожидаем и анализируем ввод данных от пользователя 
read.on('line', (key) => {
    console.log('Ваш выбор: ' + key)
    game(key)
})
