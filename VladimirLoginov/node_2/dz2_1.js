//node dz2
//Создать программу для получения информации о последних

новостей с выбранного вами сайта в структурированном виде.
var clc = require("cli-color")
const request = require('request')
const cheerio = require('cheerio')

request('https://habr.com/ru/', (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body)
        //console.log(body)
        const time = []
        const news = []
        const mewsCount = 10

        $('span.post__time').slice(0, mewsCount).each((idx, elem) => {
            const title = $(elem).text()
            time.push(title)
        })

        $('.post__title_link').slice(0, mewsCount).each((idx, elem) => {
            const title = $(elem).text()
            news.push(title)
        })

        let pintLine = '';
        for(let i=0; i<time.length; i++){
            pintLine += `--${clc.yellow(time[i])}---${clc.green(news[i])}\n`
        }
        console.log(pintLine)
    }
})
