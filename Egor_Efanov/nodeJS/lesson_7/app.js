const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const todoTasks = require('./models/todoModels')
const usersModel = require('./models/users')

const passport = require('./auth')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))


//Подключение handlebars
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),

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


app.get('/todo', async (req, res) => {
    const tasks = await todoTasks.find({}).lean()
    res.render('tasks', { layout: 'default', tasks })
})

app.post('/createTask', async (req, res) => {
    const newTask = new todoTasks({ text: req.body.newTaskText })
    await newTask.save(function (err) {
        if (err) {
            res.json(err)
            return
        }
    })
    res.redirect('/todo')
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


const port = 3000
async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/todoApp',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
    } catch (err) {
        console.log(err)
    }
    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
}

start() 