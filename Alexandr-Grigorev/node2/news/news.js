const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')

request('https://www.computerworld.com/news/', (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body)

        for (let i = 0; i < 10; i++) {
            let newsHeader = $('.post-cont').find('h3').eq(i).text()
            let oneNewsContent = $('.post-cont').find('h4').eq(i).text()
            console.log(chalk.red('Заголовк новости:'))
            console.log(chalk.bold(newsHeader))
            console.log(chalk.green('Краткое описание:'))
            console.log(oneNewsContent)
        }

    }
})