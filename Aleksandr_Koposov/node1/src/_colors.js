// Модуль для раскраски текста

const clc = require('cli-color')

module.exports = {
    err: clc.white.bold.bgRed,
    warn: clc.black.bgYellow,
    info: clc.bgXterm(20).bold,
    ok: clc.greenBright.bold,
    log: clc.xterm(103),
    rand: (msg) => msg.split('').map(char => clc.xterm(Math.round(Math.random() * 230))(char)).join(''),
}
