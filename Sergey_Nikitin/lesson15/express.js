const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')

const testMiddleware = require('./middleware/testMiddleware')
const users = require('./data/users')

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

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

//Middleware
app.use((req, res, next) => {
    console.log('Middleware 1')
    next()
})

//Срабатывает на запросы, которые начинаются с /users
app.use('/users', (req, res, next) => {
    console.log('Middleware 2')
    next()
})

//all - сработает только на адресе /users
app.all('/users', (req, res, next) => {
    console.log('Middleware 3. All')
    next()
})

//Пользовательская middleware
app.use(testMiddleware)

app.get('/', (req, res) => {
    res.send("Ok!")
})

app.get('/users', (req, res) => {
    //console.log(req.test)
    //console.log(req.body)
    //res.send("Users!")

    res.render('users', {layout: 'default', users})
})

app.get('/users/:username', (req, res) => {
    // console.log(req.params)

    const user = users[req.params.username] ? users[req.params.username] : null
    res.render('user', {layout: 'default', user})
})

app.get('/settings', (req, res) => {
    res.render('settings', {layout: 'default'})
})

app.post('/settings', (req, res) => {
    console.log(req.body)
    let countNews = 10
    if(req.body.param1){
        countNews = parseInt(req.body.param1)
    }
    res.render('settings', {layout: 'default', countNews})
})

app.get('/cookie/set', (req, res) => {
    res.cookie('rand1', Math.random())
    res.redirect('/cookie/get')
})

app.get('/cookie/get', (req, res) => {
    console.log(req.cookies.rand1 ? req.cookies.rand1 : null)
    res.send(JSON.stringify(req.cookies)).status(200)
})

app.listen(4000, () => {
    console.log('Server started...')
})