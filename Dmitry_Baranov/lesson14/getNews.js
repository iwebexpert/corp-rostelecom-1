const request = require('request')
const cheerio = require('cheerio')

request('https://3dnews.ru/news', (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body)

        for (let i = 0; i < 5; i++) {
            const dateNews = $('.article-entry').eq(i).find('span').text()
            const titleNews = $('.article-entry').eq(i).find('h1').text()
            const contentNews = $('.article-entry').eq(i).find('p').text()

            console.log(`Дата: ${dateNews}`)
            console.log(`Заголовок: ${titleNews}`)
            console.log(`Текст: ${contentNews}`)
            console.log(``)

        }
    } else {
        console.log(err)
        console.log('Страница не найдена.')
    }
})