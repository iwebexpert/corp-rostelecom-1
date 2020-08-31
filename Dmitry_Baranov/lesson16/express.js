const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
// mongoose.connect('mongodb://root:1234@localhost:27017/messenger?authSource=admin&w=1', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect('mongodb://localhost:27017/messenger?authSource=admin&w=1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//Модели
const todoModel = require('./models/todo')

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

//Middleware
app.use((req, res, next) => {
    console.log('Middleware 1')
    next()
})


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
    try {
        await todoTask.save()
        res.redirect('/todo')
    } catch (err) {
        res.redirect('/todo')
    }
})

app.post('/isDone', async (req, res) => {
    console.log('123')
    console.log(req.body)
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


app.listen(4000, () => {
    console.log('Server started...')
})
