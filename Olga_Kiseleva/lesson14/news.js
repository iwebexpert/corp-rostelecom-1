const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')

request('https://ria.ru/', (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body)

        let arrTitleNews = []
        let arrLinkNews = []
        let countList = $('.cell-list__list').length
        for (let i = 0; i < countList; i++) {
            let countNews = $('.cell-list__list').eq(0).find('.share').length
            for (let j = 0; j < countNews; j++) {
                if ($('.cell-list__list').eq(i).find('.share').eq(j).attr('data-title')) {
                    arrTitleNews.push($('.cell-list__list').eq(i).find('.share').eq(j).attr('data-title'))
                    arrLinkNews.push($('.cell-list__list').eq(i).find('.share').eq(j).attr('data-url'))
                }
            }
        }
        let countElem = arrTitleNews.length//переменная для вывода всех новостей
        // первые 5 новостей        
        for (let i = 0; i < 5; i++) {
            request(arrLinkNews[i], (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    const $ = cheerio.load(body)

                    res.setEncoding('utf8')
                    console.log(chalk.green(arrTitleNews[i]))
                    let count = $('.article__text').length
                    for (let i = 0; i < count; i++) {
                        console.log($('.article__text').eq(i).text())
                    }
                }
            })
        }
    }
})
