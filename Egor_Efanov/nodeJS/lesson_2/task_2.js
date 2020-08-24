const translate = require('google-translate-free')
const readline = require('readline')
const chalk = require('chalk')

let language = () => {
    const langList = ['ru', 'en']
    let str = `${chalk.blue(`Введите язык для перевода: ru- русский, en- английский :`)}`
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    interface.question(str, (lang) => {
        lang = lang.toLocaleLowerCase()
        if (langList.includes(lang)) {
            interface.question(`${chalk.blue(`Введите текст:`)} `, (text) => {
                translate(text, { to: lang }).then(res => {
                    console.log(`${chalk.blue(`Результат перевода: `)} ${chalk.green(res.text)}`)
                    interface.close()
                })
            })
        }
        else {
            console.log('Неверный ввод')
            interface.close()
        }
    })
}
language();
