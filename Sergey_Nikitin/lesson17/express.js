const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
mongoose.connect('mongodb://root:1234@localhost:27017/messages?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const users = require('./data/users')


//Модели
const messagesModel = require('./models/messages')
const toDoListModel = require('./models/toDoList')
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
app.use('/users', passport.isAuthenticated)
app.use('/messages', passport.isAuthenticated)
app.use('/todolist', passport.isAuthenticated)
app.use('/todolist/:id', passport.isAuthenticated)
app.use('/todolistadd', passport.isAuthenticated)


app.get('/', (req, res) => {
    res.send("Ok!")
})

app.get('/users', (req, res) => {

    res.render('users', { layout: 'default', users })
})

app.get('/users/:username', (req, res) => {
    // console.log(req.params)

    const user = users[req.params.username] ? users[req.params.username] : null
    res.render('user', { layout: 'default', user })
})

app.get('/settings', (req, res) => {
    res.render('settings', { layout: 'default' })
})

app.post('/settings', (req, res) => {
    console.log(req.body)
    let countNews = 10
    if (req.body.param1) {
        countNews = parseInt(req.body.param1)
    }
    res.render('settings', { layout: 'default', countNews })
})

app.get('/cookie/set', (req, res) => {
    res.cookie('rand1', Math.random())
    res.redirect('/cookie/get')
})

app.get('/cookie/get', (req, res) => {
    console.log(req.cookies.rand1 ? req.cookies.rand1 : null)
    res.send(JSON.stringify(req.cookies)).status(200)
})

//Работа с mongoDB
app.get('/messages', async (req, res) => {
    const messages = await messagesModel.find({}).lean()

    //res.json(messages)
    console.log(messages)
    //const messages2  = JSON.parse(JSON.stringify(messages))
    res.render('messages', { layout: 'default', messages: messages })
})

app.get('/messages/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null;
    const message = await messagesModel.findById({ _id: id }).lean()

    res.json(message)
    //console.log(messages)
    //const messages2  = JSON.parse(JSON.stringify(messages))
    //res.render('messages', {layout: 'default', messages: messages})
})

app.get('/messagesadd', async (req, res) => {
    const messageModel = new messagesModel({ author: 'Victor', text: 'New message' })
    messageModel.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }

        res.json(doc)
    })
})


//ДЗ ToDoList
app.get('/todolist', async (req, res) => {
    const toDolist = await toDoListModel.find({}).lean()

    //res.json(messages)
    console.log(toDolist)
    //const messages2  = JSON.parse(JSON.stringify(messages))
    res.render('toDoList', { layout: 'default', toDoList: toDolist })
})
app.get('/todolist/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null;
    const toDolistItem = await toDoListModel.findById({ _id: id }).lean()

    //res.json(message)
    //console.log(messages)
    //const messages2  = JSON.parse(JSON.stringify(messages))
    res.render('toDoListItem', { layout: 'default', toDoListItem: toDolistItem })
})

app.post('/todolistadd', (req, res) => {

    if (req.body.name && req.body.description) {
        // name = parseInt(req.body.name)
        let toDoitemCurr = new toDoListModel({ name: req.body.name, description: req.body.description })
        toDoitemCurr.save(function (err, book) {
            if (err) return console.error(err);
            console.log(toDoitemCurr.name + " saved to collection.");
        })
    }
    res.redirect("/todolist")//.render('settings', { layout: 'default', countNews })
})

app.get('/register', (req, res) => {
    res.render('register', { layout: 'default' })
})

app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body

    // const restBody = req.body
    // const repassword = restBody.repassword
    // delete restBody.repassword

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