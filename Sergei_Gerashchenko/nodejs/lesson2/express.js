const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const request = require('request')
const cheerio  = require("cheerio")
const getPage = require('./parse')


const app = express()
app.use(express.json())

app.use(express.urlencoded({extended: false}))

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


app.get('/', (req, res) => {
    res.send("Ok!")
})

app.get('/news', (req, res) => {
    let countNews = req.cookies.newsCount ? req.cookies.newsCount : null
    links = getPage()
    res.render('news', {layout: 'default', countNews})
})

app.listen(4000, () => {
    console.log('Server started...')
})

app.post('/news', (req, res) => {
    let countNews = 5
    if(req.body.news_count){
        countNews = parseInt(req.body.news_count)
    }
    res.cookie('newsCount', countNews)
    res.render('news', {layout: 'default', countNews})
})
