const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')

const urlSite = 'https://ria.ru/lenta/'


function getSite(url) {
    const regExp = /^(\w+:)?(\/{0,3})?([\d\w.\-]+)/i
    return Array.from(url.matchAll(regExp))[0][0]
}

function getTextNews(url) {

    return new Promise(resolve => {
        request(url, (error, result, body) => {
            if (!error && result.statusCode === 200) {
                const $ = cheerio.load(body)
                const textBlock = $('.article__body').find('.article__text')
                resolve(textBlock)


            }
        })
    })
}


request(urlSite, (error, result, body) => {
    if (!error && result.statusCode === 200) {

        const $ = cheerio.load(body)
        const newsBlock = $('.list-item')
        for (let i = 0; i < newsBlock.contents().length; i++) {
            const href = newsBlock.eq(i).find('a').attr('href')
            const titleNews = newsBlock.eq(i).find('a').text()
            if (href) {
                getTextNews(getSite(urlSite) + href)
                    .then(resolve => {
                        console.log(`${chalk.red(`Заголовок: `)}${titleNews}\n`)

                        console.log(`${chalk.blue(`Текст статьи: `)}${resolve.text()} \n\n`)

                        console.log(`--------------------------------------\n\n`);
                    })
            }
        }
    }
})

