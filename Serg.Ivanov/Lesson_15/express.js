const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const request = require('request')
const cheerio = require('cheerio')

const app = express()

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
    res.render('settings', { layout: 'default' })
})

app.post('/settings', (req, res) => {
    let countNews = 10
    if (req.body.param1) {
        countNews = parseInt(req.body.param1)
    }

    res.cookie('countNews', countNews)
    let len = Number(countNews)

    // for (let i = 0; i < len; i++) {
    let news = ''
    request('https://nauka.tass.ru/nauka/9249947', (err, res2, body2) => {
        if (!err && res2.statusCode === 200) {
            const $ = cheerio.load(body2)
            const header = $('.news-header__title').eq(0).text()
            const headerMini = $('.news-header__lead').eq(0).text()

            news += `${header}` + `${headerMini}`
        } else {
            console.log('Ошибка загрузки новостного сервера')
        }
        res.render('settings', { layout: 'default', news })
    })

    // }

})

app.get('/cookie/get', (req, res) => {
    console.log(req.cookies.countNews ? req.cookies.countNews : null)
    res.send(JSON.stringify(req.cookies.countNews)).status(200)
})

app.listen(4000, () => {
    console.log('Server started...')
})