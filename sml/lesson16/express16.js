const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/TodoList', { useNewUrlParser: true, useUnifiedTopology: true })

//Модели
const todoModel = require('./models/todomodel')

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

app.get('/i', (req, res) => {
    res.send("Ok!")
})

//Работа с mongoDB
app.get('/', async (req, res) => {
    const todo = await todoModel.find({}).lean()

    //res.json(messages)
    // console.log(todo)
    //const messages2  = JSON.parse(JSON.stringify(messages))
    res.render('todo', { layout: 'default', todo: todo })
})


app.listen(4000, () => {
    console.log('Server started... port 4000')
})
