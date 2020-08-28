const request = require("request");
const cheerio = require('cheerio')



request('https://www.m24.ru/news', (err, resp, body) => {
    if (!err && resp.statusCode ==200) {
        const $ = cheerio.load(body)
        for(let i = 0; i < 5; i++)
        {
            const news = $('.b-materials-list').find('li').eq([i]).find('a').eq(0).text()
            const data = $('.b-materials-list').find('li').find('span').html()
            console.log(`Новость ${i + 1}: ${news}; время новости: ${data}`)
        }

    }
})
