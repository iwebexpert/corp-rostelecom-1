const translate = require('google-translate-free')
const readline = require('readline')

console.log(`Переводчик с английского на русский.\r\nВведите текст на английском или exit для выхода.`)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.on('line', (cmd) =>  {

    if (cmd) {
        translate(cmd, {to: 'ru' }).then(res => {
            console.log(res.text);
            //console.log(res.from.language.iso);
        });
        console.log(`Введите текст на английском или exit для выхода.`)
    } 

    if (cmd === 'exit') {
        rl.close()
    }
})
