// Создать программу для получения последних новостей
// с выбранного вами сайта в структурированном виде.

const cheerio = require('cheerio')
const request = require('request')

// Задаём строку, которая будет представлять наш запрос как браузер на новостном сайте
const customReq = request.defaults({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59'
    }
})

// Задаём строку, откуда будем тянуть новости
const uri = 'https://www.msn.com/ru-ru/news'

// Выполняем GET-запрос
customReq.get({ uri }, (err, res, body) => {
    if (err || res.statusCode !== 200) {
        console.error(err)
        return
    }
    // Если ошибок нет, то парсим тело ответа, находя там все нужные данные (заголовок, картинку и т.д.)
    const $ = cheerio.load(body)
    const news = []
    $('.rc-item-js.rc-item').each((i, el) => {
        const item = $(el).find('a.contentlink').eq(0)
        const source = item.find('.riversource .sourcename').eq(0)
        news.push({
            link: uri + item.attr('href'),
            title: item.find('h3').eq(0).text(),
            excerpt: item.find('p').eq(0).text(),
            sourceLogo: source.find('img').eq(0).attr('src'),
            sourceName: source.find('.sourcetitle').eq(0).text()
        })
    })

    // Выводим полученные новости в консоль
    console.dir(news)
})
