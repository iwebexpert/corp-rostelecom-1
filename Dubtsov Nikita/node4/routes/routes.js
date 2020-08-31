const express = require('express')
const router = express.Router()

const TodoModel = require('../models/todos')
const dateHandler = require('../public/js/dateHandler')

router.get('/', async (req, res) => {
    const todoList = await TodoModel.find({}).lean()
    dateHandler(todoList)
    res.render('home', {
        title: 'My tasks App',
        todoList,
    })
})

router.post('/createTodo', async (req, res) => {
    const todo = new TodoModel({ text: req.body.todoText })
    await todo.save(function (err) {
        if (err) {
            res.json(err)
            return
        }
    })
    res.redirect('/')
})

router.post('/remove', async (req, res) => {
    const todo = await TodoModel.findById(req.body.id)
    await todo.remove()
    res.redirect('/')
})

router.post('/isDone', async (req, res) => {
    const todo = await TodoModel.findById(req.body.id)
    todo.isDone = !!req.body.isDone
    await todo.save()
    res.redirect('/')
})

module.exports = router