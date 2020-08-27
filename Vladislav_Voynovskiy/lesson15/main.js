const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const article = require('./articleParse.js')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//Подключение handlebars
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'default',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
}))
app.set('view engine', 'hbs')

app.get('/articles', (req, res) => {
  const renderArticles = async () => {
    const articleCount = req.cookies.aCount ? req.cookies.aCount : 5
    const articlesObj = new article(articleCount)
    const articleData = await articlesObj.getArticles()
    res.render('articles', { layout: 'default', articleData })
  }
  renderArticles()
})

app.get('/', (req, res) => {
  res.redirect('/articles')
})

app.get('/settings', (req, res) => {
  const articleCount = req.cookies.aCount ? req.cookies.aCount : 5
  res.render('settings', { layout: 'default', articleCount })
})

app.post('/settings', (req, res) => {
  let articleCount = req.cookies.aCount ? req.cookies.aCount : 5
  if (req.body.countParam) {
    articleCount = parseInt(req.body.countParam)
    res.cookie('aCount', articleCount)
  }
  res.render('settings', { layout: 'default', articleCount })
})

const port = 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})