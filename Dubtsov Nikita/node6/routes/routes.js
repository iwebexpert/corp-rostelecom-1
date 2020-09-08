const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const TodosModel = require('../models/todos')
const UsersModel = require('../models/users')

const dateHandler = require('../public/js/dateHandler')

const TOKEN_SECRET_KEY = 'nwduqggr89q3grbqufqo82teqgeyqidggwbqhvwq8i1h2ni1j2n1oidn'

router.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body
    if (restBody.password === repassword) {
        const user = new UsersModel(restBody)
        await user.save()
        res.status(201).send()
    } else {
        res.status(400).json({ message: 'Password not confirmed' })
    }
})


router.post('/auth', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).json({ message: 'No username or password entered' })
    }

    const user = await UsersModel.findOne({ email: username })

    if (!user) {
        return res.status(401).json({ message: 'User is not defined' })
    }

    if (!user.validatePassword(password)) {
        return res.status(401).json({ message: 'Incorrect username or password' })
    }
    const clearUser = JSON.parse(JSON.stringify(user))
    delete clearUser.password

    res.status(200).json({
        ...clearUser,
        token: jwt.sign(clearUser, TOKEN_SECRET_KEY)
    })
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})

router.get('/', async (req, res) => {
    if (!req.user) res.redirect('/auth')
    res.redirect('/todos')
})

router.get('/todos', async (req, res) => {
    const { _id } = req.user
    const todoList = await TodosModel.find({ user: _id }).lean()
    dateHandler(todoList)
    res.status(200).json({
        todoList,
        username: req.user.login,
    })
})

router.post('/todos', async (req, res) => {
    const { _id } = req.user
    const { text } = req.body

    const todo = new TodosModel({ user: _id, text, createdBy: req.user.login })
    await todo.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }
        res.status(201).send(doc)
    })

})

router.delete('/todos/remove/:id', async (req, res) => {
    const { _id } = req.user
    const id = req.params.id
    const todo = await TodosModel.findByIdAndRemove(id, (err, obj) => {
        if (err) {
            res.status(400).json({ error: 'Failed to remove task' })
        } else {
            res.json(obj)
        }
    })
})

router.post('/todos/update/:id', async (req, res) => {
    const id = req.params.id
    const { text, isDone } = req.body
    const todo = await TodosModel.findByIdAndUpdate(id, {
        text, isDone
    }, (err) => {
        if (err) {
            res.status(400).json({ error: 'Failed to update' })
        }
    })
    res.status(201).json(todo)
})

module.exports = router