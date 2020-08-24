const clc = require('cli-color');
const request = require('request')
const cheerio = require('cheerio')

request('https://nauka.tass.ru/nauka/9249947', (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body)
        const header = $('.news-header__title').eq(0).text()
        const headerMini = $('.news-header__lead').eq(0).text()

        let len = $('.text-block').length
        let paragraph1 = ''
        for (let i = 0; i < len; i++) {
            paragraph1 += $('.text-block').eq(i).text()
        }
        console.log(`${clc.bgBlue.yellow(header)}` + `${clc.bgGreen.yellow.underline(headerMini)}`)
        console.log(`${clc.yellow(paragraph1)}`)
    }
}) 