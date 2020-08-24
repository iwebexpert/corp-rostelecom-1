const req = require('request')
const cheer = require('cheerio')
const chalk = require('chalk')
const minmist = require('minimist')
const minimist = require('minimist')


function formatText(text, width = 50) {
    let formattedText = '  '
    let i = 0
    while (i < text.length) {
        if (Math.round((i + 1) % width) == 0) {
            while (typeof text[i] == 'string' && !text[i].match(/\s/)) {
                formattedText = formattedText.concat(text[i])
                i++
            }
            formattedText = formattedText.concat("\n")
        }
        formattedText = formattedText.concat(text[i])
        i++
    }
    return formattedText
}

var args = minimist(process.argv.slice(2))
if (args.help || args.h) {
    console.log(`${chalk.yellow('node-21.js [--width=<ширина выводимого текста>] [--count=<количество новостей>]')}`)
    return

}

req.get({
    'url': 'https://habr.com/ru/rss/all/',
    'encoding': 'utf8',
    'headers': { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36' }
},
    function (err, res, html) {
        if (!err && res.statusCode == 200) {
            let regex = /<!\[CDATA\[([\s\S]*?)\]\]>(?=\s*<)/gi;
            html = html.replace(regex, "$1");
            //console.log(html)
            let $ = cheer.load(html)
            let siteTitle = $('rss channel generator').eq(0).text()
            let siteDescription = $('rss channel description').eq(0).text()
            console.log(`\n\n`)
            console.log(`${chalk.bold.red(siteTitle)} ${chalk.yellow(siteDescription)}`)
            console.log(`\n\n`)
            let countNews = args.count || 5
            $('rss channel item').slice(0, countNews).each(function () {
                let articleTitle = $(this).find('title').text()
                let articleDescription = $(this).find('description').contents().filter(function () {
                    return this.data || this.name == 'p' || this.name == 'span'
                })
                articleDescription = articleDescription.text()
                let articleUrl = $(this).find('guid').text()
                articleTitle = articleTitle.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
                articleDescription = articleDescription.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
                articleDescription = formatText(articleDescription, args.width)
                console.log(`${chalk.bold.white(articleTitle)}`)
                console.log(`${chalk.blue(articleDescription)}`)
                console.log(`${chalk.green(articleUrl)}`)
                console.log(`\n\n`)

            })


        } else {
            console.log(err)
        }
    })