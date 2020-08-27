var news = []
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const request = require('request')
const cheerio = require('cheerio')
const app = express()

app.use(express.json())

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

app.get('/', (req, res) => {
    //res.send("Ok!")
    res.redirect('/news')
})

app.use('/news', (req, res, next) => {
    //console.log('Middleware 2')
    //req.headers.news = getNews()
    request('https://shazoo.ru/news', (err, res, body) => {
        news = []
        if (!err && res.statusCode === 200) {
            const $ = cheerio.load(body)
            let lenth = $('.entry').length


            let newsTitle = ""
            let newsShortContent = ""

            for (let i = 0; i < lenth; i++) {
                newsTitle = $('.entryTitle').eq(i).text()
                newsShortContent = $('.entryContent').eq(i).text()
                //  console.log(newsTitle)
                //  console.log(newsShortContent)
                news.push({
                    title: newsTitle,
                    newsSContent: newsShortContent
                })
            }

            next()
        }

    })

})




app.get('/news', (req, res) => {
    //console.log(req.query.count)
    let newsCount = req.cookies.newsCount ? req.cookies.newsCount : (req.query.count ? parseInt(req.query.count) : 10)
    news = news.slice(0, newsCount)
    res.render('news', { layout: 'default', news, newsCount })


})

app.get('/settings', (req, res) => {
    let newsCount = req.cookies.newsCount ? req.cookies.newsCount : 10
    res.render('settings', { layout: 'default', newsCount })
})

app.post('/settings', (req, res) => {
    // console.log(req.body)
    let countNews = 10
    if (req.body.countNews) {
        countNews = parseInt(req.body.countNews)
        res.cookie('newsCount', countNews)
    }
    res.redirect('/')
    //res.render('settings', { layout: 'default', countNews })
})

app.listen(3000, () => {
    console.log('Server started...')
})