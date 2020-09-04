const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


//Конфиг подключения к БД
const config = require('./config')


const passport = require('./auth')

//Модель
const tasksModel = require('./models/tasks')
const usersModel = require('./models/users')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

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
    secret: 'fudduisafyiudsayfodysdfgdfgdfgdfg5666h56h6_dfgdfg',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(passport.initialize)
app.use(passport.session)

//Проверка на авторизацию пользователя
app.use('/users', passport.isAuthenticated)
app.use('/tasks*', passport.isAuthenticated)



app.get('/', (req, res) => {
    res.redirect('/tasks')
})


app.get('/tasks', async (req, res) => {
    const tasks = await tasksModel.list()
    console.dir(tasks)
    res.render('taskslist', { layout: 'default', tasks: tasks })

})

app.post('/tasksclose', async (req, res) => {
    console.log(req.body)
    let id = req.body.undone
    let model_res
    if (req.body.done) {
        model_res = await tasksModel.update({ _id: id, done: true, closeDate: new Date() })
    } else {
        model_res = await tasksModel.update({ _id: id, done: false, closeDate: null })
    }
    res.redirect('/tasks')
})


app.post('/tasksadd', async (req, res) => {
    console.log(req.body)
    let model_res = await tasksModel.add({ name: req.body.name, desc: req.body.desc })
    console.log('add')
    console.log(model_res)
    res.redirect('/tasks')

})

app.get('/tasksdel/:id', async (req, res) => {
    console.log(req.params)
    let model_res = await tasksModel.delete(req.params.id)
    console.log('delete')
    console.log(model_res)
    res.redirect('/tasks')
})


app.get('/register', (req, res) => {
    res.render('register', { layout: 'default-public' })
})

app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body
    const email = req.body.email

    const dbEmails = await usersModel.exists({ email: email })

    if (dbEmails) {
        console.log('User exist!!')
        res.redirect('/register?err=UserExist')
    }
    if (restBody.password === repassword && email.length > 0 && restBody.password.length > 0) {
        const user = new usersModel(restBody)
        await user.save()
        res.redirect('/auth')
    }
    res.redirect('/register?err=repassword')
})

app.get('/auth', (req, res) => {
    const { error } = req.query
    res.render('auth', { layout: 'default-public', error })
})

app.post('/auth', passport.authenticate)

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})


config.connectDb()
    .on('error', console.log)
    .on('disconnected', config.connectDb)
    .once('open', () => {
        app.listen(4000, () => {
            console.log('Server started...')
        })
    })

