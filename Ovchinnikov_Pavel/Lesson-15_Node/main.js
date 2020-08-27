const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')

const getNews = require("./js/getNews")

const app = express()

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))


// Middleware для получения POST-параметров
app.use(express.json())

//express + hbs
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

app.set('view engine', 'hbs')

app.get('/', async (req, res) => {

    console.log("get cookies: " + JSON.stringify(req.cookies))
    let mysettings = req.cookies.mysettings
    if (req.cookies.mysettings)
        mysettings = req.cookies.mysettings
    else {
        let news_ = await getNews.getNews(3)
        mysettings = {
            news: news_,
            limitItemNews: 3,
            limitTextNews: 300,
        }
    }

    res.render('news', { layout: 'default', mysettings })
})

// Сохранение настроек
app.post('/', async (req, res) => {

    let countNews = 3
    if (req.body.param123) {
        countNews = parseInt(req.body.param123)
    }

    let news_ = await getNews.getNews(countNews)
    let mysettings = {
        news: news_,
        limitItemNews: countNews,
        limitTextNews: countNews,
    }

    res.cookie('mysettings', mysettings)

    //console.log("post cookies: " + JSON.stringify(req.cookies))
    res.render('news', { layout: 'default', mysettings })
})


app.listen(4000, () => {
    console.log('Server started...')
})
