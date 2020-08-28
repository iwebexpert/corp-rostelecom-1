const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: false }))

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'default',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
}))
app.set('view engine', 'hbs')

var news = getNews()

app.get('/', (req, res) => {
  res.render('news.hbs', { layout: 'default', news, countNews: news.length })
})

app.post('/', (req, res) => {
  let news2 = []
  if (req.body.param1) {
    let needSize = parseInt(req.body.param1)
    needSize = (needSize < 0) ? 0 : needSize
    news2 = news.slice(0, needSize)
  }
  res.render('news.hbs', { layout: 'default', news: news2, countNews: news2.length })
})

app.listen(4000, () => {
  console.log('Server started...')
})


function getNews() {
  let news = []
  request('https://pattayapeople.ru/news/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html)
      $('.entry-title').each(function (i, element) {
        if (i !== 0) {
          news.push($(element).text())
        }
      })
    }
  })
  return news
}
