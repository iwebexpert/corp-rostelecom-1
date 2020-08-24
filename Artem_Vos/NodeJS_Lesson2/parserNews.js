const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')



url = 'https://hi-tech.news/'
request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html)
        const item = $('#dle-content').find('.post-content').each((i, el) => {
            if (i < 5) {
                const thema = $(el).find('.title .post-title-a').text()
                const news = $(el).find('.the-excerpt').text()
                const link = $(el).find('.title .post-title-a').attr('href')
                console.log(`${chalk.yellow.bold(thema)}\n${news}\nПодробнее по ссылке:${chalk.greenBright(link)}`)
            }
        })
    }
    else {
        console.log(chalk.red(error))
    }
})
