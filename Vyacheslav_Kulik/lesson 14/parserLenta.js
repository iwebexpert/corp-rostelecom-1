const request = require('request')
const cheerio = require('cheerio')

const urlSite = 'https://lenta.ru/rubrics/russia/'


function getSite(url) {
    const regExp = /^(\w+:)?(\/{0,3})?([\d\w.\-]+)/i
    return Array.from(url.matchAll(regExp))[0][0]
}

function getTextNews(url) {

    return new Promise(resolve => {
        request(url, (error, result, body) => {
            if (!error && result.statusCode === 200) {
                const $ = cheerio.load(body)
                const textBlock = $('.js-topic__text').find('p')
                resolve(textBlock)


            }
        })
    })
}


request(urlSite, (error, result, body) => {
    if (!error && result.statusCode === 200) {

        const $ = cheerio.load(body)
        const newsBlock = $('.titles')
        for (let i = 0; i < newsBlock.contents().length; i++) {
            const href = newsBlock.eq(i).find('a').attr('href')
            const titleNews = newsBlock.eq(i).find('a').find('span').text()
            if (href) {
                getTextNews(getSite(urlSite) + href)
                    .then(resolve => {
                        console.log('Title: ', titleNews)
                        console.log('Text: ', resolve.text(),'\n\n')
                    })
            }
        }
    }
})


