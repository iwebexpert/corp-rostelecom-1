const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

mongoose.connect('mongodb://localhost:27017/todolist?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

//Модели
const todolistsModel = require('./models/todolists')
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
app.use('/todolists', passport.isAuthenticated)

app.get('/', (req, res) => {
    res.send("Ok!")
})

//Работа с mongoDB
app.get('/todolists', async (req, res) => {
    const todolists = await todolistsModel.find({}).lean()
    console.log(todolists)
    res.render('todolists', { layout: 'default', todolists: todolists })
})

app.get('/todolists/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null;
    const todolist = await todolistsModel.findById({ _id: id }).lean()
    res.json(todolist)
})

app.get('/todolistsadd', async (req, res) => {
    const todolistModel = new todolistsModel({ time: '16:30', title: 'Встреча с заказчиком' })
    todolistModel.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }
        res.json(doc)
    })
})

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