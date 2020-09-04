const express = require('express')
const router = express.Router()

const TodoModel = require('../models/todos')
const UsersModel = require('../models/users')

const dateHandler = require('../public/js/dateHandler')

const passport = require('../auth')

router.get('/register', (req, res) => {
    if (req.user) res.redirect('/home')
    res.render('register')
})

router.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body
    if (restBody.password === repassword) {
        const user = new UsersModel(restBody)
        await user.save()
        res.redirect('/auth')
    }
    res.redirect('/register?err=repassword')
})

router.get('/auth', (req, res) => {
    if (req.user) res.redirect('/home')
    const { error } = req.query
    res.render('auth', { error })
})

router.post('/auth', passport.authenticate)

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})

router.get('/', async (req, res) => {
    if (!req.user) res.redirect('/auth')
    res.redirect('/home')
})

router.get('/home', async (req, res) => {
    const todoList = await TodoModel.find({}).lean()
    dateHandler(todoList)
    res.render('home', {
        title: 'My tasks App ',
        todoList,
        username: req.user.login,
    })
})

router.post('/createTodo', async (req, res) => {
    const todo = new TodoModel({ text: req.body.todoText, createdBy: req.user.login })
    await todo.save(function (err) {
        if (err) {
            res.json(err)
            return
        }
    })
    res.redirect('/home')
})

router.post('/remove', async (req, res) => {
    const todo = await TodoModel.findById(req.body.id)
    await todo.remove()
    res.redirect('/home')
})

router.post('/isDone', async (req, res) => {
    const todo = await TodoModel.findById(req.body.id)
    todo.isDone = !!req.body.isDone
    await todo.save()
    res.redirect('/home')
})

module.exports = router