const express = require('express')
const path = require('path')

const TodoItems = require('../models/todo')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.ok = data => res.status(200).json({
        status: 200,
        error: '',
        data
    })
    next()
})

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '..', 'views'))

// Отображаем страницу со списком
app.get('/', async (req, res) => {
    res.render('index')
})

// Получение списка
app.get('/todo', async (req, res) => {
    const list = await TodoItems.find({}).lean()
    list.sort((a, b) => a.planned === b.planned ? 0 : (a.planned > b.planned ? 1 : -1))
    res.ok([
        { header: 'Важное' },
        { divider: true },
        ...list.filter(i => i.important),

        { header: 'Сделать сегодня' },
        { divider: true },
        ...list.filter(i => !i.important && i.planned <= new Date()),

        { header: 'Сделать позднее' },
        { divider: true },
        ...list.filter(i => !i.important && i.planned > new Date())
    ])
})

// Добавляем задачу
app.post('/todo', async (req, res) => {
    await (new TodoItems({
        name: req.body.name || '',
        desc: req.body.desc || '',
        done: false,
        important: req.body.important || false,
        planned: req.body.planned || null,
        created: new Date()
    })).save()
    res.ok(true)
})

// Изменяем задачу
app.post('/todo/:id', async (req, res) => {
    await TodoItems.findByIdAndUpdate(req.body._id, {
        name: req.body.name || '',
        desc: req.body.desc || '',
        done: req.body.done || false,
        important: req.body.important || false,
        planned: req.body.planned || null
    })
    res.ok(true)
})

// Удаляем задачу
app.delete('/todo/:id', async (req, res) => {
    await TodoItems.findByIdAndDelete(req.body._id)
    res.ok(true)
})

// Подключаемся к БД и запускаем приложение
const mongoose = require('mongoose')
const config = require('./config')
mongoose.connect(
    'mongodb+srv://node-4-todo:Mplwu21508@free-cluster-aws-m0.gyryz.mongodb.net/node-4?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
app.listen(config.app.port, () => {
    console.log(`http://localhost:${config.app.port}`)
})