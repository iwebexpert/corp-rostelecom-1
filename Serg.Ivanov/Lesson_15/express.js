const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const request = require('request')
const cheerio = require('cheerio')

const app = express()

class elementNews {
    constructor(text, href) {
        this.text = text
        this.href = href
    }
}

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(express.static('public'))

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))
app.set('view engine', 'hbs')

app.get('/settings', (req, res) => {
    let cookie = req.cookies.countNews
    let agency = req.cookies.agencyNews
    res.render('settings', { layout: 'default', cookie, agency })
})

app.post('/settings', (req, res) => {
    let countNews = 10
    let agencyNews = 1
    if (req.cookies.countNews != '') { countNews = req.cookies.countNews }
    if (req.cookies.agencyNews != '') { agencyNews = req.cookies.agencyNews }
    if (req.body.param1) {
        countNews = parseInt(req.body.param1)
    }
    if (req.body.param2) {
        agencyNews = parseInt(req.body.param2)
    }
    res.cookie('countNews', countNews)
    res.cookie('agencyNews', agencyNews)
    let len = Number(countNews)
    agencyNews = Number(agencyNews)
    let news = []
    switch (agencyNews) {
        case 1:
            for (let i = 0; i < len; i++) {

                request('https://ria.ru/', (err, res2, body2) => {
                    if (!err && res2.statusCode === 200) {
                        const $ = cheerio.load(body2)
                        const header = $('.cell-list__item-title').eq(i).text()
                        const href = $('.cell-list__item-link').eq(i).attr('href')
                        const el = new elementNews(`${header}`, `${href}`)
                        news[i] = el
                    } else {
                        console.log('Ошибка загрузки новостного сервера')
                    }

                    res.render('settings', { layout: 'default', news })

                })
            }
            break;
        case 2:
            for (let i = 0; i < len; i++) {

                request('https://news.mail.ru/', (err, res2, body2) => {
                    if (!err && res2.statusCode === 200) {
                        const $ = cheerio.load(body2)
                        const header = $('.list__item').eq(i).text()
                        const message = $('.list__text').eq(i).attr('href')
                        const href = 'https://news.mail.ru' + `${message}`
                        const el = new elementNews(`${header}`, `${href}`)
                        news[i] = el
                    } else {
                        console.log('Ошибка загрузки новостного сервера')
                    }

                    res.render('settings', { layout: 'default', news })

                })
            }
            break;
        default: console.log('Неверный ввод новостного агентства')
    }

})

app.get('/cookie/get', (req, res) => {
    res.send(JSON.stringify(req.cookies)).status(200)
})

app.listen(4000, () => {
    console.log('Server started...')
})