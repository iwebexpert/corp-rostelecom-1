const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


//express + hbs
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))
app.set('view engine', 'hbs')

const news = {
    countNews: 5,
    articles: [],
}

app.get('/news', (req, res) => {

    if (req.cookies.cntNews) {
        news.countNews = +req.cookies.cntNews
    }

    request('https://www.banki.ru/news/?source=main_menu_news', (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const $ = cheerio.load(body)

            // выводим первые 5 новостей с сайта banki.ru
            for (let i = 0; i < news.countNews; i++) {
                const dateNews = $('.text-list-date').eq(i).text()
                const titleNews = $('.text-list-link').eq(i).find('span').text()

                news.articles.push({ date: dateNews, title: titleNews })
            }
        } else {
            console.log(err)
            console.log('Страница не найдена.')
        }
    })
    newsBlock = news.articles.slice(0, news.countNews)
    res.render('news', { layout: 'default', newsBlock })
})


app.get('/', (req, res) => {
    res.redirect('/settings')
})

app.get('/settings', (req, res) => {
    let newsCount = req.cookies.cntNews ? req.cookies.cntNews : 5
    res.render('settings', { layout: 'default', newsCount })
})

app.post('/settings', (req, res) => {
    if (req.body.params) {
        news.countNews = parseInt(req.body.params)
        res.cookie('cntNews', parseInt(req.body.params))
    }
    res.redirect('/news')
})

app.listen(4000, () => {
    console.log('Server started...')
})
