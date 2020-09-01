const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todolist?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true })

const todolistsModel = require('./models/todolists')

const app = express()

app.use(express.json())

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

app.get('/', (req, res) => {
    res.send("Ok!")
})

app.get('/todolists', async (req, res) => {
    const todolists = await todolistsModel.find({}).lean()
    console.log(todolists)
    res.render('todolists', { layout: 'default', todolists: todolists })
})

app.get('/todolists/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null;
    const todolist = await todolistsModel.findById({ _id: id }).lean()
    res.json(todolist)
})

app.get('/todolistsadd', async (req, res) => {
    const todolistModel = new todolistsModel({ time: '16:30', title: 'Встреча с заказчиком' })
    todolistModel.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }

        res.json(doc)
    })
})

app.listen(4000, () => {
    console.log('Server started...')
})