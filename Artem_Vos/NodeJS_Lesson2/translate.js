const readline = require('readline')
const translate = require('@vitalets/google-translate-api')

let language = () => {
    const lng_list = ['ru', 'en', 'de']
    let str = "Введите язык на который нужно перевести текст ru-Русский язык, en - English, de - Deutsche \n"
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    interface.question(str, (lng) => {
        lng = lng.toLocaleLowerCase()
        if (lng_list.includes(lng)) {
            interface.question('Введите текст:\n', (text) => {
                translate(text, { to: lng }).then(res => {
                    console.log(res.text)
                    interface.close()
                })
            })
        }
        else {
            console.log('Некорректные данные')
            interface.close()
        }
    })
}
language()