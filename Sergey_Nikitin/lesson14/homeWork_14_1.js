const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')

request('https://shazoo.ru/news', (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body)
        let lenth = $('.entry').length

        let newsTitle = ""
        let newsShortContent = ""

        for (let i = 0; i < lenth; i++) {
            newsTitle = $('.entryTitle').eq(i).text()
            newsShortContent = $('.entryContent').eq(i).text()
            console.log(chalk.green(newsTitle))
            console.log(chalk.grey(newsShortContent))
        }


    }
})