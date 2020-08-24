const { translate } = require('@paiva/translation-google')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

console.log('Введите текст для перевода, в конце через пробел выберите число')
console.log('Выберите язык для перевода: 0-en, 1-ru, 2-de, 3-es, 4-it, 5-fr, либо нажмите Enter для выхода из переводчика')
let lan = null

rl.on('line', (cmd) => {
    if (cmd === '') {
        rl.close()
        return
    }
    switch (cmd[cmd.length - 1]) {
        case '0':
            lan = 'en'
            break;
        case '1':
            lan = 'ru'
            break;
        case '2':
            lan = 'de'
            break;
        case '3':
            lan = 'es'
            break;
        case '4':
            lan = 'it'
            break;
        case '5':
            lan = 'fr'
            break;

        default:
            { console.log('Неверный ввод'); return }
    }
    translate(cmd.slice(0, cmd.length - 2), { to: lan }).then(res => {
        console.log('Перевод: ', res.text);
        console.log('Переведено с языка: ', res.from.language.iso, ' на язык ', lan);
    }).catch(err => {
        console.error(err);
    })

})