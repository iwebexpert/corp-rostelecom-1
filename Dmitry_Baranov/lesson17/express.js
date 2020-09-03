const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
// mongoose.connect('mongodb://root:1234@localhost:27017/messenger?authSource=admin&w=1', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect('mongodb://localhost:27017/messenger?authSource=admin&w=1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//Модели
const todoModel = require('./models/todo')
const usersModel = require('./models/users')

const passport = require('./auth')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

//express + hbs
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))
app.set('view engine', 'hbs')


app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'fudduisafyiudsayfodysfysdfydsiyfdtausfuaysdytf8dstyf87dsaf',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(passport.initialize)
app.use(passport.session)


app.use('/todo', passport.isAuthenticated)

//Middleware
app.get('/', (req, res) => {
    // res.send("Ok!")
    res.redirect('/todo')
})

//Работа с mongoDB
app.get('/todo', async (req, res) => {
    const todo = await todoModel.find({}).lean()
    res.render('todo', {layout: 'default', todo})
})

app.post('/todoAdd', async (req, res) => {
    console.log(req.body)
    const todoTask = new todoModel({
        text: req.body.text
    })
        await todoTask.save(function (err) {
        if (err) {
            res.json(err)
            return
        }
    })
    res.redirect('/todo')
})

app.post('/isDone', async (req, res) => {
    console.log('123')
    console.log(req.body)
    console.log('req.body.isDone: ' + req.body.isDone)
    const todoDone = await todoModel.findById(req.body.id)
    todoDone.isDone = !!req.body.isDone
    await todoDone.save()
    res.redirect('/todo')
})


app.get('/todoremove/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null
    await todoModel.findByIdAndRemove(id, err => {
        if (err) {
            return res.send(500, err)
        }
        res.redirect('/todo')
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
    res.render('auth', {layout: 'default', error})
})

app.post('/auth', passport.authenticate)

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})


app.listen(4000, () => {
    console.log('Server started...')
})
