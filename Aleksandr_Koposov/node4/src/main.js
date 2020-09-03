const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const config = require('./config')

const TodoItemsModel = require('../models/todo')
const UsersModel = require('../models/users')

const passport = require('./auth')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.ok = data => res.status(200).json({
        status: 200,
        error: '',
        data
    })
    res.err = error => res.status(500).json({
        status: 500,
        error: error,
        data: null
    })
    next()
})

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '..', 'views'))

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: config.app.secret,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(passport.initialize)
app.use(passport.session)

// Защищённые маршруты
app.use('/list', passport.loggedIn)
app.use('/todo*', passport.loggedIn)

// Маршруты для списка дел
app.get('/', (req, res) => {
    res.redirect('/list')
})
app.get('/list', (req, res) => {
    res.render('index')
})
app.get('/todo', async (req, res) => {
    const list = await TodoItemsModel.find({}).lean()
    list.sort((a, b) => a.planned === b.planned ? 0 : (a.planned > b.planned ? 1 : -1))
    res.ok([
        { header: 'Важное' },
        { divider: true },
        ...list.filter(i => i.important),

        { header: 'Сделать сегодня' },
        { divider: true },
        ...list.filter(i => !i.important && i.planned <= new Date()),

        { header: 'Сделать позднее' },
        { divider: true },
        ...list.filter(i => !i.important && i.planned > new Date())
    ])
})
app.post('/todo', async (req, res) => {
    await (new TodoItemsModel({
        name: req.body.name || '',
        desc: req.body.desc || '',
        done: false,
        important: req.body.important || false,
        planned: req.body.planned || null,
        created: new Date()
    })).save()
    res.ok(true)
})
app.post('/todo/:id', async (req, res) => {
    await TodoItemsModel.findByIdAndUpdate(req.body._id, {
        name: req.body.name || '',
        desc: req.body.desc || '',
        done: req.body.done || false,
        important: req.body.important || false,
        planned: req.body.planned || null
    })
    res.ok(true)
})
app.delete('/todo/:id', async (req, res) => {
    await TodoItemsModel.findByIdAndDelete(req.body._id)
    res.ok(true)
})

// Маршруты авторизации
app.get('/login', (req, res) => {
    const { error } = req.query
    res.render('login', { error })
})
app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/login', passport.authenticate)
app.post('/auth/register', async (req, res) => {
    const { email, name, password, confirm } = req.body
    if (!password || !confirm || !email) {
        res.err('Не все обязательные поля заполнены')
    }
    if (password !== confirm) {
        res.err('Введённые пароли не совпадают')
    }
    const userExists = await UsersModel.exists({ email })
    if (userExists) {
        res.err('Пользователь уже существует')
    }
    if (email.length > 0 && password.length > 0) {
        const user = await new UsersModel({
            email,
            name,
            password
        }).save()
        res.ok(true)
    } else {
        res.err('Не удалось создать пользователя')
    }
})

// Подключаемся к БД и запускаем приложение
mongoose.connect(
    `mongodb+srv://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.base}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
app.listen(config.app.port, () => {
    console.log(`http://localhost:${config.app.port}`)
})