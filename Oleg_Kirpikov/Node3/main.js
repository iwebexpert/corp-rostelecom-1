const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const req = require('request')
const cookieParser = require('cookie-parser')
const cheer = require('cheerio')
//const chalk = require('chalk')


const app = express()

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(express.static('public'))

//express + hbs
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

app.set('view engine', 'hbs')

var siteUrl = 'https://habr.com/ru/rss/all/'

var channelNews = {
    title: '',
    description: '',
    count: 5,
    articles: []
}


function formatText(text, width = 50) {
    let formattedText = '  '
    let i = 0
    let rows = 0
    while (i < text.length) {
        if (Math.round((i + 1) % width) == 0) {
            while (typeof text[i] == 'string' && !text[i].match(/\s/)) {
                formattedText = formattedText.concat(text[i])
                i++
            }
            formattedText = formattedText.concat("\n")
            rows++
            if (rows > 9) {
                formattedText = formattedText.concat(" ... ")
                break
            }
        }
        formattedText = formattedText.concat(text[i])
        i++
    }
    return formattedText
}

function getArticles(totalNews = channelNews.count, widthNews = 50) {
    return new Promise(resolve => {
        req.get({
            'url': siteUrl,
            'encoding': 'utf8',
            'headers': { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36' }
        },
            function (err, res, html) {
                if (!err && res.statusCode == 200) {
                    let regex = /<!\[CDATA\[([\s\S]*?)\]\]>(?=\s*<)/gi
                    html = html.replace(regex, "$1")
                    //console.log(html)
                    let $ = cheer.load(html)
                    let siteTitle = $('rss channel generator').eq(0).text()
                    let siteDescription = $('rss channel description').eq(0).text()
                    channelNews.title = siteTitle
                    channelNews.description = siteDescription
                    //console.log(`\n\n`)
                    //console.log(`${chalk.bold.red(siteTitle)} ${chalk.yellow(siteDescription)}`)
                    //console.log(`\n\n`)
                    let countNews = totalNews
                    channelNews.articles.length = 0
                    $('rss channel item').slice(0, countNews).each(function () {
                        let articleTitle = $(this).find('title').text()
                        let articleDescription = $(this).find('description').contents().filter(function () {
                            return this.data || this.name == 'p' || this.name == 'span'
                        })
                        articleDescription = articleDescription.text()
                        let articleUrl = $(this).find('guid').text()
                        articleTitle = articleTitle.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
                        articleDescription = articleDescription.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
                        articleDescription = formatText(articleDescription, widthNews)
                        //console.log(`${chalk.bold.white(articleTitle)}`)
                        //console.log(`${chalk.blue(articleDescription)}`)
                        //console.log(`${chalk.green(articleUrl)}`)
                        //console.log(`\n\n`)
                        channelNews.articles.push({ title: articleTitle, description: articleDescription, url: articleUrl })
                    })
                    resolve(channelNews)

                } else {
                    console.log(err)
                }
            })
    })
}

app.get('/', (req, res) => {
    if (req.cookies.count) {
        channelNews.count = req.cookies.count
    } if (req.query.count) {
        channelNews.count = req.query.count
    } else {
        res.cookie('count', channelNews.count)
    }
    console.log(`Cookie: ${req.cookies.count}`)
    console.log(`query param: ${req.query.count}`)

    getArticles(channelNews.count).then(() => {
        console.log(channelNews.count)
        res.render('settings', { layout: 'default', channelNews })
    }
    )
})

app.post('/', (req, res) => {
    if (req.body.count) {
        channelNews.count = parseInt(req.body.count)
        res.cookie('count', channelNews.count)
    }
    getArticles(channelNews.count).then(() => {
        console.log(channelNews.count)
        res.render('settings', { layout: 'default', channelNews })
    })
})

app.listen(4000, () => {
    console.log('Server started...')
})