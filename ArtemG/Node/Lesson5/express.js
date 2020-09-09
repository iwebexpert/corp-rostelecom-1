const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

mongoose.connect('mongodb://root:1234@172.20.10.9:27017/todo?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

//Модели
const todoModel = require('./models/todo')
const usersModel = require('./models/users')
const messagesModel = require('./models/messages')

const passport = require('./auth')

const app = express()

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default', 
    layoutDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.set('view engine', 'hbs');

//Middleware session
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: ',xalfm4857hfbdkjalxn235!smj',
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use(express.urlencoded({extended: false}))

app.use(passport.initialize)
app.use(passport.session)

//Проверка а авторизацию пользователя
app.use('/users', passport.isAuthenticated)
app.use('/messages', passport.isAuthenticated)
app.use('/todolist', passport.isAuthenticated)

app.get('/', (req, res) => {
    //res.render('home', {layout: 'default'})
    res.redirect('/auth')
})

//Работа с MongoDB
app.get('/todolist', async (req, res) => {
    const todolist = await todoModel.find({}).lean()
    console.log(todolist)
    res.render('todolist', {layout: 'default', todolist})
})

app.get('/todolist/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null
    const deal = await todoModel.findById({_id: id}).lean()
    res.json(deal)
})

app.get('/messages', async (req, res) => {
    const messages = await messagesModel.find({}).lean()
    
    res.render('messages', {layout: 'default', messages: messages})
})

app.get('/messagesadd', async (req, res) => {
    
    const message = new messagesModel({author: 'Viktor', text: 'New message'+Math.random()})
    
    message.save((err, doc) => {
        if (err) {
            res.json(err)
            return
        }
        res.json(doc)
    })
})

app.get('/register', (req, res) => {
    res.render('register', {layout: 'default'})
})

app.post('/register', async (req, res) => {
    const {repassword, ...restBody} =  req.body

    // const restBody = req.body
    // const repassword = restBody.repassword
    // delete restBody.repassword

    if(restBody.password === repassword){
        const user = new usersModel(restBody)
        await user.save()
        res.redirect('/auth')
    }
    res.redirect('/register?err=repassword')
})

app.get('/auth', (req, res) => {
    const {error} = req.query
    //то же самое если написать: const error = req.query.error
    res.render('auth', {layout: 'default', error})
})

app.post('/auth', passport.authenticate)

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})

app.listen(5000, () => {
    console.log('server is listened on port 5000...')
})




