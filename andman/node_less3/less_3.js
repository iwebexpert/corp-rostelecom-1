const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')


const myNews = require('./MyNews.js')

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

app.get('/news', (req, res) => {

    const getData = async () => {
        const newsLimit = req.cookies.cntNews ? req.cookies.cntNews : 5 // получаем значение из Cookies либо 5 по-умолчанию
        const mn = new myNews(newsLimit)
        const data = await mn.parseNews()
        res.render('news', { layout: 'default', data })
    }
    getData()
})

app.get('/', (req, res) => {
    res.redirect('/news')
})

app.get('/settings', (req, res) => {
    const countNews = req.cookies.cntNews ? req.cookies.cntNews : 5
    res.render('settings', { layout: 'default', countNews })
})

app.post('/settings', (req, res) => {
    //console.log(req.body)
    let countNews = req.cookies.cntNews ? req.cookies.cntNews : 5
    if (req.body.param1) {
        countNews = parseInt(req.body.param1)
        res.cookie('cntNews', countNews)
    }
    res.render('settings', { layout: 'default', countNews })
})


app.listen(4000, () => {
    console.log('Server started...')
})
