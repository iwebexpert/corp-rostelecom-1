const readline = require('readline')
const translate = require('@vitalets/google-translate-api')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


const input = () => {
    console.log('на какой язык перевести? en, ru, etc')
    rl.on('line', (lang) => {
        console.log('введите текст')
        rl.on('line', (text) => {
            translate(text, {to: lang}).then(res => {
                console.log(res.text)
                rl.close()
            }).catch(err => {
                console.error(err)
                console.error('Введены некорректные данные')
                rl.close()
            })
        })
    })
}

input()
