const translate = require('google-translate-api')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
console.log('Введите слово, которе хотите превести на итальянский язык, для выхода введите exit')
rl.on('line', (cmd) => {
    if (cmd === 'exit') {
        rl.close()
    }
    translate(cmd, { to: "it" }).then(res => {
        console.log(res.text)
    }).catch(err => {
        console.error(err)
    })
})