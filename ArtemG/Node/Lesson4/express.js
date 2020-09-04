const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://root:1234@192.168.49.103:27017/todo?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true})

//Модели
const todoModel = require('./models/todo')

const app = express()

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default', 
    layoutDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    //res.render('home', {layout: 'default'})
    res.redirect('/todolist')
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

app.get('/messages/add', async (req, res) => {
    
    const message = new messagesModel({author: 'Viktor', text: 'New message'+Math.random()})
    
    message.save((err, doc) => {
        if (err) {
            res.json(err)
            return
        }
        res.json(doc)
    })
})


app.listen(5000, () => {
    console.log('server is listened on port 5000...')
})




