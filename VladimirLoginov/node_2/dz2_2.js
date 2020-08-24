//dz2_2
// Создать переводчик слов с английского на русский, который будет
// обрабатывать входящие GET запросы и возвращать ответы,
// полученные через API Яндекс.Переводчика.

const { translate } = require('@paiva/translation-google');
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

console.log('Введите слово или фразу на английском языке');
rl.on('line', (cmd) => {

    if (cmd != 'exit') {

        translate(cmd, { to: 'ru' }).then(res => {
            console.log(`Перевод: ${res.text}`)
            //=> 这是Google翻译
            //console.log(res.from.language.iso)
            //=> en
        }).catch(err => {
            console.error(err)
        });

        console.log('Введите слово или фразу на английском языке');

    }else{
        console.log('Закрываем переводчик')
        rl.close()
    }
})
