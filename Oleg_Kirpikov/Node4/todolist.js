const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

//Конфиг подключения к БД
const config = require('./config')


//Модель
const tasksModel = require('./models/tasks')

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
    res.redirect('/tasks')
})


app.get('/tasks', async (req, res) => {
    const tasks = await tasksModel.list()
    console.dir(tasks)
    res.render('taskslist', { layout: 'default', tasks: tasks })

})

app.post('/tasksclose', async (req, res) => {
    console.log(req.body)
    let id = req.body.undone
    let model_res
    if (req.body.done) {
        model_res = await tasksModel.update({ _id: id, done: true, closeDate: new Date() })
    } else {
        model_res = await tasksModel.update({ _id: id, done: false, closeDate: null })
    }
    res.redirect('/tasks')
})


app.post('/tasksadd', async (req, res) => {
    console.log(req.body)
    let model_res = await tasksModel.add({ name: req.body.name, desc: req.body.desc })
    console.log('add')
    console.log(model_res)
    res.redirect('/tasks')

})

app.get('/tasksdel/:id', async (req, res) => {
    console.log(req.params)
    let model_res = await tasksModel.delete(req.params.id)
    console.log('delete')
    console.log(model_res)
    res.redirect('/tasks')
})

config.connectDb()
    .on('error', console.log)
    .on('disconnected', config.connectDb)
    .once('open', () => {
        app.listen(4000, () => {
            console.log('Server started...')
        })
    })

