const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

mongoose.connect('mongodb://root:1234@localhost:27017/todo?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true })

//Модели
const todoModel = require('./models/todo')
const usersModel = require('./models/users')

const passport = require('./auth')

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

//Middleware sessions
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'fudduisafyiudsayfodysfysdfydsiyfdtausfuaysdytf8dstyf87dsaf',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(passport.initialize)
app.use(passport.session)

//Проверка на авторизацию пользователя
app.use('/news', passport.isAuthenticated)
app.use('/settings', passport.isAuthenticated)
app.use('/todo', passport.isAuthenticated)

app.get('/', (req, res) => {
    res.redirect('/todo')
})

const news = {
    countNews: 5,
    articles: [],
}

app.get('/news', (req, res) => {

    if (req.cookies.cntNews) {
        news.countNews = +req.cookies.cntNews
    }

    request('https://www.banki.ru/news/?source=main_menu_news', (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const $ = cheerio.load(body)

            // выводим первые 5 новостей с сайта banki.ru
            for (let i = 0; i < news.countNews; i++) {
                const dateNews = $('.text-list-date').eq(i).text()
                const titleNews = $('.text-list-link').eq(i).find('span').text()

                news.articles.push({ date: dateNews, title: titleNews })
            }
        } else {
            console.log(err)
            console.log('Страница не найдена.')
        }
    })
    newsBlock = news.articles.slice(0, news.countNews)
    res.render('news', { layout: 'default', newsBlock })
})

app.get('/settings', (req, res) => {
    let newsCount = req.cookies.cntNews ? req.cookies.cntNews : 5
    res.render('settings', { layout: 'default', newsCount })
})

app.post('/settings', (req, res) => {
    if (req.body.params) {
        news.countNews = parseInt(req.body.params)
        res.cookie('cntNews', parseInt(req.body.params))
    }
    res.redirect('/news')
})

//Работа с mongoDB
app.get('/todo', async (req, res) => {
    const { _id } = req.user
    const todo = await todoModel.find({ user: _id }).lean()

    res.render('todo', { layout: 'default', todo })
})

app.post('/todo', async (req, res) => {
    const { _id } = req.user
    const { title } = req.body

    const tasksModel = new todoModel({ user: _id, title, task: [{ task: "Test", check: true }] })
    tasksModel.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }
        //res.json(doc)
    })
    res.redirect('/todo')
})

app.get('/todo/:id', async (req, res) => {
    const { _id } = req.user
    const id = req.params.id;
    const todoItem = await todoModel.findById({ _id: id, user: _id }).lean()

    if (!todoItem) {
        res.redirect('/todo')
        return
    }

    res.render('todoItem', { layout: 'default', todoItem })
})

app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const todoItem = await todoModel.findByIdAndRemove(id, (err, obj) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить список', id })
        } else {
            res.json(obj)
        }
    })
})

//регистрация/авторизация
app.get('/register', (req, res) => {
    res.render('register', { layout: 'default' })
})

app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body

    if (restBody.password === repassword) {
        const user = new usersModel(restBody)
        await user.save()
        res.redirect('/auth')
    }
    res.redirect('/register?err=repassword')
})

app.get('/auth', (req, res) => {
    const { error } = req.query
    res.render('auth', { layout: 'default', error })
})

app.post('/auth', passport.authenticate)

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})

app.listen(4000, () => {
    console.log('Server started...')
})
