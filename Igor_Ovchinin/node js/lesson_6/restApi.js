const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://root:1234@localhost:27017/todo?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true })

//Модели
const todoModel = require('./models/todo')
const usersModel = require('./models/users')

const passport = require('./auth')

const app = express()

app.use(express.json())
app.use(cors())

const TOKEN_SECRET_KEY = 'fhkdsfhksdahfkdashfkudyshaifytias'

const isAuthenticated = (req, res, next) => {
    if (req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(' ')

        jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send()
            }

            req.user = decoded
            next()
        })
    } else {
        return res.status(403).send()
    }

}

//Проверка на авторизацию пользователя
app.use('/todo', isAuthenticated)

app.get('/', (req, res) => {
    res.redirect('/todo')
})

//Работа с mongoDB
app.get('/todo', async (req, res) => {
    const { _id } = req.user
    const todo = await todoModel.find({ user: _id }).lean()

    res.status(200).json(todo)
})

app.post('/todo', async (req, res) => {
    const { _id } = req.user
    const { title } = req.body

    const tasksModel = new todoModel({ user: _id, title, task: [{ task: "Test", check: true }] })
    tasksModel.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }
        res.status(201).send(doc)
    })
})

app.get('/todo/:id', async (req, res) => {
    const { _id } = req.user
    const id = req.params.id;
    const todoItem = await todoModel.findById({ _id: id, user: _id }).lean()

    if (!todoItem) {
        res.status(400).json({ message: "Списка не существует" })
        return
    }

    res.status(200).json(todoItem)
})

app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const todoItem = await todoModel.findByIdAndRemove(id, (err, obj) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить список', id })
        } else {
            res.json(obj)
        }
    })
})

//регистрация/авторизация
app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body

    if (restBody.password === repassword) {
        const user = new usersModel(restBody)
        await user.save()
        res.status(201).send()
    }
    res.status(400).json({ message: 'User not exists' })
})

app.post('/auth', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).json({ message: "Не передан логин или пароль" })
    }

    const user = await usersModel.findOne({ email: username })

    if (!user) {
        return res.status(401).json({ message: "Пользователь не найден" })
    }

    if (!user.validatePassword(password)) {
        return res.status(401).json({ message: "Неправильный логин/пароль" })
    }

    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password

    res.status(200).json({
        ...plainUser,
        token: jwt.sign(plainUser, TOKEN_SECRET_KEY),
    })
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})

app.listen(4000, () => {
    console.log('Server started...')
})
