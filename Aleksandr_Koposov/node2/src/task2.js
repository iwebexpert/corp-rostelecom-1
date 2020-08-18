// Создать переводчик слов с английского на русский, который будет
// обрабатывать входящие GET запросы и возвращать ответы,
// полученные через API Яндекс.Переводчика.

const readline = require('readline')
const { info, ok, log, err } = require('../../node1/src/_colors')
const { translate } = require("google-translate-api-browser") // Google-переводчик, раз у Яндекса халява кончилась

const notify = () => {
    console.log(
        info(' Доступные команды: '),
        '\n\tВведите английский текст для перевода на русский',
        '\n\tQ - выход'
    )
}

const prompt = (msg = "Перевести на русский > ") => {
    rl.setPrompt(msg)
    rl.prompt()
}

const translateText = (text) => {
    translate(text, { from: 'en', to: 'ru' }).then(res => {
        prompt(`${log(text)} > ${ok(res.text)}\nПеревести на русский > `)
    }).catch(error => {
        prompt(err('Не удалось выполнить перевод. Ошибка:'))
        console.error(err)
    })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

notify()
prompt()

rl.on('line', (cmd) => {
    const text = cmd.trim()
    switch (text.toUpperCase()) {
        case 'Q':
            rl.close()
            break
        case 'H':
            notify()
            break
        default:
            translateText(text)
            break
    }
})
