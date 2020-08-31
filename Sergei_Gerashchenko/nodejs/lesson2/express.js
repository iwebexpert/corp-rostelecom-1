const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const request = require('request')
const cheerio  = require("cheerio")
const getPage = require('./parse')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todolist', {useNewUrlParser: true, useUnifiedTopology: true})

const todoModel = require('./models/todo_item')

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


app.get('/', (req, res) => {
    res.send("Ok!")
})

app.get('/news', (req, res) => {
    let countNews = req.cookies.newsCount ? req.cookies.newsCount : null
    links = getPage()
    res.render('news', {layout: 'default', countNews})
})

app.listen(4000, () => {
    console.log('Server started...')
})

app.post('/news', (req, res) => {
    let countNews = 5
    if(req.body.news_count){
        countNews = parseInt(req.body.news_count)
    }
    res.cookie('newsCount', countNews)
    res.render('news', {layout: 'default', countNews})
})


app.get('/todo', async (req, res) => {
    const todo_items = await todoModel.find({}).lean()

    //res.json(messages)
    console.log(todo_items)
    //const messages2  = JSON.parse(JSON.stringify(messages))
    res.render('todolist', {layout: 'default', todo_items: todo_items})
})

app.get('/todo/add', async (req, res) => {
    const item = new todoModel({author: 'Sergey', title: 'Two', text: 'New todo item'})
    item.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }

        res.json(doc)
    })
})

app.post('/todo',  async (req, res) => {
    const item = new todoModel({author: req.body.author, title: req.body.title, text: req.body.text, doneAt : null})
    item.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }
        res.redirect('/todo')
    })
})

app.get('/todo/check/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null;
    const item = await todoModel.update({_id: id}, {doneAt : new Date()})

//    res.json(message)
    console.log('check', id)
    //const messages2  = JSON.parse(JSON.stringify(messages))
    //const messages2  = JSON.parse(JSON.stringify(messages))
    //res.render('messages', {layout: 'default', messages: messages})
})
app.get('/todo/uncheck/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null;
    const item = await todoModel.update({_id: id}, {doneAt : null})
//    const message = await messagesModel.findById({_id: id}).lean()

//    res.json(message)
    console.log('uncheck', id)
    //const messages2  = JSON.parse(JSON.stringify(messages))
    //const messages2  = JSON.parse(JSON.stringify(messages))
    //res.render('messages', {layout: 'default', messages: messages})
})
