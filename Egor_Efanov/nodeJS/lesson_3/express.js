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


const news = {

    countNews: 5,
    articles: []
}
app.get('/news', (req, res) => {

    const urlSite = 'https://ria.ru/lenta/'
    news.countNews = req.cookies.countNewsCookie ? req.cookies.countNewsCookie : 5
    console.log(news.countNews);

    function getSite(url) {
        const regExp = /^(\w+:)?(\/{0,3})?([\d\w.\-]+)/i
        return Array.from(url.matchAll(regExp))[0][0]
    }

    function getTextNews(url) {

        return new Promise(resolve => {
            request(url, (error, result, body) => {
                if (!error && result.statusCode === 200) {
                    const $ = cheerio.load(body)
                    const textBlock = $('.article__body').find('.article__text')
                    resolve(textBlock)


                }
            })
        })
    }


    request(urlSite, (error, result, body) => {
        if (!error && result.statusCode === 200) {

            const $ = cheerio.load(body)
            const newsBlock = $('.list-item')


            for (let i = 0; i < newsBlock.contents().length; i++) {


                const href = newsBlock.eq(i).find('a').attr('href')
                const titleNews = newsBlock.eq(i).find('a').text()

                if (href) {
                    getTextNews(getSite(urlSite) + href)
                        .then(resolve => {

                            news.articles.push({ title: titleNews, description: resolve.text() })
                        })
                }
            }
        }
    })
    newsSlice = news.articles.slice(0, parseInt(news.countNews))
    res.render('news', { layout: 'default', newsSlice })

})



app.get('/settings', (req, res) => {
    res.render('settings', { layout: 'default' })
})

app.post('/settings', (req, res) => {
    console.log(req.body)

    if (req.body.param1) {
        news.countNews = parseInt(req.body.param1)
        res.cookie('countNewsCookie', parseInt(req.body.param1))

    }

    res.redirect('/news')

})




app.listen(4000, () => {
    console.log('Server started...')
})



