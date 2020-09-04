const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const mongoose = require('./models/mongodb')
const passport = require('./auth')
const Items = require('./models/items')
const Users = require('./models/users')

const app = express()

app.use(express.json())

// обработки данных с формы
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

mongoose.connectDB()

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
app.use('/todo', passport.isAuthenticated)

app.get('/', async (req, res) => {
    res.redirect('/todo')
})

app.get('/todo', async (req, res) => {
    const items = await Items.getItems()
    res.render('items', { layout: 'default', items })
})

app.get('/register', (req, res) => {
    res.render('register', { layout: 'default' })
})

app.get('/auth', (req, res) => {
    const { error } = req.query
    res.render('auth', { layout: 'default', error })
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})

// Обрабатываем Post запрос '/add'
app.post('/add', async (req, res) => {
    //console.log(req.body)
    if (req.body.addItemByName)
        Items.add(req.body.addItemByName)

    res.end()
    //res.redirect('/')
})

// Обрабатываем Post запрос '/delete'
app.post('/remove', async (req, res) => {
    //console.log(req.body)
    if (req.body.deleteItemByID)
        Items.remove(req.body.deleteItemByID)

    res.end()
    //res.redirect('/')
})

app.post('/update', async (req, res) => {
    //console.log(req.body)
    if (req.body.updateItemByID)
        Items.update(req.body.updateItemByID, req.body.status ? req.body.status : false)

    res.end()
    //res.redirect('/')
})

app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body

    // const restBody = req.body
    // const repassword = restBody.repassword
    // delete restBody.repassword

    if (restBody.password === repassword) {
        const user = new Users(restBody)
        await user.save()
        res.redirect('/auth')
    }
    res.redirect('/register?err=repassword')
})

app.post('/auth', passport.authenticate)


app.listen(3000, function (err) {
    // mongoose.connectDB()

    if (err)
        console.error(err)
    else
        console.log(`Running server at port 3000!`)
});
