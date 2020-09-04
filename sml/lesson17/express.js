const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session') // т.к. храним данные в сессии
const MongoStore = require('connect-mongo')(session) // хранение сессий в mongoDB

//mongoose.connect('mongodb://root:1234@localhost:27017/messenger?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connect('mongodb://localhost:27017/TodoList', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
// чтобы правильно работали сессии добавляем  useFindAndModify: false 
// чтобы сразу не модифицировалось, только для сохранения

//Модели
const usersModel = require('./models/users')         // добавляем модель users.js
const todoModel = require('./models/todomodels')

const passport = require('./auth')   // подключаем модуль авторизации

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
// для работы с сессиями
app.use(session({
    resave: true, // если пользователь чтото сохраняет, то сессия должна пересохранится
    saveUninitialized: false,  // сессии только для аворизованных пользователей
    secret: 'fudduisafyiudsayfodysfysdfydsiyfdtausfuaysdytf8dstyf87dsaf',
    store: new MongoStore({ mongooseConnection: mongoose.connection })  // где все это храним
    // connection берем из mongoose
}))
app.use(passport.initialize)
app.use(passport.session)

//Проверка на авторизацию пользователя, защита url
// app.use('/', passport.isAuthenticated)
app.use('/users', passport.isAuthenticated)
app.use('/todo', passport.isAuthenticated)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    // res.send("Ok!")
})

app.get('/users', async (req, res) => {
    const users = await usersModel.find({}).lean()
    res.render('users', { layout: 'default', users: users })
})

app.get('/todo', async (req, res) => {
    const todo = await todoModel.find({}).lean()
    res.render('todo', { layout: 'default', todo: todo })
})

app.get('/register', (req, res) => {
    res.render('register', { layout: 'default' })
})
// обработка /register
app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body  // передадим все кроме repassword
    // или более длинная запись
    // const restBody = req.body
    // const repassword = restBody.repassword
    // delete restBody.repassword

    if (restBody.password === repassword) {
        // создаем нового пошльзователя
        const user = new usersModel(restBody)   // передаем данные в модель usersModel/users.js
        await user.save()                     // запускаем save() прописанный в модели users.js
        res.redirect('/auth')                 // редирект  
    }
    res.redirect('/register?err=repassword')  // иначе редирект с ошибкой, что пароль не совпадает
})

app.get('/auth', (req, res) => {
    //  const error = req.query.error <=>  const {error} = req.query
    const { error } = req.query
    res.render('auth', { layout: 'default', error })
})
// обработка /auth
app.post('/auth', passport.authenticate)  //делегируем passport и метод authenticate будет обрабатывать форму

app.get('/logout', (req, res) => {
    req.logout()           // выход, появилмя благодаря middleware passport 
    res.redirect('/auth')  // редирект на форму авторизации
})


app.listen(4000, () => {
    console.log('Server started...')
})