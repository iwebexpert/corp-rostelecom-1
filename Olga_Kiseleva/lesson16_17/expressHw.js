const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
mongoose.connect('mongodb://localhost:27017/list?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })


// const testMiddleware = require('./middleware/testMiddleware')
const users = require('./data/users')
const itemModel = require('./models/itemList.js')
const usersModel = require('./models/users')
const passport = require('./auth')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())




// app.use(cookieParser())

// app.use(express.static('public'))

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

app.use('/users', passport.isAuthenticated)
app.use('/todo', passport.isAuthenticated)

app.get('/', (req, res) => {
    res.redirect('/auth')
})

app.get('/todo', async (req, res) => {
    const todo = await itemModel.find({}).lean()
    res.render('todo', { layout: 'default', todo: todo })
})

// добавляет в коллекцию дело
app.post('/todo', (req, res) => {
    const todo = new itemModel({ todo: req.body.add }) //req.body.todoText
    todo.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }
    })
    res.redirect('/todo')
})

app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await itemModel.findByIdAndRemove(id, (err, obj) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить задачу7777777', id })
        } else {
            res.json(obj)
        }
    })
    res.redirect('/todo')
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
