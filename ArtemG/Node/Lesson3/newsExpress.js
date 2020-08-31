const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const request = require('request')
const cheerio = require('cheerio')

const app = express()

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default', 
    layoutDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.use(express.urlencoded({extended: false}))

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home', {layout: 'default'})
})

app.get('/newssettings', (req, res) => {
    res.render('newssettings', {layout: 'default'})
})

app.post('/newssettings', (req, res) => {
    if(req.body.count){
        countNews = parseInt(req.body.count)
        console.log(countNews)
    }
    temp = []
    request('https://www.m24.ru/news', (err, resp, body) => {
        temp = []
        if (!err && resp.statusCode ==200) {
            const $ = cheerio.load(body)
            for (let i = 0; i < countNews && ($('.b-materials-list').find('ul').find('li').eq([i]) != ''); i++) {
                temp.push($('.b-materials-list').find('ul').find('li').eq([i]).find('a').eq(0).text().replace(/[\n\r\t]/g,''))
            }                                   
        }
        res.render('news', {layout: 'default', temp, countNews})
    })
})

app.listen(5000, () => {
    console.log('server is listened on port 5000...')
})