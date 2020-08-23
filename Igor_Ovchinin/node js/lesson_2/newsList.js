const request = require('request')
const cheerio = require('cheerio')

request('https://www.banki.ru/news/?source=main_menu_news', (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body)

        // выводим первые 5 новостей с сайта banki.ru
        for (let i = 0; i < 5; i++) {
            const newsDate = $('.text-list-date').eq(i).text()
            const newsTitle = $('.text-list-link').eq(i).find('span').text()

            console.log(`Время публикации статьи: ${newsDate}`)
            console.log(`Заголовок статьи: ${newsTitle}`)
            console.log('-------------------------------')
        }

        // const newsDate = $('.text-list-date').eq(0).text()
        // const newsTitle = $('.text-list-link').eq(0).find('span').text()

        // console.log(`Время публикации статьи: ${newsDate}`)
        // console.log(`Заголовок статьи: ${newsTitle}`)

    }
})