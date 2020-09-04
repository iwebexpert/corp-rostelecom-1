const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

mongoose.connect('mongodb://root:1234@localhost:27017/messenger?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true })

//Модели
const todoModel = require(path.join(__dirname, 'models', 'todolist.js'))
const usersModel = require(path.join(__dirname, 'models', 'users.js'))

const passport = require('./auth')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


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
app.use('/todos', passport.isAuthenticated)


app.get('/', (req, res) => {
    res.redirect('/todos')
})

//Работа с mongoDB
app.get('/todos', async (req, res) => {
    const todos = await todoModel.find({}).lean()
    //console.log(todos)
    res.render('todos', { layout: 'default', todos: todos })
})


app.post('/todosadd', async (req, res) => {
    var todoText = req.body.todotext
    console.log('Add todo...', todoText)
    if (todoText.length > 1) {
        var todo = new todoModel({ todo: todoText, checked: false })
        await todo.save(function (err, doc) {
            if (err) {
                res.json(err)
                return
            }
        })
    }
    res.redirect('/todos')
})


app.post('/todosave', async (req, res) => {
    //Сохраниение TODO пометка о выполнении
    for (let k in req.body) {
        var idArr = k.match(/(save)_(.+)/)
        if (idArr) {
            var flag = (req.body[`todoid_${idArr[2]}`] === 'on') //если checked, вернется true
            await todoModel.updateOne({ _id: idArr[2] }, { checked: flag }, function (err, doc) {
                if (err) {
                    res.json(err)
                    return
                }
            })
            console.log(`Save checked = ${flag} for todo _id = ${idArr[2]}`)
        }
    }
    res.redirect('/todos')
})

app.post('/tododel', async (req, res) => {
    //Сохраниение TODO пометка о выполнении
    for (let k in req.body) {
        var idArr = k.match(/(del)_(.+)/)
        if (idArr) {
            await todoModel.deleteOne({ _id: idArr[2] }, function (err, doc) {
                if (err) {
                    res.json(err)
                    return
                }
            })
            console.log('Delete todo _id=', idArr[2])
        }
    }
    res.redirect('/todos')
})




app.get('/register', (req, res) => {
    const error = req.query
    res.render('register', { layout: 'default', error })
})

app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body
    if (restBody.password == '' || restBody.email == '') {
        res.redirect('/register?err=nouserdata')
        return
    }

    if (restBody.password !== repassword) {
        res.redirect('/register?err=repassword')
        return
    }
    const user = new usersModel(restBody)
    await user.save()
    res.redirect('/auth')
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