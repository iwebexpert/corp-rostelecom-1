const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
mongoose.connect('mongodb://localhost:27017/list?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })


const itemModel = require('./models/itemList.js')
const usersModel = require('./models/users')
const passport = require('./auth')

const app = express()
app.use(cors())
app.use(express.json())

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

app.use('/todo', isAuthenticated)

// app.get('/', (req, res) => {
//     res.redirect('/auth')
// })

app.get('/todo', async (req, res) => {
    const { _id } = req.user
    const todo = await itemModel.find({ user: _id }).lean()
    res.status(200).json(todo)

})

// добавляет в коллекцию дело
app.post('/todo', (req, res) => {
    const { _id } = req.user
    const { todo } = req.body
    const todoModel = new itemModel({ user: _id, todo })
    todoModel.save(function (err, doc) {
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
    const todo = await itemModel.findById({ _id: id, user: _id }).lean()

    if (!todo) {
        res.status(400).json({ message: "Список не существует" })
        return
    }

    res.status(200).json(todo)
})

app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await itemModel.findByIdAndRemove(id, (err, obj) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить задачу', id })
        } else {
            res.json(obj)
        }
    })
})

app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body

    if (restBody.password === repassword) {
        const user = new usersModel(restBody)
        await user.save()
        res.status(201).send()
    } else {
        res.status(400).json({ message: 'User not exists' })
    }
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

// app.get('/logout', (req, res) => {
//     req.logout()
//     res.redirect('/auth')
// })


app.listen(4000, () => {
    console.log('Server started...')
})
